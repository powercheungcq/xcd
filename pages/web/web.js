var o = getApp();

Page({
    data: {
        url: "",
        userid: ""
    },
    onLoad: function(e) {
        if (console.log(1, e), console.log(123), e) {
            var t = e.agworkId;
            wx.setStorageSync("agworkId", t);
        }
        this.getuserid();
        var n = this, i = wx.getStorageSync("opid");
        console.log(i), "" == i && (wx.showToast({
            title: "请先授权",
            icon: "loading",
            duration: 1e3
        }), setTimeout(function() {
            wx.navigateTo({
                url: "/pages/dlogin/login"
            });
        }, 1e3)), o.getUserInfo(function(o) {
            n.setData({
                userInfo: o,
                loadingHidden: !0,
                openid: o.openid
            }), console.log(o.openid), wx.setStorageSync("opid", "" + o.openid);
        }), n.loadOrderStatus();
    },
    onShow: function() {
        this.onLoad();
        var o = wx.getStorageSync("opid");
        console.log(o), "" == o && (wx.showToast({
            title: "请先授权",
            icon: "loading",
            duration: 1e3
        }), setTimeout(function() {
            wx.navigateTo({
                url: "/pages/login/login"
            });
        }, 1e3));
    },
    loadOrderStatus: function() {
        this.setData({
            userId: o.d.userId
        });
    },
    getuserid: function() {
        var o = this, e = wx.getStorageSync("opid"), t = (wx.getStorageSync("getid"), wx.getStorageSync("workId"), 
        wx.getStorageSync("formid")), n = wx.getStorageSync("agworkId");
        wx.request({
            url: "https://www.smxic.com/index.php/getdata/get/getuser?openid=" + e,
            data: {},
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            method: "POST",
            success: function(i) {
                var a = i.data;
                console.log(a), o.setData({
                    usersid: i.data,
                    url: "https://www.smxic.com/index.php/admin/arreg/ceshi.html?userid=" + a + "&agworkId=" + n + "&openid=" + e + "&formid=" + t
                }), console.log(o.data.url);
            },
            fail: function(o) {},
            complete: function() {}
        });
    },
    onReady: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {},
    hideShareMenu: function() {}
});