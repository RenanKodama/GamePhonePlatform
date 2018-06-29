class Portal extends Phaser.Sprite {
    constructor(game, x, y, img, type) {
       super(game, x, y, img)  
   
       game.physics.arcade.enable(this)
       
       this.body.setSize(50,50,15,10)
       this.body.isCircle = true
       this.body.allowGravity = false
       this.body.immovable = true    
       

       this.animations.play('portal',50,true)
    }            
} 