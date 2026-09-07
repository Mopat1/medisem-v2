/* =============================================================================
   ontology.js — the TBox.

   An OWL 2 ontology for hospital management, written in Turtle. It is held as a
   string so the whole application stays a static bundle with no fetch calls,
   which also means it works when opened straight from the file system.
   ========================================================================== */
var ONTOLOGY_TTL = `
@prefix med:    <http://medisem.org/onto#> .
@prefix res:    <http://medisem.org/resource/> .
@prefix owl:    <http://www.w3.org/2002/07/owl#> .
@prefix rdf:    <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .
@prefix rdfs:   <http://www.w3.org/2000/01/rdf-schema#> .
@prefix xsd:    <http://www.w3.org/2001/XMLSchema#> .
@prefix foaf:   <http://xmlns.com/foaf/0.1/> .
@prefix schema: <https://schema.org/> .
@prefix dct:    <http://purl.org/dc/terms/> .
@prefix skos:   <http://www.w3.org/2004/02/skos/core#> .
@prefix vann:   <http://purl.org/vocab/vann/> .

#################################################################
#  Ontology header
#################################################################

<http://medisem.org/onto> a owl:Ontology ;
    dct:title "MediSem Hospital Management Ontology"@en ;
    dct:description "An OWL 2 ontology for hospital operations: people, encounters, conditions, medication, laboratory work, comorbidity and billing."@en ;
    dct:license <https://creativecommons.org/licenses/by/4.0/> ;
    vann:preferredNamespacePrefix "med" ;
    vann:preferredNamespaceUri "http://medisem.org/onto#" ;
    owl:versionInfo "2.0.0" ;
    rdfs:seeAlso <https://schema.org/MedicalOrganization> .

#################################################################
#  People
#################################################################

med:Person a owl:Class ; owl:equivalentClass foaf:Person ; rdfs:label "Person"@en .

med:Patient a owl:Class ;
    rdfs:subClassOf med:Person , schema:Patient ;
    owl:disjointWith med:Staff ;
    rdfs:label "Patient"@en ;
    rdfs:comment "A person registered for care at this hospital."@en .

med:Staff a owl:Class ; rdfs:subClassOf med:Person ; rdfs:label "Staff member"@en .
med:Doctor a owl:Class ; rdfs:subClassOf med:Staff , schema:Physician ; owl:disjointWith med:Nurse ; rdfs:label "Doctor"@en .
med:Nurse a owl:Class ; rdfs:subClassOf med:Staff ; rdfs:label "Nurse"@en .
med:LabTechnician a owl:Class ; rdfs:subClassOf med:Staff ; rdfs:label "Laboratory technician"@en .
med:Pharmacist a owl:Class ; rdfs:subClassOf med:Staff ; rdfs:label "Pharmacist"@en .
med:Administrator a owl:Class ; rdfs:subClassOf med:Staff ; rdfs:label "Administrator"@en .

med:Clinician a owl:Class ;
    rdfs:label "Clinician"@en ;
    rdfs:comment "Anyone qualified to deliver care. Defined as the union of doctors and nurses, so nobody is ever typed as one directly."@en ;
    owl:equivalentClass [ a owl:Class ; owl:unionOf ( med:Doctor med:Nurse ) ] .

med:Cardiologist a owl:Class ; rdfs:subClassOf med:Doctor ; rdfs:label "Cardiologist"@en .
med:Neurologist a owl:Class ; rdfs:subClassOf med:Doctor ; rdfs:label "Neurologist"@en .
med:Oncologist a owl:Class ; rdfs:subClassOf med:Doctor ; rdfs:label "Oncologist"@en .
med:Endocrinologist a owl:Class ; rdfs:subClassOf med:Doctor ; rdfs:label "Endocrinologist"@en .
med:Pulmonologist a owl:Class ; rdfs:subClassOf med:Doctor ; rdfs:label "Pulmonologist"@en .
med:Nephrologist a owl:Class ; rdfs:subClassOf med:Doctor ; rdfs:label "Nephrologist"@en .
med:Pediatrician a owl:Class ; rdfs:subClassOf med:Doctor ; rdfs:label "Paediatrician"@en .
med:Orthopedist a owl:Class ; rdfs:subClassOf med:Doctor ; rdfs:label "Orthopaedic surgeon"@en .
med:Psychiatrist a owl:Class ; rdfs:subClassOf med:Doctor ; rdfs:label "Psychiatrist"@en .
med:GeneralPhysician a owl:Class ; rdfs:subClassOf med:Doctor ; rdfs:label "General physician"@en .
med:EmergencyPhysician a owl:Class ; rdfs:subClassOf med:Doctor ; rdfs:label "Emergency physician"@en .

#################################################################
#  Patient categories, several of them computed rather than stated
#################################################################

med:InPatient a owl:Class ;
    rdfs:subClassOf med:Patient ;
    owl:disjointWith med:OutPatient ;
    rdfs:label "In-patient"@en ;
    rdfs:subClassOf [ a owl:Restriction ; owl:onProperty med:assignedBed ; owl:someValuesFrom med:Bed ] .

med:OutPatient a owl:Class ; rdfs:subClassOf med:Patient ; rdfs:label "Out-patient"@en .

med:CriticalPatient a owl:Class ;
    rdfs:label "Critical patient"@en ;
    rdfs:comment "Never asserted. Any patient carrying a diagnosis of critical severity."@en ;
    owl:equivalentClass [ a owl:Restriction ; owl:onProperty med:hasCondition ; owl:someValuesFrom med:CriticalCondition ] .

med:ChronicPatient a owl:Class ;
    rdfs:label "Chronic patient"@en ;
    rdfs:comment "Never asserted. Any patient with at least one long-term condition."@en ;
    owl:equivalentClass [ a owl:Restriction ; owl:onProperty med:suffersFrom ; owl:someValuesFrom med:ChronicDisease ] .

med:AllergicPatient a owl:Class ;
    rdfs:label "Patient with allergies"@en ;
    owl:equivalentClass [ a owl:Restriction ; owl:onProperty med:allergicTo ; owl:someValuesFrom med:Substance ] .

med:PolypharmacyPatient a owl:Class ;
    rdfs:label "Polypharmacy patient"@en ;
    rdfs:comment "Flagged when a patient is on an anticoagulant, which is the highest interaction-risk class in this formulary."@en ;
    owl:equivalentClass [ a owl:Restriction ; owl:onProperty med:takesMedication ; owl:someValuesFrom med:Anticoagulant ] .

med:CardiacTeamMember a owl:Class ;
    rdfs:label "Cardiac team member"@en ;
    rdfs:comment "Defined with owl:hasValue: anyone whose department is cardiology."@en ;
    owl:equivalentClass [ a owl:Restriction ; owl:onProperty med:worksIn ; owl:hasValue res:Dept_Cardiology ] .

#################################################################
#  Encounters: the visit history model
#################################################################

med:Encounter a owl:Class ;
    rdfs:label "Encounter"@en ;
    rdfs:comment "One episode of contact between a patient and the hospital. The unit of the visit history."@en .

med:Consultation a owl:Class ; rdfs:subClassOf med:Encounter ; rdfs:label "Out-patient consultation"@en .
med:FollowUp a owl:Class ; rdfs:subClassOf med:Encounter ; rdfs:label "Follow-up visit"@en .
med:EmergencyVisit a owl:Class ; rdfs:subClassOf med:Encounter ; rdfs:label "Emergency visit"@en .
med:Admission a owl:Class ; rdfs:subClassOf med:Encounter ; rdfs:label "In-patient admission"@en .
med:DayCareVisit a owl:Class ; rdfs:subClassOf med:Encounter ; rdfs:label "Day care visit"@en .
med:Screening a owl:Class ; rdfs:subClassOf med:Encounter ; rdfs:label "Screening visit"@en .

med:UnplannedEncounter a owl:Class ;
    rdfs:label "Unplanned encounter"@en ;
    rdfs:comment "Emergency visits and admissions together. Used for readmission analytics."@en ;
    owl:equivalentClass [ a owl:Class ; owl:unionOf ( med:EmergencyVisit med:Admission ) ] .

med:VitalSigns a owl:Class ; rdfs:label "Vital signs"@en .
med:ClinicalNote a owl:Class ; rdfs:label "Clinical note"@en .

#################################################################
#  Conditions and diseases
#################################################################

med:Condition a owl:Class ;
    rdfs:label "Recorded condition"@en ;
    rdfs:comment "A disease as recorded for one patient at one point in time, with its own onset, severity and status."@en .

med:CriticalCondition a owl:Class ; rdfs:subClassOf med:Condition ; rdfs:label "Critical condition"@en .
med:ActiveCondition a owl:Class ; rdfs:subClassOf med:Condition ; rdfs:label "Active condition"@en .
med:ResolvedCondition a owl:Class ; rdfs:subClassOf med:Condition ; rdfs:label "Resolved condition"@en .

med:Disease a owl:Class ; rdfs:subClassOf schema:MedicalCondition ; rdfs:label "Disease"@en .
med:ChronicDisease a owl:Class ; rdfs:subClassOf med:Disease ; rdfs:label "Chronic disease"@en .
med:AcuteDisease a owl:Class ; rdfs:subClassOf med:Disease ; rdfs:label "Acute disease"@en .
med:CardiovascularDisease a owl:Class ; rdfs:subClassOf med:Disease ; rdfs:label "Cardiovascular disease"@en .
med:MetabolicDisease a owl:Class ; rdfs:subClassOf med:Disease ; rdfs:label "Metabolic disease"@en .
med:RespiratoryDisease a owl:Class ; rdfs:subClassOf med:Disease ; rdfs:label "Respiratory disease"@en .
med:NeurologicalDisease a owl:Class ; rdfs:subClassOf med:Disease ; rdfs:label "Neurological disease"@en .
med:RenalDisease a owl:Class ; rdfs:subClassOf med:Disease ; rdfs:label "Renal disease"@en .
med:MentalHealthCondition a owl:Class ; rdfs:subClassOf med:Disease ; rdfs:label "Mental health condition"@en .
med:MusculoskeletalDisease a owl:Class ; rdfs:subClassOf med:Disease ; rdfs:label "Musculoskeletal disease"@en .
med:Neoplasm a owl:Class ; rdfs:subClassOf med:Disease ; rdfs:label "Neoplasm"@en .
med:InfectiousDisease a owl:Class ; rdfs:subClassOf med:AcuteDisease ; rdfs:label "Infectious disease"@en .
med:HaematologicalDisease a owl:Class ; rdfs:subClassOf med:Disease ; rdfs:label "Haematological disease"@en .

med:Symptom a owl:Class ; rdfs:label "Symptom"@en .
med:RiskFactor a owl:Class ; rdfs:label "Risk factor"@en .

#################################################################
#  Treatment and medication
#################################################################

med:Treatment a owl:Class ; rdfs:label "Treatment"@en .
med:Surgery a owl:Class ; rdfs:subClassOf med:Treatment ; rdfs:label "Surgery"@en .
med:Therapy a owl:Class ; rdfs:subClassOf med:Treatment ; rdfs:label "Therapy"@en .
med:Chemotherapy a owl:Class ; rdfs:subClassOf med:Therapy ; rdfs:label "Chemotherapy"@en .
med:Physiotherapy a owl:Class ; rdfs:subClassOf med:Therapy ; rdfs:label "Physiotherapy"@en .
med:Dialysis a owl:Class ; rdfs:subClassOf med:Therapy ; rdfs:label "Dialysis"@en .

med:Substance a owl:Class ; rdfs:label "Substance"@en .
med:Medication a owl:Class ; rdfs:subClassOf med:Substance , schema:Drug ; rdfs:label "Medication"@en .
med:Antibiotic a owl:Class ; rdfs:subClassOf med:Medication ; rdfs:label "Antibiotic"@en .
med:Analgesic a owl:Class ; rdfs:subClassOf med:Medication ; rdfs:label "Analgesic"@en .
med:NSAID a owl:Class ; rdfs:subClassOf med:Analgesic ; rdfs:label "Non-steroidal anti-inflammatory"@en .
med:Antihypertensive a owl:Class ; rdfs:subClassOf med:Medication ; rdfs:label "Antihypertensive"@en .
med:Anticoagulant a owl:Class ; rdfs:subClassOf med:Medication ; rdfs:label "Anticoagulant"@en .
med:Antidiabetic a owl:Class ; rdfs:subClassOf med:Medication ; rdfs:label "Antidiabetic"@en .
med:Statin a owl:Class ; rdfs:subClassOf med:Medication ; rdfs:label "Statin"@en .
med:Bronchodilator a owl:Class ; rdfs:subClassOf med:Medication ; rdfs:label "Bronchodilator"@en .
med:Antidepressant a owl:Class ; rdfs:subClassOf med:Medication ; rdfs:label "Antidepressant"@en .
med:Anticonvulsant a owl:Class ; rdfs:subClassOf med:Medication ; rdfs:label "Anticonvulsant"@en .
med:Allergen a owl:Class ; rdfs:subClassOf med:Substance ; rdfs:label "Allergen"@en .

med:Prescription a owl:Class ; rdfs:label "Prescription"@en .

#################################################################
#  Laboratory
#################################################################

med:LabOrder a owl:Class ; rdfs:label "Laboratory order"@en .
med:LabResult a owl:Class ; rdfs:label "Laboratory result"@en .
med:AbnormalResult a owl:Class ;
    rdfs:subClassOf med:LabResult ;
    rdfs:label "Abnormal result"@en ;
    rdfs:comment "Never asserted directly. A result becomes abnormal by carrying med:outOfRange true, so membership is computed by the reasoner rather than flagged by a person."@en ;
    owl:equivalentClass [ a owl:Restriction ;
                          owl:onProperty med:outOfRange ;
                          owl:hasValue true ] .
med:PanicResult a owl:Class ; rdfs:subClassOf med:AbnormalResult ; rdfs:label "Critical value"@en .

#################################################################
#  Places, equipment, money
#################################################################

med:Place a owl:Class ; rdfs:label "Place"@en .
med:Hospital a owl:Class ; rdfs:subClassOf med:Place , schema:Hospital ; rdfs:label "Hospital"@en .
med:Department a owl:Class ; rdfs:subClassOf med:Place ; rdfs:label "Department"@en .
med:Ward a owl:Class ; rdfs:subClassOf med:Place ; rdfs:label "Ward"@en .
med:IntensiveCareUnit a owl:Class ; rdfs:subClassOf med:Ward ; rdfs:label "Intensive care unit"@en .
med:Room a owl:Class ; rdfs:subClassOf med:Place ; rdfs:label "Room"@en .
med:Bed a owl:Class ; rdfs:subClassOf med:Place ; rdfs:label "Bed"@en .
med:Appointment a owl:Class ; rdfs:label "Appointment"@en .
med:Invoice a owl:Class ; rdfs:label "Invoice"@en .
med:InsurancePolicy a owl:Class ; rdfs:label "Insurance policy"@en .
med:InsuranceProvider a owl:Class ; rdfs:label "Insurance provider"@en .

#################################################################
#  Accounts. Authentication is modelled in the graph too.
#################################################################

med:Account a owl:Class ; rdfs:label "User account"@en .
med:Role a owl:Class ; rdfs:label "Role"@en .

#################################################################
#  Object properties
#################################################################

med:treatedBy a owl:ObjectProperty ;
    rdfs:domain med:Patient ; rdfs:range med:Doctor ;
    owl:inverseOf med:treats ; rdfs:label "treated by"@en .
med:treats a owl:ObjectProperty ; rdfs:domain med:Doctor ; rdfs:range med:Patient ; rdfs:label "treats"@en .

med:primaryPhysician a owl:ObjectProperty , owl:FunctionalProperty ;
    rdfs:subPropertyOf med:treatedBy ;
    rdfs:domain med:Patient ; rdfs:range med:Doctor ;
    rdfs:label "primary physician"@en ;
    rdfs:comment "Functional and a sub-property of treatedBy, so naming a primary physician also asserts treatment."@en .

med:worksIn a owl:ObjectProperty ;
    rdfs:domain med:Staff ; rdfs:range med:Department ;
    owl:inverseOf med:employs ; rdfs:label "works in"@en .
med:employs a owl:ObjectProperty ; rdfs:domain med:Department ; rdfs:range med:Staff ; rdfs:label "employs"@en .
med:headedBy a owl:ObjectProperty , owl:FunctionalProperty ;
    rdfs:subPropertyOf med:employs ; rdfs:domain med:Department ; rdfs:range med:Doctor ;
    rdfs:label "headed by"@en .

med:partOf a owl:ObjectProperty , owl:TransitiveProperty ; rdfs:label "part of"@en .
med:locatedIn a owl:ObjectProperty , owl:TransitiveProperty ;
    rdfs:subPropertyOf med:partOf ; rdfs:label "located in"@en .

med:assignedBed a owl:ObjectProperty , owl:FunctionalProperty ;
    rdfs:domain med:Patient ; rdfs:range med:Bed ;
    owl:inverseOf med:occupiedBy ; rdfs:label "assigned bed"@en .
med:occupiedBy a owl:ObjectProperty ; rdfs:domain med:Bed ; rdfs:range med:Patient ; rdfs:label "occupied by"@en .

# --- the encounter chain -----------------------------------------------------
med:hasEncounter a owl:ObjectProperty ;
    rdfs:domain med:Patient ; rdfs:range med:Encounter ;
    owl:inverseOf med:encounterOf ; rdfs:label "has encounter"@en .
med:encounterOf a owl:ObjectProperty ; rdfs:label "encounter of"@en .
med:attendedBy a owl:ObjectProperty ; rdfs:domain med:Encounter ; rdfs:range med:Doctor ; rdfs:label "attended by"@en .
med:inDepartment a owl:ObjectProperty ; rdfs:domain med:Encounter ; rdfs:range med:Department ; rdfs:label "in department"@en .
med:recordedCondition a owl:ObjectProperty ; rdfs:domain med:Encounter ; rdfs:range med:Condition ; rdfs:label "condition recorded"@en .
med:issuedPrescription a owl:ObjectProperty ; rdfs:domain med:Encounter ; rdfs:range med:Prescription ; rdfs:label "prescription issued"@en .
med:orderedTest a owl:ObjectProperty ; rdfs:domain med:Encounter ; rdfs:range med:LabOrder ; rdfs:label "test ordered"@en .
med:hasVitals a owl:ObjectProperty ; rdfs:domain med:Encounter ; rdfs:range med:VitalSigns ; rdfs:label "vital signs"@en .
med:hasNote a owl:ObjectProperty ; rdfs:range med:ClinicalNote ; rdfs:label "clinical note"@en .

# The doctor a patient has seen, composed from the encounter chain.
med:seenBy a owl:ObjectProperty ;
    rdfs:domain med:Patient ; rdfs:range med:Doctor ;
    rdfs:label "seen by"@en ;
    rdfs:comment "Never asserted. Composed from hasEncounter then attendedBy."@en ;
    owl:propertyChainAxiom ( med:hasEncounter med:attendedBy ) .

med:visitedDepartment a owl:ObjectProperty ;
    rdfs:domain med:Patient ; rdfs:range med:Department ;
    rdfs:label "visited department"@en ;
    owl:propertyChainAxiom ( med:hasEncounter med:inDepartment ) .

# --- conditions --------------------------------------------------------------
med:hasCondition a owl:ObjectProperty ;
    rdfs:domain med:Patient ; rdfs:range med:Condition ;
    owl:inverseOf med:conditionOf ; rdfs:label "has condition"@en .
med:conditionOf a owl:ObjectProperty ; rdfs:label "condition of"@en .
med:ofDisease a owl:ObjectProperty ; rdfs:domain med:Condition ; rdfs:range med:Disease ; rdfs:label "of disease"@en .
med:diagnosedBy a owl:ObjectProperty ; rdfs:domain med:Condition ; rdfs:range med:Doctor ; rdfs:label "diagnosed by"@en .

med:suffersFrom a owl:ObjectProperty ;
    rdfs:domain med:Patient ; rdfs:range med:Disease ;
    rdfs:label "suffers from"@en ;
    rdfs:comment "Never asserted. Composed from hasCondition then ofDisease. This one property is what makes the comorbidity analysis possible."@en ;
    owl:propertyChainAxiom ( med:hasCondition med:ofDisease ) .

med:comorbidWith a owl:ObjectProperty , owl:SymmetricProperty ;
    rdfs:domain med:Disease ; rdfs:range med:Disease ;
    rdfs:label "comorbid with"@en ;
    rdfs:comment "Two diseases that co-occur in the patient population above the configured threshold. Mined from the graph, then written back into it as triples."@en .

med:riskFactorFor a owl:ObjectProperty ; rdfs:range med:Disease ; rdfs:label "risk factor for"@en .
med:complicationOf a owl:ObjectProperty ; rdfs:domain med:Disease ; rdfs:range med:Disease ; rdfs:label "complication of"@en .
med:hasSymptom a owl:ObjectProperty ; rdfs:range med:Symptom ; rdfs:label "has symptom"@en .
med:indicates a owl:ObjectProperty ; rdfs:domain med:Symptom ; rdfs:range med:Disease ; rdfs:label "indicates"@en .

# --- medication --------------------------------------------------------------
med:hasPrescription a owl:ObjectProperty ; rdfs:domain med:Patient ; rdfs:range med:Prescription ; rdfs:label "has prescription"@en .
med:prescribedBy a owl:ObjectProperty ; rdfs:domain med:Prescription ; rdfs:range med:Doctor ; rdfs:label "prescribed by"@en .
med:prescribes a owl:ObjectProperty ; rdfs:domain med:Prescription ; rdfs:range med:Medication ; rdfs:label "prescribes"@en .

med:takesMedication a owl:ObjectProperty ;
    rdfs:domain med:Patient ; rdfs:range med:Medication ;
    rdfs:label "takes medication"@en ;
    owl:propertyChainAxiom ( med:hasPrescription med:prescribes ) .

med:interactsWith a owl:ObjectProperty , owl:SymmetricProperty ;
    rdfs:domain med:Medication ; rdfs:range med:Medication ;
    rdfs:label "interacts with"@en ;
    rdfs:comment "Symmetric, so a single assertion protects both directions."@en .
med:contraindicatedFor a owl:ObjectProperty ; rdfs:domain med:Medication ; rdfs:range med:Disease ; rdfs:label "contraindicated for"@en .
med:indicatedFor a owl:ObjectProperty ; rdfs:domain med:Medication ; rdfs:range med:Disease ; rdfs:label "indicated for"@en .
med:allergicTo a owl:ObjectProperty ; rdfs:domain med:Patient ; rdfs:range med:Substance ; rdfs:label "allergic to"@en .
med:containsSubstance a owl:ObjectProperty ; rdfs:domain med:Medication ; rdfs:range med:Substance ; rdfs:label "contains"@en .

# --- lab, treatment, money ---------------------------------------------------
med:forPatient a owl:ObjectProperty ; rdfs:range med:Patient ; rdfs:label "for patient"@en .
med:hasResult a owl:ObjectProperty ; rdfs:domain med:LabOrder ; rdfs:range med:LabResult ; rdfs:label "has result"@en .
med:testsFor a owl:ObjectProperty ; rdfs:domain med:LabOrder ; rdfs:range med:Disease ; rdfs:label "tests for"@en .
med:performedBy a owl:ObjectProperty ; rdfs:range med:Staff ; rdfs:label "performed by"@en .
med:undergoes a owl:ObjectProperty ; rdfs:domain med:Patient ; rdfs:range med:Treatment ; rdfs:label "undergoes"@en .
med:treatsDisease a owl:ObjectProperty ; rdfs:range med:Disease ; rdfs:label "treats disease"@en .
med:hasAppointment a owl:ObjectProperty ; rdfs:domain med:Patient ; rdfs:range med:Appointment ; rdfs:label "has appointment"@en .
med:appointmentWith a owl:ObjectProperty ; rdfs:domain med:Appointment ; rdfs:range med:Doctor ; rdfs:label "appointment with"@en .
med:hasInvoice a owl:ObjectProperty ; rdfs:domain med:Patient ; rdfs:range med:Invoice ; rdfs:label "has invoice"@en .
med:coveredBy a owl:ObjectProperty ; rdfs:domain med:Invoice ; rdfs:range med:InsurancePolicy ; rdfs:label "covered by"@en .
med:hasPolicy a owl:ObjectProperty ; rdfs:domain med:Patient ; rdfs:range med:InsurancePolicy ; rdfs:label "has policy"@en .
med:issuedBy a owl:ObjectProperty ; rdfs:domain med:InsurancePolicy ; rdfs:range med:InsuranceProvider ; rdfs:label "issued by"@en .

# --- accounts ----------------------------------------------------------------
med:accountFor a owl:ObjectProperty , owl:InverseFunctionalProperty ;
    rdfs:domain med:Account ; rdfs:range med:Person ; rdfs:label "account for"@en .
med:hasRole a owl:ObjectProperty ; rdfs:domain med:Account ; rdfs:range med:Role ; rdfs:label "has role"@en .

#################################################################
#  Datatype properties
#################################################################

med:name a owl:DatatypeProperty ; owl:equivalentProperty foaf:name , schema:name ; rdfs:range xsd:string ; rdfs:label "name"@en .
med:mrn a owl:DatatypeProperty , owl:FunctionalProperty , owl:InverseFunctionalProperty ;
    rdfs:domain med:Patient ; rdfs:range xsd:string ;
    rdfs:label "medical record number"@en ;
    rdfs:comment "Inverse functional: two records sharing an MRN denote the same patient."@en .
med:staffId a owl:DatatypeProperty , owl:InverseFunctionalProperty ; rdfs:domain med:Staff ; rdfs:range xsd:string ; rdfs:label "staff id"@en .
med:licenseNumber a owl:DatatypeProperty , owl:InverseFunctionalProperty ; rdfs:domain med:Doctor ; rdfs:range xsd:string ; rdfs:label "licence number"@en .
med:age a owl:DatatypeProperty ; rdfs:domain med:Person ; rdfs:range xsd:integer ; rdfs:label "age"@en .
med:sex a owl:DatatypeProperty ; rdfs:domain med:Person ; rdfs:range xsd:string ; rdfs:label "sex"@en .
med:dateOfBirth a owl:DatatypeProperty , owl:FunctionalProperty ; rdfs:domain med:Person ; rdfs:range xsd:date ; rdfs:label "date of birth"@en .
med:bloodGroup a owl:DatatypeProperty ; rdfs:domain med:Person ; rdfs:range xsd:string ; rdfs:label "blood group"@en .
med:phone a owl:DatatypeProperty ; rdfs:range xsd:string ; rdfs:label "phone"@en .
med:email a owl:DatatypeProperty ; rdfs:range xsd:string ; rdfs:label "email"@en .
med:address a owl:DatatypeProperty ; rdfs:range xsd:string ; rdfs:label "address"@en .
med:photoInitials a owl:DatatypeProperty ; rdfs:range xsd:string ; rdfs:label "initials"@en .

med:date a owl:DatatypeProperty ; rdfs:range xsd:date ; rdfs:label "date"@en .
med:time a owl:DatatypeProperty ; rdfs:range xsd:string ; rdfs:label "time"@en .
med:onsetDate a owl:DatatypeProperty ; rdfs:domain med:Condition ; rdfs:range xsd:date ; rdfs:label "onset date"@en .
med:resolvedDate a owl:DatatypeProperty ; rdfs:domain med:Condition ; rdfs:range xsd:date ; rdfs:label "resolved date"@en .
med:severity a owl:DatatypeProperty ; rdfs:range xsd:string ; rdfs:label "severity"@en .
med:clinicalStatus a owl:DatatypeProperty ; rdfs:domain med:Condition ; rdfs:range xsd:string ; rdfs:label "clinical status"@en .
med:icd10 a owl:DatatypeProperty ; rdfs:domain med:Disease ; rdfs:range xsd:string ; rdfs:label "ICD-10 code"@en .
med:prevalenceNote a owl:DatatypeProperty ; rdfs:range xsd:string ; rdfs:label "note"@en .
med:reason a owl:DatatypeProperty ; rdfs:domain med:Encounter ; rdfs:range xsd:string ; rdfs:label "reason for visit"@en .
med:outcome a owl:DatatypeProperty ; rdfs:domain med:Encounter ; rdfs:range xsd:string ; rdfs:label "outcome"@en .
med:lengthOfStay a owl:DatatypeProperty ; rdfs:domain med:Admission ; rdfs:range xsd:integer ; rdfs:label "length of stay in days"@en .
med:noteText a owl:DatatypeProperty ; rdfs:range xsd:string ; rdfs:label "note text"@en .
med:authorName a owl:DatatypeProperty ; rdfs:range xsd:string ; rdfs:label "author"@en .

med:systolic a owl:DatatypeProperty ; rdfs:domain med:VitalSigns ; rdfs:range xsd:integer ; rdfs:label "systolic blood pressure"@en .
med:diastolic a owl:DatatypeProperty ; rdfs:domain med:VitalSigns ; rdfs:range xsd:integer ; rdfs:label "diastolic blood pressure"@en .
med:heartRate a owl:DatatypeProperty ; rdfs:domain med:VitalSigns ; rdfs:range xsd:integer ; rdfs:label "heart rate"@en .
med:temperature a owl:DatatypeProperty ; rdfs:domain med:VitalSigns ; rdfs:range xsd:decimal ; rdfs:label "temperature"@en .
med:spo2 a owl:DatatypeProperty ; rdfs:domain med:VitalSigns ; rdfs:range xsd:integer ; rdfs:label "oxygen saturation"@en .
med:weightKg a owl:DatatypeProperty ; rdfs:domain med:VitalSigns ; rdfs:range xsd:decimal ; rdfs:label "weight in kg"@en .
med:bmi a owl:DatatypeProperty ; rdfs:domain med:VitalSigns ; rdfs:range xsd:decimal ; rdfs:label "body mass index"@en .

med:dosage a owl:DatatypeProperty ; rdfs:domain med:Prescription ; rdfs:range xsd:string ; rdfs:label "dosage"@en .
med:frequency a owl:DatatypeProperty ; rdfs:domain med:Prescription ; rdfs:range xsd:string ; rdfs:label "frequency"@en .
med:durationDays a owl:DatatypeProperty ; rdfs:domain med:Prescription ; rdfs:range xsd:integer ; rdfs:label "duration in days"@en .
med:dispensed a owl:DatatypeProperty ; rdfs:domain med:Prescription ; rdfs:range xsd:boolean ; rdfs:label "dispensed"@en .
med:strength a owl:DatatypeProperty ; rdfs:domain med:Medication ; rdfs:range xsd:string ; rdfs:label "strength"@en .

med:analyte a owl:DatatypeProperty ; rdfs:range xsd:string ; rdfs:label "analyte"@en .
med:value a owl:DatatypeProperty ; rdfs:domain med:LabResult ; rdfs:range xsd:decimal ; rdfs:label "value"@en .
med:unit a owl:DatatypeProperty ; rdfs:range xsd:string ; rdfs:label "unit"@en .
med:refLow a owl:DatatypeProperty ; rdfs:domain med:LabResult ; rdfs:range xsd:decimal ; rdfs:label "reference low"@en .
med:refHigh a owl:DatatypeProperty ; rdfs:domain med:LabResult ; rdfs:range xsd:decimal ; rdfs:label "reference high"@en .
med:outOfRange a owl:DatatypeProperty ; rdfs:domain med:LabResult ; rdfs:range xsd:boolean ; rdfs:label "out of range"@en .
med:orderStatus a owl:DatatypeProperty ; rdfs:domain med:LabOrder ; rdfs:range xsd:string ; rdfs:label "order status"@en .

med:bedNumber a owl:DatatypeProperty ; rdfs:domain med:Bed ; rdfs:range xsd:string ; rdfs:label "bed number"@en .
med:occupied a owl:DatatypeProperty ; rdfs:domain med:Bed ; rdfs:range xsd:boolean ; rdfs:label "occupied"@en .
med:capacity a owl:DatatypeProperty ; rdfs:range xsd:integer ; rdfs:label "capacity"@en .
med:qualification a owl:DatatypeProperty ; rdfs:domain med:Staff ; rdfs:range xsd:string ; rdfs:label "qualification"@en .
med:yearsOfExperience a owl:DatatypeProperty ; rdfs:domain med:Staff ; rdfs:range xsd:integer ; rdfs:label "years of experience"@en .
med:consultationFee a owl:DatatypeProperty ; rdfs:domain med:Doctor ; rdfs:range xsd:decimal ; rdfs:label "consultation fee"@en .
med:amount a owl:DatatypeProperty ; rdfs:range xsd:decimal ; rdfs:label "amount"@en .
med:paid a owl:DatatypeProperty ; rdfs:domain med:Invoice ; rdfs:range xsd:boolean ; rdfs:label "paid"@en .
med:status a owl:DatatypeProperty ; rdfs:range xsd:string ; rdfs:label "status"@en .
med:policyNumber a owl:DatatypeProperty , owl:InverseFunctionalProperty ; rdfs:range xsd:string ; rdfs:label "policy number"@en .
med:coveragePercent a owl:DatatypeProperty ; rdfs:domain med:InsurancePolicy ; rdfs:range xsd:integer ; rdfs:label "coverage percent"@en .

med:login a owl:DatatypeProperty , owl:InverseFunctionalProperty ; rdfs:domain med:Account ; rdfs:range xsd:string ; rdfs:label "login"@en .
med:passcode a owl:DatatypeProperty ; rdfs:domain med:Account ; rdfs:range xsd:string ; rdfs:label "passcode"@en .

#################################################################
#  Roles
#################################################################

med:PatientRole a med:Role ; med:name "Patient" .
med:DoctorRole a med:Role ; med:name "Doctor" .
med:AdminRole a med:Role ; med:name "Administration" .
med:LabRole a med:Role ; med:name "Laboratory" .
med:PharmacyRole a med:Role ; med:name "Pharmacy" .
`;

if (typeof module !== 'undefined') module.exports = { ONTOLOGY_TTL: ONTOLOGY_TTL };
