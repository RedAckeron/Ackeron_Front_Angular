import { Component, OnInit } from '@angular/core';
import { Hero } from 'src/app/models/Character/Hero';
import { Mob } from 'src/app/models/Character/Mob';
import { Info } from 'src/app/models/Info.model';
import { Localisator } from 'src/app/models/Localisator';
import { Area } from 'src/app/models/Map/Area.model';
import { Planet } from 'src/app/models/Map/Planet.model';
import { Power } from 'src/app/models/Power.model';
import { Resist } from 'src/app/models/Resist.model';
import { Stat } from 'src/app/models/Stat.model';
import { CharacterRepoService } from 'src/app/repositories/character-repo.service';
import { MapPlanetRepoService } from 'src/app/repositories/Map/map-planet-repo.service';
import { CharacterService } from 'src/app/services/character.service';
import { MapService } from 'src/app/services/map.service';
import { MathService } from 'src/app/services/math.service';

@Component({
  selector: 'app-dungeon',
  templateUrl: './dungeon.component.html',
  styleUrls: ['./dungeon.component.scss']
})
export class DungeonComponent implements OnInit {
scale=64;
TabArea:Array<Area> = [];
Horde:Array<Mob>=[];
mathService : MathService = new MathService();
dungeonlvl:number = 1;
planet = new Planet(1,"Dungeon Lvl "+this.dungeonlvl, 20, 20, [], [], this._mapRepo);

Hero: Hero
  constructor( private _mapRepo: MapPlanetRepoService, private _charService: CharacterService,private _mapService:MapService) {
    this.Hero = new Hero(0, 0, 1000,new Info(0, 'Hero', 0, 0, 0, 0, 0, '', 'nord'), new Localisator(0,0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0), new Stat(0, 0, 0, 0, 0, 0, 0, 0, 0,1000), new Power(), new Resist(), _charService,_mapService);

  }

  ngOnInit(): void {
// on demarre la generation du dongeon
this.InitDungeon(this.dungeonlvl);
//this.Horde.forEach(element => element.RandomMove())

// on demarre le randommove des mobs 


  }

  SetTarget(x:number,y:number)
  {
    console.log("destination defini sur vecteur "+x+"/"+y);
  }

  InitDungeon(dungeonlvl:number)//le lvl defini les stats des mobs de 1 a 100
  {
   //on injecte les blocks
    let nbblock=this.mathService.RandomNumber(1,6);
   for(let i=1;i<=nbblock;i++){
    console.log("generation de "+nbblock+" blocks");
    let locx =this.mathService.RandomNumberEven(1,13);
    let locy =this.mathService.RandomNumberEven(1,7);
    this.planet.Areas.push(new Area(0,"Block",new Localisator(0,0,0,0,0,0,0,0,0,locx,locy,0,0,0),"dungeon/block.gif",false,'no','no'))
   }

    //on injecte les statues
   let nbstatue=this.mathService.RandomNumber(1,6);
   for(let i=1;i<=nbstatue;i++){
    console.log("generation de "+nbstatue+" statues");
    let locx =this.mathService.RandomNumberEven(1,13);
    let locy =this.mathService.RandomNumberEven(1,7);
    this.planet.Areas.push(new Area(0,"Statue",new Localisator(0,0,0,0,0,0,0,0,0,locx,locy,0,0,0),"dungeon/grave.gif",false,'no','no'))
   }

//on injecte les sables
   let nbsand =this.mathService.RandomNumber(1,6);
   for(let i=1;i<=nbsand;i++){
    console.log("generation de "+nbsand+" sable");
    let locx =this.mathService.RandomNumberEven(1,13);
    let locy =this.mathService.RandomNumberEven(1,7);
    this.planet.Areas.push(new Area(0,"Sable",new Localisator(0,0,0,0,0,0,0,0,0,locx,locy,0,0,0),"dungeon/sand.gif",false,'no','no'))
   }


   let info=new Info(0,"mob",0,0,0,0,0,"img mob","nord");
   let localisator = new Localisator(0,0,0,0,0,this.planet.IdPlanet,0,0,0,5,7,0,0,0);
   let stat = new Stat(0,0,0,0,0,0,0,0,0,0);
   let power = new Power();
   let resist = new Resist();
  //this.Horde.push(new Mob(1,0,info,localisator,stat,power,resist));

   console.log(this.planet.Areas);
   //this.Hero.RandomMove(this.planet);
//on injecte les statues 
// on injecte les sand 
// on injecte les mobs 
  }
}
