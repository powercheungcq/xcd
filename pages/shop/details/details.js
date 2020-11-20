function t(t, a, e) {
    return a in t ? Object.defineProperty(t, a, {
        value: e,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[a] = e, t;
}

var a;

getApp();

Page((a = {
    data: {
        goods: [],
        num: 1,
        totalNum: 0,
        hasCarts: !1,
        curIndex: 0,
        show: !1,
        scaleCart: !1,
        spec: [],
        carts: [ {
            num: 1
        } ],
        selectId: "",
        uploadImgUrl: "",
        staticImgUrl: ""
    },
    btnnew: function() {
        wx.navigateTo({
            url: "../subOrder/subOrder"
        });
    },
    addCount: function() {
        var t = this.data.num;
        t++, this.setData({
            num: t
        });
    },
    checkboxChange: function(t) {
        console.log(t.detail.value);
        var a = t.detail.value;
        this.setData({
            selectId: a
        });
    },
    addToCart: function() {
        var t = this, a = this.data.num, e = this.data.totalNum;
        t.setData({
            show: !0
        }), setTimeout(function() {
            t.setData({
                show: !1,
                scaleCart: !0
            }), setTimeout(function() {
                t.setData({
                    scaleCart: !1,
                    hasCarts: !0,
                    totalNum: a + e
                });
            }, 200);
        }, 300);
    },
    shopSubmit: function(t) {
        var a = t.detail.value;
        console.log(a), wx.request({
            url: "https://www.smxic.com/index.php/shop/shop/shopAdd",
            data: a,
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            method: "POST",
            success: function(t) {
                console.log(t.data);
            }
        });
    },
    onLoad: function() {
        this.getdata(), this.getshopinfo();
        var t = this, a = getApp().d.staticImgUrl, e = getApp().d.uploadImgUrl;
        console.log(a), console.log(e), t.setData({
            staticImgUrl: a,
            uploadImgUrl: e
        });
    },
    getdata: function() {
        var t = this;
        wx.request({
            url: "https://www.smxic.com/index.php/shop/shop/select",
            data: {},
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            method: "POST",
            success: function(a) {
                console.log(a.data), t.setData({
                    spec: a.data
                });
            },
            fail: function(t) {},
            complete: function() {}
        });
    },
    getshopinfo: function() {
        var t = this, a = wx.getStorageSync("shopid");
        wx.request({
            url: "https://www.smxic.com/index.php/shop/shop/getinfo?shopid=" + a,
            data: {},
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            method: "POST",
            success: function(a) {
                console.log(a.data), t.setData({
                    goods: a.data
                });
            },
            fail: function(t) {},
            complete: function() {}
        });
    },
    bindTap: function(t) {
        var a = parseInt(t.currentTarget.dataset.index);
        this.setData({
            curIndex: a
        });
    },
    powerDrawer: function(t) {
        var a = t.currentTarget.dataset.statu;
        this.util(a);
    },
    util: function(t) {
        var a = wx.createAnimation({
            duration: 200,
            timingFunction: "linear",
            delay: 0
        });
        this.animation = a, a.opacity(0).rotateX(-100).step(), this.setData({
            animationData: a.export()
        }), setTimeout(function() {
            a.opacity(1).rotateX(0).step(), this.setData({
                animationData: a
            }), "close" == t && this.setData({
                showModalStatus: !1
            });
        }.bind(this), 200), "open" == t && this.setData({
            showModalStatus: !0
        });
    }
}, t(a, "addCount", function(t) {
    var a = t.currentTarget.dataset.index, e = this.data.carts, o = e[a].num;
    o += 1, e[a].num = o, this.setData({
        carts: e
    }), this.getTotalPrice();
}), t(a, "minusCount", function(t) {
    var a = t.currentTarget.dataset.index, e = this.data.carts, o = e[a].num;
    if (o <= 1) return !1;
    o -= 1, e[a].num = o, this.setData({
        carts: e
    }), this.getTotalPrice();
}), t(a, "getTotalPrice", function() {
    for (var t = this.data.carts, a = 0, e = 0; e < t.length; e++) t[e].selected && (a += t[e].num * t[e].price);
    this.setData({
        carts: t,
        totalPrice: a.toFixed(2)
    });
}), t(a, "homebtn", function() {
    wx.switchTab({
        url: "/pages/component/index"
    });
}), a));