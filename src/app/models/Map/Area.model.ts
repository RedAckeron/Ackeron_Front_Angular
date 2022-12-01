export class Area {
    idArea:number;
    name:string;
    locX:number;
    locY:number;
    imgItem:string;
    reachable:boolean;
    mainTrigger:string;
    subTrigger:string;
   
    constructor(id : number,Name:string,LocX:number,LocY:number,ImgItem:string,Reachable:boolean,MainTrigger:string,SubTrigger:string){
        this.idArea = id;
        this.name=Name;
        this.locX=LocX;
        this.locY=LocY;
        this.imgItem=ImgItem;
        this.reachable=Reachable;
        this.mainTrigger=MainTrigger;
        this.subTrigger=SubTrigger;
    }
}