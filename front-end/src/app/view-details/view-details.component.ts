import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {FlightBooking} from '../shared/FlightBooking';
import {ViewDetailsService} from './view-details.service';

@Component({
  selector: 'app-view-details',
  templateUrl: './view-details.component.html',
  styleUrls: ['./view-details.component.css']
})
export class ViewDetailsComponent implements OnInit {

  flightDetails : FlightBooking[];
  successMessage;
  errorMessage;

  constructor(private fb: FormBuilder, private viewdetailsservice: ViewDetailsService) {
    console.log(this.flightDetails);
   }

  viewbookingForm = this.fb.group({
    bookingId: ['',[Validators.required, Validators.min(4)]]
  })
  ngOnInit() {
    this.view();
  }

  view(){
    this.viewdetailsservice.view().subscribe(
      flightDetails =>{
        this.flightDetails=flightDetails;
      }
    )
  }

  delete(id){
    this.viewdetailsservice.delete(id).subscribe(
      res => {
        this.successMessage = res.message;
      },
      error => {
        this.errorMessage = error.error.message;
      }
    )
  }
  
}
