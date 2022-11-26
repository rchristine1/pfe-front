
import React, { Component } from 'react'
//import SimpleModal from './SimpleModal';
import axios from 'axios';
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { AUTH_TOKEN_KEY } from './App'
import './UserSkills.css';
import { useState, useEffect } from 'react';
import Error from './components/Error.js'
import Title from './components/Title.js'
import TeamMemberSkills from './components/TeamMemberSkills';

function SkillsToValidate(props) {
    let [teamMembersSubmitted, setTeamMembersSubmitted] = useState([])
    let [teamMembersInProgress, setTeamMembersInProgress] = useState([])
    let history = props.history
    let firstname = props.userFirstName
    let lastname = props.userLastName
    let team = props.team
    let currentCampaign = props.currentCampaign
    let userIdParam = useParams();
    let [display, setDisplay] = useState(false)
    let [title, setTitle] = useState('')
    let titleH1 = "SKILLS TO VALIDATE"

    let cardTitleStyle = { color: '#4c7f7f' }
    let activitiesStyle = { marginTop: '30px' }
    let cardTitle = { backgroundColor: '#eff5f5' }




    useEffect(() => {
        axios('/teammembers', {
            method: 'GET',
            params: {
                status: 'SUBMITTED',
                managerId: userIdParam['id']
            },

        })
            .then((response) => {
                setDisplay(false)
                setTeamMembersSubmitted(response.data)
            }, (error) => {
                if (error.response.status === 403 || error.response.status === 401) {
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
        axios('/teammembers', {
            method: 'GET',
            params: {
                status: "IN_PROGRESS",
                managerId: userIdParam['id']
            },

        })
            .then((response) => {
                setTeamMembersInProgress(response.data)
            }, (error) => {
                if (error.response.status === 403 || error.response.status === 401) {
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

    return (
        <div className="container py-5 h-100">
            <Title firstname={firstname} lastname={lastname} details={team} titleH1={titleH1} displayUser={true}
            />
            <Error display={display} title={title} />
            <div className="col-md-12" style={activitiesStyle}>
                <div className="container">
                    <div className="row py-3">
                        <div className='col-1'></div>
                        <div className="col-9 justify-content-center ">
                            <div className="card py-3" style={cardTitle}>
                                <div className="card-body py-0">
                                    <h5 className="card-title text-center" style={cardTitleStyle}>Campaign</h5>
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
                                    <h5 className="card-title text-center" style={cardTitleStyle}>Campaign</h5>
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
