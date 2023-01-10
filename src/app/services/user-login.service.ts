import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from '../models/login-model';

@Injectable({
  providedIn: 'root'
})
export class UserLoginService {

  constructor(private _router : Router) { }
  


  login():void{
    
    localStorage.setItem('IdChar','1')!;
    this._router.navigate(['/','home']);
  }


  logout() : void {
    localStorage.removeItem('IdChar');
    this._router.navigate(['/','home']);

  }
}
