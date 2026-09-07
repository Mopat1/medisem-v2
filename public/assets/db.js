/* =============================================================================
   db.js — local, non-clinical browser state.

   Clinical data lives on the server now (see api.js). What remains here is the
   handful of things that genuinely belong to this browser: interface
   preferences, and minting identifiers for records being created.
   ========================================================================== */
var DB = (function () {
  'use strict';

  var PREFS_KEY = 'medisem.prefs.v2';
  var memory = {};
  var HAS_STORAGE = (function () {
    try {
      window.localStorage.setItem('medisem.probe', '1');
      window.localStorage.removeItem('medisem.probe');
      return true;
    } catch (e) { return false; }
  })();

  function prefs() {
    if (!HAS_STORAGE) return memory;
    try { return JSON.parse(window.localStorage.getItem(PREFS_KEY) || '{}'); }
    catch (e) { return {}; }
  }
  function setPref(key, value) {
    var p = prefs();
    p[key] = value;
    if (HAS_STORAGE) window.localStorage.setItem(PREFS_KEY, JSON.stringify(p));
    else memory = p;
  }

  /**
   * A fresh identifier for a new record. Combines a timestamp with a counter so
   * two people creating records at the same moment cannot collide.
   */
  var counter = 0;
  function mintId(prefix) {
    counter++;
    var stamp = Date.now().toString(36).slice(-6).toUpperCase();
    var salt = Math.floor(Math.random() * 1296).toString(36).toUpperCase();
    return prefix + '_' + stamp + salt + counter;
  }

  return { prefs: prefs, setPref: setPref, mintId: mintId, hasStorage: function () { return HAS_STORAGE; } };
})();
