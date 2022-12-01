import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MathService {

  constructor() { }
   getRandomInt(max:number) {
    return Math.floor(Math.random() * max);
  }
}
