import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Area } from '../../models/Map/Area.model';

@Injectable({
  providedIn: 'root'
})
export class MapPlanetRepoService {

  private _url: string = "https://localhost:7122/map/Planet/";
  constructor(private _httpClient: HttpClient) { }

  GetMap(IdPlanet: number): Observable<Area[]> {
    return this._httpClient.get<Area[]>(this._url + "GetMap/" + IdPlanet);    
  }
}
