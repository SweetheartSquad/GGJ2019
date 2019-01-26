
import { getInput, setScene } from './main';
import game, { resources } from './Game';
import { Container, Sprite, Graphics, Point } from 'pixi.js/lib/core';
import { BitmapText } from 'pixi.js/lib/extras';
import EndScene from './EndScene';
import Peep from './Peep';
import CustomFilter from './CustomFilter';
import Wave from './Wave';
import size from './size';
import WaveSet from './WaveSet';
import assets from './assets';
import NavMesh from './NavMesh';
import Character from './Character';

let g = new Graphics();
let player;
let bounds = new NavMesh([{
	points: [
		new Point(140, 140),
		new Point(700, 140),
		new Point(700, 400),
		new Point(140, 400),
	]
}, {
	points: [
		new Point(540, 540),
		new Point(400, 540),
		new Point(400, 300),
		new Point(540, 300),
	]
}, {
	points: [
		new Point(240, 240),
		new Point(400, 240),
		new Point(400, 300),
		new Point(240, 300),
	]
}, {
	points: [
		new Point(240, 340),
		new Point(500, 350),
		new Point(500, 300),
		new Point(340, 300),
	]
}, {
	points: [
		new Point(500, 500),
		new Point(800, 180),
		new Point(800, 800),
		new Point(500, 800),
	]
}]);

export default class PlayScene extends Container {
    
    constructor() {
        super(); 

        this.waveSets = [];
        
        this.addWaveSet(0, 160, 10);
        this.addWaveSet(0, 200, 10);
        this.addWaveSet(64, 240, 30);
        this.addWaveSet(128, 280, 20);
        this.addWaveSet(192, 320, 20);
        this.addWaveSet(210, 360, 20);
        this.addWaveSet(250, 400, 20);
        this.addWaveSet(250, 440, 20);

        this.boat = new Sprite(resources.boat.texture);
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


		player = new Character('fella');
		player.camPoint = new PIXI.DisplayObject();
		player.camPoint.visible = false;
		player.con.addChild(player.camPoint);
		player.p.x = bounds.getCenter().x;
		player.p.y = bounds.getCenter().y;
		// characters.characters.push(player);

		this.addChild(g);
		this.addChild(player.con);

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
		
		const input = getInput();
		// update player
		player.v.x *= 0.8;
		player.v.x += input.move.x * 2.0;

		player.v.y *= 0.8;
		player.v.y += input.move.y;

		bounds.update(player);

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
				// player.spr.texture = PIXI.utils.TextureCache['player_idle'];
			}
		}
		player.freq = (player.running ? 0.5 : 1.0) * 200;
		if (player.running) {
			if (player.running > 5) {
				// player.spr.texture = PIXI.utils.TextureCache['player_run_' + (Math.floor(curTime / player.freq) % 2 + 1)];
			}
			player.flipped = player.v.x < 0;
			player.spr.anchor.y = 1 + Math.abs(Math.pow(Math.sin(curTime / player.freq), 2)) / 20;
		} else {
			player.spr.anchor.y = 1;
		}

		player.update();
		bounds.debugDraw(g);
    }
    
    addWaveSet(x, y, amplitude){
        var waveSet = new WaveSet(x, y, amplitude);
        this.waveSets.push(waveSet);
        this.addChild(waveSet);
    }

}