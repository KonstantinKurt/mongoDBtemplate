const mongoose = require('mongoose');
const Article = require('../models/Article.js');
const User = require('../models/User.js');


module.exports = {
    project: async function (req, res) {
        User.aggregate([
            {
                $match: {rating: {$gte: 90000}}
            },
            {
                $project: {
                    _id: false,
                    name: true,
                    rating: true,
                    location: "$location.coordinates",
                    test: "testing $project",
                }
            },
        ])
            .exec()
            .then(users => {
                res
                    .status(200)
                    .json({message: "Project test!", users})
            })
            .catch(err => {
                res
                    .status(400)
                    .json({error: err.message})
            });
    },
    digits: async function (req, res) {
        User.aggregate([
            {
                $project: {
                    _id: false,
                    test: "Testing multiple! Rating X10",
                    rating: {
                        $multiply: ["$rating", 10]
                    }
                }
            }
        ])
            .exec()
            .then(users => {
                res
                    .status(200)
                    .json({message: "Multiple test!", users})
            })
            .catch(err => {
                res
                    .status(400)
                    .json({error: err.message})
            });
    },
    strings: async function (req, res) {
        User.aggregate([
            {
                $project: {
                    _id: false,
                    test: "Testing string concat! Rating X10",
                    user_data: {
                        $toUpper: {
                            $concat: ["$name", "  ", "$email", "  ", {$substr: ["$rating", 0, "$rating".length]}]
                        }
                    }
                }
            },
        ])
            .exec()
            .then(users => {
                res
                    .status(200)
                    .json({message: "Multiple test!", users})
            })
            .catch(err => {
                res
                    .status(400)
                    .json({error: err.message})
            });
    },
    group: async function (req, res) {
        User.aggregate([
            {
                $sort: {
                    rating: 1
                },
            },
            {
                $group: {
                    _id: {
                        rating: "$rating",
                    },
                    articles: {
                        $push: "$articles"
                    }
                },
            },
        ])
            .exec()
            .then(users => {
                res
                    .status(200)
                    .json({message: "Order test!", users})
            })
            .catch(err => {
                res
                    .status(400)
                    .json({error: err.message})
            });
    }
    ,
    unwind: async function (req, res) {
        User.aggregate([
            {
                $project: {
                    _id: false,
                    user_data: "$name",
                    //articles: true
                }
            },
            {
                $unwind: "$articles"
            }
        ])
            .exec()
            .then(users => {
                res
                    .status(200)
                    .json({message: "Unwind test!", users})
            })
            .catch(err => {
                res
                    .status(400)
                    .json({error: err.message})
            });
    },
    lookup: async function (req, res) {
        User.aggregate([
            {
                $lookup:
                    {
                        from: 'articles',        // "One to many" collection;
                        localField: 'articles',  // model array property with references:
                        foreignField: '_id',
                        as: 'Users_articles'
                    }
            },
            {
                $unwind: '$Users_articles'
            },
            {
                $project:
                    {
                        _id: false,
                    }
            }
        ])
            .exec()
            .then(users => {
                res
                    .status(200)
                    .json({message: "Unwind test!", users})
            })
            .catch(err => {
                res
                    .status(400)
                    .json({error: err.message})
            });
    },
};
