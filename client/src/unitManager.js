
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
		// Add new units
		let newUnits = units.filter(s => this._units.findIndex(x => x.id == s.id) < 0);
		for (var i = 0; i < newUnits.length; i++) {
			let u = new Unit(newUnits[i]);
			this.addChild(u);
			this._units.push(u);
		};

		// Update existing
		for (var i = 0; i < this._units.length; i++) {
			this._units[i].updateValues(units[i]);
		};

		// Remove old
		let oldUnits = this._units.filter(s => units.findIndex(x => x.id == s.id) < 0);
		for (var i = 0; i < oldUnits.length; i++) {
			let index = this._units.find(s => s.id == oldUnits[i].id),
				u = this._units[index];
			u.destroy();

			this._units.splice(index, 1);
		};
	}

	get units(){
		return this._units;
	}
}