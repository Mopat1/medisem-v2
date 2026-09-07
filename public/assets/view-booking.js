/* =============================================================================
   view-booking.js — appointments and patient registration.

   Two workflows that write into the shared graph:

     Booking     a patient chooses a department, a consultant and a free slot.
                 Availability is worked out by querying appointments already in
                 the graph, so two patients cannot take the same slot.

     Registration a doctor admits a new patient to the hospital, optionally
                 creating a login for them. The new patient is immediately
                 visible to the laboratory, the pharmacy and administration,
                 because they are all reading the same graph.
   ========================================================================== */
var Booking = (function () {
  'use strict';
  var el = App.el;

  var SLOTS = ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
               '12:00', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00'];

  var med = function (p) { return RDF.I(RDF.NS.med + p); };
  var L = RDF.mkLit;
  var XSD = RDF.NS.xsd;

  /* ------------------------------------------------------- doctor lookup -- */

  var DOCTORS = `
SELECT DISTINCT ?doctor ?name ?initials ?dept ?deptName ?qualification ?fee ?experience
WHERE {
  ?doctor a med:Doctor ; med:name ?name .
  OPTIONAL { ?doctor med:photoInitials ?initials }
  OPTIONAL { ?doctor med:worksIn ?dept . ?dept med:name ?deptName }
  OPTIONAL { ?doctor med:qualification ?qualification }
  OPTIONAL { ?doctor med:consultationFee ?fee }
  OPTIONAL { ?doctor med:yearsOfExperience ?experience }
}
ORDER BY ?deptName ?name`;

  var BOOKED = `
SELECT ?time
WHERE {
  ?appt a med:Appointment ;
        med:appointmentWith {{doctor}} ;
        med:date "{{date}}"^^xsd:date ;
        med:time ?time .
  OPTIONAL { ?appt med:status ?status }
  FILTER(!BOUND(?status) || ?status != "Cancelled")
}`;

  function bookedSlots(doctorTerm, date) {
    var out = Q.run(BOOKED.replace('{{doctor}}', doctorTerm).replace('{{date}}', date));
    return out.rows.map(function (r) { return r.time; });
  }

  function futureDates(count) {
    var days = [];
    var start = new Date(App.TODAY.getTime());
    for (var i = 1; days.length < count; i++) {
      var d = new Date(start.getTime() + i * 86400000);
      if (d.getUTCDay() === 0) continue;      // the clinic does not run on Sundays
      days.push(d.toISOString().slice(0, 10));
    }
    return days;
  }

  /* ------------------------------------------------------------- booking -- */

  function renderBooking(host, patientTerm) {
    var doctors = Q.run(DOCTORS);
    var existing = Q.appointments(patientTerm);

    var chosen = { doctor: null, date: futureDates(1)[0], slot: null, reason: '' };

    host.appendChild(App.pageHead('Book an appointment',
      'Choose a department, then a consultant and a free time.'));

    host.appendChild(App.semanticNote(
      'Which slots are free is not stored anywhere. It is worked out by asking the graph which ' +
      'appointments that consultant already has on that date, so the list is always correct even ' +
      'when somebody else books at the same moment.',
      { title: 'Slot availability', sparql: BOOKED.replace('{{doctor}}', 'res:Doc_Ramesh').replace('{{date}}', chosen.date) }
    ));

    var upcoming = existing.rows.filter(function (a) {
      return App.daysBetween(a.date) < 0 && a.status !== 'Cancelled';
    });
    if (upcoming.length) {
      host.appendChild(App.panel({
        title: 'You already have appointments booked', flush: true,
        provenance: { title: 'Your appointments', sparql: existing.sparql, rows: existing.rows.length },
        children: [App.table([
          { key: 'date', label: 'When', render: function (r) {
            return el('div', {}, [
              el('div', { text: App.fmtDate(r.date) + (r.time ? ', ' + r.time : '') }),
              el('div', { class: 'cell-sub', text: App.relative(r.date) })
            ]);
          } },
          { key: 'doctorName', label: 'With' },
          { key: 'deptName', label: 'Department' },
          { key: 'status', label: 'Status', render: function (r) { return App.tag(r.status || 'Scheduled', 'blue'); } }
        ], upcoming, { dense: true })]
      }));
    }

    // department -> doctors
    var byDept = new Map();
    doctors.rows.forEach(function (d) {
      var key = d.deptName || 'Other';
      if (!byDept.has(key)) byDept.set(key, []);
      byDept.get(key).push(d);
    });

    var deptSelect = select([['', 'All departments']].concat(
      Array.from(byDept.keys()).sort().map(function (k) { return [k, k]; })));

    var doctorHost = el('div', { class: 'doctor-grid' });
    var slotPanel = el('div');

    function paintDoctors() {
      App.clear(doctorHost);
      var rows = doctors.rows.filter(function (d) {
        return !deptSelect.value || d.deptName === deptSelect.value;
      });
      rows.forEach(function (d) {
        var load = Q.run(`SELECT (COUNT(?a) AS ?n) WHERE { ?a a med:Appointment ; med:appointmentWith <${d.doctor}> }`);
        var card = el('button', {
          class: 'doctor-card' + (chosen.doctor && chosen.doctor.doctor === d.doctor ? ' is-active' : ''),
          onclick: function () {
            chosen.doctor = d; chosen.slot = null;
            paintDoctors(); paintSlots();
          }
        }, [
          App.avatar(d.initials || d.name, { size: 'lg' }),
          el('span', { class: 'doctor-meta' }, [
            el('strong', { text: d.name }),
            el('span', { class: 'doctor-dept', text: d.deptName || 'General' }),
            el('span', { class: 'doctor-qual', text: d.qualification || '' }),
            el('span', { class: 'doctor-facts' }, [
              d.experience ? el('span', { text: d.experience + ' yrs' }) : null,
              d.fee ? el('span', { text: App.money(d.fee) }) : null,
              el('span', { text: (load.rows[0] ? load.rows[0].n : '0') + ' booked' })
            ])
          ])
        ]);
        doctorHost.appendChild(card);
      });
      if (!rows.length) doctorHost.appendChild(App.emptyState('No consultants in that department.'));
    }

    function paintSlots() {
      App.clear(slotPanel);
      if (!chosen.doctor) {
        slotPanel.appendChild(App.emptyState('Pick a consultant to see when they are free.'));
        return;
      }

      var dates = futureDates(10);
      var dateRow = el('div', { class: 'date-row' }, dates.map(function (d) {
        var when = new Date(d + 'T00:00:00Z');
        return el('button', {
          class: 'date-chip' + (d === chosen.date ? ' is-active' : ''),
          onclick: function () { chosen.date = d; chosen.slot = null; paintSlots(); }
        }, [
          el('span', { class: 'date-dow', text: ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'][when.getUTCDay()] }),
          el('span', { class: 'date-num', text: String(when.getUTCDate()) }),
          el('span', { class: 'date-mon', text: App.fmtShortDate(d).split(' ')[1] })
        ]);
      }));

      var taken = bookedSlots(RDF.I(chosen.doctor.doctor), chosen.date);
      var slotRow = el('div', { class: 'slot-row' }, SLOTS.map(function (t) {
        var isTaken = taken.indexOf(t) !== -1;
        return el('button', {
          class: 'slot' + (isTaken ? ' is-taken' : '') + (chosen.slot === t ? ' is-active' : ''),
          disabled: isTaken,
          title: isTaken ? 'Already booked' : 'Available',
          onclick: function () { chosen.slot = t; paintSlots(); }
        }, [el('span', { text: t })]);
      }));

      var reason = el('input', { class: 'field', placeholder: 'Reason for the visit (optional)' });
      reason.value = chosen.reason;
      reason.addEventListener('input', function () { chosen.reason = reason.value; });

      var confirm = el('button', {
        class: 'btn btn-primary', text: 'Confirm booking',
        disabled: !chosen.slot,
        onclick: function () { book(confirm); }
      });

      slotPanel.appendChild(el('div', { class: 'booking-body' }, [
        el('h4', { class: 'booking-h4', text: 'Choose a date' }), dateRow,
        el('h4', { class: 'booking-h4', text: 'Choose a time' }),
        slotRow,
        el('p', { class: 'muted small', text:
          taken.length ? taken.length + ' of these slots are already taken on this date.'
                       : 'Every slot is free on this date.' }),
        el('div', { class: 'booking-confirm' }, [
          el('div', { class: 'booking-summary' }, [
            el('span', { class: 'field-label', text: 'Your appointment' }),
            el('strong', { text: chosen.slot
              ? App.fmtDate(chosen.date) + ' at ' + chosen.slot + ' with ' + chosen.doctor.name
              : 'Pick a time to continue' })
          ]),
          reason,
          confirm
        ])
      ]));
    }

    function book(button) {
      if (!chosen.doctor || !chosen.slot) return;
      button.disabled = true; button.textContent = 'Booking\u2026';

      var apptId = RDF.I(RDF.NS.res + DB.mintId('Appt'));
      var triples = [
        [apptId, RDF.C.TYPE, med('Appointment')],
        [apptId, med('forPatient'), patientTerm],
        [apptId, med('appointmentWith'), RDF.I(chosen.doctor.doctor)],
        [apptId, med('date'), L(chosen.date, XSD + 'date')],
        [apptId, med('time'), L(chosen.slot)],
        [apptId, med('status'), L('Scheduled')],
        [patientTerm, med('hasAppointment'), apptId]
      ];
      if (chosen.doctor.dept) triples.push([apptId, med('inDepartment'), RDF.I(chosen.doctor.dept)]);
      if (chosen.reason.trim()) triples.push([apptId, med('reason'), L(chosen.reason.trim())]);

      App.commit(triples, 'appointment booked').then(function () {
        App.toast('Booked with ' + chosen.doctor.name + ' on ' + App.fmtDate(chosen.date) +
                  ' at ' + chosen.slot, 'good');
        App.go('home');
        App.route();
      }).catch(function (err) {
        button.disabled = false; button.textContent = 'Confirm booking';
        App.toast(err.message, 'warn');
      });
    }

    host.appendChild(App.panel({
      title: 'Available consultants',
      subtitle: doctors.rows.length + ' doctors practising at MediSem',
      tools: [deptSelect],
      provenance: { title: 'Consultants', sparql: DOCTORS, rows: doctors.rows.length },
      children: [doctorHost]
    }));

    host.appendChild(App.panel({
      title: 'Pick a time',
      subtitle: 'Slots already taken are shown greyed out',
      children: [slotPanel]
    }));

    deptSelect.addEventListener('change', function () { paintDoctors(); });
    paintDoctors();
    paintSlots();
  }

  /* -------------------------------------------------------- registration -- */

  function renderRegistration(host) {
    var me = App.currentIdentity().subject;

    host.appendChild(App.pageHead('Register a patient',
      'Admit somebody new to the hospital. They become visible across every department immediately.'));

    host.appendChild(App.semanticNote(
      'Registration writes a handful of triples and nothing else. The patient appears in the ' +
      'records register, on your caseload once you see them, and in the laboratory and pharmacy ' +
      'queues as soon as you order anything, because all of those screens are queries over the ' +
      'same graph rather than separate tables.',
      { title: 'What registration writes', sparql:
        '# roughly the triples this form produces\n' +
        'res:Pat_NEW  a med:OutPatient ;\n' +
        '    med:name "…" ; med:mrn "…" ;\n' +
        '    med:sex "…" ; med:age … ;\n' +
        '    med:primaryPhysician res:Doc_… .' }
    ));

    var name = el('input', { class: 'field', placeholder: 'Full name' });
    var sex = select([['Female', 'Female'], ['Male', 'Male'], ['Other', 'Other']]);
    var age = el('input', { class: 'field', type: 'number', min: '0', max: '120', placeholder: 'Age' });
    var blood = select([['', 'Unknown']].concat(['O+','O-','A+','A-','B+','B-','AB+','AB-'].map(function (b) { return [b, b]; })));
    var phone = el('input', { class: 'field', placeholder: 'Phone' });
    var address = el('input', { class: 'field', placeholder: 'Address' });
    var kind = select([['OutPatient', 'Out-patient'], ['InPatient', 'In-patient'], ['EmergencyVisit', 'Emergency']]);

    var conditionSel = select([['', 'No presenting condition yet']].concat(
      Q.run('SELECT ?d ?n WHERE { ?d a med:Disease ; med:name ?n } ORDER BY ?n').rows
        .map(function (r) { return [r.d, r.n]; })));
    var severity = select([['Mild', 'Mild'], ['Moderate', 'Moderate'], ['Severe', 'Severe']]);

    var wantsLogin = el('input', { type: 'checkbox' });
    var loginEmail = el('input', { class: 'field', type: 'email', placeholder: 'patient@example.com' });
    var loginPass = el('input', { class: 'field', type: 'password', placeholder: 'At least 8 characters' });
    var loginBlock = el('div', { class: 'form-grid' }, [
      wrap('Email for the patient portal', loginEmail),
      wrap('Temporary password', loginPass)
    ]);
    loginBlock.style.display = 'none';
    wantsLogin.addEventListener('change', function () {
      loginBlock.style.display = wantsLogin.checked ? '' : 'none';
    });

    var status = el('p', { class: 'form-status' });
    var button = el('button', { class: 'btn btn-primary', text: 'Register patient' });

    button.addEventListener('click', function () {
      status.textContent = '';
      if (!name.value.trim()) { App.toast('The patient needs a name.', 'warn'); return; }
      if (wantsLogin.checked && (!loginEmail.value || loginPass.value.length < 8)) {
        App.toast('For a portal login, give an email and a password of at least 8 characters.', 'warn');
        return;
      }

      button.disabled = true; button.textContent = 'Registering\u2026';

      var localName = DB.mintId('Pat');
      var patientId = RDF.I(RDF.NS.res + localName);
      var mrn = 'MRN-' + localName.replace('Pat_', '');
      var triples = [
        [patientId, RDF.C.TYPE, med(kind.value === 'EmergencyVisit' ? 'EmergencyPatient' : kind.value)],
        [patientId, med('name'), L(name.value.trim())],
        [patientId, med('mrn'), L(mrn)],
        [patientId, med('photoInitials'), L(App.initialsOf(name.value))],
        [patientId, med('sex'), L(sex.value)],
        [patientId, med('primaryPhysician'), me]
      ];
      if (age.value) triples.push([patientId, med('age'), L(String(parseInt(age.value, 10)), XSD + 'integer')]);
      if (blood.value) triples.push([patientId, med('bloodGroup'), L(blood.value)]);
      if (phone.value) triples.push([patientId, med('phone'), L(phone.value.trim())]);
      if (address.value) triples.push([patientId, med('address'), L(address.value.trim())]);
      if (loginEmail.value) triples.push([patientId, med('email'), L(loginEmail.value.trim())]);

      if (conditionSel.value) {
        var condId = RDF.I(RDF.NS.res + DB.mintId('Cond'));
        var today = new Date().toISOString().slice(0, 10);
        triples.push([condId, RDF.C.TYPE, med('Condition')]);
        if (severity.value === 'Severe') triples.push([condId, RDF.C.TYPE, med('CriticalCondition')]);
        triples.push([condId, med('ofDisease'), RDF.I(conditionSel.value)]);
        triples.push([condId, med('onsetDate'), L(today, XSD + 'date')]);
        triples.push([condId, med('severity'), L(severity.value)]);
        triples.push([condId, med('clinicalStatus'), L('Active')]);
        triples.push([condId, med('diagnosedBy'), me]);
        triples.push([patientId, med('hasCondition'), condId]);
      }

      App.commit(triples, 'patient registered').then(function () {
        if (!wantsLogin.checked) return null;
        return API.provision({
          email: loginEmail.value, password: loginPass.value,
          name: name.value.trim(), role: 'PatientRole', subjectIri: patientId
        });
      }).then(function (provisioned) {
        var msg = name.value.trim() + ' registered as ' + mrn;
        if (provisioned) msg += ' with a portal login';
        App.toast(msg, 'good');
        App.go('patient', patientId.replace(/^<|>$/g, ''));
        App.route();
      }).catch(function (err) {
        button.disabled = false; button.textContent = 'Register patient';
        App.toast(err.message, 'warn');
      });
    });

    host.appendChild(App.panel({
      title: 'New patient',
      children: [
        el('div', { class: 'form-grid' }, [
          wrap('Full name', name, 'wide'),
          wrap('Sex', sex), wrap('Age', age), wrap('Blood group', blood),
          wrap('Phone', phone), wrap('Address', address, 'wide'),
          wrap('Registering as', kind)
        ]),
        el('h4', { class: 'booking-h4', text: 'Presenting condition' }),
        el('div', { class: 'form-grid' }, [
          wrap('Condition', conditionSel, 'wide'),
          wrap('Severity', severity)
        ]),
        el('h4', { class: 'booking-h4', text: 'Patient portal access' }),
        el('label', { class: 'inline-check' }, [wantsLogin,
          el('span', { text: 'Create a login so this patient can see their own record' })]),
        loginBlock,
        el('div', { class: 'form-actions' }, [button, status])
      ]
    }));
  }

  /* ---------------------------------------------------------- lab orders -- */

  /** Ordering a test puts a row on the laboratory worklist. */
  function orderTestControl(patientTerm, onDone) {
    var me = App.currentIdentity().subject;
    var ANALYTES = ['HbA1c', 'Fasting glucose', 'Creatinine', 'eGFR', 'LDL cholesterol',
      'Triglycerides', 'TSH', 'Haemoglobin', 'Troponin I', 'NT-proBNP', 'Platelet count',
      'ESR', 'Urine WBC', 'INR', 'CA 15-3', 'CEA'];

    var analyte = select(ANALYTES.map(function (a) { return [a, a]; }));
    var reason = select([['', 'No specific condition']].concat(
      Q.conditions(patientTerm).rows.map(function (c) { return [c.disease, c.diseaseName]; })));
    var button = el('button', { class: 'btn btn-sm', text: 'Order test' });

    button.addEventListener('click', function () {
      button.disabled = true; button.textContent = 'Ordering\u2026';
      var orderId = RDF.I(RDF.NS.res + DB.mintId('Lab'));
      var today = new Date().toISOString().slice(0, 10);
      var triples = [
        [orderId, RDF.C.TYPE, med('LabOrder')],
        [orderId, med('analyte'), L(analyte.value)],
        [orderId, med('forPatient'), patientTerm],
        [orderId, med('date'), L(today, XSD + 'date')],
        [orderId, med('orderedBy'), me],
        [orderId, med('orderStatus'), L('Pending')]
      ];
      if (reason.value) triples.push([orderId, med('testsFor'), RDF.I(reason.value)]);

      App.commit(triples, 'lab test ordered').then(function () {
        App.toast(analyte.value + ' ordered. It is now on the laboratory worklist.', 'good');
        if (onDone) onDone();
      }).catch(function (err) {
        button.disabled = false; button.textContent = 'Order test';
        App.toast(err.message, 'warn');
      });
    });

    return el('div', { class: 'order-row' }, [analyte, reason, button]);
  }

  function wrap(label, control, span) {
    return el('label', { class: 'form-field' + (span ? ' is-' + span : '') }, [
      el('span', { class: 'field-label', text: label }), control
    ]);
  }
  function select(pairs) {
    return el('select', { class: 'field' }, pairs.map(function (p) {
      return el('option', { value: p[0], text: p[1] });
    }));
  }

  return {
    renderBooking: renderBooking,
    renderRegistration: renderRegistration,
    orderTestControl: orderTestControl
  };
})();
