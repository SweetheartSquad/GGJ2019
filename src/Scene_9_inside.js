import InteriorScene from './InteriorScene';
import { toExterior, toNextDay } from './helpers';
import Scene_9_outside from './Scene_9_outside';
import Scene_end from './Scene_end';

export default class extends InteriorScene {
	constructor() {
		super({
			npcs: [{
					name: 'editor',
					x: 250,
					y: 250,
					lines: ['I\'ve completely lost track of time.',
					'It feels like we’ve been out here forever.',
					'I\'m starting to forget...',
					'Ugh. I’ve got to stay focused.',									
					],
				},{
				name: 'oldGuy',
				x: 50,
				y: 250,
				lines: [
					'When this journey ends...',
					'Will you be ready?',
					'I hope I am ready.',
                ],
			}],
			interact: [
				toExterior(Scene_9_outside),
				toNextDay(Scene_end, 'END')
			],
		});
	}
}
