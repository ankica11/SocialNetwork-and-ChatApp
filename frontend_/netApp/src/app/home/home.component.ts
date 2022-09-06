import { Component, OnInit } from '@angular/core';
import { StorageService } from '../_services/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  username: string
  password: string

  constructor(
    private storageService: StorageService
  ) { }

  ngOnInit(): void {
    let items = document.querySelectorAll('.list-group-item')
    let main = document.getElementById('main')
    let btn = document.getElementById('tog-btn')
    
    function activateLink(){
      items.forEach(item =>{
        item.classList.remove('active')
        item.classList.remove('bla')
      })
      this.classList.add('active')
      this.classList.add('bla')
      
    }
   
    items.forEach(item => {
      item.addEventListener('click', activateLink)
    })
    
  }
  
  login(){
    
  }
}
