import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from './_services/auth.service';
import { Component, OnInit } from '@angular/core';
import { User } from './_models/User';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{


  constructor(private authService:AuthService, private jwtHelperService: JwtHelperService){}


  ngOnInit() {
   const token = localStorage.getItem('token');
   const user: User = JSON.parse(localStorage.getItem('user'));
   if(token){
     this.authService.decodedToken = this.jwtHelperService.decodeToken(token);
   }

   if (user){
    this.authService.currentUser = user;
    if(this.authService.currentUser.photoUrl !==null){
      this.authService.changeMemeberPhoto(user.photoUrl);
    }
    else{

      this.authService.changeMemeberPhoto('../assets/user.png')
    }
   }
  }
}
