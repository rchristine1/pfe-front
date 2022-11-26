import './App.css';
import { Route } from 'react-router'
import { Routes, Link } from 'react-router-dom'

import Login from './Login';
import UserSkillTable from './UserSkills';
import WelcomeTeamLeader from './WelcomeTeamLeader';
import WelcomeTeamMember from './WelcomeTeamMember';
import SkillsToValidate from './SkillsToValidate';
import SkillsCampaignToCreate from './SkillsCampaignToCreate';
import Header from './components/Header';
import Logout from './Logout';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Contact from './Contact';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import UserConnected from './UserConnected';
import axios from 'axios';
//<script type="module" src="./lib/axios.js"></script>
import "bootstrap/dist/css/bootstrap.min.css";
export const AUTH_TOKEN_KEY = 'mtup-authenticationToken';

function App() {
  let [userFirstName, setUserFirstName] = useState(null);
  let [userLastName, setUserLastName] = useState(null);
  let [userId, setUserId] = useState(null);
  let [userRoles, setUserRoles] = useState(null);
  let [manager, setManager] = useState(null);
  let [team, setTeam] = useState(null);
  let [userStatusCampaign, setUserStatusCampaign] = useState(null)
  let [currentCampaign, setCurrentCampaign] = useState('')
  let [statusVolunteer, setStatusVolunteer] = useState('')
  let [loading, setLoading] = useState(false)
  let [showModal, setShowModal] = useState(false)
  let history = useNavigate();
  let location = useLocation();

  /*12-11 boucle et je ne sais pas pourquoi const UserConnected = ({ setUserInfo, userInfo }) => {
    const history = useNavigate();
    let location = useLocation();
    //let authToken = sessionStorage.getItem('jhi-authenticationToken')
    //console.log("USERCONNECTED TOKEN",authToken)
    //let authId = sessionStorage.getItem('id')
    //console.log("USERCONNECTED ID",authId)

    useEffect(() => {
      setUserInfo(null)
      /*12-11let token = null;
      if (sessionStorage.getItem(AUTH_TOKEN_KEY) != null) {
        console.log("IsConnected", sessionStorage)
        token = (JSON.parse(sessionStorage.getItem(AUTH_TOKEN_KEY))).access
        console.log(token)
      }

      axios('/isConnected', {
        method: 'GET',
        //12-11headers: { "Authorization": "Bearer " + token }
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
  }*/
  //12-11
  useEffect(() => {
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
  })


  return (
    <div>
      <Header userFirstName={userFirstName} userLastName={userLastName} userRoles={userRoles} />
      <div className="container">
        {userFirstName === null ? null :
          <Navbar userRoles={userRoles} userId={userId} history={history} />}
      </div>
      <div className="App">
        <Routes>
          <Route path="/userskills/:id" element={<UserSkillTable
            userRoles={userRoles}
            history={history}
            manager={manager}
            setManager={setManager}
            userStatusCampaign={userStatusCampaign}
            setUserStatusCampaign={setUserStatusCampaign}
            currentCampaign={currentCampaign}
          />} />
          <Route path="/login" element={<Login
            setUserFirstName={setUserFirstName}
            setUserLastName={setUserLastName}
            setUserId={setUserId}
            setUserRoles={setUserRoles}
            userFirstName={userFirstName}
            userLastName={userLastName}
            userId={userId}
            userRoles={userRoles}
          />
          } />
          <Route path="/welcometeamleader" element={<WelcomeTeamLeader
            userFirstName={userFirstName}
            userLastName={userLastName}
            userId={userId}
            team={team}
            currentCampaign={currentCampaign}
            setCurrentCampaign={setCurrentCampaign}
            setTeam={setTeam}
            history={history}
          />}
          />
          <Route path="/welcometeammember" element={<WelcomeTeamMember
            userFirstName={userFirstName}
            userLastName={userLastName}
            userId={userId}
            manager={manager}
            setManager={setManager}
            currentCampaign={currentCampaign}
            setCurrentCampaign={setCurrentCampaign}
            userStatusCampaign={userStatusCampaign}
            setUserStatusCampaign={setUserStatusCampaign}
            statusVolunteer={statusVolunteer}
            setStatusVolunteer={setStatusVolunteer}
            history={history} />} />
          <Route path="/skillstovalidate/:id" element={<SkillsToValidate
            userFirstName={userFirstName}
            userLastName={userLastName}
            team={team}
            currentCampaign={currentCampaign}
          />}
          />
          <Route path="/userskills/campaign/:campaignId" element={<SkillsCampaignToCreate
            userFirstName={userFirstName}
            userLastName={userLastName}
            manager={manager}
            currentCampaign={currentCampaign}
            userStatusCampaign={userStatusCampaign}
            setUserStatusCampaign={setUserStatusCampaign}
            userId={userId}
            history={history}
          />} />
          <Route path="/logout" element={<Logout history={history} />} />
          <Route path="*" element={<Login
            setUserFirstName={setUserFirstName}
            setUserLastName={setUserLastName}
            setUserId={setUserId}
            setUserRoles={setUserRoles}
            userFirstName={userFirstName}
            userLastName={userLastName}
            userId={userId}
            userRoles={userRoles}
          />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
      <Footer />
    </div>
  )
}


export default App;
