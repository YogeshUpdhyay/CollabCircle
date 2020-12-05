import React from 'react' ;
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Connect from "../../../assets/Connect.png";
import Create from "../../../assets/Create.png" ;
import Inspire from "../../../assets/Inspire.png";
import './AboutUs.css' ;



export default function AboutUs() {
  return (
    <div>
    <Grid container className = "Body">
        <Grid item md ={5}>
          <img src = {Connect} className = "Connect__img"></img>
        </Grid>
        <Grid item md ={7}>
          <div className = "Info__right" >
            <h1>Connect</h1>
            <h4>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</h4>
          </div>
        </Grid>
      </Grid>
      <br></br>
      <Grid container className = "Body">
        <Grid item md ={6}>
          <div className = "Info">
            <h1 >Create</h1>
            <h4>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</h4>
          </div>
        </Grid>
        <Grid item md = {6}>
          <img src = {Create} className = "Connect__img"></img>
        </Grid>

      </Grid>
      <br></br>
      <Grid container className = "Body">
        <Grid item md = {5}>
          <img src = {Inspire} className = "Connect__img"></img>
        </Grid>
        <Grid item md = {7}>
          <div className = "Info__right" >
            <h1>Inspire</h1>
            <h4>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</h4>
          </div>
        </Grid>
      </Grid>

      
    </div>
  )
}
