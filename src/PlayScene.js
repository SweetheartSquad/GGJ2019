import PlayScene2 from './PlayScene2';
import BoatScene from './BoatScene';
import { Point } from 'pixi.js';
import { setScene, player } from './main';
import PlayScene3 from './PlayScene3';


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
			}, {
				name: 'oldGuy',
				scale: 0.2,
				x: -300,
				y: 150,
				label: 'say hi',
				lines: ['hello', 'whats up', 'im done talking now'],
			}, {
				name: 'scout',
				scale: 0.2,
				x: -150,
				y: 200,
				label: 'say hi',
				lines: ['hello', 'whats up', 'im done talking now'],
			}, {
				name: 'otherGuy',
				scale: 0.2,
				x: 100,
				y: 250,
				label: 'say hi',
				lines: ['hello', 'whats up', 'im done talking now'],
			}],
			interact: [{
				points: [
					new Point(-580, 100),
					new Point(-500, 100),
					new Point(-500, 400),
					new Point(-580, 400),
				],
				onEnter: () => {
					setTimeout(() => {
						setScene(new PlayScene3());
						// hallway entrance
						player.p.x = 424;
						player.p.y = 235;
					});
				},
			}],
		});
		this.setRaining(true);
	}
}
