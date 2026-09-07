/* =============================================================================
   rdf.js — the semantic core.

   No dependencies. Provides:
     • RDF term handling using N-Triples strings as the internal encoding
     • An indexed in-memory triple store
     • A Turtle parser
     • A forward-chaining RDFS + OWL 2 RL reasoner that records provenance
     • A SPARQL 1.1 subset engine
     • Serialisers for Turtle, N-Triples, JSON-LD and RDF/XML

   Everything is exposed on the global `RDF` object.
   ========================================================================== */
var RDF = (function () {
  'use strict';

  /* ---------------------------------------------------------------- terms */
  var NS = {
    med:    'http://medisem.org/onto#',
    res:    'http://medisem.org/resource/',
    rdf:    'http://www.w3.org/1999/02/22-rdf-syntax-ns#',
    rdfs:   'http://www.w3.org/2000/01/rdf-schema#',
    owl:    'http://www.w3.org/2002/07/owl#',
    xsd:    'http://www.w3.org/2001/XMLSchema#',
    foaf:   'http://xmlns.com/foaf/0.1/',
    schema: 'https://schema.org/',
    dct:    'http://purl.org/dc/terms/',
    skos:   'http://www.w3.org/2004/02/skos/core#',
    sio:    'http://semanticscience.org/resource/',
    vann:   'http://purl.org/vocab/vann/'
  };

  function I(v) { return '<' + v + '>'; }
  function isIRI(t) { return t.charCodeAt(0) === 60; }
  function isLit(t) { return t.charCodeAt(0) === 34; }
  function isBlank(t) { return t.charCodeAt(0) === 95; }
  function iriOf(t) { return t.slice(1, -1); }

  function escLit(s) {
    return String(s).replace(/\\/g, '\\\\').replace(/"/g, '\\"')
      .replace(/\n/g, '\\n').replace(/\r/g, '\\r').replace(/\t/g, '\\t');
  }
  function mkLit(value, datatype, lang) {
    var s = '"' + escLit(value) + '"';
    if (lang) return s + '@' + lang;
    if (datatype && datatype !== NS.xsd + 'string') return s + '^^<' + datatype + '>';
    return s;
  }
  function litParts(t) {
    var out = '', i = 1;
    while (i < t.length) {
      var c = t.charAt(i);
      if (c === '\\') {
        var n = t.charAt(i + 1);
        out += n === 'n' ? '\n' : n === 'r' ? '\r' : n === 't' ? '\t' : n;
        i += 2; continue;
      }
      if (c === '"') break;
      out += c; i++;
    }
    var rest = t.slice(i + 1);
    if (rest.charAt(0) === '@') return { value: out, lang: rest.slice(1), datatype: NS.rdf + 'langString' };
    if (rest.slice(0, 2) === '^^') return { value: out, lang: null, datatype: rest.slice(3, -1) };
    return { value: out, lang: null, datatype: NS.xsd + 'string' };
  }
  function strOf(t) {
    if (t === undefined || t === null) return undefined;
    if (isLit(t)) return litParts(t).value;
    if (isIRI(t)) return iriOf(t);
    return t;
  }
  var NUMERIC = /(integer|decimal|double|float|int|long|short|byte|Negative|Positive|UnsignedI)/;
  function numOf(t) {
    if (t === undefined || t === null || !isLit(t)) return null;
    var p = litParts(t);
    if (!NUMERIC.test(p.datatype)) return null;
    var n = parseFloat(p.value);
    return isNaN(n) ? null : n;
  }
  function shorten(iri) {
    for (var p in NS) if (iri.indexOf(NS[p]) === 0) return p + ':' + iri.slice(NS[p].length);
    return iri;
  }
  function shortTerm(t) {
    if (t === undefined) return '';
    if (isIRI(t)) return shorten(iriOf(t));
    if (isLit(t)) return litParts(t).value;
    return t;
  }
  function localName(iri) {
    var i = Math.max(iri.lastIndexOf('#'), iri.lastIndexOf('/'));
    return iri.slice(i + 1) || iri;
  }
  /** Local name of a term, whatever kind it is. Used constantly by the UI. */
  function local(t) { return isIRI(t) ? localName(iriOf(t)) : strOf(t); }

  var C = {
    TYPE:      I(NS.rdf + 'type'),
    FIRST:     I(NS.rdf + 'first'),
    REST:      I(NS.rdf + 'rest'),
    NIL:       I(NS.rdf + 'nil'),
    SUBCLASS:  I(NS.rdfs + 'subClassOf'),
    SUBPROP:   I(NS.rdfs + 'subPropertyOf'),
    DOMAIN:    I(NS.rdfs + 'domain'),
    RANGE:     I(NS.rdfs + 'range'),
    LABEL:     I(NS.rdfs + 'label'),
    COMMENT:   I(NS.rdfs + 'comment'),
    INVERSE:   I(NS.owl + 'inverseOf'),
    SYM:       I(NS.owl + 'SymmetricProperty'),
    TRANS:     I(NS.owl + 'TransitiveProperty'),
    EQCLASS:   I(NS.owl + 'equivalentClass'),
    EQPROP:    I(NS.owl + 'equivalentProperty'),
    SAMEAS:    I(NS.owl + 'sameAs'),
    ONPROP:    I(NS.owl + 'onProperty'),
    SOME:      I(NS.owl + 'someValuesFrom'),
    ALL:       I(NS.owl + 'allValuesFrom'),
    HASVAL:    I(NS.owl + 'hasValue'),
    INTER:     I(NS.owl + 'intersectionOf'),
    UNION:     I(NS.owl + 'unionOf'),
    CHAIN:     I(NS.owl + 'propertyChainAxiom'),
    THING:     I(NS.owl + 'Thing'),
    CLASS:     I(NS.owl + 'Class'),
    OBJPROP:   I(NS.owl + 'ObjectProperty'),
    DATAPROP:  I(NS.owl + 'DatatypeProperty')
  };

  /* ---------------------------------------------------------------- store */
  function Store() {
    this.triples = [];
    this.keys = new Set();
    this.byS = new Map();
    this.byP = new Map();
    this.byO = new Map();
  }
  function push(map, key, value) {
    var arr = map.get(key);
    if (!arr) { arr = []; map.set(key, arr); }
    arr.push(value);
  }
  Store.prototype.add = function (s, p, o) {
    var k = s + ' ' + p + ' ' + o;
    if (this.keys.has(k)) return false;
    this.keys.add(k);
    var t = [s, p, o];
    this.triples.push(t);
    push(this.byS, s, t); push(this.byP, p, t); push(this.byO, o, t);
    return true;
  };
  Store.prototype.has = function (s, p, o) { return this.keys.has(s + ' ' + p + ' ' + o); };
  /** Retract a triple. Needed to replay the retractions in a changeset. */
  Store.prototype.remove = function (s, p, o) {
    var k = s + ' ' + p + ' ' + o;
    if (!this.keys.has(k)) return false;
    this.keys.delete(k);
    var drop = function (arr) {
      if (!arr) return;
      for (var i = arr.length - 1; i >= 0; i--) {
        if (arr[i][0] === s && arr[i][1] === p && arr[i][2] === o) arr.splice(i, 1);
      }
    };
    drop(this.triples); drop(this.byS.get(s)); drop(this.byP.get(p)); drop(this.byO.get(o));
    return true;
  };
  Store.prototype.match = function (s, p, o) {
    var pool = null, size = Infinity, cand;
    if (s != null) { cand = this.byS.get(s) || []; if (cand.length < size) { pool = cand; size = cand.length; } }
    if (o != null) { cand = this.byO.get(o) || []; if (cand.length < size) { pool = cand; size = cand.length; } }
    if (p != null) { cand = this.byP.get(p) || []; if (cand.length < size) { pool = cand; size = cand.length; } }
    if (pool === null) pool = this.triples;
    var out = [];
    for (var i = 0; i < pool.length; i++) {
      var t = pool[i];
      if (s != null && t[0] !== s) continue;
      if (p != null && t[1] !== p) continue;
      if (o != null && t[2] !== o) continue;
      out.push(t);
    }
    return out;
  };
  Store.prototype.objects  = function (s, p) { return this.match(s, p, null).map(function (t) { return t[2]; }); };
  Store.prototype.subjects = function (p, o) { return this.match(null, p, o).map(function (t) { return t[0]; }); };
  /** First object, or undefined. The workhorse for reading a single attribute. */
  Store.prototype.one = function (s, p) { var a = this.match(s, p, null); return a.length ? a[0][2] : undefined; };
  /** First object as a plain string. */
  Store.prototype.val = function (s, p) { var t = this.one(s, p); return t === undefined ? undefined : strOf(t); };
  Store.prototype.num = function (s, p) { var t = this.one(s, p); return t === undefined ? undefined : (numOf(t) !== null ? numOf(t) : parseFloat(strOf(t))); };
  Store.prototype.count = function () { return this.triples.length; };
  Store.prototype.copy = function () {
    var s = new Store();
    for (var i = 0; i < this.triples.length; i++) { var t = this.triples[i]; s.add(t[0], t[1], t[2]); }
    return s;
  };

  /* --------------------------------------------------------- turtle parser */
  function tokenizeTurtle(text) {
    var toks = [], i = 0, n = text.length;
    function readString() {
      var quote = text.charAt(i), triple = text.substr(i, 3) === quote + quote + quote;
      var open = triple ? 3 : 1;
      i += open;
      var buf = '';
      while (i < n) {
        var c = text.charAt(i);
        if (c === '\\') {
          var e = text.charAt(i + 1);
          buf += e === 'n' ? '\n' : e === 'r' ? '\r' : e === 't' ? '\t' : e;
          i += 2; continue;
        }
        if (triple ? text.substr(i, 3) === quote + quote + quote : c === quote) break;
        buf += c; i++;
      }
      i += open;
      var tok = { t: 'str', v: buf, lang: null, dt: null };
      if (text.charAt(i) === '@') {
        var j = i + 1;
        while (j < n && /[A-Za-z0-9-]/.test(text.charAt(j))) j++;
        tok.lang = text.slice(i + 1, j); i = j;
      } else if (text.substr(i, 2) === '^^') {
        i += 2;
        if (text.charAt(i) === '<') { var k = text.indexOf('>', i); tok.dt = { kind: 'iri', v: text.slice(i + 1, k) }; i = k + 1; }
        else { var m = i; while (m < n && !/[\s.;,\]\)]/.test(text.charAt(m))) m++; tok.dt = { kind: 'pname', v: text.slice(i, m) }; i = m; }
      }
      return tok;
    }
    while (i < n) {
      var c = text.charAt(i);
      if (c === ' ' || c === '\t' || c === '\n' || c === '\r') { i++; continue; }
      if (c === '#') { while (i < n && text.charAt(i) !== '\n') i++; continue; }
      if (c === '<') { var j = text.indexOf('>', i); toks.push({ t: 'iri', v: text.slice(i + 1, j) }); i = j + 1; continue; }
      if (c === '"' || c === "'") { toks.push(readString()); continue; }
      if (c === '@') {
        var d = i + 1;
        while (d < n && /[A-Za-z]/.test(text.charAt(d))) d++;
        toks.push({ t: 'dir', v: text.slice(i + 1, d) }); i = d; continue;
      }
      if (/[0-9]/.test(c) || ((c === '+' || c === '-') && /[0-9.]/.test(text.charAt(i + 1)))) {
        var s0 = i; i++;
        while (i < n && /[0-9]/.test(text.charAt(i))) i++;
        var isDec = false, isDouble = false;
        if (text.charAt(i) === '.' && /[0-9]/.test(text.charAt(i + 1))) {
          isDec = true; i++;
          while (i < n && /[0-9]/.test(text.charAt(i))) i++;
        }
        if (/[eE]/.test(text.charAt(i))) {
          isDouble = true; i++;
          if (/[+-]/.test(text.charAt(i))) i++;
          while (i < n && /[0-9]/.test(text.charAt(i))) i++;
        }
        toks.push({ t: 'num', v: text.slice(s0, i), dt: isDouble ? NS.xsd + 'double' : isDec ? NS.xsd + 'decimal' : NS.xsd + 'integer' });
        continue;
      }
      if ('.;,[]()'.indexOf(c) !== -1) { toks.push({ t: 'punc', v: c }); i++; continue; }
      var w = i;
      while (i < n && !/[\s.;,\[\]()"'#]/.test(text.charAt(i))) i++;
      if (i === w) i++;
      toks.push({ t: 'word', v: text.slice(w, i) });
    }
    return toks;
  }

  function parseTurtle(text, store) {
    var toks = tokenizeTurtle(text), pos = 0, prefixes = {}, bcount = 0;
    function peek() { return toks[pos]; }
    function next() { return toks[pos++]; }
    function expect(v) {
      var t = next();
      if (!t || t.v !== v) throw new Error('Expected ' + v + ' near token ' + pos);
    }
    function resolve(w) {
      var idx = w.indexOf(':');
      if (idx === -1) throw new Error('Not a prefixed name: ' + w);
      var pfx = w.slice(0, idx);
      if (prefixes[pfx] === undefined) throw new Error('Unknown prefix "' + pfx + '"');
      return prefixes[pfx] + w.slice(idx + 1);
    }
    function fresh() { return '_:g' + (++bcount) + '_' + (store.triples.length); }

    function term() {
      var t = next();
      if (!t) throw new Error('Turtle ended unexpectedly');
      if (t.t === 'iri') return I(t.v);
      if (t.t === 'str') {
        var dt = null;
        if (t.dt) dt = t.dt.kind === 'iri' ? t.dt.v : resolve(t.dt.v);
        return mkLit(t.v, dt, t.lang);
      }
      if (t.t === 'num') return mkLit(t.v, t.dt, null);
      if (t.t === 'word') {
        if (t.v === 'a') return C.TYPE;
        if (t.v === 'true' || t.v === 'false') return mkLit(t.v, NS.xsd + 'boolean', null);
        return I(resolve(t.v));
      }
      if (t.t === 'punc' && t.v === '[') {
        var node = fresh();
        if (peek() && peek().v === ']') { next(); return node; }
        pol(node);
        expect(']');
        return node;
      }
      if (t.t === 'punc' && t.v === '(') {
        var items = [];
        while (peek() && peek().v !== ')') items.push(term());
        expect(')');
        if (!items.length) return C.NIL;
        var head = fresh(), cur = head;
        for (var k = 0; k < items.length; k++) {
          store.add(cur, C.FIRST, items[k]);
          if (k === items.length - 1) store.add(cur, C.REST, C.NIL);
          else { var nx = fresh(); store.add(cur, C.REST, nx); cur = nx; }
        }
        return head;
      }
      throw new Error('Unexpected Turtle token ' + JSON.stringify(t));
    }

    function pol(subject) {
      while (true) {
        var p = term();
        while (true) {
          store.add(subject, p, term());
          if (peek() && peek().v === ',') { next(); continue; }
          break;
        }
        if (peek() && peek().v === ';') {
          next();
          if (peek() && (peek().v === '.' || peek().v === ']')) break;
          continue;
        }
        break;
      }
    }

    while (pos < toks.length) {
      var t = peek();
      if (t.t === 'dir') {
        next();
        if (t.v === 'prefix') {
          var pn = next().v, iri = next().v;
          prefixes[pn.slice(0, pn.length - 1)] = iri;
          if (peek() && peek().v === '.') next();
        } else { next(); if (peek() && peek().v === '.') next(); }
        continue;
      }
      pol(term());
      if (peek() && peek().v === '.') next();
    }
    return prefixes;
  }

  /* ------------------------------------------------------------- reasoner */
  var RULE_TEXT = {
    rdfs2:       'Domain of a property gives the subject its type',
    rdfs3:       'Range of a property gives the object its type',
    rdfs5:       'Sub-property relationships chain together',
    rdfs7:       'A sub-property assertion implies the super-property',
    rdfs9:       'An instance of a class is an instance of its superclasses',
    rdfs11:      'Subclass relationships chain together',
    'owl-inv':   'Inverse properties mirror every assertion',
    'owl-sym':   'A symmetric property holds in both directions',
    'owl-trans': 'A transitive property closes over chains',
    'owl-eqc':   'Equivalent classes are subclasses of each other',
    'owl-eqp':   'Equivalent properties are sub-properties of each other',
    'owl-same':  'Two names for the same thing share all their facts',
    'owl-chain': 'A property chain composes two or more hops into one',
    'cls-svf':   'Having a value of the required type makes you a member',
    'cls-hv1':   'Pointing at the required value makes you a member',
    'cls-hv2':   'Membership implies the required value',
    'cls-avf':   'Every value of the property must have the stated type',
    'cls-int':   'Belonging to all parts means belonging to the intersection',
    'cls-uni':   'Belonging to any part means belonging to the union'
  };

  function readList(store, head) {
    var items = [], node = head, guard = 0;
    while (node && node !== C.NIL && guard++ < 200) {
      var first = store.one(node, C.FIRST);
      if (!first) break;
      items.push(first);
      node = store.one(node, C.REST);
    }
    return items;
  }

  function reason(store, maxRounds) {
    maxRounds = maxRounds || 12;
    var started = Date.now(), inferences = [], rounds = 0, changed = true;

    var defined = new Map();
    function addDefined(anon, named) {
      var list = defined.get(anon) || [];
      if (list.indexOf(named) === -1) list.push(named);
      defined.set(anon, list);
    }
    store.match(null, C.EQCLASS, null).forEach(function (q) {
      if (isBlank(q[0]) && isIRI(q[2])) addDefined(q[0], q[2]);
      if (isBlank(q[2]) && isIRI(q[0])) addDefined(q[2], q[0]);
    });
    function namesFor(node) { return isBlank(node) ? (defined.get(node) || []) : [node]; }

    while (changed && rounds < maxRounds) {
      changed = false; rounds++;
      var pending = [];
      function emit(s, p, o, rule, why) { pending.push([s, p, o, rule, why]); }

      store.match(null, C.SUBCLASS, null).forEach(function (sc) {
        if (!isIRI(sc[2])) return;
        store.match(null, C.TYPE, sc[0]).forEach(function (inst) {
          emit(inst[0], C.TYPE, sc[2], 'rdfs9',
            local(inst[0]) + ' is a ' + local(sc[0]) + ', a subclass of ' + local(sc[2]));
        });
      });

      store.match(null, C.SUBCLASS, null).forEach(function (a) {
        if (!isIRI(a[2])) return;
        store.match(a[2], C.SUBCLASS, null).forEach(function (b) {
          if (!isIRI(b[2])) return;
          emit(a[0], C.SUBCLASS, b[2], 'rdfs11', local(a[0]) + ' to ' + local(a[2]) + ' to ' + local(b[2]));
        });
      });

      store.match(null, C.SUBPROP, null).forEach(function (a) {
        store.match(a[2], C.SUBPROP, null).forEach(function (b) {
          emit(a[0], C.SUBPROP, b[2], 'rdfs5', 'sub-property chain via ' + local(a[2]));
        });
        store.match(null, a[0], null).forEach(function (use) {
          emit(use[0], a[2], use[2], 'rdfs7', local(a[0]) + ' is a sub-property of ' + local(a[2]));
        });
      });

      store.match(null, C.DOMAIN, null).forEach(function (d) {
        if (!isIRI(d[2])) return;
        store.match(null, d[0], null).forEach(function (use) {
          emit(use[0], C.TYPE, d[2], 'rdfs2', 'domain of ' + local(d[0]) + ' is ' + local(d[2]));
        });
      });
      store.match(null, C.RANGE, null).forEach(function (r) {
        if (!isIRI(r[2])) return;
        store.match(null, r[0], null).forEach(function (use) {
          if (isLit(use[2])) return;
          emit(use[2], C.TYPE, r[2], 'rdfs3', 'range of ' + local(r[0]) + ' is ' + local(r[2]));
        });
      });

      store.match(null, C.INVERSE, null).forEach(function (inv) {
        store.match(null, inv[0], null).forEach(function (use) {
          if (isLit(use[2])) return;
          emit(use[2], inv[2], use[0], 'owl-inv', local(inv[0]) + ' is the inverse of ' + local(inv[2]));
        });
        store.match(null, inv[2], null).forEach(function (use) {
          if (isLit(use[2])) return;
          emit(use[2], inv[0], use[0], 'owl-inv', local(inv[2]) + ' is the inverse of ' + local(inv[0]));
        });
      });

      store.match(null, C.TYPE, C.SYM).forEach(function (sym) {
        store.match(null, sym[0], null).forEach(function (use) {
          if (isLit(use[2])) return;
          emit(use[2], sym[0], use[0], 'owl-sym', local(sym[0]) + ' is symmetric');
        });
      });

      store.match(null, C.TYPE, C.TRANS).forEach(function (tr) {
        store.match(null, tr[0], null).forEach(function (a) {
          if (isLit(a[2])) return;
          store.match(a[2], tr[0], null).forEach(function (b) {
            emit(a[0], tr[0], b[2], 'owl-trans',
              local(tr[0]) + ' is transitive: ' + local(a[0]) + ' to ' + local(a[2]) + ' to ' + local(b[2]));
          });
        });
      });

      store.match(null, C.EQCLASS, null).forEach(function (eq) {
        if (isIRI(eq[0]) && isIRI(eq[2])) {
          emit(eq[0], C.SUBCLASS, eq[2], 'owl-eqc', 'equivalent classes');
          emit(eq[2], C.SUBCLASS, eq[0], 'owl-eqc', 'equivalent classes');
        }
      });
      store.match(null, C.EQPROP, null).forEach(function (eq) {
        emit(eq[0], C.SUBPROP, eq[2], 'owl-eqp', 'equivalent properties');
        emit(eq[2], C.SUBPROP, eq[0], 'owl-eqp', 'equivalent properties');
      });

      store.match(null, C.SAMEAS, null).forEach(function (same) {
        var a = same[0], b = same[2];
        if (isLit(b)) return;
        emit(b, C.SAMEAS, a, 'owl-same', 'sameAs is symmetric');
        store.match(a, null, null).forEach(function (q) {
          if (q[1] === C.SAMEAS) return;
          emit(b, q[1], q[2], 'owl-same', local(a) + ' owl:sameAs ' + local(b));
        });
        store.match(b, null, null).forEach(function (q) {
          if (q[1] === C.SAMEAS) return;
          emit(a, q[1], q[2], 'owl-same', local(b) + ' owl:sameAs ' + local(a));
        });
      });

      store.match(null, C.CHAIN, null).forEach(function (ch) {
        var chain = readList(store, ch[2]);
        if (chain.length < 2) return;
        var frontier = store.match(null, chain[0], null)
          .filter(function (q) { return !isLit(q[2]); })
          .map(function (q) { return [q[0], q[2]]; });
        for (var i = 1; i < chain.length && frontier.length; i++) {
          var nextF = [];
          for (var f = 0; f < frontier.length; f++) {
            var step = frontier[f];
            var hits = store.match(step[1], chain[i], null);
            for (var h = 0; h < hits.length; h++) if (!isLit(hits[h][2])) nextF.push([step[0], hits[h][2]]);
          }
          frontier = nextF;
        }
        var label = chain.map(function (c) { return local(c); }).join(' then ');
        frontier.forEach(function (hit) {
          emit(hit[0], ch[0], hit[1], 'owl-chain', local(ch[0]) + ' = ' + label);
        });
      });

      store.match(null, C.ONPROP, null).forEach(function (onp) {
        var restriction = onp[0], property = onp[2], targets = namesFor(restriction);

        var svf = store.one(restriction, C.SOME);
        if (svf && targets.length) {
          store.match(null, property, null).forEach(function (use) {
            if (isLit(use[2])) return;
            if (!(svf === C.THING || store.has(use[2], C.TYPE, svf))) return;
            targets.forEach(function (t) {
              emit(use[0], C.TYPE, t, 'cls-svf',
                local(use[0]) + ' has a ' + local(property) + ' of type ' + local(svf));
            });
          });
        }

        var hv = store.one(restriction, C.HASVAL);
        if (hv && targets.length) {
          store.match(null, property, hv).forEach(function (use) {
            targets.forEach(function (t) {
              emit(use[0], C.TYPE, t, 'cls-hv1', local(use[0]) + ' ' + local(property) + ' ' + local(hv));
            });
          });
        }
        if (hv) {
          store.match(null, C.SUBCLASS, restriction).forEach(function (sub) {
            store.match(null, C.TYPE, sub[0]).forEach(function (inst) {
              emit(inst[0], property, hv, 'cls-hv2',
                'every ' + local(sub[0]) + ' has ' + local(property) + ' ' + local(hv));
            });
          });
        }

        var avf = store.one(restriction, C.ALL);
        if (avf) {
          store.match(null, C.SUBCLASS, restriction).forEach(function (sub) {
            store.match(null, C.TYPE, sub[0]).forEach(function (inst) {
              store.match(inst[0], property, null).forEach(function (use) {
                if (isLit(use[2])) return;
                emit(use[2], C.TYPE, avf, 'cls-avf',
                  'all ' + local(property) + ' values of a ' + local(sub[0]) + ' are ' + local(avf));
              });
            });
          });
        }
      });

      store.match(null, C.INTER, null).forEach(function (it) {
        var members = readList(store, it[2]), targets = namesFor(it[0]);
        if (!members.length || !targets.length) return;
        store.match(null, C.TYPE, members[0]).forEach(function (q) {
          var cand = q[0];
          if (!members.every(function (m) { return store.has(cand, C.TYPE, m); })) return;
          targets.forEach(function (t) {
            emit(cand, C.TYPE, t, 'cls-int', local(cand) + ' is in every part of the intersection');
          });
        });
      });

      store.match(null, C.UNION, null).forEach(function (uni) {
        var members = readList(store, uni[2]), targets = namesFor(uni[0]);
        members.forEach(function (m) {
          store.match(null, C.TYPE, m).forEach(function (inst) {
            targets.forEach(function (t) {
              emit(inst[0], C.TYPE, t, 'cls-uni', local(inst[0]) + ' is a ' + local(m) + ', part of the union');
            });
          });
        });
      });

      for (var i = 0; i < pending.length; i++) {
        var e = pending[i];
        if (isLit(e[0])) continue;
        if (store.add(e[0], e[1], e[2])) {
          inferences.push({ s: e[0], p: e[1], o: e[2], rule: e[3], why: e[4] });
          changed = true;
        }
      }
    }

    var byRule = {};
    inferences.forEach(function (i) { byRule[i.rule] = (byRule[i.rule] || 0) + 1; });
    return { inferences: inferences, rounds: rounds, byRule: byRule, ms: Date.now() - started };
  }

  /* --------------------------------------------------------------- sparql */
  function tokenizeSparql(q) {
    var toks = [], i = 0, n = q.length;
    var TWO = ['<=', '>=', '!=', '&&', '||'];
    while (i < n) {
      var c = q.charAt(i);
      if (/\s/.test(c)) { i++; continue; }
      if (c === '#') { while (i < n && q.charAt(i) !== '\n') i++; continue; }
      if (c === '?' || c === '$') {
        var j = i + 1;
        while (j < n && /[A-Za-z0-9_]/.test(q.charAt(j))) j++;
        toks.push({ t: 'var', v: q.slice(i + 1, j) }); i = j; continue;
      }
      if (c === '<') {
        var m = /^<[^\s<>"{}|\^`\\]*>/.exec(q.slice(i));
        if (m) { toks.push({ t: 'iri', v: m[0].slice(1, -1) }); i += m[0].length; continue; }
      }
      if (c === '"' || c === "'") {
        var quote = c, buf = '', k = i + 1;
        while (k < n) {
          var ch = q.charAt(k);
          if (ch === '\\') { var e = q.charAt(k + 1); buf += e === 'n' ? '\n' : e === 't' ? '\t' : e; k += 2; continue; }
          if (ch === quote) break;
          buf += ch; k++;
        }
        k++;
        var tok = { t: 'str', v: buf, lang: null, dt: null };
        if (q.charAt(k) === '@') {
          var l = k + 1;
          while (l < n && /[A-Za-z0-9-]/.test(q.charAt(l))) l++;
          tok.lang = q.slice(k + 1, l); k = l;
        } else if (q.substr(k, 2) === '^^') {
          k += 2;
          if (q.charAt(k) === '<') { var z = q.indexOf('>', k); tok.dt = { kind: 'iri', v: q.slice(k + 1, z) }; k = z + 1; }
          else { var y = k; while (y < n && !/[\s.;,\)\}]/.test(q.charAt(y))) y++; tok.dt = { kind: 'pname', v: q.slice(k, y) }; k = y; }
        }
        toks.push(tok); i = k; continue;
      }
      if (/[0-9]/.test(c) || ((c === '+' || c === '-') && /[0-9.]/.test(q.charAt(i + 1)))) {
        var s0 = i; i++;
        while (i < n && /[0-9]/.test(q.charAt(i))) i++;
        var dec = false;
        if (q.charAt(i) === '.' && /[0-9]/.test(q.charAt(i + 1))) { dec = true; i++; while (i < n && /[0-9]/.test(q.charAt(i))) i++; }
        toks.push({ t: 'num', v: q.slice(s0, i), dt: dec ? NS.xsd + 'decimal' : NS.xsd + 'integer' });
        continue;
      }
      var two = q.substr(i, 2), hit = false;
      for (var o = 0; o < TWO.length; o++) if (two === TWO[o]) { toks.push({ t: 'op', v: two }); i += 2; hit = true; break; }
      if (hit) continue;
      if ('{}().;,*'.indexOf(c) !== -1) { toks.push({ t: 'punc', v: c }); i++; continue; }
      if ('=<>!+-/'.indexOf(c) !== -1) { toks.push({ t: 'op', v: c }); i++; continue; }
      var w = i;
      while (i < n && !/[\s{}().;,"'?$<>=!&|*+\-\/]/.test(q.charAt(i))) i++;
      if (i === w) i++;
      toks.push({ t: 'word', v: q.slice(w, i) });
    }
    return toks;
  }

  var AGGS = ['COUNT', 'SUM', 'AVG', 'MIN', 'MAX', 'SAMPLE', 'GROUP_CONCAT'];

  function parseSparql(text) {
    var toks = tokenizeSparql(text), pos = 0, prefixes = {};
    for (var p in NS) prefixes[p] = NS[p];

    function peek(k) { return toks[pos + (k || 0)]; }
    function next() { return toks[pos++]; }
    function isW(t, w) { return t && t.t === 'word' && t.v.toUpperCase() === w; }
    function at(w) { return isW(peek(), w); }
    function eat(v) {
      var t = peek();
      if (t && (t.v === v || (t.t === 'word' && t.v.toUpperCase() === v))) { pos++; return true; }
      return false;
    }
    function expect(v) {
      if (!eat(v)) throw new Error('Expected "' + v + '" but found "' + (peek() ? peek().v : 'end of query') + '"');
    }
    function resolve(w) {
      var idx = w.indexOf(':');
      if (idx === -1) throw new Error('Not a prefixed name: ' + w);
      var pfx = w.slice(0, idx);
      if (prefixes[pfx] === undefined) throw new Error('Unknown prefix "' + pfx + ':"');
      return prefixes[pfx] + w.slice(idx + 1);
    }

    while (peek() && (at('PREFIX') || at('BASE'))) {
      var kind = next().v.toUpperCase();
      if (kind === 'BASE') { next(); continue; }
      var pn = next().v, iri = next().v;
      prefixes[pn.slice(0, pn.length - 1)] = iri;
    }

    function pterm() {
      var t = next();
      if (!t) throw new Error('Query ended unexpectedly');
      if (t.t === 'var') return '?' + t.v;
      if (t.t === 'iri') return I(t.v);
      if (t.t === 'num') return mkLit(t.v, t.dt, null);
      if (t.t === 'str') {
        var dt = null;
        if (t.dt) dt = t.dt.kind === 'iri' ? t.dt.v : resolve(t.dt.v);
        return mkLit(t.v, dt, t.lang);
      }
      if (t.t === 'word') {
        if (t.v === 'a') return C.TYPE;
        if (t.v === 'true' || t.v === 'false') return mkLit(t.v, NS.xsd + 'boolean', null);
        return I(resolve(t.v));
      }
      if (t.t === 'punc' && t.v === '(') { expect(')'); return C.NIL; }
      throw new Error('Unexpected token "' + t.v + '" in a triple pattern');
    }

    function parseTriples(out) {
      var subject = pterm();
      while (true) {
        var predicate = pterm();
        while (true) {
          out.push([subject, predicate, pterm()]);
          if (eat(',')) continue;
          break;
        }
        if (eat(';')) {
          var nx = peek();
          if (!nx || nx.v === '.' || nx.v === '}') break;
          continue;
        }
        break;
      }
      eat('.');
    }

    function expr() { return orX(); }
    function orX() { var l = andX(); while (peek() && peek().v === '||') { next(); l = { op: '||', a: l, b: andX() }; } return l; }
    function andX() { var l = cmp(); while (peek() && peek().v === '&&') { next(); l = { op: '&&', a: l, b: cmp() }; } return l; }
    function cmp() {
      var l = add(), t = peek();
      if (t && t.t === 'op' && ['=', '!=', '<', '>', '<=', '>='].indexOf(t.v) !== -1) { next(); return { op: t.v, a: l, b: add() }; }
      if (isW(t, 'IN')) { next(); expect('('); var list = []; do { list.push(expr()); } while (eat(',')); expect(')'); return { op: 'IN', a: l, list: list }; }
      return l;
    }
    function add() {
      var l = un();
      while (peek() && peek().t === 'op' && ['+', '-'].indexOf(peek().v) !== -1) { var o = next().v; l = { op: o, a: l, b: un() }; }
      return l;
    }
    function un() {
      if (peek() && peek().t === 'op' && peek().v === '!') { next(); return { op: '!', a: un() }; }
      if (peek() && peek().t === 'op' && peek().v === '-') { next(); return { op: 'neg', a: un() }; }
      return prim();
    }
    function prim() {
      var t = peek();
      if (!t) throw new Error('Expression ended unexpectedly');
      if (t.t === 'punc' && t.v === '(') { next(); var e = expr(); expect(')'); return e; }
      if (t.t === 'var') { next(); return { op: 'var', name: t.v }; }
      if (t.t === 'num') { next(); return { op: 'const', term: mkLit(t.v, t.dt, null) }; }
      if (t.t === 'str') {
        next();
        var dt = null;
        if (t.dt) dt = t.dt.kind === 'iri' ? t.dt.v : resolve(t.dt.v);
        return { op: 'const', term: mkLit(t.v, dt, t.lang) };
      }
      if (t.t === 'iri') { next(); return { op: 'const', term: I(t.v) }; }
      if (t.t === 'word') {
        var up = t.v.toUpperCase();
        if (peek(1) && peek(1).t === 'punc' && peek(1).v === '(') {
          next(); next();
          if (AGGS.indexOf(up) !== -1) {
            var distinct = false;
            if (at('DISTINCT')) { next(); distinct = true; }
            var arg = null;
            if (peek() && peek().v === '*') next();
            else arg = expr();
            while (peek() && peek().v !== ')') next();
            expect(')');
            return { op: 'agg', name: up, distinct: distinct, arg: arg };
          }
          var args = [];
          if (!(peek() && peek().v === ')')) { do { args.push(expr()); } while (eat(',')); }
          expect(')');
          return { op: 'call', name: up, args: args };
        }
        next();
        if (t.v === 'true' || t.v === 'false') return { op: 'const', term: mkLit(t.v, NS.xsd + 'boolean', null) };
        return { op: 'const', term: I(resolve(t.v)) };
      }
      throw new Error('Cannot read expression near "' + t.v + '"');
    }

    function group() {
      expect('{');
      var els = [];
      while (peek() && peek().v !== '}') {
        if (at('OPTIONAL')) { next(); els.push({ type: 'optional', group: group() }); continue; }
        if (at('FILTER')) { next(); els.push({ type: 'filter', expr: expr() }); eat('.'); continue; }
        if (at('BIND')) {
          next(); expect('(');
          var e = expr(); expect('AS');
          var v = next(); expect(')'); eat('.');
          els.push({ type: 'bind', expr: e, name: v.v });
          continue;
        }
        if (at('VALUES')) {
          next();
          var vv = next(); expect('{');
          var rows = [];
          while (peek() && peek().v !== '}') rows.push(pterm());
          expect('}');
          els.push({ type: 'values', name: vv.v, rows: rows });
          continue;
        }
        if (peek().t === 'punc' && peek().v === '{') {
          var left = group();
          if (at('UNION')) { next(); els.push({ type: 'union', left: left, right: group() }); }
          else els.push({ type: 'group', group: left });
          continue;
        }
        if (peek().v === '.') { next(); continue; }
        var triples = [];
        parseTriples(triples);
        els.push({ type: 'bgp', triples: triples });
      }
      expect('}');
      return els;
    }

    var form = peek() ? peek().v.toUpperCase() : '';
    var Q = { form: form, distinct: false, projection: [], where: [], groupBy: [], orderBy: [],
              limit: null, offset: null, template: null, describe: [] };

    if (form === 'SELECT') {
      next();
      if (at('DISTINCT')) { next(); Q.distinct = true; } else if (at('REDUCED')) next();
      if (peek() && peek().v === '*') { next(); Q.projection = '*'; }
      else {
        while (peek() && !at('WHERE') && !(peek().t === 'punc' && peek().v === '{')) {
          if (peek().t === 'var') { var vr = next(); Q.projection.push({ name: vr.v, expr: { op: 'var', name: vr.v } }); continue; }
          if (peek().t === 'punc' && peek().v === '(') {
            next();
            var ex = expr(); expect('AS');
            var alias = next(); expect(')');
            Q.projection.push({ name: alias.v, expr: ex });
            continue;
          }
          break;
        }
      }
      eat('WHERE'); Q.where = group();
    } else if (form === 'ASK') {
      next(); eat('WHERE'); Q.where = group();
    } else if (form === 'CONSTRUCT') {
      next(); expect('{');
      var tmpl = [];
      while (peek() && peek().v !== '}') parseTriples(tmpl);
      expect('}');
      Q.template = tmpl;
      eat('WHERE'); Q.where = group();
    } else if (form === 'DESCRIBE') {
      next();
      while (peek() && !at('WHERE') && !(peek().t === 'punc' && peek().v === '{')) Q.describe.push(pterm());
      if (peek() && (at('WHERE') || peek().v === '{')) { eat('WHERE'); Q.where = group(); }
    } else {
      throw new Error('Only SELECT, ASK, CONSTRUCT and DESCRIBE are supported.');
    }

    while (peek()) {
      if (at('GROUP')) { next(); expect('BY'); while (peek() && peek().t === 'var') Q.groupBy.push(next().v); continue; }
      if (at('ORDER')) {
        next(); expect('BY');
        while (peek()) {
          var desc = false;
          if (at('DESC')) { next(); desc = true; } else if (at('ASC')) next();
          if (peek() && peek().t === 'var') { Q.orderBy.push({ expr: { op: 'var', name: next().v }, desc: desc }); continue; }
          if (peek() && peek().t === 'punc' && peek().v === '(') { next(); var oe = expr(); expect(')'); Q.orderBy.push({ expr: oe, desc: desc }); continue; }
          break;
        }
        continue;
      }
      if (at('LIMIT')) { next(); Q.limit = parseInt(next().v, 10); continue; }
      if (at('OFFSET')) { next(); Q.offset = parseInt(next().v, 10); continue; }
      if (peek().v === '.') { next(); continue; }
      break;
    }
    return Q;
  }

  function isVar(t) { return typeof t === 'string' && t.charAt(0) === '?'; }
  function bindTerm(t, b) { if (!isVar(t)) return t; var v = b[t.slice(1)]; return v === undefined ? t : v; }
  function TRUE() { return mkLit('true', NS.xsd + 'boolean', null); }
  function FALSE() { return mkLit('false', NS.xsd + 'boolean', null); }
  function ebv(t) {
    if (t === undefined || t === null) return false;
    if (!isLit(t)) return true;
    var p = litParts(t);
    if (p.datatype === NS.xsd + 'boolean') return p.value === 'true';
    if (NUMERIC.test(p.datatype)) return parseFloat(p.value) !== 0;
    return p.value.length > 0;
  }
  function cmpTerms(a, b) {
    var na = numOf(a), nb = numOf(b);
    if (na !== null && nb !== null) return na < nb ? -1 : na > nb ? 1 : 0;
    var sa = strOf(a), sb = strOf(b);
    if (sa === undefined) return sb === undefined ? 0 : -1;
    if (sb === undefined) return 1;
    return sa < sb ? -1 : sa > sb ? 1 : 0;
  }
  function eqTerms(a, b) {
    if (a === b) return true;
    if (a === undefined || b === undefined) return false;
    var na = numOf(a), nb = numOf(b);
    if (na !== null && nb !== null) return na === nb;
    if (isLit(a) !== isLit(b)) return false;
    return strOf(a) === strOf(b);
  }

  function evalExpr(node, b) {
    switch (node.op) {
      case 'var': return b[node.name];
      case 'const': return node.term;
      case '&&': return (ebv(evalExpr(node.a, b)) && ebv(evalExpr(node.b, b))) ? TRUE() : FALSE();
      case '||': return (ebv(evalExpr(node.a, b)) || ebv(evalExpr(node.b, b))) ? TRUE() : FALSE();
      case '!': return ebv(evalExpr(node.a, b)) ? FALSE() : TRUE();
      case 'neg': { var nv = numOf(evalExpr(node.a, b)); return nv === null ? undefined : mkLit(String(-nv), NS.xsd + 'decimal', null); }
      case '+': case '-': case '/': {
        var x = numOf(evalExpr(node.a, b)), y = numOf(evalExpr(node.b, b));
        if (x === null || y === null) return undefined;
        return mkLit(String(node.op === '+' ? x + y : node.op === '-' ? x - y : x / y), NS.xsd + 'decimal', null);
      }
      case '=': return eqTerms(evalExpr(node.a, b), evalExpr(node.b, b)) ? TRUE() : FALSE();
      case '!=': return eqTerms(evalExpr(node.a, b), evalExpr(node.b, b)) ? FALSE() : TRUE();
      case '<': case '>': case '<=': case '>=': {
        var av = evalExpr(node.a, b), bv = evalExpr(node.b, b);
        if (av === undefined || bv === undefined) return FALSE();
        var c = cmpTerms(av, bv);
        var ok = node.op === '<' ? c < 0 : node.op === '>' ? c > 0 : node.op === '<=' ? c <= 0 : c >= 0;
        return ok ? TRUE() : FALSE();
      }
      case 'IN': {
        var target = evalExpr(node.a, b);
        for (var i = 0; i < node.list.length; i++) if (eqTerms(target, evalExpr(node.list[i], b))) return TRUE();
        return FALSE();
      }
      case 'call': return callFn(node, b);
      case 'agg': return undefined;
    }
    return undefined;
  }
  function callFn(node, b) {
    var a0 = node.args[0] ? evalExpr(node.args[0], b) : undefined;
    var a1 = node.args[1] ? evalExpr(node.args[1], b) : undefined;
    switch (node.name) {
      case 'STR': return a0 === undefined ? undefined : mkLit(strOf(a0), null, null);
      case 'BOUND': return (node.args[0].op === 'var' ? b[node.args[0].name] !== undefined : a0 !== undefined) ? TRUE() : FALSE();
      case 'LANG': return mkLit(a0 !== undefined && isLit(a0) ? (litParts(a0).lang || '') : '', null, null);
      case 'DATATYPE': return a0 !== undefined && isLit(a0) ? I(litParts(a0).datatype) : undefined;
      case 'ISIRI': case 'ISURI': return a0 !== undefined && isIRI(a0) ? TRUE() : FALSE();
      case 'ISLITERAL': return a0 !== undefined && isLit(a0) ? TRUE() : FALSE();
      case 'ISBLANK': return a0 !== undefined && isBlank(a0) ? TRUE() : FALSE();
      case 'STRLEN': return mkLit(String((strOf(a0) || '').length), NS.xsd + 'integer', null);
      case 'UCASE': return mkLit((strOf(a0) || '').toUpperCase(), null, null);
      case 'LCASE': return mkLit((strOf(a0) || '').toLowerCase(), null, null);
      case 'STRSTARTS': return (strOf(a0) || '').indexOf(strOf(a1) || '') === 0 ? TRUE() : FALSE();
      case 'STRENDS': { var s = strOf(a0) || '', suf = strOf(a1) || ''; return s.lastIndexOf(suf) === s.length - suf.length ? TRUE() : FALSE(); }
      case 'CONTAINS': return (strOf(a0) || '').indexOf(strOf(a1) || '') !== -1 ? TRUE() : FALSE();
      case 'STRBEFORE': { var sb = strOf(a0) || '', ix = sb.indexOf(strOf(a1) || ''); return mkLit(ix === -1 ? '' : sb.slice(0, ix), null, null); }
      case 'STRAFTER': { var sa = strOf(a0) || '', nd = strOf(a1) || '', ia = sa.indexOf(nd); return mkLit(ia === -1 ? '' : sa.slice(ia + nd.length), null, null); }
      case 'SUBSTR': {
        var start = numOf(evalExpr(node.args[1], b)) || 1;
        var len = node.args[2] ? numOf(evalExpr(node.args[2], b)) : undefined;
        var base = strOf(a0) || '';
        return mkLit(len === undefined ? base.slice(start - 1) : base.substr(start - 1, len), null, null);
      }
      case 'CONCAT': {
        var out = '';
        for (var i = 0; i < node.args.length; i++) out += strOf(evalExpr(node.args[i], b)) || '';
        return mkLit(out, null, null);
      }
      case 'REGEX': {
        var flags = node.args[2] ? (strOf(evalExpr(node.args[2], b)) || '') : '';
        try { return new RegExp(strOf(a1) || '', flags).test(strOf(a0) || '') ? TRUE() : FALSE(); }
        catch (e) { return FALSE(); }
      }
      case 'IF': return ebv(a0) ? evalExpr(node.args[1], b) : evalExpr(node.args[2], b);
      case 'COALESCE': {
        for (var j = 0; j < node.args.length; j++) { var v = evalExpr(node.args[j], b); if (v !== undefined) return v; }
        return undefined;
      }
      case 'ABS': { var an = numOf(a0); return an === null ? undefined : mkLit(String(Math.abs(an)), NS.xsd + 'decimal', null); }
      case 'ROUND': { var rn = numOf(a0); return rn === null ? undefined : mkLit(String(Math.round(rn)), NS.xsd + 'integer', null); }
      case 'FLOOR': { var fn = numOf(a0); return fn === null ? undefined : mkLit(String(Math.floor(fn)), NS.xsd + 'integer', null); }
      case 'YEAR': return mkLit((strOf(a0) || '').slice(0, 4), NS.xsd + 'integer', null);
      case 'MONTH': return mkLit((strOf(a0) || '').slice(5, 7), NS.xsd + 'integer', null);
    }
    throw new Error('Function ' + node.name + '() is not supported by this engine.');
  }

  function joinBGP(sols, patterns, store) {
    for (var pi = 0; pi < patterns.length; pi++) {
      var pat = patterns[pi], out = [];
      for (var si = 0; si < sols.length; si++) {
        var b = sols[si];
        var s = bindTerm(pat[0], b), p = bindTerm(pat[1], b), o = bindTerm(pat[2], b);
        var ms = store.match(isVar(s) ? null : s, isVar(p) ? null : p, isVar(o) ? null : o);
        for (var mi = 0; mi < ms.length; mi++) {
          var t = ms[mi], nb = null, ok = true, slots = [s, p, o];
          for (var k = 0; k < 3; k++) {
            if (isVar(slots[k])) {
              var name = slots[k].slice(1);
              if (nb === null) nb = Object.assign({}, b);
              if (nb[name] !== undefined && nb[name] !== t[k]) { ok = false; break; }
              nb[name] = t[k];
            }
          }
          if (ok) out.push(nb === null ? b : nb);
        }
      }
      sols = out;
      if (!sols.length) return sols;
    }
    return sols;
  }

  function evalGroup(els, store, sols) {
    var filters = [];
    for (var i = 0; i < els.length; i++) {
      var el = els[i];
      if (el.type === 'filter') { filters.push(el.expr); continue; }
      if (el.type === 'bgp') { sols = joinBGP(sols, el.triples, store); continue; }
      if (el.type === 'group') { sols = evalGroup(el.group, store, sols); continue; }
      if (el.type === 'optional') {
        var out = [];
        for (var s = 0; s < sols.length; s++) {
          var got = evalGroup(el.group, store, [sols[s]]);
          if (got.length) out = out.concat(got); else out.push(sols[s]);
        }
        sols = out; continue;
      }
      if (el.type === 'union') { sols = evalGroup(el.left, store, sols).concat(evalGroup(el.right, store, sols)); continue; }
      if (el.type === 'bind') {
        sols = sols.map(function (b) {
          var nb = Object.assign({}, b);
          var v = evalExpr(el.expr, b);
          if (v !== undefined) nb[el.name] = v;
          return nb;
        });
        continue;
      }
      if (el.type === 'values') {
        var exp = [];
        sols.forEach(function (b) {
          el.rows.forEach(function (r) { var nb = Object.assign({}, b); nb[el.name] = r; exp.push(nb); });
        });
        sols = exp; continue;
      }
    }
    for (var f = 0; f < filters.length; f++) {
      (function (ex) {
        sols = sols.filter(function (b) { try { return ebv(evalExpr(ex, b)); } catch (e) { return false; } });
      })(filters[f]);
    }
    return sols;
  }

  function hasAgg(node) {
    if (!node) return false;
    if (node.op === 'agg') return true;
    return (node.a && hasAgg(node.a)) || (node.b && hasAgg(node.b)) ||
      (node.args || []).some(hasAgg) || (node.list || []).some(hasAgg);
  }
  function applyAgg(node, rows) {
    var values = [];
    for (var i = 0; i < rows.length; i++) {
      if (node.arg === null) { values.push(TRUE()); continue; }
      var v = evalExpr(node.arg, rows[i]);
      if (v !== undefined) values.push(v);
    }
    if (node.distinct) {
      var seen = new Set(), u = [];
      values.forEach(function (v) { if (!seen.has(v)) { seen.add(v); u.push(v); } });
      values = u;
    }
    var nums = values.map(numOf).filter(function (n) { return n !== null; });
    switch (node.name) {
      case 'COUNT': return mkLit(String(values.length), NS.xsd + 'integer', null);
      case 'SUM': return mkLit(String(nums.reduce(function (a, b) { return a + b; }, 0)), NS.xsd + 'decimal', null);
      case 'AVG': return nums.length ? mkLit(String(nums.reduce(function (a, b) { return a + b; }, 0) / nums.length), NS.xsd + 'decimal', null) : undefined;
      case 'MIN': return values.length ? values.slice().sort(cmpTerms)[0] : undefined;
      case 'MAX': return values.length ? values.slice().sort(cmpTerms)[values.length - 1] : undefined;
      case 'SAMPLE': return values[0];
      case 'GROUP_CONCAT': return mkLit(values.map(strOf).join(', '), null, null);
    }
    return undefined;
  }
  function evalAgg(node, rows) {
    if (node.op === 'agg') return applyAgg(node, rows);
    if (node.op === 'var' || node.op === 'const') return evalExpr(node, rows[0] || {});
    var clone = Object.assign({}, node);
    if (node.a) clone.a = { op: 'const', term: evalAgg(node.a, rows) };
    if (node.b) clone.b = { op: 'const', term: evalAgg(node.b, rows) };
    if (node.args) clone.args = node.args.map(function (x) { return { op: 'const', term: evalAgg(x, rows) }; });
    return evalExpr(clone, rows[0] || {});
  }

  function query(text, store) {
    var started = Date.now();
    var Q = parseSparql(text);
    var sols = evalGroup(Q.where, store, [{}]);

    if (Q.form === 'ASK') return { ok: true, form: 'ask', boolean: sols.length > 0, ms: Date.now() - started };

    if (Q.form === 'CONSTRUCT' || Q.form === 'DESCRIBE') {
      var result = new Store();
      if (Q.form === 'CONSTRUCT') {
        sols.forEach(function (b) {
          Q.template.forEach(function (t) {
            var s = bindTerm(t[0], b), p = bindTerm(t[1], b), o = bindTerm(t[2], b);
            if (isVar(s) || isVar(p) || isVar(o)) return;
            result.add(s, p, o);
          });
        });
      } else {
        var targets = [];
        Q.describe.forEach(function (t) {
          if (isVar(t)) sols.forEach(function (b) { var v = b[t.slice(1)]; if (v) targets.push(v); });
          else targets.push(t);
        });
        targets.forEach(function (node) {
          store.match(node, null, null).forEach(function (t) { result.add(t[0], t[1], t[2]); });
        });
      }
      return { ok: true, form: 'construct', store: result, count: result.count(), turtle: toTurtle(result), ms: Date.now() - started };
    }

    var projection = Q.projection, vars;
    if (projection === '*') {
      var seen = [];
      sols.forEach(function (b) { for (var k in b) if (seen.indexOf(k) === -1) seen.push(k); });
      vars = seen;
      projection = seen.map(function (k) { return { name: k, expr: { op: 'var', name: k } }; });
    } else vars = projection.map(function (p) { return p.name; });

    var aggregated = projection.some(function (p) { return hasAgg(p.expr); }) || Q.groupBy.length > 0;
    var rows;
    if (aggregated) {
      var groups = new Map();
      sols.forEach(function (b) {
        var key = Q.groupBy.map(function (g) { return b[g] === undefined ? '' : b[g]; }).join('\u0001');
        if (!groups.has(key)) groups.set(key, []);
        groups.get(key).push(b);
      });
      if (groups.size === 0 && Q.groupBy.length === 0) groups.set('', []);
      rows = [];
      groups.forEach(function (members) {
        var row = {};
        projection.forEach(function (p) {
          var v = hasAgg(p.expr) ? evalAgg(p.expr, members) : evalExpr(p.expr, members[0] || {});
          if (v !== undefined) row[p.name] = v;
        });
        rows.push(row);
      });
    } else {
      rows = sols.map(function (b) {
        var row = {};
        projection.forEach(function (p) { var v = evalExpr(p.expr, b); if (v !== undefined) row[p.name] = v; });
        return row;
      });
    }

    if (Q.distinct) {
      var sr = new Set(), ur = [];
      rows.forEach(function (r) {
        var k = vars.map(function (v) { return r[v] === undefined ? '\u0000' : r[v]; }).join('\u0001');
        if (!sr.has(k)) { sr.add(k); ur.push(r); }
      });
      rows = ur;
    }
    if (Q.orderBy.length) {
      rows = rows.slice().sort(function (x, y) {
        for (var i = 0; i < Q.orderBy.length; i++) {
          var ob = Q.orderBy[i];
          var c = cmpTerms(evalExpr(ob.expr, x), evalExpr(ob.expr, y));
          if (c !== 0) return ob.desc ? -c : c;
        }
        return 0;
      });
    }
    if (Q.offset) rows = rows.slice(Q.offset);
    if (Q.limit != null) rows = rows.slice(0, Q.limit);

    return { ok: true, form: 'select', vars: vars, rows: rows, count: rows.length, ms: Date.now() - started };
  }

  /* ---------------------------------------------------------- serialisers */
  function toNTriples(store) {
    return store.triples.map(function (t) { return t[0] + ' ' + t[1] + ' ' + t[2] + ' .'; }).join('\n') + '\n';
  }
  function w(term) {
    if (isIRI(term)) { var s = shorten(iriOf(term)); return s === iriOf(term) ? term : s; }
    if (isLit(term)) {
      var p = litParts(term), base = '"' + escLit(p.value) + '"';
      if (p.lang) return base + '@' + p.lang;
      if (p.datatype && p.datatype !== NS.xsd + 'string') return base + '^^' + w(I(p.datatype));
      return base;
    }
    return term;
  }
  function toTurtle(store) {
    var lines = [];
    for (var p in NS) lines.push('@prefix ' + p + ': <' + NS[p] + '> .');
    lines.push('');
    var bySubject = new Map();
    store.triples.forEach(function (t) {
      if (!bySubject.has(t[0])) bySubject.set(t[0], []);
      bySubject.get(t[0]).push(t);
    });
    bySubject.forEach(function (ts, s) {
      var byPred = new Map();
      ts.forEach(function (t) {
        if (!byPred.has(t[1])) byPred.set(t[1], []);
        byPred.get(t[1]).push(t[2]);
      });
      var parts = [];
      byPred.forEach(function (objs, pred) {
        parts.push('    ' + (pred === C.TYPE ? 'a' : w(pred)) + ' ' + objs.map(w).join(' , '));
      });
      lines.push(w(s) + '\n' + parts.join(' ;\n') + ' .');
      lines.push('');
    });
    return lines.join('\n');
  }
  function toJsonLd(store) {
    var context = {}, nodes = new Map();
    for (var p in NS) context[p] = NS[p];
    store.triples.forEach(function (t) {
      var id = isBlank(t[0]) ? t[0] : shorten(iriOf(t[0]));
      if (!nodes.has(id)) nodes.set(id, { '@id': id });
      var node = nodes.get(id);
      if (t[1] === C.TYPE) {
        if (!node['@type']) node['@type'] = [];
        node['@type'].push(isIRI(t[2]) ? shorten(iriOf(t[2])) : t[2]);
        return;
      }
      var key = shorten(iriOf(t[1])), value;
      if (isLit(t[2])) {
        var pr = litParts(t[2]);
        if (pr.lang) value = { '@value': pr.value, '@language': pr.lang };
        else if (pr.datatype !== NS.xsd + 'string') value = { '@value': pr.value, '@type': shorten(pr.datatype) };
        else value = pr.value;
      } else if (isBlank(t[2])) value = { '@id': t[2] };
      else value = { '@id': shorten(iriOf(t[2])) };
      if (node[key] === undefined) node[key] = value;
      else if (Array.isArray(node[key])) node[key].push(value);
      else node[key] = [node[key], value];
    });
    return JSON.stringify({ '@context': context, '@graph': Array.from(nodes.values()) }, null, 2);
  }
  function xmlEsc(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }
  function toRdfXml(store) {
    var out = ['<?xml version="1.0" encoding="UTF-8"?>', '<rdf:RDF'];
    for (var p in NS) out.push('    xmlns:' + p + '="' + NS[p] + '"');
    out[out.length - 1] += '>';
    var bySubject = new Map();
    store.triples.forEach(function (t) {
      if (!bySubject.has(t[0])) bySubject.set(t[0], []);
      bySubject.get(t[0]).push(t);
    });
    bySubject.forEach(function (ts, s) {
      out.push(isBlank(s) ? '  <rdf:Description rdf:nodeID="' + xmlEsc(s.slice(2)) + '">'
                          : '  <rdf:Description rdf:about="' + xmlEsc(iriOf(s)) + '">');
      ts.forEach(function (t) {
        var tag = shorten(iriOf(t[1]));
        if (tag === iriOf(t[1])) return;
        if (isLit(t[2])) {
          var pr = litParts(t[2]);
          var dt = pr.datatype && pr.datatype !== NS.xsd + 'string' ? ' rdf:datatype="' + xmlEsc(pr.datatype) + '"' : '';
          var lg = pr.lang ? ' xml:lang="' + pr.lang + '"' : '';
          out.push('    <' + tag + dt + lg + '>' + xmlEsc(pr.value) + '</' + tag + '>');
        } else if (isBlank(t[2])) out.push('    <' + tag + ' rdf:nodeID="' + xmlEsc(t[2].slice(2)) + '"/>');
        else out.push('    <' + tag + ' rdf:resource="' + xmlEsc(iriOf(t[2])) + '"/>');
      });
      out.push('  </rdf:Description>');
    });
    out.push('</rdf:RDF>');
    return out.join('\n');
  }

  var PREFIX_BLOCK = Object.keys(NS).map(function (p) { return 'PREFIX ' + p + ': <' + NS[p] + '>'; }).join('\n');

  return {
    NS: NS, C: C, I: I, isIRI: isIRI, isLit: isLit, isBlank: isBlank, iriOf: iriOf,
    mkLit: mkLit, litParts: litParts, strOf: strOf, numOf: numOf,
    shorten: shorten, shortTerm: shortTerm, localName: localName, local: local,
    Store: Store, parseTurtle: parseTurtle, reason: reason, RULE_TEXT: RULE_TEXT,
    query: query, readList: readList,
    toTurtle: toTurtle, toNTriples: toNTriples, toJsonLd: toJsonLd, toRdfXml: toRdfXml,
    PREFIX_BLOCK: PREFIX_BLOCK
  };
})();

if (typeof module !== 'undefined') module.exports = RDF;
