const express = require('express');
const router = express.Router();
 
const RegistrationController = require('../controllers/registrationController');

router.post('/', RegistrationController.Register);

module.exports = router;