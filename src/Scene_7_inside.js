import InteriorScene from './InteriorScene';
import Scene_7_outside from './Scene_7_outside';
import Scene_8_outside from './Scene_8_outside';
import { toExterior, toNextDay } from './helpers';

export default class PlayScene3 extends InteriorScene {
	constructor() {
		super({
			npcs: [{
				name: 'dame',
				x: 130,
				y: 250,
				lines: ['I have enjoyed getting to know you all.', 'We make a good team.'],
			}, {
				name: 'whizkid',
				x: 0,
				y: 250,
				lines: ['I miss my mom and dad.', 'I just wanna go home.'],
			}],
			interact: [
				toExterior(Scene_7_outside),
				toNextDay(Scene_8_outside, 'Day 30')
			],
		});
	}
}
