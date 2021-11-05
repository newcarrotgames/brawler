function InputHandler() {
    this.pressed = [];
    var self = this;
    document.addEventListener('keydown', function(e) {
        self.pressed[e.keyCode] = 1;
    });

    document.addEventListener('keyup', function(e) {
        self.pressed[e.keyCode] = 0;
    });
}