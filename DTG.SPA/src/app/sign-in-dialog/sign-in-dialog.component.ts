import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { AuthService } from "../_services/auth.service";
import { AlertifyService } from "../_services/alertify.service";
import { MatDialogRef, MatSnackBarRef, SimpleSnackBar, MatSnackBar } from "@angular/material";
import { FormControl, Validators } from "@angular/forms";

@Component({
  selector: "app-sign-in-dialog",
  templateUrl: "./sign-in-dialog.component.html",
  styleUrls: ["./sign-in-dialog.component.css"]
})
export class SignInDialogComponent implements OnInit {
  hide = true;
  model: any = {};
  constructor(
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<SignInDialogComponent>,
    public authService: AuthService,
    private alertify: AlertifyService,
    private router: Router
  ) // private dialog: MatDialog
  {}


  name = new FormControl('', [Validators.required]);

  getErrorMessage() {
    return this.name.hasError('required') ? 'You must enter a value' : '';
  }


  ngOnInit() {}

  login() {
    this.authService.login(this.model).subscribe(
      data => {
      // this.alertify.success("Login successful");
        this.dialogRef.close(true);
      },
      error => {
        this.alertify.error("Int credential provided"); 
      },
      () => {
        this.router.navigate(["/members"]);
      }
    );
  }

  dismiss() {
    this.dialogRef.close(null);
  }
}