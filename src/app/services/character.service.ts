import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Character } from '../models/Character';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  private _url : string="https://localhost:7122/";
  constructor(private _httpClient : HttpClient) { }
  
  GetCharacter(id:number): Observable<any>{
    return this._httpClient.get(this._url+"Character/GetOne/"+id);
  }
}
