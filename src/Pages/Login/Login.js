import { CardContent, Grid, Switch, TextField, makeStyles, Card } from '@material-ui/core'
import React,{useState} from 'react';  
import {Link} from 'react-router-dom';
import './Login.css';

import img from '../../assets/Login.png' ;


const useStyles = makeStyles({

  root: {
    display:'flex',
    justifyContent:'center',
    marginTop:'5em' ,
    
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },

});


function Login() {

  const classes = useStyles()

  return (
      
      <div className={classes.root}>
      <Card className="card"  raised={true}>
        <CardContent>
        <Grid container>
          <Grid item md={6}  >

            <img className="image" src={img}/>
          </Grid>
          <Grid item md={6} xs={12}>
            <div class="main ">
              <p class="sign" align="center">Sign in</p>
              <form className="form1">
                  <TextField className="field" type="text" label="Username" variant="outlined" error={false} helperText=""/>
                  <div style={{margin:'15px'}}></div>
                  <TextField className="field" type="password" label="Password" variant="outlined"  error={false} helperText=""/>
                  <div style={{margin:'15px'}}></div>
                  {/* <input class="un " type="text" align="center" placeholder="Username"/>
                  <input class="pass" type="password" align="center" placeholder="Password"/> */}
                  <div><a class="submit" align="center">Sign in</a></div>
                  <p class="forgot" align="center">
                    <Link className="tag" to="/Signup">Sign Up</Link>
                  </p> 
              </form>
            </div>
          </Grid>
        </Grid>
        </CardContent>
      </Card>
      </div>
        
      
  )
}

export default Login
