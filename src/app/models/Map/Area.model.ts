import { Localisator } from "../Localisator";


export class Area implements Iterable<any> {
    idArea:number;
    name:string;
    localisator:Localisator
    imgItem:string;
    reachable:boolean;
    mainTrigger:string;
    subTrigger:string;
   
    constructor(id : number,Name:string,Localisator:Localisator,ImgItem:string,Reachable:boolean,MainTrigger:string,SubTrigger:string){
        this.idArea = id;
        this.name=Name;
        this.localisator=Localisator;
        this.imgItem=ImgItem;
        this.reachable=Reachable;
        this.mainTrigger=MainTrigger;
        this.subTrigger=SubTrigger;
    }
    [Symbol.iterator](): Iterator<any, any, undefined> {
        throw new Error("Method not implemented.");
    }
}