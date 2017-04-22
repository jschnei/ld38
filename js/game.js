var PhaserGame = (function () {
    function PhaserGame() {
        this.game = new Phaser.Game(800, 600, Phaser.AUTO, 'content', { preload: this.preload,
            create: this.create,
            update: this.update
        });
    }
    PhaserGame.prototype.preload = function () {
        this.game.time.advancedTiming = true;
    };
    PhaserGame.prototype.create = function () {
        var bmd = this.game.add.bitmapData(32, 32);
        bmd.ctx.beginPath();
        bmd.ctx.rect(0, 0, 32, 32);
        bmd.ctx.fillStyle = '#ff0000';
        bmd.ctx.fill();
        this.player = this.game.add.sprite(32, 32, bmd);
        this.game.physics.arcade.enable(this.player);
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.cursors = this.game.input.keyboard.createCursorKeys();
    };
    PhaserGame.prototype.update = function () {
        this.game.debug.text(String(this.game.time.fps), 2, 14, "#00ff00");
        if (this.cursors.left.isDown) {
            this.player.body.velocity.x = -150;
        }
        else if (this.cursors.right.isDown) {
            this.player.body.velocity.x = 150;
        }
        else {
            this.player.body.velocity.x = 0;
        }
        if (this.cursors.up.isDown) {
            this.player.body.velocity.y = -150;
        }
        else if (this.cursors.down.isDown) {
            this.player.body.velocity.y = 150;
        }
        else {
            this.player.body.velocity.y = 0;
        }
    };
    return PhaserGame;
}());
window.onload = function () {
    var game = new PhaserGame();
};
//# sourceMappingURL=game.js.map