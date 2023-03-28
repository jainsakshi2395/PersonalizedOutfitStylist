import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './Details.css';

function Details() {
    return (
    <>
      <div className='details'>
      <div class="container">
        <div class="row g-3">
            <div class="col-4 text-center">
                <div className=''>
                    <img src='https://img.ltwebstatic.com/images3_pi/2022/05/24/16533584254279e8c278cd25e1270bbb50e8b417dc_thumbnail_810x.webp' alt='Dummy Image' />
                </div>
            </div>
            <div class="col-6">
                <div className='text-justify'>
                    <h2 className='mb-4'>LINEN GATHERED FLOWY DRESS</h2>
                    <p><b>Suitable for body type:</b> <span>Hour Glass</span></p>
                    <p className='h5 pt-5 pb-4'><b>Buying Options</b></p>
                    <div className='links'>
                        <a href='#'>SHEIN</a>
                    </div>
                </div>
            </div>   
        </div>
        </div>
      </div>
    </>
    )
}

export default Details;