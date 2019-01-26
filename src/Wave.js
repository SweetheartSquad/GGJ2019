import { Sprite } from "pixi.js/lib/core";
import { resources } from './Game';

export default class Wave extends Sprite {

    constructor() {
        super(resources.wave.texture);
        this.dateTime = new Date();

        this.initialY = 100;
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