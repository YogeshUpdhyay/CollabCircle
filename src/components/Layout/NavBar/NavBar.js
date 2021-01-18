import React from 'react';
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
  NavBtnLink
} from './NavBarElements';
import './NavBar.css'

const Navbar = () => {
  return (
    <>
      <Nav>
        <NavLink to='/'>
          <h2 className = "Logo">CollabCircle</h2>
        </NavLink>
        <Bars />
        <NavMenu>
          <NavLink to='/AboutUs' activeStyle>
            About
          </NavLink>
          <NavLink to='/#Services' activeStyle>
            Services
          </NavLink>
          <NavLink to='/Contact' activeStyle>
            Contact
          </NavLink>
          <NavLink to='/Signup' activeStyle>
            Signup
          </NavLink>
        </NavMenu>
        <NavBtn>
          <NavBtnLink to='/Login'> {localStorage.getItem('access_token') ? "Log Out": "Log in"} </NavBtnLink>
        </NavBtn>
      </Nav>
    </>
  );
};

export default Navbar;