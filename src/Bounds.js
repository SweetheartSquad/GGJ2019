import { Polygon } from "pixi.js/lib/core/math";
import Point from "pixi.js/lib/core/math/Point";
import V from './vector';
import {
	checkIntersection,
  } from 'line-intersect';

export class Bounds extends Polygon {
	constructor(points = []) {
		super(points);
		this.close();
		this.center = new Point(0, 0);
		points.forEach(({ x, y }) => {
			this.center.x += x;
			this.center.y += y;
		});
		this.center.x /= points.length;
		this.center.y /= points.length;
	}

	raycast(p,r) {
		let minDist = Infinity;
		let result;
		for(let i = 0; i < this.points.length-1; i += 2) {
			const {
				[i]: x1,
				[i+1]: y1,
				[i+2]: x2,
				[i+3]: y2,
			} = this.points;
			const { point } = checkIntersection(p.x, p.y, r.x, r.y, x1, y1, x2, y2);
			if (!point) { continue; }
			const dist = V.magnitude2(V.subtract(p, point));
			if (dist < minDist) {
				minDist = dist;
				const normal = new V(y2 - y1, x1 - x2);
				normal.normalize();
				result = {
					point,
					normal,
					distance: dist,
				};
			}
		}
		return result;
	}
}


export default Bounds;
