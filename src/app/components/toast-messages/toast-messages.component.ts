import {Component, OnInit} from '@angular/core';
import { FireToastService } from "@services/fire-toast.service";
import {AuthService} from "@services/auth.service";
import {Observable} from "rxjs";
import {ToastMessage} from "@models/toast-message";

@Component({
  selector: 'app-toast-messages',
  templateUrl: './toast-messages.component.html',
  styleUrls: ['./toast-messages.component.scss']
})
export class ToastMessagesComponent implements OnInit {

  messages$: Observable<ToastMessage[]>;

  constructor(private auth: AuthService, private toast: FireToastService) { }

  ngOnInit() {
    this.messages$ = this.toast.messages$;
    // this.messages$.subscribe(messages => {
    //   console.log('messages$ retrieved!: ', messages)
    // })
  }
  removeUserMessage(user, message){
    this.toast.removeUserMessage(user, message.$id)
  }
  removeLocalMessage(message){
    this.toast.removeLocalMessage(message.date)
  }
}
