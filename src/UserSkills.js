import React, { Component } from 'react'
//import SimpleModal from './SimpleModal';
import axios from 'axios';
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import './UserSkills.css';
import UserSkillRow from './UserSkill';
import UserSkillDomainRow from './UserSkillDomainRow';
import { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import { ROLE_TEAMMEMBER } from './Login'
import { ROLE_TEAMLEADER } from './Login'

function UserSkillTable(props) {
  let [userSkills, setUserSkills] = useState([])
  let [userStatusCampaign, setUserStatusCampaign] = useState('')
  let [teamMemberFirstName, setTeamMemberFirstName] = useState('')
  let [teamMemberLastName, setTeamMemberLastName] = useState('')
  let userIdParam = useParams();
  let userRole = props.userRoles
  let history = props.history
  let manager = props.manager
  let setManager = props.setManager

  let titleH1Style = { color: '#131f1f', letterSpacing: '5px',fontSize:'1.75em' }
  let tableStyle = { borderSpacing: '0px 5px', borderCollapse: 'separate' }
  let columnStyle = { color: '#4c7f7f' } 
  let campaignStyle = {color: '#ffff', backgroundColor: '#609f9f'}
  let cardTitleStyle = { color: '#609f9f' }
  let cardSubTitleStyle = { color: '#bfd8d8' }
  let rowTitleStyle = { backgroundColor: '#eff5f5' }


  useEffect(() => {

    axios('/teammembers/' + Object.values(userIdParam), {
      method: 'GET',
    })
      .then((response) => {
        setUserStatusCampaign(response.data.statusCurrentCampaign)
        setTeamMemberFirstName(response.data.firstname)
        setTeamMemberLastName(response.data.lastname)
        setManager(response.data.manager)
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
  let [actionState, setActionState] = useState(userRole);

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
        key={userSkill.userSkillId}
        actionState={actionState}
      />
    );
    lastDomain = userSkill.labelDomain;
  });

  function onSubmit(event) {
    event.preventDefault();

    axios('/teammembers/' + Object.values(userIdParam) + "/statusCurrentCampaign", {
      method: 'patch',
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
            {actionState === ROLE_TEAMMEMBER ?
              <h1 style={titleH1Style}>MY SKILLS</h1> :
              <h1 style={titleH1Style}>SKILLS</h1>
            }
          </div>
          <div className="col-4 offset-md-2">
            <div className="card" >
              <div className="card-body py-0">
                <h5 className="card-title text-end" style={cardTitleStyle}>{teamMemberFirstName} {teamMemberLastName}</h5>
                <h6 className="card-subtitle mb-2 text-end" style={cardSubTitleStyle}>{manager}</h6>
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
          <form className="col-md-2 " onSubmit={onSubmit}>
            {actionState === ROLE_TEAMLEADER ?
              userStatusCampaign !== "VALIDATED" ?
                (<input id="{inputStatusCampaign}"
                  className="btn btn-sm btn-block w-100 fw-bold Hover"
                  type="submit" value="Validate the campaign" style={campaignStyle} />) :
                (<input id="{inputStatusCampaign}"
                  className="btn btn-secondary btn-sm btn-block w-100 border border-3 fw-bold"
                  type="submit" value="Validated" disabled />) :
              userStatusCampaign === "SUBMITTED" ?
                (<input id="{inputStatusCampaign}"
                  className="btn btn-secondary btn-sm btn-block w-100  border border-3 fw-bold"
                  type="submit" value="Submitted" disabled />) :
                (<input id="{inputStatusCampaign}"
                  className="btn btn-sm btn-block w-100 fw-bold Hover"
                  type="submit" value="Submit the campaign" style={campaignStyle} />)
            }

          </form>
        </div>
      </div>
    </div>
  );

}

export default UserSkillTable;
