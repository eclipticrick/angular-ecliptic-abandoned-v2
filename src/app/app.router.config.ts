import  { Route } from '@angular/router';
import { AuthGuard } from "@guards/auth.guard";
import { PageNotFoundComponent } from "@pages/page-not-found/page-not-found.component";
import { HomeComponent } from "@pages/home/home.component";
import { LoginComponent } from "@pages/login/login.component";
import { ProfileComponent } from "@pages/profile/profile.component";
import { SecuritySettingsComponent } from "@pages/settings/security/security.component";
import { SettingsComponent } from "@pages/settings/settings.component";
import { InterestsSettingsComponent } from "@pages/settings/interests/interests.component";
import { HomepageSettingsComponent } from "@pages/settings/homepage/homepage.component";
import { NavigationSettingsComponent } from "@pages/settings/navigation/navigation.component";
import { AnalyzeSettingsComponent } from "@pages/settings/analyze/analyze.component";
import { PersonalizeSettingsComponent } from "@pages/settings/personalize/personalize.component";
import { ProfileSettingsComponent } from "@pages/settings/profile/profile.component";

export const ROUTER_CONFIG: Route[] = [
  {
    path: '',
    component: HomeComponent,
    data: { depth: 1 }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: { depth: 2 },
    //TODO: canActivate: [ GuestGuard ],
  },
  {
    path: 'profile',
    redirectTo: '404',
    pathMatch: 'full',
    data: { depth: 3 }
  },
  {
    path: 'profile/:id',
    component: ProfileComponent,
    data: { depth: 2 }
  },
  {
    path: 'settings',
    component: SettingsComponent,
    data: { depth: 4 },
    canActivate: [ AuthGuard ],
    children: [
      { path: '', redirectTo: 'personalize', pathMatch: 'full' },
      { path: 'personalize', component: PersonalizeSettingsComponent },
      { path: 'profile', component: ProfileSettingsComponent },
      { path: 'security', component: SecuritySettingsComponent },
      { path: 'interests', component: InterestsSettingsComponent },
      { path: 'homepage', component: HomepageSettingsComponent },
      { path: 'navigation', component: NavigationSettingsComponent },
      { path: 'analyze', component: AnalyzeSettingsComponent }
    ]
  },
  { path: '404', component: PageNotFoundComponent },
  { path: '**', redirectTo: '404', pathMatch: 'full' }

  // , canActivate: [AuthGuard]
];





