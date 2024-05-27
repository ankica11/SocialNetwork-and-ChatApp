import { User } from "../models/user";
import { Status } from "../_state/people/friends.status.reducer";

export const progressBar = (progressVal, num_of_char) => {
    var strokeVal = (120*progressVal)/100;
    let strokeDashOff = (100 - (100*progressVal))
	var x = document.querySelector('.progress-circle-prog');
    let num=document.querySelector('.characters-left')
    let left=(300 - num_of_char)
    //@ts-ignore
    x.style.stroke='cornflowerblue'
      //@ts-ignore
      num.style.display='none'

    //@ts-ignore
    x.style.strokeDasharray =  strokeVal+' 999';
    if(progressVal>=93 && progressVal<100){
         
        //@ts-ignore
        num.style.display='block'
        //@ts-ignore
        x.style.stroke='yellow'
         //@ts-ignore
         num.style.color='black'
         num.innerHTML = (300 - num_of_char).toString()
        }else if(progressVal>=100){
            //@ts-ignore
            num.style.display='block'
            //@ts-ignore
            x.style.stroke='red'
            num.innerHTML = (300 - num_of_char).toString()
            //@ts-ignore
            num.style.color='red'
        }
        
        if(left<10 && left>=0){
            //@ts-ignore
            num.style.left='25px'
         }

}

export const getFriendStatus = (res: any, loggedUser: User)=>{
    let status: Status
    if(res == null){
            status = Status.NONE
        
       }else
       { if(res.accepted){
       
        //friends no matter who sent request
        status = Status.FRIENDS
       }else {
        if(res.senderFriendId == loggedUser.id){
       
        //not friends but logged user sent request, but its still pending
       
        status = Status.PENDING_SENT
       }else {
        if(res.receiverFriendId == loggedUser.id){
        
        //not friends but logged user received request, but its still pending
        status: Status.PENDING_RECEIVED
       }}}}

       return status

}


