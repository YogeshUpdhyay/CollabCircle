import React from 'react';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import PropTypes from 'prop-types';
import strike0 from '../../strike0.png';
import './Dashboard.css';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import DashNav from '../../components/Layout/Dashboard_navbar/Dashboard_Nav'
import {
 Button
} from '@material-ui/core'

function ElevationScroll(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

ElevationScroll.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default function Dashboard(props) {
  const signin = useSelector((state) => state.SignIn);
  console.log(signin.isLogged);
  console.log(signin);

  return (
    <div>

      <DashNav />

      <div className="container" style={{ marginTop: '5%' }}>
        <div className="row">
          <div className="col-md-12 my-5">
            <div className="card dcard big">
              <div className="card-body dcard-body">
                <div className="row">
                  <div className="col-md-7">
                    <h3 className="card-title">My Projects</h3>
                    <p className="card-text">
                      Create , Connect , Inspire
                    <br></br>
                      Go and track your progress , view your collaborated projects
                    <br></br>
                      <Button variant="contained"  style = {{ marginTop : '5%' , color : 'white' , textAlign : 'center'}}>
                      <Link className="tag" to="/MyProjects" style = {{textDecoration: 'none' , color : 'purple' }}>Click here</Link>
                      </Button>
                    </p>
                  </div>
                  <div className="col-md-5 d-none d-md-block">
                    <img className="img-fluid MyProjects" src={strike0} style = {{marginTop : '-7%'}}/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 mb-5">
            <div className="card dcard small">
              <div className="card-body dcard-bosy">
                <div className="col-md-12">
                  <h3 className="card-title">
                    <Link className="tag" to="/BrowseProject">Browse Projects</Link>
                  </h3>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6 mb-2">
            <div className="card dcard small">
              <div className="card-body dcard-body">
                <div className="col-md-12">
                  <h3 className="card-title">
                    <Link className="tag" to="/CreateProject" color="primary">Create Project</Link>
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}