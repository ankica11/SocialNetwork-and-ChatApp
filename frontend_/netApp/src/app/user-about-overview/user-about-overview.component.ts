import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { User } from '../models/user';
import { StorageService } from '../_services/storage.service';
import { UserAboutOverviewService } from './user-about-overview.service';
import { SearchResultsState } from '../_state/search/search.reducer';
import { Observable, take } from 'rxjs';
import { UserService } from '../user.service';
import { ActivatedRoute } from '@angular/router';
import { selectMyProfileMode, selectUser, SelectUserState } from '../_state/user/user.reducer';
import { setSelectedUser } from '../_state/user/user.actions';


@Component({
  selector: 'app-user-about-overview',
  templateUrl: './user-about-overview.component.html',
  styleUrls: ['./user-about-overview.component.css']
})
export class UserAboutOverviewComponent implements OnInit {

  workplace: string= ''
  college: string = ''
  currentPlace: string = ''
  hometown: string = ''
  relationshipStatus: string = ''

  workplaceForm: FormGroup
  collegeForm: FormGroup
  currentPlaceForm: FormGroup
  hometownForm: FormGroup
  relationshipStatusForm: FormGroup

  loggedUser: User;
  selectedUser: User
  selectedUser$: Observable<User>
  myProfileMode$: Observable<boolean>

  constructor(
          private formBuilder: FormBuilder,
          private storageService: StorageService,
          private userAboutService: UserAboutOverviewService,
          private store: Store<SearchResultsState>,
          private userService: UserService,
          private activatedRoute: ActivatedRoute,
          private setselectedUserStore: Store<SelectUserState>
  ) { 
    

    this.workplaceForm = this.formBuilder.group({
      workplace: ['', Validators.required]
    })
    this.collegeForm = this.formBuilder.group({
      college: ['', Validators.required]
    })
    this.currentPlaceForm = this.formBuilder.group({
      currentPlace: ['', Validators.required]
    })
    this.hometownForm = this.formBuilder.group({
      hometown: ['', Validators.required]
    })
    this.relationshipStatusForm = this.formBuilder.group({
      relationshipStatus: ['Single', Validators.required]
    })
  }

  ngOnInit(): void {

    this.loggedUser = this.storageService.getUser()
    this.selectedUser$ = this.setselectedUserStore.select(selectUser)
    this.myProfileMode$ = this.setselectedUserStore.select(selectMyProfileMode)
   /* this.activatedRoute.parent.parent.paramMap.subscribe(params => {
      console.log("User About Overview ")
      console.log(params)
      const username = params.get('username')
      //get user from db with all its posts
      this.userService.getUserByUsername(username).subscribe({
        next: (res) => {
          //@ts-ignore
            this.selectedUser = res.user
            //console.log(this.selectedUser)
            const profileMode = (this.selectedUser.username === this.loggedUser.username)
            console.log(profileMode)
            this.store.dispatch(showUserProfile({selectedUser: this.selectedUser, myProfileMode: profileMode}))
            this.selectedUser$ = this.store.select(selectUser)
            this.myProfileMode$ = this.store.select(selectMyProfileMode)

            
        },
        error: (err)=>{
          console.log(err)
        }
      })
    })*/
    
  }

  suckme(){
    alert("suck me")
  }

  setWorkplace(){
   const workplace = this.workplaceForm.value.workplace
   const userId = this.loggedUser.id
   this.userAboutService.setWorkplace(workplace, userId).subscribe({
    next: (res)=>{
      //@ts-ignore
      this.loggedUser = res.result 
      this.storageService.saveUser(this.loggedUser)
      this.setselectedUserStore.dispatch(setSelectedUser({selectedUser: this.loggedUser, myProfileMode: true}))
      this.selectedUser$ = this.store.select(selectUser)
      this.selectedUser$.pipe(take(1)).subscribe(
        
      )
    },
    error: (err) => {
      console.log(err)
    }
   })


    
  }

  setCollege(){
    const college = this.collegeForm.value.college
    const userId = this.loggedUser.id
    this.userAboutService.setCollege(college, userId).subscribe({
     next: (res)=>{
       //@ts-ignore
       this.loggedUser = res.result 
       this.storageService.saveUser(this.loggedUser)
       this.setselectedUserStore.dispatch(setSelectedUser({selectedUser: this.loggedUser, myProfileMode: true}))
       this.selectedUser$ = this.store.select(selectUser)
       this.selectedUser$.pipe(take(1)).subscribe(
         
       )
     },
     error: (err) => {
       console.log(err)
     }
    })

  }

  setCurrentPlace(){

    const currentPlace = this.currentPlaceForm.value.currentPlace
    const userId = this.loggedUser.id
    this.userAboutService.setCurrentPlace(currentPlace, userId).subscribe({
     next: (res)=>{
       //@ts-ignore
       this.loggedUser = res.result 
       this.storageService.saveUser(this.loggedUser)
       this.setselectedUserStore.dispatch(setSelectedUser({selectedUser: this.loggedUser, myProfileMode: true}))
       this.selectedUser$ = this.store.select(selectUser)
       this.selectedUser$.pipe(take(1)).subscribe(
         
       )
     },
     error: (err) => {
       console.log(err)
     }
    })

  }

  setHometown(){

    const hometown = this.hometownForm.value.hometown
    const userId = this.loggedUser.id
    this.userAboutService.setHometown(hometown, userId).subscribe({
     next: (res)=>{
       //@ts-ignore
       this.loggedUser = res.result 
       this.storageService.saveUser(this.loggedUser)
       this.setselectedUserStore.dispatch(setSelectedUser({selectedUser: this.loggedUser, myProfileMode: true}))
       this.selectedUser$ = this.store.select(selectUser)
       this.selectedUser$.pipe(take(1)).subscribe(
         
       )
     },
     error: (err) => {
       console.log(err)
     }
    })

  }

  setRelationshipStatus(){

    const relationshipStatus = this.relationshipStatusForm.value.relationshipStatus
    const userId = this.loggedUser.id
    this.userAboutService.setRelationshipStatus(relationshipStatus, userId).subscribe({
     next: (res)=>{
       //@ts-ignore
       this.loggedUser = res.result 
       this.storageService.saveUser(this.loggedUser)
       this.setselectedUserStore.dispatch(setSelectedUser({selectedUser: this.loggedUser, myProfileMode: true}))
       this.selectedUser$ = this.store.select(selectUser)
       this.selectedUser$.pipe(take(1)).subscribe(
         
       )
     },
     error: (err) => {
       console.log(err)
     }
    })
  }

}
