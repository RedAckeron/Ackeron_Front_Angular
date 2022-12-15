import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Localisator } from '../models/Localisator/Localisator';
import { CharacterRepoService } from '../repositories/character-repo.service';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  constructor(private _CharacterRepo: CharacterRepoService) { }
  
  GetCharacterLoc(id: number):Localisator {
    let result =new Localisator(1,1,1,1,1,1,1,1,1,1,1,1,1);
    this._CharacterRepo.GetCharacterLoc(id).subscribe({
      next: (res) => {
      //result.idChar=res.idChar;
      result.locAX=res.locA_X;
      result.locAY=res.locA_Y;
      //return res;
      },
      error: () => { },
      complete: () => { }
    })
    return result;
  }

  UpdateCharacterLoc(charloc: Localisator) {
    /*
    this._CharacterRepo.UpdateCharacterLoc(charloc).subscribe({
      next: (res) => {
        return res;
      },
      error: () => { },
      complete: () => { }
    
    })
    */
  }

  GetCharacter(id: number) {
    this._CharacterRepo.GetCharacter(id).subscribe({
      next: (res) => {
        return res;
      },
      error: () => { },
      complete: () => { }
    })
  }
 
}