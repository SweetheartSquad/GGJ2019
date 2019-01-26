import { Sprite } from "pixi.js/lib/core";
import { resources } from './Game';
import game from './Game';

export default class Wave extends Sprite {

    constructor(x=0, y=0, oscillationOffset, oscillationSwitch) {
        super(resources.wave.texture);
        this.initialY = y;
        this.initialX = x;
        this.y = y;
        this.x = x;
        this.oscillationOffset = oscillationOffset;
        this.oscillationSwitch = oscillationSwitch;
    }

    destroy() {
		Sprite.prototype.destroy.call(this);
		Object.values(this.timeouts).map(timeout => {
			clearTimeout(timeout);
		});
	}

    update(){
        var time = game.app.ticker.lastTime / 200 + this.initialX;
        const wave = 0.5* (Math.sin(time/2) + Math.sin(time/3));
        this.y = this.initialY + wave * this.oscillationOffset * this.oscillationSwitch;
        this.x = this.initialX + Math.sin(time) * this.width/6;
    }

}