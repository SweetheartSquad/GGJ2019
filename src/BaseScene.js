import { Container, Point, Graphics } from "pixi.js/lib/core";
import NavMesh from "./NavMesh";
import InteractableMesh from "./InteractableMesh";
import { createDialog } from "./Dialog";
import { player } from "./main";
import { lerp } from "./utils";
import size from "./size";

let g = new Graphics();

export default class BaseScene extends Container{
	constructor({
		npcs = [],
		floor,
		nav = [],
		interact = [],
	}) {
		super();
		this.floor = floor;
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
						new Point(x - width, y+50),
						new Point(x + width, y+50),
						new Point(x + width, y-50),
						new Point(x - width, y-50),
					],
					...createDialog(npc, {
						label,
						lines,
					})
				};
			})
		));

		floor.addChild(g);
		floor.addChild(player);
		this.addChild(floor);
	}

	update(){
		this.bounds.update(player);
		this.interactiveBounds.update(player);

		if (Math.abs(player.v.y) > 0.01) {
			this.floor.sortDirty = true;
		}

		// camera
		this.s = lerp(this.s || 1, 1 - (Math.abs(player.v.y)+Math.abs(player.v.x))/64, 0.05);
		this.scale.x = this.scale.y = lerp(this.scale.x, this.s, 0.2);
	
		var p = this.toLocal(PIXI.zero, player.camPoint);
		this.x = lerp(this.x, p.x, 0.1);
		this.y = lerp(this.y, player.p.y*this.scale.y, 0.1);
		this.pivot.x = Math.floor(this.x);
		this.pivot.y = Math.floor(this.y);
		this.x = size.x/2;
		this.y = size.y/4*1;
	}

	debugDraw(){
		g.clear();
		this.bounds.debugDraw(g);
		this.interactiveBounds.debugDraw(g);
	}
}
