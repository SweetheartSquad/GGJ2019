import Bounds from './Bounds';

export default class InteractiveBounds extends Bounds {

	constructor(points = [], onInteract, onEnter, onExit) {
		super(points);
		this.onEnter = onEnter;
		this.onExit = onExit;
		this.onInteract = onInteract;
		this.playerInBounds = false;
		this.boundsDebugColor = 0x00ff00;
	}

	update(player) {
		if (this.contains(player.p.x, player.p.y)) {
			if (!this.playerInBounds) {
				if (this.onEnter) {
					this.onEnter();
				}
			}
			this.playerInBounds = true;
		} else {
			if (this.playerInBounds) {
				if (this.onExit) {
					this.onExit();
				}
			}
			this.playerInBounds = false;
		}
	}
}
