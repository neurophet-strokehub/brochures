/*! lazysizes + ls unveilhooks - v5.3.1 (incl. ls-uvh data-link fix) */
!function(e) {
    var t = function(u, D, f) {
        "use strict";
        var k, H;
        if (function() {
            var e;
            var t = {
                lazyClass: "lazyload",
                loadedClass: "lazyloaded",
                loadingClass: "lazyloading",
                preloadClass: "lazypreload",
                errorClass: "lazyerror",
                autosizesClass: "lazyautosizes",
                fastLoadedClass: "ls-is-cached",
                iframeLoadMode: 0,
                srcAttr: "data-src",
                srcsetAttr: "data-srcset",
                sizesAttr: "data-sizes",
                minSize: 40,
                customMedia: {},
                init: true,
                expFactor: 1.5,
                hFac: .8,
                loadMode: 2,
                loadHidden: true,
                ricTimeout: 0,
                throttleDelay: 125
            };
            H = u.lazySizesConfig || u.lazysizesConfig || {};
            for (e in t) {
                if (!(e in H)) {
                    H[e] = t[e]
                }
            }
        }(),
        !D || !D.getElementsByClassName) {
            return {
                init: function() {},
                cfg: H,
                noSupport: true
            }
        }
        var O = D.documentElement
          , i = u.HTMLPictureElement
          , P = "addEventListener"
          , $ = "getAttribute"
          , q = u[P].bind(u)
          , I = u.setTimeout
          , U = u.requestAnimationFrame || I
          , o = u.requestIdleCallback
          , j = /^picture$/i
          , r = ["load", "error", "lazyincluded", "_lazyloaded"]
          , a = {}
          , G = Array.prototype.forEach
          , J = function(e, t) {
            if (!a[t]) {
                a[t] = new RegExp("(\\s|^)" + t + "(\\s|$)")
            }
            return a[t].test(e[$]("class") || "") && a[t]
        }
          , K = function(e, t) {
            if (!J(e, t)) {
                e.setAttribute("class", (e[$]("class") || "").trim() + " " + t)
            }
        }
          , Q = function(e, t) {
            var a;
            if (a = J(e, t)) {
                e.setAttribute("class", (e[$]("class") || "").replace(a, " "))
            }
        }
          , V = function(t, a, e) {
            var i = e ? P : "removeEventListener";
            if (e) {
                V(t, a)
            }
            r.forEach(function(e) {
                t[i](e, a)
            })
        }
          , X = function(e, t, a, i, r) {
            var n = D.createEvent("Event");
            if (!a) {
                a = {}
            }
            a.instance = k;
            n.initEvent(t, !i, !r);
            n.detail = a;
            e.dispatchEvent(n);
            return n
        }
          , Y = function(e, t) {
            var a;
            if (!i && (a = u.picturefill || H.pf)) {
                if (t && t.src && !e[$]("srcset")) {
                    e.setAttribute("srcset", t.src)
                }
                a({
                    reevaluate: true,
                    elements: [e]
                })
            } else if (t && t.src) {
                e.src = t.src
            }
        }
          , Z = function(e, t) {
            return (getComputedStyle(e, null) || {})[t]
        }
          , s = function(e, t, a) {
            a = a || e.offsetWidth;
            while (a < H.minSize && t && !e._lazysizesWidth) {
                a = t.offsetWidth;
                t = t.parentNode
            }
            return a
        }
          , ee = function() {
            var a, i;
            var t = [];
            var r = [];
            var n = t;
            var s = function() {
                var e = n;
                n = t.length ? r : t;
                a = true;
                i = false;
                while (e.length) {
                    e.shift()()
                }
                a = false
            };
            var e = function(e, t) {
                if (a && !t) {
                    e.apply(this, arguments)
                } else {
                    n.push(e);
                    if (!i) {
                        i = true;
                        (D.hidden ? I : U)(s)
                    }
                }
            };
            e._lsFlush = s;
            return e
        }()
          , te = function(a, e) {
            return e ? function() {
                ee(a)
            }
            : function() {
                var e = this;
                var t = arguments;
                ee(function() {
                    a.apply(e, t)
                })
            }
        }
          , ae = function(e) {
            var a;
            var i = 0;
            var r = H.throttleDelay;
            var n = H.ricTimeout;
            var t = function() {
                a = false;
                i = f.now();
                e()
            };
            var s = o && n > 49 ? function() {
                o(t, {
                    timeout: n
                });
                if (n !== H.ricTimeout) {
                    n = H.ricTimeout
                }
            }
            : te(function() {
                I(t)
            }, true);
            return function(e) {
                var t;
                if (e = e === true) {
                    n = 33
                }
                if (a) {
                    return
                }
                a = true;
                t = r - (f.now() - i);
                if (t < 0) {
                    t = 0
                }
                if (e || t < 9) {
                    s()
                } else {
                    I(s, t)
                }
            }
        }
          , ie = function(e) {
            var t, a;
            var i = 99;
            var r = function() {
                t = null;
                e()
            };
            var n = function() {
                var e = f.now() - a;
                if (e < i) {
                    I(n, i - e)
                } else {
                    (o || r)(r)
                }
            };
            return function() {
                a = f.now();
                if (!t) {
                    t = I(n, i)
                }
            }
        }
          , e = function() {
            var v, m, c, h, e;
            var y, z, g, p, C, b, A;
            var n = /^img$/i;
            var d = /^iframe$/i;
            var E = "onscroll"in u && !/(gle|ing)bot/.test(navigator.userAgent);
            var _ = 0;
            var w = 0;
            var M = 0;
            var N = -1;
            var L = function(e) {
                M--;
                if (!e || M < 0 || !e.target) {
                    M = 0
                }
            };
            var x = function(e) {
                if (A == null) {
                    A = Z(D.body, "visibility") == "hidden"
                }
                return A || !(Z(e.parentNode, "visibility") == "hidden" && Z(e, "visibility") == "hidden")
            };
            var W = function(e, t) {
                var a;
                var i = e;
                var r = x(e);
                g -= t;
                b += t;
                p -= t;
                C += t;
                while (r && (i = i.offsetParent) && i != D.body && i != O) {
                    r = (Z(i, "opacity") || 1) > 0;
                    if (r && Z(i, "overflow") != "visible") {
                        a = i.getBoundingClientRect();
                        r = C > a.left && p < a.right && b > a.top - 1 && g < a.bottom + 1
                    }
                }
                return r
            };
            var t = function() {
                var e, t, a, i, r, n, s, o, l, u, f, c;
                var d = k.elements;
                if ((h = H.loadMode) && M < 8 && (e = d.length)) {
                    t = 0;
                    N++;
                    for (; t < e; t++) {
                        if (!d[t] || d[t]._lazyRace) {
                            continue
                        }
                        if (!E || k.prematureUnveil && k.prematureUnveil(d[t])) {
                            R(d[t]);
                            continue
                        }
                        if (!(o = d[t][$]("data-expand")) || !(n = o * 1)) {
                            n = w
                        }
                        if (!u) {
                            u = !H.expand || H.expand < 1 ? O.clientHeight > 500 && O.clientWidth > 500 ? 500 : 370 : H.expand;
                            k._defEx = u;
                            f = u * H.expFactor;
                            c = H.hFac;
                            A = null;
                            if (w < f && M < 1 && N > 2 && h > 2 && !D.hidden) {
                                w = f;
                                N = 0
                            } else if (h > 1 && N > 1 && M < 6) {
                                w = u
                            } else {
                                w = _
                            }
                        }
                        if (l !== n) {
                            y = innerWidth + n * c;
                            z = innerHeight + n;
                            s = n * -1;
                            l = n
                        }
                        a = d[t].getBoundingClientRect();
                        if ((b = a.bottom) >= s && (g = a.top) <= z && (C = a.right) >= s * c && (p = a.left) <= y && (b || C || p || g) && (H.loadHidden || x(d[t])) && (m && M < 3 && !o && (h < 3 || N < 4) || W(d[t], n))) {
                            R(d[t]);
                            r = true;
                            if (M > 9) {
                                break
                            }
                        } else if (!r && m && !i && M < 4 && N < 4 && h > 2 && (v[0] || H.preloadAfterLoad) && (v[0] || !o && (b || C || p || g || d[t][$](H.sizesAttr) != "auto"))) {
                            i = v[0] || d[t]
                        }
                    }
                    if (i && !r) {
                        R(i)
                    }
                }
            };
            var a = ae(t);
            var S = function(e) {
                var t = e.target;
                if (t._lazyCache) {
                    delete t._lazyCache;
                    return
                }
                L(e);
                K(t, H.loadedClass);
                Q(t, H.loadingClass);
                V(t, B);
                X(t, "lazyloaded")
            };
            var i = te(S);
            var B = function(e) {
                i({
                    target: e.target
                })
            };
            var T = function(e, t) {
                var a = e.getAttribute("data-load-mode") || H.iframeLoadMode;
                if (a == 0) {
                    e.contentWindow.location.replace(t)
                } else if (a == 1) {
                    e.src = t
                }
            };
            var F = function(e) {
                var t;
                var a = e[$](H.srcsetAttr);
                if (t = H.customMedia[e[$]("data-media") || e[$]("media")]) {
                    e.setAttribute("media", t)
                }
                if (a) {
                    e.setAttribute("srcset", a)
                }
            };
            var s = te(function(t, e, a, i, r) {
                var n, s, o, l, u, f;
                if (!(u = X(t, "lazybeforeunveil", e)).defaultPrevented) {
                    if (i) {
                        if (a) {
                            K(t, H.autosizesClass)
                        } else {
                            t.setAttribute("sizes", i)
                        }
                    }
                    s = t[$](H.srcsetAttr);
                    n = t[$](H.srcAttr);
                    if (r) {
                        o = t.parentNode;
                        l = o && j.test(o.nodeName || "")
                    }
                    f = e.firesLoad || "src"in t && (s || n || l);
                    u = {
                        target: t
                    };
                    K(t, H.loadingClass);
                    if (f) {
                        clearTimeout(c);
                        c = I(L, 2500);
                        V(t, B, true)
                    }
                    if (l) {
                        G.call(o.getElementsByTagName("source"), F)
                    }
                    if (s) {
                        t.setAttribute("srcset", s)
                    } else if (n && !l) {
                        if (d.test(t.nodeName)) {
                            T(t, n)
                        } else {
                            t.src = n
                        }
                    }
                    if (r && (s || l)) {
                        Y(t, {
                            src: n
                        })
                    }
                }
                if (t._lazyRace) {
                    delete t._lazyRace
                }
                Q(t, H.lazyClass);
                ee(function() {
                    var e = t.complete && t.naturalWidth > 1;
                    if (!f || e) {
                        if (e) {
                            K(t, H.fastLoadedClass)
                        }
                        S(u);
                        t._lazyCache = true;
                        I(function() {
                            if ("_lazyCache"in t) {
                                delete t._lazyCache
                            }
                        }, 9)
                    }
                    if (t.loading == "lazy") {
                        M--
                    }
                }, true)
            });
            var R = function(e) {
                if (e._lazyRace) {
                    return
                }
                var t;
                var a = n.test(e.nodeName);
                var i = a && (e[$](H.sizesAttr) || e[$]("sizes"));
                var r = i == "auto";
                if ((r || !m) && a && (e[$]("src") || e.srcset) && !e.complete && !J(e, H.errorClass) && J(e, H.lazyClass)) {
                    return
                }
                t = X(e, "lazyunveilread").detail;
                if (r) {
                    re.updateElem(e, true, e.offsetWidth)
                }
                e._lazyRace = true;
                M++;
                s(e, t, r, i, a)
            };
            var r = ie(function() {
                H.loadMode = 3;
                a()
            });
            var o = function() {
                if (H.loadMode == 3) {
                    H.loadMode = 2
                }
                r()
            };
            var l = function() {
                if (m) {
                    return
                }
                if (f.now() - e < 999) {
                    I(l, 999);
                    return
                }
                m = true;
                H.loadMode = 3;
                a();
                q("scroll", o, true)
            };
            return {
                _: function() {
                    e = f.now();
                    k.elements = D.getElementsByClassName(H.lazyClass);
                    v = D.getElementsByClassName(H.lazyClass + " " + H.preloadClass);
                    q("scroll", a, true);
                    q("resize", a, true);
                    q("pageshow", function(e) {
                        if (e.persisted) {
                            var t = D.querySelectorAll("." + H.loadingClass);
                            if (t.length && t.forEach) {
                                U(function() {
                                    t.forEach(function(e) {
                                        if (e.complete) {
                                            R(e)
                                        }
                                    })
                                })
                            }
                        }
                    });
                    if (u.MutationObserver) {
                        new MutationObserver(a).observe(O, {
                            childList: true,
                            subtree: true,
                            attributes: true
                        })
                    } else {
                        O[P]("DOMNodeInserted", a, true);
                        O[P]("DOMAttrModified", a, true);
                        setInterval(a, 999)
                    }
                    q("hashchange", a, true);
                    ["focus", "mouseover", "click", "load", "transitionend", "animationend"].forEach(function(e) {
                        D[P](e, a, true)
                    });
                    if (/d$|^c/.test(D.readyState)) {
                        l()
                    } else {
                        q("load", l);
                        D[P]("DOMContentLoaded", a);
                        I(l, 2e4)
                    }
                    if (k.elements.length) {
                        t();
                        ee._lsFlush()
                    } else {
                        a()
                    }
                },
                checkElems: a,
                unveil: R,
                _aLSL: o
            }
        }()
          , re = function() {
            var a;
            var n = te(function(e, t, a, i) {
                var r, n, s;
                e._lazysizesWidth = i;
                i += "px";
                e.setAttribute("sizes", i);
                if (j.test(t.nodeName || "")) {
                    r = t.getElementsByTagName("source");
                    for (n = 0,
                    s = r.length; n < s; n++) {
                        r[n].setAttribute("sizes", i)
                    }
                }
                if (!a.detail.dataAttr) {
                    Y(e, a.detail)
                }
            });
            var i = function(e, t, a) {
                var i;
                var r = e.parentNode;
                if (r) {
                    a = s(e, r, a);
                    i = X(e, "lazybeforesizes", {
                        width: a,
                        dataAttr: !!t
                    });
                    if (!i.defaultPrevented) {
                        a = i.detail.width;
                        if (a && a !== e._lazysizesWidth) {
                            n(e, r, i, a)
                        }
                    }
                }
            };
            var e = function() {
                var e;
                var t = a.length;
                if (t) {
                    e = 0;
                    for (; e < t; e++) {
                        i(a[e])
                    }
                }
            };
            var t = ie(e);
            return {
                _: function() {
                    a = D.getElementsByClassName(H.autosizesClass);
                    q("resize", t)
                },
                checkElems: t,
                updateElem: i
            }
        }()
          , t = function() {
            if (!t.i && D.getElementsByClassName) {
                t.i = true;
                re._();
                e._()
            }
        };
        return I(function() {
            H.init && t()
        }),
        k = {
            cfg: H,
            autoSizer: re,
            loader: e,
            init: t,
            uP: Y,
            aC: K,
            rC: Q,
            hC: J,
            fire: X,
            gW: s,
            rAF: ee
        }
    }(e, e.document, Date);
    e.lazySizes = t,
    "object" == typeof module && module.exports && (module.exports = t)
}("undefined" != typeof window ? window : {});
!function(e, t) {
    var a = function() {
        t(e.lazySizes),
        e.removeEventListener("lazyunveilread", a, !0)
    };
    t = t.bind(null, e, e.document),
    "object" == typeof module && module.exports ? t(require("lazysizes")) : "function" == typeof define && define.amd ? define(["lazysizes"], t) : e.lazySizes ? a() : e.addEventListener("lazyunveilread", a, !0)
}(window, function(e, i, o) {
    "use strict";
    var l, d, u = {};
    function s(e, t, a) {
        var n, r;
        u[e] || (n = i.createElement(t ? "link" : "script"),
        r = i.getElementsByTagName("script")[0],
        t ? (n.rel = "stylesheet",
        n.href = e) : (n.onload = function() {
            n.onerror = null,
            n.onload = null,
            a()
        }
        ,
        n.onerror = n.onload,
        n.src = e),
        u[e] = !0,
        u[n.src || n.href] = !0,
        r.parentNode.insertBefore(n, r))
    }
    i.addEventListener && (l = function(e, t) {
        var a = i.createElement("img");
        a.onload = function() {
            a.onload = null,
            a.onerror = null,
            a = null,
            t()
        }
        ,
        a.onerror = a.onload,
        a.src = e,
        a && a.complete && a.onload && a.onload()
    }
    ,
    addEventListener("lazybeforeunveil", function(e) {
        var t, a, n;
        if (e.detail.instance == o && !e.defaultPrevented) {
            var r = e.target;
            if ("none" == r.preload && (r.preload = r.getAttribute("data-preload") || "auto"),
            null != r.getAttribute("data-autoplay"))
                if (r.getAttribute("data-expand") && !r.autoplay)
                    try {
                        r.play()
                    } catch (e) {}
                else
                    requestAnimationFrame(function() {
                        r.setAttribute("data-expand", "-10"),
                        o.aC(r, o.cfg.lazyClass)
                    });
            (t = r.getAttribute("data-link")) && "img" != r.tagName.toLowerCase() && s(t, !0),
            (t = r.getAttribute("data-script")) && (e.detail.firesLoad = !0,
            s(t, null, function() {
                e.detail.firesLoad = !1,
                o.fire(r, "_lazyloaded", {}, !0, !0)
            })),
            (t = r.getAttribute("data-require")) && (o.cfg.requireJs ? o.cfg.requireJs([t]) : s(t)),
            (a = r.getAttribute("data-bg")) && (e.detail.firesLoad = !0,
            l(a, function() {
                r.style.backgroundImage = "url(" + (d.test(a) ? JSON.stringify(a) : a) + ")",
                e.detail.firesLoad = !1,
                o.fire(r, "_lazyloaded", {}, !0, !0)
            })),
            (n = r.getAttribute("data-poster")) && (e.detail.firesLoad = !0,
            l(n, function() {
                r.poster = n,
                e.detail.firesLoad = !1,
                o.fire(r, "_lazyloaded", {}, !0, !0)
            }))
        }
    }, !(d = /\(|\)|\s|'/)))
});
/*!***************************************************
* mark.js v8.11.1
* https://markjs.io/
* Copyright (c) 2014–2018, Julian Kühnel
* Released under the MIT license https://git.io/vwTVl
*****************************************************/
!function(e, t) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : e.Mark = t()
}(this, (function() {
    "use strict";
    var e = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
        return typeof e
    }
    : function(e) {
        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
    }
      , t = function(e, t) {
        if (!(e instanceof t))
            throw new TypeError("Cannot call a class as a function")
    }
      , n = function() {
        function e(e, t) {
            for (var n = 0; n < t.length; n++) {
                var r = t[n];
                r.enumerable = r.enumerable || !1,
                r.configurable = !0,
                "value"in r && (r.writable = !0),
                Object.defineProperty(e, r.key, r)
            }
        }
        return function(t, n, r) {
            return n && e(t.prototype, n),
            r && e(t, r),
            t
        }
    }()
      , r = Object.assign || function(e) {
        for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n)
                Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
        }
        return e
    }
      , i = function() {
        function e(n) {
            var r = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1]
              , i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : []
              , o = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 5e3;
            t(this, e),
            this.ctx = n,
            this.iframes = r,
            this.exclude = i,
            this.iframesTimeout = o
        }
        return n(e, [{
            key: "getContexts",
            value: function() {
                var e = [];
                return (void 0 !== this.ctx && this.ctx ? NodeList.prototype.isPrototypeOf(this.ctx) ? Array.prototype.slice.call(this.ctx) : Array.isArray(this.ctx) ? this.ctx : "string" == typeof this.ctx ? Array.prototype.slice.call(document.querySelectorAll(this.ctx)) : [this.ctx] : []).forEach((function(t) {
                    var n = e.filter((function(e) {
                        return e.contains(t)
                    }
                    )).length > 0;
                    -1 !== e.indexOf(t) || n || e.push(t)
                }
                )),
                e
            }
        }, {
            key: "getIframeContents",
            value: function(e, t) {
                var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : function() {}
                  , r = void 0;
                try {
                    var i = e.contentWindow;
                    if (r = i.document,
                    !i || !r)
                        throw new Error("iframe inaccessible")
                } catch (e) {
                    n()
                }
                r && t(r)
            }
        }, {
            key: "isIframeBlank",
            value: function(e) {
                var t = e.getAttribute("src").trim();
                return "about:blank" === e.contentWindow.location.href && "about:blank" !== t && t
            }
        }, {
            key: "observeIframeLoad",
            value: function(e, t, n) {
                var r = this
                  , i = !1
                  , o = null
                  , a = function a() {
                    if (!i) {
                        i = !0,
                        clearTimeout(o);
                        try {
                            r.isIframeBlank(e) || (e.removeEventListener("load", a),
                            r.getIframeContents(e, t, n))
                        } catch (e) {
                            n()
                        }
                    }
                };
                e.addEventListener("load", a),
                o = setTimeout(a, this.iframesTimeout)
            }
        }, {
            key: "onIframeReady",
            value: function(e, t, n) {
                try {
                    "complete" === e.contentWindow.document.readyState ? this.isIframeBlank(e) ? this.observeIframeLoad(e, t, n) : this.getIframeContents(e, t, n) : this.observeIframeLoad(e, t, n)
                } catch (e) {
                    n()
                }
            }
        }, {
            key: "waitForIframes",
            value: function(e, t) {
                var n = this
                  , r = 0;
                this.forEachIframe(e, (function() {
                    return !0
                }
                ), (function(e) {
                    r++,
                    n.waitForIframes(e.querySelector("html"), (function() {
                        --r || t()
                    }
                    ))
                }
                ), (function(e) {
                    e || t()
                }
                ))
            }
        }, {
            key: "forEachIframe",
            value: function(t, n, r) {
                var i = this
                  , o = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : function() {}
                  , a = t.querySelectorAll("iframe")
                  , s = a.length
                  , c = 0;
                a = Array.prototype.slice.call(a);
                var u = function() {
                    --s <= 0 && o(c)
                };
                s || u(),
                a.forEach((function(t) {
                    e.matches(t, i.exclude) ? u() : i.onIframeReady(t, (function(e) {
                        n(t) && (c++,
                        r(e)),
                        u()
                    }
                    ), u)
                }
                ))
            }
        }, {
            key: "createIterator",
            value: function(e, t, n) {
                return document.createNodeIterator(e, t, n, !1)
            }
        }, {
            key: "createInstanceOnIframe",
            value: function(t) {
                return new e(t.querySelector("html"),this.iframes)
            }
        }, {
            key: "compareNodeIframe",
            value: function(e, t, n) {
                if (e.compareDocumentPosition(n) & Node.DOCUMENT_POSITION_PRECEDING) {
                    if (null === t)
                        return !0;
                    if (t.compareDocumentPosition(n) & Node.DOCUMENT_POSITION_FOLLOWING)
                        return !0
                }
                return !1
            }
        }, {
            key: "getIteratorNode",
            value: function(e) {
                var t = e.previousNode();
                return {
                    prevNode: t,
                    node: (null === t || e.nextNode()) && e.nextNode()
                }
            }
        }, {
            key: "checkIframeFilter",
            value: function(e, t, n, r) {
                var i = !1
                  , o = !1;
                return r.forEach((function(e, t) {
                    e.val === n && (i = t,
                    o = e.handled)
                }
                )),
                this.compareNodeIframe(e, t, n) ? (!1 !== i || o ? !1 === i || o || (r[i].handled = !0) : r.push({
                    val: n,
                    handled: !0
                }),
                !0) : (!1 === i && r.push({
                    val: n,
                    handled: !1
                }),
                !1)
            }
        }, {
            key: "handleOpenIframes",
            value: function(e, t, n, r) {
                var i = this;
                e.forEach((function(e) {
                    e.handled || i.getIframeContents(e.val, (function(e) {
                        i.createInstanceOnIframe(e).forEachNode(t, n, r)
                    }
                    ))
                }
                ))
            }
        }, {
            key: "iterateThroughNodes",
            value: function(e, t, n, r, i) {
                for (var o, a = this, s = this.createIterator(t, e, r), c = [], u = [], l = void 0, h = void 0; o = a.getIteratorNode(s),
                h = o.prevNode,
                l = o.node; )
                    this.iframes && this.forEachIframe(t, (function(e) {
                        return a.checkIframeFilter(l, h, e, c)
                    }
                    ), (function(t) {
                        a.createInstanceOnIframe(t).forEachNode(e, (function(e) {
                            return u.push(e)
                        }
                        ), r)
                    }
                    )),
                    u.push(l);
                u.forEach((function(e) {
                    n(e)
                }
                )),
                this.iframes && this.handleOpenIframes(c, e, n, r),
                i()
            }
        }, {
            key: "forEachNode",
            value: function(e, t, n) {
                var r = this
                  , i = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : function() {}
                  , o = this.getContexts()
                  , a = o.length;
                a || i(),
                o.forEach((function(o) {
                    var s = function() {
                        r.iterateThroughNodes(e, o, t, n, (function() {
                            --a <= 0 && i()
                        }
                        ))
                    };
                    r.iframes ? r.waitForIframes(o, s) : s()
                }
                ))
            }
        }], [{
            key: "matches",
            value: function(e, t) {
                var n = "string" == typeof t ? [t] : t
                  , r = e.matches || e.matchesSelector || e.msMatchesSelector || e.mozMatchesSelector || e.oMatchesSelector || e.webkitMatchesSelector;
                if (r) {
                    var i = !1;
                    return n.every((function(t) {
                        return !r.call(e, t) || (i = !0,
                        !1)
                    }
                    )),
                    i
                }
                return !1
            }
        }]),
        e
    }()
      , o = function() {
        function o(e) {
            t(this, o),
            this.ctx = e,
            this.ie = !1;
            var n = window.navigator.userAgent;
            (n.indexOf("MSIE") > -1 || n.indexOf("Trident") > -1) && (this.ie = !0)
        }
        return n(o, [{
            key: "log",
            value: function(t) {
                var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "debug"
                  , r = this.opt.log;
                this.opt.debug && "object" === (void 0 === r ? "undefined" : e(r)) && "function" == typeof r[n] && r[n]("mark.js: " + t)
            }
        }, {
            key: "escapeStr",
            value: function(e) {
                return e.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&")
            }
        }, {
            key: "createRegExp",
            value: function(e) {
                return "disabled" !== this.opt.wildcards && (e = this.setupWildcardsRegExp(e)),
                e = this.escapeStr(e),
                Object.keys(this.opt.synonyms).length && (e = this.createSynonymsRegExp(e)),
                (this.opt.ignoreJoiners || this.opt.ignorePunctuation.length) && (e = this.setupIgnoreJoinersRegExp(e)),
                this.opt.diacritics && (e = this.createDiacriticsRegExp(e)),
                e = this.createMergedBlanksRegExp(e),
                (this.opt.ignoreJoiners || this.opt.ignorePunctuation.length) && (e = this.createJoinersRegExp(e)),
                "disabled" !== this.opt.wildcards && (e = this.createWildcardsRegExp(e)),
                this.createAccuracyRegExp(e)
            }
        }, {
            key: "createSynonymsRegExp",
            value: function(e) {
                var t = this.opt.synonyms
                  , n = this.opt.caseSensitive ? "" : "i"
                  , r = this.opt.ignoreJoiners || this.opt.ignorePunctuation.length ? "\0" : "";
                for (var i in t)
                    if (t.hasOwnProperty(i)) {
                        var o = t[i]
                          , a = "disabled" !== this.opt.wildcards ? this.setupWildcardsRegExp(i) : this.escapeStr(i)
                          , s = "disabled" !== this.opt.wildcards ? this.setupWildcardsRegExp(o) : this.escapeStr(o);
                        "" !== a && "" !== s && (e = e.replace(new RegExp("(" + this.escapeStr(a) + "|" + this.escapeStr(s) + ")","gm" + n), r + "(" + this.processSynomyms(a) + "|" + this.processSynomyms(s) + ")" + r))
                    }
                return e
            }
        }, {
            key: "processSynomyms",
            value: function(e) {
                return (this.opt.ignoreJoiners || this.opt.ignorePunctuation.length) && (e = this.setupIgnoreJoinersRegExp(e)),
                e
            }
        }, {
            key: "setupWildcardsRegExp",
            value: function(e) {
                return (e = e.replace(/(?:\\)*\?/g, (function(e) {
                    return "\\" === e.charAt(0) ? "?" : ""
                }
                ))).replace(/(?:\\)*\*/g, (function(e) {
                    return "\\" === e.charAt(0) ? "*" : ""
                }
                ))
            }
        }, {
            key: "createWildcardsRegExp",
            value: function(e) {
                var t = "withSpaces" === this.opt.wildcards;
                return e.replace(/\u0001/g, t ? "[\\S\\s]?" : "\\S?").replace(/\u0002/g, t ? "[\\S\\s]*?" : "\\S*")
            }
        }, {
            key: "setupIgnoreJoinersRegExp",
            value: function(e) {
                return e.replace(/[^(|)\\]/g, (function(e, t, n) {
                    var r = n.charAt(t + 1);
                    return /[(|)\\]/.test(r) || "" === r ? e : e + "\0"
                }
                ))
            }
        }, {
            key: "createJoinersRegExp",
            value: function(e) {
                var t = []
                  , n = this.opt.ignorePunctuation;
                return Array.isArray(n) && n.length && t.push(this.escapeStr(n.join(""))),
                this.opt.ignoreJoiners && t.push("\\u00ad\\u200b\\u200c\\u200d"),
                t.length ? e.split(/\u0000+/).join("[" + t.join("") + "]*") : e
            }
        }, {
            key: "createDiacriticsRegExp",
            value: function(e) {
                var t = this.opt.caseSensitive ? "" : "i"
                  , n = this.opt.caseSensitive ? ["aàáảãạăằắẳẵặâầấẩẫậäåāą", "AÀÁẢÃẠĂẰẮẲẴẶÂẦẤẨẪẬÄÅĀĄ", "cçćč", "CÇĆČ", "dđď", "DĐĎ", "eèéẻẽẹêềếểễệëěēę", "EÈÉẺẼẸÊỀẾỂỄỆËĚĒĘ", "iìíỉĩịîïī", "IÌÍỈĨỊÎÏĪ", "lł", "LŁ", "nñňń", "NÑŇŃ", "oòóỏõọôồốổỗộơởỡớờợöøō", "OÒÓỎÕỌÔỒỐỔỖỘƠỞỠỚỜỢÖØŌ", "rř", "RŘ", "sšśșş", "SŠŚȘŞ", "tťțţ", "TŤȚŢ", "uùúủũụưừứửữựûüůū", "UÙÚỦŨỤƯỪỨỬỮỰÛÜŮŪ", "yýỳỷỹỵÿ", "YÝỲỶỸỴŸ", "zžżź", "ZŽŻŹ"] : ["aàáảãạăằắẳẵặâầấẩẫậäåāąAÀÁẢÃẠĂẰẮẲẴẶÂẦẤẨẪẬÄÅĀĄ", "cçćčCÇĆČ", "dđďDĐĎ", "eèéẻẽẹêềếểễệëěēęEÈÉẺẼẸÊỀẾỂỄỆËĚĒĘ", "iìíỉĩịîïīIÌÍỈĨỊÎÏĪ", "lłLŁ", "nñňńNÑŇŃ", "oòóỏõọôồốổỗộơởỡớờợöøōOÒÓỎÕỌÔỒỐỔỖỘƠỞỠỚỜỢÖØŌ", "rřRŘ", "sšśșşSŠŚȘŞ", "tťțţTŤȚŢ", "uùúủũụưừứửữựûüůūUÙÚỦŨỤƯỪỨỬỮỰÛÜŮŪ", "yýỳỷỹỵÿYÝỲỶỸỴŸ", "zžżźZŽŻŹ"]
                  , r = [];
                return e.split("").forEach((function(i) {
                    n.every((function(n) {
                        if (-1 !== n.indexOf(i)) {
                            if (r.indexOf(n) > -1)
                                return !1;
                            e = e.replace(new RegExp("[" + n + "]","gm" + t), "[" + n + "]"),
                            r.push(n)
                        }
                        return !0
                    }
                    ))
                }
                )),
                e
            }
        }, {
            key: "createMergedBlanksRegExp",
            value: function(e) {
                return e.replace(/[\s]+/gim, "[\\s]+")
            }
        }, {
            key: "createAccuracyRegExp",
            value: function(e) {
                var t = this
                  , n = this.opt.accuracy
                  , r = "string" == typeof n ? n : n.value
                  , i = "";
                switch (("string" == typeof n ? [] : n.limiters).forEach((function(e) {
                    i += "|" + t.escapeStr(e)
                }
                )),
                r) {
                case "partially":
                default:
                    return "()(" + e + ")";
                case "complementary":
                    return "()([^" + (i = "\\s" + (i || this.escapeStr("!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~¡¿"))) + "]*" + e + "[^" + i + "]*)";
                case "exactly":
                    return "(^|\\s" + i + ")(" + e + ")(?=$|\\s" + i + ")"
                }
            }
        }, {
            key: "getSeparatedKeywords",
            value: function(e) {
                var t = this
                  , n = [];
                return e.forEach((function(e) {
                    t.opt.separateWordSearch ? e.split(" ").forEach((function(e) {
                        e.trim() && -1 === n.indexOf(e) && n.push(e)
                    }
                    )) : e.trim() && -1 === n.indexOf(e) && n.push(e)
                }
                )),
                {
                    keywords: n.sort((function(e, t) {
                        return t.length - e.length
                    }
                    )),
                    length: n.length
                }
            }
        }, {
            key: "isNumeric",
            value: function(e) {
                return Number(parseFloat(e)) == e
            }
        }, {
            key: "checkRanges",
            value: function(e) {
                var t = this;
                if (!Array.isArray(e) || "[object Object]" !== Object.prototype.toString.call(e[0]))
                    return this.log("markRanges() will only accept an array of objects"),
                    this.opt.noMatch(e),
                    [];
                var n = []
                  , r = 0;
                return e.sort((function(e, t) {
                    return e.start - t.start
                }
                )).forEach((function(e) {
                    var i = t.callNoMatchOnInvalidRanges(e, r)
                      , o = i.start
                      , a = i.end;
                    i.valid && (e.start = o,
                    e.length = a - o,
                    n.push(e),
                    r = a)
                }
                )),
                n
            }
        }, {
            key: "callNoMatchOnInvalidRanges",
            value: function(e, t) {
                var n = void 0
                  , r = void 0
                  , i = !1;
                return e && void 0 !== e.start ? (r = (n = parseInt(e.start, 10)) + parseInt(e.length, 10),
                this.isNumeric(e.start) && this.isNumeric(e.length) && r - t > 0 && r - n > 0 ? i = !0 : (this.log("Ignoring invalid or overlapping range: " + JSON.stringify(e)),
                this.opt.noMatch(e))) : (this.log("Ignoring invalid range: " + JSON.stringify(e)),
                this.opt.noMatch(e)),
                {
                    start: n,
                    end: r,
                    valid: i
                }
            }
        }, {
            key: "checkWhitespaceRanges",
            value: function(e, t, n) {
                var r = void 0
                  , i = !0
                  , o = n.length
                  , a = t - o
                  , s = parseInt(e.start, 10) - a;
                return (r = (s = s > o ? o : s) + parseInt(e.length, 10)) > o && (r = o,
                this.log("End range automatically set to the max value of " + o)),
                s < 0 || r - s < 0 || s > o || r > o ? (i = !1,
                this.log("Invalid range: " + JSON.stringify(e)),
                this.opt.noMatch(e)) : "" === n.substring(s, r).replace(/\s+/g, "") && (i = !1,
                this.log("Skipping whitespace only range: " + JSON.stringify(e)),
                this.opt.noMatch(e)),
                {
                    start: s,
                    end: r,
                    valid: i
                }
            }
        }, {
            key: "getTextNodes",
            value: function(e) {
                var t = this
                  , n = ""
                  , r = [];
                this.iterator.forEachNode(NodeFilter.SHOW_TEXT, (function(e) {
                    r.push({
                        start: n.length,
                        end: (n += e.textContent).length,
                        node: e
                    })
                }
                ), (function(e) {
                    return t.matchesExclude(e.parentNode) ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT
                }
                ), (function() {
                    e({
                        value: n,
                        nodes: r
                    })
                }
                ))
            }
        }, {
            key: "matchesExclude",
            value: function(e) {
                return i.matches(e, this.opt.exclude.concat(["script", "style", "title", "head", "html"]))
            }
        }, {
            key: "wrapRangeInTextNode",
            value: function(e, t, n) {
                var r = this.opt.element ? this.opt.element : "mark"
                  , i = e.splitText(t)
                  , o = i.splitText(n - t)
                  , a = document.createElement(r);
                return a.setAttribute("data-markjs", "true"),
                this.opt.className && a.setAttribute("class", this.opt.className),
                a.textContent = i.textContent,
                i.parentNode.replaceChild(a, i),
                o
            }
        }, {
            key: "wrapRangeInMappedTextNode",
            value: function(e, t, n, r, i) {
                var o = this;
                e.nodes.every((function(a, s) {
                    var c = e.nodes[s + 1];
                    if (void 0 === c || c.start > t) {
                        if (!r(a.node))
                            return !1;
                        var u = t - a.start
                          , l = (n > a.end ? a.end : n) - a.start
                          , h = e.value.substr(0, a.start)
                          , f = e.value.substr(l + a.start);
                        if (a.node = o.wrapRangeInTextNode(a.node, u, l),
                        e.value = h + f,
                        e.nodes.forEach((function(t, n) {
                            n >= s && (e.nodes[n].start > 0 && n !== s && (e.nodes[n].start -= l),
                            e.nodes[n].end -= l)
                        }
                        )),
                        n -= l,
                        i(a.node.previousSibling, a.start),
                        !(n > a.end))
                            return !1;
                        t = a.end
                    }
                    return !0
                }
                ))
            }
        }, {
            key: "wrapMatches",
            value: function(e, t, n, r, i) {
                var o = this
                  , a = 0 === t ? 0 : t + 1;
                this.getTextNodes((function(t) {
                    t.nodes.forEach((function(t) {
                        t = t.node;
                        for (var i = void 0; null !== (i = e.exec(t.textContent)) && "" !== i[a]; )
                            if (n(i[a], t)) {
                                var s = i.index;
                                if (0 !== a)
                                    for (var c = 1; c < a; c++)
                                        s += i[c].length;
                                t = o.wrapRangeInTextNode(t, s, s + i[a].length),
                                r(t.previousSibling),
                                e.lastIndex = 0
                            }
                    }
                    )),
                    i()
                }
                ))
            }
        }, {
            key: "wrapMatchesAcrossElements",
            value: function(e, t, n, r, i) {
                var o = this
                  , a = 0 === t ? 0 : t + 1;
                this.getTextNodes((function(t) {
                    for (var s = void 0; null !== (s = e.exec(t.value)) && "" !== s[a]; ) {
                        var c = s.index;
                        if (0 !== a)
                            for (var u = 1; u < a; u++)
                                c += s[u].length;
                        var l = c + s[a].length;
                        o.wrapRangeInMappedTextNode(t, c, l, (function(e) {
                            return n(s[a], e)
                        }
                        ), (function(t, n) {
                            e.lastIndex = n,
                            r(t)
                        }
                        ))
                    }
                    i()
                }
                ))
            }
        }, {
            key: "wrapRangeFromIndex",
            value: function(e, t, n, r) {
                var i = this;
                this.getTextNodes((function(o) {
                    var a = o.value.length;
                    e.forEach((function(e, r) {
                        var s = i.checkWhitespaceRanges(e, a, o.value)
                          , c = s.start
                          , u = s.end;
                        s.valid && i.wrapRangeInMappedTextNode(o, c, u, (function(n) {
                            return t(n, e, o.value.substring(c, u), r)
                        }
                        ), (function(t) {
                            n(t, e)
                        }
                        ))
                    }
                    )),
                    r()
                }
                ))
            }
        }, {
            key: "unwrapMatches",
            value: function(e) {
                for (var t = e.parentNode, n = document.createDocumentFragment(); e.firstChild; )
                    n.appendChild(e.removeChild(e.firstChild));
                t.replaceChild(n, e),
                this.ie ? this.normalizeTextNode(t) : t.normalize()
            }
        }, {
            key: "normalizeTextNode",
            value: function(e) {
                if (e) {
                    if (3 === e.nodeType)
                        for (; e.nextSibling && 3 === e.nextSibling.nodeType; )
                            e.nodeValue += e.nextSibling.nodeValue,
                            e.parentNode.removeChild(e.nextSibling);
                    else
                        this.normalizeTextNode(e.firstChild);
                    this.normalizeTextNode(e.nextSibling)
                }
            }
        }, {
            key: "markRegExp",
            value: function(e, t) {
                var n = this;
                this.opt = t,
                this.log('Searching with expression "' + e + '"');
                var r = 0
                  , i = "wrapMatches";
                this.opt.acrossElements && (i = "wrapMatchesAcrossElements"),
                this[i](e, this.opt.ignoreGroups, (function(e, t) {
                    return n.opt.filter(t, e, r)
                }
                ), (function(e) {
                    r++,
                    n.opt.each(e)
                }
                ), (function() {
                    0 === r && n.opt.noMatch(e),
                    n.opt.done(r)
                }
                ))
            }
        }, {
            key: "mark",
            value: function(e, t) {
                var n = this;
                this.opt = t;
                var r = 0
                  , i = "wrapMatches"
                  , o = this.getSeparatedKeywords("string" == typeof e ? [e] : e)
                  , a = o.keywords
                  , s = o.length
                  , c = this.opt.caseSensitive ? "" : "i";
                this.opt.acrossElements && (i = "wrapMatchesAcrossElements"),
                0 === s ? this.opt.done(r) : function e(t) {
                    var o = new RegExp(n.createRegExp(t),"gm" + c)
                      , u = 0;
                    n.log('Searching with expression "' + o + '"'),
                    n[i](o, 1, (function(e, i) {
                        return n.opt.filter(i, t, r, u)
                    }
                    ), (function(e) {
                        u++,
                        r++,
                        n.opt.each(e)
                    }
                    ), (function() {
                        0 === u && n.opt.noMatch(t),
                        a[s - 1] === t ? n.opt.done(r) : e(a[a.indexOf(t) + 1])
                    }
                    ))
                }(a[0])
            }
        }, {
            key: "markRanges",
            value: function(e, t) {
                var n = this;
                this.opt = t;
                var r = 0
                  , i = this.checkRanges(e);
                i && i.length ? (this.log("Starting to mark with the following ranges: " + JSON.stringify(i)),
                this.wrapRangeFromIndex(i, (function(e, t, r, i) {
                    return n.opt.filter(e, t, r, i)
                }
                ), (function(e, t) {
                    r++,
                    n.opt.each(e, t)
                }
                ), (function() {
                    n.opt.done(r)
                }
                ))) : this.opt.done(r)
            }
        }, {
            key: "unmark",
            value: function(e) {
                var t = this;
                this.opt = e;
                var n = this.opt.element ? this.opt.element : "*";
                n += "[data-markjs]",
                this.opt.className && (n += "." + this.opt.className),
                this.log('Removal selector "' + n + '"'),
                this.iterator.forEachNode(NodeFilter.SHOW_ELEMENT, (function(e) {
                    t.unwrapMatches(e)
                }
                ), (function(e) {
                    var r = i.matches(e, n)
                      , o = t.matchesExclude(e);
                    return !r || o ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT
                }
                ), this.opt.done)
            }
        }, {
            key: "opt",
            set: function(e) {
                this._opt = r({}, {
                    element: "",
                    className: "",
                    exclude: [],
                    iframes: !1,
                    iframesTimeout: 5e3,
                    separateWordSearch: !0,
                    diacritics: !0,
                    synonyms: {},
                    accuracy: "partially",
                    acrossElements: !1,
                    caseSensitive: !1,
                    ignoreJoiners: !1,
                    ignoreGroups: 0,
                    ignorePunctuation: [],
                    wildcards: "disabled",
                    each: function() {},
                    noMatch: function() {},
                    filter: function() {
                        return !0
                    },
                    done: function() {},
                    debug: !1,
                    log: window.console
                }, e)
            },
            get: function() {
                return this._opt
            }
        }, {
            key: "iterator",
            get: function() {
                return new i(this.ctx,this.opt.iframes,this.opt.exclude,this.opt.iframesTimeout)
            }
        }]),
        o
    }();
    return function(e) {
        var t = this
          , n = new o(e);
        return this.mark = function(e, r) {
            return n.mark(e, r),
            t
        }
        ,
        this.markRegExp = function(e, r) {
            return n.markRegExp(e, r),
            t
        }
        ,
        this.markRanges = function(e, r) {
            return n.markRanges(e, r),
            t
        }
        ,
        this.unmark = function(e) {
            return n.unmark(e),
            t
        }
        ,
        this
    }
}
));
