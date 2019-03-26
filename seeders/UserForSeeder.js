const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const userScheme = new Schema({
    password: {
        type: String,
    },
    email: {
        type: String,
    },
    name: {
        type: String,
    },
}, { versionKey: false });
module.exports = mongoose.model('User', userScheme);