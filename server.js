var express = require("express");
var bodyParser = require("body-parser");
var exphbs = require("express-handlebars");
var app = express();
var socket = require("socket.io");
var db = require('./models')
var port = process.env.PORT || 3000; //host server port or local 3000 port

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true })) //set extended to true to prevent stripping objects

// parse application/json
app.use(bodyParser.json())

//serve static client css and js files
app.use(express.static("public"))

//express handlebars express extension to render handlebars partials
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');


//requiring all the routes
//=============================


var server = app.listen(port, function(){
    console.log("Server is listening on port " + port)
})

