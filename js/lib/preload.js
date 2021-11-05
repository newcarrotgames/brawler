function Preloader(ctx, assets, callback) {
    ctx.font = "2em press_start";
    ctx.textAlign = "center";
    ctx.fillText("loading... please wait",
        ctx.canvas.clientWidth / 2,
        ctx.canvas.clientHeight / 2);

    var progress = 0;
    var w = ctx.canvas.clientWidth / 2;
    var h = ctx.canvas.clientHeight / 2;
    ctx.rect(w / 2, h + 20, w, 20);
    ctx.stroke();

    var loadNextAsset = function(assetIndex) {
        progress = assetIndex / assets.length;
        ctx.beginPath();
        ctx.rect(w / 2, h + 20, (w / assets.length) * assetIndex, 20);
        ctx.fill();

        if (assetIndex >= assets.length) {
            setTimeout(callback, 100);
            return;
        }

        var asset = assets[assetIndex];
        setTimeout(function() {
            asset.load(loadNextAsset(++assetIndex));
        }, 100);
    };

    loadNextAsset(0);
}