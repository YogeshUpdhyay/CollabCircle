import React from 'react';
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
  NavBtnLink
} from './NavbarElements';
import './Navbar.css'
import {postLogOut} from '../../../actions/postSignIn';
import {useDispatch} from 'react-redux';

const Navbar = () => {
  const dispatch = useDispatch();

  const handleClick = ()=>{
    if(localStorage.getItem('access_token')){
      const requestOptions = {
        method: 'POST',
        headers: {
          'accept':'application/json',
          "refresh-token":`${localStorage.getItem('refresh_token')}`
        },
        body:""
      };

      dispatch(postLogOut(requestOptions));
    }
  }

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
          <NavBtnLink to='/Login' onClick={handleClick}> {localStorage.getItem('access_token') ? "Log Out": "Log in"}</NavBtnLink>
        </NavBtn>
      </Nav>
    </>
  );
};

export default Navbar;