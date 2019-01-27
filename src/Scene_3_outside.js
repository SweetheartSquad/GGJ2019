import Scene_3_inside from './Scene_3_inside';
import BoatScene from './BoatScene';
import { toInterior } from './helpers';


export default class extends BoatScene {
	constructor() {
		super({
			day: false,
			npcs: [{
				name: 'scout',
				x: 0,
				y: 150,
				lines: [
					'It was a dumb move.',
                    'Now we don’t have a lifeboat...',
                    'And he’s probably going to capsize.',
                    'Oh well. I hope he finds his family, I guess.',
				],
			}, {
				name: 'editor',
				x: 200,
				y: 150,
				lines: [
					'What an idiot.', 
                    'We all miss our families...',
                    'He’s not special.',

				],
			}],
			interact: [toInterior(Scene_3_inside)],
		});
		this.setRaining(true);
	}
}
