var express = require("express");
var bodyParser = require("body-parser");
var hbs = require("express-handlebars");
// HTTP request logger middleware 
var logger = require("morgan");
var mongoose = require("mongoose");
var cheerio = require("cheerio");
var request = require("request");
var db = require('./models')

var port = process.env.PORT || 3000; //host server port or local 3000 port

// initialize express
var app = express();

// morgan logger for loggin requests CHECK IF LATER ISSUE 
// app.use(logger("dev"));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true })) //set extended to true to prevent stripping objects
//serve static client css and js files
app.use(express.static("public"))
// parse application/json
app.use(bodyParser.json())

// connect to the mongo db, name of db: newsdb
mongoose.connect("mongodb://localhost/newsdb");

//express handlebars express extension to render handlebars partials
app.engine('handlebars', hbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//requiring all the routes

// 

//=============================


var server = app.listen(port, function(){
    console.log("Server is listening on port " + port)
})

