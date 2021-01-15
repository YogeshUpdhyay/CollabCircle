import { CardContent, Grid, Switch, TextField, makeStyles, Card } from '@material-ui/core'
import React,{useState, useEffect} from 'react';  
import {Link} from 'react-router-dom';
import './Login.css';

import img from '../../assets/Login.png';

import {useSelector, useDispatch} from 'react-redux';
import {postSignIn} from '../../actions/postSignIn';


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

const initialFValues = {
  username : "",
  password : ""
}

function Login() {
  const signin = useSelector((state) => state.SignIn);
  const dispatch = useDispatch();

  const [values, setValues] = useState(initialFValues);
  const [display, setDisplay] = useState({displays:"none", color: "red"})
  const [count, setCount] = useState(0);

  const classes = useStyles()

  const handleInputChange = (e)=>{
    const {name,value} = e.target;
    setValues({
      ...values,
      [name]: value
    })
  }

  const handleSubmit = (e)=>{
    e.preventDefault();
    if(values.username && values.password){
      const requestOptions = {
        method: 'POST',
        headers: {
          'accept':'application/json',
          "Username-Email":values.username,
          "Password":values.password
        },
        body:""
      };

      dispatch(postSignIn(requestOptions));

      setDisplay({...display, display:"block", color:" rgb(25, 212, 50)", message:"Loading..."});
    }
  }

  useEffect(()=>{
    if(count){
      if(signin.data.detail)
        setDisplay({...display, display:"block", color:"red", message:signin.data.detail});
      else if(signin.data.access_token){
        window.location.href='DashBoard';
        console.log(signin.data);
      }
    }else{
      setCount(prevcount=>prevcount+1);
    }
  },[signin.data]);
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
                  <TextField 
                    className="field" 
                    autoComplete="OFF"
                    name="username"
                    type="text" 
                    value={values.username}
                    label="Username" 
                    variant="outlined" 
                    error={false} 
                    helperText=""
                    onChange={handleInputChange}
                  />
                  <div style={{margin:'15px'}}></div>
                  <TextField 
                    className="field" 
                    type="password" 
                    name="password"
                    value={values.password}
                    label="Password" 
                    variant="outlined"  
                    error={false} 
                    helperText=""
                    onChange={handleInputChange}
                  />
                  <div style={{margin:'15px'}}></div>
                  {/* <input class="un " type="text" align="center" placeholder="Username"/>
                  <input class="pass" type="password" align="center" placeholder="Password"/> */}
                  <div display={display.displays} style={{marginBottom:'15px',color:display.color}}>{display.message}</div>
                  <div><a class="submit" align="center" onClick={handleSubmit}>Sign in</a></div>
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
