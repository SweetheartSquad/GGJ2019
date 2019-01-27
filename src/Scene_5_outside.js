import Scene_5_inside from './Scene_5_inside';
import BoatScene from './BoatScene';
import { toInterior } from './helpers';


export default class extends BoatScene {
	constructor() {
		super({
			npcs: [{
				name: 'dame',
				x: 0,
				y: 150,
				lines: [
          'I was worried we had run out of sardines.',
          'But I found more.',
          'Would you like another sardine?',
				],
			}],
			interact: [toInterior(Scene_5_inside)],
		});
	}
}
