import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { AuthService } from "@services/auth.service";
import { UiService } from "@services/ui.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, AfterViewInit {
  @ViewChild('navbar', { read: ElementRef }) navbar: ElementRef;
  navbarWidth:number;

  constructor(private auth: AuthService, private ui: UiService) {  }

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


  // 350ms is how long opening the friends-sidebar takes
  updateNavbarWidthMultipleTimes() {
    for(let ms = 0; ms <= 350; ms += 50)
      setTimeout(this.updateNavbarWidth.bind(this), ms);
  }

  @HostListener('window:resize', ['$event.target']) onResize() {
    this.updateNavbarWidth()
  }

}
