import rainUrl from './rain.mp3';
import wavesUrl from './waves.mp3';
import dramaticUrl from './dramatic.mp3';

export { default as thunder } from './thunder.mp3';
export { default as talk } from './talk.mp3';
export const rain = {
    url: rainUrl,
    metadata:{
        loop: true,
        autoplay: true,
        volume: 0,
    }
};
export const waves = {
    url: wavesUrl,
    metadata:{
        loop: true,
        autoplay: true,
        volume: 0,
    }
}
export const dramatic = {
    url: dramaticUrl,
    metadata:{
        volume: 1.5,
    }
};
