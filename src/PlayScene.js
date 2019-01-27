import PlayScene2 from './PlayScene2';
import BoatScene from './BoatScene';
import { Point } from 'pixi.js';
import { setScene, player } from './main';


export default class PlayScene extends BoatScene {
	constructor() {
		super({
			npcs: [{
				name: 'fella',
				scale: 0.2,
				x: 130,
				y: 0,
				label: 'say hi',
				lines: ['hello', 'whats up', 'im done talking now'],
			}, {
				name: 'dame',
				scale: 0.2,
				x: 0,
				y: 150,
				label: 'say hi',
				lines: ['hello', 'whats up', 'im done talking now'],
			}],
			interact: [{
				points: [
					new Point(-140, -100),
					new Point(-20, -100),
					new Point(-20, 20),
					new Point(-140, 20),
				],
				onEnter: () => {
					player.p.y += 20;
					setTimeout(() => setScene(new PlayScene2()));
				},
			}],
		});
	}
}
