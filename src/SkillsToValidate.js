
import React, { Component } from 'react'
//import SimpleModal from './SimpleModal';
import axios from 'axios';
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { AUTH_TOKEN_KEY } from './App'
import './UserSkills.css';
import { useState, useEffect } from 'react';
import TeamMemberSkills from './TeamMemberSkills';

function SkillsToValidate(props) {
    let [teamMembersToValidate, setTeamMembersToValidate] = useState([])
    let history = props.history
    let firstname = JSON.parse(sessionStorage.getItem(AUTH_TOKEN_KEY)).firstname;
    let lastname = JSON.parse(sessionStorage.getItem(AUTH_TOKEN_KEY)).lastname.toUpperCase();
    let token = (JSON.parse(sessionStorage.getItem(AUTH_TOKEN_KEY))).access

    let titleH1Style = { color: '#131f1f' }
    let tableStyle = { borderSpacing: '0px 5px', borderCollapse: 'separate' }
    let columnStyle = { color: '#4c7f7f' }
    let campaignStyle = { color: '#609f9f' }
    let cardTitleStyle = { color: '#609f9f' }
    let cardSubTitleStyle = { color: '#bfd8d8' }
    let rowTitleStyle = { backgroundColor: '#eff5f5' }
    let activitiesStyle = { marginTop: '30px' }
    let activitiesButtonStyle = { color: '#ffff', backgroundColor: '#609f9f' }
  

    useEffect(() => {
        axios('/teammembers/statuscampaign', {
            method: 'GET',
            headers: {
                "Authorization": "Bearer " + token
            },
            params: {
                status: 'SUBMITTED'
            },

        })
            .then((response) => {
                setTeamMembersToValidate(response.data)
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
                        <h1 style={titleH1Style}>SKILLS TO VALIDATE</h1>
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
                <div className="container">
                    <div className="row">
                        {teamMembersToValidate.map((teamMemberToValidate) =>
                            <div id={teamMemberToValidate.id} className="col-md-2" key={teamMemberToValidate.id}>
                                <TeamMemberSkills {...teamMemberToValidate}  />
                            </div>
                        )}
                    </div>
                </div>

            </div>
            <div className="row">

            </div>
        </div>
    );

}

export default SkillsToValidate;
