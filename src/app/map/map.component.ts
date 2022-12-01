import { JsonPipe, LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { pipe } from 'rxjs';
import { Character, CharacterLoc } from '../models/Character';
import { Area } from '../models/Map/Area.model';
import { Planet } from '../models/Map/Planet.model';
import { CharacterService } from '../services/character.service';
import { MapService } from '../services/map.service';
import { MathService } from '../services/math.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
 
  Hero = new Character(0,'',0,new CharacterLoc(0,0,0,0,0,0,0));
  Mob = new Character(0,'',0,new CharacterLoc(0,0,0,0,0,0,0));

  planet =new Planet(0,'',50,40);

scale=16;

totalSecondes : number = 0;
timer : any = undefined;
map! : Array<Area>;


constructor(private _characterService : CharacterService,private _mathService:MathService,private _mapService:MapService) { }
 
ngOnInit(): void {

  //this._mapService.GetMap(1).subscribe(m => this.map)
  this.map=this._mapService.GetMap(1);

  console.log(this.map);
  
  this.play();
}

play() : void {
   // this.Hero.Loc=this._characterService.GetCharacterLoc(1);
    
   
   this.timer = setInterval( () => { 
     
    
    //on verifie si on est pas au bord de la carte se qui vas definir par ou on peut aller
    let Heromove=this.Hero.CheckMoveBorder(this.planet);
    this.Hero.SelectMove(Heromove);

    let Mobmove=this.Mob.CheckMoveBorder(this.planet);
    this.Mob.SelectMove(Mobmove);
   
    
    this._characterService.UpdateCharacterLoc(this.Hero.Loc);
    this.totalSecondes ++;
    
  } , 1000);
}

}