import BoundsMesh from "./BoundsMesh";
import InteractiveBounds from "./InteractiveBounds";
import { getInput } from "./main";

export default class InteractableMesh extends BoundsMesh {
	constructor(areas) {
		super(areas.map(({
			points,
			onEnter,
			onExit,
			onInteract
		}) => new InteractiveBounds(points, onInteract, onEnter, onExit)));
		this.boundsDebugColor = 0x00ff00;
	}

	update(player) {
		this.current = undefined;
		this.areas.forEach((area, idx) => {
			area.update(player);
			if (area.playerInBounds && area.onInteract) {
				this.current = idx;
			}
		});
		if (this.current !== undefined && getInput().interact) {
			this.areas[this.current].onInteract();
		}
	}
}
