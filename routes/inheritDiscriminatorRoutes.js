const express = require('express');
const router = express.Router();


const inheritController = require('../controllers/inheritController.js');

router.post('/kid',inheritController.createKid);


module.exports = router;