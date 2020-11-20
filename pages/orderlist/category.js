var t = getApp(), e = "", a = (new Array(), new Array()), o = requirePlugin("myPluginCalendar");

Page({
    data: {
        navTab: [ "待付款", "未派单", "待服务", "已完成" ],
        moneyInfo: [ , , , , ,  ],
        currentNavtab: 0,
        msg: "",
        button_status: "default",
        image: [],
        img_button: "inline-block",
        imginfo: [],
        temp: [],
        star: 0,
        starMap: [ "非常差", "差", "一般", "好", "非常满意，无可挑剔" ],
        carlist: [],
        payList: [],
        cardetails: [],
        userInfo: {},
        counts: {},
        allGoodsFilte: [ {
            name: "按时到达",
            value: "0",
            checked: !1
        }, {
            name: "洗车细致",
            value: "1",
            checked: !1
        }, {
            name: "服务态度好",
            value: "2",
            checked: !1
        } ],
        upload_picture_list: [],
        winHeight: "",
        currentTab: 0,
        scrollLeft: 0,
        orderid: ""
    },
    xgtime: function(t) {
        e = t.currentTarget.dataset.id, wx.setStorageSync("timeid", "" + t.currentTarget.dataset.id), 
        wx.navigateTo({
            url: "../orderlist/time"
        });
    },
    callEvent: function(t) {
        console.log(t), wx.makePhoneCall({
            phoneNumber: this.data.phoneNum
        });
    },
    xiangqing: function(t) {
        wx.setStorageSync("orderid", "" + t.currentTarget.id), wx.navigateTo({
            url: "/pages/orderlist/xiangqing"
        });
    },
    delwzf: function(t) {
        var a = this;
        e = t.target.dataset.id, console.log(e), wx.request({
            url: "https://www.smxic.com/index.php/sample/testcs/del?id=" + e,
            async: !0,
            data: {},
            header: {
                "Content-Type": "application/json"
            },
            method: "GET",
            success: function(t) {
                a.onLoad();
            },
            fail: function(t) {},
            complete: function() {}
        });
    },
    payment: function(t) {
        var a = this;
        e = t.target.dataset.id, wx.setStorageSync("carid", "" + t.currentTarget.id), console.log(e), 
        wx.request({
            url: "https://www.smxic.com/index.php/order/order/payment",
            async: !0,
            data: {
                id: e
            },
            header: {
                "Content-Type": "application/json"
            },
            method: "GET",
            success: function(t) {
                console.log(t.data[0].isfirst), 0 == t.data[0].isfirst && wx.request({
                    url: "https://www.smxic.com/index.php/sample/testzx/overdue?id=" + e,
                    async: !0,
                    data: {},
                    header: {
                        "Content-Type": "application/json"
                    },
                    method: "GET",
                    success: function(t) {
                        console.log(t.data.status), 2 == t.data.status ? wx.navigateTo({
                            url: "../severice/orderseverice"
                        }) : wx.showModal({
                            title: "提醒",
                            content: "当前订单已超过支付时间不能再次支付，是否删除该订单？",
                            showCancel: !0,
                            cancelText: "关闭",
                            confirmText: "确定",
                            success: function(t) {
                                t.cancel || wx.request({
                                    url: "https://www.smxic.com/index.php/sample/testcs/del?id=" + e,
                                    async: !0,
                                    data: {},
                                    header: {
                                        "Content-Type": "application/json"
                                    },
                                    method: "GET",
                                    success: function(t) {
                                        a.onLoad();
                                    },
                                    fail: function(t) {},
                                    complete: function() {}
                                });
                            },
                            fail: function(t) {},
                            complete: function(t) {}
                        });
                    },
                    fail: function(t) {},
                    complete: function() {}
                }), 1 == t.data[0].isfirst && wx.showModal({
                    title: "提醒",
                    content: "当前订单是使用首单优惠的订单，无法再次支付，是否删除该订单？",
                    showCancel: !0,
                    cancelText: "取消",
                    confirmText: "确定",
                    success: function(t) {
                        t.cancel || wx.request({
                            url: "https://www.smxic.com/index.php/sample/testcs/del?id=" + e,
                            async: !0,
                            data: {},
                            header: {
                                "Content-Type": "application/json"
                            },
                            method: "GET",
                            success: function(t) {
                                a.onLoad();
                            },
                            fail: function(t) {},
                            complete: function() {}
                        });
                    },
                    fail: function(t) {},
                    complete: function(t) {}
                });
            },
            fail: function(t) {},
            complete: function() {}
        });
    },
    againbtn: function() {
        wx.navigateTo({
            url: "../order/add/add"
        });
    },
    onLoad: function() {
        o.getData(), this.getpay(), this.getcar(), this.getcounts(), wx.setNavigationBarTitle({
            title: "洗车订单管理"
        });
        var e = this;
        e.setData({}), wx.getStorage({
            key: "carlist",
            success: function(t) {
                console.log(t.data), e.setData({
                    carlist: t.data
                });
            }
        }), t.getUserInfo(function(t) {
            e.setData({
                userInfo: t,
                loadingHidden: !0,
                openid: t.openid
            }), console.log(t.openid), wx.setStorageSync("opid", "" + t.openid);
        }), this.loadOrderStatus(), wx.getSystemInfo({
            success: function(t) {
                var a = t.windowHeight * (750 / t.windowWidth) - 10;
                console.log(a), e.setData({
                    winHeight: a
                });
            }
        });
    },
    onShow: function() {
        this.onLoad(), this.loadOrderStatus(), "" == wx.getStorageSync("opid") && (wx.showToast({
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
            userId: t.d.userId
        });
    },
    powerDrawer: function(t) {
        this.setData({
            msg: "",
            button_status: "default",
            image: [],
            img_button: "inline-block",
            imginfo: [],
            star: 0,
            starMap: [ "非常差", "差", "一般", "好", "非常满意，无可挑剔" ],
            allGoodsFilte: [ {
                name: "按时到达",
                value: "0",
                checked: !1
            }, {
                name: "洗车细致",
                value: "1",
                checked: !1
            }, {
                name: "服务态度好",
                value: "2",
                checked: !1
            } ],
            upload_picture_list: []
        }), e = t.target.dataset.id, wx.setStorageSync("eavodid", "" + e), console.log(e), 
        getCurrentPages()[getCurrentPages().length - 1].onLoad(), wx.request({
            url: "https://www.smxic.com/index.php/order/caiwu/update",
            data: {
                id: e
            },
            header: {
                "Content-Type": "application/json"
            },
            method: "GET",
            success: function(t) {
                console.log(t.data);
            },
            fail: function(t) {},
            complete: function() {}
        });
        var a = t.currentTarget.dataset.statu;
        this.util(a);
    },
    powerDrawers: function(t) {
        this.setData({
            msg: "",
            button_status: "default",
            image: [],
            img_button: "inline-block",
            imginfo: [],
            star: 0,
            starMap: [ "非常差", "差", "一般", "好", "非常满意，无可挑剔" ],
            allGoodsFilte: [ {
                name: "按时到达",
                value: "0",
                checked: !1
            }, {
                name: "洗车细致",
                value: "1",
                checked: !1
            }, {
                name: "服务态度好",
                value: "2",
                checked: !1
            } ],
            upload_picture_list: []
        }), e = t.target.dataset.id, wx.setStorageSync("eavodid", "" + e), console.log(e), 
        getCurrentPages()[getCurrentPages().length - 1].onLoad();
        var a = t.currentTarget.dataset.statu;
        this.util(a);
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
    myStarChoose: function(t) {
        var e = parseInt(t.target.dataset.star) || 0;
        console.log(e), wx.setStorageSync("stars", "" + e), this.setData({
            star: e
        });
    },
    choose: function() {
        this.setData({
            choose: !this.data.choose
        });
    },
    Submit: function(t) {
        var e = this.data.imginfo.join(","), a = wx.getStorageSync("selects"), o = wx.getStorageSync("stars"), n = wx.getStorageSync("eavodid"), i = wx.getStorageSync("idea");
        wx.showModal({
            title: "提示",
            content: "是否确认提交？",
            success: function(t) {
                t.confirm && wx.request({
                    url: "https://www.smxic.com/index.php/order/order/eav?selects=" + a + "&stars=" + o + "&imginfos=" + e + "&eavodid=" + n + "&idea=" + i,
                    header: {
                        "Content-Type": "applciation/json"
                    },
                    async: !0,
                    method: "POST",
                    success: function(t) {},
                    fail: function(t) {},
                    complete: function(t) {
                        wx.showToast({
                            title: "提交成功",
                            duration: 3e3
                        }), setTimeout(function() {
                            wx.navigateBack({
                                delta: 1
                            });
                        }, 2e3);
                    }
                });
            }
        });
    },
    feedbackInput: function(t) {
        console.log(t.detail.value.length);
        var e = t.detail.value;
        wx.setStorageSync("idea", "" + e), 0 == t.detail.value.length ? this.setData({
            button_status: "default"
        }) : this.setData({
            button_status: "primary"
        }), this.setData({
            msg: t.detail.value
        });
    },
    uploadImg: function() {
        var t = this, e = this.data.image;
        this.data.image.length < 4 && wx.chooseImage({
            count: 1,
            sizeType: [ "original", "compressed" ],
            sourceType: [ "album", "camera" ],
            success: function(e) {
                wx.uploadFile({
                    url: "https://www.smxic.com/index.php/order/order/upload",
                    filePath: e.tempFilePaths[0],
                    name: "file",
                    success: function(e) {
                        a.push(e.data), t.setData({
                            imginfo: a
                        });
                    }
                });
            },
            complete: function(a) {
                3 == t.data.image.length && t.setData({
                    img_button: "none"
                }), e.push(a.tempFilePaths), t.setData({
                    image: e
                });
            }
        });
    },
    delectImg: function(t) {
        var e = this.data.image;
        e.splice(t.currentTarget.dataset.num, 1), a.splice(t.currentTarget.dataset.num, 1), 
        this.setData({
            image: e,
            img_button: "inline-block",
            imginfo: a
        });
    },
    calling: function(t) {
        var e = t.currentTarget.id;
        console.log(t), wx.request({
            url: "https://www.smxic.com/index.php/order/order/workphone",
            data: {
                id: e
            },
            header: {
                "Content-Type": "application/json"
            },
            method: "GET",
            success: function(t) {
                console.log(t.data), wx.setStorageSync("phone", "" + t.data);
            },
            fail: function(t) {},
            complete: function() {}
        }), wx.makePhoneCall({
            phoneNumber: wx.getStorageSync("phone"),
            success: function() {
                console.log("拨打电话成功！");
            },
            fail: function() {
                console.log("拨打电话失败！");
            }
        });
    },
    getpay: function() {
        var t = this, e = wx.getStorageSync("opid");
        wx.request({
            url: "https://www.smxic.com/index.php/order/Csorder/orderinfo?openid=" + e,
            data: {},
            async: !0,
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            method: "POST",
            success: function(e) {
                console.log(e.data);
                e.data.otherSever;
                console.log(e.data.newOtherServer), t.setData({
                    payList: e.data
                });
            },
            fail: function(t) {},
            complete: function() {}
        });
    },
    getothersever: function() {
        var t = this;
        wx.request({
            url: "https://www.smxic.com/index.php/order/order/othersever?other=otherid",
            data: {},
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            method: "POST",
            success: function(e) {
                console.log(e.data), t.setData({
                    payList: e.data
                });
            },
            fail: function(t) {},
            complete: function() {}
        });
    },
    getcar: function() {
        var t = this, e = wx.getStorageSync("atuid");
        console.log(e), wx.request({
            url: "https://www.smxic.com/index.php/getdata/get/getcar?id=" + e,
            async: !0,
            data: {},
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            method: "POST",
            success: function(e) {
                console.log(e.data), t.setData({
                    cardetails: e.data
                });
            },
            fail: function(t) {},
            complete: function() {}
        });
    },
    modalcnt: function() {
        wx.showModal({
            title: "提示",
            content: "是否确定",
            success: function(t) {
                t.confirm ? console.log("用户点击确定") : t.cancel && console.log("用户点击取消");
            }
        });
    },
    onPullDownRefresh: function() {
        console.log("刷新"), wx.setNavigationBarTitle({
            title: "刷新中……"
        }), wx.showNavigationBarLoading(), this.getpay(), wx.hideNavigationBarLoading(), 
        wx.stopPullDownRefresh(), console.log("关闭"), wx.setNavigationBarTitle({
            title: "服务订单"
        });
    },
    serviceValChange: function(t) {
        var e = this.data.allGoodsFilte, a = t.detail.value, o = a.join(",");
        wx.setStorageSync("selects", "" + o), console.log(a);
        for (var n = 0; n < e.length; n++) -1 != a.indexOf(n + "") ? e[n].checked = !0 : e[n].checked = !1;
        this.setData({
            allGoodsFilte: e
        });
    },
    increase: function(t) {
        var e = t.detail.value, a = wx.getStorageSync("opid");
        console.log(e), wx.request({
            url: "https://www.smxic.com/index.php/editorCar/Editor/addcar?openid=" + a,
            data: e,
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            method: "POST",
            success: function(t) {
                wx.navigateBack({
                    delta: 1
                });
            }
        });
    },
    getcounts: function(t) {
        var e = this, a = wx.getStorageSync("opid");
        console.log(a), wx.request({
            url: "https://www.smxic.com/index.php/getdata/get/count?openid=" + a,
            async: !0,
            data: {},
            header: {
                "Content-Type": "application/json"
            },
            method: "GET",
            success: function(t) {
                console.log(t.data), e.setData({
                    counts: t.data
                });
            },
            fail: function(t) {},
            complete: function() {}
        });
    },
    switchTab: function(t) {
        this.setData({
            currentTab: t.detail.current
        }), this.checkCor();
    },
    swichNav: function(t) {
        var e = t.target.dataset.current;
        if (this.data.currentTaB == e) return !1;
        this.setData({
            currentTab: e
        });
    },
    checkCor: function() {
        this.data.currentTab > 4 ? this.setData({
            scrollLeft: 300
        }) : this.setData({
            scrollLeft: 0
        });
    }
});