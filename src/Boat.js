import { resources } from "./Game";
import { Floor } from "./Floor";

export class Boat extends Floor {
	constructor() {
		super({
			bg: resources.boat.texture,
			fg: resources.boatFront.texture,
		});
	}
}
