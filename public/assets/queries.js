/* =============================================================================
   queries.js — the model layer.

   Every panel in this application is filled by a real SPARQL query rather than
   by walking JavaScript objects. That is what makes the provenance drawer
   honest: when a user clicks the ◈ chip on a card, the query shown is the query
   that produced the numbers they are looking at, not a plausible-looking
   reconstruction written for the demo.

   Each function returns { rows, sparql, ms, note } so the caller can render the
   data and expose the reasoning behind it with the same object.
   ========================================================================== */
var Q = (function () {
  'use strict';

  /** Interpolate {{name}} placeholders. Values are already IRIs or literals. */
  function fill(template, params) {
    return template.replace(/\{\{(\w+)\}\}/g, function (_, key) {
      if (params[key] === undefined) throw new Error('Missing query parameter: ' + key);
      return params[key];
    });
  }

  /**
   * Run a query against the reasoned graph and return plain JavaScript values
   * alongside the query text. `store` defaults to the materialised graph so
   * derived facts are visible; pass App.KG.base to see only what was typed in.
   */
  function run(sparql, params, store) {
    var text = params ? fill(sparql, params) : sparql;
    var full = RDF.PREFIX_BLOCK + '\n\n' + text;
    var target = store || App.KG.mat;
    var out = RDF.query(full, target);
    var rows = [];
    if (out.form === 'select') {
      rows = out.rows.map(function (r) {
        var plain = {};
        out.vars.forEach(function (v) {
          plain[v] = r[v] === undefined ? undefined : RDF.strOf(r[v]);
          plain['$' + v] = r[v];             // the raw term, for links
        });
        return plain;
      });
    }
    return { rows: rows, vars: out.vars || [], sparql: text, ms: out.ms,
             boolean: out.boolean, form: out.form, store: out.store };
  }

  /* ---------------------------------------------------------------- people */

  var PATIENT_SUMMARY = `
SELECT ?patient ?name ?mrn ?sex ?age ?blood ?phone ?email ?address ?initials ?doctor ?doctorName
WHERE {
  {{patient}} med:name ?name ; med:mrn ?mrn .
  BIND({{patient}} AS ?patient)
  OPTIONAL { {{patient}} med:sex ?sex }
  OPTIONAL { {{patient}} med:age ?age }
  OPTIONAL { {{patient}} med:bloodGroup ?blood }
  OPTIONAL { {{patient}} med:phone ?phone }
  OPTIONAL { {{patient}} med:email ?email }
  OPTIONAL { {{patient}} med:address ?address }
  OPTIONAL { {{patient}} med:photoInitials ?initials }
  OPTIONAL { {{patient}} med:primaryPhysician ?doctor . ?doctor med:name ?doctorName }
}`;

  function patientSummary(patient) {
    var r = run(PATIENT_SUMMARY, { patient: patient });
    r.row = r.rows[0] || {};
    return r;
  }

  /* ------------------------------------------------------ conditions, past */

  // The clinical history. med:suffersFrom is never asserted anywhere in the
  // data: it is produced by a property chain over hasCondition and ofDisease.
  var CONDITIONS = `
SELECT ?condition ?disease ?diseaseName ?icd ?onset ?status ?severity ?resolved ?category
WHERE {
  {{patient}} med:hasCondition ?condition .
  ?condition med:ofDisease ?disease .
  ?disease med:name ?diseaseName .
  OPTIONAL { ?disease med:icd10 ?icd }
  OPTIONAL { ?condition med:onsetDate ?onset }
  OPTIONAL { ?condition med:clinicalStatus ?status }
  OPTIONAL { ?condition med:severity ?severity }
  OPTIONAL { ?condition med:resolvedDate ?resolved }
  OPTIONAL {
    ?disease a ?category .
    FILTER(?category != med:Disease && ?category != med:Condition)
    FILTER(STRSTARTS(STR(?category), STR(med:)))
    FILTER(STRENDS(STR(?category), "Disease") || STRENDS(STR(?category), "Neoplasm")
        || STRENDS(STR(?category), "Condition"))
  }
}
ORDER BY ?onset`;

  function conditions(patient) {
    var r = run(CONDITIONS, { patient: patient });
    // One row per category match, so fold them together.
    var byCondition = new Map();
    r.rows.forEach(function (row) {
      var key = row.condition;
      if (!byCondition.has(key)) {
        byCondition.set(key, Object.assign({}, row, { categories: [] }));
      }
      if (row.category) {
        var short = RDF.local(row.category);
        if (byCondition.get(key).categories.indexOf(short) === -1) {
          byCondition.get(key).categories.push(short);
        }
      }
    });
    r.rows = Array.from(byCondition.values());
    r.note = 'The disease category on each row is inferred: only the specific disease is stated in ' +
             'the data, its place in the taxonomy comes from rdfs:subClassOf.';
    return r;
  }

  /* -------------------------------------------------------------- timeline */

  var ENCOUNTERS = `
SELECT ?encounter ?date ?time ?type ?doctor ?doctorName ?dept ?deptName ?reason ?outcome
       ?stay ?condition ?diseaseName ?note ?noteText
WHERE {
  {{patient}} med:hasEncounter ?encounter .
  ?encounter med:date ?date ; a ?type .
  FILTER(?type != med:Encounter && ?type != med:UnplannedEncounter)
  FILTER(STRSTARTS(STR(?type), STR(med:)))
  OPTIONAL { ?encounter med:time ?time }
  OPTIONAL { ?encounter med:attendedBy ?doctor . ?doctor med:name ?doctorName }
  OPTIONAL { ?encounter med:inDepartment ?dept . ?dept med:name ?deptName }
  OPTIONAL { ?encounter med:reason ?reason }
  OPTIONAL { ?encounter med:outcome ?outcome }
  OPTIONAL { ?encounter med:lengthOfStay ?stay }
  OPTIONAL {
    ?encounter med:recordedCondition ?condition .
    ?condition med:ofDisease ?d . ?d med:name ?diseaseName
  }
  OPTIONAL { ?encounter med:hasNote ?note . ?note med:noteText ?noteText }
}
ORDER BY DESC(?date)`;

  function encounters(patient) {
    var r = run(ENCOUNTERS, { patient: patient });
    var seen = new Map();
    r.rows.forEach(function (row) {
      if (!seen.has(row.encounter)) seen.set(row.encounter, row);
    });
    r.rows = Array.from(seen.values()).sort(function (a, b) {
      return (b.date || '').localeCompare(a.date || '');
    });
    return r;
  }

  var VITALS = `
SELECT ?systolic ?diastolic ?heartRate ?temperature ?spo2 ?weight ?bmi
WHERE {
  {{encounter}} med:hasVitals ?v .
  OPTIONAL { ?v med:systolic ?systolic }
  OPTIONAL { ?v med:diastolic ?diastolic }
  OPTIONAL { ?v med:heartRate ?heartRate }
  OPTIONAL { ?v med:temperature ?temperature }
  OPTIONAL { ?v med:spo2 ?spo2 }
  OPTIONAL { ?v med:weightKg ?weight }
  OPTIONAL { ?v med:bmi ?bmi }
}`;
  function vitals(encounter) {
    var r = run(VITALS, { encounter: encounter });
    r.row = r.rows[0] || {};
    return r;
  }

  /* --------------------------------------------------------- prescriptions */

  // med:takesMedication is derived from hasPrescription then prescribes, so the
  // medicine list is a chain result rather than a stored field.
  var MEDICATIONS = `
SELECT ?rx ?drug ?drugName ?strength ?dosage ?frequency ?duration ?date ?status ?dispensed ?prescriber
WHERE {
  {{patient}} med:hasPrescription ?rx .
  ?rx med:prescribes ?drug .
  ?drug med:name ?drugName .
  OPTIONAL { ?drug med:strength ?strength }
  OPTIONAL { ?rx med:dosage ?dosage }
  OPTIONAL { ?rx med:frequency ?frequency }
  OPTIONAL { ?rx med:durationDays ?duration }
  OPTIONAL { ?rx med:date ?date }
  OPTIONAL { ?rx med:status ?status }
  OPTIONAL { ?rx med:dispensed ?dispensed }
  OPTIONAL { ?rx med:prescribedBy ?doc . ?doc med:name ?prescriber }
}
ORDER BY DESC(?date)`;
  function medications(patient) { return run(MEDICATIONS, { patient: patient }); }

  /* ------------------------------------------------------- safety checking */

  // Three independent safety rules, each one a graph pattern rather than an
  // if-statement. All three depend on facts the reasoner supplies.
  var INTERACTIONS = `
SELECT DISTINCT ?drugAName ?drugBName
WHERE {
  {{patient}} med:takesMedication ?a , ?b .
  ?a med:interactsWith ?b .
  ?a med:name ?drugAName .
  ?b med:name ?drugBName .
  FILTER(STR(?a) < STR(?b))
}`;

  var CONTRAINDICATIONS = `
SELECT DISTINCT ?drugName ?diseaseName
WHERE {
  {{patient}} med:takesMedication ?drug ;
              med:suffersFrom ?disease .
  ?drug med:contraindicatedFor ?disease ;
        med:name ?drugName .
  ?disease med:name ?diseaseName .
}`;

  var ALLERGY_CLASH = `
SELECT DISTINCT ?drugName ?allergenName
WHERE {
  {{patient}} med:takesMedication ?drug ;
              med:allergicTo ?allergen .
  ?drug med:containsSubstance ?allergen ;
        med:name ?drugName .
  ?allergen med:name ?allergenName .
}`;

  function safetyAlerts(patient) {
    var inter = run(INTERACTIONS, { patient: patient });
    var contra = run(CONTRAINDICATIONS, { patient: patient });
    var allergy = run(ALLERGY_CLASH, { patient: patient });
    var alerts = [];
    inter.rows.forEach(function (r) {
      alerts.push({ kind: 'interaction', level: 'high',
        title: r.drugAName + ' with ' + r.drugBName,
        detail: 'These two medicines are recorded as interacting. The pair was found through ' +
                'med:interactsWith, which is symmetric, so only one direction is stored.' });
    });
    contra.rows.forEach(function (r) {
      alerts.push({ kind: 'contraindication', level: 'high',
        title: r.drugName + ' against ' + r.diseaseName,
        detail: 'This medicine is marked contraindicated for a condition the patient carries. ' +
                'The link runs through med:suffersFrom, which is derived from the condition record.' });
    });
    allergy.rows.forEach(function (r) {
      alerts.push({ kind: 'allergy', level: 'critical',
        title: r.drugName + ' contains ' + r.allergenName,
        detail: 'The patient has a recorded allergy to a substance in this medicine.' });
    });
    return {
      alerts: alerts,
      sparql: '# Three independent checks run against the reasoned graph.\n\n' +
              '# 1. Interacting pairs\n' + fill(INTERACTIONS, { patient: patient }) +
              '\n\n# 2. Contraindications\n' + fill(CONTRAINDICATIONS, { patient: patient }) +
              '\n\n# 3. Allergy clashes\n' + fill(ALLERGY_CLASH, { patient: patient }),
      ms: (inter.ms || 0) + (contra.ms || 0) + (allergy.ms || 0),
      note: 'None of these alerts is coded as a conditional. Each is a graph pattern, so adding a ' +
            'new interaction to the formulary makes every affected patient light up with no code change.'
    };
  }

  /* --------------------------------------------------------------- results */

  var LAB_RESULTS = `
SELECT ?order ?analyte ?value ?unit ?refLow ?refHigh ?out ?date ?status ?result
WHERE {
  ?order a med:LabOrder ;
         med:forPatient {{patient}} ;
         med:analyte ?analyte ;
         med:orderStatus ?status .
  OPTIONAL { ?order med:date ?date }
  OPTIONAL {
    ?order med:hasResult ?result .
    ?result med:value ?value ; med:unit ?unit ;
            med:refLow ?refLow ; med:refHigh ?refHigh ; med:outOfRange ?out .
  }
}
ORDER BY DESC(?date)`;
  function labResults(patient) { return run(LAB_RESULTS, { patient: patient }); }

  var INVOICES = `
SELECT ?invoice ?date ?amount ?paid ?status ?policy ?insurer ?coverage
WHERE {
  {{patient}} med:hasInvoice ?invoice .
  ?invoice med:amount ?amount ; med:paid ?paid .
  OPTIONAL { ?invoice med:date ?date }
  OPTIONAL { ?invoice med:status ?status }
  OPTIONAL {
    ?invoice med:coveredBy ?policy .
    ?policy med:issuedBy ?ins ; med:coveragePercent ?coverage .
    ?ins med:name ?insurer
  }
}
ORDER BY DESC(?date)`;
  function invoices(patient) { return run(INVOICES, { patient: patient }); }

  var APPOINTMENTS = `
SELECT ?appt ?date ?time ?doctorName ?deptName ?status
WHERE {
  ?appt a med:Appointment ; med:forPatient {{patient}} ; med:date ?date .
  OPTIONAL { ?appt med:time ?time }
  OPTIONAL { ?appt med:appointmentWith ?doc . ?doc med:name ?doctorName }
  OPTIONAL { ?appt med:inDepartment ?dept . ?dept med:name ?deptName }
  OPTIONAL { ?appt med:status ?status }
}
ORDER BY ?date`;
  function appointments(patient) { return run(APPOINTMENTS, { patient: patient }); }

  var ALLERGIES = `
SELECT ?allergen ?allergenName
WHERE { {{patient}} med:allergicTo ?allergen . ?allergen med:name ?allergenName }`;
  function allergies(patient) { return run(ALLERGIES, { patient: patient }); }

  /* -------------------------------------------------- derived patient types */

  // The classes a patient belongs to after reasoning. None of these is written
  // into the data; each follows from an OWL class expression.
  var DERIVED_TYPES = `
SELECT DISTINCT ?type
WHERE {
  {{patient}} a ?type .
  FILTER(STRSTARTS(STR(?type), STR(med:)))
}`;
  function derivedTypes(patient) {
    var reasoned = run(DERIVED_TYPES, { patient: patient });
    var stated = run(DERIVED_TYPES, { patient: patient }, App.KG.base);
    var statedSet = {};
    stated.rows.forEach(function (r) { statedSet[r.type] = true; });
    reasoned.rows.forEach(function (r) { r.derived = !statedSet[r.type]; });
    reasoned.note = 'Rows marked derived were produced by the reasoner from a class expression in ' +
                    'the ontology. Nothing in the patient record says them.';
    return reasoned;
  }

  /* ------------------------------------------------------------- caseloads */

  // med:treats is the inverse of med:treatedBy, and med:seenBy comes from a
  // property chain over encounters, so a doctor's caseload is assembled rather
  // than stored on the doctor record.
  var DOCTOR_PANEL = `
SELECT DISTINCT ?patient ?name ?mrn ?age ?sex ?initials
WHERE {
  ?patient med:seenBy {{doctor}} ;
           med:name ?name ; med:mrn ?mrn .
  OPTIONAL { ?patient med:age ?age }
  OPTIONAL { ?patient med:sex ?sex }
  OPTIONAL { ?patient med:photoInitials ?initials }
}
ORDER BY ?name`;
  function doctorPanel(doctor) {
    var r = run(DOCTOR_PANEL, { doctor: doctor });
    r.note = 'med:seenBy is never written down. It comes from an owl:propertyChainAxiom ' +
             'composing med:hasEncounter with med:attendedBy.';
    return r;
  }

  var DOCTOR_UPCOMING = `
SELECT ?appt ?date ?time ?patient ?patientName ?mrn ?deptName ?status
WHERE {
  ?appt a med:Appointment ;
        med:appointmentWith {{doctor}} ;
        med:forPatient ?patient ;
        med:date ?date .
  ?patient med:name ?patientName ; med:mrn ?mrn .
  OPTIONAL { ?appt med:time ?time }
  OPTIONAL { ?appt med:inDepartment ?dept . ?dept med:name ?deptName }
  OPTIONAL { ?appt med:status ?status }
}
ORDER BY ?date`;
  function doctorUpcoming(doctor) { return run(DOCTOR_UPCOMING, { doctor: doctor }); }

  var STAFF_SUMMARY = `
SELECT ?name ?initials ?qualification ?experience ?fee ?dept ?deptName ?role ?staffId
WHERE {
  {{staff}} med:name ?name .
  OPTIONAL { {{staff}} med:photoInitials ?initials }
  OPTIONAL { {{staff}} med:qualification ?qualification }
  OPTIONAL { {{staff}} med:yearsOfExperience ?experience }
  OPTIONAL { {{staff}} med:consultationFee ?fee }
  OPTIONAL { {{staff}} med:staffId ?staffId }
  OPTIONAL { {{staff}} med:worksIn ?dept . ?dept med:name ?deptName }
}`;
  function staffSummary(staff) {
    var r = run(STAFF_SUMMARY, { staff: staff });
    r.row = r.rows[0] || {};
    return r;
  }

  /* ------------------------------------------------------- whole hospital  */

  var ALL_PATIENTS = `
SELECT DISTINCT ?patient ?name ?mrn ?age ?sex ?initials ?doctorName
WHERE {
  ?patient a med:Patient ; med:name ?name ; med:mrn ?mrn .
  OPTIONAL { ?patient med:age ?age }
  OPTIONAL { ?patient med:sex ?sex }
  OPTIONAL { ?patient med:photoInitials ?initials }
  OPTIONAL { ?patient med:primaryPhysician ?doc . ?doc med:name ?doctorName }
}
ORDER BY ?name`;
  function allPatients() {
    var r = run(ALL_PATIENTS);
    r.note = 'med:Patient is not written on every record either. Patients are typed as InPatient ' +
             'or OutPatient and rdfs:subClassOf lifts them into med:Patient.';
    return r;
  }

  var PENDING_LABS = `
SELECT ?order ?analyte ?date ?patient ?patientName ?mrn ?doctorName ?diseaseName
WHERE {
  ?order a med:LabOrder ;
         med:orderStatus "Pending" ;
         med:forPatient ?patient ;
         med:analyte ?analyte .
  ?patient med:name ?patientName ; med:mrn ?mrn .
  OPTIONAL { ?order med:date ?date }
  OPTIONAL { ?order med:orderedBy ?doc . ?doc med:name ?doctorName }
  OPTIONAL { ?order med:testsFor ?d . ?d med:name ?diseaseName }
}
ORDER BY ?date`;
  function pendingLabs() { return run(PENDING_LABS); }

  var UNDISPENSED = `
SELECT ?rx ?drugName ?strength ?dosage ?frequency ?duration ?date
       ?patient ?patientName ?mrn ?prescriber
WHERE {
  ?rx a med:Prescription ;
      med:dispensed false ;
      med:forPatient ?patient ;
      med:prescribes ?drug .
  ?drug med:name ?drugName .
  ?patient med:name ?patientName ; med:mrn ?mrn .
  OPTIONAL { ?drug med:strength ?strength }
  OPTIONAL { ?rx med:dosage ?dosage }
  OPTIONAL { ?rx med:frequency ?frequency }
  OPTIONAL { ?rx med:durationDays ?duration }
  OPTIONAL { ?rx med:date ?date }
  OPTIONAL { ?rx med:prescribedBy ?doc . ?doc med:name ?prescriber }
}
ORDER BY DESC(?date)`;
  function undispensed() { return run(UNDISPENSED); }

  var ABNORMAL_RESULTS = `
SELECT ?result ?analyte ?value ?unit ?refLow ?refHigh ?date ?patientName ?mrn
WHERE {
  ?result a med:AbnormalResult ;
          med:analyte ?analyte ; med:value ?value ; med:unit ?unit ;
          med:refLow ?refLow ; med:refHigh ?refHigh .
  ?order med:hasResult ?result ; med:forPatient ?patient .
  ?patient med:name ?patientName ; med:mrn ?mrn .
  OPTIONAL { ?result med:date ?date }
}
ORDER BY DESC(?date)`;
  function abnormalResults() {
    var r = run(ABNORMAL_RESULTS);
    r.note = 'med:AbnormalResult is a defined class. A result becomes abnormal by satisfying a ' +
             'restriction on med:outOfRange, not by anyone flagging it.';
    return r;
  }

  var DEPARTMENT_LOAD = `
SELECT ?deptName (COUNT(DISTINCT ?patient) AS ?patients)
WHERE {
  ?patient med:visitedDepartment ?dept .
  ?dept med:name ?deptName .
}
GROUP BY ?deptName
ORDER BY DESC(?patients)`;
  function departmentLoad() {
    var r = run(DEPARTMENT_LOAD);
    r.note = 'med:visitedDepartment is another property chain: hasEncounter then inDepartment.';
    return r;
  }

  var CLASS_CENSUS = `
SELECT ?class (COUNT(DISTINCT ?individual) AS ?count)
WHERE {
  ?individual a ?class .
  FILTER(STRSTARTS(STR(?class), STR(med:)))
}
GROUP BY ?class
ORDER BY DESC(?count)`;
  function classCensus(store) { return run(CLASS_CENSUS, null, store); }

  var DISEASE_PREVALENCE = `
SELECT ?disease ?diseaseName ?icd (COUNT(DISTINCT ?patient) AS ?patients)
WHERE {
  ?patient med:suffersFrom ?disease .
  ?disease med:name ?diseaseName .
  OPTIONAL { ?disease med:icd10 ?icd }
}
GROUP BY ?disease ?diseaseName ?icd
ORDER BY DESC(?patients)`;
  function diseasePrevalence() {
    var r = run(DISEASE_PREVALENCE);
    r.note = 'Prevalence counts run over med:suffersFrom, which is derived. Querying the stated ' +
             'data alone would return nothing at all.';
    return r;
  }

  var BED_STATE = `
SELECT ?bed ?bedNumber ?wardName ?occupied ?patientName ?mrn
WHERE {
  ?bed a med:Bed ; med:bedNumber ?bedNumber .
  OPTIONAL { ?bed med:locatedIn ?ward . ?ward med:name ?wardName }
  OPTIONAL { ?bed med:occupied ?occupied }
  OPTIONAL { ?bed med:occupiedBy ?patient . ?patient med:name ?patientName ; med:mrn ?mrn }
}
ORDER BY ?bedNumber`;
  function bedState() {
    var r = run(BED_STATE);
    r.note = 'med:occupiedBy is the owl:inverseOf med:assignedBed. Only the patient side is ' +
             'recorded; the bed learns who is in it from the reasoner.';
    return r;
  }

  var CRITICAL_PATIENTS = `
SELECT DISTINCT ?patient ?name ?mrn ?diseaseName ?severity
WHERE {
  ?patient a med:CriticalPatient ;
           med:name ?name ; med:mrn ?mrn ;
           med:hasCondition ?condition .
  ?condition a med:CriticalCondition ;
             med:ofDisease ?disease ;
             med:severity ?severity .
  ?disease med:name ?diseaseName .
}
ORDER BY ?name`;
  function criticalPatients() {
    var r = run(CRITICAL_PATIENTS);
    r.note = 'med:CriticalPatient is an owl:someValuesFrom class. Run this against the stated ' +
             'data and it returns nothing, because nobody is typed critical anywhere.';
    return r;
  }

  var POLYPHARMACY = `
SELECT ?patient ?name ?mrn (COUNT(DISTINCT ?drug) AS ?drugs)
WHERE {
  ?patient a med:Patient ; med:name ?name ; med:mrn ?mrn ;
           med:takesMedication ?drug .
}
GROUP BY ?patient ?name ?mrn
ORDER BY DESC(?drugs)`;
  function polypharmacy() { return run(POLYPHARMACY); }

  /* ---------------------------------------------------- comorbidity source */

  // Every (patient, disease) pair in the hospital. The comorbidity engine takes
  // this one result set and derives the whole network from it.
  var PATIENT_DISEASE_PAIRS = `
SELECT ?patient ?disease ?diseaseName ?icd ?category
WHERE {
  ?patient med:suffersFrom ?disease .
  ?disease med:name ?diseaseName .
  OPTIONAL { ?disease med:icd10 ?icd }
  OPTIONAL {
    ?disease a ?category .
    FILTER(?category IN (med:CardiovascularDisease, med:MetabolicDisease,
                         med:RespiratoryDisease, med:NeurologicalDisease,
                         med:RenalDisease, med:MentalHealthCondition,
                         med:MusculoskeletalDisease, med:Neoplasm,
                         med:InfectiousDisease, med:HaematologicalDisease))
  }
}`;
  function patientDiseasePairs() {
    var r = run(PATIENT_DISEASE_PAIRS);
    r.note = 'This single query is the entire input to the comorbidity network. Because ' +
             'med:suffersFrom is derived by a property chain, the network is computed over ' +
             'inferred facts, not stored ones.';
    return r;
  }

  return {
    run: run, fill: fill,
    patientSummary: patientSummary, conditions: conditions, encounters: encounters,
    vitals: vitals, medications: medications, safetyAlerts: safetyAlerts,
    labResults: labResults, invoices: invoices, appointments: appointments,
    allergies: allergies, derivedTypes: derivedTypes,
    doctorPanel: doctorPanel, doctorUpcoming: doctorUpcoming, staffSummary: staffSummary,
    allPatients: allPatients, pendingLabs: pendingLabs, undispensed: undispensed,
    abnormalResults: abnormalResults, departmentLoad: departmentLoad,
    classCensus: classCensus, diseasePrevalence: diseasePrevalence, bedState: bedState,
    criticalPatients: criticalPatients, polypharmacy: polypharmacy,
    patientDiseasePairs: patientDiseasePairs,
    SOURCE: {
      PATIENT_SUMMARY: PATIENT_SUMMARY, CONDITIONS: CONDITIONS, ENCOUNTERS: ENCOUNTERS,
      MEDICATIONS: MEDICATIONS, INTERACTIONS: INTERACTIONS, CLASS_CENSUS: CLASS_CENSUS,
      DISEASE_PREVALENCE: DISEASE_PREVALENCE, PATIENT_DISEASE_PAIRS: PATIENT_DISEASE_PAIRS
    }
  };
})();
