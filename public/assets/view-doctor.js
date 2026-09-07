/* =============================================================================
   view-doctor.js — the clinician workspace.

   Includes the write path: recording a consultation adds triples to the graph,
   persists them as a changeset entry and re-runs the reasoner, so derived facts
   such as med:suffersFrom and the safety alerts update on the same click.
   ========================================================================== */
App.VIEWS.DoctorRole = (function () {
  'use strict';
  var el = App.el;

  function render(host, page, arg) {
    var me = App.currentIdentity().subject;
    if (page === 'patient' && arg) return chart(host, RDF.I(arg));
    var pages = { home: clinic, panel: panel, alerts: alerts, population: population,
                  semantic: semantic, register: register };
    (pages[page] || clinic)(host, me);
  }

  function semantic(host) { Semantic.render(host); }
  function register(host) { Booking.renderRegistration(host); }

  /* ---------------------------------------------------------------- clinic */

  function clinic(host, me) {
    var staff = Q.staffSummary(me).row;
    var caseload = Q.doctorPanel(me);
    var upcoming = Q.doctorUpcoming(me);
    var critical = Q.criticalPatients();

    // Which of my patients have an open safety concern
    var flagged = caseload.rows.map(function (p) {
      var a = Q.safetyAlerts(RDF.I(p.patient));
      return { patient: p, alerts: a.alerts };
    }).filter(function (x) { return x.alerts.length; });

    var mineCritical = critical.rows.filter(function (c) {
      return caseload.rows.some(function (p) { return p.patient === c.patient; });
    });

    var soon = upcoming.rows.filter(function (a) { return App.daysBetween(a.date) <= 0; });

    host.appendChild(App.pageHead(
      staff.name,
      [staff.qualification, staff.deptName].filter(Boolean).join(' \u00B7 ')
    ));

    host.appendChild(el('div', { class: 'grid-4' }, [
      App.statTile({ label: 'Patients under your care', value: String(caseload.rows.length),
        detail: 'Anyone you have seen', derived: true }),
      App.statTile({ label: 'Upcoming appointments', value: String(soon.length),
        detail: soon.length ? 'Next ' + App.fmtShortDate(soon[0].date) : 'Nothing booked' }),
      App.statTile({ label: 'Safety flags', value: String(flagged.length),
        detail: flagged.length ? 'Patients needing review' : 'Nothing outstanding',
        tone: flagged.length ? 'warn' : null }),
      App.statTile({ label: 'Critical on your list', value: String(mineCritical.length),
        detail: 'Derived from condition severity', derived: true,
        tone: mineCritical.length ? 'alert' : null })
    ]));

    host.appendChild(App.semanticNote(
      'Your caseload is not a stored list. <span class="mono">med:seenBy</span> is derived by an ' +
      'owl:propertyChainAxiom that walks from a patient through each encounter to the attending ' +
      'clinician, so this panel is always in step with the record.',
      { title: 'Your caseload', sparql: caseload.sparql, note: caseload.note }
    ));

    if (flagged.length) {
      host.appendChild(App.panel({
        title: 'Patients with an open safety flag',
        subtitle: 'Interaction, contraindication and allergy checks across your list',
        class: 'panel-alert',
        provenance: { title: 'Safety checks', sparql: Q.safetyAlerts(RDF.I(flagged[0].patient.patient)).sparql,
          note: 'The same three patterns run for every patient. Nothing is hard-coded per drug.' },
        flush: true,
        children: [App.table([
          { key: 'name', label: 'Patient', render: function (r) {
            return el('span', { class: 'who' }, [
              App.avatar(r.patient.initials || r.patient.name),
              el('span', {}, [
                el('div', { text: r.patient.name }),
                el('div', { class: 'cell-sub mono', text: r.patient.mrn })
              ])
            ]);
          } },
          { key: 'issues', label: 'Flags', render: function (r) {
            return el('div', { class: 'chip-row' }, r.alerts.map(function (a) {
              return el('span', { class: 'chip-alert level-' + a.level }, [
                el('strong', { text: a.kind }), el('span', { text: a.title })
              ]);
            }));
          } }
        ], flagged, {
          onRow: function (r) { App.go('patient', r.patient.patient); },
          emptyText: 'No flags.'
        })]
      }));
    }

    host.appendChild(App.panel({
      title: 'Appointments ahead',
      flush: true,
      provenance: { title: 'Appointments', sparql: upcoming.sparql, rows: upcoming.rows.length },
      children: [App.table([
        { key: 'date', label: 'When', render: function (r) {
          return el('div', {}, [
            el('div', { text: App.fmtDate(r.date) + (r.time ? ', ' + r.time : '') }),
            el('div', { class: 'cell-sub', text: App.relative(r.date) })
          ]);
        } },
        { key: 'patientName', label: 'Patient' },
        { key: 'mrn', label: 'MRN', mono: true },
        { key: 'deptName', label: 'Department' },
        { key: 'status', label: 'Status', render: function (r) { return App.tag(r.status || 'Scheduled', 'quiet'); } }
      ], upcoming.rows.slice(0, 12), {
        onRow: function (r) { App.go('patient', r.patient); },
        emptyText: 'No appointments booked with you.'
      })]
    }));
  }

  /* ----------------------------------------------------------------- panel */

  function panel(host, me) {
    var caseload = Q.doctorPanel(me);
    host.appendChild(App.pageHead('My patients',
      caseload.rows.length + ' people you have seen at least once.'));

    var search = el('input', { class: 'field search', type: 'search', placeholder: 'Search by name or MRN' });
    var listHost = el('div');

    function paint() {
      var term = search.value.trim().toLowerCase();
      var rows = caseload.rows.filter(function (r) {
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
        { key: 'conditions', label: 'Active conditions', render: function (r) {
          var c = Q.conditions(RDF.I(r.patient)).rows.filter(function (x) { return x.status !== 'Resolved'; });
          if (!c.length) return el('span', { class: 'dim', text: 'none recorded' });
          return el('div', { class: 'chip-row' }, c.slice(0, 3).map(function (x) {
            var node = Comorbidity.get().byIri.get(x.disease);
            return el('span', { class: 'chip-cond' }, [
              el('span', { class: 'dot', style: 'background:' + (node ? node.color : '#5C6B6A') }),
              el('span', { text: Comorbidity.shortName(x.diseaseName) })
            ]);
          }).concat(c.length > 3 ? [el('span', { class: 'chip-more', text: '+' + (c.length - 3) })] : []));
        } },
        { key: 'open', label: '', align: 'right', render: function () {
          return el('span', { class: 'row-go', html: '&rarr;' });
        } }
      ], rows, { onRow: function (r) { App.go('patient', r.patient); }, emptyText: 'Nobody matches that.' }));
    }
    search.addEventListener('input', paint);

    host.appendChild(App.panel({
      title: 'Caseload', flush: true,
      tools: [search],
      provenance: { title: 'Caseload', sparql: caseload.sparql, rows: caseload.rows.length, note: caseload.note },
      children: [listHost]
    }));
    paint();
  }

  /* ----------------------------------------------------------------- chart */

  function chart(host, patient) {
    var s = Q.patientSummary(patient).row;
    if (!s.name) { host.appendChild(App.emptyState('That patient could not be found.')); return; }

    var conds = Q.conditions(patient);
    var encs = Q.encounters(patient);
    var meds = Q.medications(patient);
    var labs = Q.labResults(patient);
    var alerts = Q.safetyAlerts(patient);
    var allergies = Q.allergies(patient);
    var types = Q.derivedTypes(patient);

    host.appendChild(el('a', { class: 'back-link', href: '#/panel', html: '&larr; Back to my patients' }));

    host.appendChild(el('header', { class: 'chart-head' }, [
      App.avatar(s.initials || s.name, { size: 'lg' }),
      el('div', { class: 'chart-id' }, [
        el('h1', { text: s.name }),
        el('p', { class: 'chart-meta mono', text:
          [s.mrn, s.age ? s.age + ' years' : null, s.sex, s.blood ? 'Blood ' + s.blood : null]
            .filter(Boolean).join('   \u00B7   ') }),
        el('p', { class: 'chart-meta', text: [s.phone, s.address].filter(Boolean).join(' \u00B7 ') })
      ]),
      el('div', { class: 'chart-flags' }, [
        allergies.rows.length ? el('div', { class: 'flag flag-allergy' }, [
          el('span', { class: 'flag-label', text: 'Allergies' }),
          el('span', { text: allergies.rows.map(function (a) { return a.allergenName; }).join(', ') })
        ]) : null,
        types.rows.filter(function (t) {
          return t.derived && RDF.local(RDF.I(t.type)) === 'CriticalPatient';
        }).length ? el('div', { class: 'flag flag-critical' }, [
          el('span', { class: 'flag-label', text: 'Critical' }),
          el('span', { text: 'Derived from condition severity' })
        ]) : null
      ])
    ]));

    if (alerts.alerts.length) {
      host.appendChild(App.panel({
        title: 'Safety checks', class: 'panel-alert',
        provenance: { title: 'Safety checks', sparql: alerts.sparql, note: alerts.note, ms: alerts.ms },
        children: [el('ul', { class: 'alert-list' }, alerts.alerts.map(function (a) {
          return el('li', { class: 'alert alert-' + a.level }, [
            el('span', { class: 'alert-kind', text: a.kind }),
            el('div', {}, [el('strong', { text: a.title }), el('p', { text: a.detail })])
          ]);
        }))]
      }));
    }

    // ---- the record-a-visit form, which writes into the graph
    host.appendChild(consultationForm(patient, s));

    var cols = el('div', { class: 'grid-2' });

    cols.appendChild(App.panel({
      title: 'Problem list', subtitle: conds.rows.length + ' recorded', flush: true,
      provenance: { title: 'Conditions', sparql: conds.sparql, rows: conds.rows.length, note: conds.note },
      children: [App.table([
        { key: 'diseaseName', label: 'Condition', render: function (r) {
          var node = Comorbidity.get().byIri.get(r.disease);
          return el('span', { class: 'dot-label' }, [
            el('span', { class: 'dot', style: 'background:' + (node ? node.color : '#5C6B6A') }),
            el('span', {}, [
              el('div', { text: r.diseaseName }),
              el('div', { class: 'cell-sub mono', text: r.icd ? 'ICD-10 ' + r.icd : '' })
            ])
          ]);
        } },
        { key: 'onset', label: 'Onset', render: function (r) { return App.fmtDate(r.onset); } },
        { key: 'severity', label: 'Severity' },
        { key: 'status', label: 'Status', render: function (r) {
          return App.tag(r.status || 'Active', r.status === 'Resolved' ? 'quiet' : 'green');
        } }
      ], conds.rows, { dense: true, emptyText: 'No conditions recorded.' })]
    }));

    cols.appendChild(App.panel({
      title: 'Current medicines', subtitle: 'Derived through the prescription chain', flush: true,
      provenance: { title: 'Medicines', sparql: meds.sparql, rows: meds.rows.length },
      children: [App.table([
        { key: 'drugName', label: 'Drug', render: function (r) {
          return el('div', {}, [
            el('div', { text: r.drugName }),
            el('div', { class: 'cell-sub', text: [r.strength, r.frequency].filter(Boolean).join(' \u00B7 ') })
          ]);
        } },
        { key: 'date', label: 'Started', render: function (r) { return App.fmtDate(r.date); } },
        { key: 'status', label: 'Status', render: function (r) {
          return App.tag(r.status || '', r.status === 'Active' ? 'green' : 'quiet');
        } }
      ], meds.rows.filter(function (m) { return m.status === 'Active'; }), {
        dense: true, emptyText: 'No active medicines.'
      })]
    }));

    host.appendChild(cols);

    host.appendChild(App.panel({
      title: 'Encounter history', subtitle: encs.rows.length + ' visits', flush: true,
      provenance: { title: 'Encounters', sparql: encs.sparql, rows: encs.rows.length },
      children: [App.table([
        { key: 'date', label: 'Date', render: function (r) {
          return el('div', {}, [
            el('div', { text: App.fmtDate(r.date) }),
            el('div', { class: 'cell-sub', text: App.relative(r.date) })
          ]);
        } },
        { key: 'type', label: 'Type', render: function (r) { return App.titleCase(RDF.local(RDF.I(r.type))); } },
        { key: 'deptName', label: 'Department' },
        { key: 'doctorName', label: 'Clinician' },
        { key: 'diseaseName', label: 'Focus' },
        { key: 'outcome', label: 'Outcome' }
      ], encs.rows, { dense: true, emptyText: 'No encounters.' })]
    }));

    host.appendChild(App.panel({
      title: 'Results',
      subtitle: 'Ordering a test here puts it straight onto the laboratory worklist',
      tools: [Booking.orderTestControl(patient, function () { App.route(); })],
      flush: true,
      provenance: { title: 'Results', sparql: labs.sparql, rows: labs.rows.length },
      children: [App.table([
        { key: 'analyte', label: 'Test' },
        { key: 'date', label: 'Date', render: function (r) { return App.fmtDate(r.date); } },
        { key: 'value', label: 'Value', align: 'right', render: function (r) {
          if (r.value === undefined) return el('span', { class: 'dim', text: 'pending' });
          return el('span', { class: 'result-value' + (App.isTrue(r.out) ? ' is-out' : '') },
            [el('strong', { text: r.value }), el('span', { text: ' ' + (r.unit || '') })]);
        } },
        { key: 'range', label: 'Reference', align: 'right', render: function (r) {
          return r.refLow !== undefined ? r.refLow + ' \u2013 ' + r.refHigh : '';
        } }
      ], labs.rows.slice(0, 16), { dense: true, emptyText: 'No results.' })]
    }));

    // ---- this patient on the network
    var mine = Array.from(new Set(conds.rows.map(function (c) { return c.disease; })));
    if (mine.length) {
      var projection = Comorbidity.projectionFor(mine);
      host.appendChild(App.panel({
        title: 'Comorbidity context',
        subtitle: 'Where this patient sits in the hospital-wide disease network',
        class: 'panel-semantic',
        provenance: { title: 'Comorbidity network', sparql: Comorbidity.get().sparql, note: Comorbidity.get().note },
        children: [
          GraphView.render({ highlight: mine, focusMode: true, height: 420 }),
          projection.length ? el('div', { class: 'proj-inline' }, [
            el('h4', { text: 'Frequently co-occurring, not yet recorded for this patient' }),
            el('div', { class: 'proj-list' }, projection.slice(0, 5).map(function (p) {
              var strongest = p.from.slice().sort(function (a, b) { return b.lift - a.lift; })[0];
              return el('div', { class: 'proj' }, [
                el('span', { class: 'dot', style: 'background:' + (p.node ? p.node.color : '#5C6B6A') }),
                el('div', { class: 'proj-main' }, [
                  el('strong', { text: p.name }),
                  el('p', { text: 'Co-occurs with ' + strongest.name + ' in ' + strongest.support +
                    ' patients, lift ' + strongest.lift.toFixed(2) + '.' })
                ]),
                el('span', { class: 'proj-score mono', text: strongest.lift.toFixed(1) + '\u00D7' })
              ]);
            })),
            el('p', { class: 'muted small', text:
              'Population-level association only. This is a prompt to consider screening, not a ' +
              'diagnosis and not a prediction about this individual.' })
          ]) : null
        ]
      }));
    }
  }

  /* ------------------------------------------------- writing to the graph */

  /**
   * Recording a consultation mints new IRIs, writes the encounter, note and any
   * new problem or prescription, then asks the app to re-reason. The point of
   * the form is that adding one triple can change what the reasoner concludes
   * about the patient, and the screen shows that happening.
   */
  function consultationForm(patient, summary) {
    var me = App.currentIdentity().subject;
    var open = { value: false };

    var diseases = Q.run(`
SELECT ?disease ?name ?icd
WHERE { ?disease a med:Disease ; med:name ?name . OPTIONAL { ?disease med:icd10 ?icd } }
ORDER BY ?name`).rows;

    var drugs = Q.run(`
SELECT ?drug ?name ?strength
WHERE { ?drug a med:Medication ; med:name ?name . OPTIONAL { ?drug med:strength ?strength } }
ORDER BY ?name`).rows;

    var typeSel = select([
      ['Consultation', 'Consultation'], ['FollowUp', 'Follow up'],
      ['EmergencyVisit', 'Emergency visit'], ['Admission', 'Admission'],
      ['DayCareVisit', 'Day care'], ['Screening', 'Screening']
    ]);
    var reason = el('input', { class: 'field', placeholder: 'Reason for the visit' });
    var noteBox = el('textarea', { class: 'field', rows: '3', placeholder: 'Clinical note' });
    var sys = el('input', { class: 'field', type: 'number', placeholder: 'Systolic' });
    var dia = el('input', { class: 'field', type: 'number', placeholder: 'Diastolic' });
    var hr = el('input', { class: 'field', type: 'number', placeholder: 'Pulse' });
    var spo2 = el('input', { class: 'field', type: 'number', placeholder: 'SpO2' });

    var condSel = select([['', 'No new diagnosis']].concat(diseases.map(function (d) {
      return [d.disease, d.name + (d.icd ? '  (' + d.icd + ')' : '')];
    })));
    var sevSel = select([['Mild', 'Mild'], ['Moderate', 'Moderate'], ['Severe', 'Severe']]);

    var drugSel = select([['', 'No prescription']].concat(drugs.map(function (d) {
      return [d.drug, d.name + (d.strength ? '  ' + d.strength : '')];
    })));
    var freqSel = select([
      ['Once daily', 'Once daily'], ['Twice daily', 'Twice daily'],
      ['Three times daily', 'Three times daily'], ['Once daily at night', 'At night'],
      ['As required', 'As required']
    ]);
    var days = el('input', { class: 'field', type: 'number', value: '30', placeholder: 'Days' });

    var status = el('p', { class: 'form-status' });

    function save() {
      var I = RDF.I, L = RDF.mkLit, NSm = RDF.NS.med, NSr = RDF.NS.res;
      var med = function (p) { return I(NSm + p); };
      var today = new Date().toISOString().slice(0, 10);

      var encId = I(NSr + DB.mintId('Enc'));
      var noteId = I(NSr + DB.mintId('Note'));
      var vitId = I(NSr + DB.mintId('Vit'));
      var triples = [];

      triples.push([encId, RDF.C.TYPE, med(typeSel.value)]);
      triples.push([encId, med('encounterOf'), patient]);
      triples.push([patient, med('hasEncounter'), encId]);
      triples.push([encId, med('date'), L(today, RDF.NS.xsd + 'date')]);
      triples.push([encId, med('attendedBy'), me]);
      triples.push([encId, med('reason'), L(reason.value || 'Consultation')]);
      triples.push([encId, med('outcome'), L('Recorded in portal')]);

      var dept = App.KG.mat.one(me, med('worksIn'));
      if (dept) triples.push([encId, med('inDepartment'), dept]);

      triples.push([noteId, RDF.C.TYPE, med('ClinicalNote')]);
      triples.push([noteId, med('noteText'), L(noteBox.value || 'No note recorded.')]);
      triples.push([noteId, med('authorName'), L(App.currentIdentity().name)]);
      triples.push([noteId, med('date'), L(today, RDF.NS.xsd + 'date')]);
      triples.push([encId, med('hasNote'), noteId]);

      if (sys.value || hr.value || spo2.value) {
        triples.push([vitId, RDF.C.TYPE, med('VitalSigns')]);
        if (sys.value) triples.push([vitId, med('systolic'), L(sys.value, RDF.NS.xsd + 'integer')]);
        if (dia.value) triples.push([vitId, med('diastolic'), L(dia.value, RDF.NS.xsd + 'integer')]);
        if (hr.value) triples.push([vitId, med('heartRate'), L(hr.value, RDF.NS.xsd + 'integer')]);
        if (spo2.value) triples.push([vitId, med('spo2'), L(spo2.value, RDF.NS.xsd + 'integer')]);
        triples.push([encId, med('hasVitals'), vitId]);
      }

      var newCondition = null;
      if (condSel.value) {
        var condId = I(NSr + DB.mintId('Cond'));
        newCondition = condSel.value;
        triples.push([condId, RDF.C.TYPE, med('Condition')]);
        if (sevSel.value === 'Severe') triples.push([condId, RDF.C.TYPE, med('CriticalCondition')]);
        triples.push([condId, med('ofDisease'), I(condSel.value)]);
        triples.push([condId, med('onsetDate'), L(today, RDF.NS.xsd + 'date')]);
        triples.push([condId, med('severity'), L(sevSel.value)]);
        triples.push([condId, med('clinicalStatus'), L('Active')]);
        triples.push([condId, med('diagnosedBy'), me]);
        triples.push([patient, med('hasCondition'), condId]);
        triples.push([encId, med('recordedCondition'), condId]);
      }

      if (drugSel.value) {
        var rxId = I(NSr + DB.mintId('Rx'));
        triples.push([rxId, RDF.C.TYPE, med('Prescription')]);
        triples.push([rxId, med('prescribes'), I(drugSel.value)]);
        triples.push([rxId, med('prescribedBy'), me]);
        triples.push([rxId, med('forPatient'), patient]);
        triples.push([rxId, med('date'), L(today, RDF.NS.xsd + 'date')]);
        triples.push([rxId, med('dosage'), L('1 dose')]);
        triples.push([rxId, med('frequency'), L(freqSel.value)]);
        triples.push([rxId, med('durationDays'), L(days.value || '30', RDF.NS.xsd + 'integer')]);
        triples.push([rxId, med('dispensed'), L('false', RDF.NS.xsd + 'boolean')]);
        triples.push([rxId, med('status'), L('Active')]);
        triples.push([patient, med('hasPrescription'), rxId]);
        triples.push([encId, med('issuedPrescription'), rxId]);
      }

      var before = {
        derived: App.KG.stats.derived,
        alerts: Q.safetyAlerts(patient).alerts.length,
        types: Q.derivedTypes(patient).rows.length
      };

      status.textContent = 'Saving\u2026';
      App.commit(triples, 'consultation recorded').then(function () {
        var after = {
          derived: App.KG.stats.derived,
          alerts: Q.safetyAlerts(patient).alerts.length,
          types: Q.derivedTypes(patient).rows.length
        };
        var messages = [triples.length + ' triples written'];
        if (after.derived !== before.derived) {
          messages.push((after.derived - before.derived) + ' new facts derived');
        }
        if (after.alerts > before.alerts) {
          messages.push((after.alerts - before.alerts) + ' new safety alert');
        }
        if (after.types > before.types) {
          messages.push('patient gained a derived classification');
        }
        App.toast(messages.join(' \u00B7 '), after.alerts > before.alerts ? 'warn' : 'good');
        App.route();
      }).catch(function (err) {
        status.textContent = '';
        App.toast(err.message, 'warn');
      });
    }

    var form = el('div', { class: 'form-grid' }, [
      field('Visit type', typeSel),
      field('Reason', reason),
      field('Clinical note', noteBox, 'wide'),
      field('BP systolic', sys), field('BP diastolic', dia),
      field('Pulse', hr), field('SpO2', spo2),
      field('Add to problem list', condSel, 'wide'),
      field('Severity', sevSel),
      field('Prescribe', drugSel, 'wide'),
      field('Frequency', freqSel),
      field('Duration (days)', days)
    ]);

    var body = el('div', { class: 'collapse-body' }, [
      el('p', { class: 'muted mb', text:
        'Anything recorded here is written into the knowledge graph as triples and the reasoner ' +
        'runs again immediately. If the new facts trigger a rule, you will see the consequence ' +
        'before you leave the page.' }),
      form,
      el('div', { class: 'form-actions' }, [
        el('button', { class: 'btn btn-primary', text: 'Record consultation', onclick: save }),
        status
      ])
    ]);
    body.style.display = 'none';

    var toggle = el('button', { class: 'btn', text: 'Record a consultation', onclick: function () {
      open.value = !open.value;
      body.style.display = open.value ? '' : 'none';
      toggle.textContent = open.value ? 'Cancel' : 'Record a consultation';
    } });

    return App.panel({
      title: 'New entry',
      subtitle: 'Write to ' + summary.name + '\u2019s record',
      tools: [toggle],
      children: [body]
    });
  }

  function field(label, control, span) {
    return el('label', { class: 'form-field' + (span ? ' is-' + span : '') }, [
      el('span', { class: 'field-label', text: label }), control
    ]);
  }
  function select(pairs) {
    return el('select', { class: 'field' }, pairs.map(function (p) {
      return el('option', { value: p[0], text: p[1] });
    }));
  }

  /* ---------------------------------------------------------------- alerts */

  function alerts(host, me) {
    var caseload = Q.doctorPanel(me);
    var rows = [];
    caseload.rows.forEach(function (p) {
      Q.safetyAlerts(RDF.I(p.patient)).alerts.forEach(function (a) {
        rows.push({ patient: p, alert: a });
      });
    });

    host.appendChild(App.pageHead('Safety alerts',
      rows.length + ' open across your caseload of ' + caseload.rows.length + ' patients.'));

    host.appendChild(App.semanticNote(
      'These are three graph patterns, not three hundred conditional statements. Add one ' +
      '<span class="mono">med:interactsWith</span> triple to the formulary and every affected ' +
      'patient in the hospital appears here on the next reasoning pass.',
      { title: 'Safety checks', sparql: Q.safetyAlerts(RDF.I(caseload.rows.length ? caseload.rows[0].patient : '')).sparql }
    ));

    var groups = { critical: [], high: [] };
    rows.forEach(function (r) { (groups[r.alert.level] = groups[r.alert.level] || []).push(r); });

    ['critical', 'high'].forEach(function (level) {
      if (!groups[level] || !groups[level].length) return;
      host.appendChild(App.panel({
        title: level === 'critical' ? 'Allergy clashes' : 'Interactions and contraindications',
        subtitle: groups[level].length + ' open',
        class: 'panel-alert', flush: true,
        children: [App.table([
          { key: 'patient', label: 'Patient', render: function (r) {
            return el('span', { class: 'who' }, [
              App.avatar(r.patient.initials || r.patient.name),
              el('span', {}, [
                el('div', { text: r.patient.name }),
                el('div', { class: 'cell-sub mono', text: r.patient.mrn })
              ])
            ]);
          } },
          { key: 'kind', label: 'Type', render: function (r) { return App.tag(r.alert.kind, 'red'); } },
          { key: 'title', label: 'Detail', render: function (r) {
            return el('div', {}, [
              el('div', { text: r.alert.title }),
              el('div', { class: 'cell-sub', text: r.alert.detail })
            ]);
          } }
        ], groups[level], { onRow: function (r) { App.go('patient', r.patient.patient); } })]
      }));
    });

    if (!rows.length) {
      host.appendChild(App.emptyState('No safety alerts across your caseload.',
        'Checks run continuously against the reasoned graph.'));
    }
  }

  /* ------------------------------------------------------------ population */

  function population(host) {
    Population.render(host, { title: 'Population health',
      subtitle: 'The comorbidity network measured across every patient at this hospital.' });
  }

  return { render: render };
})();
