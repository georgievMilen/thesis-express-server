'use strict';

const
    express = require('express'),
    errorController = require('../controllers/errorController');

let router = express.Router();

router.get('/', errorController.index);

module.exports = router;