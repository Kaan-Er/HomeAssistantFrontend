import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { RoomService } from '../_services/room.service';
import { Router } from '@angular/router';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-board-user',
  templateUrl: './board-user.component.html',
  styleUrls: ['./board-user.component.css']
})
export class BoardUserComponent implements OnInit {

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
