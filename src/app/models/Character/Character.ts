import { Planet } from "../Map/Planet.model";
import { MathService } from '../../services/math.service';
import { Localisator } from "../Localisator/Localisator";

export abstract class Character {
    Id:number;
    Name:string;
    Race:number;
    Refresh:number=1000;
    LocalisatorId:number=0;
    Localisator:Localisator=new Localisator(0,0,0,0,0,0,0,0,0,0,0,0,0,0);
    Orientation:string="nord";

    constructor(id : number,name:string,race:number){
        this.Id = id;
        this.Name=name;
        this.Race=race;
    }

    public CheckMoveBorder(planet:Planet):string{
        let move : string="";
        if(this.Localisator.locAX<planet.MaxX)move+="e";
        if(this.Localisator.locAX>0)move+="w";
        if(this.Localisator.locAY<planet.MaxY)move+="s";
        if(this.Localisator.locAY>0)move+="n";
        console.log(this.Name+" peut aller en direction de "+move);
        return move
    }

    public SelectMove(AllMove:string):Localisator{
        let math=new MathService();
        let moveok=false;
    while(!moveok)
        {
        let SelectedMove = math.getRandomInt(AllMove.length);
        let DirectionTry=AllMove.substring(SelectedMove,1);
        AllMove.slice(SelectedMove);
        let LocalisatorTarget = new Localisator(0,0,0,0,0,0,0,0,0,0,0,0,0,0);
        LocalisatorTarget=this.Localisator;
        switch (DirectionTry) {
            case 'n':{
                LocalisatorTarget.locAY--;
                this.Orientation='nord';                
                }break;
            case 's':{
                LocalisatorTarget.locAY++;
                this.Orientation='sud';
                }break;
            case 'w':{
                LocalisatorTarget.locAX--;
                this.Orientation='ouest';
                }break;
            case 'e':{
                LocalisatorTarget.locAX++;
                this.Orientation='est';
                }break;
            }
        }
       


        return (Localisatortarget:Localisator)
    };

        //let moveselected='';
      

console.log(this.Name+"Direction choisis : "+this.Orientation);

    }
    public CheckFreeArea(loc:Localisator):boolean{
        console.log('CheckFreeArea');

    //let move=this.CheckMoveBorder();
    return false;
    }

public ExecMove(target : Localisator)
    {
    console.log('ExecMove');

    }

}