/* =============================================================================
   view-explore.js — the demo persona explorer.

   This is where the demonstration accounts moved to. Signing in as yourself is
   the front door; this page lets you step into any role in the hospital and see
   the system through their eyes, then step back out again.

   Assuming a persona is a view-only convenience, not a privilege escalation:
   the account you actually signed in with is still what the server checks when
   anything is written.
   ========================================================================== */
var Explore = (function () {
  'use strict';
  var el = App.el;

  var GROUPS = [
    { role: 'DoctorRole', title: 'Consultants',
      blurb: 'A caseload assembled by inference, safety alerts across every patient, and the population view.',
      suggest: 'Open a patient, record a consultation, and watch a new alert appear.' },
    { role: 'PatientRole', title: 'Patients',
      blurb: 'The portal a patient sees: their history, medicines, results, bills and their place on the comorbidity network.',
      suggest: 'Try the visit history and the condition network.' },
    { role: 'LabRole', title: 'Laboratory',
      blurb: 'The pending worklist and abnormal result review.',
      suggest: 'Enter a wildly out-of-range value and see it reclassified.' },
    { role: 'PharmacyRole', title: 'Pharmacy',
      blurb: 'Prescriptions waiting to be dispensed, each checked against the patient\u2019s full record.',
      suggest: 'Look for a queue row with an interaction flag.' },
    { role: 'AdminRole', title: 'Administration',
      blurb: 'Whole-hospital records, staff and wards, exports, and the knowledge graph tools.',
      suggest: 'Open Knowledge graph and compare the stated and reasoned columns.' }
  ];

  function render(host) {
    var personas = App.demoPersonas();
    var identity = App.currentIdentity();

    host.appendChild(App.pageHead('Explore the system',
      'Step into any role in the hospital. Everything you see is the same graph, filtered by who you are.'));

    if (App.state.persona) {
      host.appendChild(el('div', { class: 'notice' }, [
        el('strong', { text: 'You are currently exploring as ' + App.state.persona.name + '.' }),
        el('p', {}, [
          el('span', { text: 'Anything you save is still recorded against your own account. ' }),
          el('button', { class: 'link-btn', text: 'Return to my account', onclick: App.leavePersona })
        ])
      ]));
    }

    host.appendChild(App.semanticNote(
      'Each of these people is a node in the same graph. Their role comes from ' +
      '<span class="mono">med:hasRole</span> on their account, and what they can see is decided by ' +
      'queries over that graph rather than by five separate applications.',
      { title: 'Accounts in the graph', sparql:
        'SELECT ?account ?login ?subject ?name ?role\nWHERE {\n' +
        '  ?account a med:Account ; med:login ?login ;\n' +
        '           med:accountFor ?subject ; med:hasRole ?role .\n' +
        '  ?subject med:name ?name .\n}' }
    ));

    GROUPS.forEach(function (group) {
      var list = personas.filter(function (p) { return p.role === group.role; });
      if (!list.length) return;

      host.appendChild(App.panel({
        title: group.title,
        subtitle: group.blurb,
        flush: true,
        children: [
          el('div', { class: 'persona-grid' }, list.map(function (p) {
            var detail = describe(p);
            var isCurrent = identity && identity.subjectIri === p.subjectIri;
            return el('button', {
              class: 'persona-card' + (isCurrent ? ' is-current' : ''),
              onclick: function () { App.enterPersona(p); }
            }, [
              App.avatar(p.initials, { size: 'lg' }),
              el('span', { class: 'persona-meta' }, [
                el('strong', { text: p.name }),
                el('span', { class: 'persona-detail', text: detail }),
                isCurrent ? el('span', { class: 'persona-current', text: 'you are here' }) : null
              ])
            ]);
          })),
          el('p', { class: 'persona-suggest', text: group.suggest })
        ]
      }));
    });
  }

  /** A short, honest line about who this person is, read from the graph. */
  function describe(persona) {
    var subject = persona.subject;
    var store = App.KG.mat;
    var med = function (p) { return RDF.I(RDF.NS.med + p); };

    if (persona.role === 'PatientRole') {
      var conds = Q.conditions(subject).rows;
      var active = conds.filter(function (c) { return c.status !== 'Resolved'; });
      var age = store.val(subject, med('age'));
      var bits = [];
      if (age) bits.push(age + ' years');
      if (active.length) {
        bits.push(active.slice(0, 2).map(function (c) {
          return Comorbidity.shortName(c.diseaseName);
        }).join(', ') + (active.length > 2 ? ' and ' + (active.length - 2) + ' more' : ''));
      } else {
        bits.push('no active conditions');
      }
      return bits.join(' \u00B7 ');
    }

    if (persona.role === 'DoctorRole') {
      var dept = store.one(subject, med('worksIn'));
      var deptName = dept ? store.val(dept, med('name')) : null;
      var caseload = Q.doctorPanel(subject).rows.length;
      return [deptName, caseload + ' patients'].filter(Boolean).join(' \u00B7 ');
    }

    var d = store.one(subject, med('worksIn'));
    return d ? store.val(d, med('name')) : persona.roleName;
  }

  return { render: render };
})();
