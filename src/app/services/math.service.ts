import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MathService {

  constructor() { }
    RandomNumber(min :number, max:number):number
    {
     return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    RandomNumberEven(min :number, max:number):number
    {
      let check:number = 1
      while((check)%2!=0)
      {
        check = Math.floor(Math.random() * (max - min + 1)) + min;
      }
     return check;
    }

  }
//}
