window.onload = function() {
    var canvas = document.getElementById('c');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    var ctx = canvas.getContext('2d');
    var assets = [];
    var entities = [];

    var input = new InputHandler();

    var bkg = new SpriteAsset("img/l1-bkg.png");
    var fg = new SpriteAsset("img/l1-fg.png");
    var main = new SpriteAsset("img/l1-main.png");

    var player = new Player(input);

    var dialog = new Dialog("Test");

    // preload
    assets.push(bkg);
    assets.push(fg);
    assets.push(main);
    assets.push(player);

    // gets updated/rendered every loop
    entities.push(player);
    entities.push(dialog);

    new Preloader(ctx, assets, function() {

        var music = document.createElement("audio");
        music.src = "sound/track1.mp3";
        music.play();

        var self = this;

        // how can I wire
        this.update = function (currentTime) {
            entities.forEach(function(entity) {
                entity.update(currentTime);
            });

            // console.log(pressed);
        };

        this.render = function() {
            // draw background elements
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(bkg.sprite, 0, 0, canvas.width, Math.floor(canvas.width / bkg.sprite.width) * bkg.sprite.height);
            ctx.drawImage(main.sprite, 0, 0, canvas.width, Math.floor(canvas.width / main.sprite.width) * main.sprite.height);

            entities.forEach(function(entity) {
                entity.render(ctx);
            });

            // draw foreground elements
            ctx.drawImage(fg.sprite, 0, 0, canvas.width, Math.floor(canvas.width / fg.sprite.width) * fg.sprite.height);
        };

        var lastTime = (new Date()).getTime(),
            currentTime = 0,
            delta = 0;

        this.step = function() {
            currentTime = (new Date()).getTime();
            delta = (currentTime - lastTime) / 1000;
            self.update(currentTime);
            self.render();
            window.requestAnimationFrame(self.step);
        };

        window.requestAnimationFrame(this.step);
    });
};