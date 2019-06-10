import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-front-page',
  templateUrl: './front-page.component.html',
  styleUrls: ['./front-page.component.css']
})
export class FrontPageComponent implements OnInit {
  hidden:boolean = false;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  agreed(val){
    this.hidden = true;
    if(val==1){
      this.router.navigate(['/book']);
    }else if(val==2){
      this.router.navigate(['/view']);
    }
  }
}
