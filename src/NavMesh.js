import Bounds from "./Bounds";
import BoundsMesh from "./BoundsMesh";

export default class NavMesh extends BoundsMesh {
	constructor(areas) {
		super(areas.map(({ points }) => new Bounds(points)));
		this.current = 0;
		this.boundsDebugColor = 0x0000ff;
	}

	getCenter() {
		return this.areas[this.current].center;
	}

	update(player) {
		// transition between areas
		for (var i = 0; i < this.areas.length; ++i) {
			if (i === this.current) {
				continue;
			}
			if (this.areas[i].contains(player.p.x, player.p.y)) {
				this.current = i;
				break;
			}
		}

		// collision
		const b = this.areas[this.current];
		const start = player.p;
		const end = b.center;
		this.rayStart = start;
		this.rayEnd = end;
		const hit = b.raycast(start, end);

		if (hit) {
			const {
				normal,
				point,
				distance,
			} = hit;
			this.normal = normal;
			this.intersectionPoint = point;

			player.v.x -= this.normal.x * distance * 0.01;
			player.v.y -= this.normal.y * distance * 0.01;
		} else {
			this.normal = undefined;
			this.intersectionPoint = undefined;
		}
	}

	debugDraw(g) {
		super.debugDraw(g, 0x0000ff);

		if (this.intersectionPoint) {
			g.beginFill();
			g.drawCircle(this.intersectionPoint.x, this.intersectionPoint.y, 5);

			g.moveTo(this.rayStart.x, this.rayStart.y);
			g.lineTo(this.rayEnd.x, this.rayEnd.y);

			g.endFill();

			g.beginFill();
			g.lineStyle(3, 0xff00ff);
			g.moveTo(this.intersectionPoint.x, this.intersectionPoint.y);
			g.lineTo(this.intersectionPoint.x + this.normal.x * 100, this.intersectionPoint.y + this.normal.y * 100);
			g.endFill();
		}
	}
}
