import React from 'react'
import './ProjectCard.css'

function ProjectCard({project}) {
  return (
    <div>
      
        <div className="card py-3 px-2 mb-5 pcard" style={{width:'100%', backgroundColor: '#8236E4',color:'#FEF6FF'}}>
          <div className="card-title"><h4>{project.name}</h4></div>
          <div className="card-body" style={{transform: 'translateY(-13%)'}}>
          {project.description}
          
          </div>
          <div className="row">
            <div className="col-6">
              Vacancies : {project.vacancies}
            </div>
            <div className="col-6">
              Date:{project.date}
            </div>
            
          </div>

          <div className="mt-4" style={{width:'100%',display:'flex',justifyContent: 'center', alignItems: 'center'}}>
              <input type="submit" className="btn" value="View Project" style={{fontWeight:'600'}}/>
            </div>

        </div>
    </div>
  )
}

export default ProjectCard
