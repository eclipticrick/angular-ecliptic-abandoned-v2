import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { AngularFirestoreCollection } from "angularfire2/firestore";
import { User } from "@models/user";
import { Observable } from "rxjs/Observable";
import { UserService } from "@services/user.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {
  private sub: any;
  id: string;

  user$: Observable<User>;

  constructor(private route: ActivatedRoute, private userSvc: UserService) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];

      this.user$ = this.userSvc.getUser(this.id);
    });

  }

  onCopy(){
    console.log('not implemented yet!')
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
