import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'front-end';
  hidden:boolean = false;

  constructor(private router: Router){}

  agreed(val){
    this.hidden = true;
    if(val==1){
      this.router.navigate(['/book']);
    }else if(val==2){
      this.router.navigate(['/view']);
    }
  }
}
