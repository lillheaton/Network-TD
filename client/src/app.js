
import PIXI from 'pixi.js';
import TowerDefence from './js/towerDefence';

class Game {
	constructor(){
		console.log("Game Started...");

		// Create the canvas
		this.renderer = PIXI.autoDetectRenderer(this.w, this.h, {backgroundColor : 0x000000, antialias: true});
		document.body.appendChild(this.renderer.view);

		// Create the stage
		this.stage = new PIXI.Container();

		// Create the TD
		this.TD = new TowerDefence();

		this.render();
	}

	// Will only be called once
	render(){
		this.TD.render(this.stage);

		this.renderer.render(this.stage);
		this.update();
	}

	update(){
		this.TD.update();

		// End with draw and continue update
		this.renderer.render(this.stage);
		window.requestAnimationFrame(this.update.bind(this));
	}
}

Game.prototype.h = window.innerHeight;
Game.prototype.w = window.innerWidth;

var game = new Game();