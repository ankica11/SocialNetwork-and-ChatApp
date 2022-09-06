import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { User } from '../models/user';
import { UserService } from '../user.service';
import { AuthService } from '../_services/auth.service';
import { StorageService } from '../_services/storage.service';
import { EventBusService } from '../_shared/event-bus.service';
import { Store } from '@ngrx/store';



import { selectIsLogged, State } from '../_state/auth/auth.reducer';
import { login } from '../_state/auth/auth.actions';
import { SelectUserState } from '../_state/user/user.reducer';
import { setSelectedUser } from '../_state/user/user.actions';





@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;
  authorities: string[];
  toRemeber: boolean = true
  form: any = {
    username: null,
    password: null,
    toRemeber: true
  };

  isLogged$: Observable<boolean>
  error_msg: string = '';
  user: User;
  msg: string = '';
  failed_pass = false;
  failed_username = false;
  isFailed: boolean = this.failed_pass || this.failed_username;
  eventBusSub? : Subscription

  constructor(
    private router: Router,
    private userService: UserService,
    private authService: AuthService,
    private storageService: StorageService,
    private store:Store<State>,
    private setSelectedUserStore: Store<SelectUserState>
  ) {
  }
  
  ngOnInit(): void {
    
    this.isLogged$=this.store.select(selectIsLogged)
    this.user = this.storageService.getUser()
    this.setSelectedUserStore.dispatch(setSelectedUser({selectedUser: this.user, myProfileMode: true}))

   
    
  }
 
  
  onSubmit() {
    const { username, password } = this.form;
    this.authService.signin(username, password).subscribe({
      next: (res) => {
        //this.storageService.saveJWToken(res.accessToken)
        this.storageService.saveUser(res.user);
        //this.storageService.saveRefreshToken(res.refreshToken);
        this.msg = res.message;
        this.user = res.user;

        this.store.dispatch(login({user:this.user}))
        this.setSelectedUserStore.dispatch(setSelectedUser({selectedUser: this.user, myProfileMode: true}))
        this.isFailed = false;
        this.router.navigate(['start']);

      },
      error: (err: HttpErrorResponse) => {
        //server validation error
        if (err.status == 400) {
          //with err.error we get the error body sent in res
          if (err.error.message.type == 'username') {
            this.failed_username = true;
          }
          if (err.error.message.type == 'password') {
            this.failed_pass = true;
          }
          this.error_msg = err.error.message.msg_text;
          this.isFailed = true;
          return;
        }
        //logic error not found username invalid password
        this.error_msg = err.error.message;
        this.isFailed = true;
        this.failed_pass = true;
        this.failed_username = true;
      },
    });
  }


  change_info() {
    this.userService.change_info().subscribe((res) => {
      alert(res['message']);
    });
  }

  login_facebook() {}
  login_twitter() {}

  forgotten_password() {}

  sign_up() {
    //navigate to registration page
    this.router.navigate(['/signUp'])
  }

  about(){
    this.router.navigate(['about'])
  }
}
