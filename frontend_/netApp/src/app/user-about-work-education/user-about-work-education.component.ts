import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { UserAboutOverviewService } from '../user-about-overview/user-about-overview.service';
import { UserService } from '../user.service';
import { StorageService } from '../_services/storage.service';
import { setSelectedUser } from '../_state/user/user.actions';
import { selectMyProfileMode, selectUser, SelectUserState } from '../_state/user/user.reducer';

@Component({
  selector: 'app-user-about-work-education',
  templateUrl: './user-about-work-education.component.html',
  styleUrls: ['./user-about-work-education.component.css']
})
export class UserAboutWorkEducationComponent implements OnInit {

  workplaceForm: FormGroup
  collegeForm: FormGroup
  highschoolForm: FormGroup

  loggedUser: User
  selectedUser$: Observable<User>
  myProfileMode$: Observable<boolean>
  selectedUser: User


  constructor(
    private formBuilder: FormBuilder,
    private storageService: StorageService,
    private setSelectedUserStore: Store<SelectUserState>,
    private userAboutService: UserAboutOverviewService,
    private activatedRoute: ActivatedRoute,
    private userService: UserService
  ) { 
    this.workplaceForm = this.formBuilder.group({
      workplace: ['', Validators.required]
    })
    this.collegeForm = this.formBuilder.group({
      college: ['', Validators.required]
    })
    this.highschoolForm = this.formBuilder.group({
      highschool: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    
    this.loggedUser = this.storageService.getUser()
    this.selectedUser$ = this.setSelectedUserStore.select(selectUser)
    this.myProfileMode$ = this.setSelectedUserStore.select(selectMyProfileMode)
    
   
   
  }


  setWorkplace(){
    const workplace = this.workplaceForm.value.workplace
    const userId = this.loggedUser.id
    this.userAboutService.setWorkplace(workplace, userId).subscribe({
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


   get workplace(): any{
    return this.workplaceForm.get('workplace')
   }

   get college():any{
    return this.collegeForm.get('college')
   }

   get highschool(): any{
    return this.highschoolForm.get('highschool')
   }

   setCollege(){
    const college = this.collegeForm.value.college
    const userId = this.loggedUser.id
    this.userAboutService.setCollege(college, userId).subscribe({
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

  setHighschool(){
    const highschool = this.highschoolForm.value.highschool
    const userId = this.loggedUser.id
    this.userAboutService.setHighschool(highschool, userId).subscribe({
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
