
import React, { Component } from 'react'
//import SimpleModal from './SimpleModal';
import axios from 'axios';
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { AUTH_TOKEN_KEY } from './App'
import './UserSkills.css';
import UserSkillRow from './UserSkill';
import UserSkillDomainRow from './UserSkillDomainRow';
import { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';

function WelcomeTeamMember(props) {
  let [userSkills, setUserSkills] = useState([])
  let [userStatusCampaign, setUserStatusCampaign] = useState('')
  let userIdParam = useParams();
  let history = props.history
  //let firstname = props.userInfo.firstname;
  //let lastname = props.userInfo.lastname.toUpperCase();
  let firstname = JSON.parse(sessionStorage.getItem(AUTH_TOKEN_KEY)).firstname;
  let lastname = JSON.parse(sessionStorage.getItem(AUTH_TOKEN_KEY)).lastname.toUpperCase();
  //console.log("UserInfo",props.userInfo)

  let titleH1Style = { color: '#131f1f' }
  let tableStyle = { borderSpacing: '0px 5px', borderCollapse: 'separate' }
  let columnStyle = { color: '#4c7f7f' }
  let campaignStyle = { color: '#609f9f' }
  let cardTitleStyle = { color: '#609f9f' }
  let cardSubTitleStyle = { color: '#bfd8d8' }
  let rowTitleStyle = { backgroundColor: '#eff5f5' }
  let activitiesStyle = { marginTop: '30px' }
  let activitiesButtonStyle = { color: '#ffff', backgroundColor: '#609f9f' }
  let token = (JSON.parse(sessionStorage.getItem(AUTH_TOKEN_KEY))).access

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
                <h6 className="card-subtitle mb-2 text-end" style={cardSubTitleStyle}>Card subtitle</h6>
                <p className="card-text"></p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-md-12" style={activitiesStyle}>
        <div className="row pb-3">
          <div className="col-md-3 offset-md-4">
            <div className="card shadow">
              <div className="card-body">
                <h5 className="card-title">Evaluate My Skills</h5>
                <p className="card-text"></p>
                <Link className="btn btn-sm Hover" to={`/skillstovalidate`} onClick={event => {
                  this.props.history(`/skillstovalidate`);

                }} style={activitiesButtonStyle}>Go</Link>
              </div>
            </div>
          </div>
        </div>
        <div className="row pb-3">
          <div className="col-sm-3 offset-md-4">
            <div className="card shadow">
              <div className="card-body">
                <h5 className="card-title">Display My Trainings</h5>
                <p className="card-text"></p>
                <a href="#" className="btn btn-sm Hover" style={activitiesButtonStyle}>Go</a>
              </div>
            </div>
          </div>
        </div>
        <div className="row pb-3">
          <div className="col-sm-3 offset-md-4">
            <div className="card shadow">
              <div className="card-body">
                <h5 className="card-title">Follow My Trainings</h5>
                <p className="card-text"></p>
                <a href="#" className="btn btn-sm Hover" style={activitiesButtonStyle}>Go</a>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );

}

export default WelcomeTeamMember;
