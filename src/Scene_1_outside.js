import Scene_1_inside from './Scene_1_inside';
import BoatScene from './BoatScene';
import { toInterior, toObservation } from './helpers';


export default class extends BoatScene {
	constructor() {
		super({
			day: false,
			npcs: [{
				name: 'scout',
				x: -100,
				y: 150,
				lines: ['Everybody inside!', 'No point getting wet out here.', 'Get inside with the others.'],
			}, {
				name: 'father',
				x: 50,
				y: 150,
				lines: ['Is there anything I can do to help?', 'Where\'s the captain??'],
			}, {
				name: 'oldGuy',
				x: 300,
				y: 250,
				lines: ['I can barely see anything...', 'Where are we?', 'It\'s so cold...'],
			}],
			interact: [
				toInterior(Scene_1_inside),
				toObservation()
			],
		});
		this.setRaining(true);
	}
}
