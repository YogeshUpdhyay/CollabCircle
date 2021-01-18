import React,{useEffect} from 'react';
import Navbar from '../../components/Layout/DashboardNavbar/Navbar'
import {useSelector, useDispatch} from 'react-redux';
import { getUser } from '../../actions/getUser';

function Setting() {
  const info = useSelector((state)=>state.getUser);
  console.log(info)
  const dispatch = useDispatch();

  useEffect(()=>{
    const requestOptions = {
      method: 'GET',
      headers: {
        'accept':'application/json',
        'Authorization':`Bearer ${localStorage.getItem('access_token')}`
      }
    };
    dispatch(getUser(requestOptions));
    console.log(info);
  },[]);

  return (
    <div>
      <Navbar />
    </div>
  )
}

export default Setting
