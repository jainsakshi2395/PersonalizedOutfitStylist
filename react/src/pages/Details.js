import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "./Details.css";

function Details() {
  let cardDetails = useSelector((state) => state.cardDetails);
  cardDetails = cardDetails.cardDetails;
  const [data, setData] = useState(cardDetails);

  useEffect(() => {
    // Store data in session storage
    if (data) sessionStorage.setItem("detailsData", JSON.stringify(data));
  }, [data]);

  useEffect(() => {
    // Retrieve data from session storage
    const storedData = sessionStorage.getItem("detailsData");
    setData(storedData ? JSON.parse(storedData) : cardDetails);
  }, []);

  return (
    <>
      <div className="details">
        {data ? (
          <div className="container">
            {data.isSimilarImages ? (
              <div className="row g-3">
                <div className="col-4 text-center">
                  <div className="">
                    <img src={data.image_link} alt={data.description} />
                  </div>
                </div>
                <div className="col-6">
                  <div className="text-justify">
                    <h2 className="mb-4">{data.description}</h2>
                    <p>
                      <b>Outfit type:</b> <span>{data.outfit_type}</span>
                    </p>
                    <p className="h5 pt-5 pb-4">
                      <b>Buying Options</b>
                    </p>
                    <div className="links">
                      <a href="#">SHEIN</a>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <div className="row g-3">
                  <div className="col-4 text-center">
                    <div className="">
                      <img
                        src={
                          data.images.split("|").length > 0
                            ? data.images.split("|")[0]
                            : data.images
                        }
                        alt={data.title}
                      />
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="text-justify">
                      <h2 className="mb-4">{data.title}</h2>
                      <p>{data.product_details}</p>
                      {data.age_group && (
                        <p>
                          <b>Suitable for age group:</b>{" "}
                          <span>{data.age_group}</span>
                        </p>
                      )}
                      {data.body_type && (
                        <p>
                          <b>Suitable for body type:</b>{" "}
                          <span>{data.body_type}</span>
                        </p>
                      )}
                      <p className="h5 pt-5 pb-4">
                        <b>Buying Options</b>
                      </p>
                      <div className="links">
                        <a href="#">SHEIN</a>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        ) : (
          <div className="text-center">An error occured please try again!</div>
        )}
      </div>
    </>
  );
}

export default Details;
