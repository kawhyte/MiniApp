import { RouterModule, Router } from "@angular/router";
import { AlertifyService } from "./../_services/alertify.service";
import { AuthService } from "./../_services/auth.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-nav",
  templateUrl: "./nav.component.html",
  styleUrls: ["./nav.component.css"]
})
export class NavComponent implements OnInit {
  model: any = {};
  photoUrl: string;
  constructor(
    public authService: AuthService,
    private alertify: AlertifyService,
    private router: Router
  ) {}

  ngOnInit() {

    this.authService.currentPhotoUrl.subscribe(photoUrl => this.photoUrl = photoUrl);
  }

  login() {
    this.authService.login(this.model).subscribe(
      data => {
        this.alertify.success("Login successful");
      },
      error => {
        this.alertify.error("Incorrect credential provided");
      },
      () => {
        this.router.navigate(["/members"]);
      }
    );
  }

  logout() {
    this.authService.userToken = null;
    this.authService.currentUser = null;
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    this.alertify.message("Logged out");
    this.router.navigate(["/home"]);
  }

  loggedIn() {
    return this.authService.loggedIn();
  }
}
