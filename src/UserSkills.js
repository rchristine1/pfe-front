import React, { Component } from 'react'
//import SimpleModal from './SimpleModal';
import axios from 'axios';
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import './UserSkills.css';
import UserSkillRow from './UserSkill';
import UserSkillDomainRow from './UserSkillDomainRow';
import { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Error from './components/Error.js';
import Title from './components/Title.js';
import FormButton from './components/FormButton.js';
import { ROLE_TEAMMEMBER } from './Login'
import { ROLE_TEAMLEADER } from './Login'

function UserSkillTable(props) {
  let [userSkills, setUserSkills] = useState([])
  let userStatusCampaign = props.userStatusCampaign
  let setUserStatusCampaign = props.setUserStatusCampaign
  let currentCampaign = props.currentCampaign
  let currentCampaignLabel = currentCampaign.label
  let [teamMemberFirstName, setTeamMemberFirstName] = useState('')
  let [teamMemberLastName, setTeamMemberLastName] = useState('')
  let userIdParam = useParams();
  let userRole = props.userRoles
  let history = props.history
  let manager = props.manager
  let setManager = props.setManager
  let [display, setDisplay] = useState(false)
  let [title, setTitle] = useState('')
  let titleH1 = ""
  let errorMessage400 = ""

  let tableStyle = { borderSpacing: '0px 5px', borderCollapse: 'separate' }
  let columnStyle = { color: '#4c7f7f' }
  let campaignStyle = { color: '#ffff', backgroundColor: '#609f9f' }



  useEffect(() => {
    axios('/teammembers/' + Object.values(userIdParam), {
      method: 'GET',
    })
      .then((response) => {
        setDisplay(false)
        setUserStatusCampaign(response.data.statusCurrentCampaign)
        setTeamMemberFirstName(response.data.firstname)
        setTeamMemberLastName(response.data.lastname)
        setManager(response.data.fullNameManager)
      }, (error) => {
        if (error.response.status === 403 || error.response.status === 401) {
          setDisplay(true)
          setTitle("Connection failed")
          history("/login")
        } else if (error.response.status === 404) {
          setDisplay(true)
          setTitle("TeamMember not found")
        } else {
          setDisplay(true)
          setTitle("Technical error")
        }
      }
      )
  }, [])

  useEffect(() => {
    axios("/userskills/" + Object.values(userIdParam), {
      method: 'GET',
      params: { id: currentCampaign.id }
    })
      .then((response) => {
        setDisplay(false)
        setUserSkills(response.data)
      }, (error) => {
        if (error.response.status === 403 || error.response.status === 401) {
          history("/login")
        } else if (error.response.status === 404) {
          setDisplay(true)
          setTitle("Current Campaign not found")
        } else {
          setDisplay(true)
          setTitle("Technical error")
        }
      }
      )
  }, [])
  console.log("currentcampaign", currentCampaign)
  if (currentCampaign == " ") {
    setDisplay(true);
    setTitle("CurrentCampaign not found")
  }


  const rows = [];
  let lastDomain = null;
  const [expandedRows, setExpandedRows] = useState([]);
  const [expandState, setExpandState] = useState({});
  let [actionState, setActionState] = useState(userRole);

  userSkills.forEach((userSkill) => {
    if (userSkill.labelDomain !== lastDomain) {
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
        userStatusCampaign={userStatusCampaign}
      />
    );
    lastDomain = userSkill.labelDomain;
  });
  if (actionState === ROLE_TEAMMEMBER) {
    titleH1 = "MY SKILLS";
    errorMessage400 = "Some skills are missing."
  } else {
    titleH1 = "SKILLS";
    errorMessage400 = "Validation blocked : please check the skills."
  }

  function onSubmit(event, statusCampaign) {
    event.preventDefault();

    axios('/teammembers/' + Object.values(userIdParam) + "/statusCurrentCampaign", {
      method: 'patch',
      data: { statusUserCampaign: statusCampaign }
    }
    )
      .then((response) => {
        setDisplay(false)
        setUserStatusCampaign(response.data.statusCurrentCampaign);
        console.log("Status Campaign updated")
      }, (error) => {
        if (error.response.status === 403) {
          setDisplay(true)
          setTitle("Connection failed")
          history('/login')
        } else if (error.response.status === 400) {
          setDisplay(true)
          setTitle(errorMessage400)
        } else {
          setDisplay(true)
          setTitle("Technical error")
        }
      })
  }



  return (
    <div className="container py-5 h-100">
      <Title firstname={teamMemberFirstName} lastname={teamMemberLastName} details={manager} titleH1={titleH1} displayCampaign={true}
        currentCampaignLabel={currentCampaignLabel} userStatusCampaign={userStatusCampaign} displayUser={true}
      />
      <Error display={display} title={title} />
      <div className="col-md-8 offset-md-2">
        {rows !== undefined ?
          <Table hover table-condensed="true" className="overflow-visible overflow-scroll" style={tableStyle}>
            <thead>
              <tr style={columnStyle} >
                <th >#</th>
                <th >Skill</th>
                <th className="text-center">Mark</th>
                <th className="text-center">Status</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody >{rows}</tbody>
          </Table> :
          <p>
            <Link className="btn btn-sm Hover " to={`/userskills/${userIdParam}`} onClick={event => {
              history(`/userskills/${userIdParam}`);
            }} >Initialize your skills</Link>
          </p>
        }
      </div>
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <div className="row">
            {actionState === ROLE_TEAMLEADER
              ?
                (userStatusCampaign !== "VALIDATED"
                  ?
                  <form className="col-md-3" onSubmit={(event, status) => onSubmit(event, "VALIDATED")}>
                    <input id="{inputStatusCampaign}"
                      className="btn btn-sm btn-block w-100 fw-bold Hover"
                      type="submit" value="Validate the campaign" style={campaignStyle} toggle="tooltip"
                      title="You can't validate if there is one ore more skills to be trained. Provide trainings in that case" />
                  </form>
                  :
                  <form className="col-md-3" onSubmit={(event, status) => onSubmit(event, "VALIDATED")}>
                    <input id="{inputStatusCampaign}"
                      className="btn btn-secondary btn-sm btn-block w-100 border border-3 fw-bold"
                      type="submit" value="Validated" disabled />
                  </form>
                )          
              :
              ((userStatusCampaign === "SUBMITTED") || (userStatusCampaign === "VALIDATED") || (userStatusCampaign === "IN_PROGRESS")
                ?
                <form className="col-md-3" onSubmit={(event, status) => onSubmit(event, "SUBMITTED")}>
                  <input id="{inputStatusCampaign}"
                    className="btn btn-secondary btn-sm btn-block w-100  border border-3 fw-bold"
                    type="submit" value="Submitted" disabled />
                </form>
                :
                <form className="col-md-3" onSubmit={(event, status) => onSubmit(event, "SUBMITTED")}>
                  <input id="{inputStatusCampaign}"
                    className="btn btn-sm btn-block w-100 fw-bold Hover"
                    type="submit" value="Submit the campaign" style={campaignStyle} />
                </form>
              )
            }
            <form className="col-md-3" onSubmit={(event, status) => onSubmit(event, "IN_PROGRESS")}>
              {actionState === ROLE_TEAMLEADER
                ? ((userStatusCampaign === "IN_PROGRESS" || userStatusCampaign === "VALIDATED")
                  ?
                  <input id="{inputStatusCampaign}"
                    className="btn btn-sm btn-block w-100 fw-bold bg-secondary" disabled
                    type="submit" value="Provide Training" style={campaignStyle} />                  
                  :
                  <input id="{inputStatusCampaign}"
                    className="btn btn-sm btn-block w-100 fw-bold"
                    type="submit" value="Provide Training" style={campaignStyle} toggle="tooltip"
                    title="You can't provide training if there is no skill to be trained."/>                  
                )
                :
                null
              }
            </form>
          </div>
        </div>
      </div>
    </div >
  );

}

export default UserSkillTable;
