'use strict';

var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var game = new (require('./game'))(io);

// Websocket
io.on('connection', socket => {
	// Add new player to the game
	game.newPlayer(socket);

	// Let game know that player left
	socket.on('disconnect', () => {
		game.playerDisconnect(socket);
	});
});


// Express application
app.use('/', express.static(__dirname + '/../client/dist'));

server.listen(3000);
console.log("Start listen on port 3000");