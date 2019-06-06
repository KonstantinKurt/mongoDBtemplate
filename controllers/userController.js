const User = require('../models/User.js');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const fs = require("fs");
module.exports = {
    addUser: function (req, res) {
        const user = new User({
            _id: new mongoose.Types.ObjectId(),
            ...req.body
        });
        //method save() uses Promise by default;
        user.save()
            .then(doc => {
                res.status(201).json(doc);
                fs.readFile("./seeders/users.json", "utf8", function (err, data) {
                    if (err) console.log(err);
                    let users = JSON.parse(data);
                    doc.password =
                        users.push(JSON.stringify(doc));
                    fs.writeFile("./seeders/users.json", JSON.stringify(users), function (err, data) {
                        if (err) console.log(err);
                    });
                });
            })
            .catch(err => {
                res.status(500).json({
                    errors: err.message,
                });
            })
    },
    getUsers: function (req, res) {
        // Query methods should call Promise;
        User.find()
            .select("name email")
            .exec()
            .then(docs => {
                const response = {
                    count: docs.length,
                    users: docs.map(doc => {
                        return {
                            name: doc.name,
                            email: doc.email,
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
                    errors: err.message,
                });
            });

    },
    getUser: function (req, res) {
        User.findOne({_id: req.params.usersId})
            .select("name email")
            .exec()
            .then(doc => {

                    res.status(200).json(doc);

            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    errors: err.message,
                });
            });

    },
    deleteUser: function (req, res) {
        User.deleteOne({_id: req.params.id})
            .exec()
            .then(doc => {
                res.status(200).json(doc);
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    errors: err.message,
                });
            });
    },
    updatedUser: function (req, res) {
        const props = req.body;
        if (props.password) props.password = bcrypt.hashSync(props.password, 10);
        User.updateOne({_id: req.params.id}, props)
            .exec()
            .then(doc => {
                res.status(200).json({
                    name: doc.name,
                    email: doc.email,
                    _id: doc._id,
                    request: {
                        type: 'GET',
                        url: `${req.protocol}://${req.get('host')}/user/${doc._id﻿}`,
                    }
                });
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    errors: err.message,
                });
            });
    },

    // Update operators
    changeRating: function (req, res) {
        const coff = req.body.coff;
        if (isNaN(coff))
            return res.status(400).json({message: "coff shold be a number!"});
        User.updateMany({}, {$inc: {rating: coff}}, {new: true})
            .exec()
            .then(docs => {

                res.status(200).json({message: "All users rating updated correctly!", data: docs});
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    errors: err.message,
                });
            });

    },
    addPostSchema: function (req, res) {
        User.findOneAndUpdate({_id: req.params.usersId},
            {$push: {posts: {body: req.body.postBody}}},
            {new: true})
            .then(doc => {
                res.status(200).json(doc.posts);
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    error: err.message
                });
            });
    },
    deletePostSchemaByValue: function (req, res) {
        User.findOneAndUpdate({_id: req.params.usersId},
            {$pull: {posts: {$elementMatch: {body: req.body.postBody}}}})
            .then(doc => {
                res.status(200).json(doc);
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    error: err.message
                });
            });
    },
    getAllUsersArticle: function (req, res) {
        User.findOne({_id: req.params.usersId})
            .populate('articles')
            .then(doc => {
                res.status(200).json(doc.articles);
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    error: err.message
                });
            });
    },
    getAllUsersArticleWithComments: function (req, res) {
        User.findOne({_id: req.params.usersId})
            .populate({
                path:'articles',
                populate:{
                    path: 'comments',
                    //model:'Comment'
                    populate: {
                        path: 'author',
                        //model:'User'
                    }
                }
            })
            .then(doc => {
                res.status(200).json(doc);
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    error: err.message
                });
            });
    },
    removeWithArticles: function (req, res) {
        User.findOne({_id: req.params.usersId})
            .then(doc => {
                doc.remove()
                    .then(result=>{
                        res.status(200).json(result);
                    });
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    error: err.message
                });
            });
    },
    skipAndLimit: function (req, res) {
        User.find({})
            .skip(1)
            .limit(2)
            .then(docs => {

            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    error: err.message
                });
            });
    },

};