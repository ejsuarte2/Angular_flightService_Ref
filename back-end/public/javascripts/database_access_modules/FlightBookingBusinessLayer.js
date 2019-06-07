/**In this layer Ensure Business requirements are met here, perform verification */
var flightBookingDAL = require('./FlightBookingDataAccessLayer');
var validator = require('../validators/validator');
var FlightBookingBL = {};

FlightBookingBL.bookFlight = function(flightBooking){

    /**Ensure Valid flight Id per requirements */
    validator.validateFlightId(flightBooking.flightId);
    return flightBookingDAL.checkAvailability(flightBooking).then(function(flight){
              /**Ensure flight exists */
        if(flight == null || flight.status == 'Cancelled'){
            throw new Error("Flight Unavailable or cancelled");
        }else if(flight.availableSeats < flightBooking.noOfTickets){
            throw new Error("Requested number of seats unavailable");
        }else{
            flightBooking.totalAmount = flightBooking.noOfTickets * flight.fare;
            promise = flightBookingDAL.bookFlight(flightBooking);
            return promise;
        }
    }).then(function(bookingId){
        return bookingId;
    })
}

FlightBookingBL.getAllBookingIds = function(){
    return flightBookingDAL.getAllBookingIds().then(function(bookingIds){
        return bookingIds;
    }).catch(function(err){
        return err;
    })
}

FlightBookingBL.viewBookingId = function(specifiedBId){
    return flightBookingDAL.viewBookingId(specifiedBId).then(function(record){
        if(!record){
            throw new Error();
        }else{
            return record;
        }
      }).catch(function(err){
        return err;
      })
}

FlightBookingBL.deleteBooking = function(id){
    return flightBookingDAL.deleteBooking(id).then(function(response){
        if(response.result.n>0){
          return "Successfully deleted Id: "+ id;
        }else{
          return "Sorry Cannot delete id: "+id;
        }
      }).catch(function(err){
        return err;
      })
}

  module.exports = FlightBookingBL;