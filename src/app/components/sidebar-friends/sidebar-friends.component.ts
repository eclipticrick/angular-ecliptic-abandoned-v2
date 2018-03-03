import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {AuthService} from "@services/auth.service";

@Component({
  selector: 'app-sidebar-friends',
  templateUrl: './sidebar-friends.component.html',
  styleUrls: ['./sidebar-friends.component.scss']
})
export class SidebarFriendsComponent implements OnInit {

  status = 'online';

  //temp
  friends = [
    { name: 'mike', status: 'online', lastMessage: 'Yo!' },
    { name: 'joe', status: 'busy', lastMessage: 'Noob!' },
    { name: 'simon', status: 'away', lastMessage: 'xD' },
    { name: 'rico', status: 'offline', lastMessage: 'Y THO?!?' },
    { name: 'larry', status: 'offline', lastMessage: 'be mad' }
  ];
  pinned = this.friends.slice(2,4);

  constructor(private auth: AuthService) { }

  ngOnInit() {
  }
  onFriendClick(friend){
    console.log('friend clicked! ', friend)
  }
}
