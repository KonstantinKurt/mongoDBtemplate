const User = require('../models/User.js');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const fs = require("fs");
module.exports = {
    addUser: function(req, res) {
        const user = new User({
            _id: new mongoose.Types.ObjectId(),
            ...req.body
        });
        //method save() uses Promise by default;
        user.save()
            .then(doc => {
                res.status(201).json(doc);
                fs.readFile("./seeders/users.json", "utf8", function(err, data) {
                    if (err) console.log(err);
                    let users = JSON.parse(data);
                    doc.password = 
                    users.push(JSON.stringify(doc));
                    fs.writeFile("./seeders/users.json", JSON.stringify(users), function(err, data) {
                        if (err) console.log(err);
                    });
                });
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    errors: err,
                });
            })
    },
    getUsers: function(req, res) {
       // Query methouds should call Promise;  
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
                    error: err
                });
            });

    },
    getUser: function(req, res) {
        User.find({ _id: req.params.id })
            .select("name email")
            .exec()
            .then(doc => {
                if (doc.length > 0) {
                    res.status(200).json(doc);
                } else {
                    res.status(404).json({
                        message: 'User not found',
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
    deleteUser: function(req, res) {
        User.deleteOne({ _id: req.params.id })
            .exec()
            .then(doc => {
                res.status(200).json(doc);
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    error: err
                });
            });
    },
    updatedUser: function(req, res) {
        const props = req.body;
        if (props.password) props.password = bcrypt.hashSync(props.password, 10);
        User.updateOne({ _id: req.params.id }, props)
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
                    error: err
                });
            });
    },
    changeRating: function(req, res) {
        const coff  = req.body.coff;
        if(isNaN(coff)) 
         return res.status(400).json({message: "coff shold be a number!"}); 
        // User.updateMany({}, {rating:coff})
        //     .exec()
        //     .then(docs => {

        //         res.status(200).json({message: "All users rating updated coorectly!"});
        //     })
        //     .catch(err => {
        //         console.log(err);
        //         res.status(500).json({
        //             error: err
        //         });
        //     });
        
    },
};