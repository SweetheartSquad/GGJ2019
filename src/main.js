import gamepads from 'input-gamepads.js';
import Mouse from './input-mouse';
import keys from './input-keys';
import { Sprite } from 'pixi.js/lib/core';
import MenuScene from './MenuScene';
import PlayScene from './PlayScene'
import game, { resources } from './Game';
import { clamp } from './utils';
import Player from './Player';
import TextScene from './TextScene';

let mouse;
let activeScene;
export let player;

export function setScene(scene, text, time = 1000) {
	if (activeScene) {
		activeScene.destroy();
	}
	if (text) {
		window.scene = activeScene = new TextScene(text);
		game.app.stage.addChild(activeScene);
		setTimeout(() => {
			setScene(scene);
		}, time);
	} else {
		window.scene = activeScene = scene;
		game.app.stage.addChild(activeScene);
	}
}

export function getInput() {
	var res = {
		move: {
			x: gamepads.getAxis(gamepads.LSTICK_H),
			y: gamepads.getAxis(gamepads.LSTICK_V)
		},
		interact: gamepads.isJustDown(gamepads.A) ||
			gamepads.isJustDown(gamepads.B) ||
			gamepads.isJustDown(gamepads.X) ||
			gamepads.isJustDown(gamepads.Y) ||
			keys.isJustDown(keys.SPACE) ||
			keys.isJustDown(keys.E) ||
			keys.isJustDown(keys.Z) ||
			keys.isJustDown(keys.X) ||
			keys.isJustDown(keys.ENTER)
	};

	if (keys.isDown(keys.A) || keys.isDown(keys.LEFT)) {
		res.move.x -= 1;
	}
	if (keys.isDown(keys.D) || keys.isDown(keys.RIGHT)) {
		res.move.x += 1;
	}
	if (keys.isDown(keys.W) || keys.isDown(keys.UP)) {
		res.move.y -= 1;
	}
	if (keys.isDown(keys.S) || keys.isDown(keys.DOWN)) {
		res.move.y += 1;
	}

	res.move.x = clamp(-1.0, res.move.x, 1.0);
	res.move.y = clamp(-1.0, res.move.y, 1.0);

	return res;
}

export function init() {
	// initialize input managers
	gamepads.init();
	keys.init({
		capture: [keys.LEFT, keys.RIGHT, keys.UP, keys.DOWN, keys.SPACE, keys.ENTER, keys.BACKSPACE, keys.ESCAPE, keys.W, keys.A, keys.S, keys.D, keys.P, keys.M]
	});
	mouse = new Mouse(game.app.view, false);

	player = new Player();

	setScene(new PlayScene());

	// start main loop
	game.app.ticker.add(update);
	game.app.ticker.update();
}

function update() {
	// update
	activeScene.update();

	// let g = resources.song1.data.volume() + 0.01;
	// if (g < 1) {
	// 	resources.song1.data.volume(Math.min(1, g));
	// }
	// g = resources.song2.data.volume() + 0.01;
	// if (g < 0.25) {
	// 	resources.song2.data.volume(Math.min(.25, g));
	// }

	// update input managers
	gamepads.update();
	keys.update();
	mouse.update();
}
