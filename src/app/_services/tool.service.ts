import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tool } from '../common/tool';
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root',
})
export class ToolService {
  private base_url = 'http://localhost:8080/api';

  constructor(
    private httpClient: HttpClient,
    private token: TokenStorageService
  ) {}

  // http://localhost:8080/api/{roomId}/tools
  getTool(roomId: number): Observable<Tool[]> {
    const user = this.token.getUser();
    const headerOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: user.accessToken,
      }),
    };
    const roomIdUrl = `${this.base_url}/${roomId}/tools`;
    return this.httpClient.get<Tool[]>(roomIdUrl, headerOptions);
  }
}
