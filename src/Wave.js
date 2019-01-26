import { Sprite } from "pixi.js/lib/core";
import { resources } from './Game';

export default class Wave extends Sprite {

    constructor(x=0, y=0) {
        super(resources.wave.texture);
        this.dateTime = new Date();
        this.initialY = this.y = y;
        this.x = x;
    }

    destroy() {
		Sprite.prototype.destroy.call(this);
		Object.values(this.timeouts).map(timeout => {
			clearTimeout(timeout);
		});
	}

    update(){
        var time = new Date().getMilliseconds();
        this.y = this.initialY + Math.sin(time) * 20;
    }

}