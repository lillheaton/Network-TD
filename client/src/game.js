
import WorldController from './worldController';
import UnitManager from './unitManager';

export default class Game {
	constructor(socket) {
		this.socket = socket;
		this.socket.on('change', this.onChange.bind(this));

		this.init();
	}

	init() {
		this.unitManager = new UnitManager();
		this.worldController = new WorldController(this.socket, this.unitManager);
	}

	// Will only be called once
	render(stage){
		stage.addChild(this.worldController);
		stage.addChild(this.unitManager);
	}

	update(time){
		this.unitManager.update(time);
		this.worldController.update(time);
	}


	// ### Events ###

	onMouseClick(mouse){
		this.worldController.mouseClick(mouse.data.global);
	}

	onMouseMove(mouse){		
	}

	onChange(data){
		this.unitManager.units = data.units;
		this.worldController.sync(data.world.grid);
	}
}