import React,{useEffect,useState} from 'react';
import Dashnav from '../../components/Layout/Dashboard_navbar/Dashboard_Nav'
import {useSelector, useDispatch} from 'react-redux';
import { deleteUser, getUser } from '../../actions/getUser';
import { makeStyles } from '@material-ui/core/styles';
import {
	Accordion,
	AccordionSummary,
	AccordionDetails,
	Typography,
  Grid,
  Card,
  CardContent,
  TextField,
  Button,
  CardActions
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Cookies from 'js-cookie';
import { postNewToken } from '../../actions/postSignIn';
import { putUpdateUser } from '../../actions/putUpdateUser';
import Modal from './Modal';

const useStyles = makeStyles({
	container: {
		backgroundColor: '#fffff',
		height: '100vh'
	},

	accordian: {
		width: "100%",
		alignSelf: "center"

	}
});

const initialFValues = {
  fullName: "",
  username: "",
  email:"",
  password:""
}

function Setting() {
  const [errors, setErrors] = useState({fullName:"",username:"",email:""});
  const [display, setDisplay] = useState({displays:"none",color:"red"});
  const [values,setValues] = useState(initialFValues);
  const info = useSelector((state)=>state.GetUser);
  const edittedUser = useSelector((state)=>state.UpdateUser);
  const deletedUser = useSelector((state)=>state.DeleteUser);
  const [edit, setEdit] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  console.log(info);
  const dispatch = useDispatch();

  const classes = useStyles();
  
  const newToken = async()=>{
    if(!Cookies.get('access_token')){
      console.log('inside newToken while loop');
      let response = await fetch(`${process.env.REACT_APP_URL}/user/refresh`,{
        method: 'POST',
        headers: {
          'accept':'application/json',
          'refresh-token':`${Cookies.get('refresh_token')}`
        }
      });
      let data = await response.json();
      console.log(data);
      var inFiveMinutes = new Date(new Date().getTime() + 5 * 60 * 1000);
      Cookies.set('access_token',data.access_token,{expires: inFiveMinutes});
    }
    const requestOptions = {
      method: 'GET',
      headers: {
        'accept':'application/json',
        'Authorization':`Bearer ${Cookies.get('access_token')}`
      }
    };
    dispatch(getUser(requestOptions));
    return;
  }

  useEffect(()=>{
    newToken();    
  },[]);

  useEffect(()=>{
    if(info.data.Fullname){
      setValues({...values, fullName: info.data.Fullname, username: info.data.Username, email: info.data.Email});
    }
  },[info])

  useEffect(()=>{
    console.log(edittedUser.data.status);
    if(edittedUser.data.status){
      if(edittedUser.data.status===200){
        setDisplay({...display, displays:"block", color:" rgb(25, 212, 50)", message:"Changes Have been made"});
        setTimeout(()=>{
          setDisplay({...display, displays:"none", message:""});
          setEdit(true);
        },3000)
      }
      else if(edittedUser.data.status===403){
        setDisplay({...display, displays:"block", color:" red", message:"Incorrect Password"});
        setValues({...values, fullName: info.data.Fullname, username: info.data.Username, email: info.data.Email});
        setTimeout(()=>{
          setDisplay({...display, displays:"none", message:""});
        },3000)
      }
    }
  },[edittedUser])

  useEffect(()=>{
    console.log(deletedUser);
    if(deletedUser.data){
      console.log(deletedUser.data.detail)
      if(deletedUser.data.detail==="Deleted"){
        Cookies.remove('access_token');
        Cookies.remove('refresh_token');
        window.location.href='Signup';
      }
    }
  },[deletedUser])

  const validate = (fieldValues = values) => {
    let temp = { ...errors }
    if ('fullName' in fieldValues)
      temp.name = fieldValues.name ? "" : "This field is required."
    if ('email' in fieldValues)
      temp.email = (/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/).test(fieldValues.email) ? "" : "Email is not valid."
    if ('username' in fieldValues)
      temp.username = fieldValues.username ? "" : "This field is required."

    setErrors({
        ...temp
    })

  }

  const handleChange = (e)=>{
    const { name, value } = e.target
        setValues({
            ...values,
            [name]: value
        })
    validate({ [name]: value })
  }

  const updateUser = async()=>{
    if(!Cookies.get('access_token')){
      console.log('inside newToken while loop');
      let response = await fetch("http://35.154.56.92:8087/api/v1/user/refresh",{
        method: 'POST',
        headers: {
          'accept':'application/json',
          'refresh-token':`${Cookies.get('refresh_token')}`
        }
      });
      let data = await response.json();
      console.log(data);
      var inFiveMinutes = new Date(new Date().getTime() + 5 * 60 * 1000);
      Cookies.set('access_token',data.access_token,{expires: inFiveMinutes});
    }

    
    if(errors.fullName==="" && errors.username==="" && errors.email===""){
      console.log("inside the if statement");
      const requestOptions = {
        method: 'PUT',
        headers: {
          'accept':'application/json',
          'Password':`${values.password}`,
          'Authorization':`Bearer ${Cookies.get('access_token')}`,
          'Content-Type':'application/json'
        },
        body: JSON.stringify({
          "Username":values.username,
          "Email":values.email,
          "Password":values.password
        })
      };
      dispatch(putUpdateUser(requestOptions));
      setDisplay({...display, displays:"block", color:" rgb(25, 212, 50)", message:"Loading..."});
    }

    return;
  }

  const handleSubmit = (e)=>{
    updateUser();
    e.preventDefault();
  }

  const DeleteUser = async()=>{
    if(!Cookies.get('access_token')){
      console.log('inside newToken while loop');
      let response = await fetch("http://35.154.56.92:8087/api/v1/user/refresh",{
        method: 'POST',
        headers: {
          'accept':'application/json',
          'refresh-token':`${Cookies.get('refresh_token')}`
        }
      });
      let data = await response.json();
      console.log(data);
      var inFiveMinutes = new Date(new Date().getTime() + 5 * 60 * 1000);
      Cookies.set('access_token',data.access_token,{expires: inFiveMinutes});
      return
    }
    
    const requestOptions = {
      method: 'DELETE',
      headers: {
        'accept':'application/json',
        'Authorization':`Bearer ${Cookies.get('access_token')}`
      }
    }

    dispatch(deleteUser(requestOptions));

  }

  const handleDelete = (e)=>{
    DeleteUser();
    e.preventDefault();
  }

  return (
    <div>
      <Dashnav/>
      <div style={{ marginTop: '15%' }} className={classes.container}>
        <h2 style = {{color: 'white' , fontFamily:'Lato' , fontWeight :'bold'}}>Profile</h2>
        <div container style={{ marginTop: '2em' , padding : '2%' }}>
          <Grid container>
            <Grid item sm={12} md={12}>
              <div className={classes.accordian}>

                <Accordion >
                  <AccordionSummary
										expandIcon={<ExpandMoreIcon />}
										aria-controls="panel1a-content"
										id="panel1a-header"
									>
										<Typography variant="h6">Update Details</Typography>
									</AccordionSummary>
									<AccordionDetails>
										<Grid container xs={12} sm={12} style={{
											display: 'flex',
											justifyContent: 'center',
											alignItems: 'center'
										}}>
											
                      <form >
                        <Card className={classes.card}>

                            <CardContent>
                            <h4>Enter your details</h4>
                                <TextField
                                    name="fullName"
                                    id="Name"
                                    label="Name"
                                    value={values.fullName}
                                    onChange={handleChange}
                                    helperText={errors.fullName}
                                    error={errors.fullName?true:false}
                                    margin="dense"
                                    variant="outlined"
                                    fullWidth
                                    disabled={edit}
                                />

                                <TextField
                                    name="username"
                                    id="email"
                                    label="Username"
                                    type="email"
                                    value={values.username}
                                    onChange={handleChange}
                                    helperText={errors.username}
                                    error={errors.username?true:false}
                                    margin="dense"
                                    variant="outlined"
                                    fullWidth
                                    disabled={edit}
                                />
                                <TextField
                                    name="email"
                                    id="contact_no"
                                    label="Email"
                                    type="string"
                                    value={values.email}
                                    onChange={handleChange}
                                    helperText={errors.email}
                                    error={errors.email?true:false}
                                    margin="dense"
                                    variant="outlined"
                                    fullWidth
                                    disabled={edit}
                                />
                                {edit? <></>
                                :
                                  <TextField
                                    name="password"
                                    id="contact_no"
                                    label="Please enter your password"
                                    type="password"
                                    value={values.password}
                                    onChange={handleChange}
                                    margin="dense"
                                    variant="outlined"
                                    fullWidth
                                    disabled={edit}
                                  />
                                }
                            </CardContent>
                            <CardActions className={classes.actions}>
                                <div style={{width:'100%',display:'flex',justifyContent:'center',alignItems:'center'}}>
                                  <Button type="submit" color="primary" onClick={(e)=>{
                                      if(edit)
                                        setEdit(ed=>!ed);
                                      else
                                        {
                                          console.log('entere handleSubmit');
                                          handleSubmit(e);
                                        }
                                      e.preventDefault();
                                    }}>
                                      {edit ? "EDIT":"UPDATE"}
                                  </Button>
                                    {edit?<></>:<div display={display.displays} style={{marginBottom:'15px',color:display.color}}>
                                      {display.message}
                                    </div>}
                                </div>                                
                            </CardActions>
                        </Card>
                    </form>

										</Grid>

									</AccordionDetails>
                </Accordion>

                <Accordion>
									<AccordionSummary
										expandIcon={<ExpandMoreIcon />}
										aria-controls="panel2a-content"
										id="panel2a-header"
									>
										<Typography variant="h6">Delete account  </Typography>
									</AccordionSummary>
									<AccordionDetails>

										<Grid container xs={12} sm={12} style={{
											display: 'flex',
											justifyContent: 'center',
											alignItems: 'center'
										}} >

											<Grid items xs={12} sm={6}>
												<Typography variant="p">
													Your account will be permanantly deleted and all the data will be lost . Are you sure you want to delete?
											</Typography>
											</Grid>

											<Grid items xs={12} sm={6}>
												<Button variant="contained"  style={{ marginLeft: "20px" , backgroundColor : '#782387', color:'#ffffff'}} onClick={()=>setIsOpen(true)}>Yes</Button>
                        
											</Grid>
                      <Modal open={isOpen} onClose={()=>setIsOpen(false)} handleDelete={handleDelete}/>
										</Grid>
									</AccordionDetails>
								</Accordion>
                
              </div>
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  )
}

export default Setting
