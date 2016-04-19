'use strict';

var Vector = require('victor');
var Unit = require('./unit');
var AStar = require('../common/aStar');
var ServerConstants = require('./constants/serverConstants');
var TileSize = require('../common/world').TileSize;

const waveSize = 3;

module.exports = class UnitManager {
	constructor(worldController){
		this._units = [];

		this.worldController = worldController;
		this.worldController.on(ServerConstants.TOWER_CREATED, this.worldChange.bind(this));		
	}

	get units(){
		return this._units;
	}

	setup(){
		this.startPos = this.worldController.world.grid[0][5];
		this.goal = this.worldController.world.grid[29][5];
	}

	newWave(){
		let path = this.getPath(this.startPos);
		this._units.push(new Unit(this.startPos.screenX, this.startPos.screenY, path));
	}

	update(delta){
		for (var i = 0; i < this._units.length; i++) {
			this._units[i].update(delta);
		};
	}

	worldChange(){
		for (var i = 0; i < this._units.length; i++) {
			this._units[i].path = this.getPath(this.worldController.world.getGridPos(this._units[i].x, this._units[i].y));
		};
	}

	getPath(pos){
		let grid = AStar.createNodeGrid(this.worldController.world.grid);
		return AStar.search(grid, grid[pos.x][pos.y], grid[this.goal.x][this.goal.y])
					.map(u => Vector.fromObject({ x: u.x * TileSize + TileSize / 2, y: u.y * TileSize + TileSize / 2 }));
	}
}