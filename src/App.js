import './App.css';
import { Route } from 'react-router'
import { Routes, Link } from 'react-router-dom'

import Login from './Login';

import UserSkillTable from './UserSkills';
import Header from './Header';
import { Error } from './Error';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import UserConnected from './UserConnected';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
export const AUTH_TOKEN_KEY = 'jhi-authenticationToken';

function App() {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(false)
  const history = useNavigate();
  let styleTitle = { color: '#609f9f', fontSize: '1.75em' }

  /*const UserConnected = ({ setUserInfo, userInfo }) => {
    const history = useNavigate();
    let location = useLocation();
    //let authToken = sessionStorage.getItem('jhi-authenticationToken')
    //console.log("USERCONNECTED TOKEN",authToken)
    //let authId = sessionStorage.getItem('id')
    //console.log("USERCONNECTED ID",authId)

    useEffect(() => {
      setUserInfo(null)
      axios('/isConnected', {
        method: 'GET'
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
      <div>
        <p>{userInfo}</p>
      </div>
    </>)
  }*/
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

      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <span className="px-6 me-2 ms-4">
          <img src="/MTUP.png" alt="MTUP" width="30.75em" height="30.75em" />
        </span>
        <a href="/userskills/:id" className="navbar-brand" style={styleTitle} >
          MYTEAMUPSKILL
        </a>
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
      <div className="App">
        <Routes>
          <Route path="/userskills/:id" element={<UserSkillTable  history={history}/>} />
          <Route path="/login" element={<Login setUserInfo={setUserInfo} />} />
          <Route path="/error" element={<Error />} />
          <Route path="*" element={<Login setUserInfo={setUserInfo} />} />

        </Routes>
      </div>
    </div>
  )
}


export default App;
