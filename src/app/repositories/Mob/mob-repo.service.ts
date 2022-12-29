import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { observable, Observable } from 'rxjs';
import { Mob } from 'src/app/models/Character/Mob';
import { Info } from 'src/app/models/Info/Info.model';
import { Localisator } from 'src/app/models/Localisator/Localisator';

@Injectable({
  providedIn: 'root'
})
export class MobRepoService {

  private _url: string = "https://localhost:7122/Mob/";
  constructor(private _httpClient: HttpClient) { }

  

/*
  GetMob(): Mob[] 
    {
    let mobs:Mob[]=[];
    //this._httpClient.get<Mob[]>(this._url + "Read/1");
    let info = new Info(0,"Mob",0,0,0,0,0);
    let localisator = new Localisator(0,0,0,0,0,0,0,0,8,6,0,0,0)
    mobs.push(new Mob(0,0,info,localisator,1000));
    return mobs;
    }

*/
    
    //GetMobonline(idPlanet:number): Observable<Mob[]>
    /*
    GetMobonline(idPlanet:number): Mob[]
    {
    
    //return this._httpClient.get<Mob>(this._url + "Read/"+idPlanet);
    
    //let mob:Mob[];
    
    //let info = new Info(0,"Mob",0,0,0,0,0);
    //let localisator = new Localisator(0,0,0,0,0,0,0,0,8,6,0,0,0)
    //mob =new Mob(0,0,info,localisator,1000);
    return this._httpClient.get <Mob[]>(this._url + "Read/"+idPlanet);

    
  }

*/

  
  GetMob(IdMob: number): Observable<Mob[]> {
    return this._httpClient.get<Mob[]>(this._url + "Read/" + IdMob);    
  }

/*
    GetMap(IdPlanet: number): Observable<Area[]> {
      return this._httpClient.get<Area[]>(this._url + "GetMap/" + IdPlanet);    
    }
  */  
  
     
  
  
}

