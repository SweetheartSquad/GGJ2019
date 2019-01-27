import InteriorScene from './InteriorScene';
import { toExterior, toNextDay } from './helpers';
import Scene_3_outside from './Scene_3_outside';
import Scene_4_outside from './Scene_4_outside';

export default class extends InteriorScene {
	constructor() {
		super({
			npcs: [{
				name: 'whizkid',
				x: 250,
				y: 250,
				lines: ['I don’t understand, why would he leave...',
					'I don’t know, I sort of thought he could be my new dad.'				
                ],
            },
            {
				name: 'oldGuy',
				x: 50,
				y: 250,
				lines: [
                    'He was not prepared for this journey.',
					'His faith was lacking.',
					'He will perish.',
                ],
			}],
			interact: [
				toExterior(Scene_3_outside),
				toNextDay(Scene_4_outside, 'Day 29')
			],
		});
	}
}
