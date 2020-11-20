Page({
    data: {},
    tel: function() {
        wx.makePhoneCall({
            phoneNumber: "0510-86906666"
        });
    },
    onLoad: function(e) {},
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    formSubmit: function(e) {
        var n = wx.getStorageSync("opid"), o = e.detail.value.phone, t = e.detail.value.name, a = e.detail.value.idea;
        if (0 == e.detail.value.idea.length) {
            var i = "1";
            (!/^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/.test(o) || o.length > 11) && (i = "电话有误"), 
            0 == e.detail.value.phone.length && (i = "请输入联系电话"), 0 == e.detail.value.idea.length && (i = "请输入您的意见"), 
            wx.showToast({
                title: i,
                icon: "none",
                duration: 2e3
            });
        } else wx.request({
            url: "https://www.smxic.com/index.php/sample/Severice/fankui?openid=" + n + "&name=" + t + "&idea=" + a + "&phone=" + o,
            data: {},
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            method: "POST",
            success: function(e) {
                wx.showToast({
                    title: "反馈成功",
                    icon: "none",
                    duration: 1500
                }), wx.navigateBack({
                    delta: 1
                });
            },
            fail: function(e) {},
            complete: function() {}
        });
    },
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});