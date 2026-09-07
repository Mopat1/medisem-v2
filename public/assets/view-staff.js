/* =============================================================================
   view-staff.js — administration, laboratory and pharmacy.

   Three role interfaces that share the same primitives. The laboratory and
   pharmacy screens both write into the graph: entering a result can create an
   med:AbnormalResult by satisfying a class restriction, and dispensing flips a
   prescription off the pharmacy worklist.
   ========================================================================== */

/* --------------------------------------------------------------- ADMIN --- */
App.VIEWS.AdminRole = (function () {
  'use strict';
  var el = App.el;

  function render(host, page, arg) {
    if (page === 'patient' && arg) return record(host, RDF.I(arg));
    var pages = { home: overview, records: records, staff: staff, population: population,
                  semantic: semantic, data: data };
    (pages[page] || overview)(host);
  }
  function semantic(host) { Semantic.render(host); }
  function population(host) {
    Population.render(host, { title: 'Population health',
      subtitle: 'The comorbidity network measured across the whole patient register.' });
  }

  function overview(host) {
    var patients = Q.allPatients();
    var beds = Q.bedState();
    var critical = Q.criticalPatients();
    var deptLoad = Q.departmentLoad();
    var abnormal = Q.abnormalResults();
    var poly = Q.polypharmacy();

    var occupied = beds.rows.filter(function (b) { return b.patientName; });

    host.appendChild(App.pageHead('MediSem Multispecialty Hospital',
      'Operational overview for ' + App.fmtDate('2026-08-31') + '.'));

    host.appendChild(el('div', { class: 'grid-4' }, [
      App.statTile({ label: 'Registered patients', value: App.num(patients.rows.length),
        detail: 'On the register', derived: true }),
      App.statTile({ label: 'Beds occupied', value: occupied.length + ' of ' + beds.rows.length,
        detail: 'Occupancy derived from bed assignment', derived: true }),
      App.statTile({ label: 'Critical patients', value: String(uniqueBy(critical.rows, 'patient').length),
        detail: 'Class membership, not a flag', derived: true,
        tone: critical.rows.length ? 'alert' : null }),
      App.statTile({ label: 'Abnormal results', value: String(abnormal.rows.length),
        detail: 'Awaiting clinical review', tone: 'warn' })
    ]));

    host.appendChild(App.semanticNote(
      'Three of the four numbers above cannot be read from any field in the data. Patient counts ' +
      'come from a subclass hierarchy, bed occupancy from an inverse property, and the critical ' +
      'list from an <span class="mono">owl:someValuesFrom</span> restriction.',
      { title: 'Critical patients', sparql: critical.sparql, note: critical.note }
    ));

    var cols = el('div', { class: 'grid-2' });

    cols.appendChild(App.panel({
      title: 'Department load', subtitle: 'Distinct patients seen', flush: true,
      provenance: { title: 'Department load', sparql: deptLoad.sparql, rows: deptLoad.rows.length, note: deptLoad.note },
      children: [App.table([
        { key: 'deptName', label: 'Department' },
        { key: 'patients', label: 'Patients', align: 'right' },
        { key: 'bar', label: '', render: function (r) {
          var top = Number(deptLoad.rows[0].patients);
          return el('span', { class: 'bar-track' }, [
            el('span', { class: 'bar-fill', style: 'width:' + (Number(r.patients) / top * 100) + '%' })
          ]);
        } }
      ], deptLoad.rows, { dense: true })]
    }));

    cols.appendChild(App.panel({
      title: 'Critical patients', subtitle: 'Derived from condition severity', flush: true,
      class: 'panel-alert',
      provenance: { title: 'Critical patients', sparql: critical.sparql, rows: critical.rows.length, note: critical.note },
      children: [App.table([
        { key: 'name', label: 'Patient' },
        { key: 'mrn', label: 'MRN', mono: true },
        { key: 'diseaseName', label: 'Condition' },
        { key: 'severity', label: 'Severity', render: function (r) { return App.tag(r.severity, 'red'); } }
      ], critical.rows.slice(0, 12), { dense: true,
        onRow: function (r) { App.go('patient', r.patient); },
        emptyText: 'Nobody currently meets the critical definition.' })]
    }));

    host.appendChild(cols);

    host.appendChild(App.panel({
      title: 'Polypharmacy watch',
      subtitle: 'Patients on the most concurrent medicines, derived through the prescription chain',
      flush: true,
      provenance: { title: 'Polypharmacy', sparql: poly.sparql, rows: poly.rows.length },
      children: [App.table([
        { key: 'name', label: 'Patient' },
        { key: 'mrn', label: 'MRN', mono: true },
        { key: 'drugs', label: 'Distinct medicines', align: 'right' },
        { key: 'flags', label: 'Safety flags', render: function (r) {
          var a = Q.safetyAlerts(RDF.I(r.patient)).alerts;
          if (!a.length) return el('span', { class: 'dim', text: 'none' });
          return el('div', { class: 'chip-row' }, a.map(function (x) {
            return el('span', { class: 'chip-alert level-' + x.level, text: x.kind });
          }));
        } }
      ], poly.rows.slice(0, 10), { dense: true,
        onRow: function (r) { App.go('patient', r.patient); } })]
    }));
  }

  function records(host) {
    var patients = Q.allPatients();
    var search = el('input', { class: 'field search', type: 'search', placeholder: 'Search name or MRN' });
    var listHost = el('div');

    host.appendChild(App.pageHead('Patient records',
      App.num(patients.rows.length) + ' people on the register.'));

    function paint() {
      var term = search.value.trim().toLowerCase();
      var rows = patients.rows.filter(function (r) {
        return !term || r.name.toLowerCase().indexOf(term) !== -1 ||
               (r.mrn || '').toLowerCase().indexOf(term) !== -1;
      });
      App.clear(listHost).appendChild(App.table([
        { key: 'name', label: 'Patient', render: function (r) {
          return el('span', { class: 'who' }, [
            App.avatar(r.initials || r.name),
            el('span', {}, [
              el('div', { text: r.name }),
              el('div', { class: 'cell-sub mono', text: r.mrn })
            ])
          ]);
        } },
        { key: 'age', label: 'Age', align: 'right' },
        { key: 'sex', label: 'Sex' },
        { key: 'doctorName', label: 'Primary physician' },
        { key: 'conds', label: 'Conditions', align: 'right', render: function (r) {
          return String(Q.conditions(RDF.I(r.patient)).rows.length);
        } },
        { key: 'open', label: '', align: 'right', render: function () {
          return el('span', { class: 'row-go', html: '&rarr;' });
        } }
      ], rows.slice(0, 200), { onRow: function (r) { App.go('patient', r.patient); },
        emptyText: 'Nobody matches that.' }));
    }
    search.addEventListener('input', paint);

    host.appendChild(App.panel({
      title: 'Register', flush: true, tools: [search],
      provenance: { title: 'Patient register', sparql: patients.sparql, rows: patients.rows.length, note: patients.note },
      children: [listHost]
    }));
    paint();
  }

  /** The administrative read-only view of one record. */
  function record(host, patient) {
    var s = Q.patientSummary(patient).row;
    if (!s.name) { host.appendChild(App.emptyState('No such record.')); return; }
    var conds = Q.conditions(patient);
    var encs = Q.encounters(patient);
    var inv = Q.invoices(patient);
    var types = Q.derivedTypes(patient);

    host.appendChild(el('a', { class: 'back-link', href: '#/records', html: '&larr; Back to records' }));
    host.appendChild(el('header', { class: 'chart-head' }, [
      App.avatar(s.initials || s.name, { size: 'lg' }),
      el('div', { class: 'chart-id' }, [
        el('h1', { text: s.name }),
        el('p', { class: 'chart-meta mono', text:
          [s.mrn, s.age ? s.age + ' years' : null, s.sex, s.blood].filter(Boolean).join('   \u00B7   ') }),
        el('p', { class: 'chart-meta', text: [s.phone, s.email].filter(Boolean).join(' \u00B7 ') })
      ])
    ]));

    host.appendChild(el('div', { class: 'grid-2' }, [
      App.panel({
        title: 'Conditions', flush: true,
        provenance: { title: 'Conditions', sparql: conds.sparql, rows: conds.rows.length },
        children: [App.table([
          { key: 'diseaseName', label: 'Condition' },
          { key: 'icd', label: 'ICD-10', mono: true },
          { key: 'onset', label: 'Onset', render: function (r) { return App.fmtDate(r.onset); } },
          { key: 'status', label: 'Status' }
        ], conds.rows, { dense: true })]
      }),
      App.panel({
        title: 'Derived classification',
        subtitle: 'Classes the reasoner assigns to this record',
        class: 'panel-semantic',
        provenance: { title: 'Derived types', sparql: types.sparql, note: types.note },
        children: [el('div', { class: 'chip-row' }, types.rows.map(function (t) {
          return el('span', { class: 'chip-class' }, [
            el('span', { class: 'mono', text: 'med:' + RDF.local(RDF.I(t.type)) }),
            t.derived ? App.derivedBadge() : null
          ]);
        }))]
      })
    ]));

    host.appendChild(App.panel({
      title: 'Encounters', flush: true,
      children: [App.table([
        { key: 'date', label: 'Date', render: function (r) { return App.fmtDate(r.date); } },
        { key: 'type', label: 'Type', render: function (r) { return App.titleCase(RDF.local(RDF.I(r.type))); } },
        { key: 'deptName', label: 'Department' },
        { key: 'doctorName', label: 'Clinician' },
        { key: 'outcome', label: 'Outcome' }
      ], encs.rows, { dense: true })]
    }));

    host.appendChild(App.panel({
      title: 'Invoices', flush: true,
      children: [App.table([
        { key: 'date', label: 'Date', render: function (r) { return App.fmtDate(r.date); } },
        { key: 'amount', label: 'Amount', align: 'right', render: function (r) { return App.money(r.amount); } },
        { key: 'insurer', label: 'Insurer' },
        { key: 'status', label: 'Status' }
      ], inv.rows, { dense: true })]
    }));
  }

  function staff(host) {
    var staffRows = Q.run(`
SELECT ?staff ?name ?initials ?qualification ?experience ?deptName ?role
WHERE {
  ?staff a med:Staff ; med:name ?name .
  OPTIONAL { ?staff med:photoInitials ?initials }
  OPTIONAL { ?staff med:qualification ?qualification }
  OPTIONAL { ?staff med:yearsOfExperience ?experience }
  OPTIONAL { ?staff med:worksIn ?dept . ?dept med:name ?deptName }
  OPTIONAL { ?staff a ?role . FILTER(?role != med:Staff && ?role != med:Person && ?role != med:Clinician) }
}
ORDER BY ?name`);

    var folded = new Map();
    staffRows.rows.forEach(function (r) {
      if (!folded.has(r.staff)) folded.set(r.staff, Object.assign({}, r, { roles: [] }));
      if (r.role) {
        var name = RDF.local(RDF.I(r.role));
        if (folded.get(r.staff).roles.indexOf(name) === -1) folded.get(r.staff).roles.push(name);
      }
    });

    var beds = Q.bedState();

    host.appendChild(App.pageHead('Staff and wards', 'Who works here and where every bed stands.'));

    host.appendChild(App.panel({
      title: 'Clinical and support staff', flush: true,
      provenance: { title: 'Staff', sparql: staffRows.sparql, rows: folded.size },
      children: [App.table([
        { key: 'name', label: 'Name', render: function (r) {
          return el('span', { class: 'who' }, [
            App.avatar(r.initials || r.name),
            el('span', {}, [
              el('div', { text: r.name }),
              el('div', { class: 'cell-sub', text: r.qualification || '' })
            ])
          ]);
        } },
        { key: 'deptName', label: 'Department' },
        { key: 'experience', label: 'Years', align: 'right' },
        { key: 'roles', label: 'Classes', render: function (r) {
          return el('div', { class: 'chip-row' }, r.roles.slice(0, 3).map(function (x) {
            return el('span', { class: 'chip-class mono', text: 'med:' + x });
          }));
        } }
      ], Array.from(folded.values()), { dense: true })]
    }));

    host.appendChild(App.panel({
      title: 'Bed state', subtitle: 'Occupancy is derived, not stored on the bed', flush: true,
      provenance: { title: 'Beds', sparql: beds.sparql, rows: beds.rows.length, note: beds.note },
      children: [App.table([
        { key: 'bedNumber', label: 'Bed', mono: true },
        { key: 'wardName', label: 'Ward' },
        { key: 'patientName', label: 'Occupant', render: function (r) {
          return r.patientName || el('span', { class: 'dim', text: 'available' });
        } },
        { key: 'mrn', label: 'MRN', mono: true },
        { key: 'state', label: 'State', render: function (r) {
          return r.patientName ? App.tag('Occupied', 'amber') : App.tag('Free', 'green');
        } }
      ], beds.rows, { dense: true })]
    }));
  }

  function data(host) { Semantic.renderData(host); }

  function uniqueBy(rows, key) {
    var seen = new Set();
    return rows.filter(function (r) {
      if (seen.has(r[key])) return false;
      seen.add(r[key]); return true;
    });
  }

  return { render: render };
})();

/* ----------------------------------------------------------- LABORATORY --- */
App.VIEWS.LabRole = (function () {
  'use strict';
  var el = App.el;

  function render(host, page) {
    var pages = { home: worklist, abnormal: abnormal, semantic: function (h) { Semantic.render(h); } };
    (pages[page] || worklist)(host);
  }

  function worklist(host) {
    var pending = Q.pendingLabs();
    host.appendChild(App.pageHead('Laboratory worklist',
      pending.rows.length + ' orders awaiting a result.'));

    host.appendChild(App.semanticNote(
      'Entering a value below does more than fill a field. If it falls outside the reference range ' +
      'the result satisfies a restriction and the reasoner classifies it as ' +
      '<span class="mono">med:AbnormalResult</span> on the spot, which is what puts it in front of ' +
      'the clinician.',
      { title: 'Pending orders', sparql: pending.sparql }
    ));

    if (!pending.rows.length) {
      host.appendChild(App.emptyState('The worklist is clear.', 'Every order has a result against it.'));
      return;
    }

    host.appendChild(App.panel({
      title: 'Pending orders', flush: true,
      provenance: { title: 'Worklist', sparql: pending.sparql, rows: pending.rows.length },
      children: [App.table([
        { key: 'analyte', label: 'Test' },
        { key: 'patientName', label: 'Patient', render: function (r) {
          return el('div', {}, [
            el('div', { text: r.patientName }),
            el('div', { class: 'cell-sub mono', text: r.mrn })
          ]);
        } },
        { key: 'doctorName', label: 'Ordered by' },
        { key: 'date', label: 'Ordered', render: function (r) {
          return el('div', {}, [
            el('div', { text: App.fmtDate(r.date) }),
            el('div', { class: 'cell-sub', text: App.relative(r.date) })
          ]);
        } },
        { key: 'enter', label: 'Result', render: function (r) {
          return resultEntry(r);
        } }
      ], pending.rows, {})]
    }));
  }

  /** Inline result entry. Writes the result triples and re-reasons. */
  function resultEntry(order) {
    var ref = REFERENCE_RANGES[order.analyte] || { low: 0, high: 100, unit: '' };
    var value = el('input', { class: 'field mini', type: 'number', step: 'any', placeholder: 'value' });
    var wrap = el('span', { class: 'inline-entry' });

    var save = el('button', { class: 'btn btn-sm', text: 'Save', onclick: function () {
      if (value.value === '') { App.toast('Enter a value first.', 'warn'); return; }
      var I = RDF.I, L = RDF.mkLit, NSm = RDF.NS.med, NSr = RDF.NS.res;
      var med = function (p) { return I(NSm + p); };
      var today = new Date().toISOString().slice(0, 10);
      var resId = I(NSr + DB.mintId('Res'));
      var v = parseFloat(value.value);
      var out = v < ref.low || v > ref.high;

      var triples = [
        [resId, RDF.C.TYPE, med('LabResult')],
        [resId, med('analyte'), L(order.analyte)],
        [resId, med('value'), L(String(v), RDF.NS.xsd + 'decimal')],
        [resId, med('unit'), L(ref.unit)],
        [resId, med('refLow'), L(String(ref.low), RDF.NS.xsd + 'decimal')],
        [resId, med('refHigh'), L(String(ref.high), RDF.NS.xsd + 'decimal')],
        [resId, med('outOfRange'), L(out ? 'true' : 'false', RDF.NS.xsd + 'boolean')],
        [resId, med('date'), L(today, RDF.NS.xsd + 'date')],
        [resId, med('performedBy'), App.currentIdentity().subject],
        [I(order.order), med('hasResult'), resId]
      ];
      save.disabled = true; save.textContent = 'Saving';
      // The order moves off the worklist: one retraction, then the new facts.
      App.retract([[I(order.order), med('orderStatus'), L('Pending')]], 'result entered')
        .then(function () {
          triples.push([I(order.order), med('orderStatus'), L('Resulted')]);
          return App.commit(triples, 'lab result entered');
        })
        .then(function () {
          App.toast(out
            ? 'Result saved. Outside range, so the reasoner has classified it med:AbnormalResult.'
            : 'Result saved and within range.', out ? 'warn' : 'good');
          App.route();
        })
        .catch(function (err) {
          save.disabled = false; save.textContent = 'Save';
          App.toast(err.message, 'warn');
        });
    } });

    wrap.appendChild(value);
    wrap.appendChild(el('span', { class: 'ref mono', text: ref.low + '\u2013' + ref.high + ' ' + ref.unit }));
    wrap.appendChild(save);
    return wrap;
  }

  var REFERENCE_RANGES = {
    'HbA1c': { low: 4.0, high: 5.6, unit: '%' },
    'Fasting glucose': { low: 70, high: 100, unit: 'mg/dL' },
    'Creatinine': { low: 0.6, high: 1.2, unit: 'mg/dL' },
    'eGFR': { low: 90, high: 120, unit: 'mL/min' },
    'LDL cholesterol': { low: 0, high: 100, unit: 'mg/dL' },
    'Triglycerides': { low: 0, high: 150, unit: 'mg/dL' },
    'TSH': { low: 0.4, high: 4.0, unit: 'mIU/L' },
    'Haemoglobin': { low: 12.0, high: 15.5, unit: 'g/dL' },
    'Troponin I': { low: 0, high: 0.04, unit: 'ng/mL' },
    'NT-proBNP': { low: 0, high: 125, unit: 'pg/mL' },
    'Platelet count': { low: 150, high: 450, unit: 'x10^3/uL' },
    'ESR': { low: 0, high: 20, unit: 'mm/hr' },
    'Urine WBC': { low: 0, high: 5, unit: '/hpf' },
    'INR': { low: 0.9, high: 1.2, unit: 'ratio' },
    'CA 15-3': { low: 0, high: 30, unit: 'U/mL' },
    'CEA': { low: 0, high: 3, unit: 'ng/mL' }
  };

  function abnormal(host) {
    var rows = Q.abnormalResults();
    host.appendChild(App.pageHead('Abnormal results',
      rows.rows.length + ' results outside their reference range.'));

    host.appendChild(App.semanticNote(
      'Nothing in the data marks these as abnormal. <span class="mono">med:AbnormalResult</span> is ' +
      'a defined class: a result belongs to it by satisfying a restriction on ' +
      '<span class="mono">med:outOfRange</span>. Query the stated graph and this list is empty.',
      { title: 'Abnormal results', sparql: rows.sparql, note: rows.note }
    ));

    host.appendChild(App.panel({
      title: 'For review', flush: true,
      provenance: { title: 'Abnormal results', sparql: rows.sparql, rows: rows.rows.length, note: rows.note },
      children: [App.table([
        { key: 'analyte', label: 'Test' },
        { key: 'patientName', label: 'Patient', render: function (r) {
          return el('div', {}, [
            el('div', { text: r.patientName }),
            el('div', { class: 'cell-sub mono', text: r.mrn })
          ]);
        } },
        { key: 'value', label: 'Value', align: 'right', render: function (r) {
          return el('span', { class: 'result-value is-out' },
            [el('strong', { text: r.value }), el('span', { text: ' ' + (r.unit || '') })]);
        } },
        { key: 'range', label: 'Reference', align: 'right', render: function (r) {
          return r.refLow + ' \u2013 ' + r.refHigh;
        } },
        { key: 'date', label: 'Date', render: function (r) { return App.fmtDate(r.date); } }
      ], rows.rows, { dense: true })]
    }));
  }

  return { render: render };
})();

/* ------------------------------------------------------------- PHARMACY --- */
App.VIEWS.PharmacyRole = (function () {
  'use strict';
  var el = App.el;

  function render(host, page) {
    var pages = { home: dispensing, interactions: interactions, semantic: function (h) { Semantic.render(h); } };
    (pages[page] || dispensing)(host);
  }

  function dispensing(host) {
    var queue = Q.undispensed();
    host.appendChild(App.pageHead('Dispensing queue',
      queue.rows.length + ' prescriptions waiting to be handed out.'));

    host.appendChild(App.semanticNote(
      'Each row is checked against the patient\u2019s full medicine list and problem list before it ' +
      'is dispensed. Those checks are graph patterns over derived facts, so a prescription written ' +
      'by one doctor is checked against a medicine started by another.',
      { title: 'Dispensing queue', sparql: queue.sparql }
    ));

    if (!queue.rows.length) {
      host.appendChild(App.emptyState('Nothing waiting.', 'Every prescription has been dispensed.'));
      return;
    }

    host.appendChild(App.panel({
      title: 'Awaiting collection', flush: true,
      provenance: { title: 'Dispensing queue', sparql: queue.sparql, rows: queue.rows.length },
      children: [App.table([
        { key: 'drugName', label: 'Medicine', render: function (r) {
          return el('div', {}, [
            el('div', { text: r.drugName }),
            el('div', { class: 'cell-sub', text: [r.strength, r.frequency,
              r.duration ? r.duration + ' days' : null].filter(Boolean).join(' \u00B7 ') })
          ]);
        } },
        { key: 'patientName', label: 'Patient', render: function (r) {
          return el('div', {}, [
            el('div', { text: r.patientName }),
            el('div', { class: 'cell-sub mono', text: r.mrn })
          ]);
        } },
        { key: 'prescriber', label: 'Prescriber' },
        { key: 'checks', label: 'Checks', render: function (r) {
          var a = Q.safetyAlerts(RDF.I(r.patient)).alerts.filter(function (x) {
            return x.title.indexOf(r.drugName) !== -1;
          });
          if (!a.length) return App.tag('Clear', 'green');
          return el('div', { class: 'chip-row' }, a.map(function (x) {
            return el('span', { class: 'chip-alert level-' + x.level }, [
              el('strong', { text: x.kind }), el('span', { text: x.title })
            ]);
          }));
        } },
        { key: 'act', label: '', align: 'right', render: function (r) {
          return el('button', { class: 'btn btn-sm', text: 'Dispense', onclick: function (e) {
            e.stopPropagation();
            dispense(r);
          } });
        } }
      ], queue.rows, {})]
    }));
  }

  function dispense(row) {
    var I = RDF.I, L = RDF.mkLit;
    var med = function (p) { return I(RDF.NS.med + p); };
    var rx = I(row.rx);
    var falseLit = L('false', RDF.NS.xsd + 'boolean');

    var alerts = Q.safetyAlerts(RDF.I(row.patient)).alerts.filter(function (x) {
      return x.title.indexOf(row.drugName) !== -1;
    });
    if (alerts.length && !window.confirm(
      'This prescription has an open safety flag:\n\n' +
      alerts.map(function (a) { return '\u2022 ' + a.kind + ': ' + a.title; }).join('\n') +
      '\n\nDispense anyway?')) return;

    App.retract([[rx, med('dispensed'), falseLit]], 'dispensed')
      .then(function () {
        return App.commit([[rx, med('dispensed'), L('true', RDF.NS.xsd + 'boolean')]], 'dispensed');
      })
      .then(function () {
        App.toast(row.drugName + ' dispensed to ' + row.patientName, 'good');
        App.route();
      })
      .catch(function (err) { App.toast(err.message, 'warn'); });
  }

  function interactions(host) {
    var patients = Q.allPatients();
    var rows = [];
    patients.rows.forEach(function (p) {
      Q.safetyAlerts(RDF.I(p.patient)).alerts.forEach(function (a) {
        rows.push({ patient: p, alert: a });
      });
    });

    host.appendChild(App.pageHead('Interaction and contraindication checks',
      rows.length + ' open across the whole register.'));

    host.appendChild(App.semanticNote(
      'This screen runs the same three patterns for every patient in the hospital. The formulary ' +
      'holds the interaction facts once; the reasoner and these queries do the rest.',
      { title: 'Safety checks', sparql: Q.SOURCE.INTERACTIONS.replace(/\{\{patient\}\}/g, '?patient') }
    ));

    host.appendChild(App.panel({
      title: 'Open flags', flush: true,
      children: [App.table([
        { key: 'patient', label: 'Patient', render: function (r) {
          return el('div', {}, [
            el('div', { text: r.patient.name }),
            el('div', { class: 'cell-sub mono', text: r.patient.mrn })
          ]);
        } },
        { key: 'kind', label: 'Type', render: function (r) {
          return App.tag(r.alert.kind, r.alert.level === 'critical' ? 'red' : 'amber');
        } },
        { key: 'title', label: 'Detail', render: function (r) {
          return el('div', {}, [
            el('div', { text: r.alert.title }),
            el('div', { class: 'cell-sub', text: r.alert.detail })
          ]);
        } }
      ], rows, { dense: true, emptyText: 'No open flags anywhere in the hospital.' })]
    }));
  }

  return { render: render };
})();
