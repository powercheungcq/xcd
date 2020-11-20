Page({
    data: {},
    onLoad: function(n) {
        this.getbanben();
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {},
    getStorag: function() {
        var n = wx.getStorageSync("login");
        return {
            sdk: n.sdk,
            uid: n.uid
        };
    },
    getbanben: function() {
        var n = this;
        wx.request({
            url: "https://www.smxic.com/index.php/order/cssy/getbanebn",
            data: {},
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            method: "POST",
            success: function(t) {
                console.log(t.data.status), n.setData({
                    banebn: t.data.status
                });
            },
            fail: function(n) {},
            complete: function() {}
        });
    },
    quitFn: function() {
        Utils.removeStorage("Reset");
        var n = this.getStorag();
        Utils.requestFn({
            url: "/index.php/loginOut?server=1",
            method: "POST",
            data: {
                sdk: n.sdk,
                uid: n.uid
            },
            success: function(n) {
                return n.data.status ? (wx.reLaunch({
                    url: "/pages/login/login"
                }), Utils.removeStorage("login")) : (Utils.reLaunch(n.data.message, "/pages/login/login"), 
                Utils.removeStorage("login")), !1;
            }
        });
    }
});