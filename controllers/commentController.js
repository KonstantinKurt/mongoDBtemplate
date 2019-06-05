const mongoose = require('mongoose');

const Comment = require('../models/Comment.js');
const Article = require('../models/Article.js');
const User = require('../models/User.js');

module.exports = {
    addComment: function (req, res) {
        let savedComment;
        new Comment({
            _id: new mongoose.Types.ObjectId(),
            author: req.params.usersId,
            article: req.params.articlesId,
            ...req.body
        })
            .save()
            .then(comment => {
                savedComment = comment;
                return Article
                    .findOneAndUpdate(
                        {_id: req.params.articlesId},
                        {$push: {comments: savedComment}},
                        {new: true}
                    )
                    .exec()
            })
            .then(() => {
                res
                    .status(200)
                    .json({message: "Article added successfully!", data: savedComment});
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