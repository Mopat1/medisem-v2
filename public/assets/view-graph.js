/* =============================================================================
   view-graph.js — the comorbidity network component.

   Renders the disease network as SVG and wires up selection, the co-occurrence
   threshold and the detail panel. Used by the patient portal, the clinician
   population view and the administrative overview, each with different chrome.
   ========================================================================== */
var GraphView = (function () {
  'use strict';
  var el = App.el;

  /**
   * opts:
   *   highlight   array of disease IRIs to pre-highlight (the patient's own)
   *   focusMode   dim everything not connected to the highlighted set
   *   showDetail  render the side panel with the selected node's partners
   *   height      css height for the canvas
   */
  function render(opts) {
    opts = opts || {};
    var model = Comorbidity.get();
    var local = {
      selected: null,
      threshold: model.minSupport,
      highlight: opts.highlight || []
    };

    var canvas = el('div', { class: 'graph-canvas', style: opts.height ? 'height:' + opts.height + 'px' : null });
    var detail = opts.showDetail ? el('aside', { class: 'graph-detail' }) : null;

    function paint() {
      var svg;
      if (local.selected) {
        svg = Comorbidity.render({ selected: local.selected, threshold: local.threshold }).svg;
      } else if (opts.focusMode && local.highlight.length) {
        svg = renderFocused(local.highlight, local.threshold);
      } else {
        svg = Comorbidity.render({ threshold: local.threshold }).svg;
      }
      canvas.innerHTML = svg;

      Array.prototype.forEach.call(canvas.querySelectorAll('.conode'), function (g) {
        g.addEventListener('click', function () {
          var iri = g.getAttribute('data-iri');
          local.selected = (local.selected === iri) ? null : iri;
          paint();
          if (detail) paintDetail();
          if (opts.onSelect) opts.onSelect(local.selected);
        });
      });
    }

    function paintDetail() {
      App.clear(detail);
      if (!local.selected) {
        detail.appendChild(el('div', { class: 'graph-detail-empty' }, [
          el('p', { text: 'Select a condition on the map to see what it travels with.' }),
          el('h4', { text: 'Strongest links in the hospital' }),
          el('ol', { class: 'top-links' }, model.edges.slice()
            .sort(function (a, b) { return (b.lift * b.support) - (a.lift * a.support); })
            .slice(0, 8).map(function (e) {
              return el('li', {}, [
                el('span', { class: 'tl-pair', text: Comorbidity.shortName(e.aName) + ' + ' + Comorbidity.shortName(e.bName) }),
                el('span', { class: 'tl-stat mono', text: e.support + ' patients \u00B7 ' + e.lift.toFixed(1) + '\u00D7' })
              ]);
            }))
        ]));
        return;
      }

      var node = model.byIri.get(local.selected);
      var partners = Comorbidity.partnersOf(local.selected);

      detail.appendChild(el('div', { class: 'gd-head' }, [
        el('span', { class: 'dot lg', style: 'background:' + node.color }),
        el('div', {}, [
          el('h3', { text: node.name }),
          el('p', { class: 'muted', text: node.categoryLabel + (node.icd ? ' \u00B7 ICD-10 ' + node.icd : '') })
        ])
      ]));

      detail.appendChild(el('div', { class: 'gd-stats' }, [
        el('div', {}, [el('span', { class: 'gd-num', text: String(node.prevalence) }), el('span', { text: 'patients' })]),
        el('div', {}, [el('span', { class: 'gd-num', text: (node.share * 100).toFixed(1) + '%' }), el('span', { text: 'of cohort' })]),
        el('div', {}, [el('span', { class: 'gd-num', text: String(partners.length) }), el('span', { text: 'linked conditions' })])
      ]));

      detail.appendChild(el('h4', { class: 'gd-h4', text: 'Travels with' }));
      if (!partners.length) {
        detail.appendChild(el('p', { class: 'muted', text: 'No co-occurrence clears the threshold for this condition.' }));
      } else {
        detail.appendChild(el('div', { class: 'gd-partners' }, partners.slice(0, 10).map(function (p) {
          return el('button', { class: 'gd-partner', onclick: function () {
            local.selected = p.iri; paint(); paintDetail();
          } }, [
            el('span', { class: 'dot', style: 'background:' + (p.node ? p.node.color : '#5C6B6A') }),
            el('span', { class: 'gd-partner-name', text: p.name }),
            el('span', { class: 'gd-partner-stat mono', text: p.support + ' \u00B7 ' + p.lift.toFixed(1) + '\u00D7' })
          ]);
        })));
      }

      detail.appendChild(el('div', { class: 'gd-explain' }, [
        el('p', { html: '<strong>patients</strong> is how many carry both conditions. ' +
          '<strong>lift</strong> is how many times more often the pair occurs together than it ' +
          'would if the two were independent. A lift of 1 means no association at all.' }),
        el('button', { class: 'link-btn', text: 'Show the query behind this', onclick: function () {
          App.openProvenance({
            title: node.name + ' in the network',
            sparql: partnerQuery(local.selected),
            intro: 'The network is measured in the browser from the result of this query, which lists ' +
                   'every patient and every disease the reasoner can attribute to them.',
            note: model.note
          });
        } })
      ]));
    }

    var controls = el('div', { class: 'graph-controls' }, [
      el('div', { class: 'legend' }, Comorbidity.categories().map(function (c) {
        return el('span', { class: 'legend-item' }, [
          el('span', { class: 'dot', style: 'background:' + c.color }),
          el('span', { text: c.label })
        ]);
      })),
      el('div', { class: 'threshold' }, [
        el('label', { for: 'thr', text: 'Minimum shared patients' }),
        (function () {
          var out = el('output', { class: 'mono', text: String(local.threshold) });
          var input = el('input', { type: 'range', id: 'thr', min: '2', max: '10', step: '1' });
          input.value = String(local.threshold);
          input.addEventListener('input', function () {
            local.threshold = parseInt(input.value, 10);
            out.textContent = input.value;
            paint();
          });
          return el('span', { class: 'threshold-ctl' }, [input, out]);
        })()
      ])
    ]);

    paint();
    if (detail) paintDetail();

    return el('div', { class: 'graph' + (detail ? ' has-detail' : '') }, [
      el('div', { class: 'graph-main' }, [canvas, controls]),
      detail
    ]);
  }

  /** Dim everything that is not one of the patient's conditions or a neighbour. */
  function renderFocused(iris, threshold) {
    var model = Comorbidity.get();
    var keep = new Set();
    iris.forEach(function (iri) {
      Comorbidity.neighbourIris(iri).forEach(function (n) { keep.add(n); });
    });
    var own = new Set(iris);

    var edges = model.edges.filter(function (e) { return e.support >= threshold; });
    var maxSupport = edges.reduce(function (a, e) { return Math.max(a, e.support); }, 1);
    var parts = ['<svg viewBox="0 0 ' + model.width + ' ' + model.height + '" class="cograph" ' +
                 'xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Your conditions on the comorbidity network">'];

    edges.forEach(function (e) {
      var A = model.byIri.get(e.a), B = model.byIri.get(e.b);
      if (!A || !B) return;
      var relevant = own.has(e.a) || own.has(e.b);
      var width = 0.8 + (e.support / maxSupport) * 5;
      parts.push('<line x1="' + A.x.toFixed(1) + '" y1="' + A.y.toFixed(1) +
                 '" x2="' + B.x.toFixed(1) + '" y2="' + B.y.toFixed(1) +
                 '" stroke="' + (relevant ? '#0B6E4F' : '#12201E') + '" stroke-width="' + width.toFixed(2) +
                 '" stroke-opacity="' + (relevant ? 0.5 : 0.06) + '" stroke-linecap="round"/>');
    });

    model.nodes.forEach(function (nd) {
      var isOwn = own.has(nd.iri);
      var isNear = keep.has(nd.iri);
      var op = isOwn ? 1 : isNear ? 0.62 : 0.14;
      parts.push('<g class="conode" data-iri="' + nd.iri.replace(/"/g, '&quot;') + '" opacity="' + op + '">');
      if (isOwn) {
        parts.push('<circle cx="' + nd.x.toFixed(1) + '" cy="' + nd.y.toFixed(1) +
                   '" r="' + (nd.r + 8).toFixed(1) + '" fill="none" stroke="#0B6E4F" stroke-width="1.8"/>');
      }
      parts.push('<circle cx="' + nd.x.toFixed(1) + '" cy="' + nd.y.toFixed(1) +
                 '" r="' + nd.r.toFixed(1) + '" fill="' + nd.color + '" fill-opacity="' + (isOwn ? 0.95 : 0.8) +
                 '" stroke="#FFFFFF" stroke-width="1.5"/>');
      parts.push('<text x="' + nd.x.toFixed(1) + '" y="' + (nd.y + 4).toFixed(1) +
                 '" text-anchor="middle" class="conode-count">' + nd.prevalence + '</text>');
      if (isOwn || isNear) {
        parts.push('<text x="' + nd.x.toFixed(1) + '" y="' + (nd.y + nd.r + 15).toFixed(1) +
                   '" text-anchor="middle" class="conode-label">' +
                   escapeXml(Comorbidity.shortName(nd.name)) + '</text>');
      }
      parts.push('</g>');
    });

    parts.push('</svg>');
    return parts.join('');
  }

  function escapeXml(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  /** A query that reproduces one node's partners, for the provenance drawer. */
  function partnerQuery(iri) {
    var short = RDF.shorten(RDF.iriOf(iri));
    return '# Patients carrying ' + short + ', and everything else they carry.\n' +
      '# The browser counts these pairs across the whole cohort to measure\n' +
      '# support and lift; this query is the raw material.\n\n' +
      'SELECT ?other ?otherName (COUNT(DISTINCT ?patient) AS ?bothPatients)\n' +
      'WHERE {\n' +
      '  ?patient med:suffersFrom ' + short + ' .\n' +
      '  ?patient med:suffersFrom ?other .\n' +
      '  ?other med:name ?otherName .\n' +
      '  FILTER(?other != ' + short + ')\n' +
      '}\n' +
      'GROUP BY ?other ?otherName\n' +
      'ORDER BY DESC(?bothPatients)';
  }

  return { render: render, partnerQuery: partnerQuery };
})();
