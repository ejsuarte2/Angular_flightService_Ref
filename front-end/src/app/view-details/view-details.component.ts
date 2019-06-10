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
  singleFlight : FlightBooking;
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
  clearSearch(){
    this.singleFlight=null;
    this.viewbookingForm.reset();
    this.view();
  }
  view(){
    this.viewdetailsservice.view().subscribe(
      flightDetails =>{
        this.flightDetails=flightDetails;
      }
    )
  }
  viewDetails(){
    //look for service Id
    var bookingId = (this.viewbookingForm.controls.bookingId.value);
    this.viewdetailsservice.viewIdDetails(bookingId).subscribe(
      res=>{
        this.singleFlight=res;
        console.log(this.singleFlight);
      },
      err=>{
        console.log(err);
      }
    );
  }
  delete(id){
    this.viewdetailsservice.delete(id).subscribe(
      res => {
        this.singleFlight=null;
        this.view();
        this.successMessage = res.message;
      },
      error => {
        this.errorMessage = error.error.message;
      }
    )
  }
  
}
