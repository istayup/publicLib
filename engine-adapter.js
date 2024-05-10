!function i(o, a, r) {
    function c(t, e) {
        if (!a[t]) {
            if (!o[t]) {
                var n = "function" == typeof require && require;
                if (!e && n) return n(t, !0);
                if (s) return s(t, !0);
                throw (e = new Error("Cannot find module '" + t + "'")).code = "MODULE_NOT_FOUND", e
            }
            n = a[t] = {exports: {}}, o[t][0].call(n.exports, function (e) {
                return c(o[t][1][e] || e)
            }, n, n.exports, i, o, a, r)
        }
        return a[t].exports
    }

    for (var s = "function" == typeof require && require, e = 0; e < r.length; e++) c(r[e]);
    return c
}({
    1: [function (s, B, K) {
        "use strict";
        var l = s("./cache-manager"), e = window.fsUtils, u = e.fs, d = e.downloadFile, o = e.readText,
            a = e.readArrayBuffer, i = e.readJson, h = e.loadSubpackage, f = e.getUserDataPath, r = e.exists,
            p = /^https?:\/\/.*/, m = cc.assetManager.downloader, e = cc.assetManager.parser,
            t = cc.assetManager.presets,
            _ = (m.maxConcurrency = 12, m.maxRequestsPerFrame = 64, t.scene.maxConcurrency = 12, t.scene.maxRequestsPerFrame = 64, {}),
            y = cc.sys;

        function n(e, t, n) {
            p.test(e) ? n && n(new Error("Can not load remote scripts")) : (y.platform !== y.Platform.TAOBAO_CREATIVE_APP && s("../../../".concat(e)), n && n(null))
        }

        function c(t, e, n) {
            cc.AudioPlayer.load(t).then(function (e) {
                e = {player: e, url: t, duration: e.duration, type: e.type};
                n(null, e)
            }).catch(function (e) {
                n(e)
            })
        }

        function v(i, t, o, e, a) {
            var n = function (e, t) {
                var n = !1, i = !1;
                !e.startsWith(f()) && p.test(e) ? t.reload || ((t = l.cachedFiles.get(e)) ? (i = !0, e = t.url) : (t = l.tempFiles.get(e)) && (n = !0, e = t)) : n = !0;
                return {url: e, inLocal: n, inCache: i}
            }(i, o);
            n.inLocal ? t(n.url, o, a) : n.inCache ? (l.updateLastTime(i), t(n.url, o, function (e, t) {
                e && l.removeCache(i), a(e, t)
            })) : d(i, null, o.header, e, function (e, n) {
                e ? a(e, null) : t(n, o, function (e, t) {
                    e || (l.tempFiles.add(i, n), l.cacheFile(i, n, o.cacheEnabled, o.__cacheBundleRoot__, !0)), a(e, t)
                })
            })
        }

        function g(e, t, n) {
            a(e, n)
        }

        function b(e, t, n) {
            o(e, n)
        }

        function w(e, t, n) {
            i(e, n)
        }

        function E(e, t, n) {
            v(e, w, t, t.onFileProgress, n)
        }

        function x(e, t, n) {
            n(null, __globalAdapter.loadFont(e) || "Arial")
        }

        function T(t, e, n) {
            r(t, function (e) {
                e ? n(null, t) : n(new Error("file ".concat(t, " does not exist!")))
            })
        }

        function P(e, t, n) {
            v(e, T, t, t.onFileProgress, n)
        }

        y.platform === y.Platform.BAIDU_MINI_GAME && (s = __baiduRequire), y.platform === y.Platform.TAOBAO_MINI_GAME && (s = globalThis.__taobaoRequire);

        function F(e, n, i) {
            a(e, function (e, t) {
                if (e) return i(e);
                O(t, n, i)
            })
        }

        function C(e, n, i) {
            a(e, function (e, t) {
                if (e) return i(e);
                I(t, n, i)
            })
        }

        function A(e, n, i) {
            a(e, function (e, t) {
                if (e) return i(e);
                S(t, n, i)
            })
        }

        function k(e, n, i) {
            o(e, function (e, t) {
                if (e) return i(e);
                M(t, n, i)
            })
        }

        var O = e.parsePVRTex, I = e.parsePKMTex, S = e.parseASTCTex, M = e.parsePlist;
        m.downloadScript = n, m._downloadArrayBuffer = function (e, t, n) {
            v(e, g, t, t.onFileProgress, n)
        }, m._downloadJson = E, e.parsePVRTex = F, e.parsePKMTex = C, e.parseASTCTex = A, e.parsePlist = k, m.register({
            ".js": n,
            ".mp3": P,
            ".ogg": P,
            ".wav": P,
            ".m4a": P,
            ".png": P,
            ".jpg": P,
            ".bmp": P,
            ".jpeg": P,
            ".gif": P,
            ".ico": P,
            ".tiff": P,
            ".image": P,
            ".webp": P,
            ".pvr": P,
            ".pkm": P,
            ".astc": P,
            ".font": P,
            ".eot": P,
            ".ttf": P,
            ".woff": P,
            ".svg": P,
            ".ttc": P,
            ".txt": P,
            ".xml": P,
            ".vsh": P,
            ".fsh": P,
            ".atlas": P,
            ".tmx": P,
            ".tsx": P,
            ".plist": P,
            ".fnt": P,
            ".json": E,
            ".ExportJson": P,
            ".binary": P,
            ".bin": P,
            ".dbbin": P,
            ".skel": P,
            ".mp4": P,
            ".avi": P,
            ".mov": P,
            ".mpg": P,
            ".mpeg": P,
            ".rm": P,
            ".rmvb": P,
            bundle: function (e, t, r) {
                var n, i, c, o = cc.path.basename(e),
                    a = (a = t.version || cc.assetManager.downloader.bundleVers[o]) ? "".concat(a, ".") : "";
                _[o] ? (n = (y.platform === y.Platform.TAOBAO_MINI_GAME ? "" : "subpackages/").concat(o, "/config.").concat(a, "json"), h(o, t.onFileProgress, function (e) {
                    e ? r(e, null) : E(n, t, function (e, t) {
                        var n;
                        (n = t) && (y.platform === y.Platform.TAOBAO_MINI_GAME ? n.base = "".concat(o, "/") : n.base = "subpackages/".concat(o, "/")), r(e, t)
                    })
                })) : (p.test(e) || e.startsWith(f()) ? (c = e, i = "src/bundle-scripts/".concat(o, "/index.").concat(a, "js"), l.makeBundleFolder(o)) : -1 !== m.remoteBundles.indexOf(o) ? (c = "".concat(m.remoteServerAddress, "remote/").concat(o), i = "src/bundle-scripts/".concat(o, "/index.").concat(a, "js"), l.makeBundleFolder(o)) : (c = "assets/".concat(o), i = "assets/".concat(o, "/index.").concat(a, "js")), y.platform === y.Platform.TAOBAO_MINI_GAME ? s(i) : y.platform !== y.Platform.TAOBAO_CREATIVE_APP && s("./".concat(i)), t.__cacheBundleRoot__ = o, E("".concat(c, "/config.").concat(a, "json"), t, function (e, n) {
                    var i, o, a;
                    e ? r && r(e) : n.isZip ? (e = n.zipVersion, e = "".concat(c, "/res.").concat(e ? "".concat(e, ".") : "", "zip"), i = e, o = t, a = function (e, t) {
                        e ? r && r(e) : (n.base = "".concat(t, "/res/"), y.platform === y.Platform.ALIPAY_MINI_GAME && y.os === y.OS.ANDROID && (e = "".concat(t, "res/"), u.accessSync({path: e}).success) && (n.base = e), r && r(null, n))
                    }, (e = l.cachedFiles.get(i)) ? (l.updateLastTime(i), a && a(null, e.url)) : p.test(i) ? d(i, null, o.header, o.onFileProgress, function (e, t) {
                        e ? a && a(e) : l.unzipAndCacheBundle(i, t, o.__cacheBundleRoot__, a)
                    }) : l.unzipAndCacheBundle(i, i, o.__cacheBundleRoot__, a)) : (n.base = "".concat(c, "/"), r && r(null, n))
                }))
            },
            default: function (e, t, n) {
                v(e, b, t, t.onFileProgress, n)
            }
        }), e.register({
            ".png": m.downloadDomImage,
            ".jpg": m.downloadDomImage,
            ".bmp": m.downloadDomImage,
            ".jpeg": m.downloadDomImage,
            ".gif": m.downloadDomImage,
            ".ico": m.downloadDomImage,
            ".tiff": m.downloadDomImage,
            ".image": m.downloadDomImage,
            ".webp": m.downloadDomImage,
            ".pvr": F,
            ".pkm": C,
            ".astc": A,
            ".font": x,
            ".eot": x,
            ".ttf": x,
            ".woff": x,
            ".svg": x,
            ".ttc": x,
            ".mp3": c,
            ".ogg": c,
            ".wav": c,
            ".m4a": c,
            ".txt": b,
            ".xml": b,
            ".vsh": b,
            ".fsh": b,
            ".atlas": b,
            ".tmx": b,
            ".tsx": b,
            ".fnt": b,
            ".plist": k,
            ".binary": g,
            ".bin": g,
            ".dbbin": g,
            ".skel": g,
            ".ExportJson": w
        }), cc.assetManager.transformPipeline.append(function (e) {
            for (var t = e.output = e.input, n = 0, i = t.length; n < i; n++) {
                var o = t[n], a = o.options;
                if (o.config) a.__cacheBundleRoot__ = o.config.name; else {
                    if ("bundle" === o.ext) continue;
                    a.cacheEnabled = void 0 !== a.cacheEnabled && a.cacheEnabled
                }
                ".cconb" === o.ext ? o.url = o.url.replace(o.ext, ".bin") : ".ccon" === o.ext && (o.url = o.url.replace(o.ext, ".json"))
            }
        });
        var D = cc.assetManager.init;
        cc.assetManager.init = function (e) {
            D.call(cc.assetManager, e);
            e = cc.settings.querySettings("assets", "subpackages");
            e && e.forEach(function (e) {
                return _[e] = "subpackages/".concat(e)
            }), l.init()
        }
    }, {"./cache-manager": 3}], 2: [function (e, t, n) {
        "use strict";

        function i() {
            this._delegate = null, this._editing = !1, this._eventListeners = {
                onKeyboardInput: null,
                onKeyboardConfirm: null,
                onKeyboardComplete: null
            }
        }

        var o, a, r, c, s;
        cc && cc.internal && cc.internal.EditBox && (o = cc.internal.EditBox, a = cc.js, r = o.KeyboardReturnType, s = c = null, a.extend(i, o._EditBoxImpl), o._EditBoxImpl = i, Object.assign(i.prototype, {
            init: function (e) {
                e ? this._delegate = e : cc.error("EditBox init failed")
            }, beginEditing: function () {
                var t = this;
                this._editing || this._ensureKeyboardHide(function () {
                    var e = t._delegate;
                    t._showKeyboard(), t._registerKeyboardEvent(), t._editing = !0, s = t, e._editBoxEditingDidBegan()
                })
            }, endEditing: function () {
                this._hideKeyboard();
                var e = this._eventListeners;
                e.onKeyboardComplete && e.onKeyboardComplete()
            }, _registerKeyboardEvent: function () {
                var n = this, i = this._delegate, e = this._eventListeners;
                e.onKeyboardInput = function (e) {
                    i._string !== e.value && i._editBoxTextChanged(e.value)
                }, e.onKeyboardConfirm = function (e) {
                    e && e.value ? i._editBoxEditingReturn(e.value) : i._editBoxEditingReturn();
                    var t = n._eventListeners;
                    t.onKeyboardComplete && t.onKeyboardComplete(e)
                }, e.onKeyboardComplete = function (e) {
                    n._editing = !1, s = null, cc.sys.platform !== cc.sys.Platform.WECHAT_MINI_PROGRAM && n._unregisterKeyboardEvent(), e && e.value && e.value !== i.string && i._editBoxTextChanged(e.value), e && e.value ? i._editBoxEditingDidEnded(e.value) : i._editBoxEditingDidEnded()
                }, __globalAdapter.onKeyboardInput(e.onKeyboardInput), __globalAdapter.onKeyboardConfirm(e.onKeyboardConfirm), __globalAdapter.onKeyboardComplete(e.onKeyboardComplete)
            }, _unregisterKeyboardEvent: function () {
                var e = this._eventListeners;
                e.onKeyboardInput && (__globalAdapter.offKeyboardInput(e.onKeyboardInput), e.onKeyboardInput = null), e.onKeyboardConfirm && (__globalAdapter.offKeyboardConfirm(e.onKeyboardConfirm), e.onKeyboardConfirm = null), e.onKeyboardComplete && (__globalAdapter.offKeyboardComplete(e.onKeyboardComplete), e.onKeyboardComplete = null)
            }, _otherEditing: function () {
                return !!s && s !== this && s._editing
            }, _ensureKeyboardHide: function (e) {
                var t = this._otherEditing();
                if (!t && !c) return e();
                c && clearTimeout(c), t && s.endEditing(), c = setTimeout(function () {
                    c = null, e()
                }, 600)
            }, _showKeyboard: function () {
                var e = this._delegate, t = e.inputMode === o.InputMode.ANY;
                __globalAdapter.showKeyboard({
                    defaultValue: e.string,
                    maxLength: e.maxLength < 0 ? 65535 : e.maxLength,
                    multiple: t,
                    confirmHold: !1,
                    confirmType: function (e) {
                        switch (e) {
                            case r.DEFAULT:
                            case r.DONE:
                                return "done";
                            case r.SEND:
                                return "send";
                            case r.SEARCH:
                                return "search";
                            case r.GO:
                                return "go";
                            case r.NEXT:
                                return "next"
                        }
                        return "done"
                    }(e.returnType),
                    success: function (e) {
                    },
                    fail: function (e) {
                        cc.warn(e.errMsg)
                    }
                })
            }, _hideKeyboard: function () {
                __globalAdapter.hideKeyboard({
                    success: function (e) {
                    }, fail: function (e) {
                        cc.warn(e.errMsg)
                    }
                })
            }
        }))
    }, {}], 3: [function (e, t, n) {
        "use strict";
        var i = window.fsUtils, o = i.getUserDataPath, a = i.readJsonSync, c = i.makeDirSync, r = i.writeFileSync,
            u = i.copyFile, d = i.downloadFile, s = i.deleteFile, l = i.rmdirSync, h = i.unzip, f = i.isOutOfStorage,
            p = !1, m = null, _ = !1, y = 0, v = /^https?:\/\/.*/;
        cc.assetManager.cacheManager = t.exports = {
            cacheDir: "gamecaches",
            cachedFileName: "cacheList.json",
            cacheEnabled: !0,
            autoClear: !0,
            cacheInterval: 500,
            deleteInterval: 500,
            writeFileInterval: 2e3,
            outOfStorage: !1,
            tempFiles: null,
            cachedFiles: null,
            cacheQueue: {},
            version: "1.0",
            getCache: function (e) {
                return this.cachedFiles.has(e) ? this.cachedFiles.get(e).url : ""
            },
            getTemp: function (e) {
                return this.tempFiles.has(e) ? this.tempFiles.get(e) : ""
            },
            init: function () {
                this.cacheDir = o() + "/" + this.cacheDir;
                var e = this.cacheDir + "/" + this.cachedFileName, t = a(e);
                t instanceof Error || !t.version ? (t instanceof Error || l(this.cacheDir, !0), this.cachedFiles = new cc.AssetManager.Cache, c(this.cacheDir, !0), r(e, JSON.stringify({
                    files: this.cachedFiles._map,
                    version: this.version
                }), "utf8")) : this.cachedFiles = new cc.AssetManager.Cache(t.files), this.tempFiles = new cc.AssetManager.Cache
            },
            updateLastTime: function (e) {
                this.cachedFiles.has(e) && (this.cachedFiles.get(e).lastTime = Date.now())
            },
            _write: function () {
                m = null, r(this.cacheDir + "/" + this.cachedFileName, JSON.stringify({
                    files: this.cachedFiles._map,
                    version: this.version
                }), "utf8")
            },
            writeCacheFile: function () {
                m = m || setTimeout(this._write.bind(this), this.writeFileInterval)
            },
            _cache: function () {
                p = !1;
                var e, t, n, i, o, a, r, c = this, s = "";
                for (e in this.cacheQueue) {
                    s = e;
                    break
                }

                function l(e) {
                    if (e) {
                        if (f(e.message)) return c.outOfStorage = !0, void (c.autoClear && c.clearLRU())
                    } else c.cachedFiles.add(s, {bundle: o, url: r, lastTime: a}), c.writeCacheFile();
                    delete c.cacheQueue[s], cc.js.isEmptyObject(c.cacheQueue) || p || (p = !0, setTimeout(c._cache.bind(c), c.cacheInterval))
                }

                s && (n = (t = this.cacheQueue[s]).srcUrl, i = t.isCopy, o = t.cacheBundleRoot, a = Date.now().toString(), r = "", r = (o ? "".concat(this.cacheDir, "/").concat(o, "/") : "".concat(this.cacheDir, "/")).concat(a).concat(y++).concat(cc.path.extname(s)), i ? u(n, r, l) : d(n, r, null, l))
            },
            cacheFile: function (e, t, n, i, o) {
                !(n = void 0 !== n ? n : this.cacheEnabled) || this.cacheQueue[e] || this.cachedFiles.has(e) || (this.cacheQueue[e] = {
                    srcUrl: t,
                    cacheBundleRoot: i,
                    isCopy: o
                }, p) || this.outOfStorage || (p = !0, setTimeout(this._cache.bind(this), this.cacheInterval))
            },
            clearCache: function () {
                var t = this;
                l(this.cacheDir, !0), this.cachedFiles = new cc.AssetManager.Cache, c(this.cacheDir, !0), this.outOfStorage = !1, clearTimeout(m), this._write(), cc.assetManager.bundles.forEach(function (e) {
                    v.test(e.base) && t.makeBundleFolder(e.name)
                })
            },
            clearLRU: function () {
                if (!_) {
                    _ = !0;
                    var n = [], i = this;
                    if (this.cachedFiles.forEach(function (t, e) {
                        i._isZipFile(e) && cc.assetManager.bundles.find(function (e) {
                            return -1 !== e.base.indexOf(t.url)
                        }) || n.push({originUrl: e, url: t.url, lastTime: t.lastTime})
                    }), n.sort(function (e, t) {
                        return e.lastTime - t.lastTime
                    }), n.length = Math.floor(n.length / 3), 0 !== n.length) {
                        for (var e = 0, t = n.length; e < t; e++) this.cachedFiles.remove(n[e].originUrl);
                        clearTimeout(m), this._write(), setTimeout(function e() {
                            var t = n.pop();
                            i._isZipFile(t.originUrl) ? (l(t.url, !0), i._deleteFileCB()) : s(t.url, i._deleteFileCB.bind(i)), 0 < n.length ? setTimeout(e, i.deleteInterval) : _ = !1
                        }, i.deleteInterval)
                    }
                }
            },
            removeCache: function (e) {
                var t;
                this.cachedFiles.has(e) && (t = this.cachedFiles.remove(e).url, clearTimeout(m), this._write(), this._isZipFile(e) ? (l(t, !0), this._deleteFileCB()) : s(t, this._deleteFileCB.bind(this)))
            },
            _deleteFileCB: function (e) {
                e || (this.outOfStorage = !1)
            },
            makeBundleFolder: function (e) {
                c(this.cacheDir + "/" + e, !0)
            },
            unzipAndCacheBundle: function (t, e, n, i) {
                var o = Date.now().toString(), a = "".concat(this.cacheDir, "/").concat(n, "/").concat(o).concat(y++),
                    r = this;
                c(a, !0), h(e, a, function (e) {
                    e ? (l(a, !0), f(e.message) && (r.outOfStorage = !0, r.autoClear) && r.clearLRU(), i && i(e)) : (r.cachedFiles.add(t, {
                        bundle: n,
                        url: a,
                        lastTime: o
                    }), r.writeCacheFile(), i && i(null, a))
                })
            },
            _isZipFile: function (e) {
                return ".zip" === e.slice(-4)
            }
        }
    }, {}], 4: [function (e, t, n) {
        "use strict";
        e("./Editbox"), e("./AssetManager")
    }, {"./AssetManager": 1, "./Editbox": 2}], 5: [function (e, t, n) {
        "use strict";

        function o(e) {
            return (o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
                return typeof e
            } : function (e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
            })(e)
        }

        function a(e, t) {
            for (var n = 0; n < t.length; n++) {
                var i = t[n];
                i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, function (e) {
                    e = function (e, t) {
                        if ("object" !== o(e) || null === e) return e;
                        var n = e[Symbol.toPrimitive];
                        if (void 0 === n) return ("string" === t ? String : Number)(e);
                        n = n.call(e, t || "default");
                        if ("object" !== o(n)) return n;
                        throw new TypeError("@@toPrimitive must return a primitive value.")
                    }(e, "string");
                    return "symbol" === o(e) ? e : String(e)
                }(i.key), i)
            }
        }

        function r(e, t) {
            return (r = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (e, t) {
                return e.__proto__ = t, e
            })(e, t)
        }

        function c(n) {
            var i = function () {
                if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
                if (Reflect.construct.sham) return !1;
                if ("function" == typeof Proxy) return !0;
                try {
                    return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {
                    })), !0
                } catch (e) {
                    return !1
                }
            }();
            return function () {
                var e, t = s(n),
                    t = (e = i ? (e = s(this).constructor, Reflect.construct(t, arguments, e)) : t.apply(this, arguments), this);
                if (e && ("object" === o(e) || "function" == typeof e)) return e;
                if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined");
                if (void 0 !== t) return t;
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
            }
        }

        function s(e) {
            return (s = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (e) {
                return e.__proto__ || Object.getPrototypeOf(e)
            })(e)
        }

        var l, u, d, h, f, p, i;
        cc.internal.VideoPlayer && (l = cc.internal.VideoPlayer.EventType, u = cc.Vec3, d = cc.mat4(), h = new u, f = new u, p = wx.getSystemInfoSync().pixelRatio, cc.internal.VideoPlayerImplManager.getImpl = function (e) {
            return new i(e)
        }, i = function (e) {
            var t = o;
            if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
            t.prototype = Object.create(e && e.prototype, {
                constructor: {
                    value: t,
                    writable: !0,
                    configurable: !0
                }
            }), Object.defineProperty(t, "prototype", {writable: !1}), e && r(t, e);
            var n, i = c(o);

            function o(e) {
                if (this instanceof o) return i.call(this, e);
                throw new TypeError("Cannot call a class as a function")
            }

            return t = o, (e = [{
                key: "syncClip", value: function (e) {
                    this.removeVideoPlayer(), e && this.createVideoPlayer(e._nativeAsset)
                }
            }, {
                key: "syncURL", value: function (e) {
                    this.removeVideoPlayer(), e && this.createVideoPlayer(e)
                }
            }, {
                key: "onCanplay", value: function () {
                    this._loaded || (this._loaded = !0, this.setVisible(this._visible), this.dispatchEvent(l.READY_TO_PLAY), this.delayedPlay())
                }
            }, {
                key: "_bindEvent", value: function () {
                    var e = this._video, t = this;
                    e && (e.onPlay(function () {
                        t._video === e && (t._playing = !0, t.dispatchEvent(l.PLAYING))
                    }), e.onEnded(function () {
                        t._video === e && (t._playing = !1, t._currentTime = t._duration, t.dispatchEvent(l.COMPLETED))
                    }), e.onPause(function () {
                        t._video === e && (t._playing = !1, t.dispatchEvent(l.PAUSED))
                    }), e.onTimeUpdate(function (e) {
                        t._duration = e.duration, t._currentTime = e.position
                    }))
                }
            }, {
                key: "_unbindEvent", value: function () {
                    var e = this._video;
                    e && (e.offPlay(), e.offEnded(), e.offPause(), e.offTimeUpdate())
                }
            }, {
                key: "createVideoPlayer", value: function (e) {
                    __globalAdapter.createVideo ? (this._video || (this._video = __globalAdapter.createVideo(), this._video.showCenterPlayBtn = !1, this._video.controls = !1, this._duration = 0, this._currentTime = 0, this._loaded = !1, this.setVisible(this._visible), this._bindEvent(), this._forceUpdate = !0), this.setURL(e), this._forceUpdate = !0) : console.warn("VideoPlayer not supported")
                }
            }, {
                key: "setURL", value: function (e) {
                    var t, n = this._video;
                    n && n.src !== e && (n.stop(), this._unbindEvent(), n.autoplay = !0, n.src = e, n.muted = !0, (t = this)._loaded = !1, n.onPlay(function () {
                        n.offPlay(), t._bindEvent(), n.stop(), n.muted = !1, t._loaded = !0, t._playing = !1, t._currentTime = 0, t.dispatchEvent(l.READY_TO_PLAY), n.autoplay = !1
                    }))
                }
            }, {
                key: "removeVideoPlayer", value: function () {
                    var e = this.video;
                    e && (e.stop(), e.destroy(), this._playing = !1, this._loaded = !1, this._loadedMeta = !1, this._ignorePause = !1, this._cachedCurrentTime = 0, this._video = null)
                }
            }, {
                key: "setVisible", value: function (e) {
                    var t = this._video;
                    t && this._visible !== e && (t.width = e && this._actualWidth || 0, this._visible = e)
                }
            }, {
                key: "getDuration", value: function () {
                    return this.duration()
                }
            }, {
                key: "duration", value: function () {
                    return this._duration
                }
            }, {
                key: "syncPlaybackRate", value: function (e) {
                    var t = this._video;
                    t && e !== t.playbackRate && (.5 === e | .8 === e | 1 === e | 1.25 === e | 1.5 === e ? t.playbackRate = e : console.warn("The platform does not support this PlaybackRate!"))
                }
            }, {
                key: "syncVolume", value: function () {
                    console.warn("The platform does not support")
                }
            }, {
                key: "syncMute", value: function (e) {
                    var t = this._video;
                    t && t.muted !== e && (t.muted = e)
                }
            }, {
                key: "syncLoop", value: function (e) {
                    var t = this._video;
                    t && t.loop !== e && (t.loop = e)
                }
            }, {
                key: "syncStayOnBottom", value: function () {
                    console.warn("The platform does not support")
                }
            }, {
                key: "getCurrentTime", value: function () {
                    return this.video ? this.currentTime() : -1
                }
            }, {
                key: "currentTime", value: function () {
                    return this._currentTime
                }
            }, {
                key: "seekTo", value: function (e) {
                    var t = this._video;
                    t && this._loaded && t.seek(e)
                }
            }, {
                key: "disable", value: function (e) {
                    this._video && (e || this._video.pause(), this.setVisible(!1), this._visible = !1)
                }
            }, {
                key: "enable", value: function () {
                    this._video && (this.setVisible(!0), this._visible = !0)
                }
            }, {
                key: "canPlay", value: function () {
                    this._video.play(), this.syncCurrentTime()
                }
            }, {
                key: "resume", value: function () {
                    var e = this._video;
                    !this._playing && e && e.play()
                }
            }, {
                key: "pause", value: function () {
                    var e = this._video;
                    this._playing && e && e.pause()
                }
            }, {
                key: "stop", value: function () {
                    var t = this, e = this._video;
                    e && this._visible && (this._playing || e.play(), e.stop().then(function (e) {
                        e.errMsg && !e.errMsg.includes("ok") ? console.error("failed to stop video player") : (t._currentTime = 0, t._playing = !1, t.dispatchEvent(l.STOPPED))
                    }))
                }
            }, {
                key: "canFullScreen", value: function (e) {
                    this._video && this.setFullScreenEnabled(e)
                }
            }, {
                key: "setFullScreenEnabled", value: function (e) {
                    var t = this._video;
                    t && this._fullScreenEnabled !== e && (e ? t.requestFullScreen() : t.exitFullScreen(), this._fullScreenEnabled = e)
                }
            }, {
                key: "syncKeepAspectRatio", value: function (e) {
                    console.warn("On wechat game videoPlayer is always keep the aspect ratio")
                }
            }, {
                key: "syncMatrix", value: function () {
                    var e, t, n;
                    this._video && this._component && this._uiTrans && (n = this.UICamera) && (this._component.node.getWorldMatrix(d), e = (t = this._uiTrans.contentSize).width, t = t.height, !this._forceUpdate && this._m00 === d.m00 && this._m01 === d.m01 && this._m04 === d.m04 && this._m05 === d.m05 && this._m12 === d.m12 && this._m13 === d.m13 && this._w === e && this._h === t || (this._m00 = d.m00, this._m01 = d.m01, this._m04 = d.m04, this._m05 = d.m05, this._m12 = d.m12, this._m13 = d.m13, this._w = e, this._h = t, cc.game.canvas.width, e = cc.game.canvas.height, t = this._uiTrans.anchorPoint, u.set(h, -t.x * this._w, (1 - t.y) * this._h, 0), u.set(f, (1 - t.x) * this._w, -t.y * this._h, 0), u.transformMat4(h, h, d), u.transformMat4(f, f, d), n.worldToScreen(h, h), n.worldToScreen(f, f), t = f.x - h.x, n = h.y - f.y, this._video.x = h.x / p, this._video.y = (e - h.y) / p, this._actualWidth = this._video.width = t / p, this._video.height = n / p, this._forceUpdate = !1))
                }
            }]) && a(t.prototype, e), n && a(t, n), Object.defineProperty(t, "prototype", {writable: !1}), o
        }(cc.internal.VideoPlayerImpl))
    }, {}], 6: [function (e, t, n) {
        "use strict";
        e("../../../../common/engine/index"), e("./VideoPlayer"), e("./sprite-frame")
    }, {"../../../../common/engine/index": 4, "./VideoPlayer": 5, "./sprite-frame": 7}], 7: [function (e, t, n) {
        "use strict";
        cc.SpriteFrame && (cc.SpriteFrame.prototype._checkPackable = function () {
            var e, t, n, i = cc.internal.dynamicAtlasManager;
            i && (!((e = this._texture) instanceof cc.Texture2D) || e.isCompressed || (t = this.width, n = this.height, !e.image) || t > i.maxFrameSize || n > i.maxFrameSize ? this._packable = !1 : e.image && e.image.getContext && (this._packable = !0))
        })
    }, {}]
}, {}, [6]);