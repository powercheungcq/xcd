function e(e, t, a) {
    return t in e ? Object.defineProperty(e, t, {
        value: a,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = a, e;
}

var t = getApp(), a = 0, i = 0, o = 0, s = "", n = (new Date(), Date.parse(new Date()), 
new (require("../../../utils/qqmap-wx-jssdk.min.js"))({
    key: "EVMBZ-LGYWU-D7IVB-B7PNU-NLEOO-76F45"
}), requirePlugin("myPluginCalendar"));

Page({
    data: {
        userinfo: {},
        carlist: [],
        severlist: [],
        otherlist: [],
        slist: [],
        coupon_name_list: [],
        coupon_list: [],
        coupon_id: 0,
        coupon_price: 0,
        coupon_log_id: 0,
        washlist: [],
        sex: [ {
            id: "0",
            name: "先生",
            checked: "true"
        }, {
            id: "1",
            name: "女士"
        } ],
        showModalStatus: !1,
        currCarNumber: "请选择车辆（必选）",
        totalPrice: "0",
        endprice: 0,
        toPriceOther: "0",
        localCity: "",
        adcode: "",
        uid: "",
        kaitong: 0,
        isShow: !1,
        beginTime: "8:00",
        endTime: "17:00",
        timeGap: 180,
        themeColor: "#ffd00a",
        showOverdue: !0,
        calendarType: "yytimes",
        carAddress: "",
        cityid: "",
        carstate: "",
        townid: "",
        othersz: [],
        othersever: [],
        allGoodsFilte: [],
        gdprice: "",
        btnDisabled: !1
    },
    _yybindhide: function() {},
    _yybindchange: function(e) {
        var t = "";
        for (var a in e.detail.times) t += e.detail.times[a] + "    ";
        t = e.detail.year + "-" + e.detail.month + "-" + e.detail.day + " " + t, console.log(t), 
        this.setData({
            dateStr: t
        });
    },
    bindPickerChange: function(e) {
        this.setData({
            coupon_id: e.detail.value,
            coupon_price: this.data.coupon_list[e.detail.value].price,
            coupon_log_id: this.data.coupon_list[e.detail.value].id
        }), this.update_endprice();
    },
    cellClick: function() {
        this.setData({
            isShow: !0
        });
    },
    onLoad: function() {
        n.getData(), this.getdata(), this.getgdfw(), this.getseverice(), this.getother(), 
        this.getvip(), this.getlxinfo();
        var e = this, a = wx.getStorageSync("cityid"), i = wx.getStorageSync("townid"), o = wx.getStorageSync("carAddress");
        e.setData({
            carAddress: o,
            cityid: a,
            townid: i
        }), t.getUserInfo(function(t) {
            e.setData({
                userInfo: t,
                loadingHidden: !0
            });
        }), this.loadOrderStatus();
    },
    onShow: function() {
        this.loadOrderStatus(), this.onLoad(), this.data.othersz = "", this.getcouponlist();
    },
    loadOrderStatus: function() {
        this.setData({
            userId: t.d.userId
        });
    },
    radioChange: function(e) {
        var t = e.detail.value;
        e.detail.value, this.setData({
            currCarNumber: t
        });
    },
    update_endprice: function() {
        this.setData({
            endprice: this.data.totalPrice - this.data.coupon_list[this.data.coupon_id].price < 0 ? 0 : this.data.totalPrice - this.data.coupon_list[this.data.coupon_id].price
        }), console.log(this.data.totalPrice), console.log(this.data.coupon_list[this.data.coupon_id].price);
    },
    washbtn: function(e) {
        a = 0, a = Number(e.detail.value), console.log(e);
        var t = this;
        o = a + t.data.toPriceOther, t.setData({
            totalPrice: o
        }), this.update_endprice();
    },
    checkboxChange: function(e) {
        console.log(e), i = 0;
        for (var t = 0; t < e.detail.value.length; t++) i += Number(e.detail.value[t]);
        var a = this;
        a.setData({
            toPriceOther: i
        }), o = a.data.gdprice + a.data.toPriceOther, a.setData({
            totalPrice: o
        }), this.update_endprice();
    },
    powerDrawer: function(e) {
        var t = e.currentTarget.dataset.statu;
        this.util(t);
        var i = this, s = wx.getStorageSync("opid"), n = e.currentTarget.id;
        wx.setStorageSync("carid", "" + e.currentTarget.id), wx.request({
            url: "https://www.smxic.com/index.php/sample/test/getcarinfo?id=" + n,
            data: {},
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            method: "POST",
            success: function(e) {
                console.log(e.data);
                var t = wx.getStorageSync("cityid");
                if (console.log(t), "SUV" == e.data) {
                    n = i.data.fuwu[5];
                    console.log(n.servicePrice), wx.setStorageSync("severiceId", "" + n.severiceId), 
                    wx.setStorageSync("serviceName", "" + n.serviceName), i.setData({
                        washlist: n
                    }), wx.request({
                        url: "https://www.smxic.com/index.php/sample/Getphone/issd?openid=" + s,
                        async: !0,
                        data: {},
                        header: {
                            "Content-Type": "application/x-www-form-urlencoded"
                        },
                        method: "POST",
                        success: function(e) {
                            console.log(e.data.status), 2 == e.data.status ? (a = i.data.isvip > 0 ? parseFloat(n.servicePrice) - parseFloat(i.data.isvip) : n.servicePrice, 
                            o = parseFloat(a) + parseFloat(i.data.toPriceOther), i.setData({
                                totalPrice: o,
                                gdprice: a
                            })) : (a = 9.9, o = parseFloat(a) + parseFloat(i.data.toPriceOther), i.setData({
                                totalPrice: o,
                                gdprice: a
                            })), i.update_endprice();
                        },
                        fail: function(e) {},
                        complete: function() {}
                    });
                }
                if ("商务车" == e.data) {
                    n = i.data.fuwu[3];
                    console.log(n.servicePrice), wx.setStorageSync("severiceId", "" + n.severiceId), 
                    wx.setStorageSync("serviceName", "" + n.serviceName), i.setData({
                        washlist: n
                    }), wx.request({
                        url: "https://www.smxic.com/index.php/sample/Getphone/issd?openid=" + s,
                        async: !0,
                        data: {},
                        header: {
                            "Content-Type": "application/x-www-form-urlencoded"
                        },
                        method: "POST",
                        success: function(e) {
                            console.log(e.data.status), 2 == e.data.status ? (a = i.data.isvip > 0 ? parseFloat(n.servicePrice) - parseFloat(i.data.isvip) : n.servicePrice, 
                            o = parseFloat(a) + parseFloat(i.data.toPriceOther), i.setData({
                                totalPrice: o,
                                gdprice: a
                            })) : (a = 9.9, o = parseFloat(a) + parseFloat(i.data.toPriceOther), i.setData({
                                totalPrice: o,
                                gdprice: a
                            })), i.update_endprice();
                        },
                        fail: function(e) {},
                        complete: function() {}
                    });
                }
                if ("轿车" == e.data) {
                    var n = i.data.fuwu[4];
                    console.log(n.servicePrice), console.log(i.data.toPriceOther), wx.setStorageSync("severiceId", "" + n.severiceId), 
                    wx.setStorageSync("serviceName", "" + n.serviceName), i.setData({
                        washlist: n
                    }), wx.request({
                        url: "https://www.smxic.com/index.php/sample/Getphone/issd?openid=" + s,
                        async: !0,
                        data: {},
                        header: {
                            "Content-Type": "application/x-www-form-urlencoded"
                        },
                        method: "POST",
                        success: function(e) {
                            console.log(e.data.status), 2 == e.data.status ? (a = i.data.isvip > 0 ? parseFloat(n.servicePrice) - parseFloat(i.data.isvip) : n.servicePrice, 
                            o = parseFloat(a) + parseFloat(i.data.toPriceOther), i.setData({
                                totalPrice: o,
                                gdprice: a
                            })) : (a = 9.9, o = parseFloat(a) + parseFloat(i.data.toPriceOther), i.setData({
                                totalPrice: o,
                                gdprice: a
                            })), i.update_endprice();
                        },
                        fail: function(e) {},
                        complete: function() {}
                    });
                }
                i.setData({
                    carstate: e.data
                }), i.update_endprice();
            },
            fail: function(e) {},
            complete: function() {}
        }), this.update_endprice();
    },
    getvip: function() {
        var e = this, t = wx.getStorageSync("opid"), a = wx.getStorageSync("cityid");
        wx.request({
            url: "https://www.smxic.com/index.php/sample/newac/getvip?cityid=" + a + "&openid=" + t,
            data: {},
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            method: "POST",
            success: function(t) {
                var a = t.data;
                console.log(a), e.setData({
                    isvip: a
                }), wx.setStorageSync("isvip", "" + a);
            },
            fail: function(e) {},
            complete: function() {}
        });
    },
    severiceBtn: function(e) {
        var t = this;
        s = e.target.dataset.id, console.log(s);
        var a = wx.getStorageSync("cityid");
        wx.request({
            url: "https://www.smxic.com/index.php/sample/test/getmysever?cityid=" + a + "&severiceId=" + s,
            data: {},
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            method: "POST",
            success: function(e) {
                var a = e.data;
                t.setData({
                    gdseverlist: e.data
                }), wx.setStorage({
                    key: "gdseverlist",
                    data: a
                });
            },
            fail: function(e) {},
            complete: function() {}
        });
    },
    otherBtn: function(e) {
        var t = this;
        s = e.currentTarget.dataset.id, wx.setStorageSync("otherId", "" + e.currentTarget.id);
        var a = t.data.othersever, i = a.indexOf(e.currentTarget.id);
        -1 == i ? a.push(e.currentTarget.id) : a.splice(i, 1);
        var o = a.join(",");
        t.setData({
            othersz: o
        }), console.log(t.data.othersz);
        var n = t.data.othersz;
        wx.setStorageSync("othersever", "" + n), wx.request({
            url: "https://www.smxic.com/index.php/sample/test/severget?sevid=" + t.data.othersz,
            data: {},
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            method: "POST",
            success: function(e) {
                var a = e.data;
                console.log(e.data), t.setData({
                    slist: e.data
                }), wx.setStorage({
                    key: "slist",
                    data: a
                });
            },
            fail: function(e) {},
            complete: function() {}
        });
    },
    util: function(e) {
        var t = wx.createAnimation({
            duration: 200,
            timingFunction: "linear",
            delay: 0
        });
        this.animation = t, t.opacity(0).rotateX(-100).step(), this.setData({
            animationData: t.export()
        }), setTimeout(function() {
            t.opacity(1).rotateX(0).step(), this.setData({
                animationData: t
            }), "close" == e && this.setData({
                showModalStatus: !1
            });
        }.bind(this), 200), "open" == e && this.setData({
            showModalStatus: !0
        });
    },
    xinzeng: function() {
        wx.navigateTo({
            url: "../../member/share/xz/xz"
        });
    },
    verification: function(t) {
        var a = t.currentTarget.dataset.name;
        this.setData(e({}, a, t.detail.value.replace(/\s+/g, "")));
    },
    saveSubmit: function(e) {
        var t = wx.getStorageSync("opid"), a = e.detail.value.phone;
        if (console.log(e.detail.value), 0 == e.detail.value.phone.length || !/^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/.test(a) || a.length > 11) {
            var i = "1";
            (!/^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/.test(a) || a.length > 11) && (i = "电话有误"), 
            0 == e.detail.value.phone.length && (i = "请输入联系电话"), wx.showToast({
                title: i,
                icon: "none",
                duration: 2e3
            });
        } else wx.request({
            url: "https://www.smxic.com/index.php/sample/Map/saveuserinfo?openid=" + t + "&username=" + e.detail.value.userName + "&phone=" + e.detail.value.phone + "&usersex=" + e.detail.value.sex,
            data: {},
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            method: "POST",
            success: function(e) {
                1 == e.data.status && wx.showToast({
                    title: "设置成功",
                    icon: "none",
                    duration: 2e3
                }), 2 == e.data.status && wx.showToast({
                    title: "已经设置过了",
                    icon: "none",
                    duration: 2e3
                });
            },
            fail: function(e) {},
            complete: function() {}
        });
    },
    formSubmit: function(e) {
        var t = wx.getStorageSync("opid"), a = e.detail.formId, t = wx.getStorageSync("opid");
        wx.request({
            url: "https://www.smxic.com/index.php/order/cssy/upformthree?openid=" + t + "&formid=" + a,
            data: {},
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            method: "POST",
            success: function(e) {},
            fail: function(e) {},
            complete: function() {}
        }), console.log(e.detail.value), wx.setStorageSync("carnumber", "" + e.detail.value.carNumber);
        var i = e.detail.value.phone;
        if ("请选择车辆（必选）" == e.detail.value.carNumber || "请输入车牌" == e.detail.value.carNumber || 0 == e.detail.value.carAddress.length || 0 == e.detail.value.phone.length || !/^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/.test(i) || i.length > 11) {
            var o = "1";
            (!/^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/.test(i) || i.length > 11) && (o = "电话有误"), 
            0 == e.detail.value.phone.length && (o = "请输入联系电话"), 0 == e.detail.value.carAddress.length && (o = "请选择车辆定位"), 
            "请选择车辆（必选）" == e.detail.value.carNumber && (o = "请选择您的车辆"), "请输入车牌" == e.detail.value.carNumber && (o = "当前选择车辆车牌不符合规则"), 
            wx.showToast({
                title: o,
                icon: "none",
                duration: 2e3
            });
        } else {
            var s = e.detail.value;
            console.log(s);
            var n = JSON.stringify(s);
            wx.setStorageSync("formdata", "" + n), wx.setStorage({
                key: "formData",
                data: s,
                success: function(e) {
                    wx.request({
                        url: "https://www.smxic.com/index.php/sample/test/judgeorder?openid=" + t,
                        data: {},
                        header: {
                            "Content-Type": "application/x-www-form-urlencoded"
                        },
                        method: "POST",
                        success: function(e) {
                            2 == e.data.status && wx.showToast({
                                title: "您已经有超过3个订单未完成，请先完成订单后再下单！",
                                icon: "none",
                                duration: 2e3
                            }), 1 == e.data.status && wx.navigateTo({
                                url: "/pages/severice/severice"
                            });
                        },
                        fail: function(e) {},
                        complete: function() {}
                    });
                }
            });
        }
    },
    getdata: function() {
        var e = this, t = wx.getStorageSync("opid");
        wx.request({
            url: "https://www.smxic.com/index.php/sample/test/getcar?openid=" + t,
            data: {},
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            method: "POST",
            success: function(t) {
                var a = t.data;
                wx.setStorage({
                    key: "carlist",
                    data: a
                }), e.setData({
                    carlist: t.data
                });
            },
            fail: function(e) {},
            complete: function() {}
        });
    },
    getseverice: function() {
        var e = this, t = wx.getStorageSync("cityid");
        wx.request({
            url: "https://www.smxic.com/index.php/sample/test/getseverice?cityid=" + t,
            data: {},
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            method: "POST",
            success: function(t) {
                var a = t.data;
                console.log(a[3].serviceName);
                var i = a[3].serviceName;
                wx.setStorage({
                    key: "severlist",
                    data: a
                }), e.setData({
                    severlist: t.data,
                    sname: i
                });
            },
            fail: function(e) {},
            complete: function() {}
        });
    },
    getother: function() {
        var e = this, t = wx.getStorageSync("cityid");
        wx.request({
            url: "https://www.smxic.com/index.php/sample/test/getother?cityid=" + t,
            async: !0,
            data: {},
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            method: "POST",
            success: function(t) {
                var a = t.data;
                wx.setStorage({
                    key: "otherlist",
                    data: a
                });
                var i = t.data;
                e.setData({
                    otherlist: i
                });
            },
            fail: function(e) {},
            complete: function() {}
        });
    },
    getgdfw: function() {
        var e = this, t = wx.getStorageSync("cityid");
        wx.request({
            url: "https://www.smxic.com/index.php/sample/Severice/gdfw?cityid=" + t,
            async: !0,
            data: {},
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            method: "POST",
            success: function(t) {
                console.log(t.data), e.setData({
                    fuwu: t.data
                });
            },
            fail: function(e) {},
            complete: function() {}
        });
    },
    issd: function() {},
    getcouponlist: function() {
        var e = this, t = wx.getStorageSync("opid"), a = wx.getStorageSync("cityid");
        wx.request({
            url: "https://www.smxic.com/index.php/wxpay/coupon/getcouponlist",
            async: !0,
            data: {
                openid: t,
                cityid: a
            },
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            method: "POST",
            success: function(t) {
                1 == t.data.response.code && e.setData({
                    coupon_name_list: t.data.response.data.coupon_name_list,
                    coupon_list: t.data.response.data.coupon_list
                });
            }
        });
    },
    getlxinfo: function() {
        var e = this, t = wx.getStorageSync("opid");
        wx.request({
            url: "https://www.smxic.com/index.php/sample/Map/getinfo?openid=" + t,
            async: !0,
            data: {},
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            method: "POST",
            success: function(t) {
                console.log(t.data[0]), e.setData({
                    telphone: t.data[0].tel
                }), 1 == t.data[0].sex && e.setData({
                    sex: [ {
                        id: "0",
                        name: "先生",
                        checked: "true"
                    }, {
                        id: "1",
                        name: "女士"
                    } ],
                    uname: t.data[0].username,
                    telphone: t.data[0].tel
                }), 2 == t.data[0].sex && e.setData({
                    sex: [ {
                        id: "0",
                        name: "先生"
                    }, {
                        id: "1",
                        name: "女士",
                        checked: "true"
                    } ],
                    uname: t.data[0].username,
                    telphone: t.data[0].tel
                });
            },
            fail: function(e) {},
            complete: function() {}
        });
    }
});