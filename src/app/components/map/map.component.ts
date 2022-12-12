import { JsonPipe, LocationStrategy, NgStyle } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { pipe } from 'rxjs';
import { Character, CharacterLoc } from 'src/app/models/Character';
import { Area } from 'src/app/models/Map/Area.model';
import { Planet } from 'src/app/models/Map/Planet.model';
import { MapRepoService } from 'src/app/repositories/map-repo.service';
import { CharacterService } from 'src/app/services/character.service';
import { MathService } from 'src/app/services/math.service';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
 
      Hero = new Character(0,'',0,new CharacterLoc(0,0,0,0,0,0,0));
      Mob = new Character(0,'',0,new CharacterLoc(0,0,0,0,0,0,0));
      Areas!:Area[];
      planet =new Planet(0,'',20,20,[],this._mapRepo);
      scale=32;
      totalSecondes : number = 0;
      timer : any = undefined;

constructor(private _characterService : CharacterService,private _mathService:MathService,private _mapRepo: MapRepoService) { }
 
ngOnInit(): void {
    this.GetMap(1);
    this.play();
}

GetMap(IdPlanet: number):Area[]{
  let TabArea! : Area[];
  this._mapRepo.GetMap(IdPlanet).subscribe( {
    next: (res) => {
      TabArea=res;
      console.log(res);
      
      return TabArea;
      },
    error: () => {},
    complete: () => {
      this.planet.Areas=TabArea;
      console.log(this.planet.Areas);
    }
  })
  return TabArea;
} 


play() : void {
   this.timer = setInterval( () => { 
    
    //on verifie si on est pas au bord de la carte se qui vas definir par ou on peut aller
    let Heromove=this.Hero.CheckMoveBorder(this.planet);
    this.Hero.SelectMove(Heromove);

    let Mobmove=this.Mob.CheckMoveBorder(this.planet);
    this.Mob.SelectMove(Mobmove);
   
    //this._characterService.UpdateCharacterLoc(this.Hero.Loc);
    this.totalSecondes ++;
        } , 1000);
    }
SetTarget()
{
  console.log("Target defini");
  
}
}