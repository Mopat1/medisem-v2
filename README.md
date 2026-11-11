# MediSem — Hospital Management Knowledge Graph
https://medisem-v2.onrender.com/
A hospital management system where the clinical record is an RDF knowledge
graph, described by an OWL 2 ontology, with a reasoner running in the browser
and real accounts backed by Postgres.

Care teams see an ordinary clinical interface. Underneath, disease categories,
safety alerts, caseloads, bed occupancy and patient classification are all
**derived** rather than stored. A toggle in the sidebar reveals the machinery:
every panel carries a ◈ chip that opens the exact SPARQL query behind it.

Beyond a normal portal:

- **Accounts and shared records.** Sign up, sign in, and everything you record
  is visible to everybody else. A patient a doctor registers appears in the
  laboratory worklist and the pharmacy queue immediately.
- **Longitudinal visit history.** Each timeline entry is assembled by joining
  encounter, condition, prescription and lab triples on the visit.
- **Comorbidity network.** Which conditions travel together is *measured* from
  the patient population, then asserted back into the graph as
  `med:comorbidWith` triples.
- **Appointment booking.** Availability is computed by querying the graph, so
  two patients cannot take the same slot.

---

## Deploying to Render

This is a Node web service with a Postgres database. It is no longer a static
site, because a static site cannot hold accounts or share data between users.

### The quick way: Blueprint

1. Push this folder to a GitHub repository.
2. In Render, choose **New → Blueprint** and select the repository.
3. Render reads `render.yaml`, creates the web service *and* the database, wires
   `DATABASE_URL` between them and generates a `SESSION_SECRET`.
4. Click **Apply**.

### The manual way

Create the database first, because the web service needs its URL.

1. **New → PostgreSQL.** Name it `medisem-db`, free plan, **Create**. When it is
   ready, copy the **Internal Database URL**.
2. **New → Web Service**, connect the repository, then:

   | Field | Value |
   |---|---|
   | **Runtime** | Node |
   | **Build Command** | `npm install` |
   | **Start Command** | `npm start` |
   | **Health Check Path** | `/api/health` |

3. Under **Environment**, add:

   | Key | Value |
   |---|---|
   | `DATABASE_URL` | the Internal Database URL you copied |
   | `SESSION_SECRET` | any long random string |
   | `NODE_ENV` | `production` |

4. **Create Web Service.**

Tables are created automatically on first boot. There is no migration step.

### Two things to know about the free tier

**Free Postgres on Render expires after 30 days.** If your demo is further away
than that, the database will be gone. The app reads a standard `DATABASE_URL`,
so any Postgres works — [Neon](https://neon.tech) and
[Supabase](https://supabase.com) both have free tiers that do not expire. Create
a database there, paste its connection string as `DATABASE_URL`, and nothing
else changes.

**Free web services sleep after 15 minutes of inactivity.** The first request
after that takes around 50 seconds while the service wakes. Open the URL a
minute before you present.

### Running it locally

```bash
npm install
npm start          # http://localhost:3000
```

With no `DATABASE_URL` set, it stores everything in `.data/medisem.json`
instead of Postgres, so you can develop without a database. The console says
which backend is in use on startup.

---

## Using it

**There are no pre-made passwords any more.** Create an account on the signup
screen, choosing whichever role you want to be. Then, from **Explore the
system** in the sidebar, step into any of the thirteen demonstration people —
consultants, patients, the laboratory, the pharmacy, records — and look around
with their view. Your own account stays signed in underneath, and anything you
save is still recorded against you.

### A five-minute demo

1. **Sign up as a doctor.** You get an empty clinic, because you have not seen
   anyone yet.
2. **Register a patient** from the sidebar. Give them a presenting condition.
3. On their chart, **order a test** using the control on the Results panel.
4. Sign out, **sign up as Laboratory** (or open a second browser). The patient
   and their test are already on your worklist — different account, different
   session, same graph.
5. Enter a wildly out-of-range value. It is immediately classified
   `med:AbnormalResult`, because that class is defined by an `owl:hasValue`
   restriction on `med:outOfRange`, not by a flag anyone sets.
6. Back as the doctor, **record a consultation** and prescribe **Ibuprofen** to
   a patient with asthma. Two contraindication alerts appear on save. Nothing in
   the code checks for Ibuprofen; the formulary states the contraindication once
   and the reasoner does the rest.
7. **Explore → a demo patient → Book appointment.** Slots already taken show
   greyed out, because availability is a query, not a stored field.
8. **Knowledge graph → Ontology.** Compare *Stated* against *Reasoned*.
   `med:CriticalPatient` and `med:AbnormalResult` have zero stated instances.

---

## How it is built

```
server.js                 Express: auth, the changeset API, static hosting
server/store.js           Postgres, with a JSON-file fallback
server/auth.js            bcrypt passwords, signed HttpOnly session cookies

public/index.html         loads everything in dependency order
public/styles.css
public/assets/
  rdf.js                  RDF terms, indexed triple store, Turtle parser,
                          RDFS + OWL 2 RL reasoner, SPARQL engine, serialisers
  ontology.js             the TBox: ~90 classes, ~55 object properties
  data-reference.js       departments, wards, beds, staff, diseases, formulary
  data-cohort.js          GENERATED. 120 patients, 468 encounters, 323 conditions
  api.js                  the client half of the server conversation
  db.js                   local interface preferences only
  queries.js              every panel's SPARQL, one function per panel
  comorbidity.js          measures the network, lays it out, renders it
  app.js                  shell, sessions, routing, provenance drawer
  view-auth.js            sign in and sign up
  view-explore.js         the demo persona explorer
  view-booking.js         appointments, patient registration, lab ordering
  view-*.js               one file per role interface

scripts/generate-cohort.mjs   regenerates data-cohort.js
```

### Where the data lives

The base graph — ontology, reference data and the generated cohort — is compiled
into the client bundle and never changes. Everything anyone records is appended
to a **changeset** of RDF additions and retractions in the `triples` table,
replayed over the base graph on load, then reasoned over. The edit history is
itself RDF and exports as Turtle.

Accounts are the one thing kept relationally, in a `users` table, because
password hashes have no business being in a queryable graph.

The browser does the parsing, reasoning and SPARQL. The server only stores and
returns triples. That keeps 30,000 triples of reasoning off a free-tier CPU.

### The reasoner

Forward chaining to a fixpoint, 19 entailment rules, roughly 400 ms over 30,000
triples. Every derived triple records the rule that produced it and its
premises, which is what the **Inference explorer** shows.

`rdfs2`, `rdfs3`, `rdfs5`, `rdfs7`, `rdfs9`, `rdfs11`, `owl:inverseOf`,
`owl:SymmetricProperty`, `owl:TransitiveProperty`, `owl:equivalentClass`,
`owl:equivalentProperty`, `owl:sameAs`, `owl:propertyChainAxiom`,
`owl:someValuesFrom`, `owl:allValuesFrom`, `owl:hasValue`,
`owl:intersectionOf`, `owl:unionOf`.

### The comorbidity measure

For each pair of diseases A and B across the cohort:

- **support** — patients carrying both
- **lift** — `P(A∩B) / (P(A)·P(B))`; above 1 means more often together than chance
- **phi** — the correlation coefficient for two binary variables

Pairs clearing the support floor with lift above 1 become edges. This runs over
`med:suffersFrom`, which is itself derived by a property chain, so the network is
computed over inferred facts.

---

## Limitations, stated plainly

- The SPARQL engine covers a large subset of SPARQL 1.1 — SELECT, ASK,
  CONSTRUCT, DESCRIBE, OPTIONAL, UNION, FILTER, BIND, GROUP BY, aggregates,
  ORDER BY, LIMIT — but not property paths, subqueries or MINUS.
- The reasoner is OWL 2 RL forward chaining. It does no consistency checking, so
  `owl:disjointWith` is declared but not enforced.
- Comorbidity links are population associations. Not causal, not predictive for
  an individual, and the interface says so wherever they appear.
- Anyone can sign up as any role, including Administration. That is deliberate
  so you can explore, but it is not how a real hospital would provision staff.
- The whole graph is sent to every browser, so every signed-in user can see all
  the clinical data. Real access control would filter server-side.
- **This is a demonstration. Do not put real patient data in it.**

All pre-existing patients, staff and records are fictional.
