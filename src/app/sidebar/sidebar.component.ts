import { Component, OnInit } from '@angular/core';
import { Room } from '../common/room';
import { RoomService } from '../_services/room.service';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  currentUser: any;
  rooms: Room[];

  constructor(private token: TokenStorageService, private roomService: RoomService) { }

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    this.getUserRooms(this.currentUser.id);
  }

  getUserRooms(userId){
       this.roomService.getRoom(userId).subscribe(
      data => {
        this.rooms = data;
      }
    );
  }

  logout(): void {
    this.token.signOut();
    window.location.reload();
  }

}
