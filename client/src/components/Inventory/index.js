import React from "react";
import "./style.css";
import {Link} from "react-router-dom";

function Inventory(props) {

    let filteredInv;
    let pocketTotal = 0;
    let taxableTotal = 0;
    let untaxables = 0;
    
    let shoppingButton = props.shoppingMode ? {border: "red solid 2px", "border-radius": "50px", "background" : "var(--background)"} : {}

    filteredInv = props.inventory.filter(item => filterInventory(item));

    //props.pocket === "All" || null ? props.inventory : filteredInv = props.inventory.filter(item => item.type === props.pocket);

    console.log(filteredInv);

    filteredInv.forEach(item => {
        let itemTotal = parseFloat(item.value) * parseFloat(item.quantity);

        console.log(item.type);

        if (item.type === "Misc" || item.type === "Pet Supplies" || item.type === "Medicine") {
            taxableTotal += itemTotal;
        }
        else {
            untaxables += itemTotal;
        }

        console.log(taxableTotal);
        console.log(untaxables);

        pocketTotal += itemTotal;
    });

    let taxedTotal = (( 1 + (props.tax / 100)) * taxableTotal) + untaxables;

    function filterInventory(item) {
        if (props.pocket === "All" && item.shoppingItem === props.shoppingMode) {
            return item
        }

        if (props.pocket === item.type && item.shoppingItem === props.shoppingMode) {
            return item
        }
    }

    return(
        <div id = "inventory">

            <div id = "item-box">
                <h2>{props.pockets.indexOf(props.pocket) === -1 ? "All" : props.pocket}</h2>
                <p id = "pocket-total" onClick = {() => {props.toggleModal(null, "tax")}}><span className = "half-opacity">$ </span>{ props.tax ? `${pocketTotal.toFixed(2)} → ${taxedTotal.toFixed(2)}` : pocketTotal.toFixed(2)}</p>
                <div className = "item half-opacity">
                    <em>
                        <p className = "name">Name</p>
                        <p className = "value">$</p>
                        <p className = "quantity">#</p>
                        <p className = "item-total">Total</p>
                    </em>
                </div>

                <div id = "items-list">

                { 
                    filteredInv.map(item => {
                        return(
                            <div className = "item" onClick = {() => {props.toggleModal(item, "edit")}}>
                                <p className = "name">{item.name}</p>
                                <p className = "value"><span className = "half-opacity">$ </span>{parseFloat(item.value).toFixed(2)}</p>
                                <p className = "quantity">{parseFloat(item.quantity)}</p>
                                <p className = "item-total"><span className = "half-opacity">$ </span>{(parseFloat(item.quantity).toFixed(2) * parseFloat(item.value)).toFixed(2)}</p>
                            </div>
                        );
                    })
                }
                
                </div>

            </div>
            
            <div id = "invbuttons">
                <div style = {props.pocket !== "All" ? {} : {"display" : "none"}} className = "div-button" onClick = {() => {props.toggleModal(null, "new")}}>
                    <p className = "centered-XY">+</p>
                </div>

                <Link className = "div-button" to = "/info">
                    <p className = "centered-XY">?</p>
                </Link>

                <div className = "div-button" onClick = {() => {props.deleteItem("pocket")}}>
                    <p className = "centered-XY"><span role = "img" aria-label = "trash">🗑️</span></p>
                </div>

                <div className = "div-button" style = {shoppingButton} onClick = {() => {props.toggleShoppingMode()}}>
                    <p className = "centered-XY"><span role = "img" aria-label = "shopping cart">🛒</span></p>
                </div>

            </div>

        </div>
    )
}

export default Inventory;