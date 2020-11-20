var t = getApp();

Page({
    data: {
        isload: !0,
        isshow: !1,
        pageid: 1,
        idn: 0,
        pageno: 1,
        idx: 1,
        typeList: [ {
            name: "全部",
            id: "1"
        }, {
            name: "已使用",
            id: "2"
        }, {
            name: "未使用",
            id: "3"
        }, {
            name: "已过期",
            id: "4"
        } ],
        list: [],
        type: 1
    },
    binddetail: function(a) {
        var e = this, o = a.currentTarget.dataset.id;
        t.carmen({
            api: "/ticket/get_restaurant_qrcode",
            query: {
                id: o
            },
            success: function(t) {
                e.setData({
                    goodsfade: !0,
                    qrcode: t.data
                });
            }
        });
    },
    navigateToAddress: function() {
        wx.navigateTo({
            url: "/pages/order/chooseaddress/chooseaddress"
        });
    },
    goodsfade: function(t) {
        this.setData({
            goodsfade: !this.data.goodsfade
        });
    },
    changetab: function(t) {
        var a = this, e = t.currentTarget.dataset.id;
        this.setData({
            idx: e,
            type: e,
            list: [],
            pageno: 1
        }), a.loadinfo();
    },
    loadinfo: function() {
        var t = this, a = wx.getStorageSync("opid");
        wx.request({
            url: "https://www.smxic.com/index.php/wxpay/coupon/getmycouponlist",
            data: {
                pageno: t.data.pageno,
                pagesize: 9,
                type: this.data.type,
                openid: a
            },
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            method: "POST",
            success: function(a) {
                wx.hideLoading();
                var e = a.data.response.data;
                if (e = t.data.list.concat(e), t.setData({
                    list: e
                }), e.length < 1) 1 == t.data.pageno || wx.showToast({
                    title: "没有更多你的踪迹了"
                }); else {
                    var o = t.data.pageno;
                    o++, t.setData({
                        pageno: o
                    });
                }
            }
        });
    },
    onLoad: function(t) {
        var a = this;
        this.loadinfo(), wx.getSystemInfo({
            success: function(e) {
                a.setData({
                    winWidth: 750,
                    winHeight: 750 * e.windowHeight / e.windowWidth,
                    options: t
                });
            }
        });
    },
    onShow: function() {},
    onReachBottom: function(t) {
        var a = this;
        wx.showLoading({
            title: "加载中"
        }), setTimeout(function() {
            wx.hideLoading(), a.loadinfo();
        }, 1e3);
    },
    onPullDownRefresh: function() {
        var t = this;
        setTimeout(function() {
            t.setData({
                pageno: 1,
                list: [],
                type: t.data.type
            }), wx.stopPullDownRefresh(), t.loadinfo(), wx.showToast({
                title: "刷新成功",
                icon: "success",
                duration: 2e3
            });
        }, 1e3);
    },
    onShareAppMessage: function() {}
});