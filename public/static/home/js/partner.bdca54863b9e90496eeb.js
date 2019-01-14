!function (e) {
    var o = {};

    function t(i) {
        if (o[i])return o[i].exports;
        var n = o[i] = {i: i, l: !1, exports: {}};
        return e[i].call(n.exports, n, n.exports, t), n.l = !0, n.exports
    }

    t.m = e, t.c = o, t.d = function (e, o, i) {
        t.o(e, o) || Object.defineProperty(e, o, {enumerable: !0, get: i})
    }, t.r = function (e) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {value: "Module"}), Object.defineProperty(e, "__esModule", {value: !0})
    }, t.t = function (e, o) {
        if (1 & o && (e = t(e)), 8 & o)return e;
        if (4 & o && "object" == typeof e && e && e.__esModule)return e;
        var i = Object.create(null);
        if (t.r(i), Object.defineProperty(i, "default", {
                enumerable: !0,
                value: e
            }), 2 & o && "string" != typeof e)for (var n in e)t.d(i, n, function (o) {
            return e[o]
        }.bind(null, n));
        return i
    }, t.n = function (e) {
        var o = e && e.__esModule ? function () {
            return e.default
        } : function () {
            return e
        };
        return t.d(o, "a", o), o
    }, t.o = function (e, o) {
        return Object.prototype.hasOwnProperty.call(e, o)
    }, t.p = "../", t(t.s = 9)
}([function (e, o, t) {
    "use strict";
    t(1), t(2), t(3), t(4);
    $(function () {
        $("body").append('<div class="backToTop"><div class="backToTop-arr"><div><div>'), $("body").on("click", ".backToTop", function () {
            $("html,body").animate({scrollTop: 0}, 800)
        }), $(window).bind("scroll", function () {
            (document.documentElement.scrollTop || document.body.scrollTop) > 0 ? ($(".header").addClass("fixed"), $(".backToTop").show()) : ($(".header").removeClass("fixed"), $(".backToTop").hide())
        })
    })
}, function (e, o, t) {
}, function (e, o, t) {
}, function (e, o, t) {
}, function (e, o, t) {
}, , , , , function (e, o, t) {
    "use strict";
    t.r(o);
    t(0), t(10), t(11);
    var i = "", n = "", s = function (e, o) {
        $.ajax({
            type: "post",
            url: n + "/joinapply",
            data: "name="+e.name+"&company="+e.company+"&telNumber="+e.telNumber+"&area="+e.area,
            success: function (e) {
                0 == e.code ? o && o(0 == e.code, e.messageExt) : o && o(!1, e.messageExt ? e.messageExt : "接口调用失败")
            },
            error: function () {
                o && o(!1, "接口调用失败")
            }
        })
    }, c = function (e) {
        let o = !0;
        return "" == e ? ($(".nameError").text("请输入真实姓名").removeClass("vhidden"), o = !1) : /^[\u4e00-\u9fa5_a-zA-Z0-9\s\u0800-\u4e00]+$/.test(e) ? $(".nameError").text("").addClass("vhidden") : ($(".nameError").text("姓名格式不正确").removeClass("vhidden"), o = !1), o
    }, r = function (e) {
        let o = !0;
        return "" == e ? ($(".areaError").text("请输入公司名称").removeClass("vhidden"), o = !1) : $(".areaError").text("").addClass("vhidden"), o
    }, d = function (e) {
        var o = $(".phoneError");
        let t = !0;
        return "" == e ? (o.text("请输入手机号码").removeClass("vhidden"), t = !1) : /^1[3|4|5|6|7|8|9]\d{9}$/.test(e) || (o.text("手机号码格式不正确").removeClass("vhidden"), t = !1), t && o.text("").addClass("vhidden"), t
    };
    !function (e) {
         e(".banner-btn").on("click", function () {
            var o = e(document).height() - e(".apply").height() - e(".footer").height();
            e("html,body").animate({scrollTop: o}, 800)
        }), e(".form__btn").on("click", function () {
            let o = e.trim(e(".form__name").val()), t = e.trim(e(".form__company").val()), i = e.trim(e(".form__phoneNumber").val()) ,m = e.trim(e(".form__area").val());
            var n = c(o), a = r(t), l = d(i);
            n && a && l && s({name: o, company: t, telNumber: i,area:m}, function (o, t) {
                o ? popup({
                    type: "success", msg: "信息已提交成功，我们将于一个工作日内联系您", delay: 3e3, callBack: function () {
                        console.log("callBack~~~")
                    }
                }) : popup({
                    type: "error", msg: t, delay: 3e3, callBack: function () {
                        console.log("callBack~~~")
                    }
                }), e(".form__name").val(""), e(".form__area").val(""), e(".form__phoneNumber").val("")
            })
        })
    }($)
}, function (e, o) {
    !function (e) {
        var o = function (t) {
            if (this.config = {
                    width: 380,
                    height: 150,
                    msg: "",
                    winDom: window,
                    delay: 0,
                    bg: !0,
                    bgWhite: !1,
                    clickDomCancel: !1,
                    callback: null,
                    type: "success"
                }, e.extend(this.config, t), !o.prototype.modelBox)return this.render(this.config.type), this
        };
        window.Dialog = o, o.prototype.modelBox = null, o.prototype.render = function (e) {
            this.renderUI(e), this.clickDom(), this.initBox(), o.prototype.modelBox.appendTo(this.config.winDom.document.body)
        }, o.prototype.renderUI = function (t) {
            o.prototype.modelBox = e("<div id='animationTipBox'></div>"), "load" == t && this.loadRender(), "success" == t && this.successRender(), "error" == t && this.errorRender(), "tip" == t && this.tipRender(), this.config.bg && (this.config.bgWhite ? this._mask = e("<div class='mask_white'></div>") : this._mask = e("<div class='mask'></div>"), this._mask.appendTo(this.config.winDom.document.body)), _this_ = this, !this.config.delay && "function" == typeof this.config.callBack && (this.config.delay = 1), this.config.delay && setTimeout(function () {
                _this_.close()
            }, _this_.config.delay)
        }, o.prototype.clickDom = function () {
            var e = this;
            this.config.clickDomCancel && this._mask && this._mask.click(function () {
                e.close()
            })
        }, o.prototype.initBox = function () {
            o.prototype.modelBox.css({
                width: this.config.width + "px",
                height: this.config.height + "px",
                marginLeft: "-" + this.config.width / 2 + "px",
                marginTop: "-" + this.config.height / 2 + "px"
            })
        }, o.prototype.successRender = function () {
            var e = "<div class='success'>";
            e += " <div class='icon'>", e += "<div class='line_short'></div>", e += "<div class='line_long'></div>  ", e += "</div>", e += " <div class='dec_txt'>" + this.config.msg + "</div>", e += "</div>", o.prototype.modelBox.append(e)
        }, o.prototype.loadRender = function () {
            var e = "<div class='load'>";
            e += "<div class='icon_box'>";
            for (var t = 1; t < 4; t++)e += "<div class='cirBox" + t + "'>", e += "<div class='cir1'></div>", e += "<div class='cir2'></div>", e += "<div class='cir3'></div>", e += "<div class='cir4'></div>", e += "</div>";
            e += "</div>", e += "</div>", e += "<div class='dec_txt'>" + this.config.msg + "</div>", o.prototype.modelBox.append(e)
        }, o.prototype.tipRender = function () {
            var e = "<div class='tip'>";
            e += "     <div class='icon'>i</div>", e += "     <div class='dec_txt'>" + this.config.msg + "</div>", e += "</div>", o.prototype.modelBox.append(e)
        }, o.prototype.errorRender = function () {
            var e = "<div class='lose'>";
            e += "   <div class='icon'>", e += "       <div class='icon_box'>", e += "           <div class='line_left'></div>", e += "           <div class='line_right'></div>", e += "       </div>", e += "   </div>", e += "<div class='dec_txt'>" + this.config.msg + "</div>", e += "</div>", o.prototype.modelBox.append(e)
        }, o.prototype.close = function () {
            o.prototype.destroy(), this.destroy(), this.config.delay && "function" == typeof this.config.callBack && this.config.callBack()
        }, o.prototype.destroy = function () {
            this._mask && this._mask.remove(), o.prototype.modelBox && o.prototype.modelBox.remove(), o.prototype.modelBox = null
        }, popup = function (e) {
            return new o(e)
        }
    }($)
}, function (e, o, t) {
}]);