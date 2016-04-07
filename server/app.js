'use strict';

var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);


// Websocket
var clients = []
io.on('connection', socket => {
	console.log('Client joined');
	console.log(socket.handshake.headers.host);

	clients.push(socket);

	socket.emit('handshake', "Welcome!");

	socket.on('someEvent', data => {

	});

	socket.on('disconnect', () => {
		delete clients[clients.indexOf(socket)];
	});
});


// Express application
app.use('/', express.static(__dirname + '/../client/dist'));

server.listen(3000);
console.log("Start listen on port 3000");