import { Component, OnInit } from '@angular/core';
import { io} from 'socket.io-client'
import { User } from '../models/user';
import { PeopleService } from '../people/people.service';
import { StorageService } from '../_services/storage.service';

const SOCKET_ENDPOINT = 'localhost:3000'

@Component({
  selector: 'app-chat-app',
  templateUrl: './chat-app.component.html',
  styleUrls: ['./chat-app.component.css']
})
export class ChatAppComponent implements OnInit {

  socket;
  message: string
  contacts: User[] = []
  loggedUser: User
  user_chats: any[] = []
  selectedUser: User
  selectedChat: any[] = []
  selectedMessages: any[] = []

  constructor(private peopleService: PeopleService,
              private storageService: StorageService) { }

  ngOnInit(): void {
    this.loggedUser = this.storageService.getUser()
    //this.peopleService.getFriends_(this.loggedUser, this.contacts, this.selectedUser)
    this.peopleService.getFriends(this.loggedUser.id).subscribe({
      next: (res)=>{
       
        for(let i=0; i<res.friendships.length; i++){
          const friendship = res.friendships[i]
          if(friendship.senderFriendId == this.loggedUser.id){
            this.contacts.push(friendship.receiverFriend)
            
          }
          if(friendship.receiverFriendId == this.loggedUser.id){
            this.contacts.push(friendship.senderFriend)
          }

          

        }
        
        this.contacts.sort((a, b) => a.name > b.name ? 1 : a.name < b.name ? -1 : 0)
        this.selectedUser = this.contacts[0]
        this.selectTheChat(this.selectedUser)
        
      },
      error: (err)=>{
        console.log(err.message)
      }
    })
    
    
    
    this.connectToSocket()
    
    
    this.socket.on("receive message", (data) => {
      const chat = document.getElementsByClassName("chat")[0]
   
     
      this.selectedChat = [...this.selectedChat, data.newMessage]
      setTimeout((_)=>{
        chat.scrollTop = chat.scrollHeight

      }, 500)
      //alert(JSON.stringify(data))
     });

     this.socket.on("chat", (res)=>{
       const chat = document.getElementsByClassName("chat")[0]
       this.selectedChat = res.messages
       setTimeout((_)=>{
         chat.scrollTop = chat.scrollHeight

       }, 500)
      
      
      

     })
     /*this.socket.onAny((event, ...args) => {
      console.log(event, args);
})*/;
  }

  getActiveStatus(userSession){
    return this.peopleService.getActiveStatus(userSession)
  }

  getActiveStatus_(userSession){
    const status = this.peopleService.getActiveStatus(userSession)
    let ret_status=''
    switch(status){
      case 'unknown':
        ret_status = 'Unknown';
        break;
      case 'online':
        ret_status = 'Online';
        break;
      default: 
        ret_status = 'Active ' + status + ' ago';
    }

    return ret_status

  }

  sendMessage() {
    let data = {
      content: this.message,
      to: this.selectedUser.id
    }
    this.message=''
    this.socket.emit("send message", data);
    
    
 }

 timeLapseMessage(message_new, index_new){
  const message_prev = this.selectedChat.find((message) => ((new Date(message.created_at).getTime() < new Date(message_new.created_at).getTime()) && (message.senderId === message_new.senderId)))
  const message_prev_date = new Date(message_prev.created_at).getTime()
  const message_new_date = new Date(message_new.created_at).getTime()
  if((message_new_date - message_prev_date)/1000>(5*60)){
    return true
  }else{
    return false
  }

 }

 connectToSocket(){
  this.socket = io(SOCKET_ENDPOINT, {autoConnect: false})
  const loggedUserSessionID = this.loggedUser.user_session.id
  const userID = this.loggedUser.id
  this.socket.auth = {loggedUserSessionID, userID}
  
  this.socket.connect()
 }

 selectTheChat(selectedPeerChat:User){
  //alert(selectedPeerChat.id)
  
  this.selectedUser = selectedPeerChat
  const otherPeer = {

    otherPeerID: selectedPeerChat.id

  }
  this.socket.emit("open chat", otherPeer)
  
  
  
 }

}
