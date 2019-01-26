import { getInput, setScene } from './main';
import game, { resources } from './Game';
import { Container, Sprite, Graphics } from 'pixi.js/lib/core';
import { BitmapText } from 'pixi.js/lib/extras';
import EndScene from './EndScene';
import Peep from './Peep';
import CustomFilter from './CustomFilter';
import Wave from './Wave';

export default class PlayScene extends Container {
    
    constructor() {
        super(); 

        this.waves = [new Wave()];
        this.waves.forEach((wave)=>{
            this.addChild(wave);
        });
    }
    
	destroy() {
		Container.prototype.destroy.call(this);
	}

	update() {
        this.waves.forEach((wave)=>{
           wave.update(); 
        });
	}
}
