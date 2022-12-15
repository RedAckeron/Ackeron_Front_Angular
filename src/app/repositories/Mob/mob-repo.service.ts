import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Mob } from 'src/app/models/Character/Mob';
import { Localisator } from 'src/app/models/Localisator/Localisator';

@Injectable({
  providedIn: 'root'
})
export class MobRepoService {


  private _url: string = "https://localhost:7122/map/Planet/";
  constructor(private _httpClient: HttpClient) { }
GetMob():Mob[]
  {
    let mobs:Mob[]=[];
    mobs.push(new Mob(0,'Albert',0,1000,new Localisator(0,0,0,0,0,0,0,0,8,6,0,0,0))) ;
    // mobs.push(new Mob(0,'Joseph',0,500,new Localisator(0,0,0,0,0,0,0,0,4,5,0,0,0))) ;
    // mobs.push(new Mob(0,'Gertrude',0,1200,new Localisator(0,0,0,0,0,0,0,8,1,0,0,0,0))) ;
    // mobs.push(new Mob(0,'Simone',0,1600,new Localisator(0,0,0,0,0,0,0,0,10,9,0,0,0))) ;
    // mobs.push(new Mob(0,'John',0,800,new Localisator(0,0,0,0,0,0,0,0,0,5,1,0,0))) ;
    // mobs.push(new Mob(0,'Kirby',0,900,new Localisator(0,0,0,0,0,0,0,0,4,6,0,0,0))) ;
    // mobs.push(new Mob(0,'Monique',0,500,new Localisator(0,0,0,0,0,0,0,7,7,0,0,0,0))) ;
    // mobs.push(new Mob(0,'Germaine',0,2000,new Localisator(0,0,0,0,0,0,0,9,9,0,0,0,0))) ;
    return mobs
  }



/*
  GetMap(IdPlanet: number): Observable<Area[]> {
    return this._httpClient.get<Area[]>(this._url + "GetMap/" + IdPlanet);    
  }
  */
}
