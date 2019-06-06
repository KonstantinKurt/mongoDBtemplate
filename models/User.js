const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const uniqueValidator = require('mongoose-unique-validator');
const validator = require('../libs/validators.js');
const postSchema = require('./postScheme.js');
const Article = require('../models/Article.js');


let textValidator = [validator.alphaValidator, validator.nameValidator];

const userScheme = new Schema({
    password: {
        type: String,
        required: true,
        validate: textValidator,
        select: false
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
    rating: {
        type: Number,
        default: Math.floor(Math.random() * (50000 - 0)) + 0,
    },
    posts: {
        type: [postSchema],
        default: []
    },
    articles: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Article"
    }],
    premium:{
        type: Boolean,
        default: false
    }

}, {versionKey: false});

userScheme.virtual('postCount').get(() => {   //virtual schema property;
    return this.post.length;
});
userScheme.plugin(uniqueValidator);

userScheme.pre('save', function (next) {
    this.password = bcrypt.hashSync(this.password, 10);
    next();
});

userScheme.pre('remove',  function(next)  {              // middleware will remove all users articles, if user instance will be deleted;

    mongoose.model('Article').deleteMany({_id: {$in: this.articles}})
        .then(()=>next());

});
module.exports = mongoose.model('User', userScheme);