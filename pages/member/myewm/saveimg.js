Page({
    data: {
        hidden: !0,
        imgurls: ""
    },
    onLoad: function(o) {
        var n = this, t = wx.getStorageSync("imgurls");
        wx.getStorageSync("hidden");
        n.setData({
            imgurls: t,
            hidden: !1
        });
    },
    save: function() {
        wx.getSetting({
            success: function(o) {
                o.authSetting["scope.writePhotosAlbum"] || wx.authorize({
                    scope: "scope.writePhotosAlbum",
                    success: function() {
                        console.log("授权成功");
                    }
                });
            }
        }), console.log("123");
        var o = this;
        wx.saveImageToPhotosAlbum({
            filePath: o.data.imgurls,
            success: function(n) {
                wx.showModal({
                    content: "图片已保存到相册",
                    showCancel: !1,
                    confirmText: "好的",
                    success: function(n) {
                        n.confirm && (console.log("用户确定了"), o.setData({
                            hidden: !0
                        }), wx.navigateBack({
                            delta: 2
                        }));
                    }
                });
            }
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {}
});