/* =============================================================================
   comorbidity.js — the disease network.

   Takes one SPARQL result set, every (patient, disease) pair the reasoner can
   derive, and measures which conditions genuinely travel together across the
   population. Nothing about the network is hand-written: the edges, their
   strengths and the hubs all fall out of the data.

   Three statistics are computed for each pair of diseases A and B:

     support   the number of patients carrying both. Raw evidence.
     lift      P(A and B) / (P(A) x P(B)). Above 1 means the two occur together
               more often than chance would predict. This is what makes an edge
               meaningful rather than merely common.
     phi       the correlation coefficient for two binary variables, which
               normalises for how common each disease is on its own.

   Pairs that clear a support floor and a lift above 1 are written back into the
   knowledge graph as med:comorbidWith triples, so the discovered structure
   becomes part of the graph and can be queried like anything else.
   ========================================================================== */
var Comorbidity = (function () {
  'use strict';

  /* Muted, distinguishable category colours. Deliberately not a rainbow: these
     sit on a paper background next to clinical data. */
  var CATEGORY = {
    CardiovascularDisease: { label: 'Cardiovascular', color: '#A6402B' },
    MetabolicDisease:      { label: 'Metabolic',      color: '#B07D2B' },
    RespiratoryDisease:    { label: 'Respiratory',    color: '#2B7A8C' },
    NeurologicalDisease:   { label: 'Neurological',   color: '#5B4B8A' },
    RenalDisease:          { label: 'Renal',          color: '#0B6E4F' },
    MentalHealthCondition: { label: 'Mental health',  color: '#8A5A7A' },
    MusculoskeletalDisease:{ label: 'Musculoskeletal',color: '#6B6355' },
    Neoplasm:              { label: 'Oncological',    color: '#3A3A5C' },
    InfectiousDisease:     { label: 'Infectious',     color: '#7A5C3E' },
    HaematologicalDisease: { label: 'Haematological', color: '#9B3E5C' }
  };
  var FALLBACK = { label: 'Other', color: '#5C6B6A' };

  var model = null;

  /* ------------------------------------------------------------- measuring */

  function build(options) {
    var opts = options || {};
    var minSupport = opts.minSupport === undefined ? 3 : opts.minSupport;
    var minLift = opts.minLift === undefined ? 1.0 : opts.minLift;

    var source = Q.patientDiseasePairs();

    // patient -> set of diseases, and disease -> metadata
    var byPatient = new Map();
    var disease = new Map();

    source.rows.forEach(function (r) {
      if (!r.disease) return;
      if (!byPatient.has(r.patient)) byPatient.set(r.patient, new Set());
      byPatient.get(r.patient).add(r.disease);

      if (!disease.has(r.disease)) {
        disease.set(r.disease, {
          iri: r.disease,
          name: r.diseaseName,
          icd: r.icd || null,
          category: null,
          patients: new Set()
        });
      }
      var d = disease.get(r.disease);
      d.patients.add(r.patient);
      if (r.category && !d.category) d.category = RDF.local(r.category);
    });

    var totalPatients = byPatient.size;

    // Pairwise co-occurrence
    var pairs = new Map();
    byPatient.forEach(function (set) {
      var list = Array.from(set).sort();
      for (var i = 0; i < list.length; i++) {
        for (var j = i + 1; j < list.length; j++) {
          var key = list[i] + '|' + list[j];
          pairs.set(key, (pairs.get(key) || 0) + 1);
        }
      }
    });

    var edges = [];
    pairs.forEach(function (support, key) {
      var parts = key.split('|');
      var A = disease.get(parts[0]), B = disease.get(parts[1]);
      if (!A || !B) return;

      var nA = A.patients.size, nB = B.patients.size, n = totalPatients;
      var pA = nA / n, pB = nB / n, pAB = support / n;
      var lift = pAB / (pA * pB);

      // phi coefficient over the 2x2 contingency table
      var both = support;
      var onlyA = nA - both, onlyB = nB - both;
      var neither = n - both - onlyA - onlyB;
      var denom = Math.sqrt(nA * nB * (n - nA) * (n - nB));
      var phi = denom > 0 ? ((both * neither) - (onlyA * onlyB)) / denom : 0;

      var jaccard = support / (nA + nB - support);

      edges.push({
        a: parts[0], b: parts[1],
        aName: A.name, bName: B.name,
        support: support, lift: lift, phi: phi, jaccard: jaccard
      });
    });

    // Keep pairs that are both frequent enough to trust and more common
    // together than chance would give you.
    var kept = edges.filter(function (e) {
      return e.support >= minSupport && e.lift >= minLift;
    }).sort(function (x, y) { return y.support - x.support; });

    // Weighted degree, which is what makes a disease a hub.
    var degree = new Map();
    kept.forEach(function (e) {
      degree.set(e.a, (degree.get(e.a) || 0) + e.support);
      degree.set(e.b, (degree.get(e.b) || 0) + e.support);
    });

    var nodes = Array.from(disease.values()).map(function (d) {
      return {
        iri: d.iri, name: d.name, icd: d.icd,
        category: d.category,
        categoryLabel: (CATEGORY[d.category] || FALLBACK).label,
        color: (CATEGORY[d.category] || FALLBACK).color,
        prevalence: d.patients.size,
        share: d.patients.size / totalPatients,
        hubScore: degree.get(d.iri) || 0,
        patients: d.patients
      };
    }).sort(function (a, b) { return b.prevalence - a.prevalence; });

    model = {
      nodes: nodes,
      edges: kept,
      allEdges: edges,
      totalPatients: totalPatients,
      minSupport: minSupport,
      minLift: minLift,
      sparql: source.sparql,
      note: source.note,
      byIri: new Map(nodes.map(function (n) { return [n.iri, n]; }))
    };
    layout(model);
    return model;
  }

  function get() { return model || build(); }

  /**
   * Write the discovered edges back into the knowledge graph. The property is
   * declared symmetric in the ontology, so asserting one direction is enough
   * for the reasoner to supply the other, but both are added here because this
   * runs after materialisation.
   */
  function materialise(store) {
    var m = get();
    var P = RDF.I(RDF.NS.med + 'comorbidWith');
    var added = 0;
    m.edges.forEach(function (e) {
      if (store.add(e.a, P, e.b)) added++;
      if (store.add(e.b, P, e.a)) added++;
    });
    return added;
  }

  /* --------------------------------------------------------------- layout  */

  /**
   * A spring-electrical layout. Nodes repel one another, edges pull their
   * endpoints together with a force proportional to how strongly the two
   * diseases co-occur, and a weak gravity keeps the whole thing on screen.
   * The starting positions come from a fixed seed so the map looks the same
   * every time the page loads.
   */
  function layout(m, iterations) {
    var W = 1000, H = 680, n = m.nodes.length;
    if (!n) return;
    var seed = 991;
    function rnd() { seed = (seed * 1103515245 + 12345) % 2147483648; return seed / 2147483648; }

    // Seed on a circle, largest first, so hubs start near the middle.
    m.nodes.forEach(function (node, i) {
      var angle = (i / n) * Math.PI * 2;
      var radius = 120 + (i / n) * 200 + rnd() * 40;
      node.x = W / 2 + Math.cos(angle) * radius;
      node.y = H / 2 + Math.sin(angle) * radius;
      node.r = 12 + Math.sqrt(node.prevalence) * 5.2;
    });

    var index = new Map(m.nodes.map(function (nd, i) { return [nd.iri, i]; }));
    var maxSupport = m.edges.reduce(function (a, e) { return Math.max(a, e.support); }, 1);

    var rounds = iterations || 500;
    var k = Math.sqrt((W * H) / n) * 0.85;

    for (var step = 0; step < rounds; step++) {
      var temp = (1 - step / rounds) * 22 + 0.6;
      var dx = new Float64Array(n), dy = new Float64Array(n);

      // repulsion
      for (var i = 0; i < n; i++) {
        for (var j = i + 1; j < n; j++) {
          var ax = m.nodes[i].x - m.nodes[j].x;
          var ay = m.nodes[i].y - m.nodes[j].y;
          var dist2 = ax * ax + ay * ay;
          if (dist2 < 1) { dist2 = 1; ax = rnd() - 0.5; ay = rnd() - 0.5; }
          var dist = Math.sqrt(dist2);
          // Bigger circles push harder so labels do not collide.
          var force = (k * k / dist) * (1 + (m.nodes[i].r + m.nodes[j].r) / 90);
          dx[i] += (ax / dist) * force; dy[i] += (ay / dist) * force;
          dx[j] -= (ax / dist) * force; dy[j] -= (ay / dist) * force;
        }
      }

      // attraction along edges
      m.edges.forEach(function (e) {
        var i = index.get(e.a), j = index.get(e.b);
        if (i === undefined || j === undefined) return;
        var ax = m.nodes[i].x - m.nodes[j].x;
        var ay = m.nodes[i].y - m.nodes[j].y;
        var dist = Math.sqrt(ax * ax + ay * ay) || 1;
        var weight = 0.35 + (e.support / maxSupport) * 1.25;
        var force = (dist * dist / k) * weight * 0.055;
        dx[i] -= (ax / dist) * force; dy[i] -= (ay / dist) * force;
        dx[j] += (ax / dist) * force; dy[j] += (ay / dist) * force;
      });

      // gravity and integration
      for (var q = 0; q < n; q++) {
        dx[q] += (W / 2 - m.nodes[q].x) * 0.014;
        dy[q] += (H / 2 - m.nodes[q].y) * 0.014;
        var len = Math.sqrt(dx[q] * dx[q] + dy[q] * dy[q]) || 1;
        var move = Math.min(len, temp);
        m.nodes[q].x += (dx[q] / len) * move;
        m.nodes[q].y += (dy[q] / len) * move;
        m.nodes[q].x = Math.max(node_pad(m.nodes[q]), Math.min(W - node_pad(m.nodes[q]), m.nodes[q].x));
        m.nodes[q].y = Math.max(node_pad(m.nodes[q]), Math.min(H - node_pad(m.nodes[q]), m.nodes[q].y));
      }
    }
    m.width = W; m.height = H;
  }
  function node_pad(node) { return node.r + 26; }

  /* --------------------------------------------------------------- queries */

  /** The strongest partners of one disease, ranked by lift then support. */
  function partnersOf(iri, limit) {
    var m = get();
    return m.edges
      .filter(function (e) { return e.a === iri || e.b === iri; })
      .map(function (e) {
        var otherIri = e.a === iri ? e.b : e.a;
        return {
          iri: otherIri,
          name: e.a === iri ? e.bName : e.aName,
          support: e.support, lift: e.lift, phi: e.phi, jaccard: e.jaccard,
          node: m.byIri.get(otherIri)
        };
      })
      .sort(function (x, y) { return (y.lift * y.support) - (x.lift * x.support); })
      .slice(0, limit || 99);
  }

  /**
   * Conditions frequently seen alongside the ones a patient already has, which
   * they do not yet have. This is the patient-facing use of the network: not a
   * prediction, a description of what the population looks like.
   */
  function projectionFor(patientDiseases) {
    var m = get();
    var have = new Set(patientDiseases);
    var scores = new Map();

    patientDiseases.forEach(function (iri) {
      partnersOf(iri).forEach(function (p) {
        if (have.has(p.iri)) return;
        var current = scores.get(p.iri) || {
          iri: p.iri, name: p.name, node: p.node,
          totalLift: 0, bestSupport: 0, from: []
        };
        current.totalLift += p.lift;
        current.bestSupport = Math.max(current.bestSupport, p.support);
        current.from.push({ iri: iri, name: (m.byIri.get(iri) || {}).name, lift: p.lift, support: p.support });
        scores.set(p.iri, current);
      });
    });

    return Array.from(scores.values())
      .sort(function (a, b) { return b.totalLift - a.totalLift; })
      .slice(0, 8);
  }

  /** Everything one disease connects to, for highlighting on the map. */
  function neighbourIris(iri) {
    var out = new Set([iri]);
    get().edges.forEach(function (e) {
      if (e.a === iri) out.add(e.b);
      if (e.b === iri) out.add(e.a);
    });
    return out;
  }

  function categories() {
    var m = get(), seen = new Map();
    m.nodes.forEach(function (n) {
      if (!seen.has(n.categoryLabel)) seen.set(n.categoryLabel, { label: n.categoryLabel, color: n.color, count: 0 });
      seen.get(n.categoryLabel).count++;
    });
    return Array.from(seen.values()).sort(function (a, b) { return b.count - a.count; });
  }

  /* --------------------------------------------------------------- drawing */

  /**
   * Render the network as SVG. `state` carries the current selection and the
   * support threshold so the caller can re-render on interaction.
   */
  function render(state) {
    var m = get();
    var selected = state && state.selected;
    var threshold = (state && state.threshold) || m.minSupport;
    var highlight = selected ? neighbourIris(selected) : null;

    var edges = m.edges.filter(function (e) { return e.support >= threshold; });
    var maxSupport = edges.reduce(function (a, e) { return Math.max(a, e.support); }, 1);

    var parts = [];
    parts.push('<svg viewBox="0 0 ' + m.width + ' ' + m.height + '" class="cograph" ' +
               'xmlns="http://www.w3.org/2000/svg" role="img" ' +
               'aria-label="Comorbidity network of ' + m.nodes.length + ' conditions">');

    // edges first so nodes sit on top
    edges.forEach(function (e) {
      var A = m.byIri.get(e.a), B = m.byIri.get(e.b);
      if (!A || !B) return;
      var dim = highlight && !(highlight.has(e.a) && highlight.has(e.b));
      var width = 0.8 + (e.support / maxSupport) * 5.5;
      var opacity = dim ? 0.07 : 0.16 + (e.support / maxSupport) * 0.5;
      parts.push('<line x1="' + A.x.toFixed(1) + '" y1="' + A.y.toFixed(1) +
                 '" x2="' + B.x.toFixed(1) + '" y2="' + B.y.toFixed(1) +
                 '" stroke="#12201E" stroke-width="' + width.toFixed(2) +
                 '" stroke-opacity="' + opacity.toFixed(3) + '" stroke-linecap="round"/>');
    });

    m.nodes.forEach(function (nd) {
      var dim = highlight && !highlight.has(nd.iri);
      var isSelected = selected === nd.iri;
      var op = dim ? 0.16 : 1;
      parts.push('<g class="conode' + (isSelected ? ' is-selected' : '') + '" ' +
                 'data-iri="' + nd.iri.replace(/"/g, '&quot;') + '" opacity="' + op + '">');
      if (isSelected) {
        parts.push('<circle cx="' + nd.x.toFixed(1) + '" cy="' + nd.y.toFixed(1) +
                   '" r="' + (nd.r + 7).toFixed(1) + '" fill="none" stroke="' + nd.color +
                   '" stroke-width="1.4" stroke-opacity="0.55"/>');
      }
      parts.push('<circle cx="' + nd.x.toFixed(1) + '" cy="' + nd.y.toFixed(1) +
                 '" r="' + nd.r.toFixed(1) + '" fill="' + nd.color + '" fill-opacity="0.86" ' +
                 'stroke="#FFFFFF" stroke-width="1.5"/>');
      parts.push('<text x="' + nd.x.toFixed(1) + '" y="' + (nd.y + 4).toFixed(1) +
                 '" text-anchor="middle" class="conode-count">' + nd.prevalence + '</text>');
      parts.push('<text x="' + nd.x.toFixed(1) + '" y="' + (nd.y + nd.r + 15).toFixed(1) +
                 '" text-anchor="middle" class="conode-label">' + escapeXml(shortName(nd.name)) + '</text>');
      parts.push('</g>');
    });

    parts.push('</svg>');
    return { svg: parts.join(''), visibleEdges: edges.length };
  }

  function shortName(name) {
    if (name.length <= 22) return name;
    var trimmed = name
      .replace('Chronic Obstructive Pulmonary Disease', 'COPD')
      .replace('Type 2 Diabetes Mellitus', 'Type 2 Diabetes')
      .replace('Major Depressive Disorder', 'Depression')
      .replace('Generalised Anxiety Disorder', 'Anxiety')
      .replace('Obstructive Sleep Apnoea', 'Sleep Apnoea')
      .replace('Chronic Kidney Disease', 'CKD')
      .replace('Coronary Artery Disease', 'CAD')
      .replace('Urinary Tract Infection', 'UTI')
      .replace('Pulmonary Tuberculosis', 'TB')
      .replace('Myocardial Infarction', 'MI');
    return trimmed.length <= 24 ? trimmed : trimmed.slice(0, 22) + '\u2026';
  }
  function escapeXml(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  return {
    build: build, get: get, materialise: materialise, render: render,
    partnersOf: partnersOf, projectionFor: projectionFor, neighbourIris: neighbourIris,
    categories: categories, CATEGORY: CATEGORY, shortName: shortName
  };
})();
