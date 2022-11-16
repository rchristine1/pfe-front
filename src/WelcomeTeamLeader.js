
import React, { Component } from 'react'
//import SimpleModal from './SimpleModal';
import axios from 'axios';
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { AUTH_TOKEN_KEY } from './App'
import './UserSkills.css';
import { useState, useEffect } from 'react';


function WelcomeTeamLeader(props) {
  let history = props.history
  let firstname = props.userFirstName
  let lastname = props.userLastName
  let id = props.userId
  let team = props.team
  let setTeam = props.setTeam

  let titleH1Style = { color: '#131f1f', letterSpacing: '5px', fontSize: '1.75em' }
  let cardTitleStyle = { color: '#609f9f' }
  let cardSubTitleStyle = { color: '#bfd8d8' }
  let rowTitleStyle = { backgroundColor: '#eff5f5' }
  let activitiesStyle = { marginTop: '30px' }
  let activitiesButtonStyle = { color: '#ffff', backgroundColor: '#609f9f' }

  useEffect(() => {
    axios('/managers/' + id, {
      method: 'GET',
    })
      .then((response) => {
        setTeam(response.data.team)
      }, (error) => {
        if (error.response.status === 403 || error.response.status === 401) {
          history("/login")
        }
      }
      )
  }, [])
  return (
    <div className="container py-5 h-100">
      <div className="container pt-4" style={rowTitleStyle}>
        <div className="row align-items-center justify-content-start pb-4" >
          <div className='col-6'>
            <h1 style={titleH1Style}>MY ACTIVITIES</h1>
          </div>
          <div className="col-4 offset-md-2">
            <div className="card" >
              <div className="card-body py-0">
                <h5 className="card-title text-end" style={cardTitleStyle}>{firstname} {lastname}</h5>
                <h6 className="card-subtitle mb-2 text-end" style={cardSubTitleStyle}>{team}</h6>
                <p className="card-text"></p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-md-8 offset-md-2" style={activitiesStyle}>
        <div className="container">
          <div className="row pb-3">
            <div className="col-md-5 pb-3">
              <div className="card shadow">
                <div className="card-body">
                  <h5 className="card-title">Validate Skills</h5>
                  <p className="card-text"></p>
                  <Link className="btn btn-sm Hover" to={`/skillstovalidate/${id}`} onClick={event => {
                    history(`/skillstovalidate/${id}`);

                  }} style={activitiesButtonStyle}>Go</Link>
                </div>
              </div>
            </div>
            <div className="col-sm-5 pb-3">
              <div className="card shadow">
                <div className="card-body">
                  <h5 className="card-title">Organize Trainings</h5>
                  <p className="card-text"></p>
                  <a href="#" className="btn btn-sm Hover" style={activitiesButtonStyle}>Go</a>
                </div>
              </div>
            </div>
            <div className="col-sm-5 pb-3">
              <div className="card shadow">
                <div className="card-body">
                  <h5 className="card-title">Follow Trainings</h5>
                  <p className="card-text"></p>
                  <a href="#" className="btn btn-sm Hover" style={activitiesButtonStyle}>Go</a>
                </div>
              </div>
            </div>            
          </div>
        </div>
      </div>
    </div>
  );

}

export default WelcomeTeamLeader;
