const apiKey = "";
const searchUrl = "https://developer.nps.gov/api/v1/parks";

function displayResults(responseJson){
  console.log(responseJson);
  $("#results-list").empty();

  for (let i=0; i<responseJson.data.length; i++){
    $('#results-list').append(
      `<li>
      <h3>${responseJson.data[i].fullName}</h3>
      <p>${responseJson.data[i].description}</p>
      <a href="${responseJson.data[i].url}">${responseJson.data[i].url}</a>
      </li>`
    )
  };
  $("#results").removeClass("hidden");
}

function getYoutubeVideos(searchTerm, maxResults, stateSearch){
  const params = {
    api_key: apiKey,
    q: searchTerm,
    stateCode: stateSearch,
    limit: maxResults
  };

  let queryString = $.param(params);
  console.log("query Stringified", queryString);
  const url = searchUrl + "?" +queryString;
  console.log("url", url);

  fetch(url).then(response => {
    if(response.ok) {
      return response.json();
    }
    throw new Error(response.statusText);
  }).then(responseJson => displayResults(responseJson))
  .catch(err=> {
    $('#js-error-message').text(`Something Failed ${err.message}`);
  })
}

function watchForm(){
  $('form').submit(event => {
    event.preventDefault();
    const searchTerm = $('#search-term').val();
    const maxResults = $('#max-results').val();
    const stateSearch = $('#state-search').val();
    console.log("data", searchTerm, maxResults, stateSearch);
    getYoutubeVideos(searchTerm, maxResults, stateSearch);
  });
}

$(watchForm)