/*! Copyright (c) 2015 WhatsApp Inc.  All Rights Reserved. */
webpackJsonp([85], {
  2: function(e, t, n) {
    "use strict";

    function r(e, t, n, r, i, o, a, s) {
      if (!e) {
        var u;
        if (void 0 === t) u = new Error("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");
        else {
          var c = [n, r, i, o, a, s],
            f = 0;
          u = new Error(t.replace(/%s/g, function() {
            return c[f++]
          })), u.name = "Invariant Violation"
        }
        throw u.framesToPop = 1, u
      }
    }
    e.exports = r
  },
  5: function(e, t, n) {
    "use strict";
    var r = n(24),
      i = r;
    e.exports = i
  },
  12: function(e, t) {
    "use strict";
    var n = !("undefined" == typeof window || !window.document || !window.document.createElement),
      r = {
        canUseDOM: n,
        canUseWorkers: "undefined" != typeof Worker,
        canUseEventListeners: n && !(!window.addEventListener && !window.attachEvent),
        canUseViewport: n && !!window.screen,
        isInWorker: !n
      };
    e.exports = r
  },
  24: function(e, t) {
    "use strict";

    function n(e) {
      return function() {
        return e
      }
    }

    function r() {}
    r.thatReturns = n, r.thatReturnsFalse = n(!1), r.thatReturnsTrue = n(!0), r.thatReturnsNull = n(null), r.thatReturnsThis = function() {
      return this
    }, r.thatReturnsArgument = function(e) {
      return e
    }, e.exports = r
  },
  36: function(e, t, n) {
    "use strict";
    var r = n(415)["default"];
    t["default"] = function(e) {
      return e && e.constructor === r ? "symbol" : typeof e
    }, t.__esModule = !0
  },
  37: function(e, t) {
    "use strict";
    var n = function(e) {
      var t;
      for (t in e)
        if (e.hasOwnProperty(t)) return t;
      return null
    };
    e.exports = n
  },
  43: function(e, t, n) {
    var r;
    /*!
    	  Copyright (c) 2015 Jed Watson.
    	  Licensed under the MIT License (MIT), see
    	  http://jedwatson.github.io/classnames
    	*/
    ! function() {
      "use strict";

      function i() {
        for (var e = "", t = 0; t < arguments.length; t++) {
          var n = arguments[t];
          if (n) {
            var r = typeof n;
            if ("string" === r || "number" === r) e += " " + n;
            else if (Array.isArray(n)) e += " " + i.apply(null, n);
            else if ("object" === r)
              for (var o in n) n.hasOwnProperty(o) && n[o] && (e += " " + o)
          }
        }
        return e.substr(1)
      }
      "undefined" != typeof e && e.exports ? e.exports = i : (r = function() {
        return i
      }.call(t, n, t, e), !(void 0 !== r && (e.exports = r)))
    }()
  },
  60: function(e, t) {
    e.exports = function(e) {
      return e.webpackPolyfill || (e.deprecate = function() {}, e.paths = [], e.children = [], e.webpackPolyfill = 1), e
    }
  },
  71: function(e, t, n) {
    "use strict";
    var r = {};
    e.exports = r
  },
  92: function(e, t, n) {
    "use strict";
    var r = n(2),
      i = function(e) {
        var t, n = {};
        e instanceof Object && !Array.isArray(e) ? void 0 : r(!1);
        for (t in e) e.hasOwnProperty(t) && (n[t] = t);
        return n
      };
    e.exports = i
  },
  102: function(e, t, n) {
    (function(e, r) {
      function i(e, t) {
        this._id = e, this._clearFn = t
      }
      var o = n(626).nextTick,
        a = Function.prototype.apply,
        s = Array.prototype.slice,
        u = {},
        c = 0;
      t.setTimeout = function() {
        return new i(a.call(setTimeout, window, arguments), clearTimeout)
      }, t.setInterval = function() {
        return new i(a.call(setInterval, window, arguments), clearInterval)
      }, t.clearTimeout = t.clearInterval = function(e) {
        e.close()
      }, i.prototype.unref = i.prototype.ref = function() {}, i.prototype.close = function() {
        this._clearFn.call(window, this._id)
      }, t.enroll = function(e, t) {
        clearTimeout(e._idleTimeoutId), e._idleTimeout = t
      }, t.unenroll = function(e) {
        clearTimeout(e._idleTimeoutId), e._idleTimeout = -1
      }, t._unrefActive = t.active = function(e) {
        clearTimeout(e._idleTimeoutId);
        var t = e._idleTimeout;
        t >= 0 && (e._idleTimeoutId = setTimeout(function() {
          e._onTimeout && e._onTimeout()
        }, t))
      }, t.setImmediate = "function" == typeof e ? e : function(e) {
        var n = c++,
          r = arguments.length < 2 ? !1 : s.call(arguments, 1);
        return u[n] = !0, o(function() {
          u[n] && (r ? e.apply(null, r) : e.call(null), t.clearImmediate(n))
        }), n
      }, t.clearImmediate = "function" == typeof r ? r : function(e) {
        delete u[e]
      }
    }).call(t, n(102).setImmediate, n(102).clearImmediate)
  },
  127: function(e, t) {
    "use strict";

    function n(e, t) {
      if (e === t) return !0;
      if ("object" != typeof e || null === e || "object" != typeof t || null === t) return !1;
      var n = Object.keys(e),
        i = Object.keys(t);
      if (n.length !== i.length) return !1;
      for (var o = r.bind(t), a = 0; a < n.length; a++)
        if (!o(n[a]) || e[n[a]] !== t[n[a]]) return !1;
      return !0
    }
    var r = Object.prototype.hasOwnProperty;
    e.exports = n
  },
  162: function(e, t, n) {
    "use strict";
    var r = n(412)["default"];
    t["default"] = r || function(e) {
      for (var t = 1; t < arguments.length; t++) {
        var n = arguments[t];
        for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
      }
      return e
    }, t.__esModule = !0
  },
  167: function(e, t) {
    "use strict";
    t.__esModule = !0, t["default"] = function(e, t) {
      if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }
  },
  168: function(e, t, n) {
    "use strict";

    function r(e) {
      return e && e.__esModule ? e : {
        "default": e
      }
    }
    t.__esModule = !0;
    var i = n(187),
      o = r(i);
    t["default"] = function() {
      function e(e, t) {
        for (var n = 0; n < t.length; n++) {
          var r = t[n];
          r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), (0, o["default"])(e, r.key, r)
        }
      }
      return function(t, n, r) {
        return n && e(t.prototype, n), r && e(t, r), t
      }
    }()
  },
  196: function(e, t, n) {
    function r(e) {
      return e = e || {},
        function(t, n) {
          for (var r in t)
            if (t.hasOwnProperty(r)) {
              var i = e[r];
              n(i && i.name || r, t[r], i && i.printer, i && i.width)
            }
        }
    }

    function i() {
      Object.defineProperties(this, {
        __printers: {
          value: {},
          enumerable: !1
        },
        __cell: {
          value: function(e, t, n) {
            this[e] = t, this.__printers[e] = n
          },
          enumerable: !1
        }
      })
    }

    function o(e, t, n) {
      function r(e, n) {
        var r = null != t[e].width;
        if (r) f[e] = t[e].width;
        else {
          if (f[e] > n) return;
          f[e] = n
        }
      }

      function i(e, t) {
        return e.__printers && e.__printers[t] || a.string
      }

      function o() {
        e.forEach(function(e) {
          for (var n in t) r(n, i(e, n).call(e, e[n]).length)
        })
      }

      function s(e) {
        var r = "",
          i = !0;
        for (var o in t) {
          i || (r += n), i = !1;
          var a = f[o];
          r += u(e(o, a), a)
        }
        return r += "\n"
      }

      function u(e, t) {
        return e.length <= t ? c(e, t) : (e = e.slice(0, t), t > 3 && (e = e.slice(0, -3).concat("...")), e)
      }
      var c = a.RightPadder(),
        f = {};
      return o(), e.map(function(e) {
        return s(function(t, n) {
          return i(e, t).call(e, e[t], n)
        })
      }).join("")
    }

    function a() {
      this.columns = {}, this.rows = [], this._row = new i
    }
    e.exports = a, a.string = function(e) {
      return void 0 === e ? "" : String(e)
    }, a.Number = function(e) {
      return function(t, n) {
        if (void 0 === t) return "";
        if ("number" != typeof t) throw new Error(String(t) + " is not a number");
        var r = null == e ? String(t) : t.toFixed(e).toString();
        return a.padLeft(r, n)
      }
    }, a.RightPadder = function(e) {
      return e = e || " ",
        function(t, n) {
          for (var r = String(t), i = r.length, o = 0; n - i > o; o++) r += e;
          return r
        }
    }, a.LeftPadder = function(e) {
      return e = e || " ",
        function(t, n) {
          for (var r = "", i = String(t), o = 0; o < n - i.length; o++) r += e;
          return r += i
        }
    }, a.padLeft = a.LeftPadder(), a.printArray = function(e, t, n) {
      t = "function" == typeof t ? t : r(t), n = n || function(e) {
        return e.toString()
      };
      var i = new a,
        o = i.cell.bind(i);
      return e.forEach(function(e) {
        t(e, o), i.newRow()
      }), n(i)
    }, a.printObj = function(e, t, n) {
      t = "function" == typeof t ? t : r(t), n = n || function(e) {
        return e.printTransposed(" : ")
      };
      var i = new a;
      return t(e, i.cell.bind(i)), i.newRow(), n(i)
    }, a.Row = i, a.print = o, a.prototype.cell = function(e, t, n, r) {
      this._row.__cell(e, t, n);
      var i = this.columns[e] || (this.columns[e] = {});
      return null != r && (i.width = r), this
    }, a.prototype.newRow = a.prototype.newLine = function() {
      return this.rows.push(this._row), this._row = new i, this
    }, a.prototype.sort = n(465), a.aggr = n(464), a.prototype.totals = null, a.prototype.total = function(e, t, n) {
      t = t || a.aggr.sum, n = n || t.printer, this.totals = this.totals || new i;
      var r, o = this.rows;
      return this.totals.__cell(e, null, function(i, a) {
        return null != a ? n(r, a) : (r = o.reduce(function(n, r, i) {
          return t(n, r[e], i, o.length)
        }, null), n(r))
      }), this
    }, a.prototype.shift = "  ", a.prototype.print = function() {
      return o(this.rows, this.columns, this.shift)
    }, a.prototype.printTransposed = function(e) {
      function t(e, t) {
        var n = e.__printers && e.__printers[t];
        return n ? function(e) {
          return n(e)
        } : void 0
      }
      var n = new a;
      e && (n.shift = e);
      for (var r in this.columns) n.cell("h", r), this.rows.forEach(function(e, i) {
        n.cell("f" + i, e[r], t(e, r))
      }), n.newRow();
      return n.print()
    }, a.prototype.toString = function() {
      var e = a.RightPadder("-"),
        t = this.createRow(function() {
          return ["", e]
        }),
        n = this.createRow(function(e) {
          return [e]
        }),
        r = [n, t].concat(this.rows);
      return this.totals && (r = r.concat([t, this.totals])), o(r, this.columns, this.shift)
    }, a.prototype.createRow = function(e) {
      var t = new i;
      for (var n in this.columns) {
        var r = e(n);
        t.__cell(n, r[0], r[1])
      }
      return t
    }
  },
  197: function(e, t, n) {
    "use strict";
    var r = n(24),
      i = {
        listen: function(e, t, n) {
          return e.addEventListener ? (e.addEventListener(t, n, !1), {
            remove: function() {
              e.removeEventListener(t, n, !1)
            }
          }) : e.attachEvent ? (e.attachEvent("on" + t, n), {
            remove: function() {
              e.detachEvent("on" + t, n)
            }
          }) : void 0
        },
        capture: function(e, t, n) {
          return e.addEventListener ? (e.addEventListener(t, n, !0), {
            remove: function() {
              e.removeEventListener(t, n, !0)
            }
          }) : {
            remove: r
          }
        },
        registerDefault: function() {}
      };
    e.exports = i
  },
  198: function(e, t, n) {
    "use strict";

    function r(e, t) {
      var n = !0;
      e: for (; n;) {
        var r = e,
          o = t;
        if (n = !1, r && o) {
          if (r === o) return !0;
          if (i(r)) return !1;
          if (i(o)) {
            e = r, t = o.parentNode, n = !0;
            continue e
          }
          return r.contains ? r.contains(o) : r.compareDocumentPosition ? !!(16 & r.compareDocumentPosition(o)) : !1
        }
        return !1
      }
    }
    var i = n(478);
    e.exports = r
  },
  199: function(e, t) {
    "use strict";

    function n(e) {
      try {
        e.focus()
      } catch (t) {}
    }
    e.exports = n
  },
  200: function(e, t) {
    "use strict";

    function n() {
      if ("undefined" == typeof document) return null;
      try {
        return document.activeElement || document.body
      } catch (e) {
        return document.body
      }
    }
    e.exports = n
  },
  201: function(e, t, n) {
    "use strict";

    function r(e) {
      return a ? void 0 : o(!1), h.hasOwnProperty(e) || (e = "*"), s.hasOwnProperty(e) || ("*" === e ? a.innerHTML = "<link />" : a.innerHTML = "<" + e + "></" + e + ">", s[e] = !a.firstChild), s[e] ? h[e] : null
    }
    var i = n(12),
      o = n(2),
      a = i.canUseDOM ? document.createElement("div") : null,
      s = {},
      u = [1, '<select multiple="true">', "</select>"],
      c = [1, "<table>", "</table>"],
      f = [3, "<table><tbody><tr>", "</tr></tbody></table>"],
      l = [1, '<svg xmlns="http://www.w3.org/2000/svg">', "</svg>"],
      h = {
        "*": [1, "?<div>", "</div>"],
        area: [1, "<map>", "</map>"],
        col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
        legend: [1, "<fieldset>", "</fieldset>"],
        param: [1, "<object>", "</object>"],
        tr: [2, "<table><tbody>", "</tbody></table>"],
        optgroup: u,
        option: u,
        caption: c,
        colgroup: c,
        tbody: c,
        tfoot: c,
        thead: c,
        td: f,
        th: f
      },
      d = ["circle", "clipPath", "defs", "ellipse", "g", "image", "line", "linearGradient", "mask", "path", "pattern", "polygon", "polyline", "radialGradient", "rect", "stop", "text", "tspan"];
    d.forEach(function(e) {
      h[e] = l, s[e] = !0
    }), e.exports = r
  },
  351: function(e, t, n) {
    var r;
    ! function() {
      function i(e, t, n) {
        return e.call.apply(e.bind, arguments)
      }

      function o(e, t, n) {
        if (!e) throw Error();
        if (2 < arguments.length) {
          var r = Array.prototype.slice.call(arguments, 2);
          return function() {
            var n = Array.prototype.slice.call(arguments);
            return Array.prototype.unshift.apply(n, r), e.apply(t, n)
          }
        }
        return function() {
          return e.apply(t, arguments)
        }
      }

      function a(e, t, n) {
        return a = Function.prototype.bind && -1 != Function.prototype.bind.toString().indexOf("native code") ? i : o, a.apply(null, arguments)
      }

      function s(e, t) {
        this.D = e, this.m = t || e, this.F = this.m.document
      }

      function u(e, t, n) {
        e = e.F.getElementsByTagName(t)[0], e || (e = document.documentElement), e.insertBefore(n, e.lastChild)
      }

      function c(e, t, n) {
        t = t || [], n = n || [];
        for (var r = e.className.split(/\s+/), i = 0; i < t.length; i += 1) {
          for (var o = !1, a = 0; a < r.length; a += 1)
            if (t[i] === r[a]) {
              o = !0;
              break
            }
          o || r.push(t[i])
        }
        for (t = [], i = 0; i < r.length; i += 1) {
          for (o = !1, a = 0; a < n.length; a += 1)
            if (r[i] === n[a]) {
              o = !0;
              break
            }
          o || t.push(r[i])
        }
        e.className = t.join(" ").replace(/\s+/g, " ").replace(/^\s+|\s+$/, "")
      }

      function f(e, t) {
        for (var n = e.className.split(/\s+/), r = 0, i = n.length; i > r; r++)
          if (n[r] == t) return !0;
        return !1
      }

      function l(e) {
        if ("string" == typeof e.da) return e.da;
        var t = e.m.location.protocol;
        return "about:" == t && (t = e.D.location.protocol), "https:" == t ? "https:" : "http:"
      }

      function h(e, t) {
        var n = e.createElement("link", {
            rel: "stylesheet",
            href: t,
            media: "all"
          }),
          r = !1;
        n.onload = function() {
          r || (r = !0)
        }, n.onerror = function() {
          r || (r = !0)
        }, u(e, "head", n)
      }

      function d(e, t, n, r) {
        var i = e.F.getElementsByTagName("head")[0];
        if (i) {
          var o = e.createElement("script", {
              src: t
            }),
            a = !1;
          return o.onload = o.onreadystatechange = function() {
            a || this.readyState && "loaded" != this.readyState && "complete" != this.readyState || (a = !0, n && n(null), o.onload = o.onreadystatechange = null, "HEAD" == o.parentNode.tagName && i.removeChild(o))
          }, i.appendChild(o), setTimeout(function() {
            a || (a = !0, n && n(Error("Script load timeout")))
          }, r || 5e3), o
        }
        return null
      }

      function p(e) {
        this.ca = e || "-"
      }

      function m(e, t) {
        this.V = e, this.N = 4, this.H = "n";
        var n = (t || "n4").match(/^([nio])([1-9])$/i);
        n && (this.H = n[1], this.N = parseInt(n[2], 10))
      }

      function g(e) {
        return e.H + e.N
      }

      function v(e) {
        var t = 4,
          n = "n",
          r = null;
        return e && ((r = e.match(/(normal|oblique|italic)/i)) && r[1] && (n = r[1].substr(0, 1).toLowerCase()), (r = e.match(/([1-9]00|normal|bold)/i)) && r[1] && (/bold/i.test(r[1]) ? t = 7 : /[1-9]00/.test(r[1]) && (t = parseInt(r[1].substr(0, 1), 10)))), n + t
      }

      function b(e, t) {
        this.a = e, this.h = e.m.document.documentElement, this.J = t, this.f = "wf", this.e = new p("-"), this.Z = !1 !== t.events, this.u = !1 !== t.classes
      }

      function w(e) {
        e.u && c(e.h, [e.e.d(e.f, "loading")]), _(e, "loading")
      }

      function y(e) {
        if (e.u) {
          var t = f(e.h, e.e.d(e.f, "active")),
            n = [],
            r = [e.e.d(e.f, "loading")];
          t || n.push(e.e.d(e.f, "inactive")), c(e.h, n, r)
        }
        _(e, "inactive")
      }

      function _(e, t, n) {
        e.Z && e.J[t] && (n ? e.J[t](n.getName(), g(n)) : e.J[t]())
      }

      function k() {
        this.t = {}
      }

      function x(e, t, n) {
        var r, i = [];
        for (r in t)
          if (t.hasOwnProperty(r)) {
            var o = e.t[r];
            o && i.push(o(t[r], n))
          }
        return i
      }

      function S(e, t) {
        this.a = e, this.q = t, this.j = this.a.createElement("span", {
          "aria-hidden": "true"
        }, this.q)
      }

      function A(e, t) {
        var n, r = e.j;
        n = [];
        for (var i = t.V.split(/,\s*/), o = 0; o < i.length; o++) {
          var a = i[o].replace(/['"]/g, ""); - 1 == a.indexOf(" ") ? n.push(a) : n.push("'" + a + "'")
        }
        n = n.join(","), i = "normal", "o" === t.H ? i = "oblique" : "i" === t.H && (i = "italic"), r.style.cssText = "display:block;position:absolute;top:-9999px;left:-9999px;font-size:300px;width:auto;height:auto;line-height:normal;margin:0;padding:0;font-variant:normal;white-space:nowrap;font-family:" + n + ";" + ("font-style:" + i + ";font-weight:" + (t.N + "00") + ";")
      }

      function O(e) {
        u(e.a, "body", e.j)
      }

      function P(e, t, n, r, i, o, a) {
        this.O = e, this.ba = t, this.a = n, this.g = r, this.q = a || "BESbswy", this.s = {}, this.M = i || 3e3, this.T = o || null, this.C = this.B = this.w = this.v = null, this.v = new S(this.a, this.q), this.w = new S(this.a, this.q), this.B = new S(this.a, this.q), this.C = new S(this.a, this.q), A(this.v, new m(this.g.getName() + ",serif", g(this.g))), A(this.w, new m(this.g.getName() + ",sans-serif", g(this.g))), A(this.B, new m("serif", g(this.g))), A(this.C, new m("sans-serif", g(this.g))), O(this.v), O(this.w), O(this.B), O(this.C)
      }

      function E() {
        if (null === W) {
          var e = /AppleWebKit\/([0-9]+)(?:\.([0-9]+))/.exec(window.navigator.userAgent);
          W = !!e && (536 > parseInt(e[1], 10) || 536 === parseInt(e[1], 10) && 11 >= parseInt(e[2], 10))
        }
        return W
      }

      function T(e, t, n) {
        for (var r in H)
          if (H.hasOwnProperty(r) && t === e.s[H[r]] && n === e.s[H[r]]) return !0;
        return !1
      }

      function C(e) {
        var t, n = e.v.j.offsetWidth,
          r = e.w.j.offsetWidth;
        (t = n === e.s.serif && r === e.s["sans-serif"]) || (t = E() && T(e, n, r)), t ? V() - e.ea >= e.M ? E() && T(e, n, r) && (null === e.T || e.T.hasOwnProperty(e.g.getName())) ? D(e, e.O) : D(e, e.ba) : M(e) : D(e, e.O)
      }

      function M(e) {
        setTimeout(a(function() {
          C(this)
        }, e), 50)
      }

      function D(e, t) {
        setTimeout(a(function() {
          this.v.remove(), this.w.remove(), this.B.remove(), this.C.remove(), t(this.g)
        }, e), 0)
      }

      function I(e, t, n) {
        this.a = e, this.o = t, this.K = 0, this.X = this.S = !1, this.M = n
      }

      function L(e) {
        0 == --e.K && e.S && (e.X ? (e = e.o, e.u && c(e.h, [e.e.d(e.f, "active")], [e.e.d(e.f, "loading"), e.e.d(e.f, "inactive")]), _(e, "active")) : y(e.o))
      }

      function F(e) {
        this.D = e, this.p = new k, this.U = 0, this.P = this.Q = !0
      }

      function R(e, t, n, r, i) {
        var o = 0 == --e.U;
        (e.P || e.Q) && setTimeout(function() {
          var e = i || null,
            s = r || null || {};
          if (0 === n.length && o) y(t.o);
          else {
            t.K += n.length, o && (t.S = o);
            var u, f = [];
            for (u = 0; u < n.length; u++) {
              var l = n[u],
                h = s[l.getName()],
                d = t.o,
                p = l;
              d.u && c(d.h, [d.e.d(d.f, p.getName(), g(p).toString(), "loading")]), _(d, "fontloading", p), d = null, d = new P(a(t.$, t), a(t.aa, t), t.a, l, t.M, e, h), f.push(d)
            }
            for (u = 0; u < f.length; u++) f[u].start()
          }
        }, 0)
      }

      function N(e, t, n) {
        var r = [],
          i = n.timeout;
        w(t);
        var r = x(e.p, n, e.a),
          o = new I(e.a, t, i);
        for (e.U = r.length, t = 0, n = r.length; n > t; t++) r[t].load(function(t, n, r) {
          R(e, o, t, n, r)
        })
      }

      function U(e, t, n) {
        this.I = e ? e : t + Y, this.k = [], this.L = [], this.Y = n || ""
      }

      function j(e) {
        this.k = e, this.W = [], this.G = {}
      }

      function B(e, t) {
        this.a = e, this.c = t
      }

      function z(e, t) {
        this.a = e, this.c = t, this.R = []
      }

      function K(e, t) {
        this.a = e, this.c = t
      }

      function G(e, t) {
        this.a = e, this.c = t
      }

      function q(e, t) {
        this.a = e, this.c = t
      }
      var V = Date.now || function() {
        return +new Date
      };
      s.prototype.createElement = function(e, t, n) {
        if (e = this.F.createElement(e), t)
          for (var r in t) t.hasOwnProperty(r) && ("style" == r ? e.style.cssText = t[r] : e.setAttribute(r, t[r]));
        return n && e.appendChild(this.F.createTextNode(n)), e
      }, p.prototype.d = function(e) {
        for (var t = [], n = 0; n < arguments.length; n++) t.push(arguments[n].replace(/[\W_]+/g, "").toLowerCase());
        return t.join(this.ca)
      }, m.prototype.getName = function() {
        return this.V
      }, S.prototype.remove = function() {
        var e = this.j;
        e.parentNode && e.parentNode.removeChild(e)
      };
      var H = {
          ga: "serif",
          fa: "sans-serif"
        },
        W = null;
      P.prototype.start = function() {
        this.s.serif = this.B.j.offsetWidth, this.s["sans-serif"] = this.C.j.offsetWidth, this.ea = V(), C(this)
      }, I.prototype.$ = function(e) {
        var t = this.o;
        t.u && c(t.h, [t.e.d(t.f, e.getName(), g(e).toString(), "active")], [t.e.d(t.f, e.getName(), g(e).toString(), "loading"), t.e.d(t.f, e.getName(), g(e).toString(), "inactive")]), _(t, "fontactive", e), this.X = !0, L(this)
      }, I.prototype.aa = function(e) {
        var t = this.o;
        if (t.u) {
          var n = f(t.h, t.e.d(t.f, e.getName(), g(e).toString(), "active")),
            r = [],
            i = [t.e.d(t.f, e.getName(), g(e).toString(), "loading")];
          n || r.push(t.e.d(t.f, e.getName(), g(e).toString(), "inactive")), c(t.h, r, i)
        }
        _(t, "fontinactive", e), L(this)
      }, F.prototype.load = function(e) {
        this.a = new s(this.D, e.context || this.D), this.Q = !1 !== e.events, this.P = !1 !== e.classes, N(this, new b(this.a, e), e)
      };
      var Y = "//fonts.googleapis.com/css";
      U.prototype.d = function() {
        if (0 == this.k.length) throw Error("No fonts to load!");
        if (-1 != this.I.indexOf("kit=")) return this.I;
        for (var e = this.k.length, t = [], n = 0; e > n; n++) t.push(this.k[n].replace(/ /g, "+"));
        return e = this.I + "?family=" + t.join("%7C"), 0 < this.L.length && (e += "&subset=" + this.L.join(",")), 0 < this.Y.length && (e += "&text=" + encodeURIComponent(this.Y)), e
      };
      var Z = {
          latin: "BESbswy",
          cyrillic: "&#1081;&#1103;&#1046;",
          greek: "&#945;&#946;&#931;",
          khmer: "&#x1780;&#x1781;&#x1782;",
          Hanuman: "&#x1780;&#x1781;&#x1782;"
        },
        X = {
          thin: "1",
          extralight: "2",
          "extra-light": "2",
          ultralight: "2",
          "ultra-light": "2",
          light: "3",
          regular: "4",
          book: "4",
          medium: "5",
          "semi-bold": "6",
          semibold: "6",
          "demi-bold": "6",
          demibold: "6",
          bold: "7",
          "extra-bold": "8",
          extrabold: "8",
          "ultra-bold": "8",
          ultrabold: "8",
          black: "9",
          heavy: "9",
          l: "3",
          r: "4",
          b: "7"
        },
        J = {
          i: "i",
          italic: "i",
          n: "n",
          normal: "n"
        },
        Q = /^(thin|(?:(?:extra|ultra)-?)?light|regular|book|medium|(?:(?:semi|demi|extra|ultra)-?)?bold|black|heavy|l|r|b|[1-9]00)?(n|i|normal|italic)?$/;
      j.prototype.parse = function() {
        for (var e = this.k.length, t = 0; e > t; t++) {
          var n = this.k[t].split(":"),
            r = n[0].replace(/\+/g, " "),
            i = ["n4"];
          if (2 <= n.length) {
            var o, a = n[1];
            if (o = [], a)
              for (var a = a.split(","), s = a.length, u = 0; s > u; u++) {
                var c;
                if (c = a[u], c.match(/^[\w-]+$/))
                  if (c = Q.exec(c.toLowerCase()), null == c) c = "";
                  else {
                    var f;
                    if (f = c[1], null == f || "" == f) f = "4";
                    else {
                      var l = X[f];
                      f = l ? l : isNaN(f) ? "4" : f.substr(0, 1)
                    }
                    c = c[2], c = [null == c || "" == c ? "n" : J[c], f].join("")
                  }
                else c = "";
                c && o.push(c)
              }
            0 < o.length && (i = o), 3 == n.length && (n = n[2], o = [], n = n ? n.split(",") : o, 0 < n.length && (n = Z[n[0]]) && (this.G[r] = n))
          }
          for (this.G[r] || (n = Z[r]) && (this.G[r] = n), n = 0; n < i.length; n += 1) this.W.push(new m(r, i[n]))
        }
      };
      var $ = {
        Arimo: !0,
        Cousine: !0,
        Tinos: !0
      };
      B.prototype.load = function(e) {
        for (var t = this.a, n = new U(this.c.api, l(t), this.c.text), r = this.c.families, i = r.length, o = 0; i > o; o++) {
          var a = r[o].split(":");
          3 == a.length && n.L.push(a.pop());
          var s = "";
          2 == a.length && "" != a[1] && (s = ":"), n.k.push(a.join(s))
        }
        r = new j(r), r.parse(), h(t, n.d()), e(r.W, r.G, $)
      }, z.prototype.A = function(e) {
        var t = this.a;
        return l(this.a) + (this.c.api || "//f.fontdeck.com/s/css/js/") + (t.m.location.hostname || t.D.location.hostname) + "/" + e + ".js"
      }, z.prototype.load = function(e) {
        var t = this.c.id,
          n = this.a.m,
          r = this;
        t ? (n.__webfontfontdeckmodule__ || (n.__webfontfontdeckmodule__ = {}), n.__webfontfontdeckmodule__[t] = function(t, n) {
          for (var i = 0, o = n.fonts.length; o > i; ++i) {
            var a = n.fonts[i];
            r.R.push(new m(a.name, v("font-weight:" + a.weight + ";font-style:" + a.style)))
          }
          e(r.R)
        }, d(this.a, this.A(t), function(t) {
          t && e([])
        })) : e([])
      }, K.prototype.A = function(e) {
        return (this.c.api || "https://use.typekit.net") + "/" + e + ".js"
      }, K.prototype.load = function(e) {
        var t = this.c.id,
          n = this.a.m;
        t ? d(this.a, this.A(t), function(t) {
          if (t) e([]);
          else if (n.Typekit && n.Typekit.config && n.Typekit.config.fn) {
            t = n.Typekit.config.fn;
            for (var r = [], i = 0; i < t.length; i += 2)
              for (var o = t[i], a = t[i + 1], s = 0; s < a.length; s++) r.push(new m(o, a[s]));
            try {
              n.Typekit.load({
                events: !1,
                classes: !1,
                async: !0
              })
            } catch (u) {}
            e(r)
          }
        }, 2e3) : e([])
      }, G.prototype.A = function(e, t) {
        var n = l(this.a),
          r = (this.c.api || "fast.fonts.net/jsapi").replace(/^.*http(s?):(\/\/)?/, "");
        return n + "//" + r + "/" + e + ".js" + (t ? "?v=" + t : "")
      }, G.prototype.load = function(e) {
        var t = this.c.projectId,
          n = this.c.version;
        if (t) {
          var r = this.a.m;
          d(this.a, this.A(t, n), function(n) {
            if (n) e([]);
            else if (r["__mti_fntLst" + t]) {
              n = r["__mti_fntLst" + t]();
              var i = [];
              if (n)
                for (var o = 0; o < n.length; o++) i.push(new m(n[o].fontfamily));
              e(i)
            } else e([])
          }).id = "__MonotypeAPIScript__" + t
        } else e([])
      }, q.prototype.load = function(e) {
        var t, n, r = this.c.urls || [],
          i = this.c.families || [],
          o = this.c.testStrings || {};
        for (t = 0, n = r.length; n > t; t++) h(this.a, r[t]);
        for (r = [], t = 0, n = i.length; n > t; t++) {
          var a = i[t].split(":");
          if (a[1])
            for (var s = a[1].split(","), u = 0; u < s.length; u += 1) r.push(new m(a[0], s[u]));
          else r.push(new m(a[0]))
        }
        e(r, o)
      };
      var ee = new F(window);
      ee.p.t.custom = function(e, t) {
        return new q(t, e)
      }, ee.p.t.fontdeck = function(e, t) {
        return new z(t, e)
      }, ee.p.t.monotype = function(e, t) {
        return new G(t, e)
      }, ee.p.t.typekit = function(e, t) {
        return new K(t, e)
      }, ee.p.t.google = function(e, t) {
        return new B(t, e)
      };
      var te = {
        load: a(ee.load, ee)
      };
      r = function() {
        return te
      }.call(t, n, t, e), !(void 0 !== r && (e.exports = r))
    }()
  },
  354: function(e, t) {
    "use strict";
    t.__esModule = !0, t["default"] = function(e, t) {
      var n = {};
      for (var r in e) t.indexOf(r) >= 0 || Object.prototype.hasOwnProperty.call(e, r) && (n[r] = e[r]);
      return n
    }
  },
  376: function(e, t) {
    e.exports = function(e, t) {
      var n = e.length,
        r = e.indexOf(t) + 1;
      return r > n - 1 && (r = 0), e[r]
    }
  },
  416: function(e, t, n) {
    "use strict";
    var r = n(413)["default"];
    t["default"] = function(e, t, n) {
      for (var i = !0; i;) {
        var o = e,
          a = t,
          s = n;
        i = !1, null === o && (o = Function.prototype);
        var u = r(o, a);
        if (void 0 !== u) {
          if ("value" in u) return u.value;
          var c = u.get;
          if (void 0 === c) return;
          return c.call(s)
        }
        var f = Object.getPrototypeOf(o);
        if (null === f) return;
        e = f, t = a, n = s, i = !0, u = f = void 0
      }
    }, t.__esModule = !0
  },
  417: function(e, t, n) {
    "use strict";
    var r = n(87)["default"],
      i = n(414)["default"];
    t["default"] = function(e, t) {
      if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
      e.prototype = r(t && t.prototype, {
        constructor: {
          value: e,
          enumerable: !1,
          writable: !0,
          configurable: !0
        }
      }), t && (i ? i(e, t) : e.__proto__ = t)
    }, t.__esModule = !0
  },
  418: function(e, t, n) {
    "use strict";

    function r(e) {
      return e && e.__esModule ? e : {
        "default": e
      }
    }
    t.__esModule = !0;
    var i = n(36),
      o = r(i);
    t["default"] = function(e, t) {
      if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      return !t || "object" !== ("undefined" == typeof t ? "undefined" : (0, o["default"])(t)) && "function" != typeof t ? e : t
    }
  },
  462: function(e, t) {
    function n(e) {
      return e.split(";")[0].slice(5)
    }
    e.exports = function(e) {
      for (var t = e.split(",")[1], r = atob(t), i = new ArrayBuffer(r.length), o = new Uint8Array(i), a = 0; a < r.length; a++) o[a] = r.charCodeAt(a);
      return o.type = n(e), o
    }
  },
  463: function(e, t, n) {
    var r;
    (function(i) {
      (function(e, t, n) {
        "use strict";

        function r(e, t) {
          return "object" != typeof t && (t = t()), Object.keys(t).forEach(function(n) {
            e[n] = t[n]
          }), e
        }

        function o(e) {
          return {
            from: function(t) {
              return e.prototype = Object.create(t.prototype), e.prototype.constructor = e, {
                extend: function(n) {
                  r(e.prototype, "object" != typeof n ? n(t.prototype) : n)
                }
              }
            }
          }
        }

        function a(e, t) {
          return t(e)
        }

        function s(e, t) {
          function i() {
            Oe.on("versionchange", function(e) {
              Oe.close(), Oe.on("error").fire(new pe("Database version changed by other database connection."))
            })
          }

          function l(e) {
            this._cfg = {
              version: e,
              storesSource: null,
              dbschema: {},
              tables: {},
              contentUpgrade: null
            }, this.stores({})
          }

          function p(e, t, n, r) {
            if (0 === e) {
              Object.keys(me).forEach(function(e) {
                _(t, e, me[e].primKey, me[e].indexes)
              });
              var i = Oe._createTransaction(Ae, ve, me);
              i.idbtrans = t, i.idbtrans.onerror = M(n, ["populating database"]), i.on("error").subscribe(n), B.newPSD(function() {
                B.PSD.trans = i;
                try {
                  Oe.on("populate").fire(i)
                } catch (e) {
                  r.onerror = t.onerror = function(e) {
                    e.preventDefault()
                  };
                  try {
                    t.abort()
                  } catch (o) {}
                  t.db.close(), n(e)
                }
              })
            } else {
              var o = [],
                s = ge.filter(function(t) {
                  return t._cfg.version === e
                })[0];
              if (!s) throw new pe("Dexie specification of currently installed DB version is missing");
              me = Oe._dbSchema = s._cfg.dbschema;
              var u = !1,
                c = ge.filter(function(t) {
                  return t._cfg.version > e
                });
              c.forEach(function(e) {
                var r = me,
                  i = e._cfg.dbschema;
                ue(r, t), ue(i, t), me = Oe._dbSchema = i;
                var s = w(r, i);
                s.add.forEach(function(e) {
                  o.push(function(t, n) {
                    _(t, e[0], e[1].primKey, e[1].indexes), n()
                  })
                }), s.change.forEach(function(e) {
                  if (e.recreate) throw new pe("Not yet support for changing primary key");
                  o.push(function(t, n) {
                    var r = t.objectStore(e.name);
                    e.add.forEach(function(e) {
                      G(r, e)
                    }), e.change.forEach(function(e) {
                      r.deleteIndex(e.name), G(r, e)
                    }), e.del.forEach(function(e) {
                      r.deleteIndex(e)
                    }), n()
                  })
                }), e._cfg.contentUpgrade && o.push(function(t, r) {
                  u = !0;
                  var o = Oe._createTransaction(Ae, [].slice.call(t.db.objectStoreNames, 0), i);
                  o.idbtrans = t;
                  var s = 0;
                  o._promise = a(o._promise, function(e) {
                    return function(t, n, i) {
                      function o(e) {
                        return function() {
                          e.apply(this, arguments), 0 === --s && r()
                        }
                      }
                      return ++s, e.call(this, t, function(e, t, r) {
                        arguments[0] = o(e), arguments[1] = o(t), n.apply(this, arguments)
                      }, i)
                    }
                  }), t.onerror = M(n, ["running upgrader function for version", e._cfg.version]), o.on("error").subscribe(n), e._cfg.contentUpgrade(o), 0 === s && r()
                }), u && ae() || o.push(function(e, t) {
                  T(i, e), t()
                })
              });
              var f = function() {
                try {
                  o.length ? o.shift()(t, f) : A(me, t)
                } catch (e) {
                  r.onerror = t.onerror = function(e) {
                    e.preventDefault()
                  };
                  try {
                    t.abort()
                  } catch (i) {}
                  t.db.close(), n(e)
                }
              };
              f()
            }
          }

          function w(e, t) {
            var n = {
              del: [],
              add: [],
              change: []
            };
            for (var r in e) t[r] || n.del.push(r);
            for (var r in t) {
              var i = e[r],
                o = t[r];
              if (i) {
                var a = {
                  name: r,
                  def: t[r],
                  recreate: !1,
                  del: [],
                  add: [],
                  change: []
                };
                if (i.primKey.src !== o.primKey.src) a.recreate = !0, n.change.push(a);
                else {
                  var s = i.indexes.reduce(function(e, t) {
                      return e[t.name] = t, e
                    }, {}),
                    u = o.indexes.reduce(function(e, t) {
                      return e[t.name] = t, e
                    }, {});
                  for (var c in s) u[c] || a.del.push(c);
                  for (var c in u) {
                    var f = s[c],
                      l = u[c];
                    f ? f.src !== l.src && a.change.push(l) : a.add.push(l)
                  }(a.recreate || a.del.length > 0 || a.add.length > 0 || a.change.length > 0) && n.change.push(a)
                }
              } else n.add.push([r, o])
            }
            return n
          }

          function _(e, t, n, r) {
            var i = e.db.createObjectStore(t, n.keyPath ? {
              keyPath: n.keyPath,
              autoIncrement: n.auto
            } : {
              autoIncrement: n.auto
            });
            return r.forEach(function(e) {
              G(i, e)
            }), i
          }

          function A(e, t) {
            Object.keys(e).forEach(function(n) {
              t.db.objectStoreNames.contains(n) || _(t, n, e[n].primKey, e[n].indexes)
            })
          }

          function T(e, t) {
            for (var r = 0; r < t.db.objectStoreNames.length; ++r) {
              var i = t.db.objectStoreNames[r];
              null !== e[i] && e[i] !== n || t.db.deleteObjectStore(i)
            }
          }

          function G(e, t) {
            e.createIndex(t.name, t.keyPath, {
              unique: t.unique,
              multiEntry: t.multi
            })
          }

          function q(e, t) {
            throw new pe("Table " + t[0] + " not part of transaction. Original Scope Function Source: " + s.Promise.PSD.trans.scopeFunc.toString())
          }

          function V(e, t, n, r) {
            this.name = e, this.schema = n, this.hook = be[e] ? be[e].hook : b(null, {
              creating: [h, u],
              reading: [f, c],
              updating: [d, u],
              deleting: [g, u]
            }), this._tpf = t, this._collClass = r || Z
          }

          function H(e, t, n, r) {
            V.call(this, e, t, n, r || X)
          }

          function W(e, t, n, r) {
            function i(e, t, n, r) {
              return o._promise(e, n, r)
            }
            var o = this;
            this.db = Oe, this.mode = e, this.storeNames = t, this.idbtrans = null, this.on = b(this, ["complete", "error"], "abort"), this._reculock = 0, this._blockedFuncs = [], this._psd = null, this.active = !0, this._dbschema = n, r && (this.parent = r), this._tpf = i, this.tables = Object.create(we);
            for (var a = t.length - 1; - 1 !== a; --a) {
              var s = t[a],
                u = Oe._tableFactory(e, n[s], i);
              this.tables[s] = u, this[s] || (this[s] = u)
            }
          }

          function Y(e, t, n) {
            this._ctx = {
              table: e,
              index: ":id" === t ? null : t,
              collClass: e._collClass,
              or: n
            }
          }

          function Z(e, t) {
            var n = null,
              r = null;
            if (t) try {
              n = t()
            } catch (i) {
              r = i
            }
            var o = e._ctx;
            this._ctx = {
              table: o.table,
              index: o.index,
              isPrimKey: !o.index || o.table.schema.primKey.keyPath && o.index === o.table.schema.primKey.name,
              range: n,
              op: "openCursor",
              dir: "next",
              unique: "",
              algorithm: null,
              filter: null,
              isMatch: null,
              offset: 0,
              limit: 1 / 0,
              error: r,
              or: o.or
            }
          }

          function X() {
            Z.apply(this, arguments)
          }

          function J(e, t) {
            return e._cfg.version - t._cfg.version
          }

          function Q(e, t, n, r, i, o) {
            n.forEach(function(n) {
              var a = Oe._tableFactory(r, i[n], t);
              e.forEach(function(e) {
                e[n] || (o ? Object.defineProperty(e, n, {
                  configurable: !0,
                  enumerable: !0,
                  get: function() {
                    var e = B.PSD && B.PSD.trans;
                    return e && e.db === Oe ? e.tables[n] : a
                  }
                }) : e[n] = a)
              })
            })
          }

          function $(e) {
            e.forEach(function(e) {
              for (var t in e) e[t] instanceof V && delete e[t]
            })
          }

          function ee(e, t, n, r, i, o) {
            var a = B.PSD;
            o = o || c, e.onerror || (e.onerror = M(i)), t ? e.onsuccess = k(function(a) {
              var s = e.result;
              if (s) {
                var u = function() {
                  s["continue"]()
                };
                t(s, function(e) {
                  u = e
                }, r, i) && n(o(s.value), s, function(e) {
                  u = e
                }), u()
              } else r()
            }, i, a) : e.onsuccess = k(function(t) {
              var i = e.result;
              if (i) {
                var a = function() {
                  i["continue"]()
                };
                n(o(i.value), i, function(e) {
                  a = e
                }), a()
              } else r()
            }, i, a)
          }

          function te(e) {
            var t = [];
            return e.split(",").forEach(function(e) {
              e = e.trim();
              var n = e.replace("&", "").replace("++", "").replace("*", ""),
                r = 0 !== n.indexOf("[") ? n : e.substring(e.indexOf("[") + 1, e.indexOf("]")).split("+");
              t.push(new F(n, r || null, -1 !== e.indexOf("&"), -1 !== e.indexOf("*"), -1 !== e.indexOf("++"), Array.isArray(r), -1 !== r.indexOf(".")))
            }), t
          }

          function ne(e, t) {
            return t > e ? -1 : e > t ? 1 : 0
          }

          function re(e, t) {
            return t > e ? 1 : e > t ? -1 : 0
          }

          function ie(e) {
            return function(t, n) {
              for (var r = 0;;) {
                var i = e(t[r], n[r]);
                if (0 !== i) return i;
                if (++r, r === t.length || r === n.length) return e(t.length, n.length)
              }
            }
          }

          function oe(e, t) {
            return e ? t ? function() {
              return e.apply(this, arguments) && t.apply(this, arguments)
            } : e : t
          }

          function ae() {
            return navigator.userAgent.indexOf("Trident") >= 0 || navigator.userAgent.indexOf("MSIE") >= 0
          }

          function se() {
            if (Oe.verno = ye.version / 10, Oe._dbSchema = me = {}, ve = [].slice.call(ye.objectStoreNames, 0), 0 !== ve.length) {
              var e = ye.transaction(U(ve), "readonly");
              ve.forEach(function(t) {
                for (var n = e.objectStore(t), r = n.keyPath, i = r && "string" == typeof r && -1 !== r.indexOf("."), o = new F(r, r || "", !1, !1, !!n.autoIncrement, r && "string" != typeof r, i), a = [], s = 0; s < n.indexNames.length; ++s) {
                  var u = n.index(n.indexNames[s]);
                  r = u.keyPath, i = r && "string" == typeof r && -1 !== r.indexOf(".");
                  var c = new F(u.name, r, !!u.unique, !!u.multiEntry, !1, r && "string" != typeof r, i);
                  a.push(c)
                }
                me[t] = new R(t, o, a, {})
              }), Q([be], Oe._transPromiseFactory, Object.keys(me), Ae, me)
            }
          }

          function ue(e, t) {
            for (var n = t.db.objectStoreNames, r = 0; r < n.length; ++r)
              for (var i = n[r], o = t.objectStore(i), a = 0; a < o.indexNames.length; ++a) {
                var s = o.indexNames[a],
                  u = o.index(s).keyPath,
                  c = "string" == typeof u ? u : "[" + [].slice.call(u).join("+") + "]";
                if (e[i]) {
                  var f = e[i].idxByName[c];
                  f && (f.name = s)
                }
              }
          }
          var ce = t && t.addons || s.addons,
            fe = s.dependencies,
            le = fe.indexedDB,
            he = fe.IDBKeyRange,
            de = (fe.IDBTransaction, fe.DOMError, fe.TypeError),
            pe = fe.Error,
            me = this._dbSchema = {},
            ge = [],
            ve = [],
            be = {},
            we = {},
            ye = null,
            _e = !0,
            ke = null,
            xe = !1,
            Se = "readonly",
            Ae = "readwrite",
            Oe = this,
            Pe = [],
            Ee = !0,
            Te = !!j();
          this.version = function(e) {
            if (ye) throw new pe("Cannot add version when database is open");
            this.verno = Math.max(this.verno, e);
            var t = ge.filter(function(t) {
              return t._cfg.version === e
            })[0];
            return t ? t : (t = new l(e), ge.push(t), ge.sort(J), t)
          }, r(l.prototype, {
            stores: function(e) {
              this._cfg.storesSource = this._cfg.storesSource ? r(this._cfg.storesSource, e) : e;
              var t = {};
              ge.forEach(function(e) {
                r(t, e._cfg.storesSource)
              });
              var n = this._cfg.dbschema = {};
              return this._parseStoresSpec(t, n), me = Oe._dbSchema = n, $([be, Oe, we]), Q([we], q, Object.keys(n), Ae, n), Q([be, Oe, this._cfg.tables], Oe._transPromiseFactory, Object.keys(n), Ae, n, !0), ve = Object.keys(n), this
            },
            upgrade: function(e) {
              var t = this;
              return z(function() {
                e(Oe._createTransaction(Ae, Object.keys(t._cfg.dbschema), t._cfg.dbschema))
              }), this._cfg.contentUpgrade = e, this
            },
            _parseStoresSpec: function(e, t) {
              Object.keys(e).forEach(function(n) {
                if (null !== e[n]) {
                  var r = {},
                    i = te(e[n]),
                    o = i.shift();
                  if (o.multi) throw new pe("Primary key cannot be multi-valued");
                  o.keyPath && S(r, o.keyPath, o.auto ? 0 : o.keyPath), i.forEach(function(e) {
                    if (e.auto) throw new pe("Only primary key can be marked as autoIncrement (++)");
                    if (!e.keyPath) throw new pe("Index must have a name and cannot be an empty string");
                    S(r, e.keyPath, e.compound ? e.keyPath.map(function() {
                      return ""
                    }) : "")
                  }), t[n] = new R(n, o, i, r)
                }
              })
            }
          }), this._allTables = be, this._tableFactory = function(e, t, n) {
            return e === Se ? new V(t.name, n, t, Z) : new H(t.name, n, t)
          }, this._createTransaction = function(e, t, n, r) {
            return new W(e, t, n, r)
          }, this._transPromiseFactory = function(e, t, n) {
            if (!_e || B.PSD && B.PSD.letThrough) {
              var r = Oe._createTransaction(e, t, me);
              return r._promise(e, function(e, t) {
                r.error(function(e) {
                  Oe.on("error").fire(e)
                }), n(function(t) {
                  r.complete(function() {
                    e(t)
                  })
                }, t, r)
              })
            }
            var i = new B(function(r, o) {
              Pe.push({
                resume: function() {
                  var a = Oe._transPromiseFactory(e, t, n);
                  i.onuncatched = a.onuncatched, a.then(r, o)
                }
              })
            });
            return i
          }, this._whenReady = function(e) {
            return new B(K || !_e || B.PSD && B.PSD.letThrough ? e : function(t, n) {
              Pe.push({
                resume: function() {
                  e(t, n)
                }
              })
            })
          }, this.verno = 0, this.open = function() {
            return new B(function(t, n) {
              function r(e) {
                try {
                  i.transaction.abort()
                } catch (t) {}
                xe = !1, ke = e, _e = !1, n(ke), Pe.forEach(function(e) {
                  e.resume()
                }), Pe = []
              }
              if (K && t(Oe), ye || xe) throw new pe("Database already opened or being opened");
              var i, o = !1;
              try {
                if (ke = null, xe = !0, ge.length > 0 && (Ee = !1), !le) throw new pe("indexedDB API not found. If using IE10+, make sure to run your code on a server URL (not locally). If using Safari, make sure to include indexedDB polyfill.");
                if (i = Ee ? le.open(e) : le.open(e, Math.round(10 * Oe.verno)), !i) throw new pe("IndexedDB API not available");
                i.onerror = M(r, ["opening database", e]), i.onblocked = function(e) {
                  Oe.on("blocked").fire(e)
                }, i.onupgradeneeded = k(function(t) {
                  if (Ee && !Oe._allowEmptyDB) {
                    i.onerror = function(e) {
                      e.preventDefault()
                    }, i.transaction.abort(), i.result.close();
                    var n = le.deleteDatabase(e);
                    n.onsuccess = n.onerror = function() {
                      r(new pe("Database '" + e + "' doesnt exist"))
                    }
                  } else {
                    0 === t.oldVersion && (o = !0), i.transaction.onerror = M(r);
                    var a = t.oldVersion > Math.pow(2, 62) ? 0 : t.oldVersion;
                    p(a / 10, i.transaction, r, i)
                  }
                }, r), i.onsuccess = k(function(n) {
                  xe = !1, ye = i.result, Ee ? se() : ye.objectStoreNames.length > 0 && ue(me, ye.transaction(U(ye.objectStoreNames), Se)), ye.onversionchange = Oe.on("versionchange").fire, Te || L(function(t) {
                    return -1 === t.indexOf(e) ? t.push(e) : void 0
                  }), B.newPSD(function() {
                    function e() {
                      _e = !1, Pe.forEach(function(e) {
                        e.resume();
                      }), Pe = [], t(Oe)
                    }
                    B.PSD.letThrough = !0;
                    try {
                      var n = Oe.on.ready.fire();
                      n && "function" == typeof n.then ? n.then(e, function(e) {
                        ye.close(), ye = null, r(e)
                      }) : y(e)
                    } catch (i) {
                      r(i)
                    }
                  })
                }, r)
              } catch (a) {
                r(a)
              }
            })
          }, this.close = function() {
            ye && (ye.close(), ye = null, _e = !0, ke = null)
          }, this["delete"] = function() {
            var t = arguments;
            return new B(function(n, r) {
              function i() {
                Oe.close();
                var t = le.deleteDatabase(e);
                t.onsuccess = function() {
                  Te || L(function(t) {
                    var n = t.indexOf(e);
                    return n >= 0 ? t.splice(n, 1) : void 0
                  }), n()
                }, t.onerror = M(r, ["deleting", e]), t.onblocked = function() {
                  Oe.on("blocked").fire()
                }
              }
              if (t.length > 0) throw new pe("Arguments not allowed in db.delete()");
              xe ? Pe.push({
                resume: i
              }) : i()
            })
          }, this.backendDB = function() {
            return ye
          }, this.isOpen = function() {
            return null !== ye
          }, this.hasFailed = function() {
            return null !== ke
          }, this.dynamicallyOpened = function() {
            return Ee
          }, this.name = e, Object.defineProperty(this, "tables", {
            get: function() {
              return Object.keys(be).map(function(e) {
                return be[e]
              })
            }
          }), this.on = b(this, "error", "populate", "blocked", {
            ready: [v, u],
            versionchange: [m, u]
          }), this.on.ready.subscribe = a(this.on.ready.subscribe, function(e) {
            return function(t, n) {
              function r() {
                return n || Oe.on.ready.unsubscribe(r), t.apply(this, arguments)
              }
              e.call(this, r), Oe.isOpen() && (_e ? Pe.push({
                resume: r
              }) : r())
            }
          }), z(function() {
            Oe.on("populate").fire(Oe._createTransaction(Ae, ve, me)), Oe.on("error").fire(new pe)
          }), this.transaction = function(e, t, n) {
            function r(t, r) {
              var o = null;
              try {
                if (u) throw u;
                o = Oe._createTransaction(e, c, me, i);
                var s = c.map(function(e) {
                  return o.tables[e]
                });
                s.push(o);
                var f, l = 0;
                B.newPSD(function() {
                  B.PSD.trans = o, o.scopeFunc = n, i && (o.idbtrans = i.idbtrans, o._promise = a(o._promise, function(e) {
                    return function(t, n, r) {
                      function i(e) {
                        return function(t) {
                          var n;
                          return B._rootExec(function() {
                            n = e(t), B._tickFinalize(function() {
                              0 === --l && o.active && (o.active = !1, o.on.complete.fire())
                            })
                          }), n
                        }
                      }
                      return ++l, e.call(this, t, function(e, t, r) {
                        return n(i(e), i(t), r)
                      }, r)
                    }
                  })), o.complete(function() {
                    t(f)
                  }), o.error(function(e) {
                    o.idbtrans && (o.idbtrans.onerror = I);
                    try {
                      o.abort()
                    } catch (t) {}
                    i && (i.active = !1, i.on.error.fire(e));
                    var n = r(e);
                    i || n || Oe.on.error.fire(e)
                  }), B._rootExec(function() {
                    f = n.apply(o, s)
                  })
                }), (!o.idbtrans || i && 0 === l) && o._nop()
              } catch (h) {
                o && o.idbtrans && (o.idbtrans.onerror = I), o && o.abort(), i && i.on.error.fire(h), y(function() {
                  r(h) || Oe.on("error").fire(h)
                })
              }
            }
            t = [].slice.call(arguments, 1, arguments.length - 1), n = arguments[arguments.length - 1];
            var i = B.PSD && B.PSD.trans;
            i && i.db === Oe && -1 === e.indexOf("!") || (i = null);
            var o = -1 !== e.indexOf("?");
            e = e.replace("!", "").replace("?", "");
            var s = Array.isArray(t[0]) ? t.reduce(function(e, t) {
                return e.concat(t)
              }) : t,
              u = null,
              c = s.map(function(e) {
                return "string" == typeof e ? e : (e instanceof V || (u = u || new de("Invalid type. Arguments following mode must be instances of Table or String")), e.name)
              });
            return "r" == e || e == Se ? e = Se : "rw" == e || e == Ae ? e = Ae : u = new pe("Invalid transaction mode: " + e), i && (u || (i && i.mode === Se && e === Ae && (o ? i = null : u = u || new pe("Cannot enter a sub-transaction with READWRITE mode when parent transaction is READONLY")), i && c.forEach(function(e) {
              i.tables.hasOwnProperty(e) || (o ? i = null : u = u || new pe("Table " + e + " not included in parent transaction. Parent Transaction function: " + i.scopeFunc.toString()))
            }))), i ? i._promise(e, r, "lock") : Oe._whenReady(r)
          }, this.table = function(e) {
            if (K && Ee) return new H(e);
            if (!be.hasOwnProperty(e)) throw new pe("Table does not exist");
            return be[e]
          }, r(V.prototype, function() {
            function e() {
              throw new pe("Current Transaction is READONLY")
            }
            return {
              _trans: function(e, t, n) {
                return this._tpf(e, [this.name], t, n)
              },
              _idbstore: function(e, t, n) {
                if (K) return new B(t);
                var r = this;
                return this._tpf(e, [this.name], function(e, n, i) {
                  t(e, n, i.idbtrans.objectStore(r.name), i)
                }, n)
              },
              get: function(e, t) {
                var n = this;
                return this._idbstore(Se, function(t, r, i) {
                  K && t(n.schema.instanceTemplate);
                  var o = i.get(e);
                  o.onerror = M(r, ["getting", e, "from", n.name]), o.onsuccess = function() {
                    t(n.hook.reading.fire(o.result))
                  }
                }).then(t)
              },
              where: function(e) {
                return new Y(this, e)
              },
              count: function(e) {
                return this.toCollection().count(e)
              },
              offset: function(e) {
                return this.toCollection().offset(e)
              },
              limit: function(e) {
                return this.toCollection().limit(e)
              },
              reverse: function() {
                return this.toCollection().reverse()
              },
              filter: function(e) {
                return this.toCollection().and(e)
              },
              each: function(e) {
                var t = this;
                return K && e(t.schema.instanceTemplate), this._idbstore(Se, function(n, r, i) {
                  var o = i.openCursor();
                  o.onerror = M(r, ["calling", "Table.each()", "on", t.name]), ee(o, null, e, n, r, t.hook.reading.fire)
                })
              },
              toArray: function(e) {
                var t = this;
                return this._idbstore(Se, function(e, n, r) {
                  K && e([t.schema.instanceTemplate]);
                  var i = [],
                    o = r.openCursor();
                  o.onerror = M(n, ["calling", "Table.toArray()", "on", t.name]), ee(o, null, function(e) {
                    i.push(e)
                  }, function() {
                    e(i)
                  }, n, t.hook.reading.fire)
                }).then(e)
              },
              orderBy: function(e) {
                return new this._collClass(new Y(this, e))
              },
              toCollection: function() {
                return new this._collClass(new Y(this))
              },
              mapToClass: function(e, t) {
                this.schema.mappedClass = e;
                var n = Object.create(e.prototype);
                t && C(n, t), this.schema.instanceTemplate = n;
                var r = function(t) {
                  if (!t) return t;
                  var n = Object.create(e.prototype);
                  for (var r in t) t.hasOwnProperty(r) && (n[r] = t[r]);
                  return n
                };
                return this.schema.readHook && this.hook.reading.unsubscribe(this.schema.readHook), this.schema.readHook = r, this.hook("reading", r), e
              },
              defineClass: function(e) {
                return this.mapToClass(s.defineClass(e), e)
              },
              add: e,
              put: e,
              "delete": e,
              clear: e,
              update: e
            }
          }), o(H).from(V).extend(function() {
            return {
              add: function(e, t) {
                var r = this,
                  i = this.hook.creating.fire;
                return this._idbstore(Ae, function(o, a, s, c) {
                  var f = {};
                  if (i !== u) {
                    var l = t || (s.keyPath ? x(e, s.keyPath) : n),
                      h = i.call(f, l, e, c);
                    l === n && h !== n && (s.keyPath ? S(e, s.keyPath, h) : t = h)
                  }
                  var d = t ? s.add(e, t) : s.add(e);
                  d.onerror = M(function(e) {
                    return f.onerror && f.onerror(e), a(e)
                  }, ["adding", e, "into", r.name]), d.onsuccess = function(t) {
                    var n = s.keyPath;
                    n && S(e, n, t.target.result), f.onsuccess && f.onsuccess(t.target.result), o(d.result)
                  }
                })
              },
              put: function(e, t) {
                var r = this,
                  i = this.hook.creating.fire,
                  o = this.hook.updating.fire;
                return i !== u || o !== u ? this._trans(Ae, function(i, o, a) {
                  var s = t || r.schema.primKey.keyPath && x(e, r.schema.primKey.keyPath);
                  s === n ? a.tables[r.name].add(e).then(i, o) : (a._lock(), e = P(e), a.tables[r.name].where(":id").equals(s).modify(function(t) {
                    this.value = e
                  }).then(function(n) {
                    return 0 === n ? a.tables[r.name].add(e, t) : s
                  })["finally"](function() {
                    a._unlock()
                  }).then(i, o))
                }) : this._idbstore(Ae, function(n, i, o) {
                  var a = t ? o.put(e, t) : o.put(e);
                  a.onerror = M(i, ["putting", e, "into", r.name]), a.onsuccess = function(t) {
                    var r = o.keyPath;
                    r && S(e, r, t.target.result), n(a.result)
                  }
                })
              },
              "delete": function(e) {
                return this.hook.deleting.subscribers.length ? this.where(":id").equals(e)["delete"]() : this._idbstore(Ae, function(t, n, r) {
                  var i = r["delete"](e);
                  i.onerror = M(n, ["deleting", e, "from", r.name]), i.onsuccess = function(e) {
                    t(i.result)
                  }
                })
              },
              clear: function() {
                return this.hook.deleting.subscribers.length ? this.toCollection()["delete"]() : this._idbstore(Ae, function(e, t, n) {
                  var r = n.clear();
                  r.onerror = M(t, ["clearing", n.name]), r.onsuccess = function(t) {
                    e(r.result)
                  }
                })
              },
              update: function(e, t) {
                if ("object" != typeof t || Array.isArray(t)) throw new pe("db.update(keyOrObject, modifications). modifications must be an object.");
                if ("object" != typeof e || Array.isArray(e)) return this.where(":id").equals(e).modify(t);
                Object.keys(t).forEach(function(n) {
                  S(e, n, t[n])
                });
                var r = x(e, this.schema.primKey.keyPath);
                return r === n && B.reject(new pe("Object does not contain its primary key")), this.where(":id").equals(r).modify(t)
              }
            }
          }), r(W.prototype, {
            _lock: function() {
              return ++this._reculock, 1 === this._reculock && B.PSD && (B.PSD.lockOwnerFor = this), this
            },
            _unlock: function() {
              if (0 === --this._reculock)
                for (B.PSD && (B.PSD.lockOwnerFor = null); this._blockedFuncs.length > 0 && !this._locked();) {
                  var e = this._blockedFuncs.shift();
                  try {
                    e()
                  } catch (t) {}
                }
              return this
            },
            _locked: function() {
              return this._reculock && (!B.PSD || B.PSD.lockOwnerFor !== this)
            },
            _nop: function(e) {
              this.tables[this.storeNames[0]].get(0).then(e)
            },
            _promise: function(e, t, n) {
              var r = this;
              return B.newPSD(function() {
                var i;
                return r._locked() ? i = new B(function(i, o) {
                  r._blockedFuncs.push(function() {
                    r._promise(e, t, n).then(i, o)
                  })
                }) : (i = r.active ? new B(function(i, o) {
                  if (!r.idbtrans && e) {
                    if (!ye) throw new pe(ke ? "Database not open. Following error in populate, ready or upgrade function made Dexie.open() fail: " + ke : "Database not open");
                    var a = r.idbtrans = ye.transaction(U(r.storeNames), r.mode);
                    a.onerror = function(e) {
                      r.on("error").fire(e && e.target.error), e.preventDefault(), r.abort()
                    }, a.onabort = function(e) {
                      y(function() {
                        r.on("error").fire(new pe("Transaction aborted for unknown reason"))
                      }), r.active = !1, r.on("abort").fire(e)
                    }, a.oncomplete = function(e) {
                      r.active = !1, r.on("complete").fire(e)
                    }
                  }
                  n && r._lock();
                  try {
                    t(i, o, r)
                  } catch (u) {
                    s.ignoreTransaction(function() {
                      r.on("error").fire(u)
                    }), r.abort(), o(u)
                  }
                }) : B.reject(D(new pe("Transaction is inactive. Original Scope Function Source: " + r.scopeFunc.toString()))), r.active && n && i["finally"](function() {
                  r._unlock()
                })), i.onuncatched = function(e) {
                  s.ignoreTransaction(function() {
                    r.on("error").fire(e)
                  }), r.abort()
                }, i
              })
            },
            complete: function(e) {
              return this.on("complete", e)
            },
            error: function(e) {
              return this.on("error", e)
            },
            abort: function() {
              if (this.idbtrans && this.active) try {
                this.active = !1, this.idbtrans.abort(), this.on.error.fire(new pe("Transaction Aborted"))
              } catch (e) {}
            },
            table: function(e) {
              if (!this.tables.hasOwnProperty(e)) throw new pe("Table " + e + " not in transaction");
              return this.tables[e]
            }
          }), r(Y.prototype, function() {
            function e(e, t) {
              try {
                throw t
              } catch (n) {
                e._ctx.error = n
              }
              return e
            }

            function t(e) {
              return Array.prototype.slice.call(1 === e.length && Array.isArray(e[0]) ? e[0] : e)
            }

            function n(e) {
              return "next" === e ? function(e) {
                return e.toUpperCase()
              } : function(e) {
                return e.toLowerCase()
              }
            }

            function r(e) {
              return "next" === e ? function(e) {
                return e.toLowerCase()
              } : function(e) {
                return e.toUpperCase()
              }
            }

            function i(e, t, n, r, i, o) {
              for (var a = Math.min(e.length, r.length), s = -1, u = 0; a > u; ++u) {
                var c = t[u];
                if (c !== r[u]) return i(e[u], n[u]) < 0 ? e.substr(0, u) + n[u] + n.substr(u + 1) : i(e[u], r[u]) < 0 ? e.substr(0, u) + r[u] + n.substr(u + 1) : s >= 0 ? e.substr(0, s) + t[s] + n.substr(s + 1) : null;
                i(e[u], c) < 0 && (s = u)
              }
              return a < r.length && "next" === o ? e + n.substr(e.length) : a < e.length && "prev" === o ? e.substr(0, n.length) : 0 > s ? null : e.substr(0, s) + r[s] + n.substr(s + 1)
            }

            function o(e, t, o) {
              function a(e) {
                s = n(e), u = r(e), c = "next" === e ? ne : re, f = s(o), l = u(o), h = e
              }
              var s, u, c, f, l, h;
              a("next"), e._ondirectionchange = function(e) {
                a(e)
              }, e._addAlgorithm(function(e, n, r) {
                var o = e.key;
                if ("string" != typeof o) return !1;
                var a = u(o);
                if (t(a, l)) return n(function() {
                  e["continue"]()
                }), !0;
                var s = i(o, a, f, l, c, h);
                return n(s ? function() {
                  e["continue"](s)
                } : r), !1
              })
            }
            return {
              between: function(e, t, n, r) {
                return n = n !== !1, r = r === !0, e > t || e === t && (n || r) && (!n || !r) ? new this._ctx.collClass(this, function() {
                  return he.only(e)
                }).limit(0) : new this._ctx.collClass(this, function() {
                  return he.bound(e, t, !n, !r)
                })
              },
              equals: function(e) {
                return new this._ctx.collClass(this, function() {
                  return he.only(e)
                })
              },
              above: function(e) {
                return new this._ctx.collClass(this, function() {
                  return he.lowerBound(e, !0)
                })
              },
              aboveOrEqual: function(e) {
                return new this._ctx.collClass(this, function() {
                  return he.lowerBound(e)
                })
              },
              below: function(e) {
                return new this._ctx.collClass(this, function() {
                  return he.upperBound(e, !0)
                })
              },
              belowOrEqual: function(e) {
                return new this._ctx.collClass(this, function() {
                  return he.upperBound(e)
                })
              },
              startsWith: function(t) {
                return "string" != typeof t ? e(new this._ctx.collClass(this), new de("String expected")) : this.between(t, t + String.fromCharCode(65535), !0, !0)
              },
              startsWithIgnoreCase: function(t) {
                if ("string" != typeof t) return e(new this._ctx.collClass(this), new de("String expected"));
                if ("" === t) return this.startsWith(t);
                var n = new this._ctx.collClass(this, function() {
                  return he.bound(t.toUpperCase(), t.toLowerCase() + String.fromCharCode(65535))
                });
                return o(n, function(e, t) {
                  return 0 === e.indexOf(t)
                }, t), n._ondirectionchange = function() {
                  e(n, new pe("reverse() not supported with WhereClause.startsWithIgnoreCase()"))
                }, n
              },
              equalsIgnoreCase: function(t) {
                if ("string" != typeof t) return e(new this._ctx.collClass(this), new de("String expected"));
                var n = new this._ctx.collClass(this, function() {
                  return he.bound(t.toUpperCase(), t.toLowerCase())
                });
                return o(n, function(e, t) {
                  return e === t
                }, t), n
              },
              anyOf: function(e) {
                var n = this._ctx,
                  r = n.table.schema,
                  i = n.index ? r.idxByName[n.index] : r.primKey,
                  o = i && i.compound,
                  a = t(arguments),
                  s = o ? ie(ne) : ne;
                if (a.sort(s), 0 === a.length) return new this._ctx.collClass(this, function() {
                  return he.only("")
                }).limit(0);
                var u = new this._ctx.collClass(this, function() {
                  return he.bound(a[0], a[a.length - 1])
                });
                u._ondirectionchange = function(e) {
                  s = "next" === e ? ne : re, o && (s = ie(s)), a.sort(s)
                };
                var c = 0;
                return u._addAlgorithm(function(e, t, n) {
                  for (var r = e.key; s(r, a[c]) > 0;)
                    if (++c, c === a.length) return t(n), !1;
                  return 0 === s(r, a[c]) ? (t(function() {
                    e["continue"]()
                  }), !0) : (t(function() {
                    e["continue"](a[c])
                  }), !1)
                }), u
              },
              notEqual: function(e) {
                return this.below(e).or(this._ctx.index).above(e)
              },
              noneOf: function(e) {
                var n = this._ctx,
                  r = n.table.schema,
                  i = n.index ? r.idxByName[n.index] : r.primKey,
                  o = i && i.compound,
                  a = t(arguments);
                if (0 === a.length) return new this._ctx.collClass(this);
                var s = o ? ie(ne) : ne;
                a.sort(s);
                var u = a.reduce(function(e, t) {
                  return e ? e.concat([
                    [e[e.length - 1][1], t]
                  ]) : [
                    [null, t]
                  ]
                }, null);
                u.push([a[a.length - 1], null]);
                var c = this,
                  f = n.index;
                return u.reduce(function(e, t) {
                  return e ? null === t[1] ? e.or(f).above(t[0]) : e.or(f).between(t[0], t[1], !1, !1) : c.below(t[1])
                }, null)
              },
              startsWithAnyOf: function(n) {
                function r(e) {
                  return e > s[c]
                }

                function i(e) {
                  return e < a[c]
                }
                var o = this._ctx,
                  a = t(arguments);
                if (!a.every(function(e) {
                    return "string" == typeof e
                  })) return e(new o.collClass(this), new de("startsWithAnyOf() only works with strings"));
                if (0 === a.length) return new o.collClass(this, function() {
                  return he.only("")
                }).limit(0);
                var s = a.map(function(e) {
                    return e + String.fromCharCode(65535)
                  }),
                  u = ne;
                a.sort(u);
                var c = 0,
                  f = r,
                  l = new o.collClass(this, function() {
                    return he.bound(a[0], a[a.length - 1] + String.fromCharCode(65535))
                  });
                return l._ondirectionchange = function(e) {
                  "next" === e ? (f = r, u = ne) : (f = i, u = re), a.sort(u), s.sort(u)
                }, l._addAlgorithm(function(e, t, n) {
                  for (var r = e.key; f(r);)
                    if (++c, c === a.length) return t(n), !1;
                  return r >= a[c] && r <= s[c] ? (t(function() {
                    e["continue"]()
                  }), !0) : (t(function() {
                    u === ne ? e["continue"](a[c]) : e["continue"](s[c])
                  }), !1)
                }), l
              }
            }
          }), r(Z.prototype, function() {
            function e(e, t) {
              e.filter = oe(e.filter, t)
            }

            function t(e, t) {
              e.isMatch = oe(e.isMatch, t)
            }

            function n(e, t) {
              if (e.isPrimKey) return t;
              var n = e.table.schema.idxByName[e.index];
              if (!n) throw new pe("KeyPath " + e.index + " on object store " + t.name + " is not indexed");
              return e.isPrimKey ? t : t.index(n.name)
            }

            function r(e, t) {
              return n(e, t)[e.op](e.range || null, e.dir + e.unique)
            }

            function i(e, t, n, i, o) {
              e.or ? ! function() {
                function a() {
                  2 === ++f && n()
                }

                function s(e, n, r) {
                  if (!u || u(n, r, a, i)) {
                    var o = n.primaryKey.toString();
                    c.hasOwnProperty(o) || (c[o] = !0, t(e, n, r))
                  }
                }
                var u = e.filter,
                  c = {},
                  f = (e.table.schema.primKey.keyPath, 0);
                e.or._iterate(s, a, i, o), ee(r(e, o), e.algorithm, s, a, i, e.table.hook.reading.fire)
              }() : ee(r(e, o), oe(e.algorithm, e.filter), t, n, i, e.table.hook.reading.fire)
            }

            function o(e) {
              return e.table.schema.instanceTemplate
            }
            return {
              _read: function(e, t) {
                var n = this._ctx;
                return n.error ? n.table._trans(null, function(e, t) {
                  t(n.error)
                }) : n.table._idbstore(Se, e).then(t)
              },
              _write: function(e) {
                var t = this._ctx;
                return t.error ? t.table._trans(null, function(e, n) {
                  n(t.error)
                }) : t.table._idbstore(Ae, e, "locked")
              },
              _addAlgorithm: function(e) {
                var t = this._ctx;
                t.algorithm = oe(t.algorithm, e)
              },
              _iterate: function(e, t, n, r) {
                return i(this._ctx, e, t, n, r)
              },
              each: function(e) {
                var t = this._ctx;
                return K && e(o(t)), this._read(function(n, r, o) {
                  i(t, e, n, r, o)
                })
              },
              count: function(e) {
                if (K) return B.resolve(0).then(e);
                var t = this,
                  r = this._ctx;
                if (r.filter || r.algorithm || r.or) {
                  var o = 0;
                  return this._read(function(e, t, n) {
                    i(r, function() {
                      return ++o, !1
                    }, function() {
                      e(o)
                    }, t, n)
                  }, e)
                }
                return this._read(function(e, i, o) {
                  var a = n(r, o),
                    s = r.range ? a.count(r.range) : a.count();
                  s.onerror = M(i, ["calling", "count()", "on", t.name]), s.onsuccess = function(t) {
                    e(Math.min(t.target.result, Math.max(0, r.limit - r.offset)))
                  }
                }, e)
              },
              sortBy: function(e, t) {
                function n(e, t) {
                  return t ? n(e[i[t]], t - 1) : e[o]
                }

                function r(e, t) {
                  var r = n(e, a),
                    i = n(t, a);
                  return i > r ? -s : r > i ? s : 0
                }
                var i = (this._ctx, e.split(".").reverse()),
                  o = i[0],
                  a = i.length - 1,
                  s = "next" === this._ctx.dir ? 1 : -1;
                return this.toArray(function(e) {
                  return e.sort(r)
                }).then(t)
              },
              toArray: function(e) {
                var t = this._ctx;
                return this._read(function(e, n, r) {
                  K && e([o(t)]);
                  var a = [];
                  i(t, function(e) {
                    a.push(e)
                  }, function() {
                    e(a)
                  }, n, r)
                }, e)
              },
              offset: function(t) {
                var n = this._ctx;
                return 0 >= t ? this : (n.offset += t, n.or || n.algorithm || n.filter ? e(n, function(e, n, r) {
                  return --t < 0
                }) : e(n, function(e, n, r) {
                  return 0 === t ? !0 : 1 === t ? (--t, !1) : (n(function() {
                    e.advance(t), t = 0
                  }), !1)
                }), this)
              },
              limit: function(t) {
                return this._ctx.limit = Math.min(this._ctx.limit, t), e(this._ctx, function(e, n, r) {
                  return --t <= 0 && n(r), t >= 0
                }), this
              },
              until: function(t, n) {
                var r = this._ctx;
                return K && t(o(r)), e(this._ctx, function(e, r, i) {
                  return t(e.value) ? (r(i), n) : !0
                }), this
              },
              first: function(e) {
                return this.limit(1).toArray(function(e) {
                  return e[0]
                }).then(e)
              },
              last: function(e) {
                return this.reverse().first(e)
              },
              and: function(n) {
                return K && n(o(this._ctx)), e(this._ctx, function(e) {
                  return n(e.value)
                }), t(this._ctx, n), this
              },
              or: function(e) {
                return new Y(this._ctx.table, e, this)
              },
              reverse: function() {
                return this._ctx.dir = "prev" === this._ctx.dir ? "next" : "prev", this._ondirectionchange && this._ondirectionchange(this._ctx.dir), this
              },
              desc: function() {
                return this.reverse()
              },
              eachKey: function(e) {
                var t = this._ctx;
                return K && e(x(o(this._ctx), this._ctx.index ? this._ctx.table.schema.idxByName[this._ctx.index].keyPath : this._ctx.table.schema.primKey.keyPath)), t.isPrimKey || (t.op = "openKeyCursor"), this.each(function(t, n) {
                  e(n.key, n)
                })
              },
              eachUniqueKey: function(e) {
                return this._ctx.unique = "unique", this.eachKey(e)
              },
              keys: function(e) {
                var t = this._ctx;
                t.isPrimKey || (t.op = "openKeyCursor");
                var n = [];
                return K ? new B(this.eachKey.bind(this)).then(function(e) {
                  return [e]
                }).then(e) : this.each(function(e, t) {
                  n.push(t.key)
                }).then(function() {
                  return n
                }).then(e)
              },
              uniqueKeys: function(e) {
                return this._ctx.unique = "unique", this.keys(e)
              },
              firstKey: function(e) {
                return this.limit(1).keys(function(e) {
                  return e[0]
                }).then(e)
              },
              lastKey: function(e) {
                return this.reverse().firstKey(e)
              },
              distinct: function() {
                var t = {};
                return e(this._ctx, function(e) {
                  var n = e.primaryKey.toString(),
                    r = t.hasOwnProperty(n);
                  return t[n] = !0, !r
                }), this
              }
            }
          }), o(X).from(Z).extend({
            modify: function(e) {
              var t = this,
                n = this._ctx,
                i = n.table.hook,
                o = i.updating.fire,
                a = i.deleting.fire;
              return K && "function" == typeof e && e.call({
                value: n.table.schema.instanceTemplate
              }, n.table.schema.instanceTemplate), this._write(function(i, s, c, f) {
                function l(e, t, r) {
                  A = t.primaryKey;
                  var i = {
                    primKey: t.primaryKey,
                    value: e
                  };
                  if (p.call(i, e) !== !1) {
                    var o = !i.hasOwnProperty("value"),
                      a = o ? t["delete"]() : t.update(i.value);
                    ++b, a.onerror = M(function(e) {
                      return _.push(e), k.push(i.primKey), i.onerror && i.onerror(e), d(), !0
                    }, o ? ["deleting", e, "from", n.table.name] : ["modifying", e, "on", n.table.name]), a.onsuccess = function(e) {
                      i.onsuccess && i.onsuccess(i.value), ++w, d()
                    }
                  } else i.onsuccess && i.onsuccess(i.value)
                }

                function h(e) {
                  return e && (_.push(e), k.push(A)), s(new N("Error modifying one or more objects", _, w, k))
                }

                function d() {
                  y && w + _.length === b && (_.length > 0 ? h() : i(w))
                }
                var p;
                if ("function" == typeof e) p = o === u && a === u ? e : function(t) {
                  var n = P(t);
                  if (e.call(this, t) === !1) return !1;
                  if (this.hasOwnProperty("value")) {
                    var r = E(n, this.value),
                      i = o.call(this, r, this.primKey, n, f);
                    i && (t = this.value, Object.keys(i).forEach(function(e) {
                      S(t, e, i[e])
                    }))
                  } else a.call(this, this.primKey, t, f)
                };
                else if (o === u) {
                  var m = Object.keys(e),
                    g = m.length;
                  p = function(t) {
                    for (var n = !1, r = 0; g > r; ++r) {
                      var i = m[r],
                        o = e[i];
                      x(t, i) !== o && (S(t, i, o), n = !0)
                    }
                    return n
                  }
                } else {
                  var v = e;
                  e = O(v), p = function(t) {
                    var n = !1,
                      i = o.call(this, e, this.primKey, P(t), f);
                    return i && r(e, i), Object.keys(e).forEach(function(r) {
                      var i = e[r];
                      x(t, r) !== i && (S(t, r, i), n = !0)
                    }), i && (e = O(v)), n
                  }
                }
                var b = 0,
                  w = 0,
                  y = !1,
                  _ = [],
                  k = [],
                  A = null;
                t._iterate(l, function() {
                  y = !0, d()
                }, h, c)
              })
            },
            "delete": function() {
              return this.modify(function() {
                delete this.value
              })
            }
          }), r(this, {
            Collection: Z,
            Table: V,
            Transaction: W,
            Version: l,
            WhereClause: Y,
            WriteableCollection: X,
            WriteableTable: H
          }), i(), ce.forEach(function(e) {
            e(Oe)
          })
        }

        function u() {}

        function c(e) {
          return e
        }

        function f(e, t) {
          return e === c ? t : function(n) {
            return t(e(n))
          }
        }

        function l(e, t) {
          return function() {
            e.apply(this, arguments), t.apply(this, arguments)
          }
        }

        function h(e, t) {
          return e === u ? t : function() {
            var r = e.apply(this, arguments);
            r !== n && (arguments[0] = r);
            var i = this.onsuccess,
              o = this.onerror;
            delete this.onsuccess, delete this.onerror;
            var a = t.apply(this, arguments);
            return i && (this.onsuccess = this.onsuccess ? l(i, this.onsuccess) : i), o && (this.onerror = this.onerror ? l(o, this.onerror) : o), a !== n ? a : r
          }
        }

        function d(e, t) {
          return e === u ? t : function() {
            var i = e.apply(this, arguments);
            i !== n && r(arguments[0], i);
            var o = this.onsuccess,
              a = this.onerror;
            delete this.onsuccess, delete this.onerror;
            var s = t.apply(this, arguments);
            return o && (this.onsuccess = this.onsuccess ? l(o, this.onsuccess) : o), a && (this.onerror = this.onerror ? l(a, this.onerror) : a), i === n ? s === n ? n : s : s === n ? i : r(i, s)
          }
        }

        function p(e, t) {
          return e === u ? t : function() {
            return e.apply(this, arguments) === !1 ? !1 : t.apply(this, arguments)
          }
        }

        function m(e, t) {
          return e === u ? t : function() {
            return t.apply(this, arguments) === !1 ? !1 : e.apply(this, arguments)
          }
        }

        function g(e, t) {
          return e === u ? t : function() {
            e.apply(this, arguments), t.apply(this, arguments)
          }
        }

        function v(e, t) {
          return e === u ? t : function() {
            var n = e.apply(this, arguments);
            if (n && "function" == typeof n.then) {
              var r = this,
                i = arguments;
              return n.then(function() {
                return t.apply(r, i)
              })
            }
            return t.apply(this, arguments)
          }
        }

        function b(t, n) {
          function r(e, t, n) {
            if (Array.isArray(e)) return o(e);
            if ("object" == typeof e) return i(e);
            t || (t = p), n || (n = u);
            var r = {
              subscribers: [],
              fire: n,
              subscribe: function(e) {
                r.subscribers.push(e), r.fire = t(r.fire, e)
              },
              unsubscribe: function(e) {
                r.subscribers = r.subscribers.filter(function(t) {
                  return t !== e
                }), r.fire = r.subscribers.reduce(t, n)
              }
            };
            return s[e] = c[e] = r, r
          }

          function i(t) {
            Object.keys(t).forEach(function(n) {
              var i = t[n];
              if (Array.isArray(i)) r(n, t[n][0], t[n][1]);
              else {
                if ("asap" !== i) throw new Error("Invalid event config");
                var o = r(n, null, function() {
                  var t = arguments;
                  o.subscribers.forEach(function(n) {
                    y(function() {
                      n.apply(e, t)
                    })
                  })
                });
                o.subscribe = function(e) {
                  -1 === o.subscribers.indexOf(e) && o.subscribers.push(e)
                }, o.unsubscribe = function(e) {
                  var t = o.subscribers.indexOf(e); - 1 !== t && o.subscribers.splice(t, 1)
                }
              }
            })
          }

          function o(e) {
            function t() {
              return n ? !1 : void(n = !0)
            }
            var n = !1;
            e.forEach(function(e) {
              r(e).subscribe(t)
            })
          }
          var a = arguments,
            s = {},
            c = function(e, n) {
              if (n) {
                var r = [].slice.call(arguments, 1),
                  i = s[e];
                return i.subscribe.apply(i, r), t
              }
              return "string" == typeof e ? s[e] : void 0
            };
          c.addEventType = r;
          for (var f = 1, l = a.length; l > f; ++f) r(a[f]);
          return c
        }

        function w(e) {
          if (!e) throw new Error("Assertion failed")
        }

        function y(t) {
          e.setImmediate ? i(t) : setTimeout(t, 0)
        }

        function _(e) {
          var t = setTimeout(e, 1e3);
          clearTimeout(t)
        }

        function k(e, t, n) {
          return function() {
            var r = B.PSD;
            B.PSD = n;
            try {
              e.apply(this, arguments)
            } catch (i) {
              t(i)
            } finally {
              B.PSD = r
            }
          }
        }

        function x(e, t) {
          if (e.hasOwnProperty(t)) return e[t];
          if (!t) return e;
          if ("string" != typeof t) {
            for (var r = [], i = 0, o = t.length; o > i; ++i) {
              var a = x(e, t[i]);
              r.push(a)
            }
            return r
          }
          var s = t.indexOf(".");
          if (-1 !== s) {
            var u = e[t.substr(0, s)];
            return u === n ? n : x(u, t.substr(s + 1))
          }
          return n
        }

        function S(e, t, r) {
          if (e && t !== n)
            if ("string" != typeof t && "length" in t) {
              w("string" != typeof r && "length" in r);
              for (var i = 0, o = t.length; o > i; ++i) S(e, t[i], r[i])
            } else {
              var a = t.indexOf(".");
              if (-1 !== a) {
                var s = t.substr(0, a),
                  u = t.substr(a + 1);
                if ("" === u) r === n ? delete e[s] : e[s] = r;
                else {
                  var c = e[s];
                  c || (c = e[s] = {}), S(c, u, r)
                }
              } else r === n ? delete e[t] : e[t] = r
            }
        }

        function A(e, t) {
          "string" == typeof t ? S(e, t, n) : "length" in t && [].map.call(t, function(t) {
            S(e, t, n)
          })
        }

        function O(e) {
          var t = {};
          for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n]);
          return t
        }

        function P(e) {
          if (!e || "object" != typeof e) return e;
          var t;
          if (Array.isArray(e)) {
            t = [];
            for (var n = 0, r = e.length; r > n; ++n) t.push(P(e[n]))
          } else if (e instanceof Date) t = new Date, t.setTime(e.getTime());
          else {
            t = e.constructor ? Object.create(e.constructor.prototype) : {};
            for (var i in e) e.hasOwnProperty(i) && (t[i] = P(e[i]))
          }
          return t
        }

        function E(e, t) {
          var r = {};
          for (var i in e) e.hasOwnProperty(i) && (t.hasOwnProperty(i) ? e[i] !== t[i] && JSON.stringify(e[i]) != JSON.stringify(t[i]) && (r[i] = t[i]) : r[i] = n);
          for (var i in t) t.hasOwnProperty(i) && !e.hasOwnProperty(i) && (r[i] = t[i]);
          return r
        }

        function T(e) {
          if ("function" == typeof e) return new e;
          if (Array.isArray(e)) return [T(e[0])];
          if (e && "object" == typeof e) {
            var t = {};
            return C(t, e), t
          }
          return e
        }

        function C(e, t) {
          Object.keys(t).forEach(function(n) {
            var r = T(t[n]);
            e[n] = r
          })
        }

        function M(e, t) {
          return function(n) {
            var r = n && n.target.error || new Error;
            if (t) {
              var i = " occurred when " + t.map(function(e) {
                switch (typeof e) {
                  case "function":
                    return e();
                  case "string":
                    return e;
                  default:
                    return JSON.stringify(e)
                }
              }).join(" ");
              r.name ? r.toString = function() {
                return r.name + i + (r.message ? ". " + r.message : "")
              } : r += i
            }
            return e(r), n && (n.stopPropagation && n.stopPropagation(), n.preventDefault && n.preventDefault()), !1
          }
        }

        function D(e) {
          try {
            throw e
          } catch (t) {
            return t
          }
        }

        function I(e) {
          e.preventDefault()
        }

        function L(e) {
          var t, n = s.dependencies.localStorage;
          if (!n) return e([]);
          try {
            t = JSON.parse(n.getItem("Dexie.DatabaseNames") || "[]")
          } catch (r) {
            t = []
          }
          e(t) && n.setItem("Dexie.DatabaseNames", JSON.stringify(t))
        }

        function F(e, t, n, r, i, o, a) {
          this.name = e, this.keyPath = t, this.unique = n, this.multi = r, this.auto = i, this.compound = o, this.dotted = a;
          var s = "string" == typeof t ? t : t && "[" + [].join.call(t, "+") + "]";
          this.src = (n ? "&" : "") + (r ? "*" : "") + (i ? "++" : "") + s
        }

        function R(e, t, n, r) {
          this.name = e, this.primKey = t || new F, this.indexes = n || [new F], this.instanceTemplate = r, this.mappedClass = null, this.idxByName = n.reduce(function(e, t) {
            return e[t.name] = t, e
          }, {})
        }

        function N(e, t, n, r) {
          this.name = "ModifyError", this.failures = t, this.failedKeys = r, this.successCount = n, this.message = t.join("\n")
        }

        function U(e) {
          return 1 === e.length ? e[0] : e
        }

        function j() {
          var e = s.dependencies.indexedDB,
            t = e && (e.getDatabaseNames || e.webkitGetDatabaseNames);
          return t && t.bind(e)
        }
        var B = function() {
            function t(e, t) {
              w.push([e, p.call(arguments, 1)])
            }

            function n() {
              var t = w;
              w = [];
              for (var n = 0, r = t.length; r > n; ++n) {
                var i = t[n];
                i[0].apply(e, i[1])
              }
            }

            function r(e) {
              if ("object" != typeof this) throw new TypeError("Promises must be constructed via new");
              if ("function" != typeof e) throw new TypeError("not a function");
              this._state = null, this._value = null, this._deferreds = [], this._catched = !1;
              var t = this,
                n = !0;
              this._PSD = r.PSD;
              try {
                d(this, e, function(e) {
                  n ? g(c, t, e) : c(t, e)
                }, function(e) {
                  return n ? (g(f, t, e), !1) : f(t, e)
                })
              } finally {
                n = !1
              }
            }

            function o(e, i) {
              if (null === e._state) return void e._deferreds.push(i);
              var o = e._state ? i.onFulfilled : i.onRejected;
              if (null === o) return (e._state ? i.resolve : i.reject)(e._value);
              var a, u = v;
              v = !1, g = t;
              try {
                var c = r.PSD;
                r.PSD = e._PSD, a = o(e._value), e._state || a && "function" == typeof a.then && a._state === !1 || s(e), i.resolve(a)
              } catch (f) {
                var l = i.reject(f);
                if (!l && e.onuncatched) try {
                  e.onuncatched(f)
                } catch (f) {}
              } finally {
                if (r.PSD = c, u) {
                  do {
                    for (; w.length > 0;) n();
                    var h = y.pop();
                    if (h) try {
                      h()
                    } catch (f) {}
                  } while (y.length > 0 || w.length > 0);
                  g = m, v = !0
                }
              }
            }

            function a(e) {
              var r = v;
              v = !1, g = t;
              try {
                e()
              } finally {
                if (r) {
                  do {
                    for (; w.length > 0;) n();
                    var i = y.pop();
                    if (i) try {
                      i()
                    } catch (o) {}
                  } while (y.length > 0 || w.length > 0);
                  g = m, v = !0
                }
              }
            }

            function s(e) {
              e._catched = !0, e._parent && s(e._parent)
            }

            function c(e, t) {
              var n = r.PSD;
              r.PSD = e._PSD;
              try {
                if (t === e) throw new TypeError("A promise cannot be resolved with itself.");
                if (t && ("object" == typeof t || "function" == typeof t) && "function" == typeof t.then) return void d(e, function(e, n) {
                  t.then(e, n)
                }, function(t) {
                  c(e, t)
                }, function(t) {
                  f(e, t)
                });
                e._state = !0, e._value = t, l.call(e)
              } catch (i) {
                f(i)
              } finally {
                r.PSD = n
              }
            }

            function f(e, t) {
              var n = r.PSD;
              if (r.PSD = e._PSD, e._state = !1, e._value = t, l.call(e), !e._catched) try {
                e.onuncatched && e.onuncatched(e._value), r.on.error.fire(e._value)
              } catch (i) {}
              return r.PSD = n, e._catched
            }

            function l() {
              for (var e = 0, t = this._deferreds.length; t > e; e++) o(this, this._deferreds[e]);
              this._deferreds = []
            }

            function h(e, t, n, r) {
              this.onFulfilled = "function" == typeof e ? e : null, this.onRejected = "function" == typeof t ? t : null, this.resolve = n, this.reject = r
            }

            function d(e, t, n, r) {
              var i = !1;
              try {
                t(function(e) {
                  i || (i = !0, n(e))
                }, function(t) {
                  return i ? e._catched : (i = !0, r(t))
                })
              } catch (o) {
                if (i) return;
                return r(o)
              }
            }
            var p = [].slice,
              m = "undefined" == typeof i ? function(t, n, r, i) {
                var o = arguments;
                setTimeout(function() {
                  t.apply(e, p.call(o, 1))
                }, 0)
              } : i;
            _(function() {
              m = g = t = function(t) {
                var n = arguments;
                setTimeout(function() {
                  t.apply(e, p.call(n, 1))
                }, 0)
              }
            });
            var g = m,
              v = !0,
              w = [],
              y = [];
            return r.on = b(null, "error"), r.all = function() {
              var e = Array.prototype.slice.call(1 === arguments.length && Array.isArray(arguments[0]) ? arguments[0] : arguments);
              return new r(function(t, n) {
                function r(o, a) {
                  try {
                    if (a && ("object" == typeof a || "function" == typeof a)) {
                      var s = a.then;
                      if ("function" == typeof s) return void s.call(a, function(e) {
                        r(o, e)
                      }, n)
                    }
                    e[o] = a, 0 === --i && t(e)
                  } catch (u) {
                    n(u)
                  }
                }
                if (0 === e.length) return t([]);
                for (var i = e.length, o = 0; o < e.length; o++) r(o, e[o])
              })
            }, r.prototype.then = function(e, t) {
              var n = this,
                i = new r(function(r, i) {
                  null === n._state ? o(n, new h(e, t, r, i)) : g(o, n, new h(e, t, r, i))
                });
              return i._PSD = this._PSD, i.onuncatched = this.onuncatched, i._parent = this, i
            }, r.prototype._then = function(e, t) {
              o(this, new h(e, t, u, u))
            }, r.prototype["catch"] = function(e) {
              if (1 === arguments.length) return this.then(null, e);
              var t = arguments[0],
                n = arguments[1];
              return "function" == typeof t ? this.then(null, function(e) {
                return e instanceof t ? n(e) : r.reject(e)
              }) : this.then(null, function(e) {
                return e && e.name === t ? n(e) : r.reject(e)
              })
            }, r.prototype["finally"] = function(e) {
              return this.then(function(t) {
                return e(), t
              }, function(t) {
                return e(), r.reject(t)
              })
            }, r.prototype.onuncatched = null, r.resolve = function(e) {
              var t = new r(function() {});
              return t._state = !0, t._value = e, t
            }, r.reject = function(e) {
              var t = new r(function() {});
              return t._state = !1, t._value = e, t
            }, r.race = function(e) {
              return new r(function(t, n) {
                e.map(function(e) {
                  e.then(t, n)
                })
              })
            }, r.PSD = null, r.newPSD = function(e) {
              var t = r.PSD;
              r.PSD = t ? Object.create(t) : {};
              try {
                return e()
              } finally {
                r.PSD = t
              }
            }, r._rootExec = a, r._tickFinalize = function(e) {
              if (v) throw new Error("Not in a virtual tick");
              y.push(e)
            }, r
          }(),
          z = function() {},
          K = !1;
        o(N).from(Error), s["delete"] = function(e) {
          var t = new s(e),
            n = t["delete"]();
          return n.onblocked = function(e) {
            return t.on("blocked", e), this
          }, n
        }, s.exists = function(e) {
          return new s(e).open().then(function(e) {
            return e.close(), !0
          }, function() {
            return !1
          })
        }, s.getDatabaseNames = function(e) {
          return new B(function(e, t) {
            var n = j();
            if (n) {
              var r = n();
              r.onsuccess = function(t) {
                e([].slice.call(t.target.result, 0))
              }, r.onerror = M(t)
            } else L(function(t) {
              return e(t), !1
            })
          }).then(e)
        }, s.defineClass = function(e) {
          function t(t) {
            t ? r(this, t) : K && C(this, e)
          }
          return t
        }, s.ignoreTransaction = function(e) {
          return B.newPSD(function() {
            return B.PSD.trans = null, e()
          })
        }, s.spawn = function() {
          return e.console && console.warn("Dexie.spawn() is deprecated. Use Dexie.ignoreTransaction() instead."), s.ignoreTransaction.apply(this, arguments)
        }, s.vip = function(e) {
          return B.newPSD(function() {
            return B.PSD.letThrough = !0, e()
          })
        }, Object.defineProperty(s, "currentTransaction", {
          get: function() {
            return B.PSD && B.PSD.trans || null
          }
        }), s.Promise = B, s.derive = o, s.extend = r, s.override = a, s.events = b, s.getByKeyPath = x, s.setByKeyPath = S, s.delByKeyPath = A, s.shallowClone = O, s.deepClone = P, s.addons = [], s.fakeAutoComplete = z, s.asap = y, s.ModifyError = N, s.MultiModifyError = N, s.IndexSpec = F, s.TableSchema = R;
        var G = e.idbModules && e.idbModules.shimIndexedDB ? e.idbModules : {};
        s.dependencies = {
          indexedDB: G.shimIndexedDB || e.indexedDB || e.mozIndexedDB || e.webkitIndexedDB || e.msIndexedDB,
          IDBKeyRange: G.IDBKeyRange || e.IDBKeyRange || e.webkitIDBKeyRange,
          IDBTransaction: G.IDBTransaction || e.IDBTransaction || e.webkitIDBTransaction,
          Error: e.Error || String,
          SyntaxError: e.SyntaxError || String,
          TypeError: e.TypeError || String,
          DOMError: e.DOMError || String,
          localStorage: null != ("undefined" != typeof chrome && null !== chrome ? chrome.storage : void 0) ? null : e.localStorage
        }, s.version = 1.2, t("Dexie", s), _(function() {
          s.fakeAutoComplete = z = _, s.fake = K = !0
        })
      }).apply(null, [self || window, function(i, o) {
        r = function() {
          return o
        }.call(t, n, t, e), !(void 0 !== r && (e.exports = r))
      }])
    }).call(t, n(102).setImmediate)
  },
  464: function(e, t, n) {
    var r = n(196).padLeft,
      i = t.Printer = function(e, t) {
        return function(n, i) {
          var o = e + " " + t(n);
          return null == i ? o : r(o, i)
        }
      };
    t.sum = function(e, t) {
      return e = e || 0, e += t
    }, t.sum.printer = i("∑", String), t.avg = function(e, t, n, r) {
      return e = e || 0, e += t, n + 1 == r ? e / r : e
    }, t.avg.printer = i("Avg:", String)
  },
  465: function(e, t) {
    function n(e) {
      if ("function" != typeof e) {
        var t = Array.isArray(e) ? e : Object.keys(this.columns);
        e = r(t)
      }
      return this.rows.sort(e), this
    }

    function r(e) {
      var t = e.map(function(e) {
        var t = "asc",
          n = /(.*)\|\s*(asc|des)\s*$/.exec(e);
        return n && (e = n[1], t = n[2]),
          function(n, r) {
            var o = i(n[e], r[e]);
            return "asc" == t ? o : -1 * o
          }
      });
      return function(e, n) {
        for (var r = 0; r < t.length; r++) {
          var i = t[r](e, n);
          if (0 != i) return i
        }
        return 0
      }
    }

    function i(e, t) {
      return e === t ? 0 : void 0 === e ? 1 : void 0 === t ? -1 : null === e ? 1 : null === t ? -1 : e > t ? 1 : t > e ? -1 : i(String(e), String(t));
    }
    e.exports = n
  },
  466: function(e, t, n) {
    var r = n(467).ExifReader;
    e.exports = function(e) {
      var t = new r;
      return t.load(e), t.getAllTags()
    }
  },
  467: function(e, t) {
    (function() {
      var e = function(e, t) {
        return function() {
          return e.apply(t, arguments)
        }
      };
      ("undefined" != typeof t && null !== t ? t : this).ExifReader = function() {
        function t() {
          this._getTagValueAt = {
            1: e(function(e) {
              return this._getByteAt(e)
            }, this),
            2: e(function(e) {
              return this._getAsciiAt(e)
            }, this),
            3: e(function(e) {
              return this._getShortAt(e)
            }, this),
            4: e(function(e) {
              return this._getLongAt(e)
            }, this),
            5: e(function(e) {
              return this._getRationalAt(e)
            }, this),
            7: e(function(e) {
              return this._getUndefinedAt(e)
            }, this),
            9: e(function(e) {
              return this._getSlongAt(e)
            }, this),
            10: e(function(e) {
              return this._getSrationalAt(e)
            }, this)
          }
        }
        return t.prototype._tiffHeaderOffset = 12, t.prototype.load = function(e) {
          return this.loadView(new DataView(e))
        }, t.prototype.loadView = function(e) {
          return this._dataView = e, this._tags = {}, this._checkImageHeader(), this._readTags()
        }, t.prototype._checkImageHeader = function() {
          if (this._dataView.byteLength < 12 || 4292411361 !== this._dataView.getUint32(0, !1) || 1165519206 !== this._dataView.getUint32(6, !1) || 0 !== this._dataView.getUint16(10, !1)) throw "Invalid image format or no Exif data"
        }, t.prototype._readTags = function() {
          return this._setByteOrder(), this._read0thIfd(), this._readExifIfd(), this._readGpsIfd(), this._readInteroperabilityIfd()
        }, t.prototype._setByteOrder = function() {
          if (18761 === this._dataView.getUint16(this._tiffHeaderOffset)) return this._littleEndian = !0;
          if (19789 === this._dataView.getUint16(this._tiffHeaderOffset)) return this._littleEndian = !1;
          throw "Illegal byte order value. Faulty image."
        }, t.prototype._read0thIfd = function() {
          var e;
          return e = this._getIfdOffset(), this._readIfd("0th", e)
        }, t.prototype._getIfdOffset = function() {
          return this._tiffHeaderOffset + this._getLongAt(this._tiffHeaderOffset + 4)
        }, t.prototype._readExifIfd = function() {
          var e;
          return null != this._tags["Exif IFD Pointer"] ? (e = this._tiffHeaderOffset + this._tags["Exif IFD Pointer"].value, this._readIfd("exif", e)) : void 0
        }, t.prototype._readGpsIfd = function() {
          var e;
          return null != this._tags["GPS Info IFD Pointer"] ? (e = this._tiffHeaderOffset + this._tags["GPS Info IFD Pointer"].value, this._readIfd("gps", e)) : void 0
        }, t.prototype._readInteroperabilityIfd = function() {
          var e;
          return null != this._tags["Interoperability IFD Pointer"] ? (e = this._tiffHeaderOffset + this._tags["Interoperability IFD Pointer"].value, this._readIfd("interoperability", e)) : void 0
        }, t.prototype._readIfd = function(e, t) {
          var n, r, i, o;
          for (r = this._getShortAt(t), t += 2, o = [], n = 0; r >= 0 ? r > n : n > r; r >= 0 ? n++ : n--) i = this._readTag(e, t), this._tags[i.name] = {
            value: i.value,
            description: i.description
          }, o.push(t += 12);
          return o
        }, t.prototype._readTag = function(e, t) {
          var n, r, i, o, a, s, u;
          return n = this._getShortAt(t), a = this._getShortAt(t + 2), r = this._getLongAt(t + 4), this._typeSizes[a] * r <= 4 ? s = this._getTagValue(t + 8, a, r) : (u = this._getLongAt(t + 8), s = this._getTagValue(this._tiffHeaderOffset + u, a, r)), a === this._tagTypes.ASCII && (s = this._splitNullSeparatedAsciiString(s)), null != this._tagNames[e][n] ? (null != this._tagNames[e][n].name && null != this._tagNames[e][n].description ? (o = this._tagNames[e][n].name, i = this._tagNames[e][n].description(s)) : (o = this._tagNames[e][n], i = s instanceof Array ? s.join(", ") : s), {
            name: o,
            value: s,
            description: i
          }) : {
            name: "undefined-" + n,
            value: s,
            description: s
          }
        }, t.prototype._getTagValue = function(e, t, n) {
          var r, i, o;
          return i = function() {
            var i;
            for (i = [], o = 0; n >= 0 ? n > o : o > n; n >= 0 ? o++ : o--) r = this._getTagValueAt[t](e), e += this._typeSizes[t], i.push(r);
            return i
          }.call(this), 1 === i.length ? i = i[0] : t === this._tagTypes.ASCII && (i = this._getAsciiValue(i)), i
        }, t.prototype._getAsciiValue = function(e) {
          var t, n;
          return n = function() {
            var n, r, i;
            for (i = [], n = 0, r = e.length; r > n; n++) t = e[n], i.push(String.fromCharCode(t));
            return i
          }()
        }, t.prototype._getByteAt = function(e) {
          return this._dataView.getUint8(e)
        }, t.prototype._getAsciiAt = function(e) {
          return this._dataView.getUint8(e)
        }, t.prototype._getShortAt = function(e) {
          return this._dataView.getUint16(e, this._littleEndian)
        }, t.prototype._getLongAt = function(e) {
          return this._dataView.getUint32(e, this._littleEndian)
        }, t.prototype._getRationalAt = function(e) {
          return this._getLongAt(e) / this._getLongAt(e + 4)
        }, t.prototype._getUndefinedAt = function(e) {
          return this._getByteAt(e)
        }, t.prototype._getSlongAt = function(e) {
          return this._dataView.getInt32(e, this._littleEndian)
        }, t.prototype._getSrationalAt = function(e) {
          return this._getSlongAt(e) / this._getSlongAt(e + 4)
        }, t.prototype._splitNullSeparatedAsciiString = function(e) {
          var t, n, r, i, o;
          for (r = [], n = 0, i = 0, o = e.length; o > i; i++) t = e[i], "\x00" !== t ? (null == r[n] && (r[n] = ""), r[n] += t) : n++;
          return r
        }, t.prototype._typeSizes = {
          1: 1,
          2: 1,
          3: 2,
          4: 4,
          5: 8,
          7: 1,
          9: 4,
          10: 8
        }, t.prototype._tagTypes = {
          BYTE: 1,
          ASCII: 2,
          SHORT: 3,
          LONG: 4,
          RATIONAL: 5,
          UNDEFINED: 7,
          SLONG: 9,
          SRATIONAL: 10
        }, t.prototype._tagNames = {
          "0th": {
            256: "ImageWidth",
            257: "ImageLength",
            258: "BitsPerSample",
            259: "Compression",
            262: "PhotometricInterpretation",
            270: "ImageDescription",
            271: "Make",
            272: "Model",
            273: "StripOffsets",
            274: {
              name: "Orientation",
              description: function(e) {
                switch (e) {
                  case 1:
                    return "top-left";
                  case 2:
                    return "top-right";
                  case 3:
                    return "bottom-right";
                  case 4:
                    return "bottom-left";
                  case 5:
                    return "left-top";
                  case 6:
                    return "right-top";
                  case 7:
                    return "right-bottom";
                  case 8:
                    return "left-bottom";
                  default:
                    return "Undefined"
                }
              }
            },
            277: "SamplesPerPixel",
            278: "RowsPerStrip",
            279: "StripByteCounts",
            282: "XResolution",
            283: "YResolution",
            284: "PlanarConfiguration",
            296: {
              name: "ResolutionUnit",
              description: function(e) {
                switch (e) {
                  case 2:
                    return "inches";
                  case 3:
                    return "centimeters";
                  default:
                    return "Unknown"
                }
              }
            },
            301: "TransferFunction",
            305: "Software",
            306: "DateTime",
            315: "Artist",
            318: "WhitePoint",
            319: "PrimaryChromaticities",
            513: "JPEGInterchangeFormat",
            514: "JPEGInterchangeFormatLength",
            529: "YCbCrCoefficients",
            530: "YCbCrSubSampling",
            531: {
              name: "YCbCrPositioning",
              description: function(e) {
                switch (e) {
                  case 1:
                    return "centered";
                  case 2:
                    return "co-sited";
                  default:
                    return "undefied " + e
                }
              }
            },
            532: "ReferenceBlackWhite",
            33432: {
              name: "Copyright",
              description: function(e) {
                return e.join("; ")
              }
            },
            34665: "Exif IFD Pointer",
            34853: "GPS Info IFD Pointer"
          },
          exif: {
            33434: "ExposureTime",
            33437: "FNumber",
            34850: {
              name: "ExposureProgram",
              description: function(e) {
                switch (e) {
                  case 0:
                    return "Undefined";
                  case 1:
                    return "Manual";
                  case 2:
                    return "Normal program";
                  case 3:
                    return "Aperture priority";
                  case 4:
                    return "Shutter priority";
                  case 5:
                    return "Creative program";
                  case 6:
                    return "Action program";
                  case 7:
                    return "Portrait mode";
                  case 8:
                    return "Landscape mode";
                  default:
                    return "Unknown"
                }
              }
            },
            34852: "SpectralSensitivity",
            34855: "ISOSpeedRatings",
            34856: {
              name: "OECF",
              description: function(e) {
                return "[Raw OECF table data]"
              }
            },
            36864: {
              name: "ExifVersion",
              description: function(e) {
                var t, n, r, i;
                for (n = "", r = 0, i = e.length; i > r; r++) t = e[r], n += String.fromCharCode(t);
                return n
              }
            },
            36867: "DateTimeOriginal",
            36868: "DateTimeDigitized",
            37121: {
              name: "ComponentsConfiguration",
              description: function(e) {
                var t, n, r, i;
                for (n = "", r = 0, i = e.length; i > r; r++) switch (t = e[r]) {
                  case 49:
                    n += "Y";
                    break;
                  case 50:
                    n += "Cb";
                    break;
                  case 51:
                    n += "Cr";
                    break;
                  case 52:
                    n += "R";
                    break;
                  case 53:
                    n += "G";
                    break;
                  case 54:
                    n += "B"
                }
                return n
              }
            },
            37122: "CompressedBitsPerPixel",
            37377: "ShutterSpeedValue",
            37378: "ApertureValue",
            37379: "BrightnessValue",
            37380: "ExposureBiasValue",
            37381: "MaxApertureValue",
            37382: "SubjectDistance",
            37383: {
              name: "MeteringMode",
              description: function(e) {
                switch (e) {
                  case 1:
                    return "Average";
                  case 2:
                    return "CenterWeightedAverage";
                  case 3:
                    return "Spot";
                  case 4:
                    return "MultiSpot";
                  case 5:
                    return "Pattern";
                  case 6:
                    return "Partial";
                  case 255:
                    return "Other";
                  default:
                    return "Unknown"
                }
              }
            },
            37384: {
              name: "LightSource",
              description: function(e) {
                switch (e) {
                  case 1:
                    return "Daylight";
                  case 2:
                    return "Fluorescent";
                  case 3:
                    return "Tungsten (incandescent light)";
                  case 4:
                    return "Flash";
                  case 9:
                    return "Fine weather";
                  case 10:
                    return "Cloudy weather";
                  case 11:
                    return "Shade";
                  case 12:
                    return "Daylight fluorescent (D 5700 – 7100K)";
                  case 13:
                    return "Day white fluorescent (N 4600 – 5400K)";
                  case 14:
                    return "Cool white fluorescent (W 3900 – 4500K)";
                  case 15:
                    return "White fluorescent (WW 3200 – 3700K)";
                  case 17:
                    return "Standard light A";
                  case 18:
                    return "Standard light B";
                  case 19:
                    return "Standard light C";
                  case 20:
                    return "D55";
                  case 21:
                    return "D65";
                  case 22:
                    return "D75";
                  case 23:
                    return "D50";
                  case 24:
                    return "ISO studio tungsten";
                  case 255:
                    return "Other light source";
                  default:
                    return "Unknown"
                }
              }
            },
            37385: {
              name: "Flash",
              description: function(e) {
                switch (e) {
                  case 0:
                    return "Flash did not fire";
                  case 1:
                    return "Flash fired";
                  case 5:
                    return "Strobe return light not detected";
                  case 7:
                    return "Strobe return light detected";
                  case 9:
                    return "Flash fired, compulsory flash mode";
                  case 13:
                    return "Flash fired, compulsory flash mode, return light not detected";
                  case 15:
                    return "Flash fired, compulsory flash mode, return light detected";
                  case 16:
                    return "Flash did not fire, compulsory flash mode";
                  case 24:
                    return "Flash did not fire, auto mode";
                  case 25:
                    return "Flash fired, auto mode";
                  case 29:
                    return "Flash fired, auto mode, return light not detected";
                  case 31:
                    return "Flash fired, auto mode, return light detected";
                  case 32:
                    return "No flash function";
                  case 65:
                    return "Flash fired, red-eye reduction mode";
                  case 69:
                    return "Flash fired, red-eye reduction mode, return light not detected";
                  case 71:
                    return "Flash fired, red-eye reduction mode, return light detected";
                  case 73:
                    return "Flash fired, compulsory flash mode, red-eye reduction mode";
                  case 77:
                    return "Flash fired, compulsory flash mode, red-eye reduction mode, return light not detected";
                  case 79:
                    return "Flash fired, compulsory flash mode, red-eye reduction mode, return light detected";
                  case 89:
                    return "Flash fired, auto mode, red-eye reduction mode";
                  case 93:
                    return "Flash fired, auto mode, return light not detected, red-eye reduction mode";
                  case 95:
                    return "Flash fired, auto mode, return light detected, red-eye reduction mode";
                  default:
                    return "Unknown"
                }
              }
            },
            37386: "FocalLength",
            37396: {
              name: "SubjectArea",
              description: function(e) {
                switch (e.length) {
                  case 2:
                    return "Location; X: " + e[0] + ", Y: " + e[1];
                  case 3:
                    return "Circle; X: " + e[0] + ", Y: " + e[1] + ", diameter: " + e[2];
                  case 4:
                    return "Rectangle; X: " + e[0] + ", Y: " + e[1] + ", width: " + e[2] + ", height: " + e[3];
                  default:
                    return "Unknown"
                }
              }
            },
            37500: {
              name: "MakerNote",
              description: function(e) {
                return "[Raw maker note data]"
              }
            },
            37510: {
              name: "UserComment",
              description: function(e) {
                switch (e.slice(0, 8).map(function(e) {
                  return String.fromCharCode(e)
                }).join("")) {
                  case "ASCII\x00\x00\x00":
                    return e.slice(8, e.length).map(function(e) {
                      return String.fromCharCode(e)
                    }).join("");
                  case "JIS\x00\x00\x00\x00\x00":
                    return "[JIS encoded text]";
                  case "UNICODE\x00":
                    return "[Unicode encoded text]";
                  case "\x00\x00\x00\x00\x00\x00\x00\x00":
                    return "[Undefined encoding]"
                }
              }
            },
            37520: "SubSecTime",
            37521: "SubSecTimeOriginal",
            37522: "SubSecTimeDigitized",
            40960: {
              name: "FlashpixVersion",
              description: function(e) {
                var t, n, r, i;
                for (n = "", r = 0, i = e.length; i > r; r++) t = e[r], n += String.fromCharCode(t);
                return n
              }
            },
            40961: {
              name: "ColorSpace",
              description: function(e) {
                switch (e) {
                  case 1:
                    return "sRGB";
                  case 65535:
                    return "Uncalibrated";
                  default:
                    return "Unknown"
                }
              }
            },
            40962: "PixelXDimension",
            40963: "PixelYDimension",
            40964: "RelatedSoundFile",
            40965: "Interoperability IFD Pointer",
            41483: "FlashEnergy",
            41484: {
              name: "SpatialFrequencyResponse",
              description: function(e) {
                return "[Raw SFR table data]"
              }
            },
            41486: "FocalPlaneXResolution",
            41487: "FocalPlaneYResolution",
            41488: {
              name: "FocalPlaneResolutionUnit",
              description: function(e) {
                switch (e) {
                  case 2:
                    return "inches";
                  case 3:
                    return "centimeters";
                  default:
                    return "Unknown"
                }
              }
            },
            41492: {
              name: "SubjectLocation",
              description: function(e) {
                return "X: " + e[0] + ", Y: " + e[1]
              }
            },
            41493: "ExposureIndex",
            41495: {
              name: "SensingMethod",
              description: function(e) {
                switch (e) {
                  case 1:
                    return "Undefined";
                  case 2:
                    return "One-chip color area sensor";
                  case 3:
                    return "Two-chip color area sensor";
                  case 4:
                    return "Three-chip color area sensor";
                  case 5:
                    return "Color sequential area sensor";
                  case 7:
                    return "Trilinear sensor";
                  case 8:
                    return "Color sequential linear sensor";
                  default:
                    return "Unknown"
                }
              }
            },
            41728: {
              name: "FileSource",
              description: function(e) {
                switch (e) {
                  case 3:
                    return "DSC";
                  default:
                    return "Unknown"
                }
              }
            },
            41729: {
              name: "SceneType",
              description: function(e) {
                switch (e) {
                  case 1:
                    return "A directly photographed image";
                  default:
                    return "Unknown"
                }
              }
            },
            41730: {
              name: "CFAPattern",
              description: function(e) {
                return "[Raw CFA pattern table data]"
              }
            },
            41985: {
              name: "CustomRendered",
              description: function(e) {
                switch (e) {
                  case 0:
                    return "Normal process";
                  case 1:
                    return "Custom process";
                  default:
                    return "Unknown"
                }
              }
            },
            41986: {
              name: "ExposureMode",
              description: function(e) {
                switch (e) {
                  case 0:
                    return "Auto exposure";
                  case 1:
                    return "Manual exposure";
                  case 2:
                    return "Auto bracket";
                  default:
                    return "Unknown"
                }
              }
            },
            41987: {
              name: "WhiteBalance",
              description: function(e) {
                switch (e) {
                  case 0:
                    return "Auto white balance";
                  case 1:
                    return "Manual white balance";
                  default:
                    return "Unknown"
                }
              }
            },
            41988: {
              name: "DigitalZoomRatio",
              description: function(e) {
                switch (e) {
                  case 0:
                    return "Digital zoom was not used";
                  default:
                    return e
                }
              }
            },
            41989: {
              name: "FocalLengthIn35mmFilm",
              description: function(e) {
                switch (e) {
                  case 0:
                    return "Unknown";
                  default:
                    return e
                }
              }
            },
            41990: {
              name: "SceneCaptureType",
              description: function(e) {
                switch (e) {
                  case 0:
                    return "Standard";
                  case 1:
                    return "Landscape";
                  case 2:
                    return "Portrait";
                  case 3:
                    return "Night scene";
                  default:
                    return "Unknown"
                }
              }
            },
            41991: {
              name: "GainControl",
              description: function(e) {
                switch (e) {
                  case 0:
                    return "None";
                  case 1:
                    return "Low gain up";
                  case 2:
                    return "High gain up";
                  case 3:
                    return "Low gain down";
                  case 4:
                    return "High gain down";
                  default:
                    return "Unknown"
                }
              }
            },
            41992: {
              name: "Contrast",
              description: function(e) {
                switch (e) {
                  case 0:
                    return "Normal";
                  case 1:
                    return "Soft";
                  case 2:
                    return "Hard";
                  default:
                    return "Unknown"
                }
              }
            },
            41993: {
              name: "Saturation",
              description: function(e) {
                switch (e) {
                  case 0:
                    return "Normal";
                  case 1:
                    return "Low saturation";
                  case 2:
                    return "High saturation";
                  default:
                    return "Unknown"
                }
              }
            },
            41994: {
              name: "Sharpness",
              description: function(e) {
                switch (e) {
                  case 0:
                    return "Normal";
                  case 1:
                    return "Soft";
                  case 2:
                    return "Hard";
                  default:
                    return "Unknown"
                }
              }
            },
            41995: {
              name: "DeviceSettingDescription",
              description: function(e) {
                return "[Raw device settings table data]"
              }
            },
            41996: {
              name: "SubjectDistanceRange",
              description: function(e) {
                switch (e) {
                  case 1:
                    return "Macro";
                  case 2:
                    return "Close view";
                  case 3:
                    return "Distant view";
                  default:
                    return "Unknown"
                }
              }
            },
            42016: "ImageUniqueID"
          },
          gps: {
            0: {
              name: "GPSVersionID",
              description: function(e) {
                var t, n;
                return e[0] === (t = e[1]) && 2 === t && e[2] === (n = e[3]) && 0 === n ? "Version 2.2" : "Unknown"
              }
            },
            1: {
              name: "GPSLatitudeRef",
              description: function(e) {
                switch (e.join("")) {
                  case "N":
                    return "North latitude";
                  case "S":
                    return "South latitude";
                  default:
                    return "Unknown"
                }
              }
            },
            2: {
              name: "GPSLatitude",
              description: function(e) {
                return e[0] + e[1] / 60 + e[2] / 3600
              }
            },
            3: {
              name: "GPSLongitudeRef",
              description: function(e) {
                switch (e.join("")) {
                  case "E":
                    return "East longitude";
                  case "W":
                    return "West longitude";
                  default:
                    return "Unknown"
                }
              }
            },
            4: {
              name: "GPSLongitude",
              description: function(e) {
                return e[0] + e[1] / 60 + e[2] / 3600
              }
            },
            5: {
              name: "GPSAltitudeRef",
              description: function(e) {
                switch (e) {
                  case 0:
                    return "Sea level";
                  case 1:
                    return "Sea level reference (negative value)";
                  default:
                    return "Unknown"
                }
              }
            },
            6: {
              name: "GPSAltitude",
              description: function(e) {
                return e + " m"
              }
            },
            7: {
              name: "GPSTimeStamp",
              description: function(e) {
                var t;
                return t = function(e) {
                  var t;
                  return function() {
                    var n, r;
                    for (r = [], t = 0, n = 2 - ("" + Math.floor(e)).length; n >= 0 ? n > t : t > n; n >= 0 ? t++ : t--) r.push("0");
                    return r
                  }() + e
                }, e.map(t).join(":")
              }
            },
            8: "GPSSatellites",
            9: {
              name: "GPSStatus",
              description: function(e) {
                switch (e.join("")) {
                  case "A":
                    return "Measurement in progress";
                  case "V":
                    return "Measurement Interoperability";
                  default:
                    return "Unknown"
                }
              }
            },
            10: {
              name: "GPSMeasureMode",
              description: function(e) {
                switch (e.join("")) {
                  case "2":
                    return "2-dimensional measurement";
                  case "3":
                    return "3-dimensional measurement";
                  default:
                    return "Unknown"
                }
              }
            },
            11: "GPSDOP",
            12: {
              name: "GPSSpeedRef",
              description: function(e) {
                switch (e.join("")) {
                  case "K":
                    return "Kilometers per hour";
                  case "M":
                    return "Miles per hour";
                  case "N":
                    return "Knots";
                  default:
                    return "Unknown"
                }
              }
            },
            13: "GPSSpeed",
            14: {
              name: "GPSTrackRef",
              description: function(e) {
                switch (e.join("")) {
                  case "T":
                    return "True direction";
                  case "M":
                    return "Magnetic direction";
                  default:
                    return "Unknown"
                }
              }
            },
            15: "GPSTrack",
            16: {
              name: "GPSImgDirectionRef",
              description: function(e) {
                switch (e.join("")) {
                  case "T":
                    return "True direction";
                  case "M":
                    return "Magnetic direction";
                  default:
                    return "Unknown"
                }
              }
            },
            17: "GPSImgDirection",
            18: "GPSMapDatum",
            19: {
              name: "GPSDestLatitudeRef",
              description: function(e) {
                switch (e.join("")) {
                  case "N":
                    return "North latitude";
                  case "S":
                    return "South latitude";
                  default:
                    return "Unknown"
                }
              }
            },
            20: {
              name: "GPSDestLatitude",
              description: function(e) {
                return e[0] + e[1] / 60 + e[2] / 3600
              }
            },
            21: {
              name: "GPSDestLongitudeRef",
              description: function(e) {
                switch (e.join("")) {
                  case "E":
                    return "East longitude";
                  case "W":
                    return "West longitude";
                  default:
                    return "Unknown"
                }
              }
            },
            22: {
              name: "GPSDestLongitude",
              description: function(e) {
                return e[0] + e[1] / 60 + e[2] / 3600
              }
            },
            23: {
              name: "GPSDestBearingRef",
              description: function(e) {
                switch (e.join("")) {
                  case "T":
                    return "True direction";
                  case "M":
                    return "Magnetic direction";
                  default:
                    return "Unknown"
                }
              }
            },
            24: "GPSDestBearing",
            25: {
              name: "GPSDestDistanceRef",
              description: function(e) {
                switch (e.join("")) {
                  case "K":
                    return "Kilometers";
                  case "M":
                    return "Miles";
                  case "N":
                    return "Knots";
                  default:
                    return "Unknown"
                }
              }
            },
            26: "GPSDestDistance",
            27: {
              name: "GPSProcessingMethod",
              description: function(e) {
                switch (e.slice(0, 8).map(function(e) {
                  return String.fromCharCode(e)
                }).join("")) {
                  case "ASCII\x00\x00\x00":
                    return e.slice(8, e.length).map(function(e) {
                      return String.fromCharCode(e)
                    }).join("");
                  case "JIS\x00\x00\x00\x00\x00":
                    return "[JIS encoded text]";
                  case "UNICODE\x00":
                    return "[Unicode encoded text]";
                  case "\x00\x00\x00\x00\x00\x00\x00\x00":
                    return "[Undefined encoding]"
                }
              }
            },
            28: {
              name: "GPSAreaInformation",
              description: function(e) {
                switch (e.slice(0, 8).map(function(e) {
                  return String.fromCharCode(e)
                }).join("")) {
                  case "ASCII\x00\x00\x00":
                    return e.slice(8, e.length).map(function(e) {
                      return String.fromCharCode(e)
                    }).join("");
                  case "JIS\x00\x00\x00\x00\x00":
                    return "[JIS encoded text]";
                  case "UNICODE\x00":
                    return "[Unicode encoded text]";
                  case "\x00\x00\x00\x00\x00\x00\x00\x00":
                    return "[Undefined encoding]"
                }
              }
            },
            29: "GPSDateStamp",
            30: {
              name: "GPSDifferential",
              description: function(e) {
                switch (e) {
                  case 0:
                    return "Measurement without differential correction";
                  case 1:
                    return "Differential correction applied";
                  default:
                    return "Unknown"
                }
              }
            }
          },
          interoperability: {
            1: "InteroperabilityIndex",
            2: "UnknownInteroperabilityTag0x0002",
            4097: "UnknownInteroperabilityTag0x1001",
            4098: "UnknownInteroperabilityTag0x1002"
          }
        }, t.prototype.getTagValue = function(e) {
          if (null != this._tags[e]) return this._tags[e].value;
          throw "Undefined"
        }, t.prototype.getTagDescription = function(e) {
          if (null != this._tags[e]) return this._tags[e].description;
          throw "Undefined"
        }, t.prototype.getAllTags = function() {
          return this._tags
        }, t
      }()
    }).call(this)
  },
  470: function(e, t) {
    "use strict";

    function n(e) {
      return e.replace(r, function(e, t) {
        return t.toUpperCase()
      })
    }
    var r = /-(.)/g;
    e.exports = n
  },
  471: function(e, t, n) {
    "use strict";

    function r(e) {
      return i(e.replace(o, "ms-"))
    }
    var i = n(470),
      o = /^-ms-/;
    e.exports = r
  },
  472: function(e, t, n) {
    "use strict";

    function r(e) {
      return !!e && ("object" == typeof e || "function" == typeof e) && "length" in e && !("setInterval" in e) && "number" != typeof e.nodeType && (Array.isArray(e) || "callee" in e || "item" in e)
    }

    function i(e) {
      return r(e) ? Array.isArray(e) ? e.slice() : o(e) : [e]
    }
    var o = n(481);
    e.exports = i
  },
  473: function(e, t, n) {
    "use strict";

    function r(e) {
      var t = e.match(f);
      return t && t[1].toLowerCase()
    }

    function i(e, t) {
      var n = c;
      c ? void 0 : u(!1);
      var i = r(e),
        o = i && s(i);
      if (o) {
        n.innerHTML = o[1] + e + o[2];
        for (var f = o[0]; f--;) n = n.lastChild
      } else n.innerHTML = e;
      var l = n.getElementsByTagName("script");
      l.length && (t ? void 0 : u(!1), a(l).forEach(t));
      for (var h = a(n.childNodes); n.lastChild;) n.removeChild(n.lastChild);
      return h
    }
    var o = n(12),
      a = n(472),
      s = n(201),
      u = n(2),
      c = o.canUseDOM ? document.createElement("div") : null,
      f = /^\s*<(\w+)/;
    e.exports = i
  },
  474: function(e, t) {
    "use strict";

    function n(e) {
      return e === window ? {
        x: window.pageXOffset || document.documentElement.scrollLeft,
        y: window.pageYOffset || document.documentElement.scrollTop
      } : {
        x: e.scrollLeft,
        y: e.scrollTop
      }
    }
    e.exports = n
  },
  475: function(e, t) {
    "use strict";

    function n(e) {
      return e.replace(r, "-$1").toLowerCase()
    }
    var r = /([A-Z])/g;
    e.exports = n
  },
  476: function(e, t, n) {
    "use strict";

    function r(e) {
      return i(e).replace(o, "-ms-")
    }
    var i = n(475),
      o = /^ms-/;
    e.exports = r
  },
  477: function(e, t) {
    "use strict";

    function n(e) {
      return !(!e || !("function" == typeof Node ? e instanceof Node : "object" == typeof e && "number" == typeof e.nodeType && "string" == typeof e.nodeName))
    }
    e.exports = n
  },
  478: function(e, t, n) {
    "use strict";

    function r(e) {
      return i(e) && 3 == e.nodeType
    }
    var i = n(477);
    e.exports = r
  },
  479: function(e, t) {
    "use strict";

    function n(e, t, n) {
      if (!e) return null;
      var i = {};
      for (var o in e) r.call(e, o) && (i[o] = t.call(n, e[o], o, e));
      return i
    }
    var r = Object.prototype.hasOwnProperty;
    e.exports = n
  },
  480: function(e, t) {
    "use strict";

    function n(e) {
      var t = {};
      return function(n) {
        return t.hasOwnProperty(n) || (t[n] = e.call(this, n)), t[n]
      }
    }
    e.exports = n
  },
  481: function(e, t, n) {
    "use strict";

    function r(e) {
      var t = e.length;
      if (Array.isArray(e) || "object" != typeof e && "function" != typeof e ? i(!1) : void 0, "number" != typeof t ? i(!1) : void 0, 0 === t || t - 1 in e ? void 0 : i(!1), e.hasOwnProperty) try {
        return Array.prototype.slice.call(e)
      } catch (n) {}
      for (var r = Array(t), o = 0; t > o; o++) r[o] = e[o];
      return r
    }
    var i = n(2);
    e.exports = r
  },
  493: function(e, t, n) {
    /**
     * filesize
     *
     * @author Jason Mulligan <jason.mulligan@avoidwork.com>
     * @copyright 2014 Jason Mulligan
     * @license BSD-3 <https://raw.github.com/avoidwork/filesize.js/master/LICENSE>
     * @link http://filesizejs.com
     * @module filesize
     * @version 2.0.4
     */
    ! function(t) {
      "use strict";

      function n(e, t) {
        var n, u, c, f, l, h, d, p, m, g, v, b, w = "",
          y = !1,
          _ = 0;
        if (isNaN(e)) throw new Error("Invalid arguments");
        return t = t || {}, c = t.bits === !0, p = t.unix === !0, u = void 0 !== t.base ? t.base : p ? 2 : 10, d = void 0 !== t.round ? t.round : p ? 1 : 2, m = void 0 !== t.spacer ? t.spacer : p ? "" : " ", b = void 0 !== t.suffixes ? t.suffixes : {}, h = Number(e), l = 0 > h, f = u > 2 ? 1e3 : 1024, l && (h = -h), 0 === h ? p ? w = "0" : (g = "B", w = "0" + m + (b[g] || g)) : (n = Math.floor(Math.log(h) / Math.log(1e3)), n > 8 && (_ *= 1e3 * (n - 8), n = 8), _ = 2 === u ? h / Math.pow(2, 10 * n) : h / Math.pow(1e3, n), c && (_ = 8 * _, _ > f && (_ /= f, n++)), w = _.toFixed(n > 0 ? d : 0), g = s[c ? "bits" : "bytes"][n], !y && p ? (c && r.test(g) && (g = g.toLowerCase()), g = g.charAt(0), v = w.replace(o, ""), "B" === g ? g = "" : c || "k" !== g || (g = "K"), a.test(v) && (w = parseInt(w, i).toString()), w += m + (b[g] || g)) : p || (w += m + (b[g] || g))), l && (w = "-" + w), w
      }
      var r = /b$/,
        i = 10,
        o = /.*\./,
        a = /^0$/,
        s = {
          bits: ["B", "kb", "Mb", "Gb", "Tb", "Pb", "Eb", "Zb", "Yb"],
          bytes: ["B", "kB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]
        };
      e.exports = n
    }(this)
  },
  494: function(e, t) {
    function n(e, t) {
      var n = e.getContext("2d"),
        r = n.getImageData(0, 0, t.width, t.height);
      e.width = t.width, e.height = t.height, n.putImageData(r, 0, 0)
    }
    e.exports = n
  },
  495: function(e, t) {
    function n(e, t) {
      var n = new Image;
      return t && (n.onload = t.bind(null, n)), n.src = e, n
    }
    e.exports = n
  },
  496: function(e, t) {
    function n(e, t) {
      return e[t] << 8 | e[t + 1]
    }

    function r(e) {
      var t = e.length,
        r = 0,
        o = 255 == e[0] && 216 == e[1];
      if (o)
        for (r += 2; t > r;) {
          for (; 255 != e[r];) r++;
          for (; 255 == e[r];) r++; {
            if (i[e[r]]) {
              var a = n(e, r + 6),
                s = n(e, r + 4);
              return {
                width: a,
                height: s
              }
            }
            r += n(e, ++r)
          }
        }
    }
    e.exports = r;
    var i = {
      192: !0,
      193: !0,
      194: !0,
      195: !0,
      197: !0,
      198: !0,
      199: !0,
      201: !0,
      202: !0,
      203: !0,
      205: !0,
      206: !0,
      207: !0
    }
  },
  499: function(e, t) {
    function n(e) {
      if (e = e || {}, "object" != typeof e) throw new TypeError("Options must be an object");
      var t = ".";
      this.storage = {}, this.separator = e.separator || t
    }
    var r = Array.prototype.slice;
    n.prototype.add = function(e, t) {
      var n = this.storage[e] || (this.storage[e] = []);
      n.push(t)
    }, n.prototype.remove = function(e) {
      var t, n;
      for (t in this.storage) n = this.storage[t], n.some(function(t, r) {
        return t === e ? (n.splice(r, 1), !0) : void 0
      })
    }, n.prototype.get = function(e) {
      var t, n = [];
      for (t in this.storage) e && e !== t && 0 !== t.indexOf(e + this.separator) || (n = n.concat(this.storage[t]));
      return n
    }, n.prototype.getGrouped = function(e) {
      var t, n = {};
      for (t in this.storage) e && e !== t && 0 !== t.indexOf(e + this.separator) || (n[t] = r.call(this.storage[t]));
      return n
    }, n.prototype.getAll = function(e) {
      var t, n = {};
      for (t in this.storage) e !== t && 0 !== t.indexOf(e + this.separator) || (n[t] = r.call(this.storage[t]));
      return n
    }, n.prototype.run = function(e, t) {
      var n = r.call(arguments, 2);
      this.get(e).forEach(function(e) {
        e.apply(t || this, n)
      })
    }, e.exports = n
  },
  500: function(e, t, n) {
    function r(e) {
      return e.replace(/[^A-Za-z0-9]/g, function(e) {
        return i[e] || e
      })
    }
    var i = n(501);
    r.isLatin = function(e) {
      return e === r(e)
    }, e.exports = r
  },
  501: function(e, t) {
    e.exports = {
      "Á": "A",
      "Ă": "A",
      "Ắ": "A",
      "Ặ": "A",
      "Ằ": "A",
      "Ẳ": "A",
      "Ẵ": "A",
      "Ǎ": "A",
      "Â": "A",
      "Ấ": "A",
      "Ậ": "A",
      "Ầ": "A",
      "Ẩ": "A",
      "Ẫ": "A",
      "Ä": "A",
      "Ǟ": "A",
      "Ȧ": "A",
      "Ǡ": "A",
      "Ạ": "A",
      "Ȁ": "A",
      "À": "A",
      "Ả": "A",
      "Ȃ": "A",
      "Ā": "A",
      "Ą": "A",
      "Å": "A",
      "Ǻ": "A",
      "Ḁ": "A",
      "Ⱥ": "A",
      "Ã": "A",
      "Ꜳ": "AA",
      "Æ": "AE",
      "Ǽ": "AE",
      "Ǣ": "AE",
      "Ꜵ": "AO",
      "Ꜷ": "AU",
      "Ꜹ": "AV",
      "Ꜻ": "AV",
      "Ꜽ": "AY",
      "Ḃ": "B",
      "Ḅ": "B",
      "Ɓ": "B",
      "Ḇ": "B",
      "Ƀ": "B",
      "Ƃ": "B",
      "Ć": "C",
      "Č": "C",
      "Ç": "C",
      "Ḉ": "C",
      "Ĉ": "C",
      "Ċ": "C",
      "Ƈ": "C",
      "Ȼ": "C",
      "Ď": "D",
      "Ḑ": "D",
      "Ḓ": "D",
      "Ḋ": "D",
      "Ḍ": "D",
      "Ɗ": "D",
      "Ḏ": "D",
      "ǲ": "D",
      "ǅ": "D",
      "Đ": "D",
      "Ƌ": "D",
      "Ǳ": "DZ",
      "Ǆ": "DZ",
      "É": "E",
      "Ĕ": "E",
      "Ě": "E",
      "Ȩ": "E",
      "Ḝ": "E",
      "Ê": "E",
      "Ế": "E",
      "Ệ": "E",
      "Ề": "E",
      "Ể": "E",
      "Ễ": "E",
      "Ḙ": "E",
      "Ë": "E",
      "Ė": "E",
      "Ẹ": "E",
      "Ȅ": "E",
      "È": "E",
      "Ẻ": "E",
      "Ȇ": "E",
      "Ē": "E",
      "Ḗ": "E",
      "Ḕ": "E",
      "Ę": "E",
      "Ɇ": "E",
      "Ẽ": "E",
      "Ḛ": "E",
      "Ꝫ": "ET",
      "Ḟ": "F",
      "Ƒ": "F",
      "Ǵ": "G",
      "Ğ": "G",
      "Ǧ": "G",
      "Ģ": "G",
      "Ĝ": "G",
      "Ġ": "G",
      "Ɠ": "G",
      "Ḡ": "G",
      "Ǥ": "G",
      "Ḫ": "H",
      "Ȟ": "H",
      "Ḩ": "H",
      "Ĥ": "H",
      "Ⱨ": "H",
      "Ḧ": "H",
      "Ḣ": "H",
      "Ḥ": "H",
      "Ħ": "H",
      "Í": "I",
      "Ĭ": "I",
      "Ǐ": "I",
      "Î": "I",
      "Ï": "I",
      "Ḯ": "I",
      "İ": "I",
      "Ị": "I",
      "Ȉ": "I",
      "Ì": "I",
      "Ỉ": "I",
      "Ȋ": "I",
      "Ī": "I",
      "Į": "I",
      "Ɨ": "I",
      "Ĩ": "I",
      "Ḭ": "I",
      "Ꝺ": "D",
      "Ꝼ": "F",
      "Ᵹ": "G",
      "Ꞃ": "R",
      "Ꞅ": "S",
      "Ꞇ": "T",
      "Ꝭ": "IS",
      "Ĵ": "J",
      "Ɉ": "J",
      "Ḱ": "K",
      "Ǩ": "K",
      "Ķ": "K",
      "Ⱪ": "K",
      "Ꝃ": "K",
      "Ḳ": "K",
      "Ƙ": "K",
      "Ḵ": "K",
      "Ꝁ": "K",
      "Ꝅ": "K",
      "Ĺ": "L",
      "Ƚ": "L",
      "Ľ": "L",
      "Ļ": "L",
      "Ḽ": "L",
      "Ḷ": "L",
      "Ḹ": "L",
      "Ⱡ": "L",
      "Ꝉ": "L",
      "Ḻ": "L",
      "Ŀ": "L",
      "Ɫ": "L",
      "ǈ": "L",
      "Ł": "L",
      "Ǉ": "LJ",
      "Ḿ": "M",
      "Ṁ": "M",
      "Ṃ": "M",
      "Ɱ": "M",
      "Ń": "N",
      "Ň": "N",
      "Ņ": "N",
      "Ṋ": "N",
      "Ṅ": "N",
      "Ṇ": "N",
      "Ǹ": "N",
      "Ɲ": "N",
      "Ṉ": "N",
      "Ƞ": "N",
      "ǋ": "N",
      "Ñ": "N",
      "Ǌ": "NJ",
      "Ó": "O",
      "Ŏ": "O",
      "Ǒ": "O",
      "Ô": "O",
      "Ố": "O",
      "Ộ": "O",
      "Ồ": "O",
      "Ổ": "O",
      "Ỗ": "O",
      "Ö": "O",
      "Ȫ": "O",
      "Ȯ": "O",
      "Ȱ": "O",
      "Ọ": "O",
      "Ő": "O",
      "Ȍ": "O",
      "Ò": "O",
      "Ỏ": "O",
      "Ơ": "O",
      "Ớ": "O",
      "Ợ": "O",
      "Ờ": "O",
      "Ở": "O",
      "Ỡ": "O",
      "Ȏ": "O",
      "Ꝋ": "O",
      "Ꝍ": "O",
      "Ō": "O",
      "Ṓ": "O",
      "Ṑ": "O",
      "Ɵ": "O",
      "Ǫ": "O",
      "Ǭ": "O",
      "Ø": "O",
      "Ǿ": "O",
      "Õ": "O",
      "Ṍ": "O",
      "Ṏ": "O",
      "Ȭ": "O",
      "Ƣ": "OI",
      "Ꝏ": "OO",
      "Ɛ": "E",
      "Ɔ": "O",
      "Ȣ": "OU",
      "Ṕ": "P",
      "Ṗ": "P",
      "Ꝓ": "P",
      "Ƥ": "P",
      "Ꝕ": "P",
      "Ᵽ": "P",
      "Ꝑ": "P",
      "Ꝙ": "Q",
      "Ꝗ": "Q",
      "Ŕ": "R",
      "Ř": "R",
      "Ŗ": "R",
      "Ṙ": "R",
      "Ṛ": "R",
      "Ṝ": "R",
      "Ȑ": "R",
      "Ȓ": "R",
      "Ṟ": "R",
      "Ɍ": "R",
      "Ɽ": "R",
      "Ꜿ": "C",
      "Ǝ": "E",
      "Ś": "S",
      "Ṥ": "S",
      "Š": "S",
      "Ṧ": "S",
      "Ş": "S",
      "Ŝ": "S",
      "Ș": "S",
      "Ṡ": "S",
      "Ṣ": "S",
      "Ṩ": "S",
      "ẞ": "SS",
      "Ť": "T",
      "Ţ": "T",
      "Ṱ": "T",
      "Ț": "T",
      "Ⱦ": "T",
      "Ṫ": "T",
      "Ṭ": "T",
      "Ƭ": "T",
      "Ṯ": "T",
      "Ʈ": "T",
      "Ŧ": "T",
      "Ɐ": "A",
      "Ꞁ": "L",
      "Ɯ": "M",
      "Ʌ": "V",
      "Ꜩ": "TZ",
      "Ú": "U",
      "Ŭ": "U",
      "Ǔ": "U",
      "Û": "U",
      "Ṷ": "U",
      "Ü": "U",
      "Ǘ": "U",
      "Ǚ": "U",
      "Ǜ": "U",
      "Ǖ": "U",
      "Ṳ": "U",
      "Ụ": "U",
      "Ű": "U",
      "Ȕ": "U",
      "Ù": "U",
      "Ủ": "U",
      "Ư": "U",
      "Ứ": "U",
      "Ự": "U",
      "Ừ": "U",
      "Ử": "U",
      "Ữ": "U",
      "Ȗ": "U",
      "Ū": "U",
      "Ṻ": "U",
      "Ų": "U",
      "Ů": "U",
      "Ũ": "U",
      "Ṹ": "U",
      "Ṵ": "U",
      "Ꝟ": "V",
      "Ṿ": "V",
      "Ʋ": "V",
      "Ṽ": "V",
      "Ꝡ": "VY",
      "Ẃ": "W",
      "Ŵ": "W",
      "Ẅ": "W",
      "Ẇ": "W",
      "Ẉ": "W",
      "Ẁ": "W",
      "Ⱳ": "W",
      "Ẍ": "X",
      "Ẋ": "X",
      "Ý": "Y",
      "Ŷ": "Y",
      "Ÿ": "Y",
      "Ẏ": "Y",
      "Ỵ": "Y",
      "Ỳ": "Y",
      "Ƴ": "Y",
      "Ỷ": "Y",
      "Ỿ": "Y",
      "Ȳ": "Y",
      "Ɏ": "Y",
      "Ỹ": "Y",
      "Ź": "Z",
      "Ž": "Z",
      "Ẑ": "Z",
      "Ⱬ": "Z",
      "Ż": "Z",
      "Ẓ": "Z",
      "Ȥ": "Z",
      "Ẕ": "Z",
      "Ƶ": "Z",
      "Ĳ": "IJ",
      "Œ": "OE",
      "ᴀ": "A",
      "ᴁ": "AE",
      "ʙ": "B",
      "ᴃ": "B",
      "ᴄ": "C",
      "ᴅ": "D",
      "ᴇ": "E",
      "ꜰ": "F",
      "ɢ": "G",
      "ʛ": "G",
      "ʜ": "H",
      "ɪ": "I",
      "ʁ": "R",
      "ᴊ": "J",
      "ᴋ": "K",
      "ʟ": "L",
      "ᴌ": "L",
      "ᴍ": "M",
      "ɴ": "N",
      "ᴏ": "O",
      "ɶ": "OE",
      "ᴐ": "O",
      "ᴕ": "OU",
      "ᴘ": "P",
      "ʀ": "R",
      "ᴎ": "N",
      "ᴙ": "R",
      "ꜱ": "S",
      "ᴛ": "T",
      "ⱻ": "E",
      "ᴚ": "R",
      "ᴜ": "U",
      "ᴠ": "V",
      "ᴡ": "W",
      "ʏ": "Y",
      "ᴢ": "Z",
      "á": "a",
      "ă": "a",
      "ắ": "a",
      "ặ": "a",
      "ằ": "a",
      "ẳ": "a",
      "ẵ": "a",
      "ǎ": "a",
      "â": "a",
      "ấ": "a",
      "ậ": "a",
      "ầ": "a",
      "ẩ": "a",
      "ẫ": "a",
      "ä": "a",
      "ǟ": "a",
      "ȧ": "a",
      "ǡ": "a",
      "ạ": "a",
      "ȁ": "a",
      "à": "a",
      "ả": "a",
      "ȃ": "a",
      "ā": "a",
      "ą": "a",
      "ᶏ": "a",
      "ẚ": "a",
      "å": "a",
      "ǻ": "a",
      "ḁ": "a",
      "ⱥ": "a",
      "ã": "a",
      "ꜳ": "aa",
      "æ": "ae",
      "ǽ": "ae",
      "ǣ": "ae",
      "ꜵ": "ao",
      "ꜷ": "au",
      "ꜹ": "av",
      "ꜻ": "av",
      "ꜽ": "ay",
      "ḃ": "b",
      "ḅ": "b",
      "ɓ": "b",
      "ḇ": "b",
      "ᵬ": "b",
      "ᶀ": "b",
      "ƀ": "b",
      "ƃ": "b",
      "ɵ": "o",
      "ć": "c",
      "č": "c",
      "ç": "c",
      "ḉ": "c",
      "ĉ": "c",
      "ɕ": "c",
      "ċ": "c",
      "ƈ": "c",
      "ȼ": "c",
      "ď": "d",
      "ḑ": "d",
      "ḓ": "d",
      "ȡ": "d",
      "ḋ": "d",
      "ḍ": "d",
      "ɗ": "d",
      "ᶑ": "d",
      "ḏ": "d",
      "ᵭ": "d",
      "ᶁ": "d",
      "đ": "d",
      "ɖ": "d",
      "ƌ": "d",
      "ı": "i",
      "ȷ": "j",
      "ɟ": "j",
      "ʄ": "j",
      "ǳ": "dz",
      "ǆ": "dz",
      "é": "e",
      "ĕ": "e",
      "ě": "e",
      "ȩ": "e",
      "ḝ": "e",
      "ê": "e",
      "ế": "e",
      "ệ": "e",
      "ề": "e",
      "ể": "e",
      "ễ": "e",
      "ḙ": "e",
      "ë": "e",
      "ė": "e",
      "ẹ": "e",
      "ȅ": "e",
      "è": "e",
      "ẻ": "e",
      "ȇ": "e",
      "ē": "e",
      "ḗ": "e",
      "ḕ": "e",
      "ⱸ": "e",
      "ę": "e",
      "ᶒ": "e",
      "ɇ": "e",
      "ẽ": "e",
      "ḛ": "e",
      "ꝫ": "et",
      "ḟ": "f",
      "ƒ": "f",
      "ᵮ": "f",
      "ᶂ": "f",
      "ǵ": "g",
      "ğ": "g",
      "ǧ": "g",
      "ģ": "g",
      "ĝ": "g",
      "ġ": "g",
      "ɠ": "g",
      "ḡ": "g",
      "ᶃ": "g",
      "ǥ": "g",
      "ḫ": "h",
      "ȟ": "h",
      "ḩ": "h",
      "ĥ": "h",
      "ⱨ": "h",
      "ḧ": "h",
      "ḣ": "h",
      "ḥ": "h",
      "ɦ": "h",
      "ẖ": "h",
      "ħ": "h",
      "ƕ": "hv",
      "í": "i",
      "ĭ": "i",
      "ǐ": "i",
      "î": "i",
      "ï": "i",
      "ḯ": "i",
      "ị": "i",
      "ȉ": "i",
      "ì": "i",
      "ỉ": "i",
      "ȋ": "i",
      "ī": "i",
      "į": "i",
      "ᶖ": "i",
      "ɨ": "i",
      "ĩ": "i",
      "ḭ": "i",
      "ꝺ": "d",
      "ꝼ": "f",
      "ᵹ": "g",
      "ꞃ": "r",
      "ꞅ": "s",
      "ꞇ": "t",
      "ꝭ": "is",
      "ǰ": "j",
      "ĵ": "j",
      "ʝ": "j",
      "ɉ": "j",
      "ḱ": "k",
      "ǩ": "k",
      "ķ": "k",
      "ⱪ": "k",
      "ꝃ": "k",
      "ḳ": "k",
      "ƙ": "k",
      "ḵ": "k",
      "ᶄ": "k",
      "ꝁ": "k",
      "ꝅ": "k",
      "ĺ": "l",
      "ƚ": "l",
      "ɬ": "l",
      "ľ": "l",
      "ļ": "l",
      "ḽ": "l",
      "ȴ": "l",
      "ḷ": "l",
      "ḹ": "l",
      "ⱡ": "l",
      "ꝉ": "l",
      "ḻ": "l",
      "ŀ": "l",
      "ɫ": "l",
      "ᶅ": "l",
      "ɭ": "l",
      "ł": "l",
      "ǉ": "lj",
      "ſ": "s",
      "ẜ": "s",
      "ẛ": "s",
      "ẝ": "s",
      "ḿ": "m",
      "ṁ": "m",
      "ṃ": "m",
      "ɱ": "m",
      "ᵯ": "m",
      "ᶆ": "m",
      "ń": "n",
      "ň": "n",
      "ņ": "n",
      "ṋ": "n",
      "ȵ": "n",
      "ṅ": "n",
      "ṇ": "n",
      "ǹ": "n",
      "ɲ": "n",
      "ṉ": "n",
      "ƞ": "n",
      "ᵰ": "n",
      "ᶇ": "n",
      "ɳ": "n",
      "ñ": "n",
      "ǌ": "nj",
      "ó": "o",
      "ŏ": "o",
      "ǒ": "o",
      "ô": "o",
      "ố": "o",
      "ộ": "o",
      "ồ": "o",
      "ổ": "o",
      "ỗ": "o",
      "ö": "o",
      "ȫ": "o",
      "ȯ": "o",
      "ȱ": "o",
      "ọ": "o",
      "ő": "o",
      "ȍ": "o",
      "ò": "o",
      "ỏ": "o",
      "ơ": "o",
      "ớ": "o",
      "ợ": "o",
      "ờ": "o",
      "ở": "o",
      "ỡ": "o",
      "ȏ": "o",
      "ꝋ": "o",
      "ꝍ": "o",
      "ⱺ": "o",
      "ō": "o",
      "ṓ": "o",
      "ṑ": "o",
      "ǫ": "o",
      "ǭ": "o",
      "ø": "o",
      "ǿ": "o",
      "õ": "o",
      "ṍ": "o",
      "ṏ": "o",
      "ȭ": "o",
      "ƣ": "oi",
      "ꝏ": "oo",
      "ɛ": "e",
      "ᶓ": "e",
      "ɔ": "o",
      "ᶗ": "o",
      "ȣ": "ou",
      "ṕ": "p",
      "ṗ": "p",
      "ꝓ": "p",
      "ƥ": "p",
      "ᵱ": "p",
      "ᶈ": "p",
      "ꝕ": "p",
      "ᵽ": "p",
      "ꝑ": "p",
      "ꝙ": "q",
      "ʠ": "q",
      "ɋ": "q",
      "ꝗ": "q",
      "ŕ": "r",
      "ř": "r",
      "ŗ": "r",
      "ṙ": "r",
      "ṛ": "r",
      "ṝ": "r",
      "ȑ": "r",
      "ɾ": "r",
      "ᵳ": "r",
      "ȓ": "r",
      "ṟ": "r",
      "ɼ": "r",
      "ᵲ": "r",
      "ᶉ": "r",
      "ɍ": "r",
      "ɽ": "r",
      "ↄ": "c",
      "ꜿ": "c",
      "ɘ": "e",
      "ɿ": "r",
      "ś": "s",
      "ṥ": "s",
      "š": "s",
      "ṧ": "s",
      "ş": "s",
      "ŝ": "s",
      "ș": "s",
      "ṡ": "s",
      "ṣ": "s",
      "ṩ": "s",
      "ʂ": "s",
      "ᵴ": "s",
      "ᶊ": "s",
      "ȿ": "s",
      "ɡ": "g",
      "ß": "ss",
      "ᴑ": "o",
      "ᴓ": "o",
      "ᴝ": "u",
      "ť": "t",
      "ţ": "t",
      "ṱ": "t",
      "ț": "t",
      "ȶ": "t",
      "ẗ": "t",
      "ⱦ": "t",
      "ṫ": "t",
      "ṭ": "t",
      "ƭ": "t",
      "ṯ": "t",
      "ᵵ": "t",
      "ƫ": "t",
      "ʈ": "t",
      "ŧ": "t",
      "ᵺ": "th",
      "ɐ": "a",
      "ᴂ": "ae",
      "ǝ": "e",
      "ᵷ": "g",
      "ɥ": "h",
      "ʮ": "h",
      "ʯ": "h",
      "ᴉ": "i",
      "ʞ": "k",
      "ꞁ": "l",
      "ɯ": "m",
      "ɰ": "m",
      "ᴔ": "oe",
      "ɹ": "r",
      "ɻ": "r",
      "ɺ": "r",
      "ⱹ": "r",
      "ʇ": "t",
      "ʌ": "v",
      "ʍ": "w",
      "ʎ": "y",
      "ꜩ": "tz",
      "ú": "u",
      "ŭ": "u",
      "ǔ": "u",
      "û": "u",
      "ṷ": "u",
      "ü": "u",
      "ǘ": "u",
      "ǚ": "u",
      "ǜ": "u",
      "ǖ": "u",
      "ṳ": "u",
      "ụ": "u",
      "ű": "u",
      "ȕ": "u",
      "ù": "u",
      "ủ": "u",
      "ư": "u",
      "ứ": "u",
      "ự": "u",
      "ừ": "u",
      "ử": "u",
      "ữ": "u",
      "ȗ": "u",
      "ū": "u",
      "ṻ": "u",
      "ų": "u",
      "ᶙ": "u",
      "ů": "u",
      "ũ": "u",
      "ṹ": "u",
      "ṵ": "u",
      "ᵫ": "ue",
      "ꝸ": "um",
      "ⱴ": "v",
      "ꝟ": "v",
      "ṿ": "v",
      "ʋ": "v",
      "ᶌ": "v",
      "ⱱ": "v",
      "ṽ": "v",
      "ꝡ": "vy",
      "ẃ": "w",
      "ŵ": "w",
      "ẅ": "w",
      "ẇ": "w",
      "ẉ": "w",
      "ẁ": "w",
      "ⱳ": "w",
      "ẘ": "w",
      "ẍ": "x",
      "ẋ": "x",
      "ᶍ": "x",
      "ý": "y",
      "ŷ": "y",
      "ÿ": "y",
      "ẏ": "y",
      "ỵ": "y",
      "ỳ": "y",
      "ƴ": "y",
      "ỷ": "y",
      "ỿ": "y",
      "ȳ": "y",
      "ẙ": "y",
      "ɏ": "y",
      "ỹ": "y",
      "ź": "z",
      "ž": "z",
      "ẑ": "z",
      "ʑ": "z",
      "ⱬ": "z",
      "ż": "z",
      "ẓ": "z",
      "ȥ": "z",
      "ẕ": "z",
      "ᵶ": "z",
      "ᶎ": "z",
      "ʐ": "z",
      "ƶ": "z",
      "ɀ": "z",
      "ﬀ": "ff",
      "ﬃ": "ffi",
      "ﬄ": "ffl",
      "ﬁ": "fi",
      "ﬂ": "fl",
      "ĳ": "ij",
      "œ": "oe",
      "ﬆ": "st",
      "ₐ": "a",
      "ₑ": "e",
      "ᵢ": "i",
      "ⱼ": "j",
      "ₒ": "o",
      "ᵣ": "r",
      "ᵤ": "u",
      "ᵥ": "v",
      "ₓ": "x",
      "Ё": "YO",
      "Й": "I",
      "Ц": "TS",
      "У": "U",
      "К": "K",
      "Е": "E",
      "Н": "N",
      "Г": "G",
      "Ш": "SH",
      "Щ": "SCH",
      "З": "Z",
      "Х": "H",
      "Ъ": "",
      "ё": "yo",
      "й": "i",
      "ц": "ts",
      "у": "u",
      "к": "k",
      "е": "e",
      "н": "n",
      "г": "g",
      "ш": "sh",
      "щ": "sch",
      "з": "z",
      "х": "h",
      "ъ": "",
      "Ф": "F",
      "Ы": "I",
      "В": "V",
      "А": "A",
      "П": "P",
      "Р": "R",
      "О": "O",
      "Л": "L",
      "Д": "D",
      "Ж": "ZH",
      "Э": "E",
      "ф": "f",
      "ы": "i",
      "в": "v",
      "а": "a",
      "п": "p",
      "р": "r",
      "о": "o",
      "л": "l",
      "д": "d",
      "ж": "zh",
      "э": "e",
      "Я": "Ya",
      "Ч": "CH",
      "С": "S",
      "М": "M",
      "И": "I",
      "Т": "T",
      "Ь": "",
      "Б": "B",
      "Ю": "YU",
      "я": "ya",
      "ч": "ch",
      "с": "s",
      "м": "m",
      "и": "i",
      "т": "t",
      "ь": "",
      "б": "b",
      "ю": "yu"
    }
  },
  562: function(e, t, n) {
    var r;
    ! function(i, o, a) {
      function s(e, t, n) {
        return e.addEventListener ? void e.addEventListener(t, n, !1) : void e.attachEvent("on" + t, n)
      }

      function u(e) {
        if ("keypress" == e.type) {
          var t = String.fromCharCode(e.which);
          return e.shiftKey || (t = t.toLowerCase()), t
        }
        return _[e.which] ? _[e.which] : k[e.which] ? k[e.which] : String.fromCharCode(e.which).toLowerCase()
      }

      function c(e, t) {
        return e.sort().join(",") === t.sort().join(",")
      }

      function f(e) {
        var t = [];
        return e.shiftKey && t.push("shift"), e.altKey && t.push("alt"), e.ctrlKey && t.push("ctrl"), e.metaKey && t.push("meta"), t
      }

      function l(e) {
        return e.preventDefault ? void e.preventDefault() : void(e.returnValue = !1)
      }

      function h(e) {
        return e.stopPropagation ? void e.stopPropagation() : void(e.cancelBubble = !0)
      }

      function d(e) {
        return "shift" == e || "ctrl" == e || "alt" == e || "meta" == e
      }

      function p() {
        if (!y) {
          y = {};
          for (var e in _) e > 95 && 112 > e || _.hasOwnProperty(e) && (y[_[e]] = e)
        }
        return y
      }

      function m(e, t, n) {
        return n || (n = p()[e] ? "keydown" : "keypress"), "keypress" == n && t.length && (n = "keydown"), n
      }

      function g(e) {
        return "+" === e ? ["+"] : (e = e.replace(/\+{2}/g, "+plus"), e.split("+"))
      }

      function v(e, t) {
        var n, r, i, o = [];
        for (n = g(e), i = 0; i < n.length; ++i) r = n[i], S[r] && (r = S[r]), t && "keypress" != t && x[r] && (r = x[r], o.push("shift")), d(r) && o.push(r);
        return t = m(r, o, t), {
          key: r,
          modifiers: o,
          action: t
        }
      }

      function b(e, t) {
        return null === e || e === o ? !1 : e === t ? !0 : b(e.parentNode, t)
      }

      function w(e) {
        function t(e) {
          e = e || {};
          var t, n = !1;
          for (t in y) e[t] ? n = !0 : y[t] = 0;
          n || (x = !1)
        }

        function n(e, t, n, r, i, o) {
          var a, s, u = [],
            f = n.type;
          if (!g._callbacks[e]) return [];
          for ("keyup" == f && d(e) && (t = [e]), a = 0; a < g._callbacks[e].length; ++a)
            if (s = g._callbacks[e][a], (r || !s.seq || y[s.seq] == s.level) && f == s.action && ("keypress" == f && !n.metaKey && !n.ctrlKey || c(t, s.modifiers))) {
              var l = !r && s.combo == i,
                h = r && s.seq == r && s.level == o;
              (l || h) && g._callbacks[e].splice(a, 1), u.push(s)
            }
          return u
        }

        function r(e, t, n, r) {
          g.stopCallback(t, t.target || t.srcElement, n, r) || e(t, n) === !1 && (l(t), h(t))
        }

        function i(e) {
          "number" != typeof e.which && (e.which = e.keyCode);
          var t = u(e);
          if (t) return "keyup" == e.type && _ === t ? void(_ = !1) : void g.handleKey(t, f(e), e)
        }

        function a() {
          clearTimeout(b), b = setTimeout(t, 1e3)
        }

        function p(e, n, i, o) {
          function s(t) {
            return function() {
              x = t, ++y[e], a()
            }
          }

          function c(n) {
            r(i, n, e), "keyup" !== o && (_ = u(n)), setTimeout(t, 10)
          }
          y[e] = 0;
          for (var f = 0; f < n.length; ++f) {
            var l = f + 1 === n.length,
              h = l ? c : s(o || v(n[f + 1]).action);
            m(n[f], h, o, e, f)
          }
        }

        function m(e, t, r, i, o) {
          g._directMap[e + ":" + r] = t, e = e.replace(/\s+/g, " ");
          var a, s = e.split(" ");
          return s.length > 1 ? void p(e, s, t, r) : (a = v(e, r), g._callbacks[a.key] = g._callbacks[a.key] || [], n(a.key, a.modifiers, {
            type: a.action
          }, i, e, o), void g._callbacks[a.key][i ? "unshift" : "push"]({
            callback: t,
            modifiers: a.modifiers,
            action: a.action,
            seq: i,
            level: o,
            combo: e
          }))
        }
        var g = this;
        if (e = e || o, !(g instanceof w)) return new w(e);
        g.target = e, g._callbacks = {}, g._directMap = {};
        var b, y = {},
          _ = !1,
          k = !1,
          x = !1;
        g._handleKey = function(e, i, o) {
          var a, s = n(e, i, o),
            u = {},
            c = 0,
            f = !1;
          for (a = 0; a < s.length; ++a) s[a].seq && (c = Math.max(c, s[a].level));
          for (a = 0; a < s.length; ++a)
            if (s[a].seq) {
              if (s[a].level != c) continue;
              f = !0, u[s[a].seq] = 1, r(s[a].callback, o, s[a].combo, s[a].seq)
            } else f || r(s[a].callback, o, s[a].combo);
          var l = "keypress" == o.type && k;
          o.type != x || d(e) || l || t(u), k = f && "keydown" == o.type
        }, g._bindMultiple = function(e, t, n) {
          for (var r = 0; r < e.length; ++r) m(e[r], t, n)
        }, s(e, "keypress", i), s(e, "keydown", i), s(e, "keyup", i)
      }
      for (var y, _ = {
          8: "backspace",
          9: "tab",
          13: "enter",
          16: "shift",
          17: "ctrl",
          18: "alt",
          20: "capslock",
          27: "esc",
          32: "space",
          33: "pageup",
          34: "pagedown",
          35: "end",
          36: "home",
          37: "left",
          38: "up",
          39: "right",
          40: "down",
          45: "ins",
          46: "del",
          91: "meta",
          93: "meta",
          224: "meta"
        }, k = {
          106: "*",
          107: "+",
          109: "-",
          110: ".",
          111: "/",
          186: ";",
          187: "=",
          188: ",",
          189: "-",
          190: ".",
          191: "/",
          192: "`",
          219: "[",
          220: "\\",
          221: "]",
          222: "'"
        }, x = {
          "~": "`",
          "!": "1",
          "@": "2",
          "#": "3",
          $: "4",
          "%": "5",
          "^": "6",
          "&": "7",
          "*": "8",
          "(": "9",
          ")": "0",
          _: "-",
          "+": "=",
          ":": ";",
          '"': "'",
          "<": ",",
          ">": ".",
          "?": "/",
          "|": "\\"
        }, S = {
          option: "alt",
          command: "meta",
          "return": "enter",
          escape: "esc",
          plus: "+",
          mod: /Mac|iPod|iPhone|iPad/.test(navigator.platform) ? "meta" : "ctrl"
        }, A = 1; 20 > A; ++A) _[111 + A] = "f" + A;
      for (A = 0; 9 >= A; ++A) _[A + 96] = A;
      w.prototype.bind = function(e, t, n) {
        var r = this;
        return e = e instanceof Array ? e : [e], r._bindMultiple.call(r, e, t, n), r
      }, w.prototype.unbind = function(e, t) {
        var n = this;
        return n.bind.call(n, e, function() {}, t)
      }, w.prototype.trigger = function(e, t) {
        var n = this;
        return n._directMap[e + ":" + t] && n._directMap[e + ":" + t]({}, e), n
      }, w.prototype.reset = function() {
        var e = this;
        return e._callbacks = {}, e._directMap = {}, e
      }, w.prototype.stopCallback = function(e, t) {
        var n = this;
        return (" " + t.className + " ").indexOf(" mousetrap ") > -1 ? !1 : b(t, n.target) ? !1 : "INPUT" == t.tagName || "SELECT" == t.tagName || "TEXTAREA" == t.tagName || t.isContentEditable
      }, w.prototype.handleKey = function() {
        var e = this;
        return e._handleKey.apply(e, arguments)
      }, w.init = function() {
        var e = w(o);
        for (var t in e) "_" !== t.charAt(0) && (w[t] = function(t) {
          return function() {
            return e[t].apply(e, arguments)
          }
        }(t))
      }, w.init(), i.Mousetrap = w, "undefined" != typeof e && e.exports && (e.exports = w), r = function() {
        return w
      }.call(t, n, t, e), !(r !== a && (e.exports = r))
    }(window, document)
  },
  563: function(e, t) {
    function n() {
      c = !1, a.length ? u = a.concat(u) : f = -1, u.length && r()
    }

    function r() {
      if (!c) {
        var e = setTimeout(n);
        c = !0;
        for (var t = u.length; t;) {
          for (a = u, u = []; ++f < t;) a && a[f].run();
          f = -1, t = u.length
        }
        a = null, c = !1, clearTimeout(e)
      }
    }

    function i(e, t) {
      this.fun = e, this.array = t
    }

    function o() {}
    var a, s = e.exports = {},
      u = [],
      c = !1,
      f = -1;
    s.nextTick = function(e) {
      var t = new Array(arguments.length - 1);
      if (arguments.length > 1)
        for (var n = 1; n < arguments.length; n++) t[n - 1] = arguments[n];
      u.push(new i(e, t)), 1 !== u.length || c || setTimeout(r, 0)
    }, i.prototype.run = function() {
      this.fun.apply(null, this.array)
    }, s.title = "browser", s.browser = !0, s.env = {}, s.argv = [], s.version = "", s.versions = {}, s.on = o, s.addListener = o, s.once = o, s.off = o, s.removeListener = o, s.removeAllListeners = o, s.emit = o, s.binding = function(e) {
      throw new Error("process.binding is not supported")
    }, s.cwd = function() {
      return "/"
    }, s.chdir = function(e) {
      throw new Error("process.chdir is not supported")
    }, s.umask = function() {
      return 0
    }
  },
  564: function(e, t) {
    function n(e, t) {
      return e[t] << 24 | e[t + 1] << 16 | e[t + 2] << 8 | e[t + 3]
    }

    function r(e) {
      return {
        width: n(e, 16),
        height: n(e, 20)
      }
    }
    e.exports = r
  },
  565: function(e, t) {
    function n() {
      if (!a) {
        a = !0;
        for (var e, t = o.length; t;) {
          e = o, o = [];
          for (var n = -1; ++n < t;) e[n]();
          t = o.length
        }
        a = !1
      }
    }

    function r() {}
    var i = e.exports = {},
      o = [],
      a = !1;
    i.nextTick = function(e) {
      o.push(e), a || setTimeout(n, 0)
    }, i.title = "browser", i.browser = !0, i.env = {}, i.argv = [], i.version = "", i.versions = {}, i.on = r, i.addListener = r, i.once = r, i.off = r, i.removeListener = r, i.removeAllListeners = r, i.emit = r, i.binding = function(e) {
      throw new Error("process.binding is not supported")
    }, i.cwd = function() {
      return "/"
    }, i.chdir = function(e) {
      throw new Error("process.chdir is not supported")
    }, i.umask = function() {
      return 0
    }
  },
  625: function(e, t) {
    e.exports = function(e, t) {
      var n = t.x || 0,
        r = t.y || 0;
      t.degrees && (t.radians = t.degrees * (Math.PI / 180)), e.translate(n, r), e.rotate(t.radians), e.translate(-n, -r)
    }
  },
  626: function(e, t) {
    function n() {
      c = !1, a.length ? u = a.concat(u) : f = -1, u.length && r()
    }

    function r() {
      if (!c) {
        var e = setTimeout(n);
        c = !0;
        for (var t = u.length; t;) {
          for (a = u, u = []; ++f < t;) a && a[f].run();
          f = -1, t = u.length
        }
        a = null, c = !1, clearTimeout(e)
      }
    }

    function i(e, t) {
      this.fun = e, this.array = t
    }

    function o() {}
    var a, s = e.exports = {},
      u = [],
      c = !1,
      f = -1;
    s.nextTick = function(e) {
      var t = new Array(arguments.length - 1);
      if (arguments.length > 1)
        for (var n = 1; n < arguments.length; n++) t[n - 1] = arguments[n];
      u.push(new i(e, t)), 1 !== u.length || c || setTimeout(r, 0)
    }, i.prototype.run = function() {
      this.fun.apply(null, this.array)
    }, s.title = "browser", s.browser = !0, s.env = {}, s.argv = [], s.version = "", s.versions = {}, s.on = o, s.addListener = o, s.once = o, s.off = o, s.removeListener = o, s.removeAllListeners = o, s.emit = o, s.binding = function(e) {
      throw new Error("process.binding is not supported")
    }, s.cwd = function() {
      return "/"
    }, s.chdir = function(e) {
      throw new Error("process.chdir is not supported")
    }, s.umask = function() {
      return 0
    }
  },
  627: function(e, t, n) {
    var r;
    ! function(i, o) {
      "use strict";
      var a = "0.7.9",
        s = "",
        u = "?",
        c = "function",
        f = "undefined",
        l = "object",
        h = "string",
        d = "major",
        p = "model",
        m = "name",
        g = "type",
        v = "vendor",
        b = "version",
        w = "architecture",
        y = "console",
        _ = "mobile",
        k = "tablet",
        x = "smarttv",
        S = "wearable",
        A = "embedded",
        O = {
          extend: function(e, t) {
            for (var n in t) - 1 !== "browser cpu device engine os".indexOf(n) && t[n].length % 2 === 0 && (e[n] = t[n].concat(e[n]));
            return e
          },
          has: function(e, t) {
            return "string" == typeof e ? -1 !== t.toLowerCase().indexOf(e.toLowerCase()) : !1
          },
          lowerize: function(e) {
            return e.toLowerCase()
          },
          major: function(e) {
            return typeof e === h ? e.split(".")[0] : o
          }
        },
        P = {
          rgx: function() {
            for (var e, t, n, r, i, a, s, u = 0, h = arguments; u < h.length && !a;) {
              var d = h[u],
                p = h[u + 1];
              if (typeof e === f) {
                e = {};
                for (r in p) i = p[r], typeof i === l ? e[i[0]] = o : e[i] = o
              }
              for (t = n = 0; t < d.length && !a;)
                if (a = d[t++].exec(this.getUA()))
                  for (r = 0; r < p.length; r++) s = a[++n], i = p[r], typeof i === l && i.length > 0 ? 2 == i.length ? typeof i[1] == c ? e[i[0]] = i[1].call(this, s) : e[i[0]] = i[1] : 3 == i.length ? typeof i[1] !== c || i[1].exec && i[1].test ? e[i[0]] = s ? s.replace(i[1], i[2]) : o : e[i[0]] = s ? i[1].call(this, s, i[2]) : o : 4 == i.length && (e[i[0]] = s ? i[3].call(this, s.replace(i[1], i[2])) : o) : e[i] = s ? s : o;
              u += 2
            }
            return e
          },
          str: function(e, t) {
            for (var n in t)
              if (typeof t[n] === l && t[n].length > 0) {
                for (var r = 0; r < t[n].length; r++)
                  if (O.has(t[n][r], e)) return n === u ? o : n
              } else if (O.has(t[n], e)) return n === u ? o : n;
            return e
          }
        },
        E = {
          browser: {
            oldsafari: {
              version: {
                "1.0": "/8",
                1.2: "/1",
                1.3: "/3",
                "2.0": "/412",
                "2.0.2": "/416",
                "2.0.3": "/417",
                "2.0.4": "/419",
                "?": "/"
              }
            }
          },
          device: {
            amazon: {
              model: {
                "Fire Phone": ["SD", "KF"]
              }
            },
            sprint: {
              model: {
                "Evo Shift 4G": "7373KT"
              },
              vendor: {
                HTC: "APA",
                Sprint: "Sprint"
              }
            }
          },
          os: {
            windows: {
              version: {
                ME: "4.90",
                "NT 3.11": "NT3.51",
                "NT 4.0": "NT4.0",
                2000: "NT 5.0",
                XP: ["NT 5.1", "NT 5.2"],
                Vista: "NT 6.0",
                7: "NT 6.1",
                8: "NT 6.2",
                8.1: "NT 6.3",
                10: ["NT 6.4", "NT 10.0"],
                RT: "ARM"
              }
            }
          }
        },
        T = {
          browser: [
            [/(opera\smini)\/([\w\.-]+)/i, /(opera\s[mobiletab]+).+version\/([\w\.-]+)/i, /(opera).+version\/([\w\.]+)/i, /(opera)[\/\s]+([\w\.]+)/i],
            [m, b],
            [/\s(opr)\/([\w\.]+)/i],
            [
              [m, "Opera"], b
            ],
            [/(kindle)\/([\w\.]+)/i, /(lunascape|maxthon|netfront|jasmine|blazer)[\/\s]?([\w\.]+)*/i, /(avant\s|iemobile|slim|baidu)(?:browser)?[\/\s]?([\w\.]*)/i, /(?:ms|\()(ie)\s([\w\.]+)/i, /(rekonq)\/([\w\.]+)*/i, /(chromium|flock|rockmelt|midori|epiphany|silk|skyfire|ovibrowser|bolt|iron|vivaldi|iridium)\/([\w\.-]+)/i],
            [m, b],
            [/(trident).+rv[:\s]([\w\.]+).+like\sgecko/i],
            [
              [m, "IE"], b
            ],
            [/(edge)\/((\d+)?[\w\.]+)/i],
            [m, b],
            [/(yabrowser)\/([\w\.]+)/i],
            [
              [m, "Yandex"], b
            ],
            [/(comodo_dragon)\/([\w\.]+)/i],
            [
              [m, /_/g, " "], b
            ],
            [/(chrome|omniweb|arora|[tizenoka]{5}\s?browser)\/v?([\w\.]+)/i, /(uc\s?browser|qqbrowser)[\/\s]?([\w\.]+)/i],
            [m, b],
            [/(dolfin)\/([\w\.]+)/i],
            [
              [m, "Dolphin"], b
            ],
            [/((?:android.+)crmo|crios)\/([\w\.]+)/i],
            [
              [m, "Chrome"], b
            ],
            [/XiaoMi\/MiuiBrowser\/([\w\.]+)/i],
            [b, [m, "MIUI Browser"]],
            [/android.+version\/([\w\.]+)\s+(?:mobile\s?safari|safari)/i],
            [b, [m, "Android Browser"]],
            [/FBAV\/([\w\.]+);/i],
            [b, [m, "Facebook"]],
            [/version\/([\w\.]+).+?mobile\/\w+\s(safari)/i],
            [b, [m, "Mobile Safari"]],
            [/version\/([\w\.]+).+?(mobile\s?safari|safari)/i],
            [b, m],
            [/webkit.+?(mobile\s?safari|safari)(\/[\w\.]+)/i],
            [m, [b, P.str, E.browser.oldsafari.version]],
            [/(konqueror)\/([\w\.]+)/i, /(webkit|khtml)\/([\w\.]+)/i],
            [m, b],
            [/(navigator|netscape)\/([\w\.-]+)/i],
            [
              [m, "Netscape"], b
            ],
            [/fxios\/([\w\.-]+)/i],
            [b, [m, "Firefox"]],
            [/(swiftfox)/i, /(icedragon|iceweasel|camino|chimera|fennec|maemo\sbrowser|minimo|conkeror)[\/\s]?([\w\.\+]+)/i, /(firefox|seamonkey|k-meleon|icecat|iceape|firebird|phoenix)\/([\w\.-]+)/i, /(mozilla)\/([\w\.]+).+rv\:.+gecko\/\d+/i, /(polaris|lynx|dillo|icab|doris|amaya|w3m|netsurf)[\/\s]?([\w\.]+)/i, /(links)\s\(([\w\.]+)/i, /(gobrowser)\/?([\w\.]+)*/i, /(ice\s?browser)\/v?([\w\._]+)/i, /(mosaic)[\/\s]([\w\.]+)/i],
            [m, b]
          ],
          cpu: [
            [/(?:(amd|x(?:(?:86|64)[_-])?|wow|win)64)[;\)]/i],
            [
              [w, "amd64"]
            ],
            [/(ia32(?=;))/i],
            [
              [w, O.lowerize]
            ],
            [/((?:i[346]|x)86)[;\)]/i],
            [
              [w, "ia32"]
            ],
            [/windows\s(ce|mobile);\sppc;/i],
            [
              [w, "arm"]
            ],
            [/((?:ppc|powerpc)(?:64)?)(?:\smac|;|\))/i],
            [
              [w, /ower/, "", O.lowerize]
            ],
            [/(sun4\w)[;\)]/i],
            [
              [w, "sparc"]
            ],
            [/((?:avr32|ia64(?=;))|68k(?=\))|arm(?:64|(?=v\d+;))|(?=atmel\s)avr|(?:irix|mips|sparc)(?:64)?(?=;)|pa-risc)/i],
            [
              [w, O.lowerize]
            ]
          ],
          device: [
            [/\((ipad|playbook);[\w\s\);-]+(rim|apple)/i],
            [p, v, [g, k]],
            [/applecoremedia\/[\w\.]+ \((ipad)/],
            [p, [v, "Apple"],
              [g, k]
            ],
            [/(apple\s{0,1}tv)/i],
            [
              [p, "Apple TV"],
              [v, "Apple"]
            ],
            [/(archos)\s(gamepad2?)/i, /(hp).+(touchpad)/i, /(kindle)\/([\w\.]+)/i, /\s(nook)[\w\s]+build\/(\w+)/i, /(dell)\s(strea[kpr\s\d]*[\dko])/i],
            [v, p, [g, k]],
            [/(kf[A-z]+)\sbuild\/[\w\.]+.*silk\//i],
            [p, [v, "Amazon"],
              [g, k]
            ],
            [/(sd|kf)[0349hijorstuw]+\sbuild\/[\w\.]+.*silk\//i],
            [
              [p, P.str, E.device.amazon.model],
              [v, "Amazon"],
              [g, _]
            ],
            [/\((ip[honed|\s\w*]+);.+(apple)/i],
            [p, v, [g, _]],
            [/\((ip[honed|\s\w*]+);/i],
            [p, [v, "Apple"],
              [g, _]
            ],
            [/(blackberry)[\s-]?(\w+)/i, /(blackberry|benq|palm(?=\-)|sonyericsson|acer|asus|dell|huawei|meizu|motorola|polytron)[\s_-]?([\w-]+)*/i, /(hp)\s([\w\s]+\w)/i, /(asus)-?(\w+)/i],
            [v, p, [g, _]],
            [/\(bb10;\s(\w+)/i],
            [p, [v, "BlackBerry"],
              [g, _]
            ],
            [/android.+(transfo[prime\s]{4,10}\s\w+|eeepc|slider\s\w+|nexus 7)/i],
            [p, [v, "Asus"],
              [g, k]
            ],
            [/(sony)\s(tablet\s[ps])\sbuild\//i, /(sony)?(?:sgp.+)\sbuild\//i],
            [
              [v, "Sony"],
              [p, "Xperia Tablet"],
              [g, k]
            ],
            [/(?:sony)?(?:(?:(?:c|d)\d{4})|(?:so[-l].+))\sbuild\//i],
            [
              [v, "Sony"],
              [p, "Xperia Phone"],
              [g, _]
            ],
            [/\s(ouya)\s/i, /(nintendo)\s([wids3u]+)/i],
            [v, p, [g, y]],
            [/android.+;\s(shield)\sbuild/i],
            [p, [v, "Nvidia"],
              [g, y]
            ],
            [/(playstation\s[3portablevi]+)/i],
            [p, [v, "Sony"],
              [g, y]
            ],
            [/(sprint\s(\w+))/i],
            [
              [v, P.str, E.device.sprint.vendor],
              [p, P.str, E.device.sprint.model],
              [g, _]
            ],
            [/(lenovo)\s?(S(?:5000|6000)+(?:[-][\w+]))/i],
            [v, p, [g, k]],
            [/(htc)[;_\s-]+([\w\s]+(?=\))|\w+)*/i, /(zte)-(\w+)*/i, /(alcatel|geeksphone|huawei|lenovo|nexian|panasonic|(?=;\s)sony)[_\s-]?([\w-]+)*/i],
            [v, [p, /_/g, " "],
              [g, _]
            ],
            [/(nexus\s9)/i],
            [p, [v, "HTC"],
              [g, k]
            ],
            [/[\s\(;](xbox(?:\sone)?)[\s\);]/i],
            [p, [v, "Microsoft"],
              [g, y]
            ],
            [/(kin\.[onetw]{3})/i],
            [
              [p, /\./g, " "],
              [v, "Microsoft"],
              [g, _]
            ],
            [/\s(milestone|droid(?:[2-4x]|\s(?:bionic|x2|pro|razr))?(:?\s4g)?)[\w\s]+build\//i, /mot[\s-]?(\w+)*/i, /(XT\d{3,4}) build\//i],
            [p, [v, "Motorola"],
              [g, _]
            ],
            [/android.+\s(mz60\d|xoom[\s2]{0,2})\sbuild\//i],
            [p, [v, "Motorola"],
              [g, k]
            ],
            [/android.+((sch-i[89]0\d|shw-m380s|gt-p\d{4}|gt-n8000|sgh-t8[56]9|nexus 10))/i, /((SM-T\w+))/i],
            [
              [v, "Samsung"], p, [g, k]
            ],
            [/((s[cgp]h-\w+|gt-\w+|galaxy\snexus|sm-n900))/i, /(sam[sung]*)[\s-]*(\w+-?[\w-]*)*/i, /sec-((sgh\w+))/i],
            [
              [v, "Samsung"], p, [g, _]
            ],
            [/(samsung);smarttv/i],
            [v, p, [g, x]],
            [/\(dtv[\);].+(aquos)/i],
            [p, [v, "Sharp"],
              [g, x]
            ],
            [/sie-(\w+)*/i],
            [p, [v, "Siemens"],
              [g, _]
            ],
            [/(maemo|nokia).*(n900|lumia\s\d+)/i, /(nokia)[\s_-]?([\w-]+)*/i],
            [
              [v, "Nokia"], p, [g, _]
            ],
            [/android\s3\.[\s\w;-]{10}(a\d{3})/i],
            [p, [v, "Acer"],
              [g, k]
            ],
            [/android\s3\.[\s\w;-]{10}(lg?)-([06cv9]{3,4})/i],
            [
              [v, "LG"], p, [g, k]
            ],
            [/(lg) netcast\.tv/i],
            [v, p, [g, x]],
            [/(nexus\s[45])/i, /lg[e;\s\/-]+(\w+)*/i],
            [p, [v, "LG"],
              [g, _]
            ],
            [/android.+(ideatab[a-z0-9\-\s]+)/i],
            [p, [v, "Lenovo"],
              [g, k]
            ],
            [/linux;.+((jolla));/i],
            [v, p, [g, _]],
            [/((pebble))app\/[\d\.]+\s/i],
            [v, p, [g, S]],
            [/android.+;\s(glass)\s\d/i],
            [p, [v, "Google"],
              [g, S]
            ],
            [/android.+(\w+)\s+build\/hm\1/i, /android.+(hm[\s\-_]*note?[\s_]*(?:\d\w)?)\s+build/i, /android.+(mi[\s\-_]*(?:one|one[\s_]plus)?[\s_]*(?:\d\w)?)\s+build/i],
            [
              [p, /_/g, " "],
              [v, "Xiaomi"],
              [g, _]
            ],
            [/(mobile|tablet);.+rv\:.+gecko\//i],
            [
              [g, O.lowerize], v, p
            ]
          ],
          engine: [
            [/windows.+\sedge\/([\w\.]+)/i],
            [b, [m, "EdgeHTML"]],
            [/(presto)\/([\w\.]+)/i, /(webkit|trident|netfront|netsurf|amaya|lynx|w3m)\/([\w\.]+)/i, /(khtml|tasman|links)[\/\s]\(?([\w\.]+)/i, /(icab)[\/\s]([23]\.[\d\.]+)/i],
            [m, b],
            [/rv\:([\w\.]+).*(gecko)/i],
            [b, m]
          ],
          os: [
            [/microsoft\s(windows)\s(vista|xp)/i],
            [m, b],
            [/(windows)\snt\s6\.2;\s(arm)/i, /(windows\sphone(?:\sos)*|windows\smobile|windows)[\s\/]?([ntce\d\.\s]+\w)/i],
            [m, [b, P.str, E.os.windows.version]],
            [/(win(?=3|9|n)|win\s9x\s)([nt\d\.]+)/i],
            [
              [m, "Windows"],
              [b, P.str, E.os.windows.version]
            ],
            [/\((bb)(10);/i],
            [
              [m, "BlackBerry"], b
            ],
            [/(blackberry)\w*\/?([\w\.]+)*/i, /(tizen)[\/\s]([\w\.]+)/i, /(android|webos|palm\sos|qnx|bada|rim\stablet\sos|meego|contiki)[\/\s-]?([\w\.]+)*/i, /linux;.+(sailfish);/i],
            [m, b],
            [/(symbian\s?os|symbos|s60(?=;))[\/\s-]?([\w\.]+)*/i],
            [
              [m, "Symbian"], b
            ],
            [/\((series40);/i],
            [m],
            [/mozilla.+\(mobile;.+gecko.+firefox/i],
            [
              [m, "Firefox OS"], b
            ],
            [/(nintendo|playstation)\s([wids3portablevu]+)/i, /(mint)[\/\s\(]?(\w+)*/i, /(mageia|vectorlinux)[;\s]/i, /(joli|[kxln]?ubuntu|debian|[open]*suse|gentoo|arch|slackware|fedora|mandriva|centos|pclinuxos|redhat|zenwalk|linpus)[\/\s-]?([\w\.-]+)*/i, /(hurd|linux)\s?([\w\.]+)*/i, /(gnu)\s?([\w\.]+)*/i],
            [m, b],
            [/(cros)\s[\w]+\s([\w\.]+\w)/i],
            [
              [m, "Chromium OS"], b
            ],
            [/(sunos)\s?([\w\.]+\d)*/i],
            [
              [m, "Solaris"], b
            ],
            [/\s([frentopc-]{0,4}bsd|dragonfly)\s?([\w\.]+)*/i],
            [m, b],
            [/(ip[honead]+)(?:.*os\s*([\w]+)*\slike\smac|;\sopera)/i],
            [
              [m, "iOS"],
              [b, /_/g, "."]
            ],
            [/(mac\sos\sx)\s?([\w\s\.]+\w)*/i, /(macintosh|mac(?=_powerpc)\s)/i],
            [
              [m, "Mac OS"],
              [b, /_/g, "."]
            ],
            [/((?:open)?solaris)[\/\s-]?([\w\.]+)*/i, /(haiku)\s(\w+)/i, /(aix)\s((\d)(?=\.|\)|\s)[\w\.]*)*/i, /(plan\s9|minix|beos|os\/2|amigaos|morphos|risc\sos|openvms)/i, /(unix)\s?([\w\.]+)*/i],
            [m, b]
          ]
        },
        C = function(e, t) {
          if (!(this instanceof C)) return new C(e, t).getResult();
          var n = e || (i && i.navigator && i.navigator.userAgent ? i.navigator.userAgent : s),
            r = t ? O.extend(T, t) : T;
          return this.getBrowser = function() {
            var e = P.rgx.apply(this, r.browser);
            return e.major = O.major(e.version), e
          }, this.getCPU = function() {
            return P.rgx.apply(this, r.cpu)
          }, this.getDevice = function() {
            return P.rgx.apply(this, r.device)
          }, this.getEngine = function() {
            return P.rgx.apply(this, r.engine)
          }, this.getOS = function() {
            return P.rgx.apply(this, r.os)
          }, this.getResult = function() {
            return {
              ua: this.getUA(),
              browser: this.getBrowser(),
              engine: this.getEngine(),
              os: this.getOS(),
              device: this.getDevice(),
              cpu: this.getCPU()
            }
          }, this.getUA = function() {
            return n
          }, this.setUA = function(e) {
            return n = e, this
          }, this.setUA(n), this
        };
      C.VERSION = a, C.BROWSER = {
        NAME: m,
        MAJOR: d,
        VERSION: b
      }, C.CPU = {
        ARCHITECTURE: w
      }, C.DEVICE = {
        MODEL: p,
        VENDOR: v,
        TYPE: g,
        CONSOLE: y,
        MOBILE: _,
        SMARTTV: x,
        TABLET: k,
        WEARABLE: S,
        EMBEDDED: A
      }, C.ENGINE = {
        NAME: m,
        VERSION: b
      }, C.OS = {
        NAME: m,
        VERSION: b
      }, typeof t !== f ? (typeof e !== f && e.exports && (t = e.exports = C), t.UAParser = C) : "function" === c && n(629) ? (r = function() {
        return C
      }.call(t, n, t, e), !(r !== o && (e.exports = r))) : i.UAParser = C;
      var M = i.jQuery || i.Zepto;
      if (typeof M !== f) {
        var D = new C;
        M.ua = D.getResult(), M.ua.get = function() {
          return D.getUA()
        }, M.ua.set = function(e) {
          D.setUA(e);
          var t = D.getResult();
          for (var n in t) M.ua[n] = t[n]
        }
      }
    }("object" == typeof window ? window : this)
  },
  628: function(e, t) {
    e.exports = function() {
      throw new Error("define cannot be used indirect")
    }
  },
  629: function(e, t) {
    (function(t) {
      e.exports = t
    }).call(t, {})
  },
  630: function(module, exports) {
    function ba(e) {
      eval.call(null, e)
    }

    function assert(e, t) {
      e || z("Assertion failed: " + t)
    }

    function ga(a) {
      var b = e["_" + a];
      if (!b) try {
        b = eval("_" + a)
      } catch (c) {}
      return assert(b, "Cannot call unknown function " + a + " (perhaps LLVM optimizations or closure removed it?)"), b
    }

    function ma(e, t, n) {
      switch (n = n || "i8", "*" === n.charAt(n.length - 1) && (n = "i32"), n) {
        case "i1":
          D[e >> 0] = t;
          break;
        case "i8":
          D[e >> 0] = t;
          break;
        case "i16":
          E[e >> 1] = t;
          break;
        case "i32":
          F[e >> 2] = t;
          break;
        case "i64":
          fa = [t >>> 0, (da = t, 1 <= +na(da) ? da > 0 ? (0 | oa(+pa(da / 4294967296), 4294967295)) >>> 0 : ~~+qa((da - +(~~da >>> 0)) / 4294967296) >>> 0 : 0)], F[e >> 2] = fa[0], F[e + 4 >> 2] = fa[1];
          break;
        case "float":
          ra[e >> 2] = t;
          break;
        case "double":
          sa[e >> 3] = t;
          break;
        default:
          z("invalid type for setValue: " + n)
      }
    }

    function ta(e, t) {
      switch (t = t || "i8", "*" === t.charAt(t.length - 1) && (t = "i32"), t) {
        case "i1":
          return D[e >> 0];
        case "i8":
          return D[e >> 0];
        case "i16":
          return E[e >> 1];
        case "i32":
          return F[e >> 2];
        case "i64":
          return F[e >> 2];
        case "float":
          return ra[e >> 2];
        case "double":
          return sa[e >> 3];
        default:
          z("invalid type for setValue: " + t)
      }
      return null
    }

    function G(e, t, r, i) {
      var o, a;
      "number" == typeof e ? (o = !0, a = e) : (o = !1, a = e.length);
      var s = "string" == typeof t ? t : null;
      if (r = 4 == r ? i : [ua, n.W, n.Ia, n.P][void 0 === r ? 2 : r](Math.max(a, s ? 1 : t.length)), o) {
        for (i = r, assert(0 == (3 & r)), e = r + (-4 & a); e > i; i += 4) F[i >> 2] = 0;
        for (e = r + a; e > i;) D[i++ >> 0] = 0;
        return r
      }
      if ("i8" === s) return e.subarray || e.slice ? H.set(e, r) : H.set(new Uint8Array(e), r), r;
      i = 0;
      for (var u, c; a > i;) {
        var f = e[i];
        "function" == typeof f && (f = n.sd(f)), o = s || t[i], 0 === o ? i++ : ("i64" == o && (o = "i32"), ma(r + i, f, o), c !== o && (u = n.Aa(o), c = o), i += u)
      }
      return r
    }

    function la(t, n) {
      if (0 === n || !t) return "";
      for (var r, i = 0, o = 0;
        (r = H[t + o >> 0], i |= r, 0 != r || n) && (o++, !n || o != n););
      if (n || (n = o), r = "", 128 > i) {
        for (; n > 0;) i = String.fromCharCode.apply(String, H.subarray(t, t + Math.min(n, 1024))), r = r ? r + i : i, t += 1024, n -= 1024;
        return r
      }
      return e.UTF8ToString(t)
    }

    function za(e, t) {
      for (var n, r, i, o, a, s, u = "";;) {
        if (n = e[t++], !n) return u;
        128 & n ? (r = 63 & e[t++], 192 == (224 & n) ? u += String.fromCharCode((31 & n) << 6 | r) : (i = 63 & e[t++], 224 == (240 & n) ? n = (15 & n) << 12 | r << 6 | i : (o = 63 & e[t++], 240 == (248 & n) ? n = (7 & n) << 18 | r << 12 | i << 6 | o : (a = 63 & e[t++], 248 == (252 & n) ? n = (3 & n) << 24 | r << 18 | i << 12 | o << 6 | a : (s = 63 & e[t++], n = (1 & n) << 30 | r << 24 | i << 18 | o << 12 | a << 6 | s))), 65536 > n ? u += String.fromCharCode(n) : (n -= 65536, u += String.fromCharCode(55296 | n >> 10, 56320 | 1023 & n)))) : u += String.fromCharCode(n)
      }
    }

    function Aa(e, t, n, r) {
      if (!(r > 0)) return 0;
      var i = n;
      r = n + r - 1;
      for (var o = 0; o < e.length; ++o) {
        var a = e.charCodeAt(o);
        if (a >= 55296 && 57343 >= a && (a = 65536 + ((1023 & a) << 10) | 1023 & e.charCodeAt(++o)), 127 >= a) {
          if (n >= r) break;
          t[n++] = a
        } else {
          if (2047 >= a) {
            if (n + 1 >= r) break;
            t[n++] = 192 | a >> 6
          } else {
            if (65535 >= a) {
              if (n + 2 >= r) break;
              t[n++] = 224 | a >> 12
            } else {
              if (2097151 >= a) {
                if (n + 3 >= r) break;
                t[n++] = 240 | a >> 18
              } else {
                if (67108863 >= a) {
                  if (n + 4 >= r) break;
                  t[n++] = 248 | a >> 24
                } else {
                  if (n + 5 >= r) break;
                  t[n++] = 252 | a >> 30, t[n++] = 128 | a >> 24 & 63
                }
                t[n++] = 128 | a >> 18 & 63
              }
              t[n++] = 128 | a >> 12 & 63
            }
            t[n++] = 128 | a >> 6 & 63
          }
          t[n++] = 128 | 63 & a
        }
      }
      return t[n] = 0, n - i
    }

    function Ba(e) {
      for (var t = 0, n = 0; n < e.length; ++n) {
        var r = e.charCodeAt(n);
        r >= 55296 && 57343 >= r && (r = 65536 + ((1023 & r) << 10) | 1023 & e.charCodeAt(++n)), 127 >= r ? ++t : t = 2047 >= r ? t + 2 : 65535 >= r ? t + 3 : 2097151 >= r ? t + 4 : 67108863 >= r ? t + 5 : t + 6
      }
      return t
    }

    function Ca(t) {
      function r(e, n, i) {
        n = n || 1 / 0;
        var o, a = "",
          s = [];
        if ("N" === t[c]) {
          for (c++, "K" === t[c] && c++, o = [];
            "E" !== t[c];)
            if ("S" === t[c]) {
              c++;
              var u = t.indexOf("_", c);
              o.push(l[t.substring(c, u) || 0] || "?"), c = u + 1
            } else if ("C" === t[c]) o.push(o[o.length - 1]), c += 2;
          else {
            var u = parseInt(t.substr(c)),
              d = u.toString().length;
            if (!u || !d) {
              c--;
              break
            }
            var p = t.substr(c + d, u);
            o.push(p), l.push(p), c += d + u
          }
          if (c++, o = o.join("::"), n--, 0 === n) return e ? [o] : o
        } else("K" === t[c] || h && "L" === t[c]) && c++, (u = parseInt(t.substr(c))) && (d = u.toString().length, o = t.substr(c + d, u), c += d + u);
        h = !1, "I" === t[c] ? (c++, u = r(!0), d = r(!0, 1, !0), a += d[0] + " " + o + "<" + u.join(", ") + ">") : a = o;
        e: for (; c < t.length && 0 < n--;)
          if (o = t[c++], o in f) s.push(f[o]);
          else switch (o) {
            case "P":
              s.push(r(!0, 1, !0)[0] + "*");
              break;
            case "R":
              s.push(r(!0, 1, !0)[0] + "&");
              break;
            case "L":
              c++, u = t.indexOf("E", c) - c,
                s.push(t.substr(c, u)), c += u + 2;
              break;
            case "A":
              if (u = parseInt(t.substr(c)), c += u.toString().length, "_" !== t[c]) throw "?";
              c++, s.push(r(!0, 1, !0)[0] + " [" + u + "]");
              break;
            case "E":
              break e;
            default:
              a += "?" + o;
              break e
          }
          return i || 1 !== s.length || "void" !== s[0] || (s = []), e ? (a && s.push(a + "?"), s) : a + ("(" + s.join(", ") + ")")
      }
      var i = !!e.___cxa_demangle;
      if (i) try {
        var o = ua(t.length);
        ka(t.substr(1), o);
        var a = ua(4),
          s = e.___cxa_demangle(o, 0, 0, a);
        if (0 === ta(a, "i32") && s) return la(s)
      } catch (u) {} finally {
        o && Da(o), a && Da(a), s && Da(s)
      }
      var c = 3,
        f = {
          v: "void",
          b: "bool",
          c: "char",
          s: "short",
          i: "int",
          l: "long",
          f: "float",
          d: "double",
          w: "wchar_t",
          a: "signed char",
          h: "unsigned char",
          t: "unsigned short",
          j: "unsigned int",
          m: "unsigned long",
          x: "long long",
          y: "unsigned long long",
          z: "..."
        },
        l = [],
        h = !0,
        o = t;
      try {
        if ("Object._main" == t || "_main" == t) return "main()";
        if ("number" == typeof t && (t = la(t)), "_" !== t[0] || "_" !== t[1] || "Z" !== t[2]) return t;
        switch (t[3]) {
          case "n":
            return "operator new()";
          case "d":
            return "operator delete()"
        }
        o = r()
      } catch (d) {
        o += "?"
      }
      return 0 <= o.indexOf("?") && !i && n.M("warning: a problem occurred in builtin C++ name demangling; build with  -s DEMANGLE_SUPPORT=1  to link in libcxxabi demangling"), o
    }

    function Ea() {
      return Fa().replace(/__Z[\w\d_]+/g, function(e) {
        var t = Ca(e);
        return e === t ? e : e + " [" + t + "]"
      })
    }

    function Fa() {
      var e = Error();
      if (!e.stack) {
        try {
          throw Error(0)
        } catch (t) {
          e = t
        }
        if (!e.stack) return "(no stack trace available)"
      }
      return e.stack.toString()
    }

    function Ga() {
      var e = v;
      return e % 4096 > 0 && (e += 4096 - e % 4096), e
    }

    function Oa(e) {
      for (; 0 < e.length;) {
        var t = e.shift();
        if ("function" == typeof t) t();
        else {
          var r = t.Qa;
          "number" == typeof r ? void 0 === t.T ? n.J("v", r) : n.J("vi", r, [t.T]) : r(void 0 === t.T ? null : t.T)
        }
      }
    }

    function Ta(e) {
      Pa.unshift(e)
    }

    function Ua(e) {
      Sa.unshift(e)
    }

    function Va(e, t, n) {
      return n = Array(n > 0 ? n : Ba(e) + 1), e = Aa(e, n, 0, n.length), t && (n.length = e), n
    }

    function ka(e, t, n) {
      for (e = Va(e, n), n = 0; n < e.length;) D[t + n >> 0] = e[n], n += 1
    }

    function ja(e, t) {
      for (var n = 0; n < e.length; n++) D[t++ >> 0] = e[n]
    }

    function ya(e, t, n) {
      for (var r = 0; r < e.length; ++r) D[t++ >> 0] = e.charCodeAt(r);
      n || (D[t >> 0] = 0)
    }

    function Ya() {
      L++, e.monitorRunDependencies && e.monitorRunDependencies(L)
    }

    function Za() {
      if (L--, e.monitorRunDependencies && e.monitorRunDependencies(L), 0 == L && (null !== Wa && (clearInterval(Wa), Wa = null), Xa)) {
        var t = Xa;
        Xa = null, t()
      }
    }

    function eb(e, t) {
      K.push(function() {
        n.J("vi", e, [t])
      }), eb.level = K.length
    }

    function ib(t) {
      return e.___errno_location && (F[e.___errno_location() >> 2] = t), t
    }

    function jb(e, t) {
      for (var n = 0, r = e.length - 1; r >= 0; r--) {
        var i = e[r];
        "." === i ? e.splice(r, 1) : ".." === i ? (e.splice(r, 1), n++) : n && (e.splice(r, 1), n--)
      }
      if (t)
        for (; n--; n) e.unshift("..");
      return e
    }

    function N(e) {
      var t = "/" === e.charAt(0),
        n = "/" === e.substr(-1);
      return (e = jb(e.split("/").filter(function(e) {
        return !!e
      }), !t).join("/")) || t || (e = "."), e && n && (e += "/"), (t ? "/" : "") + e
    }

    function kb(e) {
      var t = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/.exec(e).slice(1);
      return e = t[0], t = t[1], e || t ? (t && (t = t.substr(0, t.length - 1)), e + t) : "."
    }

    function lb(e) {
      if ("/" === e) return "/";
      var t = e.lastIndexOf("/");
      return -1 === t ? e : e.substr(t + 1)
    }

    function mb() {
      for (var e = "", t = !1, n = arguments.length - 1; n >= -1 && !t; n--) {
        if (t = n >= 0 ? arguments[n] : "/", "string" != typeof t) throw new TypeError("Arguments to path.resolve must be strings");
        if (!t) return "";
        e = t + "/" + e, t = "/" === t.charAt(0)
      }
      return e = jb(e.split("/").filter(function(e) {
        return !!e
      }), !t).join("/"), (t ? "/" : "") + e || "."
    }

    function ob(e, t) {
      nb[e] = {
        input: [],
        output: [],
        L: t
      }, pb(e, qb)
    }

    function T(e, t) {
      if (e = mb("/", e), t = t || {}, !e) return {
        path: "",
        g: null
      };
      var n, r = {
        za: !0,
        ka: 0
      };
      for (n in r) void 0 === t[n] && (t[n] = r[n]);
      if (8 < t.ka) throw new O(M.aa);
      var r = jb(e.split("/").filter(function(e) {
          return !!e
        }), !1),
        i = xb;
      n = "/";
      for (var o = 0; o < r.length; o++) {
        var a = o === r.length - 1;
        if (a && t.parent) break;
        if (i = wb(i, r[o]), n = N(n + "/" + r[o]), i.R && (!a || a && t.za) && (i = i.R.root), !a || t.ga)
          for (a = 0; 40960 === (61440 & i.mode);)
            if (i = Db(n), n = mb(kb(n), i), i = T(n, {
                ka: t.ka
              }).g, 40 < a++) throw new O(M.aa)
      }
      return {
        path: n,
        g: i
      }
    }

    function U(e) {
      for (var t;;) {
        if (e === e.parent) return e = e.A.Fa, t ? "/" !== e[e.length - 1] ? e + "/" + t : e + t : e;
        t = t ? e.name + "/" + t : e.name, e = e.parent
      }
    }

    function Eb(e, t) {
      for (var n = 0, r = 0; r < t.length; r++) n = (n << 5) - n + t.charCodeAt(r) | 0;
      return (e + n >>> 0) % R.length
    }

    function Fb(e) {
      var t = Eb(e.parent.id, e.name);
      e.K = R[t], R[t] = e
    }

    function wb(e, t) {
      var n;
      if (n = (n = Gb(e, "x")) ? n : e.k.lookup ? 0 : M.Y) throw new O(n, e);
      for (n = R[Eb(e.id, t)]; n; n = n.K) {
        var r = n.name;
        if (n.parent.id === e.id && r === t) return n
      }
      return e.k.lookup(e, t)
    }

    function ub(e, t, n, r) {
      return Hb || (Hb = function(e, t, n, r) {
        e || (e = this), this.parent = e, this.A = e.A, this.R = null, this.id = Ab++, this.name = t, this.mode = n, this.k = {}, this.n = {}, this.rdev = r
      }, Hb.prototype = {}, Object.defineProperties(Hb.prototype, {
        read: {
          get: function() {
            return 365 === (365 & this.mode)
          },
          set: function(e) {
            e ? this.mode |= 365 : this.mode &= -366
          }
        },
        write: {
          get: function() {
            return 146 === (146 & this.mode)
          },
          set: function(e) {
            e ? this.mode |= 146 : this.mode &= -147
          }
        },
        Xa: {
          get: function() {
            return 16384 === (61440 & this.mode)
          }
        },
        Ca: {
          get: function() {
            return 8192 === (61440 & this.mode)
          }
        }
      })), e = new Hb(e, t, n, r), Fb(e), e
    }

    function Gb(e, t) {
      return Cb ? 0 : (-1 === t.indexOf("r") || 292 & e.mode) && (-1 === t.indexOf("w") || 146 & e.mode) && (-1 === t.indexOf("x") || 73 & e.mode) ? 0 : M.Y
    }

    function Jb(e, t) {
      try {
        return wb(e, t), M.pa
      } catch (n) {}
      return Gb(e, "wx")
    }

    function Kb() {
      var e;
      e = 4096;
      for (var t = 0; e >= t; t++)
        if (!zb[t]) return t;
      throw new O(M.Ja)
    }

    function Lb(e) {
      Mb || (Mb = function() {}, Mb.prototype = {}, Object.defineProperties(Mb.prototype, {
        object: {
          get: function() {
            return this.g
          },
          set: function(e) {
            this.g = e
          }
        },
        vd: {
          get: function() {
            return 1 !== (2097155 & this.flags)
          }
        },
        wd: {
          get: function() {
            return 0 !== (2097155 & this.flags)
          }
        },
        ud: {
          get: function() {
            return 1024 & this.flags
          }
        }
      }));
      var t, n = new Mb;
      for (t in e) n[t] = e[t];
      return e = n, n = Kb(), e.fd = n, zb[n] = e
    }

    function pb(e, t) {
      yb[e] = {
        n: t
      }
    }

    function Nb(e, t) {
      var n, r = "/" === t,
        i = !t;
      if (r && xb) throw new O(M.$);
      if (!r && !i) {
        if (n = T(t, {
            za: !1
          }), t = n.path, n = n.g, n.R) throw new O(M.$);
        if (16384 !== (61440 & n.mode)) throw new O(M.qa)
      }
      var i = {
          type: e,
          Ad: {},
          Fa: t,
          Ya: []
        },
        o = e.A(i);
      o.A = i, i.root = o, r ? xb = o : n && (n.R = i, n.A && n.A.Ya.push(i))
    }

    function Ob(e, t, n) {
      var r = T(e, {
        parent: !0
      }).g;
      if (e = lb(e), !e || "." === e || ".." === e) throw new O(M.u);
      var i = Jb(r, e);
      if (i) throw new O(i);
      if (!r.k.V) throw new O(M.G);
      return r.k.V(r, e, t, n)
    }

    function Pb(e, t) {
      return t = 4095 & (void 0 !== t ? t : 438), t |= 32768, Ob(e, t, 0)
    }

    function V(e, t) {
      return t = 1023 & (void 0 !== t ? t : 511), t |= 16384, Ob(e, t, 0)
    }

    function Qb(e, t, n) {
      return "undefined" == typeof n && (n = t, t = 438), Ob(e, 8192 | t, n)
    }

    function Rb(e, t) {
      if (!mb(e)) throw new O(M.B);
      var n = T(t, {
        parent: !0
      }).g;
      if (!n) throw new O(M.B);
      var r = lb(t),
        i = Jb(n, r);
      if (i) throw new O(i);
      if (!n.k.symlink) throw new O(M.G);
      return n.k.symlink(n, r, e)
    }

    function Db(e) {
      if (e = T(e).g, !e) throw new O(M.B);
      if (!e.k.readlink) throw new O(M.u);
      return mb(U(e.parent), e.k.readlink(e))
    }

    function Sb(e, t) {
      var n;
      if (n = "string" == typeof e ? T(e, {
          ga: !0
        }).g : e, !n.k.p) throw new O(M.G);
      n.k.p(n, {
        mode: 4095 & t | -4096 & n.mode,
        timestamp: Date.now()
      })
    }

    function Tb(t, n) {
      var r;
      if ("" === t) throw new O(M.B);
      var i;
      if ("string" == typeof n) {
        if (i = Ib[n], "undefined" == typeof i) throw Error("Unknown file open mode: " + n)
      } else i = n;
      n = i, r = 64 & n ? 4095 & ("undefined" == typeof r ? 438 : r) | 32768 : 0;
      var o;
      if ("object" == typeof t) o = t;
      else {
        t = N(t);
        try {
          o = T(t, {
            ga: !(131072 & n)
          }).g
        } catch (a) {}
      }
      if (i = !1, 64 & n)
        if (o) {
          if (128 & n) throw new O(M.pa)
        } else o = Ob(t, r, 0), i = !0;
      if (!o) throw new O(M.B);
      if (8192 === (61440 & o.mode) && (n &= -513), 65536 & n && 16384 !== (61440 & o.mode)) throw new O(M.qa);
      if (!i && (o ? 40960 === (61440 & o.mode) ? r = M.aa : 16384 === (61440 & o.mode) && (0 !== (2097155 & n) || 512 & n) ? r = M.N : (r = ["r", "w", "rw"][3 & n], 512 & n && (r += "w"), r = Gb(o, r)) : r = M.B, r)) throw new O(r);
      if (512 & n) {
        r = o;
        var s;
        if (s = "string" == typeof r ? T(r, {
            ga: !0
          }).g : r, !s.k.p) throw new O(M.G);
        if (16384 === (61440 & s.mode)) throw new O(M.N);
        if (32768 !== (61440 & s.mode)) throw new O(M.u);
        if (r = Gb(s, "w")) throw new O(r);
        s.k.p(s, {
          size: 0,
          timestamp: Date.now()
        })
      }
      n &= -641, o = Lb({
        g: o,
        path: U(o),
        flags: n,
        seekable: !0,
        position: 0,
        n: o.n,
        eb: [],
        error: !1
      }), o.n.open && o.n.open(o), !e.logReadFiles || 1 & n || (Ub || (Ub = {}), t in Ub || (Ub[t] = 1, e.printErr("read file: " + t)));
      try {
        S.onOpenFile && (s = 0, 1 !== (2097155 & n) && (s |= 1), 0 !== (2097155 & n) && (s |= 2), S.onOpenFile(t, s))
      } catch (u) {
        console.log("FS.trackingDelegate['onOpenFile']('" + t + "', flags) threw an exception: " + u.message)
      }
      return o
    }

    function Vb(e) {
      e.ia && (e.ia = null);
      try {
        e.n.close && e.n.close(e)
      } catch (t) {
        throw t
      } finally {
        zb[e.fd] = null
      }
    }

    function Wb(e, t, n) {
      if (!e.seekable || !e.n.I) throw new O(M.da);
      e.position = e.n.I(e, t, n), e.eb = []
    }

    function Xb(e, t, n, r, i, o) {
      if (0 > r || 0 > i) throw new O(M.u);
      if (0 === (2097155 & e.flags)) throw new O(M.Z);
      if (16384 === (61440 & e.g.mode)) throw new O(M.N);
      if (!e.n.write) throw new O(M.u);
      1024 & e.flags && Wb(e, 0, 2);
      var a = !0;
      if ("undefined" == typeof i) i = e.position, a = !1;
      else if (!e.seekable) throw new O(M.da);
      t = e.n.write(e, t, n, r, i, o), a || (e.position += t);
      try {
        e.path && S.onWriteToFile && S.onWriteToFile(e.path)
      } catch (s) {
        console.log("FS.trackingDelegate['onWriteToFile']('" + path + "') threw an exception: " + s.message)
      }
      return t
    }

    function Yb() {
      O || (O = function(e, t) {
        this.g = t, this.bb = function(e) {
          this.Q = e;
          for (var t in M)
            if (M[t] === e) {
              this.code = t;
              break
            }
        }, this.bb(e), this.message = hb[e]
      }, O.prototype = Error(), O.prototype.constructor = O, [M.B].forEach(function(e) {
        vb[e] = new O(e), vb[e].stack = "<generic error, no stack>"
      }))
    }

    function $b(e, t) {
      var n = 0;
      return e && (n |= 365), t && (n |= 146), n
    }

    function ac(e, t, n, r) {
      return e = N(("string" == typeof e ? e : U(e)) + "/" + t), Pb(e, $b(n, r))
    }

    function bc(e, t, n, r, i, o) {
      if (e = t ? N(("string" == typeof e ? e : U(e)) + "/" + t) : e, r = $b(r, i), i = Pb(e, r), n) {
        if ("string" == typeof n) {
          e = Array(n.length), t = 0;
          for (var a = n.length; a > t; ++t) e[t] = n.charCodeAt(t);
          n = e
        }
        Sb(i, 146 | r), e = Tb(i, "w"), Xb(e, n, 0, n.length, 0, o), Vb(e), Sb(i, r)
      }
      return i
    }

    function W(e, t, n, r) {
      e = N(("string" == typeof e ? e : U(e)) + "/" + t), t = $b(!!n, !!r), W.Da || (W.Da = 64);
      var i = W.Da++ << 8 | 0;
      return pb(i, {
        open: function(e) {
          e.seekable = !1
        },
        close: function() {
          r && r.buffer && r.buffer.length && r(10)
        },
        read: function(e, t, r, i) {
          for (var o = 0, a = 0; i > a; a++) {
            var s;
            try {
              s = n()
            } catch (u) {
              throw new O(M.F)
            }
            if (void 0 === s && 0 === o) throw new O(M.oa);
            if (null === s || void 0 === s) break;
            o++, t[r + a] = s
          }
          return o && (e.g.timestamp = Date.now()), o
        },
        write: function(e, t, n, i) {
          for (var o = 0; i > o; o++) try {
            r(t[n + o])
          } catch (a) {
            throw new O(M.F)
          }
          return i && (e.g.timestamp = Date.now()), o
        }
      }), Qb(e, t, i)
    }

    function cc(t) {
      if (t.Ca || t.Xa || t.link || t.e) return !0;
      var n = !0;
      if ("undefined" != typeof XMLHttpRequest) throw Error("Lazy loading should have been performed (contents set) in createLazyFile, but it was not. Lazy loading only works in web workers. Use --embed-file or --preload-file in emcc on the main thread.");
      if (!e.read) throw Error("Cannot load without read() or XMLHttpRequest.");
      try {
        t.e = Va(e.read(t.url), !0), t.o = t.e.length
      } catch (r) {
        n = !1
      }
      return n || ib(M.F), n
    }

    function X() {
      return ec += 4, F[ec - 4 >> 2]
    }

    function fc() {
      var e;
      if (e = X(), e = zb[e], !e) throw new O(M.Z);
      return e
    }

    function wa(e) {
      wa.C || (v = Ga(), wa.C = !0, assert(n.P), wa.Ra = n.P, n.P = function() {
        z("cannot dynamically allocate, sbrk now has control")
      });
      var t = v;
      return 0 == e || wa.Ra(e) ? t : 4294967295
    }

    function hc(e, t) {
      if (ic = e, jc = t, !kc) return 1;
      if (0 == e) Y = function() {
        setTimeout(lc, t)
      }, mc = "timeout";
      else if (1 == e) Y = function() {
        nc(lc)
      }, mc = "rAF";
      else if (2 == e) {
        if (!window.setImmediate) {
          var n = [];
          window.addEventListener("message", function(e) {
            e.source === window && "__emcc" === e.data && (e.stopPropagation(), n.shift()())
          }, !0), window.setImmediate = function(e) {
            n.push(e), window.postMessage("__emcc", "*")
          }
        }
        Y = function() {
          window.setImmediate(lc)
        }, mc = "immediate"
      }
      return 0
    }

    function oc(t, r, i, o, a) {
      e.noExitRuntime = !0, assert(!kc, "emscripten_set_main_loop: there can only be one main loop function at once: call emscripten_cancel_main_loop to cancel the previous one before setting a new one with different parameters."), kc = t, pc = o;
      var s = qc;
      if (lc = function() {
          if (!A)
            if (0 < rc.length) {
              var r = Date.now(),
                i = rc.shift();
              if (i.Qa(i.T), sc) {
                var a = sc,
                  u = 0 == a % 1 ? a - 1 : Math.floor(a);
                sc = i.ld ? u : (8 * a + (u + .5)) / 9
              }
              console.log('main loop blocker "' + i.name + '" took ' + (Date.now() - r) + " ms"), tc(), setTimeout(lc, 0)
            } else qc > s || (uc = uc + 1 | 0, 1 == ic && jc > 1 && 0 != uc % jc ? Y() : ("timeout" === mc && e.fa && (e.S("Looks like you are rendering without using requestAnimationFrame for the main loop. You should use 0 for the frame rate in emscripten_set_main_loop in order to use requestAnimationFrame, as that can greatly improve your frame rates!"), mc = ""), vc(function() {
              "undefined" != typeof o ? n.J("vi", t, [o]) : n.J("v", t)
            }), qc > s || ("object" == typeof SDL && SDL.audio && SDL.audio.Za && SDL.audio.Za(), Y())))
        }, a || (r && r > 0 ? hc(0, 1e3 / r) : hc(1, 1), Y()), i) throw "SimulateInfiniteLoop"
    }

    function tc() {
      if (e.setStatus) {
        var t = e.statusMessage || "Please wait...",
          n = sc,
          r = wc.nd;
        n ? r > n ? e.setStatus(t + " (" + (r - n) + "/" + r + ")") : e.setStatus(t) : e.setStatus("")
      }
    }

    function vc(t) {
      if (!(A || e.preMainLoop && !1 === e.preMainLoop())) {
        try {
          t()
        } catch (n) {
          if (n instanceof xc) return;
          throw n && "object" == typeof n && n.stack && e.S("exception thrown: " + [n, n.stack]), n
        }
        e.postMainLoop && e.postMainLoop()
      }
    }

    function Bc() {
      function t() {
        zc = document.pointerLockElement === i || document.mozPointerLockElement === i || document.webkitPointerLockElement === i || document.msPointerLockElement === i
      }
      if (e.preloadPlugins || (e.preloadPlugins = []), !Cc) {
        Cc = !0;
        try {
          Dc = !0
        } catch (r) {
          Dc = !1, console.log("warning: no blob constructor, cannot create blobs with mimetypes")
        }
        Ec = "undefined" != typeof MozBlobBuilder ? MozBlobBuilder : "undefined" != typeof WebKitBlobBuilder ? WebKitBlobBuilder : Dc ? null : console.log("warning: no BlobBuilder"), Fc = "undefined" != typeof window ? window.URL ? window.URL : window.webkitURL : void 0, e.Ha || "undefined" != typeof Fc || (console.log("warning: Browser does not support creating object URLs. Built-in browser image decoding will not be available."), e.Ha = !0), e.preloadPlugins.push({
          canHandle: function(t) {
            return !e.Ha && /\.(jpg|jpeg|png|bmp)$/i.test(t)
          },
          handle: function(t, r, i, o) {
            var a = null;
            if (Dc) try {
              a = new Blob([t], {
                type: Gc(r)
              }), a.size !== t.length && (a = new Blob([new Uint8Array(t).buffer], {
                type: Gc(r)
              }))
            } catch (s) {
              n.M("Blob constructor present but fails: " + s + "; falling back to blob builder")
            }
            a || (a = new Ec, a.append(new Uint8Array(t).buffer), a = a.getBlob());
            var u = Fc.createObjectURL(a),
              c = new Image;
            c.onload = function() {
              assert(c.complete, "Image " + r + " could not be decoded");
              var n = document.createElement("canvas");
              n.width = c.width, n.height = c.height, n.getContext("2d").drawImage(c, 0, 0), e.preloadedImages[r] = n, Fc.revokeObjectURL(u), i && i(t)
            }, c.onerror = function() {
              console.log("Image " + u + " could not be decoded"), o && o()
            }, c.src = u
          }
        }), e.preloadPlugins.push({
          canHandle: function(t) {
            return !e.zd && t.substr(-4) in {
              ".ogg": 1,
              ".wav": 1,
              ".mp3": 1
            }
          },
          handle: function(t, n, r, i) {
            function o(i) {
              s || (s = !0, e.preloadedAudios[n] = i, r && r(t))
            }

            function a() {
              s || (s = !0, e.preloadedAudios[n] = new Audio, i && i())
            }
            var s = !1;
            if (!Dc) return a();
            try {
              var u = new Blob([t], {
                type: Gc(n)
              })
            } catch (c) {
              return a()
            }
            var u = Fc.createObjectURL(u),
              f = new Audio;
            f.addEventListener("canplaythrough", function() {
              o(f)
            }, !1), f.onerror = function() {
              if (!s) {
                console.log("warning: browser could not fully decode audio " + n + ", trying slower base64 approach");
                for (var e = "", r = 0, i = 0, a = 0; a < t.length; a++)
                  for (r = r << 8 | t[a], i += 8; i >= 6;) var u = r >> i - 6 & 63,
                    i = i - 6,
                    e = e + "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/" [u];
                2 == i ? (e += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/" [(3 & r) << 4], e += "==") : 4 == i && (e += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/" [(15 & r) << 2], e += "="), f.src = "data:audio/x-" + n.substr(-3) + ";base64," + e, o(f)
              }
            }, f.src = u, Hc(function() {
              o(f)
            })
          }
        });
        var i = e.canvas;
        i && (i.la = i.requestPointerLock || i.mozRequestPointerLock || i.webkitRequestPointerLock || i.msRequestPointerLock || function() {}, i.wa = document.exitPointerLock || document.mozExitPointerLock || document.webkitExitPointerLock || document.msExitPointerLock || function() {}, i.wa = i.wa.bind(document), document.addEventListener("pointerlockchange", t, !1), document.addEventListener("mozpointerlockchange", t, !1), document.addEventListener("webkitpointerlockchange", t, !1), document.addEventListener("mspointerlockchange", t, !1), e.elementPointerLock && i.addEventListener("click", function(e) {
          !zc && i.la && (i.la(), e.preventDefault())
        }, !1))
      }
    }

    function Ic(t, n, r, i) {
      if (n && e.fa && t == e.canvas) return e.fa;
      var o, a;
      if (n) {
        if (a = {
            antialias: !1,
            alpha: !1
          }, i)
          for (var s in i) a[s] = i[s];
        (a = GL.createContext(t, a)) && (o = GL.getContext(a).cd), t.style.backgroundColor = "black"
      } else o = t.getContext("2d");
      return o ? (r && (n || assert("undefined" == typeof GLctx, "cannot set in module if GLctx is used, but we are a non-GL context that would replace it"), e.fa = o, n && GL.yd(a), e.Dd = n, Ac.forEach(function(e) {
        e()
      }), Bc()), o) : null
    }

    function Mc(t, n, r) {
      function i() {
        yc = !1;
        var t = o.parentNode;
        (document.webkitFullScreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.mozFullscreenElement || document.fullScreenElement || document.fullscreenElement || document.msFullScreenElement || document.msFullscreenElement || document.webkitCurrentFullScreenElement) === t ? (o.ua = document.cancelFullScreen || document.mozCancelFullScreen || document.webkitCancelFullScreen || document.msExitFullscreen || document.exitFullscreen || function() {}, o.ua = o.ua.bind(document), Kc && o.la(), yc = !0, Lc && Nc()) : (t.parentNode.insertBefore(o, t), t.parentNode.removeChild(t), Lc && Oc()), e.onFullScreen && e.onFullScreen(yc), Pc(o)
      }
      Kc = t, Lc = n, Qc = r, "undefined" == typeof Kc && (Kc = !0), "undefined" == typeof Lc && (Lc = !1), "undefined" == typeof Qc && (Qc = null);
      var o = e.canvas;
      Jc || (Jc = !0, document.addEventListener("fullscreenchange", i, !1), document.addEventListener("mozfullscreenchange", i, !1), document.addEventListener("webkitfullscreenchange", i, !1), document.addEventListener("MSFullscreenChange", i, !1));
      var a = document.createElement("div");
      o.parentNode.insertBefore(a, o), a.appendChild(o), a.C = a.requestFullScreen || a.mozRequestFullScreen || a.msRequestFullscreen || (a.webkitRequestFullScreen ? function() {
        a.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT)
      } : null), r ? a.C({
        Ed: r
      }) : a.C()
    }

    function Sc(e) {
      var t = Date.now();
      if (0 === Rc) Rc = t + 1e3 / 60;
      else
        for (; t + 2 >= Rc;) Rc += 1e3 / 60;
      t = Math.max(Rc - t, 0), setTimeout(e, t)
    }

    function nc(e) {
      "undefined" == typeof window ? Sc(e) : (window.requestAnimationFrame || (window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || window.oRequestAnimationFrame || Sc), window.requestAnimationFrame(e))
    }

    function Hc(t) {
      e.noExitRuntime = !0, setTimeout(function() {
        A || t()
      }, 1e4)
    }

    function Gc(e) {
      return {
        jpg: "image/jpeg",
        jpeg: "image/jpeg",
        png: "image/png",
        bmp: "image/bmp",
        ogg: "audio/ogg",
        wav: "audio/wav",
        mp3: "audio/mpeg"
      }[e.substr(e.lastIndexOf(".") + 1)]
    }

    function Tc(e, t, n) {
      var r = new XMLHttpRequest;
      r.open("GET", e, !0), r.responseType = "arraybuffer", r.onload = function() {
        200 == r.status || 0 == r.status && r.response ? t(r.response) : n()
      }, r.onerror = n, r.send(null)
    }

    function Uc(e, t, n) {
      Tc(e, function(n) {
        assert(n, 'Loading data file "' + e + '" failed (no arrayBuffer).'), t(new Uint8Array(n)), Za()
      }, function() {
        if (!n) throw 'Loading data file "' + e + '" failed.';
        n()
      }), Ya()
    }

    function Wc() {
      var t = e.canvas;
      Vc.forEach(function(e) {
        e(t.width, t.height)
      })
    }

    function Nc() {
      if ("undefined" != typeof SDL) {
        var e = Ia[SDL.screen + 0 * n.H >> 2];
        F[SDL.screen + 0 * n.H >> 2] = 8388608 | e
      }
      Wc()
    }

    function Oc() {
      if ("undefined" != typeof SDL) {
        var e = Ia[SDL.screen + 0 * n.H >> 2];
        F[SDL.screen + 0 * n.H >> 2] = -8388609 & e
      }
      Wc()
    }

    function Pc(t, n, r) {
      n && r ? (t.fb = n, t.Va = r) : (n = t.fb, r = t.Va);
      var i = n,
        o = r;
      if (e.forcedAspectRatio && 0 < e.forcedAspectRatio && (i / o < e.forcedAspectRatio ? i = Math.round(o * e.forcedAspectRatio) : o = Math.round(i / e.forcedAspectRatio)), (document.webkitFullScreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.mozFullscreenElement || document.fullScreenElement || document.fullscreenElement || document.msFullScreenElement || document.msFullscreenElement || document.webkitCurrentFullScreenElement) === t.parentNode && "undefined" != typeof screen) var a = Math.min(screen.width / i, screen.height / o),
        i = Math.round(i * a),
        o = Math.round(o * a);
      Lc ? (t.width != i && (t.width = i), t.height != o && (t.height = o), "undefined" != typeof t.style && (t.style.removeProperty("width"), t.style.removeProperty("height"))) : (t.width != n && (t.width = n), t.height != r && (t.height = r), "undefined" != typeof t.style && (i != n || o != r ? (t.style.setProperty("width", i + "px", "important"), t.style.setProperty("height", o + "px", "important")) : (t.style.removeProperty("width"), t.style.removeProperty("height"))))
    }

    function xc(e) {
      this.name = "ExitStatus", this.message = "Program terminated with exit(" + e + ")", this.status = e
    }

    function $c(t) {
      function n() {
        if (!e.calledRun && (e.calledRun = !0, !A)) {
          if (xa || (xa = !0, Oa(Qa)), Oa(Ra), e.onRuntimeInitialized && e.onRuntimeInitialized(), e._main && bd && e.callMain(t), e.postRun)
            for ("function" == typeof e.postRun && (e.postRun = [e.postRun]); e.postRun.length;) Ua(e.postRun.shift());
          Oa(Sa)
        }
      }
      if (t = t || e.arguments, null === Yc && (Yc = Date.now()), !(L > 0)) {
        if (e.preRun)
          for ("function" == typeof e.preRun && (e.preRun = [e.preRun]); e.preRun.length;) Ta(e.preRun.shift());
        Oa(Pa), L > 0 || e.calledRun || (e.setStatus ? (e.setStatus("Running..."), setTimeout(function() {
          setTimeout(function() {
            e.setStatus("")
          }, 1), n()
        }, 1)) : n())
      }
    }

    function ad(t, n) {
      if (!n || !e.noExitRuntime) throw !e.noExitRuntime && (A = !0, m = void 0, Oa(K), e.onExit) && e.onExit(t), new xc(t)
    }

    function z(t) {
      void 0 !== t ? (e.print(t), e.S(t), t = JSON.stringify(t)) : t = "", A = !0;
      var n = "abort(" + t + ") at " + Ea() + "\nIf this abort() is unexpected, build with -s ASSERTIONS=1 which can give more information.";
      throw cd && cd.forEach(function(e) {
        n = e(n, t)
      }), n
    }
    var e = {},
      aa = {},
      l;
    for (l in e) e.hasOwnProperty(l) && (aa[l] = e[l]);
    e.read = function(e) {
      var t = new XMLHttpRequest;
      return t.open("GET", e, !1), t.send(null), t.responseText
    }, "undefined" != typeof arguments && (e.arguments = arguments), "undefined" != typeof console ? (e.print || (e.print = function(e) {
      console.log(e)
    }), e.printErr || (e.printErr = function(e) {
      console.log(e)
    })) : e.print || (e.print = function() {}), "undefined" == typeof e.setWindowTitle && (e.setWindowTitle = function(e) {
      document.title = e
    }), !e.load && e.read && (e.load = function(t) {
      ba(e.read(t))
    }), e.print || (e.print = function() {}), e.printErr || (e.printErr = e.print), e.arguments || (e.arguments = []), e.thisProgram || (e.thisProgram = "./this.program"), e.print = e.print, e.S = e.printErr, e.preRun = [], e.postRun = [];
    for (l in aa) aa.hasOwnProperty(l) && (e[l] = aa[l]);
    var n = {
      cb: function(e) {
        ca = e
      },
      Ua: function() {
        return ca
      },
      na: function() {
        return m
      },
      X: function(e) {
        m = e
      },
      Aa: function(e) {
        switch (e) {
          case "i1":
          case "i8":
            return 1;
          case "i16":
            return 2;
          case "i32":
            return 4;
          case "i64":
            return 8;
          case "float":
            return 4;
          case "double":
            return 8;
          default:
            return "*" === e[e.length - 1] ? n.H : "i" === e[0] ? (e = parseInt(e.substr(1)), assert(0 === e % 8), e / 8) : 0
        }
      },
      Ta: function(e) {
        return Math.max(n.Aa(e), n.H)
      },
      dd: 16,
      Bd: function(e, t) {
        return "double" === t || "i64" === t ? 7 & e && (assert(4 === (7 & e)), e += 4) : assert(0 === (3 & e)), e
      },
      od: function(e, t, r) {
        return r || "i64" != e && "double" != e ? e ? Math.min(t || (e ? n.Ta(e) : 0), n.H) : Math.min(t, 8) : 8
      },
      J: function(t, n, r) {
        return r && r.length ? (r.splice || (r = Array.prototype.slice.call(r)), r.splice(0, 0, n), e["dynCall_" + t].apply(null, r)) : e["dynCall_" + t].call(null, n)
      },
      U: [],
      Ma: function(e) {
        for (var t = 0; t < n.U.length; t++)
          if (!n.U[t]) return n.U[t] = e, 2 * (1 + t);
        throw "Finished up all reserved function pointers. Use a higher value for RESERVED_FUNCTION_POINTERS."
      },
      $a: function(e) {
        n.U[(e - 2) / 2] = null
      },
      M: function(t) {
        n.M.ma || (n.M.ma = {}), n.M.ma[t] || (n.M.ma[t] = 1, e.S(t))
      },
      ha: {},
      rd: function(e, t) {
        assert(t), n.ha[t] || (n.ha[t] = {});
        var r = n.ha[t];
        return r[e] || (r[e] = function() {
          return n.J(t, e, arguments)
        }), r[e]
      },
      pd: function() {
        throw "You must build with -s RETAIN_COMPILER_SETTINGS=1 for Runtime.getCompilerSetting or emscripten_get_compiler_setting to work"
      },
      W: function(e) {
        var t = m;
        return m = m + e | 0, m = m + 15 & -16, t
      },
      Ia: function(e) {
        var t = p;
        return p = p + e | 0, p = p + 15 & -16, t
      },
      P: function(e) {
        var t = v;
        return v = v + e | 0, v = v + 15 & -16, (e = v >= w) && (z("Cannot enlarge memory arrays. Either (1) compile with  -s TOTAL_MEMORY=X  with X higher than the current value " + w + ", (2) compile with  -s ALLOW_MEMORY_GROWTH=1  which adjusts the size at runtime but prevents some optimizations, (3) set Module.TOTAL_MEMORY to a higher value before the program runs, or if you want malloc to return NULL (0) instead of this abort, compile with  -s ABORTING_MALLOC=0 "), e = !0), e ? (v = t, 0) : t
      },
      ea: function(e, t) {
        return Math.ceil(e / (t ? t : 16)) * (t ? t : 16)
      },
      xd: function(e, t, n) {
        return n ? +(e >>> 0) + 4294967296 * +(t >>> 0) : +(e >>> 0) + 4294967296 * +(0 | t)
      },
      La: 8,
      H: 4,
      ed: 0
    };
    e.Runtime = n, n.addFunction = n.Ma, n.removeFunction = n.$a;
    var A = !1,
      da, fa, ca, ha, ia;
    ! function() {
      function a(e) {
        return e = e.toString().match(d).slice(1), {
          arguments: e[0],
          body: e[1],
          returnValue: e[2]
        }
      }
      var b = {
          stackSave: function() {
            n.na()
          },
          stackRestore: function() {
            n.X()
          },
          arrayToC: function(e) {
            var t = n.W(e.length);
            return ja(e, t), t
          },
          stringToC: function(e) {
            var t = 0;
            return null !== e && void 0 !== e && 0 !== e && (t = n.W((e.length << 2) + 1), ka(e, t)), t
          }
        },
        c = {
          string: b.stringToC,
          array: b.arrayToC
        };
      ia = function(e, t, r, i, o) {
        e = ga(e);
        var a = [],
          s = 0;
        if (i)
          for (var u = 0; u < i.length; u++) {
            var f = c[r[u]];
            f ? (0 === s && (s = n.na()), a[u] = f(i[u])) : a[u] = i[u]
          }
        if (r = e.apply(null, a), "string" === t && (r = la(r)), 0 !== s) {
          if (o && o.async) return void EmterpreterAsync.hd.push(function() {
            n.X(s)
          });
          n.X(s)
        }
        return r
      };
      var d = /^function\s*\(([^)]*)\)\s*{\s*([^*]*?)[\s;]*(?:return\s*(.*?)[;\s]*)?}$/,
        f = {},
        h;
      for (h in b) b.hasOwnProperty(h) && (f[h] = a(b[h]));
      ha = function(b, c, d) {
        d = d || [];
        var h = ga(b);
        b = d.every(function(e) {
          return "number" === e
        });
        var u = "string" !== c;
        if (u && b) return h;
        var q = d.map(function(e, t) {
          return "$" + t
        });
        c = "(function(" + q.join(",") + ") {";
        var y = d.length;
        if (!b) {
          c += "var stack = " + f.stackSave.body + ";";
          for (var B = 0; y > B; B++) {
            var J = q[B],
              ea = d[B];
            "number" !== ea && (ea = f[ea + "ToC"], c += "var " + ea.arguments + " = " + J + ";", c += ea.body + ";", c += J + "=" + ea.returnValue + ";")
          }
        }
        return d = a(function() {
          return h
        }).returnValue, c += "var ret = " + d + "(" + q.join(",") + ");", u || (d = a(function() {
          return la
        }).returnValue, c += "ret = " + d + "(ret);"), b || (c += f.stackRestore.body.replace("()", "(stack)") + ";"), eval(c + "return ret})")
      }
    }(), e.ccall = ia, e.cwrap = ha, e.setValue = ma, e.getValue = ta, e.ALLOC_NORMAL = 0, e.ALLOC_STACK = 1, e.ALLOC_STATIC = 2, e.ALLOC_DYNAMIC = 3, e.ALLOC_NONE = 4, e.allocate = G, e.getMemory = function(e) {
      return va ? "undefined" != typeof wa && !wa.C || !xa ? n.P(e) : ua(e) : n.Ia(e)
    }, e.Pointer_stringify = la, e.AsciiToString = function(e) {
      for (var t = "";;) {
        var n = D[e++ >> 0];
        if (!n) return t;
        t += String.fromCharCode(n)
      }
    }, e.stringToAscii = function(e, t) {
      return ya(e, t, !1)
    }, e.UTF8ArrayToString = za, e.UTF8ToString = function(e) {
      return za(H, e)
    }, e.stringToUTF8Array = Aa, e.stringToUTF8 = function(e, t, n) {
      return Aa(e, H, t, n)
    }, e.lengthBytesUTF8 = Ba, e.UTF16ToString = function(e) {
      for (var t = 0, n = "";;) {
        var r = E[e + 2 * t >> 1];
        if (0 == r) return n;
        ++t, n += String.fromCharCode(r)
      }
    }, e.stringToUTF16 = function(e, t, n) {
      if (void 0 === n && (n = 2147483647), 2 > n) return 0;
      n -= 2;
      var r = t;
      n = n < 2 * e.length ? n / 2 : e.length;
      for (var i = 0; n > i; ++i) E[t >> 1] = e.charCodeAt(i), t += 2;
      return E[t >> 1] = 0, t - r
    }, e.lengthBytesUTF16 = function(e) {
      return 2 * e.length
    }, e.UTF32ToString = function(e) {
      for (var t = 0, n = "";;) {
        var r = F[e + 4 * t >> 2];
        if (0 == r) return n;
        ++t, r >= 65536 ? (r -= 65536, n += String.fromCharCode(55296 | r >> 10, 56320 | 1023 & r)) : n += String.fromCharCode(r)
      }
    }, e.stringToUTF32 = function(e, t, n) {
      if (void 0 === n && (n = 2147483647), 4 > n) return 0;
      var r = t;
      n = r + n - 4;
      for (var i = 0; i < e.length; ++i) {
        var o = e.charCodeAt(i);
        if (o >= 55296 && 57343 >= o) var a = e.charCodeAt(++i),
          o = 65536 + ((1023 & o) << 10) | 1023 & a;
        if (F[t >> 2] = o, t += 4, t + 4 > n) break
      }
      return F[t >> 2] = 0, t - r
    }, e.lengthBytesUTF32 = function(e) {
      for (var t = 0, n = 0; n < e.length; ++n) {
        var r = e.charCodeAt(n);
        r >= 55296 && 57343 >= r && ++n, t += 4
      }
      return t
    }, e.stackTrace = function() {
      return Ea()
    };
    for (var D, H, E, Ha, F, Ia, ra, sa, Ja = 0, p = 0, va = !1, Ka = 0, m = 0, La = 0, Ma = 0, v = 0, Na = e.TOTAL_STACK || 5242880, w = e.TOTAL_MEMORY || 16777216, I = 65536; w > I || 2 * Na > I;) I = 16777216 > I ? 2 * I : I + 16777216;
    I !== w && (w = I), assert("undefined" != typeof Int32Array && "undefined" != typeof Float64Array && !!new Int32Array(1).subarray && !!new Int32Array(1).set, "JS engine does not provide full typed array support");
    var buffer;
    buffer = new ArrayBuffer(w), D = new Int8Array(buffer), E = new Int16Array(buffer), F = new Int32Array(buffer), H = new Uint8Array(buffer), Ha = new Uint16Array(buffer), Ia = new Uint32Array(buffer), ra = new Float32Array(buffer), sa = new Float64Array(buffer), F[0] = 255, assert(255 === H[0] && 0 === H[3], "Typed arrays 2 must be run on a little-endian system"), e.HEAP = void 0, e.buffer = buffer, e.HEAP8 = D, e.HEAP16 = E, e.HEAP32 = F, e.HEAPU8 = H, e.HEAPU16 = Ha, e.HEAPU32 = Ia, e.HEAPF32 = ra, e.HEAPF64 = sa;
    var Pa = [],
      Qa = [],
      Ra = [],
      K = [],
      Sa = [],
      xa = !1;
    e.addOnPreRun = Ta, e.addOnInit = function(e) {
      Qa.unshift(e)
    }, e.addOnPreMain = function(e) {
      Ra.unshift(e)
    }, e.addOnExit = function(e) {
      K.unshift(e)
    }, e.addOnPostRun = Ua, e.intArrayFromString = Va, e.intArrayToString = function(e) {
      for (var t = [], n = 0; n < e.length; n++) {
        var r = e[n];
        r > 255 && (r &= 255), t.push(String.fromCharCode(r))
      }
      return t.join("")
    }, e.writeStringToMemory = ka, e.writeArrayToMemory = ja, e.writeAsciiToMemory = ya, Math.imul && -5 === Math.imul(4294967295, 5) || (Math.imul = function(e, t) {
      var n = 65535 & e,
        r = 65535 & t;
      return n * r + ((e >>> 16) * r + n * (t >>> 16) << 16) | 0
    }), Math.td = Math.imul, Math.clz32 || (Math.clz32 = function(e) {
      e >>>= 0;
      for (var t = 0; 32 > t; t++)
        if (e & 1 << 31 - t) return t;
      return 32
    }), Math.kd = Math.clz32;
    var na = Math.abs,
      qa = Math.ceil,
      pa = Math.floor,
      oa = Math.min,
      L = 0,
      Wa = null,
      Xa = null;
    e.addRunDependency = Ya, e.removeRunDependency = Za, e.preloadedImages = {}, e.preloadedAudios = {}, Ja = 8, p = Ja + 1696, Qa.push(), G([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 60, 0, 0, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 2, 0, 0, 0, 164, 2, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 255, 255, 255, 255, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], "i8", 4, n.La);
    var $a = n.ea(G(12, "i8", 2), 8);
    assert(0 == $a % 8), e._bitshift64Ashr = ab, e._i64Subtract = bb, e._i64Add = cb, e._memset = db, e._bitshift64Lshr = fb, e._bitshift64Shl = gb;
    var M = {
        G: 1,
        B: 2,
        Qc: 3,
        Nb: 4,
        F: 5,
        sa: 6,
        gb: 7,
        kc: 8,
        Z: 9,
        ub: 10,
        oa: 11,
        $c: 11,
        Ka: 12,
        Y: 13,
        Gb: 14,
        wc: 15,
        $: 16,
        pa: 17,
        ad: 18,
        ba: 19,
        qa: 20,
        N: 21,
        u: 22,
        fc: 23,
        Ja: 24,
        O: 25,
        Xc: 26,
        Hb: 27,
        sc: 28,
        da: 29,
        Nc: 30,
        Zb: 31,
        Gc: 32,
        Db: 33,
        Kc: 34,
        oc: 42,
        Kb: 43,
        vb: 44,
        Qb: 45,
        Rb: 46,
        Sb: 47,
        Yb: 48,
        Yc: 49,
        ic: 50,
        Pb: 51,
        Ab: 35,
        lc: 37,
        mb: 52,
        pb: 53,
        bd: 54,
        gc: 55,
        qb: 56,
        rb: 57,
        Bb: 35,
        sb: 59,
        uc: 60,
        jc: 61,
        Uc: 62,
        tc: 63,
        pc: 64,
        qc: 65,
        Mc: 66,
        mc: 67,
        jb: 68,
        Rc: 69,
        wb: 70,
        Hc: 71,
        ac: 72,
        Eb: 73,
        ob: 74,
        Bc: 76,
        nb: 77,
        Lc: 78,
        Tb: 79,
        Ub: 80,
        Xb: 81,
        Wb: 82,
        Vb: 83,
        vc: 38,
        ra: 39,
        bc: 36,
        aa: 40,
        Cc: 95,
        Fc: 96,
        zb: 104,
        hc: 105,
        kb: 97,
        Jc: 91,
        zc: 88,
        rc: 92,
        Oc: 108,
        yb: 111,
        hb: 98,
        xb: 103,
        ec: 101,
        cc: 100,
        Vc: 110,
        Ib: 112,
        Jb: 113,
        Mb: 115,
        lb: 114,
        Cb: 89,
        $b: 90,
        Ic: 93,
        Pc: 94,
        ib: 99,
        dc: 102,
        Ob: 106,
        xc: 107,
        Wc: 109,
        Zc: 87,
        Fb: 122,
        Sc: 116,
        Ac: 95,
        nc: 123,
        Lb: 84,
        Dc: 75,
        tb: 125,
        yc: 131,
        Ec: 130,
        Tc: 86
      },
      hb = {
        0: "Success",
        1: "Not super-user",
        2: "No such file or directory",
        3: "No such process",
        4: "Interrupted system call",
        5: "I/O error",
        6: "No such device or address",
        7: "Arg list too long",
        8: "Exec format error",
        9: "Bad file number",
        10: "No children",
        11: "No more processes",
        12: "Not enough core",
        13: "Permission denied",
        14: "Bad address",
        15: "Block device required",
        16: "Mount device busy",
        17: "File exists",
        18: "Cross-device link",
        19: "No such device",
        20: "Not a directory",
        21: "Is a directory",
        22: "Invalid argument",
        23: "Too many open files in system",
        24: "Too many open files",
        25: "Not a typewriter",
        26: "Text file busy",
        27: "File too large",
        28: "No space left on device",
        29: "Illegal seek",
        30: "Read only file system",
        31: "Too many links",
        32: "Broken pipe",
        33: "Math arg out of domain of func",
        34: "Math result not representable",
        35: "File locking deadlock error",
        36: "File or path name too long",
        37: "No record locks available",
        38: "Function not implemented",
        39: "Directory not empty",
        40: "Too many symbolic links",
        42: "No message of desired type",
        43: "Identifier removed",
        44: "Channel number out of range",
        45: "Level 2 not synchronized",
        46: "Level 3 halted",
        47: "Level 3 reset",
        48: "Link number out of range",
        49: "Protocol driver not attached",
        50: "No CSI structure available",
        51: "Level 2 halted",
        52: "Invalid exchange",
        53: "Invalid request descriptor",
        54: "Exchange full",
        55: "No anode",
        56: "Invalid request code",
        57: "Invalid slot",
        59: "Bad font file fmt",
        60: "Device not a stream",
        61: "No data (for no delay io)",
        62: "Timer expired",
        63: "Out of streams resources",
        64: "Machine is not on the network",
        65: "Package not installed",
        66: "The object is remote",
        67: "The link has been severed",
        68: "Advertise error",
        69: "Srmount error",
        70: "Communication error on send",
        71: "Protocol error",
        72: "Multihop attempted",
        73: "Cross mount point (not really error)",
        74: "Trying to read unreadable message",
        75: "Value too large for defined data type",
        76: "Given log. name not unique",
        77: "f.d. invalid for this operation",
        78: "Remote address changed",
        79: "Can   access a needed shared lib",
        80: "Accessing a corrupted shared lib",
        81: ".lib section in a.out corrupted",
        82: "Attempting to link in too many libs",
        83: "Attempting to exec a shared library",
        84: "Illegal byte sequence",
        86: "Streams pipe error",
        87: "Too many users",
        88: "Socket operation on non-socket",
        89: "Destination address required",
        90: "Message too long",
        91: "Protocol wrong type for socket",
        92: "Protocol not available",
        93: "Unknown protocol",
        94: "Socket type not supported",
        95: "Not supported",
        96: "Protocol family not supported",
        97: "Address family not supported by protocol family",
        98: "Address already in use",
        99: "Address not available",
        100: "Network interface is not configured",
        101: "Network is unreachable",
        102: "Connection reset by network",
        103: "Connection aborted",
        104: "Connection reset by peer",
        105: "No buffer space available",
        106: "Socket is already connected",
        107: "Socket is not connected",
        108: "Can't send after socket shutdown",
        109: "Too many references",
        110: "Connection timed out",
        111: "Connection refused",
        112: "Host is down",
        113: "Host is unreachable",
        114: "Socket already connected",
        115: "Connection already in progress",
        116: "Stale file handle",
        122: "Quota exceeded",
        123: "No medium (in tape drive)",
        125: "Operation canceled",
        130: "Previous owner died",
        131: "State not recoverable"
      },
      nb = [],
      qb = {
        open: function(e) {
          var t = nb[e.g.rdev];
          if (!t) throw new O(M.ba);
          e.tty = t, e.seekable = !1
        },
        close: function(e) {
          e.tty.L.flush(e.tty)
        },
        flush: function(e) {
          e.tty.L.flush(e.tty)
        },
        read: function(e, t, n, r) {
          if (!e.tty || !e.tty.L.Ba) throw new O(M.sa);
          for (var i = 0, o = 0; r > o; o++) {
            var a;
            try {
              a = e.tty.L.Ba(e.tty)
            } catch (s) {
              throw new O(M.F)
            }
            if (void 0 === a && 0 === i) throw new O(M.oa);
            if (null === a || void 0 === a) break;
            i++, t[n + o] = a
          }
          return i && (e.g.timestamp = Date.now()), i
        },
        write: function(e, t, n, r) {
          if (!e.tty || !e.tty.L.ja) throw new O(M.sa);
          for (var i = 0; r > i; i++) try {
            e.tty.L.ja(e.tty, t[n + i])
          } catch (o) {
            throw new O(M.F)
          }
          return r && (e.g.timestamp = Date.now()), i
        }
      },
      rb = {
        Ba: function(e) {
          if (!e.input.length) {
            var t = null;
            if ("undefined" != typeof window && "function" == typeof window.prompt ? (t = window.prompt("Input: "), null !== t && (t += "\n")) : "function" == typeof readline && (t = readline(), null !== t && (t += "\n")), !t) return null;
            e.input = Va(t, !0)
          }
          return e.input.shift()
        },
        ja: function(t, n) {
          null === n || 10 === n ? (e.print(za(t.output, 0)), t.output = []) : 0 != n && t.output.push(n)
        },
        flush: function(t) {
          t.output && 0 < t.output.length && (e.print(za(t.output, 0)), t.output = [])
        }
      },
      sb = {
        ja: function(t, n) {
          null === n || 10 === n ? (e.printErr(za(t.output, 0)), t.output = []) : 0 != n && t.output.push(n)
        },
        flush: function(t) {
          t.output && 0 < t.output.length && (e.printErr(za(t.output, 0)), t.output = [])
        }
      },
      P = {
        q: null,
        A: function() {
          return P.createNode(null, "/", 16895, 0)
        },
        createNode: function(e, t, n, r) {
          if (24576 === (61440 & n) || 4096 === (61440 & n)) throw new O(M.G);
          return P.q || (P.q = {
            dir: {
              g: {
                D: P.k.D,
                p: P.k.p,
                lookup: P.k.lookup,
                V: P.k.V,
                rename: P.k.rename,
                unlink: P.k.unlink,
                rmdir: P.k.rmdir,
                readdir: P.k.readdir,
                symlink: P.k.symlink
              },
              stream: {
                I: P.n.I
              }
            },
            file: {
              g: {
                D: P.k.D,
                p: P.k.p
              },
              stream: {
                I: P.n.I,
                read: P.n.read,
                write: P.n.write,
                ta: P.n.ta,
                Ea: P.n.Ea,
                Ga: P.n.Ga
              }
            },
            link: {
              g: {
                D: P.k.D,
                p: P.k.p,
                readlink: P.k.readlink
              },
              stream: {}
            },
            va: {
              g: {
                D: P.k.D,
                p: P.k.p
              },
              stream: tb
            }
          }), n = ub(e, t, n, r), 16384 === (61440 & n.mode) ? (n.k = P.q.dir.g, n.n = P.q.dir.stream, n.e = {}) : 32768 === (61440 & n.mode) ? (n.k = P.q.file.g, n.n = P.q.file.stream, n.o = 0, n.e = null) : 40960 === (61440 & n.mode) ? (n.k = P.q.link.g, n.n = P.q.link.stream) : 8192 === (61440 & n.mode) && (n.k = P.q.va.g, n.n = P.q.va.stream), n.timestamp = Date.now(), e && (e.e[t] = n), n
        },
        Sa: function(e) {
          if (e.e && e.e.subarray) {
            for (var t = [], n = 0; n < e.o; ++n) t.push(e.e[n]);
            return t
          }
          return e.e
        },
        qd: function(e) {
          return e.e ? e.e.subarray ? e.e.subarray(0, e.o) : new Uint8Array(e.e) : new Uint8Array
        },
        ya: function(e, t) {
          if (e.e && e.e.subarray && t > e.e.length && (e.e = P.Sa(e), e.o = e.e.length), !e.e || e.e.subarray) {
            var n = e.e ? e.e.buffer.byteLength : 0;
            n >= t || (t = Math.max(t, n * (1048576 > n ? 2 : 1.125) | 0), 0 != n && (t = Math.max(t, 256)), n = e.e, e.e = new Uint8Array(t), 0 < e.o && e.e.set(n.subarray(0, e.o), 0))
          } else
            for (!e.e && t > 0 && (e.e = []); e.e.length < t;) e.e.push(0)
        },
        ab: function(e, t) {
          if (e.o != t)
            if (0 == t) e.e = null, e.o = 0;
            else {
              if (!e.e || e.e.subarray) {
                var n = e.e;
                e.e = new Uint8Array(new ArrayBuffer(t)), n && e.e.set(n.subarray(0, Math.min(t, e.o)))
              } else if (e.e || (e.e = []), e.e.length > t) e.e.length = t;
              else
                for (; e.e.length < t;) e.e.push(0);
              e.o = t
            }
        },
        k: {
          D: function(e) {
            var t = {};
            return t.dev = 8192 === (61440 & e.mode) ? e.id : 1, t.ino = e.id, t.mode = e.mode, t.nlink = 1, t.uid = 0, t.gid = 0, t.rdev = e.rdev, 16384 === (61440 & e.mode) ? t.size = 4096 : 32768 === (61440 & e.mode) ? t.size = e.o : 40960 === (61440 & e.mode) ? t.size = e.link.length : t.size = 0, t.atime = new Date(e.timestamp), t.mtime = new Date(e.timestamp), t.ctime = new Date(e.timestamp), t.Pa = 4096, t.blocks = Math.ceil(t.size / t.Pa), t
          },
          p: function(e, t) {
            void 0 !== t.mode && (e.mode = t.mode), void 0 !== t.timestamp && (e.timestamp = t.timestamp), void 0 !== t.size && P.ab(e, t.size)
          },
          lookup: function() {
            throw vb[M.B]
          },
          V: function(e, t, n, r) {
            return P.createNode(e, t, n, r)
          },
          rename: function(e, t, n) {
            if (16384 === (61440 & e.mode)) {
              var r;
              try {
                r = wb(t, n)
              } catch (i) {}
              if (r)
                for (var o in r.e) throw new O(M.ra)
            }
            delete e.parent.e[e.name], e.name = n, t.e[n] = e, e.parent = t
          },
          unlink: function(e, t) {
            delete e.e[t]
          },
          rmdir: function(e, t) {
            var n, r = wb(e, t);
            for (n in r.e) throw new O(M.ra);
            delete e.e[t]
          },
          readdir: function(e) {
            var t, n = [".", ".."];
            for (t in e.e) e.e.hasOwnProperty(t) && n.push(t);
            return n
          },
          symlink: function(e, t, n) {
            return e = P.createNode(e, t, 41471, 0), e.link = n, e
          },
          readlink: function(e) {
            if (40960 !== (61440 & e.mode)) throw new O(M.u);
            return e.link
          }
        },
        n: {
          read: function(e, t, n, r, i) {
            var o = e.g.e;
            if (i >= e.g.o) return 0;
            if (e = Math.min(e.g.o - i, r), assert(e >= 0), e > 8 && o.subarray) t.set(o.subarray(i, i + e), n);
            else
              for (r = 0; e > r; r++) t[n + r] = o[i + r];
            return e
          },
          write: function(e, t, n, r, i, o) {
            if (!r) return 0;
            if (e = e.g, e.timestamp = Date.now(), t.subarray && (!e.e || e.e.subarray)) {
              if (o) return e.e = t.subarray(n, n + r), e.o = r;
              if (0 === e.o && 0 === i) return e.e = new Uint8Array(t.subarray(n, n + r)), e.o = r;
              if (i + r <= e.o) return e.e.set(t.subarray(n, n + r), i), r
            }
            if (P.ya(e, i + r), e.e.subarray && t.subarray) e.e.set(t.subarray(n, n + r), i);
            else
              for (o = 0; r > o; o++) e.e[i + o] = t[n + o];
            return e.o = Math.max(e.o, i + r), r
          },
          I: function(e, t, n) {
            if (1 === n ? t += e.position : 2 === n && 32768 === (61440 & e.g.mode) && (t += e.g.o), 0 > t) throw new O(M.u);
            return t
          },
          ta: function(e, t, n) {
            P.ya(e.g, t + n), e.g.o = Math.max(e.g.o, t + n)
          },
          Ea: function(e, t, n, r, i, o, a) {
            if (32768 !== (61440 & e.g.mode)) throw new O(M.ba);
            if (n = e.g.e, 2 & a || n.buffer !== t && n.buffer !== t.buffer) {
              if ((i > 0 || i + r < e.g.o) && (n = n.subarray ? n.subarray(i, i + r) : Array.prototype.slice.call(n, i, i + r)), e = !0, r = ua(r), !r) throw new O(M.Ka);
              t.set(n, r)
            } else e = !1, r = n.byteOffset;
            return {
              Cd: r,
              gd: e
            }
          },
          Ga: function(e, t, n, r, i) {
            if (32768 !== (61440 & e.g.mode)) throw new O(M.ba);
            return 2 & i ? 0 : (P.n.write(e, t, 0, r, n, !1), 0)
          }
        }
      };
    G(1, "i32*", 2), G(1, "i32*", 2), G(1, "i32*", 2);
    var xb = null,
      yb = [null],
      zb = [],
      Ab = 1,
      R = null,
      Cb = !0,
      S = {},
      O = null,
      vb = {},
      Ib = {
        r: 0,
        rs: 1052672,
        "r+": 2,
        w: 577,
        wx: 705,
        xw: 705,
        "w+": 578,
        "wx+": 706,
        "xw+": 706,
        a: 1089,
        ax: 1217,
        xa: 1217,
        "a+": 1090,
        "ax+": 1218,
        "xa+": 1218
      },
      tb = {
        open: function(e) {
          e.n = yb[e.g.rdev].n, e.n.open && e.n.open(e)
        },
        I: function() {
          throw new O(M.da)
        }
      },
      Zb, dc = {},
      Hb, Mb, Ub, ec = 0;
    e._memcpy = gc;
    var Y = null,
      mc = "",
      qc = 0,
      kc = null,
      pc = 0,
      ic = 0,
      jc = 0,
      uc = 0,
      rc = [],
      wc = {},
      lc, sc, yc = !1,
      zc = !1,
      Ac = [],
      Jc = !1,
      Kc = void 0,
      Lc = void 0,
      Rc = 0,
      Vc = [],
      Cc, Dc, Ec, Fc, Qc;
    Yb(), R = Array(4096), Nb(P, "/"), V("/tmp"), V("/home"), V("/home/web_user"),
      function() {
        V("/dev"), pb(259, {
          read: function() {
            return 0
          },
          write: function(e, t, n, r) {
            return r
          }
        }), Qb("/dev/null", 259), ob(1280, rb), ob(1536, sb), Qb("/dev/tty", 1280), Qb("/dev/tty1", 1536);
        var e;
        if ("undefined" != typeof crypto) {
          var t = new Uint8Array(1);
          e = function() {
            return crypto.getRandomValues(t), t[0]
          }
        } else e = function() {
          return 256 * Math.random() | 0
        };
        W("/dev", "random", e), W("/dev", "urandom", e), V("/dev/shm"), V("/dev/shm/tmp")
      }(), V("/proc"), V("/proc/self"), V("/proc/self/fd"), Nb({
        A: function() {
          var e = ub("/proc/self", "fd", 16895, 73);
          return e.k = {
            lookup: function(e, t) {
              var n = zb[+t];
              if (!n) throw new O(M.Z);
              var r = {
                parent: null,
                A: {
                  Fa: "fake"
                },
                k: {
                  readlink: function() {
                    return n.path
                  }
                }
              };
              return r.parent = r
            }
          }, e
        }
      }, "/proc/self/fd"), Qa.unshift(function() {
        if (!e.noFSInit && !Zb) {
          assert(!Zb, "FS.init was previously called. If you want to initialize later with custom parameters, remove any earlier calls (note that one is automatically added to the generated code)"), Zb = !0, Yb(), e.stdin = e.stdin, e.stdout = e.stdout, e.stderr = e.stderr, e.stdin ? W("/dev", "stdin", e.stdin) : Rb("/dev/tty", "/dev/stdin"), e.stdout ? W("/dev", "stdout", null, e.stdout) : Rb("/dev/tty", "/dev/stdout"), e.stderr ? W("/dev", "stderr", null, e.stderr) : Rb("/dev/tty1", "/dev/stderr");
          var t = Tb("/dev/stdin", "r");
          assert(0 === t.fd, "invalid handle for stdin (" + t.fd + ")"), t = Tb("/dev/stdout", "w"), assert(1 === t.fd, "invalid handle for stdout (" + t.fd + ")"), t = Tb("/dev/stderr", "w"), assert(2 === t.fd, "invalid handle for stderr (" + t.fd + ")")
        }
      }), Ra.push(function() {
        Cb = !1
      }), K.push(function() {
        Zb = !1;
        var t = e._fflush;
        for (t && t(0), t = 0; t < zb.length; t++) {
          var n = zb[t];
          n && Vb(n)
        }
      }), e.FS_createFolder = function(e, t, n, r) {
        return e = N(("string" == typeof e ? e : U(e)) + "/" + t), V(e, $b(n, r))
      }, e.FS_createPath = function(e, t) {
        e = "string" == typeof e ? e : U(e);
        for (var n = t.split("/").reverse(); n.length;) {
          var r = n.pop();
          if (r) {
            var i = N(e + "/" + r);
            try {
              V(i)
            } catch (o) {}
            e = i
          }
        }
        return i
      }, e.FS_createDataFile = bc, e.FS_createPreloadedFile = function(t, n, r, i, o, a, s, u, c, f) {
        function l(r) {
          function l(e) {
            f && f(), u || bc(t, n, e, i, o, c), a && a(), Za()
          }
          var d = !1;
          e.preloadPlugins.forEach(function(e) {
            !d && e.canHandle(h) && (e.handle(r, h, l, function() {
              s && s(), Za()
            }), d = !0)
          }), d || l(r)
        }
        Bc();
        var h = n ? mb(N(t + "/" + n)) : t;
        Ya(), "string" == typeof r ? Uc(r, function(e) {
          l(e)
        }, s) : l(r)
      }, e.FS_createLazyFile = function(e, t, n, r, i) {
        if ("undefined" != typeof XMLHttpRequest) throw "Cannot do synchronous binary XHRs outside webworkers in modern browsers. Use --embed-file or --preload-file in emcc";
        n = {
          Ca: !1,
          url: n
        };
        var o = ac(e, t, r, i);
        n.e ? o.e = n.e : n.url && (o.e = null, o.url = n.url), Object.defineProperty(o, "usedBytes", {
          get: function() {
            return this.e.length
          }
        });
        var a = {};
        return Object.keys(o.n).forEach(function(e) {
          var t = o.n[e];
          a[e] = function() {
            if (!cc(o)) throw new O(M.F);
            return t.apply(null, arguments)
          }
        }), a.read = function(e, t, n, r, i) {
          if (!cc(o)) throw new O(M.F);
          if (e = e.g.e, i >= e.length) return 0;
          if (r = Math.min(e.length - i, r), assert(r >= 0), e.slice)
            for (var a = 0; r > a; a++) t[n + a] = e[i + a];
          else
            for (a = 0; r > a; a++) t[n + a] = e.get(i + a);
          return r
        }, o.n = a, o
      }, e.FS_createLink = function(e, t, n) {
        return e = N(("string" == typeof e ? e : U(e)) + "/" + t), Rb(n, e)
      }, e.FS_createDevice = W, e.FS_unlink = function(e) {
        var t, n = T(e, {
            parent: !0
          }).g,
          r = lb(e),
          i = wb(n, r);
        e: {
          try {
            t = wb(n, r)
          } catch (o) {
            t = o.Q;
            break e
          }
          var a = Gb(n, "wx");t = a ? a : 16384 === (61440 & t.mode) ? M.N : 0
        }
        if (t) throw t === M.N && (t = M.G), new O(t);
        if (!n.k.unlink) throw new O(M.G);
        if (i.R) throw new O(M.$);
        try {
          S.willDeletePath && S.willDeletePath(e)
        } catch (s) {
          console.log("FS.trackingDelegate['willDeletePath']('" + e + "') threw an exception: " + s.message)
        }
        if (n.k.unlink(n, r), n = Eb(i.parent.id, i.name), R[n] === i) R[n] = i.K;
        else
          for (n = R[n]; n;) {
            if (n.K === i) {
              n.K = i.K;
              break
            }
            n = n.K
          }
        try {
          S.onDeletePath && S.onDeletePath(e)
        } catch (u) {
          console.log("FS.trackingDelegate['onDeletePath']('" + e + "') threw an exception: " + u.message)
        }
      }, Qa.unshift(function() {}), K.push(function() {}), e.requestFullScreen = function(e, t, n) {
        Mc(e, t, n)
      }, e.requestAnimationFrame = function(e) {
        nc(e)
      }, e.setCanvasSize = function(t, n, r) {
        Pc(e.canvas, t, n), r || Wc()
      }, e.pauseMainLoop = function() {
        Y = null, qc++
      }, e.resumeMainLoop = function() {
        qc++;
        var e = ic,
          t = jc,
          n = kc;
        kc = null, oc(n, 0, !1, pc, !0), hc(e, t), Y()
      }, e.getUserMedia = function() {
        window.C || (window.C = navigator.getUserMedia || navigator.mozGetUserMedia), window.C(void 0)
      }, e.createContext = function(e, t, n, r) {
        return Ic(e, t, n, r)
      }, Ka = m = n.ea(p), va = !0, La = Ka + Na, Ma = v = n.ea(La), assert(w > Ma, "TOTAL_MEMORY not big enough for stack");
    var Xc = G([8, 0, 1, 0, 2, 0, 1, 0, 3, 0, 1, 0, 2, 0, 1, 0, 4, 0, 1, 0, 2, 0, 1, 0, 3, 0, 1, 0, 2, 0, 1, 0, 5, 0, 1, 0, 2, 0, 1, 0, 3, 0, 1, 0, 2, 0, 1, 0, 4, 0, 1, 0, 2, 0, 1, 0, 3, 0, 1, 0, 2, 0, 1, 0, 6, 0, 1, 0, 2, 0, 1, 0, 3, 0, 1, 0, 2, 0, 1, 0, 4, 0, 1, 0, 2, 0, 1, 0, 3, 0, 1, 0, 2, 0, 1, 0, 5, 0, 1, 0, 2, 0, 1, 0, 3, 0, 1, 0, 2, 0, 1, 0, 4, 0, 1, 0, 2, 0, 1, 0, 3, 0, 1, 0, 2, 0, 1, 0, 7, 0, 1, 0, 2, 0, 1, 0, 3, 0, 1, 0, 2, 0, 1, 0, 4, 0, 1, 0, 2, 0, 1, 0, 3, 0, 1, 0, 2, 0, 1, 0, 5, 0, 1, 0, 2, 0, 1, 0, 3, 0, 1, 0, 2, 0, 1, 0, 4, 0, 1, 0, 2, 0, 1, 0, 3, 0, 1, 0, 2, 0, 1, 0, 6, 0, 1, 0, 2, 0, 1, 0, 3, 0, 1, 0, 2, 0, 1, 0, 4, 0, 1, 0, 2, 0, 1, 0, 3, 0, 1, 0, 2, 0, 1, 0, 5, 0, 1, 0, 2, 0, 1, 0, 3, 0, 1, 0, 2, 0, 1, 0, 4, 0, 1, 0, 2, 0, 1, 0, 3, 0, 1, 0, 2, 0, 1, 0], "i8", 3);
    e.Na = {
      Math: Math,
      Int8Array: Int8Array,
      Int16Array: Int16Array,
      Int32Array: Int32Array,
      Uint8Array: Uint8Array,
      Uint16Array: Uint16Array,
      Uint32Array: Uint32Array,
      Float32Array: Float32Array,
      Float64Array: Float64Array,
      NaN: NaN,
      Infinity: 1 / 0
    }, e.Oa = {
      abort: z,
      assert: assert,
      invoke_ii: function(t, n) {
        try {
          return e.dynCall_ii(t, n)
        } catch (r) {
          if ("number" != typeof r && "longjmp" !== r) throw r;
          Z.setThrew(1, 0)
        }
      },
      invoke_iiii: function(t, n, r, i) {
        try {
          return e.dynCall_iiii(t, n, r, i)
        } catch (o) {
          if ("number" != typeof o && "longjmp" !== o) throw o;
          Z.setThrew(1, 0)
        }
      },
      invoke_vi: function(t, n) {
        try {
          e.dynCall_vi(t, n)
        } catch (r) {
          if ("number" != typeof r && "longjmp" !== r) throw r;
          Z.setThrew(1, 0)
        }
      },
      _pthread_cleanup_pop: function() {
        assert(eb.level == K.length, "cannot pop if something else added meanwhile!"), K.pop(), eb.level = K.length
      },
      ___lock: function() {},
      _emscripten_set_main_loop: oc,
      _pthread_self: function() {
        return 0
      },
      ___syscall6: function(e, t) {
        ec = t;
        try {
          var n = fc();
          return Vb(n), 0
        } catch (r) {
          return "undefined" != typeof dc && r instanceof O || z(r), -r.Q
        }
      },
      _emscripten_set_main_loop_timing: hc,
      _abort: function() {
        e.abort()
      },
      _sbrk: wa,
      _time: function(e) {
        var t = Date.now() / 1e3 | 0;
        return e && (F[e >> 2] = t), t
      },
      ___setErrNo: ib,
      _emscripten_memcpy_big: function(e, t, n) {
        return H.set(H.subarray(t, t + n), e), e
      },
      ___syscall54: function(e, t) {
        ec = t;
        try {
          var n = fc(),
            r = X();
          switch (r) {
            case 21505:
              return n.tty ? 0 : -M.O;
            case 21506:
              return n.tty ? 0 : -M.O;
            case 21519:
              if (!n.tty) return -M.O;
              var i = X();
              return F[i >> 2] = 0;
            case 21520:
              return n.tty ? -M.u : -M.O;
            case 21531:
              if (i = X(), !n.n.Wa) throw new O(M.O);
              return n.n.Wa(n, r, i);
            default:
              z("bad ioctl syscall " + r)
          }
        } catch (o) {
          return "undefined" != typeof dc && o instanceof O || z(o), -o.Q
        }
      },
      ___unlock: function() {},
      ___syscall140: function(e, t) {
        ec = t;
        try {
          var n = fc(),
            r = X(),
            i = X(),
            o = X(),
            a = X();
          return assert(0 === r), Wb(n, i, a), F[o >> 2] = n.position, n.ia && 0 === i && 0 === a && (n.ia = null), 0
        } catch (s) {
          return "undefined" != typeof dc && s instanceof O || z(s), -s.Q
        }
      },
      _pthread_cleanup_push: eb,
      _sysconf: function(e) {
        switch (e) {
          case 30:
            return 4096;
          case 85:
            return I / 4096;
          case 132:
          case 133:
          case 12:
          case 137:
          case 138:
          case 15:
          case 235:
          case 16:
          case 17:
          case 18:
          case 19:
          case 20:
          case 149:
          case 13:
          case 10:
          case 236:
          case 153:
          case 9:
          case 21:
          case 22:
          case 159:
          case 154:
          case 14:
          case 77:
          case 78:
          case 139:
          case 80:
          case 81:
          case 82:
          case 68:
          case 67:
          case 164:
          case 11:
          case 29:
          case 47:
          case 48:
          case 95:
          case 52:
          case 51:
          case 46:
            return 200809;
          case 79:
            return 0;
          case 27:
          case 246:
          case 127:
          case 128:
          case 23:
          case 24:
          case 160:
          case 161:
          case 181:
          case 182:
          case 242:
          case 183:
          case 184:
          case 243:
          case 244:
          case 245:
          case 165:
          case 178:
          case 179:
          case 49:
          case 50:
          case 168:
          case 169:
          case 175:
          case 170:
          case 171:
          case 172:
          case 97:
          case 76:
          case 32:
          case 173:
          case 35:
            return -1;
          case 176:
          case 177:
          case 7:
          case 155:
          case 8:
          case 157:
          case 125:
          case 126:
          case 92:
          case 93:
          case 129:
          case 130:
          case 131:
          case 94:
          case 91:
            return 1;
          case 74:
          case 60:
          case 69:
          case 70:
          case 4:
            return 1024;
          case 31:
          case 42:
          case 72:
            return 32;
          case 87:
          case 26:
          case 33:
            return 2147483647;
          case 34:
          case 1:
            return 47839;
          case 38:
          case 36:
            return 99;
          case 43:
          case 37:
            return 2048;
          case 0:
            return 2097152;
          case 3:
            return 65536;
          case 28:
            return 32768;
          case 44:
            return 32767;
          case 75:
            return 16384;
          case 39:
            return 1e3;
          case 89:
            return 700;
          case 71:
            return 256;
          case 40:
            return 255;
          case 2:
            return 100;
          case 180:
            return 64;
          case 25:
            return 20;
          case 5:
            return 16;
          case 6:
            return 6;
          case 73:
            return 4;
          case 84:
            return "object" == typeof navigator ? navigator.hardwareConcurrency || 1 : 1
        }
        return ib(M.u), -1
      },
      ___syscall146: function(e, t) {
        ec = t;
        try {
          var n, r = fc(),
            i = X();
          e: {
            for (var o = X(), a = 0, s = 0; o > s; s++) {
              var u = Xb(r, D, F[i + 8 * s >> 2], F[i + (8 * s + 4) >> 2], void 0);
              if (0 > u) {
                n = -1;
                break e
              }
              a += u
            }
            n = a
          }
          return n
        } catch (c) {
          return "undefined" != typeof dc && c instanceof O || z(c), -c.Q
        }
      },
      STACKTOP: m,
      STACK_MAX: La,
      tempDoublePtr: $a,
      ABORT: A,
      cttz_i8: Xc
    };
    var Z = function(e, t, n) {
      "avoid using asm because chrome 47+ is broken";

      function r(e) {
        e = 0 | e;
        var t = 0;
        return t = Y, Y = Y + e | 0, Y = Y + 15 & -16, 0 | t
      }

      function i() {
        return 0 | Y
      }

      function o(e) {
        e = 0 | e, Y = e
      }

      function a(e, t) {
        e = 0 | e, t = 0 | t, Y = e, Z = t
      }

      function s(e, t) {
        e = 0 | e, t = 0 | t, Q || (Q = e, $ = t)
      }

      function u(e) {
        e = 0 | e, ee = e
      }

      function c() {
        return 0 | ee
      }

      function f(e, t, n) {
        e = 0 | e, t = 0 | t, n = 0 | n;
        var r = 0,
          i = 0,
          o = 0,
          a = 0,
          s = 0,
          u = 0,
          c = 0,
          f = 0,
          p = 0,
          m = 0,
          g = 0,
          v = 0,
          b = 0,
          w = 0,
          y = 0,
          _ = 0,
          k = 0,
          x = 0,
          S = 0,
          A = 0,
          O = 0,
          P = 0,
          L = 0,
          F = 0,
          R = 0,
          U = 0,
          j = 0,
          B = 0,
          z = 0,
          K = 0,
          G = 0,
          q = 0,
          Z = 0,
          X = 0,
          J = 0,
          Q = 0,
          $ = 0,
          ne = 0,
          re = 0,
          ie = 0,
          oe = 0,
          ae = 0,
          se = 0,
          ue = 0,
          ce = 0,
          fe = 0,
          le = 0,
          he = 0,
          de = 0,
          pe = 0,
          me = 0,
          ge = 0,
          ve = 0,
          be = 0,
          we = 0,
          ye = 0,
          _e = 0,
          ke = 0,
          xe = 0,
          Se = 0,
          Ae = 0,
          Oe = 0,
          Pe = 0,
          Ee = 0,
          Te = 0,
          Ce = 0,
          Me = 0,
          De = 0,
          Ie = 0,
          Le = 0,
          Fe = 0,
          Re = 0,
          Ne = 0,
          Ue = 0,
          je = 0,
          Be = 0,
          ze = 0,
          Ke = 0,
          Ge = 0,
          qe = 0,
          Ve = 0,
          He = 0,
          We = 0,
          Ye = 0,
          Ze = 0,
          Xe = 0,
          Je = 0,
          Qe = 0,
          $e = 0,
          et = 0,
          tt = 0,
          nt = 0,
          rt = 0,
          it = 0,
          ot = 0,
          at = 0,
          st = 0,
          ut = 0,
          ct = 0,
          ft = 0,
          lt = 0,
          ht = 0,
          dt = 0,
          pt = 0,
          mt = 0,
          gt = 0,
          vt = 0,
          bt = 0,
          wt = 0,
          yt = 0,
          _t = 0,
          kt = 0,
          xt = 0,
          St = 0,
          At = 0,
          Ot = 0,
          Pt = 0,
          Et = 0,
          Tt = 0,
          Ct = 0,
          Mt = 0,
          Dt = 0,
          It = 0,
          Lt = 0,
          Ft = 0,
          Rt = 0,
          Nt = 0,
          Ut = 0,
          jt = 0,
          Bt = 0,
          zt = 0,
          Kt = 0,
          Gt = 0,
          qt = 0,
          Vt = 0,
          Ht = 0,
          Wt = 0,
          Yt = 0,
          Zt = 0,
          Xt = 0,
          Jt = 0,
          Qt = 0,
          $t = 0,
          en = 0,
          tn = 0,
          nn = 0,
          rn = 0,
          on = 0,
          an = 0,
          sn = 0,
          un = 0,
          cn = 0,
          fn = 0,
          ln = 0,
          hn = 0,
          dn = 0,
          pn = 0,
          mn = 0,
          gn = 0,
          vn = 0,
          bn = 0,
          wn = 0,
          yn = 0,
          _n = 0,
          kn = 0,
          xn = 0,
          Sn = 0,
          An = 0,
          On = 0,
          Pn = 0,
          En = 0,
          Tn = 0,
          Cn = 0,
          Mn = 0,
          Dn = 0,
          In = 0,
          Ln = 0;
        r = Y, Y = Y + 2640 | 0, i = r + 2456 | 0, o = r + 2304 | 0, a = r + 2152 | 0, s = r + 2e3 | 0, u = r + 1848 | 0, c = r + 1696 | 0, f = r + 1544 | 0, p = r + 1392 | 0, m = r + 1240 | 0, g = r + 1088 | 0, v = r + 936 | 0, b = r + 784 | 0, w = r + 632 | 0, y = r + 480 | 0, _ = r + 328 | 0, k = r + 248 | 0, x = r + 168 | 0, S = r + 80 | 0, A = r, O = r + 2608 | 0, P = O, L = t, t = P + 32 | 0;
        do V[P >> 0] = 0 | V[L >> 0], P = P + 1 | 0, L = L + 1 | 0; while ((0 | t) > (0 | P));
        V[O >> 0] = 248 & (0 | W[O >> 0]), F = O + 31 | 0, V[F >> 0] = 63 & (0 | W[F >> 0]) | 64, F = 0 | W[n >> 0], R = 0 | I(0 | W[n + 1 >> 0] | 0, 0, 8), U = ee, j = 0 | I(0 | W[n + 2 >> 0] | 0, 0, 16), B = U | ee, U = 0 | W[n + 3 >> 0], z = 0 | I(0 | U, 0, 24), K = k, H[K >> 2] = R | F | j | 50331648 & z, H[K + 4 >> 2] = B, B = 0 | I(0 | W[n + 4 >> 0] | 0, 0, 8), K = ee, z = 0 | I(0 | W[n + 5 >> 0] | 0, 0, 16), j = K | ee, K = 0 | W[n + 6 >> 0], F = 0 | I(0 | K, 0, 24), R = 0 | D(B | U | z | F | 0, j | ee | 0, 2), j = k + 8 | 0, H[j >> 2] = 33554431 & R, H[j + 4 >> 2] = 0, j = 0 | I(0 | W[n + 7 >> 0] | 0, 0, 8), R = ee, F = 0 | I(0 | W[n + 8 >> 0] | 0, 0, 16), z = R | ee, R = 0 | W[n + 9 >> 0], U = 0 | I(0 | R, 0, 24), B = 0 | D(j | K | F | U | 0, z | ee | 0, 3), z = k + 16 | 0, H[z >> 2] = 67108863 & B, H[z + 4 >> 2] = 0, z = 0 | I(0 | W[n + 10 >> 0] | 0, 0, 8), B = ee, U = 0 | I(0 | W[n + 11 >> 0] | 0, 0, 16), F = B | ee, B = 0 | W[n + 12 >> 0], K = 0 | I(0 | B, 0, 24), j = 0 | D(z | R | U | K | 0, F | ee | 0, 5), F = k + 24 | 0, H[F >> 2] = 33554431 & j, H[F + 4 >> 2] = 0, F = 0 | I(0 | W[n + 13 >> 0] | 0, 0, 8), j = ee, K = 0 | I(0 | W[n + 14 >> 0] | 0, 0, 16), U = j | ee, j = 0 | I(0 | W[n + 15 >> 0] | 0, 0, 24), R = 0 | D(F | B | K | j | 0, U | ee | 0, 6), U = k + 32 | 0, H[U >> 2] = 67108863 & R, H[U + 4 >> 2] = 0, U = 0 | W[n + 16 >> 0], R = 0 | I(0 | W[n + 17 >> 0] | 0, 0, 8), j = ee, K = 0 | I(0 | W[n + 18 >> 0] | 0, 0, 16), B = j | ee, j = 0 | W[n + 19 >> 0], F = 0 | I(0 | j, 0, 24), z = k + 40 | 0, H[z >> 2] = R | U | K | 16777216 & F, H[z + 4 >> 2] = B, B = 0 | I(0 | W[n + 20 >> 0] | 0, 0, 8), z = ee, F = 0 | I(0 | W[n + 21 >> 0] | 0, 0, 16), K = z | ee, z = 0 | W[n + 22 >> 0], U = 0 | I(0 | z, 0, 24), R = 0 | D(B | j | F | U | 0, K | ee | 0, 1), K = k + 48 | 0, H[K >> 2] = 67108863 & R, H[K + 4 >> 2] = 0, K = 0 | I(0 | W[n + 23 >> 0] | 0, 0, 8), R = ee, U = 0 | I(0 | W[n + 24 >> 0] | 0, 0, 16), F = R | ee, R = 0 | W[n + 25 >> 0], j = 0 | I(0 | R, 0, 24), B = 0 | D(K | z | U | j | 0, F | ee | 0, 3), F = k + 56 | 0, H[F >> 2] = 33554431 & B, H[F + 4 >> 2] = 0, F = 0 | I(0 | W[n + 26 >> 0] | 0, 0, 8), B = ee, j = 0 | I(0 | W[n + 27 >> 0] | 0, 0, 16), U = B | ee, B = 0 | W[n + 28 >> 0], z = 0 | I(0 | B, 0, 24), K = 0 | D(F | R | j | z | 0, U | ee | 0, 4), U = k + 64 | 0, H[U >> 2] = 67108863 & K, H[U + 4 >> 2] = 0, U = 0 | I(0 | W[n + 29 >> 0] | 0, 0, 8), K = ee, z = 0 | I(0 | W[n + 30 >> 0] | 0, 0, 16), j = K | ee, K = 0 | I(0 | W[n + 31 >> 0] | 0, 0, 24), n = 0 | D(U | B | z | K | 0, j | ee | 0, 6), j = k + 72 | 0, H[j >> 2] = 33554431 & n, H[j + 4 >> 2] = 0, 0 | M(0 | m, 0, 152), j = m, H[j >> 2] = 1, H[j + 4 >> 2] = 0, 0 | M(0 | g, 0, 152), j = g, H[j >> 2] = 1, H[j + 4 >> 2] = 0, 0 | M(0 | v, 0, 152), 0 | M(0 | b, 0, 152), 0 | M(0 | w, 0, 152), j = w, H[j >> 2] = 1, H[j + 4 >> 2] = 0, 0 | M(0 | y, 0, 152), 0 | M(0 | _, 0, 152), j = _, H[j >> 2] = 1, H[j + 4 >> 2] = 0, P = p + 80 | 0, t = P + 72 | 0;
        do H[P >> 2] = 0, P = P + 4 | 0; while ((0 | t) > (0 | P));
        P = p, L = k, t = P + 80 | 0;
        do H[P >> 2] = H[L >> 2], P = P + 4 | 0, L = L + 4 | 0; while ((0 | t) > (0 | P));
        for (j = s + 144 | 0, n = s + 64 | 0, K = s + 136 | 0, z = s + 56 | 0, B = s + 128 | 0, U = s + 48 | 0, R = s + 120 | 0, F = s + 40 | 0, G = s + 112 | 0, q = s + 32 | 0, Z = s + 104 | 0, X = s + 24 | 0, J = s + 96 | 0, Q = s + 16 | 0, $ = s + 88 | 0, ne = s + 8 | 0, re = s + 80 | 0, ie = u + 144 | 0, oe = u + 64 | 0, ae = u + 136 | 0, se = u + 56 | 0, ue = u + 128 | 0, ce = u + 48 | 0, fe = u + 120 | 0, le = u + 40 | 0, he = u + 112 | 0, de = u + 32 | 0, pe = u + 104 | 0, me = u + 24 | 0, ge = u + 96 | 0, ve = u + 16 | 0, be = u + 88 | 0, we = u + 8 | 0, ye = u + 80 | 0, _e = s + 72 | 0, ke = u + 72 | 0, xe = o + 8 | 0, Se = a + 8 | 0, Ae = o + 16 | 0, Oe = a + 16 | 0, Pe = o + 24 | 0, Ee = a + 24 | 0, Te = o + 32 | 0, Ce = a + 32 | 0, Me = o + 40 | 0, De = a + 40 | 0, Ie = o + 48 | 0, Le = a + 48 | 0, Fe = o + 56 | 0, Re = a + 56 | 0, Ne = o + 64 | 0, Ue = a + 64 | 0, je = o + 72 | 0, Be = a + 72 | 0, ze = i + 80 | 0, Ke = i + 8 | 0, Ge = i + 16 | 0, qe = i + 24 | 0, Ve = i + 32 | 0, He = i + 40 | 0, We = i + 48 | 0, Ye = i + 56 | 0, Ze = i + 64 | 0, Xe = i + 72 | 0, Je = 0, Qe = p, $e = b, b = m, et = w, w = g, tt = y, y = v, v = _;;) {
          for (_ = 0 | V[O + (31 - Je) >> 0], nt = 0, rt = Qe, it = $e, ot = b, at = et, st = w, ut = tt, ct = y, ft = v;;) {
            lt = 255 & _, ht = 0 | T(0, 0, lt >>> 7 | 0, 0), dt = ee, pt = 0;
            do mt = st + (pt << 3) | 0, gt = mt, vt = 0 | H[gt >> 2], bt = 0 | H[gt + 4 >> 2], gt = rt + (pt << 3) | 0, wt = gt, yt = 0 | H[wt >> 2], _t = 0 | H[wt + 4 >> 2], wt = (yt ^ vt) & ht, kt = (_t ^ bt) & dt, bt = 0 | E(0, wt ^ vt | 0, 32), vt = mt, H[vt >> 2] = bt, H[vt + 4 >> 2] = ee, vt = 0 | E(0, wt ^ yt | 0, 32), yt = gt, H[yt >> 2] = vt, H[yt + 4 >> 2] = ee, pt = pt + 1 | 0; while (10 != (0 | pt));
            xt = 0;
            do pt = ct + (xt << 3) | 0, yt = pt, vt = 0 | H[yt >> 2], gt = 0 | H[yt + 4 >> 2], yt = ot + (xt << 3) | 0, wt = yt, bt = 0 | H[wt >> 2], mt = 0 | H[wt + 4 >> 2], wt = (bt ^ vt) & ht, _t = (mt ^ gt) & dt, gt = 0 | E(0, wt ^ vt | 0, 32), vt = pt, H[vt >> 2] = gt, H[vt + 4 >> 2] = ee, vt = 0 | E(0, wt ^ bt | 0, 32), bt = yt, H[bt >> 2] = vt, H[bt + 4 >> 2] = ee, xt = xt + 1 | 0; while (10 != (0 | xt));
            bt = st, vt = 0 | H[bt >> 2], yt = 0 | H[bt + 4 >> 2], bt = st + 8 | 0, wt = bt, gt = 0 | H[wt >> 2], pt = 0 | H[wt + 4 >> 2], wt = st + 16 | 0, mt = wt, _t = 0 | H[mt >> 2], kt = 0 | H[mt + 4 >> 2], mt = st + 24 | 0, St = mt, At = 0 | H[St >> 2], Ot = 0 | H[St + 4 >> 2], St = st + 32 | 0, Pt = St, Et = 0 | H[Pt >> 2], Tt = 0 | H[Pt + 4 >> 2], Pt = st + 40 | 0, Ct = Pt, Mt = 0 | H[Ct >> 2], Dt = 0 | H[Ct + 4 >> 2], Ct = st + 48 | 0, It = Ct, Lt = 0 | H[It >> 2], Ft = 0 | H[It + 4 >> 2], It = st + 56 | 0, Rt = It, Nt = 0 | H[Rt >> 2], Ut = 0 | H[Rt + 4 >> 2], Rt = st + 64 | 0, jt = Rt, Bt = 0 | H[jt >> 2], zt = 0 | H[jt + 4 >> 2], jt = st + 72 | 0, Kt = jt, Gt = 0 | H[Kt >> 2], qt = 0 | H[Kt + 4 >> 2], Kt = ct, Vt = 0 | H[Kt >> 2], Ht = 0 | H[Kt + 4 >> 2], Kt = 0 | C(0 | Vt, 0 | Ht, 0 | vt, 0 | yt), Wt = st, H[Wt >> 2] = Kt, H[Wt + 4 >> 2] = ee, Wt = ct + 8 | 0, Kt = Wt, Yt = 0 | H[Kt >> 2], Zt = 0 | H[Kt + 4 >> 2], Kt = 0 | C(0 | Yt, 0 | Zt, 0 | gt, 0 | pt), Xt = bt, H[Xt >> 2] = Kt, H[Xt + 4 >> 2] = ee, Xt = ct + 16 | 0, Kt = Xt, bt = 0 | H[Kt >> 2], Jt = 0 | H[Kt + 4 >> 2], Kt = 0 | C(0 | bt, 0 | Jt, 0 | _t, 0 | kt), Qt = wt, H[Qt >> 2] = Kt, H[Qt + 4 >> 2] = ee, Qt = ct + 24 | 0, Kt = Qt, wt = 0 | H[Kt >> 2], $t = 0 | H[Kt + 4 >> 2], Kt = 0 | C(0 | wt, 0 | $t, 0 | At, 0 | Ot), en = mt, H[en >> 2] = Kt, H[en + 4 >> 2] = ee, en = ct + 32 | 0, Kt = en, mt = 0 | H[Kt >> 2], tn = 0 | H[Kt + 4 >> 2], Kt = 0 | C(0 | mt, 0 | tn, 0 | Et, 0 | Tt), nn = St, H[nn >> 2] = Kt, H[nn + 4 >> 2] = ee, nn = ct + 40 | 0, Kt = nn, St = 0 | H[Kt >> 2], rn = 0 | H[Kt + 4 >> 2], Kt = 0 | C(0 | St, 0 | rn, 0 | Mt, 0 | Dt), on = Pt, H[on >> 2] = Kt, H[on + 4 >> 2] = ee, on = ct + 48 | 0, Kt = on, Pt = 0 | H[Kt >> 2], an = 0 | H[Kt + 4 >> 2], Kt = 0 | C(0 | Pt, 0 | an, 0 | Lt, 0 | Ft), sn = Ct, H[sn >> 2] = Kt, H[sn + 4 >> 2] = ee, sn = ct + 56 | 0, Kt = sn, Ct = 0 | H[Kt >> 2], un = 0 | H[Kt + 4 >> 2], Kt = 0 | C(0 | Ct, 0 | un, 0 | Nt, 0 | Ut), cn = It, H[cn >> 2] = Kt, H[cn + 4 >> 2] = ee, cn = ct + 64 | 0, Kt = cn, It = 0 | H[Kt >> 2], fn = 0 | H[Kt + 4 >> 2], Kt = 0 | C(0 | It, 0 | fn, 0 | Bt, 0 | zt), ln = Rt, H[ln >> 2] = Kt, H[ln + 4 >> 2] = ee, ln = ct + 72 | 0, Kt = ln, Rt = 0 | H[Kt >> 2], hn = 0 | H[Kt + 4 >> 2], Kt = 0 | C(0 | Rt, 0 | hn, 0 | Gt, 0 | qt), dn = jt, H[dn >> 2] = Kt, H[dn + 4 >> 2] = ee, dn = 0 | T(0 | vt, 0 | yt, 0 | Vt, 0 | Ht), Ht = ct, H[Ht >> 2] = dn, H[Ht + 4 >> 2] = ee, Ht = 0 | T(0 | gt, 0 | pt, 0 | Yt, 0 | Zt), Zt = Wt, H[Zt >> 2] = Ht, H[Zt + 4 >> 2] = ee, Zt = 0 | T(0 | _t, 0 | kt, 0 | bt, 0 | Jt), Jt = Xt, H[Jt >> 2] = Zt, H[Jt + 4 >> 2] = ee, Jt = 0 | T(0 | At, 0 | Ot, 0 | wt, 0 | $t), $t = Qt, H[$t >> 2] = Jt, H[$t + 4 >> 2] = ee, $t = 0 | T(0 | Et, 0 | Tt, 0 | mt, 0 | tn), tn = en, H[tn >> 2] = $t, H[tn + 4 >> 2] = ee, tn = 0 | T(0 | Mt, 0 | Dt, 0 | St, 0 | rn), rn = nn, H[rn >> 2] = tn, H[rn + 4 >> 2] = ee, rn = 0 | T(0 | Lt, 0 | Ft, 0 | Pt, 0 | an), an = on, H[an >> 2] = rn, H[an + 4 >> 2] = ee, an = 0 | T(0 | Nt, 0 | Ut, 0 | Ct, 0 | un), un = sn, H[un >> 2] = an, H[un + 4 >> 2] = ee, un = 0 | T(0 | Bt, 0 | zt, 0 | It, 0 | fn), fn = cn, H[fn >> 2] = un, H[fn + 4 >> 2] = ee, fn = 0 | T(0 | Gt, 0 | qt, 0 | Rt, 0 | hn), hn = ln, H[hn >> 2] = fn, H[hn + 4 >> 2] = ee, hn = rt, fn = 0 | H[hn >> 2], ln = 0 | H[hn + 4 >> 2], hn = rt + 8 | 0, Rt = hn, qt = 0 | H[Rt >> 2], Gt = 0 | H[Rt + 4 >> 2], Rt = rt + 16 | 0, un = Rt, cn = 0 | H[un >> 2], It = 0 | H[un + 4 >> 2], un = rt + 24 | 0, zt = un, Bt = 0 | H[zt >> 2], an = 0 | H[zt + 4 >> 2], zt = rt + 32 | 0, sn = zt, Ct = 0 | H[sn >> 2], Ut = 0 | H[sn + 4 >> 2], sn = rt + 40 | 0, Nt = sn, rn = 0 | H[Nt >> 2], on = 0 | H[Nt + 4 >> 2], Nt = rt + 48 | 0, Pt = Nt, Ft = 0 | H[Pt >> 2], Lt = 0 | H[Pt + 4 >> 2], Pt = rt + 56 | 0, tn = Pt, nn = 0 | H[tn >> 2], St = 0 | H[tn + 4 >> 2], tn = rt + 64 | 0, Dt = tn, Mt = 0 | H[Dt >> 2], $t = 0 | H[Dt + 4 >> 2], Dt = rt + 72 | 0, en = Dt, mt = 0 | H[en >> 2], Tt = 0 | H[en + 4 >> 2], en = ot, Et = 0 | H[en >> 2], Jt = 0 | H[en + 4 >> 2], en = 0 | C(0 | Et, 0 | Jt, 0 | fn, 0 | ln), Qt = rt, H[Qt >> 2] = en, H[Qt + 4 >> 2] = ee, Qt = ot + 8 | 0, en = Qt, wt = 0 | H[en >> 2], Ot = 0 | H[en + 4 >> 2], en = 0 | C(0 | wt, 0 | Ot, 0 | qt, 0 | Gt), At = hn, H[At >> 2] = en, H[At + 4 >> 2] = ee, At = ot + 16 | 0, en = At, hn = 0 | H[en >> 2], Zt = 0 | H[en + 4 >> 2], en = 0 | C(0 | hn, 0 | Zt, 0 | cn, 0 | It), Xt = Rt, H[Xt >> 2] = en, H[Xt + 4 >> 2] = ee, Xt = ot + 24 | 0, en = Xt, Rt = 0 | H[en >> 2], bt = 0 | H[en + 4 >> 2], en = 0 | C(0 | Rt, 0 | bt, 0 | Bt, 0 | an), kt = un, H[kt >> 2] = en, H[kt + 4 >> 2] = ee, kt = ot + 32 | 0, en = kt, un = 0 | H[en >> 2], _t = 0 | H[en + 4 >> 2], en = 0 | C(0 | un, 0 | _t, 0 | Ct, 0 | Ut), Ht = zt, H[Ht >> 2] = en, H[Ht + 4 >> 2] = ee, Ht = ot + 40 | 0, en = Ht, zt = 0 | H[en >> 2], Wt = 0 | H[en + 4 >> 2], en = 0 | C(0 | zt, 0 | Wt, 0 | rn, 0 | on), Yt = sn, H[Yt >> 2] = en, H[Yt + 4 >> 2] = ee, Yt = ot + 48 | 0, en = Yt, sn = 0 | H[en >> 2], pt = 0 | H[en + 4 >> 2], en = 0 | C(0 | sn, 0 | pt, 0 | Ft, 0 | Lt), gt = Nt, H[gt >> 2] = en, H[gt + 4 >> 2] = ee, gt = ot + 56 | 0, en = gt, Nt = 0 | H[en >> 2], dn = 0 | H[en + 4 >> 2], en = 0 | C(0 | Nt, 0 | dn, 0 | nn, 0 | St), Vt = Pt, H[Vt >> 2] = en, H[Vt + 4 >> 2] = ee, Vt = ot + 64 | 0, en = Vt, Pt = 0 | H[en >> 2], yt = 0 | H[en + 4 >> 2], en = 0 | C(0 | Pt, 0 | yt, 0 | Mt, 0 | $t), vt = tn, H[vt >> 2] = en, H[vt + 4 >> 2] = ee, vt = ot + 72 | 0, en = vt, tn = 0 | H[en >> 2], Kt = 0 | H[en + 4 >> 2], en = 0 | C(0 | tn, 0 | Kt, 0 | mt, 0 | Tt), jt = Dt, H[jt >> 2] = en, H[jt + 4 >> 2] = ee, jt = 0 | T(0 | fn, 0 | ln, 0 | Et, 0 | Jt), Jt = ot, H[Jt >> 2] = jt, H[Jt + 4 >> 2] = ee, Jt = 0 | T(0 | qt, 0 | Gt, 0 | wt, 0 | Ot), Ot = Qt, H[Ot >> 2] = Jt, H[Ot + 4 >> 2] = ee, Ot = 0 | T(0 | cn, 0 | It, 0 | hn, 0 | Zt), Zt = At, H[Zt >> 2] = Ot, H[Zt + 4 >> 2] = ee, Zt = 0 | T(0 | Bt, 0 | an, 0 | Rt, 0 | bt), bt = Xt, H[bt >> 2] = Zt, H[bt + 4 >> 2] = ee, bt = 0 | T(0 | Ct, 0 | Ut, 0 | un, 0 | _t), _t = kt, H[_t >> 2] = bt, H[_t + 4 >> 2] = ee, _t = 0 | T(0 | rn, 0 | on, 0 | zt, 0 | Wt), Wt = Ht, H[Wt >> 2] = _t, H[Wt + 4 >> 2] = ee, Wt = 0 | T(0 | Ft, 0 | Lt, 0 | sn, 0 | pt), pt = Yt, H[pt >> 2] = Wt, H[pt + 4 >> 2] = ee, pt = 0 | T(0 | nn, 0 | St, 0 | Nt, 0 | dn), dn = gt, H[dn >> 2] = pt, H[dn + 4 >> 2] = ee, dn = 0 | T(0 | Mt, 0 | $t, 0 | Pt, 0 | yt), yt = Vt, H[yt >> 2] = dn, H[yt + 4 >> 2] = ee, yt = 0 | T(0 | mt, 0 | Tt, 0 | tn, 0 | Kt), Kt = vt, H[Kt >> 2] = yt, H[Kt + 4 >> 2] = ee, h(s, rt, ct), h(u, st, ot), Kt = j, yt = 0 | H[Kt >> 2], vt = 0 | H[Kt + 4 >> 2], Kt = n, tn = 0 | H[Kt >> 2], Tt = 0 | H[Kt + 4 >> 2], Kt = 0 | N(0 | yt, 0 | vt, 18, 0), mt = ee, dn = 0 | C(0 | tn, 0 | Tt, 0 | yt, 0 | vt), vt = 0 | C(0 | dn, 0 | ee, 0 | Kt, 0 | mt), mt = n, H[mt >> 2] = vt, H[mt + 4 >> 2] = ee, mt = K, vt = 0 | H[mt >> 2], Kt = 0 | H[mt + 4 >> 2], mt = z, dn = 0 | H[mt >> 2], yt = 0 | H[mt + 4 >> 2], mt = 0 | N(0 | vt, 0 | Kt, 18, 0), Tt = ee, tn = 0 | C(0 | dn, 0 | yt, 0 | vt, 0 | Kt), Kt = 0 | C(0 | tn, 0 | ee, 0 | mt, 0 | Tt), Tt = z, H[Tt >> 2] = Kt, H[Tt + 4 >> 2] = ee, Tt = B, Kt = 0 | H[Tt >> 2], mt = 0 | H[Tt + 4 >> 2], Tt = U, tn = 0 | H[Tt >> 2], vt = 0 | H[Tt + 4 >> 2], Tt = 0 | N(0 | Kt, 0 | mt, 18, 0), yt = ee, dn = 0 | C(0 | tn, 0 | vt, 0 | Kt, 0 | mt), mt = 0 | C(0 | dn, 0 | ee, 0 | Tt, 0 | yt), yt = U, H[yt >> 2] = mt, H[yt + 4 >> 2] = ee, yt = R, mt = 0 | H[yt >> 2], Tt = 0 | H[yt + 4 >> 2], yt = F, dn = 0 | H[yt >> 2], Kt = 0 | H[yt + 4 >> 2], yt = 0 | N(0 | mt, 0 | Tt, 18, 0), vt = ee, tn = 0 | C(0 | dn, 0 | Kt, 0 | mt, 0 | Tt), Tt = 0 | C(0 | tn, 0 | ee, 0 | yt, 0 | vt), vt = F, H[vt >> 2] = Tt, H[vt + 4 >> 2] = ee, vt = G, Tt = 0 | H[vt >> 2], yt = 0 | H[vt + 4 >> 2], vt = q, tn = 0 | H[vt >> 2], mt = 0 | H[vt + 4 >> 2], vt = 0 | N(0 | Tt, 0 | yt, 18, 0), Kt = ee, dn = 0 | C(0 | tn, 0 | mt, 0 | Tt, 0 | yt), yt = 0 | C(0 | dn, 0 | ee, 0 | vt, 0 | Kt), Kt = q, H[Kt >> 2] = yt, H[Kt + 4 >> 2] = ee, Kt = Z, yt = 0 | H[Kt >> 2], vt = 0 | H[Kt + 4 >> 2], Kt = X, dn = 0 | H[Kt >> 2], Tt = 0 | H[Kt + 4 >> 2], Kt = 0 | N(0 | yt, 0 | vt, 18, 0), mt = ee, tn = 0 | C(0 | dn, 0 | Tt, 0 | yt, 0 | vt), vt = 0 | C(0 | tn, 0 | ee, 0 | Kt, 0 | mt), mt = X, H[mt >> 2] = vt, H[mt + 4 >> 2] = ee, mt = J, vt = 0 | H[mt >> 2], Kt = 0 | H[mt + 4 >> 2], mt = Q, tn = 0 | H[mt >> 2], yt = 0 | H[mt + 4 >> 2], mt = 0 | N(0 | vt, 0 | Kt, 18, 0), Tt = ee, dn = 0 | C(0 | tn, 0 | yt, 0 | vt, 0 | Kt), Kt = 0 | C(0 | dn, 0 | ee, 0 | mt, 0 | Tt), Tt = Q, H[Tt >> 2] = Kt, H[Tt + 4 >> 2] = ee, Tt = $, Kt = 0 | H[Tt >> 2], mt = 0 | H[Tt + 4 >> 2], Tt = ne, dn = 0 | H[Tt >> 2], vt = 0 | H[Tt + 4 >> 2], Tt = 0 | N(0 | Kt, 0 | mt, 18, 0), yt = ee, tn = 0 | C(0 | dn, 0 | vt, 0 | Kt, 0 | mt), mt = 0 | C(0 | tn, 0 | ee, 0 | Tt, 0 | yt), yt = ne, H[yt >> 2] = mt, H[yt + 4 >> 2] = ee, yt = re, mt = 0 | H[yt >> 2], Tt = 0 | H[yt + 4 >> 2], yt = s, tn = 0 | H[yt >> 2], Kt = 0 | H[yt + 4 >> 2], yt = 0 | N(0 | mt, 0 | Tt, 18, 0), vt = ee, dn = 0 | C(0 | tn, 0 | Kt, 0 | mt, 0 | Tt), Tt = 0 | C(0 | dn, 0 | ee, 0 | yt, 0 | vt), vt = ee, yt = s, H[yt >> 2] = Tt, H[yt + 4 >> 2] = vt, yt = re, H[yt >> 2] = 0, H[yt + 4 >> 2] = 0, yt = vt, vt = Tt, Tt = 0;
            do dn = 0 | C(yt >> 31 >>> 6 | 0, 0, 0 | vt, 0 | yt), mt = 0 | E(0 | dn, 0 | ee, 26), dn = ee, Kt = 0 | I(0 | mt, 0 | dn, 26), tn = 0 | T(0 | vt, 0 | yt, 0 | Kt, 0 | ee), Kt = s + (Tt << 3) | 0, H[Kt >> 2] = tn, H[Kt + 4 >> 2] = ee, Kt = s + ((1 | Tt) << 3) | 0, tn = Kt, Vt = 0 | C(0 | mt, 0 | dn, 0 | H[tn >> 2], 0 | H[tn + 4 >> 2]), tn = ee, dn = 0 | C(tn >> 31 >>> 7 | 0, 0, 0 | Vt, 0 | tn), mt = 0 | E(0 | dn, 0 | ee, 25), dn = ee, Pt = 0 | I(0 | mt, 0 | dn, 25), $t = 0 | T(0 | Vt, 0 | tn, 0 | Pt, 0 | ee), Pt = Kt, H[Pt >> 2] = $t, H[Pt + 4 >> 2] = ee, Tt = Tt + 2 | 0, Pt = s + (Tt << 3) | 0, $t = Pt, vt = 0 | C(0 | mt, 0 | dn, 0 | H[$t >> 2], 0 | H[$t + 4 >> 2]), yt = ee, $t = Pt, H[$t >> 2] = vt, H[$t + 4 >> 2] = yt; while (10 > Tt >>> 0);
            Tt = re, yt = 0 | H[Tt >> 2], vt = 0 | H[Tt + 4 >> 2], Tt = s, $t = 0 | H[Tt >> 2], Pt = 0 | H[Tt + 4 >> 2], Tt = 0 | N(0 | yt, 0 | vt, 18, 0), dn = ee, mt = 0 | C(0 | $t, 0 | Pt, 0 | yt, 0 | vt), vt = 0 | C(0 | mt, 0 | ee, 0 | Tt, 0 | dn), dn = ee, Tt = re, H[Tt >> 2] = 0, H[Tt + 4 >> 2] = 0, Tt = 0 | C(dn >> 31 >>> 6 | 0, 0, 0 | vt, 0 | dn), mt = 0 | E(0 | Tt, 0 | ee, 26), Tt = ee, yt = 0 | I(0 | mt, 0 | Tt, 26), Pt = 0 | T(0 | vt, 0 | dn, 0 | yt, 0 | ee), yt = ee, dn = s, H[dn >> 2] = Pt, H[dn + 4 >> 2] = yt, dn = ne, vt = 0 | C(0 | mt, 0 | Tt, 0 | H[dn >> 2], 0 | H[dn + 4 >> 2]), dn = ee, Tt = ne, H[Tt >> 2] = vt, H[Tt + 4 >> 2] = dn, Tt = ie, mt = 0 | H[Tt >> 2], $t = 0 | H[Tt + 4 >> 2], Tt = oe, Kt = 0 | H[Tt >> 2], tn = 0 | H[Tt + 4 >> 2], Tt = 0 | N(0 | mt, 0 | $t, 18, 0), Vt = ee, Mt = 0 | C(0 | Kt, 0 | tn, 0 | mt, 0 | $t), $t = 0 | C(0 | Mt, 0 | ee, 0 | Tt, 0 | Vt), Vt = oe, H[Vt >> 2] = $t, H[Vt + 4 >> 2] = ee, Vt = ae, $t = 0 | H[Vt >> 2], Tt = 0 | H[Vt + 4 >> 2], Vt = se, Mt = 0 | H[Vt >> 2], mt = 0 | H[Vt + 4 >> 2], Vt = 0 | N(0 | $t, 0 | Tt, 18, 0), tn = ee, Kt = 0 | C(0 | Mt, 0 | mt, 0 | $t, 0 | Tt), Tt = 0 | C(0 | Kt, 0 | ee, 0 | Vt, 0 | tn), tn = se, H[tn >> 2] = Tt, H[tn + 4 >> 2] = ee, tn = ue, Tt = 0 | H[tn >> 2], Vt = 0 | H[tn + 4 >> 2], tn = ce, Kt = 0 | H[tn >> 2], $t = 0 | H[tn + 4 >> 2], tn = 0 | N(0 | Tt, 0 | Vt, 18, 0), mt = ee, Mt = 0 | C(0 | Kt, 0 | $t, 0 | Tt, 0 | Vt), Vt = 0 | C(0 | Mt, 0 | ee, 0 | tn, 0 | mt), mt = ce, H[mt >> 2] = Vt, H[mt + 4 >> 2] = ee, mt = fe, Vt = 0 | H[mt >> 2], tn = 0 | H[mt + 4 >> 2], mt = le, Mt = 0 | H[mt >> 2], Tt = 0 | H[mt + 4 >> 2], mt = 0 | N(0 | Vt, 0 | tn, 18, 0), $t = ee, Kt = 0 | C(0 | Mt, 0 | Tt, 0 | Vt, 0 | tn), tn = 0 | C(0 | Kt, 0 | ee, 0 | mt, 0 | $t), $t = le, H[$t >> 2] = tn, H[$t + 4 >> 2] = ee, $t = he, tn = 0 | H[$t >> 2], mt = 0 | H[$t + 4 >> 2], $t = de, Kt = 0 | H[$t >> 2], Vt = 0 | H[$t + 4 >> 2], $t = 0 | N(0 | tn, 0 | mt, 18, 0), Tt = ee, Mt = 0 | C(0 | Kt, 0 | Vt, 0 | tn, 0 | mt), mt = 0 | C(0 | Mt, 0 | ee, 0 | $t, 0 | Tt), Tt = de, H[Tt >> 2] = mt, H[Tt + 4 >> 2] = ee, Tt = pe, mt = 0 | H[Tt >> 2], $t = 0 | H[Tt + 4 >> 2], Tt = me, Mt = 0 | H[Tt >> 2], tn = 0 | H[Tt + 4 >> 2], Tt = 0 | N(0 | mt, 0 | $t, 18, 0), Vt = ee, Kt = 0 | C(0 | Mt, 0 | tn, 0 | mt, 0 | $t), $t = 0 | C(0 | Kt, 0 | ee, 0 | Tt, 0 | Vt), Vt = me, H[Vt >> 2] = $t, H[Vt + 4 >> 2] = ee, Vt = ge, $t = 0 | H[Vt >> 2], Tt = 0 | H[Vt + 4 >> 2], Vt = ve, Kt = 0 | H[Vt >> 2], mt = 0 | H[Vt + 4 >> 2], Vt = 0 | N(0 | $t, 0 | Tt, 18, 0), tn = ee, Mt = 0 | C(0 | Kt, 0 | mt, 0 | $t, 0 | Tt), Tt = 0 | C(0 | Mt, 0 | ee, 0 | Vt, 0 | tn), tn = ve, H[tn >> 2] = Tt, H[tn + 4 >> 2] = ee, tn = be, Tt = 0 | H[tn >> 2], Vt = 0 | H[tn + 4 >> 2], tn = we, Mt = 0 | H[tn >> 2], $t = 0 | H[tn + 4 >> 2], tn = 0 | N(0 | Tt, 0 | Vt, 18, 0), mt = ee, Kt = 0 | C(0 | Mt, 0 | $t, 0 | Tt, 0 | Vt), Vt = 0 | C(0 | Kt, 0 | ee, 0 | tn, 0 | mt), mt = we, H[mt >> 2] = Vt, H[mt + 4 >> 2] = ee, mt = ye, Vt = 0 | H[mt >> 2], tn = 0 | H[mt + 4 >> 2], mt = u, Kt = 0 | H[mt >> 2], Tt = 0 | H[mt + 4 >> 2], mt = 0 | N(0 | Vt, 0 | tn, 18, 0), $t = ee, Mt = 0 | C(0 | Kt, 0 | Tt, 0 | Vt, 0 | tn), tn = 0 | C(0 | Mt, 0 | ee, 0 | mt, 0 | $t), $t = ee, mt = u, H[mt >> 2] = tn, H[mt + 4 >> 2] = $t, mt = ye, H[mt >> 2] = 0, H[mt + 4 >> 2] = 0, mt = $t, $t = tn, tn = 0;
            do Mt = 0 | C(mt >> 31 >>> 6 | 0, 0, 0 | $t, 0 | mt), Vt = 0 | E(0 | Mt, 0 | ee, 26), Mt = ee, Tt = 0 | I(0 | Vt, 0 | Mt, 26), Kt = 0 | T(0 | $t, 0 | mt, 0 | Tt, 0 | ee), Tt = u + (tn << 3) | 0, H[Tt >> 2] = Kt, H[Tt + 4 >> 2] = ee, Tt = u + ((1 | tn) << 3) | 0, Kt = Tt, pt = 0 | C(0 | Vt, 0 | Mt, 0 | H[Kt >> 2], 0 | H[Kt + 4 >> 2]), Kt = ee, Mt = 0 | C(Kt >> 31 >>> 7 | 0, 0, 0 | pt, 0 | Kt), Vt = 0 | E(0 | Mt, 0 | ee, 25), Mt = ee, gt = 0 | I(0 | Vt, 0 | Mt, 25), Nt = 0 | T(0 | pt, 0 | Kt, 0 | gt, 0 | ee), gt = Tt, H[gt >> 2] = Nt, H[gt + 4 >> 2] = ee, tn = tn + 2 | 0, gt = u + (tn << 3) | 0, Nt = gt, $t = 0 | C(0 | Vt, 0 | Mt, 0 | H[Nt >> 2], 0 | H[Nt + 4 >> 2]), mt = ee, Nt = gt, H[Nt >> 2] = $t,
              H[Nt + 4 >> 2] = mt; while (10 > tn >>> 0);
            tn = ye, mt = 0 | H[tn >> 2], $t = 0 | H[tn + 4 >> 2], tn = u, Nt = 0 | H[tn >> 2], gt = 0 | H[tn + 4 >> 2], tn = 0 | N(0 | mt, 0 | $t, 18, 0), Mt = ee, Vt = 0 | C(0 | Nt, 0 | gt, 0 | mt, 0 | $t), $t = 0 | C(0 | Vt, 0 | ee, 0 | tn, 0 | Mt), Mt = ee, tn = ye, H[tn >> 2] = 0, H[tn + 4 >> 2] = 0, tn = 0 | C(Mt >> 31 >>> 6 | 0, 0, 0 | $t, 0 | Mt), Vt = 0 | E(0 | tn, 0 | ee, 26), tn = ee, mt = 0 | I(0 | Vt, 0 | tn, 26), gt = 0 | T(0 | $t, 0 | Mt, 0 | mt, 0 | ee), mt = ee, Mt = we, $t = 0 | C(0 | Vt, 0 | tn, 0 | H[Mt >> 2], 0 | H[Mt + 4 >> 2]), Mt = ee, tn = Q, Vt = 0 | H[tn >> 2], Nt = 0 | H[tn + 4 >> 2], tn = X, Tt = 0 | H[tn >> 2], Kt = 0 | H[tn + 4 >> 2], tn = q, pt = 0 | H[tn >> 2], St = 0 | H[tn + 4 >> 2], tn = F, nn = 0 | H[tn >> 2], Wt = 0 | H[tn + 4 >> 2], tn = U, Yt = 0 | H[tn >> 2], sn = 0 | H[tn + 4 >> 2], tn = z, Lt = 0 | H[tn >> 2], Ft = 0 | H[tn + 4 >> 2], tn = n, _t = 0 | H[tn >> 2], Ht = 0 | H[tn + 4 >> 2], tn = _e, zt = 0 | H[tn >> 2], on = 0 | H[tn + 4 >> 2], tn = 0 | C(0 | gt, 0 | mt, 0 | Pt, 0 | yt), rn = s, H[rn >> 2] = tn, H[rn + 4 >> 2] = ee, rn = 0 | C(0 | $t, 0 | Mt, 0 | vt, 0 | dn), tn = ne, H[tn >> 2] = rn, H[tn + 4 >> 2] = ee, tn = ve, rn = 0 | H[tn >> 2], bt = 0 | H[tn + 4 >> 2], tn = 0 | C(0 | rn, 0 | bt, 0 | Vt, 0 | Nt), kt = Q, H[kt >> 2] = tn, H[kt + 4 >> 2] = ee, kt = me, tn = 0 | H[kt >> 2], un = 0 | H[kt + 4 >> 2], kt = 0 | C(0 | tn, 0 | un, 0 | Tt, 0 | Kt), Ut = X, H[Ut >> 2] = kt, H[Ut + 4 >> 2] = ee, Ut = de, kt = 0 | H[Ut >> 2], Ct = 0 | H[Ut + 4 >> 2], Ut = 0 | C(0 | kt, 0 | Ct, 0 | pt, 0 | St), Zt = q, H[Zt >> 2] = Ut, H[Zt + 4 >> 2] = ee, Zt = le, Ut = 0 | H[Zt >> 2], Xt = 0 | H[Zt + 4 >> 2], Zt = 0 | C(0 | Ut, 0 | Xt, 0 | nn, 0 | Wt), Rt = F, H[Rt >> 2] = Zt, H[Rt + 4 >> 2] = ee, Rt = ce, Zt = 0 | H[Rt >> 2], an = 0 | H[Rt + 4 >> 2], Rt = 0 | C(0 | Zt, 0 | an, 0 | Yt, 0 | sn), Bt = U, H[Bt >> 2] = Rt, H[Bt + 4 >> 2] = ee, Bt = se, Rt = 0 | H[Bt >> 2], Ot = 0 | H[Bt + 4 >> 2], Bt = 0 | C(0 | Rt, 0 | Ot, 0 | Lt, 0 | Ft), At = z, H[At >> 2] = Bt, H[At + 4 >> 2] = ee, At = oe, Bt = 0 | H[At >> 2], hn = 0 | H[At + 4 >> 2], At = 0 | C(0 | Bt, 0 | hn, 0 | _t, 0 | Ht), It = n, H[It >> 2] = At, H[It + 4 >> 2] = ee, It = ke, At = 0 | H[It >> 2], cn = 0 | H[It + 4 >> 2], It = 0 | C(0 | At, 0 | cn, 0 | zt, 0 | on), Jt = _e, H[Jt >> 2] = It, H[Jt + 4 >> 2] = ee, Jt = 0 | T(0 | Pt, 0 | yt, 0 | gt, 0 | mt), mt = u, H[mt >> 2] = Jt, H[mt + 4 >> 2] = ee, mt = 0 | T(0 | vt, 0 | dn, 0 | $t, 0 | Mt), Mt = we, H[Mt >> 2] = mt, H[Mt + 4 >> 2] = ee, Mt = 0 | T(0 | Vt, 0 | Nt, 0 | rn, 0 | bt), bt = ve, H[bt >> 2] = Mt, H[bt + 4 >> 2] = ee, bt = 0 | T(0 | Tt, 0 | Kt, 0 | tn, 0 | un), un = me, H[un >> 2] = bt, H[un + 4 >> 2] = ee, un = 0 | T(0 | pt, 0 | St, 0 | kt, 0 | Ct), Ct = de, H[Ct >> 2] = un, H[Ct + 4 >> 2] = ee, Ct = 0 | T(0 | nn, 0 | Wt, 0 | Ut, 0 | Xt), Xt = le, H[Xt >> 2] = Ct, H[Xt + 4 >> 2] = ee, Xt = 0 | T(0 | Yt, 0 | sn, 0 | Zt, 0 | an), an = ce, H[an >> 2] = Xt, H[an + 4 >> 2] = ee, an = 0 | T(0 | Lt, 0 | Ft, 0 | Rt, 0 | Ot), Ot = se, H[Ot >> 2] = an, H[Ot + 4 >> 2] = ee, Ot = 0 | T(0 | _t, 0 | Ht, 0 | Bt, 0 | hn), hn = oe, H[hn >> 2] = Ot, H[hn + 4 >> 2] = ee, hn = 0 | T(0 | zt, 0 | on, 0 | At, 0 | cn), cn = ke, H[cn >> 2] = hn, H[cn + 4 >> 2] = ee, d(f, s), d(c, u), h(u, c, k), cn = ie, hn = 0 | H[cn >> 2], At = 0 | H[cn + 4 >> 2], cn = oe, on = 0 | H[cn >> 2], zt = 0 | H[cn + 4 >> 2], cn = 0 | N(0 | hn, 0 | At, 18, 0), Ot = ee, Bt = 0 | C(0 | on, 0 | zt, 0 | hn, 0 | At), At = 0 | C(0 | Bt, 0 | ee, 0 | cn, 0 | Ot), Ot = oe, H[Ot >> 2] = At, H[Ot + 4 >> 2] = ee, Ot = ae, At = 0 | H[Ot >> 2], cn = 0 | H[Ot + 4 >> 2], Ot = se, Bt = 0 | H[Ot >> 2], hn = 0 | H[Ot + 4 >> 2], Ot = 0 | N(0 | At, 0 | cn, 18, 0), zt = ee, on = 0 | C(0 | Bt, 0 | hn, 0 | At, 0 | cn), cn = 0 | C(0 | on, 0 | ee, 0 | Ot, 0 | zt), zt = se, H[zt >> 2] = cn, H[zt + 4 >> 2] = ee, zt = ue, cn = 0 | H[zt >> 2], Ot = 0 | H[zt + 4 >> 2], zt = ce, on = 0 | H[zt >> 2], At = 0 | H[zt + 4 >> 2], zt = 0 | N(0 | cn, 0 | Ot, 18, 0), hn = ee, Bt = 0 | C(0 | on, 0 | At, 0 | cn, 0 | Ot), Ot = 0 | C(0 | Bt, 0 | ee, 0 | zt, 0 | hn), hn = ce, H[hn >> 2] = Ot, H[hn + 4 >> 2] = ee, hn = fe, Ot = 0 | H[hn >> 2], zt = 0 | H[hn + 4 >> 2], hn = le, Bt = 0 | H[hn >> 2], cn = 0 | H[hn + 4 >> 2], hn = 0 | N(0 | Ot, 0 | zt, 18, 0), At = ee, on = 0 | C(0 | Bt, 0 | cn, 0 | Ot, 0 | zt), zt = 0 | C(0 | on, 0 | ee, 0 | hn, 0 | At), At = le, H[At >> 2] = zt, H[At + 4 >> 2] = ee, At = he, zt = 0 | H[At >> 2], hn = 0 | H[At + 4 >> 2], At = de, on = 0 | H[At >> 2], Ot = 0 | H[At + 4 >> 2], At = 0 | N(0 | zt, 0 | hn, 18, 0), cn = ee, Bt = 0 | C(0 | on, 0 | Ot, 0 | zt, 0 | hn), hn = 0 | C(0 | Bt, 0 | ee, 0 | At, 0 | cn), cn = de, H[cn >> 2] = hn, H[cn + 4 >> 2] = ee, cn = pe, hn = 0 | H[cn >> 2], At = 0 | H[cn + 4 >> 2], cn = me, Bt = 0 | H[cn >> 2], zt = 0 | H[cn + 4 >> 2], cn = 0 | N(0 | hn, 0 | At, 18, 0), Ot = ee, on = 0 | C(0 | Bt, 0 | zt, 0 | hn, 0 | At), At = 0 | C(0 | on, 0 | ee, 0 | cn, 0 | Ot), Ot = me, H[Ot >> 2] = At, H[Ot + 4 >> 2] = ee, Ot = ge, At = 0 | H[Ot >> 2], cn = 0 | H[Ot + 4 >> 2], Ot = ve, on = 0 | H[Ot >> 2], hn = 0 | H[Ot + 4 >> 2], Ot = 0 | N(0 | At, 0 | cn, 18, 0), zt = ee, Bt = 0 | C(0 | on, 0 | hn, 0 | At, 0 | cn), cn = 0 | C(0 | Bt, 0 | ee, 0 | Ot, 0 | zt), zt = ve, H[zt >> 2] = cn, H[zt + 4 >> 2] = ee, zt = be, cn = 0 | H[zt >> 2], Ot = 0 | H[zt + 4 >> 2], zt = we, Bt = 0 | H[zt >> 2], At = 0 | H[zt + 4 >> 2], zt = 0 | N(0 | cn, 0 | Ot, 18, 0), hn = ee, on = 0 | C(0 | Bt, 0 | At, 0 | cn, 0 | Ot), Ot = 0 | C(0 | on, 0 | ee, 0 | zt, 0 | hn), hn = we, H[hn >> 2] = Ot, H[hn + 4 >> 2] = ee, hn = ye, Ot = 0 | H[hn >> 2], zt = 0 | H[hn + 4 >> 2], hn = u, on = 0 | H[hn >> 2], cn = 0 | H[hn + 4 >> 2], hn = 0 | N(0 | Ot, 0 | zt, 18, 0), At = ee, Bt = 0 | C(0 | on, 0 | cn, 0 | Ot, 0 | zt), zt = 0 | C(0 | Bt, 0 | ee, 0 | hn, 0 | At), At = ee, hn = u, H[hn >> 2] = zt, H[hn + 4 >> 2] = At, hn = ye, H[hn >> 2] = 0, H[hn + 4 >> 2] = 0, hn = At, At = zt, zt = 0;
            do Bt = 0 | C(hn >> 31 >>> 6 | 0, 0, 0 | At, 0 | hn), Ot = 0 | E(0 | Bt, 0 | ee, 26), Bt = ee, cn = 0 | I(0 | Ot, 0 | Bt, 26), on = 0 | T(0 | At, 0 | hn, 0 | cn, 0 | ee), cn = u + (zt << 3) | 0, H[cn >> 2] = on, H[cn + 4 >> 2] = ee, cn = u + ((1 | zt) << 3) | 0, on = cn, Ht = 0 | C(0 | Ot, 0 | Bt, 0 | H[on >> 2], 0 | H[on + 4 >> 2]), on = ee, Bt = 0 | C(on >> 31 >>> 7 | 0, 0, 0 | Ht, 0 | on), Ot = 0 | E(0 | Bt, 0 | ee, 25), Bt = ee, _t = 0 | I(0 | Ot, 0 | Bt, 25), an = 0 | T(0 | Ht, 0 | on, 0 | _t, 0 | ee), _t = cn, H[_t >> 2] = an, H[_t + 4 >> 2] = ee, zt = zt + 2 | 0, _t = u + (zt << 3) | 0, an = _t, At = 0 | C(0 | Ot, 0 | Bt, 0 | H[an >> 2], 0 | H[an + 4 >> 2]), hn = ee, an = _t, H[an >> 2] = At, H[an + 4 >> 2] = hn; while (10 > zt >>> 0);
            zt = ye, hn = 0 | H[zt >> 2], At = 0 | H[zt + 4 >> 2], zt = u, dn = 0 | H[zt >> 2], vt = 0 | H[zt + 4 >> 2], zt = 0 | N(0 | hn, 0 | At, 18, 0), yt = ee, Pt = 0 | C(0 | dn, 0 | vt, 0 | hn, 0 | At), At = 0 | C(0 | Pt, 0 | ee, 0 | zt, 0 | yt), yt = ee, zt = ye, H[zt >> 2] = 0, H[zt + 4 >> 2] = 0, zt = 0 | C(yt >> 31 >>> 6 | 0, 0, 0 | At, 0 | yt), Pt = 0 | E(0 | zt, 0 | ee, 26), zt = ee, hn = 0 | I(0 | Pt, 0 | zt, 26), vt = 0 | T(0 | At, 0 | yt, 0 | hn, 0 | ee), hn = u, H[hn >> 2] = vt, H[hn + 4 >> 2] = ee, hn = we, vt = 0 | C(0 | Pt, 0 | zt, 0 | H[hn >> 2], 0 | H[hn + 4 >> 2]), hn = we, H[hn >> 2] = vt, H[hn + 4 >> 2] = ee, P = it, L = f, t = P + 80 | 0;
            do H[P >> 2] = H[L >> 2], P = P + 4 | 0, L = L + 4 | 0; while ((0 | t) > (0 | P));
            P = at, L = u, t = P + 80 | 0;
            do H[P >> 2] = H[L >> 2], P = P + 4 | 0, L = L + 4 | 0; while ((0 | t) > (0 | P));
            d(o, st), d(a, ct), h(ut, o, a), hn = ut + 144 | 0, vt = 0 | H[hn >> 2], zt = 0 | H[hn + 4 >> 2], hn = ut + 64 | 0, Pt = hn, yt = 0 | H[Pt >> 2], At = 0 | H[Pt + 4 >> 2], Pt = 0 | N(0 | vt, 0 | zt, 18, 0), dn = ee, an = 0 | C(0 | yt, 0 | At, 0 | vt, 0 | zt), zt = 0 | C(0 | an, 0 | ee, 0 | Pt, 0 | dn), dn = hn, H[dn >> 2] = zt, H[dn + 4 >> 2] = ee, dn = ut + 136 | 0, zt = 0 | H[dn >> 2], hn = 0 | H[dn + 4 >> 2], dn = ut + 56 | 0, Pt = dn, an = 0 | H[Pt >> 2], vt = 0 | H[Pt + 4 >> 2], Pt = 0 | N(0 | zt, 0 | hn, 18, 0), At = ee, yt = 0 | C(0 | an, 0 | vt, 0 | zt, 0 | hn), hn = 0 | C(0 | yt, 0 | ee, 0 | Pt, 0 | At), At = dn, H[At >> 2] = hn, H[At + 4 >> 2] = ee, At = ut + 128 | 0, hn = 0 | H[At >> 2], dn = 0 | H[At + 4 >> 2], At = ut + 48 | 0, Pt = At, yt = 0 | H[Pt >> 2], zt = 0 | H[Pt + 4 >> 2], Pt = 0 | N(0 | hn, 0 | dn, 18, 0), vt = ee, an = 0 | C(0 | yt, 0 | zt, 0 | hn, 0 | dn), dn = 0 | C(0 | an, 0 | ee, 0 | Pt, 0 | vt), vt = At, H[vt >> 2] = dn, H[vt + 4 >> 2] = ee, vt = ut + 120 | 0, dn = 0 | H[vt >> 2], At = 0 | H[vt + 4 >> 2], vt = ut + 40 | 0, Pt = vt, an = 0 | H[Pt >> 2], hn = 0 | H[Pt + 4 >> 2], Pt = 0 | N(0 | dn, 0 | At, 18, 0), zt = ee, yt = 0 | C(0 | an, 0 | hn, 0 | dn, 0 | At), At = 0 | C(0 | yt, 0 | ee, 0 | Pt, 0 | zt), zt = vt, H[zt >> 2] = At, H[zt + 4 >> 2] = ee, zt = ut + 112 | 0, At = 0 | H[zt >> 2], vt = 0 | H[zt + 4 >> 2], zt = ut + 32 | 0, Pt = zt, yt = 0 | H[Pt >> 2], dn = 0 | H[Pt + 4 >> 2], Pt = 0 | N(0 | At, 0 | vt, 18, 0), hn = ee, an = 0 | C(0 | yt, 0 | dn, 0 | At, 0 | vt), vt = 0 | C(0 | an, 0 | ee, 0 | Pt, 0 | hn), hn = zt, H[hn >> 2] = vt, H[hn + 4 >> 2] = ee, hn = ut + 104 | 0, vt = 0 | H[hn >> 2], zt = 0 | H[hn + 4 >> 2], hn = ut + 24 | 0, Pt = hn, an = 0 | H[Pt >> 2], At = 0 | H[Pt + 4 >> 2], Pt = 0 | N(0 | vt, 0 | zt, 18, 0), dn = ee, yt = 0 | C(0 | an, 0 | At, 0 | vt, 0 | zt), zt = 0 | C(0 | yt, 0 | ee, 0 | Pt, 0 | dn), dn = hn, H[dn >> 2] = zt, H[dn + 4 >> 2] = ee, dn = ut + 96 | 0, zt = 0 | H[dn >> 2], hn = 0 | H[dn + 4 >> 2], dn = ut + 16 | 0, Pt = dn, yt = 0 | H[Pt >> 2], vt = 0 | H[Pt + 4 >> 2], Pt = 0 | N(0 | zt, 0 | hn, 18, 0), At = ee, an = 0 | C(0 | yt, 0 | vt, 0 | zt, 0 | hn), hn = 0 | C(0 | an, 0 | ee, 0 | Pt, 0 | At), At = dn, H[At >> 2] = hn, H[At + 4 >> 2] = ee, At = ut + 88 | 0, hn = 0 | H[At >> 2], dn = 0 | H[At + 4 >> 2], At = ut + 8 | 0, Pt = At, an = 0 | H[Pt >> 2], zt = 0 | H[Pt + 4 >> 2], Pt = 0 | N(0 | hn, 0 | dn, 18, 0), vt = ee, yt = 0 | C(0 | an, 0 | zt, 0 | hn, 0 | dn), dn = 0 | C(0 | yt, 0 | ee, 0 | Pt, 0 | vt), vt = At, H[vt >> 2] = dn, H[vt + 4 >> 2] = ee, vt = ut + 80 | 0, dn = vt, Pt = 0 | H[dn >> 2], yt = 0 | H[dn + 4 >> 2], dn = ut, hn = 0 | H[dn >> 2], zt = 0 | H[dn + 4 >> 2], dn = 0 | N(0 | Pt, 0 | yt, 18, 0), an = ee, _t = 0 | C(0 | hn, 0 | zt, 0 | Pt, 0 | yt), yt = 0 | C(0 | _t, 0 | ee, 0 | dn, 0 | an), an = ee, dn = ut, H[dn >> 2] = yt, H[dn + 4 >> 2] = an, dn = vt, H[dn >> 2] = 0, H[dn + 4 >> 2] = 0, dn = an, an = yt, yt = 0;
            do _t = 0 | C(dn >> 31 >>> 6 | 0, 0, 0 | an, 0 | dn), Pt = 0 | E(0 | _t, 0 | ee, 26), _t = ee, zt = 0 | I(0 | Pt, 0 | _t, 26), hn = 0 | T(0 | an, 0 | dn, 0 | zt, 0 | ee), zt = ut + (yt << 3) | 0, H[zt >> 2] = hn, H[zt + 4 >> 2] = ee, zt = ut + ((1 | yt) << 3) | 0, hn = zt, Bt = 0 | C(0 | Pt, 0 | _t, 0 | H[hn >> 2], 0 | H[hn + 4 >> 2]), hn = ee, _t = 0 | C(hn >> 31 >>> 7 | 0, 0, 0 | Bt, 0 | hn), Pt = 0 | E(0 | _t, 0 | ee, 25), _t = ee, Ot = 0 | I(0 | Pt, 0 | _t, 25), cn = 0 | T(0 | Bt, 0 | hn, 0 | Ot, 0 | ee), Ot = zt, H[Ot >> 2] = cn, H[Ot + 4 >> 2] = ee, yt = yt + 2 | 0, Ot = ut + (yt << 3) | 0, cn = Ot, an = 0 | C(0 | Pt, 0 | _t, 0 | H[cn >> 2], 0 | H[cn + 4 >> 2]), dn = ee, cn = Ot, H[cn >> 2] = an, H[cn + 4 >> 2] = dn; while (10 > yt >>> 0);
            yt = vt, dn = 0 | H[yt >> 2], an = 0 | H[yt + 4 >> 2], yt = ut, cn = 0 | H[yt >> 2], Ot = 0 | H[yt + 4 >> 2], yt = 0 | N(0 | dn, 0 | an, 18, 0), _t = ee, Pt = 0 | C(0 | cn, 0 | Ot, 0 | dn, 0 | an), an = 0 | C(0 | Pt, 0 | ee, 0 | yt, 0 | _t), _t = ee, yt = vt, H[yt >> 2] = 0, H[yt + 4 >> 2] = 0, yt = 0 | C(_t >> 31 >>> 6 | 0, 0, 0 | an, 0 | _t), Pt = 0 | E(0 | yt, 0 | ee, 26), yt = ee, dn = 0 | I(0 | Pt, 0 | yt, 26), Ot = 0 | T(0 | an, 0 | _t, 0 | dn, 0 | ee), dn = ut, H[dn >> 2] = Ot, H[dn + 4 >> 2] = ee, dn = At, Ot = 0 | C(0 | Pt, 0 | yt, 0 | H[dn >> 2], 0 | H[dn + 4 >> 2]), dn = At, H[dn >> 2] = Ot, H[dn + 4 >> 2] = ee, dn = o, Ot = 0 | H[dn >> 2], yt = 0 | H[dn + 4 >> 2], dn = a, Pt = 0 | T(0 | Ot, 0 | yt, 0 | H[dn >> 2], 0 | H[dn + 4 >> 2]), dn = ee, _t = a, H[_t >> 2] = Pt, H[_t + 4 >> 2] = dn, _t = xe, an = 0 | H[_t >> 2], cn = 0 | H[_t + 4 >> 2], _t = Se, zt = 0 | T(0 | an, 0 | cn, 0 | H[_t >> 2], 0 | H[_t + 4 >> 2]), _t = ee, hn = Se, H[hn >> 2] = zt, H[hn + 4 >> 2] = _t, hn = Ae, Bt = 0 | H[hn >> 2], on = 0 | H[hn + 4 >> 2], hn = Oe, Ht = 0 | T(0 | Bt, 0 | on, 0 | H[hn >> 2], 0 | H[hn + 4 >> 2]), hn = ee, Rt = Oe, H[Rt >> 2] = Ht, H[Rt + 4 >> 2] = hn, Rt = Pe, Ft = 0 | H[Rt >> 2], Lt = 0 | H[Rt + 4 >> 2], Rt = Ee, Xt = 0 | T(0 | Ft, 0 | Lt, 0 | H[Rt >> 2], 0 | H[Rt + 4 >> 2]), Rt = ee, Zt = Ee, H[Zt >> 2] = Xt, H[Zt + 4 >> 2] = Rt, Zt = Te, sn = 0 | H[Zt >> 2], Yt = 0 | H[Zt + 4 >> 2], Zt = Ce, Ct = 0 | T(0 | sn, 0 | Yt, 0 | H[Zt >> 2], 0 | H[Zt + 4 >> 2]), Zt = ee, Ut = Ce, H[Ut >> 2] = Ct, H[Ut + 4 >> 2] = Zt, Ut = Me, Wt = 0 | H[Ut >> 2], nn = 0 | H[Ut + 4 >> 2], Ut = De, un = 0 | T(0 | Wt, 0 | nn, 0 | H[Ut >> 2], 0 | H[Ut + 4 >> 2]), Ut = ee, kt = De, H[kt >> 2] = un, H[kt + 4 >> 2] = Ut, kt = Ie, St = 0 | H[kt >> 2], pt = 0 | H[kt + 4 >> 2], kt = Le, bt = 0 | T(0 | St, 0 | pt, 0 | H[kt >> 2], 0 | H[kt + 4 >> 2]), kt = ee, tn = Le, H[tn >> 2] = bt, H[tn + 4 >> 2] = kt, tn = Fe, Kt = 0 | H[tn >> 2], Tt = 0 | H[tn + 4 >> 2], tn = Re, Mt = 0 | T(0 | Kt, 0 | Tt, 0 | H[tn >> 2], 0 | H[tn + 4 >> 2]), tn = ee, rn = Re, H[rn >> 2] = Mt, H[rn + 4 >> 2] = tn, rn = Ne, Nt = 0 | H[rn >> 2], Vt = 0 | H[rn + 4 >> 2], rn = Ue, mt = 0 | T(0 | Nt, 0 | Vt, 0 | H[rn >> 2], 0 | H[rn + 4 >> 2]), rn = ee, $t = Ue, H[$t >> 2] = mt, H[$t + 4 >> 2] = rn, $t = je, Jt = 0 | H[$t >> 2], gt = 0 | H[$t + 4 >> 2], $t = Be, It = 0 | T(0 | Jt, 0 | gt, 0 | H[$t >> 2], 0 | H[$t + 4 >> 2]), $t = ee, Qt = Be, H[Qt >> 2] = It, H[Qt + 4 >> 2] = $t, P = ze, t = P + 72 | 0;
            do H[P >> 2] = 0, P = P + 4 | 0; while ((0 | t) > (0 | P));
            At = 0 | N(0 | Pt, 0 | dn, 121665, 0), vt = ee, Qt = i, H[Qt >> 2] = At, H[Qt + 4 >> 2] = vt, Qt = 0 | N(0 | zt, 0 | _t, 121665, 0), wt = Ke, H[wt >> 2] = Qt, H[wt + 4 >> 2] = ee, wt = 0 | N(0 | Ht, 0 | hn, 121665, 0), Qt = Ge, H[Qt >> 2] = wt, H[Qt + 4 >> 2] = ee, Qt = 0 | N(0 | Xt, 0 | Rt, 121665, 0), wt = qe, H[wt >> 2] = Qt, H[wt + 4 >> 2] = ee, wt = 0 | N(0 | Ct, 0 | Zt, 121665, 0), Qt = Ve, H[Qt >> 2] = wt, H[Qt + 4 >> 2] = ee, Qt = 0 | N(0 | un, 0 | Ut, 121665, 0), wt = He, H[wt >> 2] = Qt, H[wt + 4 >> 2] = ee, wt = 0 | N(0 | bt, 0 | kt, 121665, 0), Qt = We, H[Qt >> 2] = wt, H[Qt + 4 >> 2] = ee, Qt = 0 | N(0 | Mt, 0 | tn, 121665, 0), wt = Ye, H[wt >> 2] = Qt, H[wt + 4 >> 2] = ee, wt = 0 | N(0 | mt, 0 | rn, 121665, 0), Qt = Ze, H[Qt >> 2] = wt, H[Qt + 4 >> 2] = ee, Qt = 0 | N(0 | It, 0 | $t, 121665, 0), wt = Xe, H[wt >> 2] = Qt, H[wt + 4 >> 2] = ee, wt = ze, H[wt >> 2] = 0, H[wt + 4 >> 2] = 0, wt = vt, vt = At, At = 0;
            do Qt = 0 | C(wt >> 31 >>> 6 | 0, 0, 0 | vt, 0 | wt), Gt = 0 | E(0 | Qt, 0 | ee, 26), Qt = ee, qt = 0 | I(0 | Gt, 0 | Qt, 26), jt = 0 | T(0 | vt, 0 | wt, 0 | qt, 0 | ee), qt = i + (At << 3) | 0, H[qt >> 2] = jt, H[qt + 4 >> 2] = ee, qt = i + ((1 | At) << 3) | 0, jt = qt, Et = 0 | C(0 | Gt, 0 | Qt, 0 | H[jt >> 2], 0 | H[jt + 4 >> 2]), jt = ee, Qt = 0 | C(jt >> 31 >>> 7 | 0, 0, 0 | Et, 0 | jt), Gt = 0 | E(0 | Qt, 0 | ee, 25), Qt = ee, ln = 0 | I(0 | Gt, 0 | Qt, 25), fn = 0 | T(0 | Et, 0 | jt, 0 | ln, 0 | ee), ln = qt, H[ln >> 2] = fn, H[ln + 4 >> 2] = ee, At = At + 2 | 0, ln = i + (At << 3) | 0, fn = ln, vt = 0 | C(0 | Gt, 0 | Qt, 0 | H[fn >> 2], 0 | H[fn + 4 >> 2]), wt = ee, fn = ln, H[fn >> 2] = vt, H[fn + 4 >> 2] = wt; while (10 > At >>> 0);
            At = ze, wt = 0 | H[At >> 2], vt = 0 | H[At + 4 >> 2], At = i, $t = 0 | H[At >> 2], It = 0 | H[At + 4 >> 2], At = 0 | N(0 | wt, 0 | vt, 18, 0), rn = ee, mt = 0 | C(0 | $t, 0 | It, 0 | wt, 0 | vt), vt = 0 | C(0 | mt, 0 | ee, 0 | At, 0 | rn), rn = ee, At = ze, H[At >> 2] = 0, H[At + 4 >> 2] = 0, At = 0 | C(rn >> 31 >>> 6 | 0, 0, 0 | vt, 0 | rn), mt = 0 | E(0 | At, 0 | ee, 26), At = ee, wt = 0 | I(0 | mt, 0 | At, 26), It = ee, $t = Ke, tn = 0 | H[$t >> 2], Mt = 0 | H[$t + 4 >> 2], $t = 0 | C(0 | vt, 0 | rn, 0 | Ot, 0 | yt), rn = 0 | T(0 | $t, 0 | ee, 0 | wt, 0 | It), It = i, H[It >> 2] = rn, H[It + 4 >> 2] = ee, It = 0 | C(0 | tn, 0 | Mt, 0 | an, 0 | cn), Mt = 0 | C(0 | It, 0 | ee, 0 | mt, 0 | At), At = Ke, H[At >> 2] = Mt, H[At + 4 >> 2] = ee, At = Ge, Mt = 0 | C(0 | H[At >> 2], 0 | H[At + 4 >> 2], 0 | Bt, 0 | on), At = Ge, H[At >> 2] = Mt, H[At + 4 >> 2] = ee, At = qe, Mt = 0 | C(0 | H[At >> 2], 0 | H[At + 4 >> 2], 0 | Ft, 0 | Lt), At = qe, H[At >> 2] = Mt, H[At + 4 >> 2] = ee, At = Ve, Mt = 0 | C(0 | H[At >> 2], 0 | H[At + 4 >> 2], 0 | sn, 0 | Yt), At = Ve, H[At >> 2] = Mt, H[At + 4 >> 2] = ee, At = He, Mt = 0 | C(0 | H[At >> 2], 0 | H[At + 4 >> 2], 0 | Wt, 0 | nn), At = He, H[At >> 2] = Mt, H[At + 4 >> 2] = ee, At = We, Mt = 0 | C(0 | H[At >> 2], 0 | H[At + 4 >> 2], 0 | St, 0 | pt), At = We, H[At >> 2] = Mt, H[At + 4 >> 2] = ee, At = Ye, Mt = 0 | C(0 | H[At >> 2], 0 | H[At + 4 >> 2], 0 | Kt, 0 | Tt), At = Ye, H[At >> 2] = Mt, H[At + 4 >> 2] = ee, At = Ze, Mt = 0 | C(0 | H[At >> 2], 0 | H[At + 4 >> 2], 0 | Nt, 0 | Vt), At = Ze, H[At >> 2] = Mt, H[At + 4 >> 2] = ee, At = Xe, Mt = 0 | C(0 | H[At >> 2], 0 | H[At + 4 >> 2], 0 | Jt, 0 | gt), At = Xe, H[At >> 2] = Mt, H[At + 4 >> 2] = ee, h(ft, a, i), At = ft + 144 | 0, Mt = 0 | H[At >> 2], mt = 0 | H[At + 4 >> 2], At = ft + 64 | 0, It = At, tn = 0 | H[It >> 2], rn = 0 | H[It + 4 >> 2], It = 0 | N(0 | Mt, 0 | mt, 18, 0), wt = ee, $t = 0 | C(0 | tn, 0 | rn, 0 | Mt, 0 | mt), mt = 0 | C(0 | $t, 0 | ee, 0 | It, 0 | wt), wt = At, H[wt >> 2] = mt, H[wt + 4 >> 2] = ee, wt = ft + 136 | 0, mt = 0 | H[wt >> 2], At = 0 | H[wt + 4 >> 2], wt = ft + 56 | 0, It = wt, $t = 0 | H[It >> 2], Mt = 0 | H[It + 4 >> 2], It = 0 | N(0 | mt, 0 | At, 18, 0), rn = ee, tn = 0 | C(0 | $t, 0 | Mt, 0 | mt, 0 | At), At = 0 | C(0 | tn, 0 | ee, 0 | It, 0 | rn), rn = wt, H[rn >> 2] = At, H[rn + 4 >> 2] = ee, rn = ft + 128 | 0, At = 0 | H[rn >> 2], wt = 0 | H[rn + 4 >> 2], rn = ft + 48 | 0, It = rn, tn = 0 | H[It >> 2], mt = 0 | H[It + 4 >> 2], It = 0 | N(0 | At, 0 | wt, 18, 0), Mt = ee, $t = 0 | C(0 | tn, 0 | mt, 0 | At, 0 | wt), wt = 0 | C(0 | $t, 0 | ee, 0 | It, 0 | Mt), Mt = rn, H[Mt >> 2] = wt, H[Mt + 4 >> 2] = ee, Mt = ft + 120 | 0, wt = 0 | H[Mt >> 2], rn = 0 | H[Mt + 4 >> 2], Mt = ft + 40 | 0, It = Mt, $t = 0 | H[It >> 2], At = 0 | H[It + 4 >> 2], It = 0 | N(0 | wt, 0 | rn, 18, 0), mt = ee, tn = 0 | C(0 | $t, 0 | At, 0 | wt, 0 | rn), rn = 0 | C(0 | tn, 0 | ee, 0 | It, 0 | mt), mt = Mt, H[mt >> 2] = rn, H[mt + 4 >> 2] = ee, mt = ft + 112 | 0, rn = 0 | H[mt >> 2], Mt = 0 | H[mt + 4 >> 2], mt = ft + 32 | 0, It = mt, tn = 0 | H[It >> 2], wt = 0 | H[It + 4 >> 2], It = 0 | N(0 | rn, 0 | Mt, 18, 0), At = ee, $t = 0 | C(0 | tn, 0 | wt, 0 | rn, 0 | Mt), Mt = 0 | C(0 | $t, 0 | ee, 0 | It, 0 | At), At = mt, H[At >> 2] = Mt, H[At + 4 >> 2] = ee, At = ft + 104 | 0, Mt = 0 | H[At >> 2], mt = 0 | H[At + 4 >> 2], At = ft + 24 | 0, It = At, $t = 0 | H[It >> 2], rn = 0 | H[It + 4 >> 2], It = 0 | N(0 | Mt, 0 | mt, 18, 0), wt = ee, tn = 0 | C(0 | $t, 0 | rn, 0 | Mt, 0 | mt), mt = 0 | C(0 | tn, 0 | ee, 0 | It, 0 | wt), wt = At, H[wt >> 2] = mt, H[wt + 4 >> 2] = ee, wt = ft + 96 | 0, mt = 0 | H[wt >> 2], At = 0 | H[wt + 4 >> 2], wt = ft + 16 | 0, It = wt, tn = 0 | H[It >> 2], Mt = 0 | H[It + 4 >> 2], It = 0 | N(0 | mt, 0 | At, 18, 0), rn = ee, $t = 0 | C(0 | tn, 0 | Mt, 0 | mt, 0 | At), At = 0 | C(0 | $t, 0 | ee, 0 | It, 0 | rn), rn = wt, H[rn >> 2] = At, H[rn + 4 >> 2] = ee, rn = ft + 88 | 0, At = 0 | H[rn >> 2], wt = 0 | H[rn + 4 >> 2], rn = ft + 8 | 0, It = rn, $t = 0 | H[It >> 2], mt = 0 | H[It + 4 >> 2], It = 0 | N(0 | At, 0 | wt, 18, 0), Mt = ee, tn = 0 | C(0 | $t, 0 | mt, 0 | At, 0 | wt), wt = 0 | C(0 | tn, 0 | ee, 0 | It, 0 | Mt), Mt = rn, H[Mt >> 2] = wt, H[Mt + 4 >> 2] = ee, Mt = ft + 80 | 0, wt = Mt, It = 0 | H[wt >> 2], tn = 0 | H[wt + 4 >> 2], wt = ft, At = 0 | H[wt >> 2], mt = 0 | H[wt + 4 >> 2], wt = 0 | N(0 | It, 0 | tn, 18, 0), $t = ee, vt = 0 | C(0 | At, 0 | mt, 0 | It, 0 | tn), tn = 0 | C(0 | vt, 0 | ee, 0 | wt, 0 | $t), $t = ee, wt = ft, H[wt >> 2] = tn, H[wt + 4 >> 2] = $t, wt = Mt, H[wt >> 2] = 0, H[wt + 4 >> 2] = 0, wt = $t, $t = tn, tn = 0;
            do vt = 0 | C(wt >> 31 >>> 6 | 0, 0, 0 | $t, 0 | wt), It = 0 | E(0 | vt, 0 | ee, 26), vt = ee, mt = 0 | I(0 | It, 0 | vt, 26), At = 0 | T(0 | $t, 0 | wt, 0 | mt, 0 | ee), mt = ft + (tn << 3) | 0, H[mt >> 2] = At, H[mt + 4 >> 2] = ee, mt = ft + ((1 | tn) << 3) | 0, At = mt, kt = 0 | C(0 | It, 0 | vt, 0 | H[At >> 2], 0 | H[At + 4 >> 2]), At = ee, vt = 0 | C(At >> 31 >>> 7 | 0, 0, 0 | kt, 0 | At), It = 0 | E(0 | vt, 0 | ee, 25), vt = ee, bt = 0 | I(0 | It, 0 | vt, 25), Ut = 0 | T(0 | kt, 0 | At, 0 | bt, 0 | ee), bt = mt, H[bt >> 2] = Ut, H[bt + 4 >> 2] = ee, tn = tn + 2 | 0, bt = ft + (tn << 3) | 0, Ut = bt, $t = 0 | C(0 | It, 0 | vt, 0 | H[Ut >> 2], 0 | H[Ut + 4 >> 2]), wt = ee, Ut = bt, H[Ut >> 2] = $t, H[Ut + 4 >> 2] = wt; while (10 > tn >>> 0);
            tn = Mt, wt = 0 | H[tn >> 2], $t = 0 | H[tn + 4 >> 2], tn = ft, gt = 0 | H[tn >> 2], Jt = 0 | H[tn + 4 >> 2], tn = 0 | N(0 | wt, 0 | $t, 18, 0), Vt = ee, Nt = 0 | C(0 | gt, 0 | Jt, 0 | wt, 0 | $t), $t = 0 | C(0 | Nt, 0 | ee, 0 | tn, 0 | Vt), Vt = ee, tn = Mt, H[tn >> 2] = 0, H[tn + 4 >> 2] = 0, tn = 0 | C(Vt >> 31 >>> 6 | 0, 0, 0 | $t, 0 | Vt), Nt = 0 | E(0 | tn, 0 | ee, 26), tn = ee, wt = 0 | I(0 | Nt, 0 | tn, 26), Jt = 0 | T(0 | $t, 0 | Vt, 0 | wt, 0 | ee), wt = ft, H[wt >> 2] = Jt, H[wt + 4 >> 2] = ee, wt = rn, Jt = 0 | C(0 | Nt, 0 | tn, 0 | H[wt >> 2], 0 | H[wt + 4 >> 2]), wt = rn, H[wt >> 2] = Jt, H[wt + 4 >> 2] = ee, wt = 0;
            do Jt = ut + (wt << 3) | 0, tn = Jt, Nt = 0 | H[tn >> 2], Vt = 0 | H[tn + 4 >> 2], tn = it + (wt << 3) | 0, $t = tn, gt = 0 | H[$t >> 2], Tt = 0 | H[$t + 4 >> 2], $t = (gt ^ Nt) & ht, Kt = (Tt ^ Vt) & dt, Vt = 0 | E(0, $t ^ Nt | 0, 32), Nt = Jt, H[Nt >> 2] = Vt, H[Nt + 4 >> 2] = ee, Nt = 0 | E(0, $t ^ gt | 0, 32), gt = tn, H[gt >> 2] = Nt, H[gt + 4 >> 2] = ee, wt = wt + 1 | 0; while (10 != (0 | wt));
            pn = 0;
            do wt = ft + (pn << 3) | 0, rn = wt, Mt = 0 | H[rn >> 2], gt = 0 | H[rn + 4 >> 2], rn = at + (pn << 3) | 0, Nt = rn, tn = 0 | H[Nt >> 2], $t = 0 | H[Nt + 4 >> 2], Nt = (tn ^ Mt) & ht, Vt = ($t ^ gt) & dt, gt = 0 | E(0, Nt ^ Mt | 0, 32), Mt = wt, H[Mt >> 2] = gt, H[Mt + 4 >> 2] = ee, Mt = 0 | E(0, Nt ^ tn | 0, 32), tn = rn, H[tn >> 2] = Mt, H[tn + 4 >> 2] = ee, pn = pn + 1 | 0; while (10 != (0 | pn));
            if (nt = nt + 1 | 0, 8 == (0 | nt)) {
              mn = rt, gn = it, vn = ot, bn = at, wn = st, yn = ut, _n = ct, kn = ft;
              break
            }
            dt = ft, ht = ut, tn = at, Mt = it, _ = lt << 1 & 255, ft = ct, ct = dt, ut = st, st = ht, at = ot, ot = tn, it = rt, rt = Mt
          }
          if (rt = Je + 1 | 0, 32 == (0 | rt)) {
            xn = yn, Sn = kn;
            break
          }
          Je = rt, Qe = gn, $e = mn, b = bn, et = vn, w = yn, tt = wn, y = kn, v = _n
        }
        P = x, L = xn, t = P + 80 | 0;
        do H[P >> 2] = H[L >> 2], P = P + 4 | 0, L = L + 4 | 0; while ((0 | t) > (0 | P));
        P = S, L = Sn, t = P + 80 | 0;
        do H[P >> 2] = H[L >> 2], P = P + 4 | 0, L = L + 4 | 0; while ((0 | t) > (0 | P));
        d(i, S), d(g, i), d(m, g), l(o, m, S), l(a, o, i), d(m, a), l(s, m, o), d(m, s), d(g, m), d(m, g), d(g, m), d(m, g), l(u, m, s), d(m, u), d(g, m), d(m, g), d(g, m), d(m, g), d(g, m), d(m, g), d(g, m), d(m, g), d(g, m), l(c, g, u), d(m, c), d(g, m), d(m, g), d(g, m), d(m, g), d(g, m), d(m, g), d(g, m), d(m, g), d(g, m), d(m, g), d(g, m), d(m, g), d(g, m), d(m, g), d(g, m), d(m, g), d(g, m), d(m, g), d(g, m), l(m, g, c), d(g, m), d(m, g), d(g, m), d(m, g), d(g, m), d(m, g), d(g, m), d(m, g), d(g, m), d(m, g), l(f, m, u), d(m, f), d(g, m), u = 2;
        do d(m, g), d(g, m), u = u + 2 | 0; while (50 > (0 | u));
        l(p, g, f), d(g, p), d(m, g), u = 2;
        do d(g, m), d(m, g), u = u + 2 | 0; while (100 > (0 | u));
        l(g, m, p), d(m, g), d(g, m), p = 2;
        do d(m, g), d(g, m), p = p + 2 | 0; while (50 > (0 | p));
        for (l(m, g, f), d(g, m), d(m, g), d(g, m), d(m, g), d(g, m), l(A, g, a), l(S, x, A), A = 0 | H[S >> 2], H[i >> 2] = A, x = i + 4 | 0, H[x >> 2] = H[S + 8 >> 2], a = i + 8 | 0, H[a >> 2] = H[S + 16 >> 2], g = i + 12 | 0, H[g >> 2] = H[S + 24 >> 2], m = i + 16 | 0, H[m >> 2] = H[S + 32 >> 2], f = i + 20 | 0, H[f >> 2] = H[S + 40 >> 2], p = i + 24 | 0, H[p >> 2] = H[S + 48 >> 2], u = i + 28 | 0, H[u >> 2] = H[S + 56 >> 2], c = i + 32 | 0, H[c >> 2] = H[S + 64 >> 2], s = i + 36 | 0, H[s >> 2] = H[S + 72 >> 2], S = A, A = 0;;) {
          if (o = i + (A << 2) | 0, L = S >> 31 & S, 1 & A ? (t = L >> 25, H[o >> 2] = (0 | te(t, -33554432)) + S, o = A + 1 | 0, L = i + (o << 2) | 0, xn = (0 | H[L >> 2]) + t | 0, H[L >> 2] = xn, An = xn, On = o) : (P = L >> 26, H[o >> 2] = (0 | te(P, -67108864)) + S, t = A + 1 | 0, Sn = i + (t << 2) | 0, xn = (0 | H[Sn >> 2]) + P | 0, H[Sn >> 2] = xn, An = xn, On = t), 9 == (0 | On)) break;
          S = An, A = On
        }
        for (On = 0 | H[s >> 2], A = (On >> 31 & On) >> 25, H[s >> 2] = (0 | te(A, -33554432)) + On, On = (19 * A | 0) + (0 | H[i >> 2]) | 0, H[i >> 2] = On, A = On, On = 0;;) {
          if (An = i + (On << 2) | 0, S = A >> 31 & A, 1 & On ? (t = S >> 25, H[An >> 2] = (0 | te(t, -33554432)) + A, An = On + 1 | 0, S = i + (An << 2) | 0, xn = (0 | H[S >> 2]) + t | 0, H[S >> 2] = xn, Pn = An, En = xn) : (o = S >> 26, H[An >> 2] = (0 | te(o, -67108864)) + A, xn = On + 1 | 0, L = i + (xn << 2) | 0, t = (0 | H[L >> 2]) + o | 0, H[L >> 2] = t, Pn = xn, En = t), 9 == (0 | Pn)) break;
          A = En, On = Pn
        }
        for (Pn = 0 | H[s >> 2], On = (Pn >> 31 & Pn) >> 25, H[s >> 2] = (0 | te(On, -33554432)) + Pn, Pn = (19 * On | 0) + (0 | H[i >> 2]) | 0, On = (Pn >> 31 & Pn) >> 26, En = (0 | te(On, -67108864)) + Pn | 0, H[i >> 2] = En, H[x >> 2] = On + (0 | H[x >> 2]), On = En, En = 0;;) {
          if (Pn = i + (En << 2) | 0, 1 & En ? (H[Pn >> 2] = 33554431 & On, Pn = En + 1 | 0, An = i + (Pn << 2) | 0, A = (0 | H[An >> 2]) + (On >> 25) | 0, H[An >> 2] = A, Tn = Pn, Cn = A) : (H[Pn >> 2] = 67108863 & On, A = En + 1 | 0, xn = i + (A << 2) | 0, An = (0 | H[xn >> 2]) + (On >> 26) | 0, H[xn >> 2] = An, Tn = A, Cn = An), 9 == (0 | Tn)) break;
          On = Cn, En = Tn
        }
        for (Tn = 0 | H[s >> 2], H[s >> 2] = 33554431 & Tn, En = (19 * (Tn >> 25) | 0) + (0 | H[i >> 2]) | 0, H[i >> 2] = En, Tn = En, En = 0;;) {
          if (Cn = i + (En << 2) | 0, 1 & En ? (H[Cn >> 2] = 33554431 & Tn, Cn = En + 1 | 0, Pn = i + (Cn << 2) | 0, On = (0 | H[Pn >> 2]) + (Tn >> 25) | 0, H[Pn >> 2] = On, Mn = Cn, Dn = On) : (H[Cn >> 2] = 67108863 & Tn, On = En + 1 | 0, A = i + (On << 2) | 0, Pn = (0 | H[A >> 2]) + (Tn >> 26) | 0, H[A >> 2] = Pn, Mn = On, Dn = Pn), 9 == (0 | Mn)) break;
          Tn = Dn, En = Mn
        }
        for (Mn = 0 | H[s >> 2], En = 33554431 & Mn, H[s >> 2] = En, Dn = (19 * (Mn >> 25) | 0) + (0 | H[i >> 2]) | 0, H[i >> 2] = Dn, Mn = 1, Tn = ~(Dn + -67108845 >> 31);;) {
          if (On = 0 | H[i + (Mn << 2) >> 2], 1 & Mn ? (Pn = On << 16 & (-33554432 ^ On), On = Pn << 8 & Pn, Pn = On << 4 & On, On = Pn << 2 & Pn, In = On << 1 & On) : (Cn = On << 16 & (-67108864 ^ On), Pn = Cn << 8 & Cn, Cn = Pn << 4 & Pn, Pn = Cn << 2 & Cn, In = Pn << 1 & Pn), On = In >> 31 & Tn, Mn = Mn + 1 | 0, 10 == (0 | Mn)) {
            Ln = On;
            break
          }
          Tn = On
        }
        return Tn = Dn - (67108845 & Ln) | 0, H[i >> 2] = Tn, i = 67108863 & Ln, Dn = 33554431 & Ln, Mn = (0 | H[x >> 2]) - Dn | 0, In = Mn << 2, On = (0 | H[a >> 2]) - i | 0, Pn = On << 3, Cn = (0 | H[g >> 2]) - Dn | 0, A = Cn << 5, An = (0 | H[m >> 2]) - Ln | 0, Ln = An << 6, xn = (0 | H[f >> 2]) - Dn | 0, H[f >> 2] = xn, f = (0 | H[p >> 2]) - i | 0, S = f << 1, t = (0 | H[u >> 2]) - Dn | 0, L = t << 3, o = (0 | H[c >> 2]) - i << 4, H[x >> 2] = In, H[a >> 2] = Pn, H[g >> 2] = A, H[m >> 2] = Ln, H[p >> 2] = S, H[u >> 2] = L, H[c >> 2] = o, H[s >> 2] = En - Dn << 6, V[e >> 0] = Tn, V[e + 1 >> 0] = Tn >>> 8, V[e + 2 >> 0] = Tn >>> 16, V[e + 3 >> 0] = In | Tn >>> 24, V[e + 4 >> 0] = Mn >>> 6, V[e + 5 >> 0] = Mn >>> 14, V[e + 6 >> 0] = Pn | Mn >>> 22, V[e + 7 >> 0] = On >>> 5, V[e + 8 >> 0] = On >>> 13, V[e + 9 >> 0] = A | On >>> 21, V[e + 10 >> 0] = Cn >>> 3, V[e + 11 >> 0] = Cn >>> 11, V[e + 12 >> 0] = Ln | Cn >>> 19, V[e + 13 >> 0] = An >>> 2, V[e + 14 >> 0] = An >>> 10, V[e + 15 >> 0] = An >>> 18, V[e + 16 >> 0] = xn, V[e + 17 >> 0] = xn >>> 8, V[e + 18 >> 0] = xn >>> 16, V[e + 19 >> 0] = xn >>> 24 | S, V[e + 20 >> 0] = f >>> 7, V[e + 21 >> 0] = f >>> 15, V[e + 22 >> 0] = f >>> 23 | L, V[e + 23 >> 0] = t >>> 5, V[e + 24 >> 0] = t >>> 13, L = 0 | H[c >> 2], V[e + 25 >> 0] = t >>> 21 | L, V[e + 26 >> 0] = L >>> 8, V[e + 27 >> 0] = L >>> 16, t = 0 | H[s >> 2], V[e + 28 >> 0] = L >>> 24 | t, V[e + 29 >> 0] = t >>> 8, V[e + 30 >> 0] = t >>> 16, V[e + 31 >> 0] = t >>> 24, Y = r, 0
      }

      function l(e, t, n) {
        e = 0 | e, t = 0 | t, n = 0 | n;
        var r = 0,
          i = 0,
          o = 0,
          a = 0,
          s = 0,
          u = 0,
          c = 0,
          f = 0,
          l = 0,
          d = 0,
          p = 0,
          m = 0;
        r = Y, Y = Y + 160 | 0, i = r, h(i, t, n), n = i + 144 | 0, t = 0 | H[n >> 2], o = 0 | H[n + 4 >> 2], n = i + 64 | 0, a = n, s = 0 | H[a >> 2], u = 0 | H[a + 4 >> 2], a = 0 | N(0 | t, 0 | o, 18, 0), c = ee, f = 0 | C(0 | s, 0 | u, 0 | t, 0 | o), o = 0 | C(0 | f, 0 | ee, 0 | a, 0 | c), c = n, H[c >> 2] = o, H[c + 4 >> 2] = ee, c = i + 136 | 0, o = 0 | H[c >> 2], n = 0 | H[c + 4 >> 2], c = i + 56 | 0, a = c, f = 0 | H[a >> 2], t = 0 | H[a + 4 >> 2], a = 0 | N(0 | o, 0 | n, 18, 0), u = ee, s = 0 | C(0 | f, 0 | t, 0 | o, 0 | n), n = 0 | C(0 | s, 0 | ee, 0 | a, 0 | u), u = c, H[u >> 2] = n, H[u + 4 >> 2] = ee, u = i + 128 | 0, n = 0 | H[u >> 2], c = 0 | H[u + 4 >> 2], u = i + 48 | 0, a = u, s = 0 | H[a >> 2], o = 0 | H[a + 4 >> 2], a = 0 | N(0 | n, 0 | c, 18, 0), t = ee, f = 0 | C(0 | s, 0 | o, 0 | n, 0 | c), c = 0 | C(0 | f, 0 | ee, 0 | a, 0 | t), t = u, H[t >> 2] = c, H[t + 4 >> 2] = ee, t = i + 120 | 0, c = 0 | H[t >> 2], u = 0 | H[t + 4 >> 2], t = i + 40 | 0, a = t, f = 0 | H[a >> 2], n = 0 | H[a + 4 >> 2], a = 0 | N(0 | c, 0 | u, 18, 0), o = ee, s = 0 | C(0 | f, 0 | n, 0 | c, 0 | u), u = 0 | C(0 | s, 0 | ee, 0 | a, 0 | o), o = t, H[o >> 2] = u, H[o + 4 >> 2] = ee, o = i + 112 | 0, u = 0 | H[o >> 2], t = 0 | H[o + 4 >> 2], o = i + 32 | 0, a = o, s = 0 | H[a >> 2], c = 0 | H[a + 4 >> 2], a = 0 | N(0 | u, 0 | t, 18, 0), n = ee, f = 0 | C(0 | s, 0 | c, 0 | u, 0 | t), t = 0 | C(0 | f, 0 | ee, 0 | a, 0 | n), n = o, H[n >> 2] = t, H[n + 4 >> 2] = ee, n = i + 104 | 0, t = 0 | H[n >> 2], o = 0 | H[n + 4 >> 2], n = i + 24 | 0, a = n, f = 0 | H[a >> 2], u = 0 | H[a + 4 >> 2], a = 0 | N(0 | t, 0 | o, 18, 0), c = ee, s = 0 | C(0 | f, 0 | u, 0 | t, 0 | o), o = 0 | C(0 | s, 0 | ee, 0 | a, 0 | c), c = n, H[c >> 2] = o, H[c + 4 >> 2] = ee, c = i + 96 | 0, o = 0 | H[c >> 2], n = 0 | H[c + 4 >> 2], c = i + 16 | 0, a = c, s = 0 | H[a >> 2], t = 0 | H[a + 4 >> 2], a = 0 | N(0 | o, 0 | n, 18, 0), u = ee, f = 0 | C(0 | s, 0 | t, 0 | o, 0 | n), n = 0 | C(0 | f, 0 | ee, 0 | a, 0 | u), u = c, H[u >> 2] = n, H[u + 4 >> 2] = ee, u = i + 88 | 0, n = 0 | H[u >> 2], c = 0 | H[u + 4 >> 2], u = i + 8 | 0, a = u, f = 0 | H[a >> 2], o = 0 | H[a + 4 >> 2], a = 0 | N(0 | n, 0 | c, 18, 0), t = ee, s = 0 | C(0 | f, 0 | o, 0 | n, 0 | c), c = 0 | C(0 | s, 0 | ee, 0 | a, 0 | t), t = u, H[t >> 2] = c, H[t + 4 >> 2] = ee, t = i + 80 | 0, c = t, a = 0 | H[c >> 2], s = 0 | H[c + 4 >> 2], c = i, n = 0 | H[c >> 2], o = 0 | H[c + 4 >> 2], c = 0 | N(0 | a, 0 | s, 18, 0), f = ee, l = 0 | C(0 | n, 0 | o, 0 | a, 0 | s), s = 0 | C(0 | l, 0 | ee, 0 | c, 0 | f), f = ee, c = i, H[c >> 2] = s, H[c + 4 >> 2] = f, c = t, H[c >> 2] = 0, H[c + 4 >> 2] = 0, c = f, f = s, s = 0;
        do l = 0 | C(c >> 31 >>> 6 | 0, 0, 0 | f, 0 | c), a = 0 | E(0 | l, 0 | ee, 26), l = ee, o = 0 | I(0 | a, 0 | l, 26), n = 0 | T(0 | f, 0 | c, 0 | o, 0 | ee), o = i + (s << 3) | 0, H[o >> 2] = n, H[o + 4 >> 2] = ee, o = i + ((1 | s) << 3) | 0, n = o, d = 0 | C(0 | a, 0 | l, 0 | H[n >> 2], 0 | H[n + 4 >> 2]), n = ee, l = 0 | C(n >> 31 >>> 7 | 0, 0, 0 | d, 0 | n), a = 0 | E(0 | l, 0 | ee, 25), l = ee, p = 0 | I(0 | a, 0 | l, 25), m = 0 | T(0 | d, 0 | n, 0 | p, 0 | ee), p = o, H[p >> 2] = m, H[p + 4 >> 2] = ee, s = s + 2 | 0, p = i + (s << 3) | 0, m = p, f = 0 | C(0 | a, 0 | l, 0 | H[m >> 2], 0 | H[m + 4 >> 2]), c = ee, m = p, H[m >> 2] = f, H[m + 4 >> 2] = c; while (10 > s >>> 0);
        s = t, c = 0 | H[s >> 2], f = 0 | H[s + 4 >> 2], s = i, m = 0 | H[s >> 2], p = 0 | H[s + 4 >> 2], s = 0 | N(0 | c, 0 | f, 18, 0), l = ee, a = 0 | C(0 | m, 0 | p, 0 | c, 0 | f), f = 0 | C(0 | a, 0 | ee, 0 | s, 0 | l), l = ee, s = t, H[s >> 2] = 0, H[s + 4 >> 2] = 0, s = 0 | C(l >> 31 >>> 6 | 0, 0, 0 | f, 0 | l), t = 0 | E(0 | s, 0 | ee, 26), s = ee, a = 0 | I(0 | t, 0 | s, 26), c = 0 | T(0 | f, 0 | l, 0 | a, 0 | ee), a = i, H[a >> 2] = c, H[a + 4 >> 2] = ee, a = u, c = 0 | C(0 | t, 0 | s, 0 | H[a >> 2], 0 | H[a + 4 >> 2]), a = u, H[a >> 2] = c, H[a + 4 >> 2] = ee, a = e, e = i, i = a + 80 | 0;
        do H[a >> 2] = H[e >> 2], a = a + 4 | 0, e = e + 4 | 0; while ((0 | i) > (0 | a));
        Y = r
      }

      function h(e, t, n) {
        e = 0 | e, t = 0 | t, n = 0 | n;
        var r = 0,
          i = 0,
          o = 0,
          a = 0,
          s = 0,
          u = 0,
          c = 0,
          f = 0,
          l = 0,
          h = 0,
          d = 0,
          p = 0,
          m = 0,
          g = 0,
          v = 0,
          b = 0,
          w = 0,
          y = 0,
          _ = 0,
          k = 0,
          x = 0,
          S = 0,
          A = 0;
        r = 0 | E(0, 0 | H[t >> 2], 32), i = ee, o = 0 | E(0, 0 | H[n >> 2], 32), a = 0 | N(0 | o, 0 | ee, 0 | r, 0 | i), i = e, H[i >> 2] = a, H[i + 4 >> 2] = ee, i = 0 | E(0, 0 | H[t >> 2], 32), a = ee, r = n + 8 | 0, o = 0 | E(0, 0 | H[r >> 2], 32), s = 0 | N(0 | o, 0 | ee, 0 | i, 0 | a), a = ee, i = t + 8 | 0, o = 0 | E(0, 0 | H[i >> 2], 32), u = ee, c = 0 | E(0, 0 | H[n >> 2], 32), f = 0 | N(0 | c, 0 | ee, 0 | o, 0 | u), u = 0 | C(0 | f, 0 | ee, 0 | s, 0 | a), a = e + 8 | 0, H[a >> 2] = u, H[a + 4 >> 2] = ee, a = 0 | E(0, 0 | H[i >> 2], 31), u = ee, s = 0 | E(0, 0 | H[r >> 2], 32), f = 0 | N(0 | s, 0 | ee, 0 | a, 0 | u), u = ee, a = 0 | E(0, 0 | H[t >> 2], 32), s = ee, o = n + 16 | 0, c = 0 | E(0, 0 | H[o >> 2], 32), l = 0 | N(0 | c, 0 | ee, 0 | a, 0 | s), s = 0 | C(0 | l, 0 | ee, 0 | f, 0 | u), u = ee, f = t + 16 | 0, l = 0 | E(0, 0 | H[f >> 2], 32), a = ee, c = 0 | E(0, 0 | H[n >> 2], 32), h = 0 | N(0 | c, 0 | ee, 0 | l, 0 | a), a = 0 | C(0 | s, 0 | u, 0 | h, 0 | ee), h = e + 16 | 0, H[h >> 2] = a, H[h + 4 >> 2] = ee, h = 0 | E(0, 0 | H[i >> 2], 32), a = ee, u = 0 | E(0, 0 | H[o >> 2], 32), s = 0 | N(0 | u, 0 | ee, 0 | h, 0 | a), a = ee, h = 0 | E(0, 0 | H[f >> 2], 32), u = ee, l = 0 | E(0, 0 | H[r >> 2], 32), c = 0 | N(0 | l, 0 | ee, 0 | h, 0 | u), u = 0 | C(0 | c, 0 | ee, 0 | s, 0 | a), a = ee, s = 0 | E(0, 0 | H[t >> 2], 32), c = ee, h = n + 24 | 0, l = 0 | E(0, 0 | H[h >> 2], 32), d = 0 | N(0 | l, 0 | ee, 0 | s, 0 | c), c = 0 | C(0 | u, 0 | a, 0 | d, 0 | ee), d = ee, a = t + 24 | 0, u = 0 | E(0, 0 | H[a >> 2], 32), s = ee, l = 0 | E(0, 0 | H[n >> 2], 32), p = 0 | N(0 | l, 0 | ee, 0 | u, 0 | s), s = 0 | C(0 | c, 0 | d, 0 | p, 0 | ee), p = e + 24 | 0, H[p >> 2] = s, H[p + 4 >> 2] = ee, p = 0 | E(0, 0 | H[f >> 2], 32), s = ee, d = 0 | E(0, 0 | H[o >> 2], 32), c = 0 | N(0 | d, 0 | ee, 0 | p, 0 | s), s = ee, p = 0 | E(0, 0 | H[i >> 2], 32), d = ee, u = 0 | E(0, 0 | H[h >> 2], 32), l = 0 | N(0 | u, 0 | ee, 0 | p, 0 | d), d = ee, p = 0 | E(0, 0 | H[a >> 2], 32), u = ee, m = 0 | E(0, 0 | H[r >> 2], 32), g = 0 | N(0 | m, 0 | ee, 0 | p, 0 | u), u = 0 | C(0 | g, 0 | ee, 0 | l, 0 | d), d = 0 | I(0 | u, 0 | ee, 1), u = 0 | C(0 | d, 0 | ee, 0 | c, 0 | s), s = ee, c = 0 | E(0, 0 | H[t >> 2], 32), d = ee, l = n + 32 | 0, g = 0 | E(0, 0 | H[l >> 2], 32), p = 0 | N(0 | g, 0 | ee, 0 | c, 0 | d), d = 0 | C(0 | u, 0 | s, 0 | p, 0 | ee), p = ee, s = t + 32 | 0, u = 0 | E(0, 0 | H[s >> 2], 32), c = ee, g = 0 | E(0, 0 | H[n >> 2], 32), m = 0 | N(0 | g, 0 | ee, 0 | u, 0 | c), c = 0 | C(0 | d, 0 | p, 0 | m, 0 | ee), m = e + 32 | 0, H[m >> 2] = c, H[m + 4 >> 2] = ee, m = 0 | E(0, 0 | H[f >> 2], 32), c = ee, p = 0 | E(0, 0 | H[h >> 2], 32), d = 0 | N(0 | p, 0 | ee, 0 | m, 0 | c), c = ee, m = 0 | E(0, 0 | H[a >> 2], 32), p = ee, u = 0 | E(0, 0 | H[o >> 2], 32), g = 0 | N(0 | u, 0 | ee, 0 | m, 0 | p), p = 0 | C(0 | g, 0 | ee, 0 | d, 0 | c), c = ee, d = 0 | E(0, 0 | H[i >> 2], 32), g = ee, m = 0 | E(0, 0 | H[l >> 2], 32), u = 0 | N(0 | m, 0 | ee, 0 | d, 0 | g), g = 0 | C(0 | p, 0 | c, 0 | u, 0 | ee), u = ee, c = 0 | E(0, 0 | H[s >> 2], 32), p = ee, d = 0 | E(0, 0 | H[r >> 2], 32), m = 0 | N(0 | d, 0 | ee, 0 | c, 0 | p), p = 0 | C(0 | g, 0 | u, 0 | m, 0 | ee), m = ee, u = 0 | E(0, 0 | H[t >> 2], 32), g = ee, c = n + 40 | 0, d = 0 | E(0, 0 | H[c >> 2], 32), v = 0 | N(0 | d, 0 | ee, 0 | u, 0 | g), g = 0 | C(0 | p, 0 | m, 0 | v, 0 | ee), v = ee, m = t + 40 | 0, p = 0 | E(0, 0 | H[m >> 2], 32), u = ee, d = 0 | E(0, 0 | H[n >> 2], 32), b = 0 | N(0 | d, 0 | ee, 0 | p, 0 | u), u = 0 | C(0 | g, 0 | v, 0 | b, 0 | ee), b = e + 40 | 0, H[b >> 2] = u, H[b + 4 >> 2] = ee, b = 0 | E(0, 0 | H[a >> 2], 32), u = ee, v = 0 | E(0, 0 | H[h >> 2], 32), g = 0 | N(0 | v, 0 | ee, 0 | b, 0 | u), u = ee, b = 0 | E(0, 0 | H[i >> 2], 32), v = ee, p = 0 | E(0, 0 | H[c >> 2], 32), d = 0 | N(0 | p, 0 | ee, 0 | b, 0 | v), v = 0 | C(0 | d, 0 | ee, 0 | g, 0 | u), u = ee, g = 0 | E(0, 0 | H[m >> 2], 32), d = ee, b = 0 | E(0, 0 | H[r >> 2], 32), p = 0 | N(0 | b, 0 | ee, 0 | g, 0 | d), d = 0 | C(0 | v, 0 | u, 0 | p, 0 | ee), p = 0 | I(0 | d, 0 | ee, 1), d = ee, u = 0 | E(0, 0 | H[f >> 2], 32), v = ee, g = 0 | E(0, 0 | H[l >> 2], 32), b = 0 | N(0 | g, 0 | ee, 0 | u, 0 | v), v = 0 | C(0 | p, 0 | d, 0 | b, 0 | ee), b = ee, d = 0 | E(0, 0 | H[s >> 2], 32), p = ee, u = 0 | E(0, 0 | H[o >> 2], 32), g = 0 | N(0 | u, 0 | ee, 0 | d, 0 | p), p = 0 | C(0 | v, 0 | b, 0 | g, 0 | ee), g = ee, b = 0 | E(0, 0 | H[t >> 2], 32), v = ee, d = n + 48 | 0, u = 0 | E(0, 0 | H[d >> 2], 32), w = 0 | N(0 | u, 0 | ee, 0 | b, 0 | v), v = 0 | C(0 | p, 0 | g, 0 | w, 0 | ee), w = ee, g = t + 48 | 0, p = 0 | E(0, 0 | H[g >> 2], 32), b = ee, u = 0 | E(0, 0 | H[n >> 2], 32), y = 0 | N(0 | u, 0 | ee, 0 | p, 0 | b), b = 0 | C(0 | v, 0 | w, 0 | y, 0 | ee), y = e + 48 | 0, H[y >> 2] = b, H[y + 4 >> 2] = ee, y = 0 | E(0, 0 | H[a >> 2], 32), b = ee, w = 0 | E(0, 0 | H[l >> 2], 32), v = 0 | N(0 | w, 0 | ee, 0 | y, 0 | b), b = ee, y = 0 | E(0, 0 | H[s >> 2], 32), w = ee, p = 0 | E(0, 0 | H[h >> 2], 32), u = 0 | N(0 | p, 0 | ee, 0 | y, 0 | w), w = 0 | C(0 | u, 0 | ee, 0 | v, 0 | b), b = ee, v = 0 | E(0, 0 | H[f >> 2], 32), u = ee, y = 0 | E(0, 0 | H[c >> 2], 32), p = 0 | N(0 | y, 0 | ee, 0 | v, 0 | u), u = 0 | C(0 | w, 0 | b, 0 | p, 0 | ee), p = ee, b = 0 | E(0, 0 | H[m >> 2], 32), w = ee, v = 0 | E(0, 0 | H[o >> 2], 32), y = 0 | N(0 | v, 0 | ee, 0 | b, 0 | w), w = 0 | C(0 | u, 0 | p, 0 | y, 0 | ee), y = ee, p = 0 | E(0, 0 | H[i >> 2], 32), u = ee, b = 0 | E(0, 0 | H[d >> 2], 32), v = 0 | N(0 | b, 0 | ee, 0 | p, 0 | u), u = 0 | C(0 | w, 0 | y, 0 | v, 0 | ee), v = ee, y = 0 | E(0, 0 | H[g >> 2], 32), w = ee, p = 0 | E(0, 0 | H[r >> 2], 32), b = 0 | N(0 | p, 0 | ee, 0 | y, 0 | w), w = 0 | C(0 | u, 0 | v, 0 | b, 0 | ee), b = ee, v = 0 | E(0, 0 | H[t >> 2], 32), u = ee, y = n + 56 | 0, p = 0 | E(0, 0 | H[y >> 2], 32), _ = 0 | N(0 | p, 0 | ee, 0 | v, 0 | u), u = 0 | C(0 | w, 0 | b, 0 | _, 0 | ee), _ = ee, b = t + 56 | 0, w = 0 | E(0, 0 | H[b >> 2], 32), v = ee, p = 0 | E(0, 0 | H[n >> 2], 32), k = 0 | N(0 | p, 0 | ee, 0 | w, 0 | v), v = 0 | C(0 | u, 0 | _, 0 | k, 0 | ee), k = e + 56 | 0, H[k >> 2] = v, H[k + 4 >> 2] = ee, k = 0 | E(0, 0 | H[s >> 2], 32), v = ee, _ = 0 | E(0, 0 | H[l >> 2], 32), u = 0 | N(0 | _, 0 | ee, 0 | k, 0 | v), v = ee, k = 0 | E(0, 0 | H[a >> 2], 32), _ = ee, w = 0 | E(0, 0 | H[c >> 2], 32), p = 0 | N(0 | w, 0 | ee, 0 | k, 0 | _), _ = ee, k = 0 | E(0, 0 | H[m >> 2], 32), w = ee, x = 0 | E(0, 0 | H[h >> 2], 32), S = 0 | N(0 | x, 0 | ee, 0 | k, 0 | w), w = 0 | C(0 | S, 0 | ee, 0 | p, 0 | _), _ = ee, p = 0 | E(0, 0 | H[i >> 2], 32), S = ee, k = 0 | E(0, 0 | H[y >> 2], 32), x = 0 | N(0 | k, 0 | ee, 0 | p, 0 | S), S = 0 | C(0 | w, 0 | _, 0 | x, 0 | ee), x = ee, _ = 0 | E(0, 0 | H[b >> 2], 32), w = ee, p = 0 | E(0, 0 | H[r >> 2], 32), k = 0 | N(0 | p, 0 | ee, 0 | _, 0 | w), w = 0 | C(0 | S, 0 | x, 0 | k, 0 | ee), k = 0 | I(0 | w, 0 | ee, 1), w = 0 | C(0 | k, 0 | ee, 0 | u, 0 | v), v = ee, u = 0 | E(0, 0 | H[f >> 2], 32), k = ee, x = 0 | E(0, 0 | H[d >> 2], 32), S = 0 | N(0 | x, 0 | ee, 0 | u, 0 | k), k = 0 | C(0 | w, 0 | v, 0 | S, 0 | ee), S = ee, v = 0 | E(0, 0 | H[g >> 2], 32), w = ee, u = 0 | E(0, 0 | H[o >> 2], 32), x = 0 | N(0 | u, 0 | ee, 0 | v, 0 | w), w = 0 | C(0 | k, 0 | S, 0 | x, 0 | ee), x = ee, S = 0 | E(0, 0 | H[t >> 2], 32), k = ee, v = n + 64 | 0, u = 0 | E(0, 0 | H[v >> 2], 32), _ = 0 | N(0 | u, 0 | ee, 0 | S, 0 | k), k = 0 | C(0 | w, 0 | x, 0 | _, 0 | ee), _ = ee, x = t + 64 | 0, w = 0 | E(0, 0 | H[x >> 2], 32), S = ee, u = 0 | E(0, 0 | H[n >> 2], 32), p = 0 | N(0 | u, 0 | ee, 0 | w, 0 | S), S = 0 | C(0 | k, 0 | _, 0 | p, 0 | ee), p = e + 64 | 0, H[p >> 2] = S, H[p + 4 >> 2] = ee, p = 0 | E(0, 0 | H[s >> 2], 32), S = ee, _ = 0 | E(0, 0 | H[c >> 2], 32), k = 0 | N(0 | _, 0 | ee, 0 | p, 0 | S), S = ee, p = 0 | E(0, 0 | H[m >> 2], 32), _ = ee, w = 0 | E(0, 0 | H[l >> 2], 32), u = 0 | N(0 | w, 0 | ee, 0 | p, 0 | _), _ = 0 | C(0 | u, 0 | ee, 0 | k, 0 | S), S = ee, k = 0 | E(0, 0 | H[a >> 2], 32), u = ee, p = 0 | E(0, 0 | H[d >> 2], 32), w = 0 | N(0 | p, 0 | ee, 0 | k, 0 | u), u = 0 | C(0 | _, 0 | S, 0 | w, 0 | ee), w = ee, S = 0 | E(0, 0 | H[g >> 2], 32), _ = ee, k = 0 | E(0, 0 | H[h >> 2], 32), p = 0 | N(0 | k, 0 | ee, 0 | S, 0 | _), _ = 0 | C(0 | u, 0 | w, 0 | p, 0 | ee), p = ee, w = 0 | E(0, 0 | H[f >> 2], 32), u = ee, S = 0 | E(0, 0 | H[y >> 2], 32), k = 0 | N(0 | S, 0 | ee, 0 | w, 0 | u), u = 0 | C(0 | _, 0 | p, 0 | k, 0 | ee), k = ee, p = 0 | E(0, 0 | H[b >> 2], 32), _ = ee, w = 0 | E(0, 0 | H[o >> 2], 32), S = 0 | N(0 | w, 0 | ee, 0 | p, 0 | _), _ = 0 | C(0 | u, 0 | k, 0 | S, 0 | ee), S = ee, k = 0 | E(0, 0 | H[i >> 2], 32), u = ee, p = 0 | E(0, 0 | H[v >> 2], 32), w = 0 | N(0 | p, 0 | ee, 0 | k, 0 | u), u = 0 | C(0 | _, 0 | S, 0 | w, 0 | ee), w = ee, S = 0 | E(0, 0 | H[x >> 2], 32), _ = ee, k = 0 | E(0, 0 | H[r >> 2], 32), p = 0 | N(0 | k, 0 | ee, 0 | S, 0 | _), _ = 0 | C(0 | u, 0 | w, 0 | p, 0 | ee), p = ee, w = 0 | E(0, 0 | H[t >> 2], 32), u = ee, S = n + 72 | 0, k = 0 | E(0, 0 | H[S >> 2], 32), A = 0 | N(0 | k, 0 | ee, 0 | w, 0 | u), u = 0 | C(0 | _, 0 | p, 0 | A, 0 | ee), A = ee, p = t + 72 | 0, t = 0 | E(0, 0 | H[p >> 2], 32), _ = ee, w = 0 | E(0, 0 | H[n >> 2], 32), n = 0 | N(0 | w, 0 | ee, 0 | t, 0 | _), _ = 0 | C(0 | u, 0 | A, 0 | n, 0 | ee), n = e + 72 | 0, H[n >> 2] = _, H[n + 4 >> 2] = ee, n = 0 | E(0, 0 | H[m >> 2], 32), _ = ee, A = 0 | E(0, 0 | H[c >> 2], 32), u = 0 | N(0 | A, 0 | ee, 0 | n, 0 | _), _ = ee, n = 0 | E(0, 0 | H[a >> 2], 32), A = ee, t = 0 | E(0, 0 | H[y >> 2], 32), w = 0 | N(0 | t, 0 | ee, 0 | n, 0 | A), A = 0 | C(0 | w, 0 | ee, 0 | u, 0 | _), _ = ee, u = 0 | E(0, 0 | H[b >> 2], 32), w = ee, n = 0 | E(0, 0 | H[h >> 2], 32), t = 0 | N(0 | n, 0 | ee, 0 | u, 0 | w), w = 0 | C(0 | A, 0 | _, 0 | t, 0 | ee), t = ee, _ = 0 | E(0, 0 | H[i >> 2], 32), i = ee, A = 0 | E(0, 0 | H[S >> 2], 32), u = 0 | N(0 | A, 0 | ee, 0 | _, 0 | i), i = 0 | C(0 | w, 0 | t, 0 | u, 0 | ee), u = ee, t = 0 | E(0, 0 | H[p >> 2], 32), w = ee, _ = 0 | E(0, 0 | H[r >> 2], 32), r = 0 | N(0 | _, 0 | ee, 0 | t, 0 | w), w = 0 | C(0 | i, 0 | u, 0 | r, 0 | ee), r = 0 | I(0 | w, 0 | ee, 1), w = ee, u = 0 | E(0, 0 | H[s >> 2], 32), i = ee, t = 0 | E(0, 0 | H[d >> 2], 32), _ = 0 | N(0 | t, 0 | ee, 0 | u, 0 | i), i = 0 | C(0 | r, 0 | w, 0 | _, 0 | ee), _ = ee, w = 0 | E(0, 0 | H[g >> 2], 32), r = ee, u = 0 | E(0, 0 | H[l >> 2], 32), t = 0 | N(0 | u, 0 | ee, 0 | w, 0 | r), r = 0 | C(0 | i, 0 | _, 0 | t, 0 | ee), t = ee, _ = 0 | E(0, 0 | H[f >> 2], 32), i = ee, w = 0 | E(0, 0 | H[v >> 2], 32), u = 0 | N(0 | w, 0 | ee, 0 | _, 0 | i), i = 0 | C(0 | r, 0 | t, 0 | u, 0 | ee), u = ee, t = 0 | E(0, 0 | H[x >> 2], 32), r = ee, _ = 0 | E(0, 0 | H[o >> 2], 32), w = 0 | N(0 | _, 0 | ee, 0 | t, 0 | r), r = 0 | C(0 | i, 0 | u, 0 | w, 0 | ee), w = e + 80 | 0, H[w >> 2] = r, H[w + 4 >> 2] = ee, w = 0 | E(0, 0 | H[m >> 2], 32), r = ee, u = 0 | E(0, 0 | H[d >> 2], 32), i = 0 | N(0 | u, 0 | ee, 0 | w, 0 | r), r = ee, w = 0 | E(0, 0 | H[g >> 2], 32), u = ee, t = 0 | E(0, 0 | H[c >> 2], 32), _ = 0 | N(0 | t, 0 | ee, 0 | w, 0 | u), u = 0 | C(0 | _, 0 | ee, 0 | i, 0 | r), r = ee, i = 0 | E(0, 0 | H[s >> 2], 32), _ = ee, w = 0 | E(0, 0 | H[y >> 2], 32), t = 0 | N(0 | w, 0 | ee, 0 | i, 0 | _), _ = 0 | C(0 | u, 0 | r, 0 | t, 0 | ee), t = ee, r = 0 | E(0, 0 | H[b >> 2], 32), u = ee, i = 0 | E(0, 0 | H[l >> 2], 32), w = 0 | N(0 | i, 0 | ee, 0 | r, 0 | u), u = 0 | C(0 | _, 0 | t, 0 | w, 0 | ee), w = ee, t = 0 | E(0, 0 | H[a >> 2], 32), _ = ee, r = 0 | E(0, 0 | H[v >> 2], 32), i = 0 | N(0 | r, 0 | ee, 0 | t, 0 | _), _ = 0 | C(0 | u, 0 | w, 0 | i, 0 | ee), i = ee, w = 0 | E(0, 0 | H[x >> 2], 32), u = ee, t = 0 | E(0, 0 | H[h >> 2], 32), r = 0 | N(0 | t, 0 | ee, 0 | w, 0 | u), u = 0 | C(0 | _, 0 | i, 0 | r, 0 | ee), r = ee, i = 0 | E(0, 0 | H[f >> 2], 32), f = ee, _ = 0 | E(0, 0 | H[S >> 2], 32), w = 0 | N(0 | _, 0 | ee, 0 | i, 0 | f), f = 0 | C(0 | u, 0 | r, 0 | w, 0 | ee), w = ee, r = 0 | E(0, 0 | H[p >> 2], 32), u = ee, i = 0 | E(0, 0 | H[o >> 2], 32), o = 0 | N(0 | i, 0 | ee, 0 | r, 0 | u), u = 0 | C(0 | f, 0 | w, 0 | o, 0 | ee), o = e + 88 | 0, H[o >> 2] = u, H[o + 4 >> 2] = ee, o = 0 | E(0, 0 | H[g >> 2], 32), u = ee, w = 0 | E(0, 0 | H[d >> 2], 32), f = 0 | N(0 | w, 0 | ee, 0 | o, 0 | u), u = ee, o = 0 | E(0, 0 | H[m >> 2], 32), w = ee, r = 0 | E(0, 0 | H[y >> 2], 32), i = 0 | N(0 | r, 0 | ee, 0 | o, 0 | w), w = ee, o = 0 | E(0, 0 | H[b >> 2], 32), r = ee, _ = 0 | E(0, 0 | H[c >> 2], 32), t = 0 | N(0 | _, 0 | ee, 0 | o, 0 | r), r = 0 | C(0 | t, 0 | ee, 0 | i, 0 | w), w = ee, i = 0 | E(0, 0 | H[a >> 2], 32), a = ee, t = 0 | E(0, 0 | H[S >> 2], 32), o = 0 | N(0 | t, 0 | ee, 0 | i, 0 | a), a = 0 | C(0 | r, 0 | w, 0 | o, 0 | ee), o = ee, w = 0 | E(0, 0 | H[p >> 2], 32), r = ee, i = 0 | E(0, 0 | H[h >> 2], 32), h = 0 | N(0 | i, 0 | ee, 0 | w, 0 | r), r = 0 | C(0 | a, 0 | o, 0 | h, 0 | ee), h = 0 | I(0 | r, 0 | ee, 1), r = 0 | C(0 | h, 0 | ee, 0 | f, 0 | u), u = ee, f = 0 | E(0, 0 | H[s >> 2], 32), h = ee, o = 0 | E(0, 0 | H[v >> 2], 32), a = 0 | N(0 | o, 0 | ee, 0 | f, 0 | h), h = 0 | C(0 | r, 0 | u, 0 | a, 0 | ee), a = ee, u = 0 | E(0, 0 | H[x >> 2], 32), r = ee, f = 0 | E(0, 0 | H[l >> 2], 32), o = 0 | N(0 | f, 0 | ee, 0 | u, 0 | r), r = 0 | C(0 | h, 0 | a, 0 | o, 0 | ee), o = e + 96 | 0, H[o >> 2] = r, H[o + 4 >> 2] = ee, o = 0 | E(0, 0 | H[g >> 2], 32), r = ee, a = 0 | E(0, 0 | H[y >> 2], 32), h = 0 | N(0 | a, 0 | ee, 0 | o, 0 | r), r = ee, o = 0 | E(0, 0 | H[b >> 2], 32), a = ee, u = 0 | E(0, 0 | H[d >> 2], 32), f = 0 | N(0 | u, 0 | ee, 0 | o, 0 | a), a = 0 | C(0 | f, 0 | ee, 0 | h, 0 | r), r = ee, h = 0 | E(0, 0 | H[m >> 2], 32), f = ee, o = 0 | E(0, 0 | H[v >> 2], 32), u = 0 | N(0 | o, 0 | ee, 0 | h, 0 | f), f = 0 | C(0 | a, 0 | r, 0 | u, 0 | ee), u = ee, r = 0 | E(0, 0 | H[x >> 2], 32), a = ee, h = 0 | E(0, 0 | H[c >> 2], 32), o = 0 | N(0 | h, 0 | ee, 0 | r, 0 | a), a = 0 | C(0 | f, 0 | u, 0 | o, 0 | ee), o = ee, u = 0 | E(0, 0 | H[s >> 2], 32), s = ee, f = 0 | E(0, 0 | H[S >> 2], 32), r = 0 | N(0 | f, 0 | ee, 0 | u, 0 | s), s = 0 | C(0 | a, 0 | o, 0 | r, 0 | ee), r = ee, o = 0 | E(0, 0 | H[p >> 2], 32), a = ee, u = 0 | E(0, 0 | H[l >> 2], 32), l = 0 | N(0 | u, 0 | ee, 0 | o, 0 | a), a = 0 | C(0 | s, 0 | r, 0 | l, 0 | ee), l = e + 104 | 0, H[l >> 2] = a, H[l + 4 >> 2] = ee, l = 0 | E(0, 0 | H[b >> 2], 32), a = ee, r = 0 | E(0, 0 | H[y >> 2], 32), s = 0 | N(0 | r, 0 | ee, 0 | l, 0 | a), a = ee, l = 0 | E(0, 0 | H[m >> 2], 32), m = ee, r = 0 | E(0, 0 | H[S >> 2], 32), o = 0 | N(0 | r, 0 | ee, 0 | l, 0 | m), m = 0 | C(0 | o, 0 | ee, 0 | s, 0 | a), a = ee, s = 0 | E(0, 0 | H[p >> 2], 32), o = ee, l = 0 | E(0, 0 | H[c >> 2], 32), c = 0 | N(0 | l, 0 | ee, 0 | s, 0 | o), o = 0 | C(0 | m, 0 | a, 0 | c, 0 | ee), c = 0 | I(0 | o, 0 | ee, 1), o = ee, a = 0 | E(0, 0 | H[g >> 2], 32), m = ee, s = 0 | E(0, 0 | H[v >> 2], 32), l = 0 | N(0 | s, 0 | ee, 0 | a, 0 | m), m = 0 | C(0 | c, 0 | o, 0 | l, 0 | ee), l = ee, o = 0 | E(0, 0 | H[x >> 2], 32), c = ee, a = 0 | E(0, 0 | H[d >> 2], 32), s = 0 | N(0 | a, 0 | ee, 0 | o, 0 | c), c = 0 | C(0 | m, 0 | l, 0 | s, 0 | ee), s = e + 112 | 0, H[s >> 2] = c, H[s + 4 >> 2] = ee, s = 0 | E(0, 0 | H[b >> 2], 32), c = ee, l = 0 | E(0, 0 | H[v >> 2], 32), m = 0 | N(0 | l, 0 | ee, 0 | s, 0 | c), c = ee, s = 0 | E(0, 0 | H[x >> 2], 32), l = ee, o = 0 | E(0, 0 | H[y >> 2], 32), a = 0 | N(0 | o, 0 | ee, 0 | s, 0 | l), l = 0 | C(0 | a, 0 | ee, 0 | m, 0 | c), c = ee, m = 0 | E(0, 0 | H[g >> 2], 32), g = ee, a = 0 | E(0, 0 | H[S >> 2], 32), s = 0 | N(0 | a, 0 | ee, 0 | m, 0 | g), g = 0 | C(0 | l, 0 | c, 0 | s, 0 | ee), s = ee, c = 0 | E(0, 0 | H[p >> 2], 32), l = ee, m = 0 | E(0, 0 | H[d >> 2], 32), d = 0 | N(0 | m, 0 | ee, 0 | c, 0 | l), l = 0 | C(0 | g, 0 | s, 0 | d, 0 | ee), d = e + 120 | 0, H[d >> 2] = l, H[d + 4 >> 2] = ee, d = 0 | E(0, 0 | H[x >> 2], 32), l = ee, s = 0 | E(0, 0 | H[v >> 2], 32), g = 0 | N(0 | s, 0 | ee, 0 | d, 0 | l), l = ee, d = 0 | E(0, 0 | H[b >> 2], 32), b = ee, s = 0 | E(0, 0 | H[S >> 2], 32), c = 0 | N(0 | s, 0 | ee, 0 | d, 0 | b), b = ee, d = 0 | E(0, 0 | H[p >> 2], 32), s = ee, m = 0 | E(0, 0 | H[y >> 2], 32), y = 0 | N(0 | m, 0 | ee, 0 | d, 0 | s), s = 0 | C(0 | y, 0 | ee, 0 | c, 0 | b), b = 0 | I(0 | s, 0 | ee, 1), s = 0 | C(0 | b, 0 | ee, 0 | g, 0 | l), l = e + 128 | 0, H[l >> 2] = s, H[l + 4 >> 2] = ee, l = 0 | E(0, 0 | H[x >> 2], 32), x = ee, s = 0 | E(0, 0 | H[S >> 2], 32), g = 0 | N(0 | s, 0 | ee, 0 | l, 0 | x), x = ee, l = 0 | E(0, 0 | H[p >> 2], 32), s = ee, b = 0 | E(0, 0 | H[v >> 2], 32), v = 0 | N(0 | b, 0 | ee, 0 | l, 0 | s), s = 0 | C(0 | v, 0 | ee, 0 | g, 0 | x), x = e + 136 | 0, H[x >> 2] = s, H[x + 4 >> 2] = ee, x = 0 | E(0, 0 | H[p >> 2], 31), p = ee, s = 0 | E(0, 0 | H[S >> 2], 32),
          S = 0 | N(0 | s, 0 | ee, 0 | x, 0 | p), p = e + 144 | 0, H[p >> 2] = S, H[p + 4 >> 2] = ee
      }

      function d(e, t) {
        e = 0 | e, t = 0 | t;
        var n = 0,
          r = 0,
          i = 0,
          o = 0,
          a = 0,
          s = 0,
          u = 0,
          c = 0,
          f = 0,
          l = 0,
          h = 0,
          d = 0,
          p = 0,
          m = 0,
          g = 0,
          v = 0,
          b = 0,
          w = 0,
          y = 0,
          _ = 0,
          k = 0,
          x = 0,
          S = 0,
          A = 0,
          O = 0,
          P = 0,
          M = 0,
          D = 0,
          L = 0,
          F = 0,
          R = 0,
          U = 0,
          j = 0,
          B = 0,
          z = 0,
          K = 0,
          G = 0,
          q = 0,
          V = 0,
          W = 0;
        n = Y, Y = Y + 160 | 0, r = n, i = 0 | H[t >> 2], o = 0 | E(0, 0 | i, 32), a = ee, s = 0 | N(0 | o, 0 | a, 0 | o, 0 | a), u = r, H[u >> 2] = s, H[u + 4 >> 2] = ee, u = 0 | E(0, 0 | i, 31), i = ee, s = t + 8 | 0, c = 0 | H[s >> 2], f = 0 | E(0, 0 | c, 32), l = ee, h = 0 | N(0 | f, 0 | l, 0 | u, 0 | i), d = r + 8 | 0, p = d, H[p >> 2] = h, H[p + 4 >> 2] = ee, p = 0 | N(0 | f, 0 | l, 0 | f, 0 | l), h = ee, m = t + 16 | 0, g = 0 | E(0, 0 | H[m >> 2], 32), v = ee, b = 0 | N(0 | g, 0 | v, 0 | o, 0 | a), w = 0 | C(0 | b, 0 | ee, 0 | p, 0 | h), h = 0 | I(0 | w, 0 | ee, 1), w = r + 16 | 0, p = w, H[p >> 2] = h, H[p + 4 >> 2] = ee, p = 0 | N(0 | g, 0 | v, 0 | f, 0 | l), h = ee, b = t + 24 | 0, y = 0 | E(0, 0 | H[b >> 2], 32), _ = ee, k = 0 | N(0 | y, 0 | _, 0 | o, 0 | a), x = 0 | C(0 | k, 0 | ee, 0 | p, 0 | h), h = 0 | I(0 | x, 0 | ee, 1), x = r + 24 | 0, p = x, H[p >> 2] = h, H[p + 4 >> 2] = ee, p = 0 | N(0 | g, 0 | v, 0 | g, 0 | v), h = ee, k = 0 | E(0, 0 | c, 30), S = 0 | N(0 | y, 0 | _, 0 | k, 0 | ee), k = 0 | C(0 | S, 0 | ee, 0 | p, 0 | h), h = ee, p = t + 32 | 0, S = 0 | E(0, 0 | H[p >> 2], 32), A = ee, O = 0 | N(0 | S, 0 | A, 0 | u, 0 | i), i = 0 | C(0 | k, 0 | h, 0 | O, 0 | ee), O = r + 32 | 0, h = O, H[h >> 2] = i, H[h + 4 >> 2] = ee, h = 0 | N(0 | y, 0 | _, 0 | g, 0 | v), i = ee, k = 0 | N(0 | S, 0 | A, 0 | f, 0 | l), u = 0 | C(0 | k, 0 | ee, 0 | h, 0 | i), i = ee, h = t + 40 | 0, k = 0 | E(0, 0 | H[h >> 2], 32), P = ee, M = 0 | N(0 | k, 0 | P, 0 | o, 0 | a), D = 0 | C(0 | u, 0 | i, 0 | M, 0 | ee), M = 0 | I(0 | D, 0 | ee, 1), D = r + 40 | 0, i = D, H[i >> 2] = M, H[i + 4 >> 2] = ee, i = 0 | N(0 | y, 0 | _, 0 | y, 0 | _), M = ee, u = 0 | N(0 | S, 0 | A, 0 | g, 0 | v), L = 0 | C(0 | u, 0 | ee, 0 | i, 0 | M), M = ee, i = t + 48 | 0, u = 0 | E(0, 0 | H[i >> 2], 32), F = ee, R = 0 | N(0 | u, 0 | F, 0 | o, 0 | a), U = 0 | C(0 | L, 0 | M, 0 | R, 0 | ee), R = ee, M = 0 | E(0, 0 | c, 31), c = 0 | N(0 | k, 0 | P, 0 | M, 0 | ee), M = 0 | C(0 | U, 0 | R, 0 | c, 0 | ee), c = 0 | I(0 | M, 0 | ee, 1), M = r + 48 | 0, R = M, H[R >> 2] = c, H[R + 4 >> 2] = ee, R = 0 | N(0 | S, 0 | A, 0 | y, 0 | _), c = ee, U = 0 | N(0 | k, 0 | P, 0 | g, 0 | v), L = 0 | C(0 | U, 0 | ee, 0 | R, 0 | c), c = ee, R = 0 | N(0 | u, 0 | F, 0 | f, 0 | l), U = 0 | C(0 | L, 0 | c, 0 | R, 0 | ee), R = ee, c = t + 56 | 0, L = 0 | E(0, 0 | H[c >> 2], 32), j = ee, B = 0 | N(0 | L, 0 | j, 0 | o, 0 | a), z = 0 | C(0 | U, 0 | R, 0 | B, 0 | ee), B = 0 | I(0 | z, 0 | ee, 1), z = r + 56 | 0, R = z, H[R >> 2] = B, H[R + 4 >> 2] = ee, R = 0 | N(0 | S, 0 | A, 0 | S, 0 | A), B = ee, U = 0 | N(0 | u, 0 | F, 0 | g, 0 | v), K = ee, G = t + 64 | 0, q = 0 | E(0, 0 | H[G >> 2], 32), V = ee, W = 0 | N(0 | q, 0 | V, 0 | o, 0 | a), a = 0 | C(0 | W, 0 | ee, 0 | U, 0 | K), K = ee, U = 0 | N(0 | L, 0 | j, 0 | f, 0 | l), l = ee, f = 0 | N(0 | k, 0 | P, 0 | y, 0 | _), W = 0 | C(0 | f, 0 | ee, 0 | U, 0 | l), l = 0 | I(0 | W, 0 | ee, 1), W = 0 | C(0 | a, 0 | K, 0 | l, 0 | ee), l = 0 | I(0 | W, 0 | ee, 1), W = 0 | C(0 | l, 0 | ee, 0 | R, 0 | B), B = r + 64 | 0, R = B, H[R >> 2] = W, H[R + 4 >> 2] = ee, R = 0 | N(0 | k, 0 | P, 0 | S, 0 | A), W = ee, l = 0 | N(0 | u, 0 | F, 0 | y, 0 | _), _ = 0 | C(0 | l, 0 | ee, 0 | R, 0 | W), W = ee, R = 0 | N(0 | L, 0 | j, 0 | g, 0 | v), v = 0 | C(0 | _, 0 | W, 0 | R, 0 | ee), R = ee, W = 0 | E(0, 0 | H[s >> 2], 32), s = ee, _ = 0 | N(0 | q, 0 | V, 0 | W, 0 | s), g = 0 | C(0 | v, 0 | R, 0 | _, 0 | ee), _ = ee, R = 0 | E(0, 0 | H[t >> 2], 32), v = ee, l = 0 | H[t + 72 >> 2], t = 0 | E(0, 0 | l, 32), y = ee, K = 0 | N(0 | t, 0 | y, 0 | R, 0 | v), v = 0 | C(0 | g, 0 | _, 0 | K, 0 | ee), K = 0 | I(0 | v, 0 | ee, 1), v = r + 72 | 0, H[v >> 2] = K, H[v + 4 >> 2] = ee, v = 0 | N(0 | k, 0 | P, 0 | k, 0 | P), K = ee, _ = 0 | N(0 | u, 0 | F, 0 | S, 0 | A), A = 0 | C(0 | _, 0 | ee, 0 | v, 0 | K), K = ee, v = 0 | E(0, 0 | H[m >> 2], 32), m = ee, _ = 0 | N(0 | q, 0 | V, 0 | v, 0 | m), S = 0 | C(0 | A, 0 | K, 0 | _, 0 | ee), _ = ee, K = 0 | E(0, 0 | H[b >> 2], 32), b = ee, A = 0 | N(0 | L, 0 | j, 0 | K, 0 | b), g = ee, R = 0 | N(0 | t, 0 | y, 0 | W, 0 | s), s = 0 | C(0 | R, 0 | ee, 0 | A, 0 | g), g = 0 | I(0 | s, 0 | ee, 1), s = 0 | C(0 | S, 0 | _, 0 | g, 0 | ee), g = 0 | I(0 | s, 0 | ee, 1), s = r + 80 | 0, _ = s, H[_ >> 2] = g, H[_ + 4 >> 2] = ee, _ = 0 | N(0 | u, 0 | F, 0 | k, 0 | P), P = ee, k = 0 | E(0, 0 | H[p >> 2], 32), p = ee, g = 0 | N(0 | L, 0 | j, 0 | k, 0 | p), S = 0 | C(0 | g, 0 | ee, 0 | _, 0 | P), P = ee, _ = 0 | N(0 | q, 0 | V, 0 | K, 0 | b), g = 0 | C(0 | S, 0 | P, 0 | _, 0 | ee), _ = ee, P = 0 | N(0 | t, 0 | y, 0 | v, 0 | m), m = 0 | C(0 | g, 0 | _, 0 | P, 0 | ee), P = ee, _ = 0 | I(0 | m, 0 | P, 1), g = ee, v = r + 88 | 0, H[v >> 2] = _, H[v + 4 >> 2] = g, v = 0 | N(0 | u, 0 | F, 0 | u, 0 | F), F = ee, u = 0 | N(0 | q, 0 | V, 0 | k, 0 | p), S = ee, A = 0 | H[h >> 2], h = 0 | E(0, 0 | A, 32), R = ee, W = 0 | N(0 | L, 0 | j, 0 | h, 0 | R), a = ee, U = 0 | N(0 | t, 0 | y, 0 | K, 0 | b), b = 0 | C(0 | U, 0 | ee, 0 | W, 0 | a), a = 0 | I(0 | b, 0 | ee, 1), b = 0 | C(0 | a, 0 | ee, 0 | u, 0 | S), S = 0 | I(0 | b, 0 | ee, 1), b = 0 | C(0 | S, 0 | ee, 0 | v, 0 | F), F = ee, v = r + 96 | 0, H[v >> 2] = b, H[v + 4 >> 2] = F, v = 0 | E(0, 0 | H[i >> 2], 32), i = ee, S = 0 | N(0 | L, 0 | j, 0 | v, 0 | i), j = ee, L = 0 | N(0 | q, 0 | V, 0 | h, 0 | R), R = 0 | C(0 | L, 0 | ee, 0 | S, 0 | j), j = ee, S = 0 | N(0 | t, 0 | y, 0 | k, 0 | p), p = 0 | C(0 | R, 0 | j, 0 | S, 0 | ee), S = ee, j = 0 | I(0 | p, 0 | S, 1), R = ee, k = r + 104 | 0, H[k >> 2] = j, H[k + 4 >> 2] = R, k = 0 | H[c >> 2], c = 0 | E(0, 0 | k, 32), L = ee, h = 0 | N(0 | c, 0 | L, 0 | c, 0 | L), u = ee, a = 0 | N(0 | q, 0 | V, 0 | v, 0 | i), V = 0 | C(0 | a, 0 | ee, 0 | h, 0 | u), u = ee, h = 0 | E(0, 0 | A, 31), A = 0 | N(0 | t, 0 | y, 0 | h, 0 | ee), h = 0 | C(0 | V, 0 | u, 0 | A, 0 | ee), A = ee, u = 0 | I(0 | h, 0 | A, 1), V = ee, a = r + 112 | 0, H[a >> 2] = u, H[a + 4 >> 2] = V, a = 0 | H[G >> 2], G = 0 | E(0, 0 | a, 32), q = ee, W = 0 | N(0 | G, 0 | q, 0 | c, 0 | L), L = ee, c = 0 | N(0 | t, 0 | y, 0 | v, 0 | i), i = 0 | C(0 | c, 0 | ee, 0 | W, 0 | L), L = ee, W = 0 | I(0 | i, 0 | L, 1), c = ee, v = r + 120 | 0, H[v >> 2] = W, H[v + 4 >> 2] = c, v = 0 | N(0 | G, 0 | q, 0 | G, 0 | q), q = ee, G = 0 | E(0, 0 | k, 30), k = 0 | N(0 | t, 0 | y, 0 | G, 0 | ee), G = 0 | C(0 | k, 0 | ee, 0 | v, 0 | q), q = ee, v = r + 128 | 0, H[v >> 2] = G, H[v + 4 >> 2] = q, v = 0 | E(0, 0 | a, 31), a = 0 | N(0 | t, 0 | y, 0 | v, 0 | ee), v = ee, k = r + 136 | 0, H[k >> 2] = a, H[k + 4 >> 2] = v, k = 0 | E(0, 0 | l, 31), l = 0 | N(0 | k, 0 | ee, 0 | t, 0 | y), y = ee, t = r + 144 | 0, H[t >> 2] = l, H[t + 4 >> 2] = y, t = B, k = 0 | H[t >> 2], U = 0 | H[t + 4 >> 2], t = 0 | N(0 | l, 0 | y, 18, 0), K = ee, f = 0 | C(0 | l, 0 | y, 0 | k, 0 | U), U = 0 | C(0 | f, 0 | ee, 0 | t, 0 | K), K = B, H[K >> 2] = U, H[K + 4 >> 2] = ee, K = z, U = 0 | H[K >> 2], B = 0 | H[K + 4 >> 2], K = 0 | N(0 | a, 0 | v, 18, 0), t = ee, f = 0 | C(0 | U, 0 | B, 0 | a, 0 | v), v = 0 | C(0 | f, 0 | ee, 0 | K, 0 | t), t = z, H[t >> 2] = v, H[t + 4 >> 2] = ee, t = M, v = 0 | H[t >> 2], z = 0 | H[t + 4 >> 2], t = 0 | N(0 | G, 0 | q, 18, 0), K = ee, f = 0 | C(0 | v, 0 | z, 0 | G, 0 | q), q = 0 | C(0 | f, 0 | ee, 0 | t, 0 | K), K = M, H[K >> 2] = q, H[K + 4 >> 2] = ee, K = D, q = 0 | H[K >> 2], M = 0 | H[K + 4 >> 2], K = 0 | N(0 | i, 0 | L, 36, 0), L = ee, i = 0 | C(0 | q, 0 | M, 0 | W, 0 | c), c = 0 | C(0 | i, 0 | ee, 0 | K, 0 | L), L = D, H[L >> 2] = c, H[L + 4 >> 2] = ee, L = O, c = 0 | H[L >> 2], D = 0 | H[L + 4 >> 2], L = 0 | N(0 | h, 0 | A, 36, 0), A = ee, h = 0 | C(0 | c, 0 | D, 0 | u, 0 | V), V = 0 | C(0 | h, 0 | ee, 0 | L, 0 | A), A = O, H[A >> 2] = V, H[A + 4 >> 2] = ee, A = x, V = 0 | H[A >> 2], O = 0 | H[A + 4 >> 2], A = 0 | N(0 | p, 0 | S, 36, 0), S = ee, p = 0 | C(0 | V, 0 | O, 0 | j, 0 | R), R = 0 | C(0 | p, 0 | ee, 0 | A, 0 | S), S = x, H[S >> 2] = R, H[S + 4 >> 2] = ee, S = w, R = 0 | H[S >> 2], x = 0 | H[S + 4 >> 2], S = 0 | N(0 | b, 0 | F, 18, 0), A = ee, p = 0 | C(0 | R, 0 | x, 0 | b, 0 | F), F = 0 | C(0 | p, 0 | ee, 0 | S, 0 | A), A = w, H[A >> 2] = F, H[A + 4 >> 2] = ee, A = d, F = 0 | H[A >> 2], w = 0 | H[A + 4 >> 2], A = 0 | N(0 | m, 0 | P, 36, 0), P = ee, m = 0 | C(0 | F, 0 | w, 0 | _, 0 | g), g = 0 | C(0 | m, 0 | ee, 0 | A, 0 | P), P = d, H[P >> 2] = g, H[P + 4 >> 2] = ee, P = s, g = 0 | H[P >> 2], A = 0 | H[P + 4 >> 2], P = r, m = 0 | H[P >> 2], _ = 0 | H[P + 4 >> 2], P = 0 | N(0 | g, 0 | A, 18, 0), w = ee, F = 0 | C(0 | m, 0 | _, 0 | g, 0 | A), A = 0 | C(0 | F, 0 | ee, 0 | P, 0 | w), w = ee, P = r, H[P >> 2] = A, H[P + 4 >> 2] = w, P = s, H[P >> 2] = 0, H[P + 4 >> 2] = 0, P = w, w = A, A = 0;
        do F = 0 | C(P >> 31 >>> 6 | 0, 0, 0 | w, 0 | P), g = 0 | E(0 | F, 0 | ee, 26), F = ee, _ = 0 | I(0 | g, 0 | F, 26), m = 0 | T(0 | w, 0 | P, 0 | _, 0 | ee), _ = r + (A << 3) | 0, H[_ >> 2] = m, H[_ + 4 >> 2] = ee, _ = r + ((1 | A) << 3) | 0, m = _, S = 0 | C(0 | g, 0 | F, 0 | H[m >> 2], 0 | H[m + 4 >> 2]), m = ee, F = 0 | C(m >> 31 >>> 7 | 0, 0, 0 | S, 0 | m), g = 0 | E(0 | F, 0 | ee, 25), F = ee, p = 0 | I(0 | g, 0 | F, 25), b = 0 | T(0 | S, 0 | m, 0 | p, 0 | ee), p = _, H[p >> 2] = b, H[p + 4 >> 2] = ee, A = A + 2 | 0, p = r + (A << 3) | 0, b = p, w = 0 | C(0 | g, 0 | F, 0 | H[b >> 2], 0 | H[b + 4 >> 2]), P = ee, b = p, H[b >> 2] = w, H[b + 4 >> 2] = P; while (10 > A >>> 0);
        A = s, P = 0 | H[A >> 2], w = 0 | H[A + 4 >> 2], A = r, b = 0 | H[A >> 2], p = 0 | H[A + 4 >> 2], A = 0 | N(0 | P, 0 | w, 18, 0), F = ee, g = 0 | C(0 | b, 0 | p, 0 | P, 0 | w), w = 0 | C(0 | g, 0 | ee, 0 | A, 0 | F), F = ee, A = s, H[A >> 2] = 0, H[A + 4 >> 2] = 0, A = 0 | C(F >> 31 >>> 6 | 0, 0, 0 | w, 0 | F), s = 0 | E(0 | A, 0 | ee, 26), A = ee, g = 0 | I(0 | s, 0 | A, 26), P = 0 | T(0 | w, 0 | F, 0 | g, 0 | ee), g = r, H[g >> 2] = P, H[g + 4 >> 2] = ee, g = d, P = 0 | C(0 | s, 0 | A, 0 | H[g >> 2], 0 | H[g + 4 >> 2]), g = d, H[g >> 2] = P, H[g + 4 >> 2] = ee, g = e, e = r, r = g + 80 | 0;
        do H[g >> 2] = H[e >> 2], g = g + 4 | 0, e = e + 4 | 0; while ((0 | r) > (0 | g));
        Y = n
      }

      function p() {
        var e = 0;
        return e = 0 | H[2] ? 0 | H[(0 | ae()) + 60 >> 2] : 56, 0 | e
      }

      function m(e) {
        e = 0 | e;
        var t = 0;
        return e >>> 0 > 4294963200 ? (H[(0 | p()) >> 2] = 0 - e, t = -1) : t = e, 0 | t
      }

      function g(e) {
        return e = 0 | e, 0
      }

      function v(e) {
        e = 0 | e
      }

      function b(e) {
        e = 0 | e;
        var t = 0,
          n = 0;
        return t = Y, Y = Y + 16 | 0, n = t, H[n >> 2] = H[e + 60 >> 2], e = 0 | m(0 | se(6, 0 | n)), Y = t, 0 | e
      }

      function w(e, t, n) {
        e = 0 | e, t = 0 | t, n = 0 | n;
        var r = 0,
          i = 0,
          o = 0,
          a = 0;
        return r = Y, Y = Y + 32 | 0, i = r, o = r + 20 | 0, H[i >> 2] = H[e + 60 >> 2], H[i + 4 >> 2] = 0, H[i + 8 >> 2] = t, H[i + 12 >> 2] = o, H[i + 16 >> 2] = n, (0 | m(0 | pe(140, 0 | i))) < 0 ? (H[o >> 2] = -1, a = -1) : a = 0 | H[o >> 2], Y = r, 0 | a
      }

      function y(e, t, n) {
        e = 0 | e, t = 0 | t, n = 0 | n;
        var r = 0,
          i = 0,
          o = 0,
          a = 0,
          s = 0,
          u = 0,
          c = 0,
          f = 0,
          l = 0,
          h = 0,
          d = 0,
          p = 0,
          g = 0,
          v = 0,
          b = 0,
          w = 0,
          y = 0,
          _ = 0,
          k = 0,
          x = 0,
          S = 0;
        for (r = Y, Y = Y + 48 | 0, i = r + 16 | 0, o = r, a = r + 32 | 0, s = e + 28 | 0, u = 0 | H[s >> 2], H[a >> 2] = u, c = e + 20 | 0, f = (0 | H[c >> 2]) - u | 0, H[a + 4 >> 2] = f, H[a + 8 >> 2] = t, H[a + 12 >> 2] = n, t = e + 60 | 0, u = e + 44 | 0, l = a, a = 2, h = f + n | 0;;) {
          if (0 | H[2] ? (me(1, 0 | e), H[o >> 2] = H[t >> 2], H[o + 4 >> 2] = l, H[o + 8 >> 2] = a, f = 0 | m(0 | ve(146, 0 | o)), ie(0), d = f) : (H[i >> 2] = H[t >> 2], H[i + 4 >> 2] = l, H[i + 8 >> 2] = a, d = 0 | m(0 | ve(146, 0 | i))), (0 | h) == (0 | d)) {
            p = 6;
            break
          }
          if (0 > (0 | d)) {
            g = l, v = a, p = 8;
            break
          }
          f = h - d | 0, b = 0 | H[l + 4 >> 2], b >>> 0 >= d >>> 0 ? 2 == (0 | a) ? (H[s >> 2] = (0 | H[s >> 2]) + d, w = b, y = d, _ = l, k = 2) : (w = b, y = d, _ = l, k = a) : (x = 0 | H[u >> 2], H[s >> 2] = x, H[c >> 2] = x, w = 0 | H[l + 12 >> 2], y = d - b | 0, _ = l + 8 | 0, k = a + -1 | 0), H[_ >> 2] = (0 | H[_ >> 2]) + y, H[_ + 4 >> 2] = w - y, l = _, a = k, h = f
        }
        return 6 == (0 | p) ? (h = 0 | H[u >> 2], H[e + 16 >> 2] = h + (0 | H[e + 48 >> 2]), u = h, H[s >> 2] = u, H[c >> 2] = u, S = n) : 8 == (0 | p) && (H[e + 16 >> 2] = 0, H[s >> 2] = 0, H[c >> 2] = 0, H[e >> 2] = 32 | H[e >> 2], S = 2 == (0 | v) ? 0 : n - (0 | H[g + 4 >> 2]) | 0), Y = r, 0 | S
      }

      function _(e, t, n) {
        e = 0 | e, t = 0 | t, n = 0 | n;
        var r = 0,
          i = 0;
        return r = Y, Y = Y + 80 | 0, i = r, H[e + 36 >> 2] = 3, (0 == (64 & H[e >> 2] | 0) ? (H[i >> 2] = H[e + 60 >> 2], H[i + 4 >> 2] = 21505, H[i + 8 >> 2] = r + 12, 0 != (0 | he(54, 0 | i))) : 0) && (V[e + 75 >> 0] = -1), i = 0 | y(e, t, n), Y = r, 0 | i
      }

      function k(e) {
        e = 0 | e;
        var t = 0,
          n = 0,
          r = 0,
          i = 0,
          o = 0,
          a = 0,
          s = 0;
        do
          if (e) {
            if ((0 | H[e + 76 >> 2]) <= -1) {
              t = 0 | S(e);
              break
            }
            n = 0 == (0 | g(e)), r = 0 | S(e), n ? t = r : (v(e), t = r)
          } else {
            if (i = 0 | H[13] ? 0 | k(0 | H[13]) : 0, oe(36), r = 0 | H[8])
              for (n = r, r = i;;) {
                if (a = (0 | H[n + 76 >> 2]) > -1 ? 0 | g(n) : 0, s = (0 | H[n + 20 >> 2]) >>> 0 > (0 | H[n + 28 >> 2]) >>> 0 ? 0 | S(n) | r : r, a && v(n), n = 0 | H[n + 56 >> 2], !n) {
                  o = s;
                  break
                }
                r = s
              } else o = i;
            de(36), t = o
          }
        while (0);
        return 0 | t
      }

      function x(e) {
        e = 0 | e, 0 | H[e + 68 >> 2] || v(e)
      }

      function S(e) {
        e = 0 | e;
        var t = 0,
          n = 0,
          r = 0,
          i = 0,
          o = 0,
          a = 0,
          s = 0;
        return t = e + 20 | 0, n = e + 28 | 0, ((0 | H[t >> 2]) >>> 0 > (0 | H[n >> 2]) >>> 0 ? (0 | we[3 & H[e + 36 >> 2]](e, 0, 0), 0 == (0 | H[t >> 2])) : 0) ? r = -1 : (i = e + 4 | 0, o = 0 | H[i >> 2], a = e + 8 | 0, s = 0 | H[a >> 2], s >>> 0 > o >>> 0 && 0 | we[3 & H[e + 40 >> 2]](e, o - s | 0, 1), H[e + 16 >> 2] = 0, H[n >> 2] = 0, H[t >> 2] = 0, H[a >> 2] = 0, H[i >> 2] = 0, r = 0), 0 | r
      }

      function A(e) {
        e = 0 | e;
        var t = 0,
          n = 0,
          r = 0,
          i = 0,
          o = 0,
          a = 0,
          s = 0,
          u = 0,
          c = 0,
          f = 0,
          l = 0,
          h = 0,
          d = 0,
          m = 0,
          g = 0,
          v = 0,
          b = 0,
          w = 0,
          y = 0,
          _ = 0,
          k = 0,
          x = 0,
          S = 0,
          A = 0,
          O = 0,
          P = 0,
          E = 0,
          T = 0,
          C = 0,
          M = 0,
          D = 0,
          I = 0,
          L = 0,
          F = 0,
          R = 0,
          N = 0,
          U = 0,
          j = 0,
          B = 0,
          z = 0,
          K = 0,
          G = 0,
          q = 0,
          V = 0,
          W = 0,
          Y = 0,
          Z = 0,
          X = 0,
          J = 0,
          Q = 0,
          $ = 0,
          ee = 0,
          te = 0,
          ne = 0,
          re = 0,
          ie = 0,
          oe = 0,
          ae = 0,
          se = 0,
          le = 0,
          he = 0,
          de = 0,
          pe = 0,
          me = 0,
          ve = 0,
          be = 0,
          we = 0,
          ye = 0,
          _e = 0,
          ke = 0,
          xe = 0,
          Se = 0,
          Ae = 0,
          Oe = 0,
          Pe = 0,
          Ee = 0,
          Te = 0,
          Ce = 0,
          Me = 0,
          De = 0,
          Ie = 0,
          Le = 0,
          Fe = 0,
          Re = 0,
          Ne = 0,
          Ue = 0,
          je = 0,
          Be = 0,
          ze = 0,
          Ke = 0,
          Ge = 0;
        do
          if (245 > e >>> 0) {
            if (t = 11 > e >>> 0 ? 16 : e + 11 & -8, n = t >>> 3, r = 0 | H[43], i = r >>> n, 3 & i) {
              o = (1 & i ^ 1) + n | 0, a = 212 + (o << 1 << 2) | 0, s = a + 8 | 0, u = 0 | H[s >> 2], c = u + 8 | 0, f = 0 | H[c >> 2];
              do
                if ((0 | a) != (0 | f)) {
                  if (f >>> 0 < (0 | H[47]) >>> 0 && ue(), l = f + 12 | 0, (0 | H[l >> 2]) == (0 | u)) {
                    H[l >> 2] = a, H[s >> 2] = f;
                    break
                  }
                  ue()
                } else H[43] = r & ~(1 << o);
              while (0);
              return f = o << 3, H[u + 4 >> 2] = 3 | f, s = u + f + 4 | 0, H[s >> 2] = 1 | H[s >> 2], h = c, 0 | h
            }
            if (s = 0 | H[45], t >>> 0 > s >>> 0) {
              if (i) {
                f = 2 << n, a = i << n & (f | 0 - f), f = (a & 0 - a) + -1 | 0, a = f >>> 12 & 16, l = f >>> a, f = l >>> 5 & 8, d = l >>> f, l = d >>> 2 & 4, m = d >>> l, d = m >>> 1 & 2, g = m >>> d, m = g >>> 1 & 1, v = (f | a | l | d | m) + (g >>> m) | 0, m = 212 + (v << 1 << 2) | 0, g = m + 8 | 0, d = 0 | H[g >> 2], l = d + 8 | 0, a = 0 | H[l >> 2];
                do
                  if ((0 | m) != (0 | a)) {
                    if (a >>> 0 < (0 | H[47]) >>> 0 && ue(), f = a + 12 | 0, (0 | H[f >> 2]) == (0 | d)) {
                      H[f >> 2] = m, H[g >> 2] = a, b = 0 | H[45];
                      break
                    }
                    ue()
                  } else H[43] = r & ~(1 << v), b = s;
                while (0);
                return s = (v << 3) - t | 0, H[d + 4 >> 2] = 3 | t, r = d + t | 0, H[r + 4 >> 2] = 1 | s, H[r + s >> 2] = s, b && (a = 0 | H[48], g = b >>> 3, m = 212 + (g << 1 << 2) | 0, n = 0 | H[43], i = 1 << g, n & i ? (g = m + 8 | 0, c = 0 | H[g >> 2], c >>> 0 < (0 | H[47]) >>> 0 ? ue() : (w = g, y = c)) : (H[43] = n | i, w = m + 8 | 0, y = m), H[w >> 2] = a, H[y + 12 >> 2] = a, H[a + 8 >> 2] = y, H[a + 12 >> 2] = m), H[45] = s, H[48] = r, h = l, 0 | h
              }
              if (r = 0 | H[44]) {
                for (s = (r & 0 - r) + -1 | 0, r = s >>> 12 & 16, m = s >>> r, s = m >>> 5 & 8, a = m >>> s, m = a >>> 2 & 4, i = a >>> m, a = i >>> 1 & 2, n = i >>> a, i = n >>> 1 & 1, c = 0 | H[476 + ((s | r | m | a | i) + (n >>> i) << 2) >> 2], i = (-8 & H[c + 4 >> 2]) - t | 0, n = c, a = c;;) {
                  if (c = 0 | H[n + 16 >> 2]) x = c;
                  else {
                    if (m = 0 | H[n + 20 >> 2], !m) {
                      _ = i, k = a;
                      break
                    }
                    x = m
                  }
                  c = (-8 & H[x + 4 >> 2]) - t | 0, m = i >>> 0 > c >>> 0, i = m ? c : i, n = x, a = m ? x : a
                }
                a = 0 | H[47], a >>> 0 > k >>> 0 && ue(), n = k + t | 0, k >>> 0 >= n >>> 0 && ue(), i = 0 | H[k + 24 >> 2], l = 0 | H[k + 12 >> 2];
                do
                  if ((0 | l) == (0 | k)) {
                    if (d = k + 20 | 0, v = 0 | H[d >> 2]) A = v, O = d;
                    else {
                      if (m = k + 16 | 0, c = 0 | H[m >> 2], !c) {
                        S = 0;
                        break
                      }
                      A = c, O = m
                    }
                    for (;;)
                      if (d = A + 20 | 0, v = 0 | H[d >> 2]) A = v, O = d;
                      else {
                        if (d = A + 16 | 0, v = 0 | H[d >> 2], !v) {
                          P = A, E = O;
                          break
                        }
                        A = v, O = d
                      }
                    if (!(a >>> 0 > E >>> 0)) {
                      H[E >> 2] = 0, S = P;
                      break
                    }
                    ue()
                  } else {
                    if (d = 0 | H[k + 8 >> 2], a >>> 0 > d >>> 0 && ue(), v = d + 12 | 0, (0 | H[v >> 2]) != (0 | k) && ue(), m = l + 8 | 0, (0 | H[m >> 2]) == (0 | k)) {
                      H[v >> 2] = l, H[m >> 2] = d, S = l;
                      break
                    }
                    ue()
                  }
                while (0);
                do
                  if (i) {
                    if (l = 0 | H[k + 28 >> 2], a = 476 + (l << 2) | 0, (0 | k) == (0 | H[a >> 2])) {
                      if (H[a >> 2] = S, !S) {
                        H[44] = H[44] & ~(1 << l);
                        break
                      }
                    } else if (i >>> 0 < (0 | H[47]) >>> 0 && ue(), l = i + 16 | 0, (0 | H[l >> 2]) == (0 | k) ? H[l >> 2] = S : H[i + 20 >> 2] = S, !S) break;
                    l = 0 | H[47], l >>> 0 > S >>> 0 && ue(), H[S + 24 >> 2] = i, a = 0 | H[k + 16 >> 2];
                    do
                      if (a) {
                        if (!(l >>> 0 > a >>> 0)) {
                          H[S + 16 >> 2] = a, H[a + 24 >> 2] = S;
                          break
                        }
                        ue()
                      }
                    while (0);
                    if (a = 0 | H[k + 20 >> 2]) {
                      if (!(a >>> 0 < (0 | H[47]) >>> 0)) {
                        H[S + 20 >> 2] = a, H[a + 24 >> 2] = S;
                        break
                      }
                      ue()
                    }
                  }
                while (0);
                return 16 > _ >>> 0 ? (i = _ + t | 0, H[k + 4 >> 2] = 3 | i, a = k + i + 4 | 0, H[a >> 2] = 1 | H[a >> 2]) : (H[k + 4 >> 2] = 3 | t, H[n + 4 >> 2] = 1 | _, H[n + _ >> 2] = _, a = 0 | H[45], a && (i = 0 | H[48], l = a >>> 3, a = 212 + (l << 1 << 2) | 0, d = 0 | H[43], m = 1 << l, d & m ? (l = a + 8 | 0, v = 0 | H[l >> 2], v >>> 0 < (0 | H[47]) >>> 0 ? ue() : (T = l, C = v)) : (H[43] = d | m, T = a + 8 | 0, C = a), H[T >> 2] = i, H[C + 12 >> 2] = i, H[i + 8 >> 2] = C, H[i + 12 >> 2] = a), H[45] = _, H[48] = n), h = k + 8 | 0, 0 | h
              }
              M = t
            } else M = t
          } else if (4294967231 >= e >>> 0)
          if (a = e + 11 | 0, i = -8 & a, m = 0 | H[44]) {
            d = 0 - i | 0, v = a >>> 8, v ? i >>> 0 > 16777215 ? D = 31 : (a = (v + 1048320 | 0) >>> 16 & 8, l = v << a, v = (l + 520192 | 0) >>> 16 & 4, c = l << v, l = (c + 245760 | 0) >>> 16 & 2, r = 14 - (v | a | l) + (c << l >>> 15) | 0, D = i >>> (r + 7 | 0) & 1 | r << 1) : D = 0, r = 0 | H[476 + (D << 2) >> 2];
            e: do
              if (r)
                for (l = d, c = 0, a = i << (31 == (0 | D) ? 0 : 25 - (D >>> 1) | 0), v = r, s = 0;;) {
                  if (g = -8 & H[v + 4 >> 2], u = g - i | 0, l >>> 0 > u >>> 0) {
                    if ((0 | g) == (0 | i)) {
                      N = u, U = v, j = v, R = 90;
                      break e
                    }
                    B = u, z = v
                  } else B = l, z = s;
                  if (u = 0 | H[v + 20 >> 2], v = 0 | H[v + 16 + (a >>> 31 << 2) >> 2], g = 0 == (0 | u) | (0 | u) == (0 | v) ? c : u, u = 0 == (0 | v)) {
                    I = B, L = g, F = z, R = 86;
                    break
                  }
                  l = B, c = g, a <<= 1 & u ^ 1, s = z
                } else I = d, L = 0, F = 0, R = 86;
            while (0);
            if (86 == (0 | R)) {
              if (0 == (0 | L) & 0 == (0 | F)) {
                if (r = 2 << D, d = m & (r | 0 - r), !d) {
                  M = i;
                  break
                }
                r = (d & 0 - d) + -1 | 0, d = r >>> 12 & 16, t = r >>> d, r = t >>> 5 & 8, n = t >>> r, t = n >>> 2 & 4, s = n >>> t, n = s >>> 1 & 2, a = s >>> n, s = a >>> 1 & 1, K = 0 | H[476 + ((r | d | t | n | s) + (a >>> s) << 2) >> 2]
              } else K = L;
              K ? (N = I, U = K, j = F, R = 90) : (G = I, q = F)
            }
            if (90 == (0 | R))
              for (;;)
                if (R = 0, s = (-8 & H[U + 4 >> 2]) - i | 0, a = N >>> 0 > s >>> 0, n = a ? s : N, s = a ? U : j, a = 0 | H[U + 16 >> 2]) N = n, U = a, j = s, R = 90;
                else {
                  if (U = 0 | H[U + 20 >> 2], !U) {
                    G = n, q = s;
                    break
                  }
                  N = n, j = s, R = 90
                }
            if (0 != (0 | q) ? G >>> 0 < ((0 | H[45]) - i | 0) >>> 0 : 0) {
              m = 0 | H[47], m >>> 0 > q >>> 0 && ue(), s = q + i | 0, q >>> 0 >= s >>> 0 && ue(), n = 0 | H[q + 24 >> 2], a = 0 | H[q + 12 >> 2];
              do
                if ((0 | a) == (0 | q)) {
                  if (t = q + 20 | 0, d = 0 | H[t >> 2]) W = d, Y = t;
                  else {
                    if (r = q + 16 | 0, c = 0 | H[r >> 2], !c) {
                      V = 0;
                      break
                    }
                    W = c, Y = r
                  }
                  for (;;)
                    if (t = W + 20 | 0, d = 0 | H[t >> 2]) W = d, Y = t;
                    else {
                      if (t = W + 16 | 0, d = 0 | H[t >> 2], !d) {
                        Z = W, X = Y;
                        break
                      }
                      W = d, Y = t
                    }
                  if (!(m >>> 0 > X >>> 0)) {
                    H[X >> 2] = 0, V = Z;
                    break
                  }
                  ue()
                } else {
                  if (t = 0 | H[q + 8 >> 2], m >>> 0 > t >>> 0 && ue(), d = t + 12 | 0, (0 | H[d >> 2]) != (0 | q) && ue(), r = a + 8 | 0, (0 | H[r >> 2]) == (0 | q)) {
                    H[d >> 2] = a, H[r >> 2] = t, V = a;
                    break
                  }
                  ue()
                }
              while (0);
              do
                if (n) {
                  if (a = 0 | H[q + 28 >> 2], m = 476 + (a << 2) | 0, (0 | q) == (0 | H[m >> 2])) {
                    if (H[m >> 2] = V, !V) {
                      H[44] = H[44] & ~(1 << a);
                      break
                    }
                  } else if (n >>> 0 < (0 | H[47]) >>> 0 && ue(), a = n + 16 | 0, (0 | H[a >> 2]) == (0 | q) ? H[a >> 2] = V : H[n + 20 >> 2] = V, !V) break;
                  a = 0 | H[47], a >>> 0 > V >>> 0 && ue(), H[V + 24 >> 2] = n, m = 0 | H[q + 16 >> 2];
                  do
                    if (m) {
                      if (!(a >>> 0 > m >>> 0)) {
                        H[V + 16 >> 2] = m, H[m + 24 >> 2] = V;
                        break
                      }
                      ue()
                    }
                  while (0);
                  if (m = 0 | H[q + 20 >> 2]) {
                    if (!(m >>> 0 < (0 | H[47]) >>> 0)) {
                      H[V + 20 >> 2] = m, H[m + 24 >> 2] = V;
                      break
                    }
                    ue()
                  }
                }
              while (0);
              do
                if (G >>> 0 >= 16) {
                  if (H[q + 4 >> 2] = 3 | i, H[s + 4 >> 2] = 1 | G, H[s + G >> 2] = G, n = G >>> 3, 256 > G >>> 0) {
                    m = 212 + (n << 1 << 2) | 0, a = 0 | H[43], t = 1 << n, a & t ? (n = m + 8 | 0, r = 0 | H[n >> 2], r >>> 0 < (0 | H[47]) >>> 0 ? ue() : (J = n, Q = r)) : (H[43] = a | t, J = m + 8 | 0, Q = m), H[J >> 2] = s, H[Q + 12 >> 2] = s, H[s + 8 >> 2] = Q, H[s + 12 >> 2] = m;
                    break
                  }
                  if (m = G >>> 8, m ? G >>> 0 > 16777215 ? $ = 31 : (t = (m + 1048320 | 0) >>> 16 & 8, a = m << t, m = (a + 520192 | 0) >>> 16 & 4, r = a << m, a = (r + 245760 | 0) >>> 16 & 2, n = 14 - (m | t | a) + (r << a >>> 15) | 0, $ = G >>> (n + 7 | 0) & 1 | n << 1) : $ = 0, n = 476 + ($ << 2) | 0, H[s + 28 >> 2] = $, a = s + 16 | 0, H[a + 4 >> 2] = 0, H[a >> 2] = 0, a = 0 | H[44], r = 1 << $, !(a & r)) {
                    H[44] = a | r, H[n >> 2] = s, H[s + 24 >> 2] = n, H[s + 12 >> 2] = s, H[s + 8 >> 2] = s;
                    break
                  }
                  for (r = G << (31 == (0 | $) ? 0 : 25 - ($ >>> 1) | 0), a = 0 | H[n >> 2];;) {
                    if ((-8 & H[a + 4 >> 2] | 0) == (0 | G)) {
                      ee = a, R = 148;
                      break
                    }
                    if (n = a + 16 + (r >>> 31 << 2) | 0, t = 0 | H[n >> 2], !t) {
                      te = n, ne = a, R = 145;
                      break
                    }
                    r <<= 1, a = t
                  }
                  if (145 == (0 | R)) {
                    if (!(te >>> 0 < (0 | H[47]) >>> 0)) {
                      H[te >> 2] = s, H[s + 24 >> 2] = ne, H[s + 12 >> 2] = s, H[s + 8 >> 2] = s;
                      break
                    }
                    ue()
                  } else if (148 == (0 | R)) {
                    if (a = ee + 8 | 0, r = 0 | H[a >> 2], t = 0 | H[47], r >>> 0 >= t >>> 0 & ee >>> 0 >= t >>> 0) {
                      H[r + 12 >> 2] = s, H[a >> 2] = s, H[s + 8 >> 2] = r, H[s + 12 >> 2] = ee, H[s + 24 >> 2] = 0;
                      break
                    }
                    ue()
                  }
                } else r = G + i | 0, H[q + 4 >> 2] = 3 | r, a = q + r + 4 | 0, H[a >> 2] = 1 | H[a >> 2];
              while (0);
              return h = q + 8 | 0, 0 | h
            }
            M = i
          } else M = i;
        else M = -1; while (0);
        if (q = 0 | H[45], q >>> 0 >= M >>> 0) return G = q - M | 0, ee = 0 | H[48], G >>> 0 > 15 ? (ne = ee + M | 0, H[48] = ne, H[45] = G, H[ne + 4 >> 2] = 1 | G, H[ne + G >> 2] = G, H[ee + 4 >> 2] = 3 | M) : (H[45] = 0, H[48] = 0, H[ee + 4 >> 2] = 3 | q, G = ee + q + 4 | 0, H[G >> 2] = 1 | H[G >> 2]), h = ee + 8 | 0, 0 | h;
        if (ee = 0 | H[46], ee >>> 0 > M >>> 0) return G = ee - M | 0, H[46] = G, ee = 0 | H[49], q = ee + M | 0, H[49] = q, H[q + 4 >> 2] = 1 | G, H[ee + 4 >> 2] = 3 | M, h = ee + 8 | 0, 0 | h;
        do
          if (!(0 | H[161])) {
            if (ee = 0 | ge(30), !(ee + -1 & ee)) {
              H[163] = ee, H[162] = ee, H[164] = -1, H[165] = -1, H[166] = 0, H[154] = 0, H[161] = -16 & (0 | fe(0)) ^ 1431655768;
              break
            }
            ue()
          }
        while (0);
        if (ee = M + 48 | 0, G = 0 | H[163], q = M + 47 | 0, ne = G + q | 0, te = 0 - G | 0, G = ne & te, M >>> 0 >= G >>> 0) return h = 0, 0 | h;
        if ($ = 0 | H[153], 0 != (0 | $) ? (Q = 0 | H[151], J = Q + G | 0, Q >>> 0 >= J >>> 0 | J >>> 0 > $ >>> 0) : 0) return h = 0, 0 | h;
        e: do
          if (4 & H[154]) R = 190;
          else {
            $ = 0 | H[49];
            t: do
              if ($) {
                for (J = 620;;) {
                  if (Q = 0 | H[J >> 2], $ >>> 0 >= Q >>> 0 ? (V = J + 4 | 0, (Q + (0 | H[V >> 2]) | 0) >>> 0 > $ >>> 0) : 0) {
                    re = J, ie = V;
                    break
                  }
                  if (J = 0 | H[J + 8 >> 2], !J) {
                    R = 173;
                    break t
                  }
                }
                if (J = ne - (0 | H[46]) & te, 2147483647 > J >>> 0)
                  if (V = 0 | ce(0 | J), (0 | V) == ((0 | H[re >> 2]) + (0 | H[ie >> 2]) | 0)) {
                    if (-1 != (0 | V)) {
                      oe = V, ae = J, R = 193;
                      break e
                    }
                  } else se = V, le = J, R = 183
              } else R = 173;
            while (0);
            do
              if ((173 == (0 | R) ? ($ = 0 | ce(0), -1 != (0 | $)) : 0) && (i = $, J = 0 | H[162], V = J + -1 | 0, he = V & i ? G - i + (V + i & 0 - J) | 0 : G, J = 0 | H[151], i = J + he | 0, he >>> 0 > M >>> 0 & 2147483647 > he >>> 0)) {
                if (V = 0 | H[153], 0 != (0 | V) ? J >>> 0 >= i >>> 0 | i >>> 0 > V >>> 0 : 0) break;
                if (V = 0 | ce(0 | he), (0 | V) == (0 | $)) {
                  oe = $, ae = he, R = 193;
                  break e
                }
                se = V, le = he, R = 183
              }
            while (0);
            t: do
              if (183 == (0 | R)) {
                V = 0 - le | 0;
                do {
                  if (ee >>> 0 > le >>> 0 & (2147483647 > le >>> 0 & -1 != (0 | se)) ? ($ = 0 | H[163], i = q - le + $ & 0 - $, 2147483647 > i >>> 0) : 0) {
                    if (-1 == (0 | ce(0 | i))) {
                      0 | ce(0 | V);
                      break t
                    }
                    de = i + le | 0;
                    break
                  }
                  de = le
                } while (0);
                if (-1 != (0 | se)) {
                  oe = se, ae = de, R = 193;
                  break e
                }
              }
            while (0);
            H[154] = 4 | H[154], R = 190
          }
        while (0);
        if ((((190 == (0 | R) ? 2147483647 > G >>> 0 : 0) ? (de = 0 | ce(0 | G), G = 0 | ce(0), G >>> 0 > de >>> 0 & (-1 != (0 | de) & -1 != (0 | G))) : 0) ? (se = G - de | 0, se >>> 0 > (M + 40 | 0) >>> 0) : 0) && (oe = de, ae = se, R = 193), 193 == (0 | R)) {
          se = (0 | H[151]) + ae | 0, H[151] = se, se >>> 0 > (0 | H[152]) >>> 0 && (H[152] = se), se = 0 | H[49];
          do
            if (se) {
              de = 620;
              do {
                if (G = 0 | H[de >> 2], le = de + 4 | 0, q = 0 | H[le >> 2], (0 | oe) == (G + q | 0)) {
                  pe = G, me = le, ve = q, be = de, R = 203;
                  break
                }
                de = 0 | H[de + 8 >> 2]
              } while (0 != (0 | de));
              if ((203 == (0 | R) ? 0 == (8 & H[be + 12 >> 2] | 0) : 0) ? oe >>> 0 > se >>> 0 & se >>> 0 >= pe >>> 0 : 0) {
                H[me >> 2] = ve + ae, de = se + 8 | 0, q = 0 == (7 & de | 0) ? 0 : 0 - de & 7, de = se + q | 0, le = ae - q + (0 | H[46]) | 0, H[49] = de, H[46] = le, H[de + 4 >> 2] = 1 | le, H[de + le + 4 >> 2] = 40, H[50] = H[165];
                break
              }
              for (le = 0 | H[47], le >>> 0 > oe >>> 0 ? (H[47] = oe, we = oe) : we = le, le = oe + ae | 0, de = 620;;) {
                if ((0 | H[de >> 2]) == (0 | le)) {
                  ye = de, _e = de, R = 211;
                  break
                }
                if (de = 0 | H[de + 8 >> 2], !de) {
                  ke = 620;
                  break
                }
              }
              if (211 == (0 | R)) {
                if (!(8 & H[_e + 12 >> 2])) {
                  H[ye >> 2] = oe, de = _e + 4 | 0, H[de >> 2] = (0 | H[de >> 2]) + ae, de = oe + 8 | 0, q = oe + (0 == (7 & de | 0) ? 0 : 0 - de & 7) | 0, de = le + 8 | 0, G = le + (0 == (7 & de | 0) ? 0 : 0 - de & 7) | 0, de = q + M | 0, ee = G - q - M | 0, H[q + 4 >> 2] = 3 | M;
                  do
                    if ((0 | G) != (0 | se)) {
                      if ((0 | G) == (0 | H[48])) {
                        he = (0 | H[45]) + ee | 0, H[45] = he, H[48] = de, H[de + 4 >> 2] = 1 | he, H[de + he >> 2] = he;
                        break
                      }
                      if (he = 0 | H[G + 4 >> 2], 1 == (3 & he | 0)) {
                        ie = -8 & he, re = he >>> 3;
                        e: do
                          if (he >>> 0 >= 256) {
                            te = 0 | H[G + 24 >> 2], ne = 0 | H[G + 12 >> 2];
                            do
                              if ((0 | ne) == (0 | G)) {
                                if (V = G + 16 | 0, i = V + 4 | 0, $ = 0 | H[i >> 2]) Se = $, Ae = i;
                                else {
                                  if (J = 0 | H[V >> 2], !J) {
                                    xe = 0;
                                    break
                                  }
                                  Se = J, Ae = V
                                }
                                for (;;)
                                  if (i = Se + 20 | 0, $ = 0 | H[i >> 2]) Se = $, Ae = i;
                                  else {
                                    if (i = Se + 16 | 0, $ = 0 | H[i >> 2], !$) {
                                      Oe = Se, Pe = Ae;
                                      break
                                    }
                                    Se = $, Ae = i
                                  }
                                if (!(we >>> 0 > Pe >>> 0)) {
                                  H[Pe >> 2] = 0, xe = Oe;
                                  break
                                }
                                ue()
                              } else {
                                if (i = 0 | H[G + 8 >> 2], we >>> 0 > i >>> 0 && ue(), $ = i + 12 | 0, (0 | H[$ >> 2]) != (0 | G) && ue(), V = ne + 8 | 0, (0 | H[V >> 2]) == (0 | G)) {
                                  H[$ >> 2] = ne, H[V >> 2] = i, xe = ne;
                                  break
                                }
                                ue()
                              }
                            while (0);
                            if (!te) break;
                            ne = 0 | H[G + 28 >> 2], i = 476 + (ne << 2) | 0;
                            do {
                              if ((0 | G) == (0 | H[i >> 2])) {
                                if (H[i >> 2] = xe, xe) break;
                                H[44] = H[44] & ~(1 << ne);
                                break e
                              }
                              if (te >>> 0 < (0 | H[47]) >>> 0 && ue(), V = te + 16 | 0, (0 | H[V >> 2]) == (0 | G) ? H[V >> 2] = xe : H[te + 20 >> 2] = xe, !xe) break e
                            } while (0);
                            ne = 0 | H[47], ne >>> 0 > xe >>> 0 && ue(), H[xe + 24 >> 2] = te, i = G + 16 | 0, V = 0 | H[i >> 2];
                            do
                              if (V) {
                                if (!(ne >>> 0 > V >>> 0)) {
                                  H[xe + 16 >> 2] = V, H[V + 24 >> 2] = xe;
                                  break
                                }
                                ue()
                              }
                            while (0);
                            if (V = 0 | H[i + 4 >> 2], !V) break;
                            if (!(V >>> 0 < (0 | H[47]) >>> 0)) {
                              H[xe + 20 >> 2] = V, H[V + 24 >> 2] = xe;
                              break
                            }
                            ue()
                          } else {
                            V = 0 | H[G + 8 >> 2], ne = 0 | H[G + 12 >> 2], te = 212 + (re << 1 << 2) | 0;
                            do
                              if ((0 | V) != (0 | te)) {
                                if (we >>> 0 > V >>> 0 && ue(), (0 | H[V + 12 >> 2]) == (0 | G)) break;
                                ue()
                              }
                            while (0);
                            if ((0 | ne) == (0 | V)) {
                              H[43] = H[43] & ~(1 << re);
                              break
                            }
                            do
                              if ((0 | ne) == (0 | te)) Ee = ne + 8 | 0;
                              else {
                                if (we >>> 0 > ne >>> 0 && ue(), i = ne + 8 | 0, (0 | H[i >> 2]) == (0 | G)) {
                                  Ee = i;
                                  break
                                }
                                ue()
                              }
                            while (0);
                            H[V + 12 >> 2] = ne, H[Ee >> 2] = V
                          }
                        while (0);
                        Te = G + ie | 0, Ce = ie + ee | 0
                      } else Te = G, Ce = ee;
                      if (re = Te + 4 | 0, H[re >> 2] = -2 & H[re >> 2], H[de + 4 >> 2] = 1 | Ce, H[de + Ce >> 2] = Ce, re = Ce >>> 3, 256 > Ce >>> 0) {
                        he = 212 + (re << 1 << 2) | 0, te = 0 | H[43], i = 1 << re;
                        do
                          if (te & i) {
                            if (re = he + 8 | 0, $ = 0 | H[re >> 2], $ >>> 0 >= (0 | H[47]) >>> 0) {
                              Me = re, De = $;
                              break
                            }
                            ue()
                          } else H[43] = te | i, Me = he + 8 | 0, De = he;
                        while (0);
                        H[Me >> 2] = de, H[De + 12 >> 2] = de, H[de + 8 >> 2] = De, H[de + 12 >> 2] = he;
                        break
                      }
                      i = Ce >>> 8;
                      do
                        if (i) {
                          if (Ce >>> 0 > 16777215) {
                            Ie = 31;
                            break
                          }
                          te = (i + 1048320 | 0) >>> 16 & 8, ie = i << te, $ = (ie + 520192 | 0) >>> 16 & 4, re = ie << $, ie = (re + 245760 | 0) >>> 16 & 2, J = 14 - ($ | te | ie) + (re << ie >>> 15) | 0, Ie = Ce >>> (J + 7 | 0) & 1 | J << 1
                        } else Ie = 0;
                      while (0);
                      if (i = 476 + (Ie << 2) | 0, H[de + 28 >> 2] = Ie, he = de + 16 | 0, H[he + 4 >> 2] = 0, H[he >> 2] = 0, he = 0 | H[44], J = 1 << Ie, !(he & J)) {
                        H[44] = he | J, H[i >> 2] = de, H[de + 24 >> 2] = i, H[de + 12 >> 2] = de, H[de + 8 >> 2] = de;
                        break
                      }
                      for (J = Ce << (31 == (0 | Ie) ? 0 : 25 - (Ie >>> 1) | 0), he = 0 | H[i >> 2];;) {
                        if ((-8 & H[he + 4 >> 2] | 0) == (0 | Ce)) {
                          Le = he, R = 281;
                          break
                        }
                        if (i = he + 16 + (J >>> 31 << 2) | 0, ie = 0 | H[i >> 2], !ie) {
                          Fe = i, Re = he, R = 278;
                          break
                        }
                        J <<= 1, he = ie
                      }
                      if (278 == (0 | R)) {
                        if (!(Fe >>> 0 < (0 | H[47]) >>> 0)) {
                          H[Fe >> 2] = de, H[de + 24 >> 2] = Re, H[de + 12 >> 2] = de, H[de + 8 >> 2] = de;
                          break
                        }
                        ue()
                      } else if (281 == (0 | R)) {
                        if (he = Le + 8 | 0, J = 0 | H[he >> 2], ie = 0 | H[47], J >>> 0 >= ie >>> 0 & Le >>> 0 >= ie >>> 0) {
                          H[J + 12 >> 2] = de, H[he >> 2] = de, H[de + 8 >> 2] = J, H[de + 12 >> 2] = Le, H[de + 24 >> 2] = 0;
                          break
                        }
                        ue()
                      }
                    } else J = (0 | H[46]) + ee | 0, H[46] = J, H[49] = de, H[de + 4 >> 2] = 1 | J;
                  while (0);
                  return h = q + 8 | 0, 0 | h
                }
                ke = 620
              }
              for (;;) {
                if (de = 0 | H[ke >> 2], se >>> 0 >= de >>> 0 ? (ee = de + (0 | H[ke + 4 >> 2]) | 0, ee >>> 0 > se >>> 0) : 0) {
                  Ne = ee;
                  break
                }
                ke = 0 | H[ke + 8 >> 2]
              }
              q = Ne + -47 | 0, ee = q + 8 | 0, de = q + (0 == (7 & ee | 0) ? 0 : 0 - ee & 7) | 0, ee = se + 16 | 0, q = ee >>> 0 > de >>> 0 ? se : de, de = q + 8 | 0, G = oe + 8 | 0, le = 0 == (7 & G | 0) ? 0 : 0 - G & 7, G = oe + le | 0, J = ae + -40 - le | 0, H[49] = G, H[46] = J, H[G + 4 >> 2] = 1 | J, H[G + J + 4 >> 2] = 40, H[50] = H[165], J = q + 4 | 0, H[J >> 2] = 27, H[de >> 2] = H[155], H[de + 4 >> 2] = H[156], H[de + 8 >> 2] = H[157], H[de + 12 >> 2] = H[158], H[155] = oe, H[156] = ae, H[158] = 0, H[157] = de, de = q + 24 | 0;
              do de = de + 4 | 0, H[de >> 2] = 7; while (Ne >>> 0 > (de + 4 | 0) >>> 0);
              if ((0 | q) != (0 | se)) {
                if (de = q - se | 0, H[J >> 2] = -2 & H[J >> 2], H[se + 4 >> 2] = 1 | de, H[q >> 2] = de, G = de >>> 3, 256 > de >>> 0) {
                  le = 212 + (G << 1 << 2) | 0, he = 0 | H[43], ie = 1 << G, he & ie ? (G = le + 8 | 0, i = 0 | H[G >> 2], i >>> 0 < (0 | H[47]) >>> 0 ? ue() : (Ue = G, je = i)) : (H[43] = he | ie, Ue = le + 8 | 0, je = le), H[Ue >> 2] = se, H[je + 12 >> 2] = se, H[se + 8 >> 2] = je, H[se + 12 >> 2] = le;
                  break
                }
                if (le = de >>> 8, le ? de >>> 0 > 16777215 ? Be = 31 : (ie = (le + 1048320 | 0) >>> 16 & 8, he = le << ie, le = (he + 520192 | 0) >>> 16 & 4, i = he << le, he = (i + 245760 | 0) >>> 16 & 2, G = 14 - (le | ie | he) + (i << he >>> 15) | 0, Be = de >>> (G + 7 | 0) & 1 | G << 1) : Be = 0, G = 476 + (Be << 2) | 0, H[se + 28 >> 2] = Be, H[se + 20 >> 2] = 0, H[ee >> 2] = 0, he = 0 | H[44], i = 1 << Be, !(he & i)) {
                  H[44] = he | i, H[G >> 2] = se, H[se + 24 >> 2] = G, H[se + 12 >> 2] = se, H[se + 8 >> 2] = se;
                  break
                }
                for (i = de << (31 == (0 | Be) ? 0 : 25 - (Be >>> 1) | 0), he = 0 | H[G >> 2];;) {
                  if ((-8 & H[he + 4 >> 2] | 0) == (0 | de)) {
                    ze = he, R = 307;
                    break
                  }
                  if (G = he + 16 + (i >>> 31 << 2) | 0, ie = 0 | H[G >> 2], !ie) {
                    Ke = G, Ge = he, R = 304;
                    break
                  }
                  i <<= 1, he = ie
                }
                if (304 == (0 | R)) {
                  if (!(Ke >>> 0 < (0 | H[47]) >>> 0)) {
                    H[Ke >> 2] = se, H[se + 24 >> 2] = Ge, H[se + 12 >> 2] = se, H[se + 8 >> 2] = se;
                    break
                  }
                  ue()
                } else if (307 == (0 | R)) {
                  if (he = ze + 8 | 0, i = 0 | H[he >> 2], de = 0 | H[47], i >>> 0 >= de >>> 0 & ze >>> 0 >= de >>> 0) {
                    H[i + 12 >> 2] = se, H[he >> 2] = se, H[se + 8 >> 2] = i, H[se + 12 >> 2] = ze, H[se + 24 >> 2] = 0;
                    break
                  }
                  ue()
                }
              }
            } else {
              i = 0 | H[47], 0 == (0 | i) | i >>> 0 > oe >>> 0 && (H[47] = oe), H[155] = oe, H[156] = ae, H[158] = 0, H[52] = H[161], H[51] = -1, i = 0;
              do he = 212 + (i << 1 << 2) | 0, H[he + 12 >> 2] = he, H[he + 8 >> 2] = he, i = i + 1 | 0; while (32 != (0 | i));
              i = oe + 8 | 0, he = 0 == (7 & i | 0) ? 0 : 0 - i & 7, i = oe + he | 0, de = ae + -40 - he | 0, H[49] = i, H[46] = de, H[i + 4 >> 2] = 1 | de, H[i + de + 4 >> 2] = 40, H[50] = H[165]
            }
          while (0);
          if (ae = 0 | H[46], ae >>> 0 > M >>> 0) return oe = ae - M | 0, H[46] = oe, ae = 0 | H[49], se = ae + M | 0, H[49] = se, H[se + 4 >> 2] = 1 | oe, H[ae + 4 >> 2] = 3 | M, h = ae + 8 | 0, 0 | h
        }
        return H[(0 | p()) >> 2] = 12, h = 0, 0 | h
      }

      function O(e) {
        e = 0 | e;
        var t = 0,
          n = 0,
          r = 0,
          i = 0,
          o = 0,
          a = 0,
          s = 0,
          u = 0,
          c = 0,
          f = 0,
          l = 0,
          h = 0,
          d = 0,
          p = 0,
          m = 0,
          g = 0,
          v = 0,
          b = 0,
          w = 0,
          y = 0,
          _ = 0,
          k = 0,
          x = 0,
          S = 0,
          A = 0,
          O = 0,
          P = 0,
          E = 0,
          T = 0,
          C = 0,
          M = 0,
          D = 0,
          I = 0,
          L = 0,
          F = 0,
          R = 0;
        if (e) {
          t = e + -8 | 0, n = 0 | H[47], n >>> 0 > t >>> 0 && ue(), r = 0 | H[e + -4 >> 2], e = 3 & r, 1 == (0 | e) && ue(), i = -8 & r, o = t + i | 0;
          do
            if (1 & r) l = t, h = i;
            else {
              if (a = 0 | H[t >> 2], !e) return;
              if (s = t + (0 - a) | 0, u = a + i | 0, n >>> 0 > s >>> 0 && ue(), (0 | s) == (0 | H[48])) {
                if (c = o + 4 | 0, f = 0 | H[c >> 2], 3 != (3 & f | 0)) {
                  l = s, h = u;
                  break
                }
                return H[45] = u, H[c >> 2] = -2 & f, H[s + 4 >> 2] = 1 | u, void(H[s + u >> 2] = u)
              }
              if (f = a >>> 3, 256 > a >>> 0) {
                if (a = 0 | H[s + 8 >> 2], c = 0 | H[s + 12 >> 2], d = 212 + (f << 1 << 2) | 0, (0 | a) != (0 | d) && (n >>> 0 > a >>> 0 && ue(), (0 | H[a + 12 >> 2]) != (0 | s) && ue()), (0 | c) == (0 | a)) {
                  H[43] = H[43] & ~(1 << f), l = s, h = u;
                  break
                }(0 | c) != (0 | d) ? (n >>> 0 > c >>> 0 && ue(), d = c + 8 | 0, (0 | H[d >> 2]) == (0 | s) ? p = d : ue()) : p = c + 8 | 0, H[a + 12 >> 2] = c, H[p >> 2] = a, l = s, h = u;
                break
              }
              a = 0 | H[s + 24 >> 2], c = 0 | H[s + 12 >> 2];
              do
                if ((0 | c) == (0 | s)) {
                  if (d = s + 16 | 0, f = d + 4 | 0, m = 0 | H[f >> 2]) b = m, w = f;
                  else {
                    if (g = 0 | H[d >> 2], !g) {
                      v = 0;
                      break
                    }
                    b = g, w = d
                  }
                  for (;;)
                    if (f = b + 20 | 0, m = 0 | H[f >> 2]) b = m, w = f;
                    else {
                      if (f = b + 16 | 0, m = 0 | H[f >> 2], !m) {
                        y = b, _ = w;
                        break
                      }
                      b = m, w = f
                    }
                  if (!(n >>> 0 > _ >>> 0)) {
                    H[_ >> 2] = 0, v = y;
                    break
                  }
                  ue()
                } else {
                  if (f = 0 | H[s + 8 >> 2], n >>> 0 > f >>> 0 && ue(), m = f + 12 | 0, (0 | H[m >> 2]) != (0 | s) && ue(), d = c + 8 | 0, (0 | H[d >> 2]) == (0 | s)) {
                    H[m >> 2] = c, H[d >> 2] = f, v = c;
                    break
                  }
                  ue()
                }
              while (0);
              if (a) {
                if (c = 0 | H[s + 28 >> 2], f = 476 + (c << 2) | 0, (0 | s) == (0 | H[f >> 2])) {
                  if (H[f >> 2] = v, !v) {
                    H[44] = H[44] & ~(1 << c), l = s, h = u;
                    break
                  }
                } else if (a >>> 0 < (0 | H[47]) >>> 0 && ue(), c = a + 16 | 0, (0 | H[c >> 2]) == (0 | s) ? H[c >> 2] = v : H[a + 20 >> 2] = v, !v) {
                  l = s, h = u;
                  break
                }
                c = 0 | H[47], c >>> 0 > v >>> 0 && ue(), H[v + 24 >> 2] = a, f = s + 16 | 0, d = 0 | H[f >> 2];
                do
                  if (d) {
                    if (!(c >>> 0 > d >>> 0)) {
                      H[v + 16 >> 2] = d, H[d + 24 >> 2] = v;
                      break
                    }
                    ue()
                  }
                while (0);
                if (d = 0 | H[f + 4 >> 2]) {
                  if (!(d >>> 0 < (0 | H[47]) >>> 0)) {
                    H[v + 20 >> 2] = d, H[d + 24 >> 2] = v, l = s, h = u;
                    break
                  }
                  ue()
                } else l = s, h = u
              } else l = s, h = u
            }
          while (0);
          if (l >>> 0 >= o >>> 0 && ue(), i = o + 4 | 0, t = 0 | H[i >> 2], 1 & t || ue(), 2 & t) H[i >> 2] = -2 & t, H[l + 4 >> 2] = 1 | h, H[l + h >> 2] = h, E = h;
          else {
            if ((0 | o) == (0 | H[49])) {
              if (v = (0 | H[46]) + h | 0, H[46] = v, H[49] = l, H[l + 4 >> 2] = 1 | v, (0 | l) != (0 | H[48])) return;
              return H[48] = 0, void(H[45] = 0)
            }
            if ((0 | o) == (0 | H[48])) return v = (0 | H[45]) + h | 0, H[45] = v, H[48] = l, H[l + 4 >> 2] = 1 | v, void(H[l + v >> 2] = v);
            v = (-8 & t) + h | 0, n = t >>> 3;
            do
              if (t >>> 0 >= 256) {
                y = 0 | H[o + 24 >> 2], _ = 0 | H[o + 12 >> 2];
                do
                  if ((0 | _) == (0 | o)) {
                    if (w = o + 16 | 0, b = w + 4 | 0, p = 0 | H[b >> 2]) x = p, S = b;
                    else {
                      if (e = 0 | H[w >> 2], !e) {
                        k = 0;
                        break
                      }
                      x = e, S = w
                    }
                    for (;;)
                      if (b = x + 20 | 0, p = 0 | H[b >> 2]) x = p, S = b;
                      else {
                        if (b = x + 16 | 0, p = 0 | H[b >> 2], !p) {
                          A = x, O = S;
                          break
                        }
                        x = p, S = b
                      }
                    if (!(O >>> 0 < (0 | H[47]) >>> 0)) {
                      H[O >> 2] = 0, k = A;
                      break
                    }
                    ue()
                  } else {
                    if (b = 0 | H[o + 8 >> 2], b >>> 0 < (0 | H[47]) >>> 0 && ue(), p = b + 12 | 0, (0 | H[p >> 2]) != (0 | o) && ue(), w = _ + 8 | 0, (0 | H[w >> 2]) == (0 | o)) {
                      H[p >> 2] = _, H[w >> 2] = b, k = _;
                      break
                    }
                    ue()
                  }
                while (0);
                if (y) {
                  if (_ = 0 | H[o + 28 >> 2], u = 476 + (_ << 2) | 0, (0 | o) == (0 | H[u >> 2])) {
                    if (H[u >> 2] = k, !k) {
                      H[44] = H[44] & ~(1 << _);
                      break
                    }
                  } else if (y >>> 0 < (0 | H[47]) >>> 0 && ue(), _ = y + 16 | 0, (0 | H[_ >> 2]) == (0 | o) ? H[_ >> 2] = k : H[y + 20 >> 2] = k, !k) break;
                  _ = 0 | H[47], _ >>> 0 > k >>> 0 && ue(), H[k + 24 >> 2] = y, u = o + 16 | 0, s = 0 | H[u >> 2];
                  do
                    if (s) {
                      if (!(_ >>> 0 > s >>> 0)) {
                        H[k + 16 >> 2] = s, H[s + 24 >> 2] = k;
                        break
                      }
                      ue()
                    }
                  while (0);
                  if (s = 0 | H[u + 4 >> 2]) {
                    if (!(s >>> 0 < (0 | H[47]) >>> 0)) {
                      H[k + 20 >> 2] = s, H[s + 24 >> 2] = k;
                      break
                    }
                    ue()
                  }
                }
              } else {
                if (s = 0 | H[o + 8 >> 2], _ = 0 | H[o + 12 >> 2], y = 212 + (n << 1 << 2) | 0, (0 | s) != (0 | y) && (s >>> 0 < (0 | H[47]) >>> 0 && ue(), (0 | H[s + 12 >> 2]) != (0 | o) && ue()), (0 | _) == (0 | s)) {
                  H[43] = H[43] & ~(1 << n);
                  break
                }(0 | _) != (0 | y) ? (_ >>> 0 < (0 | H[47]) >>> 0 && ue(), y = _ + 8 | 0, (0 | H[y >> 2]) == (0 | o) ? P = y : ue()) : P = _ + 8 | 0, H[s + 12 >> 2] = _, H[P >> 2] = s
              }
            while (0);
            if (H[l + 4 >> 2] = 1 | v, H[l + v >> 2] = v, (0 | l) == (0 | H[48])) return void(H[45] = v);
            E = v
          }
          if (h = E >>> 3, 256 > E >>> 0) return t = 212 + (h << 1 << 2) | 0, i = 0 | H[43], v = 1 << h, i & v ? (h = t + 8 | 0, P = 0 | H[h >> 2], P >>> 0 < (0 | H[47]) >>> 0 ? ue() : (T = h, C = P)) : (H[43] = i | v, T = t + 8 | 0, C = t), H[T >> 2] = l, H[C + 12 >> 2] = l, H[l + 8 >> 2] = C, void(H[l + 12 >> 2] = t);
          t = E >>> 8, t ? E >>> 0 > 16777215 ? M = 31 : (C = (t + 1048320 | 0) >>> 16 & 8, T = t << C, t = (T + 520192 | 0) >>> 16 & 4, v = T << t, T = (v + 245760 | 0) >>> 16 & 2, i = 14 - (t | C | T) + (v << T >>> 15) | 0, M = E >>> (i + 7 | 0) & 1 | i << 1) : M = 0, i = 476 + (M << 2) | 0, H[l + 28 >> 2] = M, H[l + 20 >> 2] = 0, H[l + 16 >> 2] = 0, T = 0 | H[44], v = 1 << M;
          do
            if (T & v) {
              for (C = E << (31 == (0 | M) ? 0 : 25 - (M >>> 1) | 0), t = 0 | H[i >> 2];;) {
                if ((-8 & H[t + 4 >> 2] | 0) == (0 | E)) {
                  D = t, I = 130;
                  break
                }
                if (P = t + 16 + (C >>> 31 << 2) | 0, h = 0 | H[P >> 2], !h) {
                  L = P, F = t, I = 127;
                  break
                }
                C <<= 1, t = h
              }
              if (127 == (0 | I)) {
                if (!(L >>> 0 < (0 | H[47]) >>> 0)) {
                  H[L >> 2] = l, H[l + 24 >> 2] = F, H[l + 12 >> 2] = l, H[l + 8 >> 2] = l;
                  break
                }
                ue()
              } else if (130 == (0 | I)) {
                if (t = D + 8 | 0, C = 0 | H[t >> 2], u = 0 | H[47], C >>> 0 >= u >>> 0 & D >>> 0 >= u >>> 0) {
                  H[C + 12 >> 2] = l, H[t >> 2] = l, H[l + 8 >> 2] = C, H[l + 12 >> 2] = D, H[l + 24 >> 2] = 0;
                  break
                }
                ue()
              }
            } else H[44] = T | v, H[i >> 2] = l, H[l + 24 >> 2] = i, H[l + 12 >> 2] = l, H[l + 8 >> 2] = l;
          while (0);
          if (l = (0 | H[51]) + -1 | 0, H[51] = l, !l) {
            for (R = 628;;) {
              if (l = 0 | H[R >> 2], !l) break;
              R = l + 8 | 0
            }
            H[51] = -1
          }
        }
      }

      function P() {}

      function E(e, t, n) {
        return e = 0 | e, t = 0 | t, n = 0 | n, 32 > (0 | n) ? (ee = t >> n, e >>> n | (t & (1 << n) - 1) << 32 - n) : (ee = 0 > (0 | t) ? -1 : 0, t >> n - 32 | 0)
      }

      function T(e, t, n, r) {
        e = 0 | e, t = 0 | t, n = 0 | n, r = 0 | r;
        var i = 0;
        return i = t - r >>> 0, i = t - r - (n >>> 0 > e >>> 0 | 0) >>> 0, 0 | (ee = i, e - n >>> 0 | 0)
      }

      function C(e, t, n, r) {
        e = 0 | e, t = 0 | t, n = 0 | n, r = 0 | r;
        var i = 0;
        return i = e + n >>> 0, 0 | (ee = t + r + (e >>> 0 > i >>> 0 | 0) >>> 0, 0 | i)
      }

      function M(e, t, n) {
        e = 0 | e, t = 0 | t, n = 0 | n;
        var r = 0,
          i = 0,
          o = 0,
          a = 0;
        if (r = e + n | 0, (0 | n) >= 20) {
          if (t = 255 & t, i = 3 & e, o = t | t << 8 | t << 16 | t << 24, a = -4 & r, i)
            for (i = e + 4 - i | 0;
              (0 | i) > (0 | e);) V[e >> 0] = t, e = e + 1 | 0;
          for (;
            (0 | a) > (0 | e);) H[e >> 2] = o, e = e + 4 | 0
        }
        for (;
          (0 | r) > (0 | e);) V[e >> 0] = t, e = e + 1 | 0;
        return e - n | 0
      }

      function D(e, t, n) {
        return e = 0 | e, t = 0 | t, n = 0 | n, 32 > (0 | n) ? (ee = t >>> n, e >>> n | (t & (1 << n) - 1) << 32 - n) : (ee = 0, t >>> n - 32 | 0)
      }

      function I(e, t, n) {
        return e = 0 | e, t = 0 | t, n = 0 | n, 32 > (0 | n) ? (ee = t << n | (e & (1 << n) - 1 << 32 - n) >>> 32 - n, e << n) : (ee = e << n - 32, 0)
      }

      function L(e, t, n) {
        e = 0 | e, t = 0 | t, n = 0 | n;
        var r = 0;
        if ((0 | n) >= 4096) return 0 | le(0 | e, 0 | t, 0 | n);
        if (r = 0 | e, (3 & e) == (3 & t)) {
          for (; 3 & e;) {
            if (!n) return 0 | r;
            V[e >> 0] = 0 | V[t >> 0], e = e + 1 | 0, t = t + 1 | 0, n = n - 1 | 0
          }
          for (;
            (0 | n) >= 4;) H[e >> 2] = H[t >> 2], e = e + 4 | 0, t = t + 4 | 0, n = n - 4 | 0
        }
        for (;
          (0 | n) > 0;) V[e >> 0] = 0 | V[t >> 0], e = e + 1 | 0, t = t + 1 | 0, n = n - 1 | 0;
        return 0 | r
      }

      function F(e) {
        e = 0 | e;
        var t = 0;
        return t = 0 | V[J + (255 & e) >> 0], 8 > (0 | t) ? 0 | t : (t = 0 | V[J + (e >> 8 & 255) >> 0], 8 > (0 | t) ? t + 8 | 0 : (t = 0 | V[J + (e >> 16 & 255) >> 0], 8 > (0 | t) ? t + 16 | 0 : (0 | V[J + (e >>> 24) >> 0]) + 24 | 0))
      }

      function R(e, t) {
        e = 0 | e, t = 0 | t;
        var n = 0,
          r = 0,
          i = 0,
          o = 0;
        return n = 65535 & e, r = 65535 & t, i = 0 | te(r, n), o = e >>> 16, e = (i >>> 16) + (0 | te(r, o)) | 0, r = t >>> 16, t = 0 | te(r, n), 0 | (ee = (e >>> 16) + (0 | te(r, o)) + (((65535 & e) + t | 0) >>> 16) | 0, e + t << 16 | 65535 & i | 0)
      }

      function N(e, t, n, r) {
        e = 0 | e, t = 0 | t, n = 0 | n, r = 0 | r;
        var i = 0,
          o = 0;
        return i = e, e = n, n = 0 | R(i, e), o = ee, 0 | (ee = (0 | te(t, e)) + (0 | te(r, i)) + o | 0 & o, 0 | n | 0)
      }

      function U(e, t, n, r, i) {
        e = 0 | e, t = 0 | t, n = 0 | n, r = 0 | r, i = 0 | i;
        var o = 0,
          a = 0,
          s = 0,
          u = 0,
          c = 0,
          f = 0,
          l = 0,
          h = 0,
          d = 0,
          p = 0,
          m = 0,
          g = 0,
          v = 0,
          b = 0,
          w = 0,
          y = 0,
          _ = 0,
          k = 0,
          x = 0,
          S = 0,
          A = 0,
          O = 0,
          P = 0,
          E = 0,
          M = 0,
          D = 0,
          I = 0;
        if (o = e, a = t, s = a, u = n, c = r, f = c, !s) return l = 0 != (0 | i), f ? l ? (H[i >> 2] = 0 | e, H[i + 4 >> 2] = 0 & t, h = 0, d = 0, 0 | (ee = h, d)) : (h = 0, d = 0, 0 | (ee = h, d)) : (l && (H[i >> 2] = (o >>> 0) % (u >>> 0), H[i + 4 >> 2] = 0), h = 0, d = (o >>> 0) / (u >>> 0) >>> 0, 0 | (ee = h, d));
        l = 0 == (0 | f);
        do {
          if (u) {
            if (!l) {
              if (p = (0 | ne(0 | f)) - (0 | ne(0 | s)) | 0, 31 >= p >>> 0) {
                m = p + 1 | 0, g = 31 - p | 0, v = p - 31 >> 31, b = m, w = o >>> (m >>> 0) & v | s << g, y = s >>> (m >>> 0) & v, _ = 0, k = o << g;
                break
              }
              return i ? (H[i >> 2] = 0 | e, H[i + 4 >> 2] = a | 0 & t, h = 0, d = 0, 0 | (ee = h, d)) : (h = 0, d = 0, 0 | (ee = h, d))
            }
            if (g = u - 1 | 0, g & u) {
              v = (0 | ne(0 | u)) + 33 - (0 | ne(0 | s)) | 0, m = 64 - v | 0, p = 32 - v | 0, x = p >> 31, S = v - 32 | 0, A = S >> 31, b = v, w = p - 1 >> 31 & s >>> (S >>> 0) | (s << p | o >>> (v >>> 0)) & A, y = A & s >>> (v >>> 0), _ = o << m & x, k = (s << m | o >>> (S >>> 0)) & x | o << p & v - 33 >> 31;
              break
            }
            return i && (H[i >> 2] = g & o, H[i + 4 >> 2] = 0), 1 == (0 | u) ? (h = a | 0 & t, d = 0 | e | 0, 0 | (ee = h, d)) : (g = 0 | F(0 | u), h = s >>> (g >>> 0) | 0, d = s << 32 - g | o >>> (g >>> 0) | 0, 0 | (ee = h, d))
          }
          if (l) return i && (H[i >> 2] = (s >>> 0) % (u >>> 0), H[i + 4 >> 2] = 0), h = 0, d = (s >>> 0) / (u >>> 0) >>> 0, 0 | (ee = h, d);
          if (!o) return i && (H[i >> 2] = 0, H[i + 4 >> 2] = (s >>> 0) % (f >>> 0)), h = 0, d = (s >>> 0) / (f >>> 0) >>> 0, 0 | (ee = h, d);
          if (g = f - 1 | 0, !(g & f)) return i && (H[i >> 2] = 0 | e, H[i + 4 >> 2] = g & s | 0 & t), h = 0, d = s >>> ((0 | F(0 | f)) >>> 0), 0 | (ee = h, d);
          if (g = (0 | ne(0 | f)) - (0 | ne(0 | s)) | 0, 30 >= g >>> 0) {
            v = g + 1 | 0, p = 31 - g | 0, b = v, w = s << p | o >>> (v >>> 0), y = s >>> (v >>> 0), _ = 0, k = o << p;
            break
          }
          return i ? (H[i >> 2] = 0 | e, H[i + 4 >> 2] = a | 0 & t, h = 0, d = 0, 0 | (ee = h, d)) : (h = 0, d = 0, 0 | (ee = h, d))
        } while (0);
        if (b) {
          t = 0 | n | 0, n = c | 0 & r, r = 0 | C(0 | t, 0 | n, -1, -1), c = ee, a = k, k = _, _ = y, y = w, w = b, b = 0;
          do e = a, a = k >>> 31 | a << 1, k = b | k << 1, o = y << 1 | e >>> 31 | 0, e = y >>> 31 | _ << 1 | 0, 0 | T(r, c, o, e), s = ee, f = s >> 31 | (0 > (0 | s) ? -1 : 0) << 1, b = 1 & f, y = 0 | T(o, e, f & t, ((0 > (0 | s) ? -1 : 0) >> 31 | (0 > (0 | s) ? -1 : 0) << 1) & n), _ = ee, w = w - 1 | 0; while (0 != (0 | w));
          O = a, P = k, E = _, M = y, D = 0, I = b
        } else O = k, P = _, E = y, M = w, D = 0, I = 0;
        return b = P, P = 0, i && (H[i >> 2] = M, H[i + 4 >> 2] = E), h = (0 | b) >>> 31 | (O | P) << 1 | 0 & (P << 1 | b >>> 31) | D, d = -2 & (b << 1 | 0) | I, 0 | (ee = h, d)
      }

      function j(e, t) {
        return e = 0 | e, t = 0 | t, 0 | be[1 & e](0 | t)
      }

      function B(e, t, n, r) {
        return e = 0 | e, t = 0 | t, n = 0 | n, r = 0 | r, 0 | we[3 & e](0 | t, 0 | n, 0 | r)
      }

      function z(e, t) {
        e = 0 | e, t = 0 | t, ye[1 & e](0 | t)
      }

      function K(e) {
        return e = 0 | e, re(0), 0
      }

      function G(e, t, n) {
        return e = 0 | e, t = 0 | t, n = 0 | n, re(1), 0
      }

      function q(e) {
        e = 0 | e, re(2)
      }
      var V = new e.Int8Array(n),
        H = (new e.Int16Array(n), new e.Int32Array(n)),
        W = new e.Uint8Array(n),
        Y = (new e.Uint16Array(n), new e.Uint32Array(n), new e.Float32Array(n), new e.Float64Array(n), 0 | t.STACKTOP),
        Z = 0 | t.STACK_MAX,
        X = 0 | t.tempDoublePtr,
        J = (0 | t.ABORT, 0 | t.cttz_i8),
        Q = 0,
        $ = 0,
        ee = (e.NaN, e.Infinity, 0),
        te = (e.Math.floor, e.Math.abs, e.Math.sqrt, e.Math.pow, e.Math.cos, e.Math.sin, e.Math.tan, e.Math.acos, e.Math.asin, e.Math.atan, e.Math.atan2, e.Math.exp, e.Math.log, e.Math.ceil, e.Math.imul),
        ne = (e.Math.min, e.Math.clz32),
        re = t.abort,
        ie = (t.assert, t.invoke_ii, t.invoke_iiii, t.invoke_vi, t._pthread_cleanup_pop),
        oe = t.___lock,
        ae = (t._emscripten_set_main_loop, t._pthread_self),
        se = t.___syscall6,
        ue = (t._emscripten_set_main_loop_timing, t._abort),
        ce = t._sbrk,
        fe = t._time,
        le = (t.___setErrNo, t._emscripten_memcpy_big),
        he = t.___syscall54,
        de = t.___unlock,
        pe = t.___syscall140,
        me = t._pthread_cleanup_push,
        ge = t._sysconf,
        ve = t.___syscall146,
        be = [K, b],
        we = [G, _, w, y],
        ye = [q, x];
      return {
        _curve25519_donna: f,
        _free: O,
        _i64Add: C,
        _bitshift64Ashr: E,
        _i64Subtract: T,
        _memset: M,
        _malloc: A,
        _memcpy: L,
        _bitshift64Lshr: D,
        _fflush: k,
        ___errno_location: p,
        _bitshift64Shl: I,
        runPostSets: P,
        stackAlloc: r,
        stackSave: i,
        stackRestore: o,
        establishStackSpace: a,
        setThrew: s,
        setTempRet0: u,
        getTempRet0: c,
        dynCall_ii: j,
        dynCall_iiii: B,
        dynCall_vi: z
      }
    }(e.Na, e.Oa, buffer);
    e._curve25519_donna = Z._curve25519_donna;
    var Da = e._free = Z._free;
    e.runPostSets = Z.runPostSets;
    var cb = e._i64Add = Z._i64Add,
      ab = e._bitshift64Ashr = Z._bitshift64Ashr,
      bb = e._i64Subtract = Z._i64Subtract,
      db = e._memset = Z._memset,
      ua = e._malloc = Z._malloc,
      gc = e._memcpy = Z._memcpy,
      fb = e._bitshift64Lshr = Z._bitshift64Lshr;
    e._fflush = Z._fflush, e.___errno_location = Z.___errno_location;
    var gb = e._bitshift64Shl = Z._bitshift64Shl;
    e.dynCall_ii = Z.dynCall_ii, e.dynCall_iiii = Z.dynCall_iiii, e.dynCall_vi = Z.dynCall_vi, n.W = Z.stackAlloc, n.na = Z.stackSave, n.X = Z.stackRestore, n.md = Z.establishStackSpace, n.cb = Z.setTempRet0, n.Ua = Z.getTempRet0, xc.prototype = Error(),
      xc.prototype.constructor = xc;
    var Yc = null,
      Xa = function t() {
        e.calledRun || $c(), e.calledRun || (Xa = t)
      };
    e.callMain = e.jd = function(t) {
      function n() {
        for (var e = 0; 3 > e; e++) i.push(0)
      }
      assert(0 == L, "cannot call main when async dependencies remain! (listen on __ATMAIN__)"), assert(0 == Pa.length, "cannot call main when preRun functions remain to be called"), t = t || [], xa || (xa = !0, Oa(Qa));
      var r = t.length + 1,
        i = [G(Va(e.thisProgram), "i8", 0)];
      n();
      for (var o = 0; r - 1 > o; o += 1) i.push(G(Va(t[o]), "i8", 0)), n();
      i.push(0), i = G(i, "i32", 0);
      try {
        var a = e._main(r, i, 0);
        ad(a, !0)
      } catch (s) {
        if (!(s instanceof xc)) {
          if ("SimulateInfiniteLoop" != s) throw s && "object" == typeof s && s.stack && e.S("exception thrown: " + [s, s.stack]), s;
          e.noExitRuntime = !0
        }
      } finally {}
    }, e.run = e.run = $c, e.exit = e.exit = ad;
    var cd = [];
    if (e.abort = e.abort = z, e.preInit)
      for ("function" == typeof e.preInit && (e.preInit = [e.preInit]); 0 < e.preInit.length;) e.preInit.pop()();
    var bd = !0;
    e.noInitialRun && (bd = !1), $c(), module.exports = e
  },
  709: function(e, t, n) {
    "use strict";

    function r(e) {
      return e && e.__esModule ? e : {
        "default": e
      }
    }
    t.__esModule = !0;
    var i = n(187),
      o = r(i);
    t["default"] = function(e, t, n) {
      return t in e ? (0, o["default"])(e, t, {
        value: n,
        enumerable: !0,
        configurable: !0,
        writable: !0
      }) : e[t] = n, e
    }
  },
  710: function(e, t, n) {
    "use strict";

    function r(e) {
      return e && e.__esModule ? e : {
        "default": e
      }
    }
    t.__esModule = !0;
    var i = n(713),
      o = r(i);
    t["default"] = function(e) {
      if (Array.isArray(e)) {
        for (var t = 0, n = Array(e.length); t < e.length; t++) n[t] = e[t];
        return n
      }
      return (0, o["default"])(e)
    }
  },
  711: function(e, t, n) {
    var r;
    (function(e, i) {
      ! function(o) {
        function a(e) {
          throw RangeError(D[e])
        }

        function s(e, t) {
          for (var n = e.length, r = []; n--;) r[n] = t(e[n]);
          return r
        }

        function u(e, t) {
          var n = e.split("@"),
            r = "";
          n.length > 1 && (r = n[0] + "@", e = n[1]), e = e.replace(M, ".");
          var i = e.split("."),
            o = s(i, t).join(".");
          return r + o
        }

        function c(e) {
          for (var t, n, r = [], i = 0, o = e.length; o > i;) t = e.charCodeAt(i++), t >= 55296 && 56319 >= t && o > i ? (n = e.charCodeAt(i++), 56320 == (64512 & n) ? r.push(((1023 & t) << 10) + (1023 & n) + 65536) : (r.push(t), i--)) : r.push(t);
          return r
        }

        function f(e) {
          return s(e, function(e) {
            var t = "";
            return e > 65535 && (e -= 65536, t += F(e >>> 10 & 1023 | 55296), e = 56320 | 1023 & e), t += F(e)
          }).join("")
        }

        function l(e) {
          return 10 > e - 48 ? e - 22 : 26 > e - 65 ? e - 65 : 26 > e - 97 ? e - 97 : _
        }

        function h(e, t) {
          return e + 22 + 75 * (26 > e) - ((0 != t) << 5)
        }

        function d(e, t, n) {
          var r = 0;
          for (e = n ? L(e / A) : e >> 1, e += L(e / t); e > I * x >> 1; r += _) e = L(e / I);
          return L(r + (I + 1) * e / (e + S))
        }

        function p(e) {
          var t, n, r, i, o, s, u, c, h, p, m = [],
            g = e.length,
            v = 0,
            b = P,
            w = O;
          for (n = e.lastIndexOf(E), 0 > n && (n = 0), r = 0; n > r; ++r) e.charCodeAt(r) >= 128 && a("not-basic"), m.push(e.charCodeAt(r));
          for (i = n > 0 ? n + 1 : 0; g > i;) {
            for (o = v, s = 1, u = _; i >= g && a("invalid-input"), c = l(e.charCodeAt(i++)), (c >= _ || c > L((y - v) / s)) && a("overflow"), v += c * s, h = w >= u ? k : u >= w + x ? x : u - w, !(h > c); u += _) p = _ - h, s > L(y / p) && a("overflow"), s *= p;
            t = m.length + 1, w = d(v - o, t, 0 == o), L(v / t) > y - b && a("overflow"), b += L(v / t), v %= t, m.splice(v++, 0, b)
          }
          return f(m)
        }

        function m(e) {
          var t, n, r, i, o, s, u, f, l, p, m, g, v, b, w, S = [];
          for (e = c(e), g = e.length, t = P, n = 0, o = O, s = 0; g > s; ++s) m = e[s], 128 > m && S.push(F(m));
          for (r = i = S.length, i && S.push(E); g > r;) {
            for (u = y, s = 0; g > s; ++s) m = e[s], m >= t && u > m && (u = m);
            for (v = r + 1, u - t > L((y - n) / v) && a("overflow"), n += (u - t) * v, t = u, s = 0; g > s; ++s)
              if (m = e[s], t > m && ++n > y && a("overflow"), m == t) {
                for (f = n, l = _; p = o >= l ? k : l >= o + x ? x : l - o, !(p > f); l += _) w = f - p, b = _ - p, S.push(F(h(p + w % b, 0))), f = L(w / b);
                S.push(F(h(f, 0))), o = d(n, v, r == i), n = 0, ++r
              }++n, ++t
          }
          return S.join("")
        }

        function g(e) {
          return u(e, function(e) {
            return T.test(e) ? p(e.slice(4).toLowerCase()) : e
          })
        }

        function v(e) {
          return u(e, function(e) {
            return C.test(e) ? "xn--" + m(e) : e
          })
        }
        var b = ("object" == typeof t && t && !t.nodeType && t, "object" == typeof e && e && !e.nodeType && e, "object" == typeof i && i);
        b.global !== b && b.window !== b && b.self !== b || (o = b);
        var w, y = 2147483647,
          _ = 36,
          k = 1,
          x = 26,
          S = 38,
          A = 700,
          O = 72,
          P = 128,
          E = "-",
          T = /^xn--/,
          C = /[^\x20-\x7E]/,
          M = /[\x2E\u3002\uFF0E\uFF61]/g,
          D = {
            overflow: "Overflow: input needs wider integers to process",
            "not-basic": "Illegal input >= 0x80 (not a basic code point)",
            "invalid-input": "Invalid input"
          },
          I = _ - k,
          L = Math.floor,
          F = String.fromCharCode;
        w = {
          version: "1.3.2",
          ucs2: {
            decode: c,
            encode: f
          },
          decode: p,
          encode: m,
          toASCII: v,
          toUnicode: g
        }, r = function() {
          return w
        }.call(t, n, t, e), !(void 0 !== r && (e.exports = r))
      }(this)
    }).call(t, n(60)(e), function() {
      return this
    }())
  },
  716: function(e, t, n) {
    "use strict";

    function r(e) {
      return e && e.__esModule ? e : {
        "default": e
      }
    }
    t.__esModule = !0;
    var i = n(715),
      o = r(i),
      a = n(714),
      s = r(a);
    t["default"] = function() {
      function e(e, t) {
        var n = [],
          r = !0,
          i = !1,
          o = void 0;
        try {
          for (var a, u = (0, s["default"])(e); !(r = (a = u.next()).done) && (n.push(a.value), !t || n.length !== t); r = !0);
        } catch (c) {
          i = !0, o = c
        } finally {
          try {
            !r && u["return"] && u["return"]()
          } finally {
            if (i) throw o
          }
        }
        return n
      }
      return function(t, n) {
        if (Array.isArray(t)) return t;
        if ((0, o["default"])(Object(t))) return e(t, n);
        throw new TypeError("Invalid attempt to destructure non-iterable instance")
      }
    }()
  },
  719: function(e, t, n) {
    function r(e, t, n) {
      "function" == typeof t && (n = t, t = {});
      var r = a(e),
        l = {};
      try {
        l = o(r.buffer)
      } catch (h) {}
      var d = l.Orientation && "number" == typeof l.Orientation.value && (6 == l.Orientation.value || 8 == l.Orientation.value);
      if (!d) return void i.nextTick(function() {
        n(e, t.image && c(e))
      });
      var p = f[r.type](r),
        m = Math.max(p.width, p.height),
        g = m / 2,
        v = {
          6: 1,
          8: -1
        }[l.Orientation.value],
        b = document.createElement("canvas"),
        w = b.getContext("2d");
      b.width = b.height = m, s(w, {
        x: g,
        y: g,
        degrees: 90 * v
      }), c(e, function(e) {
        1 == v ? w.drawImage(e, 0, m - p.height) : w.drawImage(e, m - p.width, 0), s(w, {
          x: g,
          y: g,
          degrees: -1 * v * 90
        }), u(b, {
          width: p.height,
          height: p.width
        });
        var i = "image/png" == r.type ? b.toDataURL() : b.toDataURL("image/jpeg", 1);
        n(i, t.image && c(i))
      })
    }
    var i = n(565),
      o = n(466),
      a = n(462),
      s = n(625),
      u = n(494),
      c = n(495),
      f = {
        "image/png": n(564),
        "image/jpeg": n(496)
      };
    e.exports = r
  }
});