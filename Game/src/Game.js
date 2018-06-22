'use strict'

const config = {}
config.RES_X = 800 
config.RES_Y = 480

config.PLAYER_ACCELERATION = 100
config.PLAYER_TURN_VELOCITY = 350
config.PLAYER_MAX_VELOCITY = 300
config.PLAYER_VELOCITY_X = 150
config.PLAYER_MAX_JUMP = 200
config.PLAYER_HEALTH = 5
config.FRICTION = 80
config.GRAVITY = 200
config.PLAYER_DRAG = 80
config.MASS = 200
config.SCORE_COIN = 50

class Game extends Phaser.Game {
    constructor() {
        super(config.RES_X, config.RES_Y, Phaser.CANVAS,'game-container')
            
        // registrando as telas (Phaser.State) do jogo
        this.state.add('Boot', BootState, false)
        this.state.add('Title', TitleState, false)
        this.state.add('Game', GameState, false)
        this.state.start('Boot')
    }
}

let GAME = new Game()
