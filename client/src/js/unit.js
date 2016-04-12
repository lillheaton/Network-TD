
import PIXI from 'pixi.js';
import { TileSize } from './world';
import Vector from 'victor';
import Steering from '../../../common/steering';

const maxVelocity = new Vector(0.1, 0.1);

export default class Unit extends PIXI.Graphics {
	constructor(position, goal){
		super();

		this.x = position.x;
		this.y = position.y;
		
		this.position = Vector.fromObject(position);
		this.goal = Vector.fromObject(goal);

		this.lineStyle(2, 0xFFFFFF, 1);
		this.drawCircle(this.position.x, this.position.y, TileSize / 2);

		console.log(this.position);
	}

	update(time){
		Steering.seek(this.position, maxVelocity, this.goal);
		this.x = this.position.x;
		this.y = this.position.y;
	}
}