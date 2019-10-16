import React from "react";
import "./style.css";
import Pocket from "../Pocket";

function Dashboard(props) {

    return (
        <div id = "dashboard">

            <div className = "pocket" onClick = {() => {props.toggleModal(null, "pocketbook")}}>
                <p className = "centered-XY">+</p>
            </div> 

            <Pocket 
                name = "All"
                func = "switch"
                isActive = {props.pocket === "All"}
                pocketMethod = {props.pocketMethod}
            />

            { props.pockets.map(item => {
                return(
                    <Pocket
                        name = {item}
                        func = "switch"
                        
                        isActive = {props.pocket === item}
                        pocketMethod = {props.pocketMethod}
                    />
                )
                })
            }
        </div>
    );
}

export default Dashboard;