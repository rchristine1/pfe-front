import { BsFillPersonFill } from 'react-icons/bs';
import { Link } from "react-router-dom";
import { ROLE_TEAMMEMBER } from '../Login'
import { ROLE_TEAMLEADER } from '../Login'
import {AUTH_TOKEN_KEY} from '../App'

export default function Header(props) {
    let firstname = props.userFirstName
    if (firstname != null) {
        props.userFirstName.toUpperCase()
    }
    let lastname = props.userLastName
    let role = props.userRoles
    let styleTitle = { color: '#609f9f', fontSize: '1.75em', letterSpacing: '6px' }
    let pictureStyle = { marginBottom: '5px', top: '150px', left: '250px', zIndex: '5' }
    let userStyle = { color: '#609f9f', fontSize: '1.2em', marginTop: '10px' }
    let iconStyle = { marginTop: '4px', marginLeft: '7px' }
    let headerStyle = { color: '#609f9f' }

    console.log(sessionStorage.getItem(AUTH_TOKEN_KEY))

    return <div>
        <header className="bg-dark my-6" >
            <div className="container">
                <div className="row">
                    <div className="col-md-4 d-flex text-center text-justify" style={userStyle}>
                        <BsFillPersonFill className="mt-6" style={iconStyle} />
                        <span className="ms-2 fw-bold" data-testid="fullname">{firstname} {lastname}</span>
                        <span className="ms-4 border-5 fw-light" data-testid="rolename">{role}</span>
                        <hr style={headerStyle} />
                    </div>
                    <div className="col-md-4">
                        <a href="#" className="navbar-brand " style={styleTitle} data-testid="applicationName">
                            MY TEAM
                            <span className="px-6 me-0 ms-2 mt-2">
                                <img className="rounded-circle picture-style"
                                    src="/MTUP.png" alt="MTUP"
                                    width="20.75em" height="20.75em"
                                    style={pictureStyle}
                                />
                            </span> UP SKILL
                        </a>
                    </div>
                    {sessionStorage.getItem(AUTH_TOKEN_KEY) === null
                        ?
                        <div className="col-md-4 text-end" style={userStyle}>
                            <a href="/login" className="navbar-brand fw-bold">
                                <span>Login</span>
                            </a>
                        </div>
                        :
                        <div className="col-md-4 text-end" style={userStyle}>
                            <a href="/logout" className="navbar-brand fw-bold">
                                <span>Logout</span>
                            </a>
                        </div>
                    }
                </div>
            </div>
        </header>
    </div>
}