import { Pagination, PaginatedResult } from "./../../_models/Pagination";
import { ActivatedRoute } from "@angular/router";
import { Router } from "@angular/router";
import { AlertifyService } from "./../../_services/alertify.service";
import { UserService } from "./../../_services/User.service";
import { Component, OnInit } from "@angular/core";
import { User } from "../../_models/User";

@Component({
  selector: "app-member-list",
  templateUrl: "./member-list.component.html",
  styleUrls: ["./member-list.component.css"]
})
export class MemberListComponent implements OnInit {
  users: User[];
  pagination: Pagination;

  constructor(
    private userService: UserService,
    private alertify: AlertifyService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.users = data["users"].result;
      this.pagination = data["users"].pagination;
    });
  }

  loadUsers() {
    this.userService
      .getUsers(this.pagination.currentPage, this.pagination.itemsPerPage)
      .subscribe(
        (res: PaginatedResult<User[]>) => {
          this.users = res.result;
          this.pagination = res.pagination;
        },
        error => {
          this.alertify.error(error);
        }
      );
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
   this.loadUsers(); 
  }

  //   loadusers(){

  //     this.userService.getUsers().subscribe((users:User[]) =>{
  //     this.users = users;
  //   }, error => {
  //  this.alertify.error(error);

  //   });
  //   }
}
