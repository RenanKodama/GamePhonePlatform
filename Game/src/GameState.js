'use strict'

class GameState extends BaseState {

    create() {
        this.game.physics.startSystem(Phaser.Physics.ARCADE)
        this.game.physics.arcade.gravity.y = config.GRAVITY    
 
        let backGroundWidth = this.game.cache.getImage('background01').width
        let backGroundHeight = this.game.cache.getImage('background01').height
        this.backGround = this.game.add.tileSprite(0, 0, backGroundWidth, backGroundHeight, 'background01')
        this.backGround.scale.x = this.game.width / this.backGround.width
        this.backGround.scale.y = this.game.height / this.backGround.height
        this.backGround.fixedToCamera = true

        this.createTileMap()
        
        this.player1 = new Player(this.game, 100, 100,
            'personagem01', 0xff0000, null, {
                left: Phaser.Keyboard.LEFT,
                right: Phaser.Keyboard.RIGHT,
                andarR: Phaser.Keyboard.S,
                andarL: Phaser.Keyboard.A,
                jump: Phaser.Keyboard.UP
            })
        
        this.game.add.existing(this.player1)
        this.game.camera.follow(this.player1, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1)        

        this.hud = {
            text1: this.createText(this.game.width * 1 / 9, 50, 'PLAYER 1: 20'),
            score: this.createText(this.game.width - 90, 50, 'SCORE: 0')
        }

        this.updateHud()

        let fps = new FramesPerSecond(this.game, this.game.width / 2, 50)
        this.game.add.existing(fps)

        let fullScreenButton = this.game.input.keyboard.addKey(Phaser.Keyboard.ONE)
        fullScreenButton.onDown.add(this.toggleFullScreen, this)

        this.initFullScreenButtons()

        let vpad = new VirtualGamepad(this.game)
        this.game.add.existing(vpad)

        let jumpButton = vpad.addActionButton(
        this.game.width-100, this.game.height-120, 'vstick_button',() => this.player1.jump())
        
        let dpadButton = vpad.addDPadButton(100, this.game.height - 120, 'vstick_dpad', {
                leftPressed: () => this.player1.keys.left.isDown = true,
                leftReleased: () => this.player1.keys.left.isDown = false,
                rightPressed: () => this.player1.keys.right.isDown = true,
                rightReleased: () => this.player1.keys.right.isDown = false
            })
    }


    iniciarCoins(){
        this.obstaclesCoin.forEach(function (exp) {
            let anim = exp.animations.add('full', null, 20, true) // null -> array of frames
            exp.scale.setTo(0.5, 0.5)
            exp.anchor.setTo(0.5, 0.5)
            exp.animations.play('full')
            anim.onComplete.add(() => exp.kill())
        })
    }

    iniciarHealth(){
        this.obstaclesHealth.forEach(function(exp){
            let anim = exp.animations.add('full', null, 20, true) // null -> array of frames
            exp.scale.setTo(0.6, 0.6)
            exp.anchor.setTo(0.5, 0.5)
            exp.animations.play('full')
            anim.onComplete.add(() => exp.kill())
        })
    }

    iniciarPortal(){
        this.obstaclesPortal.forEach(function(exp){
            let anim = exp.animations.add('full', null, 20, true) // null -> array of frames
            exp.scale.setTo(1.5, 1.5)
            exp.anchor.setTo(0.5, 0.5)
            exp.animations.play('full')
            anim.onComplete.add(() => exp.kill())
        })
    }


    createTileMap() {
        this.map = this.game.add.tilemap(config.LEVEL)

        this.map.addTilesetImage('tiles_spritesheet')
        this.map.addTilesetImage('damage_spike')
        
        this.mapLayer = this.map.createLayer('Tile Layer 1')
        this.mapLayer_DamageSpike = this.map.createLayer('Tile Layer DamageSpike')        
        

        this.map.setCollisionBetween(0, 300, true, 'Tile Layer 1')
        this.map.setCollisionBetween(0, 300, true, 'Tile Layer DamageSpike')    
        
        this.obstaclesSaw = this.game.add.group()
        this.obstaclesCoin = this.game.add.group()
        this.obstaclesBlockUpDown = this.game.add.group()
        this.obstaclesHealth = this.game.add.group()
        this.obstaclesPortal = this.game.add.group()

        this.map.createFromObjects('Object Layer DamageSaw', 215,'damage_saw', 0, true, true, this.obstaclesSaw, Saw)
        this.map.createFromObjects('Object Layer ItemCoin', 216,'Coin', 0, true, true, this.obstaclesCoin, Coin)
        this.map.createFromObjects('Object Layer BlockUpDown', 217,'blockUpDown', 0,true, true, this.obstaclesBlockUpDown, BlockUpDown)
        this.map.createFromObjects('Object Layer Health', 218,'health', 0,true, true, this.obstaclesHealth, Health)
        this.map.createFromObjects('Object Layer Portal', 219,'portal', 0,true, true, this.obstaclesPortal, Portal)

        this.iniciarCoins()
        this.iniciarHealth()
        this.iniciarPortal()

        this.mapLayer.resizeWorld()
    }

    toggleFullScreen() {
        this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL
        if (this.game.scale.isFullScreen) {
            this.game.scale.stopFullScreen()
        } else {
            this.game.scale.startFullScreen(false)
        }
    } 

    update() {
        this.backGround.tilePosition.x -= 0.5

        //colisoes com mapa
        this.game.physics.arcade.collide(this.player1, this.mapLayer, this.setAllowJump)

        //serra colidindo com o mapa
        this.game.physics.arcade.collide(this.obstaclesSaw, this.mapLayer)

        //blocksUpDown colidindo com o mapa
        this.game.physics.arcade.collide(this.obstaclesBlockUpDown, this.mapLayer)

        //colisao com espinhos
        this.game.physics.arcade.collide(this.player1, this.mapLayer_DamageSpike, this.hitSpikes, null, this)

        //colisao com serras
        this.game.physics.arcade.collide(this.player1, this.obstaclesSaw, this.hitSaw, null, this)
        
        //colisao com coins 
        this.game.physics.arcade.overlap(this.player1, this.obstaclesCoin, this.hitCoin, null, this)

        //colisao com blocksUpDown
        this.game.physics.arcade.collide(this.player1, this.obstaclesBlockUpDown, this.hitBlockUpDown, null, this)
        
        //colisao com healths
        this.game.physics.arcade.overlap(this.player1, this.obstaclesHealth, this.hitHealth, null, this)

        //colisao com o portal
        this.game.physics.arcade.overlap(this.player1, this.obstaclesPortal, this.hitPortal, null, this)

        this.updateHud()
    }

    setAllowJump(sprite, tile){
        sprite.jumpAllow = true
    }   

    hitPortal(sprite, tile){
        if (config.LEVEL === "level1"){
            config.LEVEL = "level2"
        }
        else{
            if (config.LEVEL == "level2"){
                config.LEVEL = "level3"
            }
            else{
                if (config.LEVEL == "level3"){
                    config.LEVEL = "level4"
                }
                else{
                    if (config.LEVEL == "level4"){
                        config.LEVEL = "level1"
                    }
                }
            }
        }
        this.game.state.restart()
    }

    hitHealth(sprite, tile){
        if(sprite.health < 5){
            sprite.health += config.ITEM_HEALTH
        }

        sprite.score += config.SCORE_HEALTH
        
        tile.kill()
    }

    hitBlockUpDown(sprite, block){
        sprite.damage(1)
        

        let forceDirection = this.game.physics.arcade.angleBetween(block, sprite)
        this.game.physics.arcade.velocityFromRotation(forceDirection, 700, sprite.body.velocity)
    }

    hitCoin(sprite, tile){
        sprite.score += config.SCORE_COIN
        tile.kill()
    }

    hitSpikes(sprite, tile) {
        sprite.damage(10)
    }

    hitSaw(player, obstacle) {
        if (player.alive) {
            player.damage(1)

            if (!player.alive)
                this.game.camera.follow(null)
            
            this.updateHud()
            this.game.camera.shake(0.01, 200);

            // empurra jogador na direcao oposta a da colisao
            let forceDirection = this.game.physics.arcade.angleBetween(obstacle, player)
            this.game.physics.arcade.velocityFromRotation(forceDirection, 700, player.body.velocity)
        }
    }

    updateHud() {
        this.hud.text1.text = `PLAYER 1: ${this.player1.health}`
        this.hud.score.text = `SCORE: ${this.player1.score}`
    }

    render() {
        
        this.obstaclesSaw.forEach(function(obj){ 
            this.game.debug.body(obj)
        },this)

        this.obstaclesCoin.forEach(function(obj){
            this.game.debug.body(obj)
        },this)

        this.obstaclesHealth.forEach(function(obj){
            this.game.debug.body(obj)
        },this)

        this.obstaclesPortal.forEach(function(obj){
            this.game.debug.body(obj)
        },this)

        this.game.debug.body(this.player1)   
    }
}