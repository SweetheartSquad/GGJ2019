import Scene_8_inside from './Scene_8_inside';
import BoatScene from './BoatScene';
import { toInterior } from './helpers';


export default class extends BoatScene {
	constructor() {
		super({
			npcs: [{
				name: 'oldGuy',
				x: 0,
				y: 150,
				lines: [
          'Another storm.',
          'How many more can we stand?',
				],
			}],
			interact: [toInterior(Scene_8_inside)],
		});
		this.setTurbulence(0.6);
	}
}
