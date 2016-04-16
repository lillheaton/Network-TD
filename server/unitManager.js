'use strict';

var Unit = require('./unit');

module.exports = class UnitManager {
	constructor(){
		this._units = []
	}

	newWave(){
		this._units.push(new Unit(10, 10));
		this._units.push(new Unit(10, 20));
		this._units.push(new Unit(10, 30));
		this._units.push(new Unit(10, 40));
		this._units.push(new Unit(10, 50));
		this._units.push(new Unit(10, 60));
		this._units.push(new Unit(10, 70));
		this._units.push(new Unit(10, 80));
		this._units.push(new Unit(10, 90));
		this._units.push(new Unit(10, 100));
		this._units.push(new Unit(10, 110));
		this._units.push(new Unit(10, 120));
		this._units.push(new Unit(10, 130));
		this._units.push(new Unit(10, 140));
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