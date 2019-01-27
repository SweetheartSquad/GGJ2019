import size from "./size";
import Wave from "./Wave";
import { particles } from "pixi.js";

export default class WaveSet extends particles.ParticleContainer {
    constructor(x, y, amplitude){
        super(100, {
            position: true,
            rotation: true,
        });
        
        this.x = x;
        this.y = y;
        this.waves = [];
        this.amplitude = amplitude;
        this.lastWave = 0;
        this.initWaves();
    }
    
    updateTransform(){
        super.updateTransform();
        const wave = this.waves[this.lastWave];
        if(wave.x > size.x*1.1){    
            wave.offsetX = this.waves[(this.lastWave+1)%this.waves.length].offsetX - wave.width / 2;
            --this.lastWave;
            if (this.lastWave < 0) {
                this.lastWave = this.waves.length - 1;
            };
        }
        this.waves.forEach((wave) => {
            wave.offsetX += 1;
            wave.update();
        });
    }

    initWaves(){
        var spanned = -size.x*1.1 - this.x;
        var oscillationSwitch = 1;
        while(spanned < size.x*1.1){
            var wave = new Wave(spanned, this.y, this.amplitude, oscillationSwitch);
            oscillationSwitch *= -1;
            spanned += wave.width / 2;
            this.addChild(wave);
            this.waves.push(wave);
        }
        this.lastWave = this.waves.length-1;
    }
}
