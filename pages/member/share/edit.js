getApp() //, requirePlugin("myPlugin2");

Page({
    showModalStatus: !1,
    data: {
        userSex: [ {
            userId: "0001",
            sexName: "先生"
        }, {
            userId: "0002",
            sexName: "女士"
        } ],
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
        carinfo: [],
        id: "",
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
    onLoad: function(e) {
        this.getdata(), this.setData({
            id: e.id
        });
    },
    getdata: function() {
        var e = this, a = wx.getStorageSync("courseId");
        wx.request({
            url: "https://www.smxic.com/index.php/editorCar/Editor/editorCar?id=" + a,
            async: !0,
            data: {},
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            method: "POST",
            success: function(a) {
                console.log(a.data), e.setData({
                    carinfo: a.data,
                    currCarNumber: a.data[0].carNumber
                }), "轿车" == a.data[0].carModel && e.setData({
                    carModel: [ {
                        modelId: "001",
                        modelName: "轿车",
                        checked: "true"
                    }, {
                        modelId: "002",
                        modelName: "SUV"
                    }, {
                        modelId: "003",
                        modelName: "商务车"
                    } ]
                }), "SUV" == a.data[0].carModel && e.setData({
                    carModel: [ {
                        modelId: "001",
                        modelName: "轿车"
                    }, {
                        modelId: "002",
                        modelName: "SUV",
                        checked: "true"
                    }, {
                        modelId: "003",
                        modelName: "商务车"
                    } ]
                }), "商务车" == a.data[0].carModel && e.setData({
                    carModel: [ {
                        modelId: "001",
                        modelName: "轿车"
                    }, {
                        modelId: "002",
                        modelName: "SUV"
                    }, {
                        modelId: "003",
                        modelName: "商务车",
                        checked: "true"
                    } ]
                }), "白色" == a.data[0].carColor && e.setData({
                    colorlist: [ {
                        name: "白色",
                        value: "0",
                        checked: !0
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
                }), "银色" == a.data[0].carColor && e.setData({
                    colorlist: [ {
                        name: "白色",
                        value: "0",
                        checked: !1
                    }, {
                        name: "银色",
                        value: "1",
                        checked: !0
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
                }), "蓝色" == a.data[0].carColor && e.setData({
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
                        checked: !0
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
                }), "红色" == a.data[0].carColor && e.setData({
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
                        checked: !0
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
                }), "黄色" == a.data[0].carColor && e.setData({
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
                        checked: !0
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
                }), "金色" == a.data[0].carColor && e.setData({
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
                        checked: !0
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
                }), "紫色" == a.data[0].carColor && e.setData({
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
                        checked: !0
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
                }), "绿色" == a.data[0].carColor && e.setData({
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
                        checked: !0
                    }, {
                        name: "橙色",
                        value: "8",
                        checked: !1
                    }, {
                        name: "黑色",
                        value: "9",
                        checked: !1
                    } ]
                }), "橙色" == a.data[0].carColor && e.setData({
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
                        checked: !0
                    }, {
                        name: "黑色",
                        value: "9",
                        checked: !1
                    } ]
                }), "黑色" == a.data[0].carColor && e.setData({
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
                        checked: !0
                    } ]
                });
            },
            fail: function(e) {},
            complete: function() {}
        });
    },
    editcar: function(e) {
        if (0 == e.detail.value.carNumber.length || "苏000000" == e.detail.value.carNumber || 0 == e.detail.value.carModel.length || 0 == e.detail.value.carBrand.length || 0 == e.detail.value.carColor.length) {
            var a = "1";
            0 == e.detail.value.carNumber.length && (a = "请输入车牌"), 0 == e.detail.value.carModel.length && (a = "请选择车型"), 
            0 == e.detail.value.carBrand.length && (a = "请输入品牌"), "苏000000" == e.detail.value.carNumber && (a = "你选择的车牌不符合要求"), 
            0 == e.detail.value.carColor.length && (a = "请输入颜色"), wx.showToast({
                title: a,
                icon: "none",
                duration: 2e3
            });
        } else {
            var c = e.detail.value, d = wx.getStorageSync("courseId");
            console.log(c), wx.request({
                url: "https://www.smxic.com/index.php/editorCar/Editor/updateCar?id=" + d,
                data: c,
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
    delbtn: function(e) {
        var a = e.detail.value, c = wx.getStorageSync("courseId");
        console.log(a), wx.request({
            url: "https://www.smxic.com/index.php/editorCar/Editor/delCar?id=" + c,
            data: a,
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            method: "POST",
            success: function(e) {}
        }), wx.navigateBack({
            delta: 1
        });
    },
    radioChange: function(e) {
        console.log(e.detail.value), this.setData({});
    },
    savebtn: function() {
        wx.navigateBack({
            delta: 1
        });
    },
    address: function(e) {
        var a = this;
        wx.chooseLocation({
            success: function(e) {
                console.log(e), a.setData({
                    hasLocation: !0,
                    location: {
                        longitude: e.longitude,
                        latitude: e.latitude,
                        address: e.address
                    }
                });
            }
        });
    },
    openLocation: function(e) {
        var a = e.detail.value;
        wx.openLocation({
            longitude: Number(a.longitude),
            latitude: Number(a.latitude),
            address: String(a.address)
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {},
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
    powerDrawer2: function(e) {
        var a = e.currentTarget.dataset.statu;
        this.util(a);
        e.currentTarget.id;
    },
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