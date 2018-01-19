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
  constructor(
    private authService: AuthService,
    private alertify: AlertifyService,
    private router: Router
  ) {}

  ngOnInit() {}

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
    localStorage.removeItem("token");
    this.alertify.message("Logged out successful");
  }

  loggedIn() {
    return this.authService.loggedIn();
  }
}
