import {AfterViewInit, Component, OnDestroy, ViewChild} from '@angular/core';
import { routeAnimation } from "./app.animations";
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
export class AppComponent implements AfterViewInit, OnDestroy{
  @ViewChild('sidenav') sidenav;

  constructor() { } /*private fsService: FireStoreService*/

  getComponentDepth(outlet) {
    return outlet.activatedRouteData['depth'];
  }

  ngAfterViewInit() {
    this.sidenav.openedChange.subscribe(state => {
      if(state) console.log('sidebar was opened');
      else      console.log('sidebar was closed');
    })
  }

  ngOnDestroy() {
    this.sidenav.onPositionChanged.unsubscribe()
  }
}
