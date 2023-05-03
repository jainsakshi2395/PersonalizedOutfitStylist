import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCardDetails } from "../redux/cardDetails/cardDetailsAction";

const Card = ({ isSimilarImages, item}) => {
  const dispatch = useDispatch();
  const [data, setData] = useState(null);
  useEffect(() => {
    // Get data from session storage
    const storedData = sessionStorage.getItem('detailsData');
    if (storedData) {
      setData(JSON.parse(storedData));
    }
  }, []);
  useEffect(() => {
    // Store data in session storage
    if (data) {
      sessionStorage.setItem('detailsData', JSON.stringify(data));
    }
  }, [data]);
  const handleClick = () => {
    // Set the card details in the Redux store
    let data = { ...item, isSimilarImages: isSimilarImages}
    dispatch(setCardDetails(data));
  };
  return (
    <div className="col-3 ">
      <div className="box-shadow">
        <Link to="/details" onClick={handleClick} className="shadow">
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
export default Card;
