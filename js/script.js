$(function(){

	$("#searchBtn").on("click", search);
	var filmsData = getAllFilms();
	var searchInput = $("#search_term");
	var searchResultsContainer = $('#search-results');

	var source   = $("#results-template").html();
	var template = Handlebars.compile(source);

	function search(){
		var searchTerm = searchInput.val();		
		var filteredMovies = filterWithMovieNames(searchTerm);
		if(filteredMovies.length>0){
			var resultsHtml = template({results: filteredMovies});
			searchResultsContainer.html(resultsHtml);
		}
		else{
			searchResultsContainer.html("No Results found");
		}
		searchInput.val("");
		searchInput.focus();
	}

	function getAllFilms(){
		var filmsPromise = $.get("db/films.json");
		filmsPromise.then(function(data){
			filmsData = data;
		});
	}

	function filterWithMovieNames(searchTerm){
		var matchingFilms = [];
		searchTerm = searchTerm.toLowerCase();
		for(var i=0;i<filmsData.length;i++){
			var film = filmsData[i];
			var filmName = film.name.toLowerCase();
			if(filmName.indexOf(searchTerm) > -1){
				matchingFilms.push(film);
			}
		}
		return matchingFilms;
	}

});