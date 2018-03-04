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
    { name: 'Mike', status: 'online', lastMessage: 'Yo!' },
    { name: 'Joe', status: 'busy', lastMessage: 'Noob!' },
    { name: 'Simon', status: 'away', lastMessage: 'xD' },
    { name: 'Rico', status: 'offline', lastMessage: 'Y THO?!?' },
    { name: 'Larry', status: 'offline', lastMessage: 'be mad' },
    { name: 'Michael van den Ozturkalizomenjovic', status: 'offline', lastMessage: 'Look at mah walletz brah, they be going places' },
    { name: 'Andy', status: 'offline', lastMessage: '' },
    { name: 'Mory', status: 'offline', lastMessage: '' },
    { name: 'John', status: 'offline', lastMessage: '' },
    { name: 'Sylvia', status: 'offline', lastMessage: '' },
    { name: 'Mick', status: 'offline', lastMessage: '' },
    { name: 'Starman', status: 'offline', lastMessage: '' },
    { name: 'Elon', status: 'offline', lastMessage: '' },
    { name: 'Jess', status: 'offline', lastMessage: '' },
    { name: 'Timothy', status: 'offline', lastMessage: '' }
  ];
  pinned = this.friends.slice(2,4);

  constructor(private auth: AuthService) { }

  ngOnInit() {
  }
  onFriendClick(friend){
    console.log('friend clicked! ', friend)
  }
}
