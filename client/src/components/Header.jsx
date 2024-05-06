import React, { useState, useEffect } from "react";
import LoginButton from "./login";
import LogoutButton from "./logout";
import {gapi} from 'gapi-script';
import Login from "./login";
const clientId = "752171999016-qurm0nv9i33v0v7i7h9pef6bvkeeorh1.apps.googleusercontent.com"

function Header() {
  
  useEffect(()=>{
    function start(){
      gapi.client.init({
        clientId: clientId, scope:""      
      })
    };
    gapi.load('client:auth2', start);
  })
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const handleLoginStatus = (status) => {
        setIsLoggedIn(status);
    }
  return (
    <header>
      
      <h1 className="title">Keeper</h1>
      <div className="button-container">
                {isLoggedIn ? (
                    <LogoutButton onLoginStatusChange={handleLoginStatus} />
                ) : (
                    <LoginButton onLoginStatusChange={handleLoginStatus} />
                )}
            </div>
    </header>
  );
}

export default Header;
