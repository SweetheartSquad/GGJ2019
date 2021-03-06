import Scene_8_inside from './Scene_8_inside';
import BoatScene from './BoatScene';
import { toInterior, toObservation } from './helpers';


export default class extends BoatScene {
	constructor() {
		super({
			npcs: [{
				name: 'oldGuy',
				x: 230,
				y: 150,
				lines: [
          'Another storm.',
          'How many more can we stand?',
				],
			}],
			interact: [
				toInterior(Scene_8_inside),
				toObservation()
			],
		});
		this.setRaining(true);
		this.setTurbulence(0.6);
	}
}
