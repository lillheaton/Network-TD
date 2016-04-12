
import PIXI from 'pixi.js';
import { TileSize } from './world';

export default class Tower extends PIXI.Graphics {
	constructor(x, y){
		super();
		this.x = x;
		this.y = y;	

		this._setup();
	}

	_setup(){
		this.lineStyle(2, 0xFFFFFF, 1);
		this.drawCircle(this.x, this.y, TileSize / 2);
	}

	update(){
	
	}
}