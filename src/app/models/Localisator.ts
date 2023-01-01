export class Localisator{
    locUId:number=0;

    locSId:number=0;
    locSX:number=0;
    locSY:number=0;
    
    locPId:number=0;
    locPX:number=0;
    locPY:number=0;

    locAId:number=0;
    locAX:number=0;
    locAY:number=0;

    locZId:number=0;
    locZX:number=0;
    locZY:number=0;

    constructor(locUId:number, 
        locSId:number,LocSX:number,LocSY:number,
        locPId:number,locPX:number,locPY:number,
        locAId:number,locAX:number,locAY:number,
        locZId:number,locZX:number,locZY:number,

        ){
       
        this.locUId=locUId;

        this.locSId=locSId;
        this.locSX=LocSX;
        this.locSY=LocSY;

        this.locPId=locPId;
        this.locPX=locPX;
        this.locPY=locPY;

        this.locAId=locAId;
        this.locAX=locAX;
        this.locAY=locAY;
        
        this.locZId=locZId;
        this.locZX=locZX;
        this.locZY=locZY;
    }
}