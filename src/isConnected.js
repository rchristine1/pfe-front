import { useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';
import { useEffect } from 'react';

function isConnected(props)  {
    const history = useNavigate();
    let location = useLocation();
    let userInfo=props.userInfo
    let setUserInfo=props.setUserInfo
    
    useEffect(() => {
      //setUserInfo(null) 
      axios('/isConnected', {
        method: 'GET'
      })
        .then(response => {
          setUserInfo(response.data);
        }, () => {          
          if (location.pathname !== '/login') {
            history("../../login")
          }    
        })
    }, [history, setUserInfo, location.pathname]);


    return (<>
      <div>
        <p>{userInfo}</p>
      </div>
    </>)
  }

  export default isConnected;