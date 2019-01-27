import InteriorScene from './InteriorScene';
import { toExterior, toNextDay } from './helpers';
import Scene_8_outside from './Scene_8_outside';
import Scene_9_outside from './Scene_9_outside';

export default class extends InteriorScene {
	constructor() {
		super({
      npcs: [],
			interact: [
				toExterior(Scene_8_outside),
				toNextDay(Scene_9_outside, 'Day 30'),
			],
		});
	}
}
