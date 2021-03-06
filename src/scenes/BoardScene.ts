import Phaser from 'phaser';
import CardActor from '~/game/CardActor';
import TextureKeys from '~/consts/TextureKeys';
import Settings from '~/settings';

export default class BoardScene extends Phaser.Scene
{
	/* Pointer to selected card */
	selected? : CardActor;
	/* Game attributes */
	cards = Settings.pairs * 2;
	pairsToMatch = Settings.pairs;
	/* Board sizes */
	columns = Settings.columns;
	rows: number = Math.floor(this.cards / this.columns);

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
			endFrame: 14 
		});
    }

    create()
    {
		/* Set background */
		this.add.image(this.scale.width * 0.5, this.scale.height * 0.5, 'background');
		/* Create the cards */
		this.generateCards();
		/* Hide context menu */
		this.input.mouse.disableContextMenu();
	}

	/**
	 * Card pressed event. Checks if the player made a pair or not and calls for the consequent action
	 * @param pressed 	Card pressed
	 */
	cardPressed = (pressed: CardActor): void => 
	{
		// Second pressed card
		if (this.selected) {
			(this.selected.id === pressed.id) 
				? this.matchPair() 										// Cards match
				: setTimeout(() => this.hideCards(pressed), 500);		// Cards do not match
		}
		// First pressed card
		else {
			this.selected = pressed;
		}
	} 

	/**
	 * Sets the pair as matched and checks for the win
	 */
	private matchPair = (): void => 
	{
		console.log("Pair match");
		this.selected = undefined;
		this.pairsToMatch--;
		this.checkWin();
	}

	/**
	 * Hides both selected cards and unselects them
	 * @param pressed 	Last selected card
	 */
	private hideCards = (pressed: CardActor): void => 
	{
		console.log(pressed);
		this.selected?.hide();
		pressed.hide();
		this.selected = undefined;
	}

	/**
	 * Checks and notifies when the player wins
	 */
	private checkWin = (): void => 
	{
		if (!this.pairsToMatch) {
			setTimeout(() => alert("You win"), 100);
		}
	}

	/**
	 * Fill the Cards array with pairs of cards
	 */
	private generateCards = (): void =>
	{
		const width = this.scale.width;
		const height = this.scale.height;
		const ids = this.generateIds();
		for(let i = 0; i < this.cards; i++) {
			const x = i % this.columns * Math.floor(width / (this.columns + 1)) + Math.floor(width / (this.columns + 1));
			const y = Math.floor(i / this.columns) * Math.floor(height / (this.rows + 1)) + Math.floor(height / (this.rows + 1));
			const card = new CardActor(this, x, y, ids[i]);
			this.add.existing(card);
		}
	}
	
	/**
	 * Generates a shuffle array of duplicated numbers
	 */
	private generateIds = (): number[] =>
	{
		const ids: number[] = [];
		/* Create the ids array */
		for (let i = 0; i < this.cards * 0.5; i++) {
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
