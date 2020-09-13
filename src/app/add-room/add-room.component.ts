import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RoomService } from '../_services/room.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-add-room',
  templateUrl: './add-room.component.html',
  styleUrls: ['./add-room.component.css']
})
export class AddRoomComponent implements OnInit {

  content: string;

  constructor(private userService: UserService, private roomService: RoomService, private route: Router,private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    this.userService.getUserBoard().subscribe(
      data => {
        this.content = data;
      },
      err => {
        this.content = JSON.parse(err.error).message;
      }
    );
  }

addRoom(value:any){
    const user = this.tokenStorageService.getUser();
    this.roomService.addRoom(value,user.id);
}
}
