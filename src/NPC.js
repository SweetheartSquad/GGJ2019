import Character from "./Character";

export default class NPC extends Character {
	constructor({pitch = 1, lines = [], label = "", ...options}) {
		super(options);
		this.lines = lines;
		this.label = label;
		this.pitch = pitch;
	}
}
