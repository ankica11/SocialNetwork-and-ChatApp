import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { UserAboutOverviewService } from '../user-about-overview/user-about-overview.service';
import { StorageService } from '../_services/storage.service';
import { setSelectedUser } from '../_state/user/user.actions';
import { selectMyProfileMode, selectUser, SelectUserState } from '../_state/user/user.reducer';

@Component({
  selector: 'app-user-about-places',
  templateUrl: './user-about-places.component.html',
  styleUrls: ['./user-about-places.component.css']
})
export class UserAboutPlacesComponent implements OnInit {

  currentPlaceForm: FormGroup
  hometownForm: FormGroup
 

  loggedUser: User
  selectedUser$: Observable<User>
  myProfileMode$: Observable<boolean>

  constructor(
    private formBuilder: FormBuilder,
    private storageService: StorageService,
    private setSelectedUserStore: Store<SelectUserState>,
    private userAboutService: UserAboutOverviewService
  ) { 
    this.currentPlaceForm = this.formBuilder.group({
      currentPlace: ['', Validators.required]
    })
    this.hometownForm = this.formBuilder.group({
      hometown: ['', Validators.required]
    })
  }

  ngOnInit(): void {

    this.loggedUser = this.storageService.getUser()
    this.selectedUser$ = this.setSelectedUserStore.select(selectUser)
    this.myProfileMode$ = this.setSelectedUserStore.select(selectMyProfileMode)
  

  }

  get currentPlace(): any{
    return this.currentPlaceForm.get('currentPlace')
  }

  get hometown(): any{
    return this.hometownForm.get('hometown')
  }

  setCurrentPlace(){
    const currentPlace = this.currentPlaceForm.value.currentPlace
    const userId = this.loggedUser.id
    this.userAboutService.setCurrentPlace(currentPlace, userId).subscribe({
     next: (res)=>{
       //@ts-ignore
       this.loggedUser = res.result 
       this.storageService.saveUser(this.loggedUser)
       this.setSelectedUserStore.dispatch(setSelectedUser({selectedUser: this.loggedUser, myProfileMode: true}))
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
       this.setSelectedUserStore.dispatch(setSelectedUser({selectedUser: this.loggedUser, myProfileMode: true}))
     },
     error: (err) => {
       console.log(err)
     }
    })

  }

  cancel(event){
    let button = event.target
    let panel = button.parentElement.parentElement.parentElement.parentElement
    panel.style.display = "none"
   }

   showForm(event){
     
    let span = event.target
    let button = span.parentElement
    let panel = button.nextElementSibling
    panel.style.display = "block"

  }


}
