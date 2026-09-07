/* =============================================================================
   server.js — the MediSem web service.

   Three jobs:
     1. serve the client from public/
     2. authenticate people against the users table
     3. store and return the RDF changeset

   The knowledge graph itself is not assembled here. The base graph ships inside
   the client bundle and the browser parses it, reasons over it and runs SPARQL
   against it. This service adds the parts a static site cannot have: real
   accounts and data that is shared between everyone who visits.
   ========================================================================== */
'use strict';

const path = require('path');
const express = require('express');
const { openStore } = require('./server/store');
const auth = require('./server/auth');

const PORT = process.env.PORT || 3000;
const RES = 'http://medisem.org/resource/';
const MED = 'http://medisem.org/onto#';
const XSD = 'http://www.w3.org/2001/XMLSchema#';

const ROLES = ['PatientRole', 'DoctorRole', 'AdminRole', 'LabRole', 'PharmacyRole'];

const ROLE_CLASS = {
  PatientRole: 'OutPatient',
  DoctorRole: 'Doctor',
  AdminRole: 'Administrator',
  LabRole: 'LabTechnician',
  PharmacyRole: 'Pharmacist'
};

function I(v) { return '<' + v + '>'; }
function L(value, datatype) {
  const escaped = String(value)
    .replace(/\\/g, '\\\\').replace(/"/g, '\\"')
    .replace(/\n/g, '\\n').replace(/\r/g, '\\r').replace(/\t/g, '\\t');
  const s = '"' + escaped + '"';
  return datatype && datatype !== XSD + 'string' ? s + '^^<' + datatype + '>' : s;
}
const med = (p) => I(MED + p);
const TYPE = I('http://www.w3.org/1999/02/22-rdf-syntax-ns#type');

/** Very small validators. Enough to keep rubbish out of the graph. */
function badEmail(v) { return !v || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(v)); }
function badPassword(v) { return !v || String(v).length < 8; }
function clean(v, max) { return String(v == null ? '' : v).trim().slice(0, max || 120); }

function slug(name) {
  return clean(name, 40).replace(/[^A-Za-z0-9]+/g, '') || 'User';
}

async function main() {
  const store = await openStore();
  const app = express();

  app.disable('x-powered-by');
  app.set('trust proxy', 1);
  app.use(express.json({ limit: '2mb' }));
  app.use(auth.attachUser(store));

  /* ------------------------------------------------------------- health -- */
  app.get('/api/health', async (req, res) => {
    let users = null;
    try { users = await store.countUsers(); } catch (e) { /* reported as null */ }
    res.json({ ok: true, storage: store.kind, users });
  });

  /* --------------------------------------------------------------- auth -- */

  app.post('/api/auth/signup', async (req, res) => {
    const body = req.body || {};
    const email = clean(body.email, 160).toLowerCase();
    const name = clean(body.name, 90);
    const role = ROLES.indexOf(body.role) !== -1 ? body.role : 'PatientRole';

    if (!name) return res.status(400).json({ error: 'Please give your full name.' });
    if (badEmail(email)) return res.status(400).json({ error: 'That email address does not look right.' });
    if (badPassword(body.password)) {
      return res.status(400).json({ error: 'Choose a password of at least 8 characters.' });
    }

    try {
      if (await store.findUserByEmail(email)) {
        return res.status(409).json({ error: 'An account already exists for that email.' });
      }
    } catch (e) {
      return res.status(503).json({ error: 'The database is not reachable right now.' });
    }

    const prefix = role === 'DoctorRole' ? 'Doc' : role === 'PatientRole' ? 'Pat' : 'Stf';
    const localName = prefix + '_' + slug(name) + Date.now().toString(36).slice(-4).toUpperCase();
    const subject = I(RES + localName);

    // The person becomes a node in the graph, not just a row in a table.
    const triples = [
      [subject, TYPE, med(ROLE_CLASS[role])],
      [subject, med('name'), L(name)],
      [subject, med('email'), L(email)],
      [subject, med('photoInitials'), L(initials(name))]
    ];

    if (role === 'PatientRole') {
      triples.push([subject, med('mrn'), L('MRN-' + localName.replace('Pat_', '').toUpperCase().slice(0, 12))]);
      if (body.sex) triples.push([subject, med('sex'), L(clean(body.sex, 20))]);
      if (body.age) triples.push([subject, med('age'), L(String(parseInt(body.age, 10) || 0), XSD + 'integer')]);
      if (body.bloodGroup) triples.push([subject, med('bloodGroup'), L(clean(body.bloodGroup, 6))]);
      if (body.phone) triples.push([subject, med('phone'), L(clean(body.phone, 30))]);
    } else if (role === 'DoctorRole') {
      triples.push([subject, med('staffId'), L('DOC-' + Date.now().toString().slice(-6))]);
      if (body.specialty) triples.push([subject, TYPE, med(clean(body.specialty, 40))]);
      if (body.department) triples.push([subject, med('worksIn'), I(RES + clean(body.department, 60))]);
      if (body.qualification) triples.push([subject, med('qualification'), L(clean(body.qualification, 90))]);
      if (body.fee) triples.push([subject, med('consultationFee'), L(String(parseInt(body.fee, 10) || 500), XSD + 'decimal')]);
      triples.push([subject, med('yearsOfExperience'), L(String(parseInt(body.experience, 10) || 1), XSD + 'integer')]);
    } else {
      triples.push([subject, med('staffId'), L('STF-' + Date.now().toString().slice(-6))]);
      if (body.department) triples.push([subject, med('worksIn'), I(RES + clean(body.department, 60))]);
    }

    let user;
    try {
      user = await store.createUser({
        email,
        password_hash: await auth.hashPassword(body.password),
        full_name: name,
        role,
        subject_iri: subject
      });
      await store.appendTriples(triples.map((t) => ({
        op: 'add', s: t[0], p: t[1], o: t[2], why: 'signup', by_user: user.id
      })));
    } catch (e) {
      console.error('[signup]', e.message);
      return res.status(500).json({ error: 'The account could not be created.' });
    }

    auth.issue(res, user);
    res.json({ user: auth.publicUser(user), triples: triples.map(asEntry) });
  });

  app.post('/api/auth/login', async (req, res) => {
    const email = clean((req.body || {}).email, 160).toLowerCase();
    const password = (req.body || {}).password || '';
    let user;
    try {
      user = await store.findUserByEmail(email);
    } catch (e) {
      return res.status(503).json({ error: 'The database is not reachable right now.' });
    }
    // Same message either way, so the form cannot be used to discover which
    // email addresses are registered.
    const fail = () => res.status(401).json({ error: 'That email and password do not match an account.' });
    if (!user) return fail();
    if (!(await auth.verifyPassword(password, user.password_hash))) return fail();
    auth.issue(res, user);
    res.json({ user: auth.publicUser(user) });
  });

  app.post('/api/auth/logout', (req, res) => {
    auth.revoke(res);
    res.json({ ok: true });
  });

  app.get('/api/auth/me', (req, res) => {
    res.json({ user: auth.publicUser(req.user) });
  });

  /**
   * Staff creating a login for somebody else, used when a doctor registers a
   * patient and wants them to be able to sign in. The patient node already
   * exists in the graph by this point, so only the account row is created.
   */
  app.post('/api/auth/provision', auth.requireUser, async (req, res) => {
    const body = req.body || {};
    const email = clean(body.email, 160).toLowerCase();
    const name = clean(body.name, 90);
    const subject = clean(body.subjectIri, 300);
    const role = ROLES.indexOf(body.role) !== -1 ? body.role : 'PatientRole';

    if (badEmail(email)) return res.status(400).json({ error: 'That email address does not look right.' });
    if (badPassword(body.password)) return res.status(400).json({ error: 'The password must be at least 8 characters.' });
    if (!subject || subject.charAt(0) !== '<') return res.status(400).json({ error: 'A subject IRI is required.' });

    try {
      if (await store.findUserByEmail(email)) {
        return res.status(409).json({ error: 'An account already exists for that email.' });
      }
      const user = await store.createUser({
        email,
        password_hash: await auth.hashPassword(body.password),
        full_name: name,
        role,
        subject_iri: subject
      });
      res.json({ user: auth.publicUser(user) });
    } catch (e) {
      console.error('[provision]', e.message);
      res.status(500).json({ error: 'The account could not be created.' });
    }
  });

  /* ------------------------------------------------------------- delta --- */

  app.get('/api/delta', async (req, res) => {
    try {
      res.json({ entries: await store.listTriples() });
    } catch (e) {
      console.error('[delta:get]', e.message);
      res.json({ entries: [], degraded: true });
    }
  });

  app.post('/api/delta', auth.requireUser, async (req, res) => {
    const body = req.body || {};
    const list = Array.isArray(body.triples) ? body.triples : [];
    if (!list.length) return res.status(400).json({ error: 'No triples were sent.' });
    if (list.length > 3000) return res.status(413).json({ error: 'That is too many triples in one request.' });

    const op = body.op === 'remove' ? 'remove' : 'add';
    const entries = [];
    for (const t of list) {
      if (!Array.isArray(t) || t.length !== 3) {
        return res.status(400).json({ error: 'Each triple must be [subject, predicate, object].' });
      }
      const [s, p, o] = t.map((x) => String(x));
      if (s.length > 500 || p.length > 500 || o.length > 4000) {
        return res.status(400).json({ error: 'A term in that triple is too long.' });
      }
      // Subjects and predicates must be IRIs or blank nodes, never literals.
      if (!/^[<_]/.test(s) || p.charAt(0) !== '<') {
        return res.status(400).json({ error: 'Subjects and predicates must be IRIs.' });
      }
      entries.push({ op, s, p, o, why: clean(body.why, 120) || 'edit', by_user: req.user.id });
    }

    try {
      await store.appendTriples(entries);
      res.json({ ok: true, written: entries.length, entries: entries.map(asEntry) });
    } catch (e) {
      console.error('[delta:post]', e.message);
      res.status(500).json({ error: 'Those changes could not be saved.' });
    }
  });

  /* ------------------------------------------------------------- static -- */
  app.use(express.static(path.join(__dirname, 'public'), {
    maxAge: process.env.NODE_ENV === 'production' ? '1h' : 0,
    etag: true
  }));

  // Hash routing means every path should return the shell. Written as plain
  // middleware rather than app.get('*') because Express 5 changed how wildcard
  // paths are parsed and the old form throws on startup there.
  app.use((req, res) => {
    if (req.path.indexOf('/api/') === 0) return res.status(404).json({ error: 'No such endpoint.' });
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });

  app.listen(PORT, '0.0.0.0', () => {
    console.log('[medisem] listening on ' + PORT + ' using ' + store.kind + ' storage');
  });

  process.on('SIGTERM', async () => {
    console.log('[medisem] shutting down');
    try { await store.close(); } catch (e) { /* nothing useful to do */ }
    process.exit(0);
  });
}

function asEntry(e) {
  if (Array.isArray(e)) return { op: 'add', s: e[0], p: e[1], o: e[2] };
  return { op: e.op, s: e.s, p: e.p, o: e.o, why: e.why };
}

function initials(name) {
  const parts = String(name).trim().split(/\s+/).filter(Boolean);
  if (!parts.length) return '??';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

main().catch((e) => {
  console.error('[medisem] failed to start:', e);
  process.exit(1);
});
