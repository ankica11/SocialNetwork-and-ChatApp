import { Component, OnInit } from '@angular/core';
import { Friendship } from 'src/app/models/friendship';
import { User } from 'src/app/models/user';
import { PeopleService } from 'src/app/people/people.service';
import { StorageService } from 'src/app/_services/storage.service';

@Component({
  selector: 'app-suggestions',
  templateUrl: './suggestions.component.html',
  styleUrls: ['./suggestions.component.css']
})
export class SuggestionsComponent implements OnInit {

  suggestedPeople: User[]
  loggedUser: User

  constructor(
    private storageService: StorageService,
    private peopleService: PeopleService
  ) { }

  ngOnInit(): void {
    this.loggedUser = this.storageService.getUser()
    this.peopleService.getFriendsOfFriends(this.loggedUser.id).subscribe({
      next: (res)=>{

        this.suggestedPeople = res.suggestions
        
      },
      error: (err)=>{
        console.log(err.message)
      }

    })
  }

  addFriend(user){
    this.peopleService.addFriend(this.loggedUser.id, user.id).subscribe({
      next: (res) => {
        this.suggestedPeople = this.suggestedPeople.filter(usr=> usr.id != user.id)
        alert(res.message)
      },
      error: (err) => {
        console.log(err.message)
      }
    })

  }

  removeSuggestion(user){
    this.suggestedPeople = this.suggestedPeople.filter(usr => usr.id != user.id)

  }

}
