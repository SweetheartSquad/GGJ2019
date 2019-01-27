import Bounds from './Bounds';

export default class BoundsMesh{

    constructor(areas){
        this.boundsDebugColor = 0;
        this.areas = areas;
    }
   
    debugDraw(g) {
		g.beginFill(this.boundsDebugColor,0);
		this.areas.forEach(({bounds}, idx) => {
			g.lineStyle(3, 200000 + (idx === this.current ? 100000 : 0));
			g.drawPolygon(bounds);
		});
        g.endFill();
    }

}