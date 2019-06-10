/**This is the Layer that accesses and retrieves data frm database directly */
var FlightBooking = require('./FlightBooking');
var connection = require('./DbConnection');

var FlightBookingDAL = {}

FlightBookingDAL.generateId = function() {
    /**1. Establish a connection to the database*/
    return connection.getConnection().then(function(db){
        /**2. Retrieve needed collection */
        var fb_collection = db.collection('FlightBooking');
        /**3. Perform  operation needed*/
        return fb_collection.distinct("bookingId").then(function(ids){
            var max_flight_booking_id = Math.max(...ids);
            console.log("in before if", max_flight_booking_id);
            if(max_flight_booking_id==-Infinity){
                max_flight_booking_id=2000
            }
            console.log("after if", max_flight_booking_id);
            return max_flight_booking_id+1;
        })
    })
}

FlightBookingDAL.getAllBookingIds = function(){
    /**1. Establish a connection to db */
    return connection.getConnection().then(function(db){
        /**2. Retrieve collection needed */
        var fb_collection =  db.collection('FlightBooking');
        /**3. Perform operation */
        return fb_collection.find().toArray().then(function(flightDetails){
            return flightDetails;
        }).catch(function(err){
            return err;
        })
    })
}

FlightBookingDAL.viewBookingId = function(givenBookingId){
    /**1. Establish a connection */
    return connection.getConnection().then(function(db){
        /**2. Retrieve collection to be used*/
        var fb_collection = db.collection('FlightBooking');
        /**3. Perform operarion */
        return fb_collection.findOne({'bookingId': Number(givenBookingId)}).then(function(recordFound){
            if(!recordFound){
                throw new Error("no record with booking id: "+ givenBookingId);
            }else{
                return FlightBooking.toObject(recordFound);
            }
        }).catch(function(err){
            return err;
        })
    })
}

FlightBookingDAL.bookFlight = function(flight){
    /**1. Establish a connection */
    return connection.getConnection().then(function(db){
        /**2. Retrieve needed collection */
        var fb_collection = db.collection('FlightBooking');
        /**3. perform operation needed */
        return FlightBookingDAL.generateId().then(function(fid){
            var id=fid;
            //actual operation here: insertion/finding/updating
            return fb_collection.insertOne({
                "bookingId": fid, "passengerName": flight.passengerName, "noOfTickets":flight.noOfTickets, "flightId": flight.flightId, "totalAmount":flight.totalAmount
            }).then(function(flightCol){
                return db.collection("Flight").findOne({ "flightId": flight.flightId}).then(function(flightRecord){
                    return db.collection("Flight").updateOne({ "flightId": flight.flightId}, { $set: { "availableSeats": flightRecord.availableSeats -flight.noOfTickets}})
                }).then(function(operationPerformed){
                    if(operationPerformed.result.nModified < 1){
                        throw new Error("Seats could not be updated");
                    }else{
                        return id;
                    }
                })
            })
        })
    })
}

FlightBookingDAL.checkAvailability = function(flightId){
    console.log( JSON.stringify(flightId));
    /**1. Establish a connection */
    return connection.getConnection().then(function(db){
        /**2. Retrieve needed collection */
        var flight_col = db.collection('Flight');
        /**3. perform operation */
        return flight_col.findOne({"flightId": flightId}).then(function(flightRecord){
            if(!flightRecord || flightRecord.length == 0){
                return null;
            }else{
                return flightRecord;
            }
        })

    })
}

FlightBookingDAL.deleteBooking= function(id){
    /**1. Establish a connection */
    return connection.getConnection().then(function(db){
        /**2. Retrieve needed collection.  */
        var fb_collection = db.collection('FlightBooking');
        /**3. Perform operation */
        return fb_collection.deleteOne({"bookingId": id}).then(function(response){
            return response;
        }).catch(function(err){
            return err;
        })
    })

}
module.exports = FlightBookingDAL;

