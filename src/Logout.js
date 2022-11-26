import { useEffect } from "react";
import axios from 'axios';
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { AUTH_TOKEN_KEY } from './App'
import Title from './components/Title.js'


function Logout(props) {
    let titleH1="LOGOUT"    
    let activitiesStyle = { marginTop: '30px' }
    let activitiesButtonStyle = { color: '#ffff', backgroundColor: '#609f9f' }
    let history = props.history
    useEffect(() => {
        sessionStorage.removeItem(AUTH_TOKEN_KEY)
    }, [])
    return (
        < div className="container py-5 h-100" >
            <Title titleH1={titleH1} 
            /> 
            
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