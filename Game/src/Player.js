
class Player extends Phaser.Sprite {
    constructor(game, x, y, img, tint, bullets, keys) {
        super(game, x, y, img)

        game.physics.arcade.enable(this)
        this.health = config.PLAYER_HEALTH
        this.body.isCircle = true
        this.scale.setTo(0.8,0.8)
        this.body.maxVelocity.x = config.PLAYER_MAX_VELOCITY
        this.body.maxVelocity.y = config.PLAYER_MAX_VELOCITY_JUMP
        

        this.body.collideWorldBounds = true
        this.body.allowRotation = false
        this.body.drag.set(config.PLAYER_DRAG)
        this.body.mass = config.MASS

        
        this.keys = {
            left: game.input.keyboard.addKey(keys.left),
            right: game.input.keyboard.addKey(keys.right),
            up: game.input.keyboard.addKey(keys.up),
            down: game.input.keyboard.addKey(keys.down),        
            fire: game.input.keyboard.addKey(keys.fire)
        }

        this.frame = 0
        this.score = 0

        this.bullets = bullets
    }        
 
    movePerson() {
        if (this.keys.left.isDown) {
            this.body.velocity.x = -config.PLAYER_VELOCITY_X
        }
        else if (this.keys.right.isDown) {
            this.body.velocity.x = +config.PLAYER_VELOCITY_X
        }

        else{
            this.body.velocity.x = 0
        }
    }
     
    update() {
        this.movePerson()
    }
}
