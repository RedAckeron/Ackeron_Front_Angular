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

<<<<<<< HEAD
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

    public GetMob(_mobRepo : MobRepoService):Mob[]{
        
        _mobRepo.ReadAllOfPlanet(this.IdPlanet).subscribe( {
        next: (res) => {
            res.forEach(tabmob => {
            var mob = new Mob(tabmob.id,tabmob.tsIn,tabmob.info,tabmob.localisator,tabmob.refresh);
            this.Horde.push(mob);
             
            //console.log("objet instanciée : "+mob.id);
            });
        return this.Horde;
        },
          error: () => {},
          complete: () => {
          //this.Mobs=Horde;
                    }
        })
        return this.Horde;
      }
=======
>>>>>>> 330af5b4480ae7251ff00f98c51b165d818afe51
}