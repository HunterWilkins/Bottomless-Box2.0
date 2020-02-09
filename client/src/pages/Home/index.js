import React, {Component} from "react";
import Navbar from "../../components/Navbar";
import Dashboard from "../../components/Dashboard";
import Inventory from "../../components/Inventory";
import Modal from "../../components/Modal";

import "./style.css";

class Home extends Component {
    state = {
        pocket: "All",

        pockets: localStorage.getItem("pockets") ? JSON.parse(localStorage.getItem("pockets")) : [],

        name: null,
        value: null,
        quantity: null,
        id: null,
        shoppingItem: false,

        inventory: localStorage.getItem("inventory") ? JSON.parse(localStorage.getItem("inventory")) : [],

        modal: false,
        modalType: null,

        shoppingMode: false,
        tax: localStorage.getItem("tax") ? JSON.parse(localStorage.getItem("tax")) : null,

        accountDisplay: false
    }

    localItems = localStorage.getItem("inventory") ? JSON.parse(localStorage.getItem("inventory")) : [];
    localPockets = localStorage.getItem("pockets") ? JSON.parse(localStorage.getItem("pockets")) : [];

    updateStorage = () => {
        this.localItems.forEach((item, i) => {
            item.id = i;
        });

        localStorage.setItem("inventory", JSON.stringify(this.localItems));
        localStorage.setItem("pockets", JSON.stringify(this.localPockets));
        localStorage.setItem("tax", JSON.stringify(this.state.tax));
        
        this.setState({
            inventory: this.localItems,
            pockets: this.localPockets,
            // name: null,
            // value: null,
            // quantity: null,
            // id: null
        });
    }

    createItem = () => {
        if (this.state.modalType !== "tax") {
            
            let id = this.localItems.length;

            this.localItems.push(
                {
                    name: this.state.name,
                    value: parseFloat(this.state.value).toFixed(2),
                    quantity: parseInt(this.state.quantity),
                    type: this.state.pocket,
                    id: id,
                    shoppingItem: this.state.shoppingItem             
                }
            );
        }

        this.toggleModal();

        this.updateStorage();
    }

    updateItem = () => {
        this.localItems.forEach(item => {
            if (item.id === this.state.id) {
                item.name = this.state.name;
                item.value = parseFloat(this.state.value).toFixed(2);
                item.quantity = parseInt(this.state.quantity);
                item.id = this.state.id;
                item.shoppingItem = this.state.shoppingItem
            }
        });

        this.toggleModal();
        this.updateStorage();
    }

    deleteItem = (method) => {
        if (method === "pocket") {     
            if (this.state.pocket === "All") {
                this.localPockets = [];
                this.localItems = [];
            }
            else {
                this.localPockets.forEach((item, i) => {
                    if (item === this.state.pocket) {
                        this.localPockets.push(this.localPockets.splice(i, 1)[0]);
                        this.localPockets.pop();
                    }
    
                });
    
                let newArray = [];
    
                this.localItems.forEach((item, i) => {
                    if (item.type !== this.state.pocket) {
                        newArray.push(item);
                    }
                });
                this.localItems = newArray;
                this.setState({
                    pocket: "All"
                });    
            }
            this.updateStorage();
        }

        else {    
            this.localItems.forEach((item, i) => {
                if (item.id === this.state.id) {
                    this.localItems.push(this.localItems.splice(i, 1)[0]);
                    this.localItems.pop();
                }
            });

            this.toggleModal();
        }

        this.updateStorage();
    }

    pocketMethod = (func, pocket) => {

        if (func === "switch") {
            this.setState({
                pocket: pocket
            });
        }

        else if (func === "pocketbook") {

            if (this.localPockets.indexOf(pocket) === -1) {
                this.localPockets.push(pocket);
                this.updateStorage();
                this.toggleModal();
                this.setState({
                    pocket: pocket
                })
            }
        }        
    }

    quantityEdit = (method) => {
        switch(method) {
            case "add":
                this.setState({
                    quantity: (parseInt(this.state.quantity) + 1)
                });
                break;
            case "sub":
                if (this.state.quantity >= 1) {
                    this.setState({
                        quantity: (parseInt(this.state.quantity) - 1)
                    });    
                }
                break;
            default:
                break;
        }
    }

    toggleShoppingMode = () => {
        this.setState({
            shoppingMode: !this.state.shoppingMode,
            shoppingItem: !this.state.shoppingMode
        });
    }

    setShoppingItem = () => {
        this.setState({
            shoppingItem: !this.state.shoppingItem
        });
    }

    toggleModal = (item, type) => {
        this.setState({
            modal: !this.state.modal,
            modalType: type,
            name: item ? item.name : null,
            value: item ? parseFloat(item.value).toFixed(2) : null,
            quantity: item ? parseInt(item.quantity) : null,
            id: item ? item.id : null,
            shoppingItem: this.state.shoppingMode
        });

        // if (document.getElementById("modal-content")) {
        //     document.getElementById("modal-content").reset();
        // }
    }

    toggleAccountDisplay = () => {
        this.setState({
            accountDisplay: !this.state.accountDisplay
        })
    }

    handleInputChange = (event) => {
        this.setState({
            [event.target.name] : event.target.value
        });
    }

    render() {
        return (
            <div>

                <nav>
                    <p className = "centered-XY">The Bottomless Box</p>
                </nav>
                
                <div id = "content">
                    <Dashboard 
                        pocket = {this.state.pocket}
                        pockets = {this.state.pockets}
                        pocketMethod = {this.pocketMethod}
                        toggleModal = {this.toggleModal}

                    />

                    <Inventory 
                        pockets = {this.state.pockets}
                        pocket = {this.state.pocket}
                        inventory = {this.state.inventory}
                        toggleModal = {this.toggleModal}
                        shoppingMode = {this.state.shoppingMode}
                        toggleShoppingMode = {this.toggleShoppingMode}
                        tax = {this.state.tax}

                        deleteItem = {this.deleteItem}
                    />
    
                </div>

                <Modal 
                    item = {this.state.item}
                    pocket = {this.state.pocket}

                    toggleModal = {this.toggleModal}
                    modal = {this.state.modal}
                    modalType = {this.state.modalType}

                    name = {this.state.name}
                    value = {this.state.value}
                    quantity = {this.state.quantity}
                    id = {this.state.id}
                    tax = {this.state.tax}

                    pocketMethod = {this.pocketMethod}
                    quantityEdit = {this.quantityEdit}

                    handleInputChange = {this.handleInputChange}
                    createItem = {this.createItem}
                    updateItem = {this.updateItem}
                    deleteItem = {this.deleteItem}
                    setShoppingItem = {this.setShoppingItem}

                    shoppingMode = {this.state.shoppingMode}
                    shoppingItem = {this.state.shoppingItem}
                />
                
            </div>
        )
    }
}

export default Home;