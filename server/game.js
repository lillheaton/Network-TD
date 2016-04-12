'use strict';

var Player = require('./player');
var World = require('./world');
var UnitManager = require('./unitManager');
var Time = require('./time');

const clientUpdatePerMilliseconds = 4000;

module.exports = class Game {

	constructor(io){
		this.io = io;
		this.players = [];
		this.lastUpdateTime = 0.0;
		this.run = false;
		this.time = new Time();
	}


	// ### Private Methods ###

	_init(){
		this.world = new World(30, 18);
		//this.world.on('change', this._onChange.bind(this)); // Listen before createing
		this.world.construct(); // Will create the world

		this.unitManager = new UnitManager();
		this.unitManager.newWave();
	}

	_start(){
		this._init();

		// Start loop;
		this.run = true;
		this.time.start();
		this._update();
	}

	_reset(){
		this.run = false;
		this.time.reset();
	}

	_update(){
		if(!this.run)
			return;

		setTimeout(this._update.bind(this), 1000.0 / 30.0);
		this.time.update();

		this.unitManager.update(this.time);

		this.lastUpdateTime += this.time.elapsedMs;
		if(this.lastUpdateTime > clientUpdatePerMilliseconds){
			this._onChange(); // Only send data to the client every 2 sec
			this.lastUpdateTime -= clientUpdatePerMilliseconds;
		}
	}

	// Sends data to all players
	_onChange(){
		let data = {
			world: {
				grid: this.world.grid
			},
			units: this.unitManager.units
		};
		
		// Send data to all players
		this.io.emit('change', data);
	}

	_incoming(data){
		switch(data.type){
			case 'newTower':
				this.world.newTower(data);
				break;
		}
	}



	// ### Public Methods ###

	newPlayer(socket){
		let player = new Player(socket);
		this.players.push(player);

		console.log('Player: %s joined. Total players: %s', player.host, this.players.length);

		// Send player it's ID
		player.send('handshake', player.id);

		// Listen to incoming
		player.on('incoming', this._incoming.bind(this));

		// Check if it's new game
		if(this.players.length === 1){
			console.log("Start the game...");
			this._start();
		} else {
			// Send data to the new player if game already started
			this._onChange();
		}
	}

	playerDisconnect(socket){
		let player = this.players.find(s => s.socket === socket);
		this.players.splice(this.players.indexOf(player), 1);

		if(this.players.length < 1){
			this._reset();
			console.log('No more players, reset game');
		} else {
			console.log('Player: %s left. Total players: %s', player.host, this.players.length);	
		}
	}
}