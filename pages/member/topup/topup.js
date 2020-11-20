Page({
    data: {
        prepaidka: [],
        buymoney: 0
    },
    onLoad: function(a) {},
    onReady: function() {},
    onShow: function() {
        var a = wx.getStorageSync("opid"), t = this;
        this.buymoney = 0, wx.request({
            url: "https://www.smxic.com/index.php/card/Card/getCardType?openid=" + a,
            method: "post",
            success: function(a) {
                a.data.data.map(function(a) {
                    a.num = 0;
                }), t.setData({
                    prepaidka: a.data.data
                });
            }
        });
    },
    clickjia: function(a) {
        var t = 1 * a.target.dataset.index, e = this.data.buymoney, n = this.data.prepaidka;
        n[t].num++, this.setData({
            prepaidka: n,
            buymoney: 1 * e + 1 * n[t].sale_money
        });
    },
    clickjian: function(a) {
        var t = 1 * a.target.dataset.index, e = this.data.prepaidka, n = this.data.buymoney;
        0 !== e[t].num && (e[t].num--, this.setData({
            prepaidka: e,
            buymoney: 1 * n - 1 * e[t].sale_money
        }));
    },
    buyclick: function() {
        var a = wx.getStorageSync("opid"), t = [], e = this;
        this.data.prepaidka.forEach(function(a) {
            0 != a.num && t.push({
                id: a.id,
                num: a.num
            });
        }), wx.request({
            url: "https://www.smxic.com/index.php/card/Card/createCardOrder?openid=" + a,
            method: "POST",
            data: {
                order: JSON.stringify(t)
            },
            success: function(a) {
                e.theorder(a.data.data.ordersn);
            }
        });
    },
    theorder: function(a) {
        var t = wx.getStorageSync("opid");
        wx.request({
            url: "https://www.smxic.com/index.php/card/Card/wxpay?openid=" + t,
            method: "post",
            data: {
                ordersn: a
            },
            success: function(a) {
                wx.requestPayment({
                    timeStamp: a.data.arr.timeStamp,
                    paySign: a.data.arr.paySign,
                    signType: a.data.arr.signType,
                    package: a.data.arr.package,
                    nonceStr: a.data.arr.nonceStr,
                    success: function(a) {
                        wx.navigateTo({
                            url: "/pages/member/donate/donate"
                        });
                    }
                }), console.log(a.data.arr);
            }
        });
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});