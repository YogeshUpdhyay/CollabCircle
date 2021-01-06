import React from 'react';
import Navbar from '../../components/Layout/DashboardNavbar/Navbar';
import strike0 from '../../strike0.png';
import './Dashboard.css';

export default function Dashboard(){
  return(
    <div>
      <Navbar />
      <div className="container">
        <div className="row">
        <div className="col-md-12 my-5">
          <div className="card dcard big">
              <div className="card-body dcard-body">
                <div className="row">
                  <div className="col-md-7">
                    <h3 className="card-title">My Projects</h3>
                    <p className="card-text">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque odit, accusantium quod consectetur architecto consequatur quasi voluptatibus numquam sequi ullam aut, non ex adipisci autem officia et quo, sapiente reiciendis.
                    </p>
                    <a className="btn btn-outline-primary">Browse Projects</a>
                  </div>
                  <div className="col-md-5 d-none d-md-block">
                    <img className="img-fluid MyProjects" src={strike0}/>
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
                  <h3 className="card-title">Browse Projects</h3>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6 mb-2">
            <div className="card dcard small">
              <div className="card-body dcard-body">
                <div className="col-md-12">
                  <h3 className="card-title">Create Projects</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}