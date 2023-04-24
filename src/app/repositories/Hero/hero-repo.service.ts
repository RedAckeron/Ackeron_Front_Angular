import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { observable, Observable } from 'rxjs';
import { Hero } from 'src/app/models/Character/Hero';

@Injectable({
  providedIn: 'root'
})
export class HeroRepoService {

  private _url: string = "https://localhost:7122/Hero/";
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

    ReadAllOnPlanet(idPlanet: number): Observable<Hero[]> {
    return this._httpClient.get<Hero[]>(this._url + "ReadAllOnPlanet/" + idPlanet);
  }

  Read(IdHero: number):Observable<Hero>  {
    return this._httpClient.get<Hero>(this._url + "Read/" + IdHero);
  }

  /*
      GetMap(IdPlanet: number): Observable<Area[]> {
        return this._httpClient.get<Area[]>(this._url + "GetMap/" + IdPlanet);
      }
    */

}

