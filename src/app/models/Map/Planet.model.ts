import { HttpClient } from "@angular/common/http";
import { MapPlanetRepoService } from "src/app/repositories/Map/map-planet-repo.service";
import { Area } from "./Area.model";

export class Planet {
    IdPlanet:number;
    Name:string;
    MaxX:number;
    MaxY:number;
    Areas : Area[];
    /*
    LocX:number;
    LocY:number;
    ImgItem:string;
    Reachable:boolean;
    MainTrigger:string;
    SubTrigger:string;
   */
  /*,LocX:number,LocY:number,ImgItem:string,Reachable:boolean,MainTrigger:string,SubTrigger:string*/
    constructor(id : number,Name:string,MaxX:number,MaxY:number,Areas:Area[],_mapRepo:MapPlanetRepoService){
        this.IdPlanet = id;
        this.Name=Name;
        this.MaxX=MaxX;
        this.MaxY=MaxY;
        this.Areas=Areas;
        
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
        let TabArea! : Area[];
        
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
}