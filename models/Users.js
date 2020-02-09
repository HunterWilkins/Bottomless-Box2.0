const mongoose = require("mongoose");

let Schema = mongoose.Schema;

let UserSchema = new Schema ({
    username: {
        type: String,
        unique: true
    },

    password: {
        type: String
    },

    inventory: {
        type: Array
    },

    pockets: {
        type: Array
    }
});