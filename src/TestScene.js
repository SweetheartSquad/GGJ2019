import { getInput, setScene } from './main';
import game, { resources } from './Game';
import { Container, Sprite } from 'pixi.js/lib/core';
import PoseScene from './PoseScene';
import Character from './Character';
let player;
export default class TestScene extends Container {
	constructor() {
		super();

		player = new Character('poser');
		player.camPoint = new PIXI.DisplayObject();
		player.camPoint.visible = false;
		player.con.addChild(player.camPoint);
		// characters.characters.push(player);

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
		const curTime = game.app.ticker.lastTime;
		
		const input = getInput();
		// update player
		player.v.x *= 0.8;
		player.v.x += input.move.x * 2.0;

		player.v.y *= 0.8;
		player.v.y += input.move.y;

		if (player.p.y > 70) {
			player.v.y -= (player.p.y - 70) / 3;
		}
		if (player.p.y < -70) {
			player.v.y -= (player.p.y + 70) / 3;
		}

		// if (player.p.x > WORLD_RIGHT) {
		// 	player.v.x -= (player.p.x - WORLD_RIGHT) / 3;
		// }
		// if (player.p.x < WORLD_LEFT) {
		// 	player.v.x -= (player.p.x - WORLD_LEFT) / 3;
		// }

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
		// if (this.ready && getInput().justDown) {
		// 	this.destroy();
		// 	setScene(new PoseScene());
		// }
	}
}
