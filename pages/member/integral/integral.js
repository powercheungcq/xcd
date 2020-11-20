var t = [ {
    name: "积分获得"
}, {
    name: "积分兑换记录"
} ];

Page({
    data: {
        tabs: t,
        slideOffset: 0,
        activeIndex: 0,
        sliderWidth: 96,
        contentHeight: 0
    },
    onLoad: function(t) {
        var e = this;
        wx.getSystemInfo({
            success: function(t) {
                console.log(t), e.setData({
                    sliderWidth: t.windowWidth / e.data.tabs.length,
                    sliderOffset: t.windowWidth / e.data.tabs.length * e.data.activeIndex,
                    contentHeight: t.windowHeight - t.windowWidth / 750 * 68
                });
            }
        });
    },
    bindChange: function(t) {
        var e = t.detail.current;
        this.setData({
            activeIndex: e,
            sliderOffset: this.data.sliderWidth * e
        });
    },
    navTabClick: function(t) {
        this.setData({
            sliderOffset: t.currentTarget.offsetLeft,
            activeIndex: t.currentTarget.id
        });
    }
});