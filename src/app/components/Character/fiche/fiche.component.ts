import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Item } from 'src/app/models/Item.model';
import { InventoryService } from 'src/app/services/inventory.service';
@Component({
  selector: 'app-fiche',
  templateUrl: './fiche.component.html',
  styleUrls: ['./fiche.component.scss']
})
export class FicheComponent implements OnInit {
  Inventory: Observable<Array<Item>> = of([]) 

  constructor( private _inventoryService:InventoryService) { }

  ngOnInit(): void {
    //recuperation de l inventaire du Hero
    if(localStorage.getItem('IdChar'))
    {
      this.Inventory=this._inventoryService.Get(1);
    }
  }
}
