import gamepads from 'input-gamepads.js';
import Mouse from './input-mouse';
import keys from './input-keys';
import Scene_1_outside from './Scene_1_outside'
import game from './Game';
import { clamp } from './utils';
import Player from './Player';
import TextScene from './TextScene';

let mouse;
export let activeScene;
export let player;

export function setScene(scene, text, time = 2500) {
	if (activeScene) {
		activeScene.destroy({
			children: true,
		});
	}
	if (text) {
		window.scene = activeScene = new TextScene(text);
		game.app.stage.addChildAt(activeScene, 0);
		setTimeout(() => {
			setScene(scene);
		}, time);
	} else {
		window.scene = activeScene = scene;
		game.app.stage.addChildAt(activeScene, 0);
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

	player = new Player({
		x: 12,
		y: 144,
	});

	setScene(new Scene_1_outside(), 'Day 1');

	// start main loop
	game.app.ticker.add(update);
	game.app.ticker.update();
}

function update() {
	// update
	activeScene.update();

	// update input managers
	gamepads.update();
	keys.update();
	mouse.update();
}
