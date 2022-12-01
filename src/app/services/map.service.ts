import { JsonPipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { CharacterLoc } from '../models/Character';
import { Area } from '../models/Map/Area.model';
import { MapRepoService } from '../repositories/map-repo.service';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  private tabArea! : Area[];
  constructor(private _MapRepo: MapRepoService){ }
  
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
        console.log(TabArea)
        this.tabArea = TabArea}
    })

   return this.tabArea;
    //return this.GetMap(IdPlanet);*/
  }
/*
  CheckMapBorderMove(CLoc: CharacterLoc ):string
  {
    let move : string="";
    if(CLoc.locA_X<this.MaxLocX)move+="e";
    if(CLoc.locA_X>0)move+="w";
    if(CLoc.locA_Y<this.MaxLocY)move+="s";
    if(CLoc.locA_Y>0)move+="n";
  return true;
  }
  */
}
