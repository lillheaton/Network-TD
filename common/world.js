'use strict';

var EventEmitter = require('events');
var MathHelper = require('./utils/mathHelper');

const TileSize = 40;

module.exports = class World extends EventEmitter {
	constructor(){
		super();
		this.grid = [];
	}

	sync(grid){
		this.grid = grid;
		this.emit('change');
	}



	getTile(x, y) {
		let gridPos = this.getGridPos(x, y);

		if(gridPos.x < this.grid.length && gridPos.y < this.grid[0].length){
			return this.grid[gridPos.x][gridPos.y];
		}

		return null;
	}

	getGridPos(x, y){
		return {
			x: MathHelper.snapToFloor(x, TileSize) / TileSize,
			y: MathHelper.snapToFloor(y, TileSize) / TileSize
		};
	}

	createTower(vec){
		let tile = this.getTile(vec.x, vec.y);
		if(tile) { 
			// Is valid place to place the tile. Switch it and send it to the server
			console.log('Creating new tower (%s, %s)', vec.x, vec.y);

			let gridPos = this.getGridPos(vec.x, vec.y);
			this.grid[gridPos.x][gridPos.y].type = 'tower';
			this.emit('change');
			return true;
		}

		return false;
	}
};

module.exports.TileSize = TileSize;