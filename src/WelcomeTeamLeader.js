import React from 'react'
import axios from 'axios';
import { useEffect, useState } from 'react';
import Error from './components/Error';
import Title from './components/Title.js'
import Card from './components/Card.js'
import './UserSkills.css';

function WelcomeTeamLeader(props) {
  let history = props.history
  let titleH1 = "MY ACTIVITIES"
  let firstname = props.userFirstName
  let lastname = props.userLastName
  let id = props.userId
  let team = props.team
  let setTeam = props.setTeam
  let currentCampaign = props.currentCampaign
  let setCurrentCampaign = props.setCurrentCampaign
  let [display, setDisplay] = useState(false)
  let [title, setTitle] = useState('')

  let activitiesStyle = { marginTop: '30px' }

  useEffect(() => {
    axios.get('/managers/' + id)
      .then((response) => {
        setDisplay(false)
        setTeam(response.data.team)
      }, (error) => {
        if (error.response.status === 403 || error.response.status === 401) {
          setDisplay(true)
          setTitle("Connection failed")
          history("/login")
        } else if (error.response.status === 404) {
          setDisplay(true)
          setTitle("Manager not found")
        } else {
          setDisplay(true)
          setTitle("Technical error")
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

  return (<>
    <div className="container py-5 h-100">
      <Title firstname={firstname} lastname={lastname} details={team} titleH1={titleH1} displayUser={true} />
      <Error display={display} title={title} />
      <div className="col-md-8 offset-md-2" style={activitiesStyle}>
        <div className="container">
          <div className="row pb-3">
            <div className="col-md-5 pb-3">
              <Card titleCard="Validate Skills" link="/skillstovalidate" id={id} history={history} go="Go" />
            </div>
            <div className="col-sm-5 pb-3">
              <Card titleCard="Organize Trainings" go="Go" displayGo={false} />
            </div>
            <div className="col-sm-5 pb-3">
              <Card titleCard="Follow Trainings" go="Go" displayGo={false} />
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
  );
}

export default WelcomeTeamLeader;
