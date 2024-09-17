var FLIPBOOK = FLIPBOOK || {};
FLIPBOOK.PageWebGL = function(t, e, i, s, o, n) {
    THREE.Object3D.call(this),
    this.book = t,
    this.index = e,
    this.pW = s.pageWidth,
    this.pH = s.pageHeight,
    this.nfacesw = s.pageSegmentsW,
    this.nfacesh = s.pageSegmentsH,
    this.mats = [],
    this.pageHardness = i,
    this.pageThickness = i,
    this.duration = s.pageFlipDuration,
    this.angle = 0,
    this.force = 10,
    this.offset = 0,
    this.mod = null,
    this.bend = null,
    this.pivot = null,
    this.isFlippedLeft = !1,
    this.isFlippedRight = !0,
    this.flippingLeft = !1,
    this.flippingRight = !1,
    this.options = s;
    var h = s.rightToLeft ? s.pages.length / 2 - this.index - 1 : this.index;
    this.indexF = s.rightToLeft ? 2 * h + 1 : 2 * h,
    this.indexB = s.rightToLeft ? 2 * h : 2 * h + 1,
    this.showing = !1,
    this.preloaderMatF = o,
    this.preloaderMatB = n,
    this.preloaderMatF = o,
    this.preloaderMatB = n,
    this.htmlLoaded = {
        front: !1,
        back: !1
    };
    var a = this;
    0 == e && this.options.cornerCurl && (this.nfacesw = 20,
    this.nfacesh = 20,
    this.cornerCurlTween = FLIPBOOK.animate({
        from: 0,
        to: 1,
        duration: 1e3,
        easing: "easeInOutQuad",
        repeat: 1 / 0,
        yoyo: !0,
        step: function(t) {
            a.cornerCurl && (a.b2.force = -1.8 * t,
            a.modF && a.modF.apply(),
            a.book.needsUpdate = !0)
        }
    })),
    this.gF = new THREE.BoxGeometry(this.pW,this.pH,.01,this.nfacesw,this.nfacesh,0);
    var r, p = new THREE.MeshBasicMaterial({
        color: 15592941
    }), d = [p, p, p, p, o, n];
    r = [p, p, p, p, p, p],
    this.options.pagePreloader && (r = [p, p, p, p, o, n]),
    this.cube = new THREE.Mesh(this.gF,d),
    this.cube.position.x = .5 * this.pW,
    this.options.shadows && (this.cube.castShadow = !0,
    this.cube.receiveShadow = !0),
    this.gF.faceVertexUvs[1] = this.gF.faceVertexUvs[0],
    this.showMat(),
    this.cubeEmpty = new THREE.Mesh(new THREE.BoxGeometry(this.pW,this.pH,.01,1,1,0),r),
    this.cubeEmpty.position.x = .5 * this.pW,
    this.pageFlippedAngle = Math.PI * this.options.pageFlippedAngle / 180,
    this.bendF = new MOD3.Bend(0,0,0),
    this.bendF.constraint = MOD3.ModConstant.LEFT,
    this.pH > this.pW && (this.bendF.switchAxes = !0),
    this.b2 = new MOD3.Bend(0,0,0),
    this.b2.constraint = MOD3.ModConstant.LEFT,
    this.pH > this.pW && (this.b2.switchAxes = !0),
    this.b2.offset = .98,
    this.b2.setAngle(1),
    this.modF = new MOD3.ModifierStack(new MOD3.LibraryThree,this.cube),
    this.modF.addModifier(this.bendF),
    0 == e && this.options.cornerCurl && this.modF.addModifier(this.b2),
    this.modF.apply()
}
,
FLIPBOOK.PageWebGL.prototype = new THREE.Object3D,
FLIPBOOK.PageWebGL.prototype.constructor = FLIPBOOK.PageWebGL,
FLIPBOOK.PageWebGL.prototype.startCornerCurl = function() {
    this.cornerCurl = !0
}
,
FLIPBOOK.PageWebGL.prototype.stopCornerCurl = function() {
    this.cornerCurl = !1,
    this.b2.force = 0,
    this.modF && this.modF.apply()
}
,
FLIPBOOK.PageWebGL.prototype.loadHTML = async function(t, e) {
    var i = "front" == t ? this.indexF : this.indexB
      , s = this;
    this.htmlLoaded[t] ? e.call(this) : this.options.main.loadPageHTML(i, (function(i) {
        s.htmlLoaded[t] = !0,
        e.call(s)
    }
    ))
}
,
FLIPBOOK.PageWebGL.prototype.load = function(t, e, i) {
    if ((n = this.book.main).wrapperH && n.zoom) {
        var s = this
          , o = this.book.options
          , n = o.main;
        this.disposed = !1;
        var h = o
          , a = n.wrapperH * n.zoom < .8 * h.pageTextureSizeSmall ? h.pageTextureSizeSmall : h.pageTextureSize;
        if ("front" == t) {
            if (!this.options.cover && 0 == this.index)
                return;
            this.sizeFront >= a ? e && e.call(this) : n.loadPage(this.indexF, a, (function(t) {
                if (!s.disposed)
                    if (t)
                        if (s.sizeFront != a) {
                            var i;
                            s.sizeFront = a,
                            t.imageBitmap ? i = new THREE.CanvasTexture(t.imageBitmap) : (i = new THREE.Texture).image = t.image[a] || t.image,
                            i.minFilter = THREE.LinearFilter,
                            i.needsUpdate = !0;
                            var o = 2 * s.index;
                            s.options.cover || o--,
                            "left" == s.options.pages[o].side ? i.repeat.x = .5 : "right" == s.options.pages[o].side && (i.repeat.x = .5,
                            i.offset.x = .5),
                            s.frontMaterial = s.createMaterial(i),
                            s.setFrontMat(s.frontMaterial),
                            e && e.call(s)
                        } else
                            e && e.call(s);
                    else
                        e && e.call(s)
            }
            ))
        } else if ("back" == t) {
            if (!o.cover && this.index == this.book.pages.length - 1)
                return;
            this.sizeBack >= a ? e && e.call(this) : n.loadPage(this.indexB, a, (function(t) {
                if (!s.disposed)
                    if (t)
                        if (s.sizeBack != a) {
                            var i;
                            s.sizeBack = a,
                            s.loadedBack = !0,
                            t.imageBitmap ? i = new THREE.CanvasTexture(t.imageBitmap) : (i = new THREE.Texture).image = t.image[a] ? t.image[a].clone || t.image[a] : t.image,
                            i.minFilter = THREE.LinearFilter,
                            i.needsUpdate = !0;
                            var o = 2 * s.index + 1;
                            s.options.cover || o--,
                            "left" == s.options.pages[o].side ? i.repeat.x = .5 : "right" == s.options.pages[o].side && (i.repeat.x = .5,
                            i.offset.x = .5),
                            s.backMaterial = s.createMaterial(i, "back"),
                            s.setBackMat(s.backMaterial),
                            e && e.call(s)
                        } else
                            e && e.call(s);
                    else
                        e && e.call(s)
            }
            ))
        }
    }
}
,
FLIPBOOK.PageWebGL.prototype.unload = function(t) {
    var e, i;
    "front" == t && this.sizeFront ? (i = (e = this.cube.material[4]).map,
    e.dispose(),
    i && i.dispose(),
    this.sizeFront = 0,
    this.setFrontMat(this.preloaderMatF)) : "back" == t && this.sizeBack && (i = (e = this.cube.material[5]).map,
    e.dispose(),
    i && i.dispose(),
    this.sizeBack = 0,
    this.setBackMat(this.preloaderMatB))
}
,
FLIPBOOK.PageWebGL.prototype.disposeMat = function() {
    if (this.loaded) {
        var t = this.cube.material[4]
          , e = this.cube.material[5]
          , i = t.map
          , s = e.map;
        t.dispose(),
        e.dispose(),
        i && i.dispose(),
        s && s.dispose(),
        this.disposed = !0,
        this.loaded = !1
    }
}
,
FLIPBOOK.PageWebGL.prototype.createMaterial = function(t, e) {
    var i;
    if (this.options.lights) {
        var s = "back" == e ? this.book.specularB : this.book.specularF
          , o = this.options;
        i = new THREE.MeshStandardMaterial({
            map: t,
            roughness: o.pageRoughness,
            metalness: o.pageMetalness,
            emissive: 0,
            color: 16777215,
            lightMap: s
        })
    } else
        i = new THREE.MeshBasicMaterial({
            map: t
        });
    return i
}
,
FLIPBOOK.PageWebGL.prototype._setAngle = function(t) {
    if (t <= 180 && t >= -180) {
        if ((t = t / 180 * Math.PI) < 0 && (t += Math.PI),
        this.angle == t)
            return;
        this.angle = t,
        this.rotation.y = -t,
        this.isFlippedLeft ? this.bendF.force = 1.35 * Math.pow(-Math.abs(Math.cos(-t / 2)), 1) / Math.pow(this.pageHardness, 1.5) : this.bendF.force = 1.35 * Math.pow(Math.abs(Math.sin(-t / 2)), 1) / Math.pow(this.pageHardness, 1.5),
        this.updateBend(),
        this.book.htmlLayerVisible && Math.abs(t) > .03 && (this.book._hideHTMLPage(this.book.pageL),
        this.book._hideHTMLPage(this.book.pageR),
        this.book._hideHTMLPage(this.book.pageC),
        this.book._emptyHTMLPage(this.book.pageRInner),
        this.book._emptyHTMLPage(this.book.pageLInner),
        this.book._emptyHTMLPage(this.book.pageCInner),
        this.book.htmlLayerVisible = !1,
        this.book.main.trigger("hidepagehtml", {
            page: this
        })),
        this.book.needsUpdate = !0,
        this.book.correctZOrder()
    }
}
,
FLIPBOOK.PageWebGL.prototype.updateBend = function() {
    Math.abs(this.bendF.force) < 1e-4 && (this.bendF.force = 0),
    this.bendForce != this.bendF.force && (this.bendForce,
    this.bendF.force,
    this.stopCornerCurl(),
    this.modF && this.modF.apply(),
    this.gF.computeFaceNormals(),
    this.gF.computeVertexNormals(!0),
    this.book.correctZOrder(),
    this.book.needsUpdate = !0)
}
,
FLIPBOOK.PageWebGL.prototype.flipLeft = function(t) {
    this.onComplete = t,
    this.dragging = !1,
    this.isFlippedLeft || this.flippingLeft || this.flippingRight || this.index != this.book.flippedleft || (this.duration > 0 ? (this.flippingLeft = !0,
    this.flipping = !0,
    this.force = 0,
    this.bendIn(-Math.PI)) : (this.rotation.y = -Math.PI,
    this.flippingLeft = !1,
    this.isFlippedLeft = !0,
    this.flippingRight = !1,
    this.isFlippedRight = !1))
}
,
FLIPBOOK.PageWebGL.prototype.flipLeftInstant = function(t) {
    this.onComplete = t,
    this.dragging = !1,
    this.isFlippedLeft || this.flippingLeft || this.flippingRight || this.index != this.book.flippedleft || (this.xx = 0,
    this.flippingLeft = !0,
    this.isFlippedLeft = !1,
    this.renderFlip(-Math.PI),
    this.flippingLeft = !1,
    this.isFlippedLeft = !0,
    this.flippingRight = !1,
    this.isFlippedRight = !1,
    this.flipFinished())
}
,
FLIPBOOK.PageWebGL.prototype.hideMat = function() {
    this.showing && (this.remove(this.cube),
    this.add(this.cubeEmpty),
    this.showing = !1)
}
,
FLIPBOOK.PageWebGL.prototype.showMat = function() {
    this.showing || (this.add(this.cube),
    this.remove(this.cubeEmpty),
    this.showing = !0,
    this.book.needsUpdate = !0)
}
,
FLIPBOOK.PageWebGL.prototype.setFrontMat = function(t) {
    this.cube.material[4] !== t && (this.cube.material[4] = t,
    this.book.needsUpdate = !0)
}
,
FLIPBOOK.PageWebGL.prototype.setBackMat = function(t) {
    this.cube.material[5] !== t && (this.cube.material[5] = t,
    this.book.needsUpdate = !0)
}
,
FLIPBOOK.PageWebGL.prototype.flipRightInstant = function(t) {
    this.onComplete = t,
    this.dragging = !1,
    this.isFlippedRight || this.flippingRight || this.flippingLeft || this.index != this.book.getNumPages() - this.book.flippedright - 1 || (this.xx = 0,
    this.flippingRight = !0,
    this.isFlippedRight = !1,
    this.renderFlip(0),
    this.flippingLeft = !1,
    this.isFlippedLeft = !1,
    this.flippingRight = !1,
    this.isFlippedRight = !0,
    this.flipFinished())
}
,
FLIPBOOK.PageWebGL.prototype.flipRight = function(t) {
    this.onComplete = t,
    this.dragging = !1,
    this.isFlippedRight || this.flippingRight || this.flippingLeft || this.index != this.book.getNumPages() - this.book.flippedright - 1 || (this.duration > 0 ? (this.flippingRight = !0,
    this.flipping = !0,
    this.force = 0,
    this.bendIn(0)) : (this.rotation.y = 0,
    this.flippingLeft = !1,
    this.isFlippedLeft = !1,
    this.flippingRight = !1,
    this.isFlippedRight = !0))
}
,
FLIPBOOK.PageWebGL.prototype.bendIn = function(t) {
    var e = 2 * this.duration * 240 * Math.pow(Math.abs(this.rotation.y - t) / Math.PI, .5);
    e *= Math.pow(this.pageHardness, .25),
    e *= 1 + this.pageHardness / 30;
    var i = this.rotation.y
      , s = t;
    FLIPBOOK.animate({
        from: i,
        to: s,
        duration: e,
        easing: "easeInSine",
        step: t => {
            this.renderFlip(t)
        }
        ,
        complete: () => {
            this.bendOut()
        }
    }),
    this.options.main.turnPageStart()
}
,
FLIPBOOK.PageWebGL.prototype.bendOut = function() {
    var t = this.duration * Math.pow(Math.abs(this.bendF.force), .5) * 1e3
      , e = this.bendF.force
      , i = this.bendF.offset;
    FLIPBOOK.animate({
        from: e,
        to: 0,
        duration: t,
        easing: "easeOutSine",
        step: t => {
            this.bendF.force = t,
            this.updateBend()
        }
        ,
        complete: () => {
            this.flipFinished(this)
        }
    }),
    FLIPBOOK.animate({
        from: i,
        to: 1,
        duration: t,
        easing: "easeOutSine",
        step: t => {
            this.bendF.offset = t,
            this.updateBend()
        }
        ,
        complete: () => {
            this.bendF.offset = 0
        }
    }),
    this.book.correctZOrder()
}
,
FLIPBOOK.PageWebGL.prototype.modApply = function() {
    this.bendF.force = this.bendB.force = this.force,
    this.bendF.offset = this.bendB.offset = this.offset,
    this.updateBend()
}
,
FLIPBOOK.PageWebGL.prototype.renderFlip = function(t) {
    this._setAngle(180 * -t / Math.PI)
}
,
FLIPBOOK.PageWebGL.prototype.flipFinished = function() {
    this.flippingLeft ? (this.flippingLeft = !1,
    this.isFlippedLeft = !0,
    this.flippingRight = !1,
    this.isFlippedRight = !1) : this.flippingRight && (this.flippingLeft = !1,
    this.isFlippedRight = !0,
    this.flippingRight = !1,
    this.isFlippedLeft = !1),
    this.bendF.force = 0,
    this.bendF.offset = 0,
    this.updateBend(),
    this.flipping = !1,
    this.dragging = !1,
    void 0 !== this.onComplete && this.onComplete(this),
    this.book.flipFinnished()
}
,
FLIPBOOK.PageWebGL.prototype.isFlippedLeft = function() {
    return this.isFlippedLeft
}
,
FLIPBOOK.PageWebGL.prototype.isFlippedRight = function() {
    return this.isFlippedRight
}
,
FLIPBOOK.PageWebGL.prototype.dispose = function() {
    this.disposeMat(),
    this.gF.dispose(),
    this.gF = null,
    this.cube = null,
    this.cubeEmpty = null,
    this.bendF = null,
    this.modF = null,
    this.options = null,
    this.book = null,
    this.disposed = !0
}
,
FLIPBOOK.BookWebGL = function(t, e, i) {
    this.wrapper = t,
    this.options = i,
    this.main = e,
    this.options.cameraDistance = 2800,
    this.pageW = i.pageWidth,
    this.pageH = i.pageHeight,
    this.pageW = 1e3 * i.pageWidth / i.pageHeight,
    this.pageH = 1e3,
    i.pageWidth = this.pageW,
    i.pageHeight = this.pageH,
    this.scroll = i.scroll,
    this.pagesArr = i.pages,
    this.pages = [],
    this.animating = !1,
    this.sc = 1;
    var s = this.wrapper.style;
    s.width = "100%",
    s.height = "100%",
    s.position = "absolute",
    s.overflow = "hidden",
    this.options.cameraDistance = this.options.cameraDistance / 1.5
}
,
FLIPBOOK.BookWebGL.prototype = Object.create(FLIPBOOK.Book.prototype),
FLIPBOOK.BookWebGL.prototype.constructor = FLIPBOOK.BookWebGL,
FLIPBOOK.BookWebGL.prototype.init3d = function() {
    var t = this
      , e = this.main.wrapperW / this.main.wrapperH
      , i = this.options;
    this.Scene = new THREE.Scene,
    this.centerContainer = new THREE.Object3D,
    this.Scene.add(this.centerContainer),
    this.Camera = new THREE.PerspectiveCamera(30,e,1,1e4),
    this.Scene.add(this.Camera),
    this.zoom = i.zoomMin,
    this.pan = i.pan,
    this.tilt = i.tilt,
    this.updateCameraPosition();
    var s = this.wrapper;
    document.createElement("canvas").getContext("webgl"),
    this.renderer = new THREE.WebGLRenderer({
        antialias: this.options.antialias,
        alpha: !0
    }),
    this.renderer.gammaInput = !0,
    this.renderer.gammaOutput = !0,
    this.options.shadows && (this.renderer.shadowMap.enabled = !0,
    this.renderer.shadowMap.type = THREE.PCFShadowMap),
    this.renderer.setSize(s.clientWidth, s.clientHeight);
    var o = window.devicePixelRatio < i.minPixelRatio ? i.minPixelRatio : window.devicePixelRatio;
    this.renderer.setPixelRatio(o),
    s.appendChild(this.renderer.domElement);
    for (var n = !1, h = this.options.pages, a = 0; a < h.length; a++)
        h[a].htmlContent && (n = !0);
    if ((n || i.pdfMode) && this.initHtmlContent(),
    this.canvas = this.renderer.domElement,
    this.options.lights) {
        var r = i.lightColor
          , p = new THREE.SpotLight(r);
        if (p.intensity = i.lightIntensity,
        p.position.set(i.lightPositionX, i.lightPositionY, i.lightPositionZ),
        p.distance = 4e3,
        this.options.shadows) {
            p.castShadow = !0,
            p.shadow.bias = -2e-6,
            p.shadow.mapSize.x = this.options.shadowMapSize,
            p.shadow.mapSize.y = this.options.shadowMapSize;
            var d = new THREE.ShadowMaterial;
            d.opacity = this.options.shadowOpacity;
            var l = new THREE.Mesh(new THREE.BoxGeometry(1e4,1e4,1,1,1,1),d);
            l.position.set(0, 0, -i.shadowDistance),
            this.Scene.add(l),
            l.receiveShadow = !0
        }
        this.Scene.add(p)
    }
    this.centerContainer.position.set(0, 0, 0),
    this.onResize(),
    this.centerContainer.position.x = .5 * -this.pageW * this.centerContainer.scale.x,
    this.updateHtmlLayerPosition(),
    this.flippedleft = 0,
    this.flippedright = 0,
    this.cameraZMin = 300,
    this.cameraZMax = 5e3,
    this.renderLoop = function() {
        if (t.rendering) {
            if (!t.enabled)
                return;
            t.needsUpdate && (t.renderer.render(t.Scene, t.Camera),
            t.needsUpdate = !1,
            t.htmlLayer && t.cssRenderer.render(t.Scene, t.Camera))
        }
        t.renderLoop && requestAnimationFrame(t.renderLoop)
    }
    ,
    this.renderLoop()
}
,
FLIPBOOK.BookWebGL.prototype.onPageUnloaded = function(t) {
    var e, i = Math.floor(t / 2);
    this.options.rightToLeft ? (i = this.pages.length - i - 1,
    e = t % 2 == 0 ? "back" : "front") : e = t % 2 == 0 ? "front" : "back",
    this.pages[i].unload(e)
}
,
FLIPBOOK.BookWebGL.prototype.correctZOrder = function() {
    for (var t = [], e = [], i = 0; i < this.pages.length; i++) {
        var s = this.pages[i];
        s.angle > Math.PI / 2 ? t.unshift(s) : e.push(s)
    }
    var o = FLIPBOOK.th();
    t.forEach(( (t, e) => {
        t.position.z = -Math.pow(e * o, .85)
    }
    )),
    e.forEach(( (t, e) => {
        t.position.z = -Math.pow(e * o, .85)
    }
    ))
}
,
FLIPBOOK.BookWebGL.prototype.initHtmlContent = function() {
    var t = document.createElement("div");
    t.className = "htmlLayer " + Math.random(),
    this.pageR = document.createElement("div"),
    this.pageR.classList.add("R"),
    this.pageR.style.cssText = `\n    width: ${1e3 * this.options.pageWidth / this.options.pageHeight}px;\n    height: 1000px;\n    position: absolute;\n    top: -500px;\n    pointer-events: none;\n`,
    t.appendChild(this.pageR),
    this.pageRInner = document.createElement("div"),
    this.pageRInner.style.pointerEvents = "all",
    this.pageRInner.classList.add("RInner"),
    this.pageR.appendChild(this.pageRInner),
    this.pageL = document.createElement("div"),
    this.pageL.classList.add("L"),
    this.pageL.style.cssText = `\n    width: ${1e3 * this.options.pageWidth / this.options.pageHeight}px;\n    height: 1000px;\n    position: absolute;\n    top: -500px;\n    left: ${-1e3 * this.options.pageWidth / this.options.pageHeight}px;\n    pointer-events: none;\n`,
    t.appendChild(this.pageL),
    this.pageLInner = document.createElement("div"),
    this.pageLInner.style.pointerEvents = "all",
    this.pageLInner.classList.add("LInner"),
    this.pageL.appendChild(this.pageLInner),
    this.pageC = document.createElement("div"),
    this.pageC.classList.add("C"),
    this.pageC.style.cssText = `\n    width: ${2e3 * this.options.pageWidth / this.options.pageHeight}px;\n    height: 1000px;\n    position: absolute;\n    top: -500px;\n    left: ${-1e3 * this.options.pageWidth / this.options.pageHeight}px;\n    pointer-events: none;\n`,
    t.appendChild(this.pageC),
    this.pageCInner = document.createElement("div"),
    this.pageCInner.style.pointerEvents = "all",
    this.pageCInner.classList.add("CInner"),
    this.pageC.appendChild(this.pageCInner),
    this.htmlLayer = new FLIPBOOK.CSS3DObject(t),
    this.Scene.add(this.htmlLayer),
    this.cssRenderer = new FLIPBOOK.CSS3DRenderer,
    this.wrapper.appendChild(this.cssRenderer.domElement),
    this.cssRenderer.domElement.style.position = "absolute",
    this.cssRenderer.domElement.style.top = "0",
    this.cssRenderer.domElement.style.left = "0",
    this.cssRenderer.domElement.style.pointerEvents = "none",
    this.cssRenderer.domElement.className = "cssRenderer " + Math.random()
}
,
FLIPBOOK.BookWebGL.prototype.enablePrev = function(t) {
    this.prevEnabled = t
}
,
FLIPBOOK.BookWebGL.prototype.enableNext = function(t) {
    this.nextEnabled = t
}
,
FLIPBOOK.BookWebGL.prototype.isZoomed = function() {
    return this.main.zoom > this.options.zoomMin && this.main.zoom > 1
}
,
FLIPBOOK.BookWebGL.prototype.getRightPage = function() {
    return this.pages[this.flippedleft]
}
,
FLIPBOOK.BookWebGL.prototype.getNextPage = function() {
    return this.pages[this.flippedleft + 1]
}
,
FLIPBOOK.BookWebGL.prototype.getLeftPage = function() {
    return this.pages[this.flippedleft - 1]
}
,
FLIPBOOK.BookWebGL.prototype.getPrevPage = function() {
    return this.pages[this.flippedleft - 2]
}
,
FLIPBOOK.BookWebGL.prototype.onSwipe = function(t, e, i, s, o, n) {
    if (this.isZoomed())
        "start" == e ? this._start(t) : "move" == e ? this._move(t, i, s) : "end" == e && this._end(t);
    else {
        var h = this.getLeftPage()
          , a = this.getRightPage()
          , r = this.getNextPage()
          , p = this.getPrevPage();
        if (!this.options.rotateCameraOnMouseDrag || a && a.dragging || h && h.dragging || "rotate" != this.onMouseMove && "scroll" != this.onMouseMove)
            if (("cancel" == e || "end" == e) && n <= 1) {
                if (1 == this.view && this.draggingBook && i < 0)
                    return this.nextPage(),
                    void (this.draggingBook = !1);
                if (1 == this.view && this.draggingBook && i > 0)
                    return this.prevPage(),
                    void (this.draggingBook = !1);
                !(i > 0) || a && a.dragging ? !(i < 0) || h && h.dragging || this.nextPage() : this.prevPage(),
                a && (a.dragging = !1),
                h && (h.dragging = !1)
            } else if ("move" == e && n <= 1) {
                if (this.draggingBook)
                    return this.centerContainer.position.x = this.draggingBookStartX + i,
                    void this.updateHtmlLayerPosition();
                if (1 == this.view && this.isFocusedLeft() && i < 0 && this.canFlipNext())
                    return this.draggingBookStartX = this.centerContainer.position.x,
                    void (this.draggingBook = !0);
                if (1 == this.view && this.isFocusedRight() && i > 0)
                    return this.draggingBookStartX = this.centerContainer.position.x,
                    void (this.draggingBook = !0);
                if (i = 180 * i / this.wrapperW,
                h && h.flipping || a && a.flipping)
                    return;
                i > 0 && this.canFlipPrev() ? (h && (h._setAngle(180 - i),
                h.dragging = !0),
                a && (a._setAngle(0),
                a.dragging = !1),
                p && p.showMat(),
                r && r.hideMat()) : i < 0 && this.canFlipNext() && (a && (a._setAngle(-i),
                a.dragging = !0),
                h && (h._setAngle(180),
                h.dragging = !1),
                p && p.hideMat(),
                r && r.showMat())
            }
    }
}
,
FLIPBOOK.BookWebGL.prototype.onResize = function() {
    var t = this.main
      , e = t.wrapperW
      , i = t.wrapperH
      , s = this.options
      , o = e / i
      , n = s.pageWidth / s.pageHeight;
    if (i < 1e3 && 1 == window.devicePixelRatio)
        this.renderer.setPixelRatio(2);
    else {
        var h = window.devicePixelRatio < s.minPixelRatio ? s.minPixelRatio : window.devicePixelRatio;
        this.renderer.setPixelRatio(h)
    }
    var a = Math.min(this.zoom, 1)
      , r = Number(s.zoomMin);
    s.responsiveView && e <= s.responsiveViewTreshold && o < 2 * n && o < s.responsiveViewRatio ? (this.view = 1,
    this.sc = n > o ? r * o / (n * a) : 1,
    0 == this.rightIndex || this.isFocusedRight() ? this.focusRight() : this.focusLeft()) : (this.view = 2,
    this.sc = o < 2 * n ? r * o / (2 * n * a) : 1,
    0 == this.flippedleft ? this.focusRight() : 0 == this.flippedright ? this.focusLeft() : this.focusBoth()),
    this.renderer.setSize(e, i),
    this.htmlLayer && (this.cssRenderer.setSize(e, i),
    this.htmlLayer.scale.set(this.sc, this.sc, this.sc)),
    this.Camera.aspect = e / i,
    this.Camera.updateProjectionMatrix(),
    this.updateCameraPosition(),
    this.updateBookPosition(),
    this.options.main.turnPageComplete(),
    this.wrapperW = e,
    this.wrapperH = i
}
,
FLIPBOOK.BookWebGL.prototype.updateCameraPosition = function() {
    var t, e = Math.PI * this.tilt / 180, i = this.options.cameraDistance * Math.sin(e) / this.zoom, s = this.options.cameraDistance * Math.cos(e) / this.zoom, o = this.sc;
    this.centerContainer.scale.set(o, o, o),
    e = Math.PI * this.pan / 180,
    t = Math.sin(e) * s,
    s = Math.cos(e) * s,
    this.cameraZ = s,
    this.Camera.position.set(Math.round(t), Math.round(i), Math.round(s)),
    this.Camera.lookAt(this.Scene.position),
    this.needsUpdate = !0
}
,
FLIPBOOK.BookWebGL.prototype.createPages = function() {
    var t, e, i, s = this, o = s.options, n = o.pageMiddleShadowSize, h = document.createElement("canvas");
    h.width = 64,
    h.height = 64;
    var a = h.getContext("2d")
      , r = a.createLinearGradient(64 - n, 0, 64, 0);
    r.addColorStop(0, "#AAAAAA"),
    r.addColorStop(1, o.pageMiddleShadowColorL),
    a.fillStyle = r,
    a.fillRect(0, 0, 64, 64);
    var p = new THREE.CanvasTexture(h);
    p.needsUpdate = !0,
    s.specularB = p;
    var d = document.createElement("canvas");
    d.width = 64,
    d.height = 64;
    var l = d.getContext("2d")
      , c = l.createLinearGradient(0, 0, n, 0);
    c.addColorStop(0, o.pageMiddleShadowColorR),
    c.addColorStop(1, "#AAAAAA"),
    l.fillStyle = c,
    l.fillRect(0, 0, 64, 64);
    var g, f, u = new THREE.CanvasTexture(d);
    if (u.needsUpdate = !0,
    s.specularF = u,
    s.options.pagePreloader) {
        var m = (new THREE.TextureLoader).load(s.options.pagePreloader, (function() {}
        ));
        s.options.lights ? (g = new THREE.MeshStandardMaterial({
            map: m,
            roughness: s.options.pageRoughness,
            metalness: s.options.pageMetalness,
            emissive: 0,
            color: 15592941,
            lightMap: s.specularF
        }),
        f = new THREE.MeshStandardMaterial({
            map: m,
            roughness: s.options.pageRoughness,
            metalness: s.options.pageMetalness,
            emissive: 0,
            color: 15592941,
            lightMap: s.specularB
        })) : g = f = new THREE.MeshBasicMaterial({
            map: m,
            color: 15592941
        })
    } else
        s.options.lights ? (g = new THREE.MeshStandardMaterial({
            roughness: s.options.pageRoughness,
            metalness: s.options.pageMetalness,
            emissive: 0,
            color: 15592941,
            lightMap: s.specularF
        }),
        f = new THREE.MeshStandardMaterial({
            roughness: s.options.pageRoughness,
            metalness: s.options.pageMetalness,
            emissive: 0,
            color: 15592941,
            lightMap: s.specularB
        })) : g = f = new THREE.MeshBasicMaterial({
            color: 15592941
        });
    FLIPBOOK.th = function() {
        return 2
    }
    ;
    var y = FLIPBOOK.th()
      , M = s.options.pages.length / 2;
    for (s.options.cover || (M += 1),
    i = 0; i < M; i++)
        t = 0 == i || i == M - 1 ? s.options.coverHardness : s.options.pageHardness,
        e = new FLIPBOOK.PageWebGL(s,i,t,s.options,g,f),
        s.pages.push(e),
        s.centerContainer.add(e),
        s.flippedright++;
    this.correctZOrder(),
    this.bg && (this.bg.position.z = -M * y - 5),
    s.initialized = !0
}
,
FLIPBOOK.BookWebGL.prototype.getNumPages = function() {
    return this.pages.length
}
,
FLIPBOOK.BookWebGL.prototype.centerContainer = function() {
    return this.centerContainer
}
,
FLIPBOOK.BookWebGL.prototype.goToPage = function(t, e, i) {
    1 != this.view && t % 2 == 1 && t--;
    const s = this.pages[t / 2];
    s && s.load("front");
    const o = this.pages[t / 2 - 1];
    o && o.load("back");
    var n = this;
    if (this.initialized) {
        if (e)
            for (var h = 0; h < this.pages.length; h++)
                if (this.pages[h].flippingLeft || this.pages[h].flippingRight)
                    return;
        if (t < 0 && (t = 0),
        t > this.options.pages.length && (t = this.options.pages.length),
        1 == this.view && !i) {
            var a = e ? 0 : 300;
            t % 2 == 0 ? this.focusLeft(a) : this.focusRight(a)
        }
        if (t % 2 != 0 && t--,
        t == this.rightIndex)
            return this.loadPages(),
            void this.turnPageComplete();
        if (this.goingToPage = !0,
        void 0 !== e && e) {
            if (t > n.rightIndex)
                for (; n.rightIndex < t; )
                    this.nextPageInstant();
            else
                for (; n.rightIndex > t; )
                    this.prevPageInstant();
            return this.updateBookPosition(),
            this.loadPages(),
            void this.turnPageComplete()
        }
        var r = this.rightIndex > t ? this.rightIndex - 2 : this.rightIndex
          , p = this.pages[r / 2].pageHardness
          , d = p == this.options.coverHardness && this.options.coverHardness > this.options.pageHardness ? 200 : 1;
        d *= Math.pow(p, .5),
        this.rightIndex > t ? this.rightIndex - 2 > t ? (this.prevPage(!1),
        setTimeout((function() {
            n.goToPage(t, e, 1)
        }
        ), d)) : setTimeout((function() {
            if (n.prevPage(),
            void 0 !== e && e)
                for (var t = 0; t < n.pages.length; t++)
                    n.pages[t].duration = n.options.pageFlipDuration;
            n.loadPages()
        }
        ), d) : this.rightIndex < t && (this.rightIndex + 2 < t ? (this.nextPage(!1),
        setTimeout((function() {
            n.goToPage(t, e, 1)
        }
        ), d)) : setTimeout((function() {
            if (n.nextPage(),
            void 0 !== e && e)
                for (var t = 0; t < n.pages.length; t++)
                    n.pages[t].duration = n.options.pageFlipDuration;
            n.loadPages()
        }
        ), d))
    } else
        setTimeout((function() {
            n.goToPage(t, e)
        }
        ), 100)
}
,
FLIPBOOK.BookWebGL.prototype.nextPageInstant = function() {
    if (0 != this.flippedright) {
        var t;
        for (t = 0; t < this.pages.length; t++)
            if (this.pages[t].flippingRight)
                return;
        if (1 == this.view) {
            if (this.isFocusedLeft()) {
                if (!this.goingToPage)
                    return this.focusRight(0),
                    void this.turnPageComplete();
                this.focusLeft(0, 0)
            }
        } else
            1 == this.flippedright ? this.focusLeft(0) : this.focusBoth(0);
        this.pages[this.pages.length - this.flippedright].flipLeftInstant(),
        this.flippedleft++,
        this.flippedright--,
        this.setRightIndex(this.rightIndex + 2),
        this.updateBookPosition()
    }
}
,
FLIPBOOK.BookWebGL.prototype.setRightIndex = function(t) {
    this.rightIndex = t
}
,
FLIPBOOK.BookWebGL.prototype.prevPageInstant = function(t) {
    if (0 != this.flippedleft) {
        var e;
        for (e = 0; e < this.pages.length; e++)
            if (this.pages[e].flippingLeft)
                return;
        if (1 == this.view) {
            if (!this.goingToPage) {
                if (this.isFocusedRight())
                    return this.focusLeft(0),
                    void this.turnPageComplete();
                this.focusRight(0, 0)
            }
        } else
            1 == this.flippedleft ? this.focusRight(0) : this.focusBoth(0);
        this.pages[this.flippedleft - 1].flipRightInstant(),
        this.flippedleft--,
        this.flippedright++,
        this.setRightIndex(this.rightIndex - 2),
        this.updateBookPosition()
    }
}
,
FLIPBOOK.BookWebGL.prototype.nextPage = function(t=!0) {
    if (this.nextEnabled) {
        var e;
        for (this.clickedPage = null,
        e = 0; e < this.pages.length; e++)
            if (this.pages[e].flippingRight)
                return;
        if (1 != this.view || this.goingToPage || !this.isFocusedLeft()) {
            var i = this.pages[this.pages.length - this.flippedright];
            if (i) {
                var s = this.pages[i.index + 1];
                if (s || this.options.backCover || this.options.rightToLeft) {
                    if (s && s.showMat(),
                    1 == this.view ? this.goingToPage || this.focusLeft(600, 200) : 1 == this.flippedright && this.options.cover ? this.focusLeft(500) : this.focusBoth(500),
                    !i.flipping) {
                        var o, n = this;
                        t && (this.loadNextSpread(),
                        o = function(t) {
                            n.loadPages(),
                            n.turnPageComplete()
                        }
                        ),
                        i.flipLeft(o)
                    }
                    this.flippedleft++,
                    this.flippedright--,
                    this.setRightIndex(this.rightIndex + 2)
                }
            }
        } else
            this.focusRight(300, 0, this.turnPageComplete)
    }
}
,
FLIPBOOK.BookWebGL.prototype.updateBookPosition = function() {
    1 == this.view ? 0 == this.flippedright ? this.focusLeft() : 0 == this.flippedleft ? this.focusRight() : this.isFocusedLeft() ? this.focusLeft() : this.focusRight() : 0 == this.rightIndex ? this.focusRight() : this.rightIndex >= this.options.numPages && this.options.cover ? this.focusLeft() : this.focusBoth(),
    this.updateHtmlLayerPosition(),
    this.needsUpdate = !0
}
,
FLIPBOOK.BookWebGL.prototype.updateHtmlLayerPosition = function() {
    this.htmlLayer && (this.htmlLayer.position.x = this.centerContainer.position.x,
    this.htmlLayer.position.y = this.centerContainer.position.y),
    this.needsUpdate = !0
}
,
FLIPBOOK.BookWebGL.prototype.turnPageComplete = function() {
    this.goingToPage = !1,
    this.options.main.turnPageComplete()
}
,
FLIPBOOK.BookWebGL.prototype.loadPages = function() {
    for (var t = this, e = this.pages, i = this.options.main, s = 0; s < e.length; s++) {
        var o = e[s];
        if (o.flippingLeft || o.flippingRight)
            return
    }
    this.options.cornerCurl && this.pages[0] && (0 == this.flippedleft ? this.pages[0].startCornerCurl() : this.pages[0].stopCornerCurl());
    var n = this.pages[this.flippedleft]
      , h = this.pages[this.flippedleft - 1]
      , a = this.updateHtmlLayer
      , r = this.loadMorePages;
    e.forEach((e => {
        e !== n && e !== h || e.showMat(),
        h && e.index < h.index - 2 && (e.hideMat(),
        t.options.pdfMode || e.disposeMat()),
        n && e.index > n.index + 2 && (e.hideMat(),
        t.options.pdfMode || e.disposeMat())
    }
    )),
    i.wrapperH && i.zoom && (i.setLoadingProgress(.1),
    h ? h.load("back", (function(e) {
        n ? n.load("front", (function(e) {
            h.loadHTML("back", (function() {
                n.loadHTML("front", (function() {
                    a.call(t)
                }
                ))
            }
            )),
            i.setLoadingProgress(1),
            r.call(t)
        }
        )) : (h.loadHTML("back", (function() {
            a.call(t)
        }
        )),
        i.setLoadingProgress(1),
        r.call(t))
    }
    )) : n.load("front", (function(e) {
        n.loadHTML("front", (function() {
            a.call(t)
        }
        )),
        i.setLoadingProgress(1),
        r.call(t)
    }
    )))
}
,
FLIPBOOK.BookWebGL.prototype.focusLeft = function(t, e, i) {
    var s = .5 * this.options.pageWidth * this.centerContainer.scale.x;
    this.moveToPos({
        x: s,
        y: 0
    }, t, e, i)
}
,
FLIPBOOK.BookWebGL.prototype.focusRight = function(t, e, i) {
    var s = .5 * -this.options.pageWidth * this.centerContainer.scale.x;
    this.moveToPos({
        x: s,
        y: 0
    }, t, e, i)
}
,
FLIPBOOK.BookWebGL.prototype.focusBoth = function(t, e, i) {
    this.moveToPos({
        x: 0,
        y: 0
    }, t, e, i)
}
,
FLIPBOOK.BookWebGL.prototype.moveToPos = function(t, e, i, s) {
    if (e && this.movingTo != t && this.centerContainer.position.x != t.x) {
        var o = this;
        this.movingTo = t,
        this.bookMoveTween && this.bookMoveTween.stop();
        var n = this.centerContainer.position.x
          , h = this.centerContainer.position.y
          , a = t.x
          , r = t.y;
        this.bookMoveTween = FLIPBOOK.animate({
            from: 0,
            to: 1,
            duration: e,
            easing: "easeOutSine",
            delay: i || 0,
            step: t => {
                this.centerContainer.position.x = n + (a - n) * t,
                this.centerContainer.position.y = h + (r - h) * t,
                o.updateHtmlLayerPosition()
            }
            ,
            complete: () => {
                o.movingTo = null,
                o.updateHtmlLayerPosition(),
                s && s.call(o)
            }
        })
    } else
        this.centerContainer.position.x = t.x,
        this.centerContainer.position.y = t.y,
        s && s.call(this)
}
,
FLIPBOOK.BookWebGL.prototype.isFocusedLeft = function() {
    return this.centerContainer.position.x > 0
}
,
FLIPBOOK.BookWebGL.prototype.isFocusedRight = function() {
    return this.centerContainer.position.x < 0
}
,
FLIPBOOK.BookWebGL.prototype.prevPage = function(t=!0) {
    if (this.prevEnabled) {
        var e;
        for (this.clickedPage = null,
        e = 0; e < this.pages.length; e++)
            if (this.pages[e].flippingLeft)
                return;
        if (1 != this.view || this.goingToPage || !this.isFocusedRight()) {
            var i = this.pages[this.flippedleft - 1];
            if (i && (1 != this.flippedleft || this.options.cover)) {
                var s = this.pages[i.index - 1];
                if (s || !this.options.rightToLeft || this.options.backCover) {
                    if (s && s.showMat(),
                    1 == this.view ? this.goingToPage || this.focusRight(600, 200) : 1 == this.flippedleft ? this.focusRight(500) : this.focusBoth(500),
                    !i.flipping) {
                        var o, n = this;
                        t && (this.loadPrevSpread(),
                        o = function(t) {
                            n.loadPages(),
                            n.turnPageComplete()
                        }
                        ),
                        i.flipRight(o)
                    }
                    this.flippedleft--,
                    this.flippedright++,
                    this.setRightIndex(this.rightIndex - 2)
                }
            }
        } else
            this.focusLeft(300, 0, this.turnPageComplete)
    }
}
,
FLIPBOOK.BookWebGL.prototype.firstPage = function() {}
,
FLIPBOOK.BookWebGL.prototype.flipFinnished = function() {
    this.correctZOrder(),
    this.needsUpdate = !0
}
,
FLIPBOOK.BookWebGL.prototype.lastPage = function() {}
,
FLIPBOOK.BookWebGL.prototype.updateVisiblePages = function() {}
,
FLIPBOOK.BookWebGL.prototype.loadPrevSpread = function() {
    const t = this.pages[this.flippedleft - 1]
      , e = this.pages[this.flippedleft - 2];
    t && t.load("front", (function() {}
    ), !0),
    e && e.load("back", (function() {}
    ), !0)
}
,
FLIPBOOK.BookWebGL.prototype.loadNextSpread = function() {
    const t = this.pages[this.flippedleft]
      , e = this.pages[this.flippedleft + 1];
    t && t.load("back", (function() {}
    ), !0),
    e && e.load("front", (function() {}
    ), !0)
}
,
FLIPBOOK.BookWebGL.prototype.loadMorePages = function() {
    this.loadNextSpread(),
    this.loadPrevSpread()
}
,
FLIPBOOK.BookWebGL.prototype._hideHTMLPage = function(t) {
    t.htmlHidden || (t.style.display = "none",
    t.htmlHidden = !0)
}
,
FLIPBOOK.BookWebGL.prototype._showHTMLPage = function(t) {
    t.htmlHidden && (t.style.display = "block",
    t.htmlHidden = !1)
}
,
FLIPBOOK.BookWebGL.prototype._emptyHTMLPage = function(t) {
    t.emptyHTML || (t.emptyHTML = !0)
}
,
FLIPBOOK.BookWebGL.prototype._addHTMLContent = function(t, e) {
    e.innerHTML = "",
    e.appendChild(t[0] || t),
    e.emptyHTML = !1
}
,
FLIPBOOK.BookWebGL.prototype.updateHtmlLayer = function(t) {
    if (this.htmlLayer) {
        for (var e = 0; e < this.pages.length; e++)
            if (this.pages[e].flipping)
                return;
        if (t || this.htmlContentRightIndex != this.rightIndex) {
            this.htmlContentRightIndex = this.rightIndex,
            this.htmlLayerVisible = !1;
            var i, s = this.options.rightToLeft ? this.options.pages.length - this.rightIndex - 1 : this.rightIndex, o = this.options.rightToLeft ? s + 1 : s - 1;
            this.options.cover || (s--,
            o--),
            this._hideHTMLPage(this.pageL),
            this._hideHTMLPage(this.pageC),
            this._hideHTMLPage(this.pageR),
            this._emptyHTMLPage(this.pageRInner),
            this._emptyHTMLPage(this.pageLInner),
            this._emptyHTMLPage(this.pageCInner),
            this.options.doublePage ? 0 == this.rightIndex ? (i = this.options.pages[s].htmlContent) && (this._addHTMLContent(i, this.pageRInner),
            this._showHTMLPage(this.pageR),
            this.htmlLayerVisible = !0) : this.rightIndex == 2 * this.pages.length ? (i = this.options.pages[o].htmlContent) && (this._addHTMLContent(i, this.pageLInner),
            this._showHTMLPage(this.pageL),
            this.htmlLayerVisible = !0) : (i = this.options.pages[o].htmlContent || this.options.pages[s].htmlContent) && (this._addHTMLContent(i, this.pageCInner),
            this._showHTMLPage(this.pageC),
            this.htmlLayerVisible = !0) : (0 != this.rightIndex && (i = this.options.pages[o].htmlContent) && (this._addHTMLContent(this.options.pages[o].htmlContent, this.pageLInner),
            this._showHTMLPage(this.pageL),
            this.htmlLayerVisible = !0),
            this.rightIndex != 2 * this.pages.length && (i = this.options.pages[s].htmlContent) && (this._addHTMLContent(this.options.pages[s].htmlContent, this.pageRInner),
            this._showHTMLPage(this.pageR),
            this.htmlLayerVisible = !0)),
            this.htmlLayer && this.startPageItems(this.htmlLayer.element),
            this.main.trigger("showpagehtml", {
                page: {}
            })
        }
    }
}
,
FLIPBOOK.BookWebGL.prototype.onZoom = function() {}
,
FLIPBOOK.BookWebGL.prototype.render = function(t) {
    this.rendering = t
}
,
FLIPBOOK.BookWebGL.prototype.zoomTo = function(t, e, i, s) {
    if (!this.zooming && this.pages.length) {
        void 0 === e && (e = 0);
        var o = this.centerContainer.position;
        if (void 0 !== i && void 0 !== s) {
            var n, h = this.zoom * this.wrapper.clientHeight / 1e3, a = t * this.wrapper.clientHeight / 1e3, r = this.centerContainer.position, p = {
                x: (i - this.wrapper.clientWidth / 2) / h - r.x,
                y: (-s + this.wrapper.clientHeight / 2) / h - r.y
            }, d = {
                x: (i - this.wrapper.clientWidth / 2) / a - r.x,
                y: (-s + this.wrapper.clientHeight / 2) / a - r.y
            };
            (o = r).x = r.x - (p.x - d.x),
            o.y = r.y - (p.y - d.y)
        }
        var l = this;
        if ((n = t < this.options.zoomMin ? this.options.zoomMin : t) == this.options.zoom) {
            var c = this.isFocusedLeft();
            1 == this.view ? c ? this.focusLeft() : this.focusRight() : this.centerContainer.position.set(0, 0, 0),
            this.updateBookPosition()
        }
        if ((e = 0) > 0) {
            if (!this.zooming) {
                this.zooming = !0;
                const t = this.zoom
                  , i = n
                  , s = this.centerContainer.position.x
                  , h = o.x
                  , a = this.centerContainer.position.y
                  , r = o.y;
                FLIPBOOK.animate({
                    from: 0,
                    to: 1,
                    duration: e,
                    easing: "easeInSine",
                    step: e => {
                        this.zoom = t + (i - t) * e,
                        this.centerContainer.position.x = s + (h - s) * e,
                        this.centerContainer.position.y = a + (r - a) * e,
                        this.updateCameraPosition(),
                        this.htmlLayer && (this.htmlLayer.position.x = s + (h - s) * e,
                        this.htmlLayer.position.y = a + (r - a) * e)
                    }
                    ,
                    complete: () => {
                        l.zooming = !1
                    }
                })
            }
        } else
            this.zoom = n,
            this.centerContainer.position.set(o.x, o.y, 0),
            l.updateHtmlLayerPosition(),
            this.updateCameraPosition(),
            this.zooming = !1;
        t <= 1 && t <= this.zoom && this.updateBookPosition(),
        this.options.main.onZoom(n),
        this.loadPages()
    }
}
,
FLIPBOOK.BookWebGL.prototype.tiltTo = function(t) {
    var e = this.tilt + .3 * t;
    e = (e = e > this.options.tiltMax ? this.options.tiltMax : e) < this.options.tiltMin ? this.options.tiltMin : e,
    this.tilt = e,
    this.updateCameraPosition()
}
,
FLIPBOOK.BookWebGL.prototype.panTo = function(t) {
    var e = this.pan - .2 * t;
    e = (e = e > this.options.panMax ? this.options.panMax : e) < this.options.panMin ? this.options.panMin : e,
    this.pan = e,
    this.updateCameraPosition()
}
,
FLIPBOOK.BookWebGL.prototype._start = function(t) {
    this.centerContainerStart = this.centerContainer.position.clone(),
    this.mouseDown = !0,
    this.onMouseMove = ""
}
,
FLIPBOOK.BookWebGL.prototype._move = function(t, e, i) {
    0 == e && 0 == i || (this.moved = !0,
    this.moveToPos({
        x: this.centerContainerStart.x + e / this.zoom,
        y: this.centerContainerStart.y - i / this.zoom
    }),
    this.updateHtmlLayerPosition())
}
,
FLIPBOOK.BookWebGL.prototype._end = function(t) {
    this.mouseDown = !1,
    this.pageMouseDown = !1,
    this.moved = !1
}
,
FLIPBOOK.BookWebGL.prototype.enable = function() {
    this.enabled || (this.enabled = !0,
    this.initialized || (this.init3d(),
    this.createPages(),
    this.rendering = !1,
    this.onResize()),
    this.render(!0)),
    this.onResize()
}
,
FLIPBOOK.BookWebGL.prototype.disable = function() {
    this.enabled = !1,
    this.render(!1)
}
,
FLIPBOOK.BookWebGL.prototype.destroy = function() {
    function t(t) {
        t && (t.map && t.map.dispose(),
        t.lightMap && t.lightMap.dispose(),
        t.bumpMap && t.bumpMap.dispose(),
        t.normalMap && t.normalMap.dispose(),
        t.specularMap && t.specularMap.dispose(),
        t.envMap && t.envMap.dispose(),
        t.alphaMap && t.alphaMap.dispose(),
        t.roughnessMap && t.roughnessMap.dispose(),
        t.metalnessMap && t.metalnessMap.dispose(),
        t.displacementMap && t.displacementMap.dispose(),
        t.emissiveMap && t.emissiveMap.dispose(),
        t.clearcoatMap && t.clearcoatMap.dispose(),
        t.clearcoatNormalMap && t.clearcoatNormalMap.dispose(),
        t.clearcoatRoughnessMap && t.clearcoatRoughnessMap.dispose(),
        t.sheenColorMap && t.sheenColorMap.dispose(),
        t.sheenRoughnessMap && t.sheenRoughnessMap.dispose(),
        t.transmissionMap && t.transmissionMap.dispose(),
        t.thicknessMap && t.thicknessMap.dispose(),
        t.dispose())
    }
    function e(i, s) {
        if (i && s) {
            for (; s.children.length > 0; )
                e(i, s.children[0]);
            s.parent && s.parent.remove(s),
            function(e) {
                e && (e.geometry && e.geometry.dispose(),
                e.material && (Array.isArray(e.material) ? e.material.forEach((e => t(e))) : t(e.material)))
            }(s)
        }
    }
    var i;
    !function(t) {
        if (t)
            for (; t.children.length > 0; )
                e(t, t.children[0])
    }(this.Scene),
    (i = this.renderer) && (i.dispose(),
    i.domElement && i.domElement.parentNode && i.domElement.parentNode.removeChild(i.domElement)),
    this.pages.forEach((function(t) {
        t.dispose(),
        t = null
    }
    )),
    this.pages = null,
    this.renderLoop = null
}
;
var MOD3 = MOD3 || {};
!function(t) {
    t.Constants = {
        PI: Math.PI,
        invPI: 1 / Math.PI,
        halfPI: .5 * Math.PI,
        doublePI: 2 * Math.PI,
        toRad: 1 / 180 * Math.PI,
        toDeg: 1 / 180 * Math.PI
    },
    t.ModConstant = {
        LEFT: -1,
        RIGHT: 1,
        NONE: 0,
        X: 1,
        Y: 2,
        Z: 4
    }
}(MOD3),
function(t) {
    var e = t.Constants;
    t.XMath = {},
    t.XMath.normalize = function(e, i, s) {
        return i - e == 0 ? 1 : t.XMath.trim(0, 1, (s - e) / i)
    }
    ,
    t.XMath.toRange = function(t, e, i) {
        return e - t == 0 ? 0 : t + (e - t) * i
    }
    ,
    t.XMath.inRange = function(t, e, i, s) {
        return void 0 === s && (s = !1),
        s ? i >= t && i <= e : i > t && i < e
    }
    ,
    t.XMath.sign = function(t, e) {
        return void 0 === e && (e = 0),
        0 == t ? e : t > 0 ? 1 : -1
    }
    ,
    t.XMath.trim = function(t, e, i) {
        return Math.min(e, Math.max(t, i))
    }
    ,
    t.XMath.wrap = function(t, e, i) {
        return i < t ? i + (e - t) : i >= e ? i - (e - t) : i
    }
    ,
    t.XMath.degToRad = function(t) {
        return t * e.toRad
    }
    ,
    t.XMath.radToDeg = function(t) {
        return t * e.toDeg
    }
    ,
    t.XMath.presicion = function(t, e) {
        var i = Math.pow(10, e);
        return Math.round(t * i) / i
    }
    ,
    t.XMath.uceil = function(t) {
        return t < 0 ? Math.floor(t) : Math.ceil(t)
    }
}(MOD3),
function(t) {
    t.Range = function(t, e) {
        this.start = 0,
        this.end = 1,
        void 0 !== t && (this.start = t),
        void 0 !== e && (this.end = e)
    }
    ,
    t.Range.prototype.getSize = function() {
        return this.end - this.start
    }
    ,
    t.Range.prototype.move = function(t) {
        this.start += t,
        this.end += t
    }
    ,
    t.Range.prototype.isIn = function(t) {
        return t >= this.start && t <= this.end
    }
    ,
    t.Range.prototype.normalize = function(e) {
        return t.XMath.normalize(this.start, this.end, e)
    }
    ,
    t.Range.prototype.toRange = function(e) {
        return t.XMath.toRange(this.start, this.end, e)
    }
    ,
    t.Range.prototype.trim = function(e) {
        return t.XMath.trim(this.start, this.end, e)
    }
    ,
    t.Range.prototype.interpolate = function(t, e) {
        return this.toRange(e.normalize(t))
    }
    ,
    t.Range.prototype.toString = function() {
        return "[" + this.start + " - " + this.end + "]"
    }
}(MOD3),
function(t) {
    t.Phase = function(t) {
        this.value = 0,
        void 0 !== t && (this.value = t)
    }
    ,
    t.Phase.prototype.getPhasedValue = function() {
        return Math.sin(this.value)
    }
    ,
    t.Phase.prototype.getAbsPhasedValue = function() {
        return Math.abs(this.getPhasedValue())
    }
    ,
    t.Phase.prototype.getNormValue = function() {
        return .5 * (this.getPhasedValue() + 1)
    }
}(MOD3),
function(t) {
    t.Point = function(t, e) {
        this.y = this.x = 0,
        void 0 !== t && (this.x = t),
        void 0 !== e && (this.y = e)
    }
    ,
    t.Point.prototype.clone = function() {
        return new t.Point(this.x,this.y)
    }
}(MOD3),
function(t) {
    t.Matrix = function(t, e, i, s) {
        this.m11 = 1,
        this.m21 = this.m12 = 0,
        this.m22 = 1,
        void 0 !== t && (this.m11 = t),
        void 0 !== e && (this.m12 = e),
        void 0 !== i && (this.m21 = i),
        void 0 !== s && (this.m22 = s)
    }
    ,
    t.Matrix.prototype.rotate = function(t) {
        var e = Math.cos(t);
        return t = Math.sin(t),
        this.m11 = e,
        this.m12 = -t,
        this.m21 = t,
        this.m22 = e,
        this
    }
    ,
    t.Matrix.prototype.scale = function(t, e) {
        return this.m21 = this.m12 = 0,
        void 0 !== t && (this.m22 = this.m11 = t),
        void 0 !== e && (this.m22 = e),
        this
    }
    ,
    t.Matrix.prototype.multiply = function(t) {
        var e = this.m11
          , i = this.m12
          , s = this.m21
          , o = this.m22
          , n = t.m11
          , h = t.m12
          , a = t.m21;
        return t = t.m22,
        this.m11 = e * n + i * a,
        this.m12 = e * h + i * t,
        this.m21 = s * n + o * a,
        this.m22 = s * h + o * t,
        this
    }
    ,
    t.Matrix.prototype.transformPoint = function(e) {
        return new t.Point(this.m11 * e.x + this.m12 * e.y,this.m21 * e.x + this.m22 * e.y)
    }
}(MOD3),
function(t) {
    t.Vector3 = function(t, e, i) {
        this.z = this.y = this.x = null,
        this.x = t,
        this.y = e,
        this.z = i
    }
    ,
    t.Vector3.ZERO = function() {
        return new t.Vector3(0,0,0)
    }
    ,
    t.Vector3.dot = function(t, e) {
        return t.x * e.x + t.y * e.y + t.z * e.z
    }
    ,
    t.Vector3.prototype.clone = function() {
        return new t.Vector3(this.x,this.y,this.z)
    }
    ,
    t.Vector3.prototype.equals = function(t) {
        return this.x == t.x && this.y == t.y && this.z == t.z
    }
    ,
    t.Vector3.prototype.zero = function() {
        this.x = this.y = this.z = 0
    }
    ,
    t.Vector3.prototype.negate = function() {
        return new t.Vector3(-this.x,-this.y,-this.z)
    }
    ,
    t.Vector3.prototype.add = function(e) {
        return new t.Vector3(this.x + e.x,this.y + e.y,this.z + e.z)
    }
    ,
    t.Vector3.prototype.subtract = function(e) {
        return new t.Vector3(this.x - e.x,this.y - e.y,this.z - e.z)
    }
    ,
    t.Vector3.prototype.multiplyScalar = function(e) {
        return new t.Vector3(this.x * e,this.y * e,this.z * e)
    }
    ,
    t.Vector3.prototype.multiply = function(e) {
        return new t.Vector3(this.x * e.x,this.y * e.y,this.z * e.z)
    }
    ,
    t.Vector3.prototype.divide = function(e) {
        return e = 1 / e,
        new t.Vector3(this.x * e,this.y * e,this.z * e)
    }
    ,
    t.Vector3.prototype.normalize = function() {
        var t = this.x
          , e = this.y
          , i = this.z;
        (t = t * t + e * e + i * i) > 0 && (t = 1 / Math.sqrt(t),
        this.x *= t,
        this.y *= t,
        this.z *= t)
    }
    ,
    t.Vector3.prototype.getMagnitude = function() {
        var t = this.x
          , e = this.y
          , i = this.z;
        return Math.sqrt(t * t + e * e + i * i)
    }
    ,
    t.Vector3.prototype.setMagnitude = function(t) {
        this.normalize(),
        this.x *= t,
        this.y *= t,
        this.z *= t
    }
    ,
    t.Vector3.prototype.toString = function() {
        return "[" + this.x + " , " + this.y + " , " + this.z + "]"
    }
    ,
    t.Vector3.prototype.sum = function(t, e) {
        return t.add(e)
    }
    ,
    t.Vector3.prototype.dot = function(t, e) {
        return t.x * e.x + t.y * e.y + t.z * e.z
    }
    ,
    t.Vector3.prototype.cross = function(e, i) {
        var s = e.x
          , o = e.y
          , n = e.z
          , h = i.x
          , a = i.y
          , r = i.z;
        return new t.Vector3(o * r - n * a,n * h - s * r,s * a - o * h)
    }
    ,
    t.Vector3.prototype.distance = function(t, e) {
        var i = t.x - e.x
          , s = t.y - e.y
          , o = t.z - e.z;
        return Math.sqrt(i * i + s * s + o * o)
    }
}(MOD3),
function(t) {
    t.Matrix4 = function(t, e, i, s, o, n, h, a, r, p, d, l, c, g, f, u) {
        this.n11 = 1,
        this.n21 = this.n14 = this.n13 = this.n12 = 0,
        this.n22 = 1,
        this.n32 = this.n31 = this.n24 = this.n23 = 0,
        this.n33 = 1,
        this.n43 = this.n42 = this.n41 = this.n34 = 0,
        this.n44 = 1,
        void 0 !== t && (this.n11 = t),
        void 0 !== e && (this.n12 = e),
        void 0 !== i && (this.n13 = i),
        void 0 !== s && (this.n14 = s),
        void 0 !== o && (this.n21 = o),
        void 0 !== n && (this.n22 = n),
        void 0 !== h && (this.n23 = h),
        void 0 !== a && (this.n24 = a),
        void 0 !== r && (this.n31 = r),
        void 0 !== p && (this.n32 = p),
        void 0 !== d && (this.n33 = d),
        void 0 !== l && (this.n34 = l),
        void 0 !== c && (this.n41 = c),
        void 0 !== g && (this.n42 = g),
        void 0 !== f && (this.n43 = f),
        void 0 !== u && (this.n44 = u)
    }
    ,
    t.Matrix4.prototype.translationMatrix = function(t, e, i) {
        return this.n14 = t,
        this.n24 = e,
        this.n34 = i,
        this
    }
    ,
    t.Matrix4.prototype.scaleMatrix = function(t, e, i) {
        return this.n11 = t,
        this.n22 = e,
        this.n33 = i,
        this
    }
    ,
    t.Matrix4.prototype.rotationMatrix = function(t, e, i, s) {
        var o = Math.cos(s)
          , n = Math.sin(s)
          , h = t * e * (s = 1 - o)
          , a = e * i * s
          , r = t * i * s
          , p = n * i
          , d = n * e;
        return n *= t,
        this.n11 = o + t * t * s,
        this.n12 = -p + h,
        this.n13 = d + r,
        this.n14 = 0,
        this.n21 = p + h,
        this.n22 = o + e * e * s,
        this.n23 = -n + a,
        this.n24 = 0,
        this.n31 = -d + r,
        this.n32 = n + a,
        this.n33 = o + i * i * s,
        this.n34 = 0,
        this
    }
    ,
    t.Matrix4.prototype.calculateMultiply = function(t, e) {
        var i = t.n11
          , s = e.n11
          , o = t.n21
          , n = e.n21
          , h = t.n31
          , a = e.n31
          , r = t.n12
          , p = e.n12
          , d = t.n22
          , l = e.n22
          , c = t.n32
          , g = e.n32
          , f = t.n13
          , u = e.n13
          , m = t.n23
          , y = e.n23
          , M = t.n33
          , x = e.n33
          , L = t.n14
          , P = e.n14
          , v = t.n24
          , b = e.n24
          , O = t.n34
          , F = e.n34;
        this.n11 = i * s + r * n + f * a,
        this.n12 = i * p + r * l + f * g,
        this.n13 = i * u + r * y + f * x,
        this.n14 = i * P + r * b + f * F + L,
        this.n21 = o * s + d * n + m * a,
        this.n22 = o * p + d * l + m * g,
        this.n23 = o * u + d * y + m * x,
        this.n24 = o * P + d * b + m * F + v,
        this.n31 = h * s + c * n + M * a,
        this.n32 = h * p + c * l + M * g,
        this.n33 = h * u + c * y + M * x,
        this.n34 = h * P + c * b + M * F + O
    }
    ,
    t.Matrix4.prototype.multiply = function(t, e) {
        return this.calculateMultiply(t, e),
        this
    }
    ,
    t.Matrix4.prototype.multiplyVector = function(t, e) {
        var i = e.x
          , s = e.y
          , o = e.z;
        e.x = i * t.n11 + s * t.n12 + o * t.n13 + t.n14,
        e.y = i * t.n21 + s * t.n22 + o * t.n23 + t.n24,
        e.z = i * t.n31 + s * t.n32 + o * t.n33 + t.n34
    }
}(MOD3),
function(t) {
    t.VertexProxy = function(t) {
        this.originalZ = this.originalY = this.originalX = this.ratioZ = this.ratioY = this.ratioX = null,
        void 0 !== t && (this.vertex = t)
    }
    ,
    t.VertexProxy.prototype.setVertex = function() {}
    ,
    t.VertexProxy.prototype.setRatios = function(t, e, i) {
        this.ratioX = t,
        this.ratioY = e,
        this.ratioZ = i
    }
    ,
    t.VertexProxy.prototype.setOriginalPosition = function(t, e, i) {
        this.originalX = t,
        this.originalY = e,
        this.originalZ = i
    }
    ,
    t.VertexProxy.prototype.getX = function() {}
    ,
    t.VertexProxy.prototype.getY = function() {}
    ,
    t.VertexProxy.prototype.getZ = function() {}
    ,
    t.VertexProxy.prototype.setX = function() {}
    ,
    t.VertexProxy.prototype.setY = function() {}
    ,
    t.VertexProxy.prototype.setZ = function() {}
    ,
    t.VertexProxy.prototype.getValue = function(e) {
        switch (e) {
        case t.ModConstant.X:
            return this.getX();
        case t.ModConstant.Y:
            return this.getY();
        case t.ModConstant.Z:
            return this.getZ()
        }
        return 0
    }
    ,
    t.VertexProxy.prototype.setValue = function(e, i) {
        switch (e) {
        case t.ModConstant.X:
            this.setX(i);
            break;
        case t.ModConstant.Y:
            this.setY(i);
            break;
        case t.ModConstant.Z:
            this.setZ(i)
        }
    }
    ,
    t.VertexProxy.prototype.getRatio = function(e) {
        switch (e) {
        case t.ModConstant.X:
            return this.ratioX;
        case t.ModConstant.Y:
            return this.ratioY;
        case t.ModConstant.Z:
            return this.ratioZ
        }
        return -1
    }
    ,
    t.VertexProxy.prototype.getOriginalValue = function(e) {
        switch (e) {
        case t.ModConstant.X:
            return this.originalX;
        case t.ModConstant.Y:
            return this.originalY;
        case t.ModConstant.Z:
            return this.originalZ
        }
        return 0
    }
    ,
    t.VertexProxy.prototype.reset = function() {
        this.setX(this.originalX),
        this.setY(this.originalY),
        this.setZ(this.originalZ)
    }
    ,
    t.VertexProxy.prototype.collapse = function() {
        this.originalX = this.getX(),
        this.originalY = this.getY(),
        this.originalZ = this.getZ()
    }
    ,
    t.VertexProxy.prototype.getVector = function() {
        return new t.Vector3(this.getX(),this.getY(),this.getZ())
    }
    ,
    t.VertexProxy.prototype.setVector = function(t) {
        this.setX(t.x),
        this.setY(t.y),
        this.setZ(t.z)
    }
    ,
    t.VertexProxy.prototype.getRatioVector = function() {
        return new t.Vector3(this.ratioX,this.ratioY,this.ratioZ)
    }
}(MOD3),
function(t) {
    t.FaceProxy = function() {
        this.vertices = []
    }
    ,
    t.FaceProxy.prototype.addVertex = function(t) {
        this.vertices.push(t)
    }
    ,
    t.FaceProxy.prototype.getVertices = function() {
        return this.vertices
    }
}(MOD3),
function(t) {
    t.MeshProxy = function() {
        this.depth = this.height = this.width = this.minAxis = this.midAxis = this.maxAxis = this.minZ = this.minY = this.minX = this.maxZ = this.maxY = this.maxX = null,
        this.vertices = [],
        this.faces = [],
        this.mesh = null
    }
    ,
    t.MeshProxy.prototype.getVertices = function() {
        return this.vertices
    }
    ,
    t.MeshProxy.prototype.getFaces = function() {
        return this.faces
    }
    ,
    t.MeshProxy.prototype.analyzeGeometry = function() {
        for (var e, i, s, o, n, h, a, r, p, d, l = this.getVertices(), c = l.length, g = c, f = !0, u = Math.min, m = Math.max; --g >= 0; )
            i = (e = l[g]).getX(),
            s = e.getY(),
            o = e.getZ(),
            f ? (n = h = i,
            a = r = s,
            p = d = o,
            f = !1) : (n = u(n, i),
            a = u(a, s),
            p = u(p, o),
            h = m(h, i),
            r = m(r, s),
            d = m(d, o)),
            e.setOriginalPosition(i, s, o);
        for (i = h - n,
        s = r - a,
        depth = d - p,
        this.width = i,
        this.height = s,
        this.depth = depth,
        this.minX = n,
        this.maxX = h,
        this.minY = a,
        this.maxY = r,
        this.minZ = p,
        this.maxZ = d,
        g = m(i, m(s, depth)),
        u = u(i, u(s, depth)),
        g == i && u == s ? (this.minAxis = t.ModConstant.Y,
        this.midAxis = t.ModConstant.Z,
        this.maxAxis = t.ModConstant.X) : g == i && u == depth ? (this.minAxis = t.ModConstant.Z,
        this.midAxis = t.ModConstant.Y,
        this.maxAxis = t.ModConstant.X) : g == s && u == i ? (this.minAxis = t.ModConstant.X,
        this.midAxis = t.ModConstant.Z,
        this.maxAxis = t.ModConstant.Y) : g == s && u == depth ? (this.minAxis = t.ModConstant.Z,
        this.midAxis = t.ModConstant.X,
        this.maxAxis = t.ModConstant.Y) : g == depth && u == i ? (this.minAxis = t.ModConstant.X,
        this.midAxis = t.ModConstant.Y,
        this.maxAxis = t.ModConstant.Z) : g == depth && u == s && (this.minAxis = t.ModConstant.Y,
        this.midAxis = t.ModConstant.X,
        this.maxAxis = t.ModConstant.Z),
        g = c; --g >= 0; )
            (e = l[g]).setRatios((e.getX() - n) / i, (e.getY() - a) / s, (e.getZ() - p) / depth)
    }
    ,
    t.MeshProxy.prototype.resetGeometry = function() {
        for (var t = this.getVertices(), e = t.length; --e >= 0; )
            t[e].reset()
    }
    ,
    t.MeshProxy.prototype.collapseGeometry = function() {
        for (var t = this.getVertices(), e = t.length; --e >= 0; )
            t[e].collapse();
        this.analyzeGeometry()
    }
    ,
    t.MeshProxy.prototype.getMin = function(e) {
        switch (e) {
        case t.ModConstant.X:
            return this.minX;
        case t.ModConstant.Y:
            return this.minY;
        case t.ModConstant.Z:
            return this.minZ
        }
        return -1
    }
    ,
    t.MeshProxy.prototype.getMax = function(e) {
        switch (e) {
        case t.ModConstant.X:
            return this.maxX;
        case t.ModConstant.Y:
            return this.maxY;
        case t.ModConstant.Z:
            return this.maxZ
        }
        return -1
    }
    ,
    t.MeshProxy.prototype.getSize = function(e) {
        switch (e) {
        case t.ModConstant.X:
            return this.width;
        case t.ModConstant.Y:
            return this.height;
        case t.ModConstant.Z:
            return this.depth
        }
        return -1
    }
    ,
    t.MeshProxy.prototype.setMesh = function(t) {
        this.mesh = t,
        this.vertices = [],
        this.faces = []
    }
    ,
    t.MeshProxy.prototype.postApply = function() {}
    ,
    t.MeshProxy.prototype.updateMeshPosition = function() {}
}(MOD3),
function(t) {
    t.Modifier = function() {
        this.mod = null
    }
    ,
    t.Modifier.prototype.setModifiable = function(t) {
        this.mod = t
    }
    ,
    t.Modifier.prototype.getVertices = function() {
        return this.mod.getVertices()
    }
    ,
    t.Modifier.prototype.apply = function() {}
}(MOD3),
MOD3.Library3d = function() {
    this.id = "",
    this.vertexClass = this.meshClass = null
}
,
function(t) {
    t.PluginFactory = {},
    t.PluginFactory.getMeshProxy = function(t) {
        return new t.meshClass
    }
}(MOD3),
function(t) {
    t.ModifierStack = function(e, i) {
        this.lib3d = e,
        this.stack = this.baseMesh = null,
        this.baseMesh = t.PluginFactory.getMeshProxy(e),
        this.baseMesh.setMesh(i),
        this.baseMesh.analyzeGeometry(),
        this.stack = []
    }
    ,
    t.ModifierStack.prototype.addModifier = function(t) {
        t.setModifiable(this.baseMesh),
        this.stack.push(t)
    }
    ,
    t.ModifierStack.prototype.apply = function() {
        this.baseMesh.resetGeometry();
        for (var t = this.stack, e = t.length, i = 0; i < e; )
            t[i++].apply();
        this.baseMesh.postApply()
    }
    ,
    t.ModifierStack.prototype.collapse = function() {
        this.apply(),
        this.baseMesh.collapseGeometry(),
        this.stack = []
    }
    ,
    t.ModifierStack.prototype.clear = function() {
        this.stack = []
    }
    ,
    t.ModifierStack.prototype.getMeshInfo = function() {
        return this.baseMesh
    }
}(MOD3),
function(t) {
    t.Bend = function(e, i, s) {
        this.diagAngle = this.angle = this.offset = this.force = null,
        this.constraint = t.ModConstant.NONE,
        this.m2 = this.m1 = this.origin = this.height = this.width = this.mid = this.min = this.max = null,
        this.switchAxes = !1,
        this.force = e,
        this.offset = i,
        this.setAngle(s)
    }
    ,
    t.Bend.prototype = new t.Modifier,
    t.Bend.prototype.constructor = t.Bend,
    t.Bend.prototype.setAngle = function(e) {
        this.angle = e,
        this.m1 = new t.Matrix,
        this.m1.rotate(e),
        this.m2 = new t.Matrix,
        this.m2.rotate(-e)
    }
    ,
    t.Bend.prototype.setModifiable = function(e) {
        t.Modifier.prototype.setModifiable.call(this, e),
        this.max = this.switchAxes ? this.mod.midAxis : this.mod.maxAxis,
        this.min = this.mod.minAxis,
        this.mid = this.switchAxes ? this.mod.maxAxis : this.mod.midAxis,
        this.width = this.mod.getSize(this.max),
        this.height = this.mod.getSize(this.mid),
        this.origin = this.mod.getMin(this.max),
        this.diagAngle = Math.atan(this.width / this.height)
    }
    ,
    t.Bend.prototype.apply = function() {
        if (0 != this.force)
            for (var e, i, s, o, n = this.mod.getVertices(), h = n.length, a = this.width, r = this.offset, p = this.origin, d = this.max, l = this.min, c = this.mid, g = this.m1, f = this.m2, u = p + a * r, m = a / Math.PI / this.force, y = t.Constants.doublePI * (a / (m * t.Constants.doublePI)), M = 1 / a, x = t.Constants.halfPI, L = Math.sin, P = Math.cos; --h >= 0; )
                e = (a = n[h]).getValue(d),
                i = a.getValue(c),
                s = a.getValue(l),
                e = (i = g.transformPoint(new t.Point(e,i))).x,
                i = i.y,
                o = (e - p) * M,
                this.constraint == t.ModConstant.LEFT && o <= r || this.constraint == t.ModConstant.RIGHT && o >= r || (e = L(o = x - y * r + y * o) * (m + s),
                o = P(o) * (m + s),
                s = e - m,
                e = u - o),
                e = (i = f.transformPoint(new t.Point(e,i))).x,
                i = i.y,
                a.setValue(d, e),
                a.setValue(c, i),
                a.setValue(l, s)
    }
}(MOD3),
function(t) {
    t.LibraryThree = function() {
        this.id = "Three.js",
        this.meshClass = t.MeshThree,
        this.vertexClass = t.VertexThree
    }
    ,
    t.LibraryThree.prototype = new t.Library3d,
    t.LibraryThree.prototype.constructor = t.LibraryThree
}(MOD3),
function(t) {
    t.VertexThree = function(t) {
        this.mesh = t
    }
    ,
    t.VertexThree.prototype = new t.VertexProxy,
    t.VertexThree.prototype.setVertex = function(t) {
        this.vertex = t,
        this.originalX = t.x,
        this.originalY = t.y,
        this.originalZ = t.z
    }
    ,
    t.VertexThree.prototype.getX = function() {
        return this.vertex.x
    }
    ,
    t.VertexThree.prototype.getY = function() {
        return this.vertex.y
    }
    ,
    t.VertexThree.prototype.getZ = function() {
        return this.vertex.z
    }
    ,
    t.VertexThree.prototype.setX = function(t) {
        this.vertex.x = t,
        (t = this.mesh).geometry.verticesNeedUpdate = !0,
        t.geometry.normalsNeedUpdate = !0,
        t.geometry.buffersNeedUpdate = !0,
        t.geometry.dynamic = !0
    }
    ,
    t.VertexThree.prototype.setY = function(t) {
        this.vertex.y = t,
        (t = this.mesh).geometry.verticesNeedUpdate = !0,
        t.geometry.normalsNeedUpdate = !0,
        t.geometry.buffersNeedUpdate = !0,
        t.geometry.dynamic = !0
    }
    ,
    t.VertexThree.prototype.setZ = function(t) {
        this.vertex.z = t,
        (t = this.mesh).geometry.verticesNeedUpdate = !0,
        t.geometry.normalsNeedUpdate = !0,
        t.geometry.buffersNeedUpdate = !0,
        t.geometry.dynamic = !0
    }
}(MOD3),
function(t) {
    t.MeshThree = function() {}
    ,
    t.MeshThree.prototype = new t.MeshProxy,
    t.MeshThree.prototype.setMesh = function(e) {
        t.MeshProxy.prototype.setMesh.call(this, e),
        e = [];
        var i, s = 0, o = this.mesh.geometry.vertices, n = o.length, h = this.mesh.geometry.faces, a = h.length;
        for (s = 0; s < n; )
            (i = new t.VertexThree(this.mesh)).setVertex(o[s]),
            this.vertices.push(i),
            e[o[s]] = i,
            s++;
        for (s = 0; s < a; )
            n = new t.FaceProxy,
            h[s]instanceof THREE.Face3 ? (n.addVertex(e[o[h[s].a]]),
            n.addVertex(e[o[h[s].b]]),
            n.addVertex(e[o[h[s].c]])) : h[s]instanceof THREE.Face4 && (n.addVertex(e[o[h[s].a]]),
            n.addVertex(e[o[h[s].b]]),
            n.addVertex(e[o[h[s].c]]),
            n.addVertex(e[o[h[s].d]])),
            this.faces.push(n),
            s++;
        delete lookup
    }
    ,
    t.MeshThree.prototype.updateMeshPosition = function(t) {
        var e = this.mesh;
        e.position.x += t.x,
        e.position.y += t.y,
        e.position.z += t.z
    }
}(MOD3),
FLIPBOOK.CSS3DObject = function(t) {
    THREE.Object3D.call(this),
    this.element = t,
    this.element.style.position = "absolute",
    this.element.style.pointerEvents = "auto",
    this.addEventListener("removed", (function() {
        this.traverse((function(t) {
            t.element instanceof Element && null !== t.element.parentNode && t.element.parentNode.removeChild(t.element)
        }
        ))
    }
    ))
}
,
FLIPBOOK.CSS3DObject.prototype = Object.create(THREE.Object3D.prototype),
FLIPBOOK.CSS3DObject.prototype.constructor = FLIPBOOK.CSS3DObject,
FLIPBOOK.CSS3DSprite = function(t) {
    FLIPBOOK.CSS3DObject.call(this, t)
}
,
FLIPBOOK.CSS3DSprite.prototype = Object.create(FLIPBOOK.CSS3DObject.prototype),
FLIPBOOK.CSS3DSprite.prototype.constructor = FLIPBOOK.CSS3DSprite,
FLIPBOOK.CSS3DRenderer = function() {
    var t, e, i, s, o = this, n = new THREE.Matrix4, h = {
        camera: {
            fov: 0,
            style: ""
        },
        objects: new WeakMap
    }, a = document.createElement("div");
    a.style.overflow = "hidden",
    this.domElement = a;
    var r = document.createElement("div");
    r.style.WebkitTransformStyle = "preserve-3d",
    r.style.transformStyle = "preserve-3d",
    r.style.pointerEvents = "none",
    a.appendChild(r);
    var p = /Trident/i.test(navigator.userAgent);
    function d(t) {
        return Math.abs(t) < 1e-10 ? 0 : t
    }
    function l(t) {
        var e = t.elements;
        return "matrix3d(" + d(e[0]) + "," + d(-e[1]) + "," + d(e[2]) + "," + d(e[3]) + "," + d(e[4]) + "," + d(-e[5]) + "," + d(e[6]) + "," + d(e[7]) + "," + d(e[8]) + "," + d(-e[9]) + "," + d(e[10]) + "," + d(e[11]) + "," + d(e[12]) + "," + d(-e[13]) + "," + d(e[14]) + "," + d(e[15]) + ")"
    }
    function c(t, e) {
        var o = t.elements
          , n = "matrix3d(" + d(o[0]) + "," + d(o[1]) + "," + d(o[2]) + "," + d(o[3]) + "," + d(-o[4]) + "," + d(-o[5]) + "," + d(-o[6]) + "," + d(-o[7]) + "," + d(o[8]) + "," + d(o[9]) + "," + d(o[10]) + "," + d(o[11]) + "," + d(o[12]) + "," + d(o[13]) + "," + d(o[14]) + "," + d(o[15]) + ")";
        return p ? "translate(-50%,-50%)translate(" + i + "px," + s + "px)" + e + n : "translate(-50%,-50%)" + n
    }
    function g(t, e, i, s) {
        if (t instanceof FLIPBOOK.CSS3DObject) {
            var a;
            t.onBeforeRender(o, e, i),
            t instanceof FLIPBOOK.CSS3DSprite ? (n.copy(i.matrixWorldInverse),
            n.transpose(),
            n.copyPosition(t.matrixWorld),
            n.scale(t.scale),
            n.elements[3] = 0,
            n.elements[7] = 0,
            n.elements[11] = 0,
            n.elements[15] = 1,
            a = c(n, s)) : a = c(t.matrixWorld, s);
            var d = t.element
              , l = h.objects.get(t);
            if (void 0 === l || l.style !== a) {
                d.style.WebkitTransform = a,
                d.style.transform = a;
                var f = {
                    style: a
                };
                p && (f.distanceToCameraSquared = m(i, t)),
                h.objects.set(t, f)
            }
            d.parentNode !== r && r.appendChild(d),
            t.onAfterRender(o, e, i)
        }
        for (var u = 0, y = t.children.length; u < y; u++)
            g(t.children[u], e, i, s)
    }
    this.getSize = function() {
        return {
            width: t,
            height: e
        }
    }
    ,
    this.setSize = function(o, n) {
        i = (t = o) / 2,
        s = (e = n) / 2,
        a.style.width = o + "px",
        a.style.height = n + "px",
        r.style.width = o + "px",
        r.style.height = n + "px"
    }
    ;
    var f, u, m = (f = new THREE.Vector3,
    u = new THREE.Vector3,
    function(t, e) {
        return f.setFromMatrixPosition(t.matrixWorld),
        u.setFromMatrixPosition(e.matrixWorld),
        f.distanceToSquared(u)
    }
    );
    this.render = function(t, e) {
        var o = e.projectionMatrix.elements[5] * s;
        if (h.camera.fov !== o && (e.isPerspectiveCamera ? (a.style.WebkitPerspective = o + "px",
        a.style.perspective = o + "px") : (a.style.WebkitPerspective = "",
        a.style.perspective = ""),
        h.camera.fov = o),
        !0 === t.autoUpdate && t.updateMatrixWorld(),
        null === e.parent && e.updateMatrixWorld(),
        e.isOrthographicCamera)
            var n = -(e.right + e.left) / 2
              , c = (e.top + e.bottom) / 2;
        var f = e.isOrthographicCamera ? "scale(" + o + ")translate(" + d(n) + "px," + d(c) + "px)" + l(e.matrixWorldInverse) : "translateZ(" + o + "px)" + l(e.matrixWorldInverse)
          , u = f + "translate(" + i + "px," + s + "px)";
        h.camera.style === u || p || (r.style.WebkitTransform = u,
        r.style.transform = u,
        h.camera.style = u),
        g(t, t, e, f),
        p && function(t) {
            for (var e = function(t) {
                var e = [];
                return t.traverse((function(t) {
                    t instanceof THREE.CSS3DObject && e.push(t)
                }
                )),
                e
            }(t).sort((function(t, e) {
                return h.objects.get(t).distanceToCameraSquared - h.objects.get(e).distanceToCameraSquared
            }
            )), i = e.length, s = 0, o = e.length; s < o; s++)
                e[s].element.style.zIndex = i - s
        }(t)
    }
}
;
