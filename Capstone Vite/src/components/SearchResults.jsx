import React from 'react';
import Banner from './Banner';
function SearchResults() {
  // Placeholder for search results
    const results = [{ id: 1, title: "Search Result", description: "Search result description..." }];

    return (
        <div>
            <Banner />
            <h1>Search Results</h1>
            {results.map((result) => (
                <div key={result.id}>
                <h2>{result.title}</h2>
                <p>{result.description}</p>
                </div>
            ))}
        </div>
    );
}

export default SearchResults;
