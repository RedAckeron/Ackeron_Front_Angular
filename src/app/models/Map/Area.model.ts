export class Area {
    IdArea:number;
    Name:string;
    LocX:number;
    LocY:number;
    ImgItem:string;
    Reachable:boolean;
    MainTrigger:string;
    SubTrigger:string;
   
    constructor(id : number,Name:string,LocX:number,LocY:number,ImgItem:string,Reachable:boolean,MainTrigger:string,SubTrigger:string){
        this.IdArea = id;
        this.Name=Name;
        this.LocX=LocX;
        this.LocY=LocY;
        this.ImgItem=ImgItem;
        this.Reachable=Reachable;
        this.MainTrigger=MainTrigger;
        this.SubTrigger=SubTrigger;
    }
}


