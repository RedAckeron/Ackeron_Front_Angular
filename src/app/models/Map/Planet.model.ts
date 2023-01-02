import { JsonPipe } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { MapPlanetRepoService } from "src/app/repositories/Map/map-planet-repo.service";
import { MobRepoService } from "src/app/repositories/Mob/mob-repo.service";
import { Mob } from "../Character/Mob";
import { Area } from "./Area.model";

export class Planet {
    IdPlanet:number=1;
    Name:string;
    MaxX:number;
    MaxY:number;
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
/*
    public GetMap(IdPlanet: number,_mapRepo:MapPlanetRepoService):Area[]{
        let TabArea : Area[]=[];
        
        _mapRepo.GetMap(IdPlanet).subscribe( {
          next: (res) => {
            TabArea=res;
            return TabArea;
            },
          error: () => {},
          complete: () => {
            this.Areas=TabArea;
            //console.log(this.Areas);
          }
        })
        return TabArea;
      }
      */
/*
    public GetMob(_mobRepo : MobRepoService):Mob[]{
        let TabMob : Mob[]=[];
        _mobRepo.ReadAllOfPlanet(this.IdPlanet).subscribe( {
        next: (res) => {
          console.log(res);
          
          TabMob=res;
          console.log(TabMob);
          
          return TabMob;



        },
          error: () => {},
          complete: () => {
            this.Horde=TabMob;
          }
        })
        return TabMob;
      }
*/
}