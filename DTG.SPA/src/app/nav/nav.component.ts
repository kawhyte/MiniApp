import { AuthService } from './../_services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
 model: any = {};
  constructor(private authService:AuthService) { }

  ngOnInit() {
  }

login(){

 this.authService.login(this.model).subscribe(data => {

console.log ("log success");

 }, error => {
   console.log ( "failed to login");
 })
}


logout(){
 this.authService.userToken = null;
 localStorage.removeItem('token');
 console.log('logged out');

}

loggedIn(){
const token = localStorage.getItem('token');
return !!token;
}
}
