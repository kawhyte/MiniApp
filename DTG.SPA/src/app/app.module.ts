import { ErrorInterceptor } from './_services/error.interceptor';
import { MemberMessagesComponent } from './members/member-messages/member-messages.component';
import { ListsResolver } from './_resolvers/lists.resolver';
import { PhotoEditorComponent } from './members/photo-editor/photo-editor.component';
import { MemberEditComponent } from "./members/member-edit/member-edit.component";
import { NgxGalleryModule } from "ngx-gallery";
import { MemberListResolver } from "./_resolvers/member-list.resolver";
import { MemberDetailResolver } from "./_resolvers/member-detail.resolver";
import { MemberDetailComponent } from "./members/member-detail/member-detail.component";
import { MemberCardComponent } from "./members/member-card/member-card.component";
import { AuthGuard } from "./_guards/auth.guard";
import { appRoutes } from "./routes";
import { AlertifyService } from "./_services/alertify.service";
import { AuthService } from "./_services/auth.service";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpModule } from "@angular/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AppComponent } from "./app.component";
import { NavComponent } from "./nav/nav.component";
import { HomeComponent } from "./home/home.component";
import { RegisterComponent } from "./register/register.component";
import { BsDropdownModule, TabsModule, ButtonsModule } from "ngx-bootstrap";
import { MemberListComponent } from "./members/member-list/member-list.component";
import { ListComponent } from "./list/list.component";
import { MessagesComponent } from "./messages/messages.component";
import { RouterModule } from "@angular/router";
import { UserService } from "./_services/User.service";
import { MemberEditResolver } from "./_resolvers/member-edit.resolver";
import { PreventUnsavedChanges } from "./_guards/prevent-unsaved-changes.guards";
import { FileUploadModule } from 'ng2-file-upload';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
//import {TimeAgoPipe} from 'time-ago-pipe';
import { PaginationModule } from 'ngx-bootstrap/pagination/pagination.module';
import { MessagesResolver } from './_resolvers/message.resolver';
import { JwtModule } from '@auth0/angular-jwt';
import { HttpClientModule } from '@angular/common/http';
import { TimeAgoPipe } from './_pipes/time-ago-pipe';
export function getAccessToken(): string {
  return localStorage.getItem('token');
}

export const jwtConfig = {
  tokenGetter: getAccessToken,
  whiteListedDomains: ['localhost:5000']
};




@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    RegisterComponent,
    MemberListComponent,
    ListComponent,
    MessagesComponent,
    MemberCardComponent,
    MemberDetailComponent,
    MemberEditComponent,
    PhotoEditorComponent,
    TimeAgoPipe,
    MemberMessagesComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    BsDropdownModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    TabsModule.forRoot(),
    NgxGalleryModule,
    FileUploadModule,
    ReactiveFormsModule,
    BsDatepickerModule.forRoot(),
    PaginationModule.forRoot(),
    ButtonsModule.forRoot(),
    HttpClientModule,
    JwtModule.forRoot({
            config: jwtConfig
          })
  ],
  providers: [
    AuthService,
    AlertifyService,
    AuthGuard,
    UserService,
    MemberDetailResolver,
    MemberListResolver,
    MemberEditResolver,
    PreventUnsavedChanges,
    ListsResolver,
    MessagesResolver,
    ErrorInterceptor
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}


// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { HttpModule } from '@angular/http';
// import { BrowserModule } from '@angular/platform-browser';
// import { NgModule } from '@angular/core';
// import { NgxGalleryModule } from 'ngx-gallery';

// import { AppComponent } from './app.component';
// import { NavComponent } from './nav/nav.component';
// import { AuthService } from './_services/auth.service';
// import { HomeComponent } from './home/home.component';
// import { RegisterComponent } from './register/register.component';
// import { AlertifyService } from './_services/alertify.service';
// import { BsDropdownModule } from 'ngx-bootstrap';
// import { MemberListComponent } from './members/member-list/member-list.component';
// import { ListComponent } from "./list/list.component";
// import { MessagesComponent } from './messages/messages.component';
// import { RouterModule } from '@angular/router';
// import { appRoutes } from './routes';
// import { AuthGuard } from './_guards/auth.guard';
// import { UserService } from './_services/user.service';
// import { MemberCardComponent } from './members/member-card/member-card.component';
// import { MemberDetailComponent } from './members/member-detail/member-detail.component';
// import { TabsModule } from 'ngx-bootstrap/tabs/tabs.module';
// import { MemberDetailResolver } from './_resolvers/member-detail.resolver';
// import { MemberListResolver } from './_resolvers/member-list.resolver';
// import { MemberEditComponent } from './members/member-edit/member-edit.component';
// import { MemberEditResolver } from './_resolvers/member-edit.resolver';
// import { PreventUnsavedChanges } from "./_guards/prevent-unsaved-changes.guards";
// import { PhotoEditorComponent } from './members/photo-editor/photo-editor.component';
// import { FileUploadModule } from 'ng2-file-upload';
// import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
// import { PaginationModule } from 'ngx-bootstrap/pagination';
// import { ButtonsModule } from 'ngx-bootstrap/buttons/buttons.module';
// import { ListsResolver } from './_resolvers/lists.resolver';
// import { MessagesResolver } from './_resolvers/message.resolver';
// import { MemberMessagesComponent } from './members/member-messages/member-messages.component';
// import { JwtModule } from '@auth0/angular-jwt';
// import { HttpClientModule } from '@angular/common/http';
// import { ErrorInterceptorProvider } from './_services/error.interceptor';
// import { TimeAgoPipe } from './_pipes/time-ago-pipe';

// export function getAccessToken(): string {
//   return localStorage.getItem('token');
// }

// export const jwtConfig = {
//   tokenGetter: getAccessToken,
//   whiteListedDomains: ['localhost:5000']
// };

// @NgModule({
//   declarations: [
//     AppComponent,
//     NavComponent,
//     HomeComponent,
//     RegisterComponent,
//     MemberListComponent,
//     ListComponent,
//     MessagesComponent,
//     MemberCardComponent,
//     MemberDetailComponent,
//     MemberEditComponent,
//     PhotoEditorComponent,
//     TimeAgoPipe,
//     MemberMessagesComponent
// ],
//   imports: [
//     BrowserModule,
//     HttpModule,
//     FormsModule,
//     BsDropdownModule.forRoot(),
//     RouterModule.forRoot(appRoutes),
//     TabsModule.forRoot(),
//     NgxGalleryModule,
//     FileUploadModule,
//     ReactiveFormsModule,
//     BsDatepickerModule.forRoot(),
//     PaginationModule.forRoot(),
//     ButtonsModule.forRoot(),
//     HttpClientModule,
//     JwtModule.forRoot({
//       config: jwtConfig
//     })
//   ],
//   providers: [
//     AuthService,
//     AlertifyService,
//     AuthGuard,
//     UserService,
//     MemberDetailResolver,
//     MemberListResolver,
//     MemberEditResolver,
//     PreventUnsavedChanges,
//     ListsResolver,
//     MessagesResolver,
//     ErrorInterceptorProvider
//   ],
//   bootstrap: [AppComponent]
// })
// export class AppModule { }
