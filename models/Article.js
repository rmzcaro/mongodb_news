var mongoose = require("mongoose");

// save a reference to the schema constructor
var Schema = mongoose.Schema; 

// using the schema constructor, create a new userSchema object 
var ArticleSchema = new Schema({
    // title is required and of type String 
    title: {
        type: String, 
        required: true
    },
    // link and type of string 
    /* 
    title: {
        type: String, 
        required: true
    },
    // comment is an objec that stores a comment 
    comment: {
        type: Schema.Types.ObjectId, 
        ref: "Comment"
    }
    */
});

// this creates our model from the above schema, using mongoose model method
var Article = mongoose.model("Article", ArticleSchema);

// export the Article model
module.exports = Article; 