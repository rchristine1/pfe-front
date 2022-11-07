import './App.css';
import { Route } from 'react-router'
import { Routes, Link } from 'react-router-dom'

import Login from './Login';

import UserSkillTable from './UserSkills';
import Header from './Header';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
export const AUTH_TOKEN_KEY = 'jhi-authenticationToken';

function App() {
  const [userInfo, setUserInfo] = useState('');
  const [loading, setLoading] = useState(false)
  let styleTitle = { color: '#609f9f', fontSize: '1.75em' }


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
          <Route path="/userskills/:id" element={<UserSkillTable />} />
          <Route path="*" element={<Login setUserInfo={setUserInfo} />} />
        </Routes>
      </div>
    </div>
  )
}


export default App;
