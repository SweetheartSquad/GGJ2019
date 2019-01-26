
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

export default class PlayScene extends Container {
    
    constructor() {
        super(); 

        this.waveSets = [];
        this.addWaveSet(128, size.y - 200, 20);
        this.addWaveSet(64, size.y - 160, 30);
        this.addWaveSet(0, size.y - 110, 10);
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
