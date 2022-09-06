import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { selectMyProfileMode, SelectUserState } from '../_state/user/user.reducer';

@Component({
  selector: 'app-user-about',
  templateUrl: './user-about.component.html',
  styleUrls: ['./user-about.component.css']
})
export class UserAboutComponent implements OnInit {
  myProfileMode$: Observable<boolean>
  constructor(
    private setSelectedUserStore: Store<SelectUserState>
  ) { }

  ngOnInit(): void {
    this.myProfileMode$ = this.setSelectedUserStore.select(selectMyProfileMode)
    let items = document.querySelectorAll('.sidebar-nav-link')
    items.forEach(item => {
      item.addEventListener('click', ()=> {
         
        
        items.forEach(item2=>{
        
        item2.classList.remove('active')
        
        })

        item.classList.add('active')

        


      })
    })
  }

}
