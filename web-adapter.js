!function r(o, i, a) {
    function u(t, e) {
        if (!i[t]) {
            if (!o[t]) {
                var n = "function" == typeof require && require;
                if (!e && n) return n(t, !0);
                if (c) return c(t, !0);
                throw (e = new Error("Cannot find module '" + t + "'")).code = "MODULE_NOT_FOUND", e
            }
            n = i[t] = {exports: {}}, o[t][0].call(n.exports, function (e) {
                return u(o[t][1][e] || e)
            }, n, n.exports, r, o, i, a)
        }
        return i[t].exports
    }

    for (var c = "function" == typeof require && require, e = 0; e < a.length; e++) u(a[e]);
    return u
}({
    1: [function (e, t, n) {
        "use strict";

        function r(e) {
            this.options = e || {locator: {}}
        }

        function l() {
            this.cdata = !1
        }

        function s(e, t) {
            t.lineNumber = e.lineNumber, t.columnNumber = e.columnNumber
        }

        function f(e) {
            if (e) return "\n@" + (e.systemId || "") + "#[line:" + e.lineNumber + ",col:" + e.columnNumber + "]"
        }

        function o(e, t, n) {
            return "string" == typeof e ? e.substr(t, n) : e.length >= t + n || t ? new java.lang.String(e, t, n) + "" : e
        }

        function d(e, t) {
            (e.currentElement || e.doc).appendChild(t)
        }

        r.prototype.parseFromString = function (e, t) {
            var n = this.options, r = new m, o = n.domBuilder || new l, i = n.errorHandler, a = n.locator,
                u = n.xmlns || {}, t = /\/x?html?$/.test(t),
                c = t ? p.entityMap : {lt: "<", gt: ">", amp: "&", quot: '"', apos: "'"};
            return a && o.setDocumentLocator(a), r.errorHandler = function (r, e, o) {
                if (!r) {
                    if (e instanceof l) return e;
                    r = e
                }
                var i = {}, a = r instanceof Function;

                function t(t) {
                    var n = r[t];
                    !n && a && (n = 2 == r.length ? function (e) {
                        r(t, e)
                    } : r), i[t] = n ? function (e) {
                        n("[xmldom " + t + "]\t" + e + f(o))
                    } : function () {
                    }
                }

                return o = o || {}, t("warning"), t("error"), t("fatalError"), i
            }(i, o, a), r.domBuilder = n.domBuilder || o, t && (u[""] = "http://www.w3.org/1999/xhtml"), u.xml = u.xml || "http://www.w3.org/XML/1998/namespace", e ? r.parse(e, u, c) : r.errorHandler.error("invalid doc source"), o.doc
        }, l.prototype = {
            startDocument: function () {
                this.doc = (new i).createDocument(null, null, null), this.locator && (this.doc.documentURI = this.locator.systemId)
            }, startElement: function (e, t, n, r) {
                var o = this.doc, i = o.createElementNS(e, n || t), a = r.length;
                d(this, i), this.currentElement = i, this.locator && s(this.locator, i);
                for (var u = 0; u < a; u++) {
                    var e = r.getURI(u), c = r.getValue(u), n = r.getQName(u), l = o.createAttributeNS(e, n);
                    this.locator && s(r.getLocator(u), l), l.value = l.nodeValue = c, i.setAttributeNode(l)
                }
            }, endElement: function (e, t, n) {
                var r = this.currentElement;
                r.tagName;
                this.currentElement = r.parentNode
            }, startPrefixMapping: function (e, t) {
            }, endPrefixMapping: function (e) {
            }, processingInstruction: function (e, t) {
                e = this.doc.createProcessingInstruction(e, t);
                this.locator && s(this.locator, e), d(this, e)
            }, ignorableWhitespace: function (e, t, n) {
            }, characters: function (e, t, n) {
                var r;
                (e = o.apply(this, arguments)) && (r = this.cdata ? this.doc.createCDATASection(e) : this.doc.createTextNode(e), this.currentElement ? this.currentElement.appendChild(r) : /^\s*$/.test(e) && this.doc.appendChild(r), this.locator) && s(this.locator, r)
            }, skippedEntity: function (e) {
            }, endDocument: function () {
                this.doc.normalize()
            }, setDocumentLocator: function (e) {
                (this.locator = e) && (e.lineNumber = 0)
            }, comment: function (e, t, n) {
                e = o.apply(this, arguments);
                e = this.doc.createComment(e);
                this.locator && s(this.locator, e), d(this, e)
            }, startCDATA: function () {
                this.cdata = !0
            }, endCDATA: function () {
                this.cdata = !1
            }, startDTD: function (e, t, n) {
                var r = this.doc.implementation;
                r && r.createDocumentType && (r = r.createDocumentType(e, t, n), this.locator && s(this.locator, r), d(this, r))
            }, warning: function (e) {
                console.warn("[xmldom warning]\t" + e, f(this.locator))
            }, error: function (e) {
                console.error("[xmldom error]\t" + e, f(this.locator))
            }, fatalError: function (e) {
                throw console.error("[xmldom fatalError]\t" + e, f(this.locator)), e
            }
        }, "endDTD,startEntity,endEntity,attributeDecl,elementDecl,externalEntityDecl,internalEntityDecl,resolveEntity,getExternalSubset,notationDecl,unparsedEntityDecl".replace(/\w+/g, function (e) {
            l.prototype[e] = function () {
                return null
            }
        });
        var p = e("./entities"), m = e("./sax").XMLReader, i = n.DOMImplementation = e("./dom").DOMImplementation;
        n.XMLSerializer = e("./dom").XMLSerializer, n.DOMParser = r, window.DOMParser = r
    }, {"./dom": 2, "./entities": 3, "./sax": 4}], 2: [function (j, U, e) {
        "use strict";

        function d(e) {
            return (d = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
                return typeof e
            } : function (e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
            })(e)
        }

        function t(e, t) {
            for (var n in e) t[n] = e[n]
        }

        function n(e, t) {
            var n = e.prototype;
            if (!(n instanceof t)) {
                var r, o = function () {
                };
                for (r in o.prototype = t.prototype, o = new o, n) o[r] = n[r];
                e.prototype = n = o
            }
            n.constructor != e && ("function" != typeof e && console.error("unknow Class:" + e), n.constructor = e)
        }

        var r, o = {},
            i = (o.ELEMENT_NODE = 1, o.ATTRIBUTE_NODE = 2, o.TEXT_NODE = 3, o.CDATA_SECTION_NODE = 4, o.ENTITY_REFERENCE_NODE = 5, o.ENTITY_NODE = 6, o.PROCESSING_INSTRUCTION_NODE = 7, o.COMMENT_NODE = 8, o.DOCUMENT_NODE = 9, o.DOCUMENT_TYPE_NODE = 10, o.DOCUMENT_FRAGMENT_NODE = 11, o.NOTATION_NODE = 12, {}),
            a = {};
        i.INDEX_SIZE_ERR = (a[1] = "Index size error", 1), i.DOMSTRING_SIZE_ERR = (a[2] = "DOMString size error", 2), i.HIERARCHY_REQUEST_ERR = (a[3] = "Hierarchy request error", 3), i.WRONG_DOCUMENT_ERR = (a[4] = "Wrong document", 4), i.INVALID_CHARACTER_ERR = (a[5] = "Invalid character", 5), i.NO_DATA_ALLOWED_ERR = (a[6] = "No data allowed", 6), i.NO_MODIFICATION_ALLOWED_ERR = (a[7] = "No modification allowed", 7), i.NOT_FOUND_ERR = (a[8] = "Not found", 8), i.NOT_SUPPORTED_ERR = (a[9] = "Not supported", 9), i.INUSE_ATTRIBUTE_ERR = (a[10] = "Attribute in use", 10), i.INVALID_STATE_ERR = (a[11] = "Invalid state", 11), i.SYNTAX_ERR = (a[12] = "Syntax error", 12), i.INVALID_MODIFICATION_ERR = (a[13] = "Invalid modification", 13), i.NAMESPACE_ERR = (a[14] = "Invalid namespace", 14), i.INVALID_ACCESS_ERR = (a[15] = "Invalid access", 15);

        function u(e, t) {
            var n;
            return t instanceof Error ? n = t : (n = this, Error.call(this, a[e]), this.message = a[e], Error.captureStackTrace && Error.captureStackTrace(this, u)), n.code = e, t && (this.message = this.message + ": " + t), n
        }

        function p() {
        }

        function c(e, t) {
            this._node = e, this._refresh = t, l(this)
        }

        function l(e) {
            var t = e._node._inc || e._node.ownerDocument._inc;
            if (e._inc != t) {
                var n, r = e._refresh(e._node);
                for (n in X(e, "length", r.length), r) e[n] = r[n];
                e._inc = t
            }
        }

        function m() {
        }

        function s(e, t) {
            for (var n = e.length; n--;) if (e[n] === t) return n
        }

        function f(e, t, n, r) {
            r ? t[s(t, r)] = n : t[t.length++] = n, e && (t = (n.ownerElement = e).ownerDocument) && (r && T(t, e, r), r = e, e = n, (n = t) && n._inc++, "http://www.w3.org/2000/xmlns/" == e.namespaceURI) && (r._nsMap[e.prefix ? e.localName : ""] = e.value)
        }

        function y(e, t, n) {
            var r = s(t, n);
            if (!(0 <= r)) throw u(8, new Error(e.tagName + "@" + n));
            for (var o, i = t.length - 1; r < i;) t[r] = t[++r];
            t.length = i, e && (o = e.ownerDocument) && (T(o, e, n), n.ownerElement = null)
        }

        function h(e) {
            if (this._features = {}, e) for (var t in e) this._features = e[t]
        }

        function E() {
        }

        function b(e) {
            return ("<" == e ? "&lt;" : ">" == e && "&gt;") || ("&" == e ? "&amp;" : '"' == e && "&quot;") || "&#" + e.charCodeAt() + ";"
        }

        function v(e, t) {
            if (t(e)) return 1;
            if (e = e.firstChild) do {
                if (v(e, t)) return 1
            } while (e = e.nextSibling)
        }

        function _() {
        }

        function T(e, t, n) {
            e && e._inc++, "http://www.w3.org/2000/xmlns/" == n.namespaceURI && delete t._nsMap[n.prefix ? n.localName : ""]
        }

        function g(e, t, n) {
            if (e && e._inc) {
                e._inc++;
                var r = t.childNodes;
                if (n) r[r.length++] = n; else {
                    for (var o = t.firstChild, i = 0; o;) o = (r[i++] = o).nextSibling;
                    r.length = i
                }
            }
        }

        function w(e, t) {
            var n = t.previousSibling, r = t.nextSibling;
            return n ? n.nextSibling = r : e.firstChild = r, r ? r.previousSibling = n : e.lastChild = n, g(e.ownerDocument, e), t
        }

        function N(e, t, n) {
            var r = t.parentNode;
            if (r && r.removeChild(t), 11 === t.nodeType) {
                var o = t.firstChild;
                if (null == o) return t;
                var i = t.lastChild
            } else o = i = t;
            r = n ? n.previousSibling : e.lastChild;
            for (o.previousSibling = r, i.nextSibling = n, r ? r.nextSibling = o : e.firstChild = o, null == n ? e.lastChild = i : n.previousSibling = i; o.parentNode = e, o !== i && (o = o.nextSibling);) ;
            return g(e.ownerDocument || e, e), 11 == t.nodeType && (t.firstChild = t.lastChild = null), t
        }

        function S() {
            this._nsMap = {}
        }

        function R() {
        }

        function A() {
        }

        function O() {
        }

        function P() {
        }

        function I() {
        }

        function M() {
        }

        function F() {
        }

        function B() {
        }

        function C() {
        }

        function D() {
        }

        function L() {
        }

        function H() {
        }

        function k(e, t) {
            var n, r = [], o = 9 == this.nodeType && this.documentElement || this, i = o.prefix, a = o.namespaceURI;
            return x(this, r, e, t, n = a && null == i && null == o.lookupPrefix(a) ? [{
                namespace: a,
                prefix: null
            }] : n), r.join("")
        }

        function G(e, t, n) {
            var r = e.prefix || "", o = e.namespaceURI;
            if ((r || o) && ("xml" !== r || "http://www.w3.org/XML/1998/namespace" !== o) && "http://www.w3.org/2000/xmlns/" != o) {
                for (var i = n.length; i--;) {
                    var a = n[i];
                    if (a.prefix == r) return a.namespace != o
                }
                return 1
            }
        }

        function x(e, t, n, r, o) {
            if (r) {
                if (!(e = r(e))) return;
                if ("string" == typeof e) return void t.push(e)
            }
            switch (e.nodeType) {
                case 1:
                    o = o || [];
                    var i = e.attributes, a = i.length, u = e.firstChild, c = e.tagName;
                    n = "http://www.w3.org/1999/xhtml" === e.namespaceURI || n, t.push("<", c);
                    for (var l = 0; l < a; l++) "xmlns" == (s = i.item(l)).prefix ? o.push({
                        prefix: s.localName,
                        namespace: s.value
                    }) : "xmlns" == s.nodeName && o.push({prefix: "", namespace: s.value});
                    for (var s, f, d, l = 0; l < a; l++) G(s = i.item(l), 0, o) && (f = s.prefix || "", d = s.namespaceURI, t.push(f ? " xmlns:" + f : " xmlns", '="', d, '"'), o.push({
                        prefix: f,
                        namespace: d
                    })), x(s, t, n, r, o);
                    if (G(e, 0, o) && (f = e.prefix || "", d = e.namespaceURI, t.push(f ? " xmlns:" + f : " xmlns", '="', d, '"'), o.push({
                        prefix: f,
                        namespace: d
                    })), u || n && !/^(?:meta|link|img|br|hr|input)$/i.test(c)) {
                        if (t.push(">"), n && /^script$/i.test(c)) for (; u;) u.data ? t.push(u.data) : x(u, t, n, r, o), u = u.nextSibling; else for (; u;) x(u, t, n, r, o), u = u.nextSibling;
                        t.push("</", c, ">")
                    } else t.push("/>");
                    return;
                case 9:
                case 11:
                    for (u = e.firstChild; u;) x(u, t, n, r, o), u = u.nextSibling;
                    return;
                case 2:
                    return t.push(" ", e.name, '="', e.value.replace(/[<&"]/g, b), '"');
                case 3:
                    return t.push(e.data.replace(/[<&]/g, b));
                case 4:
                    return t.push("<![CDATA[", e.data, "]]>");
                case 8:
                    return t.push("\x3c!--", e.data, "--\x3e");
                case 10:
                    var c = e.publicId, p = e.systemId;
                    return t.push("<!DOCTYPE ", e.name), void (c ? (t.push(' PUBLIC "', c), p && "." != p && t.push('" "', p), t.push('">')) : p && "." != p ? t.push(' SYSTEM "', p, '">') : ((c = e.internalSubset) && t.push(" [", c, "]"), t.push(">")));
                case 7:
                    return t.push("<?", e.target, " ", e.data, "?>");
                case 5:
                    return t.push("&", e.nodeName, ";");
                default:
                    t.push("??", e.nodeName)
            }
        }

        function X(e, t, n) {
            e[t] = n
        }

        u.prototype = Error.prototype, t(i, u), p.prototype = {
            length: 0, item: function (e) {
                return this[e] || null
            }, toString: function (e, t) {
                for (var n = [], r = 0; r < this.length; r++) x(this[r], n, e, t);
                return n.join("")
            }
        }, c.prototype.item = function (e) {
            return l(this), this[e]
        }, n(c, p), m.prototype = {
            length: 0, item: p.prototype.item, getNamedItem: function (e) {
                for (var t = this.length; t--;) {
                    var n = this[t];
                    if (n.nodeName == e) return n
                }
            }, setNamedItem: function (e) {
                var t = e.ownerElement;
                if (t && t != this._ownerElement) throw new u(10);
                t = this.getNamedItem(e.nodeName);
                return f(this._ownerElement, this, e, t), t
            }, setNamedItemNS: function (e) {
                var t = e.ownerElement;
                if (t && t != this._ownerElement) throw new u(10);
                return t = this.getNamedItemNS(e.namespaceURI, e.localName), f(this._ownerElement, this, e, t), t
            }, removeNamedItem: function (e) {
                e = this.getNamedItem(e);
                return y(this._ownerElement, this, e), e
            }, removeNamedItemNS: function (e, t) {
                e = this.getNamedItemNS(e, t);
                return y(this._ownerElement, this, e), e
            }, getNamedItemNS: function (e, t) {
                for (var n = this.length; n--;) {
                    var r = this[n];
                    if (r.localName == t && r.namespaceURI == e) return r
                }
                return null
            }
        }, h.prototype = {
            hasFeature: function (e, t) {
                e = this._features[e.toLowerCase()];
                return !(!e || t && !(t in e))
            }, createDocument: function (e, t, n) {
                var r = new _;
                return r.implementation = this, r.childNodes = new p, (r.doctype = n) && r.appendChild(n), t && (n = r.createElementNS(e, t), r.appendChild(n)), r
            }, createDocumentType: function (e, t, n) {
                var r = new M;
                return r.name = e, r.nodeName = e, r.publicId = t, r.systemId = n, r
            }
        }, E.prototype = {
            firstChild: null,
            lastChild: null,
            previousSibling: null,
            nextSibling: null,
            attributes: null,
            parentNode: null,
            childNodes: null,
            ownerDocument: null,
            nodeValue: null,
            namespaceURI: null,
            prefix: null,
            localName: null,
            insertBefore: function (e, t) {
                return N(this, e, t)
            },
            replaceChild: function (e, t) {
                this.insertBefore(e, t), t && this.removeChild(t)
            },
            removeChild: function (e) {
                return w(this, e)
            },
            appendChild: function (e) {
                return this.insertBefore(e, null)
            },
            hasChildNodes: function () {
                return null != this.firstChild
            },
            cloneNode: function (e) {
                return function e(t, n, r) {
                    var o = new n.constructor;
                    for (var i in n) {
                        var a = n[i];
                        "object" != d(a) && a != o[i] && (o[i] = a)
                    }
                    n.childNodes && (o.childNodes = new p);
                    o.ownerDocument = t;
                    switch (o.nodeType) {
                        case 1:
                            var u = n.attributes, c = o.attributes = new m, l = u.length;
                            c._ownerElement = o;
                            for (var s = 0; s < l; s++) o.setAttributeNode(e(t, u.item(s), !0));
                            break;
                        case 2:
                            r = !0
                    }
                    if (r) for (var f = n.firstChild; f;) o.appendChild(e(t, f, r)), f = f.nextSibling;
                    return o
                }(this.ownerDocument || this, this, e)
            },
            normalize: function () {
                for (var e = this.firstChild; e;) {
                    var t = e.nextSibling;
                    t && 3 == t.nodeType && 3 == e.nodeType ? (this.removeChild(t), e.appendData(t.data)) : (e.normalize(), e = t)
                }
            },
            isSupported: function (e, t) {
                return this.ownerDocument.implementation.hasFeature(e, t)
            },
            hasAttributes: function () {
                return 0 < this.attributes.length
            },
            lookupPrefix: function (e) {
                for (var t = this; t;) {
                    var n = t._nsMap;
                    if (n) for (var r in n) if (n[r] == e) return r;
                    t = 2 == t.nodeType ? t.ownerDocument : t.parentNode
                }
                return null
            },
            lookupNamespaceURI: function (e) {
                for (var t = this; t;) {
                    var n = t._nsMap;
                    if (n && e in n) return n[e];
                    t = 2 == t.nodeType ? t.ownerDocument : t.parentNode
                }
                return null
            },
            isDefaultNamespace: function (e) {
                return null == this.lookupPrefix(e)
            }
        }, t(o, E), t(o, E.prototype), _.prototype = {
            nodeName: "#document",
            nodeType: 9,
            doctype: null,
            documentElement: null,
            _inc: 1,
            insertBefore: function (e, t) {
                if (11 == e.nodeType) for (var n = e.firstChild; n;) {
                    var r = n.nextSibling;
                    this.insertBefore(n, t), n = r
                } else null == this.documentElement && 1 == e.nodeType && (this.documentElement = e), N(this, e, t), e.ownerDocument = this;
                return e
            },
            removeChild: function (e) {
                return this.documentElement == e && (this.documentElement = null), w(this, e)
            },
            importNode: function (e, t) {
                return function e(t, n, r) {
                    var o;
                    switch (n.nodeType) {
                        case 1:
                            (o = n.cloneNode(!1)).ownerDocument = t;
                        case 11:
                            break;
                        case 2:
                            r = !0
                    }
                    o = o || n.cloneNode(!1);
                    o.ownerDocument = t;
                    o.parentNode = null;
                    if (r) for (var i = n.firstChild; i;) o.appendChild(e(t, i, r)), i = i.nextSibling;
                    return o
                }(this, e, t)
            },
            getElementById: function (t) {
                var n = null;
                return v(this.documentElement, function (e) {
                    if (1 == e.nodeType && e.getAttribute("id") == t) return n = e, !0
                }), n
            },
            createElement: function (e) {
                var t = new S;
                return t.ownerDocument = this, t.nodeName = e, t.tagName = e, t.childNodes = new p, (t.attributes = new m)._ownerElement = t
            },
            createDocumentFragment: function () {
                var e = new D;
                return e.ownerDocument = this, e.childNodes = new p, e
            },
            createTextNode: function (e) {
                var t = new O;
                return t.ownerDocument = this, t.appendData(e), t
            },
            createComment: function (e) {
                var t = new P;
                return t.ownerDocument = this, t.appendData(e), t
            },
            createCDATASection: function (e) {
                var t = new I;
                return t.ownerDocument = this, t.appendData(e), t
            },
            createProcessingInstruction: function (e, t) {
                var n = new L;
                return n.ownerDocument = this, n.tagName = n.target = e, n.nodeValue = n.data = t, n
            },
            createAttribute: function (e) {
                var t = new R;
                return t.ownerDocument = this, t.name = e, t.nodeName = e, t.localName = e, t.specified = !0, t
            },
            createEntityReference: function (e) {
                var t = new C;
                return t.ownerDocument = this, t.nodeName = e, t
            },
            createElementNS: function (e, t) {
                var n = new S, r = t.split(":"), o = n.attributes = new m;
                return n.childNodes = new p, n.ownerDocument = this, n.nodeName = t, n.tagName = t, n.namespaceURI = e, 2 == r.length ? (n.prefix = r[0], n.localName = r[1]) : n.localName = t, o._ownerElement = n
            },
            createAttributeNS: function (e, t) {
                var n = new R, r = t.split(":");
                return n.ownerDocument = this, n.nodeName = t, n.name = t, n.namespaceURI = e, n.specified = !0, 2 == r.length ? (n.prefix = r[0], n.localName = r[1]) : n.localName = t, n
            }
        }, n(_, E), _.prototype.getElementsByTagName = (S.prototype = {
            nodeType: 1, hasAttribute: function (e) {
                return null != this.getAttributeNode(e)
            }, getAttribute: function (e) {
                e = this.getAttributeNode(e);
                return e && e.value || ""
            }, getAttributeNode: function (e) {
                return this.attributes.getNamedItem(e)
            }, setAttribute: function (e, t) {
                e = this.ownerDocument.createAttribute(e);
                e.value = e.nodeValue = "" + t, this.setAttributeNode(e)
            }, removeAttribute: function (e) {
                e = this.getAttributeNode(e);
                e && this.removeAttributeNode(e)
            }, appendChild: function (e) {
                return 11 === e.nodeType ? this.insertBefore(e, null) : (t = this, (n = (e = e).parentNode) && (r = t.lastChild, n.removeChild(e), r = t.lastChild), r = t.lastChild, e.parentNode = t, e.previousSibling = r, e.nextSibling = null, r ? r.nextSibling = e : t.firstChild = e, t.lastChild = e, g(t.ownerDocument, t, e), e);
                var t, n, r
            }, setAttributeNode: function (e) {
                return this.attributes.setNamedItem(e)
            }, setAttributeNodeNS: function (e) {
                return this.attributes.setNamedItemNS(e)
            }, removeAttributeNode: function (e) {
                return this.attributes.removeNamedItem(e.nodeName)
            }, removeAttributeNS: function (e, t) {
                e = this.getAttributeNodeNS(e, t);
                e && this.removeAttributeNode(e)
            }, hasAttributeNS: function (e, t) {
                return null != this.getAttributeNodeNS(e, t)
            }, getAttributeNS: function (e, t) {
                e = this.getAttributeNodeNS(e, t);
                return e && e.value || ""
            }, setAttributeNS: function (e, t, n) {
                e = this.ownerDocument.createAttributeNS(e, t);
                e.value = e.nodeValue = "" + n, this.setAttributeNode(e)
            }, getAttributeNodeNS: function (e, t) {
                return this.attributes.getNamedItemNS(e, t)
            }, getElementsByTagName: function (r) {
                return new c(this, function (t) {
                    var n = [];
                    return v(t, function (e) {
                        e === t || 1 != e.nodeType || "*" !== r && e.tagName != r || n.push(e)
                    }), n
                })
            }, getElementsByTagNameNS: function (r, o) {
                return new c(this, function (t) {
                    var n = [];
                    return v(t, function (e) {
                        e === t || 1 !== e.nodeType || "*" !== r && e.namespaceURI !== r || "*" !== o && e.localName != o || n.push(e)
                    }), n
                })
            }
        }).getElementsByTagName, _.prototype.getElementsByTagNameNS = S.prototype.getElementsByTagNameNS, n(S, E), R.prototype.nodeType = 2, n(R, E), A.prototype = {
            data: "",
            substringData: function (e, t) {
                return this.data.substring(e, e + t)
            },
            appendData: function (e) {
                e = this.data + e, this.nodeValue = this.data = e, this.length = e.length
            },
            insertData: function (e, t) {
                this.replaceData(e, 0, t)
            },
            appendChild: function (e) {
                throw new Error(a[3])
            },
            deleteData: function (e, t) {
                this.replaceData(e, t, "")
            },
            replaceData: function (e, t, n) {
                var r = this.data.substring(0, e), e = this.data.substring(e + t);
                this.nodeValue = this.data = n = r + n + e, this.length = n.length
            }
        }, n(A, E), O.prototype = {
            nodeName: "#text", nodeType: 3, splitText: function (e) {
                var t = (n = this.data).substring(e), n = n.substring(0, e),
                    e = (this.data = this.nodeValue = n, this.length = n.length, this.ownerDocument.createTextNode(t));
                return this.parentNode && this.parentNode.insertBefore(e, this.nextSibling), e
            }
        }, n(O, A), P.prototype = {
            nodeName: "#comment",
            nodeType: 8
        }, n(P, A), I.prototype = {
            nodeName: "#cdata-section",
            nodeType: 4
        }, n(I, A), M.prototype.nodeType = 10, n(M, E), F.prototype.nodeType = 12, n(F, E), B.prototype.nodeType = 6, n(B, E), C.prototype.nodeType = 5, n(C, E), D.prototype.nodeName = "#document-fragment", D.prototype.nodeType = 11, n(D, E), L.prototype.nodeType = 7, n(L, E), H.prototype.serializeToString = function (e, t, n) {
            return k.call(e, t, n)
        }, E.prototype.toString = k;
        try {
            Object.defineProperty && (r = function e(t) {
                switch (t.nodeType) {
                    case 1:
                    case 11:
                        var n = [];
                        for (t = t.firstChild; t;) 7 !== t.nodeType && 8 !== t.nodeType && n.push(e(t)), t = t.nextSibling;
                        return n.join("");
                    default:
                        return t.nodeValue
                }
            }, Object.defineProperty(c.prototype, "length", {
                get: function () {
                    return l(this), this.$$length
                }
            }), Object.defineProperty(E.prototype, "textContent", {
                get: function () {
                    return r(this)
                }, set: function (e) {
                    switch (this.nodeType) {
                        case 1:
                        case 11:
                            for (; this.firstChild;) this.removeChild(this.firstChild);
                            (e || String(e)) && this.appendChild(this.ownerDocument.createTextNode(e));
                            break;
                        default:
                            this.data = e, this.value = e, this.nodeValue = e
                    }
                }
            }), X = function (e, t, n) {
                e["$$" + t] = n
            })
        } catch (e) {
        }
        e.DOMImplementation = h, e.XMLSerializer = H
    }, {}], 3: [function (e, t, n) {
        "use strict";
        n.entityMap = {
            lt: "<",
            gt: ">",
            amp: "&",
            quot: '"',
            apos: "'",
            Agrave: "À",
            Aacute: "Á",
            Acirc: "Â",
            Atilde: "Ã",
            Auml: "Ä",
            Aring: "Å",
            AElig: "Æ",
            Ccedil: "Ç",
            Egrave: "È",
            Eacute: "É",
            Ecirc: "Ê",
            Euml: "Ë",
            Igrave: "Ì",
            Iacute: "Í",
            Icirc: "Î",
            Iuml: "Ï",
            ETH: "Ð",
            Ntilde: "Ñ",
            Ograve: "Ò",
            Oacute: "Ó",
            Ocirc: "Ô",
            Otilde: "Õ",
            Ouml: "Ö",
            Oslash: "Ø",
            Ugrave: "Ù",
            Uacute: "Ú",
            Ucirc: "Û",
            Uuml: "Ü",
            Yacute: "Ý",
            THORN: "Þ",
            szlig: "ß",
            agrave: "à",
            aacute: "á",
            acirc: "â",
            atilde: "ã",
            auml: "ä",
            aring: "å",
            aelig: "æ",
            ccedil: "ç",
            egrave: "è",
            eacute: "é",
            ecirc: "ê",
            euml: "ë",
            igrave: "ì",
            iacute: "í",
            icirc: "î",
            iuml: "ï",
            eth: "ð",
            ntilde: "ñ",
            ograve: "ò",
            oacute: "ó",
            ocirc: "ô",
            otilde: "õ",
            ouml: "ö",
            oslash: "ø",
            ugrave: "ù",
            uacute: "ú",
            ucirc: "û",
            uuml: "ü",
            yacute: "ý",
            thorn: "þ",
            yuml: "ÿ",
            nbsp: " ",
            iexcl: "¡",
            cent: "¢",
            pound: "£",
            curren: "¤",
            yen: "¥",
            brvbar: "¦",
            sect: "§",
            uml: "¨",
            copy: "©",
            ordf: "ª",
            laquo: "«",
            not: "¬",
            shy: "­­",
            reg: "®",
            macr: "¯",
            deg: "°",
            plusmn: "±",
            sup2: "²",
            sup3: "³",
            acute: "´",
            micro: "µ",
            para: "¶",
            middot: "·",
            cedil: "¸",
            sup1: "¹",
            ordm: "º",
            raquo: "»",
            frac14: "¼",
            frac12: "½",
            frac34: "¾",
            iquest: "¿",
            times: "×",
            divide: "÷",
            forall: "∀",
            part: "∂",
            exist: "∃",
            empty: "∅",
            nabla: "∇",
            isin: "∈",
            notin: "∉",
            ni: "∋",
            prod: "∏",
            sum: "∑",
            minus: "−",
            lowast: "∗",
            radic: "√",
            prop: "∝",
            infin: "∞",
            ang: "∠",
            and: "∧",
            or: "∨",
            cap: "∩",
            cup: "∪",
            int: "∫",
            there4: "∴",
            sim: "∼",
            cong: "≅",
            asymp: "≈",
            ne: "≠",
            equiv: "≡",
            le: "≤",
            ge: "≥",
            sub: "⊂",
            sup: "⊃",
            nsub: "⊄",
            sube: "⊆",
            supe: "⊇",
            oplus: "⊕",
            otimes: "⊗",
            perp: "⊥",
            sdot: "⋅",
            Alpha: "Α",
            Beta: "Β",
            Gamma: "Γ",
            Delta: "Δ",
            Epsilon: "Ε",
            Zeta: "Ζ",
            Eta: "Η",
            Theta: "Θ",
            Iota: "Ι",
            Kappa: "Κ",
            Lambda: "Λ",
            Mu: "Μ",
            Nu: "Ν",
            Xi: "Ξ",
            Omicron: "Ο",
            Pi: "Π",
            Rho: "Ρ",
            Sigma: "Σ",
            Tau: "Τ",
            Upsilon: "Υ",
            Phi: "Φ",
            Chi: "Χ",
            Psi: "Ψ",
            Omega: "Ω",
            alpha: "α",
            beta: "β",
            gamma: "γ",
            delta: "δ",
            epsilon: "ε",
            zeta: "ζ",
            eta: "η",
            theta: "θ",
            iota: "ι",
            kappa: "κ",
            lambda: "λ",
            mu: "μ",
            nu: "ν",
            xi: "ξ",
            omicron: "ο",
            pi: "π",
            rho: "ρ",
            sigmaf: "ς",
            sigma: "σ",
            tau: "τ",
            upsilon: "υ",
            phi: "φ",
            chi: "χ",
            psi: "ψ",
            omega: "ω",
            thetasym: "ϑ",
            upsih: "ϒ",
            piv: "ϖ",
            OElig: "Œ",
            oelig: "œ",
            Scaron: "Š",
            scaron: "š",
            Yuml: "Ÿ",
            fnof: "ƒ",
            circ: "ˆ",
            tilde: "˜",
            ensp: " ",
            emsp: " ",
            thinsp: " ",
            zwnj: "‌",
            zwj: "‍",
            lrm: "‎",
            rlm: "‏",
            ndash: "–",
            mdash: "—",
            lsquo: "‘",
            rsquo: "’",
            sbquo: "‚",
            ldquo: "“",
            rdquo: "”",
            bdquo: "„",
            dagger: "†",
            Dagger: "‡",
            bull: "•",
            hellip: "…",
            permil: "‰",
            prime: "′",
            Prime: "″",
            lsaquo: "‹",
            rsaquo: "›",
            oline: "‾",
            euro: "€",
            trade: "™",
            larr: "←",
            uarr: "↑",
            rarr: "→",
            darr: "↓",
            harr: "↔",
            crarr: "↵",
            lceil: "⌈",
            rceil: "⌉",
            lfloor: "⌊",
            rfloor: "⌋",
            loz: "◊",
            spades: "♠",
            clubs: "♣",
            hearts: "♥",
            diams: "♦"
        }
    }, {}], 4: [function (e, t, n) {
        "use strict";
        var r = /[A-Z_a-z\xC0-\xD6\xD8-\xF6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/,
            o = new RegExp("[\\-\\.0-9" + r.source.slice(1, -1) + "\\u00B7\\u0300-\\u036F\\u203F-\\u2040]"),
            i = new RegExp("^" + r.source + o.source + "*(?::" + r.source + o.source + "*)?$"), I = 0, M = 1, C = 2,
            D = 3, L = 4, x = 5, j = 6, U = 7;

        function a() {
        }

        function F(e, t) {
            return t.lineNumber = e.lineNumber, t.columnNumber = e.columnNumber, t
        }

        function B(e, t, n) {
            for (var r = e.tagName, o = null, i = e.length; i--;) {
                var a = e[i], u = a.qName, c = a.value,
                    u = 0 < (s = u.indexOf(":")) ? (l = a.prefix = u.slice(0, s), f = u.slice(s + 1), "xmlns" === l && f) : (l = null, "xmlns" === (f = u) && "");
                a.localName = f, !1 !== u && (null == o && (o = {}, p(n, n = {})), n[u] = o[u] = c, a.uri = "http://www.w3.org/2000/xmlns/", t.startPrefixMapping(u, c))
            }
            for (var l, i = e.length; i--;) (l = (a = e[i]).prefix) && ("xml" === l && (a.uri = "http://www.w3.org/XML/1998/namespace"), "xmlns" !== l) && (a.uri = n[l || ""]);
            var s,
                f = 0 < (s = r.indexOf(":")) ? (l = e.prefix = r.slice(0, s), e.localName = r.slice(s + 1)) : (l = null, e.localName = r),
                d = e.uri = n[l || ""];
            if (t.startElement(d, f, r, e), !e.closed) return e.currentNSMap = n, e.localNSMap = o, 1;
            if (t.endElement(d, f, r), o) for (l in o) t.endPrefixMapping(l)
        }

        function p(e, t) {
            for (var n in e) t[n] = e[n]
        }

        function H(e) {
        }

        a.prototype = {
            parse: function (e, t, n) {
                var r = this.domBuilder;
                r.startDocument(), p(t, t = {}), function (n, e, r, o, i) {
                    function a(e) {
                        var t = e.slice(1, -1);
                        return t in r ? r[t] : "#" === t.charAt(0) ? 65535 < (t = parseInt(t.substr(1).replace("x", "0x"))) ? (t -= 65536, String.fromCharCode(55296 + (t >> 10), 56320 + (1023 & t))) : String.fromCharCode(t) : (i.error("entity not found:" + e), e)
                    }

                    function t(e) {
                        var t;
                        m < e && (t = n.substring(m, e).replace(/&#?\w+;/g, a), f && u(m), o.characters(t, 0, e - m), m = e)
                    }

                    function u(e, t) {
                        for (; l <= e && (t = s.exec(n));) c = t.index, l = c + t[0].length, f.lineNumber++;
                        f.columnNumber = e - c + 1
                    }

                    var c = 0, l = 0, s = /.*(?:\r\n?|\n)|.*$/g, f = o.locator, d = [{currentNSMap: e}], p = {}, m = 0;
                    for (; ;) {
                        try {
                            var y, h, E = n.indexOf("<", m);
                            if (E < 0) return n.substr(m).match(/^\s*$/) || (y = o.doc, h = y.createTextNode(n.substr(m)), y.appendChild(h), o.currentElement = h);
                            switch (m < E && t(E), n.charAt(E + 1)) {
                                case"/":
                                    var b = n.indexOf(">", E + 3), v = n.substring(E + 2, b), _ = d.pop(),
                                        T = (b < 0 ? (v = n.substring(E + 2).replace(/[\s<].*/, ""), i.error("end tag name: " + v + " is not complete:" + _.tagName), b = E + 1 + v.length) : v.match(/\s</) && (v = v.replace(/[\s<].*/, ""), i.error("end tag name: " + v + " maybe not complete"), b = E + 1 + v.length), _.localNSMap),
                                        g = _.tagName == v;
                                    if (g || _.tagName && _.tagName.toLowerCase() == v.toLowerCase()) {
                                        if (o.endElement(_.uri, _.localName, v), T) for (var w in T) o.endPrefixMapping(w);
                                        g || i.fatalError("end tag name: " + v + " is not match the current start tagName:" + _.tagName)
                                    } else d.push(_);
                                    b++;
                                    break;
                                case"?":
                                    f && u(E), b = function (e, t, n) {
                                        var r = e.indexOf("?>", t);
                                        if (r) {
                                            e = e.substring(t, r).match(/^<\?(\S*)\s*([\s\S]*?)\s*$/);
                                            if (e) return e[0].length, n.processingInstruction(e[1], e[2]), r + 2
                                        }
                                        return -1
                                    }(n, E, o);
                                    break;
                                case"!":
                                    f && u(E), b = function (e, t, n, r) {
                                        {
                                            if ("-" === e.charAt(t + 2)) return "-" === e.charAt(t + 3) ? (i = e.indexOf("--\x3e", t + 4), t < i ? (n.comment(e, t + 4, i - t - 4), i + 3) : (r.error("Unclosed comment"), -1)) : -1;
                                            if ("CDATA[" == e.substr(t + 3, 6)) return i = e.indexOf("]]>", t + 9), n.startCDATA(), n.characters(e, t + 9, i - t - 9), n.endCDATA(), i + 3;
                                            var o, r = function (e, t) {
                                                var n, r = [], o = /'[^']+'|"[^"]+"|[^\s<>\/=]+=?|(\/?\s*>|<)/g;
                                                o.lastIndex = t, o.exec(e);
                                                for (; n = o.exec(e);) if (r.push(n), n[1]) return r
                                            }(e, t), i = r.length;
                                            if (1 < i && /!doctype/i.test(r[0][0])) return e = r[1][0], t = 3 < i && /^public$/i.test(r[2][0]) && r[3][0], o = 4 < i && r[4][0], r = r[i - 1], n.startDTD(e, t && t.replace(/^(['"])(.*?)\1$/, "$2"), o && o.replace(/^(['"])(.*?)\1$/, "$2")), n.endDTD(), r.index + r[0].length
                                        }
                                        return -1
                                    }(n, E, o, i);
                                    break;
                                default:
                                    f && u(E);
                                    var N = new H, S = d[d.length - 1].currentNSMap, b = function (e, t, n, r, o, i) {
                                        var a, u = ++t, c = I;
                                        for (; ;) {
                                            var l = e.charAt(u);
                                            switch (l) {
                                                case"=":
                                                    if (c === M) a = e.slice(t, u); else if (c !== C) throw new Error("attribute equal must after attrName");
                                                    c = D;
                                                    break;
                                                case"'":
                                                case'"':
                                                    if (c === D || c === M) {
                                                        if (c === M && (i.warning('attribute value must after "="'), a = e.slice(t, u)), t = u + 1, !(0 < (u = e.indexOf(l, t)))) throw new Error("attribute value no end '" + l + "' match");
                                                        s = e.slice(t, u).replace(/&#?\w+;/g, o), n.add(a, s, t - 1)
                                                    } else {
                                                        if (c != L) throw new Error('attribute value must after "="');
                                                        s = e.slice(t, u).replace(/&#?\w+;/g, o), n.add(a, s, t), i.warning('attribute "' + a + '" missed start quot(' + l + ")!!"), t = u + 1
                                                    }
                                                    c = x;
                                                    break;
                                                case"/":
                                                    switch (c) {
                                                        case I:
                                                            n.setTagName(e.slice(t, u));
                                                        case x:
                                                        case j:
                                                        case U:
                                                            c = U, n.closed = !0;
                                                        case L:
                                                        case M:
                                                        case C:
                                                            break;
                                                        default:
                                                            throw new Error("attribute invalid close char('/')")
                                                    }
                                                    break;
                                                case"":
                                                    return i.error("unexpected end of input"), c == I && n.setTagName(e.slice(t, u)), u;
                                                case">":
                                                    switch (c) {
                                                        case I:
                                                            n.setTagName(e.slice(t, u));
                                                        case x:
                                                        case j:
                                                        case U:
                                                            break;
                                                        case L:
                                                        case M:
                                                            "/" === (s = e.slice(t, u)).slice(-1) && (n.closed = !0, s = s.slice(0, -1));
                                                        case C:
                                                            c === C && (s = a), c == L ? (i.warning('attribute "' + s + '" missed quot(")!!'), n.add(a, s.replace(/&#?\w+;/g, o), t)) : ("http://www.w3.org/1999/xhtml" === r[""] && s.match(/^(?:disabled|checked|selected)$/i) || i.warning('attribute "' + s + '" missed value!! "' + s + '" instead!!'), n.add(s, s, t));
                                                            break;
                                                        case D:
                                                            throw new Error("attribute value missed!!")
                                                    }
                                                    return u;
                                                case"":
                                                    l = " ";
                                                default:
                                                    if (l <= " ") switch (c) {
                                                        case I:
                                                            n.setTagName(e.slice(t, u)), c = j;
                                                            break;
                                                        case M:
                                                            a = e.slice(t, u), c = C;
                                                            break;
                                                        case L:
                                                            var s = e.slice(t, u).replace(/&#?\w+;/g, o);
                                                            i.warning('attribute "' + s + '" missed quot(")!!'), n.add(a, s, t);
                                                        case x:
                                                            c = j
                                                    } else switch (c) {
                                                        case C:
                                                            n.tagName;
                                                            "http://www.w3.org/1999/xhtml" === r[""] && a.match(/^(?:disabled|checked|selected)$/i) || i.warning('attribute "' + a + '" missed value!! "' + a + '" instead2!!'), n.add(a, a, t), t = u, c = M;
                                                            break;
                                                        case x:
                                                            i.warning('attribute space is required"' + a + '"!!');
                                                        case j:
                                                            c = M, t = u;
                                                            break;
                                                        case D:
                                                            c = L, t = u;
                                                            break;
                                                        case U:
                                                            throw new Error("elements closed character '/' and '>' must be connected to")
                                                    }
                                            }
                                            u++
                                        }
                                    }(n, E, N, S, a, i), R = N.length;
                                    if (!N.closed && function (e, t, n, r) {
                                        var o = r[n];
                                        null == o && ((o = e.lastIndexOf("</" + n + ">")) < t && (o = e.lastIndexOf("</" + n)), r[n] = o);
                                        return o < t
                                    }(n, b, N.tagName, p) && (N.closed = !0, r.nbsp || i.warning("unclosed xml attribute")), f && R) {
                                        for (var A = F(f, {}), O = 0; O < R; O++) {
                                            var P = N[O];
                                            u(P.offset), P.locator = F(f, {})
                                        }
                                        o.locator = A, B(N, o, S) && d.push(N), o.locator = f
                                    } else B(N, o, S) && d.push(N);
                                    "http://www.w3.org/1999/xhtml" !== N.uri || N.closed ? b++ : b = function (e, t, n, r, o) {
                                        if (/^(?:script|textarea)$/i.test(n)) {
                                            var i = e.indexOf("</" + n + ">", t), e = e.substring(t + 1, i);
                                            if (/[&<]/.test(e)) return /^script$/i.test(n) ? o.characters(e, 0, e.length) : (e = e.replace(/&#?\w+;/g, r), o.characters(e, 0, e.length)), i
                                        }
                                        return t + 1
                                    }(n, b, N.tagName, a, o)
                            }
                        } catch (e) {
                            i.error("element parse error: " + e), b = -1
                        }
                        m < b ? m = b : t(Math.max(E, m) + 1)
                    }
                }(e, t, n, r, this.errorHandler), r.endDocument()
            }
        }, H.prototype = {
            setTagName: function (e) {
                if (!i.test(e)) throw new Error("invalid tagName:" + e);
                this.tagName = e
            }, add: function (e, t, n) {
                if (!i.test(e)) throw new Error("invalid attribute:" + e);
                this[this.length++] = {qName: e, value: t, offset: n}
            }, length: 0, getLocalName: function (e) {
                return this[e].localName
            }, getLocator: function (e) {
                return this[e].locator
            }, getQName: function (e) {
                return this[e].qName
            }, getURI: function (e) {
                return this[e].uri
            }, getValue: function (e) {
                return this[e].value
            }
        }, n.XMLReader = a
    }, {}], 5: [function (e, t, n) {
        "use strict";

        function o(e) {
            return (o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
                return typeof e
            } : function (e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
            })(e)
        }

        Object.defineProperty(n, "__esModule", {value: !0}), n.default = void 0;
        e = (e = e("./HTMLAudioElement")) && e.__esModule ? e : {default: e};

        function i(e, t) {
            for (var n = 0; n < t.length; n++) {
                var r = t[n];
                r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, function (e) {
                    e = function (e, t) {
                        if ("object" !== o(e) || null === e) return e;
                        var n = e[Symbol.toPrimitive];
                        if (void 0 === n) return ("string" === t ? String : Number)(e);
                        n = n.call(e, t || "default");
                        if ("object" !== o(n)) return n;
                        throw new TypeError("@@toPrimitive must return a primitive value.")
                    }(e, "string");
                    return "symbol" === o(e) ? e : String(e)
                }(r.key), r)
            }
        }

        function a() {
            return (a = "undefined" != typeof Reflect && Reflect.get ? Reflect.get.bind() : function (e, t, n) {
                var r = function (e, t) {
                    for (; !Object.prototype.hasOwnProperty.call(e, t) && null !== (e = l(e));) ;
                    return e
                }(e, t);
                if (r) return (r = Object.getOwnPropertyDescriptor(r, t)).get ? r.get.call(arguments.length < 3 ? e : n) : r.value
            }).apply(this, arguments)
        }

        function u(e, t) {
            return (u = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (e, t) {
                return e.__proto__ = t, e
            })(e, t)
        }

        function c(n) {
            var r = function () {
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
                var e, t = l(n),
                    t = (e = r ? (e = l(this).constructor, Reflect.construct(t, arguments, e)) : t.apply(this, arguments), this);
                if (e && ("object" === o(e) || "function" == typeof e)) return e;
                if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined");
                if (void 0 !== t) return t;
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
            }
        }

        function l(e) {
            return (l = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (e) {
                return e.__proto__ || Object.getPrototypeOf(e)
            })(e)
        }

        var s = 1, f = {}, e = function (e) {
            var t = o;
            if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
            t.prototype = Object.create(e && e.prototype, {
                constructor: {
                    value: t,
                    writable: !0,
                    configurable: !0
                }
            }), Object.defineProperty(t, "prototype", {writable: !1}), e && u(t, e);
            var n, r = c(o);

            function o(e) {
                var t;
                if (!(this instanceof o)) throw new TypeError("Cannot call a class as a function");
                (t = r.call(this))._$sn = s++, t.HAVE_NOTHING = 0, t.HAVE_METADATA = 1, t.HAVE_CURRENT_DATA = 2, t.HAVE_FUTURE_DATA = 3, t.HAVE_ENOUGH_DATA = 4, t.readyState = 0;
                var n = wx.createInnerAudioContext();
                return f[t._$sn] = n, t._canplayEvents = ["load", "loadend", "canplay", "canplaythrough", "loadedmetadata"], n.onCanplay(function () {
                    t._loaded = !0, t.readyState = t.HAVE_CURRENT_DATA, t._canplayEvents.forEach(function (e) {
                        t.dispatchEvent({type: e})
                    })
                }), n.onPlay(function () {
                    t._paused = f[t._$sn].paused, t.dispatchEvent({type: "play"})
                }), n.onPause(function () {
                    t._paused = f[t._$sn].paused, t.dispatchEvent({type: "pause"})
                }), n.onEnded(function () {
                    t._paused = f[t._$sn].paused, !1 === f[t._$sn].loop && t.dispatchEvent({type: "ended"}), t.readyState = 4
                }), n.onError(function () {
                    t._paused = f[t._$sn].paused, t.dispatchEvent({type: "error"})
                }), e ? t.src = e : t._src = "", t._loop = n.loop, t._autoplay = n.autoplay, t._paused = n.paused, t._volume = n.volume, t._muted = !1, t
            }

            return t = o, (e = [{
                key: "addEventListener", value: function (e, t) {
                    var n = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : {};
                    a(l(o.prototype), "addEventListener", this).call(this, e, t, n), e = String(e).toLowerCase(), this._loaded && -1 !== this._canplayEvents.indexOf(e) && this.dispatchEvent({type: e})
                }
            }, {
                key: "load", value: function () {
                }
            }, {
                key: "play", value: function () {
                    f[this._$sn].play()
                }
            }, {
                key: "resume", value: function () {
                    f[this._$sn].resume()
                }
            }, {
                key: "pause", value: function () {
                    f[this._$sn].pause()
                }
            }, {
                key: "stop", value: function () {
                    f[this._$sn].stop()
                }
            }, {
                key: "destroy", value: function () {
                    f[this._$sn].destroy()
                }
            }, {
                key: "canPlayType", value: function () {
                    var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : "";
                    return "string" == typeof e && (-1 < e.indexOf("audio/mpeg") || e.indexOf("audio/mp4")) ? "probably" : ""
                }
            }, {
                key: "currentTime", get: function () {
                    return f[this._$sn].currentTime
                }, set: function (e) {
                    f[this._$sn].seek(e)
                }
            }, {
                key: "duration", get: function () {
                    return f[this._$sn].duration
                }
            }, {
                key: "src", get: function () {
                    return this._src
                }, set: function (e) {
                    this._src = e, this._loaded = !1, this.readyState = this.HAVE_NOTHING, f[this._$sn].src = e
                }
            }, {
                key: "loop", get: function () {
                    return this._loop
                }, set: function (e) {
                    this._loop = e, f[this._$sn].loop = e
                }
            }, {
                key: "autoplay", get: function () {
                    return this.autoplay
                }, set: function (e) {
                    this._autoplay = e, f[this._$sn].autoplay = e
                }
            }, {
                key: "paused", get: function () {
                    return this._paused
                }
            }, {
                key: "volume", get: function () {
                    return this._volume
                }, set: function (e) {
                    this._volume = e, this._muted || (f[this._$sn].volume = e)
                }
            }, {
                key: "muted", get: function () {
                    return this._muted
                }, set: function (e) {
                    this._muted = e, f[this._$sn].volume = e ? 0 : this._volume
                }
            }, {
                key: "cloneNode", value: function () {
                    var e = new o;
                    return e.loop = this.loop, e.autoplay = this.autoplay, e.src = this.src, e
                }
            }]) && i(t.prototype, e), n && i(t, n), Object.defineProperty(t, "prototype", {writable: !1}), o
        }(e.default);
        n.default = e
    }, {"./HTMLAudioElement": 13}], 6: [function (e, t, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", {value: !0}), n.default = function () {
            var e = wx.createCanvas();
            e.type = "canvas", e.getContext;
            return e.getBoundingClientRect = function () {
                return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight}
            }, e.style = {
                top: "0px",
                left: "0px",
                width: "".concat(r.innerWidth, "px"),
                height: "".concat(r.innerHeight, "px")
            }, e.addEventListener = function (e, t) {
                var n = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : {};
                ("function" == typeof getApp ? GameGlobal.document : document).addEventListener(e, t, n)
            }, e.removeEventListener = function (e, t) {
                ("function" == typeof getApp ? GameGlobal.document : document).removeEventListener(e, t)
            }, e.dispatchEvent = function () {
                var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {};
                console.log("canvas.dispatchEvent", e.type, e)
            }, Object.defineProperty(e, "clientWidth", {
                enumerable: !0, get: function () {
                    return r.innerWidth
                }
            }), Object.defineProperty(e, "clientHeight", {
                enumerable: !0, get: function () {
                    return r.innerHeight
                }
            }), e
        };
        var r = e("./WindowProperties")
    }, {"./WindowProperties": 24}], 7: [function (e, t, n) {
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
                var r = t[n];
                r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, f(r.key), r)
            }
        }

        function u(e, t) {
            return (u = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (e, t) {
                return e.__proto__ = t, e
            })(e, t)
        }

        function c(n) {
            var r = function () {
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
                var e, t = i(n),
                    t = (e = r ? (e = i(this).constructor, Reflect.construct(t, arguments, e)) : t.apply(this, arguments), this);
                if (e && ("object" === o(e) || "function" == typeof e)) return e;
                if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined");
                return l(t)
            }
        }

        function l(e) {
            if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return e
        }

        function i(e) {
            return (i = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (e) {
                return e.__proto__ || Object.getPrototypeOf(e)
            })(e)
        }

        function s(e, t, n) {
            (t = f(t)) in e ? Object.defineProperty(e, t, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = n
        }

        function f(e) {
            e = function (e, t) {
                if ("object" !== o(e) || null === e) return e;
                var n = e[Symbol.toPrimitive];
                if (void 0 === n) return ("string" === t ? String : Number)(e);
                n = n.call(e, t || "default");
                if ("object" !== o(n)) return n;
                throw new TypeError("@@toPrimitive must return a primitive value.")
            }(e, "string");
            return "symbol" === o(e) ? e : String(e)
        }

        Object.defineProperty(n, "__esModule", {value: !0}), n.default = void 0;
        e = function (e) {
            var t = i;
            if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
            t.prototype = Object.create(e && e.prototype, {
                constructor: {
                    value: t,
                    writable: !0,
                    configurable: !0
                }
            }), Object.defineProperty(t, "prototype", {writable: !1}), e && u(t, e);
            var n, r, o = c(i);

            function i() {
                var e;
                if (this instanceof i) return s(l(e = o.call(this)), "className", ""), s(l(e), "children", []), e;
                throw new TypeError("Cannot call a class as a function")
            }

            return t = i, n && a(t.prototype, n), r && a(t, r), Object.defineProperty(t, "prototype", {writable: !1}), t
        }(((e = e("./Node")) && e.__esModule ? e : {default: e}).default);
        n.default = e
    }, {"./Node": 21}], 8: [function (e, t, n) {
        "use strict";

        function o(e) {
            return (o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
                return typeof e
            } : function (e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
            })(e)
        }

        function r(e, t) {
            for (var n = 0; n < t.length; n++) {
                var r = t[n];
                r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, function (e) {
                    e = function (e, t) {
                        if ("object" !== o(e) || null === e) return e;
                        var n = e[Symbol.toPrimitive];
                        if (void 0 === n) return ("string" === t ? String : Number)(e);
                        n = n.call(e, t || "default");
                        if ("object" !== o(n)) return n;
                        throw new TypeError("@@toPrimitive must return a primitive value.")
                    }(e, "string");
                    return "symbol" === o(e) ? e : String(e)
                }(r.key), r)
            }
        }

        function i(e, t, n) {
            return t && r(e.prototype, t), n && r(e, n), Object.defineProperty(e, "prototype", {writable: !1}), e
        }

        Object.defineProperty(n, "__esModule", {value: !0}), n.default = void 0, n.default = i(function e() {
            if (!(this instanceof e)) throw new TypeError("Cannot call a class as a function")
        })
    }, {}], 9: [function (e, t, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", {value: !0}), n.default = void 0;
        var r = e("../util/index.js");

        function o(e) {
            return (o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
                return typeof e
            } : function (e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
            })(e)
        }

        function i(e, t) {
            for (var n = 0; n < t.length; n++) {
                var r = t[n];
                r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, c(r.key), r)
            }
        }

        function a(e, t, n) {
            return t && i(e.prototype, t), n && i(e, n), Object.defineProperty(e, "prototype", {writable: !1}), e
        }

        function u(e, t, n) {
            (t = c(t)) in e ? Object.defineProperty(e, t, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = n
        }

        function c(e) {
            e = function (e, t) {
                if ("object" !== o(e) || null === e) return e;
                var n = e[Symbol.toPrimitive];
                if (void 0 === n) return ("string" === t ? String : Number)(e);
                n = n.call(e, t || "default");
                if ("object" !== o(n)) return n;
                throw new TypeError("@@toPrimitive must return a primitive value.")
            }(e, "string");
            return "symbol" === o(e) ? e : String(e)
        }

        var l = a(function e(t) {
            if (!(this instanceof e)) throw new TypeError("Cannot call a class as a function");
            u(this, "touches", []), u(this, "targetTouches", []), u(this, "changedTouches", []), u(this, "preventDefault", r.noop), u(this, "stopPropagation", r.noop), this.type = t, this.target = window.canvas, this.currentTarget = window.canvas
        });

        function s(n) {
            return function (e) {
                var t = new l(n);
                t.touches = e.touches, t.targetTouches = Array.prototype.slice.call(e.touches), t.changedTouches = e.changedTouches, t.timeStamp = e.timeStamp, ("function" == typeof getApp ? GameGlobal.document : document).dispatchEvent(t)
            }
        }

        n.default = l, wx.onTouchStart(s("touchstart")), wx.onTouchMove(s("touchmove")), wx.onTouchEnd(s("touchend")), wx.onTouchCancel(s("touchcancel"))
    }, {"../util/index.js": 31}], 10: [function (e, t, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", {value: !0}), Object.defineProperty(n, "MouseEvent", {
            enumerable: !0,
            get: function () {
                return o.default
            }
        }), Object.defineProperty(n, "TouchEvent", {
            enumerable: !0, get: function () {
                return r.default
            }
        });
        var r = i(e("./TouchEvent")), o = i(e("./MouseEvent"));

        function i(e) {
            return e && e.__esModule ? e : {default: e}
        }
    }, {"./MouseEvent": 8, "./TouchEvent": 9}], 11: [function (e, t, n) {
        "use strict";

        function o(e) {
            return (o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
                return typeof e
            } : function (e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
            })(e)
        }

        function i(e, t) {
            for (var n = 0; n < t.length; n++) {
                var r = t[n];
                r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, function (e) {
                    e = function (e, t) {
                        if ("object" !== o(e) || null === e) return e;
                        var n = e[Symbol.toPrimitive];
                        if (void 0 === n) return ("string" === t ? String : Number)(e);
                        n = n.call(e, t || "default");
                        if ("object" !== o(n)) return n;
                        throw new TypeError("@@toPrimitive must return a primitive value.")
                    }(e, "string");
                    return "symbol" === o(e) ? e : String(e)
                }(r.key), r)
            }
        }

        Object.defineProperty(n, "__esModule", {value: !0}), n.default = void 0;
        var a = new WeakMap, r = function () {
            function e() {
                if (!(this instanceof e)) throw new TypeError("Cannot call a class as a function");
                a.set(this, {})
            }

            var t, n, r;
            return t = e, (n = [{
                key: "addEventListener", value: function (e, t) {
                    var n = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : {}, r = a.get(this);
                    r || a.set(this, r = {}), r[e] || (r[e] = []), r[e].push(t), n.capture, n.once, n.passive
                }
            }, {
                key: "removeEventListener", value: function (e, t) {
                    var n = a.get(this);
                    if (n) {
                        var r = n[e];
                        if (r && 0 < r.length) for (var o = r.length; o--;) if (r[o] === t) {
                            r.splice(o, 1);
                            break
                        }
                    }
                }
            }, {
                key: "dispatchEvent", value: function () {
                    var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {},
                        t = a.get(this)[e.type];
                    if (t) for (var n = 0; n < t.length; n++) t[n](e)
                }
            }]) && i(t.prototype, n), r && i(t, r), Object.defineProperty(t, "prototype", {writable: !1}), e
        }();
        n.default = r
    }, {}], 12: [function (e, t, n) {
        "use strict";

        function o(e) {
            return (o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
                return typeof e
            } : function (e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
            })(e)
        }

        function i(e, t) {
            for (var n = 0; n < t.length; n++) {
                var r = t[n];
                r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, function (e) {
                    e = function (e, t) {
                        if ("object" !== o(e) || null === e) return e;
                        var n = e[Symbol.toPrimitive];
                        if (void 0 === n) return ("string" === t ? String : Number)(e);
                        n = n.call(e, t || "default");
                        if ("object" !== o(n)) return n;
                        throw new TypeError("@@toPrimitive must return a primitive value.")
                    }(e, "string");
                    return "symbol" === o(e) ? e : String(e)
                }(r.key), r)
            }
        }

        Object.defineProperty(n, "__esModule", {value: !0}), n.default = void 0;
        var r = function () {
            function e() {
                if (!(this instanceof e)) throw new TypeError("Cannot call a class as a function")
            }

            var t, n, r;
            return t = e, (n = [{
                key: "construct", value: function () {
                }
            }]) && i(t.prototype, n), r && i(t, r), Object.defineProperty(t, "prototype", {writable: !1}), e
        }();
        n.default = r
    }, {}], 13: [function (e, t, n) {
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
                var r = t[n];
                r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, function (e) {
                    e = function (e, t) {
                        if ("object" !== o(e) || null === e) return e;
                        var n = e[Symbol.toPrimitive];
                        if (void 0 === n) return ("string" === t ? String : Number)(e);
                        n = n.call(e, t || "default");
                        if ("object" !== o(n)) return n;
                        throw new TypeError("@@toPrimitive must return a primitive value.")
                    }(e, "string");
                    return "symbol" === o(e) ? e : String(e)
                }(r.key), r)
            }
        }

        function u(e, t) {
            return (u = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (e, t) {
                return e.__proto__ = t, e
            })(e, t)
        }

        function c(n) {
            var r = function () {
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
                var e, t = i(n),
                    t = (e = r ? (e = i(this).constructor, Reflect.construct(t, arguments, e)) : t.apply(this, arguments), this);
                if (e && ("object" === o(e) || "function" == typeof e)) return e;
                if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined");
                if (void 0 !== t) return t;
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
            }
        }

        function i(e) {
            return (i = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (e) {
                return e.__proto__ || Object.getPrototypeOf(e)
            })(e)
        }

        Object.defineProperty(n, "__esModule", {value: !0}), n.default = void 0;
        e = function (e) {
            var t = i;
            if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
            t.prototype = Object.create(e && e.prototype, {
                constructor: {
                    value: t,
                    writable: !0,
                    configurable: !0
                }
            }), Object.defineProperty(t, "prototype", {writable: !1}), e && u(t, e);
            var n, r, o = c(i);

            function i() {
                if (this instanceof i) return o.call(this, "audio");
                throw new TypeError("Cannot call a class as a function")
            }

            return t = i, n && a(t.prototype, n), r && a(t, r), Object.defineProperty(t, "prototype", {writable: !1}), t
        }(((e = e("./HTMLMediaElement")) && e.__esModule ? e : {default: e}).default);
        n.default = e
    }, {"./HTMLMediaElement": 17}], 14: [function (e, t, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", {value: !0}), n.default = void 0;
        e = (e = e("./Canvas")) && e.__esModule ? e : {default: e};
        GameGlobal.screencanvas = GameGlobal.screencanvas || new e.default;
        e = GameGlobal.screencanvas.constructor;
        n.default = e
    }, {"./Canvas": 6}], 15: [function (e, t, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", {value: !0}), n.default = void 0;
        var r = (r = e("./Element")) && r.__esModule ? r : {default: r}, i = e("./util/index.js"),
            a = e("./WindowProperties");

        function o(e) {
            return (o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
                return typeof e
            } : function (e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
            })(e)
        }

        function u(e, t) {
            for (var n = 0; n < t.length; n++) {
                var r = t[n];
                r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, p(r.key), r)
            }
        }

        function c(e, t) {
            return (c = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (e, t) {
                return e.__proto__ = t, e
            })(e, t)
        }

        function l(n) {
            var r = function () {
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
                var e, t = f(n),
                    t = (e = r ? (e = f(this).constructor, Reflect.construct(t, arguments, e)) : t.apply(this, arguments), this);
                if (e && ("object" === o(e) || "function" == typeof e)) return e;
                if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined");
                return s(t)
            }
        }

        function s(e) {
            if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return e
        }

        function f(e) {
            return (f = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (e) {
                return e.__proto__ || Object.getPrototypeOf(e)
            })(e)
        }

        function d(e, t, n) {
            (t = p(t)) in e ? Object.defineProperty(e, t, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = n
        }

        function p(e) {
            e = function (e, t) {
                if ("object" !== o(e) || null === e) return e;
                var n = e[Symbol.toPrimitive];
                if (void 0 === n) return ("string" === t ? String : Number)(e);
                n = n.call(e, t || "default");
                if ("object" !== o(n)) return n;
                throw new TypeError("@@toPrimitive must return a primitive value.")
            }(e, "string");
            return "symbol" === o(e) ? e : String(e)
        }

        e = function (e) {
            var t = o;
            if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
            t.prototype = Object.create(e && e.prototype, {
                constructor: {
                    value: t,
                    writable: !0,
                    configurable: !0
                }
            }), Object.defineProperty(t, "prototype", {writable: !1}), e && c(t, e);
            var n, r = l(o);

            function o() {
                var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : "", t = this, n = o;
                if (t instanceof n) return d(s(t = r.call(this)), "className", ""), d(s(t), "childern", []), d(s(t), "style", {
                    width: "".concat(a.innerWidth, "px"),
                    height: "".concat(a.innerHeight, "px")
                }), d(s(t), "insertBefore", i.noop), d(s(t), "innerHTML", ""), t.tagName = e.toUpperCase(), t;
                throw new TypeError("Cannot call a class as a function")
            }

            return t = o, (e = [{
                key: "setAttribute", value: function (e, t) {
                    this[e] = t
                }
            }, {
                key: "getAttribute", value: function (e) {
                    return this[e]
                }
            }, {
                key: "clientWidth", get: function () {
                    var e = parseInt(this.style.fontSize, 10) * this.innerHTML.length;
                    return Number.isNaN(e) ? 0 : e
                }
            }, {
                key: "clientHeight", get: function () {
                    var e = parseInt(this.style.fontSize, 10);
                    return Number.isNaN(e) ? 0 : e
                }
            }, {
                key: "getBoundingClientRect", value: function () {
                    return {top: 0, left: 0, width: a.innerWidth, height: a.innerHeight}
                }
            }, {
                key: "focus", value: function () {
                }
            }]) && u(t.prototype, e), n && u(t, n), Object.defineProperty(t, "prototype", {writable: !1}), o
        }(r.default);
        n.default = e
    }, {"./Element": 7, "./WindowProperties": 24, "./util/index.js": 31}], 16: [function (e, t, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", {value: !0}), n.default = void 0;
        var r = wx.createImage().constructor;
        n.default = r
    }, {}], 17: [function (e, t, n) {
        "use strict";

        function o(e) {
            return (o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
                return typeof e
            } : function (e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
            })(e)
        }

        function i(e, t) {
            for (var n = 0; n < t.length; n++) {
                var r = t[n];
                r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, function (e) {
                    e = function (e, t) {
                        if ("object" !== o(e) || null === e) return e;
                        var n = e[Symbol.toPrimitive];
                        if (void 0 === n) return ("string" === t ? String : Number)(e);
                        n = n.call(e, t || "default");
                        if ("object" !== o(n)) return n;
                        throw new TypeError("@@toPrimitive must return a primitive value.")
                    }(e, "string");
                    return "symbol" === o(e) ? e : String(e)
                }(r.key), r)
            }
        }

        function a(e, t) {
            return (a = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (e, t) {
                return e.__proto__ = t, e
            })(e, t)
        }

        function u(n) {
            var r = function () {
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
                var e, t = c(n),
                    t = (e = r ? (e = c(this).constructor, Reflect.construct(t, arguments, e)) : t.apply(this, arguments), this);
                if (e && ("object" === o(e) || "function" == typeof e)) return e;
                if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined");
                if (void 0 !== t) return t;
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
            }
        }

        function c(e) {
            return (c = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (e) {
                return e.__proto__ || Object.getPrototypeOf(e)
            })(e)
        }

        Object.defineProperty(n, "__esModule", {value: !0}), n.default = void 0;
        e = function (e) {
            var t = o;
            if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
            t.prototype = Object.create(e && e.prototype, {
                constructor: {
                    value: t,
                    writable: !0,
                    configurable: !0
                }
            }), Object.defineProperty(t, "prototype", {writable: !1}), e && a(t, e);
            var n, r = u(o);

            function o(e) {
                if (this instanceof o) return r.call(this, e);
                throw new TypeError("Cannot call a class as a function")
            }

            return t = o, (e = [{
                key: "addTextTrack", value: function () {
                }
            }, {
                key: "captureStream", value: function () {
                }
            }, {
                key: "fastSeek", value: function () {
                }
            }, {
                key: "load", value: function () {
                }
            }, {
                key: "pause", value: function () {
                }
            }, {
                key: "play", value: function () {
                }
            }]) && i(t.prototype, e), n && i(t, n), Object.defineProperty(t, "prototype", {writable: !1}), o
        }(((e = e("./HTMLElement")) && e.__esModule ? e : {default: e}).default);
        n.default = e
    }, {"./HTMLElement": 15}], 18: [function (e, t, n) {
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
                var r = t[n];
                r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, function (e) {
                    e = function (e, t) {
                        if ("object" !== o(e) || null === e) return e;
                        var n = e[Symbol.toPrimitive];
                        if (void 0 === n) return ("string" === t ? String : Number)(e);
                        n = n.call(e, t || "default");
                        if ("object" !== o(n)) return n;
                        throw new TypeError("@@toPrimitive must return a primitive value.")
                    }(e, "string");
                    return "symbol" === o(e) ? e : String(e)
                }(r.key), r)
            }
        }

        function u(e, t) {
            return (u = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (e, t) {
                return e.__proto__ = t, e
            })(e, t)
        }

        function c(n) {
            var r = function () {
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
                var e, t = i(n),
                    t = (e = r ? (e = i(this).constructor, Reflect.construct(t, arguments, e)) : t.apply(this, arguments), this);
                if (e && ("object" === o(e) || "function" == typeof e)) return e;
                if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined");
                if (void 0 !== t) return t;
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
            }
        }

        function i(e) {
            return (i = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (e) {
                return e.__proto__ || Object.getPrototypeOf(e)
            })(e)
        }

        Object.defineProperty(n, "__esModule", {value: !0}), n.default = void 0;
        e = function (e) {
            var t = i;
            if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
            t.prototype = Object.create(e && e.prototype, {
                constructor: {
                    value: t,
                    writable: !0,
                    configurable: !0
                }
            }), Object.defineProperty(t, "prototype", {writable: !1}), e && u(t, e);
            var n, r, o = c(i);

            function i() {
                if (this instanceof i) return o.call(this, "video");
                throw new TypeError("Cannot call a class as a function")
            }

            return t = i, n && a(t.prototype, n), r && a(t, r), Object.defineProperty(t, "prototype", {writable: !1}), t
        }(((e = e("./HTMLMediaElement")) && e.__esModule ? e : {default: e}).default);
        n.default = e
    }, {"./HTMLMediaElement": 17}], 19: [function (e, t, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", {value: !0}), n.default = function () {
            var e = wx.createImage();
            return e.premultiplyAlpha = !1, e
        }
    }, {}], 20: [function (e, t, n) {
        "use strict";

        function o(e) {
            return (o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
                return typeof e
            } : function (e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
            })(e)
        }

        function r(e, t) {
            for (var n = 0; n < t.length; n++) {
                var r = t[n];
                r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, function (e) {
                    e = function (e, t) {
                        if ("object" !== o(e) || null === e) return e;
                        var n = e[Symbol.toPrimitive];
                        if (void 0 === n) return ("string" === t ? String : Number)(e);
                        n = n.call(e, t || "default");
                        if ("object" !== o(n)) return n;
                        throw new TypeError("@@toPrimitive must return a primitive value.")
                    }(e, "string");
                    return "symbol" === o(e) ? e : String(e)
                }(r.key), r)
            }
        }

        function i(e, t, n) {
            return t && r(e.prototype, t), n && r(e, n), Object.defineProperty(e, "prototype", {writable: !1}), e
        }

        Object.defineProperty(n, "__esModule", {value: !0}), n.default = void 0, n.default = i(function e() {
            if (!(this instanceof e)) throw new TypeError("Cannot call a class as a function")
        })
    }, {}], 21: [function (e, t, n) {
        "use strict";

        function o(e) {
            return (o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
                return typeof e
            } : function (e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
            })(e)
        }

        function r(e, t) {
            for (var n = 0; n < t.length; n++) {
                var r = t[n];
                r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, l(r.key), r)
            }
        }

        function a(e, t) {
            return (a = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (e, t) {
                return e.__proto__ = t, e
            })(e, t)
        }

        function u(n) {
            var r = function () {
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
                var e, t = i(n),
                    t = (e = r ? (e = i(this).constructor, Reflect.construct(t, arguments, e)) : t.apply(this, arguments), this);
                if (e && ("object" === o(e) || "function" == typeof e)) return e;
                if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined");
                return c(t)
            }
        }

        function c(e) {
            if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return e
        }

        function i(e) {
            return (i = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (e) {
                return e.__proto__ || Object.getPrototypeOf(e)
            })(e)
        }

        function l(e) {
            e = function (e, t) {
                if ("object" !== o(e) || null === e) return e;
                var n = e[Symbol.toPrimitive];
                if (void 0 === n) return ("string" === t ? String : Number)(e);
                n = n.call(e, t || "default");
                if ("object" !== o(n)) return n;
                throw new TypeError("@@toPrimitive must return a primitive value.")
            }(e, "string");
            return "symbol" === o(e) ? e : String(e)
        }

        Object.defineProperty(n, "__esModule", {value: !0}), n.default = void 0;
        e = function (e) {
            var t = i;
            if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
            t.prototype = Object.create(e && e.prototype, {
                constructor: {
                    value: t,
                    writable: !0,
                    configurable: !0
                }
            }), Object.defineProperty(t, "prototype", {writable: !1}), e && a(t, e);
            var n, o = u(i);

            function i() {
                var e, t, n, r;
                if (this instanceof i) return e = o.call(this), t = c(e), r = [], (n = l(n = "childNodes")) in t ? Object.defineProperty(t, n, {
                    value: r,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }) : t[n] = r, e;
                throw new TypeError("Cannot call a class as a function")
            }

            return t = i, (e = [{
                key: "appendChild", value: function (e) {
                    this.childNodes.push(e)
                }
            }, {
                key: "cloneNode", value: function () {
                    var e = Object.create(this);
                    return Object.assign(e, this), e
                }
            }, {
                key: "removeChild", value: function (t) {
                    var e = this.childNodes.findIndex(function (e) {
                        return e === t
                    });
                    return -1 < e ? this.childNodes.splice(e, 1) : null
                }
            }]) && r(t.prototype, e), n && r(t, n), Object.defineProperty(t, "prototype", {writable: !1}), i
        }(((e = e("./EventTarget.js")) && e.__esModule ? e : {default: e}).default);
        n.default = e
    }, {"./EventTarget.js": 11}], 22: [function (e, t, n) {
        "use strict";

        function o(e) {
            return (o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
                return typeof e
            } : function (e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
            })(e)
        }

        function r(e, t) {
            for (var n = 0; n < t.length; n++) {
                var r = t[n];
                r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, function (e) {
                    e = function (e, t) {
                        if ("object" !== o(e) || null === e) return e;
                        var n = e[Symbol.toPrimitive];
                        if (void 0 === n) return ("string" === t ? String : Number)(e);
                        n = n.call(e, t || "default");
                        if ("object" !== o(n)) return n;
                        throw new TypeError("@@toPrimitive must return a primitive value.")
                    }(e, "string");
                    return "symbol" === o(e) ? e : String(e)
                }(r.key), r)
            }
        }

        function i(e, t, n) {
            return t && r(e.prototype, t), n && r(e, n), Object.defineProperty(e, "prototype", {writable: !1}), e
        }

        Object.defineProperty(n, "__esModule", {value: !0}), n.default = void 0;
        var a = i(function e() {
            if (!(this instanceof e)) throw new TypeError("Cannot call a class as a function")
        });
        (n.default = a).ACTIVE_ATTRIBUTES = 35721, a.ACTIVE_TEXTURE = 34016, a.ACTIVE_UNIFORMS = 35718, a.ALIASED_LINE_WIDTH_RANGE = 33902, a.ALIASED_POINT_SIZE_RANGE = 33901, a.ALPHA = 6406, a.ALPHA_BITS = 3413, a.ALWAYS = 519, a.ARRAY_BUFFER = 34962, a.ARRAY_BUFFER_BINDING = 34964, a.ATTACHED_SHADERS = 35717, a.BACK = 1029, a.BLEND = 3042, a.BLEND_COLOR = 32773, a.BLEND_DST_ALPHA = 32970, a.BLEND_DST_RGB = 32968, a.BLEND_EQUATION = 32777, a.BLEND_EQUATION_ALPHA = 34877, a.BLEND_EQUATION_RGB = 32777, a.BLEND_SRC_ALPHA = 32971, a.BLEND_SRC_RGB = 32969, a.BLUE_BITS = 3412, a.BOOL = 35670, a.BOOL_VEC2 = 35671, a.BOOL_VEC3 = 35672, a.BOOL_VEC4 = 35673, a.BROWSER_DEFAULT_WEBGL = 37444, a.BUFFER_SIZE = 34660, a.BUFFER_USAGE = 34661, a.BYTE = 5120, a.CCW = 2305, a.CLAMP_TO_EDGE = 33071, a.COLOR_ATTACHMENT0 = 36064, a.COLOR_BUFFER_BIT = 16384, a.COLOR_CLEAR_VALUE = 3106, a.COLOR_WRITEMASK = 3107, a.COMPILE_STATUS = 35713, a.COMPRESSED_TEXTURE_FORMATS = 34467, a.CONSTANT_ALPHA = 32771, a.CONSTANT_COLOR = 32769, a.CONTEXT_LOST_WEBGL = 37442, a.CULL_FACE = 2884, a.CULL_FACE_MODE = 2885, a.CURRENT_PROGRAM = 35725, a.CURRENT_VERTEX_ATTRIB = 34342, a.CW = 2304, a.DECR = 7683, a.DECR_WRAP = 34056, a.DELETE_STATUS = 35712, a.DEPTH_ATTACHMENT = 36096, a.DEPTH_BITS = 3414, a.DEPTH_BUFFER_BIT = 256, a.DEPTH_CLEAR_VALUE = 2931, a.DEPTH_COMPONENT = 6402, a.DEPTH_COMPONENT16 = 33189, a.DEPTH_FUNC = 2932, a.DEPTH_RANGE = 2928, a.DEPTH_STENCIL = 34041, a.DEPTH_STENCIL_ATTACHMENT = 33306, a.DEPTH_TEST = 2929, a.DEPTH_WRITEMASK = 2930, a.DITHER = 3024, a.DONT_CARE = 4352, a.DST_ALPHA = 772, a.DST_COLOR = 774, a.DYNAMIC_DRAW = 35048, a.ELEMENT_ARRAY_BUFFER = 34963, a.ELEMENT_ARRAY_BUFFER_BINDING = 34965, a.EQUAL = 514, a.FASTEST = 4353, a.FLOAT = 5126, a.FLOAT_MAT2 = 35674, a.FLOAT_MAT3 = 35675, a.FLOAT_MAT4 = 35676, a.FLOAT_VEC2 = 35664, a.FLOAT_VEC3 = 35665, a.FLOAT_VEC4 = 35666, a.FRAGMENT_SHADER = 35632, a.FRAMEBUFFER = 36160, a.FRAMEBUFFER_ATTACHMENT_OBJECT_NAME = 36049, a.FRAMEBUFFER_ATTACHMENT_OBJECT_TYPE = 36048, a.FRAMEBUFFER_ATTACHMENT_TEXTURE_CUBE_MAP_FACE = 36051, a.FRAMEBUFFER_ATTACHMENT_TEXTURE_LEVEL = 36050, a.FRAMEBUFFER_BINDING = 36006, a.FRAMEBUFFER_COMPLETE = 36053, a.FRAMEBUFFER_INCOMPLETE_ATTACHMENT = 36054, a.FRAMEBUFFER_INCOMPLETE_DIMENSIONS = 36057, a.FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT = 36055, a.FRAMEBUFFER_UNSUPPORTED = 36061, a.FRONT = 1028, a.FRONT_AND_BACK = 1032, a.FRONT_FACE = 2886, a.FUNC_ADD = 32774, a.FUNC_REVERSE_SUBTRACT = 32779, a.FUNC_SUBTRACT = 32778, a.GENERATE_MIPMAP_HINT = 33170, a.GEQUAL = 518, a.GREATER = 516, a.GREEN_BITS = 3411, a.HIGH_FLOAT = 36338, a.HIGH_INT = 36341,a.IMPLEMENTATION_COLOR_READ_FORMAT = 35739,a.IMPLEMENTATION_COLOR_READ_TYPE = 35738,a.INCR = 7682,a.INCR_WRAP = 34055,a.INT = 5124,a.INT_VEC2 = 35667,a.INT_VEC3 = 35668,a.INT_VEC4 = 35669,a.INVALID_ENUM = 1280,a.INVALID_FRAMEBUFFER_OPERATION = 1286,a.INVALID_OPERATION = 1282,a.INVALID_VALUE = 1281,a.INVERT = 5386,a.KEEP = 7680,a.LEQUAL = 515,a.LESS = 513,a.LINEAR = 9729,a.LINEAR_MIPMAP_LINEAR = 9987,a.LINEAR_MIPMAP_NEAREST = 9985,a.LINES = 1,a.LINE_LOOP = 2,a.LINE_STRIP = 3,a.LINE_WIDTH = 2849,a.LINK_STATUS = 35714,a.LOW_FLOAT = 36336,a.LOW_INT = 36339,a.LUMINANCE = 6409,a.LUMINANCE_ALPHA = 6410,a.MAX_COMBINED_TEXTURE_IMAGE_UNITS = 35661,a.MAX_CUBE_MAP_TEXTURE_SIZE = 34076,a.MAX_FRAGMENT_UNIFORM_VECTORS = 36349,a.MAX_RENDERBUFFER_SIZE = 34024,a.MAX_TEXTURE_IMAGE_UNITS = 34930,a.MAX_TEXTURE_SIZE = 3379,a.MAX_VARYING_VECTORS = 36348,a.MAX_VERTEX_ATTRIBS = 34921,a.MAX_VERTEX_TEXTURE_IMAGE_UNITS = 35660,a.MAX_VERTEX_UNIFORM_VECTORS = 36347,a.MAX_VIEWPORT_DIMS = 3386,a.MEDIUM_FLOAT = 36337,a.MEDIUM_INT = 36340,a.MIRRORED_REPEAT = 33648,a.NEAREST = 9728,a.NEAREST_MIPMAP_LINEAR = 9986,a.NEAREST_MIPMAP_NEAREST = 9984,a.NEVER = 512,a.NICEST = 4354,a.NONE = 0,a.NOTEQUAL = 517,a.NO_ERROR = 0,a.ONE = 1,a.ONE_MINUS_CONSTANT_ALPHA = 32772,a.ONE_MINUS_CONSTANT_COLOR = 32770,a.ONE_MINUS_DST_ALPHA = 773,a.ONE_MINUS_DST_COLOR = 775,a.ONE_MINUS_SRC_ALPHA = 771,a.ONE_MINUS_SRC_COLOR = 769,a.OUT_OF_MEMORY = 1285,a.PACK_ALIGNMENT = 3333,a.POINTS = 0,a.POLYGON_OFFSET_FACTOR = 32824,a.POLYGON_OFFSET_FILL = 32823,a.POLYGON_OFFSET_UNITS = 10752,a.RED_BITS = 3410,a.RENDERBUFFER = 36161,a.RENDERBUFFER_ALPHA_SIZE = 36179,a.RENDERBUFFER_BINDING = 36007,a.RENDERBUFFER_BLUE_SIZE = 36178,a.RENDERBUFFER_DEPTH_SIZE = 36180,a.RENDERBUFFER_GREEN_SIZE = 36177,a.RENDERBUFFER_HEIGHT = 36163,a.RENDERBUFFER_INTERNAL_FORMAT = 36164,a.RENDERBUFFER_RED_SIZE = 36176,a.RENDERBUFFER_STENCIL_SIZE = 36181,a.RENDERBUFFER_WIDTH = 36162,a.RENDERER = 7937,a.REPEAT = 10497,a.REPLACE = 7681,a.RGB = 6407,a.RGB5_A1 = 32855,a.RGB565 = 36194,a.RGBA = 6408,a.RGBA4 = 32854,a.SAMPLER_2D = 35678,a.SAMPLER_CUBE = 35680,a.SAMPLES = 32937,a.SAMPLE_ALPHA_TO_COVERAGE = 32926,a.SAMPLE_BUFFERS = 32936,a.SAMPLE_COVERAGE = 32928,a.SAMPLE_COVERAGE_INVERT = 32939,a.SAMPLE_COVERAGE_VALUE = 32938,a.SCISSOR_BOX = 3088,a.SCISSOR_TEST = 3089,a.SHADER_TYPE = 35663,a.SHADING_LANGUAGE_VERSION = 35724,a.SHORT = 5122,a.SRC_ALPHA = 770,a.SRC_ALPHA_SATURATE = 776,a.SRC_COLOR = 768,a.STATIC_DRAW = 35044,a.STENCIL_ATTACHMENT = 36128,a.STENCIL_BACK_FAIL = 34817,a.STENCIL_BACK_FUNC = 34816,a.STENCIL_BACK_PASS_DEPTH_FAIL = 34818,a.STENCIL_BACK_PASS_DEPTH_PASS = 34819,a.STENCIL_BACK_REF = 36003,a.STENCIL_BACK_VALUE_MASK = 36004,a.STENCIL_BACK_WRITEMASK = 36005,a.STENCIL_BITS = 3415,a.STENCIL_BUFFER_BIT = 1024,a.STENCIL_CLEAR_VALUE = 2961,a.STENCIL_FAIL = 2964,a.STENCIL_FUNC = 2962,a.STENCIL_INDEX8 = 36168,a.STENCIL_PASS_DEPTH_FAIL = 2965,a.STENCIL_PASS_DEPTH_PASS = 2966,a.STENCIL_REF = 2967,a.STENCIL_TEST = 2960,a.STENCIL_VALUE_MASK = 2963,a.STENCIL_WRITEMASK = 2968,a.STREAM_DRAW = 35040,a.SUBPIXEL_BITS = 3408,a.TEXTURE = 5890,a.TEXTURE0 = 33984,a.TEXTURE1 = 33985,a.TEXTURE2 = 33986,a.TEXTURE3 = 33987,a.TEXTURE4 = 33988,a.TEXTURE5 = 33989,a.TEXTURE6 = 33990,a.TEXTURE7 = 33991,a.TEXTURE8 = 33992,a.TEXTURE9 = 33993,a.TEXTURE10 = 33994,a.TEXTURE11 = 33995,a.TEXTURE12 = 33996,a.TEXTURE13 = 33997,a.TEXTURE14 = 33998,a.TEXTURE15 = 33999,a.TEXTURE16 = 34e3,a.TEXTURE17 = 34001,a.TEXTURE18 = 34002,a.TEXTURE19 = 34003,a.TEXTURE20 = 34004,a.TEXTURE21 = 34005,a.TEXTURE22 = 34006,a.TEXTURE23 = 34007,a.TEXTURE24 = 34008,a.TEXTURE25 = 34009,a.TEXTURE26 = 34010,a.TEXTURE27 = 34011,a.TEXTURE28 = 34012,a.TEXTURE29 = 34013,a.TEXTURE30 = 34014,a.TEXTURE31 = 34015,a.TEXTURE_2D = 3553,a.TEXTURE_BINDING_2D = 32873,a.TEXTURE_BINDING_CUBE_MAP = 34068,a.TEXTURE_CUBE_MAP = 34067,a.TEXTURE_CUBE_MAP_NEGATIVE_X = 34070,a.TEXTURE_CUBE_MAP_NEGATIVE_Y = 34072,a.TEXTURE_CUBE_MAP_NEGATIVE_Z = 34074,a.TEXTURE_CUBE_MAP_POSITIVE_X = 34069,a.TEXTURE_CUBE_MAP_POSITIVE_Y = 34071,a.TEXTURE_CUBE_MAP_POSITIVE_Z = 34073,a.TEXTURE_MAG_FILTER = 10240,a.TEXTURE_MIN_FILTER = 10241,a.TEXTURE_WRAP_S = 10242,a.TEXTURE_WRAP_T = 10243,a.TRIANGLES = 4,a.TRIANGLE_FAN = 6,a.TRIANGLE_STRIP = 5,a.UNPACK_ALIGNMENT = 3317,a.UNPACK_COLORSPACE_CONVERSION_WEBGL = 37443,a.UNPACK_FLIP_Y_WEBGL = 37440,a.UNPACK_PREMULTIPLY_ALPHA_WEBGL = 37441,a.UNSIGNED_BYTE = 5121,a.UNSIGNED_INT = 5125,a.UNSIGNED_SHORT = 5123,a.UNSIGNED_SHORT_4_4_4_4 = 32819,a.UNSIGNED_SHORT_5_5_5_1 = 32820,a.UNSIGNED_SHORT_5_6_5 = 33635,a.VALIDATE_STATUS = 35715,a.VENDOR = 7936,a.VERSION = 7938,a.VERTEX_ATTRIB_ARRAY_BUFFER_BINDING = 34975,a.VERTEX_ATTRIB_ARRAY_ENABLED = 34338,a.VERTEX_ATTRIB_ARRAY_NORMALIZED = 34922,a.VERTEX_ATTRIB_ARRAY_POINTER = 34373,a.VERTEX_ATTRIB_ARRAY_SIZE = 34339,a.VERTEX_ATTRIB_ARRAY_STRIDE = 34340,a.VERTEX_ATTRIB_ARRAY_TYPE = 34341,a.VERTEX_SHADER = 35633,a.VIEWPORT = 2978,a.ZERO = 0
    }, {}], 23: [function (e, t, n) {
        "use strict";

        function r(e) {
            return (r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
                return typeof e
            } : function (e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
            })(e)
        }

        function o(e, t) {
            for (var n = 0; n < t.length; n++) {
                var r = t[n];
                r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, i(r.key), r)
            }
        }

        function a(e, t, n) {
            (t = i(t)) in e ? Object.defineProperty(e, t, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = n
        }

        function i(e) {
            e = function (e, t) {
                if ("object" !== r(e) || null === e) return e;
                var n = e[Symbol.toPrimitive];
                if (void 0 === n) return ("string" === t ? String : Number)(e);
                n = n.call(e, t || "default");
                if ("object" !== r(n)) return n;
                throw new TypeError("@@toPrimitive must return a primitive value.")
            }(e, "string");
            return "symbol" === r(e) ? e : String(e)
        }

        Object.defineProperty(n, "__esModule", {value: !0}), n.default = void 0;
        var u = new WeakMap, c = function () {
            function i(e) {
                var t = this, n = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : [], r = this, o = i;
                if (!(r instanceof o)) throw new TypeError("Cannot call a class as a function");
                if (a(this, "binaryType", ""), a(this, "bufferedAmount", 0), a(this, "extensions", ""), a(this, "onclose", null), a(this, "onerror", null), a(this, "onmessage", null), a(this, "onopen", null), a(this, "protocol", ""), a(this, "readyState", 3), "string" != typeof e || !/(^ws:\/\/)|(^wss:\/\/)/.test(e)) throw new TypeError("Failed to construct 'WebSocket': The URL '".concat(e, "' is invalid"));
                this.url = e, this.readyState = i.CONNECTING;
                r = wx.connectSocket({url: e, protocols: Array.isArray(n) ? n : [n], tcpNoDelay: !0});
                return u.set(this, r), r.onClose(function (e) {
                    t.readyState = i.CLOSED, "function" == typeof t.onclose && t.onclose(e)
                }), r.onMessage(function (e) {
                    "function" == typeof t.onmessage && t.onmessage(e)
                }), r.onOpen(function () {
                    t.readyState = i.OPEN, "function" == typeof t.onopen && t.onopen()
                }), r.onError(function (e) {
                    "function" == typeof t.onerror && t.onerror(new Error(e.errMsg))
                }), this
            }

            var e, t, n;
            return e = i, (t = [{
                key: "close", value: function (e, t) {
                    this.readyState = i.CLOSING, u.get(this).close({code: e, reason: t})
                }
            }, {
                key: "send", value: function (e) {
                    if (!("string" == typeof e || e instanceof ArrayBuffer || ArrayBuffer.isView(e))) throw new TypeError("Failed to send message: The data ".concat(e, " is invalid"));
                    u.get(this).send({data: e})
                }
            }]) && o(e.prototype, t), n && o(e, n), Object.defineProperty(e, "prototype", {writable: !1}), i
        }();
        a(n.default = c, "CONNECTING", 0), a(c, "OPEN", 1), a(c, "CLOSING", 2), a(c, "CLOSED", 3)
    }, {}], 24: [function (e, t, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", {value: !0}), n.screen = n.performance = n.ontouchstart = n.ontouchmove = n.ontouchend = n.innerWidth = n.innerHeight = n.devicePixelRatio = void 0;
        var r = wx.getSystemInfoSync(), o = r.screenWidth, i = r.screenHeight, r = r.devicePixelRatio,
            r = (n.devicePixelRatio = r, o), a = i, o = {
                width: o,
                height: i,
                availWidth: n.innerWidth = r,
                availHeight: n.innerHeight = a,
                availLeft: 0,
                availTop: 0
            }, i = (n.screen = o, {now: Date.now});
        n.performance = i, n.ontouchstart = null, n.ontouchmove = null;
        n.ontouchend = null
    }, {}], 25: [function (e, t, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", {value: !0}), n.default = void 0;
        e = (e = e("./EventTarget.js")) && e.__esModule ? e : {default: e};

        function o(e) {
            return (o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
                return typeof e
            } : function (e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
            })(e)
        }

        function i(e, t) {
            for (var n = 0; n < t.length; n++) {
                var r = t[n];
                r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, f(r.key), r)
            }
        }

        function a(e, t) {
            return (a = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (e, t) {
                return e.__proto__ = t, e
            })(e, t)
        }

        function c(n) {
            var r = function () {
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
                var e, t = u(n),
                    t = (e = r ? (e = u(this).constructor, Reflect.construct(t, arguments, e)) : t.apply(this, arguments), this);
                if (e && ("object" === o(e) || "function" == typeof e)) return e;
                if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined");
                return l(t)
            }
        }

        function l(e) {
            if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return e
        }

        function u(e) {
            return (u = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (e) {
                return e.__proto__ || Object.getPrototypeOf(e)
            })(e)
        }

        function s(e, t, n) {
            (t = f(t)) in e ? Object.defineProperty(e, t, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = n
        }

        function f(e) {
            e = function (e, t) {
                if ("object" !== o(e) || null === e) return e;
                var n = e[Symbol.toPrimitive];
                if (void 0 === n) return ("string" === t ? String : Number)(e);
                n = n.call(e, t || "default");
                if ("object" !== o(n)) return n;
                throw new TypeError("@@toPrimitive must return a primitive value.")
            }(e, "string");
            return "symbol" === o(e) ? e : String(e)
        }

        var d = new WeakMap, p = new WeakMap, m = new WeakMap, y = new WeakMap, h = new WeakMap;

        function E(e) {
            if ("function" == typeof this["on".concat(e)]) {
                for (var t = arguments.length, n = new Array(1 < t ? t - 1 : 0), r = 1; r < t; r++) n[r - 1] = arguments[r];
                this["on".concat(e)].apply(this, n)
            }
        }

        function b(e) {
            this.readyState = e, E.call(this, "readystatechange")
        }

        e = function (e) {
            var t = u;
            if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
            t.prototype = Object.create(e && e.prototype, {
                constructor: {
                    value: t,
                    writable: !0,
                    configurable: !0
                }
            }), Object.defineProperty(t, "prototype", {writable: !1}), e && a(t, e);
            var n, r = c(u);

            function u() {
                var e;
                if (this instanceof u) return s(l(e = r.call(this)), "timeout", 0), s(l(e), "onabort", null), s(l(e), "onerror", null), s(l(e), "onload", null), s(l(e), "onloadstart", null), s(l(e), "onprogress", null), s(l(e), "ontimeout", null), s(l(e), "onloadend", null), s(l(e), "onreadystatechange", null), s(l(e), "readyState", 0), s(l(e), "response", null), s(l(e), "responseText", null), s(l(e), "responseType", ""), s(l(e), "responseXML", null), s(l(e), "status", 0), s(l(e), "statusText", ""), s(l(e), "upload", {}), s(l(e), "withCredentials", !1), m.set(l(e), {"content-type": "application/x-www-form-urlencoded"}), y.set(l(e), {}), e;
                throw new TypeError("Cannot call a class as a function")
            }

            return t = u, (e = [{
                key: "abort", value: function () {
                    var e = h.get(this);
                    e && e.abort()
                }
            }, {
                key: "getAllResponseHeaders", value: function () {
                    var t = y.get(this);
                    return Object.keys(t).map(function (e) {
                        return "".concat(e, ": ").concat(t[e])
                    }).join("\n")
                }
            }, {
                key: "getResponseHeader", value: function (e) {
                    return y.get(this)[e]
                }
            }, {
                key: "open", value: function (e, t) {
                    p.set(this, e), d.set(this, t), b.call(this, u.OPENED)
                }
            }, {
                key: "overrideMimeType", value: function () {
                }
            }, {
                key: "send", value: function () {
                    var a = this, e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : "";
                    if (this.readyState !== u.OPENED) throw new Error("Failed to execute 'send' on 'XMLHttpRequest': The object's state must be OPENED.");
                    e = wx.request({
                        data: e,
                        url: d.get(this),
                        method: p.get(this),
                        header: m.get(this),
                        dataType: "other",
                        responseType: "arraybuffer" === this.responseType ? "arraybuffer" : "text",
                        timeout: this.timeout || void 0,
                        success: function (e) {
                            var t = e.data, n = e.statusCode, e = e.header;
                            switch (a.status = n, y.set(a, e), E.call(a, "loadstart"), b.call(a, u.HEADERS_RECEIVED), b.call(a, u.LOADING), a.responseType) {
                                case"json":
                                    a.responseText = t;
                                    try {
                                        a.response = JSON.parse(t)
                                    } catch (e) {
                                        a.response = null
                                    }
                                    break;
                                case"":
                                case"text":
                                    a.responseText = a.response = t;
                                    break;
                                case"arraybuffer":
                                    a.response = t, a.responseText = "";
                                    for (var r = new Uint8Array(t), o = r.byteLength, i = 0; i < o; i++) a.responseText += String.fromCharCode(r[i]);
                                    break;
                                default:
                                    a.response = null
                            }
                            b.call(a, u.DONE), E.call(a, "load"), E.call(a, "loadend")
                        },
                        fail: function (e) {
                            e = e.errMsg;
                            -1 !== e.indexOf("abort") ? E.call(a, "abort") : -1 !== e.indexOf("timeout") ? E.call(a, "timeout") : E.call(a, "error", e), E.call(a, "loadend")
                        }
                    });
                    h.set(this, e)
                }
            }, {
                key: "setRequestHeader", value: function (e, t) {
                    var n = m.get(this);
                    n[e] = t, m.set(this, n)
                }
            }, {
                key: "addEventListener", value: function (e, t) {
                    var n;
                    "function" == typeof t && (n = this, this["on" + e] = function (e) {
                        t.call(n, e)
                    })
                }
            }]) && i(t.prototype, e), n && i(t, n), Object.defineProperty(t, "prototype", {writable: !1}), u
        }(e.default);
        s(n.default = e, "UNSEND", 0), s(e, "OPENED", 1), s(e, "HEADERS_RECEIVED", 2), s(e, "LOADING", 3), s(e, "DONE", 4)
    }, {"./EventTarget.js": 11}], 26: [function (e, t, n) {
        "use strict";

        function a(e) {
            return (a = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
                return typeof e
            } : function (e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
            })(e)
        }

        Object.defineProperty(n, "__esModule", {value: !0}), n.default = void 0;
        var r = function (e, t) {
                if (!t && e && e.__esModule) return e;
                if (null === e || "object" !== a(e) && "function" != typeof e) return {default: e};
                t = f(t);
                if (t && t.has(e)) return t.get(e);
                var n, r = {}, o = Object.defineProperty && Object.getOwnPropertyDescriptor;
                for (n in e) {
                    var i;
                    "default" !== n && Object.prototype.hasOwnProperty.call(e, n) && ((i = o ? Object.getOwnPropertyDescriptor(e, n) : null) && (i.get || i.set) ? Object.defineProperty(r, n, i) : r[n] = e[n])
                }
                r.default = e, t && t.set(e, r);
                return r
            }(e("./window")), o = s(e("./HTMLElement")), i = s(e("./HTMLVideoElement")), u = s(e("./Image")),
            c = s(e("./Audio")), l = s(e("./Canvas"));

        function s(e) {
            return e && e.__esModule ? e : {default: e}
        }

        function f(e) {
            var t, n;
            return "function" != typeof WeakMap ? null : (t = new WeakMap, n = new WeakMap, (f = function (e) {
                return e ? n : t
            })(e))
        }

        e("./EventIniter/index.js");
        var d = {}, p = {
            readyState: "complete",
            visibilityState: "visible",
            documentElement: r,
            hidden: !1,
            style: {},
            location: r.location,
            ontouchstart: null,
            ontouchmove: null,
            ontouchend: null,
            head: new o.default("head"),
            body: new o.default("body"),
            createElement: function (e) {
                return "canvas" === e ? new l.default : "audio" === e ? new c.default : "img" === e ? new u.default : "video" === e ? new i.default : new o.default(e)
            },
            createElementNS: function (e, t) {
                return this.createElement(t)
            },
            getElementById: function (e) {
                return e === r.canvas.id ? r.canvas : null
            },
            getElementsByTagName: function (e) {
                return "head" === e ? [p.head] : "body" === e ? [p.body] : "canvas" === e ? [r.canvas] : []
            },
            getElementsByName: function (e) {
                return "head" === e ? [p.head] : "body" === e ? [p.body] : "canvas" === e ? [r.canvas] : []
            },
            querySelector: function (e) {
                return "head" === e ? p.head : "body" === e ? p.body : "canvas" === e || e === "#".concat(r.canvas.id) ? r.canvas : null
            },
            querySelectorAll: function (e) {
                return "head" === e ? [p.head] : "body" === e ? [p.body] : "canvas" === e ? [r.canvas] : []
            },
            addEventListener: function (e, t) {
                d[e] || (d[e] = []), d[e].push(t)
            },
            removeEventListener: function (e, t) {
                var n = d[e];
                if (n && 0 < n.length) for (var r = n.length; r--;) if (n[r] === t) {
                    n.splice(r, 1);
                    break
                }
            },
            dispatchEvent: function (e) {
                var t = d[e.type];
                if (t) for (var n = 0; n < t.length; n++) t[n](e)
            }
        };
        n.default = p
    }, {
        "./Audio": 5,
        "./Canvas": 6,
        "./EventIniter/index.js": 10,
        "./HTMLElement": 15,
        "./HTMLVideoElement": 18,
        "./Image": 19,
        "./window": 32
    }], 27: [function (e, t, n) {
        "use strict";

        function a(e) {
            return (a = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
                return typeof e
            } : function (e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
            })(e)
        }

        var r = function (e, t) {
            if (!t && e && e.__esModule) return e;
            if (null === e || "object" !== a(e) && "function" != typeof e) return {default: e};
            t = u(t);
            if (t && t.has(e)) return t.get(e);
            var n, r = {}, o = Object.defineProperty && Object.getOwnPropertyDescriptor;
            for (n in e) {
                var i;
                "default" !== n && Object.prototype.hasOwnProperty.call(e, n) && ((i = o ? Object.getOwnPropertyDescriptor(e, n) : null) && (i.get || i.set) ? Object.defineProperty(r, n, i) : r[n] = e[n])
            }
            r.default = e, t && t.set(e, r);
            return r
        }(e("./window")), o = (o = e("./document")) && o.__esModule ? o : {default: o};

        function u(e) {
            var t, n;
            return "function" != typeof WeakMap ? null : (t = new WeakMap, n = new WeakMap, (u = function (e) {
                return e ? n : t
            })(e))
        }

        var i = GameGlobal;
        if (!GameGlobal.__isAdapterInjected) {
            GameGlobal.__isAdapterInjected = !0, r.document = o.default, r.addEventListener = function (e, t) {
                r.document.addEventListener(e, t)
            }, r.removeEventListener = function (e, t) {
                r.document.removeEventListener(e, t)
            }, r.dispatchEvent = function () {
                var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {};
                console.log("window.dispatchEvent", e.type, e)
            };
            o = wx.getSystemInfoSync().platform;
            if ("undefined" == typeof __devtoolssubcontext && "devtools" === o) {
                for (var c in r) {
                    var l = Object.getOwnPropertyDescriptor(i, c);
                    l && !0 !== l.configurable || Object.defineProperty(window, c, {value: r[c]})
                }
                for (var s in r.document) {
                    var f = Object.getOwnPropertyDescriptor(i.document, s);
                    f && !0 !== f.configurable || Object.defineProperty(i.document, s, {value: r.document[s]})
                }
                window.parent = window
            } else {
                for (var d in r) i[d] = r[d];
                i.window = r, (window = i).top = window.parent = window
            }
        }
        i.WebAssembly = i.WXWebAssembly, e("../../../../common/xmldom/dom-parser"), e("../unify"), e("../fs-utils")
    }, {
        "../../../../common/xmldom/dom-parser": 1,
        "../fs-utils": 33,
        "../unify": 34,
        "./document": 26,
        "./window": 32
    }], 28: [function (e, t, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", {value: !0}), n.default = void 0, n.default = {
            get length() {
                return wx.getStorageInfoSync().keys.length
            }, key: function (e) {
                return wx.getStorageInfoSync().keys[e]
            }, getItem: function (e) {
                return wx.getStorageSync(e)
            }, setItem: function (e, t) {
                return wx.setStorageSync(e, t)
            }, removeItem: function (e) {
                wx.removeStorageSync(e)
            }, clear: function () {
                wx.clearStorageSync()
            }
        }
    }, {}], 29: [function (e, t, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", {value: !0}), n.default = void 0;
        n.default = {
            href: "game.js", protocol: "", reload: function () {
            }
        }
    }, {}], 30: [function (e, t, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", {value: !0}), n.default = void 0;
        var e = e("./util/index.js"), r = wx.getSystemInfoSync(), o = (console.log(r), r.system), i = r.platform,
            a = r.language, r = r.version,
            o = -1 !== o.toLowerCase().indexOf("android") ? "Android; CPU ".concat(o) : "iPhone; CPU iPhone OS ".concat(o, " like Mac OS X"),
            r = "Mozilla/5.0 (".concat(o, ") AppleWebKit/603.1.30 (KHTML, like Gecko) Mobile/14E8301 MicroMessenger/").concat(r, " MiniGame NetType/WIFI Language/").concat(a),
            u = {
                platform: i,
                language: a,
                appVersion: "5.0 (".concat(o, ") AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1"),
                userAgent: r,
                onLine: !0,
                geolocation: {getCurrentPosition: e.noop, watchPosition: e.noop, clearWatch: e.noop}
            };
        wx.onNetworkStatusChange && wx.onNetworkStatusChange(function (e) {
            u.onLine = e.isConnected
        }), n.default = u
    }, {"./util/index.js": 31}], 31: [function (e, t, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", {value: !0}), n.noop = function () {
        }
    }, {}], 32: [function (e, t, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", {value: !0});
        var r = {
                canvas: !0,
                setTimeout: !0,
                setInterval: !0,
                clearTimeout: !0,
                clearInterval: !0,
                requestAnimationFrame: !0,
                cancelAnimationFrame: !0,
                navigator: !0,
                XMLHttpRequest: !0,
                WebSocket: !0,
                Image: !0,
                ImageBitmap: !0,
                Audio: !0,
                FileReader: !0,
                HTMLElement: !0,
                HTMLImageElement: !0,
                HTMLCanvasElement: !0,
                HTMLMediaElement: !0,
                HTMLAudioElement: !0,
                HTMLVideoElement: !0,
                WebGLRenderingContext: !0,
                TouchEvent: !0,
                MouseEvent: !0,
                DeviceMotionEvent: !0,
                localStorage: !0,
                location: !0
            }, o = (Object.defineProperty(n, "Audio", {
                enumerable: !0, get: function () {
                    return s.default
                }
            }), Object.defineProperty(n, "DeviceMotionEvent", {
                enumerable: !0, get: function () {
                    return v.DeviceMotionEvent
                }
            }), Object.defineProperty(n, "FileReader", {
                enumerable: !0, get: function () {
                    return f.default
                }
            }), Object.defineProperty(n, "HTMLAudioElement", {
                enumerable: !0, get: function () {
                    return h.default
                }
            }), Object.defineProperty(n, "HTMLCanvasElement", {
                enumerable: !0, get: function () {
                    return m.default
                }
            }), Object.defineProperty(n, "HTMLElement", {
                enumerable: !0, get: function () {
                    return d.default
                }
            }), Object.defineProperty(n, "HTMLImageElement", {
                enumerable: !0, get: function () {
                    return p.default
                }
            }), Object.defineProperty(n, "HTMLMediaElement", {
                enumerable: !0, get: function () {
                    return y.default
                }
            }), Object.defineProperty(n, "HTMLVideoElement", {
                enumerable: !0, get: function () {
                    return E.default
                }
            }), Object.defineProperty(n, "Image", {
                enumerable: !0, get: function () {
                    return c.default
                }
            }), Object.defineProperty(n, "ImageBitmap", {
                enumerable: !0, get: function () {
                    return l.default
                }
            }), Object.defineProperty(n, "MouseEvent", {
                enumerable: !0, get: function () {
                    return v.MouseEvent
                }
            }), Object.defineProperty(n, "TouchEvent", {
                enumerable: !0, get: function () {
                    return v.TouchEvent
                }
            }), Object.defineProperty(n, "WebGLRenderingContext", {
                enumerable: !0, get: function () {
                    return b.default
                }
            }), Object.defineProperty(n, "WebSocket", {
                enumerable: !0, get: function () {
                    return u.default
                }
            }), Object.defineProperty(n, "XMLHttpRequest", {
                enumerable: !0, get: function () {
                    return a.default
                }
            }), n.clearTimeout = n.clearInterval = n.canvas = n.cancelAnimationFrame = void 0, Object.defineProperty(n, "localStorage", {
                enumerable: !0,
                get: function () {
                    return _.default
                }
            }), Object.defineProperty(n, "location", {
                enumerable: !0, get: function () {
                    return T.default
                }
            }), Object.defineProperty(n, "navigator", {
                enumerable: !0, get: function () {
                    return i.default
                }
            }), n.setTimeout = n.setInterval = n.requestAnimationFrame = void 0, w(e("./Canvas"))), i = w(e("./navigator")),
            a = w(e("./XMLHttpRequest")), u = w(e("./WebSocket")), c = w(e("./Image")), l = w(e("./ImageBitmap")),
            s = w(e("./Audio")), f = w(e("./FileReader")), d = w(e("./HTMLElement")), p = w(e("./HTMLImageElement")),
            m = w(e("./HTMLCanvasElement")), y = w(e("./HTMLMediaElement")), h = w(e("./HTMLAudioElement")),
            E = w(e("./HTMLVideoElement")), b = w(e("./WebGLRenderingContext")), v = e("./EventIniter/index.js"),
            _ = w(e("./localStorage")), T = w(e("./location")), g = e("./WindowProperties");

        function w(e) {
            return e && e.__esModule ? e : {default: e}
        }

        Object.keys(g).forEach(function (e) {
            "default" === e || "__esModule" === e || Object.prototype.hasOwnProperty.call(r, e) || e in n && n[e] === g[e] || Object.defineProperty(n, e, {
                enumerable: !0,
                get: function () {
                    return g[e]
                }
            })
        }), GameGlobal.screencanvas = GameGlobal.screencanvas || new o.default;
        var e = GameGlobal.screencanvas, o = (n.canvas = e, GameGlobal), e = o.setTimeout, N = o.setInterval,
            S = o.clearTimeout, R = o.clearInterval, A = o.requestAnimationFrame, o = o.cancelAnimationFrame;
        n.cancelAnimationFrame = o, n.requestAnimationFrame = A, n.clearInterval = R, n.clearTimeout = S, n.setInterval = N, n.setTimeout = e
    }, {
        "./Audio": 5,
        "./Canvas": 6,
        "./EventIniter/index.js": 10,
        "./FileReader": 12,
        "./HTMLAudioElement": 13,
        "./HTMLCanvasElement": 14,
        "./HTMLElement": 15,
        "./HTMLImageElement": 16,
        "./HTMLMediaElement": 17,
        "./HTMLVideoElement": 18,
        "./Image": 19,
        "./ImageBitmap": 20,
        "./WebGLRenderingContext": 22,
        "./WebSocket": 23,
        "./WindowProperties": 24,
        "./XMLHttpRequest": 25,
        "./localStorage": 28,
        "./location": 29,
        "./navigator": 30
    }], 33: [function (e, t, n) {
        "use strict";
        var o = wx.getFileSystemManager ? wx.getFileSystemManager() : null, r = /the maximum size of the file storage/,
            a = {
                fs: o, isOutOfStorage: function (e) {
                    return r.test(e)
                }, getUserDataPath: function () {
                    return wx.env.USER_DATA_PATH
                }, checkFsValid: function () {
                    return !!o || (console.warn("can not get the file system!"), !1)
                }, deleteFile: function (t, n) {
                    o.unlink({
                        filePath: t, success: function () {
                            n && n(null)
                        }, fail: function (e) {
                            console.warn("Delete file failed: path: ".concat(t, " message: ").concat(e.errMsg)), n && n(new Error(e.errMsg))
                        }
                    })
                }, downloadFile: function (t, e, n, r, o) {
                    var i = {
                        url: t, success: function (e) {
                            200 === e.statusCode ? o && o(null, e.tempFilePath || e.filePath) : (e.filePath && a.deleteFile(e.filePath), console.warn("Download file failed: path: ".concat(t, " message: ").concat(e.statusCode)), o && o(new Error(e.statusCode), null))
                        }, fail: function (e) {
                            console.warn("Download file failed: path: ".concat(t, " message: ").concat(e.errMsg)), o && o(new Error(e.errMsg), null)
                        }
                    }, e = (e && (i.filePath = e), n && (i.header = n), wx.downloadFile(i));
                    r && e.onProgressUpdate(r)
                }, saveFile: function (t, e, n) {
                    wx.saveFile({
                        tempFilePath: t, filePath: e, success: function (e) {
                            n && n(null)
                        }, fail: function (e) {
                            console.warn("Save file failed: path: ".concat(t, " message: ").concat(e.errMsg)), n && n(new Error(e.errMsg))
                        }
                    })
                }, copyFile: function (t, e, n) {
                    o.copyFile({
                        srcPath: t, destPath: e, success: function () {
                            n && n(null)
                        }, fail: function (e) {
                            console.warn("Copy file failed: path: ".concat(t, " message: ").concat(e.errMsg)), n && n(new Error(e.errMsg))
                        }
                    })
                }, writeFile: function (t, e, n, r) {
                    o.writeFile({
                        filePath: t, encoding: n, data: e, success: function () {
                            r && r(null)
                        }, fail: function (e) {
                            console.warn("Write file failed: path: ".concat(t, " message: ").concat(e.errMsg)), r && r(new Error(e.errMsg))
                        }
                    })
                }, writeFileSync: function (t, e, n) {
                    try {
                        return o.writeFileSync(t, e, n), null
                    } catch (e) {
                        return console.warn("Write file failed: path: ".concat(t, " message: ").concat(e.message)), new Error(e.message)
                    }
                }, readFile: function (t, e, n) {
                    o.readFile({
                        filePath: t, encoding: e, success: function (e) {
                            n && n(null, e.data)
                        }, fail: function (e) {
                            console.warn("Read file failed: path: ".concat(t, " message: ").concat(e.errMsg)), n && n(new Error(e.errMsg), null)
                        }
                    })
                }, readDir: function (t, n) {
                    o.readdir({
                        dirPath: t, success: function (e) {
                            n && n(null, e.files)
                        }, fail: function (e) {
                            console.warn("Read directory failed: path: ".concat(t, " message: ").concat(e.errMsg)), n && n(new Error(e.errMsg), null)
                        }
                    })
                }, readText: function (e, t) {
                    a.readFile(e, "utf8", t)
                }, readArrayBuffer: function (e, t) {
                    a.readFile(e, "", t)
                }, readJson: function (r, o) {
                    a.readFile(r, "utf8", function (t, e) {
                        var n = null;
                        if (!t) try {
                            n = JSON.parse(e)
                        } catch (e) {
                            console.warn("Read json failed: path: ".concat(r, " message: ").concat(e.message)), t = new Error(e.message)
                        }
                        o && o(t, n)
                    })
                }, readJsonSync: function (t) {
                    try {
                        var e = o.readFileSync(t, "utf8");
                        return JSON.parse(e)
                    } catch (e) {
                        return console.warn("Read json failed: path: ".concat(t, " message: ").concat(e.message)), new Error(e.message)
                    }
                }, makeDirSync: function (t, e) {
                    try {
                        return o.mkdirSync(t, e), null
                    } catch (e) {
                        return console.warn("Make directory failed: path: ".concat(t, " message: ").concat(e.message)), new Error(e.message)
                    }
                }, rmdirSync: function (t, e) {
                    try {
                        o.rmdirSync(t, e)
                    } catch (e) {
                        return console.warn("rm directory failed: path: ".concat(t, " message: ").concat(e.message)), new Error(e.message)
                    }
                }, exists: function (e, t) {
                    o.access({
                        path: e, success: function () {
                            t && t(!0)
                        }, fail: function () {
                            t && t(!1)
                        }
                    })
                }, loadSubpackage: function (t, e, n) {
                    var r = wx.loadSubpackage({
                        name: t, success: function () {
                            n && n()
                        }, fail: function (e) {
                            console.warn("Load Subpackage failed: path: ".concat(t, " message: ").concat(e.errMsg)), n && n(new Error("Failed to load subpackage ".concat(t, ": ").concat(e.errMsg)))
                        }
                    });
                    return e && r.onProgressUpdate(e), r
                }, unzip: function (t, e, n) {
                    o.unzip({
                        zipFilePath: t, targetPath: e, success: function () {
                            n && n(null)
                        }, fail: function (e) {
                            console.warn("unzip failed: path: ".concat(t, " message: ").concat(e.errMsg)), n && n(new Error("unzip failed: ".concat(e.errMsg)))
                        }
                    })
                }
            };
        window.fsUtils = t.exports = a
    }, {}], 34: [function (e, t, n) {
        "use strict";
        var r, o, i, a, u, c, e = e("./utils");
        window.__globalAdapter = window.__globalAdapter || {}, window.__globalAdapter && (r = window.__globalAdapter, i = (o = wx.getSystemInfoSync()).windowWidth, a = o.windowHeight < i, r.isSubContext = void 0 === wx.getOpenDataContext, r.isDevTool = "devtools" === o.platform, e.cloneMethod(r, wx, "getSystemInfoSync"), e.cloneMethod(r, wx, "onTouchStart"), e.cloneMethod(r, wx, "onTouchMove"), e.cloneMethod(r, wx, "onTouchEnd"), e.cloneMethod(r, wx, "onTouchCancel"), e.cloneMethod(r, wx, "createInnerAudioContext"), e.cloneMethod(r, wx, "onAudioInterruptionEnd"), e.cloneMethod(r, wx, "onAudioInterruptionBegin"), e.cloneMethod(r, wx, "createVideo"), e.cloneMethod(r, wx, "setPreferredFramesPerSecond"), e.cloneMethod(r, wx, "showKeyboard"), e.cloneMethod(r, wx, "hideKeyboard"), e.cloneMethod(r, wx, "updateKeyboard"), e.cloneMethod(r, wx, "onKeyboardInput"), e.cloneMethod(r, wx, "onKeyboardConfirm"), e.cloneMethod(r, wx, "onKeyboardComplete"), e.cloneMethod(r, wx, "offKeyboardInput"), e.cloneMethod(r, wx, "offKeyboardConfirm"), e.cloneMethod(r, wx, "offKeyboardComplete"), e.cloneMethod(r, wx, "getOpenDataContext"), e.cloneMethod(r, wx, "onMessage"), e.cloneMethod(r, wx, "loadSubpackage"), e.cloneMethod(r, wx, "getSharedCanvas"), e.cloneMethod(r, wx, "loadFont"), e.cloneMethod(r, wx, "onShow"), e.cloneMethod(r, wx, "onHide"), "function" == typeof getApp && (wx.onShow = wx.onAppShow, wx.onHide = wx.onAppHide), e.cloneMethod(r, wx, "onError"), e.cloneMethod(r, wx, "offError"), u = !1, c = 1, wx.onDeviceOrientationChange && wx.onDeviceOrientationChange(function (e) {
            "landscape" === e.value ? c = 1 : "landscapeReverse" === e.value && (c = -1)
        }), Object.assign(r, {
            startAccelerometer: function (i) {
                u ? wx.startAccelerometer && wx.startAccelerometer({
                    fail: function (e) {
                        console.error("start accelerometer failed", e)
                    }
                }) : (u = !0, wx.onAccelerometerChange && wx.onAccelerometerChange(function (e) {
                    var t, n = {}, r = e.x, o = e.y;
                    a && (t = r, r = -o, o = t), n.x = r * c, n.y = o * c, n.z = e.z, i && i(n)
                }))
            }, stopAccelerometer: function () {
                wx.stopAccelerometer && wx.stopAccelerometer({
                    fail: function (e) {
                        console.error("stop accelerometer failed", e)
                    }
                })
            }
        }))
    }, {"./utils": 35}], 35: [function (e, t, n) {
        "use strict";
        t.exports = {
            cloneMethod: function (e, t, n, r) {
                t[n] && (e[r = r || n] = t[n].bind(t))
            }
        }
    }, {}]
}, {}, [27]);