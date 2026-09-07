/* =============================================================================
   server/store.js — persistence.

   Two backends behind one interface.

     Postgres   used whenever DATABASE_URL is set. This is what runs on Render.
     File       a JSON file under .data/. Used for local development, and as a
                fallback if the database cannot be reached, so the application
                still starts instead of showing a blank page.

   The clinical data is stored as RDF triples, exactly as the browser holds it.
   The base graph ships inside the bundle and never changes; this table is the
   changeset layered on top. Accounts are the one thing kept relationally,
   because password hashes have no business being in a queryable graph.
   ========================================================================== */
'use strict';

const fs = require('fs');
const path = require('path');

const SCHEMA = `
CREATE TABLE IF NOT EXISTS users (
  id            SERIAL PRIMARY KEY,
  email         TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  full_name     TEXT NOT NULL,
  role          TEXT NOT NULL,
  subject_iri   TEXT NOT NULL,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS triples (
  id         BIGSERIAL PRIMARY KEY,
  op         TEXT NOT NULL,
  s          TEXT NOT NULL,
  p          TEXT NOT NULL,
  o          TEXT NOT NULL,
  why        TEXT,
  by_user    INTEGER,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS triples_created_idx ON triples (id);
`;

/* ------------------------------------------------------------- Postgres --- */

function PostgresStore(connectionString) {
  const { Pool } = require('pg');
  // Render's managed Postgres requires TLS but presents a certificate chain
  // node-postgres will not verify by default.
  const pool = new Pool({
    connectionString,
    ssl: /localhost|127\.0\.0\.1/.test(connectionString) ? false : { rejectUnauthorized: false },
    max: 5,
    idleTimeoutMillis: 30000
  });

  return {
    kind: 'postgres',

    async init() {
      await pool.query(SCHEMA);
    },

    async findUserByEmail(email) {
      const r = await pool.query('SELECT * FROM users WHERE lower(email) = lower($1)', [email]);
      return r.rows[0] || null;
    },

    async findUserById(id) {
      const r = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
      return r.rows[0] || null;
    },

    async createUser(user) {
      const r = await pool.query(
        `INSERT INTO users (email, password_hash, full_name, role, subject_iri)
         VALUES ($1, $2, $3, $4, $5) RETURNING *`,
        [user.email, user.password_hash, user.full_name, user.role, user.subject_iri]
      );
      return r.rows[0];
    },

    async countUsers() {
      const r = await pool.query('SELECT COUNT(*)::int AS n FROM users');
      return r.rows[0].n;
    },

    async listTriples() {
      const r = await pool.query(
        'SELECT op, s, p, o, why, by_user, created_at FROM triples ORDER BY id ASC'
      );
      return r.rows.map(toEntry);
    },

    async appendTriples(entries) {
      if (!entries.length) return 0;
      // One multi-row insert rather than a round trip per triple.
      const values = [];
      const params = [];
      entries.forEach((e, i) => {
        const b = i * 6;
        values.push(`($${b + 1}, $${b + 2}, $${b + 3}, $${b + 4}, $${b + 5}, $${b + 6})`);
        params.push(e.op, e.s, e.p, e.o, e.why || null, e.by_user || null);
      });
      await pool.query(
        `INSERT INTO triples (op, s, p, o, why, by_user) VALUES ${values.join(', ')}`,
        params
      );
      return entries.length;
    },

    async close() { await pool.end(); }
  };
}

/* ----------------------------------------------------------------- file --- */

function FileStore(dir) {
  const file = path.join(dir, 'medisem.json');
  let data = { users: [], triples: [], nextUserId: 1 };
  let writeTimer = null;

  function load() {
    try {
      if (fs.existsSync(file)) data = JSON.parse(fs.readFileSync(file, 'utf8'));
    } catch (e) {
      console.warn('[store] could not read', file, '-', e.message);
    }
  }
  function flush() {
    try {
      fs.mkdirSync(dir, { recursive: true });
      fs.writeFileSync(file, JSON.stringify(data, null, 2));
    } catch (e) {
      console.warn('[store] could not write', file, '-', e.message);
    }
  }
  function save() {
    clearTimeout(writeTimer);
    writeTimer = setTimeout(flush, 120);
  }

  return {
    kind: 'file',

    async init() { load(); },

    async findUserByEmail(email) {
      return data.users.find((u) => u.email.toLowerCase() === String(email).toLowerCase()) || null;
    },
    async findUserById(id) {
      return data.users.find((u) => u.id === Number(id)) || null;
    },
    async createUser(user) {
      const row = Object.assign({ id: data.nextUserId++, created_at: new Date().toISOString() }, user);
      data.users.push(row);
      save();
      return row;
    },
    async countUsers() { return data.users.length; },

    async listTriples() { return data.triples.map(toEntry); },

    async appendTriples(entries) {
      entries.forEach((e) => {
        data.triples.push({
          op: e.op, s: e.s, p: e.p, o: e.o,
          why: e.why || null, by_user: e.by_user || null,
          created_at: new Date().toISOString()
        });
      });
      save();
      return entries.length;
    },

    async close() { flush(); }
  };
}

function toEntry(row) {
  return {
    op: row.op, s: row.s, p: row.p, o: row.o,
    why: row.why || undefined,
    by: row.by_user || undefined,
    at: row.created_at instanceof Date ? row.created_at.toISOString() : row.created_at
  };
}

/* ---------------------------------------------------------------- choose --- */

async function openStore() {
  const url = process.env.DATABASE_URL;
  if (url) {
    try {
      const store = PostgresStore(url);
      await store.init();
      console.log('[store] using Postgres');
      return store;
    } catch (e) {
      console.error('[store] Postgres unavailable (' + e.message + ').');
      console.error('[store] Falling back to file storage so the app still starts.');
      console.error('[store] Anything written now will NOT be in the database.');
    }
  } else {
    console.log('[store] DATABASE_URL is not set, using file storage');
  }
  const store = FileStore(process.env.DATA_DIR || path.join(__dirname, '..', '.data'));
  await store.init();
  return store;
}

module.exports = { openStore, PostgresStore, FileStore };
