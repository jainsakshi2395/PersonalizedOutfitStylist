import React from "react";
import Card from "./Card";
import "./Results.css";

function Results({
  results,
  isSimilarImages,
  isAgeFiltered,
  isBodyTypeFiltered,
  isSeasonFiltered,
}) {
  return (
    <div className="container">
      <div className="row g-3">
        {isSimilarImages ? (
          results.map((item, id) => (
            <Card key={id} isSimilarImages={isSimilarImages} item={item} />
          ))
        ) : (
          <>
            {isAgeFiltered && (
            <>
              <div>Based on Age Group</div>
              {results.filter((item) => item.age_group != null ).map((item, id) => (
                <Card key={id} isSimilarImages={isSimilarImages} item={item} />
              ))}
            </>)}
            {isBodyTypeFiltered && (
            <>
            <div className="horizontal_divider"></div>
            <div>Based on Body Type</div>
              {results.filter((item) => item.body_type != null ).map((item, id) => (
                <Card key={id} isSimilarImages={isSimilarImages} item={item} />
              ))}
            </>)}
            {isSeasonFiltered && (
            <>
            <div className="horizontal_divider"></div>
            <div>Based on Seasons</div>
              {results.filter((item) => item.season != null ).map((item, id) => (
                <Card key={id} isSimilarImages={isSimilarImages} item={item} />
              ))}
            </>)}
          </>
        )}
      </div>
    </div>
  );
}

export default Results;
