import { Component, OnChanges, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, switchMap, take, tap } from 'rxjs';
import { User } from '../models/user';
import { PeopleService } from '../people/people.service';
import { UserService } from '../user.service';
import { StorageService } from '../_services/storage.service';
import { selectMyProfileMode, selectUser, SelectUserState } from '../_state/user/user.reducer';

@Component({
  selector: 'app-profile-friends',
  templateUrl: './profile-friends.component.html',
  styleUrls: ['./profile-friends.component.css']
})
export class ProfileFriendsComponent implements OnInit, OnChanges {

  selectedUser: User
  selectedUser$: Observable<User>
  myProfileMode$: Observable<boolean>
  loggedUser: User
  friends: User[] = []
  constructor(
    private setSelectedUserStore: Store<SelectUserState>,
    private peopleService: PeopleService,
    private storageService: StorageService,
    private activatedRoute: ActivatedRoute,
    private userService: UserService
  ) { }


  ngOnChanges(){
    
  }
  ngOnInit(): void {
    this.loggedUser = this.storageService.getUser()
    this.selectedUser$ = this.setSelectedUserStore.select(selectUser)
    this.myProfileMode$ = this.setSelectedUserStore.select(selectMyProfileMode)
    this.activatedRoute.parent.paramMap.subscribe(params => {
      
      const username = params.get('username')
      //get user from db with all its posts
      this.userService.getUserByUsername(username).subscribe({
        next: (res) => {
            this.getFriends(res['user'])
        },
        error: (err)=>{
          console.log(err.message)
        }
      })
        

    
      
   
  })}

  getFriends(user){
    this.peopleService.getFriends(user.id).subscribe({
      next: (res)=>{
       
        for(let i=0; i<res.friendships.length; i++){
          const friendship = res.friendships[i]
          if(friendship.senderFriendId == user.id){
            this.friends.push(friendship.receiverFriend)
            
          }
          if(friendship.receiverFriendId == user.id){
            this.friends.push(friendship.senderFriend)
          }

          

        }
       
        this.friends.sort((a, b) => a.name > b.name ? 1 : a.name < b.name ? -1 : 0)
      },
      error: (err)=>{
        console.log(err.message)
      }

    })

  }

}
