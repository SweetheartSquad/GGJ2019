import BaseScene from "./BaseScene";
import { Interior } from "./Interior";
import { Point } from "pixi.js";
import game, { resources } from "./Game";
import size from "./size";
import { lerp } from "./utils";

let turbulenceTarget = 0.3;
let turbulence = turbulenceTarget;
export let highSeas = 1;

export default class InteriorScene extends BaseScene {
	constructor(options) {
		const interior = new Interior();
		super({
			floor: interior,
			nav: [{
				points: [
					new Point(-550, 186),
					new Point(700, 179),
					new Point(700, 320),
					new Point(-550, 320),
				]
			}],
			...options,
		});
		resources.rain.data.fade(resources.rain.data.volume(),0,1000);

		setTimeout(()=>{
			resources.waves.data.fade(resources.waves.data.volume(),.1,1000);
		});

		this.addChild(this.floor);
	}

	update() {
		super.update();
		const curTime = game.app.ticker.lastTime;
		turbulenceTarget = window.turbulence || turbulenceTarget;
		turbulence = lerp(turbulence, turbulenceTarget, 0.1);
		highSeas = lerp(0.3, 4, turbulence);

		this.floor.rotation = ((Math.sin(curTime / 300) + Math.sin(curTime / 200)) * 0.5 * 0.01) * highSeas;
		const waveY = 0.5 * (Math.sin(curTime / 300) + Math.sin(curTime / 400)) + Math.sin(curTime / 10) * 0.05 * Math.sin(curTime / 50);
		const waveX = Math.sin(curTime / 500) + Math.sin(curTime / 300) * 0.05 * Math.sin(curTime / 50);
		this.floor.y = size.y * 0.4 + waveY * 2 * highSeas;
		this.floor.x = size.x / 2 + waveX * highSeas;
	}

	destroy(){
		super.destroy();
		resources.waves.data.fade(resources.waves.data.volume(),0,1000);
	}
}
