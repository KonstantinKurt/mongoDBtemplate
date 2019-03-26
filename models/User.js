const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const uniqueValidator = require('mongoose-unique-validator');
const validator = require('../libs/validators.js');

let textValidator = [validator.alphaValidator, validator.nameValidator];

const userScheme = new Schema({
    password: {
        type: String,
        required: true,
        validate: textValidator,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        validate: validator.emailValidator,
    },
    name: {
        type: String,
        unique: true,
        required: true,
        validate: textValidator,
    },
}, { versionKey: false });

userScheme.plugin(uniqueValidator);


userScheme.pre('save', function(next) {
    this.password = bcrypt.hashSync(this.password, 10);
    next();
});

module.exports = mongoose.model('User', userScheme);