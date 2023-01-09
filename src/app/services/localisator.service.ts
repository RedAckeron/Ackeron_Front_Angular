import { Injectable } from '@angular/core';
import { Localisator } from '../models/Localisator';
import { LocalisatorRepo } from '../repositories/localisator-repo.service';

@Injectable({
  providedIn: 'root'
})
export class LocalisatorService {

  constructor(private _localisatorRepo: LocalisatorRepo) {}

/*
  public ReadLocalisator(id:number):Localisator{
     this._localisatorRepo.Read(id).subscribe({
      next: (res) => {
        result=res;
        
      //result.idChar=res.idChar;
      //return res;
      },
      error: () => { },
      complete: () => { }
    })
    return result;;
  }
  */
  public UpdateLocalisator(loc:Localisator){

    this._localisatorRepo.Update(loc);
    

    }
}
