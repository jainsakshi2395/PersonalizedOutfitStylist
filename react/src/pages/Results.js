import React from "react";
import Card from "./Card";

function Results({ results, isSimilarImages }) {
  return (
    <div className="container">
      <div className="row g-3">
        {results.map((item, id) => <Card key={id} isSimilarImages ={isSimilarImages} item = {item} />)}
      </div>
    </div>
  );
}

export default Results;
