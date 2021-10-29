import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
import SearchBar from "components/SearchBar";
import Results from "components/Results";

export default function LiveSearch(props) {
  const [term, setTerm] = useState("");
  const [results, setResults] = useState([]);

useEffect(() => {
  const testURL = `https://itunes.apple.com/search?term=${term}&country=CA&media=music&entity=album&attribute=artistTerm`
  axios.get(testURL).then(response => {
    setResults([...response.data.results])
  });
  },[term])


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
