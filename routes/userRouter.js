const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController.js'); 

router.put('/user', userController.addUser); // add User to db;
router.delete('/user/:id', userController.deleteUser); // delete User by _id;
router.patch('/user/:id', userController.updatedUser); // update User by _id:
router.get('/users', userController.getUsers); // get all Users from db;
router.get('/user/:id', userController.getUser); // get User from db by _id;
router.patch('/users', userController.changeRating); // changes rating to all Users by the coff, which indicates by req.param;


module.exports = router;