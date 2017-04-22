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
    };
    PhaserGame.prototype.update = function () {
        this.game.debug.text(String(this.game.time.fps), 2, 14, "#00ff00");
    };
    return PhaserGame;
}());
window.onload = function () {
    var game = new PhaserGame();
};
//# sourceMappingURL=game.js.map