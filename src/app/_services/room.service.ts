import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Room } from '../common/room';
import { TokenStorageService } from './token-storage.service';



@Injectable({
  providedIn: 'root'
})
export class RoomService {

  private base_url = "http://localhost:8080/api"

  constructor(private httpClient: HttpClient, private token: TokenStorageService) { }

  // http://localhost:8080/api/{userId}/rooms
  getRoom(theUserId: number): Observable<Room[]>{
    const user = this.token.getUser();
    const headerOptions = {
      headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization': user.accessToken
      })
    }
    const userIdUrl = `${this.base_url}/${theUserId}/rooms`;
    return this.httpClient.get<Room[]>(userIdUrl,headerOptions);
  }

  // http://localhost:8080/api/{userId}/rooms
  addRoom(room: string, theUserId: number){
    const room_url = `${this.base_url}/${theUserId}/rooms`;
    return this.httpClient.post(room_url,({roomName:room})).subscribe();
  }

}
