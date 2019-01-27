import Container from "pixi.js/lib/core/display/Container";
import { Sprite } from "pixi.js/lib/core";
import { resources } from "./Game";

export class Boat extends Container {
	constructor() {
		super();
		this.sortableChildren = true;
		this.bg = new Sprite(resources.boat.texture);
		this.bg.anchor.x = this.bg.anchor.y = 0.5;
		this.bg.zIndex = -100000;
		this.addChild(this.bg);
		this.fg = new Sprite(resources.boatFront.texture);
		this.fg.anchor.x = this.fg.anchor.y = 0.5;
		this.fg.zIndex = 100000;
		this.addChild(this.fg);
		this.sortDirty = true;
	}

	updateTransform() {
		if (this.sortDirty) {
			this.children.sort(({ zIndex: a = 0 }, { zIndex: b = 0 }) => a - b);
			this.sortDirty = false;
		}
		super.updateTransform();
	}
}
