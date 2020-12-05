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
            Projects
          </NavLink>
          <NavLink to='/Signup' activeStyle>
            Profile
          </NavLink>
        </NavMenu>
        <NavBtn>
          <NavBtnLink to='/Login'> Log In</NavBtnLink>
        </NavBtn>
      </Nav>
    </>
  );
};

export default Navbar;