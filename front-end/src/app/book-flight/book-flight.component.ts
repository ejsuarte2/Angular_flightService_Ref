import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { BookFlightService } from './book-flight.service';

@Component({
  selector: 'app-book-flight',
  templateUrl: './book-flight.component.html',
  styleUrls: ['./book-flight.component.css']
})
export class BookFlightComponent implements OnInit {

  errorMessage: String;
  successMessage: String;

  constructor(private fb: FormBuilder, private bookFlightService: BookFlightService) { }

  bookingForm =  this.fb.group({
    passengerName: ["",Validators.required],
    noOfTickets: ["", [Validators.required, Validators.min(1)]],
    flightId: ["",[Validators.required, validateFlight]]
  })

  ngOnInit() {
  }

  book(){
    this.successMessage=null;
    this.errorMessage=null;
    this.bookFlightService.getData(this.bookingForm.value).subscribe(
      response => {
        this.successMessage = response.message
        console.log("success"+ this.successMessage)
      },
      err =>{
        this.errorMessage = err.error.message
      }
    )
  }//end book
 
}
/**Function outside class for validation */
function validateFlight(flightId: FormControl){
  var val:string=flightId.value;
  let FLIGHT_REXEXP= /^[A-Z]{3}-[0-9]{3}$/;
  return FLIGHT_REXEXP.test(val) ? null : {
    flightError:{
      message: "Invalid Flight ID!"
    }
  };
}
