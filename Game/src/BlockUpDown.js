class BlockUpDown extends Phaser.Sprite {
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
        this.body.velocity.y = -300    
        this.body.acceleration.y = 100

    }            
} 