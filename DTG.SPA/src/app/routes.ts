import { MemberEditResolver } from "./_resolvers/member-edit.resolver";
import { MemberDetailResolver } from "./_resolvers/member-detail.resolver";
import { AuthGuard } from "./_guards/auth.guard";
import { ListComponent } from "./list/list.component";
import { MessagesComponent } from "./messages/messages.component";
import { MemberListComponent } from "./members/member-list/member-list.component";
import { HomeComponent } from "./home/home.component";

import { Routes } from "@angular/router";
import { MemberDetailComponent } from "./members/member-detail/member-detail.component";
import { MemberListResolver } from "./_resolvers/member-list.resolver";
import { MemberEditComponent } from "./members/member-edit/member-edit.component";
import { PreventUnsavedChanges } from "./_guards/prevent-unsaved-changes.guards";
import { ListsResolver } from "./_resolvers/lists.resolver";
import { MessagesResolver } from "./_resolvers/message.resolver";
import { VehicleFormComponent } from "./vehicle-form/vehicle-form.component";



// export const appRoutes: Routes = [
//   { path: '', redirectTo: 'home', pathMatch: 'full'},
//   { path: 'home', component: HomeComponent},
//   {
//       path: '',
//       runGuardsAndResolvers: 'always',
//       canActivate: [AuthGuard],
//       children: [
//           { path: 'members', component: MemberListComponent, resolve: {users: MemberListResolver} },
//           { path: 'members/:id', component: MemberDetailComponent, resolve: {user: MemberDetailResolver} },
//           { path: 'member/edit', component: MemberEditComponent,
//               resolve: {user: MemberEditResolver}, canDeactivate: [PreventUnsavedChanges] },
//           { path: 'messages', component: MessagesComponent, resolve: {messages: MessagesResolver}},
//           { path: 'list', component: ListComponent, resolve: {users: ListsResolver}},
//       ]
//   },
//   { path: '**', redirectTo: 'home', pathMatch: 'full'},
// ];

export const appRoutes: Routes = [
  { path: "home", component: HomeComponent },

  { path: "vehicles/new", component: VehicleFormComponent },
  


  {
    path: "",
    runGuardsAndResolvers: "always",
    canActivate: [AuthGuard],
    children: [
      {
        path: "members",
        component: MemberListComponent,
        resolve: { users: MemberListResolver }
      },
      {
        path: "members/:id",
        component: MemberDetailComponent,
        resolve: { user: MemberDetailResolver }
      },
      {
        path: "member/edit",
        component: MemberEditComponent,
        resolve: { user: MemberEditResolver },
        canDeactivate: [PreventUnsavedChanges]
      },
      { path: 'messages', component: MessagesComponent, resolve: {messages: MessagesResolver}},
      { path: "list", component: ListComponent, resolve:{users: ListsResolver} }
    ]
  },

  { path: "**", redirectTo: "home", pathMatch: "full" }
];
