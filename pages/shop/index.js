getApp();

var t = "";

Page({
    data: {
        imgUrls: [ "/images/xcg.jpg", "/images/xcg1.jpg" ],
        indicatorDots: !1,
        autoplay: !1,
        interval: 3e3,
        duration: 800,
        shopList: [],
        uploadImgUrl: "",
        staticImgUrl: ""
    },
    onLoad: function() {
        this.getshop();
        var t = this, o = getApp().d.staticImgUrl, a = getApp().d.uploadImgUrl;
        console.log(o), console.log(a), t.setData({
            staticImgUrl: o,
            uploadImgUrl: a
        });
    },
    detailsbtn: function(o) {
        wx.setStorageSync("shopid", "" + o.currentTarget.dataset.id), console.log(t), wx.navigateTo({
            url: "details/details?id=" + t
        });
    },
    getshop: function() {
        var t = this;
        wx.request({
            url: "https://www.smxic.com/index.php/shop/shop/shop",
            data: {},
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            method: "POST",
            success: function(o) {
                console.log(o.data), t.setData({
                    shopList: o.data
                });
            },
            fail: function(t) {},
            complete: function() {}
        });
    },
    confirmbtn: function(o) {
        t = o.target.dataset.id, console.log(t), wx.request({
            url: "https://www.smxic.com/public/index.php/shop/shop/cartAdd",
            data: {
                id: t
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
    }
});