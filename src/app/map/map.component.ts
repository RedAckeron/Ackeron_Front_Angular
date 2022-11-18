import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Character, Loc } from '../models/Character';
import { CharacterService } from '../services/character.service';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  loc:Loc={}
  
character:Character={};
  character = this.GetCharacter(1);


///CharacterService.GetCharacter(1);

constructor(private _characterService : CharacterService) { }
  ngOnInit(): void {
    //this.GetCharacter();
    console.log(this.character);
  }

  GetCharacter(id:number){
    this._characterService.GetCharacter(id).subscribe({
      next : (res)=>{
        this.character=res;
        },
      error : ()=>{},
      complete : ()=>{}
    })
  }
}
