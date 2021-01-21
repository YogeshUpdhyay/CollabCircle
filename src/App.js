import React,{useEffect, useState} from 'react';
import { BrowserRouter as Router,Switch,Route } from 'react-router-dom';
import './App.css';
import Login from './Pages/Login/Login';
import Signup from './Pages/SignUp/Signup';
import HomePage from './Pages/HomePage/Homepage' ;
import AboutUs from './Pages/AboutUs/AboutUs' ;
import EditProfile from './Pages/MyProfile/EditProfile/EditProfile' ;
import BrowseProjects from './Pages/BrowseProjects/BrowseProjects' ;
import BrowseProject from './Pages/BrowseProject/BrowseProject' ;
import Dashboard from './Pages/Dashboard/Dashboard';
import UpdateSettings from './Pages/Settings/UpdateSettings';
import Setting from './Pages/Setting/Setting';
import Cookies from 'js-cookie';


function App() {
  const [loggedIn, setLoggedIn] = useState(0);

  const handleTokenRefresh = ()=>{
    const refToken = Cookies.get('refresh_token');
    if(!refToken){
      setLoggedIn(0);
      return
    }
    else{
      const requestOptions = {
        method: 'POST',
        headers: {
          'accept':'application/json',
          "refresh-token":`${Cookies.get('refresh_token')}`
        },
        body:""
      }
      fetch("http://35.154.56.92:8087/api/v1/user/refresh",requestOptions)
        .then(response=>response.json())
        .then(data=>{
          console.log(data);
        })
        .catch(err=>{
          console.log(err);
        })
    }
  }

  useEffect(()=>{
    const token = Cookies.get('access_token');
    if(!!token){
      setLoggedIn(1);
    }
    else if(!!Cookies.get('refresh_token')){
      setLoggedIn(0);
    }
    else{
      handleTokenRefresh();
    }
  },[loggedIn])

  return (
    <Router>
    <div className="App">
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/#Services" exact component={HomePage} />
        <Route path="/login" exact component={Login}/>
        <Route path="/Signup" component={Signup}/>
        <Route path="/AboutUs" component={AboutUs}/>
        <Route path="/EditProfile" component={EditProfile} />
        <Route path="/BrowseProjects" component={BrowseProjects} />
        <Route path="/DashBoard" component={Dashboard} />
        <Route path="/BrowseProject" component={BrowseProject} />
        <Route path="/UpdateSettings" component={UpdateSettings} />
        <Route path="/Setting" component={Setting} />
      </Switch>
    </div>
    </Router>
  );
}

export default App;
