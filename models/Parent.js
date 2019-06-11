const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const baseOptions = {
    discriminatorKey: 'test', // Any value;
    collection: 'inherit',
};

const parentScheme = new Schema({

    name: {
        type: String,
        default: 'Inherit test (Parent)'
    },

}, {versionKey: false}, baseOptions);



module.exports = mongoose.model('Parent', parentScheme);