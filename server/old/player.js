'use strict';

var uuid = require('node-uuid');

module.exports = class Player {
	constructor(socket){
		this.socket = socket;
		this.id = uuid.v1();
	}

	get host(){
		this.socket.handshake.headers.host;
	}

	send(name, data){
		this.socket.emit(name, data);
	}

	on(name, method){
		this.socket.on(name, method);
	}
}