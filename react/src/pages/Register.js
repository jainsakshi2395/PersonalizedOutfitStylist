import React, { useState } from 'react';
import './Register.css';
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { postProfile } from '../redux/profile/profileAction';
import { postInitialRecommend } from '../redux/initialRecommend/initialRecommendAction';
 
   
function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [profileState, setProfileState] = useState({
    "age": 0,
    "name": "",
    "height": "",
    "waist": "",
    "bust": "",
    "hip": "",
  });
  const mapProfileState = (profileState) => {
    return {
      user_age: profileState.age,
      user_height: profileState.height,
      user_bust: profileState.bust,
      user_waist: profileState.waist,
      user_hip: profileState.hip
    }
  }
  const submitProfile = (event) => {
    event.preventDefault();
    dispatch(postProfile(profileState));
    const initalRecState = mapProfileState(profileState);
    dispatch(postInitialRecommend(initalRecState));
    navigate("/recommend");
  }
  return (
    <form onSubmit={(e)=> submitProfile(e)}>
    <div className='register-container'>
      <div className='content-box'>
        <h2 className='content-title'>Enter Profile Details</h2>
        <div className='fields-container'>
        <div className='profile-field' >
          <label htmlFor='age'>Age</label>
          <input className='input-field' name='age' onChange={(e) => setProfileState({...profileState, age: e.target.value})} type='number' placeholder='0'required/>
        </div>
        <div className='profile-field' >
          <label htmlFor='height'>Height(ft)</label>
          <input className='input-field' name='height' onChange={(e) => setProfileState({...profileState, height: e.target.value})} type='number' placeholder='0' required/>
        </div>
        <div className='profile-field' >
          <label htmlFor='bust'>Bust(in)</label>
          <input className='input-field' name='bust' onChange={(e) => setProfileState({...profileState, bust: e.target.value})} type='number' placeholder='0' required/>
        </div>
        <div className='profile-field' >
          <label htmlFor='waist'>Waist(in)</label>
          <input className='input-field' name='waist' onChange={(e) => setProfileState({...profileState, waist: e.target.value})} type='number' placeholder='0' required/>
        </div>
        <div className='profile-field' >
          <label htmlFor='hips'>Hips(in)</label>
          <input className='input-field' name='hips' onChange={(e) => setProfileState({...profileState, hip: e.target.value})} type='number' placeholder='0'required/>
        </div>
        <button className='save-button' type="submit">SAVE</button>
      </div>
      </div>
    </div>
    </form>
  )
}

export default Register;
