import game, { resources } from './Game';
import { lerp } from './utils';
import { Container, Text, Sprite, Point } from 'pixi.js/lib/core';

let offset = 0;
const font = {
	fontFamily: 'font',
	fontSize: 42,
	fill: 0x000000,
	stroke: 0xFFFFFF,
	strokeThickness: 6,
	align: 'center',
	antiAliased: false,
	lineHeight: 38,
};

export class Character extends Container {
	constructor({
		name = '',
		scale = .2,
		x = 0,
		y = 0,
	}) {
		super();
		this.name = name;
		this.rawScale = scale;
		this.p = { x, y };
		this.v = { x: 0, y: 0 };
		this.s = 1.0;
		this.freq = 1 / 200;
		this.offset = ++offset;
		this.bounce = 1;

		this.flipped = false;

		this.shadow = new Sprite(resources['shadows'].texture);
		this.shadow.anchor.x = 0.5;
		this.shadow.anchor.y = .75;
		this.spr = new Sprite(resources[name].texture);
		this.spr.anchor.x = 0.5;
		this.spr.anchor.y = 1.0;
		this.addChild(this.shadow);
		this.addChild(this.spr);
		this.zIndex = this.p.y;
		this.spr.scale.x = this.spr.scale.y = this.getScale() * this.rawScale;

		this.x = Math.floor(this.p.x);
		this.y = Math.floor(this.p.y);
		this.saying = '';
		this.text = new Text(this.saying, font);
		this.text.anchor.x = this.text.anchor.y = 0.5;
		game.app.stage.addChild(this.text);
	}

	destroy(options) {
		super.destroy(options);
		this.text.destroy();
	}

	getScale() {
		return .8 + (this.p.y + 250) / 300;
	}

	updateTransform() {
		super.updateTransform();
		this.text.text = this.saying;
		if (this.saying) {
			this.text.position = this.toGlobal(new Point(0, -this.spr.height - 20));
		}
		this.x = Math.floor(this.p.x);
		this.y = Math.floor(this.p.y);

		this.updateScale();
	}

	updateScale() {
		const curTime = game.app.ticker.lastTime * this.freq;
		this.s = lerp(this.s, this.getScale(), .3);
		this.spr.scale.y = (this.s + (Math.sin(curTime + this.offset) / 50 + Math.abs(Math.sin(curTime + this.offset) / 30))) * this.rawScale;
		this.spr.scale.x = (this.flipped ? -this.s : this.s) * this.rawScale;
		this.spr.skew.x = -this.v.x / 50;
		this.shadow.width = this.spr.width - (Math.sin(curTime + this.offset) / 30 + Math.abs(Math.sin(curTime + this.offset) / 10)) * 64;
		this.shadow.height = this.spr.height * 0.1;
	}
}

export default Character;
