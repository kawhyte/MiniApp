import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { AlertifyService } from '../_services/alertify.service';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { User } from '../_models/user';

@Component({
  selector: 'app-register-dialog',
  templateUrl: './register-dialog.component.html',
  styleUrls: ['./register-dialog.component.css']
})
export class RegisterDialogComponent implements OnInit {
  user: User;
  hide = true;
  hideConfirm = true;
  model: any = {};
  registerForm: FormGroup;
  constructor(private dialogRef: MatDialogRef<RegisterDialogComponent>, 
    private authService: AuthService,
    private alertify: AlertifyService,
    private fb: FormBuilder,
    private router: Router) { }

  ngOnInit() {
    this.createRegisterForm();
  }

  createRegisterForm() {
    this.registerForm = this.fb.group(
      {
        gender: ["buyer"],
        username: ["", Validators.required],
        firstname: ["", Validators.required],
        lastname: ["", Validators.required],
        currentRole: ["", Validators.required],
        // knownAs: ["", Validators.required],
        // dateOfBirth: [null, Validators.required],
        dateOfEmployment: [null, Validators.required],
        // city: ["", Validators.required],
        // country: ["", Validators.required],
        password: [
          "",
          [
            Validators.required,
            Validators.minLength(4),
            Validators.maxLength(8)
          ]
        ],
        confirmPassword: ["", Validators.required]
      },
      { validator: this.passwordMatchValidator }
    );
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get("password").value == g.get("confirmPassword").value
      ? null
      : { mismatch: true };
  }

  register() {
    if (this.registerForm.valid) {
      this.user = Object.assign({}, this.registerForm.value);

      this.authService.register(this.user).subscribe(
        () => {
          this.alertify.success("registration success");
          this.dialogRef.close(null);
        },
        error => {
          this.alertify.error(error);
        },
        () => {
          this.authService.login(this.user).subscribe(() => {
            this.router.navigate(["/members"]);
            // this.router.navigate(["/members/edit"]); 
          });
        }
      );
    }

    //console.log(this.registerForm.value);
  }


  dismiss() {
    this.dialogRef.close(null);
  }

}
