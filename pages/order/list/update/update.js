Page(function(t, e, i) {
    return e in t ? Object.defineProperty(t, e, {
        value: i,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[e] = i, t;
}({
    data: {
        isChooseCity: !1,
        userlist: ""
    },
    onLoad: function(t) {
        this.getuser();
    },
    onShow: function() {
        this.onLoad();
    },
    chooseCity: function() {
        this.setData({
            isChooseCity: !0
        });
    },
    confirm: function(t) {
        var e = t.detail;
        console.log(e), this.setData({
            city: e,
            isChooseCity: !1
        });
    },
    formSubmit: function(t) {},
    bNameFn: function(t) {
        var e = t.name;
        Utils.Verification.special;
        return "" != e || (Utils.showModal("昵称不能为空"), !1);
    },
    bEmail: function(t) {
        var e = t.Email;
        return !!Utils.Verification.email.test(e) || (Utils.showModal("E-mail格式不正确"), !1);
    },
    getuser: function() {
        var t = this, e = wx.getStorageSync("opid");
        wx.request({
            url: "https://www.smxic.com/index.php/getdata/get/getuserinfo?openid=" + e,
            async: !0,
            data: {},
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            method: "POST",
            success: function(e) {
                var i = e.data;
                console.log(e.data), t.setData({
                    userlist: i
                });
            },
            fail: function(t) {},
            complete: function() {}
        });
    }
}, "formSubmit", function(t) {
    t.detail.value.tel;
    var e = t.detail.value, i = wx.getStorageSync("opid");
    wx.request({
        url: "https://www.smxic.com/index.php/getdata/get/updateinfo?openid=" + i,
        data: e,
        header: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        method: "POST",
        success: function(t) {
            wx.navigateBack({
                changed: !0
            });
        },
        fail: function(t) {},
        complete: function() {}
    });
}));