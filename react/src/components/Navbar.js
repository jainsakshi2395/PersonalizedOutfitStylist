import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { Auth } from 'aws-amplify';
import {AmplifySignOut} from '@aws-amplify/ui-react';
import { useNavigate } from "react-router-dom";

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function checkAuthState() {
      try {
        await Auth.currentAuthenticatedUser();
        setIsLoggedIn(true);
      } catch (error) {
        setIsLoggedIn(false);
      }
    }

    checkAuthState();
  }, []);

  function handleSignOut() {
    Auth.signOut()
      .then(() => {
        // Redirect to the sign-in page
        navigate("/");
        window.location.reload();
      })
      .catch(error => {
        console.log('Error signing out:', error);
      });
  }

  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click)
  const closeNavMenu = () => { 
    setClick(false);
  }
  return (
    <>
    <nav className='navbar'>
     <div className='navbar-container'>
      <Link to='/' className='navbar-logo'>
        STYLENEX
      </Link>
      <div className='menu-icon' onClick={handleClick}>
        <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
      </div>
      <ul className={click? 'nav-menu active': 'nav-menu'}>
        <li className='nav-item'>
          <Link to='/register' className='nav-links' onClick={closeNavMenu}>
            Profile
          </Link>
        </li>
        <li className='nav-item'>
          <Link to='/recommend' className='nav-links' onClick={closeNavMenu}>
            Recommendations
          </Link>
        </li>
        <li className='nav-item'>
          <div className='nav-links'>
            {isLoggedIn ? (
              <button className="yellow-button" type="button" onClick={handleSignOut}>Sign Out</button>
            ) : (
              <span></span>
            )}
          </div>
        </li>
      </ul>
     </div>

    </nav>
    </>
  )
}

export default Navbar;