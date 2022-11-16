
import React, { Component } from 'react'
//import SimpleModal from './SimpleModal';
import axios from 'axios';
import { Link } from "react-router-dom";

import './UserSkills.css';

import { useState, useEffect } from 'react';

function WelcomeTeamMember(props) {
  let history = props.history
  let firstname = props.userFirstName
  let lastname = props.userLastName
  let id = props.userId
  let manager = props.manager
  let setManager = props.setManager
  let currentCampaign = props.currentCampaign
  let setCurrentCampaign = props.setCurrentCampaign
  let userStatusCampaign = props.userStatusCampaign
  let setUserStatusCampaign = props.setUserStatusCampaign
  let setStatusVolunteer = props.setStatusVolunteer
  let statusVolunteer = props.statusVolunteer

  let titleH1Style = { color: '#131f1f', letterSpacing: '5px', fontSize: '1.75em' }
  let cardTitleStyle = { color: '#609f9f' }
  let cardSubTitleStyle = { color: '#bfd8d8' }
  let rowTitleStyle = { backgroundColor: '#eff5f5' }
  let activitiesStyle = { marginTop: '30px' }
  let activitiesButtonStyle = { color: '#ffff', backgroundColor: '#609f9f' }

  useEffect(() => {
    axios('/teammembers/' + id, {
      method: 'GET',
    })
      .then((response) => {
        setManager(response.data.manager)
        setUserStatusCampaign(response.data.statusCurrentCampaign)
        setStatusVolunteer(response.data.statusVolunteerTrainer)
      }, (error) => {
        if (error.response.status === 403 || error.response.status === 401) {
          history("/login")
        }
      }
      )
  }, [])

  useEffect(() => {
    axios('/campaign/status', {
      method: 'GET',
      params: {
        status: 'CURRENT'
      },
    })
      .then((response) => {
        setCurrentCampaign(response.data)
        console.log("CAMPAIGN")
      }, (error) => {
        if (error.response.status === 403 || error.response.status === 401) {
          history("/login")
        }
      }
      )
  }, [])

  console.log("WELCOME", userStatusCampaign)
  console.log("WELCOME", statusVolunteer)
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
                <h6 className="card-subtitle mb-2 text-end" style={cardSubTitleStyle}>{manager}</h6>
                <p className="card-text"></p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-md-8 offset-md-2" style={activitiesStyle}>
        <div className="container">
          <div className="row pb-3 ">
            {(userStatusCampaign === 'OPENED') || (userStatusCampaign === null) ?
              (<div className="col-md-5 pb-3">
                <div className="card shadow ">
                  <div className="card-body">
                    <h5 className="card-title">Initialize My Skills</h5>
                    <p className="card-text"></p>
                    <Link className="btn btn-sm Hover" to={`/userskills/campaign/${currentCampaign.id}`} onClick={event => {
                      history(`/userskills/campaign/${currentCampaign.id}`);
                    }} style={activitiesButtonStyle}>Go</Link>
                  </div>
                </div>
              </div>) :
              null
            }
            {((userStatusCampaign !== null) || (userStatusCampaign !== 'OPENED')
              ?
              (<div className="col-md-5 pb-3">
                <div className="card shadow">
                  <div className="card-body">
                    <h5 className="card-title">Evaluate My Skills</h5>
                    <p className="card-text"></p>
                    <Link className="btn btn-sm Hover" to={`/userskills/${id}`} onClick={event => {
                      history(`/userskills/${id}`);
                    }} style={activitiesButtonStyle}>Go</Link>
                  </div>
                </div>
              </div>)
              :
              (<div className="col-md-5 pb-3">
                <div className="card shadow">
                  <div className="card-body">
                    <h5 className="card-title">Skills are not initialized yet</h5>
                    <p className="card-text"></p>
                  </div>
                </div>
              </div>
              )
            )
            }

            {(statusVolunteer === 'UNKNOWN') || (statusVolunteer === null) ?
              (<div className="col-md-5 pb-3">
                <div className="card shadow">
                  <div className="card-body">
                    <h5 className="card-title">Volunteer to train ?</h5>
                    <p className="card-text"></p>
                    <a href="#" className="btn btn-sm Hover" disabled style={activitiesButtonStyle}>Go</a>
                  </div>
                </div>
              </div>) :
              null
            }
            {(userStatusCampaign === 'IN_PROGRESS') ?
              (<div className="col-md-5 pb-3">
                <div className="card shadow">
                  <div className="card-body">
                    <h5 className="card-title">My Trainings</h5>
                    <p className="card-text"></p>
                    <a href="#" className="btn btn-sm Hover" style={activitiesButtonStyle}>Go</a>
                  </div>
                </div>
              </div>) :
              null
            }
            {(statusVolunteer === 'VOLUNTEER') ?
            (<div className="col-md-5 pb-3">
              <div className="card shadow">
                <div className="card-body">
                  <h5 className="card-title">Manage My Trainings</h5>
                  <p className="card-text"></p>
                  <a href="#" className="btn btn-sm Hover" style={activitiesButtonStyle}>Go</a>
                </div>
              </div>
            </div>) :
            (null)
            }
          </div>
        </div >
      </div >
    </div>
  );

}

export default WelcomeTeamMember;
