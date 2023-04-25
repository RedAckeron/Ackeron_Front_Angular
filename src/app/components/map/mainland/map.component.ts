import { getLocaleEraNames } from '@angular/common';
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
import { HeroRepoService } from 'src/app/repositories/Hero/hero-repo.service';
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
  Hero: Hero ;

  planet = new Planet(1, 'MainLand', 20, 20, [], [], this._mapRepo);
  scale = 32;
  timer: any = undefined;
  AreaTarget: Localisator=new Localisator(0,0,0,0,0,0,0,0,0,0,0,0,0,0);
  MobTarget:number=0;
  CurentArea:Area=new Area(0,'Nowhere',new Localisator(0,0,0,0,0,0,0,0,0,0,0,0,0,0),'',true,'','');
  //mobs!: Array<Mob>

  constructor(private _characterService: CharacterService,private _mapService:MapService, private _mathService: MathService, private _mapRepo: MapPlanetRepoService, private _mobRepo: MobRepoService,private _heroRepo:HeroRepoService) {

    this.Hero = new Hero(
      1, 0, 1000,
      new Info(0, 'Hero', 0, 0, 0, 0, 0, 'Link', 'n','idle'),
      new Localisator(0,0, 0, 0, 0, 1, 0, 0, 0, 9, 10, 0, 0, 0) ,
      new Stat(0, 0, 0, 100,10,0, 1000, 1000, 1000, 1000, 0,1000),
      new Power(),
      new Resist(),
      this._characterService,this._mapService);
  }

  ngOnInit(): void {
    //initMove(this.Hero);
    forkJoin([
      //on recupere la liste des mobs de la planet
      this._mobRepo.ReadAllOfPlanet(this.planet.IdPlanet),
      //on rempli le tableau d element avec le retour json de l api
      this._mapRepo.GetMap(this.planet.IdPlanet),
      //this._heroRepo.Read(1)
    ]).subscribe(([mobs, map]) =>
        { //Chaque valeur du tableau correspond à chaque appel du forkjoin

        //this.Hero.id=hero.id;//hero Id
        // this.Hero.tsIn=hero.tsIn,//Ts d insertion en db
        // this.Hero.stat.coolDown= 1000,//cooldown
        // new Info(0, hero.info.name, 0, 0, 0, 0, 0, 'Link', 'n','idle'),
        // new Localisator(0,0, 0, 0, 0, 1, 0, 0, 0, 9, 10, 0, 0, 0) ,
        // new Stat(0, 0, 0, 100,10,0, 1000, 1000, 1000, 1000, 0,1000),
        // new Power(),
        // new Resist(),
        // this._characterService,this._mapService



        //this.Hero = new Hero(hero.id,hero.tsIn,0,,hero.localisator,hero.stat,hero.power,hero.resist,this._characterService,this._mapService);


        // Pour chaque mob en json créer un objet mob
        this.planet.Horde = mobs.map(it => new Mob({...it, _characterService: this._characterService}));this.planet.Areas = map;
        //on boucle sur tout les mobs pour les mettre en activiter
        this.planet.Horde.forEach(element => this.InitActionMob(element));




      //on remplis les zones vide avec des areas vide
      var i:number = 0;
      var j:number = 0;
        for(i = 0;i<=this.planet.MaxX;i++) {
          for(j = 0;j<=this.planet.MaxY;j++) {
            //si il n existe pas d element dans le tableau a la locij on remplis avec une case vide (map = recherche dans tableau)
            if(!this.planet.Areas.map(loc => loc.localisator).find( loc => loc.locAX == i && loc.locAY == j)){
              this.planet.Areas.push(new Area(0,'Zone vide',new Localisator(0,0,0,0,0,this.planet.IdPlanet,0,0,0,i,j,0,0,0),'mainland/free.gif',true,'',''));
            }
          }
        }
      })
this.InitActionHero(this.Hero);//on demarre le Hero
//console.log("Planet => "+  this.planet.Horde)
  }

//#####################################################################################################################
  InitActionHero(hero: Hero) {
      if (hero.stat.timer) {clearInterval(hero.stat.timer)};
      hero.stat.timer = setInterval(() => {

/*
      switch (hero.info.status) {
        case "idle":
          console.log("Status : attente");
          break;

        case "walking":
          console.log("Status : Marche");
          break;

        case "death":
          console.log("Status : Mort");
          break;

        default:
          console.log("Status : non pris en charge");
          break;
      }
*/

      hero.SelectAction(this.planet,this._characterService);
      },hero.stat.coolDown || 1000);
      }
//#####################################################################################################################
  InitActionMob(mob: Mob) {
    //console.log("Planet => "+ mob.stat.coolDown)
    if (mob.stat.timer) {clearInterval(mob.stat.timer)}
    mob.stat.timer = setInterval(() => {
    mob.SelectAction(this.planet,this.Hero,this._characterService);
    },mob.stat.coolDown || 1000);
    }
 //#####################################################################################################################
  SetMobTarget(IdMob: number) {
    this.AreaTarget.locAId = 0;
    this.MobTarget = IdMob
    console.log("Mob Selected : " + IdMob);
  }
//#####################################################################################################################
  SetAreaTarget(Area: Area) {
    if(this.Hero.stat.pv>0)
    {
      this.MobTarget = 0;
      this.AreaTarget.locAId = Area.localisator.locAId
      this.AreaTarget.locAX = Area.localisator.locAX
      this.AreaTarget.locAY=Area.localisator.locAY
      console.log("Target defini : " + Area.localisator.locAX+"/"+Area.localisator.locAY);
      this.Hero.TargetedMove(Area.localisator,this.planet);
    }
  }
//#####################################################################################################################
  SetScale(scale:number)
    {
      this.scale=scale;
    }
//#####################################################################################################################
  strike(IdMob:number)
    {
      if(this.planet.Horde[IdMob-1].stat.pv<1)
      {this.planet.Horde[IdMob-1].info.status="death";}
      else
      {
      if(this.Hero.info.strike==false)
        {
        this.planet.Horde[IdMob-1].stat.pv-=this.Hero.stat.strenght;
        this.Hero.info.strike=true;
        }
      }
    }
}
