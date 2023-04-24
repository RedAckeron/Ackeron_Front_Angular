import { Planet } from "../Map/Planet.model";
import { MathService } from '../../services/math.service';
import { Localisator } from "../Localisator";
import { Info } from "../Info.model";
import { CharacterService } from "src/app/services/character.service";
import { CharacterRepoService } from "src/app/repositories/character-repo.service";
import { HttpClient } from "@angular/common/http";
import { MapService } from "src/app/services/map.service";
import { Hero } from "./Hero";
import { Mob } from "./Mob";
import { Stat } from "../Stat.model";

export abstract class Character {
    id: number;
    tsIn: number;
    info: Info = new Info(0, '', 0, 0, 0, 0, 0, "", "n","idle");
    stat:Stat = new Stat(0,0,0,100,100,0,100,100,100,100,0,1000);
    localisator: Localisator = new Localisator(0,0, 0, 0, 0, 1, 0, 0, 0, 9, 11, 0, 0, 0);
    TargetLocalisator : Localisator = this.localisator;

    constructor(id: number, tsin: number,coolDown:number, stat:Stat,info: Info, localisator: Localisator,private _characterService:CharacterService,private _mapService:MapService) {
        this.id = id;
        this.tsIn = tsin;
        this.stat = stat;
        this.info = info;
        this.localisator = localisator;
    }

//#####################################################################################################################
    // public StartMove( planet: Planet, heroLocalisator: Localisator) {
    //     this.timer = setInterval(() => this.RandomMove(planet, heroLocalisator), 1000);
    // }
//#####################################################################################################################


    //#####################################################################################################################
    public RandomMove(planet: Planet,heroLocalisator:Localisator) {

        this.info.status="move";
        let AllMove:string="nswe";//on remet les 4 directions possible

        AllMove=this._characterService.CheckMoveBorder(this,AllMove,planet);//on retirer des choix possible ceux qui nous enverrais en dehors de la map

        AllMove=this._characterService.CheckMoveColision(this,AllMove,planet);

        AllMove=this._characterService.CheckMoveOrientation(AllMove,this.localisator,heroLocalisator);//on retirer des choix possible ceux qui nous enverrais loin de notre destination

        let loctarget:Localisator=this._characterService.SelectMove(this,AllMove);
        let dist=0;
        dist=this._characterService.CheckDistHeroProche(heroLocalisator,this);

        // console.log(`Dist => ${dist}`)
        if(dist>1)
            {
                // console.log("[MOBZ]=>Le hero est a "+dist+"cases : j avance ");
                this._characterService.ExecMove(this,loctarget,planet);
                //return true;
            }
        else
            {
           // console.log("[MOBZ]=>Le hero est a "+dist+"cases : j n avance pas je Frappe");
               // return false;
            }
    }
    //#####################################################################################################################
    public TargetedMove(targetloc : Localisator,planet:Planet){
        this.TargetLocalisator.locAX=targetloc.locAX;
        this.TargetLocalisator.locAY=targetloc.locAY;

            if((this.TargetLocalisator.locAX==this.localisator.locAX)&&(this.TargetLocalisator.locAY==this.localisator.locAY)){
                this.info.status="idle";
            }
            else this.info.status="move";

                //this.status="move";
                let AllMove:string="nswe";//on remet les 4 directions possible
                //console.log("Debut : "+AllMove);

                AllMove=this._characterService.CheckMoveBorder(this,AllMove,planet);//on retirer des choix possible ceux qui nous enverrais en dehors de la map
                //console.log("Apres check border : "+AllMove);

                AllMove=this._characterService.CheckMoveColision(this,AllMove,planet);
                //console.log("Apres check Colision : "+AllMove);

                //on retirer des choix possible ceux qui nous enverrais loin de notre destination
                AllMove=this._characterService.CheckMoveOrientation(AllMove,this.localisator,this.TargetLocalisator);
                //console.log("Apres check orientation : "+AllMove);

                //on execute le deplacement et on update l api avec la nouvelle localisation
                let loctarget:Localisator=this._characterService.SelectMove(this,AllMove);
                //if (this instanceof Hero) {
                    //console.log("Hero => "+ this)
                this._characterService.ExecMove(this,loctarget,planet);
                //}

                //on verifie si on se trouve sur une area qui peut faire peter un trigger
                this._mapService.CheckAreaTrigger(planet);
    }
}
