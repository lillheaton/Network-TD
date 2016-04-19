'use strict';

var WorldController = require('./worldController');
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

	start(){
		this.worldController = new WorldController(this);
		this.unitManager = new UnitManager(this.worldController);

		this.worldController.construct(30, 18); // Will create the world
		this.unitManager.setup();
		this.unitManager.newWave();

		// Send initial data to the clients
		this.clientsUpdate();

		// Start loop;
		this.run = true;
		this.time.start();
		this.update();
	}

	reset(){
		this.run = false;
		this.time.reset();
	}

	update(){
		if(!this.run)
			return;

		setTimeout(this.update.bind(this), 1000.0 / 60.0); // Try to run at 60 FPS
		this.time.update();

		this.unitManager.update(this.time);

		this.lastUpdateTime += this.time.elapsedMs;
		if(this.lastUpdateTime > clientUpdatePerMilliseconds){
			this.clientsUpdate(); // Only send data to the client every 4 sec
			this.lastUpdateTime -= clientUpdatePerMilliseconds;
		}
	}

	// Sends data to all players
	clientsUpdate(){
		let data = {
			world: {
				grid: this.worldController.world.grid
			},
			units: this.unitManager.units
		};
		
		// Send data to all players
		this.io.emit('change', data);
	}




	newPlayer(socket){
		this.players.push(socket);

		console.log('Player: %s joined. Total players: %s', socket.id, this.players.length);

		// Confirm player, say hi!
		socket.emit('handshake');

		// Check if it's new game
		if(this.players.length === 1){
			console.log("Start the game...");
			this.start();
		} else {
			// Send data to the new player if game already started
			this.clientsUpdate();
		}
	}

	playerDisconnect(socket){
		let player = this.players.find(s => s.id === socket.id);
		this.players.splice(this.players.indexOf(player), 1);

		if(this.players.length < 1){
			this.reset();
			console.log('No more players, reset game');
		} else {
			console.log('Player: %s left. Total players: %s', player.id, this.players.length);	
		}
	}
}