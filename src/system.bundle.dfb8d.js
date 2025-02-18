!function () {
    "use strict";

    function e(e, t) {
        return (t || "") + " (SystemJS https://git.io/JvFET#" + e + ")"
    }

    var t, n = "undefined" != typeof Symbol, r = "undefined" != typeof self, i = "undefined" != typeof document,
        o = r ? self : global;
    if (i) {
        var u = document.querySelector("base[href]");
        u && (t = u.href)
    }
    if (!t && "undefined" != typeof location) {
        var l = (t = location.href.split("#")[0].split("?")[0]).lastIndexOf("/");
        -1 !== l && (t = t.slice(0, l + 1))
    }
    if (!t && "undefined" != typeof process) {
        var s = process.cwd();
        t = "file://" + ("/" === s[0] ? "" : "/") + s.replace(/\\/g, "/") + "/"
    }
    var c = /\\/g;

    function f(e, t) {
        if (-1 !== e.indexOf("\\") && (e = e.replace(c, "/")), "/" === e[0] && "/" === e[1]) return t.slice(0, t.indexOf(":") + 1) + e;
        if ("." === e[0] && ("/" === e[1] || "." === e[1] && ("/" === e[2] || 2 === e.length && (e += "/")) || 1 === e.length && (e += "/")) || "/" === e[0]) {
            var n, r = t.slice(0, t.indexOf(":") + 1);
            if (n = "/" === t[r.length + 1] ? "file:" !== r ? (n = t.slice(r.length + 2)).slice(n.indexOf("/") + 1) : t.slice(8) : t.slice(r.length + ("/" === t[r.length])), "/" === e[0]) return t.slice(0, t.length - n.length - 1) + e;
            for (var i = n.slice(0, n.lastIndexOf("/") + 1) + e, o = [], u = -1, l = 0; l < i.length; l++) -1 !== u ? "/" === i[l] && (o.push(i.slice(u, l + 1)), u = -1) : "." === i[l] ? "." !== i[l + 1] || "/" !== i[l + 2] && l + 2 !== i.length ? "/" === i[l + 1] || l + 1 === i.length ? l += 1 : u = l : (o.pop(), l += 2) : u = l;
            return -1 !== u && o.push(i.slice(u)), t.slice(0, t.length - n.length) + o.join("")
        }
    }

    function a(e, t) {
        return f(e, t) || (-1 !== e.indexOf(":") ? e : f("./" + e, t))
    }

    function h(e, t, n, r, i) {
        for (var o in e) {
            var u = f(o, n) || o, l = e[o];
            if ("string" == typeof l) {
                var s = g(r, f(l, n) || l, i);
                s ? t[u] = s : d("W1", o, l)
            }
        }
    }

    function v(e, t) {
        if (t[e]) return e;
        var n = e.length;
        do {
            var r = e.slice(0, n + 1);
            if (r in t) return r
        } while (-1 !== (n = e.lastIndexOf("/", n - 1)))
    }

    function p(e, t) {
        var n = v(e, t);
        if (n) {
            var r = t[n];
            if (null === r) return;
            if (!(e.length > n.length && "/" !== r[r.length - 1])) return r + e.slice(n.length);
            d("W2", n, r)
        }
    }

    function d(t, n, r, i) {
        console.warn(e(t, [r, n].join(", ")))
    }

    function g(e, t, n) {
        for (var r = e.scopes, i = n && v(n, r); i;) {
            var o = p(t, r[i]);
            if (o) return o;
            i = v(i.slice(0, i.lastIndexOf("/")), r)
        }
        return p(t, e.imports) || -1 !== t.indexOf(":") && t
    }

    var m = n && Symbol.toStringTag, y = n ? Symbol() : "@";

    function b() {
        this[y] = {}
    }

    var O, w = b.prototype;

    function E(t, n, r) {
        var i = t[y][n];
        if (i) return i;
        var o = [], u = Object.create(null);
        m && Object.defineProperty(u, m, {value: "Module"});
        var l = Promise.resolve().then((function () {
            return t.instantiate(n, r)
        })).then((function (r) {
            if (!r) throw Error(e(2, n));
            var l = r[1]((function (e, t) {
                i.h = !0;
                var n = !1;
                if ("string" == typeof e) e in u && u[e] === t || (u[e] = t, n = !0); else {
                    for (var r in e) {
                        t = e[r];
                        r in u && u[r] === t || (u[r] = t, n = !0)
                    }
                    e.__esModule && (u.__esModule = e.__esModule)
                }
                if (n) for (var l = 0; l < o.length; l++) {
                    var s = o[l];
                    s && s(u)
                }
                return t
            }), 2 === r[1].length ? {
                import: function (e) {
                    return t.import(e, n)
                }, meta: t.createContext(n)
            } : void 0);
            return i.e = l.execute || function () {
            }, [r[0], l.setters || []]
        }), (function (e) {
            throw i.e = null, i.er = e, e
        })), s = l.then((function (e) {
            return Promise.all(e[0].map((function (r, i) {
                var o = e[1][i];
                return Promise.resolve(t.resolve(r, n)).then((function (e) {
                    var r = E(t, e, n);
                    return Promise.resolve(r.I).then((function () {
                        return o && (r.i.push(o), !r.h && r.I || o(r.n)), r
                    }))
                }))
            }))).then((function (e) {
                i.d = e
            }))
        }));
        return s.catch((function () {
        })), i = t[y][n] = {
            id: n,
            i: o,
            n: u,
            I: l,
            L: s,
            h: !1,
            d: void 0,
            e: void 0,
            er: void 0,
            E: void 0,
            C: void 0,
            p: void 0
        }
    }

    function P(e, t, n, r) {
        if (!r[t.id]) return r[t.id] = !0, Promise.resolve(t.L).then((function () {
            return t.p && null !== t.p.e || (t.p = n), Promise.all(t.d.map((function (t) {
                return P(e, t, n, r)
            })))
        })).catch((function (e) {
            if (t.er) throw e;
            throw t.e = null, e
        }))
    }

    w.import = function (e, t) {
        var n = this;
        return Promise.resolve(n.prepareImport()).then((function () {
            return n.resolve(e, t)
        })).then((function (e) {
            var t = E(n, e);
            return t.C || function (e, t) {
                return t.C = P(e, t, t, {}).then((function () {
                    return j(e, t, {})
                })).then((function () {
                    return t.n
                }))
            }(n, t)
        }))
    }, w.createContext = function (e) {
        var t = this;
        return {
            url: e, resolve: function (n, r) {
                return Promise.resolve(t.resolve(n, r || e))
            }
        }
    }, w.register = function (e, t) {
        O = [e, t]
    }, w.getRegister = function () {
        var e = O;
        return O = void 0, e
    };
    var S = Object.freeze(Object.create(null)), x = Promise.prototype.finally || function (e) {
        if ("function" != typeof e) return this.then(e, e);
        const t = this.constructor || Promise;
        return this.then((n => t.resolve(e()).then((() => n))), (n => t.resolve(e()).then((() => {
            throw n
        }))))
    };

    function j(e, t, n) {
        if (n[t.id]) return t.E;
        if (n[t.id] = !0, !t.e) {
            if (t.er) throw t.er;
            return t.E ? t.E : void 0
        }
        const r = t.e;
        var i;
        if (t.e = null, t.d.forEach((function (r) {
            try {
                var o = j(e, r, n);
                o && (i = i || []).push(o)
            } catch (e) {
                throw t.er = e, e
            }
        })), i) return t.E = x.call(Promise.all(i).then(u), (function () {
            t.E = null
        }));
        var o = u();
        if (o) return t.E = x.call(o, (function () {
            t.E = null
        }));

        function u() {
            try {
                var e = r.call(S);
                if (e) return e = e.then((function () {
                    t.C = t.n
                }), (function (e) {
                    throw t.er = e, e
                }));
                t.C = t.n, t.L = t.I = void 0
            } catch (e) {
                throw t.er = e, e
            }
        }
    }

    o.System = new b;
    const I = "undefined" != typeof $global ? $global : "function" == typeof getApp ? getApp().GameGlobal : void 0,
        R = (void 0 !== I ? I.System : System).constructor.prototype;
    R.instantiate = function (e, t) {
        throw new Error(`Unable to instantiate ${e} from ${t}`)
    };
    var C = "undefined" != typeof Symbol && Symbol.toStringTag;
    w.get = function (e) {
        var t = this[y][e];
        if (t && null === t.e && !t.E) return t.er ? null : t.n
    }, w.set = function (e, t) {
        var n;
        C && "Module" === t[C] ? n = t : (n = Object.assign(Object.create(null), t), C && Object.defineProperty(n, C, {value: "Module"}));
        var r = Promise.resolve(n),
            i = this[y][e] || (this[y][e] = {id: e, i: [], h: !1, d: [], e: null, er: void 0, E: void 0});
        return !i.e && !i.E && (Object.assign(i, {n: n, I: void 0, L: void 0, C: r}), n)
    }, w.has = function (e) {
        return !!this[y][e]
    }, w.delete = function (e) {
        var t = this[y], n = t[e];
        if (!n || n.p && null !== n.p.e || n.E) return !1;
        var r = n.i;
        return n.d && n.d.forEach((function (e) {
            var t = e.i.indexOf(n);
            -1 !== t && e.i.splice(t, 1)
        })), delete t[e], function () {
            var n = t[e];
            if (!n || !r || null !== n.e || n.E) return !1;
            r.forEach((function (e) {
                n.i.push(e), e(n.n)
            })), r = null
        }
    };
    var M = "undefined" != typeof Symbol && Symbol.iterator;
    w.entries = function () {
        var e, t, n = this, r = Object.keys(n[y]), i = 0, o = {
            next: function () {
                for (; void 0 !== (t = r[i++]) && void 0 === (e = n.get(t));) ;
                return {done: void 0 === t, value: void 0 !== t && [t, e]}
            }
        };
        return o[M] = function () {
            return this
        }, o
    };
    let $ = t;
    const _ = {imports: {}, scopes: {}};

    function L(e, t) {
        !function (e, t, n) {
            var r;
            for (r in e.imports && h(e.imports, n.imports, t, n, null), e.scopes || {}) {
                var i = a(r, t);
                h(e.scopes[r], n.scopes[i] || (n.scopes[i] = {}), t, n, i)
            }
            for (r in e.depcache || {}) n.depcache[a(r, t)] = e.depcache[r];
            for (r in e.integrity || {}) n.integrity[a(r, t)] = e.integrity[r]
        }(e, t || $, _)
    }

    function U(e) {
        return function (t) {
            const n = this;
            let r;
            try {
                r = e(t)
            } catch (e) {
                return Promise.reject(e)
            }
            return i = r, Boolean(i && "function" == typeof i.then) ? new Promise((e => r.then((() => {
                e(n.getRegister())
            })))) : n.getRegister();
            var i
        }
    }

    function T(e, t) {
        const n = R.instantiate;
        R.instantiate = function (r, i) {
            const o = r.substr(0, e.length) === e ? r.substr(e.length) : null;
            return null === o ? n.call(this, r, i) : t.call(this, o, i)
        }
    }

    R.resolve = function (e, t) {
        return g(_, f(e, t = t || $) || e, t) || function (e, t) {
            throw new Error(`Unresolved id: ${e} from parentUrl: ${t}`)
        }(e, t)
    }, R.prepareImport = function () {
        return Promise.resolve()
    }, R.warmup = function ({pathname: e = "/", importMap: t, importMapUrl: n, defaultHandler: r, handlers: i}) {
        const o = "no-schema:";
        if ($ = `no-schema:${e}`, L(t, `no-schema:/${n}`), r && T(o, U(r)), i) for (const e of Object.keys(i)) T(e, U(i[e]))
    }, function (e) {
        var t = e.System;
        u(t);
        var n, r = t.constructor.prototype, i = t.constructor, o = function () {
            i.call(this), u(this)
        };

        function u(e) {
            e.registerRegistry = Object.create(null)
        }

        o.prototype = r, t.constructor = o;
        var l = r.register;
        r.register = function (e, t, r) {
            if ("string" != typeof e) return l.apply(this, arguments);
            var i = [t, r];
            return this.registerRegistry[e] = i, n || (n = i, Promise.resolve().then((function () {
                n = null
            }))), l.apply(this, arguments)
        };
        var s = r.resolve;
        r.resolve = function (e, t) {
            try {
                return s.call(this, e, t)
            } catch (t) {
                if (e in this.registerRegistry) return e;
                throw t
            }
        };
        var c = r.instantiate;
        r.instantiate = function (e, t) {
            var n = this.registerRegistry[e];
            return n ? (this.registerRegistry[e] = null, n) : c.call(this, e, t)
        };
        var f = r.getRegister;
        r.getRegister = function () {
            var e = f.call(this), t = n || e;
            return n = null, t
        }
    }("undefined" != typeof self ? self : global)
}();
