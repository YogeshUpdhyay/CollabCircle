import React, { useState, useEffect } from "react";
//components
import NavBar from "../../../components/Layout/NavBar/NavBar";
import CreateProject from "../../../assets/createProject.png";
//Dependencies
import {
  Grid,
  Button,
  TextField,
  Typography,
  Card,
  CardContent,
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { makeStyles } from "@material-ui/core/styles";
import theme from "../../../components/Theme/theme";
import { ThemeProvider } from "@material-ui/core/styles";
//Form
import {useForm , Controller} from 'react-hook-form' ;
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
  img_createProject: {
    maxWidth: '400px'
  },
  errorMessage : {
    color :"red",
    display : "flex" ,
    justifyContent: "flex-start"
  }

});


export default function CreateProjects() {

  const classes = useStyles();
  const {register , handleSubmit , errors , control , setValue} = useForm();
  const onSubmit = (data) => {
    console.log(data) ;
  }

  const [tags, setTags] = useState({})
  console.log(tags)
 console.log(errors);
  return (
    <ThemeProvider theme={theme}>
      <div>
        <NavBar />

        <Grid container>
          <Grid item lg={6} md={12} xs={12} sm={12}>
            <Grid container>
              <Grid item xs={12} md={12} lg={12}>
                <img src={CreateProject} style={{ maxWidth: "400px" }}></img>
              </Grid>

              <Grid item lg={12} md={12} xs={12}>

                <Typography variant="h5" style={{ color: "white" }}>
                  Got an idea for project ?
                </Typography>

                <Typography variant="h6" style={{ color: "white" }}>
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
            style={{ backgroundColor: "#ffffff", height: "90vh" }}
          >
            <Grid container variant="outlined" spacing={2}>
              <Grid item lg={12} xs={12} sm={12}>
                <form  onSubmit={handleSubmit(onSubmit)}>
                  <Card className={classes.card}>
                    <CardContent>
                      <h4>Create Project</h4>
                      <br></br>
                      <Grid container spacing={2}>
                        <Grid item lg={12} md={12} xs={12}>

                          <TextField
                            variant="outlined"
                            placeholder="Title of the project"
                            label="Title"
                            name = "title"
                            lg={12}
                            fullWidth="true"
                            defaultValue = ""
                            inputRef= {register({required: true})}
                          >
                          </TextField>
                          {errors.title && <span className={classes.errorMessage}>This field is required</span>}
                        </Grid>
                        <Grid item lg={12} md={12} xs={12}>
                          <TextField
                            variant="outlined"
                            placeholder="Describe your project in 400 charachters"
                            label="Description"
                            lg={12}
                            fullWidth="true"
                            name="description"
                            inputRef = {register({required: true})}
                          >
                          </TextField>
                          {errors.description && <span className={classes.errorMessage}>This field is required</span>}
                        </Grid>
                        <br></br>
                        <Grid item lg={12} md={12} xs={12}>
                          <Controller
                            name = "skills_req"
                            control = {control}
                            
                            render={(
                              { onChange, onBlur, value, name, ref },
                              { invalid, isTouched, isDirty }
                            ) => (
                              <Autocomplete
                              multiple
                              options={skills}
                              getOptionLabel={(option) => option}
                              defaultValue={[skills[3]]}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  variant="standard"
                                  label="Skills Required"
                                  placeholder="Skills required"
                                  inputRef = {ref}
                                  onChange =  {(e) => {setTags(e.target.value)}}
                                  value = {tags}
                                />
                              )}
                            />
                            )}
                          >
                          </Controller>
                        </Grid>

                        <Grid item lg={12} md={12} xs={12}>
                          <TextField
                            id="standard-number"
                            label="Vacany"
                            placeholder="Enter the number of teammates required"
                            type="number"
                            InputLabelProps={{
                              shrink: true,
                            }}
                            fullWidth="true"
                          >

                          </TextField>
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
  'Java' , 
  'Python' , 
  'JavaScript', 
  'CSS' , 'HTML' ,'Node.js' , 'React.js'
]


