
import { getInput, setScene } from './main';
import game, { resources } from './Game';
import { Container, Sprite, Graphics } from 'pixi.js/lib/core';
import { BitmapText } from 'pixi.js/lib/extras';
import EndScene from './EndScene';
import Peep from './Peep';
import CustomFilter from './CustomFilter';
import Wave from './Wave';
import size from './size';
import WaveSet from './WaveSet';
import assets from './assets';

export default class PlayScene extends Container {
    
    constructor() {
        super(); 

        this.waveSets = [];
        
        this.addWaveSet(0, 160, 10);
        this.addWaveSet(0, 200, 10);
        this.addWaveSet(64, 240, 30);
        this.addWaveSet(128, 280, 20);
        this.addWaveSet(192, 320, 20);
        this.addWaveSet(192, 360, 20);

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

    }
    
	destroy() {
        Container.prototype.destroy.call(this);
	}

	update() {
        this.waveSets.forEach((waveSet)=>{
           waveSet.update(); 
        });
    }
    
    addWaveSet(x, y, amplitude){
        var waveSet = new WaveSet(x, y, amplitude);
        this.waveSets.push(waveSet);
        this.addChild(waveSet);
    }

}
