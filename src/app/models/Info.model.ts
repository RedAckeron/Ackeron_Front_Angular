import { race } from "rxjs";

export class Info {
    infoId:number;
    name:string;
    race:number
    sexe:number;
    classe:number;
    gold:number;
    citizenPlanet:number;
    img:string;
    orientation:string="nord";
   
 constructor(infoId:number,name:string,race:number,sexe:number,classe:number,gold:number,citizenPlanet:number,img:string,orientation:string)
    {
    this.infoId=infoId;
    this.name=name;
    this.race=race;
    this.sexe=sexe;
    this.classe=classe;
    this.gold=gold;
    this.citizenPlanet=citizenPlanet;
    this.img=img;
    this.orientation=orientation;
    }
}