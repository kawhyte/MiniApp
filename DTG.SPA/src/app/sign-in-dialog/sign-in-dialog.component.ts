import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { AuthService } from "../_services/auth.service";
import { AlertifyService } from "../_services/alertify.service";
import { MatDialogRef, MatSnackBarRef, SimpleSnackBar, MatSnackBar } from "@angular/material";
import { FormControl, Validators, FormGroup, FormBuilder  } from "@angular/forms";

@Component({
  selector: "app-sign-in-dialog",
  templateUrl: "./sign-in-dialog.component.html",
  styleUrls: ["./sign-in-dialog.component.css"]
})
export class SignInDialogComponent implements OnInit {
  hide = true;
  model: any = {};
  signInForm: FormGroup;

  constructor(
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<SignInDialogComponent>,
    public authService: AuthService,
    private alertify: AlertifyService,
    private router: Router,
    private fb: FormBuilder
  ) 
  {}

  ngOnInit() {
    this.createSignInForm();
  }


  createSignInForm() {
    this.signInForm = this.fb.group(
      {
        username: ["", Validators.required],
        password: ["",Validators.required,]
        // confirmPassword: ["", Validators.required]
      }
      // { validator: this.passwordMatchValidator }
    );
  }








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
