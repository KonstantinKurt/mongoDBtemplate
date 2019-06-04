const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const postScheme = new Schema({
    body: {
        type: String,
    },
});

module.exports = postScheme;