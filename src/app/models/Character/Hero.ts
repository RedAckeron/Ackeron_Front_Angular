import { Planet } from "../Map/Planet.model";
import { MathService } from '../../services/math.service';
import { Character } from "./Character";
import { Localisator } from "../Localisator/Localisator";

export class Hero extends Character {
    constructor(id : number,name:string,race:number,refresh:number,loc:Localisator){
        super(id,name,race,refresh,loc);
        this.Id = id;
        this.Name=name;
        this.Race=race;
        this.Loc=loc;
        this.Refresh=refresh;
    }
}
