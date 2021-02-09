import React from 'react'
import {
  Grid,
  Typography,
  Card,
  CardContent
} from "@material-ui/core";
import DashNav from '../../../components/Layout/Dashboard_navbar/Dashboard_Nav'
import ProjectCard from '../../BrowseProject/components/ProjectCard'
import Banner from '../../../assets/myprojs.png'
import "../../BrowseProject/BrowseProject.css"


function MyProjects() {

  const projects = [{ name: 'Employee Management', description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Similique enim voluptatem rem tempora culpa ipsa iusto placeat quaerat, minima praesentium necessitatibus aliquid facilis dolorem, nulla quis ullam eius dolore dolores.', vacancies: '3', date: 'yay', skills: 'Angular.js , Node.js' }, { name: 'Cricket Score Updates', description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Similique enim voluptatem rem tempora culpa ipsa iusto placeat quaerat, minima praesentium necessitatibus aliquid facilis dolorem, nulla quis ullam eius dolore dolores.', vacancies: '2', date: 'yayyy', skills: 'Python' }, { name: 'E-Commerce Website', description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Similique enim voluptatem rem tempora culpa ipsa iusto placeat quaerat, minima praesentium necessitatibus aliquid facilis dolorem, nulla quis ullam eius dolore dolores.', vacancies: '4', date: 'yayyy', skills: 'React.js , Django' }]

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
           <h5>Find interesting projects and get started with an execution plan</h5>
           <h5>Explore the mini projects that are available and click on a project that appeals to you.</h5>
           <h5>Before starting a project, be sure to select a project that
           will add value to your career goals and matches your programming interests.</h5>
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
