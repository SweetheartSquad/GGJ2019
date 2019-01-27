import BaseScene from "./BaseScene";
import { Boat } from "./Boat";
import { Point } from "pixi.js";
import CustomFilter from "./CustomFilter";
import WaveSet from "./WaveSet";
import game, { resources } from "./Game";
import size from "./size";
import { lerp } from "./utils";

let turbulenceTarget = 0.3;
let turbulence = turbulenceTarget;
export let highSeas = 1;

export default class BoatScene extends BaseScene {
	constructor(options) {
		const boat = new Boat();
		super({
			floor: boat,
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
		this.raining = false;

		setTimeout(()=>{
			resources.waves.data.fade(resources.waves.data.volume(),.4,1000);
		});

		this.screenFilter = new CustomFilter(resources.frag.data);
		this.screenFilter.uniforms.whiteout = 0;
		this.screenFilter.padding = 150;
		window.screenFilter = this.screenFilter;

		this.filters = [this.screenFilter];



		// waves
		this.waveSets = [];

		this.addWaveSet(0, 161, 10);
		this.addWaveSet(32, 202, 10);
		this.addWaveSet(64, 243, 30);
		this.addWaveSet(128, 281, 20);
		this.addWaveSet(192, 322, 20);
		this.addWaveSet(210, 363, 20);
		this.addWaveSet(250, 401, 20);
		this.addWaveSet(260, 442, 20);
		this.addChild(this.floor);
		this.addWaveSet(192, size.y - 223, 20);
		this.addWaveSet(128, size.y - 180, 20);
		this.addWaveSet(64, size.y - 142, 30);
		this.addWaveSet(0, size.y - 114, 10);

		this.queueLightning();
	}

	update() {
		super.update();
		const curTime = game.app.ticker.lastTime;
		turbulenceTarget = window.turbulence || turbulenceTarget;
		turbulence = lerp(turbulence, turbulenceTarget, 0.1);
		highSeas = lerp(0.3, 4, turbulence);
		this.screenFilter.uniforms.curTime = curTime;
		this.screenFilter.uniforms.rain = turbulence;

		this.floor.rotation = ((Math.sin(curTime / 300) + Math.sin(curTime / 200)) * 0.5 * 0.01) * highSeas;
		const waveY = 0.5 * (Math.sin(curTime / 300) + Math.sin(curTime / 400)) + Math.sin(curTime / 10) * 0.05 * Math.sin(curTime / 50);
		const waveX = Math.sin(curTime / 500) + Math.sin(curTime / 300) * 0.05 * Math.sin(curTime / 50);
		this.floor.y = size.y * 0.4 + waveY * 4 * highSeas;
		this.floor.x = size.x / 2 + waveX * 2 * highSeas;
	}

	addWaveSet(x, y, amplitude) {
		var waveSet = new WaveSet(x, y, amplitude);
		this.waveSets.push(waveSet);
		this.addChild(waveSet);
	}

	lightningStrike(){
		this.thunderTimer = setTimeout(() => {
			resources.thunder.data.play();
		}, Math.random() * 1000);
		this.screenFilter.uniforms.invert = 1.0;
		setTimeout(() => {
			this.screenFilter.uniforms.invert = 0.5;
			setTimeout(() => {
				this.screenFilter.uniforms.invert = 0.25;
				setTimeout(() => {
					this.screenFilter.uniforms.invert = 0.0;
					this.screenFilter.uniforms.whiteout = 1.0;
					setTimeout(() => {
						this.screenFilter.uniforms.whiteout = 0.5;
						setTimeout(() => {
							this.screenFilter.uniforms.whiteout = 0.25;
							setTimeout(() => {
								this.screenFilter.uniforms.whiteout = 0.0;
							},60);
						},60);
					},60);
				},60);
			},60);
		},60);
	}

	queueLightning(){
		this.lightningTimer = setTimeout(() => {
			if (this.raining) {
				this.lightningStrike();
			}
			this.queueLightning();
		}, Math.random()*120000+3000);
	}

	setRaining(raining) {
		if (raining === this.raining) {
			return;
		}
		if (raining) {
			resources.rain.data.fade(0,1,1000);
		} else {
			resources.rain.data.fade(1,0,1000);
		}
		this.raining = raining;
		this.screenFilter.uniforms.raining = raining ? 1 : 0;
	}

	destroy(){
		super.destroy();
		clearTimeout(this.lightningTimer);
		clearTimeout(this.thunderTimer);
		resources.waves.data.fade(resources.waves.data.volume(),0,1000);
		resources.thunder.data.stop();
	}
}
