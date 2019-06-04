const Post = require('../models/postScheme.js');
const User = require('../models/User.js');
const mongoose = require('mongoose');

module.exports = {
    addPost: function(req, res) {
        const post = new Post({
            _id: new mongoose.Types.ObjectId(),
            ...req.body
        });
        User.find({ _id: req.params.author })
            .then(doc => {
                if (!doc) {
                    return res.status(404).json({ message: `User not found` });
                }
                return post.save();
            })
            .then(result => {
                res.status(201).json({ message: `Post saved succesfully!`, data: { result } });
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    error: err
                });
            });
    },
    getPosts: function(req, res) {
        Post.find()
            //.populate(`name`)
            .exec()
            .then(docs => {
                const response = {
                    count: docs.length,
                    posts: docs.map(doc => {
                        return {
                            name: doc.name,
                            body: doc.body,
                            author: doc.author,
                            _id: doc._id,
                            request: {
                                type: `GET`,
                                url: `${req.protocol}://${req.get('host')}/user/${doc._id﻿}`,
                            }
                        };
                    })
                };
                if (docs.length > 0) {
                    res.status(200).json(response);
                } else {
                    res.status(404).json({
                        message: `DB is empty`,
                    });
                }
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    error: err
                });
            });

    },

};