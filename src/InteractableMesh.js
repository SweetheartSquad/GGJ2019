import BoundsMesh from "./BoundsMesh";
import InteractiveBounds from "./InteractiveBounds";

export default class InteractableMesh extends BoundsMesh{
    constructor(areas) {
		super(areas.map(({
            points,
            onEnter,
            onExit
		}) => ({
			bounds: new InteractiveBounds(points, onEnter, onExit),
		})));
		this.boundsDebugColor = 0x00ff00;
    }
    
    update(player){
        this.areas.forEach((area) => {
           area.bounds.update(player); 
        });
    }

    debugDraw(g) {
		super.debugDraw(g);
        g.beginFill(0x00ff00, 0.2);
		this.areas.forEach(({bounds}, idx) => {
			g.drawPolygon(bounds);
		});
        g.endFill();
    }
}