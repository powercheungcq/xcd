Page({
    data: {
        fxlist: {}
    },
    onLoad: function(t) {
        this.getfx(), this.getcount(), this.getid();
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    getfx: function(t) {
        var n = this, o = wx.getStorageSync("opid");
        wx.request({
            url: "https://www.smxic.com/index.php/order/cugx/myfan?openid=" + o,
            async: !0,
            data: {},
            header: {
                "Content-Type": "application/json"
            },
            method: "GET",
            success: function(t) {
                console.log(t.data), n.setData({
                    fxlist: t.data
                });
            },
            fail: function(t) {},
            complete: function() {}
        });
    },
    getid: function(t) {
        wx.getStorageSync("opid");
        wx.request({
            url: "https://www.smxic.com/index.php/order/cugx/getcwid",
            async: !0,
            data: {},
            header: {
                "Content-Type": "application/json"
            },
            method: "GET",
            success: function(t) {
                console.log(t.data);
            },
            fail: function(t) {},
            complete: function() {}
        });
    },
    getcount: function(t) {
        var n = this, o = wx.getStorageSync("opid");
        wx.request({
            url: "https://www.smxic.com/index.php/order/cugx/newcountmyfan?openid=" + o,
            async: !0,
            data: {},
            header: {
                "Content-Type": "application/json"
            },
            method: "GET",
            success: function(t) {
                console.log(t.data), n.setData({
                    count: t.data
                });
            },
            fail: function(t) {},
            complete: function() {}
        });
    },
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});