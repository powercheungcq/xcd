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
        var t = this;
        wx.request({
            url: "https://www.smxic.com/index.php/getdata/get/serviceReduction",
            data: {},
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
        var o = wx.getStorageSync("shopid");
        console.log(t), wx.request({
            url: "https://www.smxic.com/index.php/shop/shop/preferential?cid=cid",
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
                var e = t.data;
                a.setData({
                    price: t.data
                }), wx.navigateTo({
                    url: "/pages/component/subOrder/shoporder?couponsPrice1=" + e
                });
            },
            fail: function(t) {},
            complete: function() {}
        });
    }
});