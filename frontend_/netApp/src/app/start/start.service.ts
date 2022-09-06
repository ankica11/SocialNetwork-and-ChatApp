import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StartService {

  uri_https = 'https://localhost:4000/api/user'
  uri_http = 'http://localhost:3000/api/user'
  public activeComponent$: EventEmitter<string>;

  constructor(private http: HttpClient) { 
    this.activeComponent$ = new EventEmitter()
  }

  changeActiveComponent(activeComponent: string){
    this.activeComponent$.emit(activeComponent)
  }
  search(term){
    const headers = new HttpHeaders().set('content-type', 'application/json')
    const params = new HttpParams().set('term', term)
    const req={}
    return this.http.get(`${this.uri_http}/search`, {headers: headers, params:params})
  }



}
