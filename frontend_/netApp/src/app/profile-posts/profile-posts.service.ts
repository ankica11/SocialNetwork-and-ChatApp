import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../models/post';

export enum ReactionType{
  LIKE = 0,
  HEART = 1,
  LAUGH = 2,
  CRY = 3,
  ANGRY = 4,
  NEUTRAL = 5,
  BORING = 6,
  WOW = 7,
  MIDDLE_FINGER = 8,
  NONE = 9

}
@Injectable({
  providedIn: 'root'
})

export class ProfilePostsService {
  
  http_uri = "http://localhost:3000/api/posts"
  https_uri = "https://localhost:4000/api/posts"

  http_options = {headers: new HttpHeaders({'Content-Type': 'application/json'})}

  constructor(private http: HttpClient) { }

  getCommentsAndReactions(postId){
    const req = {
      postId: postId
    }
    return this.http.post(`${this.http_uri}/getCommentsAndReactions`, req, this.http_options)

  }

  getTimeline(loggedUserId){
    const req = {
      loggedUserId: loggedUserId
    }
    return this.http.post(`${this.http_uri}/getTimeline`, req, this.http_options)

  }

  addComment(userId, postId, commentText){
    const req = {
      postId: postId,
      userId: userId,
      commentText: commentText
    }

    return this.http.post(`${this.http_uri}/addComment`, req, this.http_options)

  }

  addReaction(userId, postId, reactionType){
    const req = {
      postId: postId,
      userId: userId,
      reaction: reactionType
    }

    return this.http.post(`${this.http_uri}/addReaction`, req, this.http_options)

  }

  getReaction(userId, postId){
    const req = {
      postId: postId,
      userId: userId
    }

    return this.http.post(`${this.http_uri}/getReaction`, req, this.http_options)

  }

  addPost(post: Post, userId, postImage: File):Observable<any>{
    const req = {
      userId: userId,
      postText: post.text,
      audience: post.audience,
      link: post.link,
      photo: post.photo,

    }

    const formData: FormData = new FormData()
    console.log(postImage)
    if(postImage){
    formData.append('image', postImage, userId + '_post_' + new Date().getTime().toString() + '.jpg')
    }
    formData.append('userId', userId)
    formData.append('postText', post.text)
    formData.append('audience', post.audience)
    

    return this.http.post(`${this.http_uri}/addPost`,formData)



  }

  getAll(userId):Observable<any>{
    const req = {
      userId: userId
    }
    return this.http.post(`${this.http_uri}/getAll`, req, this.http_options)
  }

  postPhotoPreview(event: any, photo: File): string{
    
    photo = event.target.files[0]
    let preview = ''
    
    if (photo) {
      
     
        const reader = new FileReader();
        reader.onload = (e: any) => {
          
          preview = e.target.result
        };
        reader.readAsDataURL(photo);
      
    }

    return preview

  }


}
