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
import { Mob } from "./Mob";

export class Hero extends Character {
    stat:Stat;
    power:Power;
    resist:Resist;
    IdTargetMob:number=0;
    striked:number=0;
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
    

//#####################################################################################################################
public SelectAction(planet:Planet,_characterService:CharacterService){
    //on verifie qui est le mob le plus proche 


    
    if(this.stat.pv<1)
    {
        this.info.img="LinkDeath";
        this.stat.timer=null;
        this.status="death";
    }
    else{
        let mobProche = this.CheckMobProche(planet.Horde,_characterService)
        let distmobproche = this.CheckDistMobProche(mobProche,_characterService)
        this.TargetedMove(this.TargetLocalisator,planet);
        if(distmobproche<2)
        {   this.striked=0;
            this.IdTargetMob=mobProche.id;
            let orientation=_characterService.CheckMoveOrientation("nswe",this.localisator,mobProche.localisator);
            this.info.strike=true;
            this.info.img="LinkStrike";
            this.info.orientation=orientation;
        }
        else 
        {
            this.info.strike=false;
            this.info.img="Link";
            //console.log(this.stat);
        }
    }

}
//#####################################################################################################################
public CheckDistMobProche(mobProche:Mob,_characterService:CharacterService):number
{
    return _characterService.CheckDistMobProche(this,mobProche);
}
//#####################################################################################################################
public CheckMobProche(Horde:Mob[],_characterService:CharacterService):Mob
    {
        return _characterService.CheckMobProche(this,Horde);
    }

}
