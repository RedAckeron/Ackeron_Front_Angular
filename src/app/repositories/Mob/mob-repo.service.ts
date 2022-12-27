import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Mob } from 'src/app/models/Character/Mob';
import { Localisator } from 'src/app/models/Localisator/Localisator';

@Injectable({
  providedIn: 'root'
})
export class MobRepoService {

  private _url: string = "https://localhost:7122/Mob/";
  constructor(private _httpClient: HttpClient) { }

  


  GetMob(): Mob[] 
    {
    //this._httpClient.get<Mob[]>(this._url + "Read/1");
    let mobs:Mob[]=[];
   
    mobs.push(new Mob(0,'Albert',0,1000,new Localisator(0,0,0,0,0,0,0,0,8,6,0,0,0))) ;
  
    return mobs;
    }


    
    GetMobonline(idPlanet:number): Observable<Mob>
    {
    
    return this._httpClient.get<Mob>(this._url + "Read/"+idPlanet);
      
  }


/*
    GetMap(IdPlanet: number): Observable<Area[]> {
      return this._httpClient.get<Area[]>(this._url + "GetMap/" + IdPlanet);    
    }
  */  
  
     
  
  
}

