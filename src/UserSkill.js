import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { AUTH_TOKEN_KEY } from './App'
import { ROLE_TEAMMEMBER } from './Login'
import { ROLE_TEAMLEADER } from './Login'
import { BsCheckCircleFill } from 'react-icons/bs';



function UserSkillRow(props) {
  let [userSkill, setUserSkill] = useState(props.userSkill)
  let actionState = props.actionState

  let expandedRows = props.expandedRows
  let userStatusCampaign = props.userStatusCampaign
  console.log("USERSKILL", userStatusCampaign)

  let inputMarkId = "userSkillMark" + userSkill.userSkillId
  let markValue = userSkill.mark
  const USERSKILL_STATUS_VALIDATED = "VALIDATED"
  const USERSKILL_STATUS_TO_BE_TRAINED = "TO_BE_TRAINED"
  const VALUE_STATUS_TO_BE_TRAINED = 2
  const VALUE_STATUS_VALIDATED = 4
  let selectedStatusId = "userSkillStatus" + userSkill.userSkillId
  let valueUserSkillStatus = userSkill.statusSkill

  let rowStyles = { fontSize: "0.75em", color: '#131f1f' };
  let buttonFilledStyle = { backgroundColor: "#eff5f5", fontSize: '1.2em', color: '#131f1f' }
  let actionStyle = { fontSize: "1em" }
  let rowFinishedStyle = { color: '#609f9f' }
  let buttonFilledToValidateStyle = { backgroundColor: "#fff" }


  function handleChangeStatus(event, userSkillId) {
    event.preventDefault();

    valueUserSkillStatus = document.getElementById(selectedStatusId).value
    console.log("selectedStatusId", valueUserSkillStatus)

    axios('/userskills/' + userSkillId + "/statusSkill", {
      method: 'patch',
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
            {(actionState === ROLE_TEAMMEMBER)
              ?
              (userStatusCampaign === 'INITIALIZED')
                ?
                (markValue !== -1 || ((markValue >= 0) && (markValue <= 2))
                  ? (
                    <input id={inputMarkId} className="form-control form-control-sm" style={buttonFilledStyle}
                      type="number" defaultValue={userSkill.mark} name="userskillmark"
                      min="0" max="2"
                    />
                  ) : (
                    <input id={inputMarkId} className="form-control form-control-sm border-danger "
                      type="number" defaultValue=" " name="userskillmark" style={rowStyles}
                      min="0" max="2" toggle="tooltip" data-placement="right"
                      title="0: low 1: intermediate 2: expert"
                    />
                  )
                )
                :
                (<input id={inputMarkId} className="form-control form-control-sm" style={buttonFilledStyle}
                  type="number" defaultValue={userSkill.mark} name="userskillmark"
                  min="0" max="2" disabled />
                )
              :
              (userStatusCampaign === 'VALIDATED')
                ?
                (<input id={inputMarkId} className="form-control form-control-sm" style={buttonFilledStyle}
                  type="number" defaultValue={userSkill.mark} name="userskillmark"
                  min="0" max="2" disabled />
                )
                :
                (userSkill.statusSkill === "MARKED"
                  ?
                  (
                    <input id={inputMarkId} className="form-control form-control-sm" style={buttonFilledToValidateStyle}
                      type="number" defaultValue={userSkill.mark} name="userskillmark"
                      min="0" max="2" toggle="tooltip" data-placement="right"
                      title="0: low 1: intermediate 2: expert"
                    />
                  )
                  : (
                    <input id={inputMarkId} className="form-control form-control-sm  "
                      type="number" defaultValue={userSkill.mark} name="userskillmark" style={buttonFilledStyle}
                      min="0" max="2"
                    />
                  )
                )
            }
          </form>
          
        </td>
        {(actionState === ROLE_TEAMLEADER)
          ?
          (userSkill.statusSkill !== "MARKED"
            ?
            <td className="col-1 text-center fw-bold" style={rowFinishedStyle}>
              {userSkill.statusSkill}<span>
                <BsCheckCircleFill className='ms-2 mb-2 pt-1' />
              </span>
            </td>
            :
            <td className="col-1 text-center fw-bold text-danger" style={rowStyles}>
              {userSkill.statusSkill}
            </td>
          )
          :
          (userSkill.statusSkill === "MARKED" || userStatusCampaign === "VALIDATED" || userStatusCampaign === "IN_PROGRESS")
            ?
            <td className="col-1 fw-bold text-center" style={rowFinishedStyle}>
              {userSkill.statusSkill}<span>
                <BsCheckCircleFill className='ms-2 mb-2 pt-1' />
              </span>
            </td>
            :
            <td className="col-1 text-center fw-bold" style={rowStyles}>
              {userSkill.statusSkill}
            </td>
        }
        <td className="col-1" style={rowStyles}>
          {(actionState === ROLE_TEAMLEADER)
            ?
            ((userStatusCampaign === 'SUBMITTED') || (userStatusCampaign === 'IN_PROGRESS')
              ?
              (userSkill.statusSkill === 'REVISED')
                ?
                (<form className="row "
                  onChange={event => handleChangeStatus(event, userSkill.userSkillId)}
                >
                  <select className="form-select form-control-sm p-0" name="updatedStatus" id={selectedStatusId} style={actionStyle}
                    toggle="tooltip" data-placement="right"
                    title="TO_BE_TRAINED: if a training is needed (even you revised the mark)
                    Nothing if no training needed"
                  >
                    <option selected>Select the action</option>
                    <option value={USERSKILL_STATUS_TO_BE_TRAINED}>{USERSKILL_STATUS_TO_BE_TRAINED}</option>
                    
                  </select>
                  <label className="" htmlFor='updatedStatus'></label>
                </form>
                )
                :
                (<form className="row "
                  onChange={event => handleChangeStatus(event, userSkill.userSkillId)}
                >
                  <select className="form-select form-control-sm p-0" name="updatedStatus" id={selectedStatusId} style={actionStyle}
                    toggle="tooltip" data-placement="right"
                    title="VALIDATED: if you don't want to change the mark
                    TO_BE_TRAINED: if a training is needed (even you revised the mark)"
                  >
                    <option selected>Select the action</option>
                    <option value={USERSKILL_STATUS_TO_BE_TRAINED}>{USERSKILL_STATUS_TO_BE_TRAINED}</option>
                    <option value={USERSKILL_STATUS_VALIDATED}>{USERSKILL_STATUS_VALIDATED}</option>
                  </select>
                </form>)
            :
            null
            )
          :
          null
          }
        </td>
        <td className="col-1" style={rowStyles}></td>
      </tr> : null
  );
}

export default UserSkillRow;
