import Scene_7_inside from './Scene_7_inside';
import BoatScene from './BoatScene';
import { toInterior, toObservation } from './helpers';


export default class extends BoatScene {
	constructor() {
		super({
			npcs: [{
				name: 'scout',
				x: 200,
				y: 250,
				lines: [
					'I\'m worried about that dude.',
					'Well, more importantly...',
					'We\'re almost out of water.',
					'Hopefully it\'ll rain again.',
				],
			}, {
				name: 'oldGuy',
				x: 300,
				y: 150,
				lines: [
					'I don\'t understand His will...',
					'But I am learning much.',
					'At the end of this journey...',
					'We will be rewarded for our faith.'
				],
			}],
			interact: [
				toInterior(Scene_7_inside),
				toObservation()
			],
		});
		this.setTurbulence(0.1);
	}
}
