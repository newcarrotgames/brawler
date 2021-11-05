function Asset(src) {
    this.src = src;
}

function SpriteAsset(src, pos) {
    Asset.call(this, src);
    this.load = function (callback) {
        this.sprite = null;
        var self = this;
        var img = new Image();
        img.onload = function () {
            var iw = this.width;
            var ih = this.height;
            var c = document.createElement('canvas');
            var cx = c.getContext('2d');
            c.width = iw;
            c.height = ih;
            cx.drawImage(img, 0, 0, iw, ih, 0, 0, iw, ih);
            self.sprite = c;
            if (callback)
                callback();
        };
        img.src = src;
    };

    this.render = function (ctx) {
        ctx.drawImage(this.sprite, this.pos[0], this.pos[1]);
    }
}

function SpriteSheetAsset(src, w, h) {
    Asset.call(this, src);
    this.w = w;
    this.h = h;
    this.frames = [];
    var self = this;

    this.load = function (callback) {
        var img = new Image();
        img.onload = function () {
            var iw = this.width;
            var ih = this.height;
            var t = self.w * self.h;
            var sw = iw / self.w;
            self.sw = sw;
            var sh = ih / self.h;
            self.sh = sw;
            for (var i = 0; i < t; i++) {
                var c = document.createElement('canvas');
                var cx = c.getContext('2d');
                c.width = sw;
                c.height = sh;
                cx.drawImage(img, i % self.w * sw, Math.floor(i / self.w) * sh, sw, sh, 0, 0, sw, sh);
                self.frames.push(c);
            }
            if (callback)
                callback();
        };
        img.src = src;
    }
}

function Player(input, pos) {
    SpriteSheetAsset.call(this, "img/char.png", 10, 9);
    this.input = input;
    this.speed = 3;
    this.animation = {
        states: {
            idle: [

                {frame: 60, time: 250},
                {frame: 61, time: 250},
                {frame: 62, time: 250},
                {frame: 63, time: 250},
                {frame: 64, time: 250},
                {frame: 65, time: 250},
                {frame: 66, time: 250},
                {frame: 67, time: 250}

                // {frame: 70, time: 5000},
                // {frame: 71, time: 250},
                // {frame: 72, time: 250},
                // {frame: 73, time: 250},
                // {frame: 74, time: 250},
                // {frame: 75, time: 250},
                // {frame: 76, time: 250},
                // {frame: 77, time: 250},
                // {frame: 78, time: 250}
            ],
            walking: [
                {frame: 40, time: 150},
                {frame: 41, time: 150},
                {frame: 42, time: 150},
                {frame: 43, time: 150}
            ],
            walkingBack: [
                {frame: 43, time: 150},
                {frame: 42, time: 150},
                {frame: 41, time: 150},
                {frame: 40, time: 150}
            ],
            punching1: [
                {frame: 30, time: 150},
                {frame: 31, time: 150}
                // {frame: 32, time: 150},
                // {frame: 33, time: 150},
                // {frame: 34, time: 150}
            ],
            punching2: [
                {frame: 33, time: 150},
                {frame: 34, time: 150}
                // {frame: 32, time: 150},
                // {frame: 33, time: 150},
                // {frame: 34, time: 150}
            ],
            kicking: [
                {frame: 50, time: 150},
                {frame: 51, time: 150},
                {frame: 52, time: 150}
                // {frame: 32, time: 150},
                // {frame: 33, time: 150},
                // {frame: 34, time: 150}
            ],
            jumping: []
        }
    };

    if (!pos)
        this.pos = [325, 300]; // 0=x, 1=y
    else
        this.pos = pos;

    this.currentState = this.animation.states.idle;

    var lastTime = (new Date()).getTime();
    var delta = 0;
    var stateIndex = 0;

    this.getNextState = function() {
        stateIndex++;
        if (stateIndex >= this.currentState.length)
            stateIndex = 0;
    };

    this.changeState = function(newState) {
        if (this.currentState != newState) {
            this.currentState = newState;
            stateIndex = 0;
        }
    };

    this.update = function (currentTime) {
        if (this.input.pressed[37]) {
            this.pos[0] -= this.speed;
            this.changeState(this.animation.states.walkingBack);
        } else if (this.input.pressed[38]) {
            this.pos[1] -= this.speed;
            this.changeState(this.animation.states.walking);
        } else if (this.input.pressed[39]) {
            this.pos[0] += this.speed;
            this.changeState(this.animation.states.walking);
        } else if (this.input.pressed[40]) {
            this.pos[1] += this.speed;
            this.changeState(this.animation.states.walking);
        } else if (this.input.pressed[65]) {
            this.changeState(this.animation.states.punching1);
        } else if (this.input.pressed[83]) {
            this.changeState(this.animation.states.punching2);
        } else if (this.input.pressed[90]) {
            this.changeState(this.animation.states.kicking);
        } else {
            this.changeState(this.animation.states.idle);
        }

        delta = currentTime - lastTime;
        if (delta > this.currentState[stateIndex].time) {
            this.getNextState();
            lastTime = currentTime;
        }
    };

    this.render = function(ctx) {
        ctx.drawImage(
            this.frames[this.currentState[stateIndex].frame],
            this.pos[0],
            this.pos[1]);
    };
}