var e = getApp();

Page({
    data: {
        canIUse: wx.canIUse("button.open-type.getUserInfo"),
        tempFilePaths: "",
        sex: "",
        province: "",
        city: "",
        state: 0,
        nickName: "",
        userInfoAvatar: "",
        labArr: [ "不要去洗车店洗车了？洗车帝无水上门洗车来啦！", "长期不洗车危害大，手机下单，享上门洗车服务>>", "懒人都爱用洗车帝无水上门洗车,还免费上光打蜡" ],
        mymoney: "",
        colorArr: [ "1.jpg", "2.jpg", "3.jpg" ],
        flag: !0
    },
    getPhoneNumber: function(e) {
        var t = this;
        console.log(e);
        var a = wx.getStorageSync("opid"), n = wx.getStorageSync("session_key");
        console.log(e.detail.errMsg), console.log(e.detail.iv), console.log(e.detail.encryptedData), 
        "getPhoneNumber:user deny" == e.detail.errMsg ? wx.showModal({
            title: "提示",
            showCancel: !1,
            content: "未授权",
            success: function(e) {}
        }) : wx.request({
            url: "https://www.smxic.com/index.php/sample/Getphone/getPhoneNumber?openid=" + a,
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            method: "get",
            data: {
                encryptedData: e.detail.encryptedData,
                iv: e.detail.iv,
                session_key: n
            },
            success: function(e) {
                e.data.msg.phoneNumber ? (console.log(e), wx.showModal({
                    title: "提示",
                    showCancel: !1,
                    content: "授权成功",
                    success: function() {
                        var t = e.data.msg.phoneNumber;
                        wx.request({
                            url: "https://www.smxic.com/index.php/sample/Getphone/update?openid=" + a + "&phone=" + t,
                            async: !0,
                            data: {},
                            header: {
                                "Content-Type": "application/x-www-form-urlencoded"
                            },
                            method: "POST",
                            success: function(e) {},
                            fail: function(e) {},
                            complete: function() {}
                        });
                    }
                }), setTimeout(function() {
                    wx.navigateTo({
                        url: "/pages/member/index/index"
                    });
                }, 1500), t.setData({
                    show: "show",
                    hiden: ""
                })) : wx.showToast({
                    title: "授权失败",
                    icon: "loading"
                });
            },
            fail: function() {
                wx.showToast({
                    title: "授权失败",
                    icon: "loading"
                });
            }
        });
    },
    isclicklogin: function() {
        wx.navigateTo({
            url: "/pages/login/login"
        });
    },
    navigateToAddress: function() {
        wx.navigateTo({
            url: "../../order/list/list"
        });
    },
    navigateToOrder: function() {
        wx.navigateTo({
            url: "/pages/member/earnings/earnings"
        });
    },
    fxuser: function() {
        wx.navigateTo({
            url: "/pages/member/fxuser/fxuser"
        });
    },
    loginbtn: function() {
        wx.navigateTo({
            url: "/pages/member/index/login"
        });
    },
    ewm: function() {
        wx.navigateTo({
            url: "/pages/member/myewm/myewm"
        });
    },
    fankui: function() {
        wx.navigateTo({
            url: "/pages/member/feedback/feedback"
        });
    },
    navigateToOrder2: function() {
        wx.navigateTo({
            url: "/pages/member/envelope/envelope"
        });
    },
    navigateToOrder1: function() {
        wx.navigateTo({
            url: "/pages/member/preferential/meprefer"
        });
    },
    navigateToOrder3: function() {
        wx.navigateTo({
            url: "/pages/member/donate/donate"
        });
    },
    navigatesevDonate: function() {
        wx.switchTab({
            url: "/pages/orderlist/category"
        });
    },
    navigateToAboutus: function() {
        wx.navigateTo({
            url: "/pages/member/set/set"
        });
    },
    navigateToDonate: function() {
        wx.navigateTo({
            url: "/pages/spddan/spddan"
        });
    },
    navigateToShare: function() {
        wx.navigateTo({
            url: "/pages/member/share/share"
        });
    },
    onLoad: function() {
        var t = this;
        e.getUserInfo(function(e) {
            t.setData({
                userInfo: e,
                loadingHidden: !0
            });
        }), t.setData({
            userInfoAvatar: wx.getStorageSync("HeadUrl"),
            nickName: wx.getStorageSync("NickName") ? wx.getStorageSync("NickName") : "请登录",
            city: wx.getStorageSync("city")
        }), this.loadOrderStatus();
    },
    onShow: function() {
        var e = this;
        e.setData({
            flag: !0
        }), e.onLoad();
        var t = wx.getStorageSync("opid");
        wx.request({
            url: "https://www.smxic.com/index.php/order/caiwu/csfenxianshouyi1?openid=" + t,
            method: "POST",
            success: function(t) {
                e.setData({
                    mymoney: t.data.ksy
                });
            }
        }), "" == t && e.setData({
            flag: !1
        });
    },
    loadOrderStatus: function() {
        this.setData({
            userId: e.d.userId
        });
    },
    onShareAppMessage: function() {
        var e = this, t = Math.floor(3 * Math.random());
        console.log(e.data.colorArr[t]);
        var a = wx.getStorageSync("opid");
        wx.request({
            url: "https://www.smxic.com/index.php/getdata/get/getuser?openid=" + a,
            async: !0,
            data: {},
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            method: "POST",
            success: function(e) {
                wx.setStorageSync("userid", "" + e.data), console.log(e.data);
            },
            fail: function(e) {},
            complete: function() {}
        });
        var n = wx.getStorageSync("userid");
        return console.log(n), {
            title: e.data.labArr[t],
            path: "/pages/index/index?userid=" + n,
            imageUrl: "https://www.smxic.com/uploads/zhuanfa/" + e.data.colorArr[t],
            success: function(e) {
                console.log(e);
            }
        };
    },
    hideShareMenu: function() {},
    clickzhibo: function() {
        wx.navigateTo({
            url: "plugin-private://wx2b03c6e691cd7370/pages/live-player-plugin?room_id=" + id
        });
    }
});