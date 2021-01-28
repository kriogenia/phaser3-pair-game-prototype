import Phaser from 'phaser'

import BoardScene from './scenes/BoardScene'

const config: Phaser.Types.Core.GameConfig = {
	type: Phaser.AUTO,
	width: 640,
	height: 480,
	scene: [BoardScene]
}

export default new Phaser.Game(config)
