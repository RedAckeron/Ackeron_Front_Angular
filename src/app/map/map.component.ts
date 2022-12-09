import { Component, OnInit } from '@angular/core';
import { Hero } from '../models/Character/Hero';
import { Mob } from '../models/Character/Mob';
import { Localisator } from '../models/Localisator/Localisator';
import { Area } from '../models/Map/Area.model';
import { Planet } from '../models/Map/Planet.model';
import { MapRepoService } from '../repositories/map-repo.service';
import { CharacterService } from '../services/character.service';
import { MathService } from '../services/math.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
    planet =new Planet(0,'',30,20,[],this._mapRepo);
    Hero = new Hero(0,'',0,1000,new Localisator(0,0,0,0,0,0,0,9,13,0,0,0,0,0));
    Mob = new Mob(0,'',0,1800,new Localisator(0,0,0,0,0,0,0,0,10,10,0,0,0,0));
    Mob1 = new Mob(0,'',0,2300,new Localisator(0,0,0,0,0,0,0,0,5,9,0,0,0,0));
    
    Areas!:Area[];
    
    scale=32;
    totalSecondes : number = 0;
    timer : any = undefined;

constructor(private _characterService : CharacterService,private _mathService:MathService,private _mapRepo: MapRepoService) { }
 
ngOnInit(): void {
    this.planet.GetMap(1,this._mapRepo);
    //this.Mob.LoadLoc();
    this.Mob.RandomMove(this.planet);
    //this.Mob.LoadLoc();
    this.Mob1.RandomMove(this.planet);
     
      
    //on verifie si on est pas au bord de la carte se qui vas definir par ou on peut aller
    let Heromove=this.Hero.CheckMoveBorder(this.planet);
    this.Hero.SelectMove(Heromove);

    //let Mobmove=this.Mob.CheckMoveBorder(this.planet);
    //this.Mob.SelectMove(Mobmove);
    
    this._characterService.UpdateCharacterLoc(this.Hero.Loc);
    this.totalSecondes ++;
    //    } , 1000);




    //this.GetMap(1);
   
    }




SetTarget()
{
  console.log("Target defini");
  
}
}