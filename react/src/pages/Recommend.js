import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { useSelector } from "react-redux";
import './Recommend.css';
  
function Recommend() {
    const initialResults = useSelector((state) => state.initialRecommend.data);
    const [results, setResults] = useState([]);

    useEffect(() => {
        if (initialResults.results) {
        setResults(initialResults.results);
        }
    }, [initialResults.results]);

    const resultCard = (item, i) =>{
        return (<div className="col-3 " key={i}>
                <div className='box-shadow'>
                <Link to="/details" className='shadow'>
                        <div className="border bg-light">
                            <div className='rec-img'>
                            <img className='card-img' src={item.images.split('|').length > 0 ? item.images.split('|')[0] : item.images} alt={item.title} />
                            </div>
                            <div className='rec-details'>
                                <p>{item.title}</p>
                                <span>{item.product_details}</span>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        )
    }
    return (
    <>
      <div className='recommend'>
      <div className="container">
        <div className="row g-3">
        {results.length && results.map((item, id) => resultCard(item, id))}
        </div>
        </div>
      </div>
    </>
    )
}

export default Recommend;
