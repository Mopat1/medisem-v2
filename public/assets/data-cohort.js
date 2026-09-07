/* =============================================================================
   data-cohort.js — the patient population.

   GENERATED FILE. Produced by scripts/generate-cohort.mjs, which draws each
   patient from a clinically plausible comorbidity cluster. Because the
   co-occurrence is generated rather than hand-listed, the comorbidity network
   the application draws is a real measurement over this population.

   120 patients, 468 encounters, 323 recorded conditions,
   363 prescriptions, 213 lab orders, 364 invoices.
   ========================================================================== */
var COHORT_TTL = `
@prefix med:    <http://medisem.org/onto#> .
@prefix res:    <http://medisem.org/resource/> .
@prefix owl:    <http://www.w3.org/2002/07/owl#> .
@prefix rdfs:   <http://www.w3.org/2000/01/rdf-schema#> .
@prefix xsd:    <http://www.w3.org/2001/XMLSchema#> .

#################################################################
#  Patients
#################################################################

res:Pat_ARJ001 a med:OutPatient ;
    med:name "Arjun Mehta" ; med:mrn "MRN-ARJ001" ; med:photoInitials "AM" ;
    med:sex "Male" ; med:dateOfBirth "1962-03-14"^^xsd:date ; med:age 64 ;
    med:bloodGroup "A+" ; med:phone "+91 99420 468740" ; med:email "arjun.mehta@example.in" ;
    med:address "1 GST Road, Perungudi, Chennai" ;
    med:primaryPhysician res:Doc_Farida ;
    med:allergicTo res:Allergen_Sulfa ;
    med:hasCondition res:Cond_1 , res:Cond_2 , res:Cond_3 , res:Cond_4 .

res:Cond_1 a med:Condition ;
    med:ofDisease res:CoronaryArteryDisease ; med:onsetDate "2025-06-14"^^xsd:date ;
    med:severity "Moderate" ;
    med:clinicalStatus "Active" ;
    med:diagnosedBy res:Doc_Farida .

res:Cond_2 a med:Condition ;
    med:ofDisease res:Hypertension ; med:onsetDate "2016-12-27"^^xsd:date ;
    med:severity "Moderate" ;
    med:clinicalStatus "Active" ;
    med:diagnosedBy res:Doc_Ramesh .

res:Cond_3 a med:Condition ;
    med:ofDisease res:TypeIIDiabetes ; med:onsetDate "2021-02-07"^^xsd:date ;
    med:severity "Mild" ;
    med:clinicalStatus "Active" ;
    med:diagnosedBy res:Doc_Nithya .

res:Cond_4 a med:Condition ;
    med:ofDisease res:ChronicKidneyDisease ; med:onsetDate "2016-12-21"^^xsd:date ;
    med:severity "Mild" ;
    med:clinicalStatus "Active" ;
    med:diagnosedBy res:Doc_Vandana .

res:Pat_ARJ001 med:hasEncounter res:Enc_1 , res:Enc_2 , res:Enc_3 , res:Enc_4 , res:Enc_5 .

res:Enc_1 a med:Consultation ;
    med:encounterOf res:Pat_ARJ001 ; med:date "2023-05-21"^^xsd:date ;
    med:time "09:00" ;
    med:attendedBy res:Doc_Suresh ; med:inDepartment res:Dept_GeneralMedicine ;
    med:reason "First presentation" ;
    med:outcome "Treatment continued" ;
    med:recordedCondition res:Cond_2 ;
    med:hasVitals res:Vit_1 ; med:hasNote res:Note_1 .

res:Vit_1 a med:VitalSigns ;
    med:systolic 176 ; med:diastolic 87 ;
    med:heartRate 83 ; med:temperature 99.4 ;
    med:spo2 99 ;
    med:weightKg 62.2 ;
    med:bmi 26.8 .

res:Note_1 a med:ClinicalNote ;
    med:authorName "Dr. Suresh" ;
    med:date "2023-05-21"^^xsd:date ;
    med:noteText "Routine review, no new complaints. Referral raised to the relevant specialty." .

res:Rx_1 a med:Prescription ;
    med:prescribes res:Med_Amlodipine ; med:prescribedBy res:Doc_Suresh ;
    med:forPatient res:Pat_ARJ001 ; med:date "2023-05-21"^^xsd:date ;
    med:dosage "1 tablet" ;
    med:frequency "As required" ;
    med:durationDays 90 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_1 med:issuedPrescription res:Rx_1 .
res:Pat_ARJ001 med:hasPrescription res:Rx_1 .

res:Inv_1 a med:Invoice ;
    med:forPatient res:Pat_ARJ001 ; med:date "2023-05-21"^^xsd:date ;
    med:amount 4980 ; med:paid true ;
    med:status "Settled" .
res:Inv_1 med:coveredBy res:Policy_ARJ001 .
res:Pat_ARJ001 med:hasInvoice res:Inv_1 .

res:Enc_2 a med:Consultation ;
    med:encounterOf res:Pat_ARJ001 ; med:date "2024-03-10"^^xsd:date ;
    med:time "09:00" ;
    med:attendedBy res:Doc_Suresh ; med:inDepartment res:Dept_GeneralMedicine ;
    med:reason "Review of hypertension" ;
    med:outcome "Referred for tests" ;
    med:recordedCondition res:Cond_2 ;
    med:hasVitals res:Vit_2 ; med:hasNote res:Note_2 .

res:Vit_2 a med:VitalSigns ;
    med:systolic 155 ; med:diastolic 94 ;
    med:heartRate 88 ; med:temperature 97.4 ;
    med:spo2 98 ;
    med:weightKg 68.8 ;
    med:bmi 21.8 .

res:Note_2 a med:ClinicalNote ;
    med:authorName "Dr. Suresh" ;
    med:date "2024-03-10"^^xsd:date ;
    med:noteText "Routine review, no new complaints. Dose adjusted, repeat bloods before next visit." .

res:Rx_2 a med:Prescription ;
    med:prescribes res:Med_Metoprolol ; med:prescribedBy res:Doc_Suresh ;
    med:forPatient res:Pat_ARJ001 ; med:date "2024-03-10"^^xsd:date ;
    med:dosage "1 tablet" ;
    med:frequency "Three times daily" ;
    med:durationDays 30 ;
    med:dispensed true ;
    med:status "Completed" .

res:Rx_3 a med:Prescription ;
    med:prescribes res:Med_Amlodipine ; med:prescribedBy res:Doc_Suresh ;
    med:forPatient res:Pat_ARJ001 ; med:date "2024-03-10"^^xsd:date ;
    med:dosage "1 tablet" ;
    med:frequency "Three times daily" ;
    med:durationDays 30 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_2 med:issuedPrescription res:Rx_2 , res:Rx_3 .
res:Pat_ARJ001 med:hasPrescription res:Rx_2 , res:Rx_3 .

res:Inv_2 a med:Invoice ;
    med:forPatient res:Pat_ARJ001 ; med:date "2024-03-10"^^xsd:date ;
    med:amount 4299 ; med:paid true ;
    med:status "Settled" .
res:Inv_2 med:coveredBy res:Policy_ARJ001 .
res:Pat_ARJ001 med:hasInvoice res:Inv_2 .

res:Enc_3 a med:DayCareVisit ;
    med:encounterOf res:Pat_ARJ001 ; med:date "2025-01-01"^^xsd:date ;
    med:time "18:30" ;
    med:attendedBy res:Doc_Farida ; med:inDepartment res:Dept_Cardiology ;
    med:reason "Review of coronary artery disease" ;
    med:outcome "Follow up scheduled" ;
    med:recordedCondition res:Cond_1 ;
    med:hasVitals res:Vit_3 ; med:hasNote res:Note_3 .

res:Vit_3 a med:VitalSigns ;
    med:systolic 169 ; med:diastolic 91 ;
    med:heartRate 69 ; med:temperature 98.1 ;
    med:spo2 97 ;
    med:weightKg 52.4 ;
    med:bmi 27.7 .

res:Note_3 a med:ClinicalNote ;
    med:authorName "Dr. Farida" ;
    med:date "2025-01-01"^^xsd:date ;
    med:noteText "Referred from general medicine for specialist opinion. Advised on diet, salt restriction and daily walking." .

res:Lab_1 a med:LabOrder ;
    med:analyte "Troponin I" ; med:forPatient res:Pat_ARJ001 ;
    med:date "2025-01-01"^^xsd:date ; med:orderedBy res:Doc_Farida ;
    med:testsFor res:CoronaryArteryDisease ;
    med:orderStatus "Resulted" ;
    med:hasResult res:Res_1 .

res:Res_1 a med:LabResult ;
    med:analyte "Troponin I" ; med:value 3.51 ; med:unit "ng/mL" ;
    med:refLow 0 ; med:refHigh 0.04 ; med:outOfRange true ;
    med:date "2025-01-02"^^xsd:date ;
    med:performedBy res:Tech_Mohan .

res:Enc_3 med:orderedTest res:Lab_1 .

res:Enc_4 a med:Consultation ;
    med:encounterOf res:Pat_ARJ001 ; med:date "2025-11-14"^^xsd:date ;
    med:time "16:00" ;
    med:attendedBy res:Doc_Ramesh ; med:inDepartment res:Dept_GeneralMedicine ;
    med:reason "Review of hypertension" ;
    med:outcome "Referred for tests" ;
    med:recordedCondition res:Cond_2 ;
    med:hasVitals res:Vit_4 ; med:hasNote res:Note_4 .

res:Vit_4 a med:VitalSigns ;
    med:systolic 173 ; med:diastolic 104 ;
    med:heartRate 70 ; med:temperature 100.3 ;
    med:spo2 99 ;
    med:weightKg 66.0 ;
    med:bmi 24.8 .

res:Note_4 a med:ClinicalNote ;
    med:authorName "Dr. Ramesh" ;
    med:date "2025-11-14"^^xsd:date ;
    med:noteText "Attends for scheduled follow up. Referral raised to the relevant specialty." .

res:Enc_5 a med:Consultation ;
    med:encounterOf res:Pat_ARJ001 ; med:date "2026-08-27"^^xsd:date ;
    med:time "18:30" ;
    med:attendedBy res:Doc_Vandana ; med:inDepartment res:Dept_Nephrology ;
    med:reason "Review of chronic kidney disease" ;
    med:outcome "Follow up scheduled" ;
    med:recordedCondition res:Cond_4 ;
    med:hasVitals res:Vit_5 ; med:hasNote res:Note_5 .

res:Vit_5 a med:VitalSigns ;
    med:systolic 142 ; med:diastolic 104 ;
    med:heartRate 73 ; med:temperature 100.4 ;
    med:spo2 96 ;
    med:weightKg 68.3 ;
    med:bmi 28.0 .

res:Note_5 a med:ClinicalNote ;
    med:authorName "Dr. Vandana" ;
    med:date "2026-08-27"^^xsd:date ;
    med:noteText "Presents with a two day history of symptoms. Advised on diet, salt restriction and daily walking." .

res:Lab_2 a med:LabOrder ;
    med:analyte "Creatinine" ; med:forPatient res:Pat_ARJ001 ;
    med:date "2026-08-27"^^xsd:date ; med:orderedBy res:Doc_Vandana ;
    med:testsFor res:ChronicKidneyDisease ;
    med:orderStatus "Pending" .

res:Lab_3 a med:LabOrder ;
    med:analyte "eGFR" ; med:forPatient res:Pat_ARJ001 ;
    med:date "2026-08-27"^^xsd:date ; med:orderedBy res:Doc_Vandana ;
    med:testsFor res:ChronicKidneyDisease ;
    med:orderStatus "Pending" .

res:Enc_5 med:orderedTest res:Lab_2 , res:Lab_3 .

res:Policy_ARJ001 a med:InsurancePolicy ;
    med:policyNumber "ST-270656" ;
    med:issuedBy res:Ins_StarHealth ; med:coveragePercent 60 ;
    med:amount 1000000 .
res:Pat_ARJ001 med:hasPolicy res:Policy_ARJ001 .

res:Appt_1 a med:Appointment ;
    med:forPatient res:Pat_ARJ001 ; med:appointmentWith res:Doc_Farida ;
    med:date "2026-09-21"^^xsd:date ;
    med:time "15:00" ;
    med:inDepartment res:Dept_Cardiology ;
    med:status "Scheduled" .
res:Pat_ARJ001 med:hasAppointment res:Appt_1 .

res:Pat_LAK002 a med:OutPatient ;
    med:name "Lakshmi Sundaram" ; med:mrn "MRN-LAK002" ; med:photoInitials "LS" ;
    med:sex "Female" ; med:dateOfBirth "1974-11-02"^^xsd:date ; med:age 51 ;
    med:bloodGroup "O+" ; med:phone "+91 95446 733876" ; med:email "lakshmi.sundaram@example.in" ;
    med:address "57 ECR, Sholinganallur, Chennai" ;
    med:primaryPhysician res:Doc_Priya ;
    med:allergicTo res:Allergen_Sulfa , res:Allergen_Iodine ;
    med:hasCondition res:Cond_5 , res:Cond_6 , res:Cond_7 .

res:Cond_5 a med:Condition ;
    med:ofDisease res:Stroke ; med:onsetDate "2025-07-03"^^xsd:date ;
    med:severity "Mild" ;
    med:clinicalStatus "Resolved" ;
    med:resolvedDate "2025-09-07"^^xsd:date ;
    med:diagnosedBy res:Doc_Priya .

res:Cond_6 a med:Condition ;
    med:ofDisease res:AtrialFibrillation ; med:onsetDate "2022-06-08"^^xsd:date ;
    med:severity "Moderate" ;
    med:clinicalStatus "Active" ;
    med:diagnosedBy res:Doc_Ramesh .

res:Cond_7 a med:Condition ;
    med:ofDisease res:TypeIIDiabetes ; med:onsetDate "2024-05-01"^^xsd:date ;
    med:severity "Mild" ;
    med:clinicalStatus "Active" ;
    med:diagnosedBy res:Doc_Nithya .

res:Pat_LAK002 med:hasEncounter res:Enc_6 , res:Enc_7 , res:Enc_8 , res:Enc_9 , res:Enc_10 , res:Enc_11 .

res:Enc_6 a med:Consultation ;
    med:encounterOf res:Pat_LAK002 ; med:date "2023-03-24"^^xsd:date ;
    med:time "18:00" ;
    med:attendedBy res:Doc_Ramesh ; med:inDepartment res:Dept_Cardiology ;
    med:reason "First presentation" ;
    med:outcome "Follow up scheduled" ;
    med:recordedCondition res:Cond_6 ;
    med:hasVitals res:Vit_6 ; med:hasNote res:Note_6 .

res:Vit_6 a med:VitalSigns ;
    med:systolic 121 ; med:diastolic 66 ;
    med:heartRate 75 ; med:temperature 97.4 ;
    med:spo2 98 ;
    med:weightKg 54.0 ;
    med:bmi 19.4 .

res:Note_6 a med:ClinicalNote ;
    med:authorName "Dr. Ramesh" ;
    med:date "2023-03-24"^^xsd:date ;
    med:noteText "Seen for worsening symptoms over the past week. Counselled on medication adherence. Red flag symptoms explained." .

res:Lab_4 a med:LabOrder ;
    med:analyte "INR" ; med:forPatient res:Pat_LAK002 ;
    med:date "2023-03-24"^^xsd:date ; med:orderedBy res:Doc_Ramesh ;
    med:testsFor res:AtrialFibrillation ;
    med:orderStatus "Resulted" ;
    med:hasResult res:Res_4 .

res:Res_4 a med:LabResult ;
    med:analyte "INR" ; med:value 2.47 ; med:unit "ratio" ;
    med:refLow 0.9 ; med:refHigh 1.2 ; med:outOfRange true ;
    med:date "2023-03-25"^^xsd:date ;
    med:performedBy res:Tech_Mohan .

res:Enc_6 med:orderedTest res:Lab_4 .

res:Enc_7 a med:Consultation ;
    med:encounterOf res:Pat_LAK002 ; med:date "2023-12-13"^^xsd:date ;
    med:time "13:45" ;
    med:attendedBy res:Doc_Farida ; med:inDepartment res:Dept_Cardiology ;
    med:reason "Review of atrial fibrillation" ;
    med:outcome "Referred for tests" ;
    med:recordedCondition res:Cond_6 ;
    med:hasVitals res:Vit_7 ; med:hasNote res:Note_7 .

res:Vit_7 a med:VitalSigns ;
    med:systolic 126 ; med:diastolic 67 ;
    med:heartRate 89 ; med:temperature 99.1 ;
    med:spo2 97 ;
    med:weightKg 56.9 ;
    med:bmi 21.4 .

res:Note_7 a med:ClinicalNote ;
    med:authorName "Dr. Farida" ;
    med:date "2023-12-13"^^xsd:date ;
    med:noteText "Presents with a two day history of symptoms. Advised on diet, salt restriction and daily walking." .

res:Rx_4 a med:Prescription ;
    med:prescribes res:Med_Warfarin ; med:prescribedBy res:Doc_Farida ;
    med:forPatient res:Pat_LAK002 ; med:date "2023-12-13"^^xsd:date ;
    med:dosage "1 tablet" ;
    med:frequency "Once daily at night" ;
    med:durationDays 90 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_7 med:issuedPrescription res:Rx_4 .
res:Pat_LAK002 med:hasPrescription res:Rx_4 .

res:Lab_5 a med:LabOrder ;
    med:analyte "INR" ; med:forPatient res:Pat_LAK002 ;
    med:date "2023-12-13"^^xsd:date ; med:orderedBy res:Doc_Farida ;
    med:testsFor res:AtrialFibrillation ;
    med:orderStatus "Resulted" ;
    med:hasResult res:Res_5 .

res:Res_5 a med:LabResult ;
    med:analyte "INR" ; med:value 1.88 ; med:unit "ratio" ;
    med:refLow 0.9 ; med:refHigh 1.2 ; med:outOfRange true ;
    med:date "2023-12-14"^^xsd:date ;
    med:performedBy res:Tech_Mohan .

res:Enc_7 med:orderedTest res:Lab_5 .

res:Inv_3 a med:Invoice ;
    med:forPatient res:Pat_LAK002 ; med:date "2023-12-13"^^xsd:date ;
    med:amount 2489 ; med:paid true ;
    med:status "Settled" .
res:Inv_3 med:coveredBy res:Policy_LAK002 .
res:Pat_LAK002 med:hasInvoice res:Inv_3 .

res:Enc_8 a med:Screening ;
    med:encounterOf res:Pat_LAK002 ; med:date "2024-08-22"^^xsd:date ;
    med:time "09:30" ;
    med:attendedBy res:Doc_Priya ; med:inDepartment res:Dept_Neurology ;
    med:reason "Review of stroke" ;
    med:outcome "Follow up scheduled" ;
    med:recordedCondition res:Cond_5 ;
    med:hasVitals res:Vit_8 ; med:hasNote res:Note_8 .

res:Vit_8 a med:VitalSigns ;
    med:systolic 118 ; med:diastolic 73 ;
    med:heartRate 86 ; med:temperature 98.3 ;
    med:spo2 97 ;
    med:weightKg 61.3 ;
    med:bmi 26.2 .

res:Note_8 a med:ClinicalNote ;
    med:authorName "Dr. Priya" ;
    med:date "2024-08-22"^^xsd:date ;
    med:noteText "Reviewed in clinic today. Reassured. No change to treatment at this stage." .

res:Enc_9 a med:FollowUp ;
    med:encounterOf res:Pat_LAK002 ; med:date "2025-04-11"^^xsd:date ;
    med:time "13:15" ;
    med:attendedBy res:Doc_Ramesh ; med:inDepartment res:Dept_Cardiology ;
    med:reason "Review of atrial fibrillation" ;
    med:outcome "Treatment continued" ;
    med:recordedCondition res:Cond_6 ;
    med:hasVitals res:Vit_9 ; med:hasNote res:Note_9 .

res:Vit_9 a med:VitalSigns ;
    med:systolic 112 ; med:diastolic 73 ;
    med:heartRate 88 ; med:temperature 99.4 ;
    med:spo2 97 ;
    med:weightKg 58.7 ;
    med:bmi 20.6 .

res:Note_9 a med:ClinicalNote ;
    med:authorName "Dr. Ramesh" ;
    med:date "2025-04-11"^^xsd:date ;
    med:noteText "Attends for scheduled follow up. Advised on diet, salt restriction and daily walking." .

res:Lab_6 a med:LabOrder ;
    med:analyte "INR" ; med:forPatient res:Pat_LAK002 ;
    med:date "2025-04-11"^^xsd:date ; med:orderedBy res:Doc_Ramesh ;
    med:testsFor res:AtrialFibrillation ;
    med:orderStatus "Resulted" ;
    med:hasResult res:Res_6 .

res:Res_6 a med:LabResult ;
    med:analyte "INR" ; med:value 2.54 ; med:unit "ratio" ;
    med:refLow 0.9 ; med:refHigh 1.2 ; med:outOfRange true ;
    med:date "2025-04-12"^^xsd:date ;
    med:performedBy res:Tech_Mohan .

res:Enc_9 med:orderedTest res:Lab_6 .

res:Inv_4 a med:Invoice ;
    med:forPatient res:Pat_LAK002 ; med:date "2025-04-11"^^xsd:date ;
    med:amount 6146 ; med:paid true ;
    med:status "Settled" .
res:Inv_4 med:coveredBy res:Policy_LAK002 .
res:Pat_LAK002 med:hasInvoice res:Inv_4 .

res:Enc_10 a med:EmergencyVisit ;
    med:encounterOf res:Pat_LAK002 ; med:date "2026-01-07"^^xsd:date ;
    med:time "16:15" ;
    med:attendedBy res:Doc_Karthik ; med:inDepartment res:Dept_Emergency ;
    med:reason "Acute presentation" ;
    med:outcome "Discharged with advice" ;
    med:recordedCondition res:Cond_6 ;
    med:hasVitals res:Vit_10 ; med:hasNote res:Note_10 .

res:Vit_10 a med:VitalSigns ;
    med:systolic 114 ; med:diastolic 70 ;
    med:heartRate 103 ; med:temperature 99.4 ;
    med:spo2 97 ;
    med:weightKg 57.1 ;
    med:bmi 25.1 .

res:Note_10 a med:ClinicalNote ;
    med:authorName "Dr. Karthik" ;
    med:date "2026-01-07"^^xsd:date ;
    med:noteText "Referred from general medicine for specialist opinion. Continue current therapy, review in three months." .

res:Rx_5 a med:Prescription ;
    med:prescribes res:Med_Metoprolol ; med:prescribedBy res:Doc_Karthik ;
    med:forPatient res:Pat_LAK002 ; med:date "2026-01-07"^^xsd:date ;
    med:dosage "2 tablets" ;
    med:frequency "Twice daily" ;
    med:durationDays 60 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_10 med:issuedPrescription res:Rx_5 .
res:Pat_LAK002 med:hasPrescription res:Rx_5 .

res:Lab_7 a med:LabOrder ;
    med:analyte "INR" ; med:forPatient res:Pat_LAK002 ;
    med:date "2026-01-07"^^xsd:date ; med:orderedBy res:Doc_Karthik ;
    med:testsFor res:AtrialFibrillation ;
    med:orderStatus "Resulted" ;
    med:hasResult res:Res_7 .

res:Res_7 a med:LabResult ;
    med:analyte "INR" ; med:value 3.5 ; med:unit "ratio" ;
    med:refLow 0.9 ; med:refHigh 1.2 ; med:outOfRange true ;
    med:date "2026-01-08"^^xsd:date ;
    med:performedBy res:Tech_Mohan .

res:Enc_10 med:orderedTest res:Lab_7 .

res:Enc_11 a med:Consultation ;
    med:encounterOf res:Pat_LAK002 ; med:date "2026-08-18"^^xsd:date ;
    med:time "10:30" ;
    med:attendedBy res:Doc_Farida ; med:inDepartment res:Dept_Cardiology ;
    med:reason "Review of atrial fibrillation" ;
    med:outcome "Discharged with advice" ;
    med:recordedCondition res:Cond_6 ;
    med:hasVitals res:Vit_11 ; med:hasNote res:Note_11 .

res:Vit_11 a med:VitalSigns ;
    med:systolic 110 ; med:diastolic 81 ;
    med:heartRate 102 ; med:temperature 99.7 ;
    med:spo2 98 ;
    med:weightKg 66.3 ;
    med:bmi 20.7 .

res:Note_11 a med:ClinicalNote ;
    med:authorName "Dr. Farida" ;
    med:date "2026-08-18"^^xsd:date ;
    med:noteText "Patient reports steady improvement since last visit. Dose adjusted, repeat bloods before next visit." .

res:Rx_6 a med:Prescription ;
    med:prescribes res:Med_Metoprolol ; med:prescribedBy res:Doc_Farida ;
    med:forPatient res:Pat_LAK002 ; med:date "2026-08-18"^^xsd:date ;
    med:dosage "2 tablets" ;
    med:frequency "Twice daily" ;
    med:durationDays 30 ;
    med:dispensed false ;
    med:status "Active" .

res:Enc_11 med:issuedPrescription res:Rx_6 .
res:Pat_LAK002 med:hasPrescription res:Rx_6 .

res:Lab_8 a med:LabOrder ;
    med:analyte "INR" ; med:forPatient res:Pat_LAK002 ;
    med:date "2026-08-18"^^xsd:date ; med:orderedBy res:Doc_Farida ;
    med:testsFor res:AtrialFibrillation ;
    med:orderStatus "Resulted" ;
    med:hasResult res:Res_8 .

res:Res_8 a med:LabResult ;
    med:analyte "INR" ; med:value 4.43 ; med:unit "ratio" ;
    med:refLow 0.9 ; med:refHigh 1.2 ; med:outOfRange true ;
    med:date "2026-08-19"^^xsd:date ;
    med:performedBy res:Tech_Mohan .

res:Enc_11 med:orderedTest res:Lab_8 .

res:Inv_5 a med:Invoice ;
    med:forPatient res:Pat_LAK002 ; med:date "2026-08-18"^^xsd:date ;
    med:amount 2912 ; med:paid true ;
    med:status "Settled" .
res:Inv_5 med:coveredBy res:Policy_LAK002 .
res:Pat_LAK002 med:hasInvoice res:Inv_5 .

res:Policy_LAK002 a med:InsurancePolicy ;
    med:policyNumber "ST-889517" ;
    med:issuedBy res:Ins_StarHealth ; med:coveragePercent 70 ;
    med:amount 200000 .
res:Pat_LAK002 med:hasPolicy res:Policy_LAK002 .

res:Pat_DIV003 a med:OutPatient ;
    med:name "Divya Nambiar" ; med:mrn "MRN-DIV003" ; med:photoInitials "DN" ;
    med:sex "Female" ; med:dateOfBirth "1996-07-23"^^xsd:date ; med:age 30 ;
    med:bloodGroup "A+" ; med:phone "+91 99002 648338" ; med:email "divya.nambiar@example.in" ;
    med:address "24 Velachery Main Road, Pallikaranai, Chennai" ;
    med:primaryPhysician res:Doc_Sameer ;
    med:hasCondition res:Cond_8 , res:Cond_9 .

res:Cond_8 a med:Condition ;
    med:ofDisease res:Asthma ; med:onsetDate "2021-02-21"^^xsd:date ;
    med:severity "Moderate" ;
    med:clinicalStatus "Active" ;
    med:diagnosedBy res:Doc_Sameer .

res:Cond_9 a med:Condition ;
    med:ofDisease res:Pneumonia ; med:onsetDate "2026-06-29"^^xsd:date ;
    med:severity "Moderate" ;
    med:clinicalStatus "Resolved" ;
    med:resolvedDate "2026-08-30"^^xsd:date ;
    med:diagnosedBy res:Doc_Sameer .

res:Pat_DIV003 med:hasEncounter res:Enc_12 , res:Enc_13 , res:Enc_14 , res:Enc_15 , res:Enc_16 .

res:Enc_12 a med:Consultation ;
    med:encounterOf res:Pat_DIV003 ; med:date "2023-05-19"^^xsd:date ;
    med:time "12:30" ;
    med:attendedBy res:Doc_Joseph ; med:inDepartment res:Dept_Pulmonology ;
    med:reason "First presentation" ;
    med:outcome "Treatment continued" ;
    med:recordedCondition res:Cond_9 ;
    med:hasVitals res:Vit_12 ; med:hasNote res:Note_12 .

res:Vit_12 a med:VitalSigns ;
    med:systolic 121 ; med:diastolic 82 ;
    med:heartRate 84 ; med:temperature 100.4 ;
    med:spo2 93 ;
    med:weightKg 64.5 ;
    med:bmi 20.6 .

res:Note_12 a med:ClinicalNote ;
    med:authorName "Dr. Joseph" ;
    med:date "2023-05-19"^^xsd:date ;
    med:noteText "Referred from general medicine for specialist opinion. Referral raised to the relevant specialty." .

res:Rx_7 a med:Prescription ;
    med:prescribes res:Med_Azithromycin ; med:prescribedBy res:Doc_Joseph ;
    med:forPatient res:Pat_DIV003 ; med:date "2023-05-19"^^xsd:date ;
    med:dosage "2 tablets" ;
    med:frequency "Once daily" ;
    med:durationDays 14 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_12 med:issuedPrescription res:Rx_7 .
res:Pat_DIV003 med:hasPrescription res:Rx_7 .

res:Inv_6 a med:Invoice ;
    med:forPatient res:Pat_DIV003 ; med:date "2023-05-19"^^xsd:date ;
    med:amount 4455 ; med:paid true ;
    med:status "Settled" .
res:Inv_6 med:coveredBy res:Policy_DIV003 .
res:Pat_DIV003 med:hasInvoice res:Inv_6 .

res:Enc_13 a med:Consultation ;
    med:encounterOf res:Pat_DIV003 ; med:date "2024-03-30"^^xsd:date ;
    med:time "12:15" ;
    med:attendedBy res:Doc_Sameer ; med:inDepartment res:Dept_Pulmonology ;
    med:reason "Review of asthma" ;
    med:outcome "Treatment continued" ;
    med:recordedCondition res:Cond_8 ;
    med:hasVitals res:Vit_13 ; med:hasNote res:Note_13 .

res:Vit_13 a med:VitalSigns ;
    med:systolic 132 ; med:diastolic 67 ;
    med:heartRate 93 ; med:temperature 97.6 ;
    med:spo2 91 ;
    med:weightKg 58.3 ;
    med:bmi 23.2 .

res:Note_13 a med:ClinicalNote ;
    med:authorName "Dr. Sameer" ;
    med:date "2024-03-30"^^xsd:date ;
    med:noteText "Seen for worsening symptoms over the past week. Referral raised to the relevant specialty." .

res:Rx_8 a med:Prescription ;
    med:prescribes res:Med_Salbutamol ; med:prescribedBy res:Doc_Sameer ;
    med:forPatient res:Pat_DIV003 ; med:date "2024-03-30"^^xsd:date ;
    med:dosage "2 tablets" ;
    med:frequency "Once daily" ;
    med:durationDays 60 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_13 med:issuedPrescription res:Rx_8 .
res:Pat_DIV003 med:hasPrescription res:Rx_8 .

res:Inv_7 a med:Invoice ;
    med:forPatient res:Pat_DIV003 ; med:date "2024-03-30"^^xsd:date ;
    med:amount 5298 ; med:paid true ;
    med:status "Settled" .
res:Inv_7 med:coveredBy res:Policy_DIV003 .
res:Pat_DIV003 med:hasInvoice res:Inv_7 .

res:Enc_14 a med:Consultation ;
    med:encounterOf res:Pat_DIV003 ; med:date "2025-01-21"^^xsd:date ;
    med:time "18:15" ;
    med:attendedBy res:Doc_Sameer ; med:inDepartment res:Dept_Pulmonology ;
    med:reason "Review of asthma" ;
    med:outcome "Discharged with advice" ;
    med:recordedCondition res:Cond_8 ;
    med:hasVitals res:Vit_14 ; med:hasNote res:Note_14 .

res:Vit_14 a med:VitalSigns ;
    med:systolic 112 ; med:diastolic 72 ;
    med:heartRate 68 ; med:temperature 100.5 ;
    med:spo2 94 ;
    med:weightKg 56.3 ;
    med:bmi 26.3 .

res:Note_14 a med:ClinicalNote ;
    med:authorName "Dr. Sameer" ;
    med:date "2025-01-21"^^xsd:date ;
    med:noteText "Patient reports steady improvement since last visit. Referral raised to the relevant specialty." .

res:Rx_9 a med:Prescription ;
    med:prescribes res:Med_Salbutamol ; med:prescribedBy res:Doc_Sameer ;
    med:forPatient res:Pat_DIV003 ; med:date "2025-01-21"^^xsd:date ;
    med:dosage "1 tablet" ;
    med:frequency "Once daily" ;
    med:durationDays 30 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_14 med:issuedPrescription res:Rx_9 .
res:Pat_DIV003 med:hasPrescription res:Rx_9 .

res:Inv_8 a med:Invoice ;
    med:forPatient res:Pat_DIV003 ; med:date "2025-01-21"^^xsd:date ;
    med:amount 1038 ; med:paid true ;
    med:status "Settled" .
res:Inv_8 med:coveredBy res:Policy_DIV003 .
res:Pat_DIV003 med:hasInvoice res:Inv_8 .

res:Enc_15 a med:Consultation ;
    med:encounterOf res:Pat_DIV003 ; med:date "2025-11-04"^^xsd:date ;
    med:time "14:00" ;
    med:attendedBy res:Doc_Joseph ; med:inDepartment res:Dept_Pulmonology ;
    med:reason "Review of pneumonia" ;
    med:outcome "Discharged with advice" ;
    med:recordedCondition res:Cond_9 ;
    med:hasVitals res:Vit_15 ; med:hasNote res:Note_15 .

res:Vit_15 a med:VitalSigns ;
    med:systolic 126 ; med:diastolic 66 ;
    med:heartRate 78 ; med:temperature 97.9 ;
    med:spo2 95 ;
    med:weightKg 69.6 ;
    med:bmi 26.4 .

res:Note_15 a med:ClinicalNote ;
    med:authorName "Dr. Joseph" ;
    med:date "2025-11-04"^^xsd:date ;
    med:noteText "Attends for scheduled follow up. Referral raised to the relevant specialty." .

res:Inv_9 a med:Invoice ;
    med:forPatient res:Pat_DIV003 ; med:date "2025-11-04"^^xsd:date ;
    med:amount 3581 ; med:paid true ;
    med:status "Settled" .
res:Inv_9 med:coveredBy res:Policy_DIV003 .
res:Pat_DIV003 med:hasInvoice res:Inv_9 .

res:Enc_16 a med:FollowUp ;
    med:encounterOf res:Pat_DIV003 ; med:date "2026-08-26"^^xsd:date ;
    med:time "12:15" ;
    med:attendedBy res:Doc_Sameer ; med:inDepartment res:Dept_Pulmonology ;
    med:reason "Review of asthma" ;
    med:outcome "Treatment continued" ;
    med:recordedCondition res:Cond_8 ;
    med:hasVitals res:Vit_16 ; med:hasNote res:Note_16 .

res:Vit_16 a med:VitalSigns ;
    med:systolic 131 ; med:diastolic 78 ;
    med:heartRate 95 ; med:temperature 99.2 ;
    med:spo2 90 ;
    med:weightKg 52.5 ;
    med:bmi 20.3 .

res:Note_16 a med:ClinicalNote ;
    med:authorName "Dr. Sameer" ;
    med:date "2026-08-26"^^xsd:date ;
    med:noteText "Seen for worsening symptoms over the past week. Investigations ordered, will call with results." .

res:Rx_10 a med:Prescription ;
    med:prescribes res:Med_Salbutamol ; med:prescribedBy res:Doc_Sameer ;
    med:forPatient res:Pat_DIV003 ; med:date "2026-08-26"^^xsd:date ;
    med:dosage "2 tablets" ;
    med:frequency "Twice daily" ;
    med:durationDays 60 ;
    med:dispensed false ;
    med:status "Active" .

res:Enc_16 med:issuedPrescription res:Rx_10 .
res:Pat_DIV003 med:hasPrescription res:Rx_10 .

res:Policy_DIV003 a med:InsurancePolicy ;
    med:policyNumber "ST-824129" ;
    med:issuedBy res:Ins_StarHealth ; med:coveragePercent 70 ;
    med:amount 750000 .
res:Pat_DIV003 med:hasPolicy res:Policy_DIV003 .

res:Appt_2 a med:Appointment ;
    med:forPatient res:Pat_DIV003 ; med:appointmentWith res:Doc_Sameer ;
    med:date "2026-09-04"^^xsd:date ;
    med:time "15:20" ;
    med:inDepartment res:Dept_Pulmonology ;
    med:status "Scheduled" .
res:Pat_DIV003 med:hasAppointment res:Appt_2 .

res:Pat_REK005 a med:OutPatient ;
    med:name "Rekha Iyer" ; med:mrn "MRN-REK005" ; med:photoInitials "RI" ;
    med:sex "Female" ; med:dateOfBirth "1979-08-08"^^xsd:date ; med:age 47 ;
    med:bloodGroup "B-" ; med:phone "+91 91398 946194" ; med:email "rekha.iyer@example.in" ;
    med:address "87 Kamarajar Street, Navalur, Chennai" ;
    med:primaryPhysician res:Doc_Anand ;
    med:hasCondition res:Cond_10 , res:Cond_11 , res:Cond_12 .

res:Cond_10 a med:Condition ;
    med:ofDisease res:BreastCancer ; med:onsetDate "2026-06-28"^^xsd:date ;
    med:severity "Mild" ;
    med:clinicalStatus "Resolved" ;
    med:resolvedDate "2026-08-26"^^xsd:date ;
    med:diagnosedBy res:Doc_Anand .

res:Cond_11 a med:Condition ;
    med:ofDisease res:COPD ; med:onsetDate "2018-05-31"^^xsd:date ;
    med:severity "Moderate" ;
    med:clinicalStatus "Active" ;
    med:diagnosedBy res:Doc_Sameer .

res:Cond_12 a med:Condition ;
    med:ofDisease res:SleepApnea ; med:onsetDate "2023-04-27"^^xsd:date ;
    med:severity "Moderate" ;
    med:clinicalStatus "Active" ;
    med:diagnosedBy res:Doc_Sameer .

res:Pat_REK005 med:hasEncounter res:Enc_17 , res:Enc_18 , res:Enc_19 .

res:Enc_17 a med:EmergencyVisit ;
    med:encounterOf res:Pat_REK005 ; med:date "2023-11-30"^^xsd:date ;
    med:time "17:45" ;
    med:attendedBy res:Doc_Karthik ; med:inDepartment res:Dept_Emergency ;
    med:reason "Acute presentation" ;
    med:outcome "Treatment continued" ;
    med:recordedCondition res:Cond_12 ;
    med:hasVitals res:Vit_17 ; med:hasNote res:Note_17 .

res:Vit_17 a med:VitalSigns ;
    med:systolic 113 ; med:diastolic 72 ;
    med:heartRate 62 ; med:temperature 97.4 ;
    med:spo2 92 ;
    med:weightKg 49.2 ;
    med:bmi 27.0 .

res:Note_17 a med:ClinicalNote ;
    med:authorName "Dr. Karthik" ;
    med:date "2023-11-30"^^xsd:date ;
    med:noteText "Referred from general medicine for specialist opinion. Dose adjusted, repeat bloods before next visit." .

res:Inv_10 a med:Invoice ;
    med:forPatient res:Pat_REK005 ; med:date "2023-11-30"^^xsd:date ;
    med:amount 14192 ; med:paid true ;
    med:status "Settled" .
res:Inv_10 med:coveredBy res:Policy_REK005 .
res:Pat_REK005 med:hasInvoice res:Inv_10 .

res:Enc_18 a med:FollowUp ;
    med:encounterOf res:Pat_REK005 ; med:date "2025-04-28"^^xsd:date ;
    med:time "08:30" ;
    med:attendedBy res:Doc_Sameer ; med:inDepartment res:Dept_Pulmonology ;
    med:reason "Review of sleep apnea" ;
    med:outcome "Discharged with advice" ;
    med:recordedCondition res:Cond_12 ;
    med:hasVitals res:Vit_18 ; med:hasNote res:Note_18 .

res:Vit_18 a med:VitalSigns ;
    med:systolic 113 ; med:diastolic 70 ;
    med:heartRate 73 ; med:temperature 100.5 ;
    med:spo2 92 ;
    med:weightKg 75.7 ;
    med:bmi 23.6 .

res:Note_18 a med:ClinicalNote ;
    med:authorName "Dr. Sameer" ;
    med:date "2025-04-28"^^xsd:date ;
    med:noteText "Attends for scheduled follow up. Continue current therapy, review in three months." .

res:Inv_11 a med:Invoice ;
    med:forPatient res:Pat_REK005 ; med:date "2025-04-28"^^xsd:date ;
    med:amount 4791 ; med:paid true ;
    med:status "Settled" .
res:Inv_11 med:coveredBy res:Policy_REK005 .
res:Pat_REK005 med:hasInvoice res:Inv_11 .

res:Enc_19 a med:FollowUp ;
    med:encounterOf res:Pat_REK005 ; med:date "2026-08-29"^^xsd:date ;
    med:time "12:30" ;
    med:attendedBy res:Doc_Sameer ; med:inDepartment res:Dept_Pulmonology ;
    med:reason "Review of sleep apnea" ;
    med:outcome "Follow up scheduled" ;
    med:recordedCondition res:Cond_12 ;
    med:hasVitals res:Vit_19 ; med:hasNote res:Note_19 .

res:Vit_19 a med:VitalSigns ;
    med:systolic 120 ; med:diastolic 76 ;
    med:heartRate 65 ; med:temperature 99.8 ;
    med:spo2 90 ;
    med:weightKg 73.7 ;
    med:bmi 24.2 .

res:Note_19 a med:ClinicalNote ;
    med:authorName "Dr. Sameer" ;
    med:date "2026-08-29"^^xsd:date ;
    med:noteText "Seen for worsening symptoms over the past week. Counselled on medication adherence. Red flag symptoms explained." .

res:Inv_12 a med:Invoice ;
    med:forPatient res:Pat_REK005 ; med:date "2026-08-29"^^xsd:date ;
    med:amount 4499 ; med:paid true ;
    med:status "Settled" .
res:Inv_12 med:coveredBy res:Policy_REK005 .
res:Pat_REK005 med:hasInvoice res:Inv_12 .

res:Policy_REK005 a med:InsurancePolicy ;
    med:policyNumber "HD-849833" ;
    med:issuedBy res:Ins_HDFCErgo ; med:coveragePercent 80 ;
    med:amount 1000000 .
res:Pat_REK005 med:hasPolicy res:Policy_REK005 .

res:Appt_3 a med:Appointment ;
    med:forPatient res:Pat_REK005 ; med:appointmentWith res:Doc_Anand ;
    med:date "2026-09-15"^^xsd:date ;
    med:time "13:20" ;
    med:inDepartment res:Dept_Oncology ;
    med:status "Scheduled" .
res:Pat_REK005 med:hasAppointment res:Appt_3 .

res:Pat_GOP006 a med:InPatient ;
    med:name "Gopal Reddy" ; med:mrn "MRN-GOP006" ; med:photoInitials "GR" ;
    med:sex "Male" ; med:dateOfBirth "1951-02-19"^^xsd:date ; med:age 75 ;
    med:bloodGroup "A-" ; med:phone "+91 91858 594355" ; med:email "gopal.reddy@example.in" ;
    med:address "13 Gandhi Nagar 2nd Cross, Pallikaranai, Chennai" ;
    med:primaryPhysician res:Doc_Nithya ;
    med:hasCondition res:Cond_13 , res:Cond_14 , res:Cond_15 , res:Cond_16 .

res:Cond_13 a med:Condition ;
    med:ofDisease res:TypeIIDiabetes ; med:onsetDate "2025-03-31"^^xsd:date ;
    med:severity "Moderate" ;
    med:clinicalStatus "Active" ;
    med:diagnosedBy res:Doc_Nithya .

res:Cond_14 a med:Condition ;
    med:ofDisease res:Dyslipidemia ; med:onsetDate "2021-02-01"^^xsd:date ;
    med:severity "Moderate" ;
    med:clinicalStatus "Active" ;
    med:diagnosedBy res:Doc_Suresh .

res:Cond_15 a med:Condition ;
    med:ofDisease res:Obesity ; med:onsetDate "2017-01-24"^^xsd:date ;
    med:severity "Moderate" ;
    med:clinicalStatus "Active" ;
    med:diagnosedBy res:Doc_Suresh .

res:Cond_16 a med:Condition ;
    med:ofDisease res:ChronicKidneyDisease ; med:onsetDate "2025-07-26"^^xsd:date ;
    med:severity "Moderate" ;
    med:clinicalStatus "Active" ;
    med:diagnosedBy res:Doc_Vandana .

res:Pat_GOP006 med:hasEncounter res:Enc_20 , res:Enc_21 , res:Enc_22 , res:Enc_23 , res:Enc_24 , res:Enc_25 , res:Enc_26 .

res:Enc_20 a med:Consultation ;
    med:encounterOf res:Pat_GOP006 ; med:date "2023-03-11"^^xsd:date ;
    med:time "13:15" ;
    med:attendedBy res:Doc_Vandana ; med:inDepartment res:Dept_Nephrology ;
    med:reason "First presentation" ;
    med:outcome "Referred for tests" ;
    med:recordedCondition res:Cond_16 ;
    med:hasVitals res:Vit_20 ; med:hasNote res:Note_20 .

res:Vit_20 a med:VitalSigns ;
    med:systolic 119 ; med:diastolic 66 ;
    med:heartRate 78 ; med:temperature 97.3 ;
    med:spo2 99 ;
    med:weightKg 81.7 ;
    med:bmi 35.4 .

res:Note_20 a med:ClinicalNote ;
    med:authorName "Dr. Vandana" ;
    med:date "2023-03-11"^^xsd:date ;
    med:noteText "Patient reports steady improvement since last visit. Dose adjusted, repeat bloods before next visit." .

res:Rx_11 a med:Prescription ;
    med:prescribes res:Med_Telmisartan ; med:prescribedBy res:Doc_Vandana ;
    med:forPatient res:Pat_GOP006 ; med:date "2023-03-11"^^xsd:date ;
    med:dosage "1 tablet" ;
    med:frequency "Three times daily" ;
    med:durationDays 90 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_20 med:issuedPrescription res:Rx_11 .
res:Pat_GOP006 med:hasPrescription res:Rx_11 .

res:Inv_13 a med:Invoice ;
    med:forPatient res:Pat_GOP006 ; med:date "2023-03-11"^^xsd:date ;
    med:amount 1290 ; med:paid true ;
    med:status "Settled" .
res:Inv_13 med:coveredBy res:Policy_GOP006 .
res:Pat_GOP006 med:hasInvoice res:Inv_13 .

res:Enc_21 a med:Consultation ;
    med:encounterOf res:Pat_GOP006 ; med:date "2023-10-08"^^xsd:date ;
    med:time "16:30" ;
    med:attendedBy res:Doc_Suresh ; med:inDepartment res:Dept_GeneralMedicine ;
    med:reason "Review of dyslipidemia" ;
    med:outcome "Treatment continued" ;
    med:recordedCondition res:Cond_14 ;
    med:hasVitals res:Vit_21 ; med:hasNote res:Note_21 .

res:Vit_21 a med:VitalSigns ;
    med:systolic 116 ; med:diastolic 71 ;
    med:heartRate 88 ; med:temperature 98.4 ;
    med:spo2 98 ;
    med:weightKg 104.8 ;
    med:bmi 31.2 .

res:Note_21 a med:ClinicalNote ;
    med:authorName "Dr. Suresh" ;
    med:date "2023-10-08"^^xsd:date ;
    med:noteText "Routine review, no new complaints. Advised on diet, salt restriction and daily walking." .

res:Rx_12 a med:Prescription ;
    med:prescribes res:Med_Atorvastatin ; med:prescribedBy res:Doc_Suresh ;
    med:forPatient res:Pat_GOP006 ; med:date "2023-10-08"^^xsd:date ;
    med:dosage "1 tablet" ;
    med:frequency "Twice daily" ;
    med:durationDays 90 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_21 med:issuedPrescription res:Rx_12 .
res:Pat_GOP006 med:hasPrescription res:Rx_12 .

res:Inv_14 a med:Invoice ;
    med:forPatient res:Pat_GOP006 ; med:date "2023-10-08"^^xsd:date ;
    med:amount 4691 ; med:paid true ;
    med:status "Settled" .
res:Inv_14 med:coveredBy res:Policy_GOP006 .
res:Pat_GOP006 med:hasInvoice res:Inv_14 .

res:Enc_22 a med:FollowUp ;
    med:encounterOf res:Pat_GOP006 ; med:date "2024-04-09"^^xsd:date ;
    med:time "10:00" ;
    med:attendedBy res:Doc_Nithya ; med:inDepartment res:Dept_Endocrinology ;
    med:reason "Review of type i i diabetes" ;
    med:outcome "Follow up scheduled" ;
    med:recordedCondition res:Cond_13 ;
    med:hasVitals res:Vit_22 ; med:hasNote res:Note_22 .

res:Vit_22 a med:VitalSigns ;
    med:systolic 121 ; med:diastolic 73 ;
    med:heartRate 89 ; med:temperature 98.2 ;
    med:spo2 97 ;
    med:weightKg 92.3 ;
    med:bmi 36.5 .

res:Note_22 a med:ClinicalNote ;
    med:authorName "Dr. Nithya" ;
    med:date "2024-04-09"^^xsd:date ;
    med:noteText "Post discharge review. Referral raised to the relevant specialty." .

res:Rx_13 a med:Prescription ;
    med:prescribes res:Med_Metformin ; med:prescribedBy res:Doc_Nithya ;
    med:forPatient res:Pat_GOP006 ; med:date "2024-04-09"^^xsd:date ;
    med:dosage "1 dose" ;
    med:frequency "Three times daily" ;
    med:durationDays 90 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_22 med:issuedPrescription res:Rx_13 .
res:Pat_GOP006 med:hasPrescription res:Rx_13 .

res:Lab_9 a med:LabOrder ;
    med:analyte "HbA1c" ; med:forPatient res:Pat_GOP006 ;
    med:date "2024-04-09"^^xsd:date ; med:orderedBy res:Doc_Nithya ;
    med:testsFor res:TypeIIDiabetes ;
    med:orderStatus "Resulted" ;
    med:hasResult res:Res_9 .

res:Res_9 a med:LabResult ;
    med:analyte "HbA1c" ; med:value 7.78 ; med:unit "%" ;
    med:refLow 4 ; med:refHigh 5.6 ; med:outOfRange true ;
    med:date "2024-04-10"^^xsd:date ;
    med:performedBy res:Tech_Mohan .

res:Lab_10 a med:LabOrder ;
    med:analyte "Fasting glucose" ; med:forPatient res:Pat_GOP006 ;
    med:date "2024-04-09"^^xsd:date ; med:orderedBy res:Doc_Nithya ;
    med:testsFor res:TypeIIDiabetes ;
    med:orderStatus "Resulted" ;
    med:hasResult res:Res_10 .

res:Res_10 a med:LabResult ;
    med:analyte "Fasting glucose" ; med:value 138.37 ; med:unit "mg/dL" ;
    med:refLow 70 ; med:refHigh 100 ; med:outOfRange true ;
    med:date "2024-04-10"^^xsd:date ;
    med:performedBy res:Tech_Mohan .

res:Enc_22 med:orderedTest res:Lab_9 , res:Lab_10 .

res:Enc_23 a med:Consultation ;
    med:encounterOf res:Pat_GOP006 ; med:date "2024-12-03"^^xsd:date ;
    med:time "13:45" ;
    med:attendedBy res:Doc_Vandana ; med:inDepartment res:Dept_Nephrology ;
    med:reason "Review of chronic kidney disease" ;
    med:outcome "Referred for tests" ;
    med:recordedCondition res:Cond_16 ;
    med:hasVitals res:Vit_23 ; med:hasNote res:Note_23 .

res:Vit_23 a med:VitalSigns ;
    med:systolic 132 ; med:diastolic 77 ;
    med:heartRate 68 ; med:temperature 98.4 ;
    med:spo2 99 ;
    med:weightKg 95.3 ;
    med:bmi 33.4 .

res:Note_23 a med:ClinicalNote ;
    med:authorName "Dr. Vandana" ;
    med:date "2024-12-03"^^xsd:date ;
    med:noteText "Presents with a two day history of symptoms. Reassured. No change to treatment at this stage." .

res:Rx_14 a med:Prescription ;
    med:prescribes res:Med_Telmisartan ; med:prescribedBy res:Doc_Vandana ;
    med:forPatient res:Pat_GOP006 ; med:date "2024-12-03"^^xsd:date ;
    med:dosage "1 dose" ;
    med:frequency "Three times daily" ;
    med:durationDays 90 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_23 med:issuedPrescription res:Rx_14 .
res:Pat_GOP006 med:hasPrescription res:Rx_14 .

res:Lab_11 a med:LabOrder ;
    med:analyte "Creatinine" ; med:forPatient res:Pat_GOP006 ;
    med:date "2024-12-03"^^xsd:date ; med:orderedBy res:Doc_Vandana ;
    med:testsFor res:ChronicKidneyDisease ;
    med:orderStatus "Resulted" ;
    med:hasResult res:Res_11 .

res:Res_11 a med:LabResult ;
    med:analyte "Creatinine" ; med:value 5.43 ; med:unit "mg/dL" ;
    med:refLow 0.6 ; med:refHigh 1.2 ; med:outOfRange true ;
    med:date "2024-12-04"^^xsd:date ;
    med:performedBy res:Tech_Mohan .

res:Lab_12 a med:LabOrder ;
    med:analyte "eGFR" ; med:forPatient res:Pat_GOP006 ;
    med:date "2024-12-03"^^xsd:date ; med:orderedBy res:Doc_Vandana ;
    med:testsFor res:ChronicKidneyDisease ;
    med:orderStatus "Resulted" ;
    med:hasResult res:Res_12 .

res:Res_12 a med:LabResult ;
    med:analyte "eGFR" ; med:value 29.69 ; med:unit "mL/min" ;
    med:refLow 90 ; med:refHigh 120 ; med:outOfRange true ;
    med:date "2024-12-04"^^xsd:date ;
    med:performedBy res:Tech_Mohan .

res:Enc_23 med:orderedTest res:Lab_11 , res:Lab_12 .

res:Inv_15 a med:Invoice ;
    med:forPatient res:Pat_GOP006 ; med:date "2024-12-03"^^xsd:date ;
    med:amount 2565 ; med:paid true ;
    med:status "Settled" .
res:Inv_15 med:coveredBy res:Policy_GOP006 .
res:Pat_GOP006 med:hasInvoice res:Inv_15 .

res:Enc_24 a med:Admission ;
    med:encounterOf res:Pat_GOP006 ; med:date "2025-07-06"^^xsd:date ;
    med:time "08:30" ;
    med:attendedBy res:Doc_Nithya ; med:inDepartment res:Dept_Endocrinology ;
    med:reason "Review of type i i diabetes" ;
    med:outcome "Admitted to ward" ;
    med:lengthOfStay 11 ;
    med:recordedCondition res:Cond_13 ;
    med:hasVitals res:Vit_24 ; med:hasNote res:Note_24 .

res:Vit_24 a med:VitalSigns ;
    med:systolic 109 ; med:diastolic 72 ;
    med:heartRate 68 ; med:temperature 98.6 ;
    med:spo2 97 ;
    med:weightKg 83.4 ;
    med:bmi 32.5 .

res:Note_24 a med:ClinicalNote ;
    med:authorName "Dr. Nithya" ;
    med:date "2025-07-06"^^xsd:date ;
    med:noteText "Routine review, no new complaints. Continue current therapy, review in three months." .

res:Inv_16 a med:Invoice ;
    med:forPatient res:Pat_GOP006 ; med:date "2025-07-06"^^xsd:date ;
    med:amount 91994 ; med:paid true ;
    med:status "Settled" .
res:Inv_16 med:coveredBy res:Policy_GOP006 .
res:Pat_GOP006 med:hasInvoice res:Inv_16 .

res:Enc_25 a med:FollowUp ;
    med:encounterOf res:Pat_GOP006 ; med:date "2026-01-22"^^xsd:date ;
    med:time "17:15" ;
    med:attendedBy res:Doc_Vandana ; med:inDepartment res:Dept_Nephrology ;
    med:reason "Review of chronic kidney disease" ;
    med:outcome "Discharged with advice" ;
    med:recordedCondition res:Cond_16 ;
    med:hasVitals res:Vit_25 ; med:hasNote res:Note_25 .

res:Vit_25 a med:VitalSigns ;
    med:systolic 121 ; med:diastolic 82 ;
    med:heartRate 75 ; med:temperature 99.2 ;
    med:spo2 99 ;
    med:weightKg 96.2 ;
    med:bmi 36.4 .

res:Note_25 a med:ClinicalNote ;
    med:authorName "Dr. Vandana" ;
    med:date "2026-01-22"^^xsd:date ;
    med:noteText "Reviewed in clinic today. Advised on diet, salt restriction and daily walking." .

res:Lab_13 a med:LabOrder ;
    med:analyte "Creatinine" ; med:forPatient res:Pat_GOP006 ;
    med:date "2026-01-22"^^xsd:date ; med:orderedBy res:Doc_Vandana ;
    med:testsFor res:ChronicKidneyDisease ;
    med:orderStatus "Resulted" ;
    med:hasResult res:Res_13 .

res:Res_13 a med:LabResult ;
    med:analyte "Creatinine" ; med:value 3.64 ; med:unit "mg/dL" ;
    med:refLow 0.6 ; med:refHigh 1.2 ; med:outOfRange true ;
    med:date "2026-01-23"^^xsd:date ;
    med:performedBy res:Tech_Mohan .

res:Lab_14 a med:LabOrder ;
    med:analyte "eGFR" ; med:forPatient res:Pat_GOP006 ;
    med:date "2026-01-22"^^xsd:date ; med:orderedBy res:Doc_Vandana ;
    med:testsFor res:ChronicKidneyDisease ;
    med:orderStatus "Resulted" ;
    med:hasResult res:Res_14 .

res:Res_14 a med:LabResult ;
    med:analyte "eGFR" ; med:value 79.34 ; med:unit "mL/min" ;
    med:refLow 90 ; med:refHigh 120 ; med:outOfRange true ;
    med:date "2026-01-23"^^xsd:date ;
    med:performedBy res:Tech_Mohan .

res:Enc_25 med:orderedTest res:Lab_13 , res:Lab_14 .

res:Inv_17 a med:Invoice ;
    med:forPatient res:Pat_GOP006 ; med:date "2026-01-22"^^xsd:date ;
    med:amount 1813 ; med:paid true ;
    med:status "Settled" .
res:Inv_17 med:coveredBy res:Policy_GOP006 .
res:Pat_GOP006 med:hasInvoice res:Inv_17 .

res:Enc_26 a med:FollowUp ;
    med:encounterOf res:Pat_GOP006 ; med:date "2026-08-30"^^xsd:date ;
    med:time "09:15" ;
    med:attendedBy res:Doc_Vandana ; med:inDepartment res:Dept_Nephrology ;
    med:reason "Review of chronic kidney disease" ;
    med:outcome "Referred for tests" ;
    med:recordedCondition res:Cond_16 ;
    med:hasVitals res:Vit_26 ; med:hasNote res:Note_26 .

res:Vit_26 a med:VitalSigns ;
    med:systolic 114 ; med:diastolic 73 ;
    med:heartRate 90 ; med:temperature 97.8 ;
    med:spo2 96 ;
    med:weightKg 101.0 ;
    med:bmi 35.2 .

res:Note_26 a med:ClinicalNote ;
    med:authorName "Dr. Vandana" ;
    med:date "2026-08-30"^^xsd:date ;
    med:noteText "Routine review, no new complaints. Reassured. No change to treatment at this stage." .

res:Rx_15 a med:Prescription ;
    med:prescribes res:Med_Telmisartan ; med:prescribedBy res:Doc_Vandana ;
    med:forPatient res:Pat_GOP006 ; med:date "2026-08-30"^^xsd:date ;
    med:dosage "1 tablet" ;
    med:frequency "As required" ;
    med:durationDays 90 ;
    med:dispensed true ;
    med:status "Active" .

res:Enc_26 med:issuedPrescription res:Rx_15 .
res:Pat_GOP006 med:hasPrescription res:Rx_15 .

res:Policy_GOP006 a med:InsurancePolicy ;
    med:policyNumber "HD-972877" ;
    med:issuedBy res:Ins_HDFCErgo ; med:coveragePercent 85 ;
    med:amount 200000 .
res:Pat_GOP006 med:hasPolicy res:Policy_GOP006 .

res:Appt_4 a med:Appointment ;
    med:forPatient res:Pat_GOP006 ; med:appointmentWith res:Doc_Nithya ;
    med:date "2026-10-05"^^xsd:date ;
    med:time "14:20" ;
    med:inDepartment res:Dept_Endocrinology ;
    med:status "Scheduled" .
res:Pat_GOP006 med:hasAppointment res:Appt_4 .

res:Pat_GOP006 med:assignedBed res:Bed_11 .

res:Pat_IMR105 a med:OutPatient ;
    med:name "Imran Mehta" ; med:mrn "MRN-IMR105" ; med:photoInitials "IM" ;
    med:sex "Male" ; med:dateOfBirth "1968-05-06"^^xsd:date ; med:age 58 ;
    med:bloodGroup "AB-" ; med:phone "+91 94399 358703" ; med:email "imran.mehta@example.in" ;
    med:address "27 Gandhi Nagar 2nd Cross, Navalur, Chennai" ;
    med:primaryPhysician res:Doc_Ramesh ;
    med:hasCondition res:Cond_17 , res:Cond_18 , res:Cond_19 , res:Cond_20 .

res:Cond_17 a med:Condition ;
    med:ofDisease res:CoronaryArteryDisease ; med:onsetDate "2019-04-22"^^xsd:date ;
    med:severity "Mild" ;
    med:clinicalStatus "Active" ;
    med:diagnosedBy res:Doc_Farida .

res:Cond_18 a med:Condition ;
    med:ofDisease res:Hypertension ; med:onsetDate "2025-01-02"^^xsd:date ;
    med:severity "Moderate" ;
    med:clinicalStatus "Active" ;
    med:diagnosedBy res:Doc_Joseph .

res:Cond_19 a med:Condition ;
    med:ofDisease res:Dyslipidemia ; med:onsetDate "2019-11-27"^^xsd:date ;
    med:severity "Moderate" ;
    med:clinicalStatus "Active" ;
    med:diagnosedBy res:Doc_Joseph .

res:Cond_20 a med:Condition ;
    med:ofDisease res:TypeIIDiabetes ; med:onsetDate "2018-09-06"^^xsd:date ;
    med:severity "Moderate" ;
    med:clinicalStatus "Active" ;
    med:diagnosedBy res:Doc_Nithya .

res:Pat_IMR105 med:hasEncounter res:Enc_27 , res:Enc_28 , res:Enc_29 , res:Enc_30 , res:Enc_31 , res:Enc_32 .

res:Enc_27 a med:Consultation ;
    med:encounterOf res:Pat_IMR105 ; med:date "2023-04-01"^^xsd:date ;
    med:time "08:30" ;
    med:attendedBy res:Doc_Suresh ; med:inDepartment res:Dept_GeneralMedicine ;
    med:reason "First presentation" ;
    med:outcome "Referred for tests" ;
    med:recordedCondition res:Cond_19 ;
    med:hasVitals res:Vit_27 ; med:hasNote res:Note_27 .

res:Vit_27 a med:VitalSigns ;
    med:systolic 163 ; med:diastolic 92 ;
    med:heartRate 83 ; med:temperature 97.3 ;
    med:spo2 97 ;
    med:weightKg 48.9 ;
    med:bmi 23.9 .

res:Note_27 a med:ClinicalNote ;
    med:authorName "Dr. Suresh" ;
    med:date "2023-04-01"^^xsd:date ;
    med:noteText "Routine review, no new complaints. Continue current therapy, review in three months." .

res:Rx_16 a med:Prescription ;
    med:prescribes res:Med_Atorvastatin ; med:prescribedBy res:Doc_Suresh ;
    med:forPatient res:Pat_IMR105 ; med:date "2023-04-01"^^xsd:date ;
    med:dosage "1 tablet" ;
    med:frequency "As required" ;
    med:durationDays 90 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_27 med:issuedPrescription res:Rx_16 .
res:Pat_IMR105 med:hasPrescription res:Rx_16 .

res:Lab_15 a med:LabOrder ;
    med:analyte "LDL cholesterol" ; med:forPatient res:Pat_IMR105 ;
    med:date "2023-04-01"^^xsd:date ; med:orderedBy res:Doc_Suresh ;
    med:testsFor res:Dyslipidemia ;
    med:orderStatus "Resulted" ;
    med:hasResult res:Res_15 .

res:Res_15 a med:LabResult ;
    med:analyte "LDL cholesterol" ; med:value 119.66 ; med:unit "mg/dL" ;
    med:refLow 0 ; med:refHigh 100 ; med:outOfRange true ;
    med:date "2023-04-02"^^xsd:date ;
    med:performedBy res:Tech_Mohan .

res:Lab_16 a med:LabOrder ;
    med:analyte "Triglycerides" ; med:forPatient res:Pat_IMR105 ;
    med:date "2023-04-01"^^xsd:date ; med:orderedBy res:Doc_Suresh ;
    med:testsFor res:Dyslipidemia ;
    med:orderStatus "Resulted" ;
    med:hasResult res:Res_16 .

res:Res_16 a med:LabResult ;
    med:analyte "Triglycerides" ; med:value 168.4 ; med:unit "mg/dL" ;
    med:refLow 0 ; med:refHigh 150 ; med:outOfRange true ;
    med:date "2023-04-02"^^xsd:date ;
    med:performedBy res:Tech_Mohan .

res:Enc_27 med:orderedTest res:Lab_15 , res:Lab_16 .

res:Inv_18 a med:Invoice ;
    med:forPatient res:Pat_IMR105 ; med:date "2023-04-01"^^xsd:date ;
    med:amount 6061 ; med:paid false ;
    med:status "Insurance claim pending" .
res:Inv_18 med:coveredBy res:Policy_IMR105 .
res:Pat_IMR105 med:hasInvoice res:Inv_18 .

res:Enc_28 a med:Consultation ;
    med:encounterOf res:Pat_IMR105 ; med:date "2023-12-05"^^xsd:date ;
    med:time "08:45" ;
    med:attendedBy res:Doc_Nithya ; med:inDepartment res:Dept_Endocrinology ;
    med:reason "Review of type i i diabetes" ;
    med:outcome "Treatment continued" ;
    med:recordedCondition res:Cond_20 ;
    med:hasVitals res:Vit_28 ; med:hasNote res:Note_28 .

res:Vit_28 a med:VitalSigns ;
    med:systolic 156 ; med:diastolic 86 ;
    med:heartRate 87 ; med:temperature 98.1 ;
    med:spo2 96 ;
    med:weightKg 50.6 ;
    med:bmi 21.6 .

res:Note_28 a med:ClinicalNote ;
    med:authorName "Dr. Nithya" ;
    med:date "2023-12-05"^^xsd:date ;
    med:noteText "Reviewed in clinic today. Referral raised to the relevant specialty." .

res:Rx_17 a med:Prescription ;
    med:prescribes res:Med_Insulin ; med:prescribedBy res:Doc_Nithya ;
    med:forPatient res:Pat_IMR105 ; med:date "2023-12-05"^^xsd:date ;
    med:dosage "2 tablets" ;
    med:frequency "Twice daily" ;
    med:durationDays 60 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_28 med:issuedPrescription res:Rx_17 .
res:Pat_IMR105 med:hasPrescription res:Rx_17 .

res:Lab_17 a med:LabOrder ;
    med:analyte "HbA1c" ; med:forPatient res:Pat_IMR105 ;
    med:date "2023-12-05"^^xsd:date ; med:orderedBy res:Doc_Nithya ;
    med:testsFor res:TypeIIDiabetes ;
    med:orderStatus "Resulted" ;
    med:hasResult res:Res_17 .

res:Res_17 a med:LabResult ;
    med:analyte "HbA1c" ; med:value 7.43 ; med:unit "%" ;
    med:refLow 4 ; med:refHigh 5.6 ; med:outOfRange true ;
    med:date "2023-12-06"^^xsd:date ;
    med:performedBy res:Tech_Mohan .

res:Lab_18 a med:LabOrder ;
    med:analyte "Fasting glucose" ; med:forPatient res:Pat_IMR105 ;
    med:date "2023-12-05"^^xsd:date ; med:orderedBy res:Doc_Nithya ;
    med:testsFor res:TypeIIDiabetes ;
    med:orderStatus "Resulted" ;
    med:hasResult res:Res_18 .

res:Res_18 a med:LabResult ;
    med:analyte "Fasting glucose" ; med:value 192.72 ; med:unit "mg/dL" ;
    med:refLow 70 ; med:refHigh 100 ; med:outOfRange true ;
    med:date "2023-12-06"^^xsd:date ;
    med:performedBy res:Tech_Mohan .

res:Enc_28 med:orderedTest res:Lab_17 , res:Lab_18 .

res:Inv_19 a med:Invoice ;
    med:forPatient res:Pat_IMR105 ; med:date "2023-12-05"^^xsd:date ;
    med:amount 5062 ; med:paid true ;
    med:status "Settled" .
res:Inv_19 med:coveredBy res:Policy_IMR105 .
res:Pat_IMR105 med:hasInvoice res:Inv_19 .

res:Enc_29 a med:Consultation ;
    med:encounterOf res:Pat_IMR105 ; med:date "2024-08-18"^^xsd:date ;
    med:time "11:30" ;
    med:attendedBy res:Doc_Joseph ; med:inDepartment res:Dept_GeneralMedicine ;
    med:reason "Review of dyslipidemia" ;
    med:outcome "Discharged with advice" ;
    med:recordedCondition res:Cond_19 ;
    med:hasVitals res:Vit_29 ; med:hasNote res:Note_29 .

res:Vit_29 a med:VitalSigns ;
    med:systolic 159 ; med:diastolic 102 ;
    med:heartRate 64 ; med:temperature 99.5 ;
    med:spo2 99 ;
    med:weightKg 71.0 ;
    med:bmi 27.7 .

res:Note_29 a med:ClinicalNote ;
    med:authorName "Dr. Joseph" ;
    med:date "2024-08-18"^^xsd:date ;
    med:noteText "Patient reports steady improvement since last visit. Dose adjusted, repeat bloods before next visit." .

res:Rx_18 a med:Prescription ;
    med:prescribes res:Med_Atorvastatin ; med:prescribedBy res:Doc_Joseph ;
    med:forPatient res:Pat_IMR105 ; med:date "2024-08-18"^^xsd:date ;
    med:dosage "2 tablets" ;
    med:frequency "Once daily at night" ;
    med:durationDays 60 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_29 med:issuedPrescription res:Rx_18 .
res:Pat_IMR105 med:hasPrescription res:Rx_18 .

res:Lab_19 a med:LabOrder ;
    med:analyte "LDL cholesterol" ; med:forPatient res:Pat_IMR105 ;
    med:date "2024-08-18"^^xsd:date ; med:orderedBy res:Doc_Joseph ;
    med:testsFor res:Dyslipidemia ;
    med:orderStatus "Resulted" ;
    med:hasResult res:Res_19 .

res:Res_19 a med:LabResult ;
    med:analyte "LDL cholesterol" ; med:value 189.8 ; med:unit "mg/dL" ;
    med:refLow 0 ; med:refHigh 100 ; med:outOfRange true ;
    med:date "2024-08-19"^^xsd:date ;
    med:performedBy res:Tech_Mohan .

res:Lab_20 a med:LabOrder ;
    med:analyte "Triglycerides" ; med:forPatient res:Pat_IMR105 ;
    med:date "2024-08-18"^^xsd:date ; med:orderedBy res:Doc_Joseph ;
    med:testsFor res:Dyslipidemia ;
    med:orderStatus "Resulted" ;
    med:hasResult res:Res_20 .

res:Res_20 a med:LabResult ;
    med:analyte "Triglycerides" ; med:value 300.91 ; med:unit "mg/dL" ;
    med:refLow 0 ; med:refHigh 150 ; med:outOfRange true ;
    med:date "2024-08-19"^^xsd:date ;
    med:performedBy res:Tech_Mohan .

res:Enc_29 med:orderedTest res:Lab_19 , res:Lab_20 .

res:Inv_20 a med:Invoice ;
    med:forPatient res:Pat_IMR105 ; med:date "2024-08-18"^^xsd:date ;
    med:amount 4834 ; med:paid true ;
    med:status "Settled" .
res:Inv_20 med:coveredBy res:Policy_IMR105 .
res:Pat_IMR105 med:hasInvoice res:Inv_20 .

res:Enc_30 a med:DayCareVisit ;
    med:encounterOf res:Pat_IMR105 ; med:date "2025-04-23"^^xsd:date ;
    med:time "10:15" ;
    med:attendedBy res:Doc_Nithya ; med:inDepartment res:Dept_Endocrinology ;
    med:reason "Review of type i i diabetes" ;
    med:outcome "Referred for tests" ;
    med:recordedCondition res:Cond_20 ;
    med:hasVitals res:Vit_30 ; med:hasNote res:Note_30 .

res:Vit_30 a med:VitalSigns ;
    med:systolic 158 ; med:diastolic 90 ;
    med:heartRate 79 ; med:temperature 99.6 ;
    med:spo2 99 ;
    med:weightKg 52.8 ;
    med:bmi 19.1 .

res:Note_30 a med:ClinicalNote ;
    med:authorName "Dr. Nithya" ;
    med:date "2025-04-23"^^xsd:date ;
    med:noteText "Post discharge review. Continue current therapy, review in three months." .

res:Rx_19 a med:Prescription ;
    med:prescribes res:Med_Insulin ; med:prescribedBy res:Doc_Nithya ;
    med:forPatient res:Pat_IMR105 ; med:date "2025-04-23"^^xsd:date ;
    med:dosage "1 dose" ;
    med:frequency "As required" ;
    med:durationDays 90 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_30 med:issuedPrescription res:Rx_19 .
res:Pat_IMR105 med:hasPrescription res:Rx_19 .

res:Inv_21 a med:Invoice ;
    med:forPatient res:Pat_IMR105 ; med:date "2025-04-23"^^xsd:date ;
    med:amount 5351 ; med:paid true ;
    med:status "Settled" .
res:Inv_21 med:coveredBy res:Policy_IMR105 .
res:Pat_IMR105 med:hasInvoice res:Inv_21 .

res:Enc_31 a med:FollowUp ;
    med:encounterOf res:Pat_IMR105 ; med:date "2025-12-27"^^xsd:date ;
    med:time "13:15" ;
    med:attendedBy res:Doc_Nithya ; med:inDepartment res:Dept_Endocrinology ;
    med:reason "Review of type i i diabetes" ;
    med:outcome "Follow up scheduled" ;
    med:recordedCondition res:Cond_20 ;
    med:hasVitals res:Vit_31 ; med:hasNote res:Note_31 .

res:Vit_31 a med:VitalSigns ;
    med:systolic 169 ; med:diastolic 98 ;
    med:heartRate 69 ; med:temperature 98.7 ;
    med:spo2 100 ;
    med:weightKg 59.4 ;
    med:bmi 21.0 .

res:Note_31 a med:ClinicalNote ;
    med:authorName "Dr. Nithya" ;
    med:date "2025-12-27"^^xsd:date ;
    med:noteText "Routine review, no new complaints. Dose adjusted, repeat bloods before next visit." .

res:Rx_20 a med:Prescription ;
    med:prescribes res:Med_Glimepiride ; med:prescribedBy res:Doc_Nithya ;
    med:forPatient res:Pat_IMR105 ; med:date "2025-12-27"^^xsd:date ;
    med:dosage "1 dose" ;
    med:frequency "Once daily at night" ;
    med:durationDays 90 ;
    med:dispensed true ;
    med:status "Completed" .

res:Rx_21 a med:Prescription ;
    med:prescribes res:Med_Insulin ; med:prescribedBy res:Doc_Nithya ;
    med:forPatient res:Pat_IMR105 ; med:date "2025-12-27"^^xsd:date ;
    med:dosage "2 tablets" ;
    med:frequency "Once daily" ;
    med:durationDays 60 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_31 med:issuedPrescription res:Rx_20 , res:Rx_21 .
res:Pat_IMR105 med:hasPrescription res:Rx_20 , res:Rx_21 .

res:Inv_22 a med:Invoice ;
    med:forPatient res:Pat_IMR105 ; med:date "2025-12-27"^^xsd:date ;
    med:amount 3146 ; med:paid false ;
    med:status "Insurance claim pending" .
res:Inv_22 med:coveredBy res:Policy_IMR105 .
res:Pat_IMR105 med:hasInvoice res:Inv_22 .

res:Enc_32 a med:FollowUp ;
    med:encounterOf res:Pat_IMR105 ; med:date "2026-08-17"^^xsd:date ;
    med:time "09:15" ;
    med:attendedBy res:Doc_Joseph ; med:inDepartment res:Dept_GeneralMedicine ;
    med:reason "Review of hypertension" ;
    med:outcome "Follow up scheduled" ;
    med:recordedCondition res:Cond_18 ;
    med:hasVitals res:Vit_32 ; med:hasNote res:Note_32 .

res:Vit_32 a med:VitalSigns ;
    med:systolic 167 ; med:diastolic 90 ;
    med:heartRate 63 ; med:temperature 100.1 ;
    med:spo2 100 ;
    med:weightKg 51.0 ;
    med:bmi 20.9 .

res:Note_32 a med:ClinicalNote ;
    med:authorName "Dr. Joseph" ;
    med:date "2026-08-17"^^xsd:date ;
    med:noteText "Routine review, no new complaints. Dose adjusted, repeat bloods before next visit." .

res:Rx_22 a med:Prescription ;
    med:prescribes res:Med_Amlodipine ; med:prescribedBy res:Doc_Joseph ;
    med:forPatient res:Pat_IMR105 ; med:date "2026-08-17"^^xsd:date ;
    med:dosage "1 tablet" ;
    med:frequency "Three times daily" ;
    med:durationDays 60 ;
    med:dispensed false ;
    med:status "Active" .

res:Enc_32 med:issuedPrescription res:Rx_22 .
res:Pat_IMR105 med:hasPrescription res:Rx_22 .

res:Inv_23 a med:Invoice ;
    med:forPatient res:Pat_IMR105 ; med:date "2026-08-17"^^xsd:date ;
    med:amount 786 ; med:paid false ;
    med:status "Insurance claim pending" .
res:Inv_23 med:coveredBy res:Policy_IMR105 .
res:Pat_IMR105 med:hasInvoice res:Inv_23 .

res:Policy_IMR105 a med:InsurancePolicy ;
    med:policyNumber "ST-719863" ;
    med:issuedBy res:Ins_StarHealth ; med:coveragePercent 80 ;
    med:amount 500000 .
res:Pat_IMR105 med:hasPolicy res:Policy_IMR105 .

res:Pat_YUS106 a med:OutPatient ;
    med:name "Yusuf Sharma" ; med:mrn "MRN-YUS106" ; med:photoInitials "YS" ;
    med:sex "Male" ; med:dateOfBirth "1961-09-11"^^xsd:date ; med:age 64 ;
    med:bloodGroup "AB+" ; med:phone "+91 91948 890353" ; med:email "yusuf.sharma@example.in" ;
    med:address "18 Rajiv Gandhi Salai, Tambaram, Chennai" ;
    med:primaryPhysician res:Doc_Anand ;
    med:allergicTo res:Allergen_Sulfa ;
    med:hasCondition res:Cond_21 , res:Cond_22 .

res:Cond_21 a med:Condition , med:CriticalCondition ;
    med:ofDisease res:LungCancer ; med:onsetDate "2026-04-10"^^xsd:date ;
    med:severity "Severe" ;
    med:clinicalStatus "Active" ;
    med:diagnosedBy res:Doc_Anand .

res:Cond_22 a med:Condition ;
    med:ofDisease res:Pneumonia ; med:onsetDate "2024-10-20"^^xsd:date ;
    med:severity "Moderate" ;
    med:clinicalStatus "Resolved" ;
    med:resolvedDate "2025-02-12"^^xsd:date ;
    med:diagnosedBy res:Doc_Joseph .

res:Pat_YUS106 med:hasEncounter res:Enc_33 , res:Enc_34 , res:Enc_35 , res:Enc_36 .

res:Enc_33 a med:Consultation ;
    med:encounterOf res:Pat_YUS106 ; med:date "2023-07-18"^^xsd:date ;
    med:time "10:00" ;
    med:attendedBy res:Doc_Joseph ; med:inDepartment res:Dept_Pulmonology ;
    med:reason "First presentation" ;
    med:outcome "Follow up scheduled" ;
    med:recordedCondition res:Cond_22 ;
    med:hasVitals res:Vit_33 ; med:hasNote res:Note_33 .

res:Vit_33 a med:VitalSigns ;
    med:systolic 128 ; med:diastolic 75 ;
    med:heartRate 104 ; med:temperature 99.8 ;
    med:spo2 99 ;
    med:weightKg 54.3 ;
    med:bmi 22.6 .

res:Note_33 a med:ClinicalNote ;
    med:authorName "Dr. Joseph" ;
    med:date "2023-07-18"^^xsd:date ;
    med:noteText "Routine review, no new complaints. Investigations ordered, will call with results." .

res:Rx_23 a med:Prescription ;
    med:prescribes res:Med_Azithromycin ; med:prescribedBy res:Doc_Joseph ;
    med:forPatient res:Pat_YUS106 ; med:date "2023-07-18"^^xsd:date ;
    med:dosage "1 dose" ;
    med:frequency "Once daily at night" ;
    med:durationDays 14 ;
    med:dispensed true ;
    med:status "Completed" .

res:Rx_24 a med:Prescription ;
    med:prescribes res:Med_Amoxicillin ; med:prescribedBy res:Doc_Joseph ;
    med:forPatient res:Pat_YUS106 ; med:date "2023-07-18"^^xsd:date ;
    med:dosage "1 tablet" ;
    med:frequency "Twice daily" ;
    med:durationDays 10 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_33 med:issuedPrescription res:Rx_23 , res:Rx_24 .
res:Pat_YUS106 med:hasPrescription res:Rx_23 , res:Rx_24 .

res:Inv_24 a med:Invoice ;
    med:forPatient res:Pat_YUS106 ; med:date "2023-07-18"^^xsd:date ;
    med:amount 1077 ; med:paid true ;
    med:status "Settled" .
res:Pat_YUS106 med:hasInvoice res:Inv_24 .

res:Enc_34 a med:FollowUp ;
    med:encounterOf res:Pat_YUS106 ; med:date "2024-08-14"^^xsd:date ;
    med:time "15:00" ;
    med:attendedBy res:Doc_Joseph ; med:inDepartment res:Dept_Pulmonology ;
    med:reason "Review of pneumonia" ;
    med:outcome "Discharged with advice" ;
    med:recordedCondition res:Cond_22 ;
    med:hasVitals res:Vit_34 ; med:hasNote res:Note_34 .

res:Vit_34 a med:VitalSigns ;
    med:systolic 119 ; med:diastolic 68 ;
    med:heartRate 84 ; med:temperature 99.6 ;
    med:spo2 100 ;
    med:weightKg 52.2 ;
    med:bmi 24.5 .

res:Note_34 a med:ClinicalNote ;
    med:authorName "Dr. Joseph" ;
    med:date "2024-08-14"^^xsd:date ;
    med:noteText "Presents with a two day history of symptoms. Dose adjusted, repeat bloods before next visit." .

res:Rx_25 a med:Prescription ;
    med:prescribes res:Med_Azithromycin ; med:prescribedBy res:Doc_Joseph ;
    med:forPatient res:Pat_YUS106 ; med:date "2024-08-14"^^xsd:date ;
    med:dosage "2 tablets" ;
    med:frequency "Three times daily" ;
    med:durationDays 14 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_34 med:issuedPrescription res:Rx_25 .
res:Pat_YUS106 med:hasPrescription res:Rx_25 .

res:Enc_35 a med:FollowUp ;
    med:encounterOf res:Pat_YUS106 ; med:date "2025-08-15"^^xsd:date ;
    med:time "12:00" ;
    med:attendedBy res:Doc_Anand ; med:inDepartment res:Dept_Oncology ;
    med:reason "Review of lung cancer" ;
    med:outcome "Treatment continued" ;
    med:recordedCondition res:Cond_21 ;
    med:hasVitals res:Vit_35 ; med:hasNote res:Note_35 .

res:Vit_35 a med:VitalSigns ;
    med:systolic 133 ; med:diastolic 79 ;
    med:heartRate 81 ; med:temperature 98.6 ;
    med:spo2 99 ;
    med:weightKg 63.3 ;
    med:bmi 23.2 .

res:Note_35 a med:ClinicalNote ;
    med:authorName "Dr. Anand" ;
    med:date "2025-08-15"^^xsd:date ;
    med:noteText "Referred from general medicine for specialist opinion. Dose adjusted, repeat bloods before next visit." .

res:Lab_21 a med:LabOrder ;
    med:analyte "CEA" ; med:forPatient res:Pat_YUS106 ;
    med:date "2025-08-15"^^xsd:date ; med:orderedBy res:Doc_Anand ;
    med:testsFor res:LungCancer ;
    med:orderStatus "Resulted" ;
    med:hasResult res:Res_21 .

res:Res_21 a med:LabResult ;
    med:analyte "CEA" ; med:value 34.1 ; med:unit "ng/mL" ;
    med:refLow 0 ; med:refHigh 3 ; med:outOfRange true ;
    med:date "2025-08-16"^^xsd:date ;
    med:performedBy res:Tech_Mohan .

res:Enc_35 med:orderedTest res:Lab_21 .

res:Inv_25 a med:Invoice ;
    med:forPatient res:Pat_YUS106 ; med:date "2025-08-15"^^xsd:date ;
    med:amount 4153 ; med:paid true ;
    med:status "Settled" .
res:Pat_YUS106 med:hasInvoice res:Inv_25 .

res:Enc_36 a med:Consultation ;
    med:encounterOf res:Pat_YUS106 ; med:date "2026-08-14"^^xsd:date ;
    med:time "12:30" ;
    med:attendedBy res:Doc_Anand ; med:inDepartment res:Dept_Oncology ;
    med:reason "Review of lung cancer" ;
    med:outcome "Discharged with advice" ;
    med:recordedCondition res:Cond_21 ;
    med:hasVitals res:Vit_36 ; med:hasNote res:Note_36 .

res:Vit_36 a med:VitalSigns ;
    med:systolic 111 ; med:diastolic 79 ;
    med:heartRate 68 ; med:temperature 98.8 ;
    med:spo2 97 ;
    med:weightKg 73.4 ;
    med:bmi 27.0 .

res:Note_36 a med:ClinicalNote ;
    med:authorName "Dr. Anand" ;
    med:date "2026-08-14"^^xsd:date ;
    med:noteText "Attends for scheduled follow up. Dose adjusted, repeat bloods before next visit." .

res:Lab_22 a med:LabOrder ;
    med:analyte "CEA" ; med:forPatient res:Pat_YUS106 ;
    med:date "2026-08-14"^^xsd:date ; med:orderedBy res:Doc_Anand ;
    med:testsFor res:LungCancer ;
    med:orderStatus "Resulted" ;
    med:hasResult res:Res_22 .

res:Res_22 a med:LabResult ;
    med:analyte "CEA" ; med:value 11.91 ; med:unit "ng/mL" ;
    med:refLow 0 ; med:refHigh 3 ; med:outOfRange true ;
    med:date "2026-08-15"^^xsd:date ;
    med:performedBy res:Tech_Mohan .

res:Enc_36 med:orderedTest res:Lab_22 .

res:Inv_26 a med:Invoice ;
    med:forPatient res:Pat_YUS106 ; med:date "2026-08-14"^^xsd:date ;
    med:amount 2942 ; med:paid false ;
    med:status "Awaiting payment" .
res:Pat_YUS106 med:hasInvoice res:Inv_26 .

res:Appt_5 a med:Appointment ;
    med:forPatient res:Pat_YUS106 ; med:appointmentWith res:Doc_Anand ;
    med:date "2026-09-21"^^xsd:date ;
    med:time "17:00" ;
    med:inDepartment res:Dept_Oncology ;
    med:status "Scheduled" .
res:Pat_YUS106 med:hasAppointment res:Appt_5 .

res:Pat_ROO107 a med:OutPatient ;
    med:name "Roopa Kumar" ; med:mrn "MRN-ROO107" ; med:photoInitials "RK" ;
    med:sex "Female" ; med:dateOfBirth "1985-03-24"^^xsd:date ; med:age 41 ;
    med:bloodGroup "B+" ; med:phone "+91 99000 509070" ; med:email "roopa.kumar@example.in" ;
    med:address "89 Anna Salai, Navalur, Chennai" ;
    med:primaryPhysician res:Doc_Suresh ;
    med:allergicTo res:Allergen_Penicillin ;
    med:hasCondition res:Cond_23 .

res:Cond_23 a med:Condition ;
    med:ofDisease res:UrinaryTractInfection ; med:onsetDate "2025-05-18"^^xsd:date ;
    med:severity "Mild" ;
    med:clinicalStatus "Active" ;
    med:diagnosedBy res:Doc_Suresh .

res:Pat_ROO107 med:hasEncounter res:Enc_37 .

res:Enc_37 a med:Consultation ;
    med:encounterOf res:Pat_ROO107 ; med:date "2026-08-30"^^xsd:date ;
    med:time "18:30" ;
    med:attendedBy res:Doc_Joseph ; med:inDepartment res:Dept_GeneralMedicine ;
    med:reason "First presentation" ;
    med:outcome "Follow up scheduled" ;
    med:recordedCondition res:Cond_23 ;
    med:hasVitals res:Vit_37 ; med:hasNote res:Note_37 .

res:Vit_37 a med:VitalSigns ;
    med:systolic 130 ; med:diastolic 82 ;
    med:heartRate 94 ; med:temperature 99.9 ;
    med:spo2 100 ;
    med:weightKg 53.2 ;
    med:bmi 20.8 .

res:Note_37 a med:ClinicalNote ;
    med:authorName "Dr. Joseph" ;
    med:date "2026-08-30"^^xsd:date ;
    med:noteText "Presents with a two day history of symptoms. Reassured. No change to treatment at this stage." .

res:Rx_26 a med:Prescription ;
    med:prescribes res:Med_Amoxicillin ; med:prescribedBy res:Doc_Joseph ;
    med:forPatient res:Pat_ROO107 ; med:date "2026-08-30"^^xsd:date ;
    med:dosage "1 tablet" ;
    med:frequency "Three times daily" ;
    med:durationDays 7 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_37 med:issuedPrescription res:Rx_26 .
res:Pat_ROO107 med:hasPrescription res:Rx_26 .

res:Inv_27 a med:Invoice ;
    med:forPatient res:Pat_ROO107 ; med:date "2026-08-30"^^xsd:date ;
    med:amount 1576 ; med:paid false ;
    med:status "Insurance claim pending" .
res:Inv_27 med:coveredBy res:Policy_ROO107 .
res:Pat_ROO107 med:hasInvoice res:Inv_27 .

res:Policy_ROO107 a med:InsurancePolicy ;
    med:policyNumber "ST-597567" ;
    med:issuedBy res:Ins_StarHealth ; med:coveragePercent 85 ;
    med:amount 200000 .
res:Pat_ROO107 med:hasPolicy res:Policy_ROO107 .

res:Appt_6 a med:Appointment ;
    med:forPatient res:Pat_ROO107 ; med:appointmentWith res:Doc_Suresh ;
    med:date "2026-09-21"^^xsd:date ;
    med:time "10:20" ;
    med:inDepartment res:Dept_GeneralMedicine ;
    med:status "Scheduled" .
res:Pat_ROO107 med:hasAppointment res:Appt_6 .

res:Pat_FAT108 a med:OutPatient ;
    med:name "Fatima Kumar" ; med:mrn "MRN-FAT108" ; med:photoInitials "FK" ;
    med:sex "Female" ; med:dateOfBirth "1973-10-01"^^xsd:date ; med:age 52 ;
    med:bloodGroup "A-" ; med:phone "+91 95263 334592" ; med:email "fatima.kumar@example.in" ;
    med:address "9 ECR, Velachery, Chennai" ;
    med:primaryPhysician res:Doc_Suresh ;
    med:allergicTo res:Allergen_Latex , res:Allergen_Iodine ;
    med:hasCondition res:Cond_24 , res:Cond_25 , res:Cond_26 , res:Cond_27 .

res:Cond_24 a med:Condition ;
    med:ofDisease res:UrinaryTractInfection ; med:onsetDate "2025-07-20"^^xsd:date ;
    med:severity "Moderate" ;
    med:clinicalStatus "Active" ;
    med:diagnosedBy res:Doc_Joseph .

res:Cond_25 a med:Condition ;
    med:ofDisease res:ChronicKidneyDisease ; med:onsetDate "2022-05-05"^^xsd:date ;
    med:severity "Mild" ;
    med:clinicalStatus "Active" ;
    med:diagnosedBy res:Doc_Vandana .

res:Cond_26 a med:Condition ;
    med:ofDisease res:Epilepsy ; med:onsetDate "2020-10-19"^^xsd:date ;
    med:severity "Moderate" ;
    med:clinicalStatus "Active" ;
    med:diagnosedBy res:Doc_Priya .

res:Cond_27 a med:Condition ;
    med:ofDisease res:Migraine ; med:onsetDate "2025-01-26"^^xsd:date ;
    med:severity "Mild" ;
    med:clinicalStatus "Resolved" ;
    med:resolvedDate "2025-04-17"^^xsd:date ;
    med:diagnosedBy res:Doc_Priya .

res:Pat_FAT108 med:hasEncounter res:Enc_38 , res:Enc_39 , res:Enc_40 , res:Enc_41 , res:Enc_42 .

res:Enc_38 a med:EmergencyVisit ;
    med:encounterOf res:Pat_FAT108 ; med:date "2023-05-02"^^xsd:date ;
    med:time "13:45" ;
    med:attendedBy res:Doc_Karthik ; med:inDepartment res:Dept_Emergency ;
    med:reason "Acute presentation" ;
    med:outcome "Treatment continued" ;
    med:recordedCondition res:Cond_25 ;
    med:hasVitals res:Vit_38 ; med:hasNote res:Note_38 .

res:Vit_38 a med:VitalSigns ;
    med:systolic 134 ; med:diastolic 77 ;
    med:heartRate 95 ; med:temperature 97.9 ;
    med:spo2 98 ;
    med:weightKg 51.9 ;
    med:bmi 25.6 .

res:Note_38 a med:ClinicalNote ;
    med:authorName "Dr. Karthik" ;
    med:date "2023-05-02"^^xsd:date ;
    med:noteText "Post discharge review. Advised on diet, salt restriction and daily walking." .

res:Lab_23 a med:LabOrder ;
    med:analyte "Creatinine" ; med:forPatient res:Pat_FAT108 ;
    med:date "2023-05-02"^^xsd:date ; med:orderedBy res:Doc_Karthik ;
    med:testsFor res:ChronicKidneyDisease ;
    med:orderStatus "Resulted" ;
    med:hasResult res:Res_23 .

res:Res_23 a med:LabResult ;
    med:analyte "Creatinine" ; med:value 5.6 ; med:unit "mg/dL" ;
    med:refLow 0.6 ; med:refHigh 1.2 ; med:outOfRange true ;
    med:date "2023-05-03"^^xsd:date ;
    med:performedBy res:Tech_Mohan .

res:Lab_24 a med:LabOrder ;
    med:analyte "eGFR" ; med:forPatient res:Pat_FAT108 ;
    med:date "2023-05-02"^^xsd:date ; med:orderedBy res:Doc_Karthik ;
    med:testsFor res:ChronicKidneyDisease ;
    med:orderStatus "Resulted" ;
    med:hasResult res:Res_24 .

res:Res_24 a med:LabResult ;
    med:analyte "eGFR" ; med:value 15.1 ; med:unit "mL/min" ;
    med:refLow 90 ; med:refHigh 120 ; med:outOfRange true ;
    med:date "2023-05-03"^^xsd:date ;
    med:performedBy res:Tech_Mohan .

res:Enc_38 med:orderedTest res:Lab_23 , res:Lab_24 .

res:Enc_39 a med:FollowUp ;
    med:encounterOf res:Pat_FAT108 ; med:date "2024-03-15"^^xsd:date ;
    med:time "18:30" ;
    med:attendedBy res:Doc_Suresh ; med:inDepartment res:Dept_GeneralMedicine ;
    med:reason "Review of urinary tract infection" ;
    med:outcome "Treatment continued" ;
    med:recordedCondition res:Cond_24 ;
    med:hasVitals res:Vit_39 ; med:hasNote res:Note_39 .

res:Vit_39 a med:VitalSigns ;
    med:systolic 121 ; med:diastolic 73 ;
    med:heartRate 99 ; med:temperature 98.4 ;
    med:spo2 99 ;
    med:weightKg 60.0 ;
    med:bmi 20.2 .

res:Note_39 a med:ClinicalNote ;
    med:authorName "Dr. Suresh" ;
    med:date "2024-03-15"^^xsd:date ;
    med:noteText "Patient reports steady improvement since last visit. Referral raised to the relevant specialty." .

res:Rx_27 a med:Prescription ;
    med:prescribes res:Med_Nitrofurantoin ; med:prescribedBy res:Doc_Suresh ;
    med:forPatient res:Pat_FAT108 ; med:date "2024-03-15"^^xsd:date ;
    med:dosage "1 tablet" ;
    med:frequency "Once daily" ;
    med:durationDays 7 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_39 med:issuedPrescription res:Rx_27 .
res:Pat_FAT108 med:hasPrescription res:Rx_27 .

res:Lab_25 a med:LabOrder ;
    med:analyte "Urine WBC" ; med:forPatient res:Pat_FAT108 ;
    med:date "2024-03-15"^^xsd:date ; med:orderedBy res:Doc_Suresh ;
    med:testsFor res:UrinaryTractInfection ;
    med:orderStatus "Resulted" ;
    med:hasResult res:Res_25 .

res:Res_25 a med:LabResult ;
    med:analyte "Urine WBC" ; med:value 28.65 ; med:unit "/hpf" ;
    med:refLow 0 ; med:refHigh 5 ; med:outOfRange true ;
    med:date "2024-03-16"^^xsd:date ;
    med:performedBy res:Tech_Mohan .

res:Enc_39 med:orderedTest res:Lab_25 .

res:Inv_28 a med:Invoice ;
    med:forPatient res:Pat_FAT108 ; med:date "2024-03-15"^^xsd:date ;
    med:amount 2899 ; med:paid true ;
    med:status "Settled" .
res:Pat_FAT108 med:hasInvoice res:Inv_28 .

res:Enc_40 a med:Consultation ;
    med:encounterOf res:Pat_FAT108 ; med:date "2025-01-17"^^xsd:date ;
    med:time "10:45" ;
    med:attendedBy res:Doc_Priya ; med:inDepartment res:Dept_Neurology ;
    med:reason "Review of epilepsy" ;
    med:outcome "Discharged with advice" ;
    med:recordedCondition res:Cond_26 ;
    med:hasVitals res:Vit_40 ; med:hasNote res:Note_40 .

res:Vit_40 a med:VitalSigns ;
    med:systolic 127 ; med:diastolic 83 ;
    med:heartRate 98 ; med:temperature 99.5 ;
    med:spo2 98 ;
    med:weightKg 53.7 ;
    med:bmi 27.0 .

res:Note_40 a med:ClinicalNote ;
    med:authorName "Dr. Priya" ;
    med:date "2025-01-17"^^xsd:date ;
    med:noteText "Patient reports steady improvement since last visit. Continue current therapy, review in three months." .

res:Rx_28 a med:Prescription ;
    med:prescribes res:Med_Levetiracetam ; med:prescribedBy res:Doc_Priya ;
    med:forPatient res:Pat_FAT108 ; med:date "2025-01-17"^^xsd:date ;
    med:dosage "2 tablets" ;
    med:frequency "Three times daily" ;
    med:durationDays 90 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_40 med:issuedPrescription res:Rx_28 .
res:Pat_FAT108 med:hasPrescription res:Rx_28 .

res:Inv_29 a med:Invoice ;
    med:forPatient res:Pat_FAT108 ; med:date "2025-01-17"^^xsd:date ;
    med:amount 3459 ; med:paid true ;
    med:status "Settled" .
res:Pat_FAT108 med:hasInvoice res:Inv_29 .

res:Enc_41 a med:Consultation ;
    med:encounterOf res:Pat_FAT108 ; med:date "2025-10-30"^^xsd:date ;
    med:time "15:00" ;
    med:attendedBy res:Doc_Priya ; med:inDepartment res:Dept_Neurology ;
    med:reason "Review of epilepsy" ;
    med:outcome "Discharged with advice" ;
    med:recordedCondition res:Cond_26 ;
    med:hasVitals res:Vit_41 ; med:hasNote res:Note_41 .

res:Vit_41 a med:VitalSigns ;
    med:systolic 115 ; med:diastolic 75 ;
    med:heartRate 77 ; med:temperature 99.0 ;
    med:spo2 96 ;
    med:weightKg 55.7 ;
    med:bmi 19.5 .

res:Note_41 a med:ClinicalNote ;
    med:authorName "Dr. Priya" ;
    med:date "2025-10-30"^^xsd:date ;
    med:noteText "Attends for scheduled follow up. Dose adjusted, repeat bloods before next visit." .

res:Rx_29 a med:Prescription ;
    med:prescribes res:Med_Levetiracetam ; med:prescribedBy res:Doc_Priya ;
    med:forPatient res:Pat_FAT108 ; med:date "2025-10-30"^^xsd:date ;
    med:dosage "2 tablets" ;
    med:frequency "Twice daily" ;
    med:durationDays 90 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_41 med:issuedPrescription res:Rx_29 .
res:Pat_FAT108 med:hasPrescription res:Rx_29 .

res:Enc_42 a med:EmergencyVisit ;
    med:encounterOf res:Pat_FAT108 ; med:date "2026-08-21"^^xsd:date ;
    med:time "17:00" ;
    med:attendedBy res:Doc_Karthik ; med:inDepartment res:Dept_Emergency ;
    med:reason "Acute presentation" ;
    med:outcome "Discharged with advice" ;
    med:recordedCondition res:Cond_24 ;
    med:hasVitals res:Vit_42 ; med:hasNote res:Note_42 .

res:Vit_42 a med:VitalSigns ;
    med:systolic 125 ; med:diastolic 66 ;
    med:heartRate 89 ; med:temperature 99.0 ;
    med:spo2 100 ;
    med:weightKg 65.0 ;
    med:bmi 27.0 .

res:Note_42 a med:ClinicalNote ;
    med:authorName "Dr. Karthik" ;
    med:date "2026-08-21"^^xsd:date ;
    med:noteText "Reviewed in clinic today. Investigations ordered, will call with results." .

res:Lab_26 a med:LabOrder ;
    med:analyte "Urine WBC" ; med:forPatient res:Pat_FAT108 ;
    med:date "2026-08-21"^^xsd:date ; med:orderedBy res:Doc_Karthik ;
    med:testsFor res:UrinaryTractInfection ;
    med:orderStatus "Resulted" ;
    med:hasResult res:Res_26 .

res:Res_26 a med:LabResult ;
    med:analyte "Urine WBC" ; med:value 2.53 ; med:unit "/hpf" ;
    med:refLow 0 ; med:refHigh 5 ; med:outOfRange false ;
    med:date "2026-08-22"^^xsd:date ;
    med:performedBy res:Tech_Mohan .

res:Enc_42 med:orderedTest res:Lab_26 .

res:Inv_30 a med:Invoice ;
    med:forPatient res:Pat_FAT108 ; med:date "2026-08-21"^^xsd:date ;
    med:amount 5177 ; med:paid true ;
    med:status "Settled" .
res:Pat_FAT108 med:hasInvoice res:Inv_30 .

res:Pat_RAD109 a med:OutPatient ;
    med:name "Radha Rao" ; med:mrn "MRN-RAD109" ; med:photoInitials "RR" ;
    med:sex "Female" ; med:dateOfBirth "1951-12-03"^^xsd:date ; med:age 74 ;
    med:bloodGroup "AB+" ; med:phone "+91 91964 508525" ; med:email "radha.rao@example.in" ;
    med:address "69 Kamarajar Street, Velachery, Chennai" ;
    med:primaryPhysician res:Doc_Leela ;
    med:allergicTo res:Allergen_Sulfa ;
    med:hasCondition res:Cond_28 .

res:Cond_28 a med:Condition ;
    med:ofDisease res:Depression ; med:onsetDate "2024-06-02"^^xsd:date ;
    med:severity "Moderate" ;
    med:clinicalStatus "Active" ;
    med:diagnosedBy res:Doc_Leela .

res:Pat_RAD109 med:hasEncounter res:Enc_43 , res:Enc_44 , res:Enc_45 , res:Enc_46 .

res:Enc_43 a med:Consultation ;
    med:encounterOf res:Pat_RAD109 ; med:date "2023-08-16"^^xsd:date ;
    med:time "13:15" ;
    med:attendedBy res:Doc_Leela ; med:inDepartment res:Dept_Psychiatry ;
    med:reason "First presentation" ;
    med:outcome "Follow up scheduled" ;
    med:recordedCondition res:Cond_28 ;
    med:hasVitals res:Vit_43 ; med:hasNote res:Note_43 .

res:Vit_43 a med:VitalSigns ;
    med:systolic 127 ; med:diastolic 73 ;
    med:heartRate 95 ; med:temperature 98.4 ;
    med:spo2 96 ;
    med:weightKg 55.4 ;
    med:bmi 23.2 .

res:Note_43 a med:ClinicalNote ;
    med:authorName "Dr. Leela" ;
    med:date "2023-08-16"^^xsd:date ;
    med:noteText "Routine review, no new complaints. Dose adjusted, repeat bloods before next visit." .

res:Rx_30 a med:Prescription ;
    med:prescribes res:Med_Sertraline ; med:prescribedBy res:Doc_Leela ;
    med:forPatient res:Pat_RAD109 ; med:date "2023-08-16"^^xsd:date ;
    med:dosage "1 tablet" ;
    med:frequency "Once daily at night" ;
    med:durationDays 60 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_43 med:issuedPrescription res:Rx_30 .
res:Pat_RAD109 med:hasPrescription res:Rx_30 .

res:Inv_31 a med:Invoice ;
    med:forPatient res:Pat_RAD109 ; med:date "2023-08-16"^^xsd:date ;
    med:amount 4273 ; med:paid true ;
    med:status "Settled" .
res:Inv_31 med:coveredBy res:Policy_RAD109 .
res:Pat_RAD109 med:hasInvoice res:Inv_31 .

res:Enc_44 a med:Consultation ;
    med:encounterOf res:Pat_RAD109 ; med:date "2024-08-09"^^xsd:date ;
    med:time "09:15" ;
    med:attendedBy res:Doc_Leela ; med:inDepartment res:Dept_Psychiatry ;
    med:reason "Review of depression" ;
    med:outcome "Referred for tests" ;
    med:recordedCondition res:Cond_28 ;
    med:hasVitals res:Vit_44 ; med:hasNote res:Note_44 .

res:Vit_44 a med:VitalSigns ;
    med:systolic 109 ; med:diastolic 83 ;
    med:heartRate 62 ; med:temperature 99.3 ;
    med:spo2 96 ;
    med:weightKg 75.9 ;
    med:bmi 21.9 .

res:Note_44 a med:ClinicalNote ;
    med:authorName "Dr. Leela" ;
    med:date "2024-08-09"^^xsd:date ;
    med:noteText "Post discharge review. Advised on diet, salt restriction and daily walking." .

res:Rx_31 a med:Prescription ;
    med:prescribes res:Med_Sertraline ; med:prescribedBy res:Doc_Leela ;
    med:forPatient res:Pat_RAD109 ; med:date "2024-08-09"^^xsd:date ;
    med:dosage "2 tablets" ;
    med:frequency "As required" ;
    med:durationDays 90 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_44 med:issuedPrescription res:Rx_31 .
res:Pat_RAD109 med:hasPrescription res:Rx_31 .

res:Inv_32 a med:Invoice ;
    med:forPatient res:Pat_RAD109 ; med:date "2024-08-09"^^xsd:date ;
    med:amount 3291 ; med:paid true ;
    med:status "Settled" .
res:Inv_32 med:coveredBy res:Policy_RAD109 .
res:Pat_RAD109 med:hasInvoice res:Inv_32 .

res:Enc_45 a med:EmergencyVisit ;
    med:encounterOf res:Pat_RAD109 ; med:date "2025-08-07"^^xsd:date ;
    med:time "17:15" ;
    med:attendedBy res:Doc_Karthik ; med:inDepartment res:Dept_Emergency ;
    med:reason "Acute presentation" ;
    med:outcome "Follow up scheduled" ;
    med:recordedCondition res:Cond_28 ;
    med:hasVitals res:Vit_45 ; med:hasNote res:Note_45 .

res:Vit_45 a med:VitalSigns ;
    med:systolic 126 ; med:diastolic 81 ;
    med:heartRate 85 ; med:temperature 99.1 ;
    med:spo2 100 ;
    med:weightKg 66.9 ;
    med:bmi 23.3 .

res:Note_45 a med:ClinicalNote ;
    med:authorName "Dr. Karthik" ;
    med:date "2025-08-07"^^xsd:date ;
    med:noteText "Presents with a two day history of symptoms. Counselled on medication adherence. Red flag symptoms explained." .

res:Rx_32 a med:Prescription ;
    med:prescribes res:Med_Sertraline ; med:prescribedBy res:Doc_Karthik ;
    med:forPatient res:Pat_RAD109 ; med:date "2025-08-07"^^xsd:date ;
    med:dosage "2 tablets" ;
    med:frequency "As required" ;
    med:durationDays 90 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_45 med:issuedPrescription res:Rx_32 .
res:Pat_RAD109 med:hasPrescription res:Rx_32 .

res:Inv_33 a med:Invoice ;
    med:forPatient res:Pat_RAD109 ; med:date "2025-08-07"^^xsd:date ;
    med:amount 25909 ; med:paid true ;
    med:status "Settled" .
res:Inv_33 med:coveredBy res:Policy_RAD109 .
res:Pat_RAD109 med:hasInvoice res:Inv_33 .

res:Enc_46 a med:FollowUp ;
    med:encounterOf res:Pat_RAD109 ; med:date "2026-08-30"^^xsd:date ;
    med:time "08:00" ;
    med:attendedBy res:Doc_Leela ; med:inDepartment res:Dept_Psychiatry ;
    med:reason "Review of depression" ;
    med:outcome "Treatment continued" ;
    med:recordedCondition res:Cond_28 ;
    med:hasVitals res:Vit_46 ; med:hasNote res:Note_46 .

res:Vit_46 a med:VitalSigns ;
    med:systolic 122 ; med:diastolic 71 ;
    med:heartRate 100 ; med:temperature 97.9 ;
    med:spo2 98 ;
    med:weightKg 49.6 ;
    med:bmi 23.7 .

res:Note_46 a med:ClinicalNote ;
    med:authorName "Dr. Leela" ;
    med:date "2026-08-30"^^xsd:date ;
    med:noteText "Referred from general medicine for specialist opinion. Advised on diet, salt restriction and daily walking." .

res:Inv_34 a med:Invoice ;
    med:forPatient res:Pat_RAD109 ; med:date "2026-08-30"^^xsd:date ;
    med:amount 6062 ; med:paid false ;
    med:status "Insurance claim pending" .
res:Inv_34 med:coveredBy res:Policy_RAD109 .
res:Pat_RAD109 med:hasInvoice res:Inv_34 .

res:Policy_RAD109 a med:InsurancePolicy ;
    med:policyNumber "HD-568057" ;
    med:issuedBy res:Ins_HDFCErgo ; med:coveragePercent 70 ;
    med:amount 750000 .
res:Pat_RAD109 med:hasPolicy res:Policy_RAD109 .

res:Appt_7 a med:Appointment ;
    med:forPatient res:Pat_RAD109 ; med:appointmentWith res:Doc_Leela ;
    med:date "2026-09-05"^^xsd:date ;
    med:time "15:00" ;
    med:inDepartment res:Dept_Psychiatry ;
    med:status "Scheduled" .
res:Pat_RAD109 med:hasAppointment res:Appt_7 .

res:Pat_IBR110 a med:OutPatient ;
    med:name "Ibrahim Prabhu" ; med:mrn "MRN-IBR110" ; med:photoInitials "IP" ;
    med:sex "Male" ; med:dateOfBirth "1980-12-23"^^xsd:date ; med:age 45 ;
    med:bloodGroup "O-" ; med:phone "+91 99268 254919" ; med:email "ibrahim.prabhu@example.in" ;
    med:address "65 GST Road, Tambaram, Chennai" ;
    med:primaryPhysician res:Doc_Priya ;
    med:allergicTo res:Allergen_Iodine ;
    med:hasCondition res:Cond_29 , res:Cond_30 , res:Cond_31 , res:Cond_32 .

res:Cond_29 a med:Condition , med:CriticalCondition ;
    med:ofDisease res:Stroke ; med:onsetDate "2025-03-20"^^xsd:date ;
    med:severity "Severe" ;
    med:clinicalStatus "Resolved" ;
    med:resolvedDate "2025-06-03"^^xsd:date ;
    med:diagnosedBy res:Doc_Priya .

res:Cond_30 a med:Condition ;
    med:ofDisease res:Hypertension ; med:onsetDate "2022-08-13"^^xsd:date ;
    med:severity "Moderate" ;
    med:clinicalStatus "Active" ;
    med:diagnosedBy res:Doc_Ramesh .

res:Cond_31 a med:Condition ;
    med:ofDisease res:AtrialFibrillation ; med:onsetDate "2021-10-25"^^xsd:date ;
    med:severity "Mild" ;
    med:clinicalStatus "Active" ;
    med:diagnosedBy res:Doc_Farida .

res:Cond_32 a med:Condition ;
    med:ofDisease res:Dyslipidemia ; med:onsetDate "2017-02-13"^^xsd:date ;
    med:severity "Moderate" ;
    med:clinicalStatus "Active" ;
    med:diagnosedBy res:Doc_Suresh .

res:Pat_IBR110 med:hasEncounter res:Enc_47 , res:Enc_48 , res:Enc_49 , res:Enc_50 , res:Enc_51 .

res:Enc_47 a med:Consultation ;
    med:encounterOf res:Pat_IBR110 ; med:date "2023-05-01"^^xsd:date ;
    med:time "11:15" ;
    med:attendedBy res:Doc_Priya ; med:inDepartment res:Dept_Neurology ;
    med:reason "First presentation" ;
    med:outcome "Referred for tests" ;
    med:recordedCondition res:Cond_29 ;
    med:hasVitals res:Vit_47 ; med:hasNote res:Note_47 .

res:Vit_47 a med:VitalSigns ;
    med:systolic 162 ; med:diastolic 94 ;
    med:heartRate 101 ; med:temperature 98.0 ;
    med:spo2 100 ;
    med:weightKg 59.8 ;
    med:bmi 26.5 .

res:Note_47 a med:ClinicalNote ;
    med:authorName "Dr. Priya" ;
    med:date "2023-05-01"^^xsd:date ;
    med:noteText "Attends for scheduled follow up. Investigations ordered, will call with results." .

res:Rx_33 a med:Prescription ;
    med:prescribes res:Med_Clopidogrel ; med:prescribedBy res:Doc_Priya ;
    med:forPatient res:Pat_IBR110 ; med:date "2023-05-01"^^xsd:date ;
    med:dosage "1 tablet" ;
    med:frequency "Once daily at night" ;
    med:durationDays 14 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_47 med:issuedPrescription res:Rx_33 .
res:Pat_IBR110 med:hasPrescription res:Rx_33 .

res:Lab_27 a med:LabOrder ;
    med:analyte "INR" ; med:forPatient res:Pat_IBR110 ;
    med:date "2023-05-01"^^xsd:date ; med:orderedBy res:Doc_Priya ;
    med:testsFor res:Stroke ;
    med:orderStatus "Resulted" ;
    med:hasResult res:Res_27 .

res:Res_27 a med:LabResult ;
    med:analyte "INR" ; med:value 1.16 ; med:unit "ratio" ;
    med:refLow 0.9 ; med:refHigh 1.2 ; med:outOfRange false ;
    med:date "2023-05-02"^^xsd:date ;
    med:performedBy res:Tech_Mohan .

res:Enc_47 med:orderedTest res:Lab_27 .

res:Inv_35 a med:Invoice ;
    med:forPatient res:Pat_IBR110 ; med:date "2023-05-01"^^xsd:date ;
    med:amount 4571 ; med:paid true ;
    med:status "Settled" .
res:Inv_35 med:coveredBy res:Policy_IBR110 .
res:Pat_IBR110 med:hasInvoice res:Inv_35 .

res:Enc_48 a med:Consultation ;
    med:encounterOf res:Pat_IBR110 ; med:date "2024-03-04"^^xsd:date ;
    med:time "08:00" ;
    med:attendedBy res:Doc_Joseph ; med:inDepartment res:Dept_GeneralMedicine ;
    med:reason "Review of hypertension" ;
    med:outcome "Treatment continued" ;
    med:recordedCondition res:Cond_30 ;
    med:hasVitals res:Vit_48 ; med:hasNote res:Note_48 .

res:Vit_48 a med:VitalSigns ;
    med:systolic 154 ; med:diastolic 86 ;
    med:heartRate 74 ; med:temperature 100.4 ;
    med:spo2 99 ;
    med:weightKg 65.0 ;
    med:bmi 25.3 .

res:Note_48 a med:ClinicalNote ;
    med:authorName "Dr. Joseph" ;
    med:date "2024-03-04"^^xsd:date ;
    med:noteText "Attends for scheduled follow up. Continue current therapy, review in three months." .

res:Rx_34 a med:Prescription ;
    med:prescribes res:Med_Amlodipine ; med:prescribedBy res:Doc_Joseph ;
    med:forPatient res:Pat_IBR110 ; med:date "2024-03-04"^^xsd:date ;
    med:dosage "1 dose" ;
    med:frequency "Once daily at night" ;
    med:durationDays 90 ;
    med:dispensed true ;
    med:status "Completed" .

res:Rx_35 a med:Prescription ;
    med:prescribes res:Med_Telmisartan ; med:prescribedBy res:Doc_Joseph ;
    med:forPatient res:Pat_IBR110 ; med:date "2024-03-04"^^xsd:date ;
    med:dosage "1 tablet" ;
    med:frequency "Three times daily" ;
    med:durationDays 60 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_48 med:issuedPrescription res:Rx_34 , res:Rx_35 .
res:Pat_IBR110 med:hasPrescription res:Rx_34 , res:Rx_35 .

res:Inv_36 a med:Invoice ;
    med:forPatient res:Pat_IBR110 ; med:date "2024-03-04"^^xsd:date ;
    med:amount 4173 ; med:paid true ;
    med:status "Settled" .
res:Inv_36 med:coveredBy res:Policy_IBR110 .
res:Pat_IBR110 med:hasInvoice res:Inv_36 .

res:Enc_49 a med:Consultation ;
    med:encounterOf res:Pat_IBR110 ; med:date "2025-01-18"^^xsd:date ;
    med:time "13:00" ;
    med:attendedBy res:Doc_Priya ; med:inDepartment res:Dept_Neurology ;
    med:reason "Review of stroke" ;
    med:outcome "Discharged with advice" ;
    med:recordedCondition res:Cond_29 ;
    med:hasVitals res:Vit_49 ; med:hasNote res:Note_49 .

res:Vit_49 a med:VitalSigns ;
    med:systolic 138 ; med:diastolic 92 ;
    med:heartRate 88 ; med:temperature 98.2 ;
    med:spo2 97 ;
    med:weightKg 55.9 ;
    med:bmi 24.4 .

res:Note_49 a med:ClinicalNote ;
    med:authorName "Dr. Priya" ;
    med:date "2025-01-18"^^xsd:date ;
    med:noteText "Post discharge review. Continue current therapy, review in three months." .

res:Rx_36 a med:Prescription ;
    med:prescribes res:Med_Clopidogrel ; med:prescribedBy res:Doc_Priya ;
    med:forPatient res:Pat_IBR110 ; med:date "2025-01-18"^^xsd:date ;
    med:dosage "1 tablet" ;
    med:frequency "As required" ;
    med:durationDays 7 ;
    med:dispensed true ;
    med:status "Completed" .

res:Rx_37 a med:Prescription ;
    med:prescribes res:Med_Warfarin ; med:prescribedBy res:Doc_Priya ;
    med:forPatient res:Pat_IBR110 ; med:date "2025-01-18"^^xsd:date ;
    med:dosage "1 tablet" ;
    med:frequency "Once daily at night" ;
    med:durationDays 10 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_49 med:issuedPrescription res:Rx_36 , res:Rx_37 .
res:Pat_IBR110 med:hasPrescription res:Rx_36 , res:Rx_37 .

res:Lab_28 a med:LabOrder ;
    med:analyte "INR" ; med:forPatient res:Pat_IBR110 ;
    med:date "2025-01-18"^^xsd:date ; med:orderedBy res:Doc_Priya ;
    med:testsFor res:Stroke ;
    med:orderStatus "Resulted" ;
    med:hasResult res:Res_28 .

res:Res_28 a med:LabResult ;
    med:analyte "INR" ; med:value 1.74 ; med:unit "ratio" ;
    med:refLow 0.9 ; med:refHigh 1.2 ; med:outOfRange true ;
    med:date "2025-01-19"^^xsd:date ;
    med:performedBy res:Tech_Mohan .

res:Enc_49 med:orderedTest res:Lab_28 .

res:Inv_37 a med:Invoice ;
    med:forPatient res:Pat_IBR110 ; med:date "2025-01-18"^^xsd:date ;
    med:amount 2883 ; med:paid true ;
    med:status "Settled" .
res:Inv_37 med:coveredBy res:Policy_IBR110 .
res:Pat_IBR110 med:hasInvoice res:Inv_37 .

res:Enc_50 a med:Consultation ;
    med:encounterOf res:Pat_IBR110 ; med:date "2025-11-05"^^xsd:date ;
    med:time "11:45" ;
    med:attendedBy res:Doc_Joseph ; med:inDepartment res:Dept_GeneralMedicine ;
    med:reason "Review of dyslipidemia" ;
    med:outcome "Treatment continued" ;
    med:recordedCondition res:Cond_32 ;
    med:hasVitals res:Vit_50 ; med:hasNote res:Note_50 .

res:Vit_50 a med:VitalSigns ;
    med:systolic 173 ; med:diastolic 104 ;
    med:heartRate 65 ; med:temperature 99.9 ;
    med:spo2 96 ;
    med:weightKg 53.2 ;
    med:bmi 23.6 .

res:Note_50 a med:ClinicalNote ;
    med:authorName "Dr. Joseph" ;
    med:date "2025-11-05"^^xsd:date ;
    med:noteText "Referred from general medicine for specialist opinion. Advised on diet, salt restriction and daily walking." .

res:Lab_29 a med:LabOrder ;
    med:analyte "LDL cholesterol" ; med:forPatient res:Pat_IBR110 ;
    med:date "2025-11-05"^^xsd:date ; med:orderedBy res:Doc_Joseph ;
    med:testsFor res:Dyslipidemia ;
    med:orderStatus "Resulted" ;
    med:hasResult res:Res_29 .

res:Res_29 a med:LabResult ;
    med:analyte "LDL cholesterol" ; med:value 189.66 ; med:unit "mg/dL" ;
    med:refLow 0 ; med:refHigh 100 ; med:outOfRange true ;
    med:date "2025-11-06"^^xsd:date ;
    med:performedBy res:Tech_Mohan .

res:Lab_30 a med:LabOrder ;
    med:analyte "Triglycerides" ; med:forPatient res:Pat_IBR110 ;
    med:date "2025-11-05"^^xsd:date ; med:orderedBy res:Doc_Joseph ;
    med:testsFor res:Dyslipidemia ;
    med:orderStatus "Resulted" ;
    med:hasResult res:Res_30 .

res:Res_30 a med:LabResult ;
    med:analyte "Triglycerides" ; med:value 247.93 ; med:unit "mg/dL" ;
    med:refLow 0 ; med:refHigh 150 ; med:outOfRange true ;
    med:date "2025-11-06"^^xsd:date ;
    med:performedBy res:Tech_Mohan .

res:Enc_50 med:orderedTest res:Lab_29 , res:Lab_30 .

res:Inv_38 a med:Invoice ;
    med:forPatient res:Pat_IBR110 ; med:date "2025-11-05"^^xsd:date ;
    med:amount 3055 ; med:paid true ;
    med:status "Settled" .
res:Inv_38 med:coveredBy res:Policy_IBR110 .
res:Pat_IBR110 med:hasInvoice res:Inv_38 .

res:Enc_51 a med:DayCareVisit ;
    med:encounterOf res:Pat_IBR110 ; med:date "2026-08-28"^^xsd:date ;
    med:time "15:15" ;
    med:attendedBy res:Doc_Joseph ; med:inDepartment res:Dept_GeneralMedicine ;
    med:reason "Review of hypertension" ;
    med:outcome "Follow up scheduled" ;
    med:recordedCondition res:Cond_30 ;
    med:hasVitals res:Vit_51 ; med:hasNote res:Note_51 .

res:Vit_51 a med:VitalSigns ;
    med:systolic 144 ; med:diastolic 104 ;
    med:heartRate 89 ; med:temperature 97.3 ;
    med:spo2 98 ;
    med:weightKg 74.2 ;
    med:bmi 24.5 .

res:Note_51 a med:ClinicalNote ;
    med:authorName "Dr. Joseph" ;
    med:date "2026-08-28"^^xsd:date ;
    med:noteText "Seen for worsening symptoms over the past week. Referral raised to the relevant specialty." .

res:Policy_IBR110 a med:InsurancePolicy ;
    med:policyNumber "HD-175847" ;
    med:issuedBy res:Ins_HDFCErgo ; med:coveragePercent 75 ;
    med:amount 200000 .
res:Pat_IBR110 med:hasPolicy res:Policy_IBR110 .

res:Pat_NIR111 a med:OutPatient ;
    med:name "Nirmala Sundaram" ; med:mrn "MRN-NIR111" ; med:photoInitials "NS" ;
    med:sex "Female" ; med:dateOfBirth "1991-07-14"^^xsd:date ; med:age 35 ;
    med:bloodGroup "AB+" ; med:phone "+91 94836 342901" ; med:email "nirmala.sundaram@example.in" ;
    med:address "44 Velachery Main Road, Medavakkam, Chennai" ;
    med:primaryPhysician res:Doc_Anand ;
    med:hasCondition res:Cond_33 , res:Cond_34 , res:Cond_35 .

res:Cond_33 a med:Condition ;
    med:ofDisease res:BreastCancer ; med:onsetDate "2026-04-17"^^xsd:date ;
    med:severity "Moderate" ;
    med:clinicalStatus "Resolved" ;
    med:resolvedDate "2026-07-07"^^xsd:date ;
    med:diagnosedBy res:Doc_Anand .

res:Cond_34 a med:Condition ;
    med:ofDisease res:Depression ; med:onsetDate "2023-05-13"^^xsd:date ;
    med:severity "Moderate" ;
    med:clinicalStatus "Active" ;
    med:diagnosedBy res:Doc_Leela .

res:Cond_35 a med:Condition ;
    med:ofDisease res:Hypothyroidism ; med:onsetDate "2017-08-10"^^xsd:date ;
    med:severity "Mild" ;
    med:clinicalStatus "Active" ;
    med:diagnosedBy res:Doc_Nithya .

res:Pat_NIR111 med:hasEncounter res:Enc_52 , res:Enc_53 , res:Enc_54 .

res:Enc_52 a med:Consultation ;
    med:encounterOf res:Pat_NIR111 ; med:date "2023-11-20"^^xsd:date ;
    med:time "13:00" ;
    med:attendedBy res:Doc_Leela ; med:inDepartment res:Dept_Psychiatry ;
    med:reason "First presentation" ;
    med:outcome "Discharged with advice" ;
    med:recordedCondition res:Cond_34 ;
    med:hasVitals res:Vit_52 ; med:hasNote res:Note_52 .

res:Vit_52 a med:VitalSigns ;
    med:systolic 111 ; med:diastolic 77 ;
    med:heartRate 77 ; med:temperature 97.7 ;
    med:spo2 96 ;
    med:weightKg 71.3 ;
    med:bmi 25.5 .

res:Note_52 a med:ClinicalNote ;
    med:authorName "Dr. Leela" ;
    med:date "2023-11-20"^^xsd:date ;
    med:noteText "Referred from general medicine for specialist opinion. Advised on diet, salt restriction and daily walking." .

res:Inv_39 a med:Invoice ;
    med:forPatient res:Pat_NIR111 ; med:date "2023-11-20"^^xsd:date ;
    med:amount 1407 ; med:paid true ;
    med:status "Settled" .
res:Inv_39 med:coveredBy res:Policy_NIR111 .
res:Pat_NIR111 med:hasInvoice res:Inv_39 .

res:Enc_53 a med:Consultation ;
    med:encounterOf res:Pat_NIR111 ; med:date "2025-05-02"^^xsd:date ;
    med:time "13:45" ;
    med:attendedBy res:Doc_Anand ; med:inDepartment res:Dept_Oncology ;
    med:reason "Review of breast cancer" ;
    med:outcome "Discharged with advice" ;
    med:recordedCondition res:Cond_33 ;
    med:hasVitals res:Vit_53 ; med:hasNote res:Note_53 .

res:Vit_53 a med:VitalSigns ;
    med:systolic 121 ; med:diastolic 69 ;
    med:heartRate 96 ; med:temperature 97.2 ;
    med:spo2 96 ;
    med:weightKg 49.8 ;
    med:bmi 24.0 .

res:Note_53 a med:ClinicalNote ;
    med:authorName "Dr. Anand" ;
    med:date "2025-05-02"^^xsd:date ;
    med:noteText "Presents with a two day history of symptoms. Dose adjusted, repeat bloods before next visit." .

res:Rx_38 a med:Prescription ;
    med:prescribes res:Med_Tamoxifen ; med:prescribedBy res:Doc_Anand ;
    med:forPatient res:Pat_NIR111 ; med:date "2025-05-02"^^xsd:date ;
    med:dosage "1 tablet" ;
    med:frequency "Twice daily" ;
    med:durationDays 7 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_53 med:issuedPrescription res:Rx_38 .
res:Pat_NIR111 med:hasPrescription res:Rx_38 .

res:Lab_31 a med:LabOrder ;
    med:analyte "CA 15-3" ; med:forPatient res:Pat_NIR111 ;
    med:date "2025-05-02"^^xsd:date ; med:orderedBy res:Doc_Anand ;
    med:testsFor res:BreastCancer ;
    med:orderStatus "Resulted" ;
    med:hasResult res:Res_31 .

res:Res_31 a med:LabResult ;
    med:analyte "CA 15-3" ; med:value 47.97 ; med:unit "U/mL" ;
    med:refLow 0 ; med:refHigh 30 ; med:outOfRange true ;
    med:date "2025-05-03"^^xsd:date ;
    med:performedBy res:Tech_Mohan .

res:Enc_53 med:orderedTest res:Lab_31 .

res:Inv_40 a med:Invoice ;
    med:forPatient res:Pat_NIR111 ; med:date "2025-05-02"^^xsd:date ;
    med:amount 4073 ; med:paid true ;
    med:status "Settled" .
res:Inv_40 med:coveredBy res:Policy_NIR111 .
res:Pat_NIR111 med:hasInvoice res:Inv_40 .

res:Enc_54 a med:EmergencyVisit ;
    med:encounterOf res:Pat_NIR111 ; med:date "2026-08-30"^^xsd:date ;
    med:time "13:45" ;
    med:attendedBy res:Doc_Karthik ; med:inDepartment res:Dept_Emergency ;
    med:reason "Acute presentation" ;
    med:outcome "Discharged with advice" ;
    med:recordedCondition res:Cond_34 ;
    med:hasVitals res:Vit_54 ; med:hasNote res:Note_54 .

res:Vit_54 a med:VitalSigns ;
    med:systolic 116 ; med:diastolic 78 ;
    med:heartRate 86 ; med:temperature 99.1 ;
    med:spo2 100 ;
    med:weightKg 48.6 ;
    med:bmi 20.2 .

res:Note_54 a med:ClinicalNote ;
    med:authorName "Dr. Karthik" ;
    med:date "2026-08-30"^^xsd:date ;
    med:noteText "Reviewed in clinic today. Advised on diet, salt restriction and daily walking." .

res:Rx_39 a med:Prescription ;
    med:prescribes res:Med_Sertraline ; med:prescribedBy res:Doc_Karthik ;
    med:forPatient res:Pat_NIR111 ; med:date "2026-08-30"^^xsd:date ;
    med:dosage "1 dose" ;
    med:frequency "Three times daily" ;
    med:durationDays 60 ;
    med:dispensed true ;
    med:status "Active" .

res:Enc_54 med:issuedPrescription res:Rx_39 .
res:Pat_NIR111 med:hasPrescription res:Rx_39 .

res:Inv_41 a med:Invoice ;
    med:forPatient res:Pat_NIR111 ; med:date "2026-08-30"^^xsd:date ;
    med:amount 18644 ; med:paid false ;
    med:status "Insurance claim pending" .
res:Inv_41 med:coveredBy res:Policy_NIR111 .
res:Pat_NIR111 med:hasInvoice res:Inv_41 .

res:Policy_NIR111 a med:InsurancePolicy ;
    med:policyNumber "HD-676443" ;
    med:issuedBy res:Ins_HDFCErgo ; med:coveragePercent 60 ;
    med:amount 300000 .
res:Pat_NIR111 med:hasPolicy res:Policy_NIR111 .

res:Pat_ARA112 a med:OutPatient ;
    med:name "Aravind Ali" ; med:mrn "MRN-ARA112" ; med:photoInitials "AA" ;
    med:sex "Male" ; med:dateOfBirth "2010-07-07"^^xsd:date ; med:age 16 ;
    med:bloodGroup "B+" ; med:phone "+91 93521 693536" ; med:email "aravind.ali@example.in" ;
    med:address "57 Velachery Main Road, Pallikaranai, Chennai" ;
    med:primaryPhysician res:Doc_Sameer ;
    med:hasCondition res:Cond_36 , res:Cond_37 .

res:Cond_36 a med:Condition ;
    med:ofDisease res:Asthma ; med:onsetDate "2025-11-13"^^xsd:date ;
    med:severity "Moderate" ;
    med:clinicalStatus "Active" ;
    med:diagnosedBy res:Doc_Sameer .

res:Cond_37 a med:Condition ;
    med:ofDisease res:AnxietyDisorder ; med:onsetDate "2024-11-17"^^xsd:date ;
    med:severity "Mild" ;
    med:clinicalStatus "Resolved" ;
    med:resolvedDate "2025-04-02"^^xsd:date ;
    med:diagnosedBy res:Doc_Leela .

res:Pat_ARA112 med:hasEncounter res:Enc_55 , res:Enc_56 , res:Enc_57 , res:Enc_58 , res:Enc_59 .

res:Enc_55 a med:EmergencyVisit ;
    med:encounterOf res:Pat_ARA112 ; med:date "2023-05-16"^^xsd:date ;
    med:time "13:30" ;
    med:attendedBy res:Doc_Karthik ; med:inDepartment res:Dept_Emergency ;
    med:reason "Acute presentation" ;
    med:outcome "Referred for tests" ;
    med:recordedCondition res:Cond_36 ;
    med:hasVitals res:Vit_55 ; med:hasNote res:Note_55 .

res:Vit_55 a med:VitalSigns ;
    med:systolic 115 ; med:diastolic 76 ;
    med:heartRate 86 ; med:temperature 100.1 ;
    med:spo2 90 ;
    med:weightKg 74.4 ;
    med:bmi 22.3 .

res:Note_55 a med:ClinicalNote ;
    med:authorName "Dr. Karthik" ;
    med:date "2023-05-16"^^xsd:date ;
    med:noteText "Post discharge review. Referral raised to the relevant specialty." .

res:Rx_40 a med:Prescription ;
    med:prescribes res:Med_Salbutamol ; med:prescribedBy res:Doc_Karthik ;
    med:forPatient res:Pat_ARA112 ; med:date "2023-05-16"^^xsd:date ;
    med:dosage "1 dose" ;
    med:frequency "Three times daily" ;
    med:durationDays 90 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_55 med:issuedPrescription res:Rx_40 .
res:Pat_ARA112 med:hasPrescription res:Rx_40 .

res:Enc_56 a med:FollowUp ;
    med:encounterOf res:Pat_ARA112 ; med:date "2024-03-15"^^xsd:date ;
    med:time "11:30" ;
    med:attendedBy res:Doc_Leela ; med:inDepartment res:Dept_Psychiatry ;
    med:reason "Review of anxiety disorder" ;
    med:outcome "Follow up scheduled" ;
    med:recordedCondition res:Cond_37 ;
    med:hasVitals res:Vit_56 ; med:hasNote res:Note_56 .

res:Vit_56 a med:VitalSigns ;
    med:systolic 129 ; med:diastolic 81 ;
    med:heartRate 76 ; med:temperature 98.4 ;
    med:spo2 92 ;
    med:weightKg 51.4 ;
    med:bmi 22.8 .

res:Note_56 a med:ClinicalNote ;
    med:authorName "Dr. Leela" ;
    med:date "2024-03-15"^^xsd:date ;
    med:noteText "Seen for worsening symptoms over the past week. Reassured. No change to treatment at this stage." .

res:Inv_42 a med:Invoice ;
    med:forPatient res:Pat_ARA112 ; med:date "2024-03-15"^^xsd:date ;
    med:amount 2521 ; med:paid true ;
    med:status "Settled" .
res:Inv_42 med:coveredBy res:Policy_ARA112 .
res:Pat_ARA112 med:hasInvoice res:Inv_42 .

res:Enc_57 a med:Admission ;
    med:encounterOf res:Pat_ARA112 ; med:date "2025-01-23"^^xsd:date ;
    med:time "11:30" ;
    med:attendedBy res:Doc_Leela ; med:inDepartment res:Dept_Psychiatry ;
    med:reason "Review of anxiety disorder" ;
    med:outcome "Admitted to ward" ;
    med:lengthOfStay 8 ;
    med:recordedCondition res:Cond_37 ;
    med:hasVitals res:Vit_57 ; med:hasNote res:Note_57 .

res:Vit_57 a med:VitalSigns ;
    med:systolic 123 ; med:diastolic 83 ;
    med:heartRate 77 ; med:temperature 97.5 ;
    med:spo2 92 ;
    med:weightKg 75.3 ;
    med:bmi 26.9 .

res:Note_57 a med:ClinicalNote ;
    med:authorName "Dr. Leela" ;
    med:date "2025-01-23"^^xsd:date ;
    med:noteText "Attends for scheduled follow up. Continue current therapy, review in three months." .

res:Rx_41 a med:Prescription ;
    med:prescribes res:Med_Sertraline ; med:prescribedBy res:Doc_Leela ;
    med:forPatient res:Pat_ARA112 ; med:date "2025-01-23"^^xsd:date ;
    med:dosage "1 tablet" ;
    med:frequency "Twice daily" ;
    med:durationDays 7 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_57 med:issuedPrescription res:Rx_41 .
res:Pat_ARA112 med:hasPrescription res:Rx_41 .

res:Inv_43 a med:Invoice ;
    med:forPatient res:Pat_ARA112 ; med:date "2025-01-23"^^xsd:date ;
    med:amount 215441 ; med:paid true ;
    med:status "Settled" .
res:Inv_43 med:coveredBy res:Policy_ARA112 .
res:Pat_ARA112 med:hasInvoice res:Inv_43 .

res:Enc_58 a med:FollowUp ;
    med:encounterOf res:Pat_ARA112 ; med:date "2025-11-17"^^xsd:date ;
    med:time "17:30" ;
    med:attendedBy res:Doc_Leela ; med:inDepartment res:Dept_Psychiatry ;
    med:reason "Review of anxiety disorder" ;
    med:outcome "Discharged with advice" ;
    med:recordedCondition res:Cond_37 ;
    med:hasVitals res:Vit_58 ; med:hasNote res:Note_58 .

res:Vit_58 a med:VitalSigns ;
    med:systolic 118 ; med:diastolic 76 ;
    med:heartRate 93 ; med:temperature 98.2 ;
    med:spo2 93 ;
    med:weightKg 53.0 ;
    med:bmi 26.5 .

res:Note_58 a med:ClinicalNote ;
    med:authorName "Dr. Leela" ;
    med:date "2025-11-17"^^xsd:date ;
    med:noteText "Seen for worsening symptoms over the past week. Advised on diet, salt restriction and daily walking." .

res:Rx_42 a med:Prescription ;
    med:prescribes res:Med_Sertraline ; med:prescribedBy res:Doc_Leela ;
    med:forPatient res:Pat_ARA112 ; med:date "2025-11-17"^^xsd:date ;
    med:dosage "1 tablet" ;
    med:frequency "As required" ;
    med:durationDays 7 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_58 med:issuedPrescription res:Rx_42 .
res:Pat_ARA112 med:hasPrescription res:Rx_42 .

res:Inv_44 a med:Invoice ;
    med:forPatient res:Pat_ARA112 ; med:date "2025-11-17"^^xsd:date ;
    med:amount 5535 ; med:paid true ;
    med:status "Settled" .
res:Inv_44 med:coveredBy res:Policy_ARA112 .
res:Pat_ARA112 med:hasInvoice res:Inv_44 .

res:Enc_59 a med:Consultation ;
    med:encounterOf res:Pat_ARA112 ; med:date "2026-08-30"^^xsd:date ;
    med:time "13:15" ;
    med:attendedBy res:Doc_Sameer ; med:inDepartment res:Dept_Pulmonology ;
    med:reason "Review of asthma" ;
    med:outcome "Referred for tests" ;
    med:recordedCondition res:Cond_36 ;
    med:hasVitals res:Vit_59 ; med:hasNote res:Note_59 .

res:Vit_59 a med:VitalSigns ;
    med:systolic 134 ; med:diastolic 75 ;
    med:heartRate 76 ; med:temperature 99.9 ;
    med:spo2 94 ;
    med:weightKg 49.2 ;
    med:bmi 25.6 .

res:Note_59 a med:ClinicalNote ;
    med:authorName "Dr. Sameer" ;
    med:date "2026-08-30"^^xsd:date ;
    med:noteText "Seen for worsening symptoms over the past week. Referral raised to the relevant specialty." .

res:Inv_45 a med:Invoice ;
    med:forPatient res:Pat_ARA112 ; med:date "2026-08-30"^^xsd:date ;
    med:amount 5912 ; med:paid true ;
    med:status "Settled" .
res:Inv_45 med:coveredBy res:Policy_ARA112 .
res:Pat_ARA112 med:hasInvoice res:Inv_45 .

res:Policy_ARA112 a med:InsurancePolicy ;
    med:policyNumber "ST-622200" ;
    med:issuedBy res:Ins_StarHealth ; med:coveragePercent 60 ;
    med:amount 750000 .
res:Pat_ARA112 med:hasPolicy res:Policy_ARA112 .

res:Pat_NIR113 a med:OutPatient ;
    med:name "Nirmala Shetty" ; med:mrn "MRN-NIR113" ; med:photoInitials "NS" ;
    med:sex "Female" ; med:dateOfBirth "1963-05-03"^^xsd:date ; med:age 63 ;
    med:bloodGroup "A+" ; med:phone "+91 96770 487003" ; med:email "nirmala.shetty@example.in" ;
    med:address "24 Bharathi Street, Perungudi, Chennai" ;
    med:primaryPhysician res:Doc_Sameer ;
    med:allergicTo res:Allergen_Sulfa ;
    med:hasCondition res:Cond_38 .

res:Cond_38 a med:Condition ;
    med:ofDisease res:COPD ; med:onsetDate "2016-10-24"^^xsd:date ;
    med:severity "Moderate" ;
    med:clinicalStatus "Active" ;
    med:diagnosedBy res:Doc_Sameer .

res:Pat_NIR113 med:hasEncounter res:Enc_60 , res:Enc_61 , res:Enc_62 , res:Enc_63 , res:Enc_64 .

res:Enc_60 a med:Consultation ;
    med:encounterOf res:Pat_NIR113 ; med:date "2023-05-06"^^xsd:date ;
    med:time "17:45" ;
    med:attendedBy res:Doc_Sameer ; med:inDepartment res:Dept_Pulmonology ;
    med:reason "First presentation" ;
    med:outcome "Treatment continued" ;
    med:recordedCondition res:Cond_38 ;
    med:hasVitals res:Vit_60 ; med:hasNote res:Note_60 .

res:Vit_60 a med:VitalSigns ;
    med:systolic 109 ; med:diastolic 84 ;
    med:heartRate 80 ; med:temperature 98.7 ;
    med:spo2 91 ;
    med:weightKg 61.6 ;
    med:bmi 25.1 .

res:Note_60 a med:ClinicalNote ;
    med:authorName "Dr. Sameer" ;
    med:date "2023-05-06"^^xsd:date ;
    med:noteText "Post discharge review. Continue current therapy, review in three months." .

res:Rx_43 a med:Prescription ;
    med:prescribes res:Med_Tiotropium ; med:prescribedBy res:Doc_Sameer ;
    med:forPatient res:Pat_NIR113 ; med:date "2023-05-06"^^xsd:date ;
    med:dosage "1 tablet" ;
    med:frequency "Once daily at night" ;
    med:durationDays 30 ;
    med:dispensed true ;
    med:status "Completed" .

res:Rx_44 a med:Prescription ;
    med:prescribes res:Med_Salbutamol ; med:prescribedBy res:Doc_Sameer ;
    med:forPatient res:Pat_NIR113 ; med:date "2023-05-06"^^xsd:date ;
    med:dosage "1 tablet" ;
    med:frequency "Twice daily" ;
    med:durationDays 90 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_60 med:issuedPrescription res:Rx_43 , res:Rx_44 .
res:Pat_NIR113 med:hasPrescription res:Rx_43 , res:Rx_44 .

res:Enc_61 a med:Admission ;
    med:encounterOf res:Pat_NIR113 ; med:date "2024-03-04"^^xsd:date ;
    med:time "13:15" ;
    med:attendedBy res:Doc_Sameer ; med:inDepartment res:Dept_Pulmonology ;
    med:reason "Review of c o p d" ;
    med:outcome "Admitted to ward" ;
    med:lengthOfStay 2 ;
    med:recordedCondition res:Cond_38 ;
    med:hasVitals res:Vit_61 ; med:hasNote res:Note_61 .

res:Vit_61 a med:VitalSigns ;
    med:systolic 128 ; med:diastolic 74 ;
    med:heartRate 73 ; med:temperature 98.1 ;
    med:spo2 90 ;
    med:weightKg 66.1 ;
    med:bmi 22.6 .

res:Note_61 a med:ClinicalNote ;
    med:authorName "Dr. Sameer" ;
    med:date "2024-03-04"^^xsd:date ;
    med:noteText "Seen for worsening symptoms over the past week. Reassured. No change to treatment at this stage." .

res:Rx_45 a med:Prescription ;
    med:prescribes res:Med_Tiotropium ; med:prescribedBy res:Doc_Sameer ;
    med:forPatient res:Pat_NIR113 ; med:date "2024-03-04"^^xsd:date ;
    med:dosage "1 dose" ;
    med:frequency "Three times daily" ;
    med:durationDays 60 ;
    med:dispensed true ;
    med:status "Completed" .

res:Rx_46 a med:Prescription ;
    med:prescribes res:Med_Salbutamol ; med:prescribedBy res:Doc_Sameer ;
    med:forPatient res:Pat_NIR113 ; med:date "2024-03-04"^^xsd:date ;
    med:dosage "1 tablet" ;
    med:frequency "Three times daily" ;
    med:durationDays 90 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_61 med:issuedPrescription res:Rx_45 , res:Rx_46 .
res:Pat_NIR113 med:hasPrescription res:Rx_45 , res:Rx_46 .

res:Enc_62 a med:Consultation ;
    med:encounterOf res:Pat_NIR113 ; med:date "2025-01-21"^^xsd:date ;
    med:time "18:45" ;
    med:attendedBy res:Doc_Sameer ; med:inDepartment res:Dept_Pulmonology ;
    med:reason "Review of c o p d" ;
    med:outcome "Treatment continued" ;
    med:recordedCondition res:Cond_38 ;
    med:hasVitals res:Vit_62 ; med:hasNote res:Note_62 .

res:Vit_62 a med:VitalSigns ;
    med:systolic 129 ; med:diastolic 73 ;
    med:heartRate 63 ; med:temperature 98.7 ;
    med:spo2 92 ;
    med:weightKg 52.1 ;
    med:bmi 19.6 .

res:Note_62 a med:ClinicalNote ;
    med:authorName "Dr. Sameer" ;
    med:date "2025-01-21"^^xsd:date ;
    med:noteText "Post discharge review. Counselled on medication adherence. Red flag symptoms explained." .

res:Rx_47 a med:Prescription ;
    med:prescribes res:Med_Salbutamol ; med:prescribedBy res:Doc_Sameer ;
    med:forPatient res:Pat_NIR113 ; med:date "2025-01-21"^^xsd:date ;
    med:dosage "1 tablet" ;
    med:frequency "Once daily" ;
    med:durationDays 30 ;
    med:dispensed true ;
    med:status "Completed" .

res:Rx_48 a med:Prescription ;
    med:prescribes res:Med_Tiotropium ; med:prescribedBy res:Doc_Sameer ;
    med:forPatient res:Pat_NIR113 ; med:date "2025-01-21"^^xsd:date ;
    med:dosage "1 tablet" ;
    med:frequency "As required" ;
    med:durationDays 60 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_62 med:issuedPrescription res:Rx_47 , res:Rx_48 .
res:Pat_NIR113 med:hasPrescription res:Rx_47 , res:Rx_48 .

res:Inv_46 a med:Invoice ;
    med:forPatient res:Pat_NIR113 ; med:date "2025-01-21"^^xsd:date ;
    med:amount 5477 ; med:paid true ;
    med:status "Settled" .
res:Inv_46 med:coveredBy res:Policy_NIR113 .
res:Pat_NIR113 med:hasInvoice res:Inv_46 .

res:Enc_63 a med:Screening ;
    med:encounterOf res:Pat_NIR113 ; med:date "2025-11-12"^^xsd:date ;
    med:time "11:00" ;
    med:attendedBy res:Doc_Sameer ; med:inDepartment res:Dept_Pulmonology ;
    med:reason "Review of c o p d" ;
    med:outcome "Referred for tests" ;
    med:recordedCondition res:Cond_38 ;
    med:hasVitals res:Vit_63 ; med:hasNote res:Note_63 .

res:Vit_63 a med:VitalSigns ;
    med:systolic 119 ; med:diastolic 73 ;
    med:heartRate 71 ; med:temperature 100.5 ;
    med:spo2 90 ;
    med:weightKg 49.4 ;
    med:bmi 19.7 .

res:Note_63 a med:ClinicalNote ;
    med:authorName "Dr. Sameer" ;
    med:date "2025-11-12"^^xsd:date ;
    med:noteText "Post discharge review. Dose adjusted, repeat bloods before next visit." .

res:Rx_49 a med:Prescription ;
    med:prescribes res:Med_Salbutamol ; med:prescribedBy res:Doc_Sameer ;
    med:forPatient res:Pat_NIR113 ; med:date "2025-11-12"^^xsd:date ;
    med:dosage "1 tablet" ;
    med:frequency "Three times daily" ;
    med:durationDays 30 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_63 med:issuedPrescription res:Rx_49 .
res:Pat_NIR113 med:hasPrescription res:Rx_49 .

res:Inv_47 a med:Invoice ;
    med:forPatient res:Pat_NIR113 ; med:date "2025-11-12"^^xsd:date ;
    med:amount 5372 ; med:paid true ;
    med:status "Settled" .
res:Inv_47 med:coveredBy res:Policy_NIR113 .
res:Pat_NIR113 med:hasInvoice res:Inv_47 .

res:Enc_64 a med:Consultation ;
    med:encounterOf res:Pat_NIR113 ; med:date "2026-08-21"^^xsd:date ;
    med:time "17:15" ;
    med:attendedBy res:Doc_Sameer ; med:inDepartment res:Dept_Pulmonology ;
    med:reason "Review of c o p d" ;
    med:outcome "Discharged with advice" ;
    med:recordedCondition res:Cond_38 ;
    med:hasVitals res:Vit_64 ; med:hasNote res:Note_64 .

res:Vit_64 a med:VitalSigns ;
    med:systolic 133 ; med:diastolic 71 ;
    med:heartRate 98 ; med:temperature 100.3 ;
    med:spo2 88 ;
    med:weightKg 75.9 ;
    med:bmi 21.9 .

res:Note_64 a med:ClinicalNote ;
    med:authorName "Dr. Sameer" ;
    med:date "2026-08-21"^^xsd:date ;
    med:noteText "Presents with a two day history of symptoms. Investigations ordered, will call with results." .

res:Inv_48 a med:Invoice ;
    med:forPatient res:Pat_NIR113 ; med:date "2026-08-21"^^xsd:date ;
    med:amount 5586 ; med:paid false ;
    med:status "Insurance claim pending" .
res:Inv_48 med:coveredBy res:Policy_NIR113 .
res:Pat_NIR113 med:hasInvoice res:Inv_48 .

res:Policy_NIR113 a med:InsurancePolicy ;
    med:policyNumber "ST-908315" ;
    med:issuedBy res:Ins_StarHealth ; med:coveragePercent 60 ;
    med:amount 200000 .
res:Pat_NIR113 med:hasPolicy res:Policy_NIR113 .

res:Appt_8 a med:Appointment ;
    med:forPatient res:Pat_NIR113 ; med:appointmentWith res:Doc_Sameer ;
    med:date "2026-09-28"^^xsd:date ;
    med:time "11:20" ;
    med:inDepartment res:Dept_Pulmonology ;
    med:status "Scheduled" .
res:Pat_NIR113 med:hasAppointment res:Appt_8 .

res:Pat_MAL114 a med:OutPatient ;
    med:name "Malathi Nair" ; med:mrn "MRN-MAL114" ; med:photoInitials "MN" ;
    med:sex "Female" ; med:dateOfBirth "1949-01-16"^^xsd:date ; med:age 77 ;
    med:bloodGroup "AB+" ; med:phone "+91 93836 348881" ; med:email "malathi.nair@example.in" ;
    med:address "10 Anna Salai, Velachery, Chennai" ;
    med:primaryPhysician res:Doc_Sameer ;
    med:hasCondition res:Cond_39 , res:Cond_40 .

res:Cond_39 a med:Condition ;
    med:ofDisease res:Tuberculosis ; med:onsetDate "2024-12-04"^^xsd:date ;
    med:severity "Mild" ;
    med:clinicalStatus "Active" ;
    med:diagnosedBy res:Doc_Sameer .

res:Cond_40 a med:Condition ;
    med:ofDisease res:COPD ; med:onsetDate "2020-05-16"^^xsd:date ;
    med:severity "Moderate" ;
    med:clinicalStatus "Active" ;
    med:diagnosedBy res:Doc_Sameer .

res:Pat_MAL114 med:hasEncounter res:Enc_65 , res:Enc_66 , res:Enc_67 , res:Enc_68 , res:Enc_69 .

res:Enc_65 a med:EmergencyVisit ;
    med:encounterOf res:Pat_MAL114 ; med:date "2023-05-03"^^xsd:date ;
    med:time "12:30" ;
    med:attendedBy res:Doc_Karthik ; med:inDepartment res:Dept_Emergency ;
    med:reason "Acute presentation" ;
    med:outcome "Follow up scheduled" ;
    med:recordedCondition res:Cond_40 ;
    med:hasVitals res:Vit_65 ; med:hasNote res:Note_65 .

res:Vit_65 a med:VitalSigns ;
    med:systolic 133 ; med:diastolic 68 ;
    med:heartRate 90 ; med:temperature 98.3 ;
    med:spo2 91 ;
    med:weightKg 68.0 ;
    med:bmi 20.0 .

res:Note_65 a med:ClinicalNote ;
    med:authorName "Dr. Karthik" ;
    med:date "2023-05-03"^^xsd:date ;
    med:noteText "Attends for scheduled follow up. Continue current therapy, review in three months." .

res:Rx_50 a med:Prescription ;
    med:prescribes res:Med_Salbutamol ; med:prescribedBy res:Doc_Karthik ;
    med:forPatient res:Pat_MAL114 ; med:date "2023-05-03"^^xsd:date ;
    med:dosage "1 tablet" ;
    med:frequency "Once daily" ;
    med:durationDays 60 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_65 med:issuedPrescription res:Rx_50 .
res:Pat_MAL114 med:hasPrescription res:Rx_50 .

res:Enc_66 a med:FollowUp ;
    med:encounterOf res:Pat_MAL114 ; med:date "2024-02-29"^^xsd:date ;
    med:time "09:45" ;
    med:attendedBy res:Doc_Sameer ; med:inDepartment res:Dept_Pulmonology ;
    med:reason "Review of tuberculosis" ;
    med:outcome "Follow up scheduled" ;
    med:recordedCondition res:Cond_39 ;
    med:hasVitals res:Vit_66 ; med:hasNote res:Note_66 .

res:Vit_66 a med:VitalSigns ;
    med:systolic 111 ; med:diastolic 68 ;
    med:heartRate 83 ; med:temperature 99.3 ;
    med:spo2 94 ;
    med:weightKg 67.2 ;
    med:bmi 20.6 .

res:Note_66 a med:ClinicalNote ;
    med:authorName "Dr. Sameer" ;
    med:date "2024-02-29"^^xsd:date ;
    med:noteText "Attends for scheduled follow up. Counselled on medication adherence. Red flag symptoms explained." .

res:Inv_49 a med:Invoice ;
    med:forPatient res:Pat_MAL114 ; med:date "2024-02-29"^^xsd:date ;
    med:amount 6307 ; med:paid true ;
    med:status "Settled" .
res:Pat_MAL114 med:hasInvoice res:Inv_49 .

res:Enc_67 a med:FollowUp ;
    med:encounterOf res:Pat_MAL114 ; med:date "2025-01-02"^^xsd:date ;
    med:time "17:45" ;
    med:attendedBy res:Doc_Sameer ; med:inDepartment res:Dept_Pulmonology ;
    med:reason "Review of c o p d" ;
    med:outcome "Referred for tests" ;
    med:recordedCondition res:Cond_40 ;
    med:hasVitals res:Vit_67 ; med:hasNote res:Note_67 .

res:Vit_67 a med:VitalSigns ;
    med:systolic 115 ; med:diastolic 77 ;
    med:heartRate 64 ; med:temperature 98.0 ;
    med:spo2 91 ;
    med:weightKg 74.5 ;
    med:bmi 26.6 .

res:Note_67 a med:ClinicalNote ;
    med:authorName "Dr. Sameer" ;
    med:date "2025-01-02"^^xsd:date ;
    med:noteText "Reviewed in clinic today. Advised on diet, salt restriction and daily walking." .

res:Rx_51 a med:Prescription ;
    med:prescribes res:Med_Tiotropium ; med:prescribedBy res:Doc_Sameer ;
    med:forPatient res:Pat_MAL114 ; med:date "2025-01-02"^^xsd:date ;
    med:dosage "2 tablets" ;
    med:frequency "Three times daily" ;
    med:durationDays 30 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_67 med:issuedPrescription res:Rx_51 .
res:Pat_MAL114 med:hasPrescription res:Rx_51 .

res:Inv_50 a med:Invoice ;
    med:forPatient res:Pat_MAL114 ; med:date "2025-01-02"^^xsd:date ;
    med:amount 1932 ; med:paid true ;
    med:status "Settled" .
res:Pat_MAL114 med:hasInvoice res:Inv_50 .

res:Enc_68 a med:FollowUp ;
    med:encounterOf res:Pat_MAL114 ; med:date "2025-10-25"^^xsd:date ;
    med:time "15:45" ;
    med:attendedBy res:Doc_Sameer ; med:inDepartment res:Dept_Pulmonology ;
    med:reason "Review of tuberculosis" ;
    med:outcome "Discharged with advice" ;
    med:recordedCondition res:Cond_39 ;
    med:hasVitals res:Vit_68 ; med:hasNote res:Note_68 .

res:Vit_68 a med:VitalSigns ;
    med:systolic 132 ; med:diastolic 72 ;
    med:heartRate 99 ; med:temperature 97.9 ;
    med:spo2 88 ;
    med:weightKg 60.9 ;
    med:bmi 24.5 .

res:Note_68 a med:ClinicalNote ;
    med:authorName "Dr. Sameer" ;
    med:date "2025-10-25"^^xsd:date ;
    med:noteText "Attends for scheduled follow up. Continue current therapy, review in three months." .

res:Inv_51 a med:Invoice ;
    med:forPatient res:Pat_MAL114 ; med:date "2025-10-25"^^xsd:date ;
    med:amount 1557 ; med:paid true ;
    med:status "Settled" .
res:Pat_MAL114 med:hasInvoice res:Inv_51 .

res:Enc_69 a med:Admission ;
    med:encounterOf res:Pat_MAL114 ; med:date "2026-08-30"^^xsd:date ;
    med:time "10:00" ;
    med:attendedBy res:Doc_Sameer ; med:inDepartment res:Dept_Pulmonology ;
    med:reason "Review of c o p d" ;
    med:outcome "Admitted to ward" ;
    med:lengthOfStay 8 ;
    med:recordedCondition res:Cond_40 ;
    med:hasVitals res:Vit_69 ; med:hasNote res:Note_69 .

res:Vit_69 a med:VitalSigns ;
    med:systolic 110 ; med:diastolic 83 ;
    med:heartRate 78 ; med:temperature 98.3 ;
    med:spo2 91 ;
    med:weightKg 51.0 ;
    med:bmi 22.2 .

res:Note_69 a med:ClinicalNote ;
    med:authorName "Dr. Sameer" ;
    med:date "2026-08-30"^^xsd:date ;
    med:noteText "Referred from general medicine for specialist opinion. Investigations ordered, will call with results." .

res:Inv_52 a med:Invoice ;
    med:forPatient res:Pat_MAL114 ; med:date "2026-08-30"^^xsd:date ;
    med:amount 238022 ; med:paid true ;
    med:status "Settled" .
res:Pat_MAL114 med:hasInvoice res:Inv_52 .

res:Appt_9 a med:Appointment ;
    med:forPatient res:Pat_MAL114 ; med:appointmentWith res:Doc_Sameer ;
    med:date "2026-09-07"^^xsd:date ;
    med:time "17:20" ;
    med:inDepartment res:Dept_Pulmonology ;
    med:status "Scheduled" .
res:Pat_MAL114 med:hasAppointment res:Appt_9 .

res:Pat_VIN115 a med:OutPatient ;
    med:name "Vinod Verma" ; med:mrn "MRN-VIN115" ; med:photoInitials "VV" ;
    med:sex "Male" ; med:dateOfBirth "1998-12-04"^^xsd:date ; med:age 27 ;
    med:bloodGroup "B+" ; med:phone "+91 93127 569767" ; med:email "vinod.verma@example.in" ;
    med:address "56 Anna Salai, Guindy, Chennai" ;
    med:primaryPhysician res:Doc_Anand ;
    med:hasCondition res:Cond_41 , res:Cond_42 .

res:Cond_41 a med:Condition ;
    med:ofDisease res:LungCancer ; med:onsetDate "2025-08-26"^^xsd:date ;
    med:severity "Moderate" ;
    med:clinicalStatus "Active" ;
    med:diagnosedBy res:Doc_Anand .

res:Cond_42 a med:Condition ;
    med:ofDisease res:Pneumonia ; med:onsetDate "2026-07-01"^^xsd:date ;
    med:severity "Mild" ;
    med:clinicalStatus "Resolved" ;
    med:resolvedDate "2026-08-30"^^xsd:date ;
    med:diagnosedBy res:Doc_Joseph .

res:Pat_VIN115 med:hasEncounter res:Enc_70 , res:Enc_71 .

res:Enc_70 a med:EmergencyVisit ;
    med:encounterOf res:Pat_VIN115 ; med:date "2024-08-16"^^xsd:date ;
    med:time "09:45" ;
    med:attendedBy res:Doc_Karthik ; med:inDepartment res:Dept_Emergency ;
    med:reason "Acute presentation" ;
    med:outcome "Treatment continued" ;
    med:recordedCondition res:Cond_42 ;
    med:hasVitals res:Vit_70 ; med:hasNote res:Note_70 .

res:Vit_70 a med:VitalSigns ;
    med:systolic 108 ; med:diastolic 75 ;
    med:heartRate 96 ; med:temperature 97.6 ;
    med:spo2 96 ;
    med:weightKg 68.4 ;
    med:bmi 19.3 .

res:Note_70 a med:ClinicalNote ;
    med:authorName "Dr. Karthik" ;
    med:date "2024-08-16"^^xsd:date ;
    med:noteText "Presents with a two day history of symptoms. Dose adjusted, repeat bloods before next visit." .

res:Rx_52 a med:Prescription ;
    med:prescribes res:Med_Amoxicillin ; med:prescribedBy res:Doc_Karthik ;
    med:forPatient res:Pat_VIN115 ; med:date "2024-08-16"^^xsd:date ;
    med:dosage "1 dose" ;
    med:frequency "As required" ;
    med:durationDays 10 ;
    med:dispensed true ;
    med:status "Completed" .

res:Rx_53 a med:Prescription ;
    med:prescribes res:Med_Azithromycin ; med:prescribedBy res:Doc_Karthik ;
    med:forPatient res:Pat_VIN115 ; med:date "2024-08-16"^^xsd:date ;
    med:dosage "1 tablet" ;
    med:frequency "As required" ;
    med:durationDays 7 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_70 med:issuedPrescription res:Rx_52 , res:Rx_53 .
res:Pat_VIN115 med:hasPrescription res:Rx_52 , res:Rx_53 .

res:Inv_53 a med:Invoice ;
    med:forPatient res:Pat_VIN115 ; med:date "2024-08-16"^^xsd:date ;
    med:amount 15608 ; med:paid true ;
    med:status "Settled" .
res:Inv_53 med:coveredBy res:Policy_VIN115 .
res:Pat_VIN115 med:hasInvoice res:Inv_53 .

res:Enc_71 a med:Consultation ;
    med:encounterOf res:Pat_VIN115 ; med:date "2026-08-30"^^xsd:date ;
    med:time "13:45" ;
    med:attendedBy res:Doc_Joseph ; med:inDepartment res:Dept_Pulmonology ;
    med:reason "Review of pneumonia" ;
    med:outcome "Discharged with advice" ;
    med:recordedCondition res:Cond_42 ;
    med:hasVitals res:Vit_71 ; med:hasNote res:Note_71 .

res:Vit_71 a med:VitalSigns ;
    med:systolic 115 ; med:diastolic 69 ;
    med:heartRate 73 ; med:temperature 97.9 ;
    med:spo2 96 ;
    med:weightKg 50.3 ;
    med:bmi 24.6 .

res:Note_71 a med:ClinicalNote ;
    med:authorName "Dr. Joseph" ;
    med:date "2026-08-30"^^xsd:date ;
    med:noteText "Presents with a two day history of symptoms. Referral raised to the relevant specialty." .

res:Rx_54 a med:Prescription ;
    med:prescribes res:Med_Azithromycin ; med:prescribedBy res:Doc_Joseph ;
    med:forPatient res:Pat_VIN115 ; med:date "2026-08-30"^^xsd:date ;
    med:dosage "1 tablet" ;
    med:frequency "Once daily" ;
    med:durationDays 7 ;
    med:dispensed false ;
    med:status "Completed" .

res:Enc_71 med:issuedPrescription res:Rx_54 .
res:Pat_VIN115 med:hasPrescription res:Rx_54 .

res:Inv_54 a med:Invoice ;
    med:forPatient res:Pat_VIN115 ; med:date "2026-08-30"^^xsd:date ;
    med:amount 2701 ; med:paid true ;
    med:status "Settled" .
res:Inv_54 med:coveredBy res:Policy_VIN115 .
res:Pat_VIN115 med:hasInvoice res:Inv_54 .

res:Policy_VIN115 a med:InsurancePolicy ;
    med:policyNumber "ST-318447" ;
    med:issuedBy res:Ins_StarHealth ; med:coveragePercent 60 ;
    med:amount 1000000 .
res:Pat_VIN115 med:hasPolicy res:Policy_VIN115 .

res:Appt_10 a med:Appointment ;
    med:forPatient res:Pat_VIN115 ; med:appointmentWith res:Doc_Anand ;
    med:date "2026-09-11"^^xsd:date ;
    med:time "11:20" ;
    med:inDepartment res:Dept_Oncology ;
    med:status "Scheduled" .
res:Pat_VIN115 med:hasAppointment res:Appt_10 .

res:Pat_SAN116 a med:OutPatient ;
    med:name "Sangeetha Mehta" ; med:mrn "MRN-SAN116" ; med:photoInitials "SM" ;
    med:sex "Female" ; med:dateOfBirth "2019-03-15"^^xsd:date ; med:age 7 ;
    med:bloodGroup "O+" ; med:phone "+91 97657 211855" ; med:email "sangeetha.mehta@example.in" ;
    med:address "4 GST Road, Velachery, Chennai" ;
    med:primaryPhysician res:Doc_Karthik ;
    med:hasCondition res:Cond_43 .

res:Cond_43 a med:Condition ;
    med:ofDisease res:Dengue ; med:onsetDate "2025-01-09"^^xsd:date ;
    med:severity "Mild" ;
    med:clinicalStatus "Resolved" ;
    med:resolvedDate "2025-03-10"^^xsd:date ;
    med:diagnosedBy res:Doc_Karthik .

res:Pat_SAN116 med:hasEncounter res:Enc_72 , res:Enc_73 .

res:Enc_72 a med:Consultation ;
    med:encounterOf res:Pat_SAN116 ; med:date "2024-08-20"^^xsd:date ;
    med:time "10:00" ;
    med:attendedBy res:Doc_Karthik ; med:inDepartment res:Dept_GeneralMedicine ;
    med:reason "First presentation" ;
    med:outcome "Treatment continued" ;
    med:recordedCondition res:Cond_43 ;
    med:hasVitals res:Vit_72 ; med:hasNote res:Note_72 .

res:Vit_72 a med:VitalSigns ;
    med:systolic 114 ; med:diastolic 75 ;
    med:heartRate 87 ; med:temperature 98.0 ;
    med:spo2 98 ;
    med:weightKg 70.4 ;
    med:bmi 23.2 .

res:Note_72 a med:ClinicalNote ;
    med:authorName "Dr. Karthik" ;
    med:date "2024-08-20"^^xsd:date ;
    med:noteText "Seen for worsening symptoms over the past week. Advised on diet, salt restriction and daily walking." .

res:Rx_55 a med:Prescription ;
    med:prescribes res:Med_Paracetamol ; med:prescribedBy res:Doc_Karthik ;
    med:forPatient res:Pat_SAN116 ; med:date "2024-08-20"^^xsd:date ;
    med:dosage "1 dose" ;
    med:frequency "Once daily" ;
    med:durationDays 10 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_72 med:issuedPrescription res:Rx_55 .
res:Pat_SAN116 med:hasPrescription res:Rx_55 .

res:Lab_32 a med:LabOrder ;
    med:analyte "Platelet count" ; med:forPatient res:Pat_SAN116 ;
    med:date "2024-08-20"^^xsd:date ; med:orderedBy res:Doc_Karthik ;
    med:testsFor res:Dengue ;
    med:orderStatus "Resulted" ;
    med:hasResult res:Res_32 .

res:Res_32 a med:LabResult ;
    med:analyte "Platelet count" ; med:value 90.51 ; med:unit "x10^3/uL" ;
    med:refLow 150 ; med:refHigh 450 ; med:outOfRange true ;
    med:date "2024-08-21"^^xsd:date ;
    med:performedBy res:Tech_Mohan .

res:Enc_72 med:orderedTest res:Lab_32 .

res:Inv_55 a med:Invoice ;
    med:forPatient res:Pat_SAN116 ; med:date "2024-08-20"^^xsd:date ;
    med:amount 2271 ; med:paid true ;
    med:status "Settled" .
res:Inv_55 med:coveredBy res:Policy_SAN116 .
res:Pat_SAN116 med:hasInvoice res:Inv_55 .

res:Enc_73 a med:EmergencyVisit ;
    med:encounterOf res:Pat_SAN116 ; med:date "2026-08-30"^^xsd:date ;
    med:time "16:45" ;
    med:attendedBy res:Doc_Karthik ; med:inDepartment res:Dept_Emergency ;
    med:reason "Acute presentation" ;
    med:outcome "Treatment continued" ;
    med:recordedCondition res:Cond_43 ;
    med:hasVitals res:Vit_73 ; med:hasNote res:Note_73 .

res:Vit_73 a med:VitalSigns ;
    med:systolic 120 ; med:diastolic 70 ;
    med:heartRate 78 ; med:temperature 99.2 ;
    med:spo2 99 ;
    med:weightKg 62.9 ;
    med:bmi 22.9 .

res:Note_73 a med:ClinicalNote ;
    med:authorName "Dr. Karthik" ;
    med:date "2026-08-30"^^xsd:date ;
    med:noteText "Reviewed in clinic today. Investigations ordered, will call with results." .

res:Rx_56 a med:Prescription ;
    med:prescribes res:Med_Paracetamol ; med:prescribedBy res:Doc_Karthik ;
    med:forPatient res:Pat_SAN116 ; med:date "2026-08-30"^^xsd:date ;
    med:dosage "1 tablet" ;
    med:frequency "Twice daily" ;
    med:durationDays 5 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_73 med:issuedPrescription res:Rx_56 .
res:Pat_SAN116 med:hasPrescription res:Rx_56 .

res:Lab_33 a med:LabOrder ;
    med:analyte "Platelet count" ; med:forPatient res:Pat_SAN116 ;
    med:date "2026-08-30"^^xsd:date ; med:orderedBy res:Doc_Karthik ;
    med:testsFor res:Dengue ;
    med:orderStatus "Resulted" ;
    med:hasResult res:Res_33 .

res:Res_33 a med:LabResult ;
    med:analyte "Platelet count" ; med:value 119.87 ; med:unit "x10^3/uL" ;
    med:refLow 150 ; med:refHigh 450 ; med:outOfRange true ;
    med:date "2026-08-30"^^xsd:date ;
    med:performedBy res:Tech_Mohan .

res:Enc_73 med:orderedTest res:Lab_33 .

res:Policy_SAN116 a med:InsurancePolicy ;
    med:policyNumber "ST-493623" ;
    med:issuedBy res:Ins_StarHealth ; med:coveragePercent 75 ;
    med:amount 300000 .
res:Pat_SAN116 med:hasPolicy res:Policy_SAN116 .

res:Appt_11 a med:Appointment ;
    med:forPatient res:Pat_SAN116 ; med:appointmentWith res:Doc_Joseph ;
    med:date "2026-09-30"^^xsd:date ;
    med:time "17:00" ;
    med:inDepartment res:Dept_GeneralMedicine ;
    med:status "Scheduled" .
res:Pat_SAN116 med:hasAppointment res:Appt_11 .

res:Pat_ANI117 a med:OutPatient ;
    med:name "Anitha Nambiar" ; med:mrn "MRN-ANI117" ; med:photoInitials "AN" ;
    med:sex "Female" ; med:dateOfBirth "1965-04-27"^^xsd:date ; med:age 61 ;
    med:bloodGroup "AB+" ; med:phone "+91 99050 283644" ; med:email "anitha.nambiar@example.in" ;
    med:address "74 Bharathi Street, Tambaram, Chennai" ;
    med:primaryPhysician res:Doc_Vandana ;
    med:allergicTo res:Allergen_Sulfa ;
    med:hasCondition res:Cond_44 , res:Cond_45 , res:Cond_46 , res:Cond_47 , res:Cond_48 , res:Cond_49 .

res:Cond_44 a med:Condition ;
    med:ofDisease res:ChronicKidneyDisease ; med:onsetDate "2025-06-15"^^xsd:date ;
    med:severity "Moderate" ;
    med:clinicalStatus "Active" ;
    med:diagnosedBy res:Doc_Vandana .

res:Cond_45 a med:Condition ;
    med:ofDisease res:Hypertension ; med:onsetDate "2023-04-19"^^xsd:date ;
    med:severity "Moderate" ;
    med:clinicalStatus "Active" ;
    med:diagnosedBy res:Doc_Suresh .

res:Cond_46 a med:Condition ;
    med:ofDisease res:TypeIIDiabetes ; med:onsetDate "2022-04-10"^^xsd:date ;
    med:severity "Moderate" ;
    med:clinicalStatus "Active" ;
    med:diagnosedBy res:Doc_Nithya .

res:Cond_47 a med:Condition ;
    med:ofDisease res:Anemia ; med:onsetDate "2025-08-27"^^xsd:date ;
    med:severity "Mild" ;
    med:clinicalStatus "Active" ;
    med:diagnosedBy res:Doc_Suresh .

res:Cond_48 a med:Condition , med:CriticalCondition ;
    med:ofDisease res:HeartFailure ; med:onsetDate "2021-09-22"^^xsd:date ;
    med:severity "Severe" ;
    med:clinicalStatus "Active" ;
    med:diagnosedBy res:Doc_Farida .

res:Cond_49 a med:Condition ;
    med:ofDisease res:Depression ; med:onsetDate "2020-05-26"^^xsd:date ;
    med:severity "Moderate" ;
    med:clinicalStatus "Active" ;
    med:diagnosedBy res:Doc_Leela .

res:Pat_ANI117 med:hasEncounter res:Enc_74 , res:Enc_75 , res:Enc_76 , res:Enc_77 , res:Enc_78 , res:Enc_79 , res:Enc_80 .

res:Enc_74 a med:EmergencyVisit ;
    med:encounterOf res:Pat_ANI117 ; med:date "2023-02-07"^^xsd:date ;
    med:time "14:15" ;
    med:attendedBy res:Doc_Karthik ; med:inDepartment res:Dept_Emergency ;
    med:reason "Acute presentation" ;
    med:outcome "Discharged with advice" ;
    med:recordedCondition res:Cond_44 ;
    med:hasVitals res:Vit_74 ; med:hasNote res:Note_74 .

res:Vit_74 a med:VitalSigns ;
    med:systolic 154 ; med:diastolic 106 ;
    med:heartRate 98 ; med:temperature 98.0 ;
    med:spo2 96 ;
    med:weightKg 51.1 ;
    med:bmi 25.2 .

res:Note_74 a med:ClinicalNote ;
    med:authorName "Dr. Karthik" ;
    med:date "2023-02-07"^^xsd:date ;
    med:noteText "Attends for scheduled follow up. Advised on diet, salt restriction and daily walking." .

res:Enc_75 a med:Consultation ;
    med:encounterOf res:Pat_ANI117 ; med:date "2023-10-10"^^xsd:date ;
    med:time "13:30" ;
    med:attendedBy res:Doc_Ramesh ; med:inDepartment res:Dept_Cardiology ;
    med:reason "Review of heart failure" ;
    med:outcome "Referred for tests" ;
    med:recordedCondition res:Cond_48 ;
    med:hasVitals res:Vit_75 ; med:hasNote res:Note_75 .

res:Vit_75 a med:VitalSigns ;
    med:systolic 164 ; med:diastolic 97 ;
    med:heartRate 99 ; med:temperature 100.2 ;
    med:spo2 97 ;
    med:weightKg 71.9 ;
    med:bmi 25.2 .

res:Note_75 a med:ClinicalNote ;
    med:authorName "Dr. Ramesh" ;
    med:date "2023-10-10"^^xsd:date ;
    med:noteText "Attends for scheduled follow up. Referral raised to the relevant specialty." .

res:Rx_57 a med:Prescription ;
    med:prescribes res:Med_Metoprolol ; med:prescribedBy res:Doc_Ramesh ;
    med:forPatient res:Pat_ANI117 ; med:date "2023-10-10"^^xsd:date ;
    med:dosage "1 dose" ;
    med:frequency "Once daily at night" ;
    med:durationDays 90 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_75 med:issuedPrescription res:Rx_57 .
res:Pat_ANI117 med:hasPrescription res:Rx_57 .

res:Lab_34 a med:LabOrder ;
    med:analyte "NT-proBNP" ; med:forPatient res:Pat_ANI117 ;
    med:date "2023-10-10"^^xsd:date ; med:orderedBy res:Doc_Ramesh ;
    med:testsFor res:HeartFailure ;
    med:orderStatus "Resulted" ;
    med:hasResult res:Res_34 .

res:Res_34 a med:LabResult ;
    med:analyte "NT-proBNP" ; med:value 672.99 ; med:unit "pg/mL" ;
    med:refLow 0 ; med:refHigh 125 ; med:outOfRange true ;
    med:date "2023-10-11"^^xsd:date ;
    med:performedBy res:Tech_Mohan .

res:Enc_75 med:orderedTest res:Lab_34 .

res:Inv_56 a med:Invoice ;
    med:forPatient res:Pat_ANI117 ; med:date "2023-10-10"^^xsd:date ;
    med:amount 866 ; med:paid true ;
    med:status "Settled" .
res:Pat_ANI117 med:hasInvoice res:Inv_56 .

res:Enc_76 a med:Consultation ;
    med:encounterOf res:Pat_ANI117 ; med:date "2024-05-04"^^xsd:date ;
    med:time "17:45" ;
    med:attendedBy res:Doc_Suresh ; med:inDepartment res:Dept_GeneralMedicine ;
    med:reason "Review of anemia" ;
    med:outcome "Discharged with advice" ;
    med:recordedCondition res:Cond_47 ;
    med:hasVitals res:Vit_76 ; med:hasNote res:Note_76 .

res:Vit_76 a med:VitalSigns ;
    med:systolic 176 ; med:diastolic 108 ;
    med:heartRate 103 ; med:temperature 99.0 ;
    med:spo2 96 ;
    med:weightKg 67.9 ;
    med:bmi 23.5 .

res:Note_76 a med:ClinicalNote ;
    med:authorName "Dr. Suresh" ;
    med:date "2024-05-04"^^xsd:date ;
    med:noteText "Attends for scheduled follow up. Advised on diet, salt restriction and daily walking." .

res:Rx_58 a med:Prescription ;
    med:prescribes res:Med_IronFolate ; med:prescribedBy res:Doc_Suresh ;
    med:forPatient res:Pat_ANI117 ; med:date "2024-05-04"^^xsd:date ;
    med:dosage "1 tablet" ;
    med:frequency "Once daily at night" ;
    med:durationDays 14 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_76 med:issuedPrescription res:Rx_58 .
res:Pat_ANI117 med:hasPrescription res:Rx_58 .

res:Lab_35 a med:LabOrder ;
    med:analyte "Haemoglobin" ; med:forPatient res:Pat_ANI117 ;
    med:date "2024-05-04"^^xsd:date ; med:orderedBy res:Doc_Suresh ;
    med:testsFor res:Anemia ;
    med:orderStatus "Resulted" ;
    med:hasResult res:Res_35 .

res:Res_35 a med:LabResult ;
    med:analyte "Haemoglobin" ; med:value 12.28 ; med:unit "g/dL" ;
    med:refLow 12 ; med:refHigh 15.5 ; med:outOfRange false ;
    med:date "2024-05-05"^^xsd:date ;
    med:performedBy res:Tech_Mohan .

res:Enc_76 med:orderedTest res:Lab_35 .

res:Inv_57 a med:Invoice ;
    med:forPatient res:Pat_ANI117 ; med:date "2024-05-04"^^xsd:date ;
    med:amount 1214 ; med:paid true ;
    med:status "Settled" .
res:Pat_ANI117 med:hasInvoice res:Inv_57 .

res:Enc_77 a med:Screening ;
    med:encounterOf res:Pat_ANI117 ; med:date "2024-12-12"^^xsd:date ;
    med:time "18:15" ;
    med:attendedBy res:Doc_Vandana ; med:inDepartment res:Dept_Nephrology ;
    med:reason "Review of chronic kidney disease" ;
    med:outcome "Discharged with advice" ;
    med:recordedCondition res:Cond_44 ;
    med:hasVitals res:Vit_77 ; med:hasNote res:Note_77 .

res:Vit_77 a med:VitalSigns ;
    med:systolic 151 ; med:diastolic 88 ;
    med:heartRate 93 ; med:temperature 97.3 ;
    med:spo2 97 ;
    med:weightKg 54.2 ;
    med:bmi 21.6 .

res:Note_77 a med:ClinicalNote ;
    med:authorName "Dr. Vandana" ;
    med:date "2024-12-12"^^xsd:date ;
    med:noteText "Post discharge review. Referral raised to the relevant specialty." .

res:Rx_59 a med:Prescription ;
    med:prescribes res:Med_Telmisartan ; med:prescribedBy res:Doc_Vandana ;
    med:forPatient res:Pat_ANI117 ; med:date "2024-12-12"^^xsd:date ;
    med:dosage "2 tablets" ;
    med:frequency "Once daily at night" ;
    med:durationDays 90 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_77 med:issuedPrescription res:Rx_59 .
res:Pat_ANI117 med:hasPrescription res:Rx_59 .

res:Inv_58 a med:Invoice ;
    med:forPatient res:Pat_ANI117 ; med:date "2024-12-12"^^xsd:date ;
    med:amount 5635 ; med:paid false ;
    med:status "Awaiting payment" .
res:Pat_ANI117 med:hasInvoice res:Inv_58 .

res:Enc_78 a med:Admission ;
    med:encounterOf res:Pat_ANI117 ; med:date "2025-06-23"^^xsd:date ;
    med:time "15:45" ;
    med:attendedBy res:Doc_Nithya ; med:inDepartment res:Dept_Endocrinology ;
    med:reason "Review of type i i diabetes" ;
    med:outcome "Admitted to ward" ;
    med:lengthOfStay 9 ;
    med:recordedCondition res:Cond_46 ;
    med:hasVitals res:Vit_78 ; med:hasNote res:Note_78 .

res:Vit_78 a med:VitalSigns ;
    med:systolic 160 ; med:diastolic 106 ;
    med:heartRate 87 ; med:temperature 97.6 ;
    med:spo2 100 ;
    med:weightKg 74.1 ;
    med:bmi 20.0 .

res:Note_78 a med:ClinicalNote ;
    med:authorName "Dr. Nithya" ;
    med:date "2025-06-23"^^xsd:date ;
    med:noteText "Presents with a two day history of symptoms. Dose adjusted, repeat bloods before next visit." .

res:Rx_60 a med:Prescription ;
    med:prescribes res:Med_Insulin ; med:prescribedBy res:Doc_Nithya ;
    med:forPatient res:Pat_ANI117 ; med:date "2025-06-23"^^xsd:date ;
    med:dosage "2 tablets" ;
    med:frequency "Once daily" ;
    med:durationDays 60 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_78 med:issuedPrescription res:Rx_60 .
res:Pat_ANI117 med:hasPrescription res:Rx_60 .

res:Lab_36 a med:LabOrder ;
    med:analyte "HbA1c" ; med:forPatient res:Pat_ANI117 ;
    med:date "2025-06-23"^^xsd:date ; med:orderedBy res:Doc_Nithya ;
    med:testsFor res:TypeIIDiabetes ;
    med:orderStatus "Resulted" ;
    med:hasResult res:Res_36 .

res:Res_36 a med:LabResult ;
    med:analyte "HbA1c" ; med:value 6.38 ; med:unit "%" ;
    med:refLow 4 ; med:refHigh 5.6 ; med:outOfRange true ;
    med:date "2025-06-24"^^xsd:date ;
    med:performedBy res:Tech_Mohan .

res:Lab_37 a med:LabOrder ;
    med:analyte "Fasting glucose" ; med:forPatient res:Pat_ANI117 ;
    med:date "2025-06-23"^^xsd:date ; med:orderedBy res:Doc_Nithya ;
    med:testsFor res:TypeIIDiabetes ;
    med:orderStatus "Resulted" ;
    med:hasResult res:Res_37 .

res:Res_37 a med:LabResult ;
    med:analyte "Fasting glucose" ; med:value 255.75 ; med:unit "mg/dL" ;
    med:refLow 70 ; med:refHigh 100 ; med:outOfRange true ;
    med:date "2025-06-24"^^xsd:date ;
    med:performedBy res:Tech_Mohan .

res:Enc_78 med:orderedTest res:Lab_36 , res:Lab_37 .

res:Enc_79 a med:Consultation ;
    med:encounterOf res:Pat_ANI117 ; med:date "2026-02-12"^^xsd:date ;
    med:time "11:00" ;
    med:attendedBy res:Doc_Leela ; med:inDepartment res:Dept_Psychiatry ;
    med:reason "Review of depression" ;
    med:outcome "Discharged with advice" ;
    med:recordedCondition res:Cond_49 ;
    med:hasVitals res:Vit_79 ; med:hasNote res:Note_79 .

res:Vit_79 a med:VitalSigns ;
    med:systolic 156 ; med:diastolic 92 ;
    med:heartRate 90 ; med:temperature 100.2 ;
    med:spo2 100 ;
    med:weightKg 75.7 ;
    med:bmi 26.8 .

res:Note_79 a med:ClinicalNote ;
    med:authorName "Dr. Leela" ;
    med:date "2026-02-12"^^xsd:date ;
    med:noteText "Presents with a two day history of symptoms. Advised on diet, salt restriction and daily walking." .

res:Inv_59 a med:Invoice ;
    med:forPatient res:Pat_ANI117 ; med:date "2026-02-12"^^xsd:date ;
    med:amount 4683 ; med:paid true ;
    med:status "Settled" .
res:Pat_ANI117 med:hasInvoice res:Inv_59 .

res:Enc_80 a med:FollowUp ;
    med:encounterOf res:Pat_ANI117 ; med:date "2026-08-27"^^xsd:date ;
    med:time "14:00" ;
    med:attendedBy res:Doc_Suresh ; med:inDepartment res:Dept_GeneralMedicine ;
    med:reason "Review of hypertension" ;
    med:outcome "Follow up scheduled" ;
    med:recordedCondition res:Cond_45 ;
    med:hasVitals res:Vit_80 ; med:hasNote res:Note_80 .

res:Vit_80 a med:VitalSigns ;
    med:systolic 160 ; med:diastolic 107 ;
    med:heartRate 79 ; med:temperature 99.5 ;
    med:spo2 98 ;
    med:weightKg 55.8 ;
    med:bmi 22.5 .

res:Note_80 a med:ClinicalNote ;
    med:authorName "Dr. Suresh" ;
    med:date "2026-08-27"^^xsd:date ;
    med:noteText "Reviewed in clinic today. Advised on diet, salt restriction and daily walking." .

res:Appt_12 a med:Appointment ;
    med:forPatient res:Pat_ANI117 ; med:appointmentWith res:Doc_Vandana ;
    med:date "2026-09-14"^^xsd:date ;
    med:time "10:00" ;
    med:inDepartment res:Dept_Nephrology ;
    med:status "Scheduled" .
res:Pat_ANI117 med:hasAppointment res:Appt_12 .

res:Pat_AIS118 a med:OutPatient ;
    med:name "Aisha Nambiar" ; med:mrn "MRN-AIS118" ; med:photoInitials "AN" ;
    med:sex "Female" ; med:dateOfBirth "1985-04-13"^^xsd:date ; med:age 41 ;
    med:bloodGroup "A+" ; med:phone "+91 91989 571921" ; med:email "aisha.nambiar@example.in" ;
    med:address "66 Anna Salai, Kelambakkam, Chennai" ;
    med:primaryPhysician res:Doc_Anand ;
    med:allergicTo res:Allergen_Penicillin ;
    med:hasCondition res:Cond_50 , res:Cond_51 .

res:Cond_50 a med:Condition , med:CriticalCondition ;
    med:ofDisease res:LungCancer ; med:onsetDate "2026-08-20"^^xsd:date ;
    med:severity "Severe" ;
    med:clinicalStatus "Active" ;
    med:diagnosedBy res:Doc_Anand .

res:Cond_51 a med:Condition ;
    med:ofDisease res:Anemia ; med:onsetDate "2026-05-26"^^xsd:date ;
    med:severity "Moderate" ;
    med:clinicalStatus "Active" ;
    med:diagnosedBy res:Doc_Joseph .

res:Pat_AIS118 med:hasEncounter res:Enc_81 .

res:Enc_81 a med:Consultation ;
    med:encounterOf res:Pat_AIS118 ; med:date "2026-08-30"^^xsd:date ;
    med:time "18:00" ;
    med:attendedBy res:Doc_Joseph ; med:inDepartment res:Dept_GeneralMedicine ;
    med:reason "First presentation" ;
    med:outcome "Follow up scheduled" ;
    med:recordedCondition res:Cond_51 ;
    med:hasVitals res:Vit_81 ; med:hasNote res:Note_81 .

res:Vit_81 a med:VitalSigns ;
    med:systolic 111 ; med:diastolic 74 ;
    med:heartRate 100 ; med:temperature 100.2 ;
    med:spo2 98 ;
    med:weightKg 69.4 ;
    med:bmi 25.3 .

res:Note_81 a med:ClinicalNote ;
    med:authorName "Dr. Joseph" ;
    med:date "2026-08-30"^^xsd:date ;
    med:noteText "Patient reports steady improvement since last visit. Dose adjusted, repeat bloods before next visit." .

res:Lab_38 a med:LabOrder ;
    med:analyte "Haemoglobin" ; med:forPatient res:Pat_AIS118 ;
    med:date "2026-08-30"^^xsd:date ; med:orderedBy res:Doc_Joseph ;
    med:testsFor res:Anemia ;
    med:orderStatus "Pending" .

res:Enc_81 med:orderedTest res:Lab_38 .

res:Policy_AIS118 a med:InsurancePolicy ;
    med:policyNumber "ST-422843" ;
    med:issuedBy res:Ins_StarHealth ; med:coveragePercent 85 ;
    med:amount 500000 .
res:Pat_AIS118 med:hasPolicy res:Policy_AIS118 .

res:Pat_ARA119 a med:InPatient ;
    med:name "Aravind Nambiar" ; med:mrn "MRN-ARA119" ; med:photoInitials "AN" ;
    med:sex "Male" ; med:dateOfBirth "1945-05-24"^^xsd:date ; med:age 81 ;
    med:bloodGroup "O+" ; med:phone "+91 94716 980769" ; med:email "aravind.nambiar@example.in" ;
    med:address "31 Gandhi Nagar 2nd Cross, Thoraipakkam, Chennai" ;
    med:primaryPhysician res:Doc_Anand ;
    med:allergicTo res:Allergen_Sulfa ;
    med:hasCondition res:Cond_52 , res:Cond_53 , res:Cond_54 .

res:Cond_52 a med:Condition ;
    med:ofDisease res:BreastCancer ; med:onsetDate "2025-01-12"^^xsd:date ;
    med:severity "Mild" ;
    med:clinicalStatus "Active" ;
    med:diagnosedBy res:Doc_Anand .

res:Cond_53 a med:Condition ;
    med:ofDisease res:Anemia ; med:onsetDate "2024-11-09"^^xsd:date ;
    med:severity "Mild" ;
    med:clinicalStatus "Resolved" ;
    med:resolvedDate "2025-01-23"^^xsd:date ;
    med:diagnosedBy res:Doc_Suresh .

res:Cond_54 a med:Condition ;
    med:ofDisease res:Migraine ; med:onsetDate "2025-01-10"^^xsd:date ;
    med:severity "Mild" ;
    med:clinicalStatus "Active" ;
    med:diagnosedBy res:Doc_Priya .

res:Pat_ARA119 med:hasEncounter res:Enc_82 , res:Enc_83 , res:Enc_84 , res:Enc_85 .

res:Enc_82 a med:Consultation ;
    med:encounterOf res:Pat_ARA119 ; med:date "2023-08-16"^^xsd:date ;
    med:time "16:30" ;
    med:attendedBy res:Doc_Joseph ; med:inDepartment res:Dept_Neurology ;
    med:reason "First presentation" ;
    med:outcome "Treatment continued" ;
    med:recordedCondition res:Cond_54 ;
    med:hasVitals res:Vit_82 ; med:hasNote res:Note_82 .

res:Vit_82 a med:VitalSigns ;
    med:systolic 121 ; med:diastolic 67 ;
    med:heartRate 98 ; med:temperature 97.3 ;
    med:spo2 97 ;
    med:weightKg 52.4 ;
    med:bmi 25.0 .

res:Note_82 a med:ClinicalNote ;
    med:authorName "Dr. Joseph" ;
    med:date "2023-08-16"^^xsd:date ;
    med:noteText "Referred from general medicine for specialist opinion. Counselled on medication adherence. Red flag symptoms explained." .

res:Enc_83 a med:FollowUp ;
    med:encounterOf res:Pat_ARA119 ; med:date "2024-08-13"^^xsd:date ;
    med:time "12:00" ;
    med:attendedBy res:Doc_Joseph ; med:inDepartment res:Dept_GeneralMedicine ;
    med:reason "Review of anemia" ;
    med:outcome "Follow up scheduled" ;
    med:recordedCondition res:Cond_53 ;
    med:hasVitals res:Vit_83 ; med:hasNote res:Note_83 .

res:Vit_83 a med:VitalSigns ;
    med:systolic 118 ; med:diastolic 79 ;
    med:heartRate 69 ; med:temperature 100.0 ;
    med:spo2 96 ;
    med:weightKg 62.2 ;
    med:bmi 20.4 .

res:Note_83 a med:ClinicalNote ;
    med:authorName "Dr. Joseph" ;
    med:date "2024-08-13"^^xsd:date ;
    med:noteText "Attends for scheduled follow up. Reassured. No change to treatment at this stage." .

res:Rx_61 a med:Prescription ;
    med:prescribes res:Med_IronFolate ; med:prescribedBy res:Doc_Joseph ;
    med:forPatient res:Pat_ARA119 ; med:date "2024-08-13"^^xsd:date ;
    med:dosage "1 tablet" ;
    med:frequency "Once daily at night" ;
    med:durationDays 10 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_83 med:issuedPrescription res:Rx_61 .
res:Pat_ARA119 med:hasPrescription res:Rx_61 .

res:Lab_39 a med:LabOrder ;
    med:analyte "Haemoglobin" ; med:forPatient res:Pat_ARA119 ;
    med:date "2024-08-13"^^xsd:date ; med:orderedBy res:Doc_Joseph ;
    med:testsFor res:Anemia ;
    med:orderStatus "Resulted" ;
    med:hasResult res:Res_39 .

res:Res_39 a med:LabResult ;
    med:analyte "Haemoglobin" ; med:value 13.57 ; med:unit "g/dL" ;
    med:refLow 12 ; med:refHigh 15.5 ; med:outOfRange false ;
    med:date "2024-08-14"^^xsd:date ;
    med:performedBy res:Tech_Mohan .

res:Enc_83 med:orderedTest res:Lab_39 .

res:Inv_60 a med:Invoice ;
    med:forPatient res:Pat_ARA119 ; med:date "2024-08-13"^^xsd:date ;
    med:amount 4110 ; med:paid true ;
    med:status "Settled" .
res:Inv_60 med:coveredBy res:Policy_ARA119 .
res:Pat_ARA119 med:hasInvoice res:Inv_60 .

res:Enc_84 a med:Consultation ;
    med:encounterOf res:Pat_ARA119 ; med:date "2025-08-15"^^xsd:date ;
    med:time "10:30" ;
    med:attendedBy res:Doc_Priya ; med:inDepartment res:Dept_Neurology ;
    med:reason "Review of migraine" ;
    med:outcome "Treatment continued" ;
    med:recordedCondition res:Cond_54 ;
    med:hasVitals res:Vit_84 ; med:hasNote res:Note_84 .

res:Vit_84 a med:VitalSigns ;
    med:systolic 129 ; med:diastolic 69 ;
    med:heartRate 93 ; med:temperature 99.9 ;
    med:spo2 100 ;
    med:weightKg 59.8 ;
    med:bmi 21.0 .

res:Note_84 a med:ClinicalNote ;
    med:authorName "Dr. Priya" ;
    med:date "2025-08-15"^^xsd:date ;
    med:noteText "Reviewed in clinic today. Reassured. No change to treatment at this stage." .

res:Rx_62 a med:Prescription ;
    med:prescribes res:Med_Paracetamol ; med:prescribedBy res:Doc_Priya ;
    med:forPatient res:Pat_ARA119 ; med:date "2025-08-15"^^xsd:date ;
    med:dosage "2 tablets" ;
    med:frequency "Three times daily" ;
    med:durationDays 7 ;
    med:dispensed true ;
    med:status "Completed" .

res:Rx_63 a med:Prescription ;
    med:prescribes res:Med_Ibuprofen ; med:prescribedBy res:Doc_Priya ;
    med:forPatient res:Pat_ARA119 ; med:date "2025-08-15"^^xsd:date ;
    med:dosage "1 tablet" ;
    med:frequency "Once daily" ;
    med:durationDays 10 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_84 med:issuedPrescription res:Rx_62 , res:Rx_63 .
res:Pat_ARA119 med:hasPrescription res:Rx_62 , res:Rx_63 .

res:Enc_85 a med:FollowUp ;
    med:encounterOf res:Pat_ARA119 ; med:date "2026-08-30"^^xsd:date ;
    med:time "13:45" ;
    med:attendedBy res:Doc_Joseph ; med:inDepartment res:Dept_Neurology ;
    med:reason "Review of migraine" ;
    med:outcome "Referred for tests" ;
    med:recordedCondition res:Cond_54 ;
    med:hasVitals res:Vit_85 ; med:hasNote res:Note_85 .

res:Vit_85 a med:VitalSigns ;
    med:systolic 113 ; med:diastolic 82 ;
    med:heartRate 79 ; med:temperature 98.1 ;
    med:spo2 99 ;
    med:weightKg 75.6 ;
    med:bmi 27.6 .

res:Note_85 a med:ClinicalNote ;
    med:authorName "Dr. Joseph" ;
    med:date "2026-08-30"^^xsd:date ;
    med:noteText "Patient reports steady improvement since last visit. Dose adjusted, repeat bloods before next visit." .

res:Rx_64 a med:Prescription ;
    med:prescribes res:Med_Ibuprofen ; med:prescribedBy res:Doc_Joseph ;
    med:forPatient res:Pat_ARA119 ; med:date "2026-08-30"^^xsd:date ;
    med:dosage "1 tablet" ;
    med:frequency "As required" ;
    med:durationDays 7 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_85 med:issuedPrescription res:Rx_64 .
res:Pat_ARA119 med:hasPrescription res:Rx_64 .

res:Inv_61 a med:Invoice ;
    med:forPatient res:Pat_ARA119 ; med:date "2026-08-30"^^xsd:date ;
    med:amount 3823 ; med:paid true ;
    med:status "Settled" .
res:Inv_61 med:coveredBy res:Policy_ARA119 .
res:Pat_ARA119 med:hasInvoice res:Inv_61 .

res:Policy_ARA119 a med:InsurancePolicy ;
    med:policyNumber "CG-755066" ;
    med:issuedBy res:Ins_CGHS ; med:coveragePercent 80 ;
    med:amount 750000 .
res:Pat_ARA119 med:hasPolicy res:Policy_ARA119 .

res:Pat_ARA119 med:assignedBed res:Bed_9 .

res:Pat_ANI120 a med:OutPatient ;
    med:name "Anil Kumar" ; med:mrn "MRN-ANI120" ; med:photoInitials "AK" ;
    med:sex "Male" ; med:dateOfBirth "1958-06-22"^^xsd:date ; med:age 68 ;
    med:bloodGroup "O-" ; med:phone "+91 93808 874743" ; med:email "anil.kumar@example.in" ;
    med:address "34 Kamarajar Street, Adyar, Chennai" ;
    med:primaryPhysician res:Doc_Priya ;
    med:allergicTo res:Allergen_Latex ;
    med:hasCondition res:Cond_55 , res:Cond_56 , res:Cond_57 , res:Cond_58 , res:Cond_59 .

res:Cond_55 a med:Condition ;
    med:ofDisease res:Stroke ; med:onsetDate "2026-04-07"^^xsd:date ;
    med:severity "Moderate" ;
    med:clinicalStatus "Resolved" ;
    med:resolvedDate "2026-06-23"^^xsd:date ;
    med:diagnosedBy res:Doc_Priya .

res:Cond_56 a med:Condition ;
    med:ofDisease res:Hypertension ; med:onsetDate "2022-02-11"^^xsd:date ;
    med:severity "Mild" ;
    med:clinicalStatus "Active" ;
    med:diagnosedBy res:Doc_Joseph .

res:Cond_57 a med:Condition ;
    med:ofDisease res:Dementia ; med:onsetDate "2022-01-29"^^xsd:date ;
    med:severity "Moderate" ;
    med:clinicalStatus "Active" ;
    med:diagnosedBy res:Doc_Leela .

res:Cond_58 a med:Condition ;
    med:ofDisease res:Depression ; med:onsetDate "2017-08-26"^^xsd:date ;
    med:severity "Moderate" ;
    med:clinicalStatus "Active" ;
    med:diagnosedBy res:Doc_Leela .

res:Cond_59 a med:Condition ;
    med:ofDisease res:Pneumonia ; med:onsetDate "2025-06-04"^^xsd:date ;
    med:severity "Moderate" ;
    med:clinicalStatus "Resolved" ;
    med:resolvedDate "2025-10-14"^^xsd:date ;
    med:diagnosedBy res:Doc_Joseph .

res:Pat_ANI120 med:hasEncounter res:Enc_86 , res:Enc_87 , res:Enc_88 , res:Enc_89 , res:Enc_90 .

res:Enc_86 a med:Consultation ;
    med:encounterOf res:Pat_ANI120 ; med:date "2023-05-28"^^xsd:date ;
    med:time "16:15" ;
    med:attendedBy res:Doc_Sameer ; med:inDepartment res:Dept_Pulmonology ;
    med:reason "First presentation" ;
    med:outcome "Discharged with advice" ;
    med:recordedCondition res:Cond_59 ;
    med:hasVitals res:Vit_86 ; med:hasNote res:Note_86 .

res:Vit_86 a med:VitalSigns ;
    med:systolic 143 ; med:diastolic 89 ;
    med:heartRate 84 ; med:temperature 98.7 ;
    med:spo2 100 ;
    med:weightKg 56.3 ;
    med:bmi 23.0 .

res:Note_86 a med:ClinicalNote ;
    med:authorName "Dr. Sameer" ;
    med:date "2023-05-28"^^xsd:date ;
    med:noteText "Seen for worsening symptoms over the past week. Investigations ordered, will call with results." .

res:Enc_87 a med:FollowUp ;
    med:encounterOf res:Pat_ANI120 ; med:date "2024-03-27"^^xsd:date ;
    med:time "12:45" ;
    med:attendedBy res:Doc_Leela ; med:inDepartment res:Dept_Psychiatry ;
    med:reason "Review of depression" ;
    med:outcome "Treatment continued" ;
    med:recordedCondition res:Cond_58 ;
    med:hasVitals res:Vit_87 ; med:hasNote res:Note_87 .

res:Vit_87 a med:VitalSigns ;
    med:systolic 154 ; med:diastolic 92 ;
    med:heartRate 66 ; med:temperature 98.0 ;
    med:spo2 98 ;
    med:weightKg 64.2 ;
    med:bmi 23.0 .

res:Note_87 a med:ClinicalNote ;
    med:authorName "Dr. Leela" ;
    med:date "2024-03-27"^^xsd:date ;
    med:noteText "Referred from general medicine for specialist opinion. Investigations ordered, will call with results." .

res:Inv_62 a med:Invoice ;
    med:forPatient res:Pat_ANI120 ; med:date "2024-03-27"^^xsd:date ;
    med:amount 4474 ; med:paid true ;
    med:status "Settled" .
res:Inv_62 med:coveredBy res:Policy_ANI120 .
res:Pat_ANI120 med:hasInvoice res:Inv_62 .

res:Enc_88 a med:FollowUp ;
    med:encounterOf res:Pat_ANI120 ; med:date "2024-12-26"^^xsd:date ;
    med:time "10:45" ;
    med:attendedBy res:Doc_Priya ; med:inDepartment res:Dept_Neurology ;
    med:reason "Review of dementia" ;
    med:outcome "Discharged with advice" ;
    med:recordedCondition res:Cond_57 ;
    med:hasVitals res:Vit_88 ; med:hasNote res:Note_88 .

res:Vit_88 a med:VitalSigns ;
    med:systolic 158 ; med:diastolic 97 ;
    med:heartRate 95 ; med:temperature 98.8 ;
    med:spo2 98 ;
    med:weightKg 72.8 ;
    med:bmi 27.7 .

res:Note_88 a med:ClinicalNote ;
    med:authorName "Dr. Priya" ;
    med:date "2024-12-26"^^xsd:date ;
    med:noteText "Seen for worsening symptoms over the past week. Dose adjusted, repeat bloods before next visit." .

res:Enc_89 a med:Consultation ;
    med:encounterOf res:Pat_ANI120 ; med:date "2025-11-02"^^xsd:date ;
    med:time "14:45" ;
    med:attendedBy res:Doc_Priya ; med:inDepartment res:Dept_Neurology ;
    med:reason "Review of dementia" ;
    med:outcome "Referred for tests" ;
    med:recordedCondition res:Cond_57 ;
    med:hasVitals res:Vit_89 ; med:hasNote res:Note_89 .

res:Vit_89 a med:VitalSigns ;
    med:systolic 157 ; med:diastolic 107 ;
    med:heartRate 100 ; med:temperature 100.1 ;
    med:spo2 100 ;
    med:weightKg 75.3 ;
    med:bmi 21.7 .

res:Note_89 a med:ClinicalNote ;
    med:authorName "Dr. Priya" ;
    med:date "2025-11-02"^^xsd:date ;
    med:noteText "Referred from general medicine for specialist opinion. Advised on diet, salt restriction and daily walking." .

res:Inv_63 a med:Invoice ;
    med:forPatient res:Pat_ANI120 ; med:date "2025-11-02"^^xsd:date ;
    med:amount 4105 ; med:paid true ;
    med:status "Settled" .
res:Inv_63 med:coveredBy res:Policy_ANI120 .
res:Pat_ANI120 med:hasInvoice res:Inv_63 .

res:Enc_90 a med:FollowUp ;
    med:encounterOf res:Pat_ANI120 ; med:date "2026-08-17"^^xsd:date ;
    med:time "11:00" ;
    med:attendedBy res:Doc_Suresh ; med:inDepartment res:Dept_GeneralMedicine ;
    med:reason "Review of hypertension" ;
    med:outcome "Discharged with advice" ;
    med:recordedCondition res:Cond_56 ;
    med:hasVitals res:Vit_90 ; med:hasNote res:Note_90 .

res:Vit_90 a med:VitalSigns ;
    med:systolic 163 ; med:diastolic 105 ;
    med:heartRate 76 ; med:temperature 98.9 ;
    med:spo2 98 ;
    med:weightKg 56.0 ;
    med:bmi 27.9 .

res:Note_90 a med:ClinicalNote ;
    med:authorName "Dr. Suresh" ;
    med:date "2026-08-17"^^xsd:date ;
    med:noteText "Patient reports steady improvement since last visit. Counselled on medication adherence. Red flag symptoms explained." .

res:Inv_64 a med:Invoice ;
    med:forPatient res:Pat_ANI120 ; med:date "2026-08-17"^^xsd:date ;
    med:amount 1321 ; med:paid true ;
    med:status "Settled" .
res:Inv_64 med:coveredBy res:Policy_ANI120 .
res:Pat_ANI120 med:hasInvoice res:Inv_64 .

res:Policy_ANI120 a med:InsurancePolicy ;
    med:policyNumber "HD-352241" ;
    med:issuedBy res:Ins_HDFCErgo ; med:coveragePercent 85 ;
    med:amount 1000000 .
res:Pat_ANI120 med:hasPolicy res:Policy_ANI120 .

res:Appt_13 a med:Appointment ;
    med:forPatient res:Pat_ANI120 ; med:appointmentWith res:Doc_Priya ;
    med:date "2026-09-17"^^xsd:date ;
    med:time "14:20" ;
    med:inDepartment res:Dept_Neurology ;
    med:status "Scheduled" .
res:Pat_ANI120 med:hasAppointment res:Appt_13 .

res:Pat_VAS121 a med:OutPatient ;
    med:name "Vasanthi Shetty" ; med:mrn "MRN-VAS121" ; med:photoInitials "VS" ;
    med:sex "Female" ; med:dateOfBirth "1964-02-21"^^xsd:date ; med:age 62 ;
    med:bloodGroup "AB-" ; med:phone "+91 97118 197694" ; med:email "vasanthi.shetty@example.in" ;
    med:address "54 Bharathi Street, Velachery, Chennai" ;
    med:primaryPhysician res:Doc_Anand ;
    med:hasCondition res:Cond_60 , res:Cond_61 , res:Cond_62 .

res:Cond_60 a med:Condition , med:CriticalCondition ;
    med:ofDisease res:BreastCancer ; med:onsetDate "2025-04-03"^^xsd:date ;
    med:severity "Severe" ;
    med:clinicalStatus "Active" ;
    med:diagnosedBy res:Doc_Anand .

res:Cond_61 a med:Condition ;
    med:ofDisease res:Hypothyroidism ; med:onsetDate "2018-11-01"^^xsd:date ;
    med:severity "Moderate" ;
    med:clinicalStatus "Active" ;
    med:diagnosedBy res:Doc_Nithya .

res:Cond_62 a med:Condition ;
    med:ofDisease res:Pneumonia ; med:onsetDate "2025-12-14"^^xsd:date ;
    med:severity "Mild" ;
    med:clinicalStatus "Resolved" ;
    med:resolvedDate "2026-03-17"^^xsd:date ;
    med:diagnosedBy res:Doc_Sameer .

res:Pat_VAS121 med:hasEncounter res:Enc_91 , res:Enc_92 , res:Enc_93 .

res:Enc_91 a med:EmergencyVisit ;
    med:encounterOf res:Pat_VAS121 ; med:date "2023-12-14"^^xsd:date ;
    med:time "18:15" ;
    med:attendedBy res:Doc_Karthik ; med:inDepartment res:Dept_Emergency ;
    med:reason "Acute presentation" ;
    med:outcome "Follow up scheduled" ;
    med:recordedCondition res:Cond_60 ;
    med:hasVitals res:Vit_91 ; med:hasNote res:Note_91 .

res:Vit_91 a med:VitalSigns ;
    med:systolic 109 ; med:diastolic 84 ;
    med:heartRate 94 ; med:temperature 97.5 ;
    med:spo2 96 ;
    med:weightKg 54.2 ;
    med:bmi 21.5 .

res:Note_91 a med:ClinicalNote ;
    med:authorName "Dr. Karthik" ;
    med:date "2023-12-14"^^xsd:date ;
    med:noteText "Post discharge review. Dose adjusted, repeat bloods before next visit." .

res:Rx_65 a med:Prescription ;
    med:prescribes res:Med_Tamoxifen ; med:prescribedBy res:Doc_Karthik ;
    med:forPatient res:Pat_VAS121 ; med:date "2023-12-14"^^xsd:date ;
    med:dosage "1 tablet" ;
    med:frequency "Once daily at night" ;
    med:durationDays 5 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_91 med:issuedPrescription res:Rx_65 .
res:Pat_VAS121 med:hasPrescription res:Rx_65 .

res:Lab_40 a med:LabOrder ;
    med:analyte "CA 15-3" ; med:forPatient res:Pat_VAS121 ;
    med:date "2023-12-14"^^xsd:date ; med:orderedBy res:Doc_Karthik ;
    med:testsFor res:BreastCancer ;
    med:orderStatus "Resulted" ;
    med:hasResult res:Res_40 .

res:Res_40 a med:LabResult ;
    med:analyte "CA 15-3" ; med:value 123.95 ; med:unit "U/mL" ;
    med:refLow 0 ; med:refHigh 30 ; med:outOfRange true ;
    med:date "2023-12-15"^^xsd:date ;
    med:performedBy res:Tech_Mohan .

res:Enc_91 med:orderedTest res:Lab_40 .

res:Enc_92 a med:Consultation ;
    med:encounterOf res:Pat_VAS121 ; med:date "2025-04-09"^^xsd:date ;
    med:time "10:30" ;
    med:attendedBy res:Doc_Anand ; med:inDepartment res:Dept_Oncology ;
    med:reason "Review of breast cancer" ;
    med:outcome "Follow up scheduled" ;
    med:recordedCondition res:Cond_60 ;
    med:hasVitals res:Vit_92 ; med:hasNote res:Note_92 .

res:Vit_92 a med:VitalSigns ;
    med:systolic 122 ; med:diastolic 67 ;
    med:heartRate 76 ; med:temperature 98.3 ;
    med:spo2 100 ;
    med:weightKg 67.4 ;
    med:bmi 27.6 .

res:Note_92 a med:ClinicalNote ;
    med:authorName "Dr. Anand" ;
    med:date "2025-04-09"^^xsd:date ;
    med:noteText "Seen for worsening symptoms over the past week. Advised on diet, salt restriction and daily walking." .

res:Rx_66 a med:Prescription ;
    med:prescribes res:Med_Tamoxifen ; med:prescribedBy res:Doc_Anand ;
    med:forPatient res:Pat_VAS121 ; med:date "2025-04-09"^^xsd:date ;
    med:dosage "1 tablet" ;
    med:frequency "As required" ;
    med:durationDays 5 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_92 med:issuedPrescription res:Rx_66 .
res:Pat_VAS121 med:hasPrescription res:Rx_66 .

res:Lab_41 a med:LabOrder ;
    med:analyte "CA 15-3" ; med:forPatient res:Pat_VAS121 ;
    med:date "2025-04-09"^^xsd:date ; med:orderedBy res:Doc_Anand ;
    med:testsFor res:BreastCancer ;
    med:orderStatus "Resulted" ;
    med:hasResult res:Res_41 .

res:Res_41 a med:LabResult ;
    med:analyte "CA 15-3" ; med:value 64.4 ; med:unit "U/mL" ;
    med:refLow 0 ; med:refHigh 30 ; med:outOfRange true ;
    med:date "2025-04-10"^^xsd:date ;
    med:performedBy res:Tech_Mohan .

res:Enc_92 med:orderedTest res:Lab_41 .

res:Inv_65 a med:Invoice ;
    med:forPatient res:Pat_VAS121 ; med:date "2025-04-09"^^xsd:date ;
    med:amount 2495 ; med:paid true ;
    med:status "Settled" .
res:Inv_65 med:coveredBy res:Policy_VAS121 .
res:Pat_VAS121 med:hasInvoice res:Inv_65 .

res:Enc_93 a med:DayCareVisit ;
    med:encounterOf res:Pat_VAS121 ; med:date "2026-08-30"^^xsd:date ;
    med:time "11:00" ;
    med:attendedBy res:Doc_Nithya ; med:inDepartment res:Dept_Endocrinology ;
    med:reason "Review of hypothyroidism" ;
    med:outcome "Discharged with advice" ;
    med:recordedCondition res:Cond_61 ;
    med:hasVitals res:Vit_93 ; med:hasNote res:Note_93 .

res:Vit_93 a med:VitalSigns ;
    med:systolic 130 ; med:diastolic 81 ;
    med:heartRate 78 ; med:temperature 97.5 ;
    med:spo2 96 ;
    med:weightKg 56.1 ;
    med:bmi 27.3 .

res:Note_93 a med:ClinicalNote ;
    med:authorName "Dr. Nithya" ;
    med:date "2026-08-30"^^xsd:date ;
    med:noteText "Routine review, no new complaints. Dose adjusted, repeat bloods before next visit." .

res:Rx_67 a med:Prescription ;
    med:prescribes res:Med_Levothyroxine ; med:prescribedBy res:Doc_Nithya ;
    med:forPatient res:Pat_VAS121 ; med:date "2026-08-30"^^xsd:date ;
    med:dosage "1 tablet" ;
    med:frequency "Once daily" ;
    med:durationDays 90 ;
    med:dispensed true ;
    med:status "Active" .

res:Enc_93 med:issuedPrescription res:Rx_67 .
res:Pat_VAS121 med:hasPrescription res:Rx_67 .

res:Lab_42 a med:LabOrder ;
    med:analyte "TSH" ; med:forPatient res:Pat_VAS121 ;
    med:date "2026-08-30"^^xsd:date ; med:orderedBy res:Doc_Nithya ;
    med:testsFor res:Hypothyroidism ;
    med:orderStatus "Pending" .

res:Enc_93 med:orderedTest res:Lab_42 .

res:Inv_66 a med:Invoice ;
    med:forPatient res:Pat_VAS121 ; med:date "2026-08-30"^^xsd:date ;
    med:amount 1386 ; med:paid false ;
    med:status "Insurance claim pending" .
res:Inv_66 med:coveredBy res:Policy_VAS121 .
res:Pat_VAS121 med:hasInvoice res:Inv_66 .

res:Policy_VAS121 a med:InsurancePolicy ;
    med:policyNumber "CG-148369" ;
    med:issuedBy res:Ins_CGHS ; med:coveragePercent 60 ;
    med:amount 1000000 .
res:Pat_VAS121 med:hasPolicy res:Policy_VAS121 .

res:Appt_14 a med:Appointment ;
    med:forPatient res:Pat_VAS121 ; med:appointmentWith res:Doc_Anand ;
    med:date "2026-10-11"^^xsd:date ;
    med:time "11:40" ;
    med:inDepartment res:Dept_Oncology ;
    med:status "Scheduled" .
res:Pat_VAS121 med:hasAppointment res:Appt_14 .

res:Pat_SAT122 a med:OutPatient ;
    med:name "Sathish Balan" ; med:mrn "MRN-SAT122" ; med:photoInitials "SB" ;
    med:sex "Male" ; med:dateOfBirth "1992-10-21"^^xsd:date ; med:age 33 ;
    med:bloodGroup "B+" ; med:phone "+91 95419 274666" ; med:email "sathish.balan@example.in" ;
    med:address "7 Kamarajar Street, Kelambakkam, Chennai" ;
    med:primaryPhysician res:Doc_Priya ;
    med:hasCondition res:Cond_63 , res:Cond_64 , res:Cond_65 .

res:Cond_63 a med:Condition ;
    med:ofDisease res:Stroke ; med:onsetDate "2025-01-01"^^xsd:date ;
    med:severity "Mild" ;
    med:clinicalStatus "Resolved" ;
    med:resolvedDate "2025-05-04"^^xsd:date ;
    med:diagnosedBy res:Doc_Priya .

res:Cond_64 a med:Condition ;
    med:ofDisease res:Hypertension ; med:onsetDate "2022-06-17"^^xsd:date ;
    med:severity "Moderate" ;
    med:clinicalStatus "Active" ;
    med:diagnosedBy res:Doc_Joseph .

res:Cond_65 a med:Condition ;
    med:ofDisease res:Depression ; med:onsetDate "2023-10-27"^^xsd:date ;
    med:severity "Moderate" ;
    med:clinicalStatus "Active" ;
    med:diagnosedBy res:Doc_Leela .

res:Pat_SAT122 med:hasEncounter res:Enc_94 , res:Enc_95 , res:Enc_96 , res:Enc_97 , res:Enc_98 .

res:Enc_94 a med:EmergencyVisit ;
    med:encounterOf res:Pat_SAT122 ; med:date "2023-05-10"^^xsd:date ;
    med:time "14:45" ;
    med:attendedBy res:Doc_Karthik ; med:inDepartment res:Dept_Emergency ;
    med:reason "Acute presentation" ;
    med:outcome "Treatment continued" ;
    med:recordedCondition res:Cond_63 ;
    med:hasVitals res:Vit_94 ; med:hasNote res:Note_94 .

res:Vit_94 a med:VitalSigns ;
    med:systolic 177 ; med:diastolic 93 ;
    med:heartRate 63 ; med:temperature 98.4 ;
    med:spo2 98 ;
    med:weightKg 66.1 ;
    med:bmi 27.7 .

res:Note_94 a med:ClinicalNote ;
    med:authorName "Dr. Karthik" ;
    med:date "2023-05-10"^^xsd:date ;
    med:noteText "Attends for scheduled follow up. Continue current therapy, review in three months." .

res:Rx_68 a med:Prescription ;
    med:prescribes res:Med_Warfarin ; med:prescribedBy res:Doc_Karthik ;
    med:forPatient res:Pat_SAT122 ; med:date "2023-05-10"^^xsd:date ;
    med:dosage "1 tablet" ;
    med:frequency "As required" ;
    med:durationDays 10 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_94 med:issuedPrescription res:Rx_68 .
res:Pat_SAT122 med:hasPrescription res:Rx_68 .

res:Lab_43 a med:LabOrder ;
    med:analyte "INR" ; med:forPatient res:Pat_SAT122 ;
    med:date "2023-05-10"^^xsd:date ; med:orderedBy res:Doc_Karthik ;
    med:testsFor res:Stroke ;
    med:orderStatus "Resulted" ;
    med:hasResult res:Res_43 .

res:Res_43 a med:LabResult ;
    med:analyte "INR" ; med:value 1.84 ; med:unit "ratio" ;
    med:refLow 0.9 ; med:refHigh 1.2 ; med:outOfRange true ;
    med:date "2023-05-11"^^xsd:date ;
    med:performedBy res:Tech_Mohan .

res:Enc_94 med:orderedTest res:Lab_43 .

res:Inv_67 a med:Invoice ;
    med:forPatient res:Pat_SAT122 ; med:date "2023-05-10"^^xsd:date ;
    med:amount 18965 ; med:paid false ;
    med:status "Insurance claim pending" .
res:Inv_67 med:coveredBy res:Policy_SAT122 .
res:Pat_SAT122 med:hasInvoice res:Inv_67 .

res:Enc_95 a med:Consultation ;
    med:encounterOf res:Pat_SAT122 ; med:date "2024-03-30"^^xsd:date ;
    med:time "18:00" ;
    med:attendedBy res:Doc_Joseph ; med:inDepartment res:Dept_GeneralMedicine ;
    med:reason "Review of hypertension" ;
    med:outcome "Referred for tests" ;
    med:recordedCondition res:Cond_64 ;
    med:hasVitals res:Vit_95 ; med:hasNote res:Note_95 .

res:Vit_95 a med:VitalSigns ;
    med:systolic 171 ; med:diastolic 91 ;
    med:heartRate 64 ; med:temperature 100.1 ;
    med:spo2 97 ;
    med:weightKg 67.6 ;
    med:bmi 27.0 .

res:Note_95 a med:ClinicalNote ;
    med:authorName "Dr. Joseph" ;
    med:date "2024-03-30"^^xsd:date ;
    med:noteText "Reviewed in clinic today. Referral raised to the relevant specialty." .

res:Rx_69 a med:Prescription ;
    med:prescribes res:Med_Metoprolol ; med:prescribedBy res:Doc_Joseph ;
    med:forPatient res:Pat_SAT122 ; med:date "2024-03-30"^^xsd:date ;
    med:dosage "1 tablet" ;
    med:frequency "Twice daily" ;
    med:durationDays 90 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_95 med:issuedPrescription res:Rx_69 .
res:Pat_SAT122 med:hasPrescription res:Rx_69 .

res:Inv_68 a med:Invoice ;
    med:forPatient res:Pat_SAT122 ; med:date "2024-03-30"^^xsd:date ;
    med:amount 5571 ; med:paid true ;
    med:status "Settled" .
res:Inv_68 med:coveredBy res:Policy_SAT122 .
res:Pat_SAT122 med:hasInvoice res:Inv_68 .

res:Enc_96 a med:Consultation ;
    med:encounterOf res:Pat_SAT122 ; med:date "2025-01-02"^^xsd:date ;
    med:time "17:45" ;
    med:attendedBy res:Doc_Ramesh ; med:inDepartment res:Dept_GeneralMedicine ;
    med:reason "Review of hypertension" ;
    med:outcome "Follow up scheduled" ;
    med:recordedCondition res:Cond_64 ;
    med:hasVitals res:Vit_96 ; med:hasNote res:Note_96 .

res:Vit_96 a med:VitalSigns ;
    med:systolic 141 ; med:diastolic 97 ;
    med:heartRate 86 ; med:temperature 100.4 ;
    med:spo2 97 ;
    med:weightKg 51.7 ;
    med:bmi 23.1 .

res:Note_96 a med:ClinicalNote ;
    med:authorName "Dr. Ramesh" ;
    med:date "2025-01-02"^^xsd:date ;
    med:noteText "Routine review, no new complaints. Investigations ordered, will call with results." .

res:Rx_70 a med:Prescription ;
    med:prescribes res:Med_Amlodipine ; med:prescribedBy res:Doc_Ramesh ;
    med:forPatient res:Pat_SAT122 ; med:date "2025-01-02"^^xsd:date ;
    med:dosage "1 dose" ;
    med:frequency "Once daily" ;
    med:durationDays 30 ;
    med:dispensed true ;
    med:status "Completed" .

res:Rx_71 a med:Prescription ;
    med:prescribes res:Med_Telmisartan ; med:prescribedBy res:Doc_Ramesh ;
    med:forPatient res:Pat_SAT122 ; med:date "2025-01-02"^^xsd:date ;
    med:dosage "1 tablet" ;
    med:frequency "Once daily" ;
    med:durationDays 90 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_96 med:issuedPrescription res:Rx_70 , res:Rx_71 .
res:Pat_SAT122 med:hasPrescription res:Rx_70 , res:Rx_71 .

res:Inv_69 a med:Invoice ;
    med:forPatient res:Pat_SAT122 ; med:date "2025-01-02"^^xsd:date ;
    med:amount 1461 ; med:paid true ;
    med:status "Settled" .
res:Inv_69 med:coveredBy res:Policy_SAT122 .
res:Pat_SAT122 med:hasInvoice res:Inv_69 .

res:Enc_97 a med:Consultation ;
    med:encounterOf res:Pat_SAT122 ; med:date "2025-10-28"^^xsd:date ;
    med:time "12:30" ;
    med:attendedBy res:Doc_Leela ; med:inDepartment res:Dept_Psychiatry ;
    med:reason "Review of depression" ;
    med:outcome "Follow up scheduled" ;
    med:recordedCondition res:Cond_65 ;
    med:hasVitals res:Vit_97 ; med:hasNote res:Note_97 .

res:Vit_97 a med:VitalSigns ;
    med:systolic 138 ; med:diastolic 92 ;
    med:heartRate 68 ; med:temperature 97.8 ;
    med:spo2 97 ;
    med:weightKg 56.2 ;
    med:bmi 24.9 .

res:Note_97 a med:ClinicalNote ;
    med:authorName "Dr. Leela" ;
    med:date "2025-10-28"^^xsd:date ;
    med:noteText "Presents with a two day history of symptoms. Counselled on medication adherence. Red flag symptoms explained." .

res:Inv_70 a med:Invoice ;
    med:forPatient res:Pat_SAT122 ; med:date "2025-10-28"^^xsd:date ;
    med:amount 6067 ; med:paid true ;
    med:status "Settled" .
res:Inv_70 med:coveredBy res:Policy_SAT122 .
res:Pat_SAT122 med:hasInvoice res:Inv_70 .

res:Enc_98 a med:Consultation ;
    med:encounterOf res:Pat_SAT122 ; med:date "2026-08-28"^^xsd:date ;
    med:time "10:45" ;
    med:attendedBy res:Doc_Ramesh ; med:inDepartment res:Dept_GeneralMedicine ;
    med:reason "Review of hypertension" ;
    med:outcome "Discharged with advice" ;
    med:recordedCondition res:Cond_64 ;
    med:hasVitals res:Vit_98 ; med:hasNote res:Note_98 .

res:Vit_98 a med:VitalSigns ;
    med:systolic 159 ; med:diastolic 102 ;
    med:heartRate 74 ; med:temperature 100.6 ;
    med:spo2 96 ;
    med:weightKg 69.0 ;
    med:bmi 27.4 .

res:Note_98 a med:ClinicalNote ;
    med:authorName "Dr. Ramesh" ;
    med:date "2026-08-28"^^xsd:date ;
    med:noteText "Patient reports steady improvement since last visit. Referral raised to the relevant specialty." .

res:Rx_72 a med:Prescription ;
    med:prescribes res:Med_Telmisartan ; med:prescribedBy res:Doc_Ramesh ;
    med:forPatient res:Pat_SAT122 ; med:date "2026-08-28"^^xsd:date ;
    med:dosage "1 dose" ;
    med:frequency "As required" ;
    med:durationDays 60 ;
    med:dispensed true ;
    med:status "Active" .

res:Enc_98 med:issuedPrescription res:Rx_72 .
res:Pat_SAT122 med:hasPrescription res:Rx_72 .

res:Inv_71 a med:Invoice ;
    med:forPatient res:Pat_SAT122 ; med:date "2026-08-28"^^xsd:date ;
    med:amount 2823 ; med:paid false ;
    med:status "Insurance claim pending" .
res:Inv_71 med:coveredBy res:Policy_SAT122 .
res:Pat_SAT122 med:hasInvoice res:Inv_71 .

res:Policy_SAT122 a med:InsurancePolicy ;
    med:policyNumber "HD-473885" ;
    med:issuedBy res:Ins_HDFCErgo ; med:coveragePercent 75 ;
    med:amount 300000 .
res:Pat_SAT122 med:hasPolicy res:Policy_SAT122 .

res:Appt_15 a med:Appointment ;
    med:forPatient res:Pat_SAT122 ; med:appointmentWith res:Doc_Priya ;
    med:date "2026-09-19"^^xsd:date ;
    med:time "10:00" ;
    med:inDepartment res:Dept_Neurology ;
    med:status "Scheduled" .
res:Pat_SAT122 med:hasAppointment res:Appt_15 .

res:Pat_SAN123 a med:OutPatient ;
    med:name "Sanjay Begum" ; med:mrn "MRN-SAN123" ; med:photoInitials "SB" ;
    med:sex "Male" ; med:dateOfBirth "1958-01-21"^^xsd:date ; med:age 68 ;
    med:bloodGroup "AB+" ; med:phone "+91 96857 330989" ; med:email "sanjay.begum@example.in" ;
    med:address "66 Bharathi Street, Medavakkam, Chennai" ;
    med:primaryPhysician res:Doc_Nithya ;
    med:hasCondition res:Cond_66 , res:Cond_67 , res:Cond_68 , res:Cond_69 , res:Cond_70 , res:Cond_71 , res:Cond_72 , res:Cond_73 , res:Cond_74 .

res:Cond_66 a med:Condition ;
    med:ofDisease res:TypeIIDiabetes ; med:onsetDate "2020-07-02"^^xsd:date ;
    med:severity "Mild" ;
    med:clinicalStatus "Active" ;
    med:diagnosedBy res:Doc_Nithya .

res:Cond_67 a med:Condition ;
    med:ofDisease res:Hypertension ; med:onsetDate "2021-11-28"^^xsd:date ;
    med:severity "Moderate" ;
    med:clinicalStatus "Active" ;
    med:diagnosedBy res:Doc_Joseph .

res:Cond_68 a med:Condition ;
    med:ofDisease res:Dyslipidemia ; med:onsetDate "2021-10-05"^^xsd:date ;
    med:severity "Moderate" ;
    med:clinicalStatus "Active" ;
    med:diagnosedBy res:Doc_Suresh .

res:Cond_69 a med:Condition ;
    med:ofDisease res:Obesity ; med:onsetDate "2021-12-10"^^xsd:date ;
    med:severity "Moderate" ;
    med:clinicalStatus "Active" ;
    med:diagnosedBy res:Doc_Suresh .

res:Cond_70 a med:Condition ;
    med:ofDisease res:ChronicKidneyDisease ; med:onsetDate "2022-12-29"^^xsd:date ;
    med:severity "Moderate" ;
    med:clinicalStatus "Active" ;
    med:diagnosedBy res:Doc_Vandana .

res:Cond_71 a med:Condition ;
    med:ofDisease res:SleepApnea ; med:onsetDate "2019-04-15"^^xsd:date ;
    med:severity "Moderate" ;
    med:clinicalStatus "Active" ;
    med:diagnosedBy res:Doc_Sameer .

res:Cond_72 a med:Condition ;
    med:ofDisease res:Pneumonia ; med:onsetDate "2026-01-31"^^xsd:date ;
    med:severity "Mild" ;
    med:clinicalStatus "Resolved" ;
    med:resolvedDate "2026-02-24"^^xsd:date ;
    med:diagnosedBy res:Doc_Sameer .

res:Cond_73 a med:Condition ;
    med:ofDisease res:BreastCancer ; med:onsetDate "2025-01-04"^^xsd:date ;
    med:severity "Mild" ;
    med:clinicalStatus "Resolved" ;
    med:resolvedDate "2025-04-19"^^xsd:date ;
    med:diagnosedBy res:Doc_Anand .

res:Cond_74 a med:Condition ;
    med:ofDisease res:Depression ; med:onsetDate "2024-03-03"^^xsd:date ;
    med:severity "Moderate" ;
    med:clinicalStatus "Active" ;
    med:diagnosedBy res:Doc_Leela .

res:Pat_SAN123 med:hasEncounter res:Enc_99 , res:Enc_100 , res:Enc_101 , res:Enc_102 , res:Enc_103 , res:Enc_104 , res:Enc_105 , res:Enc_106 , res:Enc_107 .

res:Enc_99 a med:Consultation ;
    med:encounterOf res:Pat_SAN123 ; med:date "2023-01-28"^^xsd:date ;
    med:time "18:45" ;
    med:attendedBy res:Doc_Suresh ; med:inDepartment res:Dept_Endocrinology ;
    med:reason "First presentation" ;
    med:outcome "Referred for tests" ;
    med:recordedCondition res:Cond_69 ;
    med:hasVitals res:Vit_99 ; med:hasNote res:Note_99 .

res:Vit_99 a med:VitalSigns ;
    med:systolic 167 ; med:diastolic 91 ;
    med:heartRate 97 ; med:temperature 98.1 ;
    med:spo2 96 ;
    med:weightKg 90.9 ;
    med:bmi 34.5 .

res:Note_99 a med:ClinicalNote ;
    med:authorName "Dr. Suresh" ;
    med:date "2023-01-28"^^xsd:date ;
    med:noteText "Routine review, no new complaints. Reassured. No change to treatment at this stage." .

res:Inv_72 a med:Invoice ;
    med:forPatient res:Pat_SAN123 ; med:date "2023-01-28"^^xsd:date ;
    med:amount 5293 ; med:paid true ;
    med:status "Settled" .
res:Inv_72 med:coveredBy res:Policy_SAN123 .
res:Pat_SAN123 med:hasInvoice res:Inv_72 .

res:Enc_100 a med:FollowUp ;
    med:encounterOf res:Pat_SAN123 ; med:date "2023-06-15"^^xsd:date ;
    med:time "14:15" ;
    med:attendedBy res:Doc_Ramesh ; med:inDepartment res:Dept_GeneralMedicine ;
    med:reason "Review of hypertension" ;
    med:outcome "Follow up scheduled" ;
    med:recordedCondition res:Cond_67 ;
    med:hasVitals res:Vit_100 ; med:hasNote res:Note_100 .

res:Vit_100 a med:VitalSigns ;
    med:systolic 159 ; med:diastolic 95 ;
    med:heartRate 89 ; med:temperature 98.1 ;
    med:spo2 98 ;
    med:weightKg 99.5 ;
    med:bmi 37.4 .

res:Note_100 a med:ClinicalNote ;
    med:authorName "Dr. Ramesh" ;
    med:date "2023-06-15"^^xsd:date ;
    med:noteText "Reviewed in clinic today. Investigations ordered, will call with results." .

res:Rx_73 a med:Prescription ;
    med:prescribes res:Med_Amlodipine ; med:prescribedBy res:Doc_Ramesh ;
    med:forPatient res:Pat_SAN123 ; med:date "2023-06-15"^^xsd:date ;
    med:dosage "1 tablet" ;
    med:frequency "As required" ;
    med:durationDays 90 ;
    med:dispensed true ;
    med:status "Completed" .

res:Rx_74 a med:Prescription ;
    med:prescribes res:Med_Telmisartan ; med:prescribedBy res:Doc_Ramesh ;
    med:forPatient res:Pat_SAN123 ; med:date "2023-06-15"^^xsd:date ;
    med:dosage "2 tablets" ;
    med:frequency "Three times daily" ;
    med:durationDays 90 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_100 med:issuedPrescription res:Rx_73 , res:Rx_74 .
res:Pat_SAN123 med:hasPrescription res:Rx_73 , res:Rx_74 .

res:Enc_101 a med:Consultation ;
    med:encounterOf res:Pat_SAN123 ; med:date "2023-12-19"^^xsd:date ;
    med:time "14:45" ;
    med:attendedBy res:Doc_Vandana ; med:inDepartment res:Dept_Nephrology ;
    med:reason "Review of chronic kidney disease" ;
    med:outcome "Referred for tests" ;
    med:recordedCondition res:Cond_70 ;
    med:hasVitals res:Vit_101 ; med:hasNote res:Note_101 .

res:Vit_101 a med:VitalSigns ;
    med:systolic 172 ; med:diastolic 96 ;
    med:heartRate 79 ; med:temperature 97.6 ;
    med:spo2 99 ;
    med:weightKg 78.2 ;
    med:bmi 31.0 .

res:Note_101 a med:ClinicalNote ;
    med:authorName "Dr. Vandana" ;
    med:date "2023-12-19"^^xsd:date ;
    med:noteText "Seen for worsening symptoms over the past week. Counselled on medication adherence. Red flag symptoms explained." .

res:Rx_75 a med:Prescription ;
    med:prescribes res:Med_Telmisartan ; med:prescribedBy res:Doc_Vandana ;
    med:forPatient res:Pat_SAN123 ; med:date "2023-12-19"^^xsd:date ;
    med:dosage "1 tablet" ;
    med:frequency "Twice daily" ;
    med:durationDays 30 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_101 med:issuedPrescription res:Rx_75 .
res:Pat_SAN123 med:hasPrescription res:Rx_75 .

res:Lab_44 a med:LabOrder ;
    med:analyte "Creatinine" ; med:forPatient res:Pat_SAN123 ;
    med:date "2023-12-19"^^xsd:date ; med:orderedBy res:Doc_Vandana ;
    med:testsFor res:ChronicKidneyDisease ;
    med:orderStatus "Resulted" ;
    med:hasResult res:Res_44 .

res:Res_44 a med:LabResult ;
    med:analyte "Creatinine" ; med:value 4.16 ; med:unit "mg/dL" ;
    med:refLow 0.6 ; med:refHigh 1.2 ; med:outOfRange true ;
    med:date "2023-12-20"^^xsd:date ;
    med:performedBy res:Tech_Mohan .

res:Lab_45 a med:LabOrder ;
    med:analyte "eGFR" ; med:forPatient res:Pat_SAN123 ;
    med:date "2023-12-19"^^xsd:date ; med:orderedBy res:Doc_Vandana ;
    med:testsFor res:ChronicKidneyDisease ;
    med:orderStatus "Resulted" ;
    med:hasResult res:Res_45 .

res:Res_45 a med:LabResult ;
    med:analyte "eGFR" ; med:value 80.52 ; med:unit "mL/min" ;
    med:refLow 90 ; med:refHigh 120 ; med:outOfRange true ;
    med:date "2023-12-20"^^xsd:date ;
    med:performedBy res:Tech_Mohan .

res:Enc_101 med:orderedTest res:Lab_44 , res:Lab_45 .

res:Enc_102 a med:Consultation ;
    med:encounterOf res:Pat_SAN123 ; med:date "2024-05-27"^^xsd:date ;
    med:time "14:30" ;
    med:attendedBy res:Doc_Vandana ; med:inDepartment res:Dept_Nephrology ;
    med:reason "Review of chronic kidney disease" ;
    med:outcome "Referred for tests" ;
    med:recordedCondition res:Cond_70 ;
    med:hasVitals res:Vit_102 ; med:hasNote res:Note_102 .

res:Vit_102 a med:VitalSigns ;
    med:systolic 144 ; med:diastolic 94 ;
    med:heartRate 77 ; med:temperature 97.4 ;
    med:spo2 99 ;
    med:weightKg 84.1 ;
    med:bmi 34.5 .

res:Note_102 a med:ClinicalNote ;
    med:authorName "Dr. Vandana" ;
    med:date "2024-05-27"^^xsd:date ;
    med:noteText "Referred from general medicine for specialist opinion. Continue current therapy, review in three months." .

res:Rx_76 a med:Prescription ;
    med:prescribes res:Med_Telmisartan ; med:prescribedBy res:Doc_Vandana ;
    med:forPatient res:Pat_SAN123 ; med:date "2024-05-27"^^xsd:date ;
    med:dosage "1 tablet" ;
    med:frequency "As required" ;
    med:durationDays 30 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_102 med:issuedPrescription res:Rx_76 .
res:Pat_SAN123 med:hasPrescription res:Rx_76 .

res:Inv_73 a med:Invoice ;
    med:forPatient res:Pat_SAN123 ; med:date "2024-05-27"^^xsd:date ;
    med:amount 4673 ; med:paid true ;
    med:status "Settled" .
res:Inv_73 med:coveredBy res:Policy_SAN123 .
res:Pat_SAN123 med:hasInvoice res:Inv_73 .

res:Enc_103 a med:FollowUp ;
    med:encounterOf res:Pat_SAN123 ; med:date "2024-11-05"^^xsd:date ;
    med:time "10:15" ;
    med:attendedBy res:Doc_Nithya ; med:inDepartment res:Dept_Endocrinology ;
    med:reason "Review of obesity" ;
    med:outcome "Referred for tests" ;
    med:recordedCondition res:Cond_69 ;
    med:hasVitals res:Vit_103 ; med:hasNote res:Note_103 .

res:Vit_103 a med:VitalSigns ;
    med:systolic 138 ; med:diastolic 107 ;
    med:heartRate 92 ; med:temperature 99.1 ;
    med:spo2 97 ;
    med:weightKg 99.6 ;
    med:bmi 38.2 .

res:Note_103 a med:ClinicalNote ;
    med:authorName "Dr. Nithya" ;
    med:date "2024-11-05"^^xsd:date ;
    med:noteText "Patient reports steady improvement since last visit. Dose adjusted, repeat bloods before next visit." .

res:Inv_74 a med:Invoice ;
    med:forPatient res:Pat_SAN123 ; med:date "2024-11-05"^^xsd:date ;
    med:amount 5592 ; med:paid true ;
    med:status "Settled" .
res:Inv_74 med:coveredBy res:Policy_SAN123 .
res:Pat_SAN123 med:hasInvoice res:Inv_74 .

res:Enc_104 a med:Admission ;
    med:encounterOf res:Pat_SAN123 ; med:date "2025-04-12"^^xsd:date ;
    med:time "16:45" ;
    med:attendedBy res:Doc_Anand ; med:inDepartment res:Dept_Oncology ;
    med:reason "Review of breast cancer" ;
    med:outcome "Admitted to ward" ;
    med:lengthOfStay 3 ;
    med:recordedCondition res:Cond_73 ;
    med:hasVitals res:Vit_104 ; med:hasNote res:Note_104 .

res:Vit_104 a med:VitalSigns ;
    med:systolic 153 ; med:diastolic 100 ;
    med:heartRate 99 ; med:temperature 99.3 ;
    med:spo2 98 ;
    med:weightKg 105.4 ;
    med:bmi 32.0 .

res:Note_104 a med:ClinicalNote ;
    med:authorName "Dr. Anand" ;
    med:date "2025-04-12"^^xsd:date ;
    med:noteText "Seen for worsening symptoms over the past week. Dose adjusted, repeat bloods before next visit." .

res:Rx_77 a med:Prescription ;
    med:prescribes res:Med_Tamoxifen ; med:prescribedBy res:Doc_Anand ;
    med:forPatient res:Pat_SAN123 ; med:date "2025-04-12"^^xsd:date ;
    med:dosage "2 tablets" ;
    med:frequency "Once daily at night" ;
    med:durationDays 7 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_104 med:issuedPrescription res:Rx_77 .
res:Pat_SAN123 med:hasPrescription res:Rx_77 .

res:Lab_46 a med:LabOrder ;
    med:analyte "CA 15-3" ; med:forPatient res:Pat_SAN123 ;
    med:date "2025-04-12"^^xsd:date ; med:orderedBy res:Doc_Anand ;
    med:testsFor res:BreastCancer ;
    med:orderStatus "Resulted" ;
    med:hasResult res:Res_46 .

res:Res_46 a med:LabResult ;
    med:analyte "CA 15-3" ; med:value 45.5 ; med:unit "U/mL" ;
    med:refLow 0 ; med:refHigh 30 ; med:outOfRange true ;
    med:date "2025-04-13"^^xsd:date ;
    med:performedBy res:Tech_Mohan .

res:Enc_104 med:orderedTest res:Lab_46 .

res:Inv_75 a med:Invoice ;
    med:forPatient res:Pat_SAN123 ; med:date "2025-04-12"^^xsd:date ;
    med:amount 327257 ; med:paid true ;
    med:status "Settled" .
res:Inv_75 med:coveredBy res:Policy_SAN123 .
res:Pat_SAN123 med:hasInvoice res:Inv_75 .

res:Enc_105 a med:Consultation ;
    med:encounterOf res:Pat_SAN123 ; med:date "2025-09-28"^^xsd:date ;
    med:time "15:15" ;
    med:attendedBy res:Doc_Suresh ; med:inDepartment res:Dept_Endocrinology ;
    med:reason "Review of obesity" ;
    med:outcome "Follow up scheduled" ;
    med:recordedCondition res:Cond_69 ;
    med:hasVitals res:Vit_105 ; med:hasNote res:Note_105 .

res:Vit_105 a med:VitalSigns ;
    med:systolic 140 ; med:diastolic 96 ;
    med:heartRate 97 ; med:temperature 97.5 ;
    med:spo2 98 ;
    med:weightKg 95.3 ;
    med:bmi 36.8 .

res:Note_105 a med:ClinicalNote ;
    med:authorName "Dr. Suresh" ;
    med:date "2025-09-28"^^xsd:date ;
    med:noteText "Routine review, no new complaints. Advised on diet, salt restriction and daily walking." .

res:Inv_76 a med:Invoice ;
    med:forPatient res:Pat_SAN123 ; med:date "2025-09-28"^^xsd:date ;
    med:amount 5513 ; med:paid true ;
    med:status "Settled" .
res:Inv_76 med:coveredBy res:Policy_SAN123 .
res:Pat_SAN123 med:hasInvoice res:Inv_76 .

res:Enc_106 a med:Consultation ;
    med:encounterOf res:Pat_SAN123 ; med:date "2026-03-21"^^xsd:date ;
    med:time "16:30" ;
    med:attendedBy res:Doc_Leela ; med:inDepartment res:Dept_Psychiatry ;
    med:reason "Review of depression" ;
    med:outcome "Follow up scheduled" ;
    med:recordedCondition res:Cond_74 ;
    med:hasVitals res:Vit_106 ; med:hasNote res:Note_106 .

res:Vit_106 a med:VitalSigns ;
    med:systolic 165 ; med:diastolic 104 ;
    med:heartRate 62 ; med:temperature 98.8 ;
    med:spo2 98 ;
    med:weightKg 102.8 ;
    med:bmi 31.8 .

res:Note_106 a med:ClinicalNote ;
    med:authorName "Dr. Leela" ;
    med:date "2026-03-21"^^xsd:date ;
    med:noteText "Attends for scheduled follow up. Advised on diet, salt restriction and daily walking." .

res:Enc_107 a med:FollowUp ;
    med:encounterOf res:Pat_SAN123 ; med:date "2026-08-27"^^xsd:date ;
    med:time "11:00" ;
    med:attendedBy res:Doc_Leela ; med:inDepartment res:Dept_Psychiatry ;
    med:reason "Review of depression" ;
    med:outcome "Referred for tests" ;
    med:recordedCondition res:Cond_74 ;
    med:hasVitals res:Vit_107 ; med:hasNote res:Note_107 .

res:Vit_107 a med:VitalSigns ;
    med:systolic 169 ; med:diastolic 95 ;
    med:heartRate 99 ; med:temperature 99.2 ;
    med:spo2 97 ;
    med:weightKg 109.3 ;
    med:bmi 35.0 .

res:Note_107 a med:ClinicalNote ;
    med:authorName "Dr. Leela" ;
    med:date "2026-08-27"^^xsd:date ;
    med:noteText "Seen for worsening symptoms over the past week. Continue current therapy, review in three months." .

res:Rx_78 a med:Prescription ;
    med:prescribes res:Med_Sertraline ; med:prescribedBy res:Doc_Leela ;
    med:forPatient res:Pat_SAN123 ; med:date "2026-08-27"^^xsd:date ;
    med:dosage "1 tablet" ;
    med:frequency "Once daily" ;
    med:durationDays 90 ;
    med:dispensed false ;
    med:status "Active" .

res:Enc_107 med:issuedPrescription res:Rx_78 .
res:Pat_SAN123 med:hasPrescription res:Rx_78 .

res:Policy_SAN123 a med:InsurancePolicy ;
    med:policyNumber "HD-247428" ;
    med:issuedBy res:Ins_HDFCErgo ; med:coveragePercent 90 ;
    med:amount 750000 .
res:Pat_SAN123 med:hasPolicy res:Policy_SAN123 .

res:Pat_RAV124 a med:OutPatient ;
    med:name "Ravi Kumar" ; med:mrn "MRN-RAV124" ; med:photoInitials "RK" ;
    med:sex "Male" ; med:dateOfBirth "1997-08-22"^^xsd:date ; med:age 29 ;
    med:bloodGroup "O+" ; med:phone "+91 99612 946232" ; med:email "ravi.kumar@example.in" ;
    med:address "41 Bharathi Street, Velachery, Chennai" ;
    med:primaryPhysician res:Doc_Leela ;
    med:allergicTo res:Allergen_Latex , res:Allergen_Sulfa ;
    med:hasCondition res:Cond_75 , res:Cond_76 , res:Cond_77 .

res:Cond_75 a med:Condition ;
    med:ofDisease res:Depression ; med:onsetDate "2017-03-20"^^xsd:date ;
    med:severity "Mild" ;
    med:clinicalStatus "Active" ;
    med:diagnosedBy res:Doc_Leela .

res:Cond_76 a med:Condition ;
    med:ofDisease res:Obesity ; med:onsetDate "2016-11-20"^^xsd:date ;
    med:severity "Moderate" ;
    med:clinicalStatus "Active" ;
    med:diagnosedBy res:Doc_Suresh .

res:Cond_77 a med:Condition ;
    med:ofDisease res:Stroke ; med:onsetDate "2025-09-30"^^xsd:date ;
    med:severity "Moderate" ;
    med:clinicalStatus "Resolved" ;
    med:resolvedDate "2025-12-18"^^xsd:date ;
    med:diagnosedBy res:Doc_Priya .

res:Pat_RAV124 med:hasEncounter res:Enc_108 , res:Enc_109 , res:Enc_110 , res:Enc_111 , res:Enc_112 , res:Enc_113 .

res:Enc_108 a med:Consultation ;
    med:encounterOf res:Pat_RAV124 ; med:date "2023-04-02"^^xsd:date ;
    med:time "15:30" ;
    med:attendedBy res:Doc_Suresh ; med:inDepartment res:Dept_Endocrinology ;
    med:reason "First presentation" ;
    med:outcome "Discharged with advice" ;
    med:recordedCondition res:Cond_76 ;
    med:hasVitals res:Vit_108 ; med:hasNote res:Note_108 .

res:Vit_108 a med:VitalSigns ;
    med:systolic 113 ; med:diastolic 67 ;
    med:heartRate 72 ; med:temperature 98.7 ;
    med:spo2 98 ;
    med:weightKg 109.9 ;
    med:bmi 35.2 .

res:Note_108 a med:ClinicalNote ;
    med:authorName "Dr. Suresh" ;
    med:date "2023-04-02"^^xsd:date ;
    med:noteText "Presents with a two day history of symptoms. Investigations ordered, will call with results." .

res:Inv_77 a med:Invoice ;
    med:forPatient res:Pat_RAV124 ; med:date "2023-04-02"^^xsd:date ;
    med:amount 2922 ; med:paid true ;
    med:status "Settled" .
res:Inv_77 med:coveredBy res:Policy_RAV124 .
res:Pat_RAV124 med:hasInvoice res:Inv_77 .

res:Enc_109 a med:Consultation ;
    med:encounterOf res:Pat_RAV124 ; med:date "2023-11-29"^^xsd:date ;
    med:time "12:15" ;
    med:attendedBy res:Doc_Nithya ; med:inDepartment res:Dept_Endocrinology ;
    med:reason "Review of obesity" ;
    med:outcome "Referred for tests" ;
    med:recordedCondition res:Cond_76 ;
    med:hasVitals res:Vit_109 ; med:hasNote res:Note_109 .

res:Vit_109 a med:VitalSigns ;
    med:systolic 116 ; med:diastolic 69 ;
    med:heartRate 62 ; med:temperature 99.4 ;
    med:spo2 99 ;
    med:weightKg 92.4 ;
    med:bmi 34.6 .

res:Note_109 a med:ClinicalNote ;
    med:authorName "Dr. Nithya" ;
    med:date "2023-11-29"^^xsd:date ;
    med:noteText "Post discharge review. Referral raised to the relevant specialty." .

res:Inv_78 a med:Invoice ;
    med:forPatient res:Pat_RAV124 ; med:date "2023-11-29"^^xsd:date ;
    med:amount 1921 ; med:paid true ;
    med:status "Settled" .
res:Inv_78 med:coveredBy res:Policy_RAV124 .
res:Pat_RAV124 med:hasInvoice res:Inv_78 .

res:Enc_110 a med:FollowUp ;
    med:encounterOf res:Pat_RAV124 ; med:date "2024-07-28"^^xsd:date ;
    med:time "11:15" ;
    med:attendedBy res:Doc_Leela ; med:inDepartment res:Dept_Psychiatry ;
    med:reason "Review of depression" ;
    med:outcome "Referred for tests" ;
    med:recordedCondition res:Cond_75 ;
    med:hasVitals res:Vit_110 ; med:hasNote res:Note_110 .

res:Vit_110 a med:VitalSigns ;
    med:systolic 112 ; med:diastolic 76 ;
    med:heartRate 104 ; med:temperature 97.8 ;
    med:spo2 99 ;
    med:weightKg 97.9 ;
    med:bmi 35.6 .

res:Note_110 a med:ClinicalNote ;
    med:authorName "Dr. Leela" ;
    med:date "2024-07-28"^^xsd:date ;
    med:noteText "Referred from general medicine for specialist opinion. Continue current therapy, review in three months." .

res:Rx_79 a med:Prescription ;
    med:prescribes res:Med_Sertraline ; med:prescribedBy res:Doc_Leela ;
    med:forPatient res:Pat_RAV124 ; med:date "2024-07-28"^^xsd:date ;
    med:dosage "1 tablet" ;
    med:frequency "Twice daily" ;
    med:durationDays 60 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_110 med:issuedPrescription res:Rx_79 .
res:Pat_RAV124 med:hasPrescription res:Rx_79 .

res:Inv_79 a med:Invoice ;
    med:forPatient res:Pat_RAV124 ; med:date "2024-07-28"^^xsd:date ;
    med:amount 3255 ; med:paid true ;
    med:status "Settled" .
res:Inv_79 med:coveredBy res:Policy_RAV124 .
res:Pat_RAV124 med:hasInvoice res:Inv_79 .

res:Enc_111 a med:Consultation ;
    med:encounterOf res:Pat_RAV124 ; med:date "2025-04-13"^^xsd:date ;
    med:time "09:15" ;
    med:attendedBy res:Doc_Leela ; med:inDepartment res:Dept_Psychiatry ;
    med:reason "Review of depression" ;
    med:outcome "Discharged with advice" ;
    med:recordedCondition res:Cond_75 ;
    med:hasVitals res:Vit_111 ; med:hasNote res:Note_111 .

res:Vit_111 a med:VitalSigns ;
    med:systolic 132 ; med:diastolic 76 ;
    med:heartRate 100 ; med:temperature 100.3 ;
    med:spo2 96 ;
    med:weightKg 79.9 ;
    med:bmi 35.1 .

res:Note_111 a med:ClinicalNote ;
    med:authorName "Dr. Leela" ;
    med:date "2025-04-13"^^xsd:date ;
    med:noteText "Attends for scheduled follow up. Advised on diet, salt restriction and daily walking." .

res:Rx_80 a med:Prescription ;
    med:prescribes res:Med_Sertraline ; med:prescribedBy res:Doc_Leela ;
    med:forPatient res:Pat_RAV124 ; med:date "2025-04-13"^^xsd:date ;
    med:dosage "2 tablets" ;
    med:frequency "Three times daily" ;
    med:durationDays 60 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_111 med:issuedPrescription res:Rx_80 .
res:Pat_RAV124 med:hasPrescription res:Rx_80 .

res:Enc_112 a med:EmergencyVisit ;
    med:encounterOf res:Pat_RAV124 ; med:date "2025-12-24"^^xsd:date ;
    med:time "15:00" ;
    med:attendedBy res:Doc_Karthik ; med:inDepartment res:Dept_Emergency ;
    med:reason "Acute presentation" ;
    med:outcome "Follow up scheduled" ;
    med:recordedCondition res:Cond_76 ;
    med:hasVitals res:Vit_112 ; med:hasNote res:Note_112 .

res:Vit_112 a med:VitalSigns ;
    med:systolic 132 ; med:diastolic 82 ;
    med:heartRate 86 ; med:temperature 97.4 ;
    med:spo2 100 ;
    med:weightKg 81.2 ;
    med:bmi 30.9 .

res:Note_112 a med:ClinicalNote ;
    med:authorName "Dr. Karthik" ;
    med:date "2025-12-24"^^xsd:date ;
    med:noteText "Post discharge review. Reassured. No change to treatment at this stage." .

res:Inv_80 a med:Invoice ;
    med:forPatient res:Pat_RAV124 ; med:date "2025-12-24"^^xsd:date ;
    med:amount 7336 ; med:paid true ;
    med:status "Settled" .
res:Inv_80 med:coveredBy res:Policy_RAV124 .
res:Pat_RAV124 med:hasInvoice res:Inv_80 .

res:Enc_113 a med:Consultation ;
    med:encounterOf res:Pat_RAV124 ; med:date "2026-08-16"^^xsd:date ;
    med:time "18:15" ;
    med:attendedBy res:Doc_Priya ; med:inDepartment res:Dept_Neurology ;
    med:reason "Review of stroke" ;
    med:outcome "Referred for tests" ;
    med:recordedCondition res:Cond_77 ;
    med:hasVitals res:Vit_113 ; med:hasNote res:Note_113 .

res:Vit_113 a med:VitalSigns ;
    med:systolic 123 ; med:diastolic 74 ;
    med:heartRate 103 ; med:temperature 97.4 ;
    med:spo2 99 ;
    med:weightKg 78.2 ;
    med:bmi 37.8 .

res:Note_113 a med:ClinicalNote ;
    med:authorName "Dr. Priya" ;
    med:date "2026-08-16"^^xsd:date ;
    med:noteText "Presents with a two day history of symptoms. Referral raised to the relevant specialty." .

res:Lab_47 a med:LabOrder ;
    med:analyte "INR" ; med:forPatient res:Pat_RAV124 ;
    med:date "2026-08-16"^^xsd:date ; med:orderedBy res:Doc_Priya ;
    med:testsFor res:Stroke ;
    med:orderStatus "Pending" .

res:Enc_113 med:orderedTest res:Lab_47 .

res:Inv_81 a med:Invoice ;
    med:forPatient res:Pat_RAV124 ; med:date "2026-08-16"^^xsd:date ;
    med:amount 684 ; med:paid false ;
    med:status "Insurance claim pending" .
res:Inv_81 med:coveredBy res:Policy_RAV124 .
res:Pat_RAV124 med:hasInvoice res:Inv_81 .

res:Policy_RAV124 a med:InsurancePolicy ;
    med:policyNumber "NE-609147" ;
    med:issuedBy res:Ins_NewIndia ; med:coveragePercent 70 ;
    med:amount 200000 .
res:Pat_RAV124 med:hasPolicy res:Policy_RAV124 .

res:Pat_JAN125 a med:OutPatient ;
    med:name "Janaki Nair" ; med:mrn "MRN-JAN125" ; med:photoInitials "JN" ;
    med:sex "Female" ; med:dateOfBirth "1949-12-08"^^xsd:date ; med:age 76 ;
    med:bloodGroup "A-" ; med:phone "+91 95634 331000" ; med:email "janaki.nair@example.in" ;
    med:address "87 Bharathi Street, Navalur, Chennai" ;
    med:primaryPhysician res:Doc_Anand ;
    med:hasCondition res:Cond_78 , res:Cond_79 , res:Cond_80 , res:Cond_81 .

res:Cond_78 a med:Condition , med:CriticalCondition ;
    med:ofDisease res:LungCancer ; med:onsetDate "2025-07-05"^^xsd:date ;
    med:severity "Severe" ;
    med:clinicalStatus "Active" ;
    med:diagnosedBy res:Doc_Anand .

res:Cond_79 a med:Condition ;
    med:ofDisease res:COPD ; med:onsetDate "2018-09-24"^^xsd:date ;
    med:severity "Moderate" ;
    med:clinicalStatus "Active" ;
    med:diagnosedBy res:Doc_Sameer .

res:Cond_80 a med:Condition ;
    med:ofDisease res:Hypothyroidism ; med:onsetDate "2023-01-02"^^xsd:date ;
    med:severity "Mild" ;
    med:clinicalStatus "Active" ;
    med:diagnosedBy res:Doc_Nithya .

res:Cond_81 a med:Condition ;
    med:ofDisease res:Depression ; med:onsetDate "2022-11-15"^^xsd:date ;
    med:severity "Moderate" ;
    med:clinicalStatus "Active" ;
    med:diagnosedBy res:Doc_Leela .

res:Pat_JAN125 med:hasEncounter res:Enc_114 , res:Enc_115 , res:Enc_116 , res:Enc_117 .

res:Enc_114 a med:EmergencyVisit ;
    med:encounterOf res:Pat_JAN125 ; med:date "2023-07-27"^^xsd:date ;
    med:time "14:15" ;
    med:attendedBy res:Doc_Karthik ; med:inDepartment res:Dept_Emergency ;
    med:reason "Acute presentation" ;
    med:outcome "Referred for tests" ;
    med:recordedCondition res:Cond_79 ;
    med:hasVitals res:Vit_114 ; med:hasNote res:Note_114 .

res:Vit_114 a med:VitalSigns ;
    med:systolic 115 ; med:diastolic 82 ;
    med:heartRate 87 ; med:temperature 97.8 ;
    med:spo2 88 ;
    med:weightKg 75.9 ;
    med:bmi 26.7 .

res:Note_114 a med:ClinicalNote ;
    med:authorName "Dr. Karthik" ;
    med:date "2023-07-27"^^xsd:date ;
    med:noteText "Reviewed in clinic today. Continue current therapy, review in three months." .

res:Inv_82 a med:Invoice ;
    med:forPatient res:Pat_JAN125 ; med:date "2023-07-27"^^xsd:date ;
    med:amount 26171 ; med:paid true ;
    med:status "Settled" .
res:Pat_JAN125 med:hasInvoice res:Inv_82 .

res:Enc_115 a med:Consultation ;
    med:encounterOf res:Pat_JAN125 ; med:date "2024-08-06"^^xsd:date ;
    med:time "12:30" ;
    med:attendedBy res:Doc_Nithya ; med:inDepartment res:Dept_Endocrinology ;
    med:reason "Review of hypothyroidism" ;
    med:outcome "Referred for tests" ;
    med:recordedCondition res:Cond_80 ;
    med:hasVitals res:Vit_115 ; med:hasNote res:Note_115 .

res:Vit_115 a med:VitalSigns ;
    med:systolic 130 ; med:diastolic 76 ;
    med:heartRate 95 ; med:temperature 99.9 ;
    med:spo2 96 ;
    med:weightKg 74.7 ;
    med:bmi 21.9 .

res:Note_115 a med:ClinicalNote ;
    med:authorName "Dr. Nithya" ;
    med:date "2024-08-06"^^xsd:date ;
    med:noteText "Patient reports steady improvement since last visit. Continue current therapy, review in three months." .

res:Rx_81 a med:Prescription ;
    med:prescribes res:Med_Levothyroxine ; med:prescribedBy res:Doc_Nithya ;
    med:forPatient res:Pat_JAN125 ; med:date "2024-08-06"^^xsd:date ;
    med:dosage "1 tablet" ;
    med:frequency "Once daily at night" ;
    med:durationDays 30 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_115 med:issuedPrescription res:Rx_81 .
res:Pat_JAN125 med:hasPrescription res:Rx_81 .

res:Lab_48 a med:LabOrder ;
    med:analyte "TSH" ; med:forPatient res:Pat_JAN125 ;
    med:date "2024-08-06"^^xsd:date ; med:orderedBy res:Doc_Nithya ;
    med:testsFor res:Hypothyroidism ;
    med:orderStatus "Resulted" ;
    med:hasResult res:Res_48 .

res:Res_48 a med:LabResult ;
    med:analyte "TSH" ; med:value 13.76 ; med:unit "mIU/L" ;
    med:refLow 0.4 ; med:refHigh 4 ; med:outOfRange true ;
    med:date "2024-08-07"^^xsd:date ;
    med:performedBy res:Tech_Mohan .

res:Enc_115 med:orderedTest res:Lab_48 .

res:Inv_83 a med:Invoice ;
    med:forPatient res:Pat_JAN125 ; med:date "2024-08-06"^^xsd:date ;
    med:amount 6377 ; med:paid true ;
    med:status "Settled" .
res:Pat_JAN125 med:hasInvoice res:Inv_83 .

res:Enc_116 a med:Consultation ;
    med:encounterOf res:Pat_JAN125 ; med:date "2025-08-26"^^xsd:date ;
    med:time "18:45" ;
    med:attendedBy res:Doc_Sameer ; med:inDepartment res:Dept_Pulmonology ;
    med:reason "Review of c o p d" ;
    med:outcome "Referred for tests" ;
    med:recordedCondition res:Cond_79 ;
    med:hasVitals res:Vit_116 ; med:hasNote res:Note_116 .

res:Vit_116 a med:VitalSigns ;
    med:systolic 122 ; med:diastolic 77 ;
    med:heartRate 101 ; med:temperature 100.3 ;
    med:spo2 90 ;
    med:weightKg 75.1 ;
    med:bmi 21.2 .

res:Note_116 a med:ClinicalNote ;
    med:authorName "Dr. Sameer" ;
    med:date "2025-08-26"^^xsd:date ;
    med:noteText "Attends for scheduled follow up. Investigations ordered, will call with results." .

res:Rx_82 a med:Prescription ;
    med:prescribes res:Med_Salbutamol ; med:prescribedBy res:Doc_Sameer ;
    med:forPatient res:Pat_JAN125 ; med:date "2025-08-26"^^xsd:date ;
    med:dosage "1 tablet" ;
    med:frequency "Once daily" ;
    med:durationDays 30 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_116 med:issuedPrescription res:Rx_82 .
res:Pat_JAN125 med:hasPrescription res:Rx_82 .

res:Inv_84 a med:Invoice ;
    med:forPatient res:Pat_JAN125 ; med:date "2025-08-26"^^xsd:date ;
    med:amount 1285 ; med:paid true ;
    med:status "Settled" .
res:Pat_JAN125 med:hasInvoice res:Inv_84 .

res:Enc_117 a med:FollowUp ;
    med:encounterOf res:Pat_JAN125 ; med:date "2026-08-26"^^xsd:date ;
    med:time "10:15" ;
    med:attendedBy res:Doc_Sameer ; med:inDepartment res:Dept_Pulmonology ;
    med:reason "Review of c o p d" ;
    med:outcome "Discharged with advice" ;
    med:recordedCondition res:Cond_79 ;
    med:hasVitals res:Vit_117 ; med:hasNote res:Note_117 .

res:Vit_117 a med:VitalSigns ;
    med:systolic 113 ; med:diastolic 84 ;
    med:heartRate 89 ; med:temperature 98.7 ;
    med:spo2 93 ;
    med:weightKg 71.1 ;
    med:bmi 26.7 .

res:Note_117 a med:ClinicalNote ;
    med:authorName "Dr. Sameer" ;
    med:date "2026-08-26"^^xsd:date ;
    med:noteText "Attends for scheduled follow up. Referral raised to the relevant specialty." .

res:Rx_83 a med:Prescription ;
    med:prescribes res:Med_Tiotropium ; med:prescribedBy res:Doc_Sameer ;
    med:forPatient res:Pat_JAN125 ; med:date "2026-08-26"^^xsd:date ;
    med:dosage "2 tablets" ;
    med:frequency "Twice daily" ;
    med:durationDays 30 ;
    med:dispensed true ;
    med:status "Active" .

res:Rx_84 a med:Prescription ;
    med:prescribes res:Med_Salbutamol ; med:prescribedBy res:Doc_Sameer ;
    med:forPatient res:Pat_JAN125 ; med:date "2026-08-26"^^xsd:date ;
    med:dosage "1 tablet" ;
    med:frequency "Once daily" ;
    med:durationDays 30 ;
    med:dispensed true ;
    med:status "Active" .

res:Enc_117 med:issuedPrescription res:Rx_83 , res:Rx_84 .
res:Pat_JAN125 med:hasPrescription res:Rx_83 , res:Rx_84 .

res:Inv_85 a med:Invoice ;
    med:forPatient res:Pat_JAN125 ; med:date "2026-08-26"^^xsd:date ;
    med:amount 1691 ; med:paid true ;
    med:status "Settled" .
res:Pat_JAN125 med:hasInvoice res:Inv_85 .

res:Pat_FAT126 a med:OutPatient ;
    med:name "Fatima Krishnan" ; med:mrn "MRN-FAT126" ; med:photoInitials "FK" ;
    med:sex "Female" ; med:dateOfBirth "2001-01-18"^^xsd:date ; med:age 25 ;
    med:bloodGroup "B-" ; med:phone "+91 92448 105679" ; med:email "fatima.krishnan@example.in" ;
    med:address "34 Bharathi Street, Perungudi, Chennai" ;
    med:primaryPhysician res:Doc_Farida ;
    med:hasCondition res:Cond_82 , res:Cond_83 , res:Cond_84 , res:Cond_85 .

res:Cond_82 a med:Condition ;
    med:ofDisease res:CoronaryArteryDisease ; med:onsetDate "2024-10-18"^^xsd:date ;
    med:severity "Mild" ;
    med:clinicalStatus "Active" ;
    med:diagnosedBy res:Doc_Farida .

res:Cond_83 a med:Condition ;
    med:ofDisease res:Dyslipidemia ; med:onsetDate "2022-04-16"^^xsd:date ;
    med:severity "Mild" ;
    med:clinicalStatus "Active" ;
    med:diagnosedBy res:Doc_Suresh .

res:Cond_84 a med:Condition ;
    med:ofDisease res:TypeIIDiabetes ; med:onsetDate "2024-09-30"^^xsd:date ;
    med:severity "Mild" ;
    med:clinicalStatus "Active" ;
    med:diagnosedBy res:Doc_Nithya .

res:Cond_85 a med:Condition ;
    med:ofDisease res:UrinaryTractInfection ; med:onsetDate "2026-02-21"^^xsd:date ;
    med:severity "Moderate" ;
    med:clinicalStatus "Resolved" ;
    med:resolvedDate "2026-05-11"^^xsd:date ;
    med:diagnosedBy res:Doc_Joseph .

res:Pat_FAT126 med:hasEncounter res:Enc_118 , res:Enc_119 , res:Enc_120 , res:Enc_121 .

res:Enc_118 a med:Consultation ;
    med:encounterOf res:Pat_FAT126 ; med:date "2023-08-06"^^xsd:date ;
    med:time "13:45" ;
    med:attendedBy res:Doc_Nithya ; med:inDepartment res:Dept_Endocrinology ;
    med:reason "First presentation" ;
    med:outcome "Discharged with advice" ;
    med:recordedCondition res:Cond_84 ;
    med:hasVitals res:Vit_118 ; med:hasNote res:Note_118 .

res:Vit_118 a med:VitalSigns ;
    med:systolic 118 ; med:diastolic 72 ;
    med:heartRate 79 ; med:temperature 99.6 ;
    med:spo2 97 ;
    med:weightKg 64.8 ;
    med:bmi 19.9 .

res:Note_118 a med:ClinicalNote ;
    med:authorName "Dr. Nithya" ;
    med:date "2023-08-06"^^xsd:date ;
    med:noteText "Reviewed in clinic today. Reassured. No change to treatment at this stage." .

res:Lab_49 a med:LabOrder ;
    med:analyte "HbA1c" ; med:forPatient res:Pat_FAT126 ;
    med:date "2023-08-06"^^xsd:date ; med:orderedBy res:Doc_Nithya ;
    med:testsFor res:TypeIIDiabetes ;
    med:orderStatus "Resulted" ;
    med:hasResult res:Res_49 .

res:Res_49 a med:LabResult ;
    med:analyte "HbA1c" ; med:value 6.49 ; med:unit "%" ;
    med:refLow 4 ; med:refHigh 5.6 ; med:outOfRange true ;
    med:date "2023-08-07"^^xsd:date ;
    med:performedBy res:Tech_Mohan .

res:Lab_50 a med:LabOrder ;
    med:analyte "Fasting glucose" ; med:forPatient res:Pat_FAT126 ;
    med:date "2023-08-06"^^xsd:date ; med:orderedBy res:Doc_Nithya ;
    med:testsFor res:TypeIIDiabetes ;
    med:orderStatus "Resulted" ;
    med:hasResult res:Res_50 .

res:Res_50 a med:LabResult ;
    med:analyte "Fasting glucose" ; med:value 255.75 ; med:unit "mg/dL" ;
    med:refLow 70 ; med:refHigh 100 ; med:outOfRange true ;
    med:date "2023-08-07"^^xsd:date ;
    med:performedBy res:Tech_Mohan .

res:Enc_118 med:orderedTest res:Lab_49 , res:Lab_50 .

res:Inv_86 a med:Invoice ;
    med:forPatient res:Pat_FAT126 ; med:date "2023-08-06"^^xsd:date ;
    med:amount 1644 ; med:paid true ;
    med:status "Settled" .
res:Inv_86 med:coveredBy res:Policy_FAT126 .
res:Pat_FAT126 med:hasInvoice res:Inv_86 .

res:Enc_119 a med:Consultation ;
    med:encounterOf res:Pat_FAT126 ; med:date "2024-07-24"^^xsd:date ;
    med:time "12:30" ;
    med:attendedBy res:Doc_Farida ; med:inDepartment res:Dept_Cardiology ;
    med:reason "Review of coronary artery disease" ;
    med:outcome "Follow up scheduled" ;
    med:recordedCondition res:Cond_82 ;
    med:hasVitals res:Vit_119 ; med:hasNote res:Note_119 .

res:Vit_119 a med:VitalSigns ;
    med:systolic 130 ; med:diastolic 73 ;
    med:heartRate 86 ; med:temperature 98.1 ;
    med:spo2 96 ;
    med:weightKg 57.7 ;
    med:bmi 23.2 .

res:Note_119 a med:ClinicalNote ;
    med:authorName "Dr. Farida" ;
    med:date "2024-07-24"^^xsd:date ;
    med:noteText "Seen for worsening symptoms over the past week. Counselled on medication adherence. Red flag symptoms explained." .

res:Rx_85 a med:Prescription ;
    med:prescribes res:Med_Clopidogrel ; med:prescribedBy res:Doc_Farida ;
    med:forPatient res:Pat_FAT126 ; med:date "2024-07-24"^^xsd:date ;
    med:dosage "1 tablet" ;
    med:frequency "As required" ;
    med:durationDays 90 ;
    med:dispensed true ;
    med:status "Completed" .

res:Rx_86 a med:Prescription ;
    med:prescribes res:Med_Atorvastatin ; med:prescribedBy res:Doc_Farida ;
    med:forPatient res:Pat_FAT126 ; med:date "2024-07-24"^^xsd:date ;
    med:dosage "2 tablets" ;
    med:frequency "Three times daily" ;
    med:durationDays 30 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_119 med:issuedPrescription res:Rx_85 , res:Rx_86 .
res:Pat_FAT126 med:hasPrescription res:Rx_85 , res:Rx_86 .

res:Inv_87 a med:Invoice ;
    med:forPatient res:Pat_FAT126 ; med:date "2024-07-24"^^xsd:date ;
    med:amount 3651 ; med:paid true ;
    med:status "Settled" .
res:Inv_87 med:coveredBy res:Policy_FAT126 .
res:Pat_FAT126 med:hasInvoice res:Inv_87 .

res:Enc_120 a med:Consultation ;
    med:encounterOf res:Pat_FAT126 ; med:date "2025-09-03"^^xsd:date ;
    med:time "09:00" ;
    med:attendedBy res:Doc_Ramesh ; med:inDepartment res:Dept_Cardiology ;
    med:reason "Review of coronary artery disease" ;
    med:outcome "Referred for tests" ;
    med:recordedCondition res:Cond_82 ;
    med:hasVitals res:Vit_120 ; med:hasNote res:Note_120 .

res:Vit_120 a med:VitalSigns ;
    med:systolic 115 ; med:diastolic 72 ;
    med:heartRate 71 ; med:temperature 98.6 ;
    med:spo2 98 ;
    med:weightKg 51.7 ;
    med:bmi 25.5 .

res:Note_120 a med:ClinicalNote ;
    med:authorName "Dr. Ramesh" ;
    med:date "2025-09-03"^^xsd:date ;
    med:noteText "Routine review, no new complaints. Dose adjusted, repeat bloods before next visit." .

res:Rx_87 a med:Prescription ;
    med:prescribes res:Med_Clopidogrel ; med:prescribedBy res:Doc_Ramesh ;
    med:forPatient res:Pat_FAT126 ; med:date "2025-09-03"^^xsd:date ;
    med:dosage "1 tablet" ;
    med:frequency "Three times daily" ;
    med:durationDays 60 ;
    med:dispensed true ;
    med:status "Completed" .

res:Rx_88 a med:Prescription ;
    med:prescribes res:Med_Atorvastatin ; med:prescribedBy res:Doc_Ramesh ;
    med:forPatient res:Pat_FAT126 ; med:date "2025-09-03"^^xsd:date ;
    med:dosage "2 tablets" ;
    med:frequency "As required" ;
    med:durationDays 90 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_120 med:issuedPrescription res:Rx_87 , res:Rx_88 .
res:Pat_FAT126 med:hasPrescription res:Rx_87 , res:Rx_88 .

res:Lab_51 a med:LabOrder ;
    med:analyte "Troponin I" ; med:forPatient res:Pat_FAT126 ;
    med:date "2025-09-03"^^xsd:date ; med:orderedBy res:Doc_Ramesh ;
    med:testsFor res:CoronaryArteryDisease ;
    med:orderStatus "Resulted" ;
    med:hasResult res:Res_51 .

res:Res_51 a med:LabResult ;
    med:analyte "Troponin I" ; med:value 5.64 ; med:unit "ng/mL" ;
    med:refLow 0 ; med:refHigh 0.04 ; med:outOfRange true ;
    med:date "2025-09-04"^^xsd:date ;
    med:performedBy res:Tech_Mohan .

res:Enc_120 med:orderedTest res:Lab_51 .

res:Inv_88 a med:Invoice ;
    med:forPatient res:Pat_FAT126 ; med:date "2025-09-03"^^xsd:date ;
    med:amount 1568 ; med:paid true ;
    med:status "Settled" .
res:Inv_88 med:coveredBy res:Policy_FAT126 .
res:Pat_FAT126 med:hasInvoice res:Inv_88 .

res:Enc_121 a med:Consultation ;
    med:encounterOf res:Pat_FAT126 ; med:date "2026-08-26"^^xsd:date ;
    med:time "09:30" ;
    med:attendedBy res:Doc_Joseph ; med:inDepartment res:Dept_GeneralMedicine ;
    med:reason "Review of dyslipidemia" ;
    med:outcome "Discharged with advice" ;
    med:recordedCondition res:Cond_83 ;
    med:hasVitals res:Vit_121 ; med:hasNote res:Note_121 .

res:Vit_121 a med:VitalSigns ;
    med:systolic 115 ; med:diastolic 84 ;
    med:heartRate 76 ; med:temperature 97.6 ;
    med:spo2 100 ;
    med:weightKg 50.7 ;
    med:bmi 19.9 .

res:Note_121 a med:ClinicalNote ;
    med:authorName "Dr. Joseph" ;
    med:date "2026-08-26"^^xsd:date ;
    med:noteText "Patient reports steady improvement since last visit. Counselled on medication adherence. Red flag symptoms explained." .

res:Rx_89 a med:Prescription ;
    med:prescribes res:Med_Atorvastatin ; med:prescribedBy res:Doc_Joseph ;
    med:forPatient res:Pat_FAT126 ; med:date "2026-08-26"^^xsd:date ;
    med:dosage "2 tablets" ;
    med:frequency "Once daily" ;
    med:durationDays 90 ;
    med:dispensed false ;
    med:status "Active" .

res:Enc_121 med:issuedPrescription res:Rx_89 .
res:Pat_FAT126 med:hasPrescription res:Rx_89 .

res:Lab_52 a med:LabOrder ;
    med:analyte "LDL cholesterol" ; med:forPatient res:Pat_FAT126 ;
    med:date "2026-08-26"^^xsd:date ; med:orderedBy res:Doc_Joseph ;
    med:testsFor res:Dyslipidemia ;
    med:orderStatus "Pending" .

res:Lab_53 a med:LabOrder ;
    med:analyte "Triglycerides" ; med:forPatient res:Pat_FAT126 ;
    med:date "2026-08-26"^^xsd:date ; med:orderedBy res:Doc_Joseph ;
    med:testsFor res:Dyslipidemia ;
    med:orderStatus "Pending" .

res:Enc_121 med:orderedTest res:Lab_52 , res:Lab_53 .

res:Inv_89 a med:Invoice ;
    med:forPatient res:Pat_FAT126 ; med:date "2026-08-26"^^xsd:date ;
    med:amount 4915 ; med:paid false ;
    med:status "Insurance claim pending" .
res:Inv_89 med:coveredBy res:Policy_FAT126 .
res:Pat_FAT126 med:hasInvoice res:Inv_89 .

res:Policy_FAT126 a med:InsurancePolicy ;
    med:policyNumber "NE-450585" ;
    med:issuedBy res:Ins_NewIndia ; med:coveragePercent 85 ;
    med:amount 500000 .
res:Pat_FAT126 med:hasPolicy res:Policy_FAT126 .

res:Appt_16 a med:Appointment ;
    med:forPatient res:Pat_FAT126 ; med:appointmentWith res:Doc_Ramesh ;
    med:date "2026-09-25"^^xsd:date ;
    med:time "11:00" ;
    med:inDepartment res:Dept_Cardiology ;
    med:status "Scheduled" .
res:Pat_FAT126 med:hasAppointment res:Appt_16 .

res:Pat_PRA127 a med:OutPatient ;
    med:name "Prakash Balan" ; med:mrn "MRN-PRA127" ; med:photoInitials "PB" ;
    med:sex "Male" ; med:dateOfBirth "1949-10-09"^^xsd:date ; med:age 76 ;
    med:bloodGroup "A-" ; med:phone "+91 92961 249253" ; med:email "prakash.balan@example.in" ;
    med:address "39 Velachery Main Road, Chromepet, Chennai" ;
    med:primaryPhysician res:Doc_Anand ;
    med:allergicTo res:Allergen_Sulfa ;
    med:hasCondition res:Cond_86 , res:Cond_87 , res:Cond_88 , res:Cond_89 .

res:Cond_86 a med:Condition , med:CriticalCondition ;
    med:ofDisease res:BreastCancer ; med:onsetDate "2025-05-13"^^xsd:date ;
    med:severity "Severe" ;
    med:clinicalStatus "Resolved" ;
    med:resolvedDate "2025-07-14"^^xsd:date ;
    med:diagnosedBy res:Doc_Anand .

res:Cond_87 a med:Condition ;
    med:ofDisease res:Hypothyroidism ; med:onsetDate "2018-03-15"^^xsd:date ;
    med:severity "Moderate" ;
    med:clinicalStatus "Active" ;
    med:diagnosedBy res:Doc_Nithya .

res:Cond_88 a med:Condition ;
    med:ofDisease res:TypeIIDiabetes ; med:onsetDate "2022-06-30"^^xsd:date ;
    med:severity "Mild" ;
    med:clinicalStatus "Active" ;
    med:diagnosedBy res:Doc_Nithya .

res:Cond_89 a med:Condition ;
    med:ofDisease res:ChronicKidneyDisease ; med:onsetDate "2017-07-19"^^xsd:date ;
    med:severity "Moderate" ;
    med:clinicalStatus "Active" ;
    med:diagnosedBy res:Doc_Vandana .

res:Pat_PRA127 med:hasEncounter res:Enc_122 , res:Enc_123 , res:Enc_124 , res:Enc_125 , res:Enc_126 , res:Enc_127 .

res:Enc_122 a med:Consultation ;
    med:encounterOf res:Pat_PRA127 ; med:date "2023-03-13"^^xsd:date ;
    med:time "12:30" ;
    med:attendedBy res:Doc_Nithya ; med:inDepartment res:Dept_Endocrinology ;
    med:reason "First presentation" ;
    med:outcome "Treatment continued" ;
    med:recordedCondition res:Cond_88 ;
    med:hasVitals res:Vit_122 ; med:hasNote res:Note_122 .

res:Vit_122 a med:VitalSigns ;
    med:systolic 116 ; med:diastolic 80 ;
    med:heartRate 66 ; med:temperature 98.0 ;
    med:spo2 97 ;
    med:weightKg 66.5 ;
    med:bmi 21.2 .

res:Note_122 a med:ClinicalNote ;
    med:authorName "Dr. Nithya" ;
    med:date "2023-03-13"^^xsd:date ;
    med:noteText "Patient reports steady improvement since last visit. Reassured. No change to treatment at this stage." .

res:Rx_90 a med:Prescription ;
    med:prescribes res:Med_Glimepiride ; med:prescribedBy res:Doc_Nithya ;
    med:forPatient res:Pat_PRA127 ; med:date "2023-03-13"^^xsd:date ;
    med:dosage "1 tablet" ;
    med:frequency "Once daily at night" ;
    med:durationDays 30 ;
    med:dispensed true ;
    med:status "Completed" .

res:Rx_91 a med:Prescription ;
    med:prescribes res:Med_Insulin ; med:prescribedBy res:Doc_Nithya ;
    med:forPatient res:Pat_PRA127 ; med:date "2023-03-13"^^xsd:date ;
    med:dosage "1 dose" ;
    med:frequency "Once daily" ;
    med:durationDays 60 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_122 med:issuedPrescription res:Rx_90 , res:Rx_91 .
res:Pat_PRA127 med:hasPrescription res:Rx_90 , res:Rx_91 .

res:Lab_54 a med:LabOrder ;
    med:analyte "HbA1c" ; med:forPatient res:Pat_PRA127 ;
    med:date "2023-03-13"^^xsd:date ; med:orderedBy res:Doc_Nithya ;
    med:testsFor res:TypeIIDiabetes ;
    med:orderStatus "Resulted" ;
    med:hasResult res:Res_54 .

res:Res_54 a med:LabResult ;
    med:analyte "HbA1c" ; med:value 9.5 ; med:unit "%" ;
    med:refLow 4 ; med:refHigh 5.6 ; med:outOfRange true ;
    med:date "2023-03-14"^^xsd:date ;
    med:performedBy res:Tech_Mohan .

res:Lab_55 a med:LabOrder ;
    med:analyte "Fasting glucose" ; med:forPatient res:Pat_PRA127 ;
    med:date "2023-03-13"^^xsd:date ; med:orderedBy res:Doc_Nithya ;
    med:testsFor res:TypeIIDiabetes ;
    med:orderStatus "Resulted" ;
    med:hasResult res:Res_55 .

res:Res_55 a med:LabResult ;
    med:analyte "Fasting glucose" ; med:value 212.97 ; med:unit "mg/dL" ;
    med:refLow 70 ; med:refHigh 100 ; med:outOfRange true ;
    med:date "2023-03-14"^^xsd:date ;
    med:performedBy res:Tech_Mohan .

res:Enc_122 med:orderedTest res:Lab_54 , res:Lab_55 .

res:Inv_90 a med:Invoice ;
    med:forPatient res:Pat_PRA127 ; med:date "2023-03-13"^^xsd:date ;
    med:amount 3827 ; med:paid true ;
    med:status "Settled" .
res:Pat_PRA127 med:hasInvoice res:Inv_90 .

res:Enc_123 a med:FollowUp ;
    med:encounterOf res:Pat_PRA127 ; med:date "2023-12-06"^^xsd:date ;
    med:time "17:30" ;
    med:attendedBy res:Doc_Vandana ; med:inDepartment res:Dept_Nephrology ;
    med:reason "Review of chronic kidney disease" ;
    med:outcome "Referred for tests" ;
    med:recordedCondition res:Cond_89 ;
    med:hasVitals res:Vit_123 ; med:hasNote res:Note_123 .

res:Vit_123 a med:VitalSigns ;
    med:systolic 113 ; med:diastolic 76 ;
    med:heartRate 79 ; med:temperature 98.7 ;
    med:spo2 98 ;
    med:weightKg 74.8 ;
    med:bmi 22.1 .

res:Note_123 a med:ClinicalNote ;
    med:authorName "Dr. Vandana" ;
    med:date "2023-12-06"^^xsd:date ;
    med:noteText "Presents with a two day history of symptoms. Investigations ordered, will call with results." .

res:Rx_92 a med:Prescription ;
    med:prescribes res:Med_Telmisartan ; med:prescribedBy res:Doc_Vandana ;
    med:forPatient res:Pat_PRA127 ; med:date "2023-12-06"^^xsd:date ;
    med:dosage "1 tablet" ;
    med:frequency "Once daily at night" ;
    med:durationDays 30 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_123 med:issuedPrescription res:Rx_92 .
res:Pat_PRA127 med:hasPrescription res:Rx_92 .

res:Lab_56 a med:LabOrder ;
    med:analyte "Creatinine" ; med:forPatient res:Pat_PRA127 ;
    med:date "2023-12-06"^^xsd:date ; med:orderedBy res:Doc_Vandana ;
    med:testsFor res:ChronicKidneyDisease ;
    med:orderStatus "Resulted" ;
    med:hasResult res:Res_56 .

res:Res_56 a med:LabResult ;
    med:analyte "Creatinine" ; med:value 4.85 ; med:unit "mg/dL" ;
    med:refLow 0.6 ; med:refHigh 1.2 ; med:outOfRange true ;
    med:date "2023-12-07"^^xsd:date ;
    med:performedBy res:Tech_Mohan .

res:Lab_57 a med:LabOrder ;
    med:analyte "eGFR" ; med:forPatient res:Pat_PRA127 ;
    med:date "2023-12-06"^^xsd:date ; med:orderedBy res:Doc_Vandana ;
    med:testsFor res:ChronicKidneyDisease ;
    med:orderStatus "Resulted" ;
    med:hasResult res:Res_57 .

res:Res_57 a med:LabResult ;
    med:analyte "eGFR" ; med:value 40.87 ; med:unit "mL/min" ;
    med:refLow 90 ; med:refHigh 120 ; med:outOfRange true ;
    med:date "2023-12-07"^^xsd:date ;
    med:performedBy res:Tech_Mohan .

res:Enc_123 med:orderedTest res:Lab_56 , res:Lab_57 .

res:Enc_124 a med:EmergencyVisit ;
    med:encounterOf res:Pat_PRA127 ; med:date "2024-08-29"^^xsd:date ;
    med:time "17:00" ;
    med:attendedBy res:Doc_Karthik ; med:inDepartment res:Dept_Emergency ;
    med:reason "Acute presentation" ;
    med:outcome "Discharged with advice" ;
    med:recordedCondition res:Cond_86 ;
    med:hasVitals res:Vit_124 ; med:hasNote res:Note_124 .

res:Vit_124 a med:VitalSigns ;
    med:systolic 122 ; med:diastolic 80 ;
    med:heartRate 104 ; med:temperature 98.3 ;
    med:spo2 96 ;
    med:weightKg 75.9 ;
    med:bmi 20.6 .

res:Note_124 a med:ClinicalNote ;
    med:authorName "Dr. Karthik" ;
    med:date "2024-08-29"^^xsd:date ;
    med:noteText "Referred from general medicine for specialist opinion. Counselled on medication adherence. Red flag symptoms explained." .

res:Rx_93 a med:Prescription ;
    med:prescribes res:Med_Tamoxifen ; med:prescribedBy res:Doc_Karthik ;
    med:forPatient res:Pat_PRA127 ; med:date "2024-08-29"^^xsd:date ;
    med:dosage "1 tablet" ;
    med:frequency "Once daily" ;
    med:durationDays 7 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_124 med:issuedPrescription res:Rx_93 .
res:Pat_PRA127 med:hasPrescription res:Rx_93 .

res:Lab_58 a med:LabOrder ;
    med:analyte "CA 15-3" ; med:forPatient res:Pat_PRA127 ;
    med:date "2024-08-29"^^xsd:date ; med:orderedBy res:Doc_Karthik ;
    med:testsFor res:BreastCancer ;
    med:orderStatus "Resulted" ;
    med:hasResult res:Res_58 .

res:Res_58 a med:LabResult ;
    med:analyte "CA 15-3" ; med:value 107.81 ; med:unit "U/mL" ;
    med:refLow 0 ; med:refHigh 30 ; med:outOfRange true ;
    med:date "2024-08-30"^^xsd:date ;
    med:performedBy res:Tech_Mohan .

res:Enc_124 med:orderedTest res:Lab_58 .

res:Inv_91 a med:Invoice ;
    med:forPatient res:Pat_PRA127 ; med:date "2024-08-29"^^xsd:date ;
    med:amount 24077 ; med:paid true ;
    med:status "Settled" .
res:Pat_PRA127 med:hasInvoice res:Inv_91 .

res:Enc_125 a med:EmergencyVisit ;
    med:encounterOf res:Pat_PRA127 ; med:date "2025-04-05"^^xsd:date ;
    med:time "18:00" ;
    med:attendedBy res:Doc_Karthik ; med:inDepartment res:Dept_Emergency ;
    med:reason "Acute presentation" ;
    med:outcome "Referred for tests" ;
    med:recordedCondition res:Cond_87 ;
    med:hasVitals res:Vit_125 ; med:hasNote res:Note_125 .

res:Vit_125 a med:VitalSigns ;
    med:systolic 122 ; med:diastolic 84 ;
    med:heartRate 103 ; med:temperature 98.4 ;
    med:spo2 96 ;
    med:weightKg 55.8 ;
    med:bmi 27.0 .

res:Note_125 a med:ClinicalNote ;
    med:authorName "Dr. Karthik" ;
    med:date "2025-04-05"^^xsd:date ;
    med:noteText "Seen for worsening symptoms over the past week. Reassured. No change to treatment at this stage." .

res:Rx_94 a med:Prescription ;
    med:prescribes res:Med_Levothyroxine ; med:prescribedBy res:Doc_Karthik ;
    med:forPatient res:Pat_PRA127 ; med:date "2025-04-05"^^xsd:date ;
    med:dosage "1 tablet" ;
    med:frequency "Twice daily" ;
    med:durationDays 60 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_125 med:issuedPrescription res:Rx_94 .
res:Pat_PRA127 med:hasPrescription res:Rx_94 .

res:Lab_59 a med:LabOrder ;
    med:analyte "TSH" ; med:forPatient res:Pat_PRA127 ;
    med:date "2025-04-05"^^xsd:date ; med:orderedBy res:Doc_Karthik ;
    med:testsFor res:Hypothyroidism ;
    med:orderStatus "Resulted" ;
    med:hasResult res:Res_59 .

res:Res_59 a med:LabResult ;
    med:analyte "TSH" ; med:value 14.52 ; med:unit "mIU/L" ;
    med:refLow 0.4 ; med:refHigh 4 ; med:outOfRange true ;
    med:date "2025-04-06"^^xsd:date ;
    med:performedBy res:Tech_Mohan .

res:Enc_125 med:orderedTest res:Lab_59 .

res:Inv_92 a med:Invoice ;
    med:forPatient res:Pat_PRA127 ; med:date "2025-04-05"^^xsd:date ;
    med:amount 13850 ; med:paid true ;
    med:status "Settled" .
res:Pat_PRA127 med:hasInvoice res:Inv_92 .

res:Enc_126 a med:Admission ;
    med:encounterOf res:Pat_PRA127 ; med:date "2026-01-01"^^xsd:date ;
    med:time "08:30" ;
    med:attendedBy res:Doc_Nithya ; med:inDepartment res:Dept_Endocrinology ;
    med:reason "Review of hypothyroidism" ;
    med:outcome "Admitted to ward" ;
    med:lengthOfStay 2 ;
    med:recordedCondition res:Cond_87 ;
    med:hasVitals res:Vit_126 ; med:hasNote res:Note_126 .

res:Vit_126 a med:VitalSigns ;
    med:systolic 127 ; med:diastolic 67 ;
    med:heartRate 94 ; med:temperature 98.1 ;
    med:spo2 99 ;
    med:weightKg 52.9 ;
    med:bmi 22.8 .

res:Note_126 a med:ClinicalNote ;
    med:authorName "Dr. Nithya" ;
    med:date "2026-01-01"^^xsd:date ;
    med:noteText "Routine review, no new complaints. Counselled on medication adherence. Red flag symptoms explained." .

res:Rx_95 a med:Prescription ;
    med:prescribes res:Med_Levothyroxine ; med:prescribedBy res:Doc_Nithya ;
    med:forPatient res:Pat_PRA127 ; med:date "2026-01-01"^^xsd:date ;
    med:dosage "1 dose" ;
    med:frequency "As required" ;
    med:durationDays 30 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_126 med:issuedPrescription res:Rx_95 .
res:Pat_PRA127 med:hasPrescription res:Rx_95 .

res:Inv_93 a med:Invoice ;
    med:forPatient res:Pat_PRA127 ; med:date "2026-01-01"^^xsd:date ;
    med:amount 293855 ; med:paid true ;
    med:status "Settled" .
res:Pat_PRA127 med:hasInvoice res:Inv_93 .

res:Enc_127 a med:FollowUp ;
    med:encounterOf res:Pat_PRA127 ; med:date "2026-08-22"^^xsd:date ;
    med:time "12:00" ;
    med:attendedBy res:Doc_Nithya ; med:inDepartment res:Dept_Endocrinology ;
    med:reason "Review of hypothyroidism" ;
    med:outcome "Referred for tests" ;
    med:recordedCondition res:Cond_87 ;
    med:hasVitals res:Vit_127 ; med:hasNote res:Note_127 .

res:Vit_127 a med:VitalSigns ;
    med:systolic 123 ; med:diastolic 82 ;
    med:heartRate 77 ; med:temperature 99.2 ;
    med:spo2 96 ;
    med:weightKg 51.6 ;
    med:bmi 21.6 .

res:Note_127 a med:ClinicalNote ;
    med:authorName "Dr. Nithya" ;
    med:date "2026-08-22"^^xsd:date ;
    med:noteText "Seen for worsening symptoms over the past week. Dose adjusted, repeat bloods before next visit." .

res:Rx_96 a med:Prescription ;
    med:prescribes res:Med_Levothyroxine ; med:prescribedBy res:Doc_Nithya ;
    med:forPatient res:Pat_PRA127 ; med:date "2026-08-22"^^xsd:date ;
    med:dosage "1 tablet" ;
    med:frequency "Three times daily" ;
    med:durationDays 90 ;
    med:dispensed false ;
    med:status "Active" .

res:Enc_127 med:issuedPrescription res:Rx_96 .
res:Pat_PRA127 med:hasPrescription res:Rx_96 .

res:Lab_60 a med:LabOrder ;
    med:analyte "TSH" ; med:forPatient res:Pat_PRA127 ;
    med:date "2026-08-22"^^xsd:date ; med:orderedBy res:Doc_Nithya ;
    med:testsFor res:Hypothyroidism ;
    med:orderStatus "Resulted" ;
    med:hasResult res:Res_60 .

res:Res_60 a med:LabResult ;
    med:analyte "TSH" ; med:value 10.28 ; med:unit "mIU/L" ;
    med:refLow 0.4 ; med:refHigh 4 ; med:outOfRange true ;
    med:date "2026-08-23"^^xsd:date ;
    med:performedBy res:Tech_Mohan .

res:Enc_127 med:orderedTest res:Lab_60 .

res:Inv_94 a med:Invoice ;
    med:forPatient res:Pat_PRA127 ; med:date "2026-08-22"^^xsd:date ;
    med:amount 2353 ; med:paid false ;
    med:status "Awaiting payment" .
res:Pat_PRA127 med:hasInvoice res:Inv_94 .

res:Pat_MUR128 a med:OutPatient ;
    med:name "Murugan Shetty" ; med:mrn "MRN-MUR128" ; med:photoInitials "MS" ;
    med:sex "Male" ; med:dateOfBirth "2011-03-07"^^xsd:date ; med:age 15 ;
    med:bloodGroup "AB-" ; med:phone "+91 92025 631317" ; med:email "murugan.shetty@example.in" ;
    med:address "86 ECR, Velachery, Chennai" ;
    med:primaryPhysician res:Doc_Joseph ;
    med:hasCondition res:Cond_90 .

res:Cond_90 a med:Condition ;
    med:ofDisease res:Dengue ; med:onsetDate "2025-06-01"^^xsd:date ;
    med:severity "Mild" ;
    med:clinicalStatus "Resolved" ;
    med:resolvedDate "2025-11-19"^^xsd:date ;
    med:diagnosedBy res:Doc_Joseph .

res:Pat_MUR128 med:hasEncounter res:Enc_128 , res:Enc_129 , res:Enc_130 , res:Enc_131 .

res:Enc_128 a med:Consultation ;
    med:encounterOf res:Pat_MUR128 ; med:date "2023-08-14"^^xsd:date ;
    med:time "15:45" ;
    med:attendedBy res:Doc_Joseph ; med:inDepartment res:Dept_GeneralMedicine ;
    med:reason "First presentation" ;
    med:outcome "Discharged with advice" ;
    med:recordedCondition res:Cond_90 ;
    med:hasVitals res:Vit_128 ; med:hasNote res:Note_128 .

res:Vit_128 a med:VitalSigns ;
    med:systolic 110 ; med:diastolic 74 ;
    med:heartRate 95 ; med:temperature 98.9 ;
    med:spo2 99 ;
    med:weightKg 50.4 ;
    med:bmi 24.5 .

res:Note_128 a med:ClinicalNote ;
    med:authorName "Dr. Joseph" ;
    med:date "2023-08-14"^^xsd:date ;
    med:noteText "Referred from general medicine for specialist opinion. Advised on diet, salt restriction and daily walking." .

res:Lab_61 a med:LabOrder ;
    med:analyte "Platelet count" ; med:forPatient res:Pat_MUR128 ;
    med:date "2023-08-14"^^xsd:date ; med:orderedBy res:Doc_Joseph ;
    med:testsFor res:Dengue ;
    med:orderStatus "Resulted" ;
    med:hasResult res:Res_61 .

res:Res_61 a med:LabResult ;
    med:analyte "Platelet count" ; med:value 35.49 ; med:unit "x10^3/uL" ;
    med:refLow 150 ; med:refHigh 450 ; med:outOfRange true ;
    med:date "2023-08-15"^^xsd:date ;
    med:performedBy res:Tech_Mohan .

res:Enc_128 med:orderedTest res:Lab_61 .

res:Inv_95 a med:Invoice ;
    med:forPatient res:Pat_MUR128 ; med:date "2023-08-14"^^xsd:date ;
    med:amount 3891 ; med:paid true ;
    med:status "Settled" .
res:Pat_MUR128 med:hasInvoice res:Inv_95 .

res:Enc_129 a med:Screening ;
    med:encounterOf res:Pat_MUR128 ; med:date "2024-08-29"^^xsd:date ;
    med:time "18:00" ;
    med:attendedBy res:Doc_Karthik ; med:inDepartment res:Dept_GeneralMedicine ;
    med:reason "Review of dengue" ;
    med:outcome "Discharged with advice" ;
    med:recordedCondition res:Cond_90 ;
    med:hasVitals res:Vit_129 ; med:hasNote res:Note_129 .

res:Vit_129 a med:VitalSigns ;
    med:systolic 126 ; med:diastolic 76 ;
    med:heartRate 68 ; med:temperature 97.4 ;
    med:spo2 99 ;
    med:weightKg 66.7 ;
    med:bmi 19.5 .

res:Note_129 a med:ClinicalNote ;
    med:authorName "Dr. Karthik" ;
    med:date "2024-08-29"^^xsd:date ;
    med:noteText "Referred from general medicine for specialist opinion. Referral raised to the relevant specialty." .

res:Rx_97 a med:Prescription ;
    med:prescribes res:Med_Paracetamol ; med:prescribedBy res:Doc_Karthik ;
    med:forPatient res:Pat_MUR128 ; med:date "2024-08-29"^^xsd:date ;
    med:dosage "1 dose" ;
    med:frequency "Twice daily" ;
    med:durationDays 10 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_129 med:issuedPrescription res:Rx_97 .
res:Pat_MUR128 med:hasPrescription res:Rx_97 .

res:Lab_62 a med:LabOrder ;
    med:analyte "Platelet count" ; med:forPatient res:Pat_MUR128 ;
    med:date "2024-08-29"^^xsd:date ; med:orderedBy res:Doc_Karthik ;
    med:testsFor res:Dengue ;
    med:orderStatus "Resulted" ;
    med:hasResult res:Res_62 .

res:Res_62 a med:LabResult ;
    med:analyte "Platelet count" ; med:value 204.95 ; med:unit "x10^3/uL" ;
    med:refLow 150 ; med:refHigh 450 ; med:outOfRange false ;
    med:date "2024-08-30"^^xsd:date ;
    med:performedBy res:Tech_Mohan .

res:Enc_129 med:orderedTest res:Lab_62 .

res:Enc_130 a med:FollowUp ;
    med:encounterOf res:Pat_MUR128 ; med:date "2025-08-26"^^xsd:date ;
    med:time "13:00" ;
    med:attendedBy res:Doc_Karthik ; med:inDepartment res:Dept_GeneralMedicine ;
    med:reason "Review of dengue" ;
    med:outcome "Treatment continued" ;
    med:recordedCondition res:Cond_90 ;
    med:hasVitals res:Vit_130 ; med:hasNote res:Note_130 .

res:Vit_130 a med:VitalSigns ;
    med:systolic 124 ; med:diastolic 66 ;
    med:heartRate 67 ; med:temperature 100.2 ;
    med:spo2 97 ;
    med:weightKg 71.6 ;
    med:bmi 25.0 .

res:Note_130 a med:ClinicalNote ;
    med:authorName "Dr. Karthik" ;
    med:date "2025-08-26"^^xsd:date ;
    med:noteText "Post discharge review. Continue current therapy, review in three months." .

res:Rx_98 a med:Prescription ;
    med:prescribes res:Med_Paracetamol ; med:prescribedBy res:Doc_Karthik ;
    med:forPatient res:Pat_MUR128 ; med:date "2025-08-26"^^xsd:date ;
    med:dosage "2 tablets" ;
    med:frequency "Twice daily" ;
    med:durationDays 10 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_130 med:issuedPrescription res:Rx_98 .
res:Pat_MUR128 med:hasPrescription res:Rx_98 .

res:Lab_63 a med:LabOrder ;
    med:analyte "Platelet count" ; med:forPatient res:Pat_MUR128 ;
    med:date "2025-08-26"^^xsd:date ; med:orderedBy res:Doc_Karthik ;
    med:testsFor res:Dengue ;
    med:orderStatus "Resulted" ;
    med:hasResult res:Res_63 .

res:Res_63 a med:LabResult ;
    med:analyte "Platelet count" ; med:value 51.3 ; med:unit "x10^3/uL" ;
    med:refLow 150 ; med:refHigh 450 ; med:outOfRange true ;
    med:date "2025-08-27"^^xsd:date ;
    med:performedBy res:Tech_Mohan .

res:Enc_130 med:orderedTest res:Lab_63 .

res:Inv_96 a med:Invoice ;
    med:forPatient res:Pat_MUR128 ; med:date "2025-08-26"^^xsd:date ;
    med:amount 6027 ; med:paid true ;
    med:status "Settled" .
res:Pat_MUR128 med:hasInvoice res:Inv_96 .

res:Enc_131 a med:Consultation ;
    med:encounterOf res:Pat_MUR128 ; med:date "2026-08-30"^^xsd:date ;
    med:time "14:15" ;
    med:attendedBy res:Doc_Joseph ; med:inDepartment res:Dept_GeneralMedicine ;
    med:reason "Review of dengue" ;
    med:outcome "Follow up scheduled" ;
    med:recordedCondition res:Cond_90 ;
    med:hasVitals res:Vit_131 ; med:hasNote res:Note_131 .

res:Vit_131 a med:VitalSigns ;
    med:systolic 116 ; med:diastolic 82 ;
    med:heartRate 104 ; med:temperature 99.6 ;
    med:spo2 96 ;
    med:weightKg 68.5 ;
    med:bmi 23.4 .

res:Note_131 a med:ClinicalNote ;
    med:authorName "Dr. Joseph" ;
    med:date "2026-08-30"^^xsd:date ;
    med:noteText "Seen for worsening symptoms over the past week. Counselled on medication adherence. Red flag symptoms explained." .

res:Rx_99 a med:Prescription ;
    med:prescribes res:Med_Paracetamol ; med:prescribedBy res:Doc_Joseph ;
    med:forPatient res:Pat_MUR128 ; med:date "2026-08-30"^^xsd:date ;
    med:dosage "1 dose" ;
    med:frequency "Once daily at night" ;
    med:durationDays 10 ;
    med:dispensed false ;
    med:status "Completed" .

res:Enc_131 med:issuedPrescription res:Rx_99 .
res:Pat_MUR128 med:hasPrescription res:Rx_99 .

res:Lab_64 a med:LabOrder ;
    med:analyte "Platelet count" ; med:forPatient res:Pat_MUR128 ;
    med:date "2026-08-30"^^xsd:date ; med:orderedBy res:Doc_Joseph ;
    med:testsFor res:Dengue ;
    med:orderStatus "Pending" .

res:Enc_131 med:orderedTest res:Lab_64 .

res:Inv_97 a med:Invoice ;
    med:forPatient res:Pat_MUR128 ; med:date "2026-08-30"^^xsd:date ;
    med:amount 5802 ; med:paid false ;
    med:status "Awaiting payment" .
res:Pat_MUR128 med:hasInvoice res:Inv_97 .

res:Appt_17 a med:Appointment ;
    med:forPatient res:Pat_MUR128 ; med:appointmentWith res:Doc_Joseph ;
    med:date "2026-09-05"^^xsd:date ;
    med:time "17:00" ;
    med:inDepartment res:Dept_GeneralMedicine ;
    med:status "Scheduled" .
res:Pat_MUR128 med:hasAppointment res:Appt_17 .

res:Pat_ARJ129 a med:InPatient ;
    med:name "Arjun Reddy" ; med:mrn "MRN-ARJ129" ; med:photoInitials "AR" ;
    med:sex "Male" ; med:dateOfBirth "1993-06-07"^^xsd:date ; med:age 33 ;
    med:bloodGroup "AB-" ; med:phone "+91 92267 145370" ; med:email "arjun.reddy@example.in" ;
    med:address "11 Anna Salai, Sholinganallur, Chennai" ;
    med:primaryPhysician res:Doc_Suresh ;
    med:hasCondition res:Cond_91 , res:Cond_92 .

res:Cond_91 a med:Condition ;
    med:ofDisease res:UrinaryTractInfection ; med:onsetDate "2025-05-26"^^xsd:date ;
    med:severity "Moderate" ;
    med:clinicalStatus "Resolved" ;
    med:resolvedDate "2025-11-07"^^xsd:date ;
    med:diagnosedBy res:Doc_Joseph .

res:Cond_92 a med:Condition ;
    med:ofDisease res:Depression ; med:onsetDate "2016-12-06"^^xsd:date ;
    med:severity "Moderate" ;
    med:clinicalStatus "Active" ;
    med:diagnosedBy res:Doc_Leela .

res:Pat_ARJ129 med:hasEncounter res:Enc_132 , res:Enc_133 .

res:Enc_132 a med:EmergencyVisit ;
    med:encounterOf res:Pat_ARJ129 ; med:date "2024-08-27"^^xsd:date ;
    med:time "16:30" ;
    med:attendedBy res:Doc_Karthik ; med:inDepartment res:Dept_Emergency ;
    med:reason "Acute presentation" ;
    med:outcome "Discharged with advice" ;
    med:recordedCondition res:Cond_91 ;
    med:hasVitals res:Vit_132 ; med:hasNote res:Note_132 .

res:Vit_132 a med:VitalSigns ;
    med:systolic 129 ; med:diastolic 81 ;
    med:heartRate 82 ; med:temperature 98.2 ;
    med:spo2 99 ;
    med:weightKg 48.8 ;
    med:bmi 22.7 .

res:Note_132 a med:ClinicalNote ;
    med:authorName "Dr. Karthik" ;
    med:date "2024-08-27"^^xsd:date ;
    med:noteText "Attends for scheduled follow up. Advised on diet, salt restriction and daily walking." .

res:Rx_100 a med:Prescription ;
    med:prescribes res:Med_Amoxicillin ; med:prescribedBy res:Doc_Karthik ;
    med:forPatient res:Pat_ARJ129 ; med:date "2024-08-27"^^xsd:date ;
    med:dosage "1 tablet" ;
    med:frequency "Once daily" ;
    med:durationDays 7 ;
    med:dispensed true ;
    med:status "Completed" .

res:Rx_101 a med:Prescription ;
    med:prescribes res:Med_Nitrofurantoin ; med:prescribedBy res:Doc_Karthik ;
    med:forPatient res:Pat_ARJ129 ; med:date "2024-08-27"^^xsd:date ;
    med:dosage "1 dose" ;
    med:frequency "Once daily at night" ;
    med:durationDays 10 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_132 med:issuedPrescription res:Rx_100 , res:Rx_101 .
res:Pat_ARJ129 med:hasPrescription res:Rx_100 , res:Rx_101 .

res:Lab_65 a med:LabOrder ;
    med:analyte "Urine WBC" ; med:forPatient res:Pat_ARJ129 ;
    med:date "2024-08-27"^^xsd:date ; med:orderedBy res:Doc_Karthik ;
    med:testsFor res:UrinaryTractInfection ;
    med:orderStatus "Resulted" ;
    med:hasResult res:Res_65 .

res:Res_65 a med:LabResult ;
    med:analyte "Urine WBC" ; med:value 42.16 ; med:unit "/hpf" ;
    med:refLow 0 ; med:refHigh 5 ; med:outOfRange true ;
    med:date "2024-08-28"^^xsd:date ;
    med:performedBy res:Tech_Mohan .

res:Enc_132 med:orderedTest res:Lab_65 .

res:Inv_98 a med:Invoice ;
    med:forPatient res:Pat_ARJ129 ; med:date "2024-08-27"^^xsd:date ;
    med:amount 9961 ; med:paid true ;
    med:status "Settled" .
res:Inv_98 med:coveredBy res:Policy_ARJ129 .
res:Pat_ARJ129 med:hasInvoice res:Inv_98 .

res:Enc_133 a med:Consultation ;
    med:encounterOf res:Pat_ARJ129 ; med:date "2026-08-30"^^xsd:date ;
    med:time "08:15" ;
    med:attendedBy res:Doc_Suresh ; med:inDepartment res:Dept_GeneralMedicine ;
    med:reason "Review of urinary tract infection" ;
    med:outcome "Treatment continued" ;
    med:recordedCondition res:Cond_91 ;
    med:hasVitals res:Vit_133 ; med:hasNote res:Note_133 .

res:Vit_133 a med:VitalSigns ;
    med:systolic 132 ; med:diastolic 75 ;
    med:heartRate 93 ; med:temperature 97.3 ;
    med:spo2 100 ;
    med:weightKg 52.5 ;
    med:bmi 24.3 .

res:Note_133 a med:ClinicalNote ;
    med:authorName "Dr. Suresh" ;
    med:date "2026-08-30"^^xsd:date ;
    med:noteText "Attends for scheduled follow up. Dose adjusted, repeat bloods before next visit." .

res:Lab_66 a med:LabOrder ;
    med:analyte "Urine WBC" ; med:forPatient res:Pat_ARJ129 ;
    med:date "2026-08-30"^^xsd:date ; med:orderedBy res:Doc_Suresh ;
    med:testsFor res:UrinaryTractInfection ;
    med:orderStatus "Pending" .

res:Enc_133 med:orderedTest res:Lab_66 .

res:Inv_99 a med:Invoice ;
    med:forPatient res:Pat_ARJ129 ; med:date "2026-08-30"^^xsd:date ;
    med:amount 1240 ; med:paid true ;
    med:status "Settled" .
res:Inv_99 med:coveredBy res:Policy_ARJ129 .
res:Pat_ARJ129 med:hasInvoice res:Inv_99 .

res:Policy_ARJ129 a med:InsurancePolicy ;
    med:policyNumber "NE-374132" ;
    med:issuedBy res:Ins_NewIndia ; med:coveragePercent 80 ;
    med:amount 500000 .
res:Pat_ARJ129 med:hasPolicy res:Policy_ARJ129 .

res:Pat_ARJ129 med:assignedBed res:Bed_14 .

res:Pat_GOP130 a med:OutPatient ;
    med:name "Gopal Prabhu" ; med:mrn "MRN-GOP130" ; med:photoInitials "GP" ;
    med:sex "Male" ; med:dateOfBirth "1961-08-23"^^xsd:date ; med:age 65 ;
    med:bloodGroup "O-" ; med:phone "+91 91134 503920" ; med:email "gopal.prabhu@example.in" ;
    med:address "27 Gandhi Nagar 2nd Cross, Tambaram, Chennai" ;
    med:primaryPhysician res:Doc_Leela ;
    med:hasCondition res:Cond_93 , res:Cond_94 , res:Cond_95 , res:Cond_96 .

res:Cond_93 a med:Condition ;
    med:ofDisease res:Depression ; med:onsetDate "2017-03-31"^^xsd:date ;
    med:severity "Moderate" ;
    med:clinicalStatus "Active" ;
    med:diagnosedBy res:Doc_Leela .

res:Cond_94 a med:Condition ;
    med:ofDisease res:AnxietyDisorder ; med:onsetDate "2025-05-22"^^xsd:date ;
    med:severity "Moderate" ;
    med:clinicalStatus "Active" ;
    med:diagnosedBy res:Doc_Leela .

res:Cond_95 a med:Condition ;
    med:ofDisease res:Migraine ; med:onsetDate "2025-09-18"^^xsd:date ;
    med:severity "Moderate" ;
    med:clinicalStatus "Resolved" ;
    med:resolvedDate "2026-02-20"^^xsd:date ;
    med:diagnosedBy res:Doc_Priya .

res:Cond_96 a med:Condition ;
    med:ofDisease res:UrinaryTractInfection ; med:onsetDate "2026-08-12"^^xsd:date ;
    med:severity "Mild" ;
    med:clinicalStatus "Active" ;
    med:diagnosedBy res:Doc_Suresh .

res:Pat_GOP130 med:hasEncounter res:Enc_134 , res:Enc_135 , res:Enc_136 , res:Enc_137 .

res:Enc_134 a med:Consultation ;
    med:encounterOf res:Pat_GOP130 ; med:date "2023-08-19"^^xsd:date ;
    med:time "13:15" ;
    med:attendedBy res:Doc_Leela ; med:inDepartment res:Dept_Psychiatry ;
    med:reason "First presentation" ;
    med:outcome "Referred for tests" ;
    med:recordedCondition res:Cond_93 ;
    med:hasVitals res:Vit_134 ; med:hasNote res:Note_134 .

res:Vit_134 a med:VitalSigns ;
    med:systolic 122 ; med:diastolic 70 ;
    med:heartRate 85 ; med:temperature 97.9 ;
    med:spo2 96 ;
    med:weightKg 61.9 ;
    med:bmi 21.8 .

res:Note_134 a med:ClinicalNote ;
    med:authorName "Dr. Leela" ;
    med:date "2023-08-19"^^xsd:date ;
    med:noteText "Routine review, no new complaints. Investigations ordered, will call with results." .

res:Inv_100 a med:Invoice ;
    med:forPatient res:Pat_GOP130 ; med:date "2023-08-19"^^xsd:date ;
    med:amount 5554 ; med:paid true ;
    med:status "Settled" .
res:Inv_100 med:coveredBy res:Policy_GOP130 .
res:Pat_GOP130 med:hasInvoice res:Inv_100 .

res:Enc_135 a med:Consultation ;
    med:encounterOf res:Pat_GOP130 ; med:date "2024-08-11"^^xsd:date ;
    med:time "17:45" ;
    med:attendedBy res:Doc_Joseph ; med:inDepartment res:Dept_Neurology ;
    med:reason "Review of migraine" ;
    med:outcome "Discharged with advice" ;
    med:recordedCondition res:Cond_95 ;
    med:hasVitals res:Vit_135 ; med:hasNote res:Note_135 .

res:Vit_135 a med:VitalSigns ;
    med:systolic 114 ; med:diastolic 80 ;
    med:heartRate 65 ; med:temperature 100.3 ;
    med:spo2 98 ;
    med:weightKg 49.4 ;
    med:bmi 19.2 .

res:Note_135 a med:ClinicalNote ;
    med:authorName "Dr. Joseph" ;
    med:date "2024-08-11"^^xsd:date ;
    med:noteText "Attends for scheduled follow up. Counselled on medication adherence. Red flag symptoms explained." .

res:Rx_102 a med:Prescription ;
    med:prescribes res:Med_Ibuprofen ; med:prescribedBy res:Doc_Joseph ;
    med:forPatient res:Pat_GOP130 ; med:date "2024-08-11"^^xsd:date ;
    med:dosage "1 dose" ;
    med:frequency "Once daily" ;
    med:durationDays 7 ;
    med:dispensed true ;
    med:status "Completed" .

res:Rx_103 a med:Prescription ;
    med:prescribes res:Med_Paracetamol ; med:prescribedBy res:Doc_Joseph ;
    med:forPatient res:Pat_GOP130 ; med:date "2024-08-11"^^xsd:date ;
    med:dosage "2 tablets" ;
    med:frequency "Once daily" ;
    med:durationDays 14 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_135 med:issuedPrescription res:Rx_102 , res:Rx_103 .
res:Pat_GOP130 med:hasPrescription res:Rx_102 , res:Rx_103 .

res:Enc_136 a med:Admission ;
    med:encounterOf res:Pat_GOP130 ; med:date "2025-08-31"^^xsd:date ;
    med:time "18:30" ;
    med:attendedBy res:Doc_Priya ; med:inDepartment res:Dept_Neurology ;
    med:reason "Review of migraine" ;
    med:outcome "Admitted to ward" ;
    med:lengthOfStay 4 ;
    med:recordedCondition res:Cond_95 ;
    med:hasVitals res:Vit_136 ; med:hasNote res:Note_136 .

res:Vit_136 a med:VitalSigns ;
    med:systolic 132 ; med:diastolic 73 ;
    med:heartRate 104 ; med:temperature 99.4 ;
    med:spo2 100 ;
    med:weightKg 66.5 ;
    med:bmi 20.2 .

res:Note_136 a med:ClinicalNote ;
    med:authorName "Dr. Priya" ;
    med:date "2025-08-31"^^xsd:date ;
    med:noteText "Seen for worsening symptoms over the past week. Continue current therapy, review in three months." .

res:Rx_104 a med:Prescription ;
    med:prescribes res:Med_Ibuprofen ; med:prescribedBy res:Doc_Priya ;
    med:forPatient res:Pat_GOP130 ; med:date "2025-08-31"^^xsd:date ;
    med:dosage "1 dose" ;
    med:frequency "As required" ;
    med:durationDays 7 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_136 med:issuedPrescription res:Rx_104 .
res:Pat_GOP130 med:hasPrescription res:Rx_104 .

res:Enc_137 a med:FollowUp ;
    med:encounterOf res:Pat_GOP130 ; med:date "2026-08-30"^^xsd:date ;
    med:time "15:45" ;
    med:attendedBy res:Doc_Leela ; med:inDepartment res:Dept_Psychiatry ;
    med:reason "Review of anxiety disorder" ;
    med:outcome "Treatment continued" ;
    med:recordedCondition res:Cond_94 ;
    med:hasVitals res:Vit_137 ; med:hasNote res:Note_137 .

res:Vit_137 a med:VitalSigns ;
    med:systolic 117 ; med:diastolic 67 ;
    med:heartRate 98 ; med:temperature 97.6 ;
    med:spo2 97 ;
    med:weightKg 52.4 ;
    med:bmi 23.9 .

res:Note_137 a med:ClinicalNote ;
    med:authorName "Dr. Leela" ;
    med:date "2026-08-30"^^xsd:date ;
    med:noteText "Seen for worsening symptoms over the past week. Reassured. No change to treatment at this stage." .

res:Rx_105 a med:Prescription ;
    med:prescribes res:Med_Sertraline ; med:prescribedBy res:Doc_Leela ;
    med:forPatient res:Pat_GOP130 ; med:date "2026-08-30"^^xsd:date ;
    med:dosage "1 tablet" ;
    med:frequency "Twice daily" ;
    med:durationDays 14 ;
    med:dispensed false ;
    med:status "Completed" .

res:Enc_137 med:issuedPrescription res:Rx_105 .
res:Pat_GOP130 med:hasPrescription res:Rx_105 .

res:Inv_101 a med:Invoice ;
    med:forPatient res:Pat_GOP130 ; med:date "2026-08-30"^^xsd:date ;
    med:amount 3187 ; med:paid true ;
    med:status "Settled" .
res:Inv_101 med:coveredBy res:Policy_GOP130 .
res:Pat_GOP130 med:hasInvoice res:Inv_101 .

res:Policy_GOP130 a med:InsurancePolicy ;
    med:policyNumber "ST-278636" ;
    med:issuedBy res:Ins_StarHealth ; med:coveragePercent 90 ;
    med:amount 1000000 .
res:Pat_GOP130 med:hasPolicy res:Policy_GOP130 .

res:Appt_18 a med:Appointment ;
    med:forPatient res:Pat_GOP130 ; med:appointmentWith res:Doc_Leela ;
    med:date "2026-09-22"^^xsd:date ;
    med:time "14:00" ;
    med:inDepartment res:Dept_Psychiatry ;
    med:status "Scheduled" .
res:Pat_GOP130 med:hasAppointment res:Appt_18 .

res:Pat_SNE131 a med:OutPatient ;
    med:name "Sneha Raghavan" ; med:mrn "MRN-SNE131" ; med:photoInitials "SR" ;
    med:sex "Female" ; med:dateOfBirth "1989-04-19"^^xsd:date ; med:age 37 ;
    med:bloodGroup "AB+" ; med:phone "+91 92598 359530" ; med:email "sneha.raghavan@example.in" ;
    med:address "52 GST Road, Sholinganallur, Chennai" ;
    med:primaryPhysician res:Doc_Nithya ;
    med:hasCondition res:Cond_97 , res:Cond_98 , res:Cond_99 , res:Cond_100 .

res:Cond_97 a med:Condition ;
    med:ofDisease res:TypeIIDiabetes ; med:onsetDate "2019-05-18"^^xsd:date ;
    med:severity "Mild" ;
    med:clinicalStatus "Active" ;
    med:diagnosedBy res:Doc_Nithya .

res:Cond_98 a med:Condition ;
    med:ofDisease res:Hypertension ; med:onsetDate "2018-01-02"^^xsd:date ;
    med:severity "Moderate" ;
    med:clinicalStatus "Active" ;
    med:diagnosedBy res:Doc_Ramesh .

res:Cond_99 a med:Condition ;
    med:ofDisease res:ChronicKidneyDisease ; med:onsetDate "2024-09-16"^^xsd:date ;
    med:severity "Mild" ;
    med:clinicalStatus "Active" ;
    med:diagnosedBy res:Doc_Vandana .

res:Cond_100 a med:Condition ;
    med:ofDisease res:Pneumonia ; med:onsetDate "2025-06-09"^^xsd:date ;
    med:severity "Moderate" ;
    med:clinicalStatus "Resolved" ;
    med:resolvedDate "2025-12-03"^^xsd:date ;
    med:diagnosedBy res:Doc_Joseph .

res:Pat_SNE131 med:hasEncounter res:Enc_138 , res:Enc_139 , res:Enc_140 , res:Enc_141 , res:Enc_142 , res:Enc_143 .

res:Enc_138 a med:Consultation ;
    med:encounterOf res:Pat_SNE131 ; med:date "2023-04-04"^^xsd:date ;
    med:time "16:15" ;
    med:attendedBy res:Doc_Nithya ; med:inDepartment res:Dept_Endocrinology ;
    med:reason "First presentation" ;
    med:outcome "Referred for tests" ;
    med:recordedCondition res:Cond_97 ;
    med:hasVitals res:Vit_138 ; med:hasNote res:Note_138 .

res:Vit_138 a med:VitalSigns ;
    med:systolic 168 ; med:diastolic 106 ;
    med:heartRate 73 ; med:temperature 99.9 ;
    med:spo2 96 ;
    med:weightKg 73.5 ;
    med:bmi 24.4 .

res:Note_138 a med:ClinicalNote ;
    med:authorName "Dr. Nithya" ;
    med:date "2023-04-04"^^xsd:date ;
    med:noteText "Patient reports steady improvement since last visit. Advised on diet, salt restriction and daily walking." .

res:Inv_102 a med:Invoice ;
    med:forPatient res:Pat_SNE131 ; med:date "2023-04-04"^^xsd:date ;
    med:amount 1431 ; med:paid true ;
    med:status "Settled" .
res:Inv_102 med:coveredBy res:Policy_SNE131 .
res:Pat_SNE131 med:hasInvoice res:Inv_102 .

res:Enc_139 a med:Consultation ;
    med:encounterOf res:Pat_SNE131 ; med:date "2023-12-16"^^xsd:date ;
    med:time "14:00" ;
    med:attendedBy res:Doc_Joseph ; med:inDepartment res:Dept_GeneralMedicine ;
    med:reason "Review of hypertension" ;
    med:outcome "Follow up scheduled" ;
    med:recordedCondition res:Cond_98 ;
    med:hasVitals res:Vit_139 ; med:hasNote res:Note_139 .

res:Vit_139 a med:VitalSigns ;
    med:systolic 174 ; med:diastolic 96 ;
    med:heartRate 63 ; med:temperature 99.4 ;
    med:spo2 96 ;
    med:weightKg 72.9 ;
    med:bmi 26.1 .

res:Note_139 a med:ClinicalNote ;
    med:authorName "Dr. Joseph" ;
    med:date "2023-12-16"^^xsd:date ;
    med:noteText "Seen for worsening symptoms over the past week. Reassured. No change to treatment at this stage." .

res:Rx_106 a med:Prescription ;
    med:prescribes res:Med_Amlodipine ; med:prescribedBy res:Doc_Joseph ;
    med:forPatient res:Pat_SNE131 ; med:date "2023-12-16"^^xsd:date ;
    med:dosage "1 tablet" ;
    med:frequency "Three times daily" ;
    med:durationDays 90 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_139 med:issuedPrescription res:Rx_106 .
res:Pat_SNE131 med:hasPrescription res:Rx_106 .

res:Inv_103 a med:Invoice ;
    med:forPatient res:Pat_SNE131 ; med:date "2023-12-16"^^xsd:date ;
    med:amount 3445 ; med:paid true ;
    med:status "Settled" .
res:Inv_103 med:coveredBy res:Policy_SNE131 .
res:Pat_SNE131 med:hasInvoice res:Inv_103 .

res:Enc_140 a med:Admission ;
    med:encounterOf res:Pat_SNE131 ; med:date "2024-08-26"^^xsd:date ;
    med:time "11:45" ;
    med:attendedBy res:Doc_Sameer ; med:inDepartment res:Dept_Pulmonology ;
    med:reason "Review of pneumonia" ;
    med:outcome "Admitted to ward" ;
    med:lengthOfStay 6 ;
    med:recordedCondition res:Cond_100 ;
    med:hasVitals res:Vit_140 ; med:hasNote res:Note_140 .

res:Vit_140 a med:VitalSigns ;
    med:systolic 157 ; med:diastolic 93 ;
    med:heartRate 67 ; med:temperature 99.1 ;
    med:spo2 99 ;
    med:weightKg 64.4 ;
    med:bmi 25.8 .

res:Note_140 a med:ClinicalNote ;
    med:authorName "Dr. Sameer" ;
    med:date "2024-08-26"^^xsd:date ;
    med:noteText "Attends for scheduled follow up. Reassured. No change to treatment at this stage." .

res:Rx_107 a med:Prescription ;
    med:prescribes res:Med_Amoxicillin ; med:prescribedBy res:Doc_Sameer ;
    med:forPatient res:Pat_SNE131 ; med:date "2024-08-26"^^xsd:date ;
    med:dosage "1 dose" ;
    med:frequency "As required" ;
    med:durationDays 14 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_140 med:issuedPrescription res:Rx_107 .
res:Pat_SNE131 med:hasPrescription res:Rx_107 .

res:Inv_104 a med:Invoice ;
    med:forPatient res:Pat_SNE131 ; med:date "2024-08-26"^^xsd:date ;
    med:amount 224520 ; med:paid true ;
    med:status "Settled" .
res:Inv_104 med:coveredBy res:Policy_SNE131 .
res:Pat_SNE131 med:hasInvoice res:Inv_104 .

res:Enc_141 a med:Consultation ;
    med:encounterOf res:Pat_SNE131 ; med:date "2025-04-24"^^xsd:date ;
    med:time "13:15" ;
    med:attendedBy res:Doc_Nithya ; med:inDepartment res:Dept_Endocrinology ;
    med:reason "Review of type i i diabetes" ;
    med:outcome "Referred for tests" ;
    med:recordedCondition res:Cond_97 ;
    med:hasVitals res:Vit_141 ; med:hasNote res:Note_141 .

res:Vit_141 a med:VitalSigns ;
    med:systolic 151 ; med:diastolic 95 ;
    med:heartRate 78 ; med:temperature 99.9 ;
    med:spo2 97 ;
    med:weightKg 50.8 ;
    med:bmi 19.4 .

res:Note_141 a med:ClinicalNote ;
    med:authorName "Dr. Nithya" ;
    med:date "2025-04-24"^^xsd:date ;
    med:noteText "Referred from general medicine for specialist opinion. Reassured. No change to treatment at this stage." .

res:Rx_108 a med:Prescription ;
    med:prescribes res:Med_Glimepiride ; med:prescribedBy res:Doc_Nithya ;
    med:forPatient res:Pat_SNE131 ; med:date "2025-04-24"^^xsd:date ;
    med:dosage "1 tablet" ;
    med:frequency "Once daily" ;
    med:durationDays 60 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_141 med:issuedPrescription res:Rx_108 .
res:Pat_SNE131 med:hasPrescription res:Rx_108 .

res:Inv_105 a med:Invoice ;
    med:forPatient res:Pat_SNE131 ; med:date "2025-04-24"^^xsd:date ;
    med:amount 4590 ; med:paid true ;
    med:status "Settled" .
res:Inv_105 med:coveredBy res:Policy_SNE131 .
res:Pat_SNE131 med:hasInvoice res:Inv_105 .

res:Enc_142 a med:Admission ;
    med:encounterOf res:Pat_SNE131 ; med:date "2025-12-31"^^xsd:date ;
    med:time "11:00" ;
    med:attendedBy res:Doc_Vandana ; med:inDepartment res:Dept_Nephrology ;
    med:reason "Review of chronic kidney disease" ;
    med:outcome "Admitted to ward" ;
    med:lengthOfStay 3 ;
    med:recordedCondition res:Cond_99 ;
    med:hasVitals res:Vit_142 ; med:hasNote res:Note_142 .

res:Vit_142 a med:VitalSigns ;
    med:systolic 173 ; med:diastolic 88 ;
    med:heartRate 104 ; med:temperature 98.3 ;
    med:spo2 99 ;
    med:weightKg 60.5 ;
    med:bmi 21.9 .

res:Note_142 a med:ClinicalNote ;
    med:authorName "Dr. Vandana" ;
    med:date "2025-12-31"^^xsd:date ;
    med:noteText "Seen for worsening symptoms over the past week. Dose adjusted, repeat bloods before next visit." .

res:Rx_109 a med:Prescription ;
    med:prescribes res:Med_Telmisartan ; med:prescribedBy res:Doc_Vandana ;
    med:forPatient res:Pat_SNE131 ; med:date "2025-12-31"^^xsd:date ;
    med:dosage "1 dose" ;
    med:frequency "Once daily" ;
    med:durationDays 90 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_142 med:issuedPrescription res:Rx_109 .
res:Pat_SNE131 med:hasPrescription res:Rx_109 .

res:Inv_106 a med:Invoice ;
    med:forPatient res:Pat_SNE131 ; med:date "2025-12-31"^^xsd:date ;
    med:amount 254789 ; med:paid true ;
    med:status "Settled" .
res:Inv_106 med:coveredBy res:Policy_SNE131 .
res:Pat_SNE131 med:hasInvoice res:Inv_106 .

res:Enc_143 a med:Screening ;
    med:encounterOf res:Pat_SNE131 ; med:date "2026-08-30"^^xsd:date ;
    med:time "13:00" ;
    med:attendedBy res:Doc_Suresh ; med:inDepartment res:Dept_GeneralMedicine ;
    med:reason "Review of hypertension" ;
    med:outcome "Follow up scheduled" ;
    med:recordedCondition res:Cond_98 ;
    med:hasVitals res:Vit_143 ; med:hasNote res:Note_143 .

res:Vit_143 a med:VitalSigns ;
    med:systolic 161 ; med:diastolic 92 ;
    med:heartRate 81 ; med:temperature 98.2 ;
    med:spo2 96 ;
    med:weightKg 57.1 ;
    med:bmi 21.7 .

res:Note_143 a med:ClinicalNote ;
    med:authorName "Dr. Suresh" ;
    med:date "2026-08-30"^^xsd:date ;
    med:noteText "Reviewed in clinic today. Continue current therapy, review in three months." .

res:Rx_110 a med:Prescription ;
    med:prescribes res:Med_Amlodipine ; med:prescribedBy res:Doc_Suresh ;
    med:forPatient res:Pat_SNE131 ; med:date "2026-08-30"^^xsd:date ;
    med:dosage "2 tablets" ;
    med:frequency "Once daily" ;
    med:durationDays 60 ;
    med:dispensed true ;
    med:status "Active" .

res:Enc_143 med:issuedPrescription res:Rx_110 .
res:Pat_SNE131 med:hasPrescription res:Rx_110 .

res:Inv_107 a med:Invoice ;
    med:forPatient res:Pat_SNE131 ; med:date "2026-08-30"^^xsd:date ;
    med:amount 2354 ; med:paid false ;
    med:status "Insurance claim pending" .
res:Inv_107 med:coveredBy res:Policy_SNE131 .
res:Pat_SNE131 med:hasInvoice res:Inv_107 .

res:Policy_SNE131 a med:InsurancePolicy ;
    med:policyNumber "ST-643598" ;
    med:issuedBy res:Ins_StarHealth ; med:coveragePercent 60 ;
    med:amount 300000 .
res:Pat_SNE131 med:hasPolicy res:Policy_SNE131 .

res:Appt_19 a med:Appointment ;
    med:forPatient res:Pat_SNE131 ; med:appointmentWith res:Doc_Nithya ;
    med:date "2026-09-27"^^xsd:date ;
    med:time "17:20" ;
    med:inDepartment res:Dept_Endocrinology ;
    med:status "Scheduled" .
res:Pat_SNE131 med:hasAppointment res:Appt_19 .

res:Pat_DIN132 a med:OutPatient ;
    med:name "Dinesh Kumar" ; med:mrn "MRN-DIN132" ; med:photoInitials "DK" ;
    med:sex "Male" ; med:dateOfBirth "2019-01-18"^^xsd:date ; med:age 7 ;
    med:bloodGroup "A+" ; med:phone "+91 99605 252240" ; med:email "dinesh.kumar@example.in" ;
    med:address "28 Gandhi Nagar 2nd Cross, Medavakkam, Chennai" ;
    med:primaryPhysician res:Doc_Joseph ;
    med:hasCondition res:Cond_101 , res:Cond_102 , res:Cond_103 .

res:Cond_101 a med:Condition ;
    med:ofDisease res:Migraine ; med:onsetDate "2026-04-22"^^xsd:date ;
    med:severity "Mild" ;
    med:clinicalStatus "Active" ;
    med:diagnosedBy res:Doc_Priya .

res:Cond_102 a med:Condition ;
    med:ofDisease res:Depression ; med:onsetDate "2025-10-19"^^xsd:date ;
    med:severity "Moderate" ;
    med:clinicalStatus "Active" ;
    med:diagnosedBy res:Doc_Leela .

res:Cond_103 a med:Condition ;
    med:ofDisease res:UrinaryTractInfection ; med:onsetDate "2025-07-16"^^xsd:date ;
    med:severity "Moderate" ;
    med:clinicalStatus "Resolved" ;
    med:resolvedDate "2026-01-01"^^xsd:date ;
    med:diagnosedBy res:Doc_Joseph .

res:Pat_DIN132 med:hasEncounter res:Enc_144 , res:Enc_145 .

res:Enc_144 a med:EmergencyVisit ;
    med:encounterOf res:Pat_DIN132 ; med:date "2024-08-24"^^xsd:date ;
    med:time "15:45" ;
    med:attendedBy res:Doc_Karthik ; med:inDepartment res:Dept_Emergency ;
    med:reason "Acute presentation" ;
    med:outcome "Treatment continued" ;
    med:recordedCondition res:Cond_102 ;
    med:hasVitals res:Vit_144 ; med:hasNote res:Note_144 .

res:Vit_144 a med:VitalSigns ;
    med:systolic 120 ; med:diastolic 70 ;
    med:heartRate 88 ; med:temperature 97.9 ;
    med:spo2 96 ;
    med:weightKg 59.0 ;
    med:bmi 23.7 .

res:Note_144 a med:ClinicalNote ;
    med:authorName "Dr. Karthik" ;
    med:date "2024-08-24"^^xsd:date ;
    med:noteText "Referred from general medicine for specialist opinion. Reassured. No change to treatment at this stage." .

res:Rx_111 a med:Prescription ;
    med:prescribes res:Med_Sertraline ; med:prescribedBy res:Doc_Karthik ;
    med:forPatient res:Pat_DIN132 ; med:date "2024-08-24"^^xsd:date ;
    med:dosage "1 tablet" ;
    med:frequency "Once daily" ;
    med:durationDays 90 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_144 med:issuedPrescription res:Rx_111 .
res:Pat_DIN132 med:hasPrescription res:Rx_111 .

res:Inv_108 a med:Invoice ;
    med:forPatient res:Pat_DIN132 ; med:date "2024-08-24"^^xsd:date ;
    med:amount 24518 ; med:paid true ;
    med:status "Settled" .
res:Inv_108 med:coveredBy res:Policy_DIN132 .
res:Pat_DIN132 med:hasInvoice res:Inv_108 .

res:Enc_145 a med:Consultation ;
    med:encounterOf res:Pat_DIN132 ; med:date "2026-08-30"^^xsd:date ;
    med:time "15:15" ;
    med:attendedBy res:Doc_Leela ; med:inDepartment res:Dept_Psychiatry ;
    med:reason "Review of depression" ;
    med:outcome "Follow up scheduled" ;
    med:recordedCondition res:Cond_102 ;
    med:hasVitals res:Vit_145 ; med:hasNote res:Note_145 .

res:Vit_145 a med:VitalSigns ;
    med:systolic 120 ; med:diastolic 67 ;
    med:heartRate 87 ; med:temperature 97.5 ;
    med:spo2 99 ;
    med:weightKg 66.6 ;
    med:bmi 27.7 .

res:Note_145 a med:ClinicalNote ;
    med:authorName "Dr. Leela" ;
    med:date "2026-08-30"^^xsd:date ;
    med:noteText "Referred from general medicine for specialist opinion. Continue current therapy, review in three months." .

res:Rx_112 a med:Prescription ;
    med:prescribes res:Med_Sertraline ; med:prescribedBy res:Doc_Leela ;
    med:forPatient res:Pat_DIN132 ; med:date "2026-08-30"^^xsd:date ;
    med:dosage "1 tablet" ;
    med:frequency "Twice daily" ;
    med:durationDays 90 ;
    med:dispensed false ;
    med:status "Active" .

res:Enc_145 med:issuedPrescription res:Rx_112 .
res:Pat_DIN132 med:hasPrescription res:Rx_112 .

res:Inv_109 a med:Invoice ;
    med:forPatient res:Pat_DIN132 ; med:date "2026-08-30"^^xsd:date ;
    med:amount 1875 ; med:paid true ;
    med:status "Settled" .
res:Inv_109 med:coveredBy res:Policy_DIN132 .
res:Pat_DIN132 med:hasInvoice res:Inv_109 .

res:Policy_DIN132 a med:InsurancePolicy ;
    med:policyNumber "ST-635223" ;
    med:issuedBy res:Ins_StarHealth ; med:coveragePercent 85 ;
    med:amount 500000 .
res:Pat_DIN132 med:hasPolicy res:Policy_DIN132 .

res:Pat_SAT133 a med:InPatient ;
    med:name "Sathish Verma" ; med:mrn "MRN-SAT133" ; med:photoInitials "SV" ;
    med:sex "Male" ; med:dateOfBirth "1962-02-13"^^xsd:date ; med:age 64 ;
    med:bloodGroup "O-" ; med:phone "+91 99785 491076" ; med:email "sathish.verma@example.in" ;
    med:address "50 ECR, Thoraipakkam, Chennai" ;
    med:primaryPhysician res:Doc_Leela ;
    med:hasCondition res:Cond_104 , res:Cond_105 , res:Cond_106 .

res:Cond_104 a med:Condition ;
    med:ofDisease res:Depression ; med:onsetDate "2022-10-02"^^xsd:date ;
    med:severity "Moderate" ;
    med:clinicalStatus "Active" ;
    med:diagnosedBy res:Doc_Leela .

res:Cond_105 a med:Condition ;
    med:ofDisease res:Hypothyroidism ; med:onsetDate "2017-05-25"^^xsd:date ;
    med:severity "Moderate" ;
    med:clinicalStatus "Active" ;
    med:diagnosedBy res:Doc_Nithya .

res:Cond_106 a med:Condition ;
    med:ofDisease res:Pneumonia ; med:onsetDate "2026-06-20"^^xsd:date ;
    med:severity "Moderate" ;
    med:clinicalStatus "Resolved" ;
    med:resolvedDate "2026-08-16"^^xsd:date ;
    med:diagnosedBy res:Doc_Sameer .

res:Pat_SAT133 med:hasEncounter res:Enc_146 , res:Enc_147 , res:Enc_148 , res:Enc_149 .

res:Enc_146 a med:EmergencyVisit ;
    med:encounterOf res:Pat_SAT133 ; med:date "2023-08-02"^^xsd:date ;
    med:time "10:30" ;
    med:attendedBy res:Doc_Karthik ; med:inDepartment res:Dept_Emergency ;
    med:reason "Acute presentation" ;
    med:outcome "Follow up scheduled" ;
    med:recordedCondition res:Cond_104 ;
    med:hasVitals res:Vit_146 ; med:hasNote res:Note_146 .

res:Vit_146 a med:VitalSigns ;
    med:systolic 131 ; med:diastolic 67 ;
    med:heartRate 73 ; med:temperature 98.0 ;
    med:spo2 100 ;
    med:weightKg 73.4 ;
    med:bmi 27.2 .

res:Note_146 a med:ClinicalNote ;
    med:authorName "Dr. Karthik" ;
    med:date "2023-08-02"^^xsd:date ;
    med:noteText "Seen for worsening symptoms over the past week. Investigations ordered, will call with results." .

res:Rx_113 a med:Prescription ;
    med:prescribes res:Med_Sertraline ; med:prescribedBy res:Doc_Karthik ;
    med:forPatient res:Pat_SAT133 ; med:date "2023-08-02"^^xsd:date ;
    med:dosage "2 tablets" ;
    med:frequency "Once daily at night" ;
    med:durationDays 90 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_146 med:issuedPrescription res:Rx_113 .
res:Pat_SAT133 med:hasPrescription res:Rx_113 .

res:Inv_110 a med:Invoice ;
    med:forPatient res:Pat_SAT133 ; med:date "2023-08-02"^^xsd:date ;
    med:amount 20389 ; med:paid true ;
    med:status "Settled" .
res:Inv_110 med:coveredBy res:Policy_SAT133 .
res:Pat_SAT133 med:hasInvoice res:Inv_110 .

res:Enc_147 a med:EmergencyVisit ;
    med:encounterOf res:Pat_SAT133 ; med:date "2024-08-06"^^xsd:date ;
    med:time "13:45" ;
    med:attendedBy res:Doc_Karthik ; med:inDepartment res:Dept_Emergency ;
    med:reason "Acute presentation" ;
    med:outcome "Follow up scheduled" ;
    med:recordedCondition res:Cond_104 ;
    med:hasVitals res:Vit_147 ; med:hasNote res:Note_147 .

res:Vit_147 a med:VitalSigns ;
    med:systolic 132 ; med:diastolic 79 ;
    med:heartRate 90 ; med:temperature 99.1 ;
    med:spo2 100 ;
    med:weightKg 63.6 ;
    med:bmi 27.5 .

res:Note_147 a med:ClinicalNote ;
    med:authorName "Dr. Karthik" ;
    med:date "2024-08-06"^^xsd:date ;
    med:noteText "Presents with a two day history of symptoms. Referral raised to the relevant specialty." .

res:Rx_114 a med:Prescription ;
    med:prescribes res:Med_Sertraline ; med:prescribedBy res:Doc_Karthik ;
    med:forPatient res:Pat_SAT133 ; med:date "2024-08-06"^^xsd:date ;
    med:dosage "1 dose" ;
    med:frequency "As required" ;
    med:durationDays 60 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_147 med:issuedPrescription res:Rx_114 .
res:Pat_SAT133 med:hasPrescription res:Rx_114 .

res:Enc_148 a med:FollowUp ;
    med:encounterOf res:Pat_SAT133 ; med:date "2025-09-05"^^xsd:date ;
    med:time "09:45" ;
    med:attendedBy res:Doc_Leela ; med:inDepartment res:Dept_Psychiatry ;
    med:reason "Review of depression" ;
    med:outcome "Referred for tests" ;
    med:recordedCondition res:Cond_104 ;
    med:hasVitals res:Vit_148 ; med:hasNote res:Note_148 .

res:Vit_148 a med:VitalSigns ;
    med:systolic 120 ; med:diastolic 73 ;
    med:heartRate 100 ; med:temperature 97.8 ;
    med:spo2 96 ;
    med:weightKg 55.7 ;
    med:bmi 21.4 .

res:Note_148 a med:ClinicalNote ;
    med:authorName "Dr. Leela" ;
    med:date "2025-09-05"^^xsd:date ;
    med:noteText "Reviewed in clinic today. Continue current therapy, review in three months." .

res:Inv_111 a med:Invoice ;
    med:forPatient res:Pat_SAT133 ; med:date "2025-09-05"^^xsd:date ;
    med:amount 1865 ; med:paid true ;
    med:status "Settled" .
res:Inv_111 med:coveredBy res:Policy_SAT133 .
res:Pat_SAT133 med:hasInvoice res:Inv_111 .

res:Enc_149 a med:Consultation ;
    med:encounterOf res:Pat_SAT133 ; med:date "2026-08-21"^^xsd:date ;
    med:time "14:45" ;
    med:attendedBy res:Doc_Joseph ; med:inDepartment res:Dept_Pulmonology ;
    med:reason "Review of pneumonia" ;
    med:outcome "Discharged with advice" ;
    med:recordedCondition res:Cond_106 ;
    med:hasVitals res:Vit_149 ; med:hasNote res:Note_149 .

res:Vit_149 a med:VitalSigns ;
    med:systolic 124 ; med:diastolic 69 ;
    med:heartRate 70 ; med:temperature 100.3 ;
    med:spo2 96 ;
    med:weightKg 64.7 ;
    med:bmi 25.0 .

res:Note_149 a med:ClinicalNote ;
    med:authorName "Dr. Joseph" ;
    med:date "2026-08-21"^^xsd:date ;
    med:noteText "Patient reports steady improvement since last visit. Dose adjusted, repeat bloods before next visit." .

res:Rx_115 a med:Prescription ;
    med:prescribes res:Med_Azithromycin ; med:prescribedBy res:Doc_Joseph ;
    med:forPatient res:Pat_SAT133 ; med:date "2026-08-21"^^xsd:date ;
    med:dosage "1 tablet" ;
    med:frequency "Twice daily" ;
    med:durationDays 7 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_149 med:issuedPrescription res:Rx_115 .
res:Pat_SAT133 med:hasPrescription res:Rx_115 .

res:Inv_112 a med:Invoice ;
    med:forPatient res:Pat_SAT133 ; med:date "2026-08-21"^^xsd:date ;
    med:amount 2358 ; med:paid false ;
    med:status "Insurance claim pending" .
res:Inv_112 med:coveredBy res:Policy_SAT133 .
res:Pat_SAT133 med:hasInvoice res:Inv_112 .

res:Policy_SAT133 a med:InsurancePolicy ;
    med:policyNumber "ST-710504" ;
    med:issuedBy res:Ins_StarHealth ; med:coveragePercent 85 ;
    med:amount 200000 .
res:Pat_SAT133 med:hasPolicy res:Policy_SAT133 .

res:Appt_20 a med:Appointment ;
    med:forPatient res:Pat_SAT133 ; med:appointmentWith res:Doc_Leela ;
    med:date "2026-09-17"^^xsd:date ;
    med:time "12:40" ;
    med:inDepartment res:Dept_Psychiatry ;
    med:status "Scheduled" .
res:Pat_SAT133 med:hasAppointment res:Appt_20 .

res:Pat_SAT133 med:assignedBed res:Bed_8 .

res:Pat_VIM134 a med:OutPatient ;
    med:name "Vimal Shetty" ; med:mrn "MRN-VIM134" ; med:photoInitials "VS" ;
    med:sex "Male" ; med:dateOfBirth "2007-03-11"^^xsd:date ; med:age 19 ;
    med:bloodGroup "A-" ; med:phone "+91 96428 283808" ; med:email "vimal.shetty@example.in" ;
    med:address "7 Velachery Main Road, Guindy, Chennai" ;
    med:primaryPhysician res:Doc_Suresh ;
    med:hasCondition res:Cond_107 , res:Cond_108 .

res:Cond_107 a med:Condition ;
    med:ofDisease res:UrinaryTractInfection ; med:onsetDate "2024-12-20"^^xsd:date ;
    med:severity "Mild" ;
    med:clinicalStatus "Resolved" ;
    med:resolvedDate "2025-06-09"^^xsd:date ;
    med:diagnosedBy res:Doc_Joseph .

res:Cond_108 a med:Condition ;
    med:ofDisease res:Dengue ; med:onsetDate "2026-01-18"^^xsd:date ;
    med:severity "Moderate" ;
    med:clinicalStatus "Active" ;
    med:diagnosedBy res:Doc_Karthik .

res:Pat_VIM134 med:hasEncounter res:Enc_150 , res:Enc_151 , res:Enc_152 .

res:Enc_150 a med:Consultation ;
    med:encounterOf res:Pat_VIM134 ; med:date "2023-12-14"^^xsd:date ;
    med:time "13:45" ;
    med:attendedBy res:Doc_Joseph ; med:inDepartment res:Dept_GeneralMedicine ;
    med:reason "First presentation" ;
    med:outcome "Discharged with advice" ;
    med:recordedCondition res:Cond_107 ;
    med:hasVitals res:Vit_150 ; med:hasNote res:Note_150 .

res:Vit_150 a med:VitalSigns ;
    med:systolic 133 ; med:diastolic 67 ;
    med:heartRate 98 ; med:temperature 97.3 ;
    med:spo2 99 ;
    med:weightKg 68.1 ;
    med:bmi 24.7 .

res:Note_150 a med:ClinicalNote ;
    med:authorName "Dr. Joseph" ;
    med:date "2023-12-14"^^xsd:date ;
    med:noteText "Patient reports steady improvement since last visit. Counselled on medication adherence. Red flag symptoms explained." .

res:Rx_116 a med:Prescription ;
    med:prescribes res:Med_Amoxicillin ; med:prescribedBy res:Doc_Joseph ;
    med:forPatient res:Pat_VIM134 ; med:date "2023-12-14"^^xsd:date ;
    med:dosage "1 dose" ;
    med:frequency "Twice daily" ;
    med:durationDays 5 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_150 med:issuedPrescription res:Rx_116 .
res:Pat_VIM134 med:hasPrescription res:Rx_116 .

res:Inv_113 a med:Invoice ;
    med:forPatient res:Pat_VIM134 ; med:date "2023-12-14"^^xsd:date ;
    med:amount 1115 ; med:paid true ;
    med:status "Settled" .
res:Inv_113 med:coveredBy res:Policy_VIM134 .
res:Pat_VIM134 med:hasInvoice res:Inv_113 .

res:Enc_151 a med:Consultation ;
    med:encounterOf res:Pat_VIM134 ; med:date "2025-04-16"^^xsd:date ;
    med:time "09:30" ;
    med:attendedBy res:Doc_Karthik ; med:inDepartment res:Dept_GeneralMedicine ;
    med:reason "Review of dengue" ;
    med:outcome "Treatment continued" ;
    med:recordedCondition res:Cond_108 ;
    med:hasVitals res:Vit_151 ; med:hasNote res:Note_151 .

res:Vit_151 a med:VitalSigns ;
    med:systolic 126 ; med:diastolic 71 ;
    med:heartRate 65 ; med:temperature 98.0 ;
    med:spo2 99 ;
    med:weightKg 73.9 ;
    med:bmi 27.6 .

res:Note_151 a med:ClinicalNote ;
    med:authorName "Dr. Karthik" ;
    med:date "2025-04-16"^^xsd:date ;
    med:noteText "Seen for worsening symptoms over the past week. Dose adjusted, repeat bloods before next visit." .

res:Rx_117 a med:Prescription ;
    med:prescribes res:Med_Paracetamol ; med:prescribedBy res:Doc_Karthik ;
    med:forPatient res:Pat_VIM134 ; med:date "2025-04-16"^^xsd:date ;
    med:dosage "1 tablet" ;
    med:frequency "Once daily" ;
    med:durationDays 14 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_151 med:issuedPrescription res:Rx_117 .
res:Pat_VIM134 med:hasPrescription res:Rx_117 .

res:Lab_67 a med:LabOrder ;
    med:analyte "Platelet count" ; med:forPatient res:Pat_VIM134 ;
    med:date "2025-04-16"^^xsd:date ; med:orderedBy res:Doc_Karthik ;
    med:testsFor res:Dengue ;
    med:orderStatus "Resulted" ;
    med:hasResult res:Res_67 .

res:Res_67 a med:LabResult ;
    med:analyte "Platelet count" ; med:value 52 ; med:unit "x10^3/uL" ;
    med:refLow 150 ; med:refHigh 450 ; med:outOfRange true ;
    med:date "2025-04-17"^^xsd:date ;
    med:performedBy res:Tech_Mohan .

res:Enc_151 med:orderedTest res:Lab_67 .

res:Enc_152 a med:FollowUp ;
    med:encounterOf res:Pat_VIM134 ; med:date "2026-08-22"^^xsd:date ;
    med:time "14:00" ;
    med:attendedBy res:Doc_Suresh ; med:inDepartment res:Dept_GeneralMedicine ;
    med:reason "Review of urinary tract infection" ;
    med:outcome "Discharged with advice" ;
    med:recordedCondition res:Cond_107 ;
    med:hasVitals res:Vit_152 ; med:hasNote res:Note_152 .

res:Vit_152 a med:VitalSigns ;
    med:systolic 119 ; med:diastolic 72 ;
    med:heartRate 68 ; med:temperature 99.7 ;
    med:spo2 100 ;
    med:weightKg 48.6 ;
    med:bmi 26.6 .

res:Note_152 a med:ClinicalNote ;
    med:authorName "Dr. Suresh" ;
    med:date "2026-08-22"^^xsd:date ;
    med:noteText "Patient reports steady improvement since last visit. Continue current therapy, review in three months." .

res:Rx_118 a med:Prescription ;
    med:prescribes res:Med_Amoxicillin ; med:prescribedBy res:Doc_Suresh ;
    med:forPatient res:Pat_VIM134 ; med:date "2026-08-22"^^xsd:date ;
    med:dosage "2 tablets" ;
    med:frequency "Once daily" ;
    med:durationDays 10 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_152 med:issuedPrescription res:Rx_118 .
res:Pat_VIM134 med:hasPrescription res:Rx_118 .

res:Lab_68 a med:LabOrder ;
    med:analyte "Urine WBC" ; med:forPatient res:Pat_VIM134 ;
    med:date "2026-08-22"^^xsd:date ; med:orderedBy res:Doc_Suresh ;
    med:testsFor res:UrinaryTractInfection ;
    med:orderStatus "Pending" .

res:Enc_152 med:orderedTest res:Lab_68 .

res:Inv_114 a med:Invoice ;
    med:forPatient res:Pat_VIM134 ; med:date "2026-08-22"^^xsd:date ;
    med:amount 4910 ; med:paid true ;
    med:status "Settled" .
res:Inv_114 med:coveredBy res:Policy_VIM134 .
res:Pat_VIM134 med:hasInvoice res:Inv_114 .

res:Policy_VIM134 a med:InsurancePolicy ;
    med:policyNumber "ST-903804" ;
    med:issuedBy res:Ins_StarHealth ; med:coveragePercent 60 ;
    med:amount 750000 .
res:Pat_VIM134 med:hasPolicy res:Policy_VIM134 .

res:Appt_21 a med:Appointment ;
    med:forPatient res:Pat_VIM134 ; med:appointmentWith res:Doc_Suresh ;
    med:date "2026-09-19"^^xsd:date ;
    med:time "17:20" ;
    med:inDepartment res:Dept_GeneralMedicine ;
    med:status "Scheduled" .
res:Pat_VIM134 med:hasAppointment res:Appt_21 .

res:Pat_SAN135 a med:OutPatient ;
    med:name "Sangeetha Thomas" ; med:mrn "MRN-SAN135" ; med:photoInitials "ST" ;
    med:sex "Female" ; med:dateOfBirth "2002-04-26"^^xsd:date ; med:age 24 ;
    med:bloodGroup "B+" ; med:phone "+91 95658 667276" ; med:email "sangeetha.thomas@example.in" ;
    med:address "43 Rajiv Gandhi Salai, Sholinganallur, Chennai" ;
    med:primaryPhysician res:Doc_Vandana ;
    med:hasCondition res:Cond_109 .

res:Cond_109 a med:Condition ;
    med:ofDisease res:ChronicKidneyDisease ; med:onsetDate "2021-05-18"^^xsd:date ;
    med:severity "Moderate" ;
    med:clinicalStatus "Active" ;
    med:diagnosedBy res:Doc_Vandana .

res:Pat_SAN135 med:hasEncounter res:Enc_153 , res:Enc_154 , res:Enc_155 .

res:Enc_153 a med:Consultation ;
    med:encounterOf res:Pat_SAN135 ; med:date "2023-12-09"^^xsd:date ;
    med:time "16:00" ;
    med:attendedBy res:Doc_Vandana ; med:inDepartment res:Dept_Nephrology ;
    med:reason "First presentation" ;
    med:outcome "Follow up scheduled" ;
    med:recordedCondition res:Cond_109 ;
    med:hasVitals res:Vit_153 ; med:hasNote res:Note_153 .

res:Vit_153 a med:VitalSigns ;
    med:systolic 130 ; med:diastolic 66 ;
    med:heartRate 77 ; med:temperature 99.6 ;
    med:spo2 98 ;
    med:weightKg 63.4 ;
    med:bmi 21.4 .

res:Note_153 a med:ClinicalNote ;
    med:authorName "Dr. Vandana" ;
    med:date "2023-12-09"^^xsd:date ;
    med:noteText "Presents with a two day history of symptoms. Referral raised to the relevant specialty." .

res:Lab_69 a med:LabOrder ;
    med:analyte "Creatinine" ; med:forPatient res:Pat_SAN135 ;
    med:date "2023-12-09"^^xsd:date ; med:orderedBy res:Doc_Vandana ;
    med:testsFor res:ChronicKidneyDisease ;
    med:orderStatus "Resulted" ;
    med:hasResult res:Res_69 .

res:Res_69 a med:LabResult ;
    med:analyte "Creatinine" ; med:value 5.03 ; med:unit "mg/dL" ;
    med:refLow 0.6 ; med:refHigh 1.2 ; med:outOfRange true ;
    med:date "2023-12-10"^^xsd:date ;
    med:performedBy res:Tech_Mohan .

res:Lab_70 a med:LabOrder ;
    med:analyte "eGFR" ; med:forPatient res:Pat_SAN135 ;
    med:date "2023-12-09"^^xsd:date ; med:orderedBy res:Doc_Vandana ;
    med:testsFor res:ChronicKidneyDisease ;
    med:orderStatus "Resulted" ;
    med:hasResult res:Res_70 .

res:Res_70 a med:LabResult ;
    med:analyte "eGFR" ; med:value 20.24 ; med:unit "mL/min" ;
    med:refLow 90 ; med:refHigh 120 ; med:outOfRange true ;
    med:date "2023-12-10"^^xsd:date ;
    med:performedBy res:Tech_Mohan .

res:Enc_153 med:orderedTest res:Lab_69 , res:Lab_70 .

res:Inv_115 a med:Invoice ;
    med:forPatient res:Pat_SAN135 ; med:date "2023-12-09"^^xsd:date ;
    med:amount 3215 ; med:paid true ;
    med:status "Settled" .
res:Inv_115 med:coveredBy res:Policy_SAN135 .
res:Pat_SAN135 med:hasInvoice res:Inv_115 .

res:Enc_154 a med:FollowUp ;
    med:encounterOf res:Pat_SAN135 ; med:date "2025-04-13"^^xsd:date ;
    med:time "16:30" ;
    med:attendedBy res:Doc_Vandana ; med:inDepartment res:Dept_Nephrology ;
    med:reason "Review of chronic kidney disease" ;
    med:outcome "Follow up scheduled" ;
    med:recordedCondition res:Cond_109 ;
    med:hasVitals res:Vit_154 ; med:hasNote res:Note_154 .

res:Vit_154 a med:VitalSigns ;
    med:systolic 116 ; med:diastolic 73 ;
    med:heartRate 64 ; med:temperature 98.0 ;
    med:spo2 97 ;
    med:weightKg 69.5 ;
    med:bmi 19.6 .

res:Note_154 a med:ClinicalNote ;
    med:authorName "Dr. Vandana" ;
    med:date "2025-04-13"^^xsd:date ;
    med:noteText "Attends for scheduled follow up. Continue current therapy, review in three months." .

res:Rx_119 a med:Prescription ;
    med:prescribes res:Med_Telmisartan ; med:prescribedBy res:Doc_Vandana ;
    med:forPatient res:Pat_SAN135 ; med:date "2025-04-13"^^xsd:date ;
    med:dosage "1 dose" ;
    med:frequency "Once daily at night" ;
    med:durationDays 90 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_154 med:issuedPrescription res:Rx_119 .
res:Pat_SAN135 med:hasPrescription res:Rx_119 .

res:Inv_116 a med:Invoice ;
    med:forPatient res:Pat_SAN135 ; med:date "2025-04-13"^^xsd:date ;
    med:amount 2879 ; med:paid true ;
    med:status "Settled" .
res:Inv_116 med:coveredBy res:Policy_SAN135 .
res:Pat_SAN135 med:hasInvoice res:Inv_116 .

res:Enc_155 a med:Consultation ;
    med:encounterOf res:Pat_SAN135 ; med:date "2026-08-30"^^xsd:date ;
    med:time "09:00" ;
    med:attendedBy res:Doc_Vandana ; med:inDepartment res:Dept_Nephrology ;
    med:reason "Review of chronic kidney disease" ;
    med:outcome "Discharged with advice" ;
    med:recordedCondition res:Cond_109 ;
    med:hasVitals res:Vit_155 ; med:hasNote res:Note_155 .

res:Vit_155 a med:VitalSigns ;
    med:systolic 126 ; med:diastolic 76 ;
    med:heartRate 62 ; med:temperature 97.5 ;
    med:spo2 99 ;
    med:weightKg 54.2 ;
    med:bmi 27.2 .

res:Note_155 a med:ClinicalNote ;
    med:authorName "Dr. Vandana" ;
    med:date "2026-08-30"^^xsd:date ;
    med:noteText "Patient reports steady improvement since last visit. Continue current therapy, review in three months." .

res:Inv_117 a med:Invoice ;
    med:forPatient res:Pat_SAN135 ; med:date "2026-08-30"^^xsd:date ;
    med:amount 1386 ; med:paid false ;
    med:status "Insurance claim pending" .
res:Inv_117 med:coveredBy res:Policy_SAN135 .
res:Pat_SAN135 med:hasInvoice res:Inv_117 .

res:Policy_SAN135 a med:InsurancePolicy ;
    med:policyNumber "ST-746976" ;
    med:issuedBy res:Ins_StarHealth ; med:coveragePercent 90 ;
    med:amount 750000 .
res:Pat_SAN135 med:hasPolicy res:Policy_SAN135 .

res:Pat_VAS136 a med:InPatient ;
    med:name "Vasanthi Joseph" ; med:mrn "MRN-VAS136" ; med:photoInitials "VJ" ;
    med:sex "Female" ; med:dateOfBirth "1975-01-18"^^xsd:date ; med:age 51 ;
    med:bloodGroup "AB+" ; med:phone "+91 95791 154495" ; med:email "vasanthi.joseph@example.in" ;
    med:address "15 GST Road, Thoraipakkam, Chennai" ;
    med:primaryPhysician res:Doc_Priya ;
    med:hasCondition res:Cond_110 , res:Cond_111 .

res:Cond_110 a med:Condition ;
    med:ofDisease res:Epilepsy ; med:onsetDate "2019-10-18"^^xsd:date ;
    med:severity "Moderate" ;
    med:clinicalStatus "Active" ;
    med:diagnosedBy res:Doc_Priya .

res:Cond_111 a med:Condition ;
    med:ofDisease res:Hypothyroidism ; med:onsetDate "2026-01-05"^^xsd:date ;
    med:severity "Mild" ;
    med:clinicalStatus "Active" ;
    med:diagnosedBy res:Doc_Nithya .

res:Pat_VAS136 med:hasEncounter res:Enc_156 , res:Enc_157 , res:Enc_158 .

res:Enc_156 a med:Consultation ;
    med:encounterOf res:Pat_VAS136 ; med:date "2023-12-20"^^xsd:date ;
    med:time "10:30" ;
    med:attendedBy res:Doc_Priya ; med:inDepartment res:Dept_Neurology ;
    med:reason "First presentation" ;
    med:outcome "Follow up scheduled" ;
    med:recordedCondition res:Cond_110 ;
    med:hasVitals res:Vit_156 ; med:hasNote res:Note_156 .

res:Vit_156 a med:VitalSigns ;
    med:systolic 110 ; med:diastolic 77 ;
    med:heartRate 80 ; med:temperature 98.3 ;
    med:spo2 96 ;
    med:weightKg 54.7 ;
    med:bmi 25.2 .

res:Note_156 a med:ClinicalNote ;
    med:authorName "Dr. Priya" ;
    med:date "2023-12-20"^^xsd:date ;
    med:noteText "Routine review, no new complaints. Counselled on medication adherence. Red flag symptoms explained." .

res:Rx_120 a med:Prescription ;
    med:prescribes res:Med_Levetiracetam ; med:prescribedBy res:Doc_Priya ;
    med:forPatient res:Pat_VAS136 ; med:date "2023-12-20"^^xsd:date ;
    med:dosage "1 dose" ;
    med:frequency "Once daily at night" ;
    med:durationDays 90 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_156 med:issuedPrescription res:Rx_120 .
res:Pat_VAS136 med:hasPrescription res:Rx_120 .

res:Inv_118 a med:Invoice ;
    med:forPatient res:Pat_VAS136 ; med:date "2023-12-20"^^xsd:date ;
    med:amount 5517 ; med:paid true ;
    med:status "Settled" .
res:Inv_118 med:coveredBy res:Policy_VAS136 .
res:Pat_VAS136 med:hasInvoice res:Inv_118 .

res:Enc_157 a med:FollowUp ;
    med:encounterOf res:Pat_VAS136 ; med:date "2025-04-01"^^xsd:date ;
    med:time "18:15" ;
    med:attendedBy res:Doc_Priya ; med:inDepartment res:Dept_Neurology ;
    med:reason "Review of epilepsy" ;
    med:outcome "Follow up scheduled" ;
    med:recordedCondition res:Cond_110 ;
    med:hasVitals res:Vit_157 ; med:hasNote res:Note_157 .

res:Vit_157 a med:VitalSigns ;
    med:systolic 110 ; med:diastolic 68 ;
    med:heartRate 63 ; med:temperature 98.3 ;
    med:spo2 96 ;
    med:weightKg 53.1 ;
    med:bmi 27.4 .

res:Note_157 a med:ClinicalNote ;
    med:authorName "Dr. Priya" ;
    med:date "2025-04-01"^^xsd:date ;
    med:noteText "Patient reports steady improvement since last visit. Counselled on medication adherence. Red flag symptoms explained." .

res:Rx_121 a med:Prescription ;
    med:prescribes res:Med_Levetiracetam ; med:prescribedBy res:Doc_Priya ;
    med:forPatient res:Pat_VAS136 ; med:date "2025-04-01"^^xsd:date ;
    med:dosage "1 dose" ;
    med:frequency "Twice daily" ;
    med:durationDays 90 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_157 med:issuedPrescription res:Rx_121 .
res:Pat_VAS136 med:hasPrescription res:Rx_121 .

res:Enc_158 a med:Consultation ;
    med:encounterOf res:Pat_VAS136 ; med:date "2026-08-18"^^xsd:date ;
    med:time "14:00" ;
    med:attendedBy res:Doc_Priya ; med:inDepartment res:Dept_Neurology ;
    med:reason "Review of epilepsy" ;
    med:outcome "Treatment continued" ;
    med:recordedCondition res:Cond_110 ;
    med:hasVitals res:Vit_158 ; med:hasNote res:Note_158 .

res:Vit_158 a med:VitalSigns ;
    med:systolic 119 ; med:diastolic 71 ;
    med:heartRate 92 ; med:temperature 97.6 ;
    med:spo2 98 ;
    med:weightKg 61.0 ;
    med:bmi 24.2 .

res:Note_158 a med:ClinicalNote ;
    med:authorName "Dr. Priya" ;
    med:date "2026-08-18"^^xsd:date ;
    med:noteText "Reviewed in clinic today. Investigations ordered, will call with results." .

res:Rx_122 a med:Prescription ;
    med:prescribes res:Med_Levetiracetam ; med:prescribedBy res:Doc_Priya ;
    med:forPatient res:Pat_VAS136 ; med:date "2026-08-18"^^xsd:date ;
    med:dosage "1 tablet" ;
    med:frequency "Twice daily" ;
    med:durationDays 90 ;
    med:dispensed true ;
    med:status "Active" .

res:Enc_158 med:issuedPrescription res:Rx_122 .
res:Pat_VAS136 med:hasPrescription res:Rx_122 .

res:Inv_119 a med:Invoice ;
    med:forPatient res:Pat_VAS136 ; med:date "2026-08-18"^^xsd:date ;
    med:amount 5228 ; med:paid false ;
    med:status "Insurance claim pending" .
res:Inv_119 med:coveredBy res:Policy_VAS136 .
res:Pat_VAS136 med:hasInvoice res:Inv_119 .

res:Policy_VAS136 a med:InsurancePolicy ;
    med:policyNumber "CG-935492" ;
    med:issuedBy res:Ins_CGHS ; med:coveragePercent 85 ;
    med:amount 500000 .
res:Pat_VAS136 med:hasPolicy res:Policy_VAS136 .

res:Pat_VAS136 med:assignedBed res:Bed_11 .

res:Pat_GAN137 a med:InPatient ;
    med:name "Ganesh Rao" ; med:mrn "MRN-GAN137" ; med:photoInitials "GR" ;
    med:sex "Male" ; med:dateOfBirth "1970-07-27"^^xsd:date ; med:age 56 ;
    med:bloodGroup "O+" ; med:phone "+91 96015 355799" ; med:email "ganesh.rao@example.in" ;
    med:address "38 Gandhi Nagar 2nd Cross, Guindy, Chennai" ;
    med:primaryPhysician res:Doc_Farida ;
    med:hasCondition res:Cond_112 , res:Cond_113 , res:Cond_114 , res:Cond_115 , res:Cond_116 .

res:Cond_112 a med:Condition ;
    med:ofDisease res:CoronaryArteryDisease ; med:onsetDate "2024-10-23"^^xsd:date ;
    med:severity "Mild" ;
    med:clinicalStatus "Active" ;
    med:diagnosedBy res:Doc_Farida .

res:Cond_113 a med:Condition ;
    med:ofDisease res:Hypertension ; med:onsetDate "2023-09-12"^^xsd:date ;
    med:severity "Moderate" ;
    med:clinicalStatus "Active" ;
    med:diagnosedBy res:Doc_Joseph .

res:Cond_114 a med:Condition , med:CriticalCondition ;
    med:ofDisease res:MyocardialInfarction ; med:onsetDate "2025-03-26"^^xsd:date ;
    med:severity "Severe" ;
    med:clinicalStatus "Active" ;
    med:diagnosedBy res:Doc_Ramesh .

res:Cond_115 a med:Condition ;
    med:ofDisease res:HeartFailure ; med:onsetDate "2018-03-31"^^xsd:date ;
    med:severity "Moderate" ;
    med:clinicalStatus "Active" ;
    med:diagnosedBy res:Doc_Ramesh .

res:Cond_116 a med:Condition ;
    med:ofDisease res:ChronicKidneyDisease ; med:onsetDate "2018-03-18"^^xsd:date ;
    med:severity "Moderate" ;
    med:clinicalStatus "Active" ;
    med:diagnosedBy res:Doc_Vandana .

res:Pat_GAN137 med:hasEncounter res:Enc_159 , res:Enc_160 , res:Enc_161 , res:Enc_162 , res:Enc_163 , res:Enc_164 , res:Enc_165 .

res:Enc_159 a med:Consultation ;
    med:encounterOf res:Pat_GAN137 ; med:date "2023-03-08"^^xsd:date ;
    med:time "10:00" ;
    med:attendedBy res:Doc_Ramesh ; med:inDepartment res:Dept_Cardiology ;
    med:reason "First presentation" ;
    med:outcome "Follow up scheduled" ;
    med:recordedCondition res:Cond_114 ;
    med:hasVitals res:Vit_159 ; med:hasNote res:Note_159 .

res:Vit_159 a med:VitalSigns ;
    med:systolic 155 ; med:diastolic 93 ;
    med:heartRate 64 ; med:temperature 97.9 ;
    med:spo2 98 ;
    med:weightKg 60.2 ;
    med:bmi 23.7 .

res:Note_159 a med:ClinicalNote ;
    med:authorName "Dr. Ramesh" ;
    med:date "2023-03-08"^^xsd:date ;
    med:noteText "Routine review, no new complaints. Advised on diet, salt restriction and daily walking." .

res:Rx_123 a med:Prescription ;
    med:prescribes res:Med_Aspirin ; med:prescribedBy res:Doc_Ramesh ;
    med:forPatient res:Pat_GAN137 ; med:date "2023-03-08"^^xsd:date ;
    med:dosage "1 tablet" ;
    med:frequency "Twice daily" ;
    med:durationDays 14 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_159 med:issuedPrescription res:Rx_123 .
res:Pat_GAN137 med:hasPrescription res:Rx_123 .

res:Lab_71 a med:LabOrder ;
    med:analyte "Troponin I" ; med:forPatient res:Pat_GAN137 ;
    med:date "2023-03-08"^^xsd:date ; med:orderedBy res:Doc_Ramesh ;
    med:testsFor res:MyocardialInfarction ;
    med:orderStatus "Resulted" ;
    med:hasResult res:Res_71 .

res:Res_71 a med:LabResult ;
    med:analyte "Troponin I" ; med:value 8.42 ; med:unit "ng/mL" ;
    med:refLow 0 ; med:refHigh 0.04 ; med:outOfRange true ;
    med:date "2023-03-09"^^xsd:date ;
    med:performedBy res:Tech_Mohan .

res:Enc_159 med:orderedTest res:Lab_71 .

res:Inv_120 a med:Invoice ;
    med:forPatient res:Pat_GAN137 ; med:date "2023-03-08"^^xsd:date ;
    med:amount 5723 ; med:paid true ;
    med:status "Settled" .
res:Pat_GAN137 med:hasInvoice res:Inv_120 .

res:Enc_160 a med:Consultation ;
    med:encounterOf res:Pat_GAN137 ; med:date "2023-10-05"^^xsd:date ;
    med:time "11:00" ;
    med:attendedBy res:Doc_Ramesh ; med:inDepartment res:Dept_Cardiology ;
    med:reason "Review of coronary artery disease" ;
    med:outcome "Treatment continued" ;
    med:recordedCondition res:Cond_112 ;
    med:hasVitals res:Vit_160 ; med:hasNote res:Note_160 .

res:Vit_160 a med:VitalSigns ;
    med:systolic 178 ; med:diastolic 106 ;
    med:heartRate 64 ; med:temperature 99.7 ;
    med:spo2 98 ;
    med:weightKg 58.8 ;
    med:bmi 22.9 .

res:Note_160 a med:ClinicalNote ;
    med:authorName "Dr. Ramesh" ;
    med:date "2023-10-05"^^xsd:date ;
    med:noteText "Routine review, no new complaints. Reassured. No change to treatment at this stage." .

res:Rx_124 a med:Prescription ;
    med:prescribes res:Med_Atorvastatin ; med:prescribedBy res:Doc_Ramesh ;
    med:forPatient res:Pat_GAN137 ; med:date "2023-10-05"^^xsd:date ;
    med:dosage "1 tablet" ;
    med:frequency "As required" ;
    med:durationDays 90 ;
    med:dispensed true ;
    med:status "Completed" .

res:Rx_125 a med:Prescription ;
    med:prescribes res:Med_Aspirin ; med:prescribedBy res:Doc_Ramesh ;
    med:forPatient res:Pat_GAN137 ; med:date "2023-10-05"^^xsd:date ;
    med:dosage "2 tablets" ;
    med:frequency "As required" ;
    med:durationDays 90 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_160 med:issuedPrescription res:Rx_124 , res:Rx_125 .
res:Pat_GAN137 med:hasPrescription res:Rx_124 , res:Rx_125 .

res:Lab_72 a med:LabOrder ;
    med:analyte "Troponin I" ; med:forPatient res:Pat_GAN137 ;
    med:date "2023-10-05"^^xsd:date ; med:orderedBy res:Doc_Ramesh ;
    med:testsFor res:CoronaryArteryDisease ;
    med:orderStatus "Resulted" ;
    med:hasResult res:Res_72 .

res:Res_72 a med:LabResult ;
    med:analyte "Troponin I" ; med:value 4.22 ; med:unit "ng/mL" ;
    med:refLow 0 ; med:refHigh 0.04 ; med:outOfRange true ;
    med:date "2023-10-06"^^xsd:date ;
    med:performedBy res:Tech_Mohan .

res:Enc_160 med:orderedTest res:Lab_72 .

res:Enc_161 a med:DayCareVisit ;
    med:encounterOf res:Pat_GAN137 ; med:date "2024-04-26"^^xsd:date ;
    med:time "17:00" ;
    med:attendedBy res:Doc_Farida ; med:inDepartment res:Dept_Cardiology ;
    med:reason "Review of heart failure" ;
    med:outcome "Referred for tests" ;
    med:recordedCondition res:Cond_115 ;
    med:hasVitals res:Vit_161 ; med:hasNote res:Note_161 .

res:Vit_161 a med:VitalSigns ;
    med:systolic 152 ; med:diastolic 88 ;
    med:heartRate 74 ; med:temperature 97.6 ;
    med:spo2 97 ;
    med:weightKg 70.4 ;
    med:bmi 20.4 .

res:Note_161 a med:ClinicalNote ;
    med:authorName "Dr. Farida" ;
    med:date "2024-04-26"^^xsd:date ;
    med:noteText "Patient reports steady improvement since last visit. Advised on diet, salt restriction and daily walking." .

res:Lab_73 a med:LabOrder ;
    med:analyte "NT-proBNP" ; med:forPatient res:Pat_GAN137 ;
    med:date "2024-04-26"^^xsd:date ; med:orderedBy res:Doc_Farida ;
    med:testsFor res:HeartFailure ;
    med:orderStatus "Resulted" ;
    med:hasResult res:Res_73 .

res:Res_73 a med:LabResult ;
    med:analyte "NT-proBNP" ; med:value 1358.01 ; med:unit "pg/mL" ;
    med:refLow 0 ; med:refHigh 125 ; med:outOfRange true ;
    med:date "2024-04-27"^^xsd:date ;
    med:performedBy res:Tech_Mohan .

res:Enc_161 med:orderedTest res:Lab_73 .

res:Inv_121 a med:Invoice ;
    med:forPatient res:Pat_GAN137 ; med:date "2024-04-26"^^xsd:date ;
    med:amount 909 ; med:paid true ;
    med:status "Settled" .
res:Pat_GAN137 med:hasInvoice res:Inv_121 .

res:Enc_162 a med:EmergencyVisit ;
    med:encounterOf res:Pat_GAN137 ; med:date "2024-11-16"^^xsd:date ;
    med:time "17:45" ;
    med:attendedBy res:Doc_Karthik ; med:inDepartment res:Dept_Emergency ;
    med:reason "Acute presentation" ;
    med:outcome "Discharged with advice" ;
    med:recordedCondition res:Cond_112 ;
    med:hasVitals res:Vit_162 ; med:hasNote res:Note_162 .

res:Vit_162 a med:VitalSigns ;
    med:systolic 159 ; med:diastolic 92 ;
    med:heartRate 75 ; med:temperature 98.9 ;
    med:spo2 99 ;
    med:weightKg 62.5 ;
    med:bmi 22.6 .

res:Note_162 a med:ClinicalNote ;
    med:authorName "Dr. Karthik" ;
    med:date "2024-11-16"^^xsd:date ;
    med:noteText "Patient reports steady improvement since last visit. Counselled on medication adherence. Red flag symptoms explained." .

res:Lab_74 a med:LabOrder ;
    med:analyte "Troponin I" ; med:forPatient res:Pat_GAN137 ;
    med:date "2024-11-16"^^xsd:date ; med:orderedBy res:Doc_Karthik ;
    med:testsFor res:CoronaryArteryDisease ;
    med:orderStatus "Resulted" ;
    med:hasResult res:Res_74 .

res:Res_74 a med:LabResult ;
    med:analyte "Troponin I" ; med:value 5.23 ; med:unit "ng/mL" ;
    med:refLow 0 ; med:refHigh 0.04 ; med:outOfRange true ;
    med:date "2024-11-17"^^xsd:date ;
    med:performedBy res:Tech_Mohan .

res:Enc_162 med:orderedTest res:Lab_74 .

res:Enc_163 a med:EmergencyVisit ;
    med:encounterOf res:Pat_GAN137 ; med:date "2025-07-07"^^xsd:date ;
    med:time "12:00" ;
    med:attendedBy res:Doc_Karthik ; med:inDepartment res:Dept_Emergency ;
    med:reason "Acute presentation" ;
    med:outcome "Discharged with advice" ;
    med:recordedCondition res:Cond_115 ;
    med:hasVitals res:Vit_163 ; med:hasNote res:Note_163 .

res:Vit_163 a med:VitalSigns ;
    med:systolic 151 ; med:diastolic 87 ;
    med:heartRate 76 ; med:temperature 97.8 ;
    med:spo2 97 ;
    med:weightKg 58.9 ;
    med:bmi 25.6 .

res:Note_163 a med:ClinicalNote ;
    med:authorName "Dr. Karthik" ;
    med:date "2025-07-07"^^xsd:date ;
    med:noteText "Routine review, no new complaints. Dose adjusted, repeat bloods before next visit." .

res:Rx_126 a med:Prescription ;
    med:prescribes res:Med_Furosemide ; med:prescribedBy res:Doc_Karthik ;
    med:forPatient res:Pat_GAN137 ; med:date "2025-07-07"^^xsd:date ;
    med:dosage "1 tablet" ;
    med:frequency "Once daily at night" ;
    med:durationDays 90 ;
    med:dispensed true ;
    med:status "Completed" .

res:Rx_127 a med:Prescription ;
    med:prescribes res:Med_Metoprolol ; med:prescribedBy res:Doc_Karthik ;
    med:forPatient res:Pat_GAN137 ; med:date "2025-07-07"^^xsd:date ;
    med:dosage "2 tablets" ;
    med:frequency "Twice daily" ;
    med:durationDays 30 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_163 med:issuedPrescription res:Rx_126 , res:Rx_127 .
res:Pat_GAN137 med:hasPrescription res:Rx_126 , res:Rx_127 .

res:Inv_122 a med:Invoice ;
    med:forPatient res:Pat_GAN137 ; med:date "2025-07-07"^^xsd:date ;
    med:amount 18165 ; med:paid true ;
    med:status "Settled" .
res:Pat_GAN137 med:hasInvoice res:Inv_122 .

res:Enc_164 a med:Consultation ;
    med:encounterOf res:Pat_GAN137 ; med:date "2026-01-17"^^xsd:date ;
    med:time "15:15" ;
    med:attendedBy res:Doc_Farida ; med:inDepartment res:Dept_Cardiology ;
    med:reason "Review of coronary artery disease" ;
    med:outcome "Follow up scheduled" ;
    med:recordedCondition res:Cond_112 ;
    med:hasVitals res:Vit_164 ; med:hasNote res:Note_164 .

res:Vit_164 a med:VitalSigns ;
    med:systolic 167 ; med:diastolic 102 ;
    med:heartRate 82 ; med:temperature 98.5 ;
    med:spo2 97 ;
    med:weightKg 55.6 ;
    med:bmi 25.0 .

res:Note_164 a med:ClinicalNote ;
    med:authorName "Dr. Farida" ;
    med:date "2026-01-17"^^xsd:date ;
    med:noteText "Routine review, no new complaints. Referral raised to the relevant specialty." .

res:Rx_128 a med:Prescription ;
    med:prescribes res:Med_Aspirin ; med:prescribedBy res:Doc_Farida ;
    med:forPatient res:Pat_GAN137 ; med:date "2026-01-17"^^xsd:date ;
    med:dosage "1 dose" ;
    med:frequency "As required" ;
    med:durationDays 90 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_164 med:issuedPrescription res:Rx_128 .
res:Pat_GAN137 med:hasPrescription res:Rx_128 .

res:Lab_75 a med:LabOrder ;
    med:analyte "Troponin I" ; med:forPatient res:Pat_GAN137 ;
    med:date "2026-01-17"^^xsd:date ; med:orderedBy res:Doc_Farida ;
    med:testsFor res:CoronaryArteryDisease ;
    med:orderStatus "Resulted" ;
    med:hasResult res:Res_75 .

res:Res_75 a med:LabResult ;
    med:analyte "Troponin I" ; med:value 4.12 ; med:unit "ng/mL" ;
    med:refLow 0 ; med:refHigh 0.04 ; med:outOfRange true ;
    med:date "2026-01-18"^^xsd:date ;
    med:performedBy res:Tech_Mohan .

res:Enc_164 med:orderedTest res:Lab_75 .

res:Inv_123 a med:Invoice ;
    med:forPatient res:Pat_GAN137 ; med:date "2026-01-17"^^xsd:date ;
    med:amount 1467 ; med:paid true ;
    med:status "Settled" .
res:Pat_GAN137 med:hasInvoice res:Inv_123 .

res:Enc_165 a med:Consultation ;
    med:encounterOf res:Pat_GAN137 ; med:date "2026-08-30"^^xsd:date ;
    med:time "16:45" ;
    med:attendedBy res:Doc_Ramesh ; med:inDepartment res:Dept_GeneralMedicine ;
    med:reason "Review of hypertension" ;
    med:outcome "Follow up scheduled" ;
    med:recordedCondition res:Cond_113 ;
    med:hasVitals res:Vit_165 ; med:hasNote res:Note_165 .

res:Vit_165 a med:VitalSigns ;
    med:systolic 170 ; med:diastolic 105 ;
    med:heartRate 97 ; med:temperature 97.6 ;
    med:spo2 96 ;
    med:weightKg 70.5 ;
    med:bmi 26.8 .

res:Note_165 a med:ClinicalNote ;
    med:authorName "Dr. Ramesh" ;
    med:date "2026-08-30"^^xsd:date ;
    med:noteText "Referred from general medicine for specialist opinion. Dose adjusted, repeat bloods before next visit." .

res:Rx_129 a med:Prescription ;
    med:prescribes res:Med_Amlodipine ; med:prescribedBy res:Doc_Ramesh ;
    med:forPatient res:Pat_GAN137 ; med:date "2026-08-30"^^xsd:date ;
    med:dosage "2 tablets" ;
    med:frequency "As required" ;
    med:durationDays 30 ;
    med:dispensed false ;
    med:status "Active" .

res:Enc_165 med:issuedPrescription res:Rx_129 .
res:Pat_GAN137 med:hasPrescription res:Rx_129 .

res:Inv_124 a med:Invoice ;
    med:forPatient res:Pat_GAN137 ; med:date "2026-08-30"^^xsd:date ;
    med:amount 2067 ; med:paid true ;
    med:status "Settled" .
res:Pat_GAN137 med:hasInvoice res:Inv_124 .

res:Appt_22 a med:Appointment ;
    med:forPatient res:Pat_GAN137 ; med:appointmentWith res:Doc_Ramesh ;
    med:date "2026-10-07"^^xsd:date ;
    med:time "11:40" ;
    med:inDepartment res:Dept_Cardiology ;
    med:status "Scheduled" .
res:Pat_GAN137 med:hasAppointment res:Appt_22 .

res:Pat_GAN137 med:assignedBed res:Bed_1 .

res:Pat_MUR138 a med:OutPatient ;
    med:name "Murugan Narayanan" ; med:mrn "MRN-MUR138" ; med:photoInitials "MN" ;
    med:sex "Male" ; med:dateOfBirth "1997-05-13"^^xsd:date ; med:age 29 ;
    med:bloodGroup "B+" ; med:phone "+91 96438 581163" ; med:email "murugan.narayanan@example.in" ;
    med:address "37 Anna Salai, Guindy, Chennai" ;
    med:primaryPhysician res:Doc_Nithya ;
    med:hasCondition res:Cond_117 , res:Cond_118 , res:Cond_119 , res:Cond_120 .

res:Cond_117 a med:Condition ;
    med:ofDisease res:TypeIIDiabetes ; med:onsetDate "2025-03-15"^^xsd:date ;
    med:severity "Moderate" ;
    med:clinicalStatus "Active" ;
    med:diagnosedBy res:Doc_Nithya .

res:Cond_118 a med:Condition ;
    med:ofDisease res:Pneumonia ; med:onsetDate "2025-04-23"^^xsd:date ;
    med:severity "Moderate" ;
    med:clinicalStatus "Resolved" ;
    med:resolvedDate "2025-06-10"^^xsd:date ;
    med:diagnosedBy res:Doc_Joseph .

res:Cond_119 a med:Condition ;
    med:ofDisease res:UrinaryTractInfection ; med:onsetDate "2025-01-21"^^xsd:date ;
    med:severity "Moderate" ;
    med:clinicalStatus "Resolved" ;
    med:resolvedDate "2025-06-22"^^xsd:date ;
    med:diagnosedBy res:Doc_Suresh .

res:Cond_120 a med:Condition ;
    med:ofDisease res:ChronicKidneyDisease ; med:onsetDate "2016-12-16"^^xsd:date ;
    med:severity "Moderate" ;
    med:clinicalStatus "Active" ;
    med:diagnosedBy res:Doc_Vandana .

res:Pat_MUR138 med:hasEncounter res:Enc_166 , res:Enc_167 , res:Enc_168 .

res:Enc_166 a med:Consultation ;
    med:encounterOf res:Pat_MUR138 ; med:date "2023-11-30"^^xsd:date ;
    med:time "12:30" ;
    med:attendedBy res:Doc_Joseph ; med:inDepartment res:Dept_GeneralMedicine ;
    med:reason "First presentation" ;
    med:outcome "Referred for tests" ;
    med:recordedCondition res:Cond_119 ;
    med:hasVitals res:Vit_166 ; med:hasNote res:Note_166 .

res:Vit_166 a med:VitalSigns ;
    med:systolic 129 ; med:diastolic 72 ;
    med:heartRate 84 ; med:temperature 99.1 ;
    med:spo2 97 ;
    med:weightKg 75.2 ;
    med:bmi 27.6 .

res:Note_166 a med:ClinicalNote ;
    med:authorName "Dr. Joseph" ;
    med:date "2023-11-30"^^xsd:date ;
    med:noteText "Attends for scheduled follow up. Reassured. No change to treatment at this stage." .

res:Rx_130 a med:Prescription ;
    med:prescribes res:Med_Nitrofurantoin ; med:prescribedBy res:Doc_Joseph ;
    med:forPatient res:Pat_MUR138 ; med:date "2023-11-30"^^xsd:date ;
    med:dosage "1 dose" ;
    med:frequency "Once daily" ;
    med:durationDays 7 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_166 med:issuedPrescription res:Rx_130 .
res:Pat_MUR138 med:hasPrescription res:Rx_130 .

res:Lab_76 a med:LabOrder ;
    med:analyte "Urine WBC" ; med:forPatient res:Pat_MUR138 ;
    med:date "2023-11-30"^^xsd:date ; med:orderedBy res:Doc_Joseph ;
    med:testsFor res:UrinaryTractInfection ;
    med:orderStatus "Resulted" ;
    med:hasResult res:Res_76 .

res:Res_76 a med:LabResult ;
    med:analyte "Urine WBC" ; med:value 48.57 ; med:unit "/hpf" ;
    med:refLow 0 ; med:refHigh 5 ; med:outOfRange true ;
    med:date "2023-12-01"^^xsd:date ;
    med:performedBy res:Tech_Mohan .

res:Enc_166 med:orderedTest res:Lab_76 .

res:Inv_125 a med:Invoice ;
    med:forPatient res:Pat_MUR138 ; med:date "2023-11-30"^^xsd:date ;
    med:amount 6296 ; med:paid true ;
    med:status "Settled" .
res:Inv_125 med:coveredBy res:Policy_MUR138 .
res:Pat_MUR138 med:hasInvoice res:Inv_125 .

res:Enc_167 a med:FollowUp ;
    med:encounterOf res:Pat_MUR138 ; med:date "2025-04-24"^^xsd:date ;
    med:time "18:45" ;
    med:attendedBy res:Doc_Joseph ; med:inDepartment res:Dept_GeneralMedicine ;
    med:reason "Review of urinary tract infection" ;
    med:outcome "Follow up scheduled" ;
    med:recordedCondition res:Cond_119 ;
    med:hasVitals res:Vit_167 ; med:hasNote res:Note_167 .

res:Vit_167 a med:VitalSigns ;
    med:systolic 113 ; med:diastolic 71 ;
    med:heartRate 94 ; med:temperature 100.4 ;
    med:spo2 96 ;
    med:weightKg 63.6 ;
    med:bmi 27.7 .

res:Note_167 a med:ClinicalNote ;
    med:authorName "Dr. Joseph" ;
    med:date "2025-04-24"^^xsd:date ;
    med:noteText "Post discharge review. Investigations ordered, will call with results." .

res:Lab_77 a med:LabOrder ;
    med:analyte "Urine WBC" ; med:forPatient res:Pat_MUR138 ;
    med:date "2025-04-24"^^xsd:date ; med:orderedBy res:Doc_Joseph ;
    med:testsFor res:UrinaryTractInfection ;
    med:orderStatus "Resulted" ;
    med:hasResult res:Res_77 .

res:Res_77 a med:LabResult ;
    med:analyte "Urine WBC" ; med:value 36.5 ; med:unit "/hpf" ;
    med:refLow 0 ; med:refHigh 5 ; med:outOfRange true ;
    med:date "2025-04-25"^^xsd:date ;
    med:performedBy res:Tech_Mohan .

res:Enc_167 med:orderedTest res:Lab_77 .

res:Inv_126 a med:Invoice ;
    med:forPatient res:Pat_MUR138 ; med:date "2025-04-24"^^xsd:date ;
    med:amount 1453 ; med:paid true ;
    med:status "Settled" .
res:Inv_126 med:coveredBy res:Policy_MUR138 .
res:Pat_MUR138 med:hasInvoice res:Inv_126 .

res:Enc_168 a med:Consultation ;
    med:encounterOf res:Pat_MUR138 ; med:date "2026-08-30"^^xsd:date ;
    med:time "13:30" ;
    med:attendedBy res:Doc_Joseph ; med:inDepartment res:Dept_Pulmonology ;
    med:reason "Review of pneumonia" ;
    med:outcome "Referred for tests" ;
    med:recordedCondition res:Cond_118 ;
    med:hasVitals res:Vit_168 ; med:hasNote res:Note_168 .

res:Vit_168 a med:VitalSigns ;
    med:systolic 133 ; med:diastolic 81 ;
    med:heartRate 70 ; med:temperature 98.3 ;
    med:spo2 98 ;
    med:weightKg 61.3 ;
    med:bmi 21.1 .

res:Note_168 a med:ClinicalNote ;
    med:authorName "Dr. Joseph" ;
    med:date "2026-08-30"^^xsd:date ;
    med:noteText "Presents with a two day history of symptoms. Continue current therapy, review in three months." .

res:Inv_127 a med:Invoice ;
    med:forPatient res:Pat_MUR138 ; med:date "2026-08-30"^^xsd:date ;
    med:amount 5898 ; med:paid true ;
    med:status "Settled" .
res:Inv_127 med:coveredBy res:Policy_MUR138 .
res:Pat_MUR138 med:hasInvoice res:Inv_127 .

res:Policy_MUR138 a med:InsurancePolicy ;
    med:policyNumber "ST-247712" ;
    med:issuedBy res:Ins_StarHealth ; med:coveragePercent 85 ;
    med:amount 500000 .
res:Pat_MUR138 med:hasPolicy res:Policy_MUR138 .

res:Pat_MAN139 a med:OutPatient ;
    med:name "Manoj Reddy" ; med:mrn "MRN-MAN139" ; med:photoInitials "MR" ;
    med:sex "Male" ; med:dateOfBirth "1985-08-11"^^xsd:date ; med:age 41 ;
    med:bloodGroup "AB-" ; med:phone "+91 91317 732807" ; med:email "manoj.reddy@example.in" ;
    med:address "57 Velachery Main Road, Kelambakkam, Chennai" ;
    med:primaryPhysician res:Doc_Vandana ;
    med:hasCondition res:Cond_121 .

res:Cond_121 a med:Condition ;
    med:ofDisease res:ChronicKidneyDisease ; med:onsetDate "2017-02-27"^^xsd:date ;
    med:severity "Mild" ;
    med:clinicalStatus "Active" ;
    med:diagnosedBy res:Doc_Vandana .

res:Pat_MAN139 med:hasEncounter res:Enc_169 , res:Enc_170 , res:Enc_171 , res:Enc_172 .

res:Enc_169 a med:Consultation ;
    med:encounterOf res:Pat_MAN139 ; med:date "2023-08-08"^^xsd:date ;
    med:time "18:00" ;
    med:attendedBy res:Doc_Vandana ; med:inDepartment res:Dept_Nephrology ;
    med:reason "First presentation" ;
    med:outcome "Treatment continued" ;
    med:recordedCondition res:Cond_121 ;
    med:hasVitals res:Vit_169 ; med:hasNote res:Note_169 .

res:Vit_169 a med:VitalSigns ;
    med:systolic 122 ; med:diastolic 79 ;
    med:heartRate 89 ; med:temperature 97.9 ;
    med:spo2 100 ;
    med:weightKg 49.9 ;
    med:bmi 22.5 .

res:Note_169 a med:ClinicalNote ;
    med:authorName "Dr. Vandana" ;
    med:date "2023-08-08"^^xsd:date ;
    med:noteText "Patient reports steady improvement since last visit. Counselled on medication adherence. Red flag symptoms explained." .

res:Lab_78 a med:LabOrder ;
    med:analyte "Creatinine" ; med:forPatient res:Pat_MAN139 ;
    med:date "2023-08-08"^^xsd:date ; med:orderedBy res:Doc_Vandana ;
    med:testsFor res:ChronicKidneyDisease ;
    med:orderStatus "Resulted" ;
    med:hasResult res:Res_78 .

res:Res_78 a med:LabResult ;
    med:analyte "Creatinine" ; med:value 1.37 ; med:unit "mg/dL" ;
    med:refLow 0.6 ; med:refHigh 1.2 ; med:outOfRange true ;
    med:date "2023-08-09"^^xsd:date ;
    med:performedBy res:Tech_Mohan .

res:Lab_79 a med:LabOrder ;
    med:analyte "eGFR" ; med:forPatient res:Pat_MAN139 ;
    med:date "2023-08-08"^^xsd:date ; med:orderedBy res:Doc_Vandana ;
    med:testsFor res:ChronicKidneyDisease ;
    med:orderStatus "Resulted" ;
    med:hasResult res:Res_79 .

res:Res_79 a med:LabResult ;
    med:analyte "eGFR" ; med:value 61.03 ; med:unit "mL/min" ;
    med:refLow 90 ; med:refHigh 120 ; med:outOfRange true ;
    med:date "2023-08-09"^^xsd:date ;
    med:performedBy res:Tech_Mohan .

res:Enc_169 med:orderedTest res:Lab_78 , res:Lab_79 .

res:Enc_170 a med:FollowUp ;
    med:encounterOf res:Pat_MAN139 ; med:date "2024-07-24"^^xsd:date ;
    med:time "13:15" ;
    med:attendedBy res:Doc_Vandana ; med:inDepartment res:Dept_Nephrology ;
    med:reason "Review of chronic kidney disease" ;
    med:outcome "Discharged with advice" ;
    med:recordedCondition res:Cond_121 ;
    med:hasVitals res:Vit_170 ; med:hasNote res:Note_170 .

res:Vit_170 a med:VitalSigns ;
    med:systolic 133 ; med:diastolic 70 ;
    med:heartRate 71 ; med:temperature 98.6 ;
    med:spo2 98 ;
    med:weightKg 72.0 ;
    med:bmi 26.1 .

res:Note_170 a med:ClinicalNote ;
    med:authorName "Dr. Vandana" ;
    med:date "2024-07-24"^^xsd:date ;
    med:noteText "Attends for scheduled follow up. Dose adjusted, repeat bloods before next visit." .

res:Inv_128 a med:Invoice ;
    med:forPatient res:Pat_MAN139 ; med:date "2024-07-24"^^xsd:date ;
    med:amount 1152 ; med:paid true ;
    med:status "Settled" .
res:Pat_MAN139 med:hasInvoice res:Inv_128 .

res:Enc_171 a med:Consultation ;
    med:encounterOf res:Pat_MAN139 ; med:date "2025-09-04"^^xsd:date ;
    med:time "08:45" ;
    med:attendedBy res:Doc_Vandana ; med:inDepartment res:Dept_Nephrology ;
    med:reason "Review of chronic kidney disease" ;
    med:outcome "Treatment continued" ;
    med:recordedCondition res:Cond_121 ;
    med:hasVitals res:Vit_171 ; med:hasNote res:Note_171 .

res:Vit_171 a med:VitalSigns ;
    med:systolic 125 ; med:diastolic 66 ;
    med:heartRate 80 ; med:temperature 99.1 ;
    med:spo2 96 ;
    med:weightKg 48.4 ;
    med:bmi 19.8 .

res:Note_171 a med:ClinicalNote ;
    med:authorName "Dr. Vandana" ;
    med:date "2025-09-04"^^xsd:date ;
    med:noteText "Attends for scheduled follow up. Reassured. No change to treatment at this stage." .

res:Rx_131 a med:Prescription ;
    med:prescribes res:Med_Telmisartan ; med:prescribedBy res:Doc_Vandana ;
    med:forPatient res:Pat_MAN139 ; med:date "2025-09-04"^^xsd:date ;
    med:dosage "1 tablet" ;
    med:frequency "Three times daily" ;
    med:durationDays 90 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_171 med:issuedPrescription res:Rx_131 .
res:Pat_MAN139 med:hasPrescription res:Rx_131 .

res:Inv_129 a med:Invoice ;
    med:forPatient res:Pat_MAN139 ; med:date "2025-09-04"^^xsd:date ;
    med:amount 6152 ; med:paid true ;
    med:status "Settled" .
res:Pat_MAN139 med:hasInvoice res:Inv_129 .

res:Enc_172 a med:Admission ;
    med:encounterOf res:Pat_MAN139 ; med:date "2026-08-30"^^xsd:date ;
    med:time "11:15" ;
    med:attendedBy res:Doc_Vandana ; med:inDepartment res:Dept_Nephrology ;
    med:reason "Review of chronic kidney disease" ;
    med:outcome "Admitted to ward" ;
    med:lengthOfStay 2 ;
    med:recordedCondition res:Cond_121 ;
    med:hasVitals res:Vit_172 ; med:hasNote res:Note_172 .

res:Vit_172 a med:VitalSigns ;
    med:systolic 122 ; med:diastolic 67 ;
    med:heartRate 93 ; med:temperature 99.0 ;
    med:spo2 100 ;
    med:weightKg 58.0 ;
    med:bmi 24.6 .

res:Note_172 a med:ClinicalNote ;
    med:authorName "Dr. Vandana" ;
    med:date "2026-08-30"^^xsd:date ;
    med:noteText "Routine review, no new complaints. Advised on diet, salt restriction and daily walking." .

res:Rx_132 a med:Prescription ;
    med:prescribes res:Med_Telmisartan ; med:prescribedBy res:Doc_Vandana ;
    med:forPatient res:Pat_MAN139 ; med:date "2026-08-30"^^xsd:date ;
    med:dosage "1 tablet" ;
    med:frequency "As required" ;
    med:durationDays 90 ;
    med:dispensed false ;
    med:status "Active" .

res:Enc_172 med:issuedPrescription res:Rx_132 .
res:Pat_MAN139 med:hasPrescription res:Rx_132 .

res:Inv_130 a med:Invoice ;
    med:forPatient res:Pat_MAN139 ; med:date "2026-08-30"^^xsd:date ;
    med:amount 314581 ; med:paid false ;
    med:status "Awaiting payment" .
res:Pat_MAN139 med:hasInvoice res:Inv_130 .

res:Pat_GOP140 a med:OutPatient ;
    med:name "Gopal Mehta" ; med:mrn "MRN-GOP140" ; med:photoInitials "GM" ;
    med:sex "Male" ; med:dateOfBirth "2000-12-18"^^xsd:date ; med:age 25 ;
    med:bloodGroup "B-" ; med:phone "+91 97701 320765" ; med:email "gopal.mehta@example.in" ;
    med:address "52 Gandhi Nagar 2nd Cross, Pallikaranai, Chennai" ;
    med:primaryPhysician res:Doc_Karthik ;
    med:hasCondition res:Cond_122 .

res:Cond_122 a med:Condition ;
    med:ofDisease res:Dengue ; med:onsetDate "2026-07-05"^^xsd:date ;
    med:severity "Mild" ;
    med:clinicalStatus "Resolved" ;
    med:resolvedDate "2026-08-30"^^xsd:date ;
    med:diagnosedBy res:Doc_Karthik .

res:Pat_GOP140 med:hasEncounter res:Enc_173 , res:Enc_174 .

res:Enc_173 a med:Consultation ;
    med:encounterOf res:Pat_GOP140 ; med:date "2024-08-17"^^xsd:date ;
    med:time "12:00" ;
    med:attendedBy res:Doc_Joseph ; med:inDepartment res:Dept_GeneralMedicine ;
    med:reason "First presentation" ;
    med:outcome "Discharged with advice" ;
    med:recordedCondition res:Cond_122 ;
    med:hasVitals res:Vit_173 ; med:hasNote res:Note_173 .

res:Vit_173 a med:VitalSigns ;
    med:systolic 129 ; med:diastolic 66 ;
    med:heartRate 78 ; med:temperature 97.9 ;
    med:spo2 100 ;
    med:weightKg 75.9 ;
    med:bmi 21.5 .

res:Note_173 a med:ClinicalNote ;
    med:authorName "Dr. Joseph" ;
    med:date "2024-08-17"^^xsd:date ;
    med:noteText "Presents with a two day history of symptoms. Reassured. No change to treatment at this stage." .

res:Lab_80 a med:LabOrder ;
    med:analyte "Platelet count" ; med:forPatient res:Pat_GOP140 ;
    med:date "2024-08-17"^^xsd:date ; med:orderedBy res:Doc_Joseph ;
    med:testsFor res:Dengue ;
    med:orderStatus "Resulted" ;
    med:hasResult res:Res_80 .

res:Res_80 a med:LabResult ;
    med:analyte "Platelet count" ; med:value 60.13 ; med:unit "x10^3/uL" ;
    med:refLow 150 ; med:refHigh 450 ; med:outOfRange true ;
    med:date "2024-08-18"^^xsd:date ;
    med:performedBy res:Tech_Mohan .

res:Enc_173 med:orderedTest res:Lab_80 .

res:Inv_131 a med:Invoice ;
    med:forPatient res:Pat_GOP140 ; med:date "2024-08-17"^^xsd:date ;
    med:amount 708 ; med:paid true ;
    med:status "Settled" .
res:Inv_131 med:coveredBy res:Policy_GOP140 .
res:Pat_GOP140 med:hasInvoice res:Inv_131 .

res:Enc_174 a med:Screening ;
    med:encounterOf res:Pat_GOP140 ; med:date "2026-08-30"^^xsd:date ;
    med:time "10:45" ;
    med:attendedBy res:Doc_Joseph ; med:inDepartment res:Dept_GeneralMedicine ;
    med:reason "Review of dengue" ;
    med:outcome "Referred for tests" ;
    med:recordedCondition res:Cond_122 ;
    med:hasVitals res:Vit_174 ; med:hasNote res:Note_174 .

res:Vit_174 a med:VitalSigns ;
    med:systolic 128 ; med:diastolic 76 ;
    med:heartRate 79 ; med:temperature 97.6 ;
    med:spo2 97 ;
    med:weightKg 75.2 ;
    med:bmi 23.4 .

res:Note_174 a med:ClinicalNote ;
    med:authorName "Dr. Joseph" ;
    med:date "2026-08-30"^^xsd:date ;
    med:noteText "Routine review, no new complaints. Continue current therapy, review in three months." .

res:Rx_133 a med:Prescription ;
    med:prescribes res:Med_Paracetamol ; med:prescribedBy res:Doc_Joseph ;
    med:forPatient res:Pat_GOP140 ; med:date "2026-08-30"^^xsd:date ;
    med:dosage "1 tablet" ;
    med:frequency "Twice daily" ;
    med:durationDays 5 ;
    med:dispensed false ;
    med:status "Completed" .

res:Enc_174 med:issuedPrescription res:Rx_133 .
res:Pat_GOP140 med:hasPrescription res:Rx_133 .

res:Inv_132 a med:Invoice ;
    med:forPatient res:Pat_GOP140 ; med:date "2026-08-30"^^xsd:date ;
    med:amount 4647 ; med:paid false ;
    med:status "Insurance claim pending" .
res:Inv_132 med:coveredBy res:Policy_GOP140 .
res:Pat_GOP140 med:hasInvoice res:Inv_132 .

res:Policy_GOP140 a med:InsurancePolicy ;
    med:policyNumber "ST-716197" ;
    med:issuedBy res:Ins_StarHealth ; med:coveragePercent 75 ;
    med:amount 500000 .
res:Pat_GOP140 med:hasPolicy res:Policy_GOP140 .

res:Appt_23 a med:Appointment ;
    med:forPatient res:Pat_GOP140 ; med:appointmentWith res:Doc_Joseph ;
    med:date "2026-09-08"^^xsd:date ;
    med:time "09:20" ;
    med:inDepartment res:Dept_GeneralMedicine ;
    med:status "Scheduled" .
res:Pat_GOP140 med:hasAppointment res:Appt_23 .

res:Pat_SAN141 a med:OutPatient ;
    med:name "Sangeetha Iyer" ; med:mrn "MRN-SAN141" ; med:photoInitials "SI" ;
    med:sex "Female" ; med:dateOfBirth "1986-06-11"^^xsd:date ; med:age 40 ;
    med:bloodGroup "B+" ; med:phone "+91 98118 547726" ; med:email "sangeetha.iyer@example.in" ;
    med:address "14 Bharathi Street, Perungudi, Chennai" ;
    med:primaryPhysician res:Doc_Karthik ;
    med:hasCondition res:Cond_123 .

res:Cond_123 a med:Condition ;
    med:ofDisease res:Dengue ; med:onsetDate "2026-03-20"^^xsd:date ;
    med:severity "Moderate" ;
    med:clinicalStatus "Resolved" ;
    med:resolvedDate "2026-06-09"^^xsd:date ;
    med:diagnosedBy res:Doc_Karthik .

res:Pat_SAN141 med:hasEncounter res:Enc_175 , res:Enc_176 .

res:Enc_175 a med:Consultation ;
    med:encounterOf res:Pat_SAN141 ; med:date "2024-08-23"^^xsd:date ;
    med:time "18:30" ;
    med:attendedBy res:Doc_Joseph ; med:inDepartment res:Dept_GeneralMedicine ;
    med:reason "First presentation" ;
    med:outcome "Referred for tests" ;
    med:recordedCondition res:Cond_123 ;
    med:hasVitals res:Vit_175 ; med:hasNote res:Note_175 .

res:Vit_175 a med:VitalSigns ;
    med:systolic 120 ; med:diastolic 68 ;
    med:heartRate 97 ; med:temperature 99.6 ;
    med:spo2 99 ;
    med:weightKg 61.1 ;
    med:bmi 23.0 .

res:Note_175 a med:ClinicalNote ;
    med:authorName "Dr. Joseph" ;
    med:date "2024-08-23"^^xsd:date ;
    med:noteText "Presents with a two day history of symptoms. Investigations ordered, will call with results." .

res:Rx_134 a med:Prescription ;
    med:prescribes res:Med_Paracetamol ; med:prescribedBy res:Doc_Joseph ;
    med:forPatient res:Pat_SAN141 ; med:date "2024-08-23"^^xsd:date ;
    med:dosage "2 tablets" ;
    med:frequency "As required" ;
    med:durationDays 5 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_175 med:issuedPrescription res:Rx_134 .
res:Pat_SAN141 med:hasPrescription res:Rx_134 .

res:Lab_81 a med:LabOrder ;
    med:analyte "Platelet count" ; med:forPatient res:Pat_SAN141 ;
    med:date "2024-08-23"^^xsd:date ; med:orderedBy res:Doc_Joseph ;
    med:testsFor res:Dengue ;
    med:orderStatus "Resulted" ;
    med:hasResult res:Res_81 .

res:Res_81 a med:LabResult ;
    med:analyte "Platelet count" ; med:value 156.56 ; med:unit "x10^3/uL" ;
    med:refLow 150 ; med:refHigh 450 ; med:outOfRange false ;
    med:date "2024-08-24"^^xsd:date ;
    med:performedBy res:Tech_Mohan .

res:Enc_175 med:orderedTest res:Lab_81 .

res:Inv_133 a med:Invoice ;
    med:forPatient res:Pat_SAN141 ; med:date "2024-08-23"^^xsd:date ;
    med:amount 1433 ; med:paid true ;
    med:status "Settled" .
res:Pat_SAN141 med:hasInvoice res:Inv_133 .

res:Enc_176 a med:FollowUp ;
    med:encounterOf res:Pat_SAN141 ; med:date "2026-08-30"^^xsd:date ;
    med:time "14:45" ;
    med:attendedBy res:Doc_Karthik ; med:inDepartment res:Dept_GeneralMedicine ;
    med:reason "Review of dengue" ;
    med:outcome "Referred for tests" ;
    med:recordedCondition res:Cond_123 ;
    med:hasVitals res:Vit_176 ; med:hasNote res:Note_176 .

res:Vit_176 a med:VitalSigns ;
    med:systolic 109 ; med:diastolic 76 ;
    med:heartRate 77 ; med:temperature 99.3 ;
    med:spo2 97 ;
    med:weightKg 59.7 ;
    med:bmi 23.0 .

res:Note_176 a med:ClinicalNote ;
    med:authorName "Dr. Karthik" ;
    med:date "2026-08-30"^^xsd:date ;
    med:noteText "Reviewed in clinic today. Referral raised to the relevant specialty." .

res:Rx_135 a med:Prescription ;
    med:prescribes res:Med_Paracetamol ; med:prescribedBy res:Doc_Karthik ;
    med:forPatient res:Pat_SAN141 ; med:date "2026-08-30"^^xsd:date ;
    med:dosage "1 tablet" ;
    med:frequency "Twice daily" ;
    med:durationDays 10 ;
    med:dispensed false ;
    med:status "Completed" .

res:Enc_176 med:issuedPrescription res:Rx_135 .
res:Pat_SAN141 med:hasPrescription res:Rx_135 .

res:Inv_134 a med:Invoice ;
    med:forPatient res:Pat_SAN141 ; med:date "2026-08-30"^^xsd:date ;
    med:amount 5970 ; med:paid false ;
    med:status "Awaiting payment" .
res:Pat_SAN141 med:hasInvoice res:Inv_134 .

res:Appt_24 a med:Appointment ;
    med:forPatient res:Pat_SAN141 ; med:appointmentWith res:Doc_Karthik ;
    med:date "2026-09-05"^^xsd:date ;
    med:time "14:00" ;
    med:inDepartment res:Dept_GeneralMedicine ;
    med:status "Scheduled" .
res:Pat_SAN141 med:hasAppointment res:Appt_24 .

res:Pat_MUR142 a med:OutPatient ;
    med:name "Murugan Iyer" ; med:mrn "MRN-MUR142" ; med:photoInitials "MI" ;
    med:sex "Male" ; med:dateOfBirth "1998-12-16"^^xsd:date ; med:age 27 ;
    med:bloodGroup "B-" ; med:phone "+91 99538 244576" ; med:email "murugan.iyer@example.in" ;
    med:address "72 GST Road, Velachery, Chennai" ;
    med:primaryPhysician res:Doc_Nithya ;
    med:hasCondition res:Cond_124 , res:Cond_125 .

res:Cond_124 a med:Condition ;
    med:ofDisease res:Hypothyroidism ; med:onsetDate "2023-06-22"^^xsd:date ;
    med:severity "Moderate" ;
    med:clinicalStatus "Active" ;
    med:diagnosedBy res:Doc_Nithya .

res:Cond_125 a med:Condition ;
    med:ofDisease res:UrinaryTractInfection ; med:onsetDate "2025-11-28"^^xsd:date ;
    med:severity "Moderate" ;
    med:clinicalStatus "Resolved" ;
    med:resolvedDate "2026-01-30"^^xsd:date ;
    med:diagnosedBy res:Doc_Suresh .

res:Pat_MUR142 med:hasEncounter res:Enc_177 , res:Enc_178 , res:Enc_179 .

res:Enc_177 a med:EmergencyVisit ;
    med:encounterOf res:Pat_MUR142 ; med:date "2023-12-14"^^xsd:date ;
    med:time "10:00" ;
    med:attendedBy res:Doc_Karthik ; med:inDepartment res:Dept_Emergency ;
    med:reason "Acute presentation" ;
    med:outcome "Referred for tests" ;
    med:recordedCondition res:Cond_124 ;
    med:hasVitals res:Vit_177 ; med:hasNote res:Note_177 .

res:Vit_177 a med:VitalSigns ;
    med:systolic 117 ; med:diastolic 67 ;
    med:heartRate 103 ; med:temperature 99.1 ;
    med:spo2 98 ;
    med:weightKg 69.3 ;
    med:bmi 19.8 .

res:Note_177 a med:ClinicalNote ;
    med:authorName "Dr. Karthik" ;
    med:date "2023-12-14"^^xsd:date ;
    med:noteText "Reviewed in clinic today. Advised on diet, salt restriction and daily walking." .

res:Rx_136 a med:Prescription ;
    med:prescribes res:Med_Levothyroxine ; med:prescribedBy res:Doc_Karthik ;
    med:forPatient res:Pat_MUR142 ; med:date "2023-12-14"^^xsd:date ;
    med:dosage "1 tablet" ;
    med:frequency "Three times daily" ;
    med:durationDays 30 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_177 med:issuedPrescription res:Rx_136 .
res:Pat_MUR142 med:hasPrescription res:Rx_136 .

res:Lab_82 a med:LabOrder ;
    med:analyte "TSH" ; med:forPatient res:Pat_MUR142 ;
    med:date "2023-12-14"^^xsd:date ; med:orderedBy res:Doc_Karthik ;
    med:testsFor res:Hypothyroidism ;
    med:orderStatus "Resulted" ;
    med:hasResult res:Res_82 .

res:Res_82 a med:LabResult ;
    med:analyte "TSH" ; med:value 8.08 ; med:unit "mIU/L" ;
    med:refLow 0.4 ; med:refHigh 4 ; med:outOfRange true ;
    med:date "2023-12-15"^^xsd:date ;
    med:performedBy res:Tech_Mohan .

res:Enc_177 med:orderedTest res:Lab_82 .

res:Inv_135 a med:Invoice ;
    med:forPatient res:Pat_MUR142 ; med:date "2023-12-14"^^xsd:date ;
    med:amount 10788 ; med:paid true ;
    med:status "Settled" .
res:Pat_MUR142 med:hasInvoice res:Inv_135 .

res:Enc_178 a med:Consultation ;
    med:encounterOf res:Pat_MUR142 ; med:date "2025-04-02"^^xsd:date ;
    med:time "13:45" ;
    med:attendedBy res:Doc_Suresh ; med:inDepartment res:Dept_GeneralMedicine ;
    med:reason "Review of urinary tract infection" ;
    med:outcome "Follow up scheduled" ;
    med:recordedCondition res:Cond_125 ;
    med:hasVitals res:Vit_178 ; med:hasNote res:Note_178 .

res:Vit_178 a med:VitalSigns ;
    med:systolic 121 ; med:diastolic 84 ;
    med:heartRate 91 ; med:temperature 99.2 ;
    med:spo2 100 ;
    med:weightKg 48.3 ;
    med:bmi 19.2 .

res:Note_178 a med:ClinicalNote ;
    med:authorName "Dr. Suresh" ;
    med:date "2025-04-02"^^xsd:date ;
    med:noteText "Reviewed in clinic today. Continue current therapy, review in three months." .

res:Rx_137 a med:Prescription ;
    med:prescribes res:Med_Nitrofurantoin ; med:prescribedBy res:Doc_Suresh ;
    med:forPatient res:Pat_MUR142 ; med:date "2025-04-02"^^xsd:date ;
    med:dosage "1 tablet" ;
    med:frequency "As required" ;
    med:durationDays 5 ;
    med:dispensed true ;
    med:status "Completed" .

res:Rx_138 a med:Prescription ;
    med:prescribes res:Med_Amoxicillin ; med:prescribedBy res:Doc_Suresh ;
    med:forPatient res:Pat_MUR142 ; med:date "2025-04-02"^^xsd:date ;
    med:dosage "2 tablets" ;
    med:frequency "Twice daily" ;
    med:durationDays 7 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_178 med:issuedPrescription res:Rx_137 , res:Rx_138 .
res:Pat_MUR142 med:hasPrescription res:Rx_137 , res:Rx_138 .

res:Lab_83 a med:LabOrder ;
    med:analyte "Urine WBC" ; med:forPatient res:Pat_MUR142 ;
    med:date "2025-04-02"^^xsd:date ; med:orderedBy res:Doc_Suresh ;
    med:testsFor res:UrinaryTractInfection ;
    med:orderStatus "Resulted" ;
    med:hasResult res:Res_83 .

res:Res_83 a med:LabResult ;
    med:analyte "Urine WBC" ; med:value 10.25 ; med:unit "/hpf" ;
    med:refLow 0 ; med:refHigh 5 ; med:outOfRange true ;
    med:date "2025-04-03"^^xsd:date ;
    med:performedBy res:Tech_Mohan .

res:Enc_178 med:orderedTest res:Lab_83 .

res:Inv_136 a med:Invoice ;
    med:forPatient res:Pat_MUR142 ; med:date "2025-04-02"^^xsd:date ;
    med:amount 1377 ; med:paid true ;
    med:status "Settled" .
res:Pat_MUR142 med:hasInvoice res:Inv_136 .

res:Enc_179 a med:Consultation ;
    med:encounterOf res:Pat_MUR142 ; med:date "2026-08-30"^^xsd:date ;
    med:time "10:45" ;
    med:attendedBy res:Doc_Suresh ; med:inDepartment res:Dept_GeneralMedicine ;
    med:reason "Review of urinary tract infection" ;
    med:outcome "Discharged with advice" ;
    med:recordedCondition res:Cond_125 ;
    med:hasVitals res:Vit_179 ; med:hasNote res:Note_179 .

res:Vit_179 a med:VitalSigns ;
    med:systolic 108 ; med:diastolic 78 ;
    med:heartRate 81 ; med:temperature 98.8 ;
    med:spo2 97 ;
    med:weightKg 55.4 ;
    med:bmi 26.9 .

res:Note_179 a med:ClinicalNote ;
    med:authorName "Dr. Suresh" ;
    med:date "2026-08-30"^^xsd:date ;
    med:noteText "Attends for scheduled follow up. Counselled on medication adherence. Red flag symptoms explained." .

res:Rx_139 a med:Prescription ;
    med:prescribes res:Med_Nitrofurantoin ; med:prescribedBy res:Doc_Suresh ;
    med:forPatient res:Pat_MUR142 ; med:date "2026-08-30"^^xsd:date ;
    med:dosage "1 tablet" ;
    med:frequency "As required" ;
    med:durationDays 14 ;
    med:dispensed true ;
    med:status "Completed" .

res:Rx_140 a med:Prescription ;
    med:prescribes res:Med_Amoxicillin ; med:prescribedBy res:Doc_Suresh ;
    med:forPatient res:Pat_MUR142 ; med:date "2026-08-30"^^xsd:date ;
    med:dosage "1 tablet" ;
    med:frequency "As required" ;
    med:durationDays 7 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_179 med:issuedPrescription res:Rx_139 , res:Rx_140 .
res:Pat_MUR142 med:hasPrescription res:Rx_139 , res:Rx_140 .

res:Lab_84 a med:LabOrder ;
    med:analyte "Urine WBC" ; med:forPatient res:Pat_MUR142 ;
    med:date "2026-08-30"^^xsd:date ; med:orderedBy res:Doc_Suresh ;
    med:testsFor res:UrinaryTractInfection ;
    med:orderStatus "Resulted" ;
    med:hasResult res:Res_84 .

res:Res_84 a med:LabResult ;
    med:analyte "Urine WBC" ; med:value 20.3 ; med:unit "/hpf" ;
    med:refLow 0 ; med:refHigh 5 ; med:outOfRange true ;
    med:date "2026-08-30"^^xsd:date ;
    med:performedBy res:Tech_Mohan .

res:Enc_179 med:orderedTest res:Lab_84 .

res:Inv_137 a med:Invoice ;
    med:forPatient res:Pat_MUR142 ; med:date "2026-08-30"^^xsd:date ;
    med:amount 2198 ; med:paid true ;
    med:status "Settled" .
res:Pat_MUR142 med:hasInvoice res:Inv_137 .

res:Pat_ROO143 a med:OutPatient ;
    med:name "Roopa Iyer" ; med:mrn "MRN-ROO143" ; med:photoInitials "RI" ;
    med:sex "Female" ; med:dateOfBirth "2008-08-14"^^xsd:date ; med:age 18 ;
    med:bloodGroup "O+" ; med:phone "+91 95630 863498" ; med:email "roopa.iyer@example.in" ;
    med:address "64 GST Road, Kelambakkam, Chennai" ;
    med:primaryPhysician res:Doc_Sameer ;
    med:hasCondition res:Cond_126 , res:Cond_127 .

res:Cond_126 a med:Condition ;
    med:ofDisease res:Tuberculosis ; med:onsetDate "2024-12-31"^^xsd:date ;
    med:severity "Moderate" ;
    med:clinicalStatus "Active" ;
    med:diagnosedBy res:Doc_Sameer .

res:Cond_127 a med:Condition ;
    med:ofDisease res:Dengue ; med:onsetDate "2025-09-17"^^xsd:date ;
    med:severity "Mild" ;
    med:clinicalStatus "Resolved" ;
    med:resolvedDate "2026-02-10"^^xsd:date ;
    med:diagnosedBy res:Doc_Joseph .

res:Pat_ROO143 med:hasEncounter res:Enc_180 .

res:Enc_180 a med:Consultation ;
    med:encounterOf res:Pat_ROO143 ; med:date "2026-08-30"^^xsd:date ;
    med:time "11:15" ;
    med:attendedBy res:Doc_Sameer ; med:inDepartment res:Dept_Pulmonology ;
    med:reason "First presentation" ;
    med:outcome "Discharged with advice" ;
    med:recordedCondition res:Cond_126 ;
    med:hasVitals res:Vit_180 ; med:hasNote res:Note_180 .

res:Vit_180 a med:VitalSigns ;
    med:systolic 113 ; med:diastolic 73 ;
    med:heartRate 97 ; med:temperature 100.1 ;
    med:spo2 97 ;
    med:weightKg 51.5 ;
    med:bmi 21.3 .

res:Note_180 a med:ClinicalNote ;
    med:authorName "Dr. Sameer" ;
    med:date "2026-08-30"^^xsd:date ;
    med:noteText "Patient reports steady improvement since last visit. Continue current therapy, review in three months." .

res:Policy_ROO143 a med:InsurancePolicy ;
    med:policyNumber "HD-783838" ;
    med:issuedBy res:Ins_HDFCErgo ; med:coveragePercent 70 ;
    med:amount 750000 .
res:Pat_ROO143 med:hasPolicy res:Policy_ROO143 .

res:Pat_BHA144 a med:OutPatient ;
    med:name "Bhavani Begum" ; med:mrn "MRN-BHA144" ; med:photoInitials "BB" ;
    med:sex "Female" ; med:dateOfBirth "1957-10-04"^^xsd:date ; med:age 68 ;
    med:bloodGroup "O+" ; med:phone "+91 96947 879535" ; med:email "bhavani.begum@example.in" ;
    med:address "22 Bharathi Street, Perungudi, Chennai" ;
    med:primaryPhysician res:Doc_Leela ;
    med:hasCondition res:Cond_128 , res:Cond_129 , res:Cond_130 , res:Cond_131 .

res:Cond_128 a med:Condition ;
    med:ofDisease res:Depression ; med:onsetDate "2019-06-14"^^xsd:date ;
    med:severity "Moderate" ;
    med:clinicalStatus "Active" ;
    med:diagnosedBy res:Doc_Leela .

res:Cond_129 a med:Condition ;
    med:ofDisease res:Obesity ; med:onsetDate "2025-11-06"^^xsd:date ;
    med:severity "Moderate" ;
    med:clinicalStatus "Active" ;
    med:diagnosedBy res:Doc_Nithya .

res:Cond_130 a med:Condition ;
    med:ofDisease res:Stroke ; med:onsetDate "2025-04-28"^^xsd:date ;
    med:severity "Mild" ;
    med:clinicalStatus "Resolved" ;
    med:resolvedDate "2025-09-25"^^xsd:date ;
    med:diagnosedBy res:Doc_Priya .

res:Cond_131 a med:Condition ;
    med:ofDisease res:Dementia ; med:onsetDate "2024-04-25"^^xsd:date ;
    med:severity "Moderate" ;
    med:clinicalStatus "Active" ;
    med:diagnosedBy res:Doc_Priya .

res:Pat_BHA144 med:hasEncounter res:Enc_181 , res:Enc_182 , res:Enc_183 , res:Enc_184 , res:Enc_185 , res:Enc_186 .

res:Enc_181 a med:EmergencyVisit ;
    med:encounterOf res:Pat_BHA144 ; med:date "2023-04-05"^^xsd:date ;
    med:time "17:30" ;
    med:attendedBy res:Doc_Karthik ; med:inDepartment res:Dept_Emergency ;
    med:reason "Acute presentation" ;
    med:outcome "Discharged with advice" ;
    med:recordedCondition res:Cond_131 ;
    med:hasVitals res:Vit_181 ; med:hasNote res:Note_181 .

res:Vit_181 a med:VitalSigns ;
    med:systolic 110 ; med:diastolic 73 ;
    med:heartRate 63 ; med:temperature 99.7 ;
    med:spo2 98 ;
    med:weightKg 91.9 ;
    med:bmi 31.4 .

res:Note_181 a med:ClinicalNote ;
    med:authorName "Dr. Karthik" ;
    med:date "2023-04-05"^^xsd:date ;
    med:noteText "Reviewed in clinic today. Referral raised to the relevant specialty." .

res:Enc_182 a med:Admission ;
    med:encounterOf res:Pat_BHA144 ; med:date "2023-12-13"^^xsd:date ;
    med:time "17:15" ;
    med:attendedBy res:Doc_Suresh ; med:inDepartment res:Dept_Endocrinology ;
    med:reason "Review of obesity" ;
    med:outcome "Admitted to ward" ;
    med:lengthOfStay 2 ;
    med:recordedCondition res:Cond_129 ;
    med:hasVitals res:Vit_182 ; med:hasNote res:Note_182 .

res:Vit_182 a med:VitalSigns ;
    med:systolic 115 ; med:diastolic 70 ;
    med:heartRate 84 ; med:temperature 98.5 ;
    med:spo2 96 ;
    med:weightKg 89.8 ;
    med:bmi 34.8 .

res:Note_182 a med:ClinicalNote ;
    med:authorName "Dr. Suresh" ;
    med:date "2023-12-13"^^xsd:date ;
    med:noteText "Post discharge review. Investigations ordered, will call with results." .

res:Enc_183 a med:Admission ;
    med:encounterOf res:Pat_BHA144 ; med:date "2024-08-10"^^xsd:date ;
    med:time "18:00" ;
    med:attendedBy res:Doc_Priya ; med:inDepartment res:Dept_Neurology ;
    med:reason "Review of stroke" ;
    med:outcome "Admitted to ward" ;
    med:lengthOfStay 11 ;
    med:recordedCondition res:Cond_130 ;
    med:hasVitals res:Vit_183 ; med:hasNote res:Note_183 .

res:Vit_183 a med:VitalSigns ;
    med:systolic 116 ; med:diastolic 84 ;
    med:heartRate 62 ; med:temperature 99.7 ;
    med:spo2 96 ;
    med:weightKg 103.4 ;
    med:bmi 31.4 .

res:Note_183 a med:ClinicalNote ;
    med:authorName "Dr. Priya" ;
    med:date "2024-08-10"^^xsd:date ;
    med:noteText "Presents with a two day history of symptoms. Reassured. No change to treatment at this stage." .

res:Rx_141 a med:Prescription ;
    med:prescribes res:Med_Warfarin ; med:prescribedBy res:Doc_Priya ;
    med:forPatient res:Pat_BHA144 ; med:date "2024-08-10"^^xsd:date ;
    med:dosage "1 dose" ;
    med:frequency "Twice daily" ;
    med:durationDays 7 ;
    med:dispensed true ;
    med:status "Completed" .

res:Rx_142 a med:Prescription ;
    med:prescribes res:Med_Clopidogrel ; med:prescribedBy res:Doc_Priya ;
    med:forPatient res:Pat_BHA144 ; med:date "2024-08-10"^^xsd:date ;
    med:dosage "1 tablet" ;
    med:frequency "Twice daily" ;
    med:durationDays 7 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_183 med:issuedPrescription res:Rx_141 , res:Rx_142 .
res:Pat_BHA144 med:hasPrescription res:Rx_141 , res:Rx_142 .

res:Lab_85 a med:LabOrder ;
    med:analyte "INR" ; med:forPatient res:Pat_BHA144 ;
    med:date "2024-08-10"^^xsd:date ; med:orderedBy res:Doc_Priya ;
    med:testsFor res:Stroke ;
    med:orderStatus "Resulted" ;
    med:hasResult res:Res_85 .

res:Res_85 a med:LabResult ;
    med:analyte "INR" ; med:value 1.33 ; med:unit "ratio" ;
    med:refLow 0.9 ; med:refHigh 1.2 ; med:outOfRange true ;
    med:date "2024-08-11"^^xsd:date ;
    med:performedBy res:Tech_Mohan .

res:Enc_183 med:orderedTest res:Lab_85 .

res:Inv_138 a med:Invoice ;
    med:forPatient res:Pat_BHA144 ; med:date "2024-08-10"^^xsd:date ;
    med:amount 163048 ; med:paid true ;
    med:status "Settled" .
res:Inv_138 med:coveredBy res:Policy_BHA144 .
res:Pat_BHA144 med:hasInvoice res:Inv_138 .

res:Enc_184 a med:EmergencyVisit ;
    med:encounterOf res:Pat_BHA144 ; med:date "2025-04-13"^^xsd:date ;
    med:time "09:30" ;
    med:attendedBy res:Doc_Karthik ; med:inDepartment res:Dept_Emergency ;
    med:reason "Acute presentation" ;
    med:outcome "Discharged with advice" ;
    med:recordedCondition res:Cond_128 ;
    med:hasVitals res:Vit_184 ; med:hasNote res:Note_184 .

res:Vit_184 a med:VitalSigns ;
    med:systolic 130 ; med:diastolic 68 ;
    med:heartRate 87 ; med:temperature 100.3 ;
    med:spo2 97 ;
    med:weightKg 85.5 ;
    med:bmi 31.6 .

res:Note_184 a med:ClinicalNote ;
    med:authorName "Dr. Karthik" ;
    med:date "2025-04-13"^^xsd:date ;
    med:noteText "Patient reports steady improvement since last visit. Continue current therapy, review in three months." .

res:Rx_143 a med:Prescription ;
    med:prescribes res:Med_Sertraline ; med:prescribedBy res:Doc_Karthik ;
    med:forPatient res:Pat_BHA144 ; med:date "2025-04-13"^^xsd:date ;
    med:dosage "1 dose" ;
    med:frequency "Once daily at night" ;
    med:durationDays 90 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_184 med:issuedPrescription res:Rx_143 .
res:Pat_BHA144 med:hasPrescription res:Rx_143 .

res:Inv_139 a med:Invoice ;
    med:forPatient res:Pat_BHA144 ; med:date "2025-04-13"^^xsd:date ;
    med:amount 14442 ; med:paid true ;
    med:status "Settled" .
res:Inv_139 med:coveredBy res:Policy_BHA144 .
res:Pat_BHA144 med:hasInvoice res:Inv_139 .

res:Enc_185 a med:FollowUp ;
    med:encounterOf res:Pat_BHA144 ; med:date "2025-12-23"^^xsd:date ;
    med:time "15:00" ;
    med:attendedBy res:Doc_Priya ; med:inDepartment res:Dept_Neurology ;
    med:reason "Review of stroke" ;
    med:outcome "Treatment continued" ;
    med:recordedCondition res:Cond_130 ;
    med:hasVitals res:Vit_185 ; med:hasNote res:Note_185 .

res:Vit_185 a med:VitalSigns ;
    med:systolic 129 ; med:diastolic 79 ;
    med:heartRate 82 ; med:temperature 98.4 ;
    med:spo2 97 ;
    med:weightKg 83.4 ;
    med:bmi 33.7 .

res:Note_185 a med:ClinicalNote ;
    med:authorName "Dr. Priya" ;
    med:date "2025-12-23"^^xsd:date ;
    med:noteText "Seen for worsening symptoms over the past week. Continue current therapy, review in three months." .

res:Rx_144 a med:Prescription ;
    med:prescribes res:Med_Warfarin ; med:prescribedBy res:Doc_Priya ;
    med:forPatient res:Pat_BHA144 ; med:date "2025-12-23"^^xsd:date ;
    med:dosage "1 tablet" ;
    med:frequency "Once daily" ;
    med:durationDays 5 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_185 med:issuedPrescription res:Rx_144 .
res:Pat_BHA144 med:hasPrescription res:Rx_144 .

res:Inv_140 a med:Invoice ;
    med:forPatient res:Pat_BHA144 ; med:date "2025-12-23"^^xsd:date ;
    med:amount 4647 ; med:paid true ;
    med:status "Settled" .
res:Inv_140 med:coveredBy res:Policy_BHA144 .
res:Pat_BHA144 med:hasInvoice res:Inv_140 .

res:Enc_186 a med:Consultation ;
    med:encounterOf res:Pat_BHA144 ; med:date "2026-08-27"^^xsd:date ;
    med:time "16:15" ;
    med:attendedBy res:Doc_Priya ; med:inDepartment res:Dept_Neurology ;
    med:reason "Review of dementia" ;
    med:outcome "Follow up scheduled" ;
    med:recordedCondition res:Cond_131 ;
    med:hasVitals res:Vit_186 ; med:hasNote res:Note_186 .

res:Vit_186 a med:VitalSigns ;
    med:systolic 110 ; med:diastolic 83 ;
    med:heartRate 75 ; med:temperature 97.6 ;
    med:spo2 99 ;
    med:weightKg 109.4 ;
    med:bmi 34.0 .

res:Note_186 a med:ClinicalNote ;
    med:authorName "Dr. Priya" ;
    med:date "2026-08-27"^^xsd:date ;
    med:noteText "Post discharge review. Dose adjusted, repeat bloods before next visit." .

res:Policy_BHA144 a med:InsurancePolicy ;
    med:policyNumber "NE-494517" ;
    med:issuedBy res:Ins_NewIndia ; med:coveragePercent 70 ;
    med:amount 750000 .
res:Pat_BHA144 med:hasPolicy res:Policy_BHA144 .

res:Appt_25 a med:Appointment ;
    med:forPatient res:Pat_BHA144 ; med:appointmentWith res:Doc_Leela ;
    med:date "2026-09-26"^^xsd:date ;
    med:time "17:40" ;
    med:inDepartment res:Dept_Psychiatry ;
    med:status "Scheduled" .
res:Pat_BHA144 med:hasAppointment res:Appt_25 .

res:Pat_VID145 a med:OutPatient ;
    med:name "Vidya Kumar" ; med:mrn "MRN-VID145" ; med:photoInitials "VK" ;
    med:sex "Female" ; med:dateOfBirth "1957-07-27"^^xsd:date ; med:age 69 ;
    med:bloodGroup "AB-" ; med:phone "+91 95660 941482" ; med:email "vidya.kumar@example.in" ;
    med:address "25 Anna Salai, Guindy, Chennai" ;
    med:primaryPhysician res:Doc_Joseph ;
    med:hasCondition res:Cond_132 .

res:Cond_132 a med:Condition ;
    med:ofDisease res:Dengue ; med:onsetDate "2025-02-24"^^xsd:date ;
    med:severity "Mild" ;
    med:clinicalStatus "Active" ;
    med:diagnosedBy res:Doc_Karthik .

res:Pat_VID145 med:hasEncounter res:Enc_187 , res:Enc_188 , res:Enc_189 , res:Enc_190 .

res:Enc_187 a med:Consultation ;
    med:encounterOf res:Pat_VID145 ; med:date "2023-07-28"^^xsd:date ;
    med:time "14:15" ;
    med:attendedBy res:Doc_Joseph ; med:inDepartment res:Dept_GeneralMedicine ;
    med:reason "First presentation" ;
    med:outcome "Follow up scheduled" ;
    med:recordedCondition res:Cond_132 ;
    med:hasVitals res:Vit_187 ; med:hasNote res:Note_187 .

res:Vit_187 a med:VitalSigns ;
    med:systolic 129 ; med:diastolic 78 ;
    med:heartRate 102 ; med:temperature 97.6 ;
    med:spo2 99 ;
    med:weightKg 61.1 ;
    med:bmi 26.1 .

res:Note_187 a med:ClinicalNote ;
    med:authorName "Dr. Joseph" ;
    med:date "2023-07-28"^^xsd:date ;
    med:noteText "Presents with a two day history of symptoms. Investigations ordered, will call with results." .

res:Lab_86 a med:LabOrder ;
    med:analyte "Platelet count" ; med:forPatient res:Pat_VID145 ;
    med:date "2023-07-28"^^xsd:date ; med:orderedBy res:Doc_Joseph ;
    med:testsFor res:Dengue ;
    med:orderStatus "Resulted" ;
    med:hasResult res:Res_86 .

res:Res_86 a med:LabResult ;
    med:analyte "Platelet count" ; med:value 193.15 ; med:unit "x10^3/uL" ;
    med:refLow 150 ; med:refHigh 450 ; med:outOfRange false ;
    med:date "2023-07-29"^^xsd:date ;
    med:performedBy res:Tech_Mohan .

res:Enc_187 med:orderedTest res:Lab_86 .

res:Inv_141 a med:Invoice ;
    med:forPatient res:Pat_VID145 ; med:date "2023-07-28"^^xsd:date ;
    med:amount 1637 ; med:paid true ;
    med:status "Settled" .
res:Inv_141 med:coveredBy res:Policy_VID145 .
res:Pat_VID145 med:hasInvoice res:Inv_141 .

res:Enc_188 a med:FollowUp ;
    med:encounterOf res:Pat_VID145 ; med:date "2024-08-18"^^xsd:date ;
    med:time "14:30" ;
    med:attendedBy res:Doc_Karthik ; med:inDepartment res:Dept_GeneralMedicine ;
    med:reason "Review of dengue" ;
    med:outcome "Follow up scheduled" ;
    med:recordedCondition res:Cond_132 ;
    med:hasVitals res:Vit_188 ; med:hasNote res:Note_188 .

res:Vit_188 a med:VitalSigns ;
    med:systolic 118 ; med:diastolic 82 ;
    med:heartRate 94 ; med:temperature 98.9 ;
    med:spo2 96 ;
    med:weightKg 69.6 ;
    med:bmi 20.7 .

res:Note_188 a med:ClinicalNote ;
    med:authorName "Dr. Karthik" ;
    med:date "2024-08-18"^^xsd:date ;
    med:noteText "Reviewed in clinic today. Counselled on medication adherence. Red flag symptoms explained." .

res:Lab_87 a med:LabOrder ;
    med:analyte "Platelet count" ; med:forPatient res:Pat_VID145 ;
    med:date "2024-08-18"^^xsd:date ; med:orderedBy res:Doc_Karthik ;
    med:testsFor res:Dengue ;
    med:orderStatus "Resulted" ;
    med:hasResult res:Res_87 .

res:Res_87 a med:LabResult ;
    med:analyte "Platelet count" ; med:value 125.78 ; med:unit "x10^3/uL" ;
    med:refLow 150 ; med:refHigh 450 ; med:outOfRange true ;
    med:date "2024-08-19"^^xsd:date ;
    med:performedBy res:Tech_Mohan .

res:Enc_188 med:orderedTest res:Lab_87 .

res:Inv_142 a med:Invoice ;
    med:forPatient res:Pat_VID145 ; med:date "2024-08-18"^^xsd:date ;
    med:amount 779 ; med:paid false ;
    med:status "Insurance claim pending" .
res:Inv_142 med:coveredBy res:Policy_VID145 .
res:Pat_VID145 med:hasInvoice res:Inv_142 .

res:Enc_189 a med:Consultation ;
    med:encounterOf res:Pat_VID145 ; med:date "2025-09-07"^^xsd:date ;
    med:time "18:45" ;
    med:attendedBy res:Doc_Joseph ; med:inDepartment res:Dept_GeneralMedicine ;
    med:reason "Review of dengue" ;
    med:outcome "Treatment continued" ;
    med:recordedCondition res:Cond_132 ;
    med:hasVitals res:Vit_189 ; med:hasNote res:Note_189 .

res:Vit_189 a med:VitalSigns ;
    med:systolic 129 ; med:diastolic 77 ;
    med:heartRate 77 ; med:temperature 100.3 ;
    med:spo2 96 ;
    med:weightKg 51.1 ;
    med:bmi 20.7 .

res:Note_189 a med:ClinicalNote ;
    med:authorName "Dr. Joseph" ;
    med:date "2025-09-07"^^xsd:date ;
    med:noteText "Seen for worsening symptoms over the past week. Counselled on medication adherence. Red flag symptoms explained." .

res:Rx_145 a med:Prescription ;
    med:prescribes res:Med_Paracetamol ; med:prescribedBy res:Doc_Joseph ;
    med:forPatient res:Pat_VID145 ; med:date "2025-09-07"^^xsd:date ;
    med:dosage "1 tablet" ;
    med:frequency "Once daily at night" ;
    med:durationDays 10 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_189 med:issuedPrescription res:Rx_145 .
res:Pat_VID145 med:hasPrescription res:Rx_145 .

res:Inv_143 a med:Invoice ;
    med:forPatient res:Pat_VID145 ; med:date "2025-09-07"^^xsd:date ;
    med:amount 6341 ; med:paid true ;
    med:status "Settled" .
res:Inv_143 med:coveredBy res:Policy_VID145 .
res:Pat_VID145 med:hasInvoice res:Inv_143 .

res:Enc_190 a med:Consultation ;
    med:encounterOf res:Pat_VID145 ; med:date "2026-08-19"^^xsd:date ;
    med:time "15:45" ;
    med:attendedBy res:Doc_Joseph ; med:inDepartment res:Dept_GeneralMedicine ;
    med:reason "Review of dengue" ;
    med:outcome "Referred for tests" ;
    med:recordedCondition res:Cond_132 ;
    med:hasVitals res:Vit_190 ; med:hasNote res:Note_190 .

res:Vit_190 a med:VitalSigns ;
    med:systolic 120 ; med:diastolic 67 ;
    med:heartRate 96 ; med:temperature 98.2 ;
    med:spo2 98 ;
    med:weightKg 51.1 ;
    med:bmi 23.3 .

res:Note_190 a med:ClinicalNote ;
    med:authorName "Dr. Joseph" ;
    med:date "2026-08-19"^^xsd:date ;
    med:noteText "Seen for worsening symptoms over the past week. Advised on diet, salt restriction and daily walking." .

res:Lab_88 a med:LabOrder ;
    med:analyte "Platelet count" ; med:forPatient res:Pat_VID145 ;
    med:date "2026-08-19"^^xsd:date ; med:orderedBy res:Doc_Joseph ;
    med:testsFor res:Dengue ;
    med:orderStatus "Pending" .

res:Enc_190 med:orderedTest res:Lab_88 .

res:Inv_144 a med:Invoice ;
    med:forPatient res:Pat_VID145 ; med:date "2026-08-19"^^xsd:date ;
    med:amount 1477 ; med:paid false ;
    med:status "Insurance claim pending" .
res:Inv_144 med:coveredBy res:Policy_VID145 .
res:Pat_VID145 med:hasInvoice res:Inv_144 .

res:Policy_VID145 a med:InsurancePolicy ;
    med:policyNumber "HD-891798" ;
    med:issuedBy res:Ins_HDFCErgo ; med:coveragePercent 75 ;
    med:amount 500000 .
res:Pat_VID145 med:hasPolicy res:Policy_VID145 .

res:Appt_26 a med:Appointment ;
    med:forPatient res:Pat_VID145 ; med:appointmentWith res:Doc_Joseph ;
    med:date "2026-09-12"^^xsd:date ;
    med:time "12:40" ;
    med:inDepartment res:Dept_GeneralMedicine ;
    med:status "Scheduled" .
res:Pat_VID145 med:hasAppointment res:Appt_26 .

res:Pat_IMR146 a med:OutPatient ;
    med:name "Imran Kumar" ; med:mrn "MRN-IMR146" ; med:photoInitials "IK" ;
    med:sex "Male" ; med:dateOfBirth "1949-08-14"^^xsd:date ; med:age 77 ;
    med:bloodGroup "AB-" ; med:phone "+91 98898 276138" ; med:email "imran.kumar@example.in" ;
    med:address "9 Rajiv Gandhi Salai, Kelambakkam, Chennai" ;
    med:primaryPhysician res:Doc_Vikram ;
    med:hasCondition res:Cond_133 , res:Cond_134 .

res:Cond_133 a med:Condition ;
    med:ofDisease res:Osteoarthritis ; med:onsetDate "2016-11-24"^^xsd:date ;
    med:severity "Moderate" ;
    med:clinicalStatus "Active" ;
    med:diagnosedBy res:Doc_Vikram .

res:Cond_134 a med:Condition ;
    med:ofDisease res:Obesity ; med:onsetDate "2024-12-27"^^xsd:date ;
    med:severity "Moderate" ;
    med:clinicalStatus "Active" ;
    med:diagnosedBy res:Doc_Nithya .

res:Pat_IMR146 med:hasEncounter res:Enc_191 , res:Enc_192 , res:Enc_193 .

res:Enc_191 a med:Consultation ;
    med:encounterOf res:Pat_IMR146 ; med:date "2023-11-20"^^xsd:date ;
    med:time "10:30" ;
    med:attendedBy res:Doc_Vikram ; med:inDepartment res:Dept_Orthopedics ;
    med:reason "First presentation" ;
    med:outcome "Discharged with advice" ;
    med:recordedCondition res:Cond_133 ;
    med:hasVitals res:Vit_191 ; med:hasNote res:Note_191 .

res:Vit_191 a med:VitalSigns ;
    med:systolic 115 ; med:diastolic 72 ;
    med:heartRate 69 ; med:temperature 98.8 ;
    med:spo2 99 ;
    med:weightKg 85.5 ;
    med:bmi 36.9 .

res:Note_191 a med:ClinicalNote ;
    med:authorName "Dr. Vikram" ;
    med:date "2023-11-20"^^xsd:date ;
    med:noteText "Presents with a two day history of symptoms. Counselled on medication adherence. Red flag symptoms explained." .

res:Rx_146 a med:Prescription ;
    med:prescribes res:Med_Ibuprofen ; med:prescribedBy res:Doc_Vikram ;
    med:forPatient res:Pat_IMR146 ; med:date "2023-11-20"^^xsd:date ;
    med:dosage "1 tablet" ;
    med:frequency "Twice daily" ;
    med:durationDays 30 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_191 med:issuedPrescription res:Rx_146 .
res:Pat_IMR146 med:hasPrescription res:Rx_146 .

res:Inv_145 a med:Invoice ;
    med:forPatient res:Pat_IMR146 ; med:date "2023-11-20"^^xsd:date ;
    med:amount 3044 ; med:paid true ;
    med:status "Settled" .
res:Inv_145 med:coveredBy res:Policy_IMR146 .
res:Pat_IMR146 med:hasInvoice res:Inv_145 .

res:Enc_192 a med:EmergencyVisit ;
    med:encounterOf res:Pat_IMR146 ; med:date "2025-04-14"^^xsd:date ;
    med:time "17:00" ;
    med:attendedBy res:Doc_Karthik ; med:inDepartment res:Dept_Emergency ;
    med:reason "Acute presentation" ;
    med:outcome "Referred for tests" ;
    med:recordedCondition res:Cond_133 ;
    med:hasVitals res:Vit_192 ; med:hasNote res:Note_192 .

res:Vit_192 a med:VitalSigns ;
    med:systolic 131 ; med:diastolic 84 ;
    med:heartRate 99 ; med:temperature 97.8 ;
    med:spo2 97 ;
    med:weightKg 103.9 ;
    med:bmi 34.8 .

res:Note_192 a med:ClinicalNote ;
    med:authorName "Dr. Karthik" ;
    med:date "2025-04-14"^^xsd:date ;
    med:noteText "Seen for worsening symptoms over the past week. Dose adjusted, repeat bloods before next visit." .

res:Inv_146 a med:Invoice ;
    med:forPatient res:Pat_IMR146 ; med:date "2025-04-14"^^xsd:date ;
    med:amount 14811 ; med:paid true ;
    med:status "Settled" .
res:Inv_146 med:coveredBy res:Policy_IMR146 .
res:Pat_IMR146 med:hasInvoice res:Inv_146 .

res:Enc_193 a med:Screening ;
    med:encounterOf res:Pat_IMR146 ; med:date "2026-08-27"^^xsd:date ;
    med:time "18:15" ;
    med:attendedBy res:Doc_Vikram ; med:inDepartment res:Dept_Orthopedics ;
    med:reason "Review of osteoarthritis" ;
    med:outcome "Referred for tests" ;
    med:recordedCondition res:Cond_133 ;
    med:hasVitals res:Vit_193 ; med:hasNote res:Note_193 .

res:Vit_193 a med:VitalSigns ;
    med:systolic 117 ; med:diastolic 79 ;
    med:heartRate 66 ; med:temperature 100.1 ;
    med:spo2 100 ;
    med:weightKg 103.5 ;
    med:bmi 35.0 .

res:Note_193 a med:ClinicalNote ;
    med:authorName "Dr. Vikram" ;
    med:date "2026-08-27"^^xsd:date ;
    med:noteText "Referred from general medicine for specialist opinion. Reassured. No change to treatment at this stage." .

res:Inv_147 a med:Invoice ;
    med:forPatient res:Pat_IMR146 ; med:date "2026-08-27"^^xsd:date ;
    med:amount 3472 ; med:paid false ;
    med:status "Insurance claim pending" .
res:Inv_147 med:coveredBy res:Policy_IMR146 .
res:Pat_IMR146 med:hasInvoice res:Inv_147 .

res:Policy_IMR146 a med:InsurancePolicy ;
    med:policyNumber "HD-109331" ;
    med:issuedBy res:Ins_HDFCErgo ; med:coveragePercent 75 ;
    med:amount 1000000 .
res:Pat_IMR146 med:hasPolicy res:Policy_IMR146 .

res:Pat_DIN147 a med:OutPatient ;
    med:name "Dinesh Prabhu" ; med:mrn "MRN-DIN147" ; med:photoInitials "DP" ;
    med:sex "Male" ; med:dateOfBirth "1970-06-15"^^xsd:date ; med:age 56 ;
    med:bloodGroup "B-" ; med:phone "+91 95935 684793" ; med:email "dinesh.prabhu@example.in" ;
    med:address "26 Velachery Main Road, Perungudi, Chennai" ;
    med:primaryPhysician res:Doc_Vikram ;
    med:hasCondition res:Cond_135 , res:Cond_136 , res:Cond_137 , res:Cond_138 , res:Cond_139 .

res:Cond_135 a med:Condition ;
    med:ofDisease res:Osteoarthritis ; med:onsetDate "2018-06-04"^^xsd:date ;
    med:severity "Moderate" ;
    med:clinicalStatus "Active" ;
    med:diagnosedBy res:Doc_Vikram .

res:Cond_136 a med:Condition ;
    med:ofDisease res:Obesity ; med:onsetDate "2020-12-17"^^xsd:date ;
    med:severity "Mild" ;
    med:clinicalStatus "Active" ;
    med:diagnosedBy res:Doc_Suresh .

res:Cond_137 a med:Condition ;
    med:ofDisease res:RheumatoidArthritis ; med:onsetDate "2019-10-01"^^xsd:date ;
    med:severity "Mild" ;
    med:clinicalStatus "Active" ;
    med:diagnosedBy res:Doc_Vikram .

res:Cond_138 a med:Condition , med:CriticalCondition ;
    med:ofDisease res:BreastCancer ; med:onsetDate "2025-07-08"^^xsd:date ;
    med:severity "Severe" ;
    med:clinicalStatus "Active" ;
    med:diagnosedBy res:Doc_Anand .

res:Cond_139 a med:Condition ;
    med:ofDisease res:Anemia ; med:onsetDate "2026-04-15"^^xsd:date ;
    med:severity "Moderate" ;
    med:clinicalStatus "Active" ;
    med:diagnosedBy res:Doc_Suresh .

res:Pat_DIN147 med:hasEncounter res:Enc_194 , res:Enc_195 , res:Enc_196 , res:Enc_197 , res:Enc_198 , res:Enc_199 .

res:Enc_194 a med:Consultation ;
    med:encounterOf res:Pat_DIN147 ; med:date "2023-04-04"^^xsd:date ;
    med:time "09:45" ;
    med:attendedBy res:Doc_Vikram ; med:inDepartment res:Dept_Orthopedics ;
    med:reason "First presentation" ;
    med:outcome "Referred for tests" ;
    med:recordedCondition res:Cond_135 ;
    med:hasVitals res:Vit_194 ; med:hasNote res:Note_194 .

res:Vit_194 a med:VitalSigns ;
    med:systolic 127 ; med:diastolic 72 ;
    med:heartRate 82 ; med:temperature 100.5 ;
    med:spo2 100 ;
    med:weightKg 83.3 ;
    med:bmi 36.7 .

res:Note_194 a med:ClinicalNote ;
    med:authorName "Dr. Vikram" ;
    med:date "2023-04-04"^^xsd:date ;
    med:noteText "Presents with a two day history of symptoms. Referral raised to the relevant specialty." .

res:Rx_147 a med:Prescription ;
    med:prescribes res:Med_Ibuprofen ; med:prescribedBy res:Doc_Vikram ;
    med:forPatient res:Pat_DIN147 ; med:date "2023-04-04"^^xsd:date ;
    med:dosage "1 tablet" ;
    med:frequency "Once daily" ;
    med:durationDays 60 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_194 med:issuedPrescription res:Rx_147 .
res:Pat_DIN147 med:hasPrescription res:Rx_147 .

res:Inv_148 a med:Invoice ;
    med:forPatient res:Pat_DIN147 ; med:date "2023-04-04"^^xsd:date ;
    med:amount 2866 ; med:paid true ;
    med:status "Settled" .
res:Inv_148 med:coveredBy res:Policy_DIN147 .
res:Pat_DIN147 med:hasInvoice res:Inv_148 .

res:Enc_195 a med:FollowUp ;
    med:encounterOf res:Pat_DIN147 ; med:date "2023-12-15"^^xsd:date ;
    med:time "17:45" ;
    med:attendedBy res:Doc_Anand ; med:inDepartment res:Dept_Oncology ;
    med:reason "Review of breast cancer" ;
    med:outcome "Treatment continued" ;
    med:recordedCondition res:Cond_138 ;
    med:hasVitals res:Vit_195 ; med:hasNote res:Note_195 .

res:Vit_195 a med:VitalSigns ;
    med:systolic 114 ; med:diastolic 68 ;
    med:heartRate 86 ; med:temperature 98.8 ;
    med:spo2 96 ;
    med:weightKg 96.6 ;
    med:bmi 36.4 .

res:Note_195 a med:ClinicalNote ;
    med:authorName "Dr. Anand" ;
    med:date "2023-12-15"^^xsd:date ;
    med:noteText "Patient reports steady improvement since last visit. Continue current therapy, review in three months." .

res:Rx_148 a med:Prescription ;
    med:prescribes res:Med_Tamoxifen ; med:prescribedBy res:Doc_Anand ;
    med:forPatient res:Pat_DIN147 ; med:date "2023-12-15"^^xsd:date ;
    med:dosage "2 tablets" ;
    med:frequency "Twice daily" ;
    med:durationDays 7 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_195 med:issuedPrescription res:Rx_148 .
res:Pat_DIN147 med:hasPrescription res:Rx_148 .

res:Lab_89 a med:LabOrder ;
    med:analyte "CA 15-3" ; med:forPatient res:Pat_DIN147 ;
    med:date "2023-12-15"^^xsd:date ; med:orderedBy res:Doc_Anand ;
    med:testsFor res:BreastCancer ;
    med:orderStatus "Resulted" ;
    med:hasResult res:Res_89 .

res:Res_89 a med:LabResult ;
    med:analyte "CA 15-3" ; med:value 93.46 ; med:unit "U/mL" ;
    med:refLow 0 ; med:refHigh 30 ; med:outOfRange true ;
    med:date "2023-12-16"^^xsd:date ;
    med:performedBy res:Tech_Mohan .

res:Enc_195 med:orderedTest res:Lab_89 .

res:Inv_149 a med:Invoice ;
    med:forPatient res:Pat_DIN147 ; med:date "2023-12-15"^^xsd:date ;
    med:amount 4157 ; med:paid true ;
    med:status "Settled" .
res:Inv_149 med:coveredBy res:Policy_DIN147 .
res:Pat_DIN147 med:hasInvoice res:Inv_149 .

res:Enc_196 a med:Consultation ;
    med:encounterOf res:Pat_DIN147 ; med:date "2024-08-08"^^xsd:date ;
    med:time "16:45" ;
    med:attendedBy res:Doc_Suresh ; med:inDepartment res:Dept_GeneralMedicine ;
    med:reason "Review of anemia" ;
    med:outcome "Referred for tests" ;
    med:recordedCondition res:Cond_139 ;
    med:hasVitals res:Vit_196 ; med:hasNote res:Note_196 .

res:Vit_196 a med:VitalSigns ;
    med:systolic 112 ; med:diastolic 83 ;
    med:heartRate 95 ; med:temperature 100.5 ;
    med:spo2 97 ;
    med:weightKg 86.0 ;
    med:bmi 33.9 .

res:Note_196 a med:ClinicalNote ;
    med:authorName "Dr. Suresh" ;
    med:date "2024-08-08"^^xsd:date ;
    med:noteText "Seen for worsening symptoms over the past week. Referral raised to the relevant specialty." .

res:Rx_149 a med:Prescription ;
    med:prescribes res:Med_IronFolate ; med:prescribedBy res:Doc_Suresh ;
    med:forPatient res:Pat_DIN147 ; med:date "2024-08-08"^^xsd:date ;
    med:dosage "1 dose" ;
    med:frequency "Twice daily" ;
    med:durationDays 14 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_196 med:issuedPrescription res:Rx_149 .
res:Pat_DIN147 med:hasPrescription res:Rx_149 .

res:Lab_90 a med:LabOrder ;
    med:analyte "Haemoglobin" ; med:forPatient res:Pat_DIN147 ;
    med:date "2024-08-08"^^xsd:date ; med:orderedBy res:Doc_Suresh ;
    med:testsFor res:Anemia ;
    med:orderStatus "Resulted" ;
    med:hasResult res:Res_90 .

res:Res_90 a med:LabResult ;
    med:analyte "Haemoglobin" ; med:value 12.84 ; med:unit "g/dL" ;
    med:refLow 12 ; med:refHigh 15.5 ; med:outOfRange false ;
    med:date "2024-08-09"^^xsd:date ;
    med:performedBy res:Tech_Mohan .

res:Enc_196 med:orderedTest res:Lab_90 .

res:Enc_197 a med:Admission ;
    med:encounterOf res:Pat_DIN147 ; med:date "2025-04-07"^^xsd:date ;
    med:time "16:45" ;
    med:attendedBy res:Doc_Joseph ; med:inDepartment res:Dept_GeneralMedicine ;
    med:reason "Review of anemia" ;
    med:outcome "Admitted to ward" ;
    med:lengthOfStay 2 ;
    med:recordedCondition res:Cond_139 ;
    med:hasVitals res:Vit_197 ; med:hasNote res:Note_197 .

res:Vit_197 a med:VitalSigns ;
    med:systolic 126 ; med:diastolic 69 ;
    med:heartRate 84 ; med:temperature 99.7 ;
    med:spo2 97 ;
    med:weightKg 90.3 ;
    med:bmi 37.9 .

res:Note_197 a med:ClinicalNote ;
    med:authorName "Dr. Joseph" ;
    med:date "2025-04-07"^^xsd:date ;
    med:noteText "Attends for scheduled follow up. Counselled on medication adherence. Red flag symptoms explained." .

res:Rx_150 a med:Prescription ;
    med:prescribes res:Med_IronFolate ; med:prescribedBy res:Doc_Joseph ;
    med:forPatient res:Pat_DIN147 ; med:date "2025-04-07"^^xsd:date ;
    med:dosage "1 dose" ;
    med:frequency "Three times daily" ;
    med:durationDays 5 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_197 med:issuedPrescription res:Rx_150 .
res:Pat_DIN147 med:hasPrescription res:Rx_150 .

res:Lab_91 a med:LabOrder ;
    med:analyte "Haemoglobin" ; med:forPatient res:Pat_DIN147 ;
    med:date "2025-04-07"^^xsd:date ; med:orderedBy res:Doc_Joseph ;
    med:testsFor res:Anemia ;
    med:orderStatus "Resulted" ;
    med:hasResult res:Res_91 .

res:Res_91 a med:LabResult ;
    med:analyte "Haemoglobin" ; med:value 12.62 ; med:unit "g/dL" ;
    med:refLow 12 ; med:refHigh 15.5 ; med:outOfRange false ;
    med:date "2025-04-08"^^xsd:date ;
    med:performedBy res:Tech_Mohan .

res:Enc_197 med:orderedTest res:Lab_91 .

res:Inv_150 a med:Invoice ;
    med:forPatient res:Pat_DIN147 ; med:date "2025-04-07"^^xsd:date ;
    med:amount 328285 ; med:paid true ;
    med:status "Settled" .
res:Inv_150 med:coveredBy res:Policy_DIN147 .
res:Pat_DIN147 med:hasInvoice res:Inv_150 .

res:Enc_198 a med:EmergencyVisit ;
    med:encounterOf res:Pat_DIN147 ; med:date "2025-12-08"^^xsd:date ;
    med:time "12:00" ;
    med:attendedBy res:Doc_Karthik ; med:inDepartment res:Dept_Emergency ;
    med:reason "Acute presentation" ;
    med:outcome "Follow up scheduled" ;
    med:recordedCondition res:Cond_139 ;
    med:hasVitals res:Vit_198 ; med:hasNote res:Note_198 .

res:Vit_198 a med:VitalSigns ;
    med:systolic 132 ; med:diastolic 77 ;
    med:heartRate 80 ; med:temperature 98.2 ;
    med:spo2 100 ;
    med:weightKg 89.6 ;
    med:bmi 31.6 .

res:Note_198 a med:ClinicalNote ;
    med:authorName "Dr. Karthik" ;
    med:date "2025-12-08"^^xsd:date ;
    med:noteText "Patient reports steady improvement since last visit. Referral raised to the relevant specialty." .

res:Lab_92 a med:LabOrder ;
    med:analyte "Haemoglobin" ; med:forPatient res:Pat_DIN147 ;
    med:date "2025-12-08"^^xsd:date ; med:orderedBy res:Doc_Karthik ;
    med:testsFor res:Anemia ;
    med:orderStatus "Resulted" ;
    med:hasResult res:Res_92 .

res:Res_92 a med:LabResult ;
    med:analyte "Haemoglobin" ; med:value 13.24 ; med:unit "g/dL" ;
    med:refLow 12 ; med:refHigh 15.5 ; med:outOfRange false ;
    med:date "2025-12-09"^^xsd:date ;
    med:performedBy res:Tech_Mohan .

res:Enc_198 med:orderedTest res:Lab_92 .

res:Enc_199 a med:FollowUp ;
    med:encounterOf res:Pat_DIN147 ; med:date "2026-08-30"^^xsd:date ;
    med:time "09:45" ;
    med:attendedBy res:Doc_Vikram ; med:inDepartment res:Dept_Orthopedics ;
    med:reason "Review of rheumatoid arthritis" ;
    med:outcome "Referred for tests" ;
    med:recordedCondition res:Cond_137 ;
    med:hasVitals res:Vit_199 ; med:hasNote res:Note_199 .

res:Vit_199 a med:VitalSigns ;
    med:systolic 116 ; med:diastolic 70 ;
    med:heartRate 88 ; med:temperature 99.8 ;
    med:spo2 96 ;
    med:weightKg 109.6 ;
    med:bmi 37.9 .

res:Note_199 a med:ClinicalNote ;
    med:authorName "Dr. Vikram" ;
    med:date "2026-08-30"^^xsd:date ;
    med:noteText "Routine review, no new complaints. Investigations ordered, will call with results." .

res:Rx_151 a med:Prescription ;
    med:prescribes res:Med_Methotrexate ; med:prescribedBy res:Doc_Vikram ;
    med:forPatient res:Pat_DIN147 ; med:date "2026-08-30"^^xsd:date ;
    med:dosage "1 tablet" ;
    med:frequency "As required" ;
    med:durationDays 90 ;
    med:dispensed false ;
    med:status "Active" .

res:Enc_199 med:issuedPrescription res:Rx_151 .
res:Pat_DIN147 med:hasPrescription res:Rx_151 .

res:Inv_151 a med:Invoice ;
    med:forPatient res:Pat_DIN147 ; med:date "2026-08-30"^^xsd:date ;
    med:amount 5103 ; med:paid false ;
    med:status "Insurance claim pending" .
res:Inv_151 med:coveredBy res:Policy_DIN147 .
res:Pat_DIN147 med:hasInvoice res:Inv_151 .

res:Policy_DIN147 a med:InsurancePolicy ;
    med:policyNumber "HD-586318" ;
    med:issuedBy res:Ins_HDFCErgo ; med:coveragePercent 60 ;
    med:amount 750000 .
res:Pat_DIN147 med:hasPolicy res:Policy_DIN147 .

res:Appt_27 a med:Appointment ;
    med:forPatient res:Pat_DIN147 ; med:appointmentWith res:Doc_Vikram ;
    med:date "2026-10-06"^^xsd:date ;
    med:time "09:40" ;
    med:inDepartment res:Dept_Orthopedics ;
    med:status "Scheduled" .
res:Pat_DIN147 med:hasAppointment res:Appt_27 .

res:Pat_SAN148 a med:OutPatient ;
    med:name "Sangeetha Shetty" ; med:mrn "MRN-SAN148" ; med:photoInitials "SS" ;
    med:sex "Female" ; med:dateOfBirth "2007-12-16"^^xsd:date ; med:age 18 ;
    med:bloodGroup "A-" ; med:phone "+91 97320 937381" ; med:email "sangeetha.shetty@example.in" ;
    med:address "81 GST Road, Velachery, Chennai" ;
    med:primaryPhysician res:Doc_Sameer ;
    med:hasCondition res:Cond_140 , res:Cond_141 .

res:Cond_140 a med:Condition ;
    med:ofDisease res:Asthma ; med:onsetDate "2024-10-28"^^xsd:date ;
    med:severity "Moderate" ;
    med:clinicalStatus "Active" ;
    med:diagnosedBy res:Doc_Sameer .

res:Cond_141 a med:Condition ;
    med:ofDisease res:Dengue ; med:onsetDate "2026-02-20"^^xsd:date ;
    med:severity "Moderate" ;
    med:clinicalStatus "Resolved" ;
    med:resolvedDate "2026-08-18"^^xsd:date ;
    med:diagnosedBy res:Doc_Joseph .

res:Pat_SAN148 med:hasEncounter res:Enc_200 , res:Enc_201 , res:Enc_202 , res:Enc_203 .

res:Enc_200 a med:EmergencyVisit ;
    med:encounterOf res:Pat_SAN148 ; med:date "2023-08-09"^^xsd:date ;
    med:time "09:00" ;
    med:attendedBy res:Doc_Karthik ; med:inDepartment res:Dept_Emergency ;
    med:reason "Acute presentation" ;
    med:outcome "Follow up scheduled" ;
    med:recordedCondition res:Cond_141 ;
    med:hasVitals res:Vit_200 ; med:hasNote res:Note_200 .

res:Vit_200 a med:VitalSigns ;
    med:systolic 113 ; med:diastolic 81 ;
    med:heartRate 62 ; med:temperature 98.2 ;
    med:spo2 94 ;
    med:weightKg 54.1 ;
    med:bmi 23.5 .

res:Note_200 a med:ClinicalNote ;
    med:authorName "Dr. Karthik" ;
    med:date "2023-08-09"^^xsd:date ;
    med:noteText "Presents with a two day history of symptoms. Counselled on medication adherence. Red flag symptoms explained." .

res:Lab_93 a med:LabOrder ;
    med:analyte "Platelet count" ; med:forPatient res:Pat_SAN148 ;
    med:date "2023-08-09"^^xsd:date ; med:orderedBy res:Doc_Karthik ;
    med:testsFor res:Dengue ;
    med:orderStatus "Resulted" ;
    med:hasResult res:Res_93 .

res:Res_93 a med:LabResult ;
    med:analyte "Platelet count" ; med:value 57.9 ; med:unit "x10^3/uL" ;
    med:refLow 150 ; med:refHigh 450 ; med:outOfRange true ;
    med:date "2023-08-10"^^xsd:date ;
    med:performedBy res:Tech_Mohan .

res:Enc_200 med:orderedTest res:Lab_93 .

res:Enc_201 a med:Consultation ;
    med:encounterOf res:Pat_SAN148 ; med:date "2024-07-28"^^xsd:date ;
    med:time "16:30" ;
    med:attendedBy res:Doc_Sameer ; med:inDepartment res:Dept_Pulmonology ;
    med:reason "Review of asthma" ;
    med:outcome "Referred for tests" ;
    med:recordedCondition res:Cond_140 ;
    med:hasVitals res:Vit_201 ; med:hasNote res:Note_201 .

res:Vit_201 a med:VitalSigns ;
    med:systolic 125 ; med:diastolic 75 ;
    med:heartRate 98 ; med:temperature 99.2 ;
    med:spo2 89 ;
    med:weightKg 56.8 ;
    med:bmi 25.3 .

res:Note_201 a med:ClinicalNote ;
    med:authorName "Dr. Sameer" ;
    med:date "2024-07-28"^^xsd:date ;
    med:noteText "Seen for worsening symptoms over the past week. Advised on diet, salt restriction and daily walking." .

res:Inv_152 a med:Invoice ;
    med:forPatient res:Pat_SAN148 ; med:date "2024-07-28"^^xsd:date ;
    med:amount 4934 ; med:paid true ;
    med:status "Settled" .
res:Inv_152 med:coveredBy res:Policy_SAN148 .
res:Pat_SAN148 med:hasInvoice res:Inv_152 .

res:Enc_202 a med:DayCareVisit ;
    med:encounterOf res:Pat_SAN148 ; med:date "2025-09-05"^^xsd:date ;
    med:time "08:30" ;
    med:attendedBy res:Doc_Sameer ; med:inDepartment res:Dept_Pulmonology ;
    med:reason "Review of asthma" ;
    med:outcome "Referred for tests" ;
    med:recordedCondition res:Cond_140 ;
    med:hasVitals res:Vit_202 ; med:hasNote res:Note_202 .

res:Vit_202 a med:VitalSigns ;
    med:systolic 113 ; med:diastolic 73 ;
    med:heartRate 85 ; med:temperature 100.2 ;
    med:spo2 91 ;
    med:weightKg 73.7 ;
    med:bmi 21.9 .

res:Note_202 a med:ClinicalNote ;
    med:authorName "Dr. Sameer" ;
    med:date "2025-09-05"^^xsd:date ;
    med:noteText "Reviewed in clinic today. Referral raised to the relevant specialty." .

res:Rx_152 a med:Prescription ;
    med:prescribes res:Med_Salbutamol ; med:prescribedBy res:Doc_Sameer ;
    med:forPatient res:Pat_SAN148 ; med:date "2025-09-05"^^xsd:date ;
    med:dosage "1 tablet" ;
    med:frequency "Twice daily" ;
    med:durationDays 30 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_202 med:issuedPrescription res:Rx_152 .
res:Pat_SAN148 med:hasPrescription res:Rx_152 .

res:Inv_153 a med:Invoice ;
    med:forPatient res:Pat_SAN148 ; med:date "2025-09-05"^^xsd:date ;
    med:amount 1060 ; med:paid true ;
    med:status "Settled" .
res:Inv_153 med:coveredBy res:Policy_SAN148 .
res:Pat_SAN148 med:hasInvoice res:Inv_153 .

res:Enc_203 a med:Consultation ;
    med:encounterOf res:Pat_SAN148 ; med:date "2026-08-30"^^xsd:date ;
    med:time "15:00" ;
    med:attendedBy res:Doc_Joseph ; med:inDepartment res:Dept_GeneralMedicine ;
    med:reason "Review of dengue" ;
    med:outcome "Discharged with advice" ;
    med:recordedCondition res:Cond_141 ;
    med:hasVitals res:Vit_203 ; med:hasNote res:Note_203 .

res:Vit_203 a med:VitalSigns ;
    med:systolic 132 ; med:diastolic 75 ;
    med:heartRate 62 ; med:temperature 97.6 ;
    med:spo2 94 ;
    med:weightKg 73.5 ;
    med:bmi 19.1 .

res:Note_203 a med:ClinicalNote ;
    med:authorName "Dr. Joseph" ;
    med:date "2026-08-30"^^xsd:date ;
    med:noteText "Post discharge review. Counselled on medication adherence. Red flag symptoms explained." .

res:Inv_154 a med:Invoice ;
    med:forPatient res:Pat_SAN148 ; med:date "2026-08-30"^^xsd:date ;
    med:amount 3395 ; med:paid false ;
    med:status "Insurance claim pending" .
res:Inv_154 med:coveredBy res:Policy_SAN148 .
res:Pat_SAN148 med:hasInvoice res:Inv_154 .

res:Policy_SAN148 a med:InsurancePolicy ;
    med:policyNumber "NE-746075" ;
    med:issuedBy res:Ins_NewIndia ; med:coveragePercent 80 ;
    med:amount 200000 .
res:Pat_SAN148 med:hasPolicy res:Policy_SAN148 .

res:Appt_28 a med:Appointment ;
    med:forPatient res:Pat_SAN148 ; med:appointmentWith res:Doc_Sameer ;
    med:date "2026-09-26"^^xsd:date ;
    med:time "11:20" ;
    med:inDepartment res:Dept_Pulmonology ;
    med:status "Scheduled" .
res:Pat_SAN148 med:hasAppointment res:Appt_28 .

res:Pat_ARA149 a med:OutPatient ;
    med:name "Aravind Sundaram" ; med:mrn "MRN-ARA149" ; med:photoInitials "AS" ;
    med:sex "Male" ; med:dateOfBirth "1954-07-01"^^xsd:date ; med:age 72 ;
    med:bloodGroup "A+" ; med:phone "+91 96853 995531" ; med:email "aravind.sundaram@example.in" ;
    med:address "67 ECR, Guindy, Chennai" ;
    med:primaryPhysician res:Doc_Nithya ;
    med:hasCondition res:Cond_142 , res:Cond_143 , res:Cond_144 , res:Cond_145 , res:Cond_146 , res:Cond_147 .

res:Cond_142 a med:Condition ;
    med:ofDisease res:Hypothyroidism ; med:onsetDate "2018-09-24"^^xsd:date ;
    med:severity "Moderate" ;
    med:clinicalStatus "Active" ;
    med:diagnosedBy res:Doc_Nithya .

res:Cond_143 a med:Condition ;
    med:ofDisease res:Obesity ; med:onsetDate "2019-01-18"^^xsd:date ;
    med:severity "Moderate" ;
    med:clinicalStatus "Active" ;
    med:diagnosedBy res:Doc_Suresh .

res:Cond_144 a med:Condition ;
    med:ofDisease res:Dyslipidemia ; med:onsetDate "2023-10-27"^^xsd:date ;
    med:severity "Mild" ;
    med:clinicalStatus "Active" ;
    med:diagnosedBy res:Doc_Joseph .

res:Cond_145 a med:Condition ;
    med:ofDisease res:Depression ; med:onsetDate "2024-02-12"^^xsd:date ;
    med:severity "Moderate" ;
    med:clinicalStatus "Active" ;
    med:diagnosedBy res:Doc_Leela .

res:Cond_146 a med:Condition ;
    med:ofDisease res:CoronaryArteryDisease ; med:onsetDate "2018-08-13"^^xsd:date ;
    med:severity "Mild" ;
    med:clinicalStatus "Active" ;
    med:diagnosedBy res:Doc_Ramesh .

res:Cond_147 a med:Condition , med:CriticalCondition ;
    med:ofDisease res:MyocardialInfarction ; med:onsetDate "2025-12-22"^^xsd:date ;
    med:severity "Severe" ;
    med:clinicalStatus "Resolved" ;
    med:resolvedDate "2026-04-05"^^xsd:date ;
    med:diagnosedBy res:Doc_Farida .

res:Pat_ARA149 med:hasEncounter res:Enc_204 , res:Enc_205 , res:Enc_206 , res:Enc_207 , res:Enc_208 , res:Enc_209 , res:Enc_210 , res:Enc_211 , res:Enc_212 .

res:Enc_204 a med:Consultation ;
    med:encounterOf res:Pat_ARA149 ; med:date "2022-12-31"^^xsd:date ;
    med:time "17:15" ;
    med:attendedBy res:Doc_Ramesh ; med:inDepartment res:Dept_Cardiology ;
    med:reason "First presentation" ;
    med:outcome "Treatment continued" ;
    med:recordedCondition res:Cond_147 ;
    med:hasVitals res:Vit_204 ; med:hasNote res:Note_204 .

res:Vit_204 a med:VitalSigns ;
    med:systolic 119 ; med:diastolic 72 ;
    med:heartRate 96 ; med:temperature 99.6 ;
    med:spo2 98 ;
    med:weightKg 78.7 ;
    med:bmi 37.8 .

res:Note_204 a med:ClinicalNote ;
    med:authorName "Dr. Ramesh" ;
    med:date "2022-12-31"^^xsd:date ;
    med:noteText "Post discharge review. Reassured. No change to treatment at this stage." .

res:Lab_94 a med:LabOrder ;
    med:analyte "Troponin I" ; med:forPatient res:Pat_ARA149 ;
    med:date "2022-12-31"^^xsd:date ; med:orderedBy res:Doc_Ramesh ;
    med:testsFor res:MyocardialInfarction ;
    med:orderStatus "Resulted" ;
    med:hasResult res:Res_94 .

res:Res_94 a med:LabResult ;
    med:analyte "Troponin I" ; med:value 4.57 ; med:unit "ng/mL" ;
    med:refLow 0 ; med:refHigh 0.04 ; med:outOfRange true ;
    med:date "2023-01-01"^^xsd:date ;
    med:performedBy res:Tech_Mohan .

res:Enc_204 med:orderedTest res:Lab_94 .

res:Enc_205 a med:Consultation ;
    med:encounterOf res:Pat_ARA149 ; med:date "2023-07-07"^^xsd:date ;
    med:time "18:00" ;
    med:attendedBy res:Doc_Nithya ; med:inDepartment res:Dept_Endocrinology ;
    med:reason "Review of obesity" ;
    med:outcome "Discharged with advice" ;
    med:recordedCondition res:Cond_143 ;
    med:hasVitals res:Vit_205 ; med:hasNote res:Note_205 .

res:Vit_205 a med:VitalSigns ;
    med:systolic 111 ; med:diastolic 82 ;
    med:heartRate 80 ; med:temperature 98.1 ;
    med:spo2 100 ;
    med:weightKg 86.8 ;
    med:bmi 37.9 .

res:Note_205 a med:ClinicalNote ;
    med:authorName "Dr. Nithya" ;
    med:date "2023-07-07"^^xsd:date ;
    med:noteText "Post discharge review. Referral raised to the relevant specialty." .

res:Enc_206 a med:Consultation ;
    med:encounterOf res:Pat_ARA149 ; med:date "2023-12-05"^^xsd:date ;
    med:time "14:15" ;
    med:attendedBy res:Doc_Ramesh ; med:inDepartment res:Dept_Cardiology ;
    med:reason "Review of myocardial infarction" ;
    med:outcome "Discharged with advice" ;
    med:recordedCondition res:Cond_147 ;
    med:hasVitals res:Vit_206 ; med:hasNote res:Note_206 .

res:Vit_206 a med:VitalSigns ;
    med:systolic 134 ; med:diastolic 69 ;
    med:heartRate 95 ; med:temperature 98.2 ;
    med:spo2 100 ;
    med:weightKg 98.4 ;
    med:bmi 31.3 .

res:Note_206 a med:ClinicalNote ;
    med:authorName "Dr. Ramesh" ;
    med:date "2023-12-05"^^xsd:date ;
    med:noteText "Referred from general medicine for specialist opinion. Counselled on medication adherence. Red flag symptoms explained." .

res:Rx_153 a med:Prescription ;
    med:prescribes res:Med_Aspirin ; med:prescribedBy res:Doc_Ramesh ;
    med:forPatient res:Pat_ARA149 ; med:date "2023-12-05"^^xsd:date ;
    med:dosage "2 tablets" ;
    med:frequency "Three times daily" ;
    med:durationDays 5 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_206 med:issuedPrescription res:Rx_153 .
res:Pat_ARA149 med:hasPrescription res:Rx_153 .

res:Lab_95 a med:LabOrder ;
    med:analyte "Troponin I" ; med:forPatient res:Pat_ARA149 ;
    med:date "2023-12-05"^^xsd:date ; med:orderedBy res:Doc_Ramesh ;
    med:testsFor res:MyocardialInfarction ;
    med:orderStatus "Resulted" ;
    med:hasResult res:Res_95 .

res:Res_95 a med:LabResult ;
    med:analyte "Troponin I" ; med:value 12.42 ; med:unit "ng/mL" ;
    med:refLow 0 ; med:refHigh 0.04 ; med:outOfRange true ;
    med:date "2023-12-06"^^xsd:date ;
    med:performedBy res:Tech_Mohan .

res:Enc_206 med:orderedTest res:Lab_95 .

res:Inv_155 a med:Invoice ;
    med:forPatient res:Pat_ARA149 ; med:date "2023-12-05"^^xsd:date ;
    med:amount 1597 ; med:paid true ;
    med:status "Settled" .
res:Pat_ARA149 med:hasInvoice res:Inv_155 .

res:Enc_207 a med:EmergencyVisit ;
    med:encounterOf res:Pat_ARA149 ; med:date "2024-06-07"^^xsd:date ;
    med:time "12:00" ;
    med:attendedBy res:Doc_Karthik ; med:inDepartment res:Dept_Emergency ;
    med:reason "Acute presentation" ;
    med:outcome "Follow up scheduled" ;
    med:recordedCondition res:Cond_144 ;
    med:hasVitals res:Vit_207 ; med:hasNote res:Note_207 .

res:Vit_207 a med:VitalSigns ;
    med:systolic 119 ; med:diastolic 76 ;
    med:heartRate 62 ; med:temperature 97.3 ;
    med:spo2 96 ;
    med:weightKg 94.5 ;
    med:bmi 33.3 .

res:Note_207 a med:ClinicalNote ;
    med:authorName "Dr. Karthik" ;
    med:date "2024-06-07"^^xsd:date ;
    med:noteText "Patient reports steady improvement since last visit. Advised on diet, salt restriction and daily walking." .

res:Rx_154 a med:Prescription ;
    med:prescribes res:Med_Atorvastatin ; med:prescribedBy res:Doc_Karthik ;
    med:forPatient res:Pat_ARA149 ; med:date "2024-06-07"^^xsd:date ;
    med:dosage "1 tablet" ;
    med:frequency "Once daily" ;
    med:durationDays 90 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_207 med:issuedPrescription res:Rx_154 .
res:Pat_ARA149 med:hasPrescription res:Rx_154 .

res:Lab_96 a med:LabOrder ;
    med:analyte "LDL cholesterol" ; med:forPatient res:Pat_ARA149 ;
    med:date "2024-06-07"^^xsd:date ; med:orderedBy res:Doc_Karthik ;
    med:testsFor res:Dyslipidemia ;
    med:orderStatus "Resulted" ;
    med:hasResult res:Res_96 .

res:Res_96 a med:LabResult ;
    med:analyte "LDL cholesterol" ; med:value 146.93 ; med:unit "mg/dL" ;
    med:refLow 0 ; med:refHigh 100 ; med:outOfRange true ;
    med:date "2024-06-08"^^xsd:date ;
    med:performedBy res:Tech_Mohan .

res:Lab_97 a med:LabOrder ;
    med:analyte "Triglycerides" ; med:forPatient res:Pat_ARA149 ;
    med:date "2024-06-07"^^xsd:date ; med:orderedBy res:Doc_Karthik ;
    med:testsFor res:Dyslipidemia ;
    med:orderStatus "Resulted" ;
    med:hasResult res:Res_97 .

res:Res_97 a med:LabResult ;
    med:analyte "Triglycerides" ; med:value 159.76 ; med:unit "mg/dL" ;
    med:refLow 0 ; med:refHigh 150 ; med:outOfRange true ;
    med:date "2024-06-08"^^xsd:date ;
    med:performedBy res:Tech_Mohan .

res:Enc_207 med:orderedTest res:Lab_96 , res:Lab_97 .

res:Inv_156 a med:Invoice ;
    med:forPatient res:Pat_ARA149 ; med:date "2024-06-07"^^xsd:date ;
    med:amount 29426 ; med:paid true ;
    med:status "Settled" .
res:Pat_ARA149 med:hasInvoice res:Inv_156 .

res:Enc_208 a med:FollowUp ;
    med:encounterOf res:Pat_ARA149 ; med:date "2024-11-06"^^xsd:date ;
    med:time "10:30" ;
    med:attendedBy res:Doc_Leela ; med:inDepartment res:Dept_Psychiatry ;
    med:reason "Review of depression" ;
    med:outcome "Follow up scheduled" ;
    med:recordedCondition res:Cond_145 ;
    med:hasVitals res:Vit_208 ; med:hasNote res:Note_208 .

res:Vit_208 a med:VitalSigns ;
    med:systolic 133 ; med:diastolic 76 ;
    med:heartRate 100 ; med:temperature 98.1 ;
    med:spo2 100 ;
    med:weightKg 107.9 ;
    med:bmi 34.8 .

res:Note_208 a med:ClinicalNote ;
    med:authorName "Dr. Leela" ;
    med:date "2024-11-06"^^xsd:date ;
    med:noteText "Reviewed in clinic today. Reassured. No change to treatment at this stage." .

res:Rx_155 a med:Prescription ;
    med:prescribes res:Med_Sertraline ; med:prescribedBy res:Doc_Leela ;
    med:forPatient res:Pat_ARA149 ; med:date "2024-11-06"^^xsd:date ;
    med:dosage "2 tablets" ;
    med:frequency "As required" ;
    med:durationDays 90 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_208 med:issuedPrescription res:Rx_155 .
res:Pat_ARA149 med:hasPrescription res:Rx_155 .

res:Inv_157 a med:Invoice ;
    med:forPatient res:Pat_ARA149 ; med:date "2024-11-06"^^xsd:date ;
    med:amount 2572 ; med:paid true ;
    med:status "Settled" .
res:Pat_ARA149 med:hasInvoice res:Inv_157 .

res:Enc_209 a med:EmergencyVisit ;
    med:encounterOf res:Pat_ARA149 ; med:date "2025-04-04"^^xsd:date ;
    med:time "10:15" ;
    med:attendedBy res:Doc_Karthik ; med:inDepartment res:Dept_Emergency ;
    med:reason "Acute presentation" ;
    med:outcome "Discharged with advice" ;
    med:recordedCondition res:Cond_143 ;
    med:hasVitals res:Vit_209 ; med:hasNote res:Note_209 .

res:Vit_209 a med:VitalSigns ;
    med:systolic 131 ; med:diastolic 73 ;
    med:heartRate 94 ; med:temperature 99.2 ;
    med:spo2 98 ;
    med:weightKg 87.4 ;
    med:bmi 31.7 .

res:Note_209 a med:ClinicalNote ;
    med:authorName "Dr. Karthik" ;
    med:date "2025-04-04"^^xsd:date ;
    med:noteText "Post discharge review. Counselled on medication adherence. Red flag symptoms explained." .

res:Inv_158 a med:Invoice ;
    med:forPatient res:Pat_ARA149 ; med:date "2025-04-04"^^xsd:date ;
    med:amount 11192 ; med:paid false ;
    med:status "Awaiting payment" .
res:Pat_ARA149 med:hasInvoice res:Inv_158 .

res:Enc_210 a med:Consultation ;
    med:encounterOf res:Pat_ARA149 ; med:date "2025-09-16"^^xsd:date ;
    med:time "15:30" ;
    med:attendedBy res:Doc_Nithya ; med:inDepartment res:Dept_Endocrinology ;
    med:reason "Review of hypothyroidism" ;
    med:outcome "Referred for tests" ;
    med:recordedCondition res:Cond_142 ;
    med:hasVitals res:Vit_210 ; med:hasNote res:Note_210 .

res:Vit_210 a med:VitalSigns ;
    med:systolic 127 ; med:diastolic 68 ;
    med:heartRate 66 ; med:temperature 97.8 ;
    med:spo2 97 ;
    med:weightKg 96.1 ;
    med:bmi 34.3 .

res:Note_210 a med:ClinicalNote ;
    med:authorName "Dr. Nithya" ;
    med:date "2025-09-16"^^xsd:date ;
    med:noteText "Referred from general medicine for specialist opinion. Dose adjusted, repeat bloods before next visit." .

res:Rx_156 a med:Prescription ;
    med:prescribes res:Med_Levothyroxine ; med:prescribedBy res:Doc_Nithya ;
    med:forPatient res:Pat_ARA149 ; med:date "2025-09-16"^^xsd:date ;
    med:dosage "1 tablet" ;
    med:frequency "As required" ;
    med:durationDays 90 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_210 med:issuedPrescription res:Rx_156 .
res:Pat_ARA149 med:hasPrescription res:Rx_156 .

res:Enc_211 a med:Consultation ;
    med:encounterOf res:Pat_ARA149 ; med:date "2026-03-20"^^xsd:date ;
    med:time "10:15" ;
    med:attendedBy res:Doc_Leela ; med:inDepartment res:Dept_Psychiatry ;
    med:reason "Review of depression" ;
    med:outcome "Follow up scheduled" ;
    med:recordedCondition res:Cond_145 ;
    med:hasVitals res:Vit_211 ; med:hasNote res:Note_211 .

res:Vit_211 a med:VitalSigns ;
    med:systolic 114 ; med:diastolic 81 ;
    med:heartRate 101 ; med:temperature 99.9 ;
    med:spo2 100 ;
    med:weightKg 81.2 ;
    med:bmi 33.3 .

res:Note_211 a med:ClinicalNote ;
    med:authorName "Dr. Leela" ;
    med:date "2026-03-20"^^xsd:date ;
    med:noteText "Post discharge review. Investigations ordered, will call with results." .

res:Inv_159 a med:Invoice ;
    med:forPatient res:Pat_ARA149 ; med:date "2026-03-20"^^xsd:date ;
    med:amount 1752 ; med:paid true ;
    med:status "Settled" .
res:Pat_ARA149 med:hasInvoice res:Inv_159 .

res:Enc_212 a med:FollowUp ;
    med:encounterOf res:Pat_ARA149 ; med:date "2026-08-18"^^xsd:date ;
    med:time "16:00" ;
    med:attendedBy res:Doc_Nithya ; med:inDepartment res:Dept_Endocrinology ;
    med:reason "Review of hypothyroidism" ;
    med:outcome "Discharged with advice" ;
    med:recordedCondition res:Cond_142 ;
    med:hasVitals res:Vit_212 ; med:hasNote res:Note_212 .

res:Vit_212 a med:VitalSigns ;
    med:systolic 123 ; med:diastolic 84 ;
    med:heartRate 88 ; med:temperature 99.7 ;
    med:spo2 99 ;
    med:weightKg 101.1 ;
    med:bmi 35.4 .

res:Note_212 a med:ClinicalNote ;
    med:authorName "Dr. Nithya" ;
    med:date "2026-08-18"^^xsd:date ;
    med:noteText "Reviewed in clinic today. Advised on diet, salt restriction and daily walking." .

res:Rx_157 a med:Prescription ;
    med:prescribes res:Med_Levothyroxine ; med:prescribedBy res:Doc_Nithya ;
    med:forPatient res:Pat_ARA149 ; med:date "2026-08-18"^^xsd:date ;
    med:dosage "2 tablets" ;
    med:frequency "Twice daily" ;
    med:durationDays 30 ;
    med:dispensed false ;
    med:status "Active" .

res:Enc_212 med:issuedPrescription res:Rx_157 .
res:Pat_ARA149 med:hasPrescription res:Rx_157 .

res:Lab_98 a med:LabOrder ;
    med:analyte "TSH" ; med:forPatient res:Pat_ARA149 ;
    med:date "2026-08-18"^^xsd:date ; med:orderedBy res:Doc_Nithya ;
    med:testsFor res:Hypothyroidism ;
    med:orderStatus "Pending" .

res:Enc_212 med:orderedTest res:Lab_98 .

res:Inv_160 a med:Invoice ;
    med:forPatient res:Pat_ARA149 ; med:date "2026-08-18"^^xsd:date ;
    med:amount 4655 ; med:paid false ;
    med:status "Awaiting payment" .
res:Pat_ARA149 med:hasInvoice res:Inv_160 .

res:Appt_29 a med:Appointment ;
    med:forPatient res:Pat_ARA149 ; med:appointmentWith res:Doc_Nithya ;
    med:date "2026-10-01"^^xsd:date ;
    med:time "14:00" ;
    med:inDepartment res:Dept_Endocrinology ;
    med:status "Scheduled" .
res:Pat_ARA149 med:hasAppointment res:Appt_29 .

res:Pat_ASH150 a med:OutPatient ;
    med:name "Ashok Shetty" ; med:mrn "MRN-ASH150" ; med:photoInitials "AS" ;
    med:sex "Male" ; med:dateOfBirth "1966-12-26"^^xsd:date ; med:age 59 ;
    med:bloodGroup "A+" ; med:phone "+91 97294 773256" ; med:email "ashok.shetty@example.in" ;
    med:address "16 Velachery Main Road, Adyar, Chennai" ;
    med:primaryPhysician res:Doc_Joseph ;
    med:hasCondition res:Cond_148 .

res:Cond_148 a med:Condition ;
    med:ofDisease res:Migraine ; med:onsetDate "2025-09-05"^^xsd:date ;
    med:severity "Moderate" ;
    med:clinicalStatus "Active" ;
    med:diagnosedBy res:Doc_Priya .

res:Pat_ASH150 med:hasEncounter res:Enc_213 , res:Enc_214 .

res:Enc_213 a med:Consultation ;
    med:encounterOf res:Pat_ASH150 ; med:date "2024-08-22"^^xsd:date ;
    med:time "13:30" ;
    med:attendedBy res:Doc_Priya ; med:inDepartment res:Dept_Neurology ;
    med:reason "First presentation" ;
    med:outcome "Follow up scheduled" ;
    med:recordedCondition res:Cond_148 ;
    med:hasVitals res:Vit_213 ; med:hasNote res:Note_213 .

res:Vit_213 a med:VitalSigns ;
    med:systolic 127 ; med:diastolic 76 ;
    med:heartRate 89 ; med:temperature 98.7 ;
    med:spo2 99 ;
    med:weightKg 58.2 ;
    med:bmi 25.5 .

res:Note_213 a med:ClinicalNote ;
    med:authorName "Dr. Priya" ;
    med:date "2024-08-22"^^xsd:date ;
    med:noteText "Seen for worsening symptoms over the past week. Continue current therapy, review in three months." .

res:Rx_158 a med:Prescription ;
    med:prescribes res:Med_Ibuprofen ; med:prescribedBy res:Doc_Priya ;
    med:forPatient res:Pat_ASH150 ; med:date "2024-08-22"^^xsd:date ;
    med:dosage "2 tablets" ;
    med:frequency "Once daily" ;
    med:durationDays 7 ;
    med:dispensed true ;
    med:status "Completed" .

res:Rx_159 a med:Prescription ;
    med:prescribes res:Med_Paracetamol ; med:prescribedBy res:Doc_Priya ;
    med:forPatient res:Pat_ASH150 ; med:date "2024-08-22"^^xsd:date ;
    med:dosage "1 dose" ;
    med:frequency "As required" ;
    med:durationDays 14 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_213 med:issuedPrescription res:Rx_158 , res:Rx_159 .
res:Pat_ASH150 med:hasPrescription res:Rx_158 , res:Rx_159 .

res:Inv_161 a med:Invoice ;
    med:forPatient res:Pat_ASH150 ; med:date "2024-08-22"^^xsd:date ;
    med:amount 726 ; med:paid true ;
    med:status "Settled" .
res:Inv_161 med:coveredBy res:Policy_ASH150 .
res:Pat_ASH150 med:hasInvoice res:Inv_161 .

res:Enc_214 a med:FollowUp ;
    med:encounterOf res:Pat_ASH150 ; med:date "2026-08-30"^^xsd:date ;
    med:time "16:00" ;
    med:attendedBy res:Doc_Joseph ; med:inDepartment res:Dept_Neurology ;
    med:reason "Review of migraine" ;
    med:outcome "Follow up scheduled" ;
    med:recordedCondition res:Cond_148 ;
    med:hasVitals res:Vit_214 ; med:hasNote res:Note_214 .

res:Vit_214 a med:VitalSigns ;
    med:systolic 131 ; med:diastolic 80 ;
    med:heartRate 101 ; med:temperature 99.5 ;
    med:spo2 100 ;
    med:weightKg 75.0 ;
    med:bmi 19.1 .

res:Note_214 a med:ClinicalNote ;
    med:authorName "Dr. Joseph" ;
    med:date "2026-08-30"^^xsd:date ;
    med:noteText "Presents with a two day history of symptoms. Counselled on medication adherence. Red flag symptoms explained." .

res:Inv_162 a med:Invoice ;
    med:forPatient res:Pat_ASH150 ; med:date "2026-08-30"^^xsd:date ;
    med:amount 3455 ; med:paid true ;
    med:status "Settled" .
res:Inv_162 med:coveredBy res:Policy_ASH150 .
res:Pat_ASH150 med:hasInvoice res:Inv_162 .

res:Policy_ASH150 a med:InsurancePolicy ;
    med:policyNumber "NE-629331" ;
    med:issuedBy res:Ins_NewIndia ; med:coveragePercent 90 ;
    med:amount 200000 .
res:Pat_ASH150 med:hasPolicy res:Policy_ASH150 .

res:Appt_30 a med:Appointment ;
    med:forPatient res:Pat_ASH150 ; med:appointmentWith res:Doc_Priya ;
    med:date "2026-09-04"^^xsd:date ;
    med:time "15:00" ;
    med:inDepartment res:Dept_Neurology ;
    med:status "Scheduled" .
res:Pat_ASH150 med:hasAppointment res:Appt_30 .

res:Pat_KIR151 a med:OutPatient ;
    med:name "Kiran Das" ; med:mrn "MRN-KIR151" ; med:photoInitials "KD" ;
    med:sex "Male" ; med:dateOfBirth "1948-11-16"^^xsd:date ; med:age 77 ;
    med:bloodGroup "A-" ; med:phone "+91 93336 859028" ; med:email "kiran.das@example.in" ;
    med:address "89 Bharathi Street, Sholinganallur, Chennai" ;
    med:primaryPhysician res:Doc_Vikram ;
    med:hasCondition res:Cond_149 , res:Cond_150 .

res:Cond_149 a med:Condition ;
    med:ofDisease res:Osteoarthritis ; med:onsetDate "2022-09-04"^^xsd:date ;
    med:severity "Moderate" ;
    med:clinicalStatus "Active" ;
    med:diagnosedBy res:Doc_Vikram .

res:Cond_150 a med:Condition ;
    med:ofDisease res:Obesity ; med:onsetDate "2024-01-15"^^xsd:date ;
    med:severity "Moderate" ;
    med:clinicalStatus "Active" ;
    med:diagnosedBy res:Doc_Nithya .

res:Pat_KIR151 med:hasEncounter res:Enc_215 , res:Enc_216 , res:Enc_217 , res:Enc_218 , res:Enc_219 , res:Enc_220 .

res:Enc_215 a med:Consultation ;
    med:encounterOf res:Pat_KIR151 ; med:date "2023-03-29"^^xsd:date ;
    med:time "17:15" ;
    med:attendedBy res:Doc_Vikram ; med:inDepartment res:Dept_Orthopedics ;
    med:reason "First presentation" ;
    med:outcome "Follow up scheduled" ;
    med:recordedCondition res:Cond_149 ;
    med:hasVitals res:Vit_215 ; med:hasNote res:Note_215 .

res:Vit_215 a med:VitalSigns ;
    med:systolic 112 ; med:diastolic 83 ;
    med:heartRate 92 ; med:temperature 100.0 ;
    med:spo2 97 ;
    med:weightKg 97.5 ;
    med:bmi 34.8 .

res:Note_215 a med:ClinicalNote ;
    med:authorName "Dr. Vikram" ;
    med:date "2023-03-29"^^xsd:date ;
    med:noteText "Reviewed in clinic today. Counselled on medication adherence. Red flag symptoms explained." .

res:Rx_160 a med:Prescription ;
    med:prescribes res:Med_Ibuprofen ; med:prescribedBy res:Doc_Vikram ;
    med:forPatient res:Pat_KIR151 ; med:date "2023-03-29"^^xsd:date ;
    med:dosage "2 tablets" ;
    med:frequency "As required" ;
    med:durationDays 30 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_215 med:issuedPrescription res:Rx_160 .
res:Pat_KIR151 med:hasPrescription res:Rx_160 .

res:Enc_216 a med:FollowUp ;
    med:encounterOf res:Pat_KIR151 ; med:date "2023-12-21"^^xsd:date ;
    med:time "14:15" ;
    med:attendedBy res:Doc_Suresh ; med:inDepartment res:Dept_Endocrinology ;
    med:reason "Review of obesity" ;
    med:outcome "Follow up scheduled" ;
    med:recordedCondition res:Cond_150 ;
    med:hasVitals res:Vit_216 ; med:hasNote res:Note_216 .

res:Vit_216 a med:VitalSigns ;
    med:systolic 111 ; med:diastolic 79 ;
    med:heartRate 86 ; med:temperature 98.7 ;
    med:spo2 100 ;
    med:weightKg 101.4 ;
    med:bmi 34.5 .

res:Note_216 a med:ClinicalNote ;
    med:authorName "Dr. Suresh" ;
    med:date "2023-12-21"^^xsd:date ;
    med:noteText "Referred from general medicine for specialist opinion. Continue current therapy, review in three months." .

res:Inv_163 a med:Invoice ;
    med:forPatient res:Pat_KIR151 ; med:date "2023-12-21"^^xsd:date ;
    med:amount 4915 ; med:paid true ;
    med:status "Settled" .
res:Inv_163 med:coveredBy res:Policy_KIR151 .
res:Pat_KIR151 med:hasInvoice res:Inv_163 .

res:Enc_217 a med:DayCareVisit ;
    med:encounterOf res:Pat_KIR151 ; med:date "2024-08-09"^^xsd:date ;
    med:time "09:45" ;
    med:attendedBy res:Doc_Vikram ; med:inDepartment res:Dept_Orthopedics ;
    med:reason "Review of osteoarthritis" ;
    med:outcome "Treatment continued" ;
    med:recordedCondition res:Cond_149 ;
    med:hasVitals res:Vit_217 ; med:hasNote res:Note_217 .

res:Vit_217 a med:VitalSigns ;
    med:systolic 116 ; med:diastolic 77 ;
    med:heartRate 87 ; med:temperature 97.8 ;
    med:spo2 97 ;
    med:weightKg 88.6 ;
    med:bmi 34.8 .

res:Note_217 a med:ClinicalNote ;
    med:authorName "Dr. Vikram" ;
    med:date "2024-08-09"^^xsd:date ;
    med:noteText "Referred from general medicine for specialist opinion. Continue current therapy, review in three months." .

res:Rx_161 a med:Prescription ;
    med:prescribes res:Med_Ibuprofen ; med:prescribedBy res:Doc_Vikram ;
    med:forPatient res:Pat_KIR151 ; med:date "2024-08-09"^^xsd:date ;
    med:dosage "1 tablet" ;
    med:frequency "Three times daily" ;
    med:durationDays 90 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_217 med:issuedPrescription res:Rx_161 .
res:Pat_KIR151 med:hasPrescription res:Rx_161 .

res:Inv_164 a med:Invoice ;
    med:forPatient res:Pat_KIR151 ; med:date "2024-08-09"^^xsd:date ;
    med:amount 1675 ; med:paid true ;
    med:status "Settled" .
res:Inv_164 med:coveredBy res:Policy_KIR151 .
res:Pat_KIR151 med:hasInvoice res:Inv_164 .

res:Enc_218 a med:FollowUp ;
    med:encounterOf res:Pat_KIR151 ; med:date "2025-04-03"^^xsd:date ;
    med:time "18:30" ;
    med:attendedBy res:Doc_Nithya ; med:inDepartment res:Dept_Endocrinology ;
    med:reason "Review of obesity" ;
    med:outcome "Treatment continued" ;
    med:recordedCondition res:Cond_150 ;
    med:hasVitals res:Vit_218 ; med:hasNote res:Note_218 .

res:Vit_218 a med:VitalSigns ;
    med:systolic 116 ; med:diastolic 74 ;
    med:heartRate 84 ; med:temperature 100.4 ;
    med:spo2 96 ;
    med:weightKg 86.6 ;
    med:bmi 34.0 .

res:Note_218 a med:ClinicalNote ;
    med:authorName "Dr. Nithya" ;
    med:date "2025-04-03"^^xsd:date ;
    med:noteText "Reviewed in clinic today. Investigations ordered, will call with results." .

res:Enc_219 a med:Consultation ;
    med:encounterOf res:Pat_KIR151 ; med:date "2025-12-10"^^xsd:date ;
    med:time "10:15" ;
    med:attendedBy res:Doc_Nithya ; med:inDepartment res:Dept_Endocrinology ;
    med:reason "Review of obesity" ;
    med:outcome "Treatment continued" ;
    med:recordedCondition res:Cond_150 ;
    med:hasVitals res:Vit_219 ; med:hasNote res:Note_219 .

res:Vit_219 a med:VitalSigns ;
    med:systolic 125 ; med:diastolic 77 ;
    med:heartRate 75 ; med:temperature 97.6 ;
    med:spo2 98 ;
    med:weightKg 82.3 ;
    med:bmi 38.0 .

res:Note_219 a med:ClinicalNote ;
    med:authorName "Dr. Nithya" ;
    med:date "2025-12-10"^^xsd:date ;
    med:noteText "Presents with a two day history of symptoms. Investigations ordered, will call with results." .

res:Enc_220 a med:Consultation ;
    med:encounterOf res:Pat_KIR151 ; med:date "2026-08-30"^^xsd:date ;
    med:time "09:30" ;
    med:attendedBy res:Doc_Suresh ; med:inDepartment res:Dept_Endocrinology ;
    med:reason "Review of obesity" ;
    med:outcome "Referred for tests" ;
    med:recordedCondition res:Cond_150 ;
    med:hasVitals res:Vit_220 ; med:hasNote res:Note_220 .

res:Vit_220 a med:VitalSigns ;
    med:systolic 129 ; med:diastolic 80 ;
    med:heartRate 73 ; med:temperature 99.3 ;
    med:spo2 99 ;
    med:weightKg 100.1 ;
    med:bmi 38.2 .

res:Note_220 a med:ClinicalNote ;
    med:authorName "Dr. Suresh" ;
    med:date "2026-08-30"^^xsd:date ;
    med:noteText "Presents with a two day history of symptoms. Dose adjusted, repeat bloods before next visit." .

res:Inv_165 a med:Invoice ;
    med:forPatient res:Pat_KIR151 ; med:date "2026-08-30"^^xsd:date ;
    med:amount 2153 ; med:paid false ;
    med:status "Insurance claim pending" .
res:Inv_165 med:coveredBy res:Policy_KIR151 .
res:Pat_KIR151 med:hasInvoice res:Inv_165 .

res:Policy_KIR151 a med:InsurancePolicy ;
    med:policyNumber "CG-337169" ;
    med:issuedBy res:Ins_CGHS ; med:coveragePercent 75 ;
    med:amount 300000 .
res:Pat_KIR151 med:hasPolicy res:Policy_KIR151 .

res:Pat_DEE152 a med:OutPatient ;
    med:name "Deepa Begum" ; med:mrn "MRN-DEE152" ; med:photoInitials "DB" ;
    med:sex "Female" ; med:dateOfBirth "1961-06-27"^^xsd:date ; med:age 65 ;
    med:bloodGroup "O+" ; med:phone "+91 93531 386921" ; med:email "deepa.begum@example.in" ;
    med:address "26 ECR, Velachery, Chennai" ;
    med:primaryPhysician res:Doc_Karthik ;
    med:hasCondition res:Cond_151 , res:Cond_152 .

res:Cond_151 a med:Condition ;
    med:ofDisease res:Dengue ; med:onsetDate "2026-08-16"^^xsd:date ;
    med:severity "Moderate" ;
    med:clinicalStatus "Active" ;
    med:diagnosedBy res:Doc_Joseph .

res:Cond_152 a med:Condition ;
    med:ofDisease res:Migraine ; med:onsetDate "2026-08-25"^^xsd:date ;
    med:severity "Moderate" ;
    med:clinicalStatus "Active" ;
    med:diagnosedBy res:Doc_Priya .

res:Pat_DEE152 med:hasEncounter res:Enc_221 , res:Enc_222 , res:Enc_223 .

res:Enc_221 a med:EmergencyVisit ;
    med:encounterOf res:Pat_DEE152 ; med:date "2023-11-19"^^xsd:date ;
    med:time "08:45" ;
    med:attendedBy res:Doc_Karthik ; med:inDepartment res:Dept_Emergency ;
    med:reason "Acute presentation" ;
    med:outcome "Discharged with advice" ;
    med:recordedCondition res:Cond_152 ;
    med:hasVitals res:Vit_221 ; med:hasNote res:Note_221 .

res:Vit_221 a med:VitalSigns ;
    med:systolic 110 ; med:diastolic 82 ;
    med:heartRate 97 ; med:temperature 99.3 ;
    med:spo2 100 ;
    med:weightKg 64.0 ;
    med:bmi 20.5 .

res:Note_221 a med:ClinicalNote ;
    med:authorName "Dr. Karthik" ;
    med:date "2023-11-19"^^xsd:date ;
    med:noteText "Attends for scheduled follow up. Reassured. No change to treatment at this stage." .

res:Rx_162 a med:Prescription ;
    med:prescribes res:Med_Paracetamol ; med:prescribedBy res:Doc_Karthik ;
    med:forPatient res:Pat_DEE152 ; med:date "2023-11-19"^^xsd:date ;
    med:dosage "1 tablet" ;
    med:frequency "Twice daily" ;
    med:durationDays 10 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_221 med:issuedPrescription res:Rx_162 .
res:Pat_DEE152 med:hasPrescription res:Rx_162 .

res:Inv_166 a med:Invoice ;
    med:forPatient res:Pat_DEE152 ; med:date "2023-11-19"^^xsd:date ;
    med:amount 24233 ; med:paid true ;
    med:status "Settled" .
res:Inv_166 med:coveredBy res:Policy_DEE152 .
res:Pat_DEE152 med:hasInvoice res:Inv_166 .

res:Enc_222 a med:Consultation ;
    med:encounterOf res:Pat_DEE152 ; med:date "2025-04-27"^^xsd:date ;
    med:time "15:45" ;
    med:attendedBy res:Doc_Karthik ; med:inDepartment res:Dept_GeneralMedicine ;
    med:reason "Review of dengue" ;
    med:outcome "Referred for tests" ;
    med:recordedCondition res:Cond_151 ;
    med:hasVitals res:Vit_222 ; med:hasNote res:Note_222 .

res:Vit_222 a med:VitalSigns ;
    med:systolic 121 ; med:diastolic 73 ;
    med:heartRate 83 ; med:temperature 98.6 ;
    med:spo2 97 ;
    med:weightKg 70.9 ;
    med:bmi 25.8 .

res:Note_222 a med:ClinicalNote ;
    med:authorName "Dr. Karthik" ;
    med:date "2025-04-27"^^xsd:date ;
    med:noteText "Attends for scheduled follow up. Counselled on medication adherence. Red flag symptoms explained." .

res:Rx_163 a med:Prescription ;
    med:prescribes res:Med_Paracetamol ; med:prescribedBy res:Doc_Karthik ;
    med:forPatient res:Pat_DEE152 ; med:date "2025-04-27"^^xsd:date ;
    med:dosage "1 dose" ;
    med:frequency "Twice daily" ;
    med:durationDays 14 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_222 med:issuedPrescription res:Rx_163 .
res:Pat_DEE152 med:hasPrescription res:Rx_163 .

res:Lab_99 a med:LabOrder ;
    med:analyte "Platelet count" ; med:forPatient res:Pat_DEE152 ;
    med:date "2025-04-27"^^xsd:date ; med:orderedBy res:Doc_Karthik ;
    med:testsFor res:Dengue ;
    med:orderStatus "Resulted" ;
    med:hasResult res:Res_99 .

res:Res_99 a med:LabResult ;
    med:analyte "Platelet count" ; med:value 200.3 ; med:unit "x10^3/uL" ;
    med:refLow 150 ; med:refHigh 450 ; med:outOfRange false ;
    med:date "2025-04-28"^^xsd:date ;
    med:performedBy res:Tech_Mohan .

res:Enc_222 med:orderedTest res:Lab_99 .

res:Inv_167 a med:Invoice ;
    med:forPatient res:Pat_DEE152 ; med:date "2025-04-27"^^xsd:date ;
    med:amount 4959 ; med:paid true ;
    med:status "Settled" .
res:Inv_167 med:coveredBy res:Policy_DEE152 .
res:Pat_DEE152 med:hasInvoice res:Inv_167 .

res:Enc_223 a med:FollowUp ;
    med:encounterOf res:Pat_DEE152 ; med:date "2026-08-16"^^xsd:date ;
    med:time "13:45" ;
    med:attendedBy res:Doc_Joseph ; med:inDepartment res:Dept_Neurology ;
    med:reason "Review of migraine" ;
    med:outcome "Discharged with advice" ;
    med:recordedCondition res:Cond_152 ;
    med:hasVitals res:Vit_223 ; med:hasNote res:Note_223 .

res:Vit_223 a med:VitalSigns ;
    med:systolic 109 ; med:diastolic 68 ;
    med:heartRate 72 ; med:temperature 98.1 ;
    med:spo2 97 ;
    med:weightKg 60.9 ;
    med:bmi 19.6 .

res:Note_223 a med:ClinicalNote ;
    med:authorName "Dr. Joseph" ;
    med:date "2026-08-16"^^xsd:date ;
    med:noteText "Attends for scheduled follow up. Referral raised to the relevant specialty." .

res:Rx_164 a med:Prescription ;
    med:prescribes res:Med_Ibuprofen ; med:prescribedBy res:Doc_Joseph ;
    med:forPatient res:Pat_DEE152 ; med:date "2026-08-16"^^xsd:date ;
    med:dosage "1 tablet" ;
    med:frequency "Three times daily" ;
    med:durationDays 10 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_223 med:issuedPrescription res:Rx_164 .
res:Pat_DEE152 med:hasPrescription res:Rx_164 .

res:Inv_168 a med:Invoice ;
    med:forPatient res:Pat_DEE152 ; med:date "2026-08-16"^^xsd:date ;
    med:amount 5700 ; med:paid false ;
    med:status "Insurance claim pending" .
res:Inv_168 med:coveredBy res:Policy_DEE152 .
res:Pat_DEE152 med:hasInvoice res:Inv_168 .

res:Policy_DEE152 a med:InsurancePolicy ;
    med:policyNumber "CG-166479" ;
    med:issuedBy res:Ins_CGHS ; med:coveragePercent 70 ;
    med:amount 500000 .
res:Pat_DEE152 med:hasPolicy res:Policy_DEE152 .

res:Appt_31 a med:Appointment ;
    med:forPatient res:Pat_DEE152 ; med:appointmentWith res:Doc_Karthik ;
    med:date "2026-09-07"^^xsd:date ;
    med:time "12:20" ;
    med:inDepartment res:Dept_GeneralMedicine ;
    med:status "Scheduled" .
res:Pat_DEE152 med:hasAppointment res:Appt_31 .

res:Pat_SHA153 a med:OutPatient ;
    med:name "Shalini Gupta" ; med:mrn "MRN-SHA153" ; med:photoInitials "SG" ;
    med:sex "Female" ; med:dateOfBirth "1994-11-12"^^xsd:date ; med:age 31 ;
    med:bloodGroup "A+" ; med:phone "+91 99269 703751" ; med:email "shalini.gupta@example.in" ;
    med:address "70 Rajiv Gandhi Salai, Tambaram, Chennai" ;
    med:primaryPhysician res:Doc_Vandana ;
    med:hasCondition res:Cond_153 , res:Cond_154 .

res:Cond_153 a med:Condition ;
    med:ofDisease res:ChronicKidneyDisease ; med:onsetDate "2023-03-15"^^xsd:date ;
    med:severity "Moderate" ;
    med:clinicalStatus "Active" ;
    med:diagnosedBy res:Doc_Vandana .

res:Cond_154 a med:Condition ;
    med:ofDisease res:Hypertension ; med:onsetDate "2022-01-14"^^xsd:date ;
    med:severity "Moderate" ;
    med:clinicalStatus "Active" ;
    med:diagnosedBy res:Doc_Ramesh .

res:Pat_SHA153 med:hasEncounter res:Enc_224 , res:Enc_225 , res:Enc_226 .

res:Enc_224 a med:Consultation ;
    med:encounterOf res:Pat_SHA153 ; med:date "2023-12-17"^^xsd:date ;
    med:time "18:30" ;
    med:attendedBy res:Doc_Joseph ; med:inDepartment res:Dept_GeneralMedicine ;
    med:reason "First presentation" ;
    med:outcome "Follow up scheduled" ;
    med:recordedCondition res:Cond_154 ;
    med:hasVitals res:Vit_224 ; med:hasNote res:Note_224 .

res:Vit_224 a med:VitalSigns ;
    med:systolic 160 ; med:diastolic 94 ;
    med:heartRate 90 ; med:temperature 100.0 ;
    med:spo2 96 ;
    med:weightKg 56.6 ;
    med:bmi 27.5 .

res:Note_224 a med:ClinicalNote ;
    med:authorName "Dr. Joseph" ;
    med:date "2023-12-17"^^xsd:date ;
    med:noteText "Seen for worsening symptoms over the past week. Dose adjusted, repeat bloods before next visit." .

res:Rx_165 a med:Prescription ;
    med:prescribes res:Med_Telmisartan ; med:prescribedBy res:Doc_Joseph ;
    med:forPatient res:Pat_SHA153 ; med:date "2023-12-17"^^xsd:date ;
    med:dosage "1 tablet" ;
    med:frequency "Three times daily" ;
    med:durationDays 90 ;
    med:dispensed true ;
    med:status "Completed" .

res:Rx_166 a med:Prescription ;
    med:prescribes res:Med_Metoprolol ; med:prescribedBy res:Doc_Joseph ;
    med:forPatient res:Pat_SHA153 ; med:date "2023-12-17"^^xsd:date ;
    med:dosage "2 tablets" ;
    med:frequency "Three times daily" ;
    med:durationDays 90 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_224 med:issuedPrescription res:Rx_165 , res:Rx_166 .
res:Pat_SHA153 med:hasPrescription res:Rx_165 , res:Rx_166 .

res:Enc_225 a med:Consultation ;
    med:encounterOf res:Pat_SHA153 ; med:date "2025-04-19"^^xsd:date ;
    med:time "18:15" ;
    med:attendedBy res:Doc_Suresh ; med:inDepartment res:Dept_GeneralMedicine ;
    med:reason "Review of hypertension" ;
    med:outcome "Referred for tests" ;
    med:recordedCondition res:Cond_154 ;
    med:hasVitals res:Vit_225 ; med:hasNote res:Note_225 .

res:Vit_225 a med:VitalSigns ;
    med:systolic 178 ; med:diastolic 104 ;
    med:heartRate 98 ; med:temperature 100.3 ;
    med:spo2 100 ;
    med:weightKg 55.5 ;
    med:bmi 20.4 .

res:Note_225 a med:ClinicalNote ;
    med:authorName "Dr. Suresh" ;
    med:date "2025-04-19"^^xsd:date ;
    med:noteText "Presents with a two day history of symptoms. Reassured. No change to treatment at this stage." .

res:Inv_169 a med:Invoice ;
    med:forPatient res:Pat_SHA153 ; med:date "2025-04-19"^^xsd:date ;
    med:amount 2349 ; med:paid true ;
    med:status "Settled" .
res:Inv_169 med:coveredBy res:Policy_SHA153 .
res:Pat_SHA153 med:hasInvoice res:Inv_169 .

res:Enc_226 a med:Screening ;
    med:encounterOf res:Pat_SHA153 ; med:date "2026-08-23"^^xsd:date ;
    med:time "10:45" ;
    med:attendedBy res:Doc_Suresh ; med:inDepartment res:Dept_GeneralMedicine ;
    med:reason "Review of hypertension" ;
    med:outcome "Referred for tests" ;
    med:recordedCondition res:Cond_154 ;
    med:hasVitals res:Vit_226 ; med:hasNote res:Note_226 .

res:Vit_226 a med:VitalSigns ;
    med:systolic 145 ; med:diastolic 93 ;
    med:heartRate 69 ; med:temperature 98.1 ;
    med:spo2 98 ;
    med:weightKg 65.0 ;
    med:bmi 21.2 .

res:Note_226 a med:ClinicalNote ;
    med:authorName "Dr. Suresh" ;
    med:date "2026-08-23"^^xsd:date ;
    med:noteText "Reviewed in clinic today. Reassured. No change to treatment at this stage." .

res:Rx_167 a med:Prescription ;
    med:prescribes res:Med_Amlodipine ; med:prescribedBy res:Doc_Suresh ;
    med:forPatient res:Pat_SHA153 ; med:date "2026-08-23"^^xsd:date ;
    med:dosage "2 tablets" ;
    med:frequency "Once daily" ;
    med:durationDays 60 ;
    med:dispensed false ;
    med:status "Active" .

res:Enc_226 med:issuedPrescription res:Rx_167 .
res:Pat_SHA153 med:hasPrescription res:Rx_167 .

res:Policy_SHA153 a med:InsurancePolicy ;
    med:policyNumber "CG-834778" ;
    med:issuedBy res:Ins_CGHS ; med:coveragePercent 60 ;
    med:amount 300000 .
res:Pat_SHA153 med:hasPolicy res:Policy_SHA153 .

res:Appt_32 a med:Appointment ;
    med:forPatient res:Pat_SHA153 ; med:appointmentWith res:Doc_Vandana ;
    med:date "2026-09-27"^^xsd:date ;
    med:time "17:20" ;
    med:inDepartment res:Dept_Nephrology ;
    med:status "Scheduled" .
res:Pat_SHA153 med:hasAppointment res:Appt_32 .

res:Pat_RAV154 a med:InPatient ;
    med:name "Ravi Menon" ; med:mrn "MRN-RAV154" ; med:photoInitials "RM" ;
    med:sex "Male" ; med:dateOfBirth "1995-06-13"^^xsd:date ; med:age 31 ;
    med:bloodGroup "O+" ; med:phone "+91 95170 561248" ; med:email "ravi.menon@example.in" ;
    med:address "6 Anna Salai, Guindy, Chennai" ;
    med:primaryPhysician res:Doc_Nithya ;
    med:hasCondition res:Cond_155 , res:Cond_156 .

res:Cond_155 a med:Condition ;
    med:ofDisease res:Hypothyroidism ; med:onsetDate "2023-02-02"^^xsd:date ;
    med:severity "Mild" ;
    med:clinicalStatus "Active" ;
    med:diagnosedBy res:Doc_Nithya .

res:Cond_156 a med:Condition ;
    med:ofDisease res:Dyslipidemia ; med:onsetDate "2023-02-01"^^xsd:date ;
    med:severity "Moderate" ;
    med:clinicalStatus "Active" ;
    med:diagnosedBy res:Doc_Suresh .

res:Pat_RAV154 med:hasEncounter res:Enc_227 , res:Enc_228 , res:Enc_229 .

res:Enc_227 a med:Consultation ;
    med:encounterOf res:Pat_RAV154 ; med:date "2023-12-20"^^xsd:date ;
    med:time "13:00" ;
    med:attendedBy res:Doc_Joseph ; med:inDepartment res:Dept_GeneralMedicine ;
    med:reason "First presentation" ;
    med:outcome "Discharged with advice" ;
    med:recordedCondition res:Cond_156 ;
    med:hasVitals res:Vit_227 ; med:hasNote res:Note_227 .

res:Vit_227 a med:VitalSigns ;
    med:systolic 114 ; med:diastolic 78 ;
    med:heartRate 86 ; med:temperature 100.5 ;
    med:spo2 99 ;
    med:weightKg 66.9 ;
    med:bmi 25.6 .

res:Note_227 a med:ClinicalNote ;
    med:authorName "Dr. Joseph" ;
    med:date "2023-12-20"^^xsd:date ;
    med:noteText "Attends for scheduled follow up. Advised on diet, salt restriction and daily walking." .

res:Rx_168 a med:Prescription ;
    med:prescribes res:Med_Atorvastatin ; med:prescribedBy res:Doc_Joseph ;
    med:forPatient res:Pat_RAV154 ; med:date "2023-12-20"^^xsd:date ;
    med:dosage "2 tablets" ;
    med:frequency "As required" ;
    med:durationDays 30 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_227 med:issuedPrescription res:Rx_168 .
res:Pat_RAV154 med:hasPrescription res:Rx_168 .

res:Lab_100 a med:LabOrder ;
    med:analyte "LDL cholesterol" ; med:forPatient res:Pat_RAV154 ;
    med:date "2023-12-20"^^xsd:date ; med:orderedBy res:Doc_Joseph ;
    med:testsFor res:Dyslipidemia ;
    med:orderStatus "Resulted" ;
    med:hasResult res:Res_100 .

res:Res_100 a med:LabResult ;
    med:analyte "LDL cholesterol" ; med:value 150.97 ; med:unit "mg/dL" ;
    med:refLow 0 ; med:refHigh 100 ; med:outOfRange true ;
    med:date "2023-12-21"^^xsd:date ;
    med:performedBy res:Tech_Mohan .

res:Lab_101 a med:LabOrder ;
    med:analyte "Triglycerides" ; med:forPatient res:Pat_RAV154 ;
    med:date "2023-12-20"^^xsd:date ; med:orderedBy res:Doc_Joseph ;
    med:testsFor res:Dyslipidemia ;
    med:orderStatus "Resulted" ;
    med:hasResult res:Res_101 .

res:Res_101 a med:LabResult ;
    med:analyte "Triglycerides" ; med:value 395.93 ; med:unit "mg/dL" ;
    med:refLow 0 ; med:refHigh 150 ; med:outOfRange true ;
    med:date "2023-12-21"^^xsd:date ;
    med:performedBy res:Tech_Mohan .

res:Enc_227 med:orderedTest res:Lab_100 , res:Lab_101 .

res:Inv_170 a med:Invoice ;
    med:forPatient res:Pat_RAV154 ; med:date "2023-12-20"^^xsd:date ;
    med:amount 6288 ; med:paid true ;
    med:status "Settled" .
res:Pat_RAV154 med:hasInvoice res:Inv_170 .

res:Enc_228 a med:DayCareVisit ;
    med:encounterOf res:Pat_RAV154 ; med:date "2025-04-01"^^xsd:date ;
    med:time "14:15" ;
    med:attendedBy res:Doc_Nithya ; med:inDepartment res:Dept_Endocrinology ;
    med:reason "Review of hypothyroidism" ;
    med:outcome "Follow up scheduled" ;
    med:recordedCondition res:Cond_155 ;
    med:hasVitals res:Vit_228 ; med:hasNote res:Note_228 .

res:Vit_228 a med:VitalSigns ;
    med:systolic 122 ; med:diastolic 73 ;
    med:heartRate 73 ; med:temperature 100.3 ;
    med:spo2 100 ;
    med:weightKg 72.5 ;
    med:bmi 21.8 .

res:Note_228 a med:ClinicalNote ;
    med:authorName "Dr. Nithya" ;
    med:date "2025-04-01"^^xsd:date ;
    med:noteText "Presents with a two day history of symptoms. Advised on diet, salt restriction and daily walking." .

res:Rx_169 a med:Prescription ;
    med:prescribes res:Med_Levothyroxine ; med:prescribedBy res:Doc_Nithya ;
    med:forPatient res:Pat_RAV154 ; med:date "2025-04-01"^^xsd:date ;
    med:dosage "1 tablet" ;
    med:frequency "Twice daily" ;
    med:durationDays 30 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_228 med:issuedPrescription res:Rx_169 .
res:Pat_RAV154 med:hasPrescription res:Rx_169 .

res:Lab_102 a med:LabOrder ;
    med:analyte "TSH" ; med:forPatient res:Pat_RAV154 ;
    med:date "2025-04-01"^^xsd:date ; med:orderedBy res:Doc_Nithya ;
    med:testsFor res:Hypothyroidism ;
    med:orderStatus "Resulted" ;
    med:hasResult res:Res_102 .

res:Res_102 a med:LabResult ;
    med:analyte "TSH" ; med:value 3.96 ; med:unit "mIU/L" ;
    med:refLow 0.4 ; med:refHigh 4 ; med:outOfRange false ;
    med:date "2025-04-02"^^xsd:date ;
    med:performedBy res:Tech_Mohan .

res:Enc_228 med:orderedTest res:Lab_102 .

res:Inv_171 a med:Invoice ;
    med:forPatient res:Pat_RAV154 ; med:date "2025-04-01"^^xsd:date ;
    med:amount 6175 ; med:paid true ;
    med:status "Settled" .
res:Pat_RAV154 med:hasInvoice res:Inv_171 .

res:Enc_229 a med:Consultation ;
    med:encounterOf res:Pat_RAV154 ; med:date "2026-08-30"^^xsd:date ;
    med:time "14:45" ;
    med:attendedBy res:Doc_Nithya ; med:inDepartment res:Dept_Endocrinology ;
    med:reason "Review of hypothyroidism" ;
    med:outcome "Discharged with advice" ;
    med:recordedCondition res:Cond_155 ;
    med:hasVitals res:Vit_229 ; med:hasNote res:Note_229 .

res:Vit_229 a med:VitalSigns ;
    med:systolic 110 ; med:diastolic 81 ;
    med:heartRate 94 ; med:temperature 98.7 ;
    med:spo2 100 ;
    med:weightKg 49.8 ;
    med:bmi 20.0 .

res:Note_229 a med:ClinicalNote ;
    med:authorName "Dr. Nithya" ;
    med:date "2026-08-30"^^xsd:date ;
    med:noteText "Post discharge review. Investigations ordered, will call with results." .

res:Lab_103 a med:LabOrder ;
    med:analyte "TSH" ; med:forPatient res:Pat_RAV154 ;
    med:date "2026-08-30"^^xsd:date ; med:orderedBy res:Doc_Nithya ;
    med:testsFor res:Hypothyroidism ;
    med:orderStatus "Pending" .

res:Enc_229 med:orderedTest res:Lab_103 .

res:Inv_172 a med:Invoice ;
    med:forPatient res:Pat_RAV154 ; med:date "2026-08-30"^^xsd:date ;
    med:amount 6056 ; med:paid false ;
    med:status "Awaiting payment" .
res:Pat_RAV154 med:hasInvoice res:Inv_172 .

res:Appt_33 a med:Appointment ;
    med:forPatient res:Pat_RAV154 ; med:appointmentWith res:Doc_Nithya ;
    med:date "2026-10-02"^^xsd:date ;
    med:time "12:40" ;
    med:inDepartment res:Dept_Endocrinology ;
    med:status "Scheduled" .
res:Pat_RAV154 med:hasAppointment res:Appt_33 .

res:Pat_RAV154 med:assignedBed res:Bed_2 .

res:Pat_TAR155 a med:OutPatient ;
    med:name "Tarun Mehta" ; med:mrn "MRN-TAR155" ; med:photoInitials "TM" ;
    med:sex "Male" ; med:dateOfBirth "1984-07-02"^^xsd:date ; med:age 42 ;
    med:bloodGroup "O-" ; med:phone "+91 92280 248263" ; med:email "tarun.mehta@example.in" ;
    med:address "50 GST Road, Kelambakkam, Chennai" ;
    med:primaryPhysician res:Doc_Anand ;
    med:allergicTo res:Allergen_Penicillin ;
    med:hasCondition res:Cond_157 .

res:Cond_157 a med:Condition , med:CriticalCondition ;
    med:ofDisease res:LungCancer ; med:onsetDate "2026-03-12"^^xsd:date ;
    med:severity "Severe" ;
    med:clinicalStatus "Active" ;
    med:diagnosedBy res:Doc_Anand .

res:Pat_TAR155 med:hasEncounter res:Enc_230 .

res:Enc_230 a med:Consultation ;
    med:encounterOf res:Pat_TAR155 ; med:date "2026-08-29"^^xsd:date ;
    med:time "09:15" ;
    med:attendedBy res:Doc_Anand ; med:inDepartment res:Dept_Oncology ;
    med:reason "First presentation" ;
    med:outcome "Discharged with advice" ;
    med:recordedCondition res:Cond_157 ;
    med:hasVitals res:Vit_230 ; med:hasNote res:Note_230 .

res:Vit_230 a med:VitalSigns ;
    med:systolic 123 ; med:diastolic 71 ;
    med:heartRate 86 ; med:temperature 100.3 ;
    med:spo2 100 ;
    med:weightKg 71.5 ;
    med:bmi 23.4 .

res:Note_230 a med:ClinicalNote ;
    med:authorName "Dr. Anand" ;
    med:date "2026-08-29"^^xsd:date ;
    med:noteText "Referred from general medicine for specialist opinion. Investigations ordered, will call with results." .

res:Lab_104 a med:LabOrder ;
    med:analyte "CEA" ; med:forPatient res:Pat_TAR155 ;
    med:date "2026-08-29"^^xsd:date ; med:orderedBy res:Doc_Anand ;
    med:testsFor res:LungCancer ;
    med:orderStatus "Resulted" ;
    med:hasResult res:Res_104 .

res:Res_104 a med:LabResult ;
    med:analyte "CEA" ; med:value 11.42 ; med:unit "ng/mL" ;
    med:refLow 0 ; med:refHigh 3 ; med:outOfRange true ;
    med:date "2026-08-30"^^xsd:date ;
    med:performedBy res:Tech_Mohan .

res:Enc_230 med:orderedTest res:Lab_104 .

res:Inv_173 a med:Invoice ;
    med:forPatient res:Pat_TAR155 ; med:date "2026-08-29"^^xsd:date ;
    med:amount 4959 ; med:paid true ;
    med:status "Settled" .
res:Inv_173 med:coveredBy res:Policy_TAR155 .
res:Pat_TAR155 med:hasInvoice res:Inv_173 .

res:Policy_TAR155 a med:InsurancePolicy ;
    med:policyNumber "NE-946765" ;
    med:issuedBy res:Ins_NewIndia ; med:coveragePercent 70 ;
    med:amount 1000000 .
res:Pat_TAR155 med:hasPolicy res:Policy_TAR155 .

res:Pat_ARA156 a med:OutPatient ;
    med:name "Aravind Balan" ; med:mrn "MRN-ARA156" ; med:photoInitials "AB" ;
    med:sex "Male" ; med:dateOfBirth "1978-01-08"^^xsd:date ; med:age 48 ;
    med:bloodGroup "A+" ; med:phone "+91 92127 430906" ; med:email "aravind.balan@example.in" ;
    med:address "46 Rajiv Gandhi Salai, Kelambakkam, Chennai" ;
    med:primaryPhysician res:Doc_Sameer ;
    med:hasCondition res:Cond_158 , res:Cond_159 .

res:Cond_158 a med:Condition ;
    med:ofDisease res:Tuberculosis ; med:onsetDate "2024-10-25"^^xsd:date ;
    med:severity "Moderate" ;
    med:clinicalStatus "Active" ;
    med:diagnosedBy res:Doc_Sameer .

res:Cond_159 a med:Condition ;
    med:ofDisease res:Anemia ; med:onsetDate "2025-05-23"^^xsd:date ;
    med:severity "Moderate" ;
    med:clinicalStatus "Active" ;
    med:diagnosedBy res:Doc_Suresh .

res:Pat_ARA156 med:hasEncounter res:Enc_231 , res:Enc_232 , res:Enc_233 , res:Enc_234 .

res:Enc_231 a med:Consultation ;
    med:encounterOf res:Pat_ARA156 ; med:date "2023-08-08"^^xsd:date ;
    med:time "12:00" ;
    med:attendedBy res:Doc_Sameer ; med:inDepartment res:Dept_Pulmonology ;
    med:reason "First presentation" ;
    med:outcome "Discharged with advice" ;
    med:recordedCondition res:Cond_158 ;
    med:hasVitals res:Vit_231 ; med:hasNote res:Note_231 .

res:Vit_231 a med:VitalSigns ;
    med:systolic 127 ; med:diastolic 81 ;
    med:heartRate 68 ; med:temperature 99.5 ;
    med:spo2 100 ;
    med:weightKg 60.6 ;
    med:bmi 21.6 .

res:Note_231 a med:ClinicalNote ;
    med:authorName "Dr. Sameer" ;
    med:date "2023-08-08"^^xsd:date ;
    med:noteText "Referred from general medicine for specialist opinion. Reassured. No change to treatment at this stage." .

res:Lab_105 a med:LabOrder ;
    med:analyte "ESR" ; med:forPatient res:Pat_ARA156 ;
    med:date "2023-08-08"^^xsd:date ; med:orderedBy res:Doc_Sameer ;
    med:testsFor res:Tuberculosis ;
    med:orderStatus "Resulted" ;
    med:hasResult res:Res_105 .

res:Res_105 a med:LabResult ;
    med:analyte "ESR" ; med:value 93.42 ; med:unit "mm/hr" ;
    med:refLow 0 ; med:refHigh 20 ; med:outOfRange true ;
    med:date "2023-08-09"^^xsd:date ;
    med:performedBy res:Tech_Mohan .

res:Enc_231 med:orderedTest res:Lab_105 .

res:Inv_174 a med:Invoice ;
    med:forPatient res:Pat_ARA156 ; med:date "2023-08-08"^^xsd:date ;
    med:amount 3090 ; med:paid true ;
    med:status "Settled" .
res:Inv_174 med:coveredBy res:Policy_ARA156 .
res:Pat_ARA156 med:hasInvoice res:Inv_174 .

res:Enc_232 a med:Admission ;
    med:encounterOf res:Pat_ARA156 ; med:date "2024-07-25"^^xsd:date ;
    med:time "17:30" ;
    med:attendedBy res:Doc_Joseph ; med:inDepartment res:Dept_GeneralMedicine ;
    med:reason "Review of anemia" ;
    med:outcome "Admitted to ward" ;
    med:lengthOfStay 5 ;
    med:recordedCondition res:Cond_159 ;
    med:hasVitals res:Vit_232 ; med:hasNote res:Note_232 .

res:Vit_232 a med:VitalSigns ;
    med:systolic 124 ; med:diastolic 83 ;
    med:heartRate 93 ; med:temperature 97.7 ;
    med:spo2 99 ;
    med:weightKg 70.3 ;
    med:bmi 24.1 .

res:Note_232 a med:ClinicalNote ;
    med:authorName "Dr. Joseph" ;
    med:date "2024-07-25"^^xsd:date ;
    med:noteText "Patient reports steady improvement since last visit. Dose adjusted, repeat bloods before next visit." .

res:Rx_170 a med:Prescription ;
    med:prescribes res:Med_IronFolate ; med:prescribedBy res:Doc_Joseph ;
    med:forPatient res:Pat_ARA156 ; med:date "2024-07-25"^^xsd:date ;
    med:dosage "1 tablet" ;
    med:frequency "As required" ;
    med:durationDays 10 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_232 med:issuedPrescription res:Rx_170 .
res:Pat_ARA156 med:hasPrescription res:Rx_170 .

res:Lab_106 a med:LabOrder ;
    med:analyte "Haemoglobin" ; med:forPatient res:Pat_ARA156 ;
    med:date "2024-07-25"^^xsd:date ; med:orderedBy res:Doc_Joseph ;
    med:testsFor res:Anemia ;
    med:orderStatus "Resulted" ;
    med:hasResult res:Res_106 .

res:Res_106 a med:LabResult ;
    med:analyte "Haemoglobin" ; med:value 13.32 ; med:unit "g/dL" ;
    med:refLow 12 ; med:refHigh 15.5 ; med:outOfRange false ;
    med:date "2024-07-26"^^xsd:date ;
    med:performedBy res:Tech_Mohan .

res:Enc_232 med:orderedTest res:Lab_106 .

res:Inv_175 a med:Invoice ;
    med:forPatient res:Pat_ARA156 ; med:date "2024-07-25"^^xsd:date ;
    med:amount 85104 ; med:paid true ;
    med:status "Settled" .
res:Inv_175 med:coveredBy res:Policy_ARA156 .
res:Pat_ARA156 med:hasInvoice res:Inv_175 .

res:Enc_233 a med:EmergencyVisit ;
    med:encounterOf res:Pat_ARA156 ; med:date "2025-09-08"^^xsd:date ;
    med:time "11:15" ;
    med:attendedBy res:Doc_Karthik ; med:inDepartment res:Dept_Emergency ;
    med:reason "Acute presentation" ;
    med:outcome "Follow up scheduled" ;
    med:recordedCondition res:Cond_158 ;
    med:hasVitals res:Vit_233 ; med:hasNote res:Note_233 .

res:Vit_233 a med:VitalSigns ;
    med:systolic 128 ; med:diastolic 69 ;
    med:heartRate 81 ; med:temperature 99.6 ;
    med:spo2 96 ;
    med:weightKg 71.2 ;
    med:bmi 23.6 .

res:Note_233 a med:ClinicalNote ;
    med:authorName "Dr. Karthik" ;
    med:date "2025-09-08"^^xsd:date ;
    med:noteText "Patient reports steady improvement since last visit. Reassured. No change to treatment at this stage." .

res:Lab_107 a med:LabOrder ;
    med:analyte "ESR" ; med:forPatient res:Pat_ARA156 ;
    med:date "2025-09-08"^^xsd:date ; med:orderedBy res:Doc_Karthik ;
    med:testsFor res:Tuberculosis ;
    med:orderStatus "Resulted" ;
    med:hasResult res:Res_107 .

res:Res_107 a med:LabResult ;
    med:analyte "ESR" ; med:value 85.39 ; med:unit "mm/hr" ;
    med:refLow 0 ; med:refHigh 20 ; med:outOfRange true ;
    med:date "2025-09-09"^^xsd:date ;
    med:performedBy res:Tech_Mohan .

res:Enc_233 med:orderedTest res:Lab_107 .

res:Inv_176 a med:Invoice ;
    med:forPatient res:Pat_ARA156 ; med:date "2025-09-08"^^xsd:date ;
    med:amount 30827 ; med:paid true ;
    med:status "Settled" .
res:Inv_176 med:coveredBy res:Policy_ARA156 .
res:Pat_ARA156 med:hasInvoice res:Inv_176 .

res:Enc_234 a med:EmergencyVisit ;
    med:encounterOf res:Pat_ARA156 ; med:date "2026-08-27"^^xsd:date ;
    med:time "13:45" ;
    med:attendedBy res:Doc_Karthik ; med:inDepartment res:Dept_Emergency ;
    med:reason "Acute presentation" ;
    med:outcome "Referred for tests" ;
    med:recordedCondition res:Cond_159 ;
    med:hasVitals res:Vit_234 ; med:hasNote res:Note_234 .

res:Vit_234 a med:VitalSigns ;
    med:systolic 130 ; med:diastolic 66 ;
    med:heartRate 93 ; med:temperature 100.2 ;
    med:spo2 97 ;
    med:weightKg 66.4 ;
    med:bmi 24.1 .

res:Note_234 a med:ClinicalNote ;
    med:authorName "Dr. Karthik" ;
    med:date "2026-08-27"^^xsd:date ;
    med:noteText "Routine review, no new complaints. Continue current therapy, review in three months." .

res:Rx_171 a med:Prescription ;
    med:prescribes res:Med_IronFolate ; med:prescribedBy res:Doc_Karthik ;
    med:forPatient res:Pat_ARA156 ; med:date "2026-08-27"^^xsd:date ;
    med:dosage "2 tablets" ;
    med:frequency "Once daily at night" ;
    med:durationDays 7 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_234 med:issuedPrescription res:Rx_171 .
res:Pat_ARA156 med:hasPrescription res:Rx_171 .

res:Lab_108 a med:LabOrder ;
    med:analyte "Haemoglobin" ; med:forPatient res:Pat_ARA156 ;
    med:date "2026-08-27"^^xsd:date ; med:orderedBy res:Doc_Karthik ;
    med:testsFor res:Anemia ;
    med:orderStatus "Pending" .

res:Enc_234 med:orderedTest res:Lab_108 .

res:Inv_177 a med:Invoice ;
    med:forPatient res:Pat_ARA156 ; med:date "2026-08-27"^^xsd:date ;
    med:amount 22340 ; med:paid false ;
    med:status "Insurance claim pending" .
res:Inv_177 med:coveredBy res:Policy_ARA156 .
res:Pat_ARA156 med:hasInvoice res:Inv_177 .

res:Policy_ARA156 a med:InsurancePolicy ;
    med:policyNumber "ST-723909" ;
    med:issuedBy res:Ins_StarHealth ; med:coveragePercent 70 ;
    med:amount 500000 .
res:Pat_ARA156 med:hasPolicy res:Policy_ARA156 .

res:Appt_34 a med:Appointment ;
    med:forPatient res:Pat_ARA156 ; med:appointmentWith res:Doc_Sameer ;
    med:date "2026-10-14"^^xsd:date ;
    med:time "17:20" ;
    med:inDepartment res:Dept_Pulmonology ;
    med:status "Scheduled" .
res:Pat_ARA156 med:hasAppointment res:Appt_34 .

res:Pat_YUS157 a med:InPatient ;
    med:name "Yusuf Pillai" ; med:mrn "MRN-YUS157" ; med:photoInitials "YP" ;
    med:sex "Male" ; med:dateOfBirth "1993-10-09"^^xsd:date ; med:age 32 ;
    med:bloodGroup "A-" ; med:phone "+91 99362 156293" ; med:email "yusuf.pillai@example.in" ;
    med:address "6 Kamarajar Street, Velachery, Chennai" ;
    med:primaryPhysician res:Doc_Sameer ;
    med:hasCondition res:Cond_160 , res:Cond_161 .

res:Cond_160 a med:Condition ;
    med:ofDisease res:Asthma ; med:onsetDate "2019-07-18"^^xsd:date ;
    med:severity "Moderate" ;
    med:clinicalStatus "Active" ;
    med:diagnosedBy res:Doc_Sameer .

res:Cond_161 a med:Condition ;
    med:ofDisease res:SleepApnea ; med:onsetDate "2016-12-28"^^xsd:date ;
    med:severity "Mild" ;
    med:clinicalStatus "Active" ;
    med:diagnosedBy res:Doc_Sameer .

res:Pat_YUS157 med:hasEncounter res:Enc_235 , res:Enc_236 , res:Enc_237 , res:Enc_238 .

res:Enc_235 a med:EmergencyVisit ;
    med:encounterOf res:Pat_YUS157 ; med:date "2023-08-20"^^xsd:date ;
    med:time "14:45" ;
    med:attendedBy res:Doc_Karthik ; med:inDepartment res:Dept_Emergency ;
    med:reason "Acute presentation" ;
    med:outcome "Discharged with advice" ;
    med:recordedCondition res:Cond_161 ;
    med:hasVitals res:Vit_235 ; med:hasNote res:Note_235 .

res:Vit_235 a med:VitalSigns ;
    med:systolic 132 ; med:diastolic 75 ;
    med:heartRate 101 ; med:temperature 99.4 ;
    med:spo2 89 ;
    med:weightKg 58.5 ;
    med:bmi 25.2 .

res:Note_235 a med:ClinicalNote ;
    med:authorName "Dr. Karthik" ;
    med:date "2023-08-20"^^xsd:date ;
    med:noteText "Post discharge review. Continue current therapy, review in three months." .

res:Enc_236 a med:FollowUp ;
    med:encounterOf res:Pat_YUS157 ; med:date "2024-08-19"^^xsd:date ;
    med:time "18:00" ;
    med:attendedBy res:Doc_Sameer ; med:inDepartment res:Dept_Pulmonology ;
    med:reason "Review of sleep apnea" ;
    med:outcome "Treatment continued" ;
    med:recordedCondition res:Cond_161 ;
    med:hasVitals res:Vit_236 ; med:hasNote res:Note_236 .

res:Vit_236 a med:VitalSigns ;
    med:systolic 131 ; med:diastolic 66 ;
    med:heartRate 84 ; med:temperature 99.6 ;
    med:spo2 89 ;
    med:weightKg 64.2 ;
    med:bmi 21.5 .

res:Note_236 a med:ClinicalNote ;
    med:authorName "Dr. Sameer" ;
    med:date "2024-08-19"^^xsd:date ;
    med:noteText "Presents with a two day history of symptoms. Continue current therapy, review in three months." .

res:Inv_178 a med:Invoice ;
    med:forPatient res:Pat_YUS157 ; med:date "2024-08-19"^^xsd:date ;
    med:amount 698 ; med:paid true ;
    med:status "Settled" .
res:Inv_178 med:coveredBy res:Policy_YUS157 .
res:Pat_YUS157 med:hasInvoice res:Inv_178 .

res:Enc_237 a med:Consultation ;
    med:encounterOf res:Pat_YUS157 ; med:date "2025-08-06"^^xsd:date ;
    med:time "17:30" ;
    med:attendedBy res:Doc_Sameer ; med:inDepartment res:Dept_Pulmonology ;
    med:reason "Review of sleep apnea" ;
    med:outcome "Discharged with advice" ;
    med:recordedCondition res:Cond_161 ;
    med:hasVitals res:Vit_237 ; med:hasNote res:Note_237 .

res:Vit_237 a med:VitalSigns ;
    med:systolic 123 ; med:diastolic 77 ;
    med:heartRate 90 ; med:temperature 98.7 ;
    med:spo2 96 ;
    med:weightKg 69.6 ;
    med:bmi 25.2 .

res:Note_237 a med:ClinicalNote ;
    med:authorName "Dr. Sameer" ;
    med:date "2025-08-06"^^xsd:date ;
    med:noteText "Patient reports steady improvement since last visit. Counselled on medication adherence. Red flag symptoms explained." .

res:Inv_179 a med:Invoice ;
    med:forPatient res:Pat_YUS157 ; med:date "2025-08-06"^^xsd:date ;
    med:amount 4829 ; med:paid true ;
    med:status "Settled" .
res:Inv_179 med:coveredBy res:Policy_YUS157 .
res:Pat_YUS157 med:hasInvoice res:Inv_179 .

res:Enc_238 a med:Consultation ;
    med:encounterOf res:Pat_YUS157 ; med:date "2026-08-30"^^xsd:date ;
    med:time "15:15" ;
    med:attendedBy res:Doc_Sameer ; med:inDepartment res:Dept_Pulmonology ;
    med:reason "Review of sleep apnea" ;
    med:outcome "Follow up scheduled" ;
    med:recordedCondition res:Cond_161 ;
    med:hasVitals res:Vit_238 ; med:hasNote res:Note_238 .

res:Vit_238 a med:VitalSigns ;
    med:systolic 129 ; med:diastolic 69 ;
    med:heartRate 96 ; med:temperature 97.3 ;
    med:spo2 88 ;
    med:weightKg 64.6 ;
    med:bmi 23.1 .

res:Note_238 a med:ClinicalNote ;
    med:authorName "Dr. Sameer" ;
    med:date "2026-08-30"^^xsd:date ;
    med:noteText "Post discharge review. Continue current therapy, review in three months." .

res:Inv_180 a med:Invoice ;
    med:forPatient res:Pat_YUS157 ; med:date "2026-08-30"^^xsd:date ;
    med:amount 5229 ; med:paid false ;
    med:status "Insurance claim pending" .
res:Inv_180 med:coveredBy res:Policy_YUS157 .
res:Pat_YUS157 med:hasInvoice res:Inv_180 .

res:Policy_YUS157 a med:InsurancePolicy ;
    med:policyNumber "HD-660571" ;
    med:issuedBy res:Ins_HDFCErgo ; med:coveragePercent 60 ;
    med:amount 300000 .
res:Pat_YUS157 med:hasPolicy res:Policy_YUS157 .

res:Appt_35 a med:Appointment ;
    med:forPatient res:Pat_YUS157 ; med:appointmentWith res:Doc_Sameer ;
    med:date "2026-09-25"^^xsd:date ;
    med:time "14:00" ;
    med:inDepartment res:Dept_Pulmonology ;
    med:status "Scheduled" .
res:Pat_YUS157 med:hasAppointment res:Appt_35 .

res:Pat_YUS157 med:assignedBed res:Bed_10 .

res:Pat_ARA158 a med:OutPatient ;
    med:name "Aravind Sharma" ; med:mrn "MRN-ARA158" ; med:photoInitials "AS" ;
    med:sex "Male" ; med:dateOfBirth "1991-01-07"^^xsd:date ; med:age 35 ;
    med:bloodGroup "A-" ; med:phone "+91 98424 566126" ; med:email "aravind.sharma@example.in" ;
    med:address "69 ECR, Velachery, Chennai" ;
    med:primaryPhysician res:Doc_Joseph ;
    med:hasCondition res:Cond_162 , res:Cond_163 , res:Cond_164 .

res:Cond_162 a med:Condition ;
    med:ofDisease res:Dengue ; med:onsetDate "2026-02-15"^^xsd:date ;
    med:severity "Moderate" ;
    med:clinicalStatus "Resolved" ;
    med:resolvedDate "2026-06-28"^^xsd:date ;
    med:diagnosedBy res:Doc_Joseph .

res:Cond_163 a med:Condition ;
    med:ofDisease res:Migraine ; med:onsetDate "2026-08-01"^^xsd:date ;
    med:severity "Mild" ;
    med:clinicalStatus "Resolved" ;
    med:resolvedDate "2026-08-26"^^xsd:date ;
    med:diagnosedBy res:Doc_Joseph .

res:Cond_164 a med:Condition ;
    med:ofDisease res:Depression ; med:onsetDate "2018-04-01"^^xsd:date ;
    med:severity "Mild" ;
    med:clinicalStatus "Active" ;
    med:diagnosedBy res:Doc_Leela .

res:Pat_ARA158 med:hasEncounter res:Enc_239 , res:Enc_240 , res:Enc_241 , res:Enc_242 , res:Enc_243 .

res:Enc_239 a med:EmergencyVisit ;
    med:encounterOf res:Pat_ARA158 ; med:date "2023-05-29"^^xsd:date ;
    med:time "08:45" ;
    med:attendedBy res:Doc_Karthik ; med:inDepartment res:Dept_Emergency ;
    med:reason "Acute presentation" ;
    med:outcome "Discharged with advice" ;
    med:recordedCondition res:Cond_163 ;
    med:hasVitals res:Vit_239 ; med:hasNote res:Note_239 .

res:Vit_239 a med:VitalSigns ;
    med:systolic 133 ; med:diastolic 72 ;
    med:heartRate 89 ; med:temperature 98.0 ;
    med:spo2 99 ;
    med:weightKg 74.4 ;
    med:bmi 26.2 .

res:Note_239 a med:ClinicalNote ;
    med:authorName "Dr. Karthik" ;
    med:date "2023-05-29"^^xsd:date ;
    med:noteText "Attends for scheduled follow up. Investigations ordered, will call with results." .

res:Enc_240 a med:Consultation ;
    med:encounterOf res:Pat_ARA158 ; med:date "2024-03-12"^^xsd:date ;
    med:time "17:30" ;
    med:attendedBy res:Doc_Leela ; med:inDepartment res:Dept_Psychiatry ;
    med:reason "Review of depression" ;
    med:outcome "Referred for tests" ;
    med:recordedCondition res:Cond_164 ;
    med:hasVitals res:Vit_240 ; med:hasNote res:Note_240 .

res:Vit_240 a med:VitalSigns ;
    med:systolic 116 ; med:diastolic 75 ;
    med:heartRate 93 ; med:temperature 97.4 ;
    med:spo2 100 ;
    med:weightKg 49.7 ;
    med:bmi 27.8 .

res:Note_240 a med:ClinicalNote ;
    med:authorName "Dr. Leela" ;
    med:date "2024-03-12"^^xsd:date ;
    med:noteText "Seen for worsening symptoms over the past week. Advised on diet, salt restriction and daily walking." .

res:Rx_172 a med:Prescription ;
    med:prescribes res:Med_Sertraline ; med:prescribedBy res:Doc_Leela ;
    med:forPatient res:Pat_ARA158 ; med:date "2024-03-12"^^xsd:date ;
    med:dosage "1 tablet" ;
    med:frequency "Once daily" ;
    med:durationDays 90 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_240 med:issuedPrescription res:Rx_172 .
res:Pat_ARA158 med:hasPrescription res:Rx_172 .

res:Inv_181 a med:Invoice ;
    med:forPatient res:Pat_ARA158 ; med:date "2024-03-12"^^xsd:date ;
    med:amount 725 ; med:paid true ;
    med:status "Settled" .
res:Pat_ARA158 med:hasInvoice res:Inv_181 .

res:Enc_241 a med:FollowUp ;
    med:encounterOf res:Pat_ARA158 ; med:date "2025-01-07"^^xsd:date ;
    med:time "10:30" ;
    med:attendedBy res:Doc_Karthik ; med:inDepartment res:Dept_GeneralMedicine ;
    med:reason "Review of dengue" ;
    med:outcome "Follow up scheduled" ;
    med:recordedCondition res:Cond_162 ;
    med:hasVitals res:Vit_241 ; med:hasNote res:Note_241 .

res:Vit_241 a med:VitalSigns ;
    med:systolic 123 ; med:diastolic 83 ;
    med:heartRate 90 ; med:temperature 100.6 ;
    med:spo2 97 ;
    med:weightKg 58.3 ;
    med:bmi 21.6 .

res:Note_241 a med:ClinicalNote ;
    med:authorName "Dr. Karthik" ;
    med:date "2025-01-07"^^xsd:date ;
    med:noteText "Patient reports steady improvement since last visit. Continue current therapy, review in three months." .

res:Rx_173 a med:Prescription ;
    med:prescribes res:Med_Paracetamol ; med:prescribedBy res:Doc_Karthik ;
    med:forPatient res:Pat_ARA158 ; med:date "2025-01-07"^^xsd:date ;
    med:dosage "2 tablets" ;
    med:frequency "Once daily" ;
    med:durationDays 10 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_241 med:issuedPrescription res:Rx_173 .
res:Pat_ARA158 med:hasPrescription res:Rx_173 .

res:Lab_109 a med:LabOrder ;
    med:analyte "Platelet count" ; med:forPatient res:Pat_ARA158 ;
    med:date "2025-01-07"^^xsd:date ; med:orderedBy res:Doc_Karthik ;
    med:testsFor res:Dengue ;
    med:orderStatus "Resulted" ;
    med:hasResult res:Res_109 .

res:Res_109 a med:LabResult ;
    med:analyte "Platelet count" ; med:value 190.19 ; med:unit "x10^3/uL" ;
    med:refLow 150 ; med:refHigh 450 ; med:outOfRange false ;
    med:date "2025-01-08"^^xsd:date ;
    med:performedBy res:Tech_Mohan .

res:Enc_241 med:orderedTest res:Lab_109 .

res:Inv_182 a med:Invoice ;
    med:forPatient res:Pat_ARA158 ; med:date "2025-01-07"^^xsd:date ;
    med:amount 5892 ; med:paid true ;
    med:status "Settled" .
res:Pat_ARA158 med:hasInvoice res:Inv_182 .

res:Enc_242 a med:FollowUp ;
    med:encounterOf res:Pat_ARA158 ; med:date "2025-11-04"^^xsd:date ;
    med:time "08:30" ;
    med:attendedBy res:Doc_Leela ; med:inDepartment res:Dept_Psychiatry ;
    med:reason "Review of depression" ;
    med:outcome "Follow up scheduled" ;
    med:recordedCondition res:Cond_164 ;
    med:hasVitals res:Vit_242 ; med:hasNote res:Note_242 .

res:Vit_242 a med:VitalSigns ;
    med:systolic 111 ; med:diastolic 66 ;
    med:heartRate 76 ; med:temperature 100.2 ;
    med:spo2 100 ;
    med:weightKg 52.7 ;
    med:bmi 26.9 .

res:Note_242 a med:ClinicalNote ;
    med:authorName "Dr. Leela" ;
    med:date "2025-11-04"^^xsd:date ;
    med:noteText "Presents with a two day history of symptoms. Investigations ordered, will call with results." .

res:Inv_183 a med:Invoice ;
    med:forPatient res:Pat_ARA158 ; med:date "2025-11-04"^^xsd:date ;
    med:amount 2946 ; med:paid false ;
    med:status "Awaiting payment" .
res:Pat_ARA158 med:hasInvoice res:Inv_183 .

res:Enc_243 a med:Consultation ;
    med:encounterOf res:Pat_ARA158 ; med:date "2026-08-26"^^xsd:date ;
    med:time "15:00" ;
    med:attendedBy res:Doc_Priya ; med:inDepartment res:Dept_Neurology ;
    med:reason "Review of migraine" ;
    med:outcome "Discharged with advice" ;
    med:recordedCondition res:Cond_163 ;
    med:hasVitals res:Vit_243 ; med:hasNote res:Note_243 .

res:Vit_243 a med:VitalSigns ;
    med:systolic 132 ; med:diastolic 66 ;
    med:heartRate 92 ; med:temperature 98.2 ;
    med:spo2 100 ;
    med:weightKg 68.0 ;
    med:bmi 20.3 .

res:Note_243 a med:ClinicalNote ;
    med:authorName "Dr. Priya" ;
    med:date "2026-08-26"^^xsd:date ;
    med:noteText "Patient reports steady improvement since last visit. Counselled on medication adherence. Red flag symptoms explained." .

res:Inv_184 a med:Invoice ;
    med:forPatient res:Pat_ARA158 ; med:date "2026-08-26"^^xsd:date ;
    med:amount 2751 ; med:paid true ;
    med:status "Settled" .
res:Pat_ARA158 med:hasInvoice res:Inv_184 .

res:Appt_36 a med:Appointment ;
    med:forPatient res:Pat_ARA158 ; med:appointmentWith res:Doc_Karthik ;
    med:date "2026-09-06"^^xsd:date ;
    med:time "11:20" ;
    med:inDepartment res:Dept_GeneralMedicine ;
    med:status "Scheduled" .
res:Pat_ARA158 med:hasAppointment res:Appt_36 .

res:Pat_VIN159 a med:InPatient ;
    med:name "Vinod Begum" ; med:mrn "MRN-VIN159" ; med:photoInitials "VB" ;
    med:sex "Male" ; med:dateOfBirth "1959-06-12"^^xsd:date ; med:age 67 ;
    med:bloodGroup "AB+" ; med:phone "+91 94893 862481" ; med:email "vinod.begum@example.in" ;
    med:address "25 Anna Salai, Tambaram, Chennai" ;
    med:primaryPhysician res:Doc_Vikram ;
    med:hasCondition res:Cond_165 , res:Cond_166 , res:Cond_167 .

res:Cond_165 a med:Condition ;
    med:ofDisease res:Osteoarthritis ; med:onsetDate "2017-10-31"^^xsd:date ;
    med:severity "Moderate" ;
    med:clinicalStatus "Active" ;
    med:diagnosedBy res:Doc_Vikram .

res:Cond_166 a med:Condition ;
    med:ofDisease res:Obesity ; med:onsetDate "2019-03-09"^^xsd:date ;
    med:severity "Mild" ;
    med:clinicalStatus "Active" ;
    med:diagnosedBy res:Doc_Nithya .

res:Cond_167 a med:Condition ;
    med:ofDisease res:Migraine ; med:onsetDate "2024-10-27"^^xsd:date ;
    med:severity "Mild" ;
    med:clinicalStatus "Active" ;
    med:diagnosedBy res:Doc_Joseph .

res:Pat_VIN159 med:hasEncounter res:Enc_244 , res:Enc_245 , res:Enc_246 , res:Enc_247 , res:Enc_248 , res:Enc_249 .

res:Enc_244 a med:EmergencyVisit ;
    med:encounterOf res:Pat_VIN159 ; med:date "2023-04-02"^^xsd:date ;
    med:time "18:30" ;
    med:attendedBy res:Doc_Karthik ; med:inDepartment res:Dept_Emergency ;
    med:reason "Acute presentation" ;
    med:outcome "Discharged with advice" ;
    med:recordedCondition res:Cond_165 ;
    med:hasVitals res:Vit_244 ; med:hasNote res:Note_244 .

res:Vit_244 a med:VitalSigns ;
    med:systolic 127 ; med:diastolic 71 ;
    med:heartRate 94 ; med:temperature 100.4 ;
    med:spo2 99 ;
    med:weightKg 81.5 ;
    med:bmi 31.7 .

res:Note_244 a med:ClinicalNote ;
    med:authorName "Dr. Karthik" ;
    med:date "2023-04-02"^^xsd:date ;
    med:noteText "Attends for scheduled follow up. Referral raised to the relevant specialty." .

res:Rx_174 a med:Prescription ;
    med:prescribes res:Med_Ibuprofen ; med:prescribedBy res:Doc_Karthik ;
    med:forPatient res:Pat_VIN159 ; med:date "2023-04-02"^^xsd:date ;
    med:dosage "2 tablets" ;
    med:frequency "Three times daily" ;
    med:durationDays 90 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_244 med:issuedPrescription res:Rx_174 .
res:Pat_VIN159 med:hasPrescription res:Rx_174 .

res:Inv_185 a med:Invoice ;
    med:forPatient res:Pat_VIN159 ; med:date "2023-04-02"^^xsd:date ;
    med:amount 9459 ; med:paid true ;
    med:status "Settled" .
res:Inv_185 med:coveredBy res:Policy_VIN159 .
res:Pat_VIN159 med:hasInvoice res:Inv_185 .

res:Enc_245 a med:Consultation ;
    med:encounterOf res:Pat_VIN159 ; med:date "2023-12-17"^^xsd:date ;
    med:time "12:30" ;
    med:attendedBy res:Doc_Vikram ; med:inDepartment res:Dept_Orthopedics ;
    med:reason "Review of osteoarthritis" ;
    med:outcome "Discharged with advice" ;
    med:recordedCondition res:Cond_165 ;
    med:hasVitals res:Vit_245 ; med:hasNote res:Note_245 .

res:Vit_245 a med:VitalSigns ;
    med:systolic 120 ; med:diastolic 74 ;
    med:heartRate 94 ; med:temperature 98.2 ;
    med:spo2 97 ;
    med:weightKg 103.4 ;
    med:bmi 35.9 .

res:Note_245 a med:ClinicalNote ;
    med:authorName "Dr. Vikram" ;
    med:date "2023-12-17"^^xsd:date ;
    med:noteText "Presents with a two day history of symptoms. Investigations ordered, will call with results." .

res:Rx_175 a med:Prescription ;
    med:prescribes res:Med_Ibuprofen ; med:prescribedBy res:Doc_Vikram ;
    med:forPatient res:Pat_VIN159 ; med:date "2023-12-17"^^xsd:date ;
    med:dosage "2 tablets" ;
    med:frequency "Twice daily" ;
    med:durationDays 60 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_245 med:issuedPrescription res:Rx_175 .
res:Pat_VIN159 med:hasPrescription res:Rx_175 .

res:Inv_186 a med:Invoice ;
    med:forPatient res:Pat_VIN159 ; med:date "2023-12-17"^^xsd:date ;
    med:amount 3174 ; med:paid true ;
    med:status "Settled" .
res:Inv_186 med:coveredBy res:Policy_VIN159 .
res:Pat_VIN159 med:hasInvoice res:Inv_186 .

res:Enc_246 a med:Consultation ;
    med:encounterOf res:Pat_VIN159 ; med:date "2024-08-02"^^xsd:date ;
    med:time "16:15" ;
    med:attendedBy res:Doc_Vikram ; med:inDepartment res:Dept_Orthopedics ;
    med:reason "Review of osteoarthritis" ;
    med:outcome "Treatment continued" ;
    med:recordedCondition res:Cond_165 ;
    med:hasVitals res:Vit_246 ; med:hasNote res:Note_246 .

res:Vit_246 a med:VitalSigns ;
    med:systolic 129 ; med:diastolic 67 ;
    med:heartRate 104 ; med:temperature 100.3 ;
    med:spo2 96 ;
    med:weightKg 102.2 ;
    med:bmi 36.3 .

res:Note_246 a med:ClinicalNote ;
    med:authorName "Dr. Vikram" ;
    med:date "2024-08-02"^^xsd:date ;
    med:noteText "Reviewed in clinic today. Investigations ordered, will call with results." .

res:Rx_176 a med:Prescription ;
    med:prescribes res:Med_Ibuprofen ; med:prescribedBy res:Doc_Vikram ;
    med:forPatient res:Pat_VIN159 ; med:date "2024-08-02"^^xsd:date ;
    med:dosage "1 dose" ;
    med:frequency "Once daily" ;
    med:durationDays 90 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_246 med:issuedPrescription res:Rx_176 .
res:Pat_VIN159 med:hasPrescription res:Rx_176 .

res:Inv_187 a med:Invoice ;
    med:forPatient res:Pat_VIN159 ; med:date "2024-08-02"^^xsd:date ;
    med:amount 4528 ; med:paid true ;
    med:status "Settled" .
res:Inv_187 med:coveredBy res:Policy_VIN159 .
res:Pat_VIN159 med:hasInvoice res:Inv_187 .

res:Enc_247 a med:Consultation ;
    med:encounterOf res:Pat_VIN159 ; med:date "2025-05-05"^^xsd:date ;
    med:time "11:00" ;
    med:attendedBy res:Doc_Vikram ; med:inDepartment res:Dept_Orthopedics ;
    med:reason "Review of osteoarthritis" ;
    med:outcome "Treatment continued" ;
    med:recordedCondition res:Cond_165 ;
    med:hasVitals res:Vit_247 ; med:hasNote res:Note_247 .

res:Vit_247 a med:VitalSigns ;
    med:systolic 118 ; med:diastolic 83 ;
    med:heartRate 95 ; med:temperature 100.2 ;
    med:spo2 96 ;
    med:weightKg 90.9 ;
    med:bmi 32.5 .

res:Note_247 a med:ClinicalNote ;
    med:authorName "Dr. Vikram" ;
    med:date "2025-05-05"^^xsd:date ;
    med:noteText "Post discharge review. Advised on diet, salt restriction and daily walking." .

res:Rx_177 a med:Prescription ;
    med:prescribes res:Med_Ibuprofen ; med:prescribedBy res:Doc_Vikram ;
    med:forPatient res:Pat_VIN159 ; med:date "2025-05-05"^^xsd:date ;
    med:dosage "1 tablet" ;
    med:frequency "Once daily" ;
    med:durationDays 60 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_247 med:issuedPrescription res:Rx_177 .
res:Pat_VIN159 med:hasPrescription res:Rx_177 .

res:Inv_188 a med:Invoice ;
    med:forPatient res:Pat_VIN159 ; med:date "2025-05-05"^^xsd:date ;
    med:amount 2815 ; med:paid true ;
    med:status "Settled" .
res:Inv_188 med:coveredBy res:Policy_VIN159 .
res:Pat_VIN159 med:hasInvoice res:Inv_188 .

res:Enc_248 a med:Consultation ;
    med:encounterOf res:Pat_VIN159 ; med:date "2026-01-06"^^xsd:date ;
    med:time "18:00" ;
    med:attendedBy res:Doc_Vikram ; med:inDepartment res:Dept_Orthopedics ;
    med:reason "Review of osteoarthritis" ;
    med:outcome "Treatment continued" ;
    med:recordedCondition res:Cond_165 ;
    med:hasVitals res:Vit_248 ; med:hasNote res:Note_248 .

res:Vit_248 a med:VitalSigns ;
    med:systolic 108 ; med:diastolic 66 ;
    med:heartRate 77 ; med:temperature 98.5 ;
    med:spo2 96 ;
    med:weightKg 99.6 ;
    med:bmi 35.2 .

res:Note_248 a med:ClinicalNote ;
    med:authorName "Dr. Vikram" ;
    med:date "2026-01-06"^^xsd:date ;
    med:noteText "Patient reports steady improvement since last visit. Advised on diet, salt restriction and daily walking." .

res:Rx_178 a med:Prescription ;
    med:prescribes res:Med_Ibuprofen ; med:prescribedBy res:Doc_Vikram ;
    med:forPatient res:Pat_VIN159 ; med:date "2026-01-06"^^xsd:date ;
    med:dosage "1 tablet" ;
    med:frequency "Three times daily" ;
    med:durationDays 90 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_248 med:issuedPrescription res:Rx_178 .
res:Pat_VIN159 med:hasPrescription res:Rx_178 .

res:Inv_189 a med:Invoice ;
    med:forPatient res:Pat_VIN159 ; med:date "2026-01-06"^^xsd:date ;
    med:amount 4326 ; med:paid true ;
    med:status "Settled" .
res:Inv_189 med:coveredBy res:Policy_VIN159 .
res:Pat_VIN159 med:hasInvoice res:Inv_189 .

res:Enc_249 a med:FollowUp ;
    med:encounterOf res:Pat_VIN159 ; med:date "2026-08-22"^^xsd:date ;
    med:time "13:45" ;
    med:attendedBy res:Doc_Suresh ; med:inDepartment res:Dept_Endocrinology ;
    med:reason "Review of obesity" ;
    med:outcome "Discharged with advice" ;
    med:recordedCondition res:Cond_166 ;
    med:hasVitals res:Vit_249 ; med:hasNote res:Note_249 .

res:Vit_249 a med:VitalSigns ;
    med:systolic 109 ; med:diastolic 80 ;
    med:heartRate 67 ; med:temperature 98.5 ;
    med:spo2 99 ;
    med:weightKg 102.8 ;
    med:bmi 36.2 .

res:Note_249 a med:ClinicalNote ;
    med:authorName "Dr. Suresh" ;
    med:date "2026-08-22"^^xsd:date ;
    med:noteText "Routine review, no new complaints. Referral raised to the relevant specialty." .

res:Inv_190 a med:Invoice ;
    med:forPatient res:Pat_VIN159 ; med:date "2026-08-22"^^xsd:date ;
    med:amount 3159 ; med:paid true ;
    med:status "Settled" .
res:Inv_190 med:coveredBy res:Policy_VIN159 .
res:Pat_VIN159 med:hasInvoice res:Inv_190 .

res:Policy_VIN159 a med:InsurancePolicy ;
    med:policyNumber "CG-305501" ;
    med:issuedBy res:Ins_CGHS ; med:coveragePercent 80 ;
    med:amount 200000 .
res:Pat_VIN159 med:hasPolicy res:Policy_VIN159 .

res:Pat_VIN159 med:assignedBed res:Bed_5 .

res:Pat_HAR160 a med:OutPatient ;
    med:name "Hari Narayanan" ; med:mrn "MRN-HAR160" ; med:photoInitials "HN" ;
    med:sex "Male" ; med:dateOfBirth "1952-06-20"^^xsd:date ; med:age 74 ;
    med:bloodGroup "A-" ; med:phone "+91 93224 852280" ; med:email "hari.narayanan@example.in" ;
    med:address "42 Rajiv Gandhi Salai, Kelambakkam, Chennai" ;
    med:primaryPhysician res:Doc_Sameer ;
    med:hasCondition res:Cond_168 , res:Cond_169 , res:Cond_170 , res:Cond_171 , res:Cond_172 .

res:Cond_168 a med:Condition ;
    med:ofDisease res:Tuberculosis ; med:onsetDate "2025-09-03"^^xsd:date ;
    med:severity "Mild" ;
    med:clinicalStatus "Resolved" ;
    med:resolvedDate "2025-10-30"^^xsd:date ;
    med:diagnosedBy res:Doc_Sameer .

res:Cond_169 a med:Condition ;
    med:ofDisease res:Anemia ; med:onsetDate "2025-02-02"^^xsd:date ;
    med:severity "Mild" ;
    med:clinicalStatus "Resolved" ;
    med:resolvedDate "2025-06-03"^^xsd:date ;
    med:diagnosedBy res:Doc_Suresh .

res:Cond_170 a med:Condition ;
    med:ofDisease res:TypeIIDiabetes ; med:onsetDate "2021-01-11"^^xsd:date ;
    med:severity "Mild" ;
    med:clinicalStatus "Active" ;
    med:diagnosedBy res:Doc_Nithya .

res:Cond_171 a med:Condition ;
    med:ofDisease res:UrinaryTractInfection ; med:onsetDate "2025-04-05"^^xsd:date ;
    med:severity "Mild" ;
    med:clinicalStatus "Resolved" ;
    med:resolvedDate "2025-06-02"^^xsd:date ;
    med:diagnosedBy res:Doc_Joseph .

res:Cond_172 a med:Condition ;
    med:ofDisease res:COPD ; med:onsetDate "2018-08-13"^^xsd:date ;
    med:severity "Mild" ;
    med:clinicalStatus "Active" ;
    med:diagnosedBy res:Doc_Sameer .

res:Pat_HAR160 med:hasEncounter res:Enc_250 , res:Enc_251 , res:Enc_252 , res:Enc_253 , res:Enc_254 .

res:Enc_250 a med:EmergencyVisit ;
    med:encounterOf res:Pat_HAR160 ; med:date "2023-05-11"^^xsd:date ;
    med:time "09:00" ;
    med:attendedBy res:Doc_Karthik ; med:inDepartment res:Dept_Emergency ;
    med:reason "Acute presentation" ;
    med:outcome "Follow up scheduled" ;
    med:recordedCondition res:Cond_171 ;
    med:hasVitals res:Vit_250 ; med:hasNote res:Note_250 .

res:Vit_250 a med:VitalSigns ;
    med:systolic 116 ; med:diastolic 81 ;
    med:heartRate 92 ; med:temperature 98.2 ;
    med:spo2 88 ;
    med:weightKg 55.2 ;
    med:bmi 20.0 .

res:Note_250 a med:ClinicalNote ;
    med:authorName "Dr. Karthik" ;
    med:date "2023-05-11"^^xsd:date ;
    med:noteText "Reviewed in clinic today. Dose adjusted, repeat bloods before next visit." .

res:Rx_179 a med:Prescription ;
    med:prescribes res:Med_Nitrofurantoin ; med:prescribedBy res:Doc_Karthik ;
    med:forPatient res:Pat_HAR160 ; med:date "2023-05-11"^^xsd:date ;
    med:dosage "1 tablet" ;
    med:frequency "As required" ;
    med:durationDays 5 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_250 med:issuedPrescription res:Rx_179 .
res:Pat_HAR160 med:hasPrescription res:Rx_179 .

res:Lab_110 a med:LabOrder ;
    med:analyte "Urine WBC" ; med:forPatient res:Pat_HAR160 ;
    med:date "2023-05-11"^^xsd:date ; med:orderedBy res:Doc_Karthik ;
    med:testsFor res:UrinaryTractInfection ;
    med:orderStatus "Resulted" ;
    med:hasResult res:Res_110 .

res:Res_110 a med:LabResult ;
    med:analyte "Urine WBC" ; med:value 21.44 ; med:unit "/hpf" ;
    med:refLow 0 ; med:refHigh 5 ; med:outOfRange true ;
    med:date "2023-05-12"^^xsd:date ;
    med:performedBy res:Tech_Mohan .

res:Enc_250 med:orderedTest res:Lab_110 .

res:Inv_191 a med:Invoice ;
    med:forPatient res:Pat_HAR160 ; med:date "2023-05-11"^^xsd:date ;
    med:amount 25966 ; med:paid true ;
    med:status "Settled" .
res:Inv_191 med:coveredBy res:Policy_HAR160 .
res:Pat_HAR160 med:hasInvoice res:Inv_191 .

res:Enc_251 a med:Consultation ;
    med:encounterOf res:Pat_HAR160 ; med:date "2024-03-09"^^xsd:date ;
    med:time "10:00" ;
    med:attendedBy res:Doc_Suresh ; med:inDepartment res:Dept_GeneralMedicine ;
    med:reason "Review of anemia" ;
    med:outcome "Follow up scheduled" ;
    med:recordedCondition res:Cond_169 ;
    med:hasVitals res:Vit_251 ; med:hasNote res:Note_251 .

res:Vit_251 a med:VitalSigns ;
    med:systolic 121 ; med:diastolic 75 ;
    med:heartRate 102 ; med:temperature 100.4 ;
    med:spo2 94 ;
    med:weightKg 63.0 ;
    med:bmi 25.2 .

res:Note_251 a med:ClinicalNote ;
    med:authorName "Dr. Suresh" ;
    med:date "2024-03-09"^^xsd:date ;
    med:noteText "Routine review, no new complaints. Advised on diet, salt restriction and daily walking." .

res:Rx_180 a med:Prescription ;
    med:prescribes res:Med_IronFolate ; med:prescribedBy res:Doc_Suresh ;
    med:forPatient res:Pat_HAR160 ; med:date "2024-03-09"^^xsd:date ;
    med:dosage "1 tablet" ;
    med:frequency "Once daily at night" ;
    med:durationDays 14 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_251 med:issuedPrescription res:Rx_180 .
res:Pat_HAR160 med:hasPrescription res:Rx_180 .

res:Lab_111 a med:LabOrder ;
    med:analyte "Haemoglobin" ; med:forPatient res:Pat_HAR160 ;
    med:date "2024-03-09"^^xsd:date ; med:orderedBy res:Doc_Suresh ;
    med:testsFor res:Anemia ;
    med:orderStatus "Resulted" ;
    med:hasResult res:Res_111 .

res:Res_111 a med:LabResult ;
    med:analyte "Haemoglobin" ; med:value 11.28 ; med:unit "g/dL" ;
    med:refLow 12 ; med:refHigh 15.5 ; med:outOfRange true ;
    med:date "2024-03-10"^^xsd:date ;
    med:performedBy res:Tech_Mohan .

res:Enc_251 med:orderedTest res:Lab_111 .

res:Inv_192 a med:Invoice ;
    med:forPatient res:Pat_HAR160 ; med:date "2024-03-09"^^xsd:date ;
    med:amount 4352 ; med:paid true ;
    med:status "Settled" .
res:Inv_192 med:coveredBy res:Policy_HAR160 .
res:Pat_HAR160 med:hasInvoice res:Inv_192 .

res:Enc_252 a med:Consultation ;
    med:encounterOf res:Pat_HAR160 ; med:date "2025-01-26"^^xsd:date ;
    med:time "18:15" ;
    med:attendedBy res:Doc_Suresh ; med:inDepartment res:Dept_GeneralMedicine ;
    med:reason "Review of anemia" ;
    med:outcome "Discharged with advice" ;
    med:recordedCondition res:Cond_169 ;
    med:hasVitals res:Vit_252 ; med:hasNote res:Note_252 .

res:Vit_252 a med:VitalSigns ;
    med:systolic 121 ; med:diastolic 78 ;
    med:heartRate 95 ; med:temperature 97.8 ;
    med:spo2 92 ;
    med:weightKg 74.7 ;
    med:bmi 23.2 .

res:Note_252 a med:ClinicalNote ;
    med:authorName "Dr. Suresh" ;
    med:date "2025-01-26"^^xsd:date ;
    med:noteText "Patient reports steady improvement since last visit. Reassured. No change to treatment at this stage." .

res:Rx_181 a med:Prescription ;
    med:prescribes res:Med_IronFolate ; med:prescribedBy res:Doc_Suresh ;
    med:forPatient res:Pat_HAR160 ; med:date "2025-01-26"^^xsd:date ;
    med:dosage "1 dose" ;
    med:frequency "Three times daily" ;
    med:durationDays 7 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_252 med:issuedPrescription res:Rx_181 .
res:Pat_HAR160 med:hasPrescription res:Rx_181 .

res:Lab_112 a med:LabOrder ;
    med:analyte "Haemoglobin" ; med:forPatient res:Pat_HAR160 ;
    med:date "2025-01-26"^^xsd:date ; med:orderedBy res:Doc_Suresh ;
    med:testsFor res:Anemia ;
    med:orderStatus "Resulted" ;
    med:hasResult res:Res_112 .

res:Res_112 a med:LabResult ;
    med:analyte "Haemoglobin" ; med:value 8.64 ; med:unit "g/dL" ;
    med:refLow 12 ; med:refHigh 15.5 ; med:outOfRange true ;
    med:date "2025-01-27"^^xsd:date ;
    med:performedBy res:Tech_Mohan .

res:Enc_252 med:orderedTest res:Lab_112 .

res:Inv_193 a med:Invoice ;
    med:forPatient res:Pat_HAR160 ; med:date "2025-01-26"^^xsd:date ;
    med:amount 1397 ; med:paid true ;
    med:status "Settled" .
res:Inv_193 med:coveredBy res:Policy_HAR160 .
res:Pat_HAR160 med:hasInvoice res:Inv_193 .

res:Enc_253 a med:FollowUp ;
    med:encounterOf res:Pat_HAR160 ; med:date "2025-11-12"^^xsd:date ;
    med:time "15:00" ;
    med:attendedBy res:Doc_Nithya ; med:inDepartment res:Dept_Endocrinology ;
    med:reason "Review of type i i diabetes" ;
    med:outcome "Treatment continued" ;
    med:recordedCondition res:Cond_170 ;
    med:hasVitals res:Vit_253 ; med:hasNote res:Note_253 .

res:Vit_253 a med:VitalSigns ;
    med:systolic 127 ; med:diastolic 67 ;
    med:heartRate 102 ; med:temperature 99.3 ;
    med:spo2 93 ;
    med:weightKg 57.9 ;
    med:bmi 25.8 .

res:Note_253 a med:ClinicalNote ;
    med:authorName "Dr. Nithya" ;
    med:date "2025-11-12"^^xsd:date ;
    med:noteText "Post discharge review. Continue current therapy, review in three months." .

res:Rx_182 a med:Prescription ;
    med:prescribes res:Med_Insulin ; med:prescribedBy res:Doc_Nithya ;
    med:forPatient res:Pat_HAR160 ; med:date "2025-11-12"^^xsd:date ;
    med:dosage "1 tablet" ;
    med:frequency "As required" ;
    med:durationDays 30 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_253 med:issuedPrescription res:Rx_182 .
res:Pat_HAR160 med:hasPrescription res:Rx_182 .

res:Lab_113 a med:LabOrder ;
    med:analyte "HbA1c" ; med:forPatient res:Pat_HAR160 ;
    med:date "2025-11-12"^^xsd:date ; med:orderedBy res:Doc_Nithya ;
    med:testsFor res:TypeIIDiabetes ;
    med:orderStatus "Resulted" ;
    med:hasResult res:Res_113 .

res:Res_113 a med:LabResult ;
    med:analyte "HbA1c" ; med:value 10.13 ; med:unit "%" ;
    med:refLow 4 ; med:refHigh 5.6 ; med:outOfRange true ;
    med:date "2025-11-13"^^xsd:date ;
    med:performedBy res:Tech_Mohan .

res:Lab_114 a med:LabOrder ;
    med:analyte "Fasting glucose" ; med:forPatient res:Pat_HAR160 ;
    med:date "2025-11-12"^^xsd:date ; med:orderedBy res:Doc_Nithya ;
    med:testsFor res:TypeIIDiabetes ;
    med:orderStatus "Resulted" ;
    med:hasResult res:Res_114 .

res:Res_114 a med:LabResult ;
    med:analyte "Fasting glucose" ; med:value 109.44 ; med:unit "mg/dL" ;
    med:refLow 70 ; med:refHigh 100 ; med:outOfRange true ;
    med:date "2025-11-13"^^xsd:date ;
    med:performedBy res:Tech_Mohan .

res:Enc_253 med:orderedTest res:Lab_113 , res:Lab_114 .

res:Enc_254 a med:FollowUp ;
    med:encounterOf res:Pat_HAR160 ; med:date "2026-08-19"^^xsd:date ;
    med:time "10:45" ;
    med:attendedBy res:Doc_Suresh ; med:inDepartment res:Dept_GeneralMedicine ;
    med:reason "Review of urinary tract infection" ;
    med:outcome "Treatment continued" ;
    med:recordedCondition res:Cond_171 ;
    med:hasVitals res:Vit_254 ; med:hasNote res:Note_254 .

res:Vit_254 a med:VitalSigns ;
    med:systolic 129 ; med:diastolic 75 ;
    med:heartRate 84 ; med:temperature 98.3 ;
    med:spo2 92 ;
    med:weightKg 70.6 ;
    med:bmi 22.4 .

res:Note_254 a med:ClinicalNote ;
    med:authorName "Dr. Suresh" ;
    med:date "2026-08-19"^^xsd:date ;
    med:noteText "Reviewed in clinic today. Continue current therapy, review in three months." .

res:Rx_183 a med:Prescription ;
    med:prescribes res:Med_Amoxicillin ; med:prescribedBy res:Doc_Suresh ;
    med:forPatient res:Pat_HAR160 ; med:date "2026-08-19"^^xsd:date ;
    med:dosage "2 tablets" ;
    med:frequency "Once daily at night" ;
    med:durationDays 14 ;
    med:dispensed false ;
    med:status "Completed" .

res:Enc_254 med:issuedPrescription res:Rx_183 .
res:Pat_HAR160 med:hasPrescription res:Rx_183 .

res:Lab_115 a med:LabOrder ;
    med:analyte "Urine WBC" ; med:forPatient res:Pat_HAR160 ;
    med:date "2026-08-19"^^xsd:date ; med:orderedBy res:Doc_Suresh ;
    med:testsFor res:UrinaryTractInfection ;
    med:orderStatus "Pending" .

res:Enc_254 med:orderedTest res:Lab_115 .

res:Inv_194 a med:Invoice ;
    med:forPatient res:Pat_HAR160 ; med:date "2026-08-19"^^xsd:date ;
    med:amount 5181 ; med:paid false ;
    med:status "Insurance claim pending" .
res:Inv_194 med:coveredBy res:Policy_HAR160 .
res:Pat_HAR160 med:hasInvoice res:Inv_194 .

res:Policy_HAR160 a med:InsurancePolicy ;
    med:policyNumber "CG-373821" ;
    med:issuedBy res:Ins_CGHS ; med:coveragePercent 70 ;
    med:amount 200000 .
res:Pat_HAR160 med:hasPolicy res:Policy_HAR160 .

res:Appt_37 a med:Appointment ;
    med:forPatient res:Pat_HAR160 ; med:appointmentWith res:Doc_Sameer ;
    med:date "2026-09-25"^^xsd:date ;
    med:time "17:00" ;
    med:inDepartment res:Dept_Pulmonology ;
    med:status "Scheduled" .
res:Pat_HAR160 med:hasAppointment res:Appt_37 .

res:Pat_YUS161 a med:OutPatient ;
    med:name "Yusuf Kumar" ; med:mrn "MRN-YUS161" ; med:photoInitials "YK" ;
    med:sex "Male" ; med:dateOfBirth "2004-12-16"^^xsd:date ; med:age 21 ;
    med:bloodGroup "AB+" ; med:phone "+91 93613 465665" ; med:email "yusuf.kumar@example.in" ;
    med:address "8 Bharathi Street, Thoraipakkam, Chennai" ;
    med:primaryPhysician res:Doc_Priya ;
    med:hasCondition res:Cond_173 , res:Cond_174 .

res:Cond_173 a med:Condition ;
    med:ofDisease res:Stroke ; med:onsetDate "2024-10-08"^^xsd:date ;
    med:severity "Mild" ;
    med:clinicalStatus "Resolved" ;
    med:resolvedDate "2025-02-05"^^xsd:date ;
    med:diagnosedBy res:Doc_Priya .

res:Cond_174 a med:Condition ;
    med:ofDisease res:AtrialFibrillation ; med:onsetDate "2021-02-27"^^xsd:date ;
    med:severity "Moderate" ;
    med:clinicalStatus "Active" ;
    med:diagnosedBy res:Doc_Farida .

res:Pat_YUS161 med:hasEncounter res:Enc_255 , res:Enc_256 , res:Enc_257 , res:Enc_258 .

res:Enc_255 a med:Consultation ;
    med:encounterOf res:Pat_YUS161 ; med:date "2023-08-17"^^xsd:date ;
    med:time "12:15" ;
    med:attendedBy res:Doc_Farida ; med:inDepartment res:Dept_Cardiology ;
    med:reason "First presentation" ;
    med:outcome "Referred for tests" ;
    med:recordedCondition res:Cond_174 ;
    med:hasVitals res:Vit_255 ; med:hasNote res:Note_255 .

res:Vit_255 a med:VitalSigns ;
    med:systolic 127 ; med:diastolic 80 ;
    med:heartRate 63 ; med:temperature 98.4 ;
    med:spo2 100 ;
    med:weightKg 62.0 ;
    med:bmi 21.5 .

res:Note_255 a med:ClinicalNote ;
    med:authorName "Dr. Farida" ;
    med:date "2023-08-17"^^xsd:date ;
    med:noteText "Reviewed in clinic today. Continue current therapy, review in three months." .

res:Lab_116 a med:LabOrder ;
    med:analyte "INR" ; med:forPatient res:Pat_YUS161 ;
    med:date "2023-08-17"^^xsd:date ; med:orderedBy res:Doc_Farida ;
    med:testsFor res:AtrialFibrillation ;
    med:orderStatus "Resulted" ;
    med:hasResult res:Res_116 .

res:Res_116 a med:LabResult ;
    med:analyte "INR" ; med:value 4.21 ; med:unit "ratio" ;
    med:refLow 0.9 ; med:refHigh 1.2 ; med:outOfRange true ;
    med:date "2023-08-18"^^xsd:date ;
    med:performedBy res:Tech_Mohan .

res:Enc_255 med:orderedTest res:Lab_116 .

res:Inv_195 a med:Invoice ;
    med:forPatient res:Pat_YUS161 ; med:date "2023-08-17"^^xsd:date ;
    med:amount 3708 ; med:paid true ;
    med:status "Settled" .
res:Inv_195 med:coveredBy res:Policy_YUS161 .
res:Pat_YUS161 med:hasInvoice res:Inv_195 .

res:Enc_256 a med:Consultation ;
    med:encounterOf res:Pat_YUS161 ; med:date "2024-08-06"^^xsd:date ;
    med:time "08:30" ;
    med:attendedBy res:Doc_Priya ; med:inDepartment res:Dept_Neurology ;
    med:reason "Review of stroke" ;
    med:outcome "Discharged with advice" ;
    med:recordedCondition res:Cond_173 ;
    med:hasVitals res:Vit_256 ; med:hasNote res:Note_256 .

res:Vit_256 a med:VitalSigns ;
    med:systolic 123 ; med:diastolic 67 ;
    med:heartRate 69 ; med:temperature 98.7 ;
    med:spo2 98 ;
    med:weightKg 62.6 ;
    med:bmi 26.2 .

res:Note_256 a med:ClinicalNote ;
    med:authorName "Dr. Priya" ;
    med:date "2024-08-06"^^xsd:date ;
    med:noteText "Attends for scheduled follow up. Advised on diet, salt restriction and daily walking." .

res:Rx_184 a med:Prescription ;
    med:prescribes res:Med_Clopidogrel ; med:prescribedBy res:Doc_Priya ;
    med:forPatient res:Pat_YUS161 ; med:date "2024-08-06"^^xsd:date ;
    med:dosage "1 tablet" ;
    med:frequency "Twice daily" ;
    med:durationDays 7 ;
    med:dispensed true ;
    med:status "Completed" .

res:Rx_185 a med:Prescription ;
    med:prescribes res:Med_Warfarin ; med:prescribedBy res:Doc_Priya ;
    med:forPatient res:Pat_YUS161 ; med:date "2024-08-06"^^xsd:date ;
    med:dosage "1 dose" ;
    med:frequency "Once daily at night" ;
    med:durationDays 10 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_256 med:issuedPrescription res:Rx_184 , res:Rx_185 .
res:Pat_YUS161 med:hasPrescription res:Rx_184 , res:Rx_185 .

res:Lab_117 a med:LabOrder ;
    med:analyte "INR" ; med:forPatient res:Pat_YUS161 ;
    med:date "2024-08-06"^^xsd:date ; med:orderedBy res:Doc_Priya ;
    med:testsFor res:Stroke ;
    med:orderStatus "Resulted" ;
    med:hasResult res:Res_117 .

res:Res_117 a med:LabResult ;
    med:analyte "INR" ; med:value 2.62 ; med:unit "ratio" ;
    med:refLow 0.9 ; med:refHigh 1.2 ; med:outOfRange true ;
    med:date "2024-08-07"^^xsd:date ;
    med:performedBy res:Tech_Mohan .

res:Enc_256 med:orderedTest res:Lab_117 .

res:Inv_196 a med:Invoice ;
    med:forPatient res:Pat_YUS161 ; med:date "2024-08-06"^^xsd:date ;
    med:amount 2713 ; med:paid true ;
    med:status "Settled" .
res:Inv_196 med:coveredBy res:Policy_YUS161 .
res:Pat_YUS161 med:hasInvoice res:Inv_196 .

res:Enc_257 a med:Consultation ;
    med:encounterOf res:Pat_YUS161 ; med:date "2025-08-05"^^xsd:date ;
    med:time "16:30" ;
    med:attendedBy res:Doc_Priya ; med:inDepartment res:Dept_Neurology ;
    med:reason "Review of stroke" ;
    med:outcome "Follow up scheduled" ;
    med:recordedCondition res:Cond_173 ;
    med:hasVitals res:Vit_257 ; med:hasNote res:Note_257 .

res:Vit_257 a med:VitalSigns ;
    med:systolic 116 ; med:diastolic 72 ;
    med:heartRate 92 ; med:temperature 98.1 ;
    med:spo2 99 ;
    med:weightKg 51.1 ;
    med:bmi 24.7 .

res:Note_257 a med:ClinicalNote ;
    med:authorName "Dr. Priya" ;
    med:date "2025-08-05"^^xsd:date ;
    med:noteText "Referred from general medicine for specialist opinion. Reassured. No change to treatment at this stage." .

res:Rx_186 a med:Prescription ;
    med:prescribes res:Med_Warfarin ; med:prescribedBy res:Doc_Priya ;
    med:forPatient res:Pat_YUS161 ; med:date "2025-08-05"^^xsd:date ;
    med:dosage "1 tablet" ;
    med:frequency "As required" ;
    med:durationDays 14 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_257 med:issuedPrescription res:Rx_186 .
res:Pat_YUS161 med:hasPrescription res:Rx_186 .

res:Lab_118 a med:LabOrder ;
    med:analyte "INR" ; med:forPatient res:Pat_YUS161 ;
    med:date "2025-08-05"^^xsd:date ; med:orderedBy res:Doc_Priya ;
    med:testsFor res:Stroke ;
    med:orderStatus "Resulted" ;
    med:hasResult res:Res_118 .

res:Res_118 a med:LabResult ;
    med:analyte "INR" ; med:value 1.8 ; med:unit "ratio" ;
    med:refLow 0.9 ; med:refHigh 1.2 ; med:outOfRange true ;
    med:date "2025-08-06"^^xsd:date ;
    med:performedBy res:Tech_Mohan .

res:Enc_257 med:orderedTest res:Lab_118 .

res:Inv_197 a med:Invoice ;
    med:forPatient res:Pat_YUS161 ; med:date "2025-08-05"^^xsd:date ;
    med:amount 5557 ; med:paid true ;
    med:status "Settled" .
res:Inv_197 med:coveredBy res:Policy_YUS161 .
res:Pat_YUS161 med:hasInvoice res:Inv_197 .

res:Enc_258 a med:EmergencyVisit ;
    med:encounterOf res:Pat_YUS161 ; med:date "2026-08-30"^^xsd:date ;
    med:time "17:45" ;
    med:attendedBy res:Doc_Karthik ; med:inDepartment res:Dept_Emergency ;
    med:reason "Acute presentation" ;
    med:outcome "Treatment continued" ;
    med:recordedCondition res:Cond_174 ;
    med:hasVitals res:Vit_258 ; med:hasNote res:Note_258 .

res:Vit_258 a med:VitalSigns ;
    med:systolic 114 ; med:diastolic 69 ;
    med:heartRate 102 ; med:temperature 98.2 ;
    med:spo2 96 ;
    med:weightKg 48.1 ;
    med:bmi 23.6 .

res:Note_258 a med:ClinicalNote ;
    med:authorName "Dr. Karthik" ;
    med:date "2026-08-30"^^xsd:date ;
    med:noteText "Post discharge review. Investigations ordered, will call with results." .

res:Rx_187 a med:Prescription ;
    med:prescribes res:Med_Warfarin ; med:prescribedBy res:Doc_Karthik ;
    med:forPatient res:Pat_YUS161 ; med:date "2026-08-30"^^xsd:date ;
    med:dosage "1 tablet" ;
    med:frequency "Twice daily" ;
    med:durationDays 30 ;
    med:dispensed false ;
    med:status "Active" .

res:Enc_258 med:issuedPrescription res:Rx_187 .
res:Pat_YUS161 med:hasPrescription res:Rx_187 .

res:Lab_119 a med:LabOrder ;
    med:analyte "INR" ; med:forPatient res:Pat_YUS161 ;
    med:date "2026-08-30"^^xsd:date ; med:orderedBy res:Doc_Karthik ;
    med:testsFor res:AtrialFibrillation ;
    med:orderStatus "Resulted" ;
    med:hasResult res:Res_119 .

res:Res_119 a med:LabResult ;
    med:analyte "INR" ; med:value 1.81 ; med:unit "ratio" ;
    med:refLow 0.9 ; med:refHigh 1.2 ; med:outOfRange true ;
    med:date "2026-08-30"^^xsd:date ;
    med:performedBy res:Tech_Mohan .

res:Enc_258 med:orderedTest res:Lab_119 .

res:Inv_198 a med:Invoice ;
    med:forPatient res:Pat_YUS161 ; med:date "2026-08-30"^^xsd:date ;
    med:amount 19797 ; med:paid false ;
    med:status "Insurance claim pending" .
res:Inv_198 med:coveredBy res:Policy_YUS161 .
res:Pat_YUS161 med:hasInvoice res:Inv_198 .

res:Policy_YUS161 a med:InsurancePolicy ;
    med:policyNumber "HD-488928" ;
    med:issuedBy res:Ins_HDFCErgo ; med:coveragePercent 70 ;
    med:amount 300000 .
res:Pat_YUS161 med:hasPolicy res:Policy_YUS161 .

res:Appt_38 a med:Appointment ;
    med:forPatient res:Pat_YUS161 ; med:appointmentWith res:Doc_Priya ;
    med:date "2026-09-11"^^xsd:date ;
    med:time "14:40" ;
    med:inDepartment res:Dept_Neurology ;
    med:status "Scheduled" .
res:Pat_YUS161 med:hasAppointment res:Appt_38 .

res:Pat_IBR162 a med:OutPatient ;
    med:name "Ibrahim Thomas" ; med:mrn "MRN-IBR162" ; med:photoInitials "IT" ;
    med:sex "Male" ; med:dateOfBirth "2018-03-18"^^xsd:date ; med:age 8 ;
    med:bloodGroup "A-" ; med:phone "+91 97823 532844" ; med:email "ibrahim.thomas@example.in" ;
    med:address "79 Anna Salai, Adyar, Chennai" ;
    med:primaryPhysician res:Doc_Priya ;
    med:hasCondition res:Cond_175 .

res:Cond_175 a med:Condition ;
    med:ofDisease res:Migraine ; med:onsetDate "2026-01-06"^^xsd:date ;
    med:severity "Moderate" ;
    med:clinicalStatus "Resolved" ;
    med:resolvedDate "2026-03-02"^^xsd:date ;
    med:diagnosedBy res:Doc_Priya .

res:Pat_IBR162 med:hasEncounter res:Enc_259 , res:Enc_260 .

res:Enc_259 a med:EmergencyVisit ;
    med:encounterOf res:Pat_IBR162 ; med:date "2024-08-10"^^xsd:date ;
    med:time "14:00" ;
    med:attendedBy res:Doc_Karthik ; med:inDepartment res:Dept_Emergency ;
    med:reason "Acute presentation" ;
    med:outcome "Follow up scheduled" ;
    med:recordedCondition res:Cond_175 ;
    med:hasVitals res:Vit_259 ; med:hasNote res:Note_259 .

res:Vit_259 a med:VitalSigns ;
    med:systolic 114 ; med:diastolic 82 ;
    med:heartRate 97 ; med:temperature 100.1 ;
    med:spo2 97 ;
    med:weightKg 57.7 ;
    med:bmi 25.8 .

res:Note_259 a med:ClinicalNote ;
    med:authorName "Dr. Karthik" ;
    med:date "2024-08-10"^^xsd:date ;
    med:noteText "Routine review, no new complaints. Continue current therapy, review in three months." .

res:Rx_188 a med:Prescription ;
    med:prescribes res:Med_Ibuprofen ; med:prescribedBy res:Doc_Karthik ;
    med:forPatient res:Pat_IBR162 ; med:date "2024-08-10"^^xsd:date ;
    med:dosage "1 dose" ;
    med:frequency "As required" ;
    med:durationDays 10 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_259 med:issuedPrescription res:Rx_188 .
res:Pat_IBR162 med:hasPrescription res:Rx_188 .

res:Enc_260 a med:Admission ;
    med:encounterOf res:Pat_IBR162 ; med:date "2026-08-24"^^xsd:date ;
    med:time "14:15" ;
    med:attendedBy res:Doc_Joseph ; med:inDepartment res:Dept_Neurology ;
    med:reason "Review of migraine" ;
    med:outcome "Admitted to ward" ;
    med:lengthOfStay 9 ;
    med:recordedCondition res:Cond_175 ;
    med:hasVitals res:Vit_260 ; med:hasNote res:Note_260 .

res:Vit_260 a med:VitalSigns ;
    med:systolic 116 ; med:diastolic 74 ;
    med:heartRate 74 ; med:temperature 98.0 ;
    med:spo2 97 ;
    med:weightKg 63.0 ;
    med:bmi 24.6 .

res:Note_260 a med:ClinicalNote ;
    med:authorName "Dr. Joseph" ;
    med:date "2026-08-24"^^xsd:date ;
    med:noteText "Seen for worsening symptoms over the past week. Counselled on medication adherence. Red flag symptoms explained." .

res:Rx_189 a med:Prescription ;
    med:prescribes res:Med_Paracetamol ; med:prescribedBy res:Doc_Joseph ;
    med:forPatient res:Pat_IBR162 ; med:date "2026-08-24"^^xsd:date ;
    med:dosage "1 tablet" ;
    med:frequency "Three times daily" ;
    med:durationDays 14 ;
    med:dispensed true ;
    med:status "Completed" .

res:Rx_190 a med:Prescription ;
    med:prescribes res:Med_Ibuprofen ; med:prescribedBy res:Doc_Joseph ;
    med:forPatient res:Pat_IBR162 ; med:date "2026-08-24"^^xsd:date ;
    med:dosage "1 tablet" ;
    med:frequency "As required" ;
    med:durationDays 7 ;
    med:dispensed false ;
    med:status "Completed" .

res:Enc_260 med:issuedPrescription res:Rx_189 , res:Rx_190 .
res:Pat_IBR162 med:hasPrescription res:Rx_189 , res:Rx_190 .

res:Inv_199 a med:Invoice ;
    med:forPatient res:Pat_IBR162 ; med:date "2026-08-24"^^xsd:date ;
    med:amount 75632 ; med:paid true ;
    med:status "Settled" .
res:Pat_IBR162 med:hasInvoice res:Inv_199 .

res:Appt_39 a med:Appointment ;
    med:forPatient res:Pat_IBR162 ; med:appointmentWith res:Doc_Priya ;
    med:date "2026-09-23"^^xsd:date ;
    med:time "13:20" ;
    med:inDepartment res:Dept_Neurology ;
    med:status "Scheduled" .
res:Pat_IBR162 med:hasAppointment res:Appt_39 .

res:Pat_ANI163 a med:OutPatient ;
    med:name "Anitha Begum" ; med:mrn "MRN-ANI163" ; med:photoInitials "AB" ;
    med:sex "Female" ; med:dateOfBirth "1976-08-13"^^xsd:date ; med:age 50 ;
    med:bloodGroup "AB+" ; med:phone "+91 95666 877522" ; med:email "anitha.begum@example.in" ;
    med:address "25 Kamarajar Street, Perungudi, Chennai" ;
    med:primaryPhysician res:Doc_Priya ;
    med:hasCondition res:Cond_176 .

res:Cond_176 a med:Condition ;
    med:ofDisease res:Migraine ; med:onsetDate "2025-02-02"^^xsd:date ;
    med:severity "Moderate" ;
    med:clinicalStatus "Resolved" ;
    med:resolvedDate "2025-03-30"^^xsd:date ;
    med:diagnosedBy res:Doc_Priya .

res:Pat_ANI163 med:hasEncounter res:Enc_261 .

res:Enc_261 a med:EmergencyVisit ;
    med:encounterOf res:Pat_ANI163 ; med:date "2026-08-30"^^xsd:date ;
    med:time "11:00" ;
    med:attendedBy res:Doc_Karthik ; med:inDepartment res:Dept_Emergency ;
    med:reason "Acute presentation" ;
    med:outcome "Referred for tests" ;
    med:recordedCondition res:Cond_176 ;
    med:hasVitals res:Vit_261 ; med:hasNote res:Note_261 .

res:Vit_261 a med:VitalSigns ;
    med:systolic 133 ; med:diastolic 75 ;
    med:heartRate 62 ; med:temperature 97.4 ;
    med:spo2 97 ;
    med:weightKg 55.9 ;
    med:bmi 21.8 .

res:Note_261 a med:ClinicalNote ;
    med:authorName "Dr. Karthik" ;
    med:date "2026-08-30"^^xsd:date ;
    med:noteText "Attends for scheduled follow up. Referral raised to the relevant specialty." .

res:Rx_191 a med:Prescription ;
    med:prescribes res:Med_Paracetamol ; med:prescribedBy res:Doc_Karthik ;
    med:forPatient res:Pat_ANI163 ; med:date "2026-08-30"^^xsd:date ;
    med:dosage "1 dose" ;
    med:frequency "Once daily at night" ;
    med:durationDays 7 ;
    med:dispensed false ;
    med:status "Completed" .

res:Rx_192 a med:Prescription ;
    med:prescribes res:Med_Ibuprofen ; med:prescribedBy res:Doc_Karthik ;
    med:forPatient res:Pat_ANI163 ; med:date "2026-08-30"^^xsd:date ;
    med:dosage "2 tablets" ;
    med:frequency "Once daily" ;
    med:durationDays 5 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_261 med:issuedPrescription res:Rx_191 , res:Rx_192 .
res:Pat_ANI163 med:hasPrescription res:Rx_191 , res:Rx_192 .

res:Inv_200 a med:Invoice ;
    med:forPatient res:Pat_ANI163 ; med:date "2026-08-30"^^xsd:date ;
    med:amount 24026 ; med:paid false ;
    med:status "Insurance claim pending" .
res:Inv_200 med:coveredBy res:Policy_ANI163 .
res:Pat_ANI163 med:hasInvoice res:Inv_200 .

res:Policy_ANI163 a med:InsurancePolicy ;
    med:policyNumber "ST-701354" ;
    med:issuedBy res:Ins_StarHealth ; med:coveragePercent 90 ;
    med:amount 500000 .
res:Pat_ANI163 med:hasPolicy res:Policy_ANI163 .

res:Appt_40 a med:Appointment ;
    med:forPatient res:Pat_ANI163 ; med:appointmentWith res:Doc_Priya ;
    med:date "2026-10-10"^^xsd:date ;
    med:time "15:00" ;
    med:inDepartment res:Dept_Neurology ;
    med:status "Scheduled" .
res:Pat_ANI163 med:hasAppointment res:Appt_40 .

res:Pat_RAD164 a med:OutPatient ;
    med:name "Radha Nair" ; med:mrn "MRN-RAD164" ; med:photoInitials "RN" ;
    med:sex "Female" ; med:dateOfBirth "1956-10-27"^^xsd:date ; med:age 69 ;
    med:bloodGroup "A+" ; med:phone "+91 95855 994390" ; med:email "radha.nair@example.in" ;
    med:address "62 GST Road, Navalur, Chennai" ;
    med:primaryPhysician res:Doc_Sameer ;
    med:hasCondition res:Cond_177 , res:Cond_178 , res:Cond_179 , res:Cond_180 , res:Cond_181 .

res:Cond_177 a med:Condition ;
    med:ofDisease res:COPD ; med:onsetDate "2021-12-18"^^xsd:date ;
    med:severity "Moderate" ;
    med:clinicalStatus "Active" ;
    med:diagnosedBy res:Doc_Sameer .

res:Cond_178 a med:Condition ;
    med:ofDisease res:Asthma ; med:onsetDate "2018-11-14"^^xsd:date ;
    med:severity "Mild" ;
    med:clinicalStatus "Active" ;
    med:diagnosedBy res:Doc_Sameer .

res:Cond_179 a med:Condition , med:CriticalCondition ;
    med:ofDisease res:HeartFailure ; med:onsetDate "2018-04-18"^^xsd:date ;
    med:severity "Severe" ;
    med:clinicalStatus "Active" ;
    med:diagnosedBy res:Doc_Ramesh .

res:Cond_180 a med:Condition ;
    med:ofDisease res:SleepApnea ; med:onsetDate "2025-01-19"^^xsd:date ;
    med:severity "Moderate" ;
    med:clinicalStatus "Active" ;
    med:diagnosedBy res:Doc_Sameer .

res:Cond_181 a med:Condition ;
    med:ofDisease res:Pneumonia ; med:onsetDate "2026-08-08"^^xsd:date ;
    med:severity "Moderate" ;
    med:clinicalStatus "Resolved" ;
    med:resolvedDate "2026-08-30"^^xsd:date ;
    med:diagnosedBy res:Doc_Sameer .

res:Pat_RAD164 med:hasEncounter res:Enc_262 , res:Enc_263 , res:Enc_264 , res:Enc_265 , res:Enc_266 , res:Enc_267 .

res:Enc_262 a med:Consultation ;
    med:encounterOf res:Pat_RAD164 ; med:date "2023-04-02"^^xsd:date ;
    med:time "16:15" ;
    med:attendedBy res:Doc_Sameer ; med:inDepartment res:Dept_Pulmonology ;
    med:reason "First presentation" ;
    med:outcome "Discharged with advice" ;
    med:recordedCondition res:Cond_177 ;
    med:hasVitals res:Vit_262 ; med:hasNote res:Note_262 .

res:Vit_262 a med:VitalSigns ;
    med:systolic 114 ; med:diastolic 71 ;
    med:heartRate 63 ; med:temperature 98.2 ;
    med:spo2 91 ;
    med:weightKg 52.8 ;
    med:bmi 25.9 .

res:Note_262 a med:ClinicalNote ;
    med:authorName "Dr. Sameer" ;
    med:date "2023-04-02"^^xsd:date ;
    med:noteText "Patient reports steady improvement since last visit. Reassured. No change to treatment at this stage." .

res:Rx_193 a med:Prescription ;
    med:prescribes res:Med_Salbutamol ; med:prescribedBy res:Doc_Sameer ;
    med:forPatient res:Pat_RAD164 ; med:date "2023-04-02"^^xsd:date ;
    med:dosage "1 tablet" ;
    med:frequency "Once daily at night" ;
    med:durationDays 90 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_262 med:issuedPrescription res:Rx_193 .
res:Pat_RAD164 med:hasPrescription res:Rx_193 .

res:Inv_201 a med:Invoice ;
    med:forPatient res:Pat_RAD164 ; med:date "2023-04-02"^^xsd:date ;
    med:amount 5981 ; med:paid true ;
    med:status "Settled" .
res:Pat_RAD164 med:hasInvoice res:Inv_201 .

res:Enc_263 a med:Consultation ;
    med:encounterOf res:Pat_RAD164 ; med:date "2023-11-27"^^xsd:date ;
    med:time "16:15" ;
    med:attendedBy res:Doc_Joseph ; med:inDepartment res:Dept_Pulmonology ;
    med:reason "Review of pneumonia" ;
    med:outcome "Discharged with advice" ;
    med:recordedCondition res:Cond_181 ;
    med:hasVitals res:Vit_263 ; med:hasNote res:Note_263 .

res:Vit_263 a med:VitalSigns ;
    med:systolic 121 ; med:diastolic 82 ;
    med:heartRate 68 ; med:temperature 98.1 ;
    med:spo2 91 ;
    med:weightKg 68.1 ;
    med:bmi 26.5 .

res:Note_263 a med:ClinicalNote ;
    med:authorName "Dr. Joseph" ;
    med:date "2023-11-27"^^xsd:date ;
    med:noteText "Post discharge review. Continue current therapy, review in three months." .

res:Rx_194 a med:Prescription ;
    med:prescribes res:Med_Azithromycin ; med:prescribedBy res:Doc_Joseph ;
    med:forPatient res:Pat_RAD164 ; med:date "2023-11-27"^^xsd:date ;
    med:dosage "2 tablets" ;
    med:frequency "Three times daily" ;
    med:durationDays 5 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_263 med:issuedPrescription res:Rx_194 .
res:Pat_RAD164 med:hasPrescription res:Rx_194 .

res:Inv_202 a med:Invoice ;
    med:forPatient res:Pat_RAD164 ; med:date "2023-11-27"^^xsd:date ;
    med:amount 3394 ; med:paid true ;
    med:status "Settled" .
res:Pat_RAD164 med:hasInvoice res:Inv_202 .

res:Enc_264 a med:Consultation ;
    med:encounterOf res:Pat_RAD164 ; med:date "2024-07-24"^^xsd:date ;
    med:time "13:15" ;
    med:attendedBy res:Doc_Ramesh ; med:inDepartment res:Dept_Cardiology ;
    med:reason "Review of heart failure" ;
    med:outcome "Treatment continued" ;
    med:recordedCondition res:Cond_179 ;
    med:hasVitals res:Vit_264 ; med:hasNote res:Note_264 .

res:Vit_264 a med:VitalSigns ;
    med:systolic 111 ; med:diastolic 73 ;
    med:heartRate 70 ; med:temperature 99.9 ;
    med:spo2 89 ;
    med:weightKg 64.3 ;
    med:bmi 23.7 .

res:Note_264 a med:ClinicalNote ;
    med:authorName "Dr. Ramesh" ;
    med:date "2024-07-24"^^xsd:date ;
    med:noteText "Presents with a two day history of symptoms. Counselled on medication adherence. Red flag symptoms explained." .

res:Rx_195 a med:Prescription ;
    med:prescribes res:Med_Metoprolol ; med:prescribedBy res:Doc_Ramesh ;
    med:forPatient res:Pat_RAD164 ; med:date "2024-07-24"^^xsd:date ;
    med:dosage "2 tablets" ;
    med:frequency "Three times daily" ;
    med:durationDays 30 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_264 med:issuedPrescription res:Rx_195 .
res:Pat_RAD164 med:hasPrescription res:Rx_195 .

res:Lab_120 a med:LabOrder ;
    med:analyte "NT-proBNP" ; med:forPatient res:Pat_RAD164 ;
    med:date "2024-07-24"^^xsd:date ; med:orderedBy res:Doc_Ramesh ;
    med:testsFor res:HeartFailure ;
    med:orderStatus "Resulted" ;
    med:hasResult res:Res_120 .

res:Res_120 a med:LabResult ;
    med:analyte "NT-proBNP" ; med:value 3285.14 ; med:unit "pg/mL" ;
    med:refLow 0 ; med:refHigh 125 ; med:outOfRange true ;
    med:date "2024-07-25"^^xsd:date ;
    med:performedBy res:Tech_Mohan .

res:Enc_264 med:orderedTest res:Lab_120 .

res:Inv_203 a med:Invoice ;
    med:forPatient res:Pat_RAD164 ; med:date "2024-07-24"^^xsd:date ;
    med:amount 4344 ; med:paid true ;
    med:status "Settled" .
res:Pat_RAD164 med:hasInvoice res:Inv_203 .

res:Enc_265 a med:Consultation ;
    med:encounterOf res:Pat_RAD164 ; med:date "2025-04-29"^^xsd:date ;
    med:time "11:45" ;
    med:attendedBy res:Doc_Sameer ; med:inDepartment res:Dept_Pulmonology ;
    med:reason "Review of sleep apnea" ;
    med:outcome "Follow up scheduled" ;
    med:recordedCondition res:Cond_180 ;
    med:hasVitals res:Vit_265 ; med:hasNote res:Note_265 .

res:Vit_265 a med:VitalSigns ;
    med:systolic 126 ; med:diastolic 84 ;
    med:heartRate 95 ; med:temperature 99.0 ;
    med:spo2 93 ;
    med:weightKg 69.5 ;
    med:bmi 23.2 .

res:Note_265 a med:ClinicalNote ;
    med:authorName "Dr. Sameer" ;
    med:date "2025-04-29"^^xsd:date ;
    med:noteText "Presents with a two day history of symptoms. Investigations ordered, will call with results." .

res:Enc_266 a med:FollowUp ;
    med:encounterOf res:Pat_RAD164 ; med:date "2025-12-21"^^xsd:date ;
    med:time "14:45" ;
    med:attendedBy res:Doc_Ramesh ; med:inDepartment res:Dept_Cardiology ;
    med:reason "Review of heart failure" ;
    med:outcome "Follow up scheduled" ;
    med:recordedCondition res:Cond_179 ;
    med:hasVitals res:Vit_266 ; med:hasNote res:Note_266 .

res:Vit_266 a med:VitalSigns ;
    med:systolic 125 ; med:diastolic 79 ;
    med:heartRate 90 ; med:temperature 97.8 ;
    med:spo2 93 ;
    med:weightKg 57.9 ;
    med:bmi 24.8 .

res:Note_266 a med:ClinicalNote ;
    med:authorName "Dr. Ramesh" ;
    med:date "2025-12-21"^^xsd:date ;
    med:noteText "Seen for worsening symptoms over the past week. Dose adjusted, repeat bloods before next visit." .

res:Lab_121 a med:LabOrder ;
    med:analyte "NT-proBNP" ; med:forPatient res:Pat_RAD164 ;
    med:date "2025-12-21"^^xsd:date ; med:orderedBy res:Doc_Ramesh ;
    med:testsFor res:HeartFailure ;
    med:orderStatus "Resulted" ;
    med:hasResult res:Res_121 .

res:Res_121 a med:LabResult ;
    med:analyte "NT-proBNP" ; med:value 1442.74 ; med:unit "pg/mL" ;
    med:refLow 0 ; med:refHigh 125 ; med:outOfRange true ;
    med:date "2025-12-22"^^xsd:date ;
    med:performedBy res:Tech_Mohan .

res:Enc_266 med:orderedTest res:Lab_121 .

res:Inv_204 a med:Invoice ;
    med:forPatient res:Pat_RAD164 ; med:date "2025-12-21"^^xsd:date ;
    med:amount 3725 ; med:paid true ;
    med:status "Settled" .
res:Pat_RAD164 med:hasInvoice res:Inv_204 .

res:Enc_267 a med:Admission ;
    med:encounterOf res:Pat_RAD164 ; med:date "2026-08-30"^^xsd:date ;
    med:time "18:00" ;
    med:attendedBy res:Doc_Farida ; med:inDepartment res:Dept_Cardiology ;
    med:reason "Review of heart failure" ;
    med:outcome "Admitted to ward" ;
    med:lengthOfStay 5 ;
    med:recordedCondition res:Cond_179 ;
    med:hasVitals res:Vit_267 ; med:hasNote res:Note_267 .

res:Vit_267 a med:VitalSigns ;
    med:systolic 123 ; med:diastolic 82 ;
    med:heartRate 71 ; med:temperature 98.0 ;
    med:spo2 93 ;
    med:weightKg 51.8 ;
    med:bmi 21.0 .

res:Note_267 a med:ClinicalNote ;
    med:authorName "Dr. Farida" ;
    med:date "2026-08-30"^^xsd:date ;
    med:noteText "Post discharge review. Investigations ordered, will call with results." .

res:Rx_196 a med:Prescription ;
    med:prescribes res:Med_Metoprolol ; med:prescribedBy res:Doc_Farida ;
    med:forPatient res:Pat_RAD164 ; med:date "2026-08-30"^^xsd:date ;
    med:dosage "1 tablet" ;
    med:frequency "As required" ;
    med:durationDays 30 ;
    med:dispensed true ;
    med:status "Active" .

res:Enc_267 med:issuedPrescription res:Rx_196 .
res:Pat_RAD164 med:hasPrescription res:Rx_196 .

res:Lab_122 a med:LabOrder ;
    med:analyte "NT-proBNP" ; med:forPatient res:Pat_RAD164 ;
    med:date "2026-08-30"^^xsd:date ; med:orderedBy res:Doc_Farida ;
    med:testsFor res:HeartFailure ;
    med:orderStatus "Resulted" ;
    med:hasResult res:Res_122 .

res:Res_122 a med:LabResult ;
    med:analyte "NT-proBNP" ; med:value 629.41 ; med:unit "pg/mL" ;
    med:refLow 0 ; med:refHigh 125 ; med:outOfRange true ;
    med:date "2026-08-30"^^xsd:date ;
    med:performedBy res:Tech_Mohan .

res:Enc_267 med:orderedTest res:Lab_122 .

res:Appt_41 a med:Appointment ;
    med:forPatient res:Pat_RAD164 ; med:appointmentWith res:Doc_Sameer ;
    med:date "2026-09-05"^^xsd:date ;
    med:time "17:00" ;
    med:inDepartment res:Dept_Pulmonology ;
    med:status "Scheduled" .
res:Pat_RAD164 med:hasAppointment res:Appt_41 .

res:Pat_ARJ165 a med:OutPatient ;
    med:name "Arjun Sundaram" ; med:mrn "MRN-ARJ165" ; med:photoInitials "AS" ;
    med:sex "Male" ; med:dateOfBirth "2013-03-24"^^xsd:date ; med:age 13 ;
    med:bloodGroup "B-" ; med:phone "+91 99371 929870" ; med:email "arjun.sundaram@example.in" ;
    med:address "77 GST Road, Chromepet, Chennai" ;
    med:primaryPhysician res:Doc_Sameer ;
    med:hasCondition res:Cond_182 , res:Cond_183 .

res:Cond_182 a med:Condition ;
    med:ofDisease res:Asthma ; med:onsetDate "2022-11-11"^^xsd:date ;
    med:severity "Moderate" ;
    med:clinicalStatus "Active" ;
    med:diagnosedBy res:Doc_Sameer .

res:Cond_183 a med:Condition ;
    med:ofDisease res:UrinaryTractInfection ; med:onsetDate "2025-08-15"^^xsd:date ;
    med:severity "Moderate" ;
    med:clinicalStatus "Active" ;
    med:diagnosedBy res:Doc_Joseph .

res:Pat_ARJ165 med:hasEncounter res:Enc_268 , res:Enc_269 , res:Enc_270 , res:Enc_271 , res:Enc_272 .

res:Enc_268 a med:Consultation ;
    med:encounterOf res:Pat_ARJ165 ; med:date "2023-05-18"^^xsd:date ;
    med:time "11:15" ;
    med:attendedBy res:Doc_Sameer ; med:inDepartment res:Dept_Pulmonology ;
    med:reason "First presentation" ;
    med:outcome "Treatment continued" ;
    med:recordedCondition res:Cond_182 ;
    med:hasVitals res:Vit_268 ; med:hasNote res:Note_268 .

res:Vit_268 a med:VitalSigns ;
    med:systolic 119 ; med:diastolic 73 ;
    med:heartRate 62 ; med:temperature 98.4 ;
    med:spo2 89 ;
    med:weightKg 70.4 ;
    med:bmi 23.1 .

res:Note_268 a med:ClinicalNote ;
    med:authorName "Dr. Sameer" ;
    med:date "2023-05-18"^^xsd:date ;
    med:noteText "Referred from general medicine for specialist opinion. Dose adjusted, repeat bloods before next visit." .

res:Rx_197 a med:Prescription ;
    med:prescribes res:Med_Salbutamol ; med:prescribedBy res:Doc_Sameer ;
    med:forPatient res:Pat_ARJ165 ; med:date "2023-05-18"^^xsd:date ;
    med:dosage "2 tablets" ;
    med:frequency "Three times daily" ;
    med:durationDays 90 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_268 med:issuedPrescription res:Rx_197 .
res:Pat_ARJ165 med:hasPrescription res:Rx_197 .

res:Inv_205 a med:Invoice ;
    med:forPatient res:Pat_ARJ165 ; med:date "2023-05-18"^^xsd:date ;
    med:amount 4842 ; med:paid false ;
    med:status "Awaiting payment" .
res:Pat_ARJ165 med:hasInvoice res:Inv_205 .

res:Enc_269 a med:Consultation ;
    med:encounterOf res:Pat_ARJ165 ; med:date "2024-03-30"^^xsd:date ;
    med:time "18:30" ;
    med:attendedBy res:Doc_Sameer ; med:inDepartment res:Dept_Pulmonology ;
    med:reason "Review of asthma" ;
    med:outcome "Referred for tests" ;
    med:recordedCondition res:Cond_182 ;
    med:hasVitals res:Vit_269 ; med:hasNote res:Note_269 .

res:Vit_269 a med:VitalSigns ;
    med:systolic 116 ; med:diastolic 79 ;
    med:heartRate 66 ; med:temperature 99.5 ;
    med:spo2 94 ;
    med:weightKg 65.8 ;
    med:bmi 25.0 .

res:Note_269 a med:ClinicalNote ;
    med:authorName "Dr. Sameer" ;
    med:date "2024-03-30"^^xsd:date ;
    med:noteText "Seen for worsening symptoms over the past week. Referral raised to the relevant specialty." .

res:Inv_206 a med:Invoice ;
    med:forPatient res:Pat_ARJ165 ; med:date "2024-03-30"^^xsd:date ;
    med:amount 4546 ; med:paid true ;
    med:status "Settled" .
res:Pat_ARJ165 med:hasInvoice res:Inv_206 .

res:Enc_270 a med:Consultation ;
    med:encounterOf res:Pat_ARJ165 ; med:date "2024-12-26"^^xsd:date ;
    med:time "08:15" ;
    med:attendedBy res:Doc_Suresh ; med:inDepartment res:Dept_GeneralMedicine ;
    med:reason "Review of urinary tract infection" ;
    med:outcome "Discharged with advice" ;
    med:recordedCondition res:Cond_183 ;
    med:hasVitals res:Vit_270 ; med:hasNote res:Note_270 .

res:Vit_270 a med:VitalSigns ;
    med:systolic 110 ; med:diastolic 72 ;
    med:heartRate 75 ; med:temperature 97.5 ;
    med:spo2 94 ;
    med:weightKg 49.4 ;
    med:bmi 22.4 .

res:Note_270 a med:ClinicalNote ;
    med:authorName "Dr. Suresh" ;
    med:date "2024-12-26"^^xsd:date ;
    med:noteText "Patient reports steady improvement since last visit. Continue current therapy, review in three months." .

res:Rx_198 a med:Prescription ;
    med:prescribes res:Med_Nitrofurantoin ; med:prescribedBy res:Doc_Suresh ;
    med:forPatient res:Pat_ARJ165 ; med:date "2024-12-26"^^xsd:date ;
    med:dosage "2 tablets" ;
    med:frequency "Three times daily" ;
    med:durationDays 7 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_270 med:issuedPrescription res:Rx_198 .
res:Pat_ARJ165 med:hasPrescription res:Rx_198 .

res:Lab_123 a med:LabOrder ;
    med:analyte "Urine WBC" ; med:forPatient res:Pat_ARJ165 ;
    med:date "2024-12-26"^^xsd:date ; med:orderedBy res:Doc_Suresh ;
    med:testsFor res:UrinaryTractInfection ;
    med:orderStatus "Resulted" ;
    med:hasResult res:Res_123 .

res:Res_123 a med:LabResult ;
    med:analyte "Urine WBC" ; med:value 11.3 ; med:unit "/hpf" ;
    med:refLow 0 ; med:refHigh 5 ; med:outOfRange true ;
    med:date "2024-12-27"^^xsd:date ;
    med:performedBy res:Tech_Mohan .

res:Enc_270 med:orderedTest res:Lab_123 .

res:Inv_207 a med:Invoice ;
    med:forPatient res:Pat_ARJ165 ; med:date "2024-12-26"^^xsd:date ;
    med:amount 1227 ; med:paid true ;
    med:status "Settled" .
res:Pat_ARJ165 med:hasInvoice res:Inv_207 .

res:Enc_271 a med:DayCareVisit ;
    med:encounterOf res:Pat_ARJ165 ; med:date "2025-11-11"^^xsd:date ;
    med:time "17:30" ;
    med:attendedBy res:Doc_Sameer ; med:inDepartment res:Dept_Pulmonology ;
    med:reason "Review of asthma" ;
    med:outcome "Discharged with advice" ;
    med:recordedCondition res:Cond_182 ;
    med:hasVitals res:Vit_271 ; med:hasNote res:Note_271 .

res:Vit_271 a med:VitalSigns ;
    med:systolic 121 ; med:diastolic 79 ;
    med:heartRate 102 ; med:temperature 97.3 ;
    med:spo2 95 ;
    med:weightKg 75.6 ;
    med:bmi 26.5 .

res:Note_271 a med:ClinicalNote ;
    med:authorName "Dr. Sameer" ;
    med:date "2025-11-11"^^xsd:date ;
    med:noteText "Post discharge review. Investigations ordered, will call with results." .

res:Rx_199 a med:Prescription ;
    med:prescribes res:Med_Salbutamol ; med:prescribedBy res:Doc_Sameer ;
    med:forPatient res:Pat_ARJ165 ; med:date "2025-11-11"^^xsd:date ;
    med:dosage "2 tablets" ;
    med:frequency "Three times daily" ;
    med:durationDays 60 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_271 med:issuedPrescription res:Rx_199 .
res:Pat_ARJ165 med:hasPrescription res:Rx_199 .

res:Inv_208 a med:Invoice ;
    med:forPatient res:Pat_ARJ165 ; med:date "2025-11-11"^^xsd:date ;
    med:amount 4762 ; med:paid true ;
    med:status "Settled" .
res:Pat_ARJ165 med:hasInvoice res:Inv_208 .

res:Enc_272 a med:Consultation ;
    med:encounterOf res:Pat_ARJ165 ; med:date "2026-08-29"^^xsd:date ;
    med:time "16:00" ;
    med:attendedBy res:Doc_Sameer ; med:inDepartment res:Dept_Pulmonology ;
    med:reason "Review of asthma" ;
    med:outcome "Discharged with advice" ;
    med:recordedCondition res:Cond_182 ;
    med:hasVitals res:Vit_272 ; med:hasNote res:Note_272 .

res:Vit_272 a med:VitalSigns ;
    med:systolic 119 ; med:diastolic 74 ;
    med:heartRate 90 ; med:temperature 98.8 ;
    med:spo2 88 ;
    med:weightKg 65.1 ;
    med:bmi 26.8 .

res:Note_272 a med:ClinicalNote ;
    med:authorName "Dr. Sameer" ;
    med:date "2026-08-29"^^xsd:date ;
    med:noteText "Reviewed in clinic today. Referral raised to the relevant specialty." .

res:Inv_209 a med:Invoice ;
    med:forPatient res:Pat_ARJ165 ; med:date "2026-08-29"^^xsd:date ;
    med:amount 3333 ; med:paid false ;
    med:status "Awaiting payment" .
res:Pat_ARJ165 med:hasInvoice res:Inv_209 .

res:Pat_NAN166 a med:InPatient ;
    med:name "Nandini Narayanan" ; med:mrn "MRN-NAN166" ; med:photoInitials "NN" ;
    med:sex "Female" ; med:dateOfBirth "1948-05-27"^^xsd:date ; med:age 78 ;
    med:bloodGroup "AB+" ; med:phone "+91 94965 250119" ; med:email "nandini.narayanan@example.in" ;
    med:address "57 Velachery Main Road, Medavakkam, Chennai" ;
    med:primaryPhysician res:Doc_Anand ;
    med:hasCondition res:Cond_184 , res:Cond_185 .

res:Cond_184 a med:Condition , med:CriticalCondition ;
    med:ofDisease res:LungCancer ; med:onsetDate "2025-05-02"^^xsd:date ;
    med:severity "Severe" ;
    med:clinicalStatus "Resolved" ;
    med:resolvedDate "2025-05-25"^^xsd:date ;
    med:diagnosedBy res:Doc_Anand .

res:Cond_185 a med:Condition ;
    med:ofDisease res:Pneumonia ; med:onsetDate "2025-06-11"^^xsd:date ;
    med:severity "Moderate" ;
    med:clinicalStatus "Resolved" ;
    med:resolvedDate "2025-10-21"^^xsd:date ;
    med:diagnosedBy res:Doc_Sameer .

res:Pat_NAN166 med:hasEncounter res:Enc_273 .

res:Enc_273 a med:Consultation ;
    med:encounterOf res:Pat_NAN166 ; med:date "2026-08-25"^^xsd:date ;
    med:time "18:30" ;
    med:attendedBy res:Doc_Anand ; med:inDepartment res:Dept_Oncology ;
    med:reason "First presentation" ;
    med:outcome "Referred for tests" ;
    med:recordedCondition res:Cond_184 ;
    med:hasVitals res:Vit_273 ; med:hasNote res:Note_273 .

res:Vit_273 a med:VitalSigns ;
    med:systolic 108 ; med:diastolic 68 ;
    med:heartRate 94 ; med:temperature 98.3 ;
    med:spo2 98 ;
    med:weightKg 73.5 ;
    med:bmi 20.7 .

res:Note_273 a med:ClinicalNote ;
    med:authorName "Dr. Anand" ;
    med:date "2026-08-25"^^xsd:date ;
    med:noteText "Routine review, no new complaints. Dose adjusted, repeat bloods before next visit." .

res:Lab_124 a med:LabOrder ;
    med:analyte "CEA" ; med:forPatient res:Pat_NAN166 ;
    med:date "2026-08-25"^^xsd:date ; med:orderedBy res:Doc_Anand ;
    med:testsFor res:LungCancer ;
    med:orderStatus "Resulted" ;
    med:hasResult res:Res_124 .

res:Res_124 a med:LabResult ;
    med:analyte "CEA" ; med:value 9.37 ; med:unit "ng/mL" ;
    med:refLow 0 ; med:refHigh 3 ; med:outOfRange true ;
    med:date "2026-08-26"^^xsd:date ;
    med:performedBy res:Tech_Mohan .

res:Enc_273 med:orderedTest res:Lab_124 .

res:Appt_42 a med:Appointment ;
    med:forPatient res:Pat_NAN166 ; med:appointmentWith res:Doc_Anand ;
    med:date "2026-09-08"^^xsd:date ;
    med:time "09:20" ;
    med:inDepartment res:Dept_Oncology ;
    med:status "Scheduled" .
res:Pat_NAN166 med:hasAppointment res:Appt_42 .

res:Pat_NAN166 med:assignedBed res:Bed_2 .

res:Pat_DIN167 a med:OutPatient ;
    med:name "Dinesh Das" ; med:mrn "MRN-DIN167" ; med:photoInitials "DD" ;
    med:sex "Male" ; med:dateOfBirth "1959-10-07"^^xsd:date ; med:age 66 ;
    med:bloodGroup "B+" ; med:phone "+91 95372 700424" ; med:email "dinesh.das@example.in" ;
    med:address "5 Kamarajar Street, Chromepet, Chennai" ;
    med:primaryPhysician res:Doc_Anand ;
    med:hasCondition res:Cond_186 , res:Cond_187 , res:Cond_188 .

res:Cond_186 a med:Condition , med:CriticalCondition ;
    med:ofDisease res:LungCancer ; med:onsetDate "2024-10-15"^^xsd:date ;
    med:severity "Severe" ;
    med:clinicalStatus "Active" ;
    med:diagnosedBy res:Doc_Anand .

res:Cond_187 a med:Condition ;
    med:ofDisease res:COPD ; med:onsetDate "2025-11-24"^^xsd:date ;
    med:severity "Moderate" ;
    med:clinicalStatus "Active" ;
    med:diagnosedBy res:Doc_Sameer .

res:Cond_188 a med:Condition ;
    med:ofDisease res:Anemia ; med:onsetDate "2026-04-28"^^xsd:date ;
    med:severity "Mild" ;
    med:clinicalStatus "Active" ;
    med:diagnosedBy res:Doc_Joseph .

res:Pat_DIN167 med:hasEncounter res:Enc_274 , res:Enc_275 .

res:Enc_274 a med:EmergencyVisit ;
    med:encounterOf res:Pat_DIN167 ; med:date "2024-07-27"^^xsd:date ;
    med:time "17:15" ;
    med:attendedBy res:Doc_Karthik ; med:inDepartment res:Dept_Emergency ;
    med:reason "Acute presentation" ;
    med:outcome "Treatment continued" ;
    med:recordedCondition res:Cond_186 ;
    med:hasVitals res:Vit_274 ; med:hasNote res:Note_274 .

res:Vit_274 a med:VitalSigns ;
    med:systolic 114 ; med:diastolic 75 ;
    med:heartRate 66 ; med:temperature 98.8 ;
    med:spo2 96 ;
    med:weightKg 66.8 ;
    med:bmi 19.8 .

res:Note_274 a med:ClinicalNote ;
    med:authorName "Dr. Karthik" ;
    med:date "2024-07-27"^^xsd:date ;
    med:noteText "Post discharge review. Dose adjusted, repeat bloods before next visit." .

res:Enc_275 a med:Consultation ;
    med:encounterOf res:Pat_DIN167 ; med:date "2026-08-23"^^xsd:date ;
    med:time "10:30" ;
    med:attendedBy res:Doc_Sameer ; med:inDepartment res:Dept_Pulmonology ;
    med:reason "Review of c o p d" ;
    med:outcome "Referred for tests" ;
    med:recordedCondition res:Cond_187 ;
    med:hasVitals res:Vit_275 ; med:hasNote res:Note_275 .

res:Vit_275 a med:VitalSigns ;
    med:systolic 112 ; med:diastolic 84 ;
    med:heartRate 93 ; med:temperature 99.5 ;
    med:spo2 94 ;
    med:weightKg 74.4 ;
    med:bmi 19.1 .

res:Note_275 a med:ClinicalNote ;
    med:authorName "Dr. Sameer" ;
    med:date "2026-08-23"^^xsd:date ;
    med:noteText "Reviewed in clinic today. Investigations ordered, will call with results." .

res:Inv_210 a med:Invoice ;
    med:forPatient res:Pat_DIN167 ; med:date "2026-08-23"^^xsd:date ;
    med:amount 5201 ; med:paid true ;
    med:status "Settled" .
res:Inv_210 med:coveredBy res:Policy_DIN167 .
res:Pat_DIN167 med:hasInvoice res:Inv_210 .

res:Policy_DIN167 a med:InsurancePolicy ;
    med:policyNumber "CG-859605" ;
    med:issuedBy res:Ins_CGHS ; med:coveragePercent 85 ;
    med:amount 750000 .
res:Pat_DIN167 med:hasPolicy res:Policy_DIN167 .

res:Pat_NIR168 a med:OutPatient ;
    med:name "Nirmala Nair" ; med:mrn "MRN-NIR168" ; med:photoInitials "NN" ;
    med:sex "Female" ; med:dateOfBirth "1996-12-09"^^xsd:date ; med:age 29 ;
    med:bloodGroup "O-" ; med:phone "+91 92164 946161" ; med:email "nirmala.nair@example.in" ;
    med:address "45 Anna Salai, Guindy, Chennai" ;
    med:primaryPhysician res:Doc_Karthik ;
    med:hasCondition res:Cond_189 , res:Cond_190 .

res:Cond_189 a med:Condition ;
    med:ofDisease res:Dengue ; med:onsetDate "2025-07-30"^^xsd:date ;
    med:severity "Moderate" ;
    med:clinicalStatus "Active" ;
    med:diagnosedBy res:Doc_Karthik .

res:Cond_190 a med:Condition ;
    med:ofDisease res:UrinaryTractInfection ; med:onsetDate "2025-09-28"^^xsd:date ;
    med:severity "Mild" ;
    med:clinicalStatus "Resolved" ;
    med:resolvedDate "2025-12-13"^^xsd:date ;
    med:diagnosedBy res:Doc_Suresh .

res:Pat_NIR168 med:hasEncounter res:Enc_276 .

res:Enc_276 a med:Consultation ;
    med:encounterOf res:Pat_NIR168 ; med:date "2026-08-30"^^xsd:date ;
    med:time "17:00" ;
    med:attendedBy res:Doc_Joseph ; med:inDepartment res:Dept_GeneralMedicine ;
    med:reason "First presentation" ;
    med:outcome "Discharged with advice" ;
    med:recordedCondition res:Cond_190 ;
    med:hasVitals res:Vit_276 ; med:hasNote res:Note_276 .

res:Vit_276 a med:VitalSigns ;
    med:systolic 129 ; med:diastolic 77 ;
    med:heartRate 99 ; med:temperature 100.4 ;
    med:spo2 96 ;
    med:weightKg 61.4 ;
    med:bmi 24.5 .

res:Note_276 a med:ClinicalNote ;
    med:authorName "Dr. Joseph" ;
    med:date "2026-08-30"^^xsd:date ;
    med:noteText "Presents with a two day history of symptoms. Counselled on medication adherence. Red flag symptoms explained." .

res:Rx_200 a med:Prescription ;
    med:prescribes res:Med_Nitrofurantoin ; med:prescribedBy res:Doc_Joseph ;
    med:forPatient res:Pat_NIR168 ; med:date "2026-08-30"^^xsd:date ;
    med:dosage "1 tablet" ;
    med:frequency "As required" ;
    med:durationDays 5 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_276 med:issuedPrescription res:Rx_200 .
res:Pat_NIR168 med:hasPrescription res:Rx_200 .

res:Lab_125 a med:LabOrder ;
    med:analyte "Urine WBC" ; med:forPatient res:Pat_NIR168 ;
    med:date "2026-08-30"^^xsd:date ; med:orderedBy res:Doc_Joseph ;
    med:testsFor res:UrinaryTractInfection ;
    med:orderStatus "Pending" .

res:Enc_276 med:orderedTest res:Lab_125 .

res:Inv_211 a med:Invoice ;
    med:forPatient res:Pat_NIR168 ; med:date "2026-08-30"^^xsd:date ;
    med:amount 4682 ; med:paid false ;
    med:status "Insurance claim pending" .
res:Inv_211 med:coveredBy res:Policy_NIR168 .
res:Pat_NIR168 med:hasInvoice res:Inv_211 .

res:Policy_NIR168 a med:InsurancePolicy ;
    med:policyNumber "HD-857775" ;
    med:issuedBy res:Ins_HDFCErgo ; med:coveragePercent 60 ;
    med:amount 500000 .
res:Pat_NIR168 med:hasPolicy res:Policy_NIR168 .

res:Pat_SUJ169 a med:OutPatient ;
    med:name "Sujatha Prabhu" ; med:mrn "MRN-SUJ169" ; med:photoInitials "SP" ;
    med:sex "Female" ; med:dateOfBirth "1988-12-16"^^xsd:date ; med:age 37 ;
    med:bloodGroup "AB-" ; med:phone "+91 92161 797309" ; med:email "sujatha.prabhu@example.in" ;
    med:address "89 Bharathi Street, Chromepet, Chennai" ;
    med:primaryPhysician res:Doc_Anand ;
    med:allergicTo res:Allergen_Iodine ;
    med:hasCondition res:Cond_191 .

res:Cond_191 a med:Condition , med:CriticalCondition ;
    med:ofDisease res:BreastCancer ; med:onsetDate "2024-12-02"^^xsd:date ;
    med:severity "Severe" ;
    med:clinicalStatus "Active" ;
    med:diagnosedBy res:Doc_Anand .

res:Pat_SUJ169 med:hasEncounter res:Enc_277 .

res:Enc_277 a med:Consultation ;
    med:encounterOf res:Pat_SUJ169 ; med:date "2026-08-30"^^xsd:date ;
    med:time "18:15" ;
    med:attendedBy res:Doc_Anand ; med:inDepartment res:Dept_Oncology ;
    med:reason "First presentation" ;
    med:outcome "Discharged with advice" ;
    med:recordedCondition res:Cond_191 ;
    med:hasVitals res:Vit_277 ; med:hasNote res:Note_277 .

res:Vit_277 a med:VitalSigns ;
    med:systolic 120 ; med:diastolic 75 ;
    med:heartRate 75 ; med:temperature 97.6 ;
    med:spo2 100 ;
    med:weightKg 64.6 ;
    med:bmi 19.7 .

res:Note_277 a med:ClinicalNote ;
    med:authorName "Dr. Anand" ;
    med:date "2026-08-30"^^xsd:date ;
    med:noteText "Routine review, no new complaints. Reassured. No change to treatment at this stage." .

res:Appt_43 a med:Appointment ;
    med:forPatient res:Pat_SUJ169 ; med:appointmentWith res:Doc_Anand ;
    med:date "2026-09-07"^^xsd:date ;
    med:time "14:20" ;
    med:inDepartment res:Dept_Oncology ;
    med:status "Scheduled" .
res:Pat_SUJ169 med:hasAppointment res:Appt_43 .

res:Pat_MAL170 a med:OutPatient ;
    med:name "Malathi Verma" ; med:mrn "MRN-MAL170" ; med:photoInitials "MV" ;
    med:sex "Female" ; med:dateOfBirth "1963-08-12"^^xsd:date ; med:age 63 ;
    med:bloodGroup "A+" ; med:phone "+91 92524 833904" ; med:email "malathi.verma@example.in" ;
    med:address "3 Anna Salai, Perungudi, Chennai" ;
    med:primaryPhysician res:Doc_Priya ;
    med:hasCondition res:Cond_192 .

res:Cond_192 a med:Condition ;
    med:ofDisease res:Epilepsy ; med:onsetDate "2017-11-12"^^xsd:date ;
    med:severity "Mild" ;
    med:clinicalStatus "Active" ;
    med:diagnosedBy res:Doc_Priya .

res:Pat_MAL170 med:hasEncounter res:Enc_278 , res:Enc_279 , res:Enc_280 .

res:Enc_278 a med:Consultation ;
    med:encounterOf res:Pat_MAL170 ; med:date "2023-11-26"^^xsd:date ;
    med:time "16:00" ;
    med:attendedBy res:Doc_Priya ; med:inDepartment res:Dept_Neurology ;
    med:reason "First presentation" ;
    med:outcome "Follow up scheduled" ;
    med:recordedCondition res:Cond_192 ;
    med:hasVitals res:Vit_278 ; med:hasNote res:Note_278 .

res:Vit_278 a med:VitalSigns ;
    med:systolic 121 ; med:diastolic 71 ;
    med:heartRate 103 ; med:temperature 99.7 ;
    med:spo2 96 ;
    med:weightKg 71.5 ;
    med:bmi 27.4 .

res:Note_278 a med:ClinicalNote ;
    med:authorName "Dr. Priya" ;
    med:date "2023-11-26"^^xsd:date ;
    med:noteText "Presents with a two day history of symptoms. Dose adjusted, repeat bloods before next visit." .

res:Rx_201 a med:Prescription ;
    med:prescribes res:Med_Levetiracetam ; med:prescribedBy res:Doc_Priya ;
    med:forPatient res:Pat_MAL170 ; med:date "2023-11-26"^^xsd:date ;
    med:dosage "1 dose" ;
    med:frequency "Three times daily" ;
    med:durationDays 30 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_278 med:issuedPrescription res:Rx_201 .
res:Pat_MAL170 med:hasPrescription res:Rx_201 .

res:Inv_212 a med:Invoice ;
    med:forPatient res:Pat_MAL170 ; med:date "2023-11-26"^^xsd:date ;
    med:amount 5358 ; med:paid true ;
    med:status "Settled" .
res:Inv_212 med:coveredBy res:Policy_MAL170 .
res:Pat_MAL170 med:hasInvoice res:Inv_212 .

res:Enc_279 a med:Consultation ;
    med:encounterOf res:Pat_MAL170 ; med:date "2025-04-23"^^xsd:date ;
    med:time "12:30" ;
    med:attendedBy res:Doc_Priya ; med:inDepartment res:Dept_Neurology ;
    med:reason "Review of epilepsy" ;
    med:outcome "Treatment continued" ;
    med:recordedCondition res:Cond_192 ;
    med:hasVitals res:Vit_279 ; med:hasNote res:Note_279 .

res:Vit_279 a med:VitalSigns ;
    med:systolic 112 ; med:diastolic 76 ;
    med:heartRate 103 ; med:temperature 99.1 ;
    med:spo2 96 ;
    med:weightKg 72.4 ;
    med:bmi 22.3 .

res:Note_279 a med:ClinicalNote ;
    med:authorName "Dr. Priya" ;
    med:date "2025-04-23"^^xsd:date ;
    med:noteText "Attends for scheduled follow up. Investigations ordered, will call with results." .

res:Rx_202 a med:Prescription ;
    med:prescribes res:Med_Levetiracetam ; med:prescribedBy res:Doc_Priya ;
    med:forPatient res:Pat_MAL170 ; med:date "2025-04-23"^^xsd:date ;
    med:dosage "2 tablets" ;
    med:frequency "As required" ;
    med:durationDays 60 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_279 med:issuedPrescription res:Rx_202 .
res:Pat_MAL170 med:hasPrescription res:Rx_202 .

res:Inv_213 a med:Invoice ;
    med:forPatient res:Pat_MAL170 ; med:date "2025-04-23"^^xsd:date ;
    med:amount 4430 ; med:paid true ;
    med:status "Settled" .
res:Inv_213 med:coveredBy res:Policy_MAL170 .
res:Pat_MAL170 med:hasInvoice res:Inv_213 .

res:Enc_280 a med:Consultation ;
    med:encounterOf res:Pat_MAL170 ; med:date "2026-08-30"^^xsd:date ;
    med:time "10:15" ;
    med:attendedBy res:Doc_Priya ; med:inDepartment res:Dept_Neurology ;
    med:reason "Review of epilepsy" ;
    med:outcome "Follow up scheduled" ;
    med:recordedCondition res:Cond_192 ;
    med:hasVitals res:Vit_280 ; med:hasNote res:Note_280 .

res:Vit_280 a med:VitalSigns ;
    med:systolic 123 ; med:diastolic 74 ;
    med:heartRate 93 ; med:temperature 98.7 ;
    med:spo2 96 ;
    med:weightKg 60.1 ;
    med:bmi 20.0 .

res:Note_280 a med:ClinicalNote ;
    med:authorName "Dr. Priya" ;
    med:date "2026-08-30"^^xsd:date ;
    med:noteText "Patient reports steady improvement since last visit. Referral raised to the relevant specialty." .

res:Rx_203 a med:Prescription ;
    med:prescribes res:Med_Levetiracetam ; med:prescribedBy res:Doc_Priya ;
    med:forPatient res:Pat_MAL170 ; med:date "2026-08-30"^^xsd:date ;
    med:dosage "1 tablet" ;
    med:frequency "Twice daily" ;
    med:durationDays 30 ;
    med:dispensed false ;
    med:status "Active" .

res:Enc_280 med:issuedPrescription res:Rx_203 .
res:Pat_MAL170 med:hasPrescription res:Rx_203 .

res:Inv_214 a med:Invoice ;
    med:forPatient res:Pat_MAL170 ; med:date "2026-08-30"^^xsd:date ;
    med:amount 6100 ; med:paid false ;
    med:status "Insurance claim pending" .
res:Inv_214 med:coveredBy res:Policy_MAL170 .
res:Pat_MAL170 med:hasInvoice res:Inv_214 .

res:Policy_MAL170 a med:InsurancePolicy ;
    med:policyNumber "NE-490742" ;
    med:issuedBy res:Ins_NewIndia ; med:coveragePercent 70 ;
    med:amount 1000000 .
res:Pat_MAL170 med:hasPolicy res:Policy_MAL170 .

res:Appt_44 a med:Appointment ;
    med:forPatient res:Pat_MAL170 ; med:appointmentWith res:Doc_Priya ;
    med:date "2026-10-14"^^xsd:date ;
    med:time "13:40" ;
    med:inDepartment res:Dept_Neurology ;
    med:status "Scheduled" .
res:Pat_MAL170 med:hasAppointment res:Appt_44 .

res:Pat_NAV171 a med:OutPatient ;
    med:name "Naveen Begum" ; med:mrn "MRN-NAV171" ; med:photoInitials "NB" ;
    med:sex "Male" ; med:dateOfBirth "1954-02-11"^^xsd:date ; med:age 72 ;
    med:bloodGroup "B+" ; med:phone "+91 96976 256706" ; med:email "naveen.begum@example.in" ;
    med:address "15 Rajiv Gandhi Salai, Guindy, Chennai" ;
    med:primaryPhysician res:Doc_Leela ;
    med:allergicTo res:Allergen_Sulfa ;
    med:hasCondition res:Cond_193 , res:Cond_194 , res:Cond_195 , res:Cond_196 .

res:Cond_193 a med:Condition ;
    med:ofDisease res:Depression ; med:onsetDate "2021-09-05"^^xsd:date ;
    med:severity "Moderate" ;
    med:clinicalStatus "Active" ;
    med:diagnosedBy res:Doc_Leela .

res:Cond_194 a med:Condition ;
    med:ofDisease res:AnxietyDisorder ; med:onsetDate "2024-11-02"^^xsd:date ;
    med:severity "Moderate" ;
    med:clinicalStatus "Resolved" ;
    med:resolvedDate "2025-04-07"^^xsd:date ;
    med:diagnosedBy res:Doc_Leela .

res:Cond_195 a med:Condition ;
    med:ofDisease res:UrinaryTractInfection ; med:onsetDate "2025-06-28"^^xsd:date ;
    med:severity "Mild" ;
    med:clinicalStatus "Resolved" ;
    med:resolvedDate "2025-08-15"^^xsd:date ;
    med:diagnosedBy res:Doc_Joseph .

res:Cond_196 a med:Condition ;
    med:ofDisease res:Epilepsy ; med:onsetDate "2024-01-16"^^xsd:date ;
    med:severity "Mild" ;
    med:clinicalStatus "Active" ;
    med:diagnosedBy res:Doc_Priya .

res:Pat_NAV171 med:hasEncounter res:Enc_281 , res:Enc_282 , res:Enc_283 , res:Enc_284 , res:Enc_285 , res:Enc_286 .

res:Enc_281 a med:Consultation ;
    med:encounterOf res:Pat_NAV171 ; med:date "2023-03-15"^^xsd:date ;
    med:time "10:30" ;
    med:attendedBy res:Doc_Joseph ; med:inDepartment res:Dept_GeneralMedicine ;
    med:reason "First presentation" ;
    med:outcome "Discharged with advice" ;
    med:recordedCondition res:Cond_195 ;
    med:hasVitals res:Vit_281 ; med:hasNote res:Note_281 .

res:Vit_281 a med:VitalSigns ;
    med:systolic 131 ; med:diastolic 82 ;
    med:heartRate 72 ; med:temperature 97.4 ;
    med:spo2 96 ;
    med:weightKg 69.9 ;
    med:bmi 25.1 .

res:Note_281 a med:ClinicalNote ;
    med:authorName "Dr. Joseph" ;
    med:date "2023-03-15"^^xsd:date ;
    med:noteText "Presents with a two day history of symptoms. Continue current therapy, review in three months." .

res:Rx_204 a med:Prescription ;
    med:prescribes res:Med_Nitrofurantoin ; med:prescribedBy res:Doc_Joseph ;
    med:forPatient res:Pat_NAV171 ; med:date "2023-03-15"^^xsd:date ;
    med:dosage "1 tablet" ;
    med:frequency "Twice daily" ;
    med:durationDays 14 ;
    med:dispensed true ;
    med:status "Completed" .

res:Rx_205 a med:Prescription ;
    med:prescribes res:Med_Amoxicillin ; med:prescribedBy res:Doc_Joseph ;
    med:forPatient res:Pat_NAV171 ; med:date "2023-03-15"^^xsd:date ;
    med:dosage "2 tablets" ;
    med:frequency "Once daily" ;
    med:durationDays 7 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_281 med:issuedPrescription res:Rx_204 , res:Rx_205 .
res:Pat_NAV171 med:hasPrescription res:Rx_204 , res:Rx_205 .

res:Lab_126 a med:LabOrder ;
    med:analyte "Urine WBC" ; med:forPatient res:Pat_NAV171 ;
    med:date "2023-03-15"^^xsd:date ; med:orderedBy res:Doc_Joseph ;
    med:testsFor res:UrinaryTractInfection ;
    med:orderStatus "Resulted" ;
    med:hasResult res:Res_126 .

res:Res_126 a med:LabResult ;
    med:analyte "Urine WBC" ; med:value 17.17 ; med:unit "/hpf" ;
    med:refLow 0 ; med:refHigh 5 ; med:outOfRange true ;
    med:date "2023-03-16"^^xsd:date ;
    med:performedBy res:Tech_Mohan .

res:Enc_281 med:orderedTest res:Lab_126 .

res:Enc_282 a med:FollowUp ;
    med:encounterOf res:Pat_NAV171 ; med:date "2023-11-22"^^xsd:date ;
    med:time "15:30" ;
    med:attendedBy res:Doc_Priya ; med:inDepartment res:Dept_Neurology ;
    med:reason "Review of epilepsy" ;
    med:outcome "Follow up scheduled" ;
    med:recordedCondition res:Cond_196 ;
    med:hasVitals res:Vit_282 ; med:hasNote res:Note_282 .

res:Vit_282 a med:VitalSigns ;
    med:systolic 134 ; med:diastolic 70 ;
    med:heartRate 86 ; med:temperature 98.5 ;
    med:spo2 97 ;
    med:weightKg 53.5 ;
    med:bmi 24.2 .

res:Note_282 a med:ClinicalNote ;
    med:authorName "Dr. Priya" ;
    med:date "2023-11-22"^^xsd:date ;
    med:noteText "Routine review, no new complaints. Dose adjusted, repeat bloods before next visit." .

res:Rx_206 a med:Prescription ;
    med:prescribes res:Med_Levetiracetam ; med:prescribedBy res:Doc_Priya ;
    med:forPatient res:Pat_NAV171 ; med:date "2023-11-22"^^xsd:date ;
    med:dosage "1 dose" ;
    med:frequency "Once daily" ;
    med:durationDays 90 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_282 med:issuedPrescription res:Rx_206 .
res:Pat_NAV171 med:hasPrescription res:Rx_206 .

res:Enc_283 a med:EmergencyVisit ;
    med:encounterOf res:Pat_NAV171 ; med:date "2024-07-31"^^xsd:date ;
    med:time "13:00" ;
    med:attendedBy res:Doc_Karthik ; med:inDepartment res:Dept_Emergency ;
    med:reason "Acute presentation" ;
    med:outcome "Follow up scheduled" ;
    med:recordedCondition res:Cond_194 ;
    med:hasVitals res:Vit_283 ; med:hasNote res:Note_283 .

res:Vit_283 a med:VitalSigns ;
    med:systolic 118 ; med:diastolic 77 ;
    med:heartRate 69 ; med:temperature 98.6 ;
    med:spo2 100 ;
    med:weightKg 66.1 ;
    med:bmi 19.2 .

res:Note_283 a med:ClinicalNote ;
    med:authorName "Dr. Karthik" ;
    med:date "2024-07-31"^^xsd:date ;
    med:noteText "Post discharge review. Referral raised to the relevant specialty." .

res:Rx_207 a med:Prescription ;
    med:prescribes res:Med_Sertraline ; med:prescribedBy res:Doc_Karthik ;
    med:forPatient res:Pat_NAV171 ; med:date "2024-07-31"^^xsd:date ;
    med:dosage "1 tablet" ;
    med:frequency "Once daily at night" ;
    med:durationDays 5 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_283 med:issuedPrescription res:Rx_207 .
res:Pat_NAV171 med:hasPrescription res:Rx_207 .

res:Inv_215 a med:Invoice ;
    med:forPatient res:Pat_NAV171 ; med:date "2024-07-31"^^xsd:date ;
    med:amount 20149 ; med:paid true ;
    med:status "Settled" .
res:Pat_NAV171 med:hasInvoice res:Inv_215 .

res:Enc_284 a med:FollowUp ;
    med:encounterOf res:Pat_NAV171 ; med:date "2025-04-09"^^xsd:date ;
    med:time "15:15" ;
    med:attendedBy res:Doc_Leela ; med:inDepartment res:Dept_Psychiatry ;
    med:reason "Review of depression" ;
    med:outcome "Treatment continued" ;
    med:recordedCondition res:Cond_193 ;
    med:hasVitals res:Vit_284 ; med:hasNote res:Note_284 .

res:Vit_284 a med:VitalSigns ;
    med:systolic 114 ; med:diastolic 78 ;
    med:heartRate 73 ; med:temperature 100.2 ;
    med:spo2 96 ;
    med:weightKg 53.6 ;
    med:bmi 24.5 .

res:Note_284 a med:ClinicalNote ;
    med:authorName "Dr. Leela" ;
    med:date "2025-04-09"^^xsd:date ;
    med:noteText "Seen for worsening symptoms over the past week. Counselled on medication adherence. Red flag symptoms explained." .

res:Rx_208 a med:Prescription ;
    med:prescribes res:Med_Sertraline ; med:prescribedBy res:Doc_Leela ;
    med:forPatient res:Pat_NAV171 ; med:date "2025-04-09"^^xsd:date ;
    med:dosage "2 tablets" ;
    med:frequency "Once daily at night" ;
    med:durationDays 90 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_284 med:issuedPrescription res:Rx_208 .
res:Pat_NAV171 med:hasPrescription res:Rx_208 .

res:Inv_216 a med:Invoice ;
    med:forPatient res:Pat_NAV171 ; med:date "2025-04-09"^^xsd:date ;
    med:amount 5094 ; med:paid false ;
    med:status "Awaiting payment" .
res:Pat_NAV171 med:hasInvoice res:Inv_216 .

res:Enc_285 a med:FollowUp ;
    med:encounterOf res:Pat_NAV171 ; med:date "2025-12-20"^^xsd:date ;
    med:time "17:30" ;
    med:attendedBy res:Doc_Leela ; med:inDepartment res:Dept_Psychiatry ;
    med:reason "Review of anxiety disorder" ;
    med:outcome "Treatment continued" ;
    med:recordedCondition res:Cond_194 ;
    med:hasVitals res:Vit_285 ; med:hasNote res:Note_285 .

res:Vit_285 a med:VitalSigns ;
    med:systolic 117 ; med:diastolic 72 ;
    med:heartRate 73 ; med:temperature 98.3 ;
    med:spo2 98 ;
    med:weightKg 64.0 ;
    med:bmi 19.0 .

res:Note_285 a med:ClinicalNote ;
    med:authorName "Dr. Leela" ;
    med:date "2025-12-20"^^xsd:date ;
    med:noteText "Attends for scheduled follow up. Reassured. No change to treatment at this stage." .

res:Rx_209 a med:Prescription ;
    med:prescribes res:Med_Sertraline ; med:prescribedBy res:Doc_Leela ;
    med:forPatient res:Pat_NAV171 ; med:date "2025-12-20"^^xsd:date ;
    med:dosage "1 tablet" ;
    med:frequency "As required" ;
    med:durationDays 5 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_285 med:issuedPrescription res:Rx_209 .
res:Pat_NAV171 med:hasPrescription res:Rx_209 .

res:Inv_217 a med:Invoice ;
    med:forPatient res:Pat_NAV171 ; med:date "2025-12-20"^^xsd:date ;
    med:amount 1918 ; med:paid true ;
    med:status "Settled" .
res:Pat_NAV171 med:hasInvoice res:Inv_217 .

res:Enc_286 a med:Consultation ;
    med:encounterOf res:Pat_NAV171 ; med:date "2026-08-30"^^xsd:date ;
    med:time "17:45" ;
    med:attendedBy res:Doc_Leela ; med:inDepartment res:Dept_Psychiatry ;
    med:reason "Review of anxiety disorder" ;
    med:outcome "Referred for tests" ;
    med:recordedCondition res:Cond_194 ;
    med:hasVitals res:Vit_286 ; med:hasNote res:Note_286 .

res:Vit_286 a med:VitalSigns ;
    med:systolic 116 ; med:diastolic 76 ;
    med:heartRate 95 ; med:temperature 97.7 ;
    med:spo2 98 ;
    med:weightKg 54.8 ;
    med:bmi 20.8 .

res:Note_286 a med:ClinicalNote ;
    med:authorName "Dr. Leela" ;
    med:date "2026-08-30"^^xsd:date ;
    med:noteText "Patient reports steady improvement since last visit. Continue current therapy, review in three months." .

res:Inv_218 a med:Invoice ;
    med:forPatient res:Pat_NAV171 ; med:date "2026-08-30"^^xsd:date ;
    med:amount 5421 ; med:paid true ;
    med:status "Settled" .
res:Pat_NAV171 med:hasInvoice res:Inv_218 .

res:Pat_NIR172 a med:OutPatient ;
    med:name "Nirmala Mehta" ; med:mrn "MRN-NIR172" ; med:photoInitials "NM" ;
    med:sex "Female" ; med:dateOfBirth "2008-10-21"^^xsd:date ; med:age 17 ;
    med:bloodGroup "B-" ; med:phone "+91 94766 240042" ; med:email "nirmala.mehta@example.in" ;
    med:address "4 Bharathi Street, Medavakkam, Chennai" ;
    med:primaryPhysician res:Doc_Leela ;
    med:hasCondition res:Cond_197 , res:Cond_198 , res:Cond_199 .

res:Cond_197 a med:Condition ;
    med:ofDisease res:Depression ; med:onsetDate "2023-05-09"^^xsd:date ;
    med:severity "Moderate" ;
    med:clinicalStatus "Active" ;
    med:diagnosedBy res:Doc_Leela .

res:Cond_198 a med:Condition ;
    med:ofDisease res:Migraine ; med:onsetDate "2025-03-06"^^xsd:date ;
    med:severity "Mild" ;
    med:clinicalStatus "Resolved" ;
    med:resolvedDate "2025-06-25"^^xsd:date ;
    med:diagnosedBy res:Doc_Joseph .

res:Cond_199 a med:Condition ;
    med:ofDisease res:Tuberculosis ; med:onsetDate "2025-09-29"^^xsd:date ;
    med:severity "Moderate" ;
    med:clinicalStatus "Active" ;
    med:diagnosedBy res:Doc_Sameer .

res:Pat_NIR172 med:hasEncounter res:Enc_287 , res:Enc_288 .

res:Enc_287 a med:Consultation ;
    med:encounterOf res:Pat_NIR172 ; med:date "2024-08-17"^^xsd:date ;
    med:time "12:45" ;
    med:attendedBy res:Doc_Sameer ; med:inDepartment res:Dept_Pulmonology ;
    med:reason "First presentation" ;
    med:outcome "Discharged with advice" ;
    med:recordedCondition res:Cond_199 ;
    med:hasVitals res:Vit_287 ; med:hasNote res:Note_287 .

res:Vit_287 a med:VitalSigns ;
    med:systolic 125 ; med:diastolic 81 ;
    med:heartRate 83 ; med:temperature 98.8 ;
    med:spo2 99 ;
    med:weightKg 72.8 ;
    med:bmi 23.9 .

res:Note_287 a med:ClinicalNote ;
    med:authorName "Dr. Sameer" ;
    med:date "2024-08-17"^^xsd:date ;
    med:noteText "Presents with a two day history of symptoms. Dose adjusted, repeat bloods before next visit." .

res:Lab_127 a med:LabOrder ;
    med:analyte "ESR" ; med:forPatient res:Pat_NIR172 ;
    med:date "2024-08-17"^^xsd:date ; med:orderedBy res:Doc_Sameer ;
    med:testsFor res:Tuberculosis ;
    med:orderStatus "Resulted" ;
    med:hasResult res:Res_127 .

res:Res_127 a med:LabResult ;
    med:analyte "ESR" ; med:value 67.18 ; med:unit "mm/hr" ;
    med:refLow 0 ; med:refHigh 20 ; med:outOfRange true ;
    med:date "2024-08-18"^^xsd:date ;
    med:performedBy res:Tech_Mohan .

res:Enc_287 med:orderedTest res:Lab_127 .

res:Inv_219 a med:Invoice ;
    med:forPatient res:Pat_NIR172 ; med:date "2024-08-17"^^xsd:date ;
    med:amount 3504 ; med:paid true ;
    med:status "Settled" .
res:Inv_219 med:coveredBy res:Policy_NIR172 .
res:Pat_NIR172 med:hasInvoice res:Inv_219 .

res:Enc_288 a med:Consultation ;
    med:encounterOf res:Pat_NIR172 ; med:date "2026-08-18"^^xsd:date ;
    med:time "12:45" ;
    med:attendedBy res:Doc_Leela ; med:inDepartment res:Dept_Psychiatry ;
    med:reason "Review of depression" ;
    med:outcome "Treatment continued" ;
    med:recordedCondition res:Cond_197 ;
    med:hasVitals res:Vit_288 ; med:hasNote res:Note_288 .

res:Vit_288 a med:VitalSigns ;
    med:systolic 123 ; med:diastolic 73 ;
    med:heartRate 79 ; med:temperature 99.7 ;
    med:spo2 99 ;
    med:weightKg 60.0 ;
    med:bmi 23.5 .

res:Note_288 a med:ClinicalNote ;
    med:authorName "Dr. Leela" ;
    med:date "2026-08-18"^^xsd:date ;
    med:noteText "Post discharge review. Dose adjusted, repeat bloods before next visit." .

res:Rx_210 a med:Prescription ;
    med:prescribes res:Med_Sertraline ; med:prescribedBy res:Doc_Leela ;
    med:forPatient res:Pat_NIR172 ; med:date "2026-08-18"^^xsd:date ;
    med:dosage "2 tablets" ;
    med:frequency "Twice daily" ;
    med:durationDays 90 ;
    med:dispensed true ;
    med:status "Active" .

res:Enc_288 med:issuedPrescription res:Rx_210 .
res:Pat_NIR172 med:hasPrescription res:Rx_210 .

res:Policy_NIR172 a med:InsurancePolicy ;
    med:policyNumber "HD-902599" ;
    med:issuedBy res:Ins_HDFCErgo ; med:coveragePercent 75 ;
    med:amount 300000 .
res:Pat_NIR172 med:hasPolicy res:Policy_NIR172 .

res:Pat_SNE173 a med:InPatient ;
    med:name "Sneha Krishnan" ; med:mrn "MRN-SNE173" ; med:photoInitials "SK" ;
    med:sex "Female" ; med:dateOfBirth "1980-09-19"^^xsd:date ; med:age 45 ;
    med:bloodGroup "AB-" ; med:phone "+91 95418 513170" ; med:email "sneha.krishnan@example.in" ;
    med:address "18 Gandhi Nagar 2nd Cross, Kelambakkam, Chennai" ;
    med:primaryPhysician res:Doc_Priya ;
    med:hasCondition res:Cond_200 , res:Cond_201 .

res:Cond_200 a med:Condition ;
    med:ofDisease res:Epilepsy ; med:onsetDate "2022-08-19"^^xsd:date ;
    med:severity "Moderate" ;
    med:clinicalStatus "Active" ;
    med:diagnosedBy res:Doc_Priya .

res:Cond_201 a med:Condition ;
    med:ofDisease res:Depression ; med:onsetDate "2017-06-11"^^xsd:date ;
    med:severity "Moderate" ;
    med:clinicalStatus "Active" ;
    med:diagnosedBy res:Doc_Leela .

res:Pat_SNE173 med:hasEncounter res:Enc_289 , res:Enc_290 , res:Enc_291 , res:Enc_292 , res:Enc_293 , res:Enc_294 .

res:Enc_289 a med:EmergencyVisit ;
    med:encounterOf res:Pat_SNE173 ; med:date "2023-04-06"^^xsd:date ;
    med:time "18:00" ;
    med:attendedBy res:Doc_Karthik ; med:inDepartment res:Dept_Emergency ;
    med:reason "Acute presentation" ;
    med:outcome "Treatment continued" ;
    med:recordedCondition res:Cond_201 ;
    med:hasVitals res:Vit_289 ; med:hasNote res:Note_289 .

res:Vit_289 a med:VitalSigns ;
    med:systolic 118 ; med:diastolic 74 ;
    med:heartRate 64 ; med:temperature 97.4 ;
    med:spo2 99 ;
    med:weightKg 70.6 ;
    med:bmi 22.1 .

res:Note_289 a med:ClinicalNote ;
    med:authorName "Dr. Karthik" ;
    med:date "2023-04-06"^^xsd:date ;
    med:noteText "Post discharge review. Advised on diet, salt restriction and daily walking." .

res:Rx_211 a med:Prescription ;
    med:prescribes res:Med_Sertraline ; med:prescribedBy res:Doc_Karthik ;
    med:forPatient res:Pat_SNE173 ; med:date "2023-04-06"^^xsd:date ;
    med:dosage "1 tablet" ;
    med:frequency "Once daily" ;
    med:durationDays 90 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_289 med:issuedPrescription res:Rx_211 .
res:Pat_SNE173 med:hasPrescription res:Rx_211 .

res:Inv_220 a med:Invoice ;
    med:forPatient res:Pat_SNE173 ; med:date "2023-04-06"^^xsd:date ;
    med:amount 13548 ; med:paid true ;
    med:status "Settled" .
res:Inv_220 med:coveredBy res:Policy_SNE173 .
res:Pat_SNE173 med:hasInvoice res:Inv_220 .

res:Enc_290 a med:FollowUp ;
    med:encounterOf res:Pat_SNE173 ; med:date "2023-12-17"^^xsd:date ;
    med:time "09:00" ;
    med:attendedBy res:Doc_Leela ; med:inDepartment res:Dept_Psychiatry ;
    med:reason "Review of depression" ;
    med:outcome "Referred for tests" ;
    med:recordedCondition res:Cond_201 ;
    med:hasVitals res:Vit_290 ; med:hasNote res:Note_290 .

res:Vit_290 a med:VitalSigns ;
    med:systolic 134 ; med:diastolic 79 ;
    med:heartRate 83 ; med:temperature 100.1 ;
    med:spo2 96 ;
    med:weightKg 62.9 ;
    med:bmi 19.6 .

res:Note_290 a med:ClinicalNote ;
    med:authorName "Dr. Leela" ;
    med:date "2023-12-17"^^xsd:date ;
    med:noteText "Presents with a two day history of symptoms. Investigations ordered, will call with results." .

res:Rx_212 a med:Prescription ;
    med:prescribes res:Med_Sertraline ; med:prescribedBy res:Doc_Leela ;
    med:forPatient res:Pat_SNE173 ; med:date "2023-12-17"^^xsd:date ;
    med:dosage "1 dose" ;
    med:frequency "Once daily at night" ;
    med:durationDays 90 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_290 med:issuedPrescription res:Rx_212 .
res:Pat_SNE173 med:hasPrescription res:Rx_212 .

res:Inv_221 a med:Invoice ;
    med:forPatient res:Pat_SNE173 ; med:date "2023-12-17"^^xsd:date ;
    med:amount 2301 ; med:paid true ;
    med:status "Settled" .
res:Inv_221 med:coveredBy res:Policy_SNE173 .
res:Pat_SNE173 med:hasInvoice res:Inv_221 .

res:Enc_291 a med:Consultation ;
    med:encounterOf res:Pat_SNE173 ; med:date "2024-08-19"^^xsd:date ;
    med:time "09:30" ;
    med:attendedBy res:Doc_Leela ; med:inDepartment res:Dept_Psychiatry ;
    med:reason "Review of depression" ;
    med:outcome "Treatment continued" ;
    med:recordedCondition res:Cond_201 ;
    med:hasVitals res:Vit_291 ; med:hasNote res:Note_291 .

res:Vit_291 a med:VitalSigns ;
    med:systolic 128 ; med:diastolic 84 ;
    med:heartRate 85 ; med:temperature 98.1 ;
    med:spo2 97 ;
    med:weightKg 53.5 ;
    med:bmi 19.6 .

res:Note_291 a med:ClinicalNote ;
    med:authorName "Dr. Leela" ;
    med:date "2024-08-19"^^xsd:date ;
    med:noteText "Reviewed in clinic today. Investigations ordered, will call with results." .

res:Rx_213 a med:Prescription ;
    med:prescribes res:Med_Sertraline ; med:prescribedBy res:Doc_Leela ;
    med:forPatient res:Pat_SNE173 ; med:date "2024-08-19"^^xsd:date ;
    med:dosage "1 tablet" ;
    med:frequency "Once daily" ;
    med:durationDays 90 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_291 med:issuedPrescription res:Rx_213 .
res:Pat_SNE173 med:hasPrescription res:Rx_213 .

res:Inv_222 a med:Invoice ;
    med:forPatient res:Pat_SNE173 ; med:date "2024-08-19"^^xsd:date ;
    med:amount 5930 ; med:paid true ;
    med:status "Settled" .
res:Inv_222 med:coveredBy res:Policy_SNE173 .
res:Pat_SNE173 med:hasInvoice res:Inv_222 .

res:Enc_292 a med:Consultation ;
    med:encounterOf res:Pat_SNE173 ; med:date "2025-05-03"^^xsd:date ;
    med:time "11:15" ;
    med:attendedBy res:Doc_Leela ; med:inDepartment res:Dept_Psychiatry ;
    med:reason "Review of depression" ;
    med:outcome "Referred for tests" ;
    med:recordedCondition res:Cond_201 ;
    med:hasVitals res:Vit_292 ; med:hasNote res:Note_292 .

res:Vit_292 a med:VitalSigns ;
    med:systolic 124 ; med:diastolic 84 ;
    med:heartRate 95 ; med:temperature 98.9 ;
    med:spo2 98 ;
    med:weightKg 53.5 ;
    med:bmi 27.4 .

res:Note_292 a med:ClinicalNote ;
    med:authorName "Dr. Leela" ;
    med:date "2025-05-03"^^xsd:date ;
    med:noteText "Presents with a two day history of symptoms. Continue current therapy, review in three months." .

res:Inv_223 a med:Invoice ;
    med:forPatient res:Pat_SNE173 ; med:date "2025-05-03"^^xsd:date ;
    med:amount 6015 ; med:paid true ;
    med:status "Settled" .
res:Inv_223 med:coveredBy res:Policy_SNE173 .
res:Pat_SNE173 med:hasInvoice res:Inv_223 .

res:Enc_293 a med:Consultation ;
    med:encounterOf res:Pat_SNE173 ; med:date "2025-12-14"^^xsd:date ;
    med:time "13:45" ;
    med:attendedBy res:Doc_Leela ; med:inDepartment res:Dept_Psychiatry ;
    med:reason "Review of depression" ;
    med:outcome "Discharged with advice" ;
    med:recordedCondition res:Cond_201 ;
    med:hasVitals res:Vit_293 ; med:hasNote res:Note_293 .

res:Vit_293 a med:VitalSigns ;
    med:systolic 116 ; med:diastolic 84 ;
    med:heartRate 65 ; med:temperature 98.8 ;
    med:spo2 99 ;
    med:weightKg 52.5 ;
    med:bmi 22.5 .

res:Note_293 a med:ClinicalNote ;
    med:authorName "Dr. Leela" ;
    med:date "2025-12-14"^^xsd:date ;
    med:noteText "Seen for worsening symptoms over the past week. Referral raised to the relevant specialty." .

res:Rx_214 a med:Prescription ;
    med:prescribes res:Med_Sertraline ; med:prescribedBy res:Doc_Leela ;
    med:forPatient res:Pat_SNE173 ; med:date "2025-12-14"^^xsd:date ;
    med:dosage "1 tablet" ;
    med:frequency "Once daily" ;
    med:durationDays 90 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_293 med:issuedPrescription res:Rx_214 .
res:Pat_SNE173 med:hasPrescription res:Rx_214 .

res:Inv_224 a med:Invoice ;
    med:forPatient res:Pat_SNE173 ; med:date "2025-12-14"^^xsd:date ;
    med:amount 5009 ; med:paid true ;
    med:status "Settled" .
res:Inv_224 med:coveredBy res:Policy_SNE173 .
res:Pat_SNE173 med:hasInvoice res:Inv_224 .

res:Enc_294 a med:FollowUp ;
    med:encounterOf res:Pat_SNE173 ; med:date "2026-08-13"^^xsd:date ;
    med:time "18:15" ;
    med:attendedBy res:Doc_Priya ; med:inDepartment res:Dept_Neurology ;
    med:reason "Review of epilepsy" ;
    med:outcome "Referred for tests" ;
    med:recordedCondition res:Cond_200 ;
    med:hasVitals res:Vit_294 ; med:hasNote res:Note_294 .

res:Vit_294 a med:VitalSigns ;
    med:systolic 124 ; med:diastolic 73 ;
    med:heartRate 89 ; med:temperature 99.8 ;
    med:spo2 98 ;
    med:weightKg 75.7 ;
    med:bmi 22.2 .

res:Note_294 a med:ClinicalNote ;
    med:authorName "Dr. Priya" ;
    med:date "2026-08-13"^^xsd:date ;
    med:noteText "Reviewed in clinic today. Investigations ordered, will call with results." .

res:Inv_225 a med:Invoice ;
    med:forPatient res:Pat_SNE173 ; med:date "2026-08-13"^^xsd:date ;
    med:amount 2093 ; med:paid false ;
    med:status "Insurance claim pending" .
res:Inv_225 med:coveredBy res:Policy_SNE173 .
res:Pat_SNE173 med:hasInvoice res:Inv_225 .

res:Policy_SNE173 a med:InsurancePolicy ;
    med:policyNumber "NE-436997" ;
    med:issuedBy res:Ins_NewIndia ; med:coveragePercent 60 ;
    med:amount 200000 .
res:Pat_SNE173 med:hasPolicy res:Policy_SNE173 .

res:Appt_45 a med:Appointment ;
    med:forPatient res:Pat_SNE173 ; med:appointmentWith res:Doc_Priya ;
    med:date "2026-09-08"^^xsd:date ;
    med:time "16:20" ;
    med:inDepartment res:Dept_Neurology ;
    med:status "Scheduled" .
res:Pat_SNE173 med:hasAppointment res:Appt_45 .

res:Pat_SNE173 med:assignedBed res:Bed_16 .

res:Pat_MUR174 a med:OutPatient ;
    med:name "Murugan Menon" ; med:mrn "MRN-MUR174" ; med:photoInitials "MM" ;
    med:sex "Male" ; med:dateOfBirth "1976-03-25"^^xsd:date ; med:age 50 ;
    med:bloodGroup "O+" ; med:phone "+91 97585 305140" ; med:email "murugan.menon@example.in" ;
    med:address "66 Anna Salai, Medavakkam, Chennai" ;
    med:primaryPhysician res:Doc_Karthik ;
    med:allergicTo res:Allergen_Latex ;
    med:hasCondition res:Cond_202 , res:Cond_203 , res:Cond_204 .

res:Cond_202 a med:Condition ;
    med:ofDisease res:Dengue ; med:onsetDate "2025-08-16"^^xsd:date ;
    med:severity "Moderate" ;
    med:clinicalStatus "Resolved" ;
    med:resolvedDate "2025-10-05"^^xsd:date ;
    med:diagnosedBy res:Doc_Joseph .

res:Cond_203 a med:Condition ;
    med:ofDisease res:Epilepsy ; med:onsetDate "2022-11-29"^^xsd:date ;
    med:severity "Moderate" ;
    med:clinicalStatus "Active" ;
    med:diagnosedBy res:Doc_Priya .

res:Cond_204 a med:Condition ;
    med:ofDisease res:Depression ; med:onsetDate "2023-01-18"^^xsd:date ;
    med:severity "Mild" ;
    med:clinicalStatus "Active" ;
    med:diagnosedBy res:Doc_Leela .

res:Pat_MUR174 med:hasEncounter res:Enc_295 , res:Enc_296 , res:Enc_297 , res:Enc_298 .

res:Enc_295 a med:Consultation ;
    med:encounterOf res:Pat_MUR174 ; med:date "2023-08-16"^^xsd:date ;
    med:time "08:15" ;
    med:attendedBy res:Doc_Priya ; med:inDepartment res:Dept_Neurology ;
    med:reason "First presentation" ;
    med:outcome "Discharged with advice" ;
    med:recordedCondition res:Cond_203 ;
    med:hasVitals res:Vit_295 ; med:hasNote res:Note_295 .

res:Vit_295 a med:VitalSigns ;
    med:systolic 129 ; med:diastolic 83 ;
    med:heartRate 85 ; med:temperature 100.2 ;
    med:spo2 97 ;
    med:weightKg 74.8 ;
    med:bmi 26.5 .

res:Note_295 a med:ClinicalNote ;
    med:authorName "Dr. Priya" ;
    med:date "2023-08-16"^^xsd:date ;
    med:noteText "Attends for scheduled follow up. Reassured. No change to treatment at this stage." .

res:Rx_215 a med:Prescription ;
    med:prescribes res:Med_Levetiracetam ; med:prescribedBy res:Doc_Priya ;
    med:forPatient res:Pat_MUR174 ; med:date "2023-08-16"^^xsd:date ;
    med:dosage "1 dose" ;
    med:frequency "As required" ;
    med:durationDays 60 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_295 med:issuedPrescription res:Rx_215 .
res:Pat_MUR174 med:hasPrescription res:Rx_215 .

res:Inv_226 a med:Invoice ;
    med:forPatient res:Pat_MUR174 ; med:date "2023-08-16"^^xsd:date ;
    med:amount 1706 ; med:paid true ;
    med:status "Settled" .
res:Pat_MUR174 med:hasInvoice res:Inv_226 .

res:Enc_296 a med:Admission ;
    med:encounterOf res:Pat_MUR174 ; med:date "2024-08-21"^^xsd:date ;
    med:time "18:00" ;
    med:attendedBy res:Doc_Priya ; med:inDepartment res:Dept_Neurology ;
    med:reason "Review of epilepsy" ;
    med:outcome "Admitted to ward" ;
    med:lengthOfStay 11 ;
    med:recordedCondition res:Cond_203 ;
    med:hasVitals res:Vit_296 ; med:hasNote res:Note_296 .

res:Vit_296 a med:VitalSigns ;
    med:systolic 128 ; med:diastolic 70 ;
    med:heartRate 87 ; med:temperature 99.4 ;
    med:spo2 99 ;
    med:weightKg 68.5 ;
    med:bmi 27.1 .

res:Note_296 a med:ClinicalNote ;
    med:authorName "Dr. Priya" ;
    med:date "2024-08-21"^^xsd:date ;
    med:noteText "Presents with a two day history of symptoms. Dose adjusted, repeat bloods before next visit." .

res:Rx_216 a med:Prescription ;
    med:prescribes res:Med_Levetiracetam ; med:prescribedBy res:Doc_Priya ;
    med:forPatient res:Pat_MUR174 ; med:date "2024-08-21"^^xsd:date ;
    med:dosage "1 dose" ;
    med:frequency "As required" ;
    med:durationDays 30 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_296 med:issuedPrescription res:Rx_216 .
res:Pat_MUR174 med:hasPrescription res:Rx_216 .

res:Enc_297 a med:Admission ;
    med:encounterOf res:Pat_MUR174 ; med:date "2025-09-08"^^xsd:date ;
    med:time "09:00" ;
    med:attendedBy res:Doc_Karthik ; med:inDepartment res:Dept_GeneralMedicine ;
    med:reason "Review of dengue" ;
    med:outcome "Admitted to ward" ;
    med:lengthOfStay 4 ;
    med:recordedCondition res:Cond_202 ;
    med:hasVitals res:Vit_297 ; med:hasNote res:Note_297 .

res:Vit_297 a med:VitalSigns ;
    med:systolic 109 ; med:diastolic 76 ;
    med:heartRate 81 ; med:temperature 98.3 ;
    med:spo2 98 ;
    med:weightKg 64.8 ;
    med:bmi 21.6 .

res:Note_297 a med:ClinicalNote ;
    med:authorName "Dr. Karthik" ;
    med:date "2025-09-08"^^xsd:date ;
    med:noteText "Referred from general medicine for specialist opinion. Referral raised to the relevant specialty." .

res:Rx_217 a med:Prescription ;
    med:prescribes res:Med_Paracetamol ; med:prescribedBy res:Doc_Karthik ;
    med:forPatient res:Pat_MUR174 ; med:date "2025-09-08"^^xsd:date ;
    med:dosage "2 tablets" ;
    med:frequency "Three times daily" ;
    med:durationDays 14 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_297 med:issuedPrescription res:Rx_217 .
res:Pat_MUR174 med:hasPrescription res:Rx_217 .

res:Lab_128 a med:LabOrder ;
    med:analyte "Platelet count" ; med:forPatient res:Pat_MUR174 ;
    med:date "2025-09-08"^^xsd:date ; med:orderedBy res:Doc_Karthik ;
    med:testsFor res:Dengue ;
    med:orderStatus "Resulted" ;
    med:hasResult res:Res_128 .

res:Res_128 a med:LabResult ;
    med:analyte "Platelet count" ; med:value 40.69 ; med:unit "x10^3/uL" ;
    med:refLow 150 ; med:refHigh 450 ; med:outOfRange true ;
    med:date "2025-09-09"^^xsd:date ;
    med:performedBy res:Tech_Mohan .

res:Enc_297 med:orderedTest res:Lab_128 .

res:Inv_227 a med:Invoice ;
    med:forPatient res:Pat_MUR174 ; med:date "2025-09-08"^^xsd:date ;
    med:amount 239760 ; med:paid true ;
    med:status "Settled" .
res:Pat_MUR174 med:hasInvoice res:Inv_227 .

res:Enc_298 a med:Screening ;
    med:encounterOf res:Pat_MUR174 ; med:date "2026-08-14"^^xsd:date ;
    med:time "10:15" ;
    med:attendedBy res:Doc_Leela ; med:inDepartment res:Dept_Psychiatry ;
    med:reason "Review of depression" ;
    med:outcome "Referred for tests" ;
    med:recordedCondition res:Cond_204 ;
    med:hasVitals res:Vit_298 ; med:hasNote res:Note_298 .

res:Vit_298 a med:VitalSigns ;
    med:systolic 128 ; med:diastolic 74 ;
    med:heartRate 74 ; med:temperature 97.7 ;
    med:spo2 98 ;
    med:weightKg 75.8 ;
    med:bmi 24.9 .

res:Note_298 a med:ClinicalNote ;
    med:authorName "Dr. Leela" ;
    med:date "2026-08-14"^^xsd:date ;
    med:noteText "Presents with a two day history of symptoms. Advised on diet, salt restriction and daily walking." .

res:Rx_218 a med:Prescription ;
    med:prescribes res:Med_Sertraline ; med:prescribedBy res:Doc_Leela ;
    med:forPatient res:Pat_MUR174 ; med:date "2026-08-14"^^xsd:date ;
    med:dosage "1 tablet" ;
    med:frequency "As required" ;
    med:durationDays 30 ;
    med:dispensed false ;
    med:status "Active" .

res:Enc_298 med:issuedPrescription res:Rx_218 .
res:Pat_MUR174 med:hasPrescription res:Rx_218 .

res:Inv_228 a med:Invoice ;
    med:forPatient res:Pat_MUR174 ; med:date "2026-08-14"^^xsd:date ;
    med:amount 843 ; med:paid false ;
    med:status "Awaiting payment" .
res:Pat_MUR174 med:hasInvoice res:Inv_228 .

res:Appt_46 a med:Appointment ;
    med:forPatient res:Pat_MUR174 ; med:appointmentWith res:Doc_Joseph ;
    med:date "2026-09-04"^^xsd:date ;
    med:time "12:20" ;
    med:inDepartment res:Dept_GeneralMedicine ;
    med:status "Scheduled" .
res:Pat_MUR174 med:hasAppointment res:Appt_46 .

res:Pat_PRA175 a med:OutPatient ;
    med:name "Prakash Raghavan" ; med:mrn "MRN-PRA175" ; med:photoInitials "PR" ;
    med:sex "Male" ; med:dateOfBirth "1962-06-04"^^xsd:date ; med:age 64 ;
    med:bloodGroup "AB+" ; med:phone "+91 97531 951774" ; med:email "prakash.raghavan@example.in" ;
    med:address "13 Bharathi Street, Thoraipakkam, Chennai" ;
    med:primaryPhysician res:Doc_Vandana ;
    med:hasCondition res:Cond_205 , res:Cond_206 , res:Cond_207 , res:Cond_208 .

res:Cond_205 a med:Condition ;
    med:ofDisease res:ChronicKidneyDisease ; med:onsetDate "2017-12-12"^^xsd:date ;
    med:severity "Moderate" ;
    med:clinicalStatus "Active" ;
    med:diagnosedBy res:Doc_Vandana .

res:Cond_206 a med:Condition ;
    med:ofDisease res:Hypertension ; med:onsetDate "2020-11-11"^^xsd:date ;
    med:severity "Moderate" ;
    med:clinicalStatus "Active" ;
    med:diagnosedBy res:Doc_Joseph .

res:Cond_207 a med:Condition ;
    med:ofDisease res:Anemia ; med:onsetDate "2025-09-19"^^xsd:date ;
    med:severity "Mild" ;
    med:clinicalStatus "Resolved" ;
    med:resolvedDate "2026-03-02"^^xsd:date ;
    med:diagnosedBy res:Doc_Joseph .

res:Cond_208 a med:Condition ;
    med:ofDisease res:HeartFailure ; med:onsetDate "2019-07-12"^^xsd:date ;
    med:severity "Moderate" ;
    med:clinicalStatus "Active" ;
    med:diagnosedBy res:Doc_Ramesh .

res:Pat_PRA175 med:hasEncounter res:Enc_299 , res:Enc_300 , res:Enc_301 , res:Enc_302 .

res:Enc_299 a med:Consultation ;
    med:encounterOf res:Pat_PRA175 ; med:date "2023-07-31"^^xsd:date ;
    med:time "11:00" ;
    med:attendedBy res:Doc_Vandana ; med:inDepartment res:Dept_Nephrology ;
    med:reason "First presentation" ;
    med:outcome "Referred for tests" ;
    med:recordedCondition res:Cond_205 ;
    med:hasVitals res:Vit_299 ; med:hasNote res:Note_299 .

res:Vit_299 a med:VitalSigns ;
    med:systolic 158 ; med:diastolic 107 ;
    med:heartRate 69 ; med:temperature 97.7 ;
    med:spo2 96 ;
    med:weightKg 72.2 ;
    med:bmi 25.7 .

res:Note_299 a med:ClinicalNote ;
    med:authorName "Dr. Vandana" ;
    med:date "2023-07-31"^^xsd:date ;
    med:noteText "Post discharge review. Continue current therapy, review in three months." .

res:Rx_219 a med:Prescription ;
    med:prescribes res:Med_Telmisartan ; med:prescribedBy res:Doc_Vandana ;
    med:forPatient res:Pat_PRA175 ; med:date "2023-07-31"^^xsd:date ;
    med:dosage "1 tablet" ;
    med:frequency "Three times daily" ;
    med:durationDays 60 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_299 med:issuedPrescription res:Rx_219 .
res:Pat_PRA175 med:hasPrescription res:Rx_219 .

res:Lab_129 a med:LabOrder ;
    med:analyte "Creatinine" ; med:forPatient res:Pat_PRA175 ;
    med:date "2023-07-31"^^xsd:date ; med:orderedBy res:Doc_Vandana ;
    med:testsFor res:ChronicKidneyDisease ;
    med:orderStatus "Resulted" ;
    med:hasResult res:Res_129 .

res:Res_129 a med:LabResult ;
    med:analyte "Creatinine" ; med:value 3.2 ; med:unit "mg/dL" ;
    med:refLow 0.6 ; med:refHigh 1.2 ; med:outOfRange true ;
    med:date "2023-08-01"^^xsd:date ;
    med:performedBy res:Tech_Mohan .

res:Lab_130 a med:LabOrder ;
    med:analyte "eGFR" ; med:forPatient res:Pat_PRA175 ;
    med:date "2023-07-31"^^xsd:date ; med:orderedBy res:Doc_Vandana ;
    med:testsFor res:ChronicKidneyDisease ;
    med:orderStatus "Resulted" ;
    med:hasResult res:Res_130 .

res:Res_130 a med:LabResult ;
    med:analyte "eGFR" ; med:value 25.84 ; med:unit "mL/min" ;
    med:refLow 90 ; med:refHigh 120 ; med:outOfRange true ;
    med:date "2023-08-01"^^xsd:date ;
    med:performedBy res:Tech_Mohan .

res:Enc_299 med:orderedTest res:Lab_129 , res:Lab_130 .

res:Inv_229 a med:Invoice ;
    med:forPatient res:Pat_PRA175 ; med:date "2023-07-31"^^xsd:date ;
    med:amount 3434 ; med:paid true ;
    med:status "Settled" .
res:Inv_229 med:coveredBy res:Policy_PRA175 .
res:Pat_PRA175 med:hasInvoice res:Inv_229 .

res:Enc_300 a med:Consultation ;
    med:encounterOf res:Pat_PRA175 ; med:date "2024-08-12"^^xsd:date ;
    med:time "12:00" ;
    med:attendedBy res:Doc_Vandana ; med:inDepartment res:Dept_Nephrology ;
    med:reason "Review of chronic kidney disease" ;
    med:outcome "Referred for tests" ;
    med:recordedCondition res:Cond_205 ;
    med:hasVitals res:Vit_300 ; med:hasNote res:Note_300 .

res:Vit_300 a med:VitalSigns ;
    med:systolic 157 ; med:diastolic 98 ;
    med:heartRate 93 ; med:temperature 99.4 ;
    med:spo2 99 ;
    med:weightKg 60.6 ;
    med:bmi 22.4 .

res:Note_300 a med:ClinicalNote ;
    med:authorName "Dr. Vandana" ;
    med:date "2024-08-12"^^xsd:date ;
    med:noteText "Routine review, no new complaints. Dose adjusted, repeat bloods before next visit." .

res:Rx_220 a med:Prescription ;
    med:prescribes res:Med_Telmisartan ; med:prescribedBy res:Doc_Vandana ;
    med:forPatient res:Pat_PRA175 ; med:date "2024-08-12"^^xsd:date ;
    med:dosage "1 tablet" ;
    med:frequency "As required" ;
    med:durationDays 60 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_300 med:issuedPrescription res:Rx_220 .
res:Pat_PRA175 med:hasPrescription res:Rx_220 .

res:Lab_131 a med:LabOrder ;
    med:analyte "Creatinine" ; med:forPatient res:Pat_PRA175 ;
    med:date "2024-08-12"^^xsd:date ; med:orderedBy res:Doc_Vandana ;
    med:testsFor res:ChronicKidneyDisease ;
    med:orderStatus "Resulted" ;
    med:hasResult res:Res_131 .

res:Res_131 a med:LabResult ;
    med:analyte "Creatinine" ; med:value 5.77 ; med:unit "mg/dL" ;
    med:refLow 0.6 ; med:refHigh 1.2 ; med:outOfRange true ;
    med:date "2024-08-13"^^xsd:date ;
    med:performedBy res:Tech_Mohan .

res:Lab_132 a med:LabOrder ;
    med:analyte "eGFR" ; med:forPatient res:Pat_PRA175 ;
    med:date "2024-08-12"^^xsd:date ; med:orderedBy res:Doc_Vandana ;
    med:testsFor res:ChronicKidneyDisease ;
    med:orderStatus "Resulted" ;
    med:hasResult res:Res_132 .

res:Res_132 a med:LabResult ;
    med:analyte "eGFR" ; med:value 52.28 ; med:unit "mL/min" ;
    med:refLow 90 ; med:refHigh 120 ; med:outOfRange true ;
    med:date "2024-08-13"^^xsd:date ;
    med:performedBy res:Tech_Mohan .

res:Enc_300 med:orderedTest res:Lab_131 , res:Lab_132 .

res:Inv_230 a med:Invoice ;
    med:forPatient res:Pat_PRA175 ; med:date "2024-08-12"^^xsd:date ;
    med:amount 1962 ; med:paid true ;
    med:status "Settled" .
res:Inv_230 med:coveredBy res:Policy_PRA175 .
res:Pat_PRA175 med:hasInvoice res:Inv_230 .

res:Enc_301 a med:FollowUp ;
    med:encounterOf res:Pat_PRA175 ; med:date "2025-08-17"^^xsd:date ;
    med:time "13:15" ;
    med:attendedBy res:Doc_Suresh ; med:inDepartment res:Dept_GeneralMedicine ;
    med:reason "Review of hypertension" ;
    med:outcome "Treatment continued" ;
    med:recordedCondition res:Cond_206 ;
    med:hasVitals res:Vit_301 ; med:hasNote res:Note_301 .

res:Vit_301 a med:VitalSigns ;
    med:systolic 176 ; med:diastolic 97 ;
    med:heartRate 63 ; med:temperature 99.0 ;
    med:spo2 96 ;
    med:weightKg 54.7 ;
    med:bmi 26.3 .

res:Note_301 a med:ClinicalNote ;
    med:authorName "Dr. Suresh" ;
    med:date "2025-08-17"^^xsd:date ;
    med:noteText "Presents with a two day history of symptoms. Investigations ordered, will call with results." .

res:Rx_221 a med:Prescription ;
    med:prescribes res:Med_Amlodipine ; med:prescribedBy res:Doc_Suresh ;
    med:forPatient res:Pat_PRA175 ; med:date "2025-08-17"^^xsd:date ;
    med:dosage "1 tablet" ;
    med:frequency "Three times daily" ;
    med:durationDays 30 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_301 med:issuedPrescription res:Rx_221 .
res:Pat_PRA175 med:hasPrescription res:Rx_221 .

res:Inv_231 a med:Invoice ;
    med:forPatient res:Pat_PRA175 ; med:date "2025-08-17"^^xsd:date ;
    med:amount 5267 ; med:paid true ;
    med:status "Settled" .
res:Inv_231 med:coveredBy res:Policy_PRA175 .
res:Pat_PRA175 med:hasInvoice res:Inv_231 .

res:Enc_302 a med:EmergencyVisit ;
    med:encounterOf res:Pat_PRA175 ; med:date "2026-08-25"^^xsd:date ;
    med:time "15:30" ;
    med:attendedBy res:Doc_Karthik ; med:inDepartment res:Dept_Emergency ;
    med:reason "Acute presentation" ;
    med:outcome "Follow up scheduled" ;
    med:recordedCondition res:Cond_208 ;
    med:hasVitals res:Vit_302 ; med:hasNote res:Note_302 .

res:Vit_302 a med:VitalSigns ;
    med:systolic 142 ; med:diastolic 108 ;
    med:heartRate 77 ; med:temperature 100.2 ;
    med:spo2 97 ;
    med:weightKg 50.7 ;
    med:bmi 20.2 .

res:Note_302 a med:ClinicalNote ;
    med:authorName "Dr. Karthik" ;
    med:date "2026-08-25"^^xsd:date ;
    med:noteText "Referred from general medicine for specialist opinion. Continue current therapy, review in three months." .

res:Rx_222 a med:Prescription ;
    med:prescribes res:Med_Furosemide ; med:prescribedBy res:Doc_Karthik ;
    med:forPatient res:Pat_PRA175 ; med:date "2026-08-25"^^xsd:date ;
    med:dosage "2 tablets" ;
    med:frequency "Three times daily" ;
    med:durationDays 60 ;
    med:dispensed true ;
    med:status "Active" .

res:Enc_302 med:issuedPrescription res:Rx_222 .
res:Pat_PRA175 med:hasPrescription res:Rx_222 .

res:Lab_133 a med:LabOrder ;
    med:analyte "NT-proBNP" ; med:forPatient res:Pat_PRA175 ;
    med:date "2026-08-25"^^xsd:date ; med:orderedBy res:Doc_Karthik ;
    med:testsFor res:HeartFailure ;
    med:orderStatus "Pending" .

res:Enc_302 med:orderedTest res:Lab_133 .

res:Inv_232 a med:Invoice ;
    med:forPatient res:Pat_PRA175 ; med:date "2026-08-25"^^xsd:date ;
    med:amount 16040 ; med:paid false ;
    med:status "Insurance claim pending" .
res:Inv_232 med:coveredBy res:Policy_PRA175 .
res:Pat_PRA175 med:hasInvoice res:Inv_232 .

res:Policy_PRA175 a med:InsurancePolicy ;
    med:policyNumber "CG-108119" ;
    med:issuedBy res:Ins_CGHS ; med:coveragePercent 70 ;
    med:amount 750000 .
res:Pat_PRA175 med:hasPolicy res:Policy_PRA175 .

res:Pat_TAR176 a med:OutPatient ;
    med:name "Tarun Begum" ; med:mrn "MRN-TAR176" ; med:photoInitials "TB" ;
    med:sex "Male" ; med:dateOfBirth "2020-01-11"^^xsd:date ; med:age 6 ;
    med:bloodGroup "B+" ; med:phone "+91 99177 541086" ; med:email "tarun.begum@example.in" ;
    med:address "55 GST Road, Navalur, Chennai" ;
    med:primaryPhysician res:Doc_Sameer ;
    med:hasCondition res:Cond_209 .

res:Cond_209 a med:Condition ;
    med:ofDisease res:Asthma ; med:onsetDate "2022-07-17"^^xsd:date ;
    med:severity "Mild" ;
    med:clinicalStatus "Active" ;
    med:diagnosedBy res:Doc_Sameer .

res:Pat_TAR176 med:hasEncounter res:Enc_303 , res:Enc_304 .

res:Enc_303 a med:EmergencyVisit ;
    med:encounterOf res:Pat_TAR176 ; med:date "2024-08-02"^^xsd:date ;
    med:time "16:45" ;
    med:attendedBy res:Doc_Karthik ; med:inDepartment res:Dept_Emergency ;
    med:reason "Acute presentation" ;
    med:outcome "Treatment continued" ;
    med:recordedCondition res:Cond_209 ;
    med:hasVitals res:Vit_303 ; med:hasNote res:Note_303 .

res:Vit_303 a med:VitalSigns ;
    med:systolic 116 ; med:diastolic 68 ;
    med:heartRate 68 ; med:temperature 99.7 ;
    med:spo2 96 ;
    med:weightKg 67.5 ;
    med:bmi 20.1 .

res:Note_303 a med:ClinicalNote ;
    med:authorName "Dr. Karthik" ;
    med:date "2024-08-02"^^xsd:date ;
    med:noteText "Patient reports steady improvement since last visit. Counselled on medication adherence. Red flag symptoms explained." .

res:Rx_223 a med:Prescription ;
    med:prescribes res:Med_Salbutamol ; med:prescribedBy res:Doc_Karthik ;
    med:forPatient res:Pat_TAR176 ; med:date "2024-08-02"^^xsd:date ;
    med:dosage "1 tablet" ;
    med:frequency "Once daily at night" ;
    med:durationDays 90 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_303 med:issuedPrescription res:Rx_223 .
res:Pat_TAR176 med:hasPrescription res:Rx_223 .

res:Inv_233 a med:Invoice ;
    med:forPatient res:Pat_TAR176 ; med:date "2024-08-02"^^xsd:date ;
    med:amount 4636 ; med:paid true ;
    med:status "Settled" .
res:Inv_233 med:coveredBy res:Policy_TAR176 .
res:Pat_TAR176 med:hasInvoice res:Inv_233 .

res:Enc_304 a med:FollowUp ;
    med:encounterOf res:Pat_TAR176 ; med:date "2026-08-30"^^xsd:date ;
    med:time "16:45" ;
    med:attendedBy res:Doc_Sameer ; med:inDepartment res:Dept_Pulmonology ;
    med:reason "Review of asthma" ;
    med:outcome "Discharged with advice" ;
    med:recordedCondition res:Cond_209 ;
    med:hasVitals res:Vit_304 ; med:hasNote res:Note_304 .

res:Vit_304 a med:VitalSigns ;
    med:systolic 123 ; med:diastolic 82 ;
    med:heartRate 79 ; med:temperature 100.4 ;
    med:spo2 95 ;
    med:weightKg 75.1 ;
    med:bmi 24.4 .

res:Note_304 a med:ClinicalNote ;
    med:authorName "Dr. Sameer" ;
    med:date "2026-08-30"^^xsd:date ;
    med:noteText "Patient reports steady improvement since last visit. Reassured. No change to treatment at this stage." .

res:Rx_224 a med:Prescription ;
    med:prescribes res:Med_Salbutamol ; med:prescribedBy res:Doc_Sameer ;
    med:forPatient res:Pat_TAR176 ; med:date "2026-08-30"^^xsd:date ;
    med:dosage "1 tablet" ;
    med:frequency "Once daily" ;
    med:durationDays 90 ;
    med:dispensed true ;
    med:status "Active" .

res:Enc_304 med:issuedPrescription res:Rx_224 .
res:Pat_TAR176 med:hasPrescription res:Rx_224 .

res:Inv_234 a med:Invoice ;
    med:forPatient res:Pat_TAR176 ; med:date "2026-08-30"^^xsd:date ;
    med:amount 2158 ; med:paid true ;
    med:status "Settled" .
res:Inv_234 med:coveredBy res:Policy_TAR176 .
res:Pat_TAR176 med:hasInvoice res:Inv_234 .

res:Policy_TAR176 a med:InsurancePolicy ;
    med:policyNumber "ST-169731" ;
    med:issuedBy res:Ins_StarHealth ; med:coveragePercent 80 ;
    med:amount 1000000 .
res:Pat_TAR176 med:hasPolicy res:Policy_TAR176 .

res:Pat_NIR177 a med:OutPatient ;
    med:name "Nirmala Chandran" ; med:mrn "MRN-NIR177" ; med:photoInitials "NC" ;
    med:sex "Female" ; med:dateOfBirth "1989-09-11"^^xsd:date ; med:age 36 ;
    med:bloodGroup "A+" ; med:phone "+91 94996 784383" ; med:email "nirmala.chandran@example.in" ;
    med:address "79 ECR, Medavakkam, Chennai" ;
    med:primaryPhysician res:Doc_Nithya ;
    med:allergicTo res:Allergen_Sulfa ;
    med:hasCondition res:Cond_210 , res:Cond_211 , res:Cond_212 , res:Cond_213 .

res:Cond_210 a med:Condition ;
    med:ofDisease res:TypeIIDiabetes ; med:onsetDate "2025-12-02"^^xsd:date ;
    med:severity "Moderate" ;
    med:clinicalStatus "Active" ;
    med:diagnosedBy res:Doc_Nithya .

res:Cond_211 a med:Condition ;
    med:ofDisease res:Dyslipidemia ; med:onsetDate "2024-04-01"^^xsd:date ;
    med:severity "Moderate" ;
    med:clinicalStatus "Active" ;
    med:diagnosedBy res:Doc_Suresh .

res:Cond_212 a med:Condition ;
    med:ofDisease res:Anemia ; med:onsetDate "2025-05-23"^^xsd:date ;
    med:severity "Moderate" ;
    med:clinicalStatus "Active" ;
    med:diagnosedBy res:Doc_Suresh .

res:Cond_213 a med:Condition ;
    med:ofDisease res:UrinaryTractInfection ; med:onsetDate "2025-04-12"^^xsd:date ;
    med:severity "Mild" ;
    med:clinicalStatus "Active" ;
    med:diagnosedBy res:Doc_Joseph .

res:Pat_NIR177 med:hasEncounter res:Enc_305 , res:Enc_306 , res:Enc_307 , res:Enc_308 , res:Enc_309 , res:Enc_310 .

res:Enc_305 a med:EmergencyVisit ;
    med:encounterOf res:Pat_NIR177 ; med:date "2023-03-22"^^xsd:date ;
    med:time "09:30" ;
    med:attendedBy res:Doc_Karthik ; med:inDepartment res:Dept_Emergency ;
    med:reason "Acute presentation" ;
    med:outcome "Discharged with advice" ;
    med:recordedCondition res:Cond_212 ;
    med:hasVitals res:Vit_305 ; med:hasNote res:Note_305 .

res:Vit_305 a med:VitalSigns ;
    med:systolic 123 ; med:diastolic 72 ;
    med:heartRate 100 ; med:temperature 99.3 ;
    med:spo2 100 ;
    med:weightKg 49.2 ;
    med:bmi 26.1 .

res:Note_305 a med:ClinicalNote ;
    med:authorName "Dr. Karthik" ;
    med:date "2023-03-22"^^xsd:date ;
    med:noteText "Presents with a two day history of symptoms. Referral raised to the relevant specialty." .

res:Rx_225 a med:Prescription ;
    med:prescribes res:Med_IronFolate ; med:prescribedBy res:Doc_Karthik ;
    med:forPatient res:Pat_NIR177 ; med:date "2023-03-22"^^xsd:date ;
    med:dosage "2 tablets" ;
    med:frequency "Twice daily" ;
    med:durationDays 10 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_305 med:issuedPrescription res:Rx_225 .
res:Pat_NIR177 med:hasPrescription res:Rx_225 .

res:Enc_306 a med:FollowUp ;
    med:encounterOf res:Pat_NIR177 ; med:date "2023-11-24"^^xsd:date ;
    med:time "15:15" ;
    med:attendedBy res:Doc_Suresh ; med:inDepartment res:Dept_GeneralMedicine ;
    med:reason "Review of dyslipidemia" ;
    med:outcome "Follow up scheduled" ;
    med:recordedCondition res:Cond_211 ;
    med:hasVitals res:Vit_306 ; med:hasNote res:Note_306 .

res:Vit_306 a med:VitalSigns ;
    med:systolic 120 ; med:diastolic 75 ;
    med:heartRate 69 ; med:temperature 100.0 ;
    med:spo2 99 ;
    med:weightKg 73.2 ;
    med:bmi 19.4 .

res:Note_306 a med:ClinicalNote ;
    med:authorName "Dr. Suresh" ;
    med:date "2023-11-24"^^xsd:date ;
    med:noteText "Seen for worsening symptoms over the past week. Advised on diet, salt restriction and daily walking." .

res:Rx_226 a med:Prescription ;
    med:prescribes res:Med_Atorvastatin ; med:prescribedBy res:Doc_Suresh ;
    med:forPatient res:Pat_NIR177 ; med:date "2023-11-24"^^xsd:date ;
    med:dosage "2 tablets" ;
    med:frequency "Twice daily" ;
    med:durationDays 30 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_306 med:issuedPrescription res:Rx_226 .
res:Pat_NIR177 med:hasPrescription res:Rx_226 .

res:Lab_134 a med:LabOrder ;
    med:analyte "LDL cholesterol" ; med:forPatient res:Pat_NIR177 ;
    med:date "2023-11-24"^^xsd:date ; med:orderedBy res:Doc_Suresh ;
    med:testsFor res:Dyslipidemia ;
    med:orderStatus "Resulted" ;
    med:hasResult res:Res_134 .

res:Res_134 a med:LabResult ;
    med:analyte "LDL cholesterol" ; med:value 186.33 ; med:unit "mg/dL" ;
    med:refLow 0 ; med:refHigh 100 ; med:outOfRange true ;
    med:date "2023-11-25"^^xsd:date ;
    med:performedBy res:Tech_Mohan .

res:Lab_135 a med:LabOrder ;
    med:analyte "Triglycerides" ; med:forPatient res:Pat_NIR177 ;
    med:date "2023-11-24"^^xsd:date ; med:orderedBy res:Doc_Suresh ;
    med:testsFor res:Dyslipidemia ;
    med:orderStatus "Resulted" ;
    med:hasResult res:Res_135 .

res:Res_135 a med:LabResult ;
    med:analyte "Triglycerides" ; med:value 383.47 ; med:unit "mg/dL" ;
    med:refLow 0 ; med:refHigh 150 ; med:outOfRange true ;
    med:date "2023-11-25"^^xsd:date ;
    med:performedBy res:Tech_Mohan .

res:Enc_306 med:orderedTest res:Lab_134 , res:Lab_135 .

res:Inv_235 a med:Invoice ;
    med:forPatient res:Pat_NIR177 ; med:date "2023-11-24"^^xsd:date ;
    med:amount 2773 ; med:paid true ;
    med:status "Settled" .
res:Inv_235 med:coveredBy res:Policy_NIR177 .
res:Pat_NIR177 med:hasInvoice res:Inv_235 .

res:Enc_307 a med:Consultation ;
    med:encounterOf res:Pat_NIR177 ; med:date "2024-07-27"^^xsd:date ;
    med:time "16:30" ;
    med:attendedBy res:Doc_Suresh ; med:inDepartment res:Dept_GeneralMedicine ;
    med:reason "Review of urinary tract infection" ;
    med:outcome "Follow up scheduled" ;
    med:recordedCondition res:Cond_213 ;
    med:hasVitals res:Vit_307 ; med:hasNote res:Note_307 .

res:Vit_307 a med:VitalSigns ;
    med:systolic 119 ; med:diastolic 76 ;
    med:heartRate 65 ; med:temperature 97.9 ;
    med:spo2 98 ;
    med:weightKg 48.6 ;
    med:bmi 27.7 .

res:Note_307 a med:ClinicalNote ;
    med:authorName "Dr. Suresh" ;
    med:date "2024-07-27"^^xsd:date ;
    med:noteText "Attends for scheduled follow up. Referral raised to the relevant specialty." .

res:Rx_227 a med:Prescription ;
    med:prescribes res:Med_Nitrofurantoin ; med:prescribedBy res:Doc_Suresh ;
    med:forPatient res:Pat_NIR177 ; med:date "2024-07-27"^^xsd:date ;
    med:dosage "1 tablet" ;
    med:frequency "As required" ;
    med:durationDays 7 ;
    med:dispensed true ;
    med:status "Completed" .

res:Rx_228 a med:Prescription ;
    med:prescribes res:Med_Amoxicillin ; med:prescribedBy res:Doc_Suresh ;
    med:forPatient res:Pat_NIR177 ; med:date "2024-07-27"^^xsd:date ;
    med:dosage "1 tablet" ;
    med:frequency "Twice daily" ;
    med:durationDays 7 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_307 med:issuedPrescription res:Rx_227 , res:Rx_228 .
res:Pat_NIR177 med:hasPrescription res:Rx_227 , res:Rx_228 .

res:Inv_236 a med:Invoice ;
    med:forPatient res:Pat_NIR177 ; med:date "2024-07-27"^^xsd:date ;
    med:amount 3966 ; med:paid true ;
    med:status "Settled" .
res:Inv_236 med:coveredBy res:Policy_NIR177 .
res:Pat_NIR177 med:hasInvoice res:Inv_236 .

res:Enc_308 a med:Consultation ;
    med:encounterOf res:Pat_NIR177 ; med:date "2025-04-01"^^xsd:date ;
    med:time "09:15" ;
    med:attendedBy res:Doc_Joseph ; med:inDepartment res:Dept_GeneralMedicine ;
    med:reason "Review of urinary tract infection" ;
    med:outcome "Treatment continued" ;
    med:recordedCondition res:Cond_213 ;
    med:hasVitals res:Vit_308 ; med:hasNote res:Note_308 .

res:Vit_308 a med:VitalSigns ;
    med:systolic 114 ; med:diastolic 73 ;
    med:heartRate 99 ; med:temperature 100.3 ;
    med:spo2 99 ;
    med:weightKg 60.8 ;
    med:bmi 25.6 .

res:Note_308 a med:ClinicalNote ;
    med:authorName "Dr. Joseph" ;
    med:date "2025-04-01"^^xsd:date ;
    med:noteText "Patient reports steady improvement since last visit. Advised on diet, salt restriction and daily walking." .

res:Lab_136 a med:LabOrder ;
    med:analyte "Urine WBC" ; med:forPatient res:Pat_NIR177 ;
    med:date "2025-04-01"^^xsd:date ; med:orderedBy res:Doc_Joseph ;
    med:testsFor res:UrinaryTractInfection ;
    med:orderStatus "Resulted" ;
    med:hasResult res:Res_136 .

res:Res_136 a med:LabResult ;
    med:analyte "Urine WBC" ; med:value 27.29 ; med:unit "/hpf" ;
    med:refLow 0 ; med:refHigh 5 ; med:outOfRange true ;
    med:date "2025-04-02"^^xsd:date ;
    med:performedBy res:Tech_Mohan .

res:Enc_308 med:orderedTest res:Lab_136 .

res:Inv_237 a med:Invoice ;
    med:forPatient res:Pat_NIR177 ; med:date "2025-04-01"^^xsd:date ;
    med:amount 3105 ; med:paid true ;
    med:status "Settled" .
res:Inv_237 med:coveredBy res:Policy_NIR177 .
res:Pat_NIR177 med:hasInvoice res:Inv_237 .

res:Enc_309 a med:FollowUp ;
    med:encounterOf res:Pat_NIR177 ; med:date "2025-12-10"^^xsd:date ;
    med:time "08:00" ;
    med:attendedBy res:Doc_Joseph ; med:inDepartment res:Dept_GeneralMedicine ;
    med:reason "Review of urinary tract infection" ;
    med:outcome "Follow up scheduled" ;
    med:recordedCondition res:Cond_213 ;
    med:hasVitals res:Vit_309 ; med:hasNote res:Note_309 .

res:Vit_309 a med:VitalSigns ;
    med:systolic 118 ; med:diastolic 74 ;
    med:heartRate 81 ; med:temperature 100.2 ;
    med:spo2 96 ;
    med:weightKg 48.7 ;
    med:bmi 25.2 .

res:Note_309 a med:ClinicalNote ;
    med:authorName "Dr. Joseph" ;
    med:date "2025-12-10"^^xsd:date ;
    med:noteText "Attends for scheduled follow up. Advised on diet, salt restriction and daily walking." .

res:Lab_137 a med:LabOrder ;
    med:analyte "Urine WBC" ; med:forPatient res:Pat_NIR177 ;
    med:date "2025-12-10"^^xsd:date ; med:orderedBy res:Doc_Joseph ;
    med:testsFor res:UrinaryTractInfection ;
    med:orderStatus "Resulted" ;
    med:hasResult res:Res_137 .

res:Res_137 a med:LabResult ;
    med:analyte "Urine WBC" ; med:value 54.99 ; med:unit "/hpf" ;
    med:refLow 0 ; med:refHigh 5 ; med:outOfRange true ;
    med:date "2025-12-11"^^xsd:date ;
    med:performedBy res:Tech_Mohan .

res:Enc_309 med:orderedTest res:Lab_137 .

res:Enc_310 a med:EmergencyVisit ;
    med:encounterOf res:Pat_NIR177 ; med:date "2026-08-30"^^xsd:date ;
    med:time "08:00" ;
    med:attendedBy res:Doc_Karthik ; med:inDepartment res:Dept_Emergency ;
    med:reason "Acute presentation" ;
    med:outcome "Discharged with advice" ;
    med:recordedCondition res:Cond_211 ;
    med:hasVitals res:Vit_310 ; med:hasNote res:Note_310 .

res:Vit_310 a med:VitalSigns ;
    med:systolic 131 ; med:diastolic 77 ;
    med:heartRate 91 ; med:temperature 97.3 ;
    med:spo2 97 ;
    med:weightKg 75.4 ;
    med:bmi 26.0 .

res:Note_310 a med:ClinicalNote ;
    med:authorName "Dr. Karthik" ;
    med:date "2026-08-30"^^xsd:date ;
    med:noteText "Post discharge review. Counselled on medication adherence. Red flag symptoms explained." .

res:Rx_229 a med:Prescription ;
    med:prescribes res:Med_Atorvastatin ; med:prescribedBy res:Doc_Karthik ;
    med:forPatient res:Pat_NIR177 ; med:date "2026-08-30"^^xsd:date ;
    med:dosage "1 dose" ;
    med:frequency "Once daily at night" ;
    med:durationDays 90 ;
    med:dispensed true ;
    med:status "Active" .

res:Enc_310 med:issuedPrescription res:Rx_229 .
res:Pat_NIR177 med:hasPrescription res:Rx_229 .

res:Lab_138 a med:LabOrder ;
    med:analyte "LDL cholesterol" ; med:forPatient res:Pat_NIR177 ;
    med:date "2026-08-30"^^xsd:date ; med:orderedBy res:Doc_Karthik ;
    med:testsFor res:Dyslipidemia ;
    med:orderStatus "Pending" .

res:Lab_139 a med:LabOrder ;
    med:analyte "Triglycerides" ; med:forPatient res:Pat_NIR177 ;
    med:date "2026-08-30"^^xsd:date ; med:orderedBy res:Doc_Karthik ;
    med:testsFor res:Dyslipidemia ;
    med:orderStatus "Pending" .

res:Enc_310 med:orderedTest res:Lab_138 , res:Lab_139 .

res:Inv_238 a med:Invoice ;
    med:forPatient res:Pat_NIR177 ; med:date "2026-08-30"^^xsd:date ;
    med:amount 15819 ; med:paid false ;
    med:status "Insurance claim pending" .
res:Inv_238 med:coveredBy res:Policy_NIR177 .
res:Pat_NIR177 med:hasInvoice res:Inv_238 .

res:Policy_NIR177 a med:InsurancePolicy ;
    med:policyNumber "ST-994554" ;
    med:issuedBy res:Ins_StarHealth ; med:coveragePercent 85 ;
    med:amount 1000000 .
res:Pat_NIR177 med:hasPolicy res:Policy_NIR177 .

res:Appt_47 a med:Appointment ;
    med:forPatient res:Pat_NIR177 ; med:appointmentWith res:Doc_Nithya ;
    med:date "2026-09-16"^^xsd:date ;
    med:time "10:20" ;
    med:inDepartment res:Dept_Endocrinology ;
    med:status "Scheduled" .
res:Pat_NIR177 med:hasAppointment res:Appt_47 .

res:Pat_AIS178 a med:OutPatient ;
    med:name "Aisha Sundaram" ; med:mrn "MRN-AIS178" ; med:photoInitials "AS" ;
    med:sex "Female" ; med:dateOfBirth "1990-07-09"^^xsd:date ; med:age 36 ;
    med:bloodGroup "AB-" ; med:phone "+91 93477 622899" ; med:email "aisha.sundaram@example.in" ;
    med:address "63 Bharathi Street, Perungudi, Chennai" ;
    med:primaryPhysician res:Doc_Karthik ;
    med:allergicTo res:Allergen_Penicillin ;
    med:hasCondition res:Cond_214 .

res:Cond_214 a med:Condition ;
    med:ofDisease res:Dengue ; med:onsetDate "2026-07-24"^^xsd:date ;
    med:severity "Mild" ;
    med:clinicalStatus "Resolved" ;
    med:resolvedDate "2026-08-30"^^xsd:date ;
    med:diagnosedBy res:Doc_Joseph .

res:Pat_AIS178 med:hasEncounter res:Enc_311 , res:Enc_312 , res:Enc_313 .

res:Enc_311 a med:Consultation ;
    med:encounterOf res:Pat_AIS178 ; med:date "2023-11-25"^^xsd:date ;
    med:time "08:45" ;
    med:attendedBy res:Doc_Karthik ; med:inDepartment res:Dept_GeneralMedicine ;
    med:reason "First presentation" ;
    med:outcome "Treatment continued" ;
    med:recordedCondition res:Cond_214 ;
    med:hasVitals res:Vit_311 ; med:hasNote res:Note_311 .

res:Vit_311 a med:VitalSigns ;
    med:systolic 130 ; med:diastolic 73 ;
    med:heartRate 76 ; med:temperature 99.8 ;
    med:spo2 98 ;
    med:weightKg 51.2 ;
    med:bmi 26.9 .

res:Note_311 a med:ClinicalNote ;
    med:authorName "Dr. Karthik" ;
    med:date "2023-11-25"^^xsd:date ;
    med:noteText "Reviewed in clinic today. Referral raised to the relevant specialty." .

res:Rx_230 a med:Prescription ;
    med:prescribes res:Med_Paracetamol ; med:prescribedBy res:Doc_Karthik ;
    med:forPatient res:Pat_AIS178 ; med:date "2023-11-25"^^xsd:date ;
    med:dosage "1 tablet" ;
    med:frequency "Twice daily" ;
    med:durationDays 7 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_311 med:issuedPrescription res:Rx_230 .
res:Pat_AIS178 med:hasPrescription res:Rx_230 .

res:Inv_239 a med:Invoice ;
    med:forPatient res:Pat_AIS178 ; med:date "2023-11-25"^^xsd:date ;
    med:amount 1318 ; med:paid true ;
    med:status "Settled" .
res:Pat_AIS178 med:hasInvoice res:Inv_239 .

res:Enc_312 a med:EmergencyVisit ;
    med:encounterOf res:Pat_AIS178 ; med:date "2025-04-25"^^xsd:date ;
    med:time "12:00" ;
    med:attendedBy res:Doc_Karthik ; med:inDepartment res:Dept_Emergency ;
    med:reason "Acute presentation" ;
    med:outcome "Follow up scheduled" ;
    med:recordedCondition res:Cond_214 ;
    med:hasVitals res:Vit_312 ; med:hasNote res:Note_312 .

res:Vit_312 a med:VitalSigns ;
    med:systolic 118 ; med:diastolic 73 ;
    med:heartRate 85 ; med:temperature 99.8 ;
    med:spo2 100 ;
    med:weightKg 72.1 ;
    med:bmi 23.2 .

res:Note_312 a med:ClinicalNote ;
    med:authorName "Dr. Karthik" ;
    med:date "2025-04-25"^^xsd:date ;
    med:noteText "Post discharge review. Dose adjusted, repeat bloods before next visit." .

res:Rx_231 a med:Prescription ;
    med:prescribes res:Med_Paracetamol ; med:prescribedBy res:Doc_Karthik ;
    med:forPatient res:Pat_AIS178 ; med:date "2025-04-25"^^xsd:date ;
    med:dosage "2 tablets" ;
    med:frequency "Three times daily" ;
    med:durationDays 5 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_312 med:issuedPrescription res:Rx_231 .
res:Pat_AIS178 med:hasPrescription res:Rx_231 .

res:Lab_140 a med:LabOrder ;
    med:analyte "Platelet count" ; med:forPatient res:Pat_AIS178 ;
    med:date "2025-04-25"^^xsd:date ; med:orderedBy res:Doc_Karthik ;
    med:testsFor res:Dengue ;
    med:orderStatus "Resulted" ;
    med:hasResult res:Res_140 .

res:Res_140 a med:LabResult ;
    med:analyte "Platelet count" ; med:value 97.09 ; med:unit "x10^3/uL" ;
    med:refLow 150 ; med:refHigh 450 ; med:outOfRange true ;
    med:date "2025-04-26"^^xsd:date ;
    med:performedBy res:Tech_Mohan .

res:Enc_312 med:orderedTest res:Lab_140 .

res:Inv_240 a med:Invoice ;
    med:forPatient res:Pat_AIS178 ; med:date "2025-04-25"^^xsd:date ;
    med:amount 28164 ; med:paid true ;
    med:status "Settled" .
res:Pat_AIS178 med:hasInvoice res:Inv_240 .

res:Enc_313 a med:Consultation ;
    med:encounterOf res:Pat_AIS178 ; med:date "2026-08-27"^^xsd:date ;
    med:time "09:45" ;
    med:attendedBy res:Doc_Karthik ; med:inDepartment res:Dept_GeneralMedicine ;
    med:reason "Review of dengue" ;
    med:outcome "Follow up scheduled" ;
    med:recordedCondition res:Cond_214 ;
    med:hasVitals res:Vit_313 ; med:hasNote res:Note_313 .

res:Vit_313 a med:VitalSigns ;
    med:systolic 113 ; med:diastolic 82 ;
    med:heartRate 66 ; med:temperature 98.2 ;
    med:spo2 100 ;
    med:weightKg 57.5 ;
    med:bmi 19.4 .

res:Note_313 a med:ClinicalNote ;
    med:authorName "Dr. Karthik" ;
    med:date "2026-08-27"^^xsd:date ;
    med:noteText "Presents with a two day history of symptoms. Counselled on medication adherence. Red flag symptoms explained." .

res:Rx_232 a med:Prescription ;
    med:prescribes res:Med_Paracetamol ; med:prescribedBy res:Doc_Karthik ;
    med:forPatient res:Pat_AIS178 ; med:date "2026-08-27"^^xsd:date ;
    med:dosage "2 tablets" ;
    med:frequency "Once daily" ;
    med:durationDays 5 ;
    med:dispensed false ;
    med:status "Completed" .

res:Enc_313 med:issuedPrescription res:Rx_232 .
res:Pat_AIS178 med:hasPrescription res:Rx_232 .

res:Lab_141 a med:LabOrder ;
    med:analyte "Platelet count" ; med:forPatient res:Pat_AIS178 ;
    med:date "2026-08-27"^^xsd:date ; med:orderedBy res:Doc_Karthik ;
    med:testsFor res:Dengue ;
    med:orderStatus "Resulted" ;
    med:hasResult res:Res_141 .

res:Res_141 a med:LabResult ;
    med:analyte "Platelet count" ; med:value 175.06 ; med:unit "x10^3/uL" ;
    med:refLow 150 ; med:refHigh 450 ; med:outOfRange false ;
    med:date "2026-08-28"^^xsd:date ;
    med:performedBy res:Tech_Mohan .

res:Enc_313 med:orderedTest res:Lab_141 .

res:Appt_48 a med:Appointment ;
    med:forPatient res:Pat_AIS178 ; med:appointmentWith res:Doc_Joseph ;
    med:date "2026-09-05"^^xsd:date ;
    med:time "13:00" ;
    med:inDepartment res:Dept_GeneralMedicine ;
    med:status "Scheduled" .
res:Pat_AIS178 med:hasAppointment res:Appt_48 .

res:Pat_MUR179 a med:OutPatient ;
    med:name "Murugan Nambiar" ; med:mrn "MRN-MUR179" ; med:photoInitials "MN" ;
    med:sex "Male" ; med:dateOfBirth "1960-09-06"^^xsd:date ; med:age 65 ;
    med:bloodGroup "AB+" ; med:phone "+91 93076 336212" ; med:email "murugan.nambiar@example.in" ;
    med:address "37 ECR, Sholinganallur, Chennai" ;
    med:primaryPhysician res:Doc_Priya ;
    med:hasCondition res:Cond_215 , res:Cond_216 .

res:Cond_215 a med:Condition ;
    med:ofDisease res:Epilepsy ; med:onsetDate "2021-10-21"^^xsd:date ;
    med:severity "Mild" ;
    med:clinicalStatus "Active" ;
    med:diagnosedBy res:Doc_Priya .

res:Cond_216 a med:Condition ;
    med:ofDisease res:Depression ; med:onsetDate "2025-06-22"^^xsd:date ;
    med:severity "Moderate" ;
    med:clinicalStatus "Active" ;
    med:diagnosedBy res:Doc_Leela .

res:Pat_MUR179 med:hasEncounter res:Enc_314 , res:Enc_315 , res:Enc_316 .

res:Enc_314 a med:Consultation ;
    med:encounterOf res:Pat_MUR179 ; med:date "2023-12-03"^^xsd:date ;
    med:time "12:00" ;
    med:attendedBy res:Doc_Priya ; med:inDepartment res:Dept_Neurology ;
    med:reason "First presentation" ;
    med:outcome "Discharged with advice" ;
    med:recordedCondition res:Cond_215 ;
    med:hasVitals res:Vit_314 ; med:hasNote res:Note_314 .

res:Vit_314 a med:VitalSigns ;
    med:systolic 131 ; med:diastolic 75 ;
    med:heartRate 102 ; med:temperature 97.7 ;
    med:spo2 100 ;
    med:weightKg 53.3 ;
    med:bmi 26.6 .

res:Note_314 a med:ClinicalNote ;
    med:authorName "Dr. Priya" ;
    med:date "2023-12-03"^^xsd:date ;
    med:noteText "Patient reports steady improvement since last visit. Reassured. No change to treatment at this stage." .

res:Rx_233 a med:Prescription ;
    med:prescribes res:Med_Levetiracetam ; med:prescribedBy res:Doc_Priya ;
    med:forPatient res:Pat_MUR179 ; med:date "2023-12-03"^^xsd:date ;
    med:dosage "2 tablets" ;
    med:frequency "Twice daily" ;
    med:durationDays 60 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_314 med:issuedPrescription res:Rx_233 .
res:Pat_MUR179 med:hasPrescription res:Rx_233 .

res:Inv_241 a med:Invoice ;
    med:forPatient res:Pat_MUR179 ; med:date "2023-12-03"^^xsd:date ;
    med:amount 3204 ; med:paid true ;
    med:status "Settled" .
res:Pat_MUR179 med:hasInvoice res:Inv_241 .

res:Enc_315 a med:Consultation ;
    med:encounterOf res:Pat_MUR179 ; med:date "2025-04-22"^^xsd:date ;
    med:time "13:45" ;
    med:attendedBy res:Doc_Leela ; med:inDepartment res:Dept_Psychiatry ;
    med:reason "Review of depression" ;
    med:outcome "Referred for tests" ;
    med:recordedCondition res:Cond_216 ;
    med:hasVitals res:Vit_315 ; med:hasNote res:Note_315 .

res:Vit_315 a med:VitalSigns ;
    med:systolic 120 ; med:diastolic 72 ;
    med:heartRate 73 ; med:temperature 99.7 ;
    med:spo2 100 ;
    med:weightKg 56.4 ;
    med:bmi 26.7 .

res:Note_315 a med:ClinicalNote ;
    med:authorName "Dr. Leela" ;
    med:date "2025-04-22"^^xsd:date ;
    med:noteText "Presents with a two day history of symptoms. Investigations ordered, will call with results." .

res:Inv_242 a med:Invoice ;
    med:forPatient res:Pat_MUR179 ; med:date "2025-04-22"^^xsd:date ;
    med:amount 5358 ; med:paid true ;
    med:status "Settled" .
res:Pat_MUR179 med:hasInvoice res:Inv_242 .

res:Enc_316 a med:EmergencyVisit ;
    med:encounterOf res:Pat_MUR179 ; med:date "2026-08-30"^^xsd:date ;
    med:time "12:15" ;
    med:attendedBy res:Doc_Karthik ; med:inDepartment res:Dept_Emergency ;
    med:reason "Acute presentation" ;
    med:outcome "Treatment continued" ;
    med:recordedCondition res:Cond_215 ;
    med:hasVitals res:Vit_316 ; med:hasNote res:Note_316 .

res:Vit_316 a med:VitalSigns ;
    med:systolic 108 ; med:diastolic 71 ;
    med:heartRate 80 ; med:temperature 99.5 ;
    med:spo2 96 ;
    med:weightKg 56.4 ;
    med:bmi 19.8 .

res:Note_316 a med:ClinicalNote ;
    med:authorName "Dr. Karthik" ;
    med:date "2026-08-30"^^xsd:date ;
    med:noteText "Attends for scheduled follow up. Reassured. No change to treatment at this stage." .

res:Rx_234 a med:Prescription ;
    med:prescribes res:Med_Levetiracetam ; med:prescribedBy res:Doc_Karthik ;
    med:forPatient res:Pat_MUR179 ; med:date "2026-08-30"^^xsd:date ;
    med:dosage "2 tablets" ;
    med:frequency "Three times daily" ;
    med:durationDays 30 ;
    med:dispensed false ;
    med:status "Active" .

res:Enc_316 med:issuedPrescription res:Rx_234 .
res:Pat_MUR179 med:hasPrescription res:Rx_234 .

res:Appt_49 a med:Appointment ;
    med:forPatient res:Pat_MUR179 ; med:appointmentWith res:Doc_Priya ;
    med:date "2026-09-06"^^xsd:date ;
    med:time "17:20" ;
    med:inDepartment res:Dept_Neurology ;
    med:status "Scheduled" .
res:Pat_MUR179 med:hasAppointment res:Appt_49 .

res:Pat_JAN180 a med:OutPatient ;
    med:name "Janaki Nambiar" ; med:mrn "MRN-JAN180" ; med:photoInitials "JN" ;
    med:sex "Female" ; med:dateOfBirth "2014-04-28"^^xsd:date ; med:age 12 ;
    med:bloodGroup "B+" ; med:phone "+91 93717 646430" ; med:email "janaki.nambiar@example.in" ;
    med:address "17 Velachery Main Road, Adyar, Chennai" ;
    med:primaryPhysician res:Doc_Joseph ;
    med:hasCondition res:Cond_217 .

res:Cond_217 a med:Condition ;
    med:ofDisease res:Dengue ; med:onsetDate "2024-12-09"^^xsd:date ;
    med:severity "Mild" ;
    med:clinicalStatus "Active" ;
    med:diagnosedBy res:Doc_Joseph .

res:Pat_JAN180 med:hasEncounter res:Enc_317 , res:Enc_318 , res:Enc_319 .

res:Enc_317 a med:Consultation ;
    med:encounterOf res:Pat_JAN180 ; med:date "2023-12-19"^^xsd:date ;
    med:time "16:30" ;
    med:attendedBy res:Doc_Joseph ; med:inDepartment res:Dept_GeneralMedicine ;
    med:reason "First presentation" ;
    med:outcome "Follow up scheduled" ;
    med:recordedCondition res:Cond_217 ;
    med:hasVitals res:Vit_317 ; med:hasNote res:Note_317 .

res:Vit_317 a med:VitalSigns ;
    med:systolic 118 ; med:diastolic 79 ;
    med:heartRate 97 ; med:temperature 98.2 ;
    med:spo2 100 ;
    med:weightKg 62.3 ;
    med:bmi 24.5 .

res:Note_317 a med:ClinicalNote ;
    med:authorName "Dr. Joseph" ;
    med:date "2023-12-19"^^xsd:date ;
    med:noteText "Patient reports steady improvement since last visit. Referral raised to the relevant specialty." .

res:Rx_235 a med:Prescription ;
    med:prescribes res:Med_Paracetamol ; med:prescribedBy res:Doc_Joseph ;
    med:forPatient res:Pat_JAN180 ; med:date "2023-12-19"^^xsd:date ;
    med:dosage "2 tablets" ;
    med:frequency "Once daily" ;
    med:durationDays 14 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_317 med:issuedPrescription res:Rx_235 .
res:Pat_JAN180 med:hasPrescription res:Rx_235 .

res:Lab_142 a med:LabOrder ;
    med:analyte "Platelet count" ; med:forPatient res:Pat_JAN180 ;
    med:date "2023-12-19"^^xsd:date ; med:orderedBy res:Doc_Joseph ;
    med:testsFor res:Dengue ;
    med:orderStatus "Resulted" ;
    med:hasResult res:Res_142 .

res:Res_142 a med:LabResult ;
    med:analyte "Platelet count" ; med:value 126.22 ; med:unit "x10^3/uL" ;
    med:refLow 150 ; med:refHigh 450 ; med:outOfRange true ;
    med:date "2023-12-20"^^xsd:date ;
    med:performedBy res:Tech_Mohan .

res:Enc_317 med:orderedTest res:Lab_142 .

res:Inv_243 a med:Invoice ;
    med:forPatient res:Pat_JAN180 ; med:date "2023-12-19"^^xsd:date ;
    med:amount 4195 ; med:paid true ;
    med:status "Settled" .
res:Inv_243 med:coveredBy res:Policy_JAN180 .
res:Pat_JAN180 med:hasInvoice res:Inv_243 .

res:Enc_318 a med:Consultation ;
    med:encounterOf res:Pat_JAN180 ; med:date "2025-05-02"^^xsd:date ;
    med:time "16:15" ;
    med:attendedBy res:Doc_Joseph ; med:inDepartment res:Dept_GeneralMedicine ;
    med:reason "Review of dengue" ;
    med:outcome "Discharged with advice" ;
    med:recordedCondition res:Cond_217 ;
    med:hasVitals res:Vit_318 ; med:hasNote res:Note_318 .

res:Vit_318 a med:VitalSigns ;
    med:systolic 124 ; med:diastolic 82 ;
    med:heartRate 86 ; med:temperature 100.5 ;
    med:spo2 97 ;
    med:weightKg 60.3 ;
    med:bmi 19.6 .

res:Note_318 a med:ClinicalNote ;
    med:authorName "Dr. Joseph" ;
    med:date "2025-05-02"^^xsd:date ;
    med:noteText "Referred from general medicine for specialist opinion. Referral raised to the relevant specialty." .

res:Lab_143 a med:LabOrder ;
    med:analyte "Platelet count" ; med:forPatient res:Pat_JAN180 ;
    med:date "2025-05-02"^^xsd:date ; med:orderedBy res:Doc_Joseph ;
    med:testsFor res:Dengue ;
    med:orderStatus "Resulted" ;
    med:hasResult res:Res_143 .

res:Res_143 a med:LabResult ;
    med:analyte "Platelet count" ; med:value 193.84 ; med:unit "x10^3/uL" ;
    med:refLow 150 ; med:refHigh 450 ; med:outOfRange false ;
    med:date "2025-05-03"^^xsd:date ;
    med:performedBy res:Tech_Mohan .

res:Enc_318 med:orderedTest res:Lab_143 .

res:Inv_244 a med:Invoice ;
    med:forPatient res:Pat_JAN180 ; med:date "2025-05-02"^^xsd:date ;
    med:amount 6298 ; med:paid true ;
    med:status "Settled" .
res:Inv_244 med:coveredBy res:Policy_JAN180 .
res:Pat_JAN180 med:hasInvoice res:Inv_244 .

res:Enc_319 a med:FollowUp ;
    med:encounterOf res:Pat_JAN180 ; med:date "2026-08-30"^^xsd:date ;
    med:time "11:15" ;
    med:attendedBy res:Doc_Joseph ; med:inDepartment res:Dept_GeneralMedicine ;
    med:reason "Review of dengue" ;
    med:outcome "Referred for tests" ;
    med:recordedCondition res:Cond_217 ;
    med:hasVitals res:Vit_319 ; med:hasNote res:Note_319 .

res:Vit_319 a med:VitalSigns ;
    med:systolic 119 ; med:diastolic 79 ;
    med:heartRate 95 ; med:temperature 97.7 ;
    med:spo2 100 ;
    med:weightKg 54.1 ;
    med:bmi 21.1 .

res:Note_319 a med:ClinicalNote ;
    med:authorName "Dr. Joseph" ;
    med:date "2026-08-30"^^xsd:date ;
    med:noteText "Patient reports steady improvement since last visit. Referral raised to the relevant specialty." .

res:Rx_236 a med:Prescription ;
    med:prescribes res:Med_Paracetamol ; med:prescribedBy res:Doc_Joseph ;
    med:forPatient res:Pat_JAN180 ; med:date "2026-08-30"^^xsd:date ;
    med:dosage "1 dose" ;
    med:frequency "As required" ;
    med:durationDays 10 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_319 med:issuedPrescription res:Rx_236 .
res:Pat_JAN180 med:hasPrescription res:Rx_236 .

res:Lab_144 a med:LabOrder ;
    med:analyte "Platelet count" ; med:forPatient res:Pat_JAN180 ;
    med:date "2026-08-30"^^xsd:date ; med:orderedBy res:Doc_Joseph ;
    med:testsFor res:Dengue ;
    med:orderStatus "Pending" .

res:Enc_319 med:orderedTest res:Lab_144 .

res:Policy_JAN180 a med:InsurancePolicy ;
    med:policyNumber "NE-927918" ;
    med:issuedBy res:Ins_NewIndia ; med:coveragePercent 80 ;
    med:amount 200000 .
res:Pat_JAN180 med:hasPolicy res:Policy_JAN180 .

res:Pat_RAD181 a med:OutPatient ;
    med:name "Radha Nambiar" ; med:mrn "MRN-RAD181" ; med:photoInitials "RN" ;
    med:sex "Female" ; med:dateOfBirth "1980-10-23"^^xsd:date ; med:age 45 ;
    med:bloodGroup "AB-" ; med:phone "+91 93579 629334" ; med:email "radha.nambiar@example.in" ;
    med:address "16 GST Road, Perungudi, Chennai" ;
    med:primaryPhysician res:Doc_Joseph ;
    med:allergicTo res:Allergen_Sulfa ;
    med:hasCondition res:Cond_218 , res:Cond_219 , res:Cond_220 .

res:Cond_218 a med:Condition ;
    med:ofDisease res:Dengue ; med:onsetDate "2025-07-13"^^xsd:date ;
    med:severity "Mild" ;
    med:clinicalStatus "Resolved" ;
    med:resolvedDate "2025-10-06"^^xsd:date ;
    med:diagnosedBy res:Doc_Joseph .

res:Cond_219 a med:Condition ;
    med:ofDisease res:Anemia ; med:onsetDate "2025-03-16"^^xsd:date ;
    med:severity "Moderate" ;
    med:clinicalStatus "Resolved" ;
    med:resolvedDate "2025-08-12"^^xsd:date ;
    med:diagnosedBy res:Doc_Joseph .

res:Cond_220 a med:Condition ;
    med:ofDisease res:Hypothyroidism ; med:onsetDate "2020-01-09"^^xsd:date ;
    med:severity "Mild" ;
    med:clinicalStatus "Active" ;
    med:diagnosedBy res:Doc_Nithya .

res:Pat_RAD181 med:hasEncounter res:Enc_320 , res:Enc_321 .

res:Enc_320 a med:Consultation ;
    med:encounterOf res:Pat_RAD181 ; med:date "2024-07-24"^^xsd:date ;
    med:time "14:15" ;
    med:attendedBy res:Doc_Karthik ; med:inDepartment res:Dept_GeneralMedicine ;
    med:reason "First presentation" ;
    med:outcome "Treatment continued" ;
    med:recordedCondition res:Cond_218 ;
    med:hasVitals res:Vit_320 ; med:hasNote res:Note_320 .

res:Vit_320 a med:VitalSigns ;
    med:systolic 132 ; med:diastolic 66 ;
    med:heartRate 99 ; med:temperature 99.6 ;
    med:spo2 96 ;
    med:weightKg 52.9 ;
    med:bmi 27.2 .

res:Note_320 a med:ClinicalNote ;
    med:authorName "Dr. Karthik" ;
    med:date "2024-07-24"^^xsd:date ;
    med:noteText "Post discharge review. Investigations ordered, will call with results." .

res:Lab_145 a med:LabOrder ;
    med:analyte "Platelet count" ; med:forPatient res:Pat_RAD181 ;
    med:date "2024-07-24"^^xsd:date ; med:orderedBy res:Doc_Karthik ;
    med:testsFor res:Dengue ;
    med:orderStatus "Resulted" ;
    med:hasResult res:Res_145 .

res:Res_145 a med:LabResult ;
    med:analyte "Platelet count" ; med:value 201.19 ; med:unit "x10^3/uL" ;
    med:refLow 150 ; med:refHigh 450 ; med:outOfRange false ;
    med:date "2024-07-25"^^xsd:date ;
    med:performedBy res:Tech_Mohan .

res:Enc_320 med:orderedTest res:Lab_145 .

res:Inv_245 a med:Invoice ;
    med:forPatient res:Pat_RAD181 ; med:date "2024-07-24"^^xsd:date ;
    med:amount 5056 ; med:paid true ;
    med:status "Settled" .
res:Inv_245 med:coveredBy res:Policy_RAD181 .
res:Pat_RAD181 med:hasInvoice res:Inv_245 .

res:Enc_321 a med:FollowUp ;
    med:encounterOf res:Pat_RAD181 ; med:date "2026-08-30"^^xsd:date ;
    med:time "10:00" ;
    med:attendedBy res:Doc_Joseph ; med:inDepartment res:Dept_GeneralMedicine ;
    med:reason "Review of dengue" ;
    med:outcome "Discharged with advice" ;
    med:recordedCondition res:Cond_218 ;
    med:hasVitals res:Vit_321 ; med:hasNote res:Note_321 .

res:Vit_321 a med:VitalSigns ;
    med:systolic 129 ; med:diastolic 72 ;
    med:heartRate 97 ; med:temperature 98.4 ;
    med:spo2 96 ;
    med:weightKg 63.5 ;
    med:bmi 23.5 .

res:Note_321 a med:ClinicalNote ;
    med:authorName "Dr. Joseph" ;
    med:date "2026-08-30"^^xsd:date ;
    med:noteText "Attends for scheduled follow up. Counselled on medication adherence. Red flag symptoms explained." .

res:Rx_237 a med:Prescription ;
    med:prescribes res:Med_Paracetamol ; med:prescribedBy res:Doc_Joseph ;
    med:forPatient res:Pat_RAD181 ; med:date "2026-08-30"^^xsd:date ;
    med:dosage "1 tablet" ;
    med:frequency "As required" ;
    med:durationDays 5 ;
    med:dispensed false ;
    med:status "Completed" .

res:Enc_321 med:issuedPrescription res:Rx_237 .
res:Pat_RAD181 med:hasPrescription res:Rx_237 .

res:Policy_RAD181 a med:InsurancePolicy ;
    med:policyNumber "NE-995842" ;
    med:issuedBy res:Ins_NewIndia ; med:coveragePercent 70 ;
    med:amount 1000000 .
res:Pat_RAD181 med:hasPolicy res:Policy_RAD181 .

res:Appt_50 a med:Appointment ;
    med:forPatient res:Pat_RAD181 ; med:appointmentWith res:Doc_Joseph ;
    med:date "2026-09-16"^^xsd:date ;
    med:time "10:00" ;
    med:inDepartment res:Dept_GeneralMedicine ;
    med:status "Scheduled" .
res:Pat_RAD181 med:hasAppointment res:Appt_50 .

res:Pat_SNE182 a med:OutPatient ;
    med:name "Sneha Ali" ; med:mrn "MRN-SNE182" ; med:photoInitials "SA" ;
    med:sex "Female" ; med:dateOfBirth "1998-02-22"^^xsd:date ; med:age 28 ;
    med:bloodGroup "B+" ; med:phone "+91 99010 398286" ; med:email "sneha.ali@example.in" ;
    med:address "7 Gandhi Nagar 2nd Cross, Pallikaranai, Chennai" ;
    med:primaryPhysician res:Doc_Ramesh ;
    med:allergicTo res:Allergen_Latex , res:Allergen_Penicillin ;
    med:hasCondition res:Cond_221 , res:Cond_222 , res:Cond_223 .

res:Cond_221 a med:Condition ;
    med:ofDisease res:CoronaryArteryDisease ; med:onsetDate "2025-01-02"^^xsd:date ;
    med:severity "Moderate" ;
    med:clinicalStatus "Active" ;
    med:diagnosedBy res:Doc_Farida .

res:Cond_222 a med:Condition ;
    med:ofDisease res:Hypertension ; med:onsetDate "2025-12-30"^^xsd:date ;
    med:severity "Moderate" ;
    med:clinicalStatus "Active" ;
    med:diagnosedBy res:Doc_Suresh .

res:Cond_223 a med:Condition ;
    med:ofDisease res:Dyslipidemia ; med:onsetDate "2019-04-18"^^xsd:date ;
    med:severity "Moderate" ;
    med:clinicalStatus "Active" ;
    med:diagnosedBy res:Doc_Suresh .

res:Pat_SNE182 med:hasEncounter res:Enc_322 , res:Enc_323 , res:Enc_324 , res:Enc_325 , res:Enc_326 , res:Enc_327 .

res:Enc_322 a med:Consultation ;
    med:encounterOf res:Pat_SNE182 ; med:date "2023-04-02"^^xsd:date ;
    med:time "09:00" ;
    med:attendedBy res:Doc_Farida ; med:inDepartment res:Dept_Cardiology ;
    med:reason "First presentation" ;
    med:outcome "Referred for tests" ;
    med:recordedCondition res:Cond_221 ;
    med:hasVitals res:Vit_322 ; med:hasNote res:Note_322 .

res:Vit_322 a med:VitalSigns ;
    med:systolic 162 ; med:diastolic 91 ;
    med:heartRate 83 ; med:temperature 100.3 ;
    med:spo2 96 ;
    med:weightKg 68.9 ;
    med:bmi 20.5 .

res:Note_322 a med:ClinicalNote ;
    med:authorName "Dr. Farida" ;
    med:date "2023-04-02"^^xsd:date ;
    med:noteText "Referred from general medicine for specialist opinion. Continue current therapy, review in three months." .

res:Rx_238 a med:Prescription ;
    med:prescribes res:Med_Clopidogrel ; med:prescribedBy res:Doc_Farida ;
    med:forPatient res:Pat_SNE182 ; med:date "2023-04-02"^^xsd:date ;
    med:dosage "1 tablet" ;
    med:frequency "Three times daily" ;
    med:durationDays 30 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_322 med:issuedPrescription res:Rx_238 .
res:Pat_SNE182 med:hasPrescription res:Rx_238 .

res:Lab_146 a med:LabOrder ;
    med:analyte "Troponin I" ; med:forPatient res:Pat_SNE182 ;
    med:date "2023-04-02"^^xsd:date ; med:orderedBy res:Doc_Farida ;
    med:testsFor res:CoronaryArteryDisease ;
    med:orderStatus "Resulted" ;
    med:hasResult res:Res_146 .

res:Res_146 a med:LabResult ;
    med:analyte "Troponin I" ; med:value 3.73 ; med:unit "ng/mL" ;
    med:refLow 0 ; med:refHigh 0.04 ; med:outOfRange true ;
    med:date "2023-04-03"^^xsd:date ;
    med:performedBy res:Tech_Mohan .

res:Enc_322 med:orderedTest res:Lab_146 .

res:Inv_246 a med:Invoice ;
    med:forPatient res:Pat_SNE182 ; med:date "2023-04-02"^^xsd:date ;
    med:amount 971 ; med:paid false ;
    med:status "Insurance claim pending" .
res:Inv_246 med:coveredBy res:Policy_SNE182 .
res:Pat_SNE182 med:hasInvoice res:Inv_246 .

res:Enc_323 a med:Consultation ;
    med:encounterOf res:Pat_SNE182 ; med:date "2023-12-06"^^xsd:date ;
    med:time "18:15" ;
    med:attendedBy res:Doc_Ramesh ; med:inDepartment res:Dept_Cardiology ;
    med:reason "Review of coronary artery disease" ;
    med:outcome "Discharged with advice" ;
    med:recordedCondition res:Cond_221 ;
    med:hasVitals res:Vit_323 ; med:hasNote res:Note_323 .

res:Vit_323 a med:VitalSigns ;
    med:systolic 140 ; med:diastolic 108 ;
    med:heartRate 73 ; med:temperature 100.5 ;
    med:spo2 98 ;
    med:weightKg 75.3 ;
    med:bmi 24.5 .

res:Note_323 a med:ClinicalNote ;
    med:authorName "Dr. Ramesh" ;
    med:date "2023-12-06"^^xsd:date ;
    med:noteText "Presents with a two day history of symptoms. Advised on diet, salt restriction and daily walking." .

res:Lab_147 a med:LabOrder ;
    med:analyte "Troponin I" ; med:forPatient res:Pat_SNE182 ;
    med:date "2023-12-06"^^xsd:date ; med:orderedBy res:Doc_Ramesh ;
    med:testsFor res:CoronaryArteryDisease ;
    med:orderStatus "Resulted" ;
    med:hasResult res:Res_147 .

res:Res_147 a med:LabResult ;
    med:analyte "Troponin I" ; med:value 2.46 ; med:unit "ng/mL" ;
    med:refLow 0 ; med:refHigh 0.04 ; med:outOfRange true ;
    med:date "2023-12-07"^^xsd:date ;
    med:performedBy res:Tech_Mohan .

res:Enc_323 med:orderedTest res:Lab_147 .

res:Inv_247 a med:Invoice ;
    med:forPatient res:Pat_SNE182 ; med:date "2023-12-06"^^xsd:date ;
    med:amount 2641 ; med:paid true ;
    med:status "Settled" .
res:Inv_247 med:coveredBy res:Policy_SNE182 .
res:Pat_SNE182 med:hasInvoice res:Inv_247 .

res:Enc_324 a med:FollowUp ;
    med:encounterOf res:Pat_SNE182 ; med:date "2024-08-09"^^xsd:date ;
    med:time "17:15" ;
    med:attendedBy res:Doc_Ramesh ; med:inDepartment res:Dept_Cardiology ;
    med:reason "Review of coronary artery disease" ;
    med:outcome "Referred for tests" ;
    med:recordedCondition res:Cond_221 ;
    med:hasVitals res:Vit_324 ; med:hasNote res:Note_324 .

res:Vit_324 a med:VitalSigns ;
    med:systolic 156 ; med:diastolic 87 ;
    med:heartRate 99 ; med:temperature 98.4 ;
    med:spo2 96 ;
    med:weightKg 53.7 ;
    med:bmi 26.1 .

res:Note_324 a med:ClinicalNote ;
    med:authorName "Dr. Ramesh" ;
    med:date "2024-08-09"^^xsd:date ;
    med:noteText "Patient reports steady improvement since last visit. Continue current therapy, review in three months." .

res:Rx_239 a med:Prescription ;
    med:prescribes res:Med_Atorvastatin ; med:prescribedBy res:Doc_Ramesh ;
    med:forPatient res:Pat_SNE182 ; med:date "2024-08-09"^^xsd:date ;
    med:dosage "1 dose" ;
    med:frequency "Once daily at night" ;
    med:durationDays 60 ;
    med:dispensed true ;
    med:status "Completed" .

res:Rx_240 a med:Prescription ;
    med:prescribes res:Med_Clopidogrel ; med:prescribedBy res:Doc_Ramesh ;
    med:forPatient res:Pat_SNE182 ; med:date "2024-08-09"^^xsd:date ;
    med:dosage "1 dose" ;
    med:frequency "Twice daily" ;
    med:durationDays 60 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_324 med:issuedPrescription res:Rx_239 , res:Rx_240 .
res:Pat_SNE182 med:hasPrescription res:Rx_239 , res:Rx_240 .

res:Inv_248 a med:Invoice ;
    med:forPatient res:Pat_SNE182 ; med:date "2024-08-09"^^xsd:date ;
    med:amount 3292 ; med:paid true ;
    med:status "Settled" .
res:Inv_248 med:coveredBy res:Policy_SNE182 .
res:Pat_SNE182 med:hasInvoice res:Inv_248 .

res:Enc_325 a med:FollowUp ;
    med:encounterOf res:Pat_SNE182 ; med:date "2025-04-18"^^xsd:date ;
    med:time "11:30" ;
    med:attendedBy res:Doc_Farida ; med:inDepartment res:Dept_Cardiology ;
    med:reason "Review of coronary artery disease" ;
    med:outcome "Discharged with advice" ;
    med:recordedCondition res:Cond_221 ;
    med:hasVitals res:Vit_325 ; med:hasNote res:Note_325 .

res:Vit_325 a med:VitalSigns ;
    med:systolic 165 ; med:diastolic 105 ;
    med:heartRate 102 ; med:temperature 99.7 ;
    med:spo2 96 ;
    med:weightKg 50.1 ;
    med:bmi 28.0 .

res:Note_325 a med:ClinicalNote ;
    med:authorName "Dr. Farida" ;
    med:date "2025-04-18"^^xsd:date ;
    med:noteText "Reviewed in clinic today. Reassured. No change to treatment at this stage." .

res:Lab_148 a med:LabOrder ;
    med:analyte "Troponin I" ; med:forPatient res:Pat_SNE182 ;
    med:date "2025-04-18"^^xsd:date ; med:orderedBy res:Doc_Farida ;
    med:testsFor res:CoronaryArteryDisease ;
    med:orderStatus "Resulted" ;
    med:hasResult res:Res_148 .

res:Res_148 a med:LabResult ;
    med:analyte "Troponin I" ; med:value 5.63 ; med:unit "ng/mL" ;
    med:refLow 0 ; med:refHigh 0.04 ; med:outOfRange true ;
    med:date "2025-04-19"^^xsd:date ;
    med:performedBy res:Tech_Mohan .

res:Enc_325 med:orderedTest res:Lab_148 .

res:Inv_249 a med:Invoice ;
    med:forPatient res:Pat_SNE182 ; med:date "2025-04-18"^^xsd:date ;
    med:amount 5045 ; med:paid true ;
    med:status "Settled" .
res:Inv_249 med:coveredBy res:Policy_SNE182 .
res:Pat_SNE182 med:hasInvoice res:Inv_249 .

res:Enc_326 a med:FollowUp ;
    med:encounterOf res:Pat_SNE182 ; med:date "2025-12-17"^^xsd:date ;
    med:time "11:15" ;
    med:attendedBy res:Doc_Suresh ; med:inDepartment res:Dept_GeneralMedicine ;
    med:reason "Review of hypertension" ;
    med:outcome "Discharged with advice" ;
    med:recordedCondition res:Cond_222 ;
    med:hasVitals res:Vit_326 ; med:hasNote res:Note_326 .

res:Vit_326 a med:VitalSigns ;
    med:systolic 160 ; med:diastolic 97 ;
    med:heartRate 94 ; med:temperature 98.9 ;
    med:spo2 98 ;
    med:weightKg 56.7 ;
    med:bmi 21.3 .

res:Note_326 a med:ClinicalNote ;
    med:authorName "Dr. Suresh" ;
    med:date "2025-12-17"^^xsd:date ;
    med:noteText "Seen for worsening symptoms over the past week. Reassured. No change to treatment at this stage." .

res:Rx_241 a med:Prescription ;
    med:prescribes res:Med_Metoprolol ; med:prescribedBy res:Doc_Suresh ;
    med:forPatient res:Pat_SNE182 ; med:date "2025-12-17"^^xsd:date ;
    med:dosage "1 tablet" ;
    med:frequency "As required" ;
    med:durationDays 90 ;
    med:dispensed true ;
    med:status "Completed" .

res:Rx_242 a med:Prescription ;
    med:prescribes res:Med_Telmisartan ; med:prescribedBy res:Doc_Suresh ;
    med:forPatient res:Pat_SNE182 ; med:date "2025-12-17"^^xsd:date ;
    med:dosage "1 dose" ;
    med:frequency "Once daily" ;
    med:durationDays 60 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_326 med:issuedPrescription res:Rx_241 , res:Rx_242 .
res:Pat_SNE182 med:hasPrescription res:Rx_241 , res:Rx_242 .

res:Inv_250 a med:Invoice ;
    med:forPatient res:Pat_SNE182 ; med:date "2025-12-17"^^xsd:date ;
    med:amount 5882 ; med:paid true ;
    med:status "Settled" .
res:Inv_250 med:coveredBy res:Policy_SNE182 .
res:Pat_SNE182 med:hasInvoice res:Inv_250 .

res:Enc_327 a med:FollowUp ;
    med:encounterOf res:Pat_SNE182 ; med:date "2026-08-30"^^xsd:date ;
    med:time "14:30" ;
    med:attendedBy res:Doc_Ramesh ; med:inDepartment res:Dept_GeneralMedicine ;
    med:reason "Review of hypertension" ;
    med:outcome "Follow up scheduled" ;
    med:recordedCondition res:Cond_222 ;
    med:hasVitals res:Vit_327 ; med:hasNote res:Note_327 .

res:Vit_327 a med:VitalSigns ;
    med:systolic 155 ; med:diastolic 98 ;
    med:heartRate 73 ; med:temperature 98.4 ;
    med:spo2 99 ;
    med:weightKg 69.5 ;
    med:bmi 21.3 .

res:Note_327 a med:ClinicalNote ;
    med:authorName "Dr. Ramesh" ;
    med:date "2026-08-30"^^xsd:date ;
    med:noteText "Attends for scheduled follow up. Counselled on medication adherence. Red flag symptoms explained." .

res:Rx_243 a med:Prescription ;
    med:prescribes res:Med_Telmisartan ; med:prescribedBy res:Doc_Ramesh ;
    med:forPatient res:Pat_SNE182 ; med:date "2026-08-30"^^xsd:date ;
    med:dosage "2 tablets" ;
    med:frequency "Three times daily" ;
    med:durationDays 90 ;
    med:dispensed true ;
    med:status "Active" .

res:Rx_244 a med:Prescription ;
    med:prescribes res:Med_Amlodipine ; med:prescribedBy res:Doc_Ramesh ;
    med:forPatient res:Pat_SNE182 ; med:date "2026-08-30"^^xsd:date ;
    med:dosage "1 tablet" ;
    med:frequency "Once daily" ;
    med:durationDays 90 ;
    med:dispensed true ;
    med:status "Active" .

res:Enc_327 med:issuedPrescription res:Rx_243 , res:Rx_244 .
res:Pat_SNE182 med:hasPrescription res:Rx_243 , res:Rx_244 .

res:Inv_251 a med:Invoice ;
    med:forPatient res:Pat_SNE182 ; med:date "2026-08-30"^^xsd:date ;
    med:amount 3321 ; med:paid true ;
    med:status "Settled" .
res:Inv_251 med:coveredBy res:Policy_SNE182 .
res:Pat_SNE182 med:hasInvoice res:Inv_251 .

res:Policy_SNE182 a med:InsurancePolicy ;
    med:policyNumber "ST-234868" ;
    med:issuedBy res:Ins_StarHealth ; med:coveragePercent 75 ;
    med:amount 750000 .
res:Pat_SNE182 med:hasPolicy res:Policy_SNE182 .

res:Appt_51 a med:Appointment ;
    med:forPatient res:Pat_SNE182 ; med:appointmentWith res:Doc_Ramesh ;
    med:date "2026-09-01"^^xsd:date ;
    med:time "16:00" ;
    med:inDepartment res:Dept_Cardiology ;
    med:status "Scheduled" .
res:Pat_SNE182 med:hasAppointment res:Appt_51 .

res:Pat_HAR183 a med:OutPatient ;
    med:name "Hari Verma" ; med:mrn "MRN-HAR183" ; med:photoInitials "HV" ;
    med:sex "Male" ; med:dateOfBirth "1987-09-15"^^xsd:date ; med:age 38 ;
    med:bloodGroup "AB+" ; med:phone "+91 97043 460672" ; med:email "hari.verma@example.in" ;
    med:address "40 Bharathi Street, Thoraipakkam, Chennai" ;
    med:primaryPhysician res:Doc_Joseph ;
    med:hasCondition res:Cond_224 , res:Cond_225 , res:Cond_226 , res:Cond_227 .

res:Cond_224 a med:Condition ;
    med:ofDisease res:UrinaryTractInfection ; med:onsetDate "2025-12-29"^^xsd:date ;
    med:severity "Moderate" ;
    med:clinicalStatus "Resolved" ;
    med:resolvedDate "2026-02-25"^^xsd:date ;
    med:diagnosedBy res:Doc_Suresh .

res:Cond_225 a med:Condition ;
    med:ofDisease res:ChronicKidneyDisease ; med:onsetDate "2019-01-26"^^xsd:date ;
    med:severity "Mild" ;
    med:clinicalStatus "Active" ;
    med:diagnosedBy res:Doc_Vandana .

res:Cond_226 a med:Condition ;
    med:ofDisease res:Tuberculosis ; med:onsetDate "2026-05-27"^^xsd:date ;
    med:severity "Moderate" ;
    med:clinicalStatus "Active" ;
    med:diagnosedBy res:Doc_Sameer .

res:Cond_227 a med:Condition ;
    med:ofDisease res:Anemia ; med:onsetDate "2026-08-01"^^xsd:date ;
    med:severity "Mild" ;
    med:clinicalStatus "Resolved" ;
    med:resolvedDate "2026-08-30"^^xsd:date ;
    med:diagnosedBy res:Doc_Joseph .

res:Pat_HAR183 med:hasEncounter res:Enc_328 , res:Enc_329 , res:Enc_330 , res:Enc_331 , res:Enc_332 .

res:Enc_328 a med:Consultation ;
    med:encounterOf res:Pat_HAR183 ; med:date "2023-05-03"^^xsd:date ;
    med:time "15:45" ;
    med:attendedBy res:Doc_Sameer ; med:inDepartment res:Dept_Pulmonology ;
    med:reason "First presentation" ;
    med:outcome "Discharged with advice" ;
    med:recordedCondition res:Cond_226 ;
    med:hasVitals res:Vit_328 ; med:hasNote res:Note_328 .

res:Vit_328 a med:VitalSigns ;
    med:systolic 120 ; med:diastolic 70 ;
    med:heartRate 89 ; med:temperature 99.4 ;
    med:spo2 99 ;
    med:weightKg 72.9 ;
    med:bmi 25.6 .

res:Note_328 a med:ClinicalNote ;
    med:authorName "Dr. Sameer" ;
    med:date "2023-05-03"^^xsd:date ;
    med:noteText "Reviewed in clinic today. Dose adjusted, repeat bloods before next visit." .

res:Inv_252 a med:Invoice ;
    med:forPatient res:Pat_HAR183 ; med:date "2023-05-03"^^xsd:date ;
    med:amount 5750 ; med:paid true ;
    med:status "Settled" .
res:Pat_HAR183 med:hasInvoice res:Inv_252 .

res:Enc_329 a med:DayCareVisit ;
    med:encounterOf res:Pat_HAR183 ; med:date "2024-03-06"^^xsd:date ;
    med:time "12:30" ;
    med:attendedBy res:Doc_Joseph ; med:inDepartment res:Dept_GeneralMedicine ;
    med:reason "Review of anemia" ;
    med:outcome "Discharged with advice" ;
    med:recordedCondition res:Cond_227 ;
    med:hasVitals res:Vit_329 ; med:hasNote res:Note_329 .

res:Vit_329 a med:VitalSigns ;
    med:systolic 128 ; med:diastolic 69 ;
    med:heartRate 75 ; med:temperature 98.6 ;
    med:spo2 98 ;
    med:weightKg 67.0 ;
    med:bmi 23.8 .

res:Note_329 a med:ClinicalNote ;
    med:authorName "Dr. Joseph" ;
    med:date "2024-03-06"^^xsd:date ;
    med:noteText "Presents with a two day history of symptoms. Investigations ordered, will call with results." .

res:Rx_245 a med:Prescription ;
    med:prescribes res:Med_IronFolate ; med:prescribedBy res:Doc_Joseph ;
    med:forPatient res:Pat_HAR183 ; med:date "2024-03-06"^^xsd:date ;
    med:dosage "1 dose" ;
    med:frequency "Once daily" ;
    med:durationDays 10 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_329 med:issuedPrescription res:Rx_245 .
res:Pat_HAR183 med:hasPrescription res:Rx_245 .

res:Lab_149 a med:LabOrder ;
    med:analyte "Haemoglobin" ; med:forPatient res:Pat_HAR183 ;
    med:date "2024-03-06"^^xsd:date ; med:orderedBy res:Doc_Joseph ;
    med:testsFor res:Anemia ;
    med:orderStatus "Resulted" ;
    med:hasResult res:Res_149 .

res:Res_149 a med:LabResult ;
    med:analyte "Haemoglobin" ; med:value 11.85 ; med:unit "g/dL" ;
    med:refLow 12 ; med:refHigh 15.5 ; med:outOfRange true ;
    med:date "2024-03-07"^^xsd:date ;
    med:performedBy res:Tech_Mohan .

res:Enc_329 med:orderedTest res:Lab_149 .

res:Inv_253 a med:Invoice ;
    med:forPatient res:Pat_HAR183 ; med:date "2024-03-06"^^xsd:date ;
    med:amount 2392 ; med:paid true ;
    med:status "Settled" .
res:Pat_HAR183 med:hasInvoice res:Inv_253 .

res:Enc_330 a med:Consultation ;
    med:encounterOf res:Pat_HAR183 ; med:date "2025-01-24"^^xsd:date ;
    med:time "15:15" ;
    med:attendedBy res:Doc_Suresh ; med:inDepartment res:Dept_GeneralMedicine ;
    med:reason "Review of anemia" ;
    med:outcome "Discharged with advice" ;
    med:recordedCondition res:Cond_227 ;
    med:hasVitals res:Vit_330 ; med:hasNote res:Note_330 .

res:Vit_330 a med:VitalSigns ;
    med:systolic 128 ; med:diastolic 76 ;
    med:heartRate 94 ; med:temperature 98.8 ;
    med:spo2 97 ;
    med:weightKg 68.1 ;
    med:bmi 22.6 .

res:Note_330 a med:ClinicalNote ;
    med:authorName "Dr. Suresh" ;
    med:date "2025-01-24"^^xsd:date ;
    med:noteText "Presents with a two day history of symptoms. Continue current therapy, review in three months." .

res:Rx_246 a med:Prescription ;
    med:prescribes res:Med_IronFolate ; med:prescribedBy res:Doc_Suresh ;
    med:forPatient res:Pat_HAR183 ; med:date "2025-01-24"^^xsd:date ;
    med:dosage "1 tablet" ;
    med:frequency "As required" ;
    med:durationDays 5 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_330 med:issuedPrescription res:Rx_246 .
res:Pat_HAR183 med:hasPrescription res:Rx_246 .

res:Inv_254 a med:Invoice ;
    med:forPatient res:Pat_HAR183 ; med:date "2025-01-24"^^xsd:date ;
    med:amount 4548 ; med:paid true ;
    med:status "Settled" .
res:Pat_HAR183 med:hasInvoice res:Inv_254 .

res:Enc_331 a med:DayCareVisit ;
    med:encounterOf res:Pat_HAR183 ; med:date "2025-10-27"^^xsd:date ;
    med:time "16:00" ;
    med:attendedBy res:Doc_Suresh ; med:inDepartment res:Dept_GeneralMedicine ;
    med:reason "Review of urinary tract infection" ;
    med:outcome "Follow up scheduled" ;
    med:recordedCondition res:Cond_224 ;
    med:hasVitals res:Vit_331 ; med:hasNote res:Note_331 .

res:Vit_331 a med:VitalSigns ;
    med:systolic 118 ; med:diastolic 79 ;
    med:heartRate 81 ; med:temperature 99.5 ;
    med:spo2 97 ;
    med:weightKg 67.3 ;
    med:bmi 19.9 .

res:Note_331 a med:ClinicalNote ;
    med:authorName "Dr. Suresh" ;
    med:date "2025-10-27"^^xsd:date ;
    med:noteText "Post discharge review. Dose adjusted, repeat bloods before next visit." .

res:Rx_247 a med:Prescription ;
    med:prescribes res:Med_Nitrofurantoin ; med:prescribedBy res:Doc_Suresh ;
    med:forPatient res:Pat_HAR183 ; med:date "2025-10-27"^^xsd:date ;
    med:dosage "1 dose" ;
    med:frequency "Once daily" ;
    med:durationDays 10 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_331 med:issuedPrescription res:Rx_247 .
res:Pat_HAR183 med:hasPrescription res:Rx_247 .

res:Lab_150 a med:LabOrder ;
    med:analyte "Urine WBC" ; med:forPatient res:Pat_HAR183 ;
    med:date "2025-10-27"^^xsd:date ; med:orderedBy res:Doc_Suresh ;
    med:testsFor res:UrinaryTractInfection ;
    med:orderStatus "Resulted" ;
    med:hasResult res:Res_150 .

res:Res_150 a med:LabResult ;
    med:analyte "Urine WBC" ; med:value 49.26 ; med:unit "/hpf" ;
    med:refLow 0 ; med:refHigh 5 ; med:outOfRange true ;
    med:date "2025-10-28"^^xsd:date ;
    med:performedBy res:Tech_Mohan .

res:Enc_331 med:orderedTest res:Lab_150 .

res:Inv_255 a med:Invoice ;
    med:forPatient res:Pat_HAR183 ; med:date "2025-10-27"^^xsd:date ;
    med:amount 3496 ; med:paid true ;
    med:status "Settled" .
res:Pat_HAR183 med:hasInvoice res:Inv_255 .

res:Enc_332 a med:Consultation ;
    med:encounterOf res:Pat_HAR183 ; med:date "2026-08-30"^^xsd:date ;
    med:time "17:45" ;
    med:attendedBy res:Doc_Sameer ; med:inDepartment res:Dept_Pulmonology ;
    med:reason "Review of tuberculosis" ;
    med:outcome "Follow up scheduled" ;
    med:recordedCondition res:Cond_226 ;
    med:hasVitals res:Vit_332 ; med:hasNote res:Note_332 .

res:Vit_332 a med:VitalSigns ;
    med:systolic 108 ; med:diastolic 73 ;
    med:heartRate 93 ; med:temperature 97.5 ;
    med:spo2 99 ;
    med:weightKg 74.6 ;
    med:bmi 23.5 .

res:Note_332 a med:ClinicalNote ;
    med:authorName "Dr. Sameer" ;
    med:date "2026-08-30"^^xsd:date ;
    med:noteText "Patient reports steady improvement since last visit. Investigations ordered, will call with results." .

res:Lab_151 a med:LabOrder ;
    med:analyte "ESR" ; med:forPatient res:Pat_HAR183 ;
    med:date "2026-08-30"^^xsd:date ; med:orderedBy res:Doc_Sameer ;
    med:testsFor res:Tuberculosis ;
    med:orderStatus "Pending" .

res:Enc_332 med:orderedTest res:Lab_151 .

res:Inv_256 a med:Invoice ;
    med:forPatient res:Pat_HAR183 ; med:date "2026-08-30"^^xsd:date ;
    med:amount 3810 ; med:paid false ;
    med:status "Awaiting payment" .
res:Pat_HAR183 med:hasInvoice res:Inv_256 .

res:Appt_52 a med:Appointment ;
    med:forPatient res:Pat_HAR183 ; med:appointmentWith res:Doc_Joseph ;
    med:date "2026-09-01"^^xsd:date ;
    med:time "15:40" ;
    med:inDepartment res:Dept_GeneralMedicine ;
    med:status "Scheduled" .
res:Pat_HAR183 med:hasAppointment res:Appt_52 .

res:Pat_RAD184 a med:OutPatient ;
    med:name "Radha Joseph" ; med:mrn "MRN-RAD184" ; med:photoInitials "RJ" ;
    med:sex "Female" ; med:dateOfBirth "1944-10-16"^^xsd:date ; med:age 81 ;
    med:bloodGroup "A-" ; med:phone "+91 97749 581394" ; med:email "radha.joseph@example.in" ;
    med:address "41 Anna Salai, Pallikaranai, Chennai" ;
    med:primaryPhysician res:Doc_Leela ;
    med:hasCondition res:Cond_228 , res:Cond_229 , res:Cond_230 , res:Cond_231 .

res:Cond_228 a med:Condition ;
    med:ofDisease res:Depression ; med:onsetDate "2025-06-27"^^xsd:date ;
    med:severity "Moderate" ;
    med:clinicalStatus "Active" ;
    med:diagnosedBy res:Doc_Leela .

res:Cond_229 a med:Condition ;
    med:ofDisease res:AnxietyDisorder ; med:onsetDate "2025-09-05"^^xsd:date ;
    med:severity "Moderate" ;
    med:clinicalStatus "Resolved" ;
    med:resolvedDate "2026-01-19"^^xsd:date ;
    med:diagnosedBy res:Doc_Leela .

res:Cond_230 a med:Condition ;
    med:ofDisease res:Hypothyroidism ; med:onsetDate "2021-12-20"^^xsd:date ;
    med:severity "Moderate" ;
    med:clinicalStatus "Active" ;
    med:diagnosedBy res:Doc_Nithya .

res:Cond_231 a med:Condition , med:CriticalCondition ;
    med:ofDisease res:Stroke ; med:onsetDate "2025-11-28"^^xsd:date ;
    med:severity "Severe" ;
    med:clinicalStatus "Resolved" ;
    med:resolvedDate "2025-12-23"^^xsd:date ;
    med:diagnosedBy res:Doc_Priya .

res:Pat_RAD184 med:hasEncounter res:Enc_333 , res:Enc_334 , res:Enc_335 , res:Enc_336 , res:Enc_337 .

res:Enc_333 a med:Consultation ;
    med:encounterOf res:Pat_RAD184 ; med:date "2023-05-04"^^xsd:date ;
    med:time "17:45" ;
    med:attendedBy res:Doc_Leela ; med:inDepartment res:Dept_Psychiatry ;
    med:reason "First presentation" ;
    med:outcome "Referred for tests" ;
    med:recordedCondition res:Cond_229 ;
    med:hasVitals res:Vit_333 ; med:hasNote res:Note_333 .

res:Vit_333 a med:VitalSigns ;
    med:systolic 119 ; med:diastolic 83 ;
    med:heartRate 95 ; med:temperature 98.8 ;
    med:spo2 98 ;
    med:weightKg 65.9 ;
    med:bmi 24.2 .

res:Note_333 a med:ClinicalNote ;
    med:authorName "Dr. Leela" ;
    med:date "2023-05-04"^^xsd:date ;
    med:noteText "Patient reports steady improvement since last visit. Advised on diet, salt restriction and daily walking." .

res:Rx_248 a med:Prescription ;
    med:prescribes res:Med_Sertraline ; med:prescribedBy res:Doc_Leela ;
    med:forPatient res:Pat_RAD184 ; med:date "2023-05-04"^^xsd:date ;
    med:dosage "1 tablet" ;
    med:frequency "Twice daily" ;
    med:durationDays 14 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_333 med:issuedPrescription res:Rx_248 .
res:Pat_RAD184 med:hasPrescription res:Rx_248 .

res:Inv_257 a med:Invoice ;
    med:forPatient res:Pat_RAD184 ; med:date "2023-05-04"^^xsd:date ;
    med:amount 3931 ; med:paid true ;
    med:status "Settled" .
res:Inv_257 med:coveredBy res:Policy_RAD184 .
res:Pat_RAD184 med:hasInvoice res:Inv_257 .

res:Enc_334 a med:FollowUp ;
    med:encounterOf res:Pat_RAD184 ; med:date "2024-03-30"^^xsd:date ;
    med:time "13:30" ;
    med:attendedBy res:Doc_Leela ; med:inDepartment res:Dept_Psychiatry ;
    med:reason "Review of depression" ;
    med:outcome "Follow up scheduled" ;
    med:recordedCondition res:Cond_228 ;
    med:hasVitals res:Vit_334 ; med:hasNote res:Note_334 .

res:Vit_334 a med:VitalSigns ;
    med:systolic 113 ; med:diastolic 72 ;
    med:heartRate 63 ; med:temperature 99.8 ;
    med:spo2 96 ;
    med:weightKg 50.3 ;
    med:bmi 21.0 .

res:Note_334 a med:ClinicalNote ;
    med:authorName "Dr. Leela" ;
    med:date "2024-03-30"^^xsd:date ;
    med:noteText "Seen for worsening symptoms over the past week. Counselled on medication adherence. Red flag symptoms explained." .

res:Inv_258 a med:Invoice ;
    med:forPatient res:Pat_RAD184 ; med:date "2024-03-30"^^xsd:date ;
    med:amount 3175 ; med:paid true ;
    med:status "Settled" .
res:Inv_258 med:coveredBy res:Policy_RAD184 .
res:Pat_RAD184 med:hasInvoice res:Inv_258 .

res:Enc_335 a med:FollowUp ;
    med:encounterOf res:Pat_RAD184 ; med:date "2025-01-16"^^xsd:date ;
    med:time "13:00" ;
    med:attendedBy res:Doc_Priya ; med:inDepartment res:Dept_Neurology ;
    med:reason "Review of stroke" ;
    med:outcome "Discharged with advice" ;
    med:recordedCondition res:Cond_231 ;
    med:hasVitals res:Vit_335 ; med:hasNote res:Note_335 .

res:Vit_335 a med:VitalSigns ;
    med:systolic 115 ; med:diastolic 68 ;
    med:heartRate 63 ; med:temperature 98.1 ;
    med:spo2 98 ;
    med:weightKg 58.0 ;
    med:bmi 19.8 .

res:Note_335 a med:ClinicalNote ;
    med:authorName "Dr. Priya" ;
    med:date "2025-01-16"^^xsd:date ;
    med:noteText "Attends for scheduled follow up. Reassured. No change to treatment at this stage." .

res:Rx_249 a med:Prescription ;
    med:prescribes res:Med_Warfarin ; med:prescribedBy res:Doc_Priya ;
    med:forPatient res:Pat_RAD184 ; med:date "2025-01-16"^^xsd:date ;
    med:dosage "1 tablet" ;
    med:frequency "Twice daily" ;
    med:durationDays 7 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_335 med:issuedPrescription res:Rx_249 .
res:Pat_RAD184 med:hasPrescription res:Rx_249 .

res:Lab_152 a med:LabOrder ;
    med:analyte "INR" ; med:forPatient res:Pat_RAD184 ;
    med:date "2025-01-16"^^xsd:date ; med:orderedBy res:Doc_Priya ;
    med:testsFor res:Stroke ;
    med:orderStatus "Resulted" ;
    med:hasResult res:Res_152 .

res:Res_152 a med:LabResult ;
    med:analyte "INR" ; med:value 3.33 ; med:unit "ratio" ;
    med:refLow 0.9 ; med:refHigh 1.2 ; med:outOfRange true ;
    med:date "2025-01-17"^^xsd:date ;
    med:performedBy res:Tech_Mohan .

res:Enc_335 med:orderedTest res:Lab_152 .

res:Enc_336 a med:Consultation ;
    med:encounterOf res:Pat_RAD184 ; med:date "2025-10-30"^^xsd:date ;
    med:time "13:00" ;
    med:attendedBy res:Doc_Priya ; med:inDepartment res:Dept_Neurology ;
    med:reason "Review of stroke" ;
    med:outcome "Treatment continued" ;
    med:recordedCondition res:Cond_231 ;
    med:hasVitals res:Vit_336 ; med:hasNote res:Note_336 .

res:Vit_336 a med:VitalSigns ;
    med:systolic 112 ; med:diastolic 77 ;
    med:heartRate 72 ; med:temperature 99.6 ;
    med:spo2 97 ;
    med:weightKg 48.5 ;
    med:bmi 26.2 .

res:Note_336 a med:ClinicalNote ;
    med:authorName "Dr. Priya" ;
    med:date "2025-10-30"^^xsd:date ;
    med:noteText "Post discharge review. Referral raised to the relevant specialty." .

res:Rx_250 a med:Prescription ;
    med:prescribes res:Med_Clopidogrel ; med:prescribedBy res:Doc_Priya ;
    med:forPatient res:Pat_RAD184 ; med:date "2025-10-30"^^xsd:date ;
    med:dosage "2 tablets" ;
    med:frequency "Three times daily" ;
    med:durationDays 10 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_336 med:issuedPrescription res:Rx_250 .
res:Pat_RAD184 med:hasPrescription res:Rx_250 .

res:Inv_259 a med:Invoice ;
    med:forPatient res:Pat_RAD184 ; med:date "2025-10-30"^^xsd:date ;
    med:amount 4023 ; med:paid true ;
    med:status "Settled" .
res:Inv_259 med:coveredBy res:Policy_RAD184 .
res:Pat_RAD184 med:hasInvoice res:Inv_259 .

res:Enc_337 a med:FollowUp ;
    med:encounterOf res:Pat_RAD184 ; med:date "2026-08-14"^^xsd:date ;
    med:time "11:00" ;
    med:attendedBy res:Doc_Leela ; med:inDepartment res:Dept_Psychiatry ;
    med:reason "Review of anxiety disorder" ;
    med:outcome "Referred for tests" ;
    med:recordedCondition res:Cond_229 ;
    med:hasVitals res:Vit_337 ; med:hasNote res:Note_337 .

res:Vit_337 a med:VitalSigns ;
    med:systolic 108 ; med:diastolic 79 ;
    med:heartRate 86 ; med:temperature 97.5 ;
    med:spo2 97 ;
    med:weightKg 55.9 ;
    med:bmi 24.3 .

res:Note_337 a med:ClinicalNote ;
    med:authorName "Dr. Leela" ;
    med:date "2026-08-14"^^xsd:date ;
    med:noteText "Routine review, no new complaints. Continue current therapy, review in three months." .

res:Rx_251 a med:Prescription ;
    med:prescribes res:Med_Sertraline ; med:prescribedBy res:Doc_Leela ;
    med:forPatient res:Pat_RAD184 ; med:date "2026-08-14"^^xsd:date ;
    med:dosage "1 tablet" ;
    med:frequency "Once daily" ;
    med:durationDays 14 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_337 med:issuedPrescription res:Rx_251 .
res:Pat_RAD184 med:hasPrescription res:Rx_251 .

res:Inv_260 a med:Invoice ;
    med:forPatient res:Pat_RAD184 ; med:date "2026-08-14"^^xsd:date ;
    med:amount 2795 ; med:paid false ;
    med:status "Insurance claim pending" .
res:Inv_260 med:coveredBy res:Policy_RAD184 .
res:Pat_RAD184 med:hasInvoice res:Inv_260 .

res:Policy_RAD184 a med:InsurancePolicy ;
    med:policyNumber "NE-170998" ;
    med:issuedBy res:Ins_NewIndia ; med:coveragePercent 90 ;
    med:amount 200000 .
res:Pat_RAD184 med:hasPolicy res:Policy_RAD184 .

res:Pat_TAR185 a med:OutPatient ;
    med:name "Tarun Rao" ; med:mrn "MRN-TAR185" ; med:photoInitials "TR" ;
    med:sex "Male" ; med:dateOfBirth "1964-11-27"^^xsd:date ; med:age 61 ;
    med:bloodGroup "AB+" ; med:phone "+91 99180 626283" ; med:email "tarun.rao@example.in" ;
    med:address "78 Bharathi Street, Velachery, Chennai" ;
    med:primaryPhysician res:Doc_Anand ;
    med:hasCondition res:Cond_232 , res:Cond_233 , res:Cond_234 , res:Cond_235 .

res:Cond_232 a med:Condition ;
    med:ofDisease res:LungCancer ; med:onsetDate "2025-09-14"^^xsd:date ;
    med:severity "Mild" ;
    med:clinicalStatus "Resolved" ;
    med:resolvedDate "2025-12-15"^^xsd:date ;
    med:diagnosedBy res:Doc_Anand .

res:Cond_233 a med:Condition ;
    med:ofDisease res:Pneumonia ; med:onsetDate "2026-03-04"^^xsd:date ;
    med:severity "Moderate" ;
    med:clinicalStatus "Resolved" ;
    med:resolvedDate "2026-05-06"^^xsd:date ;
    med:diagnosedBy res:Doc_Sameer .

res:Cond_234 a med:Condition ;
    med:ofDisease res:Tuberculosis ; med:onsetDate "2025-05-30"^^xsd:date ;
    med:severity "Moderate" ;
    med:clinicalStatus "Active" ;
    med:diagnosedBy res:Doc_Sameer .

res:Cond_235 a med:Condition ;
    med:ofDisease res:COPD ; med:onsetDate "2017-12-26"^^xsd:date ;
    med:severity "Mild" ;
    med:clinicalStatus "Active" ;
    med:diagnosedBy res:Doc_Sameer .

res:Pat_TAR185 med:hasEncounter res:Enc_338 , res:Enc_339 .

res:Enc_338 a med:Consultation ;
    med:encounterOf res:Pat_TAR185 ; med:date "2024-08-21"^^xsd:date ;
    med:time "13:15" ;
    med:attendedBy res:Doc_Sameer ; med:inDepartment res:Dept_Pulmonology ;
    med:reason "First presentation" ;
    med:outcome "Discharged with advice" ;
    med:recordedCondition res:Cond_235 ;
    med:hasVitals res:Vit_338 ; med:hasNote res:Note_338 .

res:Vit_338 a med:VitalSigns ;
    med:systolic 108 ; med:diastolic 82 ;
    med:heartRate 63 ; med:temperature 100.4 ;
    med:spo2 94 ;
    med:weightKg 50.4 ;
    med:bmi 25.0 .

res:Note_338 a med:ClinicalNote ;
    med:authorName "Dr. Sameer" ;
    med:date "2024-08-21"^^xsd:date ;
    med:noteText "Post discharge review. Investigations ordered, will call with results." .

res:Rx_252 a med:Prescription ;
    med:prescribes res:Med_Salbutamol ; med:prescribedBy res:Doc_Sameer ;
    med:forPatient res:Pat_TAR185 ; med:date "2024-08-21"^^xsd:date ;
    med:dosage "2 tablets" ;
    med:frequency "Once daily at night" ;
    med:durationDays 60 ;
    med:dispensed true ;
    med:status "Completed" .

res:Rx_253 a med:Prescription ;
    med:prescribes res:Med_Tiotropium ; med:prescribedBy res:Doc_Sameer ;
    med:forPatient res:Pat_TAR185 ; med:date "2024-08-21"^^xsd:date ;
    med:dosage "1 tablet" ;
    med:frequency "Once daily at night" ;
    med:durationDays 90 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_338 med:issuedPrescription res:Rx_252 , res:Rx_253 .
res:Pat_TAR185 med:hasPrescription res:Rx_252 , res:Rx_253 .

res:Inv_261 a med:Invoice ;
    med:forPatient res:Pat_TAR185 ; med:date "2024-08-21"^^xsd:date ;
    med:amount 4174 ; med:paid true ;
    med:status "Settled" .
res:Inv_261 med:coveredBy res:Policy_TAR185 .
res:Pat_TAR185 med:hasInvoice res:Inv_261 .

res:Enc_339 a med:Consultation ;
    med:encounterOf res:Pat_TAR185 ; med:date "2026-08-30"^^xsd:date ;
    med:time "17:30" ;
    med:attendedBy res:Doc_Sameer ; med:inDepartment res:Dept_Pulmonology ;
    med:reason "Review of c o p d" ;
    med:outcome "Treatment continued" ;
    med:recordedCondition res:Cond_235 ;
    med:hasVitals res:Vit_339 ; med:hasNote res:Note_339 .

res:Vit_339 a med:VitalSigns ;
    med:systolic 132 ; med:diastolic 67 ;
    med:heartRate 102 ; med:temperature 97.6 ;
    med:spo2 90 ;
    med:weightKg 72.3 ;
    med:bmi 25.4 .

res:Note_339 a med:ClinicalNote ;
    med:authorName "Dr. Sameer" ;
    med:date "2026-08-30"^^xsd:date ;
    med:noteText "Reviewed in clinic today. Investigations ordered, will call with results." .

res:Rx_254 a med:Prescription ;
    med:prescribes res:Med_Salbutamol ; med:prescribedBy res:Doc_Sameer ;
    med:forPatient res:Pat_TAR185 ; med:date "2026-08-30"^^xsd:date ;
    med:dosage "1 tablet" ;
    med:frequency "Once daily" ;
    med:durationDays 60 ;
    med:dispensed true ;
    med:status "Active" .

res:Enc_339 med:issuedPrescription res:Rx_254 .
res:Pat_TAR185 med:hasPrescription res:Rx_254 .

res:Inv_262 a med:Invoice ;
    med:forPatient res:Pat_TAR185 ; med:date "2026-08-30"^^xsd:date ;
    med:amount 4823 ; med:paid true ;
    med:status "Settled" .
res:Inv_262 med:coveredBy res:Policy_TAR185 .
res:Pat_TAR185 med:hasInvoice res:Inv_262 .

res:Policy_TAR185 a med:InsurancePolicy ;
    med:policyNumber "HD-284309" ;
    med:issuedBy res:Ins_HDFCErgo ; med:coveragePercent 60 ;
    med:amount 300000 .
res:Pat_TAR185 med:hasPolicy res:Policy_TAR185 .

res:Appt_53 a med:Appointment ;
    med:forPatient res:Pat_TAR185 ; med:appointmentWith res:Doc_Anand ;
    med:date "2026-09-15"^^xsd:date ;
    med:time "15:00" ;
    med:inDepartment res:Dept_Oncology ;
    med:status "Scheduled" .
res:Pat_TAR185 med:hasAppointment res:Appt_53 .

res:Pat_NAN186 a med:OutPatient ;
    med:name "Nandini Mehta" ; med:mrn "MRN-NAN186" ; med:photoInitials "NM" ;
    med:sex "Female" ; med:dateOfBirth "1949-08-07"^^xsd:date ; med:age 77 ;
    med:bloodGroup "O+" ; med:phone "+91 94580 974632" ; med:email "nandini.mehta@example.in" ;
    med:address "46 GST Road, Perungudi, Chennai" ;
    med:primaryPhysician res:Doc_Joseph ;
    med:hasCondition res:Cond_236 .

res:Cond_236 a med:Condition ;
    med:ofDisease res:Dengue ; med:onsetDate "2025-07-02"^^xsd:date ;
    med:severity "Mild" ;
    med:clinicalStatus "Active" ;
    med:diagnosedBy res:Doc_Karthik .

res:Pat_NAN186 med:hasEncounter res:Enc_340 , res:Enc_341 , res:Enc_342 .

res:Enc_340 a med:EmergencyVisit ;
    med:encounterOf res:Pat_NAN186 ; med:date "2023-11-26"^^xsd:date ;
    med:time "18:15" ;
    med:attendedBy res:Doc_Karthik ; med:inDepartment res:Dept_Emergency ;
    med:reason "Acute presentation" ;
    med:outcome "Follow up scheduled" ;
    med:recordedCondition res:Cond_236 ;
    med:hasVitals res:Vit_340 ; med:hasNote res:Note_340 .

res:Vit_340 a med:VitalSigns ;
    med:systolic 124 ; med:diastolic 69 ;
    med:heartRate 85 ; med:temperature 98.4 ;
    med:spo2 96 ;
    med:weightKg 55.3 ;
    med:bmi 23.5 .

res:Note_340 a med:ClinicalNote ;
    med:authorName "Dr. Karthik" ;
    med:date "2023-11-26"^^xsd:date ;
    med:noteText "Referred from general medicine for specialist opinion. Advised on diet, salt restriction and daily walking." .

res:Rx_255 a med:Prescription ;
    med:prescribes res:Med_Paracetamol ; med:prescribedBy res:Doc_Karthik ;
    med:forPatient res:Pat_NAN186 ; med:date "2023-11-26"^^xsd:date ;
    med:dosage "2 tablets" ;
    med:frequency "Once daily at night" ;
    med:durationDays 14 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_340 med:issuedPrescription res:Rx_255 .
res:Pat_NAN186 med:hasPrescription res:Rx_255 .

res:Lab_153 a med:LabOrder ;
    med:analyte "Platelet count" ; med:forPatient res:Pat_NAN186 ;
    med:date "2023-11-26"^^xsd:date ; med:orderedBy res:Doc_Karthik ;
    med:testsFor res:Dengue ;
    med:orderStatus "Resulted" ;
    med:hasResult res:Res_153 .

res:Res_153 a med:LabResult ;
    med:analyte "Platelet count" ; med:value 33.3 ; med:unit "x10^3/uL" ;
    med:refLow 150 ; med:refHigh 450 ; med:outOfRange true ;
    med:date "2023-11-27"^^xsd:date ;
    med:performedBy res:Tech_Mohan .

res:Enc_340 med:orderedTest res:Lab_153 .

res:Inv_263 a med:Invoice ;
    med:forPatient res:Pat_NAN186 ; med:date "2023-11-26"^^xsd:date ;
    med:amount 12463 ; med:paid true ;
    med:status "Settled" .
res:Inv_263 med:coveredBy res:Policy_NAN186 .
res:Pat_NAN186 med:hasInvoice res:Inv_263 .

res:Enc_341 a med:Consultation ;
    med:encounterOf res:Pat_NAN186 ; med:date "2025-04-20"^^xsd:date ;
    med:time "18:30" ;
    med:attendedBy res:Doc_Karthik ; med:inDepartment res:Dept_GeneralMedicine ;
    med:reason "Review of dengue" ;
    med:outcome "Discharged with advice" ;
    med:recordedCondition res:Cond_236 ;
    med:hasVitals res:Vit_341 ; med:hasNote res:Note_341 .

res:Vit_341 a med:VitalSigns ;
    med:systolic 120 ; med:diastolic 74 ;
    med:heartRate 82 ; med:temperature 98.6 ;
    med:spo2 98 ;
    med:weightKg 69.9 ;
    med:bmi 21.1 .

res:Note_341 a med:ClinicalNote ;
    med:authorName "Dr. Karthik" ;
    med:date "2025-04-20"^^xsd:date ;
    med:noteText "Attends for scheduled follow up. Reassured. No change to treatment at this stage." .

res:Lab_154 a med:LabOrder ;
    med:analyte "Platelet count" ; med:forPatient res:Pat_NAN186 ;
    med:date "2025-04-20"^^xsd:date ; med:orderedBy res:Doc_Karthik ;
    med:testsFor res:Dengue ;
    med:orderStatus "Resulted" ;
    med:hasResult res:Res_154 .

res:Res_154 a med:LabResult ;
    med:analyte "Platelet count" ; med:value 119.25 ; med:unit "x10^3/uL" ;
    med:refLow 150 ; med:refHigh 450 ; med:outOfRange true ;
    med:date "2025-04-21"^^xsd:date ;
    med:performedBy res:Tech_Mohan .

res:Enc_341 med:orderedTest res:Lab_154 .

res:Enc_342 a med:Admission ;
    med:encounterOf res:Pat_NAN186 ; med:date "2026-08-30"^^xsd:date ;
    med:time "13:45" ;
    med:attendedBy res:Doc_Karthik ; med:inDepartment res:Dept_GeneralMedicine ;
    med:reason "Review of dengue" ;
    med:outcome "Admitted to ward" ;
    med:lengthOfStay 2 ;
    med:recordedCondition res:Cond_236 ;
    med:hasVitals res:Vit_342 ; med:hasNote res:Note_342 .

res:Vit_342 a med:VitalSigns ;
    med:systolic 120 ; med:diastolic 74 ;
    med:heartRate 103 ; med:temperature 98.5 ;
    med:spo2 96 ;
    med:weightKg 69.6 ;
    med:bmi 26.5 .

res:Note_342 a med:ClinicalNote ;
    med:authorName "Dr. Karthik" ;
    med:date "2026-08-30"^^xsd:date ;
    med:noteText "Routine review, no new complaints. Counselled on medication adherence. Red flag symptoms explained." .

res:Lab_155 a med:LabOrder ;
    med:analyte "Platelet count" ; med:forPatient res:Pat_NAN186 ;
    med:date "2026-08-30"^^xsd:date ; med:orderedBy res:Doc_Karthik ;
    med:testsFor res:Dengue ;
    med:orderStatus "Resulted" ;
    med:hasResult res:Res_155 .

res:Res_155 a med:LabResult ;
    med:analyte "Platelet count" ; med:value 47.69 ; med:unit "x10^3/uL" ;
    med:refLow 150 ; med:refHigh 450 ; med:outOfRange true ;
    med:date "2026-08-30"^^xsd:date ;
    med:performedBy res:Tech_Mohan .

res:Enc_342 med:orderedTest res:Lab_155 .

res:Inv_264 a med:Invoice ;
    med:forPatient res:Pat_NAN186 ; med:date "2026-08-30"^^xsd:date ;
    med:amount 140201 ; med:paid false ;
    med:status "Insurance claim pending" .
res:Inv_264 med:coveredBy res:Policy_NAN186 .
res:Pat_NAN186 med:hasInvoice res:Inv_264 .

res:Policy_NAN186 a med:InsurancePolicy ;
    med:policyNumber "ST-834594" ;
    med:issuedBy res:Ins_StarHealth ; med:coveragePercent 70 ;
    med:amount 1000000 .
res:Pat_NAN186 med:hasPolicy res:Policy_NAN186 .

res:Pat_NAV187 a med:OutPatient ;
    med:name "Naveen Menon" ; med:mrn "MRN-NAV187" ; med:photoInitials "NM" ;
    med:sex "Male" ; med:dateOfBirth "1952-11-28"^^xsd:date ; med:age 73 ;
    med:bloodGroup "O+" ; med:phone "+91 99469 353372" ; med:email "naveen.menon@example.in" ;
    med:address "3 Kamarajar Street, Guindy, Chennai" ;
    med:primaryPhysician res:Doc_Farida ;
    med:hasCondition res:Cond_237 , res:Cond_238 , res:Cond_239 , res:Cond_240 , res:Cond_241 , res:Cond_242 .

res:Cond_237 a med:Condition ;
    med:ofDisease res:CoronaryArteryDisease ; med:onsetDate "2017-11-14"^^xsd:date ;
    med:severity "Moderate" ;
    med:clinicalStatus "Active" ;
    med:diagnosedBy res:Doc_Ramesh .

res:Cond_238 a med:Condition ;
    med:ofDisease res:Hypertension ; med:onsetDate "2018-03-18"^^xsd:date ;
    med:severity "Mild" ;
    med:clinicalStatus "Active" ;
    med:diagnosedBy res:Doc_Joseph .

res:Cond_239 a med:Condition ;
    med:ofDisease res:Dyslipidemia ; med:onsetDate "2017-10-20"^^xsd:date ;
    med:severity "Mild" ;
    med:clinicalStatus "Active" ;
    med:diagnosedBy res:Doc_Suresh .

res:Cond_240 a med:Condition ;
    med:ofDisease res:MyocardialInfarction ; med:onsetDate "2026-07-15"^^xsd:date ;
    med:severity "Mild" ;
    med:clinicalStatus "Resolved" ;
    med:resolvedDate "2026-08-24"^^xsd:date ;
    med:diagnosedBy res:Doc_Ramesh .

res:Cond_241 a med:Condition ;
    med:ofDisease res:TypeIIDiabetes ; med:onsetDate "2020-10-09"^^xsd:date ;
    med:severity "Moderate" ;
    med:clinicalStatus "Active" ;
    med:diagnosedBy res:Doc_Nithya .

res:Cond_242 a med:Condition ;
    med:ofDisease res:ChronicKidneyDisease ; med:onsetDate "2018-12-29"^^xsd:date ;
    med:severity "Moderate" ;
    med:clinicalStatus "Active" ;
    med:diagnosedBy res:Doc_Vandana .

res:Pat_NAV187 med:hasEncounter res:Enc_343 , res:Enc_344 , res:Enc_345 , res:Enc_346 , res:Enc_347 , res:Enc_348 .

res:Enc_343 a med:Consultation ;
    med:encounterOf res:Pat_NAV187 ; med:date "2023-03-29"^^xsd:date ;
    med:time "12:30" ;
    med:attendedBy res:Doc_Ramesh ; med:inDepartment res:Dept_GeneralMedicine ;
    med:reason "First presentation" ;
    med:outcome "Discharged with advice" ;
    med:recordedCondition res:Cond_238 ;
    med:hasVitals res:Vit_343 ; med:hasNote res:Note_343 .

res:Vit_343 a med:VitalSigns ;
    med:systolic 166 ; med:diastolic 103 ;
    med:heartRate 104 ; med:temperature 97.8 ;
    med:spo2 97 ;
    med:weightKg 63.4 ;
    med:bmi 20.9 .

res:Note_343 a med:ClinicalNote ;
    med:authorName "Dr. Ramesh" ;
    med:date "2023-03-29"^^xsd:date ;
    med:noteText "Post discharge review. Investigations ordered, will call with results." .

res:Rx_256 a med:Prescription ;
    med:prescribes res:Med_Telmisartan ; med:prescribedBy res:Doc_Ramesh ;
    med:forPatient res:Pat_NAV187 ; med:date "2023-03-29"^^xsd:date ;
    med:dosage "1 dose" ;
    med:frequency "Three times daily" ;
    med:durationDays 30 ;
    med:dispensed true ;
    med:status "Completed" .

res:Rx_257 a med:Prescription ;
    med:prescribes res:Med_Metoprolol ; med:prescribedBy res:Doc_Ramesh ;
    med:forPatient res:Pat_NAV187 ; med:date "2023-03-29"^^xsd:date ;
    med:dosage "1 tablet" ;
    med:frequency "Once daily" ;
    med:durationDays 90 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_343 med:issuedPrescription res:Rx_256 , res:Rx_257 .
res:Pat_NAV187 med:hasPrescription res:Rx_256 , res:Rx_257 .

res:Inv_265 a med:Invoice ;
    med:forPatient res:Pat_NAV187 ; med:date "2023-03-29"^^xsd:date ;
    med:amount 1045 ; med:paid true ;
    med:status "Settled" .
res:Inv_265 med:coveredBy res:Policy_NAV187 .
res:Pat_NAV187 med:hasInvoice res:Inv_265 .

res:Enc_344 a med:FollowUp ;
    med:encounterOf res:Pat_NAV187 ; med:date "2023-12-01"^^xsd:date ;
    med:time "17:00" ;
    med:attendedBy res:Doc_Joseph ; med:inDepartment res:Dept_GeneralMedicine ;
    med:reason "Review of hypertension" ;
    med:outcome "Referred for tests" ;
    med:recordedCondition res:Cond_238 ;
    med:hasVitals res:Vit_344 ; med:hasNote res:Note_344 .

res:Vit_344 a med:VitalSigns ;
    med:systolic 159 ; med:diastolic 88 ;
    med:heartRate 67 ; med:temperature 97.3 ;
    med:spo2 100 ;
    med:weightKg 58.2 ;
    med:bmi 22.4 .

res:Note_344 a med:ClinicalNote ;
    med:authorName "Dr. Joseph" ;
    med:date "2023-12-01"^^xsd:date ;
    med:noteText "Post discharge review. Reassured. No change to treatment at this stage." .

res:Rx_258 a med:Prescription ;
    med:prescribes res:Med_Telmisartan ; med:prescribedBy res:Doc_Joseph ;
    med:forPatient res:Pat_NAV187 ; med:date "2023-12-01"^^xsd:date ;
    med:dosage "1 tablet" ;
    med:frequency "As required" ;
    med:durationDays 90 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_344 med:issuedPrescription res:Rx_258 .
res:Pat_NAV187 med:hasPrescription res:Rx_258 .

res:Inv_266 a med:Invoice ;
    med:forPatient res:Pat_NAV187 ; med:date "2023-12-01"^^xsd:date ;
    med:amount 5423 ; med:paid true ;
    med:status "Settled" .
res:Inv_266 med:coveredBy res:Policy_NAV187 .
res:Pat_NAV187 med:hasInvoice res:Inv_266 .

res:Enc_345 a med:DayCareVisit ;
    med:encounterOf res:Pat_NAV187 ; med:date "2024-08-03"^^xsd:date ;
    med:time "16:30" ;
    med:attendedBy res:Doc_Suresh ; med:inDepartment res:Dept_GeneralMedicine ;
    med:reason "Review of hypertension" ;
    med:outcome "Discharged with advice" ;
    med:recordedCondition res:Cond_238 ;
    med:hasVitals res:Vit_345 ; med:hasNote res:Note_345 .

res:Vit_345 a med:VitalSigns ;
    med:systolic 168 ; med:diastolic 102 ;
    med:heartRate 83 ; med:temperature 100.5 ;
    med:spo2 98 ;
    med:weightKg 64.9 ;
    med:bmi 20.1 .

res:Note_345 a med:ClinicalNote ;
    med:authorName "Dr. Suresh" ;
    med:date "2024-08-03"^^xsd:date ;
    med:noteText "Referred from general medicine for specialist opinion. Investigations ordered, will call with results." .

res:Rx_259 a med:Prescription ;
    med:prescribes res:Med_Telmisartan ; med:prescribedBy res:Doc_Suresh ;
    med:forPatient res:Pat_NAV187 ; med:date "2024-08-03"^^xsd:date ;
    med:dosage "1 dose" ;
    med:frequency "Once daily" ;
    med:durationDays 30 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_345 med:issuedPrescription res:Rx_259 .
res:Pat_NAV187 med:hasPrescription res:Rx_259 .

res:Inv_267 a med:Invoice ;
    med:forPatient res:Pat_NAV187 ; med:date "2024-08-03"^^xsd:date ;
    med:amount 1274 ; med:paid true ;
    med:status "Settled" .
res:Inv_267 med:coveredBy res:Policy_NAV187 .
res:Pat_NAV187 med:hasInvoice res:Inv_267 .

res:Enc_346 a med:FollowUp ;
    med:encounterOf res:Pat_NAV187 ; med:date "2025-04-01"^^xsd:date ;
    med:time "13:30" ;
    med:attendedBy res:Doc_Ramesh ; med:inDepartment res:Dept_GeneralMedicine ;
    med:reason "Review of hypertension" ;
    med:outcome "Discharged with advice" ;
    med:recordedCondition res:Cond_238 ;
    med:hasVitals res:Vit_346 ; med:hasNote res:Note_346 .

res:Vit_346 a med:VitalSigns ;
    med:systolic 169 ; med:diastolic 101 ;
    med:heartRate 78 ; med:temperature 100.4 ;
    med:spo2 96 ;
    med:weightKg 75.5 ;
    med:bmi 20.0 .

res:Note_346 a med:ClinicalNote ;
    med:authorName "Dr. Ramesh" ;
    med:date "2025-04-01"^^xsd:date ;
    med:noteText "Seen for worsening symptoms over the past week. Referral raised to the relevant specialty." .

res:Inv_268 a med:Invoice ;
    med:forPatient res:Pat_NAV187 ; med:date "2025-04-01"^^xsd:date ;
    med:amount 3097 ; med:paid true ;
    med:status "Settled" .
res:Inv_268 med:coveredBy res:Policy_NAV187 .
res:Pat_NAV187 med:hasInvoice res:Inv_268 .

res:Enc_347 a med:EmergencyVisit ;
    med:encounterOf res:Pat_NAV187 ; med:date "2025-12-21"^^xsd:date ;
    med:time "08:30" ;
    med:attendedBy res:Doc_Karthik ; med:inDepartment res:Dept_Emergency ;
    med:reason "Acute presentation" ;
    med:outcome "Follow up scheduled" ;
    med:recordedCondition res:Cond_242 ;
    med:hasVitals res:Vit_347 ; med:hasNote res:Note_347 .

res:Vit_347 a med:VitalSigns ;
    med:systolic 148 ; med:diastolic 101 ;
    med:heartRate 67 ; med:temperature 99.6 ;
    med:spo2 98 ;
    med:weightKg 51.7 ;
    med:bmi 24.0 .

res:Note_347 a med:ClinicalNote ;
    med:authorName "Dr. Karthik" ;
    med:date "2025-12-21"^^xsd:date ;
    med:noteText "Reviewed in clinic today. Reassured. No change to treatment at this stage." .

res:Rx_260 a med:Prescription ;
    med:prescribes res:Med_Telmisartan ; med:prescribedBy res:Doc_Karthik ;
    med:forPatient res:Pat_NAV187 ; med:date "2025-12-21"^^xsd:date ;
    med:dosage "1 tablet" ;
    med:frequency "As required" ;
    med:durationDays 90 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_347 med:issuedPrescription res:Rx_260 .
res:Pat_NAV187 med:hasPrescription res:Rx_260 .

res:Lab_156 a med:LabOrder ;
    med:analyte "Creatinine" ; med:forPatient res:Pat_NAV187 ;
    med:date "2025-12-21"^^xsd:date ; med:orderedBy res:Doc_Karthik ;
    med:testsFor res:ChronicKidneyDisease ;
    med:orderStatus "Resulted" ;
    med:hasResult res:Res_156 .

res:Res_156 a med:LabResult ;
    med:analyte "Creatinine" ; med:value 4.59 ; med:unit "mg/dL" ;
    med:refLow 0.6 ; med:refHigh 1.2 ; med:outOfRange true ;
    med:date "2025-12-22"^^xsd:date ;
    med:performedBy res:Tech_Mohan .

res:Lab_157 a med:LabOrder ;
    med:analyte "eGFR" ; med:forPatient res:Pat_NAV187 ;
    med:date "2025-12-21"^^xsd:date ; med:orderedBy res:Doc_Karthik ;
    med:testsFor res:ChronicKidneyDisease ;
    med:orderStatus "Resulted" ;
    med:hasResult res:Res_157 .

res:Res_157 a med:LabResult ;
    med:analyte "eGFR" ; med:value 81.19 ; med:unit "mL/min" ;
    med:refLow 90 ; med:refHigh 120 ; med:outOfRange true ;
    med:date "2025-12-22"^^xsd:date ;
    med:performedBy res:Tech_Mohan .

res:Enc_347 med:orderedTest res:Lab_156 , res:Lab_157 .

res:Inv_269 a med:Invoice ;
    med:forPatient res:Pat_NAV187 ; med:date "2025-12-21"^^xsd:date ;
    med:amount 4769 ; med:paid true ;
    med:status "Settled" .
res:Inv_269 med:coveredBy res:Policy_NAV187 .
res:Pat_NAV187 med:hasInvoice res:Inv_269 .

res:Enc_348 a med:Consultation ;
    med:encounterOf res:Pat_NAV187 ; med:date "2026-08-30"^^xsd:date ;
    med:time "17:45" ;
    med:attendedBy res:Doc_Vandana ; med:inDepartment res:Dept_Nephrology ;
    med:reason "Review of chronic kidney disease" ;
    med:outcome "Follow up scheduled" ;
    med:recordedCondition res:Cond_242 ;
    med:hasVitals res:Vit_348 ; med:hasNote res:Note_348 .

res:Vit_348 a med:VitalSigns ;
    med:systolic 141 ; med:diastolic 101 ;
    med:heartRate 92 ; med:temperature 99.7 ;
    med:spo2 99 ;
    med:weightKg 56.7 ;
    med:bmi 21.3 .

res:Note_348 a med:ClinicalNote ;
    med:authorName "Dr. Vandana" ;
    med:date "2026-08-30"^^xsd:date ;
    med:noteText "Seen for worsening symptoms over the past week. Counselled on medication adherence. Red flag symptoms explained." .

res:Rx_261 a med:Prescription ;
    med:prescribes res:Med_Telmisartan ; med:prescribedBy res:Doc_Vandana ;
    med:forPatient res:Pat_NAV187 ; med:date "2026-08-30"^^xsd:date ;
    med:dosage "1 tablet" ;
    med:frequency "Once daily" ;
    med:durationDays 90 ;
    med:dispensed false ;
    med:status "Active" .

res:Enc_348 med:issuedPrescription res:Rx_261 .
res:Pat_NAV187 med:hasPrescription res:Rx_261 .

res:Lab_158 a med:LabOrder ;
    med:analyte "Creatinine" ; med:forPatient res:Pat_NAV187 ;
    med:date "2026-08-30"^^xsd:date ; med:orderedBy res:Doc_Vandana ;
    med:testsFor res:ChronicKidneyDisease ;
    med:orderStatus "Resulted" ;
    med:hasResult res:Res_158 .

res:Res_158 a med:LabResult ;
    med:analyte "Creatinine" ; med:value 1.17 ; med:unit "mg/dL" ;
    med:refLow 0.6 ; med:refHigh 1.2 ; med:outOfRange false ;
    med:date "2026-08-30"^^xsd:date ;
    med:performedBy res:Tech_Mohan .

res:Lab_159 a med:LabOrder ;
    med:analyte "eGFR" ; med:forPatient res:Pat_NAV187 ;
    med:date "2026-08-30"^^xsd:date ; med:orderedBy res:Doc_Vandana ;
    med:testsFor res:ChronicKidneyDisease ;
    med:orderStatus "Pending" .

res:Enc_348 med:orderedTest res:Lab_158 , res:Lab_159 .

res:Inv_270 a med:Invoice ;
    med:forPatient res:Pat_NAV187 ; med:date "2026-08-30"^^xsd:date ;
    med:amount 4550 ; med:paid true ;
    med:status "Settled" .
res:Inv_270 med:coveredBy res:Policy_NAV187 .
res:Pat_NAV187 med:hasInvoice res:Inv_270 .

res:Policy_NAV187 a med:InsurancePolicy ;
    med:policyNumber "ST-193820" ;
    med:issuedBy res:Ins_StarHealth ; med:coveragePercent 60 ;
    med:amount 1000000 .
res:Pat_NAV187 med:hasPolicy res:Policy_NAV187 .

res:Appt_54 a med:Appointment ;
    med:forPatient res:Pat_NAV187 ; med:appointmentWith res:Doc_Ramesh ;
    med:date "2026-10-13"^^xsd:date ;
    med:time "14:20" ;
    med:inDepartment res:Dept_Cardiology ;
    med:status "Scheduled" .
res:Pat_NAV187 med:hasAppointment res:Appt_54 .

res:Pat_FAT188 a med:OutPatient ;
    med:name "Fatima Ali" ; med:mrn "MRN-FAT188" ; med:photoInitials "FA" ;
    med:sex "Female" ; med:dateOfBirth "1996-05-27"^^xsd:date ; med:age 30 ;
    med:bloodGroup "AB-" ; med:phone "+91 99644 925281" ; med:email "fatima.ali@example.in" ;
    med:address "7 Bharathi Street, Kelambakkam, Chennai" ;
    med:primaryPhysician res:Doc_Anand ;
    med:hasCondition res:Cond_243 , res:Cond_244 .

res:Cond_243 a med:Condition , med:CriticalCondition ;
    med:ofDisease res:LungCancer ; med:onsetDate "2025-04-28"^^xsd:date ;
    med:severity "Severe" ;
    med:clinicalStatus "Resolved" ;
    med:resolvedDate "2025-07-12"^^xsd:date ;
    med:diagnosedBy res:Doc_Anand .

res:Cond_244 a med:Condition ;
    med:ofDisease res:Dengue ; med:onsetDate "2025-12-02"^^xsd:date ;
    med:severity "Moderate" ;
    med:clinicalStatus "Active" ;
    med:diagnosedBy res:Doc_Karthik .

res:Pat_FAT188 med:hasEncounter res:Enc_349 .

res:Enc_349 a med:EmergencyVisit ;
    med:encounterOf res:Pat_FAT188 ; med:date "2026-08-13"^^xsd:date ;
    med:time "09:30" ;
    med:attendedBy res:Doc_Karthik ; med:inDepartment res:Dept_Emergency ;
    med:reason "Acute presentation" ;
    med:outcome "Follow up scheduled" ;
    med:recordedCondition res:Cond_244 ;
    med:hasVitals res:Vit_349 ; med:hasNote res:Note_349 .

res:Vit_349 a med:VitalSigns ;
    med:systolic 120 ; med:diastolic 68 ;
    med:heartRate 104 ; med:temperature 98.7 ;
    med:spo2 100 ;
    med:weightKg 59.5 ;
    med:bmi 26.4 .

res:Note_349 a med:ClinicalNote ;
    med:authorName "Dr. Karthik" ;
    med:date "2026-08-13"^^xsd:date ;
    med:noteText "Patient reports steady improvement since last visit. Referral raised to the relevant specialty." .

res:Rx_262 a med:Prescription ;
    med:prescribes res:Med_Paracetamol ; med:prescribedBy res:Doc_Karthik ;
    med:forPatient res:Pat_FAT188 ; med:date "2026-08-13"^^xsd:date ;
    med:dosage "1 dose" ;
    med:frequency "As required" ;
    med:durationDays 7 ;
    med:dispensed false ;
    med:status "Completed" .

res:Enc_349 med:issuedPrescription res:Rx_262 .
res:Pat_FAT188 med:hasPrescription res:Rx_262 .

res:Inv_271 a med:Invoice ;
    med:forPatient res:Pat_FAT188 ; med:date "2026-08-13"^^xsd:date ;
    med:amount 8795 ; med:paid false ;
    med:status "Insurance claim pending" .
res:Inv_271 med:coveredBy res:Policy_FAT188 .
res:Pat_FAT188 med:hasInvoice res:Inv_271 .

res:Policy_FAT188 a med:InsurancePolicy ;
    med:policyNumber "ST-185266" ;
    med:issuedBy res:Ins_StarHealth ; med:coveragePercent 80 ;
    med:amount 750000 .
res:Pat_FAT188 med:hasPolicy res:Policy_FAT188 .

res:Appt_55 a med:Appointment ;
    med:forPatient res:Pat_FAT188 ; med:appointmentWith res:Doc_Anand ;
    med:date "2026-09-29"^^xsd:date ;
    med:time "10:00" ;
    med:inDepartment res:Dept_Oncology ;
    med:status "Scheduled" .
res:Pat_FAT188 med:hasAppointment res:Appt_55 .

res:Pat_RAV189 a med:OutPatient ;
    med:name "Ravi Sharma" ; med:mrn "MRN-RAV189" ; med:photoInitials "RS" ;
    med:sex "Male" ; med:dateOfBirth "1971-12-16"^^xsd:date ; med:age 54 ;
    med:bloodGroup "AB+" ; med:phone "+91 93513 192661" ; med:email "ravi.sharma@example.in" ;
    med:address "77 ECR, Tambaram, Chennai" ;
    med:primaryPhysician res:Doc_Priya ;
    med:hasCondition res:Cond_245 , res:Cond_246 .

res:Cond_245 a med:Condition ;
    med:ofDisease res:Migraine ; med:onsetDate "2025-03-01"^^xsd:date ;
    med:severity "Moderate" ;
    med:clinicalStatus "Resolved" ;
    med:resolvedDate "2025-04-28"^^xsd:date ;
    med:diagnosedBy res:Doc_Priya .

res:Cond_246 a med:Condition ;
    med:ofDisease res:Stroke ; med:onsetDate "2026-07-09"^^xsd:date ;
    med:severity "Moderate" ;
    med:clinicalStatus "Resolved" ;
    med:resolvedDate "2026-07-30"^^xsd:date ;
    med:diagnosedBy res:Doc_Priya .

res:Pat_RAV189 med:hasEncounter res:Enc_350 .

res:Enc_350 a med:Consultation ;
    med:encounterOf res:Pat_RAV189 ; med:date "2026-08-17"^^xsd:date ;
    med:time "13:30" ;
    med:attendedBy res:Doc_Priya ; med:inDepartment res:Dept_Neurology ;
    med:reason "First presentation" ;
    med:outcome "Referred for tests" ;
    med:recordedCondition res:Cond_246 ;
    med:hasVitals res:Vit_350 ; med:hasNote res:Note_350 .

res:Vit_350 a med:VitalSigns ;
    med:systolic 131 ; med:diastolic 70 ;
    med:heartRate 75 ; med:temperature 100.2 ;
    med:spo2 99 ;
    med:weightKg 71.0 ;
    med:bmi 26.0 .

res:Note_350 a med:ClinicalNote ;
    med:authorName "Dr. Priya" ;
    med:date "2026-08-17"^^xsd:date ;
    med:noteText "Post discharge review. Dose adjusted, repeat bloods before next visit." .

res:Rx_263 a med:Prescription ;
    med:prescribes res:Med_Clopidogrel ; med:prescribedBy res:Doc_Priya ;
    med:forPatient res:Pat_RAV189 ; med:date "2026-08-17"^^xsd:date ;
    med:dosage "1 tablet" ;
    med:frequency "As required" ;
    med:durationDays 7 ;
    med:dispensed false ;
    med:status "Completed" .

res:Enc_350 med:issuedPrescription res:Rx_263 .
res:Pat_RAV189 med:hasPrescription res:Rx_263 .

res:Lab_160 a med:LabOrder ;
    med:analyte "INR" ; med:forPatient res:Pat_RAV189 ;
    med:date "2026-08-17"^^xsd:date ; med:orderedBy res:Doc_Priya ;
    med:testsFor res:Stroke ;
    med:orderStatus "Resulted" ;
    med:hasResult res:Res_160 .

res:Res_160 a med:LabResult ;
    med:analyte "INR" ; med:value 3.14 ; med:unit "ratio" ;
    med:refLow 0.9 ; med:refHigh 1.2 ; med:outOfRange true ;
    med:date "2026-08-18"^^xsd:date ;
    med:performedBy res:Tech_Mohan .

res:Enc_350 med:orderedTest res:Lab_160 .

res:Inv_272 a med:Invoice ;
    med:forPatient res:Pat_RAV189 ; med:date "2026-08-17"^^xsd:date ;
    med:amount 2757 ; med:paid true ;
    med:status "Settled" .
res:Pat_RAV189 med:hasInvoice res:Inv_272 .

res:Appt_56 a med:Appointment ;
    med:forPatient res:Pat_RAV189 ; med:appointmentWith res:Doc_Priya ;
    med:date "2026-09-15"^^xsd:date ;
    med:time "10:20" ;
    med:inDepartment res:Dept_Neurology ;
    med:status "Scheduled" .
res:Pat_RAV189 med:hasAppointment res:Appt_56 .

res:Pat_ROO190 a med:OutPatient ;
    med:name "Roopa Nair" ; med:mrn "MRN-ROO190" ; med:photoInitials "RN" ;
    med:sex "Female" ; med:dateOfBirth "1946-11-02"^^xsd:date ; med:age 79 ;
    med:bloodGroup "B+" ; med:phone "+91 92827 215003" ; med:email "roopa.nair@example.in" ;
    med:address "57 Anna Salai, Chromepet, Chennai" ;
    med:primaryPhysician res:Doc_Anand ;
    med:allergicTo res:Allergen_Penicillin ;
    med:hasCondition res:Cond_247 , res:Cond_248 , res:Cond_249 , res:Cond_250 .

res:Cond_247 a med:Condition , med:CriticalCondition ;
    med:ofDisease res:LungCancer ; med:onsetDate "2025-12-19"^^xsd:date ;
    med:severity "Severe" ;
    med:clinicalStatus "Resolved" ;
    med:resolvedDate "2026-05-25"^^xsd:date ;
    med:diagnosedBy res:Doc_Anand .

res:Cond_248 a med:Condition ;
    med:ofDisease res:COPD ; med:onsetDate "2022-12-11"^^xsd:date ;
    med:severity "Moderate" ;
    med:clinicalStatus "Active" ;
    med:diagnosedBy res:Doc_Sameer .

res:Cond_249 a med:Condition ;
    med:ofDisease res:Anemia ; med:onsetDate "2025-10-17"^^xsd:date ;
    med:severity "Mild" ;
    med:clinicalStatus "Resolved" ;
    med:resolvedDate "2025-12-17"^^xsd:date ;
    med:diagnosedBy res:Doc_Joseph .

res:Cond_250 a med:Condition ;
    med:ofDisease res:Pneumonia ; med:onsetDate "2025-07-13"^^xsd:date ;
    med:severity "Moderate" ;
    med:clinicalStatus "Resolved" ;
    med:resolvedDate "2025-10-31"^^xsd:date ;
    med:diagnosedBy res:Doc_Sameer .

res:Pat_ROO190 med:hasEncounter res:Enc_351 , res:Enc_352 , res:Enc_353 , res:Enc_354 .

res:Enc_351 a med:EmergencyVisit ;
    med:encounterOf res:Pat_ROO190 ; med:date "2023-08-06"^^xsd:date ;
    med:time "08:45" ;
    med:attendedBy res:Doc_Karthik ; med:inDepartment res:Dept_Emergency ;
    med:reason "Acute presentation" ;
    med:outcome "Treatment continued" ;
    med:recordedCondition res:Cond_248 ;
    med:hasVitals res:Vit_351 ; med:hasNote res:Note_351 .

res:Vit_351 a med:VitalSigns ;
    med:systolic 132 ; med:diastolic 66 ;
    med:heartRate 77 ; med:temperature 97.8 ;
    med:spo2 93 ;
    med:weightKg 64.4 ;
    med:bmi 26.5 .

res:Note_351 a med:ClinicalNote ;
    med:authorName "Dr. Karthik" ;
    med:date "2023-08-06"^^xsd:date ;
    med:noteText "Presents with a two day history of symptoms. Continue current therapy, review in three months." .

res:Rx_264 a med:Prescription ;
    med:prescribes res:Med_Salbutamol ; med:prescribedBy res:Doc_Karthik ;
    med:forPatient res:Pat_ROO190 ; med:date "2023-08-06"^^xsd:date ;
    med:dosage "1 tablet" ;
    med:frequency "Once daily" ;
    med:durationDays 90 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_351 med:issuedPrescription res:Rx_264 .
res:Pat_ROO190 med:hasPrescription res:Rx_264 .

res:Inv_273 a med:Invoice ;
    med:forPatient res:Pat_ROO190 ; med:date "2023-08-06"^^xsd:date ;
    med:amount 5306 ; med:paid false ;
    med:status "Insurance claim pending" .
res:Inv_273 med:coveredBy res:Policy_ROO190 .
res:Pat_ROO190 med:hasInvoice res:Inv_273 .

res:Enc_352 a med:Consultation ;
    med:encounterOf res:Pat_ROO190 ; med:date "2024-08-05"^^xsd:date ;
    med:time "17:45" ;
    med:attendedBy res:Doc_Joseph ; med:inDepartment res:Dept_GeneralMedicine ;
    med:reason "Review of anemia" ;
    med:outcome "Discharged with advice" ;
    med:recordedCondition res:Cond_249 ;
    med:hasVitals res:Vit_352 ; med:hasNote res:Note_352 .

res:Vit_352 a med:VitalSigns ;
    med:systolic 113 ; med:diastolic 78 ;
    med:heartRate 71 ; med:temperature 99.4 ;
    med:spo2 96 ;
    med:weightKg 51.7 ;
    med:bmi 21.4 .

res:Note_352 a med:ClinicalNote ;
    med:authorName "Dr. Joseph" ;
    med:date "2024-08-05"^^xsd:date ;
    med:noteText "Presents with a two day history of symptoms. Dose adjusted, repeat bloods before next visit." .

res:Rx_265 a med:Prescription ;
    med:prescribes res:Med_IronFolate ; med:prescribedBy res:Doc_Joseph ;
    med:forPatient res:Pat_ROO190 ; med:date "2024-08-05"^^xsd:date ;
    med:dosage "2 tablets" ;
    med:frequency "Once daily at night" ;
    med:durationDays 7 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_352 med:issuedPrescription res:Rx_265 .
res:Pat_ROO190 med:hasPrescription res:Rx_265 .

res:Inv_274 a med:Invoice ;
    med:forPatient res:Pat_ROO190 ; med:date "2024-08-05"^^xsd:date ;
    med:amount 2474 ; med:paid true ;
    med:status "Settled" .
res:Inv_274 med:coveredBy res:Policy_ROO190 .
res:Pat_ROO190 med:hasInvoice res:Inv_274 .

res:Enc_353 a med:Screening ;
    med:encounterOf res:Pat_ROO190 ; med:date "2025-08-18"^^xsd:date ;
    med:time "18:30" ;
    med:attendedBy res:Doc_Joseph ; med:inDepartment res:Dept_Pulmonology ;
    med:reason "Review of pneumonia" ;
    med:outcome "Treatment continued" ;
    med:recordedCondition res:Cond_250 ;
    med:hasVitals res:Vit_353 ; med:hasNote res:Note_353 .

res:Vit_353 a med:VitalSigns ;
    med:systolic 121 ; med:diastolic 70 ;
    med:heartRate 64 ; med:temperature 100.3 ;
    med:spo2 96 ;
    med:weightKg 52.5 ;
    med:bmi 25.5 .

res:Note_353 a med:ClinicalNote ;
    med:authorName "Dr. Joseph" ;
    med:date "2025-08-18"^^xsd:date ;
    med:noteText "Patient reports steady improvement since last visit. Continue current therapy, review in three months." .

res:Rx_266 a med:Prescription ;
    med:prescribes res:Med_Amoxicillin ; med:prescribedBy res:Doc_Joseph ;
    med:forPatient res:Pat_ROO190 ; med:date "2025-08-18"^^xsd:date ;
    med:dosage "2 tablets" ;
    med:frequency "As required" ;
    med:durationDays 10 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_353 med:issuedPrescription res:Rx_266 .
res:Pat_ROO190 med:hasPrescription res:Rx_266 .

res:Inv_275 a med:Invoice ;
    med:forPatient res:Pat_ROO190 ; med:date "2025-08-18"^^xsd:date ;
    med:amount 5357 ; med:paid false ;
    med:status "Insurance claim pending" .
res:Inv_275 med:coveredBy res:Policy_ROO190 .
res:Pat_ROO190 med:hasInvoice res:Inv_275 .

res:Enc_354 a med:Consultation ;
    med:encounterOf res:Pat_ROO190 ; med:date "2026-08-21"^^xsd:date ;
    med:time "11:15" ;
    med:attendedBy res:Doc_Anand ; med:inDepartment res:Dept_Oncology ;
    med:reason "Review of lung cancer" ;
    med:outcome "Treatment continued" ;
    med:recordedCondition res:Cond_247 ;
    med:hasVitals res:Vit_354 ; med:hasNote res:Note_354 .

res:Vit_354 a med:VitalSigns ;
    med:systolic 134 ; med:diastolic 83 ;
    med:heartRate 97 ; med:temperature 99.6 ;
    med:spo2 94 ;
    med:weightKg 66.1 ;
    med:bmi 24.5 .

res:Note_354 a med:ClinicalNote ;
    med:authorName "Dr. Anand" ;
    med:date "2026-08-21"^^xsd:date ;
    med:noteText "Presents with a two day history of symptoms. Advised on diet, salt restriction and daily walking." .

res:Lab_161 a med:LabOrder ;
    med:analyte "CEA" ; med:forPatient res:Pat_ROO190 ;
    med:date "2026-08-21"^^xsd:date ; med:orderedBy res:Doc_Anand ;
    med:testsFor res:LungCancer ;
    med:orderStatus "Resulted" ;
    med:hasResult res:Res_161 .

res:Res_161 a med:LabResult ;
    med:analyte "CEA" ; med:value 37.37 ; med:unit "ng/mL" ;
    med:refLow 0 ; med:refHigh 3 ; med:outOfRange true ;
    med:date "2026-08-22"^^xsd:date ;
    med:performedBy res:Tech_Mohan .

res:Enc_354 med:orderedTest res:Lab_161 .

res:Inv_276 a med:Invoice ;
    med:forPatient res:Pat_ROO190 ; med:date "2026-08-21"^^xsd:date ;
    med:amount 2384 ; med:paid false ;
    med:status "Insurance claim pending" .
res:Inv_276 med:coveredBy res:Policy_ROO190 .
res:Pat_ROO190 med:hasInvoice res:Inv_276 .

res:Policy_ROO190 a med:InsurancePolicy ;
    med:policyNumber "CG-957318" ;
    med:issuedBy res:Ins_CGHS ; med:coveragePercent 75 ;
    med:amount 500000 .
res:Pat_ROO190 med:hasPolicy res:Policy_ROO190 .

res:Appt_57 a med:Appointment ;
    med:forPatient res:Pat_ROO190 ; med:appointmentWith res:Doc_Anand ;
    med:date "2026-09-05"^^xsd:date ;
    med:time "14:00" ;
    med:inDepartment res:Dept_Oncology ;
    med:status "Scheduled" .
res:Pat_ROO190 med:hasAppointment res:Appt_57 .

res:Pat_MAL191 a med:OutPatient ;
    med:name "Malathi Pillai" ; med:mrn "MRN-MAL191" ; med:photoInitials "MP" ;
    med:sex "Female" ; med:dateOfBirth "1950-02-04"^^xsd:date ; med:age 76 ;
    med:bloodGroup "B+" ; med:phone "+91 97046 652007" ; med:email "malathi.pillai@example.in" ;
    med:address "65 Gandhi Nagar 2nd Cross, Thoraipakkam, Chennai" ;
    med:primaryPhysician res:Doc_Nithya ;
    med:hasCondition res:Cond_251 , res:Cond_252 , res:Cond_253 , res:Cond_254 .

res:Cond_251 a med:Condition ;
    med:ofDisease res:Hypothyroidism ; med:onsetDate "2018-07-02"^^xsd:date ;
    med:severity "Moderate" ;
    med:clinicalStatus "Active" ;
    med:diagnosedBy res:Doc_Nithya .

res:Cond_252 a med:Condition ;
    med:ofDisease res:Obesity ; med:onsetDate "2024-01-10"^^xsd:date ;
    med:severity "Moderate" ;
    med:clinicalStatus "Active" ;
    med:diagnosedBy res:Doc_Suresh .

res:Cond_253 a med:Condition ;
    med:ofDisease res:Depression ; med:onsetDate "2020-08-16"^^xsd:date ;
    med:severity "Moderate" ;
    med:clinicalStatus "Active" ;
    med:diagnosedBy res:Doc_Leela .

res:Cond_254 a med:Condition ;
    med:ofDisease res:Anemia ; med:onsetDate "2025-11-03"^^xsd:date ;
    med:severity "Moderate" ;
    med:clinicalStatus "Active" ;
    med:diagnosedBy res:Doc_Joseph .

res:Pat_MAL191 med:hasEncounter res:Enc_355 , res:Enc_356 , res:Enc_357 , res:Enc_358 .

res:Enc_355 a med:Consultation ;
    med:encounterOf res:Pat_MAL191 ; med:date "2023-07-15"^^xsd:date ;
    med:time "08:30" ;
    med:attendedBy res:Doc_Nithya ; med:inDepartment res:Dept_Endocrinology ;
    med:reason "First presentation" ;
    med:outcome "Treatment continued" ;
    med:recordedCondition res:Cond_251 ;
    med:hasVitals res:Vit_355 ; med:hasNote res:Note_355 .

res:Vit_355 a med:VitalSigns ;
    med:systolic 122 ; med:diastolic 72 ;
    med:heartRate 101 ; med:temperature 98.7 ;
    med:spo2 98 ;
    med:weightKg 80.5 ;
    med:bmi 34.9 .

res:Note_355 a med:ClinicalNote ;
    med:authorName "Dr. Nithya" ;
    med:date "2023-07-15"^^xsd:date ;
    med:noteText "Routine review, no new complaints. Advised on diet, salt restriction and daily walking." .

res:Rx_267 a med:Prescription ;
    med:prescribes res:Med_Levothyroxine ; med:prescribedBy res:Doc_Nithya ;
    med:forPatient res:Pat_MAL191 ; med:date "2023-07-15"^^xsd:date ;
    med:dosage "2 tablets" ;
    med:frequency "Twice daily" ;
    med:durationDays 30 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_355 med:issuedPrescription res:Rx_267 .
res:Pat_MAL191 med:hasPrescription res:Rx_267 .

res:Inv_277 a med:Invoice ;
    med:forPatient res:Pat_MAL191 ; med:date "2023-07-15"^^xsd:date ;
    med:amount 5521 ; med:paid true ;
    med:status "Settled" .
res:Inv_277 med:coveredBy res:Policy_MAL191 .
res:Pat_MAL191 med:hasInvoice res:Inv_277 .

res:Enc_356 a med:FollowUp ;
    med:encounterOf res:Pat_MAL191 ; med:date "2024-08-26"^^xsd:date ;
    med:time "08:45" ;
    med:attendedBy res:Doc_Joseph ; med:inDepartment res:Dept_GeneralMedicine ;
    med:reason "Review of anemia" ;
    med:outcome "Referred for tests" ;
    med:recordedCondition res:Cond_254 ;
    med:hasVitals res:Vit_356 ; med:hasNote res:Note_356 .

res:Vit_356 a med:VitalSigns ;
    med:systolic 110 ; med:diastolic 71 ;
    med:heartRate 103 ; med:temperature 97.5 ;
    med:spo2 99 ;
    med:weightKg 92.8 ;
    med:bmi 33.1 .

res:Note_356 a med:ClinicalNote ;
    med:authorName "Dr. Joseph" ;
    med:date "2024-08-26"^^xsd:date ;
    med:noteText "Routine review, no new complaints. Continue current therapy, review in three months." .

res:Rx_268 a med:Prescription ;
    med:prescribes res:Med_IronFolate ; med:prescribedBy res:Doc_Joseph ;
    med:forPatient res:Pat_MAL191 ; med:date "2024-08-26"^^xsd:date ;
    med:dosage "1 dose" ;
    med:frequency "Twice daily" ;
    med:durationDays 14 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_356 med:issuedPrescription res:Rx_268 .
res:Pat_MAL191 med:hasPrescription res:Rx_268 .

res:Inv_278 a med:Invoice ;
    med:forPatient res:Pat_MAL191 ; med:date "2024-08-26"^^xsd:date ;
    med:amount 5669 ; med:paid true ;
    med:status "Settled" .
res:Inv_278 med:coveredBy res:Policy_MAL191 .
res:Pat_MAL191 med:hasInvoice res:Inv_278 .

res:Enc_357 a med:EmergencyVisit ;
    med:encounterOf res:Pat_MAL191 ; med:date "2025-09-08"^^xsd:date ;
    med:time "14:15" ;
    med:attendedBy res:Doc_Karthik ; med:inDepartment res:Dept_Emergency ;
    med:reason "Acute presentation" ;
    med:outcome "Discharged with advice" ;
    med:recordedCondition res:Cond_254 ;
    med:hasVitals res:Vit_357 ; med:hasNote res:Note_357 .

res:Vit_357 a med:VitalSigns ;
    med:systolic 113 ; med:diastolic 82 ;
    med:heartRate 89 ; med:temperature 99.7 ;
    med:spo2 100 ;
    med:weightKg 80.9 ;
    med:bmi 31.8 .

res:Note_357 a med:ClinicalNote ;
    med:authorName "Dr. Karthik" ;
    med:date "2025-09-08"^^xsd:date ;
    med:noteText "Presents with a two day history of symptoms. Reassured. No change to treatment at this stage." .

res:Lab_162 a med:LabOrder ;
    med:analyte "Haemoglobin" ; med:forPatient res:Pat_MAL191 ;
    med:date "2025-09-08"^^xsd:date ; med:orderedBy res:Doc_Karthik ;
    med:testsFor res:Anemia ;
    med:orderStatus "Resulted" ;
    med:hasResult res:Res_162 .

res:Res_162 a med:LabResult ;
    med:analyte "Haemoglobin" ; med:value 7.1 ; med:unit "g/dL" ;
    med:refLow 12 ; med:refHigh 15.5 ; med:outOfRange true ;
    med:date "2025-09-09"^^xsd:date ;
    med:performedBy res:Tech_Mohan .

res:Enc_357 med:orderedTest res:Lab_162 .

res:Inv_279 a med:Invoice ;
    med:forPatient res:Pat_MAL191 ; med:date "2025-09-08"^^xsd:date ;
    med:amount 14884 ; med:paid true ;
    med:status "Settled" .
res:Inv_279 med:coveredBy res:Policy_MAL191 .
res:Pat_MAL191 med:hasInvoice res:Inv_279 .

res:Enc_358 a med:FollowUp ;
    med:encounterOf res:Pat_MAL191 ; med:date "2026-08-13"^^xsd:date ;
    med:time "15:30" ;
    med:attendedBy res:Doc_Leela ; med:inDepartment res:Dept_Psychiatry ;
    med:reason "Review of depression" ;
    med:outcome "Referred for tests" ;
    med:recordedCondition res:Cond_253 ;
    med:hasVitals res:Vit_358 ; med:hasNote res:Note_358 .

res:Vit_358 a med:VitalSigns ;
    med:systolic 118 ; med:diastolic 80 ;
    med:heartRate 86 ; med:temperature 98.1 ;
    med:spo2 96 ;
    med:weightKg 96.5 ;
    med:bmi 34.8 .

res:Note_358 a med:ClinicalNote ;
    med:authorName "Dr. Leela" ;
    med:date "2026-08-13"^^xsd:date ;
    med:noteText "Seen for worsening symptoms over the past week. Referral raised to the relevant specialty." .

res:Rx_269 a med:Prescription ;
    med:prescribes res:Med_Sertraline ; med:prescribedBy res:Doc_Leela ;
    med:forPatient res:Pat_MAL191 ; med:date "2026-08-13"^^xsd:date ;
    med:dosage "1 dose" ;
    med:frequency "Twice daily" ;
    med:durationDays 90 ;
    med:dispensed true ;
    med:status "Active" .

res:Enc_358 med:issuedPrescription res:Rx_269 .
res:Pat_MAL191 med:hasPrescription res:Rx_269 .

res:Policy_MAL191 a med:InsurancePolicy ;
    med:policyNumber "NE-892838" ;
    med:issuedBy res:Ins_NewIndia ; med:coveragePercent 90 ;
    med:amount 750000 .
res:Pat_MAL191 med:hasPolicy res:Policy_MAL191 .

res:Appt_58 a med:Appointment ;
    med:forPatient res:Pat_MAL191 ; med:appointmentWith res:Doc_Nithya ;
    med:date "2026-09-06"^^xsd:date ;
    med:time "12:00" ;
    med:inDepartment res:Dept_Endocrinology ;
    med:status "Scheduled" .
res:Pat_MAL191 med:hasAppointment res:Appt_58 .

res:Pat_SAT192 a med:OutPatient ;
    med:name "Sathish Thomas" ; med:mrn "MRN-SAT192" ; med:photoInitials "ST" ;
    med:sex "Male" ; med:dateOfBirth "1962-03-27"^^xsd:date ; med:age 64 ;
    med:bloodGroup "O-" ; med:phone "+91 96317 754635" ; med:email "sathish.thomas@example.in" ;
    med:address "58 Bharathi Street, Chromepet, Chennai" ;
    med:primaryPhysician res:Doc_Joseph ;
    med:hasCondition res:Cond_255 .

res:Cond_255 a med:Condition ;
    med:ofDisease res:Dengue ; med:onsetDate "2025-04-09"^^xsd:date ;
    med:severity "Moderate" ;
    med:clinicalStatus "Resolved" ;
    med:resolvedDate "2025-07-17"^^xsd:date ;
    med:diagnosedBy res:Doc_Karthik .

res:Pat_SAT192 med:hasEncounter res:Enc_359 , res:Enc_360 , res:Enc_361 .

res:Enc_359 a med:EmergencyVisit ;
    med:encounterOf res:Pat_SAT192 ; med:date "2023-12-13"^^xsd:date ;
    med:time "17:45" ;
    med:attendedBy res:Doc_Karthik ; med:inDepartment res:Dept_Emergency ;
    med:reason "Acute presentation" ;
    med:outcome "Treatment continued" ;
    med:recordedCondition res:Cond_255 ;
    med:hasVitals res:Vit_359 ; med:hasNote res:Note_359 .

res:Vit_359 a med:VitalSigns ;
    med:systolic 114 ; med:diastolic 77 ;
    med:heartRate 81 ; med:temperature 97.8 ;
    med:spo2 99 ;
    med:weightKg 69.3 ;
    med:bmi 25.3 .

res:Note_359 a med:ClinicalNote ;
    med:authorName "Dr. Karthik" ;
    med:date "2023-12-13"^^xsd:date ;
    med:noteText "Routine review, no new complaints. Advised on diet, salt restriction and daily walking." .

res:Rx_270 a med:Prescription ;
    med:prescribes res:Med_Paracetamol ; med:prescribedBy res:Doc_Karthik ;
    med:forPatient res:Pat_SAT192 ; med:date "2023-12-13"^^xsd:date ;
    med:dosage "1 tablet" ;
    med:frequency "Once daily" ;
    med:durationDays 14 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_359 med:issuedPrescription res:Rx_270 .
res:Pat_SAT192 med:hasPrescription res:Rx_270 .

res:Lab_163 a med:LabOrder ;
    med:analyte "Platelet count" ; med:forPatient res:Pat_SAT192 ;
    med:date "2023-12-13"^^xsd:date ; med:orderedBy res:Doc_Karthik ;
    med:testsFor res:Dengue ;
    med:orderStatus "Resulted" ;
    med:hasResult res:Res_163 .

res:Res_163 a med:LabResult ;
    med:analyte "Platelet count" ; med:value 145.6 ; med:unit "x10^3/uL" ;
    med:refLow 150 ; med:refHigh 450 ; med:outOfRange true ;
    med:date "2023-12-14"^^xsd:date ;
    med:performedBy res:Tech_Mohan .

res:Enc_359 med:orderedTest res:Lab_163 .

res:Inv_280 a med:Invoice ;
    med:forPatient res:Pat_SAT192 ; med:date "2023-12-13"^^xsd:date ;
    med:amount 22151 ; med:paid true ;
    med:status "Settled" .
res:Inv_280 med:coveredBy res:Policy_SAT192 .
res:Pat_SAT192 med:hasInvoice res:Inv_280 .

res:Enc_360 a med:Consultation ;
    med:encounterOf res:Pat_SAT192 ; med:date "2025-05-04"^^xsd:date ;
    med:time "11:00" ;
    med:attendedBy res:Doc_Karthik ; med:inDepartment res:Dept_GeneralMedicine ;
    med:reason "Review of dengue" ;
    med:outcome "Treatment continued" ;
    med:recordedCondition res:Cond_255 ;
    med:hasVitals res:Vit_360 ; med:hasNote res:Note_360 .

res:Vit_360 a med:VitalSigns ;
    med:systolic 122 ; med:diastolic 77 ;
    med:heartRate 85 ; med:temperature 98.3 ;
    med:spo2 100 ;
    med:weightKg 69.8 ;
    med:bmi 22.3 .

res:Note_360 a med:ClinicalNote ;
    med:authorName "Dr. Karthik" ;
    med:date "2025-05-04"^^xsd:date ;
    med:noteText "Reviewed in clinic today. Continue current therapy, review in three months." .

res:Rx_271 a med:Prescription ;
    med:prescribes res:Med_Paracetamol ; med:prescribedBy res:Doc_Karthik ;
    med:forPatient res:Pat_SAT192 ; med:date "2025-05-04"^^xsd:date ;
    med:dosage "1 tablet" ;
    med:frequency "Three times daily" ;
    med:durationDays 14 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_360 med:issuedPrescription res:Rx_271 .
res:Pat_SAT192 med:hasPrescription res:Rx_271 .

res:Lab_164 a med:LabOrder ;
    med:analyte "Platelet count" ; med:forPatient res:Pat_SAT192 ;
    med:date "2025-05-04"^^xsd:date ; med:orderedBy res:Doc_Karthik ;
    med:testsFor res:Dengue ;
    med:orderStatus "Resulted" ;
    med:hasResult res:Res_164 .

res:Res_164 a med:LabResult ;
    med:analyte "Platelet count" ; med:value 165.15 ; med:unit "x10^3/uL" ;
    med:refLow 150 ; med:refHigh 450 ; med:outOfRange false ;
    med:date "2025-05-05"^^xsd:date ;
    med:performedBy res:Tech_Mohan .

res:Enc_360 med:orderedTest res:Lab_164 .

res:Inv_281 a med:Invoice ;
    med:forPatient res:Pat_SAT192 ; med:date "2025-05-04"^^xsd:date ;
    med:amount 2549 ; med:paid true ;
    med:status "Settled" .
res:Inv_281 med:coveredBy res:Policy_SAT192 .
res:Pat_SAT192 med:hasInvoice res:Inv_281 .

res:Enc_361 a med:EmergencyVisit ;
    med:encounterOf res:Pat_SAT192 ; med:date "2026-08-30"^^xsd:date ;
    med:time "12:00" ;
    med:attendedBy res:Doc_Karthik ; med:inDepartment res:Dept_Emergency ;
    med:reason "Acute presentation" ;
    med:outcome "Referred for tests" ;
    med:recordedCondition res:Cond_255 ;
    med:hasVitals res:Vit_361 ; med:hasNote res:Note_361 .

res:Vit_361 a med:VitalSigns ;
    med:systolic 134 ; med:diastolic 83 ;
    med:heartRate 77 ; med:temperature 99.5 ;
    med:spo2 98 ;
    med:weightKg 72.5 ;
    med:bmi 22.4 .

res:Note_361 a med:ClinicalNote ;
    med:authorName "Dr. Karthik" ;
    med:date "2026-08-30"^^xsd:date ;
    med:noteText "Attends for scheduled follow up. Investigations ordered, will call with results." .

res:Rx_272 a med:Prescription ;
    med:prescribes res:Med_Paracetamol ; med:prescribedBy res:Doc_Karthik ;
    med:forPatient res:Pat_SAT192 ; med:date "2026-08-30"^^xsd:date ;
    med:dosage "1 tablet" ;
    med:frequency "As required" ;
    med:durationDays 5 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_361 med:issuedPrescription res:Rx_272 .
res:Pat_SAT192 med:hasPrescription res:Rx_272 .

res:Policy_SAT192 a med:InsurancePolicy ;
    med:policyNumber "ST-760102" ;
    med:issuedBy res:Ins_StarHealth ; med:coveragePercent 70 ;
    med:amount 750000 .
res:Pat_SAT192 med:hasPolicy res:Policy_SAT192 .

res:Appt_59 a med:Appointment ;
    med:forPatient res:Pat_SAT192 ; med:appointmentWith res:Doc_Karthik ;
    med:date "2026-10-04"^^xsd:date ;
    med:time "17:20" ;
    med:inDepartment res:Dept_GeneralMedicine ;
    med:status "Scheduled" .
res:Pat_SAT192 med:hasAppointment res:Appt_59 .

res:Pat_RAJ193 a med:OutPatient ;
    med:name "Rajesh Das" ; med:mrn "MRN-RAJ193" ; med:photoInitials "RD" ;
    med:sex "Male" ; med:dateOfBirth "1962-07-26"^^xsd:date ; med:age 64 ;
    med:bloodGroup "B+" ; med:phone "+91 94522 631656" ; med:email "rajesh.das@example.in" ;
    med:address "67 Kamarajar Street, Tambaram, Chennai" ;
    med:primaryPhysician res:Doc_Anand ;
    med:allergicTo res:Allergen_Iodine , res:Allergen_Latex ;
    med:hasCondition res:Cond_256 , res:Cond_257 , res:Cond_258 .

res:Cond_256 a med:Condition ;
    med:ofDisease res:BreastCancer ; med:onsetDate "2026-03-20"^^xsd:date ;
    med:severity "Mild" ;
    med:clinicalStatus "Resolved" ;
    med:resolvedDate "2026-06-16"^^xsd:date ;
    med:diagnosedBy res:Doc_Anand .

res:Cond_257 a med:Condition ;
    med:ofDisease res:Depression ; med:onsetDate "2025-08-20"^^xsd:date ;
    med:severity "Mild" ;
    med:clinicalStatus "Active" ;
    med:diagnosedBy res:Doc_Leela .

res:Cond_258 a med:Condition ;
    med:ofDisease res:Hypothyroidism ; med:onsetDate "2017-12-14"^^xsd:date ;
    med:severity "Mild" ;
    med:clinicalStatus "Active" ;
    med:diagnosedBy res:Doc_Nithya .

res:Pat_RAJ193 med:hasEncounter res:Enc_362 , res:Enc_363 , res:Enc_364 , res:Enc_365 , res:Enc_366 , res:Enc_367 .

res:Enc_362 a med:Consultation ;
    med:encounterOf res:Pat_RAJ193 ; med:date "2023-03-25"^^xsd:date ;
    med:time "16:30" ;
    med:attendedBy res:Doc_Anand ; med:inDepartment res:Dept_Oncology ;
    med:reason "First presentation" ;
    med:outcome "Follow up scheduled" ;
    med:recordedCondition res:Cond_256 ;
    med:hasVitals res:Vit_362 ; med:hasNote res:Note_362 .

res:Vit_362 a med:VitalSigns ;
    med:systolic 109 ; med:diastolic 66 ;
    med:heartRate 102 ; med:temperature 99.9 ;
    med:spo2 98 ;
    med:weightKg 56.1 ;
    med:bmi 22.9 .

res:Note_362 a med:ClinicalNote ;
    med:authorName "Dr. Anand" ;
    med:date "2023-03-25"^^xsd:date ;
    med:noteText "Post discharge review. Counselled on medication adherence. Red flag symptoms explained." .

res:Lab_165 a med:LabOrder ;
    med:analyte "CA 15-3" ; med:forPatient res:Pat_RAJ193 ;
    med:date "2023-03-25"^^xsd:date ; med:orderedBy res:Doc_Anand ;
    med:testsFor res:BreastCancer ;
    med:orderStatus "Resulted" ;
    med:hasResult res:Res_165 .

res:Res_165 a med:LabResult ;
    med:analyte "CA 15-3" ; med:value 71.09 ; med:unit "U/mL" ;
    med:refLow 0 ; med:refHigh 30 ; med:outOfRange true ;
    med:date "2023-03-26"^^xsd:date ;
    med:performedBy res:Tech_Mohan .

res:Enc_362 med:orderedTest res:Lab_165 .

res:Inv_282 a med:Invoice ;
    med:forPatient res:Pat_RAJ193 ; med:date "2023-03-25"^^xsd:date ;
    med:amount 1449 ; med:paid false ;
    med:status "Insurance claim pending" .
res:Inv_282 med:coveredBy res:Policy_RAJ193 .
res:Pat_RAJ193 med:hasInvoice res:Inv_282 .

res:Enc_363 a med:Consultation ;
    med:encounterOf res:Pat_RAJ193 ; med:date "2023-12-18"^^xsd:date ;
    med:time "10:45" ;
    med:attendedBy res:Doc_Anand ; med:inDepartment res:Dept_Oncology ;
    med:reason "Review of breast cancer" ;
    med:outcome "Referred for tests" ;
    med:recordedCondition res:Cond_256 ;
    med:hasVitals res:Vit_363 ; med:hasNote res:Note_363 .

res:Vit_363 a med:VitalSigns ;
    med:systolic 120 ; med:diastolic 79 ;
    med:heartRate 76 ; med:temperature 99.1 ;
    med:spo2 100 ;
    med:weightKg 57.5 ;
    med:bmi 20.3 .

res:Note_363 a med:ClinicalNote ;
    med:authorName "Dr. Anand" ;
    med:date "2023-12-18"^^xsd:date ;
    med:noteText "Post discharge review. Reassured. No change to treatment at this stage." .

res:Inv_283 a med:Invoice ;
    med:forPatient res:Pat_RAJ193 ; med:date "2023-12-18"^^xsd:date ;
    med:amount 2369 ; med:paid true ;
    med:status "Settled" .
res:Inv_283 med:coveredBy res:Policy_RAJ193 .
res:Pat_RAJ193 med:hasInvoice res:Inv_283 .

res:Enc_364 a med:Screening ;
    med:encounterOf res:Pat_RAJ193 ; med:date "2024-08-01"^^xsd:date ;
    med:time "10:45" ;
    med:attendedBy res:Doc_Anand ; med:inDepartment res:Dept_Oncology ;
    med:reason "Review of breast cancer" ;
    med:outcome "Treatment continued" ;
    med:recordedCondition res:Cond_256 ;
    med:hasVitals res:Vit_364 ; med:hasNote res:Note_364 .

res:Vit_364 a med:VitalSigns ;
    med:systolic 119 ; med:diastolic 75 ;
    med:heartRate 77 ; med:temperature 99.1 ;
    med:spo2 99 ;
    med:weightKg 73.2 ;
    med:bmi 27.1 .

res:Note_364 a med:ClinicalNote ;
    med:authorName "Dr. Anand" ;
    med:date "2024-08-01"^^xsd:date ;
    med:noteText "Presents with a two day history of symptoms. Continue current therapy, review in three months." .

res:Lab_166 a med:LabOrder ;
    med:analyte "CA 15-3" ; med:forPatient res:Pat_RAJ193 ;
    med:date "2024-08-01"^^xsd:date ; med:orderedBy res:Doc_Anand ;
    med:testsFor res:BreastCancer ;
    med:orderStatus "Resulted" ;
    med:hasResult res:Res_166 .

res:Res_166 a med:LabResult ;
    med:analyte "CA 15-3" ; med:value 44.73 ; med:unit "U/mL" ;
    med:refLow 0 ; med:refHigh 30 ; med:outOfRange true ;
    med:date "2024-08-02"^^xsd:date ;
    med:performedBy res:Tech_Mohan .

res:Enc_364 med:orderedTest res:Lab_166 .

res:Inv_284 a med:Invoice ;
    med:forPatient res:Pat_RAJ193 ; med:date "2024-08-01"^^xsd:date ;
    med:amount 2356 ; med:paid true ;
    med:status "Settled" .
res:Inv_284 med:coveredBy res:Policy_RAJ193 .
res:Pat_RAJ193 med:hasInvoice res:Inv_284 .

res:Enc_365 a med:Consultation ;
    med:encounterOf res:Pat_RAJ193 ; med:date "2025-04-24"^^xsd:date ;
    med:time "16:00" ;
    med:attendedBy res:Doc_Anand ; med:inDepartment res:Dept_Oncology ;
    med:reason "Review of breast cancer" ;
    med:outcome "Treatment continued" ;
    med:recordedCondition res:Cond_256 ;
    med:hasVitals res:Vit_365 ; med:hasNote res:Note_365 .

res:Vit_365 a med:VitalSigns ;
    med:systolic 125 ; med:diastolic 67 ;
    med:heartRate 75 ; med:temperature 98.7 ;
    med:spo2 96 ;
    med:weightKg 62.8 ;
    med:bmi 25.7 .

res:Note_365 a med:ClinicalNote ;
    med:authorName "Dr. Anand" ;
    med:date "2025-04-24"^^xsd:date ;
    med:noteText "Presents with a two day history of symptoms. Reassured. No change to treatment at this stage." .

res:Rx_273 a med:Prescription ;
    med:prescribes res:Med_Tamoxifen ; med:prescribedBy res:Doc_Anand ;
    med:forPatient res:Pat_RAJ193 ; med:date "2025-04-24"^^xsd:date ;
    med:dosage "1 tablet" ;
    med:frequency "Once daily at night" ;
    med:durationDays 7 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_365 med:issuedPrescription res:Rx_273 .
res:Pat_RAJ193 med:hasPrescription res:Rx_273 .

res:Lab_167 a med:LabOrder ;
    med:analyte "CA 15-3" ; med:forPatient res:Pat_RAJ193 ;
    med:date "2025-04-24"^^xsd:date ; med:orderedBy res:Doc_Anand ;
    med:testsFor res:BreastCancer ;
    med:orderStatus "Resulted" ;
    med:hasResult res:Res_167 .

res:Res_167 a med:LabResult ;
    med:analyte "CA 15-3" ; med:value 55.92 ; med:unit "U/mL" ;
    med:refLow 0 ; med:refHigh 30 ; med:outOfRange true ;
    med:date "2025-04-25"^^xsd:date ;
    med:performedBy res:Tech_Mohan .

res:Enc_365 med:orderedTest res:Lab_167 .

res:Inv_285 a med:Invoice ;
    med:forPatient res:Pat_RAJ193 ; med:date "2025-04-24"^^xsd:date ;
    med:amount 1003 ; med:paid true ;
    med:status "Settled" .
res:Inv_285 med:coveredBy res:Policy_RAJ193 .
res:Pat_RAJ193 med:hasInvoice res:Inv_285 .

res:Enc_366 a med:FollowUp ;
    med:encounterOf res:Pat_RAJ193 ; med:date "2025-12-09"^^xsd:date ;
    med:time "08:45" ;
    med:attendedBy res:Doc_Anand ; med:inDepartment res:Dept_Oncology ;
    med:reason "Review of breast cancer" ;
    med:outcome "Follow up scheduled" ;
    med:recordedCondition res:Cond_256 ;
    med:hasVitals res:Vit_366 ; med:hasNote res:Note_366 .

res:Vit_366 a med:VitalSigns ;
    med:systolic 109 ; med:diastolic 79 ;
    med:heartRate 104 ; med:temperature 99.3 ;
    med:spo2 96 ;
    med:weightKg 69.1 ;
    med:bmi 26.2 .

res:Note_366 a med:ClinicalNote ;
    med:authorName "Dr. Anand" ;
    med:date "2025-12-09"^^xsd:date ;
    med:noteText "Referred from general medicine for specialist opinion. Continue current therapy, review in three months." .

res:Rx_274 a med:Prescription ;
    med:prescribes res:Med_Tamoxifen ; med:prescribedBy res:Doc_Anand ;
    med:forPatient res:Pat_RAJ193 ; med:date "2025-12-09"^^xsd:date ;
    med:dosage "1 tablet" ;
    med:frequency "Once daily at night" ;
    med:durationDays 5 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_366 med:issuedPrescription res:Rx_274 .
res:Pat_RAJ193 med:hasPrescription res:Rx_274 .

res:Lab_168 a med:LabOrder ;
    med:analyte "CA 15-3" ; med:forPatient res:Pat_RAJ193 ;
    med:date "2025-12-09"^^xsd:date ; med:orderedBy res:Doc_Anand ;
    med:testsFor res:BreastCancer ;
    med:orderStatus "Resulted" ;
    med:hasResult res:Res_168 .

res:Res_168 a med:LabResult ;
    med:analyte "CA 15-3" ; med:value 31.15 ; med:unit "U/mL" ;
    med:refLow 0 ; med:refHigh 30 ; med:outOfRange true ;
    med:date "2025-12-10"^^xsd:date ;
    med:performedBy res:Tech_Mohan .

res:Enc_366 med:orderedTest res:Lab_168 .

res:Inv_286 a med:Invoice ;
    med:forPatient res:Pat_RAJ193 ; med:date "2025-12-09"^^xsd:date ;
    med:amount 1769 ; med:paid true ;
    med:status "Settled" .
res:Inv_286 med:coveredBy res:Policy_RAJ193 .
res:Pat_RAJ193 med:hasInvoice res:Inv_286 .

res:Enc_367 a med:EmergencyVisit ;
    med:encounterOf res:Pat_RAJ193 ; med:date "2026-08-24"^^xsd:date ;
    med:time "13:00" ;
    med:attendedBy res:Doc_Karthik ; med:inDepartment res:Dept_Emergency ;
    med:reason "Acute presentation" ;
    med:outcome "Treatment continued" ;
    med:recordedCondition res:Cond_257 ;
    med:hasVitals res:Vit_367 ; med:hasNote res:Note_367 .

res:Vit_367 a med:VitalSigns ;
    med:systolic 111 ; med:diastolic 74 ;
    med:heartRate 97 ; med:temperature 97.7 ;
    med:spo2 98 ;
    med:weightKg 56.4 ;
    med:bmi 27.0 .

res:Note_367 a med:ClinicalNote ;
    med:authorName "Dr. Karthik" ;
    med:date "2026-08-24"^^xsd:date ;
    med:noteText "Referred from general medicine for specialist opinion. Reassured. No change to treatment at this stage." .

res:Rx_275 a med:Prescription ;
    med:prescribes res:Med_Sertraline ; med:prescribedBy res:Doc_Karthik ;
    med:forPatient res:Pat_RAJ193 ; med:date "2026-08-24"^^xsd:date ;
    med:dosage "1 tablet" ;
    med:frequency "Three times daily" ;
    med:durationDays 90 ;
    med:dispensed false ;
    med:status "Active" .

res:Enc_367 med:issuedPrescription res:Rx_275 .
res:Pat_RAJ193 med:hasPrescription res:Rx_275 .

res:Policy_RAJ193 a med:InsurancePolicy ;
    med:policyNumber "HD-977369" ;
    med:issuedBy res:Ins_HDFCErgo ; med:coveragePercent 90 ;
    med:amount 500000 .
res:Pat_RAJ193 med:hasPolicy res:Policy_RAJ193 .

res:Appt_60 a med:Appointment ;
    med:forPatient res:Pat_RAJ193 ; med:appointmentWith res:Doc_Anand ;
    med:date "2026-10-09"^^xsd:date ;
    med:time "14:40" ;
    med:inDepartment res:Dept_Oncology ;
    med:status "Scheduled" .
res:Pat_RAJ193 med:hasAppointment res:Appt_60 .

res:Pat_DIN194 a med:OutPatient ;
    med:name "Dinesh Narayanan" ; med:mrn "MRN-DIN194" ; med:photoInitials "DN" ;
    med:sex "Male" ; med:dateOfBirth "1951-10-02"^^xsd:date ; med:age 74 ;
    med:bloodGroup "B-" ; med:phone "+91 94989 287845" ; med:email "dinesh.narayanan@example.in" ;
    med:address "82 GST Road, Medavakkam, Chennai" ;
    med:primaryPhysician res:Doc_Ramesh ;
    med:allergicTo res:Allergen_Iodine ;
    med:hasCondition res:Cond_259 , res:Cond_260 , res:Cond_261 , res:Cond_262 , res:Cond_263 , res:Cond_264 .

res:Cond_259 a med:Condition ;
    med:ofDisease res:CoronaryArteryDisease ; med:onsetDate "2018-10-14"^^xsd:date ;
    med:severity "Moderate" ;
    med:clinicalStatus "Active" ;
    med:diagnosedBy res:Doc_Farida .

res:Cond_260 a med:Condition ;
    med:ofDisease res:Hypertension ; med:onsetDate "2022-07-11"^^xsd:date ;
    med:severity "Moderate" ;
    med:clinicalStatus "Active" ;
    med:diagnosedBy res:Doc_Joseph .

res:Cond_261 a med:Condition ;
    med:ofDisease res:Dyslipidemia ; med:onsetDate "2019-04-21"^^xsd:date ;
    med:severity "Moderate" ;
    med:clinicalStatus "Active" ;
    med:diagnosedBy res:Doc_Joseph .

res:Cond_262 a med:Condition , med:CriticalCondition ;
    med:ofDisease res:MyocardialInfarction ; med:onsetDate "2024-11-13"^^xsd:date ;
    med:severity "Severe" ;
    med:clinicalStatus "Active" ;
    med:diagnosedBy res:Doc_Ramesh .

res:Cond_263 a med:Condition ;
    med:ofDisease res:HeartFailure ; med:onsetDate "2017-07-17"^^xsd:date ;
    med:severity "Moderate" ;
    med:clinicalStatus "Active" ;
    med:diagnosedBy res:Doc_Farida .

res:Cond_264 a med:Condition ;
    med:ofDisease res:AtrialFibrillation ; med:onsetDate "2017-02-24"^^xsd:date ;
    med:severity "Mild" ;
    med:clinicalStatus "Active" ;
    med:diagnosedBy res:Doc_Farida .

res:Pat_DIN194 med:hasEncounter res:Enc_368 , res:Enc_369 , res:Enc_370 , res:Enc_371 , res:Enc_372 , res:Enc_373 , res:Enc_374 , res:Enc_375 , res:Enc_376 .

res:Enc_368 a med:Consultation ;
    med:encounterOf res:Pat_DIN194 ; med:date "2023-01-29"^^xsd:date ;
    med:time "14:45" ;
    med:attendedBy res:Doc_Farida ; med:inDepartment res:Dept_Cardiology ;
    med:reason "First presentation" ;
    med:outcome "Follow up scheduled" ;
    med:recordedCondition res:Cond_264 ;
    med:hasVitals res:Vit_368 ; med:hasNote res:Note_368 .

res:Vit_368 a med:VitalSigns ;
    med:systolic 139 ; med:diastolic 104 ;
    med:heartRate 93 ; med:temperature 99.1 ;
    med:spo2 96 ;
    med:weightKg 60.7 ;
    med:bmi 20.4 .

res:Note_368 a med:ClinicalNote ;
    med:authorName "Dr. Farida" ;
    med:date "2023-01-29"^^xsd:date ;
    med:noteText "Patient reports steady improvement since last visit. Counselled on medication adherence. Red flag symptoms explained." .

res:Lab_169 a med:LabOrder ;
    med:analyte "INR" ; med:forPatient res:Pat_DIN194 ;
    med:date "2023-01-29"^^xsd:date ; med:orderedBy res:Doc_Farida ;
    med:testsFor res:AtrialFibrillation ;
    med:orderStatus "Resulted" ;
    med:hasResult res:Res_169 .

res:Res_169 a med:LabResult ;
    med:analyte "INR" ; med:value 1.83 ; med:unit "ratio" ;
    med:refLow 0.9 ; med:refHigh 1.2 ; med:outOfRange true ;
    med:date "2023-01-30"^^xsd:date ;
    med:performedBy res:Tech_Mohan .

res:Enc_368 med:orderedTest res:Lab_169 .

res:Enc_369 a med:FollowUp ;
    med:encounterOf res:Pat_DIN194 ; med:date "2023-06-29"^^xsd:date ;
    med:time "16:45" ;
    med:attendedBy res:Doc_Farida ; med:inDepartment res:Dept_Cardiology ;
    med:reason "Review of coronary artery disease" ;
    med:outcome "Treatment continued" ;
    med:recordedCondition res:Cond_259 ;
    med:hasVitals res:Vit_369 ; med:hasNote res:Note_369 .

res:Vit_369 a med:VitalSigns ;
    med:systolic 146 ; med:diastolic 95 ;
    med:heartRate 69 ; med:temperature 99.8 ;
    med:spo2 99 ;
    med:weightKg 57.9 ;
    med:bmi 24.5 .

res:Note_369 a med:ClinicalNote ;
    med:authorName "Dr. Farida" ;
    med:date "2023-06-29"^^xsd:date ;
    med:noteText "Seen for worsening symptoms over the past week. Referral raised to the relevant specialty." .

res:Lab_170 a med:LabOrder ;
    med:analyte "Troponin I" ; med:forPatient res:Pat_DIN194 ;
    med:date "2023-06-29"^^xsd:date ; med:orderedBy res:Doc_Farida ;
    med:testsFor res:CoronaryArteryDisease ;
    med:orderStatus "Resulted" ;
    med:hasResult res:Res_170 .

res:Res_170 a med:LabResult ;
    med:analyte "Troponin I" ; med:value 3.88 ; med:unit "ng/mL" ;
    med:refLow 0 ; med:refHigh 0.04 ; med:outOfRange true ;
    med:date "2023-06-30"^^xsd:date ;
    med:performedBy res:Tech_Mohan .

res:Enc_369 med:orderedTest res:Lab_170 .

res:Enc_370 a med:FollowUp ;
    med:encounterOf res:Pat_DIN194 ; med:date "2023-12-17"^^xsd:date ;
    med:time "10:45" ;
    med:attendedBy res:Doc_Suresh ; med:inDepartment res:Dept_GeneralMedicine ;
    med:reason "Review of dyslipidemia" ;
    med:outcome "Follow up scheduled" ;
    med:recordedCondition res:Cond_261 ;
    med:hasVitals res:Vit_370 ; med:hasNote res:Note_370 .

res:Vit_370 a med:VitalSigns ;
    med:systolic 158 ; med:diastolic 99 ;
    med:heartRate 93 ; med:temperature 97.9 ;
    med:spo2 99 ;
    med:weightKg 75.7 ;
    med:bmi 26.4 .

res:Note_370 a med:ClinicalNote ;
    med:authorName "Dr. Suresh" ;
    med:date "2023-12-17"^^xsd:date ;
    med:noteText "Attends for scheduled follow up. Advised on diet, salt restriction and daily walking." .

res:Rx_276 a med:Prescription ;
    med:prescribes res:Med_Atorvastatin ; med:prescribedBy res:Doc_Suresh ;
    med:forPatient res:Pat_DIN194 ; med:date "2023-12-17"^^xsd:date ;
    med:dosage "1 dose" ;
    med:frequency "Once daily" ;
    med:durationDays 60 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_370 med:issuedPrescription res:Rx_276 .
res:Pat_DIN194 med:hasPrescription res:Rx_276 .

res:Lab_171 a med:LabOrder ;
    med:analyte "LDL cholesterol" ; med:forPatient res:Pat_DIN194 ;
    med:date "2023-12-17"^^xsd:date ; med:orderedBy res:Doc_Suresh ;
    med:testsFor res:Dyslipidemia ;
    med:orderStatus "Resulted" ;
    med:hasResult res:Res_171 .

res:Res_171 a med:LabResult ;
    med:analyte "LDL cholesterol" ; med:value 143.43 ; med:unit "mg/dL" ;
    med:refLow 0 ; med:refHigh 100 ; med:outOfRange true ;
    med:date "2023-12-18"^^xsd:date ;
    med:performedBy res:Tech_Mohan .

res:Lab_172 a med:LabOrder ;
    med:analyte "Triglycerides" ; med:forPatient res:Pat_DIN194 ;
    med:date "2023-12-17"^^xsd:date ; med:orderedBy res:Doc_Suresh ;
    med:testsFor res:Dyslipidemia ;
    med:orderStatus "Resulted" ;
    med:hasResult res:Res_172 .

res:Res_172 a med:LabResult ;
    med:analyte "Triglycerides" ; med:value 153.03 ; med:unit "mg/dL" ;
    med:refLow 0 ; med:refHigh 150 ; med:outOfRange true ;
    med:date "2023-12-18"^^xsd:date ;
    med:performedBy res:Tech_Mohan .

res:Enc_370 med:orderedTest res:Lab_171 , res:Lab_172 .

res:Inv_287 a med:Invoice ;
    med:forPatient res:Pat_DIN194 ; med:date "2023-12-17"^^xsd:date ;
    med:amount 5988 ; med:paid true ;
    med:status "Settled" .
res:Inv_287 med:coveredBy res:Policy_DIN194 .
res:Pat_DIN194 med:hasInvoice res:Inv_287 .

res:Enc_371 a med:EmergencyVisit ;
    med:encounterOf res:Pat_DIN194 ; med:date "2024-05-18"^^xsd:date ;
    med:time "17:15" ;
    med:attendedBy res:Doc_Karthik ; med:inDepartment res:Dept_Emergency ;
    med:reason "Acute presentation" ;
    med:outcome "Discharged with advice" ;
    med:recordedCondition res:Cond_264 ;
    med:hasVitals res:Vit_371 ; med:hasNote res:Note_371 .

res:Vit_371 a med:VitalSigns ;
    med:systolic 138 ; med:diastolic 102 ;
    med:heartRate 85 ; med:temperature 98.5 ;
    med:spo2 99 ;
    med:weightKg 75.1 ;
    med:bmi 27.3 .

res:Note_371 a med:ClinicalNote ;
    med:authorName "Dr. Karthik" ;
    med:date "2024-05-18"^^xsd:date ;
    med:noteText "Referred from general medicine for specialist opinion. Dose adjusted, repeat bloods before next visit." .

res:Rx_277 a med:Prescription ;
    med:prescribes res:Med_Warfarin ; med:prescribedBy res:Doc_Karthik ;
    med:forPatient res:Pat_DIN194 ; med:date "2024-05-18"^^xsd:date ;
    med:dosage "1 tablet" ;
    med:frequency "Once daily at night" ;
    med:durationDays 30 ;
    med:dispensed true ;
    med:status "Completed" .

res:Rx_278 a med:Prescription ;
    med:prescribes res:Med_Metoprolol ; med:prescribedBy res:Doc_Karthik ;
    med:forPatient res:Pat_DIN194 ; med:date "2024-05-18"^^xsd:date ;
    med:dosage "1 tablet" ;
    med:frequency "As required" ;
    med:durationDays 90 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_371 med:issuedPrescription res:Rx_277 , res:Rx_278 .
res:Pat_DIN194 med:hasPrescription res:Rx_277 , res:Rx_278 .

res:Lab_173 a med:LabOrder ;
    med:analyte "INR" ; med:forPatient res:Pat_DIN194 ;
    med:date "2024-05-18"^^xsd:date ; med:orderedBy res:Doc_Karthik ;
    med:testsFor res:AtrialFibrillation ;
    med:orderStatus "Resulted" ;
    med:hasResult res:Res_173 .

res:Res_173 a med:LabResult ;
    med:analyte "INR" ; med:value 4.19 ; med:unit "ratio" ;
    med:refLow 0.9 ; med:refHigh 1.2 ; med:outOfRange true ;
    med:date "2024-05-19"^^xsd:date ;
    med:performedBy res:Tech_Mohan .

res:Enc_371 med:orderedTest res:Lab_173 .

res:Inv_288 a med:Invoice ;
    med:forPatient res:Pat_DIN194 ; med:date "2024-05-18"^^xsd:date ;
    med:amount 8745 ; med:paid true ;
    med:status "Settled" .
res:Inv_288 med:coveredBy res:Policy_DIN194 .
res:Pat_DIN194 med:hasInvoice res:Inv_288 .

res:Enc_372 a med:Consultation ;
    med:encounterOf res:Pat_DIN194 ; med:date "2024-11-13"^^xsd:date ;
    med:time "12:00" ;
    med:attendedBy res:Doc_Ramesh ; med:inDepartment res:Dept_GeneralMedicine ;
    med:reason "Review of hypertension" ;
    med:outcome "Treatment continued" ;
    med:recordedCondition res:Cond_260 ;
    med:hasVitals res:Vit_372 ; med:hasNote res:Note_372 .

res:Vit_372 a med:VitalSigns ;
    med:systolic 161 ; med:diastolic 99 ;
    med:heartRate 93 ; med:temperature 97.8 ;
    med:spo2 99 ;
    med:weightKg 71.8 ;
    med:bmi 24.7 .

res:Note_372 a med:ClinicalNote ;
    med:authorName "Dr. Ramesh" ;
    med:date "2024-11-13"^^xsd:date ;
    med:noteText "Routine review, no new complaints. Referral raised to the relevant specialty." .

res:Inv_289 a med:Invoice ;
    med:forPatient res:Pat_DIN194 ; med:date "2024-11-13"^^xsd:date ;
    med:amount 4000 ; med:paid true ;
    med:status "Settled" .
res:Inv_289 med:coveredBy res:Policy_DIN194 .
res:Pat_DIN194 med:hasInvoice res:Inv_289 .

res:Enc_373 a med:FollowUp ;
    med:encounterOf res:Pat_DIN194 ; med:date "2025-04-17"^^xsd:date ;
    med:time "10:00" ;
    med:attendedBy res:Doc_Ramesh ; med:inDepartment res:Dept_Cardiology ;
    med:reason "Review of myocardial infarction" ;
    med:outcome "Follow up scheduled" ;
    med:recordedCondition res:Cond_262 ;
    med:hasVitals res:Vit_373 ; med:hasNote res:Note_373 .

res:Vit_373 a med:VitalSigns ;
    med:systolic 175 ; med:diastolic 108 ;
    med:heartRate 87 ; med:temperature 98.0 ;
    med:spo2 98 ;
    med:weightKg 74.0 ;
    med:bmi 26.4 .

res:Note_373 a med:ClinicalNote ;
    med:authorName "Dr. Ramesh" ;
    med:date "2025-04-17"^^xsd:date ;
    med:noteText "Attends for scheduled follow up. Referral raised to the relevant specialty." .

res:Rx_279 a med:Prescription ;
    med:prescribes res:Med_Clopidogrel ; med:prescribedBy res:Doc_Ramesh ;
    med:forPatient res:Pat_DIN194 ; med:date "2025-04-17"^^xsd:date ;
    med:dosage "2 tablets" ;
    med:frequency "Three times daily" ;
    med:durationDays 5 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_373 med:issuedPrescription res:Rx_279 .
res:Pat_DIN194 med:hasPrescription res:Rx_279 .

res:Inv_290 a med:Invoice ;
    med:forPatient res:Pat_DIN194 ; med:date "2025-04-17"^^xsd:date ;
    med:amount 4655 ; med:paid true ;
    med:status "Settled" .
res:Inv_290 med:coveredBy res:Policy_DIN194 .
res:Pat_DIN194 med:hasInvoice res:Inv_290 .

res:Enc_374 a med:Consultation ;
    med:encounterOf res:Pat_DIN194 ; med:date "2025-10-02"^^xsd:date ;
    med:time "16:30" ;
    med:attendedBy res:Doc_Ramesh ; med:inDepartment res:Dept_Cardiology ;
    med:reason "Review of atrial fibrillation" ;
    med:outcome "Follow up scheduled" ;
    med:recordedCondition res:Cond_264 ;
    med:hasVitals res:Vit_374 ; med:hasNote res:Note_374 .

res:Vit_374 a med:VitalSigns ;
    med:systolic 146 ; med:diastolic 88 ;
    med:heartRate 102 ; med:temperature 97.5 ;
    med:spo2 99 ;
    med:weightKg 63.1 ;
    med:bmi 26.8 .

res:Note_374 a med:ClinicalNote ;
    med:authorName "Dr. Ramesh" ;
    med:date "2025-10-02"^^xsd:date ;
    med:noteText "Seen for worsening symptoms over the past week. Advised on diet, salt restriction and daily walking." .

res:Rx_280 a med:Prescription ;
    med:prescribes res:Med_Metoprolol ; med:prescribedBy res:Doc_Ramesh ;
    med:forPatient res:Pat_DIN194 ; med:date "2025-10-02"^^xsd:date ;
    med:dosage "1 tablet" ;
    med:frequency "Twice daily" ;
    med:durationDays 90 ;
    med:dispensed true ;
    med:status "Completed" .

res:Rx_281 a med:Prescription ;
    med:prescribes res:Med_Warfarin ; med:prescribedBy res:Doc_Ramesh ;
    med:forPatient res:Pat_DIN194 ; med:date "2025-10-02"^^xsd:date ;
    med:dosage "1 tablet" ;
    med:frequency "As required" ;
    med:durationDays 60 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_374 med:issuedPrescription res:Rx_280 , res:Rx_281 .
res:Pat_DIN194 med:hasPrescription res:Rx_280 , res:Rx_281 .

res:Enc_375 a med:Consultation ;
    med:encounterOf res:Pat_DIN194 ; med:date "2026-03-02"^^xsd:date ;
    med:time "17:00" ;
    med:attendedBy res:Doc_Farida ; med:inDepartment res:Dept_Cardiology ;
    med:reason "Review of atrial fibrillation" ;
    med:outcome "Follow up scheduled" ;
    med:recordedCondition res:Cond_264 ;
    med:hasVitals res:Vit_375 ; med:hasNote res:Note_375 .

res:Vit_375 a med:VitalSigns ;
    med:systolic 148 ; med:diastolic 86 ;
    med:heartRate 95 ; med:temperature 97.7 ;
    med:spo2 97 ;
    med:weightKg 61.4 ;
    med:bmi 19.9 .

res:Note_375 a med:ClinicalNote ;
    med:authorName "Dr. Farida" ;
    med:date "2026-03-02"^^xsd:date ;
    med:noteText "Reviewed in clinic today. Investigations ordered, will call with results." .

res:Rx_282 a med:Prescription ;
    med:prescribes res:Med_Warfarin ; med:prescribedBy res:Doc_Farida ;
    med:forPatient res:Pat_DIN194 ; med:date "2026-03-02"^^xsd:date ;
    med:dosage "1 tablet" ;
    med:frequency "Once daily" ;
    med:durationDays 90 ;
    med:dispensed true ;
    med:status "Active" .

res:Enc_375 med:issuedPrescription res:Rx_282 .
res:Pat_DIN194 med:hasPrescription res:Rx_282 .

res:Inv_291 a med:Invoice ;
    med:forPatient res:Pat_DIN194 ; med:date "2026-03-02"^^xsd:date ;
    med:amount 4970 ; med:paid false ;
    med:status "Insurance claim pending" .
res:Inv_291 med:coveredBy res:Policy_DIN194 .
res:Pat_DIN194 med:hasInvoice res:Inv_291 .

res:Enc_376 a med:Consultation ;
    med:encounterOf res:Pat_DIN194 ; med:date "2026-08-30"^^xsd:date ;
    med:time "16:45" ;
    med:attendedBy res:Doc_Ramesh ; med:inDepartment res:Dept_Cardiology ;
    med:reason "Review of myocardial infarction" ;
    med:outcome "Referred for tests" ;
    med:recordedCondition res:Cond_262 ;
    med:hasVitals res:Vit_376 ; med:hasNote res:Note_376 .

res:Vit_376 a med:VitalSigns ;
    med:systolic 140 ; med:diastolic 107 ;
    med:heartRate 98 ; med:temperature 98.7 ;
    med:spo2 99 ;
    med:weightKg 62.7 ;
    med:bmi 25.6 .

res:Note_376 a med:ClinicalNote ;
    med:authorName "Dr. Ramesh" ;
    med:date "2026-08-30"^^xsd:date ;
    med:noteText "Reviewed in clinic today. Dose adjusted, repeat bloods before next visit." .

res:Rx_283 a med:Prescription ;
    med:prescribes res:Med_Aspirin ; med:prescribedBy res:Doc_Ramesh ;
    med:forPatient res:Pat_DIN194 ; med:date "2026-08-30"^^xsd:date ;
    med:dosage "2 tablets" ;
    med:frequency "Three times daily" ;
    med:durationDays 5 ;
    med:dispensed false ;
    med:status "Completed" .

res:Enc_376 med:issuedPrescription res:Rx_283 .
res:Pat_DIN194 med:hasPrescription res:Rx_283 .

res:Lab_174 a med:LabOrder ;
    med:analyte "Troponin I" ; med:forPatient res:Pat_DIN194 ;
    med:date "2026-08-30"^^xsd:date ; med:orderedBy res:Doc_Ramesh ;
    med:testsFor res:MyocardialInfarction ;
    med:orderStatus "Resulted" ;
    med:hasResult res:Res_174 .

res:Res_174 a med:LabResult ;
    med:analyte "Troponin I" ; med:value 7.96 ; med:unit "ng/mL" ;
    med:refLow 0 ; med:refHigh 0.04 ; med:outOfRange true ;
    med:date "2026-08-30"^^xsd:date ;
    med:performedBy res:Tech_Mohan .

res:Enc_376 med:orderedTest res:Lab_174 .

res:Inv_292 a med:Invoice ;
    med:forPatient res:Pat_DIN194 ; med:date "2026-08-30"^^xsd:date ;
    med:amount 6036 ; med:paid false ;
    med:status "Insurance claim pending" .
res:Inv_292 med:coveredBy res:Policy_DIN194 .
res:Pat_DIN194 med:hasInvoice res:Inv_292 .

res:Policy_DIN194 a med:InsurancePolicy ;
    med:policyNumber "HD-918028" ;
    med:issuedBy res:Ins_HDFCErgo ; med:coveragePercent 80 ;
    med:amount 500000 .
res:Pat_DIN194 med:hasPolicy res:Policy_DIN194 .

res:Pat_REK195 a med:OutPatient ;
    med:name "Rekha Raghavan" ; med:mrn "MRN-REK195" ; med:photoInitials "RR" ;
    med:sex "Female" ; med:dateOfBirth "2014-12-28"^^xsd:date ; med:age 11 ;
    med:bloodGroup "O-" ; med:phone "+91 93208 370514" ; med:email "rekha.raghavan@example.in" ;
    med:address "62 Anna Salai, Kelambakkam, Chennai" ;
    med:primaryPhysician res:Doc_Joseph ;
    med:hasCondition res:Cond_265 , res:Cond_266 , res:Cond_267 .

res:Cond_265 a med:Condition ;
    med:ofDisease res:Dengue ; med:onsetDate "2025-09-09"^^xsd:date ;
    med:severity "Mild" ;
    med:clinicalStatus "Active" ;
    med:diagnosedBy res:Doc_Joseph .

res:Cond_266 a med:Condition ;
    med:ofDisease res:Anemia ; med:onsetDate "2025-06-18"^^xsd:date ;
    med:severity "Moderate" ;
    med:clinicalStatus "Resolved" ;
    med:resolvedDate "2025-11-23"^^xsd:date ;
    med:diagnosedBy res:Doc_Suresh .

res:Cond_267 a med:Condition , med:CriticalCondition ;
    med:ofDisease res:Stroke ; med:onsetDate "2025-05-22"^^xsd:date ;
    med:severity "Severe" ;
    med:clinicalStatus "Active" ;
    med:diagnosedBy res:Doc_Priya .

res:Pat_REK195 med:hasEncounter res:Enc_377 , res:Enc_378 , res:Enc_379 .

res:Enc_377 a med:Consultation ;
    med:encounterOf res:Pat_REK195 ; med:date "2023-12-07"^^xsd:date ;
    med:time "14:45" ;
    med:attendedBy res:Doc_Karthik ; med:inDepartment res:Dept_GeneralMedicine ;
    med:reason "First presentation" ;
    med:outcome "Follow up scheduled" ;
    med:recordedCondition res:Cond_265 ;
    med:hasVitals res:Vit_377 ; med:hasNote res:Note_377 .

res:Vit_377 a med:VitalSigns ;
    med:systolic 113 ; med:diastolic 66 ;
    med:heartRate 66 ; med:temperature 97.4 ;
    med:spo2 100 ;
    med:weightKg 70.1 ;
    med:bmi 24.1 .

res:Note_377 a med:ClinicalNote ;
    med:authorName "Dr. Karthik" ;
    med:date "2023-12-07"^^xsd:date ;
    med:noteText "Seen for worsening symptoms over the past week. Reassured. No change to treatment at this stage." .

res:Rx_284 a med:Prescription ;
    med:prescribes res:Med_Paracetamol ; med:prescribedBy res:Doc_Karthik ;
    med:forPatient res:Pat_REK195 ; med:date "2023-12-07"^^xsd:date ;
    med:dosage "1 dose" ;
    med:frequency "Three times daily" ;
    med:durationDays 5 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_377 med:issuedPrescription res:Rx_284 .
res:Pat_REK195 med:hasPrescription res:Rx_284 .

res:Lab_175 a med:LabOrder ;
    med:analyte "Platelet count" ; med:forPatient res:Pat_REK195 ;
    med:date "2023-12-07"^^xsd:date ; med:orderedBy res:Doc_Karthik ;
    med:testsFor res:Dengue ;
    med:orderStatus "Resulted" ;
    med:hasResult res:Res_175 .

res:Res_175 a med:LabResult ;
    med:analyte "Platelet count" ; med:value 116.55 ; med:unit "x10^3/uL" ;
    med:refLow 150 ; med:refHigh 450 ; med:outOfRange true ;
    med:date "2023-12-08"^^xsd:date ;
    med:performedBy res:Tech_Mohan .

res:Enc_377 med:orderedTest res:Lab_175 .

res:Enc_378 a med:Consultation ;
    med:encounterOf res:Pat_REK195 ; med:date "2025-04-03"^^xsd:date ;
    med:time "11:00" ;
    med:attendedBy res:Doc_Suresh ; med:inDepartment res:Dept_GeneralMedicine ;
    med:reason "Review of anemia" ;
    med:outcome "Discharged with advice" ;
    med:recordedCondition res:Cond_266 ;
    med:hasVitals res:Vit_378 ; med:hasNote res:Note_378 .

res:Vit_378 a med:VitalSigns ;
    med:systolic 123 ; med:diastolic 83 ;
    med:heartRate 103 ; med:temperature 98.1 ;
    med:spo2 100 ;
    med:weightKg 66.4 ;
    med:bmi 25.9 .

res:Note_378 a med:ClinicalNote ;
    med:authorName "Dr. Suresh" ;
    med:date "2025-04-03"^^xsd:date ;
    med:noteText "Post discharge review. Continue current therapy, review in three months." .

res:Rx_285 a med:Prescription ;
    med:prescribes res:Med_IronFolate ; med:prescribedBy res:Doc_Suresh ;
    med:forPatient res:Pat_REK195 ; med:date "2025-04-03"^^xsd:date ;
    med:dosage "2 tablets" ;
    med:frequency "Once daily at night" ;
    med:durationDays 5 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_378 med:issuedPrescription res:Rx_285 .
res:Pat_REK195 med:hasPrescription res:Rx_285 .

res:Enc_379 a med:FollowUp ;
    med:encounterOf res:Pat_REK195 ; med:date "2026-08-30"^^xsd:date ;
    med:time "15:00" ;
    med:attendedBy res:Doc_Karthik ; med:inDepartment res:Dept_GeneralMedicine ;
    med:reason "Review of dengue" ;
    med:outcome "Follow up scheduled" ;
    med:recordedCondition res:Cond_265 ;
    med:hasVitals res:Vit_379 ; med:hasNote res:Note_379 .

res:Vit_379 a med:VitalSigns ;
    med:systolic 129 ; med:diastolic 70 ;
    med:heartRate 90 ; med:temperature 99.1 ;
    med:spo2 99 ;
    med:weightKg 73.2 ;
    med:bmi 23.9 .

res:Note_379 a med:ClinicalNote ;
    med:authorName "Dr. Karthik" ;
    med:date "2026-08-30"^^xsd:date ;
    med:noteText "Attends for scheduled follow up. Continue current therapy, review in three months." .

res:Rx_286 a med:Prescription ;
    med:prescribes res:Med_Paracetamol ; med:prescribedBy res:Doc_Karthik ;
    med:forPatient res:Pat_REK195 ; med:date "2026-08-30"^^xsd:date ;
    med:dosage "1 tablet" ;
    med:frequency "As required" ;
    med:durationDays 14 ;
    med:dispensed false ;
    med:status "Completed" .

res:Enc_379 med:issuedPrescription res:Rx_286 .
res:Pat_REK195 med:hasPrescription res:Rx_286 .

res:Inv_293 a med:Invoice ;
    med:forPatient res:Pat_REK195 ; med:date "2026-08-30"^^xsd:date ;
    med:amount 1486 ; med:paid false ;
    med:status "Awaiting payment" .
res:Pat_REK195 med:hasInvoice res:Inv_293 .

res:Pat_JAN196 a med:InPatient ;
    med:name "Janaki Krishnan" ; med:mrn "MRN-JAN196" ; med:photoInitials "JK" ;
    med:sex "Female" ; med:dateOfBirth "2020-06-02"^^xsd:date ; med:age 6 ;
    med:bloodGroup "O-" ; med:phone "+91 93081 241588" ; med:email "janaki.krishnan@example.in" ;
    med:address "87 Rajiv Gandhi Salai, Adyar, Chennai" ;
    med:primaryPhysician res:Doc_Sameer ;
    med:hasCondition res:Cond_268 , res:Cond_269 .

res:Cond_268 a med:Condition ;
    med:ofDisease res:Asthma ; med:onsetDate "2023-03-31"^^xsd:date ;
    med:severity "Moderate" ;
    med:clinicalStatus "Active" ;
    med:diagnosedBy res:Doc_Sameer .

res:Cond_269 a med:Condition ;
    med:ofDisease res:Obesity ; med:onsetDate "2024-08-08"^^xsd:date ;
    med:severity "Mild" ;
    med:clinicalStatus "Active" ;
    med:diagnosedBy res:Doc_Suresh .

res:Pat_JAN196 med:hasEncounter res:Enc_380 , res:Enc_381 , res:Enc_382 .

res:Enc_380 a med:EmergencyVisit ;
    med:encounterOf res:Pat_JAN196 ; med:date "2023-12-13"^^xsd:date ;
    med:time "17:15" ;
    med:attendedBy res:Doc_Karthik ; med:inDepartment res:Dept_Emergency ;
    med:reason "Acute presentation" ;
    med:outcome "Treatment continued" ;
    med:recordedCondition res:Cond_269 ;
    med:hasVitals res:Vit_380 ; med:hasNote res:Note_380 .

res:Vit_380 a med:VitalSigns ;
    med:systolic 117 ; med:diastolic 73 ;
    med:heartRate 91 ; med:temperature 99.0 ;
    med:spo2 96 ;
    med:weightKg 81.0 ;
    med:bmi 31.5 .

res:Note_380 a med:ClinicalNote ;
    med:authorName "Dr. Karthik" ;
    med:date "2023-12-13"^^xsd:date ;
    med:noteText "Presents with a two day history of symptoms. Referral raised to the relevant specialty." .

res:Inv_294 a med:Invoice ;
    med:forPatient res:Pat_JAN196 ; med:date "2023-12-13"^^xsd:date ;
    med:amount 25769 ; med:paid true ;
    med:status "Settled" .
res:Inv_294 med:coveredBy res:Policy_JAN196 .
res:Pat_JAN196 med:hasInvoice res:Inv_294 .

res:Enc_381 a med:FollowUp ;
    med:encounterOf res:Pat_JAN196 ; med:date "2025-04-01"^^xsd:date ;
    med:time "14:00" ;
    med:attendedBy res:Doc_Sameer ; med:inDepartment res:Dept_Pulmonology ;
    med:reason "Review of asthma" ;
    med:outcome "Follow up scheduled" ;
    med:recordedCondition res:Cond_268 ;
    med:hasVitals res:Vit_381 ; med:hasNote res:Note_381 .

res:Vit_381 a med:VitalSigns ;
    med:systolic 113 ; med:diastolic 74 ;
    med:heartRate 93 ; med:temperature 98.6 ;
    med:spo2 94 ;
    med:weightKg 96.6 ;
    med:bmi 30.8 .

res:Note_381 a med:ClinicalNote ;
    med:authorName "Dr. Sameer" ;
    med:date "2025-04-01"^^xsd:date ;
    med:noteText "Seen for worsening symptoms over the past week. Advised on diet, salt restriction and daily walking." .

res:Rx_287 a med:Prescription ;
    med:prescribes res:Med_Salbutamol ; med:prescribedBy res:Doc_Sameer ;
    med:forPatient res:Pat_JAN196 ; med:date "2025-04-01"^^xsd:date ;
    med:dosage "2 tablets" ;
    med:frequency "Twice daily" ;
    med:durationDays 90 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_381 med:issuedPrescription res:Rx_287 .
res:Pat_JAN196 med:hasPrescription res:Rx_287 .

res:Inv_295 a med:Invoice ;
    med:forPatient res:Pat_JAN196 ; med:date "2025-04-01"^^xsd:date ;
    med:amount 5815 ; med:paid true ;
    med:status "Settled" .
res:Inv_295 med:coveredBy res:Policy_JAN196 .
res:Pat_JAN196 med:hasInvoice res:Inv_295 .

res:Enc_382 a med:Consultation ;
    med:encounterOf res:Pat_JAN196 ; med:date "2026-08-30"^^xsd:date ;
    med:time "08:30" ;
    med:attendedBy res:Doc_Nithya ; med:inDepartment res:Dept_Endocrinology ;
    med:reason "Review of obesity" ;
    med:outcome "Follow up scheduled" ;
    med:recordedCondition res:Cond_269 ;
    med:hasVitals res:Vit_382 ; med:hasNote res:Note_382 .

res:Vit_382 a med:VitalSigns ;
    med:systolic 134 ; med:diastolic 82 ;
    med:heartRate 95 ; med:temperature 98.4 ;
    med:spo2 94 ;
    med:weightKg 87.0 ;
    med:bmi 38.0 .

res:Note_382 a med:ClinicalNote ;
    med:authorName "Dr. Nithya" ;
    med:date "2026-08-30"^^xsd:date ;
    med:noteText "Post discharge review. Investigations ordered, will call with results." .

res:Policy_JAN196 a med:InsurancePolicy ;
    med:policyNumber "ST-553110" ;
    med:issuedBy res:Ins_StarHealth ; med:coveragePercent 60 ;
    med:amount 750000 .
res:Pat_JAN196 med:hasPolicy res:Policy_JAN196 .

res:Pat_JAN196 med:assignedBed res:Bed_13 .

res:Pat_HAR197 a med:OutPatient ;
    med:name "Hari Krishnan" ; med:mrn "MRN-HAR197" ; med:photoInitials "HK" ;
    med:sex "Male" ; med:dateOfBirth "1993-11-06"^^xsd:date ; med:age 32 ;
    med:bloodGroup "O+" ; med:phone "+91 96750 841124" ; med:email "hari.krishnan@example.in" ;
    med:address "69 Anna Salai, Adyar, Chennai" ;
    med:primaryPhysician res:Doc_Priya ;
    med:hasCondition res:Cond_270 .

res:Cond_270 a med:Condition , med:CriticalCondition ;
    med:ofDisease res:Stroke ; med:onsetDate "2026-05-27"^^xsd:date ;
    med:severity "Severe" ;
    med:clinicalStatus "Active" ;
    med:diagnosedBy res:Doc_Priya .

res:Pat_HAR197 med:hasEncounter res:Enc_383 , res:Enc_384 , res:Enc_385 , res:Enc_386 .

res:Enc_383 a med:Consultation ;
    med:encounterOf res:Pat_HAR197 ; med:date "2023-07-17"^^xsd:date ;
    med:time "17:45" ;
    med:attendedBy res:Doc_Priya ; med:inDepartment res:Dept_Neurology ;
    med:reason "First presentation" ;
    med:outcome "Follow up scheduled" ;
    med:recordedCondition res:Cond_270 ;
    med:hasVitals res:Vit_383 ; med:hasNote res:Note_383 .

res:Vit_383 a med:VitalSigns ;
    med:systolic 126 ; med:diastolic 67 ;
    med:heartRate 74 ; med:temperature 100.5 ;
    med:spo2 96 ;
    med:weightKg 49.1 ;
    med:bmi 21.0 .

res:Note_383 a med:ClinicalNote ;
    med:authorName "Dr. Priya" ;
    med:date "2023-07-17"^^xsd:date ;
    med:noteText "Attends for scheduled follow up. Advised on diet, salt restriction and daily walking." .

res:Rx_288 a med:Prescription ;
    med:prescribes res:Med_Clopidogrel ; med:prescribedBy res:Doc_Priya ;
    med:forPatient res:Pat_HAR197 ; med:date "2023-07-17"^^xsd:date ;
    med:dosage "1 tablet" ;
    med:frequency "As required" ;
    med:durationDays 7 ;
    med:dispensed true ;
    med:status "Completed" .

res:Rx_289 a med:Prescription ;
    med:prescribes res:Med_Warfarin ; med:prescribedBy res:Doc_Priya ;
    med:forPatient res:Pat_HAR197 ; med:date "2023-07-17"^^xsd:date ;
    med:dosage "2 tablets" ;
    med:frequency "Once daily at night" ;
    med:durationDays 7 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_383 med:issuedPrescription res:Rx_288 , res:Rx_289 .
res:Pat_HAR197 med:hasPrescription res:Rx_288 , res:Rx_289 .

res:Lab_176 a med:LabOrder ;
    med:analyte "INR" ; med:forPatient res:Pat_HAR197 ;
    med:date "2023-07-17"^^xsd:date ; med:orderedBy res:Doc_Priya ;
    med:testsFor res:Stroke ;
    med:orderStatus "Resulted" ;
    med:hasResult res:Res_176 .

res:Res_176 a med:LabResult ;
    med:analyte "INR" ; med:value 3.34 ; med:unit "ratio" ;
    med:refLow 0.9 ; med:refHigh 1.2 ; med:outOfRange true ;
    med:date "2023-07-18"^^xsd:date ;
    med:performedBy res:Tech_Mohan .

res:Enc_383 med:orderedTest res:Lab_176 .

res:Inv_296 a med:Invoice ;
    med:forPatient res:Pat_HAR197 ; med:date "2023-07-17"^^xsd:date ;
    med:amount 1730 ; med:paid true ;
    med:status "Settled" .
res:Inv_296 med:coveredBy res:Policy_HAR197 .
res:Pat_HAR197 med:hasInvoice res:Inv_296 .

res:Enc_384 a med:Consultation ;
    med:encounterOf res:Pat_HAR197 ; med:date "2024-08-10"^^xsd:date ;
    med:time "16:00" ;
    med:attendedBy res:Doc_Priya ; med:inDepartment res:Dept_Neurology ;
    med:reason "Review of stroke" ;
    med:outcome "Discharged with advice" ;
    med:recordedCondition res:Cond_270 ;
    med:hasVitals res:Vit_384 ; med:hasNote res:Note_384 .

res:Vit_384 a med:VitalSigns ;
    med:systolic 112 ; med:diastolic 75 ;
    med:heartRate 78 ; med:temperature 99.6 ;
    med:spo2 98 ;
    med:weightKg 62.6 ;
    med:bmi 23.9 .

res:Note_384 a med:ClinicalNote ;
    med:authorName "Dr. Priya" ;
    med:date "2024-08-10"^^xsd:date ;
    med:noteText "Presents with a two day history of symptoms. Reassured. No change to treatment at this stage." .

res:Rx_290 a med:Prescription ;
    med:prescribes res:Med_Clopidogrel ; med:prescribedBy res:Doc_Priya ;
    med:forPatient res:Pat_HAR197 ; med:date "2024-08-10"^^xsd:date ;
    med:dosage "2 tablets" ;
    med:frequency "As required" ;
    med:durationDays 10 ;
    med:dispensed true ;
    med:status "Completed" .

res:Rx_291 a med:Prescription ;
    med:prescribes res:Med_Warfarin ; med:prescribedBy res:Doc_Priya ;
    med:forPatient res:Pat_HAR197 ; med:date "2024-08-10"^^xsd:date ;
    med:dosage "2 tablets" ;
    med:frequency "Twice daily" ;
    med:durationDays 14 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_384 med:issuedPrescription res:Rx_290 , res:Rx_291 .
res:Pat_HAR197 med:hasPrescription res:Rx_290 , res:Rx_291 .

res:Enc_385 a med:Consultation ;
    med:encounterOf res:Pat_HAR197 ; med:date "2025-09-01"^^xsd:date ;
    med:time "12:30" ;
    med:attendedBy res:Doc_Priya ; med:inDepartment res:Dept_Neurology ;
    med:reason "Review of stroke" ;
    med:outcome "Treatment continued" ;
    med:recordedCondition res:Cond_270 ;
    med:hasVitals res:Vit_385 ; med:hasNote res:Note_385 .

res:Vit_385 a med:VitalSigns ;
    med:systolic 109 ; med:diastolic 83 ;
    med:heartRate 86 ; med:temperature 99.6 ;
    med:spo2 100 ;
    med:weightKg 71.9 ;
    med:bmi 22.7 .

res:Note_385 a med:ClinicalNote ;
    med:authorName "Dr. Priya" ;
    med:date "2025-09-01"^^xsd:date ;
    med:noteText "Seen for worsening symptoms over the past week. Advised on diet, salt restriction and daily walking." .

res:Lab_177 a med:LabOrder ;
    med:analyte "INR" ; med:forPatient res:Pat_HAR197 ;
    med:date "2025-09-01"^^xsd:date ; med:orderedBy res:Doc_Priya ;
    med:testsFor res:Stroke ;
    med:orderStatus "Resulted" ;
    med:hasResult res:Res_177 .

res:Res_177 a med:LabResult ;
    med:analyte "INR" ; med:value 2.03 ; med:unit "ratio" ;
    med:refLow 0.9 ; med:refHigh 1.2 ; med:outOfRange true ;
    med:date "2025-09-02"^^xsd:date ;
    med:performedBy res:Tech_Mohan .

res:Enc_385 med:orderedTest res:Lab_177 .

res:Inv_297 a med:Invoice ;
    med:forPatient res:Pat_HAR197 ; med:date "2025-09-01"^^xsd:date ;
    med:amount 1851 ; med:paid true ;
    med:status "Settled" .
res:Inv_297 med:coveredBy res:Policy_HAR197 .
res:Pat_HAR197 med:hasInvoice res:Inv_297 .

res:Enc_386 a med:Consultation ;
    med:encounterOf res:Pat_HAR197 ; med:date "2026-08-15"^^xsd:date ;
    med:time "17:45" ;
    med:attendedBy res:Doc_Priya ; med:inDepartment res:Dept_Neurology ;
    med:reason "Review of stroke" ;
    med:outcome "Treatment continued" ;
    med:recordedCondition res:Cond_270 ;
    med:hasVitals res:Vit_386 ; med:hasNote res:Note_386 .

res:Vit_386 a med:VitalSigns ;
    med:systolic 133 ; med:diastolic 74 ;
    med:heartRate 75 ; med:temperature 99.8 ;
    med:spo2 97 ;
    med:weightKg 66.4 ;
    med:bmi 24.5 .

res:Note_386 a med:ClinicalNote ;
    med:authorName "Dr. Priya" ;
    med:date "2026-08-15"^^xsd:date ;
    med:noteText "Presents with a two day history of symptoms. Advised on diet, salt restriction and daily walking." .

res:Rx_292 a med:Prescription ;
    med:prescribes res:Med_Warfarin ; med:prescribedBy res:Doc_Priya ;
    med:forPatient res:Pat_HAR197 ; med:date "2026-08-15"^^xsd:date ;
    med:dosage "1 tablet" ;
    med:frequency "Twice daily" ;
    med:durationDays 5 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_386 med:issuedPrescription res:Rx_292 .
res:Pat_HAR197 med:hasPrescription res:Rx_292 .

res:Inv_298 a med:Invoice ;
    med:forPatient res:Pat_HAR197 ; med:date "2026-08-15"^^xsd:date ;
    med:amount 3701 ; med:paid true ;
    med:status "Settled" .
res:Inv_298 med:coveredBy res:Policy_HAR197 .
res:Pat_HAR197 med:hasInvoice res:Inv_298 .

res:Policy_HAR197 a med:InsurancePolicy ;
    med:policyNumber "NE-855338" ;
    med:issuedBy res:Ins_NewIndia ; med:coveragePercent 75 ;
    med:amount 200000 .
res:Pat_HAR197 med:hasPolicy res:Policy_HAR197 .

res:Pat_SAN198 a med:InPatient ;
    med:name "Sanjay Rao" ; med:mrn "MRN-SAN198" ; med:photoInitials "SR" ;
    med:sex "Male" ; med:dateOfBirth "2008-06-13"^^xsd:date ; med:age 18 ;
    med:bloodGroup "AB+" ; med:phone "+91 93619 181043" ; med:email "sanjay.rao@example.in" ;
    med:address "20 Bharathi Street, Thoraipakkam, Chennai" ;
    med:primaryPhysician res:Doc_Ramesh ;
    med:hasCondition res:Cond_271 , res:Cond_272 , res:Cond_273 , res:Cond_274 .

res:Cond_271 a med:Condition ;
    med:ofDisease res:CoronaryArteryDisease ; med:onsetDate "2024-05-26"^^xsd:date ;
    med:severity "Mild" ;
    med:clinicalStatus "Active" ;
    med:diagnosedBy res:Doc_Ramesh .

res:Cond_272 a med:Condition ;
    med:ofDisease res:Hypertension ; med:onsetDate "2020-09-13"^^xsd:date ;
    med:severity "Moderate" ;
    med:clinicalStatus "Active" ;
    med:diagnosedBy res:Doc_Joseph .

res:Cond_273 a med:Condition ;
    med:ofDisease res:Dyslipidemia ; med:onsetDate "2024-09-04"^^xsd:date ;
    med:severity "Mild" ;
    med:clinicalStatus "Active" ;
    med:diagnosedBy res:Doc_Suresh .

res:Cond_274 a med:Condition , med:CriticalCondition ;
    med:ofDisease res:MyocardialInfarction ; med:onsetDate "2025-02-26"^^xsd:date ;
    med:severity "Severe" ;
    med:clinicalStatus "Active" ;
    med:diagnosedBy res:Doc_Ramesh .

res:Pat_SAN198 med:hasEncounter res:Enc_387 , res:Enc_388 , res:Enc_389 , res:Enc_390 , res:Enc_391 .

res:Enc_387 a med:Consultation ;
    med:encounterOf res:Pat_SAN198 ; med:date "2023-05-15"^^xsd:date ;
    med:time "08:30" ;
    med:attendedBy res:Doc_Ramesh ; med:inDepartment res:Dept_Cardiology ;
    med:reason "First presentation" ;
    med:outcome "Referred for tests" ;
    med:recordedCondition res:Cond_271 ;
    med:hasVitals res:Vit_387 ; med:hasNote res:Note_387 .

res:Vit_387 a med:VitalSigns ;
    med:systolic 176 ; med:diastolic 93 ;
    med:heartRate 62 ; med:temperature 97.6 ;
    med:spo2 100 ;
    med:weightKg 59.6 ;
    med:bmi 22.1 .

res:Note_387 a med:ClinicalNote ;
    med:authorName "Dr. Ramesh" ;
    med:date "2023-05-15"^^xsd:date ;
    med:noteText "Seen for worsening symptoms over the past week. Investigations ordered, will call with results." .

res:Rx_293 a med:Prescription ;
    med:prescribes res:Med_Clopidogrel ; med:prescribedBy res:Doc_Ramesh ;
    med:forPatient res:Pat_SAN198 ; med:date "2023-05-15"^^xsd:date ;
    med:dosage "2 tablets" ;
    med:frequency "As required" ;
    med:durationDays 30 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_387 med:issuedPrescription res:Rx_293 .
res:Pat_SAN198 med:hasPrescription res:Rx_293 .

res:Lab_178 a med:LabOrder ;
    med:analyte "Troponin I" ; med:forPatient res:Pat_SAN198 ;
    med:date "2023-05-15"^^xsd:date ; med:orderedBy res:Doc_Ramesh ;
    med:testsFor res:CoronaryArteryDisease ;
    med:orderStatus "Resulted" ;
    med:hasResult res:Res_178 .

res:Res_178 a med:LabResult ;
    med:analyte "Troponin I" ; med:value 5.24 ; med:unit "ng/mL" ;
    med:refLow 0 ; med:refHigh 0.04 ; med:outOfRange true ;
    med:date "2023-05-16"^^xsd:date ;
    med:performedBy res:Tech_Mohan .

res:Enc_387 med:orderedTest res:Lab_178 .

res:Inv_299 a med:Invoice ;
    med:forPatient res:Pat_SAN198 ; med:date "2023-05-15"^^xsd:date ;
    med:amount 1868 ; med:paid true ;
    med:status "Settled" .
res:Inv_299 med:coveredBy res:Policy_SAN198 .
res:Pat_SAN198 med:hasInvoice res:Inv_299 .

res:Enc_388 a med:Consultation ;
    med:encounterOf res:Pat_SAN198 ; med:date "2024-03-15"^^xsd:date ;
    med:time "11:00" ;
    med:attendedBy res:Doc_Suresh ; med:inDepartment res:Dept_GeneralMedicine ;
    med:reason "Review of hypertension" ;
    med:outcome "Discharged with advice" ;
    med:recordedCondition res:Cond_272 ;
    med:hasVitals res:Vit_388 ; med:hasNote res:Note_388 .

res:Vit_388 a med:VitalSigns ;
    med:systolic 147 ; med:diastolic 99 ;
    med:heartRate 71 ; med:temperature 98.0 ;
    med:spo2 100 ;
    med:weightKg 63.2 ;
    med:bmi 26.6 .

res:Note_388 a med:ClinicalNote ;
    med:authorName "Dr. Suresh" ;
    med:date "2024-03-15"^^xsd:date ;
    med:noteText "Routine review, no new complaints. Referral raised to the relevant specialty." .

res:Inv_300 a med:Invoice ;
    med:forPatient res:Pat_SAN198 ; med:date "2024-03-15"^^xsd:date ;
    med:amount 5014 ; med:paid false ;
    med:status "Insurance claim pending" .
res:Inv_300 med:coveredBy res:Policy_SAN198 .
res:Pat_SAN198 med:hasInvoice res:Inv_300 .

res:Enc_389 a med:Screening ;
    med:encounterOf res:Pat_SAN198 ; med:date "2025-01-20"^^xsd:date ;
    med:time "14:15" ;
    med:attendedBy res:Doc_Suresh ; med:inDepartment res:Dept_GeneralMedicine ;
    med:reason "Review of dyslipidemia" ;
    med:outcome "Treatment continued" ;
    med:recordedCondition res:Cond_273 ;
    med:hasVitals res:Vit_389 ; med:hasNote res:Note_389 .

res:Vit_389 a med:VitalSigns ;
    med:systolic 140 ; med:diastolic 102 ;
    med:heartRate 65 ; med:temperature 99.6 ;
    med:spo2 97 ;
    med:weightKg 52.7 ;
    med:bmi 24.5 .

res:Note_389 a med:ClinicalNote ;
    med:authorName "Dr. Suresh" ;
    med:date "2025-01-20"^^xsd:date ;
    med:noteText "Seen for worsening symptoms over the past week. Counselled on medication adherence. Red flag symptoms explained." .

res:Rx_294 a med:Prescription ;
    med:prescribes res:Med_Atorvastatin ; med:prescribedBy res:Doc_Suresh ;
    med:forPatient res:Pat_SAN198 ; med:date "2025-01-20"^^xsd:date ;
    med:dosage "1 tablet" ;
    med:frequency "Three times daily" ;
    med:durationDays 60 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_389 med:issuedPrescription res:Rx_294 .
res:Pat_SAN198 med:hasPrescription res:Rx_294 .

res:Enc_390 a med:FollowUp ;
    med:encounterOf res:Pat_SAN198 ; med:date "2025-10-18"^^xsd:date ;
    med:time "11:45" ;
    med:attendedBy res:Doc_Suresh ; med:inDepartment res:Dept_GeneralMedicine ;
    med:reason "Review of hypertension" ;
    med:outcome "Discharged with advice" ;
    med:recordedCondition res:Cond_272 ;
    med:hasVitals res:Vit_390 ; med:hasNote res:Note_390 .

res:Vit_390 a med:VitalSigns ;
    med:systolic 170 ; med:diastolic 105 ;
    med:heartRate 63 ; med:temperature 97.8 ;
    med:spo2 99 ;
    med:weightKg 56.1 ;
    med:bmi 23.9 .

res:Note_390 a med:ClinicalNote ;
    med:authorName "Dr. Suresh" ;
    med:date "2025-10-18"^^xsd:date ;
    med:noteText "Referred from general medicine for specialist opinion. Counselled on medication adherence. Red flag symptoms explained." .

res:Rx_295 a med:Prescription ;
    med:prescribes res:Med_Amlodipine ; med:prescribedBy res:Doc_Suresh ;
    med:forPatient res:Pat_SAN198 ; med:date "2025-10-18"^^xsd:date ;
    med:dosage "2 tablets" ;
    med:frequency "As required" ;
    med:durationDays 90 ;
    med:dispensed true ;
    med:status "Completed" .

res:Rx_296 a med:Prescription ;
    med:prescribes res:Med_Metoprolol ; med:prescribedBy res:Doc_Suresh ;
    med:forPatient res:Pat_SAN198 ; med:date "2025-10-18"^^xsd:date ;
    med:dosage "1 tablet" ;
    med:frequency "Twice daily" ;
    med:durationDays 30 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_390 med:issuedPrescription res:Rx_295 , res:Rx_296 .
res:Pat_SAN198 med:hasPrescription res:Rx_295 , res:Rx_296 .

res:Inv_301 a med:Invoice ;
    med:forPatient res:Pat_SAN198 ; med:date "2025-10-18"^^xsd:date ;
    med:amount 6198 ; med:paid true ;
    med:status "Settled" .
res:Inv_301 med:coveredBy res:Policy_SAN198 .
res:Pat_SAN198 med:hasInvoice res:Inv_301 .

res:Enc_391 a med:Admission ;
    med:encounterOf res:Pat_SAN198 ; med:date "2026-08-30"^^xsd:date ;
    med:time "08:15" ;
    med:attendedBy res:Doc_Joseph ; med:inDepartment res:Dept_GeneralMedicine ;
    med:reason "Review of dyslipidemia" ;
    med:outcome "Admitted to ward" ;
    med:lengthOfStay 10 ;
    med:recordedCondition res:Cond_273 ;
    med:hasVitals res:Vit_391 ; med:hasNote res:Note_391 .

res:Vit_391 a med:VitalSigns ;
    med:systolic 166 ; med:diastolic 90 ;
    med:heartRate 98 ; med:temperature 97.8 ;
    med:spo2 98 ;
    med:weightKg 66.2 ;
    med:bmi 20.4 .

res:Note_391 a med:ClinicalNote ;
    med:authorName "Dr. Joseph" ;
    med:date "2026-08-30"^^xsd:date ;
    med:noteText "Post discharge review. Investigations ordered, will call with results." .

res:Rx_297 a med:Prescription ;
    med:prescribes res:Med_Atorvastatin ; med:prescribedBy res:Doc_Joseph ;
    med:forPatient res:Pat_SAN198 ; med:date "2026-08-30"^^xsd:date ;
    med:dosage "2 tablets" ;
    med:frequency "Three times daily" ;
    med:durationDays 90 ;
    med:dispensed true ;
    med:status "Active" .

res:Enc_391 med:issuedPrescription res:Rx_297 .
res:Pat_SAN198 med:hasPrescription res:Rx_297 .

res:Lab_179 a med:LabOrder ;
    med:analyte "LDL cholesterol" ; med:forPatient res:Pat_SAN198 ;
    med:date "2026-08-30"^^xsd:date ; med:orderedBy res:Doc_Joseph ;
    med:testsFor res:Dyslipidemia ;
    med:orderStatus "Resulted" ;
    med:hasResult res:Res_179 .

res:Res_179 a med:LabResult ;
    med:analyte "LDL cholesterol" ; med:value 67.12 ; med:unit "mg/dL" ;
    med:refLow 0 ; med:refHigh 100 ; med:outOfRange false ;
    med:date "2026-08-30"^^xsd:date ;
    med:performedBy res:Tech_Mohan .

res:Lab_180 a med:LabOrder ;
    med:analyte "Triglycerides" ; med:forPatient res:Pat_SAN198 ;
    med:date "2026-08-30"^^xsd:date ; med:orderedBy res:Doc_Joseph ;
    med:testsFor res:Dyslipidemia ;
    med:orderStatus "Resulted" ;
    med:hasResult res:Res_180 .

res:Res_180 a med:LabResult ;
    med:analyte "Triglycerides" ; med:value 413.09 ; med:unit "mg/dL" ;
    med:refLow 0 ; med:refHigh 150 ; med:outOfRange true ;
    med:date "2026-08-30"^^xsd:date ;
    med:performedBy res:Tech_Mohan .

res:Enc_391 med:orderedTest res:Lab_179 , res:Lab_180 .

res:Inv_302 a med:Invoice ;
    med:forPatient res:Pat_SAN198 ; med:date "2026-08-30"^^xsd:date ;
    med:amount 241080 ; med:paid false ;
    med:status "Insurance claim pending" .
res:Inv_302 med:coveredBy res:Policy_SAN198 .
res:Pat_SAN198 med:hasInvoice res:Inv_302 .

res:Policy_SAN198 a med:InsurancePolicy ;
    med:policyNumber "CG-807622" ;
    med:issuedBy res:Ins_CGHS ; med:coveragePercent 70 ;
    med:amount 300000 .
res:Pat_SAN198 med:hasPolicy res:Policy_SAN198 .

res:Appt_61 a med:Appointment ;
    med:forPatient res:Pat_SAN198 ; med:appointmentWith res:Doc_Farida ;
    med:date "2026-10-06"^^xsd:date ;
    med:time "11:00" ;
    med:inDepartment res:Dept_Cardiology ;
    med:status "Scheduled" .
res:Pat_SAN198 med:hasAppointment res:Appt_61 .

res:Pat_SAN198 med:assignedBed res:Bed_14 .

res:Pat_KIR199 a med:OutPatient ;
    med:name "Kiran Iyer" ; med:mrn "MRN-KIR199" ; med:photoInitials "KI" ;
    med:sex "Male" ; med:dateOfBirth "2004-03-28"^^xsd:date ; med:age 22 ;
    med:bloodGroup "B+" ; med:phone "+91 91935 994696" ; med:email "kiran.iyer@example.in" ;
    med:address "5 Rajiv Gandhi Salai, Tambaram, Chennai" ;
    med:primaryPhysician res:Doc_Sameer ;
    med:hasCondition res:Cond_275 .

res:Cond_275 a med:Condition , med:CriticalCondition ;
    med:ofDisease res:Tuberculosis ; med:onsetDate "2024-12-22"^^xsd:date ;
    med:severity "Severe" ;
    med:clinicalStatus "Active" ;
    med:diagnosedBy res:Doc_Sameer .

res:Pat_KIR199 med:hasEncounter res:Enc_392 , res:Enc_393 , res:Enc_394 .

res:Enc_392 a med:Consultation ;
    med:encounterOf res:Pat_KIR199 ; med:date "2023-12-23"^^xsd:date ;
    med:time "12:15" ;
    med:attendedBy res:Doc_Sameer ; med:inDepartment res:Dept_Pulmonology ;
    med:reason "First presentation" ;
    med:outcome "Follow up scheduled" ;
    med:recordedCondition res:Cond_275 ;
    med:hasVitals res:Vit_392 ; med:hasNote res:Note_392 .

res:Vit_392 a med:VitalSigns ;
    med:systolic 119 ; med:diastolic 73 ;
    med:heartRate 72 ; med:temperature 99.9 ;
    med:spo2 98 ;
    med:weightKg 69.1 ;
    med:bmi 24.7 .

res:Note_392 a med:ClinicalNote ;
    med:authorName "Dr. Sameer" ;
    med:date "2023-12-23"^^xsd:date ;
    med:noteText "Presents with a two day history of symptoms. Counselled on medication adherence. Red flag symptoms explained." .

res:Lab_181 a med:LabOrder ;
    med:analyte "ESR" ; med:forPatient res:Pat_KIR199 ;
    med:date "2023-12-23"^^xsd:date ; med:orderedBy res:Doc_Sameer ;
    med:testsFor res:Tuberculosis ;
    med:orderStatus "Resulted" ;
    med:hasResult res:Res_181 .

res:Res_181 a med:LabResult ;
    med:analyte "ESR" ; med:value 71.21 ; med:unit "mm/hr" ;
    med:refLow 0 ; med:refHigh 20 ; med:outOfRange true ;
    med:date "2023-12-24"^^xsd:date ;
    med:performedBy res:Tech_Mohan .

res:Enc_392 med:orderedTest res:Lab_181 .

res:Inv_303 a med:Invoice ;
    med:forPatient res:Pat_KIR199 ; med:date "2023-12-23"^^xsd:date ;
    med:amount 2888 ; med:paid true ;
    med:status "Settled" .
res:Inv_303 med:coveredBy res:Policy_KIR199 .
res:Pat_KIR199 med:hasInvoice res:Inv_303 .

res:Enc_393 a med:Consultation ;
    med:encounterOf res:Pat_KIR199 ; med:date "2025-04-17"^^xsd:date ;
    med:time "09:00" ;
    med:attendedBy res:Doc_Sameer ; med:inDepartment res:Dept_Pulmonology ;
    med:reason "Review of tuberculosis" ;
    med:outcome "Treatment continued" ;
    med:recordedCondition res:Cond_275 ;
    med:hasVitals res:Vit_393 ; med:hasNote res:Note_393 .

res:Vit_393 a med:VitalSigns ;
    med:systolic 130 ; med:diastolic 80 ;
    med:heartRate 87 ; med:temperature 100.2 ;
    med:spo2 100 ;
    med:weightKg 72.0 ;
    med:bmi 21.2 .

res:Note_393 a med:ClinicalNote ;
    med:authorName "Dr. Sameer" ;
    med:date "2025-04-17"^^xsd:date ;
    med:noteText "Attends for scheduled follow up. Counselled on medication adherence. Red flag symptoms explained." .

res:Enc_394 a med:FollowUp ;
    med:encounterOf res:Pat_KIR199 ; med:date "2026-08-18"^^xsd:date ;
    med:time "09:00" ;
    med:attendedBy res:Doc_Sameer ; med:inDepartment res:Dept_Pulmonology ;
    med:reason "Review of tuberculosis" ;
    med:outcome "Follow up scheduled" ;
    med:recordedCondition res:Cond_275 ;
    med:hasVitals res:Vit_394 ; med:hasNote res:Note_394 .

res:Vit_394 a med:VitalSigns ;
    med:systolic 127 ; med:diastolic 72 ;
    med:heartRate 101 ; med:temperature 98.6 ;
    med:spo2 96 ;
    med:weightKg 71.4 ;
    med:bmi 26.6 .

res:Note_394 a med:ClinicalNote ;
    med:authorName "Dr. Sameer" ;
    med:date "2026-08-18"^^xsd:date ;
    med:noteText "Post discharge review. Advised on diet, salt restriction and daily walking." .

res:Inv_304 a med:Invoice ;
    med:forPatient res:Pat_KIR199 ; med:date "2026-08-18"^^xsd:date ;
    med:amount 1924 ; med:paid false ;
    med:status "Insurance claim pending" .
res:Inv_304 med:coveredBy res:Policy_KIR199 .
res:Pat_KIR199 med:hasInvoice res:Inv_304 .

res:Policy_KIR199 a med:InsurancePolicy ;
    med:policyNumber "NE-968453" ;
    med:issuedBy res:Ins_NewIndia ; med:coveragePercent 60 ;
    med:amount 750000 .
res:Pat_KIR199 med:hasPolicy res:Policy_KIR199 .

res:Appt_62 a med:Appointment ;
    med:forPatient res:Pat_KIR199 ; med:appointmentWith res:Doc_Sameer ;
    med:date "2026-09-08"^^xsd:date ;
    med:time "13:20" ;
    med:inDepartment res:Dept_Pulmonology ;
    med:status "Scheduled" .
res:Pat_KIR199 med:hasAppointment res:Appt_62 .

res:Pat_MUR200 a med:OutPatient ;
    med:name "Murugan Pillai" ; med:mrn "MRN-MUR200" ; med:photoInitials "MP" ;
    med:sex "Male" ; med:dateOfBirth "1986-08-19"^^xsd:date ; med:age 40 ;
    med:bloodGroup "AB+" ; med:phone "+91 98987 439122" ; med:email "murugan.pillai@example.in" ;
    med:address "23 Kamarajar Street, Tambaram, Chennai" ;
    med:primaryPhysician res:Doc_Anand ;
    med:hasCondition res:Cond_276 .

res:Cond_276 a med:Condition ;
    med:ofDisease res:BreastCancer ; med:onsetDate "2025-08-01"^^xsd:date ;
    med:severity "Mild" ;
    med:clinicalStatus "Active" ;
    med:diagnosedBy res:Doc_Anand .

res:Pat_MUR200 med:hasEncounter res:Enc_395 , res:Enc_396 , res:Enc_397 , res:Enc_398 .

res:Enc_395 a med:Consultation ;
    med:encounterOf res:Pat_MUR200 ; med:date "2023-07-31"^^xsd:date ;
    med:time "18:30" ;
    med:attendedBy res:Doc_Anand ; med:inDepartment res:Dept_Oncology ;
    med:reason "First presentation" ;
    med:outcome "Follow up scheduled" ;
    med:recordedCondition res:Cond_276 ;
    med:hasVitals res:Vit_395 ; med:hasNote res:Note_395 .

res:Vit_395 a med:VitalSigns ;
    med:systolic 133 ; med:diastolic 76 ;
    med:heartRate 89 ; med:temperature 97.3 ;
    med:spo2 96 ;
    med:weightKg 74.8 ;
    med:bmi 19.9 .

res:Note_395 a med:ClinicalNote ;
    med:authorName "Dr. Anand" ;
    med:date "2023-07-31"^^xsd:date ;
    med:noteText "Routine review, no new complaints. Continue current therapy, review in three months." .

res:Rx_298 a med:Prescription ;
    med:prescribes res:Med_Tamoxifen ; med:prescribedBy res:Doc_Anand ;
    med:forPatient res:Pat_MUR200 ; med:date "2023-07-31"^^xsd:date ;
    med:dosage "1 tablet" ;
    med:frequency "Three times daily" ;
    med:durationDays 7 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_395 med:issuedPrescription res:Rx_298 .
res:Pat_MUR200 med:hasPrescription res:Rx_298 .

res:Lab_182 a med:LabOrder ;
    med:analyte "CA 15-3" ; med:forPatient res:Pat_MUR200 ;
    med:date "2023-07-31"^^xsd:date ; med:orderedBy res:Doc_Anand ;
    med:testsFor res:BreastCancer ;
    med:orderStatus "Resulted" ;
    med:hasResult res:Res_182 .

res:Res_182 a med:LabResult ;
    med:analyte "CA 15-3" ; med:value 13.09 ; med:unit "U/mL" ;
    med:refLow 0 ; med:refHigh 30 ; med:outOfRange false ;
    med:date "2023-08-01"^^xsd:date ;
    med:performedBy res:Tech_Mohan .

res:Enc_395 med:orderedTest res:Lab_182 .

res:Inv_305 a med:Invoice ;
    med:forPatient res:Pat_MUR200 ; med:date "2023-07-31"^^xsd:date ;
    med:amount 5190 ; med:paid true ;
    med:status "Settled" .
res:Inv_305 med:coveredBy res:Policy_MUR200 .
res:Pat_MUR200 med:hasInvoice res:Inv_305 .

res:Enc_396 a med:EmergencyVisit ;
    med:encounterOf res:Pat_MUR200 ; med:date "2024-08-13"^^xsd:date ;
    med:time "17:15" ;
    med:attendedBy res:Doc_Karthik ; med:inDepartment res:Dept_Emergency ;
    med:reason "Acute presentation" ;
    med:outcome "Follow up scheduled" ;
    med:recordedCondition res:Cond_276 ;
    med:hasVitals res:Vit_396 ; med:hasNote res:Note_396 .

res:Vit_396 a med:VitalSigns ;
    med:systolic 126 ; med:diastolic 82 ;
    med:heartRate 69 ; med:temperature 99.3 ;
    med:spo2 96 ;
    med:weightKg 60.7 ;
    med:bmi 22.7 .

res:Note_396 a med:ClinicalNote ;
    med:authorName "Dr. Karthik" ;
    med:date "2024-08-13"^^xsd:date ;
    med:noteText "Routine review, no new complaints. Reassured. No change to treatment at this stage." .

res:Rx_299 a med:Prescription ;
    med:prescribes res:Med_Tamoxifen ; med:prescribedBy res:Doc_Karthik ;
    med:forPatient res:Pat_MUR200 ; med:date "2024-08-13"^^xsd:date ;
    med:dosage "1 tablet" ;
    med:frequency "Twice daily" ;
    med:durationDays 7 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_396 med:issuedPrescription res:Rx_299 .
res:Pat_MUR200 med:hasPrescription res:Rx_299 .

res:Lab_183 a med:LabOrder ;
    med:analyte "CA 15-3" ; med:forPatient res:Pat_MUR200 ;
    med:date "2024-08-13"^^xsd:date ; med:orderedBy res:Doc_Karthik ;
    med:testsFor res:BreastCancer ;
    med:orderStatus "Resulted" ;
    med:hasResult res:Res_183 .

res:Res_183 a med:LabResult ;
    med:analyte "CA 15-3" ; med:value 20.47 ; med:unit "U/mL" ;
    med:refLow 0 ; med:refHigh 30 ; med:outOfRange false ;
    med:date "2024-08-14"^^xsd:date ;
    med:performedBy res:Tech_Mohan .

res:Enc_396 med:orderedTest res:Lab_183 .

res:Inv_306 a med:Invoice ;
    med:forPatient res:Pat_MUR200 ; med:date "2024-08-13"^^xsd:date ;
    med:amount 28014 ; med:paid true ;
    med:status "Settled" .
res:Inv_306 med:coveredBy res:Policy_MUR200 .
res:Pat_MUR200 med:hasInvoice res:Inv_306 .

res:Enc_397 a med:Consultation ;
    med:encounterOf res:Pat_MUR200 ; med:date "2025-08-05"^^xsd:date ;
    med:time "17:15" ;
    med:attendedBy res:Doc_Anand ; med:inDepartment res:Dept_Oncology ;
    med:reason "Review of breast cancer" ;
    med:outcome "Treatment continued" ;
    med:recordedCondition res:Cond_276 ;
    med:hasVitals res:Vit_397 ; med:hasNote res:Note_397 .

res:Vit_397 a med:VitalSigns ;
    med:systolic 120 ; med:diastolic 67 ;
    med:heartRate 87 ; med:temperature 99.9 ;
    med:spo2 98 ;
    med:weightKg 59.2 ;
    med:bmi 20.1 .

res:Note_397 a med:ClinicalNote ;
    med:authorName "Dr. Anand" ;
    med:date "2025-08-05"^^xsd:date ;
    med:noteText "Seen for worsening symptoms over the past week. Reassured. No change to treatment at this stage." .

res:Rx_300 a med:Prescription ;
    med:prescribes res:Med_Tamoxifen ; med:prescribedBy res:Doc_Anand ;
    med:forPatient res:Pat_MUR200 ; med:date "2025-08-05"^^xsd:date ;
    med:dosage "1 dose" ;
    med:frequency "Once daily at night" ;
    med:durationDays 7 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_397 med:issuedPrescription res:Rx_300 .
res:Pat_MUR200 med:hasPrescription res:Rx_300 .

res:Lab_184 a med:LabOrder ;
    med:analyte "CA 15-3" ; med:forPatient res:Pat_MUR200 ;
    med:date "2025-08-05"^^xsd:date ; med:orderedBy res:Doc_Anand ;
    med:testsFor res:BreastCancer ;
    med:orderStatus "Resulted" ;
    med:hasResult res:Res_184 .

res:Res_184 a med:LabResult ;
    med:analyte "CA 15-3" ; med:value 32.78 ; med:unit "U/mL" ;
    med:refLow 0 ; med:refHigh 30 ; med:outOfRange true ;
    med:date "2025-08-06"^^xsd:date ;
    med:performedBy res:Tech_Mohan .

res:Enc_397 med:orderedTest res:Lab_184 .

res:Inv_307 a med:Invoice ;
    med:forPatient res:Pat_MUR200 ; med:date "2025-08-05"^^xsd:date ;
    med:amount 2537 ; med:paid true ;
    med:status "Settled" .
res:Inv_307 med:coveredBy res:Policy_MUR200 .
res:Pat_MUR200 med:hasInvoice res:Inv_307 .

res:Enc_398 a med:FollowUp ;
    med:encounterOf res:Pat_MUR200 ; med:date "2026-08-30"^^xsd:date ;
    med:time "13:30" ;
    med:attendedBy res:Doc_Anand ; med:inDepartment res:Dept_Oncology ;
    med:reason "Review of breast cancer" ;
    med:outcome "Discharged with advice" ;
    med:recordedCondition res:Cond_276 ;
    med:hasVitals res:Vit_398 ; med:hasNote res:Note_398 .

res:Vit_398 a med:VitalSigns ;
    med:systolic 113 ; med:diastolic 84 ;
    med:heartRate 71 ; med:temperature 97.9 ;
    med:spo2 96 ;
    med:weightKg 57.9 ;
    med:bmi 24.9 .

res:Note_398 a med:ClinicalNote ;
    med:authorName "Dr. Anand" ;
    med:date "2026-08-30"^^xsd:date ;
    med:noteText "Referred from general medicine for specialist opinion. Advised on diet, salt restriction and daily walking." .

res:Rx_301 a med:Prescription ;
    med:prescribes res:Med_Tamoxifen ; med:prescribedBy res:Doc_Anand ;
    med:forPatient res:Pat_MUR200 ; med:date "2026-08-30"^^xsd:date ;
    med:dosage "2 tablets" ;
    med:frequency "As required" ;
    med:durationDays 5 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_398 med:issuedPrescription res:Rx_301 .
res:Pat_MUR200 med:hasPrescription res:Rx_301 .

res:Inv_308 a med:Invoice ;
    med:forPatient res:Pat_MUR200 ; med:date "2026-08-30"^^xsd:date ;
    med:amount 5010 ; med:paid false ;
    med:status "Insurance claim pending" .
res:Inv_308 med:coveredBy res:Policy_MUR200 .
res:Pat_MUR200 med:hasInvoice res:Inv_308 .

res:Policy_MUR200 a med:InsurancePolicy ;
    med:policyNumber "ST-984371" ;
    med:issuedBy res:Ins_StarHealth ; med:coveragePercent 90 ;
    med:amount 750000 .
res:Pat_MUR200 med:hasPolicy res:Policy_MUR200 .

res:Pat_GAN201 a med:InPatient ;
    med:name "Ganesh Pillai" ; med:mrn "MRN-GAN201" ; med:photoInitials "GP" ;
    med:sex "Male" ; med:dateOfBirth "1975-03-24"^^xsd:date ; med:age 51 ;
    med:bloodGroup "O-" ; med:phone "+91 95149 682644" ; med:email "ganesh.pillai@example.in" ;
    med:address "35 Bharathi Street, Perungudi, Chennai" ;
    med:primaryPhysician res:Doc_Nithya ;
    med:hasCondition res:Cond_277 , res:Cond_278 .

res:Cond_277 a med:Condition ;
    med:ofDisease res:Hypothyroidism ; med:onsetDate "2025-01-02"^^xsd:date ;
    med:severity "Moderate" ;
    med:clinicalStatus "Active" ;
    med:diagnosedBy res:Doc_Nithya .

res:Cond_278 a med:Condition ;
    med:ofDisease res:Anemia ; med:onsetDate "2026-01-10"^^xsd:date ;
    med:severity "Moderate" ;
    med:clinicalStatus "Resolved" ;
    med:resolvedDate "2026-05-30"^^xsd:date ;
    med:diagnosedBy res:Doc_Joseph .

res:Pat_GAN201 med:hasEncounter res:Enc_399 , res:Enc_400 .

res:Enc_399 a med:Consultation ;
    med:encounterOf res:Pat_GAN201 ; med:date "2024-08-16"^^xsd:date ;
    med:time "15:00" ;
    med:attendedBy res:Doc_Joseph ; med:inDepartment res:Dept_GeneralMedicine ;
    med:reason "First presentation" ;
    med:outcome "Discharged with advice" ;
    med:recordedCondition res:Cond_278 ;
    med:hasVitals res:Vit_399 ; med:hasNote res:Note_399 .

res:Vit_399 a med:VitalSigns ;
    med:systolic 132 ; med:diastolic 75 ;
    med:heartRate 71 ; med:temperature 97.3 ;
    med:spo2 96 ;
    med:weightKg 48.8 ;
    med:bmi 26.7 .

res:Note_399 a med:ClinicalNote ;
    med:authorName "Dr. Joseph" ;
    med:date "2024-08-16"^^xsd:date ;
    med:noteText "Routine review, no new complaints. Continue current therapy, review in three months." .

res:Inv_309 a med:Invoice ;
    med:forPatient res:Pat_GAN201 ; med:date "2024-08-16"^^xsd:date ;
    med:amount 2307 ; med:paid false ;
    med:status "Insurance claim pending" .
res:Inv_309 med:coveredBy res:Policy_GAN201 .
res:Pat_GAN201 med:hasInvoice res:Inv_309 .

res:Enc_400 a med:Consultation ;
    med:encounterOf res:Pat_GAN201 ; med:date "2026-08-24"^^xsd:date ;
    med:time "17:45" ;
    med:attendedBy res:Doc_Nithya ; med:inDepartment res:Dept_Endocrinology ;
    med:reason "Review of hypothyroidism" ;
    med:outcome "Referred for tests" ;
    med:recordedCondition res:Cond_277 ;
    med:hasVitals res:Vit_400 ; med:hasNote res:Note_400 .

res:Vit_400 a med:VitalSigns ;
    med:systolic 109 ; med:diastolic 78 ;
    med:heartRate 62 ; med:temperature 98.9 ;
    med:spo2 97 ;
    med:weightKg 53.0 ;
    med:bmi 24.9 .

res:Note_400 a med:ClinicalNote ;
    med:authorName "Dr. Nithya" ;
    med:date "2026-08-24"^^xsd:date ;
    med:noteText "Patient reports steady improvement since last visit. Advised on diet, salt restriction and daily walking." .

res:Lab_185 a med:LabOrder ;
    med:analyte "TSH" ; med:forPatient res:Pat_GAN201 ;
    med:date "2026-08-24"^^xsd:date ; med:orderedBy res:Doc_Nithya ;
    med:testsFor res:Hypothyroidism ;
    med:orderStatus "Resulted" ;
    med:hasResult res:Res_185 .

res:Res_185 a med:LabResult ;
    med:analyte "TSH" ; med:value 13.61 ; med:unit "mIU/L" ;
    med:refLow 0.4 ; med:refHigh 4 ; med:outOfRange true ;
    med:date "2026-08-25"^^xsd:date ;
    med:performedBy res:Tech_Mohan .

res:Enc_400 med:orderedTest res:Lab_185 .

res:Inv_310 a med:Invoice ;
    med:forPatient res:Pat_GAN201 ; med:date "2026-08-24"^^xsd:date ;
    med:amount 4037 ; med:paid true ;
    med:status "Settled" .
res:Inv_310 med:coveredBy res:Policy_GAN201 .
res:Pat_GAN201 med:hasInvoice res:Inv_310 .

res:Policy_GAN201 a med:InsurancePolicy ;
    med:policyNumber "HD-826803" ;
    med:issuedBy res:Ins_HDFCErgo ; med:coveragePercent 90 ;
    med:amount 1000000 .
res:Pat_GAN201 med:hasPolicy res:Policy_GAN201 .

res:Pat_GAN201 med:assignedBed res:Bed_5 .

res:Pat_NAN202 a med:OutPatient ;
    med:name "Nandini Reddy" ; med:mrn "MRN-NAN202" ; med:photoInitials "NR" ;
    med:sex "Female" ; med:dateOfBirth "2004-10-11"^^xsd:date ; med:age 21 ;
    med:bloodGroup "O-" ; med:phone "+91 93637 750097" ; med:email "nandini.reddy@example.in" ;
    med:address "57 Bharathi Street, Navalur, Chennai" ;
    med:primaryPhysician res:Doc_Joseph ;
    med:hasCondition res:Cond_279 , res:Cond_280 .

res:Cond_279 a med:Condition ;
    med:ofDisease res:UrinaryTractInfection ; med:onsetDate "2025-05-27"^^xsd:date ;
    med:severity "Moderate" ;
    med:clinicalStatus "Active" ;
    med:diagnosedBy res:Doc_Joseph .

res:Cond_280 a med:Condition ;
    med:ofDisease res:ChronicKidneyDisease ; med:onsetDate "2023-08-11"^^xsd:date ;
    med:severity "Moderate" ;
    med:clinicalStatus "Active" ;
    med:diagnosedBy res:Doc_Vandana .

res:Pat_NAN202 med:hasEncounter res:Enc_401 , res:Enc_402 , res:Enc_403 .

res:Enc_401 a med:Consultation ;
    med:encounterOf res:Pat_NAN202 ; med:date "2023-12-13"^^xsd:date ;
    med:time "10:30" ;
    med:attendedBy res:Doc_Suresh ; med:inDepartment res:Dept_GeneralMedicine ;
    med:reason "First presentation" ;
    med:outcome "Discharged with advice" ;
    med:recordedCondition res:Cond_279 ;
    med:hasVitals res:Vit_401 ; med:hasNote res:Note_401 .

res:Vit_401 a med:VitalSigns ;
    med:systolic 130 ; med:diastolic 71 ;
    med:heartRate 89 ; med:temperature 97.6 ;
    med:spo2 100 ;
    med:weightKg 56.3 ;
    med:bmi 26.3 .

res:Note_401 a med:ClinicalNote ;
    med:authorName "Dr. Suresh" ;
    med:date "2023-12-13"^^xsd:date ;
    med:noteText "Reviewed in clinic today. Dose adjusted, repeat bloods before next visit." .

res:Rx_302 a med:Prescription ;
    med:prescribes res:Med_Amoxicillin ; med:prescribedBy res:Doc_Suresh ;
    med:forPatient res:Pat_NAN202 ; med:date "2023-12-13"^^xsd:date ;
    med:dosage "1 tablet" ;
    med:frequency "As required" ;
    med:durationDays 14 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_401 med:issuedPrescription res:Rx_302 .
res:Pat_NAN202 med:hasPrescription res:Rx_302 .

res:Lab_186 a med:LabOrder ;
    med:analyte "Urine WBC" ; med:forPatient res:Pat_NAN202 ;
    med:date "2023-12-13"^^xsd:date ; med:orderedBy res:Doc_Suresh ;
    med:testsFor res:UrinaryTractInfection ;
    med:orderStatus "Resulted" ;
    med:hasResult res:Res_186 .

res:Res_186 a med:LabResult ;
    med:analyte "Urine WBC" ; med:value 52.45 ; med:unit "/hpf" ;
    med:refLow 0 ; med:refHigh 5 ; med:outOfRange true ;
    med:date "2023-12-14"^^xsd:date ;
    med:performedBy res:Tech_Mohan .

res:Enc_401 med:orderedTest res:Lab_186 .

res:Inv_311 a med:Invoice ;
    med:forPatient res:Pat_NAN202 ; med:date "2023-12-13"^^xsd:date ;
    med:amount 3184 ; med:paid false ;
    med:status "Insurance claim pending" .
res:Inv_311 med:coveredBy res:Policy_NAN202 .
res:Pat_NAN202 med:hasInvoice res:Inv_311 .

res:Enc_402 a med:Consultation ;
    med:encounterOf res:Pat_NAN202 ; med:date "2025-04-05"^^xsd:date ;
    med:time "17:15" ;
    med:attendedBy res:Doc_Joseph ; med:inDepartment res:Dept_GeneralMedicine ;
    med:reason "Review of urinary tract infection" ;
    med:outcome "Treatment continued" ;
    med:recordedCondition res:Cond_279 ;
    med:hasVitals res:Vit_402 ; med:hasNote res:Note_402 .

res:Vit_402 a med:VitalSigns ;
    med:systolic 134 ; med:diastolic 71 ;
    med:heartRate 79 ; med:temperature 97.6 ;
    med:spo2 99 ;
    med:weightKg 65.9 ;
    med:bmi 24.7 .

res:Note_402 a med:ClinicalNote ;
    med:authorName "Dr. Joseph" ;
    med:date "2025-04-05"^^xsd:date ;
    med:noteText "Seen for worsening symptoms over the past week. Advised on diet, salt restriction and daily walking." .

res:Rx_303 a med:Prescription ;
    med:prescribes res:Med_Amoxicillin ; med:prescribedBy res:Doc_Joseph ;
    med:forPatient res:Pat_NAN202 ; med:date "2025-04-05"^^xsd:date ;
    med:dosage "1 tablet" ;
    med:frequency "Three times daily" ;
    med:durationDays 10 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_402 med:issuedPrescription res:Rx_303 .
res:Pat_NAN202 med:hasPrescription res:Rx_303 .

res:Lab_187 a med:LabOrder ;
    med:analyte "Urine WBC" ; med:forPatient res:Pat_NAN202 ;
    med:date "2025-04-05"^^xsd:date ; med:orderedBy res:Doc_Joseph ;
    med:testsFor res:UrinaryTractInfection ;
    med:orderStatus "Resulted" ;
    med:hasResult res:Res_187 .

res:Res_187 a med:LabResult ;
    med:analyte "Urine WBC" ; med:value 32.32 ; med:unit "/hpf" ;
    med:refLow 0 ; med:refHigh 5 ; med:outOfRange true ;
    med:date "2025-04-06"^^xsd:date ;
    med:performedBy res:Tech_Mohan .

res:Enc_402 med:orderedTest res:Lab_187 .

res:Inv_312 a med:Invoice ;
    med:forPatient res:Pat_NAN202 ; med:date "2025-04-05"^^xsd:date ;
    med:amount 2928 ; med:paid true ;
    med:status "Settled" .
res:Inv_312 med:coveredBy res:Policy_NAN202 .
res:Pat_NAN202 med:hasInvoice res:Inv_312 .

res:Enc_403 a med:Consultation ;
    med:encounterOf res:Pat_NAN202 ; med:date "2026-08-30"^^xsd:date ;
    med:time "18:00" ;
    med:attendedBy res:Doc_Vandana ; med:inDepartment res:Dept_Nephrology ;
    med:reason "Review of chronic kidney disease" ;
    med:outcome "Follow up scheduled" ;
    med:recordedCondition res:Cond_280 ;
    med:hasVitals res:Vit_403 ; med:hasNote res:Note_403 .

res:Vit_403 a med:VitalSigns ;
    med:systolic 120 ; med:diastolic 80 ;
    med:heartRate 99 ; med:temperature 98.4 ;
    med:spo2 96 ;
    med:weightKg 72.6 ;
    med:bmi 21.8 .

res:Note_403 a med:ClinicalNote ;
    med:authorName "Dr. Vandana" ;
    med:date "2026-08-30"^^xsd:date ;
    med:noteText "Reviewed in clinic today. Advised on diet, salt restriction and daily walking." .

res:Rx_304 a med:Prescription ;
    med:prescribes res:Med_Telmisartan ; med:prescribedBy res:Doc_Vandana ;
    med:forPatient res:Pat_NAN202 ; med:date "2026-08-30"^^xsd:date ;
    med:dosage "2 tablets" ;
    med:frequency "As required" ;
    med:durationDays 90 ;
    med:dispensed true ;
    med:status "Active" .

res:Enc_403 med:issuedPrescription res:Rx_304 .
res:Pat_NAN202 med:hasPrescription res:Rx_304 .

res:Lab_188 a med:LabOrder ;
    med:analyte "Creatinine" ; med:forPatient res:Pat_NAN202 ;
    med:date "2026-08-30"^^xsd:date ; med:orderedBy res:Doc_Vandana ;
    med:testsFor res:ChronicKidneyDisease ;
    med:orderStatus "Resulted" ;
    med:hasResult res:Res_188 .

res:Res_188 a med:LabResult ;
    med:analyte "Creatinine" ; med:value 5.12 ; med:unit "mg/dL" ;
    med:refLow 0.6 ; med:refHigh 1.2 ; med:outOfRange true ;
    med:date "2026-08-30"^^xsd:date ;
    med:performedBy res:Tech_Mohan .

res:Lab_189 a med:LabOrder ;
    med:analyte "eGFR" ; med:forPatient res:Pat_NAN202 ;
    med:date "2026-08-30"^^xsd:date ; med:orderedBy res:Doc_Vandana ;
    med:testsFor res:ChronicKidneyDisease ;
    med:orderStatus "Resulted" ;
    med:hasResult res:Res_189 .

res:Res_189 a med:LabResult ;
    med:analyte "eGFR" ; med:value 49.28 ; med:unit "mL/min" ;
    med:refLow 90 ; med:refHigh 120 ; med:outOfRange true ;
    med:date "2026-08-30"^^xsd:date ;
    med:performedBy res:Tech_Mohan .

res:Enc_403 med:orderedTest res:Lab_188 , res:Lab_189 .

res:Inv_313 a med:Invoice ;
    med:forPatient res:Pat_NAN202 ; med:date "2026-08-30"^^xsd:date ;
    med:amount 6147 ; med:paid false ;
    med:status "Insurance claim pending" .
res:Inv_313 med:coveredBy res:Policy_NAN202 .
res:Pat_NAN202 med:hasInvoice res:Inv_313 .

res:Policy_NAN202 a med:InsurancePolicy ;
    med:policyNumber "HD-627131" ;
    med:issuedBy res:Ins_HDFCErgo ; med:coveragePercent 90 ;
    med:amount 750000 .
res:Pat_NAN202 med:hasPolicy res:Policy_NAN202 .

res:Pat_ANI203 a med:InPatient ;
    med:name "Anil Rao" ; med:mrn "MRN-ANI203" ; med:photoInitials "AR" ;
    med:sex "Male" ; med:dateOfBirth "1972-08-11"^^xsd:date ; med:age 54 ;
    med:bloodGroup "AB+" ; med:phone "+91 96893 319234" ; med:email "anil.rao@example.in" ;
    med:address "68 Bharathi Street, Navalur, Chennai" ;
    med:primaryPhysician res:Doc_Vikram ;
    med:hasCondition res:Cond_281 , res:Cond_282 , res:Cond_283 , res:Cond_284 , res:Cond_285 .

res:Cond_281 a med:Condition ;
    med:ofDisease res:Osteoarthritis ; med:onsetDate "2025-11-21"^^xsd:date ;
    med:severity "Mild" ;
    med:clinicalStatus "Active" ;
    med:diagnosedBy res:Doc_Vikram .

res:Cond_282 a med:Condition ;
    med:ofDisease res:Hypertension ; med:onsetDate "2023-01-15"^^xsd:date ;
    med:severity "Moderate" ;
    med:clinicalStatus "Active" ;
    med:diagnosedBy res:Doc_Suresh .

res:Cond_283 a med:Condition ;
    med:ofDisease res:Pneumonia ; med:onsetDate "2024-10-12"^^xsd:date ;
    med:severity "Moderate" ;
    med:clinicalStatus "Active" ;
    med:diagnosedBy res:Doc_Joseph .

res:Cond_284 a med:Condition ;
    med:ofDisease res:UrinaryTractInfection ; med:onsetDate "2024-11-11"^^xsd:date ;
    med:severity "Mild" ;
    med:clinicalStatus "Resolved" ;
    med:resolvedDate "2025-04-04"^^xsd:date ;
    med:diagnosedBy res:Doc_Suresh .

res:Cond_285 a med:Condition ;
    med:ofDisease res:TypeIIDiabetes ; med:onsetDate "2023-09-02"^^xsd:date ;
    med:severity "Moderate" ;
    med:clinicalStatus "Active" ;
    med:diagnosedBy res:Doc_Nithya .

res:Pat_ANI203 med:hasEncounter res:Enc_404 , res:Enc_405 , res:Enc_406 , res:Enc_407 .

res:Enc_404 a med:Consultation ;
    med:encounterOf res:Pat_ANI203 ; med:date "2023-07-30"^^xsd:date ;
    med:time "13:45" ;
    med:attendedBy res:Doc_Joseph ; med:inDepartment res:Dept_GeneralMedicine ;
    med:reason "First presentation" ;
    med:outcome "Treatment continued" ;
    med:recordedCondition res:Cond_284 ;
    med:hasVitals res:Vit_404 ; med:hasNote res:Note_404 .

res:Vit_404 a med:VitalSigns ;
    med:systolic 165 ; med:diastolic 90 ;
    med:heartRate 97 ; med:temperature 97.5 ;
    med:spo2 97 ;
    med:weightKg 61.2 ;
    med:bmi 19.2 .

res:Note_404 a med:ClinicalNote ;
    med:authorName "Dr. Joseph" ;
    med:date "2023-07-30"^^xsd:date ;
    med:noteText "Routine review, no new complaints. Dose adjusted, repeat bloods before next visit." .

res:Rx_305 a med:Prescription ;
    med:prescribes res:Med_Nitrofurantoin ; med:prescribedBy res:Doc_Joseph ;
    med:forPatient res:Pat_ANI203 ; med:date "2023-07-30"^^xsd:date ;
    med:dosage "1 tablet" ;
    med:frequency "Once daily" ;
    med:durationDays 14 ;
    med:dispensed true ;
    med:status "Completed" .

res:Rx_306 a med:Prescription ;
    med:prescribes res:Med_Amoxicillin ; med:prescribedBy res:Doc_Joseph ;
    med:forPatient res:Pat_ANI203 ; med:date "2023-07-30"^^xsd:date ;
    med:dosage "1 tablet" ;
    med:frequency "Once daily at night" ;
    med:durationDays 7 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_404 med:issuedPrescription res:Rx_305 , res:Rx_306 .
res:Pat_ANI203 med:hasPrescription res:Rx_305 , res:Rx_306 .

res:Lab_190 a med:LabOrder ;
    med:analyte "Urine WBC" ; med:forPatient res:Pat_ANI203 ;
    med:date "2023-07-30"^^xsd:date ; med:orderedBy res:Doc_Joseph ;
    med:testsFor res:UrinaryTractInfection ;
    med:orderStatus "Resulted" ;
    med:hasResult res:Res_190 .

res:Res_190 a med:LabResult ;
    med:analyte "Urine WBC" ; med:value 22.19 ; med:unit "/hpf" ;
    med:refLow 0 ; med:refHigh 5 ; med:outOfRange true ;
    med:date "2023-07-31"^^xsd:date ;
    med:performedBy res:Tech_Mohan .

res:Enc_404 med:orderedTest res:Lab_190 .

res:Inv_314 a med:Invoice ;
    med:forPatient res:Pat_ANI203 ; med:date "2023-07-30"^^xsd:date ;
    med:amount 4649 ; med:paid true ;
    med:status "Settled" .
res:Inv_314 med:coveredBy res:Policy_ANI203 .
res:Pat_ANI203 med:hasInvoice res:Inv_314 .

res:Enc_405 a med:FollowUp ;
    med:encounterOf res:Pat_ANI203 ; med:date "2024-08-09"^^xsd:date ;
    med:time "14:30" ;
    med:attendedBy res:Doc_Vikram ; med:inDepartment res:Dept_Orthopedics ;
    med:reason "Review of osteoarthritis" ;
    med:outcome "Referred for tests" ;
    med:recordedCondition res:Cond_281 ;
    med:hasVitals res:Vit_405 ; med:hasNote res:Note_405 .

res:Vit_405 a med:VitalSigns ;
    med:systolic 159 ; med:diastolic 101 ;
    med:heartRate 90 ; med:temperature 100.3 ;
    med:spo2 99 ;
    med:weightKg 65.7 ;
    med:bmi 19.6 .

res:Note_405 a med:ClinicalNote ;
    med:authorName "Dr. Vikram" ;
    med:date "2024-08-09"^^xsd:date ;
    med:noteText "Seen for worsening symptoms over the past week. Dose adjusted, repeat bloods before next visit." .

res:Rx_307 a med:Prescription ;
    med:prescribes res:Med_Ibuprofen ; med:prescribedBy res:Doc_Vikram ;
    med:forPatient res:Pat_ANI203 ; med:date "2024-08-09"^^xsd:date ;
    med:dosage "1 tablet" ;
    med:frequency "Once daily" ;
    med:durationDays 90 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_405 med:issuedPrescription res:Rx_307 .
res:Pat_ANI203 med:hasPrescription res:Rx_307 .

res:Inv_315 a med:Invoice ;
    med:forPatient res:Pat_ANI203 ; med:date "2024-08-09"^^xsd:date ;
    med:amount 5376 ; med:paid true ;
    med:status "Settled" .
res:Inv_315 med:coveredBy res:Policy_ANI203 .
res:Pat_ANI203 med:hasInvoice res:Inv_315 .

res:Enc_406 a med:FollowUp ;
    med:encounterOf res:Pat_ANI203 ; med:date "2025-08-30"^^xsd:date ;
    med:time "15:30" ;
    med:attendedBy res:Doc_Vikram ; med:inDepartment res:Dept_Orthopedics ;
    med:reason "Review of osteoarthritis" ;
    med:outcome "Discharged with advice" ;
    med:recordedCondition res:Cond_281 ;
    med:hasVitals res:Vit_406 ; med:hasNote res:Note_406 .

res:Vit_406 a med:VitalSigns ;
    med:systolic 153 ; med:diastolic 87 ;
    med:heartRate 96 ; med:temperature 98.1 ;
    med:spo2 100 ;
    med:weightKg 50.0 ;
    med:bmi 21.3 .

res:Note_406 a med:ClinicalNote ;
    med:authorName "Dr. Vikram" ;
    med:date "2025-08-30"^^xsd:date ;
    med:noteText "Post discharge review. Continue current therapy, review in three months." .

res:Rx_308 a med:Prescription ;
    med:prescribes res:Med_Ibuprofen ; med:prescribedBy res:Doc_Vikram ;
    med:forPatient res:Pat_ANI203 ; med:date "2025-08-30"^^xsd:date ;
    med:dosage "2 tablets" ;
    med:frequency "As required" ;
    med:durationDays 60 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_406 med:issuedPrescription res:Rx_308 .
res:Pat_ANI203 med:hasPrescription res:Rx_308 .

res:Inv_316 a med:Invoice ;
    med:forPatient res:Pat_ANI203 ; med:date "2025-08-30"^^xsd:date ;
    med:amount 4231 ; med:paid true ;
    med:status "Settled" .
res:Inv_316 med:coveredBy res:Policy_ANI203 .
res:Pat_ANI203 med:hasInvoice res:Inv_316 .

res:Enc_407 a med:Admission ;
    med:encounterOf res:Pat_ANI203 ; med:date "2026-08-30"^^xsd:date ;
    med:time "18:30" ;
    med:attendedBy res:Doc_Vikram ; med:inDepartment res:Dept_Orthopedics ;
    med:reason "Review of osteoarthritis" ;
    med:outcome "Admitted to ward" ;
    med:lengthOfStay 8 ;
    med:recordedCondition res:Cond_281 ;
    med:hasVitals res:Vit_407 ; med:hasNote res:Note_407 .

res:Vit_407 a med:VitalSigns ;
    med:systolic 140 ; med:diastolic 88 ;
    med:heartRate 67 ; med:temperature 98.1 ;
    med:spo2 99 ;
    med:weightKg 64.7 ;
    med:bmi 26.3 .

res:Note_407 a med:ClinicalNote ;
    med:authorName "Dr. Vikram" ;
    med:date "2026-08-30"^^xsd:date ;
    med:noteText "Seen for worsening symptoms over the past week. Counselled on medication adherence. Red flag symptoms explained." .

res:Rx_309 a med:Prescription ;
    med:prescribes res:Med_Ibuprofen ; med:prescribedBy res:Doc_Vikram ;
    med:forPatient res:Pat_ANI203 ; med:date "2026-08-30"^^xsd:date ;
    med:dosage "1 tablet" ;
    med:frequency "Once daily" ;
    med:durationDays 60 ;
    med:dispensed true ;
    med:status "Active" .

res:Enc_407 med:issuedPrescription res:Rx_309 .
res:Pat_ANI203 med:hasPrescription res:Rx_309 .

res:Inv_317 a med:Invoice ;
    med:forPatient res:Pat_ANI203 ; med:date "2026-08-30"^^xsd:date ;
    med:amount 140804 ; med:paid true ;
    med:status "Settled" .
res:Inv_317 med:coveredBy res:Policy_ANI203 .
res:Pat_ANI203 med:hasInvoice res:Inv_317 .

res:Policy_ANI203 a med:InsurancePolicy ;
    med:policyNumber "ST-560025" ;
    med:issuedBy res:Ins_StarHealth ; med:coveragePercent 85 ;
    med:amount 1000000 .
res:Pat_ANI203 med:hasPolicy res:Policy_ANI203 .

res:Pat_ANI203 med:assignedBed res:Bed_13 .

res:Pat_DIV204 a med:OutPatient ;
    med:name "Divya Prabhu" ; med:mrn "MRN-DIV204" ; med:photoInitials "DP" ;
    med:sex "Female" ; med:dateOfBirth "1976-03-15"^^xsd:date ; med:age 50 ;
    med:bloodGroup "A+" ; med:phone "+91 98245 120079" ; med:email "divya.prabhu@example.in" ;
    med:address "36 Anna Salai, Kelambakkam, Chennai" ;
    med:primaryPhysician res:Doc_Joseph ;
    med:hasCondition res:Cond_286 .

res:Cond_286 a med:Condition ;
    med:ofDisease res:UrinaryTractInfection ; med:onsetDate "2025-11-21"^^xsd:date ;
    med:severity "Mild" ;
    med:clinicalStatus "Resolved" ;
    med:resolvedDate "2026-04-03"^^xsd:date ;
    med:diagnosedBy res:Doc_Suresh .

res:Pat_DIV204 med:hasEncounter res:Enc_408 .

res:Enc_408 a med:Consultation ;
    med:encounterOf res:Pat_DIV204 ; med:date "2026-08-19"^^xsd:date ;
    med:time "13:15" ;
    med:attendedBy res:Doc_Joseph ; med:inDepartment res:Dept_GeneralMedicine ;
    med:reason "First presentation" ;
    med:outcome "Discharged with advice" ;
    med:recordedCondition res:Cond_286 ;
    med:hasVitals res:Vit_408 ; med:hasNote res:Note_408 .

res:Vit_408 a med:VitalSigns ;
    med:systolic 112 ; med:diastolic 67 ;
    med:heartRate 103 ; med:temperature 100.5 ;
    med:spo2 97 ;
    med:weightKg 60.1 ;
    med:bmi 22.7 .

res:Note_408 a med:ClinicalNote ;
    med:authorName "Dr. Joseph" ;
    med:date "2026-08-19"^^xsd:date ;
    med:noteText "Patient reports steady improvement since last visit. Advised on diet, salt restriction and daily walking." .

res:Rx_310 a med:Prescription ;
    med:prescribes res:Med_Nitrofurantoin ; med:prescribedBy res:Doc_Joseph ;
    med:forPatient res:Pat_DIV204 ; med:date "2026-08-19"^^xsd:date ;
    med:dosage "1 dose" ;
    med:frequency "Once daily" ;
    med:durationDays 10 ;
    med:dispensed false ;
    med:status "Completed" .

res:Rx_311 a med:Prescription ;
    med:prescribes res:Med_Amoxicillin ; med:prescribedBy res:Doc_Joseph ;
    med:forPatient res:Pat_DIV204 ; med:date "2026-08-19"^^xsd:date ;
    med:dosage "1 dose" ;
    med:frequency "Once daily" ;
    med:durationDays 10 ;
    med:dispensed false ;
    med:status "Completed" .

res:Enc_408 med:issuedPrescription res:Rx_310 , res:Rx_311 .
res:Pat_DIV204 med:hasPrescription res:Rx_310 , res:Rx_311 .

res:Lab_191 a med:LabOrder ;
    med:analyte "Urine WBC" ; med:forPatient res:Pat_DIV204 ;
    med:date "2026-08-19"^^xsd:date ; med:orderedBy res:Doc_Joseph ;
    med:testsFor res:UrinaryTractInfection ;
    med:orderStatus "Resulted" ;
    med:hasResult res:Res_191 .

res:Res_191 a med:LabResult ;
    med:analyte "Urine WBC" ; med:value 7.57 ; med:unit "/hpf" ;
    med:refLow 0 ; med:refHigh 5 ; med:outOfRange true ;
    med:date "2026-08-20"^^xsd:date ;
    med:performedBy res:Tech_Mohan .

res:Enc_408 med:orderedTest res:Lab_191 .

res:Pat_PAD205 a med:OutPatient ;
    med:name "Padma Raghavan" ; med:mrn "MRN-PAD205" ; med:photoInitials "PR" ;
    med:sex "Female" ; med:dateOfBirth "1998-12-08"^^xsd:date ; med:age 27 ;
    med:bloodGroup "AB-" ; med:phone "+91 93630 841679" ; med:email "padma.raghavan@example.in" ;
    med:address "29 Bharathi Street, Thoraipakkam, Chennai" ;
    med:primaryPhysician res:Doc_Farida ;
    med:hasCondition res:Cond_287 , res:Cond_288 , res:Cond_289 .

res:Cond_287 a med:Condition ;
    med:ofDisease res:CoronaryArteryDisease ; med:onsetDate "2021-02-20"^^xsd:date ;
    med:severity "Moderate" ;
    med:clinicalStatus "Active" ;
    med:diagnosedBy res:Doc_Farida .

res:Cond_288 a med:Condition ;
    med:ofDisease res:AtrialFibrillation ; med:onsetDate "2019-01-31"^^xsd:date ;
    med:severity "Moderate" ;
    med:clinicalStatus "Active" ;
    med:diagnosedBy res:Doc_Farida .

res:Cond_289 a med:Condition ;
    med:ofDisease res:LungCancer ; med:onsetDate "2024-12-15"^^xsd:date ;
    med:severity "Moderate" ;
    med:clinicalStatus "Resolved" ;
    med:resolvedDate "2025-05-17"^^xsd:date ;
    med:diagnosedBy res:Doc_Anand .

res:Pat_PAD205 med:hasEncounter res:Enc_409 , res:Enc_410 , res:Enc_411 , res:Enc_412 , res:Enc_413 , res:Enc_414 .

res:Enc_409 a med:Consultation ;
    med:encounterOf res:Pat_PAD205 ; med:date "2023-03-18"^^xsd:date ;
    med:time "12:00" ;
    med:attendedBy res:Doc_Ramesh ; med:inDepartment res:Dept_Cardiology ;
    med:reason "First presentation" ;
    med:outcome "Referred for tests" ;
    med:recordedCondition res:Cond_287 ;
    med:hasVitals res:Vit_409 ; med:hasNote res:Note_409 .

res:Vit_409 a med:VitalSigns ;
    med:systolic 134 ; med:diastolic 80 ;
    med:heartRate 63 ; med:temperature 98.5 ;
    med:spo2 99 ;
    med:weightKg 67.7 ;
    med:bmi 23.5 .

res:Note_409 a med:ClinicalNote ;
    med:authorName "Dr. Ramesh" ;
    med:date "2023-03-18"^^xsd:date ;
    med:noteText "Post discharge review. Continue current therapy, review in three months." .

res:Rx_312 a med:Prescription ;
    med:prescribes res:Med_Clopidogrel ; med:prescribedBy res:Doc_Ramesh ;
    med:forPatient res:Pat_PAD205 ; med:date "2023-03-18"^^xsd:date ;
    med:dosage "2 tablets" ;
    med:frequency "Three times daily" ;
    med:durationDays 60 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_409 med:issuedPrescription res:Rx_312 .
res:Pat_PAD205 med:hasPrescription res:Rx_312 .

res:Inv_318 a med:Invoice ;
    med:forPatient res:Pat_PAD205 ; med:date "2023-03-18"^^xsd:date ;
    med:amount 955 ; med:paid false ;
    med:status "Awaiting payment" .
res:Pat_PAD205 med:hasInvoice res:Inv_318 .

res:Enc_410 a med:Admission ;
    med:encounterOf res:Pat_PAD205 ; med:date "2023-12-23"^^xsd:date ;
    med:time "17:45" ;
    med:attendedBy res:Doc_Anand ; med:inDepartment res:Dept_Oncology ;
    med:reason "Review of lung cancer" ;
    med:outcome "Admitted to ward" ;
    med:lengthOfStay 11 ;
    med:recordedCondition res:Cond_289 ;
    med:hasVitals res:Vit_410 ; med:hasNote res:Note_410 .

res:Vit_410 a med:VitalSigns ;
    med:systolic 129 ; med:diastolic 70 ;
    med:heartRate 103 ; med:temperature 97.9 ;
    med:spo2 96 ;
    med:weightKg 51.3 ;
    med:bmi 21.1 .

res:Note_410 a med:ClinicalNote ;
    med:authorName "Dr. Anand" ;
    med:date "2023-12-23"^^xsd:date ;
    med:noteText "Routine review, no new complaints. Continue current therapy, review in three months." .

res:Lab_192 a med:LabOrder ;
    med:analyte "CEA" ; med:forPatient res:Pat_PAD205 ;
    med:date "2023-12-23"^^xsd:date ; med:orderedBy res:Doc_Anand ;
    med:testsFor res:LungCancer ;
    med:orderStatus "Resulted" ;
    med:hasResult res:Res_192 .

res:Res_192 a med:LabResult ;
    med:analyte "CEA" ; med:value 43.56 ; med:unit "ng/mL" ;
    med:refLow 0 ; med:refHigh 3 ; med:outOfRange true ;
    med:date "2023-12-24"^^xsd:date ;
    med:performedBy res:Tech_Mohan .

res:Enc_410 med:orderedTest res:Lab_192 .

res:Inv_319 a med:Invoice ;
    med:forPatient res:Pat_PAD205 ; med:date "2023-12-23"^^xsd:date ;
    med:amount 334258 ; med:paid true ;
    med:status "Settled" .
res:Pat_PAD205 med:hasInvoice res:Inv_319 .

res:Enc_411 a med:Consultation ;
    med:encounterOf res:Pat_PAD205 ; med:date "2024-08-12"^^xsd:date ;
    med:time "09:15" ;
    med:attendedBy res:Doc_Anand ; med:inDepartment res:Dept_Oncology ;
    med:reason "Review of lung cancer" ;
    med:outcome "Follow up scheduled" ;
    med:recordedCondition res:Cond_289 ;
    med:hasVitals res:Vit_411 ; med:hasNote res:Note_411 .

res:Vit_411 a med:VitalSigns ;
    med:systolic 121 ; med:diastolic 78 ;
    med:heartRate 74 ; med:temperature 98.1 ;
    med:spo2 97 ;
    med:weightKg 66.9 ;
    med:bmi 21.5 .

res:Note_411 a med:ClinicalNote ;
    med:authorName "Dr. Anand" ;
    med:date "2024-08-12"^^xsd:date ;
    med:noteText "Presents with a two day history of symptoms. Advised on diet, salt restriction and daily walking." .

res:Lab_193 a med:LabOrder ;
    med:analyte "CEA" ; med:forPatient res:Pat_PAD205 ;
    med:date "2024-08-12"^^xsd:date ; med:orderedBy res:Doc_Anand ;
    med:testsFor res:LungCancer ;
    med:orderStatus "Resulted" ;
    med:hasResult res:Res_193 .

res:Res_193 a med:LabResult ;
    med:analyte "CEA" ; med:value 12.91 ; med:unit "ng/mL" ;
    med:refLow 0 ; med:refHigh 3 ; med:outOfRange true ;
    med:date "2024-08-13"^^xsd:date ;
    med:performedBy res:Tech_Mohan .

res:Enc_411 med:orderedTest res:Lab_193 .

res:Inv_320 a med:Invoice ;
    med:forPatient res:Pat_PAD205 ; med:date "2024-08-12"^^xsd:date ;
    med:amount 1267 ; med:paid true ;
    med:status "Settled" .
res:Pat_PAD205 med:hasInvoice res:Inv_320 .

res:Enc_412 a med:Consultation ;
    med:encounterOf res:Pat_PAD205 ; med:date "2025-04-30"^^xsd:date ;
    med:time "18:00" ;
    med:attendedBy res:Doc_Farida ; med:inDepartment res:Dept_Cardiology ;
    med:reason "Review of coronary artery disease" ;
    med:outcome "Referred for tests" ;
    med:recordedCondition res:Cond_287 ;
    med:hasVitals res:Vit_412 ; med:hasNote res:Note_412 .

res:Vit_412 a med:VitalSigns ;
    med:systolic 114 ; med:diastolic 72 ;
    med:heartRate 75 ; med:temperature 98.1 ;
    med:spo2 99 ;
    med:weightKg 59.4 ;
    med:bmi 26.7 .

res:Note_412 a med:ClinicalNote ;
    med:authorName "Dr. Farida" ;
    med:date "2025-04-30"^^xsd:date ;
    med:noteText "Patient reports steady improvement since last visit. Dose adjusted, repeat bloods before next visit." .

res:Rx_313 a med:Prescription ;
    med:prescribes res:Med_Aspirin ; med:prescribedBy res:Doc_Farida ;
    med:forPatient res:Pat_PAD205 ; med:date "2025-04-30"^^xsd:date ;
    med:dosage "1 dose" ;
    med:frequency "Once daily at night" ;
    med:durationDays 90 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_412 med:issuedPrescription res:Rx_313 .
res:Pat_PAD205 med:hasPrescription res:Rx_313 .

res:Lab_194 a med:LabOrder ;
    med:analyte "Troponin I" ; med:forPatient res:Pat_PAD205 ;
    med:date "2025-04-30"^^xsd:date ; med:orderedBy res:Doc_Farida ;
    med:testsFor res:CoronaryArteryDisease ;
    med:orderStatus "Resulted" ;
    med:hasResult res:Res_194 .

res:Res_194 a med:LabResult ;
    med:analyte "Troponin I" ; med:value 3.22 ; med:unit "ng/mL" ;
    med:refLow 0 ; med:refHigh 0.04 ; med:outOfRange true ;
    med:date "2025-05-01"^^xsd:date ;
    med:performedBy res:Tech_Mohan .

res:Enc_412 med:orderedTest res:Lab_194 .

res:Inv_321 a med:Invoice ;
    med:forPatient res:Pat_PAD205 ; med:date "2025-04-30"^^xsd:date ;
    med:amount 4374 ; med:paid false ;
    med:status "Awaiting payment" .
res:Pat_PAD205 med:hasInvoice res:Inv_321 .

res:Enc_413 a med:Consultation ;
    med:encounterOf res:Pat_PAD205 ; med:date "2025-12-12"^^xsd:date ;
    med:time "08:30" ;
    med:attendedBy res:Doc_Anand ; med:inDepartment res:Dept_Oncology ;
    med:reason "Review of lung cancer" ;
    med:outcome "Discharged with advice" ;
    med:recordedCondition res:Cond_289 ;
    med:hasVitals res:Vit_413 ; med:hasNote res:Note_413 .

res:Vit_413 a med:VitalSigns ;
    med:systolic 117 ; med:diastolic 84 ;
    med:heartRate 101 ; med:temperature 99.1 ;
    med:spo2 96 ;
    med:weightKg 74.5 ;
    med:bmi 22.9 .

res:Note_413 a med:ClinicalNote ;
    med:authorName "Dr. Anand" ;
    med:date "2025-12-12"^^xsd:date ;
    med:noteText "Patient reports steady improvement since last visit. Referral raised to the relevant specialty." .

res:Inv_322 a med:Invoice ;
    med:forPatient res:Pat_PAD205 ; med:date "2025-12-12"^^xsd:date ;
    med:amount 3757 ; med:paid true ;
    med:status "Settled" .
res:Pat_PAD205 med:hasInvoice res:Inv_322 .

res:Enc_414 a med:DayCareVisit ;
    med:encounterOf res:Pat_PAD205 ; med:date "2026-08-28"^^xsd:date ;
    med:time "17:00" ;
    med:attendedBy res:Doc_Ramesh ; med:inDepartment res:Dept_Cardiology ;
    med:reason "Review of atrial fibrillation" ;
    med:outcome "Referred for tests" ;
    med:recordedCondition res:Cond_288 ;
    med:hasVitals res:Vit_414 ; med:hasNote res:Note_414 .

res:Vit_414 a med:VitalSigns ;
    med:systolic 132 ; med:diastolic 72 ;
    med:heartRate 97 ; med:temperature 99.0 ;
    med:spo2 97 ;
    med:weightKg 64.9 ;
    med:bmi 22.2 .

res:Note_414 a med:ClinicalNote ;
    med:authorName "Dr. Ramesh" ;
    med:date "2026-08-28"^^xsd:date ;
    med:noteText "Patient reports steady improvement since last visit. Advised on diet, salt restriction and daily walking." .

res:Inv_323 a med:Invoice ;
    med:forPatient res:Pat_PAD205 ; med:date "2026-08-28"^^xsd:date ;
    med:amount 6270 ; med:paid true ;
    med:status "Settled" .
res:Pat_PAD205 med:hasInvoice res:Inv_323 .

res:Appt_63 a med:Appointment ;
    med:forPatient res:Pat_PAD205 ; med:appointmentWith res:Doc_Farida ;
    med:date "2026-10-13"^^xsd:date ;
    med:time "12:40" ;
    med:inDepartment res:Dept_Cardiology ;
    med:status "Scheduled" .
res:Pat_PAD205 med:hasAppointment res:Appt_63 .

res:Pat_NIR206 a med:OutPatient ;
    med:name "Nirmala Rao" ; med:mrn "MRN-NIR206" ; med:photoInitials "NR" ;
    med:sex "Female" ; med:dateOfBirth "1953-10-26"^^xsd:date ; med:age 72 ;
    med:bloodGroup "AB+" ; med:phone "+91 91984 947975" ; med:email "nirmala.rao@example.in" ;
    med:address "86 GST Road, Chromepet, Chennai" ;
    med:primaryPhysician res:Doc_Joseph ;
    med:allergicTo res:Allergen_Iodine ;
    med:hasCondition res:Cond_290 .

res:Cond_290 a med:Condition ;
    med:ofDisease res:Dengue ; med:onsetDate "2025-02-20"^^xsd:date ;
    med:severity "Mild" ;
    med:clinicalStatus "Active" ;
    med:diagnosedBy res:Doc_Joseph .

res:Pat_NIR206 med:hasEncounter res:Enc_415 , res:Enc_416 .

res:Enc_415 a med:Consultation ;
    med:encounterOf res:Pat_NIR206 ; med:date "2024-08-08"^^xsd:date ;
    med:time "08:30" ;
    med:attendedBy res:Doc_Joseph ; med:inDepartment res:Dept_GeneralMedicine ;
    med:reason "First presentation" ;
    med:outcome "Referred for tests" ;
    med:recordedCondition res:Cond_290 ;
    med:hasVitals res:Vit_415 ; med:hasNote res:Note_415 .

res:Vit_415 a med:VitalSigns ;
    med:systolic 126 ; med:diastolic 75 ;
    med:heartRate 90 ; med:temperature 98.2 ;
    med:spo2 98 ;
    med:weightKg 68.4 ;
    med:bmi 24.7 .

res:Note_415 a med:ClinicalNote ;
    med:authorName "Dr. Joseph" ;
    med:date "2024-08-08"^^xsd:date ;
    med:noteText "Patient reports steady improvement since last visit. Dose adjusted, repeat bloods before next visit." .

res:Rx_314 a med:Prescription ;
    med:prescribes res:Med_Paracetamol ; med:prescribedBy res:Doc_Joseph ;
    med:forPatient res:Pat_NIR206 ; med:date "2024-08-08"^^xsd:date ;
    med:dosage "1 tablet" ;
    med:frequency "As required" ;
    med:durationDays 14 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_415 med:issuedPrescription res:Rx_314 .
res:Pat_NIR206 med:hasPrescription res:Rx_314 .

res:Lab_195 a med:LabOrder ;
    med:analyte "Platelet count" ; med:forPatient res:Pat_NIR206 ;
    med:date "2024-08-08"^^xsd:date ; med:orderedBy res:Doc_Joseph ;
    med:testsFor res:Dengue ;
    med:orderStatus "Resulted" ;
    med:hasResult res:Res_195 .

res:Res_195 a med:LabResult ;
    med:analyte "Platelet count" ; med:value 91.1 ; med:unit "x10^3/uL" ;
    med:refLow 150 ; med:refHigh 450 ; med:outOfRange true ;
    med:date "2024-08-09"^^xsd:date ;
    med:performedBy res:Tech_Mohan .

res:Enc_415 med:orderedTest res:Lab_195 .

res:Inv_324 a med:Invoice ;
    med:forPatient res:Pat_NIR206 ; med:date "2024-08-08"^^xsd:date ;
    med:amount 3054 ; med:paid true ;
    med:status "Settled" .
res:Inv_324 med:coveredBy res:Policy_NIR206 .
res:Pat_NIR206 med:hasInvoice res:Inv_324 .

res:Enc_416 a med:Admission ;
    med:encounterOf res:Pat_NIR206 ; med:date "2026-08-30"^^xsd:date ;
    med:time "14:00" ;
    med:attendedBy res:Doc_Karthik ; med:inDepartment res:Dept_GeneralMedicine ;
    med:reason "Review of dengue" ;
    med:outcome "Admitted to ward" ;
    med:lengthOfStay 10 ;
    med:recordedCondition res:Cond_290 ;
    med:hasVitals res:Vit_416 ; med:hasNote res:Note_416 .

res:Vit_416 a med:VitalSigns ;
    med:systolic 125 ; med:diastolic 67 ;
    med:heartRate 100 ; med:temperature 100.5 ;
    med:spo2 96 ;
    med:weightKg 50.1 ;
    med:bmi 24.5 .

res:Note_416 a med:ClinicalNote ;
    med:authorName "Dr. Karthik" ;
    med:date "2026-08-30"^^xsd:date ;
    med:noteText "Presents with a two day history of symptoms. Referral raised to the relevant specialty." .

res:Rx_315 a med:Prescription ;
    med:prescribes res:Med_Paracetamol ; med:prescribedBy res:Doc_Karthik ;
    med:forPatient res:Pat_NIR206 ; med:date "2026-08-30"^^xsd:date ;
    med:dosage "1 dose" ;
    med:frequency "Once daily" ;
    med:durationDays 7 ;
    med:dispensed false ;
    med:status "Completed" .

res:Enc_416 med:issuedPrescription res:Rx_315 .
res:Pat_NIR206 med:hasPrescription res:Rx_315 .

res:Inv_325 a med:Invoice ;
    med:forPatient res:Pat_NIR206 ; med:date "2026-08-30"^^xsd:date ;
    med:amount 146592 ; med:paid true ;
    med:status "Settled" .
res:Inv_325 med:coveredBy res:Policy_NIR206 .
res:Pat_NIR206 med:hasInvoice res:Inv_325 .

res:Policy_NIR206 a med:InsurancePolicy ;
    med:policyNumber "ST-486361" ;
    med:issuedBy res:Ins_StarHealth ; med:coveragePercent 85 ;
    med:amount 750000 .
res:Pat_NIR206 med:hasPolicy res:Policy_NIR206 .

res:Appt_64 a med:Appointment ;
    med:forPatient res:Pat_NIR206 ; med:appointmentWith res:Doc_Karthik ;
    med:date "2026-09-15"^^xsd:date ;
    med:time "09:00" ;
    med:inDepartment res:Dept_GeneralMedicine ;
    med:status "Scheduled" .
res:Pat_NIR206 med:hasAppointment res:Appt_64 .

res:Pat_PAD207 a med:OutPatient ;
    med:name "Padma Thomas" ; med:mrn "MRN-PAD207" ; med:photoInitials "PT" ;
    med:sex "Female" ; med:dateOfBirth "2020-09-26"^^xsd:date ; med:age 5 ;
    med:bloodGroup "AB-" ; med:phone "+91 94875 605194" ; med:email "padma.thomas@example.in" ;
    med:address "50 Bharathi Street, Chromepet, Chennai" ;
    med:primaryPhysician res:Doc_Priya ;
    med:allergicTo res:Allergen_Sulfa ;
    med:hasCondition res:Cond_291 .

res:Cond_291 a med:Condition ;
    med:ofDisease res:Migraine ; med:onsetDate "2025-10-23"^^xsd:date ;
    med:severity "Moderate" ;
    med:clinicalStatus "Active" ;
    med:diagnosedBy res:Doc_Priya .

res:Pat_PAD207 med:hasEncounter res:Enc_417 , res:Enc_418 .

res:Enc_417 a med:Consultation ;
    med:encounterOf res:Pat_PAD207 ; med:date "2024-08-26"^^xsd:date ;
    med:time "14:15" ;
    med:attendedBy res:Doc_Joseph ; med:inDepartment res:Dept_Neurology ;
    med:reason "First presentation" ;
    med:outcome "Referred for tests" ;
    med:recordedCondition res:Cond_291 ;
    med:hasVitals res:Vit_417 ; med:hasNote res:Note_417 .

res:Vit_417 a med:VitalSigns ;
    med:systolic 112 ; med:diastolic 70 ;
    med:heartRate 78 ; med:temperature 97.9 ;
    med:spo2 100 ;
    med:weightKg 48.9 ;
    med:bmi 19.1 .

res:Note_417 a med:ClinicalNote ;
    med:authorName "Dr. Joseph" ;
    med:date "2024-08-26"^^xsd:date ;
    med:noteText "Patient reports steady improvement since last visit. Investigations ordered, will call with results." .

res:Rx_316 a med:Prescription ;
    med:prescribes res:Med_Ibuprofen ; med:prescribedBy res:Doc_Joseph ;
    med:forPatient res:Pat_PAD207 ; med:date "2024-08-26"^^xsd:date ;
    med:dosage "1 tablet" ;
    med:frequency "Three times daily" ;
    med:durationDays 14 ;
    med:dispensed true ;
    med:status "Completed" .

res:Rx_317 a med:Prescription ;
    med:prescribes res:Med_Paracetamol ; med:prescribedBy res:Doc_Joseph ;
    med:forPatient res:Pat_PAD207 ; med:date "2024-08-26"^^xsd:date ;
    med:dosage "1 tablet" ;
    med:frequency "Twice daily" ;
    med:durationDays 5 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_417 med:issuedPrescription res:Rx_316 , res:Rx_317 .
res:Pat_PAD207 med:hasPrescription res:Rx_316 , res:Rx_317 .

res:Enc_418 a med:Screening ;
    med:encounterOf res:Pat_PAD207 ; med:date "2026-08-30"^^xsd:date ;
    med:time "12:45" ;
    med:attendedBy res:Doc_Priya ; med:inDepartment res:Dept_Neurology ;
    med:reason "Review of migraine" ;
    med:outcome "Referred for tests" ;
    med:recordedCondition res:Cond_291 ;
    med:hasVitals res:Vit_418 ; med:hasNote res:Note_418 .

res:Vit_418 a med:VitalSigns ;
    med:systolic 128 ; med:diastolic 75 ;
    med:heartRate 95 ; med:temperature 98.9 ;
    med:spo2 96 ;
    med:weightKg 67.7 ;
    med:bmi 19.1 .

res:Note_418 a med:ClinicalNote ;
    med:authorName "Dr. Priya" ;
    med:date "2026-08-30"^^xsd:date ;
    med:noteText "Seen for worsening symptoms over the past week. Referral raised to the relevant specialty." .

res:Rx_318 a med:Prescription ;
    med:prescribes res:Med_Ibuprofen ; med:prescribedBy res:Doc_Priya ;
    med:forPatient res:Pat_PAD207 ; med:date "2026-08-30"^^xsd:date ;
    med:dosage "2 tablets" ;
    med:frequency "Once daily at night" ;
    med:durationDays 10 ;
    med:dispensed false ;
    med:status "Completed" .

res:Enc_418 med:issuedPrescription res:Rx_318 .
res:Pat_PAD207 med:hasPrescription res:Rx_318 .

res:Inv_326 a med:Invoice ;
    med:forPatient res:Pat_PAD207 ; med:date "2026-08-30"^^xsd:date ;
    med:amount 924 ; med:paid true ;
    med:status "Settled" .
res:Inv_326 med:coveredBy res:Policy_PAD207 .
res:Pat_PAD207 med:hasInvoice res:Inv_326 .

res:Policy_PAD207 a med:InsurancePolicy ;
    med:policyNumber "ST-371391" ;
    med:issuedBy res:Ins_StarHealth ; med:coveragePercent 75 ;
    med:amount 300000 .
res:Pat_PAD207 med:hasPolicy res:Policy_PAD207 .

res:Appt_65 a med:Appointment ;
    med:forPatient res:Pat_PAD207 ; med:appointmentWith res:Doc_Priya ;
    med:date "2026-10-04"^^xsd:date ;
    med:time "10:20" ;
    med:inDepartment res:Dept_Neurology ;
    med:status "Scheduled" .
res:Pat_PAD207 med:hasAppointment res:Appt_65 .

res:Pat_ANI208 a med:OutPatient ;
    med:name "Anitha Rao" ; med:mrn "MRN-ANI208" ; med:photoInitials "AR" ;
    med:sex "Female" ; med:dateOfBirth "2013-07-14"^^xsd:date ; med:age 13 ;
    med:bloodGroup "O+" ; med:phone "+91 99793 362849" ; med:email "anitha.rao@example.in" ;
    med:address "79 Velachery Main Road, Thoraipakkam, Chennai" ;
    med:primaryPhysician res:Doc_Priya ;
    med:hasCondition res:Cond_292 .

res:Cond_292 a med:Condition ;
    med:ofDisease res:Migraine ; med:onsetDate "2026-03-25"^^xsd:date ;
    med:severity "Moderate" ;
    med:clinicalStatus "Resolved" ;
    med:resolvedDate "2026-06-23"^^xsd:date ;
    med:diagnosedBy res:Doc_Joseph .

res:Pat_ANI208 med:hasEncounter res:Enc_419 .

res:Enc_419 a med:Consultation ;
    med:encounterOf res:Pat_ANI208 ; med:date "2026-08-30"^^xsd:date ;
    med:time "09:30" ;
    med:attendedBy res:Doc_Joseph ; med:inDepartment res:Dept_Neurology ;
    med:reason "First presentation" ;
    med:outcome "Referred for tests" ;
    med:recordedCondition res:Cond_292 ;
    med:hasVitals res:Vit_419 ; med:hasNote res:Note_419 .

res:Vit_419 a med:VitalSigns ;
    med:systolic 127 ; med:diastolic 78 ;
    med:heartRate 90 ; med:temperature 98.8 ;
    med:spo2 97 ;
    med:weightKg 67.3 ;
    med:bmi 22.7 .

res:Note_419 a med:ClinicalNote ;
    med:authorName "Dr. Joseph" ;
    med:date "2026-08-30"^^xsd:date ;
    med:noteText "Presents with a two day history of symptoms. Counselled on medication adherence. Red flag symptoms explained." .

res:Rx_319 a med:Prescription ;
    med:prescribes res:Med_Ibuprofen ; med:prescribedBy res:Doc_Joseph ;
    med:forPatient res:Pat_ANI208 ; med:date "2026-08-30"^^xsd:date ;
    med:dosage "1 tablet" ;
    med:frequency "Once daily" ;
    med:durationDays 7 ;
    med:dispensed false ;
    med:status "Completed" .

res:Rx_320 a med:Prescription ;
    med:prescribes res:Med_Paracetamol ; med:prescribedBy res:Doc_Joseph ;
    med:forPatient res:Pat_ANI208 ; med:date "2026-08-30"^^xsd:date ;
    med:dosage "1 dose" ;
    med:frequency "Once daily at night" ;
    med:durationDays 7 ;
    med:dispensed false ;
    med:status "Completed" .

res:Enc_419 med:issuedPrescription res:Rx_319 , res:Rx_320 .
res:Pat_ANI208 med:hasPrescription res:Rx_319 , res:Rx_320 .

res:Inv_327 a med:Invoice ;
    med:forPatient res:Pat_ANI208 ; med:date "2026-08-30"^^xsd:date ;
    med:amount 2542 ; med:paid false ;
    med:status "Insurance claim pending" .
res:Inv_327 med:coveredBy res:Policy_ANI208 .
res:Pat_ANI208 med:hasInvoice res:Inv_327 .

res:Policy_ANI208 a med:InsurancePolicy ;
    med:policyNumber "HD-576004" ;
    med:issuedBy res:Ins_HDFCErgo ; med:coveragePercent 75 ;
    med:amount 200000 .
res:Pat_ANI208 med:hasPolicy res:Policy_ANI208 .

res:Pat_IBR209 a med:OutPatient ;
    med:name "Ibrahim Pillai" ; med:mrn "MRN-IBR209" ; med:photoInitials "IP" ;
    med:sex "Male" ; med:dateOfBirth "2017-02-13"^^xsd:date ; med:age 9 ;
    med:bloodGroup "A-" ; med:phone "+91 95843 204440" ; med:email "ibrahim.pillai@example.in" ;
    med:address "44 ECR, Pallikaranai, Chennai" ;
    med:primaryPhysician res:Doc_Priya ;
    med:hasCondition res:Cond_293 .

res:Cond_293 a med:Condition ;
    med:ofDisease res:Migraine ; med:onsetDate "2026-08-20"^^xsd:date ;
    med:severity "Moderate" ;
    med:clinicalStatus "Resolved" ;
    med:resolvedDate "2026-08-30"^^xsd:date ;
    med:diagnosedBy res:Doc_Priya .

res:Pat_IBR209 med:hasEncounter res:Enc_420 , res:Enc_421 , res:Enc_422 , res:Enc_423 .

res:Enc_420 a med:Consultation ;
    med:encounterOf res:Pat_IBR209 ; med:date "2023-07-18"^^xsd:date ;
    med:time "16:15" ;
    med:attendedBy res:Doc_Priya ; med:inDepartment res:Dept_Neurology ;
    med:reason "First presentation" ;
    med:outcome "Follow up scheduled" ;
    med:recordedCondition res:Cond_293 ;
    med:hasVitals res:Vit_420 ; med:hasNote res:Note_420 .

res:Vit_420 a med:VitalSigns ;
    med:systolic 126 ; med:diastolic 77 ;
    med:heartRate 63 ; med:temperature 97.3 ;
    med:spo2 99 ;
    med:weightKg 63.8 ;
    med:bmi 20.1 .

res:Note_420 a med:ClinicalNote ;
    med:authorName "Dr. Priya" ;
    med:date "2023-07-18"^^xsd:date ;
    med:noteText "Reviewed in clinic today. Referral raised to the relevant specialty." .

res:Rx_321 a med:Prescription ;
    med:prescribes res:Med_Paracetamol ; med:prescribedBy res:Doc_Priya ;
    med:forPatient res:Pat_IBR209 ; med:date "2023-07-18"^^xsd:date ;
    med:dosage "1 tablet" ;
    med:frequency "Twice daily" ;
    med:durationDays 5 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_420 med:issuedPrescription res:Rx_321 .
res:Pat_IBR209 med:hasPrescription res:Rx_321 .

res:Inv_328 a med:Invoice ;
    med:forPatient res:Pat_IBR209 ; med:date "2023-07-18"^^xsd:date ;
    med:amount 1018 ; med:paid true ;
    med:status "Settled" .
res:Inv_328 med:coveredBy res:Policy_IBR209 .
res:Pat_IBR209 med:hasInvoice res:Inv_328 .

res:Enc_421 a med:EmergencyVisit ;
    med:encounterOf res:Pat_IBR209 ; med:date "2024-07-29"^^xsd:date ;
    med:time "17:00" ;
    med:attendedBy res:Doc_Karthik ; med:inDepartment res:Dept_Emergency ;
    med:reason "Acute presentation" ;
    med:outcome "Referred for tests" ;
    med:recordedCondition res:Cond_293 ;
    med:hasVitals res:Vit_421 ; med:hasNote res:Note_421 .

res:Vit_421 a med:VitalSigns ;
    med:systolic 115 ; med:diastolic 67 ;
    med:heartRate 94 ; med:temperature 97.3 ;
    med:spo2 96 ;
    med:weightKg 53.4 ;
    med:bmi 19.7 .

res:Note_421 a med:ClinicalNote ;
    med:authorName "Dr. Karthik" ;
    med:date "2024-07-29"^^xsd:date ;
    med:noteText "Post discharge review. Referral raised to the relevant specialty." .

res:Rx_322 a med:Prescription ;
    med:prescribes res:Med_Ibuprofen ; med:prescribedBy res:Doc_Karthik ;
    med:forPatient res:Pat_IBR209 ; med:date "2024-07-29"^^xsd:date ;
    med:dosage "1 dose" ;
    med:frequency "As required" ;
    med:durationDays 14 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_421 med:issuedPrescription res:Rx_322 .
res:Pat_IBR209 med:hasPrescription res:Rx_322 .

res:Inv_329 a med:Invoice ;
    med:forPatient res:Pat_IBR209 ; med:date "2024-07-29"^^xsd:date ;
    med:amount 30570 ; med:paid true ;
    med:status "Settled" .
res:Inv_329 med:coveredBy res:Policy_IBR209 .
res:Pat_IBR209 med:hasInvoice res:Inv_329 .

res:Enc_422 a med:FollowUp ;
    med:encounterOf res:Pat_IBR209 ; med:date "2025-08-16"^^xsd:date ;
    med:time "11:30" ;
    med:attendedBy res:Doc_Joseph ; med:inDepartment res:Dept_Neurology ;
    med:reason "Review of migraine" ;
    med:outcome "Referred for tests" ;
    med:recordedCondition res:Cond_293 ;
    med:hasVitals res:Vit_422 ; med:hasNote res:Note_422 .

res:Vit_422 a med:VitalSigns ;
    med:systolic 121 ; med:diastolic 69 ;
    med:heartRate 73 ; med:temperature 98.2 ;
    med:spo2 100 ;
    med:weightKg 62.5 ;
    med:bmi 19.5 .

res:Note_422 a med:ClinicalNote ;
    med:authorName "Dr. Joseph" ;
    med:date "2025-08-16"^^xsd:date ;
    med:noteText "Presents with a two day history of symptoms. Dose adjusted, repeat bloods before next visit." .

res:Rx_323 a med:Prescription ;
    med:prescribes res:Med_Ibuprofen ; med:prescribedBy res:Doc_Joseph ;
    med:forPatient res:Pat_IBR209 ; med:date "2025-08-16"^^xsd:date ;
    med:dosage "2 tablets" ;
    med:frequency "As required" ;
    med:durationDays 5 ;
    med:dispensed true ;
    med:status "Completed" .

res:Rx_324 a med:Prescription ;
    med:prescribes res:Med_Paracetamol ; med:prescribedBy res:Doc_Joseph ;
    med:forPatient res:Pat_IBR209 ; med:date "2025-08-16"^^xsd:date ;
    med:dosage "2 tablets" ;
    med:frequency "Once daily" ;
    med:durationDays 5 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_422 med:issuedPrescription res:Rx_323 , res:Rx_324 .
res:Pat_IBR209 med:hasPrescription res:Rx_323 , res:Rx_324 .

res:Inv_330 a med:Invoice ;
    med:forPatient res:Pat_IBR209 ; med:date "2025-08-16"^^xsd:date ;
    med:amount 5090 ; med:paid true ;
    med:status "Settled" .
res:Inv_330 med:coveredBy res:Policy_IBR209 .
res:Pat_IBR209 med:hasInvoice res:Inv_330 .

res:Enc_423 a med:FollowUp ;
    med:encounterOf res:Pat_IBR209 ; med:date "2026-08-30"^^xsd:date ;
    med:time "16:15" ;
    med:attendedBy res:Doc_Joseph ; med:inDepartment res:Dept_Neurology ;
    med:reason "Review of migraine" ;
    med:outcome "Follow up scheduled" ;
    med:recordedCondition res:Cond_293 ;
    med:hasVitals res:Vit_423 ; med:hasNote res:Note_423 .

res:Vit_423 a med:VitalSigns ;
    med:systolic 115 ; med:diastolic 68 ;
    med:heartRate 95 ; med:temperature 98.7 ;
    med:spo2 96 ;
    med:weightKg 60.0 ;
    med:bmi 23.5 .

res:Note_423 a med:ClinicalNote ;
    med:authorName "Dr. Joseph" ;
    med:date "2026-08-30"^^xsd:date ;
    med:noteText "Patient reports steady improvement since last visit. Counselled on medication adherence. Red flag symptoms explained." .

res:Rx_325 a med:Prescription ;
    med:prescribes res:Med_Ibuprofen ; med:prescribedBy res:Doc_Joseph ;
    med:forPatient res:Pat_IBR209 ; med:date "2026-08-30"^^xsd:date ;
    med:dosage "1 dose" ;
    med:frequency "Three times daily" ;
    med:durationDays 10 ;
    med:dispensed false ;
    med:status "Completed" .

res:Rx_326 a med:Prescription ;
    med:prescribes res:Med_Paracetamol ; med:prescribedBy res:Doc_Joseph ;
    med:forPatient res:Pat_IBR209 ; med:date "2026-08-30"^^xsd:date ;
    med:dosage "1 tablet" ;
    med:frequency "Once daily" ;
    med:durationDays 5 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_423 med:issuedPrescription res:Rx_325 , res:Rx_326 .
res:Pat_IBR209 med:hasPrescription res:Rx_325 , res:Rx_326 .

res:Inv_331 a med:Invoice ;
    med:forPatient res:Pat_IBR209 ; med:date "2026-08-30"^^xsd:date ;
    med:amount 3539 ; med:paid true ;
    med:status "Settled" .
res:Inv_331 med:coveredBy res:Policy_IBR209 .
res:Pat_IBR209 med:hasInvoice res:Inv_331 .

res:Policy_IBR209 a med:InsurancePolicy ;
    med:policyNumber "CG-409766" ;
    med:issuedBy res:Ins_CGHS ; med:coveragePercent 70 ;
    med:amount 750000 .
res:Pat_IBR209 med:hasPolicy res:Policy_IBR209 .

res:Pat_CHI210 a med:OutPatient ;
    med:name "Chitra Shetty" ; med:mrn "MRN-CHI210" ; med:photoInitials "CS" ;
    med:sex "Female" ; med:dateOfBirth "1954-07-03"^^xsd:date ; med:age 72 ;
    med:bloodGroup "AB+" ; med:phone "+91 97191 720619" ; med:email "chitra.shetty@example.in" ;
    med:address "36 ECR, Pallikaranai, Chennai" ;
    med:primaryPhysician res:Doc_Karthik ;
    med:hasCondition res:Cond_294 .

res:Cond_294 a med:Condition ;
    med:ofDisease res:Dengue ; med:onsetDate "2025-09-24"^^xsd:date ;
    med:severity "Moderate" ;
    med:clinicalStatus "Active" ;
    med:diagnosedBy res:Doc_Joseph .

res:Pat_CHI210 med:hasEncounter res:Enc_424 , res:Enc_425 , res:Enc_426 , res:Enc_427 .

res:Enc_424 a med:EmergencyVisit ;
    med:encounterOf res:Pat_CHI210 ; med:date "2023-07-30"^^xsd:date ;
    med:time "11:15" ;
    med:attendedBy res:Doc_Karthik ; med:inDepartment res:Dept_Emergency ;
    med:reason "Acute presentation" ;
    med:outcome "Follow up scheduled" ;
    med:recordedCondition res:Cond_294 ;
    med:hasVitals res:Vit_424 ; med:hasNote res:Note_424 .

res:Vit_424 a med:VitalSigns ;
    med:systolic 132 ; med:diastolic 67 ;
    med:heartRate 87 ; med:temperature 98.1 ;
    med:spo2 100 ;
    med:weightKg 69.7 ;
    med:bmi 21.3 .

res:Note_424 a med:ClinicalNote ;
    med:authorName "Dr. Karthik" ;
    med:date "2023-07-30"^^xsd:date ;
    med:noteText "Seen for worsening symptoms over the past week. Advised on diet, salt restriction and daily walking." .

res:Rx_327 a med:Prescription ;
    med:prescribes res:Med_Paracetamol ; med:prescribedBy res:Doc_Karthik ;
    med:forPatient res:Pat_CHI210 ; med:date "2023-07-30"^^xsd:date ;
    med:dosage "1 tablet" ;
    med:frequency "Once daily at night" ;
    med:durationDays 14 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_424 med:issuedPrescription res:Rx_327 .
res:Pat_CHI210 med:hasPrescription res:Rx_327 .

res:Inv_332 a med:Invoice ;
    med:forPatient res:Pat_CHI210 ; med:date "2023-07-30"^^xsd:date ;
    med:amount 17391 ; med:paid true ;
    med:status "Settled" .
res:Pat_CHI210 med:hasInvoice res:Inv_332 .

res:Enc_425 a med:EmergencyVisit ;
    med:encounterOf res:Pat_CHI210 ; med:date "2024-08-25"^^xsd:date ;
    med:time "11:45" ;
    med:attendedBy res:Doc_Karthik ; med:inDepartment res:Dept_Emergency ;
    med:reason "Acute presentation" ;
    med:outcome "Follow up scheduled" ;
    med:recordedCondition res:Cond_294 ;
    med:hasVitals res:Vit_425 ; med:hasNote res:Note_425 .

res:Vit_425 a med:VitalSigns ;
    med:systolic 118 ; med:diastolic 83 ;
    med:heartRate 86 ; med:temperature 99.2 ;
    med:spo2 97 ;
    med:weightKg 58.0 ;
    med:bmi 20.0 .

res:Note_425 a med:ClinicalNote ;
    med:authorName "Dr. Karthik" ;
    med:date "2024-08-25"^^xsd:date ;
    med:noteText "Presents with a two day history of symptoms. Investigations ordered, will call with results." .

res:Rx_328 a med:Prescription ;
    med:prescribes res:Med_Paracetamol ; med:prescribedBy res:Doc_Karthik ;
    med:forPatient res:Pat_CHI210 ; med:date "2024-08-25"^^xsd:date ;
    med:dosage "1 dose" ;
    med:frequency "Three times daily" ;
    med:durationDays 5 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_425 med:issuedPrescription res:Rx_328 .
res:Pat_CHI210 med:hasPrescription res:Rx_328 .

res:Lab_196 a med:LabOrder ;
    med:analyte "Platelet count" ; med:forPatient res:Pat_CHI210 ;
    med:date "2024-08-25"^^xsd:date ; med:orderedBy res:Doc_Karthik ;
    med:testsFor res:Dengue ;
    med:orderStatus "Resulted" ;
    med:hasResult res:Res_196 .

res:Res_196 a med:LabResult ;
    med:analyte "Platelet count" ; med:value 70.95 ; med:unit "x10^3/uL" ;
    med:refLow 150 ; med:refHigh 450 ; med:outOfRange true ;
    med:date "2024-08-26"^^xsd:date ;
    med:performedBy res:Tech_Mohan .

res:Enc_425 med:orderedTest res:Lab_196 .

res:Enc_426 a med:Consultation ;
    med:encounterOf res:Pat_CHI210 ; med:date "2025-08-08"^^xsd:date ;
    med:time "09:30" ;
    med:attendedBy res:Doc_Karthik ; med:inDepartment res:Dept_GeneralMedicine ;
    med:reason "Review of dengue" ;
    med:outcome "Discharged with advice" ;
    med:recordedCondition res:Cond_294 ;
    med:hasVitals res:Vit_426 ; med:hasNote res:Note_426 .

res:Vit_426 a med:VitalSigns ;
    med:systolic 127 ; med:diastolic 84 ;
    med:heartRate 74 ; med:temperature 99.5 ;
    med:spo2 96 ;
    med:weightKg 64.8 ;
    med:bmi 27.9 .

res:Note_426 a med:ClinicalNote ;
    med:authorName "Dr. Karthik" ;
    med:date "2025-08-08"^^xsd:date ;
    med:noteText "Referred from general medicine for specialist opinion. Counselled on medication adherence. Red flag symptoms explained." .

res:Lab_197 a med:LabOrder ;
    med:analyte "Platelet count" ; med:forPatient res:Pat_CHI210 ;
    med:date "2025-08-08"^^xsd:date ; med:orderedBy res:Doc_Karthik ;
    med:testsFor res:Dengue ;
    med:orderStatus "Resulted" ;
    med:hasResult res:Res_197 .

res:Res_197 a med:LabResult ;
    med:analyte "Platelet count" ; med:value 156.99 ; med:unit "x10^3/uL" ;
    med:refLow 150 ; med:refHigh 450 ; med:outOfRange false ;
    med:date "2025-08-09"^^xsd:date ;
    med:performedBy res:Tech_Mohan .

res:Enc_426 med:orderedTest res:Lab_197 .

res:Inv_333 a med:Invoice ;
    med:forPatient res:Pat_CHI210 ; med:date "2025-08-08"^^xsd:date ;
    med:amount 3773 ; med:paid true ;
    med:status "Settled" .
res:Pat_CHI210 med:hasInvoice res:Inv_333 .

res:Enc_427 a med:EmergencyVisit ;
    med:encounterOf res:Pat_CHI210 ; med:date "2026-08-30"^^xsd:date ;
    med:time "10:00" ;
    med:attendedBy res:Doc_Karthik ; med:inDepartment res:Dept_Emergency ;
    med:reason "Acute presentation" ;
    med:outcome "Treatment continued" ;
    med:recordedCondition res:Cond_294 ;
    med:hasVitals res:Vit_427 ; med:hasNote res:Note_427 .

res:Vit_427 a med:VitalSigns ;
    med:systolic 108 ; med:diastolic 66 ;
    med:heartRate 70 ; med:temperature 99.3 ;
    med:spo2 96 ;
    med:weightKg 64.8 ;
    med:bmi 20.1 .

res:Note_427 a med:ClinicalNote ;
    med:authorName "Dr. Karthik" ;
    med:date "2026-08-30"^^xsd:date ;
    med:noteText "Post discharge review. Dose adjusted, repeat bloods before next visit." .

res:Rx_329 a med:Prescription ;
    med:prescribes res:Med_Paracetamol ; med:prescribedBy res:Doc_Karthik ;
    med:forPatient res:Pat_CHI210 ; med:date "2026-08-30"^^xsd:date ;
    med:dosage "2 tablets" ;
    med:frequency "Three times daily" ;
    med:durationDays 5 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_427 med:issuedPrescription res:Rx_329 .
res:Pat_CHI210 med:hasPrescription res:Rx_329 .

res:Inv_334 a med:Invoice ;
    med:forPatient res:Pat_CHI210 ; med:date "2026-08-30"^^xsd:date ;
    med:amount 16359 ; med:paid false ;
    med:status "Awaiting payment" .
res:Pat_CHI210 med:hasInvoice res:Inv_334 .

res:Appt_66 a med:Appointment ;
    med:forPatient res:Pat_CHI210 ; med:appointmentWith res:Doc_Karthik ;
    med:date "2026-09-25"^^xsd:date ;
    med:time "14:40" ;
    med:inDepartment res:Dept_GeneralMedicine ;
    med:status "Scheduled" .
res:Pat_CHI210 med:hasAppointment res:Appt_66 .

res:Pat_SNE211 a med:OutPatient ;
    med:name "Sneha Pillai" ; med:mrn "MRN-SNE211" ; med:photoInitials "SP" ;
    med:sex "Female" ; med:dateOfBirth "1956-09-28"^^xsd:date ; med:age 69 ;
    med:bloodGroup "B+" ; med:phone "+91 93109 614972" ; med:email "sneha.pillai@example.in" ;
    med:address "24 Rajiv Gandhi Salai, Tambaram, Chennai" ;
    med:primaryPhysician res:Doc_Sameer ;
    med:hasCondition res:Cond_295 , res:Cond_296 .

res:Cond_295 a med:Condition ;
    med:ofDisease res:Tuberculosis ; med:onsetDate "2026-05-13"^^xsd:date ;
    med:severity "Mild" ;
    med:clinicalStatus "Active" ;
    med:diagnosedBy res:Doc_Sameer .

res:Cond_296 a med:Condition ;
    med:ofDisease res:Anemia ; med:onsetDate "2026-07-13"^^xsd:date ;
    med:severity "Mild" ;
    med:clinicalStatus "Resolved" ;
    med:resolvedDate "2026-08-15"^^xsd:date ;
    med:diagnosedBy res:Doc_Suresh .

res:Pat_SNE211 med:hasEncounter res:Enc_428 , res:Enc_429 , res:Enc_430 .

res:Enc_428 a med:Consultation ;
    med:encounterOf res:Pat_SNE211 ; med:date "2023-12-18"^^xsd:date ;
    med:time "18:00" ;
    med:attendedBy res:Doc_Sameer ; med:inDepartment res:Dept_Pulmonology ;
    med:reason "First presentation" ;
    med:outcome "Follow up scheduled" ;
    med:recordedCondition res:Cond_295 ;
    med:hasVitals res:Vit_428 ; med:hasNote res:Note_428 .

res:Vit_428 a med:VitalSigns ;
    med:systolic 132 ; med:diastolic 69 ;
    med:heartRate 98 ; med:temperature 97.3 ;
    med:spo2 96 ;
    med:weightKg 73.2 ;
    med:bmi 25.0 .

res:Note_428 a med:ClinicalNote ;
    med:authorName "Dr. Sameer" ;
    med:date "2023-12-18"^^xsd:date ;
    med:noteText "Post discharge review. Dose adjusted, repeat bloods before next visit." .

res:Lab_198 a med:LabOrder ;
    med:analyte "ESR" ; med:forPatient res:Pat_SNE211 ;
    med:date "2023-12-18"^^xsd:date ; med:orderedBy res:Doc_Sameer ;
    med:testsFor res:Tuberculosis ;
    med:orderStatus "Resulted" ;
    med:hasResult res:Res_198 .

res:Res_198 a med:LabResult ;
    med:analyte "ESR" ; med:value 32.33 ; med:unit "mm/hr" ;
    med:refLow 0 ; med:refHigh 20 ; med:outOfRange true ;
    med:date "2023-12-19"^^xsd:date ;
    med:performedBy res:Tech_Mohan .

res:Enc_428 med:orderedTest res:Lab_198 .

res:Inv_335 a med:Invoice ;
    med:forPatient res:Pat_SNE211 ; med:date "2023-12-18"^^xsd:date ;
    med:amount 3268 ; med:paid true ;
    med:status "Settled" .
res:Pat_SNE211 med:hasInvoice res:Inv_335 .

res:Enc_429 a med:Consultation ;
    med:encounterOf res:Pat_SNE211 ; med:date "2025-04-03"^^xsd:date ;
    med:time "10:30" ;
    med:attendedBy res:Doc_Joseph ; med:inDepartment res:Dept_GeneralMedicine ;
    med:reason "Review of anemia" ;
    med:outcome "Follow up scheduled" ;
    med:recordedCondition res:Cond_296 ;
    med:hasVitals res:Vit_429 ; med:hasNote res:Note_429 .

res:Vit_429 a med:VitalSigns ;
    med:systolic 117 ; med:diastolic 80 ;
    med:heartRate 93 ; med:temperature 99.7 ;
    med:spo2 96 ;
    med:weightKg 66.8 ;
    med:bmi 22.7 .

res:Note_429 a med:ClinicalNote ;
    med:authorName "Dr. Joseph" ;
    med:date "2025-04-03"^^xsd:date ;
    med:noteText "Seen for worsening symptoms over the past week. Investigations ordered, will call with results." .

res:Rx_330 a med:Prescription ;
    med:prescribes res:Med_IronFolate ; med:prescribedBy res:Doc_Joseph ;
    med:forPatient res:Pat_SNE211 ; med:date "2025-04-03"^^xsd:date ;
    med:dosage "1 dose" ;
    med:frequency "Once daily" ;
    med:durationDays 7 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_429 med:issuedPrescription res:Rx_330 .
res:Pat_SNE211 med:hasPrescription res:Rx_330 .

res:Lab_199 a med:LabOrder ;
    med:analyte "Haemoglobin" ; med:forPatient res:Pat_SNE211 ;
    med:date "2025-04-03"^^xsd:date ; med:orderedBy res:Doc_Joseph ;
    med:testsFor res:Anemia ;
    med:orderStatus "Resulted" ;
    med:hasResult res:Res_199 .

res:Res_199 a med:LabResult ;
    med:analyte "Haemoglobin" ; med:value 9.58 ; med:unit "g/dL" ;
    med:refLow 12 ; med:refHigh 15.5 ; med:outOfRange true ;
    med:date "2025-04-04"^^xsd:date ;
    med:performedBy res:Tech_Mohan .

res:Enc_429 med:orderedTest res:Lab_199 .

res:Enc_430 a med:Consultation ;
    med:encounterOf res:Pat_SNE211 ; med:date "2026-08-21"^^xsd:date ;
    med:time "16:30" ;
    med:attendedBy res:Doc_Suresh ; med:inDepartment res:Dept_GeneralMedicine ;
    med:reason "Review of anemia" ;
    med:outcome "Discharged with advice" ;
    med:recordedCondition res:Cond_296 ;
    med:hasVitals res:Vit_430 ; med:hasNote res:Note_430 .

res:Vit_430 a med:VitalSigns ;
    med:systolic 120 ; med:diastolic 80 ;
    med:heartRate 91 ; med:temperature 97.6 ;
    med:spo2 96 ;
    med:weightKg 54.0 ;
    med:bmi 20.9 .

res:Note_430 a med:ClinicalNote ;
    med:authorName "Dr. Suresh" ;
    med:date "2026-08-21"^^xsd:date ;
    med:noteText "Routine review, no new complaints. Referral raised to the relevant specialty." .

res:Rx_331 a med:Prescription ;
    med:prescribes res:Med_IronFolate ; med:prescribedBy res:Doc_Suresh ;
    med:forPatient res:Pat_SNE211 ; med:date "2026-08-21"^^xsd:date ;
    med:dosage "1 tablet" ;
    med:frequency "As required" ;
    med:durationDays 14 ;
    med:dispensed false ;
    med:status "Completed" .

res:Enc_430 med:issuedPrescription res:Rx_331 .
res:Pat_SNE211 med:hasPrescription res:Rx_331 .

res:Inv_336 a med:Invoice ;
    med:forPatient res:Pat_SNE211 ; med:date "2026-08-21"^^xsd:date ;
    med:amount 3807 ; med:paid true ;
    med:status "Settled" .
res:Pat_SNE211 med:hasInvoice res:Inv_336 .

res:Appt_67 a med:Appointment ;
    med:forPatient res:Pat_SNE211 ; med:appointmentWith res:Doc_Sameer ;
    med:date "2026-09-29"^^xsd:date ;
    med:time "12:00" ;
    med:inDepartment res:Dept_Pulmonology ;
    med:status "Scheduled" .
res:Pat_SNE211 med:hasAppointment res:Appt_67 .

res:Pat_SAN212 a med:OutPatient ;
    med:name "Sanjay Menon" ; med:mrn "MRN-SAN212" ; med:photoInitials "SM" ;
    med:sex "Male" ; med:dateOfBirth "1963-08-06"^^xsd:date ; med:age 63 ;
    med:bloodGroup "A+" ; med:phone "+91 93535 697904" ; med:email "sanjay.menon@example.in" ;
    med:address "38 ECR, Velachery, Chennai" ;
    med:primaryPhysician res:Doc_Priya ;
    med:allergicTo res:Allergen_Penicillin ;
    med:hasCondition res:Cond_297 , res:Cond_298 , res:Cond_299 .

res:Cond_297 a med:Condition ;
    med:ofDisease res:Epilepsy ; med:onsetDate "2022-10-03"^^xsd:date ;
    med:severity "Moderate" ;
    med:clinicalStatus "Active" ;
    med:diagnosedBy res:Doc_Priya .

res:Cond_298 a med:Condition ;
    med:ofDisease res:Depression ; med:onsetDate "2024-06-05"^^xsd:date ;
    med:severity "Moderate" ;
    med:clinicalStatus "Active" ;
    med:diagnosedBy res:Doc_Leela .

res:Cond_299 a med:Condition ;
    med:ofDisease res:Stroke ; med:onsetDate "2025-11-15"^^xsd:date ;
    med:severity "Mild" ;
    med:clinicalStatus "Resolved" ;
    med:resolvedDate "2026-05-04"^^xsd:date ;
    med:diagnosedBy res:Doc_Priya .

res:Pat_SAN212 med:hasEncounter res:Enc_431 , res:Enc_432 , res:Enc_433 , res:Enc_434 , res:Enc_435 .

res:Enc_431 a med:EmergencyVisit ;
    med:encounterOf res:Pat_SAN212 ; med:date "2023-05-02"^^xsd:date ;
    med:time "11:15" ;
    med:attendedBy res:Doc_Karthik ; med:inDepartment res:Dept_Emergency ;
    med:reason "Acute presentation" ;
    med:outcome "Discharged with advice" ;
    med:recordedCondition res:Cond_299 ;
    med:hasVitals res:Vit_431 ; med:hasNote res:Note_431 .

res:Vit_431 a med:VitalSigns ;
    med:systolic 117 ; med:diastolic 77 ;
    med:heartRate 86 ; med:temperature 98.4 ;
    med:spo2 98 ;
    med:weightKg 59.0 ;
    med:bmi 20.4 .

res:Note_431 a med:ClinicalNote ;
    med:authorName "Dr. Karthik" ;
    med:date "2023-05-02"^^xsd:date ;
    med:noteText "Routine review, no new complaints. Reassured. No change to treatment at this stage." .

res:Rx_332 a med:Prescription ;
    med:prescribes res:Med_Warfarin ; med:prescribedBy res:Doc_Karthik ;
    med:forPatient res:Pat_SAN212 ; med:date "2023-05-02"^^xsd:date ;
    med:dosage "2 tablets" ;
    med:frequency "Once daily" ;
    med:durationDays 7 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_431 med:issuedPrescription res:Rx_332 .
res:Pat_SAN212 med:hasPrescription res:Rx_332 .

res:Lab_200 a med:LabOrder ;
    med:analyte "INR" ; med:forPatient res:Pat_SAN212 ;
    med:date "2023-05-02"^^xsd:date ; med:orderedBy res:Doc_Karthik ;
    med:testsFor res:Stroke ;
    med:orderStatus "Resulted" ;
    med:hasResult res:Res_200 .

res:Res_200 a med:LabResult ;
    med:analyte "INR" ; med:value 1 ; med:unit "ratio" ;
    med:refLow 0.9 ; med:refHigh 1.2 ; med:outOfRange false ;
    med:date "2023-05-03"^^xsd:date ;
    med:performedBy res:Tech_Mohan .

res:Enc_431 med:orderedTest res:Lab_200 .

res:Inv_337 a med:Invoice ;
    med:forPatient res:Pat_SAN212 ; med:date "2023-05-02"^^xsd:date ;
    med:amount 21147 ; med:paid true ;
    med:status "Settled" .
res:Inv_337 med:coveredBy res:Policy_SAN212 .
res:Pat_SAN212 med:hasInvoice res:Inv_337 .

res:Enc_432 a med:FollowUp ;
    med:encounterOf res:Pat_SAN212 ; med:date "2024-03-03"^^xsd:date ;
    med:time "12:30" ;
    med:attendedBy res:Doc_Priya ; med:inDepartment res:Dept_Neurology ;
    med:reason "Review of stroke" ;
    med:outcome "Discharged with advice" ;
    med:recordedCondition res:Cond_299 ;
    med:hasVitals res:Vit_432 ; med:hasNote res:Note_432 .

res:Vit_432 a med:VitalSigns ;
    med:systolic 127 ; med:diastolic 70 ;
    med:heartRate 66 ; med:temperature 99.4 ;
    med:spo2 100 ;
    med:weightKg 69.4 ;
    med:bmi 24.4 .

res:Note_432 a med:ClinicalNote ;
    med:authorName "Dr. Priya" ;
    med:date "2024-03-03"^^xsd:date ;
    med:noteText "Referred from general medicine for specialist opinion. Counselled on medication adherence. Red flag symptoms explained." .

res:Inv_338 a med:Invoice ;
    med:forPatient res:Pat_SAN212 ; med:date "2024-03-03"^^xsd:date ;
    med:amount 1349 ; med:paid true ;
    med:status "Settled" .
res:Inv_338 med:coveredBy res:Policy_SAN212 .
res:Pat_SAN212 med:hasInvoice res:Inv_338 .

res:Enc_433 a med:Consultation ;
    med:encounterOf res:Pat_SAN212 ; med:date "2025-01-09"^^xsd:date ;
    med:time "17:45" ;
    med:attendedBy res:Doc_Priya ; med:inDepartment res:Dept_Neurology ;
    med:reason "Review of stroke" ;
    med:outcome "Follow up scheduled" ;
    med:recordedCondition res:Cond_299 ;
    med:hasVitals res:Vit_433 ; med:hasNote res:Note_433 .

res:Vit_433 a med:VitalSigns ;
    med:systolic 116 ; med:diastolic 72 ;
    med:heartRate 69 ; med:temperature 98.7 ;
    med:spo2 98 ;
    med:weightKg 62.5 ;
    med:bmi 20.5 .

res:Note_433 a med:ClinicalNote ;
    med:authorName "Dr. Priya" ;
    med:date "2025-01-09"^^xsd:date ;
    med:noteText "Referred from general medicine for specialist opinion. Referral raised to the relevant specialty." .

res:Lab_201 a med:LabOrder ;
    med:analyte "INR" ; med:forPatient res:Pat_SAN212 ;
    med:date "2025-01-09"^^xsd:date ; med:orderedBy res:Doc_Priya ;
    med:testsFor res:Stroke ;
    med:orderStatus "Resulted" ;
    med:hasResult res:Res_201 .

res:Res_201 a med:LabResult ;
    med:analyte "INR" ; med:value 1.08 ; med:unit "ratio" ;
    med:refLow 0.9 ; med:refHigh 1.2 ; med:outOfRange false ;
    med:date "2025-01-10"^^xsd:date ;
    med:performedBy res:Tech_Mohan .

res:Enc_433 med:orderedTest res:Lab_201 .

res:Inv_339 a med:Invoice ;
    med:forPatient res:Pat_SAN212 ; med:date "2025-01-09"^^xsd:date ;
    med:amount 3624 ; med:paid true ;
    med:status "Settled" .
res:Inv_339 med:coveredBy res:Policy_SAN212 .
res:Pat_SAN212 med:hasInvoice res:Inv_339 .

res:Enc_434 a med:Admission ;
    med:encounterOf res:Pat_SAN212 ; med:date "2025-11-15"^^xsd:date ;
    med:time "15:45" ;
    med:attendedBy res:Doc_Leela ; med:inDepartment res:Dept_Psychiatry ;
    med:reason "Review of depression" ;
    med:outcome "Admitted to ward" ;
    med:lengthOfStay 11 ;
    med:recordedCondition res:Cond_298 ;
    med:hasVitals res:Vit_434 ; med:hasNote res:Note_434 .

res:Vit_434 a med:VitalSigns ;
    med:systolic 123 ; med:diastolic 80 ;
    med:heartRate 71 ; med:temperature 100.0 ;
    med:spo2 97 ;
    med:weightKg 65.3 ;
    med:bmi 19.7 .

res:Note_434 a med:ClinicalNote ;
    med:authorName "Dr. Leela" ;
    med:date "2025-11-15"^^xsd:date ;
    med:noteText "Patient reports steady improvement since last visit. Reassured. No change to treatment at this stage." .

res:Rx_333 a med:Prescription ;
    med:prescribes res:Med_Sertraline ; med:prescribedBy res:Doc_Leela ;
    med:forPatient res:Pat_SAN212 ; med:date "2025-11-15"^^xsd:date ;
    med:dosage "2 tablets" ;
    med:frequency "Once daily" ;
    med:durationDays 30 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_434 med:issuedPrescription res:Rx_333 .
res:Pat_SAN212 med:hasPrescription res:Rx_333 .

res:Enc_435 a med:FollowUp ;
    med:encounterOf res:Pat_SAN212 ; med:date "2026-08-30"^^xsd:date ;
    med:time "15:45" ;
    med:attendedBy res:Doc_Priya ; med:inDepartment res:Dept_Neurology ;
    med:reason "Review of stroke" ;
    med:outcome "Discharged with advice" ;
    med:recordedCondition res:Cond_299 ;
    med:hasVitals res:Vit_435 ; med:hasNote res:Note_435 .

res:Vit_435 a med:VitalSigns ;
    med:systolic 125 ; med:diastolic 79 ;
    med:heartRate 94 ; med:temperature 98.2 ;
    med:spo2 96 ;
    med:weightKg 75.3 ;
    med:bmi 26.0 .

res:Note_435 a med:ClinicalNote ;
    med:authorName "Dr. Priya" ;
    med:date "2026-08-30"^^xsd:date ;
    med:noteText "Seen for worsening symptoms over the past week. Continue current therapy, review in three months." .

res:Rx_334 a med:Prescription ;
    med:prescribes res:Med_Warfarin ; med:prescribedBy res:Doc_Priya ;
    med:forPatient res:Pat_SAN212 ; med:date "2026-08-30"^^xsd:date ;
    med:dosage "1 dose" ;
    med:frequency "Once daily" ;
    med:durationDays 5 ;
    med:dispensed false ;
    med:status "Completed" .

res:Enc_435 med:issuedPrescription res:Rx_334 .
res:Pat_SAN212 med:hasPrescription res:Rx_334 .

res:Policy_SAN212 a med:InsurancePolicy ;
    med:policyNumber "ST-814085" ;
    med:issuedBy res:Ins_StarHealth ; med:coveragePercent 85 ;
    med:amount 1000000 .
res:Pat_SAN212 med:hasPolicy res:Policy_SAN212 .

res:Appt_68 a med:Appointment ;
    med:forPatient res:Pat_SAN212 ; med:appointmentWith res:Doc_Priya ;
    med:date "2026-10-05"^^xsd:date ;
    med:time "15:00" ;
    med:inDepartment res:Dept_Neurology ;
    med:status "Scheduled" .
res:Pat_SAN212 med:hasAppointment res:Appt_68 .

res:Pat_SAT213 a med:OutPatient ;
    med:name "Sathish Krishnan" ; med:mrn "MRN-SAT213" ; med:photoInitials "SK" ;
    med:sex "Male" ; med:dateOfBirth "1999-10-15"^^xsd:date ; med:age 26 ;
    med:bloodGroup "B+" ; med:phone "+91 93861 497349" ; med:email "sathish.krishnan@example.in" ;
    med:address "33 Bharathi Street, Sholinganallur, Chennai" ;
    med:primaryPhysician res:Doc_Vikram ;
    med:allergicTo res:Allergen_Latex ;
    med:hasCondition res:Cond_300 , res:Cond_301 , res:Cond_302 , res:Cond_303 .

res:Cond_300 a med:Condition ;
    med:ofDisease res:Osteoarthritis ; med:onsetDate "2018-07-17"^^xsd:date ;
    med:severity "Mild" ;
    med:clinicalStatus "Active" ;
    med:diagnosedBy res:Doc_Vikram .

res:Cond_301 a med:Condition ;
    med:ofDisease res:Osteoporosis ; med:onsetDate "2023-11-22"^^xsd:date ;
    med:severity "Moderate" ;
    med:clinicalStatus "Active" ;
    med:diagnosedBy res:Doc_Vikram .

res:Cond_302 a med:Condition ;
    med:ofDisease res:COPD ; med:onsetDate "2023-05-19"^^xsd:date ;
    med:severity "Mild" ;
    med:clinicalStatus "Active" ;
    med:diagnosedBy res:Doc_Sameer .

res:Cond_303 a med:Condition ;
    med:ofDisease res:Hypertension ; med:onsetDate "2021-01-09"^^xsd:date ;
    med:severity "Moderate" ;
    med:clinicalStatus "Active" ;
    med:diagnosedBy res:Doc_Ramesh .

res:Pat_SAT213 med:hasEncounter res:Enc_436 , res:Enc_437 , res:Enc_438 , res:Enc_439 , res:Enc_440 , res:Enc_441 , res:Enc_442 .

res:Enc_436 a med:Consultation ;
    med:encounterOf res:Pat_SAT213 ; med:date "2023-02-20"^^xsd:date ;
    med:time "17:45" ;
    med:attendedBy res:Doc_Suresh ; med:inDepartment res:Dept_GeneralMedicine ;
    med:reason "First presentation" ;
    med:outcome "Treatment continued" ;
    med:recordedCondition res:Cond_303 ;
    med:hasVitals res:Vit_436 ; med:hasNote res:Note_436 .

res:Vit_436 a med:VitalSigns ;
    med:systolic 170 ; med:diastolic 96 ;
    med:heartRate 70 ; med:temperature 97.5 ;
    med:spo2 91 ;
    med:weightKg 48.2 ;
    med:bmi 26.3 .

res:Note_436 a med:ClinicalNote ;
    med:authorName "Dr. Suresh" ;
    med:date "2023-02-20"^^xsd:date ;
    med:noteText "Patient reports steady improvement since last visit. Investigations ordered, will call with results." .

res:Inv_340 a med:Invoice ;
    med:forPatient res:Pat_SAT213 ; med:date "2023-02-20"^^xsd:date ;
    med:amount 1918 ; med:paid true ;
    med:status "Settled" .
res:Inv_340 med:coveredBy res:Policy_SAT213 .
res:Pat_SAT213 med:hasInvoice res:Inv_340 .

res:Enc_437 a med:FollowUp ;
    med:encounterOf res:Pat_SAT213 ; med:date "2023-10-02"^^xsd:date ;
    med:time "11:00" ;
    med:attendedBy res:Doc_Sameer ; med:inDepartment res:Dept_Pulmonology ;
    med:reason "Review of c o p d" ;
    med:outcome "Referred for tests" ;
    med:recordedCondition res:Cond_302 ;
    med:hasVitals res:Vit_437 ; med:hasNote res:Note_437 .

res:Vit_437 a med:VitalSigns ;
    med:systolic 141 ; med:diastolic 98 ;
    med:heartRate 67 ; med:temperature 98.2 ;
    med:spo2 94 ;
    med:weightKg 51.0 ;
    med:bmi 20.9 .

res:Note_437 a med:ClinicalNote ;
    med:authorName "Dr. Sameer" ;
    med:date "2023-10-02"^^xsd:date ;
    med:noteText "Post discharge review. Advised on diet, salt restriction and daily walking." .

res:Rx_335 a med:Prescription ;
    med:prescribes res:Med_Salbutamol ; med:prescribedBy res:Doc_Sameer ;
    med:forPatient res:Pat_SAT213 ; med:date "2023-10-02"^^xsd:date ;
    med:dosage "1 tablet" ;
    med:frequency "Once daily" ;
    med:durationDays 30 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_437 med:issuedPrescription res:Rx_335 .
res:Pat_SAT213 med:hasPrescription res:Rx_335 .

res:Inv_341 a med:Invoice ;
    med:forPatient res:Pat_SAT213 ; med:date "2023-10-02"^^xsd:date ;
    med:amount 1572 ; med:paid true ;
    med:status "Settled" .
res:Inv_341 med:coveredBy res:Policy_SAT213 .
res:Pat_SAT213 med:hasInvoice res:Inv_341 .

res:Enc_438 a med:Consultation ;
    med:encounterOf res:Pat_SAT213 ; med:date "2024-05-03"^^xsd:date ;
    med:time "16:15" ;
    med:attendedBy res:Doc_Vikram ; med:inDepartment res:Dept_Orthopedics ;
    med:reason "Review of osteoarthritis" ;
    med:outcome "Discharged with advice" ;
    med:recordedCondition res:Cond_300 ;
    med:hasVitals res:Vit_438 ; med:hasNote res:Note_438 .

res:Vit_438 a med:VitalSigns ;
    med:systolic 153 ; med:diastolic 96 ;
    med:heartRate 85 ; med:temperature 99.7 ;
    med:spo2 90 ;
    med:weightKg 69.8 ;
    med:bmi 26.6 .

res:Note_438 a med:ClinicalNote ;
    med:authorName "Dr. Vikram" ;
    med:date "2024-05-03"^^xsd:date ;
    med:noteText "Routine review, no new complaints. Dose adjusted, repeat bloods before next visit." .

res:Rx_336 a med:Prescription ;
    med:prescribes res:Med_Ibuprofen ; med:prescribedBy res:Doc_Vikram ;
    med:forPatient res:Pat_SAT213 ; med:date "2024-05-03"^^xsd:date ;
    med:dosage "2 tablets" ;
    med:frequency "Once daily at night" ;
    med:durationDays 90 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_438 med:issuedPrescription res:Rx_336 .
res:Pat_SAT213 med:hasPrescription res:Rx_336 .

res:Enc_439 a med:Consultation ;
    med:encounterOf res:Pat_SAT213 ; med:date "2024-12-07"^^xsd:date ;
    med:time "15:45" ;
    med:attendedBy res:Doc_Sameer ; med:inDepartment res:Dept_Pulmonology ;
    med:reason "Review of c o p d" ;
    med:outcome "Follow up scheduled" ;
    med:recordedCondition res:Cond_302 ;
    med:hasVitals res:Vit_439 ; med:hasNote res:Note_439 .

res:Vit_439 a med:VitalSigns ;
    med:systolic 156 ; med:diastolic 92 ;
    med:heartRate 90 ; med:temperature 97.5 ;
    med:spo2 94 ;
    med:weightKg 58.9 ;
    med:bmi 23.3 .

res:Note_439 a med:ClinicalNote ;
    med:authorName "Dr. Sameer" ;
    med:date "2024-12-07"^^xsd:date ;
    med:noteText "Reviewed in clinic today. Advised on diet, salt restriction and daily walking." .

res:Inv_342 a med:Invoice ;
    med:forPatient res:Pat_SAT213 ; med:date "2024-12-07"^^xsd:date ;
    med:amount 922 ; med:paid true ;
    med:status "Settled" .
res:Inv_342 med:coveredBy res:Policy_SAT213 .
res:Pat_SAT213 med:hasInvoice res:Inv_342 .

res:Enc_440 a med:FollowUp ;
    med:encounterOf res:Pat_SAT213 ; med:date "2025-06-15"^^xsd:date ;
    med:time "11:15" ;
    med:attendedBy res:Doc_Sameer ; med:inDepartment res:Dept_Pulmonology ;
    med:reason "Review of c o p d" ;
    med:outcome "Referred for tests" ;
    med:recordedCondition res:Cond_302 ;
    med:hasVitals res:Vit_440 ; med:hasNote res:Note_440 .

res:Vit_440 a med:VitalSigns ;
    med:systolic 164 ; med:diastolic 102 ;
    med:heartRate 66 ; med:temperature 99.1 ;
    med:spo2 93 ;
    med:weightKg 53.7 ;
    med:bmi 25.2 .

res:Note_440 a med:ClinicalNote ;
    med:authorName "Dr. Sameer" ;
    med:date "2025-06-15"^^xsd:date ;
    med:noteText "Routine review, no new complaints. Reassured. No change to treatment at this stage." .

res:Rx_337 a med:Prescription ;
    med:prescribes res:Med_Salbutamol ; med:prescribedBy res:Doc_Sameer ;
    med:forPatient res:Pat_SAT213 ; med:date "2025-06-15"^^xsd:date ;
    med:dosage "1 dose" ;
    med:frequency "As required" ;
    med:durationDays 30 ;
    med:dispensed true ;
    med:status "Completed" .

res:Rx_338 a med:Prescription ;
    med:prescribes res:Med_Tiotropium ; med:prescribedBy res:Doc_Sameer ;
    med:forPatient res:Pat_SAT213 ; med:date "2025-06-15"^^xsd:date ;
    med:dosage "1 tablet" ;
    med:frequency "Once daily at night" ;
    med:durationDays 60 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_440 med:issuedPrescription res:Rx_337 , res:Rx_338 .
res:Pat_SAT213 med:hasPrescription res:Rx_337 , res:Rx_338 .

res:Inv_343 a med:Invoice ;
    med:forPatient res:Pat_SAT213 ; med:date "2025-06-15"^^xsd:date ;
    med:amount 1807 ; med:paid true ;
    med:status "Settled" .
res:Inv_343 med:coveredBy res:Policy_SAT213 .
res:Pat_SAT213 med:hasInvoice res:Inv_343 .

res:Enc_441 a med:Consultation ;
    med:encounterOf res:Pat_SAT213 ; med:date "2026-02-10"^^xsd:date ;
    med:time "09:00" ;
    med:attendedBy res:Doc_Ramesh ; med:inDepartment res:Dept_GeneralMedicine ;
    med:reason "Review of hypertension" ;
    med:outcome "Follow up scheduled" ;
    med:recordedCondition res:Cond_303 ;
    med:hasVitals res:Vit_441 ; med:hasNote res:Note_441 .

res:Vit_441 a med:VitalSigns ;
    med:systolic 176 ; med:diastolic 102 ;
    med:heartRate 62 ; med:temperature 98.1 ;
    med:spo2 89 ;
    med:weightKg 57.8 ;
    med:bmi 24.9 .

res:Note_441 a med:ClinicalNote ;
    med:authorName "Dr. Ramesh" ;
    med:date "2026-02-10"^^xsd:date ;
    med:noteText "Presents with a two day history of symptoms. Referral raised to the relevant specialty." .

res:Rx_339 a med:Prescription ;
    med:prescribes res:Med_Telmisartan ; med:prescribedBy res:Doc_Ramesh ;
    med:forPatient res:Pat_SAT213 ; med:date "2026-02-10"^^xsd:date ;
    med:dosage "1 tablet" ;
    med:frequency "Twice daily" ;
    med:durationDays 90 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_441 med:issuedPrescription res:Rx_339 .
res:Pat_SAT213 med:hasPrescription res:Rx_339 .

res:Inv_344 a med:Invoice ;
    med:forPatient res:Pat_SAT213 ; med:date "2026-02-10"^^xsd:date ;
    med:amount 2722 ; med:paid true ;
    med:status "Settled" .
res:Inv_344 med:coveredBy res:Policy_SAT213 .
res:Pat_SAT213 med:hasInvoice res:Inv_344 .

res:Enc_442 a med:Consultation ;
    med:encounterOf res:Pat_SAT213 ; med:date "2026-08-22"^^xsd:date ;
    med:time "12:30" ;
    med:attendedBy res:Doc_Vikram ; med:inDepartment res:Dept_Orthopedics ;
    med:reason "Review of osteoarthritis" ;
    med:outcome "Discharged with advice" ;
    med:recordedCondition res:Cond_300 ;
    med:hasVitals res:Vit_442 ; med:hasNote res:Note_442 .

res:Vit_442 a med:VitalSigns ;
    med:systolic 167 ; med:diastolic 106 ;
    med:heartRate 77 ; med:temperature 98.4 ;
    med:spo2 94 ;
    med:weightKg 74.6 ;
    med:bmi 19.9 .

res:Note_442 a med:ClinicalNote ;
    med:authorName "Dr. Vikram" ;
    med:date "2026-08-22"^^xsd:date ;
    med:noteText "Reviewed in clinic today. Referral raised to the relevant specialty." .

res:Rx_340 a med:Prescription ;
    med:prescribes res:Med_Ibuprofen ; med:prescribedBy res:Doc_Vikram ;
    med:forPatient res:Pat_SAT213 ; med:date "2026-08-22"^^xsd:date ;
    med:dosage "1 tablet" ;
    med:frequency "As required" ;
    med:durationDays 90 ;
    med:dispensed true ;
    med:status "Active" .

res:Enc_442 med:issuedPrescription res:Rx_340 .
res:Pat_SAT213 med:hasPrescription res:Rx_340 .

res:Inv_345 a med:Invoice ;
    med:forPatient res:Pat_SAT213 ; med:date "2026-08-22"^^xsd:date ;
    med:amount 4358 ; med:paid true ;
    med:status "Settled" .
res:Inv_345 med:coveredBy res:Policy_SAT213 .
res:Pat_SAT213 med:hasInvoice res:Inv_345 .

res:Policy_SAT213 a med:InsurancePolicy ;
    med:policyNumber "ST-953406" ;
    med:issuedBy res:Ins_StarHealth ; med:coveragePercent 60 ;
    med:amount 500000 .
res:Pat_SAT213 med:hasPolicy res:Policy_SAT213 .

res:Pat_NAV214 a med:OutPatient ;
    med:name "Naveen Das" ; med:mrn "MRN-NAV214" ; med:photoInitials "ND" ;
    med:sex "Male" ; med:dateOfBirth "1979-08-04"^^xsd:date ; med:age 47 ;
    med:bloodGroup "AB-" ; med:phone "+91 99785 437063" ; med:email "naveen.das@example.in" ;
    med:address "35 Bharathi Street, Medavakkam, Chennai" ;
    med:primaryPhysician res:Doc_Vikram ;
    med:hasCondition res:Cond_304 , res:Cond_305 , res:Cond_306 , res:Cond_307 , res:Cond_308 , res:Cond_309 .

res:Cond_304 a med:Condition ;
    med:ofDisease res:Osteoarthritis ; med:onsetDate "2025-03-14"^^xsd:date ;
    med:severity "Mild" ;
    med:clinicalStatus "Active" ;
    med:diagnosedBy res:Doc_Vikram .

res:Cond_305 a med:Condition ;
    med:ofDisease res:Obesity ; med:onsetDate "2020-07-16"^^xsd:date ;
    med:severity "Moderate" ;
    med:clinicalStatus "Active" ;
    med:diagnosedBy res:Doc_Suresh .

res:Cond_306 a med:Condition ;
    med:ofDisease res:Hypertension ; med:onsetDate "2022-01-10"^^xsd:date ;
    med:severity "Moderate" ;
    med:clinicalStatus "Active" ;
    med:diagnosedBy res:Doc_Suresh .

res:Cond_307 a med:Condition ;
    med:ofDisease res:Dengue ; med:onsetDate "2025-02-27"^^xsd:date ;
    med:severity "Mild" ;
    med:clinicalStatus "Active" ;
    med:diagnosedBy res:Doc_Karthik .

res:Cond_308 a med:Condition ;
    med:ofDisease res:CoronaryArteryDisease ; med:onsetDate "2024-11-04"^^xsd:date ;
    med:severity "Mild" ;
    med:clinicalStatus "Active" ;
    med:diagnosedBy res:Doc_Farida .

res:Cond_309 a med:Condition ;
    med:ofDisease res:TypeIIDiabetes ; med:onsetDate "2025-08-26"^^xsd:date ;
    med:severity "Mild" ;
    med:clinicalStatus "Active" ;
    med:diagnosedBy res:Doc_Nithya .

res:Pat_NAV214 med:hasEncounter res:Enc_443 , res:Enc_444 , res:Enc_445 , res:Enc_446 , res:Enc_447 , res:Enc_448 , res:Enc_449 .

res:Enc_443 a med:Consultation ;
    med:encounterOf res:Pat_NAV214 ; med:date "2023-02-12"^^xsd:date ;
    med:time "13:00" ;
    med:attendedBy res:Doc_Nithya ; med:inDepartment res:Dept_Endocrinology ;
    med:reason "First presentation" ;
    med:outcome "Follow up scheduled" ;
    med:recordedCondition res:Cond_305 ;
    med:hasVitals res:Vit_443 ; med:hasNote res:Note_443 .

res:Vit_443 a med:VitalSigns ;
    med:systolic 160 ; med:diastolic 90 ;
    med:heartRate 67 ; med:temperature 99.8 ;
    med:spo2 96 ;
    med:weightKg 88.4 ;
    med:bmi 34.4 .

res:Note_443 a med:ClinicalNote ;
    med:authorName "Dr. Nithya" ;
    med:date "2023-02-12"^^xsd:date ;
    med:noteText "Reviewed in clinic today. Dose adjusted, repeat bloods before next visit." .

res:Inv_346 a med:Invoice ;
    med:forPatient res:Pat_NAV214 ; med:date "2023-02-12"^^xsd:date ;
    med:amount 4038 ; med:paid true ;
    med:status "Settled" .
res:Inv_346 med:coveredBy res:Policy_NAV214 .
res:Pat_NAV214 med:hasInvoice res:Inv_346 .

res:Enc_444 a med:FollowUp ;
    med:encounterOf res:Pat_NAV214 ; med:date "2023-09-11"^^xsd:date ;
    med:time "14:45" ;
    med:attendedBy res:Doc_Suresh ; med:inDepartment res:Dept_GeneralMedicine ;
    med:reason "Review of hypertension" ;
    med:outcome "Treatment continued" ;
    med:recordedCondition res:Cond_306 ;
    med:hasVitals res:Vit_444 ; med:hasNote res:Note_444 .

res:Vit_444 a med:VitalSigns ;
    med:systolic 143 ; med:diastolic 88 ;
    med:heartRate 78 ; med:temperature 100.0 ;
    med:spo2 97 ;
    med:weightKg 101.9 ;
    med:bmi 34.2 .

res:Note_444 a med:ClinicalNote ;
    med:authorName "Dr. Suresh" ;
    med:date "2023-09-11"^^xsd:date ;
    med:noteText "Reviewed in clinic today. Continue current therapy, review in three months." .

res:Rx_341 a med:Prescription ;
    med:prescribes res:Med_Telmisartan ; med:prescribedBy res:Doc_Suresh ;
    med:forPatient res:Pat_NAV214 ; med:date "2023-09-11"^^xsd:date ;
    med:dosage "2 tablets" ;
    med:frequency "Twice daily" ;
    med:durationDays 60 ;
    med:dispensed true ;
    med:status "Completed" .

res:Rx_342 a med:Prescription ;
    med:prescribes res:Med_Metoprolol ; med:prescribedBy res:Doc_Suresh ;
    med:forPatient res:Pat_NAV214 ; med:date "2023-09-11"^^xsd:date ;
    med:dosage "2 tablets" ;
    med:frequency "Once daily" ;
    med:durationDays 90 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_444 med:issuedPrescription res:Rx_341 , res:Rx_342 .
res:Pat_NAV214 med:hasPrescription res:Rx_341 , res:Rx_342 .

res:Inv_347 a med:Invoice ;
    med:forPatient res:Pat_NAV214 ; med:date "2023-09-11"^^xsd:date ;
    med:amount 3114 ; med:paid true ;
    med:status "Settled" .
res:Inv_347 med:coveredBy res:Policy_NAV214 .
res:Pat_NAV214 med:hasInvoice res:Inv_347 .

res:Enc_445 a med:FollowUp ;
    med:encounterOf res:Pat_NAV214 ; med:date "2024-05-14"^^xsd:date ;
    med:time "13:30" ;
    med:attendedBy res:Doc_Joseph ; med:inDepartment res:Dept_GeneralMedicine ;
    med:reason "Review of hypertension" ;
    med:outcome "Discharged with advice" ;
    med:recordedCondition res:Cond_306 ;
    med:hasVitals res:Vit_445 ; med:hasNote res:Note_445 .

res:Vit_445 a med:VitalSigns ;
    med:systolic 172 ; med:diastolic 97 ;
    med:heartRate 102 ; med:temperature 99.9 ;
    med:spo2 96 ;
    med:weightKg 87.7 ;
    med:bmi 34.4 .

res:Note_445 a med:ClinicalNote ;
    med:authorName "Dr. Joseph" ;
    med:date "2024-05-14"^^xsd:date ;
    med:noteText "Attends for scheduled follow up. Referral raised to the relevant specialty." .

res:Inv_348 a med:Invoice ;
    med:forPatient res:Pat_NAV214 ; med:date "2024-05-14"^^xsd:date ;
    med:amount 6087 ; med:paid true ;
    med:status "Settled" .
res:Inv_348 med:coveredBy res:Policy_NAV214 .
res:Pat_NAV214 med:hasInvoice res:Inv_348 .

res:Enc_446 a med:FollowUp ;
    med:encounterOf res:Pat_NAV214 ; med:date "2024-11-17"^^xsd:date ;
    med:time "10:00" ;
    med:attendedBy res:Doc_Ramesh ; med:inDepartment res:Dept_GeneralMedicine ;
    med:reason "Review of hypertension" ;
    med:outcome "Follow up scheduled" ;
    med:recordedCondition res:Cond_306 ;
    med:hasVitals res:Vit_446 ; med:hasNote res:Note_446 .

res:Vit_446 a med:VitalSigns ;
    med:systolic 175 ; med:diastolic 86 ;
    med:heartRate 82 ; med:temperature 97.5 ;
    med:spo2 98 ;
    med:weightKg 82.9 ;
    med:bmi 33.3 .

res:Note_446 a med:ClinicalNote ;
    med:authorName "Dr. Ramesh" ;
    med:date "2024-11-17"^^xsd:date ;
    med:noteText "Seen for worsening symptoms over the past week. Referral raised to the relevant specialty." .

res:Rx_343 a med:Prescription ;
    med:prescribes res:Med_Metoprolol ; med:prescribedBy res:Doc_Ramesh ;
    med:forPatient res:Pat_NAV214 ; med:date "2024-11-17"^^xsd:date ;
    med:dosage "2 tablets" ;
    med:frequency "Three times daily" ;
    med:durationDays 30 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_446 med:issuedPrescription res:Rx_343 .
res:Pat_NAV214 med:hasPrescription res:Rx_343 .

res:Enc_447 a med:FollowUp ;
    med:encounterOf res:Pat_NAV214 ; med:date "2025-06-12"^^xsd:date ;
    med:time "11:30" ;
    med:attendedBy res:Doc_Joseph ; med:inDepartment res:Dept_GeneralMedicine ;
    med:reason "Review of hypertension" ;
    med:outcome "Referred for tests" ;
    med:recordedCondition res:Cond_306 ;
    med:hasVitals res:Vit_447 ; med:hasNote res:Note_447 .

res:Vit_447 a med:VitalSigns ;
    med:systolic 141 ; med:diastolic 100 ;
    med:heartRate 83 ; med:temperature 100.2 ;
    med:spo2 96 ;
    med:weightKg 108.4 ;
    med:bmi 31.8 .

res:Note_447 a med:ClinicalNote ;
    med:authorName "Dr. Joseph" ;
    med:date "2025-06-12"^^xsd:date ;
    med:noteText "Attends for scheduled follow up. Investigations ordered, will call with results." .

res:Inv_349 a med:Invoice ;
    med:forPatient res:Pat_NAV214 ; med:date "2025-06-12"^^xsd:date ;
    med:amount 2278 ; med:paid true ;
    med:status "Settled" .
res:Inv_349 med:coveredBy res:Policy_NAV214 .
res:Pat_NAV214 med:hasInvoice res:Inv_349 .

res:Enc_448 a med:Consultation ;
    med:encounterOf res:Pat_NAV214 ; med:date "2026-01-29"^^xsd:date ;
    med:time "09:30" ;
    med:attendedBy res:Doc_Ramesh ; med:inDepartment res:Dept_Cardiology ;
    med:reason "Review of coronary artery disease" ;
    med:outcome "Follow up scheduled" ;
    med:recordedCondition res:Cond_308 ;
    med:hasVitals res:Vit_448 ; med:hasNote res:Note_448 .

res:Vit_448 a med:VitalSigns ;
    med:systolic 168 ; med:diastolic 107 ;
    med:heartRate 77 ; med:temperature 99.4 ;
    med:spo2 97 ;
    med:weightKg 98.4 ;
    med:bmi 37.6 .

res:Note_448 a med:ClinicalNote ;
    med:authorName "Dr. Ramesh" ;
    med:date "2026-01-29"^^xsd:date ;
    med:noteText "Presents with a two day history of symptoms. Continue current therapy, review in three months." .

res:Rx_344 a med:Prescription ;
    med:prescribes res:Med_Clopidogrel ; med:prescribedBy res:Doc_Ramesh ;
    med:forPatient res:Pat_NAV214 ; med:date "2026-01-29"^^xsd:date ;
    med:dosage "1 dose" ;
    med:frequency "Once daily" ;
    med:durationDays 90 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_448 med:issuedPrescription res:Rx_344 .
res:Pat_NAV214 med:hasPrescription res:Rx_344 .

res:Lab_202 a med:LabOrder ;
    med:analyte "Troponin I" ; med:forPatient res:Pat_NAV214 ;
    med:date "2026-01-29"^^xsd:date ; med:orderedBy res:Doc_Ramesh ;
    med:testsFor res:CoronaryArteryDisease ;
    med:orderStatus "Resulted" ;
    med:hasResult res:Res_202 .

res:Res_202 a med:LabResult ;
    med:analyte "Troponin I" ; med:value 5.71 ; med:unit "ng/mL" ;
    med:refLow 0 ; med:refHigh 0.04 ; med:outOfRange true ;
    med:date "2026-01-30"^^xsd:date ;
    med:performedBy res:Tech_Mohan .

res:Enc_448 med:orderedTest res:Lab_202 .

res:Inv_350 a med:Invoice ;
    med:forPatient res:Pat_NAV214 ; med:date "2026-01-29"^^xsd:date ;
    med:amount 5650 ; med:paid true ;
    med:status "Settled" .
res:Inv_350 med:coveredBy res:Policy_NAV214 .
res:Pat_NAV214 med:hasInvoice res:Inv_350 .

res:Enc_449 a med:FollowUp ;
    med:encounterOf res:Pat_NAV214 ; med:date "2026-08-19"^^xsd:date ;
    med:time "12:45" ;
    med:attendedBy res:Doc_Joseph ; med:inDepartment res:Dept_GeneralMedicine ;
    med:reason "Review of hypertension" ;
    med:outcome "Treatment continued" ;
    med:recordedCondition res:Cond_306 ;
    med:hasVitals res:Vit_449 ; med:hasNote res:Note_449 .

res:Vit_449 a med:VitalSigns ;
    med:systolic 175 ; med:diastolic 90 ;
    med:heartRate 78 ; med:temperature 98.2 ;
    med:spo2 97 ;
    med:weightKg 90.1 ;
    med:bmi 34.5 .

res:Note_449 a med:ClinicalNote ;
    med:authorName "Dr. Joseph" ;
    med:date "2026-08-19"^^xsd:date ;
    med:noteText "Patient reports steady improvement since last visit. Dose adjusted, repeat bloods before next visit." .

res:Rx_345 a med:Prescription ;
    med:prescribes res:Med_Amlodipine ; med:prescribedBy res:Doc_Joseph ;
    med:forPatient res:Pat_NAV214 ; med:date "2026-08-19"^^xsd:date ;
    med:dosage "1 tablet" ;
    med:frequency "Once daily" ;
    med:durationDays 30 ;
    med:dispensed true ;
    med:status "Active" .

res:Rx_346 a med:Prescription ;
    med:prescribes res:Med_Metoprolol ; med:prescribedBy res:Doc_Joseph ;
    med:forPatient res:Pat_NAV214 ; med:date "2026-08-19"^^xsd:date ;
    med:dosage "1 tablet" ;
    med:frequency "As required" ;
    med:durationDays 90 ;
    med:dispensed true ;
    med:status "Active" .

res:Enc_449 med:issuedPrescription res:Rx_345 , res:Rx_346 .
res:Pat_NAV214 med:hasPrescription res:Rx_345 , res:Rx_346 .

res:Inv_351 a med:Invoice ;
    med:forPatient res:Pat_NAV214 ; med:date "2026-08-19"^^xsd:date ;
    med:amount 6070 ; med:paid true ;
    med:status "Settled" .
res:Inv_351 med:coveredBy res:Policy_NAV214 .
res:Pat_NAV214 med:hasInvoice res:Inv_351 .

res:Policy_NAV214 a med:InsurancePolicy ;
    med:policyNumber "CG-201697" ;
    med:issuedBy res:Ins_CGHS ; med:coveragePercent 90 ;
    med:amount 500000 .
res:Pat_NAV214 med:hasPolicy res:Policy_NAV214 .

res:Appt_69 a med:Appointment ;
    med:forPatient res:Pat_NAV214 ; med:appointmentWith res:Doc_Vikram ;
    med:date "2026-09-02"^^xsd:date ;
    med:time "13:40" ;
    med:inDepartment res:Dept_Orthopedics ;
    med:status "Scheduled" .
res:Pat_NAV214 med:hasAppointment res:Appt_69 .

res:Pat_RAJ215 a med:OutPatient ;
    med:name "Rajesh Prabhu" ; med:mrn "MRN-RAJ215" ; med:photoInitials "RP" ;
    med:sex "Male" ; med:dateOfBirth "1950-12-20"^^xsd:date ; med:age 75 ;
    med:bloodGroup "A+" ; med:phone "+91 92214 387277" ; med:email "rajesh.prabhu@example.in" ;
    med:address "50 Velachery Main Road, Tambaram, Chennai" ;
    med:primaryPhysician res:Doc_Nithya ;
    med:allergicTo res:Allergen_Iodine ;
    med:hasCondition res:Cond_310 , res:Cond_311 , res:Cond_312 .

res:Cond_310 a med:Condition ;
    med:ofDisease res:Hypothyroidism ; med:onsetDate "2021-06-29"^^xsd:date ;
    med:severity "Mild" ;
    med:clinicalStatus "Active" ;
    med:diagnosedBy res:Doc_Nithya .

res:Cond_311 a med:Condition ;
    med:ofDisease res:Dyslipidemia ; med:onsetDate "2018-08-21"^^xsd:date ;
    med:severity "Moderate" ;
    med:clinicalStatus "Active" ;
    med:diagnosedBy res:Doc_Joseph .

res:Cond_312 a med:Condition ;
    med:ofDisease res:Pneumonia ; med:onsetDate "2025-03-15"^^xsd:date ;
    med:severity "Mild" ;
    med:clinicalStatus "Resolved" ;
    med:resolvedDate "2025-04-23"^^xsd:date ;
    med:diagnosedBy res:Doc_Joseph .

res:Pat_RAJ215 med:hasEncounter res:Enc_450 , res:Enc_451 , res:Enc_452 , res:Enc_453 .

res:Enc_450 a med:Consultation ;
    med:encounterOf res:Pat_RAJ215 ; med:date "2023-07-25"^^xsd:date ;
    med:time "14:30" ;
    med:attendedBy res:Doc_Nithya ; med:inDepartment res:Dept_Endocrinology ;
    med:reason "First presentation" ;
    med:outcome "Discharged with advice" ;
    med:recordedCondition res:Cond_310 ;
    med:hasVitals res:Vit_450 ; med:hasNote res:Note_450 .

res:Vit_450 a med:VitalSigns ;
    med:systolic 108 ; med:diastolic 72 ;
    med:heartRate 71 ; med:temperature 97.4 ;
    med:spo2 98 ;
    med:weightKg 59.7 ;
    med:bmi 27.8 .

res:Note_450 a med:ClinicalNote ;
    med:authorName "Dr. Nithya" ;
    med:date "2023-07-25"^^xsd:date ;
    med:noteText "Presents with a two day history of symptoms. Counselled on medication adherence. Red flag symptoms explained." .

res:Rx_347 a med:Prescription ;
    med:prescribes res:Med_Levothyroxine ; med:prescribedBy res:Doc_Nithya ;
    med:forPatient res:Pat_RAJ215 ; med:date "2023-07-25"^^xsd:date ;
    med:dosage "2 tablets" ;
    med:frequency "Twice daily" ;
    med:durationDays 90 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_450 med:issuedPrescription res:Rx_347 .
res:Pat_RAJ215 med:hasPrescription res:Rx_347 .

res:Inv_352 a med:Invoice ;
    med:forPatient res:Pat_RAJ215 ; med:date "2023-07-25"^^xsd:date ;
    med:amount 2773 ; med:paid true ;
    med:status "Settled" .
res:Inv_352 med:coveredBy res:Policy_RAJ215 .
res:Pat_RAJ215 med:hasInvoice res:Inv_352 .

res:Enc_451 a med:Consultation ;
    med:encounterOf res:Pat_RAJ215 ; med:date "2024-08-01"^^xsd:date ;
    med:time "18:15" ;
    med:attendedBy res:Doc_Suresh ; med:inDepartment res:Dept_GeneralMedicine ;
    med:reason "Review of dyslipidemia" ;
    med:outcome "Treatment continued" ;
    med:recordedCondition res:Cond_311 ;
    med:hasVitals res:Vit_451 ; med:hasNote res:Note_451 .

res:Vit_451 a med:VitalSigns ;
    med:systolic 123 ; med:diastolic 84 ;
    med:heartRate 102 ; med:temperature 98.6 ;
    med:spo2 100 ;
    med:weightKg 57.4 ;
    med:bmi 23.6 .

res:Note_451 a med:ClinicalNote ;
    med:authorName "Dr. Suresh" ;
    med:date "2024-08-01"^^xsd:date ;
    med:noteText "Seen for worsening symptoms over the past week. Referral raised to the relevant specialty." .

res:Rx_348 a med:Prescription ;
    med:prescribes res:Med_Atorvastatin ; med:prescribedBy res:Doc_Suresh ;
    med:forPatient res:Pat_RAJ215 ; med:date "2024-08-01"^^xsd:date ;
    med:dosage "1 tablet" ;
    med:frequency "Three times daily" ;
    med:durationDays 60 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_451 med:issuedPrescription res:Rx_348 .
res:Pat_RAJ215 med:hasPrescription res:Rx_348 .

res:Lab_203 a med:LabOrder ;
    med:analyte "LDL cholesterol" ; med:forPatient res:Pat_RAJ215 ;
    med:date "2024-08-01"^^xsd:date ; med:orderedBy res:Doc_Suresh ;
    med:testsFor res:Dyslipidemia ;
    med:orderStatus "Resulted" ;
    med:hasResult res:Res_203 .

res:Res_203 a med:LabResult ;
    med:analyte "LDL cholesterol" ; med:value 141.61 ; med:unit "mg/dL" ;
    med:refLow 0 ; med:refHigh 100 ; med:outOfRange true ;
    med:date "2024-08-02"^^xsd:date ;
    med:performedBy res:Tech_Mohan .

res:Lab_204 a med:LabOrder ;
    med:analyte "Triglycerides" ; med:forPatient res:Pat_RAJ215 ;
    med:date "2024-08-01"^^xsd:date ; med:orderedBy res:Doc_Suresh ;
    med:testsFor res:Dyslipidemia ;
    med:orderStatus "Resulted" ;
    med:hasResult res:Res_204 .

res:Res_204 a med:LabResult ;
    med:analyte "Triglycerides" ; med:value 395.75 ; med:unit "mg/dL" ;
    med:refLow 0 ; med:refHigh 150 ; med:outOfRange true ;
    med:date "2024-08-02"^^xsd:date ;
    med:performedBy res:Tech_Mohan .

res:Enc_451 med:orderedTest res:Lab_203 , res:Lab_204 .

res:Inv_353 a med:Invoice ;
    med:forPatient res:Pat_RAJ215 ; med:date "2024-08-01"^^xsd:date ;
    med:amount 4577 ; med:paid true ;
    med:status "Settled" .
res:Inv_353 med:coveredBy res:Policy_RAJ215 .
res:Pat_RAJ215 med:hasInvoice res:Inv_353 .

res:Enc_452 a med:Consultation ;
    med:encounterOf res:Pat_RAJ215 ; med:date "2025-08-10"^^xsd:date ;
    med:time "11:15" ;
    med:attendedBy res:Doc_Sameer ; med:inDepartment res:Dept_Pulmonology ;
    med:reason "Review of pneumonia" ;
    med:outcome "Referred for tests" ;
    med:recordedCondition res:Cond_312 ;
    med:hasVitals res:Vit_452 ; med:hasNote res:Note_452 .

res:Vit_452 a med:VitalSigns ;
    med:systolic 120 ; med:diastolic 73 ;
    med:heartRate 91 ; med:temperature 98.1 ;
    med:spo2 99 ;
    med:weightKg 59.6 ;
    med:bmi 23.3 .

res:Note_452 a med:ClinicalNote ;
    med:authorName "Dr. Sameer" ;
    med:date "2025-08-10"^^xsd:date ;
    med:noteText "Seen for worsening symptoms over the past week. Continue current therapy, review in three months." .

res:Rx_349 a med:Prescription ;
    med:prescribes res:Med_Azithromycin ; med:prescribedBy res:Doc_Sameer ;
    med:forPatient res:Pat_RAJ215 ; med:date "2025-08-10"^^xsd:date ;
    med:dosage "2 tablets" ;
    med:frequency "Once daily" ;
    med:durationDays 5 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_452 med:issuedPrescription res:Rx_349 .
res:Pat_RAJ215 med:hasPrescription res:Rx_349 .

res:Inv_354 a med:Invoice ;
    med:forPatient res:Pat_RAJ215 ; med:date "2025-08-10"^^xsd:date ;
    med:amount 1490 ; med:paid false ;
    med:status "Insurance claim pending" .
res:Inv_354 med:coveredBy res:Policy_RAJ215 .
res:Pat_RAJ215 med:hasInvoice res:Inv_354 .

res:Enc_453 a med:FollowUp ;
    med:encounterOf res:Pat_RAJ215 ; med:date "2026-08-30"^^xsd:date ;
    med:time "12:15" ;
    med:attendedBy res:Doc_Nithya ; med:inDepartment res:Dept_Endocrinology ;
    med:reason "Review of hypothyroidism" ;
    med:outcome "Referred for tests" ;
    med:recordedCondition res:Cond_310 ;
    med:hasVitals res:Vit_453 ; med:hasNote res:Note_453 .

res:Vit_453 a med:VitalSigns ;
    med:systolic 127 ; med:diastolic 83 ;
    med:heartRate 82 ; med:temperature 99.3 ;
    med:spo2 99 ;
    med:weightKg 64.8 ;
    med:bmi 24.5 .

res:Note_453 a med:ClinicalNote ;
    med:authorName "Dr. Nithya" ;
    med:date "2026-08-30"^^xsd:date ;
    med:noteText "Patient reports steady improvement since last visit. Dose adjusted, repeat bloods before next visit." .

res:Rx_350 a med:Prescription ;
    med:prescribes res:Med_Levothyroxine ; med:prescribedBy res:Doc_Nithya ;
    med:forPatient res:Pat_RAJ215 ; med:date "2026-08-30"^^xsd:date ;
    med:dosage "2 tablets" ;
    med:frequency "As required" ;
    med:durationDays 90 ;
    med:dispensed true ;
    med:status "Active" .

res:Enc_453 med:issuedPrescription res:Rx_350 .
res:Pat_RAJ215 med:hasPrescription res:Rx_350 .

res:Lab_205 a med:LabOrder ;
    med:analyte "TSH" ; med:forPatient res:Pat_RAJ215 ;
    med:date "2026-08-30"^^xsd:date ; med:orderedBy res:Doc_Nithya ;
    med:testsFor res:Hypothyroidism ;
    med:orderStatus "Resulted" ;
    med:hasResult res:Res_205 .

res:Res_205 a med:LabResult ;
    med:analyte "TSH" ; med:value 7.29 ; med:unit "mIU/L" ;
    med:refLow 0.4 ; med:refHigh 4 ; med:outOfRange true ;
    med:date "2026-08-30"^^xsd:date ;
    med:performedBy res:Tech_Mohan .

res:Enc_453 med:orderedTest res:Lab_205 .

res:Inv_355 a med:Invoice ;
    med:forPatient res:Pat_RAJ215 ; med:date "2026-08-30"^^xsd:date ;
    med:amount 3755 ; med:paid false ;
    med:status "Insurance claim pending" .
res:Inv_355 med:coveredBy res:Policy_RAJ215 .
res:Pat_RAJ215 med:hasInvoice res:Inv_355 .

res:Policy_RAJ215 a med:InsurancePolicy ;
    med:policyNumber "HD-462206" ;
    med:issuedBy res:Ins_HDFCErgo ; med:coveragePercent 70 ;
    med:amount 500000 .
res:Pat_RAJ215 med:hasPolicy res:Policy_RAJ215 .

res:Appt_70 a med:Appointment ;
    med:forPatient res:Pat_RAJ215 ; med:appointmentWith res:Doc_Nithya ;
    med:date "2026-10-09"^^xsd:date ;
    med:time "15:00" ;
    med:inDepartment res:Dept_Endocrinology ;
    med:status "Scheduled" .
res:Pat_RAJ215 med:hasAppointment res:Appt_70 .

res:Pat_RAV216 a med:OutPatient ;
    med:name "Ravi Nair" ; med:mrn "MRN-RAV216" ; med:photoInitials "RN" ;
    med:sex "Male" ; med:dateOfBirth "1994-07-21"^^xsd:date ; med:age 32 ;
    med:bloodGroup "A-" ; med:phone "+91 96421 993491" ; med:email "ravi.nair@example.in" ;
    med:address "65 Anna Salai, Chromepet, Chennai" ;
    med:primaryPhysician res:Doc_Priya ;
    med:allergicTo res:Allergen_Sulfa ;
    med:hasCondition res:Cond_313 , res:Cond_314 , res:Cond_315 , res:Cond_316 .

res:Cond_313 a med:Condition ;
    med:ofDisease res:Migraine ; med:onsetDate "2026-06-20"^^xsd:date ;
    med:severity "Moderate" ;
    med:clinicalStatus "Active" ;
    med:diagnosedBy res:Doc_Priya .

res:Cond_314 a med:Condition ;
    med:ofDisease res:Depression ; med:onsetDate "2021-02-21"^^xsd:date ;
    med:severity "Moderate" ;
    med:clinicalStatus "Active" ;
    med:diagnosedBy res:Doc_Leela .

res:Cond_315 a med:Condition ;
    med:ofDisease res:Pneumonia ; med:onsetDate "2026-07-29"^^xsd:date ;
    med:severity "Moderate" ;
    med:clinicalStatus "Active" ;
    med:diagnosedBy res:Doc_Sameer .

res:Cond_316 a med:Condition , med:CriticalCondition ;
    med:ofDisease res:BreastCancer ; med:onsetDate "2026-05-15"^^xsd:date ;
    med:severity "Severe" ;
    med:clinicalStatus "Active" ;
    med:diagnosedBy res:Doc_Anand .

res:Pat_RAV216 med:hasEncounter res:Enc_454 , res:Enc_455 , res:Enc_456 .

res:Enc_454 a med:EmergencyVisit ;
    med:encounterOf res:Pat_RAV216 ; med:date "2023-12-09"^^xsd:date ;
    med:time "12:30" ;
    med:attendedBy res:Doc_Karthik ; med:inDepartment res:Dept_Emergency ;
    med:reason "Acute presentation" ;
    med:outcome "Treatment continued" ;
    med:recordedCondition res:Cond_315 ;
    med:hasVitals res:Vit_454 ; med:hasNote res:Note_454 .

res:Vit_454 a med:VitalSigns ;
    med:systolic 133 ; med:diastolic 83 ;
    med:heartRate 91 ; med:temperature 97.7 ;
    med:spo2 99 ;
    med:weightKg 58.9 ;
    med:bmi 24.8 .

res:Note_454 a med:ClinicalNote ;
    med:authorName "Dr. Karthik" ;
    med:date "2023-12-09"^^xsd:date ;
    med:noteText "Referred from general medicine for specialist opinion. Reassured. No change to treatment at this stage." .

res:Rx_351 a med:Prescription ;
    med:prescribes res:Med_Amoxicillin ; med:prescribedBy res:Doc_Karthik ;
    med:forPatient res:Pat_RAV216 ; med:date "2023-12-09"^^xsd:date ;
    med:dosage "1 dose" ;
    med:frequency "Once daily at night" ;
    med:durationDays 5 ;
    med:dispensed true ;
    med:status "Completed" .

res:Rx_352 a med:Prescription ;
    med:prescribes res:Med_Azithromycin ; med:prescribedBy res:Doc_Karthik ;
    med:forPatient res:Pat_RAV216 ; med:date "2023-12-09"^^xsd:date ;
    med:dosage "1 tablet" ;
    med:frequency "Once daily" ;
    med:durationDays 5 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_454 med:issuedPrescription res:Rx_351 , res:Rx_352 .
res:Pat_RAV216 med:hasPrescription res:Rx_351 , res:Rx_352 .

res:Inv_356 a med:Invoice ;
    med:forPatient res:Pat_RAV216 ; med:date "2023-12-09"^^xsd:date ;
    med:amount 14756 ; med:paid true ;
    med:status "Settled" .
res:Inv_356 med:coveredBy res:Policy_RAV216 .
res:Pat_RAV216 med:hasInvoice res:Inv_356 .

res:Enc_455 a med:Consultation ;
    med:encounterOf res:Pat_RAV216 ; med:date "2025-04-01"^^xsd:date ;
    med:time "09:15" ;
    med:attendedBy res:Doc_Anand ; med:inDepartment res:Dept_Oncology ;
    med:reason "Review of breast cancer" ;
    med:outcome "Follow up scheduled" ;
    med:recordedCondition res:Cond_316 ;
    med:hasVitals res:Vit_455 ; med:hasNote res:Note_455 .

res:Vit_455 a med:VitalSigns ;
    med:systolic 131 ; med:diastolic 73 ;
    med:heartRate 67 ; med:temperature 98.2 ;
    med:spo2 100 ;
    med:weightKg 75.0 ;
    med:bmi 27.9 .

res:Note_455 a med:ClinicalNote ;
    med:authorName "Dr. Anand" ;
    med:date "2025-04-01"^^xsd:date ;
    med:noteText "Presents with a two day history of symptoms. Referral raised to the relevant specialty." .

res:Rx_353 a med:Prescription ;
    med:prescribes res:Med_Tamoxifen ; med:prescribedBy res:Doc_Anand ;
    med:forPatient res:Pat_RAV216 ; med:date "2025-04-01"^^xsd:date ;
    med:dosage "1 dose" ;
    med:frequency "Once daily at night" ;
    med:durationDays 5 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_455 med:issuedPrescription res:Rx_353 .
res:Pat_RAV216 med:hasPrescription res:Rx_353 .

res:Lab_206 a med:LabOrder ;
    med:analyte "CA 15-3" ; med:forPatient res:Pat_RAV216 ;
    med:date "2025-04-01"^^xsd:date ; med:orderedBy res:Doc_Anand ;
    med:testsFor res:BreastCancer ;
    med:orderStatus "Resulted" ;
    med:hasResult res:Res_206 .

res:Res_206 a med:LabResult ;
    med:analyte "CA 15-3" ; med:value 12.31 ; med:unit "U/mL" ;
    med:refLow 0 ; med:refHigh 30 ; med:outOfRange false ;
    med:date "2025-04-02"^^xsd:date ;
    med:performedBy res:Tech_Mohan .

res:Enc_455 med:orderedTest res:Lab_206 .

res:Inv_357 a med:Invoice ;
    med:forPatient res:Pat_RAV216 ; med:date "2025-04-01"^^xsd:date ;
    med:amount 5009 ; med:paid true ;
    med:status "Settled" .
res:Inv_357 med:coveredBy res:Policy_RAV216 .
res:Pat_RAV216 med:hasInvoice res:Inv_357 .

res:Enc_456 a med:Consultation ;
    med:encounterOf res:Pat_RAV216 ; med:date "2026-08-15"^^xsd:date ;
    med:time "13:15" ;
    med:attendedBy res:Doc_Anand ; med:inDepartment res:Dept_Oncology ;
    med:reason "Review of breast cancer" ;
    med:outcome "Follow up scheduled" ;
    med:recordedCondition res:Cond_316 ;
    med:hasVitals res:Vit_456 ; med:hasNote res:Note_456 .

res:Vit_456 a med:VitalSigns ;
    med:systolic 109 ; med:diastolic 84 ;
    med:heartRate 73 ; med:temperature 97.2 ;
    med:spo2 96 ;
    med:weightKg 53.0 ;
    med:bmi 25.6 .

res:Note_456 a med:ClinicalNote ;
    med:authorName "Dr. Anand" ;
    med:date "2026-08-15"^^xsd:date ;
    med:noteText "Presents with a two day history of symptoms. Investigations ordered, will call with results." .

res:Rx_354 a med:Prescription ;
    med:prescribes res:Med_Tamoxifen ; med:prescribedBy res:Doc_Anand ;
    med:forPatient res:Pat_RAV216 ; med:date "2026-08-15"^^xsd:date ;
    med:dosage "2 tablets" ;
    med:frequency "Once daily at night" ;
    med:durationDays 5 ;
    med:dispensed false ;
    med:status "Completed" .

res:Enc_456 med:issuedPrescription res:Rx_354 .
res:Pat_RAV216 med:hasPrescription res:Rx_354 .

res:Policy_RAV216 a med:InsurancePolicy ;
    med:policyNumber "NE-727135" ;
    med:issuedBy res:Ins_NewIndia ; med:coveragePercent 90 ;
    med:amount 500000 .
res:Pat_RAV216 med:hasPolicy res:Policy_RAV216 .

res:Pat_MAN217 a med:OutPatient ;
    med:name "Manoj Prabhu" ; med:mrn "MRN-MAN217" ; med:photoInitials "MP" ;
    med:sex "Male" ; med:dateOfBirth "1946-03-19"^^xsd:date ; med:age 80 ;
    med:bloodGroup "B-" ; med:phone "+91 95808 410786" ; med:email "manoj.prabhu@example.in" ;
    med:address "51 ECR, Navalur, Chennai" ;
    med:primaryPhysician res:Doc_Sameer ;
    med:hasCondition res:Cond_317 , res:Cond_318 .

res:Cond_317 a med:Condition ;
    med:ofDisease res:Asthma ; med:onsetDate "2025-01-01"^^xsd:date ;
    med:severity "Moderate" ;
    med:clinicalStatus "Active" ;
    med:diagnosedBy res:Doc_Sameer .

res:Cond_318 a med:Condition ;
    med:ofDisease res:UrinaryTractInfection ; med:onsetDate "2026-03-07"^^xsd:date ;
    med:severity "Moderate" ;
    med:clinicalStatus "Resolved" ;
    med:resolvedDate "2026-07-19"^^xsd:date ;
    med:diagnosedBy res:Doc_Suresh .

res:Pat_MAN217 med:hasEncounter res:Enc_457 , res:Enc_458 , res:Enc_459 .

res:Enc_457 a med:EmergencyVisit ;
    med:encounterOf res:Pat_MAN217 ; med:date "2023-12-08"^^xsd:date ;
    med:time "16:30" ;
    med:attendedBy res:Doc_Karthik ; med:inDepartment res:Dept_Emergency ;
    med:reason "Acute presentation" ;
    med:outcome "Discharged with advice" ;
    med:recordedCondition res:Cond_317 ;
    med:hasVitals res:Vit_457 ; med:hasNote res:Note_457 .

res:Vit_457 a med:VitalSigns ;
    med:systolic 120 ; med:diastolic 84 ;
    med:heartRate 72 ; med:temperature 99.3 ;
    med:spo2 88 ;
    med:weightKg 68.7 ;
    med:bmi 27.2 .

res:Note_457 a med:ClinicalNote ;
    med:authorName "Dr. Karthik" ;
    med:date "2023-12-08"^^xsd:date ;
    med:noteText "Presents with a two day history of symptoms. Investigations ordered, will call with results." .

res:Rx_355 a med:Prescription ;
    med:prescribes res:Med_Salbutamol ; med:prescribedBy res:Doc_Karthik ;
    med:forPatient res:Pat_MAN217 ; med:date "2023-12-08"^^xsd:date ;
    med:dosage "2 tablets" ;
    med:frequency "Once daily" ;
    med:durationDays 30 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_457 med:issuedPrescription res:Rx_355 .
res:Pat_MAN217 med:hasPrescription res:Rx_355 .

res:Inv_358 a med:Invoice ;
    med:forPatient res:Pat_MAN217 ; med:date "2023-12-08"^^xsd:date ;
    med:amount 7435 ; med:paid true ;
    med:status "Settled" .
res:Inv_358 med:coveredBy res:Policy_MAN217 .
res:Pat_MAN217 med:hasInvoice res:Inv_358 .

res:Enc_458 a med:Consultation ;
    med:encounterOf res:Pat_MAN217 ; med:date "2025-04-08"^^xsd:date ;
    med:time "11:15" ;
    med:attendedBy res:Doc_Sameer ; med:inDepartment res:Dept_Pulmonology ;
    med:reason "Review of asthma" ;
    med:outcome "Treatment continued" ;
    med:recordedCondition res:Cond_317 ;
    med:hasVitals res:Vit_458 ; med:hasNote res:Note_458 .

res:Vit_458 a med:VitalSigns ;
    med:systolic 130 ; med:diastolic 81 ;
    med:heartRate 67 ; med:temperature 98.4 ;
    med:spo2 91 ;
    med:weightKg 66.0 ;
    med:bmi 19.5 .

res:Note_458 a med:ClinicalNote ;
    med:authorName "Dr. Sameer" ;
    med:date "2025-04-08"^^xsd:date ;
    med:noteText "Attends for scheduled follow up. Referral raised to the relevant specialty." .

res:Rx_356 a med:Prescription ;
    med:prescribes res:Med_Salbutamol ; med:prescribedBy res:Doc_Sameer ;
    med:forPatient res:Pat_MAN217 ; med:date "2025-04-08"^^xsd:date ;
    med:dosage "2 tablets" ;
    med:frequency "Twice daily" ;
    med:durationDays 90 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_458 med:issuedPrescription res:Rx_356 .
res:Pat_MAN217 med:hasPrescription res:Rx_356 .

res:Inv_359 a med:Invoice ;
    med:forPatient res:Pat_MAN217 ; med:date "2025-04-08"^^xsd:date ;
    med:amount 2393 ; med:paid true ;
    med:status "Settled" .
res:Inv_359 med:coveredBy res:Policy_MAN217 .
res:Pat_MAN217 med:hasInvoice res:Inv_359 .

res:Enc_459 a med:Consultation ;
    med:encounterOf res:Pat_MAN217 ; med:date "2026-08-25"^^xsd:date ;
    med:time "08:00" ;
    med:attendedBy res:Doc_Joseph ; med:inDepartment res:Dept_GeneralMedicine ;
    med:reason "Review of urinary tract infection" ;
    med:outcome "Treatment continued" ;
    med:recordedCondition res:Cond_318 ;
    med:hasVitals res:Vit_459 ; med:hasNote res:Note_459 .

res:Vit_459 a med:VitalSigns ;
    med:systolic 127 ; med:diastolic 78 ;
    med:heartRate 87 ; med:temperature 100.2 ;
    med:spo2 90 ;
    med:weightKg 66.8 ;
    med:bmi 22.5 .

res:Note_459 a med:ClinicalNote ;
    med:authorName "Dr. Joseph" ;
    med:date "2026-08-25"^^xsd:date ;
    med:noteText "Presents with a two day history of symptoms. Counselled on medication adherence. Red flag symptoms explained." .

res:Lab_207 a med:LabOrder ;
    med:analyte "Urine WBC" ; med:forPatient res:Pat_MAN217 ;
    med:date "2026-08-25"^^xsd:date ; med:orderedBy res:Doc_Joseph ;
    med:testsFor res:UrinaryTractInfection ;
    med:orderStatus "Pending" .

res:Enc_459 med:orderedTest res:Lab_207 .

res:Policy_MAN217 a med:InsurancePolicy ;
    med:policyNumber "CG-645515" ;
    med:issuedBy res:Ins_CGHS ; med:coveragePercent 75 ;
    med:amount 750000 .
res:Pat_MAN217 med:hasPolicy res:Policy_MAN217 .

res:Appt_71 a med:Appointment ;
    med:forPatient res:Pat_MAN217 ; med:appointmentWith res:Doc_Sameer ;
    med:date "2026-10-03"^^xsd:date ;
    med:time "16:40" ;
    med:inDepartment res:Dept_Pulmonology ;
    med:status "Scheduled" .
res:Pat_MAN217 med:hasAppointment res:Appt_71 .

res:Pat_NIR218 a med:OutPatient ;
    med:name "Nirmala Ali" ; med:mrn "MRN-NIR218" ; med:photoInitials "NA" ;
    med:sex "Female" ; med:dateOfBirth "1981-07-12"^^xsd:date ; med:age 45 ;
    med:bloodGroup "A+" ; med:phone "+91 99480 774027" ; med:email "nirmala.ali@example.in" ;
    med:address "12 GST Road, Kelambakkam, Chennai" ;
    med:primaryPhysician res:Doc_Nithya ;
    med:hasCondition res:Cond_319 , res:Cond_320 , res:Cond_321 .

res:Cond_319 a med:Condition ;
    med:ofDisease res:Hypothyroidism ; med:onsetDate "2021-05-20"^^xsd:date ;
    med:severity "Mild" ;
    med:clinicalStatus "Active" ;
    med:diagnosedBy res:Doc_Nithya .

res:Cond_320 a med:Condition ;
    med:ofDisease res:CoronaryArteryDisease ; med:onsetDate "2018-02-20"^^xsd:date ;
    med:severity "Moderate" ;
    med:clinicalStatus "Active" ;
    med:diagnosedBy res:Doc_Farida .

res:Cond_321 a med:Condition ;
    med:ofDisease res:HeartFailure ; med:onsetDate "2019-01-09"^^xsd:date ;
    med:severity "Moderate" ;
    med:clinicalStatus "Active" ;
    med:diagnosedBy res:Doc_Farida .

res:Pat_NIR218 med:hasEncounter res:Enc_460 , res:Enc_461 , res:Enc_462 , res:Enc_463 , res:Enc_464 , res:Enc_465 .

res:Enc_460 a med:Consultation ;
    med:encounterOf res:Pat_NIR218 ; med:date "2023-03-28"^^xsd:date ;
    med:time "18:15" ;
    med:attendedBy res:Doc_Nithya ; med:inDepartment res:Dept_Endocrinology ;
    med:reason "First presentation" ;
    med:outcome "Discharged with advice" ;
    med:recordedCondition res:Cond_319 ;
    med:hasVitals res:Vit_460 ; med:hasNote res:Note_460 .

res:Vit_460 a med:VitalSigns ;
    med:systolic 121 ; med:diastolic 69 ;
    med:heartRate 62 ; med:temperature 98.6 ;
    med:spo2 97 ;
    med:weightKg 52.4 ;
    med:bmi 24.7 .

res:Note_460 a med:ClinicalNote ;
    med:authorName "Dr. Nithya" ;
    med:date "2023-03-28"^^xsd:date ;
    med:noteText "Post discharge review. Continue current therapy, review in three months." .

res:Rx_357 a med:Prescription ;
    med:prescribes res:Med_Levothyroxine ; med:prescribedBy res:Doc_Nithya ;
    med:forPatient res:Pat_NIR218 ; med:date "2023-03-28"^^xsd:date ;
    med:dosage "1 dose" ;
    med:frequency "Twice daily" ;
    med:durationDays 30 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_460 med:issuedPrescription res:Rx_357 .
res:Pat_NIR218 med:hasPrescription res:Rx_357 .

res:Inv_360 a med:Invoice ;
    med:forPatient res:Pat_NIR218 ; med:date "2023-03-28"^^xsd:date ;
    med:amount 2864 ; med:paid false ;
    med:status "Insurance claim pending" .
res:Inv_360 med:coveredBy res:Policy_NIR218 .
res:Pat_NIR218 med:hasInvoice res:Inv_360 .

res:Enc_461 a med:Consultation ;
    med:encounterOf res:Pat_NIR218 ; med:date "2023-12-15"^^xsd:date ;
    med:time "11:30" ;
    med:attendedBy res:Doc_Farida ; med:inDepartment res:Dept_Cardiology ;
    med:reason "Review of coronary artery disease" ;
    med:outcome "Treatment continued" ;
    med:recordedCondition res:Cond_320 ;
    med:hasVitals res:Vit_461 ; med:hasNote res:Note_461 .

res:Vit_461 a med:VitalSigns ;
    med:systolic 123 ; med:diastolic 70 ;
    med:heartRate 74 ; med:temperature 97.9 ;
    med:spo2 98 ;
    med:weightKg 62.0 ;
    med:bmi 27.4 .

res:Note_461 a med:ClinicalNote ;
    med:authorName "Dr. Farida" ;
    med:date "2023-12-15"^^xsd:date ;
    med:noteText "Presents with a two day history of symptoms. Investigations ordered, will call with results." .

res:Lab_208 a med:LabOrder ;
    med:analyte "Troponin I" ; med:forPatient res:Pat_NIR218 ;
    med:date "2023-12-15"^^xsd:date ; med:orderedBy res:Doc_Farida ;
    med:testsFor res:CoronaryArteryDisease ;
    med:orderStatus "Resulted" ;
    med:hasResult res:Res_208 .

res:Res_208 a med:LabResult ;
    med:analyte "Troponin I" ; med:value 0.94 ; med:unit "ng/mL" ;
    med:refLow 0 ; med:refHigh 0.04 ; med:outOfRange true ;
    med:date "2023-12-16"^^xsd:date ;
    med:performedBy res:Tech_Mohan .

res:Enc_461 med:orderedTest res:Lab_208 .

res:Inv_361 a med:Invoice ;
    med:forPatient res:Pat_NIR218 ; med:date "2023-12-15"^^xsd:date ;
    med:amount 1367 ; med:paid false ;
    med:status "Insurance claim pending" .
res:Inv_361 med:coveredBy res:Policy_NIR218 .
res:Pat_NIR218 med:hasInvoice res:Inv_361 .

res:Enc_462 a med:Consultation ;
    med:encounterOf res:Pat_NIR218 ; med:date "2024-07-24"^^xsd:date ;
    med:time "14:00" ;
    med:attendedBy res:Doc_Nithya ; med:inDepartment res:Dept_Endocrinology ;
    med:reason "Review of hypothyroidism" ;
    med:outcome "Discharged with advice" ;
    med:recordedCondition res:Cond_319 ;
    med:hasVitals res:Vit_462 ; med:hasNote res:Note_462 .

res:Vit_462 a med:VitalSigns ;
    med:systolic 122 ; med:diastolic 68 ;
    med:heartRate 94 ; med:temperature 99.5 ;
    med:spo2 96 ;
    med:weightKg 64.0 ;
    med:bmi 25.1 .

res:Note_462 a med:ClinicalNote ;
    med:authorName "Dr. Nithya" ;
    med:date "2024-07-24"^^xsd:date ;
    med:noteText "Referred from general medicine for specialist opinion. Counselled on medication adherence. Red flag symptoms explained." .

res:Rx_358 a med:Prescription ;
    med:prescribes res:Med_Levothyroxine ; med:prescribedBy res:Doc_Nithya ;
    med:forPatient res:Pat_NIR218 ; med:date "2024-07-24"^^xsd:date ;
    med:dosage "1 dose" ;
    med:frequency "Once daily at night" ;
    med:durationDays 60 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_462 med:issuedPrescription res:Rx_358 .
res:Pat_NIR218 med:hasPrescription res:Rx_358 .

res:Lab_209 a med:LabOrder ;
    med:analyte "TSH" ; med:forPatient res:Pat_NIR218 ;
    med:date "2024-07-24"^^xsd:date ; med:orderedBy res:Doc_Nithya ;
    med:testsFor res:Hypothyroidism ;
    med:orderStatus "Resulted" ;
    med:hasResult res:Res_209 .

res:Res_209 a med:LabResult ;
    med:analyte "TSH" ; med:value 10.18 ; med:unit "mIU/L" ;
    med:refLow 0.4 ; med:refHigh 4 ; med:outOfRange true ;
    med:date "2024-07-25"^^xsd:date ;
    med:performedBy res:Tech_Mohan .

res:Enc_462 med:orderedTest res:Lab_209 .

res:Enc_463 a med:FollowUp ;
    med:encounterOf res:Pat_NIR218 ; med:date "2025-04-19"^^xsd:date ;
    med:time "17:45" ;
    med:attendedBy res:Doc_Ramesh ; med:inDepartment res:Dept_Cardiology ;
    med:reason "Review of heart failure" ;
    med:outcome "Follow up scheduled" ;
    med:recordedCondition res:Cond_321 ;
    med:hasVitals res:Vit_463 ; med:hasNote res:Note_463 .

res:Vit_463 a med:VitalSigns ;
    med:systolic 131 ; med:diastolic 79 ;
    med:heartRate 91 ; med:temperature 97.3 ;
    med:spo2 100 ;
    med:weightKg 62.5 ;
    med:bmi 20.1 .

res:Note_463 a med:ClinicalNote ;
    med:authorName "Dr. Ramesh" ;
    med:date "2025-04-19"^^xsd:date ;
    med:noteText "Patient reports steady improvement since last visit. Advised on diet, salt restriction and daily walking." .

res:Rx_359 a med:Prescription ;
    med:prescribes res:Med_Metoprolol ; med:prescribedBy res:Doc_Ramesh ;
    med:forPatient res:Pat_NIR218 ; med:date "2025-04-19"^^xsd:date ;
    med:dosage "1 tablet" ;
    med:frequency "Once daily" ;
    med:durationDays 90 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_463 med:issuedPrescription res:Rx_359 .
res:Pat_NIR218 med:hasPrescription res:Rx_359 .

res:Lab_210 a med:LabOrder ;
    med:analyte "NT-proBNP" ; med:forPatient res:Pat_NIR218 ;
    med:date "2025-04-19"^^xsd:date ; med:orderedBy res:Doc_Ramesh ;
    med:testsFor res:HeartFailure ;
    med:orderStatus "Resulted" ;
    med:hasResult res:Res_210 .

res:Res_210 a med:LabResult ;
    med:analyte "NT-proBNP" ; med:value 1647.69 ; med:unit "pg/mL" ;
    med:refLow 0 ; med:refHigh 125 ; med:outOfRange true ;
    med:date "2025-04-20"^^xsd:date ;
    med:performedBy res:Tech_Mohan .

res:Enc_463 med:orderedTest res:Lab_210 .

res:Inv_362 a med:Invoice ;
    med:forPatient res:Pat_NIR218 ; med:date "2025-04-19"^^xsd:date ;
    med:amount 3578 ; med:paid true ;
    med:status "Settled" .
res:Inv_362 med:coveredBy res:Policy_NIR218 .
res:Pat_NIR218 med:hasInvoice res:Inv_362 .

res:Enc_464 a med:FollowUp ;
    med:encounterOf res:Pat_NIR218 ; med:date "2025-12-19"^^xsd:date ;
    med:time "16:15" ;
    med:attendedBy res:Doc_Farida ; med:inDepartment res:Dept_Cardiology ;
    med:reason "Review of heart failure" ;
    med:outcome "Follow up scheduled" ;
    med:recordedCondition res:Cond_321 ;
    med:hasVitals res:Vit_464 ; med:hasNote res:Note_464 .

res:Vit_464 a med:VitalSigns ;
    med:systolic 129 ; med:diastolic 69 ;
    med:heartRate 64 ; med:temperature 98.0 ;
    med:spo2 97 ;
    med:weightKg 55.1 ;
    med:bmi 24.8 .

res:Note_464 a med:ClinicalNote ;
    med:authorName "Dr. Farida" ;
    med:date "2025-12-19"^^xsd:date ;
    med:noteText "Routine review, no new complaints. Dose adjusted, repeat bloods before next visit." .

res:Rx_360 a med:Prescription ;
    med:prescribes res:Med_Furosemide ; med:prescribedBy res:Doc_Farida ;
    med:forPatient res:Pat_NIR218 ; med:date "2025-12-19"^^xsd:date ;
    med:dosage "1 dose" ;
    med:frequency "Three times daily" ;
    med:durationDays 90 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_464 med:issuedPrescription res:Rx_360 .
res:Pat_NIR218 med:hasPrescription res:Rx_360 .

res:Lab_211 a med:LabOrder ;
    med:analyte "NT-proBNP" ; med:forPatient res:Pat_NIR218 ;
    med:date "2025-12-19"^^xsd:date ; med:orderedBy res:Doc_Farida ;
    med:testsFor res:HeartFailure ;
    med:orderStatus "Resulted" ;
    med:hasResult res:Res_211 .

res:Res_211 a med:LabResult ;
    med:analyte "NT-proBNP" ; med:value 835.66 ; med:unit "pg/mL" ;
    med:refLow 0 ; med:refHigh 125 ; med:outOfRange true ;
    med:date "2025-12-20"^^xsd:date ;
    med:performedBy res:Tech_Mohan .

res:Enc_464 med:orderedTest res:Lab_211 .

res:Enc_465 a med:EmergencyVisit ;
    med:encounterOf res:Pat_NIR218 ; med:date "2026-08-16"^^xsd:date ;
    med:time "09:45" ;
    med:attendedBy res:Doc_Karthik ; med:inDepartment res:Dept_Emergency ;
    med:reason "Acute presentation" ;
    med:outcome "Referred for tests" ;
    med:recordedCondition res:Cond_321 ;
    med:hasVitals res:Vit_465 ; med:hasNote res:Note_465 .

res:Vit_465 a med:VitalSigns ;
    med:systolic 122 ; med:diastolic 83 ;
    med:heartRate 93 ; med:temperature 100.6 ;
    med:spo2 98 ;
    med:weightKg 75.7 ;
    med:bmi 23.8 .

res:Note_465 a med:ClinicalNote ;
    med:authorName "Dr. Karthik" ;
    med:date "2026-08-16"^^xsd:date ;
    med:noteText "Referred from general medicine for specialist opinion. Investigations ordered, will call with results." .

res:Lab_212 a med:LabOrder ;
    med:analyte "NT-proBNP" ; med:forPatient res:Pat_NIR218 ;
    med:date "2026-08-16"^^xsd:date ; med:orderedBy res:Doc_Karthik ;
    med:testsFor res:HeartFailure ;
    med:orderStatus "Pending" .

res:Enc_465 med:orderedTest res:Lab_212 .

res:Inv_363 a med:Invoice ;
    med:forPatient res:Pat_NIR218 ; med:date "2026-08-16"^^xsd:date ;
    med:amount 7850 ; med:paid false ;
    med:status "Insurance claim pending" .
res:Inv_363 med:coveredBy res:Policy_NIR218 .
res:Pat_NIR218 med:hasInvoice res:Inv_363 .

res:Policy_NIR218 a med:InsurancePolicy ;
    med:policyNumber "NE-979455" ;
    med:issuedBy res:Ins_NewIndia ; med:coveragePercent 90 ;
    med:amount 1000000 .
res:Pat_NIR218 med:hasPolicy res:Policy_NIR218 .

res:Appt_72 a med:Appointment ;
    med:forPatient res:Pat_NIR218 ; med:appointmentWith res:Doc_Nithya ;
    med:date "2026-09-09"^^xsd:date ;
    med:time "10:20" ;
    med:inDepartment res:Dept_Endocrinology ;
    med:status "Scheduled" .
res:Pat_NIR218 med:hasAppointment res:Appt_72 .

res:Pat_KIR219 a med:InPatient ;
    med:name "Kiran Ali" ; med:mrn "MRN-KIR219" ; med:photoInitials "KA" ;
    med:sex "Male" ; med:dateOfBirth "1957-03-21"^^xsd:date ; med:age 69 ;
    med:bloodGroup "A-" ; med:phone "+91 99177 978830" ; med:email "kiran.ali@example.in" ;
    med:address "67 ECR, Perungudi, Chennai" ;
    med:primaryPhysician res:Doc_Priya ;
    med:allergicTo res:Allergen_Sulfa ;
    med:hasCondition res:Cond_322 , res:Cond_323 .

res:Cond_322 a med:Condition ;
    med:ofDisease res:Stroke ; med:onsetDate "2025-04-20"^^xsd:date ;
    med:severity "Moderate" ;
    med:clinicalStatus "Resolved" ;
    med:resolvedDate "2025-09-04"^^xsd:date ;
    med:diagnosedBy res:Doc_Priya .

res:Cond_323 a med:Condition ;
    med:ofDisease res:Dementia ; med:onsetDate "2020-10-08"^^xsd:date ;
    med:severity "Moderate" ;
    med:clinicalStatus "Active" ;
    med:diagnosedBy res:Doc_Priya .

res:Pat_KIR219 med:hasEncounter res:Enc_466 , res:Enc_467 , res:Enc_468 .

res:Enc_466 a med:Consultation ;
    med:encounterOf res:Pat_KIR219 ; med:date "2023-11-18"^^xsd:date ;
    med:time "13:45" ;
    med:attendedBy res:Doc_Priya ; med:inDepartment res:Dept_Neurology ;
    med:reason "First presentation" ;
    med:outcome "Treatment continued" ;
    med:recordedCondition res:Cond_322 ;
    med:hasVitals res:Vit_466 ; med:hasNote res:Note_466 .

res:Vit_466 a med:VitalSigns ;
    med:systolic 117 ; med:diastolic 68 ;
    med:heartRate 65 ; med:temperature 99.0 ;
    med:spo2 99 ;
    med:weightKg 63.1 ;
    med:bmi 24.8 .

res:Note_466 a med:ClinicalNote ;
    med:authorName "Dr. Priya" ;
    med:date "2023-11-18"^^xsd:date ;
    med:noteText "Reviewed in clinic today. Investigations ordered, will call with results." .

res:Rx_361 a med:Prescription ;
    med:prescribes res:Med_Warfarin ; med:prescribedBy res:Doc_Priya ;
    med:forPatient res:Pat_KIR219 ; med:date "2023-11-18"^^xsd:date ;
    med:dosage "2 tablets" ;
    med:frequency "Once daily at night" ;
    med:durationDays 5 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_466 med:issuedPrescription res:Rx_361 .
res:Pat_KIR219 med:hasPrescription res:Rx_361 .

res:Lab_213 a med:LabOrder ;
    med:analyte "INR" ; med:forPatient res:Pat_KIR219 ;
    med:date "2023-11-18"^^xsd:date ; med:orderedBy res:Doc_Priya ;
    med:testsFor res:Stroke ;
    med:orderStatus "Resulted" ;
    med:hasResult res:Res_213 .

res:Res_213 a med:LabResult ;
    med:analyte "INR" ; med:value 2.67 ; med:unit "ratio" ;
    med:refLow 0.9 ; med:refHigh 1.2 ; med:outOfRange true ;
    med:date "2023-11-19"^^xsd:date ;
    med:performedBy res:Tech_Mohan .

res:Enc_466 med:orderedTest res:Lab_213 .

res:Enc_467 a med:Consultation ;
    med:encounterOf res:Pat_KIR219 ; med:date "2025-04-09"^^xsd:date ;
    med:time "18:30" ;
    med:attendedBy res:Doc_Priya ; med:inDepartment res:Dept_Neurology ;
    med:reason "Review of stroke" ;
    med:outcome "Follow up scheduled" ;
    med:recordedCondition res:Cond_322 ;
    med:hasVitals res:Vit_467 ; med:hasNote res:Note_467 .

res:Vit_467 a med:VitalSigns ;
    med:systolic 114 ; med:diastolic 69 ;
    med:heartRate 80 ; med:temperature 99.5 ;
    med:spo2 98 ;
    med:weightKg 68.6 ;
    med:bmi 26.3 .

res:Note_467 a med:ClinicalNote ;
    med:authorName "Dr. Priya" ;
    med:date "2025-04-09"^^xsd:date ;
    med:noteText "Presents with a two day history of symptoms. Referral raised to the relevant specialty." .

res:Rx_362 a med:Prescription ;
    med:prescribes res:Med_Warfarin ; med:prescribedBy res:Doc_Priya ;
    med:forPatient res:Pat_KIR219 ; med:date "2025-04-09"^^xsd:date ;
    med:dosage "1 dose" ;
    med:frequency "Three times daily" ;
    med:durationDays 7 ;
    med:dispensed true ;
    med:status "Completed" .

res:Rx_363 a med:Prescription ;
    med:prescribes res:Med_Clopidogrel ; med:prescribedBy res:Doc_Priya ;
    med:forPatient res:Pat_KIR219 ; med:date "2025-04-09"^^xsd:date ;
    med:dosage "1 tablet" ;
    med:frequency "Three times daily" ;
    med:durationDays 5 ;
    med:dispensed true ;
    med:status "Completed" .

res:Enc_467 med:issuedPrescription res:Rx_362 , res:Rx_363 .
res:Pat_KIR219 med:hasPrescription res:Rx_362 , res:Rx_363 .

res:Inv_364 a med:Invoice ;
    med:forPatient res:Pat_KIR219 ; med:date "2025-04-09"^^xsd:date ;
    med:amount 1593 ; med:paid true ;
    med:status "Settled" .
res:Inv_364 med:coveredBy res:Policy_KIR219 .
res:Pat_KIR219 med:hasInvoice res:Inv_364 .

res:Enc_468 a med:Consultation ;
    med:encounterOf res:Pat_KIR219 ; med:date "2026-08-29"^^xsd:date ;
    med:time "08:30" ;
    med:attendedBy res:Doc_Priya ; med:inDepartment res:Dept_Neurology ;
    med:reason "Review of dementia" ;
    med:outcome "Treatment continued" ;
    med:recordedCondition res:Cond_323 ;
    med:hasVitals res:Vit_468 ; med:hasNote res:Note_468 .

res:Vit_468 a med:VitalSigns ;
    med:systolic 131 ; med:diastolic 84 ;
    med:heartRate 64 ; med:temperature 100.4 ;
    med:spo2 97 ;
    med:weightKg 75.6 ;
    med:bmi 24.1 .

res:Note_468 a med:ClinicalNote ;
    med:authorName "Dr. Priya" ;
    med:date "2026-08-29"^^xsd:date ;
    med:noteText "Reviewed in clinic today. Advised on diet, salt restriction and daily walking." .

res:Policy_KIR219 a med:InsurancePolicy ;
    med:policyNumber "CG-253593" ;
    med:issuedBy res:Ins_CGHS ; med:coveragePercent 85 ;
    med:amount 1000000 .
res:Pat_KIR219 med:hasPolicy res:Policy_KIR219 .

res:Pat_KIR219 med:assignedBed res:Bed_3 .

`;
