import Bounds from "./Bounds";
import V from './vector';

export class NavMesh {
	constructor(areas) {
		this.areas = areas.map(({
			points,
		}) => ({
			bounds: new Bounds(points),
		}));
		this.current = 0;
	}

	getCenter() {
		return this.areas[this.current].bounds.center;
	}

	update(player) {
		// transition between areas
		const start = player.p;
		for (var i = 0; i < this.areas.length; ++i) {
			if (i === this.current) {
				continue;
			}
			if (this.areas[i].bounds.contains(player.p.x, player.p.y)) {
				this.current = i;
				break;
			}
		}

		// collision
		const b = this.areas[this.current].bounds;
		const end = b.center;
		const d = b.dist(start, end);
		if (d) {
			const v = V.subtract(d, player.p);
			player.v.x += v.x/5;
			player.v.y += v.y/5;
		}
	}

	debugDraw(g) {
		g.beginFill(0,0);
		this.areas.forEach(({bounds}, idx) => {
			g.lineStyle(3, 200000 + (idx === this.current ? 100000 : 0));
			g.drawPolygon(bounds);
		});
		g.endFill();
	}
}
