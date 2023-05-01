import React, { useEffect, useRef, useState } from 'react';
import "./NewUser.css";

import  Amplify, { API } from 'aws-amplify';
// import awsconfig from './aws-exports';

// Amplify.configure(awsconfig);

function NewUserForm() {


  // Define state variables for the form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

//NOTE: replace 'myApiName' with the name of your backend API, and 'users' with the appropriate endpoint path for creating new users in your API.
    const handleSubmit = async (event) => {
        event.preventDefault();
      
        // Create a new user object
        const newUser = {
          name: name,
          email: email,
          password: password
        };
      
        try {
          // Send a POST request to your backend API
          const result = await API.post('myApiName', '/users', { body: newUser });
          console.log('Created new user:', result);
      
          // Clear the form fields
          setName('');
          setEmail('');
          setPassword('');
        } catch (error) {
          console.error('Error creating new user:', error);
        }
      };


  return (
    <div className='recommend'>
        <div class="container">
            <div className='content-box2'>
                <h2 className='content-title'>Create New User</h2>
                <form onSubmit={handleSubmit} className="new-user-form">
                    <label className="form-label">
                        Name: <input className="form-input" type="text" value={name} onChange={(e) => setName(e.target.value)} />
                    </label>
                    <label className="form-label">
                        Email: <input className="form-input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </label>
                    <label className="form-label">
                        Password: <input className="form-input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </label>
                    <button className="form-submit" type="submit">Create User</button>
                </form>
            </div>
        </div>
    </div>
  );
}

export default NewUserForm;
