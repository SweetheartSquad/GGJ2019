import BoatScene from './BoatScene';
import { toInterior, toNextDay } from './helpers';
import TextScene from './TextScene';
import { setScene } from './main';
import { lerp } from './utils';

const endLines = [
	'This storm is the worst one yet.',
	'Where is everyone?',
	'Hello?',
];
const turbulences = [
	0.9,
	1.5,
	3.0,
	10.0,
]
let end = 0;

export class Scene_end extends BoatScene {
	constructor() {
		super({
			day: false,
		});
		this.setRaining(true);
		this.setTurbulence(turbulences[end] || 10);
		const line = endLines[end];
		if (end < endLines.length) {
			setTimeout(() => {
				setScene(new Scene_end(), line);
			}, 5000 + (end === 0 ? 4000 : 0));
		} else if(end === endLines.length) {
			setTimeout(() => {
				this.lightningStrike();
			}, 2000);
			setTimeout(() => {
				setScene(new TextScene('Anybody?'));
			}, 6000);
			setTimeout(() => {
				setScene(new TextScene(''));
			}, 12000);
		}
		++end;
	}
}

export default Scene_end;
