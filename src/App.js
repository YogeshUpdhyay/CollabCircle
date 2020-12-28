import React from 'react';
import { BrowserRouter as Router,Switch,Route } from 'react-router-dom';
import './App.css';
import Login from './Pages/Login/Login';
import Signup from './Pages/SignUp/Signup';
import HomePage from './Pages/HomePage/Homepage' ;
import AboutUs from './Pages/AboutUs/AboutUs' ;
import EditProfile from './Pages/MyProfile/EditProfile/EditProfile' ;
import BrowseProjects from './Pages/BrowseProjects/BrowseProjects' ;

function App() {
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
      </Switch>
    </div>
    </Router>
  );
}

export default App;
