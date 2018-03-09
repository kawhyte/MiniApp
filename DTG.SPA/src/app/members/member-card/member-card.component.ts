import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material";
import { MatSnackBarRef, SimpleSnackBar } from "@angular/material";
import { UserService } from "./../../_services/User.service";
import { AuthService } from "./../../_services/auth.service";
import { Input } from "@angular/core";
import { Component, OnInit } from "@angular/core";
import { User } from "../../_models/User";
import { AlertifyService } from "../../_services/alertify.service";
import { Contact } from "../../_models/Contact";

@Component({
  selector: "app-member-card",
  templateUrl: "./member-card.component.html",
  styleUrls: ["./member-card.component.css"]
})
export class MemberCardComponent implements OnInit {
  @Input() user: User;
  @Input() contact: Contact[];
  email: string;
  telephoneNumber: string;
  extension: string;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private alertify: AlertifyService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit() {
    this.email = this.user.contact[0].email;
    this.telephoneNumber = this.user.contact[0].telephoneNumber;
    this.extension = this.user.contact[0].extension;
  }

  sendLike(id: number) {
    this.userService
      .sendLike(this.authService.decodedToken.nameid, id)
      .subscribe(
        data => {
          this.openSnackBar(
            this.user.knownAs + " photo added to you favorite",
            "Navigate to your favorite list"
          )
            .onAction()
            .subscribe(() => {
              this.router.navigate(["/list"]);
            });
          //this.alertify.success('You have liked ' + this.user.knownAs);
        },
        error => {
          this.openSnackBar(
            this.user.knownAs + " was alredy added to you favorite",
            "Navigate to your favorite list"
          );
          //  .onAction().subscribe(() => {
          // this.router.navigate(['/list'])},
        }
      );
  }

  openSnackBar(
    message: string,
    action: string
  ): MatSnackBarRef<SimpleSnackBar> {
    return this.snackBar.open(message, action, {
      duration: 5000
    });
  }
}
