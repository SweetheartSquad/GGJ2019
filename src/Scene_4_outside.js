import Scene_4_inside from './Scene_4_inside';
import BoatScene from './BoatScene';
import { toInterior } from './helpers';


export default class extends BoatScene {
	constructor() {
		super({
			day: false,
			npcs: [{
				name: 'editor',
				x: -100,
				y: 300,
				lines: [
          'You know, my dad and I had a huge fight.',
          'It was a long time ago, but…',
          'I haven\'t spoken to him since.',
          'Before we all… got here, I got a call.',
          'My mom said he was in the hospital.',
          'I just hope, when we get back to land…',
          'It\'s not too late.',
          'It seems so stupid now, but…',
          'I can\'t go back.',
          'I just have to make the best of what\'s left.',
          'Anyway...',
          'Thanks for listening.'
				],
			}, {
				name: 'dame',
				x: 250,
				y: 150,
				lines: [
          'The sea. I missed her.',
          'An odd way for us to meet again…',
          'But I am happy to be back.',
          'The sea is beautiful this time of night.'
				],
			}],
			interact: [toInterior(Scene_4_inside)],
		});
	}
}
