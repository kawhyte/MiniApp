import { Component, OnInit, Input } from "@angular/core";
import { User } from "../../_models/User";
import { UserService } from "../../_services/User.service";
import { AlertifyService } from "../../_services/alertify.service";
import { ActivatedRoute } from "@angular/router";
import { NgxGalleryOptions, NgxGalleryAnimation } from "ngx-gallery";
import { NgxGalleryImage } from "ngx-gallery";
import { TabsetComponent } from "ngx-bootstrap";
import { ViewChild } from "@angular/core";
import { Contact } from "../../_models/Contact";


@Component({
  selector: "app-member-detail",
  templateUrl: "./member-detail.component.html",
  styleUrls: ["./member-detail.component.css"]
})
export class MemberDetailComponent implements OnInit {
  @ViewChild("memberTabs") memberTabs: TabsetComponent;
  user: User;
  @Input() contact: Contact;
  email: string;
  telephoneNumber: string;
  extension: string;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  constructor(
    private userService: UserService,
    private alertify: AlertifyService,
    private route: ActivatedRoute
  ) {

    //this.messages = [];
   // this.messages = [{id: 1, email: "k@d.com", telephoneNumber: 'text', extension: 'Hallo Welt!', cellular:"123456"}];

  }

  ngOnInit() {
    //this.messages = [{id: 1, email: "k@d.com", telephoneNumber: 'text', extension: 'Hallo Welt!', cellular:"123456"}];
   // let contact = [{email: this.user.contact[0].email}];
   // this.email = this.contact.email;
    // this.telephoneNumber = this.user.contact[0].telephoneNumber;
    // this.extension = this.user.contact[0].extension;
    this.route.data.subscribe(data => {
      this.user = data["user"];
    });

    this.route.queryParams.subscribe(params => {

      const selectTab =  params['tab'];
      this.memberTabs.tabs[selectTab> 0 ? selectTab: 0].active = true;
    });

    this.galleryOptions = [
      {
        width: "500px",
        height: "500px",
        imagePercent: 100,
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Fade,
        preview: false
      }
    ];
    this.galleryImages = this.getImages();

    
  }

  getImages() {
    const imageUrls = [];

    for (let i = 0; i < this.user.photos.length; i++) {
      imageUrls.push({
        small: this.user.photos[i].url,
        medium: this.user.photos[i].url,
        big: this.user.photos[i].url,
        description: this.user.photos[i].description
      });
    }

    return imageUrls;
  }

  selectTab(tabId: number) {
    this.memberTabs.tabs[tabId].active = true;
  }
  // loaduser() {
  //   this.userService.getUser(+this.route.snapshot.params["id"]).subscribe(
  //     (user: User) => {
  //       this.user = user;
  //     },
  //     error => {
  //       this.alertify.error(error);
  //     }
  //   );
  // }
}
