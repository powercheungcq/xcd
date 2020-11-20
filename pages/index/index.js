var t = getApp(), e = new (require("../../utils/qqmap-wx-jssdk.min.js"))({
    key: "EVMBZ-LGYWU-D7IVB-B7PNU-NLEOO-76F45"
});

Page({
    data: {
        map_width: 380,
        map_height: 380,
        imgUrl: "",
        adcode: "",
        openid: "",
        name: "123",
        tel: "123",
        imgUrls: [],
        coupon: [],
        interval: 3e3,
        duration: 800,
        currentStatu: "open",
        uploadImgUrl: "",
        imgwidth: 0,
        imgheight: 0,
        imgwidth1: 0,
        imgheight1: 0,
        imgwidth2: 0,
        imgheight2: 0,
        staticImgUrl: "",
        cardCur: 0,
        swiperList: []
    },
    onLoad: function(e) {
        var o = this;
        wx.request({
            url: "https://www.smxic.com/index.php/getdata/get/getBanner",
            method: "GET",
            success: function(t) {
                var e = [];
                t.data.forEach(function(t) {
                    t.path = "https://www.smxic.com/uploads/" + t.path, e.push(t);
                }), o.setData({
                    swiperList: e
                });
            }
        });
        r = wx.getStorageSync("opid");
        if (e) {
            var n = e.workId;
            wx.setStorageSync("workId", n);
            var a = e.userid, i = e.usersid;
            wx.setStorageSync("usersid", i), wx.setStorageSync("getid", a);
        }
        this.setData({
            options: e,
            openid: r
        });
        var s = getApp().d.staticImgUrl, c = this.data.currentStatu;
        this.util(c), o.getImg();
        var d = getApp().d.uploadImgUrl;
        o.setData({
            uploadImgUrl: d
        }), t.getUserInfo(function(t) {
            console.log(t), console.log(t.openid), o.setData({
                userInfo: t
            }), wx.setStorageSync("opid", "" + t.openid), console.log(t.openid);
        });
        r = wx.getStorageSync("opid");
        console.log(r), o.setData({
            openid: r,
            staticImgUrl: s
        }), this.loadOrderStatus();
        wx.request({
            url: "https://www.smxic.com/index.php/order/cssy/banbents?banben=1.0.0.5",
            data: {},
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            method: "POST",
            success: function(t) {
                2 == t.data.status && wx.showToast({
                    title: "目前小程序有新的版本，请删除后重新安装，否则可能造成数据显示异常",
                    icon: "none",
                    duration: 4e3
                });
            },
            fail: function(t) {},
            complete: function() {}
        });
        var r = wx.getStorageSync("opid");
        console.log(r), wx.request({
            url: "https://www.smxic.com/index.php/wxpay/coupon/get_use_info?openid=" + r,
            data: {},
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            method: "POST",
            success: function(t) {
                null != t.data.response.data ? (console.log(t.data.response.data.tel), o.setData({
                    tel: t.data.response.data.tel,
                    name: t.data.response.data.name
                })) : o.setData({
                    tel: "",
                    name: ""
                });
            },
            fail: function(t) {},
            complete: function() {}
        }), wx.request({
            url: "https://www.smxic.com/index.php/wxpay/coupon/get_indeximg",
            data: {},
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            method: "POST",
            success: function(t) {
                o.setData({
                    bannerList: t.data.response.data
                });
            },
            fail: function(t) {},
            complete: function() {}
        });
    },
    onShow: function() {
        this.loadOrderStatus();
    },
    golive: function() {
        wx.navigateTo({
            url: "/pages/livebroadcast/livebroadcast"
        });
    },
    showboxflag: function() {
        this.setData({
            show: 0
        });
    },
    getuser_tel: function() {
        var t = this, e = wx.getStorageSync("opid");
        console.log(e), wx.request({
            url: "https://www.smxic.com/index.php/wxpay/coupon/get_use_info?openid=" + e,
            data: {},
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            method: "POST",
            success: function(o) {
                wx.hideLoading(), o.data.response.data.tel ? (t.setData({
                    show: 0,
                    tel: o.data.response.data.tel,
                    name: o.data.response.data.name
                }), t.getaddress()) : e && t.setData({
                    show: 1
                });
            },
            fail: function(t) {},
            complete: function() {}
        });
    },
    loadOrderStatus: function() {
        this.setData({
            userId: t.d.userId
        });
    },
    tel: function() {
        wx.makePhoneCall({
            phoneNumber: "0510-86906666"
        });
    },
    cardSwiper: function(t) {
        this.setData({
            cardCur: t.detail.current
        });
    },
    imageLoad: function(t) {
        var e = 500 / (t.detail.width / t.detail.height);
        this.setData({
            imgwidth: 500,
            imgheight: e
        });
    },
    imageLoads: function(t) {
        var e = 500 / (t.detail.width / t.detail.height);
        this.setData({
            imgwidth1: 500,
            imgheight1: e,
            imgwidth2: 500,
            imgheight2: e
        });
    },
    imageLoads2: function(t) {
        var e = 500 / (t.detail.width / t.detail.height);
        this.setData({
            imgwidth2: 500,
            imgheight2: e
        });
    },
    bindGetUserInfo: function(e) {
        var o = this;
        console.log(e.detail.userInfo), e.detail.userInfo ? (t.getUserInfo(), setTimeout(function() {
            o.onLoad(o.data.options);
        }, 2e3)) : wx.showToast({
            title: "为了您更好的体验,请先同意授权",
            icon: "none",
            duration: 2e3
        });
    },
    getPhoneNumber: function(t) {
        var e = this, o = wx.getStorageSync("session_key"), n = wx.getStorageSync("opid");
        wx.request({
            url: "https://www.smxic.com/index.php/wxpay/coupon/getnumber",
            data: {
                app_id: "wx03055a8787bf0015",
                openid: n,
                session_key: o,
                iv: t.detail.iv,
                encryptedData: t.detail.encryptedData
            },
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            method: "POST",
            success: function(t) {
                console.log(1), setTimeout(function() {
                    e.onLoad(e.data.options);
                }, 2e3);
            },
            fail: function(t) {
                console.log(2);
            },
            complete: function() {
                console.log(3);
            }
        });
    },
    getPhoneNumber1: function(t) {
        var e = this, o = wx.getStorageSync("session_key"), n = wx.getStorageSync("opid");
        if (!n || !o) return wx.showToast({
            title: "请先授权登录",
            icon: "none"
        });
        wx.request({
            url: "https://www.smxic.com/index.php/wxpay/coupon/getnumber",
            data: {
                app_id: "wx03055a8787bf0015",
                openid: n,
                session_key: o,
                iv: t.detail.iv,
                encryptedData: t.detail.encryptedData
            },
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            method: "POST",
            success: function(t) {
                try {
                    var o = t.data.response;
                    console.log(o), o.success ? (e.setData({
                        show: 0
                    }), wx.showLoading({
                        title: "加载中"
                    }), e.getaddress()) : e.setData({
                        show: 1
                    });
                } catch (o) {
                    var n = t.data, a = JSON.parse(n.replace(/\ufeff/g, ""));
                    console.log(a), a.response.success ? (e.setData({
                        show: 0
                    }), wx.showLoading({
                        title: "加载中"
                    }), e.getaddress()) : e.setData({
                        show: 1
                    });
                }
            },
            fail: function(t) {
                console.log(2);
            },
            complete: function() {
                console.log(3);
            }
        });
    },
    orderbtn: function(t) {
        console.log(t.detail.formId);
        var e = t.detail.formId, o = wx.getStorageSync("opid");
        if (!o) return wx.showToast({
            title: "请先授权登录",
            icon: "none"
        });
        wx.request({
            url: "https://www.smxic.com/index.php/order/cssy/upform?openid=" + o + "&formid=" + e,
            data: {},
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            method: "POST",
            success: function(t) {},
            fail: function(t) {},
            complete: function() {}
        }), wx.navigateTo({
            url: "../order/chooseaddress/chooseaddress"
        });
    },
    onPullDownRefresh: function() {
        wx.showToast({
            title: "loading....",
            icon: "loading"
        });
    },
    formSubmit: function(t) {
        var e = t.detail.formId, o = this, n = wx.getStorageSync("opid");
        wx.request({
            url: "https://www.smxic.com/index.php/getdata/get/getadmininfo?openid=" + n + "&formid=" + e,
            data: {},
            async: !0,
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            method: "POST",
            success: function(t) {
                wx.navigateTo({
                    url: "/pages/web/web"
                });
            },
            fail: function(t) {},
            complete: function() {}
        }), "" == n && wx.showModal({
            title: "提醒",
            content: "您还未进行授权，请先授权",
            cancelText: "关闭",
            confirmText: "立即授权",
            success: function(t) {
                t.confirm ? wx.navigateTo({
                    url: "/pages/login/login"
                }) : o.setData({
                    currentStatu: "close"
                });
            }
        });
    },
    getImg: function() {
        var t = this;
        wx.request({
            url: "https://www.smxic.com/index.php/getdata/get/getimginfo",
            data: {},
            async: !0,
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            method: "POST",
            success: function(e) {
                e.data.otherSever;
                t.setData({
                    imgUrls: e.data
                });
            },
            fail: function(t) {},
            complete: function() {}
        });
    },
    util: function(t) {
        var e = wx.createAnimation({
            duration: 200,
            timingFunction: "linear",
            delay: 0
        });
        this.animation = e, e.opacity(0).rotateX(-100).step(), this.setData({
            animationData: e.export()
        }), setTimeout(function() {
            e.opacity(1).rotateX(0).step(), this.setData({
                animationData: e
            }), "close" == t && this.setData({
                showModalStatus: !1
            });
        }.bind(this), 200), "open" == t && this.setData({
            showModalStatus: !0
        });
    },
    powerDrawer: function(t) {
        var e = t.currentTarget.dataset.statu;
        this.util(e);
        this.setData({
            currentStatu: "close"
        }), console.log(this.data.tel, this.data.name), wx.showLoading({
            title: "加载中"
        }), this.getuser_tel();
    },
    getaddress: function() {
        var t = this;
        wx.hideLoading(), wx.getLocation({
            type: "wgs84",
            altitude: !0,
            success: function(o) {
                var n = o.latitude, a = o.longitude;
                e.reverseGeocoder({
                    location: {
                        latitude: n,
                        longitude: a
                    },
                    success: function(e) {
                        console.log(e);
                        var o = String(e.result.address_component.province), n = String(e.result.address_component.city), a = (String(e.result.ad_info.adcode), 
                        String(e.result.address_component.district)), i = String(e.result.address_reference.town.title);
                        console.log(o), console.log(n), console.log(a), console.log(i), wx.request({
                            url: "https://www.smxic.com/index.php/sample/testcs/iskaitong?province=" + o + "&city=" + n + "&district=" + a + "&town=" + i,
                            data: {},
                            header: {
                                "Content-Type": "application/x-www-form-urlencoded"
                            },
                            method: "POST",
                            success: function(e) {
                                console.log(e);
                                var o = e.data.townid;
                                console.log(o), wx.setStorageSync("cityid", o), t.getcoupon();
                            },
                            fail: function(t) {},
                            complete: function() {}
                        });
                    },
                    fail: function(t) {
                        wx.showToast({
                            title: "地址信息有误请重新进入当前页面",
                            icon: "none",
                            duration: 2e3
                        });
                    }
                });
            },
            fail: function(t) {},
            complete: function(t) {}
        });
    },
    getcoupon: function() {
        var t = this, e = wx.getStorageSync("opid"), o = wx.getStorageSync("cityid");
        console.log(o), wx.request({
            url: "https://www.smxic.com/index.php/wxpay/coupon/getcouponinfo",
            async: !0,
            data: {
                openid: e,
                cityid: o
            },
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            method: "POST",
            success: function(e) {
                1 == e.data.response.code && t.setData({
                    coupon: e.data.response.data
                });
            }
        });
    },
    upaction: function(t) {
        this.setData({
            coupon: []
        }), wx.showModal({
            title: "温馨提示",
            content: "红包抵用券已经在您的账户中，你可在“我的红包”中查看和使用。",
            success: function(t) {
                t.cancel || t.confirm;
            }
        });
    },
    bindling: function(t) {
        this.setData({
            coupon: []
        }), wx.showModal({
            title: "提示",
            content: "领取成功！",
            cancelText: "关闭",
            confirmText: "去使用",
            success: function(t) {
                t.confirm || t.cancel;
            }
        });
    },
    bindguan: function(t) {
        this.setData({
            coupon: []
        });
    },
    onHide: function() {
        var t = this;
        "" == wx.getStorageSync("opid") || t.setData({
            currentStatu: "close"
        });
    }
});