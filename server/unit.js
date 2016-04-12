'use strict';

var Steering = require('../common/steering');
var Vector = require('victor');

const maxVelocity = new Vector(0.1, 0.1);

module.exports = class Unit {
	constructor(x, y){
		this.position = new Vector(x, y);
		this.goal = new Vector(1000, y);
	}

	update(delta){
		Steering.seek(this.position, maxVelocity, this.goal);
	}
}