import {Component, ElementRef, OnInit} from '@angular/core';
import { FireToastService } from "@services/fire-toast.service";
import {AuthService} from "@services/auth.service";

@Component({
  selector: 'app-toast-messages',
  templateUrl: './toast-messages.component.html',
  styleUrls: ['./toast-messages.component.scss']
})
export class ToastMessagesComponent implements OnInit {

  $messages: any;

  constructor(private auth: AuthService, private toast: FireToastService) { }

  ngOnInit() {
    this.$messages = this.toast.getMessages()
    this.auth.user$.subscribe(user => this.$messages = this.toast.getMessages(user))
    this.$messages.subscribe(m => {
      console.log('DERP')
      console.log(m)
    })
    //this.$messages.subscribe(list => {
    //  console.log('GET')
    //  console.log(list[0])
    //  console.log(list[0].payload.doc)
    //  console.log(list[0].payload.doc.id)
    //  console.log(list[0].payload.doc.ref)
    //});
    //console.log('here2')
  }
  dismissUserMessage(user, messageKey){
    console.log('dismiss(messageKey) clicked: ', messageKey);
    this.toast.dismissUserMessage(user, messageKey)
  }


  addUserMessage(user, style, content) {
    this.toast.saveUserMessage(user, style, content)
      .then(__=>{ console.log('TOAST TEST success!',__) })
      .catch(e=>{ console.log('TOAST TEST failure!', e) })
  }
  addLocalMessage(style, content) {
    this.toast.saveLocalMessage(style, content);
  }
}
