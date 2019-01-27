import Character from "./Character";
import { getInput } from "./main";
import { utils, DisplayObject } from "pixi.js/lib/core";
import size from "./size";
import game from "./Game";

const playerSpeedX = 1.1;
const playerSpeedY = 0.4;

export default class Player extends Character {
	constructor() {
		super({
			name: 'fella',
			scale: 0.2,
			x: 250,
			y: 50,
		});
		this.camPoint = new DisplayObject();
		this.camPoint.visible = false;
		this.addChild(this.camPoint);
	}

	updateTransform() {
		var curTime = game.app.ticker.lastTime;
		super.updateTransform();
		const input = getInput();
		// update player
		this.v.x *= 0.8;
		this.v.x += input.move.x * playerSpeedX;

		this.v.y *= 0.8;
		this.v.y += input.move.y * playerSpeedY;


		this.p.x += this.v.x;
		this.p.y += this.v.y;
		this.zIndex = this.p.y;

		if (Math.abs(this.v.x) + Math.abs(this.v.y) > 1) {
			if (this.running) {
				this.running += 1;
			} else {
				this.running = 1;
			}
		} else {
			if (this.running) {
				this.running = 0;
				this.spr.texture = utils.TextureCache[this.name];
			}
		}
		this.freq = (this.running ? 0.5 : 1.0) * 200;
		if (this.running) {
			if (this.running > 5) {
				this.spr.texture = utils.TextureCache[`${this.name}_run_${(Math.floor(curTime / this.freq) % 2 + 1)}`];
			}
			this.flipped = this.v.x < 0;
			this.spr.anchor.y = 1 + Math.abs(Math.pow(Math.sin(curTime / this.freq), 2)) / 20;
		} else {
			this.spr.anchor.y = 1;
		}
		if (this.camPoint) {
			this.camPoint.position.x = this.v.x * size.x * 0.01;
		}
	}
}
