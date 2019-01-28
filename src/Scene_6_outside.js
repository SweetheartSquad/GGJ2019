import Scene_6_inside from './Scene_6_inside';
import BoatScene from './BoatScene';
import { toInterior, toObservation } from './helpers';


export default class extends BoatScene {
	constructor() {
		super({
			npcs: [{
				name: 'scout',
				x: 300,
				y: 150,
				lines: [
					'Do you think it\'s been.. uh...',
                    'The day’s been too... long?',
                    'It should be night right now.',
                    'The sun isn’t moving...',
				],
			}, {
				name: 'whizkid',
				x: 198,
				y: 270,
				lines: [
					'I think we\'re going North!',
                    'The days can get really long up here.',
                    'The sun can stay up for months!',
				],
			}],
			interact: [
				toInterior(Scene_6_inside),
				toObservation()
			],
		});
		this.setRaining(false);
	}
}
