!function (e) {
    var t = {};

    function s(n) {
        if (t[n])return t[n].exports;
        var a = t[n] = {i: n, l: !1, exports: {}};
        return e[n].call(a.exports, a, a.exports, s), a.l = !0, a.exports
    }

    s.m = e, s.c = t, s.d = function (e, t, n) {
        s.o(e, t) || Object.defineProperty(e, t, {enumerable: !0, get: n})
    }, s.r = function (e) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {value: "Module"}), Object.defineProperty(e, "__esModule", {value: !0})
    }, s.t = function (e, t) {
        if (1 & t && (e = s(e)), 8 & t)return e;
        if (4 & t && "object" == typeof e && e && e.__esModule)return e;
        var n = Object.create(null);
        if (s.r(n), Object.defineProperty(n, "default", {
                enumerable: !0,
                value: e
            }), 2 & t && "string" != typeof e)for (var a in e)s.d(n, a, function (t) {
            return e[t]
        }.bind(null, a));
        return n
    }, s.n = function (e) {
        var t = e && e.__esModule ? function () {
            return e.default
        } : function () {
            return e
        };
        return s.d(t, "a", t), t
    }, s.o = function (e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
    }, s.p = "../", s(s.s = 5)
}([function (e, t, s) {
    "use strict";
    s(1), s(2), s(3), s(4);
    $(function () {
        $("body").append('<div class="backToTop"><div class="backToTop-arr"><div><div>'), $("body").on("click", ".backToTop", function () {
            $("html,body").animate({scrollTop: 0}, 800)
        }), $(window).bind("scroll", function () {
            (document.documentElement.scrollTop || document.body.scrollTop) > 0 ? ($(".header").addClass("fixed"), $(".backToTop").show()) : ($(".header").removeClass("fixed"), $(".backToTop").hide())
        })
    })
}, function (e, t, s) {
}, function (e, t, s) {
}, function (e, t, s) {
}, function (e, t, s) {
}, function (e, t, s) {
    "use strict";
    s.r(t);
    s(0), s(6);
    var n = "", a = "", o = "", i = "", d = "";

    function c(e, t) {
        var s = $("" + e);
        t = "animated " + (t || "fadeInUp");
        s.viewport().inViewport() && s.addClass(t)
    }

    $(function () {
        let e = $("#js_inputPhone"), t = $("#js_inputCode"), s = $("#js_phoneError"), l = $("#js_smsCodeError"), r = $(".js_speechTabs"), u = $("#jsGetCode"), p = $("#js_speechForm"), f = $("#js_speechSuccess"), h = $("#js_expBtn"), m = localStorage.getItem("__phone");
        e.val(m);
        var v = function (e) {
            let t = !0;
            return "" == e ? (s.text("请输入手机号码").removeClass("vhidden"), t = !1) : /^1[3|4|5|6|7|8|9]\d{9}$/.test(e) || (s.text("手机号码格式不正确").removeClass("vhidden"), t = !1), t && s.text("").addClass("vhidden"), t
        };
        new Swiper(".swiper-container", {
            autoplay: {delay: 5e3},
            pagination: {el: ".swiper-pagination", clickable: !0}
        });
        $("audio").mediaelementplayer({
            features: ["playpause", "progress"], success: function (e) {
                $(".sample").show()
            }
        }), $(window).bind("scroll", function () {
            c("#tech1"), c("#tech2"), c("#tech3"), c("#tech4")
        }), e.on("focus", function (e) {
            s.text("").addClass("vhidden")
        }), t.on("focus", function (e) {
            l.text("").addClass("vhidden")
        }), r.on("click", function (e) {
            let s = e.target || e.srcElement;
            $(s).hasClass("speech__tab") && ($(".speech__tab").removeClass("selected"), $(s).addClass("selected"), f.addClass("hidden"), p.removeClass("hidden"), t.val(""))
        }), u.on("click", function (t) {
            let s = $.trim(e.val());
            v(s) && "1" != $(this).attr("issubmit") && ($(this).attr("issubmit", "1"), function (e, t, s) {
                let n = e;
                var a = function () {
                    t && t(n), n <= 1 ? s && s() : (n--, setTimeout(function () {
                        a()
                    }, 1e3))
                };
                a()
            }(60, function (e) {
                u.text(e + "秒后获取")
            }, function () {
                u.text("获取验证码"), u.removeAttr("issubmit")
            }), function (e, t) {
                var s = {phone: e, sendTempleteId: "KXJL_TMP_003", identifyCodeParamName: "code"};
                localStorage.setItem("__phone", e), $.ajax({
                    type: "POST",
                    url: o + "/api/v1/newsms/" + n + "/sendIdentifyCode",
                    data: JSON.stringify(s),
                    dataType: "json",
                    success: function (e, s, n) {
                        t && t(0 == e.code, e.messageExt)
                    },
                    error: function () {
                        t && t(!1, "获取失败，请稍后在试")
                    }
                })
            }(s, function (e, t) {
                e ? l.text("").addClass("vhidden") : l.text(t).removeClass("vhidden")
            }))
        }), h.on("click", function (s) {
            let i, c, u;
            i = $.trim(e.val()), v(i) && function (e) {
                let t = !0;
                return "" == e && (l.text("请输入短信验证码").removeClass("vhidden"), t = !1), t
            }(c = $.trim(t.val())) && ($(this).hasClass("disabled") || ($(this).addClass("disabled"), u = r.find(".speech__tab.selected").attr("data-task"), function (e, t, s) {
                $.ajax({
                    type: "post",
                    url: o + "/api/v1/newsms/" + n + "/checkIdentifyCode",
                    dataType: "json",
                    data: JSON.stringify({phone: e, checkIdentifyCode: t}),
                    success: function (e) {
                        s && s(0 == e.code, e.messageExt)
                    },
                    error: function () {
                        s && s(!1, "接口调用失败")
                    }
                })
            }(i, c, function (e, t) {
                if (!e)return l.text(t).removeClass("vhidden"), void h.removeClass("disabled");
                l.text("").addClass("vhidden"), function (e, t, s) {
                    var n = {taskId: e, taskData: [{"客户手机号码": t}], phoneNumberKey: "客户手机号码"};
                    $.ajax({
                        type: "POST",
                        dataType: "json",
                        url: d + "/api/v1/outbound/" + a + "/createTaskDataWithKeyValue",
                        data: JSON.stringify(n),
                        success: function (e) {
                            s(0 == e.code, e.messageExt || e.message)
                        },
                        error: function (e) {
                            s(!1, 503 == e.status ? "您的体验过于频繁，请稍后再试" : "验证不成功，请重新获取验证")
                        }
                    })
                }(u, i, function (e, t) {
                    h.removeClass("disabled"), e ? (p.addClass("hidden"), f.removeClass("hidden")) : l.text(t).removeClass("vhidden")
                })
            })))
        })
    })
}, function (e, t, s) {
}]);