import InteriorScene from './InteriorScene';
import { toExterior, toNextDay } from './helpers';
import Scene_6_outside from './Scene_6_outside';
import Scene_7_outside from './Scene_7_outside';

export default class extends InteriorScene {
	constructor() {
		super({
			npcs: [{
				name: 'oldGuy',
				x: 50,
				y: 250,
				lines: [
                    'We are being tested...',
                    'I shall remain strong.',
                    'You should as well.',

                ],
			}],
			interact: [
				toExterior(Scene_6_outside),
				toNextDay(Scene_7_outside, 'Day 7')
			],
		});
	}
}