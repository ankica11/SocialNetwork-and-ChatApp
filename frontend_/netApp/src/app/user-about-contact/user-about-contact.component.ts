import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, take } from 'rxjs';
import { User } from '../models/user';
import { UserAboutOverviewService } from '../user-about-overview/user-about-overview.service';
import { StorageService } from '../_services/storage.service';
import { setSelectedUser } from '../_state/user/user.actions';
import { selectMyProfileMode, selectUser, SelectUserState } from '../_state/user/user.reducer';

@Component({
  selector: 'app-user-about-contact',
  templateUrl: './user-about-contact.component.html',
  styleUrls: ['./user-about-contact.component.css']
})
export class UserAboutContactComponent implements OnInit {

  phoneForm: FormGroup
  emailForm: FormGroup
  websitesForm: FormGroup
  socialLinksForm: FormGroup
  selectedLink: string
  languageForm: FormGroup
  interestedInForm: FormGroup
  genderForm: FormGroup
  birthDateForm: FormGroup



  loggedUser: User
  selectedUser$: Observable<User>
  myProfileMode$: Observable<boolean>
  socialLinksArray: any[] = []

  constructor(
    private formBuilder: FormBuilder,
    private storageService: StorageService,
    private setSelectedUserStore: Store<SelectUserState>,
    private userAboutService: UserAboutOverviewService
  ) { 
    this.phoneForm = this.formBuilder.group({
      phone: ['', Validators.compose([Validators.required, Validators.pattern(/^06([0-9])([0-9]{7})$/)])]
    }),
    this.emailForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])]
    }),
    this.websitesForm = this.formBuilder.group({
      websites: this.formBuilder.array([])
    }),
    this.socialLinksForm  = this.formBuilder.group({
      socialLinks: this.formBuilder.array([])
      
      
    }),
    this.languageForm = this.formBuilder.group({
      language: ['', Validators.required]
    }),
    this.interestedInForm = this.formBuilder.group({
      interestedIn: ['men', Validators.required]
    }),
    this.genderForm = this.formBuilder.group({
      gender: ['male', Validators.required]
    }),
    this.birthDateForm = this.formBuilder.group({
      birthDate: ['', Validators.required]
    })
  }

  ngOnInit(): void {

    this.loggedUser = this.storageService.getUser()
    this.selectedUser$ = this.setSelectedUserStore.select(selectUser)
    this.myProfileMode$ = this.setSelectedUserStore.select(selectMyProfileMode)
    this.addWebsite()
    this.addSocialLink()
    this.getSocialLinks()
   
  
 
  }

  get websites(): FormArray {
    return this.websitesForm.get("websites") as FormArray
  }

  get socialLinks(): FormArray{
    return this.socialLinksForm.get("socialLinks") as FormArray
   
  }

  get email(): any{
    return this.emailForm.get('email')
  }

  get phone(): any{
    return this.phoneForm.get('phone')
  }

  get language(): any{
    return this.languageForm.get('language')
  }

  get birthDate(): any{
    return this.birthDateForm.get('birthDate')
  }

  newWebiste(): FormGroup{
    const websiteRegex = /^[a-zA-Z0-9]+\.[a-zA-Z]{2,}$/
    return this.formBuilder.group({
      website: ['', Validators.compose([Validators.required, Validators.pattern(websiteRegex)])]
    })
  }

  newSocialLink(): FormGroup{
    return this.formBuilder.group({
      socialLink: ['', Validators.required],
      socialType: ['instagram']
    })
    

  }

  addSocialLink(){
    this.socialLinks.push(this.newSocialLink())
  }

  addWebsite(){
    this.websites.push(this.newWebiste())
  }

  setSocialLinks(){
    let socialLinks = {}
    this.socialLinksForm.value.socialLinks.forEach((socialLink)=>{
      socialLinks[socialLink.socialType] = socialLink.socialLink
    })
    const userId = this.loggedUser.id
    this.userAboutService.setSocialLinks(socialLinks, userId).subscribe({
     next: (res)=>{
       //@ts-ignore
       this.loggedUser = res.result 
       this.storageService.saveUser(this.loggedUser)
       this.setSelectedUserStore.dispatch(setSelectedUser({selectedUser: this.loggedUser, myProfileMode: true}))
       console.log(this.loggedUser.user_info)
       if(this.loggedUser.user_info.socialLinks != null){
        Object.keys(this.loggedUser.user_info.socialLinks).forEach((key)=>{
          this.socialLinksArray.push({socialLink: this.loggedUser.user_info.socialLinks[key], socialType: key})
         
        })
        //console.log(Object.entries(user.user_info.socialLinks))
        
      }
       
     },
     error: (err) => {
       console.log(err)
     }
    })
    
  }

  getSocialLinks() {
    //let socialLinksArray = []
    this.selectedUser$.pipe(take(1)).subscribe((user)=>{
      if(user.user_info != null && user.user_info.socialLinks != null){
      Object.keys(user.user_info.socialLinks).forEach((key)=>{
        this.socialLinksArray.push({socialLink: user.user_info.socialLinks[key], socialType: key})
       
      })
      //console.log(Object.entries(user.user_info.socialLinks))
      
    }
    })

  }

  setWebsites(){
    let websites = []
    this.websitesForm.value.websites.forEach((website)=>{
      websites.push(website.website)
    })
    const userId = this.loggedUser.id
    this.userAboutService.setWebsites(websites, userId).subscribe({
     next: (res)=>{
       //@ts-ignore
       this.loggedUser = res.result 
       this.storageService.saveUser(this.loggedUser)
       this.setSelectedUserStore.dispatch(setSelectedUser({selectedUser: this.loggedUser, myProfileMode: true}))
       console.log(this.loggedUser.user_info)
       
     },
     error: (err) => {
       console.log(err)
     }
    })

  }

  setPhone(){

    const phone = this.phoneForm.value.phone
    const userId = this.loggedUser.id
    this.userAboutService.setPhone(phone, userId).subscribe({
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

  setGender(){
    
    const gender = this.genderForm.value.gender
    const userId = this.loggedUser.id
    this.userAboutService.setGender(gender, userId).subscribe({
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

  setBirthDate(){
    
    const birthDate = this.birthDateForm.value.birthDate
    const userId = this.loggedUser.id
    this.userAboutService.setBirthDate(birthDate, userId).subscribe({
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

  

  setLanguage(){
    const language = this.languageForm.value.language
    const userId = this.loggedUser.id
    this.userAboutService.setLanguage(language, userId).subscribe({
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

  setInterestedIn(){
    const interestedIn = this.interestedInForm.value.interestedIn
    const userId = this.loggedUser.id
    this.userAboutService.setInterestedIn(interestedIn, userId).subscribe({
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

  setEmail(){

    const email = this.emailForm.value.email
    const userId = this.loggedUser.id
    this.userAboutService.setEmail(email, userId).subscribe({
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
