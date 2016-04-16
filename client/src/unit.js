
import PIXI from 'pixi.js';
import { TileSize } from './world';
import Vector from 'victor';
import Steering from '../../common/steering';

const maxVelocity = new Vector(0.1, 0.1);

export default class Unit extends PIXI.Graphics {
	constructor(unit){
		super();

		this.updateValues(unit);

		this.lineStyle(2, 0xFFFFFF, 1);
		this.drawCircle(0, 0, TileSize / 2);
	}

	update(time){
		Steering.seek(this.position, maxVelocity, this.goal);
		this.x = this.position.x;
		this.y = this.position.y;
	}

	updateValues(unit){
		this.id = unit.id;
		this.position = Vector.fromObject(unit.position);
		this.goal = Vector.fromObject(unit.goal);

		this.x = unit.position.x;
		this.y = unit.position.y;
	}
}