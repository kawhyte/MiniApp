import { NgZone } from '@angular/core';
import { Component, OnInit } from '@angular/core';


const SMALL_WIDTH_BREAKPOINT = 720;
@Component({
  selector: 'app-mainmanager',
  templateUrl: './mainmanager.component.html',
  styleUrls: ['./mainmanager.component.css']
})
export class MainmanagerComponent implements OnInit {

  private mediaMatcher: MediaQueryList =
    matchMedia(`(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`);

  constructor( zone: NgZone) {

    this.mediaMatcher.addListener(mql => 
      zone.run(() => this.mediaMatcher = mql));
  }

  ngOnInit() {
  }

  isScreenSmall(): boolean {
    return this.mediaMatcher.matches;
  }

}
