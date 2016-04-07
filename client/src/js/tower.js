
import PIXI from 'pixi.js';

export default class Tower extends PIXI.Container {
	constructor(x, y){
		super();
		this.x = x;
		this.y = y;	

		this.setup();
	}

	setup(){
		let graphics = new PIXI.Graphics();

		graphics.lineStyle(2, 0xFFFFFF, 1);
		graphics.drawCircle(this.x, this.y, 60);

		this.addChild(graphics);
	}

	update(){
		
	}
}