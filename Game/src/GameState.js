'use strict'

class GameState extends BaseState {

    create() {
        this.game.physics.startSystem(Phaser.Physics.ARCADE)
        this.game.physics.arcade.gravity.y = config.GRAVITY    

        let skyWidth = this.game.cache.getImage('background01').width
        let skyHeight = this.game.cache.getImage('background01').height
        this.sky = this.game.add.tileSprite(0, 0, skyWidth, skyHeight, 'background01')
        this.sky.scale.x = this.game.width / this.sky.width
        this.sky.scale.y = this.game.height / this.sky.height
        this.sky.fixedToCamera = true

        this.createTileMap()
        

        this.player1 = new Player(this.game, 100, 100,
            'personagem', 0xff0000, null, {
                left: Phaser.Keyboard.LEFT,
                right: Phaser.Keyboard.RIGHT,
                up: Phaser.Keyboard.UP,
                down: Phaser.Keyboard.DOWN,
                fire: Phaser.Keyboard.UP
            })

        this.game.add.existing(this.player1)
        this.game.camera.follow(this.player1, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1)        

        this.hud = {
            text1: this.createText(this.game.width * 1 / 9, 50, 'PLAYER 1: 20'),
            text2: this.createText(this.game.width * 8 / 9, 50, 'PLAYER 2: 20')
        }
        this.updateHud()

        let fps = new FramesPerSecond(this.game, this.game.width / 2, 50)
        this.game.add.existing(fps)

        let fullScreenButton = this.game.input.keyboard.addKey(Phaser.Keyboard.ONE)
        fullScreenButton.onDown.add(this.toggleFullScreen, this)

        this.initFullScreenButtons()

        

        let vpad = new VirtualGamepad(this.game)
        this.game.add.existing(vpad)

        //let jumpButton = vpad.addActionButton(
        //this.game.width-100, this.game.height-100, 'vstick_button',() => this.player1.jump())
        
        let dpadButton = vpad.addDPadButton(
            155, this.game.height-100, 'vstick_dpad', {
            leftPressed: () => this.player1.keys.left.isDown = true,
            //leftReleased: () => this.player1.keys.left.isDown = false,
            rightPressed: () => this.player1.keys.right.isDown = true,
            //rightReleased:() => this.player1.keys.right.isDown = false
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


    createTileMap() {
        this.map = this.game.add.tilemap('level1')

        this.map.addTilesetImage('tiles_spritesheet')
        this.map.addTilesetImage('damage_spike')
        
        this.mapLayer = this.map.createLayer('Tile Layer 1')
        
        this.mapLayer_DamageSpike = this.map.createLayer('Tile Layer DamageSpike')        
        

        this.map.setCollisionBetween(0, 300, true, 'Tile Layer 1')
        this.map.setCollisionBetween(0, 300, true, 'Tile Layer DamageSpike')    
        
        this.obstaclesSaw = this.game.add.group()
        this.obstaclesCoin = this.game.add.group()
        this.map.createFromObjects('Object Layer DamageSaw', 215,'damage_saw', 0, true, true, this.obstaclesSaw, Saw)
        this.map.createFromObjects('Object Layer ItemCoin', 216,'Coin', 0, true, true, this.obstaclesCoin, Coin)
        
        this.iniciarCoins()



        //this.map.setTileIndexCallback(29, this.hitSpikes, this)
        
        this.mapLayer.resizeWorld()
    }

    hitSpikes(sprite, tile) {
        sprite.alpha = 0.5
        tile.alpha = 0
        // força atualizaçao dos tiles no map
        this.mapLayer.dirty = true 
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
        this.sky.tilePosition.x -= 0.5


        // colisoes com mapa
        this.game.physics.arcade.collide(this.player1, this.mapLayer)


        this.game.physics.arcade.collide(this.player1, this.mapLayer_DamageSpike)

        // colisao com serras
        this.game.physics.arcade.collide(this.player1, this.obstaclesSaw, this.hitObstacle, null, this)
    }


    hitObstacle(player, obstacle) {
        if (player.alive) {
            player.damage(1)
            if (!player.alive)
                this.game.camera.follow(null)
            
            this.updateHud()
            this.game.camera.shake(0.01, 200);

            // empurra jogador na direcao oposta a da colisao
            let forceDirection = this.game.physics.arcade.angleBetween(obstacle, player)
            this.game.physics.arcade.velocityFromRotation(forceDirection, 600, player.body.velocity)
        }
    }

    hitPlayer(player, bullet) {
        if (player.alive) {
            player.damage(1)
            bullet.kill()
            this.createExplosion(bullet.x, bullet.y)
            this.updateHud()
            this.game.camera.shake(0.01, 200);
        }
    }

    updateHud() {
        this.hud.text1.text = `PLAYER 1: ${this.player1.health}`
    }

    render() {
        //this.game.debug.body(this.mapLayer)

        this.obstaclesSaw.forEach(function(obj){ 
            this.game.debug.body(obj)
        },this)

        
        //this.game.debug.body(this.player1)
        //game.debug.body(player2)
    }
}