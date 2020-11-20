Page({
    data: {},
    onLoad: function(n) {
        this.getmysy();
    },
    sortByKey: function(n, t) {
        return n.sort(function(n, o) {
            var e = n[t], i = o[t];
            return e > i ? -1 : e < i ? 1 : 0;
        });
    },
    extend: function(n, t) {
        for (var o in t) n[o] = t[o];
        return n;
    },
    getmysy: function() {
        var n = this, t = wx.getStorageSync("opid");
        wx.request({
            url: "https://www.smxic.com/index.php/order/caiwu/csgetmysy?openid=" + t,
            data: {},
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            method: "POST",
            success: function(t) {
                t.data;
                n.setData({
                    mysylist: t.data.arr,
                    myczlist: t.data.selects,
                    sy: t.data.sy
                });
            },
            fail: function(n) {},
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
    tixian: function(n) {
        wx.showToast({
            title: "建设中...",
            icon: "none",
            duration: 2e3
        });
    }
});