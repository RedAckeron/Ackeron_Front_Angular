import { MathService } from '../../services/math.service';
import { Character } from "./Character";
import { Localisator } from "../Localisator";
import { Planet } from '../Map/Planet.model';
import { Info } from '../Info.model';
import { Stat } from '../Stat.model';
import { Power } from '../Power.model';
import { Resist } from '../Resist.model';

export class Mob extends Character {
    stat: Stat;
    power : Power;
    resist : Resist;
    constructor(data?: Partial<{ id: number, tsin: number, info: Info, localisator: Localisator, stat: Stat, power: Power, resist: Resist }>) {
        super(data?.id!, 0, data?.info!, data?.localisator!)
        this.stat = data && data.stat || new Stat(1, 0, 0, 0, 0, 0, 0, 0, 0,1000);
        this.power=data && data.power || new Power();
        this.resist=data && data.resist || new Resist();
        //this.refresh = data && data.refresh || 1000;
    }
    // constructor(id : number,tsin:number,info:Info,localisator:Localisator,refresh:number,)
    //     {super(id,0,info,localisator);
    //     this.id = id;
    //     this.tsIn=tsin; 
    //     this.info=info;
    //     this.localisator=localisator;
    //     this.refresh=refresh;
    //     }
    public sayhello() {

        console.log("coucou gamin");
    }
}