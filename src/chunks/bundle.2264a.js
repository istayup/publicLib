System.register([], function (_export, _context) {
    return {
        execute: function () {
            System.register("chunks:///_virtual/rollupPluginModLoBabelHelpers.js", [], (function (e) {
                return {
                    execute: function () {
                        function r(e, r, t, n, i, o, a) {
                            try {
                                var u = e[o](a), l = u.value
                            } catch (e) {
                                return void t(e)
                            }
                            u.done ? r(l) : Promise.resolve(l).then(n, i)
                        }

                        function t(e, r) {
                            for (var t = 0; t < r.length; t++) {
                                var n = r[t];
                                n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, l(n.key), n)
                            }
                        }

                        function n() {
                            return (n = e("extends", Object.assign ? Object.assign.bind() : function (e) {
                                for (var r = 1; r < arguments.length; r++) {
                                    var t = arguments[r];
                                    for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n])
                                }
                                return e
                            })).apply(this, arguments)
                        }

                        function i(r, t) {
                            return (i = e("setPrototypeOf", Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (e, r) {
                                return e.__proto__ = r, e
                            }))(r, t)
                        }

                        function o(e, r) {
                            if (e) {
                                if ("string" == typeof e) return a(e, r);
                                var t = Object.prototype.toString.call(e).slice(8, -1);
                                return "Object" === t && e.constructor && (t = e.constructor.name), "Map" === t || "Set" === t ? Array.from(e) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? a(e, r) : void 0
                            }
                        }

                        function a(e, r) {
                            (null == r || r > e.length) && (r = e.length);
                            for (var t = 0, n = new Array(r); t < r; t++) n[t] = e[t];
                            return n
                        }

                        function u(e, r) {
                            if ("object" != typeof e || null === e) return e;
                            var t = e[Symbol.toPrimitive];
                            if (void 0 !== t) {
                                var n = t.call(e, r || "default");
                                if ("object" != typeof n) return n;
                                throw new TypeError("@@toPrimitive must return a primitive value.")
                            }
                            return ("string" === r ? String : Number)(e)
                        }

                        function l(e) {
                            var r = u(e, "string");
                            return "symbol" == typeof r ? r : String(r)
                        }

                        e({
                            applyDecoratedDescriptor: function (e, r, t, n, i) {
                                var o = {};
                                Object.keys(n).forEach((function (e) {
                                    o[e] = n[e]
                                })), o.enumerable = !!o.enumerable, o.configurable = !!o.configurable, ("value" in o || o.initializer) && (o.writable = !0);
                                o = t.slice().reverse().reduce((function (t, n) {
                                    return n(e, r, t) || t
                                }), o), i && void 0 !== o.initializer && (o.value = o.initializer ? o.initializer.call(i) : void 0, o.initializer = void 0);
                                void 0 === o.initializer && (Object.defineProperty(e, r, o), o = null);
                                return o
                            }, arrayLikeToArray: a, assertThisInitialized: function (e) {
                                if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                                return e
                            }, asyncToGenerator: function (e) {
                                return function () {
                                    var t = this, n = arguments;
                                    return new Promise((function (i, o) {
                                        var a = e.apply(t, n);

                                        function u(e) {
                                            r(a, i, o, u, l, "next", e)
                                        }

                                        function l(e) {
                                            r(a, i, o, u, l, "throw", e)
                                        }

                                        u(void 0)
                                    }))
                                }
                            }, createClass: function (e, r, n) {
                                r && t(e.prototype, r);
                                n && t(e, n);
                                return Object.defineProperty(e, "prototype", {writable: !1}), e
                            }, createForOfIteratorHelperLoose: function (e, r) {
                                var t = "undefined" != typeof Symbol && e[Symbol.iterator] || e["@@iterator"];
                                if (t) return (t = t.call(e)).next.bind(t);
                                if (Array.isArray(e) || (t = o(e)) || r && e && "number" == typeof e.length) {
                                    t && (e = t);
                                    var n = 0;
                                    return function () {
                                        return n >= e.length ? {done: !0} : {done: !1, value: e[n++]}
                                    }
                                }
                                throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
                            }, extends: n, inheritsLoose: function (e, r) {
                                e.prototype = Object.create(r.prototype), e.prototype.constructor = e, i(e, r)
                            }, initializerDefineProperty: function (e, r, t, n) {
                                if (!t) return;
                                Object.defineProperty(e, r, {
                                    enumerable: t.enumerable,
                                    configurable: t.configurable,
                                    writable: t.writable,
                                    value: t.initializer ? t.initializer.call(n) : void 0
                                })
                            }, objectWithoutPropertiesLoose: function (e, r) {
                                if (null == e) return {};
                                var t, n, i = {}, o = Object.keys(e);
                                for (n = 0; n < o.length; n++) t = o[n], r.indexOf(t) >= 0 || (i[t] = e[t]);
                                return i
                            }, setPrototypeOf: i, toPrimitive: u, toPropertyKey: l, unsupportedIterableToArray: o
                        })
                    }
                }
            }));

        }
    };
});