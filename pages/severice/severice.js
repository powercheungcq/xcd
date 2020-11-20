function e(e, t, a) {
    return t in e ? Object.defineProperty(e, t, {
        value: a,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = a, e;
}

var t, a = getApp();

new Array();

Page((t = {
    data: {
        carlist: [],
        otherlist: [],
        orderlist: [],
        cardetails: [],
        severicedetails: [],
        severlist: [],
        count: "",
        price: "",
        orderid: "",
        yhprice: "",
        formData: {},
        sevlist: {},
        threetimes_coupon_price: 0,
        coupon_info: "",
        coupon_id: 0,
        btnDisabled: !1,
        paytype: "weixin",
        userInfo: [],
        carnumber: "",
        isnow: 0,
        weiyi: 0
    },
    onLoad: function(e) {
        this.getcount(), this.getDateStr(null, 1), this.getorder(), this.getfxsy(), this.getDatejt(null, 1), 
        this.getcarinfo(), console.log(getApp().globalData);
        wx.getStorageSync("opid");
        var t = a.d.userInfo;
        this.setData({
            price: e.couponsPrice1,
            yhprice: e.yhprice,
            orderid: e.id,
            userInfo: t
        });
        var o = this;
        wx.getStorage({
            key: "formData",
            success: function(e) {
                o.setData({
                    coupon_id: e.data.coupon_log_id,
                    coupon_price: e.data.coupon_price
                }), o.getcouponinfo(), console.log(" res.data.coupon_log_id" + e.data.coupon_log_id), 
                wx.setStorageSync("formdataprice", "" + e.data.totalPrice);
                var t = o.data.price;
                t ? o.setData({
                    zfprice: t
                }) : o.setData({
                    zfprice: e.data.endprice,
                    jiage: e.data.endprice
                }), o.setData({
                    formData: e.data
                });
            }
        }), wx.getStorage({
            key: "carlist",
            success: function(e) {
                console.log(e.data), o.setData({
                    carlist: e.data
                });
            }
        });
        var i = wx.getStorageSync("serviceName"), n = wx.getStorageSync("isnow");
        if (console.log(n), 0 == n) r = "当天服务";
        if (1 == n) var r = "次日服务";
        o.setData({
            serviceName: i,
            fuwu: r
        }), wx.getStorage({
            key: "slist",
            success: function(e) {
                if (console.log(e.data), "" !== e.data) {
                    var t = e.data.join(",");
                    o.setData({
                        sevlist: t
                    });
                } else o.setData({
                    sevlist: ""
                });
            }
        }), wx.getStorage({
            key: "otherlist",
            success: function(e) {
                console.log(e.data), o.setData({
                    otherlist: e.data
                });
            }
        }), wx.getStorage({
            key: "severlist",
            success: function(e) {
                console.log(e.data), o.setData({
                    severlist: e.data
                });
            }
        }), wx.getStorage({
            key: "gdseverlist",
            success: function(e) {
                console.log(e.data), o.setData({
                    gdseverlist: e.data
                });
            }
        });
    },
    washbtn: function(e) {
        var t = this;
        console.log(e.detail.value[0]);
        var a = e.detail.value[0], o = t.data.zfprice;
        if (1 == a) if (o > t.data.kyye) {
            var i = o - t.data.kyye;
            t.setData({
                jiage: i
            });
        } else t.setData({
            jiage: 0
        }); else t.setData({
            jiage: t.data.zfprice
        });
        t.setData({
            isfx: e.detail.value
        });
    },
    getcouponinfo: function(e) {
        var t = this, a = wx.getStorageSync("opid"), o = wx.getStorageSync("cityid");
        wx.request({
            url: "https://www.smxic.com/index.php/wxpay/coupon/get_coupon_info",
            data: {
                openid: a,
                cityid: o,
                coupon_id: t.data.coupon_id
            },
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            method: "POST",
            success: function(e) {
                t.setData({
                    coupon_info: e.data.response.data.coupon_info,
                    threetimes_coupon_price: e.data.response.data.threetimes_coupon_price,
                    zfprice: t.data.zfprice - e.data.response.data.threetimes_coupon_price < 0 ? 0 : t.data.zfprice - e.data.response.data.threetimes_coupon_price,
                    jiage: t.data.zfprice - e.data.response.data.threetimes_coupon_price < 0 ? 0 : t.data.zfprice - e.data.response.data.threetimes_coupon_price
                });
            },
            fail: function(e) {},
            complete: function() {}
        });
    },
    getfxsy: function(e) {
        var t = this, a = wx.getStorageSync("opid");
        wx.request({
            url: "https://www.smxic.com/index.php/order/caiwu/csfenxianshouyi1?openid=" + a,
            data: {},
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            method: "POST",
            success: function(e) {
                console.log(e.data.ksy), t.setData({
                    kyye: e.data.ksy
                });
            },
            fail: function(e) {},
            complete: function() {}
        });
    },
    getcarinfo: function() {
        var e = this, t = wx.getStorageSync("carid");
        wx.request({
            url: "https://www.smxic.com/index.php/order/caiwu/carinfo?carid=" + t,
            data: {},
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            method: "POST",
            success: function(t) {
                console.log(t.data[0]);
                var a = t.data[0];
                e.setData({
                    carbrand: a.carBrand,
                    color: a.carColor,
                    carnum: a.carNumber
                });
            },
            fail: function(e) {},
            complete: function() {}
        });
    },
    createProductOrderByWX: function(e) {
        console.log(e);
        var t = this;
        wx.requestSubscribeMessage({
            tmplIds: [ "kIApEvPR2z7A37kbdlf3uY1bNqZVEN_shnj5tJ0cfrw", "NkpSWaNgcNFdvQFmfDps5IC5SgxF1bSZidhkFqMCs2c", "fWPZgnl8No1WqhuNEaTU1SUUqK5JW5udWr3Fx1OonBo" ],
            success: function(e) {
                var a = JSON.stringify(e);
                console.log(a), "accept" !== e.kIApEvPR2z7A37kbdlf3uY1bNqZVEN_shnj5tJ0cfrw && "accept" !== e.NkpSWaNgcNFdvQFmfDps5IC5SgxF1bSZidhkFqMCs2c && "accept" !== e.fWPZgnl8No1WqhuNEaTU1SUUqK5JW5udWr3Fx1OonBo || (t.setData({
                    paytype: "weixin"
                }), console.log(t.data.weiyi), 0 == t.data.weiyi && t.createProductOrder(), 1 == t.data.weiyi && (1 == t.data.isfx ? t.wxfxpay() : t.wxpay()));
            },
            fail: function(e) {
                console.error(e);
            }
        });
    },
    createProductOrderByXX: function(e) {
        return this.setData({
            paytype: "cash"
        }), wx.showToast({
            title: "线下支付开通中，敬请期待!",
            duration: 3e3
        }), !1;
    },
    createProductOrder: function() {
        this.setData({
            btnDisabled: !1
        });
        var e = this;
        if (e.data.yhprice) t = 1; else var t = 0;
        getApp().globalData.userInfo.id;
        var a = wx.getStorageSync("severiceId"), o = wx.getStorageSync("isnow"), i = (wx.getStorageSync("otherId"), 
        wx.getStorageSync("othersever")), n = wx.getStorageSync("longitude"), r = wx.getStorageSync("latitude"), c = wx.getStorageSync("formdata"), s = wx.getStorageSync("isvip"), d = e.data.zfprice, p = wx.getStorageSync("carid"), l = e.data.sevlist;
        console.log(p);
        var u = e.data.carbrand, w = e.data.color, g = e.data.carnum, f = e.data.coupon_id, x = e.data.coupon_price, y = e.data.threetimes_coupon_price, h = JSON.parse(c);
        console.log(h);
        var m = getApp().globalData.userInfo.openid, S = e.data.paytype;
        wx.request({
            url: "https://www.smxic.com/index.php/sample/newac/adds?severid=" + a + "&othersever=" + i + "&openid=" + m + "&type=" + S + "&carid=" + p + "&finorderprice=" + d + "&iscode=" + t + "&isnow=" + o + "&latitude=" + r + "&longitude=" + n + "&sevlist=" + l + "&carbrand=" + u + "&color=" + w + "&carnum=" + g + "&isvip=" + s + "&coupon_id=" + f + "&coupon_price=" + x + "&three=" + y,
            method: "post",
            async: !0,
            data: h,
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            success: function(t) {
                var a = t.data;
                if (1 == a.status) {
                    if ("cash" == a.arr.pay_type) return wx.showToast({
                        title: "请自行联系商家进行发货!",
                        duration: 3e3
                    }), !1;
                    "weixin" == a.arr.pay_type && (e.setData({
                        backid: a.arr.order_id
                    }), e.setData({
                        weiyi: 1
                    }), 1 == e.data.isfx ? e.wxfxpay(a.arr) : e.wxpay(a.arr));
                } else wx.showToast({
                    title: "订单信息有误，请重新下单!",
                    icon: "none",
                    duration: 2500
                });
            },
            fail: function(e) {
                wx.showToast({
                    title: "网络异常！err:createProductOrder",
                    duration: 2e3
                });
            }
        });
    },
    wxpay: function() {
        var e = this, t = getApp().globalData.userInfo.id;
        console.log(e.data.backid), wx.request({
            url: "https://www.smxic.com/index.php/wxpay/cswxpay/wxpay",
            data: {
                order_id: e.data.backid,
                uid: t
            },
            method: "POST",
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            success: function(t) {
                if (1 == t.data.status) {
                    var a = t.data.arr;
                    console.log(a), wx.setStorageSync("package", "" + a.package);
                    var o = wx.getStorageSync("package");
                    console.log(o), wx.requestPayment({
                        timeStamp: a.timeStamp,
                        nonceStr: a.nonceStr,
                        package: a.package,
                        signType: "MD5",
                        paySign: a.paySign,
                        success: function(t) {
                            var o = e.data.backid;
                            wx.request({
                                url: "https://www.smxic.com/index.php/sample/Xrhp/paystates?orderid=" + o,
                                method: "post",
                                async: !0,
                                data: {
                                    order_id: a.order_id
                                },
                                header: {
                                    "Content-Type": "application/x-www-form-urlencoded"
                                },
                                success: function(t) {
                                    var a = t.data;
                                    if (console.log(a), 1 == a.status) {
                                        wx.showToast({
                                            title: "支付成功!",
                                            duration: 2e3
                                        }), setTimeout(function() {
                                            wx.switchTab({
                                                url: "../orderlist/category"
                                            });
                                        }, 2500);
                                        var o = wx.getStorageSync("package").substring(10, 47), i = getApp().globalData.userInfo.openid, n = e.data.backid;
                                        console.log(o), console.log(i);
                                        wx.request({
                                            url: "https://www.smxic.com/index.php/wxpay/Sendinfo/send_msg?prepayId=" + o + "&openid=" + i + "&orid=" + n,
                                            async: !0,
                                            data: {},
                                            method: "POST",
                                            header: {
                                                "Content-type": "application/json"
                                            },
                                            success: function(e) {
                                                console.log(e.data);
                                            },
                                            fail: function(e) {
                                                console.log(e);
                                            }
                                        });
                                    } else wx.showToast({
                                        title: "订单异常!",
                                        duration: 2e3
                                    });
                                }
                            });
                        },
                        fail: function(e) {
                            wx.showToast({
                                title: "未支付！",
                                duration: 1e3
                            });
                        }
                    });
                } else wx.showToast({
                    title: "支付失败",
                    duration: 2e3
                });
            },
            fail: function() {
                wx.showToast({
                    title: "网络异常！err:wxpay",
                    duration: 2e3
                });
            }
        });
    },
    wxfxpay: function() {
        var e = this;
        if (e.data.zfprice > e.data.kyye) {
            t = e.data.zfprice - e.data.kyye;
            e.setData({
                fxprice: t
            }), e.fxpay();
        }
        if (e.data.zfprice <= e.data.kyye) {
            var t = e.data.kyye - e.data.zfprice;
            e.setData({
                fxprice: t
            }), e.directpay();
        }
    },
    fxpay: function() {
        var e = this, t = getApp().globalData.userInfo.id;
        console.log(e.data.backid);
        var a = e.data.fxprice;
        console.log(a), wx.request({
            url: "https://www.smxic.com/index.php/wxpay/Hunhewxpay/wxpay",
            data: {
                order_id: e.data.backid,
                uid: t,
                price: a
            },
            method: "POST",
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            success: function(t) {
                if (1 == t.data.status) {
                    var a = t.data.arr;
                    console.log(a), wx.setStorageSync("package", "" + a.package);
                    var o = wx.getStorageSync("package");
                    console.log(o), wx.requestPayment({
                        timeStamp: a.timeStamp,
                        nonceStr: a.nonceStr,
                        package: a.package,
                        signType: "MD5",
                        paySign: a.paySign,
                        success: function(t) {
                            var o = e.data.backid;
                            wx.request({
                                url: "https://www.smxic.com/index.php/sample/Xrhp/paystates?orderid=" + o,
                                method: "post",
                                async: !0,
                                data: {
                                    order_id: a.order_id
                                },
                                header: {
                                    "Content-Type": "application/x-www-form-urlencoded"
                                },
                                success: function(t) {
                                    var a = t.data;
                                    if (console.log(a), 1 == a.status) {
                                        wx.showToast({
                                            title: "支付成功!",
                                            duration: 2e3
                                        }), setTimeout(function() {
                                            wx.switchTab({
                                                url: "../orderlist/category"
                                            });
                                        }, 2500);
                                        var o = wx.getStorageSync("package").substring(10, 47), i = getApp().globalData.userInfo.openid, n = e.data.backid;
                                        console.log(o), console.log(i);
                                        wx.request({
                                            url: "https://www.smxic.com/index.php/wxpay/Sendinfo/send_msg?prepayId=" + o + "&openid=" + i + "&orid=" + n,
                                            async: !0,
                                            data: {},
                                            method: "POST",
                                            header: {
                                                "Content-type": "application/json"
                                            },
                                            success: function(e) {
                                                console.log(e.data);
                                            },
                                            fail: function(e) {
                                                console.log(e);
                                            }
                                        });
                                    } else wx.showToast({
                                        title: "订单异常!",
                                        duration: 2e3
                                    });
                                }
                            });
                        },
                        fail: function(e) {
                            wx.showToast({
                                title: "未支付！",
                                duration: 1e3
                            });
                        }
                    });
                } else wx.showToast({
                    title: "支付失败",
                    duration: 2e3
                });
            },
            fail: function() {
                wx.showToast({
                    title: "网络异常！err:wxpay",
                    duration: 2e3
                });
            }
        });
    },
    directpay: function() {
        var e = this, t = getApp().globalData.userInfo.id;
        console.log(e.data.backid);
        var a = e.data.fxprice;
        console.log(a), wx.request({
            url: "https://www.smxic.com/index.php/order/cugx/directpay",
            data: {
                order_id: e.data.backid,
                uid: t,
                price: a
            },
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            method: "POST",
            success: function(t) {
                var a = wx.getStorageSync("opid");
                wx.request({
                    url: "https://www.smxic.com/index.php/wxpay/Sendinfo/send_msg2?openid=" + a + "&orid=" + e.data.backid,
                    async: !0,
                    data: {},
                    method: "POST",
                    header: {
                        "Content-type": "application/json"
                    },
                    success: function(e) {
                        console.log(e.data);
                    },
                    fail: function(e) {
                        console.log(e);
                    }
                }), wx.showToast({
                    title: "支付成功!",
                    duration: 2e3
                }), setTimeout(function() {
                    wx.switchTab({
                        url: "../orderlist/category"
                    });
                }, 2500);
            },
            fail: function(e) {},
            complete: function() {}
        });
    },
    getcount: function() {
        var e = this, t = wx.getStorageSync("opid");
        wx.request({
            url: "https://www.smxic.com/index.php/getdata/get/severice?openid=" + t,
            data: {},
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            method: "POST",
            success: function(t) {
                console.log(t.data), e.setData({
                    count: t.data
                });
            },
            fail: function(e) {},
            complete: function() {}
        });
    },
    getorder: function() {
        var e = this, t = wx.getStorageSync("carid");
        wx.request({
            url: "https://www.smxic.com/index.php/order/order/payment?id=" + t,
            async: !0,
            data: {},
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            method: "POST",
            success: function(t) {
                console.log(t.data), e.setData({
                    orderlist: t.data
                });
            },
            fail: function(e) {},
            complete: function() {}
        });
    },
    toMyPackage: function() {
        this.data.yhprice ? wx.showToast({
            title: "当前订单已使用过优惠券！",
            icon: "none",
            duration: 2e3
        }) : wx.navigateTo({
            url: "../member/preferential/preferential?id=2"
        });
    },
    bindTimeChange: function(e) {
        console.log("picker发送选择改变，携带值为", e.detail.value), this.setData({
            time: e.detail.value
        });
    },
    submitOrder: function() {
        wx.requestPayment({
            timeStamp: "",
            nonceStr: "",
            package: "",
            signType: "MD5",
            paySign: "",
            success: function(e) {},
            fail: function(e) {}
        });
    }
}, e(t, "submitOrder", function() {
    wx.showModal({
        title: "提示",
        content: "支付系统暂时未开通",
        complete: function() {
            wx.switchTab({
                url: "../orderlist/category"
            });
        }
    });
}), e(t, "freepay", function() {
    var e = this;
    if (e.data.yhprice) t = 1; else var t = 0;
    var a = wx.getStorageSync("severiceId"), o = (wx.getStorageSync("otherId"), wx.getStorageSync("othersever"));
    console.log(o);
    var i = wx.getStorageSync("formdata"), n = wx.getStorageSync("carnumber"), r = e.data.zfprice, c = wx.getStorageSync("carid");
    console.log(c);
    var s = JSON.parse(i);
    console.log(s);
    var d = getApp().globalData.userInfo.openid, p = e.data.paytype;
    console.log("wf" + d), wx.request({
        url: "https://www.smxic.com/index.php/sample/test/freeadds?severid=" + a + "&othersever=" + o + "&openid=" + d + "&type=" + p + "&carid=" + c + "&finorderprice=" + r + "&iscode=" + t + "&cum=" + n,
        method: "post",
        async: !0,
        data: s,
        header: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        success: function(t) {
            var a = t.data;
            1 == a.status ? ("cash" == a.arr.pay_type && (wx.showToast({
                title: "免费洗车成功!",
                duration: 1e3
            }), setTimeout(function() {
                wx.switchTab({
                    url: "../orderlist/category"
                });
            }, 1e3)), "weixin" == a.arr.pay_type && e.wxpay(a.arr)) : wx.showToast({
                title: "下单失败!",
                icon: "none",
                duration: 2500
            });
        },
        fail: function(e) {
            wx.showToast({
                title: "网络异常！err:createProductOrder",
                duration: 2e3
            });
        }
    });
}), e(t, "getDateStr", function(e, t) {
    var a, o = this;
    (a = e ? new Date(e) : new Date()).setDate(a.getDate() + t);
    var i = a.getFullYear(), n = a.getMonth() + 1, r = a.getDate();
    n < 10 && (n = "0" + n), r < 10 && (r = "0" + r), console.log(i + "-" + n + "-" + r);
    var c = i + "-" + n + "-" + r;
    console.log(c), o.setData({
        ming: n + "-" + r
    });
}), e(t, "getDatejt", function(e, t) {
    var a, o = this;
    (a = e ? new Date(e) : new Date()).setDate(a.getDate() + t);
    var i = a.getFullYear(), n = a.getMonth() + 1, r = a.getDate() - 1;
    n < 10 && (n = "0" + n), r < 10 && (r = "0" + r), console.log(i + "-" + n + "-" + r);
    var c = i + "-" + n + "-" + r;
    console.log(c), o.setData({
        jintian: n + "-" + r
    });
}), t));