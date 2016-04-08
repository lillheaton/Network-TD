
import World from './world';

export default class Game {
	constructor(socket, id){
		this.id = id;
		this.socket = socket;
		this.socket.on('change', this._onChange.bind(this));

		this._init();
	}

	_init() {
		this.world = new World();
	}

	// Will only be called once
	render(stage){
		stage.addChild(this.world);
	}

	update(){
	}


	// ### Events ###

	onMouseClick(mouse){
		let newTower = this.world.createTower(mouse.data.global);
		if(newTower){
			console.log("Send new tower (%s, %s)", newTower.x, newTower.y);
			this.socket.emit('incoming', { type: 'newTower', id: this.id, tower: newTower });
		}
	}

	onMouseMove(mouse){

	}

	_onChange(data){
		console.log("Data incomming");
		console.log(data);

		this.world.grid = data.world.grid;
	}
}