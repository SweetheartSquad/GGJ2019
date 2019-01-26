import { Container } from "pixi.js/lib/core";
import size from "./size";
import Wave from "./Wave";

export default class WaveSet extends Container{

    constructor(x, y, amplitude){
        super();
        
        this.initialX = x;
        this.x = x;
        this.initialY = y;
        this.y = y;
        this.waves = [];
        this.amplitude = amplitude;
        this.lastWaveSwap = 0;

        this.initWaves();
    }

    destroy() {
		Container.prototype.destroy.call(this);
    }
    
    update(){
        if(this.x > this.waves[0].width && this.x - this.lastWaveSwap > this.waves[0].width){
            var wave = this.waves.pop();
            wave.initialX = this.waves[0].x - wave.width;
            console.log(wave.initialX);
            this.waves.unshift(wave);
            this.lastWaveSwap = this.x;
        }
        this.waves.forEach((wave) => {
            wave.update();
        });
        this.x += 1;
    }

    initWaves(){
        var spanned = -size.x - this.initialX;
        var oscillationSwitch = 1;
        while(spanned < size.x){
            var wave = new Wave(spanned, 0, this.amplitude, oscillationSwitch);
            oscillationSwitch *= -1;
            spanned += wave.width;
            this.addChild(wave);
            this.waves.push(wave);
        }
    }
}