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

function UserSkillTable(props) {
  let [userSkills, setUserSkills] = useState([])
  let [userStatusCampaign, setUserStatusCampaign] = useState('')
  let userIdParam = useParams();
  let history = props.history
  //let firstname = props.userInfo.firstname;
  //let lastname = props.userInfo.lastname.toUpperCase();
  let firstname = JSON.parse(sessionStorage.getItem(AUTH_TOKEN_KEY)).firstname;
  let lastname = JSON.parse(sessionStorage.getItem(AUTH_TOKEN_KEY)).lastname.toUpperCase();
  let token = (JSON.parse(sessionStorage.getItem(AUTH_TOKEN_KEY))).access
  //console.log("UserInfo",props.userInfo)

  let titleH1Style = { color: '#131f1f' }
  let tableStyle = { borderSpacing: '0px 5px', borderCollapse: 'separate' }
  let columnStyle = { color: '#4c7f7f' }
  let campaignStyle = { color: '#609f9f' }
  let cardTitleStyle = { color: '#609f9f' }
  let cardSubTitleStyle = { color: '#bfd8d8' }
  let rowTitleStyle = { backgroundColor: '#eff5f5' }
 

  useEffect(() => {

    axios('/teammembers/' + Object.values(userIdParam), {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        "Authorization": "Bearer " + token
      }
    })
      .then((response) => {
        setUserStatusCampaign(response.data.statusCurrentCampaign)
      }, (error) => {
        if (error.response.status === 403 || error.response.status === 401) {
          history("/login")
        }
      }
      )
  }, [])

  console.log("UserStatusCampaign", userStatusCampaign)

  useEffect(() => {
    axios("/userskills/" + Object.values(userIdParam), {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        "Authorization": "Bearer " + token
      }
    })
      .then((response) => {
        setUserSkills(response.data)
      }, (error) => {
        if (error.response.status === 403 || error.response.status === 401) {
          history("/login")
        }
      }
      )
  }, [])

  const rows = [];
  let lastDomain = null;
  const [expandedRows, setExpandedRows] = useState([]);
  const [expandState, setExpandState] = useState({});

  userSkills.forEach((userSkill) => {
    if (userSkill.labelDomain !== lastDomain) {
      console.log("userSkill.labelDomain", userSkill.labelDomain);
      console.log('lastDomain', lastDomain)
      rows.push(
        <UserSkillDomainRow
          domain={userSkill.labelDomain}
          expandedRows={expandedRows}
          setExpandedRows={setExpandedRows}
          setExpandState={setExpandState}
          expandState={expandState}
          key={userSkill.labelDomain} />
      );
    }
    rows.push(
      <UserSkillRow
        userSkill={userSkill}
        expandedRows={expandedRows}
        key={userSkill.userSkillId} />
    );
    lastDomain = userSkill.labelDomain;
  });

  function onSubmit(event) {
    event.preventDefault();

    axios('/teammembers/' + Object.values(userIdParam) + "/statusCurrentCampaign", {
      method: 'patch',
      headers: {
        "Authorization": "Bearer " + token
      },
      data: { statusUserCampaign: "SUBMITTED" }
    }
    )
      .then((response) => {
        setUserStatusCampaign(response.data.statusUserCampaign);
        console.log("Status Campaign updated")
      }, (error) => {
        if (error.response.status === 400) {
          console.log("Bad request")
          alert("Status Campaign not updated.")
        }
      })
  }

  return (
    <div className="container py-5 h-100">
      <div className="container pt-4" style={rowTitleStyle}>
        <div className="row align-items-center justify-content-start pb-4" >
          <div className='col-6'>
            <h1 style={titleH1Style}>MY SKILLS</h1>
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
      <div className="col-md-12">
        <Table hover table-condensed="true" style={tableStyle}>
          <thead>
            <tr style={columnStyle} >
              <th >#</th>
              <th >Skill</th>
              <th className="text-center">Mark</th>
              <th className="text-center">Status</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody  >{rows}</tbody>
        </Table>
      </div>
      <div className="row">
        <div className="col-md-12">
          <form className="col-md-2 Hover" onSubmit={onSubmit}>
            {userStatusCampaign === "SUBMITTED" ? <input id="{inputStatusCampaign}"
              className="btn btn-secondary btn-sm btn-block w-100"
              type="submit" value="Submitted" disabled /> :
              <input id="{inputStatusCampaign}"
                className="btn btn-dark btn-sm btn-block w-100"
                type="submit" value="Submit the campaign" style={campaignStyle} />
            }
          </form>
        </div>
      </div>
    </div>
  );

}

export default UserSkillTable;
