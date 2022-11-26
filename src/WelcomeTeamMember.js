
import React, { Component } from 'react'
import axios from 'axios';
import Error from './components/Error.js'
import Title from './components/Title.js'
import Card from './components/Card.js'

import './UserSkills.css';

import { useState, useEffect } from 'react';

function WelcomeTeamMember(props) {
  let history = props.history
  let titleH1 = "MY ACTIVITIES"
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
  let [display, setDisplay] = useState(false)
  let [title, setTitle] = useState('')

  let activitiesStyle = { marginTop: '30px' }

  useEffect(() => {
    axios('/teammembers/' + id, {
      method: 'GET',
    })
      .then((response) => {
        setDisplay(false)
        setManager(response.data.fullNameManager)
        setUserStatusCampaign(response.data.statusCurrentCampaign)
        setStatusVolunteer(response.data.statusVolunteerTrainer)
      }, (error) => {
        if (error.response.status === 403 || error.response.status === 401) {
          alert("Connection failed")
          history("/login")
        } else {
          setDisplay(true)
          setTitle("TeamMember not found")
        }
      }
      )
  }, [])

  useEffect(() => {
    axios('/campaigns', {
      method: 'GET',
      params: { status: 'CURRENT' },
    })
      .then((response) => {
        setDisplay(false)
        setCurrentCampaign(response.data)
      }, (error) => {
        if (error.response.status === 403 || error.response.status === 401) {
          history("/login")
        } else if (error.response.status === 404) {
          setDisplay(true)
          setTitle("Current campaign not found ")
        } else {
          setDisplay(true)
          setTitle("Technical Error ")
        }
      }
      )
  }, [])

  return (
    <div className="container py-5 h-100">
      <Title firstname={firstname} lastname={lastname} details={manager} titleH1={titleH1} displayUser={true} />
      <Error display={display} title={title} />
      <div className="col-md-8 offset-md-2" style={activitiesStyle}>
        <div className="container">
          <div className="row pb-3 ">
            {(userStatusCampaign === 'OPENED') || (userStatusCampaign === null) ?
              (<div className="col-md-5 pb-3">
                <Card titleCard="Initialize My Skills" link="/userskills/campaign" id={currentCampaign.id} history={history} go="Go" />
              </div>) :
              null
            }
            {(userStatusCampaign === "INITIALIZED")
              ?
              (<div className="col-md-5 pb-3">
                <Card titleCard="Evaluate My Skills" link="/userskills" id={id} history={history} go="Go" />
              </div>)
              :
              null
            }
            {(userStatusCampaign === 'VALIDATED') || (userStatusCampaign === 'SUBMITTED') || (userStatusCampaign === 'IN_PROGRESS')
              ?
              (<div className="col-md-5 pb-3">
                <Card titleCard="Display My Skills" link="/userskills" id={id} history={history} go="Go" />
              </div>)
              :
              null
            }
            {(statusVolunteer === 'UNKNOWN') || (statusVolunteer === null) ?
              (<div className="col-md-5 pb-3">
                <Card titleCard="Volunteer to train ?" go="Go" displayGo={false} />
              </div>) :
              null
            }
            {(userStatusCampaign === 'IN_PROGRESS') ?
              (<div className="col-md-5 pb-3">
                <Card titleCard="My Trainings" go="Go" displayGo={false} />
              </div>) :
              null
            }
            {(statusVolunteer === 'VOLUNTEER') ?
              (<div className="col-md-5 pb-3">
                <Card titleCard="Manage My Trainings" go="Go" displayGo={false} />
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
