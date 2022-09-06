import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserSession } from '../models/userSession';

@Injectable({
  providedIn: 'root'
})
export class PeopleService {

  http_uri = "http://localhost:3000/api/friends"
  https_uri = "https://localhost:4000/api/friends"

  http_options = {headers: new HttpHeaders({'Content-Type': 'application/json'})}


  constructor(private http: HttpClient) { }

  getActiveStatus(userSession :UserSession){

    if(userSession == null){
      return 'unknown'
    }
    const posted_at_ = new Date(userSession.lastAccessedAt).getTime()
    const posted_at = new Date(posted_at_)
    if(userSession.online){
      return 'online'
    }
    let time_lapse = 0
    time_lapse = (Date.now() - posted_at.getTime())/1000
    let time_lapse_formated = ''
    if(time_lapse < 60){
      return (Math.round(time_lapse) + 's')
    }
    time_lapse = time_lapse/60
    if(time_lapse < 60){
      return (Math.round(time_lapse)  + 'm')
    }
    time_lapse = time_lapse/60
    if(time_lapse < 24){
      return (Math.round(time_lapse) + 'h')
    }
    time_lapse = time_lapse/24
    if(time_lapse < 2){
      return (Math.round(time_lapse)  + 'd')
    }else{
      return 'unknown'
    }


  }

  getFriendsOfFriends(userId): Observable<any>{

    const req = {
      userId: userId
    }
    return this.http.post(`${this.http_uri}/getFOF`, req, this.http_options)

  }

  getSuggestions(userId):Observable<any>{
    const req = {
      userId: userId
    }
    return this.http.post(`${this.http_uri}/getSuggestions`, req, this.http_options)


  }

  deleteRequest(requestId):Observable<any>{
    const req = {
      requestId: requestId
    }
    return this.http.post(`${this.http_uri}/deleteRequest`, req, this.http_options)


  }

  acceptRequest(loggedUserId, userId):Observable<any>{
    const req = {
      loggedUserId: loggedUserId,
      userId: userId
    }
    return this.http.post(`${this.http_uri}/acceptRequest`, req, this.http_options)


  }

  denyRequest(loggedUserId, userId):Observable<any>{
    const req = {
      loggedUserId: loggedUserId,
      userId: userId
    }
    return this.http.post(`${this.http_uri}/denyRequest`, req, this.http_options)


  }



  addFriend(id_sender, id_receiver):Observable<any>{
    const req = {
      senderId: id_sender,
      receiverId: id_receiver
    }
    return this.http.post(`${this.http_uri}/addFriend`, req, this.http_options)


  }

  getFriends(id):Observable<any>{

    const req = {
      userId: id
    }
    return this.http.post(`${this.http_uri}/getFriends`, req, this.http_options)

  }

  getSentRequests(id): Observable<any>{
    const req = {
      userId: id
    }
    return this.http.post(`${this.http_uri}/getSentRequests`, req, this.http_options)
  }

  checkFriendsStatus(loggedUserId, userId): Observable<any>{

    const req = {
      loggedUserId: loggedUserId,
      userId: userId
    }
    return this.http.post(`${this.http_uri}/checkFriendsStatus`, req, this.http_options)

  }

  getFriendRequests(id): Observable<any>{
    const req = {

      userId: id

    }

    return this.http.post(`${this.http_uri}/getFriendRequests`, req, this.http_options)
 
  }

  getFriends_(user, friends, selectedUser=null){
    this.getFriends(user.id).subscribe({
      next: (res)=>{
       
        for(let i=0; i<res.friendships.length; i++){
          const friendship = res.friendships[i]
          if(friendship.senderFriendId == user.id){
            friends.push(friendship.receiverFriend)
            
          }
          if(friendship.receiverFriendId == user.id){
            friends.push(friendship.senderFriend)
          }

          

        }
        
        friends.sort((a, b) => a.name > b.name ? 1 : a.name < b.name ? -1 : 0)
        selectedUser = friends[0]
        
      },
      error: (err)=>{
        console.log(err.message)
      }

    })

  }
}
