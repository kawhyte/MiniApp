import { Observable } from "rxjs/Rx";
import { AlertifyService } from "./../_services/alertify.service";
import { UserService } from "./../_services/User.service";
import { User } from "../_models/User";
import { Injectable } from "@angular/core";
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  Router,
  Resolve
} from "@angular/router";
import 'rxjs/add/operator/catch';

@Injectable()
export class MemberListResolver implements Resolve<User[]> {

  pageSize = 10;
 pageNumber = 1;

  constructor(
    private userService: UserService,
    private router: Router,
    private alertify: AlertifyService
  ) { }

  resolve(route: ActivatedRouteSnapshot): Observable<User[]> {
    return this.userService.getUsers(this.pageNumber, this.pageSize).catch(error => {
      this.alertify.error("Problem accessing data");
      this.router.navigate(["/members"]);

      return Observable.of(null);
    });
  }
}
