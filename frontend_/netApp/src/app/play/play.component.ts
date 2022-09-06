import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { UserAboutOverviewService } from '../user-about-overview/user-about-overview.service';


@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.css']
})
export class PlayComponent implements OnInit {

  fileToUpload: File | null = null;

  constructor(
    private userService: UserAboutOverviewService
  ) { 
    //this.currentUserStore$ = authStore.select(selectLoggedUser)
  }

  ngOnInit(): void {
  }

  handleFileInput(event) {
    const target = event.target as HTMLInputElement
    const files = target.files
    this.fileToUpload = files.item(0);
}

uploadFile() {
  
}


}
