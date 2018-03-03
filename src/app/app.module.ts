// angular
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

// 3rd party
import { AngularFirestoreModule } from "angularfire2/firestore";
import { AngularFireStorageModule } from "angularfire2/storage";
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { AngularFireAuthModule } from "angularfire2/auth";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularFireModule } from "angularfire2";

// modules
import { MaterialModule } from "@modules/material.module";

// root
import { FIREBASE_CONFIG } from "./app.firebase.config";
import { ROUTER_CONFIG } from './app.router.config';
import { AppComponent } from './app.component';

// pages
import { PageNotFoundComponent } from '@pages/page-not-found/page-not-found.component';
import { SettingsComponent } from '@pages/settings/settings.component';
import { ProfileComponent } from '@pages/profile/profile.component';
import { LoginComponent } from '@pages/login/login.component';
import { HomeComponent } from '@pages/home/home.component';

// components
import { DialogEditPictureComponent } from '@pages/settings/profile/dialog-edit-picture/dialog-edit-picture.component';
import { PersonalizeSettingsComponent } from '@pages/settings/personalize/personalize.component';
import { SidebarFriendsComponent } from '@components/sidebar-friends/sidebar-friends.component';
import { NavigationSettingsComponent } from '@pages/settings/navigation/navigation.component';
import { ToastMessagesComponent } from '@components/toast-messages/toast-messages.component';
import { InterestsSettingsComponent } from '@pages/settings/interests/interests.component';
import { SecuritySettingsComponent } from '@pages/settings/security/security.component';
import { HomepageSettingsComponent } from '@pages/settings/homepage/homepage.component';
import { ProfileSettingsComponent } from "@pages/settings/profile/profile.component";
import { AnalyzeSettingsComponent } from '@pages/settings/analyze/analyze.component';
import { DashboardComponent } from '@pages/home/dashboard/dashboard.component';
import { LandingComponent } from '@pages/home/landing/landing.component';
import { SidebarComponent } from '@components/sidebar/sidebar.component';
import { NavbarComponent } from '@components/navbar/navbar.component';
import { FooterComponent } from '@components/footer/footer.component';

// services
import { FireStoreService } from "@services/fire-store.service";
import { FireAuthService } from "@services/fire-auth.service";
import { ToastService } from "@services/toast.service";
import { AuthService } from "@services/auth.service";
import { UserService } from "@services/user.service";

// guards
import { AdminGuard } from "@guards/admin.guard";
import { AuthGuard } from "@guards/auth.guard";

// directives
import { DropZoneDirective } from '@directives/drop-zone.directive';

//pipes
import { OrderByDatePipe } from '@pipes/order-by-date.pipe';
import { ReversePipe } from "@pipes/reverse.pipe";

//idunno
import { CommonModule } from "@angular/common";
import {UiService} from "@services/ui.service";
import { NavItemsComponent } from './components/navbar/nav-items/nav-items.component';


@NgModule({
  declarations: [
    // root
    AppComponent,

    // pages
    PageNotFoundComponent,
    SettingsComponent,
    ProfileComponent,
    LoginComponent,
    HomeComponent,

    // components
    PersonalizeSettingsComponent,
    NavigationSettingsComponent,
    InterestsSettingsComponent,
    DialogEditPictureComponent,
    SecuritySettingsComponent,
    HomepageSettingsComponent,
    AnalyzeSettingsComponent,
    ProfileSettingsComponent,
    SidebarFriendsComponent,
    ToastMessagesComponent,
    DashboardComponent,
    LandingComponent,
    SidebarComponent,
    NavbarComponent,
    FooterComponent,

    // directives
    DropZoneDirective,

    // pipes
    OrderByDatePipe,
    ReversePipe,
    NavItemsComponent
  ],
  imports: [
    //CommonModule,
    BrowserModule,                                    // default
    BrowserAnimationsModule,                          // @angular animations (dependency for @angular/material)
    RouterModule.forRoot(ROUTER_CONFIG),              // initialize routes (with the config file)
    ReactiveFormsModule,                              // for creating forms in typescript
    FormsModule,                                      // for automatically associating forms by angular (template-driven) (dependency for @angular/material)
    HttpClientModule,                                 /** ?? replaces the HttpModule COMPLETELY since angular 5 ?? */
    NgbModule.forRoot(),                              // Bootstrap JS-functionality (managed by angular so no DOM manipulation/ no jQuery/ no popper.js) sadly.. no animations
    AngularFireModule.initializeApp(FIREBASE_CONFIG), // imports firebase/app needed for everything
    AngularFirestoreModule.enablePersistence(),       // imports firebase/firestore, only needed for database features
    AngularFireAuthModule,                            // imports firebase/auth, only needed for auth features,
    AngularFireStorageModule,                         // imports firebase/storage only needed for storage features
    MaterialModule,                                   // angular material imports
    AngularFontAwesomeModule,                         // iconzzzzzz
  ],
  entryComponents: [
    DialogEditPictureComponent
  ],
  providers: [
    // services
    FireAuthService,
    FireStoreService,
    ToastService,
    AuthService,
    UserService,
    UiService,

    // guards
    AuthGuard,
    AdminGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
