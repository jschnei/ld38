/// <reference path="../tsd/phaser.d.ts" />


class PhaserGame {
    game: Phaser.Game;
    player: Phaser.Sprite;
    cursors: Phaser.CursorKeys;
    objects: Phaser.Group;

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

    scaleToPlayer = () => {
        for(let object of this.objects.children){
            
            let tween = this.game.add.tween(object.scale).to({x: 0.5, y: 0.5}, 1000);
            tween.start();

            let midpoint = new PIXI.Point(0.5*(object.position.x+this.player.position.x),0.5*(object.position.y+this.player.position.y));
            tween = this.game.add.tween(object).to(midpoint);
            tween.start();
        }
    }

    preload = () => {
        this.game.time.advancedTiming = true;
    }

    create = () => {
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.cursors = this.game.input.keyboard.createCursorKeys();

        let playerBMD = this.game.add.bitmapData(32,32);

        playerBMD.ctx.beginPath();
        playerBMD.ctx.rect(0,0,32,32);
        playerBMD.ctx.fillStyle = '#ff0000';
        playerBMD.ctx.fill();

        this.player = this.game.add.sprite(32, 32, playerBMD);
        this.game.physics.arcade.enable(this.player);

        let objectBMD = this.game.add.bitmapData(32, 32);
        objectBMD.ctx.beginPath();
        objectBMD.ctx.rect(0,0,32,32);
        objectBMD.ctx.fillStyle = '#0000ff';
        objectBMD.ctx.fill();

        this.objects = this.game.add.group();
        this.objects.enableBody = true;
        for(let i=0;i<10;i++){
            let object: Phaser.Sprite = this.objects.create(Math.random()*600, Math.random()*600, objectBMD);
            object.body.immovable = true;
        }

    }

    update = () =>  {
        this.game.debug.text(String(this.game.time.fps), 2, 14, "#00ff00");

        this.game.physics.arcade.collide(this.player, this.objects);

        if (this.cursors.left.isDown){
            this.player.body.velocity.x = -150;
        }else if (this.cursors.right.isDown){
            this.player.body.velocity.x = 150;
        }else{
            this.player.body.velocity.x = 0;
        }

        if(this.cursors.up.isDown){
            this.player.body.velocity.y = -150;
        } else if (this.cursors.down.isDown){
            this.player.body.velocity.y = 150;
            this.scaleToPlayer();
        } else {
            this.player.body.velocity.y = 0;
        }
    }

}

window.onload = () => {
    var game = new PhaserGame();
}