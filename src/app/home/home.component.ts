import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Room } from '../common/room';
import { RoomService } from '../_services/room.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  currentUser: any;
  rooms: Room[];
  isLoggedIn = false;

  constructor(
    private token: TokenStorageService,
    private roomService: RoomService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = !!this.token.getToken();
    this.currentUser = this.token.getUser();
    this.getUserRooms(this.currentUser.id);
  }

  getUserRooms(userId) {
    this.roomService.getRoom(userId).subscribe((data) => {
      this.rooms = data;
    });
  }

  addRoom() {
    this.router.navigate(['addroom']);
  }

  logout(): void {
    this.token.signOut();
    window.location.reload();
  }
}
