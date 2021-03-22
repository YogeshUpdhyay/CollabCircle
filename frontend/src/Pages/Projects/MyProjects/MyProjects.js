import React from 'react'
import {
  Grid,
  Typography,
  Card,
  CardContent
} from "@material-ui/core";
import DashNav from '../../../components/Layout/Dashboard_navbar/Dashboard_Nav'
import ProjectCard from './components/ProjectCard.js'
import Banner from '../../../assets/myprojs.png'
import "../../BrowseProject/BrowseProject.css"


function MyProjects() {

  const projects = [{ name: 'Employee Management', description: 'A web-application for managing the employee data . The admin can create , read , update and delete the employee data. The employee can only view his details and edit them . Decent UI and functionality to be added', vacancies: '3', date: '20/01/2021', skills: 'Angular.js , Node.js' },
   { name : 'Cricket score updates',description: 'Live Cricket match updates . Fetching data from an api and displaying them with awesome UI', vacancies: '2', date: '12/12/2020', skills: 'Django,HTML,CSS,JS' }, ]
  return (
    <div className="pb-4" style={{ marginTop: '5em' }}>
      <DashNav />
      <Grid container>
        <Grid item xs={12} sm={12} md={6} lg={5}>
          <img src={Banner} style={{ maxWidth: '300px' }}></img>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={7} style={{display: 'flex' , justifyContent: 'center'}}>

           <div style = {{color: 'white' , marginTop:'5em' , fontFamily :'Lato' , maxWidth : '600px'}}>
           <h2>MY PROJECTS</h2>
           <br></br>
           <h2>View your ongoing projects here</h2>
           <h5>Hola! You have collaborated with 2 teams</h5>
           </div>

        </Grid>
      </Grid>
      {/* <img src={browse} style={{width: "100vw",height: 'auto'}}/> */}
      <div className="container" style={{ backgroundColor: 'white' , marginTop:'2em' }}>
        <br></br>
        <div>
          {projects.map(project => (
            <ProjectCard project={project} />
          ))}
        </div>
        <br></br>
      </div>
    </div>
  )
}

export default MyProjects
