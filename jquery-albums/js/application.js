$(function() {
  /* We need to keep track of the albums so that we can re-filter */
  const state = {
    albums: [],
    filters: {
      explicit: true,
      "1900s": true,
      "2000s": true,
      single: false,
      ep: false
    }
  };

  function setFilterDefaults() {
    $("input[type=checkbox]").each((index, element) => {
      element.checked = state.filters[element.name];
    });
  }

  function callApi(artist) {
    /* Set the spinner state to visible using a CSS class */
    $(".spinner").addClass("spinner--visible");

    /* Start the async request */
    $.get({
      url: `https://itunes.apple.com/search?term=${artist}&country=CA&media=music&entity=album&attribute=artistTerm`,
      dataType: "json"
    })
      .done(response => {
        /* Set the spinner state back to default */
        $(".spinner").removeClass("spinner--visible");

        /* Pass the array of results for the album search */
        state.albums = response.results;

        /* Sort by releaseDate with newest first */
        state.albums.sort((a, b) => {
          if (moment(b.releaseDate).isAfter(moment(a.releaseDate))) {
            return 1;
          }
          if (moment(b.releaseDate).isBefore(moment(a.releaseDate))) {
            return -1;
          }
          return 0;
        });

        Albums(state.albums, state.filters);
      })
      .fail(error => {
        $(".spinner").removeClass("spinner--visible");

        $("section.error").addClass("error--visible");

        state.albums = [];

        $("input[name=search]").val("");

        Albums(state.albums, state.filters);
      });
  }

  /* Create the query using a debounce wrapper */
  const query = createDebounce(
    callApi,
    400
  ); /* How long to wait before executing debounced function */

  $(".search__form").on("submit", function(event) {
    /* Need to prevent default when the user presses the Enter button on the input */
    event.preventDefault();
  });

  $("input[name=search]").on("input", function(event) {
    event.preventDefault();

    /* Every input tries to query with the value being the name of the artist */
    query(event.target.value);
  });

  $("input[type=checkbox").on("change", function(event) {
    state.filters[event.target.name] = event.target.checked;

    Albums(state.albums, state.filters);
  });

  $("section.error").on("click", function(event) {
    $(event.currentTarget).removeClass("error--visible");
  });

  /* DOM is ready set the filters to match the state */
  setFilterDefaults();
});
