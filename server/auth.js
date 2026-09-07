/* =============================================================================
   server/auth.js — passwords and sessions.

   Passwords are hashed with bcrypt. Sessions are a signed token in an HttpOnly
   cookie rather than server-side state, so a restarted or scaled service does
   not log everybody out.

   SESSION_SECRET should be set in the environment. If it is not, a random one
   is generated at boot, which works but signs everyone out whenever the service
   restarts. Render sets it for you if you use the included render.yaml.
   ========================================================================== */
'use strict';

const crypto = require('crypto');
const bcrypt = require('bcryptjs');

const SECRET = process.env.SESSION_SECRET || crypto.randomBytes(32).toString('hex');
if (!process.env.SESSION_SECRET) {
  console.warn('[auth] SESSION_SECRET is not set. Sessions will not survive a restart.');
}

const COOKIE = 'medisem_session';
const MAX_AGE_DAYS = 30;

function hashPassword(plain) {
  return bcrypt.hash(plain, 10);
}
function verifyPassword(plain, hash) {
  return bcrypt.compare(plain, hash);
}

function b64url(buf) {
  return Buffer.from(buf).toString('base64')
    .replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}
function unb64url(str) {
  return Buffer.from(String(str).replace(/-/g, '+').replace(/_/g, '/'), 'base64').toString();
}
function sign(payload) {
  const body = b64url(JSON.stringify(payload));
  const mac = b64url(crypto.createHmac('sha256', SECRET).update(body).digest());
  return body + '.' + mac;
}
function unsign(token) {
  if (!token || token.indexOf('.') === -1) return null;
  const [body, mac] = token.split('.');
  const expected = b64url(crypto.createHmac('sha256', SECRET).update(body).digest());
  // Constant-time compare so the signature cannot be guessed byte by byte.
  const a = Buffer.from(mac || ''), b = Buffer.from(expected);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return null;
  try {
    const payload = JSON.parse(unb64url(body));
    if (!payload.exp || payload.exp < Date.now()) return null;
    return payload;
  } catch (e) { return null; }
}

function issue(res, user) {
  const token = sign({
    uid: user.id,
    exp: Date.now() + MAX_AGE_DAYS * 86400000
  });
  const secure = process.env.NODE_ENV === 'production';
  res.setHeader('Set-Cookie',
    COOKIE + '=' + token +
    '; Path=/; HttpOnly; SameSite=Lax; Max-Age=' + (MAX_AGE_DAYS * 86400) +
    (secure ? '; Secure' : ''));
}

function revoke(res) {
  res.setHeader('Set-Cookie', COOKIE + '=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0');
}

function readCookie(req, name) {
  const raw = req.headers.cookie;
  if (!raw) return null;
  const found = raw.split(';').map((c) => c.trim()).find((c) => c.indexOf(name + '=') === 0);
  return found ? decodeURIComponent(found.slice(name.length + 1)) : null;
}

/** Express middleware. Populates req.user when a valid session is present. */
function attachUser(store) {
  return async function (req, res, next) {
    req.user = null;
    const payload = unsign(readCookie(req, COOKIE));
    if (payload) {
      try { req.user = await store.findUserById(payload.uid); }
      catch (e) { /* a database hiccup should not break page loads */ }
    }
    next();
  };
}

function requireUser(req, res, next) {
  if (!req.user) return res.status(401).json({ error: 'You need to be signed in to do that.' });
  next();
}

/** Never send the hash to the browser. */
function publicUser(user) {
  if (!user) return null;
  return {
    id: user.id,
    email: user.email,
    name: user.full_name,
    role: user.role,
    subjectIri: user.subject_iri
  };
}

module.exports = {
  hashPassword, verifyPassword, issue, revoke, attachUser, requireUser, publicUser, COOKIE
};
