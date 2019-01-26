import { Sprite } from "pixi.js/lib/core";
import { resources } from './Game';
import game from './Game';
import { turbulence } from "./PlayScene";
import { lerp } from "./utils";

export default class Wave extends Sprite {

    constructor(x=0, y=0, amplitude, oscillationSwitch) {
        super(resources[`wave${Math.floor(Math.abs(x-y)%3)+1}`].texture);
        this.initialY = y;
        this.initialX = x;
        this.offsetX = x;
        this.y = y;
        this.x = x;
        this.anchor.x = 0.5;
        this.anchor.y = 0.0;
        this.amplitude = amplitude;
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
        const waveY = 0.5* (Math.sin(time/2) + Math.sin(time/3)) + Math.sin(time*5) * 0.05 * Math.sin(time/5);
        const waveX = Math.sin(time) + Math.sin(time*5) * 0.05 * Math.sin(time/5);
        this.y = this.initialY + (waveY * this.amplitude * this.oscillationSwitch) * turbulence;
        this.x = this.offsetX + (waveX * this.width/6) * turbulence;
        this.skew.y = Math.sin(time) * lerp(turbulence, 2, 0.5) * 0.1;
    }

}
