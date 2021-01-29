import Phaser from 'phaser'
import BoardScene from '~/scenes/BoardScene';
import TextureKeys from '~/consts/TextureKeys';

const HIDDEN_FRAME = 13;

export default class CardActor extends Phaser.GameObjects.Sprite
{

	/* Card id */
	id!: number;
	/* Card state */
	private isPressed = false;

	constructor(scene: Phaser.Scene, x: number, y: number, id: number)
	{
		super(scene, x, y, TextureKeys.Cards, HIDDEN_FRAME);
		this.id = id;
		/* Set mouse input */
		this.setInteractive().on('pointerdown', this.onPress);
	}

	/**
	 * Event OnClick. Sets the card as pressed and notifies the board
	 */
	onPress = () => {
		if (!this.isPressed) {
			this.isPressed = true;
			this.setFrame(this.id);
			(this.scene as BoardScene).cardPressed(this);
		}
	}

	/**
	 * Unselects and hides the card
	 */
	hide = () => {
		this.isPressed = false;
		this.setFrame(HIDDEN_FRAME);
	}

}