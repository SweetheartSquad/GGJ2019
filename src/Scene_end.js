import BoatScene from './BoatScene';
import { toInterior } from './helpers';
import TextScene from './TextScene';


export default class extends BoatScene {
	constructor() {
		super({
			interact: [toInterior(function(){return new TextScene('Where is everybody?');})],
		});
		this.setRaining(true);
		this.setTurbulence(10);
	}
}
