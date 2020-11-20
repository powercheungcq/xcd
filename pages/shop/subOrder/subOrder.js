Page({
    data: {
        shopOrder: [],
        count: "",
        price: ""
    },
    onLoad: function(t) {
        this.getdata(), this.getcount(), this.setData({
            price: t.couponsPrice1
        });
    },
    getdata: function() {
        var t = this;
        wx.request({
            url: "https://www.smxic.com/index.php/shop/shop/get",
            data: {},
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            method: "POST",
            success: function(n) {
                console.log(n.data), t.setData({
                    shopOrder: n.data
                });
            },
            fail: function(t) {},
            complete: function() {}
        });
    },
    getcount: function() {
        var t = this;
        wx.request({
            url: "https://www.smxic.com/index.php/shop/shop/countshop",
            data: {},
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            method: "POST",
            success: function(n) {
                console.log(n.data), t.setData({
                    count: n.data
                });
            },
            fail: function(t) {},
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
            url: "../../member/preferential/preferential?id=1"
        });
    }
});