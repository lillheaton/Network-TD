
import io from 'socket.io-client';
import Tower from './tower';

export default class TowerDefence {
	constructor(){
		this.tower = new Tower(100, 100);

		this.socket = io('http://localhost:3000');
		this.socket.on('connect', () => {
			console.log('Try Connect');
		});

		this.socket.on('handshake', data => {
			console.log(data);
		});
	}

	// Will only be called once
	render(stage){
		stage.addChild(this.tower);
	}

	update(){
	}
}


/* 

### Client
Client pure slave of server. Will only draw, and send user inputs

### Server
Will handle all game logic and return positions of towers and units.

# Classes
 - 

Classes
 - Map
 - Unit
 	- Subclasses of different units

Map
 * Will create grid
 * Will have different units


*/