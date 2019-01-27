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
					new Point(500, 100),
					new Point(450, 100),
					new Point(450, 400),
					new Point(500, 400),
				],
				onEnter: () => {
					setTimeout(() => {
						setScene(new PlayScene());
						// hallway exit
						player.p.x = -480;
						player.p.y = 240;
					});
				},
			}],
		});
	}
}
