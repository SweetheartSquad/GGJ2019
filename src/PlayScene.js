import BoatScene from './BoatScene';


export default class PlayScene extends BoatScene {
	constructor() {
		super({
			npcs: [{
				name: 'fella',
				scale: 0.2,
				x: 0,
				y: 0,
				label: 'say hi',
				lines: ['hello', 'whats up', 'im done talking now'],
			}, {
				name: 'dame',
				scale: 0.2,
				x: 130,
				y: 150,
				label: 'say hi',
				lines: ['hello', 'whats up', 'im done talking now'],
			}]
		});
	}
}
