import React from "react";
import "./style.css";

import Pocket from "../Pocket";

function Modal(props) {

    let style = {
        display: props.modal ? "block" : "none"
    }

    let shoppingButton = props.shoppingItem ? {border: "red solid 2px", borderRadius: "50px", "background" : "var(--background)"} : {opacity: ".5"}

    let modalTitle;

    let allPockets = [
        "Fruit",
        "Vegetables",
        "Food",
        "Drinks",
        "Junk Food",
        "Pet Supplies",
        "Medicine",
        "Misc"
    ]

    if (props.modal === false) {
        if (document.getElementById("modal-content")){
            document.getElementById("modal-content").reset();
        }
    }

    if (props.modalType === "tax") {
        modalTitle = "Assign Sales Tax"
    }

    else if (props.id === null) {
        modalTitle = "Create New Item"
    }

    else if (props.id !== null) {
        modalTitle = "Edit Item"
    }

    return(
        <div className = "blackground" style = {style}>


        <div style = {style} id = "modal" className = "centered-XY" >

            { props.modalType === "pocketbook" ? <h3 className = "title">Create New Pocket</h3> :
                <h3 className = "title">{modalTitle}</h3>
            }

            {
                props.modalType !== "pocketbook" ?
            
                <form id = "modal-content">
                    { props.modalType === "tax" ? 
                        <input onChange = {props.handleInputChange} type = "number" name = "tax" placeholder = {props.tax ? `${parseFloat(props.tax).toFixed(2)}%` : "Sales Tax (%)"}></input>
                    :
                    <div>
                    <input onBlur = {props.handleInputChange} type = "text" name = "name" placeholder = {props.name ? props.name : "Name"}></input>
                    <br/>
                    <input onBlur = {props.handleInputChange} type = "number" name = "value" placeholder = {props.value ? props.value : "Value ($)"}></input>
                    <br/>
                    {props.id !== null ? 
                    <div id = "qty-editors" >
                        <input   onBlur = {props.handleInputChange} type = "number" name = "quantity" placeholder = {props.quantity !== null ? props.quantity : "Quantity"}></input>
                        
                        <div className = "div-button" id = "addition" onClick = {() => {props.quantityEdit("add")}}>
                            <p className = "centered-XY">+</p>
                        </div>
                        
                        <div className = "div-button" id = "subtraction" onClick = {() => {props.quantityEdit("sub")}}>
                            <p className = "centered-XY">-</p>
                        </div>
                    </div>
                    :
                    <input   onBlur = {props.handleInputChange} type = "number" name = "quantity" placeholder = {props.quantity !== null ? props.quantity : "Quantity"}></input>

                    }
                    </div>
                    }
                </form>
            
                :

                <div id = "pocketbook">
                    {
                        allPockets.map(item => {
                            return (
                            
                            <Pocket 
                                name = {item}
                                subtitle = {item}
                                func = {"pocketbook"}
                                pocketMethod = {props.pocketMethod}
                            />
                            
                            );
                        })
                    }
                </div>
            }

            <div className = "div-button"  id = "close-modal" onClick = {() => {props.toggleModal()}}>
                <p className = "centered-XY">x</p>
            </div>

            <div className = "div-button" id = "submit" onClick = {() => {props.id === null ? props.createItem() : props.updateItem()}}>
                <p className = "centered-XY">Submit</p>
            </div>

            {(props.modalType !== "tax" && props.id !== null) ?
            
            <div className = "div-button"  id = "trash" onClick = {() => {props.deleteItem()}}>
                <p className = "centered-XY"><span role = "img" aria-label = "trash">🗑️️️️️️</span></p>
            </div>
            
            : ""
            }
            
            {props.modalType !== "tax" && props.modalType !== "pocketbook" ?
            <div className = "div-button" id = "shopping-cart-button" style = {shoppingButton} onClick = {() => {props.setShoppingItem()}}>
                <p className = "centered-XY"><span role = "img" aria-label = "shopping cart">🛒</span></p>
            </div>
            :
            ""
            }

        </div>

        </div>
    )
}

export default Modal;