const express = require('express');
const aggregationController = require('../controllers/aggregationController.js');
const aggregationRouter = express.Router();


aggregationRouter.get('/', aggregationController.test);

module.exports = aggregationRouter;
