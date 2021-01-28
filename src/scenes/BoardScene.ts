import Phaser from 'phaser';
import TextureKeys from '../consts/TextureKeys';

export default class BoardScene extends Phaser.Scene
{
	constructor()
	{
		super('game');
	}

	preload()
    {
		this.load.image(TextureKeys.Background, 'bgs/blue.png');
    }

    create()
    {
		const width = this.scale.width;
		const height = this.scale.height;
		this.add.image(width * 0.5, height * 0.5, 'background');
    }
}
