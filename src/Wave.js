import { Sprite } from "pixi.js/lib/core";
import { resources } from './Game';
import game from './Game';
import { highSeas } from "./PlayScene";
import { lerp } from "./utils";

export default class Wave extends Sprite {

	constructor(x = 0, y = 0, amplitude, oscillationSwitch) {
		super(resources[`wave${Math.floor(Math.abs(y)%3)+1}`].texture);
		this.initialX = x;
		this.initialY = y;
		this.offsetX = x;
		this.y = y;
		this.x = x;
		this.anchor.x = 0.5;
		this.anchor.y = 0.0;
		this.amplitude = amplitude;
		this.oscillationSwitch = oscillationSwitch;
	}

	update() {
		var time = game.app.ticker.lastTime / 200 + this.offsetX/ 200 + this.initialY;
		const waveY = 0.5 * (Math.sin(time / 2) + Math.sin(time / 3)) + Math.sin(time * 5) * 0.05 * Math.sin(time / 5);
		const waveX = Math.sin(time) + Math.sin(time * 5) * 0.05 * Math.sin(time / 5);
		this.y = (waveY * this.amplitude * this.oscillationSwitch) * highSeas;
		this.x = this.offsetX + (waveX * this.width / 6) * highSeas;
		this.rotation = Math.sin(time) * lerp(highSeas, 2, 0.5) * 0.1;
	}
}
