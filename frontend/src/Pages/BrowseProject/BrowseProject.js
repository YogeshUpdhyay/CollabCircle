import React from 'react'
import {
  Grid,
  Typography,
  Card,
  CardContent
} from "@material-ui/core";
import DashNav from '../../components/Layout/Dashboard_navbar/Dashboard_Nav'
import ProjectCard from './components/ProjectCard'
import browse from '../../assets/BrowseProject.png'
import Banner from '../../assets/BrowseProj_banner.png'
import "./BrowseProject.css"


function BrowseProjects() {

  const projects = [
  
    {
      name : 'Food Ordering App' ,
      description: 'This application should be able to form a bridge between restaurants and consumers. Restaurants owners must be able to sign up and list out their food items along with the price. Users must be able to sign up, view the restaurants nearby and order food items from selected restaurants.',
      vacancies: '2', 
      date: '10/01/2021',
      skills:'Flutter'
    },
    {
      name : 'Grocery delivery application' ,
      description: 'Users must be able to sign up and purchase groceries. The system should present him with delivery slot options, and the user must be able to choose his preferred slot. Users must then be taken to the payment page where he makes the payment with his favourite method. ' ,
      vacancies: '3' ,
      date: '7/12/2020',
      skills : 'React native , Firebase'
    },
    {
      name : 'Web portal for motor servicing at home' ,
      description: 'This project is going to be for an automotive workshop that is intending to deliver doorstep service. The workshop must be able to display their services and cost on the website. Users must be able to register and login to cart the required services. Users must then be able to confirm the service time slot and complete the checkout process.' ,
      vacancies: '4' ,
      date: '30/11/2020',
      skills : 'Django ,HTML ,CSS'
    },
    {
      name : 'Project Management application' ,
      description: 'Users should be able to create projects and tasks within projects. Users must be able to assign tasks to other users and must be able to comment on it just like on a social media post. To start with, each user can have a calendar view and a kanban style board. Users must be able to close and archive tasks as well as projects when completed.' ,
      vacancies: '5' ,
      date: '20/1/2021',
      skills : 'React.js , Flask , AWS'
    },
    {
      name : 'Workout Tracker' ,
      description: 'Create an app where users can store the workouts they have completed. This will teach you about fullstack development in general: authentication, security, CRUD, frontend frameworks, and more.' ,
      vacancies: '4' ,
      date: '12/2/2021',
      skills : 'Vue.js , Node.js , MongoDB'
    },
    {
      name : 'TapNews' ,
      description: 'It is a React-based web app that automatically recommends news based on user logs. Basically, TapNews collects news from a variety of sources and applies machine learning to suggest topics. It removes duplicates using the TF-IDF algorithm and predicts news topics using TensorFlow CNN. Further, JSON-RPC aids communication between multiple backend services. ' ,
      vacancies: '4' ,
      date: '3/2/2021',
      skills : 'Tensorflow , React.js'
    },
    {
      name : 'Feel' ,
      description: 'Feel is an open-source application offering a progressive solution to tackle the issue of human anxiety. It connects people who have gone through similar life situations and indicates posts related to books, food, games, movies, and music. In this manner, it creates a safe space for sharing problems and even providing a daily distraction to some people. Here is a look at the technical content of the Feel application:' ,
      vacancies: '10' ,
      date: '3/2/2021',
      skills : 'NodeJS, Express, MongoDB , ReactJs and several other dependencies,React Native'
      
    },
    {
      name : 'BookMyShow Clone' ,
      description: 'If you want to learn how to use Django, this project is for you. This gives you a full stack replica of Book My Show with the following elements Movie Filter Pag Movie Detail Page List of Theatres/Cinema Hall Booking Page' ,
      vacancies: '4' ,
      date: '3/2/2021',
      skills : 'Django , HTML , css' 
    },
    {
      name : ' Veudo' ,
      description: 'It is an example of a task management application that lets you organize your day-to-day activities and improve your productivity. Veudo uses the PEVN stack, which consists of PostgreSQL, Express, Vue, and Node. As workplaces increasingly adopt the work-from-home model, the relevance of to-do apps is rising. You can also use such apps to keep track of personal chores and responsibilities, like making shopping lists or setting reminders for birthdays' ,
      vacancies: '3' ,
      date: '3/2/2021',
      skills : 'Vue.js , Node.js , Express.js' 
    }
  
  ]

  return (
    <div className="pb-4" style={{ marginTop: '5em' }}>
      <DashNav />
      <Grid container>
        <Grid item xs={12} sm={12} md={6} lg={5}>
          <img src={Banner} style={{ maxWidth: '500px' }}></img>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={7} style={{ display: 'flex', justifyContent: 'center' }}>

          <div style={{ color: 'white', marginTop: '5em', fontFamily: 'Lato', maxWidth: '600px' }}>
            <h2>BROWSE PROJECTS</h2>
            <br></br>
            <h5>Find interesting projects and get started with an execution plan</h5>
            <h5>Explore the mini projects that are available and click on a project that appeals to you.</h5>
            <h5>Before starting a project, be sure to select a project that
           will add value to your career goals and matches your programming interests.</h5>
          </div>

        </Grid>
      </Grid>
      {/* <img src={browse} style={{width: "100vw",height: 'auto'}}/> */}
      <div className="container" style={{ backgroundColor: 'white', marginTop: '2em' }}>
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

export default BrowseProjects
