import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  TOKEN_STORAGE_KEY = 'auth_token'
  USER_STORAGE_KEY = 'auth_user'
  REFRESH_TOKEN_KEY = 'auth_refresh_token'

  constructor() { }

  saveUser(user){
    //we keep currently logged user in browser's session storage
    //session last as long as window tab is open
    //but we want to set expiration date for session
    //so in that case maybe it's better to store jwt token in httponly cookie
    window.sessionStorage.removeItem(this.USER_STORAGE_KEY)
    window.sessionStorage.setItem(this.USER_STORAGE_KEY, JSON.stringify(user))
  }

  saveRefreshToken(token){
    localStorage.removeItem(this.REFRESH_TOKEN_KEY)
    localStorage.setItem(this.REFRESH_TOKEN_KEY, token)
  }
  getRefreshToken(){
    return localStorage.getItem(this.REFRESH_TOKEN_KEY)
  }
  getUser(){
    const user = window.sessionStorage.getItem(this.USER_STORAGE_KEY)
    if(user){
      return JSON.parse(user)
    }
    return {}
  }

  saveJWToken(token){
    window.sessionStorage.removeItem(this.TOKEN_STORAGE_KEY)
    window.sessionStorage.setItem(this.TOKEN_STORAGE_KEY, token)
  }

  getToken(): string | null {
    return window.sessionStorage.getItem(this.TOKEN_STORAGE_KEY)
  }

  signOut(){
    window.sessionStorage.clear()
  }
}
