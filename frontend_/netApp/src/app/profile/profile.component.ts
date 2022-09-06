import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { Observable, switchMap, take, tap } from 'rxjs';
import { User } from '../models/user';
import { PeopleService } from '../people/people.service';
import { UserAboutOverviewService } from '../user-about-overview/user-about-overview.service';
import { UserService } from '../user.service';
import { StorageService } from '../_services/storage.service';
import { setFriendsStatus } from '../_state/people/friends.status.actions';
import { FriendsStatusState, selectFriendsStatus, Status } from '../_state/people/friends.status.reducer';
import { SearchResultsState} from '../_state/search/search.reducer';
import { setSelectedUser } from '../_state/user/user.actions';
import { selectMyProfileMode, selectUser, SelectUserState } from '../_state/user/user.reducer';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  myProfileMode$: Observable<boolean>
  friendsStatus$: Observable<Status>
  activeComponent: string = 'posts'
  loggedUser: User
  selectedUser: User
  myProfileMode: boolean
  selectedUser$: Observable<User>
  profilePhoto: File | null = null
  profilePreview: string = ''
  profilePhotoURL: string = ''
  pics=["https://randomuser.me/api/portraits/women/10.jpg","https://randomuser.me/api/portraits/women/11.jpg","https://randomuser.me/api/portraits/women/12.jpg","https://randomuser.me/api/portraits/women/13.jpg","https://randomuser.me/api/portraits/women/14.jpg","https://randomuser.me/api/portraits/women/15.jpg","https://randomuser.me/api/portraits/women/16.jpg","https://randomuser.me/api/portraits/women/17.jpg"
]
  constructor(
    private setSelectedUserStore: Store<SelectUserState>,
    private friendsStatusStore: Store<FriendsStatusState>,
    private storageService: StorageService,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private peopleService: PeopleService,
    private userAboutService: UserAboutOverviewService,
    private modalService: NgbModal
  ) {
   
   }

  ngOnInit(): void {
    this.selectedUser$ = this.setSelectedUserStore.select(selectUser)
    this.myProfileMode$ = this.setSelectedUserStore.select(selectMyProfileMode)
    this.friendsStatus$ = this.friendsStatusStore.select(selectFriendsStatus)
    this.loggedUser = this.storageService.getUser()
    this.activatedRoute.paramMap.subscribe(params => {
      
      const username = params.get('username')
      //get user 
      this.userService.getUserByUsername(username)
      .pipe(
        
        tap(res=> {
          //@ts-ignore
          this.selectedUser = res.user
          
            this.myProfileMode = (this.selectedUser.username === this.loggedUser.username)
            this.setSelectedUserStore.dispatch(setSelectedUser({selectedUser: this.selectedUser, myProfileMode: this.myProfileMode}))
            this.selectedUser$ = this.setSelectedUserStore.select(selectUser)
            this.myProfileMode$ = this.setSelectedUserStore.select(selectMyProfileMode)
            
        }),
        //@ts-ignore
        switchMap(res => this.peopleService.checkFriendsStatus(this.loggedUser.id, res.user.id))
      )
      
      .subscribe({
        next: (res) => {
          //@ts-ignore
           
           if(res.res == null){
            
            this.friendsStatusStore.dispatch(setFriendsStatus({status: Status.NONE}))
           }else
           { if(res.res.accepted){
           
            //friends no matter who sent request
            this.friendsStatusStore.dispatch(setFriendsStatus({status: Status.FRIENDS}))
           }else {
            if(res.res.senderFriendId == this.loggedUser.id){
           
            //not friends but logged user sent request, but its still pending
           
            this.friendsStatusStore.dispatch(setFriendsStatus({status: Status.PENDING_SENT}))
           }else {
            if( res.res.receiverFriendId == this.loggedUser.id){
            
            //not friends but logged user received request, but its still pending
            this.friendsStatusStore.dispatch(setFriendsStatus({status: Status.PENDING_RECEIVED}))
           }}}}
           
     
        },
        error: (err) => {
          console.log(err)
        }
      })
    }
     
    )
    
    let items = document.querySelectorAll('.navigation-item')
    items.forEach(item => {
      item.addEventListener('click', ()=> {
        this.activeComponent = item.getAttribute('id')
        
        items.forEach(item2=>{
        let itemBorder2 = item2.querySelector('#border')
        itemBorder2.classList.remove('item-border-active')
        itemBorder2.classList.add('item-border')
        })

        let itemBorder=item.querySelector('#border')
        itemBorder.classList.remove('item-border')
        itemBorder.classList.add('item-border-active')


      })
    })

  
  }

  get Status(){
    return Status
  }


  addFriend(){

    this.selectedUser$.pipe(
      tap(user=>{
        console.log('add friend')
        console.log(user)
      }),
      switchMap(user=> this.peopleService.addFriend(this.loggedUser.id, user.id))
    ).subscribe({
      next: (res)=>{
        this.friendsStatusStore.dispatch(setFriendsStatus({status: Status.PENDING_SENT}))
        alert(res.message)
      },
      error: (err)=>{
        console.log(err)
      }
    })

  }

  removeFriend(){

  }

  deleteRequest(){

  }

  acceptRequest(){

  }

  checkFriendsStatus(){

  }

  openProfilePhotoModal(content){
    this.modalService.open(content, {backdropClass: 'white-backdrop', centered: true, modalDialogClass: 'custom-modal'});
    

  }

  profilePhotoPreview(event: any){
    
    this.profilePhoto = event.target.files[0]
    this.profilePreview = ''
    
    if (this.profilePhoto) {
      
     
        const reader = new FileReader();
        reader.onload = (e: any) => {
          
          this.profilePreview = e.target.result
        };
        reader.readAsDataURL(this.profilePhoto);
      
    }

  }

  saveProfilePhoto(){
    this.userAboutService.postFile(this.loggedUser.username, this.profilePhoto).subscribe({
      next: (res)=>{
        this.modalService.dismissAll()
        //@ts-ignore
        this.loggedUser = res.success 
        this.storageService.saveUser(this.loggedUser)
        this.setSelectedUserStore.dispatch(setSelectedUser({selectedUser: this.loggedUser, myProfileMode: true}))
        this.selectedUser$ = this.setSelectedUserStore.select(selectUser)
        this.myProfileMode$ = this.setSelectedUserStore.select(selectMyProfileMode)
        

      },
      error: (err)=>{
        console.log(err.message)
      }
    })
  }

}
