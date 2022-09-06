import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { forkJoin, map, Observable } from 'rxjs';
import { Post } from '../models/post';
import { Reaction } from '../models/reaction';
import { User } from '../models/user';
import { UserSession } from '../models/userSession';
import { PeopleService } from '../people/people.service';
import { getFriendStatus, progressBar } from '../profile-posts/helper';
import { ProfilePostsService, ReactionType } from '../profile-posts/profile-posts.service';
import { UserService } from '../user.service';
import { StorageService } from '../_services/storage.service';
import { FriendsStatusState, Status } from '../_state/people/friends.status.reducer';
import { addPost, getUserPosts } from '../_state/posts/posts.actions';
import { PostState, selectUserPosts } from '../_state/posts/posts.reducer';
import { addPostToTimeline, setTimelinePosts } from '../_state/posts/timeline.actions';
import { selectTimeline, TimelineState } from '../_state/posts/timeline.reducer';
import { io} from 'socket.io-client'

const SOCKET_ENDPOINT = 'localhost:3000'

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  loggedUser: User
  contacts: User[] = []
  closeResult: string;
  post: string =''
  audience: string='public'
  posts$: Observable<Post[]>
  timeline$: Observable<any[]>
  selectedUser$: Observable<User>

  postForm: FormGroup
  initialPostForm: any
  timeline: any[] = []
  myReactions: ReactionType[] = []
  allReactions: ReactionType[] []
  postImage: File | null = null
  postImagePreview: string = ''
  selectedReactions: Reaction[] = []
  friendStatus: Status[] = []
  selectedUsers: any[] = []
  userImages: string[] = []
  friendStatus$: Observable<Status> 
  isCollapsed: boolean[] = []
  posts_reactions: Map<number, Reaction[]>
  posts_comments: Map<number, Comment[]>
  my_reactions_for_posts: Map<number, ReactionType>
  all_posts_reactions: Map<number, ReactionType[]>

  socket;

  constructor(private modalService: NgbModal,
              private userService: UserService,
              private storageService: StorageService,
              private postService: ProfilePostsService,
              private postStore: Store<PostState>,
              private timelineStore: Store<TimelineState>,
              private formBuilder: FormBuilder,
              private peopleService: PeopleService,
              private friendsStatusStore: Store<FriendsStatusState>,
              ) {
 
                this.postForm = this.formBuilder.group({
                  postText:['', Validators.compose([Validators.required, Validators.maxLength(300)])],
                  audience:new FormControl('public')
                })
                this.initialPostForm = this.postForm.value
                this.posts_comments = new Map()
                this.posts_reactions = new Map()
                this.my_reactions_for_posts = new Map()
                this.all_posts_reactions = new Map()
              }

  ngOnInit(): void {

    

    this.loggedUser = this.storageService.getUser()
    this.peopleService.getFriends_(this.loggedUser, this.contacts)
    //get posts for timeline
    this.postService.getTimeline(this.loggedUser.id).subscribe({
      next: (res)=>{
        this.timeline = res['timeline']
        this.timelineStore.dispatch(setTimelinePosts({posts: this.timeline}))
        this.timeline$ = this.timelineStore.select(selectTimeline)
        let n = this.timeline.length
        this.isCollapsed.length = n
        this.isCollapsed.fill(true)
      },
      error: (err)=>{
        console.log(err)
      }
    })

    

   
  }

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
    
    this.postService.addPost(post, this.loggedUser.id, this.postImage).subscribe({
      next: (res) => {
        this.postStore.dispatch(addPost({newPost: res.addedPost}))
        //console.log(res.addedPost)
        //adding post to user's timeline only if it's not private
        if(res.addedPost.audience != 'private'){
          let newPost = {}
          newPost['id'] = res.addedPost.id
          newPost['created_at'] = res.addedPost.created_at
          newPost['text'] = res.addedPost.text
          newPost['photo'] = res.addedPost.photo
          newPost['link'] = res.addedPost.link
          newPost['audience'] = res.addedPost.audience
          newPost['username']=this.loggedUser.username
          newPost['name'] = this.loggedUser.name
          newPost['avatar'] =this.loggedUser.avatar
          console.log(newPost)
          this.timelineStore.dispatch(addPostToTimeline({newPost: newPost}))
        }
        this.postForm.reset(this.initialPostForm)
        //console.log(res.addedPost)
        
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
  
  showAllPostReactions(post: any, longContent){
    this.checkFriendsStatus(this.posts_reactions.get(post.id))
    this.selectedReactions = this.posts_reactions.get(post.id)
    this.openReactionModal(longContent)
  }

  showAllComments(post: Post){

  }

  

  postComment(event, post){
    const commentText = event.target.value
    const postId = post.id
    const userId = this.loggedUser.id

    this.postService.addComment(userId, postId, commentText).subscribe({
      next: (res)=>{
        //@ts-ignore
        //console.log(res.result)

        //@ts-ignore
        this.posts_comments.get(post.id).push(res.result)
        event.target.value=''

         
        
        
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
    child.style.setProperty("visibility","visible")
    

  }

  hideReactions(index){

    const reactionContainers = document.getElementsByClassName("like-btn-container")
    const reactionContainer = reactionContainers[index]
    const child = reactionContainer.firstChild
    //@ts-ignore
    child.style.setProperty("visibility","hidden")

  }

  react(post, type,i){
    
    this.postService.addReaction(this.loggedUser.id, post.id, type).subscribe({
      next: (res)=>{
        this.posts_reactions.set(post.id, this.posts_reactions.get(post.id).filter(item=>
        item.user.id != this.loggedUser.id))
        this.posts_reactions.get(post.id).push(res['result'])
        //console.log(this.posts_reactions.get(post.id))
        this.my_reactions_for_posts.set(post.id, res['result'].reaction)
        
        this.all_posts_reactions.set(post.id,this.posts_reactions.get(post.id).map(reaction => reaction.reaction))
        
       
      },
      error: (err)=>{
        console.log(err.message)
      }
    
    })
  }

  getMyReactionForPost(reactions: Reaction[], reaction = null){
    let myReactionReaction: ReactionType
    if(reaction){
      myReactionReaction = reaction

    }else{
    
    let myReaction = reactions.find(item=> item.user.id == this.loggedUser.id)
    if(myReaction ==undefined){
      myReactionReaction = ReactionType.NONE
    }else{
      myReactionReaction = myReaction.reaction
    }}
    return myReactionReaction
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

  getAllReactions(post){
    let reactions: ReactionType[] = []
    
    
    this.posts_reactions.get(post.id).forEach(react => {
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

  onVisible(post){

     
    this.postService.getCommentsAndReactions(post.id).subscribe({
      next: (res)=>{
        this.posts_reactions.set(post.id, res['reactions'])
        this.posts_comments.set(post.id, res['comments'])
        this.my_reactions_for_posts.set(post.id, this.getMyReactionForPost(res['reactions']))
        this.all_posts_reactions.set(post.id,this.posts_reactions.get(post.id).map(reaction=>reaction.reaction))
       // console.log(this.all_posts_reactions)
    
       
      },
      error: (err)=>{
        console.log(err.message)
      }
    })
  }

  comment(event){
    event.target.parentElement.parentElement.nextSibling.querySelector('.commentInput').focus()
  }


}
