getApp();

var t = "";

Page({
    data: {
        carts: [],
        hasList: !1,
        totalPrice: 0,
        selectAllStatus: !0,
        uploadImgUrl: "",
        staticImgUrl: ""
    },
    onShow: function() {
        this.setData({
            hasList: !0,
            carts: []
        }), this.getTotalPrice();
    },
    onLoad: function() {
        this.getdata();
        var t = this, a = getApp().d.staticImgUrl, e = getApp().d.uploadImgUrl;
        console.log(a), console.log(e), t.setData({
            staticImgUrl: a,
            uploadImgUrl: e
        });
    },
    getdata: function() {
        var t = this;
        wx.request({
            url: "https://www.smxic.com/index.php/shop/shop/shop",
            data: {},
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            method: "POST",
            success: function(a) {
                console.log(a.data), t.setData({
                    carts: a.data
                });
            },
            fail: function(t) {},
            complete: function() {}
        });
    },
    selectList: function(t) {
        var a = t.currentTarget.dataset.index, e = this.data.carts, s = e[a].selected;
        e[a].selected = !s, this.setData({
            carts: e
        }), this.getTotalPrice();
    },
    deleteList: function(a) {
        var e = a.currentTarget.dataset.index, s = this.data.carts, o = this;
        t = a.target.dataset.id, console.log(t), wx.request({
            url: "https://www.smxic.com/index.php/shop/shop/updateShop",
            data: {
                id: t
            },
            header: {
                "Content-Type": "application/json"
            },
            method: "GET",
            success: function(t) {
                console.log(t.data), o.setData({
                    car: t.data
                });
            },
            fail: function(t) {},
            complete: function() {}
        }), s.splice(e, 1), this.setData({
            carts: s
        }), s.length ? this.getTotalPrice() : this.setData({
            hasList: !1
        });
    },
    selectAll: function(t) {
        var a = this.data.selectAllStatus;
        a = !a;
        for (var e = this.data.carts, s = 0; s < e.length; s++) e[s].selected = a;
        this.setData({
            selectAllStatus: a,
            carts: e
        }), this.getTotalPrice();
    },
    addCount: function(t) {
        var a = t.currentTarget.dataset.index;
        console.log(e);
        var e = this.data.carts;
        console.log(e);
        var s = e[a].num;
        s += 1, console.log(s), e[a].num = s, this.setData({
            carts: e
        }), this.getTotalPrice();
    },
    minusCount: function(t) {
        var a = t.currentTarget.dataset.index, e = this.data.carts, s = e[a].num;
        if (s <= 1) return !1;
        s -= 1, e[a].num = s, this.setData({
            carts: e
        }), this.getTotalPrice();
    },
    getTotalPrice: function() {
        for (var t = this.data.carts, a = 0, e = 0; e < t.length; e++) t[e].selected && (a += t[e].num * t[e].shopPrice);
        this.setData({
            carts: t,
            totalPrice: a.toFixed(2)
        });
    },
    homebtn: function() {
        wx.switchTab({
            url: "/pages/component/index"
        });
    }
});