getApp();

Page({
    data: {
        shoplist: [],
        count: "",
        price: ""
    },
    onLoad: function(o) {
        this.getcount(), this.getshop(), this.setData({
            price: o.couponsPrice1
        });
    },
    getshop: function() {
        var o = this, t = wx.getStorageSync("shopid");
        wx.request({
            url: "https://www.smxic.com/index.php/shop/shop/payshop?id=" + t,
            async: !0,
            data: {},
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            method: "POST",
            success: function(t) {
                console.log(t.data), o.setData({
                    shoplist: t.data
                });
            },
            fail: function(o) {},
            complete: function() {}
        });
    },
    getcount: function() {
        var o = this;
        wx.request({
            url: "https://www.smxic.com/index.php/shop/shop/countshop",
            data: {},
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            method: "POST",
            success: function(t) {
                console.log(t.data), o.setData({
                    count: t.data
                });
            },
            fail: function(o) {},
            complete: function() {}
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {},
    homebtn: function() {
        wx.switchTab({
            url: "/pages/component/index"
        });
    },
    toMyPackage: function() {
        wx.navigateTo({
            url: "../../member/preferential/shoppreferential"
        });
    }
});