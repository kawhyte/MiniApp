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
export class MemberDetailResolver implements Resolve<User> {
  constructor(
    private userService: UserService,
    private router: Router,
    private alertify: AlertifyService
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<User> {
    return this.userService.getUser(route.params["id"]).catch(error => {
      this.alertify.error("Problem accessing data");
      this.router.navigate(["/members"]);

      return Observable.of(null);
    });
  }
}
