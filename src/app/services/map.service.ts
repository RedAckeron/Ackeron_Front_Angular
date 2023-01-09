import { JsonPipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { Localisator } from '../models/Localisator';
import { Area } from '../models/Map/Area.model';
import { Planet } from '../models/Map/Planet.model';
import { MapPlanetRepoService } from '../repositories/Map/map-planet-repo.service';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  private tabArea! : Area[];
  constructor(private _MapRepo: MapPlanetRepoService,private _router:Router){ }
  
   GetMap(IdPlanet: number):Area[]{
    //let result =new CharacterLoc(1,1,1,1,1,1,1);
    let TabArea : Area[];
    //return this._MapRepo.GetMap(IdPlanet)
    this._MapRepo.GetMap(IdPlanet).subscribe( {
      next: (res) => {
        console.log(res);
        TabArea=res;
        //console.log(TabArea);

        //return TabArea;
        //TabArea=res;
        //return TabArea;
        },
      error: () => {},
      complete: () => {
        console.log("Liste des area de la map : "+TabArea)
        this.tabArea = TabArea}
    })
   return this.tabArea;
    //return this.GetMap(IdPlanet);*/
  }
  public CheckAreaTrigger(planet:Planet){



  //si l area ou on se trouve a un trigger on executer via le switch se qui est demander 
  if (planet.CurentArea.mainTrigger == "tp_dungeon") {
    this._router.navigate(['/','dungeon']);
    console.log("TELEPORTATION")
}




    //il faut appeler l api sur la route /maparea / Read  et voir le Main trigger et sub trigger pour voir se qu il faut faire 
    /*
    this._MapRepo.GetMap(IdPlanet).subscribe( {
      next: (res) => {
        console.log(res);
        TabArea=res;
        //console.log(TabArea);

        //return TabArea;
        //TabArea=res;
        //return TabArea;
        },
      error: () => {},
      complete: () => {
        console.log("Liste des area de la map : "+TabArea)
        this.tabArea = TabArea}
    })
   return this.tabArea;
*/
  
  }
}
