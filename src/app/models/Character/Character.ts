import { Planet } from "../Map/Planet.model";
import { MathService } from '../../services/math.service';
import { Localisator } from "../Localisator/Localisator";

export abstract class Character {
    Id:number;
    Name:string;
    Race:number;
    Refresh:number=1000;
    LocalisatorId:number=0;
    Localisator:Localisator=new Localisator(0,0,0,0,0,0,0,0,0,0,0,0,0);
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
        return move
    }

    public SelectMove(AllMove:string):Localisator{
        let math=new MathService();
        let moveok=false;
        let LocalisatorTarget = new Localisator(0,0,0,0,0,0,0,0,0,0,0,0,0);
    
    
    while(!moveok)
        {
            
        let SelectedMove = math.RandomNumber(0,AllMove.length-1);
        
        let DirectionTry=AllMove.substring(SelectedMove,SelectedMove+1);
        console.log("Direction dispo : "+AllMove+" -- Direction choisis : "+DirectionTry);
        
        AllMove=AllMove.replace(DirectionTry,'');
       
        //AllMove.slice(SelectedMove,1);

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

        //on verifie que la position ou on veut aller est libre

        // si elle est libre on renvoi la localisator qui a ete choisis 
        //et on sort de la bouche de test moveok

        moveok=true;
        }
        return LocalisatorTarget
    };

    public ExecMove(LocalisatorTarget : Localisator){
        console.log('ExecMove');
        this.Localisator=LocalisatorTarget;
        //update Localisator
        }
}