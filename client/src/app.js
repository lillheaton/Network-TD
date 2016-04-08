
import PIXI from 'pixi.js';
import io from 'socket.io-client';

import Game from './js/game';

class App {
	constructor(domain){

		// Try to connect to server
		this.socket = io(domain);
		this.socket.on('connect', this._onConnect.bind(this));
		this.socket.on('handshake', this._onConnected.bind(this));

		// Create the canvas
		this.renderer = PIXI.autoDetectRenderer(this.w, this.h, {backgroundColor : 0x000000, antialias: true});
		document.body.appendChild(this.renderer.view);

		// Create the stage
		this.stage = new PIXI.Container();
		this.renderer.render(this.stage); // Initialy draw stage

		this.stage.interactive = true;
		this.stage.hitArea = new PIXI.Rectangle(0, 0, this.w, this.h);
	}

	_start(id){
		this.game = new Game(this.socket, id); // Create the game
		this.game.render(this.stage); // Call the render method. NOTE! Will only be called once

		// Add stage listeners to game
		// Mouse events: mouseup, mousedown, mousemove, click
		this.stage.on('click', this.game.onMouseClick.bind(this.game));
		this.stage.on('mousemove', this.game.onMouseMove);

		// Start the loop
		this._loop();
	}

	_loop(){
		this.game.update();

		// End with draw and continue update
		this.renderer.render(this.stage);
		window.requestAnimationFrame(this._loop.bind(this));
	}

	_onConnect(){
		console.log('Try connecting to server...');
	}

	_onConnected(id){
		console.log('Connected!');
		console.log("Start Game...");

		this._start(id);
	}


	_onMouseUp(){
		console.log("asksfmma");
	}
}

App.prototype.h = window.innerHeight;
App.prototype.w = window.innerWidth;

var app = new App('http://localhost:3000');