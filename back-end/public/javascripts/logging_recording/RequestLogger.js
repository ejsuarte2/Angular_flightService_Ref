/**Log every Restful REquest made */
var fs = require('fs');

var requestLogger = function(req, res, next){
    var logMessage = " "+new Date() +  " "+req.method+" "+req.url+"\n";
    fs.appendFile('RequestLogger.txt', logMessage,function(err){
        if(err){return next(err);}
    });
    next();//alow it to move forward
}
module.exports = requestLogger;