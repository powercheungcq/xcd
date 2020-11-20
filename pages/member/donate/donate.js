getApp();

Page({
    data: {
        mytopup: "",
        secretflag: !1,
        inpval: ""
    },
    onLoad: function(t) {},
    onReady: function() {},
    copysecret: function(t) {
        wx.setClipboardData({
            data: t.currentTarget.dataset.checked,
            success: function(t) {
                console.log(t);
            }
        });
    },
    onShow: function() {
        this.toobtain();
    },
    toobtain: function() {
        var t = this, e = wx.getStorageSync("opid");
        wx.request({
            url: "https://www.smxic.com/index.php/card/Card/getmycard?openid=" + e,
            method: "POST",
            success: function(e) {
                t.setData({
                    mytopup: e.data.data
                });
            }
        });
    },
    checkboxChange: function(t) {
        var e = wx.getStorageSync("opid"), a = t.currentTarget.dataset.index, n = this.data.mytopup;
        0 == n[a].is_send ? n[a].is_send = 1 : n[a].is_send = 0, this.setData({
            mytopup: n
        }), wx.request({
            url: "https://www.smxic.com/index.php/card/Card/isSend?openid=" + e,
            method: "POST",
            data: {
                is_send: n[a].is_send,
                id: t.currentTarget.dataset.id
            },
            success: function(t) {
                console.log(t);
            }
        });
    },
    bindKeyInput: function(t) {
        this.setData({
            inpval: t.detail.value
        });
    },
    validation: function() {
        var t = wx.getStorageSync("opid"), e = this;
        wx.request({
            url: "https://www.smxic.com/index.php/card/Card/useCard?openid=" + t,
            method: "POST",
            data: {
                code: e.data.inpval
            },
            success: function(t) {
                0 == t.data.code && (wx.showToast({
                    title: "验证成功",
                    icon: "none"
                }), e.setData({
                    secretflag: !1
                }), e.toobtain()), 1 == t.data.code && wx.showToast({
                    title: t.data.msg,
                    icon: "none"
                });
            }
        });
    },
    clicksecrettrue: function() {
        this.setData({
            secretflag: !0
        });
    },
    clicksecretfalse: function() {
        this.setData({
            secretflag: !1
        });
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});