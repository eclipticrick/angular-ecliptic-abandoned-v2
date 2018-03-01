import {Component, OnInit} from '@angular/core';
import { ToastService } from "@services/toast.service";
import {AuthService} from "@services/auth.service";
import {Observable} from "rxjs";
import {ToastMessage} from "@models/toast-message";
import {ToastService} from "@services/toast.service";

@Component({
  selector: 'app-toast-messages',
  templateUrl: './toast-messages.component.html',
  styleUrls: ['./toast-messages.component.scss']
})
export class ToastMessagesComponent implements OnInit {

  messages$: Observable<ToastMessage[]>;
  sessionMessages$: Observable<ToastMessage[]>;

  constructor(private auth: AuthService, private toast: ToastService) { }

  ngOnInit() {
    this.messages$ = this.toast.messages$;
    this.sessionMessages$ = this.toast.localMessages$;

    // this.messages$.subscribe(messages => {
    //   console.log('messages$ retrieved!: ', messages)
    // })
  }
  removeUserMessage(user, message){
    this.toast.removeUserMessage(user, message.$id)
  }
  removeLocalMessage(message){
    this.toast.removeSessionMessage(message.date)
  }
}
