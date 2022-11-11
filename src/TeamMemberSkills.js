import './App.css';
import React, { useEffect } from 'react';
import { Link } from "react-router-dom";
import { BsFilePerson } from 'react-icons/bs';


let cardTitleStyle = { color: '#609f9f' }
function TeamMemberSkills(props) {
    console.log(props.id)

    return (
        <div className="card shadow m-2 Hover">
            <div className="row g-0" id={props.id}>
                <div className="col-1">                    
                    <img
                        src={props.picture} className="p-2"width="60" height="60"
                    />               
                </div>
                <div className="card-body col-4 " >
                    <div>
                        <Link to={`/userskills/${props.id}`} className="text-decoration-none" >
                            <h6 className="card-title text-end" style={cardTitleStyle}>
                                {props.firstname} 
                            </h6> 
                            <h6 className="card-subtitle text-end" style={cardTitleStyle}>
                                {props.lastname.toUpperCase()}
                            </h6>                          
                            <p className="card-text">
                            </p>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TeamMemberSkills;
