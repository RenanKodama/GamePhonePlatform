
class Player extends Phaser.Sprite {
    constructor(game, x, y, img, tint, bullets, keys) {
        super(game, x, y, img)

        game.physics.arcade.enable(this)
        this.health = config.PLAYER_HEALTH
        this.body.isCircle = true
        this.scale.setTo(0.2,0.2)
        this.body.maxVelocity.x = config.PLAYER_MAX_VELOCITY
        this.body.maxVelocity.y = config.PLAYER_MAX_VELOCITY_JUMP
        

        this.body.collideWorldBounds = true
        this.body.allowRotation = false
        this.body.drag.set(config.PLAYER_DRAG)
        this.body.mass = config.MASS

        
        this.cursors = {
            left: game.input.keyboard.addKey(keys.left),
            right: game.input.keyboard.addKey(keys.right),
            up: game.input.keyboard.addKey(keys.up),
            down: game.input.keyboard.addKey(keys.down),        
            fire: game.input.keyboard.addKey(keys.fire)
        }
    
        this.bullets = bullets
    }        
 

    // moveAndTurn() {
    //     if(this.alive){

    //         //movimentação por mouse ou touch
    //         if (this.game.input.mousePointer.isDown || this.game.input.pointer1.isDown) {
    //             let x = this.game.input.mousePointer.x + this.game.input.pointer1.x
    //             let y = this.game.input.mousePointer.y + this.game.input.pointer1.y                
                
    //             if(!this.body.x > this.game.input.pointer1.x){
    //                 this.game.physics.arcade.moveToXY(this, x, this.y, config.PLAYER_ACCELERATION);
    //             }   
    //             this.body.x += 10            
    //         }

    //         if (this.game.input.pointer2.isDown || this.cursors.up.isDown){
    //             this.body.y -= 30
    //         }

    //     }
        
    // }   
    
    update() {
        //this.moveAndTurn()
    }
}
