import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Localisator } from '../models/Localisator';
@Injectable({
  providedIn: 'root'
})
export class CharacterRepoService {
  private _url: string = "https://localhost:7122/";
  constructor(private _httpClient: HttpClient) { }

  GetCharacter(id: number): Observable<any> {
    return this._httpClient.get(this._url + "Character/GetOne/" + id);
  }

  GetCharacterLoc(id: number): Observable<any> {
    return this._httpClient.get(this._url + "Character/GetLoc/" + id);
  }
/*
  UpdateCharacterLoc(charloc: Localisator): Observable<any> {
    return this._httpClient.put(this._url + "Character/UpdateLoc/" +  charloc);
  }
  */
}