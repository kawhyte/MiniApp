import { SignInDialogComponent } from "./../sign-in-dialog/sign-in-dialog.component";
import { RouterModule, Router } from "@angular/router";
import { AlertifyService } from "./../_services/alertify.service";
import { AuthService } from "./../_services/auth.service";
import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import {
  MatDialog,
  MatSnackBar,
  MatSnackBarRef,
  SimpleSnackBar
} from "@angular/material";
import { RegisterDialogComponent } from "../register-dialog/register-dialog.component";

@Component({
  selector: "app-nav",
  templateUrl: "./nav.component.html",
  styleUrls: ["./nav.component.css"]
})
export class NavComponent implements OnInit {
  hide = true;
  model: any = {};
  photoUrl: string;

  @Output() toggleSidenav = new EventEmitter<void>();

  constructor(
    public authService: AuthService,
    private alertify: AlertifyService,
    private router: Router,
    private dialog: MatDialog,
    private dialog2: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.authService.currentPhotUrl.subscribe(
      photoUrl => (this.photoUrl = photoUrl)
    );
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
        //this.router.navigate(["/members"]);
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

  openSignInDialog(): void {
    let dialogRef = this.dialog.open(SignInDialogComponent, {
      width: "450px",
      disableClose:true
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("dialog closed", result);
      if (result) {
        this.openSnackBar("Login successful","");
      }
      else{
        this.openSnackBar("Incorrect credential provided","");
      }
    });
  }


  openRegisterDialog(): void {
    let dialogRef2 = this.dialog2.open(RegisterDialogComponent, {
      disableClose:true,
      width: "450px"
     
    });

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
