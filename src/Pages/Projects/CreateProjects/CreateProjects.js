import React, { useState } from "react";
//components
import CreateProject from "../../../assets/createproj.png";
//Dependencies
import {
  Grid,
  Button,
  TextField,
  Typography,
  Card,
  CardContent,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import theme from "../../../components/Theme/theme";
import { ThemeProvider } from "@material-ui/core/styles";
import DashNav from '../../../components/Layout/Dashboard_navbar/Dashboard_Nav'
//Form
import { useForm } from 'react-hook-form';
//css

const useStyles = makeStyles({
  card: {
    maxWidth: "600px",
    margin: "50px",
    padding: '10px'
  },
  container: {
    display: "Flex",
    justifyContent: "center",
  },
  input: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",

  },
  btn_submit: {
    marginTop: "2em",
  },
  errorMessage: {
    color: "red",
    display: "flex",
    justifyContent: "flex-start"
  },
  img_createProject: {
    height : "65vh" , 
    marginTop : "50px" , 
    [theme.breakpoints.only('md')]:{
      height : "40vh" , 
      maxWidth : '500px'
    }
  }

});


export default function CreateProjects() {

  const classes = useStyles();
  const { register, handleSubmit, errors, control, setValue } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    alert("Thanks for submitting")
    
  }
  console.log(errors);
  return (
    <ThemeProvider theme={theme}>
      <div>
      <DashNav/>

        <Grid container style = {{ marginTop: '5em' }}>
          <Grid item lg={6} md={12} xs={12}  >
            <Grid container>
              

              <Grid item lg={12} md={12} xs={12}>
              <img  className = {classes.img_createProject} src={CreateProject} ></img>
                <Typography variant="h4" style={{ color: "#ffffff" , fontFamily: "Lato" ,fontWeight: "bold"}}>
                  GOT AN IDEA FOR PROJECT??
                </Typography>

                <Typography variant="h6" style={{ color: "#ffffff" }}>
                  Post your project idea and find a partner to collab
                </Typography>
              </Grid>

            </Grid>
          </Grid>
          <Grid
            item
            lg={6}
            md={12}
            xs={12}
           
          >
            <Grid container variant="outlined" spacing={2} style = {{marginTop : "2em"}}>
              <Grid item lg={12} xs={12} sm={12} style = {{ display: "flex" , alignItems: 'center' ,justifyContent: 'center'}}> 
                <form onSubmit={handleSubmit(onSubmit)} >
                  <Card className={classes.card} >
                    <CardContent>
                      <h4>Create Project</h4>
                      <br></br>
                      <Grid container spacing={1}>
                        <Grid item lg={12} md={12} xs={12}>

                          <TextField
                            variant="outlined"
                            placeholder="Title of the project"
                            label="Title"
                            name="title"
                            lg={12}
                            fullWidth="true"
                            defaultValue=""
                            inputRef={register({ required: true })}
                          >
                          </TextField>
                          {errors.title && <span className={classes.errorMessage}>Required*</span>}
                        </Grid>
                        <Grid item lg={12} md={12} xs={12}>
                          <TextField
                            variant="outlined"
                            placeholder="Describe your project in 400 charachters"
                            label="Description"
                            lg={12}
                            fullWidth="true"
                            name="description"
                            inputRef={register({ required: true })}
                          >
                          </TextField>
                          {errors.description && <span className={classes.errorMessage}>Required*</span>}
                        </Grid>
                        <br></br>
                        <Grid item lg={12} md={12} xs={12}>
                          <TextField
                            variant="outlined"
                            placeholder="Mention the tech stack used"
                            label="Skills Required"
                            lg={12}
                            fullWidth="true"
                            name="skills_req"
                            inputRef={register({ required: true })}
                          >
                          </TextField>
                          {errors.skills_req && <span className={classes.errorMessage}>Required*</span>}
                        </Grid>

                        <Grid item lg={12} md={12} xs={12}>
                          <TextField
                            variant="outlined"
                            placeholder="No of members required"
                            label="Vacancy"
                            lg={12}
                            fullWidth="true"
                            name="vacancy"
                            inputRef={register({ required: true })}
                          >
                          </TextField>
                          {errors.vacancy && <span className={classes.errorMessage}>Required*</span>}
                        </Grid>

                        <Grid container justify="flex-end">
                          <Button
                            type="submit"
                            variant="contained"
                            color="secondary"
                            className={classes.btn_submit}
                      
                          >
                            Submit
                          </Button>
                        
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </form>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </ThemeProvider>
  );
}

//SKills dropdown options

// const skills = [ 
//   { title: "Java", key: "1" },
//   { title: "JavaScript", key: "2" },
//   { title: "React.js", key: "3" },
//   { title: "Angular.js", key: "4" },
//   { title: "Vue.js", key: "5" },
//   { title: "Python", key: "6" },
//   { title: "Go", key: "7" },
//   { title: "Node.js", key: "8" },
//   { title: "PHP", key: "9" },
//   { title: "JQuery", key: "10" },
//   { title: "Git", key: "11" },
//   { title: "SQL", key: "12" },
//   { title: "NoSQL", key: "13" },
//   { title: "MongoDB", key: "14" },
//   { title: "Linux", key: "15" },
//   { title: "AWS", key: "16" },
//   { title: "Docker", key: "17" },
//   { title: "Kubernetes", key: "18" },
//   { title: "HTML", key: "19" },
//   { title: "CSS", key: "20" },
//   { title: "C", key: "21" },
//   { title: "C++", key: "21" },
// ];

const skills = [
  'Java',
  'Python',
  'JavaScript',
  'CSS', 'HTML', 'Node.js', 'React.js'
]


