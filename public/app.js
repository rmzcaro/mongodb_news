$(document).ready(function() {
    // when button is clicked show all articles 

    // when button clicked, save comment 
    // write it dynamically generating code: you can bind it to the DOM element (since the html is dynamically generated)
    $(".viewComments").on("click", function(){
        $.get("/comment", function(data) {
            $.each(data, function(stories, i) {
                
            })
        })
    })
    
})