'use strict'

class BootState extends Phaser.State {

    preload() {

        this.game.load.image('background01', 'assets/Imagens/background1.png')
        this.game.load.image('personagem', 'assets/Imagens/personagem.png')
        this.game.load.image('title', 'assets/Imagens/title.png')

        this.game.load.image('tiles_spritesheet','assets/Imagens/tiles_spritesheet.png')
        this.game.load.image('damage_spike','assets/Imagens/damage_spike.png')
        this.game.load.image('damage_saw','assets/Imagens/damage_saw.png')
        this.game.load.image('vstick_dpad','assets/Imagens/controls.png')
        this.game.load.image('vstick_button','assets/Imagens/controls_up.png')
        this.game.load.image('blockUpDown','assets/Imagens/BlockUpDown.png')
        this.game.load.spritesheet('Coin', 'assets/Imagens/coin.png', 32, 32)
        this.game.load.spritesheet('health', 'assets/Imagens/health.png', 35, 36)
        this.game.load.spritesheet('portal', 'assets/Imagens/portal.png', 80,70)
        this.game.load.spritesheet('personagem01', 'assets/Imagens/personagem01.png', 99, 158)
        
        // map
        this.game.load.tilemap('level1', 'assets/Imagens/level1.json', null, Phaser.Tilemap.TILED_JSON)
        this.game.load.tilemap('level2', 'assets/Imagens/level2.json', null, Phaser.Tilemap.TILED_JSON)
        this.game.load.tilemap('level3', 'assets/Imagens/level3.json', null, Phaser.Tilemap.TILED_JSON)
        this.game.load.tilemap('level4', 'assets/Imagens/level4.json', null, Phaser.Tilemap.TILED_JSON)
        
    } 

    create() {
        console.log("BootState created")
        this.state.start('Title')
        
    }
}