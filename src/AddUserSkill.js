import React, { Component } from 'react'
//import SimpleModal from './SimpleModal';
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import { AUTH_TOKEN_KEY } from './App'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import './Login.css';


const required = value => {
  if (!value) {
    return (
      <div className='alert alert-danger' role="alert">
        Thie field is required
      </div>
    )
  }
}

class Login extends React.Component {
  constructor() {
    super();
    this.state = { userData: {}, showModal: false }
    this.handleChange = this.handleChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.handleCloseModal = this.handleCloseModal.bind(this)
  }

  handleChange(event) {
    let currentState = { ...this.state.userData };
    currentState[event.target.name] = event.target.value;
    this.setState({ userData: currentState })
  }

  onSubmit(event) {
    event.preventDefault();
    axios.post('/authenticate', {
      email: this.state.userData.email,
      password: this.state.userData.password
    }).then((response) => {
      const bearerToken = response?.headers?.authorization;
      if (bearerToken && bearerToken.slice(0, 7) === 'Bearer ') {
        const jwt = bearerToken.slice(7, bearerToken.length);
        sessionStorage.setItem(AUTH_TOKEN_KEY, jwt)
      }
      this.props.setUserInfo(response.data.userName)
      this.props.history('/boardUser')
    }).catch(() => {
      this.setState({ showModal: true })
    })
  }

  handleCloseModal() {
    this.setState({ showModal: false })
  }

  render() {
    const title = "Login incorrect"
    const bodyTxt = "Login ou mot de passe incorrect"
    return (
      <>

          <div className="container py-5 h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col col-xl-10">
                <div className="card" >
                  <div className="row g-0 ">
                    <div className="col-md-6 col-lg-5 d-none d-md-block">
                      <img
                        className="card-img-left img-fluid rounded-t-4 h-100"
                        src="/people-hands.jpg"
                        alt="team.img"
                        
                      />
                    </div>
                    <div className="col-md-6 col-lg-7 d-flex align-items-center">
                      <div className="card-body p-4 p-lg-5 text-black">
                      <div className="d-flex align-items-center mb-3 pb-1">
                            <img src="/MTUP.png" alt="MTUP" width="30" height="30" />
                            <span className="h3 fw-bold mb-0">MYTEAMUPSKILL</span>
                          </div>
                          <h6 className="fw-normal mb-2 pb-1" >Sign into your account</h6>
                          <form onSubmit={this.onSubmit}>
                          <div className="form-outline mb-1">
                            <input className="form-control form-control-sm" type="text" id="formBasicLogin" placeholder="Login"/>
                            <label className="form-label" for="formBasicLogin"></label>
                          </div>
                          <div className="form-outline mb-1">
                            <input className="form-control form-control-sm" type="password" id="formBasicPassword" placeholder="Password" />
                            <label className="form-label" for="formBasicPassword"></label>
                          </div>
                          <div className="pt-0 mb-2">
                            <button
                              className="btn btn-dark btn-sm btn-block w-100"
                              type="submit">
                              Sign in</button>
                          </div>
                          </form>
                          <a className="small text-muted" href="!#">Forgot password?</a>                        
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          </>
    )
  }
}

// Wrap and export
export default function Wrapper(props) {
  const history = useNavigate();
  return <Login {...props} history={history} />;
}