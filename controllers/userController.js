const User = require('../models/User.js');
const mongoose = require('mongoose');
module.exports = {
    addUser: function(req, res) {
        const user = new User({
            _id: new mongoose.Types.ObjectId(),
            ...req.body
        });
        user.save()
            .then(doc => {
                res.status(200).json(doc);
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    errors: err,
                });
            })
    },
    getUsers: function(req, res) {
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
                                url: `http://localhost:${process.env.PORT}/user/${doc._id}`,
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
};