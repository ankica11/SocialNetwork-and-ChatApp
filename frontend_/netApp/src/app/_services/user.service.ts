import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  http_uri = 'http://localhost:3000/user'
  https_uri = 'https://localhost:4000/user'

  constructor(private http: HttpClient) { }

  getUserContent(): Observable<any>{
    return this.http.get(`${this.http_uri}/usr`, {responseType: 'text'})
  }

  getModeratorContent(): Observable<any>{
    return this.http.get(`${this.http_uri}/mod`, {responseType: 'text'})

  }

  getAdminContent():Observable<any>{
    return this.http.get(`${this.http_uri}/admin`, {responseType: 'text'})
  }
}
