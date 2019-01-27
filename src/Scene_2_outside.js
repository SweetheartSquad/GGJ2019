import Scene_2_inside from './Scene_2_inside';
import BoatScene from './BoatScene';
import { toInterior } from './helpers';


export default class extends BoatScene {
	constructor() {
		super({
			npcs: [{
				name: 'scout',
				x: -230,
				y: 150,
				lines: [
					'I put out some containers to collect rainwater.',
					'We should have enough to drink for a while...',
					'But I don\'t know how long we\'ll be out here.',
					'You don\'t remember anything either, do you?',
					'About how we got on this ship.',
					'I guess we just keep going forward.',
					'We\'ll hit land eventually.'
				],
			}, {
				name: 'whizkid',
				x: 200,
				y: 250,
				lines: [
					'Where do you think we\'re going? ',
					'It\'s kind of exciting isn\'t it?',
					'I\'ve never been on a boat before.',
					'I just wish my mom and dad could be here to see this.'
				],
			}, {
				name: 'oldGuy',
				x: 300,
				y: 150,
				lines: ['How did we get here?', 'I wonder...'],
			}],
			interact: [toInterior(Scene_2_inside)],
		});
		this.setRaining(true);
	}
}
