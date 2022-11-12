import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
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
          <Link to='/home' className='nav-links' onClick={closeNavMenu}>
            Home
          </Link>
        </li>
        <li className='nav-item'>
          <Link to='/register' className='nav-links' onClick={closeNavMenu}>
            Register
          </Link>
        </li>
      </ul>
     </div>

    </nav>
    </>
  )
}

export default Navbar;