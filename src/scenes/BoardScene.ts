import Phaser from 'phaser';
import CardActor from '~/game/CardActor';
import TextureKeys from '~/consts/TextureKeys';

const DEFAULT_BOARD_SIZE = 12;
const DEFAULT_MAX_COLUMNS = 4;

export default class BoardScene extends Phaser.Scene
{

	cards: CardActor[] = new Array();
	rows: number = Math.floor(DEFAULT_BOARD_SIZE / DEFAULT_MAX_COLUMNS);

	constructor()
	{
		super('game');
	}

	preload()
    {
		this.load.image(TextureKeys.Background, 'img/bg.png');
		this.load.spritesheet(TextureKeys.Cards, 'img/cards.png', { 
			frameWidth: 81, 
			frameHeight: 117, 
			endFrame: 13 
		});
    }

    create()
    {
		const width = this.scale.width;
		const height = this.scale.height;
		this.add.image(width * 0.5, height * 0.5, 'background');
		for(let i = 0; i < DEFAULT_BOARD_SIZE; i++) {
			const x = i % DEFAULT_MAX_COLUMNS * Math.floor(width / (DEFAULT_MAX_COLUMNS + 1)) + Math.floor(width / (DEFAULT_MAX_COLUMNS + 1));
			const y = Math.floor(i / DEFAULT_MAX_COLUMNS) * Math.floor(height / (this.rows + 1)) + Math.floor(height / (this.rows + 1));
			const card = new CardActor(this, x, y, 0);
			this.cards.push(card);
			this.add.existing(card);
		}
    }
}
