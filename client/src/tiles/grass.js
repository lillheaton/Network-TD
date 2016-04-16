
import { TileSize } from '../world';

export default class Grass {
	constructor(tile){
		this._tile = tile;
		this._setup();
	}

	_setup(){
		this._tile.lineStyle(1, 0xFFFFFF, 1);
		this._tile.drawRect(0, 0, TileSize, TileSize);
	}

	update(time){}
}