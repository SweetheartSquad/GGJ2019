import InteriorScene from './InteriorScene';
import { toExterior, toNextDay } from './helpers';
import Scene_2_outside from './Scene_2_outside';
import Scene_3_outside from './Scene_3_outside';

export default class extends InteriorScene {
	constructor() {
		super({
			npcs: [{
				name: 'father',
				x: 250,
				y: 250,
				lines: ['I don\'t understand any of this.',
                    'Or who any of you people are.',
                    'Where is my family?',
                    'They\'d better be safe…',
                    'Oh god.'
                ],
            },
            {
				name: 'dame',
				x: -100,
				y: 250,
				lines: [
                    'Would you like a sardine?',
                    'It\'s the fruit of the sea.'
                ],
			}],
			interact: [
				toExterior(Scene_2_outside),
				toNextDay(Scene_3_outside, 'Day 26')
			],
		});
	}
}
