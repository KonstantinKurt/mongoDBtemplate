const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');


const articleSchema = new Schema({
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
        ref: 'User',
        required: true
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
        default:[]
    }],
    createdDate:{
      type: Date
    },

}, {versionKey: false});

articleSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Article', articleSchema);