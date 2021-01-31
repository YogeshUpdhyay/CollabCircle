import React from 'react';
import {Link} from 'react-router-dom';
import './Homepage.css';
import NavBar from '../../components/Layout/NavBar/NavBar';
import Footer from '../../components/Layout/Footer/index'
import { makeStyles } from '@material-ui/core';
import {
  Grid,
  Button,
  Typography

} from '@material-ui/core'
import './Homepage.css'
import banner from '../../assets/banner_header_600.png'
import create_banner from '../../assets/create_banner.png';
import code from '../../assets/code.png';
import connect from '../../assets/connect_.png';
import inspire from '../../assets/inspire_.png';


export default function Homepage() {

  return (
    <div className="Home">
      <NavBar />
      <div>
        <Grid container spacing={1}>

          <Grid item xs={12} md={6} lg={6} className="header_background">
            <h2 className="header_banner">Join the developers community and create amazing projects with your peers</h2>
            <button className="btn third" ><Link  to="/Signup">Join Now</Link></button>
          </Grid>

          <Grid item xs={12} md={6} lg={6} className="header_background">
            <img src={banner} ></img>
          </Grid>

        </Grid>
        <br>
        </br>
        <Grid container spacing={1}>
          <Grid item xs={12} md={12} lg={12} className="header_background">
            <Typography variant = "h4" className = "heading">Start your developer journey</Typography>
          </Grid>
          <ul class="timeline">

            <li>
              <div class="direction-r">
                <div class="flag-wrapper">
                  <div>
                    <img src={code} className="timeline_image"></img>
                  </div>
                  <span class="flag">Create</span>
                </div>
                <div class="desc">Break you head and prove your skillset.Upskill yourself by creating a project in any tech stack you want</div>
              </div>
            </li>


            <li>
              <div class="direction-l">
                <div class="flag-wrapper">
                  <div>
                    <img src={connect} className="timeline_image"></img>
                  </div>
                  <span class="flag">Connect</span>
                </div>
                <div class="desc_left" >My first employer. All the stuff I've learned and projects I've been working on.</div>
              </div>
            </li>

            <li>
              <div class="direction-r">
                <div class="flag-wrapper">
                  <div>
                    <img src={inspire} className="timeline_image"></img>
                  </div>
                  <span class="flag">Inspire</span>
                </div>
                <div class="desc">My first employer. All the stuff I've learned and projects I've been working on.</div>

               
              </div>
            </li>

          </ul>



        </Grid>
      </div>
   

    </div>
  )
}
