import React, { useEffect, useRef, useState } from 'react';
import "./NewUser.css";
import  Amplify, { Auth } from 'aws-amplify';
import {withAuthenticator, AmplifyAuthenticator} from '@aws-amplify/ui-react';
import awsconfig from '../aws-exports';
import { useNavigate } from "react-router-dom";
Amplify.configure(awsconfig);
Auth.configure(awsconfig);

// Amplify.configure(awsconfig);

function NewUserForm() {

    // Define state variables for the form fields
    const [showLoginForm, setShowLoginForm] = useState(true);
    const [showSignupForm, setShowSignupForm] = useState(false);
    const [showVerificationForm, setShowVerificationForm] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [verificationCode, setVerificationCode] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    async function handleLogin(event) {
        event.preventDefault();
    
        try {
          await Auth.signIn(username, password);
          // Redirect the user 
          navigate("/register");
        } catch (error) {
          setErrorMessage(error.message);
        }
      }
    
      async function handleSignup(event) {
        event.preventDefault();
    
        try {
          await Auth.signUp({
            username: username,
            password,
            attributes: {
              email,
            },
          });
          setShowSignupForm(false);
          setShowVerificationForm(true)
          setErrorMessage('');
        } catch (error) {
          setErrorMessage(error.message);
        }
      }
    
      async function handleVerify(event) {
        event.preventDefault();
    
        try {
          await Auth.confirmSignUp(username, verificationCode);
          // Redirect the user 
          navigate("/register");
        } catch (error) {
          setErrorMessage(error.message);
        }
      }
    
      async function handleResendCode(event) {
        event.preventDefault();
    
        try {
          await Auth.resendSignUp(email);
          setErrorMessage('');
        } catch (error) {
          setErrorMessage(error.message);
        }
      }
    
      function showLogin() {
        setShowLoginForm(true);
        setShowSignupForm(false);
        setErrorMessage('');
      }
    
      function showSignup() {
        setShowLoginForm(false);
        setShowSignupForm(true);
        setErrorMessage('');
      }

  return (
    <div className='recommend'>
        <div class="container">
        {showLoginForm && (
            <div className='content-box2'>
                <h2 className='content-title'>Create New User</h2>
                <form onSubmit={handleLogin} encType="multipart/form-data" className="new-user-form">
                    <label className="form-label">
                        Username: <input className="form-input" type="text" name="fullname" value={username} onChange={(e) => setUsername(e.target.value)} />
                    </label>
                    <label className="form-label">
                        Password: <input className="form-input" type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </label>
                    <div className='buttons'>
                        <button className="form-submit" type="submit">Log In</button>
                        <button className="form-submit" type="button" onClick={showSignup}>Sign up</button>
                    </div>
                </form>
            </div>
        )}
        {showSignupForm && (
            <div className='content-box2'>
                <h2 className='content-title'>Create New User</h2>
                <form onSubmit={handleSignup} encType="multipart/form-data" className="new-user-form">
                    <label className="form-label">
                        Username: <input className="form-input" type="text" name="fullname" value={username} onChange={(e) => setUsername(e.target.value)} />
                    </label>
                    <label className="form-label">
                        Email: <input className="form-input" type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </label>
                    <label className="form-label">
                        Password: <input className="form-input" type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </label>
                    <div className='buttons'>
                        <button className="form-submit" type="submit">Create User</button>
                        <button className="form-submit" type="button" onClick={showLogin}>Log in</button>
                    </div>
                </form>
            </div>
        )}
        {showVerificationForm && (
            <div className='content-box3'>
                <h2 className='content-title'>Create New User</h2>
                <form onSubmit={handleVerify} encType="multipart/form-data" className="new-user-form">
                    <label>
                        Verification code: <input type="text" value={verificationCode} onChange={event => setVerificationCode(event.target.value)} />
                    </label>
                    <button type="submit" className="form-submit">Verify</button>
                    <p>Didn't receive a code? <button type="button" className="form-submit" onClick={handleResendCode}>Resend code</button></p>
                </form>
            </div>
        )}
        </div>
    </div>
  );
}

export default NewUserForm;
// export default withAuthenticator(NewUserForm);