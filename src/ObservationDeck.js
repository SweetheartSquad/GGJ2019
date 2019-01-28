import { resources } from "./Game";
import { Floor } from "./Floor";

export class Observation extends Floor {
	constructor() {
		super({
			bg: resources.observation.texture,
			fg: resources.observationFront.texture,
		});
		this.fg.y += 160;
	}
}
