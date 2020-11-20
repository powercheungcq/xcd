function t(t, e, a) {
    return e in t ? Object.defineProperty(t, e, {
        value: a,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[e] = a, t;
}

var e;

getApp();

Page((e = {
    data: {
        carlist: [],
        orderlist: [],
        cardetails: [],
        count: "",
        price: "",
        orderid: "",
        btnDisabled: !1,
        paytype: "weixin"
    },
    onLoad: function(t) {
        this.getdata(), this.getcount(), this.getorder(), this.getcar(), this.setData({
            yhprice: t.yhprice,
            price: t.couponsPrice1,
            orderid: t.id
        });
    },
    getdata: function() {
        var t = this;
        wx.request({
            url: "https://www.smxic.com/index.php/getdata/get/get",
            data: {},
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            method: "POST",
            success: function(e) {
                console.log(e.data), t.setData({
                    carlist: e.data
                });
            },
            fail: function(t) {},
            complete: function() {}
        });
    },
    getcount: function() {
        var t = this, e = wx.getStorageSync("opid");
        wx.request({
            url: "https://www.smxic.com/index.php/getdata/get/severice?openid=" + e,
            data: {},
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            method: "POST",
            success: function(e) {
                console.log(e.data), t.setData({
                    count: e.data
                });
            },
            fail: function(t) {},
            complete: function() {}
        });
    },
    getorder: function() {
        var t = this, e = wx.getStorageSync("carid");
        console.log(e), wx.request({
            url: "https://www.smxic.com/index.php/order/order/payment?id=" + e,
            async: !0,
            data: {},
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            method: "POST",
            success: function(e) {
                console.log(e.data), t.setData({
                    orderlist: e.data,
                    iscode: e.data[0].iscode
                });
            },
            fail: function(t) {},
            complete: function() {}
        });
    },
    getcar: function() {
        var t = this, e = wx.getStorageSync("carid");
        console.log(e), wx.request({
            url: "https://www.smxic.com/index.php/getdata/get/getcar?id=" + e,
            data: {},
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            method: "POST",
            success: function(e) {
                console.log(e.data), t.setData({
                    cardetails: e.data
                });
            },
            fail: function(t) {},
            complete: function() {}
        });
    },
    toMyPackage: function() {
        this.data.iscode ? wx.showToast({
            title: "当前订单已使用过优惠券，不能再次使用",
            icon: "none",
            duration: 2e3
        }) : wx.navigateTo({
            url: "../member/preferential/orderpreferential?id=2"
        });
    },
    bindTimeChange: function(t) {
        console.log("picker发送选择改变，携带值为", t.detail.value), this.setData({
            time: t.detail.value
        });
    },
    submitOrder: function() {
        wx.requestPayment({
            timeStamp: "",
            nonceStr: "",
            package: "",
            signType: "MD5",
            paySign: "",
            success: function(t) {},
            fail: function(t) {}
        });
    }
}, t(e, "submitOrder", function() {
    wx.showModal({
        title: "提示",
        content: "支付系统暂时未开通",
        complete: function() {
            wx.switchTab({
                url: "../category/category"
            });
        }
    });
}), t(e, "createProductOrderByWX", function(t) {
    this.setData({
        paytype: "weixin"
    }), this.createProductOrder();
}), t(e, "createProductOrderByXX", function(t) {
    return this.setData({
        paytype: "cash"
    }), wx.showToast({
        title: "线下支付开通中，敬请期待!",
        duration: 3e3
    }), !1;
}), t(e, "createProductOrder", function() {
    this.setData({
        btnDisabled: !1
    });
    var t = this, e = wx.getStorageSync("carid");
    console.log(e), wx.request({
        url: "https://www.smxic.com/index.php/sample/test/chaxun?orderid=" + e,
        method: "post",
        async: !0,
        data: "",
        header: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        success: function(e) {
            var a = e.data;
            if (1 == a.status) {
                if ("cash" == a.arr.pay_type) return wx.showToast({
                    title: "请自行联系商家进行发货!",
                    duration: 3e3
                }), !1;
                "weixin" == a.arr.pay_type && t.wxpay(a.arr);
            } else wx.showToast({
                title: "下单失败!",
                icon: "none",
                duration: 2500
            });
        },
        fail: function(t) {
            wx.showToast({
                title: "网络异常！err:createProductOrder",
                duration: 2e3
            });
        }
    });
}), t(e, "wxpay", function(t) {
    var e = getApp().globalData.userInfo.id;
    wx.setStorageSync("orid", "" + t.order_id), wx.request({
        url: "https://www.smxic.com/index.php/wxpay/Wxpay/wxpay",
        data: {
            order_id: t.order_id,
            order_sn: t.order_sn,
            uid: e
        },
        method: "POST",
        header: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        success: function(t) {
            if (1 == t.data.status) {
                var e = t.data.arr;
                console.log(e), wx.setStorageSync("package", "" + e.package);
                var a = wx.getStorageSync("package");
                console.log(a), wx.requestPayment({
                    timeStamp: e.timeStamp,
                    nonceStr: e.nonceStr,
                    package: e.package,
                    signType: "MD5",
                    paySign: e.paySign,
                    success: function(t) {
                        n = wx.getStorageSync("orid");
                        wx.request({
                            url: "https://www.smxic.com/index.php/sample/testcs/againpaystate?orderid=" + n,
                            method: "post",
                            async: !0,
                            data: {
                                order_id: e.order_id
                            },
                            header: {
                                "Content-Type": "application/x-www-form-urlencoded"
                            },
                            success: function(t) {
                                var e = t.data;
                                console.log(e);
                            }
                        });
                        var a = wx.getStorageSync("package").substring(10, 47), o = getApp().globalData.userInfo.openid, n = wx.getStorageSync("orid");
                        console.log(a), console.log(o);
                        wx.request({
                            url: "https://www.smxic.com/index.php/wxpay/Sendinfo/send_msg?prepayId=" + a + "&openid=" + o + "&orid=" + n,
                            async: !0,
                            data: {},
                            method: "POST",
                            header: {
                                "Content-type": "application/json"
                            },
                            success: function(t) {
                                console.log(t.data);
                            },
                            fail: function(t) {
                                console.log(t);
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
                    fail: function(t) {
                        wx.showToast({
                            title: t,
                            duration: 3e3
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
}), e));