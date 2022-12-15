import { Planet } from "../Map/Planet.model";
import { MathService } from '../../services/math.service';
import { Character } from "./Character";
import { Localisator } from "../Localisator/Localisator";

export class Hero extends Character {
    constructor(id : number,name:string,race:number,refresh:number,localisator:Localisator){
        super(id,name,race);
        this.Id = id;
        this.Name=name;
        this.Race=race;
        this.Localisator=localisator;
        this.Refresh=refresh;
    }
}
