import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';




function UserSkillRow(props) {
  let userSkill = props.userSkill;
  let setUserSkill = props.setUserSkill;
  let expandedRows = props.expandedRows
  let rowStyles = { fontSize: "0.75em" };
  let buttonFilledStyle = { backgroundColor: "#dfecec" }
  let inputMarkId = "userSkillMark" + userSkill.userSkillId


  function handleChange(event, userSkillId) {
    event.preventDefault();

    let markValue = document.getElementById(inputMarkId).value
    axios('/userskills/' + userSkillId + "/mark", {
      method: 'patch',
      headers: {
        "Authorization": "Bearer " + sessionStorage.getItem('jhi-authenticationToken')
      },
      data: { mark: markValue }

    }
    )
      .then((response) => {
        setUserSkill(response.data)
      })
  }

  return (
    expandedRows.includes(userSkill.labelDomain) ?
      <tr key={userSkill.userSkillId} >
        <td hidden>{userSkill.labelDomain}</td>
        <td style={rowStyles}>{userSkill.userSkillId}</td>
        <td style={rowStyles}>{userSkill.label}</td>
        <td style={rowStyles}>
          <form className="row flex-row"
            onChange={event => handleChange(event, userSkill.userSkillId)}
          >
            <label className="" htmlFor='userskillmark'></label>
            {userSkill.mark !== -1 ? (
              <input id={inputMarkId} className="form-control form-control-sm" style={buttonFilledStyle}
                type="number" defaultValue={userSkill.mark} name="userskillmark"
                min="0" max="2"
              />
            ) : (
              <input id={inputMarkId} className="form-control form-control-sm border-danger"
                type="number" defaultValue="" name="userskillmark"
                min="0" max="2"
              />
            )}
          </form></td>
        <td style={rowStyles}>{userSkill.status}
        </td>


      </tr> : null
  );
}

export default UserSkillRow;
