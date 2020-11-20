getApp() //, requirePlugin("myPlugin2");

Page({
    showModalStatus: !1,
    data: {
        carModel: [ {
            modelId: "001",
            modelName: "轿车"
        }, {
            modelId: "002",
            modelName: "SUV"
        }, {
            modelId: "003",
            modelName: "商务车"
        } ],
        model: "",
        currCarNumber: "请输入车牌",
        colorlist: [ {
            name: "白色",
            value: "0",
            checked: !1
        }, {
            name: "银色",
            value: "1",
            checked: !1
        }, {
            name: "蓝色",
            value: "2",
            checked: !1
        }, {
            name: "红色",
            value: "3",
            checked: !1
        }, {
            name: "黄色",
            value: "4",
            checked: !1
        }, {
            name: "金色",
            value: "5",
            checked: !1
        }, {
            name: "紫色",
            value: "6",
            checked: !1
        }, {
            name: "绿色",
            value: "7",
            checked: !1
        }, {
            name: "橙色",
            value: "8",
            checked: !1
        }, {
            name: "黑色",
            value: "9",
            checked: !1
        } ]
    },
    onSubmitClick: function() {
        var e = (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}).detail;
        "苏000000" == e.plateNum ? wx.showToast({
            title: "请选择正确车牌",
            icon: "none",
            duration: 2e3
        }) : (this.util("close"), this.setData({
            currCarNumber: e.plateNum
        }));
    },
    checkboxChange: function(e) {},
    modelbtn: function(e) {
        console.log(e.detail.value), this.setData({
            model: e.detail.value
        });
    },
    bindViewTap: function() {
        wx.navigateTo({
            url: "../logs/logs"
        });
    },
    onLoad: function(e) {},
    increase: function(e) {
        if ("请输入车牌" == e.detail.value.carNumber || "苏000000" == e.detail.value.carNumber || 0 == e.detail.value.carNumber.length || 0 == e.detail.value.carModel.length || 0 == e.detail.value.carBrand.length || 0 == e.detail.value.carColor.length) {
            var a = "1";
            0 == e.detail.value.carNumber.length && (a = "请输入车牌"), "请输入车牌" == e.detail.value.carNumber && (a = "请选择车牌"), 
            "苏000000" == e.detail.value.carNumber && (a = "你选择的车牌不符合要求"), 0 == e.detail.value.carModel.length && (a = "请选择车型"), 
            0 == e.detail.value.carBrand.length && (a = "请输入品牌"), 0 == e.detail.value.carColor.length && (a = "请输入颜色"), 
            wx.showToast({
                title: a,
                icon: "none",
                duration: 2e3
            });
        } else {
            var t = e.detail.value, n = wx.getStorageSync("opid");
            console.log(t), wx.request({
                url: "https://www.smxic.com/index.php/editorCar/Editor/addcar?openid=" + n,
                data: t,
                header: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                method: "POST",
                success: function(e) {
                    wx.navigateBack({
                        delta: 1
                    });
                }
            });
        }
    },
    bindPickerChange: function(e) {
        console.log(e.detail.value), this.setData({
            model: e.detail.value
        });
    },
    bindPickerChange1: function(e) {
        console.log(e.detail.value), this.setData({
            brand: e.detail.value
        });
    },
    powerDrawer2: function(e) {
        var a = e.currentTarget.dataset.statu;
        this.util(a);
        e.currentTarget.id;
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {},
    util: function(e) {
        var a = wx.createAnimation({
            duration: 200,
            timingFunction: "linear",
            delay: 0
        });
        this.animation = a, a.opacity(0).rotateX(-100).step(), this.setData({
            animationData: a.export()
        }), setTimeout(function() {
            a.opacity(1).rotateX(0).step(), this.setData({
                animationData: a
            }), "close" == e && this.setData({
                showModalStatus: !1
            });
        }.bind(this), 200), "open" == e && this.setData({
            showModalStatus: !0
        });
    }
});