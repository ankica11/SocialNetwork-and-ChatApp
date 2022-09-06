import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';



@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  const bla = document.getElementById('learn')
  bla.addEventListener('click', ()=> {
    alert('clicked')
  })
  let clicked = false
  /*document.addEventListener('click', ()=>{
    
    if(clicked) document.getElementById('questions').classList.add('bla')
    else document.getElementById('questions').classList.remove('bla')
    clicked = !clicked
  })*/

  

  
  }

  bla(){
    alert('kurac')
  }

  

}
