Page({
    data: {
        tempFilePaths: "",
        nickName: "",
        userInfoAvatar: "",
        gender: "",
        province: "",
        userlist: ""
    },
    chooseimage: function() {
        var e = this;
        wx.chooseImage({
            count: 1,
            sizeType: [ "original", "compressed" ],
            sourceType: [ "album", "camera" ],
            success: function(t) {
                e.setData({
                    userInfoAvatar: t.tempFilePaths
                });
            },
            radioChange: function(e) {
                console.log("radio发生change事件，携带value值为：", e.detail.value);
            }
        });
    },
    onLoad: function() {
        var e = this;
        e.getuser(), e.getuserfxmy(), e.setData({
            userInfoAvatar: wx.getStorageSync("HeadUrl"),
            nickName: wx.getStorageSync("NickName"),
            gender: wx.getStorageSync("gender")
        });
    },
    xiugaibtn: function() {
        wx.navigateTo({
            url: "update/update"
        });
    },
    getuser: function() {
        var e = this, t = wx.getStorageSync("opid");
        wx.request({
            url: "https://www.smxic.com/index.php/getdata/get/getuserinfo?openid=" + t,
            async: !0,
            data: {},
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            method: "POST",
            success: function(t) {
                var a = t.data;
                console.log(t.data), e.setData({
                    userlist: a
                });
            },
            fail: function(e) {},
            complete: function() {}
        });
    },
    getuserfxmy: function() {
        var e = this, t = wx.getStorageSync("opid");
        wx.request({
            url: "https://www.smxic.com/index.php/order/Newget/getuserfxmy?openid=" + t,
            async: !0,
            data: {},
            header: {
                "Content-Type": "application/json"
            },
            method: "GET",
            success: function(t) {
                console.log(t.data[0].fname), e.setData({
                    fname: t.data[0].fname
                });
            },
            fail: function(e) {},
            complete: function() {}
        });
    },
    onShow: function() {
        this.onLoad();
    }
});