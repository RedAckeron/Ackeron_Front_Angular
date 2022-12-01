import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Area } from '../models/Map/Area.model';

@Injectable({
  providedIn: 'root'
})
export class MapRepoService {

  private _url: string = "https://localhost:7122/";
  constructor(private _httpClient: HttpClient) { }

  GetMap(IdPlanet: number): Observable<Area[]> {
    return this._httpClient.get<Area[]>(this._url + "map/GetMap/" + IdPlanet);
  }

}
