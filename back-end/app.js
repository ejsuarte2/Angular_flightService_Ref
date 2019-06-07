/** include frameworks / libraries needed*/
var express = require('express');
var bodyParser = require('body-parser');
var router = require('./routes/routes');
var errorLogger = require('./public/javascripts/logging_recording/ErrorLogger');
var requestLogger = require('./public/javascripts/logging_recording/RequestLogger');
var cors = require('cors');

var app = express();
app.use(cors());

app.use(bodyParser.json());
app.use(requestLogger);/**Use before router to log requests */
app.use('/', router);
app.use(errorLogger);/**Use After! To accurately log any errors */

app.listen(1020);
console.log("Server started at 1020");
