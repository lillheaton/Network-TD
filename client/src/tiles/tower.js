
import { TileSize } from '../../../common/world';
import Vector from 'victor';

export default class Tower {
	constructor(tile){
		this._tile = tile;
		this._multiplyVec = new Vector(TileSize / 2, TileSize / 2);
		this._setup();
	}

	_setup(){
		this._tile.clear();

		// Draw Circle
		this._tile.lineStyle(2, 0xFFFFFF, 1);
		this._tile.drawCircle(TileSize / 2, TileSize / 2, TileSize / 2);

		// Draw pointer
		if(this._tile.args[0] && this._tile.args[0][0].units){
			let target = this._tile.args[0][0].units[0],
				xDist = target.x - this._tile.x,
				yDist = target.y - this._tile.y,
				angle = Math.atan2(xDist, yDist),
				posX = TileSize / 2 + 40 * Math.sin(angle),
				posY = TileSize / 2 + 40 * Math.cos(angle);

			this._tile.moveTo(TileSize / 2, TileSize / 2);
			this._tile.lineTo(posX, posY);
		}
	}	

	update(time){
		this._setup();
	}
}