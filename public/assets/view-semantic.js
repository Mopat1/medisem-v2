/* =============================================================================
   view-semantic.js — the knowledge graph tools.

   The ontology browser, a SPARQL console, the inference explorer and the export
   and changeset screens. This is where the machinery is exposed directly rather
   than woven into a clinical screen.
   ========================================================================== */
var Semantic = (function () {
  'use strict';
  var el = App.el;

  var tab = 'overview';
  var consoleSeed = null;

  function openConsoleWith(sparql) {
    consoleSeed = sparql;
    tab = 'console';
    var page = App.currentIdentity().role === 'DoctorRole' || App.currentIdentity().role === 'AdminRole'
      ? 'semantic' : 'semantic';
    App.go(page);
    App.route();
  }

  function render(host) {
    host.appendChild(App.pageHead('Knowledge graph',
      App.num(App.KG.stats.stated) + ' triples stated, ' + App.num(App.KG.stats.derived) +
      ' derived by the reasoner in ' + App.KG.stats.rounds + ' rounds.'));

    var tabs = [
      ['overview', 'Overview'], ['ontology', 'Ontology'], ['console', 'SPARQL console'],
      ['inference', 'Inference explorer'], ['changes', 'Changeset']
    ];
    var body = el('div', { class: 'tab-body' });

    var bar = el('nav', { class: 'tabs' }, tabs.map(function (t) {
      return el('button', {
        class: 'tab' + (t[0] === tab ? ' is-active' : ''),
        text: t[1],
        onclick: function () { tab = t[0]; paint(); Array.prototype.forEach.call(
          bar.children, function (b, i) { b.className = 'tab' + (tabs[i][0] === tab ? ' is-active' : ''); }); }
      });
    }));

    function paint() {
      App.clear(body);
      ({ overview: overview, ontology: ontology, console: sparqlConsole,
         inference: inference, changes: changes }[tab] || overview)(body);
    }

    host.appendChild(bar);
    host.appendChild(body);
    paint();
  }

  /* -------------------------------------------------------------- overview */

  function overview(host) {
    var report = App.KG.report;
    var byRule = Object.keys(report.byRule).sort(function (a, b) {
      return report.byRule[b] - report.byRule[a];
    });

    host.appendChild(el('div', { class: 'grid-4' }, [
      App.statTile({ label: 'Stated triples', value: App.num(App.KG.stats.stated),
        detail: 'Written in the Turtle plus your saved edits' }),
      App.statTile({ label: 'Derived triples', value: App.num(App.KG.stats.derived),
        detail: 'Produced by the reasoner', derived: true }),
      App.statTile({ label: 'Total in the graph', value: App.num(App.KG.stats.total),
        detail: 'What every query runs against' }),
      App.statTile({ label: 'Reasoning time', value: App.KG.stats.ms + ' ms',
        detail: 'Fixpoint reached in ' + App.KG.stats.rounds + ' rounds' })
    ]));

    host.appendChild(App.panel({
      title: 'Which rules fired',
      subtitle: 'Every derived triple is attributed to the entailment rule that produced it',
      flush: true,
      children: [App.table([
        { key: 'rule', label: 'Rule', mono: true, render: function (r) { return r; } },
        { key: 'desc', label: 'What it does', render: function (r) { return RDF.RULE_TEXT[r] || ''; } },
        { key: 'count', label: 'Triples', align: 'right', render: function (r) { return App.num(report.byRule[r]); } },
        { key: 'bar', label: '', render: function (r) {
          var top = report.byRule[byRule[0]];
          return el('span', { class: 'bar-track' }, [
            el('span', { class: 'bar-fill is-derived', style: 'width:' + (report.byRule[r] / top * 100) + '%' })
          ]);
        } }
      ], byRule, { dense: true })]
    }));

    var census = Q.classCensus();
    var stated = Q.classCensus(App.KG.base);
    var statedMap = {};
    stated.rows.forEach(function (r) { statedMap[r.class] = Number(r.count); });

    var grew = census.rows.filter(function (r) {
      return Number(r.count) > (statedMap[r.class] || 0);
    }).slice(0, 20);

    host.appendChild(App.panel({
      title: 'Classes that gained members',
      subtitle: 'Individuals the reasoner placed into a class nobody typed them into',
      class: 'panel-semantic', flush: true,
      provenance: { title: 'Class census', sparql: census.sparql, rows: census.rows.length },
      children: [App.table([
        { key: 'class', label: 'Class', mono: true, render: function (r) {
          return RDF.shorten(r.class);
        } },
        { key: 'stated', label: 'Stated', align: 'right', render: function (r) {
          return String(statedMap[r.class] || 0);
        } },
        { key: 'count', label: 'After reasoning', align: 'right', render: function (r) {
          return el('strong', { class: 'grew', text: r.count });
        } },
        { key: 'gain', label: 'Gain', align: 'right', render: function (r) {
          return '+' + (Number(r.count) - (statedMap[r.class] || 0));
        } }
      ], grew, { dense: true })]
    }));
  }

  /* -------------------------------------------------------------- ontology */

  function ontology(host) {
    var base = App.KG.base;
    var classes = base.match(null, RDF.C.TYPE, RDF.C.CLASS)
      .filter(function (q) { return RDF.isIRI(q[0]); })
      .map(function (q) {
        var iri = q[0];
        return {
          iri: iri,
          curie: RDF.shorten(RDF.iriOf(iri)),
          label: base.val(iri, RDF.C.LABEL) || RDF.local(iri),
          comment: base.val(iri, RDF.C.COMMENT) || '',
          supers: base.objects(iri, RDF.C.SUBCLASS).filter(RDF.isIRI).map(function (o) { return RDF.shorten(RDF.iriOf(o)); }),
          defined: base.match(iri, RDF.C.EQCLASS, null).length > 0,
          restricted: base.objects(iri, RDF.C.SUBCLASS).some(RDF.isBlank),
          count: App.KG.mat.match(null, RDF.C.TYPE, iri).length,
          stated: base.match(null, RDF.C.TYPE, iri).length
        };
      }).sort(function (a, b) { return a.label.localeCompare(b.label); });

    host.appendChild(el('p', { class: 'muted mb', text:
      'A class marked defined has an owl:equivalentClass expression: membership is computed from ' +
      'what an individual does, not declared. Those are the rows where the two count columns differ.' }));

    host.appendChild(App.panel({
      title: 'Classes', subtitle: classes.length + ' in the ontology', flush: true,
      children: [App.table([
        { key: 'curie', label: 'Class', mono: true },
        { key: 'label', label: 'Label' },
        { key: 'supers', label: 'Subclass of', mono: true, render: function (r) { return r.supers.join(', '); } },
        { key: 'kind', label: 'Kind', render: function (r) {
          if (r.defined) return App.tag('defined', 'blue');
          if (r.restricted) return App.tag('restricted', 'quiet');
          return App.tag('primitive', 'quiet');
        } },
        { key: 'stated', label: 'Stated', align: 'right' },
        { key: 'count', label: 'Reasoned', align: 'right', render: function (r) {
          return r.count > r.stated ? el('strong', { class: 'grew', text: String(r.count) }) : String(r.count);
        } }
      ], classes, { dense: true })]
    }));

    [['Object properties', RDF.C.OBJPROP], ['Datatype properties', RDF.C.DATAPROP]].forEach(function (pair) {
      var props = base.match(null, RDF.C.TYPE, pair[1])
        .filter(function (q) { return RDF.isIRI(q[0]); })
        .map(function (q) {
          var iri = q[0];
          var chars = base.objects(iri, RDF.C.TYPE).map(function (o) { return RDF.shorten(RDF.iriOf(o)); })
            .filter(function (c) { return c !== 'owl:ObjectProperty' && c !== 'owl:DatatypeProperty'; });
          var chain = base.one(iri, RDF.C.CHAIN);
          return {
            curie: RDF.shorten(RDF.iriOf(iri)),
            domain: base.objects(iri, RDF.C.DOMAIN).map(function (o) { return RDF.shorten(RDF.iriOf(o)); }).join(', '),
            range: base.objects(iri, RDF.C.RANGE).map(function (o) { return RDF.shorten(RDF.iriOf(o)); }).join(', '),
            chars: chars,
            chain: chain ? RDF.readList(base, chain).map(function (c) { return RDF.local(c); }).join(' \u2192 ') : '',
            uses: base.match(null, iri, null).length,
            reasoned: App.KG.mat.match(null, iri, null).length
          };
        }).sort(function (a, b) { return a.curie.localeCompare(b.curie); });

      host.appendChild(App.panel({
        title: pair[0], subtitle: props.length + ' declared', flush: true,
        children: [App.table([
          { key: 'curie', label: 'Property', mono: true },
          { key: 'domain', label: 'Domain', mono: true },
          { key: 'range', label: 'Range', mono: true },
          { key: 'chars', label: 'Characteristics', render: function (r) {
            if (!r.chars.length && !r.chain) return '';
            return el('div', { class: 'chip-row' },
              r.chars.map(function (c) { return el('span', { class: 'chip-class mono', text: c }); })
                .concat(r.chain ? [el('span', { class: 'chip-chain mono', text: r.chain })] : []));
          } },
          { key: 'uses', label: 'Stated', align: 'right' },
          { key: 'reasoned', label: 'Reasoned', align: 'right', render: function (r) {
            return r.reasoned > r.uses ? el('strong', { class: 'grew', text: String(r.reasoned) }) : String(r.reasoned);
          } }
        ], props, { dense: true })]
      }));
    });
  }

  /* --------------------------------------------------------------- console */

  var SAMPLES = [
    { name: 'Critical patients (needs reasoning)', q:
`SELECT ?name ?disease ?severity
WHERE {
  ?p a med:CriticalPatient ;
     med:name ?name ;
     med:hasCondition ?c .
  ?c a med:CriticalCondition ;
     med:ofDisease ?d ;
     med:severity ?severity .
  ?d med:name ?disease .
}
ORDER BY ?name` },
    { name: 'Who suffers from what (property chain)', q:
`SELECT ?patient ?disease
WHERE {
  ?p med:suffersFrom ?d ;
     med:name ?patient .
  ?d med:name ?disease .
}
ORDER BY ?patient
LIMIT 60` },
    { name: 'Top comorbid pairs', q:
`SELECT ?diseaseA ?diseaseB (COUNT(DISTINCT ?patient) AS ?shared)
WHERE {
  ?patient med:suffersFrom ?a , ?b .
  ?a med:name ?diseaseA .
  ?b med:name ?diseaseB .
  FILTER(STR(?a) < STR(?b))
}
GROUP BY ?diseaseA ?diseaseB
ORDER BY DESC(?shared)
LIMIT 25` },
    { name: 'Patients on interacting drugs', q:
`SELECT DISTINCT ?patient ?drugA ?drugB
WHERE {
  ?p med:name ?patient ;
     med:takesMedication ?a , ?b .
  ?a med:interactsWith ?b ; med:name ?drugA .
  ?b med:name ?drugB .
  FILTER(STR(?a) < STR(?b))
}` },
    { name: 'Caseload of every doctor (inverse + chain)', q:
`SELECT ?doctor (COUNT(DISTINCT ?patient) AS ?patients)
WHERE {
  ?patient med:seenBy ?d .
  ?d med:name ?doctor .
}
GROUP BY ?doctor
ORDER BY DESC(?patients)` },
    { name: 'Abnormal results (defined class)', q:
`SELECT ?analyte ?value ?unit ?patient
WHERE {
  ?r a med:AbnormalResult ;
     med:analyte ?analyte ; med:value ?value ; med:unit ?unit .
  ?o med:hasResult ?r ; med:forPatient ?p .
  ?p med:name ?patient .
}
LIMIT 50` },
    { name: 'Class census', q:
`SELECT ?class (COUNT(DISTINCT ?i) AS ?count)
WHERE {
  ?i a ?class .
  FILTER(STRSTARTS(STR(?class), STR(med:)))
}
GROUP BY ?class
ORDER BY DESC(?count)` },
    { name: 'CONSTRUCT a schema.org card', q:
`CONSTRUCT {
  ?p a schema:Patient ;
     schema:name ?name ;
     schema:identifier ?mrn .
}
WHERE {
  ?p a med:Patient ; med:name ?name ; med:mrn ?mrn .
}` },
    { name: 'ASK: is any bed free in the CCU?', q:
`ASK {
  ?bed a med:Bed ; med:locatedIn res:Ward_CCU ; med:occupied false .
}` }
  ];

  function sparqlConsole(host) {
    var reasoning = { on: true };
    var editor = el('textarea', { class: 'sparql-editor', spellcheck: 'false' });
    editor.value = consoleSeed || SAMPLES[0].q;
    consoleSeed = null;

    var results = el('div', { class: 'console-results' });

    function runIt() {
      var text = editor.value.trim();
      if (!text) return;
      var full = /\bPREFIX\s+med:/i.test(text) ? text : RDF.PREFIX_BLOCK + '\n\n' + text;
      var store = reasoning.on ? App.KG.mat : App.KG.base;
      App.clear(results);
      var out;
      try {
        out = RDF.query(full, store);
      } catch (e) {
        results.appendChild(el('div', { class: 'err-box' }, [
          el('strong', { text: 'The query did not run' }),
          el('pre', { text: e.message })
        ]));
        return;
      }

      var meta = el('div', { class: 'console-meta mono' }, [
        el('span', { text: out.form === 'ask' ? 'boolean'
          : (out.count || 0) + (out.form === 'construct' ? ' triples' : ' rows') }),
        el('span', { text: out.ms + ' ms' }),
        el('span', { text: reasoning.on ? 'reasoned graph' : 'stated graph only' })
      ]);
      results.appendChild(meta);

      if (out.form === 'ask') {
        results.appendChild(el('div', { class: 'ask-result ' + (out.boolean ? 'is-true' : 'is-false'),
          text: out.boolean ? 'true' : 'false' }));
        return;
      }
      if (out.form === 'construct') {
        results.appendChild(el('pre', { class: 'ttl-out', text: RDF.toTurtle(out.store) }));
        return;
      }
      if (!out.rows.length) {
        results.appendChild(App.emptyState('The query is valid but nothing matched.',
          reasoning.on ? '' : 'Try switching reasoning on.'));
        return;
      }
      results.appendChild(App.table(out.vars.map(function (v) {
        return { key: v, label: '?' + v, mono: true, render: function (row) {
          return RDF.shortTerm(row[v]);
        } };
      }), out.rows.slice(0, 400), { dense: true }));
      if (out.rows.length > 400) {
        results.appendChild(el('p', { class: 'muted small', text:
          'Showing the first 400 of ' + out.rows.length + ' rows.' }));
      }
    }

    var picker = el('select', { class: 'field', onchange: function (e) {
      var s = SAMPLES[e.target.selectedIndex - 1];
      if (s) { editor.value = s.q; runIt(); }
    } }, [el('option', { text: 'Load a saved query\u2026' })].concat(SAMPLES.map(function (s) {
      return el('option', { text: s.name });
    })));

    var toggle = el('label', { class: 'inline-check' }, [
      (function () {
        var i = el('input', { type: 'checkbox' });
        i.checked = true;
        i.addEventListener('change', function () { reasoning.on = i.checked; runIt(); });
        return i;
      })(),
      el('span', { text: 'Reason over the graph' })
    ]);

    host.appendChild(App.panel({
      title: 'SPARQL console',
      subtitle: 'Queries run against the same graph the clinical screens use',
      tools: [picker],
      children: [
        editor,
        el('div', { class: 'console-bar' }, [
          el('button', { class: 'btn btn-primary', text: 'Run query', onclick: runIt }),
          toggle,
          el('span', { class: 'muted small', text: 'PREFIX declarations are added automatically' })
        ]),
        results
      ]
    }));
    runIt();
  }

  /* ------------------------------------------------------------- inference */

  function inference(host) {
    var report = App.KG.report;
    var filter = { rule: 'all', term: '' };

    var select = el('select', { class: 'field' }, [el('option', { value: 'all',
      text: 'All rules (' + App.num(report.inferences.length) + ')' })].concat(
      Object.keys(report.byRule).sort().map(function (r) {
        return el('option', { value: r, text: r + '  (' + report.byRule[r] + ')' });
      })));
    var search = el('input', { class: 'field search', type: 'search', placeholder: 'Filter by subject or predicate' });

    var listHost = el('div');

    function paint() {
      var rows = report.inferences.filter(function (i) {
        if (filter.rule !== 'all' && i.rule !== filter.rule) return false;
        if (!filter.term) return true;
        var hay = (i.s + ' ' + i.p + ' ' + i.o).toLowerCase();
        return hay.indexOf(filter.term.toLowerCase()) !== -1;
      });
      App.clear(listHost);
      if (filter.rule !== 'all') {
        listHost.appendChild(el('p', { class: 'muted mb', text: RDF.RULE_TEXT[filter.rule] || '' }));
      }
      listHost.appendChild(App.table([
        { key: 's', label: 'Subject', render: function (i) {
          var span = el('span'); span.innerHTML = App.termHtml(i.s); return span;
        } },
        { key: 'p', label: 'Predicate', render: function (i) {
          var span = el('span'); span.innerHTML = App.termHtml(i.p); return span;
        } },
        { key: 'o', label: 'Object', render: function (i) {
          var span = el('span'); span.innerHTML = App.termHtml(i.o); return span;
        } },
        { key: 'rule', label: 'Rule', mono: true, render: function (i) {
          return el('span', { class: 'rule-tag', text: i.rule });
        } },
        { key: 'because', label: 'Because', render: function (i) {
          return el('span', { class: 'because', text: i.because });
        } }
      ], rows.slice(0, 300), { dense: true }));
      if (rows.length > 300) {
        listHost.appendChild(el('p', { class: 'muted small', text:
          'Showing 300 of ' + App.num(rows.length) + '. Narrow by rule to see the rest.' }));
      }
    }
    select.addEventListener('change', function () { filter.rule = select.value; paint(); });
    search.addEventListener('input', function () { filter.term = search.value; paint(); });

    host.appendChild(el('p', { class: 'muted mb', text:
      'Every derived triple, with the rule that produced it and the premises it came from. This is ' +
      'the audit trail for anything the interface calls derived.' }));

    host.appendChild(App.panel({
      title: 'Derived facts', tools: [select, search], flush: true, children: [listHost]
    }));
    paint();
  }

  /* -------------------------------------------------------------- changes */

  function changes(host) {
    var entries = API.entries();

    host.appendChild(el('div', { class: 'notice notice-quiet' }, [
      el('strong', { text: 'How persistence works here.' }),
      el('p', { text:
        'The base graph is compiled into the page and never changes. Anything anyone records is ' +
        'appended to a changeset of RDF additions and retractions held in the database, replayed ' +
        'over the base graph on every load, and then reasoned over. The edit history is itself RDF. ' +
        'Because it lives on the server, a record a doctor enters is visible to the laboratory, the ' +
        'pharmacy and the patient, on any device.' })
    ]));

    host.appendChild(el('div', { class: 'grid-3' }, [
      App.statTile({ label: 'Changeset entries', value: App.num(entries.length),
        detail: API.isDegraded() ? 'Server unreachable, showing local view only' : 'Stored in the database, shared by everyone' }),
      App.statTile({ label: 'Base graph', value: App.num(App.KG.baseCount),
        detail: 'Compiled into the bundle' }),
      App.statTile({ label: 'Graph now', value: App.num(App.KG.stats.total),
        detail: 'Base plus changes plus inference' })
    ]));

    host.appendChild(App.panel({
      title: 'Changeset',
      subtitle: 'Every triple written since this browser first loaded the app',
      flush: true,
      tools: [
        el('button', { class: 'link-btn', text: 'Export as Turtle', onclick: function () {
          var s = new RDF.Store();
          entries.filter(function (e) { return e.op === 'add'; })
            .forEach(function (e) { s.add(e.s, e.p, e.o); });
          App.saveFile(RDF.toTurtle(s), 'medisem-changeset.ttl', 'text/turtle');
        } }),
        el('span', { class: 'muted small', text:
          'The changeset is shared, so it cannot be cleared from here.' })
      ],
      children: [entries.length ? App.table([
        { key: 'op', label: '', render: function (e) {
          return App.tag(e.op === 'add' ? 'added' : 'retracted', e.op === 'add' ? 'green' : 'red');
        } },
        { key: 's', label: 'Subject', render: function (e) {
          var span = el('span'); span.innerHTML = App.termHtml(e.s); return span;
        } },
        { key: 'p', label: 'Predicate', render: function (e) {
          var span = el('span'); span.innerHTML = App.termHtml(e.p); return span;
        } },
        { key: 'o', label: 'Object', render: function (e) {
          var span = el('span'); span.innerHTML = App.termHtml(e.o); return span;
        } },
        { key: 'at', label: 'When', render: function (e) { return e.at ? e.at.slice(0, 16).replace('T', ' ') : ''; } },
        { key: 'why', label: 'Why' }
      ], entries.slice().reverse(), { dense: true })
        : App.emptyState('No changes recorded yet.',
            'Register a patient, record a consultation, enter a lab result or dispense a prescription and it will appear here.')]
    }));
  }

  /* ------------------------------------------------------ data and exports */

  function renderData(host) {
    host.appendChild(App.pageHead('Data and exports',
      'The whole graph, in the serialisation of your choice.'));

    var inferredStore = new RDF.Store();
    App.KG.report.inferences.forEach(function (i) { inferredStore.add(i.s, i.p, i.o); });

    var SETS = {
      stated: { label: 'Stated only', store: App.KG.base,
        note: 'The Turtle as authored, plus anything recorded in this browser.' },
      derived: { label: 'Derived only', store: inferredStore,
        note: 'Just what the reasoner added. Useful for showing what inference contributes.' },
      all: { label: 'Everything', store: App.KG.mat,
        note: 'Stated and derived together, which is what the interface queries.' }
    };
    var FORMATS = [
      { id: 'turtle', label: 'Turtle', ext: 'ttl', mime: 'text/turtle', fn: RDF.toTurtle,
        note: 'Readable, grouped by subject. Open this one in Prot\u00e9g\u00e9.' },
      { id: 'ntriples', label: 'N-Triples', ext: 'nt', mime: 'application/n-triples', fn: RDF.toNTriples,
        note: 'One triple per line, easy to diff or load in bulk.' },
      { id: 'jsonld', label: 'JSON-LD', ext: 'jsonld', mime: 'application/ld+json', fn: RDF.toJsonLd,
        note: 'Node objects with a shared context, for the web.' },
      { id: 'rdfxml', label: 'RDF/XML', ext: 'rdf', mime: 'application/rdf+xml', fn: RDF.toRdfXml,
        note: 'rdf:Description blocks, for older tooling.' }
    ];

    var chosen = { set: 'all' };
    var setPicker = el('div', { class: 'seg' }, Object.keys(SETS).map(function (key) {
      return el('button', {
        class: 'seg-btn' + (key === chosen.set ? ' is-active' : ''),
        text: SETS[key].label,
        onclick: function (e) {
          chosen.set = key;
          Array.prototype.forEach.call(setPicker.children, function (b) { b.className = 'seg-btn'; });
          e.target.className = 'seg-btn is-active';
          hint.textContent = SETS[key].note;
        }
      });
    }));
    var hint = el('p', { class: 'muted', text: SETS.all.note });

    host.appendChild(App.panel({
      title: 'Export the graph',
      children: [
        setPicker, hint,
        el('div', { class: 'export-grid' }, FORMATS.map(function (f) {
          return el('div', { class: 'export-card' }, [
            el('div', {}, [
              el('h3', { text: f.label }),
              el('p', { class: 'muted small', text: f.note })
            ]),
            el('button', { class: 'btn btn-sm', text: 'Download', onclick: function () {
              var store = SETS[chosen.set].store;
              App.saveFile(f.fn(store), 'medisem-' + chosen.set + '.' + f.ext, f.mime);
              App.toast(f.label + ' file downloaded', 'good');
            } })
          ]);
        }))
      ]
    }));

    host.appendChild(App.panel({
      title: 'The comorbidity network as RDF',
      subtitle: App.num(App.KG.comorbidTriples) + ' med:comorbidWith triples written back into the graph',
      class: 'panel-semantic',
      children: [
        el('p', { class: 'muted mb', text:
          'The discovered network is not kept outside the data. Every pair that clears the threshold ' +
          'is asserted back as med:comorbidWith, a symmetric property, so it can be queried like any ' +
          'other fact and travels with an export.' }),
        el('pre', { class: 'ttl-out', text: sampleComorbidTurtle() }),
        el('button', { class: 'btn btn-sm', text: 'Download the network as Turtle', onclick: function () {
          var s = new RDF.Store();
          var P = RDF.I(RDF.NS.med + 'comorbidWith');
          Comorbidity.get().edges.forEach(function (e) { s.add(e.a, P, e.b); s.add(e.b, P, e.a); });
          App.saveFile(RDF.toTurtle(s), 'medisem-comorbidity.ttl', 'text/turtle');
        } })
      ]
    }));

    host.appendChild(App.panel({
      title: 'Parse and reasoning report',
      children: [el('dl', { class: 'kv' }, [
        kv('Base graph', App.num(App.KG.baseCount) + ' triples'),
        kv('Changeset', App.num(API.entries().length) + ' entries'),
        kv('Stated total', App.num(App.KG.stats.stated) + ' triples'),
        kv('Derived', App.num(App.KG.stats.derived) + ' triples'),
        kv('Rounds to fixpoint', String(App.KG.stats.rounds)),
        kv('Reasoning time', App.KG.stats.ms + ' ms'),
        kv('Parse errors', App.KG.parseErrors.length ? App.KG.parseErrors.join('; ') : 'none')
      ])]
    }));
  }

  function sampleComorbidTurtle() {
    var edges = Comorbidity.get().edges.slice()
      .sort(function (a, b) { return b.support - a.support; }).slice(0, 6);
    return '@prefix med: <' + RDF.NS.med + '> .\n@prefix res: <' + RDF.NS.res + '> .\n\n' +
      edges.map(function (e) {
        return RDF.shorten(RDF.iriOf(e.a)) + ' med:comorbidWith ' + RDF.shorten(RDF.iriOf(e.b)) +
          ' .   # ' + e.support + ' shared patients, lift ' + e.lift.toFixed(2);
      }).join('\n');
  }

  function kv(k, v) {
    return App.el('div', {}, [App.el('dt', { text: k }), App.el('dd', { class: 'mono', text: v })]);
  }

  return { render: render, renderData: renderData, openConsoleWith: openConsoleWith };
})();
