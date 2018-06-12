$(document).ready(function() {
    // when button is clicked show all articles 

    // when button clicked, save comment 
    // write it dynamically generating code: you can bind it to the DOM element (since the html is dynamically generated)
    $(".viewComments").on("click", function(){

        let commentText = {
    
    _id: $(this).attr("data-id"),
comment: $(this).prev().val()

}
console.log(commentText);
        $.post("/comment",commentText, function(data) {
            
        })
    })
    
})