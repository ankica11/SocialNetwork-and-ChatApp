import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  response: any = {}
  uri_https = 'https://localhost:4000/api/user'
  uri_http = 'http://localhost:3000/api/user'

  constructor(private http: HttpClient) { }


  getUserByUsername(username){
    let headers = new HttpHeaders()
    .set('content-type', 'application/json')
    const req = {
      username: username
    }

    return this.http.post(`${this.uri_http}/getUserByUsername`, req, {headers: headers})
   
  }

  login(username, password){
    const req = {
      username: username,
      password: password
    }
  
    return this.http.post(`${this.uri_http}/auth/signin`, req)
    
  }

  change_info(){
    
    let headers = new HttpHeaders()
    .set('content-type', 'application/json')
    let params = new HttpParams().set('id',1)
    let req = {
      password: 'pass1234'
    }



    
    

    return this.http.put(`${this.uri_http}/change`, req, {headers: headers, params: params})
  }

  get_all(){
    console.log('get all route')
    let headers = new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Access-Control-Allow-Origin', '*')
    //.set('x-access-token', localStorage.getItem('x-access-token'))
    return this.http.get(`${this.uri_http}/all`, {headers: headers})
  }

  getUser(userId){
    let headers = new HttpHeaders()
    .set('content-type', 'application/json')
    const req = {
      userId: userId
    }

    return this.http.post(`${this.uri_http}/getUser`, req, {headers: headers})
    
  }
}
