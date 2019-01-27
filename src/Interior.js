import { resources } from "./Game";
import { Floor } from "./Floor";

export class Interior extends Floor {
	constructor() {
		super({
			bg: resources.interior.texture,
			fg: resources.interiorFront.texture,
		});
	}
}
