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
        var lastWave = this.waves[this.waves.length - 1]; 
        if(this.x >= this.waves[0].width * 2 
            && this.x - this.lastWaveSwap >= this.waves[0].width / 2){
            var wave = this.waves.pop();
            wave.initialX = this.waves[0].x - wave.width / 2;
            this.waves.unshift(wave);
            this.lastWaveSwap = this.x;
        }
        this.waves.forEach((wave) => {
           // wave.initialX += 1;
            wave.update();
        });
        // var lastWave = this.waves[this.waves.length - 1]; 
        // var firstWave = this.waves[0];
        // if(lastWave.x > size.x + lastWave.width){
        //     lastWave.x = firstWave.x - firstWave.width;
        //     lastWave = this.waves.pop();
        //     this.waves.unshift(lastWave);
        // }
        this.x += 5;
    }

    initWaves(){
        var spanned = -size.x - this.initialX;
        var oscillationSwitch = 1;
        while(spanned < size.x){
            var wave = new Wave(spanned, 0, this.amplitude, oscillationSwitch);
            oscillationSwitch *= -1;
            spanned += wave.width / 2;
            this.addChild(wave);
            this.waves.push(wave);
        }
    }
}