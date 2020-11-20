getApp();

var t = "";

Page({
    data: {
        comp: [],
        arr: [],
        arrs: [],
        getid: "",
        price: "",
        formData: {}
    },
    onLoad: function(t) {
        this.getdata(), this.getseverice(), this.getcomp(), this.setData({
            getid: t.id
        });
        var e = this;
        wx.getStorage({
            key: "formData",
            success: function(t) {
                console.log(t.data), e.setData({
                    formData: t.data
                });
            }
        });
        var a = wx.getStorageSync("unionid"), o = wx.getStorageSync("opid");
        console.log(a), wx.request({
            url: "https://www.smxic.com/index.php/voucher/Jssdk/getUserCard",
            method: "POST",
            data: {
                unionid: a,
                openid: o
            },
            header: {
                "content-type": "application/json"
            },
            success: function(t) {
                console.log(t.data.cardext);
            }
        });
    },
    getdata: function() {
        var t = this;
        wx.request({
            url: "https://www.smxic.com/index.php/getdata/get/reduction",
            data: {},
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            method: "POST",
            success: function(e) {
                console.log(e.data), t.setData({
                    arr: e.data
                });
            },
            fail: function(t) {},
            complete: function() {}
        });
    },
    getseverice: function() {
        var t = this, e = wx.getStorageSync("opid");
        console.log(e), wx.request({
            url: "https://www.smxic.com/index.php/getdata/get/serviceReduction?openid=" + e,
            data: {
                openid: e
            },
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            method: "POST",
            success: function(e) {
                console.log(e.data), t.setData({
                    arrs: e.data
                });
            },
            fail: function(t) {},
            complete: function() {}
        });
    },
    getcomp: function() {
        var t = this;
        wx.request({
            url: "https://www.smxic.com/index.php/getdata/get/comReduction",
            data: {},
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            method: "POST",
            success: function(e) {
                console.log(e.data), t.setData({
                    comp: e.data
                });
            },
            fail: function(t) {},
            complete: function() {}
        });
    },
    reductionbtn: function(e) {
        var a = this;
        t = e.target.dataset.id;
        var o = wx.getStorageSync("opid"), n = wx.getStorageSync("formdataprice");
        console.log(t), wx.request({
            url: "https://www.smxic.com/index.php/getdata/get/cspreferential",
            async: !0,
            data: {
                id: t,
                openid: o,
                formdataprice: n
            },
            header: {
                "Content-Type": "application/json"
            },
            method: "GET",
            success: function(t) {
                console.log(t.data.aa);
                var e = t.data.aa, o = t.data.bb;
                wx.setStorageSync("finprice", "" + t.data.aa), 1 == t.data.status && (wx.showToast({
                    title: "当前订单不满足使用优惠券使用规则",
                    icon: "none",
                    duration: 2e3
                }), setTimeout(function() {
                    wx.navigateBack({
                        detal: 1
                    });
                }, 2e3)), 3 == t.data.status && (wx.showToast({
                    title: "当前优惠券已过期，无法使用",
                    icon: "none",
                    duration: 2e3
                }), setTimeout(function() {
                    wx.navigateBack({
                        detal: 1
                    });
                }, 2e3)), a.setData({
                    price: t.data
                }), 2 == t.data.status && wx.navigateTo({
                    url: "/pages/severice/severice?couponsPrice1=" + e + "&yhprice=" + o
                });
            },
            fail: function(t) {},
            complete: function() {}
        });
    }
});