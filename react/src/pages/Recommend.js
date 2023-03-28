import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './Recommend.css';

function Recommend() {
    return (
    <>
      <div className='recommend'>
      <div class="container">
        <div class="row g-3">
            <div class="col-3 ">
                <div className='box-shadow'>
                    <a href='/details' className='shadow'>
                        <div class="border bg-light">
                            <div className='rec-img'>
                                <img src='https://dummyimage.com/312x350/e3e3e3/fff.jpg&text=Dummy+Image' alt='Dummy Image' />
                            </div>
                            <div className='rec-details'>
                                <p>Product Name</p>
                                <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.</span>
                            </div>
                        </div>
                    </a>
                </div>
            </div>
            <div class="col-3">
                <div className='box-shadow'>
                    <a href='/details'>
                        <div class="border bg-light">
                            <div className='rec-img'>
                                <img src='https://dummyimage.com/312x350/e3e3e3/fff.jpg&text=Dummy+Image' alt='Dummy Image' />
                            </div>
                            <div className='rec-details'>
                                <p>Product Name</p>
                                <span>Lorem ipsum dolor sit amet, </span>
                            </div>
                        </div>
                    </a>
                </div>
            </div>
            <div class="col-3">
                <div className='box-shadow'>
                    <a href='/details'>
                        <div class="border bg-light">
                            <div className='rec-img'>
                                <img src='https://dummyimage.com/312x350/e3e3e3/fff.jpg&text=Dummy+Image' alt='Dummy Image' />
                            </div>
                            <div className='rec-details'>
                                <p>Product Name</p>
                                <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</span>
                            </div>
                        </div>
                    </a>
                </div>
            </div>
            <div class="col-3">
                <div className='box-shadow'>
                    <a href='/details'>
                        <div class="border bg-light">
                            <div className='rec-img'>
                                <img src='https://dummyimage.com/312x350/e3e3e3/fff.jpg&text=Dummy+Image' alt='Dummy Image' />
                            </div>
                            <div className='rec-details'>
                                <p>Product Name</p>
                                <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.</span>
                            </div>
                        </div>
                    </a>
                </div>
            </div>
            <div class="col-3">
                <div className='box-shadow'>
                    <a href='/details'>
                        <div class="border bg-light">
                            <div className='rec-img'>
                                <img src='https://dummyimage.com/312x350/e3e3e3/fff.jpg&text=Dummy+Image' alt='Dummy Image' />
                            </div>
                            <div className='rec-details'>
                                <p>Product Name</p>
                                <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.</span>
                            </div>
                        </div>
                    </a>
                </div>
            </div>      
        </div>
        </div>
      </div>
    </>
    )
}

export default Recommend;