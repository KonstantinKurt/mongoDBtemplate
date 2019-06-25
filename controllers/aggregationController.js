const mongoose = require('mongoose');
const Article = require('../models/Article.js');
const User = require('../models/User.js');


module.exports = {
    test: async function (req, res) {
        User.aggregate([
            {$match: {rating: {$gte: 90000}}},
        ])
            .then(users => {
                res
                    .status(200)
                    .json({message: "Aggregation test!", users})
            })
            .catch(err =>{
               res
                   .status(400)
                   .json({error: err.message})
            });
    },
};
