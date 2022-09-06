import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { FormsModule } from '@angular/forms';
import { RegistrationComponent } from './registration/registration.component';
import { RenewPasswordComponent } from './renew-password/renew-password.component';
import { AboutComponent } from './about/about.component';

import { HttpClientModule } from '@angular/common/http';
import { TestCssComponent } from './test-css/test-css.component';
import { UsersComponent } from './users/users.component';
import { SigninComponent } from './signin/signin.component';

import { authInterceptorProviders} from './_helpers/auth.interceptor'
import { EventBusService } from './_shared/event-bus.service';

import { StoreModule } from '@ngrx/store';




import { StartComponent } from './start/start.component';
import { HomepageComponent } from './homepage/homepage.component';
import { PlayComponent } from './play/play.component';
import { ShopComponent } from './shop/shop.component';
import { PeopleComponent } from './people/people.component';
import { AppstoreComponent } from './appstore/appstore.component';


import { ReactiveFormsModule } from '@angular/forms';
import { ProfileComponent } from './profile/profile.component';
import { authReducer } from './_state/auth/auth.reducer';
import { ProfilePostsComponent } from './profile-posts/profile-posts.component';
import { postsReducer } from './_state/posts/posts.reducer';
import { SearchComponent } from './search/search.component';
import { searchResultsReducer } from './_state/search/search.reducer';
import { UserAboutComponent } from './user-about/user-about.component';
import { UserAboutOverviewComponent } from './user-about-overview/user-about-overview.component';
import { UserAboutWorkEducationComponent } from './user-about-work-education/user-about-work-education.component';
import { UserAboutPlacesComponent } from './user-about-places/user-about-places.component';
import { UserAboutFamilyComponent } from './user-about-family/user-about-family.component';
import { UserAboutContactComponent } from './user-about-contact/user-about-contact.component';
import { UserAboutDetailsComponent } from './user-about-details/user-about-details.component';
import { setSelectedUserReducer } from './_state/user/user.reducer';
import { setFriendsStatusReducer } from './_state/people/friends.status.reducer';
import { AllFriendsComponent } from './people-all-friends/all-friends/all-friends.component';
import { SentRequestsComponent } from './people-sent-reqs/sent-requests/sent-requests.component';
import { FriendRequestsComponent } from './people-friend-reqs/friend-requests/friend-requests.component';
import { BirthdaysComponent } from './people-birthdays/birthdays/birthdays.component';
import { SuggestionsComponent } from './people-suggestions/suggestions/suggestions.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProfileFriendsComponent } from './profile-friends/profile-friends.component';
import { HomepageDirective } from './homepage/homepage.directive';
import { timelineReducer } from './_state/posts/timeline.reducer';
import { ChatAppComponent } from './chat-app/chat-app.component';






@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    RegistrationComponent,
    RenewPasswordComponent,
    AboutComponent,
    TestCssComponent,
    UsersComponent,
    SigninComponent,
    StartComponent,
    HomepageComponent,
    PlayComponent,
    ShopComponent,
    PeopleComponent,
    AppstoreComponent,
    ProfileComponent,
    ProfilePostsComponent,
    SearchComponent,
    UserAboutComponent,
    UserAboutOverviewComponent,
    UserAboutWorkEducationComponent,
    UserAboutPlacesComponent,
    UserAboutFamilyComponent,
    UserAboutContactComponent,
    UserAboutDetailsComponent,
    AllFriendsComponent,
    SentRequestsComponent,
    FriendRequestsComponent,
    BirthdaysComponent,
    SuggestionsComponent,
    ProfileFriendsComponent,
    HomepageDirective,
    ChatAppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    StoreModule.forRoot({}),
    StoreModule.forFeature('user', authReducer),
    StoreModule.forFeature('posts', postsReducer),
    StoreModule.forFeature('searchResults', searchResultsReducer),
    StoreModule.forFeature('selectUser', setSelectedUserReducer),
    StoreModule.forFeature('friendsStatus', setFriendsStatusReducer),
    StoreModule.forFeature('timeline', timelineReducer),
    BrowserAnimationsModule

  ],
  providers: [authInterceptorProviders, EventBusService,
  
 ],

  bootstrap: [AppComponent]
})
export class AppModule { }
