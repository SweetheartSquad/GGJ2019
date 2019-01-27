import Bounds from "./Bounds";
import V from './vector';
import { playerSpeedX, playerSpeedY } from "./PlayScene";

export default class NavMesh {
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
		g.beginFill(0,0);
		this.areas.forEach(({bounds}, idx) => {
			g.lineStyle(3, 200000 + (idx === this.current ? 100000 : 0));
			g.drawPolygon(bounds);
		});
		g.endFill();

		if(this.intersectionPoint){
			g.beginFill(0xff0000, 1);
			g.drawCircle(this.intersectionPoint.x, this.intersectionPoint.y, 5);

			g.moveTo(this.rayStart.x, this.rayStart.y);
			g.lineTo(this.rayEnd.x, this.rayEnd.y);

			g.endFill();

			g.beginFill(0);
			g.lineStyle(3, 0xff00ff);
			g.moveTo(this.intersectionPoint.x, this.intersectionPoint.y);
			g.lineTo(this.intersectionPoint.x + this.normal.x * 100, this.intersectionPoint.y + this.normal.y * 100);
			g.endFill();
		}
	}
}
