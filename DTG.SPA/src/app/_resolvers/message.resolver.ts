import { AuthService } from "../_services/auth.service";
import { Message } from "../_models/message";
import { Observable } from "rxjs/Rx";
import { AlertifyService } from "../_services/alertify.service";
import { UserService } from "../_services/User.service";
import { User } from "../_models/User";
import { Injectable } from "@angular/core";
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  Router,
  Resolve
} from "@angular/router";
import "rxjs/add/operator/catch";

@Injectable()
export class MessagesResolver implements Resolve<Message[]> {
  pageSize = 5;
  pageNumber = 1;
  messageContainer = "Unread";

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router,
    private alertify: AlertifyService
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Message[]> {
    return this.userService
      .getMessages(
        this.authService.decodedToken.nameid,
        this.pageNumber,
        this.pageSize,
        this.messageContainer
      )
      .catch(error => {
        this.alertify.error("Problem accessing data");
        this.router.navigate(["/home"]);

        return Observable.of(null);
      });
  }
}
