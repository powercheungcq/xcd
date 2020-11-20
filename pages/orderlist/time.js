var t = getApp(), e = requirePlugin("myPluginCalendar");

Page({
    data: {
        kaitong: 0,
        isShow: !1,
        beginTime: "8:00",
        endTime: "22:00",
        timeGap: 120,
        themeColor: "#ffd00a",
        showOverdue: !0,
        calendarType: "yytimes",
        carAddress: "",
        cityid: "",
        carstate: ""
    },
    _yybindhide: function() {},
    _yybindchange: function(t) {
        var e = "";
        for (var i in t.detail.times) e += t.detail.times[i] + "    ";
        e = t.detail.month + "-" + t.detail.day + "   " + e, this.setData({
            dateStr: e
        });
    },
    cellClick: function() {
        this.setData({
            isShow: !0
        });
    },
    onLoad: function() {
        var i = this;
        e.getData(), t.getUserInfo(function(t) {
            i.setData({
                userInfo: t,
                loadingHidden: !0
            });
        }), this.loadOrderStatus();
    },
    onShow: function() {
        this.loadOrderStatus(), this.onLoad();
    },
    loadOrderStatus: function() {
        this.setData({
            userId: t.d.userId
        });
    },
    formSubmit: function(t) {
        var e = t.detail.value.startTime, i = wx.getStorageSync("timeid");
        wx.request({
            url: "https://www.smxic.com/index.php/order/order/uptime?timeid=" + i,
            data: {
                time: e
            },
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            method: "POST",
            success: function(t) {
                wx.navigateBack({
                    delta: 1
                });
            },
            fail: function(t) {},
            complete: function() {}
        });
    }
});