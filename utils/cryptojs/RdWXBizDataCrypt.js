function e(e, t) {
    this.appId = e, this.sessionKey = t;
}

var t = require("./cryptojs.js").Crypto;

getApp();

e.prototype.decryptData = function(e, s) {
    var e = t.util.base64ToBytes(e), o = t.util.base64ToBytes(this.sessionKey), s = t.util.base64ToBytes(s), r = new t.mode.CBC(t.pad.pkcs7);
    try {
        var p = t.AES.decrypt(e, o, {
            asBpytes: !0,
            iv: s,
            mode: r
        }), a = JSON.parse(p);
    } catch (e) {
        console.log(e);
    }
    return a.watermark.appid !== this.appId && console.log(err), a;
}, module.exports = e;