import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AuthService } from './_services/auth.service';
import { StorageService } from './_services/storage.service';
import { EventBusService } from './_shared/event-bus.service';
import { logout } from './_state/auth/auth.actions';
import { State } from './_state/auth/auth.reducer';
import { setSelectedUser } from './_state/user/user.actions';
import { SelectUserState } from './_state/user/user.reducer';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'netApp';

  eventBusSub?:Subscription

  constructor(private eventBusService: EventBusService,
              private storageService: StorageService,
              private store:Store<State>,
              private authService: AuthService,
              private selectedUserStore: Store<SelectUserState>,
              private router: Router){}

  ngOnInit(): void {
    this.authService.gettingExistingUserSession().subscribe({
      next: (res)=>{
        this.storageService.saveUser(res.user)
        this.selectedUserStore.dispatch(setSelectedUser({selectedUser: res.user, myProfileMode: true}))
        this.router.navigate(['start'])

      },
      error: (err)=>{
        console.log(err.message)
      }
    })
    this.eventBusSub =  this.eventBusService.on("logout", (data)=>{
      //console.log("duvaj gaaaa")
      //alert(JSON.stringify(data))
      if(this.router.url !== '/'){
        alert("Your session has expired. You need to sign in.")
      }
      this.storageService.signOut()
      this.store.dispatch(logout())
      this.router.navigate(['/'])
      
      
    })
  }

  ngOnDestroy(){
    alert('kurcina')
    if(this.eventBusSub){
      this.eventBusSub.unsubscribe()
    }
    console.log("destroyed login component")
    this.authService.goOffline(this.storageService.getUser().id).subscribe({
      next: (res) => {
        console.log(res['result'])
      },
      error: (err) => {
        console.log(err.message)
      }
    })
  }

  @HostListener('window:beforeunload', ['$event'])
  beforeunloadHandler(event) {
    console.log("destroyed login component")
    this.authService.goOffline(this.storageService.getUser().id).subscribe({
      next: (res) => {
        console.log(res['result'])
      },
      error: (err) => {
        console.log(err.message)
      }
    })
    
}

  

 
}
