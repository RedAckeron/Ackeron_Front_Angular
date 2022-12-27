import { race } from "rxjs";

export class Info {
    InfoId:number;
    Name:string;
    Race:number
    Sexe:number;
    Classe:number;
    Gold:number;
    CitizenPlanet:number;
   
 constructor(infoId:number,name:string,race:number,sexe:number,classe:number,gold:number,citizenPlanet:number)
    {
    this.InfoId=infoId;
    this.Name=name;
    this.Race=race;
    this.Sexe=sexe;
    this.Classe=classe;
    this.Gold=gold;
    this.CitizenPlanet=citizenPlanet;
    }
}