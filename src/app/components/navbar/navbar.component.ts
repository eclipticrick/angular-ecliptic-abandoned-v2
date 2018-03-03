import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { AuthService } from "@services/auth.service";
import { UiService } from "@services/ui.service";
import {ToastService} from "@services/toast.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, AfterViewInit {
  @ViewChild('navbar', { read: ElementRef }) navbar: ElementRef;
  navbarWidth:number;

  constructor(private auth: AuthService, private ui: UiService, private toast: ToastService) {  }

  ngOnInit() {  }

  ngAfterViewInit() {
    // stupid fix for expression changed after it has been checked error:
    setTimeout(this.updateNavbarWidth.bind(this), 0)
  }

  onSignOut() {
    this.auth.signOut();
  }

  updateNavbarWidth() {
    this.navbarWidth = this.navbar.nativeElement.offsetWidth;
  }

  onTestPopUps() {
    this.toast.info('Test info Message!');
    this.toast.success('Test success Message!');
    this.toast.warning('Test warning Message!');
    this.toast.danger('Test danger Message!');
    this.toast.primary('Test primary Message!');
    this.toast.secondary('Test secundary Message!');
    this.toast.light('Test light Message!');
    this.toast.dark('Test dark Message!');
  }

  // 350ms is how long opening the friends-sidebar takes
  updateNavbarWidthMultipleTimes() {
    for(let ms = 0; ms <= 350; ms += 50)
      setTimeout(this.updateNavbarWidth.bind(this), ms);
  }

  @HostListener('window:resize', ['$event.target']) onResize() {
    this.updateNavbarWidth()
  }

}
