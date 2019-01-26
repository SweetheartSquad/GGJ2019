import { getInput, setScene } from './main';
import game, { resources } from './Game';
import { Container, Sprite, Point } from 'pixi.js';
import PoseScene from './PoseScene';
import Character from './Character';
import Bounds from './Bounds';
import V from './vector';
import { Graphics } from 'pixi.js/lib/core';
let player;
let bounds = new Bounds([
	new Point(140 + Math.random() * 40,140 + Math.random() * 40),
	new Point(400 + Math.random() * 40,140 + Math.random() * 40),
	new Point(400 + Math.random() * 40,400 + Math.random() * 40),
	new Point(140 + Math.random() * 40,400 + Math.random() * 40),
]);
let g = new Graphics();
console.log(bounds);
export default class TestScene extends Container {
	constructor() {
		super();

		player = new Character('poser');
		player.camPoint = new PIXI.DisplayObject();
		player.camPoint.visible = false;
		player.con.addChild(player.camPoint);
		player.p.x = bounds.center.x;
		player.p.y = bounds.center.y;
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

		const start = player.p;
		const end = bounds.center;
		const d = bounds.dist(start, end);
		g.beginFill();
		g.lineStyle(3, 400000);
		g.moveTo(start.x, start.y);
		g.lineTo(end.x, end.y);
		g.endFill();
		if (d) {
			g.beginFill();
			g.lineStyle(3, 300000);
			g.moveTo(player.p.x, player.p.y);
			g.lineTo(d.x, d.y);
			g.endFill();
			const v = V.subtract(d, player.p);
			player.v.x += v.x/5;
			player.v.y += v.y/5;
		}

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
		g.beginFill(0,0);
		g.lineStyle(3, 200000);
		g.drawPolygon(bounds);
		g.endFill();
		// if (this.ready && getInput().justDown) {
		// 	this.destroy();
		// 	setScene(new PoseScene());
		// }
	}
}
