import { Container, Point, Graphics } from "pixi.js/lib/core";
import NavMesh from "./NavMesh";
import InteractableMesh from "./InteractableMesh";
import { createDialog } from "./Dialog";

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

	debugDraw(){
		g.clear();
		this.bounds.debugDraw(g);
		this.interactiveBounds.debugDraw(g);
	}
}
