const mongoose = require("mongoose");
const User = require('../models/User.js');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');
const postScheme = new Schema({
    author:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        unique: true,
        required: true,
    },
}, { versionKey: false });

postScheme.plugin(uniqueValidator);



module.exports = mongoose.model('Post', postScheme);