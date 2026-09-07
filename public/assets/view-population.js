/* =============================================================================
   view-population.js — population health.

   The comorbidity network at full size, with the evidence table underneath.
   Shared by the clinician and administrative interfaces.
   ========================================================================== */
var Population = (function () {
  'use strict';
  var el = App.el;

  function render(host, opts) {
    opts = opts || {};
    var model = Comorbidity.get();
    var prevalence = Q.diseasePrevalence();

    host.appendChild(App.pageHead(opts.title || 'Population health', opts.subtitle ||
      'Measured across ' + App.num(model.totalPatients) + ' patients.'));

    host.appendChild(el('div', { class: 'grid-4' }, [
      App.statTile({ label: 'Patients with a condition', value: App.num(model.totalPatients),
        detail: 'Everyone the reasoner can attribute a disease to', derived: true }),
      App.statTile({ label: 'Distinct conditions', value: String(model.nodes.length),
        detail: 'Present in the cohort' }),
      App.statTile({ label: 'Comorbidity links', value: String(model.edges.length),
        detail: 'Pairs clearing ' + model.minSupport + ' shared patients and lift above 1' }),
      App.statTile({ label: 'Strongest hub', value: hubName(model),
        detail: 'Highest weighted degree in the network' })
    ]));

    host.appendChild(el('div', { class: 'notice notice-quiet' }, [
      el('strong', { text: 'How the links are measured.' }),
      el('p', { html:
        '<em>Support</em> is the number of patients carrying both conditions. ' +
        '<em>Lift</em> is how many times more often the pair appears together than it would if the ' +
        'two were independent; a lift of 1 is no association at all. ' +
        '<em>Phi</em> is the correlation coefficient for the two as binary variables, which corrects ' +
        'for one condition simply being very common. Only pairs above the support floor with a lift ' +
        'over 1 are drawn.' })
    ]));

    host.appendChild(App.panel({
      title: 'Comorbidity network',
      subtitle: 'Circles are sized by prevalence and coloured by disease family. Thicker links mean more shared patients. Click any condition.',
      provenance: {
        title: 'Comorbidity network', sparql: model.sparql, note: model.note,
        intro: 'Everything on this map is computed in the browser from the result of this single ' +
               'query. No co-occurrence is written into the data by hand.'
      },
      flush: true,
      children: [GraphView.render({ showDetail: true, height: 620 })]
    }));

    var edges = model.edges.slice().sort(function (a, b) { return b.lift - a.lift; });

    host.appendChild(App.panel({
      title: 'The evidence',
      subtitle: 'Every link on the map, with its statistics',
      flush: true,
      tools: [el('button', { class: 'link-btn', text: 'Download CSV', onclick: function () {
        var lines = ['condition_a,condition_b,shared_patients,lift,phi,jaccard'];
        edges.forEach(function (e) {
          lines.push([csv(e.aName), csv(e.bName), e.support, e.lift.toFixed(3),
            e.phi.toFixed(3), e.jaccard.toFixed(3)].join(','));
        });
        App.saveFile(lines.join('\n'), 'medisem-comorbidity.csv', 'text/csv');
      } })],
      children: [App.table([
        { key: 'pair', label: 'Condition pair', render: function (e) {
          var A = model.byIri.get(e.a), B = model.byIri.get(e.b);
          return el('span', { class: 'pair' }, [
            el('span', { class: 'dot', style: 'background:' + (A ? A.color : '#5C6B6A') }),
            el('span', { text: e.aName }),
            el('span', { class: 'pair-plus', text: '+' }),
            el('span', { class: 'dot', style: 'background:' + (B ? B.color : '#5C6B6A') }),
            el('span', { text: e.bName })
          ]);
        } },
        { key: 'support', label: 'Shared patients', align: 'right' },
        { key: 'lift', label: 'Lift', align: 'right', mono: true, render: function (e) { return e.lift.toFixed(2); } },
        { key: 'phi', label: 'Phi', align: 'right', mono: true, render: function (e) { return e.phi.toFixed(2); } },
        { key: 'jaccard', label: 'Jaccard', align: 'right', mono: true, render: function (e) { return e.jaccard.toFixed(2); } }
      ], edges, { dense: true, emptyText: 'No pairs clear the threshold.' })]
    }));

    host.appendChild(App.panel({
      title: 'Prevalence',
      subtitle: 'How many patients carry each condition',
      flush: true,
      provenance: { title: 'Prevalence', sparql: prevalence.sparql, rows: prevalence.rows.length, note: prevalence.note },
      children: [App.table([
        { key: 'diseaseName', label: 'Condition', render: function (r) {
          var node = model.byIri.get(r.disease);
          return el('span', { class: 'dot-label' }, [
            el('span', { class: 'dot', style: 'background:' + (node ? node.color : '#5C6B6A') }),
            el('span', { text: r.diseaseName })
          ]);
        } },
        { key: 'icd', label: 'ICD-10', mono: true },
        { key: 'category', label: 'Family', render: function (r) {
          var node = model.byIri.get(r.disease);
          return node ? node.categoryLabel : '';
        } },
        { key: 'patients', label: 'Patients', align: 'right' },
        { key: 'bar', label: '', render: function (r) {
          var top = prevalence.rows[0] ? Number(prevalence.rows[0].patients) : 1;
          var node = model.byIri.get(r.disease);
          return el('span', { class: 'bar-track' }, [
            el('span', { class: 'bar-fill', style: 'width:' + (Number(r.patients) / top * 100) + '%;' +
              'background:' + (node ? node.color : '#5C6B6A') })
          ]);
        } }
      ], prevalence.rows, { dense: true })]
    }));
  }

  function hubName(model) {
    var top = model.nodes.slice().sort(function (a, b) { return b.hubScore - a.hubScore; })[0];
    return top ? Comorbidity.shortName(top.name) : '\u2014';
  }
  function csv(s) {
    return /[",\n]/.test(s) ? '"' + String(s).replace(/"/g, '""') + '"' : s;
  }

  return { render: render };
})();
