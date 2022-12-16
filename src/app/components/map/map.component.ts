import { Component, OnInit } from '@angular/core';
import { PatternValidator } from '@angular/forms';
import { Character } from 'src/app/models/Character/Character';
import { Hero } from 'src/app/models/Character/Hero';
import { Mob } from 'src/app/models/Character/Mob';
import { Localisator } from 'src/app/models/Localisator/Localisator';
import { Area } from 'src/app/models/Map/Area.model';
import { Planet } from 'src/app/models/Map/Planet.model';
import { MapPlanetRepoService } from 'src/app/repositories/Map/map-planet-repo.service';
import { MobRepoService } from 'src/app/repositories/Mob/mob-repo.service';
import { CharacterService } from 'src/app/services/character.service';
import { MathService } from 'src/app/services/math.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
 
      Hero = new Hero(0,'',0,1000,new Localisator(0,0,0,0,0,0,0,0,0,0,0,0,0));
      mobs!:Mob[];

      Areas!:Area[];
      planet =new Planet(0,'',20,20,[],this._mapRepo);
      scale=24;
      totalSecondes : number = 0;
      timer : any = undefined;
      

constructor(private _characterService : CharacterService,private _mathService:MathService,private _mapRepo: MapPlanetRepoService,private _mobRepo:MobRepoService) { }
 
ngOnInit(): void {
  console.clear();
  this.planet.GetMap(1,this._mapRepo);
  this.LoadMob(this._mobRepo);
  this.mobs.forEach(element => {
  element.RandomMove(this.planet);
    
  });
 }

LoadMob(_mobRepo:MobRepoService)
{

this.mobs=_mobRepo.GetMob();
console.log(this.mobs);

}


SetTarget(AreaId : number)
{
  
  console.log("Target defini : "+AreaId);
}
}