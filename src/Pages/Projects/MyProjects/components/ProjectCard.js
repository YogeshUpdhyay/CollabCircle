import { Card , Button } from '@material-ui/core'
import React , {useState} from 'react'
import BrowseProj_icon from '../../../../assets/icons/code.png'

function ProjectCard({project}) {

  const [Applied , setApplied] = useState("#FFFFFF") ;
  const [Text , setText ] = useState("Apply") ;
  const [TextColor , setTextColor] = useState("#000000")

  const ButtonStyles = {
    marginTop:'2%' ,
    background: `${Applied}` ,
    color : `${TextColor}`
  }
  
  return (
    
    <div>
      
        <div className="card py-3 px-2 mb-5 pcard" style={{width:'100%', backgroundColor: '#782387',color:'#FEF6FF'}}>
          <div className="card-title"><h4>{project.name}</h4></div>

          <div className="row">
            <div className="col-lg-1 col-sm-12">
              <img src = {BrowseProj_icon} style = {{maxWidth:'100px'}}></img>
            </div>
            <div className="col-lg-11 col-sm-12">
            <div className="card-body">
            {project.description}
            </div>
            </div>
          </div>
         
          <div className="row" style = {{marginTop:'1em'}}>
            <div className="col-lg-4 col-sm-12">
              Team-mates : {project.vacancies}
            </div>
            <div className="col-lg-4 col-sm-12">
              Tech Stack : {project.skills}
            </div>
            <div className="col-lg-4 col-sm-12" >
              Date:{project.date}
            </div>
            <div className="col-12" style = {{ marginTop : '2%'}} >
                <h6>Ongoing</h6>
            </div>
            
          </div>


        </div>
    </div>
  )
}

export default ProjectCard
