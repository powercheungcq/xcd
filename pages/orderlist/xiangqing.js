getApp();

Page({
    data: {
        imglist0: "",
        imglist1: "",
        imglist2: ""
    },
    onLoad: function() {
        this.getimg();
    },
    getimg: function() {
        var t = this, i = wx.getStorageSync("orderid");
        console.log(i), wx.request({
            url: "https://www.smxic.com/index.php/order/order/getuserimg",
            data: {
                orderid: i
            },
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            method: "POST",
            success: function(i) {
                console.log(i.data[0]), t.setData({
                    imglist0: i.data[0],
                    imglist1: i.data[1],
                    imglist2: i.data[2],
                    imglist3: i.data[3]
                });
            },
            fail: function(t) {},
            complete: function() {}
        });
    }
});