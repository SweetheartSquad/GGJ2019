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
					new Point(-650.0 + 100, 86.5 + 100),
					new Point(253.804 + 100, 79.5 + 100),
					new Point(347.0 + 100, 265.5 + 100),
					new Point(-650.0 + 100, 265.5 + 100),
					new Point(-650.0 + 100, 86.5 + 100),
				]
			}, {
				points: [
					new Point(-426.0 + 100, 19.5 + 100),
					new Point(103.551 + 100, 4.5 + 100),
					new Point(158.0 + 100, 117.5 + 100),
					new Point(-426.0 + 100, 112.5 + 100),
					new Point(-426.0 + 100, 19.5 + 100),
				]
			}, {
				points: [
					new Point(165.333 + 100, -82.5 + 100),
					new Point(0.667 + 100, -82.5 + 100),
					new Point(-5.0 + 100, -79.5 + 100),
					new Point(-6.284 + 100, -72.612 + 100),
					new Point(263.0 + 100, 272.5 + 100),
					new Point(557.343 + 100, 266.275 + 100),
					new Point(576.0 + 100, 260.5 + 100),
					new Point(568.5 + 100, 243.909 + 100),
					new Point(201.194 + 100, -67.095 + 100),
					new Point(183.0 + 100, -78.5 + 100),
					new Point(165.333 + 100, -82.5 + 100),
				].reverse()
			}, {
				points: [
					new Point(-202.667 + 100, -62.217 + 100),
					new Point(-411.655 + 100, -57.702 + 100),
					new Point(-419.0 + 100, -56.5 + 100),
					new Point(-421.485 + 100, -49.066 + 100),
					new Point(-425.469 + 100, 20.269 + 100),
					new Point(-423.0 + 100, 27.5 + 100),
					new Point(-416.994 + 100, 29.154 + 100),
					new Point(-183.34 + 100, 20.167 + 100),
					new Point(-171.0 + 100, 14.5 + 100),
					new Point(-171.067 + 100, 1.873 + 100),
					new Point(-186.923 + 100, -53.288 + 100),
					new Point(-191.571 + 100, -61.5 + 100),
					new Point(-202.667 + 100, -62.217 + 100),
				].reverse()
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
