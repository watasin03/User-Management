const express = require('express');
const router = express.Router();
 
const authenticationControllers = require('../controllers/authenticationController');

router.post('/', authenticationControllers.Login);

module.exports = router;