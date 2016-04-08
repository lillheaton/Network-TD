
import PIXI from 'pixi.js';
import { TileSize } from './world';

export default class Tower extends PIXI.Container {
	constructor(x, y){
		super();
		this.x = x;
		this.y = y;	

		this._setup();
	}

	_setup(){
		let graphics = new PIXI.Graphics();

		graphics.lineStyle(2, 0xFFFFFF, 1);
		graphics.drawCircle(this.x, this.y, TileSize / 2);

		this.addChild(graphics);
	}

	update(){
	
	}
}