import { Planet } from "../Map/Planet.model";
import { MathService } from '../../services/math.service';
import { Localisator } from "../Localisator";
import { Info } from "../Info.model";
import { CharacterService } from "src/app/services/character.service";
import { CharacterRepoService } from "src/app/repositories/character-repo.service";
import { HttpClient } from "@angular/common/http";
import { MapService } from "src/app/services/map.service";

export abstract class Character {
    id: number;
    tsIn: number;
    info: Info = new Info(0, '', 0, 0, 0, 0, 0, "", "nord");
    localisator: Localisator = new Localisator(0,0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    TargetLocalisator : Localisator = this.localisator;
    coolDown:number=1000;
    status:string="idle";
    //orientation: string = "nord";
    private timer: any | undefined;

    constructor(id: number, tsin: number,coolDown:number, info: Info, localisator: Localisator,private _characterService:CharacterService,private _mapService:MapService) {
        this.id = id;
        this.tsIn = tsin;
        this.coolDown=coolDown;
        this.info = info
        this.localisator = localisator;
    }

    //#####################################################################################################################
    public RandomMove(planet: Planet,heroLocalisator:Localisator) {
        console.log("Random Move lancer pour " + this.info.name);
        
        if (this.timer) {clearInterval(this.timer)}

        let timer: any = undefined;
        timer = setInterval(() => {
            this.status="move";
            let AllMove:string="nswe";//on remet les 4 directions possible 
            //console.log("Debut : "+AllMove);
            
            

            
            

            AllMove=this._characterService.CheckMoveBorder(this,AllMove,planet);//on retirer des choix possible ceux qui nous enverrais en dehors de la map
            //console.log("Apres check border : "+AllMove);
        
            AllMove=this._characterService.CheckMoveColision(this,AllMove,planet);
            //console.log("Apres check Colision : "+AllMove);

            AllMove=this._characterService.CheckMoveOrientation(AllMove,this.localisator,heroLocalisator);//on retirer des choix possible ceux qui nous enverrais loin de notre destination
            //console.log("Apres check orientation : "+AllMove);

            let loctarget:Localisator=this._characterService.SelectMove(this,AllMove);
            this._characterService.ExecMove(this,loctarget,planet);

        }, this.coolDown);
    }
    //#####################################################################################################################
    public TargetedMove(x:number,y:number,planet:Planet){
        this.TargetLocalisator.locAX=x;
        this.TargetLocalisator.locAY=y;
        if (this.timer) {clearInterval(this.timer)}

            this.timer = setInterval(() => {
               // console.clear();

                if((this.TargetLocalisator.locAX==this.localisator.locAX)&&(this.TargetLocalisator.locAY==this.localisator.locAY))this.status="idle";
                else this.status="move";

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
                this._characterService.ExecMove(this,loctarget,planet);
                
                //on verifie si on se trouve sur une area qui peut faire peter un trigger
                this._mapService.CheckAreaTrigger(planet);

                }
                , this.coolDown);
            
           

      
    }
}