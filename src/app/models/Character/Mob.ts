import { MathService } from '../../services/math.service';
import { Character } from "./Character";
import { Localisator } from "../Localisator/Localisator";
import { Planet } from '../Map/Planet.model';

export class Mob extends Character {
    constructor(id : number,name:string,race:number,refresh:number,localisator:Localisator){
        super(id,name,race);
        this.Id = id;
        this.Name=name;
        this.Race=race;
        this.Refresh=refresh;
        this.Localisator=localisator;
    }
    public loadmob(){
       
        
    }
    public RandomMove(planet:Planet){
        //this.CheckMoveBorder()
        let timer : any = undefined;
        timer = setInterval( () => { 
            
            let move=this.CheckMoveBorder(planet);
            
            
            this.SelectMove(move);

        //this.CheckMoveBorder(Planet planet);
        }, this.Refresh);
    }
}