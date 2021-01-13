import React from 'react';
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
        <Route path="/DashBoard" component={Dashboard} />
        <Route path="/BrowseProject" component={BrowseProject} />
        <Route path="/UpdateSettings" component={UpdateSettings} />
      </Switch>
    </div>
    </Router>
  );
}

export default App;
