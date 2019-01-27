import Character from "./Character";

export default class NPC extends Character {
	constructor(options) {
		super(options);
		this.lines = options.lines;
		this.label = options.label;
	}
}
