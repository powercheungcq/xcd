App({
    d: {
        iconSize: [ 20 ],
        iconColor: [ "red" ],
        iconType: [ "success" ],
        userId: "",
        appId: "",
        appKey: "",
        userInfo: "",
        ceshiUrl: "https://www.smxic.com/index.php",
        staticImgUrl: "https://www.smxic.com/static/images/",
        uploadImgUrl: "https://www.smxic.com/uploads/",
        currentStatu: "open"
    },
    onLaunch: function() {
        var o = wx.getStorageSync("logs") || [];
        o.unshift(Date.now()), wx.setStorageSync("logs", o), this.getUserInfo();
    },
    getUserInfo: function(o) {
        var e = this;
        this.globalData.userInfo ? "function" == typeof o && o(this.globalData.userInfo) : wx.login({
            success: function(n) {
                var t = n.code;
                wx.setStorageSync("code", n.code);
                encodeURIComponent(n.code);
                wx.getUserInfo({
                    success: function(n) {
                        e.globalData.userInfo = n.userInfo, "function" == typeof o && o(e.globalData.userInfo), 
                        e.getUserSessionKey(t);
                    },
                    fail: function(o) {
                        wx.navigateTo({
                            url: "/pages/index/index"
                        });
                    }
                });
            }
        });
    },
    getUserSessionKey: function(o) {
        var e = this;
        wx.request({
            url: e.d.ceshiUrl + "/login/login/getsessionkey",
            data: {
                code: o
            },
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            method: "POST",
            success: function(o) {
                var n = o.data;
                if (0 == n.status) return wx.showToast({
                    title: "123",
                    duration: 2e3
                }), !1;
                e.globalData.userInfo.sessionId = n.session_key, e.globalData.userInfo.openid = n.openid, 
                e.globalData.userInfo.city = n.city, wx.setStorageSync("opid", n.openid), console.log(n.unionid), 
                wx.setStorageSync("city", n.city), wx.setStorageSync("session_key", n.session_key), 
                wx.setStorageSync("unionid", n.unionid), e.globalData.userInfo.unionid = n.unionid, 
                e.onLoginUser();
            },
            fail: function(o) {
                wx.showToast({
                    title: "网络异常！err:getsessionkeys",
                    duration: 2e3
                });
            }
        });
    },
    onLoginUser: function() {
        var o = this, e = o.globalData.userInfo, n = wx.getStorageSync("getid"), t = wx.getStorageSync("workId"), a = wx.getStorageSync("usersid");
        console.log(n), wx.request({
            url: o.d.ceshiUrl + "/login/login/sunlogin?getid=" + n + "&workId=" + t + "&usersid=" + a,
            method: "post",
            data: {
                SessionId: e.sessionId,
                gender: e.gender,
                NickName: e.nickName,
                HeadUrl: e.avatarUrl,
                openid: e.openid,
                unionid: e.unionid
            },
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            success: function(e) {
                var n = e.data.arr, t = e.data.status;
                if (o.globalData.openid = e.data.openid, 1 != t) return wx.showToast({
                    title: "请先授权",
                    duration: 3e3
                }), !1;
                o.globalData.userInfo.id = n.ID, o.globalData.userInfo.NickName = n.NickName, o.globalData.userInfo.HeadUrl = n.HeadUrl, 
                o.globalData.userInfo.gender = n.gender;
                var a = n.ID;
                if (wx.setStorageSync("gender", n.gender), wx.setStorageSync("HeadUrl", n.HeadUrl), 
                wx.setStorageSync("NickName", n.NickName), !a) return wx.showToast({
                    title: "登录失败！",
                    duration: 3e3
                }), !1;
                o.d.openid = a;
            },
            fail: function(o) {
                wx.showToast({
                    title: "网络异常！err:authlogin",
                    duration: 2e3
                });
            }
        });
    },
    onPullDownRefresh: function() {
        wx.stopPullDownRefresh();
    },
    getLocationInfo: function(o) {
        var e = this;
        this.globalData.locationInfo ? o(this.globalData.locationInfo) : wx.getLocation({
            type: "gcj02",
            success: function(n) {
                e.globalData.locationInfo = n, o(e.globalData.locationInfo);
            },
            fail: function() {},
            complete: function() {}
        });
    },
    globalData: {
        userInfo: null,
        locationInfo: null
    }
});