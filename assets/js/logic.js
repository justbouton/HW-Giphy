var animals = ["Cats", "Dogs", "Hippos", "Lions"];
// console.log(uniqueAnimals);



// Function for displaying animal data
function renderButtons() {

  uniqueAnimals = unique(animals) //temp arr to dedup animals arr

// Arrays animals dedup to uniqueAnimals //WORKING
  function unique(animals) {//Pass in animals arr
      var result = [];//store dedup arr
      $.each(animals, function(i, e) {//for each animal index, element
          if ($.inArray(e, result) == -1) result.push(e);//if any element returns -1 push to result arr
      });
      return result;
  }

// Delete the animal buttons prior to adding new animal buttons. Necessary to avoid repeat buttons
  $("#animals-view").empty();

  for (var i = 0; i < uniqueAnimals.length; i++) {// Looping through the array of uniqueAnimals
    var a = $("<button>");// Then dynamicaly generating buttons for each animal in the array
    a.addClass("animal");// Add a class of animal
    a.attr("data-name", uniqueAnimals[i]);// Adding a data-attribute with a value of the animal at index i
    a.text(uniqueAnimals[i]);// Providing the button's text with a value of the animal at index i
    $("#animals-view").append(a);// Adding the button to the HTML
  }// Close for loop

  //Animal button on click query Giphy API
  $('.animal').click(function() {
              animalData = $(this).data("name")// "name" returns 
              console.log("67 API call name: " + animalData)//WORKING pulling data from .animal "this" button

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animalData + "&api_key=dc6zaTOxFJmzC&limit=10";

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      console.log("75: " + JSON.stringify(response.data));
      
      $(".gif-view").empty();

    for (var i = 0; i < response.data.length; i++) {//loop through data for needed responses
      var rating = response.data[i].rating;//rating
      var imgURL = response.data[i].images.downsized.url;//image
      var content = $("<div class='content'>");
      var ratingP = $("<p>").text("Rating: " + rating);
      var image = $("<img class='image'>").attr("src", imgURL);
      content.append(ratingP, image);// add rating and the image to the page
      // rendering the content to the .gif-view
      $(".gif-view").prepend(content);
    }

    });
  });
}// Close function renderButton 



// CHECK #animal-input verify not blank // WORKING
  function checkforblank() { //CHECKS #animal-input field if empty change placeholder text, set border red
      if ($('#animal-input').val() == "") {
        $('#animal-input').attr('placeholder','SEARCH HERE');
        document.getElementById('animal-input').style.borderColor = "red";
      return false;
      } else 
        event.preventDefault()
        var animalVal = $('#animal-input').val();
        // console.log("163: " + animalVal)//WORKING
        animals.push(animalVal)
        renderButtons()
      }

  console.log("131 initial start: renderButtons")
  renderButtons();// Calling the renderButtons function at least once to display the initial list of animals
  