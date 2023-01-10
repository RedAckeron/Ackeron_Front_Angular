import { TimeInterval } from "rxjs/internal/operators/timeInterval";

export class Stat {
    statsId:number=0;
    ptMove:number=5;
    ptMoveMax:number=5;
    strenght:number=100;
    defence:number=100;
    xp:number=0;
    pv:number=100;
    pvMax:number=100;
    pw:number=100;
    pwMax:number=100;
    timeStampSimul:number=5;
    timer:any;
    coolDown:number=1000;
 constructor(statsId:number,ptMove:number,ptMoveMax:number,strenght:number,defence:number,xp:number,pv:number,pvMax:number,pw:number,pwMax:number,timeStampSimul:number,coolDown:number)
    {
    this.statsId=statsId;
    this.ptMove=ptMove;
    this.ptMoveMax=ptMoveMax;
    this.strenght=strenght;
    this.defence=defence;
    this.xp=xp;
    this.pv=pv;
    this.pvMax=pvMax;
    this.pw=pw;
    this.pwMax=pwMax;
    this.timeStampSimul=timeStampSimul;
    }
}