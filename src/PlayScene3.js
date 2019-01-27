import InteriorScene from './InteriorScene';
import PlayScene from './PlayScene';
import { Point } from 'pixi.js/lib/core';
import { setScene, player } from './main';

export default class PlayScene3 extends InteriorScene {
	constructor() {
		super({
			npcs: [{
				name: 'dame',
				scale: 0.2,
				x: 130,
				y: 250,
				label: 'say hi',
				lines: ['hello', 'whats up', 'im done talking now'],
			}],
			interact: [{
				points: [
					new Point(-140, -100),
					new Point(-20, -100),
					new Point(-20, 120),
					new Point(-140, 120),
				],
				onEnter: () => {
					player.p.y += 20;
					setTimeout(() => setScene(new PlayScene()));
				},
			}],
		});
	}
}