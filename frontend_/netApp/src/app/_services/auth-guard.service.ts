import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { selectIsLogged, State } from '../_state/auth/auth.reducer';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{
  isLogged$:Observable<boolean>
  constructor(
    private router: Router,
    private store: Store<State>,
    private storageService: StorageService
  ) { 
    this.isLogged$ = this.store.select(selectIsLogged)
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
         const loggedUser=this.storageService.getUser()
         if(Object.keys(loggedUser).length ==0){
          console.log('oces kurac')
          this.router.navigate(['/'])
          return false
         }
         //console.log(loggedUser)
         return true
  }
}
