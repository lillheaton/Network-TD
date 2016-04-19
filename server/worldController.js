'use strict';

var EventEmitter = require('events')
var World = require('../common/world');

var CommunicationConstants = require('../common/constants/communicationConstants');
var ServerConstants = require('./constants/serverConstants');

module.exports = class WorldController extends EventEmitter {
	constructor(game){
		super();
		this.game = game;
		this.world = new World();

		// Listen to players
		for (var i = 0; i < this.game.players.length; i++) {
			this.game.players[i].on(CommunicationConstants.CLIENT_WORLD_CREATE_TOWER_EVENT, this.newTower.bind(this));
		};
	}

	construct(columns, rows) {
		// Generate a empty grass grid
		let grid = [];
		for (var i = 0; i < columns; i++) {
			grid[i] = [];

			for (var j = 0; j < rows; j++) {
				grid[i][j] = { 
					type: "grass",
					x: i,
					y: j,
					screenX: i * World.TileSize,
					screenY: j * World.TileSize,
					isWall() { return this.type === 'tower' } 
				};
			};
		};

		// Set the grid to the common world
		this.world.sync(grid);
	}

	newTower(mouseData, playerId){
		// TODO: Map user with tower
		if(this.world.createTower(mouseData)){
			this.emit(ServerConstants.TOWER_CREATED);
		}
	}
}