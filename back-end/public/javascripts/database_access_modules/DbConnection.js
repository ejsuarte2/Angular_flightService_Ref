/*module to establish connection*/
var mongoClient = require('mongodb');
var url = "mongodb://localhost:27017/flight_example_db";

var connection={};

connection.getConnection = function(){
    return mongoClient.connect(url).then(function(database){
        return database.db();
    }).catch(function(error){
        throw new Error("Could not connect to Database");
    })
}

module.exports = connection;