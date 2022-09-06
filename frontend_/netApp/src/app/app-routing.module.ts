import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { AppstoreComponent } from './appstore/appstore.component';
import { ChatAppComponent } from './chat-app/chat-app.component';
import { HomeComponent } from './home/home.component';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './login/login.component';
import { AllFriendsComponent } from './people-all-friends/all-friends/all-friends.component';
import { BirthdaysComponent } from './people-birthdays/birthdays/birthdays.component';
import { FriendRequestsComponent } from './people-friend-reqs/friend-requests/friend-requests.component';
import { SentRequestsComponent } from './people-sent-reqs/sent-requests/sent-requests.component';
import { SuggestionsComponent } from './people-suggestions/suggestions/suggestions.component';
import { PeopleComponent } from './people/people.component';
import { PlayComponent } from './play/play.component';
import { ProfileFriendsComponent } from './profile-friends/profile-friends.component';
import { ProfilePostsComponent } from './profile-posts/profile-posts.component';
import { ProfileComponent } from './profile/profile.component';
import { RegistrationComponent } from './registration/registration.component';
import { RenewPasswordComponent } from './renew-password/renew-password.component';
import { SearchComponent } from './search/search.component';
import { ShopComponent } from './shop/shop.component';
import { StartComponent } from './start/start.component';
import { TestCssComponent } from './test-css/test-css.component';
import { UserAboutContactComponent } from './user-about-contact/user-about-contact.component';
import { UserAboutDetailsComponent } from './user-about-details/user-about-details.component';
import { UserAboutFamilyComponent } from './user-about-family/user-about-family.component';
import { UserAboutOverviewComponent } from './user-about-overview/user-about-overview.component';
import { UserAboutPlacesComponent } from './user-about-places/user-about-places.component';
import { UserAboutWorkEducationComponent } from './user-about-work-education/user-about-work-education.component';
import { UserAboutComponent } from './user-about/user-about.component';
import { UsersComponent } from './users/users.component';
import { AuthGuardService as AuthGuard } from './_services/auth-guard.service';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'signUp', component: RegistrationComponent},
  {path: 'renew_password', component: RenewPasswordComponent},
  {path: 'about', component: AboutComponent},
  {path: 'test_css', component: TestCssComponent},
  {path: 'users', component: UsersComponent, canActivate: [AuthGuard]},
  {path: 'start', component: StartComponent,
  children:[
    { path: '', redirectTo: 'home', pathMatch: 'full' },
        {
          path: 'chat',
          component: ChatAppComponent
        },
  
        {
          path: 'home',
          component: HomepageComponent
        },
        {
          path: 'play',
          component: PlayComponent
        },
        {
          path: 'shop',
          component: ShopComponent
        },
        {
          path: 'people',
          component: PeopleComponent,
          children: [
            {path: '', redirectTo: 'friends', pathMatch: 'full'},
            {path: 'friends', component: AllFriendsComponent},
            {path: 'sentRequests', component: SentRequestsComponent},
            {path: 'friendRequests', component: FriendRequestsComponent},
            {path: 'birthdays', component: BirthdaysComponent},
            {path: 'suggestions', component: SuggestionsComponent}
          ]
        },
        {
          path: 'app_store',
          component: AppstoreComponent
        },
        {
          path: 'search',
          component: SearchComponent
        },
        {
          path: 'profile/:username',
          component: ProfileComponent,
          children: [
            { path: '', redirectTo: 'posts', pathMatch: 'full' },

            {
              path: 'posts',
              component: ProfilePostsComponent
            },
            {
              path: 'friends',
              component: ProfileFriendsComponent
            },
            {
              path: 'about',
              component: UserAboutComponent,
              children: [
                { path: '', redirectTo: 'overview', pathMatch: 'full' },
    
                {
                  path: 'overview',
                  component: UserAboutOverviewComponent
                },
                {
                  path: 'work_education',
                  component: UserAboutWorkEducationComponent
                },
                {
                  path: 'places',
                  component: UserAboutPlacesComponent
                },
                {
                  path: 'contact_basic_info',
                  component: UserAboutContactComponent
                },
                {
                  path: 'family_relationships',
                  component: UserAboutFamilyComponent
                },
                {
                  path: 'details',
                  component: UserAboutDetailsComponent
                }
    
              ]
            }
          ]
        }

       
        
      ]

    },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
