import { Component, OnDestroy, OnInit } from '@angular/core';
import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
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
export class MapComponent implements OnInit, OnDestroy {
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
      this._mobRepo.ReadAllOfPlanet(this.planet.IdPlanet).pipe(
        catchError(error => {
          console.error('Erreur lors du chargement des mobs:', error);
          return of([]);
        })
      ),
      //on rempli le tableau d element avec le retour json de l api
      this._mapRepo.GetMap(this.planet.IdPlanet).pipe(
        catchError(error => {
          console.error('Erreur lors du chargement de la carte:', error);
          return of([]);
        })
      ),
      //this._heroRepo.Read(1)
    ]).subscribe({
      next: ([mobs, map]) => {
        //Chaque valeur du tableau correspond à chaque appel du forkjoin

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
        this.planet.Horde = mobs.map(it => new Mob({...it, _characterService: this._characterService}));
        this.planet.Areas = map;
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
      },
      error: (error) => {
        console.error('Erreur générale lors de l\'initialisation:', error);
      }
    });
    
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
      //si le mob est pas en status mort , on lui permet de choisir une action a accomplir
    if(mob.info.status!='death') mob.SelectAction(this.planet,this.Hero,this._characterService);


    },mob.stat.coolDown || 1000);//on prend comme ref le cooldown et si il existe pas on prend 1000


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
      // Vérification de sécurité pour éviter les erreurs d'accès
      if (!this.planet.Horde || !this.planet.Horde[IdMob-1]) {
        console.error('Mob non trouvé avec l\'ID:', IdMob);
        return;
      }

      const targetMob = this.planet.Horde[IdMob-1];
      
      if(targetMob.stat.pv < 1) {
        targetMob.info.status = "death";
      } else {
        if(this.Hero.info.strike == false) {
          targetMob.stat.pv -= this.Hero.stat.strenght;
          this.Hero.info.strike = true;
        }
      }
    }

  //#####################################################################################################################
  ngOnDestroy(): void {
    // Nettoyage des timers pour éviter les fuites mémoire
    if (this.Hero && this.Hero.stat.timer) {
      clearInterval(this.Hero.stat.timer);
    }
    
    // Nettoyage des timers des mobs
    if (this.planet && this.planet.Horde) {
      this.planet.Horde.forEach(mob => {
        if (mob.stat.timer) {
          clearInterval(mob.stat.timer);
        }
      });
    }
    
    // Nettoyage du timer principal du composant
    if (this.timer) {
      clearInterval(this.timer);
    }
  }
}
