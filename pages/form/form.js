var o = getApp();

Page({
    data: {},
    onLoad: function(n) {
        var e = this;
        o.getUserInfo(function(o) {
            e.setData({
                userInfo: o,
                loadingHidden: !0,
                openid: o.openid
            }), console.log(o.openid), wx.setStorageSync("opid", "" + o.openid);
        }), e.loadOrderStatus();
    },
    formSubmit: function(o) {
        wx.getStorageSync("opid");
        console.log(o.detail.formId), wx.setStorageSync("formid", o.detail.formId), wx.navigateTo({
            url: "../web/web"
        });
    },
    onReady: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});