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
        if(this.waves[this.waves.length - 1].x > size.x){    
            var wave = this.waves.pop();
            wave.offsetX = this.waves[0].offsetX - wave.width / 2;
            this.waves.unshift(wave);
        }
        this.waves.forEach((wave) => {
            wave.update();
            wave.offsetX += 1;
        });
    }

    initWaves(){
        var spanned = -size.x - this.x;
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