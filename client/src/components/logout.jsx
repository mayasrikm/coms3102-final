import {GoogleLogout} from 'react-google-login'
import React, { useState, useEffect } from "react";

const clientId = "752171999016-qurm0nv9i33v0v7i7h9pef6bvkeeorh1.apps.googleusercontent.com"

function Logout({ onLoginStatusChange }){
    const onSuccess = () => {
        console.log("Logged out.")
        onLoginStatusChange(false);
    }

    return (
        <div id = "signOutButton">
            <GoogleLogout
            clientId={clientId}
            buttonText={"Logout"}
            onLogoutSuccess={onSuccess}></GoogleLogout>
        </div>
    )
}
export default Logout;