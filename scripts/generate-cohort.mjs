/* =============================================================================
   generate-cohort.mjs

   Writes assets/data-cohort.js.

   The comorbidity network is the point of this file. Rather than hand-writing
   which diseases co-occur, patients are drawn from clinically plausible
   clusters, so co-occurrence emerges from the population and the network the
   application draws is a genuine measurement of the data rather than a
   decoration. Run with:  node scripts/generate-cohort.mjs
   ========================================================================== */
import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, '..');

/* --- deterministic PRNG so every regeneration gives the same hospital ----- */
let seed = 20260831;
function rnd() {
  seed = (seed * 1664525 + 1013904223) % 4294967296;
  return seed / 4294967296;
}
const pick = (a) => a[Math.floor(rnd() * a.length)];
const int = (lo, hi) => lo + Math.floor(rnd() * (hi - lo + 1));
const chance = (p) => rnd() < p;
function sample(arr, n) {
  const copy = arr.slice(), out = [];
  while (out.length < n && copy.length) out.push(copy.splice(Math.floor(rnd() * copy.length), 1)[0]);
  return out;
}

/* --- clinical reference tables ------------------------------------------- */

// Clusters of conditions that genuinely travel together. `anchor` is the entry
// condition; `partners` carry the probability of also being present.
const CLUSTERS = [
  {
    id: 'cardiometabolic',
    anchor: 'TypeIIDiabetes',
    partners: [
      ['Hypertension', 0.72], ['Dyslipidemia', 0.58], ['Obesity', 0.46],
      ['ChronicKidneyDisease', 0.30], ['CoronaryArteryDisease', 0.28],
      ['DiabeticRetinopathy', 0.24], ['SleepApnea', 0.18], ['Anemia', 0.16]
    ]
  },
  {
    id: 'cardiac',
    anchor: 'CoronaryArteryDisease',
    partners: [
      ['Hypertension', 0.74], ['Dyslipidemia', 0.66], ['MyocardialInfarction', 0.34],
      ['HeartFailure', 0.30], ['AtrialFibrillation', 0.24], ['TypeIIDiabetes', 0.42],
      ['ChronicKidneyDisease', 0.20]
    ]
  },
  {
    id: 'cerebrovascular',
    anchor: 'Stroke',
    partners: [
      ['Hypertension', 0.78], ['AtrialFibrillation', 0.38], ['Dyslipidemia', 0.44],
      ['TypeIIDiabetes', 0.36], ['Dementia', 0.22], ['Depression', 0.26]
    ]
  },
  {
    id: 'respiratory',
    anchor: 'COPD',
    partners: [
      ['Asthma', 0.24], ['Pneumonia', 0.34], ['HeartFailure', 0.22],
      ['SleepApnea', 0.26], ['Anemia', 0.18], ['Hypertension', 0.40]
    ]
  },
  {
    id: 'asthma',
    anchor: 'Asthma',
    partners: [['Obesity', 0.24], ['AnxietyDisorder', 0.22], ['Pneumonia', 0.20], ['SleepApnea', 0.18]]
  },
  {
    id: 'renal',
    anchor: 'ChronicKidneyDisease',
    partners: [
      ['Hypertension', 0.82], ['TypeIIDiabetes', 0.64], ['Anemia', 0.48],
      ['HeartFailure', 0.26], ['Osteoporosis', 0.16]
    ]
  },
  {
    id: 'mental',
    anchor: 'Depression',
    partners: [['AnxietyDisorder', 0.56], ['Migraine', 0.22], ['Obesity', 0.20], ['Hypothyroidism', 0.18]]
  },
  {
    id: 'musculoskeletal',
    anchor: 'Osteoarthritis',
    partners: [['Obesity', 0.44], ['Osteoporosis', 0.28], ['Hypertension', 0.38], ['RheumatoidArthritis', 0.14]]
  },
  {
    id: 'endocrine',
    anchor: 'Hypothyroidism',
    partners: [['Obesity', 0.32], ['Dyslipidemia', 0.30], ['Depression', 0.22], ['Anemia', 0.20]]
  },
  {
    id: 'neuro',
    anchor: 'Epilepsy',
    partners: [['Depression', 0.28], ['AnxietyDisorder', 0.22], ['Migraine', 0.20]]
  },
  {
    id: 'oncology',
    anchor: 'BreastCancer',
    partners: [['Anemia', 0.40], ['Depression', 0.30], ['Hypothyroidism', 0.16]]
  },
  {
    id: 'oncology-lung',
    anchor: 'LungCancer',
    partners: [['COPD', 0.48], ['Anemia', 0.38], ['Pneumonia', 0.26]]
  },
  {
    id: 'infective',
    anchor: 'UrinaryTractInfection',
    partners: [['TypeIIDiabetes', 0.36], ['ChronicKidneyDisease', 0.22]]
  },
  {
    id: 'acute',
    anchor: 'Dengue',
    partners: [['Anemia', 0.22]]
  },
  {
    id: 'tb',
    anchor: 'Tuberculosis',
    partners: [['Anemia', 0.42], ['TypeIIDiabetes', 0.30], ['COPD', 0.18]]
  },
  {
    id: 'migraine',
    anchor: 'Migraine',
    partners: [['AnxietyDisorder', 0.28], ['Depression', 0.24]]
  }
];

const CHRONIC = new Set([
  'TypeIIDiabetes', 'Hypertension', 'Dyslipidemia', 'Obesity', 'Hypothyroidism',
  'CoronaryArteryDisease', 'HeartFailure', 'AtrialFibrillation', 'ChronicKidneyDisease',
  'DiabeticRetinopathy', 'Asthma', 'COPD', 'SleepApnea', 'Epilepsy', 'Dementia',
  'Depression', 'Osteoarthritis', 'Osteoporosis', 'RheumatoidArthritis'
]);

const ACUTE = new Set(['MyocardialInfarction', 'Stroke', 'Pneumonia', 'Dengue',
  'UrinaryTractInfection', 'Tuberculosis', 'Migraine', 'Anemia']);

const CRITICAL = new Set(['MyocardialInfarction', 'Stroke', 'HeartFailure',
  'LungCancer', 'BreastCancer', 'Tuberculosis']);

// Which department and consultant looks after which condition.
const CARE = {
  TypeIIDiabetes:        ['Dept_Endocrinology', ['Doc_Nithya']],
  Hypothyroidism:        ['Dept_Endocrinology', ['Doc_Nithya']],
  Obesity:               ['Dept_Endocrinology', ['Doc_Nithya', 'Doc_Suresh']],
  Dyslipidemia:          ['Dept_GeneralMedicine', ['Doc_Suresh', 'Doc_Joseph']],
  Hypertension:          ['Dept_GeneralMedicine', ['Doc_Suresh', 'Doc_Joseph', 'Doc_Ramesh']],
  CoronaryArteryDisease: ['Dept_Cardiology', ['Doc_Ramesh', 'Doc_Farida']],
  MyocardialInfarction:  ['Dept_Cardiology', ['Doc_Ramesh', 'Doc_Farida']],
  HeartFailure:          ['Dept_Cardiology', ['Doc_Ramesh', 'Doc_Farida']],
  AtrialFibrillation:    ['Dept_Cardiology', ['Doc_Farida', 'Doc_Ramesh']],
  Stroke:                ['Dept_Neurology', ['Doc_Priya']],
  Epilepsy:              ['Dept_Neurology', ['Doc_Priya']],
  Migraine:              ['Dept_Neurology', ['Doc_Priya', 'Doc_Joseph']],
  Dementia:              ['Dept_Neurology', ['Doc_Priya', 'Doc_Leela']],
  ChronicKidneyDisease:  ['Dept_Nephrology', ['Doc_Vandana']],
  DiabeticRetinopathy:   ['Dept_Endocrinology', ['Doc_Nithya']],
  Asthma:                ['Dept_Pulmonology', ['Doc_Sameer']],
  COPD:                  ['Dept_Pulmonology', ['Doc_Sameer']],
  SleepApnea:            ['Dept_Pulmonology', ['Doc_Sameer']],
  Pneumonia:             ['Dept_Pulmonology', ['Doc_Sameer', 'Doc_Joseph']],
  Tuberculosis:          ['Dept_Pulmonology', ['Doc_Sameer']],
  Depression:            ['Dept_Psychiatry', ['Doc_Leela']],
  AnxietyDisorder:       ['Dept_Psychiatry', ['Doc_Leela']],
  BreastCancer:          ['Dept_Oncology', ['Doc_Anand']],
  LungCancer:            ['Dept_Oncology', ['Doc_Anand']],
  Anemia:                ['Dept_GeneralMedicine', ['Doc_Joseph', 'Doc_Suresh']],
  Osteoarthritis:        ['Dept_Orthopedics', ['Doc_Vikram']],
  Osteoporosis:          ['Dept_Orthopedics', ['Doc_Vikram']],
  RheumatoidArthritis:   ['Dept_Orthopedics', ['Doc_Vikram']],
  Dengue:                ['Dept_GeneralMedicine', ['Doc_Joseph', 'Doc_Karthik']],
  UrinaryTractInfection: ['Dept_GeneralMedicine', ['Doc_Joseph', 'Doc_Suresh']]
};

// Medications used first line for each condition.
const THERAPY = {
  TypeIIDiabetes:        ['Med_Metformin', 'Med_Glimepiride', 'Med_Insulin'],
  Hypertension:          ['Med_Amlodipine', 'Med_Telmisartan', 'Med_Metoprolol'],
  Dyslipidemia:          ['Med_Atorvastatin'],
  CoronaryArteryDisease: ['Med_Aspirin', 'Med_Atorvastatin', 'Med_Clopidogrel'],
  MyocardialInfarction:  ['Med_Aspirin', 'Med_Clopidogrel'],
  HeartFailure:          ['Med_Furosemide', 'Med_Metoprolol'],
  AtrialFibrillation:    ['Med_Warfarin', 'Med_Metoprolol'],
  Stroke:                ['Med_Clopidogrel', 'Med_Warfarin'],
  ChronicKidneyDisease:  ['Med_Telmisartan'],
  Asthma:                ['Med_Salbutamol'],
  COPD:                  ['Med_Tiotropium', 'Med_Salbutamol'],
  Pneumonia:             ['Med_Amoxicillin', 'Med_Azithromycin'],
  Epilepsy:              ['Med_Levetiracetam'],
  Depression:            ['Med_Sertraline'],
  AnxietyDisorder:       ['Med_Sertraline'],
  Hypothyroidism:        ['Med_Levothyroxine'],
  Osteoarthritis:        ['Med_Ibuprofen'],
  Osteoporosis:          ['Med_Alendronate'],
  RheumatoidArthritis:   ['Med_Methotrexate'],
  BreastCancer:          ['Med_Tamoxifen'],
  Anemia:                ['Med_IronFolate'],
  Dengue:                ['Med_Paracetamol'],
  Migraine:              ['Med_Paracetamol', 'Med_Ibuprofen'],
  UrinaryTractInfection: ['Med_Nitrofurantoin', 'Med_Amoxicillin']
};

// Lab panels ordered when a condition is being followed up.
const PANELS = {
  TypeIIDiabetes:       [['HbA1c', '%', 4.0, 5.6, 5.4, 11.2], ['Fasting glucose', 'mg/dL', 70, 100, 82, 260]],
  ChronicKidneyDisease: [['Creatinine', 'mg/dL', 0.6, 1.2, 0.7, 6.4], ['eGFR', 'mL/min', 90, 120, 14, 96]],
  Dyslipidemia:         [['LDL cholesterol', 'mg/dL', 0, 100, 62, 212], ['Triglycerides', 'mg/dL', 0, 150, 88, 420]],
  Hypothyroidism:       [['TSH', 'mIU/L', 0.4, 4.0, 0.3, 14.8]],
  Anemia:               [['Haemoglobin', 'g/dL', 12.0, 15.5, 6.4, 14.2]],
  CoronaryArteryDisease:[['Troponin I', 'ng/mL', 0, 0.04, 0.01, 6.2]],
  MyocardialInfarction: [['Troponin I', 'ng/mL', 0, 0.04, 0.9, 14.5]],
  HeartFailure:         [['NT-proBNP', 'pg/mL', 0, 125, 90, 3400]],
  Dengue:               [['Platelet count', 'x10^3/uL', 150, 450, 24, 210]],
  Tuberculosis:         [['ESR', 'mm/hr', 0, 20, 12, 96]],
  UrinaryTractInfection:[['Urine WBC', '/hpf', 0, 5, 2, 60]],
  AtrialFibrillation:   [['INR', 'ratio', 0.9, 1.2, 1.0, 4.6]],
  Stroke:               [['INR', 'ratio', 0.9, 1.2, 1.0, 3.8]],
  BreastCancer:         [['CA 15-3', 'U/mL', 0, 30, 12, 128]],
  LungCancer:           [['CEA', 'ng/mL', 0, 3, 1.4, 44]]
};

/* --- people --------------------------------------------------------------- */
const GIVEN_M = ['Arjun', 'Gopal', 'Ibrahim', 'Manoj', 'Ravi', 'Sanjay', 'Vimal', 'Prakash',
  'Aravind', 'Naveen', 'Dinesh', 'Hari', 'Sathish', 'Rajesh', 'Anil', 'Bala', 'Yusuf',
  'Kiran', 'Murugan', 'Selvam', 'Ashok', 'Vinod', 'Ganesh', 'Tarun', 'Imran'];
const GIVEN_F = ['Lakshmi', 'Divya', 'Rekha', 'Anitha', 'Fatima', 'Shalini', 'Kavya', 'Nandini',
  'Padma', 'Sangeetha', 'Uma', 'Radha', 'Vidya', 'Janaki', 'Sujatha', 'Nirmala', 'Aisha',
  'Bhavani', 'Chitra', 'Deepa', 'Vasanthi', 'Malathi', 'Roopa', 'Sneha'];
const SURNAMES = ['Mehta', 'Sundaram', 'Nambiar', 'Iyer', 'Reddy', 'Pillai', 'Rao', 'Krishnan',
  'Menon', 'Shetty', 'Begum', 'Ali', 'Chandran', 'Gupta', 'Verma', 'Thomas', 'Das',
  'Narayanan', 'Balan', 'Raghavan', 'Kumar', 'Nair', 'Prabhu', 'Sharma', 'Joseph'];
const BLOOD = ['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'];
const AREAS = ['Sholinganallur', 'Perungudi', 'Velachery', 'Adyar', 'Thoraipakkam',
  'Medavakkam', 'Pallikaranai', 'Tambaram', 'Chromepet', 'Guindy', 'Kelambakkam', 'Navalur'];
const STREETS = ['Rajiv Gandhi Salai', 'Anna Salai', 'Velachery Main Road', 'ECR', 'GST Road',
  'Kamarajar Street', 'Gandhi Nagar 2nd Cross', 'Bharathi Street'];
const ALLERGENS = ['Allergen_Penicillin', 'Allergen_Sulfa', 'Allergen_Latex', 'Allergen_Iodine'];
const INSURERS = ['Ins_StarHealth', 'Ins_NewIndia', 'Ins_HDFCErgo', 'Ins_CGHS'];

// The five accounts already defined in data-reference.js must exist here, with
// these exact identifiers, or nobody can log in.
const FIXED = [
  { id: 'Pat_ARJ001', mrn: 'MRN-ARJ001', given: 'Arjun', family: 'Mehta', sex: 'Male', birth: '1962-03-14', cluster: 'cardiac' },
  { id: 'Pat_LAK002', mrn: 'MRN-LAK002', given: 'Lakshmi', family: 'Sundaram', sex: 'Female', birth: '1974-11-02', cluster: 'cerebrovascular' },
  { id: 'Pat_DIV003', mrn: 'MRN-DIV003', given: 'Divya', family: 'Nambiar', sex: 'Female', birth: '1996-07-23', cluster: 'asthma' },
  { id: 'Pat_REK005', mrn: 'MRN-REK005', given: 'Rekha', family: 'Iyer', sex: 'Female', birth: '1979-08-08', cluster: 'oncology' },
  { id: 'Pat_GOP006', mrn: 'MRN-GOP006', given: 'Gopal', family: 'Reddy', sex: 'Male', birth: '1951-02-19', cluster: 'cardiometabolic' }
];

const TODAY = new Date('2026-08-31');
const iso = (d) => d.toISOString().slice(0, 10);
function dateBack(days) { const d = new Date(TODAY); d.setDate(d.getDate() - days); return iso(d); }
function dateForward(days) { const d = new Date(TODAY); d.setDate(d.getDate() + days); return iso(d); }
function ageFrom(birth) {
  const b = new Date(birth);
  let a = TODAY.getFullYear() - b.getFullYear();
  const m = TODAY.getMonth() - b.getMonth();
  if (m < 0 || (m === 0 && TODAY.getDate() < b.getDate())) a--;
  return a;
}

/* --- build the cohort ----------------------------------------------------- */
const patients = [];
const usedNames = new Set();

function buildConditions(clusterId, age) {
  const cluster = CLUSTERS.find((c) => c.id === clusterId) || pick(CLUSTERS);
  const set = new Set([cluster.anchor]);
  for (const [name, p] of cluster.partners) {
    // Older patients accumulate more. Under 35 the odds drop sharply.
    const ageFactor = age >= 60 ? 1.25 : age >= 45 ? 1.08 : age >= 30 ? 0.72 : 0.34;
    if (chance(Math.min(0.92, p * ageFactor))) set.add(name);
  }
  // Occasionally an unrelated acute illness on top.
  if (chance(0.22)) set.add(pick(['Dengue', 'UrinaryTractInfection', 'Pneumonia', 'Migraine']));
  // A quarter of patients also carry something from a second cluster. These are
  // the cross-links that stop the network collapsing into isolated islands.
  if (chance(0.26)) {
    const other = pick(CLUSTERS.filter((c) => c.id !== cluster.id));
    set.add(other.anchor);
    if (chance(0.45)) set.add(pick(other.partners)[0]);
  }
  return Array.from(set);
}

for (let i = 0; i < 120; i++) {
  const fixed = FIXED[i];
  let given, family, sex, birth, clusterId;

  if (fixed) {
    given = fixed.given; family = fixed.family; sex = fixed.sex;
    birth = fixed.birth; clusterId = fixed.cluster;
  } else {
    sex = chance(0.5) ? 'Male' : 'Female';
    let attempts = 0;
    do {
      given = sex === 'Male' ? pick(GIVEN_M) : pick(GIVEN_F);
      family = pick(SURNAMES);
      attempts++;
    } while (usedNames.has(given + family) && attempts < 40);
    // Weighted towards the ages that actually fill a hospital.
    const age = chance(0.55) ? int(48, 82) : chance(0.6) ? int(28, 47) : int(6, 27);
    const by = TODAY.getFullYear() - age;
    birth = by + '-' + String(int(1, 12)).padStart(2, '0') + '-' + String(int(1, 28)).padStart(2, '0');
    clusterId = pick(CLUSTERS).id;
  }
  usedNames.add(given + family);

  const age = ageFrom(birth);
  // Children get a paediatric-appropriate cluster.
  if (age < 16) clusterId = pick(['asthma', 'acute', 'migraine']);

  const id = fixed ? fixed.id
    : 'Pat_' + given.slice(0, 3).toUpperCase() + String(100 + i);
  const mrn = fixed ? fixed.mrn : 'MRN-' + given.slice(0, 3).toUpperCase() + String(100 + i);

  patients.push({
    id, mrn, given, family, name: given + ' ' + family, sex, birth, age,
    initials: (given[0] + family[0]).toUpperCase(),
    blood: pick(BLOOD),
    phone: '+91 9' + int(1000, 9999) + ' ' + int(100000, 999999),
    email: given.toLowerCase() + '.' + family.toLowerCase() + '@example.in',
    address: int(1, 90) + ' ' + pick(STREETS) + ', ' + pick(AREAS) + ', Chennai',
    conditions: buildConditions(clusterId, age),
    allergies: chance(0.22) ? sample(ALLERGENS, chance(0.15) ? 2 : 1) : [],
    insurer: chance(0.72) ? pick(INSURERS) : null,
    cluster: clusterId
  });
}

/* --- encounters, conditions, prescriptions, labs, invoices ---------------- */
const lines = [];
const P = (s) => lines.push(s);

function esc(s) { return String(s).replace(/"/g, '\\"'); }
function lit(s) { return '"' + esc(s) + '"'; }
function date(s) { return '"' + s + '"^^xsd:date'; }

let encSeq = 0, condSeq = 0, rxSeq = 0, labSeq = 0, invSeq = 0, apptSeq = 0, noteSeq = 0, vitSeq = 0;

const NOTE_OPENERS = [
  'Reviewed in clinic today.', 'Patient reports steady improvement since last visit.',
  'Attends for scheduled follow up.', 'Seen for worsening symptoms over the past week.',
  'Routine review, no new complaints.', 'Presents with a two day history of symptoms.',
  'Post discharge review.', 'Referred from general medicine for specialist opinion.'
];
const NOTE_PLANS = [
  'Continue current therapy, review in three months.',
  'Dose adjusted, repeat bloods before next visit.',
  'Advised on diet, salt restriction and daily walking.',
  'Counselled on medication adherence. Red flag symptoms explained.',
  'Investigations ordered, will call with results.',
  'Referral raised to the relevant specialty.',
  'Reassured. No change to treatment at this stage.'
];

const ENCOUNTER_TYPES = [
  ['Consultation', 0.42], ['FollowUp', 0.34], ['EmergencyVisit', 0.08],
  ['Admission', 0.08], ['DayCareVisit', 0.05], ['Screening', 0.03]
];
function pickEncounterType(isFirst) {
  if (isFirst) return chance(0.25) ? 'EmergencyVisit' : 'Consultation';
  let r = rnd(), acc = 0;
  for (const [t, p] of ENCOUNTER_TYPES) { acc += p; if (r <= acc) return t; }
  return 'FollowUp';
}

P('#################################################################');
P('#  Patients');
P('#################################################################');
P('');

const allEncounters = [];

for (const pat of patients) {
  const chronicConds = pat.conditions.filter((c) => CHRONIC.has(c));
  const isInpatient = chance(0.18) && pat.conditions.some((c) => CRITICAL.has(c) || CHRONIC.has(c));

  P(`res:${pat.id} a med:${isInpatient ? 'InPatient' : 'OutPatient'} ;`);
  P(`    med:name ${lit(pat.name)} ; med:mrn ${lit(pat.mrn)} ; med:photoInitials ${lit(pat.initials)} ;`);
  P(`    med:sex ${lit(pat.sex)} ; med:dateOfBirth ${date(pat.birth)} ; med:age ${pat.age} ;`);
  P(`    med:bloodGroup ${lit(pat.blood)} ; med:phone ${lit(pat.phone)} ; med:email ${lit(pat.email)} ;`);
  P(`    med:address ${lit(pat.address)} ;`);

  // Primary physician follows from the dominant condition.
  const anchor = pat.conditions[0];
  const care = CARE[anchor] || CARE.Hypertension;
  const primary = pick(care[1]);
  P(`    med:primaryPhysician res:${primary} ;`);
  if (pat.allergies.length) {
    P(`    med:allergicTo ${pat.allergies.map((a) => 'res:' + a).join(' , ')} ;`);
  }

  const condIds = [];
  pat.conditions.forEach((cond) => {
    const cid = 'Cond_' + (++condSeq);
    condIds.push([cid, cond]);
  });
  P(`    med:hasCondition ${condIds.map((c) => 'res:' + c[0]).join(' , ')} .`);
  P('');

  // ---- condition records
  condIds.forEach(([cid, cond]) => {
    const chronic = CHRONIC.has(cond);
    const onsetDays = chronic ? int(220, 3600) : int(3, 700);
    const resolved = !chronic && chance(0.62);
    const critical = CRITICAL.has(cond) && chance(0.5);
    const careRow = CARE[cond] || CARE.Hypertension;
    P(`res:${cid} a med:Condition${critical ? ' , med:CriticalCondition' : ''} ;`);
    P(`    med:ofDisease res:${cond} ; med:onsetDate ${date(dateBack(onsetDays))} ;`);
    P(`    med:severity ${lit(critical ? 'Severe' : chronic ? pick(['Moderate', 'Mild', 'Moderate']) : pick(['Mild', 'Moderate']))} ;`);
    P(`    med:clinicalStatus ${lit(resolved ? 'Resolved' : 'Active')} ;`);
    if (resolved) P(`    med:resolvedDate ${date(dateBack(Math.max(1, onsetDays - int(20, 180))))} ;`);
    P(`    med:diagnosedBy res:${pick(careRow[1])} .`);
    P('');
  });

  // ---- encounters over time
  const visitCount = Math.min(9, 1 + chronicConds.length + int(0, 3));
  const spacing = Math.floor(1500 / Math.max(1, visitCount));
  const encs = [];
  for (let v = 0; v < visitCount; v++) {
    // v runs oldest to newest, so the last visit lands within the past few weeks
    // rather than a year back. Getting this wrong empties every live worklist.
    const daysAgo = Math.max(1, spacing * (visitCount - 1 - v) + int(-18, 18));
    const focus = pick(pat.conditions);
    const careRow = CARE[focus] || CARE.Hypertension;
    const type = pickEncounterType(v === 0);
    const dept = type === 'EmergencyVisit' ? 'Dept_Emergency' : careRow[0];
    const doc = type === 'EmergencyVisit' ? 'Doc_Karthik' : pick(careRow[1]);
    encs.push({ id: 'Enc_' + (++encSeq), daysAgo, focus, type, dept, doc });
  }
  encs.sort((a, b) => b.daysAgo - a.daysAgo);
  allEncounters.push(...encs.map((e) => ({ ...e, patient: pat.id })));

  P(`res:${pat.id} med:hasEncounter ${encs.map((e) => 'res:' + e.id).join(' , ')} .`);
  P('');

  encs.forEach((enc, idx) => {
    const vitals = 'Vit_' + (++vitSeq);
    const note = 'Note_' + (++noteSeq);
    const admitted = enc.type === 'Admission';
    P(`res:${enc.id} a med:${enc.type} ;`);
    P(`    med:encounterOf res:${pat.id} ; med:date ${date(dateBack(enc.daysAgo))} ;`);
    P(`    med:time ${lit(String(int(8, 18)).padStart(2, '0') + ':' + pick(['00', '15', '30', '45']))} ;`);
    P(`    med:attendedBy res:${enc.doc} ; med:inDepartment res:${enc.dept} ;`);
    P(`    med:reason ${lit(enc.type === 'EmergencyVisit' ? 'Acute presentation' : idx === 0 ? 'First presentation' : 'Review of ' + enc.focus.replace(/([A-Z])/g, ' $1').trim().toLowerCase())} ;`);
    P(`    med:outcome ${lit(admitted ? 'Admitted to ward' : pick(['Discharged with advice', 'Follow up scheduled', 'Treatment continued', 'Referred for tests']))} ;`);
    if (admitted) P(`    med:lengthOfStay ${int(2, 11)} ;`);
    P(`    med:recordedCondition res:${condIds.find((c) => c[1] === enc.focus)[0]} ;`);
    P(`    med:hasVitals res:${vitals} ; med:hasNote res:${note} .`);
    P('');

    // vitals, nudged by the conditions the patient carries
    const hyper = pat.conditions.includes('Hypertension');
    const obese = pat.conditions.includes('Obesity');
    const resp = pat.conditions.includes('COPD') || pat.conditions.includes('Asthma');
    P(`res:${vitals} a med:VitalSigns ;`);
    P(`    med:systolic ${hyper ? int(138, 178) : int(108, 134)} ; med:diastolic ${hyper ? int(86, 108) : int(66, 84)} ;`);
    P(`    med:heartRate ${int(62, 104)} ; med:temperature ${(97.2 + rnd() * 3.4).toFixed(1)} ;`);
    P(`    med:spo2 ${resp ? int(88, 96) : int(96, 100)} ;`);
    P(`    med:weightKg ${obese ? (78 + rnd() * 32).toFixed(1) : (48 + rnd() * 28).toFixed(1)} ;`);
    P(`    med:bmi ${obese ? (30.5 + rnd() * 8).toFixed(1) : (19 + rnd() * 9).toFixed(1)} .`);
    P('');

    P(`res:${note} a med:ClinicalNote ;`);
    P(`    med:authorName ${lit('Dr. ' + enc.doc.replace('Doc_', ''))} ;`);
    P(`    med:date ${date(dateBack(enc.daysAgo))} ;`);
    P(`    med:noteText ${lit(pick(NOTE_OPENERS) + ' ' + pick(NOTE_PLANS))} .`);
    P('');

    // prescriptions issued at this encounter
    const therapies = THERAPY[enc.focus] || [];
    if (therapies.length && chance(0.78)) {
      const drugs = sample(therapies, chance(0.35) ? Math.min(2, therapies.length) : 1);
      const rxIds = [];
      drugs.forEach((drug) => {
        const rx = 'Rx_' + (++rxSeq);
        rxIds.push(rx);
        const chronicRx = CHRONIC.has(enc.focus);
        P(`res:${rx} a med:Prescription ;`);
        P(`    med:prescribes res:${drug} ; med:prescribedBy res:${enc.doc} ;`);
        P(`    med:forPatient res:${pat.id} ; med:date ${date(dateBack(enc.daysAgo))} ;`);
        P(`    med:dosage ${lit(pick(['1 tablet', '1 tablet', '2 tablets', '1 dose']))} ;`);
        P(`    med:frequency ${lit(pick(['Once daily', 'Twice daily', 'Once daily at night', 'Three times daily', 'As required']))} ;`);
        P(`    med:durationDays ${chronicRx ? pick([30, 60, 90, 90]) : pick([5, 7, 10, 14])} ;`);
        P(`    med:dispensed ${enc.daysAgo > 45 ? 'true' : chance(0.45) ? 'true' : 'false'} ;`);
        P(`    med:status ${lit(chronicRx && enc.daysAgo < 200 ? 'Active' : 'Completed')} .`);
        P('');
      });
      P(`res:${enc.id} med:issuedPrescription ${rxIds.map((r) => 'res:' + r).join(' , ')} .`);
      P(`res:${pat.id} med:hasPrescription ${rxIds.map((r) => 'res:' + r).join(' , ')} .`);
      P('');
    }

    // lab orders
    const panel = PANELS[enc.focus];
    if (panel && chance(0.66)) {
      const orderIds = [];
      panel.forEach((row) => {
        const [analyte, unit, lo, hi, minV, maxV] = row;
        const order = 'Lab_' + (++labSeq);
        const result = 'Res_' + labSeq;
        orderIds.push(order);
        // Recent orders are sometimes still awaiting a result.
        const pending = enc.daysAgo < 40 && chance(0.5);
        P(`res:${order} a med:LabOrder ;`);
        P(`    med:analyte ${lit(analyte)} ; med:forPatient res:${pat.id} ;`);
        P(`    med:date ${date(dateBack(enc.daysAgo))} ; med:orderedBy res:${enc.doc} ;`);
        P(`    med:testsFor res:${enc.focus} ;`);
        P(`    med:orderStatus ${lit(pending ? 'Pending' : 'Resulted')}${pending ? ' .' : ' ;'}`);
        if (!pending) {
          const value = +(minV + rnd() * (maxV - minV)).toFixed(2);
          const out = value < lo || value > hi;
          P(`    med:hasResult res:${result} .`);
          P('');
          // Deliberately NOT typed med:AbnormalResult. The reasoner derives that
          // from med:outOfRange via an owl:hasValue restriction.
          P(`res:${result} a med:LabResult ;`);
          P(`    med:analyte ${lit(analyte)} ; med:value ${value} ; med:unit ${lit(unit)} ;`);
          P(`    med:refLow ${lo} ; med:refHigh ${hi} ; med:outOfRange ${out} ;`);
          P(`    med:date ${date(dateBack(Math.max(1, enc.daysAgo - 1)))} ;`);
          P(`    med:performedBy res:Tech_Mohan .`);
        }
        P('');
      });
      P(`res:${enc.id} med:orderedTest ${orderIds.map((o) => 'res:' + o).join(' , ')} .`);
      P('');
    }

    // invoice
    if (chance(0.8)) {
      const inv = 'Inv_' + (++invSeq);
      const amount = enc.type === 'Admission' ? int(38000, 340000)
        : enc.type === 'EmergencyVisit' ? int(4200, 32000) : int(650, 6400);
      const paid = enc.daysAgo > 60 ? chance(0.88) : chance(0.42);
      P(`res:${inv} a med:Invoice ;`);
      P(`    med:forPatient res:${pat.id} ; med:date ${date(dateBack(enc.daysAgo))} ;`);
      P(`    med:amount ${amount} ; med:paid ${paid} ;`);
      P(`    med:status ${lit(paid ? 'Settled' : pat.insurer ? 'Insurance claim pending' : 'Awaiting payment')} .`);
      if (pat.insurer) P(`res:${inv} med:coveredBy res:Policy_${pat.id.replace('Pat_', '')} .`);
      P(`res:${pat.id} med:hasInvoice res:${inv} .`);
      P('');
    }
  });

  // insurance policy
  if (pat.insurer) {
    const pol = 'Policy_' + pat.id.replace('Pat_', '');
    P(`res:${pol} a med:InsurancePolicy ;`);
    P(`    med:policyNumber ${lit(pat.insurer.replace('Ins_', '').slice(0, 2).toUpperCase() + '-' + int(100000, 999999))} ;`);
    P(`    med:issuedBy res:${pat.insurer} ; med:coveragePercent ${pick([60, 70, 75, 80, 85, 90])} ;`);
    P(`    med:amount ${pick([200000, 300000, 500000, 750000, 1000000])} .`);
    P(`res:${pat.id} med:hasPolicy res:${pol} .`);
    P('');
  }

  // upcoming appointment
  if (chance(0.55)) {
    const appt = 'Appt_' + (++apptSeq);
    const careRow = CARE[pat.conditions[0]] || CARE.Hypertension;
    P(`res:${appt} a med:Appointment ;`);
    P(`    med:forPatient res:${pat.id} ; med:appointmentWith res:${pick(careRow[1])} ;`);
    P(`    med:date ${date(dateForward(int(1, 45)))} ;`);
    P(`    med:time ${lit(String(int(9, 17)).padStart(2, '0') + ':' + pick(['00', '20', '40']))} ;`);
    P(`    med:inDepartment res:${careRow[0]} ;`);
    P(`    med:status ${lit('Scheduled')} .`);
    P(`res:${pat.id} med:hasAppointment res:${appt} .`);
    P('');
  }

  // bed for inpatients
  if (isInpatient) {
    P(`res:${pat.id} med:assignedBed res:Bed_${int(1, 16)} .`);
    P('');
  }
}

/* --- report --------------------------------------------------------------- */
const body = lines.join('\n');
const header = `/* =============================================================================
   data-cohort.js — the patient population.

   GENERATED FILE. Produced by scripts/generate-cohort.mjs, which draws each
   patient from a clinically plausible comorbidity cluster. Because the
   co-occurrence is generated rather than hand-listed, the comorbidity network
   the application draws is a real measurement over this population.

   ${patients.length} patients, ${encSeq} encounters, ${condSeq} recorded conditions,
   ${rxSeq} prescriptions, ${labSeq} lab orders, ${invSeq} invoices.
   ========================================================================== */
var COHORT_TTL = \`
@prefix med:    <http://medisem.org/onto#> .
@prefix res:    <http://medisem.org/resource/> .
@prefix owl:    <http://www.w3.org/2002/07/owl#> .
@prefix rdfs:   <http://www.w3.org/2000/01/rdf-schema#> .
@prefix xsd:    <http://www.w3.org/2001/XMLSchema#> .

`;

mkdirSync(join(root, 'assets'), { recursive: true });
writeFileSync(join(root, 'assets', 'data-cohort.js'), header + body + '\n`;\n');

// co-occurrence check so the generator can be trusted
const pairCount = new Map();
const singleCount = new Map();
patients.forEach((p) => {
  p.conditions.forEach((c) => singleCount.set(c, (singleCount.get(c) || 0) + 1));
  for (let i = 0; i < p.conditions.length; i++)
    for (let j = i + 1; j < p.conditions.length; j++) {
      const k = [p.conditions[i], p.conditions[j]].sort().join(' + ');
      pairCount.set(k, (pairCount.get(k) || 0) + 1);
    }
});
console.log(`patients ${patients.length}, encounters ${encSeq}, conditions ${condSeq},`);
console.log(`prescriptions ${rxSeq}, labs ${labSeq}, invoices ${invSeq}, appointments ${apptSeq}`);
console.log('distinct diseases present:', singleCount.size);
console.log('\ntop co-occurring pairs:');
Array.from(pairCount.entries()).sort((a, b) => b[1] - a[1]).slice(0, 12)
  .forEach(([k, v]) => console.log('  ' + String(v).padStart(3) + '  ' + k));
console.log('\npairs with 3+ patients:', Array.from(pairCount.values()).filter((v) => v >= 3).length);
