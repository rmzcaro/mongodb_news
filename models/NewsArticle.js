var mongoose = require("mongoose");

// save a reference to the schema constructor
var Schema = mongoose.Schema; 

// using the schema constructor, create a new userSchema object 
var ArticleSchema = new Schema({

    articleId: {
        type: String,
        require: [true, "id is required"],
        unique: true
    },
    // title is required and of type String 
    headline: {
        type: String, 
        required: true
    },
    // link and type of string 
    
    summary: {
        type: String, 
        required: true
    },
    url: {
        type: String
    },
        // comment is an objec that stores a comment 
    comment: {
        type: String, 
        default: ""
    },
    photo: {
        type: String
    }
    
});

// this creates our model from the above schema, using mongoose model method
var NewsArticle = mongoose.model("NewsArticle", ArticleSchema);

// export the Article model
module.exports = NewsArticle; 