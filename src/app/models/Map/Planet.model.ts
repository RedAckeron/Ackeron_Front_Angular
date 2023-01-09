import { JsonPipe } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { MapPlanetRepoService } from "src/app/repositories/Map/map-planet-repo.service";
import { MobRepoService } from "src/app/repositories/Mob/mob-repo.service";
import { Mob } from "../Character/Mob";
import { Localisator } from "../Localisator";
import { Area } from "./Area.model";

export class Planet {
    IdPlanet:number=1;
    Name:string;
    MaxX:number;
    MaxY:number;
    CurentArea:Area=new Area(0,'',new Localisator(0,0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),'',true,'','');
    Areas : Area[];
    Horde:Array<Mob>;
    
    constructor(id : number,Name:string,MaxX:number,MaxY:number,Areas:Area[],Mobs:Mob[],_mapRepo:MapPlanetRepoService){
        this.IdPlanet = id;
        this.Name=Name;
        this.MaxX=MaxX;
        this.MaxY=MaxY;
        this.Areas=Areas;
        this.Horde=Mobs;
    }

}