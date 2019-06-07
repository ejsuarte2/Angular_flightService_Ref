/**Log any occurring error during request and send appropriate error msg */

var fs = require('fs');

var logger = function (err,req,res,next){
    if (err){
        fs.appendFile('ErrorLogger.txt',err.stack + "\n", function(err){
            if(err){
                console.log("Logging failed");
            }
        });
        res.status(500);//server error code 500
        res.json({"message": err.message})
    }
    next();//move forward with next operation
}

module.exports = logger;