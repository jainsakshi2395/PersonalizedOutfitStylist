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
                    {data.outfit_type && (
                      <p>
                        <b>Outfit type: </b> <span>{data.outfit_type}</span>
                      </p>
                    )}
                    {data.base_colour && (
                      <p>
                        <b>Base Colour:</b> <span>{data.base_colour}</span>
                      </p>
                    )}
                    {data.gender && (
                      <p>
                        <b>Gender:</b> <span>{data.gender}</span>
                      </p>
                    )}
                    {data.master_category && (
                      <p>
                        <b>Master Category:</b>{" "}
                        <span>{data.master_category}</span>
                      </p>
                    )}
                    {data.sub_category && (
                      <p>
                        <b>Sub Category:</b> <span>{data.sub_category}</span>
                      </p>
                    )}
                    {data.season && (
                      <p>
                        <b>Season:</b> <span>{data.season}</span>
                      </p>
                    )}
                    {data.usage && (
                      <p>
                        <b>Usage:</b> <span>{data.usage}</span>
                      </p>
                    )}
                    <p className="h5 pt-5 pb-4">
                      <b>Buying Options</b>
                    </p>
                    <div className="options">
                      <div className="option" onClick={() => window.open(`https://www.myntra.com/${data.outfit_type}`, '_blank')}>
                        <div>MYNTRA</div>
                      </div>
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
                          <b className="bold-text">Suitable for age group:</b>{" "}
                          <span>{data.age_group}</span>
                        </p>
                      )}
                      {data.body_type && (
                        <p>
                          <b>Suitable for body type:</b>{" "}
                          <span>{data.body_type}</span>
                        </p>
                      )}
                      {data.ideal_for && (
                        <p>
                          <b>Ideal for:</b> <span>{data.ideal_for}</span>
                        </p>
                      )}
                      {data.product_type && (
                        <p>
                          <b>Product Type:</b> <span>{data.product_type}</span>
                        </p>
                      )}
                      {data.brand && (
                        <p>
                          <b>Brand:</b> <span>{data.brand}</span>
                        </p>
                      )}
                      {data.actual_color && (
                        <p>
                          <b>Colour:</b> <span>{data.actual_color}</span>
                        </p>
                      )}
                      {data.specifications && (
                        <p>
                          <b>Specifications:</b> <br />
                          <ul>{data.specifications.split("|").map((spec) => (
                            <li className="no-bullets"><b>{spec.split(':')[0]}</b>{spec.split(':')[1]}</li>
                          ))}</ul>
                        </p>
                      )}
                      <p className="h5 pt-5 pb-4">
                        <b>Buying Options</b>
                      </p>
                      <div className="options">
                      <div className="option" onClick={() => window.open(data.link, '_blank')}>
                        <div>MYNTRA</div>
                      </div>
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
