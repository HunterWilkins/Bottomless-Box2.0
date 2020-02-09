import React from "react";
import "./style.css";

function Navbar(props) {

    let accountStyle = {
        display: props.accountDisplay ? "block" : "none"
    }

    return(
        <nav>
            <p className = "centered-Y">The Bottomless Box</p>
            <div className = "centered-Y" id = "account">
                <button id = "account-button" onClick = {() => {props.toggleAccountDisplay()}}>
                    Account
                </button>
                <div id = "account-info" style = {accountStyle}>
                    <input type = "text" placeholder = "Username"></input>
                    <input type = "password" placeholder = "Password"></input>
                    <button>Login</button>
                    <button>Sign Up</button>
                </div>                
            </div>
            
        </nav>
    )
}

export default Navbar;
