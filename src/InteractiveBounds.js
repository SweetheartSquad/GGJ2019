import  Bounds  from './Bounds';
import { getInput } from './main';

export default class InteractiveBounds extends Bounds{

    constructor(points = [], onInteract, onEnter, onExit){
        super(points);
        this.onEnter = onEnter;
        this.onExit = onExit;
        this.onInteract = onInteract;
        this.playerInBounds = false;
    }

    update(player){
        if(this.contains(player.p.x, player.p.y)){
            if(getInput().interact){
                if(this.onInteract){
                    this.onInteract();
                }
            }
            if(!this.playerInBounds){
                if(this.onEnter){
                    this.onEnter();
                }
            }
            this.playerInBounds = true;
        }else{
            if(this.playerInBounds){
                if(this.onExit){
                    this.onExit();
                }
            }
            this.playerInBounds = false;
        }
    }
}