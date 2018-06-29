
class Player extends Phaser.Sprite {
    constructor(game, x, y, img, tint, bullets, keys) {
        super(game, x, y, img)

        game.physics.arcade.enable(this)
        this.health = config.PLAYER_HEALTH
        //this.body.isCircle = true
        this.body.setSize(50, 143, 25, 15)
        this.anchor.setTo(0.4, 0.4)
        
        this.scale.setTo(0.5,0.5)
        this.body.maxVelocity.x = config.PLAYER_MAX_VELOCITY
        this.body.maxVelocity.y = config.PLAYER_MAX_VELOCITY_JUMP
        

        this.body.collideWorldBounds = true
        this.body.allowRotation = false
        this.body.drag.set(config.PLAYER_DRAG)
        this.body.mass = config.MASS
        
        this.animations.add('walk', [3,4,5,6,7,8,9,10,12], 30)
        this.animations.add('stay', [0,2], 30)
        
        
        this.keys = {
            left: game.input.keyboard.addKey(keys.left),
            right: game.input.keyboard.addKey(keys.right),
            andarL: game.input.keyboard.addKey(keys.andarL),
            andarR: game.input.keyboard.addKey(keys.andarR),        
            jump: game.input.keyboard.addKey(keys.jump)
        }

        this.frame = 0
        this.score = 0
        this.bullets = bullets

    }        
 
    movePerson() {
        if (this.keys.left.isDown || this.keys.andarL.isDown) {
            this.body.velocity.x = -config.PLAYER_VELOCITY_X

            if (this.scale.x > 0){
                this.scale.x *= -1
            }
            this.animations.play('walk',20)
        }
        else if (this.keys.right.isDown || this.keys.andarR.isDown) {
            this.body.velocity.x = +config.PLAYER_VELOCITY_X
            
            if (this.scale.x < 0){
                this.scale.x *= -1
            }
            this.animations.play('walk',20)
        }
        else{
            //this.animations.stop()
            this.body.velocity.x = 0
            this.animations.play('stay',0.85)   
        }

        if (this.keys.jump.isDown){
            this.jump()
        }

    }

    jump() {
        if(this.body.onFloor()){
            this.body.velocity.y += -config.PLAYER_MAX_JUMP
        }
    }
     
    update() {
        this.movePerson()
    }
}
