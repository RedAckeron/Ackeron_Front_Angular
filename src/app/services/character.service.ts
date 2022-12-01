import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Character, CharacterLoc } from '../models/Character';
import { CharacterRepoService } from '../repositories/character-repo.service';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  constructor(private _CharacterRepo: CharacterRepoService) { }
  
  GetCharacterLoc(id: number):CharacterLoc {
    let result =new CharacterLoc(1,1,1,1,1,1,1);
    this._CharacterRepo.GetCharacterLoc(id).subscribe({
      next: (res) => {
      result.idChar=res.idChar;
      result.locA_X=res.locA_X;
      result.locA_Y=res.locA_Y;
      //return res;
      },
      error: () => { },
      complete: () => { }
    })
    return result;
  }

  UpdateCharacterLoc(charloc: CharacterLoc) {
    this._CharacterRepo.UpdateCharacterLoc(charloc).subscribe({
      next: (res) => {
        return res;
      },
      error: () => { },
      complete: () => { }
    })
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