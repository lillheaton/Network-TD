
import PIXI from 'pixi.js';
import World, { TileSize } from '../../common/world';
import CommunicationConstants from '../../common/constants/communicationConstants';
import Tile from './tile';
import Tower from './tiles/tower';
import Grass from './tiles/grass';


export default class WorldController extends PIXI.Container {
	constructor(socket, unitManager){
		super();

		this.socket = socket;
		this.unitManager = unitManager;
		this.world = new World();

		this.world.on('change', this.render.bind(this));
	}

	sync(grid){
		this.world.sync(grid);
	}

	render(){
		for (var i = 0; i < this.world.grid.length; i++) {
			for (var j = 0; j < this.world.grid[i].length; j++) {

				let childIndex = i * this.world.grid[i].length + j;
				if(this.children[childIndex] != undefined) {
					let tile = this.children[childIndex];

					// Tile exist
					if(!(tile.tileType.name === this.getType(this.world.grid[i][j].type).name)){
						// Change type if no longer the correct one
						console.log("Switch tile");

						this.removeChildAt(childIndex);
						this.addChildAt(this.createTile(i, j, this.world.grid[i][j].type), childIndex);
					}

				} else {
					// New tile
					console.log("Add tile");

					this.addChild(this.createTile(i, j, this.world.grid[i][j].type));
				}
				
			};
		};
	}

	update(time){
		for (var i = 0; i < this.world.grid.length; i++) {
			for (var j = 0; j < this.world.grid[i].length; j++) {
				this.children[i * this.world.grid[i].length + j].update(time);
			}
		}
	}

	mouseClick(data){
		if(this.world.createTower(data)){
			// Passing clients move to the server
			this.socket.emit(CommunicationConstants.CLIENT_WORLD_CREATE_TOWER_EVENT, data, this.socket.id);
		}
	}

	createTile(i, j, type){
		switch(type){
			case 'grass':
				return new Tile(Grass, TileSize * i, TileSize * j);

			case 'tower':
				return new Tile(Tower, i * TileSize, j * TileSize, this.unitManager);
		}
	}

	getType(type){
		switch(type){
			case 'grass':
				return Grass;

			case 'tower':
				return Tower;
		}
	}
}