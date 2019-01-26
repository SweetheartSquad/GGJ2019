import Container from "pixi.js/lib/core/display/Container";
import { Sprite } from "pixi.js/lib/core";
import { resources } from "./Game";

export class Boat extends Container {
	constructor() {
		super();
		this.bg = new Sprite(resources.boat.texture);
		this.addChild(this.bg);
		this.bg.anchor.x = this.bg.anchor.y = 0.5;
	}
}
