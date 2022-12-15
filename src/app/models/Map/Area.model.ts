import { Localisator } from "../Localisator/Localisator";


export class Area {
    idArea:number;
    name:string;
    Localisator:Localisator
    imgItem:string;
    reachable:boolean;
    mainTrigger:string;
    subTrigger:string;
   
    constructor(id : number,Name:string,Localisator:Localisator,ImgItem:string,Reachable:boolean,MainTrigger:string,SubTrigger:string){
        this.idArea = id;
        this.name=Name;
        this.Localisator=Localisator;
        this.imgItem=ImgItem;
        this.reachable=Reachable;
        this.mainTrigger=MainTrigger;
        this.subTrigger=SubTrigger;
    }
}