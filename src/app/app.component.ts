import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { routeAnimation } from "./app.animations";
import { UiService } from "@services/ui.service";
// import { FormBuilder, FormGroup } from "@angular/forms";
// import {FireStoreService} from "@services/fire-store.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    routeAnimation
  ]
})
export class AppComponent implements AfterViewInit, OnInit, OnDestroy{
  @ViewChild('sidebarLeft') sidebarLeft;
  @ViewChild('sidebarRight') sidebarRight;
  sidebarLeftState:boolean = false;
  sidebarRightState:boolean = false;

  constructor(private ui: UiService) { }
  ngOnInit() {
    this.ui.sidebarLeftState$.subscribe(bool => {
      console.log('sidebarLeftState$', bool);
      this.sidebarLeftState = bool;
    });
    this.ui.sidebarRightState$.subscribe(bool => {
      console.log('sidebarRightState$', bool);
      this.sidebarRightState = bool;
    })
  }
  getComponentDepth(outlet) {
    return outlet.activatedRouteData['depth'];
  }

  ngAfterViewInit() {
    this.sidebarLeft.openedChange.subscribe(state => {
      if(state) this.ui.openSidebarLeft();
      else      this.ui.closeSidebarLeft();
    });
    this.sidebarRight.openedChange.subscribe(state => {
      if(state) this.ui.openSidebarRight();
      else      this.ui.closeSidebarRight();
    })
  }

  ngOnDestroy() {
    this.sidebarLeft.onPositionChanged.unsubscribe();
    this.sidebarRight.onPositionChanged.unsubscribe();
  }
}
