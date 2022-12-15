import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MathService {

  constructor() { }
    RandomNumber(min :number, max:number)
    {
     return Math.floor(Math.random() * (max - min + 1)) + min;
    }
  }
//}
