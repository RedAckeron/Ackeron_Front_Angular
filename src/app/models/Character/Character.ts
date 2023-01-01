import { Planet } from "../Map/Planet.model";
import { MathService } from '../../services/math.service';
import { Localisator } from "../Localisator";
import { Info } from "../Info.model";

export abstract class Character {
    id:number;
    tsIn:number;
    info:Info = new Info(0,'',0,0,0,0,0,"","nord");
    localisator:Localisator=new Localisator(0,0,0,0,0,0,0,0,0,0,0,0,0);
    refresh:number=1000;
    
    Orientation:string="nord";

    constructor(id : number,tsin:number,info:Info,localisator:Localisator){
        this.id = id;
        this.tsIn=tsin;
        this.info=info
        this.localisator=localisator;
    }

    public CheckMoveBorder(planet:Planet):string{
        let move : string="";
        if(this.localisator.locAX<planet.MaxX)move+="e";
        if(this.localisator.locAX>0)move+="w";
        if(this.localisator.locAY<planet.MaxY)move+="s";
        if(this.localisator.locAY>0)move+="n";
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

        LocalisatorTarget=this.localisator;

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
        this.localisator=LocalisatorTarget;
        //update Localisator
        }
}