import { Component, Input, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { StorageService } from '../_services/storage.service';
import { NgZone } from '@angular/core';
import { User } from '../models/user';
import { forkJoin, map, Observable, switchMap, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectLoggedUser, State } from '../_state/auth/auth.reducer';
import { ActivatedRoute, Router } from '@angular/router';
import { StartService } from './start.service';
import { SearchResultsState } from '../_state/search/search.reducer';
import { getSearchResults} from '../_state/search/search.actions';
import { selectMyProfileMode, selectUser, SelectUserState } from '../_state/user/user.reducer';
import { setSelectedUser } from '../_state/user/user.actions';
import { Friendship } from '../models/friendship';
import { PeopleService } from '../people/people.service';
import { Status } from '../_state/people/friends.status.reducer';



@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {

  loggedUser$: Observable<User>
  loggedUser: User
  search_parameter: string
  search_results: User[] = []
  selectedUser$: Observable<User>
  myProfileMode$: Observable<boolean>
  activeComponent: string = 'home'
  profilePhotoURL: string = ''
 
  constructor(
    private storageService: StorageService,
    private startService: StartService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private setSelectedUserStore: Store<SelectUserState>,
    private searchResultsStore: Store<SearchResultsState>,
    private peopleService: PeopleService
    ) { 
      
      
    }
    
    
  ngOnInit(): void {
    let items = document.querySelectorAll('.nav-item-custom')
    this.loggedUser = this.storageService.getUser()
    this.profilePhotoURL = "http://localhost:3000/api/user_about/files/" + this.loggedUser.username +'_profile.jpg'
    this.setSelectedUserStore.dispatch(setSelectedUser({selectedUser: this.loggedUser, myProfileMode: true}))
    this.myProfileMode$ = this.setSelectedUserStore.select(selectMyProfileMode)
    /*this.loggedUser$ = this.setSelectedUserStore.select(selectUser)
    this.loggedUser$.subscribe((user)=>{
      console.log(user)
      this.myProfileMode$.subscribe((mode)=>{
        console.log(mode)
      })
    })*/
   
    items.forEach(item => {
      item.addEventListener('click', ()=>{
        this.startService.changeActiveComponent(item.getAttribute('id'))
        
        
      })
    })

    this.startService.activeComponent$.subscribe(activeComp => {
      this.activeComponent = activeComp
      
    })
  }

  showMyProfile(){
    //my profile
    this.activeComponent = 'profile'
    this.setSelectedUserStore.dispatch(setSelectedUser({selectedUser: this.loggedUser, myProfileMode: true}))
  }

  search(event){
    this.activeComponent = 'search'
    this.search_parameter = event.target.value
    //search the value on the back then show search_results in child component search_results
    this.startService.search(this.search_parameter).subscribe({
      next:(res) => {
        //localStorage.setItem('results', JSON.stringify(this.search_results))
        //@ts-ignore
        this.checkFriendStatus(res.searchResults).subscribe((users)=>{
          //@ts-ignore
          this.searchResultsStore.dispatch(getSearchResults({searchResults: users}))
          //@ts-ignore
          this.router.navigate(['search'], {relativeTo: this.activatedRoute})
         
        })
      },
      error: (err)=>{
        console.log(err.message)
      }
    })

  }

  checkFriendStatus(users: User[]){
   return forkJoin(
    users.map(user => this.peopleService.checkFriendsStatus(this.loggedUser.id, user.id).pipe(
      map(friendship => ({user:user, status: this.checkStatus(friendship)}))
    )
    )
    )
    

  }

  checkStatus(res):Status {

    let status = Status.NONE
    //@ts-ignore        
    if(res.res == null){
            
      status = Status.NONE
     }else if(res.res.accepted){
     
      //friends no matter who sent request
        status = Status.FRIENDS
      //@ts-ignore 
     }else if(res.res.senderFriendId == this.loggedUser.id){
     
      //not friends but logged user sent request, but its still pending
     
        status =  Status.PENDING_SENT
     }else if( res.res.receiverFriendId == this.loggedUser.id){
      
      //not friends but logged user received request, but its still pending
       status = Status.PENDING_RECEIVED
     }

     return status
  }

}
