function Dialog(text) {
    this.render = function(ctx) {
        ctx.globalAlpha = 0.5;
        ctx.fillRect(20,20,150,100);
        ctx.globalAlpha = 1.0;
    };

    this.update = function(currentTime) {

    };
}