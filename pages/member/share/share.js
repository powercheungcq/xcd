getApp();

var t = "";

Page({
    data: {
        num: 0,
        noAddress: !1,
        carInfo: []
    },
    chooseAddress: function(t) {
        var e = t.currentTarget.dataset.id;
        this.setData({
            num: e
        });
    },
    editUserInfo: function(e) {
        var a = this;
        t = e.target.dataset.id, wx.setStorageSync("courseId", "" + e.currentTarget.id);
        var o = wx.getStorageSync("opid");
        console.log(t), wx.request({
            url: "https://www.smxic.com/index.php/editorCar/Editor/editorCar?openid=" + o,
            async: !0,
            data: {
                id: t
            },
            header: {
                "Content-Type": "application/json"
            },
            method: "GET",
            success: function(t) {
                console.log(t.data), a.setData({
                    car: t.data
                }), wx.navigateTo({
                    url: "../../member/share/edit?id=id"
                });
            },
            fail: function(t) {},
            complete: function() {}
        });
    },
    increase: function() {
        wx.navigateTo({
            url: "../../member/share/xz/xz"
        });
    },
    onLoad: function() {
        this.getdata();
    },
    getdata: function() {
        var t = this, e = wx.getStorageSync("opid");
        wx.request({
            url: "https://www.smxic.com/index.php/editorCar/Editor/getCar?openid=" + e,
            data: {},
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            method: "POST",
            success: function(e) {
                console.log(e.data), t.setData({
                    carInfo: e.data
                });
            },
            fail: function(t) {},
            complete: function() {}
        });
    },
    onShow: function() {
        this.getdata();
    },
    onPullDownRefresh: function() {
        console.log("刷新"), wx.setNavigationBarTitle({
            title: "刷新中……"
        }), wx.showNavigationBarLoading(), this.getdata(), wx.hideNavigationBarLoading(), 
        wx.stopPullDownRefresh(), console.log("关闭"), wx.setNavigationBarTitle({
            title: "我的车辆"
        });
    }
});