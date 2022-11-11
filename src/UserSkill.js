import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { AUTH_TOKEN_KEY } from './App'


function UserSkillRow(props) {
  let [userSkill, setUserSkill] = useState(props.userSkill)
  
  let expandedRows = props.expandedRows

  let inputMarkId = "userSkillMark" + userSkill.userSkillId
  let markValue = userSkill.mark
  const USERSKILL_STATUS_VALIDATED = "VALIDATED"
  const USERSKILL_STATUS_TO_BE_TRAINED = "TO_BE_TRAINED"
  const VALUE_STATUS_TO_BE_TRAINED = 2
  const VALUE_STATUS_VALIDATED = 4
  let selectedStatusId = "userSkillStatus" + userSkill.userSkillId
  let valueUserSkillStatus = userSkill.statusSkill

  let rowStyles = { fontSize: "0.75em",color:'#131f1f' };
  let buttonFilledStyle = { backgroundColor: "#eff5f5",fontSize:'1.2em',color:'#131f1f' }
  let actionStyle = {fontSize : "1em"}
  

  console.log("inputMarkId", inputMarkId)
  console.log("selectedStatusId", selectedStatusId)

  function handleChangeStatus(event, userSkillId) {
    event.preventDefault();

    valueUserSkillStatus = document.getElementById(selectedStatusId).value
    console.log("selectedStatusId", valueUserSkillStatus)
    let token = (JSON.parse(sessionStorage.getItem(AUTH_TOKEN_KEY))).access
    axios('/userskills/' + userSkillId + "/statusSkill", {
      method: 'patch',
      headers: {
        "Authorization": "Bearer " + token
      },
      data: { statusSkill: valueUserSkillStatus }
    }
    )
      .then((response) => {
        setUserSkill(response.data);
        console.log("skill updated")
      }, (error) => {
        if (error.response.status === 400) {
          console.log("Bad request")
          alert("skill not updated. ")
        }
      })
  }

  function handleChange(event, userSkillId) {
    event.preventDefault();

    markValue = document.getElementById(inputMarkId).value

    axios('/userskills/' + userSkillId + "/mark", {
      method: 'patch',
      headers: {
        "Authorization": "Bearer " + sessionStorage.getItem('jhi-authenticationToken')
      },
      data: { mark: markValue }
    }
    )
      .then((response) => {
        setUserSkill(response.data);
        console.log("skill updated")
      }, (error) => {
        if (error.response.status === 400) {
          console.log("Bad request")
          alert("skill not updated. Mark should be 0,1 or 2")
        }
      })
  }
  
  return (
    expandedRows.includes(userSkill.labelDomain) ?
      <tr key={userSkill.userSkillId} style={rowStyles}>
        <td hidden>{userSkill.labelDomain}</td>
        <td className="col-1" style={rowStyles}>{userSkill.userSkillId}</td>
        <td className="col-2" style={rowStyles}>{userSkill.label}</td>
        <td className="col-1" style={rowStyles}>
          <form className="row text-center"
            onChange={event => handleChange(event, userSkill.userSkillId)}
          >
            <label className="" htmlFor='userskillmark'></label>
            {markValue !== -1 || ((markValue >= 0) && (markValue <= 2))
              ? (
                <input id={inputMarkId} className="form-control form-control-sm" style={buttonFilledStyle}
                  type="number" defaultValue={userSkill.mark} name="userskillmark" 
                  min="0" max="2"
                />
              ) : (
                <input id={inputMarkId} className="form-control form-control-sm border-danger "
                  type="number" defaultValue=" " name="userskillmark" style={rowStyles}
                  min="0" max="2"
                />
              )}
          </form></td>
        <td className="col-1 text-center" style={rowStyles}>{userSkill.statusSkill}
        </td>
        <td className="col-1" style={rowStyles}>
          <form className="row "
            onChange={event => handleChangeStatus(event, userSkill.userSkillId)}
          >
            <select className="form-select form-control-sm p-0" name="updatedStatus" id={selectedStatusId} style={actionStyle}>
              <option selected>{userSkill.statusSkill}</option>
              <option value={USERSKILL_STATUS_TO_BE_TRAINED}>{USERSKILL_STATUS_TO_BE_TRAINED}</option>
              <option value={USERSKILL_STATUS_VALIDATED}>{USERSKILL_STATUS_VALIDATED}</option>
            </select>
            <label className="" htmlFor='updatedStatus'></label>

          </form>
        </td>
        <td className="col-1" style={rowStyles}></td>
      </tr> : null
  );
}

export default UserSkillRow;
