export class Stats {
    StatsId:number=0;
    PtMove:number=5;
    PtMoveMax:number=5;
    Pv:number=100;
    PvMax:number=100;
    Pw:number=100;
    PwMax:number=100;
    TimeStampSimul:number=5;
    Xp:number=0;

 constructor(statsId:number,ptMove:number,ptMoveMax:number,pv:number,pvMax:number,pw:number,pwMax:number,timeStampSimul:number,xp:number)
    {
    this.StatsId=statsId;
    this.PtMove=ptMove;
    this.PtMoveMax=ptMoveMax;
    this.Pv=pv;
    this.PvMax=pvMax;
    this.Pw=pw;
    this.PwMax=pwMax;
    this.TimeStampSimul=timeStampSimul;
    this.Xp=xp;
    }
}