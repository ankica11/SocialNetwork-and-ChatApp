export const progressBar = (progressVal, num_of_char, max_chars, target) => {
    var strokeVal = (6.28*15*progressVal)/100;
    
	var x = document.querySelector('.progress-circle-prog');
    let num=document.querySelector('.characters-left')
    let left=(max_chars - num_of_char)
    //@ts-ignore
    x.style.stroke='#FF30C9'
      //@ts-ignore
      num.style.display='none'

    //@ts-ignore
    x.style.strokeDasharray =  strokeVal+' 999';
    if(left<=20 && left>9){
         
        //@ts-ignore
        num.style.display='block'
        //@ts-ignore
        x.style.stroke='yellow'
         //@ts-ignore
         num.style.color='black'
         num.innerHTML = (max_chars - num_of_char).toString()
        }else if (left<=9 && left>0){
                //@ts-ignore
        num.style.display='block'
        //@ts-ignore
        x.style.stroke='yellow'
         //@ts-ignore
         num.style.color='black'
         //@ts-ignore
         num.style.left='18px'
         num.innerHTML = (max_chars - num_of_char).toString()
        }
        else if(left <= 0 && left>=-9){
            //@ts-ignore
            num.style.display='block'
            //@ts-ignore
            x.style.stroke='red'
            //@ts-ignore
            num.style.left='18px'
            num.innerHTML = (max_chars - num_of_char).toString()
            //@ts-ignore
            num.style.color='red'
            
            
        }else if(left <-9){
            //@ts-ignore
            num.style.display='block'
            //@ts-ignore
            x.style.stroke='red'
            //@ts-ignore
            num.style.left='15px'
            num.innerHTML = (max_chars - num_of_char).toString()
            //@ts-ignore
            num.style.color='red'
            
        }
        
       

}
