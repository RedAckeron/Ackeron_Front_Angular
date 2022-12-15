import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Localisator } from '../models/Localisator/Localisator';

@Injectable({
  providedIn: 'root'
})
export class LocalisatorService {

  private _url: string = "https://localhost:7122/Localisator/";
  constructor(private _httpClient: HttpClient) { }

  Read(IdLocalisator: number): Observable<Localisator> {
    return this._httpClient.get<Localisator>(this._url + "Read/" + IdLocalisator);    
  }
}
