import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Image from './image_1.png'
import './Home.css';

function Home() {

    const navigate = useNavigate();

    function handleStart() {
        navigate("/register");
        window.location.reload();
    }

    return(
        <div className="main-content">
            <div className='container'>
                <h2>INTRODUCTION TO STYLENEX</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                <p className='heading'>How it works?</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                <p className='heading'>What to expect?</p>
                <img src={Image} alt="Image description" /><br />
                <p className='mt-5 text-center'>
                    <button className="yellow-button" type="button" onClick={handleStart}>Start Recommendations</button>
                </p>
            </div>
        </div>
    )
}

export default Home;