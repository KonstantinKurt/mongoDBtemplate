const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Parent = require('./Parent.js');

const kidScheme = new Schema({
    isAdmin: {
        type:Boolean,
        default: true
    }
}, {versionKey: false});

const Kid = Parent.discriminator('Kid', kidScheme);

module.exports = mongoose.model('Kid');