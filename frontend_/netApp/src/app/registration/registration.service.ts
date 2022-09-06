import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  http_uri = "http://localhost:3000/api/auth"
  https_uri = "https://localhost:4000/api/auth"

  http_options = {headers: new HttpHeaders({'Content-Type': 'application/json'})}

  constructor() { }
}
