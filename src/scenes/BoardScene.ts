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
		/* Set background */
		this.add.image(this.scale.width * 0.5, this.scale.height * 0.5, 'background');
		/* Create the cards */
		this.generateCards();
		
	}

	/**
	 * Fill the Cards array with pairs of cards
	 */
	private generateCards() : void
	{
		const width = this.scale.width;
		const height = this.scale.height;
		const ids = this.generateIds();
		for(let i = 0; i < DEFAULT_BOARD_SIZE; i++) {
			const x = i % DEFAULT_MAX_COLUMNS * Math.floor(width / (DEFAULT_MAX_COLUMNS + 1)) + Math.floor(width / (DEFAULT_MAX_COLUMNS + 1));
			const y = Math.floor(i / DEFAULT_MAX_COLUMNS) * Math.floor(height / (this.rows + 1)) + Math.floor(height / (this.rows + 1));
			const card = new CardActor(this, x, y, ids[i]);
			this.cards.push(card);
			this.add.existing(card);
		}
	}
	
	/**
	 * Generates a shuffle array of duplicated numbers
	 */
	private generateIds() : number[]
	{
		const ids = new Array();
		/* Create the ids array */
		for (let i = 0; i < DEFAULT_BOARD_SIZE * 0.5; i++) {
			ids.push(i);
			ids.push(i);
		}
		/* And shuffle it */
		for (let i = ids.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[ids[i], ids[j]] = [ids[j], ids[i]];
		}
		return ids;
	}
}
