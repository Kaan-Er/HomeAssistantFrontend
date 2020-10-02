import { renderFlagCheckIfStmt } from '@angular/compiler/src/render3/view/template';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Room } from '../common/room';
import { Tool } from '../common/tool';
import { RoomService } from '../_services/room.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { ToolService } from '../_services/tool.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  currentUser: any;
  rooms: Room[];
  tools: Tool[];
  isLoggedIn = false;

  constructor(
    private token: TokenStorageService,
    private roomService: RoomService,
    private router: Router,
    private toolService: ToolService
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

  addTool() {
    this.router.navigate(['addtool']);
  }

  logout(): void {
    this.token.signOut();
    window.location.reload();
  }

  getRoomTools(roomId) {
    this.toolService.getTool(roomId).subscribe((data) => {
      this.tools = data;
    });
    this.toolService.room_Id = roomId;
  }

  deleteTool(toolId) {
    this.toolService.deleteTool(toolId);
    this.reloadPage();
  }

  reloadPage(): void {
    window.location.reload();
  }
}
