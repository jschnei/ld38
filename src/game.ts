/// <reference path="../tsd/phaser.d.ts" />


class PhaserGame {
    game: Phaser.Game;

    constructor() {
        this.game = new Phaser.Game(800, 
                                    600, 
                                    Phaser.AUTO, 
                                    'content', 
                                    {       preload: this.preload, 
                                            create: this.create, 
                                            update: this.update 
                                    });
    } 

    preload() {

        this.game.time.advancedTiming = true;
    }

    create() {
        
    }

    update() {
        this.game.debug.text(String(this.game.time.fps), 2, 14, "#00ff00");
        
    }

}

window.onload = () => {
    var game = new PhaserGame();
}