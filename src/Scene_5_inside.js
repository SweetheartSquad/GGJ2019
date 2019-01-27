import InteriorScene from './InteriorScene';
import { toExterior, toNextDay } from './helpers';
import Scene_5_outside from './Scene_5_outside';
import Scene_6_outside from './Scene_6_outside';

export default class extends InteriorScene {
	constructor() {
		super({
      npcs: [{
				name: 'editor',
				x: 0,
				y: 150,
				lines: [
          'The kid is handling this well.',
          'I\'d be so scared if I were his age.',
				],
			},
      {
        name: 'whizKid',
        x: 100,
        y: 50,
        lines: [
          'This is so fun!',
          'I\'ve never been away from home for so long. ',
          'I think I\'m ready to go home, though…',
          'I really miss my parents.',

        ],
      }],
			interact: [
				toExterior(Scene_5_outside),
				toNextDay(Scene_6_outside, 'Day 30'),
			],
		});
	}
}
