import React, { Fragment, useState, useEffect } from "react";
import SearchBar from "components/SearchBar";
import Results from "components/Results";
const axios = require('axios');


export default function LiveSearch(props) {
  const [term, setTerm] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    const getURL = `https://itunes.apple.com/search?term=${term}&country=CA&media=music&entity=album&attribute=artistTerm`;
    
    axios.get(getURL)
      .then(response => {
        console.log(response.data.results);
        setResults([...response.data.results]);
      })
      .catch(error => {
        console.log(error);
      })
  }, [term]);

  return (
    <Fragment>
      <header className="logo">
        <img src="images/brand.png" alt="Brand" />
      </header>
      <main>
        <SearchBar onSearch={term => setTerm(term)} />
        <Results results={results} />
      </main>
    </Fragment>
  );
}
