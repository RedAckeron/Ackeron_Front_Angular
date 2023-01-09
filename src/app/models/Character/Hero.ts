import { Planet } from "../Map/Planet.model";
import { MathService } from '../../services/math.service';
import { Character } from "./Character";
import { Localisator } from "../Localisator";
import { Info } from "../Info.model";
import { Stat } from "../Stat.model";
import { Power } from "../Power.model";
import { Resist } from "../Resist.model";
import { CharacterService } from "src/app/services/character.service";
import { MapService } from "src/app/services/map.service";

export class Hero extends Character {
    stat:Stat;
    power:Power;
    resist:Resist;
    
    constructor(id : number,tsin:number,coolDown:number,info:Info,localisator:Localisator,stat:Stat,power:Power,resist:Resist,_characterService:CharacterService,_mapService:MapService){
        super(id,0,coolDown,info,localisator,_characterService,_mapService);
        this.id = id;
        this.tsIn=tsin;
        this.coolDown=coolDown;
        this.info=info;
        this.localisator=localisator;
        this.stat=stat;
        this.power=power;
        this.resist=resist;
        //this.refresh = 1000 
    }
}
