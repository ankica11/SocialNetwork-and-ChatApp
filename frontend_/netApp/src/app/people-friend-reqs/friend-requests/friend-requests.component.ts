import { Component, OnInit } from '@angular/core';
import { Friendship } from 'src/app/models/friendship';
import { User } from 'src/app/models/user';
import { PeopleService } from 'src/app/people/people.service';
import { StorageService } from 'src/app/_services/storage.service';

@Component({
  selector: 'app-friend-requests',
  templateUrl: './friend-requests.component.html',
  styleUrls: ['./friend-requests.component.css']
})
export class FriendRequestsComponent implements OnInit {
  reqs: Friendship[] = []
  loggedUser: User
  constructor(
    private peopleService: PeopleService,
    private storageService: StorageService
  ) { }

  ngOnInit(): void {
    this.loggedUser = this.storageService.getUser()
    //get received friends requests
    this.peopleService.getFriendRequests(this.loggedUser.id).subscribe({
      next: (res) => {
        this.reqs = res.friendReqs
        console.log(this.reqs)
      },
      error: (err) => {
        console.log(err.message)
      }
    })
    

  }

  confirm(friendReq: Friendship){
    //make a friendship
    this.peopleService.acceptRequest(this.loggedUser.id, friendReq.senderFriendId).subscribe({
      next: (_)=> {
        this.reqs = this.reqs.filter(friendship => friendship.friendsId != friendReq.friendsId)
      },
      error: (err)=>{
        console.log(err.message)
      }
    })

  }

  delete(friendReq: Friendship){
    //delete request
    this.peopleService.deleteRequest(friendReq.friendsId).subscribe({
      next: (_) => {
        this.reqs = this.reqs.filter(friendship => friendship.friendsId != friendReq.friendsId)
      },
      error: (err)=>{
        console.log(err.message)
      }
    })

  }

}
