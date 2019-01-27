import InteriorScene from './InteriorScene';
import Scene_1_outside from './Scene_1_outside';
import { toExterior, toNextDay } from './helpers';
import Scene_2_outside from './Scene_2_outside';

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
			interact: [
				toExterior(Scene_1_outside),
				toNextDay(Scene_2_outside, 'Day 2')
			],
		});
	}
}
