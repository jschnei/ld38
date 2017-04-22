var PhaserGame = (function () {
    function PhaserGame() {
        var _this = this;
        this.scaleToPlayer = function () {
            for (var _i = 0, _a = _this.objects.children; _i < _a.length; _i++) {
                var object = _a[_i];
                var curScale = object.scale;
                var tween = _this.game.add.tween(object.scale).to({ x: 0.5 * curScale.x, y: 0.5 * curScale.y }, 1000);
                tween.start();
                var midpoint = new PIXI.Point(0.5 * (object.position.x + _this.player.position.x), 0.5 * (object.position.y + _this.player.position.y));
                tween = _this.game.add.tween(object).to(midpoint);
                tween.start();
            }
        };
        this.preload = function () {
            _this.game.time.advancedTiming = true;
        };
        this.create = function () {
            _this.game.physics.startSystem(Phaser.Physics.ARCADE);
            _this.cursors = _this.game.input.keyboard.createCursorKeys();
            var playerBMD = _this.game.add.bitmapData(32, 32);
            playerBMD.ctx.beginPath();
            playerBMD.ctx.rect(0, 0, 32, 32);
            playerBMD.ctx.fillStyle = '#ff0000';
            playerBMD.ctx.fill();
            _this.player = _this.game.add.sprite(32, 32, playerBMD);
            _this.game.physics.arcade.enable(_this.player);
            var objectBMD = _this.game.add.bitmapData(32, 32);
            objectBMD.ctx.beginPath();
            objectBMD.ctx.rect(0, 0, 32, 32);
            objectBMD.ctx.fillStyle = '#0000ff';
            objectBMD.ctx.fill();
            _this.objects = _this.game.add.group();
            _this.objects.enableBody = true;
            for (var i = 0; i < 10; i++) {
                var object = _this.objects.create(Math.random() * 600, Math.random() * 600, objectBMD);
                object.body.immovable = true;
            }
            var key = _this.game.input.keyboard.addKey(Phaser.Keyboard.S);
            key.onDown.add(_this.scaleToPlayer, _this);
        };
        this.update = function () {
            _this.game.debug.text(String(_this.game.time.fps), 2, 14, "#00ff00");
            _this.game.physics.arcade.collide(_this.player, _this.objects);
            if (_this.cursors.left.isDown) {
                _this.player.body.velocity.x = -150;
            }
            else if (_this.cursors.right.isDown) {
                _this.player.body.velocity.x = 150;
            }
            else {
                _this.player.body.velocity.x = 0;
            }
            if (_this.cursors.up.isDown) {
                _this.player.body.velocity.y = -150;
            }
            else if (_this.cursors.down.isDown) {
                _this.player.body.velocity.y = 150;
            }
            else {
                _this.player.body.velocity.y = 0;
            }
        };
        this.game = new Phaser.Game(800, 600, Phaser.AUTO, 'content', { preload: this.preload,
            create: this.create,
            update: this.update
        });
    }
    return PhaserGame;
}());
window.onload = function () {
    var game = new PhaserGame();
};
//# sourceMappingURL=game.js.map