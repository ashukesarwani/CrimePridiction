import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../appService/service.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private msg:ServiceService){}

  ngOnInit(){
    sessionStorage.removeItem('loginInfo')
  }

  login(detail:any){
    this.msg.login(detail)
    sessionStorage.setItem("loginInfo",JSON.stringify(detail))
  }
}
