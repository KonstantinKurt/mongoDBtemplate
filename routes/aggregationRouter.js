const express = require('express');
const aggregationController = require('../controllers/aggregationController.js');
const aggregationRouter = express.Router();


aggregationRouter.get('/project', aggregationController.project );
aggregationRouter.get('/digits', aggregationController.digits);
aggregationRouter.get('/strings', aggregationController.strings);
aggregationRouter.get('/group', aggregationController.group);
aggregationRouter.get('/unwind', aggregationController.unwind);
aggregationRouter.get('/lookup', aggregationController.lookup);


module.exports = aggregationRouter;
