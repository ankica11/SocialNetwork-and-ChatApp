import { Component, OnInit } from '@angular/core';
import { Friendship } from 'src/app/models/friendship';
import { User } from 'src/app/models/user';
import { PeopleService } from 'src/app/people/people.service';
import { StorageService } from 'src/app/_services/storage.service';

@Component({
  selector: 'app-all-friends',
  templateUrl: './all-friends.component.html',
  styleUrls: ['./all-friends.component.css']
})
export class AllFriendsComponent implements OnInit {

  friends: User[] = []
  loggedUser: User
  constructor(
    private peopleService: PeopleService,
    private storageService: StorageService
  ) { }

  ngOnInit(): void {
    this.loggedUser = this.storageService.getUser()
    this.peopleService.getFriends(this.loggedUser.id).subscribe({
      next: (res)=>{
        res.friendships.forEach((friendship: Friendship)=>{
          if(friendship.senderFriendId == this.loggedUser.id){
            this.friends.push(friendship.receiverFriend)
            
          }
          if(friendship.receiverFriendId == this.loggedUser.id){
            this.friends.push(friendship.senderFriend)
          }
          
          })
          this.friends.sort((a, b) => a.name > b.name ? 1 : a.name < b.name ? -1 : 0)
      },
      error: (err)=>{
        console.log(err.message)
      }

    })
  }

}
