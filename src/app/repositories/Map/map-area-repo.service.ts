import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Localisator } from 'src/app/models/Localisator';
import { Area } from 'src/app/models/Map/Area.model';

@Injectable({
  providedIn: 'root'
})
export class MapAreaRepoService {
 
  private _url: string = "https://localhost:7122/mapArea/";
  constructor(private _httpClient: HttpClient) { }

  /*

  GetMap(IdPlanet: number): Observable<Area[]> {
    return this._httpClient.get<Area[]>(this._url + "GetMap/" + IdPlanet);    
  }
  */
  ChkAreaReachable(LocTarget:Localisator):boolean
  {
     
    let result = this._httpClient.post<boolean>(this._url + "ChkAreaReachable/",LocTarget);   
    console.log("REACHABLE : "+result);
  return true;
  }
  //https://localhost:7122/MapArea/ChkAreaReachable

  
}
