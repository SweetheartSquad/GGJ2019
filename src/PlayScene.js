
import { getInput } from './main';
import game, { resources } from './Game';
import { Container, Sprite, Graphics, Point } from 'pixi.js/lib/core';
import size from './size';
import WaveSet from './WaveSet';
import NavMesh from './NavMesh';
import Character from './Character';
import { Boat } from './Boat';
import { lerp } from './utils';
import InteractableMesh from './InteractableMesh';

export const playerSpeedX = 1.1;
export const playerSpeedY = 0.4;
let g = new Graphics();
let player;
let bounds = new NavMesh([{
	points: [
		new Point(140 - 400, 140 - 400),
		new Point(700 - 400, 140 - 400),
		new Point(700 - 400, 400 - 400),
		new Point(140 - 400, 400 - 400),
	]
}, {
	points: [
		new Point(540 - 400, 540 - 400),
		new Point(400 - 400, 540 - 400),
		new Point(400 - 400, 300 - 400),
		new Point(540 - 400, 300 - 400),
	]
}, {
	points: [
		new Point(240 - 400, 240 - 400),
		new Point(400 - 400, 240 - 400),
		new Point(400 - 400, 300 - 400),
		new Point(240 - 400, 300 - 400),
	]
}, {
	points: [
		new Point(240 - 400, 340 - 400),
		new Point(500 - 400, 350 - 400),
		new Point(500 - 400, 300 - 400),
		new Point(340 - 400, 300 - 400),
	]
}, {
	points: [
		new Point(500 - 400, 500 - 400),
		new Point(700 - 400, 200 - 400),
		new Point(750 - 400, 180 - 400),
		new Point(800 - 400, 200 - 400),
		new Point(800 - 400, 800 - 400),
		new Point(500 - 400, 800 - 400),
	]
}]);


let interactiveBounds = new InteractableMesh([{
	points: [
		new Point(140 - 400, 140 - 400),
		new Point(240 - 400, 140 - 400),
		new Point(240 - 400, 400 - 400),
		new Point(140 - 400, 400 - 400),
	], 
	onEnter: ()=>{console.log("Enter")},
	onExit: ()=>{console.log("Exit")}
}]);


let turbulenceInput = 0.3;
export let turbulence = 1;

export default class PlayScene extends Container {
    
    constructor() {
        super(); 

        this.waveSets = [];
        
        this.addWaveSet(0, 160, 10);
        this.addWaveSet(32, 200, 10);
        this.addWaveSet(64, 240, 30);
        this.addWaveSet(128, 280, 20);
        this.addWaveSet(192, 320, 20);
        this.addWaveSet(210, 360, 20);
        this.addWaveSet(250, 400, 20);
        this.addWaveSet(260, 440, 20);

        this.boat = new Boat();
        this.addChild(this.boat);
        this.addWaveSet(192, size.y - 220, 20);
        this.addWaveSet(128, size.y - 180, 20);
        this.addWaveSet(64, size.y - 140, 30);
        this.addWaveSet(0, size.y - 110, 10);

        // for(let i = -2; i < 10; i++){
        //     this.addWaveSet(i * 64, i * size.y/10, 20);
        //     if(i == 5){

        //     this.boat = new Sprite(resources.boat.texture);
        //     this.addChild(this.boat);
        //     }
        // }


		player = new Character({
            name: 'fella',
            scale: 0.25,
        });
		player.camPoint = new PIXI.DisplayObject();
		player.camPoint.visible = false;
		player.con.addChild(player.camPoint);
		player.p.x = bounds.getCenter().x;
		player.p.y = bounds.getCenter().y;
		// characters.characters.push(player);

		this.boat.addChild(g);
		this.boat.addChild(player.con);

		const font = {
			fontFamily: 'Comic Sans MS',
			fontWeight: 'bold',
			fontSize: 32,
			fill: 0x000000,
			stroke: 0xFFFFFF,
			strokeThickness: 3,
			align: 'left',
			antiAliased: false
		};
		const text = new PIXI.Text("", font);
		text.y = -200;
		text.anchor.x = 0.5;
		text.anchor.y = 0.5;
		player.con.addChild(text);
    }
    
	destroy() {
        Container.prototype.destroy.call(this);
	}

	update() {
        this.waveSets.forEach((waveSet)=>{
            waveSet.update(); 
        });
        
		g.clear();
		const curTime = game.app.ticker.lastTime;
        turbulence = lerp(0.3, 4, turbulenceInput);
		
        const input = getInput();
		// update player
		player.v.x *= 0.8;
		player.v.x += input.move.x * playerSpeedX;

		player.v.y *= 0.8;
		player.v.y += input.move.y * playerSpeedY;

		bounds.update(player);
		interactiveBounds.update(player);


		player.p.x += player.v.x;
		var oldy = player.p.y;
		player.p.y += player.v.y;


		if (Math.abs(player.v.x) + Math.abs(player.v.y) > 1) {
			if (player.running) {
				player.running += 1;
			} else {
				player.running = 1;
			}
		} else {
			if (player.running) {
				player.running = 0;
				player.spr.texture = PIXI.utils.TextureCache[player.name];
			}
		}
		player.freq = (player.running ? 0.5 : 1.0) * 200;
		if (player.running) {
			if (player.running > 5) {
				player.spr.texture = PIXI.utils.TextureCache[`${player.name}_run_${(Math.floor(curTime / player.freq) % 2 + 1)}`];
			}
			player.flipped = player.v.x < 0;
			player.spr.anchor.y = 1 + Math.abs(Math.pow(Math.sin(curTime / player.freq), 2)) / 20;
		} else {
			player.spr.anchor.y = 1;
		}

		player.update();
		bounds.debugDraw(g);
		interactiveBounds.debugDraw(g);
        
        this.boat.rotation = ((Math.sin(curTime/300) + Math.sin(curTime/200)) * 0.5 * 0.01) * turbulence;
        const waveY = 0.5* (Math.sin(curTime/300) + Math.sin(curTime/400)) + Math.sin(curTime/10) * 0.05 * Math.sin(curTime/50);
        const waveX = Math.sin(curTime/500) + Math.sin(curTime/300) * 0.05 * Math.sin(curTime/50);
        this.boat.y = this.boat.bg.height / 2 + waveY * 4 * turbulence;
        this.boat.x = this.boat.bg.width / 2 + waveX * 2 * turbulence;
    }
    
    addWaveSet(x, y, amplitude){
        var waveSet = new WaveSet(x, y, amplitude);
        this.waveSets.push(waveSet);
        this.addChild(waveSet);
    }

}
