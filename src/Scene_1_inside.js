import InteriorScene from './InteriorScene';
import Scene_1_outside from './Scene_1_outside';
import { toExterior, toNextDay } from './helpers';
import Scene_2_outside from './Scene_2_outside';

export default class extends InteriorScene {
	constructor() {
		super({
			npcs: [{
				name: 'editor',
				x: -230,
				y: 250,
				lines: [
					'This storm is really bad...',
					'I don’t... remember anything.',
					'Are we going to be okay?',
				],
			}, {
				name: 'whizkid',
				x: -130,
				y: 250,
				lines: [
					'Man, what\'s going on?',
					'I just want to go home and see my mom.',
				],
			}, {
				name: 'dame',
				x: 130,
				y: 250,
				lines: [
					'I haven\'t seen a storm like this in many years.',
					'Be careful out there.',
				],
			}],
			interact: [
				toExterior(Scene_1_outside),
				toNextDay(Scene_2_outside, 'Day 2')
			],
		});
	}
}
