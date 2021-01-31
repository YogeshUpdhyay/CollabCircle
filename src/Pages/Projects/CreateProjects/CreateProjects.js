import React ,{ useState, useEffect} from "react";
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
import { Formik, Form, Field , useFormik } from 'formik';
import MuiSelect, {
  SelectProps as MuiSelectProps,
} from '@material-ui/core/Select';
import * as Yup from 'yup';
import theme from "../../../components/Theme/theme";
import { ThemeProvider } from "@material-ui/core/styles";

//css

const useStyles = makeStyles({
  card: {
    maxWidth: "600px",
    margin : "50px" ,
    padding : '10px'
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
  img_createProject : {
    maxWidth : '400px'
  }

});

const ValidationSchema = Yup.object({

  title : Yup.string().required("Required"),
  description : Yup.string().required("Required"),
  skills_req : Yup.string().required("Required"),
  vacancy : Yup.string().required("Required")

})

export default function CreateProjects() {
  const [skill , setSkill]  = useState([]);
  useEffect(() =>{
    console.log(skill) 
  } , [skill])
 
  const classes = useStyles();
  const {values , handleSubmit , handleChange , errors } = useFormik({
    initialValues : {
      title : "" , 
      description : "" ,
      skills_req : {
        title : "",
        key: ""
      },
      vacancy : "" 
    },

    ValidationSchema ,

    onSubmit(values){
      console.log(values)
    }

  });   

  return (
    <ThemeProvider theme={theme}>
      <div>
        <NavBar />

        <Grid container>
          <Grid item lg={6} md={12} xs={12} sm = {12}>
            <Grid container>
              <Grid item xs={12} md={12 } lg={12}>
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
                <form onSubmit={handleSubmit}>
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
                            inputProps={{ maxLength: 50 }}
                            onChange={handleChange}
                            values={values.title}
                          >
                          </TextField>
                          {errors.title? errors.title: null}
                        </Grid>
                        <Grid item lg={12} md={12} xs={12}>
                          <TextField
                            variant="outlined"
                            placeholder="Describe your project in 400 charachters"
                            label="Description"
                            lg={12}
                            fullWidth="true"
                            name = "description"
                            inputProps={{ maxLength: 400 }}
                            onChange={handleChange}
                            values = {values.description}
                          >
                        
                          </TextField>
                          {errors.description ? errors.description: null}
                        </Grid>
                        <br></br>
                        <Grid item lg={12} md={12} xs={12}>
                          <Autocomplete
                            multiple
                            id="tags-standard"
                            options={skills}
                            getOptionLabel={(option) => option.title}
                            
                            values = {values.skills_req}

                            onChange={(e ,values) => {
                              setSkill(values);
                            }}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                variant="standard"
                                name = "skills_req"
                                label="Skills required"
                                placeholder="Enter the skills required"
  
                              >
                              </TextField>
                              
                            )}
                          /> 
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
                            type = "submit"
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

const skills = [
  { title: "Java", key: "1" },
  { title: "JavaScript", key: "2" },
  { title: "React.js", key: "3" },
  { title: "Angular.js", key: "4" },
  { title: "Vue.js", key: "5" },
  { title: "Python", key: "6" },
  { title: "Go", key: "7" },
  { title: "Node.js", key: "8" },
  { title: "PHP", key: "9" },
  { title: "JQuery", key: "10" },
  { title: "Git", key: "11" },
  { title: "SQL", key: "12" },
  { title: "NoSQL", key: "13" },
  { title: "MongoDB", key: "14" },
  { title: "Linux", key: "15" },
  { title: "AWS", key: "16" },
  { title: "Docker", key: "17" },
  { title: "Kubernetes", key: "18" },
  { title: "HTML", key: "19" },
  { title: "CSS", key: "20" },
  { title: "C", key: "21" },
  { title: "C++", key: "21" },
];


