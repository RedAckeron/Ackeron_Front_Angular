export class Character {
    id:number;
    Name:string;
    Loc:Loc;
    constructor(id : number,Name:string,Loc:Loc){
        this.id = id;
        this.Name=Name
        this.Loc=Loc
    }
}


export class Loc{
    idChar : number;
    locU:number;
    locS:number;
    locP:number;
    locA:number;
    locA_X:number;
    locA_Y:number;
    constructor(idChar : number,locU:number, locS : number,locP:number,locA:number,locA_X:number,locA_Y:number){
        this.idChar=idChar;
        this.locU=locU;
        this.locS=locS;
        this.locP=locP;
        this.locA=locA;
        this.locA_X=locA_X;
        this.locA_Y=locA_Y;
    }
}