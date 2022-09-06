import { Component, OnInit } from '@angular/core';
import { ViewChild} from '@angular/core';
import {  ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { forkJoin, map, Observable, take, tap } from 'rxjs';
import { Friendship } from '../models/friendship';
import { Post } from '../models/post';
import { Reaction } from '../models/reaction';
import { User } from '../models/user';
import { PeopleService } from '../people/people.service';
import { UserService } from '../user.service';
import { StorageService } from '../_services/storage.service';
import { FriendsStatusState, selectFriendsStatus, Status } from '../_state/people/friends.status.reducer';
import { addPost, getUserPosts } from '../_state/posts/posts.actions';
import { PostState, selectUserPosts } from '../_state/posts/posts.reducer';
import { addPostToTimeline } from '../_state/posts/timeline.actions';
import { TimelineState } from '../_state/posts/timeline.reducer';
import { SearchResultsState } from '../_state/search/search.reducer';
import { setSelectedUser } from '../_state/user/user.actions';
import { selectMyProfileMode, selectUser, SelectUserState } from '../_state/user/user.reducer';
import { getFriendStatus, progressBar } from './helper';
import { ProfilePostsService, ReactionType } from './profile-posts.service';



@Component({
  selector: 'app-profile-posts',
  templateUrl: './profile-posts.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./profile-posts.component.css']
})
export class ProfilePostsComponent implements OnInit {

  
  pics=["https://randomuser.me/api/portraits/women/9.jpg","https://randomuser.me/api/portraits/women/10.jpg","https://randomuser.me/api/portraits/women/11.jpg","https://randomuser.me/api/portraits/women/12.jpg","https://randomuser.me/api/portraits/women/13.jpg","https://randomuser.me/api/portraits/women/14.jpg","https://randomuser.me/api/portraits/women/15.jpg","https://randomuser.me/api/portraits/women/16.jpg","https://randomuser.me/api/portraits/women/17.jpg"]
  friends_=["https://randomuser.me/api/portraits/men/9.jpg","https://randomuser.me/api/portraits/men/10.jpg","https://randomuser.me/api/portraits/men/22.jpg","https://randomuser.me/api/portraits/men/12.jpg","https://randomuser.me/api/portraits/men/13.jpg","https://randomuser.me/api/portraits/women/14.jpg","https://randomuser.me/api/portraits/women/15.jpg","https://randomuser.me/api/portraits/women/16.jpg","https://randomuser.me/api/portraits/women/17.jpg"]

  closeResult: string;
  post: string =''
  audience: string='public'
  posts$: Observable<Post[]>
  loggedUser: User
  selectedUser$: Observable<User>
  selectedUser: User
  postForm: FormGroup
  initialPostForm: any
  myProfileMode$: Observable<boolean>
  myReactions: ReactionType[] = []
  allReactions: ReactionType[] []
  friends: User[]= []
  postImage: File | null = null
  postImagePreview: string = ''
  selectedReactions: Reaction[] = []
  friendStatus: Status[] = []
  selectedUsers: any[] = []
  userImages: string[] = []
  friendStatus$: Observable<Status> 


  isCollapsed: boolean[] = []
  constructor(private modalService: NgbModal,
              private activatedRoute: ActivatedRoute,
              private userService: UserService,
              private storageService: StorageService,
              private postService: ProfilePostsService,
              private postStore: Store<PostState>,
              private timelineStore: Store<TimelineState>,
              private formBuilder: FormBuilder,
              private setSelectedUserStore: Store<SelectUserState>,
              private peopleService: PeopleService,
              private friendsStatusStore: Store<FriendsStatusState>) {
 
                this.postForm = this.formBuilder.group({
                  postText:['', Validators.compose([Validators.required, Validators.maxLength(300)])],
                  audience:new FormControl('public')
                })
                this.initialPostForm = this.postForm.value
              }

  ngOnInit(): void {

    this.loggedUser = this.storageService.getUser()
    this.selectedUser$ = this.setSelectedUserStore.select(selectUser)
    this.myProfileMode$ = this.setSelectedUserStore.select(selectMyProfileMode)
    this.activatedRoute.parent.paramMap.subscribe(params => {
      
      const username = params.get('username')
      //get user from db with all its posts
      this.userService.getUserByUsername(username).subscribe({
        next: (res) => {
            //@ts-ignore
            this.selectedUser = res.user
            const profileMode = (this.selectedUser.id == this.loggedUser.id)
            
            this.setSelectedUserStore.dispatch(setSelectedUser({selectedUser: this.selectedUser, myProfileMode: profileMode}))
            //console.log(this.selectedUser)
            let posts: Post[] =res['user'].posts
            if(!profileMode){
              posts = posts.filter(post => post.audience != 'private')
              this.friendsStatusStore.select(selectFriendsStatus).pipe(take(1),
              tap(status=>{
                if(status != Status.FRIENDS){
                  posts = posts.filter(post=> post.audience == 'public')
                }

              }))


            }
            
            //@ts-ignore
            this.postStore.dispatch(getUserPosts({posts:posts}))
            this.posts$ = this.postStore.select(selectUserPosts)
            //@ts-ignore
            this.getMyReactions(posts)
            //@ts-ignore
            this.getUsersPhotos(posts)
            //@ts-ignore
            let n = posts.length
            this.isCollapsed.length = n
            this.isCollapsed.fill(true)
            //@ts-ignore
           // console.log(res.user.posts)
           this.peopleService.getFriends(this.selectedUser.id).subscribe({
            next: (res)=>{
              for(let i=0; i<res.friendships.length; i++){
                const friendship = res.friendships[i]
                if(friendship.senderFriendId == this.selectedUser.id){
                  this.friends.push(friendship.receiverFriend)
                  
                }
                if(friendship.receiverFriendId == this.selectedUser.id){
                  this.friends.push(friendship.senderFriend)
                }

                

              }
             
              this.friends.sort((a, b) => a.name > b.name ? 1 : a.name < b.name ? -1 : 0)
            },
            error: (err)=>{
              console.log(err.message)
            }
      
          })
           
            
        },
        error: (err)=>{
          console.log(err)
        }
      })
    })
    
    /*this.selectedUser$ = this.searchResultsStore.select(selectUser)
    this.searchResultsStore.select(selectUser).subscribe(user=>{
      if(user != null){
      this.postService.getAll(user.id).subscribe({
        next: (res)=>{
          this.postStore.dispatch(getUserPosts({posts:res.myPosts}))
          this.posts$ = this.postStore.select(selectUserPosts)
        }
      })
    }
    })*/
    

   
  }

  getUsersPhotos(posts: Post[]){
    this.userImages=posts.filter(post => post.photo != null).map(item => item.photo)

  }

  get ReactionType() {
    return ReactionType
  }

  openBackDropCustomClass(content) {
    this.modalService.open(content, {backdropClass: 'white-backdrop', centered: true, modalDialogClass: 'custom-modal'});
    
    const textarea = document.querySelector('textarea')
    textarea.addEventListener('keyup', (ev)=>{
      //@ts-ignore
      let num_of_char = ev.target.value.length
     const progressVal = (num_of_char/300)*100
      progressBar(progressVal, num_of_char)
    })
    
  }

  addPost(){
    const payload = this.postForm.value
    //alert(JSON.stringify(payload))
    this.modalService.dismissAll()
    let post = new Post()
    post.audience = payload.audience
    post.text = payload.postText
    
    this.postService.addPost(post, this.selectedUser.id, this.postImage).subscribe({
      next: (res) => {
        this.postStore.dispatch(addPost({newPost: res.addedPost}))
        if(res.addedPost.photo){
        this.userImages.push(res.addedPost.photo)
        }
        if(res.addedPost.audience != 'private'){
          let newPost = {}
          newPost['id'] = res.addedPost.id
          newPost['created_at'] = res.addedPost.created_at
          newPost['text'] = res.addedPost.text
          newPost['photo'] = res.addedPost.photo
          newPost['link'] = res.addedPost.link
          newPost['auidence'] = res.addedPost.audience
          newPost['username']=this.loggedUser.username
          newPost['name'] = this.loggedUser.name
          newPost['avatar'] =this.loggedUser.avatar
          console.log(newPost)
          this.timelineStore.dispatch(addPostToTimeline({newPost: newPost}))
        }
        this.postForm.reset(this.initialPostForm)
        //console.log(res.addedPost)
        this.posts$.subscribe((posts)=>{
          this.myReactions = []
          this.getMyReactions(posts)
          
        })
      },
      error: (err)=>{
        console.log(err)
      }
    })
    
  }

  getPostImagePreview(event){
    this.postImage = event.target.files[0]
    //console.log(this.postImage)
    this.postImagePreview = ''
    
    if (this.postImage) {
      
     
        const reader = new FileReader();
        reader.onload = (e: any) => {
          
          this.postImagePreview = e.target.result
          //console.log(preview)
        };
        reader.readAsDataURL(this.postImage);
      
    }

   

  }

  get Status(){
    return Status
  }


  checkFriendsStatus(reactions: Reaction[]){
    let reactionsBatch = reactions.map(reaction =>{
      return this.peopleService.checkFriendsStatus(this.loggedUser.id, reaction.user.id).pipe(
        map(res=>{
            return{
              user: reaction.user,
              status: reaction.user.id == this.loggedUser.id ? null : getFriendStatus(res.res, this.loggedUser),
              reaction: reaction.reaction
            }
        })
      )
    })
    forkJoin(reactionsBatch).subscribe((val)=>this.selectedUsers=val)
  }

  openReactionModal(longContent) {
    this.modalService.open(longContent, {backdropClass: 'white-backdrop', centered: true, modalDialogClass: 'custom-modal', scrollable: true});
    
   
    
  }
  
  showAllPostReactions(post: Post, longContent){
    this.checkFriendsStatus(post.reactions)
    this.selectedReactions = post.reactions
    this.openReactionModal(longContent)
  }

  showAllComments(post: Post){

  }

  kurcina(){
    console.log(this.isCollapsed)
  }

  postComment(event, post: Post){
    const commentText = event.target.value
    const postId = post.id
    const userId = this.loggedUser.id

    this.postService.addComment(userId, postId, commentText).subscribe({
      next: (res)=>{
        //@ts-ignore
       // console.log(res.result)
        //@ts-ignore
        this.selectedUser$.pipe(take(1)).subscribe((user)=>{
          this.postService.getAll(user.id).subscribe((posts)=>{
            this.postStore.dispatch(getUserPosts({posts: posts.myPosts}))
            this.posts$ = this.postStore.select(selectUserPosts)

          })
        })
        
      },
      error: (err)=>{
        console.log(err.message)
      }
    })

  }

  showReactions(index){
    const reactionContainers = document.getElementsByClassName("like-btn-container")
    const reactionContainer = reactionContainers[index]
    const child = reactionContainer.firstChild
    //@ts-ignore
    child.style.setProperty("--visibility-var","visible")
    

  }

  hideReactions(index){

    const reactionContainers = document.getElementsByClassName("like-btn-container")
    const reactionContainer = reactionContainers[index]
    const child = reactionContainer.firstChild
    //@ts-ignore
    child.style.setProperty("--visibility-var","hidden")

  }

  react(post, type,i){
    
    this.postService.addReaction(this.loggedUser.id, post.id, type).subscribe({
      next: (res)=>{
        this.selectedUser$.pipe(take(1)).subscribe((user)=>{
        this.postService.getAll(user.id).subscribe((posts)=>{
        this.postStore.dispatch(getUserPosts({posts: posts.myPosts}))
        this.posts$ = this.postStore.select(selectUserPosts)
        this.myReactions[i] = type
        })
        })
      },
      error: (err)=>{
        console.log(err.message)
      }
    
    })
  }

  getMyReactions(posts: Post[]){
    posts.forEach(post=>{
      let myReaction = post.reactions.find(item=>item.user.id == this.loggedUser.id)
      if(myReaction == undefined){
        this.myReactions.push(ReactionType.NONE)
      }else{
        this.myReactions.push(myReaction.reaction)
      }
    })

    //console.log(this.myReactions)
    
    


  }

  getAllReactions(post: Post){
    let reactions: ReactionType[] = []
    post.reactions.forEach(react => {
      reactions.push(react.reaction)
    })
    return reactions
  }

  showTooltip(event){
  
    const reaction_number_span = event.target 
    //const reaction_number_span= reaction_number_small.parentElement
    const child = reaction_number_span.lastChild
    child.style.setProperty('visibility', 'visible')
    //console.log(brother)
    
    //@ts-ignore
    

  }

  hideTooltip(event){
    
    const reaction_number_span = event.target 
    //const reaction_number_span= reaction_number_small.parentElement
    const child = reaction_number_span.lastChild
    child.style.setProperty('visibility', 'hidden')
    //console.log(brother)
  }

  getUsersReaction(post: Post){
    let users: string[] = []
    post.reactions.forEach(react=>{
      users.push(react.user.name)
    })
    return users
  }

  calculateTimeLapse(posted_at1){
    const posted_at_ = new Date(posted_at1).getTime() - 2*60*60*1000
    const posted_at = new Date(posted_at_)
    
    
    let time_lapse = 0
    time_lapse = (Date.now() - posted_at.getTime())/1000
    let time_lapse_formated = ''
    if(time_lapse < 60){
      return (Math.round(time_lapse) + 's')
    }
    time_lapse = time_lapse/60
    if(time_lapse < 60){
      return (Math.round(time_lapse)  + 'min')
    }
    time_lapse = time_lapse/60
    if(time_lapse < 24){
      return (Math.round(time_lapse) + 'h')
    }
    time_lapse = time_lapse/24
    if(time_lapse < 7){
      return (Math.round(time_lapse)  + 'd')
    }
    time_lapse = time_lapse/7
    if(time_lapse < 4){
      return (Math.round(time_lapse)  + 'w')
    }
    time_lapse = time_lapse/4
    if(time_lapse < 12){
      return (Math.round(time_lapse)  + 'm')
    }
    time_lapse = time_lapse/12
    return (Math.round(time_lapse) + 'y')


  }

  

}
