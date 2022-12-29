import { Component, OnInit } from '@angular/core';
import { PatternValidator } from '@angular/forms';
import { Observable } from 'rxjs';
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

  //Hero = new Hero(0, '', 0, 1000, new Localisator(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0));
  //mobs!: Observable<Mob[]>;

  //mob: Mob = new Mob(0, '', 0, 1000, new Localisator(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0));
  //mob? : Mob;

  Areas!: Area[];
  planet = new Planet(0, '', 20, 20, [],[], this._mapRepo);
  scale = 24;
  totalSecondes: number = 0;
  timer: any = undefined;
  AreaTarget: number = 0;
  nbmob:number=0;
  constructor(private _characterService: CharacterService, private _mathService: MathService, private _mapRepo: MapPlanetRepoService, private _mobRepo: MobRepoService) { }

  ngOnInit(): void {
    console.clear();
    this.planet.GetMap(1, this._mapRepo);

    //this.LoadMob(this._mobRepo);
    this.planet.GetMob(1,this._mobRepo);
    

    this.planet.Mobs.forEach(element => {
      element.RandomMove(this.planet);
    });
  }
/*
  LoadMob(_mobRepo: MobRepoService) {
  this.planet.GetMob(_mobRepo.(1,_mobRepo));
   
    //this.mob = _mobRepo.GetMobonline(1)

    //+=

    console.log(this.planet.Mobs);
  }
*/


  SetTarget(IdArea: number) {
    this.AreaTarget = IdArea
    console.log("Target defini : " + IdArea);
  }
}