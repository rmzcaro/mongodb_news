var mongoose = require("mongoose");

// save reference to the schema constructor
var Schema = mongoose.Schema; 

// Using the Schema constructor, create a new object 
var CommentSchema = new Schema({
    title: String, 
    body: String
});

// Create our model from the schema above
var Comment = mongoose.model("Comment", CommentSchema);

// WHY IS THIS THE SAME COLOR AS MODULES? 
module.exports = Comment; 