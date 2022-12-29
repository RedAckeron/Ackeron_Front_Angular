import { JsonPipe } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { MapPlanetRepoService } from "src/app/repositories/Map/map-planet-repo.service";
import { MobRepoService } from "src/app/repositories/Mob/mob-repo.service";
import { Mob } from "../Character/Mob";
import { Area } from "./Area.model";

export class Planet {
    IdPlanet:number;
    Name:string;
    MaxX:number;
    MaxY:number;
    Areas : Area[]=[];
    Mobs : Mob[]=[];
    
    /*
    LocX:number;
    LocY:number;
    ImgItem:string;
    Reachable:boolean;
    MainTrigger:string;
    SubTrigger:string;
   */
  /*,LocX:number,LocY:number,ImgItem:string,Reachable:boolean,MainTrigger:string,SubTrigger:string*/
    constructor(id : number,Name:string,MaxX:number,MaxY:number,Areas:Area[],Mobs:Mob[],_mapRepo:MapPlanetRepoService){
        this.IdPlanet = id;
        this.Name=Name;
        this.MaxX=MaxX;
        this.MaxY=MaxY;
        this.Areas=Areas;
        this.Mobs=Mobs;
        /*
        this.LocX=LocX;
        this.LocY=LocY;
        this.ImgItem=ImgItem;
        this.Reachable=Reachable;
        this.MainTrigger=MainTrigger;
        this.SubTrigger=SubTrigger;
        */
    }
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
            console.log(this.Areas);
          }
        })
        return TabArea;
      }


    public GetMob(IdMob: number,_mobRepo : MobRepoService):Mob[]{
        let TabMob : Mob[]=[];
        _mobRepo.GetMob(IdMob).subscribe( {
          next: (res) => {
            TabMob=res;
            return TabMob;
            },
          error: () => {},
          complete: () => {
            //this.Mobs=TabMob;
            //console.log(this.Mobs);
          }
        })
        return TabMob;
      }
}