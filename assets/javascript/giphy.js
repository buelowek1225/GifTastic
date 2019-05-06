 // Initial array of animals
 var animals = ["Bird", "Bear", "Cat", "Dog"];

 // Generic function for capturing the movie name from the data-attribute
 function getGifs() {
    
    //clear previous gifs
    $("#animal-view").empty();
    
    var animal = $(this).attr("data-name")
    console.log(animal)
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=FvmsQclDuI0HxVgh2wEfJx910jioo9Ba&limit=10&q=" + animal;

    //Setting up request to the API
    $.ajax({
        url: queryURL,
        method: "GET"
    })
    //using response then parse the information from the request (setting a function to handle the response)
    .then(function(response) {
        var results = response.data;
        console.log(response)
        for (var i = 0; i < results.length; i++) {
            var gifDiv = $("<div>");

            var rating = results[i].rating;

            var p = $("<p>").text("Rating: " + rating);

            var animalImage = $("<img>");
            animalImage.addClass("gif");
            animalImage.attr("src", results[i].images.fixed_height_still.url);
            animalImage.attr("data-still", results[i].images.fixed_height_still.url);
            animalImage.attr("data-animate", results[i].images.fixed_height.url);
            animalImage.attr("data-state", "still");
            

            gifDiv.prepend(animalImage);
            gifDiv.prepend(p);
            
            $("#animal-view").prepend(gifDiv);
        }

        // the on.click funtion needs to wait until all the data has loaded and then should occur after all the gifs have been created.
        $(".gif").on("click", function(){
            let animatedURL = $(this).attr("data-animate");
            let stillUrl = $(this).attr("data-still");
            let state = $(this).attr("data-state");
            if (state === "still") {
                $(this).attr("src", animatedURL);
                $(this).attr("data-state", "animating");
            }
            else {
                $(this).attr("src", stillUrl);
                $(this).attr("data-state", "still")
            }
            console.log(animatedURL);
            console.log(state);
            console.log (stillUrl);
        
                
        })

    });

 }


 // Function for displaying animals data
 function renderButtons() {

   // Deleting the animals prior to adding new animals
   // (this is necessary otherwise we will have repeat buttons)
   $("#buttons-view").empty();

   // Looping through the array of movies
   for (var i = 0; i < animals.length; i++) {

     // Then dynamicaly generating buttons for each animal in the array
     // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
     var animalButton = $("<button>");
     // Adding a class
     animalButton.addClass("animal");
     // Added a data-attribute
     animalButton.attr("data-name", animals[i]);
     // Provided the initial button text
     animalButton.text(animals[i]);
     // Added the button to the HTML
     $("#buttons-view").append(animalButton);
   }
 }

 // This function handles events where one button is clicked
 $("#add-animal").on("click", function(event) {
   event.preventDefault();


    // This line grabs the input from the textbox
    var animal = $("#animal-input").val().trim();

    // The movie from the textbox is then added to our array
    animals.push(animal);

    // Calling renderButtons which handles the processing of our movie array
    renderButtons();

 });

 // Calling the renderButtons function to display the intial buttons
 renderButtons();

 // Adding click event listeners to all elements with a class of "movie"
 $(document).on("click", ".animal", getGifs);