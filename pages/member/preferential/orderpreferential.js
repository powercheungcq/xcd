getApp();

var t = "";

Page({
    data: {
        arr: [],
        arrs: [],
        getid: "",
        price: ""
    },
    onLoad: function(t) {
        this.getdata(), this.getseverice(), this.setData({
            getid: t.id
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
        wx.request({
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
    reductionbtn: function(e) {
        var a = this;
        t = e.target.dataset.id;
        var o = wx.getStorageSync("carid");
        console.log(t), console.log(o), wx.request({
            url: "https://www.smxic.com/index.php/getdata/get/orderpreferential?cid=cid",
            async: !0,
            data: {
                id: t,
                cid: o
            },
            header: {
                "Content-Type": "application/json"
            },
            method: "GET",
            success: function(t) {
                console.log(t.data);
                var e = t.data, o = t.data.bb;
                1 == t.data.status && (wx.showToast({
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
                    url: "/pages/severice/orderseverice?couponsPrice1=" + e + "&yhprice=" + o
                });
            },
            fail: function(t) {},
            complete: function() {}
        });
    }
});