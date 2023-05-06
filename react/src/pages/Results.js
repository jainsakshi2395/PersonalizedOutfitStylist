import React, { useState } from "react";
import Card from "./Card";
import "./Results.css";

function Results({
  results,
  isSimilarImages,
  isAgeFiltered,
  isBodyTypeFiltered,
  isSeasonFiltered,
}) {
  const [showAllAge, setShowAllAge] = useState(false);
  const [visibleAgeItems, setVisibleAgeItems] = useState(10);

  const toggleShowAllAge = () => {
    setShowAllAge(!showAllAge);
    if (!showAllAge) {
      setVisibleAgeItems(50); //replace with lenght of results array
    } else {
      setVisibleAgeItems(10);
    }
  };

  const [showAllBt, setShowAllBt] = useState(false);
  const [visibleBtItems, setVisibleBtItems] = useState(10);

  const toggleShowAllBt = () => {
    setShowAllBt(!showAllBt);
    if (!showAllBt) {
      setVisibleBtItems(50); //replace with lenght of results array
    } else {
      setVisibleBtItems(10);
    }
  };

  const [showAllSeas, setShowAllSeas] = useState(false);
  const [visibleSeasItems, setVisibleSeasItems] = useState(10);

  const toggleShowAllSeas = () => {
    setShowAllSeas(!showAllSeas);
    if (!showAllSeas) {
      setVisibleSeasItems(50); //replace with lenght of results array
    } else {
      setVisibleSeasItems(10);
    }
  };
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
                <div className="bold-text">Based on Age Group</div>
                {results
                  .filter((item) => item.age_group != null)
                  .slice(0, visibleAgeItems)
                  .map((item, id) => (
                    <Card
                      key={id}
                      isSimilarImages={isSimilarImages}
                      item={item}
                    />
                  ))}
                <button className="yellow-button" onClick={toggleShowAllAge}>
                  {showAllAge ? "Show Less" : "Show More"}
                </button>
              </>
            )}
            {isBodyTypeFiltered && (
              <>
                <div className="horizontal_divider"></div>
                <div className="bold-text">Based on Body Type</div>
                {results
                  .filter((item) => item.body_type != null)
                  .slice(0, visibleBtItems)
                  .map((item, id) => (
                    <Card
                      key={id}
                      isSimilarImages={isSimilarImages}
                      item={item}
                    />
                  ))}
                  <button className="yellow-button" onClick={toggleShowAllBt}>
                  {showAllBt ? "Show Less" : "Show More"}
                </button>
              </>
            )}
            {isSeasonFiltered && (
              <>
                <div className="horizontal_divider"></div>
                <div className="bold-text">Based on Seasons</div>
                {results
                  .filter((item) => item.season != null)
                  .slice(0, visibleSeasItems)
                  .map((item, id) => (
                    <Card
                      key={id}
                      isSimilarImages={isSimilarImages}
                      item={item}
                    />
                  ))}
                  <button className="yellow-button" onClick={toggleShowAllSeas}>
                  {showAllSeas ? "Show Less" : "Show More"}
                </button>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Results;
