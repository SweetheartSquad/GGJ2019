import InteriorScene from './InteriorScene';
import { toExterior, toNextDay } from './helpers';
import Scene_4_outside from './Scene_4_outside';
import Scene_5_outside from './Scene_5_outside';

export default class extends InteriorScene {
	constructor() {
		super({
			npcs: [],
			interact: [
				toExterior(Scene_4_outside),
				toNextDay(Scene_5_outside, 'Day 30')
			],
		});
	}
}
