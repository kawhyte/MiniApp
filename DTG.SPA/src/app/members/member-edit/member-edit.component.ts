import { Component, OnInit } from '@angular/core';
import { UserService } from '../../_services/User.service';
import { AlertifyService } from '../../_services/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../_models/User';
import { ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {
  user: User;
  @ViewChild('editForm') editForm: NgForm;
  
  constructor(
    private userService: UserService,
    private alertify: AlertifyService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {

    this.route.data.subscribe(data => {
      this.user = data["user"];
    });
  }

  updateUser(){
    console.log(this.user);
    this.alertify.success("Profile Updated!");
    this.editForm.reset(this.user);
  }
}