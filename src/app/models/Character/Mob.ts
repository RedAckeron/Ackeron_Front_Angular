import { MathService } from '../../services/math.service';
import { Character } from "./Character";
import { Localisator } from "../Localisator";
import { Planet } from '../Map/Planet.model';
import { Info } from '../Info.model';
import { Stat } from '../Stat.model';
import { Power } from '../Power.model';
import { Resist } from '../Resist.model';
import { CharacterService } from 'src/app/services/character.service';
import { LocalisatorRepo } from 'src/app/repositories/localisator-repo.service';
import { MapService } from 'src/app/services/map.service';
import { Hero } from './Hero';

export class Mob extends Character {
    power : Power;
    resist : Resist;
    constructor(data?: Partial<{ id: number, tsin: number,coolDown:number, info: Info, localisator: Localisator,_locaRepo:LocalisatorRepo, stat: Stat, power: Power, resist: Resist,_characterService:CharacterService,_mapService:MapService }>) {
        super(data?.id!, 0,data?.coolDown!,data?.stat!, data?.info!, data?.localisator!,data?._characterService!,data?._mapService!)

        if (data && data.stat) {
            data.stat.coolDown = 1600;
        }
        this.stat = data && data.stat || new Stat(1, 0, 0, 0,100,100, 0, 0, 0, 0, 0,1600);
        this.power=data && data.power || new Power();
        this.resist=data && data.resist || new Resist();
    }
    public SelectAction(planet:Planet,hero:Hero,_characterService:CharacterService){
    //      mob.SelectAction(this.planet,this.Hero,this._characterService)

        let loctarget:Localisator=_characterService.SelectMove(this,"nswe");
        let dist=0;
        dist=_characterService.CheckDistHeroProche(hero.localisator,this);
        
        if(dist>1)
            {                
                this.info.img="mob1";

                console.log("[MOBZ]=>Le hero est a "+dist+"cases : j avance ");
                this.RandomMove(planet,hero.localisator);
            }
        else 
            {
                this.info.img="mob1Strike";
            _characterService.MobStrike(this,hero)
            console.log("[MOBZ]=>Le hero est a "+dist+"cases : j n avance pas je Frappe");
               
            }

            
    }

  
/*
    public SelectAction(planet:Planet,_characterService:CharacterService){
        let dist=0;
        dist=_characterService.CheckDistHeroProche(hero.localisator,this);
        
        // console.log(`Dist => ${dist}`)
        if(dist>1)
            {                
                // console.log("[MOBZ]=>Le hero est a "+dist+"cases : j avance ");
                //_characterService.ExecMove(this,loctarget,planet);
                this.RandomMove(planet,)
                return true;
            }
        else 
            {
           _characterService.MobStrike(this,hero);
                return false;
            }
    }

*/


}