import { MathService } from '../../services/math.service';
import { Character } from "./Character";
import { Localisator } from "../Localisator";
import { Planet } from '../Map/Planet.model';
import { Info } from '../Info.model';
import { Stats } from '../Stats.model';

export class Mob extends Character {

    stats:Stats=new Stats(0,0,0,0,0,0,0,0,0);
    orientation:string="nord";
    constructor(id : number,tsin:number,info:Info,localisator:Localisator,refresh:number,)
        {super(id,0,info,localisator);
        this.id = id;
        this.tsIn=tsin;
        this.info=info;
        this.localisator=localisator;
        this.refresh=refresh;
        }

        public RandomMove(planet:Planet){
        console.log("Random Move lacner pour "+this.id);
        
        let timer : any = undefined;
        timer = setInterval( () => {            
        this.SelectMove(this.CheckMoveBorder(planet));
        }, this.refresh);
    }
}