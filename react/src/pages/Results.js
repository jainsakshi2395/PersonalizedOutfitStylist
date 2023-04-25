import React from "react";
import { Link } from "react-router-dom";

function Results({ results, isSimilarImages }) {
  const resultCard = (item, i) => {
    return (
      <div className="col-3 " key={i}>
        <div className="box-shadow">
          <Link to="/details" className="shadow">
            {isSimilarImages ? (
              <>
                <div className="border bg-light">
                  <div className="rec-img">
                    <img
                      className="card-img"
                      src={item.image_link}
                      alt={item.description}
                    />
                  </div>
                  <div className="rec-details">
                    <p>{item.outfit_type}</p>
                    <span>{item.description}</span>
                  </div>
                </div>
              </>
            ) : (
              <div className="border bg-light">
                <div className="rec-img">
                  <img
                    className="card-img"
                    src={
                      item.images.split("|").length > 0
                        ? item.images.split("|")[0]
                        : item.images
                    }
                    alt={item.title}
                  />
                </div>
                <div className="rec-details">
                  <p>{item.title}</p>
                  <span>{item.product_details}</span>
                </div>
              </div>
            )}
          </Link>
        </div>
      </div>
    );
  };
  return (
    <div className="container">
      <div className="row g-3">
        {results.map((item, id) => resultCard(item, id))}
      </div>
    </div>
  );
}

export default Results;
