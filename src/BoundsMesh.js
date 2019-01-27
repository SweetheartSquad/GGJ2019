import Bounds from './Bounds';

export default class BoundsMesh {
	constructor(areas) {
		this.boundsDebugColor = 0;
		this.areas = areas;
		this.current = undefined;
	}

	debugDraw(g) {
		this.areas.forEach((area, idx) => {
			g.beginFill(this.boundsDebugColor, (idx === this.current ? 0.5 : 0.25));
			g.lineStyle(3, 200000 + (idx === this.current ? 100000 : 0));
			g.drawPolygon(area);
			g.endFill();
		});
	}

}
