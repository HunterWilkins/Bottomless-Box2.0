import React, {Component} from "react";
import {Link} from "react-router-dom";
import "./style.css";

class Home extends Component {
    state = {
        question: "Where do I start?"
    }

    questions = [
        {
            q: "Where do I start?",
            a: "At the top left, you'll see a button with a plus sign on it (+)." + 
                "If you activate that, then you'll see a list of \"pockets.\" These " +
                "are essentially the \"genres\" of items you can store. If you want to " +
                "store an apple, you'd select the Fruit pocket, then activate the other button with a plus sign (+) " +
                "in the upper right. Then you'll be able to set the name, value, and quantity of the item. Simply press " +
                "the submit button to store it."
        },
        {
            q: "How do I change the values of each item?",
            a: "Clicking on the item in the inventory space will allow you to reset any " +
                "specific field (name, value, or quantity). You do not need to refill any information " +
                "that you don't want to change."
         },
         {
             q: "What's the shopping cart button do?",
             a: "As of September, the Bottomless Box has a Shopping List Mode. Activating " +
                "this button in the inventory button space (to the far right) will trigger " +
                "Shopping List Mode and allow you to only see, edit, and delete shopping list items. " +
                "Whenever you've bought an item on your shopping list, you can simply " +
                "press the shopping cart button in the edit screen to send it to your inventory (and vice versa). " +
                "You can find out if you're in Shopping List Mode by looking at the shopping cart button. If it has a red circle " +
                "around it, then you're currently in Shopping List Mode."
         },
         {
             q: "How do I delete items?",
             a: "Simply click/tap on the item in the inventory space (like you're trying to edit it), " +
                "and you'll be taken to the \"Edit Item\" Modal. At the bottom right, you can see a trash can. " +
                "clicking that will delete the item. If you wish to delete an entire pocket, then you can " +
                "click on the trash can button in the inventory button space (far right). This will delete all " +
                "items within the pocket, and, if you're in the \"All\" pocket, you'll delete all of your items. " +
                "So, be careful!"
         },
         {
             q: "How are you storing all this information? Does it get transferred across platforms?",
             a: "This information is stored via a system called \"LocalStorage.\" This is specific to your browser " +
                "on the device it was accessed with. Your information will be stored solely on the device in question " +
                "and the browser you accessed it with. While this is not ideal, I find that requiring an account " +
                "is simply too inconvenient to the user for what this product provides. There's a great possibility that " +
                "the Bottomless Box will have an optional login system in the future. It would only make it more convenient, and " +
                "that's what the Bottomless Box is here to do!"
         },
         {
             q: "Where did all this incredible artwork come from?",
             a: "I'm glad you asked! All artwork on this website was hand-drawn by me, Hunter Wilkins. If you want to " +
                "view more of my art (on a larger scale, of course), then please consider heading over to my website at "+
                "hunterwilkins.herokuapp.com."
         }
    ]

    activeStyle = {
        background: "var(--foreground)",
        fontWeight: "bolder"
    }

    ask = (question) => {
        this.setState({
            question: question
        });
    }

    render() {
        return (
            <div>
                <nav>
                    <Link to = "/" id = "homelink">⮈</Link>
                    <h1 id = "info-title">Info</h1>    
                </nav>

                <div id = "info-wrapper">
                    <div id = "questions">
                        {
                            this.questions.map(item => {
                                return(
                                    <p className = "question" style = { this.state.question === item.q ? this.activeStyle : {}} onClick = {() => {this.ask(item.q)}}>{item.q}</p>
                                );
                            })
                        }
                    </div>

                    <div id = "answer">
                        {
                            this.questions.map(item => {
                                if (item.q === this.state.question) {
                                    return(
                                        <p>{item.a}</p>
                                    );
                                }
                                else return true
                            })
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default Home;