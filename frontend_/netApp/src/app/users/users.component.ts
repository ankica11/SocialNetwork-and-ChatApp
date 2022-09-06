import { DatePipe } from '@angular/common';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, ObservableInput, of, switchMap, throwError, timeout } from 'rxjs';
import { User } from '../models/user';
import { UserService } from '../user.service';
import { AuthService } from '../_services/auth.service';
import { StorageService } from '../_services/storage.service';
import { EventBusService } from '../_shared/event-bus.service';
import { EventData } from '../_shared/events';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
  //if u want to use data pipe for transforming do date u need to add providers['DataPipe']
})
export class UsersComponent implements OnInit {

  constructor(private userService: UserService,
              private storageService: StorageService,
              private authService: AuthService,
              private router: Router,
              private eventBusService: EventBusService) { }

             
  users: User[] = []
  message=''
  access_token_expired=false
  refresh_token_expired=false
  userSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null)
  
  ngOnInit(): void {

    
   
  }
  

  
  get_all(){

    
    
    this.userService.get_all().subscribe(
      {
        next: (res) => {
          //@ts-ignore
          this.users = res.data as User[]
          //console.log(JSON.stringify(res))
          
        },
        error: (err: HttpErrorResponse) => {
          
          this.users=[]
          this.message=err.error.message
          if(err.status == 403){ 
            //force sign out
            //emitting logout event
            this.eventBusService.emit(new EventData("logout", {data:'logout data'}))
            //this.eventBusService.emit(new EventData("signout", {data: 'signout data'}))
            //show modal or something
            
            this.router.navigate(['/'])
          }
          
      }
    }
    )

  }

  refreshToken(){
    this.authService.refreshToken().subscribe({
      next: (res) => {
        this.message = 'Your access token is successfully renewed you can access your content now!'
        this.access_token_expired=false
      },
      error: (err: HttpErrorResponse) => {
        this.message = err.error.message
          if(err.status == 403){
            
            alert("You need to sign out!")
            this.refresh_token_expired=true
            //forced logout
            setTimeout(()=>{
              this.storageService.signOut()
              this.router.navigate(['/'])
              
            }, 3000)
          }
      }
    })
  }

}
