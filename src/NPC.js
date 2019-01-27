import Character from "./Character";

export default class NPC extends Character {
	constructor({pitch = 1, lines = [], label = "", ...options}) {
		super(options);
		this.lines = lines.map(line => {
			const words = line.split(' ');
			let s = '';
			for(let i = 0; i < words.length; ++i) {
				s += words[i];
				if ((i+1)%3 === 0) {
					s += '\n';
				} else {
					s += ' ';
				}
			}
			return s;
		});
		this.label = label;
		this.pitch = pitch;
	}
}
