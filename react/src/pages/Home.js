import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import './Home.css';
import Image2 from './image_2.png'
import Image3 from './image_3.png'

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
                <div className='text pr-3'>
                    <p>Welcome to our fashion recommendation website! We specialize in personalized outfit recommendations based on your body measurements, season, age, and body type. Whether you're looking for a casual everyday outfit or something more formal, our algorithm will provide you with tailored recommendations that suit your unique style.</p>
                    <p>We also offer a unique feature where you can upload an image of an outfit you love, and we'll recommend similar items from our extensive collection. Our goal is to help you find the perfect outfit that not only fits you perfectly, but also makes you feel confident and stylish. Our website is user-friendly and easy to navigate, so you can find the perfect outfit quickly and easily. With our personalized recommendations and extensive collection, you're sure to find the perfect outfit for any occasion. So, start exploring and discover your new favorite outfit today!</p>
                </div>
                <div className='image'>
                    <img src={Image2} alt="Fashion 1" />
                </div>
                <div className='clear'></div>
                <br/>
                <div className='image'>
                    <img src={Image3} alt="Fashion 2" />
                </div>
                <div className='text pl-3'>
                    <p className='heading'>How it works?</p>
                    <p>Our fashion recommendation system is easy to use. Simply enter your measurements and select your age group, and we'll generate a list of clothing items that are perfect for you. You can browse through the items and see recommendations for different outfits and accessories that will complement your personal style. You get to update your filters and choose from other filters to get more desirable recommendations.</p>
                </div>
                <div className='clear'></div>
                <br/>
                <p>To get started with your personalized fashion recommendations, follow these simple steps:</p>
                <ul>
                    <li>
                        Step 1: Visit your profile page and enter your measurements, including bust, waist, hips, and height (in cm). This will help us determine your body type and provide initial recommendations based on your unique measurements.

                    </li>
                    <li>
                        Step 2: Enter your age and save your profile details to begin receiving recommendations tailored to your individual style.
                    </li>
                    <li>
                        Step 3: On the recommendations page, you'll find two tabs: "Filters" and "Upload." In the "Filters" tab, you can select different filters such as age, body type, and seasons, each resulting in a unique set of recommendations based on your selections. For example, if you're between the ages of 1-12, you'll fall under the "Children" category, while ages 13-19 are categorized as "Teens," and ages 20-40 fall under the "Adult" category.
                    </li>
                    <li>
                        Step 4: In the "Upload" tab, you have the option to upload an image and receive recommendations similar to the style in the image. This feature provides a more visual and interactive experience, allowing you to see fashion recommendations that align with your personal style preferences.
                    </li>
                </ul>
                <p>We hope our fashion recommendation system makes shopping for clothes a more enjoyable and stress-free experience. By using machine learning to provide personalized recommendations based on your body type, age, and season, we're committed to helping you find clothes that fit well and make you feel confident and stylish.</p>
                <p className='mt-5 text-center'>
                    <button className="yellow-button" type="button" onClick={handleStart}>Start Recommendations</button>
                </p>
            </div>
        </div>
    )
}

export default Home;