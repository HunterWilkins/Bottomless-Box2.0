import React from "react";
import "./style.css";

function Pocket(props) {

    let style = {
        "background" : "url('/images/" + props.name + ".png') 0% / 100%"
    }

    if (props.func === "pocketbook") {
        style.width = "80px";
        style.height = "80px";
    }

    return (
        <div className = {`pocket ${+ props.isActive ? "active" : ""}`} style = {style} onClick = {() => { props.pocketMethod(props.func, props.name)} }>
            { props.subtitle ? 
                <p className = "subtitle">{props.subtitle}</p>
                :
                null
            }
        </div>
    );
}

export default Pocket;