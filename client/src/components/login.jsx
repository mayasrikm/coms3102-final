import {GoogleLogin} from 'react-google-login'
import React, { useState, useEffect } from "react";

const clientId = "752171999016-qurm0nv9i33v0v7i7h9pef6bvkeeorh1.apps.googleusercontent.com"

function Login({ onLoginStatusChange }){
    const [isLoggedin, setIsLoggedin] = useState(false);
    const onSuccess = (res)=>{
        console.log("Login success, user: ", res.profileObj);
        onLoginStatusChange(true);
    }
    const onFailure = (res) => {
        console.log("Login failed, res: ", res);
    }

    return(
        <div id="signInButton">
            <GoogleLogin
                clientId = {clientId}
                buttonText = "Login"
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={'single_host_origin'}
                isSignedIn={true}></GoogleLogin>
        </div>
    )
}

export default Login; 