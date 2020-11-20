require("../../../utils/util.js");

Page({
    data: {
        hidden: !0,
        img: "",
        shareImg: "",
        code: "",
        title: "",
        imgs: "",
        imgUrl: "",
        imgurls: "",
        time: "",
        bgimg: ""
    },
    onLoad: function(t) {
        this.getewm(), this.generate(), this.getImg(), console.log("123");
    },
    onReady: function() {},
    onShow: function() {
        var t = this;
        wx.showLoading({
            title: "加载中...",
            duration: 2e3
        }), setTimeout(function() {
            t.getewm();
        }, 2e3);
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {},
    generate: function(t) {
        var e = wx.getStorageSync("opid");
        wx.request({
            url: "https://www.smxic.com/index.php/getdata/userewm/qrcode?openid=" + e,
            data: {},
            header: {
                "Content-Type": "application/json"
            },
            method: "GET",
            success: function(t) {},
            fail: function(t) {},
            complete: function() {}
        });
    },
    getewm: function(t) {
        var e = this, n = wx.getStorageSync("opid");
        wx.request({
            url: "https://www.smxic.com/index.php/getdata/get/userewm?openid=" + n,
            data: {},
            header: {
                "Content-Type": "application/json"
            },
            method: "GET",
            success: function(t) {
                function n(t) {
                    return function() {
                        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                        return new Promise(function(n, o) {
                            e.success = function(t) {
                                n(t);
                            }, e.fail = function(t) {
                                o(t);
                            }, t(e);
                        });
                    };
                }
                console.log(t.data), e.setData({
                    img: t.data
                });
                var o;
                wx.getSystemInfo({
                    success: function(t) {
                        o = t.windowWidth / 375;
                    }
                }), module.exports = {
                    wxPromisify: n
                };
                var a = n(wx.getImageInfo);
                Promise.all([ a({
                    src: "https://www.smxic.com/uploads/" + e.data.bgimg
                }), a({
                    src: "https://www.smxic.com/" + t.data
                }) ]).then(function(t) {
                    var e = wx.createCanvasContext("shareCanvas");
                    e.drawImage(t[0].path, 0, 0, 360 * o, 550 * o), e.setTextAlign("center"), e.setFillStyle("#000000"), 
                    e.setFontSize(22), e.fillText("", 200 * o, 350 * o);
                    var n = 80 * o;
                    e.drawImage(t[1].path, (630 - n) / 2 * o, 450 * o, n, 90 * o), e.restore(), e.draw();
                });
            },
            fail: function(t) {},
            complete: function() {}
        });
    },
    share_quan: function() {
        var t = this;
        wx.showLoading({
            title: "图片正在生成中..."
        }), setTimeout(function() {
            wx.canvasToTempFilePath({
                canvasId: "shareCanvas",
                fileType: "jpg",
                success: function(e) {
                    wx.setStorageSync("imgurls", e.tempFilePath), wx.setStorageSync("hidden", !1), t.setData({
                        imgurls: e.tempFilePath,
                        hidden: !1
                    }), wx.hideLoading(), wx.navigateTo({
                        url: "saveimg"
                    });
                },
                fail: function() {
                    console.log("保存失败......");
                }
            });
        }, 2e3);
    },
    getImg: function() {
        var t = this;
        wx.request({
            url: "https://www.smxic.com/index.php/getdata/get/getbg",
            data: {},
            async: !0,
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            method: "POST",
            success: function(e) {
                console.log(e.data);
                e.data.otherSever;
                t.setData({
                    bgimg: e.data
                });
            },
            fail: function(t) {},
            complete: function() {}
        });
    }
});