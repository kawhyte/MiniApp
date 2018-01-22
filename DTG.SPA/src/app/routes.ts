import { AuthGuard } from "./_guards/auth.guard";
import { ListComponent } from "./list/list.component";
import { MessagesComponent } from "./messages/messages.component";
import { MemberListComponent } from "./members/member-list/member-list.component";
import { HomeComponent } from "./home/home.component";
import { Routes } from "@angular/router";
import { MemberDetailComponent } from "./members/member-detail/member-detail.component";

export const appRoutes: Routes = [
  { path: "home", component: HomeComponent },

  {
    path: "",
    runGuardsAndResolvers: "always",
    canActivate: [AuthGuard],
    children: [
      { path: "members", component: MemberListComponent },
      { path: "members/:id", component: MemberDetailComponent },
      { path: "messages", component: MessagesComponent },
      { path: "list", component: ListComponent }
    ]
  },

  { path: "**", redirectTo: "home", pathMatch: "full" }
];
