
import PIXI from 'pixi.js';


export default class Tile extends PIXI.Graphics {
	constructor(tileType, x, y, ...args){
		super();
		this.setRenderer(tileType, x, y, args);
	}

	update(time){
		this._renderer.update(time);
	}

	setRenderer(tileType, x, y, ...args){
		this.clear(); // Will clear everything that was drawn before

		this.x = x;
		this.y = y;
		this.args = args;
		this.tileType = tileType;

		this._renderer = new tileType(this); // Create the new renderer
	}
}