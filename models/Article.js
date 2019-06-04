const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');


const articleShema = new Schema({
    title: {
        type: String,
        unique: true,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    comments: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Comment',
        default:[]
    }

}, {versionKey: false});

userScheme.plugin(uniqueValidator);

module.exports = mongoose.model('Article', articleShema);