import BaseScene from "./BaseScene";
import { Boat } from "./Boat";
import { Point } from "pixi.js";
import CustomFilter from "./CustomFilter";
import WaveSet from "./WaveSet";
import game, { resources } from "./Game";
import size from "./size";
import { lerp } from "./utils";
import { Graphics } from "pixi.js/lib/core";
import { Observation } from "./ObservationDeck";
import { setScene, player } from "./main";

let turbulence;
export let highSeas = 1;

export default class ObservationScene extends BaseScene {
	constructor(scene) {
		const day = !!scene.sky;
		const turbulenceTarget = scene.turbulenceTarget;
		const raining = scene.raining;
		const observation = new Observation();
		const Scene = scene.constructor;
		const options = scene.options;
		super({
			floor: observation,
			nav: [
				{
					points: [
						new Point(-291, 100),
						new Point(259, 100),
						new Point(374, 317),
						new Point(-159, 317),
					],
				},
			],
			interact: [{
				points: [
					new Point(200, 90),
					new Point(230, 90),
					new Point(230, 400),
					new Point(200, 400),
				],
				onEnter: () => {
					setTimeout(()=>setScene(new Scene(options)));
					player.p.x = 0;
					player.p.y = 120;
				},
			}],
			npcs: [{
				name: 'scope',
				x: -93,
				y: 160,
				label: 'look',
				lines: ['You see an endless ocean.'],
			}],
		});
		this.scope = this.floor.children[this.floor.children.length-2];
		this.scope.freq = 0;
		this.zoom = 1.3;

		this.turbulenceTarget = turbulenceTarget;
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



		if (day) {
			this.sky = new Graphics();
			this.sky.beginFill(day ? 0xFFFFFF : 0);
			this.sky.drawRect(-size.x/2,-size.y/2,size.x*1.5,size.y*1.5);
			this.sky.endFill();
			this.addChild(this.sky);
		}
		this.addChild(this.floor);
		this.queueLightning();
		this.setRaining(raining);
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

	setTurbulence(turbulence) {
		this.turbulenceTarget = turbulence;
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

	destroy(options){
		super.destroy(options);
		clearTimeout(this.lightningTimer);
		clearTimeout(this.thunderTimer);
		resources.waves.data.fade(resources.waves.data.volume(),0,1000);
		resources.thunder.data.stop();
	}
}
