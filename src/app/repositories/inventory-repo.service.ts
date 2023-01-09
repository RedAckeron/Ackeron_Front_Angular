import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Item } from '../models/Item.model';

@Injectable({
  providedIn: 'root'
})
export class InventoryRepoService {

  private _url: string = "https://localhost:7122/Inventory/";
  constructor(private _httpClient: HttpClient) { }


  
  Get(id: number): Observable<Array<Item>> {
    return this._httpClient.get<Array<Item>>(this._url + "Get/" + id);
  }
}

