'use strict';

var Unit = require('./unit');

module.exports = class UnitManager {
	constructor(){
		this._units = []
	}

	newWave(){
		this._units.push(new Unit(10, 10));
	}

	update(delta){
		for (var i = 0; i < this._units.length; i++) {
			this._units[i].update(delta);
		};
	}

	get units(){
		return this._units;
	}
}