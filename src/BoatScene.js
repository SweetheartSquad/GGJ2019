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
					new Point(-650.0, 86.5),
					new Point(253.804, 79.5),
					new Point(347.0, 265.5),
					new Point(-650.0, 265.5),
					new Point(-650.0, 86.5),
				]
			}, {
				points: [
					new Point(-426.0, 19.5),
					new Point(103.551, 4.5),
					new Point(158.0, 117.5),
					new Point(-426.0, 112.5),
					new Point(-426.0, 19.5),
				]
			}, {
				points: [
					new Point(165.333, -82.5),
					new Point(0.667, -82.5),
					new Point(-5.0, -79.5),
					new Point(-6.284, -72.612),
					new Point(263.0, 272.5),
					new Point(557.343, 266.275),
					new Point(576.0, 260.5),
					new Point(568.5, 243.909),
					new Point(201.194, -67.095),
					new Point(183.0, -78.5),
					new Point(165.333, -82.5),
				].reverse()
			}, {
				points: [
					new Point(-202.667, -62.217),
					new Point(-411.655, -57.702),
					new Point(-419.0, -56.5),
					new Point(-421.485, -49.066),
					new Point(-425.469, 20.269),
					new Point(-423.0, 27.5),
					new Point(-416.994, 29.154),
					new Point(-183.34, 20.167),
					new Point(-171.0, 14.5),
					new Point(-171.067, 1.873),
					new Point(-186.923, -53.288),
					new Point(-191.571, -61.5),
					new Point(-202.667, -62.217),
				].reverse()
			}],
			...options,
		});

		console.log(resources.rain);

		resources.rain.data.play();
		resources.waves.data.play();

		this.screenFilter = new CustomFilter(resources.frag.data);
		this.screenFilter.uniforms.whiteout = 0;
		this.screenFilter.uniforms.raining = 1;
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
		this.floor.y = this.floor.bg.height / 2 + waveY * 4 * highSeas;
		this.floor.x = this.floor.bg.width / 2 + waveX * 2 * highSeas;
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
			this.lightningStrike();
			this.queueLightning();
		}, Math.random()*120000+3000);
	}

	destroy(){
		super.destroy();
		clearTimeout(this.lightningTimer);
		clearTimeout(this.thunderTimer);
		resources.rain.data.stop();
		resources.waves.data.stop();
		resources.thunder.data.stop();	
	}
}
