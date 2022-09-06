//alert("Hello");
//Data: assume we have a list of top 5 movies
let topMovies = [{id: 0, title: "The Shawshank Redemption", year: 1994, image_url: "MEDIA/movie0.jpg"},
				 {id: 1, title: "The Godfather ", year: 1972, image_url: "MEDIA/movie1.jpg"},
				 {id: 2, title: "The Dark Knight", year: 2008, image_url: "MEDIA/movie2.jpg"},
			   {id: 3, title: "12 Angry Men", year: 1957, image_url: "MEDIA/movie3.jpg"},
			   {id: 4, title: " Schindler\'s List", year: 1993, image_url: "MEDIA/movie4.jpg"},
				];



//------------------------------------------------------------------------------------------------------
//JS CLASSES AND OBJECTS
//Create a js class: "Movie"
class Movie {
	//Properties (props) & Constructor
	constructor(id, title, year, image_url) {
	  this.id = id;
	  this.title = title; //"this" = this object property
	  this.year = year;   //"this" = this object property
	  this.image_url = image_url;//"this" = this object property
	}

	//Methods: render the HTML content of the movie to webpage UI
	render() {
		let content = `
						<div class="col-12 col-md-4 p-2">
							<div class="border border-primary bg-secondary h-100">
								<h3 class="text-center">${this.title}</h3>
								<p class="text-center">${this.year}</p>
								<img src=${this.image_url} class="image-style">	
								<div class="text-center">
									<button class="btn btn-warning" onclick="addToCartUpdate(${this.id})">ADD TO CART</button>
								</div>								
							</div>							
					   </div>
					   `;     
		//Return the content
		return content;
	}
}

//------------------------------------------
//Create a movie object & Display it on webpage UI
let aMovie = new Movie(topMovies[0].id, topMovies[0].title, topMovies[0].year, topMovies[0].image_url);
//console.log(document.getElementById("movie-list"));
document.getElementById("movie-list").innerHTML = aMovie.render();


//------------------------------------------
//Create a list of movie objects & display on webpage UI
let movieObjects = [];
let listOfMovieObjectsContent = "";
for (let i = 0; i < topMovies.length ; i++) {
	let movie = new Movie(topMovies[i].id, topMovies[i].title, topMovies[i].year, topMovies[i].image_url);
	movieObjects.push(movie);//Append the movie to the list of movie objects
	listOfMovieObjectsContent += movie.render();//build up the html render
}
//Display a list of movie objects on webpage UI
document.getElementById("movie-list").innerHTML = listOfMovieObjectsContent;



//Filter feature: https://www.w3schools.com/jsref/jsref_filter.asp
function displayFilteredMovies() {
	//Get keyword entered by user
	let keyword = document.getElementById("searchInput").value.toLowerCase();
	//Call to execute the filter method.
	let filteredObjects = movieObjects.filter(containKeyword);
	//Display the filtered movies
	let listOfFilteredMovieContent = "";
	for (let i = 0; i < filteredObjects.length ; i++) {
		listOfFilteredMovieContent += filteredObjects[i].render();//build up the html render
	}	
	//Display a list of movie objects on UI
	document.getElementById("movie-list").innerHTML = listOfFilteredMovieContent;	
	
	//Filter function 
	function containKeyword(movie) {
	  if (movie.title.toLowerCase().includes(keyword)) {
		return true;
	  } else {
		return false;
	  }
	}	
}



//------------------------------------------
//Add to Shopping cart
function addToCart(id) {
	//Create a new HTML node/element <p> to display this newly added item
	let node = document.createElement("p");
	//Set styles to new node
	//node.className = 'class-name';
	node.style.color = 'red';
	node.style.backgroundColor = 'yellow';
	//Set content for new node
	let nodeCcntent = document.createTextNode(movieObjects[id].title + ": " + movieObjects[id].year);
	//Append the content (nodeCcntent) to the new node	
	node.appendChild(nodeCcntent);	
	//Append the above child HTML node to the parent node "shopping-cart"
	document.getElementById("shopping-cart").appendChild(node);
}


//------------------------------------------
//Update "Add to Shopping cart" with "Remove" button
let itemNumber = 0;
function addToCartUpdate(id) {
	//
	itemNumber++;//Use to create unique id for item added to the shopping cart
	//
	let currentShoppingCart = document.getElementById("shopping-cart").innerHTML;
	let newAddedMovie = `<div id="${itemNumber}">
							<label style='color: red; background: yellow;'>${movieObjects[id].title} : ${movieObjects[id].year}</label>
							<input type="button" value="REMOVE" onclick="removeItem(${itemNumber})">	
						</div>
						`;
	//Update shopping-cart
	document.getElementById("shopping-cart").innerHTML = currentShoppingCart + newAddedMovie;
}
//RemoveItem function 
function removeItem(itemID) {
 document.getElementById(itemID).remove();
}