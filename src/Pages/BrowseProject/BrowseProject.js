import React from 'react'
import Navbar from '../../components/Layout/NavBar/NavBar'
import ProjectCard from './components/ProjectCard'
import browse from '../../assets/BrowseProject.png'

function BrowseProjects() {
  return (
    <div>
      <Navbar />
      {/* <img src={browse} style={{width: "100vw",height: 'auto'}}/> */}
      <h1>Browse Projects</h1>
    </div>
  )
}

export default BrowseProjects
