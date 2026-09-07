/* =============================================================================
   view-patient.js — the patient portal.

   Five of the seven screens here are ordinary patient-portal fare. Two are not:
   the visit history assembles a longitudinal record out of encounter, condition
   and prescription triples, and the condition network places the patient inside
   the hospital-wide comorbidity graph.
   ========================================================================== */
App.VIEWS.PatientRole = (function () {
  'use strict';
  var el = App.el;

  function render(host, page, arg) {
    var me = App.currentIdentity().subject;
    var pages = {
      home: home, history: history, conditions: conditions,
      medications: medications, results: results, network: network, billing: billing,
      book: function (h, patient) { Booking.renderBooking(h, patient); }
    };
    (pages[page] || home)(host, me, arg);
  }

  /* ------------------------------------------------------------------ home */

  function home(host, me) {
    var summary = Q.patientSummary(me);
    var s = summary.row;
    var conds = Q.conditions(me);
    var meds = Q.medications(me);
    var appts = Q.appointments(me);
    var labs = Q.labResults(me);
    var alerts = Q.safetyAlerts(me);
    var types = Q.derivedTypes(me);

    var active = conds.rows.filter(function (c) { return c.status !== 'Resolved'; });
    var activeMeds = meds.rows.filter(function (m) { return m.status === 'Active'; });
    var upcoming = appts.rows.filter(function (a) { return App.daysBetween(a.date) < 0; });
    var pendingLabs = labs.rows.filter(function (l) { return l.status === 'Pending'; });

    host.appendChild(App.pageHead(
      'Good day, ' + s.name.split(' ')[0] + '.',
      'Your record at MediSem, brought together from ' + App.num(App.KG.stats.total) + ' facts about this hospital.',
      [el('button', { class: 'btn btn-primary', text: 'Book an appointment',
        onclick: function () { App.go('book'); } })]
    ));

    // A patient's derived classes are a neat, honest way to open the portal.
    var derivedTypes = types.rows.filter(function (t) {
      return t.derived && ['CriticalPatient', 'ChronicPatient', 'AllergicPatient',
        'PolypharmacyPatient', 'Patient'].indexOf(RDF.local(RDF.I(t.type))) !== -1;
    });

    host.appendChild(el('div', { class: 'grid-4' }, [
      App.statTile({ label: 'Active conditions', value: String(active.length),
        detail: active.length ? active[0].diseaseName : 'None recorded' }),
      App.statTile({ label: 'Current medicines', value: String(activeMeds.length),
        detail: activeMeds.length ? 'Repeat prescriptions' : 'None active' }),
      App.statTile({ label: 'Next appointment',
        value: upcoming.length ? App.fmtShortDate(upcoming[0].date) : '\u2014',
        detail: upcoming.length ? (upcoming[0].doctorName || '') : 'Nothing booked',
        tone: upcoming.length ? null : 'warn' }),
      App.statTile({ label: 'Results waiting', value: String(pendingLabs.length),
        detail: pendingLabs.length ? 'Being processed' : 'All results are back' })
    ]));

    if (alerts.alerts.length) {
      host.appendChild(App.panel({
        title: 'Things your care team is watching',
        subtitle: 'Raised automatically from your medicines and conditions.',
        class: 'panel-alert',
        provenance: { title: 'Safety checks', sparql: alerts.sparql, note: alerts.note, ms: alerts.ms },
        children: [el('ul', { class: 'alert-list' }, alerts.alerts.map(function (a) {
          return el('li', { class: 'alert alert-' + a.level }, [
            el('span', { class: 'alert-kind', text: a.kind }),
            el('div', {}, [
              el('strong', { text: a.title }),
              el('p', { text: 'Ask your doctor or pharmacist about this at your next visit.' })
            ])
          ]);
        }))]
      }));
    }

    var twoCol = el('div', { class: 'grid-2' });

    twoCol.appendChild(App.panel({
      title: 'Your conditions',
      subtitle: active.length + ' active, ' + (conds.rows.length - active.length) + ' resolved',
      provenance: { title: 'Conditions', sparql: conds.sparql, rows: conds.rows.length, ms: conds.ms, note: conds.note },
      flush: true,
      children: [App.table([
        { key: 'diseaseName', label: 'Condition', render: function (r) {
          return el('div', {}, [
            el('div', { text: r.diseaseName }),
            el('div', { class: 'cell-sub', text: (r.categories || []).map(App.titleCase).join(', ') })
          ]);
        } },
        { key: 'onset', label: 'Since', render: function (r) { return App.fmtDate(r.onset); } },
        { key: 'status', label: 'Status', render: function (r) {
          return App.tag(r.status || 'Active', r.status === 'Resolved' ? 'quiet' : 'green');
        } }
      ], conds.rows.slice(0, 8), { dense: true, emptyText: 'No conditions on file.' })]
    }));

    twoCol.appendChild(App.panel({
      title: 'Upcoming and recent',
      subtitle: 'Appointments booked for you',
      provenance: { title: 'Appointments', sparql: appts.sparql, rows: appts.rows.length, ms: appts.ms },
      flush: true,
      children: [App.table([
        { key: 'date', label: 'Date', render: function (r) {
          return el('div', {}, [
            el('div', { text: App.fmtDate(r.date) }),
            el('div', { class: 'cell-sub', text: App.relative(r.date) })
          ]);
        } },
        { key: 'doctorName', label: 'With' },
        { key: 'deptName', label: 'Department' },
        { key: 'status', label: 'Status', render: function (r) {
          return App.tag(r.status || 'Scheduled', App.daysBetween(r.date) < 0 ? 'blue' : 'quiet');
        } }
      ], appts.rows.slice(0, 6), { dense: true, emptyText: 'No appointments booked.' })]
    }));

    host.appendChild(twoCol);

    if (derivedTypes.length && App.state.semantic) {
      host.appendChild(App.panel({
        title: 'How the system classifies you',
        subtitle: 'None of these labels is stored on your record',
        class: 'panel-semantic',
        provenance: { title: 'Derived classification', sparql: types.sparql, note: types.note, rows: types.rows.length },
        children: [
          el('p', { class: 'muted mb', text:
            'Your record says you are an out-patient or in-patient and lists your conditions. ' +
            'Everything below was worked out from those facts using the rules in the ontology.' }),
          el('div', { class: 'chip-row' }, derivedTypes.map(function (t) {
            var name = RDF.local(RDF.I(t.type));
            return el('span', { class: 'chip-class' }, [
              el('span', { class: 'mono', text: 'med:' + name }),
              t.derived ? App.derivedBadge() : null
            ]);
          }))
        ]
      }));
    }
  }

  /* --------------------------------------------------------------- history */

  /**
   * The longitudinal record. Encounters are the spine; conditions and
   * prescriptions from the same date are folded into each entry so a visit
   * reads as one event rather than three tables.
   */
  function history(host, me) {
    var encs = Q.encounters(me);
    var meds = Q.medications(me);
    var labs = Q.labResults(me);
    var conds = Q.conditions(me);

    host.appendChild(App.pageHead('Your visit history',
      encs.rows.length + ' recorded visits, earliest ' +
      App.fmtDate(encs.rows.length ? encs.rows[encs.rows.length - 1].date : null)));

    host.appendChild(App.semanticNote(
      'Each entry below is assembled from several kinds of triple at once: the encounter, the ' +
      'condition it recorded, the prescriptions issued on the day and any tests ordered. ' +
      'They are joined on the visit, not stored together.',
      { title: 'The visit timeline', sparql: encs.sparql, note:
        'The encounter type shown on each card comes from rdf:type, and its position in the ' +
        'taxonomy of encounter kinds is what lets the interface group consultations, follow ups ' +
        'and emergency visits differently.' }
    ));

    // Bucket prescriptions and labs by date so they can join their visit.
    var medsByDate = {}, labsByDate = {};
    meds.rows.forEach(function (m) { (medsByDate[m.date] = medsByDate[m.date] || []).push(m); });
    labs.rows.forEach(function (l) { (labsByDate[l.date] = labsByDate[l.date] || []).push(l); });

    var byYear = {};
    encs.rows.forEach(function (e) {
      var year = (e.date || '').slice(0, 4);
      (byYear[year] = byYear[year] || []).push(e);
    });
    var years = Object.keys(byYear).sort().reverse();

    if (!years.length) {
      host.appendChild(App.emptyState('No visits recorded yet.'));
      return;
    }

    var timeline = el('div', { class: 'timeline' });

    years.forEach(function (year) {
      timeline.appendChild(el('div', { class: 'tl-year' }, [
        el('span', { class: 'tl-year-num', text: year }),
        el('span', { class: 'tl-year-count', text: byYear[year].length + (byYear[year].length === 1 ? ' visit' : ' visits') })
      ]));

      byYear[year].forEach(function (e) {
        var kind = RDF.local(RDF.I(e.type));
        var rx = medsByDate[e.date] || [];
        var tests = labsByDate[e.date] || [];
        var v = Q.vitals(RDF.I(e.encounter)).row;

        var card = el('article', { class: 'tl-entry kind-' + kind });

        card.appendChild(el('div', { class: 'tl-marker' }, [
          el('span', { class: 'tl-dot' }),
          el('span', { class: 'tl-date' }, [
            el('strong', { text: App.fmtShortDate(e.date) }),
            el('span', { text: App.relative(e.date) })
          ])
        ]));

        var body = el('div', { class: 'tl-body' });

        body.appendChild(el('div', { class: 'tl-head' }, [
          el('div', {}, [
            el('h3', { text: App.titleCase(kind) }),
            el('p', { class: 'tl-meta', text:
              [e.deptName, e.doctorName].filter(Boolean).join(' \u00B7 ') })
          ]),
          e.stay ? App.tag(e.stay + ' nights', 'amber') : null
        ]));

        if (e.diseaseName) {
          body.appendChild(el('p', { class: 'tl-reason' }, [
            el('span', { class: 'tl-label', text: 'Seen about' }),
            el('span', { text: e.diseaseName })
          ]));
        }
        if (e.noteText) {
          body.appendChild(el('p', { class: 'tl-note', text: e.noteText }));
        }

        if (v.systolic || v.heartRate) {
          body.appendChild(el('div', { class: 'vitals' }, [
            vital('BP', v.systolic && v.diastolic ? v.systolic + '/' + v.diastolic : null, 'mmHg',
              v.systolic >= 140 || v.diastolic >= 90),
            vital('Pulse', v.heartRate, 'bpm', v.heartRate > 100),
            vital('SpO2', v.spo2, '%', v.spo2 < 94),
            vital('Temp', v.temperature, '\u00B0F', v.temperature > 99.5),
            vital('BMI', v.bmi, '', v.bmi >= 30)
          ]));
        }

        if (rx.length) {
          body.appendChild(el('div', { class: 'tl-sub' }, [
            el('span', { class: 'tl-label', text: 'Prescribed' }),
            el('div', { class: 'chip-row' }, rx.map(function (m) {
              return el('span', { class: 'chip-med' }, [
                el('strong', { text: m.drugName }),
                el('span', { text: [m.strength, m.frequency].filter(Boolean).join(', ') })
              ]);
            }))
          ]));
        }
        if (tests.length) {
          body.appendChild(el('div', { class: 'tl-sub' }, [
            el('span', { class: 'tl-label', text: 'Tests' }),
            el('div', { class: 'chip-row' }, tests.map(function (t) {
              var abnormal = App.isTrue(t.out);
              return el('span', { class: 'chip-test' + (abnormal ? ' is-out' : '') }, [
                el('strong', { text: t.analyte }),
                el('span', { text: t.value !== undefined ? t.value + ' ' + (t.unit || '') : 'pending' })
              ]);
            }))
          ]));
        }

        if (e.outcome) {
          body.appendChild(el('p', { class: 'tl-outcome', text: e.outcome }));
        }

        card.appendChild(body);
        timeline.appendChild(card);
      });
    });

    host.appendChild(timeline);

    host.appendChild(App.panel({
      title: 'Conditions first recorded over this period',
      provenance: { title: 'Condition history', sparql: conds.sparql, rows: conds.rows.length, note: conds.note },
      flush: true,
      children: [App.table([
        { key: 'diseaseName', label: 'Condition' },
        { key: 'icd', label: 'ICD-10', mono: true },
        { key: 'onset', label: 'First recorded', render: function (r) { return App.fmtDate(r.onset); } },
        { key: 'severity', label: 'Severity' },
        { key: 'status', label: 'Status', render: function (r) {
          return App.tag(r.status || 'Active', r.status === 'Resolved' ? 'quiet' : 'green');
        } },
        { key: 'resolved', label: 'Resolved', render: function (r) { return r.resolved ? App.fmtDate(r.resolved) : ''; } }
      ], conds.rows, { emptyText: 'No conditions recorded.' })]
    }));
  }

  function vital(label, value, unit, flag) {
    if (value === undefined || value === null || value === '') return null;
    return el('div', { class: 'vital' + (flag ? ' is-flagged' : '') }, [
      el('span', { class: 'vital-label', text: label }),
      el('span', { class: 'vital-value', text: value + (unit ? ' ' + unit : '') })
    ]);
  }

  /* ------------------------------------------------------------ conditions */

  function conditions(host, me) {
    var conds = Q.conditions(me);
    var allergies = Q.allergies(me);

    host.appendChild(App.pageHead('Your conditions',
      'What is on your record, when it was first noted, and where each one sits in the disease taxonomy.'));

    host.appendChild(App.semanticNote(
      'The category shown against each condition is not typed into your record. Only the specific ' +
      'disease is stored; its family comes from <span class="mono">rdfs:subClassOf</span> in the ontology.',
      { title: 'Conditions', sparql: conds.sparql, note: conds.note }
    ));

    var active = conds.rows.filter(function (c) { return c.status !== 'Resolved'; });
    var resolved = conds.rows.filter(function (c) { return c.status === 'Resolved'; });

    [['Active', active], ['Resolved', resolved]].forEach(function (pair) {
      if (!pair[1].length) return;
      host.appendChild(App.panel({
        title: pair[0] + ' conditions',
        subtitle: pair[1].length + ' recorded',
        flush: true,
        children: [el('div', { class: 'cond-grid' }, pair[1].map(function (c) {
          var node = Comorbidity.get().byIri.get(c.disease);
          return el('article', { class: 'cond-card' + (pair[0] === 'Resolved' ? ' is-quiet' : '') }, [
            el('span', { class: 'cond-swatch', style: 'background:' + (node ? node.color : '#5C6B6A') }),
            el('div', { class: 'cond-main' }, [
              el('h3', { text: c.diseaseName }),
              el('p', { class: 'cond-cat', text: (node ? node.categoryLabel : 'Condition') +
                (c.icd ? ' \u00B7 ICD-10 ' + c.icd : '') }),
              el('dl', { class: 'cond-facts' }, [
                el('div', {}, [el('dt', { text: 'First recorded' }), el('dd', { text: App.fmtDate(c.onset) })]),
                el('div', {}, [el('dt', { text: 'Severity' }), el('dd', { text: c.severity || '\u2014' })]),
                c.resolved ? el('div', {}, [el('dt', { text: 'Resolved' }), el('dd', { text: App.fmtDate(c.resolved) })]) : null
              ])
            ])
          ]);
        }))]
      }));
    });

    if (allergies.rows.length) {
      host.appendChild(App.panel({
        title: 'Allergies',
        subtitle: 'Checked against every medicine you are prescribed',
        provenance: { title: 'Allergies', sparql: allergies.sparql, rows: allergies.rows.length },
        children: [el('div', { class: 'chip-row' }, allergies.rows.map(function (a) {
          return el('span', { class: 'chip-allergy', text: a.allergenName });
        }))]
      }));
    }
  }

  /* ----------------------------------------------------------- medications */

  function medications(host, me) {
    var meds = Q.medications(me);
    var alerts = Q.safetyAlerts(me);

    host.appendChild(App.pageHead('Your medicines',
      'Everything prescribed to you, newest first.'));

    host.appendChild(App.semanticNote(
      'This list comes from <span class="mono">med:takesMedication</span>, which nobody enters. ' +
      'It is produced by a property chain that walks from you to each prescription and on to the drug.',
      { title: 'Medicines', sparql: meds.sparql, note:
        'owl:propertyChainAxiom ( med:hasPrescription med:prescribes ) is what turns two hops into one.' }
    ));

    if (alerts.alerts.length) {
      host.appendChild(App.panel({
        title: 'Checks on your current medicines',
        class: 'panel-alert',
        provenance: { title: 'Safety checks', sparql: alerts.sparql, note: alerts.note },
        children: [el('ul', { class: 'alert-list' }, alerts.alerts.map(function (a) {
          return el('li', { class: 'alert alert-' + a.level }, [
            el('span', { class: 'alert-kind', text: a.kind }),
            el('div', {}, [el('strong', { text: a.title }), el('p', { text: a.detail })])
          ]);
        }))]
      }));
    }

    var active = meds.rows.filter(function (m) { return m.status === 'Active'; });
    var past = meds.rows.filter(function (m) { return m.status !== 'Active'; });

    host.appendChild(App.panel({
      title: 'Current', subtitle: active.length + ' active', flush: true,
      provenance: { title: 'Medicines', sparql: meds.sparql, rows: meds.rows.length, ms: meds.ms },
      children: [App.table(medColumns(), active, { emptyText: 'No active medicines.' })]
    }));

    if (past.length) {
      host.appendChild(App.panel({
        title: 'Previous', subtitle: past.length + ' completed courses', flush: true,
        children: [App.table(medColumns(), past.slice(0, 25), {})]
      }));
    }
  }

  function medColumns() {
    return [
      { key: 'drugName', label: 'Medicine', render: function (r) {
        return el('div', {}, [
          el('div', { text: r.drugName }),
          el('div', { class: 'cell-sub', text: r.strength || '' })
        ]);
      } },
      { key: 'dosage', label: 'Dose' },
      { key: 'frequency', label: 'How often' },
      { key: 'duration', label: 'Days', align: 'right' },
      { key: 'date', label: 'Started', render: function (r) { return App.fmtDate(r.date); } },
      { key: 'prescriber', label: 'Prescribed by' },
      { key: 'dispensed', label: 'Collected', render: function (r) {
        return App.tag(App.isTrue(r.dispensed) ? 'Collected' : 'Waiting',
          App.isTrue(r.dispensed) ? 'quiet' : 'amber');
      } }
    ];
  }

  /* --------------------------------------------------------------- results */

  function results(host, me) {
    var labs = Q.labResults(me);
    host.appendChild(App.pageHead('Test results',
      'Laboratory and imaging results, with the normal range for each.'));

    var out = labs.rows.filter(function (r) { return App.isTrue(r.out); });
    if (out.length) {
      host.appendChild(App.semanticNote(
        out.length + ' of your results sit outside the reference range. Those results carry the class ' +
        '<span class="mono">med:AbnormalResult</span>, which is not a flag anyone sets: it follows from ' +
        'the value falling outside the range recorded with the test.',
        { title: 'Abnormal results', sparql: labs.sparql }
      ));
    }

    host.appendChild(App.panel({
      title: 'All results', flush: true,
      provenance: { title: 'Results', sparql: labs.sparql, rows: labs.rows.length, ms: labs.ms },
      children: [App.table([
        { key: 'analyte', label: 'Test' },
        { key: 'date', label: 'Date', render: function (r) { return App.fmtDate(r.date); } },
        { key: 'value', label: 'Result', align: 'right', render: function (r) {
          if (r.value === undefined) return el('span', { class: 'dim', text: 'awaiting' });
          return el('span', { class: 'result-value' + (App.isTrue(r.out) ? ' is-out' : '') },
            [el('strong', { text: r.value }), el('span', { text: ' ' + (r.unit || '') })]);
        } },
        { key: 'range', label: 'Reference', align: 'right', render: function (r) {
          return r.refLow !== undefined ? r.refLow + ' \u2013 ' + r.refHigh : '';
        } },
        { key: 'status', label: '', render: function (r) {
          if (r.status === 'Pending') return App.tag('Processing', 'blue');
          return App.isTrue(r.out) ? App.tag('Outside range', 'red') : App.tag('Normal', 'green');
        } }
      ], labs.rows, { emptyText: 'No tests on file.' })]
    }));
  }

  /* --------------------------------------------------------------- network */

  /**
   * The patient-facing view of the comorbidity network: where their conditions
   * sit, and what else the hospital population tends to carry alongside them.
   * Framed as description, not prediction.
   */
  function network(host, me) {
    var conds = Q.conditions(me);
    var mine = conds.rows.map(function (c) { return c.disease; });
    var uniqueMine = Array.from(new Set(mine));
    var model = Comorbidity.get();

    host.appendChild(App.pageHead('Your conditions in context',
      'How your conditions relate to each other, and what commonly appears alongside them across ' +
      App.num(model.totalPatients) + ' patients at this hospital.'));

    if (!uniqueMine.length) {
      host.appendChild(App.emptyState('You have no conditions recorded, so there is nothing to place on the network yet.'));
      return;
    }

    host.appendChild(el('div', { class: 'notice' }, [
      el('strong', { text: 'Read this as a description, not a prediction.' }),
      el('p', { text:
        'The links below say that patients here who have one of your conditions often also have ' +
        'another. That is a pattern in this hospital\u2019s records. It is not a forecast about you, ' +
        'and it is not a diagnosis. Bring anything that concerns you to your doctor.' })
    ]));

    var projection = Comorbidity.projectionFor(uniqueMine);

    host.appendChild(App.panel({
      title: 'Your conditions on the network',
      subtitle: 'Sized by how many patients here carry each one',
      provenance: {
        title: 'Comorbidity network', sparql: model.sparql, note: model.note,
        intro: 'The whole network is computed from this one query. Every (patient, disease) pair the ' +
               'reasoner can derive is counted, then support, lift and the phi coefficient are ' +
               'measured for each pair of diseases.'
      },
      children: [GraphView.render({
        highlight: uniqueMine,
        focusMode: true,
        onSelect: null,
        height: 460
      })]
    }));

    var mineNodes = uniqueMine.map(function (iri) { return model.byIri.get(iri); }).filter(Boolean);

    host.appendChild(App.panel({
      title: 'How common your conditions are here',
      flush: true,
      children: [App.table([
        { key: 'name', label: 'Condition', render: function (n) {
          return el('span', { class: 'dot-label' }, [
            el('span', { class: 'dot', style: 'background:' + n.color }),
            el('span', { text: n.name })
          ]);
        } },
        { key: 'categoryLabel', label: 'Family' },
        { key: 'prevalence', label: 'Patients here', align: 'right' },
        { key: 'share', label: 'Share of patients', align: 'right', render: function (n) {
          return (n.share * 100).toFixed(1) + '%';
        } },
        { key: 'links', label: 'Linked conditions', align: 'right', render: function (n) {
          return String(Comorbidity.partnersOf(n.iri).length);
        } }
      ], mineNodes, { dense: true })]
    }));

    if (projection.length) {
      host.appendChild(App.panel({
        title: 'Often seen alongside yours',
        subtitle: 'Conditions that frequently accompany yours in this population, which you do not have',
        class: 'panel-semantic',
        children: [
          el('p', { class: 'muted mb', text:
            'Ordered by how much more often each appears with your conditions than chance alone would ' +
            'produce. Your care team sees the same list.' }),
          el('div', { class: 'proj-list' }, projection.map(function (p) {
            var strongest = p.from.slice().sort(function (a, b) { return b.lift - a.lift; })[0];
            return el('div', { class: 'proj' }, [
              el('span', { class: 'dot', style: 'background:' + (p.node ? p.node.color : '#5C6B6A') }),
              el('div', { class: 'proj-main' }, [
                el('strong', { text: p.name }),
                el('p', { text: 'Seen with your ' + strongest.name + ' in ' + strongest.support +
                  ' patients here, about ' + strongest.lift.toFixed(1) + ' times more often than chance.' })
              ]),
              el('span', { class: 'proj-score mono', text: strongest.lift.toFixed(1) + '\u00D7' })
            ]);
          }))
        ]
      }));
    }
  }

  /* --------------------------------------------------------------- billing */

  function billing(host, me) {
    var inv = Q.invoices(me);
    host.appendChild(App.pageHead('Billing and insurance', 'Invoices raised against your visits.'));

    var outstanding = inv.rows.filter(function (r) { return !App.isTrue(r.paid); });
    var total = outstanding.reduce(function (a, r) { return a + Number(r.amount || 0); }, 0);
    var insurer = inv.rows.filter(function (r) { return r.insurer; })[0];

    host.appendChild(el('div', { class: 'grid-3' }, [
      App.statTile({ label: 'Outstanding', value: App.money(total),
        detail: outstanding.length + ' unpaid ' + (outstanding.length === 1 ? 'invoice' : 'invoices'),
        tone: total > 0 ? 'warn' : null }),
      App.statTile({ label: 'Invoices on file', value: String(inv.rows.length),
        detail: 'Across all your visits' }),
      App.statTile({ label: 'Insurer', value: insurer ? insurer.insurer : 'Self funded',
        detail: insurer ? insurer.coverage + '% covered' : 'No policy on record' })
    ]));

    host.appendChild(App.panel({
      title: 'Invoices', flush: true,
      provenance: { title: 'Billing', sparql: inv.sparql, rows: inv.rows.length, ms: inv.ms },
      children: [App.table([
        { key: 'date', label: 'Date', render: function (r) { return App.fmtDate(r.date); } },
        { key: 'amount', label: 'Amount', align: 'right', render: function (r) { return App.money(r.amount); } },
        { key: 'insurer', label: 'Covered by' },
        { key: 'coverage', label: 'Cover', align: 'right', render: function (r) {
          return r.coverage ? r.coverage + '%' : '';
        } },
        { key: 'status', label: 'Status', render: function (r) {
          return App.tag(r.status || (App.isTrue(r.paid) ? 'Settled' : 'Due'),
            App.isTrue(r.paid) ? 'green' : 'amber');
        } }
      ], inv.rows, { emptyText: 'No invoices raised.' })]
    }));
  }

  return { render: render };
})();
