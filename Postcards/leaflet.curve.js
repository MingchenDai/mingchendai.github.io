L.Curve = L.Path.extend({
    options: {},
    initialize: function(b, a) {
        L.setOptions(this, a);
        this._setPath(b)
    },
    setLatLngs: function(b) {
        return this.setPath(b)
    },
    getLatLngs: function() {
        return this.getPath()
    },
    _updateBounds: function() {
        var b = this._clickTolerance();
        b = new L.Point(b,b);
        this._pxBounds = new L.Bounds([this._rawPxBounds.min.subtract(b), this._rawPxBounds.max.add(b)])
    },
    getPath: function() {
        return this._coords
    },
    setPath: function(b) {
        this._setPath(b);
        return this.redraw()
    },
    getBounds: function() {
        return this._bounds
    },
    _setPath: function(b) {
        this._coords = b;
        this._bounds = this._computeBounds()
    },
    _computeBounds: function() {
        for (var b = new L.LatLngBounds, a, e, c, d = 0; d < this._coords.length; d++)
            if (c = this._coords[d],
            "string" == typeof c || c instanceof String)
                e = c;
            else if ("H" == e)
                b.extend([a.lat, c[0]]),
                    a = new L.latLng(a.lat,c[0]);
            else if ("V" == e)
                b.extend([c[0], a.lng]),
                    a = new L.latLng(c[0],a.lng);
            else if ("C" == e) {
                var f = new L.latLng(c[0],c[1]);
                c = this._coords[++d];
                var g = new L.latLng(c[0],c[1]);
                c = this._coords[++d];
                c = new L.latLng(c[0],c[1]);
                b.extend(f);
                b.extend(g);
                b.extend(c);
                c.controlPoint1 = f;
                c.controlPoint2 = g;
                a = c
            } else if ("S" == e) {
                g = new L.latLng(c[0],c[1]);
                c = this._coords[++d];
                c = new L.latLng(c[0],c[1]);
                f = a;
                if (a.controlPoint2) {
                    f = a.lat - a.controlPoint2.lat;
                    var h = a.lng - a.controlPoint2.lng;
                    f = new L.latLng(a.lat + f,a.lng + h)
                }
                b.extend(f);
                b.extend(g);
                b.extend(c);
                c.controlPoint1 = f;
                c.controlPoint2 = g;
                a = c
            } else
                "Q" == e ? (g = new L.latLng(c[0],c[1]),
                    c = this._coords[++d],
                    c = new L.latLng(c[0],c[1]),
                    b.extend(g),
                    b.extend(c),
                    c.controlPoint = g,
                    a = c) : "T" == e ? (c = new L.latLng(c[0],c[1]),
                    g = a,
                a.controlPoint && (f = a.lat - a.controlPoint.lat,
                    h = a.lng - a.controlPoint.lng,
                    g = new L.latLng(a.lat + f,a.lng + h)),
                    b.extend(g),
                    b.extend(c),
                    c.controlPoint = g,
                    a = c) : (b.extend(c),
                    a = new L.latLng(c[0],c[1]));
        return b
    },
    getCenter: function() {
        return this._bounds.getCenter()
    },
    _update: function() {
        this._map && this._updatePath()
    },
    _updatePath: function() {
        this._usingCanvas ? this._updateCurveCanvas() : this._updateCurveSvg()
    },
    _project: function() {
        this._points = [];
        for (var b = 0; b < this._coords.length; b++) {
            var a = this._coords[b];
            if ("string" == typeof a || a instanceof String) {
                this._points.push(a);
                var e = a
            } else {
                // switch (a.length) {
                //     case 2:
                //         var c = this._map.latLngToLayerPoint(a);
                //         var d = a;
                //         break;
                //     case 1:
                //         "H" === e ? (c = this._map.latLngToLayerPoint([d[0], a[0]]),
                //             d = [d[0], a[0]]) : (c = this._map.latLngToLayerPoint([a[0], d[1]]),
                //             d = [a[0], d[1]])
                // }
                var c = this._map.latLngToLayerPoint(a);
                var d = a;
                this._points.push(c)
            }
        }
        this._bounds.isValid() && (a = this._map.latLngToLayerPoint(this._bounds.getNorthWest()),
            d = this._map.latLngToLayerPoint(this._bounds.getSouthEast()),
            this._rawPxBounds = new L.Bounds(a,d),
            this._updateBounds())
    },
    _curvePointsToPath: function(b) {
        for (var a, e, c = "", d = 0; d < b.length; d++)
            if (a = b[d],
            "string" == typeof a || a instanceof String)
                e = a,
                    c += e;
            else
                switch (e) {
                    case "H":
                        c += a.x + " ";
                        break;
                    case "V":
                        c += a.y + " ";
                        break;
                    default:
                        c += a.x + "," + a.y + " "
                }
        return c || "M0 0"
    },
    beforeAdd: function(b) {
        L.Path.prototype.beforeAdd.call(this, b);
        if (this._usingCanvas = this._renderer instanceof L.Canvas)
            this._pathSvgElement = document.createElementNS("http://www.w3.org/2000/svg", "path")
    },
    onAdd: function(b) {
        this._usingCanvas && (this._canvasSetDashArray = !this.options.dashArray);
        L.Path.prototype.onAdd.call(this, b);
        this._usingCanvas ? this.options.animate && "object" === typeof TWEEN ? (this._normalizeCanvasAnimationOptions(),
            this._tweenedObject = {
                offset: this._pathSvgElement.getTotalLength()
            },
            this._tween = (new TWEEN.Tween(this._tweenedObject)).to({
                offset: 0
            }, this.options.animate.duration).delay(this.options.animate.delay).repeat(this.options.animate.iterations - 1).onComplete(function(a) {
                return function() {
                    a._canvasAnimating = !1
                }
            }(this)).start(),
            this._canvasAnimating = !0,
            this._animateCanvas()) : this._canvasAnimating = !1 : this.options.animate && this._path.animate && (b = this._svgSetDashArray(),
            this._path.animate([{
                strokeDashoffset: b
            }, {
                strokeDashoffset: 0
            }], this.options.animate))
    },
    _updateCurveSvg: function() {
        this._renderer._setPath(this, this._curvePointsToPath(this._points));
        this.options.animate && this._svgSetDashArray()
    },
    _svgSetDashArray: function() {
        var b = this._path
            , a = b.getTotalLength();
        this.options.dashArray || (b.style.strokeDasharray = a + " " + a);
        return a
    },
    _containsPoint: function(b) {
        return this._bounds.isValid() ? this._bounds.contains(this._map.layerPointToLatLng(b)) : !1
    },
    _normalizeCanvasAnimationOptions: function() {
        var b = {
            delay: 0,
            duration: 0,
            iterations: 1
        };
        "number" == typeof this.options.animate ? b.duration = this.options.animate : (this.options.animate.duration && (b.duration = this.options.animate.duration),
        this.options.animate.delay && (b.delay = this.options.animate.delay),
        this.options.animate.iterations && (b.iterations = this.options.animate.iterations));
        this.options.animate = b
    },
    _updateCurveCanvas: function() {
        var b = this._curvePointsToPath(this._points);
        this._pathSvgElement.setAttribute("d", b);
        this.options.animate && "object" === typeof TWEEN && this._canvasSetDashArray && (this.options.dashArray = this._pathSvgElement.getTotalLength() + "",
            this._renderer._updateDashArray(this));
        this._curveFillStroke(new Path2D(b), this._renderer._ctx)
    },
    _animateCanvas: function() {
        TWEEN.update();
        this._renderer._updatePaths();
        this._canvasAnimating && (this._animationFrameId = L.Util.requestAnimFrame(this._animateCanvas, this))
    },
    _curveFillStroke: function(b, a) {
        a.lineDashOffset = this._canvasAnimating ? this._tweenedObject.offset : 0;
        var e = this.options;
        e.fill && (a.globalAlpha = e.fillOpacity,
            a.fillStyle = e.fillColor || e.color,
            a.fill(b, e.fillRule || "evenodd"));
        e.stroke && 0 !== e.weight && (a.setLineDash && a.setLineDash(this.options && this.options._dashArray || []),
            a.globalAlpha = e.opacity,
            a.lineWidth = e.weight,
            a.strokeStyle = e.color,
            a.lineCap = e.lineCap,
            a.lineJoin = e.lineJoin,
            a.stroke(b))
    },
    trace: function(b) {
        if (void 0 === this._map || null === this._map)
            return [];
        b = b.filter(function(l) {
            return 0 <= l && 1 >= l
        });
        for (var a, e, c, d, f, g, h = [], k = 0; k < this._points.length; k++)
            if (a = this._points[k],
            "string" == typeof a || a instanceof String)
                e = a,
                "Z" == e && (h = h.concat(this._linearTrace(b, d, c)));
            else
                switch (e) {
                    case "M":
                        d = c = a;
                        break;
                    case "L":
                    case "H":
                    case "V":
                        h = h.concat(this._linearTrace(b, d, a));
                        d = a;
                        break;
                    case "C":
                        f = a;
                        g = this._points[++k];
                        a = this._points[++k];
                        h = h.concat(this._cubicTrace(b, d, f, g, a));
                        d = a;
                        break;
                    case "S":
                        f = this._reflectPoint(g, d);
                        g = a;
                        a = this._points[++k];
                        h = h.concat(this._cubicTrace(b, d, f, g, a));
                        d = a;
                        break;
                    case "Q":
                        f = a;
                        g = this._points[++k];
                        h = h.concat(this._quadraticTrace(b, d, f, g));
                        d = g;
                        break;
                    case "T":
                        f = this._reflectPoint(f, d),
                            g = a,
                            h = h.concat(this._quadraticTrace(b, d, f, g)),
                            d = g
                }
        return h
    },
    _linearTrace: function(b, a, e) {
        return b.map(c => {
                var d = this._singleLinearTrace(c, a.x, e.x);
                c = this._singleLinearTrace(c, a.y, e.y);
                return this._map.layerPointToLatLng([d, c])
            }
        )
    },
    _quadraticTrace: function(b, a, e, c) {
        return b.map(d => {
                var f = this._singleQuadraticTrace(d, a.x, e.x, c.x);
                d = this._singleQuadraticTrace(d, a.y, e.y, c.y);
                return this._map.layerPointToLatLng([f, d])
            }
        )
    },
    _cubicTrace: function(b, a, e, c, d) {
        return b.map(f => {
                var g = this._singleCubicTrace(f, a.x, e.x, c.x, d.x);
                f = this._singleCubicTrace(f, a.y, e.y, c.y, d.y);
                return this._map.layerPointToLatLng([g, f])
            }
        )
    },
    _singleLinearTrace: function(b, a, e) {
        return a + b * (e - a)
    },
    _singleQuadraticTrace: function(b, a, e, c) {
        var d = 1 - b;
        return Math.pow(d, 2) * a + 2 * d * b * e + Math.pow(b, 2) * c
    },
    _singleCubicTrace: function(b, a, e, c, d) {
        var f = 1 - b;
        return Math.pow(f, 3) * a + 3 * Math.pow(f, 2) * b * e + 3 * f * Math.pow(b, 2) * c + Math.pow(b, 3) * d
    },
    _reflectPoint: function(b, a) {
        x = a.x + (a.x - b.x);
        y = a.y + (a.y - b.y);
        return L.point(x, y)
    }
});
L.curve = function(b, a) {
    return new L.Curve(b,a)
}
;
