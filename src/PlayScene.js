
import { getInput, setScene } from './main';
import game, { resources } from './Game';
import { Container, Sprite, Graphics } from 'pixi.js/lib/core';
import { BitmapText } from 'pixi.js/lib/extras';
import EndScene from './EndScene';
import Peep from './Peep';
import CustomFilter from './CustomFilter';
import Wave from './Wave';
import size from './size';

export default class PlayScene extends Container {
    
    constructor() {
        super(); 

        this.waves = [];
        this.addWaveSet(0, 128);
        this.addWaveSet(50, 64);
        this.addWaveSet(100, 0);
        
    }
    
	destroy() {
		Container.prototype.destroy.call(this);
	}

	update() {
        this.waves.forEach((wave)=>{
           wave.update(); 
        });
    }
    
    addWaveSet(y, xOffset){
        var spanned = -xOffset;
        while(spanned < size.x){
            var wave = new Wave(spanned, y);
            spanned += wave.width;
            this.addChild(wave);
            this.waves.push(wave);
        }
    }

}
