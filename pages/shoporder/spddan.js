getApp();

var t = "";

Page({
    data: {
        navTab: [ "待付款", "待收货", "待确认", "待评价" ],
        moneyInfo: [ , , , , ,  ],
        currentNavtab: 0,
        produt: [],
        test: [ {
            testName: "张师傅",
            testPhone: "18262206125",
            testInfo: "催单",
            testState: "1"
        } ],
        choose: !1,
        imgPath: "../../images/pic.png",
        imgPath2: "",
        imgPath3: "",
        imgLen: 0,
        temp: [],
        star: 0,
        starMap: [ "非常差", "差", "一般", "好", "非常满意，无可挑剔" ]
    },
    onLoad: function() {
        this.getdata(), wx.setNavigationBarTitle({
            title: "商品管理订单"
        }), this.setData({});
    },
    getdata: function() {
        var t = this;
        wx.request({
            url: "https://www.smxic.com/index.php/shop/shop/getshopoder",
            data: {},
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            method: "POST",
            success: function(a) {
                console.log(a.data), t.setData({
                    produt: a.data
                });
            },
            fail: function(t) {},
            complete: function() {}
        });
    },
    catchtouchstart: function(t) {
        this.setData({
            startPoint: [ t.touches[0].clientX, t.touches[0].clientY ]
        });
    },
    shoppay: function(a) {
        t = a.target.dataset.id, wx.setStorageSync("shopid", "" + a.currentTarget.id), console.log(t), 
        wx.navigateTo({
            url: "../component/subOrder/shoporder"
        }), wx.request({
            url: "https://www.smxic.com/index.php/shop/shop/payshop",
            async: !0,
            data: {
                id: t
            },
            header: {
                "Content-Type": "application/json"
            },
            method: "GET",
            success: function(t) {
                console.log(t.data);
            },
            fail: function(t) {},
            complete: function() {}
        });
    },
    catchtouchend: function(t) {
        var a = this, e = parseInt(this.data.currentNavtab), i = [ t.changedTouches[0].clientX, t.changedTouches[0].clientY ], n = a.data.startPoint;
        i[0] <= n[0] ? Math.abs(i[0] - n[0]) >= Math.abs(i[1] - n[1]) && e < this.data.navTab.length - 1 && (e += 1) : Math.abs(i[0] - n[0]) >= Math.abs(i[1] - n[1]) && e > 0 && (e -= 1), 
        this.setData({
            currentNavtab: e
        });
    },
    switchTab: function(t) {
        this.setData({
            currentNavtab: t.currentTarget.dataset.idx
        });
    },
    callEvent: function(t) {
        console.log(t), wx.makePhoneCall({
            phoneNumber: this.data.phoneNum
        });
    },
    goDeatailEvent: function() {
        wx.navigateTo({
            url: "../category/ordercategory/ordercategory"
        });
    },
    eavbtn: function() {
        wx.navigateTo({
            url: "../category/evalua"
        });
    },
    paybtn: function() {
        wx.navigateTo({
            url: "../severice/severice"
        });
    },
    againbtn: function() {
        wx.navigateTo({
            url: "../address/add/add"
        });
    },
    powerDrawer: function(t) {
        var a = t.currentTarget.dataset.statu;
        this.util(a);
    },
    util: function(t) {
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
            }), "close" == t && this.setData({
                showModalStatus: !1
            });
        }.bind(this), 200), "open" == t && this.setData({
            showModalStatus: !0
        });
    },
    myStarChoose: function(t) {
        var a = parseInt(t.target.dataset.star) || 0;
        this.setData({
            star: a
        });
    },
    choose: function() {
        this.setData({
            choose: !this.data.choose
        });
    },
    choosePic: function() {
        console.log(this.data.temp);
        var t = this;
        "../../images/pic.png" == this.data.imgPath && wx.chooseImage({
            count: 3,
            sizeType: [ "original", "compressed" ],
            sourceType: [ "album", "camera" ],
            success: function(a) {
                var e = a.tempFilePaths.length, i = [ t.data.imgPath2, t.data.imgPath3, t.data.imgPath ];
                if (0 == t.data.imgLen) for (n = 0; n < e; n++) i[n] = a.tempFilePaths[n]; else for (var n = t.data.imgLen, s = 0; s < e && n < 3; n++, 
                s++) i[n] = a.tempFilePaths[s], console.log(i);
                var o = e + t.data.imgLen;
                o > 3 && (o = 3), t.setData({
                    imgLen: o,
                    temp: i,
                    imgPath2: i[0],
                    imgPath3: i[1],
                    imgPath: i[2]
                });
            }
        });
    },
    toSubmit: function() {
        wx.uploadFile({
            url: "",
            filePath: this.data.imgPath,
            name: "file",
            formData: {},
            success: function(t) {
                console.log(t);
            }
        });
    },
    del: function(t) {
        var a = t.currentTarget.dataset.id;
        0 == a ? "../../images/pic.png" != this.data.imgPath ? this.setData({
            imgPath2: this.data.imgPath3,
            imgPath3: this.data.imgPath,
            imgPath: "../../images/pic.png",
            imgLen: this.data.imgLen - 1
        }) : this.setData({
            imgPath2: this.data.imgPath3,
            imgPath3: "",
            imgLen: this.data.imgLen - 1
        }) : 1 == a ? "../../images/pic.png" != this.data.imgPath ? this.setData({
            imgPath3: this.data.imgPath,
            imgPath: "../../images/pic.png",
            imgLen: this.data.imgLen - 1
        }) : this.setData({
            imgPath3: "",
            imgLen: this.data.imgLen - 1
        }) : 2 == a && this.setData({
            imgPath: "../../images/pic.png",
            imgLen: this.data.imgLen - 1
        });
    },
    calling: function() {
        wx.makePhoneCall({
            phoneNumber: "1008611",
            success: function() {
                console.log("拨打电话成功！");
            },
            fail: function() {
                console.log("拨打电话失败！");
            }
        });
    }
});