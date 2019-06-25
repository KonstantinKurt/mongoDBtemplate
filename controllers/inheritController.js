const mongoose = require('mongoose');

const Parent = require('../models/Parent.js');
const Kid = require('../models/Kid.js');

module.exports = {
     createKid: (req,res)=>{
         const kid = new Kid();
         kid
             .save()
             .then(kid=>{
                 res.status(200).json({message: `Kid saved succesfully!`, data: kid});
             })
     }
};
