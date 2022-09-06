import { Component, OnInit } from '@angular/core';
import { Friendship } from 'src/app/models/friendship';
import { User } from 'src/app/models/user';

import { PeopleService } from 'src/app/people/people.service';
import { StorageService } from 'src/app/_services/storage.service';

@Component({
  selector: 'app-sent-requests',
  templateUrl: './sent-requests.component.html',
  styleUrls: ['./sent-requests.component.css']
})
export class SentRequestsComponent implements OnInit {
  loggedUser: User
  reqs: Friendship[] = []
  constructor(
    private peopleService: PeopleService,
    private storageService: StorageService
  ) { }

  ngOnInit(): void {
    this.loggedUser = this.storageService.getUser()
    this.peopleService.getSentRequests(this.loggedUser.id).subscribe({
      next: (res)=>{
        this.reqs = res.sentRequests
      },
      error: (err)=>{
        console.log(err.message)
      }
    })
  }

  deleteRequest(sentReq: Friendship){

    this.peopleService.deleteRequest(sentReq.friendsId).subscribe({
      next: (res)=>{
        this.reqs = this.reqs.filter(friendship => friendship.friendsId != sentReq.friendsId)
      },
      error: (err)=>{
        console.log(err.message)
      }
    })


  }

}
