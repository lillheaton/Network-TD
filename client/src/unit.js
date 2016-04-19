
import PIXI from 'pixi.js';
import { TileSize } from '../../common/world';
import Vector from 'victor';
import Steering from '../../common/steering';

const maxVelocity = new Vector(0.8, 0.8);

export default class Unit extends PIXI.Graphics {
	constructor(unit){
		super();

		this.updateValues(unit);
		this._render();
	}

	_render(){
		this.lineStyle(2, 0xFFFFFF, 1);
		this.drawCircle(0, 0, TileSize / 2);
	}

	update(time){
		let currentGoal = this.path[0];
		let distance = this.position.distance(currentGoal);
		if(distance < 0.05){
			this.path.shift(); // Go to next position
		}

		Steering.seek(this.position, maxVelocity, currentGoal);
		this.x = this.position.x;
		this.y = this.position.y;
	}

	updateValues(unit){
		this.id = unit.id;
		this.position = Vector.fromObject(unit.position);
		this.path = unit.path.map(s => Vector.fromObject(s));

		this.x = unit.position.x;
		this.y = unit.position.y;
	}
}