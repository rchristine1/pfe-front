import { useEffect } from "react";
import axios from 'axios';
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { AUTH_TOKEN_KEY } from './App'


function Logout(props) {
    let rowTitleStyle = { backgroundColor: '#eff5f5' }
    let titleH1Style = { color: '#131f1f', letterSpacing: '5px', fontSize: '1.75em' }
    let activitiesStyle = { marginTop: '30px' }
    let activitiesButtonStyle = { color: '#ffff', backgroundColor: '#609f9f' }
    let history = props.history
    useEffect(() => {
        sessionStorage.removeItem(AUTH_TOKEN_KEY)
    }, [])
    return (
        < div className="container py-5 h-100" >
            <div className="container pt-4" style={rowTitleStyle}>
                <div className="row align-items-center justify-content-start pb-4" >
                <div className='col-1'></div>
                    <div className='col-9'>
                        <h1 style={titleH1Style}>LOGOUT</h1>
                    </div>
                    <div className='col-1'></div>
                </div>
            </div>
            <div className="col-md-8 offset-md-2" style={activitiesStyle}>
                <div className="container">
                    <div className="row pb-3 ">
                        <div className="col-md-8 pb-3 offset-md-2">
                            <div className="card shadow">
                                <div className="card-body">
                                    <h5 className="card-title text-center">Good bye</h5>
                                    <div className="card-text text-center">
                                        <Link to="/login" onClick={event => {
                                            history(`/login`);
                                        }} style={activitiesButtonStyle}>
                                            <u>To sign in, click here</u>
                                        </Link>
                                    </div>
                                </div  >
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )


}

export default Logout;