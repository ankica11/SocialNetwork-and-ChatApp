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
import { progressBar } from './helper';

@Component({
  selector: 'app-user-about-details',
  templateUrl: './user-about-details.component.html',
  styleUrls: ['./user-about-details.component.css']
})
export class UserAboutDetailsComponent implements OnInit {

  loggedUser: User
  selectedUser$: Observable<User>
  myProfileMode$: Observable<boolean>
  selectedUser: User


  aboutForm: FormGroup
  nicknameForm: FormGroup
  quoteForm: FormGroup

  constructor(
    private formBuilder: FormBuilder,
    private storageService: StorageService,
    private setSelectedUserStore: Store<SelectUserState>,
    private userAboutService: UserAboutOverviewService,
    private activatedRoute: ActivatedRoute,
    private userService: UserService
  ) { 
    this.aboutForm = this.formBuilder.group({
      about: ['', Validators.compose([Validators.required, Validators.maxLength(200)])]
    })
    this.nicknameForm = this.formBuilder.group({
      nickname: ['', Validators.required]
    })
    this.quoteForm = this.formBuilder.group({
      quotes: ['', Validators.required]
    })

  }

  ngOnInit(): void {

    this.loggedUser = this.storageService.getUser()
    this.selectedUser$ = this.setSelectedUserStore.select(selectUser)
    this.myProfileMode$ = this.setSelectedUserStore.select(selectMyProfileMode)
    

   
   

    
  }

  keyupFunc(ev){
    var content = $('#myDiv').html();
    var extra = content.match(/.{19}(.*)/)[1];
    
   
    
    var newContent = content.replace(extra, "<span class='highlight'>" + extra + "</span>");
    $('#sample').html(newContent);
    console.log($('#sample'))
  }

  characters_counter(ev){
      

      const max_chars=200
      let num_of_char = ev.target.value.length
      const progressVal = (num_of_char/max_chars)*100
      progressBar(progressVal, num_of_char, max_chars, ev.target)
      console.log(ev.target.value.slice(200))

  }

  get about():any{
    return this.aboutForm.get('about')
  }

  get nickname(): any{
    return this.nicknameForm.get('nickname')
  }

  get quotes(): any{
    return this.quoteForm.get('quotes')
  }

  setQuotes(){

    const quotes = this.quoteForm.value.quotes
    const userId = this.loggedUser.id
    this.userAboutService.setQuotes(quotes, userId).subscribe({
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

  setAbout(){
    const about = this.aboutForm.value.about
    const userId = this.loggedUser.id
    this.userAboutService.setAbout(about, userId).subscribe({
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

   setNickname(){

    const nickname = this.nicknameForm.value.nickname
    const userId = this.loggedUser.id
    this.userAboutService.setNickname(nickname, userId).subscribe({
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
