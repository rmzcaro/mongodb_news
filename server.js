var express = require("express");
var mongojs = require("mongojs");
var bodyParser = require("body-parser");
// HTTP request logger middleware 
// var logger = require("morgan");
var mongoose = require("mongoose");
var request = require("request");

// initialize express
var app = express();
var hbs = require("express-handlebars");


// scraping tools
var axios = require("axios");
var cheerio = require("cheerio");

var db = require('./models')

var PORT = process.env.PORT || 3000; //host server port or local 3000 port

app.use(bodyParser.urlencoded({
    extended: true
})) //set extended to true to prevent stripping objects
//serve static client css and js files
app.use(express.static("public"))
// parse application/json
app.use(bodyParser.json())

//db configuration
var databaseUrl = "newsdb";
var collections = ["news"];

// connect to the mongo db, name of db: newsdb
mongoose.connect("mongodb://localhost/newsdb");

//express handlebars express extension to render handlebars partials
app.engine('handlebars', hbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// MAY NOT NEED ANYMORE
// log any mongojs errors to console 
// db.on("error", function(error) {
//     console.log("Database error:", error);
// });

//requiring all the routes

// get route for scraping the medium site 
app.get("/scrape", function (req, res) {
    // first we grab the body of the html with the request
    axios.get("http://www.techcrunch.com").then(function (response) {
        // then we load that into cheerio and save it to $ for a shorthand selector
        var $ = cheerio.load(response.data);
        // console.log(response.data);

        // add the text and href of every link , and save them 
        // as properties of the result object 
        let stories = $(".post-block");
        // console.log(stories);

        // load text of stories - check cheerio
        stories.each(function (i, story) {
            let eachStory = {
                    headline : $(story).children(".post-block__header").children(".post-block__title").text().trim(),
                    url : $(story).children(".post-block__header").children(".post-block__title").children(".post-block__title__link").attr("href"),
                    summary : $(story).children(".post-block__content").text().trim(),
                    photo : $(story).children(".post-block__footer").children().children().children("img").attr("src")
            }
            // console.log(eachStory);
            // create my a news article in news collections 
            db.Article.create(eachStory)
            .catch(function(err){
                console.log(err)
            });
        });

    });
    // scrape notice here
    res.status(200).end();
});

// route to get all articles from the db 

app.get("/articles", function(req, res) {
    // grab every document in the articles 
    db.Article.find()
    .then(function(stories){
        // console.log("stories", stories)
        let hbsObject = {
            stories: stories
        };
        res.render("index", hbsObject)
        // res.json(dbArticle);
    })
    .catch(function(err) {
        res.json(err);
    });
});
// route to view comments once saved 
// 1- grab a specific id using the id in the parameter, prep query that finds the matching one in db
// 2- populate all associated notes 
// 3 - if all is found successfully find article with matchind if, send it back to client 
// 4 - else send error 

app.post("/comment", function(req, res) {
    console.log(req.body);
    db.Article.updateOne({
        _id: req.body._id
    },{
        hasComment: true,
        comment:req.body.comment
    })
    .then(function() {
        res.status(200).send("comment added");
    })
    .catch(function(err) {
        console.log("no comment added")
        console.log(err);
    })
})

app.delete("/deleteComment", function(req, res){
    db.Article.updateOne(req.body,{
        hasComment: false
    })
    .then(function(){
        res.status(200).end();
    })
})

//=============================

// start the server 
var server = app.listen(PORT, function () {
    console.log("Server is listening on port " + PORT)
});