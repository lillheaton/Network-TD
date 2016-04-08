
import PIXI from 'pixi.js';
import { TileSize } from './world';

const Tiles = {

	Grass(x, y){
		let graphics = new PIXI.Graphics();
		graphics.lineStyle(1, 0xFFFFFF, 1);
		graphics.drawRect(x, y, TileSize, TileSize);
		return graphics;
	},

	Wall(){

	}
};

export default Tiles;