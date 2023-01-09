import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Item } from '../models/Item.model';
import { InventoryRepoService } from '../repositories/inventory-repo.service';
import { LocalisatorRepo } from '../repositories/localisator-repo.service';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  private inventory! : Item[];
  constructor(private _inventoryRepo : InventoryRepoService) { }

  Get(IdChar: number):Observable<Item[]>{
    return this._inventoryRepo.Get(IdChar)
  }
}
