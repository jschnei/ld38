/// <reference path="../tsd/phaser.d.ts" />


class PhaserGame {
    game: Phaser.Game;
    player: Phaser.Sprite;
    cursors: Phaser.CursorKeys;

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
        let bmd = this.game.add.bitmapData(32,32);

        bmd.ctx.beginPath();
        bmd.ctx.rect(0,0,32,32);
        bmd.ctx.fillStyle = '#ff0000';
        bmd.ctx.fill();

        // use the bitmap data as the texture for the sprite
        this.player = this.game.add.sprite(32, 32, bmd);
        this.game.physics.arcade.enable(this.player);

        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.cursors = this.game.input.keyboard.createCursorKeys();
    }

    update() {
        this.game.debug.text(String(this.game.time.fps), 2, 14, "#00ff00");

        if (this.cursors.left.isDown)
        {
            this.player.body.velocity.x = -150;
        }
        else if (this.cursors.right.isDown)
        {
            this.player.body.velocity.x = 150;
        }else{
            this.player.body.velocity.x = 0;
        }

        
        if(this.cursors.up.isDown)
        {
            this.player.body.velocity.y = -150;
        }
        else if (this.cursors.down.isDown)
        {
            this.player.body.velocity.y = 150;
        }else{
            this.player.body.velocity.y = 0;
        }
    }

}

window.onload = () => {
    var game = new PhaserGame();
}