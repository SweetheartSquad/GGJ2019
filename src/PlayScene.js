import { getInput } from './main';
import game, { resources } from './Game';
import { Container, Sprite, Graphics, Point } from 'pixi.js/lib/core';
import size from './size';
import WaveSet from './WaveSet';
import NavMesh from './NavMesh';
import Character from './Character';
import { Boat } from './Boat';
import { lerp, clamp } from './utils';
import InteractableMesh from './InteractableMesh';
import { createDialog } from './Dialog';
import NPC from './NPC';

export const playerSpeedX = 1.1;
export const playerSpeedY = 0.4;
let g = new Graphics();
let player;


let turbulenceInput = 0.3;
export let turbulence = 1;

export default class PlayScene extends Container {

	constructor() {
		super();

		// waves
		this.waveSets = [];

		this.addWaveSet(0, 160, 10);
		this.addWaveSet(32, 200, 10);
		this.addWaveSet(64, 240, 30);
		this.addWaveSet(128, 280, 20);
		this.addWaveSet(192, 320, 20);
		this.addWaveSet(210, 360, 20);
		this.addWaveSet(250, 400, 20);
		this.addWaveSet(260, 440, 20);

		this.boat = new Boat();
		this.addChild(this.boat);
		this.addWaveSet(192, size.y - 220, 20);
		this.addWaveSet(128, size.y - 180, 20);
		this.addWaveSet(64, size.y - 140, 30);
		this.addWaveSet(0, size.y - 110, 10);


		player = new Character({
			name: 'fella',
			scale: 0.2,
			x: 0,
			y: 0,
		});
		player.camPoint = new PIXI.DisplayObject();
		player.camPoint.visible = false;
		player.addChild(player.camPoint);

		this.boat.addChild(g);
		this.boat.addChild(player);

		const npcs = [
			new NPC({
				name: 'fella',
				scale: 0.2,
				x: 0,
				y: 0,
				label: 'say hi',
				lines: ['hello','whats up','im done talking now'],
			}),
			new NPC({
				name: 'dame',
				scale: 0.2,
				x: 130,
				y: 150,
				label: 'say hi',
				lines: ['hello','whats up','im done talking now'],
			})
		]
		npcs.forEach(npc => this.boat.addChild(npc));


		this.bounds = new NavMesh([{
			points: [
				new Point(140 - 400, 140 - 400),
				new Point(700 - 400, 140 - 400),
				new Point(700 - 400, 400 - 400),
				new Point(140 - 400, 400 - 400),
			]
		}, {
			points: [
				new Point(540 - 400, 540 - 400),
				new Point(400 - 400, 540 - 400),
				new Point(400 - 400, 300 - 400),
				new Point(540 - 400, 300 - 400),
			]
		}, {
			points: [
				new Point(240 - 400, 240 - 400),
				new Point(400 - 400, 240 - 400),
				new Point(400 - 400, 300 - 400),
				new Point(240 - 400, 300 - 400),
			]
		}, {
			points: [
				new Point(240 - 400, 340 - 400),
				new Point(500 - 400, 350 - 400),
				new Point(500 - 400, 300 - 400),
				new Point(340 - 400, 300 - 400),
			]
		}, {
			points: [
				new Point(500 - 400, 500 - 400),
				new Point(700 - 400, 200 - 400),
				new Point(750 - 400, 180 - 400),
				new Point(800 - 400, 200 - 400),
				new Point(800 - 400, 800 - 400),
				new Point(500 - 400, 800 - 400),
			]
		}]);


		this.interactiveBounds = new InteractableMesh([{
			points: [
				new Point(140 - 400, 140 - 400),
				new Point(240 - 400, 140 - 400),
				new Point(240 - 400, 400 - 400),
				new Point(140 - 400, 400 - 400),
			], 
			onEnter: ()=>{console.log("Enter")},
			onExit: ()=>{console.log("Exit")},
			onInteract: ()=>{console.log("You poop")}
		}].concat(
			npcs.map(npc => {
				const {
					x,
					y,
					width,
					lines,
					label,
				} = npc;
				return {
					points: [
						new Point(x - width, y+50),
						new Point(x + width, y+50),
						new Point(x + width, y-50),
						new Point(x - width, y-50),
					],
					...createDialog(npc, {
						label,
						lines,
					})
				};
			})
		));
	}

	destroy() {
		Container.prototype.destroy.call(this);
	}

	update() {
		this.waveSets.forEach((waveSet) => {
			waveSet.update();
		});

		g.clear();
		const curTime = game.app.ticker.lastTime;
		turbulence = lerp(0.3, 4, turbulenceInput);

		const input = getInput();
		// update player
		player.v.x *= 0.8;
		player.v.x += input.move.x * playerSpeedX;

		player.v.y *= 0.8;
		player.v.y += input.move.y * playerSpeedY;

		this.bounds.update(player);
		this.interactiveBounds.update(player);


		player.p.x += player.v.x;
		var oldy = player.p.y;
		player.p.y += player.v.y;


		if (Math.abs(player.v.x) + Math.abs(player.v.y) > 1) {
			if (player.running) {
				player.running += 1;
			} else {
				player.running = 1;
			}
		} else {
			if (player.running) {
				player.running = 0;
				player.spr.texture = PIXI.utils.TextureCache[player.name];
			}
		}
		player.freq = (player.running ? 0.5 : 1.0) * 200;
		if (player.running) {
			if (player.running > 5) {
				player.spr.texture = PIXI.utils.TextureCache[`${player.name}_run_${(Math.floor(curTime / player.freq) % 2 + 1)}`];
			}
			player.flipped = player.v.x < 0;
			player.spr.anchor.y = 1 + Math.abs(Math.pow(Math.sin(curTime / player.freq), 2)) / 20;
		} else {
			player.spr.anchor.y = 1;
		}

		if (Math.abs(player.v.y) > 0.01) {
			this.boat.sortDirty = true;
			player.zIndex = player.p.y;
		}
		player.camPoint.position.x = player.v.x * size.x * 0.01;

		// camera
		this.s = lerp(this.s || 1, 1 - (Math.abs(player.v.y)+Math.abs(player.v.x))/64, 0.05);
		this.scale.x = this.scale.y = lerp(this.scale.x, this.s, 0.2);
	
		var p = this.toLocal(PIXI.zero, player.camPoint);
		this.x = lerp(this.x, p.x, 0.1);
		this.y = lerp(this.y, player.p.y*this.scale.y, 0.1);
		this.pivot.x = Math.floor(this.x);
		this.pivot.y = Math.floor(this.y);
		this.x = size.x/2;
		this.y = size.y/4*1;

		this.bounds.debugDraw(g);
		this.interactiveBounds.debugDraw(g);

		this.boat.rotation = ((Math.sin(curTime / 300) + Math.sin(curTime / 200)) * 0.5 * 0.01) * turbulence;
		const waveY = 0.5 * (Math.sin(curTime / 300) + Math.sin(curTime / 400)) + Math.sin(curTime / 10) * 0.05 * Math.sin(curTime / 50);
		const waveX = Math.sin(curTime / 500) + Math.sin(curTime / 300) * 0.05 * Math.sin(curTime / 50);
		this.boat.y = this.boat.bg.height / 2 + waveY * 4 * turbulence;
		this.boat.x = this.boat.bg.width / 2 + waveX * 2 * turbulence;
	}
	addWaveSet(x, y, amplitude) {
		var waveSet = new WaveSet(x, y, amplitude);
		this.waveSets.push(waveSet);
		this.addChild(waveSet);
	}
}
