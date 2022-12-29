import { MathService } from '../../services/math.service';
import { Character } from "./Character";
import { Localisator } from "../Localisator/Localisator";
import { Planet } from '../Map/Planet.model';
import { Info } from '../Info/Info.model';

export class Mob extends Character {

    constructor(id : number,tsin:number,info:Info,localisator:Localisator,refresh:number,){
        super(id,0,info,localisator);
        this.Id = id;
        this.TsIn=tsin;
        this.Info=info;
        this.Localisator=localisator;
        this.Refresh=refresh;
    }
    public RandomMove(planet:Planet){
        let timer : any = undefined;
        timer = setInterval( () => {
        this.SelectMove(this.CheckMoveBorder(planet));
        }, this.Refresh);
    }
}