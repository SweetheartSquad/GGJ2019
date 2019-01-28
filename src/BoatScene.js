import BaseScene from "./BaseScene";
import { Boat } from "./Boat";
import { Point } from "pixi.js";
import CustomFilter from "./CustomFilter";
import WaveSet from "./WaveSet";
import game, { resources } from "./Game";
import size from "./size";
import { lerp } from "./utils";
import { Graphics } from "pixi.js/lib/core";

let turbulence;
export let highSeas = 1;

export default class BoatScene extends BaseScene {
	constructor(opts = {}) {
		const {
			day = true,
				...options
		} = opts;
		const boat = new Boat();
		super({
			floor: boat,
			nav: [{
					points: [
						new Point(-550.0, 217.5),
						new Point(353.8, 206.5),
						new Point(447.0, 382.5),
						new Point(-550.0, 382.5),
					]
				}, {
					points: [
						new Point(-291.0, 142.83),
						new Point(-287.15, 135.5),
						new Point(-278.83, 131.83),
						new Point(205.56, 121.5),
						new Point(258.0, 234.5),
						new Point(-291.0, 225.5),
					]
				}, {
					points: [
							new Point(255.33, 44.5),
							new Point(110.67, 44.5),
							new Point(105.0, 47.5),
							new Point(103.72, 54.39),
							new Point(363.0, 369.5),
							new Point(617.34, 373.27),
							new Point(636.0, 367.5),
							new Point(628.5, 350.91),
							new Point(291.19, 59.9),
							new Point(273.0, 48.5),
						]
						.reverse()
				}, {
					points: [
							new Point(-130.44, 68.5),
							new Point(-283.6, 69.29),
							new Point(-289.13, 70.3),
							new Point(-291.0, 76.53),
							new Point(-289.87, 138.7),
							new Point(-288.01, 144.77),
							new Point(-283.49, 146.15),
							new Point(-109.29, 140.61),
							new Point(-100.0, 135.86),
							new Point(-100.05, 125.27),
							new Point(-118.59, 75.99),
							new Point(-122.09, 69.1),
						]
						.reverse()
				}, {
					points: [
						new Point(-20, 64),
						new Point(20, 64),
						new Point(20, 164),
						new Point(-20, 164),
					]
				}

			],
			...options,
		});
		this.options = opts;
		this.turbulenceTarget = 0.3;
		resources.rain.data.fade(resources.rain.data.volume(), 0, 1000);
		this.raining = false;

		setTimeout(() => {
			resources.waves.data.fade(resources.waves.data.volume(), .4, 1000);
		});

		this.screenFilter = new CustomFilter(resources.frag.data);
		this.screenFilter.uniforms.whiteout = 0;
		this.screenFilter.padding = 150;
		window.screenFilter = this.screenFilter;

		this.filters = [this.screenFilter];



		// waves
		this.waveSets = [];

		if (day) {
			this.sky = new Graphics();
			this.sky.beginFill(day ? 0xFFFFFF : 0);
			this.sky.drawRect(-size.x / 2, -size.y / 2, size.x * 1.5, size.y * 1.5);
			this.sky.endFill();
			this.addChild(this.sky);
		}
		this.addChild(this.floor);
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
		turbulence = lerp(turbulence || this.turbulenceTarget, this.turbulenceTarget, 0.1);
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

	setTurbulence(turbulence) {
		this.turbulenceTarget = turbulence;
	}

	lightningStrike() {
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
							}, 60);
						}, 60);
					}, 60);
				}, 60);
			}, 60);
		}, 60);
	}

	queueLightning() {
		this.lightningTimer = setTimeout(() => {
			if (this.raining) {
				this.lightningStrike();
			}
			this.queueLightning();
		}, Math.random() * 120000 + 3000);
	}

	setRaining(raining) {
		if (raining === this.raining) {
			return;
		}
		if (raining) {
			resources.rain.data.fade(0, 1, 1000);
		} else {
			resources.rain.data.fade(1, 0, 1000);
		}
		this.raining = raining;
		this.screenFilter.uniforms.raining = raining ? 1 : 0;
	}

	destroy(options) {
		super.destroy(options);
		clearTimeout(this.lightningTimer);
		clearTimeout(this.thunderTimer);
		resources.waves.data.fade(resources.waves.data.volume(), 0, 1000);
		resources.thunder.data.stop();
	}
}
