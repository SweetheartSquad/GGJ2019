import InteriorScene from './InteriorScene';
import { toExterior, toNextDay } from './helpers';
import Scene_2_outside from './Scene_2_outside';

export default class extends InteriorScene {
	constructor() {
		super({
			npcs: [{
				name: 'father',
				x: 130,
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
				x: 400,
				y: 250,
				lines: [
                    'Would you like a sardine?',
                    'It\'s the fruit of the sea.'
                ],
			}],
			interact: [
				toExterior(Scene_2_outside),
				toNextDay(Scene_2_outside, 'Day 2')
			],
		});
	}
}
