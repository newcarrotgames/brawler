/**
 * SpriteSheet
 * @param src URL to the complete sprite sheet
 * @param w Number of sprites wide (eg w=10, image width is 320, so tile width is 32)
 * @param h Number of sprites high (eg h=5, image width is 160, so tile height is 16)
 * @constructor Creates a new SpriteSheet object
 */
function SpriteSheet(src, w, h, callback) {
    this.f = [];
    this.ready = false;
    var self = this;
    var img = new Image();

    img.onload = function() {
        var iw = this.width;
        var ih = this.height;
        var t = w * h;
        var sw = iw / w;
        var sh = ih / h;
        console.log("sprite sheet: ", w, h, iw, ih, t, sw, sh);
        for (var i = 0; i < t; i++) {
            var c = document.createElement('canvas');
            var cx = c.getContext('2d');
            c.width = sw;
            c.height = sh;
            cx.drawImage(img, i % w * sw,  Math.floor(i / w) * sh, sw, sh, 0, 0, sw, sh);
            self.f.push(c);
        }
        self.ready = true;
        if (callback)
            callback();
    };
    img.src = src;
}

function Sprite(src, callback) {
    this.f = null;
    this.ready = false;
    var self = this;
    var img = new Image();
    img.onload = function() {
        var iw = this.width;
        var ih = this.height;
        var c = document.createElement('canvas');
        var cx = c.getContext('2d');
        c.width = iw;
        c.height = ih;
        cx.drawImage(img, 0,  0, iw, ih, 0, 0, iw, ih);
        self.f = c;
        self.ready = true;
        if (callback)
            callback;
    };
    img.src = src;
}

