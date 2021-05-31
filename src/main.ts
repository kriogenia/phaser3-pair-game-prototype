import Phaser from 'phaser';
import BoardScene from './scenes/BoardScene';
import Settings from './settings';

const config: Phaser.Types.Core.GameConfig = {
	type: Phaser.AUTO,
	width: Settings.width,
	height: Settings.height,
	scene: [BoardScene]
}

export default new Phaser.Game(config)
