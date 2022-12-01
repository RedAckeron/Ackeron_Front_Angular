export class Planet {
    IdPlanet:number;
    Name:string;
    MaxX:number;
    MaxY:number;
    /*
    LocX:number;
    LocY:number;
    ImgItem:string;
    Reachable:boolean;
    MainTrigger:string;
    SubTrigger:string;
   */
  /*,LocX:number,LocY:number,ImgItem:string,Reachable:boolean,MainTrigger:string,SubTrigger:string*/
    constructor(id : number,Name:string,MaxX:number,MaxY:number){
        this.IdPlanet = id;
        this.Name=Name;
        this.MaxX=MaxX;
        this.MaxY=MaxY;
        
        /*
        this.LocX=LocX;
        this.LocY=LocY;
        this.ImgItem=ImgItem;
        this.Reachable=Reachable;
        this.MainTrigger=MainTrigger;
        this.SubTrigger=SubTrigger;
        */
    }
}


