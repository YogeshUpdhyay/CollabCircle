import React from 'react'
import Navbar from '../../components/Layout/NavBar/NavBar'
import ProjectCard from './components/ProjectCard'
import browse from '../../assets/BrowseProject.png'
import "./BrowseProject.css"

function BrowseProjects() {

  const projects = [{name:'Mast',description:'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Similique enim voluptatem rem tempora culpa ipsa iusto placeat quaerat, minima praesentium necessitatibus aliquid facilis dolorem, nulla quis ullam eius dolore dolores.', vacancies:'3',date:'yay'},{name:'Trump',description:'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Similique enim voluptatem rem tempora culpa ipsa iusto placeat quaerat, minima praesentium necessitatibus aliquid facilis dolorem, nulla quis ullam eius dolore dolores.', vacancies:'4',date:'yayyy'}, {name:'Trump',description:'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Similique enim voluptatem rem tempora culpa ipsa iusto placeat quaerat, minima praesentium necessitatibus aliquid facilis dolorem, nulla quis ullam eius dolore dolores.', vacancies:'4',date:'yayyy'}]

  return (
    <div className="pb-4">
      <Navbar />
      {/* <img src={browse} style={{width: "100vw",height: 'auto'}}/> */}
      <div className="container">
        <h2 className="intro-header">Browse Projects</h2>
        {projects.map(project=>(
          <ProjectCard project={project}/>
        ))}
      </div>
    </div>
  )
}

export default BrowseProjects
