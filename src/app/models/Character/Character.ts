import { Planet } from "../Map/Planet.model";
import { MathService } from '../../services/math.service';
import { Localisator } from "../Localisator/Localisator";

export abstract class Character {
    Id:number;
    Name:string;
    Race:number;
    Refresh:number=1000;
    Loc:Localisator;
    constructor(id : number,name:string,race:number,refresh:number,loc:Localisator){
        this.Id = id;
        this.Name=name;
        this.Race=race;
        this.Loc=loc;
        this.Refresh=refresh;
    }
    public CheckMoveBorder(planet:Planet):string{
        let move : string="";
        if(this.Loc.locAX<planet.MaxX)move+="e";
        if(this.Loc.locAX>0)move+="w";
        if(this.Loc.locAY<planet.MaxY)move+="s";
        if(this.Loc.locAY>0)move+="n";
        console.log(this.Name+" peut aller en direction de "+move);
        return move
    }
    public SelectMove(move:string){
        let math=new MathService();
        let SelectMove = math.getRandomInt(move.length);
        //let moveselected='';
        switch (move[SelectMove]) {
            case 'n':{
                this.Loc.locAY--;
                this.Loc.orientation='nord';                
                }break;
            case 's':{
                this.Loc.locAY++;
                this.Loc.orientation='sud';
              }break;
            case 'w':{
                this.Loc.locAX--;
                this.Loc.orientation='ouest';
                }break;
            case 'e':{
                this.Loc.locAX++;
                this.Loc.orientation='est';
              }break;
            }
console.log(this.Name+"Direction choisis : "+this.Loc.orientation);

    }
    public CheckFreeArea(loc:Localisator){


    }
}