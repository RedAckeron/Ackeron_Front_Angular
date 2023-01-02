import { Planet } from "../Map/Planet.model";
import { MathService } from '../../services/math.service';
import { Character } from "./Character";
import { Localisator } from "../Localisator";
import { Info } from "../Info.model";
import { Stat } from "../Stat.model";
import { Power } from "../Power.model";
import { Resist } from "../Resist.model";

export class Hero extends Character {
    stat:Stat;
    constructor(id : number,tsin:number,info:Info,localisator:Localisator,stat:Stat,power:Power,resist:Resist,refresh:number,){
        super(id,0,info,localisator);
        this.id = id;
        this.tsIn=tsin;
        this.info=info;
        this.localisator=localisator;
        this.stat=stat;
        //this.refresh=refresh;
    }
}
