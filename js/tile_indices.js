window.onload = function() {
    var htmlCanvas = document.getElementById('c'), ctx = htmlCanvas.getContext('2d');

    htmlCanvas.imageSmoothingEnabled= false;
    
    var tw = 10;    // number of tiles across
    var th = 9;    // number of tiles across
    var sw = 150;
    var sh = 150;

    htmlCanvas.width = sw * tw * 2;
    htmlCanvas.height = sh * th * 3;

    var ss = new SpriteSheet("img/char.png", 10, 9, function() {
        for (var i = 0; i < ss.f.length; i++) {
            ctx.fillText(i.toString(), i % tw * sw, Math.floor(i / tw) * sw + 20);
            ctx.drawImage(ss.f[i], i % tw * sw, Math.floor(i / tw) * sw);
        }
    });
};