import { Component, OnInit } from '@angular/core';
import { PatternValidator } from '@angular/forms';
import { concatWith, forkJoin, observable, Observable } from 'rxjs';
import { Character } from 'src/app/models/Character/Character';
import { Hero } from 'src/app/models/Character/Hero';
import { Mob } from 'src/app/models/Character/Mob';
import { Info } from 'src/app/models/Info.model';
import { Localisator } from 'src/app/models/Localisator';
import { Area } from 'src/app/models/Map/Area.model';
import { Planet } from 'src/app/models/Map/Planet.model';
import { Power } from 'src/app/models/Power.model';
import { Resist } from 'src/app/models/Resist.model';
import { Stat } from 'src/app/models/Stat.model';
import { MapPlanetRepoService } from 'src/app/repositories/Map/map-planet-repo.service';
import { MobRepoService } from 'src/app/repositories/Mob/mob-repo.service';
import { CharacterService } from 'src/app/services/character.service';
import { MapService } from 'src/app/services/map.service';
import { MathService } from 'src/app/services/math.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  Hero: Hero;
  planet = new Planet(1, 'MainLand', 20, 20, [], [], this._mapRepo);
  scale = 32;
  timer: any = undefined;
  AreaTarget: Localisator=new Localisator(0,0,0,0,0,0,0,0,0,0,0,0,0,0);
  MobTarget:number=0;
  CurentArea:Area=new Area(0,'Nowhere',new Localisator(0,0,0,0,0,0,0,0,0,0,0,0,0,0),'',true,'','');
  //mobs!: Array<Mob>



  constructor(private _characterService: CharacterService,private _mapService:MapService, private _mathService: MathService, private _mapRepo: MapPlanetRepoService, private _mobRepo: MobRepoService) {
    this.Hero = new Hero(1, 0, 1000,new Info(0, 'Hero', 0, 0, 0, 0, 0, '', 'nord'), new Localisator(0,0, 0, 0, 0, 1, 0, 0, 0, 9, 10, 0, 0, 0) , new Stat(0, 0, 0, 0, 0, 0, 0, 0, 0,1000), new Power(), new Resist(),this._characterService,_mapService);
  }

  ngOnInit(): void {
    //initMove(this.Hero);
    forkJoin([
      this._mobRepo.ReadAllOfPlanet(this.planet.IdPlanet),
      this._mapRepo.GetMap(this.planet.IdPlanet)
    ]) //Récupération d'un ensemble conjoint de donnée
      .subscribe(([mobs, map]) => { //Chaque valeur du tableau correspond à chaque appel du forkjoin
        
    // Pour chaque mob en json créer un objet mob
      this.planet.Horde = mobs.map(it => new Mob({...it, _characterService: this._characterService}));this.planet.Areas = map;
    //on rempli le tableau d element avec le retour json de l api
      this.planet.Horde.forEach(element => element.RandomMove(this.planet,this.Hero.localisator))
     //on remplis les zones vide avec des areas vide 
     var i:number = 0;  
     var j:number = 0;  
      for(i = 0;i<=this.planet.MaxX;i++) {
        for(j = 0;j<=this.planet.MaxY;j++) {
          if(!this.planet.Areas.map(loc => loc.localisator).find( loc => loc.locAX == i && loc.locAY == j)){
            this.planet.Areas.push(new Area(0,'Zone vide',new Localisator(0,0,0,0,0,this.planet.IdPlanet,0,0,0,i,j,0,0,0),'mainland/free.gif',true,'',''));
          }
        }
      }
      
      })

  }

  initMove(character: Character) {
    const timer = setInterval(() => {


    //  this._locRepo.update()
    });

  // this.timers.push(timer);
  }

  SetMobTarget(IdMob: number) {
    this.AreaTarget.locAId = 0;
    this.MobTarget = IdMob
    console.log("Mob Selected : " + IdMob);
  }

  SetAreaTarget(Area: Area) {
    this.MobTarget = 0;
    this.AreaTarget.locAId = Area.localisator.locAId
    this.AreaTarget.locAX = Area.localisator.locAX
    this.AreaTarget.locAY=Area.localisator.locAY
    console.log("Target defini : " + Area.localisator.locAX+"/"+Area.localisator.locAY);
    this.Hero.TargetedMove(this.AreaTarget.locAX,this.AreaTarget.locAY,this.planet);
  }

  SetScale(scale:number)
    {
      this.scale=scale;
    }
}