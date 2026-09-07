/* =============================================================================
   view-auth.js — sign in and sign up.

   Deliberately quiet. The earlier version put a wall of demo accounts on the
   front door, which made the first thing anyone saw look like a debug screen.
   The demo personas now live behind the login, on the Explore page, where they
   read as a feature rather than clutter.
   ========================================================================== */
var Auth = (function () {
  'use strict';
  var el = App.el;

  var mode = 'login';

  function render() {
    return mode === 'signup' ? layout(signupForm()) : layout(loginForm());
  }

  /* ------------------------------------------------------------- chrome -- */

  function layout(card) {
    return el('div', { class: 'auth' }, [
      el('div', { class: 'auth-aside' }, [
        el('div', { class: 'auth-brand' }, [
          el('span', { class: 'brand-mark', html: mark() }),
          el('div', {}, [
            el('strong', { text: 'MediSem' }),
            el('span', { text: 'Multispecialty Hospital' })
          ])
        ]),
        el('h1', { class: 'auth-headline', text: 'A hospital record that understands itself.' }),
        el('p', { class: 'auth-blurb', text:
          'Patients, visits, diagnoses, prescriptions and results are stored as RDF and described ' +
          'by an OWL ontology. Safety alerts, disease categories and the comorbidity network are ' +
          'worked out by a reasoner rather than written into the data.' }),
        el('ul', { class: 'auth-points' }, [
          point('One record, many views', 'A patient registered by a doctor appears immediately in the laboratory worklist and the pharmacy queue.'),
          point('Nothing is hard-coded', 'Drug interaction and contraindication alerts are graph patterns, so one fact in the formulary protects every patient.'),
          point('Show your working', 'Every panel exposes the SPARQL that produced it.')
        ]),
        el('p', { class: 'auth-foot', text:
          'Demonstration system. All existing patients, staff and records are fictional. ' +
          'Do not enter real medical information.' })
      ]),
      el('div', { class: 'auth-main' }, [card])
    ]);
  }

  function point(title, body) {
    return el('li', {}, [el('strong', { text: title }), el('span', { text: body })]);
  }

  function mark() {
    return '<svg viewBox="0 0 26 26" aria-hidden="true">' +
      '<line x1="5" y1="19" x2="13" y2="6" stroke="#4FBF95" stroke-width="1.4"/>' +
      '<line x1="13" y1="6" x2="21" y2="19" stroke="#7FA9D0" stroke-width="1.4"/>' +
      '<circle cx="5" cy="19" r="3" fill="#4FBF95"/>' +
      '<circle cx="13" cy="6" r="3" fill="#EAF0EE"/>' +
      '<circle cx="21" cy="19" r="3" fill="none" stroke="#7FA9D0" stroke-width="1.7"/></svg>';
  }

  function switchTo(next) {
    mode = next;
    App.route();
  }

  /* -------------------------------------------------------------- login -- */

  function loginForm() {
    var error = el('p', { class: 'auth-error' });
    var email = el('input', { class: 'field', type: 'email', autocomplete: 'username', placeholder: 'you@example.com' });
    var pass = el('input', { class: 'field', type: 'password', autocomplete: 'current-password', placeholder: 'Your password' });
    var button = el('button', { class: 'btn btn-primary btn-block', text: 'Sign in' });

    function submit() {
      error.textContent = '';
      if (!email.value || !pass.value) { error.textContent = 'Enter your email and password.'; return; }
      button.disabled = true; button.textContent = 'Signing in\u2026';
      API.login(email.value, pass.value).then(function (user) {
        App.adoptSession(user);
      }).catch(function (err) {
        error.textContent = err.message;
        button.disabled = false; button.textContent = 'Sign in';
      });
    }
    button.addEventListener('click', submit);
    [email, pass].forEach(function (f) {
      f.addEventListener('keydown', function (e) { if (e.key === 'Enter') submit(); });
    });

    return el('div', { class: 'auth-card' }, [
      el('h2', { text: 'Sign in' }),
      el('p', { class: 'muted', text: 'Use the account you created here.' }),
      el('label', { class: 'field-label', text: 'Email' }), email,
      el('label', { class: 'field-label', text: 'Password' }), pass,
      error,
      button,
      el('p', { class: 'auth-switch' }, [
        el('span', { text: 'No account yet? ' }),
        el('button', { class: 'link-btn', text: 'Create one', onclick: function () { switchTo('signup'); } })
      ]),
      el('div', { class: 'auth-tour' }, [
        el('p', { text: 'Once you are in, the Explore page lets you step into any role in the ' +
          'hospital \u2014 a consultant, the laboratory, the pharmacy, records, or any of the ' +
          'demonstration patients \u2014 and look around with their permissions.' })
      ])
    ]);
  }

  /* ------------------------------------------------------------- signup -- */

  var DEPARTMENTS = [
    ['Dept_GeneralMedicine', 'General Medicine'], ['Dept_Cardiology', 'Cardiology'],
    ['Dept_Neurology', 'Neurology'], ['Dept_Endocrinology', 'Endocrinology'],
    ['Dept_Pulmonology', 'Pulmonology'], ['Dept_Nephrology', 'Nephrology'],
    ['Dept_Oncology', 'Oncology'], ['Dept_Orthopedics', 'Orthopaedics'],
    ['Dept_Psychiatry', 'Psychiatry'], ['Dept_Pediatrics', 'Paediatrics'],
    ['Dept_Emergency', 'Emergency and Trauma'], ['Dept_Radiology', 'Radiology'],
    ['Dept_Pathology', 'Pathology and Laboratory'], ['Dept_Pharmacy', 'Pharmacy']
  ];
  var SPECIALTIES = [
    ['', 'General practice'], ['Cardiologist', 'Cardiology'], ['Neurologist', 'Neurology'],
    ['Endocrinologist', 'Endocrinology'], ['Pulmonologist', 'Pulmonology'],
    ['Nephrologist', 'Nephrology'], ['Oncologist', 'Oncology'],
    ['Orthopedist', 'Orthopaedics'], ['Psychiatrist', 'Psychiatry'],
    ['Pediatrician', 'Paediatrics'], ['EmergencyPhysician', 'Emergency medicine'],
    ['GeneralPhysician', 'General medicine']
  ];

  function signupForm() {
    var error = el('p', { class: 'auth-error' });
    var role = 'PatientRole';

    var name = el('input', { class: 'field', placeholder: 'Full name', autocomplete: 'name' });
    var email = el('input', { class: 'field', type: 'email', placeholder: 'you@example.com', autocomplete: 'email' });
    var pass = el('input', { class: 'field', type: 'password', placeholder: 'At least 8 characters', autocomplete: 'new-password' });

    // patient fields
    var sex = select([['', 'Prefer not to say'], ['Female', 'Female'], ['Male', 'Male'], ['Other', 'Other']]);
    var age = el('input', { class: 'field', type: 'number', min: '0', max: '120', placeholder: 'Age' });
    var blood = select([['', 'Unknown']].concat(['O+','O-','A+','A-','B+','B-','AB+','AB-'].map(function (b) { return [b, b]; })));
    var phone = el('input', { class: 'field', placeholder: 'Phone (optional)' });

    // clinician fields
    var specialty = select(SPECIALTIES);
    var department = select(DEPARTMENTS);
    var qualification = el('input', { class: 'field', placeholder: 'e.g. MD, DM Cardiology' });
    var experience = el('input', { class: 'field', type: 'number', min: '0', max: '60', placeholder: 'Years' });
    var fee = el('input', { class: 'field', type: 'number', min: '0', placeholder: 'Consultation fee' });

    var patientBlock = el('div', { class: 'form-grid' }, [
      wrap('Sex', sex), wrap('Age', age), wrap('Blood group', blood), wrap('Phone', phone)
    ]);
    var doctorBlock = el('div', { class: 'form-grid' }, [
      wrap('Speciality', specialty), wrap('Department', department),
      wrap('Qualification', qualification, 'wide'),
      wrap('Years of experience', experience), wrap('Consultation fee', fee)
    ]);
    var staffBlock = el('div', { class: 'form-grid' }, [wrap('Department', department.cloneNode(true), 'wide')]);
    doctorBlock.style.display = 'none';
    staffBlock.style.display = 'none';

    var ROLE_CHOICES = [
      ['PatientRole', 'Patient', 'Book appointments and see your own record'],
      ['DoctorRole', 'Doctor', 'Run a caseload, register patients, prescribe'],
      ['LabRole', 'Laboratory', 'Work the pending test list and enter results'],
      ['PharmacyRole', 'Pharmacy', 'Dispense prescriptions with interaction checks'],
      ['AdminRole', 'Administration', 'Whole-hospital records and the graph tools']
    ];

    var rolePicker = el('div', { class: 'role-picker' }, ROLE_CHOICES.map(function (choice) {
      var btn = el('button', {
        class: 'role-choice' + (choice[0] === role ? ' is-active' : ''),
        onclick: function () {
          role = choice[0];
          Array.prototype.forEach.call(rolePicker.children, function (b, i) {
            b.className = 'role-choice' + (ROLE_CHOICES[i][0] === role ? ' is-active' : '');
          });
          patientBlock.style.display = role === 'PatientRole' ? '' : 'none';
          doctorBlock.style.display = role === 'DoctorRole' ? '' : 'none';
          staffBlock.style.display = (role === 'LabRole' || role === 'PharmacyRole' || role === 'AdminRole') ? '' : 'none';
        }
      }, [
        el('strong', { text: choice[1] }),
        el('span', { text: choice[2] })
      ]);
      return btn;
    }));

    var button = el('button', { class: 'btn btn-primary btn-block', text: 'Create account' });

    function submit() {
      error.textContent = '';
      if (!name.value.trim()) { error.textContent = 'Please enter your full name.'; return; }
      if (!email.value.trim()) { error.textContent = 'Please enter an email address.'; return; }
      if (pass.value.length < 8) { error.textContent = 'Your password needs at least 8 characters.'; return; }

      button.disabled = true; button.textContent = 'Creating\u2026';
      API.signup({
        name: name.value, email: email.value, password: pass.value, role: role,
        sex: sex.value, age: age.value, bloodGroup: blood.value, phone: phone.value,
        specialty: specialty.value, department: department.value,
        qualification: qualification.value, experience: experience.value, fee: fee.value
      }).then(function (out) {
        // The new person is already a node in the graph; add them locally so the
        // interface can draw their record without another round trip.
        (out.triples || []).forEach(function (t) { App.KG.base.add(t.s, t.p, t.o); });
        App.rematerialise();
        App.adoptSession(out.user);
        App.toast('Welcome to MediSem, ' + out.user.name.split(' ')[0] + '.', 'good');
      }).catch(function (err) {
        error.textContent = err.message;
        button.disabled = false; button.textContent = 'Create account';
      });
    }
    button.addEventListener('click', submit);
    [name, email, pass].forEach(function (f) {
      f.addEventListener('keydown', function (e) { if (e.key === 'Enter') submit(); });
    });

    return el('div', { class: 'auth-card is-wide' }, [
      el('h2', { text: 'Create an account' }),
      el('p', { class: 'muted', text: 'Choose how you will use the system. You can explore the other roles afterwards.' }),

      rolePicker,

      el('div', { class: 'form-grid' }, [
        wrap('Full name', name, 'wide'),
        wrap('Email', email), wrap('Password', pass)
      ]),
      patientBlock, doctorBlock, staffBlock,

      error,
      button,
      el('p', { class: 'auth-switch' }, [
        el('span', { text: 'Already have an account? ' }),
        el('button', { class: 'link-btn', text: 'Sign in', onclick: function () { switchTo('login'); } })
      ]),
      el('p', { class: 'auth-note', text:
        'In a real deployment, staff accounts would be provisioned by administration rather than ' +
        'self-registered. They are open here so you can see every part of the system.' })
    ]);
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

  return { render: render, switchTo: switchTo };
})();
