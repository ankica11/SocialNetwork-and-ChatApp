import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpRequest,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { HttpInterceptor } from '@angular/common/http';
import { Injectable } from '@angular/core';

import {
  BehaviorSubject,
  catchError,
  filter,
  Observable,
  switchMap,
  take,
  throwError,
} from 'rxjs';
import { AuthService } from '../_services/auth.service';
import { StorageService } from '../_services/storage.service';
import { EventBusService } from '../_shared/event-bus.service';
import { EventData } from '../_shared/events';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  TOKEN_AUTH_HEADER_KEY = 'x-access-token';
  REFRESH_TOKEN_HEADER_KEY = 'x-refresh-token';
  tokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  pendingRefreshing = false;
  constructor(
    private storageService: StorageService,
    private authService: AuthService,
    private eventBusService: EventBusService
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let authReq = req;

    console.log('intercepting', req.url);
    //const token = this.storageService.getToken()

    /*if(token != null){
        //clones the original http request object and adds additional fields, updates the request
        authReq = req.clone({headers: req.headers.set(this.TOKEN_AUTH_HEADER_KEY, token)})
        }*/

    //scenario 2. sending token with cookies we receive token inside set cookie header from server
    //and then we need to send cookie back to server with every http request

    //sending existing cookies with access token to server to verifies them
    authReq = req.clone({
      withCredentials: true,
    });
    //we need to interceptor intercepts response cause we want to watch if access token is expired
    //that will happen if status code is 401 and in that case we want to
    //create completely new http stream to /api/auth/refreshToken to generate new access token
    //if posiible without user's knowledge cuz we don't want to bother him with that
    //only if refreshToken is expired/user session expires we will notify user and
    //forcely sign him out
    return next.handle(authReq).pipe(
      //@ts-ignore
      catchError((err) => {
        //console.log(authReq.url.includes('/auth/refreshToken'))
        //if refreshToken routes or signin routes throw 401 error we don't want to invoke renewing access token
        if (
          err instanceof HttpErrorResponse &&
          err.status == 401 &&
          !authReq.url.includes('refreshToken') &&
          !authReq.url.includes('signin')
        ) {
          console.log('access token expired');
          //handling on special way 401 errors which are caused by access token expiaration or alteration error
          return this.getNewAccessToken(authReq, next);
        }

        //if error isn't 401 we'll just gonna throw it to sunscribers
        return throwError(() => new HttpErrorResponse(err));
      })
    );
  }

  private getNewAccessToken(req: HttpRequest<any>, next: HttpHandler) {
    //creating new http stream to endpoint /api/auth/refreshToken
    //sending in request object refresh token
    //waiting for new access token to be generated or error to be thrown
    //if new access token is generated then interceptor will resend the initial request
    //that caused the error, to initial stream and invoke next handler in line
    //of http stream and next handler in this case is http client
    //so user will get the content w/o even knowing of this process
    console.log(this.pendingRefreshing)
    if (!this.pendingRefreshing) {
      //if refreshing token isnt happening and there are no available access tokens then go get one
      this.pendingRefreshing = true;
      this.tokenSubject.next(null);
      console.log('refreshing the access token');
      return this.authService.refreshToken().pipe(
        switchMap((res: any) => {
          //will new access token be saved in cookies???
          console.log('switch map');
          this.pendingRefreshing = false;
          this.tokenSubject.next(res);
          //needs to return an observable
          return next.handle(this.addCookie(req));
        }),
        catchError((err) => {
          //will occured if refresh token expired
          //forcely sign out
          this.pendingRefreshing=false
          console.log('refresh-token expired or altered or not provided');
          //alert('destroying the session...');
          //wmitting logout event
          this.eventBusService.emit(new EventData("logout", {data:'logout data'}))
          //emitting logout event 
          //this.authService.signout();
          console.log(err.message)
          return throwError(() => err);
        })
      );
    }
    //refreshing token is in progress so we need to wait the one to be ready
    return this.tokenSubject.pipe(
      filter((res) => res != null),
      take(1),
      switchMap((res: any) => {
        return next.handle(this.addCookie(req));
      })
    );

    //invoking again the next handler to send the request to initial http stream
  }

  private addCookie(req: HttpRequest<any>) {
    console.log('adding the cookie');
    return req.clone({ withCredentials: true });
  }
}

export const authInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
];
