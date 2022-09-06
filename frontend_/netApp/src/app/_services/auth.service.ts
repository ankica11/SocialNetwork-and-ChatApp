import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  http_uri = "http://localhost:3000/api/auth"
  https_uri = "https://localhost:4000/api/auth"

  http_options = {headers: new HttpHeaders({'Content-Type': 'application/json'})}

  constructor(private http: HttpClient, private storageService: StorageService) { }
  goOffline(userId){
    const req_body = {
     userId: userId
    }
    return this.http.post(`${this.http_uri}/goOffline`,
                           req_body, 
                           this.http_options)

  }

  gettingExistingUserSession():Observable<any>{
    return this.http.get(`${this.http_uri}/exsistingUserSession`,
    
    this.http_options)
  }
  signin(username, password): Observable<any> {
    const req_body = {
      username: username,
      password: password
    }
    return this.http.post(`${this.http_uri}/signin`,
                           req_body, 
                           this.http_options)
  }

  refreshToken(){
    //setting existing refresh token from storage into request header 'x-refresh-token'
    //let http_options={}                                  
    let refreshToken= this.storageService.getRefreshToken()
    /*if(refreshToken){
      console.log(refreshToken)
      http_options = { headers: new HttpHeaders().set('Content-Type', 'application/json')
                                                    .set('x-refresh-token', refreshToken),
                                                    withCredentials: true
                                                }
     
    }*/
                                                                                              
    let req_body={}
    console.log('refreshToken authService')
    return this.http.post(`${this.http_uri}/refreshToken`, req_body, this.http_options)
  
  }
   
  signup(payload):Observable<any>{
    const req = payload
    return this.http.post(`${this.http_uri}/signup`, 
                           req, 
                           this.http_options)

    
  }

  validateUsername(username):Observable<any>{
    const req = {username : username}
    return this.http.post(`${this.http_uri}/signup/validateUsername`, req, this.http_options)
  }

  signout(): Observable<any>{
    return this.http.post(`${this.http_uri}/signout`,
                           {},
                           this.http_options

    )
  }




}







