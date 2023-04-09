import React, { useState } from 'react';
import './Register.css';
import { useDispatch } from 'react-redux';
import { postProfile } from '../redux/profile/profileAction';

function Register() {
  const dispatch = useDispatch();
  const [profileState, setProfileState] = useState({
    "age": 0,
    "name": "",
    "height": "",
    "waist": "",
    "bust": "",
    "hip": "",
  });
  const submitProfile = () => {
    dispatch(postProfile(profileState));
  }
  return (
    <div className='register-container'>
      <div className='content-box'>
        <h2 className='content-title'>Enter Profile Details</h2>
        <div className='fields-container'>
        <div className='profile-field' >
          <label for='age'>Age</label>
          <input className='input-field' name='age' onChange={(e) => setProfileState({...profileState, age: e.target.value})} type='number' placeholder='0'/>
        </div>
        <div className='profile-field' >
          <label for='height'>Height(cm)</label>
          <input className='input-field' name='height' onChange={(e) => setProfileState({...profileState, height: e.target.value})} type='number' placeholder='0'/>
        </div>
        <div className='profile-field' >
          <label for='bust'>Bust(cm)</label>
          <input className='input-field' name='bust' onChange={(e) => setProfileState({...profileState, bust: e.target.value})} type='number' placeholder='0'/>
        </div>
        <div className='profile-field' >
          <label for='waist'>Waist(cm)</label>
          <input className='input-field' name='waist' onChange={(e) => setProfileState({...profileState, waist: e.target.value})} type='number' placeholder='0'/>
        </div>
        <div className='profile-field' >
          <label for='hips'>Hips(cm)</label>
          <input className='input-field' name='hips' onChange={(e) => setProfileState({...profileState, hip: e.target.value})} type='number' placeholder='0'/>
        </div>
        <button className='save-button' onClick={submitProfile}>SAVE</button>
      </div>
      </div>
    </div>
  )
}

export default Register;
