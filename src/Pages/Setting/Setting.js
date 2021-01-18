import React,{useEffect,useState} from 'react';
import Navbar from '../../components/Layout/DashboardNavbar/Navbar'
import {useSelector, useDispatch} from 'react-redux';
import { getUser } from '../../actions/getUser';
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
  email:""
}

function Setting() {
  const [errors, setErrors] = useState({});
  const [values,setValues] = useState(initialFValues);
  const info = useSelector((state)=>state.GetUser);
  // const [userInfo, setUserInfo] = useState({FullName:"",Username:"",Email:""});
  console.log(info);
  const dispatch = useDispatch();

	const classes = useStyles();

  useEffect(()=>{
    const requestOptions = {
      method: 'GET',
      headers: {
        'accept':'application/json',
        'Authorization':`Bearer ${localStorage.getItem('access_token')}`
      }
    };
    dispatch(getUser(requestOptions));
  },[]);

  useEffect(()=>{
    if(info.data.Fullname){
      setValues({...values, fullName: info.data.Fullname, username: info.data.Username, email: info.data.Email});
    }
  },[info])

  const validate = (fieldValues = values) => {
    let temp = { ...errors }
    if ('fullName' in fieldValues)
      temp.name = fieldValues.name ? "" : "This field is required."
    if ('email' in fieldValues)
      temp.email = (/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/).test(fieldValues.email) ? "" : "Email is not valid."
    if ('username' in fieldValues)
      temp.username = fieldValues.name ? "" : "This field is required."

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

  return (
    <div>
      <Navbar />
      <div className={classes.container}>
        <h2 style={{ marginTop: '2em' }}>Profile</h2>
        <div container style={{ marginTop: '2em' }}>
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
                                    disabled="true"
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
                                    disabled="true"
                                />
                                <TextField
                                    name="email"
                                    id="contact_no"
                                    label="Contact Number"
                                    type="string"
                                    value={values.email}
                                    onChange={handleChange}
                                    helperText={errors.email}
                                    error={errors.email?true:false}
                                    margin="dense"
                                    variant="outlined"
                                    fullWidth
                                    disabled="true"

                                />
                            </CardContent>
                            <CardActions className={classes.actions}>
                                <Button type="submit" color="primary" >
                                    SUBMIT
                    </Button>
                                <Button color="secondary" >
                                    CLEAR
                    </Button>
                            </CardActions>
                        </Card>
                    </form>

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
