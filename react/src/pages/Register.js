import React from 'react'
import './Register.css';

function Register() {
  const submitProfile = () => {
    //submit action dispatch
  }
  return (
    <div className='register-container'>
      <div className='content-box'>
        <h2 className='content-title'>Enter Profile Details</h2>
        <div className='fields-container'>
        <div className='profile-field' >
          <label for='age'>Age</label>
          <input className='input-field' name='age' type='number' placeholder='0'/>
        </div>
        <div className='profile-field' >
          <label for='height'>Height(cm)</label>
          <input className='input-field' name='height' type='number' placeholder='0'/>
        </div>
        <div className='profile-field' >
          <label for='bust'>Bust(cm)</label>
          <input className='input-field' name='bust' type='number' placeholder='0'/>
        </div>
        <div className='profile-field' >
          <label for='waist'>Waist(cm)</label>
          <input className='input-field' name='waist' type='number' placeholder='0'/>
        </div>
        <div className='profile-field' >
          <label for='hips'>Hips(cm)</label>
          <input className='input-field' name='hips' type='number' placeholder='0'/>
        </div>
        <button className='save-button' onClick={submitProfile}>SAVE</button>
      </div>
      </div>
    </div>
  )
}

export default Register