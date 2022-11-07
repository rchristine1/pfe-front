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



function UserSkillTable() {
  let [userSkills, setUserSkills] = useState([])
  let userId = useParams();
  let titleH1 = { color: '#1c2f2f' }

  useEffect(() => {

    axios("/userskills/" + Object.values(userId), {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        "Authorization": "Bearer " + sessionStorage.getItem(AUTH_TOKEN_KEY)
      }
    })
      .then((response) => {
        setUserSkills(response.data)
      })
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

  return (
    <div className="container py-5 h-100">
      <h1 style={titleH1}>MY SKILLS</h1>
      <div className="col-md-12">
        <Table hover table-condensed="true">
          <thead>
            <tr>
              <th >#</th>
              <th >Skill</th>
              <th >Mark</th>
              <th >Status</th>
            </tr>
          </thead>
          <tbody  >{rows}</tbody>
        </Table>
      </div>
    </div>
  );

}

export default UserSkillTable;
