import { getInput, setScene } from './main';
import game, { resources } from './Game';
import { Container, Sprite, Point } from 'pixi.js';
import PoseScene from './PoseScene';
import Character from './Character';
import Bounds from './Bounds';
import V from './vector';
import { Graphics } from 'pixi.js/lib/core';
import { NavMesh } from './NavMesh';
let player;
let bounds = new NavMesh([{
	points: [
		new Point(140, 140),
		new Point(700, 140),
		new Point(700, 400),
		new Point(140, 400),
	]
}, {
	points: [
		new Point(540, 540),
		new Point(400, 540),
		new Point(400, 300),
		new Point(540, 300),
	]
}, {
	points: [
		new Point(240, 240),
		new Point(400, 240),
		new Point(400, 300),
		new Point(240, 300),
	]
}, {
	points: [
		new Point(240, 340),
		new Point(500, 350),
		new Point(500, 300),
		new Point(340, 300),
	]
}, {
	points: [
		new Point(500, 500),
		new Point(800, 180),
		new Point(800, 800),
		new Point(500, 800),
	]
}]);
let g = new Graphics();
export default class TestScene extends Container {
	constructor() {
		super();

		player = new Character('poser');
		player.camPoint = new PIXI.DisplayObject();
		player.camPoint.visible = false;
		player.con.addChild(player.camPoint);
		player.p.x = bounds.getCenter().x;
		player.p.y = bounds.getCenter().y;
		// characters.characters.push(player);

		this.addChild(g);
		this.addChild(player.con);

		const font = {
			fontFamily: 'Comic Sans MS',
			fontWeight: 'bold',
			fontSize: 32,
			fill: 0x000000,
			stroke: 0xFFFFFF,
			strokeThickness: 3,
			align: 'left',
			antiAliased: false
		};
		const text = new PIXI.Text("", font);
		text.y = -200;
		text.anchor.x = 0.5;
		text.anchor.y = 0.5;
		player.con.addChild(text);
	}
	update() {
		g.clear();
		const curTime = game.app.ticker.lastTime;
		
		const input = getInput();
		// update player
		player.v.x *= 0.8;
		player.v.x += input.move.x * 2.0;

		player.v.y *= 0.8;
		player.v.y += input.move.y;

		bounds.update(player);

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
				// player.spr.texture = PIXI.utils.TextureCache['player_idle'];
			}
		}
		player.freq = (player.running ? 0.5 : 1.0) * 200;
		if (player.running) {
			if (player.running > 5) {
				// player.spr.texture = PIXI.utils.TextureCache['player_run_' + (Math.floor(curTime / player.freq) % 2 + 1)];
			}
			player.flipped = player.v.x < 0;
			player.spr.anchor.y = 1 + Math.abs(Math.pow(Math.sin(curTime / player.freq), 2)) / 20;
		} else {
			player.spr.anchor.y = 1;
		}

		player.update();
		bounds.debugDraw(g);
	}
}
