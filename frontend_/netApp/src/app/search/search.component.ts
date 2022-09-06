import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { PeopleService } from '../people/people.service';
import { StartService } from '../start/start.service';
import { StorageService } from '../_services/storage.service';
import { Status } from '../_state/people/friends.status.reducer';
import { SearchResultsState, selectSearchResults } from '../_state/search/search.reducer';
import { setSelectedUser } from '../_state/user/user.actions';
import { SelectUserState } from '../_state/user/user.reducer';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchResults: User[] = []
  searchResults$: Observable<{user:User, status: Status} []>
  loggedUser: User
  constructor(
    private searchResultsStore: Store<SearchResultsState>,
    private setSelectedUserStore: Store<SelectUserState>,
    private router: Router,
    private startService: StartService,
    private storageService: StorageService,
    private peopleService: PeopleService
  ) { 
    this.searchResults$ = this.searchResultsStore.select(selectSearchResults)
    this.loggedUser = this.storageService.getUser()
  }

  ngOnInit(): void {
   
    //this.searchResults = JSON.parse(localStorage.getItem('results'))
  }

  showProfile(selectedUser: User){
    //show other user's profile
    this.startService.changeActiveComponent('profile')
    const mode = (this.loggedUser.username === selectedUser.username)
    this.setSelectedUserStore.dispatch(setSelectedUser({selectedUser: selectedUser, myProfileMode: mode}))
    this.router.navigate(["start/profile/posts"])
    
  }

  get Status(){
    return Status
  }

  addFriend(user: User){

    this.peopleService.addFriend(this.loggedUser.id, user.id).subscribe({
      next: (res) => {
        alert(res.message)
      },
      error: (err) => {
        console.log(err.message)
      }
    })
    
  }

}
