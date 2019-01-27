import game, { resources } from './Game';
import { lerp } from './utils';
import { Container, Text, Sprite } from 'pixi.js/lib/core';

let offset = 0;

const font = {
	fontFamily: 'font',
	fontSize: 52,
	fill: 0x000000,
	stroke: 0xFFFFFF,
	strokeThickness: 12,
	align: 'left',
	antiAliased: false
};

export class Character extends Container {
	constructor({
		name = '',
		scale = 1,
		x = 0,
		y = 0,
	}) {
		super();
		this.name = name;
		this.rawScale = scale;
		this.p = { x, y };
		this.v = { x: 0, y: 0 };
		this.s = 1.0;
		this.freq = 200;
		this.offset = ++offset;
		this.talkOffset = 0;

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

		this.text1 = new Text("", font);
		this.text2 = new Text("", { ...font, strokeThickness: 0 });
		this.text2.y = this.text1.y = -this.height - 52;
		this.text2.anchor.x = this.text2.anchor.y = this.text1.anchor.x = this.text1.anchor.y = 0.5;
		this.x = Math.floor(this.p.x);
		this.y = Math.floor(this.p.y);
		this.addChild(this.text1);
		this.addChild(this.text2);
		this.saying = '';
	}

	getScale() {
		return .8 + (this.p.y + 250) / 300;
	}

	updateTransform() {
		super.updateTransform();
		this.text1.text = this.text2.text = this.saying;
		const curTime = game.app.ticker.lastTime;
		this.x = Math.floor(this.p.x);
		this.y = Math.floor(this.p.y);

		this.s = lerp(this.s, this.getScale(), .3);
		this.spr.scale.y = (this.s + (Math.sin(curTime / this.freq + this.offset) / 50 + Math.abs(Math.sin(curTime / this.freq + this.offset) / 30))) * this.rawScale;
		this.spr.scale.x = (this.flipped ? -this.s : this.s) * this.rawScale;
		this.spr.skew.x = this.v.x / 50;
		this.shadow.width = this.spr.width - (Math.sin(curTime / this.freq + this.offset) / 30 + Math.abs(Math.sin(curTime / this.freq + this.offset) / 10)) * 64;
		this.shadow.height = this.spr.height * 0.1;
	}
}

export default Character;
