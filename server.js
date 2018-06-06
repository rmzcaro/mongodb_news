var express = require("express");
var mongojs = require("mongojs");
var bodyParser = require("body-parser");
var hbs = require("express-handlebars");
// HTTP request logger middleware 
var logger = require("morgan");
var mongoose = require("mongoose");
var request = require("request");

// initialize express
var app = express();

// scraping tools
var axios = require("axios");
var cheerio = require("cheerio");

var db = require('./models')

var port = process.env.PORT || 3000; //host server port or local 3000 port

// morgan logger for loggin requests CHECK IF LATER ISSUE 
// app.use(logger("dev"));

// body parser chunks your data (it's a middleware) in a secure way, because express by itself cannot read all daa
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true })) //set extended to true to prevent stripping objects
//serve static client css and js files
app.use(express.static("public"))
// parse application/json
app.use(bodyParser.json())

//db configuration
var databaseUrl = "newsdb";
var collections = ["news"];

// hook mongojs config to db variables
var db = mongojs(databaseUrl, collections);

// connect to the mongo db, name of db: newsdb
mongoose.connect("mongodb://localhost/newsdb");

//express handlebars express extension to render handlebars partials
// app.engine('handlebars', hbs({defaultLayout: 'main'}));
// app.set('view engine', 'handlebars');

// log any mongojs errors to console 
db.on("error", function(error) {
    console.log("Database error:", error);
});

//requiring all the routes

// simple message 
app.get("/", function(req, res) {
    res.send("Hello Mundo");
  });

// display all entried in the /all path 
app.get("/all", function(req, res) {
    // query: in our db go to news collections and grab all 
    db.news.find({}, function(err, found) {
    // log any errors
    if (err) {
        console.log(err);
    }
    else {
        res.json(found);
        console.log(found + "line 68")
    }
    });
});

// at the /name path, display every entry sorted by headline 
app.get("/headline", function(req, res) {
    // query in db, go to news collection, find all and sort in ascending order by headline 
    db.news.find().sort({ headline: 1}, function(err, found) {
        if (err) {
            console.log(err);
        } 
        else {
            res.json(found);
        }
    });
});

// get route for scraping the medium site 
app.get("/scrape", function(req, res) {
    // first we grab the body of the html with the request
    axios.get("http://www.techcrunch.com").then(function(response) {
        // then we load that into cheerio and save it to $ for a shorthand selector
        var $ = cheerio.load(response.data);

        // add the text and href of every link , and save them 
        // as properties of the result object 
        let stories = $(".post-block__title__link"); 
        console.log(stories);

        // load text of stories - check cheerio
        stories.each(function(story, i) {
            console.log($(this).text());
            console.log($(this).attr("href"))

            // mongoose to save this on db
            
            var result = {
                    title: $(this).text(),
                    url: $(this).attr("href")
                };
                console.log(result + "line 68")

            // create my collections in db
            // db.Collection.create(result);        

        })
            // close off function and inform user once done (keep it restful)

            // retrive items from db 


   // })
})

})

// route to get all articles from the db 

// route to grab a specific article by id and populate with comments

// route for saving / updating an article's associated comment 

//=============================

// start the server 
var server = app.listen(port, function(){
    console.log("Server is listening on port " + port)
})

