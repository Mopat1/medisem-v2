/* =============================================================================
   data-reference.js — the standing data of the hospital.

   Departments, wards and beds, the clinical staff, the disease catalogue with
   ICD-10 codes, the formulary with interaction and contraindication facts, the
   insurance panel, and the login accounts.
   ========================================================================== */
var REFERENCE_TTL = `
@prefix med:    <http://medisem.org/onto#> .
@prefix res:    <http://medisem.org/resource/> .
@prefix owl:    <http://www.w3.org/2002/07/owl#> .
@prefix rdfs:   <http://www.w3.org/2000/01/rdf-schema#> .
@prefix xsd:    <http://www.w3.org/2001/XMLSchema#> .
@prefix skos:   <http://www.w3.org/2004/02/skos/core#> .

#################################################################
#  The hospital and its departments
#################################################################

res:MediSemHospital a med:Hospital ;
    med:name "MediSem Multispecialty Hospital" ;
    med:address "Rajiv Gandhi Salai, Sholinganallur, Chennai 600119" ;
    med:phone "+91 44 6620 4000" ;
    med:email "care@medisem.health" ;
    med:capacity 420 .

res:Dept_Cardiology a med:Department ; med:name "Cardiology" ; med:partOf res:MediSemHospital ;
    med:headedBy res:Doc_Ramesh ; med:status "Open" .
res:Dept_Neurology a med:Department ; med:name "Neurology" ; med:partOf res:MediSemHospital ;
    med:headedBy res:Doc_Priya ; med:status "Open" .
res:Dept_Oncology a med:Department ; med:name "Oncology" ; med:partOf res:MediSemHospital ;
    med:headedBy res:Doc_Anand ; med:status "Open" .
res:Dept_Endocrinology a med:Department ; med:name "Endocrinology and Diabetology" ; med:partOf res:MediSemHospital ;
    med:headedBy res:Doc_Nithya ; med:status "Open" .
res:Dept_Pulmonology a med:Department ; med:name "Pulmonology" ; med:partOf res:MediSemHospital ;
    med:headedBy res:Doc_Sameer ; med:status "Open" .
res:Dept_Nephrology a med:Department ; med:name "Nephrology" ; med:partOf res:MediSemHospital ;
    med:headedBy res:Doc_Vandana ; med:status "Open" .
res:Dept_Orthopedics a med:Department ; med:name "Orthopaedics" ; med:partOf res:MediSemHospital ;
    med:headedBy res:Doc_Vikram ; med:status "Open" .
res:Dept_Psychiatry a med:Department ; med:name "Psychiatry and Behavioural Health" ; med:partOf res:MediSemHospital ;
    med:headedBy res:Doc_Leela ; med:status "Open" .
res:Dept_Pediatrics a med:Department ; med:name "Paediatrics" ; med:partOf res:MediSemHospital ;
    med:headedBy res:Doc_Meera ; med:status "Open" .
res:Dept_GeneralMedicine a med:Department ; med:name "General Medicine" ; med:partOf res:MediSemHospital ;
    med:headedBy res:Doc_Suresh ; med:status "Open" .
res:Dept_Emergency a med:Department ; med:name "Emergency and Trauma" ; med:partOf res:MediSemHospital ;
    med:headedBy res:Doc_Karthik ; med:status "Open" .
res:Dept_Radiology a med:Department ; med:name "Radiology" ; med:partOf res:MediSemHospital ;
    med:headedBy res:Doc_Sunita ; med:status "Open" .
res:Dept_Pathology a med:Department ; med:name "Pathology and Laboratory" ; med:partOf res:MediSemHospital ;
    med:status "Open" .
res:Dept_Pharmacy a med:Department ; med:name "Pharmacy" ; med:partOf res:MediSemHospital ;
    med:status "Open" .

#################################################################
#  Wards, rooms and beds. Only single hops are stated: the chain
#  from a bed up to the hospital is left to the reasoner.
#################################################################

res:Ward_CCU a med:IntensiveCareUnit ; med:name "Coronary Care Unit" ; med:locatedIn res:Dept_Cardiology ; med:capacity 14 .
res:Ward_MICU a med:IntensiveCareUnit ; med:name "Medical Intensive Care" ; med:locatedIn res:Dept_GeneralMedicine ; med:capacity 16 .
res:Ward_NeuroWard a med:Ward ; med:name "Neurology Ward" ; med:locatedIn res:Dept_Neurology ; med:capacity 22 .
res:Ward_GeneralA a med:Ward ; med:name "General Ward A" ; med:locatedIn res:Dept_GeneralMedicine ; med:capacity 34 .
res:Ward_GeneralB a med:Ward ; med:name "General Ward B" ; med:locatedIn res:Dept_GeneralMedicine ; med:capacity 34 .
res:Ward_OncoDay a med:Ward ; med:name "Oncology Day Care" ; med:locatedIn res:Dept_Oncology ; med:capacity 18 .
res:Ward_Paeds a med:Ward ; med:name "Paediatric Ward" ; med:locatedIn res:Dept_Pediatrics ; med:capacity 20 .

res:Room_C101 a med:Room ; med:name "C-101" ; med:locatedIn res:Ward_CCU .
res:Room_C102 a med:Room ; med:name "C-102" ; med:locatedIn res:Ward_CCU .
res:Room_M201 a med:Room ; med:name "M-201" ; med:locatedIn res:Ward_MICU .
res:Room_N301 a med:Room ; med:name "N-301" ; med:locatedIn res:Ward_NeuroWard .
res:Room_N302 a med:Room ; med:name "N-302" ; med:locatedIn res:Ward_NeuroWard .
res:Room_A401 a med:Room ; med:name "A-401" ; med:locatedIn res:Ward_GeneralA .
res:Room_A402 a med:Room ; med:name "A-402" ; med:locatedIn res:Ward_GeneralA .
res:Room_B501 a med:Room ; med:name "B-501" ; med:locatedIn res:Ward_GeneralB .
res:Room_O601 a med:Room ; med:name "O-601" ; med:locatedIn res:Ward_OncoDay .
res:Room_P701 a med:Room ; med:name "P-701" ; med:locatedIn res:Ward_Paeds .

res:Bed_C101A a med:Bed ; med:bedNumber "C-101-A" ; med:locatedIn res:Room_C101 ; med:occupied true .
res:Bed_C101B a med:Bed ; med:bedNumber "C-101-B" ; med:locatedIn res:Room_C101 ; med:occupied false .
res:Bed_C102A a med:Bed ; med:bedNumber "C-102-A" ; med:locatedIn res:Room_C102 ; med:occupied true .
res:Bed_C102B a med:Bed ; med:bedNumber "C-102-B" ; med:locatedIn res:Room_C102 ; med:occupied false .
res:Bed_M201A a med:Bed ; med:bedNumber "M-201-A" ; med:locatedIn res:Room_M201 ; med:occupied true .
res:Bed_M201B a med:Bed ; med:bedNumber "M-201-B" ; med:locatedIn res:Room_M201 ; med:occupied false .
res:Bed_N301A a med:Bed ; med:bedNumber "N-301-A" ; med:locatedIn res:Room_N301 ; med:occupied true .
res:Bed_N301B a med:Bed ; med:bedNumber "N-301-B" ; med:locatedIn res:Room_N301 ; med:occupied false .
res:Bed_N302A a med:Bed ; med:bedNumber "N-302-A" ; med:locatedIn res:Room_N302 ; med:occupied false .
res:Bed_A401A a med:Bed ; med:bedNumber "A-401-A" ; med:locatedIn res:Room_A401 ; med:occupied true .
res:Bed_A401B a med:Bed ; med:bedNumber "A-401-B" ; med:locatedIn res:Room_A401 ; med:occupied false .
res:Bed_A402A a med:Bed ; med:bedNumber "A-402-A" ; med:locatedIn res:Room_A402 ; med:occupied false .
res:Bed_B501A a med:Bed ; med:bedNumber "B-501-A" ; med:locatedIn res:Room_B501 ; med:occupied true .
res:Bed_B501B a med:Bed ; med:bedNumber "B-501-B" ; med:locatedIn res:Room_B501 ; med:occupied false .
res:Bed_O601A a med:Bed ; med:bedNumber "O-601-A" ; med:locatedIn res:Room_O601 ; med:occupied false .
res:Bed_P701A a med:Bed ; med:bedNumber "P-701-A" ; med:locatedIn res:Room_P701 ; med:occupied false .

#################################################################
#  Clinical staff
#################################################################

res:Doc_Ramesh a med:Cardiologist ; med:name "Dr. Ramesh Iyer" ; med:photoInitials "RI" ;
    med:staffId "DOC-1001" ; med:licenseNumber "TN-44821" ; med:sex "Male" ;
    med:qualification "MD, DM Cardiology" ; med:yearsOfExperience 22 ; med:consultationFee 950 ;
    med:worksIn res:Dept_Cardiology ; med:email "r.iyer@medisem.health" ; med:phone "+91 44 6620 4101" .

res:Doc_Priya a med:Neurologist ; med:name "Dr. Priya Raghavan" ; med:photoInitials "PR" ;
    med:staffId "DOC-1002" ; med:licenseNumber "TN-44902" ; med:sex "Female" ;
    med:qualification "MD, DM Neurology" ; med:yearsOfExperience 17 ; med:consultationFee 900 ;
    med:worksIn res:Dept_Neurology ; med:email "p.raghavan@medisem.health" ; med:phone "+91 44 6620 4102" .

res:Doc_Anand a med:Oncologist ; med:name "Dr. Anand Krishnan" ; med:photoInitials "AK" ;
    med:staffId "DOC-1003" ; med:licenseNumber "TN-45110" ; med:sex "Male" ;
    med:qualification "MD, DM Medical Oncology" ; med:yearsOfExperience 15 ; med:consultationFee 1250 ;
    med:worksIn res:Dept_Oncology ; med:email "a.krishnan@medisem.health" ; med:phone "+91 44 6620 4103" .

res:Doc_Nithya a med:Endocrinologist ; med:name "Dr. Nithya Venkatesh" ; med:photoInitials "NV" ;
    med:staffId "DOC-1004" ; med:licenseNumber "TN-45511" ; med:sex "Female" ;
    med:qualification "MD, DM Endocrinology" ; med:yearsOfExperience 12 ; med:consultationFee 850 ;
    med:worksIn res:Dept_Endocrinology ; med:email "n.venkatesh@medisem.health" ; med:phone "+91 44 6620 4104" .

res:Doc_Sameer a med:Pulmonologist ; med:name "Dr. Sameer Rao" ; med:photoInitials "SR" ;
    med:staffId "DOC-1005" ; med:licenseNumber "TN-45620" ; med:sex "Male" ;
    med:qualification "MD Pulmonary Medicine" ; med:yearsOfExperience 14 ; med:consultationFee 880 ;
    med:worksIn res:Dept_Pulmonology ; med:email "s.rao@medisem.health" ; med:phone "+91 44 6620 4105" .

res:Doc_Vandana a med:Nephrologist ; med:name "Dr. Vandana Shetty" ; med:photoInitials "VS" ;
    med:staffId "DOC-1006" ; med:licenseNumber "TN-45733" ; med:sex "Female" ;
    med:qualification "MD, DM Nephrology" ; med:yearsOfExperience 13 ; med:consultationFee 900 ;
    med:worksIn res:Dept_Nephrology ; med:email "v.shetty@medisem.health" ; med:phone "+91 44 6620 4106" .

res:Doc_Vikram a med:Orthopedist ; med:name "Dr. Vikram Deshpande" ; med:photoInitials "VD" ;
    med:staffId "DOC-1007" ; med:licenseNumber "TN-45420" ; med:sex "Male" ;
    med:qualification "MS Orthopaedics" ; med:yearsOfExperience 19 ; med:consultationFee 920 ;
    med:worksIn res:Dept_Orthopedics ; med:email "v.deshpande@medisem.health" ; med:phone "+91 44 6620 4107" .

res:Doc_Leela a med:Psychiatrist ; med:name "Dr. Leela Menon" ; med:photoInitials "LM" ;
    med:staffId "DOC-1008" ; med:licenseNumber "TN-45840" ; med:sex "Female" ;
    med:qualification "MD Psychiatry" ; med:yearsOfExperience 11 ; med:consultationFee 800 ;
    med:worksIn res:Dept_Psychiatry ; med:email "l.menon@medisem.health" ; med:phone "+91 44 6620 4108" .

res:Doc_Meera a med:Pediatrician ; med:name "Dr. Meera Suresh" ; med:photoInitials "MS" ;
    med:staffId "DOC-1009" ; med:licenseNumber "TN-45233" ; med:sex "Female" ;
    med:qualification "MD Paediatrics" ; med:yearsOfExperience 11 ; med:consultationFee 650 ;
    med:worksIn res:Dept_Pediatrics ; med:email "m.suresh@medisem.health" ; med:phone "+91 44 6620 4109" .

res:Doc_Suresh a med:GeneralPhysician ; med:name "Dr. Suresh Kumar" ; med:photoInitials "SK" ;
    med:staffId "DOC-1010" ; med:licenseNumber "TN-45950" ; med:sex "Male" ;
    med:qualification "MD General Medicine" ; med:yearsOfExperience 16 ; med:consultationFee 700 ;
    med:worksIn res:Dept_GeneralMedicine ; med:email "s.kumar@medisem.health" ; med:phone "+91 44 6620 4110" .

res:Doc_Karthik a med:EmergencyPhysician ; med:name "Dr. Karthik Balan" ; med:photoInitials "KB" ;
    med:staffId "DOC-1011" ; med:licenseNumber "TN-45301" ; med:sex "Male" ;
    med:qualification "MS Emergency Medicine" ; med:yearsOfExperience 9 ; med:consultationFee 750 ;
    med:worksIn res:Dept_Emergency ; med:email "k.balan@medisem.health" ; med:phone "+91 44 6620 4111" .

res:Doc_Sunita a med:Doctor ; med:name "Dr. Sunita Nair" ; med:photoInitials "SN" ;
    med:staffId "DOC-1012" ; med:licenseNumber "TN-45388" ; med:sex "Female" ;
    med:qualification "MD Radiodiagnosis" ; med:yearsOfExperience 13 ; med:consultationFee 780 ;
    med:worksIn res:Dept_Radiology ; med:email "s.nair@medisem.health" ; med:phone "+91 44 6620 4112" .

res:Doc_Farida a med:Cardiologist ; med:name "Dr. Farida Qureshi" ; med:photoInitials "FQ" ;
    med:staffId "DOC-1013" ; med:licenseNumber "TN-46020" ; med:sex "Female" ;
    med:qualification "MD, DNB Cardiology" ; med:yearsOfExperience 7 ; med:consultationFee 700 ;
    med:worksIn res:Dept_Cardiology ; med:email "f.qureshi@medisem.health" ; med:phone "+91 44 6620 4113" .

res:Doc_Joseph a med:GeneralPhysician ; med:name "Dr. Joseph Thomas" ; med:photoInitials "JT" ;
    med:staffId "DOC-1014" ; med:licenseNumber "TN-46140" ; med:sex "Male" ;
    med:qualification "MD General Medicine" ; med:yearsOfExperience 8 ; med:consultationFee 650 ;
    med:worksIn res:Dept_GeneralMedicine ; med:email "j.thomas@medisem.health" ; med:phone "+91 44 6620 4114" .

res:Nurse_Kavya a med:Nurse ; med:name "Kavya Menon" ; med:photoInitials "KM" ; med:staffId "NUR-2001" ;
    med:qualification "BSc Nursing" ; med:yearsOfExperience 12 ; med:worksIn res:Dept_Cardiology .
res:Nurse_Deepa a med:Nurse ; med:name "Deepa Shankar" ; med:photoInitials "DS" ; med:staffId "NUR-2002" ;
    med:qualification "GNM" ; med:yearsOfExperience 6 ; med:worksIn res:Dept_Neurology .
res:Nurse_Rahul a med:Nurse ; med:name "Rahul Verma" ; med:photoInitials "RV" ; med:staffId "NUR-2003" ;
    med:qualification "BSc Nursing" ; med:yearsOfExperience 4 ; med:worksIn res:Dept_Emergency .

res:Tech_Mohan a med:LabTechnician ; med:name "Mohan Das" ; med:photoInitials "MD" ; med:staffId "LAB-3001" ;
    med:qualification "DMLT" ; med:yearsOfExperience 9 ; med:worksIn res:Dept_Pathology ;
    med:email "lab@medisem.health" ; med:phone "+91 44 6620 4130" .
res:Pharm_Farah a med:Pharmacist ; med:name "Farah Sheikh" ; med:photoInitials "FS" ; med:staffId "PHR-3002" ;
    med:qualification "PharmD" ; med:yearsOfExperience 7 ; med:worksIn res:Dept_Pharmacy ;
    med:email "pharmacy@medisem.health" ; med:phone "+91 44 6620 4131" .
res:Admin_Geetha a med:Administrator ; med:name "Geetha Rajan" ; med:photoInitials "GR" ; med:staffId "ADM-4001" ;
    med:qualification "MHA" ; med:yearsOfExperience 15 ; med:worksIn res:Dept_GeneralMedicine ;
    med:email "records@medisem.health" ; med:phone "+91 44 6620 4140" .

#################################################################
#  Disease catalogue
#################################################################

res:Hypertension a med:CardiovascularDisease , med:ChronicDisease ; med:name "Hypertension" ; med:icd10 "I10" .
res:TypeIIDiabetes a med:MetabolicDisease , med:ChronicDisease ; med:name "Type 2 Diabetes Mellitus" ; med:icd10 "E11" .
res:Dyslipidemia a med:MetabolicDisease , med:ChronicDisease ; med:name "Dyslipidaemia" ; med:icd10 "E78" .
res:Obesity a med:MetabolicDisease , med:ChronicDisease ; med:name "Obesity" ; med:icd10 "E66" .
res:Hypothyroidism a med:MetabolicDisease , med:ChronicDisease ; med:name "Hypothyroidism" ; med:icd10 "E03" .
res:CoronaryArteryDisease a med:CardiovascularDisease , med:ChronicDisease ; med:name "Coronary Artery Disease" ; med:icd10 "I25" .
res:MyocardialInfarction a med:CardiovascularDisease , med:AcuteDisease ; med:name "Myocardial Infarction" ; med:icd10 "I21" .
res:HeartFailure a med:CardiovascularDisease , med:ChronicDisease ; med:name "Heart Failure" ; med:icd10 "I50" .
res:AtrialFibrillation a med:CardiovascularDisease , med:ChronicDisease ; med:name "Atrial Fibrillation" ; med:icd10 "I48" .
res:Stroke a med:NeurologicalDisease , med:CardiovascularDisease ; med:name "Ischaemic Stroke" ; med:icd10 "I63" .
res:ChronicKidneyDisease a med:RenalDisease , med:ChronicDisease ; med:name "Chronic Kidney Disease" ; med:icd10 "N18" .
res:DiabeticRetinopathy a med:ChronicDisease ; med:name "Diabetic Retinopathy" ; med:icd10 "H36" .
res:Asthma a med:RespiratoryDisease , med:ChronicDisease ; med:name "Bronchial Asthma" ; med:icd10 "J45" .
res:COPD a med:RespiratoryDisease , med:ChronicDisease ; med:name "Chronic Obstructive Pulmonary Disease" ; med:icd10 "J44" .
res:Pneumonia a med:RespiratoryDisease , med:InfectiousDisease ; med:name "Pneumonia" ; med:icd10 "J18" .
res:SleepApnea a med:RespiratoryDisease , med:ChronicDisease ; med:name "Obstructive Sleep Apnoea" ; med:icd10 "G47.3" .
res:Tuberculosis a med:InfectiousDisease , med:RespiratoryDisease ; med:name "Pulmonary Tuberculosis" ; med:icd10 "A15" .
res:Epilepsy a med:NeurologicalDisease , med:ChronicDisease ; med:name "Epilepsy" ; med:icd10 "G40" .
res:Migraine a med:NeurologicalDisease ; med:name "Migraine" ; med:icd10 "G43" .
res:Dementia a med:NeurologicalDisease , med:ChronicDisease ; med:name "Dementia" ; med:icd10 "F03" .
res:Depression a med:MentalHealthCondition , med:ChronicDisease ; med:name "Major Depressive Disorder" ; med:icd10 "F32" .
res:AnxietyDisorder a med:MentalHealthCondition ; med:name "Generalised Anxiety Disorder" ; med:icd10 "F41" .
res:BreastCancer a med:Neoplasm ; med:name "Breast Carcinoma" ; med:icd10 "C50" .
res:LungCancer a med:Neoplasm ; med:name "Lung Carcinoma" ; med:icd10 "C34" .
res:Anemia a med:HaematologicalDisease ; med:name "Anaemia" ; med:icd10 "D64" .
res:Osteoarthritis a med:MusculoskeletalDisease , med:ChronicDisease ; med:name "Osteoarthritis" ; med:icd10 "M17" .
res:Osteoporosis a med:MusculoskeletalDisease , med:ChronicDisease ; med:name "Osteoporosis" ; med:icd10 "M81" .
res:RheumatoidArthritis a med:MusculoskeletalDisease , med:ChronicDisease ; med:name "Rheumatoid Arthritis" ; med:icd10 "M06" .
res:Dengue a med:InfectiousDisease ; med:name "Dengue Fever" ; med:icd10 "A90" .
res:UrinaryTractInfection a med:InfectiousDisease ; med:name "Urinary Tract Infection" ; med:icd10 "N39" .

# Known pathophysiological links, distinct from the mined comorbidity edges.
res:DiabeticRetinopathy med:complicationOf res:TypeIIDiabetes .
res:ChronicKidneyDisease med:complicationOf res:TypeIIDiabetes , res:Hypertension .
res:MyocardialInfarction med:complicationOf res:CoronaryArteryDisease .
res:HeartFailure med:complicationOf res:MyocardialInfarction .
res:Stroke med:complicationOf res:AtrialFibrillation , res:Hypertension .
res:Anemia med:complicationOf res:ChronicKidneyDisease .
res:Obesity med:riskFactorFor res:TypeIIDiabetes , res:SleepApnea , res:Osteoarthritis .

#################################################################
#  Symptoms
#################################################################

res:Sym_ChestPain a med:Symptom ; med:name "Chest pain" ; med:indicates res:MyocardialInfarction , res:CoronaryArteryDisease .
res:Sym_Breathless a med:Symptom ; med:name "Breathlessness" ; med:indicates res:HeartFailure , res:COPD , res:Asthma , res:Anemia .
res:Sym_Headache a med:Symptom ; med:name "Headache" ; med:indicates res:Migraine , res:Hypertension , res:Stroke .
res:Sym_Fatigue a med:Symptom ; med:name "Fatigue" ; med:indicates res:Anemia , res:Hypothyroidism , res:TypeIIDiabetes , res:Depression .
res:Sym_Palpitations a med:Symptom ; med:name "Palpitations" ; med:indicates res:AtrialFibrillation , res:AnxietyDisorder .
res:Sym_Cough a med:Symptom ; med:name "Persistent cough" ; med:indicates res:COPD , res:Pneumonia , res:Tuberculosis , res:LungCancer .
res:Sym_JointPain a med:Symptom ; med:name "Joint pain" ; med:indicates res:Osteoarthritis , res:RheumatoidArthritis .
res:Sym_Polyuria a med:Symptom ; med:name "Excessive urination" ; med:indicates res:TypeIIDiabetes , res:UrinaryTractInfection .
res:Sym_Fever a med:Symptom ; med:name "Fever" ; med:indicates res:Dengue , res:Pneumonia , res:UrinaryTractInfection .
res:Sym_LowMood a med:Symptom ; med:name "Low mood" ; med:indicates res:Depression , res:Hypothyroidism .

#################################################################
#  Formulary
#################################################################

res:Med_Metformin a med:Antidiabetic ; med:name "Metformin" ; med:strength "500 mg" ; med:indicatedFor res:TypeIIDiabetes ;
    med:contraindicatedFor res:ChronicKidneyDisease .
res:Med_Glimepiride a med:Antidiabetic ; med:name "Glimepiride" ; med:strength "2 mg" ; med:indicatedFor res:TypeIIDiabetes .
res:Med_Insulin a med:Antidiabetic ; med:name "Insulin Glargine" ; med:strength "100 IU/mL" ; med:indicatedFor res:TypeIIDiabetes .
res:Med_Amlodipine a med:Antihypertensive ; med:name "Amlodipine" ; med:strength "5 mg" ; med:indicatedFor res:Hypertension .
res:Med_Telmisartan a med:Antihypertensive ; med:name "Telmisartan" ; med:strength "40 mg" ; med:indicatedFor res:Hypertension , res:ChronicKidneyDisease .
res:Med_Metoprolol a med:Antihypertensive ; med:name "Metoprolol" ; med:strength "25 mg" ;
    med:indicatedFor res:Hypertension , res:AtrialFibrillation , res:HeartFailure ;
    med:contraindicatedFor res:Asthma .
res:Med_Atorvastatin a med:Statin ; med:name "Atorvastatin" ; med:strength "20 mg" ; med:indicatedFor res:Dyslipidemia , res:CoronaryArteryDisease .
res:Med_Aspirin a med:Anticoagulant , med:NSAID ; med:name "Aspirin" ; med:strength "75 mg" ;
    med:indicatedFor res:CoronaryArteryDisease , res:MyocardialInfarction ;
    med:contraindicatedFor res:Asthma .
res:Med_Warfarin a med:Anticoagulant ; med:name "Warfarin" ; med:strength "5 mg" ;
    med:indicatedFor res:AtrialFibrillation , res:Stroke ;
    med:interactsWith res:Med_Aspirin .
res:Med_Clopidogrel a med:Anticoagulant ; med:name "Clopidogrel" ; med:strength "75 mg" ;
    med:indicatedFor res:CoronaryArteryDisease , res:Stroke ; med:interactsWith res:Med_Warfarin .
res:Med_Furosemide a med:Medication ; med:name "Furosemide" ; med:strength "40 mg" ; med:indicatedFor res:HeartFailure .
res:Med_Ibuprofen a med:NSAID ; med:name "Ibuprofen" ; med:strength "400 mg" ;
    med:indicatedFor res:Osteoarthritis , res:Migraine ;
    med:contraindicatedFor res:Asthma , res:ChronicKidneyDisease , res:HeartFailure ;
    med:interactsWith res:Med_Warfarin .
res:Med_Paracetamol a med:Analgesic ; med:name "Paracetamol" ; med:strength "650 mg" ; med:indicatedFor res:Dengue , res:Migraine .
res:Med_Salbutamol a med:Bronchodilator ; med:name "Salbutamol inhaler" ; med:strength "100 mcg" ; med:indicatedFor res:Asthma , res:COPD .
res:Med_Tiotropium a med:Bronchodilator ; med:name "Tiotropium" ; med:strength "18 mcg" ; med:indicatedFor res:COPD .
res:Med_Amoxicillin a med:Antibiotic ; med:name "Amoxicillin" ; med:strength "500 mg" ; med:indicatedFor res:Pneumonia , res:UrinaryTractInfection ;
    med:containsSubstance res:Allergen_Penicillin .
res:Med_Azithromycin a med:Antibiotic ; med:name "Azithromycin" ; med:strength "500 mg" ; med:indicatedFor res:Pneumonia .
res:Med_Levetiracetam a med:Anticonvulsant ; med:name "Levetiracetam" ; med:strength "500 mg" ; med:indicatedFor res:Epilepsy .
res:Med_Sertraline a med:Antidepressant ; med:name "Sertraline" ; med:strength "50 mg" ; med:indicatedFor res:Depression , res:AnxietyDisorder ;
    med:interactsWith res:Med_Warfarin .
res:Med_Levothyroxine a med:Medication ; med:name "Levothyroxine" ; med:strength "50 mcg" ; med:indicatedFor res:Hypothyroidism .
res:Med_Alendronate a med:Medication ; med:name "Alendronate" ; med:strength "70 mg" ; med:indicatedFor res:Osteoporosis .
res:Med_Methotrexate a med:Medication ; med:name "Methotrexate" ; med:strength "10 mg" ; med:indicatedFor res:RheumatoidArthritis ;
    med:interactsWith res:Med_Ibuprofen .
res:Med_Tamoxifen a med:Medication ; med:name "Tamoxifen" ; med:strength "20 mg" ; med:indicatedFor res:BreastCancer .
res:Med_IronFolate a med:Medication ; med:name "Iron and Folic Acid" ; med:strength "100 mg" ; med:indicatedFor res:Anemia .
res:Med_Nitrofurantoin a med:Antibiotic ; med:name "Nitrofurantoin" ; med:strength "100 mg" ; med:indicatedFor res:UrinaryTractInfection ;
    med:contraindicatedFor res:ChronicKidneyDisease .

res:Allergen_Penicillin a med:Allergen ; med:name "Penicillin" .
res:Allergen_Sulfa a med:Allergen ; med:name "Sulfonamides" .
res:Allergen_Latex a med:Allergen ; med:name "Latex" .
res:Allergen_Iodine a med:Allergen ; med:name "Iodinated contrast" .

#################################################################
#  Insurance
#################################################################

res:Ins_StarHealth a med:InsuranceProvider ; med:name "Star Health Insurance" ; med:phone "+91 44 6900 1000" .
res:Ins_NewIndia a med:InsuranceProvider ; med:name "New India Assurance" ; med:phone "+91 44 6900 2000" .
res:Ins_HDFCErgo a med:InsuranceProvider ; med:name "HDFC Ergo Health" ; med:phone "+91 44 6900 3000" .
res:Ins_CGHS a med:InsuranceProvider ; med:name "CGHS Panel" ; med:phone "+91 44 6900 4000" .

#################################################################
#  Accounts. The passcode for every demo account is demo1234.
#################################################################

res:Acct_Arjun a med:Account ; med:login "arjun@medisem.health" ; med:passcode "demo1234" ;
    med:accountFor res:Pat_ARJ001 ; med:hasRole med:PatientRole .
res:Acct_Lakshmi a med:Account ; med:login "lakshmi@medisem.health" ; med:passcode "demo1234" ;
    med:accountFor res:Pat_LAK002 ; med:hasRole med:PatientRole .
res:Acct_Gopal a med:Account ; med:login "gopal@medisem.health" ; med:passcode "demo1234" ;
    med:accountFor res:Pat_GOP006 ; med:hasRole med:PatientRole .
res:Acct_Rekha a med:Account ; med:login "rekha@medisem.health" ; med:passcode "demo1234" ;
    med:accountFor res:Pat_REK005 ; med:hasRole med:PatientRole .
res:Acct_Divya a med:Account ; med:login "divya@medisem.health" ; med:passcode "demo1234" ;
    med:accountFor res:Pat_DIV003 ; med:hasRole med:PatientRole .

res:Acct_DocRamesh a med:Account ; med:login "r.iyer@medisem.health" ; med:passcode "demo1234" ;
    med:accountFor res:Doc_Ramesh ; med:hasRole med:DoctorRole .
res:Acct_DocPriya a med:Account ; med:login "p.raghavan@medisem.health" ; med:passcode "demo1234" ;
    med:accountFor res:Doc_Priya ; med:hasRole med:DoctorRole .
res:Acct_DocNithya a med:Account ; med:login "n.venkatesh@medisem.health" ; med:passcode "demo1234" ;
    med:accountFor res:Doc_Nithya ; med:hasRole med:DoctorRole .
res:Acct_DocAnand a med:Account ; med:login "a.krishnan@medisem.health" ; med:passcode "demo1234" ;
    med:accountFor res:Doc_Anand ; med:hasRole med:DoctorRole .
res:Acct_DocSameer a med:Account ; med:login "s.rao@medisem.health" ; med:passcode "demo1234" ;
    med:accountFor res:Doc_Sameer ; med:hasRole med:DoctorRole .

res:Acct_Admin a med:Account ; med:login "records@medisem.health" ; med:passcode "demo1234" ;
    med:accountFor res:Admin_Geetha ; med:hasRole med:AdminRole .
res:Acct_Lab a med:Account ; med:login "lab@medisem.health" ; med:passcode "demo1234" ;
    med:accountFor res:Tech_Mohan ; med:hasRole med:LabRole .
res:Acct_Pharmacy a med:Account ; med:login "pharmacy@medisem.health" ; med:passcode "demo1234" ;
    med:accountFor res:Pharm_Farah ; med:hasRole med:PharmacyRole .
`;

if (typeof module !== 'undefined') module.exports = { REFERENCE_TTL: REFERENCE_TTL };
