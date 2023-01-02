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
import { MathService } from 'src/app/services/math.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  Hero = new Hero(0, 0, new Info(0, 'Hero', 0, 0, 0, 0, 0, '', 'nord'), new Localisator(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0), new Stat(0, 0, 0, 0, 0, 0, 0, 0, 0,1000), new Power(), new Resist(), 1000);

  planet = new Planet(1, '', 20, 20, [], [], this._mapRepo);
  scale = 24;
  totalSecondes: number = 0;
  timer: any = undefined;
  AreaTarget: number = 0;
  MobTarget:number=0;
  mobs!: Array<Mob>

  constructor(private _characterService: CharacterService, private _mathService: MathService, private _mapRepo: MapPlanetRepoService, private _mobRepo: MobRepoService) { }

  ngOnInit(): void {
    forkJoin([
      this._mobRepo.ReadAllOfPlanet(this.planet.IdPlanet),
      this._mapRepo.GetMap(this.planet.IdPlanet)
    ]) //Récupération d'un ensemble conjoint de donnée
      .subscribe(([mobs, map]) => { //Chaque valeur du tableau correspond à chaque appel du forkjoin
        this.planet.Horde = mobs.map(it => new Mob(it));// Pour chaque mob en json créer un objet mob
        this.planet.Areas = map;//on rempli le tableau d element avec le retour json de l api
      console.log(this.planet.Horde);

        this.planet.Horde.forEach(element => element.RandomMove(this.planet))
        this.Hero.RandomMove(this.planet)

      })

    // console.clear();
    // //on load les elements du decor
    // this.planet.GetMap(1, this._mapRepo);
    // //on load les mobs 
    // this.planet.GetMob(this._mobRepo)

    // //on boucle sur les mobs pour les recreez en tableau
    // console.log(this.planet)
    // this.planet.Horde.forEach(element => {

    //   //console.log("****"+element.info);

    //   //this.mobs = new Mob(element.id,element.tsIn,element.info,element.localisator,element.refresh);
    //   });

    // //on boucle sur le tableau de mob pour les mettre en route 
    // this.planet.Horde.forEach(element => {
    //     console.log("boucle sur "+element.id);
    //     element.RandomMove(this.planet);
    //   });

    // this.Hero.RandomMove(this.planet);
  }

  SetMobTarget(IdMob: number) {
    this.AreaTarget = 0;
    this.MobTarget = IdMob
    console.log("Mob Selected : " + IdMob);
  }

  SetAreaTarget(IdArea: number) {
    this.MobTarget = 0;

    this.AreaTarget = IdArea
    console.log("Target defini : " + IdArea);
  }
}