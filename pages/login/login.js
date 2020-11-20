getApp();

Page({
    data: {
        staticImgUrl: "",
        imgwidth1: 0,
        imgheight1: 0
    },
    onLoad: function(t) {
        var i = this, a = getApp().d.staticImgUrl;
        i.setData({
            staticImgUrl: a
        });
    },
    bindGetUserInfo: function(t) {
        console.log(t.detail.userInfo), t.detail.userInfo ? wx.switchTab({
            url: "../index/index"
        }) : wx.showToast({
            title: "为了您更好的体验,请先同意授权",
            icon: "none",
            duration: 2e3
        });
    },
    imageLoads: function(t) {
        var i = t.detail.width, a = .9 * i, e = a / (i / t.detail.height);
        this.setData({
            imgwidth1: a,
            imgheight1: e
        });
    },
    goback: function() {
        wx.navigateBack({
            delta: 1
        });
    }
});