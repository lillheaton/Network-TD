'use strict';

var Steering = require('../common/steering');
var Vector = require('victor');
var uuid = require('node-uuid');
var TileSize = require('../common/world').TileSize;

const maxVelocity = new Vector(0.8, 0.8);

module.exports = class Unit {
	constructor(x, y, path){
		this.id = uuid.v1();
		this.position = new Vector(x + TileSize / 2, y + TileSize / 2);
		this.path = path;
	}

	get x(){
		return this.position.x;
	}

	get y(){
		return this.position.y;
	}

	update(delta){
		let currentGoal = this.path[0];
		let distance = this.position.distance(currentGoal);
		if(distance < 0.05){
			this.path.shift(); // Go to next position
		}
		Steering.seek(this.position, maxVelocity, currentGoal);
	}
}