import { Planet } from "./Map/Planet.model";
import { MathService } from '../services/math.service';

export class Character {
    id:number;
    Name:string;
    Race:number;
    Loc:CharacterLoc;
    //Loc:Loc;
    constructor(id : number,name:string,race:number,loc:CharacterLoc){
        this.id = id;
        this.Name=name;
        this.Race=race;
        this.Loc=loc;
    }
    public CheckMoveBorder(planet:Planet):string{
        let move : string="";
        if(this.Loc.locA_X<planet.MaxX)move+="e";
        if(this.Loc.locA_X>0)move+="w";
        if(this.Loc.locA_Y<planet.MaxY)move+="s";
        if(this.Loc.locA_Y>0)move+="n";
        return move
    }
    public SelectMove(move:string){
        let math=new MathService();
        let SelectMove = math.getRandomInt(move.length);
        let moveselected='';
        switch (move[SelectMove]) {
            case 'n':{
                this.Loc.locA_Y--;
                this.Loc.orientation='nord';
                }break;
            case 's':{
                this.Loc.locA_Y++;
                this.Loc.orientation='sud';
              }break;
            case 'w':{
                this.Loc.locA_X--;
                this.Loc.orientation='ouest';
                }break;
            case 'e':{
                this.Loc.locA_X++;
                this.Loc.orientation='est';
              }break;
            }




        //return moveselected
    }
    public RandomMove(){

        }
}

export class CharacterLoc{
    idChar:number;
    locU:number;
    locS:number;
    locP:number;
    locA:number;
    locA_X:number;
    locA_Y:number;
    orientation:string="nord";
    
    constructor(idChar : number,locU:number, locS : number,locP:number,locA:number,locA_X:number,locA_Y:number){
        this.idChar=idChar;
        this.locU=locU;
        this.locS=locS;
        this.locP=locP;
        this.locA=locA;
        this.locA_X=locA_X;
        this.locA_Y=locA_Y;
    }
}