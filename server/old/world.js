'use strict';

const EventEmitter = require('events');

module.exports = class World extends EventEmitter {
	constructor(columns, rows){
		super();

		this.columns = columns;
		this.rows = rows;
		this.grid = [];
	}

	_generateGrid(){
		for (var i = 0; i < this.columns; i++) {
			this.grid[i] = [];

			for (var j = 0; j < this.rows; j++) {
				this.grid[i][j] = { type: "grass", isWall() { return this.type === 'tower' } };
			};
		};

		this.emit('change');
	}




	construct(){
		this._generateGrid();
	}

	newTower(incoming){
		console.log('Creating new tower (%s, %s)', incoming.tower.x, incoming.tower.y);
		this.grid[incoming.tower.x][incoming.tower.y].type = "tower";

		this.emit('change');
	}
}