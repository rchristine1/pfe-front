
import React, { Component } from 'react'
//import SimpleModal from './SimpleModal';
import axios from 'axios';
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { AUTH_TOKEN_KEY } from './App'
import './UserSkills.css';
import { useState, useEffect } from 'react';
import TeamMemberSkills from './TeamMemberSkills';

function SkillsToValidate(props) {
    let [teamMembersSubmitted, setTeamMembersSubmitted] = useState([])
    let [teamMembersInProgress, setTeamMembersInProgress] = useState([])
    let history = props.history
    let firstname = props.userFirstName
    let lastname = props.userLastName
    let team = props.team
    let userIdParam = useParams();

    let titleH1Style = { color: '#131f1f', letterSpacing: '5px', fontSize: '1.75em' }
    let cardTitleStyle = { color: '#609f9f' }
    let cardSubTitleStyle = { color: '#bfd8d8' }
    let rowTitleStyle = { backgroundColor: '#eff5f5' }
    let activitiesStyle = { marginTop: '30px' }
    let cardTitle = { backgroundColor: '#eff5f5' }



    useEffect(() => {
        axios('/teammembers/manager/' + Object.values(userIdParam), {
            method: 'GET',
            params: {
                status: 'SUBMITTED'
            },

        })
            .then((response) => {
                setTeamMembersSubmitted(response.data)
            }, (error) => {
                if (error.response.status === 403 || error.response.status === 401) {
                    history("/login")
                }
            }
            )
    }, [])

    useEffect(() => {
        axios('/teammembers/manager/' + Object.values(userIdParam), {
            method: 'GET',
            params: {
                status: "IN_PROGRESS"
            },

        })
            .then((response) => {
                setTeamMembersInProgress(response.data)
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
                                <h6 className="card-subtitle mb-2 text-end" style={cardSubTitleStyle}>{team}</h6>
                                <p className="card-text"></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-md-12" style={activitiesStyle}>
                <div className="container">
                    <div className="row py-3">
                        <div className='col-1'></div>
                        <div className="col-9 justify-content-center ">
                            <div className="card py-3" style={cardTitle}>
                                <div className="card-body py-0">
                                    <h5 className="card-title text-center" style={cardTitleStyle}>Status Campaign</h5>
                                    <h6 className="card-subtitle mb-2 text-center fw-bold" style={cardTitleStyle}>Submitted</h6>
                                    <p className="card-text"></p>
                                </div>
                            </div>
                        </div>
                        <div className='col-1'></div>
                    </div>
                    <div className="container">
                        <div className="row">
                            <div className='col-1'></div>
                            <div className="col-md-9 ">
                                <div className="row justify-content-center">
                                    {teamMembersSubmitted.map((teamMemberSubmitted) =>
                                        <div id={teamMemberSubmitted.id} className="col-md-3 " key={teamMemberSubmitted.id}>
                                            <TeamMemberSkills {...teamMemberSubmitted} />
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className='col-1'></div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-md-12" style={activitiesStyle}>
                <div className="container">
                    <div className="row py-3">
                        <div className='col-1'></div>
                        <div className="col-9 justify-content-center">
                            <div className="card py-3" style={cardTitle}>
                                <div className="card-body py-0">
                                    <h5 className="card-title text-center" style={cardTitleStyle}>Status Campaign</h5>
                                    <h6 className="card-subtitle mb-2 text-center fw-bold" style={cardTitleStyle}>In Progress</h6>
                                    <p className="card-text"></p>
                                </div>
                            </div>
                        </div>
                        <div className='col-1'></div>
                    </div>
                    <div className="container">
                        <div className="row">
                            <div className='col-1'></div>
                            <div className="col-md-9 ">
                                <div className="row justify-content-center">
                                    {teamMembersInProgress.map((teamMemberInProgress) =>
                                        <div id={teamMemberInProgress.id} className="col-md-3" key={teamMemberInProgress.id}>
                                            <TeamMemberSkills {...teamMemberInProgress} />
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className='col-1'></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default SkillsToValidate;
