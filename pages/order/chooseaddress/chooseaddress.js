function t(t, e, o) {
    return e in t ? Object.defineProperty(t, e, {
        value: o,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[e] = o, t;
}

getApp();

var e, o = new (require("../../../utils/qqmap-wx-jssdk.min.js"))({
    key: "EVMBZ-LGYWU-D7IVB-B7PNU-NLEOO-76F45"
});

requirePlugin("myPluginCalendar");

Page((e = {
    data: {
        kaitong: 0,
        staticImgUrl: "",
        imgwidth4: 0,
        imgheight4: 0,
        waters: "",
        jindu: "",
        weidu: "",
        jingwei: ""
    },
    onLoad: function(t) {
        this.getwater(), this.getjwd(), this.getwd(), this.getjingwei(), wx.getLocation({
            type: "wgs84",
            altitude: !0,
            success: function(t) {
                var e = t.latitude, n = t.longitude;
                o.reverseGeocoder({
                    location: {
                        latitude: e,
                        longitude: n
                    },
                    success: function(t) {
                        console.log(t);
                        var e = String(t.result.address_component.province), o = String(t.result.address_component.city), n = (String(t.result.ad_info.adcode), 
                        String(t.result.address_component.district)), a = String(t.result.address_reference.town.title);
                        console.log(e), console.log(o), console.log(n), console.log(a), wx.request({
                            url: "https://www.smxic.com/index.php/sample/testcs/iskaitong?province=" + e + "&city=" + o + "&district=" + n + "&town=" + a,
                            data: {},
                            header: {
                                "Content-Type": "application/x-www-form-urlencoded"
                            },
                            method: "POST",
                            success: function(t) {
                                console.log(t);
                                var e = t.data.townid;
                                console.log(e), 0 == t.data.status && wx.showModal({
                                    title: "提醒",
                                    content: "当前区域没有开通服务，您可以选择其他地区进行服务或者申请该地区代理，成就财富梦想",
                                    confirmText: "选择其他",
                                    cancelText: "申请代理",
                                    success: function(t) {
                                        if (t.cancel) {
                                            console.log("用户点击确定");
                                            var e = wx.getStorageSync("opid");
                                            wx.request({
                                                url: "https://www.smxic.com/index.php/getdata/get/getadmininfo?openid=" + e,
                                                data: {},
                                                async: !0,
                                                header: {
                                                    "Content-Type": "application/x-www-form-urlencoded"
                                                },
                                                method: "POST",
                                                success: function(t) {
                                                    console.log(t.data), wx.navigateTo({
                                                        url: "/pages/web/web"
                                                    });
                                                },
                                                fail: function(t) {},
                                                complete: function() {}
                                            });
                                        }
                                    }
                                });
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
        var e = this, n = getApp().d.staticImgUrl;
        e.setData({
            staticImgUrl: n
        });
    },
    onReady: function() {},
    onShow: function() {
        wx.setStorageSync("othersever", ""), wx.setStorage({
            key: "slist",
            data: ""
        });
    },
    onHide: function() {},
    getjwd: function() {
        var t = this;
        wx.request({
            url: "https://www.smxic.com/index.php/getdata/get/getjwd",
            data: {},
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            method: "POST",
            success: function(e) {
                e.data;
                console.log(e), t.setData({
                    jindu: e.data
                });
            },
            fail: function(t) {},
            complete: function() {}
        });
    },
    getwd: function() {
        var t = this;
        wx.request({
            url: "https://www.smxic.com/index.php/getdata/get/getwd",
            data: {},
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            method: "POST",
            success: function(e) {
                e.data;
                console.log(e), t.setData({
                    weidu: e.data
                });
            },
            fail: function(t) {},
            complete: function() {}
        });
    },
    getjingwei: function() {
        var t = this;
        wx.request({
            url: "https://www.smxic.com/index.php/getdata/get/jingwei",
            data: {},
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            method: "POST",
            success: function(e) {
                e.data;
                console.log(e), t.setData({
                    jingwei: e.data
                });
            },
            fail: function(t) {},
            complete: function() {}
        });
    },
    onUnload: function() {},
    popMap: function(t) {
        this.onReady();
        var e = this;
        wx.chooseLocation({
            type: "wgs84",
            success: function(t) {
                console.log(t);
                var n = t.latitude, a = t.longitude;
                o.reverseGeocoder({
                    location: {
                        latitude: n,
                        longitude: a
                    },
                    success: function(t) {
                        console.log(t);
                        var o = String(t.result.address_component.province), n = String(t.result.address_component.city), a = String(t.result.ad_info.adcode), i = String(t.result.address_component.district), c = String(t.result.address_reference.town.title);
                        console.log(o), console.log(n), console.log(i), console.log(c), wx.request({
                            url: "https://www.smxic.com/index.php/sample/testcs/iskaitong?province=" + o + "&city=" + n + "&district=" + i + "&town=" + c,
                            data: {},
                            header: {
                                "Content-Type": "application/x-www-form-urlencoded"
                            },
                            method: "POST",
                            success: function(t) {
                                console.log(t);
                                var a = t.data.townid;
                                console.log(a), wx.setStorageSync("cityid", "" + a), 0 == t.data.status && wx.showModal({
                                    title: "提醒",
                                    content: "当前区域没有开通服务，您可以选择其他地区进行服务或者申请该地区代理，成就财富梦想",
                                    confirmText: "选择其他",
                                    cancelText: "申请代理",
                                    success: function(t) {
                                        if (t.cancel) {
                                            console.log("用户点击确定");
                                            var o = wx.getStorageSync("opid");
                                            wx.request({
                                                url: "https://www.smxic.com/index.php/getdata/get/getadmininfo?openid=" + o,
                                                data: {},
                                                async: !0,
                                                header: {
                                                    "Content-Type": "application/x-www-form-urlencoded"
                                                },
                                                method: "POST",
                                                success: function(t) {
                                                    console.log(t.data), wx.navigateTo({
                                                        url: "/pages/web/web"
                                                    });
                                                },
                                                fail: function(t) {},
                                                complete: function() {}
                                            });
                                        } else e.setData({
                                            kaitong: 1
                                        }), e.setData({
                                            location: {
                                                longitude: t.longitude,
                                                latitude: t.latitude,
                                                address: t.address,
                                                name: "请点击选择车辆地址",
                                                ad_info: t.ad_info
                                            }
                                        });
                                    }
                                }), 1 == t.data.status && (e.setData({
                                    kaitong: 0
                                }), wx.request({
                                    url: "https://www.smxic.com/index.php/sample/testcs/isxz?province=" + o + "&city=" + n + "&district=" + i + "&town=" + c,
                                    data: {},
                                    header: {
                                        "Content-Type": "application/x-www-form-urlencoded"
                                    },
                                    method: "POST",
                                    success: function(t) {
                                        var o = t.data.townid;
                                        console.log(o), wx.setStorageSync("townid", "" + o), 0 == t.data.status && (wx.showToast({
                                            title: "当前乡镇或街道还未加入服务站点",
                                            icon: "none",
                                            duration: 2e3
                                        }), e.setData({
                                            kaitong: 1
                                        })), 1 == t.data.status && e.setData({
                                            kaitong: 0
                                        });
                                    },
                                    fail: function(t) {},
                                    complete: function() {}
                                }));
                            },
                            fail: function(t) {},
                            complete: function() {}
                        }), e.setData({
                            localCity: n,
                            adcode: a
                        });
                    },
                    fail: function(t) {
                        wx.showToast({
                            title: "地址信息有误请重新进入当前页面",
                            icon: "none",
                            duration: 2e3
                        });
                    }
                }), e.setData({
                    hasLocation: !0,
                    location: {
                        longitude: t.longitude,
                        latitude: t.latitude,
                        address: t.address,
                        name: t.name,
                        ad_info: t.ad_info
                    }
                }), console.log(a), console.log(n), wx.setStorageSync("latitude", "" + n), wx.setStorageSync("longitude", "" + a);
            }
        });
    },
    openLocation: function(t) {
        var e = t.detail.value;
        wx.openLocation({
            longitude: Number(e.longitude),
            latitude: Number(e.latitude),
            address: String(e.address),
            name: String(e.name)
        });
    },
    gettownid: function() {},
    formSubmit: function(t) {
        var e = this, o = t.detail.formId, n = wx.getStorageSync("opid");
        if (wx.request({
            url: "https://www.smxic.com/index.php/order/cssy/upformtwo?openid=" + n + "&formid=" + o,
            data: {},
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            method: "POST",
            success: function(t) {},
            fail: function(t) {},
            complete: function() {}
        }), 0 == e.data.kaitong) if (0 == t.detail.value.carAddress.length) {
            var a = "1";
            0 == t.detail.value.carAddress.length && (a = "请选择车辆位置才可以继续"), wx.showToast({
                title: a,
                icon: "none",
                duration: 2e3
            });
        } else wx.setStorageSync("carAddress", "" + t.detail.value.carAddress), wx.navigateTo({
            url: "../add/add"
        });
        1 == e.data.kaitong && wx.showModal({
            title: "提醒",
            content: "当前区域没有开通服务，您可以选择其他地区进行服务或者申请该地区代理，成就财富梦想",
            confirmText: "选择其他",
            cancelText: "申请代理",
            success: function(t) {
                if (t.cancel) {
                    console.log("用户点击确定");
                    var o = wx.getStorageSync("opid");
                    wx.request({
                        url: "https://www.smxic.com/index.php/getdata/get/getadmininfo?openid=" + o,
                        data: {},
                        async: !0,
                        header: {
                            "Content-Type": "application/x-www-form-urlencoded"
                        },
                        method: "POST",
                        success: function(t) {
                            console.log(t.data), wx.navigateTo({
                                url: "/pages/web/web"
                            });
                        },
                        fail: function(t) {},
                        complete: function() {}
                    });
                } else e.setData({
                    kaitong: 1
                }), e.setData({
                    location: {
                        longitude: t.longitude,
                        latitude: t.latitude,
                        address: t.address,
                        name: "请点击选择车辆地址",
                        ad_info: t.ad_info
                    }
                });
            }
        });
    }
}, t(e, "onReady", function() {
    wx.getSetting({
        success: function(t) {
            console.log(t), console.log(t.authSetting["scope.userLocation"]), void 0 != t.authSetting["scope.userLocation"] && 1 != t.authSetting["scope.userLocation"] ? wx.showModal({
                title: "是否授权当前位置",
                content: "需要获取您的地理位置，请确认授权，否则你将无法下单",
                success: function(t) {
                    t.cancel ? console.info("1授权失败返回数据") : t.confirm && wx.openSetting({
                        success: function(t) {
                            console.log(t), 1 == t.authSetting["scope.userLocation"] ? wx.showToast({
                                title: "授权成功",
                                icon: "success",
                                duration: 5e3
                            }) : wx.showToast({
                                title: "授权失败",
                                icon: "success",
                                duration: 5e3
                            });
                        }
                    });
                }
            }) : t.authSetting["scope.userLocation"];
        }
    });
}), t(e, "imageLoads", function(t) {
    var e = 400 / (t.detail.width / t.detail.height);
    this.setData({
        imgwidth4: 400,
        imgheight4: e
    });
}), t(e, "getwater", function() {
    var t = this, e = wx.getStorageSync("opid");
    wx.request({
        url: "https://www.smxic.com/index.php/getdata/get/getwater?openid=" + e,
        data: {},
        header: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        method: "POST",
        success: function(e) {
            console.log(e.data), t.setData({
                waters: e.data
            });
        },
        fail: function(t) {},
        complete: function() {}
    });
}), e));