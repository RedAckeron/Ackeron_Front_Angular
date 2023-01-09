import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Observable } from 'rxjs';
import { Character } from '../models/Character/Character';
import { Hero } from '../models/Character/Hero';
import { Localisator } from '../models/Localisator';
import { Area } from '../models/Map/Area.model';
import { Planet } from '../models/Map/Planet.model';
import { CharacterRepoService } from '../repositories/character-repo.service';
import { LocalisatorRepo } from '../repositories/localisator-repo.service';
import { LocalisatorService } from './localisator.service';
import { MathService } from './math.service';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  constructor(private _characterRepo: CharacterRepoService,private _localisatorRepo:LocalisatorRepo) { }
  //#####################################################################################################################
public ReadLocalisator(id: number):Localisator {
    let result =new Localisator(0,1,1,1,1,1,1,1,1,1,1,1,1,0);
    this._localisatorRepo.Read(id).subscribe({
      next: (res) => {
        result=res;
      },
      error: () => {},
      complete: () => {}
    })
    //console.log("En sortie de Service : ",result);
    
    return result;
}
//#####################################################################################################################
public CheckMoveBorder(character:Character,AllMove:string,planet:Planet): string {
  if (character.localisator.locAX >= planet.MaxX) AllMove=AllMove.replace('e','');
  if (character.localisator.locAX <= 0) AllMove=AllMove.replace("w","");
  if (character.localisator.locAY >= planet.MaxY)AllMove=AllMove.replace("s","");
  if (character.localisator.locAY <= 0) AllMove=AllMove.replace("n","");
  return AllMove
}
//#####################################################################################################################
public CheckMoveOrientation(AllMove:string,origin : Localisator,destination : Localisator):string{
  if(origin.locAX>=destination.locAX)AllMove=AllMove.replace("e","");
  if(origin.locAX<=destination.locAX)AllMove=AllMove.replace("w","");
  if(origin.locAY>=destination.locAY)AllMove=AllMove.replace("s","");
  if(origin.locAY<=destination.locAY)AllMove=AllMove.replace("n","");
  return AllMove
}
//#####################################################################################################################
public CheckMoveColision(character:Character,AllMove:string,planet : Planet):string{

  //Aide pour calcul des colisions dans le tableau d areas :    planet.Areas.map(a => a.localisator).find( a => a.locAX == 1 && a.locAY ==2)
 
  //on check l ouest
  planet.Areas.forEach(element => {
      if((element.localisator.locAX==character.localisator.locAX-1)&&(element.localisator.locAY==character.localisator.locAY))
      {
          if(element.reachable==false) 
              {
                  //console.log("Il y a un element a l ouest qui est infranchissable");
                  AllMove=AllMove.replace("w","");
              }
          //else console.log("Il y a un element a l ouest qui est franchissable");
      }
  //on check l est
      if((element.localisator.locAX==character.localisator.locAX+1)&&(element.localisator.locAY==character.localisator.locAY))
      {
          if(element.reachable==false) 
              {
                  //console.log("Il y a un element a l est qui est infranchissable");
                  AllMove=AllMove.replace("e","");
              }
          //else console.log("Il y a un element a l est qui est franchissable");
      }
  //on check le nord 
      if((element.localisator.locAX==character.localisator.locAX)&&((element.localisator.locAY+1)==character.localisator.locAY))
      {
          if(element.reachable==false) 
              {
                  //console.log("Il y a un element au nord qui est infranchissable");
                  AllMove=AllMove.replace("n","");
              }
          //else console.log("Il y a un element au nord qui est franchissable");
         
      }
  //on check le sud
      if((element.localisator.locAX==character.localisator.locAX)&&((element.localisator.locAY-1)==character.localisator.locAY))
      {
          if(element.reachable==false) 
              {
                  //console.log("Il y a un element au sud qui est infranchissable");
                  AllMove=AllMove.replace("s","");
              }
          //else console.log("Il y a un element au sud qui est franchissable");
      }
  });
  return AllMove;
}
//#####################################################################################################################
public SelectMove(character:Character,AllMove: string): Localisator {
  let math = new MathService();
  let moveok = false;
  let LocalisatorTarget = character.localisator;

   
  while (!moveok) {

      let SelectedMove = math.RandomNumber(0, AllMove.length - 1);

      let DirectionTry = AllMove.substring(SelectedMove, SelectedMove + 1);
      //console.log("Direction dispo : " + AllMove + " -- Direction choisis : " + DirectionTry);

      AllMove = AllMove.replace(DirectionTry, '');

      switch (DirectionTry) {
          case 'n': {
              LocalisatorTarget.locAY--;
              character.info.orientation = 'nord';
          } break;
          case 's': {
              LocalisatorTarget.locAY++;
              character.info.orientation = 'sud';
          } break;
          case 'w': {
              LocalisatorTarget.locAX--;
              character.info.orientation = 'ouest';
          } break;
          case 'e': {
              LocalisatorTarget.locAX++;
              character.info.orientation = 'est';
          } break;
      }
      moveok = true;
  }
  return LocalisatorTarget
};
//#####################################################################################################################
public ExecMove(character:Character,LocalisatorTarget: Localisator,planet:Planet){
    //planet.CurentArea=planet.Areas[];
    character.localisator = LocalisatorTarget;
    //on met a jours la position du joueur dans l API
    this._localisatorRepo.Update(character.localisator);
        //si on est de la classe  hero ...
    if (character instanceof Hero) {
        //on recupere dans le tableau d area celle ou on se trouve pour la mettre dans la curent area de planet
        planet.CurentArea = planet.Areas.map(loc => loc).find( loc => loc.localisator.locAX == LocalisatorTarget.locAX && loc.localisator.locAY == LocalisatorTarget.locAY)!;
    }
  }
//#####################################################################################################################


}