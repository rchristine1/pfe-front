
import React, { Component } from 'react'
//import SimpleModal from './SimpleModal';
import axios from 'axios';
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import Error from './components/Error.js';
import Title from './components/Title.js';


function SkillsCampaignToCreate(props) {
  let currentCampaign = props.currentCampaign
  console.log(currentCampaign.id)
  let titleH1 = "MY SKILLS TO INITIALIZE"
  let firstname = props.userFirstName
  let lastname = props.userLastName
  let manager = props.manager
  let history = props.history
  let userId = props.userId
  let userStatusCampaign = props.userStatusCampaign
  let setUserStatusCampaign = props.setUserStatusCampaign
  let [display, setDisplay] = useState(false)
  let [title, setTitle] = useState('')


  let activitiesStyle = { marginTop: '30px' }
  let campaignStyle = { color: '#ffff', backgroundColor: '#609f9f' }



  useEffect(() => {
    axios('/userskills/' + currentCampaign.id, {
      method: 'POST',
    })
      .then((response) => {
        setDisplay(false)
        let returnStatus = response.status
      }, (error) => {
        if (error.response.status === 403 || error.response.status === 401) {
          history("/login")
        } else if (error.response.status === 400){
          setDisplay(true)
          setTitle("Campaign or User unknown or UserSkill already exists")
        } else {
          setDisplay(true)
          setTitle("Technical error")
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
        setDisplay(false)
        setUserStatusCampaign(response.data.statusUserCampaign);
        history('/welcometeammember')
      }, (error) => {
        if (error.response.status === 400) {          
            setDisplay(true)
            setTitle("An error occured : the campaign status can't be updated. ")
          } else {
            setDisplay(true)
            setTitle("Technical error")
          }        
      })
  }




  return (
    <div className="container py-5 h-100">
      <Title firstname={firstname} lastname={lastname} details={manager} titleH1={titleH1} displayUser={true}/>
      <Error display={display} title={title}/>      
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
