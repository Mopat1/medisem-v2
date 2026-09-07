/* =============================================================================
   app.js — the shell.

   Boot sequence, authentication, routing, the shared UI primitives every view
   builds from, and the provenance drawer that exposes the SPARQL behind any
   panel on the screen.
   ========================================================================== */
var App = (function () {
  'use strict';

  var KG = { base: null, mat: null, report: null, ready: false, stats: {} };
  var VIEWS = {};
  var state = { route: null, auth: null, persona: null, semantic: true, drawerOpen: false };

  /* ------------------------------------------------------------ dom helpers */

  function el(tag, attrs, children) {
    var node = document.createElement(tag);
    if (attrs) {
      for (var k in attrs) {
        var v = attrs[k];
        if (v === null || v === undefined || v === false) continue;
        if (k === 'class') node.className = v;
        else if (k === 'html') node.innerHTML = v;
        else if (k === 'text') node.textContent = v;
        else if (k === 'dataset') { for (var d in v) node.dataset[d] = v[d]; }
        else if (k.slice(0, 2) === 'on' && typeof v === 'function') node.addEventListener(k.slice(2), v);
        else node.setAttribute(k, v);
      }
    }
    (children || []).forEach(function (c) {
      if (c === null || c === undefined || c === false) return;
      node.appendChild(typeof c === 'string' || typeof c === 'number'
        ? document.createTextNode(String(c)) : c);
    });
    return node;
  }
  function frag(children) {
    var f = document.createDocumentFragment();
    (children || []).forEach(function (c) { if (c) f.appendChild(c); });
    return f;
  }
  function clear(node) { while (node.firstChild) node.removeChild(node.firstChild); return node; }
  function esc(s) {
    return String(s === undefined || s === null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  /* --------------------------------------------------------- formatting ---- */

  var MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  var TODAY = new Date('2026-08-31T00:00:00Z');

  function fmtDate(iso) {
    if (!iso) return '\u2014';
    var p = String(iso).slice(0, 10).split('-');
    if (p.length !== 3) return iso;
    return parseInt(p[2], 10) + ' ' + MONTHS[parseInt(p[1], 10) - 1] + ' ' + p[0];
  }
  function fmtShortDate(iso) {
    if (!iso) return '\u2014';
    var p = String(iso).slice(0, 10).split('-');
    if (p.length !== 3) return iso;
    return parseInt(p[2], 10) + ' ' + MONTHS[parseInt(p[1], 10) - 1];
  }
  function daysBetween(iso) {
    if (!iso) return null;
    var d = new Date(String(iso).slice(0, 10) + 'T00:00:00Z');
    return Math.round((TODAY - d) / 86400000);
  }
  function relative(iso) {
    var days = daysBetween(iso);
    if (days === null) return '';
    if (days < 0) return 'in ' + Math.abs(days) + (Math.abs(days) === 1 ? ' day' : ' days');
    if (days === 0) return 'today';
    if (days === 1) return 'yesterday';
    if (days < 30) return days + ' days ago';
    if (days < 365) return Math.round(days / 30) + ' months ago';
    var years = (days / 365);
    return (years < 1.6 ? '1 year' : Math.round(years) + ' years') + ' ago';
  }
  function money(n) {
    if (n === undefined || n === null || n === '') return '\u2014';
    return '\u20B9' + Number(n).toLocaleString('en-IN');
  }
  function num(n) {
    if (n === undefined || n === null || n === '') return '\u2014';
    return Number(n).toLocaleString('en-US');
  }
  function titleCase(s) {
    return String(s || '').replace(/([a-z])([A-Z])/g, '$1 $2');
  }
  function isTrue(v) { return v === 'true' || v === true; }

  /* ------------------------------------------------------ ui primitives ---- */

  /**
   * A titled panel. `provenance` attaches the ◈ chip that opens the drawer,
   * so any panel can show the query that produced it.
   */
  function panel(opts) {
    var head = el('div', { class: 'panel-head' }, [
      el('div', {}, [
        el('h2', { class: 'panel-title', text: opts.title }),
        opts.subtitle ? el('p', { class: 'panel-sub', text: opts.subtitle }) : null
      ]),
      el('div', { class: 'panel-tools' }, (opts.tools || []).concat(
        opts.provenance ? [provenanceChip(opts.provenance)] : []
      ))
    ]);
    var body = el('div', { class: 'panel-body' + (opts.flush ? ' is-flush' : '') }, opts.children || []);
    return el('section', { class: 'panel' + (opts.class ? ' ' + opts.class : '') }, [head, body]);
  }

  function provenanceChip(info) {
    var chip = el('button', {
      class: 'chip-prov',
      title: 'Show the SPARQL behind this panel',
      'aria-label': 'Show the query behind this panel',
      onclick: function (e) { e.stopPropagation(); openProvenance(info); }
    }, [el('span', { class: 'diamond', html: '&#9670;' }), el('span', { text: 'query' })]);
    if (!state.semantic) chip.classList.add('is-hidden');
    return chip;
  }

  function statTile(opts) {
    return el('div', { class: 'stat' + (opts.tone ? ' tone-' + opts.tone : '') }, [
      el('div', { class: 'stat-label', text: opts.label }),
      el('div', { class: 'stat-value', text: opts.value }),
      opts.detail ? el('div', { class: 'stat-detail', text: opts.detail }) : null,
      opts.derived ? el('span', { class: 'badge-derived', title: 'This number depends on facts the reasoner derived', text: 'derived' }) : null
    ]);
  }

  /** A data table. columns: [{key, label, align, render, mono, width}] */
  function table(columns, rows, opts) {
    opts = opts || {};
    var thead = el('thead', {}, [el('tr', {}, columns.map(function (c) {
      return el('th', {
        class: (c.align === 'right' ? 'ta-right' : ''),
        style: c.width ? 'width:' + c.width : null,
        text: c.label
      });
    }))]);
    var tbody = el('tbody', {}, rows.map(function (row, i) {
      var tr = el('tr', {
        class: opts.rowClass ? opts.rowClass(row) : null,
        onclick: opts.onRow ? function () { opts.onRow(row); } : null
      }, columns.map(function (c) {
        var content = c.render ? c.render(row, i) : row[c.key];
        var td = el('td', {
          class: (c.align === 'right' ? 'ta-right ' : '') + (c.mono ? 'mono' : '')
        });
        if (content instanceof Node) td.appendChild(content);
        else td.innerHTML = (content === undefined || content === null || content === '')
          ? '<span class="dim">\u2014</span>' : esc(content);
        return td;
      }));
      if (opts.onRow) tr.classList.add('is-clickable');
      return tr;
    }));
    var t = el('table', { class: 'data' + (opts.dense ? ' is-dense' : '') }, [thead, tbody]);
    if (!rows.length) {
      return el('div', { class: 'empty', text: opts.emptyText || 'Nothing to show here yet.' });
    }
    return el('div', { class: 'table-wrap' }, [t]);
  }

  function avatar(initials, opts) {
    opts = opts || {};
    return el('span', {
      class: 'avatar' + (opts.size ? ' is-' + opts.size : '') + (opts.tone ? ' tone-' + opts.tone : ''),
      text: (initials || '?').slice(0, 2).toUpperCase()
    });
  }

  function tag(text, tone) {
    return el('span', { class: 'tag' + (tone ? ' tone-' + tone : ''), text: text });
  }

  function derivedBadge(title) {
    return el('span', {
      class: 'badge-derived',
      title: title || 'Derived by the reasoner rather than entered by a person',
      text: 'derived'
    });
  }

  function emptyState(text, sub) {
    return el('div', { class: 'empty' }, [
      el('p', { text: text }),
      sub ? el('p', { class: 'empty-sub', text: sub }) : null
    ]);
  }

  function sectionHeading(text, sub) {
    return el('div', { class: 'section-head' }, [
      el('h2', { text: text }),
      sub ? el('p', { class: 'muted', text: sub }) : null
    ]);
  }

  /* --------------------------------------------------- provenance drawer --- */

  function openProvenance(info) {
    var drawer = document.getElementById('drawer');
    clear(drawer);

    var resultLine = info.rows !== undefined
      ? info.rows + (info.rows === 1 ? ' row' : ' rows') + (info.ms !== undefined ? ' in ' + info.ms + ' ms' : '')
      : null;

    drawer.appendChild(el('div', { class: 'drawer-head' }, [
      el('div', {}, [
        el('div', { class: 'drawer-eyebrow', text: 'Provenance' }),
        el('h2', { text: info.title || 'Behind this panel' })
      ]),
      el('button', { class: 'icon-btn', 'aria-label': 'Close', html: '&times;', onclick: closeProvenance })
    ]));

    var body = el('div', { class: 'drawer-body' });

    body.appendChild(el('p', { class: 'drawer-intro', text:
      info.intro || 'This panel is not filled from a JavaScript object. It is the result of running ' +
      'the following query against the knowledge graph.' }));

    if (resultLine) body.appendChild(el('div', { class: 'drawer-meta mono', text: resultLine }));

    body.appendChild(el('div', { class: 'code-block' }, [
      el('div', { class: 'code-head' }, [
        el('span', { text: 'SPARQL' }),
        el('button', { class: 'link-btn', text: 'Open in console', onclick: function () {
          closeProvenance();
          Semantic.openConsoleWith(info.sparql);
        } }),
        el('button', { class: 'link-btn', text: 'Copy', onclick: function (e) {
          copyText(info.sparql, e.target);
        } })
      ]),
      el('pre', { text: info.sparql || '' })
    ]));

    if (info.note) {
      body.appendChild(el('div', { class: 'drawer-note' }, [
        el('span', { class: 'diamond', html: '&#9670;' }),
        el('p', { text: info.note })
      ]));
    }

    if (info.triples && info.triples.length) {
      body.appendChild(el('h3', { class: 'drawer-h3', text: 'Triples involved' }));
      body.appendChild(tripleList(info.triples));
    }

    drawer.appendChild(body);
    document.body.classList.add('drawer-open');
    state.drawerOpen = true;
  }
  function closeProvenance() {
    document.body.classList.remove('drawer-open');
    state.drawerOpen = false;
  }

  function tripleList(triples) {
    return el('div', { class: 'triples' }, triples.map(function (t) {
      return el('div', { class: 'triple' + (t.derived ? ' is-derived' : '') }, [
        el('span', { class: 'tri-s', html: termHtml(t.s) }),
        el('span', { class: 'tri-p', html: termHtml(t.p) }),
        el('span', { class: 'tri-o', html: termHtml(t.o) }),
        t.rule ? el('span', { class: 'tri-rule', text: t.rule }) : null
      ]);
    }));
  }

  /** Render a term with the prefix dimmed, literals in the literal colour. */
  function termHtml(term) {
    if (term === undefined || term === null) return '<span class="dim">\u2014</span>';
    if (RDF.isLit(term)) return '<span class="lit">' + esc(RDF.litParts(term).value) + '</span>';
    if (RDF.isIRI(term)) {
      var s = RDF.shorten(RDF.iriOf(term));
      var i = s.indexOf(':');
      if (i === -1 || s.indexOf('http') === 0) return esc(s);
      return '<span class="pfx">' + esc(s.slice(0, i + 1)) + '</span>' + esc(s.slice(i + 1));
    }
    return esc(term);
  }

  function copyText(text, button) {
    var done = function () {
      if (!button) return;
      var old = button.textContent;
      button.textContent = 'Copied';
      setTimeout(function () { button.textContent = old; }, 1400);
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(done, function () {});
    } else {
      var ta = document.createElement('textarea');
      ta.value = text; document.body.appendChild(ta); ta.select();
      try { document.execCommand('copy'); done(); } catch (e) {}
      document.body.removeChild(ta);
    }
  }

  function saveFile(text, filename, mime) {
    var blob = new Blob([text], { type: mime || 'text/plain;charset=utf-8' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url; a.download = filename;
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
    setTimeout(function () { URL.revokeObjectURL(url); }, 800);
  }

  function toast(message, tone) {
    var host = document.getElementById('toasts');
    var node = el('div', { class: 'toast' + (tone ? ' tone-' + tone : ''), text: message });
    host.appendChild(node);
    setTimeout(function () {
      node.classList.add('is-out');
      setTimeout(function () { if (node.parentNode) node.parentNode.removeChild(node); }, 400);
    }, 3200);
  }

  /* ------------------------------------------------------------- boot ------ */

  function boot() {
    var status = document.getElementById('boot-status');
    var step = function (text) {
      if (status) status.textContent = text;
      return new Promise(function (r) { setTimeout(r, 16); });
    };

    return step('Checking your session')
      .then(function () { return API.me(); })
      .then(function (user) {
        state.auth = user;
        return step('Loading shared records');
      })
      .then(function () { return API.loadDelta(); })
      .then(function () { return step('Parsing the ontology'); })
      .then(function () {
        KG.base = new RDF.Store();
        var errors = [];
        [['ontology', ONTOLOGY_TTL], ['reference', REFERENCE_TTL], ['cohort', COHORT_TTL]]
          .forEach(function (pair) {
            try { RDF.parseTurtle(pair[1], KG.base); }
            catch (e) { errors.push(pair[0] + ': ' + e.message); }
          });
        KG.parseErrors = errors;
        KG.baseCount = KG.base.count();
        return step('Replaying ' + num(API.entries().length) + ' saved changes');
      })
      .then(function () {
        KG.deltaApplied = applyDelta();
        KG.statedCount = KG.base.count();
        return step('Reasoning over ' + num(KG.statedCount) + ' triples');
      })
      .then(function () {
        KG.mat = KG.base.copy();
        KG.report = RDF.reason(KG.mat);
        KG.ready = true;
        return step('Measuring the comorbidity network');
      })
      .then(function () {
        Comorbidity.build();
        KG.comorbidTriples = Comorbidity.materialise(KG.mat);
        refreshStats();
        return step('Ready');
      })
      .then(function () {
        var splash = document.getElementById('splash');
        if (splash) splash.classList.add('is-gone');
        state.semantic = DB.prefs().semantic !== false;
        restorePersona();
        window.addEventListener('hashchange', route);
        route();
        setTimeout(function () { if (splash && splash.parentNode) splash.parentNode.removeChild(splash); }, 500);
      });
  }

  /** Replay the server-held changeset onto the base graph. */
  function applyDelta() {
    var added = 0, removed = 0;
    var entries = API.entries();
    entries.forEach(function (e) {
      if (e.op === 'add' && KG.base.add(e.s, e.p, e.o)) added++;
    });
    entries.forEach(function (e) {
      if (e.op === 'remove' && KG.base.remove(e.s, e.p, e.o)) removed++;
    });
    return { entries: entries.length, added: added, removed: removed };
  }

  function refreshStats() {
    KG.stats = {
      stated: KG.base.count(),
      derived: KG.report.inferences.length,
      total: KG.mat.count(),
      rounds: KG.report.rounds,
      ms: KG.report.ms
    };
  }

  /** Recompute the reasoned graph after a write. */
  function rematerialise() {
    KG.mat = KG.base.copy();
    KG.report = RDF.reason(KG.mat);
    Comorbidity.build();
    KG.comorbidTriples = Comorbidity.materialise(KG.mat);
    refreshStats();
  }

  /**
   * Commit new triples: write them into the base graph, persist them as a
   * changeset entry, then run the reasoner again so every derived fact that
   * depends on them updates immediately.
   */
  /**
   * Write triples to the server, then apply them locally and re-reason. The
   * server confirms the write first, so nothing appears on screen that was not
   * actually saved.
   */
  function commit(triples, why, op) {
    return API.writeTriples(triples, why, op).then(function (out) {
      if (op === 'remove') {
        triples.forEach(function (t) { KG.base.remove(t[0], t[1], t[2]); });
      } else {
        triples.forEach(function (t) { KG.base.add(t[0], t[1], t[2]); });
      }
      rematerialise();
      return out;
    });
  }

  /** Retract triples, persisting the retraction as part of the changeset. */
  function retract(triples, why) {
    return commit(triples, why, 'remove');
  }

  /* ------------------------------------------------------------- auth ------ */

  var ACCOUNTS = `
SELECT ?account ?login ?passcode ?subject ?subjectName ?role ?roleName ?initials
WHERE {
  ?account a med:Account ; med:login ?login ; med:passcode ?passcode ;
           med:accountFor ?subject ; med:hasRole ?role .
  ?subject med:name ?subjectName .
  ?role med:name ?roleName .
  OPTIONAL { ?subject med:photoInitials ?initials }
}
ORDER BY ?roleName ?subjectName`;

  /** The demo personas that live in the graph, used by the Explore screen. */
  function demoPersonas() {
    return Q.run(ACCOUNTS).rows.map(function (a) {
      return {
        subjectIri: a.subject,
        subject: RDF.I(a.subject),
        name: a.subjectName,
        role: RDF.local(RDF.I(a.role)),
        roleName: a.roleName,
        initials: a.initials || a.subjectName.slice(0, 2),
        login: a.login
      };
    });
  }

  /**
   * The identity the interface is currently showing. Normally this is the
   * signed-in account. While exploring a demo persona it is that persona
   * instead, and state.auth still holds the real account underneath.
   */
  function currentIdentity() {
    if (state.persona) return state.persona;
    if (!state.auth) return null;
    return {
      subjectIri: state.auth.subjectIri.replace(/^<|>$/g, ''),
      subject: state.auth.subjectIri,
      name: state.auth.name,
      role: state.auth.role,
      roleName: ROLE_NAMES[state.auth.role] || state.auth.role,
      initials: initialsOf(state.auth.name),
      login: state.auth.email,
      isSelf: true
    };
  }

  var ROLE_NAMES = {
    PatientRole: 'Patient', DoctorRole: 'Doctor', AdminRole: 'Administration',
    LabRole: 'Laboratory', PharmacyRole: 'Pharmacy'
  };
  function initialsOf(name) {
    var parts = String(name || '').trim().split(/\s+/).filter(Boolean);
    if (!parts.length) return '??';
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }

  function enterPersona(persona) {
    state.persona = persona;
    try { window.sessionStorage.setItem('medisem.persona', JSON.stringify(persona)); } catch (e) {}
    window.location.hash = '#/home';
    route();
  }
  function leavePersona() {
    state.persona = null;
    try { window.sessionStorage.removeItem('medisem.persona'); } catch (e) {}
    window.location.hash = '#/home';
    route();
  }
  function restorePersona() {
    try {
      var raw = window.sessionStorage.getItem('medisem.persona');
      if (raw) state.persona = JSON.parse(raw);
    } catch (e) { state.persona = null; }
  }

  function signOut() {
    API.logout().then(function () {
      state.auth = null;
      state.persona = null;
      try { window.sessionStorage.removeItem('medisem.persona'); } catch (e) {}
      window.location.hash = '';
      route();
    });
  }

  /** After signing in or signing up, adopt the new session and redraw. */
  function adoptSession(user) {
    state.auth = user;
    state.persona = null;
    window.location.hash = '#/home';
    route();
  }

  /* ------------------------------------------------------------ routing ---- */

  var NAV = {
    PatientRole: [
      { id: 'home', label: 'My health', icon: 'pulse' },
      { id: 'book', label: 'Book appointment', icon: 'clock' },
      { id: 'history', label: 'Visit history', icon: 'clock' },
      { id: 'conditions', label: 'Conditions', icon: 'chart' },
      { id: 'medications', label: 'Medicines', icon: 'pill' },
      { id: 'results', label: 'Test results', icon: 'flask' },
      { id: 'network', label: 'Condition network', icon: 'graph' },
      { id: 'billing', label: 'Billing', icon: 'rupee' },
      { id: 'explore', label: 'Explore the system', icon: 'diamond' }
    ],
    DoctorRole: [
      { id: 'home', label: 'Clinic', icon: 'pulse' },
      { id: 'panel', label: 'My patients', icon: 'people' },
      { id: 'register', label: 'Register a patient', icon: 'building' },
      { id: 'alerts', label: 'Safety alerts', icon: 'alert' },
      { id: 'population', label: 'Population health', icon: 'graph' },
      { id: 'semantic', label: 'Knowledge graph', icon: 'diamond' },
      { id: 'explore', label: 'Explore the system', icon: 'graph' }
    ],
    AdminRole: [
      { id: 'home', label: 'Overview', icon: 'pulse' },
      { id: 'records', label: 'Patient records', icon: 'people' },
      { id: 'staff', label: 'Staff and wards', icon: 'building' },
      { id: 'population', label: 'Population health', icon: 'graph' },
      { id: 'semantic', label: 'Knowledge graph', icon: 'diamond' },
      { id: 'data', label: 'Data and exports', icon: 'download' },
      { id: 'explore', label: 'Explore the system', icon: 'graph' }
    ],
    LabRole: [
      { id: 'home', label: 'Worklist', icon: 'flask' },
      { id: 'abnormal', label: 'Abnormal results', icon: 'alert' },
      { id: 'semantic', label: 'Knowledge graph', icon: 'diamond' },
      { id: 'explore', label: 'Explore the system', icon: 'graph' }
    ],
    PharmacyRole: [
      { id: 'home', label: 'Dispensing', icon: 'pill' },
      { id: 'interactions', label: 'Interaction checks', icon: 'alert' },
      { id: 'semantic', label: 'Knowledge graph', icon: 'diamond' },
      { id: 'explore', label: 'Explore the system', icon: 'graph' }
    ]
  };

  function route() {
    closeProvenance();
    var root = document.getElementById('root');

    if (!state.auth) {
      document.body.classList.add('is-login');
      clear(root).appendChild(Auth.render());
      return;
    }
    document.body.classList.remove('is-login');
    var session = currentIdentity();

    var hash = (window.location.hash || '').replace(/^#\/?/, '');
    var parts = hash.split('/').filter(Boolean);
    var page = parts[0] || 'home';
    var arg = parts[1] ? decodeURIComponent(parts[1]) : null;

    state.route = { page: page, arg: arg };

    if (page === 'explore') {
      clear(root).appendChild(shell(session, page, function (host) { Explore.render(host); }));
      return;
    }

    var view = VIEWS[session.role];
    if (!view) { clear(root).appendChild(el('div', { class: 'wrap', text: 'No interface for this role.' })); return; }

    clear(root).appendChild(shell(session, page, function (host) {
      try {
        view.render(host, page, arg);
      } catch (e) {
        host.appendChild(el('div', { class: 'error-box' }, [
          el('h2', { text: 'This screen could not be drawn' }),
          el('pre', { text: (e && e.stack) || String(e) })
        ]));
      }
    }));
  }

  function go(page, arg) {
    window.location.hash = '#/' + page + (arg ? '/' + encodeURIComponent(arg) : '');
  }

  /* -------------------------------------------------------------- shell ---- */

  var ICONS = {
    pulse: '<path d="M2 12h4l2-6 4 12 2.5-6H22"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.2 2"/>',
    chart: '<path d="M4 20V9M10 20V4M16 20v-7M22 20H2"/>',
    pill: '<rect x="3" y="8" width="18" height="8" rx="4"/><path d="M12 8v8"/>',
    flask: '<path d="M9 3h6M10 3v6L4.6 18a2 2 0 0 0 1.7 3h11.4a2 2 0 0 0 1.7-3L14 9V3"/>',
    graph: '<circle cx="6" cy="7" r="2.5"/><circle cx="18" cy="9" r="2.5"/><circle cx="11" cy="18" r="2.5"/><path d="M8.2 8.1 15.6 8.6M16.6 11.2 12.6 15.7M8 9.2l2 6.4"/>',
    rupee: '<path d="M7 4h10M7 9h10M7 4c6 0 6 5 0 5M12 9c0 5-5 11-5 11h10"/>',
    people: '<circle cx="9" cy="8" r="3"/><path d="M3 20c0-3.3 2.7-5 6-5s6 1.7 6 5"/><path d="M16 5.5a3 3 0 0 1 0 5.5M17 15c2.5.5 4 2.2 4 5"/>',
    alert: '<path d="M12 3 2 20h20L12 3z"/><path d="M12 10v4M12 17h.01"/>',
    diamond: '<path d="M12 2 22 12 12 22 2 12z"/>',
    building: '<rect x="4" y="3" width="16" height="18"/><path d="M9 8h.01M15 8h.01M9 12h.01M15 12h.01M9 16h6"/>',
    download: '<path d="M12 3v12M7 11l5 5 5-5M4 21h16"/>'
  };
  function icon(name) {
    return '<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" ' +
      'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + (ICONS[name] || ICONS.diamond) + '</svg>';
  }

  function shell(session, page, fill) {
    var nav = NAV[session.role] || [];

    var sidebar = el('aside', { class: 'sidebar' }, [
      el('a', { class: 'brand', href: '#/home' }, [
        el('span', { class: 'brand-mark', html:
          '<svg viewBox="0 0 26 26" aria-hidden="true">' +
          '<line x1="5" y1="19" x2="13" y2="6" stroke="#4FBF95" stroke-width="1.4"/>' +
          '<line x1="13" y1="6" x2="21" y2="19" stroke="#7FA9D0" stroke-width="1.4"/>' +
          '<circle cx="5" cy="19" r="3" fill="#4FBF95"/>' +
          '<circle cx="13" cy="6" r="3" fill="#EAF0EE"/>' +
          '<circle cx="21" cy="19" r="3" fill="none" stroke="#7FA9D0" stroke-width="1.7"/></svg>' }),
        el('span', { class: 'brand-text' }, [
          el('strong', { text: 'MediSem' }),
          el('span', { text: 'Multispecialty Hospital' })
        ])
      ]),

      state.persona ? el('div', { class: 'persona-banner' }, [
        el('span', { class: 'persona-eyebrow', text: 'Exploring as' }),
        el('strong', { text: state.persona.name }),
        el('span', { class: 'persona-role', text: state.persona.roleName }),
        el('button', { class: 'link-btn light', text: 'Return to my account',
          onclick: leavePersona })
      ]) : null,

      el('nav', { class: 'nav' }, nav.map(function (item) {
        var a = el('a', {
          class: 'nav-item' + (item.id === page ? ' is-active' : ''),
          href: '#/' + item.id
        }, []);
        a.innerHTML = icon(item.icon) + '<span>' + esc(item.label) + '</span>';
        return a;
      })),

      el('div', { class: 'sidebar-foot' }, [
        el('div', { class: 'semantic-switch' }, [
          el('label', { class: 'switch' }, [
            (function () {
              var input = el('input', { type: 'checkbox' });
              input.checked = state.semantic;
              input.addEventListener('change', function () {
                state.semantic = input.checked;
                DB.setPref('semantic', state.semantic);
                route();
              });
              return input;
            })(),
            el('span', { class: 'switch-track' }, [el('span', { class: 'switch-knob' })])
          ]),
          el('div', {}, [
            el('span', { class: 'switch-label', text: 'Semantic mode' }),
            el('span', { class: 'switch-hint', text: state.semantic ? 'Showing the graph behind the screen' : 'Hidden' })
          ])
        ]),
        el('div', { class: 'user-card' }, [
          avatar(state.auth ? initialsOf(state.auth.name) : session.initials, { tone: 'light' }),
          el('div', { class: 'user-meta' }, [
            el('span', { class: 'user-name', text: state.auth ? state.auth.name : session.name }),
            el('span', { class: 'user-role', text: state.auth ? (ROLE_NAMES[state.auth.role] || '') : session.roleName })
          ]),
          el('button', { class: 'icon-btn ghost', title: 'Sign out', onclick: signOut, html:
            '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round">' +
            '<path d="M15 4h4v16h-4M10 8l-4 4 4 4M6 12h9"/></svg>' })
        ])
      ])
    ]);

    var content = el('div', { class: 'content' });
    fill(content);

    var main = el('div', { class: 'main' }, [content]);
    return el('div', { class: 'shell' }, [sidebar, main]);
  }

  /** Standard page header inside a view. */
  function pageHead(title, subtitle, actions) {
    return el('header', { class: 'page-head' }, [
      el('div', {}, [
        el('h1', { text: title }),
        subtitle ? el('p', { class: 'page-sub', text: subtitle }) : null
      ]),
      actions ? el('div', { class: 'page-actions' }, actions) : null
    ]);
  }

  /**
   * A banner explaining what the reasoner contributed to the current screen.
   * Only rendered while semantic mode is on.
   */
  function semanticNote(text, opts) {
    if (!state.semantic) return null;
    opts = opts || {};
    return el('div', { class: 'sem-note' }, [
      el('span', { class: 'diamond', html: '&#9670;' }),
      el('div', {}, [
        el('p', { html: text }),
        opts.sparql ? el('button', {
          class: 'link-btn', text: 'Show the query',
          onclick: function () { openProvenance({ title: opts.title || 'Behind this screen', sparql: opts.sparql, note: opts.note }); }
        }) : null
      ])
    ]);
  }

  return {
    KG: KG, VIEWS: VIEWS, state: state, NAV: NAV,
    el: el, frag: frag, clear: clear, esc: esc, icon: icon,
    fmtDate: fmtDate, fmtShortDate: fmtShortDate, relative: relative, daysBetween: daysBetween,
    money: money, num: num, titleCase: titleCase, isTrue: isTrue, TODAY: TODAY,
    panel: panel, statTile: statTile, table: table, avatar: avatar, tag: tag,
    derivedBadge: derivedBadge, emptyState: emptyState, sectionHeading: sectionHeading,
    pageHead: pageHead, semanticNote: semanticNote, provenanceChip: provenanceChip,
    openProvenance: openProvenance, closeProvenance: closeProvenance,
    termHtml: termHtml, tripleList: tripleList,
    copyText: copyText, saveFile: saveFile, toast: toast,
    boot: boot, route: route, go: go,
    commit: commit, retract: retract, rematerialise: rematerialise, refreshStats: refreshStats,
    demoPersonas: demoPersonas, currentIdentity: currentIdentity, ROLE_NAMES: ROLE_NAMES,
    initialsOf: initialsOf, enterPersona: enterPersona, leavePersona: leavePersona,
    adoptSession: adoptSession, signOut: signOut
  };
})();
