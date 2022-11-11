import './App.css';
import { Route } from 'react-router'
import { Routes, Link } from 'react-router-dom'

import Login from './Login';
import UserSkillTable from './UserSkills';
import WelcomeTeamLeader from './WelcomeTeamLeader';
import WelcomeTeamMember from './WelcomeTeamMember';
import SkillsToValidate from './SkillsToValidate';
import Header from './Header';
import { Error } from './Error';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import UserConnected from './UserConnected';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
export const AUTH_TOKEN_KEY = 'mtup-authenticationToken';

function App() {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(false)
  const history = useNavigate();
  let styleTitle = { color: '#609f9f', fontSize: '1.75em', letterSpacing: '6px' }
  let pictureStyle = { marginBottom: '5px' }

  const UserConnected = ({ setUserInfo, userInfo }) => {
    const history = useNavigate();
    let location = useLocation();
    //let authToken = sessionStorage.getItem('jhi-authenticationToken')
    //console.log("USERCONNECTED TOKEN",authToken)
    //let authId = sessionStorage.getItem('id')
    //console.log("USERCONNECTED ID",authId)

    useEffect(() => {
      setUserInfo(null)
      let token = null;
      if (sessionStorage.getItem(AUTH_TOKEN_KEY) != null) {
        console.log("IsConnected", sessionStorage)
        token = (JSON.parse(sessionStorage.getItem(AUTH_TOKEN_KEY))).access
        console.log(token)
      }

      axios('/isConnected', {
        method: 'GET',
        headers: { "Authorization": "Bearer " + token }
      })
        .then(response => {
          setUserInfo(response.data);
          console.log("App UserConnected");

        }, () => {
          if (location.pathname !== '/login') {
            history("/login")
          }
        })
    }, [history, setUserInfo, location.pathname]);


    return (<>
    </>)
  }
  /*useEffect(() => {

    axios.interceptors.request.use(function (request) {
      const token = sessionStorage.getItem(AUTH_TOKEN_KEY)
      if (token) {
        request.headers.Authorization = `Bearer ${token}`;
      }
      setLoading(true)
      return request
    }, (error) => {
      if (error.response.status == 403) {
        console.log("Erreur 403")
         
      }
      setLoading(false)
      return Promise.reject(error);
    });

    axios.interceptors.response.use(function (response) {
      setLoading(false)
      return response;
    }, (error) => {
      setLoading(false)
      return Promise.reject(error);
    });
  })*/

  return (
    <div>

      <header className="bg-dark my-6" >
        <div className="container">
          <div className="row">
            <div className="col-md-4 text-center"></div>
            <div className="col-md-4">
              <a href="/login" className="navbar-brand " style={styleTitle} >
                MY TEAM
                <span className="px-6 me-0 ms-2 mt-2">
                  <img className="rounded-circle" src="/MTUP.png" alt="MTUP" width="20.75em" height="20.75em" style={pictureStyle} />
                </span> UPSKILL
              </a>
            </div>
            <div className="col-md-4"></div>
          </div>
        </div>
      </header>
      <div className="container">
        <nav className="navbar navbar-expand ">
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/userskills/:id"} className="nav-link">
                Skills
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Add
              </Link>
            </li>
          </div>
        </nav>
      </div>
      <div className="App">
        <Routes>
          <Route path="/userskills/:id" element={<UserSkillTable history={history} userInfo={userInfo} />} />
          <Route path="/login" element={<Login setUserInfo={setUserInfo} />} />
          <Route path="/welcometeamleader" element={<WelcomeTeamLeader userInfo={userInfo} history={history} />} />
          <Route path="/welcometeammember" element={<WelcomeTeamMember userInfo={userInfo} history={history} />} />
          <Route path="/skillstovalidate" element={<SkillsToValidate userInfo={userInfo} />} />
          <Route path="/error" element={<Error />} />
          <Route path="*" element={<Login setUserInfo={setUserInfo} userInfo={userInfo} />} />

        </Routes>
      </div>
    </div>
  )
}


export default App;
