import Bounds from "./Bounds";
import V from './vector';

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

		
		this.rayStart = start;
		this.rayEnd = end;
		if (d) {
			
			this.intersectionPoint = d.point;
			const vx = d.normal.x;
			const vy = d.normal.y;

			console.log(d);

			this.normx = vx;
			this.normy = vy;

			if(Math.abs(vx) > 0){
				player.v.x += -(vx/Math.abs(vx)) * 5;
			}else{
				player.v.x = 0;
			}
			
			if(Math.abs(vy) > 0){
				player.v.y += -(vy/Math.abs(vy)) * 5;
			}else{
				player.v.y = 0;
			}
		}else{
			this.normx = undefined;
			this.normy = undefined;
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


			if(this.normx){
				g.beginFill(0xff00ff00, 1);
				g.moveTo(this.intersectionPoint.x, this.intersectionPoint.y);
				g.lineTo(this.normx, this.normy);
				g.endFill();
			}
		}
	}
}
