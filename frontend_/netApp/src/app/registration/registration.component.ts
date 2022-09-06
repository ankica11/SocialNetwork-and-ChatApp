import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { map, Subscription } from 'rxjs';
import { AuthService } from '../_services/auth.service';
import { EventBusService } from '../_shared/event-bus.service';
import { checkConfirmPassword, checkPasswordStrength, showError, successSignup } from './helper';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  
  focused: boolean = false
  signupForm: FormGroup
  hidden:boolean=true
  hidden2:boolean=true
  disabled:boolean=true
  message: string = ''
  success:boolean = false

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) { 
    this.signupForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      username: ['', [Validators.required], [this.usernameValidator()]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    let signUpDOM = document.getElementById('signUp')

    signUpDOM.style.setProperty('--opacityVar', '0')
    signUpDOM.style.setProperty('--blur', 'blur(0px)')
    

    const signup = document.querySelector("#signupForm")
    
    
    signup.addEventListener('input', (ev)=>{
      //@ts-ignore
      switch(ev.target.id){
        case 'password':
          checkPasswordStrength(ev.target)
          break
        case 'confirmPassword':
          this.disabled=checkConfirmPassword(ev.target)
          break


        
      }
    })

    /*show_pass.addEventListener('click', (event)=>{
      event.stopPropagation()
      const password = show_pass.parentElement.querySelector('input')
      password.setAttribute('type', 'text')

    })*/


    
    
  }

  addImage(){
    alert("new avatar")
  }

  setFocus(){
    this.focused=true
    let signUpDOM = document.getElementById('signUp')
    signUpDOM.style.setProperty('--opacityVar', '0.8')
    signUpDOM.style.setProperty('--blur', 'blur(8px)')
  

  }

  toggle(id){
    let type=''
    const password = document.querySelector(`#${id}`)
    switch(id){
      case 'password':
        this.hidden = !this.hidden
        type=this.hidden? 'password' : 'text'
        break;
      case 'confirmPassword':
        this.hidden2 = !this.hidden2
        type=this.hidden2? 'password' : 'text'
    }
 
    password.setAttribute('type', type)


  }

  onSubmit(){
    const payload = {
      name: this.signupForm.value.firstName + ' ' + this.signupForm.value.lastName,
      email: this.signupForm.value.email,
      username: this.signupForm.value.username,
      password: this.signupForm.value.password,
      confirmPassword: this.signupForm.value.confirmPassword
    }
    this.authService.signup(payload).subscribe({
      next: (res)=>{
        this.success=true
        successSignup()
       
      },
      error: (err: HttpErrorResponse)=>{
        this.success=false
        //console.log(err)
        if(err.status == 400){
          //server side validation error
          this.message = err.error.message.msg_text
          showError(err.error.message.type, this.message, 400)
        }else if(err.status == 405){
          //username already exists
          showError('username', err.error.message, 405)
        }else{
          console.log(err.error.message)
        }
      }
    })
   
  
  }


  


/** A hero's name can't match the given regular expression */
usernameValidator(): AsyncValidatorFn {
  //@ts-ignore
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    let alreadyExists: boolean = false
    return this.authService.validateUsername(control.value).pipe(
      map(res=>{
       // console.log(res.exists)
        return ((res.exists==true) ? {'usernameExists':true} : null)
      })
    )
    
 
  };
}
    
   
  


 






}
