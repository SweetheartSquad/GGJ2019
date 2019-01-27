import Scene_9_inside from './Scene_9_inside';
import BoatScene from './BoatScene';
import { toInterior } from './helpers';


export default class extends BoatScene {
	constructor() {
		super({
			npcs: [{
				name: 'scout',
				x: 250,
				y: 220,
				lines: [
					'I want us all to get home.',
					'But the more I think about it...',
					'I\'m not sure I want to go home.',
					'There’s not much there for me.',
					'It\'s funny.',
					'I\'ve felt more purpose out here...',
					'Than I ever did back home.',
					'I feel alive out here.',
				],
			}],
			interact: [toInterior(Scene_9_inside)],
		});
		this.setRaining(true);
	}
}
