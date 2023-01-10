import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Observable } from 'rxjs';
import { Character } from '../models/Character/Character';
import { Hero } from '../models/Character/Hero';
import { Mob } from '../models/Character/Mob';
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

  constructor(private _characterRepo: CharacterRepoService,private _localisatorRepo:LocalisatorRepo) {
  }
public MobStrike(mob:Mob,hero:Hero){
    let atq=(mob.stat.strenght+(mob.stat.strenght*(mob.power.eau/100)));
    let def=(hero.stat.defence+(hero.stat.defence*(hero.resist.eau/100)));
    hero.stat.pv-=(atq-def);
    console.log((atq-def));

    
    
}
//#####################################################################################################################
public CheckMobProche(hero:Hero,mob:Mob[]):Mob
{
    let mobSelected!:Mob;
    let distancerepere:number=99;
    mob.forEach(element => {
        //console.log("Le mob "+element.info.name+" se trouve a la loc : "+element.localisator.locAX+"/"+element.localisator.locAY);
        let difx=Math.abs(hero.localisator.locAX-element.localisator.locAX);
        let dify=Math.abs(hero.localisator.locAY-element.localisator.locAY);
        //console.log(difx+dify);
        if((difx+dify)<distancerepere)
        {
            distancerepere=(difx+dify);
            mobSelected=element;
        }
    });
    return mobSelected;
}
//#####################################################################################################################
public CheckDistMobProche(hero:Hero,mob:Mob):number
{

    let mobSelected!:Mob;
    let distancerepere:number=99;
        let difx=Math.abs(hero.localisator.locAX-mob.localisator.locAX);
        let dify=Math.abs(hero.localisator.locAY-mob.localisator.locAY);
        //console.log(difx+dify);
        if((difx+dify)<distancerepere)
        {
            distancerepere=(difx+dify);
        }
   //console.log("Le mob se trouve a "+distancerepere+" cases");
   
    return distancerepere;
}
 //#####################################################################################################################
public CheckDistHeroProche(heroloc:Localisator,mob:Character):number
{

    let HeroSelected!:Hero;
    let distancerepere:number=99;
        let difx=Math.abs(heroloc.locAX-mob.localisator.locAX);
        let dify=Math.abs(heroloc.locAY-mob.localisator.locAY);
        if((difx+dify)<distancerepere)
        {
            distancerepere=(difx+dify);
        }
   //console.log("Le hero se trouve a "+distancerepere+" cases");
   
    return distancerepere;
}
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
  let {locAX, locAY} = character.localisator;

   
  while (!moveok) {

      let SelectedMove = math.RandomNumber(0, AllMove.length - 1);

      let DirectionTry = AllMove.substring(SelectedMove, SelectedMove + 1);
      //console.log("Direction dispo : " + AllMove + " -- Direction choisis : " + DirectionTry);

      AllMove = AllMove.replace(DirectionTry, '');

      switch (DirectionTry) {
          case 'n': {
              locAY--;
              character.info.orientation = 'n';
          } break;
          case 's': {
              locAY++;
              character.info.orientation = 's';
          } break;
          case 'w': {
              locAX--;
              character.info.orientation = 'w';
          } break;
          case 'e': {
              locAX++;
              character.info.orientation = 'e';
          } break;
      }
      moveok = true;
  }
  return {locAX, locAY} as Localisator
};
//#####################################################################################################################
public ExecMove(character:Character,LocalisatorTarget: Localisator,planet:Planet){
    // planet.CurentArea=planet.Areas[];
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