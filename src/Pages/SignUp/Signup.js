import { CardContent, Grid, TextField, makeStyles, Card } from '@material-ui/core'
import React,{useState,useEffect} from 'react';  
import {Link} from 'react-router-dom';
import './Signup.css';

import img from '../../assets/Login.png' ;

import {useSelector, useDispatch} from 'react-redux';
import {postRegister} from '../../actions/postRegister';


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
  name : "",
  email : "",
  mobile : "",
  password : "",
  cpassword : ""
}


function Signup() {
  const register = useSelector((state) => state.Register);
  const dispatch = useDispatch();

  const classes = useStyles()

  const [values,setValues] = useState(initialFValues);
  const [errors, setErrors] = useState({});
  const [display, setDisplay] = useState({displays:"none",color:"red"});
  const [count, setCount] = useState(0);

  const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('name' in fieldValues)
          temp.name = fieldValues.name ? "" : "This field is required."
        if ('email' in fieldValues)
          temp.email = (/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/).test(fieldValues.email) ? "" : "Email is not valid."
        if ('mobile' in fieldValues)
          temp.mobile = (/^(\+?\d{1,4}[\s-])?(?!0+\s+,?$)\d{10}\s*,?$/).test(fieldValues.mobile) ? "" : "Minimum 10 numbers required."
        if ('password' in fieldValues)
          temp.password = (/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/).test(fieldValues.password) ? "" : "Password must have atleast one special character, one number and have a minimum length of 6"
        // if ('cpassword' in fieldValues){
        //   temp.cpassword = (values.password==values.cpassword) ? "":"Passwords do not match";
        //   console.log(values.password);
        //   console.log(values.cpassword);
        // }

       

        setErrors({
            ...temp
        })

        // if (fieldValues == values)
        //     return Object.values(temp).every(x => x == "")
      }

      useEffect(()=>{
        let temp = { ...errors }
        
        // console.log(values.password);
        // console.log(values.cpassword);
        if(temp.password==="")
          temp.cpassword = (values.password===values.cpassword) ? "":"Passwords do not match";
        else if(temp.password!=="" && values.password!==""){
          temp.cpassword = "Please fill the password field correctly"
        }
        setErrors({
          ...temp
      })
      },[values.cpassword])

      useEffect(()=>{
        if(count){
          if(register.data.detail === "Created")
            setDisplay({...display, display:"block", color:" rgb(25, 212, 50)", message:register.data.detail});
          else
            setDisplay({...display, display:"block", color:"red", message:register.data.detail});
        }else{
          setCount(prevcount=>prevcount+1);
        }
      },[register.data]);

      const handleSubmit = e => {
        e.preventDefault()
        if (errors.name==="" && errors.email==="" && errors.mobile==="" && errors.password==="" && errors.cpassword===""){
          const requestOptions = {
            method: 'POST',
            headers: {
              'accept':'application/json',
              'Content-Type':'application/json'
            },
            body:JSON.stringify({
              "Username":values.email,
              "Password":values.password,
              "Email":values.email,
              "Fullname":values.name
            })
          };

          dispatch(postRegister(requestOptions));

          setDisplay({...display, display:"block", color:" rgb(25, 212, 50)", message:"Loading..."})
        }
        else if(values.name==="" || values.email==="" || values.mobile==="" || values.password==="" || values.cpassword===""){
          setDisplay({...display, displays:"block", message:"please fill in all the fields", color:"red"})
        }
        else{
          setDisplay({...display, displays:"block", message:"please fill in all the fields correctly", color:"red"})
        }
    }


    
  const handleInputChange = (e)=>{
    const { name, value } = e.target
        setValues({
            ...values,
            [name]: value
        })
    validate({ [name]: value })
  }

  return (
      
      <div className={classes.root}>
      <Card className="card"  raised={true} style={{padding:'0px',marginBottom:'50px'}}>
        <CardContent>
        <Grid container justify={"center"}>
          <Grid item lg={6} md={6} >

            <img className="image" src={img} alt=""/>
          </Grid>
          <Grid item lg={6} md={6}>
            <div class="main ">
              <p class="sign" align="center">Sign up</p>
              <form className="form1" autoComplete="off" onSubmit={handleSubmit}>
                
              
              <TextField
                className="field"
                autoComplete = "off"
                name = "name"
                type="text"
                error={errors.name?true:false}
                helperText={errors.name}
                id="outlined-error-helper-text"
                value={values.name}
                variant="outlined"
                label="Full Name"
                style={{marginBottom:'15px'}}
                onChange = {handleInputChange}
              />
              <TextField
                className="field"
                autoComplete = "off"
                name = "email"
                type="text"
                error={errors.email?true:false}
                helperText={errors.email}
                id="outlined-error-helper-text"
                value={values.email}
                variant="outlined"
                label="Email id"
                style={{marginBottom:'15px'}}
                onChange = {handleInputChange}
              />
              <TextField
                className="field"
                autoComplete = "off"
                name = "mobile"
                type="text"
                error={errors.mobile?true:false}
                helperText={errors.mobile}
                id="outlined-error-helper-text"
                value={values.mobile}
                variant="outlined"
                label="Phone Number"
                style={{marginBottom:'15px'}}
                onChange = {handleInputChange}
              />
              <TextField
                className="field"
                autoComplete = "off"
                name = "password"
                type="password"
                error={errors.password?true:false}
                helperText={errors.password}
                id="outlined-error-helper-text"
                value={values.password}
                variant="outlined"
                label="Password"
                style={{marginBottom:'15px'}}
                onChange = {handleInputChange}
              />
              <TextField
                className="field"
                autoComplete = "off"
                name = "cpassword"
                type="password"
                error={errors.cpassword?true:false}
                helperText={errors.cpassword}
                id="outlined-error-helper-text"
                value={values.cpassword}
                variant="outlined"
                label="Confirm Password"
                style={{marginBottom:'15px'}}
                onChange = {handleInputChange}
              />

              <div display={display.displays} style={{marginBottom:'15px',color:display.color}}>{display.message}</div>

              <div><a class="submit" align="center" onClick={handleSubmit}>Sign up</a></div>
              <p class="forgot" align="center">
                <Link className="tag" to="/login">Login</Link>
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

export default Signup
