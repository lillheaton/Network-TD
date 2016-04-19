
import PIXI from 'pixi.js';
import Tile from './tile';
import Tower from './tiles/tower';
import Grass from './tiles/grass';
import MathHelper from './utils/mathHelper';

export const TileSize = 40;

export default class World extends PIXI.Container {
	constructor(unitManager){
		super();
		this._grid = [];
		this.unitManager = unitManager;
	}

	set grid(value){		
		this._grid = value;
		this._render();
	}

	_render(){
		for (var i = 0; i < this._grid.length; i++) {
			for (var j = 0; j < this._grid[i].length; j++) {

				let childIndex = i * this._grid[i].length + j;
				if(this.children[childIndex] != undefined) {
					let tile = this.children[childIndex];

					// Tile exist
					if(!(tile.tileType.name === this._getType(this._grid[i][j].type).name)){
						// Change type if no longer the correct one
						console.log("Switch tile");

						this.removeChildAt(childIndex);
						this.addChildAt(this._createTile(i, j, this._grid[i][j].type), childIndex);
					}

				} else{
					// New tile
					this.addChild(this._createTile(i, j, this._grid[i][j].type));
				}
				
			};
		};
	}

	_createTile(i, j, type){
		switch(type){
			case 'grass':
				return new Tile(Grass, TileSize * i, TileSize * j);

			case 'tower':
				return new Tile(Tower, i * TileSize, j * TileSize, this.unitManager);
		}
	}

	_getType(type){
		switch(type){
			case 'grass':
				return Grass;

			case 'tower':
				return Tower;
		}
	}

	_getTile(screenX, screenY) {
		let gridPos = this._getGridPos(screenX, screenY);

		if(gridPos.x < this._grid.length && gridPos.y < this._grid[0].length){
			return this._grid[gridPos.x][gridPos.y];
		}

		return null;
	}

	_getGridPos(screenX, screenY){
		return {
			x: MathHelper.snapToFloor(screenX, TileSize) / 40,
			y: MathHelper.snapToFloor(screenY, TileSize) / 40
		};
	}




	update(time) {
		for (var i = 0; i < this._grid.length; i++) {
			for (var j = 0; j < this._grid[i].length; j++) {
				this.children[i * this._grid[i].length + j].update(time);
			}
		}
	}

	createTower(mouseClick) {
		let tile = this._getTile(mouseClick.x, mouseClick.y);
		if(tile) { // Is valid place to place the tile. Switch it and send it to the server
			let gridPos = this._getGridPos(mouseClick.x, mouseClick.y);
			this._grid[gridPos.x][gridPos.y].type = 'tower';
			this._render();
			return gridPos;
		}
		return null;
	}
}