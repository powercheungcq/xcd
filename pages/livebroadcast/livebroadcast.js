Page({
    data: {
        livearr: [],
        historyarr: []
    },
    onLoad: function(t) {
        var o = this;
        wx.request({
            url: "https://www.smxic.com/index.php/getdata/get/getliveinfo",
            method: "GET",
            success: function(t) {
                if (-1 != JSON.stringify(t.data.room_info).indexOf("101")) {
                    var n = [];
                    t.data.room_info.forEach(function(t) {
                        1 * t.live_status == 101 && n.push(t);
                    }), o.setData({
                        livearr: n
                    });
                }
                if (-1 != JSON.stringify(t.data.room_info).indexOf("103")) {
                    var i = [];
                    t.data.room_info.forEach(function(t) {
                        1 * t.live_status == 103 && i.push(t);
                    }), o.setData({
                        historyarr: i
                    });
                }
            }
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {},
    liveclick: function(t) {
        console.log(t.currentTarget.dataset.id), wx.navigateTo({
            url: "plugin-private://wx2b03c6e691cd7370/pages/live-player-plugin?room_id=" + t.currentTarget.dataset.id
        });
    }
});