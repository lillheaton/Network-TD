
import PIXI from 'pixi.js';
import Unit from './unit';

export default class UnitManager extends PIXI.Container {
	constructor(){
		super();
		this._units = [];
	}

	update(time){
		for (var i = 0; i < this._units.length; i++) {
			this._units[i].update(time);
		};
	}

	set units(units){
		console.log(units);
		this._units = units.map(s => new Unit(s.position, s.goal));

		this.children = [];
		for (var i = 0; i < this._units.length; i++) {
			this.addChild(this._units[i]);
		};
	}
}