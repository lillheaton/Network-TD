
import PIXI from 'pixi.js';
import Tiles from './tiles';
import Tower from './tower';
import MathHelper from './utils/mathHelper';

export const TileSize = 40;

export default class World extends PIXI.Container {
	constructor(){
		super();
	}

	set grid(value){
		this._grid = value;
		this._render();
	}

	_render(){
		this.children = [];

		for (var i = 0; i < this._grid.length; i++) {
			for (var j = 0; j < this._grid[i].length; j++) {

				switch(this._grid[i][j].type){
					case 'grass':
						this.addChild(Tiles.Grass(TileSize * i, TileSize * j));		
						break;

					case 'tower':
						this.addChild(new Tower(i * (TileSize / 2) + TileSize / 4, j * (TileSize / 2) + TileSize / 4));
						break;
				}

			};
		};
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

	createTower(mouseClick) {
		let tile = this._getTile(mouseClick.x, mouseClick.y);
		if(tile){
			return this._getGridPos(mouseClick.x, mouseClick.y);
		}
		return null;
	}
}