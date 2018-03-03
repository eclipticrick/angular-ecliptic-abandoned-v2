import {EventEmitter, Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";

// @Injectable()
export class UiService {
  sidebarLeftState:boolean = false;
  sidebarRightState:boolean = false;

  sidebarLeftState$:  BehaviorSubject<boolean> = new BehaviorSubject(this.sidebarLeftState);
  sidebarRightState$: BehaviorSubject<boolean> = new BehaviorSubject(this.sidebarRightState);

  constructor() {  }

  toggleSidebarLeft()  { this.setSidebar('left',  !this.sidebarLeftState ) }
  toggleSidebarRight() { this.setSidebar('right', !this.sidebarRightState) }
  openSidebarLeft()    { this.setSidebar('left',  true ) }
  openSidebarRight()   { this.setSidebar('right', true ) }
  closeSidebarLeft()   { this.setSidebar('left',  false) }
  closeSidebarRight()  { this.setSidebar('right', false) }

  private setSidebar(side:string, state:boolean){
    if(side === 'left') {
      if(this.sidebarLeftState !== state){
        this.sidebarLeftState$.next(state);
        this.sidebarLeftState = state;
      }
    }
    if(side === 'right') {
      if(this.sidebarRightState !== state){
        this.sidebarRightState$.next(state);
        this.sidebarRightState = state;
      }
    }
  }
}
