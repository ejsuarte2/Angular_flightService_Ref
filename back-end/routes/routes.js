var express = require('express');
var router = express.Router();
var flightBooking = require('../public/javascripts/database_access_modules/FlightBooking');
var flightBookingBL = require('../public/javascripts/database_access_modules/FlightBookingBusinessLayer');
//delete when done testing
var flightBookingDAL = require('../public/javascripts/database_access_modules/FlightBookingDataAccessLayer');

/* GET all users listing. */
router.get('/getallIds', function(req, res, next) {
  flightBookingBL.getAllBookingIds().then(function(allBookingIds){
    res.json(allBookingIds);
  }).catch(function(err){
    next(err);
  });
});

/**View details of particular booking Id */
router.get('/viewBookingId/:id', function(req,res,next){
  var bookingId = req.params.id;
  flightBookingBL.viewBookingId(bookingId).then(function(record){
    res.json(record);
  }).catch(function(err){
    next(err);
  })
})

/**Book a flight */
router.post('/bookFlight', function(req,res,next){
  var flightBookingObj = flightBooking.toObject(req.body); 
  flightBookingBL.bookFlight(flightBookingObj).then(function(bookingId){
    res.json({"message": "successfully booked "+bookingId});
  }).catch(function(err){
    next(err);
  })
})

/**Delete a booking flight */
router.post('/delete', function(req,res,err){
  var id = parseInt(req.body.id)
  flightBookingBL.deleteBooking(id).then(function(response){
    res.json({"message":response});
  }).catch(function(err){
    next(err);
  });
  
})

module.exports = router;
