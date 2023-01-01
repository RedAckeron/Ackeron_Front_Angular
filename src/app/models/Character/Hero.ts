import { Planet } from "../Map/Planet.model";
import { MathService } from '../../services/math.service';
import { Character } from "./Character";
import { Localisator } from "../Localisator";
import { Info } from "../Info.model";

export class Hero extends Character {
    constructor(id : number,tsin:number,info:Info,localisator:Localisator,refresh:number,){
        super(id,0,info,localisator);
        this.id = id;
        this.tsIn=tsin;
        this.info=info;
        this.localisator=localisator;
        this.refresh=refresh;
    }
}
