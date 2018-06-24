
class Saw extends Phaser.Sprite {
     constructor(game, x, y, img, type) {
        super(game, x, y, img)
        this.scale.setTo(5.5,5.5)
        this.anchor.setTo(0.5, 0.5)
    
        game.physics.arcade.enable(this)
        
        this.body.isCircle = true
        this.body.allowGravity = false
        this.body.immovable = true          
        
        this.body.collideWorldBounds = true;
	    this.body.bounce.setTo(1, 1);
	    this.body.velocity.x = 200

        game.add.tween(this)
            .to ( { alpha: 0.6 }, 500 )
            .to ( { alpha: 1.0 }, 500 )
            .loop(-1)
            .start()
    
        game.add.tween(this)
            .to ( { angle: -359 }, 2000 )
            .loop(-1)
            .start()
     }        
}