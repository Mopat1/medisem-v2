/* =============================================================================
   api.js — talking to the server.

   Replaces the browser-only persistence of the earlier version. The changeset
   now lives in Postgres, so a record entered by a doctor on one machine is
   visible to the laboratory on another. Sessions are HttpOnly cookies, so
   nothing here handles a token by hand.

   If the network fails the app keeps working against whatever it already has;
   it simply cannot save. That is reported honestly rather than silently
   dropping the write.
   ========================================================================== */
var API = (function () {
  'use strict';

  var state = { user: null, degraded: false, entries: [] };

  async function call(url, options) {
    var res;
    try {
      res = await fetch(url, Object.assign({
        headers: { 'Content-Type': 'application/json' },
        credentials: 'same-origin'
      }, options || {}));
    } catch (e) {
      throw new Error('Could not reach the server. Check your connection.');
    }
    var data = null;
    try { data = await res.json(); } catch (e) { /* some responses have no body */ }
    if (!res.ok) {
      throw new Error((data && data.error) || ('Request failed with status ' + res.status));
    }
    return data || {};
  }

  /* ---------------------------------------------------------------- auth */

  async function me() {
    try {
      var out = await call('/api/auth/me');
      state.user = out.user;
      return out.user;
    } catch (e) {
      state.user = null;
      return null;
    }
  }

  async function login(email, password) {
    var out = await call('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email: email, password: password })
    });
    state.user = out.user;
    return out.user;
  }

  async function signup(details) {
    var out = await call('/api/auth/signup', {
      method: 'POST', body: JSON.stringify(details)
    });
    state.user = out.user;
    return out;
  }

  async function logout() {
    try { await call('/api/auth/logout', { method: 'POST' }); } catch (e) { /* sign out anyway */ }
    state.user = null;
  }

  /** Create a login for somebody else, used when staff register a patient. */
  function provision(details) {
    return call('/api/auth/provision', { method: 'POST', body: JSON.stringify(details) });
  }

  /* --------------------------------------------------------------- delta */

  async function loadDelta() {
    try {
      var out = await call('/api/delta');
      state.entries = out.entries || [];
      state.degraded = !!out.degraded;
      return state.entries;
    } catch (e) {
      state.entries = [];
      state.degraded = true;
      return [];
    }
  }

  /**
   * Persist triples, then hand them back so the caller can apply them locally.
   * The write is confirmed by the server before the interface acts on it, so
   * the screen never shows a record that was not saved.
   */
  async function writeTriples(triples, why, op) {
    var out = await call('/api/delta', {
      method: 'POST',
      body: JSON.stringify({ triples: triples, why: why, op: op || 'add' })
    });
    (out.entries || []).forEach(function (e) { state.entries.push(e); });
    return out;
  }

  function health() { return call('/api/health'); }

  return {
    state: state,
    me: me, login: login, signup: signup, logout: logout, provision: provision,
    loadDelta: loadDelta, writeTriples: writeTriples, health: health,
    entries: function () { return state.entries; },
    isDegraded: function () { return state.degraded; }
  };
})();
