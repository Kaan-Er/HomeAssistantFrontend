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
  room_Id: number;
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

  addTool(tool: string) {
    const room_url = `${this.base_url}/${this.room_Id}/tools`;
    return this.httpClient
      .post(room_url, { toolName: tool, statu: 'off', room: this.room_Id })
      .subscribe();
  }

  //http://localhost:8080/api/tools/{toolId}
  deleteTool(toolId: number) {
    const tool_url = `${this.base_url}/tools/${toolId}`;
    return this.httpClient.delete(tool_url).subscribe();
  }
}
