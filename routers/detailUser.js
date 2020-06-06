const express = require('express');
const router = express.Router();
 
const detailController = require('../controllers//userDetailsController');

router.get('/', detailController.All);
router.get('/:id', detailController.Detail);

module.exports = router;