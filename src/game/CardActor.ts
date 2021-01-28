import Phaser from 'phaser'
import TextureKeys from '~/consts/TextureKeys';

export default class CardActor extends Phaser.GameObjects.Sprite
{

	/* Card id */
	private id!: number;

	constructor(scene: Phaser.Scene, x: number, y: number, id: number)
	{
		super(scene, x, y, TextureKeys.Cards, id);
		this.id = id;
	}
}