import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserLoginService } from 'src/app/services/user-login.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {


  IdChar :string="0";
  constructor(_userLogin:UserLoginService,_router:Router) {}
  
  login(){
    
    localStorage.setItem("IdChar","1");
    this.IdChar="1";
  }
  logout(){
    localStorage.setItem("IdChar","0");
    this.IdChar="0";
  }
  ngOnInit(): void {}

}
