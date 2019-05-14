function Album(album) {
  /*
    album:Object {
      "wrapperType": "collection",
      "collectionType": "Album",
      "artistId": 1419227,
      "collectionId": 780330041,
      "artistName": "Beyoncé",
      "collectionName": "BEYONCÉ",
      "collectionCensoredName": "BEYONCÉ",
      "artistViewUrl": "https://itunes.apple.com/ca/artist/beyonc%C3%A9/1419227?uo=4",
      "collectionViewUrl": "https://itunes.apple.com/ca/album/beyonc%C3%A9/780330041?uo=4",
      "artworkUrl60": "https://is2-ssl.mzstatic.com/image/thumb/Music6/v4/17/84/3a/17843a6d-1f2b-7e1e-a39f-3ff865110993/source/60x60bb.jpg",
      "artworkUrl100": "https://is2-ssl.mzstatic.com/image/thumb/Music6/v4/17/84/3a/17843a6d-1f2b-7e1e-a39f-3ff865110993/source/100x100bb.jpg",
      "collectionPrice": 15.99,
      "collectionExplicitness": "explicit",
      "contentAdvisoryRating": "Explicit",
      "trackCount": 33,
      "copyright": "℗ 2013 Columbia Records, a Division of Sony Music Entertainment",
      "country": "CAN",
      "currency": "CAD",
      "releaseDate": "2013-12-13T08:00:00Z",
      "primaryGenreName": "Pop"
    }
  */

  const albumInfoClass =
    album.collectionExplicitness === "explicit"
      ? "album__info album__info--explicit"
      : "album__info";

  return $(`
    <article class="album">
      <img class="album__thumbnail" src="${album.artworkUrl100}" alt="Album" />
      <div class="${albumInfoClass}">
        <div class="album__name">${album.collectionName}</div>
        <div class="album__artist">${album.artistName}</div>
      </div>
    </div>
  `);
}

function Albums(albums, filters) {
  /* Apply the filters to the list of albums */
  albums = albums.filter(album => {
    if (
      filters.explicit === false &&
      album.collectionExplicitness === "explicit"
    ) {
      return false;
    }

    if (filters["1900s"] === false && moment(album.releaseDate).year() < 2000) {
      return false;
    }

    if (
      filters["2000s"] === false &&
      moment(album.releaseDate).year() >= 2000
    ) {
      return false;
    }

    if (
      filters.single === false &&
      (album.trackCount === 1 || album.collectionName.endsWith("- Single"))
    ) {
      return false;
    }

    if (
      filters.ep === false &&
      ((album.trackCount >= 4 && album.trackCount <= 6) ||
        album.collectionName.endsWith("- EP"))
    ) {
      return false;
    }

    return true;
  });

  /* Every time this function is called we replace the entire list with the newly created Albums */
  $("section.results")
    .empty()
    .append(albums.map(album => Album(album)));
}
