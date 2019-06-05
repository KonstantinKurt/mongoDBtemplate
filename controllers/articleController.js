const Article = require('../models/Article.js');
const User = require('../models/User.js');
const mongoose = require('mongoose');

module.exports = {
    addArticle: function (req, res) {
        let savedArticle;
        new Article({
            _id: new mongoose.Types.ObjectId(),
            author: req.params.usersId,
            ...req.body
        })
            .save()
            .then(article => {
                savedArticle = article;
                return User
                    .findOneAndUpdate(
                        {_id: req.params.usersId},
                        {$push: {articles: savedArticle}},
                        {new: true}
                    )
                    .exec()
            })
            .then(() => {
                res
                    .status(200)
                    .json({message: "Article added successfully!", data: savedArticle});
            })
            .catch(err => {
                res
                    .status(400)
                    .json({error: err.message});
            });
    },
    getPosts: function (req, res) {


    },

};