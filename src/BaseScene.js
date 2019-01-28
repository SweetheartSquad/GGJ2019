import { Container, Point, Graphics } from "pixi.js/lib/core";
import NavMesh from "./NavMesh";
import InteractableMesh from "./InteractableMesh";
import { createDialog } from "./Dialog";
import { player } from "./main";
import { lerp } from "./utils";
import size from "./size";
import NPC from "./NPC";

let debug;

export default class BaseScene extends Container {
	constructor({
		npcs: npcDefs = [],
		floor,
		nav = [],
		interact = [],
	}) {
		super();
		this.zoom = 1;
		this.floor = floor;
		const npcs = npcDefs.map(npcDef => new NPC(npcDef));
		npcs.forEach(npc => floor.addChild(npc));

		this.bounds = new NavMesh(nav);
		this.interactiveBounds = new InteractableMesh(
			interact.concat(
				npcs.map(npc => {
					const {
						x,
						y,
						width,
						lines,
						label,
					} = npc;
					return {
						points: [
							new Point(x - width, y + 75),
							new Point(x + width, y + 75),
							new Point(x + width, y - 75),
							new Point(x - width, y - 75),
						],
						...createDialog(npc, {
							label,
							lines,
						})
					};
				})
			));

		floor.addChild(player);
		this.addChild(floor);
		this.updateCam();
		setTimeout(() => {
			this.floor.sortDirty = true;
		});
	}

	update() {
		this.bounds.update(player);
		this.interactiveBounds.update(player);

		if (Math.abs(player.v.y) > 0.01) {
			this.floor.sortDirty = true;
		}

		this.updateCam(0.1);

		// uncomment this to see bounds
		// this.debugDraw();
	}

	updateCam(delta = 1) {
		// camera
		const sTarget = (1.7 - (Math.abs(player.v.y) + Math.abs(player.v.x)) / 64) * this.zoom;
		this.s = lerp(this.s || sTarget, sTarget, 0.05);
		this.scale.x = this.scale.y = lerp(this.scale.x, this.s, 0.2);

		var p = player.camPoint.toGlobal(PIXI.zero);
		this.x = size.x / 2;
		this.y = size.y * 0.5 * this.zoom;
		this.pivot.x = (lerp(this.x, p.x, 0.3));
		this.pivot.y = (lerp(this.y, player.p.y*1.2, 0.5));
	}

	debugDraw() {
		if (!debug) {
			debug = new Graphics()
			debug.zIndex = 100000;
			this.floor.addChild(debug);
		}
		debug.clear();
		this.bounds.debugDraw(debug);
		this.interactiveBounds.debugDraw(debug);
	}

	destroy(options) {
		super.destroy(options);
		debug = null;
	}
}
