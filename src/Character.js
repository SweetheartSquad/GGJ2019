import game, { resources } from './Game';
import { lerp } from './utils';

export function Character({
	name = '',
	scale = 1,
}){
	this.name = name;
	this.rawScale = scale;
	this.p = {x:0,y:0};
	this.v = {x:0,y:0};
	this.scale = 1.0;
	this.freq = 200;
	this.offset = Character.offset;
	this.talkOffset = 0;
	Character.offset += 1;

	this.flipped = false;

	this.con = new PIXI.Container();
	console.log(resources);
	this.shadow = new PIXI.Sprite(resources['shadows'].texture);
	// this.shadow.filters = [sprite_filter];
	this.shadow.anchor.x = 0.5;
	this.shadow.anchor.y = .75;
	this.spr = new PIXI.Sprite(resources[name].texture);
	// this.spr.filters = [sprite_filter];
	this.spr.anchor.x = 0.5;
	this.spr.anchor.y = 1.0;
	this.con.addChild(this.shadow);
	this.con.addChild(this.spr);
}

Character.offset = 0;

Character.prototype.update = function(){
	const curTime = game.app.ticker.lastTime;
	this.con.x = Math.floor(this.p.x);
	this.con.y = Math.floor(this.p.y);

	this.scale = lerp(this.scale, .8+(this.p.y+250)/300, .3) * this.rawScale;
	this.spr.scale.y = this.scale + (Math.sin(curTime/this.freq + this.offset)/50 + Math.abs(Math.sin(curTime/this.freq + this.offset)/30)) * this.rawScale;
	this.spr.scale.x = this.flipped ? -this.scale : this.scale;
	this.spr.skew.x = this.v.x/50;
	this.shadow.width = this.spr.width - (Math.sin(curTime/this.freq + this.offset)/30 + Math.abs(Math.sin(curTime/this.freq + this.offset)/10))*64;
	this.shadow.height = this.spr.height * 0.1;
}

export default Character;
