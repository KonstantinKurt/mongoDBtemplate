const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController.js'); 

router.put('/user', userController.addUser); 
router.delete('/user/:id', userController.deleteUser); 
router.get('/users', userController.getUsers);
router.get('/user/:id', userController.getUser);
module.exports = router;