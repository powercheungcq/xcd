function t(t) {
    return (t = t.toString())[1] ? t : "0" + t;
}

var e = "https://www.itit123.cn";

module.exports = {
    formatTime: function(e) {
        var n = e.getFullYear(), r = e.getMonth() + 1, o = e.getDate(), u = e.getHours(), i = e.getMinutes(), a = e.getSeconds();
        return [ n, r, o ].map(t).join("/") + " " + [ u, i, a ].map(t).join(":");
    },
    req: function(t, n, r) {
        wx.request({
            url: e + t,
            data: n,
            method: "post",
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            success: function(t) {
                return "function" == typeof r && r(t.data);
            },
            fail: function() {
                return "function" == typeof r && r(!1);
            }
        });
    },
    trim: function(t) {
        return t.replace(/(^\s*)|(\s*$)/g, "");
    },
    isError: function(t, e) {
        e.setData({
            showTopTips: !0,
            errorMsg: t
        });
    },
    clearError: function(t) {
        t.setData({
            showTopTips: !1,
            errorMsg: ""
        });
    },
    getReq: function(t, n, r) {
        wx.request({
            url: e + t,
            data: n,
            method: "get",
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            success: function(t) {
                return "function" == typeof r && r(t.data);
            },
            fail: function() {
                return "function" == typeof r && r(!1);
            }
        });
    }
};