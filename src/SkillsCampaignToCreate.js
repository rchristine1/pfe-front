
import React, { Component } from 'react'
//import SimpleModal from './SimpleModal';
import axios from 'axios';
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from 'react';


function SkillsCampaignToCreate(props) {
  let currentCampaign = props.currentCampaign
  console.log(currentCampaign.id)
  let firstname = props.userFirstName
  let lastname = props.userLastName
  let manager = props.manager
  let history = props.history
  let userId = props.userId
  let userStatusCampaign = props.userStatusCampaign
  let setUserStatusCampaign = props.setUserStatusCampaign


  let titleH1Style = { color: '#131f1f', letterSpacing: '5px', fontSize: '1.75em' }
  let cardTitleStyle = { color: '#609f9f' }
  let cardSubTitleStyle = { color: '#bfd8d8' }
  let rowTitleStyle = { backgroundColor: '#eff5f5' }
  let activitiesStyle = { marginTop: '30px' }
  let activitiesButtonStyle = { color: '#ffff', backgroundColor: '#609f9f' }
  let campaignStyle = { color: '#ffff', backgroundColor: '#609f9f' }



  useEffect(() => {
    axios('/userskills/' + currentCampaign.id, {
      method: 'POST',
    })
      .then((response) => {
        let returnStatus = response.status
      }, (error) => {
        if (error.response.status === 403 || error.response.status === 401) {
          history("/login")
        }
      }
      )
  }, [])

  function onSubmit(event) {
    event.preventDefault();

    axios('/teammembers/' + userId + "/statusCurrentCampaign", {
      method: 'patch',
      data: { statusUserCampaign: "INITIALIZED" }
    }
    )
      .then((response) => {
        setUserStatusCampaign(response.data.statusUserCampaign);
        history('/welcometeammember')
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
            <h1 style={titleH1Style}>MY SKILLS TO INITIALIZE</h1>
          </div>
          <div className="col-4 offset-md-2">
            <div className="card" >
              <div className="card-body py-0">
                <h5 className="card-title text-end" style={cardTitleStyle}>{firstname} {lastname}</h5>
                <h6 className="card-subtitle mb-2 text-end" style={cardSubTitleStyle}>{manager}</h6>
                <p className="card-text"></p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-md-8 offset-md-2" style={activitiesStyle}>
        <div className="container">
          <div className="row pb-3 align-items-center">
            <div className="col-1"></div>
            <div className="col-md-9 pb-3">
              <div className="card shadow">
                <div className="card-body ">
                  <h5 className="card-title text-center">Initialize My Skills</h5>
                  <div className="card-text text-center">
                      <form className="" onSubmit={onSubmit}>
                        <input id="{inputStatusCampaign}"
                          className="btn btn-sm  fw-bold Hover col-md-7 justify-content-center"
                          type="submit" value="Click here to complete the initialization " style={campaignStyle} />
                      </form>                      
                  </div>
                </div>
              </div>
            </div>
            <div className="col-1"></div>
          </div>
        </div>
      </div>
    </div>
  );

}

export default SkillsCampaignToCreate;
