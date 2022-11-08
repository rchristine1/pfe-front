import React, { Component } from 'react'
//import SimpleModal from './SimpleModal';
import axios from 'axios';
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { AUTH_TOKEN_KEY } from './App'
import './UserSkills.css';
import UserSkillRow from './UserSkill';
import UserSkillDomainRow from './UserSkillDomainRow';
import UserConnected from './UserConnected';
import { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';

function UserSkillTable(props) {
  let [userSkills, setUserSkills] = useState([])
  let [userStatusCampaign, setUserStatusCampaign] = useState('')
  let userIdParam = useParams();
  let history = props.history

  let titleH1Style = { color: '#1c2f2f' }
  let tableStyle = {borderSpacing: '0px 5px',borderCollapse : 'separate'}

  useEffect(() => {
    axios('/teammembers/' + Object.values(userIdParam), {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        "Authorization": "Bearer " + sessionStorage.getItem(AUTH_TOKEN_KEY)
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
        "Authorization": "Bearer " + sessionStorage.getItem(AUTH_TOKEN_KEY)
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
  }, [userSkills])

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
        "Authorization": "Bearer " + sessionStorage.getItem('jhi-authenticationToken')
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
      <h1 style={titleH1Style}>MY SKILLS</h1>

      <div className="col-md-12">
        <Table hover table-condensed="true" style={tableStyle}>
          <thead>
            <tr>
              <th >#</th>
              <th >Skill</th>
              <th >Mark</th>
              <th >Status</th>
              <th >Actions</th>
            </tr>
          </thead>
          <tbody  >{rows}</tbody>
        </Table>
      </div>
      <div className="row">
        <div className="col-md-12">
          <form className="col-md-2 " onSubmit={onSubmit}>
            {userStatusCampaign === "SUBMITTED" ? <input id="{inputStatusCampaign}"
              className="btn btn-secondary btn-sm btn-block w-100"
              type="submit" value="Submitted" disabled /> :
              <input id="{inputStatusCampaign}"
                className="btn btn-dark btn-sm btn-block w-100"
                type="submit" value="Submit the campaign" />
            }
          </form>
        </div>
      </div>
    </div>
  );

}

export default UserSkillTable;
