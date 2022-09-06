import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter, Observable } from 'rxjs';
import { User } from '../models/user';
import { UserService } from '../user.service';
import { AuthService } from '../_services/auth.service';
import { StorageService } from '../_services/storage.service';
import { logout } from '../_state/auth/auth.actions';
import { selectLoggedUser, State } from '../_state/auth/auth.reducer';


import { addFriend, getSentRequests, getSentRequestsSuccess } from '../_state/people/people.actions';

import { PeopleService } from './people.service';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css']
})
export class PeopleComponent implements OnInit {

  users: User[] = []
  sentRequests1: User[]=[]
  friendRequests: User[]=[]
  search_value: string = ''
  currentUser: User
  success=0
  currentUserStore$:Observable<User>
  getState: Observable<any>
  activeChild: string 
  

  constructor(private storageService: StorageService,
              private userService: UserService,
              private peopleService: PeopleService,
              private authService: AuthService,
              private authStore: Store<State>,
              private router: Router) { 
                
                this.currentUserStore$ = this.authStore.select(selectLoggedUser)
              }

  //sentRequests$ = this.store.select('sentRequests')

  ngOnInit(): void {
        
    this.currentUser=this.storageService.getUser()
    this.activeChild = this.router.url.split('/').pop()
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd))
          .subscribe(event => 
           {
              //@ts-ignore
              this.activeChild = event.url.split('/').pop()
              
           });
    
    
   
  }

  


  showFriendRequests(){

  }

  setActive(){}

  getSentRequests(){
    this.peopleService.getSentRequests(this.currentUser.id).subscribe({
      next: (res)=>{
        this.sentRequests1 = res.sentRequests
       //this.store.dispatch(getSentRequestsSuccess({sentReqs: res.sentRequests}))
      },
      error: (err)=>{
        console.log(err)
      }
    })
  }

  

  addFriend(user: User){
    this.peopleService.addFriend(this.currentUser.id, user.id).subscribe({
      next: (res)=>{
        //this.store.dispatch(addFriend({user: user}))
       // this.store.dispatch(getSentRequestsSuccess({sentReqs: res.sentRequests}))
        alert("Request sent")
      },
      error: (err)=>{
        console.log(err)

      }
      
  })

  }

  signOut(){
    this.authService.signout().subscribe({
      next: (res) => {
        this.storageService.signOut()
        this.authStore.dispatch(logout())
        alert(res.message)
      },
      error: (err)=>{
        console.log(err)
      }
    })

  }



}
