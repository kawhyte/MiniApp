import { FlexLayoutModule } from '@angular/flex-layout';
import { Pagination, PaginatedResult } from "./../../_models/Pagination";
import { ActivatedRoute } from "@angular/router";
import { Router } from "@angular/router";
import { AlertifyService } from "./../../_services/alertify.service";
import { UserService } from "./../../_services/User.service";
import { Component, OnInit, NgZone } from "@angular/core";
import { User } from "../../_models/User";

const SMALL_WIDTH_BREAKPOINT = 720;

@Component({
  selector: "app-member-list",
  templateUrl: "./member-list.component.html",
  styleUrls: ["./member-list.component.css"]
})
export class MemberListComponent implements OnInit {
  users: User[];
  user: User = JSON.parse(localStorage.getItem('user'));
  genderList = [{value: 'male', display: 'Males'}, {value: 'female', display: 'Females'}];
  userParams: any = {};
  pagination: Pagination;

  private mediaMatcher: MediaQueryList =
    matchMedia(`(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`);

  constructor( zone: NgZone,
    private userService: UserService,
    private alertify: AlertifyService,
    private route: ActivatedRoute
  ) {

    this.mediaMatcher.addListener(mql => 
      zone.run(() => this.mediaMatcher = mql));
  }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.users = data["users"].result;
      this.pagination = data["users"].pagination;
    });

    //this.userParams.gender = this.user.gender === 'female' ? 'male' : 'female';
    this.userParams.minAge = 18;
    this.userParams.maxAge = 99;
    this.userParams.orderBy = 'lastActive';
   
  }

  loadUsers() {
    this.userService
      .getUsers(this.pagination.currentPage, this.pagination.itemsPerPage, this.userParams)
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


  resetFilters() {
    // this.userParams.gender = this.user.gender === 'female' ? 'male' : 'female';
    this.userParams.minAge = 18;
    this.userParams.maxAge = 99;
    this.loadUsers();
  }


  pageChanged(event: any): void {
   this.pagination.currentPage = event.page;
   this.loadUsers(); 
  }

  isScreenSmall(): boolean {
    return this.mediaMatcher.matches;
  }

  //   loadusers(){

  //     this.userService.getUsers().subscribe((users:User[]) =>{
  //     this.users = users;
  //   }, error => {
  //  this.alertify.error(error);

  //   });
  //   }
}
